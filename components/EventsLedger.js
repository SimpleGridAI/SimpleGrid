// Events Ledger - flagship section. SG Schema + Event Sourcing.
// Animated streaming feed + the architecture behind it.

function EventsLedger() {
  // Realistic event stream that types in over time
  const allEvents = [{
    t: '11:47:02',
    actor: 'Sarah · Sales',
    verb: 'CANCEL_LINE',
    entity: 'SO-4521 · Line 3',
    from: 'In Production',
    to: 'Cancelled',
    impact: 'WIP returned · Buyer notified'
  }, {
    t: '11:46:58',
    actor: 'System',
    verb: 'TRIGGER_FIRED',
    entity: 'Inventory rule R-204',
    from: '-',
    to: 'Reorder draft',
    impact: 'PO-8821 prepared for approval'
  }, {
    t: '11:46:51',
    actor: 'Mike · Floor',
    verb: 'START_STAGE',
    entity: 'JO-KEN-MIRROR · Assembly',
    from: 'Issued',
    to: 'In progress',
    impact: 'Stage clock started'
  }, {
    t: '11:46:44',
    actor: 'Raj · QC',
    verb: 'REJECT_BATCH',
    entity: 'Batch B-7710 · 12 pcs',
    from: 'Pending',
    to: 'Rejected',
    impact: 'Auto-routed to original contractor'
  }, {
    t: '11:46:31',
    actor: 'Mukund · Owner',
    verb: 'APPROVE',
    entity: 'PO-8819 · ₹ 14.2 L',
    from: 'Pending',
    to: 'Approved',
    impact: 'Vendor notified · Funds reserved'
  }, {
    t: '11:46:18',
    actor: 'Bruce · Disp.',
    verb: 'SHIP_DISPATCH',
    entity: 'HACO-Dispatch-441',
    from: 'Packed',
    to: 'Shipped',
    impact: 'Invoice INV-2207 generated'
  }, {
    t: '11:46:05',
    actor: 'System',
    verb: 'RECONCILE',
    entity: 'Bank · ICICI 4421',
    from: '-',
    to: 'Matched',
    impact: '37 receipts matched · 2 flagged'
  }, {
    t: '11:45:52',
    actor: 'Hank · Whse',
    verb: 'RECEIVE_GOODS',
    entity: 'GRN-3320 · 200 sheets',
    from: '-',
    to: 'In stock',
    impact: 'Inventory +200 · AP +₹ 14.2 L'
  }];
  const [count, setCount] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const containerRef = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.2
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);
  React.useEffect(() => {
    if (!inView || paused) return;
    if (count >= allEvents.length) return;
    const id = setTimeout(() => setCount(c => c + 1), count === 0 ? 350 : 750);
    return () => clearTimeout(id);
  }, [count, inView, paused]);
  const visible = allEvents.slice(0, count);
  const total = 12987 + count; // running counter

  const verbColor = v => {
    if (v.startsWith('REJECT') || v.startsWith('CANCEL')) return 'var(--sg-red)';
    if (v.startsWith('APPROVE') || v.startsWith('SHIP') || v.startsWith('RECEIVE') || v.startsWith('RECONCILE')) return 'var(--sg-green)';
    if (v.startsWith('TRIGGER')) return 'var(--sg-purple)';
    return 'var(--sg-blue)';
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-dark",
    id: "ledger",
    ref: containerRef,
    style: {
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      backgroundSize: '48px 48px',
      maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      color: 'rgba(255,255,255,0.5)'
    }
  }, "THE EVENTS LEDGER"), /*#__PURE__*/React.createElement("h2", {
    className: "h2",
    style: {
      color: '#fff',
      maxWidth: 880
    }
  }, "Your enterprise, alive - every action recorded, every decision traceable, every state replayable.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      background: '#0E0E10',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: '0 30px 80px rgba(0,0,0,0.4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ledger-headbar"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: '#FF5F57'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: '#FEBC2E'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: '#28C840'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'rgba(255,255,255,0.6)'
    }
  }, "events.simplegrid \xB7 live tail"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'rgba(255,255,255,0.5)',
      fontFamily: 'var(--font-mono)'
    }
  }, total.toLocaleString(), " events"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 11,
      color: '#10B981',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: '#10B981',
      boxShadow: '0 0 0 4px rgba(16,185,129,0.18)'
    }
  }), "LIVE"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (count >= allEvents.length) {
        setCount(0);
        setPaused(false);
      } else {
        setPaused(p => !p);
      }
    },
    style: {
      background: 'transparent',
      border: '1px solid rgba(255,255,255,0.18)',
      color: 'rgba(255,255,255,0.7)',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      padding: '5px 10px',
      borderRadius: 4,
      cursor: 'pointer',
      fontFamily: 'var(--font-body)'
    }
  }, count >= allEvents.length ? '⟲ Replay' : paused ? 'Resume' : 'Pause'))), /*#__PURE__*/React.createElement("div", {
    className: "ledger-cols"
  }, /*#__PURE__*/React.createElement("div", null, "Time"), /*#__PURE__*/React.createElement("div", null, "Actor"), /*#__PURE__*/React.createElement("div", null, "Event"), /*#__PURE__*/React.createElement("div", null, "Entity"), /*#__PURE__*/React.createElement("div", null, "Transition"), /*#__PURE__*/React.createElement("div", null, "Downstream effect")), /*#__PURE__*/React.createElement("div", {
    className: "ledger-rows"
  }, visible.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "ledger-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lr-time"
  }, e.t), /*#__PURE__*/React.createElement("div", {
    className: "lr-actor"
  }, e.actor), /*#__PURE__*/React.createElement("div", {
    className: "lr-verb",
    style: {
      color: verbColor(e.verb)
    }
  }, e.verb), /*#__PURE__*/React.createElement("div", {
    className: "lr-entity"
  }, e.entity), /*#__PURE__*/React.createElement("div", {
    className: "lr-transition"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lr-from"
  }, e.from), /*#__PURE__*/React.createElement("span", {
    className: "lr-arrow"
  }, "\u2192"), /*#__PURE__*/React.createElement("span", {
    className: "lr-to"
  }, e.to)), /*#__PURE__*/React.createElement("div", {
    className: "lr-impact"
  }, e.impact)))), /*#__PURE__*/React.createElement("div", {
    className: "ledger-foot"
  }, /*#__PURE__*/React.createElement("span", null, "\u25CF append-only"), /*#__PURE__*/React.createElement("span", null, "\u25CF cryptographically ordered"), /*#__PURE__*/React.createElement("span", null, "\u25CF replayable to any point in time"), /*#__PURE__*/React.createElement("span", null, "\u25CF regulator-ready")))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "ledger-callout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ledger-callout-tag"
  }, "WHAT THIS GIVES YOU"), /*#__PURE__*/React.createElement("h3", {
    className: "ledger-callout-h"
  }, "Time travel for your business."), /*#__PURE__*/React.createElement("p", {
    className: "ledger-callout-p"
  }, "Pick any moment in your factory", '’', "s past - March 14th at 3:42 PM, last Tuesday morning, the day before that big dispatch - and see exactly what was true. Who approved what. Where the order was. What inventory you had. The system replays it for you, with the names and the timestamps still attached."))), /*#__PURE__*/React.createElement("div", {
    className: "ledger-benefits"
  }, [{
    icon: '⟳',
    t: 'Replay any day, any hour.',
    p: '“Why was the Wednesday dispatch held?” Open the day. Watch the events in order. The reason is in the log - with the name, the time, and what changed because of it.'
  }, {
    icon: '⚖',
    t: 'Disputes resolved by the system.',
    p: 'Vendor says 500 sheets. Log says 450, received by Mike, 11:46 AM Tuesday. No more “let me check with the team.” The argument is over before it starts.'
  }, {
    icon: '✓',
    t: 'Audit-ready, by default.',
    p: 'IRS audit. OSHA inspection. SOX or buyer audit. You don’t scramble to assemble proof - every event already has a timestamp and a name on it. Filter, export, send.'
  }, {
    icon: '↺',
    t: 'Mistakes are reversible, never hidden.',
    p: 'Wrong approval? Wrong receipt? Issue a corrective event. The original is still there, the correction is recorded next to it. Nothing is overwritten, nothing is lost.'
  }, {
    icon: '∞',
    t: 'One source of truth, forever.',
    p: 'Inventory, AR, AP, production status - all computed from the same log, in real time. No nightly reconciliation, no “the report says X but the Slack thread says Y.”'
  }, {
    icon: '◆',
    t: 'Trust without supervision.',
    p: 'Every action carries a name. Edits, approvals, cancellations - all visible to you, not just to the person who did it. You stop being the bottleneck for trust.'
  }].map((x, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 70
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: '24px 26px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 8,
      background: 'rgba(74,123,247,0.16)',
      color: 'var(--sg-blue)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      fontWeight: 700
    }
  }, x.icon), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 18,
      fontWeight: 700,
      color: '#fff',
      margin: '4px 0 0',
      letterSpacing: '-0.01em'
    }
  }, x.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.7)',
      lineHeight: 1.6,
      margin: 0
    }
  }, x.p)))))), /*#__PURE__*/React.createElement("style", null, `
        @keyframes sgLedgerIn {
          from { opacity: 0; transform: translateY(-8px); background: rgba(74,123,247,0.08); }
          to   { opacity: 1; transform: translateY(0);    background: transparent; }
        }
        .ledger-row:hover { background: rgba(255,255,255,0.02); }
      `));
}
window.EventsLedger = EventsLedger;

