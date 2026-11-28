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

const school=analyse(data,'Our school science department needs someone to assemble apparatus for practical experiments, make solutions, prepare cultures, maintain equipment, manage inventory and follow health and safety regulations. Support teachers and students. Microsoft Office and English B2. Safeguarding and risk assessments are required.');
assert.equal(school.route,'school');for(const id of ['solutions','instrumentation','culture-media-preparation','emergency-equipment'])assert(has(school,id));assert(school.factIds.includes('teaching'));assert(school.factIds.includes('digital'));assert(school.gaps.some(x=>x.id==='safeguarding'));
assert.equal(analyse(data,'En un colegio, preparar experimentos y disoluciones, mantener equipos y gestionar inventario.').route,'school');
assert.equal(analyse(data,'Schule: Experimente vorbereiten, Geräte warten, Laborbedarf und Arbeitsschutz.').route,'school');
assert.notEqual(analyse(data,'Research laboratory: HaCaT cell culture, PCR and ELISA.').route,'school');
for(const l of ['es','en','de']){const pdf=generate(data,cv,compose(data,cv,l,'school',school.matches.slice(0,12).map(x=>x.id)));assert(pdf.includes('FORM-ED / WASHI'));assert(pdf.includes('/Count 2'));}

const priority=analyse(data,'PCR is essential, but GMP is not required. ELISA is desirable.');
assert.equal(priority.matches.find(x=>x.id==='pcr').priority,'required');
assert.equal(priority.matches.find(x=>x.id==='elisa').priority,'preferred');
assert(!priority.gaps.some(x=>x.id==='gmp'));assert(priority.notRequired.some(x=>x.id==='gmp'));
assert(!has(analyse(data,'PCR is not required. ELISA is essential.'),'pcr'));
assert(has(analyse(data,'Separate immune cells from blood and isolate nucleic acids.'),'cd4-cd14'));
const long=analyse(data,'Organisation and laboratory resources. '.repeat(800)+'\nPCR and ELISA are required.');
assert(has(long,'pcr')&&has(long,'elisa'));

const regression=JSON.parse(readFileSync(new URL('./cv_semantic_benchmark_cases.json',import.meta.url),'utf8'));
for(const c of regression){
 const result=analyse(data,(c.prefix||'').repeat(c.repeat||0)+c.text);
 const keys=[...result.matches.map(x=>'skill:'+x.id),...result.factIds.map(x=>'fact:'+x)];
 for(const id of c.expected)assert(keys.includes(id),c.id+' missing '+id);
 for(const id of c.gaps)assert(result.gaps.some(x=>x.id===id),c.id+' missing gap '+id);
 for(const id of c.blocked||[])assert(!keys.includes(id),c.id+' blocked '+id);
 for(const id of c.excludedGaps||[])assert(!result.gaps.some(x=>x.id===id),c.id+' excluded gap '+id);
 assert.equal(result.route,c.route,c.id);
}
console.log('13 vacancy regressions passed.');
