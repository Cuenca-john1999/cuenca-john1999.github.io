# CV Builder

Public route: `cv-builder/?lang=es|en|de`. Deterministic keyword matching, not an eligibility or experience-duration assessment. All printable professional claims derive from common-evidence.json and cv.json. Up to 12 selected skills; same two-page renderer as static CVs. The public builder does not accept private contact details. ZIP contains the custom CV and explicitly selected same-origin public PDFs. Tests: `node tools/test_cv_builder.mjs` and `node tools/generate_market_dossiers.mjs --check`.

The builder mounts natively at `#cv-builder` in all main portfolios. The original standalone route remains available. Profiles preselect up to eight skills (maximum twelve). Offer comparison, personal contact input and ZIP are progressively disclosed. Changing the PDF language does not change the surrounding portfolio. CSS is scoped. Browser checks cover each market and the standalone route.

Context engine: versioned multilingual task patterns and a separate transferable evidence layer. School science support is a builder-only focus. It promotes documented STEM teaching into page one while preserving the static CVs. Context links are suggestions, not equivalence claims. The deterministic matcher does not require a model; optional local embedding inference is described below. Regression cases include school-lab, research and explicit GMP requirements. Source excerpts are rendered with textContent; no offer is transmitted or persisted.

Requirement priority is a conservative clause-level hint (required, duty, preferred, unspecified or explicitly not required); it is not a comprehensive logical or legal interpretation. The UI exposes original snippets for task matches. Job descriptions are capped at 60,000 characters each. Further neural matching should be opt-in and run locally in a worker with a calibrated multilingual embedding model. E5-small is a candidate (MIT; 512-token input limit), so chunk full offers and precompute the public evidence index. Benchmark by job family, language, paraphrase, negation, distractors and long descriptions before enabling neural suggestions. Keep model output to evidence IDs, validate against the catalogue, and never publish private source documents. Browser inference must fall back to current rules on unavailable model, unsupported hardware, or failed download. No neural weights or generative model are included in this revision.

Semantic v1: optional real multilingual E5-small inference, pinned model revision 761b726dd34fb83930e26aab4e9ac3899aa1fa78, Transformers.js 3.8.1, INT8, WASM in a dedicated module worker. Public evidence text is embedded at runtime and cached in worker memory and IndexedDB; the model uses browser asset cache. All non-negated offer passages are chunked locally; query/passage prefixes and mean-pooling normalized vectors are used. No offer data is persisted or sent to inference APIs. Model/runtime assets are downloaded from Hugging Face and jsDelivr (network requests reveal normal connection metadata). The experimental cosine threshold .79 and top-five-per-passage retrieval are not calibrated confidence scores. Results are advisory and must be selected explicitly; facts and known gaps are separate. Quick analysis remains available if cancelled or unavailable. Tests cover synthetic vectors and a live browser download/inference smoke test; broader multilingual precision/recall benchmarking is still required. Current semantic analysis covers the first vacancy only; quick comparison covers both.

Benchmark (2026-11-28): 13 diagnostic cases including paraphrases of public adverts, synthetic multilingual, negation, sector ambiguity, irrelevant prose and long-tail controls. The quick regression asserts expected evidence and alerts. The real Chromium worker benchmark records expected-evidence coverage, additional suggestions for review, latency and threshold alternatives. The small curated fixture is not a representative validation set; do not describe coverage as overall model accuracy or tune and evaluate on the same cases. Threshold .79 remains experimental pending results.

Semantic v3 indexes every evidence in ES/EN/DE (267 variants, 89 distinct evidence keys). It deduplicates variants before ranking, filters clear promotional passages, adds task subspans, and prioritises contextual corroboration. New on-route suggestions use .85, other new suggestions .88; experimental, not measures of professional competence. The benchmark records raw and reranked results separately. Public-facing wording describes relevant experience positively. Custom PDFs use a larger typographic hierarchy, rule-separated sections, pagination and adaptive compact fallback; static documents remain byte-identical. Gaps remain separate in the vacancy review.

