# SEO Audit — Phase 3: Remaining Work

Items from the Phase 2 plan that were **not** applied in this round, organized by what they need from you.

---

## NEEDS YOUR COPY

### 1. Body internal links (P1-9) — 8 anchor decisions

I deferred this because every anchor changes a sentence in your body copy. Reply with `approve [#]` per row to apply.

| # | Source | Target | Proposed anchor (in context) |
|---|---|---|---|
| a | `/` Hero (HomeTop.jsx, after the lead paragraph) | `/product.html` | "[See how SimpleGrid models your factory →]" |
| b | `/` Problem section, card 4 description | `/product.html#ledger` | "...kept in [the events ledger]." (linkify mid-sentence) |
| c | `/` ProofSection lead paragraph | `/case-studies.html` | append "[Read both deployments →]" at end |
| d | `/product.html` after MotivationSection | `/case-studies.html` | "[See live customer deployments →]" |
| e | `/product.html` Architecture section | `/about.html` | inside copy: "[built by operators who ran a $30M factory]" |
| f | `/case-elite.html` bottom (before final CTA) | `/case-apex.html` | "[See another deployment — apparel manufacturer in 12 days →]" |
| g | `/case-apex.html` bottom | `/case-elite.html` | "[See another deployment — furniture exporter in 21 days →]" |
| h | `/about.html` bottom (before final CTA) | `/product.html` | "[See how the system actually works →]" |

### 2. New pages (P2-11, P2-12, P2-13)

See [CONTENT_ROADMAP.md](CONTENT_ROADMAP.md) for outlines. Each page needs:
- Pricing (P2-11)
- ERP for Furniture Manufacturers (P2-12)
- ERP for Apparel Manufacturers (P2-12)
- ERP for Pharma Distributors (P2-12)
- SimpleGrid vs SAP (P2-13)
- SimpleGrid vs Tally (P2-13)
- SimpleGrid vs Zoho (P2-13)

I can scaffold the HTML/JSX shell for each one (head metadata, JSON-LD, layout, CTAs) — **just write the body copy and send back**. I will NOT generate body copy from thin air per brief Section 13.

### 3. Article schema dates (P0-4 partial)

`Article` JSON-LD now ships on every blog post but **without** `datePublished` and `dateModified`. Per the brief I cannot fabricate these.

**To complete:** add a `datePublished` field (ISO string like `"2026-04-15"`) to each entry in `data/blogs.js`. If you also want `dateModified`, add that too. I'll wire the JS to inject them.

Suggested mass-add: pick a sequence of dates 2026-01 through 2026-04 spread across the 17 posts.

### 4. JobPosting schema dates (P0-14 partial)

`JobPosting` JSON-LD ships per role on `/hiring.html` but uses **today's date** for `datePosted`. Google may flag this if it sees the date update on every crawl.

**To complete:** add a `datePosted` field (ISO string) to each entry in the `ROLES` array in `hiring.html`. I'll wire it in.

### 5. Person schema for founder

Brief Section 4 lists `Person` schema as required for the About page. I deferred because:
- Founder full name is currently `"Mukund Agarwal"` (per recent commit removing the byline) — should it appear in JSON-LD even though the byline was removed from visible copy?
- No author bio currently anywhere on site.
- No founder photo wired up (`assets/founder.jpg` was just deleted as orphan).

**Decision needed:** include Person schema or not? If yes, send name + title + linkedin URL.

---

## NEEDS DESIGN

### 6. OG image set (P2-8)

`og:image` on every page currently points at `simplegrid-logo-horizontal.svg` (4 KB SVG, **not supported by LinkedIn / Twitter / Slack**). Result: most shared links show a broken or generic preview.

**Required:** 8 PNG or JPEG images at 1200×630 pixels, <300 KB each. Once produced and dropped in `assets/og/`, I'll wire each page's `og:image` and `twitter:image` tags.

| Filename | Page | Suggested visual |
|---|---|---|
| `og-home.png` | `/` | SimpleGrid logo + "AI ERP for Manufacturers" + "Live in 7 days" |
| `og-product.png` | `/product.html` | "How SimpleGrid ERP Works" + product shot or schema diagram |
| `og-case-studies.png` | `/case-studies.html` | "Real factories. Real deployments." over factory photo |
| `og-case-elite.png` | `/case-elite.html` | Elite factory photo + "21 days" overlay |
| `og-case-apex.png` | `/case-apex.html` | Apparel-themed graphic + "12 days" overlay |
| `og-blog.png` | `/blog.html` | "Field notes from operators" |
| `og-about.png` | `/about.html` | Founder photo / team / "Built by operators" |
| `og-hiring.png` | `/hiring.html` | "Build the ERP every operator wishes existed" |

Templates: keep brand layout consistent — logo top-left, headline center-left, single accent color (sg-blue `#4A7BF7`).

### 7. Founder photo

`assets/founder.jpg` was deleted as orphan. If you want a photo on the About page, either:
- Re-add `founder.jpg` AND wire it into `FounderStory` component
- OR ship About without a founder photo (current state)

### 8. Image conversion: elite-factory.jpeg → WebP (P1-10)

`assets/elite-factory.jpeg` is 788 KB JPEG. Brief budget is <200 KB per image; hero images <150 KB.

**Action:** convert to WebP at quality 78–82, target <120 KB. Then update CSS `background-image: url(assets/elite-factory.webp)` references in `case-studies.html` and `case-elite.html` (with JPEG fallback for older browsers).

I cannot run image conversion locally (no `cwebp` / `magick` installed). One-line command for you (install once via `brew install webp`):
```sh
cwebp -q 80 assets/elite-factory.jpeg -o assets/elite-factory.webp
```
Send me the resulting WebP and I'll wire up the CSS references.

