# SimpleGrid.ai — Frontend Forensic Audit
Date: 2026-05-30
Auditor: Claude Code
Commit audited: adafd6029d1b48a569e62b196ae5d75a1f4b4d0a

> Scope note: **static forensic analysis** (file reads, grep, JSON/XML/JS-level reasoning). No browser engine is available and the rules forbid `npm install` / build runs, so every check needing a live headless browser, device matrix, network capture, or PDF rendering is **DEFERRED** with the verification needed. Read-only pass — no files changed except this report.
>
> This is a re-audit at commit `adafd60`, after a prior fix pass. **Resolved-since-last-pass** items are listed at the end; the Full Findings section contains only **currently-open** bugs verified against the current tree.

## Executive summary

| Severity | Count |
|----------|-------|
| P0       | 0 |
| P1       | 2 |
| P2       | 4 |
| P3       | 3 |

| Category               | P0 | P1 | P2 | P3 |
|------------------------|----|----|----|----|
| Build & parity         | 0  | 0  | 2  | 0  |
| Content sync           | 0  | 0  | 0  | 0  |
| CTA wiring             | 0  | 0  | 0  | 2  |
| JS execution           | 0  | 1  | 0  | 1  |
| Forms                  | 0  | 0  | 0  | 0  |
| Analytics & consent    | 0  | 0  | 0  | 0  |
| Security & CSP         | 0  | 1  | 0  | 0  |
| Accessibility          | 0  | 0  | 1  | 0  |
| CSS & responsive       | 0  | 0  | 1  | 0  |
| Tools (35)             | 0  | 0  | 0  | 0  |
| Blog (18)              | 0  | 0  | 0  | 0  |
| Error/degraded states  | 0  | 0  | 0  | 0  |
| Cross-browser          | deferred |
| Performance            | 0  | 0  | 0  | 0  |

## Top P0/P1 deal-breakers
1. **BUG-001 (P1)** — React/ReactDOM injected from unpkg with **no SRI** on all 18 blog pages + tool pages (0/18 blog loaders set `integrity`). Marketing pages do carry SRI — inconsistent.
2. **BUG-002 (P1, SUSPECTED)** — CSP allows `clarity.ms` on only 9 pages while GTM (`GTM-KDDX6XX3`) loads on 80. If Clarity/Google-Ads tags live in that GTM container, they are CSP-blocked on ~71 pages.

---

## Full findings (currently open, grouped, P0→P3)

### BUG-001 | P1 | JS execution / Security | blog/*/index.html, tools/*/index.html (inline loader)
**Title:** React + ReactDOM lazy-injected from unpkg without Subresource Integrity on blog/tool pages.
**Observed:** Marketing pages use `<script ... integrity="sha384-..." crossorigin>`. Blog/tool pages inject React via an inline `add(src, cb)` helper that sets only `s.src`/`s.async` — no `integrity`, no `crossOrigin`. 0 of 18 blog pages set `s.integrity`.
**Expected:** Every CDN-loaded script carries a matching `integrity` + `crossorigin`, or React is self-hosted.
**Reproduction:** `grep -rln "s.integrity" blog/*/index.html` → 0 matches; `grep -n "unpkg.com/react" blog/<any>/index.html` → 2 hits, neither with integrity.
**Evidence:**
```
add('https://unpkg.com/react@18.3.1/umd/react.production.min.js', function(){
  add('https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js', function(){
```
**Suggested fix:** In the loader set `s.integrity` (reuse the hashes in `index.html`) + `s.crossOrigin='anonymous'`. NOT auto-fixable safely without a browser: a wrong hash blanks every blog/tool page, and the hash can't be verified against the live unpkg artifact offline.

### BUG-002 | P1 (SUSPECTED) | Security & CSP | all HTML except competitors/*
**Title:** CSP `clarity.ms` / `doubleclick` allowlist inconsistent with where GTM runs.
**Observed:** `clarity.ms` is in CSP on 9 pages (8 competitor pages + `competitors.html`); GTM loads on 80 pages. No page has a direct Clarity loader, so Clarity (if used) can only arrive via GTM — allowed on 9/80.
**Expected:** Every page loading GTM allowlists what GTM injects, or those hosts appear nowhere.
**Reproduction:** `grep -rl clarity.ms --include=*.html | wc -l` → 9; `grep -rl googletagmanager --include=*.html | wc -l` → 80.
**Evidence:** `competitors/netsuite/index.html:5` CSP has `https://www.clarity.ms https://*.clarity.ms`; `index.html` CSP does not.
**Verification needed:** Read the `GTM-KDDX6XX3` container config (remote). If Clarity/Ads tags are live → P1 (broken on ~71 pages); if not → dead CSP entries (P3). **OPEN QUESTION.**

