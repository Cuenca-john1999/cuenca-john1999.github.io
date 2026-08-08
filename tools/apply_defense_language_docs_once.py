#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def write(path: str, text: str) -> None:
    (ROOT / path).write_text(text, encoding="utf-8")


def replace_exact(text: str, old: str, new: str, *, count: int | None = None, label: str = "replacement") -> str:
    actual = text.count(old)
    if count is not None and actual != count:
        raise SystemExit(f"{label}: expected {count} occurrences, found {actual}")
    if actual == 0:
        raise SystemExit(f"{label}: source pattern not found")
    return text.replace(old, new)


# 1) Main language routing: add defense PDFs beside final-project routing.
language_path = "assets/js/language.js"
language = read(language_path)
language = replace_exact(
    language,
    "const TRANSLATION_VERSION = '20260808-phage-language-docs';",
    "const TRANSLATION_VERSION = '20260808-phage-defense-language-docs';",
    count=1,
    label="translation version",
)
project_block = """    const FINAL_PROJECT_BY_LANGUAGE = {\n        en: 'assets/documents/bacteriophage-therapy-final-project_EN.pdf',\n        de: 'assets/documents/bacteriophage-therapy-final-project_DE.pdf',\n        es: 'assets/documents/bacteriophage-therapy-final-project_ES.pdf'\n    };\n"""
defense_block = project_block + """    const DEFENSE_BY_LANGUAGE = {\n        en: 'assets/documents/bacteriophage-therapy-defense_EN.pdf',\n        de: 'assets/documents/bacteriophage-therapy-defense_DE.pdf',\n        es: 'assets/documents/bacteriophage-therapy-defense_ES.pdf'\n    };\n"""
language = replace_exact(language, project_block, defense_block, count=1, label="defense routing table")
project_function = """    function updateFinalProjectLinks() {\n        const projectPath = FINAL_PROJECT_BY_LANGUAGE[currentLanguage] || FINAL_PROJECT_BY_LANGUAGE[DEFAULT_LANGUAGE];\n\n        document.querySelectorAll('[data-final-project-link]').forEach((link) => {\n            link.setAttribute('href', projectPath);\n        });\n    }\n"""
defense_function = project_function + """\n    /**\n     * Sincronizar la presentación de defensa con el idioma activo. El original académico es ES.\n     */\n    function updateDefenseLinks() {\n        const defensePath = DEFENSE_BY_LANGUAGE[currentLanguage] || DEFENSE_BY_LANGUAGE[DEFAULT_LANGUAGE];\n\n        document.querySelectorAll('[data-defense-link]').forEach((link) => {\n            link.setAttribute('href', defensePath);\n        });\n    }\n"""
language = replace_exact(language, project_function, defense_function, count=1, label="defense link updater")
language = replace_exact(
    language,
    "            updateFinalProjectLinks();\n            updateWorkbenchLinks();",
    "            updateFinalProjectLinks();\n            updateDefenseLinks();\n            updateWorkbenchLinks();",
    count=2,
    label="defense updater calls",
)
write(language_path, language)

# 2) Main HTML: English is the safe fallback; Language.js swaps DE/ES dynamically.
index_path = "index.html"
index = read(index_path)
old_defense_href = 'href="assets/documents/bacteriophage-therapy-defense.pdf" target="_blank" rel="noopener" data-document-open'
new_defense_href = 'href="assets/documents/bacteriophage-therapy-defense_EN.pdf" target="_blank" rel="noopener" data-document-open data-defense-link'
index = replace_exact(index, old_defense_href, new_defense_href, count=2, label="main defense links")
index = replace_exact(
    index,
    'data-document-label="Defense presentation · 17 slides"',
    'data-document-label="Defense presentation · Unofficial English translation · 17 slides · Original: Spanish"',
    count=2,
    label="main defense fallback labels",
)
write(index_path, index)

# 3) Translation labels: make original/translation status explicit in the viewer.
labels = {
    "en": "Defense presentation · Unofficial English translation · 17 slides · Original: Spanish",
    "de": "Verteidigungspräsentation · Inoffizielle deutsche Übersetzung · 17 Folien · Original: Spanisch",
    "es": "Presentación de defensa original · Español · 17 diapositivas",
}
for lang, value in labels.items():
    path = ROOT / "data" / "translations" / f"{lang}.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    if "documents" not in data or "defense" not in data["documents"] or "label" not in data["documents"]["defense"]:
        raise SystemExit(f"missing documents.defense.label in {lang}.json")
    data["documents"]["defense"]["label"] = value
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

