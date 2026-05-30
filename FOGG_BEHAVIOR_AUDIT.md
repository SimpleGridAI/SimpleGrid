# SimpleGrid.ai - Behavioral Audit (Fogg Behavior Model)

**Lens:** A founder-led or owner-operated US manufacturer. $6M-$100M+ revenue. 50-1,500 employees. Multi-stage production (furniture, apparel/CMT, custom metal fab, food processing). No IT department. One decision-maker who can greenlight a deal. Not technical. Time-poor. Burned before by long ERP implementations, big upfront costs, broken promises. Thinks in machines, orders, scrap, labor, throughput, delivery dates.

**Model:** Behavior = Motivation x Ability x Prompt (B=MAP). All three must converge at the same moment. When a behavior does not happen, at least one of M/A/P was missing.

**Method:** Full crawl of the rendered site (React components in `components/*.jsx` and `app/*.jsx`, static HTML in `tools/`, `competitors/`, `blog/`, and root). Every quote below is real copy pulled from the source. Scores are 1-5, judged only through the manufacturer's eyes.

**Date:** 2026-05-31

---

## 1. Executive summary - top 5 findings, ranked by behavioral impact

### Finding 1 - The primary CTA does not do what every page promises. (Prompt + Ability)
The single loudest promise on the site is "try before you buy" and "see it work before you pay." Yet every "Book a demo" button (hero, nav, mobile, product, cases) opens [InviteModal.jsx:98](components/InviteModal.jsx#L98), a 3-field form titled "Book a demo" whose sub-line reads: *"We onboard selectively each quarter. Tell us about your operation - if we can win for you, we build it at our risk..."* On submit the visitor gets *"Request received. Thanks. We'll review within 48 hours."* ([InviteModal.jsx:83-84](components/InviteModal.jsx#L83)).

At the exact moment of peak motivation, the prompt converts "I want to see this run" into "submit an application and wait 48 hours to find out if you qualify." That is a velvet rope dropped on a buyer who is already reaching for the handle. The word "demo" sets the expectation of *seeing the product*; the form delivers a gated lead-qualification with no product in sight. **This is the highest-leverage fix on the site.**

### Finding 2 - Architecture jargon buries the buyer in cognitive load. (Ability)
The biggest ability killer for this visitor is brain cycles, and the site spends them on engineer-grade vocabulary the buyer neither understands nor wants. On the buyer's main path: *"SG Schema x SG Engine x Event Sourcing"*, *"append-only, cryptographically ordered, replayable to any point in time, regulator-ready"* ([EventsLedger.jsx:126-129](components/EventsLedger.jsx#L126)), *"The log is the database. The state is a projection"* ([EventsLedger.jsx:254](components/EventsLedger.jsx#L254)), *"your entities, your states, your transitions, your invariants, your chain reactions"* ([EventsLedger.jsx:243](components/EventsLedger.jsx#L243)). A factory owner with no IT staff does not know what an "invariant" or a "projection" is, and jargon makes them trust the site *less*, not more. The blog index even promises *"No jargon"* ([blog.jsx]) while 7 of 18 posts are titled "Event Sourcing", "Multi-Tenant Architecture", "Building an ERP Chatbot With Claude, No RAG".

### Finding 3 - The strongest motivator (zero cost, zero risk) is real and well-used, but it is told in prose, not made unmissable. (Motivation - this is the asset to protect)
The offer - *"We build it. You run it 30 days on your real floor. If it doesn't move the business, you walk. We earn nothing"* - is the most powerful pain-and-risk crusher on the site, and the homepage stat box (`$0 You Carry` / `30 Days`) lands it well ([HomeTop.jsx:362-376](components/HomeTop.jsx#L362)). This is the one thing competitors cannot match. It should be the first nine words a visitor reads on every page. Today it competes with a rotating headline, a color-picker toy, and a wall of architecture copy.

### Finding 4 - The homepage hero distracts at the moment of first impression. (Motivation + Ability)
The hero headline is a `CycleHeadline` that swaps through three different messages on a timer ([HomeTop.jsx:270-306](components/HomeTop.jsx#L270)), and a full-viewport `BurstBand` section ships a *splatter color picker* (Ocean / Sky / Lagoon / Night) the visitor can play with ([HomeTop.jsx:228-268](components/HomeTop.jsx#L228)). A time-poor owner gets a moving target instead of one clear claim, plus a decorative toy that signals "design project," not "factory tool." Neither raises motivation or ability for the target behavior.

### Finding 5 - Case studies are the site's best proof and they are hidden two levels deep. (Prompt placement)
The case studies carry the exact peer proof this skeptic needs - *"$200K leak stopped"*, *"planning 20h to 2h"*, *"live in 21 days"*, *"Two failed ERPs, then live in 12 days"*, plus named founder quotes. But they live under a "Resources" dropdown in the nav ([Nav.jsx:42-46](components/Nav.jsx#L42)), grouped with "Productive Tools" and "Blog." The strongest reason to believe is filed under the weakest label. A burned buyer looks for proof first; the site makes them hunt for it.

**Single highest-leverage fix on the whole site:** Rewire the primary "Book a demo" CTA so it delivers the promise instead of gating it - either an instant calendar booking (the cal.com link already exists) or, better, an instant "see a working demo" path - and strip the "selective / 48-hour review / if we can win for you" friction from the moment of click. The motivation is already maxed; the prompt is actively undercutting it.

---

## 2. Sitemap and target-behavior table

Crawled from the repo. Marketing/conversion pages render via React; tools, competitors, and blog posts are mostly static HTML.

| # | URL | Page | Primary target behavior | Competing/unclear behaviors? |
|---|-----|------|------------------------|------------------------------|
| 1 | `/index.html` | Home | Book a demo (opens InviteModal) | Yes - Log in, play with color picker, read 3 blog posts, 5 FAQ, cal.com vs modal mismatch |
| 2 | `/product.html` | Product | Book a demo / "See a live demo" | Mild - 12-message Hank chat, jump links to ledger |
| 3 | `/pricing.html` | Pricing | Book a demo (cal.com on tiers) | No - clean single intent |
| 4 | `/about.html` | About | Book a demo | Yes - "See how the system actually works" to product competes |
| 5 | `/case-studies.html` | Case studies hub | Book a demo / read a case | No |
| 6 | `/case-furniture-manufacturer.html` | Furniture case | Book a demo | Mild - cross-link to apparel case |
| 7 | `/case-apex.html` | Apparel case | Book a demo | Mild - cross-link to furniture case |
| 8 | `/competitors.html` | Competitors hub | Book a demo / pick a comparison | Yes - 8 competitor links pull attention |
| 9-16 | `/competitors/{netsuite, sap-business-one, infor, dynamics-365, acumatica, odoo, doss, jobboss2}/` | 8 competitor pages | Book a demo | No |
| 17 | `/tools/` | Tools hub (35 tools) | Use a free tool, then Book a demo | Yes by design - free utility vs buy |
| 18-52 | `/tools/{oee-calculator, ...}` (35 tools) | Individual tools | Use tool / export PDF, then Book a demo | Yes - tool use is the real draw |
| 53 | `/blog.html` | Blog index (18 posts) | Read a post, then Book a demo | Yes - browse 18 posts |
| 54-71 | `/blog/{slug}/` (18 posts) | Blog posts | Read, then Book a demo (mid + end CTA) | Mild |
| 72 | `/hiring.html` | Careers | Apply (mailto) | Off-audience - not for the manufacturer |
| 73 | `/security.html` | Security & disclosure | Read / trust signal | No (utility) |
| 74 | `/accessibility.html` | Accessibility statement | Read | No (utility) |
| 75 | `/privacy.html` | Privacy | Read | No (utility) |
| 76 | `/terms.html` | Terms | Read | No (utility) |
| 77 | `/404.html` | Not found | Recover to home | No (utility) |
| 78 | `/sg-schema.html` | SG Schema explainer | Read (technical) | Off-audience leaning |
| 79 | `/post.html?id=N` | Legacy blog redirect | Redirect to `/blog/{slug}/` | No (utility) |

**Site-wide target behavior:** Book a demo. **Site-wide problem:** that single phrase resolves to a gated application, not a demo (Finding 1).

---

## 3. Per-page scorecard (M / A / P, 1-5)

Scores are from the manufacturer's point of view only. "Limiting factor" is the weakest of the three - the block, per Fogg.

### Home - `/index.html`
**M 5 / A 2 / P 3 - Limiting factor: ABILITY (cognitive load + CTA mismatch)**

- **Motivation (5):** Hits pain dead-on. The "Why ERP Keeps Failing" black-hole visual labels real money draining away - *"Consultants, Integrations, Licensing cost, Delays, Change requests"* into *"$500K+ SUNK"* with three bad outcomes ([HomeTop.jsx:496-543](components/HomeTop.jsx#L496)). Hope: the hero stat box shows *`$0` You Carry* and *`30` Days - "On your real floor. Real team. Real orders"* ([HomeTop.jsx:362-376](components/HomeTop.jsx#L362)). Pain: *"You pay before you ever see what works... You only find out which one you got after the check clears"* ([HomeTop.jsx:478](components/HomeTop.jsx#L478)). Social proof: founder story *"We ran multi-stage factories to $30mn... We survived two ERP failures. We ended up back on Google Sheets"* ([HomeBottom.jsx:23](components/HomeBottom.jsx#L23)) plus two case cards with hard numbers. This is textbook Fogg motivation - pleasure/pain, hope/fear, social acceptance all present.
- **Ability (2):** The action (open a 3-field form) is easy, but the *page* is a long cognitive climb. The `section-dark` Architecture block hits the buyer with *"One permanent record... Configuration, not code... AI writes a configuration. Platform reads it and generates forms, workflows, rules, dashboards"* and *"Every rule is a row"* ([HomeBottom.jsx:194-196](components/HomeBottom.jsx#L194)). DataSecurity adds *"Multi-tenant isolation"* ([HomeBottom.jsx:173](components/HomeBottom.jsx#L173)). The `CycleHeadline` rotates three different value props, and `BurstBand` is a full-screen color-picker toy. All of this spends brain cycles the buyer wants for one decision.
- **Prompt (3):** "Book a demo" is everywhere - pulsing hero button ([HomeTop.jsx:352](components/HomeTop.jsx#L352)), nav, mobile sticky bar, FinalCTA. Visually obvious. Marked down because (a) the hero button opens a gated form, not a demo, and (b) the page mixes prompt types: the mobile sticky and FinalCTA point to `cal.com` while the hero opens the modal, so the same words behave differently.

### Product - `/product.html`
**M 4 / A 2 / P 4 - Limiting factor: ABILITY (most jargon-dense page on the buyer path)**

- **Motivation (4):** Strong operator framing - *"If your warehouse manager can send a text, he can run your ERP"* ([HomeTop.jsx:752](components/HomeTop.jsx#L752)) and *"replaces the fourteen Slack channels, six spreadsheets, and the approval lost in DMs"* ([EventsLedger.jsx:366](components/EventsLedger.jsx#L366)). The Hank chat shows the product answering real owner questions (*"What's slowing the plant this week?"*, *"Where are we bleeding margin this month?"*). Marked down because the flagship section is the abstract Events Ledger, not a floor outcome.
- **Ability (2):** This is the heaviest page. The hero leads with *"We don't sell software"* then the flagship `EventsLedger` section: *"Your enterprise, alive - every action recorded, every decision traceable, every state replayable"* with footer chips *"append-only, cryptographically ordered, replayable to any point in time, regulator-ready"* ([EventsLedger.jsx:58-129](components/EventsLedger.jsx#L58)). The Hank demo runs **12 message exchanges** ([EventsLedger.jsx:413-517](components/EventsLedger.jsx#L413)) - far past the point a time-poor owner keeps reading. Cognitive load is the block.
- **Prompt (4):** Pulsing "Book a demo ->" in hero ([EventsLedger.jsx:369](components/EventsLedger.jsx#L369)), mobile sticky, and a tailored FinalCTA labeled "See a live demo" ([product.jsx:42](app/product.jsx#L42)). Clear and well-placed. Same gated-form caveat applies.

### Pricing - `/pricing.html`
**M 4 / A 3 / P 4 - Limiting factor: ABILITY (price uncertainty)**

- **Motivation (4):** *"You carry nothing until you see it run"* ([pricing.jsx:67](app/pricing.jsx#L67)). The comparison table is sharp where it counts: change-order fees *"None. Ever."* vs SAP *"$8K-$20K each"*; up-front cost *"$0"* vs *"$150K-$500K+"* ([pricing.jsx:41-42](app/pricing.jsx#L41)). FAQ answers the real objection: *"What does 'you walk if it doesn't work' actually mean?"*
- **Ability (3):** Two clean tiers, low jargon - good. But the price the owner actually wants is *"Custom-quoted"* with *"We agree on a number together"* and *"We are not free and we are not cheap"* ([pricing.jsx:23](app/pricing.jsx#L23)). No range, no anchor, no example. A skeptic reads "we won't tell you the price" as a risk. Uncertainty is friction.
- **Prompt (4):** Each tier card has a "Book a demo" cal.com link, plus FinalCTA and a mobile sticky. Clear.

### About - `/about.html`
**M 4 / A 2 / P 3 - Limiting factor: ABILITY (Architecture block written for engineers)**

- **Motivation (4):** The opener is excellent peer credibility: *"Built by operators who've been on your floor... designed on a shop floor that was already running on Excel and group chats - and not working"* and the honest stat *"75% of mid-market ERP projects fail or get abandoned. We lived two of them ourselves"* ([about.jsx:53](app/about.jsx#L53)).
- **Ability (2):** Then it pivots straight into *"UNDER THE HOOD: SG Schema x SG Engine x Event Sourcing"*, *"invariants"*, *"The log is the database. The state is a projection."* This is the most engineer-facing copy on the site, sitting on a page a buyer visits to decide *can I trust these people*. The answer it gives a non-technical owner is "these people talk over my head."
- **Prompt (3):** "Book a demo" present, plus a competing "See how the system actually works ->" to product. Two exits dilute the one action.

### Case studies hub + two cases - `/case-studies.html`, `/case-furniture-manufacturer.html`, `/case-apex.html`
**M 5 / A 3 / P 4 - Limiting factor: ABILITY (domain/dev jargon) - but these are the best pages on the site**

- **Motivation (5):** Peer proof with numbers a factory owner respects. Furniture: *"How a furniture exporter stopped losing $200,000 a year to gaps nobody could see"*, *"Planning time: 20 hrs to 2 hrs"*, *"Material wastage: 1.5% to <0.1%"*, *"30 of 30 staff onboarded"*, *"Deployed in 21 days"*. Apex: *"Two years. Two failed ERPs. Over $100,000 spent with nothing to show for it"*, *"live in 12 days"*. Named founder quote: *"SimpleGrid feels like our system. My stores manager was comfortable on day one."* This is exactly the social proof the skeptic needs.
- **Ability (3):** Mostly plain, but the Apex outcome strip brags in dev-speak: *"34 - Domain entities tracked"* and *"44 - Automatic triggers wired"*. A factory owner does not count success in "domain entities." Also heavy use of `SKU`, `reconciliation`, `CMT`, `QC`, `GRN'd` without a plain gloss.
- **Prompt (4):** *"Book a demo - See how we'd model your operations"* (cal.com) plus a cross-link to the other case. Good, specific CTA.
- **Placement problem (cross-page):** these pages are buried under the "Resources" dropdown ([Nav.jsx:44](components/Nav.jsx#L44)). Best proof, worst shelf.

### Competitors hub + 8 pages - `/competitors.html`, `/competitors/*/`
**M 3 / A 3 / P 4 - Limiting factor: MOTIVATION (abstract hub headline wastes the hook)**

- **Motivation (3):** The hub captures intent well in the sub-copy: *"Hate your ERP? Looking for an alternative?"* and *"We're the only vendor in the category that lets you see it work before you pay"* - but the H1 is abstract filler: *"Complexity demands adaptability. Enter SimpleGrid."* A time-poor owner skims the big text first; the big text says nothing about their pain. Individual pages are stronger (NetSuite: *"Live in 7-14 days"* vs *"12-20 weeks"*, *"Built at our cost"* vs *"$75K-$200K up front"*).
- **Ability (3):** Comparison tables are clear, but quadrant maps plus terms like *"SuiteScript engagement"* and *"multi-entity consolidation"* add load.
- **Prompt (4):** "Book a demo" in hero and final band on every page.

### Tools hub + 35 tools - `/tools/`, `/tools/*/`
**M 3 / A 4 / P 3 - Limiting factor: PROMPT/MOTIVATION for the *demo* (correct funnel behavior)**

- **Motivation (3 for demo, high for tool use):** The tools deliver instant value and the bridge copy is smart: *"If you're using more than two of these you're already running an ERP - just one stitched together from PDFs and spreadsheets."* For *booking a demo*, motivation is naturally lower - the visitor came for a calculator.
- **Ability (4):** Genuinely low friction - *"no signup, and no email wall"*, runs in the browser, PDF export. This is the most frictionless corner of the site. One blemish: the OEE page over-explains - *"OEE was developed by Seiichi Nakajima as part of Total Productive Maintenance (TPM) at Nippondenso in the 1960s."* A plant owner does not need a history lecture.
- **Prompt (3):** "Book a demo" is present but secondary to the tool. Correct as a *spark* for low-motivation visitors, though the bridge from a tool's *result* to the demo could be tighter (e.g., "Your OEE is 52%. See your real number update live - book a demo").

### Blog index + 18 posts - `/blog.html`, `/blog/*/`
**M 3 / A 3 / P 4 - Limiting factor: MOTIVATION (audience mismatch; promise broken)**

- **Motivation (3):** Operator posts are strong and on-voice: *"Nobody plans to run a $10M manufacturing operation on spreadsheets. It just happens"* and end with *"Find the $200K nobody caught."* But the index promises *"No jargon. No 'digital transformation.'"* then lists *"Event Sourcing,"* *"Multi-Tenant Architecture,"* *"Entity Roots,"* *"Building an ERP Chatbot With Claude, No RAG."* Those 7 posts pull engineers, not buyers, and break the page's own promise in the headline.
- **Ability (3):** Technical posts are high-load; operator posts are clean.
- **Prompt (4):** Mid-post "Book a demo" block (*"See how this works for your operation"*) and an end-of-post band. Good conversion path.

### Hiring - `/hiring.html`
**M n/a / A n/a / P n/a - OFF-AUDIENCE for the manufacturer**

Recruiting page (*"Build a custom ERP at our risk. Get paid only when it works"*, roles, `mailto` apply). Not a buyer page. The only finding through the manufacturer's eyes: it is linked in the footer as "Careers" ([Footer.jsx:40](components/Footer.jsx#L40)) - harmless, low attention cost. Leave it.

### Utility pages - security / accessibility / privacy / terms / 404 / sg-schema / post.html
**Not conversion pages.** `security.html` ("Security & Responsible Disclosure") is a mild trust asset and could be surfaced from the buyer path as reassurance. `sg-schema.html` is technical and off-audience. The rest are housekeeping; no behavioral action expected. The InviteModal footer correctly links Privacy ([InviteModal.jsx:133](components/InviteModal.jsx#L133)).

---

## 4. Cognitive-load inventory

Every item below is a place a non-technical factory owner's brain stalls. Each gets a plain, operator-direct rewrite (short sentences, numbers first, no jargon, no em dashes).

| # | Where | Current copy (verbatim) | Why it loses the owner | Operator-direct rewrite |
|---|-------|-------------------------|------------------------|-------------------------|
| 1 | About + product, "Under the hood" | "SG Schema x SG Engine x Event Sourcing." | Three invented/technical terms in one line. Means nothing to a plant owner. | "Built to match how your factory runs, not how software wants it to." |
| 2 | Product Events Ledger footer | "append-only, cryptographically ordered, replayable to any point in time, regulator-ready" | Database jargon. No floor meaning. | "Nothing can be deleted or changed. You can pull up any day and see exactly what happened, with names and times." |
| 3 | Product Events Ledger H2 | "Your enterprise, alive - every action recorded, every decision traceable, every state replayable." | "Enterprise," "state replayable" is abstract. | "Every receipt, approval, and shipment is logged with a name and a time. Replay any day to settle any argument." |
| 4 | About / EventsLedger | "The log is the database. The state is a projection." | Pure engineering. A buyer reads this as showing off. | Cut it. If kept: "We never overwrite your records. We add to them, so the history is always there." |
| 5 | About / EventsLedger | "your entities, your states, your transitions, your invariants, your chain reactions" | Four CS terms in a row. | "Your stages, your approvals, your rules, your exceptions - the way your floor actually works." |
| 6 | Home Architecture block | "Configuration, not code. AI writes a configuration. Platform reads it and generates forms, workflows, rules, dashboards." | "Configuration" vs "code" is an IT distinction the buyer does not have. | "Need a new rule or a new step? We change a setting, not the software. It is live the same day. No bill." |
| 7 | Home Architecture block | "Every rule is a row." | Means nothing without the data model in your head. | "A new approval rule takes us minutes, not a six-week project." |
| 8 | Home DataSecurity | "Multi-tenant isolation" | Cloud-infra term. | "Your data sits in its own locked database. No other company can ever see it." (the apartment-building line that follows is good - lead with plain language) |
| 9 | Apex case outcome strip | "34 - Domain entities tracked" / "44 - Automatic triggers wired" | Owners do not measure success in "entities" or "triggers." | "34 parts of your operation tracked in one place. 44 steps the system does for you automatically." |
| 10 | Case studies, throughout | "ERP" (used 30+ times, never expanded), "SKU," "reconciliation," "QC," "GRN'd," "CMT" | Assumes B2B-software literacy. The owner knows their *product*, not the acronyms. | Spell out on first use: "your operating system (ERP)," "each product (SKU)," "matching what arrived to what you ordered," "quality check (QC)." |
| 10 (note) | n/a | "ERP" itself | This buyer does broadly know "ERP" = the big system they were burned by. Keep ERP, but never stack it with other acronyms in the same sentence. | Keep "ERP." Drop the supporting acronyms. |
| 11 | Blog index promise vs titles | "No jargon." then "Event Sourcing," "Multi-Tenant Architecture," "No RAG" | The page breaks its own promise in the post list. | Re-title for buyers: "Why nothing in your system can be quietly deleted," "How we run 100 factories without sharing a single record," "How our floor chatbot actually knows your numbers." |
| 12 | OEE tool | "OEE was developed by Seiichi Nakajima as part of Total Productive Maintenance (TPM) at Nippondenso in the 1960s." | History lesson. Time-poor owner bounces. | "Most plants score 40-60%. The best hit 85%. This shows your number and where you are losing it." |
| 13 | NetSuite competitor page | "No SuiteScript engagement," "multi-entity consolidation" | Vendor-specific dev jargon. | "Change a workflow without hiring a developer," "We handle multiple sites and books in one view." |
| 14 | Product hero | "We don't sell software." | Clever, but the buyer's first question is "then what do I get?" The denial spends a line saying what you are *not*. | "We build the ERP for your factory. You run it free for 30 days. Pay only if it works." |
| 15 | Competitors hub H1 | "Complexity demands adaptability. Enter SimpleGrid." | Abstract slogan. Zero pain, zero number. | "Hate your ERP? See a new one run on your floor for 30 days before you pay a cent." |
| 16 | Home, integrations note | "On request means we have the spec and will build it as part of your custom ERP" | "Spec" is jargon. | "Don't see your tool? We build the connection as part of your system, no extra charge." |
| 17 | Product hero subtext | "One system that replaces the fourteen Slack channels, six spreadsheets, and the approval lost in DMs." | Actually good and concrete - keep it. Flagged only to contrast: this is the voice the jargon items should match. | (Keep as-is. Use this register everywhere.) |

**Pattern:** the site already owns the operator-direct voice (problem cards, Hank questions, case headlines, FAQ). The cognitive-load failures cluster in the "architecture / under the hood / why we're clever" sections. Those sections were written to impress a technical reader. For this buyer they should be cut to a single plain-language benefit or moved off the buyer path entirely.

---

## 5. Prompt audit - every CTA, type, placement, verdict

Fogg prompt types: **Facilitator** (high motivation, low ability - make it easier), **Spark** (low motivation, high ability - add motivation), **Signal** (high motivation, high ability - just a reminder).

| CTA (label) | Where | Resolves to | Type it should be | Verdict |
|-------------|-------|-------------|-------------------|---------|
| "Book a demo" (pulsing) | Home hero | Opens InviteModal (gated form, 48-hr review) | Signal/Facilitator | **Mismatch.** Motivation is at its peak here; the form adds friction and a wait. Should be the easiest yes on the page, instead it is an application. |
| "Book a demo" | Nav (all pages) | InviteModal | Signal | OK position, same gated-form problem. |
| "Book a demo" | Mobile sticky bar | cal.com (home) / InviteModal (product, pricing) | Signal | **Inconsistent.** Same label, two different behaviors depending on page. |
| "Book a demo" | FinalCTA band (every page) | cal.com link (intercepted to open form) | Signal | Good placement; clarity undercut by the demo-vs-application gap. |
| "Book a demo ->" (pulsing) | Product hero, Selective Onboarding, TriggerCTA | InviteModal | Signal | Strong visual prompt. Gated-form caveat. |
| "See a live demo" | Product FinalCTA | cal.com | Signal | Best-worded CTA on the site - promises seeing the product. Make this the site-wide standard. |
| "Skip the wait - book a call now" | InviteModal success screen | cal.com | Facilitator | The *fast* path is hidden *after* you fill the slow form. Backwards. Surface this first. |
| "Book a demo - See how we'd model your operations" | Case pages | cal.com | Signal | Specific and good. Keep. |
| "Log in" | Nav, mobile | LoginModal | n/a | Fine, low prominence. Not a competing buyer action. |
| Color picker (Ocean/Sky/Night...) | Home BurstBand | Changes splatter color | (none) | **Anti-prompt.** A toy that invites the visitor to do something with zero conversion value at the center of the homepage. |
| "See all 17 field notes ->" | Home FromTheField | blog.html | Spark | Fine; note the count says 17 while the site has 18 posts (small inconsistency). |
| "See live customer deployments ->" | Product MotivationSection | case-studies.html | Spark | Good - routes to the best proof. |
| "Read ->" (3 blog cards) | Home | blog posts | Spark | Fine. |
| Tool "Book a demo" + bottom bridge | Tools hub + each tool | cal.com | Spark | Correct type for low-intent tool visitors. Could tie to the tool's *result*. |
| "Apply" | Hiring | mailto | n/a | Off-audience; ignore for the manufacturer. |
| Mid-post + end "Book a demo" | Blog posts | cal.com | Spark/Signal | Good two-stage path. |

**Prompt-overload spots:** Home (hero modal CTA, nav CTA, mobile sticky, color picker, Log in, 3 blog cards, FAQ, FinalCTA all on one page) and Competitors hub (8 comparison links compete with the demo CTA).

**Missing/weak prompts:** No prompt anywhere lets the buyer *see the product without talking to sales first*. For a "try before you buy" company, the absence of any self-serve "watch a 60-second run" or "click through a sample" prompt is the biggest prompt gap. (Note: the home `DemoVideo` component renders a play button over an empty `video-wrap` with no actual video - a dead prompt. [HomeBottom.jsx:64-78](components/HomeBottom.jsx#L64).)

---

## 6. Prioritized fix list

Sorted high-impact / low-effort first. Tag = which factor it raises.

| # | Fix | Factor | Impact | Effort |
|---|-----|--------|--------|--------|
| 1 | **Make "Book a demo" deliver a demo.** Default the primary CTA to the instant cal.com booking (or a self-serve product walkthrough). Move "Skip the wait - book a call now" to be the *first* option, not the post-form consolation. | **P** | High | Low |
| 2 | **De-gate the modal language.** Drop "We onboard selectively each quarter" and "if we can win for you" from the *click* moment. Keep selectivity for later in the conversation. Change success copy from "We'll review within 48 hours" to "We'll send your live demo link within 24 hours." | **P/A** | High | Low |
| 3 | **Unify CTA behavior.** One label, one action everywhere. Pick "See a live demo" (the strongest existing wording) and make every instance do the same thing. | **P** | High | Low |
| 4 | **Kill the homepage color picker and freeze the hero headline.** Replace `CycleHeadline` with the single strongest line (see Section 7). Remove `BurstBand`'s picker or make it a static graphic. | **M/A** | High | Low |
| 5 | **Lead with the offer on every page, in nine words.** "We build your ERP. Run it 30 days free. Pay only if it works." as a persistent sub-headline. | **M** | High | Low |
| 6 | **Promote Case Studies out of "Resources."** Put a top-level "Customers" or "Proof" nav item, or a "See it running" link in the hero. | **P/M** | High | Low |
| 7 | **Rewrite the 17 cognitive-load items in Section 4.** Strip architecture jargon from the buyer path; keep the operator voice the site already uses elsewhere. | **A** | High | Med |
| 8 | **Add a real "watch it run" asset.** A 60-second screen recording of one transaction (the `DemoVideo` placeholder already reserves the spot). This is the literal "see it work before you pay" the whole site promises. | **M/A/P** | High | Med |
| 9 | **Shorten the Hank chat** from 12 exchanges to 3-4 of the most owner-relevant ("What's slowing the plant this week?", "Where are we bleeding margin?", "What's at risk of running out?"). | **A** | Med | Low |
| 10 | **Give pricing an anchor.** Replace bare "Custom-quoted" with a plain range or a worked example ("Most $10M-$50M plants land between $X and $Y a month, one bill, everything included"). Reduces the "they won't tell me the price" risk. | **A/M** | Med | Med |
| 11 | **Re-title the 7 technical blog posts** for buyers (Section 4, item 11), or move them to a separate "Engineering" sub-section so the blog keeps its "no jargon" promise to owners. | **M** | Med | Low |
| 12 | **Move/trim the "Under the hood" architecture sections** on home, product, and about to a single plain-language benefit line, with a "for the technically curious" expand. | **A** | Med | Med |
| 13 | **Tie each tool's result to the demo.** After a calculation, show a one-line bridge using the visitor's own number ("Your OEE is 52%. See this number update live from your floor - book a demo"). | **M/P** | Med | Med |
| 14 | **Rewrite the Competitors hub H1** from "Complexity demands adaptability. Enter SimpleGrid." to a pain-and-offer line (Section 4, item 15). | **M** | Med | Low |
| 15 | **Fix small trust dents:** "See all 17 field notes" (should be 18); ensure the homepage `DemoVideo` play button is not a dead prompt. | **A** | Low | Low |

---

## 7. Worked example - homepage hero, before to after

### Before (current, [HomeTop.jsx:270-376](components/HomeTop.jsx#L270))

**Headline** (rotates on a timer through three versions):
> "Custom ERP. Built at our risk. Paid for after it works."
> ...then "The only ERP you try on before you buy"
> ...then "We build it. You run it 30 days on your real floor. If it doesn't move the business, you walk."

**Sub-headline:**
> "We don't sell software. We build a custom ERP that fits how your factory actually runs - your stages, your contractors, your approvals, your costing logic. We carry the cost and the risk of the build. You run it for 30 days on your real floor. If it doesn't move the business, you walk. We earn nothing."

**Primary CTA:** "Book a demo" (pulsing) -> opens a 3-field form -> "We onboard selectively each quarter... We'll review within 48 hours."

**Behavioral read:** Motivation is high (the offer is genuinely strong). But the headline is a moving target, the sub-headline opens by saying what you are *not* ("We don't sell software"), and the prompt converts a ready buyer into an applicant who waits two days. The rotating text means a 5-second skimmer might catch the weakest of the three lines. Ability is taxed and the prompt fights the motivation.

### After (operator-direct, single fixed message)

**Headline (fixed):**
> We build your factory's ERP. You run it free for 30 days. Pay only if it works.

**Sub-headline (numbers first, floor-grounded):**
> Live in 7 to 21 days, modeled on how your floor actually runs - your stages, your contractors, your approvals. We carry every dollar of the build cost and all the risk. Run it on real orders with your real team. If it doesn't move the business by day 30, you walk and owe nothing.

**Primary CTA:**
> **[ See it run on your floor ]**  -> instant calendar booking, no application, no wait
> small print under it: "30-minute call. We show you a working version of your operation within 24 hours."

**Secondary, for the skimmer who isn't ready to talk:**
> **[ Watch a 60-second demo ]**  -> the screen recording of one full transaction

**Why this moves more manufacturer behavior:**
- **Motivation:** the offer (free build, 30 days, pay only if it works) is the first thing read, in plain numbers, not buried under "we don't sell software." It hits pain (you've paid first and been burned) and hope (see it before you spend) in one breath.
- **Ability:** one fixed sentence, no jargon, no rotating target. The brain spends zero cycles decoding "schema" or chasing a moving headline. The "Watch a 60-second demo" path lets a skeptic verify with no human contact - the lowest-friction possible yes.
- **Prompt:** the CTA finally matches the promise. "See it run" plus instant booking is a *signal* for the high-motivation buyer; "Watch a 60-second demo" is a *facilitator* for the not-ready-to-talk skimmer. Neither makes the buyer apply and wait. M, A, and P now converge at the same moment - which is the only moment the behavior can happen.

---

*Audit complete. Every score and finding above is grounded in copy actually shipping in the repo, judged solely through the eyes of a non-technical, time-poor, previously-burned US factory owner. The site's motivation engine is strong and largely built; the behavioral leaks are in ability (cognitive load from architecture jargon) and prompt (a "demo" button that gates instead of delivers). Fix the prompt first - it is low effort and sits exactly where motivation is already highest.*
