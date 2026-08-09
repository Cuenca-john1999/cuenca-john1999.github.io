#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LANGS = ("en", "de", "es")

NEW_EXPERIENCE = {
    "en": "My practical experience includes immunology and molecular biology research in Madrid and biomass analysis in Ireland, combining clinical samples, analytical protocols and progressively greater laboratory responsibility.",
    "de": "Meine praktische Erfahrung umfasst Immunologie- und Molekularbiologieforschung in Madrid sowie Biomasseanalytik in Irland, mit klinischen Proben, analytischen Protokollen und schrittweise wachsender Verantwortung im Labor.",
    "es": "Mi experiencia práctica incluye investigación en inmunología y biología molecular en Madrid y análisis de biomasa en Irlanda, combinando muestras clínicas, protocolos analíticos y una responsabilidad progresivamente mayor en el laboratorio.",
}

OLD_EN_INDEX = "My practical experience includes immunology and molecular biology research in Madrid and biomass analysis in Ireland, combining clinical samples, analytical protocols and independent laboratory responsibility."


def write(path: Path, text: str) -> None:
    path.write_text(text, encoding="utf-8")


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"[3p-followup] expected one {label}; found {count}")
    return text.replace(old, new, 1)


def verify_dead_keys_unreferenced() -> None:
    needles = ("responsibilityCards", "responsibilityHighlights")
    offenders: list[str] = []
    for path in ROOT.rglob("*"):
        if not path.is_file() or ".git" in path.parts:
            continue
        if path.parent == ROOT / "data" / "translations" and path.suffix == ".json":
            continue
        if path == Path(__file__).resolve():
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue
        for needle in needles:
            if needle in text:
                offenders.append(f"{path.relative_to(ROOT)}:{needle}")
    if offenders:
        raise SystemExit("[3p-followup] obsolete Responsibility keys still referenced: " + ", ".join(offenders))


def update_translations() -> None:
    verify_dead_keys_unreferenced()
    for language in LANGS:
        path = ROOT / "data" / "translations" / f"{language}.json"
        data = json.loads(path.read_text(encoding="utf-8"))

        if data["sections"]["experience"]["body"] == NEW_EXPERIENCE[language]:
            raise SystemExit(f"[3p-followup] {language} experience wording already changed unexpectedly")
        data["sections"]["experience"]["body"] = NEW_EXPERIENCE[language]

        removed = []
        if "responsibilityHighlights" in data.get("accessibility", {}):
            data["accessibility"].pop("responsibilityHighlights")
            removed.append("accessibility.responsibilityHighlights")
        if "responsibility" in data.get("sections", {}):
            data["sections"].pop("responsibility")
            removed.append("sections.responsibility")
        if "responsibilityCards" in data:
            data.pop("responsibilityCards")
            removed.append("responsibilityCards")

        if len(removed) != 3:
            raise SystemExit(f"[3p-followup] {language} expected 3 obsolete Responsibility blocks, removed {removed}")
        write(path, json.dumps(data, ensure_ascii=False, indent=2) + "\n")


def update_index() -> None:
    path = ROOT / "index.html"
    text = path.read_text(encoding="utf-8")
    text = replace_once(text, OLD_EN_INDEX, NEW_EXPERIENCE["en"], "English experience summary")
    write(path, text)


