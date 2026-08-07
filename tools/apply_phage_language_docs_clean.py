#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]


def replace_exact(text: str, old: str, new: str, *, expected: int = 1, label: str) -> str:
    count = text.count(old)
    if count != expected:
        raise SystemExit(f"{label}: expected {expected} occurrence(s), found {count}")
    return text.replace(old, new)


def update_index() -> None:
    path = ROOT / "index.html"
    text = path.read_text(encoding="utf-8")

    old_link = 'href="assets/documents/bacteriophage-therapy-final-project.pdf" target="_blank" rel="noopener" data-document-open'
    new_link = 'href="assets/documents/bacteriophage-therapy-final-project_EN.pdf" target="_blank" rel="noopener" data-document-open data-final-project-link'
    text = replace_exact(text, old_link, new_link, expected=2, label="main final-project links")

    text = replace_exact(
        text,
        'id="document-explorer-fallback" href="assets/documents/bacteriophage-therapy-final-project.pdf"',
        'id="document-explorer-fallback" href="assets/documents/bacteriophage-therapy-final-project_EN.pdf"',
        label="document explorer fallback",
    )

    text = replace_exact(
        text,
        'data-document-label="Final project · 61 pages"',
        'data-document-label="Final project · Unofficial English translation"',
        expected=2,
        label="main English document labels",
    )
    text = replace_exact(
        text,
        '<span id="document-explorer-label">Final project · 61 pages</span>',
        '<span id="document-explorer-label">Final project · Unofficial English translation</span>',
        label="document explorer initial label",
    )

    old_summary = '<p data-i18n-html="educationCards.clinical.finalProject"><strong>Bacteriophage Therapy: Rediscovering an Innovative Therapy.</strong> Co-authored with Luis Gonzalo Legua Pérez and published with co-author permission.<br><br><strong>Original interdisciplinary hypothesis:</strong> exploring whether phage specificity and chitosan-based adsorption could be combined in future laboratory models to study microplastic-associated biofilms, without claiming clinical efficacy.</p>'
    new_summary = '<p data-i18n-html="educationCards.clinical.finalProject"><strong>Bacteriophage Therapy: Rediscovering an Innovative Therapy.</strong> Co-authored with Luis Gonzalo Legua Pérez and published with co-author permission.<br><br><strong>Document language:</strong> the linked English PDF is an unofficial translation/adaptation and is not a certified or sworn translation. The original academic work is the Spanish version.<br><br><strong>Original interdisciplinary hypothesis:</strong> exploring whether phage specificity and chitosan-based adsorption could be combined in future laboratory models to study microplastic-associated biofilms, without claiming clinical efficacy.</p>'
    text = replace_exact(text, old_summary, new_summary, label="English fallback project notice")

    path.write_text(text, encoding="utf-8")


def update_language_js() -> None:
    path = ROOT / "assets/js/language.js"
    text = path.read_text(encoding="utf-8")

    text = replace_exact(
        text,
        "const TRANSLATION_VERSION = '20260807-education-visual';",
        "const TRANSLATION_VERSION = '20260808-phage-language-docs';",
        label="translation cache version",
    )

    marker = "    const TRANSLATABLE_ATTRIBUTES = {\n"
    mapping = "    const FINAL_PROJECT_BY_LANGUAGE = {\n        en: 'assets/documents/bacteriophage-therapy-final-project_EN.pdf',\n        de: 'assets/documents/bacteriophage-therapy-final-project_DE.pdf',\n        es: 'assets/documents/bacteriophage-therapy-final-project_ES.pdf'\n    };\n"
    text = replace_exact(text, marker, mapping + marker, label="final-project language map insertion")

    cv_function = "    function updateCvLinks() {\n        const cvPath = CV_BY_LANGUAGE[currentLanguage] || CV_BY_LANGUAGE[DEFAULT_LANGUAGE];\n\n        document.querySelectorAll('[data-cv-link]').forEach((link) => {\n            link.setAttribute('href', cvPath);\n        });\n    }\n\n"
    project_function = "    /**\n     * Sincronizar el trabajo final con el idioma activo. El original académico es ES.\n     */\n    function updateFinalProjectLinks() {\n        const projectPath = FINAL_PROJECT_BY_LANGUAGE[currentLanguage] || FINAL_PROJECT_BY_LANGUAGE[DEFAULT_LANGUAGE];\n\n        document.querySelectorAll('[data-final-project-link]').forEach((link) => {\n            link.setAttribute('href', projectPath);\n        });\n    }\n\n"
    text = replace_exact(text, cv_function, cv_function + project_function, label="final-project updater insertion")

    text = replace_exact(
        text,
        "            updateCvLinks();\n            updateWorkbenchLinks();",
        "            updateCvLinks();\n            updateFinalProjectLinks();\n            updateWorkbenchLinks();",
        expected=2,
        label="final-project updater calls",
    )

    path.write_text(text, encoding="utf-8")


