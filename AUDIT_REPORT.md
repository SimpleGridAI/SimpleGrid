# SimpleGrid.ai — Frontend Forensic Audit
Date: 2026-05-30
Auditor: Claude Code
Commit audited: 6078b4426d524ab6e55d6cf65e7c8d4104447315

> Scope note: This pass is **static forensic analysis** (file reads, grep, JSON/XML/JS-AST-level reasoning). The environment has **no browser engine** and the audit rules forbid `npm install` / build runs, so all checks requiring a live headless browser, real device matrix, network capture, or PDF rendering are explicitly **DEFERRED** with the verification needed. Every non-deferred finding is backed by file+line evidence.

## Executive summary

| Severity | Count |
|----------|-------|
| P0       | 0 (none statically confirmed; P0-class dynamic checks deferred) |
| P1       | 2 |
| P2       | 6 |
| P3       | 6 |

| Category               | P0 | P1 | P2 | P3 |
|------------------------|----|----|----|----|
| Build & parity         | 0  | 0  | 0  | 1  |
| Content sync           | 0  | 0  | 0  | 0  |
| CTA wiring             | 0  | 0  | 2  | 2  |
| JS execution           | 0  | 1  | 0  | 1  |
| Forms                  | 0  | 0  | 0  | 2  |
| Analytics & consent    | 0  | 0  | 0  | 0  |
| Security & CSP         | 0  | 1  | 1  | 0  |
| Accessibility          | 0  | 0  | 2  | 0  |
| CSS & responsive       | 0  | 0  | 1  | 0  |
| Tools (35)             | 0  | 0  | 0  | 0  |
| Blog (18)              | 0  | 0  | 0  | 0  |
| Error/degraded states  | 0  | 0  | 0  | 0  |
| Cross-browser          | deferred |
| Performance            | 0  | 0  | 0  | 1  |

## Top P0/P1 deal-breakers
1. **BUG-001 (P1)** — React/ReactDOM load from unpkg **without SRI** on all blog + tool pages (dynamic injection); marketing pages do have SRI. Inconsistent CDN-integrity posture across ~50 pages.
2. **BUG-002 (P1, SUSPECTED)** — CSP allows `clarity.ms` on only 9 pages and `doubleclick`/googleads on 15, while GTM (`GTM-KDDX6XX3`) loads on 79. If those tags are configured in the GTM container, they are **CSP-blocked on ~70 pages** (console violations + lost analytics/conversion pixels).

*(No P0 confirmed by static analysis. The genuine P0-risk checks — analytics firing before consent on cold load, iOS Safari blob-download failure, blank-page-on-CDN-failure — require a browser and are deferred below, but their underlying code paths were read and look correct.)*

---

## Full findings (grouped, P0→P3)

### BUG-001 | P1 | Security/JS execution | blog/*/index.html, tools/*/index.html (inline loader)
**Title:** React + ReactDOM are injected from unpkg without Subresource Integrity on blog and tool pages.
**Observed:** Marketing pages use `<script src="https://unpkg.com/react@18.3.1/...js" integrity="sha384-..." crossorigin>`. Blog/tool pages instead lazy-inject React via an inline `add(src, cb)` helper that sets only `s.src` / `s.async` — no `integrity`, no `crossOrigin`.
**Expected:** Every CDN-loaded script carries a matching `integrity` + `crossorigin="anonymous"`, or React is self-hosted.
**Reproduction:**
  1. `grep -n "unpkg.com/react" blog/<any>/index.html` → 2 hits inside the inline loader, neither has `integrity`.
  2. Compare with `index.html` React tags, which do.
**Evidence:**
```
blog/.../index.html:  add('https://unpkg.com/react@18.3.1/umd/react.production.min.js', function(){
    add('https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js', function(){
```
(no `integrity` set on the created `<script>`)
**Suggested fix:** In the loader, set `s.integrity = '<sha384 for the exact artifact>'; s.crossOrigin = 'anonymous';` — reuse the hashes already present in `index.html`. NOTE: not auto-applied in this pass — a wrong hash blanks every blog/tool page, and the hash cannot be verified against the live unpkg artifact without network access. Apply via the page generator and verify in a browser.

