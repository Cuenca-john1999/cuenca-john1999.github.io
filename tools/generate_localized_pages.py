#!/usr/bin/env python3
"""Generate SEO-localized static entry pages from the canonical portfolio sources.

English remains canonical at `/` and `/workbench/`. German and Spanish entry
pages are generated at `/de/`, `/es/`, `/de/workbench/`, and `/es/workbench/`.
The generated copies intentionally reuse the same CSS/JS/content sources; the
localized route locks the runtime language while keeping one maintainable source
of truth for professional and scientific content.
"""

from __future__ import annotations

import argparse
import html
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "https://cuenca-john1999.github.io"

PERSON_META = {
    "de": {
        "description": "Profil im klinisch-biomedizinischen Labor mit praktischer Erfahrung in Molekularbiologie, Immunologie, analytischer Laborarbeit und wissenschaftlicher Dokumentation.",
        "knowsAbout": [
            "Klinische und biomedizinische Laborwissenschaft", "Molekularbiologie", "Immunologie", "PCR", "ELISA",
            "Western Blot", "Zellkultur", "Analytische Laborarbeit", "Gute Laborpraxis (GLP)", "SOP-Dokumentation",
        ],
    },
    "es": {
        "description": "Perfil de laboratorio clínico y biomédico con experiencia práctica en biología molecular, inmunología, trabajo analítico de laboratorio y documentación científica.",
        "knowsAbout": [
            "Laboratorio clínico y biomédico", "Biología molecular", "Inmunología", "PCR", "ELISA",
            "Western blot", "Cultivo celular", "Trabajo analítico de laboratorio", "Buenas Prácticas de Laboratorio (GLP)", "Documentación SOP",
        ],
    },
}

MAIN_META = {
    "de": {
        "title": "Jhon M. Cuenca | Klinisch-biomedizinisches Laborprofil",
        "description": "Professionelles Portfolio von Jhon M. Cuenca mit Schwerpunkt auf klinisch-biomedizinischer Laborpraxis, Molekularbiologie, Immunologie, analytischer Laborarbeit und Dokumentation.",
        "locale": "de_DE",
        "site_name": "Jhon M. Cuenca | Klinisch-biomedizinisches Laborportfolio",
        "image_alt": "Wissenschaftliches Portfolio von Jhon M. Cuenca mit blauer DNA-Helix, Laborbereichen und Mikroskop.",
    },
    "es": {
        "title": "Jhon M. Cuenca | Laboratorio Clínico y Biomédico",
        "description": "Portafolio profesional de Jhon M. Cuenca centrado en laboratorio clínico y biomédico, biología molecular, inmunología, trabajo analítico y documentación.",
        "locale": "es_ES",
        "site_name": "Jhon M. Cuenca | Portafolio de Laboratorio Clínico y Biomédico",
        "image_alt": "Portafolio científico de Jhon M. Cuenca con una hélice de ADN azul, áreas de laboratorio y un microscopio.",
    },
}

WORKBENCH_META = {
    "de": {
        "title": "JMC Workbench | Projekte, Notizen & Meilensteine",
        "description": "Workbench von Jhon M. Cuenca mit Projekten, Forschungsnotizen, technischem Lernen und dokumentierten Meilensteinen.",
        "locale": "de_DE",
        "image_alt": "Wissenschaftliches Portfolio von Jhon M. Cuenca mit blauer DNA-Helix, Laborbereichen und Mikroskop.",
    },
    "es": {
        "title": "JMC Workbench | Proyectos, notas e hitos",
        "description": "Workbench de Jhon M. Cuenca con proyectos, notas de investigación, aprendizaje técnico e hitos documentados.",
        "locale": "es_ES",
        "image_alt": "Portafolio científico de Jhon M. Cuenca con una hélice de ADN azul, áreas de laboratorio y un microscopio.",
    },
}

MAIN_HREFLANG = (
    f'    <link rel="alternate" hreflang="en" href="{BASE_URL}/">\n'
    f'    <link rel="alternate" hreflang="de" href="{BASE_URL}/de/">\n'
    f'    <link rel="alternate" hreflang="es" href="{BASE_URL}/es/">\n'
    f'    <link rel="alternate" hreflang="x-default" href="{BASE_URL}/">'
)