def patch_generator() -> None:
    path = ROOT / "tools" / "generate_localized_pages.py"
    text = path.read_text(encoding="utf-8")

    text = replace_once(
        text,
        "import argparse\nimport re\nfrom pathlib import Path\n",
        "import argparse\nimport html\nimport json\nimport re\nimport subprocess\nfrom pathlib import Path\n",
        "generator imports",
    )

    marker = 'BASE_URL = "https://cuenca-john1999.github.io"\n\n'
    person_meta = '''BASE_URL = "https://cuenca-john1999.github.io"\n\nPERSON_META = {\n    "de": {\n        "description": "Profil im klinisch-biomedizinischen Labor mit praktischer Erfahrung in Molekularbiologie, Immunologie, analytischer Laborarbeit und wissenschaftlicher Dokumentation.",\n        "knowsAbout": [\n            "Klinische und biomedizinische Laborwissenschaft", "Molekularbiologie", "Immunologie", "PCR", "ELISA",\n            "Western Blot", "Zellkultur", "Analytische Laborarbeit", "Gute Laborpraxis (GLP)", "SOP-Dokumentation",\n        ],\n    },\n    "es": {\n        "description": "Perfil de laboratorio clínico y biomédico con experiencia práctica en biología molecular, inmunología, trabajo analítico de laboratorio y documentación científica.",\n        "knowsAbout": [\n            "Laboratorio clínico y biomédico", "Biología molecular", "Inmunología", "PCR", "ELISA",\n            "Western blot", "Cultivo celular", "Trabajo analítico de laboratorio", "Buenas Prácticas de Laboratorio (GLP)", "Documentación SOP",\n        ],\n    },\n}\n\n'''
    text = replace_once(text, marker, person_meta, "generator PERSON_META insertion")

    insertion_marker = "\ndef render_main(language: str) -> str:\n"
    helpers = r'''

def flatten_strings(value: object, prefix: str = "") -> dict[str, str]:
    result: dict[str, str] = {}
    if isinstance(value, dict):
        for key, child in value.items():
            path = f"{prefix}.{key}" if prefix else key
            result.update(flatten_strings(child, path))
    elif isinstance(value, str) and prefix:
        result[prefix] = value
    return result


def load_main_translation(language: str) -> dict:
    path = ROOT / "data" / "translations" / f"{language}.json"
    return json.loads(path.read_text(encoding="utf-8"))


def load_workbench_translation(language: str) -> dict:
    data_file = ROOT / "workbench" / "js" / "workbench-data.js"
    node_source = r"""
global.window = {};
require(process.argv[1]);
const language = process.argv[2];
if (!window.WorkbenchData || !window.WorkbenchData.translations[language]) process.exit(2);
process.stdout.write(JSON.stringify(window.WorkbenchData.translations[language]));
"""
    completed = subprocess.run(
        ["node", "-e", node_source, str(data_file), language],
        check=True,
        capture_output=True,
        text=True,
    )
    return json.loads(completed.stdout)


def localize_markup(text: str, dictionary: dict) -> str:
    values = flatten_strings(dictionary)

    element_pattern = re.compile(
        r'(?P<open><(?P<tag>[A-Za-z][\w:-]*)(?P<attrs>[^>]*\sdata-i18n(?:-html)?="(?P<key>[^"]+)"[^>]*)>)'
        r'(?P<body>.*?)'
        r'(?P<close></(?P=tag)>)',
        re.S,
    )

    def replace_element(match: re.Match[str]) -> str:
        key = match.group("key")
        if key not in values:
            raise SystemExit(f"[localized-pages] missing static translation key: {key}")
        value = values[key]
        rendered = value if 'data-i18n-html=' in match.group("attrs") else html.escape(value, quote=False)
        return f'{match.group("open")}{rendered}{match.group("close")}'

    text = element_pattern.sub(replace_element, text)

    attribute_map = {
        "data-i18n-aria-label": "aria-label",
        "data-i18n-aria-roledescription": "aria-roledescription",
        "data-i18n-title": "title",
        "data-i18n-alt": "alt",
    }
    for marker, target in attribute_map.items():
        opening_pattern = re.compile(
            rf'<(?P<tag>[A-Za-z][\w:-]*)(?P<attrs>[^>]*\s{re.escape(marker)}="(?P<key>[^"]+)"[^>]*)>'
        )

        def replace_attribute(match: re.Match[str], marker: str = marker, target: str = target) -> str:
            key = match.group("key")
            if key not in values:
                raise SystemExit(f"[localized-pages] missing static attribute translation key: {key}")
            translated = html.escape(values[key], quote=True)
            opening = match.group(0)
            target_pattern = re.compile(rf'{re.escape(target)}="[^"]*"')
            if target_pattern.search(opening):
                return target_pattern.sub(f'{target}="{translated}"', opening, count=1)
            return opening[:-1] + f' {target}="{translated}">'

        text = opening_pattern.sub(replace_attribute, text)

    return text


def localize_language_controls(text: str, language: str) -> str:
    for candidate in ("en", "de", "es"):
        pattern = re.compile(
            rf'(<button type="button" data-language-set="{candidate}" aria-pressed=")(?:true|false)(">{candidate.upper()}</button>)'
        )
        text, count = pattern.subn(
            rf'\g<1>{str(candidate == language).lower()}\g<2>', text, count=1
        )
        if count != 1:
            raise SystemExit(f"[localized-pages] missing language control: {candidate}")
    return text


def localize_profile_json_ld(text: str, language: str) -> str:
    pattern = re.compile(r'(<script type="application/ld\+json">\s*)(.*?)(\s*</script>)', re.S)
    match = pattern.search(text)
    if not match:
        raise SystemExit("[localized-pages] missing ProfilePage JSON-LD")
    data = json.loads(match.group(2))
    person = data.get("mainEntity")
    if not isinstance(person, dict):
        raise SystemExit("[localized-pages] missing ProfilePage mainEntity")
    person["description"] = PERSON_META[language]["description"]
    person["knowsAbout"] = PERSON_META[language]["knowsAbout"]
    rendered = json.dumps(data, ensure_ascii=False, indent=6)
    return text[:match.start()] + f'{match.group(1)}{rendered}{match.group(3)}' + text[match.end():]

'''
    text = replace_once(text, insertion_marker, helpers + insertion_marker, "generator localization helpers")

    main_tail = '''    source = source.replace('href="assets/', 'href="../assets/')\n    source = source.replace('src="assets/', 'src="../assets/')\n    source = source.replace('href="privacy.html"', f'href="../privacy.html?lang={language}"')\n    return source\n'''
    main_tail_new = '''    source = source.replace('href="assets/', 'href="../assets/')\n    source = source.replace('src="assets/', 'src="../assets/')\n    source = source.replace('href="privacy.html"', f'href="../privacy.html?lang={language}"')\n    source = source.replace('../assets/documents/Jhon_M_Cuenca_CV_EN.pdf', f'../assets/documents/Jhon_M_Cuenca_CV_{language.upper()}.pdf')\n    source = source.replace('../assets/documents/bacteriophage-therapy-final-project_EN.pdf', f'../assets/documents/bacteriophage-therapy-final-project_{language.upper()}.pdf')\n    source = source.replace('../assets/documents/bacteriophage-therapy-defense_EN.pdf', f'../assets/documents/bacteriophage-therapy-defense_{language.upper()}.pdf')\n    source = localize_markup(source, load_main_translation(language))\n    source = localize_language_controls(source, language)\n    source = localize_profile_json_ld(source, language)\n    return source\n'''
    text = replace_once(text, main_tail, main_tail_new, "render_main localized fallback")

    wb_tail = '''    source = source.replace('href="../assets/', 'href="../../assets/')\n    source = source.replace('src="../assets/', 'src="../../assets/')\n    source = source.replace('href="css/', 'href="../../workbench/css/')\n    source = source.replace('src="js/', 'src="../../workbench/js/')\n    return source\n'''
    wb_tail_new = '''    source = source.replace('href="../assets/', 'href="../../assets/')\n    source = source.replace('src="../assets/', 'src="../../assets/')\n    source = source.replace('href="css/', 'href="../../workbench/css/')\n    source = source.replace('src="js/', 'src="../../workbench/js/')\n    source = localize_markup(source, load_workbench_translation(language))\n    source = localize_language_controls(source, language)\n    return source\n'''
    text = replace_once(text, wb_tail, wb_tail_new, "render_workbench localized fallback")
    write(path, text)


