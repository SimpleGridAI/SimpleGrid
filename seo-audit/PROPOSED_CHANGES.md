# SEO Audit - Phase 2: Proposed Changes

**Status:** diffs only, **no code changed**.
**Approval pattern:** reply with `apply P0`, `apply P0+P1`, `apply all`, or `apply [#1, #5, #14]` (specific numbers).
**Copy approval:** every change marked **⚠️ COPY FLAG** touches user-visible text. I will NOT apply those without explicit copy sign-off, even if you say `apply all`.

---

## Priority groups

- **P0 - Critical** (broken canonicals, missing H1s, no JSON-LD on blog, sitemap errors): 8 changes
- **P1 - High Impact** (heading structure, meta tags, image alt/dim, internal links): 6 changes
- **P2 - Enhancement** (new pages, build step, OG images, URL restructure): 6 changes

Total: 20 proposed changes.

---

## P0 - Apply first

---

### P0-1 · Add H1 to case-studies, blog, about ⚠️ COPY FLAG

**Section:** §3 (heading hierarchy).
**Issue:** 3 high-priority pages have no `<h1>`. Crawlers can't determine page topic.

#### case-studies.html line 44–45

**Before:**
```jsx
<div className="tag">CASE STUDIES</div>
<h2 className="h2">Two we can talk about.</h2>
```

**After:**
```jsx
<div className="tag">CASE STUDIES</div>
<h1 className="h2">Customized ERP for manufacturers, live in 12 to 21 days.</h1>
<p className="section-lead">Two we can talk about.</p>
```

**Keyword targeted:** "customized ERP for manufacturers" (primary) + "ERP deployment case studies" (secondary).
**Impact:** High. Unblocks page from ranking on the primary keyword.

#### blog.html line 207–208

**Before:**
```jsx
<div className="tag">BLOG</div>
<h2 className="h2">Straight talk about ERP and operations.</h2>
```

**After:**
```jsx
<div className="tag">BLOG</div>
<h1 className="h2">ERP for manufacturers - field notes from operators who built it.</h1>
```

**Keyword targeted:** "ERP for manufacturers" + "factory floor software".
**Impact:** High.

#### about.html line 64–65

**Before:**
```jsx
<div className="tag">ABOUT US</div>
<h2 className="h2 ink" style={{maxWidth:880}}>An ERP built by operators, for operators.</h2>
```

**After:**
```jsx
<div className="tag">ABOUT US</div>
<h1 className="h2 ink" style={{maxWidth:880}}>An ERP built by operators, for operators.</h1>
```

**Keyword targeted:** "manufacturer-built ERP" (secondary brand-anchored).
**Impact:** High.

---

### P0-2 · Trim every overlong title and meta description ⚠️ COPY FLAG

**Section:** §3 (title 50–60 chars hard cap; description 140–155 chars hard cap).
**Issue:** 8 of 11 titles exceed 60 chars. 9 of 11 descriptions exceed 155.

Each rewrite follows the brief's formula:
- **Title:** `[Primary KW] - [Differentiator] | SimpleGrid`
- **Description:** `[Pain]. [What we do]. [CTA].`

#### index.html (line 5–6)

| | Current | Proposed |
|---|---|---|
| Title | `SimpleGrid AI - Customized ERP for Manufacturers \| Fast Deployment in 7 Days` (76) | `AI ERP for Manufacturers - Live in 7 Days \| SimpleGrid` (54) |
| Description | `SimpleGrid (Simple Grid AI) is a customized ERP for manufacturers - fast deployment in 7 days, built for the factory floor, not 18 months of consulting. SimpleGrid ERP fits your operation. Free until it works.` (208) | `Your ERP shouldn't take 18 months. SimpleGrid deploys in 7 days, zero upfront cost. See it working before you spend a dollar. 30 days free.` (138) |

**Keyword:** AI ERP for manufacturers (primary).

#### product.html (line 5–6)

| | Current | Proposed |
|---|---|---|
| Title | `Product - SimpleGrid AI \| Customized ERP for Factories, Fast Deployment in 7 Days` (78) | `How SimpleGrid ERP Works - 7-Day Deploy \| SimpleGrid` (52) |
| Description | (199) | `Schema-driven ERP. AI configures it from your data. No modules, no consultants, no 18-month rollout. Deploy in 7 days. Walk away if it doesn't work.` (149) |

**Keyword:** how SimpleGrid ERP works (primary).

