// Progressive disclosure preserves all portfolio content, direct links and no-JS fallback.
const main=document.querySelector('main.opening-stage');
if(main){
 const lang=document.documentElement.lang.slice(0,2),l=({
 es:{cv:'Crear CV a medida',cvSub:'Selecciona competencias o analiza una oferta sin salir de esta página.',docs:'CV, documentos y referencias',docsSub:'CV por especialidad, dosieres PDF, Europass y referencias profesionales.',technical:'Explorar competencias y equipamiento',technicalSub:'Catálogo completo, áreas profesionales, instrumentación y formación práctica.',detail:'Ver trayectoria en detalle',education:'Ver titulaciones y formación complementaria',projects:'Ver proyectos seleccionados',more:'Más información del perfil',roles:'Explorar por especialidad',packages:'Descargar documentación',staticCV:'CV por especialidad',contact:'Contacto',skills:'Competencias',experience:'Experiencia',profile:'Perfil',hub:'Candidatura',work:'Workbench'},
 en:{cv:'Build a tailored CV',cvSub:'Select skills or analyse a vacancy without leaving this page.',docs:'CVs, documents and references',docsSub:'Role-specific CVs, PDF dossiers, Europass and professional references.',technical:'Explore skills and equipment',technicalSub:'Full catalogue, professional fields, equipment and practical training.',detail:'View experience in detail',education:'View qualifications and additional training',projects:'View selected projects',more:'More about my profile',roles:'Explore by specialty',packages:'Download documentation',staticCV:'CVs by specialty',contact:'Contact',skills:'Skills',experience:'Experience',profile:'Profile',hub:'Applications',work:'Workbench'},
 de:{cv:'Lebenslauf anpassen',cvSub:'Kompetenzen auswählen oder eine Stellenanzeige auf dieser Seite analysieren.',docs:'Lebensläufe, Unterlagen und Referenzen',docsSub:'Fachbezogene Lebensläufe, PDF-Dossiers, Europass und berufliche Referenzen.',technical:'Kompetenzen und Geräte entdecken',technicalSub:'Vollständiger Katalog, Berufsfelder, Geräte und praktische Ausbildung.',detail:'Erfahrung im Detail ansehen',education:'Abschlüsse und weitere Ausbildung ansehen',projects:'Ausgewählte Projekte ansehen',more:'Weitere Profilinformationen',roles:'Nach Fachgebiet entdecken',packages:'Unterlagen herunterladen',staticCV:'Lebensläufe nach Fachgebiet',contact:'Kontakt',skills:'Kompetenzen',experience:'Erfahrung',profile:'Profil',hub:'Bewerbung',work:'Workbench'}
 })[lang]||{};
 const node=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e;};
 const byId=id=>document.getElementById(id);
 const direct=(parent,selector)=>Array.from(parent?.children||[]).filter(e=>e.matches(selector));
 function disclosure(id,title,subtitle,nodes){
  nodes=nodes.filter(Boolean);if(!nodes.length)return null;
  const d=node('details','home-disclosure');d.id=id;d.dataset.homeDisclosure='';
  const summary=node('summary','home-disclosure-title'),text=node('span','home-disclosure-text');
  text.append(node('strong','',title));if(subtitle)text.append(node('small','',subtitle));summary.append(text);
  const body=node('div','home-disclosure-body');nodes[0].before(d);d.append(summary,body);body.append(...nodes);return d;
 }
 const hub=byId('recruitment-hub'),builder=byId('cv-builder'),references=byId('references'),dossiers=byId(lang==='es'?'dosieres':'dossiers');
 if(hub&&builder){
  // Keep the actual interactive builder inline, with a clear single-click entry.
  disclosure('home-cv',l.cv,l.cvSub,[builder]);
  const panels=direct(hub,'.market-panel'),cards=direct(hub,'.market-doc-grid');
  // All downloadable materials and references share one place.
  const docNodes=[...cards,...panels,dossiers,references].filter(Boolean);
  const docs=disclosure('home-documents',l.docs,l.docsSub,docNodes);
  if(docs){
   const body=docs.querySelector('.home-disclosure-body');
   // The existing role cards are useful as technical shortcuts, not another set of documents.
   const rolePanel=panels.find(p=>p.querySelector('a[href*="?focus="]'));
   if(rolePanel)rolePanel.dataset.homeRolePanel='';
   const cvPanel=panels.find(p=>p.querySelector('a[href*="/cv-"][download]'));
   if(cvPanel)disclosure('home-static-cvs',l.staticCV,'',[cvPanel]);
   const pkg=panels.find(p=>p.hasAttribute('data-application-package'));
   if(pkg)disclosure('home-package',l.packages,'',[pkg]);
   for(const el of [dossiers,references])if(el)el.classList.add('home-nested-section');
  }
 }
 const fields=byId(({es:'areas-profesionales',de:'berufsfelder',en:'professional-fields'})[lang]);
 const catalogue=byId(({es:'catalogo-tecnico',de:'fachkatalog',en:'technical-catalogue'})[lang]);
 const equipment=byId(({es:'instrumentacion',de:'geraete',en:'equipment'})[lang]);
 const skills=byId('skills');
 if(skills&&fields&&catalogue&&equipment){
  const technical=disclosure('home-technical',l.technical,l.technicalSub,[fields,catalogue,equipment]);
  if(technical){skills.append(technical);for(const el of [fields,catalogue,equipment])el.classList.add('home-nested-section');}
  const roles=hub?.querySelector('[data-home-role-panel]');
  if(roles&&technical){const roleGroup=disclosure('home-roles',l.roles,'',[roles]);if(roleGroup)technical.querySelector('.home-disclosure-body').prepend(roleGroup);}
  // Inside the technical group, avoid opening 81 rows and all equipment by default.
  for(const [el,id] of [[catalogue,'home-catalogue'],[equipment,'home-equipment']]){
   const heading=el.querySelector('h2');if(heading){const d=disclosure(id,heading.textContent.trim(),'',[el]);if(d)d.classList.add('home-inner-disclosure');}
  }
 }

 const words=({"en":["Technical Explorer","Document Centre","Scientific Workbench","Portfolio","Explore laboratory techniques, equipment and professional fields.","Download CVs, Europass, technical dossiers and professional references.","Search the portfolio","Search techniques, qualifications, projects and documents","No matching entries.","Technical skills","Official vocational qualifications","External placements","Portfolio languages","Back to profile"],"es":["Explorador técnico","Centro documental","Scientific Workbench","Portafolio","Explora técnicas de laboratorio, instrumental y áreas profesionales.","Descarga CV, Europass, dosieres técnicos y referencias profesionales.","Buscar en el portafolio","Busca técnicas, titulaciones, proyectos y documentos","No se encontraron coincidencias.","Competencias técnicas","Titulaciones oficiales de FP","Centros de prácticas externas","Idiomas del portafolio","Volver al perfil"],"de":["Technik-Explorer","Dokumentenzentrum","Scientific Workbench","Portfolio","Labortechniken, Geräte und Berufsfelder entdecken.","Lebensläufe, Europass, Fach-Dossiers und berufliche Referenzen herunterladen.","Portfolio durchsuchen","Techniken, Abschlüsse, Projekte und Unterlagen suchen","Keine passenden Einträge.","Fachkompetenzen","Offizielle Berufsabschlüsse","Externe Praktikumsstellen","Portfolio-Sprachen","Zurück zum Profil"]})[lang];
 const techIds=new Set([fields?.id,catalogue?.id,equipment?.id,'home-technical','home-catalogue','home-equipment','home-roles'].filter(Boolean));
 const docIds=new Set([dossiers?.id,references?.id,'references-professional','home-documents','home-static-cvs','home-package'].filter(Boolean));
 const redirect=id=>techIds.has(id)?'technical':docIds.has(id)?'documents':null;
 const legacy=location.hash.slice(1),kind=redirect(legacy);
 if(kind){const url=new URL(kind+'/',location.href);url.search=location.search;url.hash=legacy.startsWith('home-')?'':legacy;location.replace(url.href);}
 function tile(title,sub,href,id){const a=node('a','explorer-link');a.href=href;a.id=id;a.append(node('strong','',title),node('small','',sub));return a;}
 const extraSearch=[];
 for(const a of byId('home-documents')?.querySelectorAll('a[href]')||[]){const href=a.getAttribute('href'),title=a.closest('article')?.querySelector('h3')?.textContent.trim()||a.textContent.trim();if(title&&/\.pdf(?:$|[?#])/.test(href))extraSearch.push([title,href,a.textContent.trim()]);}
 for(const card of equipment?.querySelectorAll('.market-card')||[]){const title=card.querySelector('h3')?.textContent.trim();if(title)extraSearch.push([title,'technical/#'+equipment.id,card.textContent]);}
 byId('home-technical')?.replaceWith(tile(words[0],words[4],'technical/','home-technical-link'));
 byId('home-documents')?.replaceWith(tile(words[1],words[5],'documents/','home-documents-link'));
 for(const a of main.querySelectorAll('a[href]')){const href=a.getAttribute('href');if(href.startsWith('#')){const id=href.slice(1),to=redirect(id);if(to)a.href=to+'/'+(id.startsWith('home-')?'':href);}else if(href.startsWith('?focus='))a.href='technical/'+href;}
 const hero=main.querySelector('.opening-composition');
 if(hero){const stats=node('div','portfolio-metrics');for(const [n,label] of [['81',words[9]],['2',words[10]],['2',words[11]],['3',words[12]]]){const item=node('div','portfolio-metric');item.append(node('strong','',n),node('small','',label));stats.append(item);}hero.querySelector('.opening-actions')?.before(stats);
 const form=node('form','portfolio-search'),lab=node('label','',words[6]),input=node('input');input.id='portfolio-search';input.type='search';input.placeholder=words[7];input.maxLength=120;lab.htmlFor=input.id;const results=node('div','portfolio-search-results');results.setAttribute('aria-live','polite');form.append(lab,input,results);hero.append(form);
 const root=new URL('../../',import.meta.url),norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/ß/g,'ss');let revision=0;
 const searchCopy=({en:['Some search sources could not be loaded. Try again.','Searching…'],es:['No se pudieron cargar algunas fuentes. Inténtalo de nuevo.','Buscando…'],de:['Einige Suchquellen konnten nicht geladen werden. Bitte erneut versuchen.','Suche läuft…']})[lang];
 const sources=new Map();
 function loadSource(path){if(!sources.has(path))sources.set(path,fetch(new URL(path,root)).then(r=>{if(!r.ok)throw Error('Search source unavailable');return r.json();}).catch(error=>{sources.delete(path);throw error;}));return sources.get(path);}
 const pages=[[words[0],words[4],'technical/'],[words[1],words[5],'documents/'],[words[2],'projects science research investigación proyectos projekte','workbench/'],[words[10],'education formación ausbildung','#education'],[l.cv,'CV curriculum lebenslauf','#cv-builder'],[l.contact,'contact contacto kontakt','#contact']];
 async function search(){const id=++revision,q=norm(input.value.trim());results.replaceChildren();if(!q){results.removeAttribute('aria-busy');return;}results.setAttribute('aria-busy','true');results.append(node('small','',searchCopy[1]));const loaded=await Promise.allSettled([loadSource('data/market/common-evidence.json'),loadSource('data/market/scientific-library.json')]);if(id!==revision)return;
 const [data,library]=loaded.map(r=>r.status==='fulfilled'?r.value:null),tokens=q.split(/\s+/).filter(Boolean);results.replaceChildren();results.removeAttribute('aria-busy');
 const hits=[];function add(title,detail,href){if(!title||!href)return;const name=norm(title),body=norm(detail||'');if(!tokens.every(w=>(name+' '+body).includes(w)))return;const rank=(name===q?100:name.startsWith(q)?50:name.includes(q)?25:0)+tokens.filter(w=>name.includes(w)).length*10;hits.push({title,href,rank});}
 for(const [title,detail,href] of pages)add(title,detail,href);
 for(const s of data?.skills||[]){const v=s.locales?.[lang];if(v)add(v.name,v.detail+' '+v.context,'technical/?q='+encodeURIComponent(v.name)+'#'+catalogue.id);}
 for(const [title,href,detail] of extraSearch)add(title,detail,href);
 for(const [group,prefix] of [['notes','note-'],['projects','academic-'],['cases','case-']])for(const item of library?.[group]||[]){const v=item[lang];if(v?.length)add(v[0],v.join(' '),'workbench/#'+prefix+item.id);}
 const unique=[...new Map(hits.sort((a,b)=>b.rank-a.rank||a.title.localeCompare(b.title,lang)).map(h=>[h.title+'|'+h.href,h])).values()];
 for(const {title,href} of unique.slice(0,9)){const a=node('a','',title);a.href=href;results.append(a);}if(loaded.some(r=>r.status==='rejected'))results.append(node('small','',searchCopy[0]));else if(!unique.length)results.append(node('small','',words[8]));}
 input.addEventListener('input',search);input.addEventListener('keydown',e=>{if(e.key==='Escape'){input.value='';search();}});form.addEventListener('submit',e=>{e.preventDefault();const first=results.querySelector('a');if(first)location.href=first.href;else search();});}

 const profile=byId('profile');if(profile){const more=direct(profile,'.readiness-strip,.market-actions');disclosure('home-profile-more',l.more,'',more);}
 const experience=byId('experience');if(experience)disclosure('home-experience',l.detail,'',direct(experience,'.focus-grid'));
 const education=byId('education');if(education)disclosure('home-education',l.education,'',direct(education,'.focus-grid,.europass-documentation'));
 const projects=byId('projects');if(projects)disclosure('home-projects',l.projects,'',direct(projects,'.project-grid'));
 // Keep concise navigation; education remains one scroll below experience and retains its deep link.
 const nav=document.querySelector('.site-nav');
 if(nav){
  const links=Array.from(nav.querySelectorAll('a'));
  const wanted=['#profile','#experience','#skills','#references','#contact'];
  for(const a of links)if(!wanted.includes(a.getAttribute('href')))a.remove();
  const doc=nav.querySelector('a[href="#references"]');if(doc){doc.href='documents/';doc.removeAttribute('data-i18n');doc.textContent=words[1];}const tech=nav.querySelector('a[href="#skills"]');if(tech){tech.href='technical/';tech.removeAttribute('data-i18n');tech.textContent=l.skills;}const work=node('a','',l.work);work.href='workbench/';nav.insertBefore(work,nav.lastElementChild);
 }
 function expand(target){
  if(!target)return;
  const ancestors=[];for(let p=target;p&&p!==main;p=p.parentElement)if(p.tagName==='DETAILS')ancestors.push(p);
  for(const d of ancestors.reverse())d.open=true;
  // Reveal section-level transitions immediately after expanding a deep link.
  for(let p=target;p&&p!==main;p=p.parentElement)if(p.matches('[data-sequence-section]'))p.classList.add('is-sequence-revealed');
  if(target.matches('[data-sequence-section]'))target.classList.add('is-sequence-revealed');
 }
 function anchor(hash){if(!hash||hash==='#')return null;try{return byId(decodeURIComponent(hash.slice(1)));}catch{return null;}}
 function openHash(){const t=anchor(location.hash);if(t){expand(t);requestAnimationFrame(()=>t.scrollIntoView({block:'start'}));}}
 document.addEventListener('click',e=>{
  const link=e.target.closest('a[href]');if(!link)return;
  let url;try{url=new URL(link.href,location.href);}catch{return;}
  if(url.origin===location.origin&&url.pathname===location.pathname&&url.search===location.search){const t=anchor(url.hash);if(t){expand(t);if(url.hash===location.hash)requestAnimationFrame(()=>t.scrollIntoView({block:'start'}));}}
 },true);
 window.addEventListener('hashchange',openHash);
 main.addEventListener('toggle',e=>{if(e.target.matches('details[data-home-disclosure]')&&e.target.open){for(const s of e.target.querySelectorAll('[data-sequence-section]'))s.classList.add('is-sequence-revealed');}},true);
 main.classList.add('home-compact');
 openHash();
}
