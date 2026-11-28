"""Generate standalone localized destinations from the canonical profile pages."""
import re,json,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
BASE="https://cuenca-john1999.github.io/"
IDS={"en":["professional-fields","technical-catalogue","equipment","dossiers"],"es":["areas-profesionales","catalogo-tecnico","instrumentacion","dosieres"],"de":["berufsfelder","fachkatalog","geraete","dossiers"]}
def e(s):return s.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;").replace('"',"&quot;")
def section(h,id):return re.search(r'<section\b[^>]*\bid="'+id+r'"[^>]*>[\s\S]*?</section>',h).group(0)
def render(h,l,k):
    m=json.loads((ROOT/"data/market/explorer-ui.json").read_text(encoding="utf-8"))[l];i=IDS[l];root="../" if l=="en" else "../../";market="" if l=="en" else l+"/";title=m[0 if k=="technical" else 1];intro=m[4 if k=="technical" else 5];hub=section(h,"recruitment-hub")
    first=hub.index('                <div class="market-panel">');pkg=hub.index('                <div class="market-panel" data-application-package');cv=hub.rindex('                <div class="market-panel">',0,pkg)
    body="\n".join([hub[first:cv],*[section(h,x) for x in i[:3]]]) if k=="technical" else "\n".join([hub[cv:hub.rindex("</section>")],section(h,i[3]),section(h,"references")])
    included=set(re.findall(r'\bid="([^"]+)"',body))
    def rewrite(match):
        a,v=match.groups()
        if v.startswith("#"):return match.group() if v[1:] in included else f'{a}="../{v}"'
        if re.match(r'^(?:\.\./)?(?:assets/|workbench/|privacy\.html|cv-builder/)',v):return f'{a}="../{v}"'
        return match.group()
    body=re.sub(r'(href|src|value)="([^"]+)"',rewrite,body).replace(" data-sequence-section","").replace('class="sequence-section ','class="sequence-section is-sequence-revealed ')
    styles="\n".join(f'<link rel="stylesheet" href="../{x}">' for x in re.findall(r'<link rel="stylesheet" href="([^"]+)">',h) if "cv-builder.css" not in x)
    themes=re.search(r'<script src="([^"]*assets/js/theme\.js[^"]+)"></script>',h).group(1);cur=' aria-current="page"'
    nav=f'<a href="../">{e(m[3])}</a><a href="../#cv-builder">CV Builder</a><a href="../technical/"{cur if k=="technical" else ""}>{e(m[0])}</a><a href="../documents/"{cur if k=="documents" else ""}>{e(m[1])}</a><a href="../workbench/">{e(m[2])}</a>'
    langs=" ".join(f'<a href="{root+("" if x=="en" else x+"/")+k+"/"}"{cur if x==l else ""}>{x.upper()}</a>' for x in ("en","es","de"))
    alts="\n".join(f'<link rel="alternate" hreflang="{x}" href="{BASE+("" if x=="en" else x+"/")+k+"/"}">' for x in ("en","es","de"))
    asset="market-catalogue.js" if k=="technical" else "application-package.js";digest=hashlib.sha256((ROOT/"assets/js"/asset).read_bytes()).hexdigest()[:12]
    script=f'<script src="{root}assets/js/{asset}?v={digest}" defer></script>'
    return f'''<!doctype html>
<html lang="{l}" data-theme="dark"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)} | Jhon M. Cuenca</title><meta name="description" content="{e(intro)}">
<link rel="canonical" href="{BASE+market+k+"/"}">
{alts}
{styles}
</head><body class="explorer-page"><a class="skip-link" href="#main-content">{e(m[13])}</a><div class="explorer-shell">
<header class="explorer-header"><a href="../"><strong>Jhon M. Cuenca</strong></a><nav class="explorer-nav" aria-label="{e(m[3])}">{nav}</nav><div>{langs}</div></header>
<main id="main-content"><div class="explorer-hero"><h1>{e(title)}</h1><p>{e(intro)}</p></div>
{body}
</main><footer class="site-footer"><a href="../">{e(m[13])}</a> · <a href="{root}privacy.html?lang={l}">Privacy</a> · Jhon M. Cuenca</footer></div>
<script src="../{themes}"></script><script>Theme.init();</script>
{script}
</body></html>
'''
def outputs(pages):
    return {ROOT/("" if l=="en" else l)/k/"index.html":render(h,l,k) for l,h in pages.items() for k in ("technical","documents")}