WORKBENCH_HREFLANG = (
    f'    <link rel="alternate" hreflang="en" href="{BASE_URL}/workbench/">\n'
    f'    <link rel="alternate" hreflang="de" href="{BASE_URL}/de/workbench/">\n'
    f'    <link rel="alternate" hreflang="es" href="{BASE_URL}/es/workbench/">\n'
    f'    <link rel="alternate" hreflang="x-default" href="{BASE_URL}/workbench/">'
)


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"[localized-pages] expected one {label}; found {count}")
    return text.replace(old, new, 1)


def replace_meta(text: str, attribute: str, key: str, value: str) -> str:
    pattern = re.compile(
        rf'(<meta\s+{re.escape(attribute)}="{re.escape(key)}"\s+content=")([^"]*)(">)'
    )
    updated, count = pattern.subn(lambda match: f"{match.group(1)}{value}{match.group(3)}", text, count=1)
    if count != 1:
        raise SystemExit(f"[localized-pages] missing meta {attribute}={key}")
    return updated


def replace_title(text: str, title: str) -> str:
    updated, count = re.subn(r"<title>.*?</title>", f"<title>{title}</title>", text, count=1, flags=re.S)
    if count != 1:
        raise SystemExit("[localized-pages] missing title")
    return updated


def replace_canonical(text: str, url: str) -> str:
    updated, count = re.subn(
        r'<link rel="canonical" href="[^"]+">',
        f'<link rel="canonical" href="{url}">',
        text,
        count=1,
    )
    if count != 1:
        raise SystemExit("[localized-pages] missing canonical")
    return updated


def replace_og_locales(text: str, primary: str) -> str:
    text = re.sub(r'\n\s*<meta property="og:locale:alternate" content="[^"]+">', "", text)
    alternates = [locale for locale in ("en_US", "de_DE", "es_ES") if locale != primary]
    primary_tag = f'<meta property="og:locale" content="{primary}">'
    addition = "\n".join(
        [primary_tag] + [f'    <meta property="og:locale:alternate" content="{locale}">' for locale in alternates]
    )
    updated, count = re.subn(r'<meta property="og:locale" content="[^"]+">', addition, text, count=1)
    if count != 1:
        raise SystemExit("[localized-pages] missing og:locale")
    return updated



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


def render_main(language: str) -> str:
    source = (ROOT / "index.html").read_text(encoding="utf-8")
    meta = MAIN_META[language]
    url = f"{BASE_URL}/{language}/"

    source = replace_once(
        source,
        '<html lang="en" data-theme="dark" data-language-route="profile">',
        f'<html lang="{language}" data-theme="dark" data-language-route="profile" data-localized-language="{language}" data-site-root="../">',
        "localized main html marker",
    )
    source = replace_meta(source, "name", "description", meta["description"])
    source = replace_canonical(source, url)
    source = replace_meta(source, "property", "og:title", meta["title"])
    source = replace_meta(source, "property", "og:description", meta["description"])
    source = replace_meta(source, "property", "og:url", url)
    source = replace_meta(source, "property", "og:site_name", meta["site_name"])
    source = replace_og_locales(source, meta["locale"])
    source = replace_meta(source, "property", "og:image:alt", meta["image_alt"])
    source = replace_meta(source, "name", "twitter:title", meta["title"])
    source = replace_meta(source, "name", "twitter:description", meta["description"])
    source = replace_meta(source, "name", "twitter:image:alt", meta["image_alt"])
    source = replace_title(source, meta["title"])

    source = replace_once(
        source,
        f'"@id": "{BASE_URL}/#profile-page"',
        f'"@id": "{url}#profile-page"',
        "localized ProfilePage id",
    )
    profile_url = f'"url": "{BASE_URL}/",'
    if profile_url not in source:
        raise SystemExit("[localized-pages] missing ProfilePage url")
    source = source.replace(profile_url, f'"url": "{url}",', 1)

    source = source.replace('href="assets/', 'href="../assets/')
    source = source.replace('src="assets/', 'src="../assets/')
    source = source.replace('href="privacy.html"', f'href="../privacy.html?lang={language}"')
    source = source.replace('../assets/documents/Jhon_M_Cuenca_CV_EN.pdf', f'../assets/documents/Jhon_M_Cuenca_CV_{language.upper()}.pdf')
    source = source.replace('../assets/documents/bacteriophage-therapy-final-project_EN.pdf', f'../assets/documents/bacteriophage-therapy-final-project_{language.upper()}.pdf')
    source = source.replace('../assets/documents/bacteriophage-therapy-defense_EN.pdf', f'../assets/documents/bacteriophage-therapy-defense_{language.upper()}.pdf')
    source = localize_markup(source, load_main_translation(language))
    source = localize_language_controls(source, language)
    source = localize_profile_json_ld(source, language)
    return source


