(() => {
    'use strict';

    const translations = {
        en: {
            accessibility: {
                skip: 'Skip to content',
                workbenchNavigation: 'Workbench navigation',
                returnProfile: 'Return to professional profile',
                workbenchSections: 'Workbench sections',
                languageSelector: 'Language selector',
                workbenchStatus: 'Workbench status',
                contentAreas: 'Workbench content areas',
                carouselRole: 'carousel',
                slideRole: 'slide',
                filterEntries: 'Filter entries',
                openDeutschosEntry: 'Open LLC entry',
                openPortfolioEntry: 'Open portfolio entry',
                openLaprincesaEntry: 'Open La Princesa entry',
                openCelignisEntry: 'Open Celignis entry',
                openPhageEntry: 'Open bacteriophage therapy entry',
                openChitosanEntry: 'Open chitosan and microplastics entry',
                currentDevelopmentAreas: 'Current development areas',
                footerNotice: 'Copyright, authorship and scientific notice',
                closeEntry: 'Close entry'
            },
            nav: {
                profile: 'Professional profile',
                featured: 'Featured',
                projects: 'Projects',
                research: 'Research notes',
                learning: 'Technical & learning',
                milestones: 'Milestones',
                principles: 'Method'
            },
            hero: {
                eyebrow: 'Independent projects · scientific notes · applied learning',
                title: 'A living space for<br><span>building, testing and learning.</span>',
                intro: 'The Workbench documents selected projects and scientific thinking with clear authorship, evidence, limitations and next steps.',
                explore: 'Explore featured work', profile: 'View professional profile'
            },
            status: {
                label: 'Workbench status', focusLabel: 'Current focus',
                focusValue: 'LLC and portfolio development', aiLabel: 'AI disclosure',
                aiValue: 'AI supports technical implementation, content organisation and editorial review, while I lead objectives, requirements, content, testing and final approval.'
            },
            areas: { projects: 'Projects', research: 'Research notes', learning: 'Technical & learning', milestones: 'Milestones' },
            featured: {
                kicker: 'Featured', title: 'Work that best represents how I think and build.',
                intro: 'Each entry separates the real contribution, current maturity, evidence and unresolved work.',
                carouselHelp: 'Three featured entries rotate automatically. Use the controls to move, pause or resume the carousel.',
                dotsLabel: 'Featured entries', previous: 'Previous featured entry', next: 'Next featured entry',
                pauseRotation: 'Pause featured carousel', resumeRotation: 'Resume featured carousel',
                pauseRotationLabel: 'Pause featured carousel', resumeRotationLabel: 'Resume featured carousel',
                show1: 'Show entry 1', show2: 'Show entry 2', show3: 'Show entry 3',
                slide1: 'Entry 1 of 3', slide2: 'Entry 2 of 3', slide3: 'Entry 3 of 3'
            },
            categories: { project: 'Project', research: 'Research note', laboratoryPractice: 'Laboratory Practice' },
            statuses: { development: 'In development', functional: 'Functional', completed: 'Completed', concept: 'Concept' },
            common: { contribution: 'Contribution', evidence: 'Current evidence', open: 'Open entry' },
            cards: {
                deutschos: {
                    summary: 'An open-source, local-first desktop language-learning project for laboratory and life-science professionals. It originated as DeutschOS; German remains the reference implementation.',
                    contribution: 'Concept, requirements, learning structure, content review, testing and product decisions, including the transition from DeutschOS toward a reusable multilingual architecture.',
                    evidence: 'Functioning German-first local system undergoing transition into LLC; early development / pre-release.',
                    tagLanguage: 'Language learning', tagLaboratory: 'Laboratory & life sciences'
                },
                portfolio: {
                    title: 'Scientific Portfolio',
                    summary: 'A multilingual professional website presenting laboratory training, practical experience, techniques and research-oriented work.',
                    contribution: 'Content ownership, functional requirements, visual decisions, review, testing and AI-assisted development.',
                    evidence: 'Published multilingual website available through GitHub Pages.',
                    tagLanguages: 'Three languages'
                },
                phage: {
                    title: 'Bacteriophage Therapy',
                    summary: 'A co-authored academic literature review covering phage therapy, clinical applications, limitations and regulatory barriers.',
                    contribution: 'Literature review, scientific writing, project structure, conceptual development and defence preparation.',
                    evidence: 'Completed 61-page academic project and presentation material.',
                    tagReview: 'Literature review', tagCoauthored: 'Co-authored'
                },
                chitosan: {
                    title: 'Medical applications of chitosan: potential for microplastic capture and biomedical study',
                    summary: 'Literature-informed conceptual proposal developed and submitted internally to the training centre for consideration in the context of AETEL 2025; the centre ultimately prioritised another submission.',
                    contribution: 'Concept development, testable hypotheses, scientific framing and explicit validation limits.',
                    evidence: 'It did not advance to the event. No experimental validation was performed; the proposal remains conceptual and requires in vitro validation.',
                    tagHypothesis: 'Hypothesis', tagValidation: 'Requires validation'
                },
                laprincesa: {
                    title: 'Clinical & Biomedical Laboratory Practice · La Princesa'
                },
                celignis: {
                    title: 'Analytical & Biomass Laboratory Practice · Celignis'
                }
            },
            entries: { kicker: 'Workbench index', title: 'Projects, research notes and maturity levels in one editorial map.' },
            filters: { all: 'All', projects: 'Projects', research: 'Research notes', learning: 'Technical & learning', milestones: 'Milestones', empty: 'No entries are available in this category yet.' },
            groups: {
                projects: 'Projects',
                research: 'Research Notes',
                learning: 'Technical & Learning',
                learningBody: 'Applied learning entries with functional output and verifiable iteration.',
                learningItem1: 'LLC · German-first local system evolving toward multilingual architecture',
                learningItem2: 'Scientific Portfolio · Published multilingual delivery',
                learningItem3: 'La Princesa · Clinical and biomedical laboratory placement',
                learningItem4: 'Celignis · Analytical and biomass laboratory placement',
                learningItem5: 'Animal Experimentation A+B+C · 70 h · in-person practical training',
                milestones: 'Milestones',
                milestonesBody: 'Documented progress points with direct evidence.',
                milestonesItem1: '2026 · Portfolio publication on GitHub Pages with automated integrity checks',
                milestonesItem2: '2026 · Functional DeutschOS system began transition into LLC — Laboratory Language Companion',
                milestonesItem3: '2025 · FCT placement at Hospital Universitario de La Princesa',
                milestonesItem4: '2025 · Completed co-authored bacteriophage final project · 10/10',
                milestonesItem5: '2023 · Erasmus+ analytical biomass placement at Celignis'
            },
            entriesData: {
                deutschos: 'Open-source local-first language-learning project for laboratory and life-science professionals, with German as the reference implementation.',
                portfolio: 'Published multilingual portfolio for recruiters, laboratories and scientific collaborators.',
                laprincesa: 'Three-month hospital research placement with applied immunology, molecular biology and sample-processing workflows.',
                celignis: 'Erasmus+ laboratory placement in Ireland with analytical workflows, GLP routines, work to SOPs and creation of operational documentation.',
                phage: 'Co-authored academic literature review on phage therapy, its applications, limitations and regulatory barriers.',
                chitosan: 'Early-stage, literature-informed hypothesis proposed for future controlled laboratory validation.'
            },
            professionalContext: {
                animalTraining: { kicker: 'Animal Experimentation · Functions A+B+C', body: 'Certified 70-hour course under Order ECC/566/2015 with in-person practical training. The formal programme covers animal care, euthanasia and performance of procedures, together with welfare/3Rs, recognition of pain and distress, humane killing methods, minimally invasive procedures, anaesthesia and principles of surgery.', pointFunctions: 'Functions: A · care of animals; B · euthanasia of animals; C · performance of procedures', pointProgramme: 'Programme: welfare & 3Rs · pain/suffering/distress recognition · humane killing · minimally invasive procedures · minor and advanced anaesthesia · principles of surgery', pointHandsOn: 'Personally performed during supervised practical training: animal handling, injections, anaesthesia and surgical procedures for sample/tissue collection', pointSamples: 'Personally performed: collection/extraction of animal samples. Also participated in supervised procedures that included euthanasia; not presented as independent practice.', scope: 'Scope note: supervised training and practical experience; no claim of independent veterinary or surgical practice.' },
                development: {
                    kicker: 'Current Development',
                    title: 'Continuing professional development while preparing for laboratory opportunities.',
                    body: 'Alongside applications for laboratory-related, clinical research support and biomedical science roles, I am continuing German language certification preparation, scientific portfolio development and literature review in areas connected to my research interests.',
                    pointGerman: 'German language certification preparation',
                    pointPortfolio: 'Scientific portfolio development',
                    pointLiterature: 'Biomedical literature review: phage therapy, biomaterials and microplastics'
                }
            },
            principles: {
                kicker: 'Working method', title: 'From a precise question to useful, traceable scientific work.',
                intro: 'Questions, evidence, documentation, learning and responsible decisions form one practical workflow.',
                questions: { title: 'Precise questions', body: 'Curiosity starts with observation, patience and initiative, then becomes a question that can guide study, experimental planning or technical problem-solving.' },
                documentation: { title: 'Traceable work', body: 'Methods, data, decisions, contributions, reviews and tests are documented so the route to a result can be examined and learned from.' },
                application: { title: 'From method to application', body: 'Study and experimental work move from method, data and analysis towards insight and practical outcomes that support health, decision-making and socially useful science.' },
                integrity: { title: 'Scientific integrity', body: 'Published evidence, interpretation, hypotheses and results remain separate; open questions, missing validation and technical constraints stay visible. Animal-related work is approached with welfare and 3R principles.' },
                learning: { title: 'Applied learning & collaboration', body: 'Continuous learning across clinical laboratory science, biomedical research and languages supports clear communication, adaptability and work in multicultural teams.' },
                ai: { title: 'Transparent AI use', body: 'I define objectives, requirements and decisions, then review, test and approve the final result. AI can support implementation, research, organisation, writing and checking.' }
            },
            footer: { copyright: '© 2026 Jhon M. Cuenca. All rights reserved.', notice: 'JMC · Workbench documents selected projects, scientific notes and applied learning.', scientificNotice: 'Scientific notes distinguish published evidence, interpretation, hypotheses and limitations.' },
            dialog: {
                problem: 'Problem or motivation', contribution: 'Real contribution', result: 'Result or evidence',
                context: 'Context', technicalWork: 'Technical work / My role', technicalEvidence: 'Evidence provenance & technical detail',
                next: 'Limitations and next steps', resources: 'Documents and sources', navigationLabel: 'Project page navigation',
                previous: 'Previous', nextEntry: 'Next', openOtherPage: 'Open this page',
                openPage2: 'Open page 2', backToPage1: 'Back to page 1',
                pageShortLabel: 'Page',
                openPageNamed: 'Open page {page} of {total}: {title}', pagePosition: '{current} / {total}',
                pageChanged: 'Page {current} of {total}: {title}', overview: 'Project overview',
                evidenceHeading: 'Contribution, evidence and next work', expanded: 'Expanded project record',
                portfolioDetails: 'Purpose, architecture and maintenance', llcDetails: 'Scope, architecture & transition', academicContext: 'Academic context and documentation',
                proposal: 'Research proposal', hypotheses: 'Working hypotheses',
                hypothesesIntro: 'Expected outcomes reformulated as initial, testable hypotheses.',
                tags: 'Technical concepts'
            }
        },
        es: {
            accessibility: {
                skip: 'Saltar al contenido',
                workbenchNavigation: 'Navegación del Workbench',
                returnProfile: 'Volver al perfil profesional',
                workbenchSections: 'Secciones del Workbench',
                languageSelector: 'Selector de idioma',
                workbenchStatus: 'Estado del Workbench',
                contentAreas: 'Áreas de contenido del Workbench',
                carouselRole: 'carrusel',
                slideRole: 'diapositiva',
                filterEntries: 'Filtrar entradas',
                openDeutschosEntry: 'Abrir entrada de LLC',
                openPortfolioEntry: 'Abrir entrada del portafolio',
                openLaprincesaEntry: 'Abrir entrada de La Princesa',
                openCelignisEntry: 'Abrir entrada de Celignis',
                openPhageEntry: 'Abrir entrada sobre bacteriofagoterapia',
                openChitosanEntry: 'Abrir entrada sobre quitosano y microplásticos',
                currentDevelopmentAreas: 'Áreas de desarrollo actuales',
                footerNotice: 'Aviso de derechos, autoría y nota científica',
                closeEntry: 'Cerrar entrada'
            },
            nav: {
                profile: 'Perfil profesional',
                featured: 'Destacado',
                projects: 'Proyectos',
                research: 'Notas de investigación',
                learning: 'Técnica y aprendizaje',
                milestones: 'Hitos',
                principles: 'Método'
            },
            hero: {
                eyebrow: 'Proyectos independientes · notas científicas · aprendizaje aplicado',
                title: 'Un espacio vivo para<br><span>construir, probar y aprender.</span>',
                intro: 'El Workbench documenta proyectos seleccionados y pensamiento científico con autoría, evidencia, limitaciones y próximos pasos claramente definidos.',
                explore: 'Explorar trabajos destacados', profile: 'Ver perfil profesional'
            },
            status: {
                label: 'Estado del Workbench', focusLabel: 'Enfoque actual',
                focusValue: 'Desarrollo de LLC y del portafolio', aiLabel: 'Transparencia sobre IA',
                aiValue: 'La IA apoya la implementación técnica, la organización de contenidos y la revisión editorial, mientras yo defino objetivos, requisitos, contenido, pruebas y aprobación final.'
            },
            areas: { projects: 'Proyectos', research: 'Notas de investigación', learning: 'Técnica y aprendizaje', milestones: 'Hitos' },
            featured: {
                kicker: 'Destacado', title: 'Trabajos que representan mejor cómo pienso y construyo.',
                intro: 'Cada entrada separa la contribución real, la madurez actual, la evidencia y el trabajo pendiente.',
                carouselHelp: 'Tres entradas destacadas rotan automáticamente. Usa los controles para moverte, pausar o reanudar el carrusel.',
                dotsLabel: 'Entradas destacadas', previous: 'Entrada destacada anterior', next: 'Siguiente entrada destacada',
                pauseRotation: 'Pausar carrusel destacado', resumeRotation: 'Reanudar carrusel destacado',
                pauseRotationLabel: 'Pausar carrusel destacado', resumeRotationLabel: 'Reanudar carrusel destacado',
                show1: 'Mostrar entrada 1', show2: 'Mostrar entrada 2', show3: 'Mostrar entrada 3',
                slide1: 'Entrada 1 de 3', slide2: 'Entrada 2 de 3', slide3: 'Entrada 3 de 3'
            },
            categories: { project: 'Proyecto', research: 'Nota de investigación', laboratoryPractice: 'Prácticas de laboratorio' },
            statuses: { development: 'En desarrollo', functional: 'Funcional', completed: 'Completado', concept: 'Concepto' },
            common: { contribution: 'Contribución', evidence: 'Evidencia actual', open: 'Abrir entrada' },
            cards: {
                deutschos: {
                    summary: 'Proyecto de escritorio local-first y de código abierto para aprender idiomas, orientado a profesionales y estudiantes de laboratorio y ciencias de la vida. Nació como DeutschOS; el alemán sigue siendo la implementación de referencia.',
                    contribution: 'Concepto, requisitos, estructura de aprendizaje, revisión de contenido, pruebas y decisiones de producto, incluida la transición de DeutschOS hacia una arquitectura multilingüe reutilizable.',
                    evidence: 'Sistema local funcional centrado primero en alemán y en transición hacia LLC; desarrollo temprano / pre-release.',
                    tagLanguage: 'Aprendizaje de idiomas', tagLaboratory: 'Laboratorio y ciencias de la vida'
                },
                portfolio: {
                    title: 'Portafolio científico',
                    summary: 'Una web profesional multilingüe que presenta formación de laboratorio, experiencia práctica, técnicas y trabajos orientados a la investigación.',
                    contribution: 'Autoría del contenido, requisitos funcionales, decisiones visuales, revisión, pruebas y desarrollo asistido por IA.',
                    evidence: 'Web multilingüe publicada mediante GitHub Pages.',
                    tagLanguages: 'Tres idiomas'
                },
                phage: {
                    title: 'Bacteriofagoterapia',
                    summary: 'Revisión académica realizada en coautoría sobre la fagoterapia, sus aplicaciones clínicas, limitaciones y barreras regulatorias.',
                    contribution: 'Revisión bibliográfica, redacción científica, estructura del proyecto, desarrollo conceptual y preparación de la defensa.',
                    evidence: 'Proyecto académico completado de 61 páginas y material de presentación.',
                    tagReview: 'Revisión bibliográfica', tagCoauthored: 'Coautoría'
                },
                chitosan: {
                    title: 'Aplicaciones médicas del quitosano: potencial para la captura de microplásticos y su estudio biomédico',
                    summary: 'Propuesta conceptual informada por literatura, desarrollada y presentada internamente al centro para su consideración en el contexto de AETEL 2025; el centro finalmente priorizó otra propuesta.',
                    contribution: 'Desarrollo del concepto, hipótesis comprobables, encuadre científico y límites de validación explícitos.',
                    evidence: 'No avanzó al evento. No se realizó validación experimental; la propuesta sigue en fase conceptual y requiere validación in vitro.',
                    tagHypothesis: 'Hipótesis', tagValidation: 'Requiere validación'
                },
                laprincesa: {
                    title: 'Prácticas en Laboratorio Clínico y Biomédico · La Princesa'
                },
                celignis: {
                    title: 'Prácticas en Laboratorio Analítico y de Biomasa · Celignis'
                }
            },
            entries: { kicker: 'Índice del Workbench', title: 'Proyectos, notas de investigación y nivel de madurez en un único mapa editorial.' },
            filters: { all: 'Todo', projects: 'Proyectos', research: 'Notas de investigación', learning: 'Técnica y aprendizaje', milestones: 'Hitos', empty: 'Todavía no hay entradas disponibles en esta categoría.' },
            groups: {
                projects: 'Proyectos',
                research: 'Notas de investigación',
                learning: 'Técnica y aprendizaje',
                learningBody: 'Entradas de aprendizaje aplicado con resultado funcional e iteración verificable.',
                learningItem1: 'LLC · Sistema local centrado primero en alemán y en evolución hacia una arquitectura multilingüe',
                learningItem2: 'Portafolio científico · Entrega multilingüe publicada',
                learningItem3: 'La Princesa · Prácticas en laboratorio clínico y biomédico',
                learningItem4: 'Celignis · Prácticas en laboratorio analítico y de biomasa',
                learningItem5: 'Experimentación Animal A+B+C · 70 h · prácticas presenciales',
                milestones: 'Hitos',
                milestonesBody: 'Avances documentados con evidencia directa.',
                milestonesItem1: '2026 · Publicación del portafolio en GitHub Pages con controles automáticos de integridad',
                milestonesItem2: '2026 · El sistema funcional DeutschOS inició su transición a LLC — Laboratory Language Companion',
                milestonesItem3: '2025 · Prácticas FCT en el Hospital Universitario de La Princesa',
                milestonesItem4: '2025 · Proyecto final de bacteriofagoterapia en coautoría completado · 10/10',
                milestonesItem5: '2023 · Prácticas Erasmus+ de análisis de biomasa en Celignis'
            },
            entriesData: {
                deutschos: 'Proyecto local-first y de código abierto para aprender idiomas en contextos de laboratorio y ciencias de la vida, con el alemán como implementación de referencia.',
                portfolio: 'Portafolio multilingüe publicado para reclutadores, laboratorios y colaboradores científicos.',
                laprincesa: 'Prácticas hospitalarias de tres meses con aplicación de flujos de inmunología, biología molecular y procesamiento de muestras.',
                celignis: 'Prácticas Erasmus+ en Irlanda con flujos analíticos, rutinas GLP, trabajo conforme a SOP y creación de documentación operativa.',
                phage: 'Revisión académica realizada en coautoría sobre la fagoterapia, sus aplicaciones, limitaciones y barreras regulatorias.',
                chitosan: 'Hipótesis preliminar basada en literatura y propuesta para una futura validación controlada en laboratorio.'
            },
            professionalContext: {
                animalTraining: { kicker: 'Experimentación Animal · Funciones A+B+C', body: 'Curso certificado de 70 horas conforme a la Orden ECC/566/2015 con prácticas presenciales. El programa formal cubre cuidado de animales, eutanasia y realización de procedimientos, junto con bienestar/3R, reconocimiento del dolor y la angustia, métodos humanitarios de sacrificio, procedimientos mínimamente invasivos, anestesia y principios de cirugía.', pointFunctions: 'Funciones: A · cuidado de animales; B · eutanasia; C · realización de procedimientos', pointProgramme: 'Programa: bienestar y 3R · reconocimiento de dolor/sufrimiento/angustia · sacrificio humanitario · procedimientos mínimamente invasivos · anestesia básica y avanzada · principios de cirugía', pointHandsOn: 'Realizado personalmente durante prácticas supervisadas: manejo de animales, inyecciones, anestesia y procedimientos quirúrgicos para obtención de muestras/tejidos', pointSamples: 'Realizado personalmente: obtención/extracción de muestras animales. También participé en procedimientos supervisados que incluían eutanasia; no se presenta como una realización independiente.', scope: 'Nota de alcance: formación y experiencia práctica supervisada; no se afirma ejercicio veterinario o quirúrgico independiente.' },
                development: {
                    kicker: 'Desarrollo actual',
                    title: 'Desarrollo profesional continuo mientras preparo oportunidades de laboratorio.',
                    body: 'Junto con la búsqueda de oportunidades relacionadas con laboratorio, apoyo a investigación clínica y ciencia biomédica, continúo con la preparación de certificación de alemán, el desarrollo del portfolio científico y la revisión de literatura relacionada con mis áreas de interés.',
                    pointGerman: 'Preparación de certificación de alemán',
                    pointPortfolio: 'Desarrollo del portfolio científico',
                    pointLiterature: 'Revisión de literatura biomédica: fagoterapia, biomateriales y microplásticos'
                }
            },
            principles: {
                kicker: 'Método de trabajo', title: 'De una pregunta precisa a un trabajo científico útil y trazable.',
                intro: 'Preguntas, evidencia, documentación, aprendizaje y decisiones responsables forman un único flujo práctico.',
                questions: { title: 'Preguntas precisas', body: 'La curiosidad parte de la observación, la paciencia y la iniciativa, y se convierte en una pregunta capaz de orientar el estudio, la planificación experimental o la resolución de un problema técnico.' },
                documentation: { title: 'Trazabilidad del trabajo', body: 'Los métodos, datos, decisiones, aportaciones, revisiones y pruebas se documentan para que el camino hasta un resultado pueda examinarse y generar aprendizaje.' },
                application: { title: 'Del método a la aplicación', body: 'El estudio y el trabajo experimental avanzan desde el método, los datos y el análisis hacia el conocimiento y resultados prácticos que apoyen la salud, la toma de decisiones y una ciencia útil para la sociedad.' },
                integrity: { title: 'Integridad científica', body: 'La evidencia publicada, la interpretación, las hipótesis y los resultados se mantienen separados; las preguntas abiertas, la validación pendiente y las restricciones técnicas permanecen visibles. El trabajo relacionado con animales se aborda según los principios de bienestar y las 3R.' },
                learning: { title: 'Aprendizaje aplicado y colaboración', body: 'El aprendizaje continuo en laboratorio clínico, investigación biomédica e idiomas favorece la comunicación clara, la adaptabilidad y el trabajo en equipos multiculturales.' },
                ai: { title: 'Uso transparente de IA', body: 'Yo defino objetivos, requisitos y decisiones; después reviso, pruebo y apruebo el resultado final. La IA puede apoyar la implementación, la investigación, la organización, la redacción y la comprobación.' }
            },
            footer: { copyright: '© 2026 Jhon M. Cuenca. Todos los derechos reservados.', notice: 'JMC · Workbench documenta proyectos seleccionados, notas científicas y aprendizaje aplicado.', scientificNotice: 'Las notas científicas distinguen evidencia publicada, interpretación, hipótesis y limitaciones.' },
            dialog: {
                problem: 'Problema o motivación', contribution: 'Contribución real', result: 'Resultado o evidencia',
                context: 'Contexto', technicalWork: 'Trabajo técnico / Mi papel', technicalEvidence: 'Procedencia de la evidencia y detalle técnico',
                next: 'Limitaciones y próximos pasos', resources: 'Documentos y fuentes', navigationLabel: 'Navegación entre páginas del proyecto',
                previous: 'Anterior', nextEntry: 'Siguiente', openOtherPage: 'Abrir esta página',
                openPage2: 'Abrir página 2', backToPage1: 'Volver a página 1',
                pageShortLabel: 'Página',
                openPageNamed: 'Abrir página {page} de {total}: {title}', pagePosition: '{current} / {total}',
                pageChanged: 'Página {current} de {total}: {title}', overview: 'Vista general del proyecto',
                evidenceHeading: 'Contribución, evidencia y próximos pasos', expanded: 'Registro ampliado del proyecto',
                portfolioDetails: 'Finalidad, arquitectura y mantenimiento', llcDetails: 'Alcance, arquitectura y transición', academicContext: 'Contexto académico y documentación',
                proposal: 'Propuesta de investigación', hypotheses: 'Hipótesis de trabajo',
                hypothesesIntro: 'Resultados esperados reformulados como hipótesis iniciales y comprobables.',
                tags: 'Conceptos técnicos'
            }
        },
        de: {
            accessibility: {
                skip: 'Zum Inhalt springen',
                workbenchNavigation: 'Workbench-Navigation',
                returnProfile: 'Zum Berufsprofil zurückkehren',
                workbenchSections: 'Workbench-Bereiche',
                languageSelector: 'Sprachauswahl',
                workbenchStatus: 'Workbench-Status',
                contentAreas: 'Workbench-Inhaltsbereiche',
                carouselRole: 'Karussell',
                slideRole: 'Folie',
                filterEntries: 'Einträge filtern',
                openDeutschosEntry: 'LLC-Eintrag öffnen',
                openPortfolioEntry: 'Portfolio-Eintrag öffnen',
                openLaprincesaEntry: 'La-Princesa-Eintrag öffnen',
                openCelignisEntry: 'Celignis-Eintrag öffnen',
                openPhageEntry: 'Eintrag zur Bakteriophagentherapie öffnen',
                openChitosanEntry: 'Eintrag zu Chitosan und Mikroplastik öffnen',
                currentDevelopmentAreas: 'Aktuelle Entwicklungsschwerpunkte',
                footerNotice: 'Hinweis zu Urheberrecht, Autorenschaft und Wissenschaft',
                closeEntry: 'Eintrag schließen'
            },
            nav: {
                profile: 'Berufsprofil',
                featured: 'Auswahl',
                projects: 'Projekte',
                research: 'Forschungsnotizen',
                learning: 'Technik & Lernen',
                milestones: 'Meilensteine',
                principles: 'Methode'
            },
            hero: {
                eyebrow: 'Eigene Projekte · wissenschaftliche Notizen · angewandtes Lernen',
                title: 'Ein lebendiger Raum zum<br><span>Entwickeln, Prüfen und Lernen.</span>',
                intro: 'Die Workbench dokumentiert ausgewählte Projekte und wissenschaftliches Denken mit klarer Urheberschaft, Evidenz, Grenzen und nächsten Schritten.',
                explore: 'Ausgewählte Arbeiten ansehen', profile: 'Berufsprofil öffnen'
            },
            status: {
                label: 'Workbench-Status', focusLabel: 'Aktueller Schwerpunkt',
                focusValue: 'Entwicklung von LLC und Portfolio', aiLabel: 'KI-Transparenz',
                aiValue: 'KI unterstützt technische Umsetzung, Inhaltsorganisation und redaktionelle Überarbeitung, während ich Ziele, Anforderungen, Inhalte, Tests und die abschließende Freigabe verantworte.'
            },
            areas: { projects: 'Projekte', research: 'Forschungsnotizen', learning: 'Technik & Lernen', milestones: 'Meilensteine' },
            featured: {
                kicker: 'Auswahl', title: 'Arbeiten, die meine Denk- und Arbeitsweise am besten zeigen.',
                intro: 'Jeder Eintrag trennt den tatsächlichen Beitrag, Reifegrad, Evidenz und offene Arbeit.',
                carouselHelp: 'Drei ausgewählte Einträge wechseln automatisch. Mit den Steuerelementen kannst du das Karussell bewegen, pausieren oder fortsetzen.',
                dotsLabel: 'Ausgewählte Einträge', previous: 'Vorheriger ausgewählter Eintrag', next: 'Nächster ausgewählter Eintrag',
                pauseRotation: 'Ausgewähltes Karussell pausieren', resumeRotation: 'Ausgewähltes Karussell fortsetzen',
                pauseRotationLabel: 'Ausgewähltes Karussell pausieren', resumeRotationLabel: 'Ausgewähltes Karussell fortsetzen',
                show1: 'Eintrag 1 anzeigen', show2: 'Eintrag 2 anzeigen', show3: 'Eintrag 3 anzeigen',
                slide1: 'Eintrag 1 von 3', slide2: 'Eintrag 2 von 3', slide3: 'Eintrag 3 von 3'
            },
            categories: { project: 'Projekt', research: 'Forschungsnotiz', laboratoryPractice: 'Laborpraktikum' },
            statuses: { development: 'In Entwicklung', functional: 'Funktionsfähig', completed: 'Abgeschlossen', concept: 'Konzept' },
            common: { contribution: 'Beitrag', evidence: 'Aktueller Nachweis', open: 'Eintrag öffnen' },
            cards: {
                deutschos: {
                    summary: 'Lokales, quelloffenes Desktop-Projekt zum Sprachenlernen für Fachkräfte und Lernende in Labor- und Life-Science-Bereichen. Es entstand aus DeutschOS; Deutsch bleibt die Referenzimplementierung.',
                    contribution: 'Konzept, Anforderungen, Lernstruktur, Inhaltsprüfung, Tests und Produktentscheidungen, einschließlich des Übergangs von DeutschOS zu einer wiederverwendbaren mehrsprachigen Architektur.',
                    evidence: 'Funktionsfähiges deutschbasiertes lokales System im Übergang zu LLC; frühe Entwicklung / Pre-Release.',
                    tagLanguage: 'Sprachenlernen', tagLaboratory: 'Labor & Biowissenschaften'
                },
                portfolio: {
                    title: 'Wissenschaftliches Portfolio',
                    summary: 'Eine mehrsprachige professionelle Website zu Laborausbildung, Praxiserfahrung, Methoden und forschungsorientierten Arbeiten.',
                    contribution: 'Inhaltliche Verantwortung, funktionale Anforderungen, visuelle Entscheidungen, Prüfung, Tests und KI-unterstützte Entwicklung.',
                    evidence: 'Veröffentlichte mehrsprachige Website über GitHub Pages.',
                    tagLanguages: 'Drei Sprachen'
                },
                phage: {
                    title: 'Bakteriophagentherapie',
                    summary: 'Gemeinsam verfasste akademische Literaturübersicht zu Phagentherapie, klinischen Anwendungen, Grenzen und regulatorischen Hürden.',
                    contribution: 'Literaturrecherche, wissenschaftliches Schreiben, Projektstruktur, konzeptionelle Entwicklung und Vorbereitung der Verteidigung.',
                    evidence: 'Abgeschlossenes 61-seitiges akademisches Projekt und Präsentationsmaterial.',
                    tagReview: 'Literaturübersicht', tagCoauthored: 'Gemeinsam verfasst'
                },
                chitosan: {
                    title: 'Medizinische Anwendungen von Chitosan: Potenzial zur Mikroplastikbindung und biomedizinischen Untersuchung',
                    summary: 'Literaturgestützter Konzeptvorschlag, der intern beim Ausbildungszentrum zur Prüfung im Kontext AETEL 2025 eingereicht wurde; das Zentrum priorisierte schließlich einen anderen Beitrag.',
                    contribution: 'Konzeptentwicklung, prüfbare Hypothesen, wissenschaftliche Einordnung und explizite Validierungsgrenzen.',
                    evidence: 'Der Vorschlag gelangte nicht zur Veranstaltung. Es erfolgte keine experimentelle Validierung; er bleibt konzeptionell und erfordert In-vitro-Validierung.',
                    tagHypothesis: 'Hypothese', tagValidation: 'Validierung erforderlich'
                },
                laprincesa: {
                    title: 'Praktikum im klinisch-biomedizinischen Labor · La Princesa'
                },
                celignis: {
                    title: 'Praktikum im analytischen Biomasse-Labor · Celignis'
                }
            },
            entries: { kicker: 'Workbench-Index', title: 'Projekte, Forschungsnotizen und Reifegrad in einer klaren redaktionellen Struktur.' },
            filters: { all: 'Alle', projects: 'Projekte', research: 'Forschungsnotizen', learning: 'Technik & Lernen', milestones: 'Meilensteine', empty: 'In dieser Kategorie sind noch keine Einträge verfügbar.' },
            groups: {
                projects: 'Projekte',
                research: 'Forschungsnotizen',
                learning: 'Technik & Lernen',
                learningBody: 'Angewandte Lernbeiträge mit funktionalem Ergebnis und nachvollziehbarer Iteration.',
                learningItem1: 'LLC · Deutschbasierte lokale Referenzimplementierung im Übergang zu einer mehrsprachigen Architektur',
                learningItem2: 'Wissenschaftliches Portfolio · Veröffentlichte mehrsprachige Umsetzung',
                learningItem3: 'La Princesa · Praktikum im klinisch-biomedizinischen Labor',
                learningItem4: 'Celignis · Praktikum im analytischen Biomasse-Labor',
                learningItem5: 'Versuchstierkunde A+B+C · 70 Std. · Präsenzpraxis',
                milestones: 'Meilensteine',
                milestonesBody: 'Dokumentierte Fortschritte mit direkter Evidenz.',
                milestonesItem1: '2026 · Portfolio auf GitHub Pages veröffentlicht, mit automatischen Integritätsprüfungen',
                milestonesItem2: '2026 · Das funktionsfähige DeutschOS-System begann den Übergang zu LLC — Laboratory Language Companion',
                milestonesItem3: '2025 · FCT-Praktikum am Hospital Universitario de La Princesa',
                milestonesItem4: '2025 · Gemeinsam verfasstes Abschlussprojekt zur Phagentherapie abgeschlossen · 10/10',
                milestonesItem5: '2023 · Erasmus+-Praktikum in der Biomasseanalytik bei Celignis'
            },
            entriesData: {
                deutschos: 'Lokales Open-Source-Sprachlernprojekt für Labor- und Life-Science-Kontexte mit Deutsch als Referenzimplementierung.',
                portfolio: 'Veröffentlichtes mehrsprachiges Portfolio für Recruiter, Labore und wissenschaftliche Kontakte.',
                laprincesa: 'Dreimonatiges Praktikum im Krankenhausforschungskontext mit angewandten Workflows in Immunologie, Molekularbiologie und Probenverarbeitung.',
                celignis: 'Erasmus+-Laborpraktikum in Irland mit analytischen Abläufen, GLP-Routinen, Arbeit nach SOPs und Erstellung operativer Dokumentation.',
                phage: 'Gemeinsam verfasste akademische Literaturübersicht zu Phagentherapie, Anwendungen, Grenzen und regulatorischen Hürden.',
                chitosan: 'Frühe, literaturbasierte Hypothese für eine spätere kontrollierte Validierung im Labor.'
            },
            professionalContext: {
                animalTraining: { kicker: 'Versuchstierkunde · Funktionen A+B+C', body: 'Zertifizierter 70-Stunden-Kurs gemäß Erlass ECC/566/2015 mit Präsenzpraxis. Das formale Programm umfasst Tierpflege, Tötung/Euthanasie und Durchführung von Verfahren sowie Tierwohl/3R, Erkennen von Schmerz und Angst, tierschutzgerechte Tötungsmethoden, minimalinvasive Verfahren, Anästhesie und chirurgische Grundlagen.', pointFunctions: 'Funktionen: A · Tierpflege; B · Tötung/Euthanasie; C · Durchführung von Verfahren', pointProgramme: 'Programm: Tierwohl & 3R · Erkennen von Schmerz/Leiden/Angst · tierschutzgerechte Tötung · minimalinvasive Verfahren · einfache und fortgeschrittene Anästhesie · chirurgische Grundlagen', pointHandsOn: 'Persönlich im beaufsichtigten Praxisteil durchgeführt: Tierhandling, Injektionen, Anästhesie und chirurgische Verfahren zur Proben-/Gewebegewinnung', pointSamples: 'Persönlich durchgeführt: Gewinnung/Entnahme tierischer Proben. Außerdem Beteiligung an beaufsichtigten Verfahren mit Euthanasie; nicht als eigenständige Durchführung dargestellt.', scope: 'Hinweis zum Umfang: beaufsichtigte Ausbildung und Praxiserfahrung; keine eigenständige tierärztliche oder chirurgische Tätigkeit.' },
                development: {
                    kicker: 'Aktuelle Entwicklung',
                    title: 'Kontinuierliche berufliche Entwicklung während der Vorbereitung auf Laborchancen.',
                    body: 'Parallel zu Bewerbungen für laborbezogene Positionen, Unterstützung in klinischer Forschung und biomedizinische Wissenschaft bereite ich mich weiter auf eine Deutschzertifizierung vor, entwickle mein wissenschaftliches Portfolio und vertiefe Literaturrecherche in meinen Interessengebieten.',
                    pointGerman: 'Vorbereitung auf Deutschzertifizierung',
                    pointPortfolio: 'Entwicklung des wissenschaftlichen Portfolios',
                    pointLiterature: 'Biomedizinische Literaturrecherche: Phagentherapie, Biomaterialien und Mikroplastik'
                }
            },
            principles: {
                kicker: 'Arbeitsweise', title: 'Von einer präzisen Frage zu nützlicher, nachvollziehbarer wissenschaftlicher Arbeit.',
                intro: 'Fragen, Evidenz, Dokumentation, Lernen und verantwortungsvolle Entscheidungen bilden einen zusammenhängenden praktischen Arbeitsablauf.',
                questions: { title: 'Präzise Fragen', body: 'Neugier beginnt mit Beobachtung, Geduld und Eigeninitiative und wird zu einer Frage, die Untersuchung, Versuchsplanung oder die Lösung eines technischen Problems leiten kann.' },
                documentation: { title: 'Nachvollziehbare Arbeit', body: 'Methoden, Daten, Entscheidungen, Beiträge, Prüfungen und Tests werden dokumentiert, damit der Weg zum Ergebnis nachvollzogen werden kann und daraus Lernen entsteht.' },
                application: { title: 'Von der Methode zur Anwendung', body: 'Studium und experimentelle Arbeit führen über Methode, Daten und Analyse zu Erkenntnissen und praktischen Ergebnissen, die Gesundheit, Entscheidungsfindung und gesellschaftlich nützliche Wissenschaft unterstützen.' },
                integrity: { title: 'Wissenschaftliche Integrität', body: 'Publizierte Evidenz, Interpretation, Hypothesen und Ergebnisse bleiben getrennt; offene Fragen, fehlende Validierung und technische Einschränkungen werden sichtbar gemacht. Bei tierbezogenen Arbeiten gelten Tierwohl und die 3R-Prinzipien.' },
                learning: { title: 'Angewandtes Lernen & Zusammenarbeit', body: 'Kontinuierliches Lernen in klinischer Labordiagnostik, biomedizinischer Forschung und Sprachen unterstützt klare Kommunikation, Anpassungsfähigkeit und die Arbeit in multikulturellen Teams.' },
                ai: { title: 'Transparente KI-Unterstützung', body: 'Ziele, Anforderungen und Entscheidungen definiere ich selbst; anschließend überprüfe und teste ich das Ergebnis und gebe es abschließend frei. KI kann Umsetzung, Recherche, Organisation, Formulierung und Prüfung unterstützen.' }
            },
            footer: { copyright: '© 2026 Jhon M. Cuenca. Alle Rechte vorbehalten.', notice: 'JMC · Workbench dokumentiert ausgewählte Projekte, wissenschaftliche Notizen und angewandtes Lernen.', scientificNotice: 'Wissenschaftliche Notizen unterscheiden publizierte Evidenz, Interpretation, Hypothesen und Grenzen.' },
            dialog: {
                problem: 'Problem oder Motivation', contribution: 'Tatsächlicher Beitrag', result: 'Ergebnis oder Nachweis',
                context: 'Kontext', technicalWork: 'Technische Arbeit / Meine Rolle', technicalEvidence: 'Nachweisgrundlage & technische Details',
                next: 'Grenzen und nächste Schritte', resources: 'Dokumente und Quellen', navigationLabel: 'Navigation zwischen Projektseiten',
                previous: 'Zurück', nextEntry: 'Weiter', openOtherPage: 'Diese Seite öffnen',
                openPage2: 'Seite 2 öffnen', backToPage1: 'Zurück zu Seite 1',
                pageShortLabel: 'Seite',
                openPageNamed: 'Seite {page} von {total} öffnen: {title}', pagePosition: '{current} / {total}',
                pageChanged: 'Seite {current} von {total}: {title}', overview: 'Projektübersicht',
                evidenceHeading: 'Beitrag, Nachweis und nächste Schritte', expanded: 'Erweiterte Projektdokumentation',
                portfolioDetails: 'Zweck, Architektur und Pflege', llcDetails: 'Umfang, Architektur & Übergang', academicContext: 'Akademischer Kontext und Dokumentation',
                proposal: 'Forschungsvorschlag', hypotheses: 'Arbeitshypothesen',
                hypothesesIntro: 'Erwartete Ergebnisse als erste, überprüfbare Hypothesen formuliert.',
                tags: 'Technische Konzepte'
            }
        }
    };

    const entryData = {
        en: {
            deutschos: {
      category: 'Project · Technical & learning', status: 'Early development / pre-release', title: 'LLC — Laboratory Language Companion',
      summary: 'An open-source, local-first desktop language-learning environment for laboratory and life-science professionals. It originated as DeutschOS, whose functioning German-first implementation turns language study into a structured, reviewable and professionally relevant system. German now serves as the reference implementation while the architecture is generalized for multiple languages and scientific domains.',
      problem: 'Generic language-learning tools do not fully connect everyday language, laboratory vocabulary, scientific communication, motivation, structured educational sources and long-term review in one coherent workflow. DeutschOS addressed that need first for German; LLC extends the same problem toward reusable language and scientific-domain paths.',
      contribution: 'Definition of learning goals, functional requirements, content hierarchy, correction model, memory-confirmation workflow and product decisions. The current transition also includes defining language-independent architecture and science/laboratory domain framing. Programming is AI-assisted.',
      result: 'A functioning German-first local system exists and is being developed in broad functional blocks. The original DeutschOS codebase is being transitioned into LLC, an open-source project in early development / pre-release. It serves as evidence of product thinking and applied learning design, not as a finished multilingual product.',
      next: 'Continue testing, content validation and usability review; preserve the German experience while separating language-independent functionality from German-specific behavior; maintain public/private educational-data boundaries; and validate the architecture with a second language before presenting LLC as a mature multilingual system.',
      disclosure: 'AI use: support for technical implementation and editorial review. I define the concept, requirements, content, testing and final decisions.',
      details: [
          {
              title: 'Origin & scope',
              body: 'LLC began as DeutschOS, a personal German-learning platform. German remains the first and most developed reference implementation. The broader project combines general language learning with professional and scientific communication for laboratory, biomedical and life-science environments, with a long-term structure intended to separate language from professional domain.'
          },
          {
              title: 'Local-first architecture',
              body: 'The current system uses FastAPI, Next.js, a Swift macOS controller, SQLite, LM Studio and local embedding models. The AI tutor runs locally. Its source-aware educational library includes infrastructure for document ingestion and versioning, page-level comparison, OCR-related workflows, structured extraction, review, processing runs, source coverage, auditing and educational-library queries. Private learning material remains outside the public repository.'
          },
          {
              title: 'Current transition & validation',
              body: 'The public-development phase focuses on safely publishing the existing codebase, preserving Git history, separating private educational material from public code, migrating the DeutschOS identity to LLC, defining language-independent architecture, preserving the German experience and preparing future scientific language paths. A later second-language implementation is intended to test whether the architecture is genuinely language-independent.'
          }
      ],
      resources: [
          { label: 'Public LLC repository', href: 'https://github.com/Cuenca-john1999/laboratory-language-companion' }
      ]
  },
            portfolio: {
                category: 'Project · Milestone', status: 'Functional', title: 'Scientific Portfolio',
                summary: 'A multilingual static website designed to communicate a laboratory profile clearly to recruiters and scientific teams.',
                problem: 'Spanish vocational qualifications and mixed clinical, biomedical and analytical experience require careful explanation in an international context.',
                contribution: 'Responsibility for professional content, publication decisions, functional requirements, wording and scientific-claim review, site testing, and product and visual decisions.',
                result: 'The site is published through GitHub Pages with English, German and Spanish support and accessible professional sections.',
                next: 'Next steps are to refine the separation between the professional profile and Workbench, improve content maintenance, and continue accessibility and responsive-layout validation.',
                disclosure: 'AI use: support for technical implementation and editorial review. I define the concept, requirements, content, testing and final decisions.',
                details: [
                    {
                        title: 'Purpose',
                        body: 'Present my professional profile, experience and public professional documentation; maintain Workbench as a separate space for projects, notes and applied learning; and communicate scientific content by clearly separating evidence, interpretation and hypotheses.'
                    },
                    {
                        title: 'Architecture',
                        body: 'Static website with no backend, implemented with HTML, CSS and vanilla JavaScript. Main portfolio translations are loaded from JSON files in English, German and Spanish; Workbench translations are maintained internally. The structure is compatible with GitHub Pages.'
                    },
                    {
                        title: 'Maintenance',
                        body: 'The portfolio is maintained as a static, multilingual platform, with periodic reviews of its content, accessibility and responsive design. Updates prioritise professional clarity, scientific accuracy and consistency between the main profile and Workbench.'
                    }
                ],
                resources: [
                    { label: 'Published professional profile', href: '../' }
                ]
            },
            phage: {
                category: 'Research note · Milestone', status: 'Completed', title: 'Bacteriophage Therapy',
                summary: 'A co-authored final academic project reviewing bacteriophage therapy and framing future research questions.',
                problem: 'Antimicrobial resistance has renewed interest in bacteriophages, but clinical use still involves scientific, manufacturing and regulatory limitations.',
                contribution: 'Participation in the literature review, scientific writing, project structure, conceptual development and defence preparation, including the future-oriented connection between bacteriophage therapy, chitosan and microplastic-related biomedical questions. Co-authorship is explicitly credited.',
                result: 'A completed 61-page academic project and defense material. It is a literature review, not an experimental or clinical study. The linked English PDF is an unofficial translation/adaptation and is not a certified or sworn translation; the original academic work is the Spanish version.',
                next: 'Any original future-oriented concepts derived from the review require separate experimental validation and should not be presented as demonstrated treatments.',
                disclosure: 'Authorship note: this project was co-authored with Luis Gonzalo Legua Pérez and is presented with co-author permission.',
                details: [
                    {
                        title: 'Academic scope',
                        body: 'Bacteriophage Therapy: Rediscovering an Innovative Therapy is a co-authored final academic literature-review project. The available evidence is the completed written project and defence material; no original experimental or clinical results are claimed.'
                    },
                    {
                        title: 'Original interdisciplinary hypothesis',
                        body: 'As an individual contribution within the collaborative final project, the work proposes a future research concept combining bacteriophage specificity with chitosan-based adsorption. Phages would not act directly on plastic polymers. Sequencing could identify microorganisms associated with microplastic biofilms and support the selection or design of specific phages, while controlled laboratory studies would assess whether biofilm destabilization improves microplastic interaction, capture or later analytical evaluation. This early-stage hypothesis requires in vitro validation, toxicity assessment, reproducible analytical controls and clinical caution.'
                    },
                    {
                        title: 'Review methodology',
                        body: 'Structured academic literature review: 75 articles were assessed and 51 selected using explicit inclusion and selection criteria. Searches covered Spanish, English, Portuguese and Russian sources, including PubMed/NIH, ASM, JIDC, Google Scholar and university repositories. The work followed seven phases spanning search, screening, analysis, drafting and final scientific writing.'
                    }
                ],
                resources: [
                    { label: 'Final project · Unofficial English translation', href: '../assets/documents/bacteriophage-therapy-final-project_EN.pdf' },
                    { label: 'Defense presentation · Unofficial English translation · 17 slides · Original: Spanish', href: '../assets/documents/bacteriophage-therapy-defense_EN.pdf' }
                ]
            },
            chitosan: {
                category: 'Research note · Concept · AETEL 2025', status: 'Concept', title: 'Medical applications of chitosan: potential for microplastic capture and biomedical study',
                summary: 'Literature-informed conceptual proposal developed and submitted internally to the training centre for consideration in the context of AETEL 2025. The centre ultimately prioritised another submission, so this proposal did not advance to the event.',
                problem: 'Microplastics are an emerging health concern, but human exposure, accumulation and clinical impact still require careful experimental confirmation.',
                contribution: 'Original concept development, hypothesis framing, proposed methodology and scientific communication. The contribution includes the adsorption, biofilm-guided design, degradation-support and biomedical feasibility hypotheses, with scope and limitations stated explicitly.',
                result: 'Current maturity is conceptual only. Proposed methods include biofilm sequencing, MiSeq-based microbial profiling, chitosan modification, FTIR characterization, adsorption assays and biocompatibility testing. No experimental validation was performed.',
                next: 'The proposal requires in vitro validation, toxicity assessment, robust controls, reproducible analytical methods, independent scientific review and cautious interpretation before any biomedical or clinical interpretation. It does not claim demonstrated therapeutic efficacy.',
                disclosure: 'Scientific integrity note: literature-informed conceptual proposal with no original experimental validation. In vitro validation, toxicity assessment, robust controls and reproducible analytical methods are required before any biomedical or clinical interpretation.',
                details: [
                    {
                        title: 'Central idea',
                        body: 'Explore chitosan-based materials as candidates for microplastic adsorption, retention or controlled laboratory study, without claiming therapeutic efficacy.'
                    },
                    {
                        title: 'Adsorption hypothesis',
                        body: 'Modified chitosan may show measurable affinity for selected microplastic surfaces under controlled in vitro conditions, supporting retention and later analytical evaluation.'
                    },
                    {
                        title: 'Biofilm-guided design hypothesis',
                        body: 'Microorganisms associated with microplastic biofilms may provide useful biological information for selecting or designing more specific chitosan-based materials.'
                    },
                    {
                        title: 'Degradation-support hypothesis',
                        body: 'If chitosan-microplastic complexes can be characterized reproducibly, enzymatic or biochemical strategies could be explored as future models for microplastic breakdown without assuming clinical efficacy.'
                    },
                    {
                        title: 'Biomedical feasibility hypothesis',
                        body: 'Only if specificity, stability and biocompatibility are demonstrated in vitro could this concept move toward future biomedical capture, retention or study models.'
                    },
                    {
                        title: 'Proposed methods',
                        body: 'Biofilm sequencing, MiSeq-based microbial profiling, chitosan modification, FTIR characterization, adsorption assays and biocompatibility testing.'
                    },
                    {
                        title: 'Project maturity',
                        body: 'Conceptual proposal only. It would need in vitro validation, toxicity assessment, controls and reproducible analytical methods before any clinical interpretation.'
                    }
                ]
            },
            laprincesa: {
                category: 'Laboratory Practice', status: 'Completed', title: 'Clinical & Biomedical Laboratory Practice · La Princesa',
                summary: 'Three-month research-laboratory placement in Madrid integrating clinical sample workflows with molecular and immunology techniques.',
                context: 'FCT placement in 2025 at Fundación para la Investigación Biomédica del Hospital Universitario de La Princesa in Madrid, within the Immunology Service and Nutrition & Inflammation Laboratory. The group studies cellular and molecular mechanisms in inflammatory and autoimmune diseases using human and animal samples.',
                technicalWork: 'Supported day-to-day cell-culture, sample-processing, molecular-biology and immunology workflows under laboratory protocols, together with scientific-database work, material and inventory management, and development of a bilingual scientific website for the research group. My role progressed from trainee participation to specific responsibility within the cell-culture workflow: I was trusted with cell handling, maintenance and related routines, and was frequently called on to support supervised animal-sample procedures and molecular or immunology workflows. The supervised role strengthened reproducibility, assay interpretation and quality-control practice while building greater autonomy. During supervised animal-sample procedures, I personally performed murine sample collection/extraction and subsequent sample handling.',
                technicalEvidence: 'Confirmed placement scope includes serum, peripheral blood, immune cells, cell lines and primary rat cells; cytokine-stimulated and adherent cell cultures, including HaCaT; sterile technique, media preparation, passaging and freezing; Buffy Coat handling and CD4/CD14 isolation; human samples in psoriasis, dermatitis and hidradenitis suppurativa contexts; animal samples and murine lymphoid organs; RNA extraction, PCR, electrophoresis and transgenic-mouse genotyping; ELISA; Western blot gel casting, transfer and blocking; immunohistochemistry; and immunofluorescence. The placement duration and context are documented; an existing professional reference supports protocol work and laboratory-material responsibilities.',
                technicalEvidenceLead: 'Evidence map: documented placement context, reference-supported responsibilities and personally confirmed supervised practice.',
                technicalEvidenceGroups: [
                    { title: 'Evidence provenance', body: 'The FCT placement and its context are documented. An existing professional reference supports protocol work and laboratory-material responsibilities. The technical inventory below also includes supervised hands-on work personally confirmed for this portfolio; it should not be read as if every listed technique were independently itemised in the reference.' },
                    { title: 'Cell culture & samples', body: 'serum, peripheral blood, immune cells, cell lines and primary rat cells; cytokine-stimulated and adherent cell cultures, including HaCaT; sterile technique, media preparation, passaging and freezing; Buffy Coat handling and CD4/CD14 isolation; human samples in psoriasis, dermatitis and hidradenitis suppurativa contexts; animal samples and murine lymphoid organs' },
                    { title: 'Animal-sample collection', body: 'personally performed, under supervision and established protocols, collection/extraction of murine samples and subsequent handling of animal-derived material' },
                    { title: 'Molecular biology', body: 'RNA extraction, PCR, electrophoresis and transgenic-mouse genotyping; Western blot gel casting, transfer and blocking' },
                    { title: 'Immunology', body: 'ELISA; immunohistochemistry; and immunofluorescence' },
                    { title: 'Protocols, documentation & digital communication', body: 'work with laboratory protocols and scientific databases; material and inventory management; development of a bilingual scientific website for the research group' },
                    { title: 'Documentary basis & privacy', body: 'Supporting records remain private when publication would expose personal, third-party or confidential laboratory information. Public wording therefore separates documentary support from personally confirmed supervised practice.' }
                ],
                disclosure: 'Scope note: documented placement evidence, reference-supported responsibilities and personally confirmed supervised hands-on work are separated here. This is laboratory placement experience, not an independent clinical claim or therapeutic study, and it does not claim independent clinical, veterinary or surgical practice.'
            },
            celignis: {
                category: 'Laboratory Practice', status: 'Completed', title: 'Analytical & Biomass Laboratory Practice · Celignis',
                summary: 'Erasmus+ placement in Limerick focused on analytical biomass testing, GLP routines and technical documentation.',
                context: 'Erasmus+ placement from 03/2023 to 05/2023 at Celignis Biomass Analysis Laboratory in Limerick, Ireland, supporting analytical work for clients and in the context of SteamBioAfrica and BIO4Africa.',
                technicalWork: 'Sample preparation and performance of analytical workflows under GLP-based routines and according to established SOPs; equipment operation, calibration, troubleshooting, maintenance and monitoring; creation of operational guides, data sheets, work instructions and troubleshooting documentation; progressive responsibility for volatile-matter analysis; and training and supervision of replacement interns during handover.',
                technicalEvidence: 'Confirmed placement scope includes moisture, ash, volatile matter, fixed carbon, thermogravimetric analysis (TGA), CHNOS elemental analysis, ash melting, BMP and biogas, FOS/TAC, ICP, COD, ammonia, NIR/VISION and vacuum filtration; operation of a CHNOS analyser, TGA Q500, CARBOLITE furnaces, BMP units and Biogas 5000; internal statistical quality controls; and Thermal Excel records, database updates, batches, labels and result traceability. Operational documentation covers analytical methods, analysis startup, batches, samples/NIR, labelling, data sheets and Thermal Excel troubleshooting. The Erasmus+ placement is documented; an existing professional reference supports the placement and operational responsibilities. This foundation supports continued development in method validation, uncertainty analysis and cross-method interpretation.',
                technicalEvidenceLead: 'Evidence map: documented Erasmus+ placement, reference-supported responsibilities and confirmed practical scope.',
                technicalEvidenceGroups: [
                    { title: 'Evidence provenance', body: 'The Erasmus+ placement and its dates are documented. An existing professional reference supports analytical placement work, equipment operation and troubleshooting, GLP practice, statistical quality self-checks and handover. The technical inventory below consolidates confirmed placement practice without implying that every listed method or instrument is individually itemised in the reference.' },
                    { title: 'Analysis', body: 'moisture, ash, volatile matter, fixed carbon, thermogravimetric analysis (TGA), CHNOS elemental analysis, ash melting, BMP and biogas, FOS/TAC, ICP, COD, ammonia, NIR/VISION and vacuum filtration' },
                    { title: 'Instrumentation', body: 'operation of a CHNOS analyser, TGA Q500, CARBOLITE furnaces, BMP units and Biogas 5000' },
                    { title: 'Quality & traceability', body: 'work according to established SOPs, internal statistical quality-control self-checks, Thermal Excel records, database updates, batches, labels and result traceability' },
                    { title: 'Operational documentation created', body: 'operational guides, data sheets, work instructions and troubleshooting documentation covering analytical methods, analysis startup, batches, samples and NIR, labelling, Thermal Excel and traceability' },
                    { title: 'Responsibility & handover', body: 'progressive responsibility for the volatile-matter workflow, including handover training and supervision of replacement interns. This foundation supports continued development in method validation, uncertainty analysis and cross-method interpretation.' },
                    { title: 'Documentary basis & confidentiality', body: 'Internal or client-related operational material is not republished; only a public-safe summary is shown. Public wording distinguishes placement records and reference support from the wider practical scope confirmed for the portfolio.' }
                ],
                disclosure: 'Scope note: documented placement evidence, reference-supported responsibilities and confirmed supervised analytical practice are separated here. No client-confidential material is republished.'
            }
        },
        es: {
            deutschos: {
      category: 'Proyecto · Técnica y aprendizaje', status: 'Desarrollo temprano / pre-release', title: 'LLC — Laboratory Language Companion',
      summary: 'Entorno de escritorio local-first y de código abierto para el aprendizaje de idiomas orientado a profesionales y estudiantes de laboratorio y ciencias de la vida. Nació como DeutschOS, cuya implementación funcional centrada primero en alemán convierte el estudio del idioma en un sistema estructurado, revisable y profesionalmente relevante. El alemán sirve ahora como implementación de referencia mientras la arquitectura se generaliza para varios idiomas y dominios científicos.',
      problem: 'Las herramientas genéricas de aprendizaje de idiomas no conectan del todo el lenguaje cotidiano, el vocabulario de laboratorio, la comunicación científica, la motivación, las fuentes educativas estructuradas y el repaso a largo plazo en un único flujo coherente. DeutschOS abordó primero esa necesidad para el alemán; LLC amplía el mismo problema hacia rutas reutilizables de idioma y dominio científico.',
      contribution: 'Definición de objetivos de aprendizaje, requisitos funcionales, jerarquía de contenidos, modelo de corrección, flujo de confirmación de memoria y decisiones de producto. La transición actual también incluye definir una arquitectura independiente del idioma y el marco de dominios científicos y de laboratorio. La programación está asistida por IA.',
      result: 'Existe un sistema local funcional centrado primero en alemán y desarrollado en bloques funcionales amplios. El código original de DeutschOS está en transición hacia LLC, un proyecto de código abierto en fase de desarrollo temprano / pre-release. Demuestra pensamiento de producto y diseño de aprendizaje aplicado, pero todavía no es un producto multilingüe terminado.',
      next: 'Continuar las pruebas, la validación de contenidos y la revisión de usabilidad; preservar la experiencia alemana mientras se separa la funcionalidad independiente del idioma del comportamiento específico del alemán; mantener los límites entre los datos educativos privados y el código público; y validar la arquitectura con un segundo idioma antes de presentar LLC como un sistema multilingüe maduro.',
      disclosure: 'Uso de IA: apoyo en implementación técnica y revisión editorial. Yo defino el concepto, los requisitos, el contenido, las pruebas y las decisiones finales.',
      details: [
          {
              title: 'Origen y alcance',
              body: 'LLC comenzó como DeutschOS, una plataforma personal para aprender alemán. El alemán sigue siendo la primera implementación de referencia y la más desarrollada. El proyecto más amplio combina el aprendizaje general del idioma con la comunicación profesional y científica para entornos de laboratorio, biomédicos y de ciencias de la vida, con una estructura a largo plazo pensada para separar el idioma del dominio profesional.'
          },
          {
              title: 'Arquitectura local-first',
              body: 'El sistema actual utiliza FastAPI, Next.js, un controlador nativo de macOS en Swift, SQLite, LM Studio y modelos locales de embeddings. El tutor de IA se ejecuta localmente. Su biblioteca educativa orientada a fuentes incluye infraestructura para ingesta y versionado de documentos, comparación por página, flujos relacionados con OCR, extracción estructurada, revisión, ejecuciones de procesamiento, cobertura de fuentes, auditoría y consultas a la biblioteca educativa. El material privado de aprendizaje permanece fuera del repositorio público.'
          },
          {
              title: 'Transición y validación actuales',
              body: 'La fase de desarrollo público se centra en publicar de forma segura el código existente, preservar el historial Git, separar el material educativo privado del código público, migrar la identidad DeutschOS a LLC, definir una arquitectura independiente del idioma, conservar la experiencia alemana y preparar futuras rutas de idiomas científicos. Una futura implementación de un segundo idioma está destinada a comprobar si la arquitectura es realmente independiente del idioma.'
          }
      ],
      resources: [
          { label: 'Repositorio público de LLC', href: 'https://github.com/Cuenca-john1999/laboratory-language-companion' }
      ]
  },
            portfolio: {
                category: 'Proyecto · Hito', status: 'Funcional', title: 'Portafolio científico',
                summary: 'Una web estática multilingüe diseñada para comunicar con claridad un perfil de laboratorio a reclutadores y equipos científicos.',
                problem: 'Las titulaciones profesionales españolas y la experiencia clínica, biomédica y analítica necesitan explicarse con cuidado en un contexto internacional.',
                contribution: 'Responsabilidad sobre el contenido profesional, las decisiones de publicación, los requisitos funcionales, la revisión del lenguaje y de las afirmaciones científicas, las pruebas de la web y las decisiones de producto y diseño.',
                result: 'La web está publicada mediante GitHub Pages, tiene soporte en inglés, alemán y español y presenta secciones profesionales accesibles.',
                next: 'Los próximos pasos son perfeccionar la separación entre el perfil profesional y Workbench, mejorar el mantenimiento del contenido y continuar las validaciones de accesibilidad y diseño responsive.',
                disclosure: 'Uso de IA: apoyo en implementación técnica y revisión editorial. Yo defino la conceptualización, los requisitos, el contenido, las pruebas y las decisiones finales.',
                details: [
                    {
                        title: 'Finalidad',
                        body: 'Presentar mi perfil profesional, experiencia y documentación profesional pública; mantener Workbench como un espacio separado para proyectos, notas y aprendizaje aplicado; y comunicar el contenido científico separando con claridad evidencia, interpretación e hipótesis.'
                    },
                    {
                        title: 'Arquitectura',
                        body: 'Web estática sin backend, implementada con HTML, CSS y JavaScript puro. Las traducciones del portafolio principal se cargan desde archivos JSON en inglés, alemán y español; las traducciones de Workbench se mantienen internamente. La estructura es compatible con GitHub Pages.'
                    },
                    {
                        title: 'Mantenimiento',
                        body: 'El portafolio se mantiene como una plataforma estática y multilingüe, con revisiones periódicas del contenido, la accesibilidad y el diseño responsive. Las actualizaciones priorizan la claridad profesional, la veracidad científica y la coherencia entre el perfil principal y Workbench.'
                    }
                ],
                resources: [
                    { label: 'Perfil profesional publicado', href: '../' }
                ]
            },
            phage: {
                category: 'Nota de investigación · Hito', status: 'Completado', title: 'Bacteriofagoterapia',
                summary: 'Proyecto académico final realizado en coautoría que revisa la fagoterapia y plantea futuras preguntas de investigación.',
                problem: 'La resistencia antimicrobiana ha renovado el interés por los bacteriófagos, aunque su uso clínico todavía presenta limitaciones científicas, de fabricación y regulatorias.',
                contribution: 'Participación en la revisión bibliográfica, la redacción científica, la estructura del proyecto, el desarrollo conceptual y la preparación de la defensa, incluida la conexión futura entre fagoterapia, quitosano y preguntas biomédicas relacionadas con microplásticos. La coautoría se acredita de forma explícita.',
                result: 'Proyecto académico completado de 61 páginas y material de defensa. Es una revisión bibliográfica, no un estudio experimental ni clínico. La versión enlazada en español es el trabajo académico original.',
                next: 'Cualquier concepto original derivado de la revisión requiere validación experimental independiente y no debe presentarse como tratamiento demostrado.',
                disclosure: 'Nota de autoría: este proyecto fue realizado en coautoría con Luis Gonzalo Legua Pérez y se publica con permiso del coautor.',
                details: [
                    {
                        title: 'Alcance académico',
                        body: 'Bacteriophage Therapy: Rediscovering an Innovative Therapy es un trabajo académico final de revisión bibliográfica realizado en coautoría. La evidencia disponible es el trabajo escrito completado y el material de defensa; no se afirman resultados experimentales ni clínicos propios.'
                    },
                    {
                        title: 'Hipótesis interdisciplinar original',
                        body: 'Como contribución individual dentro del trabajo final colaborativo, se propone un futuro concepto de investigación que combina la especificidad de los bacteriófagos con la adsorción basada en quitosano. Los fagos no actuarían directamente sobre los polímeros plásticos. La secuenciación podría identificar microorganismos asociados a biopelículas sobre microplásticos y apoyar la selección o el diseño de fagos específicos, mientras que estudios controlados de laboratorio evaluarían si la desestabilización de biopelículas mejora la interacción, captura o evaluación analítica posterior de microplásticos. Esta hipótesis inicial requiere validación in vitro, evaluación de toxicidad, controles analíticos reproducibles y cautela clínica.'
                    },
                    {
                        title: 'Metodología de revisión',
                        body: 'Revisión bibliográfica académica estructurada: se evaluaron 75 artículos y se seleccionaron 51 mediante criterios explícitos de inclusión y selección. La búsqueda abarcó fuentes en español, inglés, portugués y ruso, entre ellas PubMed/NIH, ASM, JIDC, Google Académico y repositorios universitarios. El trabajo siguió siete fases, desde la búsqueda y el cribado hasta el análisis, la redacción y la escritura científica final.'
                    }
                ],
                resources: [
                    { label: 'Trabajo final original · Español', href: '../assets/documents/bacteriophage-therapy-final-project_ES.pdf' },
                    { label: 'Presentación de defensa original · Español · 17 diapositivas', href: '../assets/documents/bacteriophage-therapy-defense_ES.pdf' }
                ]
            },
            chitosan: {
                category: 'Nota de investigación · Concepto · AETEL 2025', status: 'Concepto', title: 'Aplicaciones médicas del quitosano: potencial para la captura de microplásticos y su estudio biomédico',
                summary: 'Propuesta conceptual informada por literatura, desarrollada y presentada internamente al centro para su consideración en el contexto de AETEL 2025. El centro finalmente priorizó otra propuesta, por lo que esta no avanzó al evento.',
                problem: 'Los microplásticos son una preocupación emergente para la salud, pero la exposición humana, su posible acumulación y su impacto clínico todavía requieren confirmación experimental cuidadosa.',
                contribution: 'Desarrollo original del concepto, formulación de hipótesis, metodología propuesta y comunicación científica. La contribución incluye las hipótesis de adsorción, diseño guiado por biopelículas, apoyo a la degradación y viabilidad biomédica, con alcance y limitaciones explícitos.',
                result: 'La madurez actual es exclusivamente conceptual. Los métodos propuestos incluyen secuenciación de biopelículas, perfilado microbiano mediante MiSeq, modificación de quitosano, caracterización por FTIR, ensayos de adsorción y pruebas de biocompatibilidad. No se ha realizado validación experimental.',
                next: 'La propuesta requiere validación in vitro, evaluación de toxicidad, controles robustos, métodos analíticos reproducibles, revisión científica independiente e interpretación prudente antes de cualquier interpretación biomédica o clínica. No afirma eficacia terapéutica demostrada.',
                disclosure: 'Nota de integridad científica: propuesta conceptual informada por literatura y sin validación experimental propia. Requiere validación in vitro, evaluación de toxicidad, controles robustos y métodos analíticos reproducibles antes de cualquier interpretación biomédica o clínica.',
                details: [
                    {
                        title: 'Idea central',
                        body: 'Explorar materiales basados en quitosano como candidatos para la adsorción, retención o estudio controlado de microplásticos en laboratorio, sin atribuirles eficacia terapéutica.'
                    },
                    {
                        title: 'Hipótesis de adsorción',
                        body: 'El quitosano modificado podría mostrar afinidad medible por determinadas superficies de microplásticos bajo condiciones controladas in vitro, permitiendo su retención y posterior evaluación analítica.'
                    },
                    {
                        title: 'Hipótesis de diseño guiado por biopelículas',
                        body: 'Los microorganismos asociados a biopelículas sobre microplásticos podrían aportar información biológica útil para seleccionar o diseñar materiales basados en quitosano con mayor especificidad.'
                    },
                    {
                        title: 'Hipótesis de apoyo a la degradación',
                        body: 'Si los complejos quitosano-microplástico pueden caracterizarse de forma reproducible, podrían explorarse estrategias enzimáticas o bioquímicas como futuros modelos de degradación de microplásticos, sin asumir eficacia clínica.'
                    },
                    {
                        title: 'Hipótesis de viabilidad biomédica',
                        body: 'Solo si se demuestran especificidad, estabilidad y biocompatibilidad in vitro, este concepto podría avanzar hacia futuros modelos de captura, retención o estudio biomédico.'
                    },
                    {
                        title: 'Métodos propuestos',
                        body: 'Secuenciación de biopelículas, perfilado microbiano mediante MiSeq, modificación de quitosano, caracterización por FTIR, ensayos de adsorción y pruebas de biocompatibilidad.'
                    },
                    {
                        title: 'Madurez del proyecto',
                        body: 'Propuesta conceptual. Requeriría validación in vitro, evaluación de toxicidad, controles y métodos analíticos reproducibles antes de cualquier interpretación clínica.'
                    }
                ]
            },
            laprincesa: {
                category: 'Prácticas de laboratorio', status: 'Completado', title: 'Prácticas en Laboratorio Clínico y Biomédico · La Princesa',
                summary: 'Prácticas de tres meses en laboratorio de investigación en Madrid, integrando trabajo con muestras clínicas y técnicas moleculares e inmunológicas.',
                context: 'Prácticas FCT en 2025 en la Fundación para la Investigación Biomédica del Hospital Universitario de La Princesa, Madrid, dentro del Servicio de Inmunología y el Laboratorio de Nutrición e Inflamación. El grupo estudia mecanismos celulares y moleculares de enfermedades inflamatorias y autoinmunes con muestras humanas y animales.',
                technicalWork: 'Apoyo diario en flujos de cultivo celular, procesamiento de muestras, biología molecular e inmunología siguiendo protocolos de laboratorio, junto con consulta de bases de datos científicas, gestión de material e inventario y desarrollo de una web científica bilingüe para el grupo de investigación. Mi papel evolucionó desde la participación como estudiante en prácticas hasta asumir una responsabilidad concreta dentro del flujo de cultivo celular: se me confió el manejo, mantenimiento y las rutinas relacionadas con las células, y se recurría a mí con frecuencia para apoyar procedimientos supervisados con muestras animales y flujos de biología molecular o inmunología. El trabajo supervisado reforzó la reproducibilidad, la interpretación de ensayos y el control de calidad mientras aumentaba la autonomía. Durante procedimientos supervisados con muestras animales, realicé personalmente la obtención/extracción de muestras murinas y su posterior manejo.',
                technicalEvidence: 'El alcance confirmado de las prácticas incluye suero, sangre periférica, células inmunitarias, líneas celulares y células primarias de rata; cultivos celulares estimulados por citocinas y líneas adherentes, incluidas HaCaT; técnica estéril, preparación de medios, pases y congelación; manejo de Buffy Coat y aislamiento CD4/CD14; muestras humanas en contextos de psoriasis, dermatitis e hidradenitis supurativa; muestras animales y órganos linfoides murinos; extracción de ARN, PCR, electroforesis y genotipado de ratones transgénicos; ELISA; preparación de geles de Western blot, transferencia y bloqueo; inmunohistoquímica e inmunofluorescencia. La duración y el contexto de las prácticas están documentados; una referencia profesional existente respalda el trabajo con protocolos y las responsabilidades sobre material de laboratorio.',
                technicalEvidenceLead: 'Mapa de evidencia: contexto de prácticas documentado, responsabilidades respaldadas por referencia y práctica supervisada confirmada personalmente.',
                technicalEvidenceGroups: [
                    { title: 'Procedencia de la evidencia', body: 'Las prácticas FCT y su contexto están documentados. Una referencia profesional existente respalda el trabajo con protocolos y las responsabilidades sobre material de laboratorio. El inventario técnico que sigue también incluye trabajo práctico supervisado confirmado personalmente para este portafolio; no debe interpretarse como si cada técnica enumerada apareciera de forma individual en la referencia.' },
                    { title: 'Cultivo celular y muestras', body: 'suero, sangre periférica, células inmunitarias, líneas celulares y células primarias de rata; cultivos estimulados por citocinas y líneas adherentes, incluidas HaCaT; técnica estéril, preparación de medios, pases y congelación; manejo de Buffy Coat y aislamiento CD4/CD14; muestras humanas en contextos de psoriasis, dermatitis e hidradenitis supurativa; muestras animales y órganos linfoides murinos' },
                    { title: 'Obtención de muestras animales', body: 'obtención/extracción de muestras murinas realizada personalmente, bajo supervisión y protocolos establecidos, y posterior manejo del material de origen animal' },
                    { title: 'Biología molecular', body: 'extracción de ARN, PCR, electroforesis y genotipado de ratones transgénicos; preparación de geles de Western blot, transferencia y bloqueo' },
                    { title: 'Inmunología', body: 'ELISA; inmunohistoquímica e inmunofluorescencia' },
                    { title: 'Protocolos, documentación y comunicación digital', body: 'trabajo con protocolos de laboratorio y bases de datos científicas; gestión de material e inventario; desarrollo de una web científica bilingüe para el grupo de investigación' },
                    { title: 'Base documental y privacidad', body: 'La documentación de apoyo se mantiene privada cuando su publicación expondría información personal, de terceros o confidencial del laboratorio. La redacción pública distingue por ello el respaldo documental de la práctica supervisada confirmada personalmente.' }
                ],
                disclosure: 'Nota de alcance: aquí se separan la evidencia documental de las prácticas, las responsabilidades respaldadas por referencia y el trabajo práctico supervisado confirmado personalmente. Se trata de experiencia de prácticas de laboratorio, no de una afirmación clínica independiente ni de un estudio terapéutico, y no se afirma ejercicio clínico, veterinario o quirúrgico independiente.'
            },
            celignis: {
                category: 'Prácticas de laboratorio', status: 'Completado', title: 'Prácticas en Laboratorio Analítico y de Biomasa · Celignis',
                summary: 'Prácticas Erasmus+ en Limerick orientadas a ensayos analíticos de biomasa, rutinas GLP y documentación técnica.',
                context: 'Prácticas Erasmus+ de 03/2023 a 05/2023 en Celignis Biomass Analysis Laboratory, Limerick, Irlanda, apoyando trabajo analítico para clientes y en el contexto de SteamBioAfrica y BIO4Africa.',
                technicalWork: 'Preparación de muestras y realización de flujos analíticos bajo rutinas GLP y conforme a SOP establecidos; operación, calibración, resolución de incidencias, mantenimiento y monitorización de equipos; creación de guías operativas, hojas de datos, instrucciones de trabajo y documentación de troubleshooting; responsabilidad progresiva sobre el análisis de materia volátil; y formación y supervisión de las personas que relevaron el puesto.',
                technicalEvidence: 'El alcance confirmado de las prácticas incluye humedad, cenizas, materia volátil, carbono fijo, análisis termogravimétrico (TGA), análisis elemental CHNOS, fusión de cenizas, BMP y biogás, FOS/TAC, ICP, DQO, amonio, NIR/VISION y filtración al vacío; operación de analizador CHNOS, TGA Q500, hornos CARBOLITE, unidades BMP y Biogas 5000; controles estadísticos internos de calidad; y registros en Thermal Excel, actualización de bases de datos, lotes, etiquetas y trazabilidad de resultados. La documentación operativa abarca métodos analíticos, inicio de análisis, batches, muestras/NIR, etiquetado, hojas de datos y troubleshooting de Thermal Excel. Las prácticas Erasmus+ están documentadas; una referencia profesional existente respalda las prácticas y sus responsabilidades operativas. Esta base permite seguir avanzando en validación de métodos, análisis de incertidumbre e interpretación cruzada de técnicas.',
                technicalEvidenceLead: 'Mapa de evidencia: prácticas Erasmus+ documentadas, responsabilidades respaldadas por referencia y alcance práctico confirmado.',
                technicalEvidenceGroups: [
                    { title: 'Procedencia de la evidencia', body: 'Las prácticas Erasmus+ y sus fechas están documentadas. Una referencia profesional existente respalda el trabajo analítico de las prácticas, la operación y resolución de incidencias de equipos, el trabajo bajo GLP, los autocontroles estadísticos de calidad y el relevo. El inventario técnico que sigue consolida la práctica confirmada de la estancia sin implicar que cada método o equipo enumerado figure individualmente en la referencia.' },
                    { title: 'Análisis', body: 'humedad, cenizas, materia volátil, carbono fijo, análisis termogravimétrico (TGA), análisis elemental CHNOS, fusión de cenizas, BMP y biogás, FOS/TAC, ICP, DQO, amonio, NIR/VISION y filtración al vacío' },
                    { title: 'Instrumentación', body: 'operación de analizador CHNOS, TGA Q500, hornos CARBOLITE, unidades BMP y Biogas 5000' },
                    { title: 'Calidad y trazabilidad', body: 'trabajo conforme a SOP establecidos, autocontroles estadísticos de calidad, registros en Thermal Excel, actualización de bases de datos, lotes, etiquetas y trazabilidad de resultados' },
                    { title: 'Documentación operativa creada', body: 'guías operativas, hojas de datos, instrucciones de trabajo y documentación de troubleshooting sobre métodos analíticos, inicio de análisis, batches, muestras y NIR, etiquetado, Thermal Excel y trazabilidad' },
                    { title: 'Responsabilidad y transferencia', body: 'responsabilidad progresiva sobre el flujo de materia volátil, incluida la formación de relevo y supervisión de las personas en prácticas que continuaron el puesto. Esta base permite seguir avanzando en validación de métodos, análisis de incertidumbre e interpretación cruzada de técnicas.' },
                    { title: 'Base documental y confidencialidad', body: 'El material operativo interno o relacionado con clientes no se republica; solo se muestra un resumen seguro para publicación. La redacción pública distingue los registros de las prácticas y el respaldo de la referencia del alcance práctico más amplio confirmado para el portafolio.' }
                ],
                disclosure: 'Nota de alcance: aquí se separan la evidencia documental de las prácticas, las responsabilidades respaldadas por referencia y la práctica analítica supervisada confirmada. No se republica material confidencial de clientes.'
            }
        },
        de: {
            deutschos: {
      category: 'Projekt · Technik & Lernen', status: 'Frühe Entwicklung / Pre-Release', title: 'LLC — Laboratory Language Companion',
      summary: 'Eine lokale, quelloffene Desktop-Lernumgebung für Sprachen, ausgerichtet auf Fachkräfte und Lernende in Labor- und Life-Science-Bereichen. Sie entstand aus DeutschOS, dessen funktionsfähige deutschbasierte Referenzimplementierung das Sprachenlernen in ein strukturiertes, überprüfbares und beruflich relevantes System überführt. Deutsch dient weiterhin als Referenzimplementierung, während die Architektur für mehrere Sprachen und wissenschaftliche Domänen verallgemeinert wird.',
      problem: 'Allgemeine Sprachlernwerkzeuge verbinden Alltagssprache, Laborwortschatz, wissenschaftliche Kommunikation, Motivation, strukturierte Lernquellen und langfristige Wiederholung nicht vollständig in einem kohärenten Arbeitsablauf. DeutschOS adressierte diesen Bedarf zunächst für Deutsch; LLC erweitert denselben Ansatz in Richtung wiederverwendbarer Sprach- und Wissenschaftsdomänen.',
      contribution: 'Festlegung von Lernzielen, funktionalen Anforderungen, Inhaltshierarchie, Korrekturmodell, Workflow zur bestätigten Speicherung und Produktentscheidungen. Der aktuelle Übergang umfasst außerdem die Definition einer sprachunabhängigen Architektur und die Strukturierung wissenschaftlicher bzw. laborbezogener Domänen. Die Programmierung ist KI-unterstützt.',
      result: 'Ein funktionsfähiges deutschbasiertes lokales System existiert und wird in größeren funktionalen Blöcken weiterentwickelt. Der ursprüngliche DeutschOS-Code wird in LLC überführt, ein quelloffenes Projekt in früher Entwicklung / Pre-Release. Es dient als Nachweis für Produktdenken und angewandtes Lerndesign, ist aber noch kein fertiges mehrsprachiges Produkt.',
      next: 'Tests, Inhaltsvalidierung und Usability-Prüfung fortsetzen; die bestehende deutsche Erfahrung bewahren und gleichzeitig sprachunabhängige Funktionen von deutschspezifischem Verhalten trennen; die Grenzen zwischen privaten Lerndaten und öffentlichem Code beibehalten; und die Architektur mit einer zweiten Sprache validieren, bevor LLC als ausgereiftes mehrsprachiges System präsentiert wird.',
      disclosure: 'KI-Einsatz: Unterstützung bei technischer Umsetzung und redaktioneller Überarbeitung. Konzept, Anforderungen, Inhalte, Tests und abschließende Entscheidungen definiere ich selbst.',
      details: [
          {
              title: 'Ursprung und Umfang',
              body: 'LLC begann als DeutschOS, eine persönliche Plattform zum Deutschlernen. Deutsch bleibt die erste und am weitesten entwickelte Referenzimplementierung. Das breitere Projekt verbindet allgemeines Sprachenlernen mit beruflicher und wissenschaftlicher Kommunikation für Labor-, biomedizinische und Life-Science-Umgebungen; langfristig sollen Sprache und berufliche Domäne getrennt modelliert werden.'
          },
          {
              title: 'Local-first-Architektur',
              body: 'Das aktuelle System nutzt FastAPI, Next.js, einen nativen macOS-Controller in Swift, SQLite, LM Studio und lokale Embedding-Modelle. Der KI-Tutor läuft lokal. Die quellenorientierte Lernbibliothek umfasst Infrastruktur für Dokumentenimport und -versionierung, Seitenvergleich, OCR-bezogene Workflows, strukturierte Extraktion, Prüfung, Verarbeitungsläufe, Quellenabdeckung, Audits und Abfragen der Lernbibliothek. Private Lernmaterialien bleiben außerhalb des öffentlichen Repositories.'
          },
          {
              title: 'Aktueller Übergang und Validierung',
              body: 'Die öffentliche Entwicklungsphase konzentriert sich auf die sichere Veröffentlichung des bestehenden Codes, den Erhalt der Git-Historie, die Trennung privater Lernmaterialien vom öffentlichen Code, den Übergang der Produktidentität von DeutschOS zu LLC, eine sprachunabhängige Architektur, den Erhalt der deutschen Erfahrung und die Vorbereitung künftiger wissenschaftlicher Sprachpfade. Eine spätere zweite Sprachimplementierung soll prüfen, ob die Architektur tatsächlich sprachunabhängig ist.'
          }
      ],
      resources: [
          { label: 'Öffentliches LLC-Repository', href: 'https://github.com/Cuenca-john1999/laboratory-language-companion' }
      ]
  },
            portfolio: {
                category: 'Projekt · Meilenstein', status: 'Funktionsfähig', title: 'Wissenschaftliches Portfolio',
                summary: 'Eine mehrsprachige statische Website, die ein Laborprofil klar für Recruiter und wissenschaftliche Teams vermittelt.',
                problem: 'Spanische Berufsabschlüsse sowie klinische, biomedizinische und analytische Erfahrung müssen im internationalen Kontext sorgfältig erklärt werden.',
                contribution: 'Verantwortung für berufliche Inhalte, Veröffentlichungsentscheidungen, funktionale Anforderungen, die Prüfung von Formulierungen und wissenschaftlichen Aussagen, Website-Tests sowie Produkt- und Designentscheidungen.',
                result: 'Die Website ist über GitHub Pages veröffentlicht, unterstützt Englisch, Deutsch und Spanisch und bietet zugängliche professionelle Bereiche.',
                next: 'Die nächsten Schritte sind die weitere Ausarbeitung der Trennung zwischen Berufsprofil und Workbench, eine bessere Inhaltspflege sowie fortlaufende Prüfungen der Barrierefreiheit und des responsiven Layouts.',
                disclosure: 'KI-Einsatz: Unterstützung bei technischer Umsetzung und redaktioneller Überarbeitung. Konzept, Anforderungen, Inhalte, Tests und abschließende Entscheidungen definiere ich selbst.',
                details: [
                    {
                        title: 'Zweck',
                        body: 'Mein Berufsprofil, meine Erfahrung und meine öffentlichen beruflichen Unterlagen darstellen; die Workbench als getrennten Raum für Projekte, Notizen und angewandtes Lernen führen; und wissenschaftliche Inhalte durch eine klare Trennung von Evidenz, Interpretation und Hypothesen kommunizieren.'
                    },
                    {
                        title: 'Architektur',
                        body: 'Statische Website ohne Backend, umgesetzt mit HTML, CSS und Vanilla JavaScript. Die Übersetzungen des Hauptportfolios werden aus JSON-Dateien auf Englisch, Deutsch und Spanisch geladen; die Workbench-Übersetzungen werden intern gepflegt. Die Struktur ist mit GitHub Pages kompatibel.'
                    },
                    {
                        title: 'Pflege und Weiterentwicklung',
                        body: 'Das Portfolio wird als statische, mehrsprachige Plattform gepflegt. Inhalte, Barrierefreiheit und responsives Design werden regelmäßig überprüft. Aktualisierungen priorisieren berufliche Klarheit, wissenschaftliche Verlässlichkeit und die Kohärenz zwischen dem Hauptprofil und Workbench.'
                    }
                ],
                resources: [
                    { label: 'Veröffentlichtes Berufsprofil', href: '../' }
                ]
            },
            phage: {
                category: 'Forschungsnotiz · Meilenstein', status: 'Abgeschlossen', title: 'Bakteriophagentherapie',
                summary: 'Eine gemeinsam verfasste Abschlussarbeit mit Literaturübersicht zur Phagentherapie und zukünftigen Forschungsfragen.',
                problem: 'Antimikrobielle Resistenz hat das Interesse an Bakteriophagen erneuert, doch die klinische Anwendung unterliegt weiterhin wissenschaftlichen, herstellungsbezogenen und regulatorischen Grenzen.',
                contribution: 'Mitwirkung an Literaturrecherche, wissenschaftlichem Schreiben, Projektstruktur, konzeptioneller Entwicklung und Vorbereitung der Verteidigung, einschließlich der zukunftsorientierten Verbindung zwischen Phagentherapie, Chitosan und biomedizinischen Fragen zu Mikroplastik. Die gemeinsame Urheberschaft wird klar ausgewiesen.',
                result: 'Eine abgeschlossene 61-seitige akademische Arbeit mit Verteidigungsmaterial. Es handelt sich um eine Literaturübersicht, nicht um eine experimentelle oder klinische Studie. Die verlinkte deutsche PDF-Fassung ist eine inoffizielle Übersetzung/Adaption und keine beglaubigte oder beeidigte Übersetzung; das akademische Original ist die spanische Fassung.',
                next: 'Aus der Übersicht abgeleitete neue Konzepte benötigen eine separate experimentelle Validierung und dürfen nicht als nachgewiesene Behandlung dargestellt werden.',
                disclosure: 'Urheberschaft: Dieses Projekt wurde gemeinsam mit Luis Gonzalo Legua Pérez verfasst und mit Zustimmung des Mitautors veröffentlicht.',
                details: [
                    {
                        title: 'Akademischer Umfang',
                        body: 'Bacteriophage Therapy: Rediscovering an Innovative Therapy ist eine gemeinsam verfasste akademische Abschlussarbeit in Form einer Literaturübersicht. Die verfügbare Evidenz besteht aus der abgeschlossenen schriftlichen Arbeit und dem Verteidigungsmaterial; eigene experimentelle oder klinische Ergebnisse werden nicht beansprucht.'
                    },
                    {
                        title: 'Ursprüngliche interdisziplinäre Hypothese',
                        body: 'Als individueller Beitrag innerhalb der gemeinsamen Abschlussarbeit wird ein zukünftiges Forschungskonzept vorgeschlagen, das die Spezifität von Bakteriophagen mit chitosanbasierter Adsorption verbindet. Phagen würden nicht direkt auf Kunststoffpolymere wirken. Sequenzierung könnte Mikroorganismen identifizieren, die mit Mikroplastik-Biofilmen verbunden sind, und die Auswahl oder Entwicklung spezifischer Phagen unterstützen. Kontrollierte Laborstudien würden prüfen, ob eine Destabilisierung der Biofilme die Interaktion, Aufnahme oder spätere analytische Bewertung von Mikroplastik verbessert. Diese frühe Hypothese erfordert In-vitro-Validierung, Toxizitätsbewertung, reproduzierbare analytische Kontrollen und klinische Vorsicht.'
                    },
                    {
                        title: 'Methodik der Literaturübersicht',
                        body: 'Strukturierte akademische Literaturübersicht: 75 Artikel wurden bewertet und 51 anhand ausdrücklich festgelegter Einbeziehungs- und Auswahlkriterien ausgewählt. Die Recherche umfasste spanische, englische, portugiesische und russische Quellen, darunter PubMed/NIH, ASM, JIDC, Google Scholar und Hochschulrepositorien. Die Arbeit folgte sieben Phasen von Recherche und Screening über Analyse und Entwurf bis zur wissenschaftlichen Endredaktion.'
                    }
                ],
                resources: [
                    { label: 'Abschlussarbeit · Inoffizielle deutsche Übersetzung', href: '../assets/documents/bacteriophage-therapy-final-project_DE.pdf' },
                    { label: 'Verteidigungspräsentation · Inoffizielle deutsche Übersetzung · 17 Folien · Original: Spanisch', href: '../assets/documents/bacteriophage-therapy-defense_DE.pdf' }
                ]
            },
            chitosan: {
                category: 'Forschungsnotiz · Konzept · AETEL 2025', status: 'Konzept', title: 'Medizinische Anwendungen von Chitosan: Potenzial zur Mikroplastikbindung und biomedizinischen Untersuchung',
                summary: 'Literaturgestützter Konzeptvorschlag, der entwickelt und intern beim Ausbildungszentrum zur Prüfung im Kontext AETEL 2025 eingereicht wurde. Das Zentrum priorisierte schließlich einen anderen Beitrag; dieser Vorschlag gelangte daher nicht zur Veranstaltung.',
                problem: 'Mikroplastik ist ein aufkommendes Gesundheitsthema, aber menschliche Exposition, mögliche Akkumulation und klinische Auswirkungen erfordern weiterhin sorgfältige experimentelle Bestätigung.',
                contribution: 'Originale Konzeptentwicklung, Hypothesenformulierung, vorgeschlagene Methodik und wissenschaftliche Kommunikation. Der Beitrag umfasst die Adsorptionshypothese, die biofilm-geleitete Designhypothese, die Hypothese zur Unterstützung des Abbaus und die Hypothese zur biomedizinischen Machbarkeit mit ausdrücklich benanntem Umfang und Grenzen.',
                result: 'Der aktuelle Reifegrad ist rein konzeptionell. Zu den vorgeschlagenen Methoden gehören Biofilm-Sequenzierung, MiSeq-basierte mikrobielle Profilierung, Chitosanmodifikation, FTIR-Charakterisierung, Adsorptionsassays und Biokompatibilitätstests. Es wurde keine experimentelle Validierung durchgeführt.',
                next: 'Der Vorschlag erfordert In-vitro-Validierung, Toxizitätsbewertung, robuste Kontrollen, reproduzierbare analytische Methoden, unabhängige wissenschaftliche Prüfung und vorsichtige Interpretation vor jeder biomedizinischen oder klinischen Deutung. Er beansprucht keine nachgewiesene therapeutische Wirksamkeit.',
                disclosure: 'Hinweis zur wissenschaftlichen Integrität: literaturgestützter Konzeptvorschlag ohne eigene experimentelle Validierung. Vor jeder biomedizinischen oder klinischen Interpretation sind In-vitro-Validierung, Toxizitätsbewertung, robuste Kontrollen und reproduzierbare analytische Methoden erforderlich.',
                details: [
                    {
                        title: 'Zentrale Idee',
                        body: 'Chitosanbasierte Materialien als Kandidaten für Adsorption, Retention oder kontrollierte Laboruntersuchung von Mikroplastik erforschen, ohne therapeutische Wirksamkeit zu behaupten.'
                    },
                    {
                        title: 'Adsorptionshypothese',
                        body: 'Modifiziertes Chitosan könnte unter kontrollierten In-vitro-Bedingungen eine messbare Affinität zu ausgewählten Mikroplastikoberflächen zeigen und so Retention und spätere analytische Bewertung unterstützen.'
                    },
                    {
                        title: 'Biofilm-geleitete Designhypothese',
                        body: 'Mikroorganismen in mikroplastikassoziierten Biofilmen könnten nützliche biologische Informationen für die Auswahl oder Gestaltung spezifischerer chitosanbasierter Materialien liefern.'
                    },
                    {
                        title: 'Hypothese zur Unterstützung des Abbaus',
                        body: 'Wenn Chitosan-Mikroplastik-Komplexe reproduzierbar charakterisiert werden können, könnten enzymatische oder biochemische Strategien als zukünftige Modelle für Mikroplastikabbau untersucht werden, ohne klinische Wirksamkeit anzunehmen.'
                    },
                    {
                        title: 'Hypothese zur biomedizinischen Machbarkeit',
                        body: 'Nur wenn Spezifität, Stabilität und Biokompatibilität in vitro gezeigt werden, könnte dieses Konzept in Richtung zukünftiger biomedizinischer Erfassungs-, Retentions- oder Untersuchungsmodelle weiterentwickelt werden.'
                    },
                    {
                        title: 'Vorgeschlagene Methoden',
                        body: 'Biofilm-Sequenzierung, MiSeq-basierte mikrobielle Profilierung, Chitosanmodifikation, FTIR-Charakterisierung, Adsorptionsassays und Biokompatibilitätstests.'
                    },
                    {
                        title: 'Projekt-Reifegrad',
                        body: 'Nur ein konzeptioneller Vorschlag. Vor jeder klinischen Interpretation wären In-vitro-Validierung, Toxizitätsbewertung, Kontrollen und reproduzierbare analytische Methoden erforderlich.'
                    }
                ]
            },
            laprincesa: {
                category: 'Laborpraktikum', status: 'Abgeschlossen', title: 'Praktikum im klinisch-biomedizinischen Labor · La Princesa',
                summary: 'Dreimonatiges Praktikum in einem Forschungslabor in Madrid mit Verbindung von klinischen Probenabläufen sowie molekularen und immunologischen Techniken.',
                context: 'FCT-Praktikum im Jahr 2025 bei der Fundación para la Investigación Biomédica del Hospital Universitario de La Princesa in Madrid, im Immunologiedienst und im Labor für Ernährung und Entzündung. Die Gruppe untersucht zelluläre und molekulare Mechanismen entzündlicher und autoimmuner Erkrankungen anhand humaner und tierischer Proben.',
                technicalWork: 'Mitarbeit bei täglichen Abläufen in Zellkultur, Probenverarbeitung, Molekularbiologie und Immunologie nach Laborprotokollen sowie Arbeit mit wissenschaftlichen Datenbanken, Material- und Bestandsverwaltung und Entwicklung einer zweisprachigen wissenschaftlichen Website für die Forschungsgruppe. Meine Rolle entwickelte sich von der Mitarbeit als Praktikant zu einer konkreten Verantwortung im Zellkultur-Workflow: Mir wurden Zellhandhabung, Pflege und damit verbundene Routinen anvertraut; außerdem wurde ich regelmäßig zur Unterstützung bei beaufsichtigten Verfahren mit Tierproben sowie bei molekularbiologischen und immunologischen Abläufen hinzugezogen. Die angeleitete Tätigkeit stärkte Reproduzierbarkeit, Assay-Interpretation und Qualitätskontrolle bei wachsender Eigenständigkeit. Bei beaufsichtigten Verfahren mit Tierproben führte ich die Gewinnung/Entnahme muriner Proben persönlich durch und übernahm anschließend deren Handhabung.',
                technicalEvidence: 'Der bestätigte Umfang des Praktikums umfasst Serum, peripheres Blut, Immunzellen, Zelllinien und primäre Rattenzellen; mit Zytokinen stimulierte und adhärente Zellkulturen einschließlich HaCaT; steriles Arbeiten, Medienvorbereitung, Passagieren und Einfrieren; Buffy-Coat-Verarbeitung und CD4/CD14-Isolierung; humane Proben im Kontext von Psoriasis, Dermatitis und Hidradenitis suppurativa; tierische Proben und murine lymphatische Organe; RNA-Extraktion, PCR, Elektrophorese und Genotypisierung transgener Mäuse; ELISA; Western-Blot-Gelherstellung, Transfer und Blocking; Immunhistochemie und Immunfluoreszenz. Dauer und Kontext des Praktikums sind dokumentiert; eine vorhandene berufliche Referenz stützt die Protokollarbeit und die Verantwortung für Labormaterial.',
                technicalEvidenceLead: 'Nachweismatrix: dokumentierter Praktikumskontext, durch Referenz gestützte Verantwortlichkeiten und persönlich bestätigte beaufsichtigte Praxis.',
                technicalEvidenceGroups: [
                    { title: 'Nachweisgrundlage', body: 'Das FCT-Praktikum und sein Kontext sind dokumentiert. Eine vorhandene berufliche Referenz stützt die Protokollarbeit und die Verantwortung für Labormaterial. Das folgende technische Inventar umfasst zusätzlich beaufsichtigte praktische Tätigkeiten, die für dieses Portfolio persönlich bestätigt wurden; es ist nicht so zu verstehen, als wäre jede aufgeführte Technik einzeln in der Referenz genannt.' },
                    { title: 'Zellkultur & Proben', body: 'Serum, peripheres Blut, Immunzellen, Zelllinien und primäre Rattenzellen; mit Zytokinen stimulierte und adhärente Zellkulturen einschließlich HaCaT; steriles Arbeiten, Medienvorbereitung, Passagieren und Einfrieren; Buffy-Coat-Verarbeitung und CD4/CD14-Isolierung; humane Proben im Kontext von Psoriasis, Dermatitis und Hidradenitis suppurativa; tierische Proben und murine lymphatische Organe' },
                    { title: 'Entnahme tierischer Proben', body: 'persönlich unter Aufsicht und nach festgelegten Protokollen durchgeführte Gewinnung/Entnahme muriner Proben sowie anschließende Handhabung tierischen Materials' },
                    { title: 'Molekularbiologie', body: 'RNA-Extraktion, PCR, Elektrophorese und Genotypisierung transgener Mäuse; Western-Blot-Gelherstellung, Transfer und Blocking' },
                    { title: 'Immunologie', body: 'ELISA; Immunhistochemie und Immunfluoreszenz' },
                    { title: 'Protokolle, Dokumentation & digitale Kommunikation', body: 'Arbeit mit Laborprotokollen und wissenschaftlichen Datenbanken; Material- und Bestandsverwaltung; Entwicklung einer zweisprachigen wissenschaftlichen Website für die Forschungsgruppe' },
                    { title: 'Dokumentarische Grundlage & Datenschutz', body: 'Unterstützende Unterlagen bleiben privat, wenn eine Veröffentlichung personenbezogene, fremde oder vertrauliche Laborinformationen offenlegen würde. Die öffentliche Darstellung trennt deshalb dokumentarische Unterstützung von persönlich bestätigter beaufsichtigter Praxis.' }
                ],
                disclosure: 'Hinweis zum Umfang: dokumentierte Praktikumsnachweise, durch Referenz gestützte Verantwortlichkeiten und persönlich bestätigte beaufsichtigte Praxis werden hier getrennt dargestellt. Es handelt sich um Laborpraktikumserfahrung, nicht um einen eigenständigen klinischen Wirksamkeitsnachweis oder eine therapeutische Studie; ebenso wird keine eigenständige klinische, tierärztliche oder chirurgische Tätigkeit beansprucht.'
            },
            celignis: {
                category: 'Laborpraktikum', status: 'Abgeschlossen', title: 'Praktikum im analytischen Biomasse-Labor · Celignis',
                summary: 'Erasmus+-Praktikum in Limerick mit Fokus auf analytische Biomasseprüfungen, GLP-Routinen und technische Dokumentation.',
                context: 'Erasmus+-Praktikum von 03/2023 bis 05/2023 bei Celignis Biomass Analysis Laboratory in Limerick, Irland, mit Unterstützung analytischer Kundenarbeit sowie im Kontext von SteamBioAfrica und BIO4Africa.',
                technicalWork: 'Probenvorbereitung und Durchführung analytischer Abläufe nach GLP-orientierten Routinen und festgelegten SOPs; Bedienung, Kalibrierung, Fehleranalyse, Wartung und Überwachung von Geräten; Erstellung operativer Leitfäden, Datenblätter, Arbeitsanweisungen und Troubleshooting-Dokumentation; schrittweise Verantwortung für die Analyse flüchtiger Bestandteile; sowie Einarbeitung und Betreuung nachfolgender Praktikantinnen und Praktikanten.',
                technicalEvidence: 'Der bestätigte Umfang des Praktikums umfasst Feuchte, Asche, flüchtige Bestandteile, Fixkohlenstoff, thermogravimetrische Analyse (TGA), CHNOS-Elementaranalyse, Ascheschmelze, BMP und Biogas, FOS/TAC, ICP, CSB, Ammonium, NIR/VISION und Vakuumfiltration; Bedienung von CHNOS-Analysator, TGA Q500, CARBOLITE-Öfen, BMP-Einheiten und Biogas 5000; interne statistische Qualitätskontrollen; sowie Thermal-Excel-Datensätze, Datenbankaktualisierungen, Chargen, Etiketten und Ergebnisrückverfolgbarkeit. Die operative Dokumentation umfasst Analysemethoden, Analysestart, Chargen, Proben/NIR, Etikettierung, Datenblätter und Thermal-Excel-Troubleshooting. Das Erasmus+-Praktikum ist dokumentiert; eine vorhandene berufliche Referenz stützt das Praktikum und seine operativen Verantwortlichkeiten. Diese Grundlage unterstützt die weitere Entwicklung in Methodenvalidierung, Unsicherheitsanalyse und methodenübergreifender Interpretation.',
                technicalEvidenceLead: 'Nachweismatrix: dokumentiertes Erasmus+-Praktikum, durch Referenz gestützte Verantwortlichkeiten und bestätigter praktischer Umfang.',
                technicalEvidenceGroups: [
                    { title: 'Nachweisgrundlage', body: 'Das Erasmus+-Praktikum und seine Daten sind dokumentiert. Eine vorhandene berufliche Referenz stützt die analytische Praktikumstätigkeit, Gerätebedienung und Fehleranalyse, GLP-Praxis, statistische Qualitäts-Selbstkontrollen und die Übergabe. Das folgende technische Inventar fasst den bestätigten praktischen Umfang zusammen, ohne zu unterstellen, dass jede aufgeführte Methode oder jedes Gerät einzeln in der Referenz genannt ist.' },
                    { title: 'Analysen', body: 'Feuchte, Asche, flüchtige Bestandteile, Fixkohlenstoff, thermogravimetrische Analyse (TGA), CHNOS-Elementaranalyse, Ascheschmelze, BMP und Biogas, FOS/TAC, ICP, CSB, Ammonium, NIR/VISION und Vakuumfiltration' },
                    { title: 'Instrumentierung', body: 'Bedienung von CHNOS-Analysator, TGA Q500, CARBOLITE-Öfen, BMP-Einheiten und Biogas 5000' },
                    { title: 'Qualität & Rückverfolgbarkeit', body: 'Arbeit nach festgelegten SOPs, statistische Qualitäts-Selbstkontrollen, Thermal-Excel-Datensätze, Datenbankaktualisierungen, Chargen, Etiketten und Ergebnisrückverfolgbarkeit' },
                    { title: 'Erstellte operative Dokumentation', body: 'operative Leitfäden, Datenblätter, Arbeitsanweisungen und Troubleshooting-Dokumentation zu Analysemethoden, Analysestart, Chargen, Proben und NIR, Etikettierung, Thermal Excel und Rückverfolgbarkeit' },
                    { title: 'Verantwortung & Übergabe', body: 'schrittweise Verantwortung für den Workflow der Bestimmung flüchtiger Bestandteile, einschließlich Einarbeitung und Betreuung der nachfolgenden Praktikantinnen und Praktikanten. Diese Grundlage unterstützt die weitere Entwicklung in Methodenvalidierung, Unsicherheitsanalyse und methodenübergreifender Interpretation.' },
                    { title: 'Dokumentarische Grundlage & Vertraulichkeit', body: 'Internes oder kundenbezogenes Arbeitsmaterial wird nicht erneut veröffentlicht; gezeigt wird nur eine veröffentlichungssichere Zusammenfassung. Die öffentliche Darstellung trennt Praktikumsnachweise und Referenzunterstützung vom weiter gefassten, für das Portfolio bestätigten praktischen Umfang.' }
                ],
                disclosure: 'Hinweis zum Umfang: dokumentierte Praktikumsnachweise, durch Referenz gestützte Verantwortlichkeiten und bestätigte beaufsichtigte analytische Praxis werden hier getrennt dargestellt. Vertrauliches Kundenmaterial wird nicht erneut veröffentlicht.'
            }
        }
    };

    window.WorkbenchData = Object.freeze({ translations, entryData });
})();