# 4) Workbench: each language gets the matching defense PDF and an explicit status label.
workbench_path = "workbench/js/workbench.js"
workbench = read(workbench_path)
replacements = (
    (
        "{ label: 'Defense presentation · 17 slides', href: '../assets/documents/bacteriophage-therapy-defense.pdf' }",
        "{ label: 'Defense presentation · Unofficial English translation · 17 slides · Original: Spanish', href: '../assets/documents/bacteriophage-therapy-defense_EN.pdf' }",
        "Workbench EN defense",
    ),
    (
        "{ label: 'Presentación de defensa · 17 diapositivas', href: '../assets/documents/bacteriophage-therapy-defense.pdf' }",
        "{ label: 'Presentación de defensa original · Español · 17 diapositivas', href: '../assets/documents/bacteriophage-therapy-defense_ES.pdf' }",
        "Workbench ES defense",
    ),
    (
        "{ label: 'Präsentation zur Verteidigung · 17 Folien', href: '../assets/documents/bacteriophage-therapy-defense.pdf' }",
        "{ label: 'Verteidigungspräsentation · Inoffizielle deutsche Übersetzung · 17 Folien · Original: Spanisch', href: '../assets/documents/bacteriophage-therapy-defense_DE.pdf' }",
        "Workbench DE defense",
    ),
)
for old, new, label in replacements:
    workbench = replace_exact(workbench, old, new, count=1, label=label)
write(workbench_path, workbench)

# 5) Permanent integrity guard for defense routing and original/translation status.
verify_path = "tools/verify_portfolio_integrity.py"
verify = read(verify_path)
marker = """    language_notice_markers = (\n"""
checks = """    defense_paths = {\n        \"en\": \"assets/documents/bacteriophage-therapy-defense_EN.pdf\",\n        \"de\": \"assets/documents/bacteriophage-therapy-defense_DE.pdf\",\n        \"es\": \"assets/documents/bacteriophage-therapy-defense_ES.pdf\",\n    }\n    for language, relative_path in defense_paths.items():\n        if not (ROOT / relative_path).is_file():\n            fail(f\"language-specific bacteriophage defense PDF is missing for {language}: {relative_path}\")\n        if relative_path not in language_js:\n            fail(f\"main language routing is missing the {language} bacteriophage defense PDF: {relative_path}\")\n\n    if index.count('data-defense-link') != 2:\n        fail(\"main portfolio must expose exactly two language-aware defense links\")\n\n    workbench_defense_resources = (\n        \"../assets/documents/bacteriophage-therapy-defense_EN.pdf\",\n        \"../assets/documents/bacteriophage-therapy-defense_DE.pdf\",\n        \"../assets/documents/bacteriophage-therapy-defense_ES.pdf\",\n    )\n    for resource_path in workbench_defense_resources:\n        if resource_path not in workbench_js:\n            fail(f\"Workbench language-specific bacteriophage defense resource is missing: {resource_path}\")\n\n    old_generic_defense = \"bacteriophage-therapy-defense.pdf\"\n    if f'href=\"assets/documents/{old_generic_defense}\"' in index:\n        fail(\"main portfolio still links the generic defense PDF instead of a language-specific version\")\n    if f\"../assets/documents/{old_generic_defense}\" in workbench_js:\n        fail(\"Workbench still links the generic defense PDF instead of language-specific versions\")\n\n    defense_notice_markers = (\n        \"Defense presentation · Unofficial English translation · 17 slides · Original: Spanish\",\n        \"Verteidigungspräsentation · Inoffizielle deutsche Übersetzung · 17 Folien · Original: Spanisch\",\n        \"Presentación de defensa original · Español · 17 diapositivas\",\n    )\n    for phrase in defense_notice_markers:\n        if phrase not in published_text:\n            fail(f\"bacteriophage defense-language notice is missing: {phrase}\")\n\n"""
if checks.strip() in verify:
    raise SystemExit("defense integrity checks already present")
verify = replace_exact(verify, marker, checks + marker, count=1, label="integrity check insertion")
write(verify_path, verify)

# 6) Refresh content-derived cache busters for every modified JS asset.
def refresh_hash(html_path: str, asset_ref: str, asset_path: str) -> None:
    html = read(html_path)
    digest = hashlib.sha256((ROOT / asset_path).read_bytes()).hexdigest()[:12]
    pattern = re.escape(asset_ref) + r"\?v=[0-9a-f]+"
    updated, count = re.subn(pattern, f"{asset_ref}?v={digest}", html)
    if count != 1:
        raise SystemExit(f"cache buster for {asset_ref} in {html_path}: expected 1 match, found {count}")
    write(html_path, updated)

for html_path in ("index.html", "privacy.html", "404.html"):
    refresh_hash(html_path, "assets/js/language.js", "assets/js/language.js")
refresh_hash("workbench/index.html", "js/workbench.js", "workbench/js/workbench.js")

print("Defense language-document evolution applied successfully.")
