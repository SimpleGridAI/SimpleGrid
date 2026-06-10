// Events Ledger - flagship section. SG Schema + Event Sourcing.
// Animated streaming feed + the architecture behind it.

// Compact, looping event-ledger feed for the "what this gives you" block:
// timestamped, named events animate in; only the newest row carries the blue accent.
function ActivityFeed() {
  const EVENTS = [
    { t: '8:03 AM',  who: 'Mike',   act: 'opened the floor — shift A' },
    { t: '9:21 AM',  who: 'Priya',  act: 'approved PO #4471' },
    { t: '11:46 AM', who: 'Mike',   act: 'received 450 sheets' },
    { t: '12:30 PM', who: 'System', act: 'inventory recomputed' },
    { t: '2:14 PM',  who: 'QC',     act: 'dispatch held — QC fail' },
    { t: '2:15 PM',  who: 'Dana',   act: 'corrective event logged' },
    { t: '3:02 PM',  who: 'Mike',   act: '12 units scrapped — reason noted' },
    { t: '4:20 PM',  who: 'Priya',  act: 'invoice matched to receipt' },
  ];
  const MAX = 6;
  const ref = React.useRef(null);
  const counter = React.useRef(4);
  const [inView, setInView] = React.useState(false);
  const [feed, setFeed] = React.useState(() => EVENTS.slice(0, 4).map((e, i) => ({ ...e, key: i })));

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (!inView) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      setFeed(prev => {
        const k = counter.current;
        counter.current = k + 1;
        const e = EVENTS[k % EVENTS.length];
        return [...prev, { ...e, key: k }].slice(-MAX);
      });
    }, 2100);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className="al-panel" role="img" aria-label="A live event ledger feed of timestamped, named actions">
      <div className="al-panel-top">
        <span className="al-panel-label">Event ledger · Today</span>
        <span className="al-live"><span className="al-dot"></span> live</span>
      </div>
      <div className="al-feed" aria-hidden="true">
        {feed.map((e, i) => (
          <div key={e.key} className={'al-evt' + (i === feed.length - 1 ? ' is-active' : '')}>
            <span className="al-t">{e.t}</span>
            <span className="al-who">{e.who}</span>
            <span className="al-act">{e.act}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsLedger() {
  // Realistic event stream that types in over time
  const allEvents = [
    { t: '11:47:02', actor: 'Sarah · Sales', verb: 'CANCEL_LINE',     entity: 'SO-4521 · Line 3',         from: 'In Production', to: 'Canceled',      impact: 'WIP returned · Buyer notified' },
    { t: '11:46:58', actor: 'System',        verb: 'TRIGGER_FIRED',   entity: 'Inventory rule R-204',     from: '-',             to: 'Reorder draft', impact: 'PO-8821 prepared for approval' },
    { t: '11:46:51', actor: 'Mike · Floor',  verb: 'START_STAGE',     entity: 'JO-KEN-MIRROR · Assembly', from: 'Issued',        to: 'In progress',   impact: 'Stage clock started' },
    { t: '11:46:44', actor: 'Raj · QC',      verb: 'REJECT_BATCH',    entity: 'Batch B-7710 · 12 pcs',    from: 'Pending',       to: 'Rejected',      impact: 'Auto-routed to original contractor' },
    { t: '11:46:31', actor: 'James · Owner',verb: 'APPROVE',         entity: 'PO-8819 · ₹ 14.2 L',       from: 'Pending',       to: 'Approved',      impact: 'Vendor notified · Funds reserved' },
    { t: '11:46:18', actor: 'Bruce · Disp.', verb: 'SHIP_DISPATCH',   entity: 'HACO-Dispatch-441',        from: 'Packed',        to: 'Shipped',       impact: 'Invoice INV-2207 generated' },
    { t: '11:46:05', actor: 'System',        verb: 'RECONCILE',       entity: 'Bank · ICICI 4421',        from: '-',             to: 'Matched',       impact: '37 receipts matched · 2 flagged' },
    { t: '11:45:52', actor: 'Hank · Whse',   verb: 'RECEIVE_GOODS',   entity: 'GRN-3320 · 200 sheets',    from: '-',             to: 'In stock',      impact: 'Inventory +200 · AP +₹ 14.2 L' },
  ];

  const [count, setCount] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const containerRef = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
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

  const verbColor = (v) => {
    if (v.startsWith('REJECT') || v.startsWith('CANCEL')) return 'var(--sg-red)';
    if (v.startsWith('APPROVE') || v.startsWith('SHIP') || v.startsWith('RECEIVE') || v.startsWith('RECONCILE')) return 'var(--sg-green)';
    if (v.startsWith('TRIGGER')) return 'var(--sg-purple)';
    return 'var(--sg-blue)';
  };

  return (
    <section className="section section-dark" id="ledger" ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* subtle grid bg */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div className="tag" style={{ color: 'rgba(255,255,255,0.5)' }}>THE ACTIVITY LEDGER</div>
          <h2 className="h2" style={{ color: '#fff', maxWidth: 880 }}>
            Your enterprise, alive - every action recorded, every decision traceable, every state replayable.
          </h2>
        </Reveal>

        {/* Live ledger card */}
        <Reveal delay={120}>
          <div style={{
            marginTop: 36,
            background: '#0E0E10',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14,
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
          }}>
            {/* header bar */}
            <div className="ledger-headbar">
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }}></span>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }}></span>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }}></span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                events.simplegrid · live tail
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}>
                  {total.toLocaleString()} events
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#10B981', fontWeight: 600 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 0 4px rgba(16,185,129,0.18)' }}></span>
                  LIVE
                </span>
                <button onClick={() => {
                  if (count >= allEvents.length) { setCount(0); setPaused(false); }
                  else { setPaused(p => !p); }
                }} style={{
                  background: 'transparent', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.7)',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '5px 10px', borderRadius: 4, cursor: 'pointer', fontFamily: 'var(--font-body)',
                }}>{count >= allEvents.length ? '⟲ Replay' : paused ? 'Resume' : 'Pause'}</button>
              </div>
            </div>

            {/* column headers */}
            <div className="ledger-cols">
              <div>Time</div><div>Actor</div><div>Event</div><div>Entity</div><div>Transition</div><div>Downstream effect</div>
            </div>

            {/* rows */}
            <div className="ledger-rows">
              {visible.map((e, i) => (
                <div key={i} className="ledger-row">
                  <div className="lr-time">{e.t}</div>
                  <div className="lr-actor">{e.actor}</div>
                  <div className="lr-verb" style={{ color: verbColor(e.verb) }}>{e.verb}</div>
                  <div className="lr-entity">{e.entity}</div>
                  <div className="lr-transition">
                    <span className="lr-from">{e.from}</span>
                    <span className="lr-arrow">→</span>
                    <span className="lr-to">{e.to}</span>
                  </div>
                  <div className="lr-impact">{e.impact}</div>
                </div>
              ))}
            </div>

            <div className="ledger-foot">
              <span>● append-only</span>
              <span>● cryptographically ordered</span>
              <span>● replayable to any point in time</span>
              <span>● regulator-ready</span>
            </div>
          </div>
        </Reveal>

        {/* What this gives you - feature rows beside a live ledger feed */}
        <Reveal>
          <div className="al-callout-tag">WHAT THIS GIVES YOU</div>
        </Reveal>
        <div className="al-grid">
          <Reveal>
            <div className="al-rows">
              {[
                { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/></svg>', t: 'Replay any day, any hour', p: 'Open a day, watch events in order. The reason is in the log: name, time, what changed.' },
                { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>', t: 'Disputes resolved by the system', p: 'Vendor says 500 sheets. Log says 450, received by Mike, 11:46 AM Tuesday. Argument over before it starts.' },
                { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>', t: 'Audit-ready by default', p: 'IRS, OSHA, SOX, buyer audits. Every event already timestamped and named. Filter, export, send.' },
                { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>', t: 'Mistakes are reversible, never hidden', p: 'Issue a corrective event. Original stays, correction sits next to it. Nothing overwritten.' },
                { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>', t: 'One source of truth, forever', p: 'Inventory, AR, AP, production all computed from one log, real time. No reconciliation.' },
                { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/></svg>', t: 'Trust without supervision', p: 'Every action carries a name. You stop being the bottleneck for trust.' },
              ].map((x, i) => (
                <div className="al-row" key={i}>
                  <span className="al-ico" aria-hidden="true" dangerouslySetInnerHTML={{ __html: x.svg }}></span>
                  <div>
                    <h4 className="al-h">{x.t}</h4>
                    <p className="al-p">{x.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ActivityFeed />
          </Reveal>
        </div>
      </div>

      <style>{`
        @keyframes sgLedgerIn {
          from { opacity: 0; transform: translateY(-8px); background: rgba(74,123,247,0.08); }
          to   { opacity: 1; transform: translateY(0);    background: transparent; }
        }
        .ledger-row:hover { background: rgba(255,255,255,0.02); }

        /* "What this gives you" - borderless rows + live ledger feed */
        .al-callout-tag { font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sg-blue); margin: 56px 0 22px; }
        .al-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 56px; align-items: start; }
        .al-rows { display: flex; flex-direction: column; }
        .al-row { display: grid; grid-template-columns: 26px 1fr; gap: 16px; padding: 24px 0; border-top: 1px solid rgba(255,255,255,0.08); }
        .al-row:first-child { border-top: 0; padding-top: 2px; }
        .al-ico { color: var(--sg-blue); width: 24px; height: 24px; margin-top: 3px; }
        .al-ico svg { width: 24px; height: 24px; display: block; }
        .al-h { font-family: var(--font-heading); font-size: 18px; font-weight: 700; color: rgba(255,255,255,0.92); margin: 0; letter-spacing: -0.01em; }
        .al-p { font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.55; margin: 6px 0 0; }
        .al-panel { position: relative; background: #0E0E10; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 16px 16px 6px; box-shadow: 0 24px 60px rgba(0,0,0,0.4); }
        .al-panel-top { display: flex; align-items: center; justify-content: space-between; padding: 4px 6px 14px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .al-panel-label { font-family: var(--font-mono); font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.4); }
        .al-live { display: inline-flex; align-items: center; gap: 7px; font-size: 12px; color: rgba(255,255,255,0.5); }
        .al-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--sg-blue); position: relative; }
        .al-dot::after { content: ''; position: absolute; inset: -4px; border-radius: 50%; border: 1px solid var(--sg-blue); opacity: 0; animation: alPulse 2.1s ease-out infinite; }
        @keyframes alPulse { 0% { transform: scale(0.6); opacity: 0.7; } 100% { transform: scale(1.85); opacity: 0; } }
        .al-feed { height: 300px; display: flex; flex-direction: column; justify-content: flex-end; gap: 2px; overflow: hidden; padding: 8px 0 6px; -webkit-mask: linear-gradient(180deg, transparent 0, #000 14%, #000 100%); mask: linear-gradient(180deg, transparent 0, #000 14%, #000 100%); }
        .al-evt { display: grid; grid-template-columns: 76px 58px 1fr; align-items: baseline; gap: 10px; padding: 10px 12px; border-radius: 8px; border-left: 2px solid transparent; animation: alIn 420ms ease both; }
        .al-t { font-family: var(--font-mono); font-size: 12px; color: rgba(255,255,255,0.4); white-space: nowrap; }
        .al-who { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.85); }
        .al-act { font-size: 13px; color: rgba(255,255,255,0.5); }
        .al-evt.is-active { background: rgba(74,123,247,0.12); border-left-color: var(--sg-blue); }
        .al-evt.is-active .al-t { color: var(--sg-blue); }
        .al-evt.is-active .al-who { color: #fff; }
        .al-evt.is-active .al-act { color: rgba(255,255,255,0.88); }
        @keyframes alIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 880px) { .al-grid { grid-template-columns: 1fr; gap: 36px; } }
        @media (prefers-reduced-motion: reduce) { .al-evt { animation: none; } .al-dot::after { animation: none; } }
      `}</style>
    </section>
  );
}
window.EventsLedger = EventsLedger;

// ----- Architecture explainer (SG Schema + Event Sourcing) -----
function ArchitectureNew() {
  return (
    <section className="section" id="architecture" style={{ background: '#fff' }}>
      <div className="container">
        <Reveal>
          <div className="tag" style={{ color: 'var(--sg-purple)' }}>UNDER THE HOOD</div>
          <h2 className="h2 ink" style={{ color: 'var(--fg1)' }}>
            SG Schema <span style={{ color: 'var(--fg3)', fontWeight: 400 }}>×</span> SG Engine <span style={{ color: 'var(--fg3)', fontWeight: 400 }}>×</span> Event Sourcing.
          </h2>
          <p className="lead" style={{ maxWidth: 960 }}>
            Most ERPs are data-entry apps wearing a suit - tables, forms, overwrites. SimpleGrid is built on two ideas no other business platform ships at the core: an <strong>SG Schema</strong> that captures one factory's complete operational blueprint, and an <strong>event-sourced</strong> ledger that stores every change. SG Engine reads the SG Schema and runs your factory from it. The result is a system that bends to your business instead of the other way around.
          </p>
        </Reveal>

        <div className="arch-ddd-grid">
          <Reveal>
            <div className="arch-ddd-card" style={{
              border: '1px solid var(--border)', borderRadius: 12, padding: 32, height: '100%',
              borderLeft: '4px solid var(--sg-purple)',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'var(--sg-purple)', marginBottom: 8 }}>SG SCHEMA</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, margin: '0 0 14px', color: 'var(--fg1)', letterSpacing: '-0.015em' }}>
                Your business has a language. The system speaks it.
              </h3>
              <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.7, margin: '0 0 14px' }}>
                A "Job Order" in your factory is not the same thing as a "Work Order" in someone else's. A "rejection" in fabric is different from a "rejection" in plywood. Generic ERPs flatten that - every customer fits the same forms.
              </p>
              <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.7, margin: 0 }}>
                Your SG Schema captures <em>your</em> entities, your states, your transitions, your invariants, your chain reactions. AI writes it, the operator validates it, SG Engine runs it. The vocabulary on every screen is yours, because the spec underneath is yours.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{
              border: '1px solid var(--border)', borderRadius: 12, padding: 32, height: '100%',
              borderLeft: '4px solid var(--sg-blue)',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'var(--sg-blue)', marginBottom: 8 }}>EVENT SOURCING</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, margin: '0 0 14px', color: 'var(--fg1)', letterSpacing: '-0.015em' }}>
                The log is the database. The state is a projection.
              </h3>
              <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.7, margin: '0 0 14px' }}>
                Instead of storing the current row and losing the past, we store every event that ever changed your business. Inventory is not a number - it's the sum of every receipt and issuance. An order's status is not a flag - it's the latest state in a chain of recorded transitions.
              </p>
              <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.7, margin: 0 }}>
                Banks have run on this idea for centuries - a ledger, never erased. Almost no ERP does. We do.
              </p>
            </div>
          </Reveal>
        </div>

        {/* The "why this matters" outcome row */}
        <div className="arch-outcome-box">
          <div style={{ fontSize: 'var(--fs-caption)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg3)', marginBottom: 18 }}>What this combination unlocks</div>
          <div className="arch-outcome-grid">
            {[
              { t: '7-day deploys', p: 'New operation → new system, generated from your SG Schema. No new codebase per customer.' },
              { t: 'Audit by design', p: 'You don\'t add audit logs. The audit is the system. Every regulator question already has an answer.' },
              { t: 'Rules without releases', p: 'Change a rule, the system changes. No deploy cycle. No IT ticket. No version migration.' },
              { t: 'Disputes resolved', p: 'Vendor said 500. Log says 450, by Mike, 4:13 PM Tuesday. Argument over.' },
            ].map((x, i) => (
              <div key={i} className="arch-outcome-cell">
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, color: 'var(--fg1)', marginBottom: 6 }}>{x.t}</div>
                <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--fg2)', lineHeight: 1.6 }}>{x.p}</div>
              </div>
            ))}
          </div>
        </div>

        {/* The honest line */}
        <Reveal delay={200}>
          <div style={{ marginTop: 40, padding: '24px 0', borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: 'var(--fs-small)', color: 'var(--fg2)', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
              "This is not AI. AI is the surface. Underneath is an architecture so unusual that even seasoned engineers ask us to draw it twice. Most ERPs are 1990s thinking dressed in 2020s UI. SimpleGrid is what an enterprise system looks like if you started today, with what we now know."
            </p>
            <p style={{ fontSize: 'var(--fs-caption)', color: 'var(--fg3)', lineHeight: 1.5, margin: '6px 0 0', fontStyle: 'normal', fontWeight: 600 }}>
              - The founding team
            </p>
            <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.7, margin: '14px 0 0' }}>
              <a href="about.html" style={{color:'var(--sg-blue)',fontWeight:600,textDecoration:'none'}}>Built by operators who ran a $30M factory</a> - not by software vendors who watched one from the outside.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