---

## NEEDS ENGINEERING DECISION

### 9. Pre-transpile JSX with Vite (P2-15)

Single biggest performance win. Currently every page ships ~600 KB of Babel that transpiles JSX in the browser at every load, blocking LCP for 2-4 seconds on mobile.

**Trade-off:** the dev workflow changes. Today you run VS Code Live Server → click Go Live → edit files → save → browser auto-refreshes. With Vite, you'd run `npm run dev` in a terminal once, edit files, save → browser auto-refreshes. Production builds via `npm run build` → output goes to `dist/`. GitHub Pages would then serve from `dist/` instead of root.

This is the biggest single technical decision in the audit. **Recommend approving for next sprint** — the LCP gain will materially improve search rankings.

If approved, I'll:
- Add `package.json`, `vite.config.js`, `.gitignore` updates
- Migrate all 11 HTML files' `<script type="text/babel">` references to ES module imports
- Remove the 3 CDN scripts (React, ReactDOM, Babel) from every page's `<head>`
- Update GitHub Pages workflow to deploy from `dist/`
- Update CLAUDE.md with the new dev workflow

### 10. Slug URLs for blog posts (P2-16)

Currently `/post.html?id=N` (e.g. `/post.html?id=1`). Cleaner alternative: `/blog/event-sourcing-why-simplegrid-stores-everything/`.

**Depends on:** P2-15 (build step) for clean implementation. Alternative without build: GitHub Pages 404 fallback hack — works but messy.

**Defer until P2-15 lands.**

### 11. Sitemap auto-update (P2-20)

Today every `<lastmod>` in `sitemap.xml` is the same hardcoded date and will rot.

**Proposed script** — drop in `scripts/generate-sitemap.js`, run before each commit (or hook to git pre-commit):

```js
// scripts/generate-sitemap.js
// Walks the repo, reads HTML mtime, regenerates sitemap.xml.
// Run: node scripts/generate-sitemap.js

const fs = require('fs');
const path = require('path');

const ROOT = 'https://simplegrid.ai';
const SLUG_TO_PRIORITY = {
  'index.html': 1.0, 'product.html': 0.9, 'case-studies.html': 0.9,
  'case-elite.html': 0.8, 'case-apex.html': 0.8, 'blog.html': 0.8,
  'about.html': 0.7, 'hiring.html': 0.6, 'privacy.html': 0.3, 'terms.html': 0.3,
};
const SLUG_TO_FREQ = {
  'index.html': 'weekly', 'product.html': 'weekly', 'blog.html': 'weekly', 'hiring.html': 'weekly',
  'case-studies.html': 'monthly', 'case-elite.html': 'monthly', 'case-apex.html': 'monthly', 'about.html': 'monthly',
  'privacy.html': 'yearly', 'terms.html': 'yearly',
};

const dir = path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'post.html' && f !== '404.html');

const entries = [];
// Index page is "/", not "/index.html"
const ts = (f) => fs.statSync(path.join(dir, f)).mtime.toISOString().slice(0, 10);
files.forEach(f => {
  const url = f === 'index.html' ? `${ROOT}/` : `${ROOT}/${f}`;
  entries.push({ url, lastmod: ts(f), changefreq: SLUG_TO_FREQ[f] || 'monthly', priority: SLUG_TO_PRIORITY[f] || 0.5 });
});

// Blog posts
const blogsJs = fs.readFileSync(path.join(dir, 'data/blogs.js'), 'utf8');
const ids = [...blogsJs.matchAll(/"id":\s*(\d+)/g)].map(m => m[1]);
ids.forEach(id => {
  entries.push({ url: `${ROOT}/post.html?id=${id}`, lastmod: ts('data/blogs.js'), changefreq: 'monthly', priority: 0.6 });
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${
  entries.map(e => `  <url><loc>${e.url}</loc><lastmod>${e.lastmod}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`).join('\n')
}\n</urlset>\n`;

fs.writeFileSync(path.join(dir, 'sitemap.xml'), xml);
console.log(`Wrote ${entries.length} URLs to sitemap.xml`);
```

If you want it added, say `apply sitemap script` and I'll create the file.

---

## MANUAL ACTIONS (not code)

### 12. Submit to Google Search Console
- Verify domain ownership (DNS TXT record or HTML file)
- Submit sitemap: `https://simplegrid.ai/sitemap.xml`
- After 24–72 hrs: check Coverage report for any indexing errors

### 13. Submit to Bing Webmaster Tools
- Same flow at `https://www.bing.com/webmasters`
- Bing matters for ~3-5% of traffic in your ICP markets — worth doing once

### 14. LinkedIn social preview test
- Once OG images (item #6) ship, test each major page at `https://www.linkedin.com/post-inspector`
- LinkedIn caches social previews for ~7 days — request re-scrape if you push updates

### 15. Lighthouse mobile audit
- Run `https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fsimplegrid.ai%2F` and screenshot baseline
- Re-run after P2-15 (build step) to confirm LCP improvement

---

## DECISION ITEMS WAITING ON YOU

| # | Decision | Default if no reply |
|---|---|---|
| A | Approve body internal links (item #1) — yes/no per anchor | unchanged (current state) |
| B | Add `datePublished` to blogs.js | Article schema ships without dates |
| C | Add `datePosted` to ROLES | JobPosting uses render-time today |
| D | Include Person schema for founder | omit |
| E | Approve Vite build-step migration | unchanged (current Babel-in-browser) |
| F | Approve content roadmap pages | site keeps current 11 pages |
| G | Add sitemap regeneration script | sitemap stays manual |
