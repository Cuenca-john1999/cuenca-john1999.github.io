#!/usr/bin/env python3
from pathlib import Path
import hashlib
import re

ROOT = Path(__file__).resolve().parents[1]
WB_JS_PATH = ROOT / "workbench/js/workbench.js"
WB_HTML_PATH = ROOT / "workbench/index.html"
VERIFIER_PATH = ROOT / "tools/verify_portfolio_integrity.py"

wb_js = WB_JS_PATH.read_text(encoding="utf-8")
wb_html = WB_HTML_PATH.read_text(encoding="utf-8")
verifier = VERIFIER_PATH.read_text(encoding="utf-8")

replacements = {
    """                milestonesItem1: 'Portfolio publication on GitHub Pages',
                milestonesItem2: 'Completed academic bacteriophage literature review'""": """                milestonesItem1: '2026 · Portfolio publication on GitHub Pages with automated integrity checks',
                milestonesItem2: '2026 · Functional DeutschOS local prototype under active development',
                milestonesItem3: '2025 · 370-hour FCT placement at Hospital Universitario de La Princesa',
                milestonesItem4: '2025 · Completed co-authored bacteriophage final project · 10/10',
                milestonesItem5: '2023 · Erasmus+ analytical biomass placement at Celignis'""",
    """                milestonesItem1: 'Publicación del portafolio en GitHub Pages',
                milestonesItem2: 'Revisión académica completada sobre bacteriofagoterapia'""": """                milestonesItem1: '2026 · Publicación del portafolio en GitHub Pages con controles automáticos de integridad',
                milestonesItem2: '2026 · Prototipo local funcional de DeutschOS en desarrollo activo',
                milestonesItem3: '2025 · Prácticas FCT de 370 horas en el Hospital Universitario de La Princesa',
                milestonesItem4: '2025 · Proyecto final de bacteriofagoterapia en coautoría completado · 10/10',
                milestonesItem5: '2023 · Prácticas Erasmus+ de análisis de biomasa en Celignis'""",
    """                milestonesItem1: 'Portfolio-Veröffentlichung auf GitHub Pages',
                milestonesItem2: 'Abgeschlossene akademische Literaturübersicht zur Phagentherapie'""": """                milestonesItem1: '2026 · Portfolio auf GitHub Pages veröffentlicht, mit automatischen Integritätsprüfungen',
                milestonesItem2: '2026 · Funktionsfähiger lokaler DeutschOS-Prototyp in aktiver Entwicklung',
                milestonesItem3: '2025 · 370-stündiges FCT-Praktikum am Hospital Universitario de La Princesa',
                milestonesItem4: '2025 · Gemeinsam verfasstes Abschlussprojekt zur Phagentherapie abgeschlossen · 10/10',
                milestonesItem5: '2023 · Erasmus+-Praktikum in der Biomasseanalytik bei Celignis'""",
    """                    { title: 'Documentation & professional evidence', body: 'An existing professional reference supports the placement, protocol work and laboratory-material responsibilities.' }""": """                    { title: 'Protocols, documentation & digital communication', body: 'work with laboratory protocols and scientific databases; material and inventory management; development of a bilingual scientific website for the research group' },
                    { title: 'Documentary basis & privacy', body: 'The documented 370-hour FCT placement and an existing professional reference support the placement scope, protocol work and laboratory-material responsibilities. Supporting records remain private when publication would expose personal, third-party or confidential laboratory information.' }""",
    """                    { title: 'Documentación y evidencia profesional', body: 'Existe una referencia profesional que respalda las prácticas, el trabajo con protocolos y las responsabilidades sobre material de laboratorio.' }""": """                    { title: 'Protocolos, documentación y comunicación digital', body: 'trabajo con protocolos de laboratorio y bases de datos científicas; gestión de material e inventario; desarrollo de una web científica bilingüe para el grupo de investigación' },
                    { title: 'Base documental y privacidad', body: 'Las prácticas FCT documentadas de 370 horas y una referencia profesional existente respaldan el alcance de las prácticas, el trabajo con protocolos y las responsabilidades sobre material de laboratorio. La documentación de apoyo se mantiene privada cuando su publicación expondría información personal, de terceros o confidencial del laboratorio.' }""",
    """                    { title: 'Dokumentation & beruflicher Nachweis', body: 'Eine vorhandene berufliche Referenz bestätigt das Praktikum, die Protokollarbeit und die Verantwortung für Labormaterial.' }""": """                    { title: 'Protokolle, Dokumentation & digitale Kommunikation', body: 'Arbeit mit Laborprotokollen und wissenschaftlichen Datenbanken; Material- und Bestandsverwaltung; Entwicklung einer zweisprachigen wissenschaftlichen Website für die Forschungsgruppe' },
                    { title: 'Dokumentarische Grundlage & Datenschutz', body: 'Das dokumentierte 370-stündige FCT-Praktikum und eine vorhandene berufliche Referenz stützen den Umfang des Praktikums, die Protokollarbeit und die Verantwortung für Labormaterial. Unterstützende Unterlagen bleiben privat, wenn eine Veröffentlichung personenbezogene, fremde oder vertrauliche Laborinformationen offenlegen würde.' }""",
    """                    { title: 'Responsibility & professional evidence', body: 'An existing professional reference supports the placement and its operational responsibilities. This foundation supports continued development in method validation, uncertainty analysis and cross-method interpretation.' }""": """                    { title: 'Responsibility & handover', body: 'progressive responsibility for the volatile-matter workflow, including handover training and supervision of replacement interns. This foundation supports continued development in method validation, uncertainty analysis and cross-method interpretation.' },
                    { title: 'Documentary basis & confidentiality', body: 'The documented Erasmus+ placement and an existing professional reference support the practical scope and operational responsibilities. Internal or client-related operational material is not republished; only a public-safe summary is shown.' }""",
    """                    { title: 'Responsabilidad y evidencia profesional', body: 'Existe una referencia profesional que respalda las prácticas y sus responsabilidades operativas. Esta base permite seguir avanzando en validación de métodos, análisis de incertidumbre e interpretación cruzada de técnicas.' }""": """                    { title: 'Responsabilidad y transferencia', body: 'responsabilidad progresiva sobre el flujo de materia volátil, incluida la formación de relevo y supervisión de las personas en prácticas que continuaron el puesto. Esta base permite seguir avanzando en validación de métodos, análisis de incertidumbre e interpretación cruzada de técnicas.' },
                    { title: 'Base documental y confidencialidad', body: 'Las prácticas Erasmus+ documentadas y una referencia profesional existente respaldan el alcance práctico y las responsabilidades operativas. El material operativo interno o relacionado con clientes no se republica; solo se muestra un resumen seguro para publicación.' }""",
    """                    { title: 'Verantwortung & beruflicher Nachweis', body: 'Eine vorhandene berufliche Referenz bestätigt das Praktikum und seine operativen Verantwortlichkeiten. Diese Grundlage unterstützt die weitere Entwicklung in Methodenvalidierung, Unsicherheitsanalyse und methodenübergreifender Interpretation.' }""": """                    { title: 'Verantwortung & Übergabe', body: 'schrittweise Verantwortung für den Workflow der Bestimmung flüchtiger Bestandteile, einschließlich Einarbeitung und Betreuung der nachfolgenden Praktikantinnen und Praktikanten. Diese Grundlage unterstützt die weitere Entwicklung in Methodenvalidierung, Unsicherheitsanalyse und methodenübergreifender Interpretation.' },
                    { title: 'Dokumentarische Grundlage & Vertraulichkeit', body: 'Das dokumentierte Erasmus+-Praktikum und eine vorhandene berufliche Referenz stützen den praktischen Umfang und die operativen Verantwortlichkeiten. Internes oder kundenbezogenes Arbeitsmaterial wird nicht erneut veröffentlicht; gezeigt wird nur eine veröffentlichungssichere Zusammenfassung.' }""",
}

