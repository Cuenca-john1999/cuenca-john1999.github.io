// Versioned multilingual task ontology; all printable claims are curated evidence.
export const schoolFocus={
  "labels": {
    "es": "Laboratorio educativo y apoyo docente",
    "en": "School science laboratory and teaching support",
    "de": "Schullabor und Unterrichtsunterstützung"
  },
  "skills": [
    "solutions",
    "culture-media-preparation",
    "instrumentation",
    "emergency-equipment",
    "volumetric-measurement",
    "analytical-weighing",
    "microscopy",
    "microscope-care",
    "academic-sops",
    "technical-documentation",
    "pipette-maintenance",
    "ph-measurement"
  ]
};
export const facts={
  "teaching": {
    "es": "Instructor de robótica educativa: docencia STEM, materiales didácticos y organización de clases (FORM-ED / WASHI).",
    "en": "Educational robotics instructor: STEM teaching, learning materials and class organisation (FORM-ED / WASHI).",
    "de": "Dozent für Bildungsrobotik: STEM-Unterricht, Unterrichtsmaterialien und Organisation (FORM-ED / WASHI)."
  },
  "inventory": {
    "es": "Inventario de laboratorio y organización de material durante las prácticas en La Princesa.",
    "en": "Laboratory inventory and material organisation during the La Princesa placement.",
    "de": "Laborinventar und Materialorganisation während des Praktikums bei La Princesa."
  },
  "safety": {
    "es": "Formación de nivel básico en prevención de riesgos laborales (2023).",
    "en": "Basic occupational risk prevention training (2023).",
    "de": "Grundausbildung Arbeitsschutz (2023)."
  },
  "administration": {
    "es": "Experiencia de apoyo administrativo y documental; documentación operativa durante las prácticas en Celignis.",
    "en": "Administrative and documentation support; operational documentation during the Celignis placement.",
    "de": "Verwaltungs- und Dokumentationsunterstützung; Betriebsdokumentation im Celignis-Praktikum."
  },
  "digital": {
    "es": "Microsoft Office y Google Workspace (según CV).",
    "en": "Microsoft Office and Google Workspace (as listed in CV).",
    "de": "Microsoft Office und Google Workspace (laut Lebenslauf)."
  },
  "handover": {
    "es": "Formación de los practicantes de relevo durante las prácticas en Celignis.",
    "en": "Handover training for incoming interns during the Celignis placement.",
    "de": "Einarbeitung nachfolgender Praktikanten im Celignis-Praktikum."
  },
  "english": {
    "es": "Inglés B2 (nivel declarado en CV).",
    "en": "English B2 (level stated in CV).",
    "de": "Englisch B2 (Niveau laut Lebenslauf)."
  },
  "qualification": {
    "es": "Dos titulaciones oficiales españolas de FP en Sanidad y Química.",
    "en": "Two official Spanish vocational qualifications in healthcare and chemistry.",
    "de": "Zwei offizielle spanische Berufsabschlüsse im Gesundheits- und Chemiebereich."
  }
};
const rules=[
  [
    "school",
    [
      "Apoyo a la enseñanza de ciencias",
      "Science teaching support",
      "Naturwissenschaftlicher Unterricht"
    ],
    [
      "school|pupils|science department|classroom|teachers and students|educational setting",
      "colegio|centro educativo|alumnado|docentes|ensenanza de ciencias",
      "schule|schullabor|schuler|lehrkrafte|naturwissenschaftlicher unterricht"
    ],
    [],
    "teaching"
  ],
  [
    "experiments",
    [
      "Preparación de experimentos y material",
      "Practical experiment and apparatus preparation",
      "Versuchs- und Gerätevorbereitung"
    ],
    [
      "(prepar\\w*|set(?:ting)? up|assembl\\w*|support\\w*)\\b.{0,65}\\b(practical\\w*|experiment\\w*|apparatus|demonstration\\w*)",
      "(prepar\\w*|mont\\w*|apoy\\w*)\\b.{0,65}\\b(experimento\\w*|practica\\w*|material)",
      "(versuch\\w*|experiment\\w*|praktik\\w*)\\b.{0,45}\\b(vorbereit\\w*|aufbau\\w*|unterstutz\\w*)"
    ],
    [
      "solutions",
      "volumetric-measurement",
      "analytical-weighing",
      "microscopy"
    ],
    null
  ],
  [
    "solutions",
    [
      "Preparar soluciones y reactivos",
      "Making solutions and reagents",
      "Lösungen und Reagenzien herstellen"
    ],
    [
      "(make|mak\\w*|prepar\\w*|mix\\w*|dilut\\w*)\\b.{0,35}\\b(solution\\w*|reagent\\w*)",
      "(prepar\\w*|elabor\\w*|dilu\\w*)\\b.{0,35}\\b(disolucion\\w*|solucion\\w*|reactivo\\w*)",
      "(losung\\w*|reagenz\\w*|reagenzien)\\b.{0,40}\\b(herstell\\w*|ansetz\\w*|vorbereit\\w*)"
    ],
    [
      "solutions",
      "volumetric-measurement",
      "analytical-weighing"
    ],
    null
  ],
  [
    "cultures",
    [
      "Preparación de cultivos y medios (tipo por confirmar)",
      "Culture and media preparation (type to confirm)",
      "Kultur- und Nährmedienvorbereitung (Art prüfen)"
    ],
    [
      "(prepar\\w*|grow\\w*|maintain\\w*)\\b.{0,25}\\b(cultures|culture media|microbial cultures|bacterial cultures)",
      "(prepar\\w*|elabor\\w*)\\b.{0,30}\\b(cultivos|medios de cultivo)",
      "(nahrmedien|mikrobielle kulturen|bakterienkulturen)\\b.{0,40}\\b(herstell\\w*|vorbereit\\w*|ansetz\\w*)"
    ],
    [
      "culture-media-preparation"
    ],
    null
  ],
  [
    "maintenance",
    [
      "Mantenimiento y disponibilidad de equipos",
      "Equipment upkeep and readiness",
      "Gerätepflege und Einsatzbereitschaft"
    ],
    [
      "(maintain\\w*|maintenance|servic\\w*|check\\w*|upkeep|care for)\\b.{0,65}\\b(equipment|apparatus|instruments|resources|devices)",
      "(equipment|apparatus|instruments)\\b.{0,40}\\b(maintenance|servicing|checks|ready|working order)",
      "(manten\\w*|revis\\w*|comprob\\w*)\\b.{0,55}\\b(equipo\\w*|instrument\\w*|material\\w*)",
      "(gerat\\w*|instrument\\w*|apparat\\w*)\\b.{0,50}\\b(wart\\w*|pflege|pruf\\w*|instandhalt\\w*)"
    ],
    [
      "instrumentation",
      "microscope-care",
      "pipette-maintenance"
    ],
    null
  ],
  [
    "stock",
    [
      "Inventario y organización de recursos",
      "Stock, inventory and resource organisation",
      "Bestandsverwaltung und Labororganisation"
    ],
    [
      "stock control|inventory|stocktaking|stock management|laboratory resources|laboratory supplies|manage supplies",
      "inventario|control de existencias|gestion de material\\w*|gestion de recursos",
      "bestands\\w*|inventar\\w*|lagerverwaltung|materialverwaltung|laborbedarf"
    ],
    [
      "technical-documentation"
    ],
    "inventory"
  ],
  [
    "safety",
    [
      "Seguridad de laboratorio y prevención",
      "Laboratory safety and risk prevention",
      "Laborsicherheit und Arbeitsschutz"
    ],
    [
      "health and safety|laboratory safety|safe laboratory|safety regulations|safety standards|chemical safety|risk assessments?",
      "seguridad (?:de laboratorio|quimica)|prevencion de riesgos|evaluacion de riesgos",
      "arbeitsschutz|laborsicherheit|gefahrstoff\\w*|gefahrdungsbeurteilung\\w*"
    ],
    [
      "emergency-equipment",
      "academic-sops",
      "glp-sop"
    ],
    "safety"
  ],
  [
    "documentation",
    [
      "Organización y documentación",
      "Organisation and documentation",
      "Organisation und Dokumentation"
    ],
    [
      "administrative skills|administration|record keeping|recordkeeping|maintain records|documentation|work instructions|departmental resources",
      "documentacion|tareas administrativas|gestion documental|registro\\w*|instrucciones de trabajo",
      "dokumentation|verwaltung|protokollierung|arbeitsanweisungen"
    ],
    [
      "technical-documentation",
      "traceability"
    ],
    "administration"
  ],
  [
    "digital",
    [
      "Herramientas digitales y ofimática",
      "Digital and office tools",
      "Digitale Werkzeuge und Office"
    ],
    [
      "microsoft office|ms office|excel|online platforms|google workspace|digital tools",
      "ofimatica|plataformas digitales|herramientas digitales",
      "burosoftware|digitale plattformen|digitale werkzeuge"
    ],
    [],
    "digital"
  ],
  [
    "team",
    [
      "Trabajo en equipo y formación",
      "Teamwork and knowledge transfer",
      "Teamarbeit und Wissensweitergabe"
    ],
    [
      "teamwork|collaborat\\w*|work\\w* closely|work\\w* as part of a team|training colleagues|staff development",
      "trabajo en equipo|colabor\\w*|formacion de companeros",
      "teamarbeit|zusammenarbeit|einarbeitung"
    ],
    [],
    "handover"
  ],
  [
    "english",
    [
      "Inglés B2",
      "English B2",
      "Englisch B2"
    ],
    [
      "english\\b.{0,55}\\bb2",
      "(?:ingles|englisch)\\b.{0,55}\\bb2",
      "b2\\b.{0,20}\\b(?:english|ingles|englisch)"
    ],
    [],
    "english"
  ],
  [
    "qualification",
    [
      "Formación científica de laboratorio",
      "Scientific laboratory qualification",
      "Naturwissenschaftlicher Laborabschluss"
    ],
    [
      "laboratory training|scientific discipline|science degree|laboratory qualification|relevant laboratory experience",
      "formacion de laboratorio|titulacion cientifica|formacion cientifica",
      "laborausbildung|naturwissenschaftliche ausbildung|laborabschluss"
    ],
    [],
    "qualification"
  ]
];
rules.push(...[
  [
    "blood-cells",
    [
      "Procesamiento de sangre y separación celular (tipo por confirmar)",
      "Blood processing and cell separation (type to confirm)",
      "Blutaufarbeitung und Zelltrennung (Art prüfen)"
    ],
    [
      "(isolat\\w*|separat\\w*|purif\\w*)\\b.{0,65}\\b(mononuclear cells|immune cells|lymphocytes|blood cells)",
      "(aisl\\w*|separ\\w*|purif\\w*)\\b.{0,55}\\b(celulas mononucleares|celulas inmunes|linfocitos)",
      "(mononuklear\\w* zellen|immunzellen|lymphozyten)\\b.{0,50}\\b(isolier\\w*|trenn\\w*)"
    ],
    [
      "cd4-cd14",
      "human-samples"
    ],
    null
  ],
  [
    "gene-assays",
    [
      "Preparación de ácidos nucleicos y análisis molecular",
      "Nucleic acid preparation and molecular analysis",
      "Nukleinsäureaufarbeitung und molekulare Analytik"
    ],
    [
      "(extract\\w*|isolat\\w*|purif\\w*)\\b.{0,30}\\b(nucleic acids|rna)|gene expression analysis",
      "(extrac\\w*|aisl\\w*|purif\\w*)\\b.{0,30}\\b(acidos nucleicos|arn)|analisis de expresion genica",
      "(nukleinsaur\\w*|rna)\\b.{0,35}\\b(extrahier\\w*|isolier\\w*|aufarbeit\\w*)|genexpressionsanalyse"
    ],
    [
      "rna-extraction",
      "pcr",
      "electrophoresis"
    ],
    null
  ],
  [
    "blood-films",
    [
      "Preparación y observación de frotis sanguíneos",
      "Blood film preparation and examination",
      "Blutausstrich und mikroskopische Untersuchung"
    ],
    [
      "(prepar\\w*|examin\\w*|stain\\w*)\\b.{0,35}\\b(blood films|blood smears)",
      "(prepar\\w*|examin\\w*|ten\\w*)\\b.{0,35}\\b(frotis sanguineos|frotis de sangre)",
      "blutausstrich\\w*\\b.{0,35}\\b(prapar\\w*|farb\\w*|untersuch\\w*)"
    ],
    [
      "capillary-blood-smear",
      "microscopy",
      "haematology"
    ],
    null
  ],
  [
    "viable-counts",
    [
      "Cuantificación de microorganismos viables",
      "Viable microorganism enumeration",
      "Bestimmung lebensfähiger Keime"
    ],
    [
      "(count\\w*|enumerat\\w*|quantif\\w*|determin\\w*)\\b.{0,55}\\b(viable microorganisms|viable bacteria|bacterial colonies|microbial growth)",
      "(recuent\\w*|cuantific\\w*|determin\\w*)\\b.{0,50}\\b(microorganismos viables|bacterias viables|colonias bacterianas)",
      "(lebensfahig\\w* keime|bakterienkolonien)\\b.{0,35}\\b(zahl\\w*|bestimm\\w*)"
    ],
    [
      "microbial-enumeration"
    ],
    null
  ],
  [
    "instrumental-quant",
    [
      "Mediciones cuantitativas y preparación de patrones",
      "Quantitative measurement and reference standards",
      "Quantitative Messung und Standards"
    ],
    [
      "(prepar\\w*|mak\\w*)\\b.{0,45}\\b(calibration standards|reference standards)|absorbance measurements",
      "(prepar\\w*|elabor\\w*)\\b.{0,40}\\b(patrones de calibracion|soluciones patron)|medidas de absorbancia",
      "(kalibrierstandard\\w*|standardlosung\\w*)\\b.{0,35}\\b(herstell\\w*|vorbereit\\w*)|absorptionsmessung\\w*"
    ],
    [
      "uv-vis-spectrophotometry",
      "solutions",
      "volumetric-measurement"
    ],
    null
  ]
]);
const alerts=[
  [
    "safeguarding",
    [
      "Protección de menores: acreditación específica no demostrada",
      "Safeguarding: specific training or clearance not documented",
      "Kinderschutz: spezifischer Nachweis nicht belegt"
    ],
    [
      "safeguarding|child protection|dbs check|enhanced dbs|welfare of children|proteccion de menores|proteccion infantil|kinderschutz|erweitertes fuhrungszeugnis"
    ]
  ],
  [
    "risk-assessment",
    [
      "Evaluaciones de riesgos: formación relacionada, responsabilidad no demostrada",
      "Risk assessments: related training, responsibility not documented",
      "Gefährdungsbeurteilung: verwandte Ausbildung, Verantwortung nicht belegt"
    ],
    [
      "risk assessments?|evaluacion de riesgos|evaluaciones de riesgos|gefahrdungsbeurteilung\\w*"
    ]
  ],
  [
    "chemical-waste",
    [
      "Gestión autónoma de residuos y almacén químico: verificar alcance",
      "Independent chemical storage and waste management: verify scope",
      "Eigenständige Gefahrstofflagerung und Abfallentsorgung: Umfang prüfen"
    ],
    [
      "storage and disposal of chemicals|chemical waste|disposal of chemicals|chemical storage|residuos quimicos|almacenamiento de reactivos|gefahrstofflagerung|chemikalienentsorgung"
    ]
  ]
];