### BUG-002 | P1 (SUSPECTED) | Security & CSP | competitors/*, all other HTML
**Title:** CSP host allowlist for Clarity / Google Ads is inconsistent with where GTM runs.
**Observed:** `clarity.ms` appears in CSP on 9 pages (the 8 competitor pages + `competitors.html`); `doubleclick`/googleads on 15. `analytics-init.js` loads GTM container `GTM-KDDX6XX3` on all 79 CSP pages. No page contains a direct Clarity loader, so Clarity (if used) can only arrive via GTM — which is allowed by CSP on only 9/79 pages.
**Expected:** Either every page that loads GTM allowlists the hosts GTM injects, or those hosts appear on no page.
**Reproduction:**
  1. `grep -rl "googletagmanager" --include=*.html | wc -l` → 79.
  2. `grep -rl "clarity.ms" --include=*.html | wc -l` → 9.
  3. 70 pages load GTM but disallow `clarity.ms`.
**Evidence:** `competitors/netsuite/index.html:5` CSP includes `https://www.clarity.ms` + `https://*.clarity.ms`; `index.html` CSP does not.
**Verification needed:** Read the GTM container config (remote) to confirm whether Clarity / Google Ads tags are live. If yes → P1 (broken on ~70 pages). If no → the 9 Clarity entries are dead CSP (downgrade to P3). **OPEN QUESTION — not auto-fixed; needs team confirmation of GTM contents.**

