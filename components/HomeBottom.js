function ApparelVisual() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #0E0E10 0%, #181f2e 60%, #1A2540 100%)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 400 220",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
    id: "apxWeave",
    width: "6",
    height: "6",
    patternUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 3 H6 M3 0 V6",
    stroke: "rgba(255,255,255,0.04)",
    strokeWidth: "0.6"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "apxThread",
    x1: "0",
    x2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#4A7BF7",
    stopOpacity: "0"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.5",
    stopColor: "#4A7BF7"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#4A7BF7",
    stopOpacity: "0"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "apxFabric",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#4A7BF7",
    stopOpacity: "0.45"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#4A7BF7",
    stopOpacity: "0.05"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "apxFabric2",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#F59E0B",
    stopOpacity: "0.4"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#F59E0B",
    stopOpacity: "0.05"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "apxFabric3",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#A78BFA",
    stopOpacity: "0.4"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#A78BFA",
    stopOpacity: "0.05"
  })), /*#__PURE__*/React.createElement("clipPath", {
    id: "shirtClip"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 0 L 14 -12 L 26 -16 L 28 -10 L 38 -16 L 50 -12 L 64 0 L 56 8 L 50 4 L 50 36 L 14 36 L 14 4 L 8 8 Z"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "400",
    height: "220",
    fill: "url(#apxWeave)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "36",
    x2: "400",
    y2: "36",
    stroke: "url(#apxThread)",
    strokeWidth: "1",
    strokeDasharray: "4 4"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "stroke-dashoffset",
    from: "0",
    to: "-16",
    dur: "1.2s",
    repeatCount: "indefinite"
  })), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "184",
    x2: "400",
    y2: "184",
    stroke: "url(#apxThread)",
    strokeWidth: "1",
    strokeDasharray: "4 4"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "stroke-dashoffset",
    from: "0",
    to: "16",
    dur: "1.6s",
    repeatCount: "indefinite"
  })), /*#__PURE__*/React.createElement("g", {
    transform: "translate(28, 76)"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "56",
    height: "68",
    rx: "3",
    fill: "url(#apxFabric)",
    stroke: "rgba(74,123,247,0.4)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "14",
    x2: "56",
    y2: "14",
    stroke: "rgba(74,123,247,0.3)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "28",
    x2: "56",
    y2: "28",
    stroke: "rgba(74,123,247,0.3)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "42",
    x2: "56",
    y2: "42",
    stroke: "rgba(74,123,247,0.3)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "56",
    x2: "56",
    y2: "56",
    stroke: "rgba(74,123,247,0.3)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "28",
    y: "82",
    textAnchor: "middle",
    fontSize: "7",
    fill: "rgba(255,255,255,0.4)",
    fontWeight: "700",
    letterSpacing: "0.1em"
  }, "FABRIC")), /*#__PURE__*/React.createElement("g", {
    transform: "translate(92, 86)"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "48",
    height: "58",
    rx: "3",
    fill: "url(#apxFabric2)",
    stroke: "rgba(245,158,11,0.4)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "12",
    x2: "48",
    y2: "12",
    stroke: "rgba(245,158,11,0.3)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "24",
    x2: "48",
    y2: "24",
    stroke: "rgba(245,158,11,0.3)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "36",
    x2: "48",
    y2: "36",
    stroke: "rgba(245,158,11,0.3)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "48",
    x2: "48",
    y2: "48",
    stroke: "rgba(245,158,11,0.3)"
  })), /*#__PURE__*/React.createElement("g", {
    transform: "translate(148, 96)"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "40",
    height: "48",
    rx: "3",
    fill: "url(#apxFabric3)",
    stroke: "rgba(167,139,250,0.4)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "10",
    x2: "40",
    y2: "10",
    stroke: "rgba(167,139,250,0.3)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "20",
    x2: "40",
    y2: "20",
    stroke: "rgba(167,139,250,0.3)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "30",
    x2: "40",
    y2: "30",
    stroke: "rgba(167,139,250,0.3)"
  })), /*#__PURE__*/React.createElement("g", {
    stroke: "#4A7BF7",
    strokeWidth: "0.8",
    fill: "none",
    opacity: "0.45"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 188 110 Q 230 90 270 78",
    strokeDasharray: "3 3"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "stroke-dashoffset",
    from: "0",
    to: "-12",
    dur: "1.5s",
    repeatCount: "indefinite"
  })), /*#__PURE__*/React.createElement("path", {
    d: "M 188 120 Q 240 130 290 130",
    strokeDasharray: "3 3"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "stroke-dashoffset",
    from: "0",
    to: "-12",
    dur: "1.8s",
    repeatCount: "indefinite"
  })), /*#__PURE__*/React.createElement("path", {
    d: "M 188 130 Q 250 160 300 178",
    strokeDasharray: "3 3"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "stroke-dashoffset",
    from: "0",
    to: "-12",
    dur: "1.4s",
    repeatCount: "indefinite"
  }))), [{
    x: 264,
    y: 60,
    color: '#4A7BF7',
    label: 'CMT'
  }, {
    x: 286,
    y: 116,
    color: '#F59E0B',
    label: 'BRAND'
  }, {
    x: 296,
    y: 162,
    color: '#A78BFA',
    label: 'TRADE'
  }].map((s, i) => /*#__PURE__*/React.createElement("g", {
    key: i,
    transform: `translate(${s.x}, ${s.y})`
  }, /*#__PURE__*/React.createElement("line", {
    x1: "32",
    y1: "-4",
    x2: "32",
    y2: "-12",
    stroke: "rgba(255,255,255,0.4)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "-14",
    r: "2",
    fill: "none",
    stroke: "rgba(255,255,255,0.4)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M 0 0 L 14 -12 L 26 -16 L 28 -10 L 38 -16 L 50 -12 L 64 0 L 56 8 L 50 4 L 50 36 L 14 36 L 14 4 L 8 8 Z",
    fill: s.color,
    fillOpacity: "0.75",
    stroke: s.color,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 22 -10 Q 32 -6 42 -10",
    fill: "none",
    stroke: "rgba(255,255,255,0.5)",
    strokeWidth: "0.8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "32",
    y1: "-4",
    x2: "32",
    y2: "32",
    stroke: "rgba(255,255,255,0.35)",
    strokeWidth: "0.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "6",
    r: "0.8",
    fill: "rgba(255,255,255,0.6)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "14",
    r: "0.8",
    fill: "rgba(255,255,255,0.6)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "22",
    r: "0.8",
    fill: "rgba(255,255,255,0.6)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "32",
    y: "52",
    textAnchor: "middle",
    fontSize: "6",
    fill: "rgba(255,255,255,0.55)",
    fontWeight: "700",
    letterSpacing: "0.12em"
  }, s.label)))), /*#__PURE__*/React.createElement("g", {
    transform: "translate(20, 18)"
  }, /*#__PURE__*/React.createElement("text", {
    fontSize: "9",
    fontWeight: "700",
    letterSpacing: "0.16em",
    fill: "rgba(255,255,255,0.55)"
  }, "APPAREL MANUFACTURING \xB7 CONFIDENTIAL")), /*#__PURE__*/React.createElement("g", {
    transform: "translate(0, 200)"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "400",
    height: "20",
    fill: "rgba(0,0,0,0.4)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "20",
    y: "13",
    fontSize: "10",
    fontWeight: "700",
    fill: "#fff"
  }, "80\u2013100k", /*#__PURE__*/React.createElement("tspan", {
    fill: "rgba(255,255,255,0.5)",
    fontWeight: "400"
  }, " shirts/mo")), /*#__PURE__*/React.createElement("text", {
    x: "140",
    y: "13",
    fontSize: "10",
    fontWeight: "700",
    fill: "#fff"
  }, "30+", /*#__PURE__*/React.createElement("tspan", {
    fill: "rgba(255,255,255,0.5)",
    fontWeight: "400"
  }, " locations")), /*#__PURE__*/React.createElement("text", {
    x: "240",
    y: "13",
    fontSize: "10",
    fontWeight: "700",
    fill: "#fff"
  }, "3", /*#__PURE__*/React.createElement("tspan", {
    fill: "rgba(255,255,255,0.5)",
    fontWeight: "400"
  }, " streams")), /*#__PURE__*/React.createElement("text", {
    x: "320",
    y: "13",
    fontSize: "10",
    fontWeight: "700",
    fill: "#fff"
  }, "20+", /*#__PURE__*/React.createElement("tspan", {
    fill: "rgba(255,255,255,0.5)",
    fontWeight: "400"
  }, " job workers")))));
}
window.ApparelVisual = ApparelVisual;
function FounderStory() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-alt",
    id: "founder"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "founder-text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "BUILT BY AN OPERATOR WHO'S BEEN ON YOUR FLOOR"), /*#__PURE__*/React.createElement("blockquote", null, "Built a $30M manufacturing business. Survived two ERP failures. Ended up on Google Sheets."), /*#__PURE__*/React.createElement("p", {
    className: "body"
  }, "SimpleGrid exists because we were the customer first - multiple factories, 400-person workforce. We bought the same enterprise systems you're being pitched today. We watched them fail. We know exactly what breaks when the system can't keep up with the floor."), /*#__PURE__*/React.createElement("p", {
    className: "body"
  }, "That's why we built SimpleGrid the only way that makes sense to an operator: model it on your factory, run it on your real floor for 30 days, and only charge when it earns its keep."), /*#__PURE__*/React.createElement("p", {
    className: "body"
  }, "Senior engineers and a founder are on every deployment. No sales reps. No SDRs. No chatbot. You deal with the people who'll actually build your system."), /*#__PURE__*/React.createElement("p", {
    className: "body",
    style: { marginTop: 18 }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.linkedin.com/company/simplegridai",
    target: "_blank",
    rel: "noopener noreferrer",
    "data-cta": "founder_linkedin",
    style: { color: 'var(--sg-blue)', fontWeight: 600, textDecoration: 'none' }
  }, "See the team on LinkedIn →"))))));
}
window.FounderStory = FounderStory;
function ProofSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      textAlign: 'center'
    }
  }, "CASE STUDIES"), /*#__PURE__*/React.createElement("h2", {
    className: "h2",
    style: {
      textAlign: 'center'
    }
  }, "Manufacturers running on SimpleGrid today."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 920,
      margin: '0 auto 40px',
      textAlign: 'center'
    }
  }, "Two public deployments below. More running confidentially - names available on request.")), /*#__PURE__*/React.createElement("div", {
    className: "proof-grid"
  }, [{
    kind: 'image',
    img: 'url(assets/elite-factory.jpeg) center/cover',
    name: 'Furniture Manufacturer & Exporter',
    desc: '12+ countries (NA, Europe, Asia). 600–800 employees. ~1 million sq ft. Excel + group chats → live ERP.',
    stats: '64 tracked · 72 triggers · 21 days',
    quote: '"SimpleGrid feels like our system. My stores manager was comfortable on day one."',
    attr: '- The founder',
    link: 'case-furniture-manufacturer.html',
    anchor: 'How they deployed in 21 days'
  }, {
    kind: 'apparel',
    name: 'Apparel Contract Manufacturer',
    desc: 'Apparel manufacturer · 80–100k shirts/mo. 3 streams. 20+ job workers. 30+ inventory locations. Live in 12 days.',
    stats: '34 tracked · 44 triggers · 12 days',
    quote: '"Working demo in 24 hours - 60–70% accurate. No vendor we\'ve worked with has done that."',
    attr: '- Founder (reference available on request)',
    link: 'case-apex.html',
    anchor: 'How they went live in 12 days'
  }].map((c, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 150
  }, /*#__PURE__*/React.createElement("a", {
    href: c.link,
    className: "proof-card",
    style: {
      height: '100%',
      display: 'block',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'all 160ms var(--ease-standard)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = '';
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "proof-img",
    style: c.kind === 'image' ? {
      background: c.img,
      height: 220,
      position: 'relative'
    } : {
      height: 220,
      padding: 0,
      overflow: 'hidden'
    }
  }, c.kind === 'image' && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 10,
      left: 10,
      background: 'rgba(0,0,0,0.65)',
      color: '#fff',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      padding: '4px 8px',
      borderRadius: 4,
      backdropFilter: 'blur(4px)'
    }
  }, "\u25CF Actual shot"), c.kind === 'apparel' && /*#__PURE__*/React.createElement(ApparelVisual, null)), /*#__PURE__*/React.createElement("div", {
    className: "proof-body"
  }, /*#__PURE__*/React.createElement("h3", null, c.name), /*#__PURE__*/React.createElement("p", null, c.desc), /*#__PURE__*/React.createElement("div", {
    className: "proof-stats"
  }, c.stats), /*#__PURE__*/React.createElement("div", {
    className: "proof-quote"
  }, c.quote, /*#__PURE__*/React.createElement("div", {
    className: "proof-attr"
  }, c.attr)), /*#__PURE__*/React.createElement("span", {
    className: "btn btn-ghost btn-sm",
    style: {
      paddingLeft: 0,
      color: 'var(--sg-blue)',
      fontWeight: 600,
      pointerEvents: 'none'
    }
  }, c.anchor, " \u2192")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "case-studies.html",
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--sg-blue)',
      textDecoration: 'none'
    }
  }, "See both deployments side by side \u2192"))));
}
window.ProofSection = ProofSection;
function Integrations() {
  const items = [
    { name: 'Gmail', status: 'live', svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/></svg>' },
    { name: 'QuickBooks', status: 'live', svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#2CA01C"/><path d="M7.5 8a2 2 0 00-2 2v4a2 2 0 002 2h1V8h-1zm3-1v10h1a4 4 0 004-4v-2a4 4 0 00-4-4h-1zm2 2.5a1.5 1.5 0 011.5 1.5v2a1.5 1.5 0 01-1.5 1.5V9.5z" fill="#fff"/></svg>' },
    { name: 'Excel', status: 'live', svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#107C41"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="11">XL</text></svg>' },
    { name: 'Google Sheets', status: 'live', svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" fill="#0F9D58"/></svg>' },
    { name: 'Shopify', status: 'live', svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#96BF48"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="11">S</text></svg>' },
    { name: 'ShipStation', status: 'live', svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#0099FF"/><path d="M6 9 L12 6.5 L18 9 L18 15.5 L12 18 L6 15.5 Z" fill="none" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>' },
    { name: 'Outlook', status: 'request', svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#0078D4"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="13">O</text></svg>' },
    { name: 'Tally', status: 'request', svg: '<svg viewBox="0 0 40 40" width="24" height="24" aria-hidden="true"><rect width="40" height="40" rx="6" fill="#263238"/><text x="20" y="26" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="16">T</text></svg>' },
    { name: 'Xero', status: 'request', svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#13B5EA"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="13">X</text></svg>' },
    { name: 'Stripe', status: 'request', svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#635BFF"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="13">S</text></svg>' },
    { name: 'Zoho', status: 'request', svg: '<svg viewBox="0 0 40 40" width="24" height="24" aria-hidden="true"><rect width="40" height="40" rx="6" fill="#D0312D"/><text x="20" y="26" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="12">ZOHO</text></svg>' },
    { name: 'WooCommerce', status: 'request', svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#7F54B3"/><text x="12" y="15" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="9">WC</text></svg>' },
    { name: 'Mailchimp', status: 'request', svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#FFE01B"/><text x="12" y="16" text-anchor="middle" fill="#241C15" font-family="sans-serif" font-weight="700" font-size="13">M</text></svg>' },
    { name: 'Klaviyo', status: 'request', svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#000"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="13">K</text></svg>' },
    { name: 'PostgreSQL', status: 'live', svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#336791"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="10">Pg</text></svg>' },
    { name: 'Amazon', status: 'request', svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#232F3E"/><text x="12" y="14" text-anchor="middle" fill="#FF9900" font-family="sans-serif" font-weight="700" font-size="11">a</text></svg>' },
    { name: 'Braze', status: 'request', svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#FE5832"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="13">B</text></svg>' },
    { name: 'Bill.com', status: 'request', svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#006FFF"/><text x="12" y="15" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="9">BILL</text></svg>' },
    { name: 'TikTok Shop', status: 'request', svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#000"/><text x="12" y="16" text-anchor="middle" fill="#FE2C55" font-family="sans-serif" font-weight="700" font-size="11">TT</text></svg>' },
    { name: 'SFTP', status: 'live', svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#4A5568"/><text x="12" y="15" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="9">SFTP</text></svg>' },
    { name: '+ Build custom', status: 'custom', custom: true, svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="none" stroke="#4A7BF7" stroke-width="1.5" stroke-dasharray="3 2"/><line x1="12" y1="7" x2="12" y2="17" stroke="#4A7BF7" stroke-width="2" stroke-linecap="round"/><line x1="7" y1="12" x2="17" y2="12" stroke="#4A7BF7" stroke-width="2" stroke-linecap="round"/></svg>' }
  ];
  // Duplicate the list so the loop is seamless when the track translates by -50%.
  const doubled = [...items, ...items];
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "integrations"
  }, /*#__PURE__*/React.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: `
        .int-marquee{overflow:hidden;padding:6px 0;mask-image:linear-gradient(90deg,transparent 0%,black 6%,black 94%,transparent 100%);-webkit-mask-image:linear-gradient(90deg,transparent 0%,black 6%,black 94%,transparent 100%);margin-top:24px}
        .int-track{display:flex;gap:14px;width:max-content;animation:int-roll 38s linear infinite}
        .int-marquee:hover .int-track,.int-marquee:focus-within .int-track{animation-play-state:paused}
        .int-marquee .int-card{flex:0 0 150px;position:relative}
        .int-marquee .int-card-custom{border:1px dashed var(--sg-blue);background:rgba(74,123,247,0.04)}
        .int-marquee .int-card-custom .int-name{color:var(--sg-blue)}
        .int-badge{position:absolute;top:6px;right:6px;font-size:9px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:2px 6px;border-radius:999px;line-height:1.2}
        .int-badge-live{background:rgba(16,185,129,0.12);color:#0f8f6a}
        .int-badge-request{background:rgba(156,163,175,0.16);color:#5a6373}
        @keyframes int-roll{from{transform:translateX(0)}to{transform:translateX(calc(-50% - 7px))}}
        @media(prefers-reduced-motion:reduce){.int-track{animation:none}}
        .int-legend{display:flex;justify-content:center;gap:18px;flex-wrap:wrap;font-size:12px;color:var(--fg2);margin-top:14px}
        .int-legend-dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;vertical-align:1px}
      `
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "INTEGRATIONS"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "Works with what you already use."), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Live integrations are deployed today. \"On request\" means we have the spec and will build it as part of your custom ERP - included in the build cost, not an upgrade."),
    /*#__PURE__*/React.createElement("div", { className: "int-legend", "aria-label": "Integration status legend" },
      /*#__PURE__*/React.createElement("span", null,
        /*#__PURE__*/React.createElement("span", { className: "int-legend-dot", style: { background: '#0f8f6a' } }),
        "Live today"
      ),
      /*#__PURE__*/React.createElement("span", null,
        /*#__PURE__*/React.createElement("span", { className: "int-legend-dot", style: { background: '#9CA3AF' } }),
        "Built on request, included in your build"
      )
    )
  )), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("div", {
    className: "int-marquee"
  }, /*#__PURE__*/React.createElement("div", {
    className: "int-track"
  }, doubled.map((ig, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: 'int-card' + (ig.custom ? ' int-card-custom' : ''),
    "aria-hidden": i >= items.length ? 'true' : undefined,
    title: ig.status === 'live' ? 'Live today' : (ig.status === 'request' ? 'Built on request' : '')
  },
    ig.status === 'live' && /*#__PURE__*/React.createElement("span", { className: "int-badge int-badge-live" }, "Live"),
    ig.status === 'request' && /*#__PURE__*/React.createElement("span", { className: "int-badge int-badge-request" }, "Request"),
    /*#__PURE__*/React.createElement("div", { className: "int-icon", dangerouslySetInnerHTML: { __html: ig.svg } }),
    /*#__PURE__*/React.createElement("div", { className: "int-name" }, ig.name)
  ))))), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 24,
      fontSize: 13,
      color: 'var(--fg2)',
      lineHeight: 1.6,
      maxWidth: 560,
      margin: '24px auto 0'
    }
  }, "Don't see yours? Email ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:hello@simplegrid.ai?subject=Integration%20request%20%E2%80%94%20SimpleGrid&body=Hi%20SimpleGrid%2C%0D%0A%0D%0AWe%27d%20like%20SimpleGrid%20to%20integrate%20with%3A%20%5Btool%20name%5D%0D%0A%0D%0ABrief%20note%20on%20what%20we%20need%3A%0D%0A%5BWhat%20it%20syncs%2C%20how%20often%2C%20any%20auth%20notes%5D%0D%0A%0D%0AThanks%21",
    style: {
      color: 'var(--sg-blue)',
      fontWeight: 600,
      textDecoration: 'underline'
    }
  }, "hello@simplegrid.ai"), " with a brief note on what you need - we'll add it.")));
}
window.Integrations = Integrations;
function DataSecurity() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-alt",
    id: "security"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "DATA SECURITY"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "Your data stays yours.")), /*#__PURE__*/React.createElement("div", {
    className: "sec-grid"
  }, [{
    badge: 'ARCHITECTURE',
    color: 'var(--sg-purple)',
    t: 'Multi-tenant isolation',
    p: 'Every client gets their own database. Shared platform, completely separate data. Like an apartment building - shared infrastructure, your own lock, your own walls. No client can ever see another\'s data.'
  }, {
    badge: 'ON THE ROADMAP',
    color: 'var(--sg-blue)',
    t: 'SOC 2 Type II audit · Q3 2026',
    p: 'Independent auditors verifying our security controls, data handling, and availability. Engagement letter signed; report expected in Q3 2026. Ask us for a copy of our current security questionnaire today.'
  }, {
    badge: 'IN PLACE',
    color: 'var(--sg-green)',
    t: 'Encryption + data export',
    p: 'AES-256 at rest, TLS 1.3 in transit. You control what\'s stored. Full export of your data on request - no clawback, no data ransom.'
  }].map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-card",
    style: {
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-badge",
    style: {
      color: s.color
    }
  }, s.badge), /*#__PURE__*/React.createElement("h3", null, s.t), /*#__PURE__*/React.createElement("p", null, s.p)))))));
}
window.DataSecurity = DataSecurity;
function Architecture() {
  const cols = [{
    t: 'One permanent record',
    b: 'Every action recorded once. Can never be changed. Your audit trail isn\'t a feature - it\'s how the system is built.'
  }, {
    t: 'Configuration, not code',
    b: 'AI writes a configuration. Platform reads it and generates forms, workflows, rules, dashboards. Change config, system changes instantly.'
  }, {
    t: 'Every rule is a row',
    b: 'Approval above $10K? One row. QC before dispatch? One row. No code. No deployment cycle.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-dark"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      color: 'rgba(255,255,255,0.4)'
    }
  }, "WHY WE CAN BUILD CUSTOM IN DAYS"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "The architecture that lets us carry the risk.")), /*#__PURE__*/React.createElement("div", {
    className: "arch-grid",
    style: {
      marginTop: 28
    }
  }, cols.map((c, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "arch-col"
  }, /*#__PURE__*/React.createElement("h3", null, c.t), /*#__PURE__*/React.createElement("p", null, c.b)))))));
}
window.Architecture = Architecture;
function ComparisonTable() {
  const rows = [{
    label: 'Built for',
    sap: 'F500 finance, multi-country tax, public-co close',
    epicor: 'Discrete manufacturers with mature IT teams',
    qb: 'Small businesses that need bookkeeping',
    sg: 'Mid-market manufacturers who don\'t want to be a software project'
  }, {
    label: 'What they do well',
    sap: 'Deep finance, global compliance, scale to billions',
    epicor: 'Strong shop-floor MRP, mature manufacturing modules',
    qb: 'Easy accounting, every accountant knows it',
    sg: 'Model your factory, ship in days, prove value before you pay'
  }, {
    label: 'Time to value',
    sap: '12–18+ months',
    epicor: '9–12 months',
    qb: 'Same day for books - but breaks as you scale ops',
    sg: 'Live in 7–21 days on your real data'
  }, {
    label: 'Up-front cost',
    sap: '$500K+',
    epicor: '$150K–$300K',
    qb: 'Low monthly fee',
    sg: '$0. You pay only after it works.'
  }, {
    label: 'Change a workflow',
    sap: 'Consulting engagement',
    epicor: 'Dev sprint',
    qb: 'Build it in spreadsheets outside the system',
    sg: 'Configure live, often on the same call'
  }, {
    label: 'Floor-staff UX',
    sap: 'Built for accountants and analysts',
    epicor: 'Built for planners and IT',
    qb: 'Built for bookkeepers',
    sg: 'Built for the warehouse manager - plain English, same habit as texting'
  }, {
    label: 'Try before paying',
    sap: 'Sandbox demos',
    epicor: 'Sandbox demos',
    qb: 'Free tier',
    sg: '30 days running on your real floor, your real orders'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "COMPARE - HONESTLY"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "When is SimpleGrid the right call?"), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: { maxWidth: 780 }
  }, "SAP, Oracle NetSuite, Epicor and QuickBooks are excellent at what they were built for. SimpleGrid was built for a specific shape of customer: mid-market manufacturers who run differently from everyone, can't afford a 12-month rip-and-replace, and want to see the system run before they pay.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "compare-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null), /*#__PURE__*/React.createElement("th", null, "SAP / Oracle NetSuite"), /*#__PURE__*/React.createElement("th", null, "Epicor / Plex"), /*#__PURE__*/React.createElement("th", null, "QuickBooks + Excel"), /*#__PURE__*/React.createElement("th", null, "SimpleGrid"))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 600,
      color: 'var(--fg1)'
    }
  }, r.label), /*#__PURE__*/React.createElement("td", null, r.sap), /*#__PURE__*/React.createElement("td", null, r.epicor), /*#__PURE__*/React.createElement("td", null, r.qb), /*#__PURE__*/React.createElement("td", null, r.sg)))))))));
}
window.ComparisonTable = ComparisonTable;
function FromTheField() {
  const posts = [
    { slug: 'why-your-erp-vendor-charges-you-for-every-change-and-how-to-stop-paying', cat: 'OPERATOR ECONOMICS', title: "Why your ERP vendor charges you for every change - and how to stop paying.", desc: "Most ERPs price post-launch changes at $8K-$20K per change order. Here's the architecture trick that lets us include every change, forever, in one subscription." },
    { slug: 'why-mid-market-manufacturers-are-the-most-underserved-businesses-in-enterprise-software', cat: 'MARKET', title: "Why mid-market manufacturers are the most underserved businesses in enterprise software.", desc: "QuickBooks is too small. NetSuite is too big. Why the $6M-$180M factory has been stuck between two bad options for 20 years - and what changed." },
    { slug: 'event-sourcing-why-simplegrid-stores-everything-that-ever-happened', cat: 'ARCHITECTURE', title: "Event sourcing: why SimpleGrid stores every action forever.", desc: "Your audit trail isn't a feature we turned on. It's how the system is built - every event is permanent, the current state is just a query." }
  ];
  return React.createElement('section', { className: 'section', id: 'from-the-field', 'aria-label': 'From the field' },
    React.createElement('div', { className: 'container' },
      React.createElement(Reveal, null,
        React.createElement('div', { className: 'tag', style: { textAlign: 'center' } }, 'FROM THE FIELD'),
        React.createElement('h2', { className: 'h2', style: { textAlign: 'center' } }, 'Field notes from operators building a custom ERP.')
      ),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginTop: 32 } },
        posts.map(function (p, i) {
          return React.createElement(Reveal, { key: p.slug, delay: i * 80 },
            React.createElement('a', {
              href: 'blog/' + p.slug + '/',
              'data-cta': 'from_the_field_' + i,
              style: { display: 'block', textDecoration: 'none', color: 'inherit', padding: '24px', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', background: '#fff', height: '100%', transition: 'all 160ms var(--ease-standard)' },
              onMouseEnter: function (e) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.06)'; },
              onMouseLeave: function (e) { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }
            },
              React.createElement('div', { style: { fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--sg-blue)', marginBottom: 10 } }, p.cat),
              React.createElement('h3', { style: { fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 700, color: 'var(--fg1)', margin: '0 0 10px', lineHeight: 1.3, letterSpacing: '-0.005em' } }, p.title),
              React.createElement('p', { style: { fontSize: 14, color: 'var(--fg2)', lineHeight: 1.55, margin: 0 } }, p.desc),
              React.createElement('span', { style: { display: 'inline-block', marginTop: 14, fontSize: 13, fontWeight: 600, color: 'var(--sg-blue)' } }, 'Read →')
            )
          );
        })
      ),
      React.createElement('div', { style: { textAlign: 'center', marginTop: 28 } },
        React.createElement('a', { href: 'blog.html', style: { fontSize: 14, fontWeight: 600, color: 'var(--sg-blue)', textDecoration: 'none' } }, 'See all 17 field notes →')
      )
    )
  );
}
window.FromTheField = FromTheField;