export function focusRoutes(data){return {...data.routes,school:schoolFocus};}
const locale=v=>({es:v[0],en:v[1],de:v[2]});
export const normalize=s=>String(s).replace(/ß/g,'ss').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
export function passages(offer){
 const s=String(offer).replace(/&#xA0;|&nbsp;|&#160;/gi,' ').replace(/<[^>]{1,100}>/g,' ').replace(/\\\s*\n/g,'\n');
 return s.split(/[\n;]+|(?<=[.!?])\s+/).map(s=>s.trim()).filter(Boolean).flatMap(s=>s.length>1400?s.match(/.{1,1000}(?:\s|$)|.{1,1000}/g)||[s]:[s]);
}

// Modality is a conservative clause-level hint, not a legal or eligibility determination.
export function clauses(offer){return passages(offer).flatMap(s=>s.split(/\s+(?:but|however|pero|sin embargo|jedoch|aber)\s+/i).map(x=>x.trim()).filter(Boolean));}
export function modality(s){
 const n=normalize(s);
 if(/\b(?:not required|not essential|not necessary|no prior experience (?:is )?required|no experience (?:is )?required|no se requiere|no es (?:necesario|obligatorio|imprescindible)|nicht erforderlich|nicht notwendig|keine .{0,50} erforderlich)\b/.test(n))return 'not-required';
 if(/\b(?:desirable|preferred|advantageous|nice to have|an advantage|a plus|beneficial|deseable|valorable|se valorara|preferiblemente|ventaja|wunschenswert|von vorteil|idealerweise)\b/.test(n))return 'preferred';
 if(/\b(?:required|essential|mandatory|must|minimum|prerequisite|obligatori\w*|imprescindible|requisito minimo|debe\w*|erforderlich|zwingend|voraussetzung|mindestens)\b/.test(n))return 'required';
 if(/\b(?:you will|responsible for|duties include|tasks include|se encargara|sera responsable|funciones incluyen|aufgaben umfassen|sie werden|verantwortlich fur)\b/.test(n))return 'duty';
 return 'unspecified';
}
const rank={required:4,duty:3,preferred:2,unspecified:1,'not-required':0};
export function strongest(items){return items.slice().sort((a,b)=>rank[b.priority]-rank[a.priority])[0];}
export function interpret(offer){
 const chunks=clauses(offer),hits=[],gaps=[],notRequired=[];
 for(const [id,labels,patterns,skills=[],fact=null] of [...rules,...alerts]){
   const found=chunks.filter(s=>patterns.some(p=>new RegExp('\\b(?:'+p+')\\b','i').test(normalize(s)))).map(s=>({passage:s.slice(0,400),priority:modality(s)}));
   if(!found.length)continue;
   const best=strongest(found),item={id,label:locale(labels),...best,skills,fact};
   if(best.priority==='not-required'){notRequired.push(item);continue;}
   if(alerts.some(a=>a[0]===id))gaps.push(item);else hits.push(item);
 }
 const school=hits.some(x=>x.id==='school')&&(hits.some(x=>['experiments','stock','maintenance','safety'].includes(x.id))||/\b(school science laboratory|school laboratory technician|science technician|schullabor|laboratorio escolar)\b/.test(normalize(offer)));
 return {hits,gaps,notRequired,school,factIds:[...new Set(hits.map(h=>h.fact).filter(Boolean))]};
}
