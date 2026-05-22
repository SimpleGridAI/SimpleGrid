# SimpleGrid.ai - US SEO Strategy (Blue-Ocean / Pain-First Model)

**Date:** 2026-05-22
**Market:** United States only.
**Constraint:** zero domain authority, zero link budget, no competition with established ERP vendors or high-DA review sites.
**Two-target model:** Target 1 = **PAIN keywords** (manufacturers describing operational problems, not shopping for vendors). Target 2 = **furniture vertical + OH/IN/NC geo** (most as sales-enablement, the software-intent few as SEO).
**Tooling used:** Google autocomplete US locale (~60 seeds split between pain + furniture/geo - `seo-research/pain-autocomplete.txt`, `seo-research/geo-autocomplete.txt`), live-site audit (`audit-artifacts/`), competitor SERP intelligence from prior audit. **No Search Console connected; no Ahrefs/Semrush.** All volumes ESTIMATED with the signal noted. Reddit/Quora pain-language inference from the heavy "reddit" presence in autocomplete results.

---

## 1. Executive Summary

**The strategy in 4 sentences.** Stop chasing any keyword the established ERP world already owns; the SERPs are locked and SimpleGrid cannot win them in the next 18 months. Instead, target the **pain language manufacturers use BEFORE they know "ERP" is the answer** - "how to track work orders in excel", "quickbooks work in progress report", "how to calculate job cost in manufacturing", "production tracking excel template", "how to schedule factory production". Then layer a second wave of **cabinet shop / furniture manufacturing software** pages with built-in OH/IN/NC sales-enablement landing pages for outbound. These are tiny markets - 50–500 searches/month each - but the SERPs are dominated by Reddit threads, Excel-template-download sites, and thin blogs that SimpleGrid can beat on depth in week 1.

**Single highest-ROI move this week:** write **`/guides/how-to-track-work-orders-in-excel/`** - a 2,000-word, founder-written piece that gives the actual Excel template (download), shows three working-but-painful Excel approaches, then names the wall every Excel approach hits, and frames SimpleGrid as the soft landing. Google autocomplete confirms 5+ variations of this exact query; page 1 is currently template-bait blogs (Smartsheet, Atlassian, Excel-template aggregators) - none of them speak to a manufacturer's real workflow. SimpleGrid wins on substance in 60 days.

**The hard rule** (do not break): no NetSuite/Acumatica/Epicor/SAP/Odoo/JobBOSS pages, no "best ERP" pages, no "ERP alternative" pages, no competitor "vs" pages - those SERPs all have a major vendor or a high-DA review site on page 1. Every keyword recommended in this strategy passed a winnability gate.

---

## 2. Baseline - current SEO state

After today's deploy (3 commits), the foundation is in place:
- ✓ 28 indexable URLs (sitemap.xml); all 200.
- ✓ Pre-rendered h1 + body text + nav on every audited page.
- ✓ robots.txt explicitly allows GPTBot, ClaudeBot, PerplexityBot.
- ✓ `/llms.txt` published.
- ✓ All 17 blog posts pre-rendered with valid schema.
- ✓ Mobile Lighthouse median Perf 92–99 / LCP < 3 s (passes Core Web Vitals as a ranking factor).
- ✓ Source repo no longer publicly served (was a credibility issue, not SEO).

**Unverified - connect Google Search Console TODAY:**
- Current organic impressions per query: unknown.
- Queries already ranking position 5–20 (the cheapest wins): unknown.
- Backlink count: ESTIMATED near-zero (domain founded 2025, no link signals visible).
- Domain Authority: ESTIMATED 0–5 / 100.

**Action: 5-minute GSC setup TODAY.** This is the single most valuable measurement decision and unlocks the "quick wins" section of this strategy.

---

## 3. Target 1 - Pain Keywords (primary focus, months 1–2)

The searcher doesn't know "ERP" is the answer. They're describing a problem. Big vendors don't write for these queries because the volume is small and the audience isn't yet "vendor-aware." That's exactly why we win them - and the people typing them are PROVEN to be our buyer (only manufacturers track work orders).

### 3a. Pain themes + the keywords we own (with winnability gate result)

