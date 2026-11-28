// Pure retrieval logic. Scores are ranking signals, never probabilities of competence.
import {clauses,modality,focusRoutes,normalize} from './cv-context.mjs?v=3';
export const MODEL={id:'Xenova/multilingual-e5-small',revision:'761b726dd34fb83930e26aab4e9ac3899aa1fa78',dtype:'int8',dimensions:384};
export const THRESHOLD=.79; // provisional, to be calibrated on independent vacancies
export function evidenceIndex(data,facts){
 const entries=[];
 for(const s of data.skills)for(const lang of ['es','en','de']){
   const v=s.locales[lang];entries.push({key:'skill:'+s.id,lang,text:[v.name,v.detail,v.context].filter(Boolean).join('. ')});
 }
 for(const [id,v] of Object.entries(facts))for(const lang of ['es','en','de'])entries.push({key:'fact:'+id,lang,text:v[lang]});
 return entries;
}
// Ignore clearly promotional passages, not whole vacancy sections.
export function isBoilerplate(s){
 const n=normalize(s);
 const promotional=/^(?:we offer|our company offers|what we offer|benefits include|wir bieten|was wir bieten|ofrecemos|que ofrecemos)\b/.test(n);
 const duty=/\b(?:must|required|essential|responsible|prepare|maintain|perform|analyse|analyze|laboratory duties|obligatorio|preparar|realizar|erforderlich|aufgaben|durchfuhren)\b/.test(n);
 return promotional&&!duty;
}
export function splitQueries(text){
 const result=[],seen=new Set();
 // Compact spans with a small overlap; retain all spans, including the tail of long offers.
 for(const clause of clauses(String(text).slice(0,60000))){
  if(modality(clause)==='not-required'||isBoilerplate(clause))continue;
  const segments=[clause,...(clause.length>75?clause.split(/,\s+|\s+(?:and|und|y)\s+(?=(?:prepar|maintain|perform|manage|support|isolat|extract|analys|analyz|organis|organiz|realiz|gestion|wart|herstell|untersuch|durchfuhr)\w*)/i).filter(s=>s.length>=12&&s!==clause):[])];
  for(const segment of segments){
  if(modality(segment)==='not-required'||isBoilerplate(segment))continue;
  const words=segment.split(/\s+/).filter(Boolean);
  let i=0;
  while(i<words.length){
   let end=i,chars=0;
   while(end<words.length&&end-i<55&&chars+words[end].length+1<=420){chars+=words[end].length+1;end++;}
   if(end===i){const long=words[i++];for(let j=0;j<long.length;j+=360){const part=long.slice(j,j+400);if(!seen.has(part)){seen.add(part);result.push(part);}}continue;}
   const span=words.slice(i,end).join(' ');
   if(span.length>=8&&!seen.has(span)){seen.add(span);result.push(span);}
   if(end===words.length)break;
   i=Math.max(i+1,end-7);
  }
  }
 }
 return result;
}
export function dot(a,b){if(a.length!==b.length)throw Error('Vector dimensions');let s=0;for(let i=0;i<a.length;i++)s+=a[i]*b[i];return s;}
export function rankVectors(entries,vectors,queries,queryVectors,{threshold=THRESHOLD,limit=24}={}){
 if(entries.length!==vectors.length||queries.length!==queryVectors.length)throw Error('Index size');
 const best=new Map();
 for(let i=0;i<queries.length;i++){
   const byKey=new Map();
   for(let j=0;j<entries.length;j++){const e=entries[j],score=dot(queryVectors[i],vectors[j]);if(!Number.isFinite(score))continue;const prev=byKey.get(e.key);if(!prev||score>prev.score)byKey.set(e.key,{key:e.key,score,passage:queries[i],lang:e.lang});}
   const ranked=[...byKey.values()].sort((a,b)=>b.score-a.score);
   for(const r of ranked.slice(0,5)){if(r.score<threshold)continue;const prev=best.get(r.key);if(!prev||r.score>prev.score)best.set(r.key,{...r,margin:r.score-(ranked[5]?.score??threshold)});}
 }
 return [...best.values()].sort((a,b)=>b.score-a.score||a.key.localeCompare(b.key)).slice(0,limit);
}
export function validateSuggestions(result,data,facts,baseline,{rerank=true}={}){
 const keys=new Set(evidenceIndex(data,facts).map(x=>x.key));
 const excluded=new Set((baseline?.notRequired||[]).map(x=>'skill:'+x.id));
 const seen=new Set();
 const rows=(Array.isArray(result)?result:[]).filter(r=>r&&keys.has(r.key)&&!excluded.has(r.key)&&!seen.has(r.key)&&Number.isFinite(r.score)&&r.score>=THRESHOLD&&r.score<=1.001&&typeof r.passage==='string'&&r.passage.length<=500&&!isBoilerplate(r.passage)&&(seen.add(r.key),true));
 if(!rerank||!baseline)return rows.sort((a,b)=>b.score-a.score).slice(0,24);
 const known=new Set([...(baseline.matches||[]).map(x=>'skill:'+x.id),...(baseline.factIds||[]).map(x=>'fact:'+x)]);
 const route=new Set(focusRoutes(data)[baseline.route]?.skills||[]);
 return rows.filter(r=>known.has(r.key)||r.score>=(r.key.startsWith('skill:')&&route.has(r.key.slice(6))?.85:.88))
 .map(r=>({...r,corroborated:known.has(r.key)})).sort((a,b)=>Number(b.corroborated)-Number(a.corroborated)||b.score-a.score).slice(0,24);
}