def update_translations() -> None:
    values = {
        "en": {
            "finalProject": "<strong>Bacteriophage Therapy: Rediscovering an Innovative Therapy.</strong> Co-authored with Luis Gonzalo Legua Pérez and published with co-author permission.<br><br><strong>Document language:</strong> the linked English PDF is an unofficial translation/adaptation and is not a certified or sworn translation. The original academic work is the Spanish version.<br><br><strong>Original interdisciplinary hypothesis:</strong> exploring whether phage specificity and chitosan-based adsorption could be combined in future laboratory models to study microplastic-associated biofilms, without claiming clinical efficacy.",
            "label": "Final project · Unofficial English translation",
        },
        "de": {
            "finalProject": "<strong>Bakteriophagentherapie | Wiederentdeckung einer innovativen Therapie.</strong> Gemeinsam mit Luis Gonzalo Legua Pérez verfasst und mit Zustimmung des Mitautors veröffentlicht.<br><br><strong>Dokumentsprache:</strong> Die verlinkte deutsche PDF-Fassung ist eine inoffizielle Übersetzung/Adaption und keine beglaubigte oder beeidigte Übersetzung. Das akademische Original ist die spanische Fassung.<br><br><strong>Ursprüngliche interdisziplinäre Hypothese:</strong> Untersuchung, ob sich Phagenspezifität und chitosanbasierte Adsorption in zukünftigen Labormodellen zur Erforschung mikroplastikassoziierter Biofilme kombinieren lassen, ohne klinische Wirksamkeit zu behaupten.",
            "label": "Abschlussarbeit · Inoffizielle deutsche Übersetzung",
        },
        "es": {
            "finalProject": "<strong>Bacteriofagoterapia | Redescubriendo una terapia innovadora.</strong> Trabajo en coautoría con Luis Gonzalo Legua Pérez y publicado con su autorización.<br><br><strong>Idioma del documento:</strong> la versión enlazada en español es el trabajo académico original.<br><br><strong>Hipótesis interdisciplinaria original:</strong> explorar si la especificidad de los fagos y la adsorción basada en quitosano podrían combinarse en futuros modelos de laboratorio para estudiar biofilms asociados a microplásticos, sin afirmar eficacia clínica.",
            "label": "Trabajo final original · Español",
        },
    }

    for language, replacement in values.items():
        path = ROOT / f"data/translations/{language}.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        data["educationCards"]["clinical"]["finalProject"] = replacement["finalProject"]
        data["documents"]["finalProject"]["label"] = replacement["label"]
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def update_workbench() -> None:
    path = ROOT / "workbench/js/workbench.js"
    text = path.read_text(encoding="utf-8")

    replacements = (
        (
            "result: 'A completed 61-page academic project and defense material. It is a literature review, not an experimental or clinical study.',",
            "result: 'A completed 61-page academic project and defense material. It is a literature review, not an experimental or clinical study. The linked English PDF is an unofficial translation/adaptation and is not a certified or sworn translation; the original academic work is the Spanish version.',",
            "Workbench EN result notice",
        ),
        (
            "{ label: 'Final project · 61 pages', href: '../assets/documents/bacteriophage-therapy-final-project.pdf' },",
            "{ label: 'Final project · Unofficial English translation', href: '../assets/documents/bacteriophage-therapy-final-project_EN.pdf' },",
            "Workbench EN resource",
        ),
        (
            "result: 'Proyecto académico completado de 61 páginas y material de defensa. Es una revisión bibliográfica, no un estudio experimental ni clínico.',",
            "result: 'Proyecto académico completado de 61 páginas y material de defensa. Es una revisión bibliográfica, no un estudio experimental ni clínico. La versión enlazada en español es el trabajo académico original.',",
            "Workbench ES result notice",
        ),
        (
            "{ label: 'Trabajo final · 61 páginas', href: '../assets/documents/bacteriophage-therapy-final-project.pdf' },",
            "{ label: 'Trabajo final original · Español', href: '../assets/documents/bacteriophage-therapy-final-project_ES.pdf' },",
            "Workbench ES resource",
        ),
        (
            "result: 'Eine abgeschlossene 61-seitige akademische Arbeit mit Verteidigungsmaterial. Es handelt sich um eine Literaturübersicht, nicht um eine experimentelle oder klinische Studie.',",
            "result: 'Eine abgeschlossene 61-seitige akademische Arbeit mit Verteidigungsmaterial. Es handelt sich um eine Literaturübersicht, nicht um eine experimentelle oder klinische Studie. Die verlinkte deutsche PDF-Fassung ist eine inoffizielle Übersetzung/Adaption und keine beglaubigte oder beeidigte Übersetzung; das akademische Original ist die spanische Fassung.',",
            "Workbench DE result notice",
        ),
        (
            "{ label: 'Abschlussarbeit · 61 Seiten', href: '../assets/documents/bacteriophage-therapy-final-project.pdf' },",
            "{ label: 'Abschlussarbeit · Inoffizielle deutsche Übersetzung', href: '../assets/documents/bacteriophage-therapy-final-project_DE.pdf' },",
            "Workbench DE resource",
        ),
    )

    for old, new, label in replacements:
        text = replace_exact(text, old, new, label=label)

    path.write_text(text, encoding="utf-8")