### BUG-015 | P2 | Build & parity (stale build) | app/privacy.js:17,22 ; app/case-furniture-manufacturer.js
**Title:** Compiled JS still renders em-dashes (`—`) although the `.jsx` sources were de-em-dashed — the live pages show em-dashes.
**Observed:** A prior sweep replaced em-dashes with hyphens in `.jsx`/`.html` and "verified" with a literal-character grep (`grep "—"`). Babel encodes em-dashes as the escape `—`, which that grep cannot see, so the compiled `.js` was never cleaned and is now **stale relative to its source**. `app/privacy.js` emits 6 em-dashes; `app/case-furniture-manufacturer.js` emits 2. Both `.jsx` sources contain zero em-dashes. The privacy and furniture case-study pages render from these `.js` files, so visitors still see em-dashes — contrary to the site-wide "no em-dashes" intent and proving compiled output diverged from source.
**Expected:** Compiled `.js` matches `.jsx`; live pages render hyphens.
**Reproduction:**
  1. `grep -c '—' app/privacy.js` → 6 ; `grep -c '—' app/privacy.jsx` → 0.
  2. `grep -c '—' app/case-furniture-manufacturer.js` → 2 ; source `.jsx` → 0.
**Evidence:**
```
app/privacy.js:22:  ...React.createElement("strong", null, "Necessary"), " — site security and core functionality")
app/privacy.jsx:73:  <li><strong>Necessary</strong> - site security and core functionality</li>
```
**Suggested fix:** Recompile both `.jsx`→`.js` (or replace `—`→`-` in the two `.js`), and re-verify em-dash removal with a grep that also matches `\\u2014`.

### BUG-016 | P2 (SUSPECTED) | Build & parity (stale build) | components/*, app/*
**Title:** 9 `.jsx` are newer than their `.js`; content drift confirmed for em-dashes (BUG-015), unverified elsewhere.
**Observed:** mtime check flags `Footer.jsx`(+35s), `LoginModal.jsx`(+41246s), `Nav.jsx`(+5s), `PostInfographics.jsx`(+76218s), `app/hiring.jsx`(+41s), `app/home.jsx`(+15s), `app/not-found.jsx`(+41246s), `app/privacy.jsx`(+85791s), `app/product.jsx`(+40s). Visible-prose parity spot-checks were clean for `product`/`LoginModal`; `privacy` diverges (see BUG-015). mtime alone is unreliable (git checkout resets it), so this is the spec's "P0 stale build" check downgraded to SUSPECTED pending a real build.
**Expected:** `.js` is the current compile of `.jsx`.
**Reproduction:** `for j in components/*.jsx app/*.jsx; do [ "$j" -nt "${j%.jsx}.js" ] && echo "$j"; done`.
**Verification needed:** Run the JSX→JS build and `git diff` the `.js` output (build toolchain is `_config.yml`-excluded; `npm install` forbidden this pass).

### BUG-005R | P2 | Accessibility | components/InviteModal.jsx / components/InviteModal.js
**Title:** The React InviteModal does not mark background content `aria-hidden` while open.
**Observed:** The prior fix added background-hiding to the **vanilla** `BookDemoModal.js` only. The React `InviteModal` (`window.InviteModal`) traps focus and sets `aria-modal`, but does not `aria-hidden`/`inert` the rest of the page, so virtual-cursor SR users can still read behind it.
**Expected:** Background `aria-hidden="true"` (or `inert`) while the dialog is open; restored on close.
**Reproduction:** `grep -c "aria-hidden" components/InviteModal.jsx` → only on decorative SVGs, none toggled on body content.
**Evidence:** `InviteModal.jsx:17-43` effect sets focus trap + scroll lock, no background `aria-hidden`.
**Suggested fix:** Mirror `BookDemoModal.setBackgroundHidden()` in the InviteModal mount/unmount effect (edit `.jsx` + `.js`).

### BUG-008 | P2 (SUSPECTED) | Accessibility / CSS | components/HomeTop.js (RadialBurst), assets/landing/radial-burst.js
**Title:** JS canvas burst animation may ignore `prefers-reduced-motion`.
**Observed:** CSS honors reduced-motion (`styles.css:30,263`), but the homepage/ furniture burst are `requestAnimationFrame` canvas loops with no `matchMedia('(prefers-reduced-motion: reduce)')` guard found.
**Expected:** Continuous animation freezes/tames under reduced-motion.
**Verification needed:** Set OS reduced-motion, load home, confirm the canvas stops. **DEFERRED (browser).**

