import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {chromium} from 'playwright';
import {analyse,facts} from '../assets/js/cv-builder-core.mjs';
import {evidenceIndex,validateSuggestions,THRESHOLD} from '../assets/js/cv-semantic.mjs';
const load=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const data=load('../data/market/common-evidence.json'),cases=load('./cv_semantic_benchmark_cases.json');
const entries=evidenceIndex(data,facts),browser=await chromium.launch({headless:true}),report=[];
const score=(keys,expected)=>({expected:expected.length,found:expected.filter(k=>keys.includes(k)),missing:expected.filter(k=>!keys.includes(k)),other:keys.filter(k=>!expected.includes(k))});
try{
 const page=await browser.newPage();await page.goto((process.env.PORTFOLIO_URL||'http://127.0.0.1:8765/')+'cv-builder/?lang=en');
 await page.evaluate(()=>{window.benchWorker=new Worker(new URL('../assets/js/cv-semantic-worker.mjs?v=3',location.href),{type:'module'});});
 for(const c of cases){
  const offer=(c.prefix||'').repeat(c.repeat||0)+c.text,baseline=analyse(data,offer);
  const quickKeys=[...baseline.matches.map(x=>'skill:'+x.id),...baseline.factIds.map(x=>'fact:'+x)];
  const start=Date.now();
  const raw=await page.evaluate(({entries,offer})=>new Promise((resolve,reject)=>{
   const w=window.benchWorker,timer=setTimeout(()=>reject(Error('Benchmark timeout')),300000);
   w.onerror=e=>{clearTimeout(timer);reject(Error(e.message));};
   w.onmessage=({data:m})=>{if(m.type==='error'){clearTimeout(timer);reject(Error(m.message));}if(m.type==='result'){clearTimeout(timer);resolve(m);}};
   w.postMessage({type:'analyse',entries,offer});
  }),{entries,offer});
  const rawHits=validateSuggestions(raw.rows,data,facts,baseline,{rerank:false}),hits=validateSuggestions(raw.rows,data,facts,baseline),keys=hits.map(x=>x.key),union=[...new Set([...quickKeys,...keys])];
  const row={id:c.id,language:c.lang,source:c.source,route:baseline.route,expectedRoute:c.route,passages:raw.passages,elapsedMs:Date.now()-start,quick:score(quickKeys,c.expected),semanticRaw:score(rawHits.map(x=>x.key),c.expected),semantic:score(keys,c.expected),hybrid:score(union,c.expected),gaps:baseline.gaps.map(x=>x.id),missingGaps:c.gaps.filter(g=>!baseline.gaps.some(x=>x.id===g)),thresholds:[THRESHOLD,.82,.85,.88].map(threshold=>({threshold,...score(rawHits.filter(h=>h.score>=threshold).map(h=>h.key),c.expected)})),ranked:hits.map(h=>({key:h.key,score:Number(h.score.toFixed(5))}))};
  report.push(row);console.log(JSON.stringify(row));
  // Known explicit skill exclusions are hard constraints. Other semantic links remain advisory.
  if(c.id==='negation')assert(!union.includes('skill:pcr'),'Explicitly excluded PCR returned');
  for(const id of c.excludedGaps||[])assert(!row.gaps.includes(id),'Excluded requirement reported: '+id);
 }
}finally{await browser.close();mkdirSync('test-output',{recursive:true});writeFileSync('test-output/cv-semantic-benchmark.json',JSON.stringify(report,null,2)+'\n');}
assert.equal(report.length,cases.length);
console.log('Live semantic benchmark completed; expected coverage is diagnostic, not calibrated accuracy. Other hits require manual review.');
