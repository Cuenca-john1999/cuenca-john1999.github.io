#!/usr/bin/env python3
"""Static integrity checks for the public portfolio and Workbench.

Dependency-free by design so it can run locally or in GitHub Actions.
It checks structural/i18n integrity and a small set of high-risk content guards.
"""

from __future__ import annotations

import hashlib
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
LANGUAGES = ("en", "de", "es")
HTML_PAGES = ("index.html", "workbench/index.html", "privacy.html", "404.html")


def fail(message: str) -> None:
    raise SystemExit(f"[portfolio-integrity] {message}")


def flatten_keys(value: object, prefix: str = "") -> set[str]:
    keys: set[str] = set()
    if isinstance(value, dict):
        for key, child in value.items():
            path = f"{prefix}.{key}" if prefix else key
            if isinstance(child, dict):
                keys.update(flatten_keys(child, path))
            else:
                keys.add(path)
    return keys


def load_translations() -> dict[str, dict]:
    translations: dict[str, dict] = {}
    for language in LANGUAGES:
        path = ROOT / "data" / "translations" / f"{language}.json"
        translations[language] = json.loads(path.read_text(encoding="utf-8"))
    return translations


def check_translation_parity(translations: dict[str, dict]) -> None:
    flattened = {language: flatten_keys(data) for language, data in translations.items()}
    reference = flattened["en"]
    for language in ("de", "es"):
        missing = sorted(reference - flattened[language])
        extra = sorted(flattened[language] - reference)
        if missing or extra:
            fail(
                f"translation key mismatch for {language}: "
                f"missing={missing[:20]} extra={extra[:20]}"
            )


def check_index_i18n_keys(translations: dict[str, dict]) -> None:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    patterns = (
        r'data-i18n="([^"]+)"',
        r'data-i18n-html="([^"]+)"',
        r'data-i18n-aria-label="([^"]+)"',
        r'data-i18n-title="([^"]+)"',
        r'data-i18n-alt="([^"]+)"',
        r'data-document-heading-key="([^"]+)"',
        r'data-document-label-key="([^"]+)"',
    )
    referenced: set[str] = set()
    for pattern in patterns:
        referenced.update(re.findall(pattern, html))

    for language, dictionary in translations.items():
        available = flatten_keys(dictionary)
        missing = sorted(referenced - available)
        if missing:
            fail(f"index.html references missing {language} i18n keys: {missing[:30]}")


