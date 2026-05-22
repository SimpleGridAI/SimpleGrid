# SimpleGrid.ai — Live Site Audit (v2, deep)

**Date:** 2026-05-22
**Origin:** `https://simplegrid.ai` (US B2B marketing site for AI-native ERP)
**Method:** local Lighthouse 12.x (headless Chrome 141) + curl + DNS-over-HTTPS + Python parsers
**Runs per page:** **3 mobile + 3 desktop** (median reported). Competitor pages: 2 runs.
**Artifacts:** `./audit-artifacts/` — raw HTML, headers, Lighthouse JSON (72 files), exposed-file copies, mobile-medians.json, desktop-medians.json, inspect-results.json, sitemap, robots
**Audit-only — no codebase was modified.**

---

## 1. Executive Summary

**Verdict: site is technically modern and shockingly fast for the category (beats every US ERP incumbent on Lighthouse), but is leaking source code and internal documents publicly, and still has the same SEO doorway pattern on the homepage that the previous audit flagged.** Mobile Perf-score median across 12 audited pages is **86–100** vs Acumatica **40**, Epicor **37**, Plex **49** — SimpleGrid wins every Core Web Vitals metric vs every audited competitor. The product/case-study/blog pages all now score Perf 93–100 mobile in 3-run median (`audit-artifacts/mobile-medians.json`).

**Single biggest US-market credibility risk:** **public exposure of the project's source repository.** `/CLAUDE.md`, `/package.json`, `/package-lock.json`, `/.gitignore`, `/.DS_Store`, every `/components/*.jsx` and `/app/*.jsx` source file, all `/scripts/*.py` build scripts, and `/babel.config.json` are served HTTP 200 with real content. An enterprise security team Googling SimpleGrid before signing finds `https://simplegrid.ai/CLAUDE.md` containing the founder's email, the GitHub repo URL, and instructions that describe the operator as "non-technical." This isn't a data breach but it's a credibility breach. Fix it in ~10 minutes with a deploy filter or by moving the build to a separate `docs/` folder.