// ----- Architecture explainer (SG Schema + Event Sourcing) -----
function ArchitectureNew() {
  return /*#__PURE__*/React.createElement("section", {
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
  }, "UNDER THE HOOD"), /*#__PURE__*/React.createElement("h2", {
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
  }, "Banks have run on this idea for centuries - a ledger, never erased. Almost no ERP does. We do.")))), /*#__PURE__*/React.createElement("div", {
    className: "arch-outcome-box"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--fg3)',
      marginBottom: 18
    }
  }, "What this combination unlocks"), /*#__PURE__*/React.createElement("div", {
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
      fontSize: 13,
      color: 'var(--fg2)',
      lineHeight: 1.6
    }
  }, x.p))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      padding: '24px 0',
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      color: 'var(--fg2)',
      lineHeight: 1.7,
      margin: 0,
      fontStyle: 'italic'
    }
  }, "\"This is not AI. AI is the surface. Underneath is an architecture so unusual that even seasoned engineers ask us to draw it twice. Most ERPs are 1990s thinking dressed in 2020s UI. SimpleGrid is what an enterprise system looks like if you started today, with what we now know.\""), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--fg3)',
      lineHeight: 1.5,
      margin: '6px 0 0',
      fontStyle: 'normal',
      fontWeight: 600
    }
  }, "- Mukund Agarwal, Founder"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--fg2)',
      lineHeight: 1.7,
      margin: '14px 0 0'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "about.html",
    style: {
      color: 'var(--sg-blue)',
      fontWeight: 600,
      textDecoration: 'none'
    }
  }, "Built by operators who ran a $30M factory"), " - not by software vendors who watched one from the outside.")))));
}
window.ArchitectureNew = ArchitectureNew;

