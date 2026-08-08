#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

REPLACEMENTS = {
    "data/translations/en.json": [
        (
            '"academicTechnicalKnowledge": "Areas supported by academic training and technical knowledge"',
            '"academicTechnicalKnowledge": "Areas supported by formal training and technical knowledge"',
        ),
        ('"academicDetails": "Academic details"', '"academicDetails": "Qualification details"'),
        ('"appliedAcademicEvidence": "Applied academic evidence"', '"appliedAcademicEvidence": "Applied training evidence"'),
        (
            '"title": "Strong academic results with a clinical, analytical and biomedical foundation."',
            '"title": "Two laboratory vocational qualifications with strong results and a clinical, analytical and biomedical foundation."',
        ),
    ],
    "data/translations/es.json": [
        ('"academicDetails": "Detalles académicos"', '"academicDetails": "Detalles de la titulación"'),
        ('"appliedAcademicEvidence": "Evidencia académica aplicada"', '"appliedAcademicEvidence": "Evidencia práctica de formación"'),
        (
            '"title": "Resultados académicos sólidos con base clínica, analítica y biomédica."',
            '"title": "Dos titulaciones de laboratorio con resultados sólidos y una base clínica, analítica y biomédica."',
        ),
    ],
    "data/translations/de.json": [
        (
            '"philosophy": "Engagiert für lebenslanges Lernen, Entdeckung und Hilfe für andere."',
            '"philosophy": "Engagiert für kontinuierliches Lernen, neue Erkenntnisse und die Unterstützung anderer."',
        ),
        ('"pointTeaching": "STEM- und Bildungsrobotik-Instructor · 2020-2021"', '"pointTeaching": "Dozent für STEM und Bildungsrobotik · 2020-2021"'),
        (
            '"title": "Starke akademische Ergebnisse mit klinischer, analytischer und biomedizinischer Grundlage."',
            '"title": "Zwei laborbezogene Berufsabschlüsse mit sehr guten Ergebnissen und klinischer, analytischer und biomedizinischer Ausrichtung."',
        ),
        (
            '"pointAdditional": "Zertifikate: Versuchstierkunde A+B+C · Management von Gesundheitseinrichtungen · Grundkenntnisse Arbeitsschutz"',
            '"pointAdditional": "Zertifikate: Tierexperimentelle Funktionen A+B+C · Management von Gesundheitseinrichtungen · Grundkenntnisse im Arbeitsschutz"',
        ),
        (
            '"title": "Professionelle Dokumente und Referenzen für Bewerbungsprozesse."',
            '"title": "Berufliche Unterlagen und Referenzen für Bewerbungsverfahren."',
        ),
        (
            '"title": "Professionelle und akademische Referenzen können die hier dargestellte Laborerfahrung unterstützen."',
            '"title": "Berufliche und ausbildungsbezogene Referenzen stützen die hier dargestellte Laborerfahrung."',
        ),
        (
            '"title": "Offen für laborbezogene Positionen, klinische Forschungsunterstützung und biomedizinische Wissenschaft."',
            '"title": "Offen für Positionen im Labor, in der klinischen Forschungsunterstützung und im biomedizinischen Umfeld."',
        ),
        (
            '"body": "Besonders in molekularbiologischen, immunologischen und analytischen Laboren in Forschungsgruppen, Hochschulen, Instituten oder privaten Teams, in denen sorgfältige Praxis, verlässliche Dokumentation und kontinuierliches Lernen Forschung, Diagnostik und Analytik unterstützen."',
            '"body": "Besonders in molekularbiologischen, immunologischen und analytischen Laboren in Forschungsgruppen, Hochschulen, Instituten oder privaten Teams, in denen sorgfältige praktische Arbeit, verlässliche Dokumentation und kontinuierliches Lernen Forschung, Diagnostik und Analytik unterstützen."',
        ),
    ],
    "assets/js/language.js": [
        (
            "const TRANSLATION_VERSION = '20260808-phage-defense-language-docs';",
            "const TRANSLATION_VERSION = '20260808-editorial-professional-language';",
        ),
    ],
}


def replace_exact(path: Path, old: str, new: str) -> None:
    text = path.read_text(encoding="utf-8")
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"expected exactly one match in {path.relative_to(ROOT)}; found {count}: {old[:80]}")
    path.write_text(text.replace(old, new, 1), encoding="utf-8")


def main() -> None:
    for relative, replacements in REPLACEMENTS.items():
        path = ROOT / relative
        for old, new in replacements:
            replace_exact(path, old, new)

    for language in ("en", "de", "es"):
        json.loads((ROOT / "data" / "translations" / f"{language}.json").read_text(encoding="utf-8"))

    language_js = ROOT / "assets" / "js" / "language.js"
    token = hashlib.sha256(language_js.read_bytes()).hexdigest()[:12]
    index = ROOT / "index.html"
    html = index.read_text(encoding="utf-8")
    updated, count = re.subn(
        r'assets/js/language\.js\?v=[0-9a-f]{12}',
        f'assets/js/language.js?v={token}',
        html,
        count=1,
    )
    if count != 1:
        raise SystemExit(f"expected one language.js cache-busting reference; found {count}")
    index.write_text(updated, encoding="utf-8")

    print(f"editorial polish applied; language.js cache token={token}")


if __name__ == "__main__":
    main()