For each: estimated volume, estimated keyword difficulty (KD), intent, SERP composition (today's page 1), winnability verdict.

**Volume buckets:** XS = <50/mo, S = 50–250, M = 250–1k, L = 1k–5k.
**KD scale:** 0–100, lower = easier.
**OS** = Opportunity Score 0–100 (higher = priority). Weights: SERP weakness 40%, intent 30%, difficulty 20%, business fit 10%. Volume is NOT a major weight by design.

#### Theme A - Work-order tracking (the universal manufacturer pain)

| # | Keyword | Vol | KD | Intent | Current SERP | Winnable? | OS | Maps to |
|---|---|---|---|---|---|---|---|---|
| 1 | `how to track work orders in excel` | M | 18 | P→S | Template aggregator blogs (Smartsheet, Vertex42, ProjectManager.com); no major ERP vendor | **YES** | **96** | `/guides/how-to-track-work-orders-in-excel/` |
| 2 | `best way to track work orders` | S | 22 | S | Reddit, BuilderTrend (construction), forum threads, no major ERP vendor | **YES** | 92 | `/guides/best-way-to-track-work-orders/` |
| 3 | `how to organize work orders` | XS | 18 | P | Smartsheet, ProjectManager.com, generic blogs | **YES** | 88 | section within #2 |
| 4 | `how to manage work orders` | S | 25 | S | UpKeep (CMMS), Limble (CMMS), MaintainX - adjacent niche but not ERP vendors | **YES** | 84 | `/guides/how-to-manage-work-orders/` |
| 5 | `tracking custom manufacturing orders` | XS | 16 | P | Empty SERP - thin pages only | **YES** | 86 | section within #1 |

#### Theme B - Excel / spreadsheet limit (the wedge that names the wall)

| # | Keyword | Vol | KD | Intent | Current SERP | Winnable? | OS | Maps to |
|---|---|---|---|---|---|---|---|---|
| 6 | `production tracking excel template` | M | 20 | P→S | Template-download bait sites (Smartsheet, Vertex42, OnTheClock, Excel-Easy) | **YES** | 94 | `/guides/production-tracking-excel-template/` (give the template, then name the wall) |
| 7 | `excel template for production tracking` | S | 18 | P | Same as #6 | **YES** | 92 | section within #6 |
| 8 | `manufacturing tracking excel template` | S | 18 | P | Same | **YES** | 90 | section within #6 |
| 9 | `outgrowing spreadsheets manufacturing` | XS | 12 | P→S | Almost empty - handful of thin posts | **YES** | 90 | `/guides/outgrowing-spreadsheets-manufacturing/` (existing blog "Real Cost of Spreadsheets" already on this theme - see §6) |
| 10 | `manufacturing on spreadsheets` | XS | 14 | P | Almost empty | **YES** | 86 | merge into #9 |

#### Theme C - QuickBooks limits (the second universal pain - they're outgrowing QB)

| # | Keyword | Vol | KD | Intent | Current SERP | Winnable? | OS | Maps to |
|---|---|---|---|---|---|---|---|---|
| 11 | `quickbooks work in progress report` | M | 28 | P→S | Intuit official + Firm of the Future + accounting forum threads. **No major ERP vendor.** | **YES** | 88 | `/guides/quickbooks-work-in-progress-tracking/` |
| 12 | `quickbooks for manufacturing review` | S | 25 | V | Intuit + Software Advice (FAIL - DA site). **MIXED.** | partial | 68 | `/guides/quickbooks-for-manufacturing-honest-review/` (must be opinionated, not listicle) |
| 13 | `quickbooks track raw materials` | XS | 18 | P | Intuit community threads, no vendor | **YES** | 84 | section within #11 |
| 14 | `quickbooks online work in progress` | S | 26 | P | Intuit + accounting forums | **YES** | 80 | section within #11 |
| 15 | `quickbooks for a factory` | XS | 15 | P | Almost empty | **YES** | 82 | section within #12 |

**Note on #12:** Software Advice is on page 1, which would normally FAIL the winnability gate. But the SA page is generic listicle vs. a possible "founder who used QB at a 200-person factory tells you what specifically breaks" piece. Marginal - recommend writing but lower priority than the rest of Theme C.

#### Theme D - Job costing (the question every founder asks)

| # | Keyword | Vol | KD | Intent | Current SERP | Winnable? | OS | Maps to |
|---|---|---|---|---|---|---|---|---|
| 16 | `how to calculate labor cost in manufacturing` | M | 30 | P→S | Indeed, accounting blogs (AccountingTools, Patriot), Investopedia - high authority but generic | partial | 75 | `/guides/how-to-calculate-labor-cost-in-manufacturing/` |
| 17 | `how to calculate labor cost in manufacturing excel` | S | 25 | P | Generic template blogs | **YES** | 80 | section within #16 |
| 18 | `how to know if a job is profitable` | XS | 20 | P | Mixed - thin blogs | **YES** | 82 | `/guides/how-to-know-if-a-manufacturing-job-is-profitable/` |
| 19 | `how to calculate job cost manufacturing` | S | 28 | P→S | AccountingTools + Investopedia (DA, but generic) | partial | 72 | merge into #16 |
| 20 | `true landed cost calculation` | XS | 22 | S | Mixed | **YES** | 80 | existing blog post `/blog/how-to-calculate-true-landed-cost-per-sku-and-why-most-manufacturers-cannot/` already targets this - optimize, see §7 |

#### Theme E - WIP / inventory tracking

| # | Keyword | Vol | KD | Intent | Current SERP | Winnable? | OS | Maps to |
|---|---|---|---|---|---|---|---|---|
| 21 | `work in progress tracking software` | S | 30 | S→V | Mixed - Asana, Trello blogs, CMMS vendors. **No major ERP vendor.** | **YES** | 78 | `/guides/work-in-progress-tracking-software/` |
| 22 | `how to keep track of raw material inventory` | S | 22 | P | Smartsheet, generic blogs | **YES** | 85 | `/guides/how-to-track-raw-material-inventory/` |
| 23 | `wip tracking manufacturing` | XS | 18 | S | Almost empty | **YES** | 82 | merge into #21 |
| 24 | `manufacturing wip tracking` | XS | 18 | S | Almost empty | **YES** | 80 | merge into #21 |

#### Theme F - Production scheduling pain

| # | Keyword | Vol | KD | Intent | Current SERP | Winnable? | OS | Maps to |
|---|---|---|---|---|---|---|---|---|
| 25 | `how to make a production schedule for manufacturing` | S | 22 | P→S | Smartsheet, ProjectManager.com, generic blogs | **YES** | 86 | `/guides/how-to-make-a-production-schedule/` |
| 26 | `how to schedule manufacturing production` | XS | 20 | P | Mixed thin | **YES** | 82 | merge into #25 |
| 27 | `production scheduling small factory` | XS | 14 | P | Empty/near-empty | **YES** | 84 | merge into #25 |

#### Theme G - ERP fear / objection (right at the edge of vendor-aware)

| # | Keyword | Vol | KD | Intent | Current SERP | Winnable? | OS | Maps to |
|---|---|---|---|---|---|---|---|---|
| 28 | `how long does erp implementation take` | M | 30 | P→S | Panorama Consulting, ERP Focus, mid-DA implementation blogs | partial | 76 | optimize existing blog `/blog/how-ai-changed-erp-deployment-not-features-deployment/` - see §7 |
| 29 | `is erp worth it for small manufacturer` | XS | 18 | P | Empty | **YES** | 86 | `/guides/is-erp-worth-it-for-a-small-manufacturer/` |
| 30 | `do i need erp small business` | S | 25 | P | Mixed - Intuit blog + thin pages | **YES** | 78 | section within #29 |
| 31 | `erp too expensive small company` | XS | 14 | P | Empty | **YES** | 84 | section within #29 |
| 32 | `erp implementation failed` (and "failure rate") | S | 30 | P | Panorama Consulting + Forbes + Gartner (mixed) | partial | 70 | optimize existing blog `/blog/what-happens-when-your-erp-cannot-keep-up-with-your-business/` - see §7 |

#### Theme H - Subcontractor / contractor work tracking (niche pain, no competition)

| # | Keyword | Vol | KD | Intent | Current SERP | Winnable? | OS | Maps to |
|---|---|---|---|---|---|---|---|---|
| 33 | `tracking subcontractor work` | XS | 16 | P | Construction-industry tools (Procore, Buildertrend) - wrong vertical, not blocking SimpleGrid | **YES** | 82 | `/guides/tracking-subcontractor-work-manufacturing/` |
| 34 | `managing job workers` | XS | 14 | P | Empty / wrong vertical | **YES** | 80 | merge into #33 |
| 35 | `tracking contractor jobs` | XS | 16 | P | Construction tools | **YES** | 80 | merge into #33 |

### 3b. Tier 1 pain summary

**21 pain keywords passed the winnability gate** (OS ≥ 80). 4 more (#12, #16/19, #28, #32) are partial-winnable and will need stronger content depth to compete with mid-DA pages. **Combined Tier-1 estimated US monthly impressions if all rank page 1: 2,500–6,000.** Conversion floor of 1–2% organic → demo = 25–120 demos/month at steady state. This is meaningful for a founder-led startup.

The pattern: every one of these queries is asked by someone who (a) runs a manufacturing operation, (b) hasn't picked an ERP, (c) is in active pain. **100% buyer fit.**

---

## 4. Target 2 - Furniture vertical + OH/IN/NC geo (secondary, months 2–3)

### 4a. Software-intent furniture vertical keywords (real SEO plays)

These passed the winnability gate AND are software-intent (not B2C furniture buying).

| # | Keyword | Vol | KD | Intent | Current SERP | Winnable? | OS | Maps to |
|---|---|---|---|---|---|---|---|---|
| 36 | `cabinet shop management software` | S | 22 | V | Tradify, Joist, Joinerysoft - small vertical SaaS, no major ERP vendor | **YES** | 90 | `/erp/cabinet-shop-software/` |
| 37 | `cabinet shop scheduling software` | XS | 18 | V | Same small vendor set | **YES** | 88 | section within #36 |
| 38 | `cabinet shop project management software` | XS | 22 | V | Same | **YES** | 84 | section within #36 |
| 39 | `furniture manufacturing software` | M | 35 | V | Mixed - small vertical SaaS + a few mid-DA blogs. **No NetSuite/Acumatica/Epicor on page 1.** | **YES** | 82 | `/erp/furniture-manufacturing-software/` |
| 40 | `furniture factory software` | XS | 20 | V | Empty / small SaaS | **YES** | 84 | section within #39 |
| 41 | `furniture production software` | XS | 22 | V | Same | **YES** | 82 | section within #39 |
| 42 | `lumber inventory management software` | S | 25 | V | Niche SaaS (LumberTrack, etc.), no major ERP vendor | **YES** | 80 | `/guides/lumber-and-wood-inventory-management/` |
| 43 | `custom furniture order management` | XS | 18 | P→V | Empty | **YES** | 86 | section within #36 |

### 4b. Geo + furniture keywords - SALES ENABLEMENT, not SEO

The pure-geo queries below have **near-zero SEO volume** because most searches with these terms are B2C furniture buyers (Wayfair, Houzz traffic), not B2B software buyers. Building these pages **for SEO would be wasted effort.** BUT - they're high-value SALES ENABLEMENT assets: when SimpleGrid's founder cold-emails a furniture manufacturer in Hickory NC, the credibility lift from a local landing page ("We work with North Carolina furniture manufacturers - here's how SimpleGrid handles your specific challenges") raises reply rates significantly. Volume not the point; specificity is.

| # | URL | Purpose | Expected SEO volume | Sales-enablement value |
|---|---|---|---|---|
| 44 | `/erp/furniture-manufacturing-software/north-carolina/` | Hits the High Point / Hickory furniture-belt cluster. Outbound landing for NC manufacturers. | XS (real but tiny) | **HIGH** - first reply when emailing NC furniture-makers |
| 45 | `/erp/furniture-manufacturing-software/ohio/` | Hits the Cincinnati / northern Ohio furniture cluster. | XS | **HIGH** for OH outbound |
| 46 | `/erp/furniture-manufacturing-software/indiana/` | Hits the Shipshewana / Berne Amish-furniture cluster + central IN. | XS | **HIGH** for IN outbound |
| 47 | `/erp/furniture-manufacturing-software/north-carolina/high-point-hickory/` | OPTIONAL - only if Apex furniture pilot lives here. Cluster-page within NC pillar. | near-zero | Medium |

**Building rule for geo pages:** each is a real 1,200–1,500-word page with (a) a named local pain ("Hickory upholstery shops still settle contractors monthly on paper"), (b) a customer quote or industry reference from that region if possible, (c) the same SimpleGrid USP. No programmatic geo-spam, no thin city-name-templating across 50 cities. Three states, max five pages total.

### 4c. What we DROPPED in the geo set (intentional)

Searches like:
- `furniture manufacturers in ohio`, `furniture manufacturer indiana`, `furniture manufacturer north carolina`, `high point furniture industries`, `amish furniture indiana`, `hickory north carolina furniture`

**EXCLUDED.** These are B2C furniture-buying queries - page 1 is Wayfair / Houzz / local furniture brand sites. Wrong intent. SimpleGrid would never rank these and shouldn't try.

---

## 5. Dropped-Keywords Log (deliberately walked away)

For the record - these were considered and explicitly rejected by the winnability gate.

| Keyword | Why dropped |
|---|---|
| `manufacturing ERP`, `ERP for manufacturers`, `best ERP for manufacturing`, `ERP software` | Head terms locked by NetSuite, Acumatica, Epicor, SAP + G2/Capterra/TechRadar listicles. Cannot win without DA. |
| `NetSuite alternative`, `Acumatica alternative`, `Epicor alternative`, `SAP Business One alternative`, `Fishbowl alternative`, `JobBOSS alternative`, `Katana ERP alternative` | All EXCLUDED per absolute rule (no competitor brand terms). Despite being the previous strategy's centerpiece - this is the deliberate reversal. |
| `Acumatica vs NetSuite`, `Epicor vs Acumatica`, any other "X vs Y" | Same - competitor brand terms, excluded. |
| `ERP for furniture manufacturers`, `ERP for apparel manufacturers`, `ERP for metal fabrication industry` | Excluded for now - page 1 contains Acumatica, Epicor, Global Shop Solutions, BizAutomation. Replaced by software-intent variants (#39 "furniture manufacturing software") AND by pain-themed pages (#36 "cabinet shop management software") that win on specificity. |
| `manufacturing software for small business` | Page 1 has Acumatica, Sage, Software Advice. FAIL gate. |
| `furniture manufacturers in ohio / indiana / north carolina` | B2C furniture-buying intent. Wrong audience. |
| `furniture maker columbus ohio`, `furniture company indianapolis`, etc. | Same - B2C. |
| `katana erp`, `Acumatica`, `Epicor` (brand queries) | Excluded. |
| `MES software`, `manufacturing execution system` | Page 1 has SAP, GE Digital, Rockwell, Honeywell. FAIL gate. |
| `factory management software`, `production tracking software` | Mixed - bigger SaaS vendors (Rootstock, Plex, ECI) own most positions. FAIL or partial; not Tier 1. |
| `ERP free trial`, `ERP demo` | Generic, page 1 owned by Odoo, SAP, NetSuite + vendor directories. FAIL gate. |

**Discipline:** The temptation will be to add "NetSuite alternative" back to the list because the volume looks attractive. Don't. Page 1 has Software Advice (DA 90+), TechRadar (DA 92), G2 (DA 91) - SimpleGrid would need 18+ months and a real link budget to compete. The pain-keyword bucket has more buyer-fit traffic that's actually winnable.

---

## 6. Quick wins (positions 5–20 today)

**UNVERIFIED - needs Google Search Console.** This is the single most-valuable list in any SEO strategy and we genuinely can't generate it without GSC access. The 5-minute setup unlocks it:

1. Sign in to https://search.google.com/search-console
2. Add Property → URL prefix → `https://simplegrid.ai/`
3. Verify via DNS TXT record (you're already in Namecheap for the DMARC fix from AUDIT_FIXES_TODO.md)
4. Submit sitemap.xml in the Sitemaps section

Within 7 days you'll see exactly which queries SimpleGrid already has impressions for. Any query in **position 5–20** + sufficient impressions (>10/month) is a quick win - improve the page's content depth + add the query to the H1/H2/first paragraph, and most jump to page 1 within 2–4 weeks. This costs less effort than writing a new page and pays back immediately.

I'll re-prioritize this strategy after you connect GSC and share the top-100-queries report.

---

## 7. Existing-page optimization (do now, no new pages needed)

| Page | Current title | Proposed title | Why | Other fixes |
|---|---|---|---|---|
| `/blog/the-real-cost-of-running-your-factory-on-spreadsheets/` | "The Real Cost of Running Your Factory on Spreadsheets" | "The Real Cost of Running Your Factory on Spreadsheets (When You've Outgrown Excel)" | Captures #9 `outgrowing spreadsheets manufacturing` + #10 `manufacturing on spreadsheets` | Add an `<h2>` "When you've outgrown spreadsheets - the 5 signs" with a 5-item list. Add FAQPage schema with the 5 questions. |
| `/blog/how-ai-changed-erp-deployment-not-features-deployment/` | "How AI Changed ERP Deployment (Not Features)" | "How Long Does ERP Implementation Take? AI Compressed It From 18 Months to 7 Days" | Captures #28 `how long does erp implementation take` directly - a Tier-1 partial-winnable keyword | Add a comparison table (NetSuite - wait, no, **don't name competitors**; do "Module-based vendors vs schema-driven"). Add HowTo schema. |
| `/blog/what-happens-when-your-erp-cannot-keep-up-with-your-business/` | "When Your ERP Cannot Keep Up With Your Business" | "Why ERP Implementations Fail - The 5-Stage Decay Pattern" | Captures #32 `erp implementation failed` + `erp implementation failure rate` | Cite the Panorama Consulting failure stat. Add FAQPage schema. |
| `/blog/how-to-calculate-true-landed-cost-per-sku-and-why-most-manufacturers-cannot/` | (current title) | "How to Calculate True Landed Cost Per SKU (Why Most Manufacturers Can't)" | Already strong - captures #20 `true landed cost calculation` and adjacent to #16 job-cost queries | Add HowTo schema. Add an `<h2>` "The job-cost calculation, step by step" with numbered list. |
| `/blog/why-your-warehouse-manager-should-be-your-erp-s-first-user/` | (current) | "How to Manage Work Orders Your Warehouse Team Will Actually Use" | Captures #4 `how to manage work orders` | Pivot opener to be the "how-to" angle. |
| `/blog/how-to-calculate-true-landed-cost-per-sku-and-why-most-manufacturers-cannot/` | (above) | - | - | (already listed) |

**Cannibalization check:** none of the above conflict. The home page targets brand + "AI ERP for manufacturers"; product page targets "customized ERP for manufacturers"; the new pain pages all target uncontested how-to queries. Distinct.

---

## 8. Topical architecture (pain pillars + furniture cluster)

```
SimpleGrid.ai

PAIN PILLARS                         FURNITURE-VERTICAL PILLAR        EXISTING CONVERSION PAGES
/guides/                             /erp/                            /pricing.html
  work-order-tracking/  [hub]          furniture-manufacturing-       /product.html
    ├ how-to-track-work-orders-in-      software/  [hub]              /case-studies.html
        excel/                           ├ cabinet-shop-software/     /case-furniture-manufacturer/
    ├ best-way-to-track-work-orders/     ├ wood-and-lumber-              ↑ link UP from NC geo page
    ├ how-to-manage-work-orders/             inventory-management/    /case-apex/
    └ tracking-subcontractor-work-       └ custom-furniture-order-
        manufacturing/                       management/
                                                                      EXISTING BLOG (17 posts)
  spreadsheets-and-quickbooks/  [hub]    SALES ENABLEMENT (geo)        ↑ internal-link UP to pain
    ├ production-tracking-excel-           ├ north-carolina/             pillars after publish
        template/                          ├ ohio/
    ├ outgrowing-spreadsheets-             └ indiana/
        manufacturing/    ⤴ optimize
        existing blog instead              (Each 1,200-1,500 words;
    ├ quickbooks-work-in-progress-          NOT mass-produced; 3 states
        tracking/                           total + maybe 1 city sub-
    └ quickbooks-for-manufacturing-         page for the strongest
        honest-review/                      outbound cluster)

  job-costing/  [hub]
    ├ how-to-calculate-labor-cost-
        in-manufacturing/
    ├ how-to-know-if-a-manufacturing-
        job-is-profitable/
    └ true-landed-cost/  ⤴ optimize
        existing blog instead

  inventory-and-wip/  [hub]
    ├ work-in-progress-tracking-
        software/
    └ how-to-track-raw-material-
        inventory/

  production-scheduling/  [hub]
    └ how-to-make-a-production-
        schedule/

  erp-buyer/  [hub]
    ├ is-erp-worth-it-for-a-small-
        manufacturer/
    ├ how-long-does-erp-implementation-
        take/  ⤴ optimize existing
        blog
    └ why-erp-implementations-fail/
        ⤴ optimize existing blog
```

**Internal linking rules:**
1. Every pain article ends with a "How SimpleGrid handles this" section (200–300 words) that links to `/pricing.html` and the matching case study.
2. Pain hubs (`/guides/work-order-tracking/`, etc.) link laterally to the other pain hubs ("Once you've fixed work-order tracking, the next pain is usually job costing → link to that pillar").
3. The furniture-software pillar links DOWN to the three geo pages AND UP to `/case-furniture-manufacturer.html`.
4. Existing 17 blog posts get 1–2 contextual links retrofitted UP to the relevant pain pillar (do this when the pillar exists, not before).
5. Home `/` and `/product.html` add a footer "By problem you're trying to solve" section linking to the 5 pain pillars once they exist.

---

## 9. Content plan - page by page (priority order)

### NEW pain pages (months 1–2)

| Pri | URL | Type | Primary keyword | Words | Schema | Internal links |
|---|---|---|---|---|---|---|
| 1 | `/guides/how-to-track-work-orders-in-excel/` | How-to + downloadable template | `how to track work orders in excel` | 2,000 | HowTo + FAQPage | → /pricing, /case-furniture-manufacturer, /guides/work-order-tracking/ |
| 2 | `/guides/production-tracking-excel-template/` | Template-give-away guide | `production tracking excel template` | 2,000 | HowTo + FAQPage | → /pricing, /guides/spreadsheets-and-quickbooks/ |
| 3 | `/guides/quickbooks-work-in-progress-tracking/` | Pain-resolution guide | `quickbooks work in progress report` | 1,800 | Article + FAQPage | → /pricing, /guides/spreadsheets-and-quickbooks/ |
| 4 | `/guides/how-to-calculate-labor-cost-in-manufacturing/` | How-to guide | `how to calculate labor cost in manufacturing` | 1,800 | HowTo + FAQPage | → /blog/how-to-calculate-true-landed-cost-per-sku..., /guides/job-costing/ |
| 5 | `/guides/how-to-make-a-production-schedule/` | How-to guide | `how to make a production schedule for manufacturing` | 1,800 | HowTo + FAQPage | → /product, /pricing |
| 6 | `/guides/how-to-track-raw-material-inventory/` | How-to guide | `how to keep track of raw material inventory` | 1,500 | HowTo + FAQPage | → /guides/inventory-and-wip/ |
| 7 | `/guides/work-in-progress-tracking-software/` | Comparison-style guide | `work in progress tracking software` | 2,000 | Article + FAQPage | → /pricing, /product |
| 8 | `/guides/best-way-to-track-work-orders/` | Comparison guide | `best way to track work orders` | 1,800 | FAQPage | → /pricing, /guides/work-order-tracking/ |
| 9 | `/guides/how-to-manage-work-orders/` | Practical guide | `how to manage work orders` | 1,800 | HowTo + FAQPage | → /pricing, #8 |
| 10 | `/guides/is-erp-worth-it-for-a-small-manufacturer/` | Decision guide | `is erp worth it for small manufacturer` | 1,800 | FAQPage | → /pricing |
| 11 | `/guides/how-to-know-if-a-manufacturing-job-is-profitable/` | How-to + formula | `how to know if a job is profitable` | 1,500 | HowTo + FAQPage | → #4 |
| 12 | `/guides/quickbooks-for-manufacturing-honest-review/` | Opinionated review | `quickbooks for manufacturing review` | 2,000 | Article + FAQPage | → /pricing, #3 |
| 13 | `/guides/tracking-subcontractor-work-manufacturing/` | Niche pain guide | `tracking subcontractor work` | 1,500 | HowTo + FAQPage | → /case-apex (job-work case study) |
| 14 | `/guides/outgrowing-spreadsheets-manufacturing/` | Decision guide | `outgrowing spreadsheets manufacturing` | OPTIMIZE existing blog | FAQPage | (existing internal links) |

### NEW furniture-vertical pages (months 2–3)

| Pri | URL | Type | Primary keyword | Words | Schema |
|---|---|---|---|---|---|
| 15 | `/erp/cabinet-shop-software/` | Vertical-software pillar | `cabinet shop management software` | 2,500 | SoftwareApplication + FAQPage |
| 16 | `/erp/furniture-manufacturing-software/` | Vertical-software pillar | `furniture manufacturing software` | 2,800 | SoftwareApplication + FAQPage |
| 17 | `/guides/lumber-and-wood-inventory-management/` | Niche pain guide | `lumber inventory management software` | 1,800 | HowTo + FAQPage |
| 18 | `/erp/custom-furniture-order-management/` | Pain-vertical hybrid | `custom furniture order management` | 1,500 | SoftwareApplication + FAQPage |

### NEW geo sales-enablement pages (month 3)

| Pri | URL | Purpose | Primary "keyword" |
|---|---|---|---|
| 19 | `/erp/furniture-manufacturing-software/north-carolina/` | Outbound landing for NC | "furniture manufacturing software north carolina" (XS) |
| 20 | `/erp/furniture-manufacturing-software/ohio/` | Outbound landing for OH | (XS) |
| 21 | `/erp/furniture-manufacturing-software/indiana/` | Outbound landing for IN | (XS) |

### EXISTING blog posts to retitle + optimize (do in month 1 - fast wins)

| Existing URL | Action |
|---|---|
| `/blog/the-real-cost-of-running-your-factory-on-spreadsheets/` | Retitle per §7. Add a 5-item "signs you've outgrown spreadsheets" h2 list. FAQPage schema. |
| `/blog/how-ai-changed-erp-deployment-not-features-deployment/` | Retitle per §7. Add HowTo schema. Lead with the "how long does ERP take" answer. |
| `/blog/what-happens-when-your-erp-cannot-keep-up-with-your-business/` | Retitle per §7. Cite failure-rate stat in opening paragraph. |
| `/blog/how-to-calculate-true-landed-cost-per-sku-and-why-most-manufacturers-cannot/` | Add HowTo schema + numbered "step by step" h2. |
| `/blog/why-your-warehouse-manager-should-be-your-erp-s-first-user/` | Retitle per §7. Lead with the "how to manage work orders" angle. |

**Output of the 90-day content plan:** 14 new pain guides + 4 furniture pages + 3 geo enablement pages + 5 optimized existing blogs = 26 SEO assets touching 35+ Tier 1/2 keywords. Realistic at 7–10 hr/week for a founder.

---

## 10. On-page template (every new pain page)

Every pain page MUST hit this template:

1. **One `<h1>` containing the exact pain query** - front-loaded in raw HTML (today's static-seed pattern). Example: `<h1>How to Track Work Orders in Excel - And When Excel Stops Being Enough</h1>`.
2. **Lead paragraph (40–80 words) that answers the query directly** in the first 100 words. This is what Google AI Overviews quote. Example for #1: "If you're tracking work orders in Excel, the system works until about your 50th open job. At that point you'll start losing rows, double-booking machines, and reconciling totals by hand at month-end. Here are three Excel approaches that buy you another six months - and the wall every approach hits when you outgrow them."
3. **A free, downloadable Excel template or visual** (where it fits - #1, #2, #5, #6 all suit this). The give-away is what gets the page shared.
4. **3–5 `<h2>`s containing secondary keywords + question phrasings from "People Also Ask".**
5. **A specific, named "you'll hit this wall" section** explaining when the spreadsheet/QuickBooks/manual approach breaks. SimpleGrid-positive but not sales-y.
6. **An honest "is SimpleGrid the answer?" section** at the end (200–300 words) linking to `/pricing.html` and one matching case study.
7. **HowTo schema OR FAQPage schema** (or both) - Google's PAA boxes feed off these.
8. **Internal links** - 2–3 contextual links to other pain pages in the same theme + 1 to a conversion page.
9. **Quote from a real customer** if possible (Apex Apparel for #1, #6, #13; furniture customer for #15–18 + geo pages). The audit already noted SimpleGrid has these - pull existing copy.
10. **No vendor names** - never write "vs NetSuite", "vs Acumatica", "alternative to Epicor". The exclusion rule applies on content too, not just URL targeting.

---

## 11. Technical SEO recap

After today's deploy, ranking-relevant tech is now in place:
- ✓ Pre-rendered HTML on every landing page (CSR was the #1 ranking blocker)
- ✓ All 17 blog posts pre-rendered with valid Article + BreadcrumbList schema
- ✓ Privacy + Terms pre-rendered with full text
- ✓ FAQPage schema on `/pricing.html` (re-use this pattern on every new pain page)
- ✓ robots.txt explicitly allows AI crawlers
- ✓ `/llms.txt` published
- ✓ Mobile Lighthouse 92–99 Perf
- ✓ Color contrast WCAG AA (UX = ranking factor)

Still pending from AUDIT_FIXES_TODO.md (5-minute actions): Cloudflare for security headers + Brotli compression, DMARC for email deliverability. These are not big ranking levers but they close enterprise-procurement checks.

**New schema requirements per the strategy:**
- Every pain HOW-TO page → `HowTo` schema (steps mark-up)
- Every pain GUIDE page → `FAQPage` schema (5–8 Q&As)
- Every furniture-vertical pillar → `SoftwareApplication` schema (re-use the home page's pattern)

---

## 12. AI-search optimization (Tier 1, not a footnote)

Manufacturers increasingly ask ChatGPT / Claude / Perplexity / Gemini directly: "what's the cheapest way to track work orders?" or "do I need an ERP for my 200-person factory?". This is THE distribution channel for SimpleGrid because it sidesteps Google's ranking moat entirely.

What's already in place (today's deploy):
- ✓ robots.txt explicit allow for GPTBot, ClaudeBot, anthropic-ai, Claude-Web, PerplexityBot, Perplexity-User, Google-Extended, CCBot
- ✓ /llms.txt with structured SimpleGrid summary
- ✓ Pre-rendered HTML AI crawlers can read without JS
- ✓ Clean h1 + first-paragraph value prop on every page

What to add per pain page (extends the on-page template):
- **One quotable sentence in the first paragraph that summarizes the answer.** AI assistants quote single sentences, so write it as a quote: `"The fastest way out of Excel for work-order tracking is a configuration-driven ERP that mirrors your existing process - SimpleGrid deploys this in 7 days for $0 upfront."`
- **Repeat that exact line across pain pages in the same theme** so AI assistants converge on it (consistency = citation confidence).
- **Use clear semantic markup** - `<dl>` for definitions, `<ol>` for step-by-step, `<table>` for comparisons. AI parsers prefer structured HTML over free-form prose.

Measure success in 90 days: ask ChatGPT and Perplexity directly - "what's the fastest way to get off Excel for manufacturing tracking?" or "how do I know if my QuickBooks setup has outgrown my factory?". If SimpleGrid appears in the answer or sources, the strategy worked.

---

## 13. Off-page / authority (low-effort only)

| Channel | Effort | Why it works for pain content |
|---|---|---|
| **Reddit (r/manufacturing, r/smallbusiness, r/woodworking, r/Entrepreneur)** | 2 hr/week | Pain queries autocomplete heavily includes "reddit" (`netsuite alternative reddit`, `best erp for manufacturing reddit`). Answer the actual pain question with substance - link the SimpleGrid pain article ONLY when directly relevant. Don't spam. |
| **Quora (manufacturing topics)** | 1 hr/week | Lower-traffic but indexed by Google for years. One detailed Quora answer can rank above your own page sometimes. |
| **r/woodworking, r/cabinetry - for furniture vertical** | 1 hr/week | The furniture-cluster outbound is a perfect Reddit channel - small communities, real makers. |
| **Crunchbase, Pitchbook profiles** | 30 min once | Real backlinks + AI-search trust signal. |
| **Industry podcasts (Modern Manufacturing, Lean Blog, Manufacturing Hub)** | 1 podcast/month | Founder-led. Each guest spot = 1 high-DA backlink + the founder positioning no listicle can replicate. |
| **NTMA (National Tooling & Machining Association), AWFS (Assn. of Woodworking & Furnishings Suppliers), AAMA** | 1 hr to apply | Member directory backlink + occasional newsletter mention. AWFS specifically aligns with the furniture-cluster geo strategy. |
| **HackerNews / Indie Hackers - when strong pieces ship** | as relevant | One Show HN can drive 10–100 referring domains. The "How AI Compressed ERP Implementation" rewrite is a prime candidate. |

**Don't pay for links. Don't buy guest posts.**

---

## 14. Measurement & tracking

### KPIs (monthly review)
1. **Tier 1 keyword rankings** - pick the top 25 (Themes A–G) and rank-check monthly. Use SerpRobot free tier (10 keywords) + check the rest manually.
2. **Organic impressions + clicks per query** - from GSC, once connected.
3. **Organic-sourced demo requests** - PostHog event `book_a_call_click` with referrer = organic search.
4. **AI-search citation** - quarterly: prompt ChatGPT and Perplexity with 5 pain queries; record whether SimpleGrid appears.

### Setup actions (do today, 15 min total)
1. **Google Search Console** - verify simplegrid.ai via Namecheap DNS TXT (you're already there for DMARC).
2. **Bing Webmaster Tools** - same verification.
3. **Submit sitemap.xml** to both as soon as verified.
4. **Confirm `book_a_call_click` PostHog event** fires when CTA is clicked (open PostHog Live Events, click the button).

### Monthly cadence
- 1st of each month: pull GSC top-100 queries → any pain keyword in position 5–20 = improve that page immediately.
- Publish 1 pain article per week for 8 weeks, then 1 furniture page per week for 4 weeks, then 1 geo page per week for 3 weeks. Total 15 publishes in 15 weeks.

---

## 15. 90-day execution plan (sized for founder + ~8 hr/week)

### Month 1 - Foundation + pain articles (May 22 – June 22)
- **Week 1 (now):** Connect GSC + Bing WMT + submit sitemap. Publish **#1 `/guides/how-to-track-work-orders-in-excel/`** (the highest-ROI single page in the strategy).
- **Week 2:** Publish **#2 `/guides/production-tracking-excel-template/`** with a real downloadable Excel template (10-minute upload). Retitle existing blog: spreadsheets piece per §7.
- **Week 3:** Publish **#3 `/guides/quickbooks-work-in-progress-tracking/`**. Retitle existing blog: implementation-time piece per §7.
- **Week 4:** Publish **#4 `/guides/how-to-calculate-labor-cost-in-manufacturing/`**. Retitle existing blog: ERP-failure piece per §7. First GSC rank check on Tier 1.

### Month 2 - Rest of pain articles + start furniture (June 22 – July 22)
- **Week 5:** Publish **#5 `/guides/how-to-make-a-production-schedule/`** AND **#8 `/guides/best-way-to-track-work-orders/`**.
- **Week 6:** Publish **#6 `/guides/how-to-track-raw-material-inventory/`** AND **#9 `/guides/how-to-manage-work-orders/`**.
- **Week 7:** Publish **#7 `/guides/work-in-progress-tracking-software/`** AND **#10 `/guides/is-erp-worth-it-for-a-small-manufacturer/`**.
- **Week 8:** Publish **#11 `/guides/how-to-know-if-a-manufacturing-job-is-profitable/`** AND **#13 `/guides/tracking-subcontractor-work-manufacturing/`**. Internal-link sweep across all existing blog posts to retrofit links UP to the new pain pillars. GSC rank check.

### Month 3 - Furniture vertical + geo enablement (July 22 – August 22)
- **Week 9:** Publish **#15 `/erp/cabinet-shop-software/`** pillar (2,500 words).
- **Week 10:** Publish **#16 `/erp/furniture-manufacturing-software/`** pillar (2,800 words).
- **Week 11:** Publish **#17 `/guides/lumber-and-wood-inventory-management/`** AND **#18 `/erp/custom-furniture-order-management/`**.
- **Week 12:** Publish 3 geo enablement pages **#19, #20, #21** (NC, OH, IN). 1,200–1,500 words each - fast week because they share a template. GSC rank check + pivot for month 4.

**Realistic effort sizing:**
- Each pain how-to: 4–6 hr writing + 1 hr layout/QA.
- Each pillar: 6–8 hr writing + 1 hr.
- Each geo enablement page: 2 hr writing + 30 min.
- **Total month 1–3: ~80–110 founder hours over 12 weeks = 7–9 hr/week.** Sustainable.

**Expected outcome after 90 days:**
- 15 new pages published; 5 existing optimized.
- 12–18 of the 35 Tier-1/2 keywords on page 1; another 10–15 on page 2 (improvable in months 4–6 via link-building from podcast appearances + Reddit/Quora).
- 1,500–4,000 monthly organic impressions; 30–150 monthly organic clicks; 1–4 demos/month from organic - small in absolute terms but growing weekly.

---

## 16. Verification gaps + caveats

- **Volume + difficulty are ESTIMATED** from Google autocomplete frequency, SERP composition (manually inferred), and category benchmarks. No Ahrefs/Semrush. Validate the Tier 1 top 15 via Ahrefs free keyword generator (25/day free) before drafting their pages.
- **Quick wins (positions 5–20)** - UNVERIFIED without GSC. This is the most valuable unmeasured list. Connect GSC today.
- **SERP composition per keyword** - inferred from autocomplete patterns + the prior competitor audit. Manual SERP review of top 15 keywords (30 min each in a fresh browser, US locale) before drafting their pages. If the SERP shifts and a major ERP vendor appears, drop the keyword and re-pick.
- **AI-search citation rate** - no tooling exists today; will only be measurable by manually prompting ChatGPT/Perplexity quarterly.
- **The strategy assumes ~8 hr/week of founder time for writing.** Less than that, the timeline stretches. More, faster.

---

# How do I fix them all?

Below is the exact, ordered playbook to execute this strategy. Three tracks running in parallel.

## Track A - Measurement plumbing (Day 1, 30 minutes)

1. **Connect Google Search Console** (https://search.google.com/search-console). Add property → URL prefix → `https://simplegrid.ai/`. Verify via DNS TXT record in Namecheap. Done in 5 min.
2. **Connect Bing Webmaster Tools** (same DNS verification). Done in 5 min.
3. **Submit sitemap.xml to both**: `https://simplegrid.ai/sitemap.xml`.
4. **Verify PostHog `book_a_call_click` fires** - open PostHog Live Events panel in one tab, the home page in another, click "Book a Call" → confirm event in Live Events. 2 min.

You can do all four right now from your laptop without me. After 7 days, GSC will show what queries you're already getting impressions for - share that report with me and I'll re-prioritize this strategy with real data instead of estimates.

## Track B - Content publishing (weeks 1–12)

Pick a writing slot - for me, founders do best with a 90-minute block 3× per week. I can write the first draft for each page if you give me:
- The customer story / quote (if any)
- The specific operational detail you want highlighted (e.g. "we settle contractors per stage in cubic feet - make sure the example uses that")

For each page, the workflow is:
1. **I draft** (1,500–2,800 words depending on page type) - 2 hours of my work.
2. **You read + edit for voice** - 30–60 min.
3. **I commit + push** - 5 min.
4. **You post link in 1 Reddit thread + 1 Quora question per week** where it answers a real question - 20 min/week of Reddit + Quora maintenance.

Want me to start with **#1 `/guides/how-to-track-work-orders-in-excel/`** this week? Say "draft #1" and I'll write the page using:
- The pain framing already in your existing "Real Cost of Spreadsheets" blog post
- A real downloadable Excel template I'll attach as `/assets/work-order-tracker-template.xlsx`
- A clear "you'll hit this wall when..." section that names the breaking points
- Quote from the existing Apex case study
- Internal links to /pricing and /case-studies
- HowTo + FAQPage schema
- The "what is the fastest way" line for AI-search citation

## Track C - Outbound / authority (weeks 1–12)

Sustainable weekly motion, 1.5–2 hours total:
- **30 min Reddit** - read 3 threads in r/manufacturing or r/smallbusiness, answer one substantively. Only drop a SimpleGrid link if it genuinely answers the question.
- **30 min Quora** - same.
- **15 min Crunchbase / G2 / Capterra** - over weeks 1–2, set up the profiles. Then maintenance.
- **15 min monthly** - pitch 1 industry podcast (Modern Manufacturing, Manufacturing Hub, Lean Blog, AWFS guest spots). Doesn't have to convert immediately; the volume matters.

## Track D - Pending audit fixes (do this week, 30 min)

From AUDIT_FIXES_TODO.md, these are 5-minute jobs each that unlock SEO-adjacent value:
- **DMARC TXT record** - closes email deliverability for cold outbound (paired with podcast pitches).
- **CAA records + DNSSEC** in Namecheap - security signal.
- **Cloudflare in front of GitHub Pages** - adds security headers + Brotli compression + HTTP/3, all of which are Google ranking inputs (small but real). 15-20 min.

---

**Strategy complete.** Raw keyword research in `seo-research/pain-autocomplete.txt` + `seo-research/geo-autocomplete.txt`. The previous (NetSuite-alternative-centric) strategy is now obsolete - this document replaces it entirely.

**Your single move this week: write or have me draft `/guides/how-to-track-work-orders-in-excel/`. Connect GSC while you're at it.**
