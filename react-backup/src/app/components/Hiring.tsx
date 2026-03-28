import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, MapPin, Building2, IndianRupee, ChevronDown, ChevronUp, ExternalLink, Mail } from "lucide-react";

interface JobPosting {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  workMode: string;
  compensation: string;
  sections: { heading: string; content: React.ReactNode }[];
}

const jobPostings: JobPosting[] = [
  {
    id: "founding-engineer-jr",
    title: "Founding Engineer (Jr)",
    subtitle: "For recent graduates who want to architect systems, not maintain them.",
    location: "Bangalore",
    workMode: "In-Office",
    compensation: "₹10–12 LPA + Founding ESOP",
    sections: [
      {
        heading: "About SimpleGrid.AI",
        content: (
          <div className="space-y-4">
            <p>
              We are building the schema-native operating system for physical-world businesses.
            </p>
            <p>
              Factories. Export houses. D2C brands. Contractors. Co-working spaces. Warehouses. C&F agents. Any organization where real things move, people do work, and money changes hands based on operations.
            </p>
            <p>
              The places where SAP takes 12 months and still fails. Where Tally only understands accounting, not operations. Where Zoho gives you forms and dashboards but no understanding of how your business actually runs.
            </p>
            <p className="text-foreground">
              If you want to design the ledger that replaces ERP itself, keep reading.
            </p>
          </div>
        ),
      },
      {
        heading: "The Founder",
        content: (
          <div className="space-y-4">
            <p>
              The founder built a manufacturing enterprise and scaled it to 200 employees and $30Mn+ in revenue. Managed. Crashed it. Rebuilding SimpleGrid now. Did an MBA from MDI Gurgaon. Worked in audit and investment banking. Understands both the spreadsheet and the factory floor.
            </p>
            <p className="text-foreground">
              You will work directly with the founder. No layers. No middle management.
            </p>
          </div>
        ),
      },
      {
        heading: "The Problem",
        content: (
          <div className="space-y-4">
            <p>
              Every physical business with operations runs into the same wall.
            </p>
            <p>
              They start with Excel. Then WhatsApp groups for coordination. Then a custom-built tool. Then Tally for accounting. Then someone suggests "let's implement an ERP." Eighteen months and fifty lakhs later, they have a system that forces them to work the way the software was designed, not the way their business actually operates.
            </p>
            <p>The fundamental problem is architectural. Every ERP ever built follows the same pattern: predefined modules (Sales, Inventory, Accounting, HR) integrated through brittle APIs. This creates:</p>
            <ul className="space-y-2 pl-5">
              <li className="relative before:content-[''] before:absolute before:left-[-16px] before:top-[10px] before:w-1.5 before:h-1.5 before:bg-muted-foreground/50 before:rounded-full">
                Rigid workflows that don't match how the business actually runs
              </li>
              <li className="relative before:content-[''] before:absolute before:left-[-16px] before:top-[10px] before:w-1.5 before:h-1.5 before:bg-muted-foreground/50 before:rounded-full">
                12–18 month implementation cycles because every business is forced into the same module structure
              </li>
              <li className="relative before:content-[''] before:absolute before:left-[-16px] before:top-[10px] before:w-1.5 before:h-1.5 before:bg-muted-foreground/50 before:rounded-full">
                Low-literacy workers who can't use the system, so they revert to paper and WhatsApp
              </li>
              <li className="relative before:content-[''] before:absolute before:left-[-16px] before:top-[10px] before:w-1.5 before:h-1.5 before:bg-muted-foreground/50 before:rounded-full">
                Zero adaptability — adding a new approval step or quality check requires a development cycle
              </li>
            </ul>
            <p>
              This is not a manufacturing problem. This is every physical business with operations, from a 50-person D2C brand to a 1000-person export house. The dead zone between "too complex for spreadsheets" and "too expensive for SAP" is massive and completely underserved.
            </p>
          </div>
        ),
      },
      {
        heading: "What We Are Building",
        content: (
          <div className="space-y-4">
            <p>
              SimpleGrid.AI is not an ERP. It is a schema-driven AI event engine built on Domain-Driven Design principles.
            </p>
            <p>
              We don't give you predefined modules. We map how your business actually runs and configure the system around it. Approvals, handoffs, dependencies, conditions — all built around your real workflow, not around software someone designed for a different company.
            </p>
            <p>You can modify it anytime using natural language:</p>
            <div className="space-y-3 my-4">
              <div className="bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm italic">
                "Add Viktor's approval for payments above ₹1 lakh without a PO."
              </div>
              <div className="bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm italic">
                "We've hired Jay for quality checks — add a quality check step after production and before dispatch."
              </div>
              <div className="bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm italic">
                "Route all material inwards above 500 units to the warehouse manager for verification."
              </div>
            </div>
            <p>
              If a new user needs to be created, the system prompts you. If manager approval is required, it routes automatically. The structure updates instantly. No redevelopment. No reimplementation cycles.
            </p>

            <h4 className="text-foreground mt-6 mb-2">Three Architectural Layers</h4>

            <div className="space-y-4">
              <div className="border-l-2 border-border pl-4">
                <p className="text-foreground mb-1">Layer 1: Schema Engine (Domain-Driven Design, Made Configurable)</p>
                <p className="text-sm">
                  Every business process is a Schema — a typed configuration that defines entities, states, transitions, permissions, and event emissions. Each is a Bounded Context. Adding a QC stage or a new approval step is a configuration change, not a deployment.
                </p>
              </div>
              <div className="border-l-2 border-border pl-4">
                <p className="text-foreground mb-1">Layer 2: Immutable Event Ledger (Single Source of Truth)</p>
                <p className="text-sm">
                  Every action creates an append-only, immutable event. Entity state is derived by replaying events. Complete audit trail by default, accounting entries derived from operations automatically.
                </p>
              </div>
              <div className="border-l-2 border-border pl-4">
                <p className="text-foreground mb-1">Layer 3: AI Understanding Layer (Intelligence, Not Decoration)</p>
                <p className="text-sm">
                  AI is the interaction paradigm. Document parsing, conversational interface, planning suggestions. The AI follows a strict protocol: AI interprets → System validates → Human confirms → Event commits.
                </p>
              </div>
            </div>

            <p className="text-foreground mt-4">
              We deploy a new client in under 7 days. Not because we cut corners, but because the architecture makes it possible.
            </p>
          </div>
        ),
      },
      {
        heading: "Our First Battlefield",
        content: (
          <div className="space-y-4">
            <p>
              Our paid pilot is with a 500 employee furniture exporter with two factories spread across almost 1 Million sqft — a business drowning in 550 Excel files for SKU data, manually re-typing purchase orders from PDFs, coordinating production on WhatsApp & Excel, and reconciling contractor payments from paper notebooks at month-end. SAP quoted them 18 months. We are deploying in under 7 days.
            </p>
            <p>
              This is not a free trial. They are paying because the pain is real and urgent. Two more manufacturers in the pipeline have shown strong interest.
            </p>
            <p>
              Furniture is the first deployment. It is not the product. The product is the schema engine underneath. The same engine that models a furniture exporter's multi-stage production line will model a D2C brand's warehouse operations, a co-working space's billing workflows, or an export house's shipment tracking. Different schemas, same platform.
            </p>
          </div>
        ),
      },
      {
        heading: "The Kind of Engineer This Requires",
        content: (
          <div className="space-y-4">
            <p>
              You are graduating in 2025 or 2026. Or you graduated recently and haven't yet settled into a role where your biggest challenge is navigating Confluence.
            </p>
            <h4 className="text-foreground mt-4 mb-2">Non-negotiables</h4>
            <ul className="space-y-2 pl-5">
              <li className="relative before:content-[''] before:absolute before:left-[-16px] before:top-[10px] before:w-1.5 before:h-1.5 before:bg-foreground/40 before:rounded-full">
                You've shipped something real. A hackathon win, an open-source project with users, a side project that people depend on. Something where you made design decisions and lived with the consequences.
              </li>
              <li className="relative before:content-[''] before:absolute before:left-[-16px] before:top-[10px] before:w-1.5 before:h-1.5 before:bg-foreground/40 before:rounded-full">
                You are fluent in TypeScript or Python
              </li>
              <li className="relative before:content-[''] before:absolute before:left-[-16px] before:top-[10px] before:w-1.5 before:h-1.5 before:bg-foreground/40 before:rounded-full">
                You thrive in ambiguity. We have a clear architectural vision but implementation details are being figured out live.
              </li>
            </ul>
            <h4 className="text-foreground mt-4 mb-2">Strong signals</h4>
            <ul className="space-y-2 pl-5">
              <li className="relative before:content-[''] before:absolute before:left-[-16px] before:top-[10px] before:w-1.5 before:h-1.5 before:bg-foreground/40 before:rounded-full">
                You've read Evans' DDD or worked on an event sourcing architecture (If you don't know all of this — no problem. But you must want to learn it).
              </li>
            </ul>
          </div>
        ),
      },
      {
        heading: "Your Two Timelines",
        content: (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-4 py-3 border-b border-border">The "Safe" Path</th>
                  <th className="text-left px-4 py-3 border-b border-border">The SimpleGrid Path</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr><td className="px-4 py-3 text-muted-foreground">SDE-1 badge. 1 of 3,000 engineers.</td><td className="px-4 py-3">Founding Engineer. Employee #1.</td></tr>
                <tr><td className="px-4 py-3 text-muted-foreground">Maintain a legacy codebase nobody loves.</td><td className="px-4 py-3">Architect a schema-driven AI system from scratch.</td></tr>
                <tr><td className="px-4 py-3 text-muted-foreground">Wait 2 years for a "meaningful" project.</td><td className="px-4 py-3">Ship production code to paying clients in Week 1.</td></tr>
                <tr><td className="px-4 py-3 text-muted-foreground">Learn corporate politics.</td><td className="px-4 py-3">Learn how to build a company.</td></tr>
                <tr><td className="px-4 py-3 text-muted-foreground">₹25L package, 60% of it is imaginary.</td><td className="px-4 py-3">Below-market cash + founding-level ESOPs (0.5%-1.5%).</td></tr>
                <tr><td className="px-4 py-3 text-muted-foreground">Your GitHub stays empty.</td><td className="px-4 py-3">Your GitHub becomes your portfolio.</td></tr>
              </tbody>
            </table>
          </div>
        ),
      },
      {
        heading: "The Deal (No Fine Print)",
        content: (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-4 py-3 border-b border-border w-1/4">Component</th>
                  <th className="text-left px-4 py-3 border-b border-border">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-3 text-foreground">Salary</td>
                  <td className="px-4 py-3">₹10–12 LPA. Range reflects demonstrated capability, not negotiation skill.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-foreground">Equity</td>
                  <td className="px-4 py-3">Founding-level ESOPs. 4-year vest, 1-year cliff. Allocation based on work delivered in first 3 months.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-foreground">Growth</td>
                  <td className="px-4 py-3">In 12 months you won't just be a better engineer. You'll understand unit economics, client management, and how businesses actually work.</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },
      {
        heading: "How to Apply",
        content: (
          <div className="space-y-4">
            <p>Don't send a resume. Send:</p>
            <ul className="space-y-2 pl-5">
              <li className="relative before:content-[''] before:absolute before:left-[-16px] before:top-[10px] before:w-1.5 before:h-1.5 before:bg-foreground/40 before:rounded-full">
                A link to something you've built. GitHub repo, deployed app. Show us the code, not the certificate.
              </li>
            </ul>
            <div className="flex items-center gap-2 mt-4">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <a href="mailto:hello@simplegrid.ai" className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                hello@simplegrid.ai
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              If your work is interesting, you'll hear from the founder directly within 48 hours. No ATS. No HR screen. No ghosting.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    id: "founding-engineer-sr",
    title: "Founding Engineer (Sr)",
    subtitle: "For experienced engineers who want to define architecture, not inherit it.",
    location: "Bangalore",
    workMode: "In-Office",
    compensation: "₹20–30 LPA + Founding ESOP",
    sections: [
      {
        heading: "About SimpleGrid.AI",
        content: (
          <div className="space-y-4">
            <p>
              We are building the schema-native operating system for physical-world businesses.
            </p>
            <p>
              Factories. Export houses. D2C brands. Contractors. Co-working spaces. Warehouses. C&F agents. Any organization where real things move, people do work, and money changes hands based on operations.
            </p>
            <p>
              The places where SAP takes 12 months and still fails. Where Tally only understands accounting, not operations. Where Zoho gives you forms and dashboards but no understanding of how your business actually runs.
            </p>
            <p className="text-foreground">
              If you want to architect the system that replaces ERP itself, keep reading.
            </p>
          </div>
        ),
      },
      {
        heading: "The Founder",
        content: (
          <div className="space-y-4">
            <p>
              The founder built a manufacturing enterprise and scaled it to 200 employees and $30Mn+ in revenue. Managed. Crashed it. Rebuilding SimpleGrid now. Did an MBA from MDI Gurgaon. Worked in audit and investment banking. Understands both the spreadsheet and the factory floor.
            </p>
            <p className="text-foreground">
              You will work directly with the founder as a technical co-pilot. No layers. No middle management. Your decisions shape the product.
            </p>
          </div>
        ),
      },
      {
        heading: "What We Need",
        content: (
          <div className="space-y-4">
            <p>
              We need someone who has built systems at scale and wants to do it again — but this time, from the ground up. Someone who has seen enough enterprise software to know what's broken and has the conviction to build something fundamentally different.
            </p>
            <p>
              You'll own the technical architecture of a schema-driven AI event engine built on Domain-Driven Design principles. You'll make decisions about the event ledger, the schema engine, the AI interaction layer, and how they compose together.
            </p>
          </div>
        ),
      },
      {
        heading: "The Kind of Engineer This Requires",
        content: (
          <div className="space-y-4">
            <p>
              You have 3–8 years of experience. You've built production systems. You've dealt with scale, reliability, and the messy realities of software in the real world.
            </p>
            <h4 className="text-foreground mt-4 mb-2">Non-negotiables</h4>
            <ul className="space-y-2 pl-5">
              <li className="relative before:content-[''] before:absolute before:left-[-16px] before:top-[10px] before:w-1.5 before:h-1.5 before:bg-foreground/40 before:rounded-full">
                You've designed and shipped systems that handle real load — not just CRUD apps, but systems with meaningful state management, event flows, or domain complexity.
              </li>
              <li className="relative before:content-[''] before:absolute before:left-[-16px] before:top-[10px] before:w-1.5 before:h-1.5 before:bg-foreground/40 before:rounded-full">
                Deep fluency in TypeScript and/or Python. You have strong opinions about type systems, architecture patterns, and testing strategies.
              </li>
              <li className="relative before:content-[''] before:absolute before:left-[-16px] before:top-[10px] before:w-1.5 before:h-1.5 before:bg-foreground/40 before:rounded-full">
                You've worked with event-driven architectures, DDD, or similar patterns in production — or you've studied them deeply enough to implement from first principles.
              </li>
              <li className="relative before:content-[''] before:absolute before:left-[-16px] before:top-[10px] before:w-1.5 before:h-1.5 before:bg-foreground/40 before:rounded-full">
                You can mentor junior engineers while shipping at speed. You lead by building, not by delegating.
              </li>
            </ul>
            <h4 className="text-foreground mt-4 mb-2">Strong signals</h4>
            <ul className="space-y-2 pl-5">
              <li className="relative before:content-[''] before:absolute before:left-[-16px] before:top-[10px] before:w-1.5 before:h-1.5 before:bg-foreground/40 before:rounded-full">
                Experience with event sourcing, CQRS, or immutable log architectures in production.
              </li>
              <li className="relative before:content-[''] before:absolute before:left-[-16px] before:top-[10px] before:w-1.5 before:h-1.5 before:bg-foreground/40 before:rounded-full">
                Background in enterprise/B2B SaaS, ERP systems, or operational software.
              </li>
              <li className="relative before:content-[''] before:absolute before:left-[-16px] before:top-[10px] before:w-1.5 before:h-1.5 before:bg-foreground/40 before:rounded-full">
                Experience integrating LLMs into production workflows (not just wrappers around ChatGPT).
              </li>
            </ul>
          </div>
        ),
      },
      {
        heading: "The Deal",
        content: (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-4 py-3 border-b border-border w-1/4">Component</th>
                  <th className="text-left px-4 py-3 border-b border-border">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-3 text-foreground">Salary</td>
                  <td className="px-4 py-3">₹20–30 LPA. Reflects experience and demonstrated architectural capability.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-foreground">Equity</td>
                  <td className="px-4 py-3">Founding-level ESOPs (1.5%-3%). 4-year vest, 1-year cliff. You're not joining a company — you're building one.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-foreground">Role</td>
                  <td className="px-4 py-3">Technical co-founder in all but title. You'll shape product decisions, hire the engineering team, and define the technical culture.</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },
      {
        heading: "How to Apply",
        content: (
          <div className="space-y-4">
            <p>Don't send a resume. Send:</p>
            <ul className="space-y-2 pl-5">
              <li className="relative before:content-[''] before:absolute before:left-[-16px] before:top-[10px] before:w-1.5 before:h-1.5 before:bg-foreground/40 before:rounded-full">
                A link to something you've architected. A system design doc, a GitHub repo, a technical blog post. Show us how you think about systems.
              </li>
              <li className="relative before:content-[''] before:absolute before:left-[-16px] before:top-[10px] before:w-1.5 before:h-1.5 before:bg-foreground/40 before:rounded-full">
                A brief note on why SimpleGrid's architecture interests you.
              </li>
            </ul>
            <div className="flex items-center gap-2 mt-4">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <a href="mailto:hello@simplegrid.ai" className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                hello@simplegrid.ai
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              If your work is interesting, you'll hear from the founder directly within 48 hours. No ATS. No HR screen. No ghosting.
            </p>
          </div>
        ),
      },
    ],
  },
];

function JobCard({ job, isExpanded, onToggle }: { job: JobPosting; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div className="border border-border rounded-lg overflow-hidden transition-all duration-200 hover:border-foreground/20">
      <div>
        <button
          onClick={onToggle}
          className="w-full text-left px-6 py-6 md:px-8 md:py-8 flex items-start justify-between gap-4 cursor-pointer bg-background hover:bg-muted/20 transition-colors"
        >
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl">{job.title}</h2>
            <p className="text-sm text-muted-foreground">{job.subtitle}</p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                {job.workMode}
              </span>
              <span className="flex items-center gap-1">
                <IndianRupee className="w-3 h-3" />
                {job.compensation}
              </span>
            </div>
          </div>
          <div className="mt-1 flex-shrink-0">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </button>
        <div className="px-6 pb-6 md:px-8 md:pb-8 -mt-2">
          <a
            href="https://www.walnutt.co?utm_source=simplegrid&utm_medium=SimpleGrid+Website&utm_campaign=Founding+Engineer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 border border-border rounded-lg px-5 py-4 bg-muted/30 hover:bg-muted/60 hover:border-foreground/20 transition-all group"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <p className="text-sm text-foreground">Take Assessment</p>
              <p className="text-xs text-muted-foreground mt-0.5">Complete the assessment to move forward in the process.</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
          </a>
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 pb-8 md:px-8 md:pb-10 border-t border-border">
          <div className="space-y-8 pt-8">
            {job.sections.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-sm tracking-wide text-muted-foreground uppercase mb-4">
                  {section.heading}
                </h3>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Hiring() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="mb-12">
          <p className="text-xs tracking-widest text-muted-foreground uppercase mb-3">Careers</p>
          <h1 className="text-3xl md:text-4xl tracking-tight mb-4">
            Build the operating system for businesses that actually make things.
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-xl">
            We're looking for founding engineers who want to architect systems from scratch, ship to paying clients from day one, and help define what modern business infrastructure looks like.
          </p>
        </div>

        <div className="space-y-4">
          {jobPostings.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isExpanded={expandedId === job.id}
              onToggle={() => handleToggle(job.id)}
            />
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            SimpleGrid.AI — Designed for operators, powered by intelligence.
          </p>
        </div>
      </div>
    </div>
  );
}