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
                openPhageEntry: 'Open bacteriophage therapy entry',
                openChitosanEntry: 'Open chitosan and microplastics entry',
                footerNotice: 'Copyright, authorship and scientific notice',
                closeEntry: 'Close entry'
            },
            nav: { profile: 'Professional profile', featured: 'Featured', entries: 'Entries', principles: 'Method' },
            hero: {
                eyebrow: 'Independent projects · scientific notes · applied learning',
                title: 'A living space for<br><span>building, testing and learning.</span>',
                intro: 'The Workbench documents selected projects and scientific thinking with clear authorship, evidence, limitations and next steps.',
                explore: 'Explore featured work', profile: 'View professional profile'
            },
            status: {
                label: 'Workbench status', focusLabel: 'Current focus',
                focusValue: 'DeutschOS and portfolio development', aiLabel: 'AI disclosure',
                aiValue: 'Technical or editorial support is disclosed; scientific judgement is not delegated'
            },
            areas: { projects: 'Projects', research: 'Research notes', learning: 'Technical & learning', milestones: 'Milestones' },
            featured: {
                kicker: 'Featured', title: 'Work that best represents how I think and build.',
                intro: 'Each entry separates the real contribution, current maturity, evidence and unresolved work.',
                carouselHelp: 'Four featured entries rotate automatically. Use the controls to move, pause or resume the carousel.',
                dotsLabel: 'Featured entries', previous: 'Previous featured entry', next: 'Next featured entry',
                pauseRotation: 'Pause featured carousel', resumeRotation: 'Resume featured carousel',
                pauseRotationLabel: 'Pause featured carousel', resumeRotationLabel: 'Resume featured carousel',
                show1: 'Show entry 1', show2: 'Show entry 2', show3: 'Show entry 3', show4: 'Show entry 4',
                slide1: 'Entry 1 of 4', slide2: 'Entry 2 of 4', slide3: 'Entry 3 of 4', slide4: 'Entry 4 of 4'
            },
            categories: { project: 'Project', research: 'Research note' },
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
                    title: 'Chitosan, Biofilms & Microplastics',
                    summary: 'An early-stage, literature-informed hypothesis framed for future controlled laboratory study.',
                    contribution: 'Concept development, testable questions, possible methods and scientifically cautious communication.',
                    evidence: 'Conceptual proposal only; no experimental or clinical validation is claimed.',
                    tagHypothesis: 'Hypothesis', tagValidation: 'Requires validation'
                }
            },
            entries: { kicker: 'Workbench index', title: 'A clear index of projects, notes and progress.' },
            filters: { all: 'All', projects: 'Projects', research: 'Research notes', learning: 'Technical & learning', milestones: 'Milestones', empty: 'No entries are available in this category yet.' },
            entriesData: {
                deutschos: 'Local German-learning environment focused on usable progress, laboratory vocabulary and transparent correction.',
                portfolio: 'Published multilingual portfolio for recruiters, laboratories and scientific collaborators.',
                phage: 'Co-authored academic literature review on phage therapy, its applications, limitations and regulatory barriers.',
                chitosan: 'Early-stage, literature-informed hypothesis proposed for future controlled laboratory validation.'
            },
            principles: {
                kicker: 'Documentation approach', title: 'Documenting the work, not just displaying the result.',
                intro: 'An entry belongs here only when it demonstrates a real question, contribution, result or learning outcome.',
                authorship: { title: 'Clear authorship', body: 'Decisions, contributions, reviews and tests are identified explicitly.' },
                evidence: { title: 'Evidence before claims', body: 'Published evidence, interpretation, hypotheses and experimental results are kept separate.' },
                limitations: { title: 'Visible limitations', body: 'Unresolved questions, missing validation and technical constraints remain part of the entry.' },
                ai: { title: 'Transparent AI use', body: 'AI use is disclosed when it materially supports programming, source discovery and organisation, or editing. Research questions, evidence selection, scientific interpretation and final decisions are not delegated to AI.' }
            },
            footer: { copyright: '© 2026 Jhon M. Cuenca. All rights reserved.', notice: 'JMC · Workbench documents selected projects, scientific notes and applied learning.', scientificNotice: 'Scientific notes distinguish published evidence, interpretation, hypotheses and limitations.' },
            dialog: { problem: 'Problem or motivation', contribution: 'Real contribution', result: 'Result or evidence', next: 'Limitations and next steps' }
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
                openPhageEntry: 'Abrir entrada sobre bacteriofagoterapia',
                openChitosanEntry: 'Abrir entrada sobre quitosano y microplásticos',
                footerNotice: 'Aviso de derechos, autoría y nota científica',
                closeEntry: 'Cerrar entrada'
            },
            nav: { profile: 'Perfil profesional', featured: 'Destacado', entries: 'Entradas', principles: 'Método' },
            hero: {
                eyebrow: 'Proyectos independientes · notas científicas · aprendizaje aplicado',
                title: 'Un espacio vivo para<br><span>construir, probar y aprender.</span>',
                intro: 'El Workbench documenta proyectos seleccionados y pensamiento científico con autoría, evidencia, limitaciones y próximos pasos claramente definidos.',
                explore: 'Explorar trabajos destacados', profile: 'Ver perfil profesional'
            },
            status: {
                label: 'Estado del Workbench', focusLabel: 'Enfoque actual',
                focusValue: 'Desarrollo de DeutschOS y del portafolio', aiLabel: 'Transparencia sobre IA',
                aiValue: 'El apoyo técnico o editorial se declara; el criterio científico no se delega'
            },
            areas: { projects: 'Proyectos', research: 'Notas de investigación', learning: 'Técnica y aprendizaje', milestones: 'Hitos' },
            featured: {
                kicker: 'Destacado', title: 'Trabajos que representan mejor cómo pienso y construyo.',
                intro: 'Cada entrada separa la contribución real, la madurez actual, la evidencia y el trabajo pendiente.',
                carouselHelp: 'Cuatro entradas destacadas rotan automáticamente. Usa los controles para moverte, pausar o reanudar el carrusel.',
                dotsLabel: 'Entradas destacadas', previous: 'Entrada destacada anterior', next: 'Siguiente entrada destacada',
                pauseRotation: 'Pausar carrusel destacado', resumeRotation: 'Reanudar carrusel destacado',
                pauseRotationLabel: 'Pausar carrusel destacado', resumeRotationLabel: 'Reanudar carrusel destacado',
                show1: 'Mostrar entrada 1', show2: 'Mostrar entrada 2', show3: 'Mostrar entrada 3', show4: 'Mostrar entrada 4',
                slide1: 'Entrada 1 de 4', slide2: 'Entrada 2 de 4', slide3: 'Entrada 3 de 4', slide4: 'Entrada 4 de 4'
            },
            categories: { project: 'Proyecto', research: 'Nota de investigación' },
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
                    summary: 'Revisión académica coautorizada sobre la fagoterapia, sus aplicaciones clínicas, limitaciones y barreras regulatorias.',
                    contribution: 'Revisión bibliográfica, redacción científica, estructura del proyecto, desarrollo conceptual y preparación de la defensa.',
                    evidence: 'Proyecto académico completado de 61 páginas y material de presentación.',
                    tagReview: 'Revisión bibliográfica', tagCoauthored: 'Coautorizado'
                },
                chitosan: {
                    title: 'Quitosano, biofilms y microplásticos',
                    summary: 'Hipótesis preliminar basada en literatura y planteada para un futuro estudio controlado en laboratorio.',
                    contribution: 'Desarrollo del concepto, preguntas comprobables, posibles métodos y comunicación científicamente prudente.',
                    evidence: 'Solo es una propuesta conceptual; no se afirma validación experimental ni clínica.',
                    tagHypothesis: 'Hipótesis', tagValidation: 'Requiere validación'
                }
            },
            entries: { kicker: 'Índice del Workbench', title: 'Un índice claro de proyectos, notas y avances.' },
            filters: { all: 'Todo', projects: 'Proyectos', research: 'Notas de investigación', learning: 'Técnica y aprendizaje', milestones: 'Hitos', empty: 'Todavía no hay entradas disponibles en esta categoría.' },
            entriesData: {
                deutschos: 'Entorno local de aprendizaje de alemán centrado en progreso útil, vocabulario de laboratorio y corrección transparente.',
                portfolio: 'Portafolio multilingüe publicado para reclutadores, laboratorios y colaboradores científicos.',
                phage: 'Revisión académica coautorizada sobre la fagoterapia, sus aplicaciones, limitaciones y barreras regulatorias.',
                chitosan: 'Hipótesis preliminar basada en literatura y propuesta para una futura validación controlada en laboratorio.'
            },
            principles: {
                kicker: 'Cómo se documenta', title: 'Documentar el trabajo, no solo mostrar el resultado.',
                intro: 'Una entrada solo pertenece aquí cuando demuestra una pregunta, contribución, resultado o aprendizaje real.',
                authorship: { title: 'Autoría clara', body: 'Las decisiones, aportaciones, revisiones y pruebas se identifican de forma explícita.' },
                evidence: { title: 'Evidencia antes que afirmaciones', body: 'La evidencia publicada, la interpretación, las hipótesis y los resultados experimentales se mantienen separados.' },
                limitations: { title: 'Limitaciones visibles', body: 'Las preguntas abiertas, la validación pendiente y las restricciones técnicas siguen formando parte de la entrada.' },
                ai: { title: 'Uso transparente de IA', body: 'El uso de IA se indica cuando apoya de forma material la programación, la búsqueda y organización de fuentes o la edición. Las preguntas de investigación, la selección de evidencia, la interpretación científica y las decisiones finales no se delegan en la IA.' }
            },
            footer: { copyright: '© 2026 Jhon M. Cuenca. Todos los derechos reservados.', notice: 'JMC · Workbench documenta proyectos seleccionados, notas científicas y aprendizaje aplicado.', scientificNotice: 'Las notas científicas distinguen evidencia publicada, interpretación, hipótesis y limitaciones.' },
            dialog: { problem: 'Problema o motivación', contribution: 'Contribución real', result: 'Resultado o evidencia', next: 'Limitaciones y próximos pasos' }
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
                openPhageEntry: 'Eintrag zur Bakteriophagentherapie öffnen',
                openChitosanEntry: 'Eintrag zu Chitosan und Mikroplastik öffnen',
                footerNotice: 'Hinweis zu Urheberrecht, Autorenschaft und Wissenschaft',
                closeEntry: 'Eintrag schließen'
            },
            nav: { profile: 'Berufsprofil', featured: 'Auswahl', entries: 'Einträge', principles: 'Methode' },
            hero: {
                eyebrow: 'Eigene Projekte · wissenschaftliche Notizen · angewandtes Lernen',
                title: 'Ein lebendiger Raum zum<br><span>Entwickeln, Prüfen und Lernen.</span>',
                intro: 'Die Workbench dokumentiert ausgewählte Projekte und wissenschaftliches Denken mit klarer Urheberschaft, Evidenz, Grenzen und nächsten Schritten.',
                explore: 'Ausgewählte Arbeiten ansehen', profile: 'Berufsprofil öffnen'
            },
            status: {
                label: 'Workbench-Status', focusLabel: 'Aktueller Schwerpunkt',
                focusValue: 'Entwicklung von DeutschOS und Portfolio', aiLabel: 'KI-Transparenz',
                aiValue: 'Technische oder redaktionelle Unterstützung wird offengelegt; die wissenschaftliche Bewertung wird nicht delegiert'
            },
            areas: { projects: 'Projekte', research: 'Forschungsnotizen', learning: 'Technik & Lernen', milestones: 'Meilensteine' },
            featured: {
                kicker: 'Auswahl', title: 'Arbeiten, die meine Denk- und Arbeitsweise am besten zeigen.',
                intro: 'Jeder Eintrag trennt den tatsächlichen Beitrag, Reifegrad, Evidenz und offene Arbeit.',
                carouselHelp: 'Vier ausgewählte Einträge wechseln automatisch. Mit den Steuerelementen kannst du das Karussell bewegen, pausieren oder fortsetzen.',
                dotsLabel: 'Ausgewählte Einträge', previous: 'Vorheriger ausgewählter Eintrag', next: 'Nächster ausgewählter Eintrag',
                pauseRotation: 'Ausgewähltes Karussell pausieren', resumeRotation: 'Ausgewähltes Karussell fortsetzen',
                pauseRotationLabel: 'Ausgewähltes Karussell pausieren', resumeRotationLabel: 'Ausgewähltes Karussell fortsetzen',
                show1: 'Eintrag 1 anzeigen', show2: 'Eintrag 2 anzeigen', show3: 'Eintrag 3 anzeigen', show4: 'Eintrag 4 anzeigen',
                slide1: 'Eintrag 1 von 4', slide2: 'Eintrag 2 von 4', slide3: 'Eintrag 3 von 4', slide4: 'Eintrag 4 von 4'
            },
            categories: { project: 'Projekt', research: 'Forschungsnotiz' },
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
                    title: 'Chitosan, Biofilme & Mikroplastik',
                    summary: 'Eine frühe, literaturbasierte Hypothese für eine spätere kontrollierte Untersuchung im Labor.',
                    contribution: 'Konzeptentwicklung, prüfbare Fragen, mögliche Methoden und wissenschaftlich vorsichtige Kommunikation.',
                    evidence: 'Nur ein konzeptioneller Vorschlag; es wird keine experimentelle oder klinische Validierung behauptet.',
                    tagHypothesis: 'Hypothese', tagValidation: 'Validierung erforderlich'
                }
            },
            entries: { kicker: 'Workbench-Index', title: 'Ein klarer Überblick über Projekte, Notizen und Fortschritte.' },
            filters: { all: 'Alle', projects: 'Projekte', research: 'Forschungsnotizen', learning: 'Technik & Lernen', milestones: 'Meilensteine', empty: 'In dieser Kategorie sind noch keine Einträge verfügbar.' },
            entriesData: {
                deutschos: 'Lokale Deutsch-Lernumgebung mit Fokus auf nutzbaren Fortschritt, Laborwortschatz und transparente Korrektur.',
                portfolio: 'Veröffentlichtes mehrsprachiges Portfolio für Recruiter, Labore und wissenschaftliche Kontakte.',
                phage: 'Gemeinsam verfasste akademische Literaturübersicht zu Phagentherapie, Anwendungen, Grenzen und regulatorischen Hürden.',
                chitosan: 'Frühe, literaturbasierte Hypothese für eine spätere kontrollierte Validierung im Labor.'
            },
            principles: {
                kicker: 'Dokumentationsprinzip', title: 'Die Arbeit dokumentieren, nicht nur das Ergebnis zeigen.',
                intro: 'Ein Eintrag gehört nur hierher, wenn er eine echte Frage, einen Beitrag, ein Ergebnis oder einen Lernerfolg zeigt.',
                authorship: { title: 'Klare Urheberschaft', body: 'Entscheidungen, Beiträge, Prüfungen und Tests werden ausdrücklich gekennzeichnet.' },
                evidence: { title: 'Evidenz vor Behauptungen', body: 'Publizierte Evidenz, Interpretation, Hypothesen und experimentelle Ergebnisse werden getrennt dargestellt.' },
                limitations: { title: 'Sichtbare Grenzen', body: 'Offene Fragen, fehlende Validierung und technische Einschränkungen bleiben Teil des Eintrags.' },
                ai: { title: 'Transparenter KI-Einsatz', body: 'Der Einsatz von KI wird offengelegt, wenn sie Programmierung, Quellenrecherche und -organisation oder redaktionelle Arbeit wesentlich unterstützt. Forschungsfragen, Evidenzauswahl, wissenschaftliche Interpretation und Endentscheidungen werden nicht an KI delegiert.' }
            },
            footer: { copyright: '© 2026 Jhon M. Cuenca. Alle Rechte vorbehalten.', notice: 'JMC · Workbench dokumentiert ausgewählte Projekte, wissenschaftliche Notizen und angewandtes Lernen.', scientificNotice: 'Wissenschaftliche Notizen unterscheiden publizierte Evidenz, Interpretation, Hypothesen und Grenzen.' },
            dialog: { problem: 'Problem oder Motivation', contribution: 'Tatsächlicher Beitrag', result: 'Ergebnis oder Nachweis', next: 'Grenzen und nächste Schritte' }
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
                disclosure: 'AI disclosure: programming and parts of content structuring are assisted by Codex and ChatGPT. Requirements, review, testing and final decisions are not delegated.'
            },
            portfolio: {
                category: 'Project · Milestone', status: 'Functional', title: 'Scientific Portfolio',
                summary: 'A multilingual static website designed to communicate a laboratory profile clearly to recruiters and scientific teams.',
                problem: 'Spanish vocational qualifications and mixed clinical, biomedical and analytical experience require careful explanation in an international context.',
                contribution: 'Responsibility for professional content, publication decisions, functional requirements, wording and scientific-claim review, site testing, and product and visual decisions.',
                result: 'The site is published through GitHub Pages with English, German and Spanish support and accessible professional sections.',
                next: 'The next stage is to separate the concise professional profile from a richer Workbench without weakening the clarity of the homepage.',
                disclosure: 'AI disclosure: implementation and editorial support are AI-assisted. Professional facts, final content decisions and approval are not delegated.'
            },
            phage: {
                category: 'Research note · Milestone', status: 'Completed', title: 'Bacteriophage Therapy',
                summary: 'A co-authored final academic project reviewing bacteriophage therapy and framing future research questions.',
                problem: 'Antimicrobial resistance has renewed interest in bacteriophages, but clinical use still involves scientific, manufacturing and regulatory limitations.',
                contribution: 'Participation in the literature review, scientific writing, project structure, conceptual development and defence preparation. Co-authorship is explicitly credited.',
                result: 'A completed 61-page academic project and defense material. It is a literature review, not an experimental or clinical study.',
                next: 'Any original future-oriented concepts derived from the review require separate experimental validation and should not be presented as demonstrated treatments.',
                disclosure: 'Authorship note: this project was co-authored with Luis Gonzalo Legua Pérez and is presented with co-author permission.'
            },
            chitosan: {
                category: 'Research note', status: 'Concept', title: 'Chitosan, Biofilms & Microplastics',
                summary: 'An early-stage concept exploring how chitosan-based materials and biofilm information could be studied in controlled microplastic models.',
                problem: 'Potential biomedical interactions with microplastics remain difficult to interpret and require reproducible analytical models before clinical conclusions are possible.',
                contribution: 'Development of the concept, formulation of testable hypotheses, proposal of possible methods and scientifically cautious communication.',
                result: 'A literature-informed proposal only. No experimental validation, therapeutic efficacy or clinical result is claimed.',
                next: 'Possible next steps would include defined microplastic models, material characterization, adsorption controls, biocompatibility testing and independent scientific review.',
                disclosure: 'Scientific limitation: this entry is a hypothesis and requires in vitro validation, toxicity assessment and reproducible controls.'
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
                disclosure: 'Transparencia sobre IA: Codex y ChatGPT apoyan la programación y parte de la estructura de contenidos. Los requisitos, la revisión, las pruebas y las decisiones finales no se delegan.'
            },
            portfolio: {
                category: 'Proyecto · Hito', status: 'Funcional', title: 'Portafolio científico',
                summary: 'Una web estática multilingüe diseñada para comunicar con claridad un perfil de laboratorio a reclutadores y equipos científicos.',
                problem: 'Las titulaciones profesionales españolas y la experiencia clínica, biomédica y analítica necesitan explicarse con cuidado en un contexto internacional.',
                contribution: 'Responsabilidad sobre el contenido profesional, las decisiones de publicación, los requisitos funcionales, la revisión del lenguaje y de las afirmaciones científicas, las pruebas de la web y las decisiones de producto y diseño.',
                result: 'La web está publicada mediante GitHub Pages, tiene soporte en inglés, alemán y español y presenta secciones profesionales accesibles.',
                next: 'La siguiente etapa consiste en separar el perfil profesional conciso de un Workbench más rico sin debilitar la claridad de la portada.',
                disclosure: 'Transparencia sobre IA: la implementación y el apoyo editorial están asistidos por IA. Los datos profesionales, las decisiones finales y la aprobación no se delegan.'
            },
            phage: {
                category: 'Nota de investigación · Hito', status: 'Completado', title: 'Bacteriofagoterapia',
                summary: 'Proyecto académico final coautorizado que revisa la fagoterapia y plantea futuras preguntas de investigación.',
                problem: 'La resistencia antimicrobiana ha renovado el interés por los bacteriófagos, aunque su uso clínico todavía presenta limitaciones científicas, de fabricación y regulatorias.',
                contribution: 'Participación en la revisión bibliográfica, la redacción científica, la estructura del proyecto, el desarrollo conceptual y la preparación de la defensa. La coautoría se acredita de forma explícita.',
                result: 'Proyecto académico completado de 61 páginas y material de defensa. Es una revisión bibliográfica, no un estudio experimental ni clínico.',
                next: 'Cualquier concepto original derivado de la revisión requiere validación experimental independiente y no debe presentarse como tratamiento demostrado.',
                disclosure: 'Nota de autoría: este proyecto fue coautorizado con Luis Gonzalo Legua Pérez y se publica con permiso del coautor.'
            },
            chitosan: {
                category: 'Nota de investigación', status: 'Concepto', title: 'Quitosano, biofilms y microplásticos',
                summary: 'Concepto preliminar sobre cómo podrían estudiarse materiales basados en quitosano e información de biofilms en modelos controlados de microplásticos.',
                problem: 'Las posibles interacciones biomédicas con microplásticos siguen siendo difíciles de interpretar y requieren modelos analíticos reproducibles antes de extraer conclusiones clínicas.',
                contribution: 'Desarrollo del concepto, formulación de hipótesis comprobables, propuesta de posibles métodos y comunicación con prudencia científica explícita.',
                result: 'Es únicamente una propuesta basada en literatura. No se afirma validación experimental, eficacia terapéutica ni resultado clínico.',
                next: 'Los posibles siguientes pasos incluirían modelos definidos de microplásticos, caracterización de materiales, controles de adsorción, pruebas de biocompatibilidad y revisión científica independiente.',
                disclosure: 'Limitación científica: esta entrada es una hipótesis y requiere validación in vitro, evaluación de toxicidad y controles reproducibles.'
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
                disclosure: 'KI-Transparenz: Codex und ChatGPT unterstützen Programmierung und teilweise Inhaltsstruktur. Anforderungen, Prüfung, Tests und Endentscheidungen werden nicht delegiert.'
            },
            portfolio: {
                category: 'Projekt · Meilenstein', status: 'Funktionsfähig', title: 'Wissenschaftliches Portfolio',
                summary: 'Eine mehrsprachige statische Website, die ein Laborprofil klar für Recruiter und wissenschaftliche Teams vermittelt.',
                problem: 'Spanische Berufsabschlüsse sowie klinische, biomedizinische und analytische Erfahrung müssen im internationalen Kontext sorgfältig erklärt werden.',
                contribution: 'Verantwortung für berufliche Inhalte, Veröffentlichungsentscheidungen, funktionale Anforderungen, die Prüfung von Formulierungen und wissenschaftlichen Aussagen, Website-Tests sowie Produkt- und Designentscheidungen.',
                result: 'Die Website ist über GitHub Pages veröffentlicht, unterstützt Englisch, Deutsch und Spanisch und bietet zugängliche professionelle Bereiche.',
                next: 'Der nächste Schritt ist die Trennung des kompakten Berufsprofils von einer umfangreicheren Workbench, ohne die Klarheit der Startseite zu schwächen.',
                disclosure: 'KI-Transparenz: Implementierung und redaktionelle Unterstützung sind KI-gestützt. Berufliche Fakten, Endentscheidungen und Freigabe werden nicht delegiert.'
            },
            phage: {
                category: 'Forschungsnotiz · Meilenstein', status: 'Abgeschlossen', title: 'Bakteriophagentherapie',
                summary: 'Eine gemeinsam verfasste Abschlussarbeit mit Literaturübersicht zur Phagentherapie und zukünftigen Forschungsfragen.',
                problem: 'Antimikrobielle Resistenz hat das Interesse an Bakteriophagen erneuert, doch die klinische Anwendung unterliegt weiterhin wissenschaftlichen, herstellungsbezogenen und regulatorischen Grenzen.',
                contribution: 'Mitwirkung an Literaturrecherche, wissenschaftlichem Schreiben, Projektstruktur, konzeptioneller Entwicklung und Vorbereitung der Verteidigung. Die gemeinsame Urheberschaft wird klar ausgewiesen.',
                result: 'Eine abgeschlossene 61-seitige akademische Arbeit mit Verteidigungsmaterial. Es handelt sich um eine Literaturübersicht, nicht um eine experimentelle oder klinische Studie.',
                next: 'Aus der Übersicht abgeleitete neue Konzepte benötigen eine separate experimentelle Validierung und dürfen nicht als nachgewiesene Behandlung dargestellt werden.',
                disclosure: 'Urheberschaft: Dieses Projekt wurde gemeinsam mit Luis Gonzalo Legua Pérez verfasst und mit Zustimmung des Mitautors veröffentlicht.'
            },
            chitosan: {
                category: 'Forschungsnotiz', status: 'Konzept', title: 'Chitosan, Biofilme & Mikroplastik',
                summary: 'Ein frühes Konzept zur kontrollierten Untersuchung chitosanbasierter Materialien und biofilmbezogener Informationen in Mikroplastikmodellen.',
                problem: 'Mögliche biomedizinische Wechselwirkungen mit Mikroplastik sind schwer zu interpretieren und benötigen reproduzierbare analytische Modelle vor klinischen Schlussfolgerungen.',
                contribution: 'Entwicklung des Konzepts, Formulierung prüfbarer Hypothesen, Vorschlag möglicher Methoden und wissenschaftlich vorsichtige Kommunikation.',
                result: 'Nur ein literaturbasierter Vorschlag. Es werden keine experimentelle Validierung, therapeutische Wirksamkeit oder klinischen Ergebnisse behauptet.',
                next: 'Mögliche nächste Schritte wären definierte Mikroplastikmodelle, Materialcharakterisierung, Adsorptionskontrollen, Biokompatibilitätstests und unabhängige wissenschaftliche Prüfung.',
                disclosure: 'Wissenschaftliche Grenze: Dieser Eintrag ist eine Hypothese und benötigt In-vitro-Validierung, Toxizitätsprüfung und reproduzierbare Kontrollen.'
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
        if (dialog.open && dialog.dataset.entryId) populateDialog(dialog.dataset.entryId);
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

            if (emptyState) emptyState.hidden = visibleCount > 0;
        });
    });

    const dialog = document.querySelector('[data-entry-dialog]');
    const dialogClose = document.querySelector('[data-dialog-close]');
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

        dialog?.addEventListener('close', syncRotation);

        updatePauseButton();
        updateCarousel();
        syncRotation();
    }

    function populateDialog(entryId) {
        const data = entryData[currentLanguage]?.[entryId] || entryData.en[entryId];
        if (!data) return;

        dialog.dataset.entryId = entryId;
        dialog.querySelector('[data-dialog-category]').textContent = data.category;
        dialog.querySelector('[data-dialog-status]').textContent = data.status;
        dialog.querySelector('[data-dialog-title]').textContent = data.title;
        dialog.querySelector('[data-dialog-summary]').textContent = data.summary;
        dialog.querySelector('[data-dialog-problem]').textContent = data.problem;
        dialog.querySelector('[data-dialog-contribution]').textContent = data.contribution;
        dialog.querySelector('[data-dialog-result]').textContent = data.result;
        dialog.querySelector('[data-dialog-next]').textContent = data.next;
        dialog.querySelector('[data-dialog-disclosure]').textContent = data.disclosure;
    }

    document.querySelectorAll('[data-entry-open]').forEach((button) => {
        button.addEventListener('click', () => {
            populateDialog(button.dataset.entryOpen);
            if (typeof dialog.showModal === 'function') dialog.showModal();
            else dialog.setAttribute('open', '');
            syncCarouselRotation?.();
        });
    });

    dialogClose?.addEventListener('click', () => {
        if (!dialog) return;
        if (typeof dialog.close === 'function') dialog.close();
        else if (dialog.hasAttribute('open')) {
            dialog.removeAttribute('open');
            syncCarouselRotation?.();
        }
    });
    dialog?.addEventListener('cancel', () => {
        window.setTimeout(() => {
            syncCarouselRotation?.();
        }, 0);
    });
    dialog?.addEventListener('click', (event) => {
        if (event.target !== dialog) return;

        if (typeof dialog.close === 'function') dialog.close();
        else if (dialog.hasAttribute('open')) {
            dialog.removeAttribute('open');
            syncCarouselRotation?.();
        }
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
})();
