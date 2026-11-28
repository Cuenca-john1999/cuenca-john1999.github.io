import {MODEL,rankVectors,splitQueries} from './cv-semantic.mjs?v=3';
let pipelinePromise,indexCache=null,busy=false;
const notify=(type,payload={})=>self.postMessage({type,...payload});
async function getModel(){
 if(!pipelinePromise)pipelinePromise=(async()=>{
  const {pipeline,env}=await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1');
  env.allowLocalModels=false;env.useBrowserCache=true;
  // Single-thread WASM works without cross-origin isolation, including non-WebGPU browsers.
  env.backends.onnx.wasm.numThreads=1;
  return pipeline('feature-extraction',MODEL.id,{revision:MODEL.revision,dtype:MODEL.dtype,device:'wasm',progress_callback:p=>{if(p.status==='progress'&&Number.isFinite(p.progress))notify('download',{file:String(p.file||''),percent:Math.round(p.progress)});}});
 })().catch(e=>{pipelinePromise=null;throw e;});
 return pipelinePromise;
}
async function encode(model,texts,prefix,phase){
 const vectors=[];
 for(let i=0;i<texts.length;i+=8){
  const batch=texts.slice(i,i+8),r=await model(batch.map(s=>prefix+s),{pooling:'mean',normalize:true});
  if(r.dims.length!==2||r.dims[0]!==batch.length||r.dims[1]!==MODEL.dimensions)throw Error('Unexpected model shape');
  for(let j=0;j<batch.length;j++)vectors.push(Float32Array.from(r.data.slice(j*MODEL.dimensions,(j+1)*MODEL.dimensions)));
  notify('progress',{phase,done:Math.min(i+batch.length,texts.length),total:texts.length});
 }
 return vectors;
}
async function cacheKey(key){
 const raw=new TextEncoder().encode(MODEL.id+'|'+MODEL.revision+'|'+MODEL.dtype+'|'+key);
 const digest=await crypto.subtle.digest('SHA-256',raw);return Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
}
async function db(){return new Promise((resolve,reject)=>{const req=indexedDB.open('portfolio-public-evidence-v1',1);req.onupgradeneeded=()=>req.result.createObjectStore('vectors');req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);req.onblocked=()=>reject(Error('Cache blocked'));});}
async function cached(key,count){
 try{const d=await db();try{return await new Promise(resolve=>{const req=d.transaction('vectors').objectStore('vectors').get(key);req.onsuccess=()=>{const rows=req.result;resolve(Array.isArray(rows)&&rows.length===count&&rows.every(v=>v instanceof Float32Array&&v.length===MODEL.dimensions&&v.every(Number.isFinite))?rows:null);};req.onerror=()=>resolve(null);});}finally{d.close();}}catch{return null;}
}
async function store(key,vectors){
 try{const d=await db();try{await new Promise((resolve,reject)=>{const tx=d.transaction('vectors','readwrite'),s=tx.objectStore('vectors');s.clear();s.put(vectors,key);tx.oncomplete=resolve;tx.onerror=reject;tx.onabort=reject;});}finally{d.close();}}catch{}
}
self.onmessage=async({data:m})=>{
 if(m?.type!=='analyse'||busy)return;busy=true;
 try{
  const entries=m.entries;if(!Array.isArray(entries)||entries.length<1||entries.length>500||entries.some(e=>typeof e.key!=='string'||typeof e.text!=='string'||e.text.length>2000))throw Error('Invalid evidence index');
  const queries=splitQueries(m.offer);if(!queries.length){notify('result',{rows:[],passages:0});return;}
  const started=performance.now();notify('loading');const model=await getModel();const modelMs=performance.now()-started;
  const key=JSON.stringify(entries),indexStarted=performance.now();let indexSource='memory';
  if(indexCache?.key!==key){const id=await cacheKey(key).catch(()=>null);let vectors=id?await cached(id,entries.length):null;indexSource=vectors?'indexeddb':'computed';if(!vectors){vectors=await encode(model,entries.map(e=>e.text),'passage: ','index');if(id)await store(id,vectors);}indexCache={key,vectors};}
  const indexMs=performance.now()-indexStarted,queryStarted=performance.now();const vectors=await encode(model,queries,'query: ','offer');
  const rows=rankVectors(entries,indexCache.vectors,queries,vectors);
  notify('result',{rows,passages:queries.length,diagnostics:{indexSource,modelMs:Math.round(modelMs),indexMs:Math.round(indexMs),queryMs:Math.round(performance.now()-queryStarted)}});
 }catch(e){notify('error',{message:String(e?.message||e).slice(0,200)});}
 finally{busy=false;}
};
