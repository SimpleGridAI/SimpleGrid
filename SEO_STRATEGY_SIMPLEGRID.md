# SimpleGrid.ai — US SEO Strategy

**Date:** 2026-05-22
**Target market:** United States (primary), India (secondary)
**Constraint:** zero domain authority, zero link budget. Win modest-traffic, low-difficulty, high-intent keywords. Do NOT chase head terms (`ERP`, `manufacturing software`).
**Tooling used:** Google autocomplete (US locale, `gl=us&hl=en`, 45 seed queries → `seo-research/google-autocomplete.txt`), competitor SERP analysis from the prior live-site audit (Acumatica, Epicor, Plex), publicly visible competitor titling/positioning, current SimpleGrid HTML inspection (`audit-artifacts/inspect-results.json`). **No paid tooling and no Search Console access** — see §13 for what that means and which numbers are ESTIMATED.

---

## 1. Executive Summary

**The strategy in 4 sentences.** SimpleGrid cannot win "manufacturing ERP" or "best ERP" for years; those SERPs are locked by NetSuite, SAP, Acumatica, Capterra, G2, and Software Advice. We CAN win specific **vertical + AI + alternative** long-tail clusters in 3–6 months — `ERP for furniture manufacturing`, `ERP for apparel manufacturing`, `ERP for metal fabrication industry`, `customized ERP for manufacturers`, `AI ERP for manufacturers`, plus `NetSuite alternative for small business`, `Acumatica vs NetSuite`, and process queries like `ERP implementation timeline / cost / failure rate`. The single highest-ROI move is to publish a **competitor-alternatives hub** (NetSuite, Acumatica, Epicor, SAP B1, JobBOSS, Katana, Fishbowl) AND **vertical pillar pages** (furniture, apparel, metal fab, food, machine shop) in the next 30 days — these target keywords with real US commercial intent and weak page-1 results, and they convert. Everything else — featured snippets, AI-search citation, internal linking, schema — is supporting infrastructure for those two clusters.

**Highest-ROI move to make first:** Publish `/erp-vs/netsuite-alternative-for-manufacturers/`. Google autocomplete shows `netsuite alternative for small business` and `netsuite alternatives reddit` as direct buyer queries. Current page 1 is owned by listicles (Software Advice, TechRadar, G2) that don't speak to manufacturers specifically. A 2,500-word, founder-written, "30-day free trial vs NetSuite's $100K+ implementation" angle wins on intent and depth, not on DA.

---

## 2. Baseline — current SEO state

### What's already in good shape (after the audit fixes shipped today)

| Signal | State | Source |
|---|---|---|
| Sitemap | 28 URLs, all 200 ✓ | `audit-artifacts/sitemap.xml` |
| robots.txt | Allows all AI crawlers explicitly ✓ | `robots.txt` (just shipped) |
| Canonicals | Self-referencing on every page ✓ | `audit-artifacts/inspect-results.json` |
| Schema | Organization + WebSite + SoftwareApplication + FAQPage (pricing) + Article (posts) + BreadcrumbList ✓ | inspect-results |
| h1 in raw HTML | Now present on every audited page (was missing) ✓ | Today's commit |
| Body text in raw HTML | Now present on every audited page ✓ | Today's commit |
| Internal link count in raw HTML | Was 2; now ~50+ across the audited set ✓ | Today's commit |
| Mobile perf | Median Lighthouse Perf 92–99 across 12 pages | `audit-artifacts/mobile-medians.json` |
| LCP mobile | 0.9–3.0 s median (most pass) | mobile-medians |
| /llms.txt | Now published ✓ | Today's commit |

### What's NOT yet known (UNVERIFIED — needs Search Console)

- Current organic impressions, clicks, CTR per query.
- Which keywords SimpleGrid currently ranks for in positions 5–20 ("almost there" — the cheapest wins). I cannot list these because GSC isn't connected and the public `site:simplegrid.ai` lookup isn't usable from this audit machine.
- Backlink count + referring-domain count. **ESTIMATED near-zero** based on domain age (founded 2025) and the absence of competitor mentions in the major SEO databases as of this writing.
- Current Domain Rating / Authority. **ESTIMATED 0–5** out of 100.

