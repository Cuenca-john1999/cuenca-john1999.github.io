import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {analyse,compose,generate} from '../assets/js/cv-builder-core.mjs';
const read=p=>JSON.parse(readFileSync(new URL('../data/market/'+p,import.meta.url),'utf8'));
const data=read('common-evidence.json'),cv=read('cv.json');
mkdirSync('test-output',{recursive:true});
for(const l of ['es','en','de'])for(const route of ['school','research','pharma','analytical','clinical']){
 const ids=route==='school'?analyse(data,'Our school science department needs someone to assemble apparatus for practical experiments, make solutions, prepare cultures, maintain equipment, manage inventory and follow health and safety regulations. Support teachers and students. Microsoft Office and English B2.').matches.slice(0,12).map(x=>x.id):data.routes[route].skills.slice(0,12);
 writeFileSync('test-output/custom-cv-'+l+'-'+route+'.pdf',generate(data,cv,compose(data,cv,l,route,ids)),'ascii');
}
