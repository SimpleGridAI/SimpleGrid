const ROLES = [{
  id: 'fractional-cro-cso-us',
  team: 'Go-to-market',
  t: 'Fractional CRO / CSO - US Market',
  loc: 'Remote (US-based)',
  type: 'Fractional / part-time',
  datePosted: '2026-03-15',
  comp: 'USD $5,000 / month + equity + uncapped performance upside',
  summary: 'Open the US market for a custom ERP that ships in days and gets paid for only after it works. You bring the operator network, the book of relationships, and the hand-on-the-pen instinct. We bring a product we build at our risk and a 30-day on-the-floor trial that closes deals on its own.',
  about: ['We have proof in India - real factories, real ledgers, real revenue. The US mid-market manufacturer (50-1,500 people) is our next wedge: the customer who has outgrown QuickBooks + Excel but cannot stomach a $500K, 18-month SAP deployment. They are exactly who SimpleGrid was built for.', 'You will own US revenue strategy, partner with the founder on every early deal, and graduate to running a US team once the motion is repeatable.'],
  what: ['Own US pipeline end-to-end: ICP definition, outbound, partnerships, pilots, close.', 'Personally lead the first 5-10 US deals alongside the founder. Discovery, scoping, pricing, negotiation.', 'Stand up a repeatable motion: messaging, sequences, demo flow, pricing tiers, contract templates.', 'Build channels: industry associations (NAM, AME, regional manufacturing councils), MSPs, fractional-CFO networks, accounting partners.', 'Hire the first AE / SDR when the motion is proven, not before.'],
  you: ['15+ years in B2B SaaS GTM, with at least one CRO or VP Sales seat at a Series A-C company.', 'Has personally closed mid-market manufacturing, supply chain, or vertical-SaaS deals in the US.', 'Strong existing network among mid-market manufacturers, COOs, plant managers, and industry consultants.', 'Operator-friendly. You can hold your own in a conversation about WIP, MOQs, and AP/AR.', 'Comfortable being the most senior US person at the company on day one.'],
  not: ['A pure-strategy role. You will be on calls, on slides, and on planes.', 'A passive board seat. Fractional means part-time, not hands-off.'],
  process: ['Founder call.', 'Working session: you walk us through how you would run our first US quarter.', 'References from past founder partners.', 'Engagement letter, 90-day evaluation, then long-term.']
}, {
  id: 'founders-office-intern',
  team: 'Founder\'s Office',
  t: 'Founder\'s Office Intern',
  loc: 'Bangalore (in-person)',
  type: 'Internship (6 months, convertible to full-time)',
  datePosted: '2026-04-10',
  comp: 'Competitive stipend - discussed on the call',
  summary: 'Run with whatever the founder needs run with. Customer ops, deployment notes, content, data, sales-ops, partner outreach. Six months of unfair access to how a B2B startup is actually built.',
  about: ['This is not a coffee-and-decks internship. Founders and senior engineers run every deployment together. You will sit next to them on customer calls, take the followups, build the spreadsheets, draft the contracts, write the case studies, and own the loose ends.', 'If you want to be a founder yourself one day, this is the densest six months you can spend.'],
  what: ['Customer ops: own followups, deployment trackers, and customer-success notes for every live account.', 'Sales ops: research target accounts, draft outbound, prep founder for calls, log everything in CRM.', 'Content: turn deployment learnings into case studies, blog posts, and product docs.', 'Internal tooling: keep dashboards, hiring trackers, and finance trackers honest.', 'Anything that is on fire that nobody else is owning.'],
  you: ['Final-year undergrad, recent grad, or pre-MBA / pre-grad-school.', 'Strong written English. We write everything down here.', 'Ridiculously organized. Things you own do not slip.', 'Comfortable with ambiguity, allergic to fluff, fast on a keyboard.', 'Bonus: prior startup internship, debate / writing background, basic SQL or spreadsheets-at-depth.'],
  not: ['A remote internship. We want you in the room.', 'A passive role. We will not assign you a project; you will find the next thing yourself.'],
  process: ['A short written application (3 questions, ~30 min).', 'A 30-min call with the founder.', 'A 1-day paid trial in the office.', 'Offer.']
}];
function HiringHero() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-dark",
    style: {
      paddingTop: 80,
      paddingBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      color: 'rgba(255,255,255,0.45)'
    }
  }, "HIRING"), /*#__PURE__*/React.createElement("h1", {
    className: "h1",
    style: {
      color: '#fff',
      maxWidth: 880
    }
  }, "Build a custom ERP at our risk. Get paid only when it works."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      color: 'rgba(255,255,255,0.7)',
      maxWidth: 760,
      marginTop: 16
    }
  }, "Lean team. Senior engineers and a founder on every customer. We carry the build cost and the risk of every deployment — and we win only when the customer wins. We're hiring engineers, operators, and go-to-market hires who want to ship a system that gets used on the floor, not bought and shelved."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#roles",
    className: "btn btn-lg btn-primary"
  }, "See open roles"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:hello@simplegrid.ai?subject=Joining%20SimpleGrid",
    className: "btn btn-lg btn-outline-white"
  }, "Email the founder"))));
}
function WhyThis() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "WHY THIS"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "A few things to know before you apply.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 20,
      marginTop: 28
    },
    className: "hire-grid"
  }, [{
    t: 'Operator-grounded',
    b: 'Our founder ran a $30M manufacturing business and survived two ERP failures before building this. We design for the floor. Every feature is tested against a real plant.'
  }, {
    t: 'We carry the risk',
    b: 'Every customer is built at our cost and only paid for after it works. That commitment runs through the company — tight loops, visible work, no 9-month roadmaps.'
  }, {
    t: 'Small by design',
    b: 'We will stay under 25 people for as long as we can. Everyone ships. Everyone talks to customers. Senior engineers and a founder on every deployment.'
  }].map((c, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 100
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: 24,
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 18,
      fontWeight: 700,
      margin: '0 0 10px',
      color: 'var(--fg1)',
      letterSpacing: '-0.01em'
    }
  }, c.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--fg2)',
      lineHeight: 1.6,
      margin: 0
    }
  }, c.b)))))));
}
function RoleSummary({
  r,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '22px 26px',
      display: 'grid',
      gridTemplateColumns: '160px 1fr auto',
      gap: 24,
      alignItems: 'center'
    },
    className: "role-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--fg3)',
      fontWeight: 700,
      marginBottom: 4
    }
  }, r.team), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)'
    }
  }, r.type)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 20,
      fontWeight: 700,
      margin: '0 0 4px',
      color: 'var(--fg1)',
      letterSpacing: '-0.01em'
    }
  }, r.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)',
      marginBottom: 4
    }
  }, r.loc), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--sg-blue)',
      fontWeight: 600,
      marginBottom: 8
    }
  }, r.comp), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--fg2)',
      lineHeight: 1.55,
      margin: 0,
      maxWidth: 680
    }
  }, r.summary)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpen(r.id),
    className: "btn btn-sm btn-secondary",
    style: {
      whiteSpace: 'nowrap'
    }
  }, "Read full JD \u2192"), /*#__PURE__*/React.createElement("a", {
    href: 'mailto:hello@simplegrid.ai?subject=Application:%20' + encodeURIComponent(r.t),
    className: "btn btn-sm btn-primary",
    style: {
      whiteSpace: 'nowrap'
    }
  }, "Apply")));
}
function RoleDetail({
  r
}) {
  const Sec = ({
    title,
    items,
    color
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: color || 'var(--fg3)',
      fontWeight: 700,
      marginBottom: 10
    }
  }, title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      fontSize: 15,
      color: 'var(--fg2)',
      lineHeight: 1.6,
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: color || 'var(--sg-blue)',
      fontWeight: 700,
      marginTop: 1,
      flexShrink: 0
    }
  }, "-"), /*#__PURE__*/React.createElement("span", null, it)))));
  return /*#__PURE__*/React.createElement("div", {
    id: r.id,
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '40px 44px',
      scrollMarginTop: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--fg3)',
      fontWeight: 700,
      marginBottom: 8
    }
  }, r.team, " \xB7 ", r.type), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 30,
      fontWeight: 700,
      margin: '0 0 8px',
      color: 'var(--fg1)',
      letterSpacing: '-0.02em',
      lineHeight: 1.15
    }
  }, r.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--fg3)',
      marginBottom: 6
    }
  }, r.loc), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: 'var(--sg-blue)',
      fontWeight: 700
    }
  }, r.comp)), /*#__PURE__*/React.createElement("a", {
    href: 'mailto:hello@simplegrid.ai?subject=Application:%20' + encodeURIComponent(r.t),
    className: "btn btn-primary"
  }, "Apply")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      color: 'var(--fg1)',
      lineHeight: 1.55,
      margin: '24px 0 0',
      fontWeight: 500,
      maxWidth: 740
    }
  }, r.summary), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, r.about.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      fontSize: 15,
      color: 'var(--fg2)',
      lineHeight: 1.7,
      margin: '0 0 14px',
      maxWidth: 740
    }
  }, p))), /*#__PURE__*/React.createElement(Sec, {
    title: "What you will do",
    items: r.what
  }), /*#__PURE__*/React.createElement(Sec, {
    title: "What we are looking for",
    items: r.you
  }), /*#__PURE__*/React.createElement(Sec, {
    title: "What this is not",
    items: r.not,
    color: "var(--sg-red)"
  }), /*#__PURE__*/React.createElement(Sec, {
    title: "Process",
    items: r.process,
    color: "var(--sg-green)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      paddingTop: 24,
      borderTop: '1px solid var(--border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--fg2)'
    }
  }, "Apply by emailing ", /*#__PURE__*/React.createElement("a", {
    href: 'mailto:hello@simplegrid.ai?subject=Application:%20' + encodeURIComponent(r.t),
    style: {
      color: 'var(--sg-blue)',
      fontWeight: 600
    }
  }, "hello@simplegrid.ai"), " with your CV or LinkedIn and a one-paragraph note on why this."), /*#__PURE__*/React.createElement("a", {
    href: 'mailto:hello@simplegrid.ai?subject=Application:%20' + encodeURIComponent(r.t),
    className: "btn btn-primary"
  }, "Apply for this role")));
}
function HiringPage() {
  const [showLogin, setShowLogin] = React.useState(false);
  const [openRole, setOpenRole] = React.useState(null);

  // Inject JobPosting JSON-LD per role for Google Jobs eligibility
  React.useEffect(() => {
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.id = 'hiring-jobpostings';
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': ROLES.map(r => {
        // Each role declares its own datePosted (stable for crawlers).
        // validThrough = datePosted + 90 days, recomputed once at render time.
        const posted = r.datePosted || '2026-04-01';
        const through = new Date(new Date(posted + 'T00:00:00Z').getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
        return {
          '@type': 'JobPosting',
          'title': r.t,
          'description': r.summary + ' ' + (r.about || []).join(' '),
          'employmentType': r.type.includes('Internship') ? 'INTERN' : r.type.includes('Fractional') ? 'CONTRACTOR' : 'FULL_TIME',
          'hiringOrganization': {
            '@type': 'Organization',
            '@id': 'https://simplegrid.ai/#org',
            'name': 'SimpleGrid',
            'sameAs': 'https://simplegrid.ai/'
          },
          'jobLocation': {
            '@type': 'Place',
            'address': {
              '@type': 'PostalAddress',
              'addressLocality': r.loc.includes('Bangalore') ? 'Bengaluru' : r.loc.includes('Remote') ? 'Remote' : r.loc,
              'addressCountry': r.loc.includes('US') ? 'US' : 'IN'
            }
          },
          'datePosted': posted,
          'validThrough': through,
          'directApply': true,
          'identifier': {
            '@type': 'PropertyValue',
            'name': 'SimpleGrid',
            'value': r.id
          }
        };
      })
    });
    document.head.appendChild(ld);
    return () => {
      if (ld.parentNode) ld.parentNode.removeChild(ld);
    };
  }, []);
  React.useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      if (ROLES.some(r => r.id === id)) {
        setOpenRole(id);
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, []);
  const handleOpen = id => {
    setOpenRole(id);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }, 50);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    page: "hiring",
    onLoginClick: () => setShowLogin(true)
  }), /*#__PURE__*/React.createElement("main", { id: "main" }, /*#__PURE__*/React.createElement(HiringHero, null), /*#__PURE__*/React.createElement(WhyThis, null), /*#__PURE__*/React.createElement("section", {
    className: "section section-alt",
    id: "roles"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "OPEN ROLES"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "Where we need help.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ROLES.map((r, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: r.id,
    delay: i * 60
  }, /*#__PURE__*/React.createElement(RoleSummary, {
    r: r,
    onOpen: handleOpen
  })))))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }
  }, ROLES.map((r, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: r.id,
    delay: i * 60
  }, /*#__PURE__*/React.createElement(RoleDetail, {
    r: r
  })))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--fg2)',
      marginTop: 32,
      textAlign: 'center'
    }
  }, "Don't see your role? Email ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:hello@simplegrid.ai",
    style: {
      color: 'var(--sg-blue)'
    }
  }, "hello@simplegrid.ai"), " with how you'd contribute."))))), /*#__PURE__*/React.createElement(Footer, null), showLogin && /*#__PURE__*/React.createElement(LoginModal, {
    onClose: () => setShowLogin(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "mobile-cta"
  }, /*#__PURE__*/React.createElement("a", {
    href: "mailto:hello@simplegrid.ai",
    className: "btn btn-primary"
  }, "Email the founder")), /*#__PURE__*/React.createElement("style", null, `@media (max-width:760px){.role-row{grid-template-columns:1fr !important}.hire-grid{grid-template-columns:1fr !important}}`));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(HiringPage, null));