#### case-studies.html (line 5–6)

| | Current | Proposed |
|---|---|---|
| Title | (80) | `ERP Case Studies - Live in 12 to 21 Days \| SimpleGrid` (53) |
| Description | (242) | `Two factories on SimpleGrid: a 600-employee furniture exporter live in 21 days, an 80–100k shirts/month apparel manufacturer live in 12 days.` (140) |

#### case-elite.html (line 5–6)

| | Current | Proposed |
|---|---|---|
| Title | (73) | `Furniture ERP Case Study - 21-Day Deploy \| SimpleGrid` (53) |
| Description | (217) | `600-employee furniture exporter replaced Excel and group chats with SimpleGrid in 21 days. 64 things tracked. 72 automatic triggers.` (132) |

**Keyword:** ERP for furniture manufacturers.

#### case-apex.html (line 5–6)

| | Current | Proposed |
|---|---|---|
| Title | (67) | `Apparel ERP Case Study - Live in 12 Days \| SimpleGrid` (53) |
| Description | (216) | `An 80–100k shirts/month apparel manufacturer running 100% job work across 30+ locations. Live on SimpleGrid in 12 days. Real numbers.` (134) |

**Keyword:** ERP for apparel manufacturers.

#### blog.html (line 5–6)

| | Current | Proposed |
|---|---|---|
| Title | (87) | `ERP Blog for Manufacturers - Field Notes \| SimpleGrid` (54) |
| Description | (245) | `Field notes from operators on fast-deploy ERP, factory floor software, and why most ERP rollouts fail. Read posts from the team building SimpleGrid.` (149) |

#### post.html (line 5–6)

| | Current | Proposed |
|---|---|---|
| Title | (89) | `SimpleGrid Blog - Notes from Manufacturers` (43) |
| Description | (187) | `Operator-written guides on fast-deploy ERP, factory floor software, and how to evaluate ERP for a 200-person factory.` (118) |

(Note: title and description are dynamically rewritten by the JS effect per blog post - these are static fallbacks for non-JS crawlers and the blog index URL.)

#### about.html (line 5–6)

| | Current | Proposed |
|---|---|---|
| Title | (78) | `About SimpleGrid - Built by a Manufacturer \| SimpleGrid` (55) |
| Description | (246) | `SimpleGrid was built by a founder who ran a $30M factory, survived two ERP failures, and ended up on Google Sheets. Now we ship the system we needed.` (151) |

#### hiring.html (line 5–6)

| | Current | Proposed |
|---|---|---|
| Title | `Careers - SimpleGrid AI \| Build the ERP Operators Wish Existed` (60) | `Careers at SimpleGrid - Build for Operators \| SimpleGrid` (55) |
| Description | (175) | `Small team building AI-native ERP for mid-market manufacturers. Engineers, operators, GTM hires welcome. Founder-led. Operator-grounded.` (135) |

**Privacy and Terms** are already within budget - no rewrite proposed.

**Impact:** High across all 9 pages. Prevents truncation in mobile SERP, improves CTR.

---

### P0-3 · Fix /post.html canonical (currently points to /blog.html - wrong) ⚠️

**Section:** §5 (canonicals).
**Issue:** Static canonical on every blog post page is `https://simplegrid.ai/blog.html`. This tells Google "the canonical version of every blog post is the blog listing", which collapses all 17 posts into one URL and destroys their ranking potential. JS effect already sets a per-post canonical at runtime, but static fallback is wrong.

#### post.html line 8

**Before:**
```html
<link rel="canonical" href="https://simplegrid.ai/blog.html">
```

**After:** (remove the static canonical entirely; JS effect injects per-post canonical at runtime)
```html
<!-- canonical injected by JS based on blog ID -->
```

