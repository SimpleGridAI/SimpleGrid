# Copy for Founder Review

Internal doc (excluded from publishing). Every NEW or CHANGED line of copy from the SEO build day. All of it can be rewritten — these are functional drafts, not final voice. No em dashes used. No fabricated facts/numbers/reviews.

---

## 1. Titles changed in T1.4 (already applied — confirm or rewrite)

| Page | OLD title | NEW title (≤60) |
|---|---|---|
| tools/job-cost-calculator | Free Job Cost Calculator for Manufacturers - Margin + Break-Even \| SimpleGrid (77) | Free Job Cost Calculator for Manufacturers \| SimpleGrid (55) |
| tools/purchase-order-generator | Free Purchase Order Generator - PDF Download in 30 Seconds \| SimpleGrid (71) | Free Purchase Order Generator (PDF) \| SimpleGrid (48) |
| tools/production-schedule-template | Free Production Schedule Template (Gantt) for Manufacturers \| SimpleGrid (72) | Free Production Schedule Template (Gantt) \| SimpleGrid (54) |
| tools/quality-inspection-checklist | Free Quality Inspection Checklist Generator for Manufacturers \| SimpleGrid (74) | Free Quality Inspection Checklist Generator \| SimpleGrid (56) |
| tools/invoice-generator | Free Invoice Generator for Manufacturers - PDF Download \| SimpleGrid (68) | Free Invoice Generator for Manufacturers \| SimpleGrid (53) |
| tools/bill-of-materials-template | Free Bill of Materials (BOM) Builder for Manufacturers \| SimpleGrid (67) | Free Bill of Materials (BOM) Builder \| SimpleGrid (49) |
| tools/digital-maturity-assessment | Digital Maturity Assessment for Manufacturers (SIRI) \| SimpleGrid (65) | Digital Maturity Assessment (SIRI) \| SimpleGrid (47) |
| competitors/dynamics-365 | SimpleGrid vs Microsoft Dynamics 365 Business Central \| Comparison (66) | SimpleGrid vs Dynamics 365 Business Central \| Comparison (56) |
| competitors.html | SimpleGrid vs SAP, NetSuite, Infor, Acumatica, Odoo, Dynamics, Doss, JobBOSS² \| Competitors (91) | SimpleGrid vs NetSuite, SAP, Acumatica & More \| Comparison (58) |

## 2. Borderline titles left AS-IS (61–64 chars — your call, low priority)
oee-calculator (61, keeps "(Overall Equipment Effectiveness)" keyword), sde-calculator (62), revenue-per-employee (61), erp-needs-assessment (64), exit-readiness-scorecard (62), downtime-cost-calculator (63), quote-generator (62). Blog headline titles (>60) were intentionally NOT touched — they are editorial.

## 3. Meta descriptions under ~140 chars (NOT auto-edited — please expand toward ~150)
These 27 pages have short metas that waste SERP space. Suggested direction noted; rewrite in your voice:
- tools/automation-roi-estimator (115), expansion-roi-calculator (124), cost-of-poor-quality (128), hire-vs-overtime (132) — add the concrete number/output the tool produces.
- case-studies.html (112) — add the proof (Apex 12 days, furniture 21 days).
- terms.html (97), security.html (125) — fine to leave; legal.
- Full list available from `seo-audit-data/onpage_signals.csv` (meta_len column < 140).

## 4. llms.txt — new lines added (T1.3)
Added: brand-disambiguation paragraph, "Proof points" block (Apex 12-day, furniture 21-day, 30-day free run, founder Mukund Agarwal), "Entity and profiles (sameAs)" block, and the full page list. Confirm the proof numbers are accurate and approved for AI assistants to repeat.

## 5. (Tiers 2–5 copy will be appended here as produced)

---

## TIER 2 — Entity / E-E-A-T (applied — confirm facts)

1. **Authorship attribution (IMPORTANT — confirm true):** All 18 blog posts + 2 case studies now declare `author` = **Person "Mukund Agarwal", Founder** (was Organization). This is an E-E-A-T signal and is only valid if Mukund is genuinely the author. If some posts have other/no individual authors, tell me and I will adjust.
2. **Organization schema** now includes `legalName: "Valaya AI Technologies Pvt. Ltd."`, `founder: Mukund Agarwal`, and `sameAs` expanded to LinkedIn + X + GitHub. Confirm the founder LinkedIn `linkedin.com/in/mdagarwal` is correct.
3. **Footer line changed** (Footer.jsx, site-wide on React pages): `© 2026 Valaya AI Technologies` -> `SimpleGrid, an AI-native ERP for US manufacturers, by Valaya AI Technologies Pvt. Ltd. © 2026`. Purpose: separate from the unrelated "Simplegrid Technology, Inc." Reword as you like.
4. **Founder Person entity** added to about.html schema. NOTE: a *visible* founder byline in the pre-rendered seed HTML of about.html needs SSR/pre-render of the React founder section (the body renders client-side); deferred and noted in OFF_CODE_HANDOFF. The founder is now crawlable via JSON-LD on the homepage + about page + as author on all articles + in llms.txt.
