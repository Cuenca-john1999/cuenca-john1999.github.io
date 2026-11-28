import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {analyse,compose,generate,MAX_SKILLS} from '../assets/js/cv-builder-core.mjs';
const read=p=>JSON.parse(readFileSync(new URL('../data/market/'+p,import.meta.url),'utf8'));
const data=read('common-evidence.json'),cv=read('cv.json');
const has=(r,id)=>r.matches.some(x=>x.id===id);
const r=analyse(data,'Environmental monitoring, RODAC, CFU, SOP, autoclave; GMP, LAL, bioburden');
for(const id of ['microbial-environmental-sampling','microbial-enumeration','glp-sop','culture-media-preparation'])assert(has(r,id));
assert.deepEqual(r.gaps.map(x=>x.id),['gmp','lal','bioburden']);
assert(!has(analyse(data,'GMP'),'glp-sop'));assert(has(analyse(data,'Extracción de ARN y recuento UFC'),'rna-extraction'));assert(has(analyse(data,'Zellkultur und KBE'),'hacat'));assert(has(analyse(data,'Durchflusszytometrie'),'immunodiagnostics'));assert(!has(analyse(data,'prePCRsample'),'pcr'));
for(const lang of ['es','en','de']){
 for(const [role,route] of Object.entries(data.routes)){const ids=route.skills.slice(0,MAX_SKILLS);const m=compose(data,cv,lang,role,ids);assert.deepEqual(m.ids,ids);assert(generate(data,cv,m).includes('/Count 2'));}
 for(let i=0;i<data.skills.length;i+=9){const ids=data.skills.slice(i,i+MAX_SKILLS).map(s=>s.id);assert(generate(data,cv,compose(data,cv,lang,'general',ids)).includes('/Count 2'));}
}
assert.throws(()=>compose(data,cv,'es','general',['fake-id']));assert.throws(()=>compose(data,cv,'es','general',[]));assert.throws(()=>compose(data,cv,'es','general',data.skills.slice(0,MAX_SKILLS+1).map(s=>s.id)));
const env=compose(data,cv,'es','pharma',['microbial-environmental-sampling','glp-sop']);assert(env.variant.academic.join(' ').includes('RODAC'));assert(env.variant.placements[1].join(' ').includes('Celignis'));
const ids=['pcr','hacat','cd4-cd14'];const publicPDF=generate(data,cv,compose(data,cv,'en','research',ids));assert(generate(data,cv,compose(data,cv,'en','research',ids,'test@example.invalid')).includes('test@example.invalid'));assert(!publicPDF.includes('test@example.invalid'));assert.notEqual(publicPDF,generate(data,cv,compose(data,cv,'en','research',['elisa'])));console.log('CV builder matcher and PDF tests passed.');
