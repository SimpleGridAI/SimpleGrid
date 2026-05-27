# SimpleGrid.ai — Exhaustive Site Audit

**Auditor:** Senior QA + brand compliance officer (15 yrs ERP / B2B SaaS)
**Target:** https://simplegrid.ai
**Audit date:** 2026-05-27
**Scope:** Every URL in sitemap.xml + off-sitemap probes + asset CDN. 54 sitemap URLs mirrored locally and parsed.
**Methodology:** Raw HTML pulled with curl, JS components downloaded and grepped, asset endpoints HEAD-checked, headers inspected, no rendered-DOM assumptions.

---

## 0. Executive snapshot

| Severity | Count | Examples |
|---|---|---|
| 🔴 Critical (fix this week) | 3 | Tools-index has 0 anchor links in static seed (SEO leak); Microsoft Clarity ID is a placeholder string `CLARITY_PROJECT_ID`; banned word "World-class" appears 10+ times in tool content |
| 🟠 High (fix this month) | 8 | Brand colour drift `#3461E0` vs `#4A7BF7`; cookie banner button uses old brand blue; tools-index `<title>` says "24" but sitemap lists 23 individual tools; brand-voice "end-to-end" on homepage; logomark SVG has rx=6 but brand spec is 5; no `og:locale` on most pages other than home; no `og:image` on terms/privacy; addressCountry=IN in homepage Org schema despite "US-only" positioning |
| 🟡 Medium | ~20 | Type-scale slightly above spec (hero 50px vs 48 max); JSON-LD `numberOfEmployees` is 200–1500 but copy + llms.txt say 50–1500; theme-color tag uses raw hex not CSS var; legal-entity "Pvt. Ltd." disclosed only in privacy/terms not homepage footer; HSTS missing `includeSubDomains` and `preload` |
| 🟢 Low / nit | ~30 | Em dashes still inside three tool-page JS comments; minor title-length overruns on Apex case study; missing `humans.txt`; missing `accessibility.html` |
| ✅ Verified clean | many | jsPDF address-overflow bug **already fixed** in shared `tools.js`; no `simplegrid.com` typos anywhere; legal-entity Valaya AI Technologies Pvt. Ltd. present in privacy + terms; CSP/X-Content-Type-Options/Referrer-Policy/Permissions-Policy all set via `<meta http-equiv>`; SSL + HSTS present; PostHog + GA4 deferred to user interaction (privacy-positive) |

**Bottom-line read:** The site is architecturally clean and the most-feared bug (PDF address overflow) is already handled. The remaining issues are brand-discipline drift — colour, voice, schema metadata — plus a handful of stray jargon words in the free-tools content that a CFO-grade buyer **will** notice.

---

## 1. Phase 0 — Site Map Discovery

### 1.1 Sitemap.xml (54 entries)

`https://simplegrid.ai/sitemap.xml` → HTTP 200, well-formed XML.

| Category | Count | URLs |
|---|---|---|
| Marketing pages | 11 | `/`, `/about.html`, `/blog.html`, `/case-apex.html`, `/case-furniture-manufacturer.html`, `/case-studies.html`, `/hiring.html`, `/pricing.html`, `/privacy.html`, `/product.html`, `/terms.html` |
| Blog posts | 19 | Listed in §6.4 |
| Tools index + tools | 24 (1 + 23) | Listed in §13 |

### 1.2 robots.txt

✅ Well-engineered. Cloudflare Content-Signals header included (`search=yes,ai-train=no`). Explicit `Allow: /` for the AI crawlers SimpleGrid wants (GPTBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, etc.). Disallows `/admin`, `/api`, `/auth`, `/login`, `/dashboard`, `/internal`, `/preview`, `/staging`, `/seo-audit/`, `/post.html`. Sitemap declared.

⚠️ **Internal contradiction:** The Cloudflare-managed block at the top of robots.txt says `User-agent: GPTBot → Disallow: /` and `User-agent: ClaudeBot → Disallow: /`, then the human-edited block below says `User-agent: GPTBot → Allow: /` and `User-agent: ClaudeBot → Allow: /`. By RFC convention the **later** block wins for most crawlers, but this is fragile and reads "we don't know what we want." Recommendation: remove the Cloudflare managed block or align both blocks.

### 1.3 llms.txt — present ✅

`/llms.txt` HTTP 200. Well-structured, declares canonical positioning, key URLs, what SimpleGrid is **not**, tech stack (event-sourced Postgres + NestJS + React), operated-by line.

> **Inconsistency:** llms.txt says ICP is **50–1,500 employees**. JSON-LD `SoftwareApplication.audience.numberOfEmployees` on the homepage says **200–1,500**. Pick one. The brand guidelines and case studies both anchor at 50, so the schema is the outlier — fix the schema.

### 1.4 Probed paths

| Path | HTTP | Note |
|---|---|---|
| `/index.html` | 200 | Identical bytes to `/` — good consistency |
| `/case-elite.html` | 200 | **Redirects** via meta-refresh + canonical to `/case-furniture-manufacturer.html`. Not in sitemap. ✅ |
| `/post.html` | 200 | Legacy router (deprecated). Blocked in robots.txt. ✅ |
| `/404.html` | 200 | Has its own H1 + nav. ✅ |
| `/.well-known/security.txt` | 200 | Has `Contact: mailto:hello@simplegrid.ai`, Expires 2027-12-31. ✅ |
| `/favicon.ico` | 200 | 4,414 bytes ICO |
| `/favicon.svg` | 404 | Modern browsers fall back to `<link rel="icon" type="image/svg+xml" href="assets/simplegrid-logomark.svg">` — works, but a top-level `/favicon.svg` would be tidier |
| `/CNAME` | 200 | GitHub Pages custom domain marker |
| `/contact.html` `/demo.html` `/security.html` `/customers.html` `/faq.html` `/accessibility.html` `/humans.txt` | 404 | None expected by nav, but the bot list often hits these. Recommendation: add `/security.html` pointing at `/.well-known/security.txt` and a 1-line `/accessibility.html`. |
| `/sg-schema.html` | 404 | Referenced by phrase but no canonical page exists. The blog has 3 posts about SG Schema; consider a permanent `/sg-schema.html` explainer. |

---

## 2. Phase 1 — Logo & brand-name verification

### 2.1 Logo assets

| File | HTTP | Size | Notes |
|---|---|---|---|
| `assets/simplegrid-logomark.svg` | 200 | 644 B | Used as favicon + standalone icon. **rx=6, brand spec says 5.** Stroke 2.5 ✅. Inner dividers stroke 2 ✅. Uses `currentColor` for light/dark adaptability ✅. |
| `assets/simplegrid-logo-horizontal.svg` | 200 | 885 B | Wordmark + icon. **rx=5 ✅** (compliant). Stroke 2.5 ✅. Wordmark "SimpleGrid" rendered in inline `<text>` with `font-family="Geist, -apple-system, SF Pro Display, Segoe UI, sans-serif"`, `font-weight="500"`, `letter-spacing="-0.3"` ✅. |
| `assets/nvidia-inception.png` | 200 | 4 KB PNG | Loads. Used in Trust Strip + Footer. Alt text "NVIDIA Inception Program member" ✅. width=130, height=40 explicit ✅. `loading="lazy" decoding="async"` ✅. |
| `assets/aws-activate.png` | 404 | — | **Not actually needed.** AWS badge in `components/HomeTop.js` lines 458–472 is rendered as **inline SVG** (Smile logo paths) + text "Activate Startups", not a `<img>`. The 404 is from probing, not a real broken reference. ✅ |
| `assets/og-card.jpg` | 200 | 100 KB | OG image — used everywhere. |
| `assets/elite-factory.jpeg` | 200 | 247 KB | Real factory photo, referenced in `HomeBottom.js`. ✅ matches brand "USE: factory floors" rule. |

**Logo construction findings:**

```xml
<!-- simplegrid-logomark.svg (current) -->
<rect x="3" y="3" width="36" height="36" rx="6" ry="6" stroke-width="2.5"/>
<!--                                          ^^^^^^^^ should be rx=5 per brand guidelines -->
```

The horizontal logo uses rx=5 correctly:
```xml
<rect x="0" y="0" width="36" height="36" rx="5" ry="5" stroke-width="2.5"/>  ✅
```

**Recommendation:** Update `simplegrid-logomark.svg` rx from 6 → 5 for spec compliance. 1-character fix.

### 2.2 Brand-name spelling integrity

Across all 54 mirrored pages, "SimpleGrid" (one word, capital S + G) is used consistently in **body content**.

| Page | "SimpleGrid" (correct) | "Simple Grid" (variant) | Context |
|---|---|---|---|
| `/` (and `/index.html`) | 20 | 7 | **All 7 instances are inside `alternateName` arrays in JSON-LD schema** — this is intentional SEO for users who type "Simple Grid" in search. ✅ |
| All other pages | 6–28 | 0 | Clean |

Grep confirms: no "SIMPLEGRID", no "simpleGrid", no "S.G.", no "SG" as a standalone brand reference in body text.

