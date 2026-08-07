#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def replace_once(path: Path, old: str, new: str) -> None:
    text = path.read_text(encoding="utf-8")
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"Expected exactly one match in {path}: found {count}")
    path.write_text(text.replace(old, new, 1), encoding="utf-8")


index = ROOT / "index.html"
layout = ROOT / "assets/css/layout.css"
language_js = ROOT / "assets/js/language.js"
verify = ROOT / "tools/verify_portfolio_integrity.py"

old_operations = '''                    <article class="focus-item">
                        <span class="focus-index" data-i18n="educationCards.operations.grade">8.69/10</span>
                        <h3 data-i18n="educationCards.operations.title">Técnico en Operaciones de Laboratorio</h3>
                        <p data-i18n="educationCards.operations.center">IES Virgen de la Paloma · Madrid, Spain</p>
                        <p data-i18n="educationCards.operations.period">2021–2023</p>
                        <div class="focus-item__actions">
                            <p><a class="document-link" href="workbench/#entry-celignis" data-i18n="educationCards.operations.practiceCta">Erasmus+ / placement: Celignis Biomass Analysis Laboratory · Limerick, Ireland →</a></p>
                            <details class="practice-details">
                                <summary data-i18n="commonLabels.academicDetails">Academic details</summary>
                                <p data-i18n="educationCards.operations.body">Spanish qualification: Técnico en Operaciones de Laboratorio (translated as Technician in Laboratory Operations), IES Virgen de la Paloma, 2021-2023. Strong grades in Applied Chemistry, Physicochemical Testing, Chemical Analysis Operations, Materials Testing and Technical English.</p>
                            </details>
                        </div>
                    </article>'''

new_operations = '''                    <article class="focus-item focus-item--education-expanded" data-education-evidence="operations">
                        <span class="focus-index" data-i18n="educationCards.operations.grade">8.69/10</span>
                        <h3 data-i18n="educationCards.operations.title">Técnico en Operaciones de Laboratorio</h3>
                        <p data-i18n="educationCards.operations.center">IES Virgen de la Paloma · Madrid, Spain</p>
                        <p data-i18n="educationCards.operations.period">2021–2023</p>
                        <div class="focus-item__actions">
                            <p><a class="document-link" href="workbench/#entry-celignis" data-i18n="educationCards.operations.practiceCta">Erasmus+ / placement: Celignis Biomass Analysis Laboratory · Limerick, Ireland →</a></p>
                            <details class="practice-details">
                                <summary data-i18n="commonLabels.academicDetails">Academic details</summary>
                                <p data-i18n="educationCards.operations.body">Spanish qualification: Técnico en Operaciones de Laboratorio (Technician in Laboratory Operations), IES Virgen de la Paloma, 2021–2023. Official final grade: 8.69/10. The official academic record covers laboratory safety and organization, applied chemistry, physicochemical testing, sampling and unit operations, chemical analysis, microbiology and biochemistry, materials testing, auxiliary laboratory services and technical English.</p>

                                <div class="document-slot">
                                    <span data-i18n="commonLabels.academicRecognition">Academic recognition</span>
                                    <p data-i18n="educationCards.operations.recognition">Diploma for excellent academic performance in the second year of the Técnico en Operaciones de Laboratorio programme.</p>
                                </div>

                                <div class="document-slot">
                                    <span data-i18n="commonLabels.selectedResults">Selected official results</span>
                                    <ul class="academic-result-list">
                                        <li><strong>10/10</strong><span data-i18n="educationCards.operations.results10">Laboratory Auxiliary Services · Technical English</span></li>
                                        <li><strong>9/10</strong><span data-i18n="educationCards.operations.results9">Applied Chemistry · Physicochemical Testing · Safety and Organization in the Laboratory · Chemical Analysis Operations · Materials Testing</span></li>
                                    </ul>
                                </div>

                                <div class="document-slot">
                                    <span data-i18n="commonLabels.appliedAcademicEvidence">Applied academic evidence</span>
                                    <p data-i18n="educationCards.operations.evidenceIntro">Archived coursework supplied for this portfolio documents practical academic work through laboratory reports, SOP/PNT-style documents, calculations and project materials. This is presented as training evidence, not professional placement experience.</p>
                                    <ul class="academic-evidence-list">
                                        <li data-i18n="educationCards.operations.evidenceDocumentation">Laboratory documentation &amp; equipment: pH-meter and drying-oven PNTs, micropipette documentation, thermometer calibration, inventory and maintenance records, mass/volume measurement and sampling reports.</li>
                                        <li data-i18n="educationCards.operations.evidenceAnalytical">Analytical chemistry &amp; physicochemical work: solution preparation, HCl/NaOH titrations, acidity, reaction yield, conductimetry, potentiometry, turbidity, nitrates, proteins and physicochemical measurement.</li>
                                        <li data-i18n="educationCards.operations.evidenceMicrobiology">Microbiology &amp; materials: microscope use, culture-media preparation, membrane-filtration water analysis, antibiogram, plastics/material identification and corrosion-related work.</li>
                                    </ul>
                                </div>

                                <div class="document-slot">
                                    <span data-i18n="commonLabels.placementContext">FCT / Erasmus+ context</span>
                                    <p data-i18n="educationCards.operations.placement">FCT / Erasmus+ placement at Celignis Biomass Analysis Laboratory, Limerick, Ireland, from 20 March to 31 May 2023. The placement work and responsibilities are documented separately in Experience and Workbench.</p>
                                </div>
                            </details>
                        </div>
                    </article>'''