window.ArchitectureNew = ArchitectureNew;

// ----- Fogg-aligned hero, motivation, ability, trigger sections -----

function ProductHeroNew() {
  const [showInvite, setShowInvite] = React.useState(false);
  const [theme, setTheme] = React.useState(() => {
    try { return localStorage.getItem('sg_product_hero_theme') || 'dark'; } catch { return 'dark'; }
  });
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('sg_product_hero_theme', next); } catch {}
  };
  const isDark = theme === 'dark';

  // Theme-driven colors
  const bgClass = isDark ? 'section section-dark' : 'section';
  // Match the home page hero height: full viewport minus the nav, content centered.
  const heroSize = { minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' };
  const bgStyle = isDark
    ? { paddingTop: 88, paddingBottom: 64, position: 'relative', overflow: 'hidden', background: 'var(--sg-black)', ...heroSize }
    : { paddingTop: 88, paddingBottom: 64, position: 'relative', overflow: 'hidden', background: 'rgba(252,252,253,0.30)', ...heroSize };
  // Dark mode: no radial tint, so the hero reads as the same #1A1A1A as the
  // other section-dark blocks (FinalCTA, EventsLedger dark variant). Light
  // mode keeps the subtle blue/purple radial for visual interest.
  const overlayBg = isDark
    ? 'none'
    : 'radial-gradient(circle at 80% 20%, rgba(74,123,247,0.10), transparent 50%), radial-gradient(circle at 20% 80%, rgba(124,58,237,0.06), transparent 50%)';
  const tagColor = isDark ? 'rgba(255,255,255,0.5)' : 'var(--fg3)';
  const h1Color = isDark ? '#fff' : 'var(--fg1)';
  const leadColor = isDark ? 'rgba(255,255,255,0.78)' : 'var(--fg2)';
  const noteColor = isDark ? 'rgba(255,255,255,0.5)' : 'var(--fg3)';

  return (
    <section className={bgClass} style={bgStyle}>
      <button
        type="button"
        className={'hero-theme-toggle' + (isDark ? '' : ' is-light')}
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: overlayBg,
      }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="tag" style={{ color: tagColor }}>THE PRODUCT</div>
        <h1 className="h1" style={{ color: h1Color, maxWidth: 980, fontSize: 48, lineHeight: 1.1 }}>
          The operations layer for your factory floor.
        </h1>
        <p className="lead" style={{ color: leadColor, maxWidth: 760, marginTop: 18 }}>
          Your stages, your contractors, your approvals, your costing logic - modeled on how the floor actually runs, not how a generic ERP wants it to run. One live system that replaces the fourteen Slack channels, six spreadsheets, and the approval lost in DMs - synced to the QuickBooks or Tally you already use. Your books stay where they are.
        </p>
        <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button type="button" onClick={() => setShowInvite(true)} className="btn btn-lg btn-invite" style={{animation:'sgBuildPulse 1.8s ease-in-out infinite'}}>Book a demo →</button>
        </div>
        <div style={{ marginTop: 36, display: 'flex', gap: 32, flexWrap: 'wrap', fontSize: 'var(--fs-caption)', color: noteColor }}>
          <span>● Configured to your floor</span>
          <span>● Live in 7-21 days</span>
          <span>● Synced to QuickBooks & Tally</span>
        </div>
      </div>
      {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    </section>
  );
}
window.ProductHeroNew = ProductHeroNew;