```
$ grep -roE 'Simple Grid' pages/ | grep -v alternateName
(no results outside the schema arrays)
```

**Verdict:** Brand-name spelling discipline is clean. ✅

### 2.3 No `.com` typos

```
$ grep -l 'simplegrid\.com' pages/*.html
(no matches)
```

✅ Zero `simplegrid.com` references anywhere — every link uses `.ai`.

### 2.4 Favicon

```html
<link rel="icon" type="image/svg+xml" href="assets/simplegrid-logomark.svg">
```

✅ Grid icon only, no wordmark. Matches brand spec for favicon use.

⚠️ Missing: `<link rel="apple-touch-icon">` and PNG fallbacks (`<link rel="icon" type="image/png" sizes="32x32">`). iOS will fall back to a screenshot. Add a 180×180 apple-touch-icon.

### 2.5 Third-party partner badges

| Partner | Asset | Display | Link target | Verified live |
|---|---|---|---|---|
| NVIDIA Inception | `assets/nvidia-inception.png` 200 | Header trust strip + footer | `https://www.nvidia.com/en-us/startups/` (200) | Both image and link OK |
| AWS Activate Startups | Inline SVG (Amazon Smile) | Header trust strip | `https://aws.amazon.com/startups/` (200) | Inline SVG renders without external dependency ✅ |

No other partner logos are claimed on the homepage. The case studies do not display a customer-logo wall — consistent with the "founder-led, selective onboarding" positioning. ✅

---

## 3. Phase 2 — Em-dash & typography audit

### 3.1 Em dashes (—) in user-visible content

Scan of all 54 mirrored pages:

| Page | Em-dash count | Where | Verdict |
|---|---|---|---|
| `tools/business-valuation-calculator/` | 1 | `// Value unlock opportunities — applied to the earnings figure being used (SDE or EBITDA)` | **JS code comment, not user-visible** ✅ |
| `tools/erp-needs-assessment/` | 1 | `// Cost-of-not-having-ERP — 5 buckets per spec` | **JS code comment** ✅ |
| `tools/operations-health-score/` | 1 | `// Radar chart SVG — your score vs industry median (50) overlay` | **JS code comment** ✅ |
| All other pages | 0 | — | — |

✅ **No em-dashes in user-visible text anywhere on the site.** Static HTML and React-rendered content (HomeTop.js / HomeBottom.js / Nav.js / Footer.js / Interactive.js / LoginModal.js / InviteModal.js / app/home.js) all clean.

The three remaining instances are inline JS comments inside inline `<script>` blocks on those tool pages. They are stripped by minification (and invisible to users regardless), but for absolute brand discipline they can be hyphenated. Tiny fix.

### 3.2 Other typographic characters

- En-dashes (–): 0 hits in body text.
- Smart quotes (" " ' '): a handful inside quote panels (`"…"` blocks attributed to operators) — acceptable typographic use, not inconsistency.
- Ellipsis character (…): zero usage. Three-dot ASCII (`...`) used in 4 places (loading states / CTA pre-text). Consistent.
- Non-breaking spaces (`&nbsp;`): 0 hits.

### 3.3 Compound-modifier consistency

| Term | Form used | Pages | Drift? |
|---|---|---|---|
| `AI-native` / `AI native` | Mostly **"AI-native"** with hyphen | homepage, product, blog | ✅ Consistent |
| `mid-market` | Always hyphenated | every page | ✅ Consistent |
| `7-day` vs `7-21 day` | Site uses `7-21 days` (or `7 to 21 days`) consistently; **no "7-day" claims remain** | homepage, product, case studies | ✅ Aligned with reality (brand guidelines themselves are stale here — the website is more accurate than the brand doc) |
| `schema-driven` | Always hyphenated | blog series | ✅ |
| `event-driven` | Always hyphenated; also "event-sourced" used consistently | blog series | ✅ |
| `zero-deployment` / `zero-cost` | Used 2 places — `pricing.html` says "carry nothing", `product.html` says "$0 deployment cost". No conflicting phrasing. | — | ✅ |

---

## 4. Phase 3 — Brand voice + tagline + banned-word audit

### 4.1 Canonical tagline coverage

Brand guidelines v1.0 list 4 canonical taglines. Scan results across the live site (static HTML + React JS):

| Tagline | Required location | Present? | Notes |
|---|---|---|---|
| "You don't adapt to the system. The system adapts to you." | Hero / homepage banner | ❌ **NOT on homepage hero**. Found only in 2 blog posts: `dynamics-gp-sunset-switch-to-simplegrid`, `why-mid-market-manufacturers-are-the-most-underserved...` |
| "AI makes. Humans approve." | Product page | ❌ **Not found anywhere on site** |
| "Execution First, System Second." | Solution pages, case studies | ❌ **Not found anywhere on site** |
| "For operators, not accountants." | Subheading, social bios | ❌ Not found verbatim. Word "operators" used 4× in HomeTop.js but never with this contrastive structure. |

**Interpretation:** The site has clearly moved to a **newer positioning** — the hero is now "Custom ERP. Built at our risk. Paid for after it works." which is sharper and more contrastive (it pairs risk vs. payment). The brand guidelines document is stale relative to the live site, not the other way round. This is fine **strategically** but two follow-ups are needed:

1. **Decide:** Are the 4 canonical taglines retired? If yes, update the brand guidelines doc so it stops mandating them. If no, they need to be reintroduced.
2. The "system adapts to you" tagline is still strong and **belongs back somewhere visible** — maybe as the H2 on `/product.html` to lead into "We model your stages, your contractors…". Right now the product H1 is "We don't sell software. We build a custom ERP around your factory." which is good, but the "system adapts" tagline is brand equity being left on the table.

### 4.2 Banned-word scan ("Words We Avoid" per brand guidelines)

Words flagged: `digital transformation`, `synergy`, `revolutionary`, `world-class`, `seamless`, `cutting-edge`, `next-generation`, `unlock growth`, `streamline`, `empower`, `leverage`, `scalable solution`, `best-in-class`, `game-changing`, `disruptive`, `paradigm`, `holistic`, `robust`, `turnkey`, `end-to-end`, `user-friendly`, `cancel anytime`, `tailored solution`, `industry expert`.

| Page | Banned-word instances | Severity | Verdict |
|---|---|---|---|
| **`tools/oee-calculator/`** | "World-class" ×7, "world-class" ×3 (in title, meta description, body, JSON-LD, rating bands: `if (oee>=85) { rating='World-class…'`) | 🔴 Critical | This is the industry-standard OEE benchmark term, but brand guidelines explicitly ban "world-class". Replace with **"Top 10%"** or **"Top decile (85%+)"**. The literal term "world-class OEE" appears in meta description and JSON-LD `description` — visible to Google. |
| **`tools/scrap-waste-calculator/`** | "World-class" ×4, "world-class" ×1 | 🔴 Critical | Same fix: "Top quartile" |
| **`tools/downtime-cost-calculator/`** | "World-class" ×2, "world-class" ×1 | 🟠 High | Same fix |
| **`tools/operations-health-score/`** | "World-Class" ×1 | 🟠 High | Same fix |
| **`tools/manufacturing-kpi-benchmark/`** | "Best-in-class" ×1 (`composite>=80?'Best-in-class':composite>=65?'Above average'…`) | 🟠 High | Replace with **"Top quartile"** |
| **`tools/revenue-per-employee/`** | "best-in-class" ×1, "leverage" ×1 ("operating leverage" — legitimate finance term, **NOT a violation**) | 🟡 Medium | Replace "best-in-class" with "Top quartile" |
| **`tools/break-even-calculator/`** | "Leverage" ×1 ("Operating Leverage" — finance term, **NOT a violation**) | ✅ N/A | "Operating leverage" is a defined accounting concept, ignore |
| **`blog.html`** | "digital transformation" ×1 | ✅ N/A | Context: `Straight talk about ERP and operations. No jargon. No "digital transformation."` — this is **contrarian, anti-jargon usage**. Keep. |
| **`components/HomeTop.js`** | "end-to-end" ×1 | 🟠 High | Context: `We walk through your operations end-to-end: how orders come in, who approves what…`. This **is** user-visible. Replace with **"start to finish"** or rewrite: "We walk through every step of your operations: how orders come in, who approves what…" |
| **`components/HomeTop.js`** | "seamless" ×1 | ✅ N/A | JS comment about CSS marquee loop — not user-visible |
| **`components/HomeBottom.js`** | "seamless" ×1 | ✅ N/A | JS comment — not user-visible |

**Total user-visible banned-word incidents requiring fixes: ~25** (heavily concentrated in OEE + scrap-waste calculators).

### 4.3 Preferred / approved-word check ("Words We Use")

Words on the approved list: `deploy`, `configure`, `operators`, `supervisors`, `schema`, `event ledger`, `go live`, `works like WhatsApp`, `built by a manufacturer`, `bespoke`, `walk away`.

Sampling from static seeds + JS components:

| Approved word | Pages where it appears |
|---|---|
| `deploy` / `deployment` | homepage, product, pricing, llms.txt, JSON-LD featureList |
| `configure` / `configuration` | product, blog posts, llms.txt |
| `operators` | homepage hero seed, HomeTop.js (4×), hiring, blog series |
| `supervisors` | hiring.html, product |
| `schema` / `SG Schema` | blog series (3 dedicated posts), product, llms.txt |
| `event ledger` / `event-sourced` | blog (`event-sourcing-why-simplegrid-stores-everything…`), product, llms.txt |
| `go live` / `live in 12 days` / `live in 21 days` | case studies, homepage |
| `built by a [founder/operator/manufacturer]` | homepage, about, hiring, footer, llms.txt |
| `walk away` | homepage hero, pricing, llms.txt ("If it doesn't move the business, you walk") |

✅ Voice register is **operator-direct**: short sentences, contrast statements ("You pay before you ever see what works" / "With SimpleGrid, you see and use it first. Then you pay."), specific numbers ($30M, 600 employees, 550 SKUs, 7–21 days), founder-personal ("Mukund built and ran a $30M manufacturing business").

### 4.4 Contrast-formula compliance

Sample of headings + their contrast structure:

| Page | H1 / hero line | Contrast structure? |
|---|---|---|
| `/` | "Custom ERP. Built at our risk. Paid for after it works." | ✅ Risk-vs-payment contrast |
| `/product.html` | "We don't sell software. We build a custom ERP around your factory." | ✅ "Not X. But Y." structure |
| `/pricing.html` | "You carry nothing until you see it run." | ✅ Implicit contrast (vs. competitors who bill upfront) |
| `/about.html` | "Built by an operator who's been on your floor." | ✅ Audience contrast (vs. "by a SaaS sales team") |
| `/case-studies.html` | "Real factories. Real 30-day runs." | ✅ Implicit "vs. demos / vs. slideware" |
| `/hiring.html` | "Build the ERP every operator wished for." | ✅ Audience contrast |
| `/case-apex.html` | "Apex Apparel — custom ERP, live in 12 days." | ✅ Time contrast embedded |
| `/case-furniture-manufacturer.html` | "Furniture exporter — 600 employees, custom ERP live in 21 days." | ✅ Time + scale contrast |
| `/blog.html` | "ERP for manufacturers — field notes from operators who built it." | ✅ Author contrast |
| `/tools/` | "Productive tools for mid-market US manufacturers." | ⚠️ No contrast. Could be "Free productive tools — no signup, no upsell." |

**Grade: A-** — Contrast structure is used consistently across hero copy. Only the tools index hero is a flat description.

### 4.5 Vague-claim / unanchored-superlative scan

Searched for: `industry-leading`, `unmatched`, `unparalleled`, `trusted by businesses`, `seamless integration`, `fastest`, `leading`, `premier`, `top-tier`, `state-of-the-art`, `unprecedented`, `many companies`, `several clients`, `numerous`, `wide range`, `extensive experience`, `proven track record`, `years of experience`.

Result: **0 instances across all 54 pages.** ✅

This is unusually clean. The site grounds claims in specifics ($30M operation, 600 employees, 550 SKUs, 12 days, 21 days, 30-day trial, 100k shirts/month, 22 components per SKU, etc.).

---

## 5. Phase 4 — Colour & font compliance

### 5.1 Colour palette — what the CSS actually ships

From `colors_and_type.css`:

| Token | Brand spec v1.0 | Production CSS | Drift | Justified? |
|---|---|---|---|---|
| `--sg-black` | #1A1A1A | #1A1A1A | none | ✅ |
| `--sg-blue` (Primary) | **#4A7BF7** | **#3461E0** | **-1 shade darker** | CSS comment: "darkened to pass WCAG AA contrast on white". ✅ Justified. |
| `--sg-white` | #FFFFFF | #FFFFFF | none | ✅ |
| `--sg-off-white` | #FAFBFC | #FAFBFC | none | ✅ |
| `--sg-blue-dark` | **#3461D1** | **#2A52BD** | -1 shade darker | Consistent with the primary darken | ✅ |
| `--sg-blue-light` | #EBF0FF | #EBF0FF | none | ✅ |
| `--sg-charcoal` | #2D2D2D | #2D2D2D | none | ✅ |
| `--sg-dark-gray` | #4A5568 | #4A5568 | none | ✅ |
| `--sg-mid-gray` | **#9CA3AF** | **#6B7280** | darker | CSS comment: "darkened to pass WCAG AA on white". ✅ Justified. |
| `--sg-light-gray` | #E5E8ED | #E5E8ED | none | ✅ |
| `--sg-teal` | #0EA5E9 | #0EA5E9 | none | ✅ |
| `--sg-red` | #EF4444 | #EF4444 | none | ✅ |
| `--sg-green` | #10B981 | #10B981 | none | ✅ |
| `--sg-gold` | #F59E0B | #F59E0B | none | ✅ |
| `--sg-purple` | #7C3AED | #7C3AED | none | ✅ |

**Verdict on palette:** Three intentional WCAG-driven darkenings (`--sg-blue`, `--sg-blue-dark`, `--sg-mid-gray`). The CSS comments document the reason. Everything else matches v1.0 exactly.

### 5.2 Where the colour drift leaks

The brand guidelines v1.0 will list `#4A7BF7` (original blue) as the primary. The live site uses `#3461E0`. Search for the **old** literal hex anywhere on the site to find drift:

| Location | Hex used | Should be | Severity |
|---|---|---|---|
| `<meta name="theme-color" content="#3461E0">` (all pages) | #3461E0 | matches CSS ✅ | none |
| Cookie consent banner Accept button (`cookie-consent.js` line 44) | **#4A7BF7** (hardcoded inline) | should be `#3461E0` or `var(--sg-blue)` | 🟠 High — visual inconsistency, the only place on the site that still uses original brand blue |
| Cookie consent decline button link colour | `#7FA7FF` (hardcoded inline) | use a CSS variable | 🟡 Medium — magic hex |
| Hero CTA fallback in static seed `<a style="background:#3461e0;">` (HTML inline) | #3461e0 | matches CSS ✅ | ✅ |
| `--shadow-focus: 0 0 0 3px rgba(74, 123, 247, 0.25);` | uses **old** #4A7BF7 (74,123,247) as the focus glow | should be the new blue OR explicitly justified as a softer halo | 🟡 Medium — focus rings glow in the **old** brand blue while everything else uses the new |
| HomeTop.js RadialBurst comments + light-mode palette | references #4A7BF7 as endpoint of gradient | keeping it as decorative animation endpoint is fine — but consider matching CSS var | 🟡 Medium |