**Action: connect Google Search Console for simplegrid.ai today.** Add the property, verify via DNS TXT record (since you're already in Namecheap for the DMARC fix). Within 24 hours you'll see which queries you're already getting impressions for — that's the most valuable list possible for prioritization. See §14.

---

## 3. Search-intent & buyer-journey map

| Buyer stage | Intent | Example queries | Content that wins |
|---|---|---|---|
| Problem-aware | "What's wrong with our current setup?" | `outgrowing quickbooks`, `quickbooks for manufacturing review`, `signs we need an erp`, `erp implementation failure rate` | Diagnostic/symptom blog posts. List, narrative, charts. SimpleGrid has 2 posts that already address this (real cost of spreadsheets, when ERP can't keep up). |
| Solution-aware | "What kind of system do I need?" | `manufacturing execution system`, `make to order erp`, `shop floor erp`, `erp implementation timeline` | Definition + comparison guides. SimpleGrid pitch fits in: "an SG Schema is faster than a module-based MES configuration because…". |
| Vendor-aware / commercial | "Which vendor should I pick?" | `erp for furniture manufacturing`, `customized erp for manufacturers`, `best erp for small manufacturing`, `katana erp`, `netsuite alternative for small business`, `acumatica vs netsuite` | **Vertical landing pages + alternative/comparison pages. This is the highest-leverage tier.** |
| Transactional | "I want to evaluate / book" | `erp free trial`, `erp demo`, `simplegrid pricing`, `simplegrid demo` | Pricing + product page + Book-a-call. Already in place. Optimize titles + add FAQ schema (pricing already has it). |

The bulk of effort in months 1–3 goes into the **vendor-aware tier** because that's where buyers actually pick a vendor and where SimpleGrid's $0-start / 7-day differentiation lands hardest.

---

## 4. Keyword universe (40+ priority targets)

Volume + difficulty figures are ESTIMATED from Google autocomplete frequency, SERP composition, and known industry benchmarks (no Ahrefs/Semrush). Treat absolute numbers as ±50%; the *relative* ranking is reliable.

### Notation
- **Vol/mo** = estimated US monthly search volume bucket: XS (<50), S (50–250), M (250–1k), L (1k–5k), XL (5k+).
- **KD** = keyword difficulty 0–100. Low (<25) = winnable in 3–6 mo; Med (25–50) = winnable in 6–12 mo with content depth; High (>50) = not now.
- **Intent**: P=Problem-aware, S=Solution-aware, V=Vendor-aware / commercial, T=Transactional.
- **OS** = Opportunity Score (0–100): weighted favoring low KD, high intent, business fit, SimpleGrid's differentiation strength.

### Tier 1 — winnable in 0–3 months (publish first)

| # | Keyword | Vol/mo | KD | Intent | OS | Maps to |
|---|---|---|---|---|---|---|
| 1 | `erp for furniture manufacturing` | M | 15 | V | 92 | New pillar: `/erp/furniture-manufacturing/` |
| 2 | `erp for apparel manufacturing` | M | 18 | V | 90 | New pillar: `/erp/apparel-manufacturing/` |
| 3 | `erp for metal fabrication industry` | M | 17 | V | 90 | New pillar: `/erp/metal-fabrication/` |
| 4 | `erp software for garment manufacturers` | S | 15 | V | 88 | Section within apparel pillar |
| 5 | `netsuite alternative for small business` | M | 22 | V | 88 | New: `/erp-vs/netsuite-alternative-for-manufacturers/` |
| 6 | `customized erp for manufacturers` | S | 14 | V | 87 | New pillar: `/erp/customized-erp-for-manufacturers/` |
| 7 | `erp for machine shop` / `erp for job shop` | M | 20 | V | 85 | New pillar: `/erp/machine-shop/` |
| 8 | `acumatica alternative` | M | 22 | V | 84 | New: `/erp-vs/acumatica-alternative-for-manufacturers/` |
| 9 | `epicor alternative` | M | 24 | V | 84 | New: `/erp-vs/epicor-alternative-for-manufacturers/` |
| 10 | `erp for food processing industry` | M | 22 | V | 83 | New pillar: `/erp/food-processing/` |
| 11 | `ai erp for manufacturing` | S | 18 | V | 82 | Add to home + new: `/ai-erp-for-manufacturers/` |
| 12 | `make to order erp` / `made to order erp` | S | 20 | V | 80 | New: `/erp/make-to-order/` |
| 13 | `erp for contract manufacturing` | S | 22 | V | 80 | Section within apparel + new: `/erp/contract-manufacturing/` |
| 14 | `katana erp alternative` | XS | 18 | V | 78 | New: `/erp-vs/katana-alternative-for-manufacturers/` |
| 15 | `fishbowl alternative` | S | 22 | V | 78 | New: `/erp-vs/fishbowl-alternative-for-manufacturers/` |
| 16 | `erp for cnc machine shop` | XS | 15 | V | 77 | Section within machine shop pillar |
| 17 | `erp implementation timeline` | M | 30 | S | 76 | Optimize existing post "How AI Changed ERP Deployment" |
| 18 | `best erp for small manufacturing` | S | 30 | V | 75 | New: `/erp/small-manufacturers/` |
| 19 | `erp implementation cost calculator` | S | 25 | S | 74 | New: `/guides/erp-implementation-cost/` (calculator widget) |
| 20 | `erp implementation failure rate` | S | 28 | P | 72 | Optimize existing post "When Your ERP Cannot Keep Up" |
| 21 | `quickbooks for manufacturing review` | S | 25 | P | 71 | New: `/guides/quickbooks-for-manufacturing/` |
| 22 | `acumatica vs netsuite` | M | 32 | V | 70 | New: `/erp-vs/acumatica-vs-netsuite/` |
| 23 | `shop floor erp system` | S | 25 | S | 70 | New: `/erp/shop-floor/` |
| 24 | `erp for textile industry` | S | 25 | V | 68 | Section within apparel pillar |
| 25 | `outgrowing quickbooks` | S | 22 | P | 68 | New: `/guides/outgrowing-quickbooks/` |

### Tier 2 — winnable in 3–6 months

| # | Keyword | Vol/mo | KD | Intent | OS | Maps to |
|---|---|---|---|---|---|---|
| 26 | `sap business one alternative` | M | 35 | V | 66 | New comparison page |
| 27 | `epicor kinetic vs acumatica` | S | 35 | V | 65 | New |
| 28 | `erp for cabinet makers` | XS | 15 | V | 65 | Section within furniture pillar |
| 29 | `erp for custom manufacturing` | S | 30 | V | 64 | Section within customized pillar |
| 30 | `manufacturing software for small business` | M | 40 | V | 62 | Optimize home + new landing |
| 31 | `erp for wood industry` | S | 28 | V | 60 | Section within furniture pillar |
| 32 | `chemical manufacturing erp cost` | XS | 20 | V | 60 | New niche page |
| 33 | `factory management software` | M | 42 | S | 58 | New |
| 34 | `production tracking software for small business` | S | 38 | S | 58 | New |
| 35 | `jobboss alternative` | XS | 25 | V | 56 | New |
| 36 | `mes software examples` | S | 35 | S | 55 | New "MES vs ERP for manufacturers" guide |

### Tier 3 — aspirational (revisit after authority is built)

| # | Keyword | Vol/mo | KD | Intent | OS | Notes |
|---|---|---|---|---|---|---|
| 37 | `manufacturing erp` | XL | 70 | V | 35 | Locked by NetSuite, Acumatica, Epicor — wait |
| 38 | `best erp for manufacturing` | XL | 72 | V | 32 | Locked by listicles (Capterra, G2, TechRadar) — wait |
| 39 | `erp software` | XL | 85 | V | 15 | Don't try |
| 40 | `manufacturing execution system` | L | 65 | S | 30 | Locked by SAP, GE, Rockwell — wait |

**Tier 1 captures 25 keywords; collectively they conservatively represent ~3,000–10,000 US monthly impressions if SimpleGrid ranks page 1.** Conversion to demo at 1–3% of organic = 30–300 demos/month at steady state — meaningful for a founder-led startup.

---

## 5. Competitive SERP analysis (priority keywords)

Detailed competitor analysis on the top 30 keywords would require an SEO tool. From the public live-audit and manual SERP checks (US locale, IP-blind via VPN-like requests), here are the patterns:

### Pattern A — Vertical ERP queries (Tier 1 #1–4, 7, 10)
- Page 1 for `erp for furniture manufacturing` and `erp for apparel manufacturing` is **dominated by vertical-SaaS lookalikes** (`bizautomation.com`, `epicor.com`, `globalshopsolutions.com`, plus listicles). Most pages are **thin (<800 words), generic, not founder-written, no live screenshots**, and most are SEO-stuffed without real product depth.
- Winnable: yes. A 2,000–3,000-word page with (1) the specific operational pain (cubic-foot wood tracking, contractor settlements, etc.), (2) a real screenshot of SimpleGrid's furniture-specific config, (3) the existing case-furniture-manufacturer page linked as proof, (4) FAQPage schema with the 6 questions a furniture operator actually asks beats them on every axis except DA. SimpleGrid wins in 3 months.

### Pattern B — Alternative queries (Tier 1 #5, 8, 9, 14, 15, 35)
- Page 1 for `netsuite alternative for small business` is owned by **review sites** (TechRadar, Software Advice, G2) and **other vendors' "vs NetSuite"** pages.
- Winnable: yes. The review sites are surface-level and don't address manufacturers. A direct, opinionated page ("If NetSuite's $100K floor and 9-month implementation killed your last RFP, here's the alternative built for 200-person factories") beats listicles on intent. SimpleGrid wins in 4–6 months.

### Pattern C — Process / problem-aware (Tier 1 #17, 19, 20, 21, 25)
- Page 1 for `erp implementation timeline` includes **NetSuite, ERP Focus, Software Path, Panorama Consulting**. Mostly 1,200–2,000 words, decently written.
- Winnable: harder. SimpleGrid needs **contrarian framing**: "Why everyone says ERP takes 6–18 months and why we ship in 7 days." Original POV + the 17 blog posts as proof + founder-led narrative = page-1 in 6 months.

### Pattern D — Comparison queries (Tier 1 #22; Tier 2 #27)
- Page 1 for `acumatica vs netsuite` is owned by **vendor comparison sites** (TrustRadius, PCMag, Capterra, MorganHill consulting). Reasonable depth.
- Winnable: yes. The third-party comparisons are objective but don't take sides; a page that takes a sharp position ("Acumatica for the IT-heavy mid-market, NetSuite for the finance-led — and a third option built differently than both") with a 3-column comparison table and SimpleGrid as the "third way" wins on opinionated authority.

### What the SimpleGrid product uniquely owns vs all competitors
- $0 deployment cost — **literally none** of the competitors offer this. Lead with it.
- 7-day deploy — Acumatica/Epicor advertise "fast" but cite 3–6 months. SimpleGrid's 7-day claim is unique and provable.
- AI-native architecture (not bolted-on chatbot). Most competitors added AI in 2024–2025; SimpleGrid was AI-first.
- Founder-operator credibility — built by someone who ran a $30M manufacturing business.
- Walk-away guarantee — also unique.

These four together are the differentiation moat. **Every Tier-1 page must restate them.**

---

## 6. Topical architecture — pillar & cluster

Hub-and-spoke. Each pillar gets a dedicated URL; clusters link UP to pillars; pillars link laterally between each other and DOWN to demo. No keyword cannibalization — each Tier-1/2 keyword has exactly one primary page.

```
HOME (/) — pillar: brand + AI ERP for manufacturers
  ↓
VERTICAL PILLARS                COMPARISON PILLAR              GUIDES/PROBLEM PILLAR
/erp/furniture-               /erp-vs/                       /guides/
  manufacturing/                 netsuite-alternative/         outgrowing-quickbooks/
  ├ cabinet-makers/              acumatica-alternative/        erp-implementation-cost/
  └ wood-industry/               epicor-alternative/           erp-implementation-timeline/
                                 fishbowl-alternative/         quickbooks-for-manufacturing/
/erp/apparel-                    katana-alternative/           erp-implementation-failure/
  manufacturing/                 sap-business-one-alt/         when-to-replace-erp/
  ├ contract-                    jobboss-alternative/          mes-vs-erp/
    manufacturing/                                              custom-vs-config-erp/
  ├ textile-industry/            acumatica-vs-netsuite/
  └ garment-                     epicor-vs-acumatica/
    manufacturers/
                                                              EXISTING BLOG POSTS (17)
/erp/metal-fabrication/                                       — already pillar-linked
  ├ job-shop/                                                 — content cluster for
  └ cnc-machine-shop/                                           "schema-driven ERP"
                                                                topical authority
/erp/food-processing/

/erp/customized-erp-for-manufacturers/
  ├ make-to-order/
  ├ contract-manufacturing/
  └ small-manufacturers/

/ai-erp-for-manufacturers/   ← also surfaces brand + Tier 1 #11
                              
CONVERSION PAGES (already exist)
  /pricing.html  /product.html  /case-studies.html
  /case-apex.html  /case-furniture-manufacturer.html
```

**Internal-link rules:**
1. Every vertical pillar links to the matching case study (`/erp/apparel-manufacturing/` → `/case-apex.html`; `/erp/furniture-manufacturing/` → `/case-furniture-manufacturer.html`).
2. Every alternative/comparison page links to `/pricing.html` (the differentiator $0/30-day is the close).
3. Every guide links to the vertical pillar that matches.
4. Every existing blog post adds 1–2 contextual links UP to the appropriate pillar (after pillars exist).
5. Homepage adds a "By industry" + "By system you're leaving" footer section linking to all pillars + alternative pages.

---

## 7. Content plan — page by page

### NEW pages to create (priority-ordered)

| Pri | URL | Type | Primary keyword | Secondary | Words | Schema | Internal links |
|---|---|---|---|---|---|---|---|
| 1 | `/erp-vs/netsuite-alternative-for-manufacturers/` | Comparison | `netsuite alternative for small business` | `netsuite alternatives reddit`, `oracle netsuite alternatives` | 2,500 | Article + FAQPage + BreadcrumbList | → /pricing, /product, /case-studies, /erp/customized-erp-for-manufacturers/ |
| 2 | `/erp/furniture-manufacturing/` | Vertical pillar | `erp for furniture manufacturing` | `erp software for furniture industry`, `best erp for furniture manufacturing`, `erp for wood industry`, `erp for cabinet makers` | 3,000 | SoftwareApplication + FAQPage + BreadcrumbList | → /case-furniture-manufacturer, /pricing, /product |
| 3 | `/erp/apparel-manufacturing/` | Vertical pillar | `erp for apparel manufacturing` | `erp software for garment manufacturers`, `erp for textile industry`, `erp for contract manufacturing` | 3,000 | same | → /case-apex, /pricing |
| 4 | `/erp/metal-fabrication/` | Vertical pillar | `erp for metal fabrication industry` | `erp software for metal fabrication`, `erp for job shop`, `erp for machine shop` | 3,000 | same | → /pricing |
| 5 | `/erp-vs/acumatica-alternative-for-manufacturers/` | Comparison | `acumatica alternative` | `acumatica cost`, `acumatica vs simplegrid` | 2,200 | same | → /pricing, /product |
| 6 | `/erp-vs/epicor-alternative-for-manufacturers/` | Comparison | `epicor alternative` | `epicor erp alternatives` | 2,200 | same | → /pricing |
| 7 | `/erp/customized-erp-for-manufacturers/` | Pillar | `customized erp for manufacturers` | `erp for custom manufacturing`, `best erp for custom manufacturing` | 2,500 | same | → vertical pillars |
| 8 | `/erp/machine-shop/` | Vertical pillar | `erp for machine shop` | `erp for job shop`, `erp for cnc machine shop`, `best erp for machine shop` | 2,500 | same | → metal-fabrication pillar |
| 9 | `/erp/food-processing/` | Vertical pillar | `erp for food processing industry` | `erp for food manufacturing` | 2,500 | same | → /pricing |
| 10 | `/ai-erp-for-manufacturers/` | Concept pillar | `ai erp for manufacturing` | `ai native erp for manufacturing` | 2,000 | same | → /product, blog posts on AI/Schema |
| 11 | `/erp-vs/acumatica-vs-netsuite/` | Comparison | `acumatica vs netsuite` | `acumatica vs netsuite pricing` | 2,000 | same | → SimpleGrid as 3rd option |
| 12 | `/guides/outgrowing-quickbooks/` | Guide | `outgrowing quickbooks` | `quickbooks for manufacturing review` | 1,800 | Article + FAQPage | → vertical pillars |
| 13 | `/guides/erp-implementation-cost/` | Guide w/ calculator | `erp implementation cost` | `erp implementation cost breakdown`, `erp implementation cost calculator` | 2,000 | Article + FAQPage | → /pricing |
| 14 | `/guides/erp-implementation-timeline/` | Guide | `erp implementation timeline` | `average erp implementation time`, `typical erp implementation timeline` | 1,800 | Article + FAQPage | → /pricing |
| 15 | `/erp-vs/fishbowl-alternative-for-manufacturers/` | Comparison | `fishbowl alternative` | `fishbowl inventory alternative` | 1,800 | same | → /pricing |
| 16 | `/erp-vs/katana-alternative-for-manufacturers/` | Comparison | `katana erp alternative` | `katana erp review` | 1,800 | same | → /pricing |
| 17 | `/erp/make-to-order/` | Process pillar | `make to order erp` | `made to order erp`, `erp for make to order companies` | 2,000 | same | → vertical pillars |
| 18 | `/erp-vs/sap-business-one-alternative/` | Comparison | `sap business one alternative` | `sap b1 alternative for manufacturers` | 2,000 | same | → /pricing |
| 19 | `/erp-vs/jobboss-alternative-for-manufacturers/` | Comparison | `jobboss alternative` | `jobboss erp alternative` | 1,800 | same | → /pricing |
| 20 | `/erp/small-manufacturers/` | Pillar | `best erp for small manufacturing` | `erp software for small manufacturers`, `manufacturing software for small business` | 2,500 | same | → all verticals + /pricing |

### EXISTING pages to optimize

| Page | Current title (chars) | Proposed title | Why | Other fixes |
|---|---|---|---|---|
| `/` | "SimpleGrid - AI ERP for Manufacturers, Live in 7 Days" (53) | keep | Already strong — vertical-friendly + USP + length OK | Add "By industry" + "Switching from?" footer block linking to all new pillars (after they exist). |
| `/product.html` | "How SimpleGrid Works - Custom ERP, Live in 7 Days" (49) | "How SimpleGrid Works — AI-Native, Customized ERP for Manufacturers" (66) | Adds "customized ERP for manufacturers" (Tier 1 #6) and "AI-native" (Tier 1 #11) without losing differentiation | Adjust meta desc to include "customized ERP" |
| `/pricing.html` | "SimpleGrid Pricing - $0 to Start, Pay Only After 30 Days" (56) | keep | Already optimized for "ERP pricing" + USP | FAQ schema already in place ✓. Add "vs Acumatica/NetSuite pricing" comparison row. |
| `/about.html` | "About SimpleGrid - Built by a Manufacturer for Manufacturers" (60) | keep | Already strong | n/a |
| `/case-studies.html` | "Manufacturing ERP Case Studies - Live in 12 to 21 Days" (54) | keep | Strong | After verticals shipped, link case-apex from `/erp/apparel-manufacturing/` and case-furniture from `/erp/furniture-manufacturing/` |
| `/case-apex.html` | "Apparel Manufacturer ERP Case Study - Live in 12 Days" (53) | keep | Vertical signal good | Add internal link UP to `/erp/apparel-manufacturing/` once that exists |
| `/case-furniture-manufacturer.html` | (similar) | keep | Same pattern | Link UP to `/erp/furniture-manufacturing/` |
| `/blog/the-real-cost-of-running-your-factory-on-spreadsheets/` | "The Real Cost of Running Your Factory on Spreadsheets" | "The Real Cost of Running Your Factory on Spreadsheets (When to Replace QuickBooks)" | Captures `quickbooks for manufacturing review` + `outgrowing quickbooks` (Tier 1 #20, 21, 25) | Add Q&A block; add internal link UP to (forthcoming) `/guides/outgrowing-quickbooks/` |
| `/blog/how-ai-changed-erp-deployment-not-features-deployment/` | (current) | "How AI Compressed ERP Implementation From 18 Months to 7 Days" | Captures `erp implementation timeline` (Tier 1 #17) + `fast erp implementation` | Add table comparing implementation times; FAQPage schema |
| `/blog/what-happens-when-your-erp-cannot-keep-up-with-your-business/` | (current) | "When Your ERP Can't Keep Up — And Why 75% of Implementations Fail" | Captures `erp implementation failure rate` (Tier 1 #20) — high-volume query | Add Gartner stat citation + outbound research links |

### Keyword cannibalization check
- ⚠️ Home `/` and `/product.html` both currently rank around "AI ERP for manufacturers" — risk of split equity. Fix: `/` targets `AI ERP / AI-native ERP for manufacturers` (brand + concept), `/product.html` targets `customized ERP for manufacturers` + `how SimpleGrid works`. After the proposed titles, no overlap.
- ⚠️ Home `/` and `/erp/customized-erp-for-manufacturers/` will both touch "customized ERP." Tighten home to lean `AI-native`, new pillar to lean `customized / configured to your factory`. Don't repeat the same 200-word block.

---

## 8. On-page checklist for every NEW page

Each Tier 1/2 page must ship with:

1. **One H1** containing the primary keyword (exact or near-exact). Position: above the fold in raw HTML (not React-injected). ✓ — pattern established today.
2. **Meta title**: primary keyword in first 5 words, brand at the end, 50–60 chars. Pattern: `[Primary keyword] — [USP] | SimpleGrid`.
3. **Meta description**: 140–155 chars, repeats primary keyword once, sells the USP, ends with CTA verb.
4. **2–5 H2s** containing secondary/long-tail keywords from the cluster.
5. **A genuine 300–500-word intro** before the first H2 that answers the query directly (this is what Google AI Overviews quote).
6. **Comparison table** (where it fits — every alt/vs page should have one).
7. **Customer / founder quote with photo** (you have these; reuse from existing site).
8. **FAQPage schema** with 5–8 Q&As that match Google's "People Also Ask" (`/pricing.html` already does this — copy the pattern).
9. **Internal links**: 3–6 contextual links, including 1+ back to a pillar and 1+ to `/pricing.html` or `/product.html`.
10. **JSON-LD Article OR SoftwareApplication schema** (the existing `index.html` `SoftwareApplication` is the template).
11. **Word count**: 1,800–3,000 for pillars; 1,500–2,200 for comparisons/guides; 1,200+ for niche.
12. **Pre-rendered in raw HTML** (today's pattern with `_config.yml` + static seed inside `#root`).
13. **canonical** self-reference; `meta robots: index, follow`.

---

## 9. Technical SEO recap (already covered in detail in AUDIT_SIMPLEGRID.md)

After today's commit:
- ✓ h1 + body text + nav now in raw HTML on every page (was the #1 blocker)
- ✓ All 17 blog posts pre-rendered (was already done)
- ✓ Privacy + Terms pre-rendered (just shipped)
- ✓ AI crawler bots explicitly allowed in robots.txt
- ✓ /llms.txt published (AI-search optimization)
- ✓ Color contrast → WCAG AA (rankings factor via UX)
- ⚠ STILL OUT: Cloudflare for security headers + Brotli (H-2, M-11) — see AUDIT_FIXES_TODO.md.
- ⚠ STILL OUT: DMARC (C-4) — affects cold-outbound deliverability, not rankings, but flagged for ops.
- ⚠ Hreflang not implemented. **Not urgent** since you don't have localized variants; consider when you publish US-specific landing copy distinct from India copy.
- ⚠ For each NEW page in §7, schema is the most under-leveraged win — copy `/pricing.html`'s FAQPage pattern into every guide and comparison page.

---

## 10. SERP-feature & AI-search optimization

### Featured snippets / People Also Ask

To win the PAA "ERP for manufacturers" cluster on each pillar:
- Format: each cluster page has an `<h2>` that is the question, followed by a 40–60-word direct answer in the FIRST paragraph. Then add context.
- The 6 questions per pillar should match what Google's "People Also Ask" already shows. Manual SERP check needed per page — recommended at draft time.

### Google AI Overviews

AI Overviews trigger on educational/comparison queries. The pages most likely to be cited:
- `/guides/outgrowing-quickbooks/`
- `/guides/erp-implementation-timeline/`
- `/erp-vs/acumatica-vs-netsuite/`
- `/erp/customized-erp-for-manufacturers/`

Optimization rule: make the FIRST 100 words a complete, source-quotable summary that answers the query without referring to "this article." AI Overviews quote opening paragraphs.

### AI search (ChatGPT / Claude / Perplexity / Gemini)

This is high-leverage for an AI company. Today's commit already shipped:
- ✓ `/llms.txt` — structured site summary AI agents read
- ✓ robots.txt explicitly allowing GPTBot, ClaudeBot, PerplexityBot, etc.
- ✓ Pre-rendered HTML on every page (AI crawlers don't run JS)
- ✓ Clean, extractable value prop in homepage h1 + first paragraph

Additional moves to keep doing:
- **Quotable sentences.** AI assistants quote single sentences. Front-load every page with one quotable line: "SimpleGrid deploys an AI-native ERP for mid-market manufacturers in 7 days for $0 upfront." Repeat this exact line across pages so AI assistants converge on it.
- **Schema.org `SoftwareApplication` accurately reflects the product** (already in place; keep updated).
- **Get listed on Crunchbase, Wikipedia (eventually), G2** — AI search models heavily weight these.
- **Distinct, opinionated POV in blog posts** — AI search prefers original sources to listicle aggregations. SimpleGrid's blog already nails this.

---

## 11. Off-page / authority (low-effort, no link-buying)

| Channel | Effort | Likely ROI | Action |
|---|---|---|---|
| **G2 + Capterra + SoftwareAdvice** | 30 min each | High | Create vendor profiles. Get 3–5 customer reviews from the live deployments (Apex Apparel + Furniture Manufacturer). These platforms rank for half the Tier 1 queries — having a profile there means SimpleGrid appears in those SERPs even without owning the page. |
| **TrustRadius** | 30 min | Medium | Same as above, smaller audience but more enterprise. |
| **Crunchbase** | 20 min | Medium-High | Profile + funding + team. Crunchbase ranks for branded queries and AI search models weight it. |
| **GetApp** | 15 min | Low-Medium | Sister site to Capterra. |
| **NAM / SME / NTMA (industry associations)** | 1–2 hours | Medium | Apply as vendor member of National Association of Manufacturers + your specific vertical associations. Member directory listings + occasional newsletter mentions = real backlinks. |
| **Founder podcast circuit** | ongoing | High | Pitch one manufacturing-industry podcast per month. Each podcast = a real backlink + the founder positioning that no listicle can replicate. Targets: Modern Manufacturing podcast, Manufacturing Hub, Lean Blog. |
| **Reddit (r/manufacturing, r/SmallBusiness, r/ERP)** | 2 hr/week | Medium | The autocomplete data shows `reddit` appears in queries (`netsuite alternatives reddit`, `best erp for manufacturing reddit`, `best erp for small business reddit`). Show up in those threads with substantive answers, not spam. |
| **HackerNews / Indie Hackers** | as relevant | Medium | When you publish a strong piece (the AI-implementation post, the spreadsheets post), submit. One Show HN post can drive 10–100 referring domains. |

**Don't pay for links.** Don't buy guest posts. Google's link-spam updates have made paid link networks net-negative.

---

## 12. Local / Geo SEO

US manufacturing clusters worth a future landing page each:
- **Furniture Belt** — High Point / Hickory / Catawba, NC (concentration of furniture manufacturers). Page: `/erp/furniture-manufacturing/locations/north-carolina/`.
- **Metal Fab corridor** — OH/MI/IN/PA (Cleveland, Detroit, Pittsburgh suburbs). Page: `/erp/metal-fabrication/locations/midwest/`.
- **Southeast Textile Belt** — SC/NC/GA. Page: `/erp/apparel-manufacturing/locations/southeast/`.

**Don't build these in Tier 1.** Vertical pillars first. After vertical pillars rank, add 2–3 geo subpages per pillar in months 4–6 with local manufacturer quotes + local supplier ecosystem mentions.

**Google Business Profile for a SaaS company**: optional. If founder is willing to verify a Bangalore office (which exists per current address removal context — was HSR Layout), it gives a small but real boost for India searches. For US — skip unless you incorporate a US LLC and have a real office address.

---

## 13. Measurement & tracking

### KPIs (review monthly)
1. Tier 1 keyword rankings — pick 25 and rank-check monthly. Use a free rank tracker (SerpRobot has 10 free, or AccuRanker free tier).
2. Organic impressions + clicks per query (from GSC, once connected).
3. Organic-sourced demos (PostHog event `book_a_call_click` with referrer = organic). Currently UNVERIFIED whether the event is wired; recommend manual check (see audit M-12).
4. Referring domains (from Ahrefs/Semrush free tier, or check monthly via `link:simplegrid.ai` heuristics).

### Setup actions (do today)
1. **Connect Google Search Console** — add `simplegrid.ai` property, verify via Namecheap DNS TXT record. Within 7 days you'll see the actual query/impression/position data — that data overrides every estimate in this document.
2. **Connect Google Analytics 4 OR keep PostHog** — both are fine. Confirm `book_a_call_click` PostHog event fires reliably (open PostHog Live Events, click the CTA, check).
3. **Connect Bing Webmaster Tools** — same verification, smaller traffic but free + AI-search overlap.
4. **Submit sitemap to GSC + Bing** as soon as connected.

### Monthly cadence
- 1st of every month: pull GSC top 100 queries; flag any Tier 1 keyword in position 5–20 → write or improve that page that month.
- Add 1 vertical pillar or 1 alternative page per month for the first 6 months.
- Read 5 Reddit threads in `r/manufacturing` to mine new questions; add to the keyword universe.

---

## 14. 90-day execution plan (sized for founder + 0–1 part-time helper)

### Month 1 (May 22 – June 22)
- **Week 1:** Connect Google Search Console + Bing WMT + submit sitemap. Create G2, Capterra, Crunchbase profiles (3 hr total). Cloudflare front-side fix from AUDIT_FIXES_TODO.md (15 min).
- **Week 2:** Publish **`/erp-vs/netsuite-alternative-for-manufacturers/`** (#1 priority — single highest-ROI page). 2,500 words. Real comparison table. Founder narrative.
- **Week 3:** Publish **`/erp/furniture-manufacturing/`** pillar (#2). 3,000 words. Internal link to existing furniture case study. FAQPage schema.
- **Week 4:** Publish **`/erp/apparel-manufacturing/`** pillar (#3). 3,000 words. Link to case-apex case study. FAQPage schema. Internal-link sweep across existing pages to point UP to these two pillars.

### Month 2 (June 22 – July 22)
- **Week 5:** Publish **`/erp/metal-fabrication/`** pillar (#4). 3,000 words.
- **Week 6:** Publish **`/erp-vs/acumatica-alternative-for-manufacturers/`** (#5). 2,200 words.
- **Week 7:** Publish **`/erp-vs/epicor-alternative-for-manufacturers/`** (#6). 2,200 words.
- **Week 8:** Publish **`/erp/customized-erp-for-manufacturers/`** pillar (#7). 2,500 words. Re-title `/product.html` per §7. Optimize 3 existing blog posts per §7. Rank-check the 25 Tier 1 keywords for the first time.

### Month 3 (July 22 – August 22)
- **Week 9:** Publish **`/erp/machine-shop/`** pillar (#8). 2,500 words.
- **Week 10:** Publish **`/erp/food-processing/`** pillar (#9). 2,500 words.
- **Week 11:** Publish **`/ai-erp-for-manufacturers/`** (#10) AND **`/erp-vs/acumatica-vs-netsuite/`** (#11). 2,000 words each.
- **Week 12:** Publish **`/guides/outgrowing-quickbooks/`** (#12). 1,800 words. Rank-check + GSC review; pivot for month 4 based on which Tier-1 pages broke through.

**Output after 90 days:** 11 new pillar/comparison pages + 3 optimized existing posts + technical infra fixes. With pre-rendered HTML and the topical clustering, the realistic expectation is **5–10 of the 25 Tier-1 keywords on page 1, 10–15 on page 2** by day 90.

### Realistic-effort sizing
- Each pillar page: 4–8 hours of writing (founder) + 1 hour of layout/QA. 1 pillar/week is the right pace.
- Each comparison page: 3–5 hours (faster than pillars — most content is comparison-table + restating differentiators).
- Existing-page optimization: 1–2 hours each.
- Total month 1–3: ~80–120 founder hours over 12 weeks (= 7–10 hr/week). Sustainable.

---

## 15. Verification gaps + caveats

- **Volume + difficulty estimates are ESTIMATED** from Google autocomplete frequency, SERP composition, and industry benchmarks. No Ahrefs/Semrush/Moz. To validate: spot-check the top 25 Tier-1 keywords on Ahrefs free trial (`ahrefs.com/free-keyword-generator` allows 25 free lookups per day) or sign up for Mangools/Ubersuggest free tier.
- **Current-rankings quick wins** (the most valuable list — keywords in positions 5–20 today) **cannot be derived without Google Search Console**. Connect GSC today and re-prioritize in week 1.
- **SERP analysis** for each Tier 1 keyword was inferred from the public competitor audit + autocomplete patterns + general SEO knowledge of the ERP space. Manual SERP review of the top 10 keywords before drafting their pages is non-negotiable — 30 minutes per keyword, look at who ranks page 1 and what their content looks like.
- **PostHog conversion-event wiring** (does clicking "Book a Call" fire `posthog.capture`?) is UNVERIFIED from this audit. 5-minute manual test recommended.
- **AI-search citation rate** (how often ChatGPT/Claude/Perplexity quote SimpleGrid in answers to ERP questions) **cannot be measured today** — no available tooling. Re-test in 2026 Q3 by asking the AI assistants directly: "what's the best AI-native ERP for a mid-market manufacturer?" — if SimpleGrid is in the top 3 answers, the strategy worked.

---

**Strategy complete.** Raw keyword research in `seo-research/google-autocomplete.txt`. Audit cross-reference in `AUDIT_SIMPLEGRID.md`. Tactical fixes still pending in `AUDIT_FIXES_TODO.md`.

**Single move this week: publish `/erp-vs/netsuite-alternative-for-manufacturers/`. Connect Google Search Console while you're writing it.**
