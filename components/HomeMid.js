function RolesVisual() {
  const roles = [{
    name: 'Warehouse Mgr',
    color: '#10B981',
    entities: ['Inventory', 'Receipts', 'Issuances']
  }, {
    name: 'Planner',
    color: '#F59E0B',
    entities: ['Orders', 'Production', 'Scheduling']
  }, {
    name: 'QC Inspector',
    color: '#EF4444',
    entities: ['Quality checks', 'Rejections']
  }, {
    name: 'Founder',
    color: '#3461E0',
    entities: ['Everything', '', '']
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sg-off-white)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: 20,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 8
    }
  }, roles.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: 12,
      borderTop: `3px solid ${r.color}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: 'var(--fg1)',
      fontSize: 12,
      marginBottom: 8
    }
  }, r.name), r.entities.filter(Boolean).map((e, j) => /*#__PURE__*/React.createElement("div", {
    key: j,
    style: {
      fontSize: 11,
      color: 'var(--fg2)',
      padding: '4px 8px',
      marginBottom: 4,
      background: 'var(--sg-off-white)',
      borderRadius: 'var(--radius-sm)'
    }
  }, e)), r.name === 'Founder' && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: r.color,
      fontWeight: 600,
      marginTop: 4
    }
  }, "Full access")))));
}
function LedgerVisual() {
  const events = [{
    time: 'Apr 19 10:47 PM',
    entity: 'SO-4521 Line Item',
    event: 'CANCEL LINE',
    from: 'In Production',
    to: 'Canceled',
    by: 'Sarah'
  }, {
    time: 'Apr 18 05:40 PM',
    entity: 'JO for KEN MIR...',
    event: 'START STAGE',
    from: 'Material Issued',
    to: 'In Progress',
    by: 'Mike'
  }, {
    time: 'Apr 18 05:35 PM',
    entity: 'Assembly - JO Door',
    event: 'START CJ',
    from: 'Assigned',
    to: 'In Progress',
    by: 'Raj'
  }, {
    time: 'Apr 18 05:32 PM',
    entity: 'Machining - JO SUN',
    event: 'START CJ',
    from: 'Assigned',
    to: 'In Progress',
    by: 'Mike'
  }, {
    time: 'Apr 17 04:17 PM',
    entity: 'HACO Dispatch',
    event: 'SHIP DISPATCH',
    from: 'Packed',
    to: 'Shipped',
    by: 'Bruce'
  }, {
    time: 'Apr 17 04:16 PM',
    entity: 'HACO Dispatch',
    event: 'FINALIZE PACK',
    from: 'Created',
    to: 'Packed',
    by: 'Bruce'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      fontSize: 14,
      color: 'var(--fg1)'
    }
  }, "Event Ledger"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--fg3)'
    }
  }, "12,987 events"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 10,
      color: 'var(--sg-green)',
      fontWeight: 600
    }
  }, "\u25CF Live")), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--sg-off-white)'
    }
  }, ['Time', 'Entity', 'Event', 'Transition', 'By'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      padding: '8px 12px',
      textAlign: 'left',
      fontSize: 10,
      fontWeight: 700,
      color: 'var(--fg3)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      borderBottom: '1px solid var(--border)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, events.map((e, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 12px',
      color: 'var(--fg3)',
      fontSize: 11,
      whiteSpace: 'nowrap'
    }
  }, e.time), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 12px',
      color: 'var(--fg1)',
      fontWeight: 600,
      fontSize: 11
    }
  }, e.entity), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--sg-off-white)',
      padding: '2px 6px',
      borderRadius: 'var(--radius-sm)',
      fontSize: 10,
      fontWeight: 700,
      color: 'var(--fg1)',
      letterSpacing: '0.04em'
    }
  }, e.event)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 12px',
      fontSize: 11,
      color: 'var(--fg2)'
    }
  }, e.from, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg3)'
    }
  }, "\u2192"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--sg-off-white)',
      padding: '1px 5px',
      borderRadius: 'var(--radius-sm)',
      fontWeight: 600,
      color: 'var(--fg1)'
    }
  }, e.to)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 12px',
      fontSize: 11,
      color: 'var(--fg3)'
    }
  }, e.by))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 12px',
      fontSize: 10,
      color: 'var(--fg3)',
      borderTop: '1px solid var(--border)',
      textAlign: 'center'
    }
  }, "Immutable. Append-only. Every action permanent."));
}
function DemoVideo() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--fg2)',
      marginBottom: 20
    }
  }, "Watch one complete transaction. Start to finish. 60 seconds."), /*#__PURE__*/React.createElement("div", {
    className: "video-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "play-btn"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "6,3 20,12 6,21",
    fill: "currentColor"
  })))))));
}
window.DemoVideo = DemoVideo;
function CustomRules() {
  const scenarios = [{
    t: 'Your approval chain has exceptions',
    cond: '"POs over $10K need founder sign-off, but 3 trusted vendors get a higher limit"',
    out: 'Both rules enforced automatically. No multi-week change order, no consultant fees.'
  }, {
    t: 'Your QC works differently per buyer',
    cond: '"Retailer A needs 75% shelf life, Retailer B accepts 60%"',
    out: 'One rule per buyer. System blocks dispatch automatically if the product is too old for that buyer.'
  }, {
    t: 'Your rework goes to the original contractor',
    cond: '"QC fails 40 pieces; original contractor redoes it at no cost"',
    out: 'Rework auto-routes to the same contractor. Rate = $0. Done.'
  }, {
    t: 'Your shipments have size limits',
    cond: '"Buyer\'s dock handles 40 CBM, order is 55 CBM"',
    out: 'System splits into two shipments, generates two packing lists, updates the order. No manual work.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-dark",
    id: "rules",
    style: {
      background: '#0B0F17'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "YOUR PROCESS, ENFORCED"), /*#__PURE__*/React.createElement("h2", {
    className: "h2",
    style: {
      color: '#fff'
    }
  }, "Every factory has rules that only the people inside it understand."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 960,
      color: 'rgba(255,255,255,0.62)'
    }
  }, "Approval chains. Vendor exceptions. QC gates that differ per buyer. These rules live in your head, in messaging apps, in notebooks. In our system, they live in configuration - and the system enforces them automatically.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "pr-rows"
  }, scenarios.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "pr-row",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "pr-left"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pr-head"
  }, s.t), /*#__PURE__*/React.createElement("p", {
    className: "pr-cond"
  }, s.cond)), /*#__PURE__*/React.createElement("div", {
    className: "pr-arrow",
    "aria-hidden": "true"
  }, "\u2192"), /*#__PURE__*/React.createElement("p", {
    className: "pr-out"
  }, s.out)))))), /*#__PURE__*/React.createElement("style", null, `
        .pr-rows { margin-top: 40px; }
        .pr-row { display: grid; grid-template-columns: 1fr auto 1fr; gap: 40px; align-items: center; padding: 32px 0; border-top: 1px solid rgba(255,255,255,0.08); }
        .pr-row:first-child { border-top: 0; padding-top: 8px; }
        .pr-head { position: relative; padding-left: 16px; font-family: var(--font-heading); font-size: 20px; font-weight: 700; letter-spacing: -0.01em; color: rgba(255,255,255,0.96); margin: 0 0 10px; }
        .pr-head::before { content: ''; position: absolute; left: 0; top: 3px; bottom: 3px; width: 3px; border-radius: 2px; background: var(--sg-blue); }
        .pr-cond { padding-left: 16px; font-size: 15px; color: rgba(255,255,255,0.6); line-height: 1.55; margin: 0; }
        .pr-arrow { font-size: 40px; line-height: 1; color: var(--sg-blue); justify-self: center; }
        .pr-out { font-size: 15px; color: rgba(255,255,255,0.5); line-height: 1.6; margin: 0; }
        @media (max-width: 820px) {
          .pr-row { grid-template-columns: 1fr; gap: 16px; padding: 28px 0; }
          .pr-arrow { transform: rotate(90deg); font-size: 30px; justify-self: start; margin: 2px 0; }
        }
      `));
}
window.CustomRules = CustomRules;
function WhatYourTeamSees() {
  const hankLines = [{
    type: 'prompt',
    text: '> Received 200 sheets of 16-gauge steel from Midwest Supply'
  }, {
    type: 'response',
    text: '✓ PO-4521 matched. 200 sheets logged.\n  Inventory updated. Running rate recalculated.\n  Accounts payable increased by $14,200.'
  }];
  const queryLines = [{
    type: 'prompt',
    text: '> What\'s our pending dispatch for this week?'
  }, {
    type: 'response',
    text: '3 orders pending:\n• SO-4521 - 400 tables, due Thursday\n• SO-4533 - 200 chairs, due Friday\n• SO-4540 - 80 shelves, due Saturday'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-alt",
    id: "team"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "WHAT YOUR TEAM ACTUALLY DOES"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "No training day. Day one, your floor is logging in."), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "ERPs fail because the floor doesn't use them. SimpleGrid gets used because it talks like they do. Your floor staff type what happened, like sending a message. The system does everything else.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Talk to your factory like you'd text your team"), /*#__PURE__*/React.createElement("p", null, "Your warehouse manager types what happened. Same habit as texting. No codes. No menus. The system finds the PO, checks the quantity, updates inventory, fires all triggers, and confirms. One sentence in. Seven steps done.")), /*#__PURE__*/React.createElement(TypingDemo, {
    lines: hankLines
  }))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-row reverse"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Ask any question in plain English"), /*#__PURE__*/React.createElement("p", null, "No report builder. No filters. No IT request. Just type what you want to know. The system queries your live data and answers in seconds.")), /*#__PURE__*/React.createElement(TypingDemo, {
    lines: queryLines
  }))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Each person sees only what matters to them"), /*#__PURE__*/React.createElement("p", null, "Your warehouse manager sees inventory and receipts. Your planner sees orders and production. Your QC inspector sees quality checks. Your founder sees everything. No one gets confused by screens that aren't theirs.")), /*#__PURE__*/React.createElement(RolesVisual, null))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-row reverse"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Nothing disappears. Nothing can be changed."), /*#__PURE__*/React.createElement("p", null, "Every receipt, every approval, every dispatch - permanently recorded with who did it and when. Vendor says they delivered 500? Your system says 450, logged by Mike at 4:13 PM Tuesday. That's not a debate. That's a fact.")), /*#__PURE__*/React.createElement(LedgerVisual, null)))));
}
window.WhatYourTeamSees = WhatYourTeamSees;