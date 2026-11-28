// Pure retrieval logic. Scores are ranking signals, never probabilities of competence.
import {clauses,modality} from './cv-context.mjs?v=2';
export const MODEL={id:'Xenova/multilingual-e5-small',revision:'761b726dd34fb83930e26aab4e9ac3899aa1fa78',dtype:'int8',dimensions:384};
export const THRESHOLD=.79; // provisional, to be calibrated on independent vacancies
export function evidenceIndex(data,facts){
 const entries=data.skills.map(s=>({key:'skill:'+s.id,text:s.locales.en.name+'. '+s.locales.en.detail}));
 for(const [id,v] of Object.entries(facts))entries.push({key:'fact:'+id,text:v.en});
 return entries;
}
export function splitQueries(text){
 const result=[],seen=new Set();
 // Compact spans with a small overlap; retain all spans, including the tail of long offers.
 for(const clause of clauses(String(text).slice(0,60000))){
  if(modality(clause)==='not-required')continue;
  const words=clause.split(/\s+/).filter(Boolean);
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
 return result;
}
export function dot(a,b){if(a.length!==b.length)throw Error('Vector dimensions');let s=0;for(let i=0;i<a.length;i++)s+=a[i]*b[i];return s;}
export function rankVectors(entries,vectors,queries,queryVectors,{threshold=THRESHOLD,limit=24}={}){
 if(entries.length!==vectors.length||queries.length!==queryVectors.length)throw Error('Index size');
 const best=new Map();
 for(let i=0;i<queries.length;i++){
   const ranked=entries.map((e,j)=>({key:e.key,score:dot(queryVectors[i],vectors[j]),passage:queries[i]})).filter(r=>Number.isFinite(r.score)).sort((a,b)=>b.score-a.score);
   // At most three matches per passage, plus evidence-wide deduplication.
   for(const r of ranked.slice(0,3)){if(r.score<threshold)continue;const prev=best.get(r.key);if(!prev||r.score>prev.score)best.set(r.key,r);}
 }
 return [...best.values()].sort((a,b)=>b.score-a.score||a.key.localeCompare(b.key)).slice(0,limit);
}
export function validateSuggestions(result,data,facts,baseline){
 const keys=new Set(evidenceIndex(data,facts).map(x=>x.key));
 const excluded=new Set((baseline?.notRequired||[]).map(x=>'skill:'+x.id));
 const seen=new Set();
 return (Array.isArray(result)?result:[]).filter(r=>r&&keys.has(r.key)&&!excluded.has(r.key)&&!seen.has(r.key)&&Number.isFinite(r.score)&&r.score>=THRESHOLD&&r.score<=1.001&&typeof r.passage==='string'&&r.passage.length<=500&&(seen.add(r.key),true)).sort((a,b)=>b.score-a.score).slice(0,24);
}
