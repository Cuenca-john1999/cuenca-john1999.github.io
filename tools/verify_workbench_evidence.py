#!/usr/bin/env python3
"""Guard evidence provenance and preservation in Workbench laboratory entries."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WORKBENCH_JS = ROOT / "workbench" / "js" / "workbench.js"


def fail(message: str) -> None:
    raise SystemExit(f"[workbench-evidence] {message}")


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
    for marker in provenance_markers:
        if marker not in text:
            fail(f"evidence-provenance marker missing: {marker}")

    preserved_scope_markers = (
        "cytokine-stimulated and adherent cell cultures, including HaCaT",
        "Buffy Coat handling and CD4/CD14 isolation",
        "transgenic-mouse genotyping",
        "immunohistochemistry; and immunofluorescence",
        "personally performed, under supervision and established protocols, collection/extraction of murine samples",
        "SteamBioAfrica and BIO4Africa",
        "thermogravimetric analysis (TGA)",
        "TGA Q500",
        "vacuum filtration",
        "internal statistical quality-control self-checks",
        "progressive responsibility for the volatile-matter workflow",
        "handover training and supervision of replacement interns",
        "Documentary basis & privacy",
        "Documentary basis & confidentiality",
    )
    for marker in preserved_scope_markers:
        if marker not in text:
            fail(f"preserved laboratory-scope marker missing: {marker}")

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
