from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

ROOT = Path('.')
BASE = 'd7d3d3ce21b6531f512415293fafaea73691e422'


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding='utf-8')


def write(path: str, content: str) -> None:
    target = ROOT / path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content, encoding='utf-8')


def insert_once(text: str, anchor: str, insertion: str, label: str) -> str:
    count = text.count(anchor)
    if count != 1:
        raise SystemExit(f'{label}: expected anchor once, found {count}')
    return text.replace(anchor, anchor + insertion, 1)


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'{label}: expected replacement source once, found {count}')
    return text.replace(old, new, 1)


index = read('index.html')
structured_data = '''
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": "https://cuenca-john1999.github.io/#profile-page",
      "url": "https://cuenca-john1999.github.io/",
      "mainEntity": {
        "@type": "Person",
        "@id": "https://cuenca-john1999.github.io/#person",
        "name": "Jhon M. Cuenca",
        "url": "https://cuenca-john1999.github.io/",
        "description": "Clinical and biomedical laboratory profile with practical experience in molecular biology, immunology, analytical laboratory work and scientific documentation.",
        "knowsAbout": [
          "Clinical and biomedical laboratory science",
          "Molecular biology",
          "Immunology",
          "PCR",
          "ELISA",
          "Western blot",
          "Cell culture",
          "Analytical laboratory work",
          "Good Laboratory Practice",
          "SOP documentation"
        ]
      }
    }
    </script>
'''
index = insert_once(
    index,
    '    <meta name="twitter:image:alt" content="Jhon M. Cuenca scientific portfolio banner with a blue DNA helix, laboratory disciplines and a microscope.">\n',
    structured_data,
    'index structured data',
)

old_privacy_note = '                            <p class="contact-status contact-form__note" data-i18n="contactForm.privacy">This form uses Web3Forms to transmit your name, email and message for professional contact. Please send only information needed for your enquiry.</p>'
new_privacy_note = '''                            <p class="contact-status contact-form__note">
                                <span data-i18n="contactForm.privacy">This form uses Web3Forms to transmit your name, email and message for professional contact. Please send only information needed for your enquiry.</span>
                                <a class="document-link" href="privacy.html" data-i18n="contactForm.privacyCta">Read privacy information</a>
                            </p>'''
index = replace_once(index, old_privacy_note, new_privacy_note, 'contact privacy link')

footer_anchor = '                <p data-i18n="footer.scientificNotice">Scientific hypotheses are presented for educational and professional portfolio purposes only; they do not represent validated clinical treatments.</p>\n'
index = insert_once(
    index,
    footer_anchor,
    '                <p><a class="document-link" href="privacy.html" data-i18n="footer.privacy">Privacy</a></p>\n',
    'footer privacy link',
)
index = index.replace('assets/js/language.js?v=20260807-audit-integrity', 'assets/js/language.js?v=20260807-professionalization-audit')
write('index.html', index)

language_js = read('assets/js/language.js')
language_js = replace_once(
    language_js,
    "const TRANSLATION_VERSION = '20260807-audit-integrity';",
    "const TRANSLATION_VERSION = '20260807-professionalization-audit';",
    'translation cache version',
)
write('assets/js/language.js', language_js)