Home layout: the optional personal contact input is removed from the public builder and standalone UI. The package disclosure retains only public document choices. The three homepages use progressive disclosures for the inline CV Builder, document/reference hub, technical catalogue and equipment, and detailed experience/education/projects. Existing section IDs and direct links are retained; a deep link opens its parent disclosures. Without JavaScript the complete static content remains available. The static CV files remain unchanged; custom PDF rendering has its own preview and QR.

The home portfolio links to localized Technical Explorer and Document Centre pages generated from canonical content. Global search covers navigation and skills. The builder provides a real Blob PDF preview, an apply-recommended control, and relevance groups. Public evidence vectors only are stored in IndexedDB under a content/model hash, not vacancy text. Custom PDF page two includes a fixed QR to the public portfolio URL. Static CVs remain unchanged.

The global search also indexes public document links, equipment titles, scientific notes, projects and cases. The benchmark adds eight new synthetic holdout cases in a separately labeled set; these were not used to tune retrieval. They are diagnostic, not representative of all vacancies. Technical/document pages provide local theme switching and section shortcuts.

## Quality review — 2026-11-28

The previous CI run for commit `14c8aca` passed static integrity, generated PDF rendering, privacy checks for 37 public PDFs, Chromium/WebKit smoke checks and live semantic evaluation. Its final accessibility command failed because axe required an explicit Playwright browser context. This was corrected on the working branch; the expanded audit must still be run and reviewed.

Observed benchmark counts for that run (expected evidence recovered / total; additional hits are not necessarily false positives):

| Cohort | Expected | Quick recovered / additional | Semantic reranked recovered / additional | Hybrid recovered / additional |
|---|---:|---:|---:|---:|
| Regression, 13 cases | 36 | 36 / 34 | 30 / 26 | 36 / 51 |
| Independent synthetic holdout, 8 cases | 22 | 8 / 8 | 13 / 20 | 14 / 25 |

No threshold tuning was performed against the holdout in this review. Semantic-only recommendations require manual selection; the automatic recommendation button uses the deterministic requirement/task analysis. This avoids treating semantic retrieval as an eligibility assessment.

The benchmark now records model load, public-index preparation and query timings, plus the index source (computed, memory or IndexedDB). It restarts the worker within the same browser context and checks that the evidence index is retrieved from IndexedDB. Offers are not persisted as cache entries. These new checks need a successful CI run before reporting measured speed-up.

Additional release checks:
- Global search retains available sources when another source fails, retries failed loads, ranks title matches first and supports Escape to clear.
- Static integrity checks scan generated HTML, translations and public evidence for excluded academic details and identity-document patterns without logging matched values.
- Generated CV samples undergo PDF privacy checks and second-page QR decoding at 300 DPI. A physical print-and-scan check remains separate.
- Accessibility covers localized profile, Technical Explorer, Document Centre and Workbench pages, both themes where supported. Serious/critical findings and horizontal overflow block the audit.
- Content hashes cover module entry points, including the standalone CV builder, to prevent stale deployed JS entry points.

Review the latest GitHub Actions run and visual artifacts before release. A passing build alone is not a passing accessibility, privacy or semantic-quality review. The original academic-project dedications remain non-blocking advisories and need an explicit editorial decision. The working branch is public; it is not a private document store.

### Vacancy lifecycle and privacy notice
Editing either vacancy invalidates the previous comparison and semantic suggestions without changing the manually selected CV skills. A dedicated clear action removes both vacancy texts and their analysis from the current UI. Vacancy fields opt out of autocomplete, autocorrect and spellcheck; browser-level behaviour remains outside the application's control. The localized privacy page describes the optional external model asset downloads, local analysis and public-evidence cache. Browser regression coverage verifies the invalidation and clear action.