def check_duplicate_ids(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    ids = re.findall(r'\bid="([^"]+)"', text)
    seen: set[str] = set()
    duplicates: set[str] = set()
    for value in ids:
        if value in seen:
            duplicates.add(value)
        seen.add(value)
    if duplicates:
        fail(f"{path.relative_to(ROOT)} contains duplicate ids: {sorted(duplicates)}")


def check_required_content() -> None:
    index = (ROOT / "index.html").read_text(encoding="utf-8")
    workbench = (ROOT / "workbench" / "index.html").read_text(encoding="utf-8")
    workbench_js = (ROOT / "workbench" / "js" / "workbench.js").read_text(encoding="utf-8")
    language_js = (ROOT / "assets" / "js" / "language.js").read_text(encoding="utf-8")

    for required in ("DeutschOS", "AETEL 2025", "Bacteriophage Therapy"):
        if required not in index:
            fail(f"Selected Work marker missing from index.html: {required}")

    for entry_id in (
        "entry-deutschos",
        "entry-chitosan",
        "entry-phage",
        "entry-portfolio",
        "entry-laprincesa",
        "entry-celignis",
    ):
        if f'id="{entry_id}"' not in workbench:
            fail(f"Workbench deep link missing: #{entry_id}")

    if "No experimental validation" not in index:
        fail("AETEL validation limitation is missing from index.html")
    if "co-authored academic literature review" not in workbench:
        fail("Bacteriophage co-authorship/literature-review scope is missing from Workbench")

    forbidden = (
        "administration of drugs/substances by injection",
        "administración de fármacos/sustancias mediante inyección",
        "Verabreichung von Arzneimitteln/Substanzen per Injektion",
    )
    translation_texts = [
        (ROOT / "data" / "translations" / f"{language}.json").read_text(encoding="utf-8")
        for language in LANGUAGES
    ]
    published_text = "\n".join([index, workbench, workbench_js, *translation_texts])
    for phrase in forbidden:
        if phrase in published_text:
            fail(f"animal-experience overclaim wording found: {phrase}")

    required_animal_scope = (
        "animal handling, injections, anaesthesia",
        "included euthanasia; not presented as independent practice",
    )
    for phrase in required_animal_scope:
        if phrase not in published_text:
            fail(f"audited animal-experience scope marker missing: {phrase}")

    if "const DEFAULT_LANGUAGE = 'en';" not in language_js:
        fail("main portfolio fallback language is not English")
    if "URL_LANGUAGE_PARAM = 'lang'" not in language_js:
        fail("main portfolio shareable language routing is missing")
    if "URL_LANGUAGE_PARAM = 'lang'" not in workbench_js:
        fail("Workbench shareable language routing is missing")
    if "currentLanguae" in workbench_js:
        fail("Workbench contains the misspelled currentLanguage identifier that breaks multi-page resource rendering")

    education_markers = (
        'data-education-evidence="operations"',
        'Official final grade: 8.69/10',
        'Diploma for excellent academic performance in the second year',
        'Laboratory Auxiliary Services · Technical English',
        'Applied academic evidence',
        'data-education-evidence="credentials"',
        'Animal Experimentation · Functions A+B+C',
        'Healthcare Centre Management',
        'Basic Level Occupational Risk Prevention',
    )
    for marker in education_markers:
        if marker not in index:
            fail(f"education evolution marker missing from index.html: {marker}")
    if index.count('class="credential-card"') != 3:
        fail("education credentials must remain split into exactly three visible credential cards")



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



def check_cache_busting() -> None:
    """Require every local CSS/JS reference in public HTML to use its content hash.

    The first 12 hexadecimal characters of SHA-256 are used as the ``?v=`` token.
    Any CSS/JS content change therefore makes CI fail until the HTML reference is
    refreshed, preventing stale browser caches after publication.
    """
    asset_pattern = re.compile(
        r'(?:href|src)="([^"?#]+\.(?:css|js))(?:\?v=([^"#]+))?"'
    )
    checked = 0

    for relative in HTML_PAGES:
        page = ROOT / relative
        html = page.read_text(encoding="utf-8")
        for asset_url, version in asset_pattern.findall(html):
            parsed = urlsplit(asset_url)
            if parsed.scheme or asset_url.startswith(("//", "/")):
                continue

            target = (page.parent / parsed.path).resolve()
            try:
                target.relative_to(ROOT.resolve())
            except ValueError:
                fail(f"cache-busted asset escapes repository root: {relative} -> {asset_url}")

            if not target.is_file():
                fail(f"cache-busted local asset is missing: {relative} -> {asset_url}")

            expected = hashlib.sha256(target.read_bytes()).hexdigest()[:12]
            if version != expected:
                fail(
                    f"stale or missing cache version: {relative} -> {asset_url} "
                    f"has v={version or '<missing>'}, expected v={expected}"
                )
            checked += 1

    if checked == 0:
        fail("no local CSS/JS cache-busting references were checked")

def main() -> None:
    translations = load_translations()
    check_translation_parity(translations)
    check_index_i18n_keys(translations)
    check_auxiliary_i18n_keys(translations)
    check_duplicate_ids(ROOT / "index.html")
    check_duplicate_ids(ROOT / "workbench" / "index.html")
    check_duplicate_ids(ROOT / "privacy.html")
    check_duplicate_ids(ROOT / "404.html")
    check_local_links_and_fragments()
    check_structured_data_and_privacy()
    check_public_privacy_guards()
    check_cache_busting()
    check_required_content()
    print("Portfolio integrity checks passed.")


if __name__ == "__main__":
    main()