JS effect already does this correctly in [post.html line 116](post.html#L116):
```js
const can = document.querySelector('link[rel="canonical"]');
if (can) can.setAttribute('href', 'https://simplegrid.ai/post.html?id=' + blog.id);
```

But since the static `<link>` no longer exists, the JS needs to CREATE it instead of update it. Update the JS effect to:

#### post.html line ~125 (inside React.useEffect)

**Before:**
```js
const can = document.querySelector('link[rel="canonical"]');
if (can) can.setAttribute('href', 'https://simplegrid.ai/post.html?id=' + blog.id);
```

**After:**
```js
let can = document.querySelector('link[rel="canonical"]');
if (!can) {
  can = document.createElement('link');
  can.setAttribute('rel', 'canonical');
  document.head.appendChild(can);
}
can.setAttribute('href', 'https://simplegrid.ai/post.html?id=' + blog.id);
```

**Keyword:** all 17 blog post primary keywords (currently zero of them rank because of canonical collapse).
**Impact:** **High** - single biggest unlock for the blog content's search visibility.

---

### P0-4 · Add Article JSON-LD to every blog post ⚠️ COPY FLAG (datePublished requires owner input)

**Section:** §4 (JSON-LD per page type).
**Issue:** No blog post has Article schema. Article rich-result eligibility is the #1 free Google SERP feature for content sites.

**Blocker:** datePublished and dateModified are not in `data/blogs.js`. Per brief Section 13 ("Never invent ... dateModified must reflect actual last-modified"), I cannot fabricate these. **Request:** add `datePublished` (ISO string) to each entry in `data/blogs.js`. Until then, propose two options:

**Option A - ship without dates** (skip the field, lose some rich-result eligibility, but valid Article schema):

#### post.html - extend the existing useEffect

**Before** (post.html line 113–127, current useEffect):
```js
React.useEffect(() => {
  document.title = blog.title + ' - SimpleGrid AI Blog';
  const desc = (blog.body || '').replace(/\s+/g, ' ').slice(0, 155).trim();
  const setMeta = (selector, attr, value) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };
  setMeta('meta[name="description"]', 'content', desc);
  setMeta('meta[property="og:title"]', 'content', blog.title + ' - SimpleGrid AI');
  setMeta('meta[property="og:description"]', 'content', desc);
  setMeta('meta[property="og:url"]', 'content', 'https://simplegrid.ai/post.html?id=' + blog.id);
  setMeta('meta[name="twitter:title"]', 'content', blog.title);
  setMeta('meta[name="twitter:description"]', 'content', desc);
  const can = document.querySelector('link[rel="canonical"]');
  if (can) can.setAttribute('href', 'https://simplegrid.ai/post.html?id=' + blog.id);
}, [blog]);
```

**After:**
```js
React.useEffect(() => {
  document.title = blog.title + ' - SimpleGrid AI Blog';
  const desc = (blog.body || '').replace(/\s+/g, ' ').slice(0, 155).trim();
  const url = 'https://simplegrid.ai/post.html?id=' + blog.id;
  const heroImg = (blog.images && blog.images[0] && blog.images[0].src)
    ? 'https://simplegrid.ai/' + blog.images[0].src
    : 'https://simplegrid.ai/assets/simplegrid-logo-horizontal.svg';

  const setMeta = (selector, attr, value) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };
  setMeta('meta[name="description"]', 'content', desc);
  setMeta('meta[property="og:title"]', 'content', blog.title);
  setMeta('meta[property="og:description"]', 'content', desc);
  setMeta('meta[property="og:url"]', 'content', url);
  setMeta('meta[property="og:image"]', 'content', heroImg);
  setMeta('meta[name="twitter:title"]', 'content', blog.title);
  setMeta('meta[name="twitter:description"]', 'content', desc);
  setMeta('meta[name="twitter:image"]', 'content', heroImg);

  let can = document.querySelector('link[rel="canonical"]');
  if (!can) { can = document.createElement('link'); can.setAttribute('rel', 'canonical'); document.head.appendChild(can); }
  can.setAttribute('href', url);

  // Article JSON-LD
  let ld = document.getElementById('post-jsonld');
  if (!ld) { ld = document.createElement('script'); ld.type = 'application/ld+json'; ld.id = 'post-jsonld'; document.head.appendChild(ld); }
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': blog.title,
    'description': desc,
    'image': heroImg,
    'url': url,
    'mainEntityOfPage': url,
    'publisher': { '@id': 'https://simplegrid.ai/#org' },
    'author': { '@type': 'Organization', '@id': 'https://simplegrid.ai/#org' }
    // datePublished + dateModified intentionally omitted - to be populated when blog data has dates
  });

  // BreadcrumbList JSON-LD
  let bc = document.getElementById('post-breadcrumb');
  if (!bc) { bc = document.createElement('script'); bc.type = 'application/ld+json'; bc.id = 'post-breadcrumb'; document.head.appendChild(bc); }
  bc.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home',  'item': 'https://simplegrid.ai/' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Blog',  'item': 'https://simplegrid.ai/blog.html' },
      { '@type': 'ListItem', 'position': 3, 'name': blog.title }
    ]
  });
}, [blog]);
```

**Option B - wait until dates are added to blogs.js, then ship full Article schema with datePublished/dateModified.**

**Keyword:** all 17 blog post topics (covers Article rich-result eligibility).
**Impact:** High.

---

### P0-5 · Add width/height to every `<img>` (CLS fix)

**Section:** §5 (Cumulative Layout Shift), §9 (image SEO).
**Issue:** None of the 4 `<img>` tags in the codebase have `width=` / `height=`. Every image-loading page racks up CLS.

#### components/Nav.jsx line 49

**Before:**
```jsx
<img src="assets/simplegrid-logo-horizontal.svg" alt="SimpleGrid" />
```

**After:**
```jsx
<img src="assets/simplegrid-logo-horizontal.svg" alt="SimpleGrid" width="160" height="32" />
```

#### components/Footer.jsx line 45

**Before:**
```jsx
<img src="assets/simplegrid-logo-horizontal.svg" alt="SimpleGrid" className="footer-logo" />
```

**After:**
```jsx
<img src="assets/simplegrid-logo-horizontal.svg" alt="SimpleGrid" className="footer-logo" width="160" height="32" />
```

#### components/Footer.jsx line 59

**Before:**
```jsx
<img src="assets/nvidia-inception.png" alt="NVIDIA Inception Program" style={{ height: 38, width: 'auto', display: 'block' }} />
```

**After:**
```jsx
<img src="assets/nvidia-inception.png" alt="NVIDIA Inception Program" width="120" height="38" style={{ display: 'block' }} />
```

#### post.html line 68

**Before:**
```jsx
<img src={img.src} alt={img.alt || ''} loading="lazy"/>
```

**After:**
```jsx
<img src={img.src} alt={img.alt || ''} loading="lazy" width="1200" height="675" style={{aspectRatio:'16/9', maxWidth:'100%', height:'auto'}}/>
```

(Blog images are landscape ~16:9. Reserves space; CSS shrinks to actual rendered width.)

**Impact:** Medium-High. Eliminates per-image CLS.

---

### P0-6 · Add BreadcrumbList JSON-LD

**Section:** §4 (every page > depth 1).
**Issue:** No page has breadcrumbs. Free SERP enhancement.

For each non-home static page, add a script tag in `<head>`. (For post.html, included in P0-4 above.)

#### case-studies.html (insert after canonical, line ~12)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://simplegrid.ai/" },
    { "@type": "ListItem", "position": 2, "name": "Case studies", "item": "https://simplegrid.ai/case-studies.html" }
  ]
}
</script>
```

#### case-elite.html (after canonical, line ~12)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://simplegrid.ai/" },
    { "@type": "ListItem", "position": 2, "name": "Case studies", "item": "https://simplegrid.ai/case-studies.html" },
    { "@type": "ListItem", "position": 3, "name": "Elite Arts & Crafts", "item": "https://simplegrid.ai/case-elite.html" }
  ]
}
</script>
```

