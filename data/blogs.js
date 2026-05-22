const BLOG_DATA = [
  {
    "id": 1,
    "title": "Event Sourcing: Why SimpleGrid Stores Every Action Forever",
    "cat": "Product Deep-Dive",
    "readTime": "6 min",
    "slug": "event-sourcing-why-simplegrid-stores-everything-that-ever-happened",
    "datePublished": "2026-03-25",
    "images": [
      {
        "src": "assets/blog/event_sourcing_landscape_2.png",
        "alt": "Traditional ERP overwrites the record on every change. SimpleGrid keeps every event - permanent, forever."
      },
      {
        "src": "assets/blog/event_sourcing_landscape_1.png",
        "alt": "One sentence typed by Mike at the warehouse. Seven things happen in milliseconds: find PO, check state, permissions, rule check, state updated, event written, triggers fire."
      }
    ]
  },
  {
    "id": 2,
    "title": "SG Schema: Why Your ERP Should Speak Your Language",
    "cat": "Product Deep-Dive",
    "readTime": "6 min",
    "slug": "sg-schema-why-your-erp-should-speak-your-language",
    "datePublished": "2026-03-29",
    "images": [
      {
        "src": "assets/blog/blog2_sg_schema_same_word_different_operations.png",
        "w": 2808,
        "h": 1040,
        "alt": "Same word, different operations. A furniture exporter's SG Schema (Sales Order, Job Order, Vendor PO, Stage Movement, Component, Contractor Settlement) vs an apparel CMT manufacturer's (Work Order, Cutting Ticket, Job Worker Assignment, Trim Issuance, LR Logistics Event, Size-wise Breakdown). One engine, two operations."
      }
    ]
  },
  {
    "id": 3,
    "title": "Entity Roots: Building Blocks of an SG Schema ERP",
    "cat": "Product Deep-Dive",
    "readTime": "6 min",
    "slug": "entity-roots-the-building-blocks-of-an-sg-schema-erp",
    "datePublished": "2026-04-01",
    "images": [
      {
        "src": "assets/blog/blog3_entity_roots_one_root_many_members.png",
        "w": 2808,
        "h": 1040,
        "alt": "An entity group, visualized. One root (Sales Order SO-4521), many members (3 line items: dining tables, side chairs, bookshelves), three rules: move as one, no orphans, reference don't nest."
      }
    ]
  },
  {
    "id": 4,
    "title": "Multi-Tenant Architecture: 100 Clients, One Platform",
    "cat": "Product Deep-Dive",
    "readTime": "5 min",
    "slug": "multi-tenant-architecture-how-simplegrid-runs-100-clients-on-one-platform",
    "datePublished": "2026-04-05"
  },
  {
    "id": 5,
    "title": "ERP Customization in Minutes, Not Months",
    "cat": "Product Deep-Dive",
    "readTime": "5 min",
    "slug": "how-simplegrid-makes-erp-customization-take-minutes-not-months",
    "datePublished": "2026-04-08"
  },
  {
    "id": 6,
    "title": "Module-Based ERP vs. SG Schema ERP",
    "cat": "Product Deep-Dive / Industry Critique",
    "readTime": "6 min",
    "slug": "module-based-erp-vs-sg-schema-erp-two-architectures-two-outcomes",
    "datePublished": "2026-04-12",
    "images": [
      {
        "src": "assets/blog/blog6_module_vs_sg_schema_cover.jpg",
        "w": 1200,
        "h": 630,
        "alt": "Module-Based ERP vs SG Schema ERP. Left: rigid stacked modules (Procurement, Inventory, Production, Quality, Finance, Reports), $10K-$50K per change, 4 weeks per customization. Right: an organic SG Schema (entities, states, rules, events) that SG Engine reads and regenerates the system from in minutes."
      }
    ]
  },
  {
    "id": 7,
    "title": "Building an ERP Chatbot With Claude, No RAG",
    "cat": "Build in Public",
    "readTime": "6 min",
    "slug": "how-we-built-an-erp-chatbot-with-claude-no-rag-and-full-context",
    "datePublished": "2026-04-15"
  },
  {
    "id": 8,
    "title": "Why Conversational UX Does Not Change Behavior",
    "cat": "Operator Insights / Product",
    "readTime": "5 min",
    "slug": "why-conversational-ux-does-not-change-user-behavior-and-why-that-is-the-point",
    "datePublished": "2026-04-19"
  },
  {
    "id": 9,
    "title": "True Landed Cost Per SKU (And Why Most Cannot)",
    "cat": "Operator Insights",
    "readTime": "6 min",
    "slug": "how-to-calculate-true-landed-cost-per-sku-and-why-most-manufacturers-cannot",
    "datePublished": "2026-04-22"
  },
  {
    "id": 10,
    "title": "Inside SimpleGrid: Every Factory Is Different",
    "cat": "Culture",
    "readTime": "5 min",
    "slug": "inside-simplegrid-every-factory-floor-is-different-that-is-the-whole-point",
    "datePublished": "2026-04-26"
  },
  {
    "id": 11,
    "title": "Why Mid-Market Manufacturers Are Underserved",
    "cat": "Industry Critique",
    "readTime": "5 min",
    "slug": "why-mid-market-manufacturers-are-the-most-underserved-businesses-in-enterprise-software",
    "datePublished": "2026-04-29"
  },
  {
    "id": 12,
    "title": "The Real Cost of Running Your Factory on Spreadsheets",
    "cat": "Operator Insights",
    "readTime": "5 min",
    "slug": "the-real-cost-of-running-your-factory-on-spreadsheets",
    "datePublished": "2026-05-03"
  },
  {
    "id": 13,
    "title": "Why Your ERP Vendor Charges You for Every Change",
    "cat": "Industry Critique",
    "readTime": "5 min",
    "slug": "why-your-erp-vendor-charges-you-for-every-change-and-how-to-stop-paying",
    "datePublished": "2026-05-06"
  },
  {
    "id": 14,
    "title": "How AI Changed ERP Deployment (Not Features)",
    "cat": "Industry Critique / Product",
    "readTime": "5 min",
    "slug": "how-ai-changed-erp-deployment-not-features-deployment",
    "datePublished": "2026-05-10"
  },
  {
    "id": 15,
    "title": "When Your ERP Cannot Keep Up With Your Business",
    "cat": "Operator Insights",
    "readTime": "5 min",
    "slug": "what-happens-when-your-erp-cannot-keep-up-with-your-business",
    "datePublished": "2026-05-13"
  },
  {
    "id": 16,
    "title": "Your Warehouse Manager Should Be Your ERP's First User",
    "cat": "Operator Insights",
    "readTime": "4 min",
    "slug": "why-your-warehouse-manager-should-be-your-erp-s-first-user",
    "datePublished": "2026-05-17"
  },
  {
    "id": 17,
    "title": "The Myth of ERP Best Practices",
    "cat": "Industry Critique",
    "readTime": "5 min",
    "slug": "the-myth-of-erp-best-practices-your-operation-is-not-generic",
    "datePublished": "2026-05-22"
  }
];
