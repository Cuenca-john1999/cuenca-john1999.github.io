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
export function interpret(offer){
 const chunks=passages(offer),hits=[],gaps=[];
 for(const [id,labels,patterns,skills=[],fact=null] of [...rules,...alerts]){
   const found=chunks.find(s=>patterns.some(p=>new RegExp('\\b(?:'+p+')\\b','i').test(normalize(s))));
   if(!found)continue;
   const item={id,label:locale(labels),passage:found.slice(0,400),skills,fact};
   if(alerts.some(a=>a[0]===id))gaps.push(item);else hits.push(item);
 }
 const school=hits.some(x=>x.id==='school')&&(hits.some(x=>['experiments','stock','maintenance','safety'].includes(x.id))||/\b(school science laboratory|school laboratory technician|science technician|schullabor|laboratorio escolar)\b/.test(normalize(offer)));
 return {hits,gaps,school,factIds:[...new Set(hits.map(h=>h.fact).filter(Boolean))]};
}
