#!/usr/bin/env python3
"""Guard evidence provenance and preservation in Workbench laboratory entries."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WORKBENCH_JS = ROOT / "workbench" / "js" / "workbench.js"


def fail(message: str) -> None:
    raise SystemExit(f"[workbench-evidence] {message}")


def require_all(text: str, markers: tuple[str, ...], label: str) -> None:
    for marker in markers:
        if marker not in text:
            fail(f"{label} missing: {marker}")


def main() -> None:
    text = WORKBENCH_JS.read_text(encoding="utf-8")

    provenance_markers = (
        "Evidence provenance & technical detail",
        "Procedencia de la evidencia y detalle técnico",
        "Nachweisgrundlage & technische Details",
        "Evidence map: documented placement context, reference-supported responsibilities and personally confirmed supervised practice.",
        "Evidence map: documented Erasmus+ placement, reference-supported responsibilities and confirmed practical scope.",
        "Mapa de evidencia: contexto de prácticas documentado, responsabilidades respaldadas por referencia y práctica supervisada confirmada personalmente.",
        "Mapa de evidencia: prácticas Erasmus+ documentadas, responsabilidades respaldadas por referencia y alcance práctico confirmado.",
        "Nachweismatrix: dokumentierter Praktikumskontext, durch Referenz gestützte Verantwortlichkeiten und persönlich bestätigte beaufsichtigte Praxis.",
        "Nachweismatrix: dokumentiertes Erasmus+-Praktikum, durch Referenz gestützte Verantwortlichkeiten und bestätigter praktischer Umfang.",
    )
    require_all(text, provenance_markers, "evidence-provenance marker")

    visible_role_markers = (
        "specific responsibility within the cell-culture workflow",
        "was frequently called on to support supervised animal-sample procedures and molecular or immunology workflows",
        "responsabilidad concreta dentro del flujo de cultivo celular",
        "se recurría a mí con frecuencia para apoyar procedimientos supervisados con muestras animales y flujos de biología molecular o inmunología",
        "konkreten Verantwortung im Zellkultur-Workflow",
        "regelmäßig zur Unterstützung bei beaufsichtigten Verfahren mit Tierproben sowie bei molekularbiologischen und immunologischen Abläufen hinzugezogen",
    )
    require_all(text, visible_role_markers, "La Princesa visible role-progression marker")

    english_scope_markers = (
        "serum, peripheral blood, immune cells, cell lines and primary rat cells",
        "cytokine-stimulated and adherent cell cultures, including HaCaT",
        "sterile technique, media preparation, passaging and freezing",
        "Buffy Coat handling and CD4/CD14 isolation",
        "psoriasis, dermatitis and hidradenitis suppurativa contexts",
        "animal samples and murine lymphoid organs",
        "RNA extraction, PCR, electrophoresis and transgenic-mouse genotyping",
        "Western blot gel casting, transfer and blocking",
        "immunohistochemistry; and immunofluorescence",
        "personally performed, under supervision and established protocols, collection/extraction of murine samples",
        "scientific databases; material and inventory management; development of a bilingual scientific website",
        "SteamBioAfrica and BIO4Africa",
        "moisture, ash, volatile matter, fixed carbon, thermogravimetric analysis (TGA), CHNOS elemental analysis, ash melting, BMP and biogas, FOS/TAC, ICP, COD, ammonia, NIR/VISION and vacuum filtration",
        "CHNOS analyser, TGA Q500, CARBOLITE furnaces, BMP units and Biogas 5000",
        "internal statistical quality-control self-checks",
        "Thermal Excel records, database updates, batches, labels and result traceability",
        "calibration, troubleshooting, maintenance and monitoring",
        "operational guides, data sheets, work instructions and troubleshooting documentation",
        "progressive responsibility for the volatile-matter workflow",
        "handover training and supervision of replacement interns",
        "Documentary basis & privacy",
        "Documentary basis & confidentiality",
    )
    require_all(text, english_scope_markers, "English preserved laboratory-scope marker")

    spanish_scope_markers = (
        "células primarias de rata",
        "cultivos celulares estimulados por citocinas y líneas adherentes, incluidas HaCaT",
        "manejo de Buffy Coat y aislamiento CD4/CD14",
        "psoriasis, dermatitis e hidradenitis supurativa",
        "órganos linfoides murinos",
        "genotipado de ratones transgénicos",
        "inmunohistoquímica e inmunofluorescencia",
        "fusión de cenizas",
        "hornos CARBOLITE",
        "controles estadísticos internos de calidad",
        "responsabilidad progresiva sobre el flujo de materia volátil",
        "Base documental y privacidad",
        "Base documental y confidencialidad",
    )
    require_all(text, spanish_scope_markers, "Spanish preserved laboratory-scope marker")

    german_scope_markers = (
        "primäre Rattenzellen",
        "mit Zytokinen stimulierte und adhärente Zellkulturen einschließlich HaCaT",
        "Buffy-Coat-Verarbeitung und CD4/CD14-Isolierung",
        "Psoriasis, Dermatitis und Hidradenitis suppurativa",
        "murine lymphatische Organe",
        "Genotypisierung transgener Mäuse",
        "Immunhistochemie und Immunfluoreszenz",
        "Ascheschmelze",
        "CARBOLITE-Öfen",
        "interne statistische Qualitätskontrollen",
        "schrittweise Verantwortung für den Workflow der Bestimmung flüchtiger Bestandteile",
        "Dokumentarische Grundlage & Datenschutz",
        "Dokumentarische Grundlage & Vertraulichkeit",
    )
    require_all(text, german_scope_markers, "German preserved laboratory-scope marker")

    duplicate_archive_markers = (
        "Laboratory practice archive · La Princesa",
        "Laboratory practice archive · Celignis",
        "Archivo técnico de prácticas · La Princesa",
        "Archivo técnico de prácticas · Celignis",
        "Technisches Praxisarchiv · La Princesa",
        "Technisches Praxisarchiv · Celignis",
    )
    for marker in duplicate_archive_markers:
        if marker in text:
            fail(f"duplicated Scientific Portfolio practice archive remains: {marker}")

    print("Workbench evidence provenance checks passed.")


if __name__ == "__main__":
    main()