// ----- Fogg-aligned hero, motivation, ability, trigger sections -----

function ProductHeroNew() {
  const [showInvite, setShowInvite] = React.useState(false);
  const [theme, setTheme] = React.useState(() => {
    try {
      return localStorage.getItem('sg_product_hero_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('sg_product_hero_theme', next);
    } catch {}
  };
  const isDark = theme === 'dark';

  // Theme-driven colors
  const bgClass = isDark ? 'section section-dark' : 'section';
  const bgStyle = isDark ? {
    paddingTop: 88,
    paddingBottom: 64,
    position: 'relative',
    overflow: 'hidden'
  } : {
    paddingTop: 88,
    paddingBottom: 64,
    position: 'relative',
    overflow: 'hidden',
    background: '#FCFCFD'
  };
  // Dark mode: no radial tint, so the hero reads as the same #1A1A1A as the
  // other section-dark blocks (FinalCTA, EventsLedger dark variant). Light
  // mode keeps the subtle blue/purple radial for visual interest.
  const overlayBg = isDark ? 'none' : 'radial-gradient(circle at 80% 20%, rgba(74,123,247,0.10), transparent 50%), radial-gradient(circle at 20% 80%, rgba(124,58,237,0.06), transparent 50%)';
  const tagColor = isDark ? 'rgba(255,255,255,0.5)' : 'var(--fg3)';
  const h1Color = isDark ? '#fff' : 'var(--fg1)';
  const leadColor = isDark ? 'rgba(255,255,255,0.78)' : 'var(--fg2)';
  const noteColor = isDark ? 'rgba(255,255,255,0.5)' : 'var(--fg3)';
  return /*#__PURE__*/React.createElement("section", {
    className: bgClass,
    style: bgStyle
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: 'hero-theme-toggle' + (isDark ? '' : ' is-light'),
    onClick: toggleTheme,
    "aria-label": isDark ? 'Switch to light mode' : 'Switch to dark mode'
  }, isDark ? /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
  })) : /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: overlayBg
    }
  }), /*#__PURE__*/React.createElement(ParticleCloud, {
    showArcs: false
  }), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      position: 'relative',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      color: tagColor
    }
  }, "THE PRODUCT"), /*#__PURE__*/React.createElement("h1", {
    className: "h1",
    style: {
      color: h1Color,
      maxWidth: 980,
      fontSize: 48,
      lineHeight: 1.1
    }
  }, "Stop running your factory on messaging apps and Excel sheets."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      color: leadColor,
      maxWidth: 760,
      marginTop: 18
    }
  }, "You know how it goes. Fourteen Slack channels. Six spreadsheets. An approval lost in DMs. A dispatch nobody can confirm. And a buyer on the phone asking where their order is. SimpleGrid is one system for all of it - built the way your team already works."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowInvite(true),
    className: "btn btn-lg btn-invite",
    style: {
      animation: 'sgBuildPulse 1.8s ease-in-out infinite'
    }
  }, "Request an Invite \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      display: 'flex',
      gap: 32,
      flexWrap: 'wrap',
      fontSize: 13,
      color: noteColor
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u25CF 7-day deployment"), /*#__PURE__*/React.createElement("span", null, "\u25CF No commitment"), /*#__PURE__*/React.createElement("span", null, "\u25CF Founder runs your onboarding"))), showInvite && /*#__PURE__*/React.createElement(InviteModal, {
    onClose: () => setShowInvite(false)
  }));
}
window.ProductHeroNew = ProductHeroNew;