### BUG-011 | P3 | CTA wiring | components/BookDemoModal.js + components/InviteModal.jsx
**Title:** Two parallel invite-modal implementations (vanilla interceptor + React) drift.
**Observed:** Same fields/endpoint, two code paths; fixes must be applied twice (BUG-005R is exactly this — the React copy was missed). 
**Suggested fix:** Consolidate to one. **[refactor — not a point fix]**

### BUG-012 | P3 | CTA wiring | components/BookDemoModal.js:167-176
**Title:** Trigger detection keys on link text containing "book a demo".
**Observed:** A cal.com link whose text is reworded or icon-only would navigate to cal.com instead of opening the form. Intentional for "Book a call", fragile for future copy.
**Suggested fix:** Prefer the already-supported `[data-sg-invite]` hook over text matching.

### BUG-013 | P3 | Performance | privacy.html, terms.html
**Title:** React UMD loads on otherwise-static legal pages.
**Observed:** privacy/terms mount React to render static legal copy (~130KB), where `security.html`/`accessibility.html`/`404.html` are pure static.
**Suggested fix:** Bake privacy/terms to static HTML. **[architecture]**

---

## Resolved since last pass (verified at adafd60)
- **z-index** — `.modal-overlay` is now `z-index:10001` (above the 9999 cookie banner). ✓ (`styles.css`)
- **Modifier-click** — `BookDemoModal.js` now early-returns on `metaKey/ctrlKey/shiftKey/altKey`/non-primary button → cmd-click opens cal.com in a new tab. ✓
- **Modal background aria-hidden** — added to the **vanilla** interceptor (`setBackgroundHidden`, 3 refs). ✓ (React copy still open — BUG-005R)
- **404 skip link** — present + `#main` target. ✓
- **Form autocomplete** — `name`/`organization`/`email` on both modals (4/4/4 incl. honeypot `off`). ✓
- **React InviteModal double-submit** — `if (state==='submitting') return;` guard added (`.jsx`+`.js`). ✓
- **furniture-erp CSP** — page now ships a scoped CSP (incl. its Google Fonts hosts). ✓
- **Audit report publish-exclusion** — `_config.yml` excludes `AUDIT_REPORT.md`. ✓

## Stage-by-stage coverage
- **Stage 1 — Build & parity:** FULLY EXECUTED. 82 HTML / 26 JSX / 40 JS / 5 CSS / 6 SVG / 11 raster / 1 XML. All `.jsx` have `.js`; `BookDemoModal.js` + `app/blog-post.js` are intentional hand-written vanilla (not orphans). Zero `<script src=*.jsx>`; zero `.js` importing `.jsx`. Blog parity 18=18. Tools 35, chip counts sum to 35 and match `data-cat`. → BUG-015 (confirmed drift), BUG-016 (mtime, SUSPECTED).
- **Stage 2 — Content sync:** EXECUTED. Tool/competitor hrefs resolve & dirs linked (`_shared` correctly unlinked); legacy `post.html?id=N` maps id→slug (data loaded before redirect) with `/blog.html` fallback; 18 blog JSON-LD parse valid; no `<img>` missing `alt`. Clean.
- **Stage 3 — CTA wiring:** EXECUTED (static). 308 cal.com refs exact; 105 mailto = `hello@`; 4 `SG_INVITE_TO` = `hello@`; no `_blank` missing `rel`; interceptor uses document-capture delegation, idempotent, honeypot, double-submit guard, focus trap, ESC, scroll-lock restore, modifier-click bypass. → BUG-011, BUG-012.
- **Stage 4 — JS execution:** PARTIAL (static). Script order/defer clean on marketing pages; jsPDF tool-only; React not on pure-static legal-adjacent pages. Runtime console/hydration → DEFERRED (browser). → BUG-001.
- **Stage 5 — Forms:** PARTIAL (static). Native validation, honeypot, success/error, `aria-live` error region. Live submit/network/double-submit → DEFERRED (browser).
- **Stage 6 — Analytics & consent:** EXECUTED (static). Gate is explicit opt-in (`sg_consent==='accepted'`), stricter than documented; opt-out checked before init; decline permanent; key public `phc_`; GA4/GTM single-sourced. Cold-load network → DEFERRED but code verified.
- **Stage 7 — Security & CSP:** EXECUTED (static). `furniture-erp` now has CSP (resolved). 2 `assets/case-apex-*.html` iframe fragments still lack CSP (embedded, low concern). No mixed content in served files; no exposed secrets. → BUG-002.
- **Stage 8 — Accessibility:** PARTIAL (static). `lang`, single `<h1>`, skip links present (incl. 404 now); focus rings via box-shadow not removed. Keyboard/contrast/SR → DEFERRED. → BUG-005R, BUG-008.
- **Stage 9 — CSS & responsive:** PARTIAL. z-index layering now correct (modal>banner). Breakpoints/overflow/CLS/font-fallback → DEFERRED (browser).
- **Stage 10 — Tools (35):** PARTIAL (sampled). `markup-vs-margin` clamps inputs, warns on negatives, guards `cost===0`; 14/35 use `isFinite`. Full per-tool fuzz/PDF/iOS → DEFERRED.
- **Stage 11 — Blog (18):** EXECUTED (static). All JSON-LD valid; no missing `alt`.
- **Stage 12 — Error/degraded:** PARTIAL. 404 renders + has skip link; JS-disabled seed present. CDN/FormSubmit/Cal failure, slow-net → DEFERRED.
- **Stage 13 — Cross-browser:** DEFERRED entirely (no engines).
- **Stage 14 — Performance:** PARTIAL. jsPDF tool-only ✓; React not on pure-static ✓ (privacy/terms exception → BUG-013). Weight/LCP/CLS → DEFERRED.

