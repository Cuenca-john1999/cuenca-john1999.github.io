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
  const doc=nav.querySelector('a[href="#references"]');if(doc){doc.href='#recruitment-hub';doc.removeAttribute('data-i18n');doc.textContent=l.hub;}
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