#### case-apex.html (after canonical)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://simplegrid.ai/" },
    { "@type": "ListItem", "position": 2, "name": "Case studies", "item": "https://simplegrid.ai/case-studies.html" },
    { "@type": "ListItem", "position": 3, "name": "Apex Apparel", "item": "https://simplegrid.ai/case-apex.html" }
  ]
}
</script>
```

#### blog.html, about.html, hiring.html, privacy.html, terms.html

Each gets a 2-element BreadcrumbList: Home → [page name].

**Impact:** Medium. Cumulative win across 7 pages.

---

### P0-14 · JobPosting JSON-LD on hiring.html

**Section:** §4 (industry-specific schema). Eligible for Google Jobs SERP.
**Issue:** 3 active roles in `ROLES` array on `hiring.html`. None have JobPosting schema.

Inject per-role schema via JS effect on hiring.html.

#### hiring.html - add inside the existing `function HiringPage` body (or top-level)

```js
React.useEffect(() => {
  const ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': ROLES.map(r => ({
      '@type': 'JobPosting',
      'title': r.t,
      'description': r.summary + ' ' + (r.about || []).join(' '),
      'employmentType': r.type.includes('Internship') ? 'INTERN' : (r.type.includes('Fractional') ? 'CONTRACTOR' : 'FULL_TIME'),
      'hiringOrganization': { '@id': 'https://simplegrid.ai/#org', 'name': 'SimpleGrid' },
      'jobLocation': { '@type': 'Place', 'address': { '@type': 'PostalAddress', 'addressLocality': r.loc.split(' ')[0], 'addressCountry': r.loc.includes('US') ? 'US' : 'IN' } },
      'baseSalary': r.comp ? { '@type': 'MonetaryAmount', 'currency': r.comp.includes('USD') ? 'USD' : 'INR', 'value': { '@type': 'QuantitativeValue', 'unitText': 'MONTH' } } : undefined,
      'datePosted': new Date().toISOString().slice(0,10) // ⚠️ uses today; better: add datePosted per role in ROLES
    }))
  });
  document.head.appendChild(ld);
  return () => { document.head.removeChild(ld); };
}, []);
```

⚠️ The `datePosted` will resolve to render-time on the client, which Google may treat as today on every crawl. **Better:** add an explicit `datePosted` field to each role in the `ROLES` array. Flagged as **⚠️ COPY FLAG** because it requires user-supplied data.

**Impact:** Medium.

---

### P0-18 · Add twitter:* tags to privacy.html and terms.html

**Section:** §10 (every page must have Twitter card tags).

#### privacy.html (after the og:* block, line ~14)

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Privacy Policy - SimpleGrid AI">
<meta name="twitter:description" content="How SimpleGrid AI handles your data.">
<meta name="twitter:image" content="https://simplegrid.ai/assets/simplegrid-logo-horizontal.svg">
```

