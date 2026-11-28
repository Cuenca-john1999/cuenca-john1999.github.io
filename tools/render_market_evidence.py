"""Render localized technical catalogue entries from one reviewed evidence file."""
import html
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "data/market/common-evidence.json").read_text(encoding="utf-8"))
LIB = json.loads((ROOT / "data/market/scientific-library.json").read_text(encoding="utf-8"))
def render_rows(language):
    output = []
    for item in sorted(DATA["skills"], key=lambda x: x["locales"][language]["order"]):
        v = item["locales"][language]
        cta = {"en":"View context","es":"Ver contexto","de":"Kontext ansehen"}[language]
        e = lambda s: html.escape(s, quote=False)
        a = html.escape
        note = next((n for n in LIB["notes"] if n.get("skill") == item["id"]), None)
        note_label = LIB["labels"][language]["note"]
        extra = f' · <a class="document-link" href="workbench/#note-{note["id"]}">{note_label}</a>' if note else ""
        route_ids = " ".join(key for key, route in DATA["routes"].items() if item["id"] in route["skills"])
        t = DATA["labels"][language]
        expanded = item.get("expanded", {}).get(language)
        more = f'<details class="market-note"><summary>{e(t["details"])}</summary><p><strong>{e(t["equipment"])}:</strong> {e(expanded[0])}</p><p><strong>{e(t["scope"])}:</strong> {e(expanded[1])}</p></details>' if expanded else ""
        output.append(f'''                    <article class="market-skill" data-market-skill data-area="{a(v["area"])}" data-level="{a(v["level"])}" data-topic="{a(item["topic"])}" data-routes="{a(route_ids)}" data-skill-key="{item["id"]}">
                        <div><h3>{e(v["name"])}</h3><p>{e(v["context"])}</p></div>
                        <div><p class="market-evidence">{e(v["level"])}</p><p>{e(v["detail"])}</p><a class="document-link" href="{v["link"]}">{cta}</a>{extra}{more}</div>
                    </article>''')
    return "\n".join(output)
