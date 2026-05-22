# SEO Audit - Phase 1 Report

**Repo:** `/Users/mukundagarwal/Desktop/SimpleGridUI`
**Domain:** `simplegrid.ai`
**Audit date:** 2026-04-27
**Pages crawled:** 11 static `.html` files + 17 dynamic blog posts (rendered from `data/blogs.js` via `post.html?id=N`).
**No code changes made in this phase. Read-only audit.**

---

## A. Tech overview

| Aspect | Status |
|---|---|
| Framework | Plain static HTML + React 18 loaded as UMD CDN scripts + JSX transpiled in-browser by `@babel/standalone@7.29.0` |
| Build tool | None. There is no build step. JSX runs through Babel client-side at every page load |
| Hosting | GitHub Pages, custom domain `simplegrid.ai` (CNAME present) |
| SSR/SSG/CSR | **100% CSR** - every page boots an empty `<div id="root"></div>` and React hydrates after Babel finishes transpiling |
| Pre-rendered HTML | ❌ None. The static HTML files contain only `<head>` metadata + 3 CDN script tags + the React mount point. **All body content (H1, H2, H3, copy, images) only exists after JavaScript runs** |
| Sitemap | `sitemap.xml` exists at root. 28 URLs (10 pages + 17 blog posts + home + 1 obsolete `build.html` reference recently removed). All `lastmod` = same hardcoded date `2026-04-27`. No `changefreq` |
| robots.txt | `Allow: /`, sitemap referenced. No disallow rules. No staging/admin protection (none needed yet) |
| Service worker / manifest | None |

**🚨 Most consequential finding - render path:**

Every page ships ~140 KB of CDN JavaScript (React 18.3.1 + ReactDOM + Babel standalone) that runs synchronously before any content paints. Until that completes, the rendered HTML at `view-source:simplegrid.ai/index.html` is essentially empty:

```html
<body>
  <div id="root"></div>
  <script src="...react..."></script>
  <script src="...react-dom..."></script>
  <script src="...babel.min.js"></script>
  <script type="text/babel" src="components/Nav.jsx"></script>
  ...
  <script type="text/babel">function App(){...}</script>
</body>
```

