function ValueInfographic() {
  const items = [{
    cls: 'a',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "12 6 12 12 16 14"
    })),
    h: 'Planning time',
    from: '20 hrs',
    to: '2 hrs',
    delta: '−90%',
    desc: 'A week of planner-only spreadsheet work compressed into a single morning. The system aggregates wood requirements across orders automatically.'
  }, {
    cls: 'b',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m1 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"
    })),
    h: 'Material wastage',
    from: '1.5%',
    to: '<0.1%',
    delta: 'Near zero',
    desc: 'Component-level reconciliation catches gaps at the source. The $50K/yr leakage that hid in monthly reconciliations is gone.'
  }, {
    cls: 'c',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 12h4l3-9 4 18 3-9h4"
    })),
    h: 'On-time delivery',
    from: 'baseline',
    to: '+15%',
    delta: '+15%',
    desc: 'Full-stage visibility plus contractor accountability surfaced delays days earlier. Buyers ship on schedule.'
  }, {
    cls: 'd',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "9",
      cy: "7",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M23 21v-2a4 4 0 0 0-3-3.87"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 3.13a4 4 0 0 1 0 7.75"
    })),
    h: 'Floor adoption',
    from: '0 users',
    to: '30 users',
    delta: '30 of 30 staff onboarded',
    desc: '30 non-technical floor staff who rejected every previous ERP now work the system daily - by chatting with Hank, not navigating menus.'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "infographic"
  }, /*#__PURE__*/React.createElement("div", {
    className: "infographic-title"
  }, "VALUE DELIVERED"), /*#__PURE__*/React.createElement("div", {
    className: "infographic-h",
    role: "heading",
    "aria-level": "3"
  }, "What changed, in numbers."), /*#__PURE__*/React.createElement("p", {
    className: "infographic-sub"
  }, "Four years of operational drag, undone in 21 days. These are the deltas the founder reads off his dashboard now."), /*#__PURE__*/React.createElement("div", {
    className: "value-grid"
  }, items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.h,
    className: 'value-card ' + it.cls
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon-box"
  }, it.icon), /*#__PURE__*/React.createElement("h4", null, it.h), /*#__PURE__*/React.createElement("div", {
    className: "ba"
  }, /*#__PURE__*/React.createElement("span", {
    className: "from"
  }, it.from), /*#__PURE__*/React.createElement("span", {
    className: "arrow"
  }, "\u2192"), /*#__PURE__*/React.createElement("span", {
    className: "to"
  }, it.to)), /*#__PURE__*/React.createElement("span", {
    className: "delta"
  }, it.delta), /*#__PURE__*/React.createElement("p", {
    className: "desc"
  }, it.desc)))));
}
function ManufacturingProcessSection() {
  // 13-step abbreviated production flow (left column)
  const flow = [{
    h: 'Buyer PO arrives',
    b: 'AI parses any PDF format. Sales order created with line items.'
  }, {
    h: 'SO approved',
    b: 'Cost snapshot freezes. Planning unlocks.'
  }, {
    h: 'Planner allocates',
    b: 'Per SKU: in-house vs. vendor splits. Tracked automatically.'
  }, {
    h: 'Wood needs aggregated',
    b: 'All component-level wood requirements rolled up across orders.'
  }, {
    h: 'Wood PO consolidated',
    b: 'One PO per species + thickness. Multi-vendor quoted.'
  }, {
    h: 'Wood received',
    b: 'Seasoned/unseasoned check at receipt. Inventory + AP update live.'
  }, {
    h: 'Issued to machining',
    b: 'Each cubic foot attaches to a SKU + component.'
  }, {
    h: 'QC + components stocked',
    b: 'Pass enters component stock; fail returns or scraps.'
  }, {
    h: 'Assembly',
    b: 'Components merge into a SKU. Tracking shifts component → SKU.'
  }, {
    h: 'Sand · finish · hardware',
    b: 'Per-sqft, per-sqft, per-fitting × screw size. QC at every gate.'
  }, {
    h: 'Final QC',
    b: 'Buyer-spec gate. Photo, moisture, dimensions. Block on fail.'
  }, {
    h: 'Packaging + dispatch',
    b: 'CBM auto-calculated. Container loaded.'
  }, {
    h: 'Invoice + settlement',
    b: "Buyer billed. Six contractors auto-settled, each on its own formula."
  }];

  // Stage A/B/C/D framework (right column)
  const stages = [{
    letter: 'A',
    title: 'Components',
    range: '01-06',
    color: 'var(--sg-blue)',
    desc: 'Wood in, machined parts out. Tracking is per component, per SKU.'
  }, {
    letter: 'B',
    title: 'Assembly',
    range: '07-09',
    color: 'var(--sg-purple)',
    desc: 'Components merge into a SKU. From here, tracking is per SKU.'
  }, {
    letter: 'C',
    title: 'Finishing',
    range: '10-15',
    color: 'var(--sg-gold)',
    desc: 'Sand, finish, hardware. The most error-prone window.'
  }, {
    letter: 'D',
    title: 'Dispatch',
    range: '16-19',
    color: 'var(--sg-green)',
    desc: 'Final QC, pack, ship. Buyer-spec compliance enforced.'
  }];

  // Contractor settlement matrix (full width below)
  const pricing = [{
    color: 'var(--sg-blue)',
    stage: 'Machining',
    rate: 'Per sqft (panels) · per running ft (frames)',
    detail: 'Rate varies by wood thickness. System reads the issuance ticket and applies the right matrix.'
  }, {
    color: 'var(--sg-purple)',
    stage: 'Assembly',
    rate: 'Per SKU',
    detail: "Each assembled unit GRN'd from the contractor settles on the SKU rate card."
  }, {
    color: 'var(--sg-blue)',
    stage: 'Sanding',
    rate: 'Per sqft of finished surface (90%)',
    detail: 'For irregular profiles, rate falls back to per-SKU. System holds both rate types.'
  }, {
    color: 'var(--sg-green)',
    stage: 'Finishing',
    rate: 'Per sqft of finished surface (90%)',
    detail: 'Multi-coat sequences priced as one unit per pass. Coat count tracked, rate is per surface.'
  }, {
    color: 'var(--sg-gold)',
    stage: 'Hardware fitting',
    rate: 'Per fitting × screw-size matrix',
    detail: 'Each hinge, slide, handle, screw priced individually. Larger screws → higher labor rate.'
  }, {
    color: 'var(--sg-green)',
    stage: 'Packaging',
    rate: 'Per CBM of packed material',
    detail: 'CBM auto-calculated from carton dimensions at pack-out. Settles to packing contractor on dispatch.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "case-section"
  }, /*#__PURE__*/React.createElement("h2", null, "The manufacturing process"), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 920
    }
  }, "Wood arrives. Furniture leaves. Between sit 19 tracked stages, four QC gates, and six contractor formulas. Below: the abbreviated flow on the left, the moving line in the center, the structural framework on the right - three views of the same process."), /*#__PURE__*/React.createElement("div", {
    className: "elite-mfg-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(220px, 1fr) minmax(520px, 1.7fr) minmax(220px, 1fr)',
      gap: 20,
      marginTop: 24,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'sticky',
      top: 16,
      alignSelf: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.14em',
      color: 'var(--sg-blue)',
      textTransform: 'uppercase',
      marginBottom: 10
    }
  }, "The flow, end-to-end"), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    }
  }, flow.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      position: 'relative',
      paddingLeft: 26,
      paddingBottom: i < flow.length - 1 ? 9 : 0,
      marginBottom: i < flow.length - 1 ? 9 : 0,
      borderBottom: i < flow.length - 1 ? '1px dashed var(--border)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      top: 1,
      fontSize: 9.5,
      fontWeight: 700,
      color: 'var(--sg-blue)',
      fontFamily: 'var(--font-mono)'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 12.5,
      fontWeight: 700,
      color: 'var(--fg1)',
      marginBottom: 2,
      lineHeight: 1.3
    }
  }, f.h), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg2)',
      lineHeight: 1.45
    }
  }, f.b))))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)',
      lineHeight: 1.5,
      marginTop: 12,
      marginBottom: 0,
      fontStyle: 'italic',
      maxWidth: 'none'
    }
  }, "By the time a product ships, the system knows exactly what it cost. SKU-level profitability - for the first time in the company's history.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EliteFactoryRoad, {
    compact: true
  })), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'sticky',
      top: 16,
      alignSelf: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.14em',
      color: 'var(--sg-purple)',
      textTransform: 'uppercase',
      marginBottom: 12
    }
  }, "How the stages stack"), stages.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '26px 1fr',
      gap: 10,
      paddingTop: i === 0 ? 0 : 10,
      paddingBottom: i < stages.length - 1 ? 10 : 0,
      borderBottom: i < stages.length - 1 ? '1px dashed var(--border)' : 'none',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 24,
      height: 24,
      borderRadius: 6,
      background: s.color,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      fontSize: 12,
      marginTop: 1
    }
  }, s.letter), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--fg1)'
    }
  }, s.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 9.5,
      color: 'var(--fg3)'
    }
  }, s.range)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg2)',
      lineHeight: 1.45,
      marginTop: 2
    }
  }, s.desc))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(74,123,247,0.06)',
      border: '1px solid rgba(74,123,247,0.18)',
      borderRadius: 12,
      padding: 14,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.14em',
      color: 'var(--sg-blue)',
      textTransform: 'uppercase',
      marginBottom: 10
    }
  }, "At a glance"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10,
      fontSize: 11.5
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      color: 'var(--fg1)',
      fontSize: 20,
      lineHeight: 1
    }
  }, "19"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--fg3)'
    }
  }, "tracked stages")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      color: 'var(--fg1)',
      fontSize: 20,
      lineHeight: 1
    }
  }, "4"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--fg3)'
    }
  }, "QC gates")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      color: 'var(--fg1)',
      fontSize: 20,
      lineHeight: 1
    }
  }, "6"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--fg3)'
    }
  }, "contractor types")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      color: 'var(--fg1)',
      fontSize: 20,
      lineHeight: 1
    }
  }, "550"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--fg3)'
    }
  }, "SKUs")))))), /*#__PURE__*/React.createElement("div", {
    className: "contractor-table",
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ct-h"
  }, /*#__PURE__*/React.createElement("h4", null, "Contractor settlement, by stage"), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, "Each rate logic is configuration, not custom code.")), pricing.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.stage,
    className: "ct-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ct-stage"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: p.color
    }
  }), p.stage), /*#__PURE__*/React.createElement("div", {
    className: "ct-rate"
  }, p.rate), /*#__PURE__*/React.createElement("div", {
    className: "ct-detail"
  }, p.detail)))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 1080px) {
          .elite-mfg-grid {
            grid-template-columns: 1fr !important;
          }
          .elite-mfg-grid aside {
            position: static !important;
          }
        }
      `));
}
function EliteCaseStudy() {
  const [showLogin, setShowLogin] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    page: "cases",
    onLoginClick: () => setShowLogin(true)
  }), /*#__PURE__*/React.createElement("main", { id: "main" }, /*#__PURE__*/React.createElement("section", {
    className: "case-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "CASE STUDY \xB7 FURNITURE EXPORT"), /*#__PURE__*/React.createElement("h1", null, "How a furniture exporter with 800 employees went from Excel to a live ERP in 21 days"), /*#__PURE__*/React.createElement("p", {
    className: "case-hook"
  }, "Over four years, a furniture manufacturer and exporter \u2014 12+ countries across North America, Europe, and Asia \u2014 lost nearly $200,000 to material gaps they could not explain. Not theft. Not fraud. Just an operation running at 600\u2013800 employees across 1 million sqft, tracked on Excel and group chats. Today the same operation runs on a live ERP - built around their process, not the other way around."), /*#__PURE__*/React.createElement("div", {
    className: "case-strip"
  }, /*#__PURE__*/React.createElement("div", {
    className: "case-strip-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Industry"), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, "Furniture export")), /*#__PURE__*/React.createElement("div", {
    className: "case-strip-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Employees"), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, "600\u2013800")), /*#__PURE__*/React.createElement("div", {
    className: "case-strip-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Facilities"), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, "~1,000,000 sqft")), /*#__PURE__*/React.createElement("div", {
    className: "case-strip-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Deployed in"), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, "21 days"))))), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(ValueInfographic, null), /*#__PURE__*/React.createElement("section", {
    className: "case-section"
  }, /*#__PURE__*/React.createElement("h2", null, "The operation"), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 920
    }
  }, "The client (kept confidential at their request) is a furniture manufacturer and exporter with presence in 12+ countries across North America, Europe, and Asia, running 600\u2013800 people across nearly 1 million square feet of production space - raw wood comes in at one end, finished furniture leaves the other in 40-foot containers bound for international buyers. Between those two events sit ", /*#__PURE__*/React.createElement("strong", null, "19 tracked stages, four quality gates, and six contractor types"), " - each paid by a different formula. The catalog runs to ", /*#__PURE__*/React.createElement("strong", null, "550 active SKUs"), ", each with an average of 20+ unique components, each component cut from a specific wood species at a specific dimension and cubic footage. A single dining table might need mango wood for the top, sheesham for the legs, and a third species for the frame."), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 920
    }
  }, "Work happens at two levels and they cross over at assembly. Wood issuance and machining track at the ", /*#__PURE__*/React.createElement("strong", null, "component level"), " - every cubic foot attaches to a specific SKU + component. Once all components for a SKU are machined and QC\u2019d they merge; from there, tracking is at the ", /*#__PURE__*/React.createElement("strong", null, "SKU level"), " through sanding, finishing, hardware, final QC, packaging, and dispatch. Six contractor types each bill on their own formula - machining per-sqft for panels and per-running-foot for frames with rates changing on wood thickness; assembly per SKU; sanding and finishing per sqft of finished surface for 90% of products; hardware fitting on a fittings \xD7 screw-size matrix; packaging on CBM of packed material. Every one of those formulas is a row in a config table - not code.")), /*#__PURE__*/React.createElement(ManufacturingProcessSection, null), /*#__PURE__*/React.createElement("section", {
    className: "case-section"
  }, /*#__PURE__*/React.createElement("h2", null, "What was breaking"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "The company was profitable. Nobody knew which products were."), " The founder knew the business made money. But could he tell you whether the 6-seater dining table was more profitable than the bookshelf? No."), /*#__PURE__*/React.createElement("ul", {
    className: "pain-list"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Planning was a 20-hour weekly grind."), " The planner spent the better part of every week aggregating component-level wood needs across 30\u201340 active orders in Excel. When the planner was out, planning stopped."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Material tracking was manual."), " Wood arrived at the store. The storekeeper wrote it in a register. How much was issued to which job, in which thickness, for which SKU? Nobody knew in real time."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Production stages were untracked."), " If 600 components entered sanding and 580 came out, nobody caught the 20-component gap until final count. Over 4 years, these gaps added up to nearly $200,000 - about 1.5% wastage compounding silently."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Contractor costing was reconciled monthly."), " Six contractor types, six settlement formulas, multiple jobs and stages each. Settlement required cross-referencing handwritten logs with the planner's memory."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "30+ floor staff could not use any ERP."), " The company had tried before. Storekeepers, QC inspectors, supervisors - too many menus, too many dropdowns. Everyone went back to texting."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "The founder had no dashboard."), " To answer \"where are we on the West Elm order?\" required 3 phone calls and 20 minutes."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Delivery slippage hid in the gaps."), " Without stage-level visibility, nobody saw a sanding bottleneck or a finishing delay until the dispatch deadline missed."))), /*#__PURE__*/React.createElement("section", {
    className: "case-section"
  }, /*#__PURE__*/React.createElement("h2", null, "What we built"), /*#__PURE__*/React.createElement("p", null, "We did multiple calls with the founder over 14 days. Mapped how work actually moves: every order type, every approval rule, every handoff between contractors, every contractor pricing formula, every exception that only the founder knew about."), /*#__PURE__*/React.createElement("p", null, "After the first call, the founder saw a ", /*#__PURE__*/React.createElement("strong", null, "working demo within 24 hours"), ". Not a slideshow. A working system reflecting how his factory actually runs - wood aggregation, two-level tracking, six contractor settlement formulas, four QC gates. 21 days total from first conversation to live system."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--sg-blue)',
      margin: '24px 0'
    }
  }, "64 things tracked end-to-end. 72 automatic triggers. 6 contractor settlement formulas. 4 QC gates.")), /*#__PURE__*/React.createElement("section", {
    className: "case-section"
  }, /*#__PURE__*/React.createElement("h2", null, "Rules the system enforces"), /*#__PURE__*/React.createElement("p", null, "These are not suggestions. The system physically rejects the action."), /*#__PURE__*/React.createElement("ul", {
    className: "rules-list"
  }, /*#__PURE__*/React.createElement("li", null, "Can't receive more material than the PO ordered. System rejects: \"Maximum you can receive: 500.\""), /*#__PURE__*/React.createElement("li", null, "Can't issue unseasoned wood to machining. Routed to seasoning yard automatically."), /*#__PURE__*/React.createElement("li", null, "Can't dispatch more than planned quantity. Blocked."), /*#__PURE__*/React.createElement("li", null, "Final QC must approve before dispatch. System-enforced, not process-dependent."), /*#__PURE__*/React.createElement("li", null, "Contractor locked once assigned. Prevents cost manipulation across stages."), /*#__PURE__*/React.createElement("li", null, "Can't issue wood to a completed job. Prevents inventory leakage."), /*#__PURE__*/React.createElement("li", null, "Wood inventory can't go negative."), /*#__PURE__*/React.createElement("li", null, "Component count must reconcile before assembly. The $200K problem: caught at the source."), /*#__PURE__*/React.createElement("li", null, "Hardware-fitting settlement blocked until every fitting + screw size is logged."), /*#__PURE__*/React.createElement("li", null, "Packaging settlement blocked until CBM is captured at pack-out.")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16
    }
  }, "Every one of these rules is a configuration, not code. When the business adds a new rule, we add it in minutes.")), /*#__PURE__*/React.createElement("section", {
    className: "case-section"
  }, /*#__PURE__*/React.createElement("h2", null, "The floor staff problem, solved"), /*#__PURE__*/React.createElement("p", null, "The client's floor supervisors, QC inspectors, and storekeepers had rejected a previous ERP. Too complex. Too far from how they actually work. ", /*#__PURE__*/React.createElement("strong", null, "30 non-technical staff"), " who wouldn't touch the old system."), /*#__PURE__*/React.createElement("p", null, "With SimpleGrid, they talk to ", /*#__PURE__*/React.createElement("strong", null, "Hank"), ", the AI assistant. The storekeeper types: \"Received 300 mango planks from Shree Timber.\" Hank identifies the PO, checks the quantity, updates inventory, and confirms. No menus. No dropdowns. No training manual."), /*#__PURE__*/React.createElement("p", null, "Today all 30 use the system daily. Storekeepers log receipts. QC inspectors record pass/fail per stage. Supervisors close production tickets. The same 30 people who refused the previous ERP.")), /*#__PURE__*/React.createElement("section", {
    className: "case-section"
  }, /*#__PURE__*/React.createElement("h2", null, "What changed"), /*#__PURE__*/React.createElement("table", {
    className: "ba-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Before SimpleGrid"), /*#__PURE__*/React.createElement("th", null, "After SimpleGrid"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "No view into which SKUs made money"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, "SKU-level profitability visible"), " per product - wood, contractor, and rejection costs attached to every SKU")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "SKU production timeline was opaque"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, "SKU production timeline visible"), " end-to-end - every stage time-stamped from PO to dispatch")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "\"Where's the order?\" = 3 phone calls + 20 min"), /*#__PURE__*/React.createElement("td", null, "One dashboard. Real-time. Founder sees everything.")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "20 hours of planning per week, by one person"), /*#__PURE__*/React.createElement("td", null, "2 hours per week - the system aggregates and proposes")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "~1.5% material wastage (~$50K/yr)"), /*#__PURE__*/React.createElement("td", null, "Negligible - component-level reconciliation catches gaps at the source")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Delivery deadlines slipping invisibly"), /*#__PURE__*/React.createElement("td", null, "+15% on-time delivery from full-stage visibility")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Wood inventory reconciled monthly"), /*#__PURE__*/React.createElement("td", null, "Live inventory. Every receipt and issuance tracked, by species + thickness")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "6 contractor settlements took days each month"), /*#__PURE__*/React.createElement("td", null, "Auto-calculated on each contractor's own formula")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "30 floor staff rejected previous ERP"), /*#__PURE__*/React.createElement("td", null, "Same 30 staff use Hank daily. Zero training overhead."))))), /*#__PURE__*/React.createElement("div", {
    className: "testimonial-block"
  }, /*#__PURE__*/React.createElement("blockquote", null, "\"We have our own way of doing things: vendor consolidation by wood species, component-level QC, six different contractor settlement formulas that nobody else understands. We needed an ERP that was made for us, not one we'd have to change our process for. SimpleGrid feels like our system. Our Excel and texting habits didn't go away - the AI chatbot just replaced them. My stores manager was comfortable on day one because it works the way he already works.\""), /*#__PURE__*/React.createElement("div", {
    className: "attr"
  }, "- The founder")), /*#__PURE__*/React.createElement("div", {
    className: "case-bottom-line"
  }, /*#__PURE__*/React.createElement("div", {
    className: "big"
  }, "64 things tracked. 72 automatic triggers. 21 days to deploy. $0 upfront."), /*#__PURE__*/React.createElement("p", null, "Before SimpleGrid, the founder knew the company made money. Now he knows which products make money, and which ones do not. Planning dropped from 20 hours to 2. Wastage dropped to negligible. Delivery improved 15%. And 30 floor staff who had rejected every previous ERP now use this one daily."), /*#__PURE__*/React.createElement("a", {
    href: "https://cal.com/simplegrid-ai",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn btn-primary",
    style: {
      marginTop: 16
    }
  }, "Book a demo - See how we'd model your operations"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "case-apex.html",
    style: {
      color: 'var(--sg-blue)',
      fontWeight: 600,
      textDecoration: 'none'
    }
  }, "See an apparel manufacturer's deployment - live in 12 days \u2192"))))), /*#__PURE__*/React.createElement(Footer, null), showLogin && /*#__PURE__*/React.createElement(LoginModal, {
    onClose: () => setShowLogin(false)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(EliteCaseStudy, null));