// PRODUCT FEATURE - Hank, the AI chatbot for the shop floor
function MotivationSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "hank",
    style: {
      background: 'var(--sg-off-white)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "PRODUCT FEATURE"), /*#__PURE__*/React.createElement("h2", {
    className: "h2 ink",
    style: {
      maxWidth: 760,
      margin: '0 auto'
    }
  }, "Meet Hank - the AI assistant for your shop floor."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 150
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      maxWidth: 780,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }, /*#__PURE__*/React.createElement(HankChat, null))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "case-studies.html",
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--sg-blue)',
      textDecoration: 'none'
    }
  }, "See live customer deployments \u2192"))));
}
window.MotivationSection = MotivationSection;

// Hank - interactive AI chatbot answering the same Friday-night questions,
// from the events ledger.
function HankChat() {
  const conversation = [{
    role: 'user',
    day: 'Monday 9:14 AM',
    text: 'Hank, how much did we ship last week?'
  }, {
    role: 'hank',
    body: [{
      line: 'Mar 31 – Apr 6: ',
      strong: '47 dispatches · $480k invoiced.'
    }, {
      line: 'Top buyer: ',
      strong: 'Hampton Co',
      after: ' - 12 dispatches, $115k.'
    }, {
      line: '2 disputes pending: INV-2207, INV-2189.'
    }],
    cta: 'See the dispatch log →'
  }, {
    role: 'user',
    day: 'Monday 11:02 AM',
    text: 'Which SKU moves fastest through production right now?'
  }, {
    role: 'hank',
    body: [{
      line: 'Throughput, last 30 days:'
    }, {
      line: '· B118 sideboards (15 cft): ',
      strong: '3.0 cft/day · 5-day cycle'
    }, {
      line: '· A203 tables (10 cft): ',
      strong: '1.0 cft/day · 10-day cycle'
    }, {
      line: '· C040 chairs (8 cft): ',
      strong: '0.6 cft/day · 14-day cycle'
    }, {
      line: 'Fastest: ',
      strong: 'B118 - 3× the throughput of C040.'
    }, {
      line: 'If you ramp B118, you ship 3× the volume in the same window.'
    }],
    cta: 'See line throughput →'
  }, {
    role: 'user',
    day: 'Tuesday 9:24 AM',
    text: "What's slowing the plant this week?"
  }, {
    role: 'hank',
    body: [{
      line: 'Top constraint: ',
      strong: 'QC inspection - 38 hr backlog',
      after: ' (vs 12 hr avg).'
    }, {
      line: 'Cause: 2 of 3 inspectors on leave Apr 22-25.'
    }, {
      line: 'Stuck: ',
      strong: '14 batches',
      after: ' pre-dispatch · $105k locked.'
    }, {
      line: 'Suggestion: rotate Akhil (QC-certified) from procurement.'
    }],
    cta: 'Open the bottleneck view →'
  }, {
    role: 'user',
    day: 'Tuesday 2:33 PM',
    text: 'Why is PO-4521 higher than what we quoted?'
  }, {
    role: 'hank',
    body: [{
      line: 'Edited ',
      strong: 'Tue 4:13 PM by Mike (Floor).'
    }, {
      line: '$16,200 → ',
      strong: '$17,800',
      after: '.'
    }, {
      line: 'Reason logged: “rate revision per vendor email, Mar 18.”'
    }],
    cta: 'Open the audit trail →'
  }, {
    role: 'user',
    day: 'Wednesday 10:11 AM',
    text: 'If I take a 200-unit Apex order, when can I deliver?'
  }, {
    role: 'hank',
    body: [{
      line: 'Apex pattern = sideboards (B118 family).'
    }, {
      line: 'Volume: ',
      strong: '200 × 15 cft = 3,000 cft.'
    }, {
      line: 'Current load: 1 line free, 1 line at 92%.'
    }, {
      line: 'Earliest start: ',
      strong: 'May 6',
      after: ' (after current backlog).'
    }, {
      line: 'Earliest delivery: ',
      strong: 'May 25.'
    }]
  }, {
    role: 'user',
    day: 'Wednesday 3:48 PM',
    text: 'Which contractor has the worst rejection rate this quarter?'
  }, {
    role: 'hank',
    body: [{
      line: 'Top 3 by reject %:'
    }, {
      line: '1. ',
      strong: 'Sunrise Steel - 8.2%',
      after: ' (12 of 146 batches) ↑ from 4% Q1'
    }, {
      line: '2. Westwood Mfg - 4.1%'
    }, {
      line: '3. Acme Fab - 2.7%'
    }, {
      line: 'Driver: ',
      strong: 'weld defects on 3 mm sheet',
      after: ', started Mar 20.'
    }],
    cta: 'See contractor scorecards →'
  }, {
    role: 'user',
    day: 'Wednesday 6:41 PM',
    text: 'Did the QC reject for Hampton go back to the contractor?'
  }, {
    role: 'hank',
    body: [{
      line: 'Yes. ',
      strong: 'Batch B-7710',
      after: ' - 12 pcs, rejected by Raj at 11:46:44.'
    }, {
      line: 'Auto-routed back to Sunrise Steel.'
    }, {
      line: 'Replacement ETA: Apr 27 · cost recovery: $1,700 claimed.'
    }]
  }, {
    role: 'user',
    day: 'Thursday 8:30 AM',
    text: 'Can we commit to ramping output 30% next month?'
  }, {
    role: 'hank',
    body: [{
      line: 'Current: ',
      strong: '47 dispatches/wk · 517 cft/wk.'
    }, {
      line: '+30% target: ',
      strong: '672 cft/wk.'
    }, {
      line: 'Bottlenecks at +30%:'
    }, {
      line: '· Cutting line - 92% util · needs +1 shift'
    }, {
      line: '· Steel supply - 2-wk lead · PO by May 1'
    }, {
      line: '· QC - clears May 6'
    }, {
      line: 'Verdict: ',
      strong: 'feasible from week of May 12',
      after: ' with the shift add.'
    }],
    cta: 'Run the ramp scenario →'
  }, {
    role: 'user',
    day: 'Thursday 11:15 AM',
    text: "What's at risk of running out in the next 7 days?"
  }, {
    role: 'hank',
    body: [{
      line: '3 SKUs below safety stock:'
    }, {
      line: '· ',
      strong: '3 mm steel sheet - 4 days',
      after: ' at current draw'
    }, {
      line: '· M8 hex bolts - 5 days'
    }, {
      line: '· Walnut veneer - 6 days'
    }, {
      line: 'All 3 auto-reordered Apr 24. Vendor ETA Apr 29 – May 1.'
    }]
  }, {
    role: 'user',
    day: 'Thursday 4:02 PM',
    text: 'Where are we bleeding margin this month?'
  }, {
    role: 'hank',
    body: [{
      line: 'Margin slip vs April plan:'
    }, {
      line: '· Sideboards (B118): ',
      strong: '-4.2 pts',
      after: ' - rework on Sunrise batches'
    }, {
      line: '· Tables (A203): -1.8 pts - wood scrap up 6%'
    }, {
      line: '· Chairs (C040): on plan'
    }, {
      line: 'Combined hit: ',
      strong: '$7,700 vs plan.'
    }],
    cta: 'Open the margin tree →'
  }, {
    role: 'user',
    day: 'Friday 8:52 PM',
    text: "What's our cash position by buyer?"
  }, {
    role: 'hank',
    body: [{
      line: 'As of 11:48 AM today:'
    }, {
      line: '· Hampton Co: ',
      strong: '$145k',
      after: ' receivable (post-dated Apr 18)'
    }, {
      line: '· Apex Mfg: ',
      strong: '$100k',
      after: ' - overdue 3 days, flagged'
    }, {
      line: '· Elite Motors: ',
      strong: '$67k',
      after: ' current'
    }, {
      line: 'Total AR: ',
      strong: '$552k · DSO 42 days.'
    }]
  }, {
    role: 'user',
    day: 'Friday 9:22 PM',
    text: 'Which buyer is actually most profitable?'
  }, {
    role: 'hank',
    body: [{
      line: 'Net margin, last 90 days:'
    }, {
      line: '· Elite Motors: ',
      strong: '22.3%',
      after: ' · $290k top-line'
    }, {
      line: '· Hampton Co: 18.6% · $490k - best volume'
    }, {
      line: '· Apex Mfg: 11.4% · $215k - eroded by 3 disputes'
    }, {
      line: 'Hold capacity for ',
      strong: 'Hampton + Elite',
      after: ' first.'
    }],
    cta: 'See buyer P&L →'
  }];
  const ref = React.useRef(null);
  const scrollRef = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [typing, setTyping] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.2
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  React.useEffect(() => {
    if (!inView || paused) return;
    if (step >= conversation.length) return;
    const next = conversation[step];
    if (next.role === 'hank' && !typing) {
      const t = setTimeout(() => setTyping(true), 380);
      return () => clearTimeout(t);
    }
    if (next.role === 'hank' && typing) {
      const t = setTimeout(() => {
        setTyping(false);
        setStep(s => s + 1);
      }, 1400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep(s => s + 1), step === 0 ? 300 : 1600);
    return () => clearTimeout(t);
  }, [inView, step, typing, paused]);
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [step, typing]);
  const visible = conversation.slice(0, step);
  const showingTyping = typing && step < conversation.length && conversation[step].role === 'hank';
  const done = step >= conversation.length;
  const replay = () => {
    setTyping(false);
    setStep(0);
    setPaused(false);
  };
  const togglePause = () => setPaused(p => !p);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: '0 18px 48px rgba(15,23,42,0.08)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 18px',
      borderBottom: '1px solid var(--border)',
      background: 'var(--sg-off-white)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, var(--sg-blue) 0%, var(--sg-purple) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      fontSize: 15,
      boxShadow: '0 4px 12px rgba(74,123,247,0.25)'
    }
  }, "H"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      fontSize: 14,
      color: 'var(--fg1)',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, "Hank", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--sg-blue)',
      background: 'rgba(74,123,247,0.12)',
      padding: '2px 6px',
      borderRadius: 999
    }
  }, "AI")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg3)',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: '#10B981',
      boxShadow: '0 0 0 3px rgba(16,185,129,0.18)'
    }
  }), "online \xB7 reads from the events ledger")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 6
    }
  }, !done && /*#__PURE__*/React.createElement("button", {
    onClick: togglePause,
    style: {
      background: paused ? 'var(--sg-blue)' : '#fff',
      border: '1px solid ' + (paused ? 'var(--sg-blue)' : 'var(--border)'),
      color: paused ? '#fff' : 'var(--fg2)',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      padding: '6px 11px',
      borderRadius: 4,
      cursor: 'pointer',
      fontFamily: 'var(--font-body)'
    }
  }, paused ? '▶ Resume' : '⏸ Pause'), /*#__PURE__*/React.createElement("button", {
    onClick: replay,
    disabled: !done && !paused,
    style: {
      background: done ? 'var(--sg-blue)' : 'transparent',
      border: done ? 'none' : '1px solid var(--border)',
      color: done ? '#fff' : 'var(--fg3)',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      padding: '6px 11px',
      borderRadius: 4,
      cursor: done || paused ? 'pointer' : 'default',
      fontFamily: 'var(--font-body)',
      opacity: done || paused ? 1 : 0.45
    }
  }, "\u27F2 Replay"))), /*#__PURE__*/React.createElement("div", {
    ref: scrollRef,
    style: {
      padding: '20px 22px',
      height: 460,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      background: '#fff'
    }
  }, visible.map((m, i) => /*#__PURE__*/React.createElement(HankBubble, {
    key: i,
    message: m
  })), showingTyping && /*#__PURE__*/React.createElement(HankTyping, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 16px',
      borderTop: '1px solid var(--border)',
      background: 'var(--sg-off-white)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 8,
      padding: '10px 12px',
      fontSize: 13,
      color: 'var(--fg3)',
      fontFamily: 'var(--font-body)'
    }
  }, "Ask Hank anything", '…'), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'var(--sg-blue)',
      color: '#fff',
      border: 'none',
      borderRadius: 8,
      padding: '10px 16px',
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'var(--font-body)'
    }
  }, "Send")), /*#__PURE__*/React.createElement("style", null, `
        @keyframes sgChatIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sgTypingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30%           { transform: translateY(-4px); opacity: 1; }
        }
      `));
}
window.HankChat = HankChat;
function HankBubble({
  message
}) {
  const isUser = message.role === 'user';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: isUser ? 'flex-end' : 'flex-start',
      animation: 'sgChatIn 0.35s cubic-bezier(0.2,0.8,0.2,1) both'
    }
  }, message.day && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--fg3)',
      letterSpacing: '0.06em',
      margin: isUser ? '0 6px 4px 0' : '0 0 4px 6px'
    }
  }, message.day), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '82%',
      background: isUser ? 'var(--sg-blue)' : 'var(--sg-off-white)',
      color: isUser ? '#fff' : 'var(--fg1)',
      border: isUser ? 'none' : '1px solid var(--border)',
      borderRadius: 14,
      borderTopLeftRadius: isUser ? 14 : 4,
      borderTopRightRadius: isUser ? 4 : 14,
      padding: '11px 15px',
      fontSize: 14,
      lineHeight: 1.55
    }
  }, isUser ? message.text : /*#__PURE__*/React.createElement(React.Fragment, null, message.body.map((b, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      marginBottom: i < message.body.length - 1 ? 4 : 0
    }
  }, b.line, b.strong && /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--fg1)',
      fontWeight: 700
    }
  }, b.strong), b.after)), message.cta && /*#__PURE__*/React.createElement("a", {
    href: "#ledger",
    style: {
      display: 'inline-block',
      marginTop: 10,
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--sg-blue)',
      textDecoration: 'none'
    }
  }, message.cta))));
}
function HankTyping() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-start',
      animation: 'sgChatIn 0.3s ease-out both'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sg-off-white)',
      border: '1px solid var(--border)',
      borderRadius: 14,
      borderTopLeftRadius: 4,
      padding: '14px 18px',
      display: 'flex',
      gap: 5,
      alignItems: 'center'
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--fg3)',
      display: 'inline-block',
      animation: `sgTypingDot 1.2s ${i * 0.18}s infinite ease-in-out`
    }
  }))));
}