Implications:
1. **Googlebot DOES execute JS** so it will eventually see content, but pays a render-budget cost. Expect crawl-and-render lag (days to weeks for new pages).
2. **Bing, DuckDuckGo, LinkedInBot, Slackbot, Twitterbot do NOT reliably execute JS.** Social previews + non-Google search engines will see only the head metadata. The `og:title` / `og:description` IS picked up (they're in the static head) - so social sharing works - but body keywords for ranking outside Google are invisible.
3. **No `<noscript>` fallback content exists.** A user with JS off sees a blank page.
4. **Babel in production** is the single biggest performance and SEO risk in this codebase. Industry standard is to pre-transpile JSX at build time. Recommendation tier P1 in the fix list.

---

## B. Per-page table

Title and description char counts measured. All H1/H2/H3 counts collected from React component sources (since pages render client-side, headings are not in the static HTML - they're in JSX). Word count is approximate, measured from rendered body text in the React components for that page.

| URL | Title (chars) | Meta Desc (chars) | H1 (count + text) | H2 count | H3 count | Hierarchy valid? | Primary KW in H1? | JSON-LD types | Canonical set? | OG tags | Word count | Internal links out (body) | Internal links in | Critical issues |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` (index.html) | 76 ❌ over 60 | 173 ❌ over 155 | 1 - "You don't adapt to the system. The system adapts to you." | 7 | 13 | ✅ | ❌ Primary KW "AI ERP for manufacturers" not in H1. H1 is brand-tagline, not keyword | Organization, WebSite, SoftwareApplication (combined @graph) | ✅ self-canonical | ✅ full set | ~1,400 | 2 (case-elite, case-apex) | Linked from every page via Nav | H1 has no keyword. Title 16 chars over budget. Body internal links nearly absent (only ProofSection card links) |
| `/product.html` | 78 ❌ | 199 ❌ | 1 - "Stop running your factory on messaging apps and Excel sheets." | 6 | 5 | ✅ | ❌ "how SimpleGrid ERP works" not in H1 | ❌ NONE | ✅ | ✅ full set | ~900 | 0 body internal links | Linked from Nav, Footer (6 anchor links to sections) | No JSON-LD at all. H1 doesn't contain primary KW. Body has ZERO outbound internal links to industry / case study / about pages |
| `/case-studies.html` | 80 ❌ | 242 ❌ | ❌ NO H1 | 2 | 2 | ❌ Missing H1 | N/A | ❌ NONE | ✅ | ✅ full set | ~250 | 2 (case-elite, case-apex) | Nav, Footer, home ProofSection | **No H1 on a top-priority commercial page.** Title 20 chars over. Description 87 over. No JSON-LD |
| `/case-elite.html` | 73 ❌ | 217 ❌ | 1 - "How a furniture exporter with 800 employees went from Excel to a live ERP in 21 days" | 7 | 2 | ✅ | ⚠️ "ERP for furniture manufacturers" not present in H1 (H1 is narrative, not keyword) | ❌ NONE | ✅ | ✅ full set | ~2,800 | 0 | Nav, Footer, case-studies | Long-form content, deep word count, but no Article/Case-study schema. Body has ZERO outbound internal links. Image alt text on `assets/elite-factory.jpeg` only set in head meta - image inside body has no alt |
| `/case-apex.html` | 67 ❌ | 216 ❌ | 1 - "An apparel manufacturer running 80,000–100,000 shirts a month - without a factory of his own." | 5 | 3 | ✅ | ⚠️ "ERP for apparel manufacturers" not in H1 | ❌ NONE | ✅ | ✅ full set | ~2,200 | 0 | Nav, Footer, case-studies | Same story as Elite. No schema. No body links. Title 7 over budget |
| `/blog.html` | 87 ❌ | 245 ❌ | ❌ NO H1 - uses `<h2>` "Straight talk about ERP and operations." | 1 | 17 (each post card) | ❌ Missing H1 | N/A | ❌ NONE | ✅ | ✅ full set | ~50 | 17 (each blog post card) | Nav, Footer | **No H1.** Title 27 over. ItemList/Blog schema missing |
| `/post.html` | 89 ❌ | 187 ❌ | 1 - `{blog.title}` (dynamic, set by JS) | dynamic | dynamic | ✅ at runtime | ⚠️ Depends on blog | ❌ NONE | ❌ Wrong - canonical points to `/blog.html`, not `/post.html?id=N` (recently changed by JS effect, but static canonical is wrong for crawlers that don't execute JS) | ✅ but generic, JS rewrites per post | ~1,500–3,000 per post | 0 (only "← Back to blog") | Nav, Footer, blog.html | **Canonical wrong.** No Article schema even after JS runs. URLs use `?id=N` query params - search engines may treat `?id=1` and `?id=2` as same canonical URL. Should be `/blog/post-slug` |
| `/about.html` | 78 ❌ | 246 ❌ | ❌ NO H1 | 4 | 2 | ❌ Missing H1 | N/A | ❌ NONE | ✅ | ✅ full set | ~900 | 0 | Nav, Footer | **No H1.** Title 18 over. No Person schema for founder |
| `/hiring.html` | 60 ✅ | 175 ❌ | 1 - "Build the ERP every operator wishes existed." | 2 | many (job role accordions) | ✅ | ❌ Not keyword-targeted, fine for hiring | ❌ NONE | ✅ | ✅ full set | ~3,500 | 1 (mailto only) | Nav, Footer | JobPosting schema missing - strong opportunity for Google Jobs SERP |
| `/privacy.html` | 30 ✅ | 102 ✅ | 1 - "Privacy Policy" | 0 | 0 | ✅ | N/A | ❌ NONE | ✅ | partial - missing twitter:* | ~1,500 | 1 (terms) | Footer only | Twitter card tags missing. WebPage schema absent |
| `/terms.html` | 32 ✅ | 80 ✅ | 1 - "Terms of Service" | 0 | 0 | ✅ | N/A | ❌ NONE | ✅ | partial - missing twitter:* | ~2,000 | 1 (privacy) | Footer only | Same as privacy |

**Title length budget summary:** 8 of 11 pages exceed 60 char hard cap. Most overrun is from the redundant ` | SimpleGrid` plus tagline + brand variations.
**Description length budget summary:** 9 of 11 pages exceed 155 char hard cap.

---

## C. Keyword cannibalization check

| Risk | Pages | Note |
|---|---|---|
| 🟡 "Customized ERP for manufacturers" | `/`, `/product.html`, `/about.html`, `/case-studies.html` | Same anchor phrase repeated in 4 different `<title>` tags. Mild cannibalization; pages will compete for the exact phrase. Owners likely intended each page to have its own primary, but phrasing is too similar |
| 🟡 "Fast deployment ERP" / "deploy in 7 days" | `/`, `/product.html`, `/about.html` | Same secondary keyword in title across 3 pages |
| 🟡 "SimpleGrid AI Blog" | `/blog.html`, `/post.html` | Identical og:title. `post.html` is a per-post template; the static title is fine as a fallback but identical OG cards will look like duplicates when shared |
| 🟢 No two pages target identical primary keyword from the brief's keyword map. The cannibalization is mild and copy-driven, not page-strategy driven. |

**Verdict:** Low cannibalization risk today. The bigger problem (Section H below) is that 8 of the 11 primary keywords in the keyword strategy have **no page at all**.

---

## D. JSON-LD audit

| Page | Schema present | Schema missing per Section 4 |
|---|---|---|
| `/` | Organization, WebSite, SoftwareApplication (combined `@graph`, valid syntax) | ✅ matches brief minimum. **Issue:** `alternateName` includes "Simple Grid" and "Simple Grid AI" - brief explicitly bans these brand spellings. Recommend keeping in JSON-LD only IF user wants to intercept misspellings, but this conflicts with Section 1 brand rules. Flag for decision |
| `/product.html` | None | WebPage, SoftwareApplication (with features array, screenshot), HowTo (deployment flow exists conceptually), BreadcrumbList |
| `/case-studies.html` | None | WebPage, BreadcrumbList |
| `/case-elite.html` | None | Article OR CaseStudy, BreadcrumbList, FAQ (could synthesize from existing content), Organization (referenced from home) |
| `/case-apex.html` | None | Same as Elite |
| `/blog.html` | None | WebPage, Blog/ItemList listing all 17 posts, BreadcrumbList |
| `/post.html` | None | **Article (per post - most important miss).** JS could inject this on render but currently doesn't. BreadcrumbList |
| `/about.html` | None | WebPage, Organization (or @id reference to home), Person (founder), BreadcrumbList |
| `/hiring.html` | None | WebPage, BreadcrumbList, **JobPosting (one per role - could surface in Google Jobs).** ~5 roles in `ROLES` array, each could be its own `JobPosting` |
| `/privacy.html` | None | WebPage |
| `/terms.html` | None | WebPage |

**Verdict:** **10 of 11 pages have zero structured data.** The home page `@graph` is well-formed but isolated. No page-specific schema, no breadcrumbs anywhere, no Article on blog posts (which is the #1 free Google ranking lever for content sites).

---

## E. Sitemap audit

- `sitemap.xml` exists, valid XML, parses.
- 28 URLs total: 10 pages + 17 blog posts + home. Every recommended page in the keyword map is referenced.
- ❌ Every `lastmod` = `2026-04-27` (today's date). This is fine for first deploy but will rot - Google deprioritizes sitemaps where lastmod doesn't reflect actual change dates.
- ❌ No `changefreq` field. Not critical, but recommended in brief.
- ❌ Blog posts use query-param URLs (`/post.html?id=1`). This works but is suboptimal for SEO - clean slugs like `/blog/event-sourcing` would rank better and be more shareable.
- ✅ Sitemap is referenced in `robots.txt`.
- ✅ Sitemap fits well under the 50,000-URL / 50 MB single-file threshold.

---

## F. Image audit

| Image | Path | Size | Format | Alt text in body? | Compression issue? | Lazy loaded? |
|---|---|---|---|---|---|---|
| `simplegrid-logo-horizontal.svg` | `assets/` | 4 KB | SVG ✅ | Used in Nav (alt="SimpleGrid"), Footer (alt="SimpleGrid"). ✅ | No | N/A (above-fold logo) |
| `simplegrid-logomark.svg` | `assets/` | 4 KB | SVG ✅ | Used as favicon | No | N/A |
| `nvidia-inception.png` | `assets/` | 4 KB | PNG | alt="NVIDIA Inception Program" ✅ | No | No (footer, below-fold but not lazy) |
| `elite-factory.jpeg` | `assets/` | **788 KB ❌** | JPEG | Used as `background-image` in CSS - no alt possible. Used in og:image of case-elite, case-studies | **Massive overshoot vs 200 KB budget.** Should be WebP at <120 KB | No (CSS background) |
| `founder.jpg` | `assets/` | **840 KB ❌** | JPG | **Not referenced anywhere in code.** Orphan asset | Massive overshoot | N/A |
| `event_sourcing_landscape_1.png` | `assets/blog/` | 144 KB ⚠️ | PNG | Set via `images[].alt` in `data/blogs.js` and rendered as `<img alt={img.alt}>` ✅ | Just under 200 KB budget but PNG is 2-3× larger than WebP equivalent |  loading="lazy" ✅ |
| `event_sourcing_landscape_2.png` | `assets/blog/` | 164 KB ⚠️ | PNG | ✅ | Same | ✅ |
| `blog2_ddd_same_word_different_domains.png` | `assets/blog/` | 180 KB ⚠️ | PNG | ✅ | Same | ✅ |
| `blog3_aggregates_one_root_many_members.png` | `assets/blog/` | 204 KB ❌ | PNG | ✅ | Just over budget | ✅ |

**OG image audit:** Every page's `og:image` points at either `simplegrid-logo-horizontal.svg` (a 4 KB SVG, **NOT supported by LinkedIn/Twitter/Slack as og:image**) or `elite-factory.jpeg` (788 KB JPEG, way too heavy). Result: most LinkedIn posts will show a broken or generic preview. **High-priority gap - every page needs a dedicated 1200×630 raster og:image (PNG or JPEG).**

**Width/height attributes:** ❌ No `<img>` in the codebase has explicit `width=` / `height=` attributes. This causes Cumulative Layout Shift on every page that loads an image. Hits Core Web Vitals.

**Decorative images:** No issue - backgrounds are CSS, not `<img>`.

**Orphan asset to remove:** `assets/founder.jpg` (840 KB, never referenced - file from a recent untracked add).

---

## G. Internal linking map

### Nav (every page)
| Source | Target | Anchor | Location |
|---|---|---|---|
| Every page | `/index.html` | logo image | Nav (top-left) |
| Every page | `/index.html` | "Home" | Nav |
| Every page | `/product.html` | "Product" | Nav |
| Every page | `/case-studies.html` | "Case studies" | Nav (Resources dropdown) |
| Every page | `/blog.html` | "Blog" | Nav (Resources dropdown) |

### Footer (every page)
| Source | Target | Anchor | Location |
|---|---|---|---|
| Every page | `/product.html#hank` | "Meet Hank" | Footer/Product col |
| Every page | `/product.html#integrations` | "Integrations" | Footer |
| Every page | `/product.html#security` | "Data security" | Footer |
| Every page | `/product.html#ledger` | "Events ledger" | Footer |
| Every page | `/product.html#ability` | "Adoption" | Footer |
| Every page | `/product.html#rules` | "Your process, enforced" | Footer |
| Every page | `/case-studies.html` | "Case studies" | Footer/Resources col |
| Every page | `/blog.html` | "Blog" | Footer/Resources col |
| Every page | `/about.html` | "About" | Footer/Company col |
| Every page | `/about.html#architecture` | "Architecture" | Footer |
| Every page | `/hiring.html` | "Hiring" | Footer |
| Every page | `/privacy.html` | "Privacy Policy" | Footer/Legal |
| Every page | `/terms.html` | "Terms" | Footer/Legal |

### Body-content links (the ones that actually pass real link equity)
| Source | Target | Anchor | Location |
|---|---|---|---|
| `/` (HomeBottom ProofSection) | `/case-elite.html` | "Full case study →" | Body card |
| `/` (HomeBottom ProofSection) | `/case-apex.html` | "Full case study →" | Body card |
| `/case-studies.html` | `/case-elite.html` | proof-card (whole card linked) | Body |
| `/case-studies.html` | `/case-apex.html` | proof-card (whole card linked) | Body |
| `/post.html` | `/blog.html` | "← Back to blog" | Body header |
| `/privacy.html` | `/terms.html` | "Terms of Service" | Body footer line |
| `/terms.html` | `/privacy.html` | "Privacy Policy" | Body footer line |
| `/post.html` (dynamic) | `/post.html?id=N±1` | prev/next post titles | Body footer pager |

**Orphan / under-linked pages:**
| Page | Body inbound links | Issue |
|---|---|---|
| `/product.html` | 0 body links from any page | Only reached via Nav/Footer. Internal link equity is footer-weighted. **Should be linked from home hero, every case study, every blog post.** |
| `/about.html` | 0 body links | Same problem |
| `/hiring.html` | 0 body links | Same |
| `/blog.html` | 1 (from post.html "Back to blog") | Should be linked from product, case studies, home |
| Each individual blog post `/post.html?id=N` | 0 inbound except prev/next chain | No topical linking between related posts. No category landing pages |

**Verdict:** Nav + Footer give every page 24+ links each, which is fine for crawlability - but **link equity from body content is concentrated on the 2 case study pages** (Elite + Apex). Every other page is invisible to body-content link flow. For commercial keywords this matters: Google weighs body-content links far more than navigation chrome.

**Anchor text variety:** "Full case study →" used as anchor for both Elite and Apex from home. Identical anchor for two different targets - fine, but loses keyword opportunity. Better: "How Elite Arts deployed in 21 days" / "How Apex went live in 12 days" - descriptive, keyword-rich.

---

## H. Content gap table (per Section 7)

### Must-have pages
| Page | Status | Note |
|---|---|---|
| Homepage | ✅ exists | |
| Product / How It Works | ✅ `/product.html` | |
| Pricing | ❌ **MISSING** | P0. Brief Section 2 maps a primary keyword to this page; site has no pricing page at all. Currently pricing is buried in CTAs ("Free until it works"). Search intent for "ERP pricing for manufacturers" is high commercial - strong leak |
| About / Founder Story | ✅ `/about.html` | |
| Contact / Book a Demo | ⚠️ Partial - no dedicated `/contact.html`. Booking happens via `https://cal.com/simplegrid-ai` (external link in CTAs). Self-hosted contact page would capture branded "simplegrid contact" + "book demo simplegrid" queries |
| Privacy Policy | ✅ `/privacy.html` | |
| Terms of Service | ✅ `/terms.html` | |

### Industry pages
| Page | Status | Primary keyword | Priority |
|---|---|---|---|
| ERP for Furniture Manufacturers | ❌ **MISSING** | `ERP for furniture manufacturers` | P0 - case-elite.html exists but is a case study, not an industry landing page. Distinct intent |
| ERP for Apparel / Garment Manufacturers | ❌ **MISSING** | `ERP for apparel manufacturers` | P0 - same, case-apex covers a customer not a category |
| ERP for Textile Manufacturers | ❌ **MISSING** | `ERP for textile manufacturers` | P1 |
| ERP for Pharma Distributors | ❌ **MISSING** | `ERP for pharma distributors` | P1 - brief Section 1 lists pharma as ICP, no page exists |
| ERP for D2C Brands | flag only - not in current ICP | P2 (defer) |

### Comparison pages (high commercial intent)
| Page | Status | Primary keyword | Priority |
|---|---|---|---|
| SimpleGrid vs SAP | ❌ MISSING | `SAP alternative for manufacturers` | P0 |
| SimpleGrid vs Zoho | ❌ MISSING | `Zoho alternative manufacturers` | P0 |
| SimpleGrid vs Tally | ❌ MISSING | `Tally alternative for manufacturing` | P0 (huge in India) |
| SimpleGrid vs ERPNext | ❌ MISSING | `ERPNext alternative` | P1 |
| SimpleGrid vs Odoo | ❌ MISSING | `Odoo alternative for manufacturers` | P1 |
| SimpleGrid vs Katana MRP | ❌ MISSING | `Katana MRP alternative` | P1 |

### Trust / proof
| Page | Status | Note |
|---|---|---|
| Case Study: Furniture (Elite) | ✅ | |
| Case Study: Apparel (Apex) | ✅ | |
| FAQ (standalone, comprehensive) | ❌ MISSING | P1. Existing FAQ-like content is scattered in body copy. Standalone `/faq.html` with 15-20 Q&As + FAQPage schema is a Google rich-result lever |
| Blog / Resources | ✅ `/blog.html` with 17 posts | |

### Blog posts (each one is a content opportunity)
17 posts exist in `data/blogs.js`. Topics align well with Section 8's recommended pillars (event sourcing, DDD, multi-tenant, customization, change orders, AI deployment, etc.). Issues:

1. URL structure is `?id=N` query-param, not slugged. Section 8 of brief says "URL slug: short, keyword-rich". P1 fix.
2. No pillar pages link to clusters. Topics are flat.
3. No Article schema on any post (P0).
4. Posts don't link to `/product.html`, `/case-elite.html`, etc. - internal linking gap (P1).

---

## I. Competitor keyword gap (per Section 11)

| Keyword opportunity | Est. intent | Recommended page | Priority |
|---|---|---|---|
| "SAP Business One alternative" | [High] commercial | New `/vs-sap.html` comparison page | P0 |
| "Zoho ERP for manufacturing" | [High] commercial | New `/vs-zoho.html` | P0 |
| "Tally for production" / "Tally manufacturing module" | [High] commercial (India) | New `/vs-tally.html` | P0 |
| "ERPNext for furniture / apparel" | [Medium] commercial | New `/vs-erpnext.html` | P1 |
| "Odoo manufacturing implementation cost" | [Medium] commercial | New `/vs-odoo.html` | P1 |
| "Katana MRP review" | [Low-Medium] commercial | `/vs-katana.html` | P2 |
| "SAP Business One pricing manufacturers" | [Medium] commercial | Embed in vs-sap | P1 |
| "best ERP for furniture export" | [Medium] commercial | Industry landing page | P0 |
| "garment ERP India" / "apparel CMT software" | [High in IN] commercial | Industry landing page | P0 |
| "ERP for 200-person factory" | [Medium] long-tail | New `/erp-for-mid-market-manufacturers.html` pillar | P1 |
| "how long does ERP deployment take" | [Medium] informational | Blog cluster post | P1 |
| "alternative to SAP for small manufacturer" | [Medium] commercial | Comparison or industry page | P0 |
| "ERP free trial manufacturer" | [Medium] commercial | New `/pricing.html` | P0 |
| "ERP without consultants" | [Medium] differentiator | Home + product page emphasis (already good) | already covered |

---

## J. Performance red flags (per Section 5 budgets)

| Budget | Status | Detail |
|---|---|---|
| Total page weight <500 KB first load | ❌ FAIL | React 18.3.1 dev (~120 KB) + ReactDOM dev (~130 KB) + Babel standalone (**~3 MB unminified, ~600 KB minified**) load on every page. Just the CDN scripts blow the budget 2× over. Plus per-page JSX (PostInfographics.jsx is 60 KB, HomeTop.jsx is 43 KB, EventsLedger.jsx is 39 KB). Babel transpiles all of this client-side at every page load |
| Largest Contentful Paint <2.5s | ❌ Almost certainly fail on 4G mobile | Babel blocks render. No measurement done in this audit but recommend Lighthouse run - expect LCP 4-6s on mid-range Android |
| FID <100ms | likely OK once interactive | Long Babel transpile time delays interactivity but once done, app is light |
| CLS <0.1 | ❌ FAIL likely | No `width=`/`height=` on any `<img>`. Lazy-loaded blog images shift layout when they load |
| Render-blocking CSS/JS in head | ❌ FAIL | Three CDN scripts in `<head>` are not async/defer. Two CSS files in `<head>` (colors_and_type.css + styles.css). All block first paint |
| Images lazy-loaded | ⚠️ Partial | Blog body images have `loading="lazy"`. Most other img tags don't (only 4 `<img>` tags total in entire site, since most decoration is CSS background) |
| Images WebP/AVIF | ❌ FAIL | All images are PNG or JPEG. Zero WebP, zero AVIF |
| Fonts preloaded | ❌ FAIL | No `<link rel="preload">` for fonts. Likely using system font stack (`var(--font-heading)`, `var(--font-body)`, `var(--font-mono)` defined in `colors_and_type.css`) - confirm. If system fonts, no issue. If web fonts, missing preload |
| JS bundle <200 KB gzipped | ❌ FAIL | The "bundle" is 600+ KB of Babel + every JSX file shipped raw. Pre-build with esbuild/swc/Vite would cut this to <100 KB |
| Inline `<style>` blocks <5 KB | ✅ | No huge inline styles found. case-elite.html has ~3 KB inline `<style>` (within budget) |
| Third-party scripts | 3 CDN scripts (React, ReactDOM, Babel). No analytics, no GTM, no chat widget | Not a tracking concern; is a perf concern |

**Single highest-impact perf fix:** introduce a build step (Vite/esbuild) so JSX is pre-transpiled. Removes ~600 KB Babel from every page. Estimated LCP improvement: 2-4 seconds on mobile.

---

## K. Mobile issues

| Item | Status |
|---|---|
| Viewport meta tag | ✅ on every page |
| Tap targets ≥48×48 | ✅ - `.btn-sm` is ~32px tall (slight under-spec) but most CTAs are 40px+ |
| Body font ≥16px | ✅ - recent mobile-pass made `.post-content p` 15px at ≤640px (just under recommendation, acceptable) |
| Horizontal scroll | ⚠️ Most demos handled by recent mobile-pass; needs a Lighthouse mobile audit to confirm zero overflow |
| Title length on mobile SERP (~55 chars) | ❌ 8 of 11 titles will be truncated mid-phrase on mobile Google |
| Burger menu present | ✅ recently added |

---

## L. Ranked top-20 fix list

Ranked by **SEO impact (High/Medium/Low) × effort (Quick/Medium/Heavy)**. Quick wins first.

| # | Fix | Impact | Effort | Section |
|---|---|---|---|---|
| 1 | Add H1 to `/case-studies.html`, `/blog.html`, `/about.html` (3 pages currently missing H1 - critical structural issue) | **High** | Quick | §3 |
| 2 | Trim every overlong `<title>` to ≤60 chars; trim every meta description to ≤155 chars (8 + 9 pages affected) | **High** | Quick | §3 |
| 3 | Fix `/post.html` canonical - currently points at `/blog.html`, should self-canonicalize per post (static fallback to `/blog.html?id={id}` or change URL scheme to `/blog/{slug}`) | **High** | Quick | §5 |
| 4 | Add Article JSON-LD to every blog post (via JS injection in post.html's existing render effect) - biggest free Google rich-result lever for content sites | **High** | Quick | §4 |
| 5 | Add `width=` and `height=` attributes to every `<img>` to fix CLS | **High** | Quick | §5 §9 |
| 6 | Add BreadcrumbList JSON-LD to every page > depth 1 (case-elite, case-apex, post, hiring, privacy, terms) | **High** | Quick | §4 |
| 7 | Add WebPage / SoftwareApplication schema to `/product.html` (currently no schema at all) | **High** | Medium | §4 |
| 8 | Build proper 1200×630 raster og:image for at least homepage, product, case studies, each blog post. SVG og:images are not supported by LinkedIn/Twitter/Slack and break social previews | **High** | Medium (design + code) | §9 §10 |
| 9 | Add body-content internal links: `/product.html` should link to case studies and about; case studies should link to product and pricing; home should link to all 4 deeply | **High** | Medium | §6 |
| 10 | Convert `assets/elite-factory.jpeg` (788 KB) and `assets/founder.jpg` (840 KB) to WebP at <120 KB each; add OR delete `founder.jpg` (currently orphaned) | **High** | Medium | §9 |
| 11 | Create `/pricing.html` - high commercial intent, completely missing | **High** | Heavy (copy + page) | §7 |
| 12 | Create industry pages: `/erp-for-furniture-manufacturers.html` and `/erp-for-apparel-manufacturers.html` (case studies are not industry landing pages) | **High** | Heavy | §7 §11 |
| 13 | Create at least 2 of 6 comparison pages (`/vs-sap.html`, `/vs-tally.html`) - high commercial intent, completely missing | **High** | Heavy | §7 §11 |
| 14 | Add JobPosting schema to each role on `/hiring.html` - eligible for Google Jobs SERP, free traffic | Medium | Quick | §4 |
| 15 | Pre-transpile JSX with a build step (Vite/esbuild) to remove Babel from production. ~600 KB shaved per page; LCP improves ~2-4s on mobile | **High** | Heavy | §5 |
| 16 | Switch blog post URLs from `/post.html?id=N` to `/blog/{slug}` - better keyword anchoring in URL, cleaner social shares. Requires GitHub Pages 404-fallback or routing setup | Medium | Heavy | §8 §5 |
| 17 | Decide on "Simple Grid" / "Simple Grid AI" alternateName in JSON-LD - brief bans these as brand spellings; if kept, conflicts with brand voice rule | Low | Quick | §1 §4 |
| 18 | Add twitter:card / twitter:title / twitter:description / twitter:image to `/privacy.html` and `/terms.html` (currently missing) | Low | Quick | §10 |
| 19 | Vary anchor text on home for case study cards ("How Elite deployed in 21 days" vs "How Apex went live in 12 days") instead of identical "Full case study →" | Low | Quick | §6 |
| 20 | Update `sitemap.xml` `<lastmod>` automation strategy - tie to actual file mtime so it stays meaningful as content evolves | Low | Medium | §5 |

**Top 5 to ship first (P0):** #1, #2, #3, #4, #5. All are Quick effort and High impact. They unlock structural SEO that the rest of the strategy depends on.

---

## STOP - Phase 1 complete

Awaiting your review and approval before producing `/seo-audit/PROPOSED_CHANGES.md` (Phase 2 - diffs only, commit nothing).

When you reply, send one of:
- **"approve, generate proposed changes"** - I produce Phase 2 diffs across all 20 fixes, grouped P0/P1/P2.
- **"approve P0 only, generate diffs"** - I produce diffs only for fixes #1–5.
- **"revise"** + your edits - I update the report and re-issue.
- **"reject + reason"** - I stop here.

You hold final approval on every copy change in Phase 2 (per brief Section 12).