// PRODUCT FEATURE - Hank, the AI chatbot for the shop floor
function MotivationSection() {
  // Hank the bulldog mascot - stylised flat illustration, standing upright in a blue "HANK" cap.
  const BULLDOG_SVG = '<svg viewBox="0 0 400 640" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hank, the SimpleGrid bulldog mascot in a yellow hardhat"><ellipse cx="200" cy="618" rx="130" ry="14.3" fill="#1A1A1A" opacity="0.14"/><path d="M 130 455 Q 122 495 118 555 L 168 558 Q 172 500 175 460 Z" fill="#2A3548" stroke="#1A1A1A" stroke-width="3"/><path d="M 225 460 Q 228 500 232 558 L 282 555 Q 278 495 270 455 Z" fill="#2A3548" stroke="#1A1A1A" stroke-width="3"/><path d="M 132 470 Q 130 510 130 550" fill="none" stroke="#3D4D66" stroke-width="2" opacity="0.7"/><path d="M 268 470 Q 270 510 270 550" fill="none" stroke="#3D4D66" stroke-width="2" opacity="0.7"/><rect x="113" y="552" width="60" height="9" fill="#1F2937" stroke="#1A1A1A" stroke-width="2.5" rx="1"/><rect x="227" y="552" width="60" height="9" fill="#1F2937" stroke="#1A1A1A" stroke-width="2.5" rx="1"/><path d="M 105 561 L 102 600 Q 102 618 120 618 L 180 618 Q 190 618 190 605 L 190 561 Z" fill="#3D2817" stroke="#1A1A1A" stroke-width="3"/><path d="M 102 598 Q 115 588 145 588 L 190 588 L 190 605 Q 190 618 178 618 L 120 618 Q 102 618 102 600 Z" fill="#5A3A22" stroke="#1A1A1A" stroke-width="2.5"/><line x1="138" y1="573" x2="160" y2="575" stroke="#1A1A1A" stroke-width="1.5"/><line x1="138" y1="582" x2="160" y2="584" stroke="#1A1A1A" stroke-width="1.5"/><path d="M 210 561 L 210 605 Q 210 618 220 618 L 280 618 Q 298 618 298 600 L 295 561 Z" fill="#3D2817" stroke="#1A1A1A" stroke-width="3"/><path d="M 220 588 L 255 588 Q 285 588 298 600 Q 298 618 280 618 L 220 618 Q 210 618 210 605 Z" fill="#5A3A22" stroke="#1A1A1A" stroke-width="2.5"/><line x1="240" y1="573" x2="262" y2="575" stroke="#1A1A1A" stroke-width="1.5"/><line x1="240" y1="582" x2="262" y2="584" stroke="#1A1A1A" stroke-width="1.5"/><rect x="75" y="448" width="250" height="28" fill="#6B4423" stroke="#1A1A1A" stroke-width="3"/><line x1="75" y1="453" x2="325" y2="453" stroke="#3D2616" stroke-width="1" stroke-dasharray="3 3"/><line x1="75" y1="471" x2="325" y2="471" stroke="#3D2616" stroke-width="1" stroke-dasharray="3 3"/><g transform="translate(200,462)"><rect x="-18" y="-19" width="36" height="38" fill="#4A7BF7" stroke="#1A1A1A" stroke-width="2.5" rx="3"/><rect x="-12" y="-13" width="24" height="26" fill="none" stroke="#FAF7F1" stroke-width="1.5" rx="2"/><text x="0" y="4" text-anchor="middle" font-family="Geist,sans-serif" font-size="13" font-weight="800" fill="#FAF7F1">SG</text></g><g transform="translate(97,465) rotate(12)"><rect x="-3" y="0" width="6" height="50" fill="#B8C2CC" stroke="#1A1A1A" stroke-width="2"/><path d="M -9 -3 L 9 -3 L 9 9 L 4 9 L 4 4 L -4 4 L -4 9 L -9 9 Z" fill="#B8C2CC" stroke="#1A1A1A" stroke-width="2"/><rect x="-1" y="20" width="2" height="20" fill="#1A1A1A" opacity="0.3"/></g><g transform="translate(303,465) rotate(-10)"><rect x="-3.5" y="0" width="7" height="28" fill="#EF4444" stroke="#1A1A1A" stroke-width="2" rx="1.5"/><rect x="-2" y="26" width="4" height="22" fill="#B8C2CC" stroke="#1A1A1A" stroke-width="2"/><rect x="-2.5" y="46" width="5" height="3" fill="#1A1A1A"/></g><path d="M 95 285 Q 78 325 78 380 L 75 448 L 325 448 L 322 380 Q 322 325 305 285 Q 280 258 258 252 L 142 252 Q 120 258 95 285 Z" fill="#4A7BF7" stroke="#1A1A1A" stroke-width="3"/><path d="M 78 380 Q 78 415 75 448 L 95 448 Q 95 415 95 380 Z" fill="#3461D1" opacity="0.5"/><path d="M 322 380 Q 322 415 325 448 L 305 448 Q 305 415 305 380 Z" fill="#3461D1" opacity="0.5"/><line x1="200" y1="265" x2="200" y2="448" stroke="#2A4FA8" stroke-width="2.5"/><circle cx="200" cy="295" r="3.5" fill="#2A4FA8"/><circle cx="200" cy="325" r="3.5" fill="#2A4FA8"/><circle cx="200" cy="355" r="3.5" fill="#2A4FA8"/><circle cx="200" cy="385" r="3.5" fill="#2A4FA8"/><circle cx="200" cy="415" r="3.5" fill="#2A4FA8"/><path d="M 118 298 L 118 342 L 162 342 L 162 298" fill="none" stroke="#2A4FA8" stroke-width="2"/><path d="M 118 298 L 140 315 L 162 298" fill="none" stroke="#2A4FA8" stroke-width="2"/><rect x="152" y="290" width="4" height="20" fill="#F5B000" stroke="#1A1A1A" stroke-width="1"/><g transform="translate(263,310)"><rect x="-30" y="-13" width="60" height="26" fill="#FAF7F1" stroke="#1A1A1A" stroke-width="2" rx="2"/><text x="0" y="-1" text-anchor="middle" font-family="Geist,sans-serif" font-size="13" font-weight="800" fill="#1A1A1A" letter-spacing="0.06em">HANK</text><text x="0" y="10" text-anchor="middle" font-family="Inter,sans-serif" font-size="6" font-weight="700" fill="#9CA3AF" letter-spacing="0.18em">AI · ERP</text></g><path d="M 95 290 Q 58 300 48 340 Q 42 375 55 405 L 92 408 Q 97 375 100 345 Q 103 312 108 292 Z" fill="#4A7BF7" stroke="#1A1A1A" stroke-width="3"/><path d="M 48 390 Q 48 412 70 415 Q 90 416 95 405 L 90 388 Q 75 396 60 393 Z" fill="#3461D1" stroke="#1A1A1A" stroke-width="2.5"/><ellipse cx="73" cy="438" rx="29" ry="22" fill="#C9A878" stroke="#1A1A1A" stroke-width="3"/><path d="M 50 432 Q 60 425 70 425" stroke="#A0814F" stroke-width="2" fill="none"/><ellipse cx="73" cy="470" rx="33" ry="20" fill="#C9A878" stroke="#1A1A1A" stroke-width="3"/><ellipse cx="73" cy="478" rx="16" ry="7" fill="#A0814F"/><line x1="58" y1="468" x2="56" y2="483" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/><line x1="73" y1="466" x2="73" y2="484" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/><line x1="88" y1="468" x2="90" y2="483" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/><path d="M 305 290 Q 342 300 352 340 Q 358 375 345 405 L 308 408 Q 303 375 300 345 Q 297 312 292 292 Z" fill="#4A7BF7" stroke="#1A1A1A" stroke-width="3"/><path d="M 352 390 Q 352 412 330 415 Q 310 416 305 405 L 310 388 Q 325 396 340 393 Z" fill="#3461D1" stroke="#1A1A1A" stroke-width="2.5"/><ellipse cx="327" cy="438" rx="29" ry="22" fill="#C9A878" stroke="#1A1A1A" stroke-width="3"/><path d="M 350 432 Q 340 425 330 425" stroke="#A0814F" stroke-width="2" fill="none"/><ellipse cx="327" cy="470" rx="33" ry="20" fill="#C9A878" stroke="#1A1A1A" stroke-width="3"/><ellipse cx="327" cy="478" rx="16" ry="7" fill="#A0814F"/><line x1="312" y1="468" x2="310" y2="483" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/><line x1="327" y1="466" x2="327" y2="484" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/><line x1="342" y1="468" x2="344" y2="483" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/><path d="M 100 115 Q 95 100 110 92 Q 145 72 200 72 Q 255 72 290 92 Q 305 100 300 115 L 308 200 Q 312 245 295 270 Q 270 290 200 290 Q 130 290 105 270 Q 88 245 92 200 Z" fill="#C9A878" stroke="#1A1A1A" stroke-width="3"/><path d="M 92 210 Q 92 255 120 275 Q 145 282 162 277 Q 152 250 142 220 Z" fill="#A0814F" opacity="0.45"/><path d="M 308 210 Q 308 255 280 275 Q 255 282 238 277 Q 248 250 258 220 Z" fill="#A0814F" opacity="0.45"/><path d="M 95 132 Q 78 118 82 148 Q 88 168 112 162 Q 105 148 100 132 Z" fill="#A0814F" stroke="#1A1A1A" stroke-width="3"/><path d="M 305 132 Q 322 118 318 148 Q 312 168 288 162 Q 295 148 300 132 Z" fill="#A0814F" stroke="#1A1A1A" stroke-width="3"/><path d="M 92 138 Q 92 152 102 158" fill="none" stroke="#6B4423" stroke-width="2"/><path d="M 308 138 Q 308 152 298 158" fill="none" stroke="#6B4423" stroke-width="2"/><path d="M 162 142 Q 200 132 238 142" fill="none" stroke="#1A1A1A" stroke-width="2" opacity="0.55"/><path d="M 172 154 Q 200 146 228 154" fill="none" stroke="#1A1A1A" stroke-width="2" opacity="0.5"/><ellipse cx="200" cy="228" rx="64" ry="48" fill="#F0DEC0" stroke="#1A1A1A" stroke-width="3"/><path d="M 140 235 Q 132 272 158 282 Q 200 292 242 282 Q 268 272 260 235 Q 235 252 200 254 Q 165 252 140 235 Z" fill="#F0DEC0" stroke="#1A1A1A" stroke-width="3"/><path d="M 178 192 Q 173 184 200 184 Q 227 184 222 192 Q 224 210 200 213 Q 176 210 178 192 Z" fill="#1A1A1A"/><ellipse cx="190" cy="192" rx="4" ry="2.5" fill="#FAF7F1" opacity="0.65"/><path d="M 200 213 L 200 240" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/><path d="M 200 240 Q 178 252 158 246" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/><path d="M 200 240 Q 222 252 242 246" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/><path d="M 172 256 Q 200 272 228 256 Q 222 266 200 269 Q 178 266 172 256 Z" fill="#1A1A1A"/><path d="M 192 261 Q 200 272 208 261 L 209 268 Q 200 273 191 268 Z" fill="#E89090"/><path d="M 176 258 L 180 269 L 184 258 Z" fill="#FAF7F1" stroke="#1A1A1A" stroke-width="1.2"/><path d="M 216 258 L 220 269 L 224 258 Z" fill="#FAF7F1" stroke="#1A1A1A" stroke-width="1.2"/><g><ellipse cx="160" cy="178" rx="17" ry="19" fill="#FAF7F1" stroke="#1A1A1A" stroke-width="3"/><ellipse cx="160" cy="180" rx="9.350000000000001" ry="11.4" fill="#1A1A1A"/><ellipse cx="160" cy="180" rx="4.42" ry="5.7" fill="#4A7BF7"/><circle cx="163" cy="175" r="3.4000000000000004" fill="#FAF7F1"/></g><g><ellipse cx="240" cy="178" rx="17" ry="19" fill="#FAF7F1" stroke="#1A1A1A" stroke-width="3"/><ellipse cx="240" cy="180" rx="9.350000000000001" ry="11.4" fill="#1A1A1A"/><ellipse cx="240" cy="180" rx="4.42" ry="5.7" fill="#4A7BF7"/><circle cx="243" cy="175" r="3.4000000000000004" fill="#FAF7F1"/></g><path d="M 142 152 Q 158 138 182 146 Q 168 152 142 158 Z" fill="#A0814F" stroke="#1A1A1A" stroke-width="2"/><path d="M 258 152 Q 242 138 218 146 Q 232 152 258 158 Z" fill="#A0814F" stroke="#1A1A1A" stroke-width="2"/><path d="M 92 115 Q 92 48 200 42 Q 308 48 308 115 L 308 122 Q 200 108 92 122 Z" fill="#F5B000" stroke="#1A1A1A" stroke-width="3"/><path d="M 125 62 Q 165 47 200 50 Q 175 60 142 80 Q 128 80 125 62 Z" fill="#FFD64A" opacity="0.85"/><path d="M 200 44 L 200 118" stroke="#C48400" stroke-width="3"/><path d="M 162 50 Q 162 80 162 116" stroke="#C48400" stroke-width="1.5" opacity="0.55"/><path d="M 238 50 Q 238 80 238 116" stroke="#C48400" stroke-width="1.5" opacity="0.55"/><path d="M 76 112 Q 76 126 95 128 L 305 128 Q 324 126 324 112 L 308 105 Q 200 100 92 105 Z" fill="#C48400" stroke="#1A1A1A" stroke-width="3"/><rect x="92" y="112" width="216" height="9" fill="#1A1A1A" opacity="0.85"/><line x1="115" y1="78" x2="115" y2="105" stroke="#1A1A1A" stroke-width="1.5" opacity="0.5"/><line x1="285" y1="78" x2="285" y2="105" stroke="#1A1A1A" stroke-width="1.5" opacity="0.5"/><g transform="translate(200,86) scale(1)"><rect x="-28" y="-13" width="56" height="26" fill="#1A1A1A" stroke="#FAF7F1" stroke-width="1.5" rx="3"/><rect x="-24" y="-9" width="48" height="18" fill="#4A7BF7" rx="2"/><circle cx="-19" cy="-4" r="1.2" fill="#FAF7F1" opacity="0.85"/><circle cx="-19" cy="4" r="1.2" fill="#FAF7F1" opacity="0.85"/><circle cx="19" cy="-4" r="1.2" fill="#FAF7F1" opacity="0.85"/><circle cx="19" cy="4" r="1.2" fill="#FAF7F1" opacity="0.85"/><text x="0" y="4" text-anchor="middle" font-family="Geist,sans-serif" font-size="10" font-weight="800" fill="#FAF7F1" letter-spacing="0.08em">HANK.AI</text><rect x="-28" y="-13" width="56" height="26" fill="none" stroke="#4A7BF7" stroke-width="1.2" rx="3" opacity="0.6"><animate attributeName="opacity" values="0.6;1;0.6" dur="2.4s" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" repeatCount="indefinite"/></rect></g></svg>';
  return (
    <section className="section" id="hank" style={{ background: 'var(--sg-off-white)', minHeight: 'calc(100vh - 64px)', paddingTop: 48, paddingBottom: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="container">
        <Reveal>
          <div style={{ textAlign: 'center' }}>
            <div className="tag">PRODUCT FEATURE</div>
            <h2 className="h2 ink" style={{ maxWidth: 760, margin: '0 auto' }}>
              Meet Hank - the AI assistant for your shop floor.
            </h2>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="hank-stage" style={{ marginTop: 36, display: 'grid', gridTemplateColumns: '0.78fr 1.5fr', gap: 32, alignItems: 'center' }}>
            <div className="hank-mascot" aria-hidden="true" dangerouslySetInnerHTML={{ __html: BULLDOG_SVG }} />
            <HankChat />
          </div>
        </Reveal>
        <div style={{textAlign:'center',marginTop:28}}>
          <a href="case-studies.html" style={{fontSize:14,fontWeight:600,color:'var(--sg-blue)',textDecoration:'none'}}>See live customer deployments →</a>
        </div>
      </div>
      <style>{`
        .hank-mascot { display: flex; justify-content: flex-start; align-items: flex-end; }
        .hank-mascot svg { width: 100%; max-width: 380px; height: auto; display: block; filter: drop-shadow(0 18px 30px rgba(15,23,42,0.12)); }
        @media (max-width: 860px) {
          .hank-stage { grid-template-columns: 1fr !important; gap: 20px !important; }
          .hank-mascot svg { max-width: 240px; }
        }
      `}</style>
    </section>
  );
}
window.MotivationSection = MotivationSection;

// Hank - interactive AI chatbot answering the same Friday-night questions,
// from the events ledger.
function HankChat() {
  const conversation = [
    { role: 'user', day: 'Monday 9:14 AM', text: 'Hank, how much did we ship last week?' },
    { role: 'hank', body: [
      { line: 'Mar 31 - Apr 6: ', strong: '47 dispatches · $480k invoiced.' },
      { line: 'Top buyer: ', strong: 'Hampton Co', after: ' - 12 dispatches, $115k.' },
      { line: '2 disputes pending: INV-2207, INV-2189.' },
    ], cta: 'See the dispatch log →' },

    { role: 'user', day: 'Monday 11:02 AM', text: 'Which SKU moves fastest through production right now?' },
    { role: 'hank', body: [
      { line: 'Throughput, last 30 days:' },
      { line: '· B118 sideboards (15 cft): ', strong: '3.0 cft/day · 5-day cycle' },
      { line: '· A203 tables (10 cft): ', strong: '1.0 cft/day · 10-day cycle' },
      { line: '· C040 chairs (8 cft): ', strong: '0.6 cft/day · 14-day cycle' },
      { line: 'Fastest: ', strong: 'B118 - 3× the throughput of C040.' },
      { line: 'If you ramp B118, you ship 3× the volume in the same window.' },
    ], cta: 'See line throughput →' },

    { role: 'user', day: 'Tuesday 9:24 AM', text: "What's slowing the plant this week?" },
    { role: 'hank', body: [
      { line: 'Top constraint: ', strong: 'QC inspection - 38 hr backlog' , after: ' (vs 12 hr avg).' },
      { line: 'Cause: 2 of 3 inspectors on leave Apr 22-25.' },
      { line: 'Stuck: ', strong: '14 batches', after: ' pre-dispatch · $105k locked.' },
      { line: 'Suggestion: rotate Akhil (QC-certified) from procurement.' },
    ], cta: 'Open the bottleneck view →' },

    { role: 'user', day: 'Tuesday 2:33 PM', text: 'Why is PO-4521 higher than what we quoted?' },
    { role: 'hank', body: [
      { line: 'Edited ', strong: 'Tue 4:13 PM by Mike (Floor).' },
      { line: '$16,200 → ', strong: '$17,800', after: '.' },
      { line: 'Reason logged: “rate revision per vendor email, Mar 18.”' },
    ], cta: 'Open the audit trail →' },

    { role: 'user', day: 'Wednesday 10:11 AM', text: 'If I take a 200-unit Apex order, when can I deliver?' },
    { role: 'hank', body: [
      { line: 'Apex pattern = sideboards (B118 family).' },
      { line: 'Volume: ', strong: '200 × 15 cft = 3,000 cft.' },
      { line: 'Current load: 1 line free, 1 line at 92%.' },
      { line: 'Earliest start: ', strong: 'May 6', after: ' (after current backlog).' },
      { line: 'Earliest delivery: ', strong: 'May 25.' },
    ] },

    { role: 'user', day: 'Wednesday 3:48 PM', text: 'Which contractor has the worst rejection rate this quarter?' },
    { role: 'hank', body: [
      { line: 'Top 3 by reject %:' },
      { line: '1. ', strong: 'Sunrise Steel - 8.2%', after: ' (12 of 146 batches) ↑ from 4% Q1' },
      { line: '2. Westwood Mfg - 4.1%' },
      { line: '3. Acme Fab - 2.7%' },
      { line: 'Driver: ', strong: 'weld defects on 3 mm sheet', after: ', started Mar 20.' },
    ], cta: 'See contractor scorecards →' },

    { role: 'user', day: 'Wednesday 6:41 PM', text: 'Did the QC reject for Hampton go back to the contractor?' },
    { role: 'hank', body: [
      { line: 'Yes. ', strong: 'Batch B-7710', after: ' - 12 pcs, rejected by Raj at 11:46:44.' },
      { line: 'Auto-routed back to Sunrise Steel.' },
      { line: 'Replacement ETA: Apr 27 · cost recovery: $1,700 claimed.' },
    ] },

    { role: 'user', day: 'Thursday 8:30 AM', text: 'Can we commit to ramping output 30% next month?' },
    { role: 'hank', body: [
      { line: 'Current: ', strong: '47 dispatches/wk · 517 cft/wk.' },
      { line: '+30% target: ', strong: '672 cft/wk.' },
      { line: 'Bottlenecks at +30%:' },
      { line: '· Cutting line - 92% util · needs +1 shift' },
      { line: '· Steel supply - 2-wk lead · PO by May 1' },
      { line: '· QC - clears May 6' },
      { line: 'Verdict: ', strong: 'feasible from week of May 12', after: ' with the shift add.' },
    ], cta: 'Run the ramp scenario →' },

    { role: 'user', day: 'Thursday 11:15 AM', text: "What's at risk of running out in the next 7 days?" },
    { role: 'hank', body: [
      { line: '3 SKUs below safety stock:' },
      { line: '· ', strong: '3 mm steel sheet - 4 days', after: ' at current draw' },
      { line: '· M8 hex bolts - 5 days' },
      { line: '· Walnut veneer - 6 days' },
      { line: 'All 3 auto-reordered Apr 24. Vendor ETA Apr 29 - May 1.' },
    ] },

    { role: 'user', day: 'Thursday 4:02 PM', text: 'Where are we bleeding margin this month?' },
    { role: 'hank', body: [
      { line: 'Margin slip vs April plan:' },
      { line: '· Sideboards (B118): ', strong: '-4.2 pts', after: ' - rework on Sunrise batches' },
      { line: '· Tables (A203): -1.8 pts - wood scrap up 6%' },
      { line: '· Chairs (C040): on plan' },
      { line: 'Combined hit: ', strong: '$7,700 vs plan.' },
    ], cta: 'Open the margin tree →' },

    { role: 'user', day: 'Friday 8:52 PM', text: "What's our cash position by buyer?" },
    { role: 'hank', body: [
      { line: 'As of 11:48 AM today:' },
      { line: '· Hampton Co: ', strong: '$145k', after: ' receivable (post-dated Apr 18)' },
      { line: '· Apex Mfg: ', strong: '$100k', after: ' - overdue 3 days, flagged' },
      { line: '· Elite Motors: ', strong: '$67k', after: ' current' },
      { line: 'Total AR: ', strong: '$552k · DSO 42 days.' },
    ] },

    { role: 'user', day: 'Friday 9:22 PM', text: 'Which buyer is actually most profitable?' },
    { role: 'hank', body: [
      { line: 'Net margin, last 90 days:' },
      { line: '· Elite Motors: ', strong: '22.3%', after: ' · $290k top-line' },
      { line: '· Hampton Co: 18.6% · $490k - best volume' },
      { line: '· Apex Mfg: 11.4% · $215k - eroded by 3 disputes' },
      { line: 'Hold capacity for ', strong: 'Hampton + Elite', after: ' first.' },
    ], cta: 'See buyer P&L →' },
  ];

  const ref = React.useRef(null);
  const scrollRef = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [typing, setTyping] = React.useState(false);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
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
      const t = setTimeout(() => { setTyping(false); setStep(s => s + 1); }, 1400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep(s => s + 1), step === 0 ? 300 : 1600);
    return () => clearTimeout(t);
  }, [inView, step, typing, paused]);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [step, typing]);

  const visible = conversation.slice(0, step);
  const showingTyping = typing && step < conversation.length && conversation[step].role === 'hank';
  const done = step >= conversation.length;

  const replay = () => { setTyping(false); setStep(0); setPaused(false); };
  const togglePause = () => setPaused(p => !p);

  return (
    <div ref={ref} style={{
      background: '#fff', border: '1px solid var(--border)', borderRadius: 14,
      overflow: 'hidden', boxShadow: '0 18px 48px rgba(15,23,42,0.08)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 18px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--sg-off-white)',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: '#fff', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(74,123,247,0.25)',
        }}>
          <span aria-hidden="true" style={{ width: '100%', height: '100%', display: 'block' }} dangerouslySetInnerHTML={{ __html: '<svg viewBox="75 40 250 250" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><g><path d="M 100 115 Q 95 100 110 92 Q 145 72 200 72 Q 255 72 290 92 Q 305 100 300 115 L 308 200 Q 312 245 295 270 Q 270 290 200 290 Q 130 290 105 270 Q 88 245 92 200 Z" fill="#C9A878" stroke="#1A1A1A" stroke-width="3"/><path d="M 92 210 Q 92 255 120 275 Q 145 282 162 277 Q 152 250 142 220 Z" fill="#A0814F" opacity="0.45"/><path d="M 308 210 Q 308 255 280 275 Q 255 282 238 277 Q 248 250 258 220 Z" fill="#A0814F" opacity="0.45"/><path d="M 95 132 Q 78 118 82 148 Q 88 168 112 162 Q 105 148 100 132 Z" fill="#A0814F" stroke="#1A1A1A" stroke-width="3"/><path d="M 305 132 Q 322 118 318 148 Q 312 168 288 162 Q 295 148 300 132 Z" fill="#A0814F" stroke="#1A1A1A" stroke-width="3"/><path d="M 162 142 Q 200 132 238 142" fill="none" stroke="#1A1A1A" stroke-width="2" opacity="0.55"/><path d="M 172 154 Q 200 146 228 154" fill="none" stroke="#1A1A1A" stroke-width="2" opacity="0.5"/><ellipse cx="200" cy="228" rx="64" ry="48" fill="#F0DEC0" stroke="#1A1A1A" stroke-width="3"/><path d="M 140 235 Q 132 272 158 282 Q 200 292 242 282 Q 268 272 260 235 Q 235 252 200 254 Q 165 252 140 235 Z" fill="#F0DEC0" stroke="#1A1A1A" stroke-width="3"/><path d="M 178 192 Q 173 184 200 184 Q 227 184 222 192 Q 224 210 200 213 Q 176 210 178 192 Z" fill="#1A1A1A"/><ellipse cx="190" cy="192" rx="4" ry="2.5" fill="#FAF7F1" opacity="0.65"/><g><g><ellipse cx="160" cy="178" rx="17" ry="19" fill="#FAF7F1" stroke="#1A1A1A" stroke-width="3"/><ellipse cx="160" cy="180" rx="9.350000000000001" ry="11.4" fill="#1A1A1A"/><ellipse cx="160" cy="180" rx="4.42" ry="5.7" fill="#4A7BF7"/><circle cx="163" cy="175" r="3.4000000000000004" fill="#FAF7F1"/></g><g><ellipse cx="240" cy="178" rx="17" ry="19" fill="#FAF7F1" stroke="#1A1A1A" stroke-width="3"/><ellipse cx="240" cy="180" rx="9.350000000000001" ry="11.4" fill="#1A1A1A"/><ellipse cx="240" cy="180" rx="4.42" ry="5.7" fill="#4A7BF7"/><circle cx="243" cy="175" r="3.4000000000000004" fill="#FAF7F1"/></g><g><path d="M 200 213 L 200 240" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/><path d="M 200 240 Q 178 252 158 246" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/><path d="M 200 240 Q 222 252 242 246" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/><path d="M 172 256 Q 200 272 228 256 Q 222 266 200 269 Q 178 266 172 256 Z" fill="#1A1A1A"/><path d="M 192 261 Q 200 272 208 261 L 209 268 Q 200 273 191 268 Z" fill="#E89090"/><path d="M 176 258 L 180 269 L 184 258 Z" fill="#FAF7F1" stroke="#1A1A1A" stroke-width="1.2"/><path d="M 216 258 L 220 269 L 224 258 Z" fill="#FAF7F1" stroke="#1A1A1A" stroke-width="1.2"/></g></g><path d="M 142 152 Q 158 138 182 146 Q 168 152 142 158 Z" fill="#A0814F" stroke="#1A1A1A" stroke-width="2"/><path d="M 258 152 Q 242 138 218 146 Q 232 152 258 158 Z" fill="#A0814F" stroke="#1A1A1A" stroke-width="2"/><path d="M 92 115 Q 92 48 200 42 Q 308 48 308 115 L 308 122 Q 200 108 92 122 Z" fill="#F5B000" stroke="#1A1A1A" stroke-width="3"/><path d="M 125 62 Q 165 47 200 50 Q 175 60 142 80 Q 128 80 125 62 Z" fill="#FFD64A" opacity="0.85"/><path d="M 200 44 L 200 118" stroke="#C48400" stroke-width="3"/><path d="M 162 50 Q 162 80 162 116" stroke="#C48400" stroke-width="1.5" opacity="0.55"/><path d="M 238 50 Q 238 80 238 116" stroke="#C48400" stroke-width="1.5" opacity="0.55"/><path d="M 76 112 Q 76 126 95 128 L 305 128 Q 324 126 324 112 L 308 105 Q 200 100 92 105 Z" fill="#C48400" stroke="#1A1A1A" stroke-width="3"/><rect x="92" y="112" width="216" height="9" fill="#1A1A1A" opacity="0.85"/><line x1="115" y1="78" x2="115" y2="105" stroke="#1A1A1A" stroke-width="1.5" opacity="0.5"/><line x1="285" y1="78" x2="285" y2="105" stroke="#1A1A1A" stroke-width="1.5" opacity="0.5"/><g transform="translate(200,86) scale(1)"><rect x="-28" y="-13" width="56" height="26" fill="#1A1A1A" stroke="#FAF7F1" stroke-width="1.5" rx="3"/><rect x="-24" y="-9" width="48" height="18" fill="#4A7BF7" rx="2"/><circle cx="-19" cy="-4" r="1.2" fill="#FAF7F1" opacity="0.85"/><circle cx="-19" cy="4" r="1.2" fill="#FAF7F1" opacity="0.85"/><circle cx="19" cy="-4" r="1.2" fill="#FAF7F1" opacity="0.85"/><circle cx="19" cy="4" r="1.2" fill="#FAF7F1" opacity="0.85"/><text x="0" y="4" text-anchor="middle" font-family="Geist,sans-serif" font-size="10" font-weight="800" fill="#FAF7F1" letter-spacing="0.08em">HANK.AI</text><rect x="-28" y="-13" width="56" height="26" fill="none" stroke="#4A7BF7" stroke-width="1.2" rx="3" opacity="0.6"><animate attributeName="opacity" values="0.6;1;0.6" dur="2.4s" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" repeatCount="indefinite"/></rect></g></g></svg>' }} />
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14, color: 'var(--fg1)', display: 'flex', alignItems: 'center', gap: 8 }}>
            Hank
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--sg-blue)', background: 'rgba(74,123,247,0.12)',
              padding: '2px 6px', borderRadius: 999,
            }}>AI</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--fg3)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 0 3px rgba(16,185,129,0.18)' }}></span>
            online · reads from the activity ledger
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {!done && (
            <button onClick={togglePause} style={{
              background: paused ? 'var(--sg-blue)' : '#fff',
              border: '1px solid ' + (paused ? 'var(--sg-blue)' : 'var(--border)'),
              color: paused ? '#fff' : 'var(--fg2)',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '6px 11px', borderRadius: 4,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}>{paused ? '▶ Resume' : '⏸ Pause'}</button>
          )}
          <button onClick={replay} disabled={!done && !paused} style={{
            background: done ? 'var(--sg-blue)' : 'transparent',
            border: done ? 'none' : '1px solid var(--border)',
            color: done ? '#fff' : 'var(--fg3)',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            padding: '6px 11px', borderRadius: 4,
            cursor: (done || paused) ? 'pointer' : 'default',
            fontFamily: 'var(--font-body)',
            opacity: (done || paused) ? 1 : 0.45,
          }}>⟲ Replay</button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{
        padding: '20px 22px',
        height: 460, overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: 14,
        background: '#fff',
      }}>
        {visible.map((m, i) => <HankBubble key={i} message={m} />)}
        {showingTyping && <HankTyping />}
      </div>

      {/* Input bar (visual only) */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 16px',
        borderTop: '1px solid var(--border)',
        background: 'var(--sg-off-white)',
      }}>
        <div style={{
          flex: 1,
          background: '#fff', border: '1px solid var(--border)', borderRadius: 8,
          padding: '10px 12px', fontSize: 13, color: 'var(--fg3)', fontFamily: 'var(--font-body)',
        }}>
          Ask Hank anything{'…'}
        </div>
        <button style={{
          background: 'var(--sg-blue)', color: '#fff',
          border: 'none', borderRadius: 8, padding: '10px 16px',
          fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)',
        }}>Send</button>
      </div>

      <style>{`
        @keyframes sgChatIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sgTypingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30%           { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
window.HankChat = HankChat;

function HankBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: isUser ? 'flex-end' : 'flex-start',
      animation: 'sgChatIn 0.35s cubic-bezier(0.2,0.8,0.2,1) both',
    }}>
      {message.day && (
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--fg3)', letterSpacing: '0.06em',
          margin: isUser ? '0 6px 4px 0' : '0 0 4px 6px',
        }}>{message.day}</div>
      )}
      <div style={{
        maxWidth: '82%',
        background: isUser ? 'var(--sg-blue)' : 'var(--sg-off-white)',
        color: isUser ? '#fff' : 'var(--fg1)',
        border: isUser ? 'none' : '1px solid var(--border)',
        borderRadius: 14,
        borderTopLeftRadius: isUser ? 14 : 4,
        borderTopRightRadius: isUser ? 4 : 14,
        padding: '11px 15px',
        fontSize: 14, lineHeight: 1.55,
      }}>
        {isUser ? (
          message.text
        ) : (
          <>
            {message.body.map((b, i) => (
              <div key={i} style={{ marginBottom: i < message.body.length - 1 ? 4 : 0 }}>
                {b.line}
                {b.strong && <strong style={{ color: 'var(--fg1)', fontWeight: 700 }}>{b.strong}</strong>}
                {b.after}
              </div>
            ))}
            {message.cta && (
              <a href="#ledger" style={{
                display: 'inline-block', marginTop: 10,
                fontSize: 12, fontWeight: 600, color: 'var(--sg-blue)',
                textDecoration: 'none',
              }}>{message.cta}</a>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function HankTyping() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'flex-start',
      animation: 'sgChatIn 0.3s ease-out both',
    }}>
      <div style={{
        background: 'var(--sg-off-white)', border: '1px solid var(--border)',
        borderRadius: 14, borderTopLeftRadius: 4,
        padding: '14px 18px', display: 'flex', gap: 5, alignItems: 'center',
      }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 6, height: 6, borderRadius: '50%', background: 'var(--fg3)',
            display: 'inline-block',
            animation: `sgTypingDot 1.2s ${i * 0.18}s infinite ease-in-out`,
          }}></span>
        ))}
      </div>
    </div>
  );
}

// ABILITY - make adoption stupid easy
function AbilitySection() {
  const lines = [
    { type: 'prompt',   text: '> received 200 sheets 16-gauge from Midwest, PO-4521' },
    { type: 'response', text: '✓ Matched to PO-4521.\n  Inventory +200 · AP +₹14.2L\n  Reorder rule R-204 paused.\n  Logged at 11:46:05 by Hank.' },
  ];
  return (
    <section className="section" id="ability" style={{ background: '#fff', paddingTop: 140, paddingBottom: 140 }}>
      <div className="container">
        <Reveal>
          <div className="tag">EASY ADOPTION · FOR THE PEOPLE WHO ACTUALLY DO THE WORK</div>
          <h2 className="h2 ink" style={{ maxWidth: 1200 }}>
            If your warehouse manager can send a text, he can run your floor.
          </h2>
          <p className="lead" style={{ maxWidth: '100%' }}>
            Adoption is where ERPs go to die. We removed the menus, the codes, the training manual. Your team types what happened. The system does the seven steps.
          </p>
        </Reveal>

        <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 36, alignItems: 'center' }}>
          <Reveal>
            <TypingDemo lines={lines} />
          </Reveal>
          <Reveal delay={120}>
            <div>
              <div style={{ display: 'grid', gap: 18 }}>
                {[
                  { t: 'No training day', p: 'Day one, your floor is logging in. The interface is a sentence.' },
                  { t: 'No menus to memorize', p: 'No SKU codes, no transaction codes, no eight-tab forms. The model knows what you mean.' },
                  { t: 'No data lost in chat threads', p: 'Every "received this," "approved that," "QC rejected" becomes a permanent event with a name and a timestamp.' },
                ].map((x, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 14, alignItems: 'start' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--sg-blue-light)', color: 'var(--sg-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, marginTop: 2 }}>{i + 1}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 700, color: 'var(--fg1)', marginBottom: 4 }}>{x.t}</div>
                      <div style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.6 }}>{x.p}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
window.AbilitySection = AbilitySection;

// TRIGGER - final CTA, friction-free
function TriggerCTA() {
  const [showInvite, setShowInvite] = React.useState(false);
  return (
    <section className="section section-dark final-cta" style={{ paddingTop: 80, paddingBottom: 88 }}>
      <div className="container">
        <Reveal>
          <div className="tag" style={{ color: 'rgba(255,255,255,0.5)' }}>TRY IT ON. THEN DECIDE.</div>
          <h2 className="h2" style={{ color: '#fff', maxWidth: 880, margin: '0 auto' }}>
            Three hours with us. Thirty days on your real floor. Then decide.
          </h2>
          <p className="sub" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 720, margin: '18px auto 0' }}>
            We configure SimpleGrid to your floor at our cost. Your team runs it live on real orders for 30 days. You pay only when it works. If by day 30 it hasn{'\u2019'}t moved the business, you walk. No invoice. No clawback.
          </p>
          <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
            <button type="button" onClick={() => setShowInvite(true)} className="btn btn-lg btn-invite" style={{animation:'sgBuildPulse 1.8s ease-in-out infinite'}}>Book a demo →</button>
          </div>
          <p className="note" style={{ color: 'rgba(255,255,255,0.5)', marginTop: 14 }}>Migration included · Limited capacity each quarter</p>
        </Reveal>
      </div>
      {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    </section>
  );
}
window.TriggerCTA = TriggerCTA;
