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

def hub(lang):
    t = json.loads((ROOT / "data/market/recruitment.json").read_text(encoding="utf-8"))[lang]
    e = lambda s: html.escape(s, quote=False)
    a = html.escape
    root = ("" if lang == "en" else "../") + "assets/documents/"
    cv = root + f"Jhon_M_Cuenca_CV_{lang.upper()}.pdf"
    links = [cv,"#education","#"+t["skills"],"#"+t["docs"],"#contact"]
    files = [cv,root+"europass-clinical-biomedical-laboratory.pdf",root+"europass-laboratory-operations.pdf"]
    files += [root+lang+"/"+n+".pdf" for n in t["names"]]
    body = "\n".join(f'                    <article class="market-card"><h3>{e(title)}</h3><a class="document-link" href="{link}">{e(title)}</a></article>' for title,link in zip(t["cards"],links))
    controls = []
    for j,(title,link) in enumerate(zip(t["files"],files)):
        checked = " checked" if j == 0 else ""
        controls.append(f'                        <label><input type="checkbox" value="{link}"{checked}> <a class="document-link" href="{link}" download>{e(title)}</a></label>')
    controls_html = "\n".join(controls)
    return f'''            <section class="sequence-section market-section" id="recruitment-hub" aria-labelledby="recruitment-title">
                <div class="section-kicker">{e(t["title"])}</div>
                <h2 id="recruitment-title">{e(t["title"])}</h2><p class="market-intro">{e(t["intro"])}</p>
                <div class="market-grid market-doc-grid">
{body}
                </div>
                <div class="market-panel" data-application-package data-loading="{a(t["loading"])}" data-error="{a(t["error"])}" data-none="{a(t["none"])}">
                    <h3>{e(t["package"])}</h3>
                    <fieldset class="package-options"><legend>{e(t["select"])}</legend>
{controls_html}
                    </fieldset>
                    <button type="button" class="contact-submit" data-package-download hidden>{e(t["download"])}</button><p class="market-note" data-package-status aria-live="polite"></p>
                </div>
            </section>
'''

def refresh_hub(source,lang):
    return replace_marked(source,"RECRUITMENT-HUB",marked("RECRUITMENT-HUB",hub(lang)))
