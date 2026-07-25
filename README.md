# Jhon M. Cuenca Portfolio

Static website for the professional portfolio of Jhon M. Cuenca, focused on clinical and biomedical laboratory work.

Public site:

- Professional profile: https://cuenca-john1999.github.io/
- Workbench: https://cuenca-john1999.github.io/workbench/

## Purpose

- Present the professional profile, experience and public professional documentation of Jhon M. Cuenca.
- Maintain Workbench as a separate space for projects, notes and applied learning.
- Communicate scientific content by clearly separating evidence, interpretation and hypotheses.

## Repository structure

Current repository paths:

- /index.html
- /workbench/
- /assets/css/
- /assets/js/
- /assets/images/
- /assets/documents/
- /assets/svg/
- /data/translations/
- /robots.txt
- /sitemap.xml

## Architecture

- Static website with no backend.
- HTML, CSS and vanilla JavaScript.
- Main portfolio translations are loaded from JSON files in /data/translations/ (EN/DE/ES).
- Workbench translations are maintained internally in workbench/js/workbench.js (EN/DE/ES).
- Static structure compatible with GitHub Pages.
- The published site is available through the public URLs listed above.

## Local preview

From the project root:

```bash
python3 -m http.server 8000
```

Open in a browser:

- http://localhost:8000/
- http://localhost:8000/workbench/

## Maintenance

- Keep relative paths compatible with GitHub Pages.
- When visible content is added or updated, update EN/DE/ES where applicable.
- Check basic accessibility, mobile layout and browser console output before publishing.
- Do not publish local assistant files: .continue/ must remain ignored by Git.
- If new public pages are added, review robots.txt and sitemap.xml.
- Do not include private data or unverified information.

## Scientific scope

Research notes and concepts are presented as literature-informed, exploratory or educational work where applicable. They are not presented as validated clinical results, demonstrated treatments or completed experimental findings unless explicitly supported by evidence. Hypotheses and proposed methods require appropriate experimental validation.

## Authorship and AI assistance

Jhon defines the concepts, requirements, professional content, information structure and product decisions for the portfolio.

Technical implementation, research support and editorial work may be assisted by AI tools. The repository does not present Jhon as a professional software developer.

## License

No explicit software or content license is included in this repository. No permission for reuse should be inferred from the absence of a license.
