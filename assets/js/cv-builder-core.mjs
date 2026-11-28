import {buildDossiers} from './cv-pdf-engine.mjs';
export const MAX_SKILLS=12;
const aliases={
"haematology":["hematologia","hematology","haematology","hamatologie","hemograma","blood count","blutbild"],
"biochemistry":["bioquimica clinica","clinical chemistry","clinical biochemistry","klinische chemie","klinische biochemie"],
"clinical-microbiology":["microbiologia clinica","clinical microbiology","klinische mikrobiologie"],
"immunodiagnostics":["inmunodiagnostico","immunodiagnostics","immundiagnostik","flow cytometry","citometria de flujo","durchflusszytometrie","FACS","immunophenotyping","inmunofenotipado","immunphanotypisierung"],
"sample-management":["gestion de muestras","sample handling","sample management","probenmanagement"],
"rna-extraction":["extraccion de arn","rna extraction","rna isolation","rna extraktion","rna isolierung"],
"pcr":["PCR","polymerase chain reaction","reaccion en cadena de la polimerasa"],
"electrophoresis":["electroforesis","electrophoresis","elektrophorese","agarose gel","gel de agarosa"],
"genotyping":["genotipado","genotyping","genotypisierung"],
"western-blot":["western blot","immunoblot"],
"hacat":["HaCaT","cultivo celular","cell culture","zellkultur","adherent cell"],
"cytokine-culture":["cytokine stimulation","estimulacion con citocinas","zytokinstimulation"],
"human-samples":["human samples","muestras humanas","humanproben"],
"cd4-cd14":["PBMC","CD4","CD14","peripheral blood mononuclear cells"],
"elisa":["ELISA"],
"ihc":["inmunohistoquimica","immunohistochemistry","immunhistochemie","IHC"],
"if":["inmunofluorescencia","immunofluorescence","immunfluoreszenz"],
"animal-functions":["experimentacion animal","animal experimentation","versuchstierkunde"],
"moisture-ash":["moisture","humedad","feuchte","ash content","contenido de cenizas","aschegehalt"],
"volatile-matter":["materia volatil","volatile matter","fluchtige bestandteile"],
"tga":["TGA","thermogravimetry","termogravimetria","thermogravimetrie","Q500"],
"chnos":["CHNOS","elemental analysis","analisis elemental","elementaranalyse","vario macro cube"],
"ash-melting":["ash fusibility","ash melting","fusibilidad de cenizas","ascheschmelz"],
"bmp":["BMP","biogas","biogas 5000"],
"fos-tac":["FOS/TAC","FOS TAC"],
"icp":["ICP","ICP OES"],
"cod":["COD","DQO","CSB"],
"ammonium":["ammonium","amonio","ammonia"],
"nir":["NIR","near infrared","infrarrojo cercano","nahinfrarot"],
"glp-sop":["GLP","BPL","good laboratory practice","SOP","SOPs","PNT","standard operating procedures","arbeitsanweisungen"],
"internal-qc":["internal quality control","control interno de calidad","interne qualitatskontrolle","statistical quality control"],
"technical-documentation":["technical documentation","documentacion tecnica","technische dokumentation"],
"traceability":["traceability","trazabilidad","ruckverfolgbarkeit"],
"titration":["titration","valoracion acido base","saure base titration"],
"conductimetry":["conductivity","conductimetry","conductimetria","leitfahigkeit","potentiometry","potenciometria"],
"antibiogram":["antibiogram","antibiograma","antibiogramm","disk diffusion","disc diffusion","difusion en disco"],
"microscopy":["microscopy","microscopia","mikroskopie"],
"membrane-filtration":["membrane filtration","filtracion por membrana","filtracion de membrana","membranfiltration"],
"microbial-environmental-sampling":["environmental monitoring","monitorizacion ambiental","control microbiologico ambiental","umgebungsmonitoring","RODAC","contact plates","settle plates","placas de sedimentacion","abklatschplatten","sedimentationsplatten","swabs","hisopos","tupfer"],
"microbial-enumeration":["CFU","UFC","KBE","colony counting","plate count","microbial enumeration","recuento de colonias","keimzahlbestimmung"],
"microbial-staining":["gram staining","tincion de gram","gram farbung","endospore staining"],
"culture-media-preparation":["media preparation","culture media","preparacion de medios","medios de cultivo","nahrmedien","autoclave","autoclaving","autoklavieren","autoclavado","aseptic techniques","tecnicas asepticas","aseptische techniken"],
"food-microbiology":["food microbiology","microbiologia alimentaria","lebensmittelmikrobiologie"],
"microbial-isolation-identification":["microbial identification","bacterial identification","identificacion bacteriana","API 20 E","keimisolierung"],
"soil-microbiology":["soil microbiology","microbiologia de suelos","bodenmikrobiologie"],
"urinalysis":["urinalysis","urine sediment","analisis de orina","sedimento urinario","urinanalytik"],
"capillary-blood-smear":["blood smear","capillary sampling","frotis sanguineo","puncion capilar","blutausstrich"],
"uv-vis-spectrophotometry":["UV-Vis","UV/Vis","spectrophotometry","espectrofotometria","spektrophotometrie"],
"bradford-protein":["Bradford","protein quantification","cuantificacion de proteinas"],
"gravimetry":["gravimetry","gravimetria","gravimetrie"],
"redox-complexometric-titration":["redox","EDTA","complexometric","complexometria","komplexometrie"],
"lipid-extraction":["Soxhlet","lipid extraction","extraccion de lipidos"],
"ir-spectroscopy":["infrared spectroscopy","espectroscopia infrarroja","infrarotspektroskopie","IR spectroscopy","IR spektroskopie"],
"thermometer-calibration":["thermometer calibration","calibracion de termometros","thermometerkalibrierung"],
"pipette-maintenance":["micropipette","micropipettes","micropipeta","micropipetas","mikropipetten"],
"ph-measurement":["pH meter","pH-metro","pH measurement","medicion de ph","ph messung"],
"volumetric-measurement":["volumetric glassware","volumetry","volumetria","material volumetrico","volumenmessung"],
"analytical-weighing":["analytical balance","balanza analitica","analysenwaage"],
"academic-sops":["SOP writing","elaboracion de PNT","erstellung von SOPs"],
"refractometry":["refractometer","refractometry","refractometro","refractometria","refraktometrie"],
"buccal-cytology":["buccal cytology","citologia exfoliativa","exfoliativzytologie"]
};
export const gaps=[
{id:"gmp",terms:["GMP","cGMP","BPF","good manufacturing practice","buenas practicas de fabricacion","gute herstellungspraxis","cleanroom","sala limpia","reinraum"],label:{es:"GMP / salas limpias",en:"GMP / cleanrooms",de:"GMP / Reinraum"}},
{id:"lal",terms:["LAL","endotoxin","endotoxins","endotoxinas","endotoxine"],label:{es:"LAL / endotoxinas",en:"LAL / endotoxins",de:"LAL / Endotoxine"}},
{id:"bioburden",terms:["bioburden","pharmacopoeial sterility","sterility testing","esterilidad farmacopeica","sterilitatstest","arzneibuch"],label:{es:"Bioburden / ensayos farmacopéicos de esterilidad",en:"Bioburden / pharmacopoeial sterility tests",de:"Bioburden / Arzneibuch-Sterilitätsprüfung"}},
{id:"mtl",terms:["MTL","MTLA","anerkennung","berufserlaubnis","clinical registration","professional registration"],label:{es:"Reconocimiento o habilitación profesional: verificar según puesto y país",en:"Professional recognition or registration: check role and country",de:"Berufsanerkennung / Berufserlaubnis: Stelle und Land prüfen"}},
{id:"hplc",terms:["HPLC","UHPLC","UPLC","GC-MS","LC-MS"],label:{es:"HPLC / técnicas cromatográficas instrumentales específicas",en:"HPLC / specific instrumental chromatography",de:"HPLC / spezifische instrumentelle Chromatografie"}},
{id:"language",terms:["German B2","Deutsch B2","aleman B2","German C1","Deutsch C1","aleman C1","English C1","Englisch C1","ingles C1"],label:{es:"Nivel de idioma superior al documentado: revisar",en:"Language level above documented level: review",de:"Sprachniveau über dem dokumentierten Niveau: prüfen"}}
];
const norm=s=>String(s).replace(/ß/g,"ss").normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function contains(text,term){const q=norm(term);return q.length>=2&&(' '+text+' ').includes(' '+q+' ');}
export function analyse(data,offer){
 const text=norm(offer),matches=[];
 for(const s of data.skills){
   const terms=[...(aliases[s.id]||[]),...['es','en','de'].map(l=>s.locales[l].name)];
   const found=[...new Set(terms.filter(t=>contains(text,t)))];if(found.length)matches.push({id:s.id,terms:found});
 }
 const routeScores=Object.entries(data.routes).map(([id,r])=>[id,matches.filter(x=>r.skills.includes(x.id)).length]).sort((a,b)=>b[1]-a[1]);
 return {matches,gaps:gaps.filter(g=>g.terms.some(t=>contains(text,t))),route:routeScores[0]?.[1]>0?routeScores[0][0]:'general'};
}
export function selectIds(data,ids){
 const allowed=new Set(data.skills.map(s=>s.id)),unique=[...new Set(ids)];
 if(unique.length===0||unique.length>MAX_SKILLS||unique.some(id=>!allowed.has(id)))throw Error('Invalid selection');
 return unique;
}
const messages={
es:{intro:"Técnico de laboratorio con dos titulaciones oficiales españolas de FP.",focus:"Selección de competencias según su contexto de adquisición",fallback:["Prácticas FCT en inmunología y biología molecular.","Prácticas Erasmus+ en análisis de biomasa."],academic:"Formación y prácticas según el nivel indicado",labels:{food:"Técnico de laboratorio | Microbiología alimentaria",environment:"Técnico de laboratorio | Medioambiente y biomasa",quality:"Técnico de laboratorio | Calidad y metrología"}},
en:{intro:"Laboratory technician with two official Spanish vocational qualifications.",focus:"Selected skills grouped by training and placement context",fallback:["FCT placement in immunology and molecular biology.","Erasmus+ placement in biomass analysis."],academic:"Training and practical work at the indicated level",labels:{food:"Laboratory Technician | Food Microbiology",environment:"Laboratory Technician | Environment and Biomass",quality:"Laboratory Technician | Quality and Metrology"}},
de:{intro:"Laborfachkraft mit zwei offiziellen spanischen Berufsabschlüssen.",focus:"Ausgewählte Kompetenzen nach Ausbildungskontext",fallback:["FCT-Praktikum in Immunologie und Molekularbiologie.","Erasmus+-Praktikum in der Biomasseanalytik."],academic:"Ausbildung und praktische Übungen auf dem angegebenen Niveau",labels:{food:"Laborfachkraft | Lebensmittelmikrobiologie",environment:"Laborfachkraft | Umwelt und Biomasse",quality:"Laborfachkraft | Qualität und Messtechnik"}}
};
export function compose(data,cv,lang,route,ids,contact=''){
 if(!['es','en','de'].includes(lang))throw Error('Invalid language');
 ids=selectIds(data,ids);
 if(route!=='general'&&!data.routes[route])throw Error('Invalid role');
 const role=({food:'pharma',environment:'analytical',quality:'analytical'})[route]||route;
 const m=messages[lang],base=cv[lang].variants[role],skills=ids.map(id=>data.skills.find(s=>s.id===id));
 const placed=['La Princesa','Celignis'].map(src=>skills.filter(s=>s.source===src));
 const academic=skills.filter(s=>!['La Princesa','Celignis'].includes(s.source));
 // Compact source-labelled claims avoid turning curriculum topics into hands-on experience.
 const group=items=>{const groups=new Map();for(const s of items){const v=s.locales[lang],key=v.level+' | '+s.source;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(v);}
 return [...groups].flatMap(([k,v],index)=>{
   // Give the first selected method in each source/level a full, audited description.
   const first=v[0],d=first.detail;
   if(index===0&&d&&d.length<=360)return [k+': '+first.name+'. '+d,...(v.length>1?[k+': '+v.slice(1).map(x=>x.name).join('; ')+'.']:[])];
   return [k+': '+v.map(x=>x.name).join('; ')+'.'];
 });};
 const placement=placed.map((arr,i)=>arr.length?group(arr):[m.fallback[i]]);
 const order=placed[1].length>placed[0].length?[1,0]:[0,1];
 const priority=academic.length>=Math.max(placed[0].length,placed[1].length)&&academic.length?'academic':order[0]===1?'celignis':'princesa';
 const topicNames=[...new Set(skills.map(s=>data.topics[s.topic][lang]))].slice(0,3);
 const profile=m.intro+' '+m.focus+': '+topicNames.join('; ')+'. '+(role==='clinical'&&lang==='de'?'Eine deutsche MTL-Anerkennung ist nicht nachgewiesen.':role==='clinical'&&lang==='en'?'Regulated clinical roles depend on local authorisation.':role==='pharma'?({es:'Formación relacionada; no experiencia GMP acreditada.',en:'Related training; no documented GMP experience.',de:'Verwandte Ausbildung; keine nachgewiesene GMP-Erfahrung.'})[lang]:'');
 if(contact.length>150||/[\r\n]/.test(contact)||Array.from(contact).some(c=>c.charCodeAt(0)>255||c.charCodeAt(0)<32))throw Error('Invalid contact');
 return {lang,role,route,ids,contact,variant:{subtitle:m.labels[route]||base.subtitle,profile,placements:placement,academic:group(academic),priority,order}};
}
export function generate(data,cv,custom){
 const files=buildDossiers(p=>p.endsWith('common-evidence.json')?JSON.stringify(data):p.endsWith('cv.json')?JSON.stringify(cv):'',custom);
 const values=Object.values(files);if(values.length!==1||!values[0].startsWith('%PDF-1.4')||!values[0].includes('/Count 2'))throw Error('Invalid output');
 return values[0];
}