for old, new in replacements.items():
    count = wb_js.count(old)
    if count != 1:
        raise SystemExit(f"Expected exactly one Workbench JS match, got {count}: {old[:90]!r}")
    wb_js = wb_js.replace(old, new)

old_milestones = """                        <ul>
                            <li><a href="#entry-portfolio" data-i18n="groups.milestonesItem1">Portfolio publication on GitHub Pages</a></li>
                            <li><a href="#entry-phage" data-i18n="groups.milestonesItem2">Completed academic bacteriophage literature review</a></li>
                        </ul>"""
new_milestones = """                        <ul>
                            <li><a href="#entry-portfolio" data-i18n="groups.milestonesItem1">2026 · Portfolio publication on GitHub Pages with automated integrity checks</a></li>
                            <li><a href="#entry-deutschos" data-i18n="groups.milestonesItem2">2026 · Functional DeutschOS local prototype under active development</a></li>
                            <li><a href="#entry-laprincesa" data-i18n="groups.milestonesItem3">2025 · 370-hour FCT placement at Hospital Universitario de La Princesa</a></li>
                            <li><a href="#entry-phage" data-i18n="groups.milestonesItem4">2025 · Completed co-authored bacteriophage final project · 10/10</a></li>
                            <li><a href="#entry-celignis" data-i18n="groups.milestonesItem5">2023 · Erasmus+ analytical biomass placement at Celignis</a></li>
                        </ul>"""