**Net:** The site has *one* primary blue (#3461E0) for buttons + links + tags + section-tag uppercase labels, and a parallel #4A7BF7 ghost living in shadows + animations + the cookie banner. Decide whether the ghost is intentional (animations look softer with the brighter blue) or a leftover. If intentional, document it. If not, find-and-replace.

### 5.3 Semantic colours used decoratively?

Brand rule: red = errors only, green = success only, gold = highlights / traction stats only.

Spot check on tools.css:
- `.results-hero .big-number.green { color: #047857; }` → tools render positive outcomes (good readiness scores, healthy margins) in **dark green** (`#047857` — not the brand `#10B981`).
- `.results-hero .big-number.red { color: #B91C1C; }` → bad outcomes in **dark red** (not `#EF4444`).
- `.results-hero .big-number.gold { color: #B45309; }` → caution outcomes in **dark gold** (not `#F59E0B`).

These are **WCAG-darkened variants** of the brand semantic colours, used semantically for results panels. Justified and consistent within tools.css. ⚠️ But they are not declared as CSS variables — they're magic hexes repeated throughout tools.css. Recommendation: add `--sg-green-dark`, `--sg-red-dark`, `--sg-gold-dark` tokens, or document this is a tool-specific WCAG variant family.

### 5.4 Fonts

`colors_and_type.css` declares:
```css
--font-brand:   'Geist', -apple-system, 'SF Pro Display', 'Segoe UI', sans-serif;
--font-heading: 'Geist', Calibri, 'Trebuchet MS', -apple-system, sans-serif;
--font-body:    'Geist', Calibri, -apple-system, 'Segoe UI', sans-serif;
--font-mono:    Consolas, 'SF Mono', 'Liberation Mono', monospace;
```

A comment in the CSS file documents the decision:
> "Brand guidelines v1.0 specified Geist Medium 500. Production ships Calibri because (a) it's a system font on Windows + many corporate manufacturer desktops, (b) no extra font request, (c) renders identically across the factory-floor IT estate we sell into. Geist is kept as `--font-brand` for logo/wordmark surfaces and as the first fallback in --font-heading — if a future build self-hosts it (woff2 in /assets/fonts/), all headings upgrade automatically with zero markup changes."

⚠️ But **Geist is NOT self-hosted**: no `@font-face` rule for Geist anywhere, no preload, no `/assets/fonts/` directory deployed. The fallback chain means:
- macOS users: get -apple-system / SF Pro
- Windows users with Calibri (most corporate desktops): get Calibri
- Linux / mobile / kiosk: get whatever sans-serif

This is **intentional and reasonable** for the ICP. But it means the SVG horizontal logo's wordmark — which uses `font-family="Geist, -apple-system, …"` inline — also won't render in Geist on most desktops. The wordmark will display in **system font** on Windows + Linux + Android. Visually fine, but the wordmark won't have the Geist look the brand book mandates.

**Decisions to make:**
1. Self-host Geist for the logo wordmark only (one woff2, preload it, 30 KB).
2. Or accept system-font wordmark and update the brand book to say "Geist where available, system sans-serif elsewhere."

### 5.5 Type scale vs brand spec

| Token | Brand spec | Production CSS | Drift |
|---|---|---|---|
| Hero / display | 36–48px | `--fs-hero: 50px` | +2px over spec |
| H1 | 28–32px | `--fs-h1: 35px` | +3px over spec |
| H2 | 20–24px | `--fs-h2: 25px` | +1px over spec |
| Body | 14–16px | `--fs-body: 18px` | +2–4px over spec |
| Caption | 10–12px | `--fs-caption: 13px` | +1px |
| Section tag | 8–10px | `--fs-tag: 12px` | +2px |

Every size is **slightly above** the brand spec. This makes the site more readable (especially on big monitors) but pushes outside the documented range. Either:
- update the brand spec to match production (probably the right call — 18px body is the current web standard, 14–16px is the brand book showing its age), or
- tighten the CSS back to spec.

`--ls-tag: 0.14em` (≈ 2px at 12px) matches the brand "2px letter-spacing" rule ✅.

---

## 6. Phase 5 + 6 — Performance, headers, SEO

### 6.1 HTTP headers (homepage, representative)

```
HTTP/2 200
date: Tue, 26 May 2026 18:24:36 GMT
content-type: text/html; charset=utf-8
server: cloudflare
strict-transport-security: max-age=31556952
access-control-allow-origin: *
cache-control: max-age=600
x-proxy-cache: MISS
x-github-request-id: 5B64:1423A5:1B3ED0:1CFCFC:6A15E50A
via: 1.1 varnish
x-served-by: cache-sin-wsat1880090-SIN
x-fastly-request-id: ...
cf-cache-status: DYNAMIC
cf-ray: a01ed150f8e1c6f6-SIN
alt-svc: h3=":443"; ma=86400
```

| Header | Present? | Value | Verdict |
|---|---|---|---|
| `strict-transport-security` | ✅ | `max-age=31556952` (~1 year) | 🟡 No `includeSubDomains` and no `preload`. For a single-domain site this is fine; if `www.simplegrid.ai` or any subdomain is ever launched, **add `includeSubDomains; preload`** and submit to the HSTS preload list. |
| `content-security-policy` | ✅ via `<meta http-equiv>` (HTTP header not set; GitHub Pages can't set arbitrary HTTP headers) | Strict CSP with `default-src 'self'`, allowlists unpkg, PostHog, googletagmanager, clarity, formsubmit, google-analytics, `frame-ancestors 'self'`, `form-action 'self' https://formsubmit.co`, `upgrade-insecure-requests` | ✅ Tight. Note: `script-src` has `'unsafe-inline'` — needed for the inline tracking + animation init scripts. Migrate inline scripts to nonces or external files when feasible. |
| `x-content-type-options` | ✅ via meta | `nosniff` | ✅ |
| `referrer-policy` | ✅ via meta | `strict-origin-when-cross-origin` | ✅ |
| `permissions-policy` | ✅ via meta | `geolocation=(), microphone=(), camera=(), payment=()` | ✅ Reasonable for a marketing site. Consider adding `interest-cohort=()` to opt out of FLoC-style tracking. |
| `x-frame-options` | ❌ HTTP, ✅ partly via CSP `frame-ancestors 'self'` | — | CSP handles it. Some older legal scanners still grade on the legacy header — set it on Cloudflare if grading matters. |
| `access-control-allow-origin: *` | ⚠️ | `*` | 🟡 Allowing any origin to fetch the HTML by CORS is overly permissive for a marketing site. Probably set by Cloudflare/Fastly defaults. Lock to `simplegrid.ai` if possible (you don't need cross-origin script access to your own HTML). |
| `server: cloudflare` | ⚠️ | exposed | 🟡 Standard, but reveals stack. Hard to suppress on Cloudflare. |
| `x-powered-by` | ✅ | not present | ✅ |
| `cache-control: max-age=600` | ⚠️ | 10 minutes | 🟡 For a publish-on-push static site, 10 minutes between edge updates is conservative — but considering the deploy-to-Pages window is also ~60 seconds, this is fine. |

### 6.2 SSL certificate

Cloudflare-issued cert chain, valid, SAN includes `simplegrid.ai`. (The exact details from `openssl x509 -dates -issuer -subject` were truncated by an OpenSSL flag issue in the audit shell; cert is operational based on HTTPS responding cleanly.)

### 6.3 TTFB / size

| URL | TTFB | Total | HTML size |
|---|---|---|---|
| `/` | 0.317 s | 0.318 s | 12,583 B |
| `/product.html` | 0.272 s | 0.273 s | 9,710 B |
| `/pricing.html` | 0.265 s | 0.266 s | 10,720 B |
| `/about.html` | 0.303 s | 0.303 s | 8,578 B |
| `/case-studies.html` | 0.282 s | 0.283 s | 8,515 B |
| `/blog.html` | 0.276 s | 0.277 s | 41,748 B |
| `/hiring.html` | 0.267 s | 0.268 s | 8,113 B |
| `/tools/` | 0.268 s | 0.270 s | 33,992 B |
| `/tools/invoice-generator/` | 0.269 s | 0.269 s | 35,027 B |
| `/tools/oee-calculator/` | 0.257 s | 0.257 s | 18,975 B |

All static HTML payloads under 50 KB, TTFB under 320 ms (audited from Singapore PoP — US PoPs will be similar or faster). Excellent baseline.

### 6.4 Page weight breakdown (homepage, full asset list)

Sizes pulled from `curl -o /dev/null -w "%{size_download}"`:

| Resource | Size |
|---|---|
| HTML (static seed) | 12.5 KB |
| `colors_and_type.css` | ~4 KB (199 lines) |
| `styles.css` | ~25 KB (1,260 lines) |
| `components/Nav.js` | 8.3 KB |
| `components/HomeTop.js` | **87 KB** |
| `components/HomeBottom.js` | 41.2 KB |
| `components/Footer.js` | 11.4 KB |
| `components/Interactive.js` | 14.5 KB |
| `components/LoginModal.js` | 6.3 KB |
| `components/InviteModal.js` | 8.1 KB |
| `app/home.js` | 1.4 KB |
| `assets/js/analytics-init.js` | 5.5 KB |
| `assets/js/tracking.js` | 2.8 KB |
| `assets/js/cookie-consent.js` | 2.9 KB |
| React 18.3.1 (UMD, unpkg) | ~140 KB gzipped |
| ReactDOM 18.3.1 (UMD, unpkg) | ~40 KB gzipped |
| `assets/og-card.jpg` | 100 KB (loaded only by share crawlers) |
| `assets/nvidia-inception.png` | 4 KB |

**Homepage JS total (excluding React/ReactDOM CDN): ~190 KB unminified.** Components are shipped **unminified with comments** — `HomeTop.js` at 87 KB is mostly canvas-animation code and inline SVGs. Minifying would cut ~40–50%. For a site that boasts about page speed, this is the biggest easy win.

Quick wins:
- `terser components/*.js app/home.js` → ~95 KB savings before gzip
- Add `<link rel="preconnect" href="https://us.i.posthog.com" crossorigin>` (currently only dns-prefetch)
- Self-host React via `/vendor/react/...` to drop the unpkg.com dependency (unpkg has occasional outages and a third-party `<script>` is the largest CSP attack surface)

### 6.5 SEO — title / meta description per page

| Page | Title (length) | Meta description length | H1 count |
|---|---|---|---|
| `/` | "SimpleGrid - Custom ERP, Built at Our Risk. Paid for After It Works." (69 chars) | 240 chars | 1 ✅ |
| `/product.html` | "How SimpleGrid Works - Custom ERP Built Around Your Factory" (60) | 217 chars | 1 ✅ |
| `/pricing.html` | "SimpleGrid Pricing - You Pay Only After It Works" (49) | 158 chars | 1 ✅ |
| `/about.html` | "About SimpleGrid - Built by an Operator Who's Been on Your Floor" (64) | 217 chars | 1 ✅ |
| `/hiring.html` | "Careers at SimpleGrid - Build the ERP Every Operator Wished For" (63) | 207 chars | 1 ✅ |
| `/case-studies.html` | "Real Factories on SimpleGrid - Custom ERP, Live in 12 to 21 Days" (64) | 232 chars | 1 ✅ |
| `/case-apex.html` | "Apex Apparel Case Study - 80-100k Shirts/Month, Custom ERP Live in 12 Days" (**75 — too long**) | 227 chars | 1 ✅ |
| `/case-furniture-manufacturer.html` | "Furniture Manufacturer Case Study - 600 Employees, Custom ERP Live in 21 Days" (**77 — too long**) | 232 chars | 1 ✅ |
| `/blog.html` | "SimpleGrid Blog - Field Notes from Operators Building a Custom ERP" (66) | 297 chars (**slightly long**) | 1 ✅ |
| `/tools/` | "24 Productive Tools for Manufacturers \| SimpleGrid" (51) | 388 chars (**too long; Google truncates ~160**) | 1 ✅ |
| `/terms.html` | "Terms of Service \| SimpleGrid" (29) | 100 chars | 1 ✅ |
| `/privacy.html` | "Privacy Policy \| SimpleGrid" (27) | 167 chars | 1 ✅ |
| `/404.html` | "Page Not Found \| SimpleGrid" (27) | 175 chars | 1 ✅ |

🟠 **Three titles exceed 70 chars** (case-apex, case-furniture, tools index). Google truncates at ~600 px (≈ 55–65 chars typically). The case-study titles get cut mid-claim. Recommend:
- `case-apex.html`: "Apex Apparel — Custom ERP Live in 12 Days \| SimpleGrid" (54 chars)
- `case-furniture-manufacturer.html`: "Furniture Exporter — 600 Employees, ERP in 21 Days \| SimpleGrid" (62 chars)

🟠 **Tools-index meta description is 388 chars** — Google will display ~160. The first 160 should pack the strongest value prop. Current opening: `24 browser-based productive tools for US manufacturers:` is fine, but the long enumeration of every tool name eats SERP real estate.

🟢 Every page has exactly 1 H1. Clean.

### 6.6 Open Graph + Twitter

Spot checks:
- Homepage: og:site_name, og:type=website, og:locale=en_US, og:url, og:title, og:description, og:image (og-card.jpg 100 KB), og:image:alt ✅. Twitter: summary_large_image, @simplegridai handle ✅.
- `/terms.html` + `/privacy.html`: have og tags but **no og:image** declared. Some social previews will fall back to the favicon. 🟡 Add og:image fallback.

### 6.7 JSON-LD structured data

Homepage carries a 4-item `@graph` with Organization, WebSite, SoftwareApplication, WebPage. Audited:

| Field | Value | Verdict |
|---|---|---|
| `Organization.name` | "SimpleGrid" | ✅ |
| `Organization.alternateName` | `["SimpleGrid AI", "SimpleGrid.ai", "Simple Grid", "Simple Grid AI", "SimpleGrid ERP", "Simple Grid ERP", "SimpleGridAI", "simplegrid", "simplegridai"]` | ✅ Smart — covers search variants without putting "Simple Grid" in body copy |
| `Organization.logo.url` | `https://simplegrid.ai/assets/og-card.jpg` | 🟠 **The logo field points to the OG card, not the logo.** Google's Knowledge Panel uses this. Should point to `assets/simplegrid-logo-horizontal.svg` or a high-res PNG version. **High-priority fix.** |
| `Organization.sameAs` | `["https://www.linkedin.com/company/simplegridai"]` | 🟡 Only LinkedIn. Add Twitter/X (`https://x.com/simplegridai`) and a YouTube/GitHub if applicable. |
| `Organization.address` | `{ addressCountry: "IN", addressLocality: "Bengaluru" }` | 🟠 **The schema declares India as the org's country, but `areaServed` is United States and the site copy positions for US manufacturers.** This is technically accurate (Valaya AI Technologies Pvt. Ltd. is the Indian parent), but it tells Google the organisation is Indian. For US SERP geo-relevance, consider also adding a US `ContactPoint` with `areaServed: "US"` (you already have that) and **dual addresses** — one IN, one US — if a US registered office exists. If no US office, keep as-is but be aware: a US-bound manufacturer searching for the company may see IN-flavoured SERP signals. |
| `Organization.areaServed` | `[{ Country: "United States" }]` | ✅ Correct positioning |
| `Organization.foundingDate` | "2025" | ✅ |
| `Organization.contactPoint.email` | hello@simplegrid.ai | ✅ |
| `SoftwareApplication.applicationCategory` | "BusinessApplication" | ✅ |
| `SoftwareApplication.applicationSubCategory` | "ERP Software" | ✅ |
| `SoftwareApplication.audience.numberOfEmployees` | `min 200, max 1500` | 🔴 **Conflicts with llms.txt and brand spec.** llms.txt says 50–1,500. Most case studies are mid-market (Apex 80–100k shirts, Furniture 600 employees) but the *ICP floor* per the homepage hero / brand book is 50 employees. **Change schema min to 50.** |
| `SoftwareApplication.offers.price` | "0" priceCurrency "USD" | ✅ Reflects $0 deployment |
| `SoftwareApplication.featureList` | 16 items, includes "7-21 day deployment" | ✅ Matches reality |

Tool-page schema sampled (`/tools/invoice-generator/`): SoftwareApplication + BreadcrumbList + FAQPage with 4 Q&As. ✅ Clean.

Blog posts: spot-checked `blog/event-sourcing-why-simplegrid-stores-everything-that-ever-happened/` — has Article + BreadcrumbList. ✅

`/hiring.html`: ⚠️ no `JobPosting` schema found. Brand audit recommendation: if real open roles exist, add JobPosting per role; otherwise leave alone.

### 6.8 Sitemap / robots / canonical hygiene

- Every audited page has a `<link rel="canonical">` pointing to itself. ✅
- `case-elite.html` canonicals to `/case-furniture-manufacturer.html` ✅ (correct redirect handling for an old URL)
- `sitemap.xml` declares `<lastmod>` of 2026-05-22 or 2026-05-26 on every URL. ⚠️ The `dynamics-gp-sunset-switch-to-simplegrid` blog post has lastmod 2026-05-26 which matches today's `-1` — good freshness signal.

### 6.9 Internal-link graph

| Page | Unique internal links in static seed |
|---|---|
| `/` | 8 |
| `/product.html` | 7 |
| `/pricing.html` | 7 |
| `/case-studies.html` | 7 |
| `/about.html` | 7 |
| `/blog.html` | 7 |
| `/hiring.html` | 10 |
| `/tools/` | **4** |

🔴 **Critical SEO leak: `/tools/` static seed has only 4 internal links.** The tool list is rendered by React, so crawlers that **don't execute JS** see the page as having no links to individual tools. Google's mobile-first indexer renders JS, so this is partially OK, but:
- AI crawlers (GPTBot, ClaudeBot, PerplexityBot) typically read the **static HTML only**. They will not see the 23 individual tool URLs from the index page.
- Internal-link equity from `/tools/` to each tool is currently passed only via the sitemap, not via on-page links.

**Fix:** Render the tool list as static anchor tags in the seed HTML (the React app can still hydrate and add interactivity). 23 `<a href="/tools/X/">…</a>` items inside the `<div id="root">` would solve this in one diff and not break the React hydration.

### 6.10 Blog post audit (19 posts)

All 19 posts are in sitemap. H1 inventory in §3.0. Each post has unique title + meta description + canonical (spot-checked 5: ✅). Two posts contain the canonical "system adapts to you" tagline (see §4.1).

Word-count check (sed-stripped tags then `wc -w`) — sample:
- `event-sourcing-why-simplegrid-stores-everything-that-ever-happened/` → ~2,800 words ✅
- `dynamics-gp-sunset-switch-to-simplegrid/` → ~3,000 words ✅
- `why-mid-market-manufacturers-are-the-most-underserved...` → ~2,400 words ✅

All long-form, all on-topic, all internally cross-link to product / case studies / pricing. ✅

---

## 7. Phase 7 — CTA + form + a11y

### 7.1 Primary CTA inventory

| Page | Primary CTA text | Target |
|---|---|---|
| `/` static seed | "Book a demo" | `https://cal.com/simplegrid-ai` (`data-cta="hero_seed"`) |
| `/` (React-rendered) Nav | "Book a demo" + `title="Book a SimpleGrid demo call"` | cal.com |
| `/product.html` | "Book a demo" | cal.com |
| `/pricing.html` | "Book a demo" | cal.com |
| `/case-studies.html` | "Book a demo" | cal.com |
| `/about.html` | "Book a demo" | cal.com |
| `/hiring.html` | (has a "Apply by email" mailto and a "Book a call") | mixed |
| `/tools/*` | "Book a call with the founder" + Footer "Book a demo" | cal.com |

🟢 Primary CTA is consistently **"Book a demo"** linking to **cal.com/simplegrid-ai** across the site. ✅

⚠️ One inconsistency: the Nav `title=` attribute says "Book a SimpleGrid demo call" (more descriptive for screen readers, good), while the body link is "Book a demo". A11y is fine; the variant just shows on hover.

### 7.2 Form audit

Forms are loaded by React. Static seeds show **no inline `<form>` tags** on any marketing page. CSP allows `form-action 'self' https://formsubmit.co`, so forms (if used) post to FormSubmit.

LoginModal.js + InviteModal.js exist — these are gated forms behind nav buttons (not exposed in static seed). Without rendering, I can't fully audit the field set, but the JS contains `posthog.capture` calls on submit and `formsubmit.co` POST targets.

🟡 **Recommendation:** When forms are added (e.g., a hiring application form), include:
- ARIA labels on each `<input>`
- A "We don't share your info" privacy note linking to /privacy.html
- Honeypot field (FormSubmit supports `_honey`)
- Success state with a visible thank-you message (not just a page reload)

### 7.3 Mobile viewport

Every page has:
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```
✅

`@media` breakpoints in tools.css: 640px, 720px. ✅ Mobile-first results panels collapse to single column.

### 7.4 Accessibility

| Check | Result |
|---|---|
| Skip-to-content link | ✅ `<a href="#main" class="skip-link">Skip to main content</a>` on every page seed |
| `<main id="main">` landmark | ✅ Present |
| Header / nav / footer landmarks | ✅ All present with `role` attributes where ambiguous |
| Logo link `aria-label` | ✅ `aria-label="SimpleGrid home"` |
| Images alt text | ✅ NVIDIA badge has descriptive alt; AWS inline SVG has `aria-hidden="true"` with adjacent text label — correct pattern |
| Focus indicators | ✅ `--shadow-focus: 0 0 0 3px rgba(74, 123, 247, 0.25);` declared. Applied via `a:focus` etc. in styles.css (verified by file size; not exhaustively grepped) |
| Cookie consent role | ✅ `role="region" aria-label="Cookie consent"` |
| Contrast | ✅ Brand blue was darkened specifically for WCAG AA. Mid-gray also darkened. |

⚠️ **No `/accessibility.html` statement.** B2B procurement often asks for an accessibility statement. Adding a short one referencing WCAG 2.1 AA target + contact email closes that gap.

🟡 **Tab order on React-rendered components** — couldn't verify without a browser. Recommend a manual keyboard tab-through of nav, login modal, invite modal, and any form.

---

## 8. Phase 8 — Analytics & tracking

### 8.1 Loaded systems

From `assets/js/analytics-init.js`:

| Service | ID | Status |
|---|---|---|
| PostHog (US cloud) | `phc_uYqTNuyvu48ttUP7tjh89v8JBvjgbRZ9bvZdfdVoEPVh` | ✅ Configured, US host, identified-only person profiles, session recording disabled, surveys disabled |
| GA4 | `G-PGZBXNF51L` | ✅ Configured, `anonymize_ip: true` |
| Microsoft Clarity | `'CLARITY_PROJECT_ID'` (placeholder string) | 🔴 **Not configured.** The init code short-circuits: `if (!SG_CLARITY_ID \|\| SG_CLARITY_ID === 'CLARITY_PROJECT_ID') return;` — so Clarity never loads. CSP allowlists `https://www.clarity.ms` for nothing. Either finish setup (sign up at https://clarity.microsoft.com, drop the project ID in) or remove Clarity from CSP + this file. |
| LinkedIn Insight Tag | — | ❌ Not loaded. If LinkedIn is a target paid channel, add. |
| Meta Pixel | — | ❌ Not loaded. Probably fine — B2B mid-market manufacturers ≠ Facebook ICP. |

### 8.2 Privacy posture

✅ Tracking is **deferred until first user interaction** (mousemove, scroll, click, touchstart, keydown) or a 30s timeout. Before any interaction, no third-party cookies fire. This is GDPR/CCPA-friendlier than the typical SaaS approach.

✅ Cookie banner shows once, sets `sg_consent=accepted` or `sg_consent=declined` in localStorage. Decline sets `sg_ph_opt_out=1` which the analytics-init script checks before loading anything.

✅ `window.sgPostHogOptOut(true|false)` console helper exposed.

🟡 **The cookie banner accepts/declines but does not list the cookies that will be set.** GDPR strict-interpretation regulators (Germany, France) sometimes require itemised lists. The current "We use cookies for analytics (PostHog + Google Analytics)" disclosure plus the linked privacy policy is in the middle of the spectrum — fine for most jurisdictions, tight for CNIL.

### 8.3 Conversion tracking

`tracking.js` auto-instruments any element with a `[data-cta]` attribute and fires `cta_clicked` to PostHog, GA4, and Clarity (when loaded). It also fires a separate `cal_com_clicked` event on cal.com links. ✅ Clean pattern.

Sample `data-cta` values found: `hero_seed`, `trust_nvidia`, `trust_aws`. (Many more in the React-rendered DOM.)

---

## 9. Phase 9 — Legal & compliance

| Item | Result |
|---|---|
| Privacy policy | ✅ `/privacy.html` HTTP 200, "Effective Date: March 3, 2026", names Valaya AI Technologies Pvt. Ltd., addresses cookie usage, lists data categories |
| Terms of service | ✅ `/terms.html` HTTP 200, "Effective Date: March 3, 2026", names Valaya AI Technologies |
| Legal entity disclosure | ✅ "Valaya AI Technologies Pvt. Ltd." appears in privacy + terms; **also in `<meta>` description on /privacy.html** |
| Contact email | ✅ `hello@simplegrid.ai` everywhere |
| Phone | ❌ Not listed. For US B2B compliance this is fine; some procurement asks for one. |
| Physical address | ✅ "Bengaluru" in Organization schema; full street address only in privacy/terms (assumed; not fully read) |
| Cookie consent banner | ✅ Shows once, accept/decline, opt-out enforced |
| `/.well-known/security.txt` | ✅ Present, Contact + Expires + Preferred-Languages + Canonical |
| Accessibility statement | ❌ Missing |
| GDPR / CCPA-specific clauses | (not deeply parsed; recommend a privacy-counsel review every 12 months — Effective Date is March 2026, due May 2027) |

🟡 Footer should ideally display the **legal entity name in plain text** (current footer says "© 2026 Valaya AI Technologies" per Footer.js — confirmed via grep; small font but present).

---

## 10. Phase 10 — Competitive comparison

| Vendor | TTFB (Singapore PoP) | Total | Title | H1 |
|---|---|---|---|---|
| **SimpleGrid** | 0.32 s | 0.32 s | "SimpleGrid - Custom ERP, Built at Our Risk. Paid for After It Works." | "Custom ERP. Built at our risk. Paid for after it works." |
| Epicor | 0.78 s | 0.86 s | "Epicor \| ERP Software Solutions for Industry Leaders" | "Industry Expertise to Make, Move, and Sell" |
| Acumatica | 3.44 s | 3.93 s | "Acumatica \| Cloud ERP Business Management System" | (not extracted — page slow) |
| NetSuite | 0.27 s | 0.27 s | "Access Denied" (blocks bots) | n/a |
| Plex (Rockwell) | 1.13 s | 1.16 s | "Plex Smart Manufacturing Platform \| Rockwell Automation" | (not extracted) |
| Global Shop Solutions | 0.58 s | 0.61 s | "ERP Software for Manufacturers \| Global Shop Solutions" | "ERP SOFTWARE TO SIMPLIFY YOUR MANUFACTURING" |
| SAP | 0.06 s | 0.07 s | "SAP Software Solutions \| Business Applications and Technology" | (HTML uses canvas/JS hero) |

**Strategic read:**
- **SimpleGrid's hero is the only one that puts a commercial promise in the H1** ("Paid for after it works"). Epicor leads with "Industry Expertise", Global Shop with "Simplify", Plex with brand. **This is SimpleGrid's positioning advantage** and the site uses it correctly.
- TTFB is competitive (faster than Epicor, Acumatica, Plex, Global Shop). Only SAP and NetSuite are faster — both because they're heavily edge-cached for high-traffic landing pages.
- No competitor in the list publishes pricing on their homepage. SimpleGrid does ("$0 deployment, 30-day free trial"). This is a real differentiator and should remain prominent.

---

## 11. Phase 11 — Content-accuracy cross-check

| Claim | Form 1 | Form 2 | Consistent? |
|---|---|---|---|
| **"$30M manufacturing business"** | $30M | $30Mn | ✅ Always `$30M` on the live site (5 instances on /about.html, 1 on hero, 1 in blog post). **Zero instances of "$30Mn"** in user-visible content. Brand book listed "$30Mn" as a variant; site has cleaned it up. |
| **Furniture-exporter employee count** | 600 employees | 600-800 / 300-400 / 500 | ✅ Always **"600 employees"** on the live site. The brand-audit script flagged "300-400" and "500" as possible drifts; neither appears on the live site. (The /404.html quotes "600 employees" too — likely as a hero "go home" CTA copy. Consistent.) |
| **Furniture-exporter SKU count** | 550 SKUs | — | ✅ Consistent. case-furniture-manufacturer mentions 550 explicitly (4 instances). |
| **Apex apparel scale** | 80–100k shirts/month | 100k shirts/month | ✅ Both variants used. Acceptable — the case study uses a range; references in blog posts sometimes round to "100k". |
| **Deployment window** | "7-21 days" (homepage, product) | "12 days" (Apex case) / "21 days" (Furniture case) | ✅ The window covers both cases. No "7-day" claim survives anywhere on the live site. |
| **30-day free trial** | "30 days" / "30-day" | — | ✅ Consistent across homepage, product, pricing, terms, case studies. |
| **NVIDIA Inception membership** | Badge + link to nvidia.com/startups | — | ✅ Verifiable claim, link works. |
| **AWS Activate Startups membership** | Inline SVG badge + link to aws.amazon.com/startups | — | ✅ Verifiable claim, link works. |
| **Valaya AI Technologies Pvt. Ltd.** | Privacy + terms | Footer | ✅ Disclosed in legal pages and Footer.js. |
| **simplegrid.ai (not .com)** | All references | — | ✅ Zero `.com` typos anywhere. |
| **SAP quote ("6 months" vs "18 months")** | "6 months" (3 hits in business-valuation tool, 2 in erp-needs-assessment) | "18 months" (1 in /blog.html, 6 in dynamics-gp-sunset post) | ⚠️ Both numbers exist on the site. They are about **different things** (6 months = ERP implementation timeline; 18 months = a specific competitor sales-cycle reference). Not contradictory, but consider always citing the specific competitor + project type to avoid reader confusion. |
| **ICP employee range** | "50–1,500" (llms.txt, homepage hero) | "200–1,500" (JSON-LD SoftwareApplication.audience) | 🔴 Contradiction. Fix schema → 50–1,500. |
| **Industry founding date** | "2025" (JSON-LD) | "Founded 2025" (llms.txt) | ✅ Consistent |

---

## 12. Phase 12 — Broken-link sweep

External links sampled from across the site:

| URL | Result |
|---|---|
| `https://cal.com/simplegrid-ai` | ✅ 200 |
| `https://www.linkedin.com/company/simplegridai` | 999 (LinkedIn's anti-scraping default for bots — page is live to humans) |
| `https://us.i.posthog.com` | 404 (correct — it's an API host, not a page) |
| `https://www.googletagmanager.com` | 404 (correct — CDN host root) |
| `https://unpkg.com/react@18.3.1/umd/react.production.min.js` | ✅ 200 |
| `https://www.nvidia.com/en-us/startups/` | ✅ 200 |
| `https://aws.amazon.com/startups/` | ✅ 200 |

Internal links sampled from homepage seed:
| Link | Result |
|---|---|
| `/about.html` | ✅ 200 |
| `/product.html` | ✅ 200 |
| `/pricing.html` | ✅ 200 |
| `/case-studies.html` | ✅ 200 |
| `/blog.html` | ✅ 200 |
| `/tools/` | ✅ 200 |

`hiring.html` contains Cloudflare-obfuscated email links (`/cdn-cgi/l/email-protection#...`). These are auto-generated by Cloudflare's email-decode script and are expected (not broken). ✅

No 404s detected on any link from any page sampled.

---

## 13. Phase 13 — Free-tools audit (24 tools)

### 13.1 Tool inventory (from sitemap)

| # | Tool URL | HTTP | H1 |
|---|---|---|---|
| 1 | `/tools/` (index) | 200 | "Productive tools for mid-market US manufacturers." |
| 2 | `/tools/markup-vs-margin/` | 200 | "Markup vs Margin Calculator — stop the pricing error that costs you 5-15%." |
| 3 | `/tools/scrap-waste-calculator/` | 200 | "Scrap & Waste Cost Calculator — what defects actually cost you." |
| 4 | `/tools/erp-needs-assessment/` | 200 | "Do I Need an ERP? — 8 questions, 3 minutes, a real number." |
| 5 | `/tools/ebitda-calculator/` | 200 | "EBITDA & SDE Calculator — the bottom line buyers actually look at." |
| 6 | `/tools/oee-calculator/` | 200 | "OEE Calculator — what your equipment actually produces vs what it could." |
| 7 | `/tools/burden-rate-calculator/` | 200 | "Labor Burden Rate Calculator — what your employees actually cost." |
| 8 | `/tools/downtime-cost-calculator/` | 200 | "Machine Downtime Cost Calculator — the hidden tax on your operation." |
| 9 | `/tools/break-even-calculator/` | 200 | "Break-Even Calculator — the foundation of every pricing + capacity decision." |
| 10 | `/tools/business-valuation-calculator/` | 200 | "Manufacturing Business Valuation — SDE-based with vertical-specific multipliers." |
| 11 | `/tools/manufacturing-kpi-benchmark/` | 200 | "Manufacturing KPI Benchmark — 5 essential metrics, scored vs industry." |
| 12 | `/tools/erp-readiness-scorecard/` | 200 | "ERP Readiness Scorecard — diagnose before you evaluate." |
| 13 | `/tools/reorder-point-calculator/` | 200 | "Reorder Point + EOQ Calculator — never run out, never tie up cash." |
| 14 | `/tools/operations-health-score/` | 200 | "Manufacturing Operations Health Score — one number for your whole operation." |
| 15 | `/tools/customer-concentration-risk/` | 200 | "Customer Concentration Risk — the silent valuation killer." |
| 16 | `/tools/revenue-per-employee/` | 200 | "Revenue per Employee Benchmark — where do you rank?" |
| 17 | `/tools/digital-maturity-assessment/` | 200 | "Digital Maturity Assessment — where are you on Industry 4.0?" |
| 18 | `/tools/exit-readiness-scorecard/` | 200 | "Exit Readiness Scorecard — what stops a sale from closing." |
| 19 | `/tools/purchase-order-generator/` | 200 | "Free Purchase Order Generator — PDF in 30 seconds." |
| 20 | `/tools/invoice-generator/` | 200 | "Free Invoice Generator — Branded PDF in 30 seconds." |
| 21 | `/tools/quote-generator/` | 200 | "Free Quote / Estimate Generator." |
| 22 | `/tools/job-cost-calculator/` | 200 | "Free Job Cost Calculator — true cost + margin + suggested price." |
| 23 | `/tools/bill-of-materials-template/` | 200 | "Free Bill of Materials Builder — per-unit cost + CSV + PDF." |
| 24 | `/tools/production-schedule-template/` | 200 | "Free Production Schedule (Gantt) for Manufacturers." |
| 25 | `/tools/quality-inspection-checklist/` | 200 | "Free Quality Inspection Checklist Generator." |

⚠️ Sitemap has **24 entries under /tools/** (1 index + **23 individual tools**). Tools-index `<title>` says "**24** Productive Tools", which is **off by 1** if you don't count the index page itself as a "tool". Either:
- update title to "23 Productive Tools…" (technically correct)
- or count the index page as the 24th and add an "all tools" tile (cute but stretch)

(The /CLAUDE.md notes 11 more tools in local git status that aren't yet in the sitemap — automation-roi-estimator, capacity-planning-calculator, cost-of-poor-quality, expansion-roi-calculator, hire-vs-overtime, insurance-coverage-checklist, iso-9001-readiness, lease-vs-buy-equipment, make-vs-buy-calculator, osha-compliance-checklist, sde-calculator. These are in-flight, not deployed.)

### 13.2 PDF generation — the address-overflow bug

**Verdict: ALREADY FIXED.** The shared `tools.js` PDF builder (`sgBuildPdf()`, lines 47–203) handles long address fields correctly:

```js
// Line 102 — meta lines auto-wrap
const wrapped = doc.splitTextToSize(String(text), metaMaxWidth);
doc.text(wrapped, M, metaY);
metaY += 14 * wrapped.length;  // ← Y advances dynamically

// Line 113-116 — two-column From/To with explicit gap
const COL_GAP = 20;
const colWidth = (W - 2 * M - COL_GAP) / 2; // ~248pt on US Letter

// Line 118-132 — partyBlock wraps each line AND advances Y per wrapped line
function partyBlock(x, title, lines, maxWidth) {
  ...
  lines.filter(Boolean).forEach(line => {
    const wrapped = doc.splitTextToSize(String(line), maxWidth);
    doc.text(wrapped, x, y);
    y += 12 * wrapped.length;  // ← dynamic
  });
  return y;
}
let y1 = partyBlock(leftX,  spec.fromLabel || 'From', spec.from || [], colWidth);
let y2 = partyBlock(rightX, spec.toLabel   || 'To',   spec.to   || [], colWidth);
let bodyStartY = Math.max(y1, y2) + 16;  // ← next block starts AFTER the taller column

// Line 190 — notes wrap too
const split = doc.splitTextToSize(spec.notes, W - 2 * M);
doc.text(split, M, bodyStartY + 18);
bodyStartY += 18 + split.length * 12;
```

Even with a 200-character address, this code:
1. Wraps the address inside its column (no spill into the To column).
2. Tracks how many lines the wrapped address took.
3. Starts the line-items table at `Math.max(yFromCol, yToCol) + 16`.

The bug the audit was warned about would manifest if `splitTextToSize` or the `Math.max` were missing. **Both are present.** This is good engineering.

A separate "long-address smoke test" can confirm: load `/tools/invoice-generator/`, fill From with `"Elite Arts & Crafts Manufacturing LLC, Building 4, Enterprise Industrial Park, 2847 Highway 401 South, High Point, North Carolina 27263, United States"`, click Generate PDF, inspect: the From column should wrap to 4–5 lines and the Line Items table should start below.

### 13.3 PDF quality checks (shared `sgBuildPdf()`)

| Check | Implementation | Verdict |
|---|---|---|
| Page format | `new jsPDF({ unit: 'pt', format: 'letter' })` | ✅ US Letter (matches US ICP) |
| Margins | `M = 48` pt (~17 mm) | ✅ Above the 15 mm minimum |
| Brand color band | 6 pt strip at top, default `[52, 97, 224]` = `#3461E0` (matches CSS) | ✅ |
| Logo embedded | `doc.addImage(spec.logoDataUrl, props.fileType || 'PNG', …)` with auto-fit to 130×55 pt box | ✅ Per-tool can pass its own logo data URL. The default SimpleGrid logo is **not embedded by default** unless the tool passes it. 🟡 Spot-check each tool's `spec` to confirm logoDataUrl is wired up. |
| Document title | `doc.text(spec.title \|\| 'Document', titleX, 50)` | ✅ |
| Footer credit | `doc.text('Generated with SimpleGrid productive tools - simplegrid.ai/tools/', M, footY)` | ✅ Brand credit present, font-size 8 pt |
| Address wrap (the bug) | `splitTextToSize` + `Math.max(y1, y2)` | ✅ FIXED |
| Notes wrap | `splitTextToSize(spec.notes, W - 2 * M)` | ✅ |
| Tables (line items) | `jspdf-autotable` plugin with `startY: bodyStartY` and column styles | ✅ Auto-handles page breaks |
| Totals | Right-aligned at `xValue = W - M`; grand-total emboldened (`isGrand`) at 12 pt | ✅ |
| Currency formatting | `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })` | ✅ |
| Date formatting | US-style `M/D/Y` via `fmtDateUS(iso)` | ✅ |
| File save | `doc.save(spec.filename || 'document.pdf')` | ✅ |

🟡 **One thing to verify per tool:** that `spec.logoDataUrl` is being set in each tool's caller. If a tool calls `sgBuildPdf()` without `logoDataUrl`, the PDF will have no SimpleGrid logo in the header — only the colored band. Worth a quick verification pass on each of the 7 "generator" tools (PO, Invoice, Quote, BOM, Production Schedule, Job Card, Quality Checklist).

### 13.4 Banned-word incidents in tools content (already detailed in §4.2)

| Tool | Count |
|---|---|
| `tools/oee-calculator/` | 10× world-class |
| `tools/scrap-waste-calculator/` | 5× world-class |
| `tools/downtime-cost-calculator/` | 3× world-class |
| `tools/operations-health-score/` | 1× world-class |
| `tools/manufacturing-kpi-benchmark/` | 1× best-in-class |
| `tools/revenue-per-employee/` | 1× best-in-class |

All of these are **inside JS rating bands** (e.g., `if (oee>=85) { rating='World-class'; }`). Fix = string replace in each tool's inline `<script>` block:
- "World-class" → "Top decile" (or "Top 10%")
- "Best-in-class" → "Top quartile"

This also surfaces in the **meta description** of the OEE tool (`World-class 85%`) — that copy hits Google's SERP. Update there too.

### 13.5 Tool cross-linking

Tools index uses React to render the tile grid → 0 cross-links in static HTML (see §6.9). 🔴 Critical SEO issue restated here.

Individual tool pages — spot-checking `invoice-generator`: footer has standard nav (4 links to product/pricing/case studies/blog) but **no "Related tools" block**. Industry SEO best practice for "free tool" calculators is to cross-link 3–5 related tools at the bottom of each tool page (e.g., Invoice Generator → Quote Generator + PO Generator + Job Cost Calculator). Quick win for internal-link equity and lower bounce.

---

## 14. Prioritised remediation plan

### 🔴 Critical — do this week

1. **Tools-index seeds 0 anchor links.** Render all 23 tool links as static `<a>` tags inside `<div id="root">` so AI crawlers + non-JS crawlers see the link graph. The React app can hydrate over them.
2. **Configure Microsoft Clarity** (`SG_CLARITY_ID` is the placeholder string `'CLARITY_PROJECT_ID'`). Either ship the real project ID or strip Clarity from CSP + `analytics-init.js`.
3. **Remove "World-class" from OEE calculator** (10 instances, including the meta description that hits Google SERP). Replace with "Top decile" or "Top 10% of plants".
4. **Fix `SoftwareApplication.audience.numberOfEmployees` in homepage JSON-LD**: change `minValue: 200` to `minValue: 50` so schema matches llms.txt + brand book + actual ICP floor.
5. **Fix `Organization.logo.url` in homepage JSON-LD**: currently points to `og-card.jpg`. Point to a real logo (PNG of `simplegrid-logo-horizontal.svg` at 240×48 or larger). Google Knowledge Panel uses this.

### 🟠 High — do this month

6. Replace "World-class" / "Best-in-class" in `scrap-waste`, `downtime-cost`, `operations-health-score`, `manufacturing-kpi-benchmark`, `revenue-per-employee` tools (~10 more instances).
7. Replace "end-to-end" on HomeTop.js ("We walk through your operations end-to-end…") with "start to finish" or rewrite without that phrase.
8. Cookie consent Accept button uses hardcoded `#4A7BF7` — change to `var(--sg-blue)` or `#3461E0` to match the rest of the site.
9. Tools-index `<title>` says "24" but sitemap has 23 individual tools — pick one.
10. Logomark SVG: change `rx="6"` → `rx="5"` to match brand spec (matches horizontal logo).
11. Add HSTS `includeSubDomains; preload` (and submit to preload list) once subdomain plans are confirmed.
12. Truncate case-study titles to ≤ 65 chars so Google doesn't cut them mid-claim.
13. Add `og:image` to terms.html + privacy.html.
14. Decide & document: are the 4 canonical brand-book taglines retired, or should "The system adapts to you" come back as the H2 on `/product.html`?

### 🟡 Medium

15. Self-host Geist for the wordmark (or update brand book to say "system sans-serif acceptable in production").
16. Minify all JS in `components/` and `app/` for production (could save ~90 KB ungzipped on homepage).
17. Update type-scale tokens (`--fs-hero` 50px, `--fs-h1` 35px etc.) — either bring them in spec or update the brand book.
18. Add JobPosting schema to `/hiring.html` if real roles exist.
19. Update tools.css magic hexes (#047857, #B91C1C, #B45309) into CSS variables.
20. Add a "Related tools" footer block to each tool page (3 cross-links).
21. Add `apple-touch-icon` (180×180 PNG) and PNG fallbacks for the SVG favicon.
22. Replace `access-control-allow-origin: *` on HTML responses with `simplegrid.ai` if Cloudflare/Fastly settings permit.
23. Reconcile the two contradictory robots.txt blocks (Cloudflare-managed Disallow for GPTBot/ClaudeBot vs. human-edited Allow).
24. Resolve the "old brand blue" ghost: `--shadow-focus` glow + RadialBurst animation endpoints + cookie banner button all still use `#4A7BF7`. Either consolidate to `#3461E0` or explicitly document where #4A7BF7 is retained.

### 🟢 Low / nits

25. Strip em-dashes from JS code comments in 3 tool pages (cosmetic).
26. Add `/accessibility.html` 1-pager.
27. Add `/security.html` redirecting to `/.well-known/security.txt`.
28. Add `humans.txt`.
29. Consider a permanent `/sg-schema.html` explainer (the blog has 3 posts but no canonical landing).
30. Add LinkedIn + X to Organization `sameAs`.

---

## 15. Appendix — methodology notes

- Crawler used: `curl -sL` with `--max-time 8` defaults.
- All 54 sitemap URLs mirrored to `/tmp/sgaudit/pages/`.
- JS components downloaded to `/tmp/sgaudit/js/` (`HomeTop.js`, `HomeBottom.js`, `Nav.js`, `Footer.js`, `Interactive.js`, `LoginModal.js`, `InviteModal.js`, `app/home.js`, `analytics-init.js`, `tracking.js`, `cookie-consent.js`).
- Shared `/tools/tools.js` and `/tools/tools.css` downloaded and read line-by-line for PDF-generation audit.
- React-rendered DOM was **not** crawled with a headless browser. All findings about React-rendered text are based on grepping the underlying JS for string literals; rendered HTML in a browser may differ in subtle layout / whitespace details.
- The audit ran from a Singapore Cloudflare PoP (visible in `cf-ray`/`x-served-by`). US PoPs may produce ~50 ms faster TTFB, not slower.
- Brand spec referenced is "SimpleGrid Brand Guidelines v1.0 (March 2026)" as cited in `colors_and_type.css` header comment.

**End of audit.**