def patch_integrity_guard() -> None:
    path = ROOT / "tools" / "verify_portfolio_integrity.py"
    text = path.read_text(encoding="utf-8")
    marker = "\ndef check_public_privacy_guards() -> None:\n"
    function = r'''

def check_localized_static_fallbacks() -> None:
    expectations = {
        "de/index.html": (
            "Klinisch-biomedizinisches<br>Laborprofil",
            "Eine Laborprofil geprägt von" if False else "Ein Laborprofil geprägt von",
            "Jhon_M_Cuenca_CV_DE.pdf",
            "bacteriophage-therapy-final-project_DE.pdf",
            "Profil im klinisch-biomedizinischen Labor mit praktischer Erfahrung",
            'data-language-set="de" aria-pressed="true"',
        ),
        "es/index.html": (
            "Técnico Superior en<br>Laboratorio Clínico y Biomédico",
            "Un perfil de laboratorio definido por la precisión",
            "Jhon_M_Cuenca_CV_ES.pdf",
            "bacteriophage-therapy-final-project_ES.pdf",
            "Perfil de laboratorio clínico y biomédico con experiencia práctica",
            'data-language-set="es" aria-pressed="true"',
        ),
        "de/workbench/index.html": (
            "Ein lebendiger Raum zum<br><span>Entwickeln, Testen und Lernen.</span>",
            "Projekte",
            'data-language-set="de" aria-pressed="true"',
        ),
        "es/workbench/index.html": (
            "Un espacio vivo para<br><span>construir, probar y aprender.</span>",
            "Proyectos",
            'data-language-set="es" aria-pressed="true"',
        ),
    }
    forbidden_fallbacks = {
        "de/index.html": ("Clinical &amp; Biomedical<br>Laboratory Profile", "independent laboratory responsibility"),
        "es/index.html": ("Clinical &amp; Biomedical<br>Laboratory Profile", "independent laboratory responsibility"),
        "de/workbench/index.html": ("A living space for<br><span>building, testing and learning.</span>",),
        "es/workbench/index.html": ("A living space for<br><span>building, testing and learning.</span>",),
    }
    for relative, markers in expectations.items():
        content = (ROOT / relative).read_text(encoding="utf-8")
        for marker in markers:
            if marker not in content:
                fail(f"localized static fallback marker missing in {relative}: {marker}")
        for marker in forbidden_fallbacks[relative]:
            if marker in content:
                fail(f"English fallback leaked into localized static page {relative}: {marker}")

    translations = load_translations()
    for language, data in translations.items():
        if "responsibilityHighlights" in data.get("accessibility", {}):
            fail(f"obsolete Responsibility accessibility key remains for {language}")
        if "responsibility" in data.get("sections", {}):
            fail(f"obsolete Responsibility section remains for {language}")
        if "responsibilityCards" in data:
            fail(f"obsolete Responsibility cards remain for {language}")

'''
    text = replace_once(text, marker, function + marker, "localized fallback guard insertion")
    text = replace_once(
        text,
        "    check_search_discovery()\n    check_public_privacy_guards()\n",
        "    check_search_discovery()\n    check_localized_static_fallbacks()\n    check_public_privacy_guards()\n",
        "localized fallback guard call",
    )
    write(path, text)


def bump_language_cache() -> None:
    language_path = ROOT / "assets" / "js" / "language.js"
    language_text = language_path.read_text(encoding="utf-8")
    language_text = re.sub(
        r"const TRANSLATION_VERSION = '[^']+';",
        "const TRANSLATION_VERSION = '20260809-audit-3p-followups';",
        language_text,
        count=1,
    )
    write(language_path, language_text)
    digest = hashlib.sha256(language_path.read_bytes()).hexdigest()[:12]
    for relative in ("index.html", "privacy.html", "404.html"):
        path = ROOT / relative
        content = path.read_text(encoding="utf-8")
        content, count = re.subn(
            r'(assets/js/language\.js\?v=)[0-9a-f]{12}',
            rf'\g<1>{digest}',
            content,
        )
        if count != 1:
            raise SystemExit(f"[3p-followup] expected one language.js token in {relative}; found {count}")
        write(path, content)


def main() -> None:
    update_translations()
    update_index()
    patch_generator()
    patch_integrity_guard()
    bump_language_cache()
    print("[3p-followup] patch applied")


if __name__ == "__main__":
    main()