additions = {
    'en': {
        'privacyCta': 'Read privacy information',
        'footerPrivacy': 'Privacy',
        'privacyPage': {
            'kicker': 'Privacy',
            'title': 'Privacy information for professional contact.',
            'intro': 'This page explains the current data flow when the portfolio contact form is used.',
            'back': 'Back to professional profile',
            'controllerTitle': 'Controller',
            'controllerBody': 'Jhon M. Cuenca is responsible for the personal data submitted through this portfolio contact form. Contact is available through the professional contact form on the portfolio.',
            'dataTitle': 'Data collected',
            'dataBody': 'The form asks for your name, email address and message. Please send only information needed for your professional enquiry.',
            'purposeTitle': 'Purpose and legal basis',
            'purposeBody': 'The information is used to receive and respond to professional enquiries, laboratory opportunities, research-related contact or collaboration requests. Depending on the context, processing may be necessary for steps requested before a potential contract and/or for the legitimate interest of responding to professional correspondence.',
            'providerTitle': 'Form provider and international processing',
            'providerBody': 'The contact form is transmitted through Web3Forms. Web3Forms states in its public documentation that its servers are located in the United States (US-East). Provider-side processing and retention are governed by Web3Forms current service information.',
            'retentionTitle': 'Retention',
            'retentionBody': 'The static portfolio itself does not maintain a separate submissions database. The delivered message may remain in the receiving email service according to its settings and policies, while provider-side storage is governed by Web3Forms current service information.',
            'rightsTitle': 'Your rights',
            'rightsBody': 'Where the GDPR applies, you may have rights including access, rectification, erasure, restriction, objection and the right to lodge a complaint with a competent data protection supervisory authority.',
            'trackingTitle': 'Analytics and profiling',
            'trackingBody': 'This portfolio does not use advertising trackers, behavioural profiling or analytics services.',
            'updated': 'Last updated: 7 August 2026',
        },
        'notFoundPage': {
            'kicker': '404',
            'title': 'Page not found.',
            'body': 'The address may be outdated or incomplete. The professional profile and Workbench are still available.',
            'profile': 'Professional profile',
            'workbench': 'Workbench',
        },
    },
    'de': {
        'privacyCta': 'Datenschutzhinweise lesen',
        'footerPrivacy': 'Datenschutz',
        'privacyPage': {
            'kicker': 'Datenschutz',
            'title': 'Datenschutzhinweise für die berufliche Kontaktaufnahme.',
            'intro': 'Diese Seite beschreibt den aktuellen Datenfluss bei Nutzung des Kontaktformulars im Portfolio.',
            'back': 'Zurück zum beruflichen Profil',
            'controllerTitle': 'Verantwortlicher',
            'controllerBody': 'Jhon M. Cuenca ist für die personenbezogenen Daten verantwortlich, die über das Kontaktformular dieses Portfolios übermittelt werden. Eine Kontaktaufnahme ist über das berufliche Kontaktformular im Portfolio möglich.',
            'dataTitle': 'Erhobene Daten',
            'dataBody': 'Das Formular fragt Name, E-Mail-Adresse und Nachricht ab. Bitte übermitteln Sie nur Informationen, die für Ihre berufliche Anfrage erforderlich sind.',
            'purposeTitle': 'Zweck und Rechtsgrundlage',
            'purposeBody': 'Die Angaben werden verwendet, um berufliche Anfragen, Laborstellen, forschungsbezogene Kontakte oder Kooperationsanfragen zu empfangen und zu beantworten. Je nach Kontext kann die Verarbeitung für vorvertragliche Schritte auf Ihre Anfrage hin und/oder aufgrund des berechtigten Interesses an der Beantwortung beruflicher Korrespondenz erfolgen.',
            'providerTitle': 'Formulardienst und internationale Verarbeitung',
            'providerBody': 'Das Kontaktformular wird über Web3Forms übermittelt. Web3Forms gibt in seiner öffentlichen Dokumentation an, dass sich die Server in den Vereinigten Staaten (US-East) befinden. Verarbeitung und Speicherung auf Seiten des Anbieters richten sich nach den jeweils aktuellen Informationen von Web3Forms.',
            'retentionTitle': 'Speicherung',
            'retentionBody': 'Das statische Portfolio selbst führt keine separate Datenbank der Formulareinsendungen. Die zugestellte Nachricht kann entsprechend den Einstellungen und Richtlinien des empfangenden E-Mail-Dienstes gespeichert bleiben; eine Speicherung durch den Formulardienst richtet sich nach den aktuellen Informationen von Web3Forms.',
            'rightsTitle': 'Ihre Rechte',
            'rightsBody': 'Soweit die DSGVO anwendbar ist, können insbesondere Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch sowie das Recht auf Beschwerde bei einer zuständigen Datenschutzaufsichtsbehörde bestehen.',
            'trackingTitle': 'Analyse und Profiling',
            'trackingBody': 'Dieses Portfolio verwendet keine Werbetracker, kein verhaltensbezogenes Profiling und keine Analysedienste.',
            'updated': 'Zuletzt aktualisiert: 7. August 2026',
        },
        'notFoundPage': {
            'kicker': '404',
            'title': 'Seite nicht gefunden.',
            'body': 'Die Adresse ist möglicherweise veraltet oder unvollständig. Das berufliche Profil und der Workbench sind weiterhin verfügbar.',
            'profile': 'Berufliches Profil',
            'workbench': 'Workbench',
        },
    },
    'es': {
        'privacyCta': 'Leer información de privacidad',
        'footerPrivacy': 'Privacidad',
        'privacyPage': {
            'kicker': 'Privacidad',
            'title': 'Información de privacidad para el contacto profesional.',
            'intro': 'Esta página explica el flujo actual de datos cuando se utiliza el formulario de contacto del portafolio.',
            'back': 'Volver al perfil profesional',
            'controllerTitle': 'Responsable',
            'controllerBody': 'Jhon M. Cuenca es responsable de los datos personales enviados mediante el formulario de contacto de este portafolio. El contacto está disponible a través del formulario profesional del propio portafolio.',
            'dataTitle': 'Datos recogidos',
            'dataBody': 'El formulario solicita nombre, dirección de correo electrónico y mensaje. Envía únicamente la información necesaria para tu consulta profesional.',
            'purposeTitle': 'Finalidad y base jurídica',
            'purposeBody': 'La información se utiliza para recibir y responder consultas profesionales, oportunidades de laboratorio, contactos relacionados con investigación o propuestas de colaboración. Según el contexto, el tratamiento puede ser necesario para realizar actuaciones solicitadas antes de un posible contrato y/o basarse en el interés legítimo de responder correspondencia profesional.',
            'providerTitle': 'Proveedor del formulario y tratamiento internacional',
            'providerBody': 'El formulario de contacto se transmite mediante Web3Forms. Web3Forms indica en su documentación pública que sus servidores están ubicados en Estados Unidos (US-East). El tratamiento y la conservación por parte del proveedor se rigen por la información vigente de Web3Forms.',
            'retentionTitle': 'Conservación',
            'retentionBody': 'El portafolio estático no mantiene una base de datos separada de los envíos. El mensaje entregado puede permanecer en el servicio de correo receptor según su configuración y políticas; la conservación por parte del proveedor del formulario se rige por la información vigente de Web3Forms.',
            'rightsTitle': 'Tus derechos',
            'rightsBody': 'Cuando sea aplicable el RGPD, pueden existir derechos de acceso, rectificación, supresión, limitación, oposición y el derecho a presentar una reclamación ante una autoridad de protección de datos competente.',
            'trackingTitle': 'Analítica y perfilado',
            'trackingBody': 'Este portafolio no utiliza rastreadores publicitarios, perfilado de comportamiento ni servicios de analítica.',
            'updated': 'Última actualización: 7 de agosto de 2026',
        },
        'notFoundPage': {
            'kicker': '404',
            'title': 'Página no encontrada.',
            'body': 'La dirección puede estar desactualizada o incompleta. El perfil profesional y el Workbench siguen disponibles.',
            'profile': 'Perfil profesional',
            'workbench': 'Workbench',
        },
    },
}