// ABILITY - make adoption stupid easy
function AbilitySection() {
  const lines = [{
    type: 'prompt',
    text: '> received 200 sheets 16-gauge from Midwest, PO-4521'
  }, {
    type: 'response',
    text: '✓ Matched to PO-4521.\n  Inventory +200 · AP +₹14.2L\n  Reorder rule R-204 paused.\n  Logged at 11:46:05 by Hank.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "ability",
    style: {
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "FOR THE PEOPLE WHO ACTUALLY DO THE WORK"), /*#__PURE__*/React.createElement("h2", {
    className: "h2 ink",
    style: {
      maxWidth: 1200
    }
  }, "If your warehouse manager can send a text, he can run your ERP."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: '100%'
    }
  }, "Adoption is where ERPs go to die. We removed the menus, the codes, the training manual. Your team types what happened. The system does the seven steps.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      gap: 36,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(TypingDemo, {
    lines: lines
  })), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 18
    }
  }, [{
    t: 'No training day',
    p: 'Day one, your floor is logging in. The interface is a sentence.'
  }, {
    t: 'No menus to memorise',
    p: 'No SKU codes, no transaction codes, no eight-tab forms. The model knows what you mean.'
  }, {
    t: 'No data lost in chat threads',
    p: 'Every "received this," "approved that," "QC rejected" becomes a permanent event with a name and a timestamp.'
  }].map((x, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '28px 1fr',
      gap: 14,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      background: 'var(--sg-blue-light)',
      color: 'var(--sg-blue)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: 13,
      marginTop: 2
    }
  }, i + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 17,
      fontWeight: 700,
      color: 'var(--fg1)',
      marginBottom: 4
    }
  }, x.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--fg2)',
      lineHeight: 1.6
    }
  }, x.p))))))))));
}
window.AbilitySection = AbilitySection;

