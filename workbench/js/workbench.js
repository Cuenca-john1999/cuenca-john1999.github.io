(() => {
    'use strict';

    const STORAGE_KEY = 'portfolio-language';
    const DEFAULT_LANGUAGE = 'en';
    const LANGUAGES = ['en', 'de', 'es'];

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
                openDeutschosEntry: 'Open DeutschOS entry',
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
                focusValue: 'DeutschOS and portfolio development', aiLabel: 'AI disclosure',
                aiValue: 'AI supports technical implementation, content organisation and editorial review, while Jhon M. Cuenca leads objectives, requirements, content, testing and final approval.'
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
                    summary: 'A local German-learning system designed around general language, laboratory contexts, structured practice and verified memory.',
                    contribution: 'Concept, requirements, learning structure, content review, testing and product decisions.',
                    evidence: 'Working local prototype under active development.',
                    tagLanguage: 'Language learning', tagLaboratory: 'Laboratory German'
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
                    summary: 'AETEL 2025 literature-informed concept proposal on modified chitosan and microplastics for future biomedical or analytical study.',
                    contribution: 'Concept development, testable hypotheses, scientific framing and explicit validation limits.',
                    evidence: 'No experimental validation performed; the proposal remains conceptual and requires in vitro validation.',
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
                learningItem1: 'DeutschOS · Local prototype in development',
                learningItem2: 'Scientific Portfolio · Published multilingual delivery',
                learningItem3: 'La Princesa · Clinical and biomedical laboratory placement',
                learningItem4: 'Celignis · Analytical and biomass laboratory placement',
                milestones: 'Milestones',
                milestonesBody: 'Documented progress points with direct evidence.',
                milestonesItem1: 'Portfolio publication on GitHub Pages',
                milestonesItem2: 'Completed academic bacteriophage literature review'
            },
            entriesData: {
                deutschos: 'Local German-learning environment focused on usable progress, laboratory vocabulary and transparent correction.',
                portfolio: 'Published multilingual portfolio for recruiters, laboratories and scientific collaborators.',
                laprincesa: 'Three-month hospital research placement with applied immunology, molecular biology and sample-processing workflows.',
                celignis: 'Erasmus+ laboratory placement in Ireland with analytical workflows, GLP routines and technical documentation.',
                phage: 'Co-authored academic literature review on phage therapy, its applications, limitations and regulatory barriers.',
                chitosan: 'Early-stage, literature-informed hypothesis proposed for future controlled laboratory validation.'
            },
            professionalContext: {
                development: {
                    kicker: 'Current Development',
                    title: 'Continuing professional development while preparing for laboratory opportunities.',
                    body: 'Alongside applications for laboratory-related, clinical research support and biomedical science roles, I am continuing German language certification preparation, scientific portfolio development and literature review in areas connected to my research interests.',
                    pointGerman: 'German language certification preparation',
                    pointPortfolio: 'Scientific portfolio development',
                    pointLiterature: 'Biomedical literature review: phage therapy, biomaterials and microplastics'
                },
                references: {
                    kicker: 'References',
                    title: 'Professional and academic references can support the laboratory experience shown here.',
                    body: 'References from academic training, research practice and international laboratory experience can be provided according to the opportunity and recruitment process.',
                    pointClinical: 'Clinical and biomedical laboratory training',
                    pointResearch: 'Research foundation practice · Madrid',
                    pointErasmus: 'Erasmus+ analytical laboratory practice · Ireland'
                },
                referenceCards: {
                    research: {
                        title: 'Research Laboratory Reference',
                        body: 'Dr. Danay Cibrián Vera, Principal Investigator at the Immunology Service of Hospital Universitario de La Princesa, recommends Jhon after a three-month laboratory placement involving RNA extraction, PCR, electrophoresis, genotyping, biological sample processing, cell culture, staining techniques, protocol design and laboratory material management.'
                    },
                    academic: {
                        title: 'Academic Reference',
                        body: 'Tamara Díaz Jáuregui, biology teacher at CEAC FP Madrid, recommends Jhon for his technical ability, dedication, precision, problem-solving, fast learning, communication and strong sense of responsibility.'
                    },
                    international: {
                        title: 'International Laboratory Reference',
                        body: 'Cristobal Fernandez Belmonte M.Sc., Lab Manager at Celignis Biomass Analysis Laboratory in Limerick, Ireland, recommends Jhon after his internship supporting biomass analyses, instrument operation, GLP workflows, quality controls, sample preparation, teamwork and intern handover training.'
                    }
                }
            },
            principles: {
                kicker: 'Documentation approach', title: 'Documenting the work, not just displaying the result.',
                intro: 'An entry belongs here only when it demonstrates a real question, contribution, result or learning outcome.',
                authorship: { title: 'Clear authorship', body: 'Decisions, contributions, reviews and tests are identified explicitly.' },
                evidence: { title: 'Evidence before claims', body: 'Published evidence, interpretation, hypotheses and experimental results are kept separate.' },
                limitations: { title: 'Visible limitations', body: 'Unresolved questions, missing validation and technical constraints remain part of the entry.' },
                ai: { title: 'Transparent AI use', body: 'AI has been used as a supporting tool for technical implementation, content organisation and editorial review of the portfolio. Jhon M. Cuenca defines the objectives, requirements, content, product decisions, testing and final approval.' }
            },
            footer: { copyright: '© 2026 Jhon M. Cuenca. All rights reserved.', notice: 'JMC · Workbench documents selected projects, scientific notes and applied learning.', scientificNotice: 'Scientific notes distinguish published evidence, interpretation, hypotheses and limitations.' },
            dialog: {
                problem: 'Problem or motivation', contribution: 'Real contribution', result: 'Result or evidence',
                context: 'Context', technicalWork: 'Technical work / My role', technicalEvidence: 'Evidence & technical detail',
                next: 'Limitations and next steps', resources: 'Documents and sources', navigationLabel: 'Project page navigation',
                previous: 'Previous', nextEntry: 'Next', openOtherPage: 'Open this page',
                openPage2: 'Open page 2', backToPage1: 'Back to page 1',
                pageShortLabel: 'Page',
                openPageNamed: 'Open page {page} of {total}: {title}', pagePosition: '{current} / {total}',
                pageChanged: 'Page {current} of {total}: {title}', overview: 'Project overview',
                evidenceHeading: 'Contribution, evidence and next work', expanded: 'Expanded project record',
                portfolioDetails: 'Purpose, architecture and maintenance', academicContext: 'Academic context and documentation',
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
                openDeutschosEntry: 'Abrir entrada de DeutschOS',
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
                focusValue: 'Desarrollo de DeutschOS y del portafolio', aiLabel: 'Transparencia sobre IA',
                aiValue: 'La IA apoya la implementación técnica, la organización de contenidos y la revisión editorial, mientras Jhon M. Cuenca define objetivos, requisitos, contenido, pruebas y aprobación final.'
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
                    summary: 'Un sistema local para aprender alemán diseñado en torno al idioma general, el contexto de laboratorio, la práctica estructurada y la memoria verificada.',
                    contribution: 'Concepto, requisitos, estructura de aprendizaje, revisión de contenido, pruebas y decisiones de producto.',
                    evidence: 'Prototipo local funcional actualmente en desarrollo.',
                    tagLanguage: 'Aprendizaje de idiomas', tagLaboratory: 'Alemán de laboratorio'
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
                    summary: 'Propuesta conceptual de AETEL 2025, informada por literatura, sobre quitosano modificado y microplásticos para futuros estudios biomédicos o analíticos.',
                    contribution: 'Desarrollo del concepto, hipótesis comprobables, encuadre científico y límites de validación explícitos.',
                    evidence: 'No se ha realizado validación experimental; la propuesta sigue en fase conceptual y requiere validación in vitro.',
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
                learningItem1: 'DeutschOS · Prototipo local en desarrollo',
                learningItem2: 'Portafolio científico · Entrega multilingüe publicada',
                learningItem3: 'La Princesa · Prácticas en laboratorio clínico y biomédico',
                learningItem4: 'Celignis · Prácticas en laboratorio analítico y de biomasa',
                milestones: 'Hitos',
                milestonesBody: 'Avances documentados con evidencia directa.',
                milestonesItem1: 'Publicación del portafolio en GitHub Pages',
                milestonesItem2: 'Revisión académica completada sobre bacteriofagoterapia'
            },
            entriesData: {
                deutschos: 'Entorno local de aprendizaje de alemán centrado en progreso útil, vocabulario de laboratorio y corrección transparente.',
                portfolio: 'Portafolio multilingüe publicado para reclutadores, laboratorios y colaboradores científicos.',
                laprincesa: 'Prácticas hospitalarias de tres meses con aplicación de flujos de inmunología, biología molecular y procesamiento de muestras.',
                celignis: 'Prácticas Erasmus+ en Irlanda con flujos analíticos, rutinas GLP y documentación técnica.',
                phage: 'Revisión académica realizada en coautoría sobre la fagoterapia, sus aplicaciones, limitaciones y barreras regulatorias.',
                chitosan: 'Hipótesis preliminar basada en literatura y propuesta para una futura validación controlada en laboratorio.'
            },
            professionalContext: {
                development: {
                    kicker: 'Desarrollo actual',
                    title: 'Desarrollo profesional continuo mientras preparo oportunidades de laboratorio.',
                    body: 'Junto con la búsqueda de oportunidades relacionadas con laboratorio, apoyo a investigación clínica y ciencia biomédica, continúo con la preparación de certificación de alemán, el desarrollo del portfolio científico y la revisión de literatura relacionada con mis áreas de interés.',
                    pointGerman: 'Preparación de certificación de alemán',
                    pointPortfolio: 'Desarrollo del portfolio científico',
                    pointLiterature: 'Revisión de literatura biomédica: fagoterapia, biomateriales y microplásticos'
                },
                references: {
                    kicker: 'Referencias',
                    title: 'Referencias profesionales y académicas que respaldan la experiencia de laboratorio presentada aquí.',
                    body: 'Las referencias de formación académica, prácticas de investigación y experiencia internacional en laboratorio pueden facilitarse según la oportunidad y el proceso de selección.',
                    pointClinical: 'Formación en laboratorio clínico y biomédico',
                    pointResearch: 'Prácticas en fundación de investigación · Madrid',
                    pointErasmus: 'Prácticas Erasmus+ en laboratorio analítico · Irlanda'
                },
                referenceCards: {
                    research: {
                        title: 'Referencia de laboratorio de investigación',
                        body: 'La Dra. Danay Cibrián Vera, investigadora principal en el Servicio de Inmunología del Hospital Universitario de La Princesa, recomienda a Jhon tras unas prácticas de tres meses en laboratorio que incluyeron extracción de ARN, PCR, electroforesis, genotipado, procesamiento de muestras biológicas, cultivo celular, técnicas de tinción, diseño de protocolos y gestión de material de laboratorio.'
                    },
                    academic: {
                        title: 'Referencia académica',
                        body: 'Tamara Díaz Jáuregui, profesora de biología en CEAC FP Madrid, recomienda a Jhon por su capacidad técnica, dedicación, precisión, resolución de problemas, rapidez de aprendizaje, comunicación y fuerte sentido de la responsabilidad.'
                    },
                    international: {
                        title: 'Referencia internacional de laboratorio',
                        body: 'Cristobal Fernandez Belmonte M.Sc., Lab Manager en Celignis Biomass Analysis Laboratory, en Limerick, Irlanda, recomienda a Jhon tras sus prácticas apoyando análisis de biomasa, manejo instrumental, flujos de trabajo GLP, controles de calidad, preparación de muestras, trabajo en equipo y formación de nuevos estudiantes en prácticas.'
                    }
                }
            },
            principles: {
                kicker: 'Cómo se documenta', title: 'Documentar el trabajo, no solo mostrar el resultado.',
                intro: 'Una entrada solo pertenece aquí cuando demuestra una pregunta, contribución, resultado o aprendizaje real.',
                authorship: { title: 'Autoría clara', body: 'Las decisiones, aportaciones, revisiones y pruebas se identifican de forma explícita.' },
                evidence: { title: 'Evidencia antes que afirmaciones', body: 'La evidencia publicada, la interpretación, las hipótesis y los resultados experimentales se mantienen separados.' },
                limitations: { title: 'Limitaciones visibles', body: 'Las preguntas abiertas, la validación pendiente y las restricciones técnicas siguen formando parte de la entrada.' },
                ai: { title: 'Uso transparente de IA', body: 'Transparencia sobre IA: se ha utilizado IA como herramienta de apoyo en la implementación técnica, la organización y la revisión editorial del portafolio. Jhon M. Cuenca define los objetivos, requisitos, contenido, decisiones de producto, pruebas y aprobación final.' }
            },
            footer: { copyright: '© 2026 Jhon M. Cuenca. Todos los derechos reservados.', notice: 'JMC · Workbench documenta proyectos seleccionados, notas científicas y aprendizaje aplicado.', scientificNotice: 'Las notas científicas distinguen evidencia publicada, interpretación, hipótesis y limitaciones.' },
            dialog: {
                problem: 'Problema o motivación', contribution: 'Contribución real', result: 'Resultado o evidencia',
                context: 'Contexto', technicalWork: 'Trabajo técnico / Mi papel', technicalEvidence: 'Evidencia y detalle técnico',
                next: 'Limitaciones y próximos pasos', resources: 'Documentos y fuentes', navigationLabel: 'Navegación entre páginas del proyecto',
                previous: 'Anterior', nextEntry: 'Siguiente', openOtherPage: 'Abrir esta página',
                openPage2: 'Abrir página 2', backToPage1: 'Volver a página 1',
                pageShortLabel: 'Página',
                openPageNamed: 'Abrir página {page} de {total}: {title}', pagePosition: '{current} / {total}',
                pageChanged: 'Página {current} de {total}: {title}', overview: 'Vista general del proyecto',
                evidenceHeading: 'Contribución, evidencia y próximos pasos', expanded: 'Registro ampliado del proyecto',
                portfolioDetails: 'Finalidad, arquitectura y mantenimiento', academicContext: 'Contexto académico y documentación',
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
                openDeutschosEntry: 'DeutschOS-Eintrag öffnen',
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
                focusValue: 'Entwicklung von DeutschOS und Portfolio', aiLabel: 'KI-Transparenz',
                aiValue: 'KI unterstützt technische Umsetzung, Inhaltsorganisation und redaktionelle Überarbeitung, während Jhon M. Cuenca Ziele, Anforderungen, Inhalte, Tests und die abschließende Freigabe verantwortet.'
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
                    summary: 'Ein lokales System zum Deutschlernen mit allgemeiner Sprache, Laborkontexten, strukturierter Übung und verifiziertem Gedächtnis.',
                    contribution: 'Konzept, Anforderungen, Lernstruktur, Inhaltsprüfung, Tests und Produktentscheidungen.',
                    evidence: 'Funktionsfähiger lokaler Prototyp in aktiver Entwicklung.',
                    tagLanguage: 'Sprachenlernen', tagLaboratory: 'Labordeutsch'
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
                    summary: 'Literaturgestützter Konzeptvorschlag für AETEL 2025 zu modifiziertem Chitosan und Mikroplastik für zukünftige biomedizinische oder analytische Studien.',
                    contribution: 'Konzeptentwicklung, prüfbare Hypothesen, wissenschaftliche Einordnung und explizite Validierungsgrenzen.',
                    evidence: 'Es liegt keine experimentelle Validierung vor; der Vorschlag bleibt konzeptionell und erfordert eine In-vitro-Validierung.',
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
                learningItem1: 'DeutschOS · Lokaler Prototyp in Entwicklung',
                learningItem2: 'Wissenschaftliches Portfolio · Veröffentlichte mehrsprachige Umsetzung',
                learningItem3: 'La Princesa · Praktikum im klinisch-biomedizinischen Labor',
                learningItem4: 'Celignis · Praktikum im analytischen Biomasse-Labor',
                milestones: 'Meilensteine',
                milestonesBody: 'Dokumentierte Fortschritte mit direkter Evidenz.',
                milestonesItem1: 'Portfolio-Veröffentlichung auf GitHub Pages',
                milestonesItem2: 'Abgeschlossene akademische Literaturübersicht zur Phagentherapie'
            },
            entriesData: {
                deutschos: 'Lokale Deutsch-Lernumgebung mit Fokus auf nutzbaren Fortschritt, Laborwortschatz und transparente Korrektur.',
                portfolio: 'Veröffentlichtes mehrsprachiges Portfolio für Recruiter, Labore und wissenschaftliche Kontakte.',
                laprincesa: 'Dreimonatiges Praktikum im Krankenhausforschungskontext mit angewandten Workflows in Immunologie, Molekularbiologie und Probenverarbeitung.',
                celignis: 'Erasmus+-Laborpraktikum in Irland mit analytischen Workflows, GLP-Routinen und technischer Dokumentation.',
                phage: 'Gemeinsam verfasste akademische Literaturübersicht zu Phagentherapie, Anwendungen, Grenzen und regulatorischen Hürden.',
                chitosan: 'Frühe, literaturbasierte Hypothese für eine spätere kontrollierte Validierung im Labor.'
            },
            professionalContext: {
                development: {
                    kicker: 'Aktuelle Entwicklung',
                    title: 'Kontinuierliche berufliche Entwicklung während der Vorbereitung auf Laborchancen.',
                    body: 'Parallel zu Bewerbungen für laborbezogene Positionen, Unterstützung in klinischer Forschung und biomedizinische Wissenschaft bereite ich mich weiter auf eine Deutschzertifizierung vor, entwickle mein wissenschaftliches Portfolio und vertiefe Literaturrecherche in meinen Interessengebieten.',
                    pointGerman: 'Vorbereitung auf Deutschzertifizierung',
                    pointPortfolio: 'Entwicklung des wissenschaftlichen Portfolios',
                    pointLiterature: 'Biomedizinische Literaturrecherche: Phagentherapie, Biomaterialien und Mikroplastik'
                },
                references: {
                    kicker: 'Referenzen',
                    title: 'Professionelle und akademische Referenzen können die hier dargestellte Laborerfahrung unterstützen.',
                    body: 'Referenzen aus Ausbildung, Forschungspraxis und internationaler Laborerfahrung können je nach Stelle und Auswahlverfahren bereitgestellt werden.',
                    pointClinical: 'Ausbildung im klinisch-biomedizinischen Laborbereich',
                    pointResearch: 'Forschungspraxis · Madrid',
                    pointErasmus: 'Erasmus+ Praktikum im analytischen Labor · Irland'
                },
                referenceCards: {
                    research: {
                        title: 'Referenz aus dem Forschungslabor',
                        body: 'Dr. Danay Cibrián Vera, Principal Investigator am Immunologiedienst des Hospital Universitario de La Princesa, empfiehlt Jhon nach einem dreimonatigen Laborpraktikum mit RNA-Extraktion, PCR, Elektrophorese, Genotypisierung, Verarbeitung biologischer Proben, Zellkultur, Färbetechniken, Protokolldesign und Verwaltung von Labormaterial.'
                    },
                    academic: {
                        title: 'Akademische Referenz',
                        body: 'Tamara Díaz Jáuregui, Biologielehrerin bei CEAC FP Madrid, empfiehlt Jhon aufgrund seiner technischen Fähigkeiten, Einsatzbereitschaft, Präzision, Problemlösung, schnellen Lernfähigkeit, Kommunikation und seines ausgeprägten Verantwortungsbewusstseins.'
                    },
                    international: {
                        title: 'Internationale Laborreferenz',
                        body: 'Cristobal Fernandez Belmonte M.Sc., Lab Manager bei Celignis Biomass Analysis Laboratory in Limerick, Irland, empfiehlt Jhon nach seinem Praktikum mit Unterstützung bei Biomasseanalysen, Gerätebedienung, GLP-Workflows, Qualitätskontrollen, Probenvorbereitung, Teamarbeit und Einarbeitung neuer Praktikantinnen und Praktikanten.'
                    }
                }
            },
            principles: {
                kicker: 'Dokumentationsprinzip', title: 'Die Arbeit dokumentieren, nicht nur das Ergebnis zeigen.',
                intro: 'Ein Eintrag gehört nur hierher, wenn er eine echte Frage, einen Beitrag, ein Ergebnis oder einen Lernerfolg zeigt.',
                authorship: { title: 'Klare Urheberschaft', body: 'Entscheidungen, Beiträge, Prüfungen und Tests werden ausdrücklich gekennzeichnet.' },
                evidence: { title: 'Evidenz vor Behauptungen', body: 'Publizierte Evidenz, Interpretation, Hypothesen und experimentelle Ergebnisse werden getrennt dargestellt.' },
                limitations: { title: 'Sichtbare Grenzen', body: 'Offene Fragen, fehlende Validierung und technische Einschränkungen bleiben Teil des Eintrags.' },
                ai: { title: 'Transparenter KI-Einsatz', body: 'Transparenz zum KI-Einsatz: KI wurde als unterstützendes Werkzeug für die technische Umsetzung, die Organisation der Inhalte und die redaktionelle Überarbeitung des Portfolios eingesetzt. Jhon M. Cuenca definiert Ziele, Anforderungen, Inhalte, Produktentscheidungen, Tests und die abschließende Freigabe.' }
            },
            footer: { copyright: '© 2026 Jhon M. Cuenca. Alle Rechte vorbehalten.', notice: 'JMC · Workbench dokumentiert ausgewählte Projekte, wissenschaftliche Notizen und angewandtes Lernen.', scientificNotice: 'Wissenschaftliche Notizen unterscheiden publizierte Evidenz, Interpretation, Hypothesen und Grenzen.' },
            dialog: {
                problem: 'Problem oder Motivation', contribution: 'Tatsächlicher Beitrag', result: 'Ergebnis oder Nachweis',
                context: 'Kontext', technicalWork: 'Technische Arbeit / Meine Rolle', technicalEvidence: 'Nachweise & technische Details',
                next: 'Grenzen und nächste Schritte', resources: 'Dokumente und Quellen', navigationLabel: 'Navigation zwischen Projektseiten',
                previous: 'Zurück', nextEntry: 'Weiter', openOtherPage: 'Diese Seite öffnen',
                openPage2: 'Seite 2 öffnen', backToPage1: 'Zurück zu Seite 1',
                pageShortLabel: 'Seite',
                openPageNamed: 'Seite {page} von {total} öffnen: {title}', pagePosition: '{current} / {total}',
                pageChanged: 'Seite {current} von {total}: {title}', overview: 'Projektübersicht',
                evidenceHeading: 'Beitrag, Nachweis und nächste Schritte', expanded: 'Erweiterte Projektdokumentation',
                portfolioDetails: 'Zweck, Architektur und Pflege', academicContext: 'Akademischer Kontext und Dokumentation',
                proposal: 'Forschungsvorschlag', hypotheses: 'Arbeitshypothesen',
                hypothesesIntro: 'Erwartete Ergebnisse als erste, überprüfbare Hypothesen formuliert.',
                tags: 'Technische Konzepte'
            }
        }
    };

    const entryData = {
        en: {
            deutschos: {
                category: 'Project · Technical & learning', status: 'In development', title: 'DeutschOS',
                summary: 'A local learning environment intended to turn German study into a structured, reviewable and professionally relevant system.',
                problem: 'Generic study tools do not fully connect everyday German, laboratory vocabulary, motivation and long-term review in one coherent workflow.',
                contribution: 'Definition of learning goals, functional requirements, content hierarchy, correction model, memory-confirmation workflow and product decisions. Programming is AI-assisted.',
                result: 'A working local prototype exists and is being developed in broad functional blocks. It currently serves as evidence of product thinking and applied learning design, not as a finished public product.',
                next: 'The system still requires continued testing, content validation, usability review and a clearer public demonstration before it should be described as complete.',
                disclosure: 'AI use: support for technical implementation and editorial review. Concept, requirements, content, testing and final decisions by Jhon M. Cuenca.'
            },
            portfolio: {
                category: 'Project · Milestone', status: 'Functional', title: 'Scientific Portfolio',
                summary: 'A multilingual static website designed to communicate a laboratory profile clearly to recruiters and scientific teams.',
                problem: 'Spanish vocational qualifications and mixed clinical, biomedical and analytical experience require careful explanation in an international context.',
                contribution: 'Responsibility for professional content, publication decisions, functional requirements, wording and scientific-claim review, site testing, and product and visual decisions.',
                result: 'The site is published through GitHub Pages with English, German and Spanish support and accessible professional sections.',
                next: 'Next steps are to refine the separation between the professional profile and Workbench, improve content maintenance, and continue accessibility and responsive-layout validation.',
                disclosure: 'AI use: support for technical implementation and editorial review. Concept, requirements, content, testing and final decisions by Jhon M. Cuenca.',
                details: [
                    {
                        title: 'Purpose',
                        body: 'Present Jhon M. Cuenca’s professional profile, experience and public professional documentation; maintain Workbench as a separate space for projects, notes and applied learning; and communicate scientific content by clearly separating evidence, interpretation and hypotheses.'
                    },
                    {
                        title: 'Architecture',
                        body: 'Static website with no backend, implemented with HTML, CSS and vanilla JavaScript. Main portfolio translations are loaded from JSON files in English, German and Spanish; Workbench translations are maintained internally. The structure is compatible with GitHub Pages.'
                    },
                    {
                        title: 'Maintenance',
                        body: 'The portfolio is maintained as a static, multilingual platform, with periodic reviews of its content, accessibility and responsive design. Updates prioritise professional clarity, scientific accuracy and consistency between the main profile and Workbench.'
                    },
                    {
                        title: 'Laboratory practice archive · La Princesa',
                        body: 'Technical depth preserved in Workbench includes cytokine-stimulated and adherent cell-culture workflows, Buffy Coat handling, CD4/CD14 isolation, human and animal sample processing (including psoriasis, dermatitis and hidradenitis suppurativa contexts), murine lymphoid-organ processing, RNA extraction, PCR, electrophoresis, transgenic-mouse genotyping, ELISA, Western blot preparation, media preparation, immunohistochemistry, immunofluorescence, protocol work, scientific databases, laboratory material and inventory management, plus the bilingual scientific website developed for the research group.'
                    },
                    {
                        title: 'Laboratory practice archive · Celignis',
                        body: 'Technical depth preserved in Workbench includes moisture, ash, volatile matter, CHNOS, ash melting, BMP/biogas, COD, ammonia and NIR/VISION workflows; operation of CHNOS elemental analyser, TGA Q500, CARBOLITE furnaces, BMP units and Biogas 5000; GLP and internal statistical quality controls; calibration, troubleshooting, maintenance and monitoring, sample preparation, SOP support, technical documentation, progressive responsibility for the volatile-matter workflow, training and supervision of replacement interns, customer work, and project context including SteamBioAfrica and BIO4Africa (placement dates: 03/2023-05/2023).'
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
                result: 'A completed 61-page academic project and defense material. It is a literature review, not an experimental or clinical study.',
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
                    }
                ],
                resources: [
                    { label: 'Final project · 61 pages', href: '../assets/documents/bacteriophage-therapy-final-project.pdf' },
                    { label: 'Defense presentation · 17 slides', href: '../assets/documents/bacteriophage-therapy-defense.pdf' }
                ]
            },
            chitosan: {
                category: 'Research note · Concept · AETEL 2025', status: 'Concept', title: 'Medical applications of chitosan: potential for microplastic capture and biomedical study',
                summary: 'Literature-informed proposal presented in the AETEL 2025 context. It explores whether modified chitosan, a biocompatible biopolymer derived from chitin, could be studied as a platform for interacting with microplastics in future biomedical or analytical models.',
                problem: 'Microplastics are an emerging health concern, but human exposure, accumulation and clinical impact still require careful experimental confirmation.',
                contribution: 'Original concept development, hypothesis framing, proposed methodology and scientific communication. The contribution includes the adsorption, biofilm-guided design, degradation-support and biomedical feasibility hypotheses, with scope and limitations stated explicitly.',
                result: 'Current maturity is conceptual only. Proposed methods include biofilm sequencing, MiSeq-based microbial profiling, chitosan modification, FTIR characterization, adsorption assays and biocompatibility testing. No experimental validation was performed.',
                next: 'The proposal requires in vitro validation, toxicity assessment, robust controls, reproducible analytical methods, independent scientific review and cautious interpretation before any biomedical or clinical interpretation. It does not claim demonstrated therapeutic efficacy.',
                disclosure: 'Scientific limitation and integrity notice: literature-informed concept in AETEL 2025 context; no experimental validation performed; in vitro validation is required before any biomedical interpretation.',
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
                context: '370-hour FCT placement in 2025 at Fundación para la Investigación Biomédica del Hospital Universitario de La Princesa in Madrid, within a research environment handling human and animal samples.',
                technicalWork: 'Supported day-to-day cell-culture, sample-processing, molecular-biology and immunology workflows under laboratory protocols, together with scientific-database work, material and inventory management, and development of a bilingual scientific website for the research group. The supervised role strengthened reproducibility, assay interpretation and quality-control practice while building greater autonomy.',
                technicalEvidence: 'Documented scope includes cytokine-stimulated and adherent cell cultures, including HaCaT; media preparation, passaging and freezing; Buffy Coat handling and CD4/CD14 isolation; human samples in psoriasis, dermatitis and hidradenitis suppurativa contexts; animal samples and murine lymphoid organs; RNA extraction, PCR, electrophoresis and transgenic-mouse genotyping; ELISA; Western blot preparation, transfer and blocking; immunohistochemistry; and immunofluorescence. An existing professional reference supports the placement, protocol work and laboratory-material responsibilities.',
                technicalEvidenceLead: 'Documented scope includes',
                technicalEvidenceGroups: [
                    { title: 'Cell culture & samples', body: 'cytokine-stimulated and adherent cell cultures, including HaCaT; media preparation, passaging and freezing; Buffy Coat handling and CD4/CD14 isolation; human samples in psoriasis, dermatitis and hidradenitis suppurativa contexts; animal samples and murine lymphoid organs' },
                    { title: 'Molecular biology', body: 'RNA extraction, PCR, electrophoresis and transgenic-mouse genotyping; Western blot preparation, transfer and blocking' },
                    { title: 'Immunology', body: 'ELISA; immunohistochemistry; and immunofluorescence' },
                    { title: 'Documentation & professional evidence', body: 'An existing professional reference supports the placement, protocol work and laboratory-material responsibilities.' }
                ],
                disclosure: 'Scope note: this is documented laboratory placement experience, not an independent clinical claim or therapeutic study.'
            },
            celignis: {
                category: 'Laboratory Practice', status: 'Completed', title: 'Analytical & Biomass Laboratory Practice · Celignis',
                summary: 'Erasmus+ placement in Limerick focused on analytical biomass testing, GLP routines and technical documentation.',
                context: 'Erasmus+ placement from 03/2023 to 05/2023 at Celignis Biomass Analysis Laboratory in Limerick, Ireland, supporting analytical work for clients and in the context of SteamBioAfrica and BIO4Africa.',
                technicalWork: 'Prepared samples and supported analytical workflows under GLP-based routines; operated, calibrated, troubleshot, maintained and monitored laboratory equipment; contributed to SOPs, technical documentation and traceability; progressively assumed responsibility for volatile-matter analysis; and trained and supervised replacement interns during handover.',
                technicalEvidence: 'Documented scope includes moisture, ash, volatile matter, CHNOS elemental analysis, ash melting, BMP and biogas, COD, ammonia, NIR/VISION and vacuum filtration; operation of a CHNOS analyser, TGA Q500, CARBOLITE furnaces, BMP units and Biogas 5000; internal statistical quality controls; and Thermal Excel records, batches, labels and result traceability. An existing professional reference supports the placement and its operational responsibilities. This foundation supports continued development in method validation, uncertainty analysis and cross-method interpretation.',
                technicalEvidenceLead: 'Documented scope includes',
                technicalEvidenceGroups: [
                    { title: 'Analysis', body: 'moisture, ash, volatile matter, CHNOS elemental analysis, ash melting, BMP and biogas, COD, ammonia, NIR/VISION and vacuum filtration' },
                    { title: 'Instrumentation', body: 'operation of a CHNOS analyser, TGA Q500, CARBOLITE furnaces, BMP units and Biogas 5000' },
                    { title: 'Quality & documentation', body: 'internal statistical quality controls; and Thermal Excel records, batches, labels and result traceability' },
                    { title: 'Responsibility & professional evidence', body: 'An existing professional reference supports the placement and its operational responsibilities. This foundation supports continued development in method validation, uncertainty analysis and cross-method interpretation.' }
                ],
                disclosure: 'Scope note: this entry documents supervised analytical placement practice and validated routine participation.'
            }
        },
        es: {
            deutschos: {
                category: 'Proyecto · Técnica y aprendizaje', status: 'En desarrollo', title: 'DeutschOS',
                summary: 'Un entorno local de aprendizaje pensado para convertir el estudio de alemán en un sistema estructurado, revisable y profesionalmente relevante.',
                problem: 'Las herramientas de estudio genéricas no conectan del todo el alemán cotidiano, el vocabulario de laboratorio, la motivación y el repaso a largo plazo en un único flujo coherente.',
                contribution: 'Definición de los objetivos de aprendizaje, los requisitos funcionales, la jerarquía de contenidos, el modelo de corrección, la confirmación de memoria y las decisiones de producto. La programación está asistida por IA.',
                result: 'Existe un prototipo local funcional que se desarrolla en bloques funcionales amplios. Demuestra pensamiento de producto y diseño de aprendizaje aplicado, pero todavía no es un producto público terminado.',
                next: 'Todavía requiere pruebas continuas, validación de contenidos, revisión de usabilidad y una demostración pública más clara antes de describirse como completado.',
                disclosure: 'Uso de IA: apoyo en implementación técnica y revisión editorial. Conceptualización, requisitos, contenido, pruebas y decisiones finales a cargo de Jhon M. Cuenca.'
            },
            portfolio: {
                category: 'Proyecto · Hito', status: 'Funcional', title: 'Portafolio científico',
                summary: 'Una web estática multilingüe diseñada para comunicar con claridad un perfil de laboratorio a reclutadores y equipos científicos.',
                problem: 'Las titulaciones profesionales españolas y la experiencia clínica, biomédica y analítica necesitan explicarse con cuidado en un contexto internacional.',
                contribution: 'Responsabilidad sobre el contenido profesional, las decisiones de publicación, los requisitos funcionales, la revisión del lenguaje y de las afirmaciones científicas, las pruebas de la web y las decisiones de producto y diseño.',
                result: 'La web está publicada mediante GitHub Pages, tiene soporte en inglés, alemán y español y presenta secciones profesionales accesibles.',
                next: 'Los próximos pasos son perfeccionar la separación entre el perfil profesional y Workbench, mejorar el mantenimiento del contenido y continuar las validaciones de accesibilidad y diseño responsive.',
                disclosure: 'Uso de IA: apoyo en implementación técnica y revisión editorial. Conceptualización, requisitos, contenido, pruebas y decisiones finales a cargo de Jhon M. Cuenca.',
                details: [
                    {
                        title: 'Finalidad',
                        body: 'Presentar el perfil profesional, la experiencia y la documentación profesional pública de Jhon M. Cuenca; mantener Workbench como un espacio separado para proyectos, notas y aprendizaje aplicado; y comunicar el contenido científico separando con claridad evidencia, interpretación e hipótesis.'
                    },
                    {
                        title: 'Arquitectura',
                        body: 'Web estática sin backend, implementada con HTML, CSS y JavaScript puro. Las traducciones del portafolio principal se cargan desde archivos JSON en inglés, alemán y español; las traducciones de Workbench se mantienen internamente. La estructura es compatible con GitHub Pages.'
                    },
                    {
                        title: 'Mantenimiento',
                        body: 'El portafolio se mantiene como una plataforma estática y multilingüe, con revisiones periódicas del contenido, la accesibilidad y el diseño responsive. Las actualizaciones priorizan la claridad profesional, la veracidad científica y la coherencia entre el perfil principal y Workbench.'
                    },
                    {
                        title: 'Archivo técnico de prácticas · La Princesa',
                        body: 'La profundidad técnica preservada en Workbench incluye cultivo celular estimulado por citocinas y de líneas adherentes, manejo de Buffy Coat, aislamiento CD4/CD14, procesamiento de muestras humanas y animales (incluyendo contextos de psoriasis, dermatitis e hidradenitis supurativa), procesamiento de órganos linfoides murinos, extracción de ARN, PCR, electroforesis, genotipado de ratones transgénicos, ELISA, preparación de Western blot, preparación de medios, inmunohistoquímica, inmunofluorescencia, trabajo con protocolos, bases de datos científicas, gestión de material e inventario de laboratorio, y la web científica bilingüe desarrollada para el grupo de investigación.'
                    },
                    {
                        title: 'Archivo técnico de prácticas · Celignis',
                        body: 'La profundidad técnica preservada en Workbench incluye humedad, cenizas, materia volátil, CHNOS, fusión de cenizas, BMP/biogás, DQO, amonio y flujos NIR/VISION; operación de analizador elemental CHNOS, TGA Q500, hornos CARBOLITE, unidades BMP y Biogas 5000; GLP y controles estadísticos internos de calidad; calibración, troubleshooting, mantenimiento y monitorización, preparación de muestras, soporte a SOP y documentación técnica, responsabilidad progresiva sobre el flujo de materia volátil, formación y supervisión de becarios de relevo, trabajo para clientes y contexto de proyectos SteamBioAfrica y BIO4Africa (fechas de prácticas: 03/2023-05/2023).'
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
                result: 'Proyecto académico completado de 61 páginas y material de defensa. Es una revisión bibliográfica, no un estudio experimental ni clínico.',
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
                    }
                ],
                resources: [
                    { label: 'Trabajo final · 61 páginas', href: '../assets/documents/bacteriophage-therapy-final-project.pdf' },
                    { label: 'Presentación de defensa · 17 diapositivas', href: '../assets/documents/bacteriophage-therapy-defense.pdf' }
                ]
            },
            chitosan: {
                category: 'Nota de investigación · Concepto · AETEL 2025', status: 'Concepto', title: 'Aplicaciones médicas del quitosano: potencial para la captura de microplásticos y su estudio biomédico',
                summary: 'Propuesta informada por literatura, presentada en el contexto AETEL 2025. Hipótesis de investigación en fase inicial que explora si el quitosano modificado, un biopolímero biocompatible derivado de la quitina, podría estudiarse como plataforma para interactuar con microplásticos en futuros modelos biomédicos o analíticos.',
                problem: 'Los microplásticos son una preocupación emergente para la salud, pero la exposición humana, su posible acumulación y su impacto clínico todavía requieren confirmación experimental cuidadosa.',
                contribution: 'Desarrollo original del concepto, formulación de hipótesis, metodología propuesta y comunicación científica. La contribución incluye las hipótesis de adsorción, diseño guiado por biopelículas, apoyo a la degradación y viabilidad biomédica, con alcance y limitaciones explícitos.',
                result: 'La madurez actual es exclusivamente conceptual. Los métodos propuestos incluyen secuenciación de biopelículas, perfilado microbiano mediante MiSeq, modificación de quitosano, caracterización por FTIR, ensayos de adsorción y pruebas de biocompatibilidad. No se ha realizado validación experimental.',
                next: 'La propuesta requiere validación in vitro, evaluación de toxicidad, controles robustos, métodos analíticos reproducibles, revisión científica independiente e interpretación prudente antes de cualquier interpretación biomédica o clínica. No afirma eficacia terapéutica demostrada.',
                disclosure: 'Nota de integridad científica: concepto informado por literatura en contexto AETEL 2025; no se realizó validación experimental; se requiere validación in vitro antes de cualquier interpretación biomédica.',
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
                context: 'Prácticas FCT de 370 horas en 2025 en la Fundación para la Investigación Biomédica del Hospital Universitario de La Princesa, Madrid, dentro de un entorno de investigación con muestras humanas y animales.',
                technicalWork: 'Apoyo diario en flujos de cultivo celular, procesamiento de muestras, biología molecular e inmunología siguiendo protocolos de laboratorio, junto con consulta de bases de datos científicas, gestión de material e inventario y desarrollo de una web científica bilingüe para el grupo de investigación. El trabajo supervisado reforzó la reproducibilidad, la interpretación de ensayos y el control de calidad mientras aumentaba la autonomía.',
                technicalEvidence: 'El alcance documentado incluye cultivos celulares estimulados por citocinas y líneas adherentes, incluidas HaCaT; preparación de medios, pases y congelación; manejo de Buffy Coat y aislamiento CD4/CD14; muestras humanas en contextos de psoriasis, dermatitis e hidradenitis supurativa; muestras animales y órganos linfoides murinos; extracción de ARN, PCR, electroforesis y genotipado de ratones transgénicos; ELISA; preparación de Western blot, transferencia y bloqueo; inmunohistoquímica e inmunofluorescencia. Existe una referencia profesional que respalda las prácticas, el trabajo con protocolos y las responsabilidades sobre material de laboratorio.',
                technicalEvidenceLead: 'El alcance documentado incluye',
                technicalEvidenceGroups: [
                    { title: 'Cultivo celular y muestras', body: 'cultivos celulares estimulados por citocinas y líneas adherentes, incluidas HaCaT; preparación de medios, pases y congelación; manejo de Buffy Coat y aislamiento CD4/CD14; muestras humanas en contextos de psoriasis, dermatitis e hidradenitis supurativa; muestras animales y órganos linfoides murinos' },
                    { title: 'Biología molecular', body: 'extracción de ARN, PCR, electroforesis y genotipado de ratones transgénicos; preparación de Western blot, transferencia y bloqueo' },
                    { title: 'Inmunología', body: 'ELISA; inmunohistoquímica e inmunofluorescencia' },
                    { title: 'Documentación y evidencia profesional', body: 'Existe una referencia profesional que respalda las prácticas, el trabajo con protocolos y las responsabilidades sobre material de laboratorio.' }
                ],
                disclosure: 'Nota de alcance: se documenta experiencia de prácticas de laboratorio, no una afirmación clínica independiente ni un estudio terapéutico.'
            },
            celignis: {
                category: 'Prácticas de laboratorio', status: 'Completado', title: 'Prácticas en Laboratorio Analítico y de Biomasa · Celignis',
                summary: 'Prácticas Erasmus+ en Limerick orientadas a ensayos analíticos de biomasa, rutinas GLP y documentación técnica.',
                context: 'Prácticas Erasmus+ de 03/2023 a 05/2023 en Celignis Biomass Analysis Laboratory, Limerick, Irlanda, apoyando trabajo analítico para clientes y en el contexto de SteamBioAfrica y BIO4Africa.',
                technicalWork: 'Preparación de muestras y apoyo en flujos analíticos bajo rutinas basadas en GLP; operación, calibración, troubleshooting, mantenimiento y monitorización de equipos; contribución a SOPs, documentación técnica y trazabilidad; responsabilidad progresiva sobre el análisis de materia volátil; y formación y supervisión de los becarios que relevaron el puesto.',
                technicalEvidence: 'El alcance documentado incluye humedad, cenizas, materia volátil, análisis elemental CHNOS, fusión de cenizas, BMP y biogás, DQO, amonio, NIR/VISION y filtración al vacío; operación de analizador CHNOS, TGA Q500, hornos CARBOLITE, unidades BMP y Biogas 5000; controles estadísticos internos de calidad; y registros en Thermal Excel, lotes, etiquetas y trazabilidad de resultados. Existe una referencia profesional que respalda las prácticas y sus responsabilidades operativas. Esta base permite seguir avanzando en validación de métodos, análisis de incertidumbre e interpretación cruzada de técnicas.',
                technicalEvidenceLead: 'El alcance documentado incluye',
                technicalEvidenceGroups: [
                    { title: 'Análisis', body: 'humedad, cenizas, materia volátil, análisis elemental CHNOS, fusión de cenizas, BMP y biogás, DQO, amonio, NIR/VISION y filtración al vacío' },
                    { title: 'Instrumentación', body: 'operación de analizador CHNOS, TGA Q500, hornos CARBOLITE, unidades BMP y Biogas 5000' },
                    { title: 'Calidad y documentación', body: 'controles estadísticos internos de calidad; y registros en Thermal Excel, lotes, etiquetas y trazabilidad de resultados' },
                    { title: 'Responsabilidad y evidencia profesional', body: 'Existe una referencia profesional que respalda las prácticas y sus responsabilidades operativas. Esta base permite seguir avanzando en validación de métodos, análisis de incertidumbre e interpretación cruzada de técnicas.' }
                ],
                disclosure: 'Nota de alcance: esta entrada documenta práctica analítica supervisada y participación en rutinas validadas.'
            }
        },
        de: {
            deutschos: {
                category: 'Projekt · Technik & Lernen', status: 'In Entwicklung', title: 'DeutschOS',
                summary: 'Eine lokale Lernumgebung, die Deutschlernen in ein strukturiertes, überprüfbares und beruflich relevantes System überführen soll.',
                problem: 'Allgemeine Lerntools verbinden Alltagssprache, Laborwortschatz, Motivation und langfristige Wiederholung nicht vollständig in einem kohärenten Arbeitsablauf.',
                contribution: 'Festlegung von Lernzielen, funktionalen Anforderungen, Inhaltshierarchie, Korrekturmodell, bestätigter Speicherung und Produktentscheidungen. Die Programmierung ist KI-unterstützt.',
                result: 'Ein funktionsfähiger lokaler Prototyp wird in größeren funktionalen Blöcken weiterentwickelt. Er zeigt Produktdenken und angewandtes Lerndesign, ist aber noch kein fertiges öffentliches Produkt.',
                next: 'Weitere Tests, Inhaltsvalidierung, Usability-Prüfung und eine klarere öffentliche Demonstration sind erforderlich, bevor das Projekt als abgeschlossen gelten kann.',
                disclosure: 'KI-Einsatz: Unterstützung bei technischer Umsetzung und redaktioneller Überarbeitung. Konzept, Anforderungen, Inhalte, Tests und abschließende Entscheidungen durch Jhon M. Cuenca.'
            },
            portfolio: {
                category: 'Projekt · Meilenstein', status: 'Funktionsfähig', title: 'Wissenschaftliches Portfolio',
                summary: 'Eine mehrsprachige statische Website, die ein Laborprofil klar für Recruiter und wissenschaftliche Teams vermittelt.',
                problem: 'Spanische Berufsabschlüsse sowie klinische, biomedizinische und analytische Erfahrung müssen im internationalen Kontext sorgfältig erklärt werden.',
                contribution: 'Verantwortung für berufliche Inhalte, Veröffentlichungsentscheidungen, funktionale Anforderungen, die Prüfung von Formulierungen und wissenschaftlichen Aussagen, Website-Tests sowie Produkt- und Designentscheidungen.',
                result: 'Die Website ist über GitHub Pages veröffentlicht, unterstützt Englisch, Deutsch und Spanisch und bietet zugängliche professionelle Bereiche.',
                next: 'Die nächsten Schritte sind die weitere Ausarbeitung der Trennung zwischen Berufsprofil und Workbench, eine bessere Inhaltspflege sowie fortlaufende Prüfungen der Barrierefreiheit und des responsiven Layouts.',
                disclosure: 'KI-Einsatz: Unterstützung bei technischer Umsetzung und redaktioneller Überarbeitung. Konzept, Anforderungen, Inhalte, Tests und abschließende Entscheidungen durch Jhon M. Cuenca.',
                details: [
                    {
                        title: 'Zweck',
                        body: 'Das Berufsprofil, die Erfahrung und die öffentlichen beruflichen Unterlagen von Jhon M. Cuenca darstellen; die Workbench als getrennten Raum für Projekte, Notizen und angewandtes Lernen führen; und wissenschaftliche Inhalte durch eine klare Trennung von Evidenz, Interpretation und Hypothesen kommunizieren.'
                    },
                    {
                        title: 'Architektur',
                        body: 'Statische Website ohne Backend, umgesetzt mit HTML, CSS und Vanilla JavaScript. Die Übersetzungen des Hauptportfolios werden aus JSON-Dateien auf Englisch, Deutsch und Spanisch geladen; die Workbench-Übersetzungen werden intern gepflegt. Die Struktur ist mit GitHub Pages kompatibel.'
                    },
                    {
                        title: 'Pflege und Weiterentwicklung',
                        body: 'Das Portfolio wird als statische, mehrsprachige Plattform gepflegt. Inhalte, Barrierefreiheit und responsives Design werden regelmäßig überprüft. Aktualisierungen priorisieren berufliche Klarheit, wissenschaftliche Verlässlichkeit und die Kohärenz zwischen dem Hauptprofil und Workbench.'
                    },
                    {
                        title: 'Technisches Praxisarchiv · La Princesa',
                        body: 'Die in der Workbench erhaltene technische Tiefe umfasst cytokine-stimulated und adhärente Zellkultur-Workflows, Buffy-Coat-Handhabung, CD4/CD14-Isolierung, Verarbeitung humaner und tierischer Proben (einschließlich Kontexte zu Psoriasis, Dermatitis und Hidradenitis suppurativa), Verarbeitung muriner lymphoider Organe, RNA-Extraktion, PCR, Elektrophorese, Genotypisierung transgener Mäuse, ELISA, Western-Blot-Vorbereitung, Medienvorbereitung, Immunhistochemie, Immunfluoreszenz, Protokollarbeit, wissenschaftliche Datenbanken, Material- und Bestandsmanagement im Labor sowie die zweisprachige wissenschaftliche Website der Forschungsgruppe.'
                    },
                    {
                        title: 'Technisches Praxisarchiv · Celignis',
                        body: 'Die in der Workbench erhaltene technische Tiefe umfasst Feuchte, Asche, flüchtige Bestandteile, CHNOS, Ascheschmelze, BMP/Biogas, CSB, Ammonium und NIR/VISION-Workflows; Bedienung von CHNOS-Elementaranalysator, TGA Q500, CARBOLITE-Öfen, BMP-Einheiten und Biogas 5000; GLP und interne statistische Qualitätskontrollen; Kalibrierung, Troubleshooting, Wartung und Überwachung, Probenvorbereitung, SOP-Unterstützung und technische Dokumentation, schrittweise Verantwortung für den Workflow flüchtiger Bestandteile, Einarbeitung und Betreuung von nachfolgenden Praktikantinnen und Praktikanten, Kundenarbeit sowie Projektkontext mit SteamBioAfrica und BIO4Africa (Praktikumszeitraum: 03/2023-05/2023).'
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
                result: 'Eine abgeschlossene 61-seitige akademische Arbeit mit Verteidigungsmaterial. Es handelt sich um eine Literaturübersicht, nicht um eine experimentelle oder klinische Studie.',
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
                    }
                ],
                resources: [
                    { label: 'Abschlussarbeit · 61 Seiten', href: '../assets/documents/bacteriophage-therapy-final-project.pdf' },
                    { label: 'Präsentation zur Verteidigung · 17 Folien', href: '../assets/documents/bacteriophage-therapy-defense.pdf' }
                ]
            },
            chitosan: {
                category: 'Forschungsnotiz · Konzept · AETEL 2025', status: 'Konzept', title: 'Medizinische Anwendungen von Chitosan: Potenzial zur Mikroplastikbindung und biomedizinischen Untersuchung',
                summary: 'Literaturgestützter Vorschlag im Kontext AETEL 2025. Eine frühe Forschungshypothese, die untersucht, ob modifiziertes Chitosan, ein biokompatibles Biopolymer aus Chitin, als Plattform für die Interaktion mit Mikroplastik in zukünftigen biomedizinischen oder analytischen Modellen untersucht werden könnte.',
                problem: 'Mikroplastik ist ein aufkommendes Gesundheitsthema, aber menschliche Exposition, mögliche Akkumulation und klinische Auswirkungen erfordern weiterhin sorgfältige experimentelle Bestätigung.',
                contribution: 'Originale Konzeptentwicklung, Hypothesenformulierung, vorgeschlagene Methodik und wissenschaftliche Kommunikation. Der Beitrag umfasst die Adsorptionshypothese, die biofilm-geleitete Designhypothese, die Hypothese zur Unterstützung des Abbaus und die Hypothese zur biomedizinischen Machbarkeit mit ausdrücklich benanntem Umfang und Grenzen.',
                result: 'Der aktuelle Reifegrad ist rein konzeptionell. Zu den vorgeschlagenen Methoden gehören Biofilm-Sequenzierung, MiSeq-basierte mikrobielle Profilierung, Chitosanmodifikation, FTIR-Charakterisierung, Adsorptionsassays und Biokompatibilitätstests. Es wurde keine experimentelle Validierung durchgeführt.',
                next: 'Der Vorschlag erfordert In-vitro-Validierung, Toxizitätsbewertung, robuste Kontrollen, reproduzierbare analytische Methoden, unabhängige wissenschaftliche Prüfung und vorsichtige Interpretation vor jeder biomedizinischen oder klinischen Deutung. Er beansprucht keine nachgewiesene therapeutische Wirksamkeit.',
                disclosure: 'Hinweis zur wissenschaftlichen Integrität: literaturgestütztes Konzept im Kontext AETEL 2025; keine experimentelle Validierung durchgeführt; vor biomedizinischer Interpretation ist eine In-vitro-Validierung erforderlich.',
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
                context: 'FCT-Praktikum mit 370 Stunden im Jahr 2025 bei der Fundación para la Investigación Biomédica del Hospital Universitario de La Princesa in Madrid, in einem Forschungsumfeld mit humanen und tierischen Proben.',
                technicalWork: 'Mitarbeit bei täglichen Abläufen in Zellkultur, Probenverarbeitung, Molekularbiologie und Immunologie nach Laborprotokollen sowie Arbeit mit wissenschaftlichen Datenbanken, Material- und Bestandsverwaltung und Entwicklung einer zweisprachigen wissenschaftlichen Website für die Forschungsgruppe. Die angeleitete Tätigkeit stärkte Reproduzierbarkeit, Assay-Interpretation und Qualitätskontrolle bei wachsender Eigenständigkeit.',
                technicalEvidence: 'Der dokumentierte Umfang umfasst mit Zytokinen stimulierte und adhärente Zellkulturen einschließlich HaCaT; Medienvorbereitung, Passagieren und Einfrieren; Buffy-Coat-Verarbeitung und CD4/CD14-Isolierung; humane Proben im Kontext von Psoriasis, Dermatitis und Hidradenitis suppurativa; tierische Proben und murine lymphatische Organe; RNA-Extraktion, PCR, Elektrophorese und Genotypisierung transgener Mäuse; ELISA; Western-Blot-Vorbereitung, Transfer und Blocking; Immunhistochemie und Immunfluoreszenz. Eine vorhandene berufliche Referenz bestätigt das Praktikum, die Protokollarbeit und die Verantwortung für Labormaterial.',
                technicalEvidenceLead: 'Der dokumentierte Umfang umfasst',
                technicalEvidenceGroups: [
                    { title: 'Zellkultur & Proben', body: 'mit Zytokinen stimulierte und adhärente Zellkulturen einschließlich HaCaT; Medienvorbereitung, Passagieren und Einfrieren; Buffy-Coat-Verarbeitung und CD4/CD14-Isolierung; humane Proben im Kontext von Psoriasis, Dermatitis und Hidradenitis suppurativa; tierische Proben und murine lymphatische Organe' },
                    { title: 'Molekularbiologie', body: 'RNA-Extraktion, PCR, Elektrophorese und Genotypisierung transgener Mäuse; Western-Blot-Vorbereitung, Transfer und Blocking' },
                    { title: 'Immunologie', body: 'ELISA; Immunhistochemie und Immunfluoreszenz' },
                    { title: 'Dokumentation & beruflicher Nachweis', body: 'Eine vorhandene berufliche Referenz bestätigt das Praktikum, die Protokollarbeit und die Verantwortung für Labormaterial.' }
                ],
                disclosure: 'Hinweis zum Umfang: dokumentierte Laborpraxis, kein eigenständiger klinischer Wirksamkeitsnachweis und keine therapeutische Studie.'
            },
            celignis: {
                category: 'Laborpraktikum', status: 'Abgeschlossen', title: 'Praktikum im analytischen Biomasse-Labor · Celignis',
                summary: 'Erasmus+-Praktikum in Limerick mit Fokus auf analytische Biomasseprüfungen, GLP-Routinen und technische Dokumentation.',
                context: 'Erasmus+-Praktikum von 03/2023 bis 05/2023 bei Celignis Biomass Analysis Laboratory in Limerick, Irland, mit Unterstützung analytischer Kundenarbeit sowie im Kontext von SteamBioAfrica und BIO4Africa.',
                technicalWork: 'Probenvorbereitung und Unterstützung analytischer Abläufe nach GLP-orientierten Routinen; Bedienung, Kalibrierung, Fehleranalyse, Wartung und Überwachung von Geräten; Mitwirkung an SOPs, technischer Dokumentation und Rückverfolgbarkeit; schrittweise Verantwortung für die Analyse flüchtiger Bestandteile; sowie Einarbeitung und Betreuung der nachfolgenden Praktikantinnen und Praktikanten.',
                technicalEvidence: 'Der dokumentierte Umfang umfasst Feuchte, Asche, flüchtige Bestandteile, CHNOS-Elementaranalyse, Ascheschmelze, BMP und Biogas, CSB, Ammonium, NIR/VISION und Vakuumfiltration; Bedienung von CHNOS-Analysator, TGA Q500, CARBOLITE-Öfen, BMP-Einheiten und Biogas 5000; interne statistische Qualitätskontrollen; sowie Thermal-Excel-Datensätze, Chargen, Etiketten und Ergebnisrückverfolgbarkeit. Eine vorhandene berufliche Referenz bestätigt das Praktikum und seine operativen Verantwortlichkeiten. Diese Grundlage unterstützt die weitere Entwicklung in Methodenvalidierung, Unsicherheitsanalyse und methodenübergreifender Interpretation.',
                technicalEvidenceLead: 'Der dokumentierte Umfang umfasst',
                technicalEvidenceGroups: [
                    { title: 'Analysen', body: 'Feuchte, Asche, flüchtige Bestandteile, CHNOS-Elementaranalyse, Ascheschmelze, BMP und Biogas, CSB, Ammonium, NIR/VISION und Vakuumfiltration' },
                    { title: 'Instrumentierung', body: 'Bedienung von CHNOS-Analysator, TGA Q500, CARBOLITE-Öfen, BMP-Einheiten und Biogas 5000' },
                    { title: 'Qualität & Dokumentation', body: 'interne statistische Qualitätskontrollen; sowie Thermal-Excel-Datensätze, Chargen, Etiketten und Ergebnisrückverfolgbarkeit' },
                    { title: 'Verantwortung & beruflicher Nachweis', body: 'Eine vorhandene berufliche Referenz bestätigt das Praktikum und seine operativen Verantwortlichkeiten. Diese Grundlage unterstützt die weitere Entwicklung in Methodenvalidierung, Unsicherheitsanalyse und methodenübergreifender Interpretation.' }
                ],
                disclosure: 'Hinweis zum Umfang: dieser Eintrag dokumentiert überwachte analytische Praxis und Beteiligung an validierten Routinen.'
            }
        }
    };

    let currentLanguage = getInitialLanguage();
    let updateCarouselTranslations = null;
    let syncCarouselRotation = null;

    function getInitialLanguage() {
        try {
            const saved = window.localStorage.getItem(STORAGE_KEY);
            if (LANGUAGES.includes(saved)) return saved;
        } catch (error) {
            console.warn('[WORKBENCH] localStorage unavailable', error);
        }

        const documentLanguage = document.documentElement.lang.slice(0, 2).toLowerCase();
        return LANGUAGES.includes(documentLanguage) ? documentLanguage : DEFAULT_LANGUAGE;
    }

    function getTranslation(key) {
        return key.split('.').reduce((value, part) => value?.[part], translations[currentLanguage]) ?? key;
    }

    function translatePage() {
        document.documentElement.lang = currentLanguage;
        document.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-aria-label], [data-i18n-aria-roledescription]').forEach((element) => {
            if (element.dataset.i18nHtml) {
                element.innerHTML = getTranslation(element.dataset.i18nHtml);
            } else if (element.dataset.i18n) {
                element.textContent = getTranslation(element.dataset.i18n);
            }

            if (element.dataset.i18nAriaLabel) {
                element.setAttribute('aria-label', getTranslation(element.dataset.i18nAriaLabel));
            }

            if (element.dataset.i18nAriaRoledescription) {
                element.setAttribute('aria-roledescription', getTranslation(element.dataset.i18nAriaRoledescription));
            }
        });

        document.querySelectorAll('[data-language-set]').forEach((button) => {
            button.setAttribute('aria-pressed', String(button.dataset.languageSet === currentLanguage));
        });

        updateCarouselTranslations?.();
    }

    function setLanguage(language) {
        if (!LANGUAGES.includes(language)) return;
        currentLanguage = language;
        try { window.localStorage.setItem(STORAGE_KEY, language); } catch (error) { console.warn('[WORKBENCH] Could not save language', error); }
        translatePage();
        if (dialog.open && dialog.dataset.entryId) {
            populateDialog(dialog.dataset.entryId, {
                resetScroll: false,
                page: Number(dialog.dataset.page || 0)
            });
        }
    }

    document.querySelectorAll('[data-language-set]').forEach((button) => {
        button.addEventListener('click', () => setLanguage(button.dataset.languageSet));
    });

    const siteHeader = document.querySelector('.workbench-header');
    let lastScrollY = window.scrollY;
    let scrollDirectionStartY = window.scrollY;
    let scrollDirection = 'up';

    function updateHeaderVisibility() {
        if (!siteHeader) return;

        const currentScrollY = window.scrollY;
        const nextDirection = currentScrollY > lastScrollY ? 'down' : 'up';

        if (nextDirection !== scrollDirection) {
            scrollDirection = nextDirection;
            scrollDirectionStartY = lastScrollY;
        }

        const distanceInDirection = Math.abs(currentScrollY - scrollDirectionStartY);

        if (scrollDirection === 'down' && currentScrollY > 120 && distanceInDirection > 18) {
            siteHeader.classList.add('is-header-hidden');
        }

        if ((scrollDirection === 'up' && distanceInDirection > 10) || currentScrollY <= 120) {
            siteHeader.classList.remove('is-header-hidden');
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', updateHeaderVisibility, { passive: true });
    updateHeaderVisibility();

    const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
    const entries = Array.from(document.querySelectorAll('.entry-row'));
    const entryGroups = Array.from(document.querySelectorAll('.entry-group'));
    const entrySummaryBlocks = {
        learning: document.querySelector('#learning'),
        milestones: document.querySelector('#milestones')
    };
    const emptyState = document.querySelector('[data-empty-state]');

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            let visibleCount = 0;

            filterButtons.forEach((item) => {
                const active = item === button;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-pressed', String(active));
            });

            entries.forEach((entry) => {
                const categories = entry.dataset.category.split(' ');
                const visible = filter === 'all' || categories.includes(filter);
                entry.hidden = !visible;
                if (visible) visibleCount += 1;
            });

            entryGroups.forEach((group) => {
                const groupEntries = Array.from(group.querySelectorAll('.entry-row'));
                const hasVisibleEntries = groupEntries.some((entry) => !entry.hidden);
                group.hidden = !hasVisibleEntries;
            });

            Object.entries(entrySummaryBlocks).forEach(([summaryKey, section]) => {
                if (!section) return;
                section.hidden = !(filter === 'all' || filter === summaryKey);
            });

            if (emptyState) emptyState.hidden = visibleCount > 0;
        });
    });

    const dialog = document.querySelector('[data-entry-dialog]');
    const dialogClose = document.querySelector('[data-dialog-close]');
    const dialogPanel = dialog?.querySelector('[data-dialog-panel]');
    const dialogPageTab = dialog?.querySelector('[data-dialog-page-tab]');
    const dialogPrevious = dialog?.querySelector('[data-dialog-previous]');
    const dialogNext = dialog?.querySelector('[data-dialog-next-entry]');
    const dialogNavigation = dialog?.querySelector('[data-dialog-navigation]');
    const dialogToolbarPosition = dialog?.querySelector('[data-dialog-toolbar-position]');
    const dialogTabPosition = dialog?.querySelector('[data-dialog-tab-position]');
    const dialogTabDirection = dialog?.querySelector('[data-dialog-tab-direction]');
    const dialogPageContent = dialog?.querySelector('[data-dialog-page-content]');
    const dialogScroll = dialog?.querySelector('[data-dialog-scroll]');
    const dialogAnnouncement = dialog?.querySelector('[data-dialog-announcement]');
    const featuredCarousel = document.querySelector('[data-featured-carousel]');

    if (featuredCarousel) {
        const track = featuredCarousel.querySelector('[data-carousel-track]');
        const slides = Array.from(featuredCarousel.querySelectorAll('[data-carousel-slide]'));
        const dots = Array.from(featuredCarousel.querySelectorAll('[data-carousel-go]'));
        const toggleButton = featuredCarousel.querySelector('[data-carousel-toggle]');
        const previousButton = featuredCarousel.querySelector('[data-carousel-prev]');
        const nextButton = featuredCarousel.querySelector('[data-carousel-next]');
        const currentCounter = featuredCarousel.querySelector('[data-carousel-current]');
        const progress = featuredCarousel.querySelector('[data-carousel-progress]');
        const statusRegion = featuredCarousel.querySelector('[data-carousel-status]');
        const viewport = featuredCarousel.querySelector('.carousel-viewport');
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const rotationDelay = 11000;
        let activeIndex = 0;
        let rotationTimer = null;
        let pointerStartX = null;
        let userPaused = false;
        let pointerInside = false;
        let focusInside = false;

        function isDialogOpen() {
            return Boolean(dialog?.open);
        }

        function shouldRotate() {
            return !userPaused
                && !pointerInside
                && !focusInside
                && !isDialogOpen()
                && !reduceMotion.matches
                && !document.hidden
                && slides.length > 1;
        }

        function updatePauseButton() {
            if (!toggleButton) return;

            const textKey = userPaused ? 'featured.resumeRotation' : 'featured.pauseRotation';
            const labelKey = userPaused ? 'featured.resumeRotationLabel' : 'featured.pauseRotationLabel';
            const text = getTranslation(textKey);
            const label = getTranslation(labelKey);

            toggleButton.textContent = text;
            toggleButton.setAttribute('aria-label', label);
            toggleButton.classList.toggle('is-paused', userPaused);
        }

        function announceCurrentSlide() {
            if (!statusRegion) return;

            const activeSlide = slides[activeIndex];
            const slideLabel = activeSlide?.getAttribute('aria-label') || '';
            const title = activeSlide?.querySelector('h3')?.textContent?.trim() || '';
            statusRegion.textContent = title ? `${slideLabel}: ${title}` : slideLabel;
        }

        function updateCarousel(options = {}) {
            if (!track || slides.length === 0) return;

            const { userInitiated = false } = options;

            track.style.transform = `translateX(-${activeIndex * 100}%)`;

            slides.forEach((slide, index) => {
                const isActive = index === activeIndex;
                slide.setAttribute('aria-hidden', String(!isActive));
                slide.toggleAttribute('inert', !isActive);
            });

            dots.forEach((dot, index) => {
                const isActive = index === activeIndex;
                dot.classList.toggle('is-active', isActive);
                if (isActive) dot.setAttribute('aria-current', 'true');
                else dot.removeAttribute('aria-current');
            });

            if (currentCounter) currentCounter.textContent = String(activeIndex + 1).padStart(2, '0');
            if (progress) progress.style.transform = `translateX(${activeIndex * 100}%)`;

            if (statusRegion) {
                if (userInitiated) announceCurrentSlide();
                else statusRegion.textContent = '';
            }
        }

        function stopRotation() {
            if (rotationTimer !== null) {
                window.clearInterval(rotationTimer);
                rotationTimer = null;
            }
        }

        function startRotation() {
            if (!shouldRotate() || rotationTimer !== null) return;
            rotationTimer = window.setInterval(() => {
                activeIndex = (activeIndex + 1) % slides.length;
                updateCarousel();
            }, rotationDelay);
        }

        function syncRotation() {
            if (shouldRotate()) startRotation();
            else stopRotation();
        }

        syncCarouselRotation = syncRotation;

        function restartRotation() {
            stopRotation();
            syncRotation();
        }

        function goToSlide(index, options = {}) {
            const { userInitiated = false, restart = true } = options;
            activeIndex = (index + slides.length) % slides.length;
            updateCarousel({ userInitiated });
            if (restart) restartRotation();
        }

        updateCarouselTranslations = updatePauseButton;

        previousButton?.addEventListener('click', () => goToSlide(activeIndex - 1, { userInitiated: true }));
        nextButton?.addEventListener('click', () => goToSlide(activeIndex + 1, { userInitiated: true }));
        dots.forEach((dot) => dot.addEventListener('click', () => goToSlide(Number(dot.dataset.carouselGo), { userInitiated: true })));

        toggleButton?.addEventListener('click', () => {
            userPaused = !userPaused;
            updatePauseButton();
            syncRotation();
        });

        featuredCarousel.addEventListener('mouseenter', () => {
            pointerInside = true;
            syncRotation();
        });
        featuredCarousel.addEventListener('mouseleave', () => {
            pointerInside = false;
            syncRotation();
        });
        featuredCarousel.addEventListener('focusin', () => {
            focusInside = true;
            syncRotation();
        });
        featuredCarousel.addEventListener('focusout', () => {
            window.setTimeout(() => {
                focusInside = featuredCarousel.contains(document.activeElement);
                syncRotation();
            }, 0);
        });

        viewport?.addEventListener('pointerdown', (event) => {
            pointerStartX = event.clientX;
        });

        viewport?.addEventListener('pointerup', (event) => {
            if (pointerStartX === null) return;
            const distance = event.clientX - pointerStartX;
            pointerStartX = null;

            if (Math.abs(distance) < 45) return;
            goToSlide(distance > 0 ? activeIndex - 1 : activeIndex + 1, { userInitiated: true });
        });

        viewport?.addEventListener('pointercancel', () => {
            pointerStartX = null;
        });

        document.addEventListener('visibilitychange', syncRotation);

        if (typeof reduceMotion.addEventListener === 'function') {
            reduceMotion.addEventListener('change', syncRotation);
        } else if (typeof reduceMotion.addListener === 'function') {
            reduceMotion.addListener(syncRotation);
        }

        updatePauseButton();
        updateCarousel();
        syncRotation();
    }

    const dialogPageCounts = {
        deutschos: 1,
        portfolio: 2,
        phage: 2,
        chitosan: 2,
        laprincesa: 1,
        celignis: 1
    };
    const dialogTechnicalTags = {
        en: ['Chitosan', 'Microplastics', 'Biofilms', 'MiSeq', 'FTIR', 'Adsorption assays', 'Biocompatibility'],
        es: ['Quitosano', 'Microplásticos', 'Biopelículas', 'MiSeq', 'FTIR', 'Ensayos de adsorción', 'Biocompatibilidad'],
        de: ['Chitosan', 'Mikroplastik', 'Biofilme', 'MiSeq', 'FTIR', 'Adsorptionsassays', 'Biokompatibilität']
    };
    const reduceDialogMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lastDialogTrigger = null;
    let dialogReturnHash = '';
    let dialogTransitioning = false;

    function formatDialogText(key, replacements) {
        return Object.entries(replacements).reduce(
            (text, [name, value]) => text.replace(`{${name}}`, value),
            getTranslation(key)
        );
    }

    function createDialogElement(tagName, className = '', text = '') {
        const element = document.createElement(tagName);
        if (className) element.className = className;
        if (text) element.textContent = text;
        return element;
    }

    function setLongTitleClass(element, text) {
        if (!element || typeof text !== 'string') return;
        element.classList.toggle('is-long-title', text.length > 78);
    }

    function getDialogPageTitles(entryId) {
        const titleKeys = {
            deutschos: ['dialog.overview'],
            portfolio: ['dialog.overview', 'dialog.portfolioDetails'],
            phage: ['dialog.overview', 'dialog.academicContext'],
            chitosan: ['dialog.proposal', 'dialog.hypotheses']
        };
        return (titleKeys[entryId] || ['dialog.overview']).map((key) => getTranslation(key));
    }

    function appendIntroduction(container, data) {
        const header = createDialogElement('header', 'dialog-introduction');
        const meta = createDialogElement('div', 'dialog-meta');
        const category = createDialogElement('span', '', data.category);
        const status = createDialogElement('span', '', data.status);
        const title = createDialogElement('h2', '', data.title);
        const summary = createDialogElement('p', 'dialog-lead', data.summary);

        title.id = 'dialog-title';
        title.dataset.dialogTitle = '';
        title.tabIndex = -1;
        setLongTitleClass(title, data.title);
        meta.append(category, status);
        header.append(meta, title, summary);
        container.append(header);
    }

    function appendPageHeader(container, data, pageTitle, intro = '') {
        const header = createDialogElement('header', 'dialog-page-body');
        const kicker = createDialogElement('p', 'dialog-page-kicker', data.category);
        const title = createDialogElement('h2', 'dialog-page-heading', pageTitle);

        title.id = 'dialog-title';
        title.dataset.dialogTitle = '';
        title.tabIndex = -1;
        title.setAttribute('aria-label', `${data.title}: ${pageTitle}`);
        setLongTitleClass(title, pageTitle);
        header.append(kicker, title);
        if (intro) header.append(createDialogElement('p', 'dialog-lead', intro));
        container.append(header);
    }

    function appendSectionHeading(container, kickerText, headingText) {
        container.append(
            createDialogElement('p', 'dialog-section-kicker', kickerText),
            createDialogElement('h3', 'dialog-section-heading', headingText)
        );
    }

    function createEditorialBlock(title, body, modifier = '') {
        const section = createDialogElement('section', `dialog-editorial-block${modifier ? ` ${modifier}` : ''}`);
        section.append(
            createDialogElement('h3', '', title),
            createDialogElement('p', '', body)
        );
        return section;
    }

    function appendOverviewBand(container, items) {
        const band = createDialogElement('div', 'dialog-overview-band');
        items.forEach((item) => {
            const section = createDialogElement('section');
            section.append(
                createDialogElement('h3', '', item.title),
                createDialogElement('p', '', item.body)
            );
            band.append(section);
        });
        container.append(band);
    }

    function appendPracticeOverview(container, data) {
        const layout = createDialogElement('div', 'dialog-practice-layout');
        const context = createEditorialBlock(getTranslation('dialog.context'), data.context, 'dialog-practice-context');
        const columns = createDialogElement('div', 'dialog-practice-columns');
        const technicalWork = createEditorialBlock(
            getTranslation('dialog.technicalWork'),
            data.technicalWork,
            'dialog-practice-work'
        );
        const evidence = createDialogElement('section', 'dialog-practice-evidence');
        const evidenceGroups = createDialogElement('div', 'dialog-practice-evidence-groups');

        evidence.append(createDialogElement('h3', '', getTranslation('dialog.technicalEvidence')));
        if (data.technicalEvidenceLead) {
            evidence.append(createDialogElement('p', 'dialog-practice-evidence-lead', data.technicalEvidenceLead));
        }

        (data.technicalEvidenceGroups || []).forEach((group) => {
            const section = createDialogElement('section', 'dialog-practice-evidence-group');
            section.append(
                createDialogElement('h4', '', group.title),
                createDialogElement('p', '', group.body)
            );
            evidenceGroups.append(section);
        });

        evidence.append(evidenceGroups);
        columns.append(technicalWork, evidence);
        layout.append(context, columns);
        container.append(layout);
    }

    function appendDisclosure(container, disclosure) {
        if (!disclosure) {
            return;
        }

        const disclosureContainer = createDialogElement('p', 'dialog-disclosure');
        const disclosureText = createDialogElement('span', 'dialog-disclosure__text', disclosure);

        disclosureContainer.append(disclosureText);
        container.append(disclosureContainer);
    }

    function appendResources(container, resources = []) {
        if (resources.length === 0) return;

        const section = createDialogElement('section', 'dialog-resource-section');
        const links = createDialogElement('div', 'dialog-resources');
        section.append(createDialogElement('h3', '', getTranslation('dialog.resources')));

        resources.forEach((resource) => {
            const link = createDialogElement('a', 'dialog-resource', resource.label);
            link.href = resource.href;
            link.target = '_blank';
            link.rel = 'noopener';
            links.append(link);
        });

        section.append(links);
        container.append(section);
    }

    function renderOverviewPage(container, entryId, data) {
        const details = Array.isArray(data.details) ? data.details : [];
        appendIntroduction(container, data);

        if (entryId === 'laprincesa' || entryId === 'celignis') {
            appendPracticeOverview(container, data);

            const body = createDialogElement('section', 'dialog-page-body');
            appendDisclosure(body, data.disclosure);
            container.append(body);
            return;
        }

        if (entryId === 'chitosan') {
            appendOverviewBand(container, [
                { title: getTranslation('dialog.problem'), body: data.problem },
                details[0],
                details[5],
                details[6]
            ]);

            const body = createDialogElement('section', 'dialog-page-body');
            appendSectionHeading(body, getTranslation('dialog.proposal'), getTranslation('dialog.evidenceHeading'));
            const grid = createDialogElement('div', 'dialog-editorial-grid');
            grid.append(
                createEditorialBlock(getTranslation('dialog.contribution'), data.contribution),
                createEditorialBlock(getTranslation('dialog.result'), data.result)
            );
            body.append(grid);
            container.append(body);
            return;
        }

        appendOverviewBand(container, [
            { title: getTranslation('dialog.problem'), body: data.problem },
            { title: getTranslation('dialog.contribution'), body: data.contribution },
            { title: getTranslation('dialog.result'), body: data.result },
            { title: getTranslation('dialog.next'), body: data.next }
        ]);

        if (dialogPageCounts[entryId] === 1) {
            const body = createDialogElement('section', 'dialog-page-body');
            appendDisclosure(body, data.disclosure);
            container.append(body);
        }
    }

    function renderPortfolioDetails(container, data, pageTitle) {
        appendPageHeader(container, data, pageTitle, data.summary);
        const body = createDialogElement('section', 'dialog-page-body');
        const grid = createDialogElement('div', 'dialog-editorial-grid dialog-editorial-grid--asymmetric');
        const details = data.details || [];

        grid.append(
            createEditorialBlock(details[0].title, details[0].body),
            createEditorialBlock(details[1].title, details[1].body),
            createEditorialBlock(details[2].title, details[2].body)
        );
        body.append(grid);
        appendResources(body, data.resources);
        appendDisclosure(body, data.disclosure);
        container.append(body);
    }

    function renderPhageDetails(container, data, pageTitle) {
        appendPageHeader(container, data, pageTitle, data.summary);
        const body = createDialogElement('section', 'dialog-page-body');
        const grid = createDialogElement('div', 'dialog-editorial-grid');
        const details = data.details || [];

        grid.append(
            createEditorialBlock(details[0].title, details[0].body),
            createEditorialBlock(details[1].title, details[1].body)
        );
        body.append(grid);
        appendResources(body, data.resources);
        appendDisclosure(body, data.disclosure);
        container.append(body);
    }

    function renderChitosanHypotheses(container, data, pageTitle) {
        appendPageHeader(container, data, pageTitle, getTranslation('dialog.hypothesesIntro'));
        const body = createDialogElement('section', 'dialog-page-body');
        const grid = createDialogElement('div', 'dialog-hypothesis-grid');
        const hypotheses = (data.details || []).slice(1, 5);

        hypotheses.forEach((hypothesis) => {
            const section = createDialogElement('section', 'dialog-hypothesis');
            section.append(
                createDialogElement('h3', '', hypothesis.title),
                createDialogElement('p', '', hypothesis.body)
            );
            grid.append(section);
        });

        body.append(grid);
        const nextGrid = createDialogElement('div', 'dialog-editorial-grid');
        nextGrid.append(
            createEditorialBlock(getTranslation('dialog.next'), data.next, 'dialog-editorial-block--wide')
        );
        body.append(nextGrid);

        const tags = createDialogElement('ul', 'dialog-tag-list');
        tags.setAttribute('aria-label', getTranslation('dialog.tags'));
        dialogTechnicalTags[currentLanguage].forEach((tag) => {
            tags.append(createDialogElement('li', '', tag));
        });
        body.append(tags);
        appendDisclosure(body, data.disclosure);
        container.append(body);
    }

    function renderDialogPage(entryId, pageIndex, data) {
        if (!dialogPageContent) return;
        dialogPageContent.replaceChildren();
        const pageTitles = getDialogPageTitles(entryId);

        if (pageIndex === 0) {
            renderOverviewPage(dialogPageContent, entryId, data);
            return;
        }

        if (entryId === 'portfolio') renderPortfolioDetails(dialogPageContent, data, pageTitles[pageIndex]);
        if (entryId === 'phage') renderPhageDetails(dialogPageContent, data, pageTitles[pageIndex]);
        if (entryId === 'chitosan') renderChitosanHypotheses(dialogPageContent, data, pageTitles[pageIndex]);
    }

    function populateDialogPageTab(entryId, pageIndex, pageCount) {
        if (!dialogPageTab) return;

        if (pageCount < 2) {
            dialogPageTab.hidden = true;
            return;
        }

        const otherPage = pageIndex === 0 ? 1 : 0;
        const pageTitles = getDialogPageTitles(entryId);
        const currentPosition = formatDialogText('dialog.pagePosition', {
            current: pageIndex + 1,
            total: pageCount
        });
        const nextPageLabel = `${getTranslation('dialog.pageShortLabel')} ${otherPage + 1}`;
        const direction = pageIndex === 0 ? '→' : '←';

        dialogPageTab.hidden = false;
        dialogPageTab.dataset.page = String(otherPage);

        if (dialogTabPosition) dialogTabPosition.textContent = currentPosition;
        if (dialogTabDirection) dialogTabDirection.textContent = direction;

        dialogPageTab.setAttribute('aria-label', formatDialogText('dialog.openPageNamed', {
            page: otherPage + 1,
            total: pageCount,
            title: pageTitles[otherPage]
        }));
        dialogPageTab.setAttribute('title', nextPageLabel);
    }

    function populateDialog(entryId, { resetScroll = true, page = 0 } = {}) {
        const data = entryData[currentLanguage]?.[entryId] || entryData.en[entryId];
        if (!dialog || !data || !dialogPageCounts[entryId]) return false;

        if (dialogAnnouncement) dialogAnnouncement.textContent = '';

        const pageCount = dialogPageCounts[entryId];
        const pageIndex = Math.max(0, Math.min(Number(page) || 0, pageCount - 1));
        dialog.dataset.entryId = entryId;
        dialog.dataset.page = String(pageIndex);
        dialog.classList.toggle('is-single-page', pageCount === 1);
        renderDialogPage(entryId, pageIndex, data);

        if (dialogNavigation) dialogNavigation.hidden = pageCount === 1;
        if (dialogPageTab) dialogPageTab.hidden = pageCount === 1;
        if (dialogPrevious) dialogPrevious.disabled = pageIndex === 0;
        if (dialogNext) dialogNext.disabled = pageIndex === pageCount - 1;

        const position = formatDialogText('dialog.pagePosition', {
            current: pageIndex + 1,
            total: pageCount
        });
        const positionNode = dialog.querySelector('[data-dialog-position]');
        if (positionNode) positionNode.textContent = position;
        if (dialogToolbarPosition) dialogToolbarPosition.textContent = position;
        populateDialogPageTab(entryId, pageIndex, pageCount);

        if (resetScroll && dialogScroll) dialogScroll.scrollTop = 0;
        return true;
    }

    function updateEntryHash(entryId, mode = 'replace') {
        const method = mode === 'push' ? 'pushState' : 'replaceState';
        window.history[method](null, '', `#entry-${entryId}`);
    }

    function focusDialogTitle() {
        dialog?.querySelector('[data-dialog-title]')?.focus({ preventScroll: true });
    }

    function announceDialogChange(entryId, pageIndex) {
        const pageCount = dialogPageCounts[entryId];
        const pageTitle = getDialogPageTitles(entryId)[pageIndex];
        if (!dialogAnnouncement || !pageTitle) return;

        dialogAnnouncement.textContent = '';
        dialogAnnouncement.textContent = formatDialogText('dialog.pageChanged', {
            current: pageIndex + 1,
            total: pageCount,
            title: pageTitle
        });
    }

    async function animateDialogChange(direction) {
        if (
            reduceDialogMotion.matches
            || typeof dialogPanel?.animate !== 'function'
        ) return;

        const offset = direction > 0 ? '-1rem' : '1rem';
        const animation = dialogPanel.animate(
            [
                { transform: 'translateY(0) scale(1)', opacity: 1 },
                { transform: `translate(${offset}, 0.55rem) scale(0.992)`, opacity: 0.5 }
            ],
            { duration: 130, easing: 'cubic-bezier(0.4, 0, 1, 1)', fill: 'forwards' }
        );
        await animation.finished.catch(() => {});
        animation.cancel();
    }

    function animateDialogArrival(direction) {
        if (reduceDialogMotion.matches || typeof dialogPanel?.animate !== 'function') return;

        const horizontalOffset = direction > 0 ? '1rem' : '-1rem';
        dialogPanel.animate(
            [
                { transform: `translate(${horizontalOffset}, 0.45rem) scale(0.994)`, opacity: 0.68 },
                { transform: 'translate(0, 0) scale(1)', opacity: 1 }
            ],
            { duration: 170, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }
        );
    }

    async function switchDialogPage(pageIndex) {
        const entryId = dialog?.dataset.entryId;
        const currentPage = Number(dialog?.dataset.page || 0);
        const pageCount = dialogPageCounts[entryId];
        if (!dialog?.open || dialogTransitioning || !pageCount) return;
        if (pageIndex < 0 || pageIndex >= pageCount || pageIndex === currentPage) return;

        dialogTransitioning = true;
        try {
            const direction = pageIndex > currentPage ? 1 : -1;
            await animateDialogChange(direction);
            if (!dialog.open) return;

            populateDialog(entryId, { page: pageIndex });
            announceDialogChange(entryId, pageIndex);
            focusDialogTitle();
            animateDialogArrival(direction);
        } finally {
            dialogTransitioning = false;
        }
    }

    function navigateDialog(offset) {
        const currentPage = Number(dialog?.dataset.page || 0);
        void switchDialogPage(currentPage + offset);
    }

    function restoreDialogFocus() {
        const focusTarget = lastDialogTrigger;
        lastDialogTrigger = null;

        if (focusTarget?.isConnected && typeof focusTarget.focus === 'function') {
            focusTarget.focus();
        }
    }

    function closeEntryDialog({ restoreHash = true } = {}) {
        if (!dialog) return;

        if (restoreHash && hashToEntry[window.location.hash]) {
            const target = `${window.location.pathname}${window.location.search}${dialogReturnHash}`;
            window.history.replaceState(null, '', target);
        }

        if (typeof dialog.close === 'function' && dialog.open) {
            dialog.close();
        } else if (dialog.hasAttribute('open')) {
            dialog.removeAttribute('open');
            document.body.classList.remove('is-entry-dialog-open');
            syncCarouselRotation?.();
            restoreDialogFocus();
            dialogReturnHash = '';
        }
    }

    const hashToEntry = {
        '#entry-deutschos': 'deutschos',
        '#entry-portfolio': 'portfolio',
        '#entry-laprincesa': 'laprincesa',
        '#entry-celignis': 'celignis',
        '#entry-phage': 'phage',
        '#entry-chitosan': 'chitosan',
        '#deutschos': 'deutschos',
        '#portfolio': 'portfolio',
        '#laprincesa': 'laprincesa',
        '#celignis': 'celignis',
        '#phage': 'phage',
        '#chitosan': 'chitosan'
    };

    function openEntryDialog(entryId, trigger = null, { updateHash = true } = {}) {
        if (!entryData.en[entryId] || !dialog) return;

        if (dialog.open) {
            populateDialog(entryId, { page: 0 });
            if (updateHash) updateEntryHash(entryId);
            focusDialogTitle();
            return;
        }

        lastDialogTrigger = trigger;
        dialogReturnHash = hashToEntry[window.location.hash] ? '' : window.location.hash;
        populateDialog(entryId);

        if (typeof dialog.showModal === 'function' && !dialog.open) {
            dialog.showModal();
        } else if (!dialog.open) {
            dialog.setAttribute('open', '');
        }

        document.body.classList.add('is-entry-dialog-open');
        if (updateHash) updateEntryHash(entryId, 'push');
        focusDialogTitle();
        syncCarouselRotation?.();
    }

    function handleEntryHash() {
        const entryId = hashToEntry[window.location.hash];
        if (!entryId) {
            if (dialog?.open) closeEntryDialog({ restoreHash: false });
            return;
        }

        const trigger = document.querySelector(`#entry-${entryId} [data-entry-open="${entryId}"]`)
            || document.querySelector(`[data-entry-open="${entryId}"]`);
        openEntryDialog(entryId, trigger, { updateHash: false });
    }

    document.querySelectorAll('[data-entry-open]').forEach((button) => {
        button.addEventListener('click', () => openEntryDialog(button.dataset.entryOpen, button));
    });

    dialogPrevious?.addEventListener('click', () => navigateDialog(-1));
    dialogNext?.addEventListener('click', () => navigateDialog(1));
    dialogPageTab?.addEventListener('click', () => {
        void switchDialogPage(Number(dialogPageTab.dataset.page));
    });
    dialogPageTab?.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        void switchDialogPage(Number(dialogPageTab.dataset.page));
    });
    dialogClose?.addEventListener('click', () => closeEntryDialog());
    dialog?.addEventListener('cancel', (event) => {
        event.preventDefault();
        closeEntryDialog();
    });
    dialog?.addEventListener('click', (event) => {
        const clickTarget = event.target;
        if (!(clickTarget instanceof Element)) return;
        if (clickTarget.closest('[data-dialog-panel], [data-dialog-page-tab]')) return;
        closeEntryDialog();
    });
    dialog?.addEventListener('close', () => {
        document.body.classList.remove('is-entry-dialog-open');
        syncCarouselRotation?.();
        restoreDialogFocus();
        dialogReturnHash = '';
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape' || !dialog?.open) return;
        event.preventDefault();
        closeEntryDialog();
    });

    const revealElements = Array.from(document.querySelectorAll('[data-reveal]'));
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((records) => {
            records.forEach((record) => {
                if (record.isIntersecting) {
                    record.target.classList.add('is-visible');
                    observer.unobserve(record.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
        revealElements.forEach((element) => observer.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add('is-visible'));
    }

    translatePage();
    handleEntryHash();
    window.addEventListener('hashchange', handleEntryHash);
})();