def assert_existing_values_preserved(old, new, path=''):
    if isinstance(old, dict):
        if not isinstance(new, dict):
            raise SystemExit(f'translation structure changed at {path}')
        for key, value in old.items():
            if key not in new:
                raise SystemExit(f'translation key removed: {path}.{key}')
            assert_existing_values_preserved(value, new[key], f'{path}.{key}' if path else key)
    elif old != new:
        raise SystemExit(f'existing translation value changed at {path}')


for lang, extra in additions.items():
    path = f'data/translations/{lang}.json'
    data = json.loads(read(path))
    old_data = json.loads(subprocess.check_output(['git', 'show', f'{BASE}:{path}'], text=True))
    data.setdefault('contactForm', {})['privacyCta'] = extra['privacyCta']
    data.setdefault('footer', {})['privacy'] = extra['footerPrivacy']
    data['privacyPage'] = extra['privacyPage']
    data['notFoundPage'] = extra['notFoundPage']
    assert_existing_values_preserved(old_data, data)
    write(path, json.dumps(data, ensure_ascii=False, indent=2) + '\n')

privacy_html = '''<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Jhon M. Cuenca">
    <meta name="description" content="Privacy information for professional contact through the Jhon M. Cuenca portfolio.">
    <meta name="robots" content="index,follow">
    <meta name="theme-color" content="#0B0D10">
    <link rel="canonical" href="https://cuenca-john1999.github.io/privacy.html">
    <link rel="icon" href="assets/icons/main-favicon.ico">
    <title>Privacy | Jhon M. Cuenca</title>
    <link rel="stylesheet" href="assets/css/variables.css">
    <link rel="stylesheet" href="assets/css/base.css">
    <link rel="stylesheet" href="assets/css/legal.css">
</head>
<body>
    <a class="aux-skip-link" href="#main-content" data-i18n="accessibility.skipToContent">Skip to main content</a>
    <header class="aux-header" aria-label="Privacy page navigation">
        <a class="aux-back" href="./" data-i18n="privacyPage.back">Back to professional profile</a>
        <div class="aux-language" aria-label="Language selector" data-i18n-aria-label="accessibility.languageSelector">
            <button type="button" data-language-set="en" aria-pressed="true">EN</button>
            <button type="button" data-language-set="de" aria-pressed="false">DE</button>
            <button type="button" data-language-set="es" aria-pressed="false">ES</button>
        </div>
    </header>
    <main id="main-content" class="aux-main" tabindex="-1">
        <header class="aux-hero">
            <p class="aux-kicker" data-i18n="privacyPage.kicker">Privacy</p>
            <h1 data-page-title data-i18n="privacyPage.title">Privacy information for professional contact.</h1>
            <p data-i18n="privacyPage.intro">This page explains the current data flow when the portfolio contact form is used.</p>
        </header>
        <div class="aux-grid">
            <section class="aux-card"><h2 data-i18n="privacyPage.controllerTitle">Controller</h2><p data-i18n="privacyPage.controllerBody">Jhon M. Cuenca is responsible for the personal data submitted through this portfolio contact form. Contact is available through the professional contact form on the portfolio.</p></section>
            <section class="aux-card"><h2 data-i18n="privacyPage.dataTitle">Data collected</h2><p data-i18n="privacyPage.dataBody">The form asks for your name, email address and message. Please send only information needed for your professional enquiry.</p></section>
            <section class="aux-card"><h2 data-i18n="privacyPage.purposeTitle">Purpose and legal basis</h2><p data-i18n="privacyPage.purposeBody">The information is used to receive and respond to professional enquiries, laboratory opportunities, research-related contact or collaboration requests.</p></section>
            <section class="aux-card"><h2 data-i18n="privacyPage.providerTitle">Form provider and international processing</h2><p data-i18n="privacyPage.providerBody">The contact form is transmitted through Web3Forms. Web3Forms states in its public documentation that its servers are located in the United States (US-East).</p><p><a href="https://docs.web3forms.com/getting-started/faq" rel="noopener noreferrer" target="_blank">Web3Forms documentation ↗</a></p></section>
            <section class="aux-card"><h2 data-i18n="privacyPage.retentionTitle">Retention</h2><p data-i18n="privacyPage.retentionBody">The static portfolio itself does not maintain a separate submissions database.</p></section>
            <section class="aux-card"><h2 data-i18n="privacyPage.rightsTitle">Your rights</h2><p data-i18n="privacyPage.rightsBody">Where the GDPR applies, you may have rights including access, rectification, erasure, restriction, objection and the right to lodge a complaint with a competent data protection supervisory authority.</p><p><a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" rel="noopener noreferrer" target="_blank">GDPR / DSGVO / RGPD ↗</a></p></section>
            <section class="aux-card"><h2 data-i18n="privacyPage.trackingTitle">Analytics and profiling</h2><p data-i18n="privacyPage.trackingBody">This portfolio does not use advertising trackers, behavioural profiling or analytics services.</p></section>
        </div>
        <p class="aux-updated" data-i18n="privacyPage.updated">Last updated: 7 August 2026</p>
    </main>
    <script src="assets/js/language.js?v=20260807-professionalization-audit"></script>
    <script src="assets/js/auxiliary-pages.js?v=20260807-professionalization-audit"></script>
</body>
</html>
'''
write('privacy.html', privacy_html)