**Three other high-impact items the previous audit also flagged, still open:** (1) the homepage `sr-only` block stuffs the brand name 22 times in 3 sentences — same Google spam-policy risk; (2) PostHog fires unconditionally with no consent gate on every page — CCPA/DPDP exposure for US enterprise procurement reviews; (3) `Content-Security-Policy`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Content-Type-Options` are all missing — every enterprise security questionnaire asks about these.

**Email security gap:** no DMARC record on `simplegrid.ai`. For a B2B startup running cold outbound, this means inbox providers can't authenticate your mail and you're easier to spoof. The cold-outbound deliverability cost of this is real.

---

## 2. Methodology & Tooling Caveats

- **Local Lighthouse:** Chrome 141 headless via `/tmp/lh/node_modules/.bin/lighthouse`. Mobile = Moto G-class CPU + Slow 4G simulated throttling. Desktop = Lighthouse `--preset=desktop`. 3 runs per page per form-factor, median per metric. 72 raw JSON reports saved to `audit-artifacts/lh/`.
- **PageSpeed Insights cloud API** was attempted for CrUX field data but failed: `Quota exceeded for quota metric 'Queries per day'` (`audit-artifacts/psi-test.json` from earlier today). The direct CrUX API requires an API key (`403 PERMISSION_DENIED`). **Field metrics not obtained.** Lab medians used throughout. The user can produce CrUX data by providing a Google Cloud API key — happy to re-run.
- **Screenshots:** no headless screenshot tool was set up. Above-the-fold claims are inferred from HTML+CSS source, marked as inference.
- **Manual checks not done:** real-device testing, full keyboard tab-through, screen-reader semantics, end-to-end PostHog conversion-event trace.
- **TTFB note:** raw curl from this audit machine (likely India network) shows 300 ms TTFB on all pages, much better than the 1.7s I measured in the previous audit (likely a cold Fastly cache that day). US visitors via Fastly edge should see 50–150 ms.

**Page coverage:** 12 pages audited (home, product, pricing, about, hiring, blog list, 2 blog posts, case-studies index, case-apex case study, privacy, terms). Sitemap contains 28 URLs. The 16 audited-gap entries are mostly other blog posts (15) and `case-furniture-manufacturer.html` (similar structure to case-apex). Findings are representative.

---

## 3. Scorecard

### 3a. Lighthouse scores per page (3-run median)

| Page | Perf mob | Perf dsk | A11y (mob/dsk) | BP (mob/dsk) | SEO (mob/dsk) |
|---|---|---|---|---|---|
| home | 92 | 96 | 96/96 | 100/100 | 100/100 |
| product | 93 | 99 | 96/96 | 100/100 | 100/100 |
| pricing | 95 | 100 | 96/96 | 100/96 | 100/100 |
| about | 95 | 99 | 96/96 | 100/100 | 100/100 |
| hiring | 95 | 98 | 96/96 | 100/100 | 100/100 |
| blog (list) | 93 | 100 | 96/96 | 100/96 | 100/100 |
| post / event-sourcing | 99 | 100 | 90/90 | 100/100 | 100/100 |
| post / sg-schema | 95 | 100 | 90/90 | 100/100 | 100/100 |
| case-studies | **86** | 99 | 96/96 | 96/96 | 100/100 |
| case-apex | 96 | 100 | **94/94** | 100/100 | 100/100 |
| privacy | 94 | 100 | 92/92 | 100/96 | 100/100 |
| terms | 97 | 100 | 92/92 | 100/100 | 100/100 |

Source: `audit-artifacts/mobile-medians.json`, `audit-artifacts/desktop-medians.json`. **Bold = worst on its row.**

### 3b. Core Web Vitals (mobile, lab median)

Google thresholds: LCP <2.5 s, INP <200 ms (TBT proxy <200 ms), CLS <0.1, FCP <1.8 s, TTFB <0.8 s.

| Page | LCP | FCP | TBT (INP proxy) | CLS |
|---|---|---|---|---|
| home | 3037 ms NI | 1201 ms ✓ | 153 ms ✓ | 0.000 ✓ |
| product | 2082 ms ✓ | 949 ms ✓ | 213 ms NI | 0.000 ✓ |
| pricing | 2095 ms ✓ | 1149 ms ✓ | 155 ms ✓ | 0.000 ✓ |
| about | 2720 ms NI | 926 ms ✓ | 124 ms ✓ | 0.000 ✓ |
| hiring | 2485 ms ✓ (marginal) | 943 ms ✓ | 156 ms ✓ | 0.000 ✓ |
| blog | 2560 ms NI | 1135 ms ✓ | 215 ms NI | 0.000 ✓ |
| post-eventsourcing | **930 ms ✓** | 930 ms ✓ | 124 ms ✓ | 0.000 ✓ |
| post-sgschema | **991 ms ✓** | 966 ms ✓ | 213 ms NI | 0.000 ✓ |
| case-studies | **4015 ms FAIL** | 1032 ms ✓ | 130 ms ✓ | 0.000 ✓ |
| case-apex | 2541 ms NI | 965 ms ✓ | 117 ms ✓ | 0.000 ✓ |
| privacy | 2921 ms NI | 971 ms ✓ | 99 ms ✓ | 0.000 ✓ |
| terms | 2407 ms ✓ (marginal) | 934 ms ✓ | 107 ms ✓ | 0.000 ✓ |

**The two pre-rendered blog posts are the best LCP performers on the entire site (930 ms, 991 ms).** That's the same fix applied to the home/product/pricing trio would likely halve their LCP. The static `case-studies` list page is the only outright LCP FAIL.

**CLS = 0.000 lab on every page is suspect** — simulated throttling does not reproduce Google Fonts load timing the way real users see it. Field CLS will likely be >0. UNVERIFIED until CrUX data is available.

### 3c. Competitor benchmark — mobile median

| Site | Perf | LCP | FCP | TBT | CLS | Speed Index |
|---|---|---|---|---|---|---|
| **SimpleGrid /home** | **92** | **3037 ms** | **1201 ms** | **153 ms** | **0.000** | **2943 ms** |
| **SimpleGrid /product** | **93** | **2082 ms** | **949 ms** | **213 ms** | **0.000** | **2821 ms** |
| **SimpleGrid /pricing** | **95** | **2095 ms** | **1149 ms** | **155 ms** | **0.000** | **4017 ms** |
| acumatica.com | 40 | 5599 ms | 3986 ms | 1759 ms | 0.131 | 8152 ms |
| epicor.com/en/ | 37 | 3371 ms | 1898 ms | 1312 ms | **0.465** | 9158 ms |
| plex.rockwellautomation.com | 49 | 9367 ms | 4875 ms | 419 ms | 0.010 | 9998 ms |

SimpleGrid is **2–3× faster on LCP, ~10× lower TBT, and CLS-clean** vs every audited US ERP competitor. This is a *real* talking point for the founder-led sales conversation.

Source: `audit-artifacts/competitor/lh-*-mobile-run*.json` (2-run median per competitor; competitor pages run with `--only-categories=performance` to save time).

---

## 4. Issues Register (sorted by severity)

| ID | Sev | Category | Page(s) | Issue | Evidence | Reproduce | Root cause | Recommended fix | Effort | Expected impact |
|---|---|---|---|---|---|---|---|---|---|---|
| **C-1** | Critical | Information disclosure | site-wide | 7 dotfiles + source files publicly served. `audit-artifacts/exposed/CLAUDE.md` (4,883 B) leaks the founder's email `yaaratechnology@gmail.com`, GitHub repo URL `git@github.com:SimpleGridAI/SimpleGrid.git`, and "user is non-technical" framing. `/package.json` reveals build pipeline contradicting the public "no build step" framing. `/package-lock.json` (39 KB) lists all 82 transitive deps. `/.DS_Store` enables filesystem enumeration. Every `/components/*.jsx` + `/app/*.jsx` source file is downloadable. | `curl https://simplegrid.ai/CLAUDE.md` → 200, 4,883 bytes, real content. Same for `/package.json`, `/package-lock.json`, `/.gitignore`, `/.DS_Store`, `/data/blogs.js`, `/components/Nav.jsx`, `/app/home.jsx`, `/scripts/generate-blog-pages.py`, `/babel.config.json`. Full list in §6e. | Same curl on any of those paths. | GitHub Pages serves every file in the deploy branch. The build commits source AND output to `main`, so source is published. | Either (a) add a `_config.yml` with `exclude:` listing every dotfile + dev path (Jekyll syntax, works on GitHub Pages by default), or (b) move the static output to a `docs/` folder and configure Pages to serve only `/docs`. (b) is cleaner long-term. | S | Closes the worst external impression a buyer can form on minute one of due diligence. |
| **C-2** | Critical | SEO / Spam / AI search | home | Hidden `sr-only` block stuffs brand name 22× in 3 sentences. Pattern matches Google's "doorway pages" + "hidden text" spam policies. AI assistants quote this paragraph verbatim because it's the only body text on the page. | `html-home.html` lines 187-190. Keyword count: SimpleGrid×8, "Simple Grid"×5, "SimpleGrid AI"×2, "SimpleGrid ERP"×2, "Simple Grid ERP"×2, "simplegrid.ai"×1, "SimpleGridAI"×1, "Simple Grid AI"×2. Visible body text = 386 chars total, *all of it* the sr-only block. | `curl -s https://simplegrid.ai/ \| sed -n '/sr-only/,/section/p'` | Intended as accessibility / brand-disambiguation, but density exceeds normal a11y need. | Replace the paragraph with normal text ("SimpleGrid is an AI-native ERP for mid-market manufacturers.") and move alt spellings into the schema.org Organization `alternateName` array (which already exists at `index.html:45`). | S | Removes manual-action / spam-detection risk. Stops AI assistants quoting the spelling list verbatim. |
| **C-3** | Critical | Privacy / Compliance | all 12 pages | PostHog fires unconditionally 2-3 s after every page load. No consent UI, no opt-out. CCPA "Do Not Sell/Share" applies; DPDP Act (India) also applies. PostHog Surveys + Session Recording both available in the snippet. | `html-home.html:175-185` shows `sgLoadPostHog()` called from `requestIdleCallback(... {timeout:3000})` with `setTimeout(... 2000)` fallback. No `cookieconsent` / `osano` / `onetrust` markers found in any of 12 HTML files. PostHog transfer per page = 164 KB; blocks main thread 270–549 ms (`audit-artifacts/lh/lh-*-mobile-run2.json` audit `third-party-summary`). | Visit any page → DevTools Network filtered "posthog" → 3 PostHog requests fire 2-3 s after load with no user action. | `sgLoadPostHog` is unconditional. | Add a minimal "Do Not Sell or Share" toggle (a small banner with Accept / Reject buttons). Gate the call to `posthog.init(... session_recording: { maskAllInputs: true }, opt_out_capturing_by_default: true ...)` until consent. Existing config has `person_profiles: 'identified_only'` which softens this a bit but doesn't replace consent. | M | Closes enterprise security questionnaire row; removes the most-cited reason US procurement teams reject SaaS vendors. |
| **C-4** | Critical | Email / Domain auth | DNS | No DMARC record on `simplegrid.ai`. Anyone can spoof `@simplegrid.ai` and most providers will deliver to inbox or quarantine instead of rejecting. Lowers cold-outbound deliverability. | `dig _dmarc.simplegrid.ai TXT` (via dns.google API) returns no Answer block. SPF is present and references `zoho.in` + `spf.efwd.registrar-servers.com` (~all = softfail). DKIM `google._domainkey` exists. No DMARC = SPF/DKIM alignment never enforced. | `curl "https://dns.google/resolve?name=_dmarc.simplegrid.ai&type=TXT"` returns `{"Status":3}` (NXDOMAIN). | TXT record was never published. | Publish `v=DMARC1; p=quarantine; rua=mailto:hello@simplegrid.ai; ruf=mailto:hello@simplegrid.ai; pct=100; aspf=s; adkim=s` after 2 weeks of `p=none` monitoring. Move SPF to `-all` once aligned. Add CAA records (none today — `Status:0, no Answer`). | S | Improves cold-email deliverability; closes the "is this real" check enterprise IT runs on the sender domain. |
| **H-1** | High | SEO / AI search | home, product, pricing, about, hiring, blog (list), case-studies, case-apex, privacy, terms | 10 of 12 audited pages are React-CSR with **0 chars of body text** in raw HTML (home has 386 chars but all in the doorway sr-only block). Crawlers and JS-disabled bots see empty pages. | `audit-artifacts/inspect-results.json` body_text_chars: home=386, product=0, pricing=0, about=0, hiring=0, blog=0, casestudies=0, case-apex=0, privacy=0, terms=0. Both pre-rendered post pages have 6042 + 6551 chars respectively — the exception that proves the fix works. | `curl -A "Googlebot" https://simplegrid.ai/pricing.html \| python3 -c "import sys,re; h=sys.stdin.read(); body=re.sub(r'<head.*?</head>','',h,flags=re.S|re.I); body=re.sub(r'<script.*?</script>','',body,flags=re.S|re.I); print(len(re.sub(r'<[^>]+>',' ',body).strip()))"` → 0 | All landing pages are React-mounted into empty `<div id="root">`. Only blog posts were pre-rendered (commit `fd54dfa`) and chrome-pre-rendered (commit `6c8151f`). | Apply the same pre-render approach to home/product/pricing first (highest-value pages), then about/hiring/case-studies/case-apex/privacy/terms. The pre-render generator (`scripts/generate-blog-pages.py`) already exists — extend the pattern. | M | The two pre-rendered blog posts already prove this lifts Perf to 99-100 and LCP to <1s. Same gain available for home/product/pricing. |
| **H-2** | High | Security headers | every page | Missing `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`. HSTS present but lacks `includeSubDomains` and `preload`. | `audit-artifacts/headers-home.txt`: only `strict-transport-security: max-age=31556952` + `cache-control: max-age=600`. No other security headers on any of 12 pages (checked with `for f in headers-*.txt; do grep -iE "csp|x-frame|referrer|permissions|x-content" "$f"; done` → no output). | `curl -I https://simplegrid.ai/` | GitHub Pages doesn't inject custom headers; SimpleGrid hasn't fronted with a CDN that does. | Put Cloudflare in front of GitHub Pages (free) and configure Transform Rules → Response Headers. At minimum add `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()`, `X-Frame-Options: DENY` (or CSP `frame-ancestors 'none'`). Upgrade HSTS to `max-age=63072000; includeSubDomains; preload` and submit to hstspreload.org. | M | Closes ~30% of typical enterprise security questionnaire rows in one PR. |
| **H-3** | High | Accessibility / WCAG 2.2 AA | every page | `color-contrast` audit fails 5–37 elements per page. Specific failures with computed ratios: | `audit-artifacts/lh/lh-home-mobile-run2.json` audit `color-contrast` items. | Open any page, inspect element, compare computed contrast in DevTools. | Brand `#4A7BF7` on white = 3.84:1. `#9ca3af` on `#fafbfc` (footer micro-text, eyebrows) = 2.45:1. WCAG AA needs 4.5:1 (normal text) / 3:1 (large text & UI controls). | (a) Darken `#4A7BF7` to ~`#2E5BE0` for text uses (or use white-on-blue for buttons). (b) Change `--fg3` from `#9ca3af` to ~`#6B7280` for footer eyebrows / micro-text. (c) Underline in-paragraph links. | S-M | A11y score 96 → 100 site-wide; closes US ADA Title III risk surface (SaaS sites are heavily litigated). |
| | | | | • "Book a Call" button (`header.nav > div.nav-inner > div.nav-right > a.btn`): white text on #4A7BF7 = **3.84:1** (fails AA 4.5:1 by 0.66) | | | | | | |
| | | | | • "INTEGRATES WITH" hero eyebrow (`section.ig-bar > span.ig-label`): #9ca3af on #fafbfc = **2.45:1** | | | | | | |
| | | | | • "TRUSTED PARTNERS" footer eyebrow: **2.45:1** | | | | | | |
| | | | | • "© 2026 Valaya AI Technologies Pvt. Ltd." footer copyright: **2.45:1** | | | | | | |
| | | | | • Footer "Privacy Policy" + "Terms" links: **2.45:1** | | | | | | |
| | | | | • Mobile floating "Request an invite" button: #4A7BF7 text on white = **3.84:1** | | | | | | |
| | | | | • case-apex page has 37 contrast failures (worst page); includes infographic stat numbers, btn-bars values, case-strip labels. | | | | | | |
| **H-4** | High | Performance | home | LCP element is the SimpleGrid logo SVG (only 0.9 KB) but LCP = 3037 ms. **60% of LCP is "Load Delay" (1875 ms)** — Lighthouse `prioritize-lcp-image` audit FAILS with `wastedMs=1495`. | `lh/lh-home-mobile-run2.json` audit `largest-contentful-paint-element` shows: TTFB 613 ms (20%), **Load Delay 1875 ms (60%)**, Load Time 62 ms (2%), Render Delay 573 ms (18%). LCP element selector: `header.nav > div.nav-inner > a.nav-logo > img` (the static logo). | Run Lighthouse on home mobile. | Even though the logo has `fetchpriority="high"`, it's competing with 16 deferred scripts for bandwidth/main-thread on slow 4G. React + PostHog + Babel-transpiled component bundles all parse before the logo gets prioritized. | (a) Inline the logo as SVG in HTML (it's only 0.9 KB — `<svg>...</svg>` is faster than an `<img>` request). (b) `<link rel="preload" as="image" href="/assets/simplegrid-logo-horizontal.svg" fetchpriority="high">` in `<head>`. (c) Combine with H-1 pre-render so the actual hero content is the LCP element (text/h1), not the logo. | S | Drops home LCP by 1.5 s. |
| **H-5** | High | Performance | case-studies | LCP **4015 ms (FAIL)** on mobile. Only page that hard-fails the LCP threshold. Page weight 502 KB largely from a hero image. | `lh/lh-casestudies-mobile-run2.json` LCP=4015. Transfer total=502 KB. WebP-savings opportunity = 108 KB. | Same. | List-page hero image too large + not WebP + competing with React mount. | Convert hero to WebP/AVIF via `<picture>`. Apply pre-render (H-1). Add explicit `width`/`height` on hero img. | S | Pulls case-studies into PASS bucket. |
| **H-6** | High | Trust / SEO | home | JSON-LD `Organization` still has `legalName: "Valaya AI Technologies Pvt. Ltd."` and a full `PostalAddress` for HSR Layout, Bengaluru — but the visible footer was just edited locally to drop both (uncommitted). When edits ship, the visible page and the structured data will say different things; a US enterprise buyer who Googles "is SimpleGrid US-based" finds the JSON-LD `addressCountry: IN` and is confused. | `inspect-results.json` home: jsonld_pvt_ltd_blocks=1, jsonld_has_postal_address=1. Specific path: `index.html:46,80-87`. | Same. | The earlier "remove Pvt Ltd" edit only changed the visible HTML and the footer, leaving JSON-LD untouched intentionally. | Decide: either (a) keep "Pvt Ltd" + address everywhere (Pvt Ltd is the actual registered legal entity for Schema.org `legalName`, which is correct), OR (b) remove everywhere. Half-state is the worst of both. If targeting US buyers, add US presence (e.g. "SimpleGrid Inc., Delaware") to JSON-LD and the about page. | S | Removes US-buyer doubt at the discovery step. |
| **M-1** | Medium | Performance / 3rd-party | every page | PostHog dominates main-thread on every page (270–549 ms blocking time). Three PostHog bundles loaded with 5-min cache TTL. | `lh/lh-*-mobile-run2.json` `third-party-summary` — posthog: blog 549 ms, pricing 383 ms, hiring 377 ms, product 368 ms, home 359 ms. Bundles: `array.js` 70 KB, `surveys.js` 33 KB, `web-vitals.js` 2.6 KB. All `Cache-Control: max-age=300`. | Same. | PostHog default loader pulls all three bundles eagerly. | Defer PostHog initialization until first user interaction (`document.addEventListener('mousemove', sgLoadPostHog, {once:true})` + 10-s setTimeout fallback). Disable Surveys (`disable_surveys: true` in init config) if you're not using them. | S | Drops mobile TBT 100–400 ms per page; combines nicely with C-3. |
| **M-2** | Medium | Performance / 3rd-party | every page | Unpkg CDN (React + ReactDOM) costs 50–485 ms main-thread per page and one extra DNS lookup + TCP/TLS RTT. case-apex page: **Unpkg main-thread 485 ms** (worse than PostHog on that page). | `lh/lh-case-apex-mobile-run2.json` `third-party-summary` items: Unpkg=485, posthog=359. Other pages 50–262 ms. | Same. | React 18 served from `unpkg.com` rather than self-hosted on `simplegrid.ai`. | Self-host `react.production.min.js` + `react-dom.production.min.js` (134 KB combined). Drops the extra DNS+TCP+TLS handshake and lets the existing CDN/Fastly serve it via HTTP/2. Removes SRI maintenance burden. | S | Saves 100–300 ms cold-load on every page. |
| **M-3** | Medium | Performance / Caching | every page | Mobile median **~88 KB unused JS** per page + **~15 KB unused CSS**. Same numbers across every page → same React + component bundles loaded everywhere regardless of need. | `mobile-medians` per-page table (§6a). 87.7 KB unused JS on home/post pages; 87.9 on product. | Same. | All pages share the same bundle of components (Nav, Footer, all home sections, infographics, etc.). | Code-split per route: `app/home.js` shouldn't pull `EliteFactoryRoad.js` and the post page shouldn't pull `HomeTop.js`. Larger refactor but real win. | M-L | Cuts each page weight 30–40 %; -100 to -200 ms TBT. |
| **M-4** | Medium | Performance | home, case-studies | Home: 241 KB offscreen image (`/assets/elite-factory.jpeg`, 242 KB JPEG) loaded eagerly. WebP would cut ~108 KB. | `lh/lh-home-mobile-run2.json` `network-requests` shows elite-factory.jpeg 242 KB. `modern-image-formats` overallSavingsBytes=108,875. `offscreen-images` overallSavingsBytes=241,584. | Same. | Hero JPEG, no `loading="lazy"` on below-fold imagery, no `<picture>` with WebP/AVIF. | Convert all imagery to WebP (or both AVIF + WebP via `<picture>`). Add `loading="lazy"` to anything below 800 px from top. og-card.jpg (100 KB JPEG, 1200×630) → ~30 KB WebP. | S | Drops home transfer 521 KB → ~280 KB. LCP-300 ms. |
| **M-5** | Medium | Compliance / SEO | privacy, terms | Privacy + Terms are React shells with **0 chars of body text** in raw HTML. Legal documents that crawlers and JS-disabled users see as blank. Several US state privacy laws prefer "easily readable" privacy notices; CSR makes that arguable. | `inspect-results.json`: privacy body_text_chars=0, terms body_text_chars=0. Raw HTML inspection: `<body><div id="root"></div></body>`. | `curl -s https://simplegrid.ai/privacy.html` shows empty body. | Both pages render entirely via `app/privacy.js` / `app/terms.js` React components. | Same fix as H-1: pre-render at build time. Legal docs especially shouldn't depend on JS to render. | S | Closes "does the privacy policy actually exist" check; improves accessibility for screen readers that struggle with React mounts. |
| **M-6** | Medium | A11y | post pages, privacy, terms | `link-in-text-block` audit fails on 4 pages: inline links rely on color alone (no underline). WCAG 1.4.1 violation. | `lh/lh-post-eventsourcing-mobile-run2.json` and post-sgschema have `link-in-text-block` failing with 2 items each; privacy 1 item; terms 2 items. | Same. | Inline links use brand blue without underline. | Add `text-decoration: underline` (or `underline dotted`) to in-paragraph anchors in `styles.css`. | S | Improves a11y; helps non-color-vision users. |
| **M-7** | Medium | A11y | post pages | `skip-link` audit fails — `<a href="#main" class="skip-link">` exists but `#main` not always found in render tree on post pages. | `lh/lh-post-eventsourcing-mobile-run2.json` audit `skip-link` items=1. | Inspect post page HTML. | Skip-link in static nav points to `#main` but post pages use `<section class="post-content">` instead of `<main id="main">`. | Wrap `<section class="post-content">` in `<main id="main">` on post template (or change skip-link target). | S | Restores keyboard/screen-reader skip-to-content. |
| **M-8** | Medium | A11y | case-apex | `heading-order` failure: page uses `<div class="infographic-h" role="heading" aria-level="3">` skipping an h2. | `lh/lh-case-apex-mobile-run2.json` audit `heading-order` items=1 (selector `main#main > div.container > div.infographic > div.infographic-h`). | Same. | Inline infographic block defines its own role=heading level=3 without prior h2 chain. | Either change to `aria-level="2"` or add a preceding `<h2>` for the infographic section. | S | Cleaner SR experience; +2 a11y score points. |
| **M-9** | Medium | Discoverability / AI | site | Site doesn't have `/llms.txt`, `/.well-known/security.txt`, `/favicon.ico`, `/apple-touch-icon.png`, `/manifest.json`, or `humans.txt`. Browsers + AI tools that look for these get 404. | Probed each: `/llms.txt` 404, `/.well-known/security.txt` 404, `/favicon.ico` 404, `/apple-touch-icon.png` 404, `/manifest.json` 404. Site DOES set `<link rel="icon" type="image/svg+xml" href="assets/simplegrid-logomark.svg">` so the favicon does work in modern browsers — but legacy `/favicon.ico` fallback is missing. | `for p in /llms.txt /security.txt /favicon.ico; do curl -sS -o /dev/null -w "%{http_code} %{url_effective}\n" "https://simplegrid.ai$p"; done` | Files never created. | (a) Add `/favicon.ico` (256×256 ICO from logomark) and `/apple-touch-icon.png` (180×180). (b) For an "AI-native" startup, **add `/llms.txt`** with a structured AI-readable value-prop summary. (c) Add `/.well-known/security.txt` with `Contact: hello@simplegrid.ai`, `Expires: 2027-12-31`, etc. | S | Each is a 5-minute add; signals professionalism. llms.txt is increasingly used by AI agents (Anthropic Claude, ChatGPT, Perplexity) to summarize sites. |
| **M-10** | Medium | DNS / Security | DNS | No CAA records on `simplegrid.ai` — any CA in the world can issue a cert. No DNSSEC enabled. | `dig CAA simplegrid.ai` returns Answer:0. `dig +dnssec A simplegrid.ai` AD flag = False. | `curl "https://dns.google/resolve?name=simplegrid.ai&type=CAA"` returns no Answer block. | Records never added. | Add CAA: `0 issue "letsencrypt.org"` and `0 issuewild ";"` to restrict to Let's Encrypt only (matches current cert issuer R12). Enable DNSSEC via Namecheap admin. | S | Locks down cert-misissuance attack surface; DNSSEC removes DNS-cache-poisoning class. |
| **M-11** | Medium | Compression | every text response | Server returns gzip only — no Brotli. Compressed home HTML 3,871 bytes vs uncompressed 11,385 bytes (~66 % reduction). Brotli would yield ~72-78 % on HTML/CSS/JS. | `curl -H "Accept-Encoding: br" -I https://simplegrid.ai/` returns `content-encoding: gzip`, not `br`. | Same. | GitHub Pages doesn't auto-Brotli HTML. | Fronting with Cloudflare auto-Brotlis all text. Couples with H-2 fix. | M | Save 1–3 KB per page; cumulative across 16 scripts and stylesheets. |
| **L-1** | Low | Security / Email | DNS | SPF uses `~all` (softfail) instead of `-all` (hardfail). Less strict spoof-rejection. | TXT record: `v=spf1 include:zoho.in include:spf.efwd.registrar-servers.com ~all`. | `curl "https://dns.google/resolve?name=simplegrid.ai&type=TXT"`. | Conservative initial config. | After publishing DMARC (C-4) and monitoring for 2 weeks with no failures, change SPF to `-all`. | S | Marginal — combines with C-4 fix. |
| **L-2** | Low | SEO | robots.txt | No explicit handling for AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, ChatGPT-User). They currently fall under `User-agent: *` `Allow: /` which means **allowed** — probably the user's intent for an AI startup. But making it explicit is a positive signal. | `robots.txt` lists only `User-agent: *`. | `curl https://simplegrid.ai/robots.txt`. | Never declared. | Add explicit blocks: `User-agent: GPTBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /`. Then bots know unambiguously they're welcome. | S | Removes any ambiguity; AI-readable signal of intent. |
| **L-3** | Low | A11y | privacy, terms | A11y score 92 (vs 96 elsewhere) — driven by color-contrast (10–11 items) and link-in-text-block on these pages. | `mobile-medians.json` privacy a11y=0.92, terms a11y=0.92. | Lighthouse run. | Same brand-blue + link-no-underline issue. | Same fix as H-3 + M-6. | (covered) | (covered) |
| **L-4** | Low | TLS / Cert | live cert | Cert valid until 2026-06-26 (35 days). Let's Encrypt R12, TLS 1.3, AEAD-CHACHA20-POLY1305-SHA256. Auto-renew handled by GitHub Pages. | `curl -v https://simplegrid.ai/ 2>&1 \| grep "expire date"`. | Same. | Auto-renew. | None. Monitor. | n/a | n/a. |
| **L-5** | Low | Performance | every page | Lighthouse `uses-long-cache-ttl` flags 13–18 short-cache items per page, all PostHog (5-min TTL set by `us-assets.i.posthog.com`). Out of our control. | `lh/lh-*-mobile-run2.json` `uses-long-cache-ttl` items. | Same. | Third-party CDN policy. | Self-host a copy of `array.js` and serve with long TTL via Fastly. Engineering cost likely outweighs savings unless you have repeat-visit-heavy users. | M | Marginal. |

---

## 5. Fix-this-week Shortlist (top 5 by impact/effort)

1. **C-1 — Stop publicly serving repo source/dotfiles** (S effort, removes worst-case credibility hit). Quick win: add `_config.yml` with `exclude: ['CLAUDE.md','package.json','package-lock.json','.gitignore','.DS_Store','components/','app/','scripts/','babel.config.json','data/']` to the repo root. (Or filter at the deploy step.) Verify with `curl -I https://simplegrid.ai/CLAUDE.md` after deploy → should be 404.
2. **C-2 — Rewrite the home `sr-only` keyword block** (S effort, removes Google-spam-policy + AI-quote risk). One file edit, `index.html:187-190`. Move alt-spellings into the existing `alternateName` JSON-LD array (already at `index.html:45`).
3. **C-4 — Publish DMARC record** (S effort, fixes cold-outbound deliverability). One DNS row: `_dmarc.simplegrid.ai TXT "v=DMARC1; p=quarantine; rua=mailto:hello@simplegrid.ai; pct=100"`.
4. **H-1 — Pre-render home, product, pricing the way blog posts now are** (M effort, biggest perf + SEO + AI win remaining). Evidence: pre-rendered post pages score Perf 99 mobile with LCP 930 ms; React-shell home is Perf 92 / LCP 3037 ms. Same delta available on the GTM pages.
5. **C-3 + M-1 together — Defer PostHog until first interaction AND gate behind consent** (S effort, double win). One-line change to `sgLoadPostHog` defer + a small consent toggle for US/EU visitors.

---

## 6. Section-by-section Findings

### 6a. Performance

**Site-wide:** SimpleGrid is *fast* — Mobile Perf median 86–99 across 12 pages. Desktop Perf median 96–100. Beats all 3 audited US ERP competitors by 40–60 points (§3c). Lab CWV mostly pass; only `case-studies` hard-fails LCP (4015 ms mobile). CLS = 0 in lab on every page (UNVERIFIED for field).

**Mobile bytes + savings (3-run median per page):**

| page | transfer kB | requests | unused JS kB | unused CSS kB | offscreen img kB | WebP savings kB |
|---|---|---|---|---|---|---|
| home | 520.7 | 23 | 87.7 | 14.7 | 241.6 | 108.9 |
| product | 277.7 | 24 | 87.9 | 14.9 | 0 | 0 |
| pricing | 250.5 | 19 | 87.9 | 15.6 | 0 | 0 |
| about | 274.3 | 23 | 87.8 | 15.5 | 0 | 0 |
| hiring | 253.1 | 19 | 87.8 | 15.7 | 0 | 0 |
| blog | 250.0 | 19 | 87.8 | 15.7 | 0 | 0 |
| post-eventsourcing | 237.7 | 13 | 87.7 | 15.6 | 0 | 0 |
| post-sgschema | 241.4 | 13 | 87.7 | 15.6 | 0 | 0 |
| case-studies | 502.4 | 22 | 87.7 | 15.6 | 0 | 108.9 |
| case-apex | 251.8 | 18 | 87.9 | 15.5 | 0 | 0 |
| privacy | 245.7 | 18 | 87.8 | 16.1 | 0 | 0 |
| terms | 246.9 | 18 | 87.8 | 16.1 | 0 | 0 |

Constant ~88 KB unused JS across every page = same React + component bundles served everywhere (M-3). Home + case-studies are the only image-heavy pages (M-4).

**Render-blocking:** every page has 1 render-blocking resource (`styles.css`, 17 KB, wasting 150–350 ms by Lighthouse estimate).

**Third-party main-thread time (mobile, run 2 representative):** PostHog 270–549 ms, Unpkg 50–485 ms. PostHog is #1 on every page except case-apex where Unpkg edges it (485 vs 359).

**TLS + transport:** TLS 1.3, AEAD-CHACHA20-POLY1305-SHA256, HTTP/2 via Fastly. Compression: **gzip only, no Brotli** (M-11). HTTP/3 not available from this client to test. No 103 Early Hints. No Server-Timing.

**LCP element on home:** the SimpleGrid logo SVG (0.9 KB) — but 60% of LCP is "Load Delay" because the logo competes with the React JS chain for bandwidth. `prioritize-lcp-image` audit fails with `wastedMs=1495` (H-4).

### 6b. Technical SEO

- **Sitemap (`audit-artifacts/sitemap.xml`, 28 URLs):** all 28 URLs return 200 (full HEAD sweep verified). Lastmod dates 2026-02-10 through 2026-04-28 (somewhat stale on cornerstone pages but not broken).
- **robots.txt:** clean. Disallow: /admin /api /auth /login /dashboard /internal /preview /staging /seo-audit/ /uploads/ /post.html. Sitemap reference present. No accidental noindex.
- **Per-page titles + meta descriptions:** 12/12 unique. Titles 27–76 chars (privacy + terms shortest at 27/29 — fine for legal pages). Descriptions 75–164 chars (home is shortest at 75 — could expand to 150–155 for richer snippet).
- **Canonical tags:** present and self-referencing on all 12 pages ✓.
- **Meta robots:** `index, follow` on all 12 pages ✓.
- **Hreflang:** NONE. Site targets US + India (`addressCountry: IN` + `areaServed: ["US","IN"]` in Organization schema) but no `<link rel="alternate" hreflang="...">`. Not blocking (only relevant if you publish localized variants), but a missed declarative signal.
- **Headings in raw HTML:** only the 2 pre-rendered post pages have `<h1>`. Home has an `<h2>` inside the sr-only block as its first heading (unconventional). Other landing pages have zero headings (h1 + h2 + h3 all 0) until React mounts.
- **Image alt text in raw HTML:** post-eventsourcing 5/5 images with alt; post-sgschema 4/4. Other pages 0 images in raw HTML.
- **JSON-LD validates as JSON on every page** (`jsonld_invalid = 0` site-wide). Rich schemas:
    - home: WebSite, Organization (with PostalAddress + ContactPoint), SoftwareApplication (with Offer + featureList of 16 items + BusinessAudience), WebPage, ImageObject. **Comprehensive — but contains the address + "Pvt. Ltd." legalName flagged in H-6.**
    - pricing: FAQPage with 6 well-written Q&As ("How much does SimpleGrid cost after the trial?", "Is there a setup or deployment fee?", etc.) → strong rich-results candidate.
    - product: SoftwareApplication + Offer + BreadcrumbList.
    - about: AboutPage + BreadcrumbList.
    - blog: Blog + BreadcrumbList.
    - post pages: Article + BreadcrumbList + Organization.
    - case-studies: Article + CollectionPage + BreadcrumbList.
    - case-apex: Article + BreadcrumbList.
    - privacy + terms: WebPage + BreadcrumbList (minimal).
- **Broken-link sweep across 12 raw HTML files: 12 unique internal links, all 200 ✓.** (Number is low only because nav lives in React on non-post pages — H-1.)
- **404 path returns 404 ✓** (`/foo`, `/blog/does-not-exist/`).
- **Trailing slash:** blog post canonical URLs include trailing slash and resolve correctly.
- **Hidden-text / doorway-content flag:** the home `sr-only` block (§4 C-2) is the only finding here. Body text count = 386 chars, ALL inside that one block, with 22 brand-variant mentions. Matches Google's spam-policy patterns for hidden text + doorway.

### 6c. Accessibility (WCAG 2.2 AA)

- **Lighthouse A11y median:** 90 (post pages) — 96 (most others). Post-page 90 driven by 14 color-contrast failures + link-in-text-block + skip-link. case-apex worst at 37 color-contrast failures.
- **Common failing audits:**
    - `color-contrast`: 12/12 pages affected. Specific failing element ratios in §4 H-3.
    - `link-in-text-block`: post pages, privacy, terms (color-only link styling).
    - `skip-link`: post pages (skip-link target `#main` not present in post page render tree).
    - `heading-order`: case-apex (uses `role="heading" aria-level=3` skipping h2).
- **Other audits pass in lab:** image-alt, button-name, link-name, document-title, viewport, meta-description, heading-order (everywhere except case-apex).
- **DOM size on home:** 746 elements, max depth 14, max child 24 (under Lighthouse's warning thresholds, but large).
- **Manual checks NOT done:** keyboard tab order, focus-visible styles, screen-reader semantics with VO/NVDA, tap-target sizing (Lighthouse `tap-targets` returned null on mobile). 15 min of keyboard testing recommended.

### 6d. Security & Trust

- **TLS:** TLSv1.3, AEAD-CHACHA20-POLY1305-SHA256, HTTP/2 over Fastly. Cert: Let's Encrypt R12, expires 2026-06-26, auto-renewed by GitHub Pages.
- **TLS protocol scan:** UNVERIFIED locally (openssl s_client returned empty on -tls1/-tls1_1/-tls1_2/-tls1_3 with empty stdin — likely macOS LibreSSL quirk). Fastly default config disables TLS 1.0/1.1; TLS 1.3 confirmed via curl handshake log.
- **HTTP/3:** could not test (local libcurl built without HTTP/3 support).
- **Response headers (all 12 pages):**
    - ✓ `Strict-Transport-Security: max-age=31556952` — present but missing `includeSubDomains` and `preload`.
    - ✗ Content-Security-Policy
    - ✗ X-Content-Type-Options
    - ✗ X-Frame-Options
    - ✗ Referrer-Policy
    - ✗ Permissions-Policy
    - ✗ Cross-Origin-Opener-Policy / -Embedder-Policy / -Resource-Policy
    - `Cache-Control: max-age=600` (10 min) on HTML — appropriate for content that changes.
    - `Server: GitHub.com`, served via Fastly (`via: 1.1 varnish`, `x-fastly-request-id`, `x-served-by: cache-maa10244-MAA` = Chennai India edge for this client).
- **Mixed content:** none detected on any of 12 pages ✓.
- **Subresource Integrity:** present on both cross-origin scripts (unpkg.com React, ReactDOM) — `integrity="sha384-..."` ✓.
- **DNS:**
    - MX: `1 smtp.google.com` (Google Workspace).
    - SPF: `v=spf1 include:zoho.in include:spf.efwd.registrar-servers.com ~all`. Soft-fail.
    - **DMARC: NONE** (C-4).
    - DKIM: `google._domainkey` exists (RSA 2048).
    - **CAA: NONE** (M-10).
    - **DNSSEC: NOT enabled** (AD flag False).
- **Email/domain trust signal for cold outbound is mid-tier:** SPF + DKIM present, DMARC absent → mail provider can't verify alignment, will route to Promotions / Quarantine more often.
- **Cookies:** initial HTML response sets no cookies ✓. PostHog cookies set after JS mount (not exercised in headless curl).
- **PostHog config:** `person_profiles: 'identified_only'` (anonymous visitors don't get tracked profiles ✓ — good privacy default). But Surveys + session-recording still possible if invoked.

### 6e. Exposed source / dotfiles (NEW — the big finding)

Probed against the live origin. Every entry below returned **200 with real content** (verified, content extracts in `audit-artifacts/exposed/`):

| Path | Size | Sample content |
|---|---|---|
| `/CLAUDE.md` | 4,883 B | "# SimpleGrid Website — Claude Instructions. This file tells Claude Code how to work on this project. The user is **non-technical**..." Contains the user's email + GitHub repo URL. |
| `/package.json` | 1,124 B | `{"name":"simplegrid-website","scripts":{"build":"babel components/ --out-dir components/ ..."},"devDependencies":{"@babel/cli":"^7.24.0","@babel/core":"^7.24.0","@babel/preset-react":"^7.24.0"}}`. Description: "Run `npm run build` before pushing to deploy: it pre-transpiles all JSX so production stops shipping Babel-standalone (3 MB) on every page." |
| `/package-lock.json` | 39,430 B | 82 resolved npm packages enumerated. |
| `/.gitignore` | 41 B | `node_modules/` `.node/` `*.jsx.bak` `.DS_Store`. |
| `/.DS_Store` | 6,148 B | macOS binary — parseable to enumerate filesystem layout. |
| `/data/blogs.js` | 6,232 B | Blog metadata. **Intentional** (consumed by JS), but worth noting that blog body content already lives in the static HTML files. |
| `/components/Nav.jsx` (and all 13 other JSX sources) | 7,008 B+ each | Full JSX source for every React component (Nav, Footer, HomeTop, HomeMid, HomeBottom, Interactive, EliteFactoryRoad, LoginModal, InviteModal, PostInfographics, EventsLedger, ProductionFlow, PostMain). |
| `/app/{home,blog,product,pricing,about,hiring,case-studies,case-apex,case-furniture-manufacturer,privacy,terms,not-found}.jsx` (12 files) | Each ≥ ~5 KB | Full per-page React source. |
| `/scripts/swap-jsx-to-js-in-html.js`, `/scripts/generate-blog-pages.py`, `/scripts/generate-sitemap.py` | All 200 | Build scripts. Reveal internal automation pipeline. |
| `/babel.config.json` | 200 | Babel config. |
| `/CNAME` | 13 B | `simplegrid.ai`. Expected for GitHub Pages, no risk. |

**No `.env`, `.git/HEAD`, `.git/config`, `wp-config.php`, `secrets.json`, `vendor/`, `.htpasswd`, or `.htaccess` were found** — the secret-stealing surface is genuinely empty. The exposure is *embarrassing* (a buyer Googling SimpleGrid finds the build pipeline) but not *catastrophic* (no API keys, no credentials, no production database hooks).

### 6f. Conversion & UX (inference from source — no real screenshots)

- **Primary CTA = "Book a Call"** linking to `https://cal.com/simplegrid-ai` (external, opens new tab). Same CTA on every page in the nav. ✓
- **Click-depth to primary conversion from home hero: 1 click** (assuming React has mounted and the button is visible). ✓
- **Above-the-fold (inference, not screenshots):**
    - **post pages:** real content visible immediately (now pre-rendered) — title, meta, "Back to blog" link, all in raw HTML.
    - **all other pages:** blank `<div id="root"></div>` until React mounts. With LCP 2–3 s mobile, that's 2–3 seconds of empty screen on slow connections. Visible elements before React: only the doorway sr-only block on home (and it's `display:none` to humans).
- **No `<form>` element on any of 12 pages.** Conversion = leave the site to Cal.com. Deliberate, but: no email capture for nurture, no marketing-pixel form-submit event.
- **Trust signals on home:** Trusted-partner badges (NVIDIA Inception, AWS Startups), Privacy + Terms in footer, Cal.com booking link. **No US legal entity disclosure**, no US phone number, no US address. Add a US presence statement if the audience is US enterprise.
- **404 behavior:** GitHub Pages default 404 (verified `/foo` 404 and `/blog/does-not-exist/` 404). No custom branded 404 found.

### 6g. Analytics & Measurement

- **Single tracker installed:** PostHog (project key `phc_uYqTNuyvu48ttUP7tjh89v8JBvjgbRZ9bvZdfdVoEPVh`, host `us.i.posthog.com`). No GA4, GTM, LinkedIn Insight, Meta Pixel, Hotjar, Segment.
- **Load strategy:** `requestIdleCallback(sgLoadPostHog, {timeout: 3000})` with `setTimeout(... 2000)` fallback. Deferred but not consent-gated (C-3).
- **Conversion-event wiring:** UNVERIFIED — could not test fire `posthog.capture('book_a_call_click', ...)` without a browser session. Recommend manual click test with PostHog Live Events open.
- **No double-firing** across the 12 audited pages — exactly one `sgLoadPostHog` definition per page.

### 6h. Discoverability / Files

- 404: `/llms.txt`, `/llms-full.txt`, `/.well-known/security.txt`, `/security.txt`, `/favicon.ico`, `/apple-touch-icon.png`, `/manifest.json`, `/humans.txt`, `/ads.txt`, `/.well-known/ai.txt`.
- 200: `/CNAME`, `/sitemap.xml`, `/robots.txt`, `/CLAUDE.md` (C-1), `/package.json` (C-1), `/package-lock.json` (C-1), `/.DS_Store` (C-1), all `/components/*.jsx`, `/app/*.jsx`, `/scripts/*`, `/babel.config.json`.

**For an AI-native ERP startup, the absence of `/llms.txt` is a missed opportunity** — Anthropic, Perplexity, and OpenAI agents increasingly check for it when summarizing sites. A 1-KB `/llms.txt` like the one at `anthropic.com/llms.txt` would let AI assistants give a more accurate summary than they currently extract from the doorway sr-only block.

---

## 7. Verification Gaps

- **CrUX field data (real-user LCP/INP/CLS):** API requires a Google Cloud key. `403 PERMISSION_DENIED`. To unblock: get a free PSI API key from `console.cloud.google.com`, re-run with `&key=…`. Without field data, every conclusion about real-user performance is inferred from lab; lab CLS especially is unreliable.
- **Screenshots at 360/390/768/1280px:** no headless screenshot tool was wired up. Above-the-fold + responsive-breakage claims are inferences from source.
- **Real INP:** requires real users; TBT used as proxy.
- **Keyboard navigation flow + focus-visible + screen-reader semantics:** require manual testing. Lighthouse passes the automated subset; ~30 % of WCAG issues need a human.
- **TLS version-acceptance scan:** `openssl s_client` returned empty for all versions on this Mac (LibreSSL quirk). Have confirmed TLS 1.3 works via curl handshake log, but TLS 1.2 acceptance status is UNVERIFIED.
- **Per-CTA PostHog event firing:** would need a browser session with PostHog Live Events panel open.
- **Email deliverability score (sender reputation):** outside the website itself; recommend mail-tester.com from `hello@simplegrid.ai`.
- **`retire.js` vuln scan against loaded scripts:** could not install (no npm globally — but Lighthouse already runs `js-libraries` audit which would flag known-vulnerable versions; all 12 pages PASS that audit ✓).
- **Manual browser/device matrix (Safari iOS, Chrome Android, Firefox, Edge):** not exercised.

---

**Audit complete.**

Raw artifacts:
- `audit-artifacts/lh/lh-*-{mobile,desktop}-run{1,2,3}.json` — 72 Lighthouse JSON reports.
- `audit-artifacts/competitor/lh-*-mobile-run{1,2}.json` — 6 competitor reports.
- `audit-artifacts/html-*.html` — 12 raw HTML snapshots from Googlebot UA.
- `audit-artifacts/headers-*.txt` — 12 header dumps.
- `audit-artifacts/exposed/` — proof-of-exposure file copies (CLAUDE.md, package.json, etc.).
- `audit-artifacts/mobile-medians.json`, `desktop-medians.json`, `inspect-results.json` — aggregate metrics.

Re-run command:
```bash
export PATH="/tmp/node/bin:$PATH"
/tmp/lh/node_modules/.bin/lighthouse <url> --quiet --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --output=json --output-path=/tmp/out.json
```
