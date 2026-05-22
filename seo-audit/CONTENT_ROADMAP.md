# SEO Audit - Content Roadmap

Pages from the keyword strategy (Phase 1 §H) that **don't exist yet** but should. Each entry is a self-contained brief: keyword, search intent, page outline, and the deliverable I need from you to ship it.

I will scaffold the HTML/JSX shell (head metadata, JSON-LD, layout, breadcrumb, CTAs) for any page on this list - you write the body copy, I wire it up. **I will not generate body copy from thin air** (per brief Section 13).

---

## P0 - high commercial intent, missing entirely

### 1. `/pricing.html` - ERP pricing for manufacturers

**Primary KW:** ERP pricing for manufacturers
**Secondary:** zero deployment cost ERP, ERP free trial manufacturers, affordable ERP for factories
**Search intent:** transactional/commercial
**Why P0:** brief Section 2 maps a primary keyword here; site has no pricing page; a high-intent visitor hits the home page and never finds pricing clarity.

**Page outline:**
```
URL: /pricing.html
Title: ERP Pricing for Manufacturers - $0 to Start | SimpleGrid (54)
Description: Zero deployment cost. 30 days free. Pay only if it works. SimpleGrid pricing built for mid-market manufacturers, not enterprise budgets. (140)

H1: ERP pricing built for manufacturers, not for vendors.
H2: $0 to start. 30 days to decide. Pay only if it works.
H2: What's actually included.
H2: How we compare on 5-year total cost.
H2: Frequently asked questions about pricing.

Body sections (you write):
1. The pricing principle (why $0 upfront)
2. Tier(s) - single tier? multi-factory pricing? per-user?
3. What's included (deployment, training, support, migration)
4. What costs extra (custom integrations? new factories?)
5. 30-day trial mechanics - what counts as "it works"?
6. 5-year TCO comparison vs typical SAP / Oracle / Tally rollout
7. FAQ block (5–7 questions)

Schema: WebPage + Product/Offer + FAQPage + BreadcrumbList
CTA: Book a Call
```

**You provide:** the pricing copy (1–2 hours of your time). I'll wire the page.

---

### 2. `/erp-for-furniture-manufacturers.html` - Industry landing page