#### terms.html (after the og:* block)

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Terms of Service - SimpleGrid AI">
<meta name="twitter:description" content="Terms of use for the SimpleGrid AI platform and website.">
<meta name="twitter:image" content="https://simplegrid.ai/assets/simplegrid-logo-horizontal.svg">
```

**Impact:** Low (these pages aren't shared often), but completes the brief Section 10 requirement.

---

## P1 - Apply after P0

---

### P1-7 · Add WebPage + SoftwareApplication schema to product.html

**Section:** §4 (Product / How It Works schema map).
**Issue:** Product page is highest commercial-intent page after home; has zero schema.

#### product.html - insert after canonical (line ~9)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://simplegrid.ai/product.html#webpage",
      "url": "https://simplegrid.ai/product.html",
      "name": "How SimpleGrid ERP Works - 7-Day Deploy",
      "isPartOf": { "@id": "https://simplegrid.ai/#website" },
      "primaryImageOfPage": "https://simplegrid.ai/assets/simplegrid-logo-horizontal.svg",
      "description": "Schema-driven ERP. AI configures it from your data. Deploy in 7 days."
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://simplegrid.ai/product.html#software",
      "name": "SimpleGrid ERP",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "url": "https://simplegrid.ai/product.html",
      "publisher": { "@id": "https://simplegrid.ai/#org" },
      "featureList": [
        "Schema-driven configuration",
        "Event ledger architecture",
        "AI-assisted setup",
        "Conversational data entry",
        "7-day deployment",
        "30 days free trial"
      ],
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://simplegrid.ai/" },
        { "@type": "ListItem", "position": 2, "name": "Product", "item": "https://simplegrid.ai/product.html" }
      ]
    }
  ]
}
</script>
```

**Keyword:** how SimpleGrid ERP works (primary).
**Impact:** High.

---

### P1-9 · Add body-content internal links ⚠️ COPY FLAG

**Section:** §6 (body links carry more equity than nav/footer).
**Issue:** Body internal links are nearly absent (only 2 case-study card links from home + back-to-blog).

#### Recommended additions (all touch user-visible body copy)

| Source | Target | Anchor (proposed) | Location |
|---|---|---|---|
| `/` Hero (`HomeTop.jsx` line ~280) | `/product.html` | "See how SimpleGrid models your factory" | Body, near hero CTA |
| `/` Problem section (`HomeTop.jsx` line ~430) | `/product.html#ledger` | "the events ledger" (linkify mid-sentence) | Body |
| `/` Proof section (`HomeBottom.jsx` line ~146) | `/case-studies.html` | "more deployments" | Body |
| `/product.html` (post-hero) | `/case-studies.html` | "live customer deployments" | Body |
| `/product.html` (mid) | `/about.html` | "built by operators who ran a $30M factory" | Body |
| `/case-elite.html` (top) | `/product.html` | "the SimpleGrid platform" | Body |
| `/case-elite.html` (bottom) | `/case-apex.html` | "an apparel manufacturer's deployment" | Body |
| `/case-apex.html` (bottom) | `/case-elite.html` | "a furniture manufacturer's deployment" | Body |

