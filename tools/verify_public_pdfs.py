#!/usr/bin/env python3
"""Privacy preflight for PDFs published by the portfolio.

Blocking findings cover sensitive data that should not be public. Academic
personal-dedication content is reported as an advisory because it belongs to
the authored source document and requires an explicit publication decision.
Matched sensitive values are never printed into CI logs.
"""

from __future__ import annotations

import hashlib
import re
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
DOCUMENTS = ROOT / "assets" / "documents"

EMAIL_RE = re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.I)
INTERNATIONAL_PHONE_RE = re.compile(r"(?<!\w)\+\d[\d\s().-]{7,}\d(?!\w)")
SPANISH_ID_RE = re.compile(r"\b(?:\d{8}[A-Z]|[XYZ]\d{7}[A-Z])\b", re.I)
LOCAL_PATH_MARKERS = ("/Volumes/", "/Users/", ".continue/")
PRIVATE_KEY_MARKERS = ("BEGIN OPENSSH PRIVATE KEY", "BEGIN RSA PRIVATE KEY", "BEGIN PRIVATE KEY")
DEDICATION_MARKERS = ("A mi madre,", "To my mother,", "Meiner Mutter,")

blockers: list[tuple[str, str]] = []
advisories: list[tuple[str, str]] = []


def add_unique(target: list[tuple[str, str]], filename: str, category: str) -> None:
    item = (filename, category)
    if item not in target:
        target.append(item)


def block(filename: str, category: str) -> None:
    add_unique(blockers, filename, category)


def advise(filename: str, category: str) -> None:
    add_unique(advisories, filename, category)


def extract_pdf(path: Path) -> tuple[str, str]:
    try:
        reader = PdfReader(str(path))
    except Exception as exc:  # pragma: no cover - CI diagnostic
        block(path.name, f"unreadable PDF ({type(exc).__name__})")
        return "", ""

    text = "\n".join((page.extract_text() or "") for page in reader.pages)
    metadata = reader.metadata or {}
    metadata_text = "\n".join(str(value) for value in metadata.values() if value)
    return text, metadata_text


def check_common(path: Path, combined: str) -> None:
    if any(marker in combined for marker in LOCAL_PATH_MARKERS):
        block(path.name, "local filesystem path exposed")
    if any(marker in combined for marker in PRIVATE_KEY_MARKERS):
        block(path.name, "private-key material exposed")
    if SPANISH_ID_RE.search(combined):
        block(path.name, "Spanish identity-document pattern exposed")


def check_cv(path: Path, combined: str) -> None:
    if EMAIL_RE.search(combined):
        block(path.name, "personal email address present in public CV")
    if INTERNATIONAL_PHONE_RE.search(combined):
        block(path.name, "international phone number present in public CV")


def check_academic_project(path: Path, text: str) -> None:
    if "bacteriophage-therapy-final-project" in path.name and any(
        marker in text for marker in DEDICATION_MARKERS
    ):
        advise(path.name, "personal dedication content is intentionally present in the public academic source")


def check_known_compatibility_aliases(hashes: dict[str, str]) -> None:
    aliases = (
        ("bacteriophage-therapy-final-project.pdf", "bacteriophage-therapy-final-project_ES.pdf"),
        ("bacteriophage-therapy-defense.pdf", "bacteriophage-therapy-defense_ES.pdf"),
    )
    for generic, spanish in aliases:
        if generic in hashes and spanish in hashes and hashes[generic] != hashes[spanish]:
            block(generic, "compatibility alias no longer matches its Spanish source")


def main() -> None:
    pdfs = sorted(DOCUMENTS.glob("*.pdf"))
    if not pdfs:
        raise SystemExit("[pdf-privacy] no public PDFs found")

    hashes: dict[str, str] = {}
    for path in pdfs:
        hashes[path.name] = hashlib.sha256(path.read_bytes()).hexdigest()
        text, metadata = extract_pdf(path)
        combined = f"{text}\n{metadata}"
        check_common(path, combined)
        if path.name.startswith("Jhon_M_Cuenca_CV_"):
            check_cv(path, combined)
        check_academic_project(path, text)

    check_known_compatibility_aliases(hashes)

    for filename, category in sorted(advisories):
        print(f"[pdf-privacy] ADVISORY {filename}: {category}")

    if blockers:
        for filename, category in sorted(blockers):
            print(f"[pdf-privacy] BLOCK {filename}: {category}")
        raise SystemExit(
            f"[pdf-privacy] FAIL: {len(blockers)} blocking finding(s) across {len(pdfs)} public PDFs"
        )

    print(
        f"[pdf-privacy] OK: checked {len(pdfs)} public PDFs; "
        f"{len(advisories)} non-blocking academic-source advisory item(s)"
    )


if __name__ == "__main__":
    main()
