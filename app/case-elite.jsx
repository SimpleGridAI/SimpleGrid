function ValueInfographic() {
  const items = [
    {
      cls: 'a',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      h: 'Planning time',
      from: '20 hrs',
      to: '2 hrs',
      delta: '−90%',
      desc: 'A week of planner-only spreadsheet work compressed into a single morning. The system aggregates wood requirements across orders automatically.',
    },
    {
      cls: 'b',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m1 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"/></svg>,
      h: 'Material wastage',
      from: '1.5%',
      to: '<0.1%',
      delta: 'Near zero',
      desc: 'Component-level reconciliation catches gaps at the source. The $50K/yr leakage that hid in monthly reconciliations is gone.',
    },
    {
      cls: 'c',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3-9 4 18 3-9h4"/></svg>,
      h: 'On-time delivery',
      from: 'baseline',
      to: '+15%',
      delta: '+15%',
      desc: 'Full-stage visibility plus contractor accountability surfaced delays days earlier. Buyers ship on schedule.',
    },
    {
      cls: 'd',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
      h: 'Floor adoption',
      from: '0 users',
      to: '30 users',
      delta: '30 of 30 staff onboarded',
      desc: '30 non-technical floor staff who rejected every previous ERP now work the system daily - by chatting with Hank, not navigating menus.',
    },
  ];
  return (
    <div className="infographic">
      <div className="infographic-title">VALUE DELIVERED</div>
      <div className="infographic-h" role="heading" aria-level="3">What changed, in numbers.</div>
      <p className="infographic-sub">Four years of operational drag, undone in 21 days. These are the deltas the founder reads off his dashboard now.</p>
      <div className="value-grid">
        {items.map(it => (
          <div key={it.h} className={'value-card ' + it.cls}>
            <div className="icon-box">{it.icon}</div>
            <h4>{it.h}</h4>
            <div className="ba">
              <span className="from">{it.from}</span>
              <span className="arrow">→</span>
              <span className="to">{it.to}</span>
            </div>
            <span className="delta">{it.delta}</span>
            <p className="desc">{it.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ManufacturingProcessSection() {
  // 13-step abbreviated production flow (left column)
  const flow = [
    {h:'Buyer PO arrives',          b:'AI parses any PDF format. Sales order created with line items.'},
    {h:'SO approved',               b:'Cost snapshot freezes. Planning unlocks.'},
    {h:'Planner allocates',         b:'Per SKU: in-house vs. vendor splits. Tracked automatically.'},
    {h:'Wood needs aggregated',     b:'All component-level wood requirements rolled up across orders.'},
    {h:'Wood PO consolidated',      b:'One PO per species + thickness. Multi-vendor quoted.'},
    {h:'Wood received',             b:'Seasoned/unseasoned check at receipt. Inventory + AP update live.'},
    {h:'Issued to machining',       b:'Each cubic foot attaches to a SKU + component.'},
    {h:'QC + components stocked',   b:'Pass enters component stock; fail returns or scraps.'},
    {h:'Assembly',                  b:'Components merge into a SKU. Tracking shifts component → SKU.'},
    {h:'Sand · finish · hardware',  b:'Per-sqft, per-sqft, per-fitting × screw size. QC at every gate.'},
    {h:'Final QC',                  b:'Buyer-spec gate. Photo, moisture, dimensions. Block on fail.'},
    {h:'Packaging + dispatch',      b:'CBM auto-calculated. Container loaded.'},
    {h:'Invoice + settlement',      b:"Buyer billed. Six contractors auto-settled, each on its own formula."},
  ];

  // Stage A/B/C/D framework (right column)
  const stages = [
    { letter:'A', title:'Components', range:'01–06', color:'var(--sg-blue)',   desc:'Wood in, machined parts out. Tracking is per component, per SKU.' },
    { letter:'B', title:'Assembly',   range:'07–09', color:'var(--sg-purple)', desc:'Components merge into a SKU. From here, tracking is per SKU.' },
    { letter:'C', title:'Finishing',  range:'10–15', color:'var(--sg-gold)',   desc:'Sand, finish, hardware. The most error-prone window.' },
    { letter:'D', title:'Dispatch',   range:'16–19', color:'var(--sg-green)',  desc:'Final QC, pack, ship. Buyer-spec compliance enforced.' },
  ];

  // Contractor settlement matrix (full width below)
  const pricing = [
    { color:'var(--sg-blue)',   stage:'Machining',        rate:'Per sqft (panels) · per running ft (frames)', detail:'Rate varies by wood thickness. System reads the issuance ticket and applies the right matrix.' },
    { color:'var(--sg-purple)', stage:'Assembly',         rate:'Per SKU',                                    detail:"Each assembled unit GRN'd from the contractor settles on the SKU rate card." },
    { color:'var(--sg-blue)',   stage:'Sanding',          rate:'Per sqft of finished surface (90%)',         detail:'For irregular profiles, rate falls back to per-SKU. System holds both rate types.' },
    { color:'var(--sg-green)',  stage:'Finishing',        rate:'Per sqft of finished surface (90%)',         detail:'Multi-coat sequences priced as one unit per pass. Coat count tracked, rate is per surface.' },
    { color:'var(--sg-gold)',   stage:'Hardware fitting', rate:'Per fitting × screw-size matrix',            detail:'Each hinge, slide, handle, screw priced individually. Larger screws → higher labor rate.' },
    { color:'var(--sg-green)',  stage:'Packaging',        rate:'Per CBM of packed material',                 detail:'CBM auto-calculated from carton dimensions at pack-out. Settles to packing contractor on dispatch.' },
  ];

  return (
    <section className="case-section">
      <h2>The manufacturing process</h2>
      <p style={{maxWidth:920}}>
        Wood arrives. Furniture leaves. Between sit 19 tracked stages, four QC gates, and six contractor formulas. Below: the abbreviated flow on the left, the moving line in the center, the structural framework on the right - three views of the same process.
      </p>

      <div className="elite-mfg-grid" style={{
        display:'grid',
        gridTemplateColumns:'minmax(220px, 1fr) minmax(520px, 1.7fr) minmax(220px, 1fr)',
        gap:20,
        marginTop:24,
        alignItems:'start',
      }}>
        {/* LEFT - production flow narrative */}
        <aside style={{position:'sticky', top:16, alignSelf:'start'}}>
          <div style={{background:'#fff', border:'1px solid var(--border)', borderRadius:12, padding:18}}>
            <div style={{fontSize:10, fontWeight:700, letterSpacing:'0.14em', color:'var(--sg-blue)', textTransform:'uppercase', marginBottom:10}}>
              The flow, end-to-end
            </div>
            <ol style={{listStyle:'none', padding:0, margin:0}}>
              {flow.map((f,i)=>(
                <li key={i} style={{
                  position:'relative',
                  paddingLeft:26,
                  paddingBottom: i < flow.length-1 ? 9 : 0,
                  marginBottom: i < flow.length-1 ? 9 : 0,
                  borderBottom: i < flow.length-1 ? '1px dashed var(--border)' : 'none',
                }}>
                  <span style={{
                    position:'absolute', left:0, top:1,
                    fontSize:9.5, fontWeight:700, color:'var(--sg-blue)',
                    fontFamily:'var(--font-mono)',
                  }}>{String(i+1).padStart(2,'0')}</span>
                  <div style={{fontFamily:'var(--font-heading)', fontSize:12.5, fontWeight:700, color:'var(--fg1)', marginBottom:2, lineHeight:1.3}}>{f.h}</div>
                  <div style={{fontSize:11.5, color:'var(--fg2)', lineHeight:1.45}}>{f.b}</div>
                </li>
              ))}
            </ol>
          </div>
          <p style={{fontSize:12, color:'var(--fg3)', lineHeight:1.5, marginTop:12, marginBottom:0, fontStyle:'italic', maxWidth:'none'}}>
            By the time a product ships, the system knows exactly what it cost. SKU-level profitability - for the first time in the company's history.
          </p>
        </aside>

        {/* CENTER - interactive */}
        <div>
          <EliteFactoryRoad compact={true} />
        </div>

        {/* RIGHT - manufacturing structure */}
        <aside style={{position:'sticky', top:16, alignSelf:'start'}}>
          <div style={{background:'#fff', border:'1px solid var(--border)', borderRadius:12, padding:18}}>
            <div style={{fontSize:10, fontWeight:700, letterSpacing:'0.14em', color:'var(--sg-purple)', textTransform:'uppercase', marginBottom:12}}>
              How the stages stack
            </div>
            {stages.map((s,i)=>(
              <div key={i} style={{
                display:'grid', gridTemplateColumns:'26px 1fr', gap:10,
                paddingTop: i===0 ? 0 : 10,
                paddingBottom: i < stages.length-1 ? 10 : 0,
                borderBottom: i < stages.length-1 ? '1px dashed var(--border)' : 'none',
                alignItems:'start',
              }}>
                <div style={{
                  width:24, height:24, borderRadius:6,
                  background:s.color, color:'#fff',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontFamily:'var(--font-heading)', fontWeight:700, fontSize:12, marginTop:1,
                }}>{s.letter}</div>
                <div>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:8}}>
                    <span style={{fontFamily:'var(--font-heading)', fontSize:13, fontWeight:700, color:'var(--fg1)'}}>{s.title}</span>
                    <span style={{fontFamily:'var(--font-mono)', fontSize:9.5, color:'var(--fg3)'}}>{s.range}</span>
                  </div>
                  <div style={{fontSize:11.5, color:'var(--fg2)', lineHeight:1.45, marginTop:2}}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background:'rgba(74,123,247,0.06)', border:'1px solid rgba(74,123,247,0.18)',
            borderRadius:12, padding:14, marginTop:12,
          }}>
            <div style={{fontSize:10, fontWeight:700, letterSpacing:'0.14em', color:'var(--sg-blue)', textTransform:'uppercase', marginBottom:10}}>
              At a glance
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, fontSize:11.5}}>
              <div><div style={{fontFamily:'var(--font-heading)', fontWeight:700, color:'var(--fg1)', fontSize:20, lineHeight:1}}>19</div><div style={{color:'var(--fg3)'}}>tracked stages</div></div>
              <div><div style={{fontFamily:'var(--font-heading)', fontWeight:700, color:'var(--fg1)', fontSize:20, lineHeight:1}}>4</div><div style={{color:'var(--fg3)'}}>QC gates</div></div>
              <div><div style={{fontFamily:'var(--font-heading)', fontWeight:700, color:'var(--fg1)', fontSize:20, lineHeight:1}}>6</div><div style={{color:'var(--fg3)'}}>contractor types</div></div>
              <div><div style={{fontFamily:'var(--font-heading)', fontWeight:700, color:'var(--fg1)', fontSize:20, lineHeight:1}}>550</div><div style={{color:'var(--fg3)'}}>SKUs</div></div>
            </div>
          </div>
        </aside>
      </div>

      {/* Contractor settlement - full width below */}
      <div className="contractor-table" style={{marginTop:32}}>
        <div className="ct-h">
          <h4>Contractor settlement, by stage</h4>
          <span className="note">Each rate logic is configuration, not custom code.</span>
        </div>
        {pricing.map(p => (
          <div key={p.stage} className="ct-row">
            <div className="ct-stage"><span className="dot" style={{background:p.color}}></span>{p.stage}</div>
            <div className="ct-rate">{p.rate}</div>
            <div className="ct-detail">{p.detail}</div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .elite-mfg-grid {
            grid-template-columns: 1fr !important;
          }
          .elite-mfg-grid aside {
            position: static !important;
          }
        }
      `}</style>
    </section>
  );
}

function EliteCaseStudy() {
  const [showLogin, setShowLogin] = React.useState(false);
  return (<>
    <Nav page="cases" onLoginClick={() => setShowLogin(true)} />
    <main>

    <section className="case-hero">
      <div className="container">
        <div className="tag">CASE STUDY · FURNITURE EXPORT</div>
        <h1>How a furniture exporter with 800 employees went from Excel to a live ERP in 21 days</h1>
        <p className="case-hook">Over four years, Elite Arts &amp; Crafts lost nearly $200,000 to material gaps they could not explain. Not theft. Not fraud. Just a furniture manufacturing operation running at 600–800 employees across 1 million sqft, tracked on Excel and group chats. Today the same operation runs on a live ERP - built around their process, not the other way around.</p>
        <div className="case-strip">
          <div className="case-strip-item"><div className="label">Industry</div><div className="value">Furniture export</div></div>
          <div className="case-strip-item"><div className="label">Employees</div><div className="value">600–800</div></div>
          <div className="case-strip-item"><div className="label">Facilities</div><div className="value">~1,000,000 sqft</div></div>
          <div className="case-strip-item"><div className="label">Deployed in</div><div className="value">21 days</div></div>
        </div>
      </div>
    </section>

    <div className="container">

      {/* INFOGRAPHIC 1 - Value delivered */}
      <ValueInfographic />

      {/* The Operation */}
      <section className="case-section">
        <h2>The operation</h2>
        <p style={{maxWidth:920}}>
          Elite Arts &amp; Crafts is a furniture exporter running 600–800 people across nearly 1 million square feet of production space - raw wood comes in at one end, finished furniture leaves the other in 40-foot containers bound for international buyers. Between those two events sit <strong>19 tracked stages, four quality gates, and six contractor types</strong> - each paid by a different formula. The catalog runs to <strong>550 active SKUs</strong>, each with an average of 20+ unique components, each component cut from a specific wood species at a specific dimension and cubic footage. A single dining table might need mango wood for the top, sheesham for the legs, and a third species for the frame.
        </p>
        <p style={{maxWidth:920}}>
          Work happens at two levels and they cross over at assembly. Wood issuance and machining track at the <strong>component level</strong> - every cubic foot attaches to a specific SKU + component. Once all components for a SKU are machined and QC&rsquo;d they merge; from there, tracking is at the <strong>SKU level</strong> through sanding, finishing, hardware, final QC, packaging, and dispatch. Six contractor types each bill on their own formula - machining per-sqft for panels and per-running-foot for frames with rates changing on wood thickness; assembly per SKU; sanding and finishing per sqft of finished surface for 90% of products; hardware fitting on a fittings × screw-size matrix; packaging on CBM of packed material. Every one of those formulas is a row in a config table - not code.
        </p>
      </section>

      {/* THE MANUFACTURING PROCESS - flow + interactive + structure, all in one */}
      <ManufacturingProcessSection />

      {/* What Was Breaking */}
      <section className="case-section">
        <h2>What was breaking</h2>
        <p><strong>The company was profitable. Nobody knew which products were.</strong> The founder knew the business made money. But could he tell you whether the 6-seater dining table was more profitable than the bookshelf? No.</p>
        <ul className="pain-list">
          <li><strong>Planning was a 20-hour weekly grind.</strong> The planner spent the better part of every week aggregating component-level wood needs across 30–40 active orders in Excel. When the planner was out, planning stopped.</li>
          <li><strong>Material tracking was manual.</strong> Wood arrived at the store. The storekeeper wrote it in a register. How much was issued to which job, in which thickness, for which SKU? Nobody knew in real time.</li>
          <li><strong>Production stages were untracked.</strong> If 600 components entered sanding and 580 came out, nobody caught the 20-component gap until final count. Over 4 years, these gaps added up to nearly $200,000 - about 1.5% wastage compounding silently.</li>
          <li><strong>Contractor costing was reconciled monthly.</strong> Six contractor types, six settlement formulas, multiple jobs and stages each. Settlement required cross-referencing handwritten logs with the planner's memory.</li>
          <li><strong>30+ floor staff could not use any ERP.</strong> The company had tried before. Storekeepers, QC inspectors, supervisors - too many menus, too many dropdowns. Everyone went back to texting.</li>
          <li><strong>The founder had no dashboard.</strong> To answer "where are we on the West Elm order?" required 3 phone calls and 20 minutes.</li>
          <li><strong>Delivery slippage hid in the gaps.</strong> Without stage-level visibility, nobody saw a sanding bottleneck or a finishing delay until the dispatch deadline missed.</li>
        </ul>
      </section>

      {/* What We Built */}
      <section className="case-section">
        <h2>What we built</h2>
        <p>We did multiple calls with the founder over 14 days. Mapped how work actually moves: every order type, every approval rule, every handoff between contractors, every contractor pricing formula, every exception that only the founder knew about.</p>
        <p>After the first call, the founder saw a <strong>working demo within 24 hours</strong>. Not a slideshow. A working system reflecting how his factory actually runs - wood aggregation, two-level tracking, six contractor settlement formulas, four QC gates. 21 days total from first conversation to live system.</p>
        <p style={{fontFamily:'var(--font-heading)',fontSize:18,fontWeight:700,color:'var(--sg-blue)',margin:'24px 0'}}>64 things tracked end-to-end. 72 automatic triggers. 6 contractor settlement formulas. 4 QC gates.</p>
      </section>

      {/* Rules */}
      <section className="case-section">
        <h2>Rules the system enforces</h2>
        <p>These are not suggestions. The system physically rejects the action.</p>
        <ul className="rules-list">
          <li>Can't receive more material than the PO ordered. System rejects: "Maximum you can receive: 500."</li>
          <li>Can't issue unseasoned wood to machining. Routed to seasoning yard automatically.</li>
          <li>Can't dispatch more than planned quantity. Blocked.</li>
          <li>Final QC must approve before dispatch. System-enforced, not process-dependent.</li>
          <li>Contractor locked once assigned. Prevents cost manipulation across stages.</li>
          <li>Can't issue wood to a completed job. Prevents inventory leakage.</li>
          <li>Wood inventory can't go negative.</li>
          <li>Component count must reconcile before assembly. The $200K problem: caught at the source.</li>
          <li>Hardware-fitting settlement blocked until every fitting + screw size is logged.</li>
          <li>Packaging settlement blocked until CBM is captured at pack-out.</li>
        </ul>
        <p style={{marginTop:16}}>Every one of these rules is a configuration, not code. When the business adds a new rule, we add it in minutes.</p>
      </section>

      {/* Floor Staff */}
      <section className="case-section">
        <h2>The floor staff problem, solved</h2>
        <p>Elite's floor supervisors, QC inspectors, and storekeepers had rejected a previous ERP. Too complex. Too far from how they actually work. <strong>30 non-technical staff</strong> who wouldn't touch the old system.</p>
        <p>With SimpleGrid, they talk to <strong>Hank</strong>, the AI assistant. The storekeeper types: "Received 300 mango planks from Shree Timber." Hank identifies the PO, checks the quantity, updates inventory, and confirms. No menus. No dropdowns. No training manual.</p>
        <p>Today all 30 use the system daily. Storekeepers log receipts. QC inspectors record pass/fail per stage. Supervisors close production tickets. The same 30 people who refused the previous ERP.</p>
      </section>

      {/* Before/After */}
      <section className="case-section">
        <h2>What changed</h2>
        <table className="ba-table">
          <thead><tr><th>Before SimpleGrid</th><th>After SimpleGrid</th></tr></thead>
          <tbody>
            <tr><td>No view into which SKUs made money</td><td><strong>SKU-level profitability visible</strong> per product - wood, contractor, and rejection costs attached to every SKU</td></tr>
            <tr><td>SKU production timeline was opaque</td><td><strong>SKU production timeline visible</strong> end-to-end - every stage time-stamped from PO to dispatch</td></tr>
            <tr><td>"Where's the order?" = 3 phone calls + 20 min</td><td>One dashboard. Real-time. Founder sees everything.</td></tr>
            <tr><td>20 hours of planning per week, by one person</td><td>2 hours per week - the system aggregates and proposes</td></tr>
            <tr><td>~1.5% material wastage (~$50K/yr)</td><td>Negligible - component-level reconciliation catches gaps at the source</td></tr>
            <tr><td>Delivery deadlines slipping invisibly</td><td>+15% on-time delivery from full-stage visibility</td></tr>
            <tr><td>Wood inventory reconciled monthly</td><td>Live inventory. Every receipt and issuance tracked, by species + thickness</td></tr>
            <tr><td>6 contractor settlements took days each month</td><td>Auto-calculated on each contractor's own formula</td></tr>
            <tr><td>30 floor staff rejected previous ERP</td><td>Same 30 staff use Hank daily. Zero training overhead.</td></tr>
          </tbody>
        </table>
      </section>

      {/* Testimonial */}
      <div className="testimonial-block">
        <blockquote>"We have our own way of doing things: vendor consolidation by wood species, component-level QC, six different contractor settlement formulas that nobody else understands. We needed an ERP that was made for us, not one we'd have to change our process for. SimpleGrid feels like our system. Our Excel and texting habits didn't go away - the AI chatbot just replaced them. My stores manager was comfortable on day one because it works the way he already works."</blockquote>
        <div className="attr">- Chirag, Founder, Elite Arts &amp; Crafts</div>
      </div>

      {/* Bottom Line */}
      <div className="case-bottom-line">
        <div className="big">64 things tracked. 72 automatic triggers. 21 days to deploy. $0 upfront.</div>
        <p>Before SimpleGrid, the founder knew the company made money. Now he knows which products make money, and which ones do not. Planning dropped from 20 hours to 2. Wastage dropped to negligible. Delivery improved 15%. And 30 floor staff who had rejected every previous ERP now use this one daily.</p>
        <a href="https://cal.com/simplegrid-ai" data-cal-link="simplegrid-ai" data-cal-config='{"theme":"light"}' onMouseEnter={() => { if (typeof loadCal === 'function') loadCal(); }} onClick={(e) => { if (typeof window.Cal === 'function') e.preventDefault(); }} className="btn btn-primary" style={{marginTop:16}}>Book a call - See how we'd model your operations</a>
        <div style={{marginTop:20,fontSize:14}}>
          <a href="case-apex.html" style={{color:'var(--sg-blue)',fontWeight:600,textDecoration:'none'}}>See an apparel manufacturer's deployment - live in 12 days →</a>
        </div>
      </div>
    </div>
    </main>

    <Footer />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<EliteCaseStudy />);