**Each anchor needs your copy approval.** Once approved, I'll patch the JSX.

**Impact:** High. Distributes link equity to underlinked pages.

---

### P1-10 · Image format / size cleanup ⚠️ ASSET TASK

**Section:** §9 (image SEO budgets).
**Issues:**
- `assets/elite-factory.jpeg` is 788 KB - over the 200 KB budget by ~4×.
- `assets/founder.jpg` is 840 KB and **not referenced anywhere** in code.

**Proposed actions:**
1. Convert `elite-factory.jpeg` to WebP. Target: <120 KB at 1600px wide. Tooling: `cwebp -q 78 elite-factory.jpeg -o elite-factory.webp`. Then update CSS background-image references in `case-studies.html`, `case-elite.html`, and any others.
2. **Delete `assets/founder.jpg`** (orphan asset, 840 KB) - OR wire it into the About page's FounderStory component as a real founder photo.

**Cannot do this in code-only step:** image conversion needs a binary tool (cwebp, ImageMagick, or design software). I can run `cwebp` if you have it installed, or you can supply a WebP and I'll wire up the references.

**Impact:** Medium. ~700 KB shaved per case-studies page load.

---

### P1-19 · Vary anchor text for case-study cards on home ⚠️ COPY FLAG

**Section:** §6 (anchor text variety).
**Issue:** Both case study cards on home use anchor "Full case study →".

#### components/HomeBottom.jsx line ~170

**Before:**
```jsx
<a href={c.link} className="btn btn-ghost btn-sm" style={{paddingLeft:0}}>Full case study →</a>
```

**After:** add per-case anchor text. Add an `anchor` field to each entry in the `proofItems` array (line 149-150) and use that:

```jsx
// in the proofItems array
{ ..., anchor: 'How Elite deployed in 21 days', link: 'case-elite.html', ... }
{ ..., anchor: 'How Apex went live in 12 days', link: 'case-apex.html', ... }

// in the render
<a href={c.link} className="btn btn-ghost btn-sm" style={{paddingLeft:0}}>{c.anchor} →</a>
```

**Impact:** Low-Medium. Better keyword-anchored backlinks.

---

### P1 - Other items rolled in already

P1-6 (Breadcrumbs) and P1-7 (Product schema) are listed under P0 since they're quick. P1 has these 4 actionable items.

---

## P2 - Heavier / requires copy or design

---

### P2-8 · Build proper 1200×630 og:images ⚠️ DESIGN TASK

**Section:** §10.
**Issue:** Most pages' `og:image` points at `simplegrid-logo-horizontal.svg` (4 KB SVG, **NOT supported by LinkedIn / Twitter / Slack as og:image**). Social previews currently look broken or generic.

**Required design assets:** 8 raster og:images, 1200×630 PNG or JPEG, <300 KB each.
- og-home.png (logo + tagline "AI ERP for Manufacturers" + subline "Live in 7 days")
- og-product.png ("How SimpleGrid ERP Works")
- og-case-studies.png ("Real factories. Real deployments.")
- og-case-elite.png (use Elite factory photo, overlay logo + "21 days")
- og-case-apex.png (apparel-themed, overlay logo + "12 days")
- og-blog.png ("Field notes from operators")
- og-about.png ("Built by a manufacturer for manufacturers")
- og-hiring.png ("Build for operators")

Once images are produced and placed in `assets/og/`, I'll update each page's `<meta property="og:image">` and `<meta name="twitter:image">` to point at them.

