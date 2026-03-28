SimpleGrid.AI
Founding Engineer
For recent graduates who want to architect systems, not maintain them.
Bangalore  |  In-Office  |  ₹10–12 LPA + Founding ESOP
We are looking for someone who hears “12-month ERP implementation” and physically cringes. Someone who wants to compress that into 7 days using AI that actually thinks, not just autocompletes.
SIMPLEGRID.AI
We are building the schema-native operating system for physical-world businesses.
Factories. Export houses. D2C brands. Contractors. Co-working spaces. Warehouses. C&F agents. Any organization where real things move, people do work, and money changes hands based on operations.
The places where SAP takes 12 months and still fails. Where Tally only understands accounting, not operations. Where Zoho gives you forms and dashboards but no understanding of how your business actually runs.
If you want to design the ledger that replaces ERP itself, keep reading.
THE FOUNDER
The founder built a manufacturing enterprise and scaled it to 200 employees and $30Mn+ in revenue. Managed. Crashed it. Rebuilding SimpleGrid now. Did an MBA from MDI Gurgaon. Worked in audit and investment banking. Understands both the spreadsheet and the factory floor.
You will work directly with the founder. No layers. No middle management.
THE PROBLEM
Every physical business with operations runs into the same wall.
They start with Excel. Then WhatsApp groups for coordination. Then a custom-built tool. Then Tally for accounting. Then someone suggests “let’s implement an ERP.” Eighteen months and fifty lakhs later, they have a system that forces them to work the way the software was designed, not the way their business actually operates.
The fundamental problem is architectural. Every ERP ever built follows the same pattern: predefined modules (Sales, Inventory, Accounting, HR) integrated through brittle APIs. This creates:
•	Rigid workflows that don’t match how the business actually runs
•	12–18 month implementation cycles because every business is forced into the same module structure
•	Low-literacy workers who can’t use the system, so they revert to paper and WhatsApp
•	Zero adaptability — adding a new approval step or quality check requires a development cycle
This is not a manufacturing problem. This is every physical business with operations, from a 50-person D2C brand to a 1000-person export house. The dead zone between “too complex for spreadsheets” and “too expensive for SAP” is massive and completely underserved.
WHAT WE ARE BUILDING
SimpleGrid.AI is not an ERP. It is a schema-driven AI event engine built on Domain-Driven Design principles.
We don’t give you predefined modules. We map how your business actually runs and configure the system around it. Approvals, handoffs, dependencies, conditions — all built around your real workflow, not around software someone designed for a different company.
You can modify it anytime using natural language (not shipping the conversational modifications in v1 or v2):

“Add Viktor’s approval for payments above ₹1 lakh without a PO.”

“We’ve hired Jay for quality checks — add a quality check step after production and before dispatch.”

“Route all material inwards above 500 units to the warehouse manager for verification.”

If a new user needs to be created, the system prompts you. If manager approval is required, it routes automatically. The structure updates instantly. No redevelopment. No reimplementation cycles.
This is possible because we are not building on tables and modules. We are building on schemas, events, and DDD principles.
Three architectural layers: “In v1, this is implemented as a structured event log with projection tables — not a full distributed event-sourcing framework.”
Layer 1: Schema Engine (Domain-Driven Design, Made Configurable)(Read about DDD princples)
Every business process is a Schema — a typed configuration that defines entities (what exists), states (where it is in its lifecycle), transitions (what can happen next), permissions (who can do it), and event emissions (what the rest of the system should know). A Sales Order schema. A Production Job schema. A Procurement schema. Each is a Bounded Context: it owns its model, its language, its invariants. Adding a QC stage or a new approval step is a configuration change, not a deployment.

Layer 2: Immutable Event Ledger (Single Source of Truth)
Every action creates an append-only, immutable event. No direct database adjustments. Material received? Event. Stage transfer? Event. Approval granted? Event. Entity state is derived by replaying events. This means: complete audit trail by default, accounting entries derived from operations automatically, schema rollback by replaying events through a previous version. The event ledger is what makes “accounting as a consequence” possible.