old_additional = '''                    <article class="focus-item">
                        <span class="focus-index" data-i18n="educationCards.additional.badge">Functions A+B+C</span>
                        <h3 data-i18n="educationCards.additional.title">Certified Additional Training</h3>
                        <div class="focus-item__actions">
                            <details class="practice-details">
                                <summary data-i18n="commonLabels.trainingDetails">Training details</summary>
                                <p data-i18n="educationCards.additional.body">Animal Experimentation - Functions A+B+C (Order ECC/566/2015) · 70 h with in-person practical training. A: care of animals; B: euthanasia; C: performance of procedures. The formal programme covers animal welfare and the 3Rs, recognition of pain, suffering and distress, humane killing methods, minimally invasive procedures, anaesthesia for minor procedures, advanced anaesthesia for surgical or prolonged procedures, and principles of surgery. During the supervised practical component, I personally performed animal handling, injections, anaesthesia, surgical procedures for sample/tissue collection and collection/extraction of animal samples. I also participated in supervised procedures that included euthanasia; this is not presented as independent practice. Healthcare Centre Management · 100 h · 2025. Basic Level Occupational Risk Prevention · 2023.</p>
                            </details>
                        </div>
                    </article>'''

new_additional = '''                    <article class="focus-item focus-item--education-expanded" data-education-evidence="credentials">
                        <span class="focus-index" data-i18n="educationCards.additional.badge">3 documented credentials</span>
                        <h3 data-i18n="educationCards.additional.title">Certifications &amp; Additional Training</h3>
                        <div class="focus-item__actions">
                            <details class="practice-details practice-details--credentials">
                                <summary data-i18n="commonLabels.credentialDetails">Credential details</summary>
                                <div class="credential-list">
                                    <section class="credential-card" aria-labelledby="credential-animal-title">
                                        <p class="credential-card__meta" data-i18n="educationCards.additional.animal.meta">Order ECC/566/2015 · 70 h · in-person practical training</p>
                                        <h4 id="credential-animal-title" data-i18n="educationCards.additional.animal.title">Animal Experimentation · Functions A+B+C</h4>
                                        <p data-i18n="educationCards.additional.animal.scope">Formal certification scope: A · care of animals; B · euthanasia of animals; C · performance of procedures.</p>
                                        <ul class="credential-scope-list">
                                            <li data-i18n="educationCards.additional.animal.programWelfare">Animal welfare &amp; 3Rs · recognition of pain, suffering and distress · humane killing methods</li>
                                            <li data-i18n="educationCards.additional.animal.programProcedures">Minimally invasive procedures · anaesthesia for minor procedures · advanced anaesthesia for surgical or prolonged procedures</li>
                                            <li data-i18n="educationCards.additional.animal.programSurgery">Principles of surgery</li>
                                        </ul>
                                        <p class="credential-card__note" data-i18n="educationCards.additional.animal.practice">During the supervised practical component, I personally performed animal handling, injections, anaesthesia, surgical procedures for sample/tissue collection and collection/extraction of animal samples. I also participated in supervised procedures that included euthanasia; this is not presented as independent practice.</p>
                                    </section>

                                    <section class="credential-card" aria-labelledby="credential-healthcare-title">
                                        <p class="credential-card__meta" data-i18n="educationCards.additional.healthcare.meta">100 h · 2025</p>
                                        <h4 id="credential-healthcare-title" data-i18n="educationCards.additional.healthcare.title">Healthcare Centre Management</h4>
                                        <p data-i18n="educationCards.additional.healthcare.body">Additional certified training in Healthcare Centre Management.</p>
                                    </section>

                                    <section class="credential-card" aria-labelledby="credential-risk-title">
                                        <p class="credential-card__meta" data-i18n="educationCards.additional.risk.meta">2023</p>
                                        <h4 id="credential-risk-title" data-i18n="educationCards.additional.risk.title">Basic Level Occupational Risk Prevention</h4>
                                        <p data-i18n="educationCards.additional.risk.body">Certificate linked to the Formación y Orientación Laboral module of the Laboratory Operations qualification. It states that the training covers responsibilities equivalent to basic-level occupational risk prevention activities under Royal Decree 39/1997.</p>
                                    </section>
                                </div>
                            </details>
                        </div>
                    </article>'''