def render_workbench(language: str) -> str:
    source = (ROOT / "workbench" / "index.html").read_text(encoding="utf-8")
    meta = WORKBENCH_META[language]
    url = f"{BASE_URL}/{language}/workbench/"

    source = replace_once(
        source,
        '<html lang="en" data-theme="dark" data-language-route="workbench" data-site-root="../">',
        f'<html lang="{language}" data-theme="dark" data-language-route="workbench" data-site-root="../../" data-localized-language="{language}">',
        "localized workbench html marker",
    )
    source = replace_meta(source, "name", "description", meta["description"])
    source = replace_canonical(source, url)
    source = replace_meta(source, "property", "og:title", meta["title"])
    source = replace_meta(source, "property", "og:description", meta["description"])
    source = replace_meta(source, "property", "og:url", url)
    source = replace_og_locales(source, meta["locale"])
    source = replace_meta(source, "property", "og:image:alt", meta["image_alt"])
    source = replace_meta(source, "name", "twitter:title", meta["title"])
    source = replace_meta(source, "name", "twitter:description", meta["description"])
    source = replace_meta(source, "name", "twitter:image:alt", meta["image_alt"])
    source = replace_title(source, meta["title"])

    source = source.replace('href="../assets/', 'href="../../assets/')
    source = source.replace('src="../assets/', 'src="../../assets/')
    source = source.replace('href="css/', 'href="../../workbench/css/')
    source = source.replace('src="js/', 'src="../../workbench/js/')
    source = localize_markup(source, load_workbench_translation(language))
    source = localize_language_controls(source, language)
    return source


def render_sitemap() -> str:
    urls = (
        f"{BASE_URL}/",
        f"{BASE_URL}/de/",
        f"{BASE_URL}/es/",
        f"{BASE_URL}/workbench/",
        f"{BASE_URL}/de/workbench/",
        f"{BASE_URL}/es/workbench/",
        f"{BASE_URL}/privacy.html",
    )
    body = "\n".join(f"  <url>\n    <loc>{url}</loc>\n  </url>" for url in urls)
    return f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{body}\n</urlset>\n'


def normalize_generated_html(text: str) -> str:
    return "\n".join(line.rstrip() for line in text.splitlines()) + "\n"


def outputs() -> dict[Path, str]:
    return {
        ROOT / "de" / "index.html": normalize_generated_html(render_main("de")),
        ROOT / "es" / "index.html": normalize_generated_html(render_main("es")),
        ROOT / "de" / "workbench" / "index.html": normalize_generated_html(render_workbench("de")),
        ROOT / "es" / "workbench" / "index.html": normalize_generated_html(render_workbench("es")),
        ROOT / "sitemap.xml": render_sitemap(),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="Fail when generated files are stale")
    args = parser.parse_args()

    stale: list[str] = []
    for path, expected in outputs().items():
        if args.check:
            if not path.is_file() or path.read_text(encoding="utf-8") != expected:
                stale.append(str(path.relative_to(ROOT)))
            continue

        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(expected, encoding="utf-8")
        print(f"[localized-pages] wrote {path.relative_to(ROOT)}")

    if stale:
        raise SystemExit(f"[localized-pages] stale generated files: {', '.join(stale)}")

    if args.check:
        print("[localized-pages] OK: localized routes and sitemap are synchronized")


if __name__ == "__main__":
    main()
