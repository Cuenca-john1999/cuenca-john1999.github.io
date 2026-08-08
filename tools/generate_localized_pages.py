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
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "https://cuenca-john1999.github.io"

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
    source = replace_once(
        source,
        f'"url": "{BASE_URL}/",',
        f'"url": "{url}",',
        "localized ProfilePage url",
    )

    source = source.replace('href="assets/', 'href="../assets/')
    source = source.replace('src="assets/', 'src="../assets/')
    source = source.replace('href="privacy.html"', f'href="../privacy.html?lang={language}"')
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


def outputs() -> dict[Path, str]:
    return {
        ROOT / "de" / "index.html": render_main("de"),
        ROOT / "es" / "index.html": render_main("es"),
        ROOT / "de" / "workbench" / "index.html": render_workbench("de"),
        ROOT / "es" / "workbench" / "index.html": render_workbench("es"),
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
