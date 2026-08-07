#!/usr/bin/env python3
"""Static integrity checks for the public portfolio and Workbench.

Dependency-free by design so it can run locally or in GitHub Actions.
It checks structural/i18n integrity and a small set of high-risk content guards.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LANGUAGES = ("en", "de", "es")


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
    published_text = "\n".join(
        [
            index,
            workbench,
            workbench_js,
            *(ROOT / "data" / "translations" / f"{language}.json").read_text(encoding="utf-8")
            for language in LANGUAGES
        ]
    )
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


def main() -> None:
    translations = load_translations()
    check_translation_parity(translations)
    check_index_i18n_keys(translations)
    check_duplicate_ids(ROOT / "index.html")
    check_duplicate_ids(ROOT / "workbench" / "index.html")
    check_required_content()
    print("Portfolio integrity checks passed.")


if __name__ == "__main__":
    main()