not_found_html = '''<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Jhon M. Cuenca">
    <meta name="robots" content="noindex,follow">
    <meta name="theme-color" content="#0B0D10">
    <link rel="icon" href="assets/icons/main-favicon.ico">
    <title>Page not found | Jhon M. Cuenca</title>
    <link rel="stylesheet" href="assets/css/variables.css">
    <link rel="stylesheet" href="assets/css/base.css">
    <link rel="stylesheet" href="assets/css/legal.css">
</head>
<body>
    <main id="main-content" class="aux-main aux-main--center" tabindex="-1">
        <section class="aux-hero aux-hero--compact">
            <p class="aux-kicker" data-i18n="notFoundPage.kicker">404</p>
            <h1 data-page-title data-i18n="notFoundPage.title">Page not found.</h1>
            <p data-i18n="notFoundPage.body">The address may be outdated or incomplete. The professional profile and Workbench are still available.</p>
            <div class="aux-actions"><a href="./" data-i18n="notFoundPage.profile">Professional profile</a><a href="workbench/" data-i18n="notFoundPage.workbench">Workbench</a></div>
            <div class="aux-language aux-language--center" aria-label="Language selector" data-i18n-aria-label="accessibility.languageSelector">
                <button type="button" data-language-set="en" aria-pressed="true">EN</button><button type="button" data-language-set="de" aria-pressed="false">DE</button><button type="button" data-language-set="es" aria-pressed="false">ES</button>
            </div>
        </section>
    </main>
    <script src="assets/js/language.js?v=20260807-professionalization-audit"></script>
    <script src="assets/js/auxiliary-pages.js?v=20260807-professionalization-audit"></script>
</body>
</html>
'''
write('404.html', not_found_html)

