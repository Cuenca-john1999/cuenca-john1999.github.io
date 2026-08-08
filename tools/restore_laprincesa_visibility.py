#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WORKBENCH_JS = ROOT / "workbench" / "js" / "workbench.js"
WORKBENCH_HTML = ROOT / "workbench" / "index.html"
EVIDENCE_GUARD = ROOT / "tools" / "verify_workbench_evidence.py"

replacements = {
    "Supported day-to-day cell-culture, sample-processing, molecular-biology and immunology workflows under laboratory protocols, together with scientific-database work, material and inventory management, and development of a bilingual scientific website for the research group. The supervised role strengthened reproducibility, assay interpretation and quality-control practice while building greater autonomy. During supervised animal-sample procedures, I personally performed murine sample collection/extraction and subsequent sample handling.":
    "Supported day-to-day cell-culture, sample-processing, molecular-biology and immunology workflows under laboratory protocols, together with scientific-database work, material and inventory management, and development of a bilingual scientific website for the research group. My role progressed from trainee participation to specific responsibility within the cell-culture workflow: I was trusted with cell handling, maintenance and related routines, and was frequently called on to support supervised animal-sample procedures and molecular or immunology workflows. The supervised role strengthened reproducibility, assay interpretation and quality-control practice while building greater autonomy. During supervised animal-sample procedures, I personally performed murine sample collection/extraction and subsequent sample handling.",
    "Apoyo diario en flujos de cultivo celular, procesamiento de muestras, biología molecular e inmunología siguiendo protocolos de laboratorio, junto con consulta de bases de datos científicas, gestión de material e inventario y desarrollo de una web científica bilingüe para el grupo de investigación. El trabajo supervisado reforzó la reproducibilidad, la interpretación de ensayos y el control de calidad mientras aumentaba la autonomía. Durante procedimientos supervisados con muestras animales, realicé personalmente la obtención/extracción de muestras murinas y su posterior manejo.":
    "Apoyo diario en flujos de cultivo celular, procesamiento de muestras, biología molecular e inmunología siguiendo protocolos de laboratorio, junto con consulta de bases de datos científicas, gestión de material e inventario y desarrollo de una web científica bilingüe para el grupo de investigación. Mi papel evolucionó desde la participación como estudiante en prácticas hasta asumir una responsabilidad concreta dentro del flujo de cultivo celular: se me confió el manejo, mantenimiento y las rutinas relacionadas con las células, y se recurría a mí con frecuencia para apoyar procedimientos supervisados con muestras animales y flujos de biología molecular o inmunología. El trabajo supervisado reforzó la reproducibilidad, la interpretación de ensayos y el control de calidad mientras aumentaba la autonomía. Durante procedimientos supervisados con muestras animales, realicé personalmente la obtención/extracción de muestras murinas y su posterior manejo.",
    "Mitarbeit bei täglichen Abläufen in Zellkultur, Probenverarbeitung, Molekularbiologie und Immunologie nach Laborprotokollen sowie Arbeit mit wissenschaftlichen Datenbanken, Material- und Bestandsverwaltung und Entwicklung einer zweisprachigen wissenschaftlichen Website für die Forschungsgruppe. Die angeleitete Tätigkeit stärkte Reproduzierbarkeit, Assay-Interpretation und Qualitätskontrolle bei wachsender Eigenständigkeit. Bei beaufsichtigten Verfahren mit Tierproben führte ich die Gewinnung/Entnahme muriner Proben persönlich durch und übernahm anschließend deren Handhabung.":
    "Mitarbeit bei täglichen Abläufen in Zellkultur, Probenverarbeitung, Molekularbiologie und Immunologie nach Laborprotokollen sowie Arbeit mit wissenschaftlichen Datenbanken, Material- und Bestandsverwaltung und Entwicklung einer zweisprachigen wissenschaftlichen Website für die Forschungsgruppe. Meine Rolle entwickelte sich von der Mitarbeit als Praktikant zu einer konkreten Verantwortung im Zellkultur-Workflow: Mir wurden Zellhandhabung, Pflege und damit verbundene Routinen anvertraut; außerdem wurde ich regelmäßig zur Unterstützung bei beaufsichtigten Verfahren mit Tierproben sowie bei molekularbiologischen und immunologischen Abläufen hinzugezogen. Die angeleitete Tätigkeit stärkte Reproduzierbarkeit, Assay-Interpretation und Qualitätskontrolle bei wachsender Eigenständigkeit. Bei beaufsichtigten Verfahren mit Tierproben führte ich die Gewinnung/Entnahme muriner Proben persönlich durch und übernahm anschließend deren Handhabung.",
}

text = WORKBENCH_JS.read_text(encoding="utf-8")
for old, new in replacements.items():
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"Expected exactly one source phrase, found {count}: {old[:80]}")
    text = text.replace(old, new, 1)
WORKBENCH_JS.write_text(text, encoding="utf-8")

hash12 = hashlib.sha256(WORKBENCH_JS.read_bytes()).hexdigest()[:12]
html = WORKBENCH_HTML.read_text(encoding="utf-8")
html, count = re.subn(r'js/workbench\.js\?v=[0-9a-f]{12}', f'js/workbench.js?v={hash12}', html, count=1)
if count != 1:
    raise SystemExit("Could not update Workbench JS cache token")
WORKBENCH_HTML.write_text(html, encoding="utf-8")

guard = EVIDENCE_GUARD.read_text(encoding="utf-8")
anchor = '    require_all(text, provenance_markers, "evidence-provenance marker")\n'
if anchor not in guard:
    raise SystemExit("Evidence guard anchor not found")
role_guard = '''\n    visible_role_markers = (\n        "specific responsibility within the cell-culture workflow",\n        "was frequently called on to support supervised animal-sample procedures and molecular or immunology workflows",\n        "responsabilidad concreta dentro del flujo de cultivo celular",\n        "se recurría a mí con frecuencia para apoyar procedimientos supervisados con muestras animales y flujos de biología molecular o inmunología",\n        "konkreten Verantwortung im Zellkultur-Workflow",\n        "regelmäßig zur Unterstützung bei beaufsichtigten Verfahren mit Tierproben sowie bei molekularbiologischen und immunologischen Abläufen hinzugezogen",\n    )\n    require_all(text, visible_role_markers, "La Princesa visible role-progression marker")\n'''
if "visible_role_markers = (" not in guard:
    guard = guard.replace(anchor, anchor + role_guard, 1)
EVIDENCE_GUARD.write_text(guard, encoding="utf-8")

print(f"Patched La Princesa role visibility in EN/ES/DE; workbench.js cache={hash12}")