function HomeFAQ() {
  const items = [{
    q: "What happens if it doesn't work after 30 days?",
    a: "You walk. No invoice. No clawback. We've still done the migration and the build at our cost. You get a clean data export and your spreadsheets back. That's the whole point - the risk lives with us until you've seen it run on your real floor."
  }, {
    q: "How much does it cost after the 30-day trial?",
    a: "Before you decide, we agree on a number together based on the size of your operation. After that, you pay one monthly subscription. That is the entire bill - no setup, no add-ons, no surprise line items, no per-seat fees. We are not free and not cheap. We are priced like an operator who has carried the build for you."
  }, {
    q: "Who runs the deployment - sales reps, or actual engineers?",
    a: "Senior engineers and a founder. No SDRs, no sales reps, no chatbot, no offshored implementation partner you also have to pay. You deal with the people who'll actually build your system."
  }, {
    q: "What's the catch?",
    a: "We onboard selectively each quarter because we can only succeed when our customers succeed. If we don't think we can win for you, we'll say so on the call. That's the catch."
  }];
  const [open, setOpen] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-alt",
    id: "home-faq",
    "aria-label": "Frequently asked questions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: { maxWidth: 880 }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: { textAlign: 'center' }
  }, "BEFORE YOU DECIDE"), /*#__PURE__*/React.createElement("h2", {
    className: "h2",
    style: { textAlign: 'center' }
  }, "Four questions every buyer asks us.")), /*#__PURE__*/React.createElement("div", {
    style: { marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }
  }, items.map(function (it, i) {
    return /*#__PURE__*/React.createElement(Reveal, { key: i, delay: i * 80 },
      /*#__PURE__*/React.createElement("div", {
        style: { background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }
      },
      /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: function () { setOpen(open === i ? -1 : i); },
        "aria-expanded": open === i,
        "aria-controls": "home-faq-" + i,
        style: { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '18px 22px', background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit', textAlign: 'left' }
      },
        /*#__PURE__*/React.createElement("span", {
          style: { fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 700, color: 'var(--fg1)', letterSpacing: '-0.005em' }
        }, it.q),
        /*#__PURE__*/React.createElement("span", {
          "aria-hidden": "true",
          style: { flexShrink: 0, color: 'var(--sg-blue)', fontSize: 22, fontWeight: 300, transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform 180ms ease' }
        }, "+")
      ),
      open === i && /*#__PURE__*/React.createElement("div", {
        id: "home-faq-" + i,
        style: { padding: '0 22px 18px', fontSize: 15, lineHeight: 1.65, color: 'var(--fg2)' }
      }, it.a))
    );
  }))));
}
window.HomeFAQ = HomeFAQ;
function FinalCTA() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-dark final-cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "Try it on. Then decide."), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "We build a custom ERP around your factory at our cost. You run it on your real floor for 30 days. If it doesn't move the business, you walk. We earn nothing."), /*#__PURE__*/React.createElement("a", {
    href: "https://cal.com/simplegrid-ai",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn btn-lg btn-primary"
  }, "Book a call with the founder"), /*#__PURE__*/React.createElement("p", {
    className: "note"
  }, "Founder-led. Limited slots each quarter. We onboard selectively - only when we know we can win for you."))));
}
window.FinalCTA = FinalCTA;