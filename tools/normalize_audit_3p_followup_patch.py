#!/usr/bin/env python3
from pathlib import Path

path = Path(__file__).resolve().parents[1] / "tools" / "verify_portfolio_integrity.py"
text = path.read_text(encoding="utf-8")
replacements = {
    '"Eine Laborprofil geprägt von" if False else "Ein Laborprofil geprägt von",': '"Ein Laborprofil geprägt von",',
    '"Ein lebendiger Raum zum<br><span>Entwickeln, Testen und Lernen.</span>",': '"Ein lebendiger Raum zum<br><span>Entwickeln, Prüfen und Lernen.</span>",',
}
for old, new in replacements.items():
    if text.count(old) != 1:
        raise SystemExit(f"[3p-followup-normalize] expected exactly one marker: {old}")
    text = text.replace(old, new, 1)
path.write_text(text, encoding="utf-8")
print("[3p-followup-normalize] guard normalized")
