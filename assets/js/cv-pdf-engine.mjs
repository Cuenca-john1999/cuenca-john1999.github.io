export function buildDossiers(read, custom=null){
 const data=JSON.parse(read("data/market/common-evidence.json")),recruit=custom?null:JSON.parse(read("data/market/recruitment.json")),cv=JSON.parse(read("data/market/cv.json"));
 const W=[278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584];
 const B=[278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584];
 const norm=s=>s.replace(/[–—]/g,"-").replace(/[’‘]/g,"'").replace(/[“”]/g,'"').replace(/\u00a0/g," ");
 const glyph=(c,bold)=>{if(c==="·")return 278;if(c==="ß")return 611;if(c==="°")return 400;const a=c.normalize("NFD").replace(/[\u0300-\u036f]/g,"");return (bold?B:W)[a.charCodeAt(0)-32]||1000};
 const width=(s,z,b=false)=>Array.from(norm(s)).reduce((n,c)=>n+glyph(c,b),0)*z/1000;
 const esc=s=>Array.from(norm(s),c=>{const n=c.charCodeAt(0);if(n<32||n>255)throw Error("Unsupported glyph "+c);return n>126?"\\"+n.toString(8).padStart(3,"0"):"\\()".includes(c)?"\\"+c:c}).join("");
 function wrap(s,z,max,b=false){let out=[],line="";for(const w of norm(s).split(/\s+/).filter(Boolean)){const test=line?line+" "+w:w;if(width(test,z,b)<=max-2){line=test;continue}if(line)out.push(line);if(width(w,z,b)>max-2)throw Error("Long word "+w);line=w}if(line)out.push(line);return out}
 const plain=s=>s.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/<[^>]*>/g,"").trim();
 const C={navy:"0.09 0.17 0.27",ink:"0.12 0.19 0.27",muted:"0.29 0.36 0.44",blue:"0.12 0.36 0.58",line:"0.82 0.86 0.90",pale:"0.95 0.97 0.99",white:"1 1 1"};
 const L=44,R=551,M=R-L;
 const cfg={
 es:{file:"spain",brand:"PORTAFOLIO PROFESIONAL",market:"ESPAÑA",dossier:"DOSIER TÉCNICO",catalogue:"Catálogo de competencias técnicas",url:"cuenca-john1999.github.io/es/",profile:"Perfil profesional",skills:"Competencias destacadas",qual:"Titulaciones oficiales",context:"Contexto profesional",support:"Documentación complementaria",supportText:"CV, suplementos Europass, catálogo técnico y referencias profesionales disponibles en el portafolio.",catalogIntro:"Métodos y técnicas agrupados por área, con el contexto en el que adquirí cada competencia.",columns:["Técnica y contexto","Aplicación o formación"],areas:{clinical:"Laboratorio clínico y hospitalario",research:"Investigación biomédica",analytical:"Laboratorio químico, analítico e industrial"},contexts:{clinical:"Formación sanitaria en CEAC FP Oficial y prácticas académicas en IES Virgen de la Paloma.",research:"Prácticas FCT en inmunología y biología molecular en La Princesa; formación complementaria en experimentación animal.",analytical:"Prácticas Erasmus+ en Celignis (Irlanda), con responsabilidad progresiva en materia volátil; formación en química analítica."},animal:"El curso A+B+C acredita la formación; la capacitación individual se rige por el procedimiento administrativo correspondiente.",legal:"La formación clínica y las prácticas de investigación se describen por separado en el catálogo."},
 en:{file:"international",brand:"PROFESSIONAL PORTFOLIO",market:"INTERNATIONAL",dossier:"TECHNICAL PROFILE",catalogue:"Technical skills catalogue",url:"cuenca-john1999.github.io/",profile:"Professional profile",skills:"Selected technical skills",qual:"Spanish qualifications",context:"Professional context",support:"Supporting documents",supportText:"Public CV, Europass supplements, full skills catalogue and professional references are available in the portfolio.",catalogIntro:"Methods and techniques grouped by field, with the setting in which each skill was developed.",columns:["Technique and context","Application or training"],areas:{clinical:"Clinical and diagnostic laboratories",research:"Biomedical research and biotechnology",analytical:"Analytical chemistry and industrial laboratories"},contexts:{clinical:"Clinical laboratory training at CEAC FP Oficial and academic practical work at IES Virgen de la Paloma. Regulated clinical roles depend on national recognition and registration requirements.",research:"Immunology and molecular biology placement at La Princesa, complemented by a course in animal experimentation.",analytical:"Erasmus+ placement at Celignis in Ireland, with progressive responsibility in volatile matter analysis and vocational chemistry training."},animal:"The A+B+C course diploma records training. Individual authorisation and recognition depend on the applicable national procedures.",legal:"Professional recognition and registration depend on the destination and role."},
 de:{file:"germany",brand:"BERUFSPORTFOLIO",market:"DEUTSCHLAND",dossier:"FACHPROFIL",catalogue:"Technischer Kompetenzkatalog",url:"cuenca-john1999.github.io/de/",profile:"Berufliches Profil",skills:"Fachliche Schwerpunkte",qual:"Spanische Berufsabschlüsse",context:"Beruflicher Kontext",support:"Ergänzende Unterlagen",supportText:"Lebenslauf, Europass-Zeugniserläuterungen, Kompetenzkatalog und berufliche Referenzen sind im Portfolio verfügbar.",catalogIntro:"Methoden und Techniken nach Fachgebiet, mit dem jeweiligen Ausbildungs- oder Praxiskontext.",columns:["Methode und Kontext","Anwendung oder Ausbildung"],areas:{clinical:"Klinische Laboranalytik",research:"Biomedizinische Forschung und Biotechnologie",analytical:"Chemische Analytik und Industrielabor"},contexts:{clinical:"Spanische Ausbildung in der klinischen Laboranalytik. Eine deutsche Anerkennung als MTL ist nicht nachgewiesen; Berufserlaubnis und vorbehaltene Tätigkeiten richten sich nach dem MTBG.",research:"Laborpraktikum in Immunologie und Molekularbiologie bei La Princesa, ergänzt durch einen Kurs in Versuchstierkunde.",analytical:"Erasmus+-Praktikum bei Celignis in Irland mit zunehmender Verantwortung bei der Bestimmung flüchtiger Bestandteile, ergänzt durch die chemische Berufsausbildung."},animal:"Das Kursdiplom A+B+C belegt die Ausbildung; die individuelle Sachkundeanerkennung richtet sich nach den gesetzlichen Voraussetzungen.",legal:"Die klinische Tätigkeit als MTL setzt die jeweils erforderliche Berufserlaubnis voraus."}
 };
 function canvas(){const ops=[];const text=(s,x,y,z=10.5,b=false,color=C.ink)=>{if(!s)return;if(x<L-1||x+width(s,z,b)>R+.1||y<24||y>821)throw Error("Text outside page: "+s);ops.push(`BT /F${b?2:1} ${z} Tf ${color} rg 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${esc(s)}) Tj ET\n`)};const rect=(x,y,w,h,color)=>ops.push(`${color} rg ${x} ${y} ${w} ${h} re f\n`);const rule=(x,y,w)=>ops.push(`${C.line} RG 0.6 w ${x} ${y} m ${x+w} ${y} l S\n`);const para=(s,x,y,z,max=R-x,lead=z*1.36,b=false,color=C.ink)=>{for(const line of wrap(s,z,max,b)){text(line,x,y,z,b,color);y-=lead}return y};return{text,rect,rule,para,raw:()=>ops.join("")}}
 function header(c,lang,title,kicker,page,total){const t=cfg[lang];c.rect(0,825,595,17,C.navy);c.text("JHON M. CUENCA",L,798,11.5,true,C.navy);c.text(t.brand,R-width(t.brand,9.2,true),798,9.2,true,C.muted);c.rule(L,787,M);c.text(kicker,L,765,9.4,true,C.blue);let y=c.para(title,L,733,24,M,29,true,C.navy)-11;c.rule(L,y,M);c.rule(L,49,M);c.text(t.url,L,31,9,false,C.muted);const p=page+" / "+total;c.text(p,R-width(p,9),31,9,false,C.muted);return y-24}
 function pdf(pages){let o=["","<< /Type /Catalog /Pages 2 0 R >>","","<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>","<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>"],kids=[];for(const [i,body] of pages.entries()){const id=5+2*i;kids.push(id+" 0 R");o[id]=`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${id+1} 0 R >>`;o[id+1]=`<< /Length ${body.length} >>\nstream\n${body}endstream`}o[2]=`<< /Type /Pages /Kids [${kids.join(" ")}] /Count ${pages.length} >>`;let out="%PDF-1.4\n",offsets=[0];for(let i=1;i<o.length;i++){offsets.push(out.length);out+=`${i} 0 obj\n${o[i]}\nendobj\n`}let start=out.length;return out+`xref\n0 ${o.length}\n0000000000 65535 f \n${offsets.slice(1).map(x=>String(x).padStart(10,"0")+" 00000 n \n").join("")}trailer\n<< /Size ${o.length} /Root 1 0 R >>\nstartxref\n${start}\n%%EOF\n`}
 const out={};
 for(const lang of ["es","en","de"]){if(custom&&lang!==custom.lang)continue;const t=cfg[lang];
 if(!custom){const r=recruit[lang],names={research:r.names[0],analytical:r.names[1],clinical:r.names[2]},html=read("data/market/"+t.file+"-sections.html");const cards=[...html.matchAll(/<article class="market-card"[^>]*>([\s\S]*?)<\/article>/g)].map(m=>m[1]).filter(s=>s.includes("<ul>")&&s.includes(".pdf"));
 for(const field of ["clinical","research","analytical"]){const name=names[field],card=cards.find(s=>s.includes("/"+name+".pdf"));if(!card)throw Error("Missing card "+name);const title=plain(card.match(/<h3>(.*?)<\/h3>/s)[1]),body=plain(card.match(/<\/h3>\s*<p>(.*?)<\/p>/s)[1]),bullets=[...card.matchAll(/<li>(.*?)<\/li>/gs)].map(m=>plain(m[1]));const c=canvas();let y=header(c,lang,title,t.market+"  /  "+t.dossier,1,1);
 const heading=label=>{c.text(label,L,y,12.4,true,C.blue);y-=20};
 const section=(label,paras,bullet=false)=>{heading(label);for(const p of paras){if(bullet){c.rect(L+2,y-1,4,4,C.blue);y=c.para(p,L+15,y,11.2,M-15,15.6)-5}else y=c.para(p,L,y,11.2,M,15.6)-5}y-=16};
 section(t.profile,[body]);section(t.skills,bullets,true);heading(t.qual);
 for(const [q,school] of [["Técnico Superior en Laboratorio Clínico y Biomédico","CEAC FP Oficial | 2023-2025"],["Técnico en Operaciones de Laboratorio","IES Virgen de la Paloma | 2021-2023"]]){y=c.para(q,L,y,11.2,M,15.5,true);y=c.para(school,L,y,10.3,M,14,false,C.muted)-10}y-=10;
 let extra=[t.contexts[field]];if(lang==="en")extra.push("English B2 | German A2 (certification in preparation) | Native Spanish");if(lang==="de")extra.push("Deutsch A2 (Zertifizierung in Vorbereitung) | Englisch B2 | Spanisch Muttersprache","Raum Bonn/Köln und Berlin; deutschlandweit umzugsbereit.");if(field==="research")extra.push(t.animal);section(t.context,extra);section(t.support,[t.supportText]);if(y<58)throw Error("Profile too long "+lang+" "+field+" "+y);out[`assets/documents/${lang}/${name}.pdf`]=pdf([c.raw()]);
 }

 const groups=["clinical","research","analytical"].map(field=>({field,rows:data.skills.filter(s=>s.area===field).sort((a,b)=>a.locales[lang].order-b.locales[lang].order)}));
 const col=238,detailW=R-col-8;
 const nameZ=10.1,metaZ=8.7,detailZ=10.3,nh=12.5,mh=10.6,dh=13.2,pad=11;
 const noteFor=field=>field==="research"?t.animal:field==="clinical"?t.legal:null;
 function measureRow(s){
   const v=s.locales[lang],n=wrap(v.name,nameZ,179,true),m=wrap(v.level+" | "+s.source,metaZ,179),d=wrap(v.detail,detailZ,detailW);
   return {s,n,m,d,h:Math.max(n.length*nh+m.length*mh+1,d.length*dh)+pad+2};
 }
 function startCataloguePage(field,first,page,total){
   const c=canvas();let y=header(c,lang,t.catalogue,t.market+"  /  "+t.dossier,page,total);
   y=c.para(t.areas[field],L,y,14.5,M,18,true,C.navy)-9;
   if(first)y=c.para(t.catalogIntro,L,y,10.2,M,13.2,false,C.muted)-11;
   c.rect(L,y-7,M,22,C.navy);c.text(t.columns[0],L+7,y,9.3,true,C.white);c.text(t.columns[1],col,y,9.3,true,C.white);
   return {c,y:y-12};
 }
 const batches=[];
 for(const group of groups){
   const rows=group.rows.map(measureRow);if(!rows.length)continue;
   const note=noteFor(group.field),bottom=note?Math.max(62,57+15+wrap(note,9.1,M).length*12):62;
   let offset=0;
   while(offset<rows.length){
     let {y}=startCataloguePage(group.field,batches.length===0,1,1),start=offset;
     while(offset<rows.length&&y-rows[offset].h>=bottom){y-=rows[offset].h;offset++;}
     if(offset===start)throw Error("Catalogue row too tall: "+lang+" "+rows[offset].s.id);
     batches.push({field:group.field,rows:rows.slice(start,offset),note:offset===rows.length?note:null});
   }
 }
 const pages=[];
 for(const [i,batch] of batches.entries()){
   let {c,y}=startCataloguePage(batch.field,i===0,i+1,batches.length);
   for(const [j,row] of batch.rows.entries()){
     const {s,n,m,d,h}=row;if(y-h<62)throw Error("Catalogue overflow "+lang+" "+s.id);
     if(j%2===0)c.rect(L,y-h,M,h,C.pale);
     let yy=y-11;for(const line of n){c.text(line,L+7,yy,nameZ,true);yy-=nh}
     yy-=1;for(const line of m){c.text(line,L+7,yy,metaZ,false,C.muted);yy-=mh}
     yy=y-11;for(const line of d){c.text(line,col,yy,detailZ);yy-=dh}
     c.rule(L,y-h,M);y-=h;
   }
   if(batch.note){y-=15;y=c.para(batch.note,L,y,9.1,M,12,false,C.muted);if(y<57)throw Error("Note overflow "+lang+" "+y)}
   pages.push(c.raw());
 }
 out[`assets/documents/${lang}/${r.names[3]}.pdf`]=pdf(pages);
 }


 const cvLocale=cv[lang],layout=cvLocale.layout;
 for(const [role,ids] of (custom?[[custom.role,custom.ids]]:Object.entries(cv.selections))){
   const v=custom?custom.variant:cvLocale.variants[role],first=canvas(),second=canvas(),black="0 0 0",grey="0.32 0.32 0.32";
   const center=(c,s,y,z,b=false,color=black)=>c.text(s,(595-width(s,z,b))/2,y,z,b,color);
   const right=(c,s,y,z=8.8)=>c.text(s,R-width(s,z),y,z,false,black);
   const p=(c,s,y,x=L+4,z=9.1,b=false)=>c.para(s,x,y,z,R-x,12,b,black);
   const heading=(c,s,y)=>{center(c,s,y,10.7,true);return y-18};
   const bullet=(c,s,y)=>{c.rect(L+10,y+2,2.4,2.4,black);return p(c,s,y,L+18,9.1)-2};
   const footer=c=>center(c,"Jhon M. Cuenca · cuenca-john1999.github.io",24.5,7.8,false,grey);
   function entry(c,company,job,place,date,y,bullets){
     const avail=R-L-width(place,8.8)-12;
     for(const line of wrap(company.toUpperCase(),9.2,avail,true)){c.text(line,L,y,9.2,true,black);if(line===wrap(company.toUpperCase(),9.2,avail,true)[0])right(c,place,y);y-=12}
     const jobLines=wrap(job,9.2,R-L-width(date,8.8)-12,true);
     for(const [i,line] of jobLines.entries()){c.text(line,L,y,9.2,true,black);if(i===0)right(c,date,y);y-=12}
     for(const b of bullets)y=bullet(c,b,y);
     return y-7;
   }
   center(first,"Jhon M. Cuenca",792,16.5,true);
   let y=773;
   for(const line of wrap(v.subtitle,10.4,M,true)){center(first,line,y,10.4,true);y-=13}
   for(const line of wrap(cvLocale.mobility+(custom?.contact?" | "+custom.contact:""),8.4,M)){center(first,line,y-1,8.4);y-=11}
   center(first,"cuenca-john1999.github.io"+(lang==="en"?"/":"/"+lang+"/"),y-2,8.4);y-=19;
   first.rule(L+4,y,M-8);y-=19;
   y=heading(first,layout.profile,y);y=p(first,v.profile,y)-10;
   const acad=()=>{if(custom&&!v.academic.length)return;const label=custom?({es:"FORMACIÓN Y PRÁCTICAS ACADÉMICAS",en:"ACADEMIC TRAINING AND PRACTICAL WORK",de:"AUSBILDUNG UND PRAKTISCHE ÜBUNGEN"})[lang]:layout.academic;y=heading(first,label,y);for(const b of v.academic)y=bullet(first,b,y);y-=8};
   if(v.priority==="academic")acad();
   y=heading(first,layout.experience,y);
   const order=custom?v.order:(v.priority==="celignis"||role==="pharma"?[1,0]:[0,1]);
   for(const i of order)y=entry(first,cvLocale.exp[i][0],layout.job[i],layout.location[i],i===0?"03/2025 - 06/2025":"03/2023 - 05/2023",y,v.placements[i]);
   if(v.priority!=="academic")acad();
   const teaching=custom&&v.school?layout.additionalRows.find(row=>row[0]==="FORM-ED / WASHI"):null;
   if(teaching){y=heading(first,({es:"EXPERIENCIA DOCENTE",en:"TEACHING EXPERIENCE",de:"UNTERRICHTSERFAHRUNG"})[lang],y);y=entry(first,...teaching.slice(0,4),y,[teaching[4]]);}
   if(y<49)throw Error("CV page 1 overflow "+lang+" "+role+" "+y);
   footer(first);
   y=797;
   y=heading(second,layout.additional,y);
   for(const [company,job,place,date,body] of layout.additionalRows){if(teaching&&company===teaching[0])continue;y=entry(second,company,job,place,date,y,[body]);}
   y=heading(second,layout.education,y);
   const quals=["Técnico Superior en Laboratorio Clínico y Biomédico","Técnico en Operaciones de Laboratorio"];
   const schools=["CEAC FP OFICIAL","IES VIRGEN DE LA PALOMA"];
   const qorder=role==="analytical"||role==="pharma"?[1,0]:[0,1];
   for(const i of qorder){
     cEducation(schools[i],quals[i],i===0?"2023 - 2025":"2021 - 2023",i);
   }
   function cEducation(school,qual,date,i){
     second.text(school,L,y,9.4,true,black);right(second,layout.location[0],y);y-=12;
     second.text(qual,L,y,9.2,true,black);right(second,date,y);y-=12;
     y=p(second,layout.formal,y,L+8,8.9)-2;
     if(i===0&&(role==="general"||role==="research"))y=bullet(second,cvLocale.project,y);
     y-=7;
   }
   y=heading(second,layout.cert,y);
   const certOrder=role==="research"?[1,2,0,3]:role==="clinical"?[0,2,1,3]:[2,3,0,1];
   for(const i of certOrder){second.text(layout.certNames[i],L,y,9.2,true,black);right(second,["2025","2023 / 2024","2023","2018 - 2020"][i],y);y-=12;y=p(second,layout.certBodies[i],y,L+8,8.9)-5}
   y-=5;y=heading(second,layout.skills,y);
   const selected=ids.map(id=>{const s=data.skills.find(s=>s.id===id);if(!s)throw Error("Unknown skill "+id);return s;});
   const grouped=new Map();
   for(const s of selected){const item=s.locales[lang],key=item.level;if(!grouped.has(key))grouped.set(key,[]);grouped.get(key).push(item.name);}
   for(const [label,items] of grouped){y=p(second,label,y,L+4,9.2,true);y=p(second,items.join(" · "),y,L+4,9)-4}
   y=p(second,cvLocale.languages,y,L+4,9)-4;
   if(y<49)throw Error("CV page 2 overflow "+lang+" "+role+" "+y);
   footer(second);
   const path=role==="general"?"assets/documents/Jhon_M_Cuenca_CV_"+lang.toUpperCase()+".pdf":"assets/documents/"+lang+"/cv-"+role+".pdf";
   out[path]=pdf([first.raw(),second.raw()]);
 }
 }return out;
}