### BUG-003 | P2 | CSS & responsive / CTA | styles.css:451, assets/js/cookie-consent.js:28
**Title:** The cookie banner (z-index 9999) renders above the Book-a-demo modal (z-index 100).
**Observed:** `.modal-overlay { z-index: 100 }`. Cookie bar sets `z-index:9999` inline. A first-time visitor who has not yet consented and clicks "Book a demo" gets a modal that the cookie bar overlaps at the bottom (the modal's submit area on mobile).
**Expected:** The modal sits above the cookie banner (spec 9.9: banner above everything *except* the modal).
**Reproduction:**
  1. Fresh incognito (no `sg_consent`). Cookie bar shows.
  2. Click any "Book a demo" → modal opens at z-index 100, cookie bar floats over it at 9999.
**Evidence:** `styles.css:451 .modal-overlay { position: fixed; inset: 0; z-index: 100; ... }` vs `cookie-consent.js:28 'z-index:9999'`.
**Suggested fix:** Raise `.modal-overlay` z-index above 9999 (e.g. 10001). **[FIXED this pass]**

### BUG-004 | P2 | CTA wiring | components/BookDemoModal.js:178-184
**Title:** The cal.com interceptor hijacks modified clicks (cmd/ctrl/shift), breaking open-in-new-tab.
**Observed:** The document-level capture listener calls `e.preventDefault(); open();` for any click on a "Book a demo" link, with no check for `e.metaKey`/`e.ctrlKey`/`e.shiftKey`/`e.button`. A user cmd-clicking to open cal.com in a new tab gets the modal instead, and the new tab never opens.
**Expected:** Modified/middle clicks fall through to the native link (cal.com in a new tab).
**Reproduction:**
  1. Cmd-click (mac) / Ctrl-click (win) any "Book a demo" link.
  2. Observe: modal opens in-page; no new tab.
**Evidence:**
```
document.addEventListener('click', function (e) {
  var target = e.target.closest('a, button, [data-sg-invite]');
  if (!target) return;
  if (!isBookDemoTrigger(target)) return;
  e.preventDefault();
  open();
}, true);
```
**Suggested fix:** Early-return when `e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey`. **[FIXED this pass]**

### BUG-005 | P2 | Accessibility | components/BookDemoModal.js, components/InviteModal.jsx/.js
**Title:** Modal does not set `aria-hidden`/`inert` on background content while open.
**Observed:** Both invite-modal implementations trap Tab focus, but neither marks the rest of the page `aria-hidden="true"`. A screen-reader user using virtual-cursor navigation (not Tab) can still read the page behind the modal.
**Expected:** Background content is `aria-hidden="true"` (or `inert`) while the dialog is open; restored on close.
**Reproduction:** Open modal with a screen reader; swipe/arrow past the dialog → background content is still announced.
**Evidence:** No `aria-hidden` toggle in `BookDemoModal.js open()/close()` (lines 127-150) or `InviteModal.jsx` effect (lines 17-43).
**Suggested fix:** On open, set `aria-hidden="true"` on all direct `<body>` children except the overlay; restore on close. **[FIXED this pass — vanilla interceptor, which serves the primary CTA path]**

### BUG-006 | P2 | Security & CSP | furniture-erp/index.html
**Title:** The furniture-erp landing page ships with no Content-Security-Policy meta.
**Observed:** Every other served HTML page carries a CSP meta; `furniture-erp/index.html` (a live, form-bearing landing page) has none, so it runs under the default (no) policy.
**Expected:** A CSP consistent with the page's actual resources.
**Reproduction:** `grep -L "Content-Security-Policy" furniture-erp/index.html` → matches.
**Evidence:** Stage 7.1 scan: `NO CSP: ./furniture-erp/index.html` (also the two `assets/case-apex-*.html` iframe fragments, which are embedded, lower concern).
**Suggested fix:** Add a CSP matching siblings after confirming the page's hosts (self + unpkg + formsubmit + posthog + gtm + ga + 'unsafe-inline'). **[FIXED this pass after verifying resources]**

### BUG-007 | P2 | Accessibility | 404.html
**Title:** 404 page has no "skip to content" link.
**Observed:** Every primary page exposes a `.skip-link` as the first focusable element; `404.html` does not.
**Expected:** Skip link present (spec 8.9).
**Reproduction:** `grep -i skip 404.html` → no match.
**Suggested fix:** Add the standard `<a href="#main" class="skip-link">`. **[FIXED this pass]**

### BUG-008 | P2 (SUSPECTED) | Accessibility | components/HomeTop.js (RadialBurst), assets/landing/radial-burst.js
**Title:** JS canvas burst animation may not honor `prefers-reduced-motion`.
**Observed:** CSS honors reduced-motion in two places (`styles.css:30,263`), but the homepage burst and the furniture-erp burst are `requestAnimationFrame` canvas loops. No `matchMedia('(prefers-reduced-motion: reduce)')` guard was found in the burst code.
**Expected:** With reduced-motion set, the continuous splatter animation should freeze/tame.
**Verification needed:** Set OS reduced-motion and load home in a browser; confirm the canvas stops. **DEFERRED (browser).** If confirmed, add a matchMedia guard.

### BUG-009 | P3 | Forms | components/InviteModal.jsx:45 / components/InviteModal.js
**Title:** React InviteModal lacks an explicit in-flight submit guard (relies only on button `disabled`).
**Observed:** `submit()` sets `state='submitting'` but does not early-return if already submitting. The vanilla `BookDemoModal.js:91` does (`if (state === 'submitting') return;`). A very fast double-activate before React re-renders the disabled button could fire two POSTs.
**Expected:** Guard at the top of `submit`.
**Evidence:** `InviteModal.jsx:45 const submit = async (e) => { e.preventDefault(); setState('submitting'); ...` — no guard.
**Suggested fix:** `if (state === 'submitting') return;` at top of `submit`. **[FIXED this pass — .jsx + .js]**

### BUG-010 | P3 | Forms | BookDemoModal.js:37-45, InviteModal.jsx:109-117
**Title:** Form fields lack `autocomplete` attributes.
**Observed:** name/email/organization inputs have no `autocomplete` (`name`, `email`, `organization`). Honeypot correctly has `autocomplete="off"`.
**Expected:** `autocomplete="name"` and `autocomplete="email"` for faster, accessible completion (spec 5.4).
**Suggested fix:** Add `autocomplete` to the real fields. **[FIXED this pass]**

### BUG-011 | P3 | CTA wiring | components/BookDemoModal.js + components/InviteModal.jsx
**Title:** Two parallel invite-modal implementations (vanilla interceptor + React) can diverge.
**Observed:** `BookDemoModal.js` builds its own modal markup; `InviteModal.jsx` is a separate React modal with the same fields/endpoint. Fixes must be applied twice (e.g., BUG-005/009/010 affect both). Divergence risk over time.
**Expected:** Single source of truth.
**Suggested fix:** Consolidate (out of scope for a bug-fix pass; noted). **[NOT auto-fixed — refactor]**

### BUG-012 | P3 | CTA wiring | components/BookDemoModal.js:167-176
**Title:** Trigger detection keys on link text containing "book a demo".
**Observed:** `isBookDemoTrigger` only opens the modal if the link text includes "book a demo". An icon-only or reworded demo CTA with a cal.com href would silently navigate to cal.com instead of opening the form. Intentional for "Book a call", but fragile for future copy.
**Evidence:** `if (t.indexOf('book a demo') !== -1) return true;`
**Suggested fix:** Prefer an explicit `[data-sg-invite]` hook on every form-intent CTA (already supported) over text matching. **[NOT auto-fixed — content/convention]**

### BUG-013 | P3 | Performance | privacy.html, terms.html
**Title:** React UMD loads on otherwise-static legal pages.
**Observed:** `privacy.html`/`terms.html` mount React (`app/privacy.js`/`app/terms.js`) to render largely static legal copy, pulling ~130KB React+ReactDOM. `security.html`, `accessibility.html`, `404.html` are pure static (no React) — the better pattern.
**Suggested fix:** Consider baking privacy/terms to static HTML like security/accessibility. **[NOT auto-fixed — architecture]**

### BUG-014 | P3 (SUSPECTED) | Build & parity | components/*, app/*
**Title:** mtime heuristic flags 10 `.jsx` newer than `.js`, but no content drift found.
**Observed:** 10 pairs show `.jsx` mtime newer than `.js` (e.g. `app/privacy.jsx` +85791s, `components/PostInfographics.jsx` +76218s). However git checkout does not preserve mtimes, making this unreliable. Content spot-checks (privacy.jsx↔privacy.js term-by-term; HomeTop edited in both this session) show **no divergence**.
**Expected:** Compiled `.js` reflects `.jsx`.
**Verification needed:** Run the JSX→JS build and `git diff` the `.js` output. **DEFERRED (no `npm install` allowed).** Treat as a process gap, not a confirmed defect.

---

## Stage-by-stage coverage

- **Stage 1 — Build & parity:** FULLY EXECUTED (static). 82 HTML / 26 JSX / 40 JS / 5 CSS / 6 SVG / 16 raster / 1 XML. All 14 component `.jsx` have `.js`; all 12 app `.jsx` have `.js`. `BookDemoModal.js` + `app/blog-post.js` are intentionally hand-written vanilla (headers confirm) — not orphans. Zero `<script src=*.jsx>` in HTML ✓. Zero compiled `.js` importing `.jsx` ✓. `_config.yml` excludes `package*.json`, `node_modules/`, `scripts/`, `components/*.jsx`, `app/*.jsx` ✓. vendor/jspdf has all 4 referenced files ✓. Blog parity 18=18, zero orphans/missing ✓. Tools 35 dirs; chip counts sum to 35 and match `data-cat` tally exactly ✓. → BUG-014 (mtime, SUSPECTED).
- **Stage 2 — Content sync:** FULLY EXECUTED. Every tool card href resolves to a dir; every dir is linked ✓. 8 competitor pages all linked from `competitors.html`; `_shared` correctly unlinked ✓. Legacy `post.html?id=N` maps id→slug from `BLOG_DATA` (loaded synchronously before the redirect) with `/blog.html` fallback ✓. All 18 blog JSON-LD parse valid ✓. No `<img>` missing `alt` in served HTML ✓.
- **Stage 3 — CTA wiring:** FULLY EXECUTED (static). All 308 cal.com refs are exactly `https://cal.com/simplegrid-ai` ✓. All 105 mailto are `hello@simplegrid.ai` ✓. All 4 `SG_INVITE_TO` = `hello@simplegrid.ai`; endpoint `https://formsubmit.co/ajax/hello@simplegrid.ai` ✓. No `target="_blank"` missing `rel` ✓. Interceptor uses document-level capture delegation (covers React mounts), idempotent, honeypot, double-submit guard, focus trap, ESC, scroll-lock restore ✓. → BUG-004, BUG-005, BUG-011, BUG-012.
- **Stage 4 — JS execution:** PARTIAL. Static: script order/defer clean on marketing pages; jsPDF tool-only; React not on pure-static legal-adjacent pages. Console errors, hydration warnings, runtime traps → DEFERRED (browser). → BUG-001.
- **Stage 5 — Forms:** PARTIAL (static). Validation native (`required`+`type=email`), honeypot present, success/error states, error in `aria-live` region. Live submit/network-block/double-submit behavior → DEFERRED (browser). → BUG-009, BUG-010.
- **Stage 6 — Analytics & consent:** FULLY EXECUTED (static). **Doc drift:** actual gate is explicit opt-in (`sg_consent==='accepted'`), stricter than the documented "first-interaction/30s" model — safer, not a bug. Opt-out checked before init ✓. Decline sets permanent `sg_ph_opt_out=1` ✓. PostHog key is public `phc_` ✓. GA4 `G-PGZBXNF51L` and GTM `GTM-KDDX6XX3` single-sourced & consistent ✓. Cold-load/decline/opt-out network behavior → DEFERRED (browser), but code paths verified.
- **Stage 7 — Security & CSP:** FULLY EXECUTED (static). 3 pages lack CSP (`furniture-erp/index.html` + 2 iframe fragments). No mixed content in served files (only vendor license-text URLs). No exposed secrets (only public `phc_`/`G-`). → BUG-002, BUG-006. (`.well-known/security.txt`, XSS-from-localStorage rendering → spot-checked; deeper XSS sweep DEFERRED.)
- **Stage 8 — Accessibility:** PARTIAL (static). `<html lang="en">` present on all sampled pages ✓ (initial mass-flag was a scripting false-positive, re-verified). One `<h1>` on sampled pages ✓. Focus rings replaced via box-shadow, not removed; `focus-visible` used ✓. Keyboard/contrast/SR testing → DEFERRED (browser). → BUG-005, BUG-007, BUG-008.
- **Stage 9 — CSS & responsive:** PARTIAL. z-index audit executed (→ BUG-003). Breakpoint screenshots, overflow, sticky-CTA occlusion, font-fallback, CLS → DEFERRED (browser).
- **Stage 10 — Tools (35):** PARTIAL (sampled). `markup-vs-margin` has input clamps, negative-value warnings, and a `cost===0` guard; 14/35 use `isFinite`. Full per-tool input fuzzing, division-by-zero, PDF rendering, localStorage schema, iOS blob download → DEFERRED (browser). No confirmed defect; not a clean bill.
- **Stage 11 — Blog (18):** EXECUTED (static). All 18 JSON-LD valid w/ required Article fields; no missing `alt`. Per-post console/reading-indicator → DEFERRED (browser).
- **Stage 12 — Error/degraded:** PARTIAL. `404.html` renders static content (→ BUG-007 for skip link). JS-disabled seed content present on marketing pages. CDN/FormSubmit/Cal.com failure, slow-network → DEFERRED (browser).
- **Stage 13 — Cross-browser:** DEFERRED entirely — no browser engines available in this environment.
- **Stage 14 — Performance:** PARTIAL. jsPDF correctly tool-only ✓; React not on pure-static pages ✓ (→ BUG-013 for privacy/terms). Page-weight/LCP/CLS/image-optimization → DEFERRED (browser/network).

## Tools used
- **Headless browser:** none available — all dynamic stages deferred.
- **Static scans (grep/find/python):** extension counts; jsx/js pairing + mtime; `\.jsx"` in HTML; `from './*.jsx'` in compiled JS; `_config.yml` excludes; vendor/jspdf listing; blog slug↔dir `comm`; tools `data-cat` tally vs chip counts; tool/competitor href resolution; `cal.com` / `mailto` / `formsubmit` recipient scan; `http://` mixed-content; `target=_blank` vs `rel`; unpkg SRI presence; `defer` presence; CSP presence + per-host matrix; GA4/GTM/PostHog key consistency; Clarity references; `<html lang>` / `<h1>` / skip-link; `<img>` without `alt` (PCRE); blog JSON-LD parse (python `json`); `prefers-reduced-motion`; `outline:none`/`focus-visible`; z-index; privacy jsx/js term parity; tool division/`isFinite` sampling.
- **Manual file reads:** `components/BookDemoModal.js`, `components/InviteModal.jsx`, `assets/js/analytics-init.js`, `assets/js/cookie-consent.js`, `tools/markup-vs-margin/index.html`, `tools/exit-readiness-scorecard/index.html`, `post.html` (head), `_config.yml`, blog template.

## Open questions
1. **Is Microsoft Clarity (and Google Ads conversion) configured in GTM container `GTM-KDDX6XX3`?** Determines whether BUG-002 is P1 (blocked on ~70 pages) or P3 (dead CSP entries). Cannot read remote GTM config from the repo.
2. **Does the JSX→JS build, re-run today, produce any diff against committed `.js`?** Resolves BUG-014. Requires running the (excluded) build toolchain.
3. **Intended split between the vanilla `BookDemoModal` and React `InviteModal`** (BUG-011) — which CTAs should route to which, by design?
4. `cal.com` is allowlisted in CSP on 78/79 CSP pages — which single page omits it, and does it host a Book-a-demo CTA? (Low priority; not yet isolated.)

## Re-run instructions
```bash
cd /Users/mukundagarwal/Desktop/SimpleGridUI
# Build parity
for d in components app; do for j in $d/*.jsx; do [ -e "${j%.jsx}.js" ] || echo "MISSING ${j%.jsx}.js"; done; done
grep -rn '\.jsx"' *.html app components            # must be empty
# CTA / email integrity
grep -rhoE "https://(www\.)?cal\.com[^\"' )<]*" . --include='*.html' --include='*.js' --include='*.jsx' | grep -v node_modules | sort | uniq -c
grep -rhoE "(formsubmit\.co/(ajax/)?|mailto:)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+" . --include='*.html' --include='*.js' --include='*.jsx' | grep -v node_modules | sort | uniq -c
# CSP host matrix
for h in unpkg.com cal.com formsubmit.co posthog.com googletagmanager.com google-analytics.com clarity.ms doubleclick; do echo "$h $(grep -rl "$h" . --include='*.html' | grep -v node_modules | wc -l)"; done
# Blog JSON-LD validity
python3 - <<'PY'
import re,json,glob
for f in glob.glob("blog/*/index.html"):
    for b in re.findall(r'<script type="application/ld\+json">(.*?)</script>',open(f).read(),re.S):
        json.loads(b)
print("all blog JSON-LD parse OK")
PY
# z-index layering
grep -rn "z-index" styles.css; grep -n "z-index" assets/js/cookie-consent.js
```

## End of report
*Dynamic verification (Stages 4 runtime, 6 network, 9 visual, 10 PDF/iOS, 13 cross-browser, 14 weight/LCP) remains outstanding and should be run with Playwright + a real iOS Safari device before treating this audit as complete.*
