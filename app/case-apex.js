function BarsInfographic() {
  const [animate, setAnimate] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setAnimate(true);
          obs.disconnect();
        }
      });
    }, {
      threshold: 0.2
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Volume share: CMT 55k, Brand 25k, Trading is fabric (different unit) -> shown as separate bar in meters or rolls
  const bars = [{
    cls: 'cmt',
    label: 'CMT (contract)',
    value: 55000,
    max: 60000,
    display: '55,000',
    unit: 'shirts/mo'
  }, {
    cls: 'brand',
    label: 'Own brand',
    value: 25000,
    max: 60000,
    display: '25,000',
    unit: 'shirts/mo'
  }, {
    cls: 'trade',
    label: 'Fabric trading',
    value: 38000,
    max: 60000,
    display: '~40,000',
    unit: 'meters/mo'
  }];
  const locs = [{
    cls: 'a',
    count: '20+',
    h: 'Job worker units',
    s: 'Cut · stitch · finish - across the city'
  }, {
    cls: 'b',
    count: '10+',
    h: 'Logistics warehouses',
    s: 'Partner-operated, fabric & finished goods'
  }, {
    cls: 'c',
    count: '2',
    h: 'In-house operations',
    s: 'Ironing & packaging only'
  }];
  const flow = [{
    n: '01',
    h: 'Fabric procured',
    p: 'PO raised, stock checked across all 30+ locations first'
  }, {
    n: '02',
    h: 'Issued to job worker',
    p: 'Fabric + trims sent together, tracked per work order'
  }, {
    n: '03',
    h: 'Production',
    p: '20+ independent job workers, full cut-make-trim'
  }, {
    n: '04',
    h: 'Returned & QC',
    p: 'Reconciled against issued: yield, rejects, settlement'
  }, {
    n: '05',
    h: 'Iron · pack · dispatch',
    p: 'In-house finishing, packed to buyer specs'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "btn-info",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "infographic-title"
  }, "BY THE NUMBERS"), /*#__PURE__*/React.createElement("h2", {
    className: "infographic-h"
  }, "Three streams. One inventory. Thirty-plus locations."), /*#__PURE__*/React.createElement("div", {
    className: "btn-info-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "btn-bars"
  }, /*#__PURE__*/React.createElement("h4", null, "Monthly throughput by stream"), bars.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.label,
    className: "bar-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bar-label"
  }, b.label), /*#__PURE__*/React.createElement("div", {
    className: "bar-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: 'bar-fill ' + b.cls,
    style: {
      width: animate ? `${b.value / b.max * 100}%` : '0%'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "bar-value"
  }, b.display, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 500,
      color: 'var(--fg3)',
      letterSpacing: '0.05em'
    }
  }, b.unit)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      paddingTop: 14,
      borderTop: '1px solid var(--border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.12em',
      color: 'var(--fg3)'
    }
  }, "TOTAL SHIRTS / MONTH"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 24,
      fontWeight: 700,
      color: 'var(--sg-blue)',
      letterSpacing: '-0.02em'
    }
  }, "80,000 - 100,000"))), /*#__PURE__*/React.createElement("div", {
    className: "btn-locations"
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 14,
      fontWeight: 700,
      margin: '0 0 4px'
    }
  }, "Where the inventory lives"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)',
      margin: '0 0 8px',
      lineHeight: 1.5
    }
  }, "Stock sits with partners and producers - not in a single factory. SimpleGrid tracks every roll, trim, and garment across all 30+ live locations."), locs.map(l => /*#__PURE__*/React.createElement("div", {
    key: l.h,
    className: "loc-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: 'loc-icon ' + l.cls
  }, l.count), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h"
  }, l.h), /*#__PURE__*/React.createElement("div", {
    className: "s"
  }, l.s)), /*#__PURE__*/React.createElement("div", {
    className: "ct",
    style: {
      color: l.cls === 'a' ? 'var(--sg-blue)' : l.cls === 'b' ? 'var(--sg-gold)' : 'var(--sg-purple)'
    }
  }, "\u25CF"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginTop: 6,
      paddingTop: 14,
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.12em',
      color: 'var(--fg3)'
    }
  }, "LIVE INVENTORY POINTS"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 24,
      fontWeight: 700,
      color: 'var(--sg-blue)',
      letterSpacing: '-0.02em'
    }
  }, "30+")))), /*#__PURE__*/React.createElement("div", {
    className: "btn-flow"
  }, flow.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.n,
    className: "flow-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "step-n"
  }, f.n), /*#__PURE__*/React.createElement("div", {
    className: "step-h"
  }, f.h), /*#__PURE__*/React.createElement("div", {
    className: "step-p"
  }, f.p)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 0,
      border: '1px solid var(--sg-blue)',
      borderRadius: 12,
      overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(74,123,247,0.04), rgba(74,123,247,0.08))'
    }
  }, [{
    n: '24',
    u: 'hours',
    l: 'Working demo delivered'
  }, {
    n: '12',
    u: 'days',
    l: 'From kickoff to live'
  }, {
    n: '34',
    u: '',
    l: 'Domain entities tracked'
  }, {
    n: '44',
    u: '',
    l: 'Automatic triggers wired'
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '22px 20px',
      borderRight: i < 3 ? '1px solid rgba(74,123,247,0.25)' : 'none',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 38,
      fontWeight: 700,
      color: 'var(--sg-blue)',
      letterSpacing: '-0.02em',
      lineHeight: 1
    }
  }, s.n, s.u && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--fg3)',
      fontWeight: 500,
      marginLeft: 4
    }
  }, s.u)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg2)',
      marginTop: 8,
      letterSpacing: '0.04em'
    }
  }, s.l)))));
}
function NetworkInfographic() {
  // Hub-and-spoke: central warehouse → 30 dots around (job workers + logistics warehouses)
  const cx = 400,
    cy = 240,
    r = 180;
  const nodes = Array.from({
    length: 30
  }, (_, i) => {
    const angle = i / 30 * Math.PI * 2 - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
      i
    };
  });
  const colorOf = i => {
    if (i % 5 === 0) return 'var(--sg-purple)';
    if (i % 3 === 0) return 'var(--sg-gold)';
    return 'var(--sg-blue)';
  };
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 800 480",
    className: "network-svg"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "hubGlow",
    cx: "50%",
    cy: "50%",
    r: "50%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(74,123,247,0.25)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(74,123,247,0)"
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: "120",
    fill: "url(#hubGlow)"
  }), nodes.map((n, i) => /*#__PURE__*/React.createElement("line", {
    key: `l-${i}`,
    x1: cx,
    y1: cy,
    x2: n.x,
    y2: n.y,
    stroke: colorOf(i),
    strokeWidth: "1",
    opacity: "0.35",
    className: "spoke-line",
    style: {
      animationDelay: `${i * 0.1}s`
    }
  })), nodes.map((n, i) => /*#__PURE__*/React.createElement("circle", {
    key: `d-${i}`,
    cx: n.x,
    cy: n.y,
    r: "7",
    fill: colorOf(i),
    className: "spoke-dot",
    style: {
      animationDelay: `${i * 0.08}s`
    }
  })), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: "48",
    fill: "#fff",
    stroke: "var(--sg-blue)",
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy - 4,
    textAnchor: "middle",
    fontFamily: "var(--font-heading)",
    fontSize: "11",
    fontWeight: "700",
    fill: "var(--fg1)",
    letterSpacing: "0.04em"
  }, "CENTRAL"), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy + 12,
    textAnchor: "middle",
    fontFamily: "var(--font-heading)",
    fontSize: "11",
    fontWeight: "700",
    fill: "var(--fg1)",
    letterSpacing: "0.04em"
  }, "WAREHOUSE"), /*#__PURE__*/React.createElement("g", {
    transform: "translate(40, 430)"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "5",
    fill: "var(--sg-blue)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "18",
    y: "10",
    fontSize: "11",
    fill: "var(--fg2)"
  }, "Job worker units (cut \xB7 stitch \xB7 finish)"), /*#__PURE__*/React.createElement("circle", {
    cx: "280",
    cy: "6",
    r: "5",
    fill: "var(--sg-gold)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "292",
    y: "10",
    fontSize: "11",
    fill: "var(--fg2)"
  }, "Logistics partner warehouses"), /*#__PURE__*/React.createElement("circle", {
    cx: "540",
    cy: "6",
    r: "5",
    fill: "var(--sg-purple)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "552",
    y: "10",
    fontSize: "11",
    fill: "var(--fg2)"
  }, "In-transit hubs")), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: "40",
    textAnchor: "middle",
    fontSize: "11",
    fontWeight: "700",
    letterSpacing: "0.14em",
    fill: "var(--fg3)"
  }, "30+ INVENTORY LOCATIONS \xB7 ALL VISIBLE IN ONE LEDGER"));
}
function ApexCaseStudy() {
  const [showLogin, setShowLogin] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("main", {
    id: "main"
  }, /*#__PURE__*/React.createElement("section", {
    className: "case-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "CASE STUDY \xB7 APPAREL MANUFACTURING"), /*#__PURE__*/React.createElement("h1", null, "An apparel manufacturer running 80,000-100,000 shirts a month - without a factory of his own."), /*#__PURE__*/React.createElement("p", {
    className: "case-hook"
  }, "Two years. Two failed ERPs. Over $100,000 spent with nothing to show for it. The company runs three interconnected businesses through 20+ job workers and stores inventory at its logistics partners' warehouses - 30+ locations in total. Every generic ERP assumed a factory model. This operation does not have a factory."), /*#__PURE__*/React.createElement("div", {
    className: "confidential-banner"
  }, "\uD83D\uDD12 Client name withheld for confidentiality. We refer to them as \"Apex Apparel\" throughout this case study."), /*#__PURE__*/React.createElement("div", {
    className: "case-strip"
  }, /*#__PURE__*/React.createElement("div", {
    className: "case-strip-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Monthly volume"), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, "80k-100k shirts")), /*#__PURE__*/React.createElement("div", {
    className: "case-strip-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Operating model"), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, "100% job work")), /*#__PURE__*/React.createElement("div", {
    className: "case-strip-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Inventory locations"), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, "30+ tracked live")), /*#__PURE__*/React.createElement("div", {
    className: "case-strip-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Deployed in"), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, "12 days"))))), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "infographic"
  }, /*#__PURE__*/React.createElement("div", {
    className: "infographic-title"
  }, "THE OPERATION AT A GLANCE"), /*#__PURE__*/React.createElement("h2", {
    className: "infographic-h"
  }, "A factoryless apparel business, by the numbers."), /*#__PURE__*/React.createElement("div", {
    className: "stat-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, "80-100", /*#__PURE__*/React.createElement("span", {
    className: "unit"
  }, "k")), /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "Shirts manufactured per month, across all three streams")), /*#__PURE__*/React.createElement("div", {
    className: "stat-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, "3"), /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "Business streams: CMT, own brand, fabric trading")), /*#__PURE__*/React.createElement("div", {
    className: "stat-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, "20", /*#__PURE__*/React.createElement("span", {
    className: "unit"
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "Independent job workers across the city")), /*#__PURE__*/React.createElement("div", {
    className: "stat-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, "30", /*#__PURE__*/React.createElement("span", {
    className: "unit"
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "Inventory locations including logistics partner warehouses"))), /*#__PURE__*/React.createElement(NetworkInfographic, null), /*#__PURE__*/React.createElement("div", {
    className: "split-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "split-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.12em',
      color: 'var(--sg-blue)'
    }
  }, "STREAM 01 \xB7 CMT"), /*#__PURE__*/React.createElement("div", {
    className: "vol"
  }, "~55,000 / mo"), /*#__PURE__*/React.createElement("h4", null, "Contract manufacturing"), /*#__PURE__*/React.createElement("p", null, "Cut-make-trim for external brand principals. Brand owns the IP, Apex owns the supply chain.")), /*#__PURE__*/React.createElement("div", {
    className: "split-card alt"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.12em',
      color: 'var(--sg-purple)'
    }
  }, "STREAM 02 \xB7 OWN BRAND"), /*#__PURE__*/React.createElement("div", {
    className: "vol"
  }, "~25,000 / mo"), /*#__PURE__*/React.createElement("h4", null, "Own-label retail"), /*#__PURE__*/React.createElement("p", null, "Their own designs, manufactured through the same job worker network, sold to retail buyers.")), /*#__PURE__*/React.createElement("div", {
    className: "split-card alt2"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.12em',
      color: 'var(--sg-gold)'
    }
  }, "STREAM 03 \xB7 TRADING"), /*#__PURE__*/React.createElement("div", {
    className: "vol"
  }, "High-volume fabric"), /*#__PURE__*/React.createElement("h4", null, "Fabric wholesale"), /*#__PURE__*/React.createElement("p", null, "Buying fabric in bulk and reselling to other manufacturers - a separate P&L on the same inventory ledger.")))), /*#__PURE__*/React.createElement(BarsInfographic, null), /*#__PURE__*/React.createElement("section", {
    className: "case-section"
  }, /*#__PURE__*/React.createElement("h2", null, "The operation"), /*#__PURE__*/React.createElement("p", null, "Apex runs three interconnected businesses under one roof. Contract manufacturing for external brand principals. Their own brand: taking orders and manufacturing for retail. And fabric trading: buying fabric in volume and reselling to other manufacturers."), /*#__PURE__*/React.createElement("p", null, "The production model is ", /*#__PURE__*/React.createElement("strong", null, "job work"), ". They do not cut. They do not sew. Every piece of production happens at one of 20+ job worker facilities across the city. Each job worker is a complete production unit. Only two things happen in-house: ironing and packaging."), /*#__PURE__*/React.createElement("p", null, "And the inventory is not even theirs to hold. Fabric, trims, finished goods all sit at their ", /*#__PURE__*/React.createElement("strong", null, "logistics partner's warehouses"), " - multiple locations, depending on which buyer or job worker is closest. Add the 20+ job worker facilities, and at any given moment Apex has stock across ", /*#__PURE__*/React.createElement("strong", null, "30+ live inventory locations"), ".")), /*#__PURE__*/React.createElement("section", {
    className: "case-section"
  }, /*#__PURE__*/React.createElement("h2", null, "What was breaking"), /*#__PURE__*/React.createElement("ul", {
    className: "pain-list"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Generic ERPs could not model the operation."), " Two attempts over two years. Both failed. Every off-the-shelf ERP is built for manufacturers who make things in-house. Apex doesn't."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Inventory visibility collapsed across 30+ locations."), " Fabric, trims, and finished goods were spread across 20+ job worker units and 10+ logistics partner warehouses. When a brand asked \"where is our order?\" answering meant phone calls to three to five places."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Secondary material tracking was unmanageable."), " Every work order required its own bill of materials: specific buttons, hang tags, wash care labels, thread color. All purchased per work order, issued to job workers, reconciled at the end."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Three businesses collided in one spreadsheet."), " CMT, own brand, fabric trading: all tracked in overlapping Excel files. A fabric roll might belong to Brand A's order, their own stock, or a trading customer."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Job worker reconciliation was chaos."), " Each of 20+ workers received fabric AND trims for each work order, returned finished garments. Reconciling consumed hours every day."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Profitability by stream was a mystery."), " Was CMT making money or being subsidized by fabric trading? Impossible to tell."))), /*#__PURE__*/React.createElement("section", {
    className: "case-section"
  }, /*#__PURE__*/React.createElement("h2", null, "What we built"), /*#__PURE__*/React.createElement("p", null, "We offered to build it free. The founder's first reaction was that we must be overconfident. Then we sent him a ", /*#__PURE__*/React.createElement("strong", null, "working demo in 24 hours"), ": 60-70% accurate to how his operation actually runs, including the distributed job worker network, secondary material procurement, and three separate business streams."), /*#__PURE__*/React.createElement("p", null, "Over the next 11 days we did 4 working sessions with the founder and his operations head. Walked through every edge case."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 'var(--fs-body)',
      fontWeight: 700,
      color: 'var(--sg-blue)',
      margin: '24px 0'
    }
  }, "Day 12: live. For the first time, every order across 30+ locations sat in one view - and the founder could finally see which of his three businesses made money.")), /*#__PURE__*/React.createElement("section", {
    className: "case-section"
  }, /*#__PURE__*/React.createElement("h2", null, "The full CMT flow"), /*#__PURE__*/React.createElement("div", {
    className: "flow-steps"
  }, [{
    s: 'Brand sends a work order.',
    b: 'Style, sizes, quantities, fabric specs, trim requirements, production specs, dispatch deadline. System auto-generates SKUs.'
  }, {
    s: 'Bill of materials built.',
    b: 'Main fabric, secondary fabrics, buttons, hang tags, wash care labels, thread colors, packaging specs. Every item tracked.'
  }, {
    s: 'Specifications attached.',
    b: 'Cutting pattern reference, stitch types per seam, wash instructions - digitized and linked to the work order.'
  }, {
    s: 'Fabric and trims procured.',
    b: 'Auto-generated POs to fabric vendors and trim suppliers. Stock checked first across all 30+ locations, only shortfall procured.'
  }, {
    s: 'Materials received at logistics warehouse.',
    b: 'Fabric inspected for defects. System tracks by roll, not just total meters. Trims received against their POs.'
  }, {
    s: 'Issued to job worker.',
    b: 'Fabric + all secondary materials issued together. Every item tracked per work order, per job worker.'
  }, {
    s: 'Job worker produces.',
    b: 'Cutting, stitching, finishing. Job worker is hands. Specifications are Apex\u2019s.'
  }, {
    s: 'Finished goods returned.',
    b: 'Received at warehouse. System reconciles: fabric sent vs garments returned vs expected yield.'
  }, {
    s: 'Iron and packaging.',
    b: 'In-house. Each garment ironed, tagged, packed to buyer specs.'
  }, {
    s: 'QC at multiple gates.',
    b: 'Pre-dispatch quality check against buyer standards. Rejects sent back to job worker.'
  }, {
    s: 'Dispatch to brand.',
    b: 'Packed per buyer specs. System generates packing list, invoice, tracks partial shipments.'
  }, {
    s: 'Job worker settlement.',
    b: 'Auto-calculated: garments received minus rejects times piece rate. Per job worker, per work order.'
  }].map((step, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "flow-step"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, step.s), " ", step.b))))), /*#__PURE__*/React.createElement("section", {
    className: "case-section"
  }, /*#__PURE__*/React.createElement("h2", null, "Rules the system enforces"), /*#__PURE__*/React.createElement("ul", {
    className: "rules-list"
  }, /*#__PURE__*/React.createElement("li", null, "Can't issue fabric to a job worker without an active work order."), /*#__PURE__*/React.createElement("li", null, "Can't receive finished goods exceeding the work order quantity."), /*#__PURE__*/React.createElement("li", null, "Secondary materials must be fully issued before production starts."), /*#__PURE__*/React.createElement("li", null, "Job worker settlement blocked until all returns are reconciled."), /*#__PURE__*/React.createElement("li", null, "Fabric roll tracking: defective rolls quarantined, can't enter production."), /*#__PURE__*/React.createElement("li", null, "Brand-specific packaging specs enforced at dispatch - wrong label format blocks shipment."))), /*#__PURE__*/React.createElement("div", {
    className: "testimonial-block"
  }, /*#__PURE__*/React.createElement("blockquote", null, "\"When they said they'd deploy for free, I honestly thought it was overconfidence. Then I got a working demo in 24 hours - and it was 60-70% accurate to how we actually operate. That's when I knew these guys understood manufacturing. No other vendor we've worked with has shown me a working system before asking me to sign a check.\""), /*#__PURE__*/React.createElement("div", {
    className: "attr"
  }, "- Founder, Apex Apparel ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg3)',
      fontWeight: 400
    }
  }, "(name withheld for confidentiality)"))), /*#__PURE__*/React.createElement("div", {
    className: "case-bottom-line"
  }, /*#__PURE__*/React.createElement("div", {
    className: "big"
  }, "Two years and two failed ERPs - then live in 12 days. 30+ locations in one ledger. Three businesses, three clear P&Ls. $0 upfront."), /*#__PURE__*/React.createElement("p", null, "Two years and two failed ERPs. Then 12 days with SimpleGrid. Inventory visible across 20+ job worker facilities and 10+ logistics partner warehouses, all in one live ledger."), /*#__PURE__*/React.createElement("a", {
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
    href: "case-furniture-manufacturer.html",
    style: {
      color: 'var(--sg-blue)',
      fontWeight: 600,
      textDecoration: 'none'
    }
  }, "See a furniture manufacturer's deployment - live in 21 days \u2192"))))), /*#__PURE__*/React.createElement(FinalCTA, {
    title: "Want a result like Apex?",
    body: "We'll build a custom ERP modelled on how your floor actually runs, put it in your hands, and carry the risk for 30 days. You pay only once it's already running the business.",
    note: "Limited slots each quarter. We onboard selectively."
  }), showLogin && /*#__PURE__*/React.createElement(LoginModal, {
    onClose: () => setShowLogin(false)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(ApexCaseStudy, null));