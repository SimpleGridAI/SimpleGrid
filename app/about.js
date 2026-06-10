function AboutPage() {
  const [showLogin, setShowLogin] = React.useState(false);
  const [showInvite, setShowInvite] = React.useState(false);
  React.useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    let tries = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
          top,
          behavior: 'smooth'
        });
      } else if (tries++ < 20) {
        setTimeout(tryScroll, 100);
      }
    };
    setTimeout(tryScroll, 150);
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("main", {
    id: "main"
  }, /*#__PURE__*/React.createElement("section", {
    className: "section section-dark",
    style: {
      position: 'relative',
      color: '#fff',
      overflow: 'hidden',
      background: 'rgba(26,26,26,0.90)',
      minHeight: '78vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: 160,
      paddingBottom: 160
    }
  }, /*#__PURE__*/React.createElement(ParticleCloud, {
    showArcs: false
  }), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      maxWidth: 'none',
      position: 'relative',
      zIndex: 2,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      color: 'rgba(255,255,255,0.7)',
      marginBottom: 24
    }
  }, "ABOUT US"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      letterSpacing: '-0.03em',
      lineHeight: 1.05,
      fontSize: 'clamp(44px, 6.5vw, 72px)',
      color: '#fff',
      margin: '0 0 28px',
      maxWidth: 1100
    }
  }, "Built by operators who've been on your floor."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'clamp(18px, 1.7vw, 22px)',
      lineHeight: 1.55,
      color: 'rgba(255,255,255,0.85)',
      margin: 0,
      maxWidth: 920
    }
  }, "SimpleGrid was not designed in a boardroom. It was designed on a shop floor that was already running on Excel and group chats - and not working. The people who built SimpleGrid have run multi-stage factories with hundreds of workers, survived two ERP failures, and ended up on Google Sheets. SimpleGrid is the system we wished we had. We were the customer first - we know exactly what breaks when the system can't keep up with the floor."))), /*#__PURE__*/React.createElement("section", {
    className: "section section-alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "WHY WE EXIST"), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 'none',
      margin: '12px 0 0'
    }
  }, "Here's what no software vendor will tell you: 75% of mid-market ERP projects fail or get abandoned. We lived two of them ourselves. So we built something different. SimpleGrid is the Factory Ops Cloud - an operations layer that runs your factory floor on top of the QuickBooks or Tally you already use. Jobs, batches, BOMs, QC checkpoints, costing - live, in one place, with no migration and no rip-and-replace. And because we've been the customer, we prove it before we ask you to commit: we configure it to your floor at our cost, you run it live for 30 days, and you pay only when it works.")))), /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "architecture",
    style: {
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      color: 'var(--sg-purple)'
    }
  }, "UNDER THE HOOD"), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 960,
      fontStyle: 'italic',
      fontWeight: 600,
      color: 'var(--fg1)',
      margin: '4px 0 14px'
    }
  }, "This is not AI. AI is the surface."), /*#__PURE__*/React.createElement("h2", {
    className: "h2 ink",
    style: {
      color: 'var(--fg1)'
    }
  }, "SG Schema ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg3)',
      fontWeight: 400
    }
  }, "\xD7"), " SG Engine ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg3)',
      fontWeight: 400
    }
  }, "\xD7"), " Event Sourcing."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 960
    }
  }, "Most ERPs are data-entry apps wearing a suit - tables, forms, overwrites. SimpleGrid is built on two ideas no other business platform ships at the core: an ", /*#__PURE__*/React.createElement("strong", null, "SG Schema"), " that captures one factory's complete operational blueprint, and an ", /*#__PURE__*/React.createElement("strong", null, "event-sourced"), " ledger that stores every change. SG Engine reads the SG Schema and runs your factory from it. The result is a system that bends to your business instead of the other way around.")), /*#__PURE__*/React.createElement("div", {
    className: "arch-outcome-box"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-caption)',
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--fg3)',
      marginBottom: 8
    }
  }, "What this combination unlocks"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--fg2)',
      lineHeight: 1.6,
      margin: '0 0 18px'
    }
  }, "The rest of the industry measures ERP rollouts in quarters and years. A SimpleGrid setup goes live in days."), /*#__PURE__*/React.createElement("div", {
    className: "arch-outcome-grid"
  }, [{
    t: '7-day deploys',
    p: 'New operation → new system, generated from your SG Schema. No new codebase per customer.'
  }, {
    t: 'Audit by design',
    p: 'You don\'t add audit logs. The audit is the system. Every regulator question already has an answer.'
  }, {
    t: 'Rules without releases',
    p: 'Change a rule, the system changes. No deploy cycle. No IT ticket. No version migration.'
  }, {
    t: 'Disputes resolved',
    p: 'Vendor said 500. Log says 450, by Mike, 4:13 PM Tuesday. Argument over.'
  }].map((x, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "arch-outcome-cell"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--fg1)',
      marginBottom: 6
    }
  }, x.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-caption)',
      color: 'var(--fg2)',
      lineHeight: 1.6
    }
  }, x.p))))), /*#__PURE__*/React.createElement("div", {
    className: "arch-ddd-grid"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "arch-ddd-card",
    style: {
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: 32,
      height: '100%',
      borderLeft: '4px solid var(--sg-purple)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.16em',
      color: 'var(--sg-purple)',
      marginBottom: 8
    }
  }, "SG SCHEMA"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 22,
      fontWeight: 700,
      margin: '0 0 14px',
      color: 'var(--fg1)',
      letterSpacing: '-0.015em'
    }
  }, "Your business has a language. The system speaks it."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--fg2)',
      lineHeight: 1.7,
      margin: '0 0 14px'
    }
  }, "A \"Job Order\" in your factory is not the same thing as a \"Work Order\" in someone else's. A \"rejection\" in fabric is different from a \"rejection\" in plywood. Generic ERPs flatten that - every customer fits the same forms."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--fg2)',
      lineHeight: 1.7,
      margin: 0
    }
  }, "Your SG Schema captures ", /*#__PURE__*/React.createElement("em", null, "your"), " entities, your states, your transitions, your invariants, your chain reactions. AI writes it, the operator validates it, SG Engine runs it. The vocabulary on every screen is yours, because the spec underneath is yours."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: 32,
      height: '100%',
      borderLeft: '4px solid var(--sg-blue)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.16em',
      color: 'var(--sg-blue)',
      marginBottom: 8
    }
  }, "EVENT SOURCING"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 22,
      fontWeight: 700,
      margin: '0 0 14px',
      color: 'var(--fg1)',
      letterSpacing: '-0.015em'
    }
  }, "The log is the database. The state is a projection."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--fg2)',
      lineHeight: 1.7,
      margin: '0 0 14px'
    }
  }, "Instead of storing the current row and losing the past, we store every event that ever changed your business. Inventory is not a number - it's the sum of every receipt and issuance. An order's status is not a flag - it's the latest state in a chain of recorded transitions."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--fg2)',
      lineHeight: 1.7,
      margin: 0
    }
  }, "Banks have run on this idea for centuries - a ledger, never erased. Almost no ERP does. We do - and completed jobs flow from that ledger straight into the QuickBooks or Tally you already run.")))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      padding: '24px 0',
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--fg2)',
      lineHeight: 1.7,
      margin: 0,
      fontStyle: 'italic'
    }
  }, "\"Underneath is an architecture so unusual that even seasoned engineers ask us to draw it twice. Most ERPs are 1990s thinking dressed in 2020s UI. SimpleGrid is what an enterprise system looks like if you started today, with what we now know.\""), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-caption)',
      color: 'var(--fg3)',
      lineHeight: 1.5,
      margin: '6px 0 0',
      fontStyle: 'normal',
      fontWeight: 600
    }
  }, "- The founding team"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 48
    }
  }, /*#__PURE__*/React.createElement(ProductionFlow, null))), /*#__PURE__*/React.createElement(FinalCTA, {
    title: "Built by people who've run the floor.",
    body: "We ran multi-stage factories to $30M and survived two ERP failures before building SimpleGrid. We're on every deployment. We configure it to your floor at our cost. Run it live for 30 days. You pay only when it works.",
    note: "Limited slots each quarter. We onboard selectively."
  }), showLogin && /*#__PURE__*/React.createElement(LoginModal, {
    onClose: () => setShowLogin(false)
  }), showInvite && /*#__PURE__*/React.createElement(InviteModal, {
    onClose: () => setShowInvite(false)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(AboutPage, null));