def update_integrity_checker() -> None:
    path = ROOT / "tools/verify_portfolio_integrity.py"
    text = path.read_text(encoding="utf-8")
    marker = "    education_markers = (\n"
    guard = '''    final_project_paths = {\n        "en": "assets/documents/bacteriophage-therapy-final-project_EN.pdf",\n        "de": "assets/documents/bacteriophage-therapy-final-project_DE.pdf",\n        "es": "assets/documents/bacteriophage-therapy-final-project_ES.pdf",\n    }\n    for language, relative_path in final_project_paths.items():\n        if not (ROOT / relative_path).is_file():\n            fail(f"language-specific bacteriophage PDF is missing for {language}: {relative_path}")\n        if relative_path not in language_js:\n            fail(f"main language routing is missing the {language} bacteriophage PDF: {relative_path}")\n\n    if index.count('data-final-project-link') != 2:\n        fail("main portfolio must expose exactly two language-aware final-project links")\n\n    workbench_language_resources = (\n        "../assets/documents/bacteriophage-therapy-final-project_EN.pdf",\n        "../assets/documents/bacteriophage-therapy-final-project_DE.pdf",\n        "../assets/documents/bacteriophage-therapy-final-project_ES.pdf",\n    )\n    for resource_path in workbench_language_resources:\n        if resource_path not in workbench_js:\n            fail(f"Workbench language-specific bacteriophage resource is missing: {resource_path}")\n\n    old_generic_link = "bacteriophage-therapy-final-project.pdf"\n    if f'href="assets/documents/{old_generic_link}"' in index:\n        fail("main portfolio still links the generic bacteriophage PDF instead of a language-specific version")\n    if f"../assets/documents/{old_generic_link}" in workbench_js:\n        fail("Workbench still links the generic bacteriophage PDF instead of language-specific versions")\n\n    language_notice_markers = (\n        "The original academic work is the Spanish version.",\n        "Das akademische Original ist die spanische Fassung.",\n        "la versión enlazada en español es el trabajo académico original.",\n    )\n    for phrase in language_notice_markers:\n        if phrase not in published_text:\n            fail(f"bacteriophage document-language notice is missing: {phrase}")\n\n'''
    text = replace_exact(text, marker, guard + marker, label="language-specific PDF integrity guard")
    path.write_text(text, encoding="utf-8")


def refresh_cache_versions() -> None:
    html_pages = [Path("index.html"), Path("privacy.html"), Path("404.html"), Path("workbench/index.html")]
    asset_pattern = re.compile(r'(?P<prefix>(?:href|src)=")(?P<url>[^"#]+?\.(?:css|js))(?:\?v=[^"]*)?(?P<suffix>")')

    for relative in html_pages:
        page = ROOT / relative
        text = page.read_text(encoding="utf-8")

        def replace_asset(match: re.Match[str]) -> str:
            url = match.group("url")
            parsed = urlsplit(url)
            if parsed.scheme or url.startswith(("//", "/")):
                return match.group(0)
            target = (page.parent / parsed.path).resolve()
            try:
                target.relative_to(ROOT.resolve())
            except ValueError:
                return match.group(0)
            if not target.is_file():
                return match.group(0)
            digest = hashlib.sha256(target.read_bytes()).hexdigest()[:12]
            return f'{match.group("prefix")}{url}?v={digest}{match.group("suffix")}'

        page.write_text(asset_pattern.sub(replace_asset, text), encoding="utf-8")


def main() -> None:
    update_index()
    update_language_js()
    update_translations()
    update_workbench()
    update_integrity_checker()
    refresh_cache_versions()
    print("Bacteriophage language-specific document routing applied.")


if __name__ == "__main__":
    main()