// TRIGGER - final CTA, friction-free
function TriggerCTA() {
  const [showInvite, setShowInvite] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-dark final-cta",
    style: {
      paddingTop: 80,
      paddingBottom: 88
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      color: 'rgba(255,255,255,0.5)'
    }
  }, "THE ONLY DECISION YOU NEED TO MAKE THIS WEEK"), /*#__PURE__*/React.createElement("h2", {
    className: "h2",
    style: {
      color: '#fff',
      maxWidth: 880,
      margin: '0 auto'
    }
  }, "Spend 3 hours with us. Run it for 30 days. Keep it if it works."), /*#__PURE__*/React.createElement("p", {
    className: "sub",
    style: {
      color: 'rgba(255,255,255,0.75)',
      maxWidth: 720,
      margin: '18px auto 0'
    }
  }, "We deploy at our cost. Your team uses it on real orders. If by day 30 you don", '\u2019', "t feel the difference, you walk away, and we", '\u2019', "ve still done the migration work."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowInvite(true),
    className: "btn btn-lg btn-invite",
    style: {
      animation: 'sgBuildPulse 1.8s ease-in-out infinite'
    }
  }, "Request an Invite \u2192")), /*#__PURE__*/React.createElement("p", {
    className: "note",
    style: {
      color: 'rgba(255,255,255,0.5)',
      marginTop: 14
    }
  }, "Founder-led onboarding \xB7 Migration included \xB7 No commitment"))), showInvite && /*#__PURE__*/React.createElement(InviteModal, {
    onClose: () => setShowInvite(false)
  }));
}
window.TriggerCTA = TriggerCTA;