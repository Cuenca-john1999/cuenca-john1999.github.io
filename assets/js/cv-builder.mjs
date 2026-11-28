import {analyse,compose,generate,MAX_SKILLS} from './cv-builder-core.mjs';
import {zip} from './cv-builder-zip.mjs';
const root=new URL('../../',import.meta.url),mount=document.querySelector('[data-cv-builder]'),$=id=>mount?.querySelector('#'+id);
const el=(tag,txt,cls)=>{const n=document.createElement(tag);if(txt!==undefined)n.textContent=txt;if(cls)n.className=cls;return n;};
const fetchJSON=async path=>{const r=await fetch(new URL(path,root));if(!r.ok)throw Error('Load');return r.json();};
let lang=mount?.dataset.cvLang||new URLSearchParams(location.search).get('lang')||document.documentElement.lang;if(!['es','en','de'].includes(lang))lang='en';
const standalone=mount?.dataset.cvStandalone==='true';
const state={lang,role:'general',ids:[],offer:'',second:'',search:'',personal:false,contact:'',analysis:null,comparison:null,docs:new Set(),all:false,topic:'',advanced:false,extra:false,details:false};
let data,cv,copy,recruit,refs={};
const skill=id=>data.skills.find(s=>s.id===id),t=()=>copy[state.lang];
const label=(name,node)=>{const e=el('label');e.append(el('span',name),node);return e;};
const btn=(text,fn,id,primary=false)=>{const n=el('button',text,primary?'primary':'');n.type='button';n.id=id;n.addEventListener('click',fn);return n;};
const field=(tag,id,value,fn)=>{const n=el(tag);n.id=id;n.value=value;n.addEventListener('input',()=>fn(n.value));return n;};
const list=items=>{const n=el('ul');for(const item of items)n.append(el('li',item));return n;};
const panel=title=>{const n=el('div',undefined,'cv-panel');n.append(el('h4',title,'cv-step'));return n;};
const recommended=()=>state.role==='general'?cv.selections.general:data.routes[state.role].skills;
const presetIds=()=>recommended().slice(0,8);
const norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function status(s){refs.status.textContent=s;}
function choose(ids){state.ids=[...new Set(ids)].slice(0,MAX_SKILLS);renderSelection();renderPreview();}
function runAnalysis(){state.analysis=analyse(data,state.offer);state.comparison=state.second.trim()?analyse(data,state.second):null;if(state.analysis.matches.length){state.role=state.analysis.route;refs.role.value=state.role;}renderAnalysis();renderSelection();renderPreview();}
function renderAnalysis(){
 const box=refs.results;box.replaceChildren();if(!state.analysis)return;
 const m=t();
 function show(result,title){const block=el('div');block.append(el('h3',title),el('p',m.matches,'muted'));
 if(result.matches.length){for(const hit of result.matches){const s=skill(hit.id),v=s.locales[state.lang],row=el('div',undefined,'match');row.append(el('strong',v.name),el('div',v.level+' · '+s.source,'muted'),el('small',hit.terms.join(' / ')));block.append(row);}}
 else block.append(el('p',m.noMatches));
 block.append(el('h3',m.gaps),result.gaps.length?list(result.gaps.map(g=>g.label[state.lang])):el('p',m.noGaps,'muted'));return block;}
 box.append(show(state.analysis,m.offer));
 if(state.comparison){box.append(show(state.comparison,m.second));const a=new Set(state.analysis.matches.map(x=>x.id)),b=new Set(state.comparison.matches.map(x=>x.id)),cmp=el('div',undefined,'comparison');for(const [title,ids] of [[m.shared,[...a].filter(id=>b.has(id))],[m.only1,[...a].filter(id=>!b.has(id))],[m.only2,[...b].filter(id=>!a.has(id))]]){const d=el('div');d.append(el('h3',title),ids.length?list(ids.map(id=>skill(id).locales[state.lang].name)):el('p','—'));cmp.append(d);}box.append(cmp);}
 const picks=state.analysis.matches.map(x=>x.id),use=btn(m.use,()=>{state.search='';state.topic='';refs.search.value='';refs.topic.value='';choose(picks);},'cv-use-suggestions',true);use.disabled=!picks.length;box.append(use);
}
function renderSelection(){
 const box=refs.list,focused=document.activeElement?.dataset.skillId,scroll=box.scrollTop;box.replaceChildren();
 const selected=new Set(state.ids),q=norm(state.search),suggested=new Set([...recommended(),...(state.analysis?.matches||[]).map(x=>x.id)]);
 const rows=[...data.skills].sort((a,b)=>Number(selected.has(b.id))-Number(selected.has(a.id))||Number(suggested.has(b.id))-Number(suggested.has(a.id))||a.locales[state.lang].order-b.locales[state.lang].order);let visible=0;
 for(const s of rows){const v=s.locales[state.lang];if(!state.all&&!q&&!state.topic&&!selected.has(s.id)&&!suggested.has(s.id))continue;if(state.topic&&s.topic!==state.topic)continue;if(q&&!norm([v.name,v.context,v.detail,s.source,data.topics[s.topic][state.lang]].join(' ')).includes(q))continue;visible++;
 const check=el('input');check.type='checkbox';check.dataset.skillId=s.id;check.checked=selected.has(s.id);check.disabled=!check.checked&&selected.size>=MAX_SKILLS;check.addEventListener('change',()=>choose(check.checked?[...state.ids,s.id]:state.ids.filter(x=>x!==s.id)));
 const c=el('div',undefined,'cv-choice'+(check.checked?' is-selected':'')),lab=el('label'),txt=el('span');txt.append(el('strong',v.name),el('small',v.level+' · '+s.source));lab.append(check,txt);const det=el('details',undefined,'cv-skill-context');det.append(el('summary',t().scope),el('p',v.detail));c.append(lab,det);box.append(c);}
 if(!visible)box.append(el('p',t().noResults,'muted'));
 box.scrollTop=scroll;if(focused)Array.from(box.querySelectorAll('[data-skill-id]')).find(n=>n.dataset.skillId===focused)?.focus({preventScroll:true});
 refs.count.textContent=t().count+': '+state.ids.length+' / '+MAX_SKILLS;refs.progress.max=MAX_SKILLS;refs.progress.value=state.ids.length;refs.all.checked=state.all;
}
function model(){return compose(data,cv,state.lang,state.role,state.ids,state.personal?state.contact:'');}
function renderPreview(){
 const m=t(),box=refs.preview,summary=refs.summary;box.replaceChildren();summary.replaceChildren();for(const b of refs.exports)b.disabled=!state.ids.length;
 if(!state.ids.length){summary.append(el('p',m.none));return;}
 try{const c=model(),v=c.variant,locale=cv[state.lang];summary.append(el('p',v.subtitle,'cv-summary-role'),el('p',m.format,'muted'));const tags=el('div',undefined,'cv-tags');for(const id of state.ids)tags.append(el('span',skill(id).locales[state.lang].name,'cv-tag'));summary.append(tags);box.append(el('h2','Jhon M. Cuenca'),el('p',v.subtitle,'subtitle'),el('p',locale.mobility+(c.contact?' | '+c.contact:'')),el('hr'),el('h3',m.profile),el('p',v.profile));
 const academic=()=>{if(v.academic.length)box.append(el('h3',m.academic),list(v.academic));};if(v.priority==='academic')academic();
 box.append(el('h3',m.placements));for(const i of v.order)box.append(el('strong',locale.exp[i][0]),el('p',locale.exp[i][1]),list(v.placements[i]));if(v.priority!=='academic')academic();
 box.append(el('hr'),el('h3',m.skills),list(c.ids.map(id=>{const s=skill(id),v=s.locales[state.lang];return v.name+' — '+v.level+' · '+s.source;})),el('h3',locale.layout.education),list(['Técnico Superior en Laboratorio Clínico y Biomédico','Técnico en Operaciones de Laboratorio']));}
 catch(e){summary.append(el('p',m.error));for(const b of refs.exports)b.disabled=true;}
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
 const m=t(),app=mount;app.lang=state.lang;if(standalone){document.documentElement.lang=state.lang;document.title=m.title+' | Jhon M. Cuenca';const back=document.getElementById('cv-back');if(back){back.textContent='Jhon M. Cuenca · '+m.back;back.href=new URL(state.lang==='en'?'':state.lang+'/',root).href;}}app.replaceChildren();
 const head=el('div',undefined,'cv-head'),headText=el('div'),meta=el('div',undefined,'cv-meta');headText.append(el(standalone?'h1':'h3',m.title,'cv-title'),el('p',m.intro,'cv-intro'));meta.append(el('span',m.format,'cv-format'),el('small',m.local));head.append(headText,meta);app.append(head);
 const profile=panel(m.step1),controls=el('div',undefined,'cv-controls'),role=el('select');role.id='cv-role';
 for(const [id,title] of [['general',m.general],...Object.entries(data.routes).map(([id,r])=>[id,r.labels[state.lang]])]){const o=el('option',title);o.value=id;role.append(o);}role.value=state.role;role.addEventListener('change',()=>{state.role=role.value;state.all=false;state.topic='';state.search='';refs.search.value='';refs.topic.value='';choose(presetIds());});refs.role=role;
 const language=el('select');language.id='cv-language';for(const [id,title] of [['es','Español'],['en','English'],['de','Deutsch']]){const o=el('option',title);o.value=id;language.append(o);}language.value=state.lang;language.addEventListener('change',()=>{state.lang=language.value;state.docs.clear();render();$('cv-language')?.focus();});controls.append(label(m.role,role),label(m.language,language));profile.append(controls);app.append(profile);
 const advanced=el('details',undefined,'cv-disclosure');advanced.id='cv-advanced';advanced.open=state.advanced;advanced.addEventListener('toggle',()=>state.advanced=advanced.open);
 const input=field('textarea','cv-offer',state.offer,v=>state.offer=v),other=field('textarea','cv-second-offer',state.second,v=>state.second=v);input.maxLength=24000;other.maxLength=24000;const det=el('details',undefined,'cv-subdisclosure');det.open=!!state.second;det.append(el('summary',m.second),label(m.second,other));
 const inner=el('div',undefined,'cv-disclosure-body');inner.append(label(m.offer,input),det,btn(m.analyse,runAnalysis,'cv-analyse',true),el('p',m.warning,'muted'));refs.results=el('div');refs.results.id='cv-analysis-results';inner.append(refs.results);advanced.append(el('summary',m.advanced),inner);app.append(advanced);
 const cols=el('div',undefined,'cv-columns'),left=panel(m.step2),right=panel(m.step3),filter=el('div',undefined,'cv-controls'),search=field('input','cv-skill-search',state.search,v=>{state.search=v;renderSelection();});search.type='search';search.placeholder=m.search;refs.search=search;
 const topic=el('select');topic.id='cv-topic';const any=el('option',m.all);any.value='';topic.append(any);for(const [id,labels] of Object.entries(data.topics)){const o=el('option',labels[state.lang]);o.value=id;topic.append(o);}topic.value=state.topic;topic.addEventListener('change',()=>{state.topic=topic.value;renderSelection();});refs.topic=topic;filter.append(label(m.search,search),label(m.topic,topic));left.append(filter);
 const tally=el('div',undefined,'cv-tally');refs.count=el('span');refs.count.id='cv-selected-count';refs.count.setAttribute('aria-live','polite');refs.progress=el('progress');refs.progress.setAttribute('aria-label',m.count);tally.append(refs.count,refs.progress);left.append(tally);
 const actions=el('div',undefined,'cv-actions'),all=el('input');all.type='checkbox';all.id='cv-all';all.checked=state.all;all.addEventListener('change',()=>{state.all=all.checked;renderSelection();});refs.all=all;const allLabel=el('label',undefined,'cv-inline');allLabel.append(all,el('span',m.showAll));actions.append(allLabel,btn(m.preset,()=>choose(presetIds()),'cv-preset'),btn(m.clear,()=>choose([]),'cv-clear'));left.append(actions,el('p',m.max,'muted'));
 refs.list=el('div',undefined,'cv-selection');refs.list.id='cv-skill-list';left.append(refs.list);
 refs.summary=el('div',undefined,'cv-summary');refs.summary.id='cv-summary';right.append(refs.summary);
 const pdf=btn(m.pdf,()=>downloadPDF(),'cv-download-pdf',true),view=btn(m.open,()=>downloadPDF(true),'cv-open-pdf');const downloads=el('div',undefined,'cv-downloads');downloads.append(pdf,view);right.append(downloads);
 const content=el('details',undefined,'cv-disclosure cv-preview-details');content.id='cv-preview-details';content.open=state.details;content.addEventListener('toggle',()=>state.details=content.open);refs.preview=el('div',undefined,'cv-paper');refs.preview.id='cv-content-preview';content.append(el('summary',m.details),el('p',m.previewNote,'muted'),refs.preview);right.append(content);
 refs.status=el('p',undefined,'cv-status');refs.status.setAttribute('role','status');right.append(refs.status);cols.append(left,right);app.append(cols);
 const extra=el('details',undefined,'cv-disclosure');extra.id='cv-extra';extra.open=state.extra;extra.addEventListener('toggle',()=>state.extra=extra.open);extra.append(el('summary',m.extra));const pack=el('div',undefined,'cv-disclosure-body');
 const check=el('input');check.type='checkbox';check.id='cv-personal-mode';check.checked=state.personal;const contact=field('input','cv-contact-input',state.contact,v=>{state.contact=v;renderPreview();});contact.maxLength=150;contact.autocomplete='off';const contactLabel=label(m.contact,contact);contactLabel.hidden=!state.personal;check.addEventListener('change',()=>{state.personal=check.checked;contactLabel.hidden=!state.personal;if(!state.personal){state.contact='';contact.value='';}renderPreview();});
 const personal=el('label',undefined,'cv-inline');personal.append(check,el('span',m.personal));pack.append(personal,el('p',m.privacy,'muted'),contactLabel,el('h4',m.package),el('p',m.packageNote,'muted'));const docs=el('fieldset',undefined,'cv-docs');docs.append(el('legend',m.package));const paths=['assets/documents/europass-clinical-biomedical-laboratory.pdf','assets/documents/europass-laboratory-operations.pdf',...recruit[state.lang].names.map(n=>'assets/documents/'+state.lang+'/'+n+'.pdf')];for(const [i,path] of paths.entries()){const c=el('input');c.type='checkbox';c.checked=state.docs.has(path);c.addEventListener('change',()=>c.checked?state.docs.add(path):state.docs.delete(path));const l=el('label',undefined,'cv-inline');l.append(c,el('span',recruit[state.lang].files[i+1]));docs.append(l);}const z=btn(m.zip,downloadZIP,'cv-download-zip',true);pack.append(docs,z);extra.append(pack);app.append(extra);
 if(!standalone){const link=el('a',m.full,'cv-full-link');link.href=new URL('cv-builder/?lang='+state.lang,root).href;app.append(link);}
 refs.exports=[pdf,view,z];renderAnalysis();renderSelection();renderPreview();
}
if(mount){
 try{[data,cv,copy,recruit]=await Promise.all([fetchJSON('data/market/common-evidence.json'),fetchJSON('data/market/cv.json'),fetchJSON('data/market/cv-builder-ui.json'),fetchJSON('data/market/recruitment.json')]);state.ids=presetIds();render();}catch(e){console.warn('[CV Builder]',e);const n=mount.querySelector('[data-cv-status]');if(n)n.textContent=copy?.[lang]?.loadError||'Could not load catalogue / No se pudo cargar el catálogo / Katalog konnte nicht geladen werden';}
}