## Tools used
- **Headless browser:** none — dynamic stages deferred.
- **Static scans:** ext counts; jsx/js pairing + mtime (`-nt`/`stat -f %m`); `\.jsx"` in HTML; `from './*.jsx'`; blog slug↔dir `comm`; tools `data-cat` vs chip counts; cal.com / mailto / formsubmit recipient; `http://` mixed-content; `_blank` vs `rel`; unpkg SRI presence (`s.integrity`); CSP host matrix; GA4/GTM/PostHog key consistency; clarity refs; lang/h1/skip; `<img>` alt (PCRE); blog JSON-LD parse (python); `prefers-reduced-motion`; `outline:none`/`focus-visible`; z-index; **`—` escape scan in compiled JS** (new this pass); visible-prose jsx↔js parity (python).
- **Manual reads:** `BookDemoModal.js`, `InviteModal.jsx/.js`, `analytics-init.js`, `cookie-consent.js`, `app/privacy.js/.jsx`, `_config.yml`, blog/tool templates.

## Open questions
1. Is Microsoft Clarity / Google Ads conversion configured in GTM `GTM-KDDX6XX3`? Decides BUG-002 severity (remote config, unreadable from repo).
2. Does the JSX→JS build, re-run now, diff against committed `.js` beyond the em-dash chars in BUG-015? (Confirms scope of BUG-016.)
3. Untracked `seo-audit-data/` + `scripts/_seo_*.py` are present in the working tree (another session's WIP). If committed, will `seo-audit-data/` be `_config.yml`-excluded from publishing? (Currently neither tracked nor excluded.)
4. Intended split between the vanilla `BookDemoModal` and React `InviteModal` (BUG-011)?

## Re-run instructions
```bash
cd /Users/mukundagarwal/Desktop/SimpleGridUI
# stale-build: em-dash escapes in compiled output (BUG-015) — the check the prior sweep lacked
grep -rl '\\u2014' . --include='*.js' | grep -vE 'node_modules|\.node/|vendor/'
# stale-build mtime (BUG-016)
for j in components/*.jsx app/*.jsx; do [ "$j" -nt "${j%.jsx}.js" ] && echo "JSX-NEWER $j"; done
# SRI on blog/tool React (BUG-001)
grep -rln "s.integrity" blog/*/index.html | wc -l   # expect 18, actual 0
# CSP clarity vs GTM (BUG-002)
echo "clarity=$(grep -rl clarity.ms --include='*.html'|grep -v node_modules|wc -l) gtm=$(grep -rl googletagmanager --include='*.html'|grep -v node_modules|wc -l)"
# React InviteModal background aria-hidden (BUG-005R)
grep -n "aria-hidden" components/InviteModal.jsx
```

## End of report
*Dynamic verification (Stage 4 runtime, 6 network, 9 visual, 10 PDF/iOS, 13 cross-browser, 14 weight/LCP) remains outstanding; run with Playwright + a real iOS Safari device before treating this audit as complete.*
