import {MODEL,rankVectors,splitQueries} from './cv-semantic.mjs?v=2';
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
self.onmessage=async({data:m})=>{
 if(m?.type!=='analyse'||busy)return;busy=true;
 try{
  const entries=m.entries;if(!Array.isArray(entries)||entries.length<1||entries.length>500||entries.some(e=>typeof e.key!=='string'||typeof e.text!=='string'||e.text.length>2000))throw Error('Invalid evidence index');
  const queries=splitQueries(m.offer);if(!queries.length){notify('result',{rows:[],passages:0});return;}
  notify('loading');const model=await getModel();
  const key=JSON.stringify(entries);
  if(indexCache?.key!==key){const vectors=await encode(model,entries.map(e=>e.text),'passage: ','index');indexCache={key,vectors};}
  const vectors=await encode(model,queries,'query: ','offer');
  notify('result',{rows:rankVectors(entries,indexCache.vectors,queries,vectors),passages:queries.length});
 }catch(e){notify('error',{message:String(e?.message||e).slice(0,200)});}
 finally{busy=false;}
};
