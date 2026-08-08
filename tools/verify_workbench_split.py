#!/usr/bin/env python3
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

    data_match = re.search(r'<script src="js/workbench-data\.js\?v=([0-9a-f]{12})"></script>', html)
    logic_match = re.search(r'<script src="js/workbench\.js\?v=([0-9a-f]{12})"></script>', html)
    if not data_match or not logic_match:
        fail("Workbench source page is missing cache-busted data/logic scripts")
    if html.index(data_match.group(0)) > html.index(logic_match.group(0)):
        fail("Workbench data script must load before UI logic")

    print("[workbench-split] OK: static data and UI logic are separated")


if __name__ == "__main__":
    main()