legal_css = '''body{margin:0;min-height:100vh;background:var(--color-bg);color:var(--color-text);font:var(--font-body)}.aux-skip-link{position:fixed;left:1rem;top:1rem;z-index:20;transform:translateY(-200%);padding:.65rem .85rem;border-radius:var(--radius-sm);background:var(--color-text);color:var(--color-bg)}.aux-skip-link:focus{transform:translateY(0)}.aux-header{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem clamp(1rem,4vw,3rem);border-bottom:1px solid var(--color-border);background:var(--color-bg)}.aux-back,.aux-actions a,.aux-card a{color:var(--color-accent);text-decoration-thickness:.08em;text-underline-offset:.2em}.aux-language{display:flex;gap:.4rem}.aux-language button{min-width:2.65rem;min-height:2.4rem;border:1px solid var(--color-border);border-radius:var(--radius-pill);background:var(--color-surface);color:var(--color-text-muted);cursor:pointer}.aux-language button[aria-pressed="true"]{border-color:var(--color-accent);color:var(--color-text)}.aux-main{width:min(100% - 2rem,980px);margin:0 auto;padding:clamp(3rem,8vw,6rem) 0}.aux-main--center{min-height:100vh;display:grid;place-items:center}.aux-hero{max-width:780px;margin-bottom:2rem}.aux-hero--compact{margin:0}.aux-kicker{color:var(--color-accent);font:var(--font-small);letter-spacing:.12em;text-transform:uppercase}.aux-hero h1{margin:.5rem 0 1rem;font:var(--font-display);max-width:18ch}.aux-hero p,.aux-card p,.aux-updated{color:var(--color-text-muted)}.aux-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.aux-card{padding:clamp(1.25rem,3vw,2rem);border:1px solid var(--color-border);border-radius:var(--radius-lg);background:var(--color-surface)}.aux-card h2{margin-top:0;font:var(--font-h3)}.aux-actions{display:flex;flex-wrap:wrap;gap:1rem;margin:2rem 0}.aux-actions a{padding:.8rem 1rem;border:1px solid var(--color-border);border-radius:var(--radius-pill)}.aux-language--center{justify-content:flex-start}.aux-updated{margin-top:2rem;font:var(--font-small)}:focus-visible{outline:3px solid var(--color-accent);outline-offset:3px}@media(max-width:720px){.aux-grid{grid-template-columns:1fr}.aux-header{align-items:flex-start}.aux-hero h1{font:var(--font-h1)}}@media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}\n'''
write('assets/css/legal.css', legal_css)

