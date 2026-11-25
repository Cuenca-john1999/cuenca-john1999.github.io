"""Render localized technical catalogue entries from one reviewed evidence file."""
import html
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "data/market/common-evidence.json").read_text(encoding="utf-8"))
def render_rows(language):
    output = []
    for item in sorted(DATA["skills"], key=lambda x: x["locales"][language]["order"]):
        v = item["locales"][language]
        cta = {"en":"View context","es":"Ver contexto","de":"Kontext ansehen"}[language]
        e = lambda s: html.escape(s, quote=False)
        a = html.escape
        output.append(f'''                    <article class="market-skill" data-market-skill data-area="{a(v["area"])}" data-level="{a(v["level"])}" data-skill-key="{item["id"]}">
                        <div><h3>{e(v["name"])}</h3><p>{e(v["context"])}</p></div>
                        <div><p class="market-evidence">{e(v["level"])}</p><p>{e(v["detail"])}</p><a class="document-link" href="{v["link"]}">{cta}</a></div>
                    </article>''')
    return "\n".join(output)
def render_partial(language):
    name = {"en":"international","es":"spain","de":"germany"}[language]
    source = (ROOT / "data/market" / f"{name}-sections.html").read_text(encoding="utf-8")
    if source.count("<!-- COMMON-SKILLS -->") != 1:
        raise SystemExit("Missing or duplicated shared catalogue marker")
    return source.replace("<!-- COMMON-SKILLS -->", render_rows(language))

def marked(key, text):
    return f"<!-- {key}:BEGIN -->\n{text}<!-- {key}:END -->\n"

def replace_marked(source, key, text=""):
    import re
    pattern = rf"<!-- {re.escape(key)}:BEGIN -->\n.*?<!-- {re.escape(key)}:END -->\n"
    result, count = re.subn(pattern, lambda _: text, source, flags=re.S)
    if count != 1:
        raise SystemExit(f"Invalid generated block: {key}")
    return result
