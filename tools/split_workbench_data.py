#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WORKBENCH_JS = ROOT / "workbench" / "js" / "workbench.js"
WORKBENCH_DATA = ROOT / "workbench" / "js" / "workbench-data.js"
WORKBENCH_HTML = ROOT / "workbench" / "index.html"


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"[workbench-split] expected one {label}; found {count}")
    return text.replace(old, new, 1)


def split_data() -> None:
    text = WORKBENCH_JS.read_text(encoding="utf-8")
    start_marker = "    const translations = {"
    end_marker = "\n\n    let currentLanguage = getInitialLanguage();"
    start = text.find(start_marker)
    end = text.find(end_marker)
    if start < 0 or end < 0 or end <= start:
        raise SystemExit("[workbench-split] could not locate static-data block")

    block = text[start:end]
    if block.count("const translations = {") != 1 or block.count("const entryData = {") != 1:
        raise SystemExit("[workbench-split] unexpected translations/entryData structure")

    data_text = (
        "(() => {\n"
        "    'use strict';\n\n"
        f"{block}\n\n"
        "    window.WorkbenchData = Object.freeze({ translations, entryData });\n"
        "})();\n"
    )
    WORKBENCH_DATA.write_text(data_text, encoding="utf-8")

    replacement = (
        "    const { translations, entryData } = window.WorkbenchData || {};\n"
        "    if (!translations || !entryData) {\n"
        "        throw new Error('[WORKBENCH] Static data failed to load before workbench.js');\n"
        "    }"
    )
    WORKBENCH_JS.write_text(text[:start] + replacement + text[end:], encoding="utf-8")


def update_workbench_html() -> None:
    data_token = hashlib.sha256(WORKBENCH_DATA.read_bytes()).hexdigest()[:12]
    logic_token = hashlib.sha256(WORKBENCH_JS.read_bytes()).hexdigest()[:12]
    text = WORKBENCH_HTML.read_text(encoding="utf-8")
    pattern = re.compile(r'    <script src="js/workbench\.js\?v=[0-9a-f]{12}"></script>')
    replacement = (
        f'    <script src="js/workbench-data.js?v={data_token}"></script>\n'
        f'    <script src="js/workbench.js?v={logic_token}"></script>'
    )
    updated, count = pattern.subn(replacement, text, count=1)
    if count != 1:
        raise SystemExit(f"[workbench-split] expected one Workbench script tag; found {count}")
    WORKBENCH_HTML.write_text(updated, encoding="utf-8")
    print(f"[workbench-split] data={data_token} logic={logic_token}")


def update_evidence_verifier() -> None:
    path = ROOT / "tools" / "verify_workbench_evidence.py"
    text = path.read_text(encoding="utf-8")
    text = replace_once(
        text,
        'WORKBENCH_JS = ROOT / "workbench" / "js" / "workbench.js"',
        'WORKBENCH_JS = ROOT / "workbench" / "js" / "workbench.js"\nWORKBENCH_DATA = ROOT / "workbench" / "js" / "workbench-data.js"',
        "Workbench data path in evidence verifier",
    )
    text = replace_once(
        text,
        '    text = WORKBENCH_JS.read_text(encoding="utf-8")',
        '    text = "\\n".join((\n        WORKBENCH_JS.read_text(encoding="utf-8"),\n        WORKBENCH_DATA.read_text(encoding="utf-8"),\n    ))',
        "combined Workbench evidence source",
    )
    path.write_text(text, encoding="utf-8")


def update_integrity_verifier() -> None:
    path = ROOT / "tools" / "verify_portfolio_integrity.py"
    text = path.read_text(encoding="utf-8")
    old = (
        '    workbench_js = (ROOT / "workbench" / "js" / "workbench.js").read_text(encoding="utf-8")\n'
        '    language_js = (ROOT / "assets" / "js" / "language.js").read_text(encoding="utf-8")'
    )
    new = (
        '    workbench_js = (ROOT / "workbench" / "js" / "workbench.js").read_text(encoding="utf-8")\n'
        '    workbench_data = (ROOT / "workbench" / "js" / "workbench-data.js").read_text(encoding="utf-8")\n'
        '    workbench_source = f"{workbench_js}\\n{workbench_data}"\n'
        '    language_js = (ROOT / "assets" / "js" / "language.js").read_text(encoding="utf-8")'
    )
    text = replace_once(text, old, new, "combined Workbench integrity source")

    split_at = new
    prefix, tail = text.split(split_at, 1)
    tail = tail.replace("workbench_js", "workbench_source")
    path.write_text(prefix + split_at + tail, encoding="utf-8")


def write_split_verifier() -> None:
    path = ROOT / "tools" / "verify_workbench_split.py"
    path.write_text(
        '''#!/usr/bin/env python3
"""Guard the separation between Workbench static data and UI logic."""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "workbench" / "js" / "workbench-data.js"
LOGIC = ROOT / "workbench" / "js" / "workbench.js"
HTML = ROOT / "workbench" / "index.html"


def fail(message: str) -> None:
    raise SystemExit(f"[workbench-split] {message}")


def main() -> None:
    data = DATA.read_text(encoding="utf-8")
    logic = LOGIC.read_text(encoding="utf-8")
    html = HTML.read_text(encoding="utf-8")

    for marker in ("const translations = {", "const entryData = {", "window.WorkbenchData"):
        if marker not in data:
            fail(f"static data marker missing: {marker}")
    for marker in ("const translations = {", "const entryData = {"):
        if marker in logic:
            fail(f"static data leaked back into UI logic: {marker}")
    if "const { translations, entryData } = window.WorkbenchData || {};" not in logic:
        fail("UI logic does not consume WorkbenchData")

    data_match = re.search(r'<script src="js/workbench-data\\.js\\?v=([0-9a-f]{12})"></script>', html)
    logic_match = re.search(r'<script src="js/workbench\\.js\\?v=([0-9a-f]{12})"></script>', html)
    if not data_match or not logic_match:
        fail("Workbench source page is missing cache-busted data/logic scripts")
    if html.index(data_match.group(0)) > html.index(logic_match.group(0)):
        fail("Workbench data script must load before UI logic")

    print("[workbench-split] OK: static data and UI logic are separated")


if __name__ == "__main__":
    main()
''',
        encoding="utf-8",
    )


def main() -> None:
    split_data()
    update_workbench_html()
    update_evidence_verifier()
    update_integrity_verifier()
    write_split_verifier()
    subprocess.run(["python3", "tools/generate_localized_pages.py"], cwd=ROOT, check=True)


if __name__ == "__main__":
    main()