auxiliary_js = '''document.addEventListener('DOMContentLoaded', () => {
    if (typeof Language === 'undefined' || typeof Language.init !== 'function') return;
    const syncDocumentTitle = () => {
        const heading = document.querySelector('[data-page-title]');
        if (heading?.textContent?.trim()) document.title = `${heading.textContent.trim()} | Jhon M. Cuenca`;
    };
    Promise.resolve(Language.init()).then(() => {
        syncDocumentTitle();
        const heading = document.querySelector('[data-page-title]');
        if (heading && 'MutationObserver' in window) new MutationObserver(syncDocumentTitle).observe(heading, {childList:true,subtree:true,characterData:true});
    }).catch((error) => console.warn('[AUXILIARY PAGE] Language initialization failed', error));
});
'''
write('assets/js/auxiliary-pages.js', auxiliary_js)

sitemap = read('sitemap.xml')
sitemap = replace_once(
    sitemap,
    '  <url>\n    <loc>https://cuenca-john1999.github.io/workbench/</loc>\n  </url>\n</urlset>',
    '  <url>\n    <loc>https://cuenca-john1999.github.io/workbench/</loc>\n  </url>\n  <url>\n    <loc>https://cuenca-john1999.github.io/privacy.html</loc>\n  </url>\n</urlset>',
    'sitemap privacy entry',
)
write('sitemap.xml', sitemap)

workflow = read('.github/workflows/portfolio-integrity.yml')
workflow = replace_once(workflow, '          node --check workbench/js/workbench.js\n', '          node --check workbench/js/workbench.js\n          node --check assets/js/auxiliary-pages.js\n', 'permanent workflow auxiliary JS check')
write('.github/workflows/portfolio-integrity.yml', workflow)

