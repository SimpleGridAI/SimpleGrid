# SimpleGrid SEO Build Day — Work Log

Internal doc (excluded from publishing via `_config.yml`). Every change, file, verification, and commit. Session start commit: `6078b44`.

> Deploy note: all work is **committed locally only**. Nothing has been pushed to `origin/main`, so the live site is unchanged until the founder approves a push.

---

## TIER 1 — Site-wide mechanical wins

### T1.1 — HowTo schema on all 35 tool pages
- **What:** Added a tool-specific `HowTo` JSON-LD node into each tool's existing `@graph` (kept SoftwareApplication + BreadcrumbList). Steps are derived from each tool's REAL input labels + meta description (not generic): step 1 "Enter your numbers / Answer the questions" lists the actual field labels; step 2 reuses the page's own description; step 3 export/next.
- **Files:** `tools/*/index.html` (35) via `scripts/_add_howto.py`.
- **Verify:** `35/35` tools have a valid HowTo with ≥3 steps; all JSON-LD re-parses (0 errors). DoD ✓.

### T1.2 — Schema for competitor + furniture pages (were schema-less)
- **What:** Injected `@graph` with `WebPage` + `BreadcrumbList` into the 8 competitor pages and furniture-erp; `CollectionPage` + `BreadcrumbList` into competitors.html hub. Added furniture-erp `og:image` (site card) + dimensions.
- **Files:** `competitors/*/index.html` (8), `competitors.html`, `furniture-erp/index.html` via `scripts/_add_comp_schema.py`.
- **Verify:** every nested page now has BreadcrumbList; 0 schema-less shipped pages (except 404, correct). DoD ✓.

### T1.3 — llms.txt expanded to full URL surface
- **What:** Kept the strong entity/claims block; added brand-disambiguation paragraph (vs "Simplegrid Technology, Inc." / "Simply Grid"), proof points (Apex 12-day, furniture 21-day, 30-day free run, founder Mukund Agarwal), sameAs (LinkedIn/X/GitHub), and the FULL URL list: all 35 tools, 18 articles, 8 comparison pages, both case studies, furniture-erp.
- **Files:** `llms.txt` (now 73 simplegrid.ai URLs, was 9). DoD ✓.

### T1.4 — Title hygiene (PARTIAL — curated, keyword-preserving)
- **What:** Trimmed 10 worst-offender titles (>64 chars) to ≤60 while keeping the head keyword; synced `<title>` + `og:title` + `twitter:title`. See `NEEDS_FOUNDER_REVIEW.md` for the exact before/after and the remaining borderline titles + all 27 short-meta expansions left for founder approval (not auto-written — copy risk).
- **Files:** 7 tool pages + `competitors/dynamics-365/index.html` + `competitors.html`.
- **Verify:** all 10 edited titles ≤60. DoD ✓ (partial; rest in review pack).

### T1.5 — Social tags
- **What:** Added `twitter:card`/`title`/`description`/`image`/`site` to every page missing them (46 pages: tools, competitors, tools-hub, accessibility, security). furniture-erp og:image added in T1.2.
- **Files:** 46 `*.html` via `scripts/_t15_t16.py`.
- **Verify:** `79/79` shipped pages now have twitter:card. DoD ✓.

### T1.6 — Reliability + CSP cleanup
- **What:** (a) Added SRI `integrity` + `crossorigin` to the React/ReactDOM unpkg loads on all 18 blog pages (reused the exact `react@18.3.1` / `react-dom@18.3.1` sha384 hashes already verified on the marketing pages — same artifact, safe). (b) Removed the dead `clarity.ms` allowlist from the CSP of 9 pages (Clarity is not loaded anywhere).
- **Files:** `blog/*/index.html` (18), 9 pages with clarity CSP via `scripts/_t15_t16.py`.
- **Verify:** 18/18 blog loaders set `s.integrity`; 0 `clarity.ms` remaining; stripped CSPs re-checked (no malformation). DoD ✓.

### T1.7 — Image weight
- **What:** The named `assets/founder-mukund.png` (540KB) is an **orphan** — referenced by no page (the about page actually loads `assets/team_photo.jpeg`). Left the orphan untouched (flagged in OFF_CODE_HANDOFF). Optimized the image that actually ships: `team_photo.jpeg` 305KB → 225KB (26% smaller, dims intact, quality 80). `elite-factory.jpeg` re-encode increased size → reverted (already well-compressed).
- **Files:** `assets/team_photo.jpeg`. DoD ✓ (real shipping image optimized).

**Tier 1 verification:** 79/79 pages parse; 0 JSON-LD errors; 35 HowTo; 79/79 twitter:card; 8/8 competitor breadcrumbs; 18/18 SRI; 0 clarity; 73 llms URLs.
**Commit:** see git log "T1: ...".

---

## TIER 2 — Entity / E-E-A-T

### T2.1 Organization schema expanded (index.html)
Added `legalName` (Valaya AI Technologies Pvt. Ltd.), `founder` (ref #mukund), GitHub added to `sameAs` (now LinkedIn+X+GitHub). areaServed (US) + contactPoint already present. Added a `Person` node (#mukund, Mukund Agarwal, Founder) to the homepage @graph. Verify: parses, legalName present. DoD ✓.

### T2.2 Founder entity + Article authorship
- Person (Mukund Agarwal) added to about.html @graph + set as WebPage `mainEntity`.
- All 20 Articles (18 blogs + 2 cases) `author` changed Organization -> Person (Mukund Agarwal, Founder). Blog template `scripts/generate-blog-pages.py` updated so regenerated blogs keep Person author.
- Verify: 20/20 Articles Person-authored; 0 parse errors. DoD ✓ (visible-seed byline deferred to SSR — see handoff).

### T2.3 Disambiguation framing
Footer.jsx legal line now frames "SimpleGrid ... by Valaya AI Technologies Pvt. Ltd." (builds to Footer.js in T6). Static-page footers already name Valaya; broader static-footer text edit deferred (fragmented markup, low marginal value over schema legalName + llms.txt disambiguation). DoD ✓ (React footer; static deferred).
Files via `scripts/_t2_entity.py`.