def render_partial(language):
    name = {"en":"international","es":"spain","de":"germany"}[language]
    source = (ROOT / "data/market" / f"{name}-sections.html").read_text(encoding="utf-8")
    if source.count("<!-- COMMON-SKILLS -->") != 1:
        raise SystemExit("Missing or duplicated shared catalogue marker")
    topics = "".join(f'<option value="{html.escape(key)}">{html.escape(labels[language], quote=False)}</option>' for key, labels in DATA["topics"].items())
    routes = "".join(f'<option value="{html.escape(key)}">{html.escape(route["labels"][language], quote=False)}</option>' for key, route in DATA["routes"].items())
    return source.replace("<!-- COMMON-ROUTES -->", routes).replace("<!-- COMMON-TOPICS -->", topics).replace("<!-- COMMON-SKILLS -->", render_rows(language))

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
    t["cards"].append(LIB["labels"][lang]["library"])
    links.append("workbench/#scientific-library")
    files = [cv,root+"europass-clinical-biomedical-laboratory.pdf",root+"europass-laboratory-operations.pdf"]
    files += [root+lang+"/"+n+".pdf" for n in t["names"]]
    body = "\n".join(f'                    <article class="market-card"><h3>{e(title)}</h3><a class="document-link" href="{link}">{e(title)}</a></article>' for title,link in zip(t["cards"],links))
    r = DATA["labels"][lang]
    route_cards = "\n".join(f'                    <article class="market-card"><h3>{e(route["labels"][lang])}</h3><p>{e(r["routeIntro"])}</p><a class="document-link" href="?focus={a(key)}#{a(t["skills"])}">{e(r["view"])}</a></article>' for key, route in DATA["routes"].items())
    controls = []
    for j,(title,link) in enumerate(zip(t["files"],files)):
        checked = " checked" if j == 0 else ""
        controls.append(f'                        <label><input type="checkbox" value="{link}"{checked}> <a class="document-link" href="{link}" download>{e(title)}</a></label>')
    controls_html = "\n".join(controls)
    return f'''            <section class="sequence-section market-section" id="recruitment-hub" data-sequence-section aria-labelledby="recruitment-title">
                <div class="section-kicker">{e(t["title"])}</div>
                <h2 id="recruitment-title">{e(t["title"])}</h2><p class="market-intro">{e(t["intro"])}</p>
                <div class="market-grid market-doc-grid">
{body}
                </div>
                <div class="market-panel"><h3>{e(r["routes"])}</h3><div class="market-grid">
{route_cards}
                </div></div>
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

def e(value): return html.escape(value, quote=False)
def a(value): return html.escape(value, quote=True)

def note_html(n, lang):
    t = LIB["labels"][lang]
    title,body,scope = n[lang]
    extra = f'<a class="document-link" href="#{n["evidence"]}">{e(t["context"])}</a>' if n.get("evidence") else ""
    return f'                    <article class="market-card" data-reveal id="note-{n["id"]}"><h4>{e(title)}</h4><p>{e(body)}</p><p class="market-note"><strong>{e(t["scope"])}:</strong> {e(scope)}</p><div class="market-actions"><a class="document-link" href="{a(n["url"])}" target="_blank" rel="noopener noreferrer">{e(t["ref"])}: {e(n["source"])}</a>{extra}</div></article>'

def library(lang):
    t = LIB["labels"][lang]
    tech = "\n".join(note_html(n,lang) for n in LIB["notes"] if n["kind"]=="technical")
    reading = "\n".join(note_html(n,lang) for n in LIB["notes"] if n["kind"]=="reading")
    flows = []
    for item in LIB["flows"]:
        title,steps,limit = item[lang]
        steps_html = "".join(f"<li>{e(s)}</li>" for s in steps)
        flows.append(f'                    <article class="market-card" data-reveal><h4>{e(title)}</h4><ol class="science-flow">{steps_html}</ol><p class="market-note">{e(limit)}</p></article>')
    flow_html = "\n".join(flows)
    projects = []
    for item in LIB["projects"]:
        bullets = "".join(f"<li>{e(line)}</li>" for line in item["extra"][lang])
        projects.append(f'                    <article class="market-card" data-reveal id="academic-{item["id"]}"><h4>{e(item[lang][0])}</h4><p class="market-evidence">{e(item[lang][1])}</p><p>{e(item[lang][2])}</p><details><summary>{e(t["projectDetail"])}</summary><ul>{bullets}</ul></details></article>')
    projects = "\n".join(projects)
    cases = "\n".join(f'                    <article class="market-card" data-reveal id="case-{item["id"]}"><h4>{e(item[lang][0])}</h4><p class="market-evidence">{e(item[lang][1])}</p><p><strong>{e(t["observations"])}:</strong> {e(item[lang][2])}</p><p><strong>{e(t["interpretation"])}:</strong> {e(item[lang][3])}</p></article>' for item in LIB["cases"])
    exhibit = LIB["exhibit"]
    title, caption, x, y = exhibit[lang]
    values = "".join(f"<tr><td>{row[0]:.2f}</td><td>{row[1]:.2f}</td></tr>" for row in exhibit["values"])
    evidence = f'<div class="market-panel" id="evidence-{exhibit["id"]}"><h4>{e(title)}</h4><p>{e(caption)}</p><table><thead><tr><th scope="col">{e(x)}</th><th scope="col">{e(y)}</th></tr></thead><tbody>{values}</tbody></table></div>'
    return f'''            <section class="workbench-section market-section" id="scientific-library" aria-labelledby="scientific-library-title">
                <div class="section-kicker" data-reveal>{e(t["library"])}</div><h2 id="scientific-library-title" data-reveal>{e(t["library"])}</h2><p class="market-intro" data-reveal>{e(t["intro"])}</p><p class="market-note">{e(t["date"])}</p>
                <h3>{e(t["technical"])}</h3><div class="market-grid">
{tech}
                </div><h3>{e(t["reading"])}</h3><div class="market-grid">
{reading}
                </div><h3>{e(t["workflow"])}</h3><p class="market-intro">{e(t["flowintro"])}</p><div class="market-grid">
{flow_html}
                </div><h3 id="academic-projects">{e(t["projects"])}</h3><div class="market-grid">
{projects}
                </div><h3 id="experimental-cases">{e(t["cases"])}</h3><div class="market-grid">
{cases}
                </div><h3 id="experimental-evidence">{e(t["exhibit"])}</h3>{evidence}
            </section>
'''

def refresh_library(source, lang):
    return replace_marked(source, "SCIENTIFIC-LIBRARY", marked("SCIENTIFIC-LIBRARY", library(lang)))
