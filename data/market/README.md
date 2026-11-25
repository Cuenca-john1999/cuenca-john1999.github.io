# Market content and evidence

- `common-evidence.json`: stable technical skill IDs with source, shared field, evidence link and localized names/context/scope. Add or edit a technique here and regenerate all routes with `python3 tools/generate_localized_pages.py`.
- `*-sections.html`: market-specific profiles, equipment presentation and dossier links. Do not duplicate the skills rows; preserve the common catalogue marker.
- `recruitment.json`: public application-package document allowlist and local labels.
- `scientific-library.json`: educational notes, references, scope/limits and conceptual workflows. Drafts are not the author's original experiments or peer-reviewed papers.
- Public documents must pass the PDF privacy checker. Do not add private CVs, confidential SOPs, grades, placement hours or unsupported professional recognition claims.
- Work only in `main_working`; run CI and merge into `main` when checks and review are complete. Do not create additional development branches.
