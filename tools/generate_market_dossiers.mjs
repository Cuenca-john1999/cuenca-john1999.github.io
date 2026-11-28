// Deterministic generation of public dossiers from the shared portfolio evidence.
import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
import { buildDossiers } from "../assets/js/cv-pdf-engine.mjs";
const files=buildDossiers(p=>readFileSync(resolve(root,p),'utf8'));
for(const [p,content] of Object.entries(files)){const path=resolve(root,p);if(process.argv.includes('--check')){if(readFileSync(path,'utf8')!==content)throw Error('Stale dossier: '+p);}else writeFileSync(path,content,'ascii');}
console.log('Verified/generated '+Object.keys(files).length+' public dossiers and CVs.');
