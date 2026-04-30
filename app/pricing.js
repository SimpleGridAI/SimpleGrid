const TIERS = [{
  name: 'Free trial',
  sub: '30 days · no commitment',
  price: '$0',
  priceUnit: '',
  accent: 'var(--sg-blue)',
  features: ['7-day deployment, at our cost', 'Founder-led onboarding', 'All your data migrated for you', 'Unlimited floor users', 'Walk away anytime in 30 days'],
  cta: 'Book a Call',
  ctaHref: 'https://cal.com/simplegrid-ai',
  highlight: true
}, {
  name: 'Operating',
  sub: 'after the trial · monthly subscription',
  price: 'Contact us',
  priceUnit: 'Custom-quoted because every operation is different - but it\'s one number, included.',
  accent: 'var(--sg-purple)',
  features: ['One monthly subscription. That is the whole bill.', 'All features included. No tiers, no add-ons.', 'Every change to your ERP, now and forever, included.', 'New features ship regularly and are yours automatically.', 'Founder still answers your call.'],
  cta: 'Talk to sales',
  ctaHref: 'https://cal.com/simplegrid-ai',
  highlight: false
}];
const COMPARE = [{
  metric: 'Deployment time',
  us: '7 days',
  sap: '12-18 months',
  netsuite: '6-12 months',
  qbe: 'Days (accounting only)'
}, {
  metric: 'Upfront cost',
  us: '$0',
  sap: '$150K-$500K+',
  netsuite: '$25K-$100K implementation',
  qbe: '$1.7K/yr/user + add-ons'
}, {
  metric: 'Change order fees',
  us: 'No',
  sap: '$8K-$20K each',
  netsuite: '$200+/hr consultant',
  qbe: 'Per add-on / SuiteApp'
}, {
  metric: 'Built for the factory floor',
  us: 'Yes',
  sap: 'Generic',
  netsuite: 'Generic',
  qbe: 'Accounting-first'
}, {
  metric: 'Walk-away clause',
  us: '30 days, no clawback',
  sap: 'Bound by SOW',
  netsuite: 'Annual contract, no refund',
  qbe: 'Subscription locked'
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
  h: 'Founder-led onboarding',
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
  }), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
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
  }, "ERP pricing built for manufacturers, not for vendors."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: '100%'
    }
  }, "Every other ERP vendor charges you to find out if it works. We don't. SimpleGrid deploys at our cost. You see your factory running on it for 30 days. If it doesn't fit, you walk away - and we lose, not you."))), /*#__PURE__*/React.createElement("section", {
    className: "section section-alt",
    style: {
      paddingTop: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "PLANS"), /*#__PURE__*/React.createElement("h2", {
    className: "h2",
    style: {
      marginBottom: 8
    }
  }, "$0 to start. 30 days to decide. Pay only if it works."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 960,
      marginBottom: 36
    }
  }, "Two plans. After the trial, one monthly subscription covers everything. No tiers. No change fees - now or later. Every new feature we ship is included."), /*#__PURE__*/React.createElement("div", {
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
  }, "INCLUDED, AT NO EXTRA COST"), /*#__PURE__*/React.createElement("h2", {
    className: "h2",
    style: {
      maxWidth: 760
    }
  }, "What you actually get in 7 days."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 960
    }
  }, "Everything below is part of the trial. No add-ons. No professional services line item. No \"implementation partner\" you also have to pay."), /*#__PURE__*/React.createElement("div", {
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
  }, "5-YEAR TOTAL COST"), /*#__PURE__*/React.createElement("h2", {
    className: "h2",
    style: {
      maxWidth: 760
    }
  }, "How we compare on the line items that actually move money."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 960
    }
  }, "Sticker pricing rarely tells the truth. The line items below are where ERP budgets quietly inflate."), /*#__PURE__*/React.createElement("div", {
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
    q: 'How much does SimpleGrid cost after the trial?',
    a: 'Talk to us. We agree on a price together that fits your operation. After that, you pay one monthly subscription. That is the entire bill - no setup, no add-ons, no surprise line items.'
  }, {
    q: 'Is there a setup or deployment fee?',
    a: 'No. SimpleGrid deploys at our cost. You pay nothing for the modeling sessions, the configuration, or the founder-led onboarding.'
  }, {
    q: 'What does "pay only if it works" mean?',
    a: 'At the end of 30 days you decide. If the system is being used daily by your floor staff and your dashboards match the floor, it works. If not, you walk away. No invoice. No clawback.'
  }, {
    q: 'Do you charge for changes to the ERP - today or tomorrow?',
    a: 'No. New approval rule, new production stage, new QC gate, new report, new integration - every change is included, at go-live and forever after. Most ERPs charge $8K-$20K per change order. We never do.'
  }, {
    q: 'Are there feature tiers or add-on fees?',
    a: 'No. Every customer gets every feature. There is no Pro plan, no Enterprise tier, no per-feature licensing. When we ship something new, it is automatically yours.'
  }, {
    q: 'Do I get new features as you ship them?',
    a: 'Yes. We ship new products and features regularly, and they roll out to every customer at no extra cost. Your monthly subscription includes everything we have built and everything we are about to build.'
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
  }, "$0 to start. 30 days to decide."), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "See your factory running on SimpleGrid before you spend a dollar."), /*#__PURE__*/React.createElement("a", {
    href: "https://cal.com/simplegrid-ai",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn btn-lg btn-primary"
  }, "Book a Call")))), /*#__PURE__*/React.createElement(Footer, null), showLogin && /*#__PURE__*/React.createElement(LoginModal, {
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