**Primary KW:** ERP for furniture manufacturers
**Secondary:** furniture production management software, furniture export ERP India, ERP for plywood / particleboard furniture
**Search intent:** commercial
**Why P0:** `case-elite.html` is a *case study* (one customer's story), not an industry landing page. A user searching "ERP for furniture manufacturers" lands on a single-customer story rather than an industry overview.

**Page outline:**
```
URL: /erp-for-furniture-manufacturers.html
Title: ERP for Furniture Manufacturers - 7-Day Deploy | SimpleGrid (60)
Description: Customized ERP for furniture exporters and domestic manufacturers. Wood-species tracking, contractor settlements, multi-stage QC. Live in 7–21 days. (151)

H1: ERP for furniture manufacturers - modeled around your wood, your contractors, your stages.
H2: What's actually different about furniture manufacturing operations.
  H3: Wood species + dimensions + cubic feet (not just "units")
  H3: Stage-by-stage tracking with QC gates
  H3: Multiple contractors, each with their own settlement formula
  H3: Component-level production → SKU-level dispatch
H2: How SimpleGrid models furniture operations.
H2: Real example - Elite Arts & Crafts deployed in 21 days.   [link to /case-elite.html]
H2: FAQ for furniture manufacturers.

Schema: WebPage + Service + FAQPage + BreadcrumbList
Internal links: /case-elite.html, /product.html, /erp-for-apparel-manufacturers.html, /pricing.html
```

**You provide:** ~800 words covering the industry-specific operations + 5 FAQs.

---

### 3. `/erp-for-apparel-manufacturers.html` - Industry landing page

**Primary KW:** ERP for apparel manufacturers
**Secondary:** garment manufacturing ERP, CMT production software, apparel ERP India, fabric inward tracking
**Search intent:** commercial
**Why P0:** same story as furniture - `case-apex.html` is a case study, not an industry landing page.

**Page outline:**
```
URL: /erp-for-apparel-manufacturers.html
Title: ERP for Apparel Manufacturers - 7-Day Deploy | SimpleGrid (58)
Description: Customized ERP for CMT, own-brand, and fabric trading apparel operations. Job worker tracking, ephemeral SKUs, brand-nominated suppliers. (151)

H1: ERP for apparel manufacturers - built for job work, ephemeral SKUs, and brand-nominated suppliers.
H2: What's actually different about apparel CMT operations.
  H3: 100% job work coordination across 20+ facilities
  H3: Ephemeral SKUs generated per work order
  H3: Brand-nominated supplier networks
  H3: Dual size systems (S/M/L vs 38/40/42)
H2: How SimpleGrid models apparel operations.
H2: Real example - Apex Apparel live in 12 days.   [link to /case-apex.html]
H2: FAQ for apparel manufacturers.

Schema: WebPage + Service + FAQPage + BreadcrumbList
Internal links: /case-apex.html, /product.html, /erp-for-furniture-manufacturers.html, /pricing.html
```

**You provide:** ~800 words + 5 FAQs.

---

### 4. `/vs-sap.html` - Comparison page

**Primary KW:** SAP alternative for manufacturers
**Secondary:** SAP Business One alternative, SAP too expensive small manufacturer, SimpleGrid vs SAP
**Search intent:** commercial/informational
**Why P0:** "SAP alternative" is one of the highest commercial-intent searches in your ICP. No page targets it.

**Page outline:**
```
URL: /vs-sap.html
Title: SimpleGrid vs SAP Business One - 7 Days, Not 18 Months | SimpleGrid (60)
Description: SAP Business One alternative for mid-market manufacturers. Deploy in 7 days vs 18 months. $0 upfront vs $500K. Real comparison, no marketing. (149)

H1: SimpleGrid vs SAP Business One - 7 days, not 18 months.
H2: Side-by-side comparison.
  (feature table: deployment time, upfront cost, customization fee, fit for manufacturing, who uses it, IT team required)
H2: When SAP Business One is the right choice.
H2: When SimpleGrid is the right choice.
H2: How to migrate from SAP to SimpleGrid.
H2: FAQ.
  Q: Is SimpleGrid better than SAP for furniture/apparel?
  Q: How much does SAP Business One cost vs SimpleGrid?
  Q: Can I migrate my SAP data to SimpleGrid?

Schema: WebPage + FAQPage + BreadcrumbList
Internal links: /product.html, /pricing.html, /vs-tally.html, /vs-zoho.html
```

**You provide:** the honest comparison content + 3–5 FAQs.

---

### 5. `/vs-tally.html` - Comparison page (huge in India market)

**Primary KW:** Tally alternative for manufacturing
**Secondary:** beyond Tally for production, Tally manufacturing module, Tally vs SimpleGrid
**Search intent:** commercial (India-heavy)

**Page outline:**
```
URL: /vs-tally.html
Title: SimpleGrid vs Tally - From Books to Factory Floor | SimpleGrid (58)
Description: Tally is great for accounting. SimpleGrid runs the factory. Side-by-side: production stages, contractor settlements, multi-location inventory. (155)

H1: SimpleGrid vs Tally - beyond accounting, into the factory floor.
H2: Side-by-side comparison.
H2: When Tally is enough.
H2: When you've outgrown Tally.
H2: How to add SimpleGrid alongside Tally (you can keep both).
H2: FAQ.

Schema: WebPage + FAQPage + BreadcrumbList
Internal links: /product.html, /pricing.html, /vs-sap.html, /erp-for-furniture-manufacturers.html
```

**You provide:** comparison content (acknowledging where Tally wins) + FAQs.

---

### 6. `/vs-zoho.html` - Comparison page

**Primary KW:** Zoho alternative for manufacturers
**Secondary:** Zoho Creator ERP limitations, Zoho ERP for manufacturing
**Search intent:** commercial

**Page outline:**
```
URL: /vs-zoho.html
Title: SimpleGrid vs Zoho ERP - Modeled, Not Templated | SimpleGrid (58)
Description: Zoho ERP runs on generic templates. SimpleGrid models your factory. Side-by-side comparison for mid-market manufacturers. (135)

H1: SimpleGrid vs Zoho ERP - modeled on your factory, not on a generic template.
H2: Side-by-side comparison.
H2: When Zoho is enough.
H2: When SimpleGrid is the better fit.
H2: FAQ.

Schema: WebPage + FAQPage + BreadcrumbList
Internal links: /product.html, /pricing.html, /vs-sap.html
```

---

## P1 - important secondary intent

### 7. `/erp-for-pharma-distributors.html` - Industry landing page

**Primary KW:** ERP for pharma distributors
**Secondary:** pharmaceutical distribution software, pharma inventory management, supplier offer scheme tracking

```
H1: ERP for pharma distributors - built around supplier offers, scheme logic, and live recency ranking.
H2: What's different about pharma distribution operations.
H2: How SimpleGrid models pharma operations.
H2: FAQ.
```

---

### 8. `/faq.html` - Standalone FAQ page

**Primary KW:** SimpleGrid ERP FAQ
**Secondary:** how does SimpleGrid work, SimpleGrid pricing FAQ, ERP for manufacturers FAQ

Aggregate Q&As scattered across the site into one comprehensive page. Add `FAQPage` schema. Eligible for Google rich results.

Suggested 15–20 questions:
- How long does deployment really take?
- What does the 30-day free trial include?
- Can I migrate my Tally / SAP data?
- What if I don't have an IT team?
- How does SimpleGrid handle multi-factory operations?
- (etc.)

---

### 9. `/contact.html` - Self-hosted contact / book-a-demo

Currently CTAs link to `https://cal.com/simplegrid-ai` (external). A dedicated `/contact.html` would:
- Capture branded "simplegrid contact" + "book demo simplegrid" queries
- Embed Cal.com iframe
- Add `LocalBusiness` schema (with the HSR Layout, Bengaluru address)

Low priority but cheap to build.

---

### 10. `/erp-for-textile-manufacturers.html` - Industry landing page (P1)

**Primary KW:** ERP for textile manufacturers
**Secondary:** textile production management, fabric mill ERP

Same template as furniture / apparel pages.

---

## P2 - additional comparison + content opportunities

### 11. `/vs-erpnext.html`
**KW:** ERPNext alternative - open-source ERP comparison.

### 12. `/vs-odoo.html`
**KW:** Odoo alternative for manufacturers.

### 13. `/vs-katana.html`
**KW:** Katana MRP alternative.

---

## Suggested blog cluster posts (per brief Section 8)

The 17 existing posts cover product deep-dives well, but the brief recommends commercial/operator-intent cluster posts. Top 5 to add:

1. **"Why manufacturers outgrow spreadsheets (and what to do about it)"** - funnel-top, links to /product and pricing
2. **"What is schema-driven ERP?"** - explains the concept, links to /product
3. **"ERP deployment: why 18 months is no longer acceptable"** - comparison-bait, links to /vs-sap
4. **"How to evaluate ERP for a 200-person factory"** - buyer-guide intent, links to all comparison pages
5. **"The real cost of ERP: hidden fees manufacturers miss"** - links to /pricing

---

## Proposed launch sequence

| Sprint | Pages |
|---|---|
| 1 (this week) | `/pricing.html` |
| 2 | `/erp-for-furniture-manufacturers.html`, `/erp-for-apparel-manufacturers.html` |
| 3 | `/vs-sap.html`, `/vs-tally.html` |
| 4 | `/erp-for-pharma-distributors.html`, `/vs-zoho.html` |
| 5 | `/faq.html`, `/contact.html` |
| 6+ | Remaining comparison pages, blog cluster posts |

Each sprint roughly = one solid week of your copy work + one day of my page-shell work + linking + JSON-LD.

---

## What I deliver per page once you write the copy

For each new page you approve:
1. Static HTML file with full `<head>` SEO (title, description, canonical, OG, Twitter)
2. JSON-LD schemas (WebPage + Service or Product + FAQPage + BreadcrumbList)
3. Visual layout matching site style (using existing CSS classes - no new design system needed)
4. Internal links to/from sibling pages per the linking topology
5. CTA wired to `https://cal.com/simplegrid-ai`
6. Sitemap entry + lastmod
7. Mobile responsive

You write the body copy. I do everything else.
