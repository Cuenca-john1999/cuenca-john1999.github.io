import {analyse,compose,generate,MAX_SKILLS} from './cv-builder-core.mjs';
import {zip} from './cv-builder-zip.mjs';
const root=new URL('../../',import.meta.url),$=id=>document.getElementById(id);
const el=(tag,txt,cls)=>{const n=document.createElement(tag);if(txt!==undefined)n.textContent=txt;if(cls)n.className=cls;return n;};
const fetchJSON=async path=>{const r=await fetch(new URL(path,root));if(!r.ok)throw Error('Load');return r.json();};
let lang=new URLSearchParams(location.search).get('lang');if(!['es','en','de'].includes(lang))lang='en';
const state={lang,role:'general',ids:[],offer:'',second:'',search:'',personal:false,contact:'',analysis:null,comparison:null,docs:new Set()};
let data,cv,copy,recruit,refs={};
const skill=id=>data.skills.find(s=>s.id===id),t=()=>copy[state.lang];
const label=(name,node)=>{const e=el('label');e.append(el('span',name),node);return e;};
const btn=(text,fn,id,primary=false)=>{const n=el('button',text,primary?'primary':'');n.type='button';n.id=id;n.addEventListener('click',fn);return n;};
const field=(tag,id,value,fn)=>{const n=el(tag);n.id=id;n.value=value;n.addEventListener('input',()=>fn(n.value));return n;};
const list=items=>{const n=el('ul');for(const item of items)n.append(el('li',item));return n;};
const panel=title=>{const n=el('section',undefined,'panel');n.append(el('h2',title));return n;};
const norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function status(s){refs.status.textContent=s;}
function choose(ids){state.ids=[...new Set(ids)].slice(0,MAX_SKILLS);renderSelection();renderPreview();}
function runAnalysis(){state.analysis=analyse(data,state.offer);state.comparison=state.second.trim()?analyse(data,state.second):null;if(state.analysis.matches.length){state.role=state.analysis.route;refs.role.value=state.role;}renderAnalysis();renderPreview();}
function renderAnalysis(){
 const box=refs.results;box.replaceChildren();if(!state.analysis)return;
 const m=t();
 function show(result,title){const block=el('div');block.append(el('h3',title),el('p',m.matches,'muted'));
 if(result.matches.length){for(const hit of result.matches){const s=skill(hit.id),v=s.locales[state.lang],row=el('div',undefined,'match');row.append(el('strong',v.name),el('div',v.level+' · '+s.source,'muted'),el('small',hit.terms.join(' / ')));block.append(row);}}
 else block.append(el('p',m.noMatches));
 block.append(el('h3',m.gaps),result.gaps.length?list(result.gaps.map(g=>g.label[state.lang])):el('p',m.noGaps,'muted'));return block;}
 box.append(show(state.analysis,m.offer));
 if(state.comparison){box.append(show(state.comparison,m.second));const a=new Set(state.analysis.matches.map(x=>x.id)),b=new Set(state.comparison.matches.map(x=>x.id)),cmp=el('div',undefined,'comparison');for(const [title,ids] of [[m.shared,[...a].filter(id=>b.has(id))],[m.only1,[...a].filter(id=>!b.has(id))],[m.only2,[...b].filter(id=>!a.has(id))]]){const d=el('div');d.append(el('h3',title),ids.length?list(ids.map(id=>skill(id).locales[state.lang].name)):el('p','—'));cmp.append(d);}box.append(cmp);}
 const picks=state.analysis.matches.map(x=>x.id),use=btn(m.use,()=>choose(picks),'use-suggestions',true);use.disabled=!picks.length;box.append(use);
}
function renderSelection(){
 const box=refs.list;box.replaceChildren();const selected=new Set(state.ids),q=norm(state.search);
 const rows=[...data.skills].sort((a,b)=>Number(selected.has(b.id))-Number(selected.has(a.id))||a.locales[state.lang].order-b.locales[state.lang].order);
 for(const s of rows){const v=s.locales[state.lang];if(q&&!norm([v.name,v.context,v.detail,s.source,data.topics[s.topic][state.lang]].join(' ')).includes(q))continue;
 const check=el('input');check.type='checkbox';check.dataset.skillId=s.id;check.checked=selected.has(s.id);check.disabled=!check.checked&&selected.size>=MAX_SKILLS;check.addEventListener('change',()=>choose(check.checked?[...state.ids,s.id]:state.ids.filter(x=>x!==s.id)));
 const c=el('label',undefined,'choice'),txt=el('span');txt.append(el('strong',v.name),el('small',v.level+' · '+s.source),el('small',v.detail));c.append(check,txt);box.append(c);}
 refs.count.textContent=t().count+': '+state.ids.length+' / '+MAX_SKILLS;
}
function model(){return compose(data,cv,state.lang,state.role,state.ids,state.personal?state.contact:'');}
function renderPreview(){
 const m=t(),box=refs.preview;box.replaceChildren();for(const b of refs.exports)b.disabled=!state.ids.length;
 if(!state.ids.length){box.append(el('p',m.none));return;}
 try{const c=model(),v=c.variant,locale=cv[state.lang];box.append(el('h2','Jhon M. Cuenca'),el('p',v.subtitle,'subtitle'),el('p',locale.mobility+(c.contact?' | '+c.contact:'')),el('hr'),el('h3',m.profile),el('p',v.profile));
 const academic=()=>{if(v.academic.length)box.append(el('h3',m.academic),list(v.academic));};if(v.priority==='academic')academic();
 box.append(el('h3',m.placements));for(const i of v.order)box.append(el('strong',locale.exp[i][0]),el('p',locale.exp[i][1]),list(v.placements[i]));if(v.priority!=='academic')academic();
 box.append(el('hr'),el('h3',m.skills),list(c.ids.map(id=>{const s=skill(id),v=s.locales[state.lang];return v.name+' — '+v.level+' · '+s.source;})),el('h3',locale.layout.education),list(['Técnico Superior en Laboratorio Clínico y Biomédico','Técnico en Operaciones de Laboratorio']));}
 catch(e){box.append(el('p',m.error));for(const b of refs.exports)b.disabled=true;}
}
function save(blob,name,preview=false){const url=URL.createObjectURL(blob),a=el('a');a.href=url;if(preview){a.target='_blank';a.rel='noopener';}else a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),preview?300000:60000);}
function pdfBlob(){return new Blob([generate(data,cv,model())],{type:'application/pdf'});}
function name(){return 'JMC-CV-'+state.lang+'-'+state.role+'.pdf';}
function downloadPDF(preview=false){try{save(pdfBlob(),name(),preview);status(t().done);}catch(e){status(t().error);}}
async function downloadZIP(){
 try{const blob=pdfBlob(),fileName=name(),docs=[...state.docs];refs.exports.forEach(b=>b.disabled=true);status(t().working);const entries=[{name:fileName,bytes:new Uint8Array(await blob.arrayBuffer())}];for(const path of docs){const url=new URL(path,root);if(url.origin!==location.origin||!url.pathname.includes('/assets/documents/')||!url.pathname.endsWith('.pdf'))throw Error('Invalid file');const r=await fetch(url);if(!r.ok)throw Error('Download');const bytes=new Uint8Array(await r.arrayBuffer());if(String.fromCharCode(...bytes.slice(0,5))!=='%PDF-')throw Error('Invalid PDF');entries.push({name:url.pathname.split('/').pop(),bytes});}save(zip(entries),fileName.replace('.pdf','.zip'));status(t().done);}
 catch(e){status(t().error);}finally{renderPreview();}
}
function render(){
 const m=t(),app=$('builder');document.documentElement.lang=state.lang;document.title=m.title+' | Jhon M. Cuenca';$('back').textContent='Jhon M. Cuenca · '+m.back;$('back').href=new URL(state.lang==='en'?'':state.lang+'/',root).href;$('language').value=state.lang;$('language-label').textContent=m.language;app.replaceChildren();
 app.append(el('h1',m.title),el('p',m.intro),el('p',m.privacy,'muted'));
 const offers=panel(m.offer),input=field('textarea','offer',state.offer,v=>state.offer=v),other=field('textarea','second-offer',state.second,v=>state.second=v);
 input.maxLength=24000;other.maxLength=24000;const det=el('details');det.open=!!state.second;det.append(el('summary',m.second),label(m.second,other));
 offers.append(label(m.offer,input),det,el('p',m.warning,'warning'),btn(m.analyse,runAnalysis,'analyse',true));refs.results=el('div');refs.results.id='analysis-results';offers.append(refs.results);app.append(offers);
 const cols=el('div',undefined,'split'),left=panel(m.selection),right=panel(m.preview),role=el('select');role.id='role';
 for(const [id,title] of [['general',m.general],...Object.entries(data.routes).map(([id,r])=>[id,r.labels[state.lang]])]){const o=el('option',title);o.value=id;role.append(o);}role.value=state.role;role.addEventListener('change',()=>{state.role=role.value;renderPreview();});refs.role=role;
 const search=field('input','skill-search',state.search,v=>{state.search=v;renderSelection();});search.type='search';
 refs.count=el('p');refs.count.id='selected-count';refs.count.setAttribute('aria-live','polite');refs.list=el('div',undefined,'selection');refs.list.id='skill-list';
 left.append(label(m.role,role),btn(m.preset,()=>choose(state.role==='general'?cv.selections.general:data.routes[state.role].skills),'preset'),el('p',m.max,'muted'),label(m.search,search),refs.count,btn(m.clear,()=>choose([]),'clear-selection'),refs.list);
 const check=el('input');check.type='checkbox';check.id='personal-mode';check.checked=state.personal;const contact=field('input','contact-input',state.contact,v=>{state.contact=v;renderPreview();});contact.maxLength=150;contact.autocomplete='off';const contactLabel=label(m.contact,contact);contactLabel.hidden=!state.personal;check.addEventListener('change',()=>{state.personal=check.checked;contactLabel.hidden=!state.personal;if(!state.personal){state.contact='';contact.value='';}renderPreview();});
 const personal=el('label',undefined,'choice');personal.append(check,el('span',m.personal));left.append(personal,contactLabel);
 refs.preview=el('div',undefined,'preview');refs.preview.id='content-preview';const pdf=btn(m.pdf,()=>downloadPDF(),'download-pdf',true),view=btn(m.open,()=>downloadPDF(true),'open-pdf');right.append(el('p',m.previewNote,'muted'),refs.preview,pdf,view);cols.append(left,right);app.append(cols);
 const pack=panel(m.package);pack.append(el('p',m.packageNote));const docs=el('fieldset');docs.append(el('legend',m.package));const paths=['assets/documents/europass-clinical-biomedical-laboratory.pdf','assets/documents/europass-laboratory-operations.pdf',...recruit[state.lang].names.map(n=>'assets/documents/'+state.lang+'/'+n+'.pdf')];for(const [i,path] of paths.entries()){const c=el('input');c.type='checkbox';c.checked=state.docs.has(path);c.addEventListener('change',()=>c.checked?state.docs.add(path):state.docs.delete(path));const l=el('label');l.append(c,el('span',recruit[state.lang].files[i+1]));docs.append(l);}const z=btn(m.zip,downloadZIP,'download-zip',true);pack.append(docs,z);app.append(pack);
 refs.status=el('p');refs.status.setAttribute('role','status');app.append(refs.status);refs.exports=[pdf,view,z];renderAnalysis();renderSelection();renderPreview();
}
$('language').addEventListener('change',()=>{if(!data)return;state.lang=$('language').value;state.docs.clear();render();});
try{[data,cv,copy,recruit]=await Promise.all([fetchJSON('data/market/common-evidence.json'),fetchJSON('data/market/cv.json'),fetchJSON('data/market/cv-builder-ui.json'),fetchJSON('data/market/recruitment.json')]);render();}catch(e){const n=$('load-status')||$('builder');n.textContent=copy?.[lang]?.loadError||'Could not load catalogue / No se pudo cargar el catálogo / Katalog konnte nicht geladen werden';}