verifier = read('tools/verify_portfolio_integrity.py')
verifier = verifier.replace('import re\nfrom pathlib import Path\n', 'import re\nfrom html.parser import HTMLParser\nfrom pathlib import Path\nfrom urllib.parse import urlsplit\n', 1)
verifier = verifier.replace('LANGUAGES = ("en", "de", "es")\n', 'LANGUAGES = ("en", "de", "es")\nHTML_PAGES = ("index.html", "workbench/index.html", "privacy.html", "404.html")\n', 1)
helper_code = r'''

class LinkCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.refs: list[tuple[str, str]] = []
        self.ids: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if values.get("id"):
            self.ids.add(values["id"])
        for attr in ("href", "src"):
            value = values.get(attr)
            if value:
                self.refs.append((attr, value))


def resolve_local_reference(page: Path, value: str) -> Path | None:
    if value.startswith(("http://", "https://", "mailto:", "tel:", "data:", "javascript:")):
        return None
    parsed = urlsplit(value)
    if not parsed.path:
        return None
    target = (page.parent / parsed.path).resolve()
    try:
        target.relative_to(ROOT.resolve())
    except ValueError:
        fail(f"local reference escapes repository root: {page.relative_to(ROOT)} -> {value}")
    if parsed.path.endswith("/"):
        target = target / "index.html"
    return target


def check_local_links_and_fragments() -> None:
    for relative in HTML_PAGES:
        page = ROOT / relative
        parser = LinkCollector()
        parser.feed(page.read_text(encoding="utf-8"))
        for attr, value in parser.refs:
            parsed = urlsplit(value)
            target = resolve_local_reference(page, value)
            if target is not None and not target.exists():
                fail(f"missing local {attr} target: {relative} -> {value}")
            if parsed.fragment and not parsed.path and parsed.fragment not in parser.ids:
                fail(f"missing local fragment target: {relative} -> #{parsed.fragment}")
            if parsed.fragment and parsed.path and target is not None and target.suffix.lower() == ".html":
                target_parser = LinkCollector()
                target_parser.feed(target.read_text(encoding="utf-8"))
                if parsed.fragment not in target_parser.ids:
                    fail(f"missing cross-page fragment target: {relative} -> {value}")


def check_auxiliary_i18n_keys(translations: dict[str, dict]) -> None:
    for relative in ("privacy.html", "404.html"):
        html = (ROOT / relative).read_text(encoding="utf-8")
        referenced = set(re.findall(r'data-i18n(?:-aria-label)?="([^"]+)"', html))
        for language, dictionary in translations.items():
            missing = sorted(referenced - flatten_keys(dictionary))
            if missing:
                fail(f"{relative} references missing {language} i18n keys: {missing}")


def check_structured_data_and_privacy() -> None:
    index = (ROOT / "index.html").read_text(encoding="utf-8")
    blocks = re.findall(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', index, flags=re.S)
    if len(blocks) != 1:
        fail(f"expected exactly one JSON-LD block in index.html, found {len(blocks)}")
    data = json.loads(blocks[0])
    if data.get("@type") != "ProfilePage":
        fail("index.html JSON-LD is not a ProfilePage")
    person = data.get("mainEntity", {})
    if person.get("@type") != "Person" or person.get("name") != "Jhon M. Cuenca":
        fail("ProfilePage mainEntity does not identify Jhon M. Cuenca as Person")
    privacy = (ROOT / "privacy.html").read_text(encoding="utf-8")
    for marker in ("Web3Forms", "United States (US-East)", "privacyPage.rightsBody"):
        if marker not in privacy:
            fail(f"privacy information marker missing: {marker}")
    if "https://cuenca-john1999.github.io/privacy.html" not in (ROOT / "sitemap.xml").read_text(encoding="utf-8"):
        fail("privacy.html is missing from sitemap.xml")


def check_public_privacy_guards() -> None:
    text = "\n".join((ROOT / relative).read_text(encoding="utf-8") for relative in HTML_PAGES)
    for marker in ("/Volumes/", "/Users/", "djxmaicolx", ".continue/", "BEGIN OPENSSH PRIVATE KEY"):
        if marker in text:
            fail(f"private/local marker found in public HTML: {marker}")
'''
verifier = verifier.replace('\ndef main() -> None:\n', helper_code + '\n\ndef main() -> None:\n', 1)
verifier = verifier.replace('    check_index_i18n_keys(translations)\n', '    check_index_i18n_keys(translations)\n    check_auxiliary_i18n_keys(translations)\n', 1)
verifier = verifier.replace('    check_duplicate_ids(ROOT / "workbench" / "index.html")\n', '    check_duplicate_ids(ROOT / "workbench" / "index.html")\n    check_duplicate_ids(ROOT / "privacy.html")\n    check_duplicate_ids(ROOT / "404.html")\n    check_local_links_and_fragments()\n    check_structured_data_and_privacy()\n    check_public_privacy_guards()\n', 1)
write('tools/verify_portfolio_integrity.py', verifier)

old_index = subprocess.check_output(['git', 'show', f'{BASE}:index.html'], text=True)
new_index = read('index.html')
old_section_ids = set(re.findall(r'<section[^>]+id="([^"]+)"', old_index))
new_section_ids = set(re.findall(r'<section[^>]+id="([^"]+)"', new_index))
missing_sections = sorted(old_section_ids - new_section_ids)
if missing_sections:
    raise SystemExit(f'public sections removed: {missing_sections}')
old_documents = set(re.findall(r'(?:href|src)="(assets/documents/[^"?#]+)', old_index))
new_documents = set(re.findall(r'(?:href|src)="(assets/documents/[^"?#]+)', new_index))
missing_documents = sorted(old_documents - new_documents)
if missing_documents:
    raise SystemExit(f'public document references removed: {missing_documents}')

print('Conservative professionalization patch prepared with preservation guards.')
