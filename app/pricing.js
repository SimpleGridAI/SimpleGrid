const TIERS = [{
  name: 'Build + 30-day trial',
  sub: 'You carry no cost until you see it run',
  price: '$0',
  priceUnit: 'For the build. For the migration. For the 30 days on your real floor.',
  accent: 'var(--sg-blue)',
  features: ['We build a custom ERP modelled on your factory', 'Live in 7-21 days, at our cost and our risk', 'You run it on your real floor for 30 days', 'All your data migrated for you', 'If it doesn\'t move the business, you walk. No invoice.'],
  cta: 'Book a call',
  ctaHref: 'https://cal.com/simplegrid-ai',
  highlight: true
}, {
  name: 'After it works',
  sub: 'Monthly subscription · one number, all in',
  price: 'Custom-quoted',
  priceUnit: 'We are not free and we are not cheap. We are priced like an operator who has carried the build for you.',
  accent: 'var(--sg-purple)',
  features: ['One monthly subscription. That is the entire bill.', 'All features included. No tiers. No add-ons. No per-seat fees.', 'Every change to your ERP, now and forever, included.', 'New features ship regularly - yours automatically.', 'Direct line to the founding team. No account-manager middle layer.'],
  cta: 'Talk to the founder',
  ctaHref: 'https://cal.com/simplegrid-ai',
  highlight: false
}];
const COMPARE = [{
  metric: 'What they\'re built for',
  us: 'Mid-market manufacturers who don\'t want to be a software project',
  sap: 'F500 finance, multi-country tax, public-co close',
  netsuite: 'Mid-to-large multi-entity ops',
  qbe: 'Bookkeeping for small businesses'
}, {
  metric: 'Time to value',
  us: 'Live in 7-21 days',
  sap: '12-18 months',
  netsuite: '6-12 months',
  qbe: 'Same day for books - breaks as ops scale'
}, {
  metric: 'Up-front cost',
  us: '$0',
  sap: '$150K-$500K+',
  netsuite: '$25K-$100K implementation',
  qbe: '$1.7K/yr/user + add-ons'
}, {
  metric: 'Change-order fees',
  us: 'None. Ever.',
  sap: '$8K-$20K each',
  netsuite: '$200+/hr consultant',
  qbe: 'Per add-on / SuiteApp'
}, {
  metric: 'Built for the factory floor',
  us: 'Yes - same habit as texting',
  sap: 'Built for accountants',
  netsuite: 'Built for analysts',
  qbe: 'Built for bookkeepers'
}, {
  metric: 'Try-before-you-buy',
  us: '30 days on your real floor, real orders',
  sap: 'Sandbox demos',
  netsuite: 'Sandbox demos',
  qbe: 'Free tier'
}];
const INCLUDED = [{
  h: 'Modeling sessions',
  p: 'Two to three calls with our team to map every entity, state, rule, and exception that runs your factory.'
}, {
  h: 'Working demo in 24 hours',
  p: 'Not a slideshow. A live system reflecting how your operation actually runs.'
}, {
  h: 'Data migration',
  p: 'Your spreadsheets, your existing ERP exports, your group chats - we move what we can use.'
}, {
  h: 'Floor-staff training',
  p: 'Your team types what happened the way they would on WhatsApp. The training is the conversation.'
}, {
  h: 'Senior-led onboarding',
  p: 'Every deployment is led personally - not by a sales engineer or an account manager.'
}, {
  h: 'All future rule changes',
  p: 'New approval rule. New production stage. New QC gate. All configuration, not code. No change orders.'
}];
function PricingPage() {
  const [showLogin, setShowLogin] = React.useState(false);
  const [showInvite, setShowInvite] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    page: "pricing",
    onLoginClick: () => setShowLogin(true)
  }), /*#__PURE__*/React.createElement("main", { id: "main" }, /*#__PURE__*/React.createElement("section", {
    className: "section",
    style: {
      paddingBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "PRICING"), /*#__PURE__*/React.createElement("h1", {
    className: "h2",
    style: {
      maxWidth: 1200
    }
  }, "You carry nothing until you see it run."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: '100%'
    }
  }, "Every other ERP vendor charges you to find out if it works. We don't. SimpleGrid builds a custom ERP around your factory at our cost. You run it on your real floor for 30 days. If it doesn't move the business, you walk. We earn nothing."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: '100%',
      marginTop: 12,
      fontWeight: 600,
      color: 'var(--fg1)'
    }
  }, "We are not free. We are not cheap. We're priced like an operator who has carried the build for you - and earned the right to charge for what it does."))), /*#__PURE__*/React.createElement("section", {
    className: "section section-alt",
    style: {
      paddingTop: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "HOW IT'S PRICED"), /*#__PURE__*/React.createElement("h2", {
    className: "h2",
    style: {
      marginBottom: 8
    }
  }, "Try it on. Then pay."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 960,
      marginBottom: 36
    }
  }, "Two stages. The build and the 30-day trial are on us. After that, one monthly subscription covers everything - no tiers, no change fees, no per-seat math. Every new feature we ship is included."), /*#__PURE__*/React.createElement("div", {
    className: "tier-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 20,
      maxWidth: 880,
      margin: '0 auto'
    }
  }, TIERS.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderTop: `4px solid ${t.accent}`,
      borderRadius: 'var(--radius-lg)',
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      boxShadow: t.highlight ? '0 12px 32px rgba(74,123,247,0.12)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: t.accent,
      marginBottom: 4
    }
  }, t.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--fg3)'
    }
  }, t.sub)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 38,
      fontWeight: 700,
      color: 'var(--fg1)',
      letterSpacing: '-0.025em',
      lineHeight: 1
    }
  }, t.price), t.priceUnit && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)',
      marginTop: 6
    }
  }, t.priceUnit)), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: '4px 0 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      flex: 1
    }
  }, t.features.map((f, j) => /*#__PURE__*/React.createElement("li", {
    key: j,
    style: {
      display: 'flex',
      gap: 10,
      fontSize: 13.5,
      color: 'var(--fg2)',
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.accent,
      fontWeight: 700,
      flexShrink: 0
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("span", null, f)))), /*#__PURE__*/React.createElement("a", {
    href: t.ctaHref,
    target: "_blank",
    rel: "noopener noreferrer",
    className: 'btn btn-sm ' + (t.highlight ? 'btn-primary' : 'btn-secondary'),
    style: {
      justifyContent: 'center',
      marginTop: 'auto'
    }
  }, t.cta)))))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "WHAT THE BUILD COVERS"), /*#__PURE__*/React.createElement("h2", {
    className: "h2",
    style: {
      maxWidth: 760
    }
  }, "What we build for you before you owe us anything."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 960
    }
  }, "Everything below is part of the build and the 30-day trial. No add-ons. No professional-services line item. No \"implementation partner\" you also have to pay."), /*#__PURE__*/React.createElement("div", {
    className: "incl-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 18,
      marginTop: 32
    }
  }, INCLUDED.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '22px 22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--fg1)',
      marginBottom: 6,
      letterSpacing: '-0.005em'
    }
  }, it.h), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: 'var(--fg2)',
      lineHeight: 1.55
    }
  }, it.p)))))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "COMPARE - HONESTLY"), /*#__PURE__*/React.createElement("h2", {
    className: "h2",
    style: {
      maxWidth: 760
    }
  }, "When is SimpleGrid the right call?"), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 960
    }
  }, "SAP, Oracle NetSuite, Epicor and QuickBooks are excellent at what they were built for. SimpleGrid was built for a specific shape of customer: mid-market manufacturers who run differently from everyone, can't afford a 12-month rip-and-replace, and want to see the system run before they pay."), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto',
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "ba-table",
    style: {
      minWidth: 760
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      background: 'rgba(74,123,247,0.05)',
      color: 'var(--sg-blue)'
    }
  }, "Line item"), /*#__PURE__*/React.createElement("th", {
    style: {
      background: 'rgba(74,123,247,0.05)',
      color: 'var(--sg-blue)'
    }
  }, "SimpleGrid"), /*#__PURE__*/React.createElement("th", null, "SAP Business One"), /*#__PURE__*/React.createElement("th", null, "NetSuite"), /*#__PURE__*/React.createElement("th", null, "QuickBooks Enterprise"))), /*#__PURE__*/React.createElement("tbody", null, COMPARE.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 600,
      color: 'var(--fg1)'
    }
  }, r.metric), /*#__PURE__*/React.createElement("td", {
    style: {
      background: 'rgba(74,123,247,0.04)',
      color: 'var(--sg-blue)',
      fontWeight: 600
    }
  }, r.us), /*#__PURE__*/React.createElement("td", null, r.sap), /*#__PURE__*/React.createElement("td", null, r.netsuite), /*#__PURE__*/React.createElement("td", null, r.qbe)))))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)',
      marginTop: 14,
      fontStyle: 'italic'
    }
  }, "Competitor figures are ranges based on publicly available implementation data for mid-market manufacturers (200\u20131,500 employees). Your quote may differ."))), /*#__PURE__*/React.createElement("section", {
    className: "section section-alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "FAQ"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "Frequently asked questions about pricing."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 18,
      marginTop: 28
    },
    className: "pricing-faq-grid"
  }, [{
    q: 'How much does SimpleGrid cost after the 30 days?',
    a: 'We agree on a number together that fits the operation. After that, you pay one monthly subscription. That is the entire bill - no setup, no add-ons, no surprise line items, no per-seat fees.'
  }, {
    q: 'Is there a setup or build fee?',
    a: 'No. The build, the modeling sessions, the data migration, the senior-led onboarding and the 30 days running on your real floor are all on us. You owe nothing until you decide it works.'
  }, {
    q: 'Why aren\'t you cheap?',
    a: 'Because we carry the build, the deployment risk, and the 30-day trial - and senior engineers, deployment experts, and founder engagement on every project. Cheap ERP exists. It will not show up on day one with a working version of your factory. We will. We price for what that takes.'
  }, {
    q: 'What does "you walk if it doesn\'t work" actually mean?',
    a: 'At the end of 30 days you decide. If the system is being used daily by your floor staff and your dashboards match the floor, it works. If not, you walk. No invoice. No clawback. No data ransom - you get a clean export.'
  }, {
    q: 'Do you charge for changes to the ERP - today or tomorrow?',
    a: 'No. New approval rule, new production stage, new QC gate, new report, new integration - every change is included, at go-live and forever. Most ERPs charge $8K-$20K per change order. We never do.'
  }, {
    q: 'Are there feature tiers or add-on fees?',
    a: 'No. Every customer gets every feature. No Pro plan, no Enterprise tier, no per-feature licensing. When we ship something new, it is automatically yours.'
  }, {
    q: 'Why are you so selective about who you onboard?',
    a: 'Senior engineers, deployment experts, and founder engagement on every deployment. We have limited capacity each quarter. We only take on customers we know we can win for - because we only get paid when you succeed, and we don\'t want to set anyone up to lose.'
  }, {
    q: 'Do I get new features as you ship them?',
    a: 'Yes. We ship new products and features regularly, and they roll out to every customer at no extra cost. Your subscription includes everything we have built and everything we are about to build.'
  }].map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '22px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--fg1)',
      marginBottom: 8,
      letterSpacing: '-0.005em'
    }
  }, f.q), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: 'var(--fg2)',
      lineHeight: 1.6
    }
  }, f.a)))))), /*#__PURE__*/React.createElement("section", {
    className: "section section-dark final-cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "You carry nothing until you see it run."), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "Custom ERP, built at our risk. Paid for after it works. Founder-led onboarding, limited capacity each quarter."), /*#__PURE__*/React.createElement("a", {
    href: "https://cal.com/simplegrid-ai",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn btn-lg btn-primary"
  }, "Book a call")))), /*#__PURE__*/React.createElement(Footer, null), showLogin && /*#__PURE__*/React.createElement(LoginModal, {
    onClose: () => setShowLogin(false)
  }), showInvite && /*#__PURE__*/React.createElement(InviteModal, {
    onClose: () => setShowInvite(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "mobile-cta"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowInvite(true),
    className: "btn btn-invite"
  }, "Request an invite")), /*#__PURE__*/React.createElement("style", null, `
      @media (max-width: 900px) {
        .tier-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
        .incl-grid { grid-template-columns: 1fr 1fr !important; }
        .pricing-faq-grid { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 560px) {
        .incl-grid { grid-template-columns: 1fr !important; }
      }
    `));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(PricingPage, null));