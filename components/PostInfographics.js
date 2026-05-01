// Per-blog responsive content blocks. Each entry returns { mid: <node>, end: <node> }.
// Rendered by post.html's parseBlogBody. Visuals use shared infographic CSS in styles.css.

(function () {
  const C = {
    blue: 'var(--sg-blue)',
    blueLight: 'var(--sg-blue-light)',
    blueDark: 'var(--sg-blue-dark)',
    green: 'var(--sg-green)',
    gold: 'var(--sg-gold)',
    purple: 'var(--sg-purple)',
    red: 'var(--sg-red)',
    fg1: 'var(--fg1)',
    fg2: 'var(--fg2)',
    fg3: 'var(--fg3)',
    border: 'var(--border)',
    off: 'var(--sg-off-white)'
  };

  // Reusable wrapper: .pi (post infographic) - see styles.css
  function Block({
    tag,
    h,
    sub,
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-block"
    }, tag && /*#__PURE__*/React.createElement("div", {
      className: "pi-tag"
    }, tag), h && /*#__PURE__*/React.createElement("h3", {
      className: "pi-h"
    }, h), sub && /*#__PURE__*/React.createElement("p", {
      className: "pi-sub"
    }, sub), children);
  }
  function Bottom({
    big,
    p,
    accent
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-bottom",
      style: accent ? {
        background: accent
      } : undefined
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-bottom-big"
    }, big), p && /*#__PURE__*/React.createElement("p", null, p));
  }
  function StatGrid({
    items,
    cols
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-stat-grid",
      style: cols ? {
        gridTemplateColumns: `repeat(${cols}, 1fr)`
      } : undefined
    }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: 'pi-stat-card' + (it.cls ? ' ' + it.cls : '')
    }, it.kicker && /*#__PURE__*/React.createElement("div", {
      className: "pi-stat-kicker"
    }, it.kicker), /*#__PURE__*/React.createElement("div", {
      className: "pi-stat-num"
    }, it.num), /*#__PURE__*/React.createElement("div", {
      className: "pi-stat-label"
    }, it.label), it.note && /*#__PURE__*/React.createElement("div", {
      className: "pi-stat-note"
    }, it.note))));
  }
  function BeforeAfter({
    rows
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-ba"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-ba-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-ba-h pi-ba-before"
    }, "Before"), /*#__PURE__*/React.createElement("div", {
      className: "pi-ba-h pi-ba-after"
    }, "After")), rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "pi-ba-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-ba-cell pi-ba-before-cell"
    }, r.before), /*#__PURE__*/React.createElement("div", {
      className: "pi-ba-cell pi-ba-after-cell"
    }, r.after))));
  }
  function Cards({
    items,
    cols
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-cards",
      style: cols ? {
        gridTemplateColumns: `repeat(${cols}, 1fr)`
      } : undefined
    }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: 'pi-card' + (it.cls ? ' ' + it.cls : '')
    }, it.icon && /*#__PURE__*/React.createElement("div", {
      className: "pi-card-icon"
    }, it.icon), it.kicker && /*#__PURE__*/React.createElement("div", {
      className: "pi-card-kicker"
    }, it.kicker), /*#__PURE__*/React.createElement("div", {
      className: "pi-card-h"
    }, it.h), /*#__PURE__*/React.createElement("div", {
      className: "pi-card-b"
    }, it.b))));
  }
  function Quote({
    text,
    attr
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-quote"
    }, /*#__PURE__*/React.createElement("blockquote", null, text), attr && /*#__PURE__*/React.createElement("div", {
      className: "pi-quote-attr"
    }, attr));
  }

  // Interactive auto-playing chat demo (used by blog 7)
  function ChatDemo() {
    const queries = [{
      tier: 'Haiku',
      tierLabel: 'Fast tier · sub-second',
      text: 'How much 304 stainless do we have in stock?',
      tool: 'get_inventory',
      params: '{ material: "304 stainless" }',
      sql: 'SELECT qty, location FROM inventory_proj WHERE material = $1',
      result: '2,400 sheets · Warehouse B · updated 2 hr ago'
    }, {
      tier: 'Sonnet',
      tierLabel: 'Standard tier · analytical',
      text: 'Which vendor had the highest rejection rate this quarter?',
      tool: 'analyze_quality',
      params: '{ period: "Q4", group_by: "vendor" }',
      sql: 'SELECT vendor_id, AVG(reject_rate) FROM qc_events GROUP BY 1 ORDER BY 2 DESC',
      result: 'Midwest Supply · 4.2% · 42 events flagged'
    }, {
      tier: 'Opus',
      tierLabel: 'Heavy tier · multi-variable',
      text: 'Based on current orders and stock, what should we procure this week?',
      tool: 'plan_procurement',
      params: '{ horizon: "7d", constraints: "active" }',
      sql: 'WITH demand AS (...), stock AS (...), lead AS (...) SELECT vendor, item, qty ...',
      result: '12 items · $48K planned · 3 vendors · ready to confirm'
    }];
    const [active, setActive] = React.useState(0);
    const [phase, setPhase] = React.useState('typing');
    const [chars, setChars] = React.useState(0);
    const visible = usePageVisible();
    const q = queries[active];
    React.useEffect(() => {
      if (!visible) return;
      let t;
      if (phase === 'typing') {
        if (chars < q.text.length) {
          t = setTimeout(() => setChars(c => c + 1), 28);
        } else {
          t = setTimeout(() => setPhase('routing'), 550);
        }
      } else if (phase === 'routing') {
        t = setTimeout(() => setPhase('tool'), 700);
      } else if (phase === 'tool') {
        t = setTimeout(() => setPhase('sql'), 750);
      } else if (phase === 'sql') {
        t = setTimeout(() => setPhase('result'), 800);
      } else if (phase === 'result') {
        t = setTimeout(() => setPhase('pause'), 2800);
      } else if (phase === 'pause') {
        t = setTimeout(() => {
          setActive(a => (a + 1) % queries.length);
          setChars(0);
          setPhase('typing');
        }, 600);
      }
      return () => clearTimeout(t);
    }, [phase, chars, active, q.text.length, queries.length, visible]);
    const goto = i => {
      setActive(i);
      setChars(0);
      setPhase('typing');
    };
    const tiers = [{
      name: 'Haiku',
      label: 'Fast'
    }, {
      name: 'Sonnet',
      label: 'Standard'
    }, {
      name: 'Opus',
      label: 'Heavy'
    }];
    const tierActive = phase !== 'typing' && phase !== 'pause' ? q.tier : null;
    const showRoute = phase === 'routing' || phase === 'tool' || phase === 'sql' || phase === 'result';
    const showTool = phase === 'tool' || phase === 'sql' || phase === 'result';
    const showSql = phase === 'sql' || phase === 'result';
    const showResult = phase === 'result';
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-chat"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-chat-tiers"
    }, tiers.map(tt => /*#__PURE__*/React.createElement("div", {
      key: tt.name,
      className: 'pi-chat-tier' + (tierActive === tt.name ? ' active' : '')
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-chat-tier-dot"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "pi-chat-tier-name"
    }, tt.name), /*#__PURE__*/React.createElement("div", {
      className: "pi-chat-tier-sub"
    }, tt.label))))), /*#__PURE__*/React.createElement("div", {
      className: "pi-chat-window"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-chat-msg pi-chat-msg-user"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-chat-msg-tag"
    }, "User"), /*#__PURE__*/React.createElement("span", {
      className: "pi-chat-msg-body"
    }, q.text.slice(0, chars), /*#__PURE__*/React.createElement("span", {
      className: "pi-chat-cursor"
    }, "\u258D"))), /*#__PURE__*/React.createElement("div", {
      className: 'pi-chat-step pi-chat-route' + (showRoute ? ' show' : '')
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-chat-step-tag"
    }, "Route"), /*#__PURE__*/React.createElement("span", {
      className: "pi-chat-step-body"
    }, "\u2192 ", q.tier, " \xB7 ", q.tierLabel)), /*#__PURE__*/React.createElement("div", {
      className: 'pi-chat-step pi-chat-tool' + (showTool ? ' show' : '')
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-chat-step-tag"
    }, "Tool"), /*#__PURE__*/React.createElement("code", null, q.tool, "(", q.params, ")")), /*#__PURE__*/React.createElement("div", {
      className: 'pi-chat-step pi-chat-sql' + (showSql ? ' show' : '')
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-chat-step-tag"
    }, "SQL"), /*#__PURE__*/React.createElement("code", null, q.sql)), /*#__PURE__*/React.createElement("div", {
      className: 'pi-chat-msg pi-chat-msg-bot' + (showResult ? ' show' : '')
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-chat-msg-tag"
    }, "Hank"), /*#__PURE__*/React.createElement("span", {
      className: "pi-chat-msg-body"
    }, showResult ? q.result : ''))), /*#__PURE__*/React.createElement("div", {
      className: "pi-chat-dots"
    }, queries.map((qq, i) => /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      onClick: () => goto(i),
      className: 'pi-chat-dot' + (i === active ? ' active' : ''),
      "aria-label": 'Query ' + (i + 1)
    }))));
  }

  // Interactive event-ledger demo (used by blog 1)
  function EventLedger() {
    const events = [{
      id: 1,
      time: 'Jan 15 · 10:30',
      action: 'PO-122 created',
      actor: 'Sarah',
      detail: 'Vendor: Midwest Supply · Qty ordered: 500'
    }, {
      id: 2,
      time: 'Jan 16 · 14:15',
      action: 'PO-122 approved',
      actor: 'James (founder)',
      detail: 'All line items frozen at this quantity'
    }, {
      id: 3,
      time: 'Jan 25 · 09:00',
      action: 'PO-122 received 300 units',
      actor: 'Mike (warehouse)',
      detail: '+300 to inventory · running rate updated'
    }, {
      id: 4,
      time: 'Feb 02 · 11:00',
      action: 'PO-122 received 100 units',
      actor: 'Mike (warehouse)',
      detail: '+100 to inventory · status → Partially Received'
    }];
    const [count, setCount] = React.useState(0);
    const [tick, setTick] = React.useState(0); // bumped by Replay to interrupt the running schedule
    const visible = usePageVisible();
    React.useEffect(() => {
      if (!visible) return;
      let t;
      if (count < events.length) {
        t = setTimeout(() => setCount(c => c + 1), count === 0 ? 900 : 1700);
      } else {
        t = setTimeout(() => setCount(0), 4200);
      }
      return () => clearTimeout(t);
    }, [count, tick, events.length, visible]);
    const replay = () => {
      setCount(0);
      setTick(v => v + 1);
    };
    let qtyReceived = 0;
    events.slice(0, count).forEach(e => {
      const m = e.action.match(/received (\d+) units/);
      if (m) qtyReceived += parseInt(m[1], 10);
    });
    let status = 'Draft';
    if (count >= 1) status = 'Open';
    if (count >= 2) status = 'Approved';
    if (count >= 3) status = 'Partially Received';
    if (qtyReceived >= 500) status = 'Received';
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-evd"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-evd-cols"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-evd-col pi-evd-state-col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-evd-col-h"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-evd-tag pi-evd-tag-red"
    }, "Traditional ERP"), /*#__PURE__*/React.createElement("h4", null, "Stores state. Overwrites it.")), /*#__PURE__*/React.createElement("div", {
      className: "pi-evd-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-evd-card-id"
    }, "PO-122"), /*#__PURE__*/React.createElement("div", {
      className: "pi-evd-card-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-evd-card-k"
    }, "Vendor"), /*#__PURE__*/React.createElement("span", {
      className: "pi-evd-card-v"
    }, "Midwest Supply")), /*#__PURE__*/React.createElement("div", {
      className: "pi-evd-card-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-evd-card-k"
    }, "Ordered"), /*#__PURE__*/React.createElement("span", {
      className: "pi-evd-card-v"
    }, "500")), /*#__PURE__*/React.createElement("div", {
      className: "pi-evd-card-row pi-evd-card-row-live"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-evd-card-k"
    }, "Received"), /*#__PURE__*/React.createElement("span", {
      className: "pi-evd-card-v pi-evd-card-num",
      key: qtyReceived
    }, qtyReceived)), /*#__PURE__*/React.createElement("div", {
      className: "pi-evd-card-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-evd-card-k"
    }, "Status"), /*#__PURE__*/React.createElement("span", {
      className: "pi-evd-card-v pi-evd-card-status",
      key: status
    }, status))), /*#__PURE__*/React.createElement("div", {
      className: "pi-evd-warn"
    }, /*#__PURE__*/React.createElement("strong", null, "History?"), " Not stored. When 300 became 400, the 300 was overwritten and is gone forever.")), /*#__PURE__*/React.createElement("div", {
      className: "pi-evd-col pi-evd-events-col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-evd-col-h"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-evd-tag pi-evd-tag-blue"
    }, "SimpleGrid"), /*#__PURE__*/React.createElement("h4", null, "Stores events. Appends forever.")), /*#__PURE__*/React.createElement("div", {
      className: "pi-evd-list"
    }, count === 0 && /*#__PURE__*/React.createElement("div", {
      className: "pi-evd-empty"
    }, "Waiting for the first event\u2026"), events.slice(0, count).map(e => /*#__PURE__*/React.createElement("div", {
      key: e.id,
      className: "pi-evd-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-evd-item-head"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-evd-item-num"
    }, "E", e.id), /*#__PURE__*/React.createElement("span", {
      className: "pi-evd-item-time"
    }, e.time)), /*#__PURE__*/React.createElement("div", {
      className: "pi-evd-item-action"
    }, e.action), /*#__PURE__*/React.createElement("div", {
      className: "pi-evd-item-detail"
    }, e.detail), /*#__PURE__*/React.createElement("div", {
      className: "pi-evd-item-actor"
    }, "Actor: ", e.actor)))), /*#__PURE__*/React.createElement("div", {
      className: "pi-evd-foot"
    }, "Append-only \xB7 immutable \xB7 ", count, "/", events.length, " events"))), /*#__PURE__*/React.createElement("div", {
      className: "pi-evd-controls"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-evd-progress"
    }, events.map((_, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: 'pi-evd-progress-step' + (i < count ? ' done' : '')
    }))), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "pi-evd-replay",
      onClick: replay
    }, "\u21BB Replay")));
  }

  // ===== Reusable hook: pause when the page is hidden =====
  function usePageVisible() {
    const [visible, setVisible] = React.useState(typeof document === 'undefined' ? true : !document.hidden);
    React.useEffect(() => {
      const onChange = () => setVisible(!document.hidden);
      document.addEventListener('visibilitychange', onChange);
      return () => document.removeEventListener('visibilitychange', onChange);
    }, []);
    return visible;
  }

  // ===== Reusable hook: auto-cycler (pauses when tab is hidden) =====
  function useAutoCycle(length, delay) {
    const [i, setI] = React.useState(0);
    const visible = usePageVisible();
    React.useEffect(() => {
      if (!visible) return;
      const t = setTimeout(() => setI(v => (v + 1) % length), delay);
      return () => clearTimeout(t);
    }, [i, length, delay, visible]);
    return [i, setI];
  }

  // ===== Blog 2 - GridSpec: same word, different operational boundaries =====
  function DomainMorph() {
    const ctx = [{
      name: 'Sales',
      color: 'blue',
      entity: "Buyer's Order",
      fields: [{
        k: 'Buyer',
        v: 'West Elm'
      }, {
        k: 'Price',
        v: '$48,200'
      }, {
        k: 'Delivery',
        v: 'Mar 15'
      }, {
        k: 'Lines',
        v: '12 SKUs'
      }],
      rule: 'Approval freezes price + delivery date'
    }, {
      name: 'Production',
      color: 'purple',
      entity: 'Job Order',
      fields: [{
        k: 'Components',
        v: '22 per SKU'
      }, {
        k: 'Wood',
        v: 'Mango · Sheesham · Teak'
      }, {
        k: 'Stage',
        v: 'Machining'
      }, {
        k: 'Worker',
        v: 'Ravi & Co.'
      }],
      rule: 'Cannot start without component plan'
    }, {
      name: 'Stores',
      color: 'green',
      entity: 'Vendor PO',
      fields: [{
        k: 'Vendor',
        v: 'Shree Timber'
      }, {
        k: 'Material',
        v: '500 CFT mango'
      }, {
        k: 'Receipt',
        v: '300 of 500'
      }, {
        k: 'AP',
        v: 'Open · 60 days'
      }],
      rule: 'Cannot receive more than ordered'
    }];
    const [i, setI] = useAutoCycle(ctx.length, 3500);
    const c = ctx[i];
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-dom"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-dom-tabs"
    }, ctx.map((cc, j) => /*#__PURE__*/React.createElement("button", {
      key: j,
      type: "button",
      onClick: () => setI(j),
      className: 'pi-dom-tab pi-dom-' + cc.color + (i === j ? ' active' : '')
    }, cc.name, " boundary"))), /*#__PURE__*/React.createElement("div", {
      className: "pi-dom-stage"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-dom-word"
    }, "\"order\""), /*#__PURE__*/React.createElement("div", {
      className: "pi-dom-arrow"
    }, "\u2193 in this context, becomes \u2193"), /*#__PURE__*/React.createElement("div", {
      className: 'pi-dom-entity pi-dom-' + c.color,
      key: 'e' + i
    }, c.entity), /*#__PURE__*/React.createElement("div", {
      className: "pi-dom-fields",
      key: 'f' + i
    }, c.fields.map((f, j) => /*#__PURE__*/React.createElement("div", {
      key: j,
      className: "pi-dom-field",
      style: {
        animationDelay: j * 90 + 'ms'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-dom-fk"
    }, f.k), /*#__PURE__*/React.createElement("div", {
      className: "pi-dom-fv"
    }, f.v)))), /*#__PURE__*/React.createElement("div", {
      className: 'pi-dom-rule pi-dom-rule-' + c.color,
      key: 'r' + i
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-dom-rule-tag"
    }, "RULE"), " ", c.rule)));
  }

  // ===== Blog 3 - Entity groups: root + members =====
  function AggregateDemo() {
    const phases = [{
      label: 'Draft',
      root: 'idle',
      members: ['idle', 'idle', 'idle'],
      note: 'All members consistent. Nothing approved yet.'
    }, {
      label: 'Approving root…',
      root: 'pulse',
      members: ['idle', 'idle', 'idle'],
      note: 'Approve action fires on the root.'
    }, {
      label: 'Approved',
      root: 'green',
      members: ['green', 'green', 'green'],
      note: 'All line items moved with the root. The entity group is consistent.'
    }, {
      label: 'Try to modify line 2 alone',
      root: 'green',
      members: ['green', 'reject', 'green'],
      note: 'Members can only be changed through the root. The boundary prevents impossible states.'
    }];
    const [i] = useAutoCycle(phases.length, 2400);
    const p = phases[i];
    const mClass = s => 'pi-agg-member pi-agg-' + s;
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-agg"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-agg-stage"
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 440 260",
      preserveAspectRatio: "none",
      className: "pi-agg-svg"
    }, /*#__PURE__*/React.createElement("ellipse", {
      cx: "220",
      cy: "135",
      rx: "155",
      ry: "100",
      fill: "none",
      stroke: "rgba(74,123,247,0.35)",
      strokeWidth: "1.5",
      strokeDasharray: "5 4",
      vectorEffect: "non-scaling-stroke"
    }), /*#__PURE__*/React.createElement("text", {
      x: "220",
      y: "36",
      textAnchor: "middle",
      fontSize: "9",
      fill: "var(--sg-blue)",
      fontWeight: "700",
      letterSpacing: "2"
    }, "ENTITY BOUNDARY"), [[145, 90], [295, 90], [145, 180]].map(([x, y], j) => /*#__PURE__*/React.createElement("line", {
      key: j,
      x1: "220",
      y1: "130",
      x2: x,
      y2: y,
      stroke: "rgba(0,0,0,0.18)",
      strokeWidth: "1.5",
      vectorEffect: "non-scaling-stroke"
    })), /*#__PURE__*/React.createElement("line", {
      x1: "320",
      y1: "180",
      x2: "395",
      y2: "180",
      stroke: "var(--fg3)",
      strokeWidth: "1",
      strokeDasharray: "3 3",
      vectorEffect: "non-scaling-stroke"
    }), /*#__PURE__*/React.createElement("text", {
      x: "395",
      y: "174",
      fontSize: "9",
      fill: "var(--fg3)",
      fontWeight: "700",
      textAnchor: "end"
    }, "JO-1187"), /*#__PURE__*/React.createElement("text", {
      x: "395",
      y: "188",
      fontSize: "8",
      fill: "var(--fg3)",
      textAnchor: "end"
    }, "reference, not nested")), /*#__PURE__*/React.createElement("div", {
      className: 'pi-agg-root pi-agg-' + p.root
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-agg-root-tag"
    }, "ROOT"), /*#__PURE__*/React.createElement("div", {
      className: "pi-agg-root-id"
    }, "SO-4521")), [{
      name: 'Dining tables',
      qty: '200',
      pos: 'tl'
    }, {
      name: 'Side chairs',
      qty: '150',
      pos: 'tr'
    }, {
      name: 'Bookshelves',
      qty: '80',
      pos: 'bl'
    }].map((m, j) => /*#__PURE__*/React.createElement("div", {
      key: j,
      className: mClass(p.members[j]) + ' pi-agg-' + m.pos
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-agg-member-name"
    }, m.name), /*#__PURE__*/React.createElement("div", {
      className: "pi-agg-member-qty"
    }, m.qty)))), /*#__PURE__*/React.createElement("div", {
      className: "pi-agg-controls"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-agg-phase"
    }, phases.map((ph, j) => /*#__PURE__*/React.createElement("div", {
      key: j,
      className: 'pi-agg-phase-pill' + (i === j ? ' active' : '') + (i > j ? ' done' : '')
    }, j + 1))), /*#__PURE__*/React.createElement("div", {
      className: "pi-agg-label"
    }, p.label)), /*#__PURE__*/React.createElement("div", {
      className: "pi-agg-note"
    }, p.note));
  }

  // ===== Blog 4 - Multi-tenant: shared platform, isolated DBs =====
  function TenantDemo() {
    const clients = [{
      name: 'Apex Apparel',
      color: 'blue'
    }, {
      name: 'Elite Arts',
      color: 'purple'
    }, {
      name: 'Pharma Co.',
      color: 'green'
    }, {
      name: 'Stamping Inc.',
      color: 'gold'
    }];
    const [active] = useAutoCycle(clients.length, 2400);
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-tenant"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-tenant-platform"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-tenant-platform-tag"
    }, "SHARED PLATFORM"), /*#__PURE__*/React.createElement("div", {
      className: "pi-tenant-platform-h"
    }, "SimpleGrid \xB7 one application, one codebase")), /*#__PURE__*/React.createElement("div", {
      className: "pi-tenant-pipes"
    }, clients.map((cl, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: 'pi-tenant-pipe' + (i === active ? ' active' : '')
    }))), /*#__PURE__*/React.createElement("div", {
      className: "pi-tenant-dbs"
    }, clients.map((cl, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: 'pi-tenant-db pi-tenant-db-' + cl.color + (i === active ? ' active' : ' locked')
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-tenant-db-icon"
    }, "\u26C1"), /*#__PURE__*/React.createElement("div", {
      className: "pi-tenant-db-name"
    }, cl.name), /*#__PURE__*/React.createElement("div", {
      className: "pi-tenant-db-state"
    }, i === active ? 'query routing' : '🔒 isolated')))), /*#__PURE__*/React.createElement("div", {
      className: "pi-tenant-foot"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-tenant-pulse"
    }), /*#__PURE__*/React.createElement("span", null, "Right now: query from ", /*#__PURE__*/React.createElement("strong", null, clients[active].name), " hits only ", /*#__PURE__*/React.createElement("strong", null, "their database"), ". No other DB is reachable.")));
  }

  // ===== Blog 5 - Customization in minutes =====
  function RuleAddDemo() {
    const phases = [{
      label: 'Founder request received',
      t: '0s'
    }, {
      label: 'Open approval_rules table',
      t: '8s'
    }, {
      label: 'New row added',
      t: '22s'
    }, {
      label: 'Rule active · next dispatch routes to QC',
      t: '30s'
    }];
    const [step] = useAutoCycle(phases.length, 1700);
    const rows = [{
      cond: 'amount > $10,000',
      then: 'require founder approval',
      age: 'existing'
    }, {
      cond: 'vendor is new',
      then: 'require founder approval',
      age: 'existing'
    }, {
      cond: 'qty > stock × 1.5',
      then: 'require ops head approval',
      age: 'existing'
    }, {
      cond: 'dispatch_amount > $5,000',
      then: 'require QC head approval',
      age: 'new'
    }];
    const visibleRows = step >= 2 ? rows : rows.slice(0, 3);
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-rule"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-rule-request"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-rule-request-tag"
    }, "FOUNDER \xB7 09:42"), /*#__PURE__*/React.createElement("div", {
      className: "pi-rule-request-body"
    }, "\"Starting next week, we need QC approval before any dispatch over $5,000.\"")), /*#__PURE__*/React.createElement("div", {
      className: "pi-rule-table"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-rule-table-h"
    }, /*#__PURE__*/React.createElement("div", null, "Condition"), /*#__PURE__*/React.createElement("div", null, "Then"), /*#__PURE__*/React.createElement("div", null, "Status")), visibleRows.map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: 'pi-rule-row' + (r.age === 'new' ? ' pi-rule-row-new' : '')
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-rule-cond"
    }, /*#__PURE__*/React.createElement("code", null, r.cond)), /*#__PURE__*/React.createElement("div", {
      className: "pi-rule-then"
    }, r.then), /*#__PURE__*/React.createElement("div", {
      className: "pi-rule-status"
    }, r.age === 'new' ? '● live' : '● live')))), /*#__PURE__*/React.createElement("div", {
      className: "pi-rule-foot"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-rule-progress"
    }, phases.map((ph, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: 'pi-rule-progress-step' + (step >= i ? ' done' : '')
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-rule-progress-t"
    }, ph.t), /*#__PURE__*/React.createElement("span", {
      className: "pi-rule-progress-l"
    }, ph.label))))), /*#__PURE__*/React.createElement("div", {
      className: "pi-rule-compare"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-rule-compare-card pi-rule-compare-bad"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-rule-compare-h"
    }, "Traditional ERP"), /*#__PURE__*/React.createElement("div", {
      className: "pi-rule-compare-v"
    }, "$8K\u2013$20K \xB7 3\u20136 weeks")), /*#__PURE__*/React.createElement("div", {
      className: "pi-rule-compare-card pi-rule-compare-good"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-rule-compare-h"
    }, "SimpleGrid"), /*#__PURE__*/React.createElement("div", {
      className: "pi-rule-compare-v"
    }, "$0 \xB7 ", step >= 3 ? '30 seconds' : '…'))));
  }

  // ===== Blog 6 - Module vs Domain (same request, two paths) =====
  function ModuleVsDomainDemo() {
    const phases = ['request', 'm1', 'm2', 'm3', 'm4', 'done'];
    const [step] = useAutoCycle(phases.length, 1500);
    const visible = s => phases.indexOf(phases[step]) >= phases.indexOf(s);
    const moduleSteps = [{
      p: 'm1',
      t: 'Scoping call',
      sub: 'Vendor consultant maps to modules'
    }, {
      p: 'm2',
      t: 'Change order',
      sub: '$15K · 4 weeks scoped'
    }, {
      p: 'm3',
      t: 'Dev work',
      sub: 'Edit Production module + Dispatch module'
    }, {
      p: 'm4',
      t: 'Deploy + retest',
      sub: '4 weeks elapsed · risk to other customizations'
    }];
    const domainSteps = [{
      p: 'm1',
      t: 'Open rules table',
      sub: 'Read existing rules'
    }, {
      p: 'm2',
      t: 'Add a row',
      sub: 'qty + state condition'
    }, {
      p: 'm3',
      t: 'Engine reads it',
      sub: 'Configuration picked up live'
    }, {
      p: 'm4',
      t: 'Done',
      sub: '2 minutes elapsed · zero code'
    }];
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-mvd"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-mvd-request"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-mvd-request-tag"
    }, "REQUEST"), /*#__PURE__*/React.createElement("span", null, "\"Add QC approval before dispatch on items over $5,000\"")), /*#__PURE__*/React.createElement("div", {
      className: "pi-mvd-cols"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-mvd-col pi-mvd-col-bad"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-mvd-col-h"
    }, "Module-based ERP"), /*#__PURE__*/React.createElement("div", {
      className: "pi-mvd-steps"
    }, moduleSteps.map((s, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: 'pi-mvd-step' + (visible(s.p) ? ' show' : '')
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-mvd-step-n"
    }, i + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "pi-mvd-step-t"
    }, s.t), /*#__PURE__*/React.createElement("div", {
      className: "pi-mvd-step-s"
    }, s.sub))))), /*#__PURE__*/React.createElement("div", {
      className: "pi-mvd-result pi-mvd-result-bad"
    }, "$15,000 \xB7 4 weeks")), /*#__PURE__*/React.createElement("div", {
      className: "pi-mvd-col pi-mvd-col-good"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-mvd-col-h"
    }, "GridSpec (SimpleGrid)"), /*#__PURE__*/React.createElement("div", {
      className: "pi-mvd-steps"
    }, domainSteps.map((s, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: 'pi-mvd-step' + (visible(s.p) ? ' show' : '')
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-mvd-step-n"
    }, i + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "pi-mvd-step-t"
    }, s.t), /*#__PURE__*/React.createElement("div", {
      className: "pi-mvd-step-s"
    }, s.sub))))), /*#__PURE__*/React.createElement("div", {
      className: "pi-mvd-result pi-mvd-result-good"
    }, "$0 \xB7 2 minutes"))));
  }

  // ===== Blog 8 - Form vs chat (live timer) =====
  function FormVsChatDemo() {
    const [tick, setTick] = React.useState(0);
    const visible = usePageVisible();
    React.useEffect(() => {
      if (!visible) return;
      const t = setInterval(() => setTick(v => (v + 1) % 130), 110);
      return () => clearInterval(t);
    }, [visible]);
    const formSteps = ['Procurement', 'Purchase Orders', 'Select PO', 'Click Receive', 'Enter Qty', 'Select Unit', 'Select Location', 'Review', 'Confirm', 'Print GRN'];
    const formActive = Math.min(formSteps.length - 1, Math.floor(tick / 9));
    const chatText = 'Got 200 sheets of 16-gauge steel from Midwest Supply.';
    const chatChars = Math.min(chatText.length, Math.max(0, tick - 8) * 2);
    const formTime = Math.min(120, tick).toFixed(0) + 's';
    const chatDone = chatChars >= chatText.length;
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-fvc"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-fvc-cols"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-fvc-col pi-fvc-form"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-fvc-col-h"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-fvc-tag pi-fvc-tag-red"
    }, "Form-based"), /*#__PURE__*/React.createElement("span", {
      className: "pi-fvc-time"
    }, formTime)), /*#__PURE__*/React.createElement("div", {
      className: "pi-fvc-form-trail"
    }, formSteps.map((s, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      className: 'pi-fvc-form-crumb' + (i <= formActive ? ' visited' : '') + (i === formActive ? ' active' : '')
    }, s))), /*#__PURE__*/React.createElement("div", {
      className: "pi-fvc-form-screen"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-fvc-form-label"
    }, formSteps[formActive]), /*#__PURE__*/React.createElement("div", {
      className: "pi-fvc-form-body"
    }, "\u2026clicking\u2026"))), /*#__PURE__*/React.createElement("div", {
      className: "pi-fvc-col pi-fvc-chat"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-fvc-col-h"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-fvc-tag pi-fvc-tag-blue"
    }, "Conversational"), /*#__PURE__*/React.createElement("span", {
      className: "pi-fvc-time"
    }, chatDone ? '10s' : Math.min(10, tick).toFixed(0) + 's')), /*#__PURE__*/React.createElement("div", {
      className: "pi-fvc-chat-bubble pi-fvc-chat-user"
    }, chatText.slice(0, chatChars), /*#__PURE__*/React.createElement("span", {
      className: "pi-fvc-cursor"
    }, "\u258D")), /*#__PURE__*/React.createElement("div", {
      className: 'pi-fvc-chat-bubble pi-fvc-chat-bot' + (chatDone ? ' show' : '')
    }, "\u2713 200 sheets received \xB7 PO-4521 \xB7 inventory updated"))), /*#__PURE__*/React.createElement("div", {
      className: "pi-fvc-foot"
    }, "12\xD7 clicks vs. 1\xD7 sentence. Same data captured."));
  }

  // ===== Blog 9 - Cost stack builder =====
  function CostStackDemo() {
    const layers = [{
      name: 'Wood (per component)',
      pct: 46,
      color: 'blue'
    }, {
      name: 'Contractor labor (stages)',
      pct: 28,
      color: 'purple'
    }, {
      name: 'Rejection cost',
      pct: 12,
      color: 'gold'
    }, {
      name: 'Rework',
      pct: 6,
      color: 'red'
    }, {
      name: 'Overhead allocation',
      pct: 8,
      color: 'green'
    }];
    const [count, setCount] = React.useState(0);
    const visible = usePageVisible();
    React.useEffect(() => {
      if (!visible) return;
      let t;
      if (count <= layers.length) {
        t = setTimeout(() => setCount(c => c + 1), count === 0 ? 600 : 900);
      } else {
        t = setTimeout(() => setCount(0), 3500);
      }
      return () => clearTimeout(t);
    }, [count, visible]);
    const visibleLayers = layers.slice(0, count);
    const totalPct = visibleLayers.reduce((s, l) => s + l.pct, 0);
    const sellingPrice = 100;
    const cost = totalPct;
    const margin = sellingPrice - cost;
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-cost"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-cost-stage"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-cost-bars"
    }, layers.map((l, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: 'pi-cost-bar pi-cost-' + l.color + (i < count ? ' show' : ''),
      style: {
        height: 'calc(' + l.pct * 1.9 + '% + 24px)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-cost-bar-label"
    }, l.name), /*#__PURE__*/React.createElement("span", {
      className: "pi-cost-bar-pct"
    }, l.pct, "%")))), /*#__PURE__*/React.createElement("div", {
      className: "pi-cost-totals"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-cost-total-row"
    }, /*#__PURE__*/React.createElement("span", null, "Selling price"), /*#__PURE__*/React.createElement("span", {
      className: "pi-cost-mono"
    }, "$", sellingPrice)), /*#__PURE__*/React.createElement("div", {
      className: "pi-cost-total-row"
    }, /*#__PURE__*/React.createElement("span", null, "Total cost"), /*#__PURE__*/React.createElement("span", {
      className: "pi-cost-mono pi-cost-cost"
    }, "$", cost)), /*#__PURE__*/React.createElement("div", {
      className: "pi-cost-total-row pi-cost-total-margin"
    }, /*#__PURE__*/React.createElement("span", null, "SKU margin"), /*#__PURE__*/React.createElement("span", {
      className: "pi-cost-mono pi-cost-margin"
    }, "$", margin)), /*#__PURE__*/React.createElement("div", {
      className: "pi-cost-meter"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-cost-meter-fill",
      style: {
        width: cost + '%'
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "pi-cost-foot"
    }, count <= layers.length ? `Building cost stack… ${count}/${layers.length} layers` : `Real margin per SKU. For every product. Real time.`))));
  }

  // ===== Blog 10 - "Would this work on the floor?" filter =====
  function FloorFilterDemo() {
    const ideas = [{
      idea: 'Add a feature flag for new approval workflows',
      ans: 'no',
      reason: 'Adds complexity to the floor staff. Skip.'
    }, {
      idea: 'Let storekeeper say "Got 300 planks from Shree Timber"',
      ans: 'yes',
      reason: 'Same behavior they already do on WhatsApp. Build it.'
    }, {
      idea: 'Build a "Settings → Advanced → Power user" panel',
      ans: 'no',
      reason: 'Complexity for 2% of users. Solve through configuration.'
    }, {
      idea: 'Auto-route POs above $10K to the founder',
      ans: 'yes',
      reason: 'Removes a manual step. Floor benefits. Build it.'
    }, {
      idea: 'Add competitor parity on a feature nobody asked for',
      ans: 'no',
      reason: 'Roadmap noise. Skip.'
    }];
    const [i] = useAutoCycle(ideas.length, 2600);
    const it = ideas[i];
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-floor"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-floor-q"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-floor-q-tag"
    }, "THE FILTER"), /*#__PURE__*/React.createElement("div", {
      className: "pi-floor-q-text"
    }, "\"Would this work on the floor?\"")), /*#__PURE__*/React.createElement("div", {
      className: "pi-floor-stage",
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-floor-idea"
    }, it.idea), /*#__PURE__*/React.createElement("div", {
      className: 'pi-floor-stamp pi-floor-stamp-' + it.ans
    }, it.ans === 'yes' ? '✓ BUILD' : '✗ SKIP'), /*#__PURE__*/React.createElement("div", {
      className: "pi-floor-reason"
    }, it.reason)), /*#__PURE__*/React.createElement("div", {
      className: "pi-floor-dots"
    }, ideas.map((_, j) => /*#__PURE__*/React.createElement("span", {
      key: j,
      className: 'pi-floor-dot' + (j === i ? ' active' : '')
    }))));
  }

  // ===== Blog 11 - Mid-market squeeze =====
  function MidMarketSqueeze() {
    const [pulse, setPulse] = React.useState(0);
    const visible = usePageVisible();
    React.useEffect(() => {
      if (!visible) return;
      const t = setInterval(() => setPulse(p => (p + 1) % 3), 1100);
      return () => clearInterval(t);
    }, [visible]);
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-mm"
    }, /*#__PURE__*/React.createElement("div", {
      className: 'pi-mm-tier pi-mm-top' + (pulse === 0 ? ' active' : '')
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-mm-tier-label"
    }, "ENTERPRISE"), /*#__PURE__*/React.createElement("div", {
      className: "pi-mm-tier-h"
    }, "SAP \xB7 Oracle \xB7 Infor"), /*#__PURE__*/React.createElement("div", {
      className: "pi-mm-tier-sub"
    }, "$500K min \xB7 18 months \xB7 consulting army")), /*#__PURE__*/React.createElement("div", {
      className: "pi-mm-arrow pi-mm-arrow-down"
    }, "\u2193 pushing down \u2193"), /*#__PURE__*/React.createElement("div", {
      className: 'pi-mm-tier pi-mm-mid' + (pulse === 2 ? ' active' : '')
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-mm-tier-label pi-mm-here"
    }, "YOU ARE HERE"), /*#__PURE__*/React.createElement("div", {
      className: "pi-mm-tier-h"
    }, "Mid-market manufacturer"), /*#__PURE__*/React.createElement("div", {
      className: "pi-mm-tier-sub"
    }, "50\u20131,500 employees \xB7 diverse operations \xB7 founder buys, not CIO"), /*#__PURE__*/React.createElement("div", {
      className: "pi-mm-needs"
    }, /*#__PURE__*/React.createElement("span", null, "Deploy in days"), /*#__PURE__*/React.createElement("span", null, "Match how we work"), /*#__PURE__*/React.createElement("span", null, "Floor staff usable"), /*#__PURE__*/React.createElement("span", null, "See before paying"), /*#__PURE__*/React.createElement("span", null, "No change-order tax"))), /*#__PURE__*/React.createElement("div", {
      className: "pi-mm-arrow pi-mm-arrow-up"
    }, "\u2191 pushing up \u2191"), /*#__PURE__*/React.createElement("div", {
      className: 'pi-mm-tier pi-mm-bot' + (pulse === 1 ? ' active' : '')
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-mm-tier-label"
    }, "SMALL BUSINESS"), /*#__PURE__*/React.createElement("div", {
      className: "pi-mm-tier-h"
    }, "QuickBooks \xB7 Xero \xB7 Wave"), /*#__PURE__*/React.createElement("div", {
      className: "pi-mm-tier-sub"
    }, "Invoicing only \xB7 no production stages or contractor settlements")));
  }

  // ===== Blog 12 - Spreadsheet chaos =====
  function SpreadsheetChaos() {
    const tabs = ['Orders', 'Inventory', 'Production', 'AP', 'Vendors', 'QC', 'Dispatch', 'Payroll', 'Costing', 'Plan v2', 'Plan v3', 'Master', 'WIP', 'Ad-hoc', '#REF!'];
    const [phase, setPhase] = React.useState('chaos');
    const [shake, setShake] = React.useState(0);
    const visible = usePageVisible();
    React.useEffect(() => {
      if (!visible) return;
      let t;
      if (phase === 'chaos') {
        t = setInterval(() => setShake(s => s + 1), 220);
        const switcher = setTimeout(() => {
          setPhase('consolidate');
        }, 4000);
        return () => {
          clearInterval(t);
          clearTimeout(switcher);
        };
      } else {
        t = setTimeout(() => {
          setPhase('chaos');
          setShake(0);
        }, 3500);
        return () => clearTimeout(t);
      }
    }, [phase, visible]);
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-ss"
    }, /*#__PURE__*/React.createElement("div", {
      className: 'pi-ss-stage pi-ss-' + phase
    }, phase === 'chaos' && tabs.map((t, i) => {
      // Position tabs by their CENTER inside a safe inner box (10% – 90% × 12% – 78%)
      // so the 110×78px card never clips the right or bottom edge.
      const cx = 10 + (i * 47 + shake * 11) % 80;
      const cy = 12 + (i * 31 + shake * 7) % 66;
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: "pi-ss-tab",
        style: {
          left: cx + '%',
          top: cy + '%',
          transform: `translate(-50%, -50%) rotate(${i % 7 - 3}deg)`,
          animationDelay: i * 50 + 'ms'
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "pi-ss-tab-name"
      }, t, ".xlsx"), /*#__PURE__*/React.createElement("div", {
        className: "pi-ss-tab-grid"
      }, Array.from({
        length: 9
      }).map((_, k) => /*#__PURE__*/React.createElement("span", {
        key: k
      }))));
    }), phase === 'consolidate' && /*#__PURE__*/React.createElement("div", {
      className: "pi-ss-replace"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-ss-replace-h"
    }, "SimpleGrid"), /*#__PURE__*/React.createElement("div", {
      className: "pi-ss-replace-sub"
    }, "One live view \xB7 all 15 sheets replaced"), /*#__PURE__*/React.createElement("div", {
      className: "pi-ss-replace-stats"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "1"), "system"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "0"), "reconciliations"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "500h"), "/yr saved")))), /*#__PURE__*/React.createElement("div", {
      className: "pi-ss-caption"
    }, phase === 'chaos' ? 'Most factories run on 12–20 interlocking spreadsheets.' : 'One live system. Same data. Without the chaos.'));
  }

  // ===== Blog 13 - Change-order counter =====
  function ChangeOrderCounter() {
    const events = [{
      yr: 'Year 1, Q1',
      label: 'New approval rule',
      cost: 12000
    }, {
      yr: 'Year 1, Q2',
      label: 'New report',
      cost: 8000
    }, {
      yr: 'Year 1, Q3',
      label: 'New workflow',
      cost: 15000
    }, {
      yr: 'Year 2, Q1',
      label: 'New user role',
      cost: 9000
    }, {
      yr: 'Year 2, Q2',
      label: 'New integration',
      cost: 18000
    }, {
      yr: 'Year 2, Q3',
      label: 'Legacy customization patch',
      cost: 22000
    }, {
      yr: 'Year 3, Q1',
      label: 'New dispatch rule',
      cost: 11000
    }, {
      yr: 'Year 3, Q2',
      label: 'New report (broken upgrade)',
      cost: 14000
    }];
    const [count, setCount] = React.useState(0);
    const visible = usePageVisible();
    React.useEffect(() => {
      if (!visible) return;
      let t;
      if (count < events.length) {
        t = setTimeout(() => setCount(c => c + 1), count === 0 ? 600 : 850);
      } else {
        t = setTimeout(() => setCount(0), 3000);
      }
      return () => clearTimeout(t);
    }, [count, visible]);
    const total = events.slice(0, count).reduce((s, e) => s + e.cost, 0);
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-co"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-co-cols"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-co-col pi-co-col-bad"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-co-col-h"
    }, "Traditional ERP"), /*#__PURE__*/React.createElement("div", {
      className: "pi-co-counter"
    }, "$", total.toLocaleString()), /*#__PURE__*/React.createElement("div", {
      className: "pi-co-counter-sub"
    }, "in change orders, so far"), /*#__PURE__*/React.createElement("div", {
      className: "pi-co-events"
    }, events.slice(0, count).map((e, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "pi-co-event"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-co-event-yr"
    }, e.yr), /*#__PURE__*/React.createElement("span", {
      className: "pi-co-event-l"
    }, e.label), /*#__PURE__*/React.createElement("span", {
      className: "pi-co-event-c"
    }, "+$", e.cost.toLocaleString()))))), /*#__PURE__*/React.createElement("div", {
      className: "pi-co-col pi-co-col-good"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-co-col-h"
    }, "SimpleGrid"), /*#__PURE__*/React.createElement("div", {
      className: "pi-co-counter pi-co-counter-zero"
    }, "$0"), /*#__PURE__*/React.createElement("div", {
      className: "pi-co-counter-sub"
    }, "in change orders, ever"), /*#__PURE__*/React.createElement("div", {
      className: "pi-co-zero-note"
    }, "Each change is a row in a configuration table. The engine reads it instantly.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", null, count, " rule", count === 1 ? '' : 's', " added \xB7 0 deployments \xB7 0 invoices")))));
  }

  // ===== Blog 14 - Phase compression =====
  function PhaseCompress() {
    const phases = [{
      name: 'Requirements',
      oldW: 5,
      neuD: 'hours'
    }, {
      name: 'System design',
      oldW: 6,
      neuD: 'hours'
    }, {
      name: 'Configuration',
      oldW: 12,
      neuD: 'days'
    }, {
      name: 'Data migration',
      oldW: 5,
      neuD: 'days'
    }, {
      name: 'Testing',
      oldW: 6,
      neuD: 'continuous'
    }, {
      name: 'Go-live',
      oldW: 6,
      neuD: 'days'
    }];
    const [shrink] = useAutoCycle(2, 2600);
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-pc"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-pc-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-pc-old"
    }, "28\u201352 weeks"), /*#__PURE__*/React.createElement("div", {
      className: "pi-pc-arrow"
    }, shrink === 0 ? '→' : '⟶ AI-compressed ⟶'), /*#__PURE__*/React.createElement("div", {
      className: "pi-pc-neu"
    }, "days")), /*#__PURE__*/React.createElement("div", {
      className: "pi-pc-bars"
    }, phases.map((p, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "pi-pc-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-pc-name"
    }, p.name), /*#__PURE__*/React.createElement("div", {
      className: "pi-pc-track"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-pc-fill",
      style: {
        width: shrink === 0 ? p.oldW * 7 + '%' : '6%'
      }
    }, /*#__PURE__*/React.createElement("span", null, shrink === 0 ? p.oldW + 'wk' : p.neuD)))))), /*#__PURE__*/React.createElement("div", {
      className: "pi-pc-foot"
    }, shrink === 0 ? 'Traditional deployment, phase by phase' : 'Same phases. AI compressed the translation step in each one.'));
  }

  // ===== Blog 15 - ERP decay stages =====
  function ERPDecayDemo() {
    const stages = [{
      n: 1,
      h: 'Workarounds begin',
      color: 'gold',
      detail: '5–10 manual processes outside the ERP'
    }, {
      n: 2,
      h: 'Spreadsheets come back',
      color: 'gold',
      detail: 'ERP handles 70% · Excel handles 30%'
    }, {
      n: 3,
      h: 'Change orders pile up',
      color: 'red',
      detail: '$65K, 12 weeks, conflicts with phase 1'
    }, {
      n: 4,
      h: 'Trust erodes',
      color: 'red',
      detail: 'Founder calls the floor for real numbers'
    }, {
      n: 5,
      h: 'Replacement conversation',
      color: 'red',
      detail: '"With what?" - sunk cost lock-in'
    }];
    const [active] = useAutoCycle(stages.length, 1900);
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-decay"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-decay-trail"
    }, stages.map((s, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: 'pi-decay-step pi-decay-' + s.color + (i <= active ? ' lit' : '') + (i === active ? ' current' : '')
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-decay-step-n"
    }, s.n), /*#__PURE__*/React.createElement("div", {
      className: "pi-decay-step-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-decay-step-h"
    }, s.h), /*#__PURE__*/React.createElement("div", {
      className: "pi-decay-step-d"
    }, s.detail))))), /*#__PURE__*/React.createElement("div", {
      className: "pi-decay-meter"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-decay-meter-l"
    }, "Trust in the ERP"), /*#__PURE__*/React.createElement("div", {
      className: "pi-decay-meter-track"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-decay-meter-fill",
      style: {
        width: (stages.length - active) / stages.length * 100 + '%'
      }
    }))));
  }

  // ===== Blog 16 - Warehouse first (12 clicks vs 1 sentence) =====
  function WarehouseClickDemo() {
    const [tick, setTick] = React.useState(0);
    const visible = usePageVisible();
    React.useEffect(() => {
      if (!visible) return;
      const t = setInterval(() => setTick(v => (v + 1) % 200), 110);
      return () => clearInterval(t);
    }, [visible]);
    const clickPath = ['Tap menu', 'Procurement', 'Purchase Orders', 'Filter open', 'Select PO', 'Click Receive', 'Enter Qty', 'Select Unit', 'Select Lot', 'Photo (optional)', 'Review', 'Confirm', 'Print GRN'];
    const formActive = Math.min(clickPath.length - 1, Math.floor(tick / 10));
    const chatText = 'Got 200 sheets of steel from Midwest Supply.';
    const chatChars = Math.min(chatText.length, Math.max(0, tick - 6) * 2);
    const formTime = Math.min(130, tick).toFixed(0) + 's';
    const chatDone = chatChars >= chatText.length;
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-wm"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-wm-cols"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-wm-col pi-wm-col-bad"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-wm-h"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-wm-tag pi-wm-tag-red"
    }, "Form-based ERP"), /*#__PURE__*/React.createElement("span", {
      className: "pi-wm-time"
    }, formTime, " \xB7 click ", formActive + 1, "/", clickPath.length)), /*#__PURE__*/React.createElement("div", {
      className: "pi-wm-clicks"
    }, clickPath.map((c, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: 'pi-wm-click' + (i <= formActive ? ' done' : '') + (i === formActive ? ' active' : '')
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-wm-click-n"
    }, i + 1), c)))), /*#__PURE__*/React.createElement("div", {
      className: "pi-wm-col pi-wm-col-good"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-wm-h"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-wm-tag pi-wm-tag-blue"
    }, "Conversational"), /*#__PURE__*/React.createElement("span", {
      className: "pi-wm-time"
    }, chatDone ? '10s' : Math.min(10, tick).toFixed(0) + 's')), /*#__PURE__*/React.createElement("div", {
      className: "pi-wm-phone"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-wm-phone-bubble pi-wm-phone-user"
    }, chatText.slice(0, chatChars), /*#__PURE__*/React.createElement("span", {
      className: "pi-wm-cursor"
    }, "\u258D")), /*#__PURE__*/React.createElement("div", {
      className: 'pi-wm-phone-bubble pi-wm-phone-bot' + (chatDone ? ' show' : '')
    }, "\u2713 200 sheets received \xB7 PO-4521", /*#__PURE__*/React.createElement("br", null), "+200 to inventory \xB7 running rate updated")))), /*#__PURE__*/React.createElement("div", {
      className: "pi-wm-foot"
    }, "Same data captured. The floor decides which one survives."));
  }

  // ===== Blog 17 - Best practices myth =====
  function BestPracticeStack() {
    const customs = [{
      name: 'Vendor consolidation by species',
      cost: 12000
    }, {
      name: 'Brand-nominated suppliers',
      cost: 18000
    }, {
      name: 'Offer-pool re-ranking',
      cost: 22000
    }, {
      name: 'Component-level wood tracking',
      cost: 28000
    }, {
      name: 'Six contractor settlement formulas',
      cost: 36000
    }, {
      name: 'Dual size systems per brand',
      cost: 14000
    }, {
      name: 'Stage-level QC gates',
      cost: 20000
    }];
    const [count, setCount] = React.useState(0);
    const visible = usePageVisible();
    React.useEffect(() => {
      if (!visible) return;
      let t;
      if (count < customs.length) {
        t = setTimeout(() => setCount(c => c + 1), count === 0 ? 700 : 800);
      } else {
        t = setTimeout(() => setCount(0), 3500);
      }
      return () => clearTimeout(t);
    }, [count, visible]);
    const total = customs.slice(0, count).reduce((s, c) => s + c.cost, 0);
    return /*#__PURE__*/React.createElement("div", {
      className: "pi-bp"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-bp-stack"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-bp-base"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-bp-base-h"
    }, "\"Industry best practice\""), /*#__PURE__*/React.createElement("div", {
      className: "pi-bp-base-s"
    }, "generic procurement \xB7 generic dispatch \xB7 generic approvals")), customs.slice(0, count).map((c, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "pi-bp-block"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pi-bp-block-name"
    }, c.name), /*#__PURE__*/React.createElement("span", {
      className: "pi-bp-block-cost"
    }, "+$", c.cost.toLocaleString())))), /*#__PURE__*/React.createElement("div", {
      className: "pi-bp-total"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pi-bp-total-l"
    }, "Customizations to make the \"best practice\" fit you"), /*#__PURE__*/React.createElement("div", {
      className: "pi-bp-total-v"
    }, "$", total.toLocaleString()), /*#__PURE__*/React.createElement("div", {
      className: "pi-bp-total-c"
    }, count, " of ", customs.length, " departures \xB7 96% of mid-market manufacturers")));
  }

  // ===== Blog-specific content =====
  const POST = {};

  // 1 - Event Sourcing
  POST[1] = {
    mid: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Block, {
      tag: "Live demo \xB7 auto-replay",
      h: "State vs. events, side by side",
      sub: "Watch four real events fire on PO-122. Left: a traditional ERP overwrites the state - the old 300 is gone forever. Right: SimpleGrid appends every event, immutably."
    }, /*#__PURE__*/React.createElement(EventLedger, null)), /*#__PURE__*/React.createElement(Block, {
      tag: "What you get for free",
      h: null
    }, /*#__PURE__*/React.createElement(StatGrid, {
      cols: 4,
      items: [{
        num: '∞',
        label: 'Audit history',
        note: 'No log to "turn on"'
      }, {
        num: '0',
        label: 'Reconciliations',
        note: 'Events are the truth'
      }, {
        num: '1',
        label: 'Source of record',
        note: 'The ledger'
      }, {
        num: 'Any',
        label: 'Point-in-time view',
        note: 'Replay events to a date'
      }]
    }))),
    end: /*#__PURE__*/React.createElement(Bottom, {
      big: "Append-only. Immutable. Permanent.",
      p: "Every action, every actor, every timestamp - stored forever. The audit trail is the architecture, not a feature you turn on."
    })
  };

  // 2 - GridSpec
  POST[2] = {
    mid: /*#__PURE__*/React.createElement(Block, {
      tag: "Live demo \xB7 auto-cycling",
      h: "\"order\" - same word, three different operational boundaries",
      sub: "The same business term means a completely different entity in each operational boundary. Watch the language morph."
    }, /*#__PURE__*/React.createElement(DomainMorph, null)),
    end: /*#__PURE__*/React.createElement(Bottom, {
      big: "Your business speaks. The software listens.",
      p: "GridSpec captures your operation in your language - not translated into someone else's modules."
    })
  };

  // 3 - Entity roots
  POST[3] = {
    mid: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Block, {
      tag: "Live demo \xB7 auto-cycling",
      h: "The entity boundary, in motion",
      sub: "Watch a Sales Order entity group go through approval. The root and members move as one. Try to modify a member alone - the boundary rejects it."
    }, /*#__PURE__*/React.createElement(AggregateDemo, null)), /*#__PURE__*/React.createElement(Block, {
      tag: "The entity group, in three rules",
      h: null
    }, /*#__PURE__*/React.createElement(Cards, {
      cols: 3,
      items: [{
        cls: 'blue',
        kicker: 'Rule 1',
        h: 'Move as one',
        b: 'When the root changes state, all members move with it. Approve a Sales Order - every line item approves together.'
      }, {
        cls: 'purple',
        kicker: 'Rule 2',
        h: 'No orphans',
        b: 'A line item cannot exist without its order. The boundary prevents impossible states.'
      }, {
        cls: 'gold',
        kicker: 'Rule 3',
        h: "Reference, don't nest",
        b: 'Entity groups point at each other by ID. A Job Order references its Sales Order - independent lifecycles.'
      }]
    }))),
    end: /*#__PURE__*/React.createElement(Bottom, {
      big: "Consistent by design, not by accident.",
      p: "Every entity has a root, its members, and its rules. The structure prevents the bad states before they can happen."
    })
  };

  // 4 - Multi-tenant
  POST[4] = {
    mid: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Block, {
      tag: "Live demo \xB7 auto-cycling",
      h: "Shared platform, isolated databases",
      sub: "Each client has their own physical PostgreSQL database. The platform routes the active query to one - and only one. Watch which DB lights up."
    }, /*#__PURE__*/React.createElement(TenantDemo, null)), /*#__PURE__*/React.createElement(Block, {
      tag: "Three architectures, three trade-offs",
      h: null
    }, /*#__PURE__*/React.createElement(Cards, {
      cols: 3,
      items: [{
        cls: 'red',
        kicker: 'Single-tenant',
        h: 'Your own copy',
        b: 'One application + one database per client. Safe, but every update is a separate deployment.'
      }, {
        cls: 'gold',
        kicker: 'Shared database',
        h: 'Everyone, one DB',
        b: 'All clients share one database, separated by a tenant_id column. One bad query away from a leak.'
      }, {
        cls: 'blue',
        kicker: 'Isolated databases',
        h: 'Shared app, your DB',
        b: 'One application, your own physical database. SimpleGrid runs on this model. Isolation is infrastructure, not code.'
      }]
    }))),
    end: /*#__PURE__*/React.createElement(Bottom, {
      big: "Your data is yours. Your rules are yours.",
      p: "No other client can see, touch, or affect your operation. Security is not a feature - it is the architecture."
    })
  };

  // 5 - Customization in minutes
  POST[5] = {
    mid: /*#__PURE__*/React.createElement(Block, {
      tag: "Live demo \xB7 30 seconds",
      h: "Watch a new business rule go live",
      sub: "Founder request \u2192 open the rules table \u2192 add a row \u2192 engine reads it. The rule is enforced on the next dispatch over $5K. No deployment. No downtime."
    }, /*#__PURE__*/React.createElement(RuleAddDemo, null)),
    end: /*#__PURE__*/React.createElement(Bottom, {
      big: "Change a rule in minutes. See every rule in one place.",
      p: "No developer needed. No deployment. No downtime. The Knowledge Level is your single source of truth."
    })
  };

  // 6 - Module vs Domain
  POST[6] = {
    mid: /*#__PURE__*/React.createElement(Block, {
      tag: "Live demo \xB7 same request, two paths",
      h: "\"Add QC approval before dispatch on items over $5,000\"",
      sub: "One business rule enters two architectures. Watch how the work plays out on each side, step by step."
    }, /*#__PURE__*/React.createElement(ModuleVsDomainDemo, null)),
    end: /*#__PURE__*/React.createElement(Bottom, {
      big: "No modules. We model your domain.",
      p: "Your rules. Your language. Your operation. The platform generates itself from the way you actually work."
    })
  };

  // 7 - Claude chatbot
  POST[7] = {
    mid: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Block, {
      tag: "Live demo \xB7 auto-cycling",
      h: "Watch a query flow, end to end",
      sub: "Three real query types play in sequence - typing, routing to the right model tier, the tool call, the SQL it generates, the answer. Tap a dot to jump."
    }, /*#__PURE__*/React.createElement(ChatDemo, null)), /*#__PURE__*/React.createElement(Block, {
      tag: "Architecture",
      h: "Why we skipped RAG",
      sub: "RAG searches text. Your operation is not text - it is structured data with rules."
    }, /*#__PURE__*/React.createElement(Cards, {
      cols: 2,
      items: [{
        cls: 'red',
        kicker: 'RAG approach',
        h: 'Search text, hope',
        b: 'Embed documents into vectors. Retrieve fragments. The LLM guesses an answer from chunks. Works for wikis. Hallucinates inventory numbers.'
      }, {
        cls: 'blue',
        kicker: 'Tool Use approach',
        h: 'Call functions, know',
        b: 'Claude selects from pre-built functions, passes typed parameters, runs a real SQL query against your isolated database. Real numbers. Real audit trail.'
      }]
    }))),
    end: /*#__PURE__*/React.createElement(Bottom, {
      big: "\"How much 304 stainless do we have?\" Real query. Real answer.",
      p: "No vector search. No chunk retrieval. No hallucinated numbers. Tool Use against your live database."
    })
  };

  // 8 - Conversational UX
  POST[8] = {
    mid: /*#__PURE__*/React.createElement(Block, {
      tag: "Live demo \xB7 same receipt, two interfaces",
      h: "Form clicks vs. one sentence",
      sub: "Both capture the exact same data. Both write to the exact same database. Watch the timer - the floor decides which one survives."
    }, /*#__PURE__*/React.createElement(FormVsChatDemo, null)),
    end: /*#__PURE__*/React.createElement(Bottom, {
      big: "Same behavior. Better data. Real adoption.",
      p: "We do not train your team to use an ERP. We listen to what they already say."
    })
  };

  // 9 - Landed cost
  POST[9] = {
    mid: /*#__PURE__*/React.createElement(Block, {
      tag: "Live demo \xB7 auto-replay",
      h: "Watch the cost stack build, layer by layer",
      sub: "Each cost layer is a separate event in SimpleGrid, tagged with the SKU. Watch them accumulate - and the margin reveal itself once the stack is complete."
    }, /*#__PURE__*/React.createElement(CostStackDemo, null)),
    end: /*#__PURE__*/React.createElement(Bottom, {
      big: "Real margin per SKU. Every product. Every order. Real time.",
      p: "Compare against the buyer's price and you have the answer most operations cannot give: which products make money, and which ones quietly do not."
    })
  };

  // 10 - Inside SimpleGrid (culture)
  POST[10] = {
    mid: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Block, {
      tag: "Live demo \xB7 the filter",
      h: "Every product decision goes through one question",
      sub: "\"Would this work on the floor?\" Real product ideas cycle through. Watch which ones pass and which don't."
    }, /*#__PURE__*/React.createElement(FloorFilterDemo, null)), /*#__PURE__*/React.createElement(Block, {
      tag: "Who's behind the filter",
      h: null
    }, /*#__PURE__*/React.createElement(Cards, {
      cols: 2,
      items: [{
        cls: 'blue',
        kicker: 'The founder',
        h: 'Built and ran a $30M factory',
        b: 'Operated multiple facilities, hundreds of employees, international buyers. Survived two ERP failures. Ended up running operations on Google Sheets. SimpleGrid exists because he was the customer first.'
      }, {
        cls: 'purple',
        kicker: 'The engineering team',
        h: 'From the shop floor up',
        b: 'One engineer worked as a shift engineer at a glass company before moving into software. Has stood in a warehouse at 6 AM. Knows what it feels like to use a system not built for you.'
      }]
    }))),
    end: /*#__PURE__*/React.createElement(Bottom, {
      big: "Built by operators, for operators.",
      p: "If you can model any factory, you can serve every factory. Not by building modules for each one - by building an engine that reads models."
    })
  };

  // 11 - Mid-market gap
  POST[11] = {
    mid: /*#__PURE__*/React.createElement(Block, {
      tag: "Live demo \xB7 the squeeze",
      h: "Three tiers - and the underserved middle",
      sub: "Enterprise pushes down. Small business pushes up. The mid-market has nowhere to land. Watch the pressure pulse on each tier."
    }, /*#__PURE__*/React.createElement(MidMarketSqueeze, null)),
    end: /*#__PURE__*/React.createElement(Bottom, {
      big: "Built for the mid-market. Not retrofitted from enterprise.",
      p: "Deploy in days. $0 to start. No modules. No consultants. No IT team required."
    })
  };

  // 12 - Spreadsheets
  POST[12] = {
    mid: /*#__PURE__*/React.createElement(Block, {
      tag: "Live demo \xB7 chaos \u2192 consolidation",
      h: "The 15 spreadsheets that run your factory",
      sub: "Watch the chaos. Then watch what happens when one live system takes over."
    }, /*#__PURE__*/React.createElement(SpreadsheetChaos, null)),
    end: /*#__PURE__*/React.createElement(Bottom, {
      big: "The flexibility of a spreadsheet. The structure of a real system.",
      p: "Deploy in days. Change rules in minutes. Capture data the way your team already works. The spreadsheet era can end."
    })
  };

  // 13 - Vendor change orders
  POST[13] = {
    mid: /*#__PURE__*/React.createElement(Block, {
      tag: "Live demo \xB7 the running tab",
      h: "3 years of change orders, side by side",
      sub: "Same number of changes. Same business needs. Watch the cost meter run for one architecture - and stay flat for the other."
    }, /*#__PURE__*/React.createElement(ChangeOrderCounter, null)),
    end: /*#__PURE__*/React.createElement(Bottom, {
      big: "Zero change orders. Zero developer dependency. Zero annual surprise.",
      p: "Every business rule lives in a table. Add a row, change a cell, the system updates itself in real time."
    })
  };

  // 14 - AI changed deployment
  POST[14] = {
    mid: /*#__PURE__*/React.createElement(Block, {
      tag: "Live demo \xB7 the compression",
      h: "28\u201352 weeks \u2192 days",
      sub: "Watch the deployment phases collapse. Same six phases - AI compresses the translation step in each one."
    }, /*#__PURE__*/React.createElement(PhaseCompress, null)),
    end: /*#__PURE__*/React.createElement(Bottom, {
      big: "Working demo in 24 hours. Production-ready in 2 weeks.",
      p: "Deployment is no longer a project. It is a conversation. AI writes the configuration. The platform generates the system. The founder reviews. Iteration is continuous."
    })
  };

  // 15 - ERP cannot keep up
  POST[15] = {
    mid: /*#__PURE__*/React.createElement(Block, {
      tag: "Live demo \xB7 the decay",
      h: "What happens when your business changes and your system doesn't",
      sub: "Every mid-market ERP follows this five-stage path. Watch trust drop as the stages light up."
    }, /*#__PURE__*/React.createElement(ERPDecayDemo, null)),
    end: /*#__PURE__*/React.createElement(Bottom, {
      big: "An ERP that changes when the business changes.",
      p: "Same day. Same cost: zero. Not through change orders. Through configuration. The system stays alive in year five - because the rules live where the business does."
    })
  };

  // 16 - Warehouse manager first
  POST[16] = {
    mid: /*#__PURE__*/React.createElement(Block, {
      tag: "Live demo \xB7 13 clicks vs. 1 sentence",
      h: "The same receipt, two interfaces, real-time timer",
      sub: "The dashboard your founder loves only works if the floor uses the system. Watch the click count on the left - and the timer."
    }, /*#__PURE__*/React.createElement(WarehouseClickDemo, null)),
    end: /*#__PURE__*/React.createElement(Bottom, {
      big: "Build for the floor. The C-suite takes care of itself.",
      p: "One person using the system correctly at the point of action is worth more than an entire back-office team entering data retroactively."
    })
  };

  // 17 - Best practices myth
  POST[17] = {
    mid: /*#__PURE__*/React.createElement(Block, {
      tag: "Live demo \xB7 the customization stack",
      h: "What \"best practice\" actually costs",
      sub: "Each \"departure from the default\" lands as another customization on top of the generic template. Watch the stack - and the bill - grow."
    }, /*#__PURE__*/React.createElement(BestPracticeStack, null)),
    end: /*#__PURE__*/React.createElement(Bottom, {
      big: "Your practices. Your language. Your rules.",
      p: "Modeled, not templated. SimpleGrid does not sell \"best practices.\" We model the actual operation in front of us - and let yours stay yours."
    })
  };
  window.PostInfographics = POST;
})();