replace_once(index, old_operations, new_operations)
replace_once(index, old_additional, new_additional)
replace_once(
    index,
    '<li data-i18n="sections.education.pointAdditional">Animal Experimentation - Functions A+B+C · Healthcare Management · Risk Prevention</li>',
    '<li data-i18n="sections.education.pointAdditional">Certifications: Animal Experimentation A+B+C · Healthcare Centre Management · Basic Risk Prevention</li>',
)
replace_once(
    index,
    'assets/js/language.js?v=20260807-professionalization-audit',
    'assets/js/language.js?v=20260807-education-visual',
)
replace_once(
    language_js,
    "const TRANSLATION_VERSION = '20260807-professionalization-audit';",
    "const TRANSLATION_VERSION = '20260807-education-visual';",
)

translations = {
    "en": {
        "pointAdditional": "Certifications: Animal Experimentation A+B+C · Healthcare Centre Management · Basic Risk Prevention",
        "labels": {
            "academicRecognition": "Academic recognition",
            "selectedResults": "Selected official results",
            "appliedAcademicEvidence": "Applied academic evidence",
            "placementContext": "FCT / Erasmus+ context",
            "credentialDetails": "Credential details",
        },
        "operations": {
            "body": "Spanish qualification: Técnico en Operaciones de Laboratorio (Technician in Laboratory Operations), IES Virgen de la Paloma, 2021–2023. Official final grade: 8.69/10. The official academic record covers laboratory safety and organization, applied chemistry, physicochemical testing, sampling and unit operations, chemical analysis, microbiology and biochemistry, materials testing, auxiliary laboratory services and technical English.",
            "recognition": "Diploma for excellent academic performance in the second year of the Técnico en Operaciones de Laboratorio programme.",
            "results10": "Laboratory Auxiliary Services · Technical English",
            "results9": "Applied Chemistry · Physicochemical Testing · Safety and Organization in the Laboratory · Chemical Analysis Operations · Materials Testing",
            "evidenceIntro": "Archived coursework supplied for this portfolio documents practical academic work through laboratory reports, SOP/PNT-style documents, calculations and project materials. This is presented as training evidence, not professional placement experience.",
            "evidenceDocumentation": "Laboratory documentation & equipment: pH-meter and drying-oven PNTs, micropipette documentation, thermometer calibration, inventory and maintenance records, mass/volume measurement and sampling reports.",
            "evidenceAnalytical": "Analytical chemistry & physicochemical work: solution preparation, HCl/NaOH titrations, acidity, reaction yield, conductimetry, potentiometry, turbidity, nitrates, proteins and physicochemical measurement.",
            "evidenceMicrobiology": "Microbiology & materials: microscope use, culture-media preparation, membrane-filtration water analysis, antibiogram, plastics/material identification and corrosion-related work.",
            "placement": "FCT / Erasmus+ placement at Celignis Biomass Analysis Laboratory, Limerick, Ireland, from 20 March to 31 May 2023. The placement work and responsibilities are documented separately in Experience and Workbench.",
        },
        "additional": {
            "badge": "3 documented credentials",
            "title": "Certifications & Additional Training",
            "animal": {
                "meta": "Order ECC/566/2015 · 70 h · in-person practical training",
                "title": "Animal Experimentation · Functions A+B+C",
                "scope": "Formal certification scope: A · care of animals; B · euthanasia of animals; C · performance of procedures.",
                "programWelfare": "Animal welfare & 3Rs · recognition of pain, suffering and distress · humane killing methods",
                "programProcedures": "Minimally invasive procedures · anaesthesia for minor procedures · advanced anaesthesia for surgical or prolonged procedures",
                "programSurgery": "Principles of surgery",
                "practice": "During the supervised practical component, I personally performed animal handling, injections, anaesthesia, surgical procedures for sample/tissue collection and collection/extraction of animal samples. I also participated in supervised procedures that included euthanasia; this is not presented as independent practice.",
            },
            "healthcare": {
                "meta": "100 h · 2025",
                "title": "Healthcare Centre Management",
                "body": "Additional certified training in Healthcare Centre Management.",
            },
            "risk": {
                "meta": "2023",
                "title": "Basic Level Occupational Risk Prevention",
                "body": "Certificate linked to the Formación y Orientación Laboral module of the Laboratory Operations qualification. It states that the training covers responsibilities equivalent to basic-level occupational risk prevention activities under Royal Decree 39/1997.",
            },
        },
    },
    "es": {
        "pointAdditional": "Certificaciones: Experimentación Animal A+B+C · Gestión de Centros Sanitarios · PRL básico",
        "labels": {
            "academicRecognition": "Reconocimiento académico",
            "selectedResults": "Resultados oficiales destacados",
            "appliedAcademicEvidence": "Evidencia académica aplicada",
            "placementContext": "Contexto FCT / Erasmus+",
            "credentialDetails": "Detalles de las credenciales",
        },
        "operations": {
            "body": "Titulación española: Técnico en Operaciones de Laboratorio, IES Virgen de la Paloma, 2021–2023. Nota final oficial: 8,69/10. El expediente académico oficial incluye seguridad y organización en el laboratorio, química aplicada, pruebas fisicoquímicas, muestreo y operaciones unitarias, análisis químico, microbiología y bioquímica, ensayos de materiales, servicios auxiliares de laboratorio e inglés técnico.",
            "recognition": "Diploma por excelente aprovechamiento en el segundo curso del ciclo de Técnico en Operaciones de Laboratorio.",
            "results10": "Servicios Auxiliares en el Laboratorio · Inglés Técnico",
            "results9": "Química Aplicada · Pruebas Fisicoquímicas · Seguridad y Organización en el Laboratorio · Operaciones de Análisis Químico · Ensayos de Materiales",
            "evidenceIntro": "Los materiales académicos aportados para este portafolio documentan trabajo práctico formativo mediante informes de laboratorio, documentos tipo PNT/SOP, cálculos y materiales de proyectos. Se presenta como evidencia de formación, no como experiencia profesional de las prácticas externas.",
            "evidenceDocumentation": "Documentación y equipos de laboratorio: PNT de pH-metro y estufa de secado, documentación de micropipeta, calibrado de termómetro, registros de inventario y mantenimiento, informes de medida de masas/volúmenes y muestreo.",
            "evidenceAnalytical": "Química analítica y trabajo fisicoquímico: preparación de disoluciones, valoraciones de HCl/NaOH, acidez, rendimiento de reacción, conductimetría, potenciometría, turbidez, nitratos, proteínas y mediciones fisicoquímicas.",
            "evidenceMicrobiology": "Microbiología y materiales: uso del microscopio, preparación de medios de cultivo, análisis de agua por filtración de membrana, antibiograma, identificación de plásticos/materiales y trabajos relacionados con corrosión.",
            "placement": "FCT / Erasmus+ en Celignis Biomass Analysis Laboratory, Limerick, Irlanda, del 20 de marzo al 31 de mayo de 2023. El trabajo y las responsabilidades de la estancia se documentan por separado en Experiencia y Workbench.",
        },
        "additional": {
            "badge": "3 credenciales documentadas",
            "title": "Certificaciones y formación complementaria",
            "animal": {
                "meta": "Orden ECC/566/2015 · 70 h · prácticas presenciales",
                "title": "Experimentación Animal · Funciones A+B+C",
                "scope": "Alcance formal de la certificación: A · cuidado de animales; B · eutanasia de animales; C · realización de procedimientos.",
                "programWelfare": "Bienestar animal y 3R · reconocimiento del dolor, sufrimiento y angustia · métodos humanitarios de sacrificio",
                "programProcedures": "Procedimientos mínimamente invasivos · anestesia para procedimientos menores · anestesia avanzada para procedimientos quirúrgicos o prolongados",
                "programSurgery": "Principios de cirugía",
                "practice": "Durante la parte práctica supervisada realicé personalmente manejo de animales, inyecciones, anestesia, procedimientos quirúrgicos para la obtención de muestras/tejidos y obtención/extracción de muestras animales. También participé en procedimientos supervisados que incluían eutanasia; no se presenta como una realización independiente.",
            },
            "healthcare": {
                "meta": "100 h · 2025",
                "title": "Gestión de Centros Sanitarios",
                "body": "Formación adicional certificada en Gestión de Centros Sanitarios.",
            },
            "risk": {
                "meta": "2023",
                "title": "Prevención de Riesgos Laborales de nivel básico",
                "body": "Certificado vinculado al módulo de Formación y Orientación Laboral de la titulación de Operaciones de Laboratorio. La certificación indica que la formación capacita para responsabilidades equivalentes a las actividades de nivel básico en prevención de riesgos laborales establecidas en el Real Decreto 39/1997.",
            },
        },
    },
    "de": {
        "pointAdditional": "Zertifikate: Versuchstierkunde A+B+C · Management von Gesundheitseinrichtungen · Grundkenntnisse Arbeitsschutz",
        "labels": {
            "academicRecognition": "Akademische Auszeichnung",
            "selectedResults": "Ausgewählte offizielle Leistungen",
            "appliedAcademicEvidence": "Anwendungsbezogene Ausbildungsnachweise",
            "placementContext": "FCT- / Erasmus+-Kontext",
            "credentialDetails": "Details zu den Nachweisen",
        },
        "operations": {
            "body": "Spanische Qualifikation: Técnico en Operaciones de Laboratorio (englische Übersetzung: Technician in Laboratory Operations), IES Virgen de la Paloma, 2021–2023. Offizielle Abschlussnote: 8,69/10. Der offizielle Leistungsnachweis umfasst Laborsicherheit und -organisation, angewandte Chemie, physikochemische Prüfungen, Probenahme und verfahrenstechnische Grundoperationen, chemische Analytik, Mikrobiologie und Biochemie, Materialprüfung, Laborhilfsdienste und technisches Englisch.",
            "recognition": "Diplom für hervorragende Leistungen im zweiten Ausbildungsjahr des Bildungsgangs Técnico en Operaciones de Laboratorio.",
            "results10": "Laborhilfsdienste · Technisches Englisch",
            "results9": "Angewandte Chemie · Physikochemische Prüfungen · Sicherheit und Organisation im Labor · Chemische Analysen · Materialprüfung",
            "evidenceIntro": "Die für dieses Portfolio bereitgestellten Ausbildungsunterlagen dokumentieren praktische Ausbildungsarbeit anhand von Laborberichten, PNT-/SOP-ähnlichen Dokumenten, Berechnungen und Projektmaterialien. Sie werden als Ausbildungsnachweise und nicht als Berufserfahrung aus externen Praktika dargestellt.",
            "evidenceDocumentation": "Labordokumentation & Geräte: PNTs für pH-Meter und Trockenschrank, Mikropipetten-Dokumentation, Thermometerkalibrierung, Inventar- und Wartungsunterlagen sowie Berichte zu Massen-/Volumenmessung und Probenahme.",
            "evidenceAnalytical": "Analytische Chemie & physikochemische Arbeit: Herstellung von Lösungen, HCl-/NaOH-Titrationen, Säurebestimmung, Reaktionsausbeute, Konduktometrie, Potentiometrie, Trübung, Nitrat- und Proteinbestimmungen sowie physikochemische Messungen.",
            "evidenceMicrobiology": "Mikrobiologie & Materialien: Mikroskopie, Herstellung von Kulturmedien, Wasseranalyse mittels Membranfiltration, Antibiogramm, Kunststoff-/Materialidentifikation und Arbeiten zum Thema Korrosion.",
            "placement": "FCT- / Erasmus+-Praktikum bei Celignis Biomass Analysis Laboratory in Limerick, Irland, vom 20. März bis 31. Mai 2023. Tätigkeiten und Verantwortlichkeiten des Praktikums sind separat unter Erfahrung und in der Workbench dokumentiert.",
        },
        "additional": {
            "badge": "3 dokumentierte Nachweise",
            "title": "Zertifikate & Zusatzqualifikationen",
            "animal": {
                "meta": "Erlass ECC/566/2015 · 70 Std. · Präsenzpraxis",
                "title": "Versuchstierkunde · Funktionen A+B+C",
                "scope": "Formaler Zertifizierungsumfang: A · Pflege der Tiere; B · Tötung/Euthanasie der Tiere; C · Durchführung von Verfahren.",
                "programWelfare": "Tierwohl & 3R · Erkennen von Schmerz, Leiden und Angst · tierschutzgerechte Tötungsmethoden",
                "programProcedures": "Minimalinvasive Verfahren · Anästhesie bei kleineren Eingriffen · fortgeschrittene Anästhesie bei chirurgischen oder länger dauernden Verfahren",
                "programSurgery": "Grundlagen der Chirurgie",
                "practice": "Im beaufsichtigten Praxisteil führte ich persönlich Tierhandling, Injektionen, Anästhesie, chirurgische Verfahren zur Proben-/Gewebegewinnung sowie die Gewinnung/Entnahme tierischer Proben durch. Ich war außerdem an beaufsichtigten Verfahren beteiligt, die eine Euthanasie einschlossen; dies wird nicht als eigenständige Durchführung dargestellt.",
            },
            "healthcare": {
                "meta": "100 Std. · 2025",
                "title": "Management von Gesundheitseinrichtungen",
                "body": "Zusätzliche zertifizierte Weiterbildung im Management von Gesundheitseinrichtungen.",
            },
            "risk": {
                "meta": "2023",
                "title": "Grundausbildung im Arbeitsschutz",
                "body": "Zertifikat in Verbindung mit dem Modul Formación y Orientación Laboral der Qualifikation Operaciones de Laboratorio. Laut Zertifikat vermittelt die Ausbildung Kompetenzen für Verantwortlichkeiten, die den Tätigkeiten der Grundstufe der Arbeitsschutzprävention nach dem Königlichen Dekret 39/1997 entsprechen.",
            },
        },
    },
}