**Impact:** Medium-High. Every shared link will look intentional on LinkedIn (your #1 distribution channel per brief).

---

### P2-11 · Create /pricing.html ⚠️ NEW PAGE - REQUIRES COPY

**Section:** §7 (must-have pages).
**Issue:** No pricing page. Brief Section 2 maps a primary keyword (`ERP pricing for manufacturers`) to this page; site has none.

**Proposed structure** (copy not written - flagged for owner approval):

```
URL: /pricing.html
Primary KW: ERP pricing for manufacturers
Secondary: zero deployment cost ERP, ERP free trial manufacturers

H1: ERP pricing built for manufacturers, not for vendors.
H2: $0 to start. 30 days to decide. Pay only if it works.
H2: What you actually get in 7 days.
H2: Frequently asked questions about pricing.

Body sections:
- Pricing tiers (or single tier with usage-based)
- 30-day free trial mechanics
- What's included (deployment, training, support)
- Migration data: included or not?
- Multi-factory pricing
- Comparison table: SimpleGrid vs typical SAP/Oracle TCO
- FAQ: 5-7 questions

Schema: WebPage + Product (with Offer/AggregateOffer) + FAQPage + BreadcrumbList
```

**Impact:** **High** - captures a high-commercial-intent search class with no current target. P0 for revenue, but P2 for execution because it requires owner-written pricing copy.

---

### P2-12 · Industry pages (Furniture, Apparel, Pharma) ⚠️ NEW PAGES - REQUIRES COPY

**Section:** §7, §11.
**Issue:** Case studies are not industry landing pages. A user searching "ERP for furniture manufacturers" lands on case-elite - a single-customer story - not an industry overview.

**Proposed pages:** (3 pages, each ~1500 words)

| URL | Primary KW | H1 |
|---|---|---|
| `/erp-for-furniture-manufacturers.html` | ERP for furniture manufacturers | "ERP for furniture manufacturers - modeled around your wood, your contractors, your stages." |
| `/erp-for-apparel-manufacturers.html` | ERP for apparel manufacturers | "ERP for apparel manufacturers - built for job work, brand-nominated suppliers, and ephemeral SKUs." |
| `/erp-for-pharma-distributors.html` | ERP for pharma distributors | "ERP for pharma distributors - built around supplier offers, scheme logic, and live recency ranking." |

**Each page contains:**
- Hero with industry-specific pain (wood waste / job work coordination / scheme tracking)
- Section: "What's different about [industry] operations" (3-5 H3s - vocabulary, workflows, contractors, etc.)
- Section: "How SimpleGrid models it" (link to case study + product)
- FAQ (5 questions per industry)
- CTA: book a call

**Schema:** WebPage + Service + FAQPage + BreadcrumbList

**Internal linking:** each page links to (a) the relevant case study, (b) product, (c) the other 2 industry pages.

**Impact:** **High** - captures 3 high-volume commercial keywords currently with no target. P0 strategically, P2 for execution because it requires industry-specific copy from owner.

---

### P2-13 · Comparison pages (vs SAP, vs Tally, vs Zoho) ⚠️ NEW PAGES - REQUIRES COPY

**Section:** §7, §11.
**Issue:** Zero comparison pages. Comparison searches ("SAP alternative for manufacturers", "Tally alternative") are some of the highest commercial-intent keywords in the brief's keyword strategy.

**Recommended first 3 (P2 group):**

| URL | Primary KW | H1 |
|---|---|---|
| `/vs-sap.html` | SAP alternative for manufacturers | "SimpleGrid vs SAP Business One - 7 days, not 18 months." |
| `/vs-tally.html` | Tally alternative for manufacturing | "SimpleGrid vs Tally - beyond accounting, into the factory floor." |
| `/vs-zoho.html` | Zoho alternative manufacturers | "SimpleGrid vs Zoho ERP - modeled on your factory, not on a generic template." |

**Each page contains:**
- Hero with the side-by-side comparison hook
- Feature-by-feature table (deployment time, cost, customization, fit-for-manufacturing)
- "When SAP/Tally/Zoho is the right choice" (honest)
- "When SimpleGrid is" (also honest)
- 3-5 FAQ items (the brief specifies these)
- CTA: book a call

**Schema:** WebPage + FAQPage + BreadcrumbList

**Impact:** **High** - captures 3 of the highest commercial-intent keyword classes. P2 for execution because it requires factual comparison content.

---

### P2-15 · Pre-transpile JSX (remove Babel from production) ⚠️ HEAVY ENGINEERING

**Section:** §5 (performance).
**Issue:** Babel standalone (~600 KB) ships on every page and transpiles JSX client-side. Single biggest performance liability. LCP impact estimated 2-4s on mobile.

**Proposed migration:** introduce Vite or esbuild as a build step.

```
package.json (new)
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": { "vite": "^5", "@vitejs/plugin-react": "^4" }
}

vite.config.js (new)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // each .html as entry point
        index: 'index.html', product: 'product.html', /* ... */
      }
    }
  }
});
```

Impacts:
- Removes 3 CDN scripts (React, ReactDOM, Babel) from each page
- JSX files become regular ES modules
- Each page loads only the components it needs (code splitting)
- Output: `dist/` directory; need to update GitHub Pages workflow to serve from `dist/` instead of root
- All 11 HTML files need their `<script type="text/babel">` tags converted to module imports
- All `window.X = X` global exports need to become proper imports

**Caveats:**
- Per CLAUDE.md, the user is non-technical and currently runs the site directly via VS Code Live Server, no build step. **Adding a build step changes the dev workflow.** Owner needs to decide if performance gain is worth the workflow change.
- Alternatively: keep current setup but add `<link rel="preload">` for the scripts to mitigate. Smaller win but no workflow change.

**Impact:** Highest single perf win. **Heavy effort.** Requires owner buy-in on workflow change.

---

### P2-16 · Switch /post.html?id=N → /blog/{slug}/ ⚠️ HEAVY

**Section:** §5, §8.
**Issue:** Blog URLs are query-param-based. Cleaner slug URLs (`/blog/event-sourcing-why-simplegrid-stores-everything/`) would rank better and be more shareable.

**Approach (without a build step):**

GitHub Pages supports custom 404 fallback. Create:
- `404.html` that intercepts `/blog/{slug}/` URLs, looks up the slug in `blogs.js`, and renders the post (same logic as `post.html`).
- 17 redirect entries from old `?id=N` URLs to new slug URLs.

**Drawbacks:** This pattern relies on the 404 handler. Cleaner approach is to wait for the build-step migration (P2-15), then use proper static-site routing.

**Impact:** Medium. Defer until P2-15 is done.

---

### P2-17 · Decide on alternateName "Simple Grid" / "Simple Grid AI" in JSON-LD ⚠️ DECISION

**Section:** §1 (brand voice - never use "Simple Grid"), §4.
**Issue:** Current home JSON-LD includes:
```json
"alternateName": ["SimpleGrid AI", "Simple Grid", "Simple Grid AI", "SimpleGrid ERP", "Simple Grid ERP", "SimpleGridAI"]
```

The brief Section 1 says: *"Never 'Simple Grid', 'SG', 'SIMPLEGRID', 'simpleGrid'."* Which conflicts with leaving "Simple Grid" / "Simple Grid AI" in alternateName.

**Two options:**
1. **Strict brand:** remove "Simple Grid" and "Simple Grid AI" from alternateName. Lose the misspelling-intercept SEO benefit but stay on brand.
2. **SEO-first:** keep them. Brand voice rule applies to copy, not to JSON-LD intended only for crawlers. (My recommendation, but flag for owner.)

**Impact:** Low.

---

### P2-20 · Sitemap automation ⚠️ TOOLING

**Section:** §5.
**Issue:** Every `<lastmod>` in `sitemap.xml` is the same hardcoded date. Will rot.

**Proposed:** add a small script (`scripts/generate-sitemap.js`) that walks the HTML files, reads each file's mtime, and writes a fresh sitemap. Run on every commit (a git hook or part of deploy).

**Impact:** Low. Hygiene fix.

---

## Summary

| Tier | Count | Effort | Net SEO impact |
|---|---|---|---|
| P0 | 8 changes | Quick (1-2 hrs total) | High - unlocks structural SEO |
| P1 | 4 changes | Medium (3-5 hrs + asset work) | High |
| P2 | 6 changes | Heavy (new pages + build step) | Highest, but each needs copy / design / engineering decisions |

**13 of 18 in-code changes touch user-visible copy or metadata** → marked **⚠️ COPY FLAG**. None of these will be applied without explicit copy approval.

---

## STOP - Phase 2 complete

Send one of:
- `apply P0` - I apply only the 8 P0 fixes (after you approve the copy in P0-1, P0-2, P0-4 datePosted)
- `apply P0+P1` - adds the 4 P1 fixes
- `apply all` - adds the 6 P2 fixes (some will still defer waiting on copy / design / decisions)
- `apply [#1, #5, #14]` - specific fix numbers
- `revise [item]` - re-issue with edits

After your apply command, Phase 3 produces:
- `/seo-audit/POST_FIX_REPORT.md` (before/after verification)
- `/seo-audit/REMAINING_WORK.md` (deferred items + manual actions)
- `/seo-audit/CONTENT_ROADMAP.md` (missing pages with outlines)
