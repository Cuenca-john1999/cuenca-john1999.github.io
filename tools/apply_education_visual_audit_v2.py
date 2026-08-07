#!/usr/bin/env python3
from __future__ import annotations

import ast
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "tools/apply_education_visual_audit.py"


def literals_from_source() -> dict[str, object]:
    tree = ast.parse(SOURCE.read_text(encoding="utf-8"))
    wanted = {
        "new_operations",
        "new_additional",
        "translations",
        "css_anchor",
        "css_insert",
        "verify_anchor",
        "verify_insert",
    }
    values: dict[str, object] = {}
    for node in tree.body:
        if isinstance(node, ast.Assign) and len(node.targets) == 1 and isinstance(node.targets[0], ast.Name):
            name = node.targets[0].id
            if name in wanted:
                values[name] = ast.literal_eval(node.value)
    missing = wanted - values.keys()
    if missing:
        raise SystemExit(f"Missing literal definitions from v1 script: {sorted(missing)}")
    return values


def replace_once(path: Path, old: str, new: str) -> None:
    text = path.read_text(encoding="utf-8")
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"Expected exactly one literal match in {path}: found {count} for {old!r}")
    path.write_text(text.replace(old, new, 1), encoding="utf-8")


def replace_article(path: Path, marker: str, replacement: str) -> None:
    text = path.read_text(encoding="utf-8")
    pattern = re.compile(
        r'(?ms)^\s{20}<article class="focus-item">\n(?:(?!^\s{20}<article class="focus-item">).)*?'
        + re.escape(marker)
        + r'(?:(?!^\s{20}<article class="focus-item">).)*?^\s{20}</article>'
    )
    matches = list(pattern.finditer(text))
    if len(matches) != 1:
        raise SystemExit(f"Expected one article containing {marker!r}, found {len(matches)}")
    block = matches[0].group(0)
    required_old_markers = {
        "educationCards.operations.grade": (
            "educationCards.operations.body",
            "workbench/#entry-celignis",
            "commonLabels.academicDetails",
        ),
        "educationCards.additional.badge": (
            "educationCards.additional.body",
            "commonLabels.trainingDetails",
            "Functions A+B+C",
        ),
    }
    for expected in required_old_markers[marker]:
        if expected not in block:
            raise SystemExit(f"Refusing article replacement: expected old marker missing: {expected}")
    text = text[: matches[0].start()] + replacement + text[matches[0].end() :]
    path.write_text(text, encoding="utf-8")


values = literals_from_source()
index = ROOT / "index.html"
layout = ROOT / "assets/css/layout.css"
language_js = ROOT / "assets/js/language.js"
verify = ROOT / "tools/verify_portfolio_integrity.py"

replace_article(index, "educationCards.operations.grade", values["new_operations"])
replace_article(index, "educationCards.additional.badge", values["new_additional"])
replace_once(
    index,
    '<li data-i18n="sections.education.pointAdditional">Animal Experimentation - Functions A+B+C · Healthcare Management · Risk Prevention</li>',
    '<li data-i18n="sections.education.pointAdditional">Certifications: Animal Experimentation A+B+C · Healthcare Centre Management · Basic Risk Prevention</li>',
)
replace_once(index, 'assets/js/language.js?v=20260807-professionalization-audit', 'assets/js/language.js?v=20260807-education-visual')
replace_once(language_js, "const TRANSLATION_VERSION = '20260807-professionalization-audit';", "const TRANSLATION_VERSION = '20260807-education-visual';")

translations = values["translations"]
for language, additions in translations.items():
    path = ROOT / "data" / "translations" / f"{language}.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    old_additional_body = data["educationCards"]["additional"]["body"]
    data["sections"]["education"]["pointAdditional"] = additions["pointAdditional"]
    data["commonLabels"].update(additions["labels"])
    data["educationCards"]["operations"].update(additions["operations"])
    data["educationCards"]["additional"]["badge"] = additions["additional"]["badge"]
    data["educationCards"]["additional"]["title"] = additions["additional"]["title"]
    data["educationCards"]["additional"]["animal"] = additions["additional"]["animal"]
    data["educationCards"]["additional"]["healthcare"] = additions["additional"]["healthcare"]
    data["educationCards"]["additional"]["risk"] = additions["additional"]["risk"]
    if data["educationCards"]["additional"]["body"] != old_additional_body:
        raise SystemExit(f"Legacy additional-training source record changed unexpectedly in {language}")
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

replace_once(layout, values["css_anchor"], values["css_insert"])
replace_once(verify, values["verify_anchor"], values["verify_insert"])

print("Education visual/content update applied using guarded article markers.")