if wb_html.count(old_milestones) != 1:
    raise SystemExit("Expected exactly one milestones list in Workbench HTML")
wb_html = wb_html.replace(old_milestones, new_milestones)

search_discovery_function = '''\n\ndef check_search_discovery() -> None:\n    """Guard the crawl/indexing surface used by Search Console and search engines."""\n    robots = (ROOT / "robots.txt").read_text(encoding="utf-8")\n    if "User-agent: *" not in robots or "Allow: /" not in robots:\n        fail("robots.txt does not allow public crawling")\n    sitemap_url = "https://cuenca-john1999.github.io/sitemap.xml"\n    if f"Sitemap: {sitemap_url}" not in robots:\n        fail("robots.txt does not advertise the canonical sitemap URL")\n\n    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")\n    required_urls = (\n        "https://cuenca-john1999.github.io/",\n        "https://cuenca-john1999.github.io/workbench/",\n        "https://cuenca-john1999.github.io/privacy.html",\n    )\n    for url in required_urls:\n        if f"<loc>{url}</loc>" not in sitemap:\n            fail(f"canonical URL missing from sitemap.xml: {url}")\n    if "404.html" in sitemap:\n        fail("404.html must not be included in sitemap.xml")\n\n    canonicals = {\n        "index.html": "https://cuenca-john1999.github.io/",\n        "workbench/index.html": "https://cuenca-john1999.github.io/workbench/",\n        "privacy.html": "https://cuenca-john1999.github.io/privacy.html",\n    }\n    for relative, expected in canonicals.items():\n        html = (ROOT / relative).read_text(encoding="utf-8")\n        if f'<link rel="canonical" href="{expected}">' not in html:\n            fail(f"canonical URL mismatch in {relative}: expected {expected}")\n        robots_match = re.search(r'<meta name="robots" content="([^"]+)">', html)\n        if not robots_match or "index" not in robots_match.group(1) or "follow" not in robots_match.group(1):\n            fail(f"index/follow robots directive missing from {relative}")\n\n    not_found = (ROOT / "404.html").read_text(encoding="utf-8")\n    if 'content="noindex,follow"' not in not_found:\n        fail("404.html must remain noindex,follow")\n'''

if "def check_search_discovery()" not in verifier:
    anchor = "\ndef check_public_privacy_guards() -> None:\n"
    if anchor not in verifier:
        raise SystemExit("Could not find verifier search-discovery insertion anchor")
    verifier = verifier.replace(anchor, search_discovery_function + anchor, 1)

if "    check_search_discovery()\n" not in verifier:
    anchor = "    check_structured_data_and_privacy()\n"
    if anchor not in verifier:
        raise SystemExit("Could not find verifier search-discovery call anchor")
    verifier = verifier.replace(anchor, anchor + "    check_search_discovery()\n", 1)

if "workbench_milestone_markers" not in verifier:
    anchor = '''    if index.count('class="credential-card"') != 3:\n        fail("education credentials must remain split into exactly three visible credential cards")\n'''
    guard = '''\n    workbench_milestone_markers = (\n        'groups.milestonesItem3',\n        'groups.milestonesItem4',\n        'groups.milestonesItem5',\n        '#entry-laprincesa',\n        '#entry-celignis',\n        'Documentary basis & privacy',\n        'Documentary basis & confidentiality',\n    )\n    for marker in workbench_milestone_markers:\n        if marker not in workbench + workbench_js:\n            fail(f"Workbench evidence/milestone marker missing: {marker}")\n'''
    if anchor not in verifier:
        raise SystemExit("Could not find verifier Workbench milestone guard anchor")
    verifier = verifier.replace(anchor, anchor + guard, 1)

WB_JS_PATH.write_text(wb_js, encoding="utf-8")
WB_HTML_PATH.write_text(wb_html, encoding="utf-8")
VERIFIER_PATH.write_text(verifier, encoding="utf-8")

# Refresh only HTML cache tokens whose linked CSS/JS content changed.
asset_pattern = re.compile(r'(?P<prefix>(?:href|src)="(?P<asset>[^"?#]+\.(?:css|js)))\?v=[^"#]+"')
for html_path in (ROOT / "index.html", ROOT / "privacy.html", ROOT / "404.html", ROOT / "workbench/index.html"):
    html = html_path.read_text(encoding="utf-8")

    def replace_asset(match: re.Match[str]) -> str:
        asset = match.group("asset")
        target = (html_path.parent / asset).resolve()
        version = hashlib.sha256(target.read_bytes()).hexdigest()[:12]
        return f'{match.group("prefix")}?v={version}"'

    html_path.write_text(asset_pattern.sub(replace_asset, html), encoding="utf-8")

print("Workbench/SEO evolution applied.")