Layer 3: AI Understanding Layer (Intelligence, Not Decoration)
AI is the interaction paradigm. Document parsing: OCR + LLM turns messy PDFs and photos into structured events. Conversational interface: supervisors say “Received 500 mango planks from Shree Timber” and the system handles the rest. Planning suggestions based on historical patterns. Natural language schema modification. The AI follows a strict protocol: AI interprets → System validates → Human confirms → Event commits. AI never writes directly to the ledger.

The result: We deploy a new client in under 7 days. Not because we cut corners, but because the architecture makes it possible. Clone template schemas, configure to the client’s workflows, and go live. That is the power of schema-driven design.
OUR FIRST BATTLEFIELD
Our paid pilot is with a 500 employee furniture exporter with two factories spread across almost 1Million sqft - a business drowning in 550 Excel files for SKU data, manually re-typing purchase orders from PDFs, coordinating production on WhatsApp & Excel, and reconciling contractor payments from paper notebooks at month-end. SAP quoted them 18 months. We are deploying in under 7 days.
This is not a free trial. They are paying because the pain is real and urgent. Two more manufacturers in the pipeline have shown strong interest — the moment the product is live, they onboard.
Furniture is the first deployment. It is not the product. The product is the schema engine underneath. The same engine that models a furniture exporter's multi-stage production line will model a D2C brand's warehouse operations, a co-working space's billing workflows, or an export house's shipment tracking. Different schemas, same platform
THE KIND OF ENGINEER THIS REQUIRES
You are graduating in 2025 or 2026. Or you graduated recently and haven’t yet settled into a role where your biggest challenge is navigating Confluence.

Non-negotiables:
•	You’ve shipped something real. A hackathon win, an open-source project with users, a side project that people depend on. Something where you made design decisions and lived with the consequences.
•	You are fluent in TypeScript or Python
•	You thrive in ambiguity. We have a clear architectural vision but implementation details are being figured out live.



Strong signals:
•	You’ve read Evans’ DDD or worked on an event sourcing architecture (If you don’t know all of this; No Problem. But you must want to learn it).
YOUR TWO TIMELINES
You are standing at a fork. This is what each path looks like:

THE “SAFE” PATH	THE SIMPLEGRID PATH
SDE-1 badge. 1 of 3,000 engineers.	Founding Engineer. Employee #1.
Maintain a legacy codebase nobody loves.	Architect a schema-driven AI system from scratch.
Wait 2 years for a "meaningful" project.	Ship production code to paying clients in Week 1.
Learn corporate politics.	Learn how to build a company.
₹25L package, 60% of it is imaginary.	Below-market cash + founding-level ESOPs (0.5%-1.5%) that could be worth multiples.
Your GitHub stays empty.	Your GitHub becomes your portfolio.
THE DEAL (NO FINE PRINT)
Component	Details
Salary	₹10–12 LPA. Range reflects demonstrated capability, not negotiation skill.
Equity	Founding-level ESOPs. 4-year vest, 1-year cliff. Allocation based on work delivered in first 3 months. We allocate equity to people who prove they’re building the company, not just working at it.
Growth	In 12 months you won’t just be a better engineer. You’ll understand unit economics, client management, and how businesses actually work.


STILL READING? THAT’S A FILTER.HOW TO APPLY
Don’t send a resume. Send:

•	A link to something you’ve built. GitHub repo, deployed app. Show us the code, not the certificate. Email Id: hello@simplegrid.ai
•	Complete the assessment on https://bit.ly/3Ncb7HJ	

If your work is interesting, you’ll hear from the founder directly within 48 hours. No ATS. No HR screen. No ghosting.
SimpleGrid.AI
Build the operating system for businesses that actually make things.