for language, additions in translations.items():
    path = ROOT / "data" / "translations" / f"{language}.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    # Preserve the previous long body as a source-of-truth record while the UI redistributes it.
    old_additional_body = data["educationCards"]["additional"]["body"]
    data["sections"]["education"]["pointAdditional"] = additions["pointAdditional"]
    data["commonLabels"].update(additions["labels"])
    data["educationCards"]["operations"].update(additions["operations"])
    data["educationCards"]["additional"]["badge"] = additions["additional"]["badge"]
    data["educationCards"]["additional"]["title"] = additions["additional"]["title"]
    data["educationCards"]["additional"]["animal"] = additions["additional"]["animal"]
    data["educationCards"]["additional"]["healthcare"] = additions["additional"]["healthcare"]
    data["educationCards"]["additional"]["risk"] = additions["additional"]["risk"]
    if data["educationCards"]["additional"]["body"] != old_additional_body:
        raise SystemExit(f"Legacy additional training record changed unexpectedly in {language}")
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

css_anchor = '''.document-slot strong {
    color: var(--color-text);
    font-weight: 650;
}

.document-actions {'''
css_insert = '''.document-slot strong {
    color: var(--color-text);
    font-weight: 650;
}

.academic-result-list,
.academic-evidence-list,
.credential-scope-list {
    margin: var(--spacing-md) 0 0;
}

.academic-result-list {
    display: grid;
    gap: 0.7rem;
    padding: 0;
    list-style: none;
}

.academic-result-list li {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 0.8rem;
    align-items: start;
    padding: 0.8rem 0.9rem;
    border: 1px solid rgba(79, 140, 255, 0.14);
    border-radius: var(--radius-sm);
    background: rgba(79, 140, 255, 0.05);
    color: var(--color-text-muted);
    font: 500 0.9rem/1.55 var(--font-family-sans);
}

.academic-result-list strong {
    color: var(--color-accent);
    font-weight: 750;
    white-space: nowrap;
}

.academic-evidence-list {
    display: grid;
    gap: 0.7rem;
    padding-inline-start: 1.2rem;
    color: var(--color-text-muted);
    font: 500 0.9rem/1.6 var(--font-family-sans);
}

.academic-evidence-list li::marker {
    color: var(--color-accent);
}

.practice-details--credentials[open] {
    width: 100%;
}

.credential-list {
    display: grid;
    gap: 1rem;
    width: 100%;
    margin-block-start: var(--spacing-lg);
}

.credential-card {
    width: 100%;
    padding: clamp(1rem, 2vw, 1.35rem);
    border: 1px solid rgba(174, 183, 194, 0.14);
    border-radius: var(--radius-sm);
    background: rgba(11, 13, 16, 0.32);
}

.credential-card__meta {
    margin: 0 0 0.6rem !important;
    color: var(--color-accent) !important;
    font: 700 0.7rem/1.35 var(--font-family-sans) !important;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.credential-card h4 {
    margin: 0;
    color: var(--color-text);
    font: 650 clamp(1rem, 1.5vw, 1.16rem)/1.35 var(--font-family-sans);
}

.credential-card > p:not(.credential-card__meta) {
    margin-block-start: 0.8rem;
    color: var(--color-text-muted);
    font-size: 0.9rem;
    line-height: 1.62;
}

.credential-scope-list {
    display: grid;
    gap: 0.6rem;
    padding: 0;
    list-style: none;
}

.credential-scope-list li {
    padding: 0.7rem 0.8rem;
    border-inline-start: 2px solid rgba(79, 140, 255, 0.5);
    background: rgba(79, 140, 255, 0.045);
    color: var(--color-text-muted);
    font: 500 0.86rem/1.55 var(--font-family-sans);
}

.credential-card__note {
    padding-block-start: 0.85rem;
    border-block-start: 1px solid rgba(174, 183, 194, 0.12);
}

@media (max-width: 560px) {
    .academic-result-list li {
        grid-template-columns: 1fr;
        gap: 0.25rem;
    }

    .credential-card {
        padding: 1rem;
    }
}

.document-actions {'''
replace_once(layout, css_anchor, css_insert)

verify_anchor = '''    if "currentLanguae" in workbench_js:
        fail("Workbench contains the misspelled currentLanguage identifier that breaks multi-page resource rendering")



class LinkCollector'''
verify_insert = '''    if "currentLanguae" in workbench_js:
        fail("Workbench contains the misspelled currentLanguage identifier that breaks multi-page resource rendering")

    education_markers = (
        'data-education-evidence="operations"',
        'Official final grade: 8.69/10',
        'Diploma for excellent academic performance in the second year',
        'Laboratory Auxiliary Services · Technical English',
        'Applied academic evidence',
        'data-education-evidence="credentials"',
        'Animal Experimentation · Functions A+B+C',
        'Healthcare Centre Management',
        'Basic Level Occupational Risk Prevention',
    )
    for marker in education_markers:
        if marker not in index:
            fail(f"education evolution marker missing from index.html: {marker}")
    if index.count('class="credential-card"') != 3:
        fail("education credentials must remain split into exactly three visible credential cards")



class LinkCollector'''
replace_once(verify, verify_anchor, verify_insert)

print("Education visual/content update applied conservatively.")
