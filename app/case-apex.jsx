function BarsInfographic() {
  const [animate, setAnimate] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { setAnimate(true); obs.disconnect(); } });
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Volume share: CMT 55k, Brand 25k, Trading is fabric (different unit) -> shown as separate bar in meters or rolls
  const bars = [
    { cls: 'cmt',   label: 'CMT (contract)', value: 55000, max: 60000, display: '55,000', unit: 'shirts/mo' },
    { cls: 'brand', label: 'Own brand',      value: 25000, max: 60000, display: '25,000', unit: 'shirts/mo' },
    { cls: 'trade', label: 'Fabric trading', value: 38000, max: 60000, display: '~40,000', unit: 'meters/mo' },
  ];

  const locs = [
    { cls: 'a', count: '20+', h: 'Job worker units',  s: 'Cut · stitch · finish - across the city' },
    { cls: 'b', count: '10+', h: 'Logistics warehouses', s: 'Partner-operated, fabric & finished goods' },
    { cls: 'c', count: '2',   h: 'In-house operations',  s: 'Ironing & packaging only' },
  ];

  const flow = [
    { n: '01', h: 'Fabric procured',     p: 'PO raised, stock checked across all 30+ locations first' },
    { n: '02', h: 'Issued to job worker', p: 'Fabric + trims sent together, tracked per work order' },
    { n: '03', h: 'Production',           p: '20+ independent job workers, full cut-make-trim' },
    { n: '04', h: 'Returned & QC',        p: 'Reconciled against issued: yield, rejects, settlement' },
    { n: '05', h: 'Iron · pack · dispatch', p: 'In-house finishing, packed to buyer specs' },
  ];

  return (
    <div className="btn-info" ref={ref}>
      <div className="infographic-title">BY THE NUMBERS</div>
      <div className="infographic-h" role="heading" aria-level="3">Three streams. One inventory. Thirty-plus locations.</div>

      <div className="btn-info-grid">
        {/* Volume by stream */}
        <div className="btn-bars">
          <h4>Monthly throughput by stream</h4>
          {bars.map(b => (
            <div key={b.label} className="bar-row">
              <div className="bar-label">{b.label}</div>
              <div className="bar-track">
                <div
                  className={'bar-fill ' + b.cls}
                  style={{ width: animate ? `${(b.value / b.max) * 100}%` : '0%' }}
                />
              </div>
              <div className="bar-value">
                {b.display}<br/>
                <span style={{fontSize:10,fontWeight:500,color:'var(--fg3)',letterSpacing:'0.05em'}}>{b.unit}</span>
              </div>
            </div>
          ))}
          <div style={{marginTop:18,paddingTop:14,borderTop:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',color:'var(--fg3)'}}>TOTAL SHIRTS / MONTH</div>
            <div style={{fontFamily:'var(--font-heading)',fontSize:24,fontWeight:700,color:'var(--sg-blue)',letterSpacing:'-0.02em'}}>80,000 – 100,000</div>
          </div>
        </div>

        {/* Where the inventory lives */}
        <div className="btn-locations">
          <h4 style={{fontFamily:'var(--font-heading)',fontSize:14,fontWeight:700,margin:'0 0 4px'}}>Where the inventory lives</h4>
          <p style={{fontSize:12,color:'var(--fg3)',margin:'0 0 8px',lineHeight:1.5}}>Stock sits with partners and producers - not in a single factory. SimpleGrid tracks every roll, trim, and garment across all 30+ live locations.</p>
          {locs.map(l => (
            <div key={l.h} className="loc-row">
              <div className={'loc-icon ' + l.cls}>{l.count}</div>
              <div className="meta">
                <div className="h">{l.h}</div>
                <div className="s">{l.s}</div>
              </div>
              <div className="ct" style={{
                color: l.cls==='a' ? 'var(--sg-blue)' : l.cls==='b' ? 'var(--sg-gold)' : 'var(--sg-purple)'
              }}>●</div>
            </div>
          ))}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginTop:6,paddingTop:14,borderTop:'1px solid var(--border)'}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',color:'var(--fg3)'}}>LIVE INVENTORY POINTS</div>
            <div style={{fontFamily:'var(--font-heading)',fontSize:24,fontWeight:700,color:'var(--sg-blue)',letterSpacing:'-0.02em'}}>30+</div>
          </div>
        </div>
      </div>

      {/* Production flow */}
      <div className="btn-flow">
        {flow.map(f => (
          <div key={f.n} className="flow-cell">
            <div className="step-n">{f.n}</div>
            <div className="step-h">{f.h}</div>
            <div className="step-p">{f.p}</div>
          </div>
        ))}
      </div>

      {/* Outcome strip */}
      <div style={{marginTop:28,display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0,border:'1px solid var(--sg-blue)',borderRadius:12,overflow:'hidden',background:'linear-gradient(135deg, rgba(74,123,247,0.04), rgba(74,123,247,0.08))'}}>
        {[
          { n: '24', u: 'hours', l: 'Working demo delivered' },
          { n: '12', u: 'days',  l: 'From kickoff to live' },
          { n: '34', u: '',      l: 'Domain entities tracked' },
          { n: '44', u: '',      l: 'Automatic triggers wired' },
        ].map((s,i) => (
          <div key={i} style={{padding:'22px 20px',borderRight:i<3?'1px solid rgba(74,123,247,0.25)':'none',textAlign:'center'}}>
            <div style={{fontFamily:'var(--font-heading)',fontSize:38,fontWeight:700,color:'var(--sg-blue)',letterSpacing:'-0.02em',lineHeight:1}}>
              {s.n}{s.u && <span style={{fontSize:14,color:'var(--fg3)',fontWeight:500,marginLeft:4}}>{s.u}</span>}
            </div>
            <div style={{fontSize:11,color:'var(--fg2)',marginTop:8,letterSpacing:'0.04em'}}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NetworkInfographic() {
  // Hub-and-spoke: central warehouse → 30 dots around (job workers + logistics warehouses)
  const cx = 400, cy = 240, r = 180;
  const nodes = Array.from({ length: 30 }, (_, i) => {
    const angle = (i / 30) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, i };
  });
  const colorOf = (i) => {
    if (i % 5 === 0) return 'var(--sg-purple)';
    if (i % 3 === 0) return 'var(--sg-gold)';
    return 'var(--sg-blue)';
  };
  return (
    <svg viewBox="0 0 800 480" className="network-svg">
      <defs>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(74,123,247,0.25)" />
          <stop offset="100%" stopColor="rgba(74,123,247,0)" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r="120" fill="url(#hubGlow)" />
      {nodes.map((n, i) => (
        <line key={`l-${i}`} x1={cx} y1={cy} x2={n.x} y2={n.y} stroke={colorOf(i)} strokeWidth="1" opacity="0.35" className="spoke-line" style={{ animationDelay: `${i * 0.1}s` }} />
      ))}
      {nodes.map((n, i) => (
        <circle key={`d-${i}`} cx={n.x} cy={n.y} r="7" fill={colorOf(i)} className="spoke-dot" style={{ animationDelay: `${i * 0.08}s` }} />
      ))}
      {/* Hub */}
      <circle cx={cx} cy={cy} r="48" fill="#fff" stroke="var(--sg-blue)" strokeWidth="2.5" />
      <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="var(--font-heading)" fontSize="11" fontWeight="700" fill="var(--fg1)" letterSpacing="0.04em">CENTRAL</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontFamily="var(--font-heading)" fontSize="11" fontWeight="700" fill="var(--fg1)" letterSpacing="0.04em">WAREHOUSE</text>
      {/* Legend */}
      <g transform="translate(40, 430)">
        <circle cx="6" cy="6" r="5" fill="var(--sg-blue)" />
        <text x="18" y="10" fontSize="11" fill="var(--fg2)">Job worker units (cut · stitch · finish)</text>
        <circle cx="280" cy="6" r="5" fill="var(--sg-gold)" />
        <text x="292" y="10" fontSize="11" fill="var(--fg2)">Logistics partner warehouses</text>
        <circle cx="540" cy="6" r="5" fill="var(--sg-purple)" />
        <text x="552" y="10" fontSize="11" fill="var(--fg2)">In-transit hubs</text>
      </g>
      <text x={cx} y="40" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="0.14em" fill="var(--fg3)">30+ INVENTORY LOCATIONS · ALL VISIBLE IN ONE LEDGER</text>
    </svg>
  );
}

function ApexCaseStudy() {
  const [showLogin, setShowLogin] = React.useState(false);
  return (<>
    <Nav page="cases" onLoginClick={() => setShowLogin(true)} />
    <main>

    <section className="case-hero">
      <div className="container">
        <div className="tag">CASE STUDY · APPAREL MANUFACTURING</div>
        <h1>An apparel manufacturer running 80,000–100,000 shirts a month - without a factory of his own.</h1>
        <p className="case-hook">Two years. Two failed ERPs. Over $100,000 spent with nothing to show for it. The company runs three interconnected businesses through 20+ job workers and stores inventory at its logistics partners' warehouses - 30+ locations in total. Every generic ERP assumed a factory model. This operation does not have a factory.</p>
        <div className="confidential-banner">
          🔒 Client name withheld for confidentiality. We refer to them as "Apex Apparel" throughout this case study.
        </div>
        <div className="case-strip">
          <div className="case-strip-item"><div className="label">Monthly volume</div><div className="value">80k–100k shirts</div></div>
          <div className="case-strip-item"><div className="label">Operating model</div><div className="value">100% job work</div></div>
          <div className="case-strip-item"><div className="label">Inventory locations</div><div className="value">30+ tracked live</div></div>
          <div className="case-strip-item"><div className="label">Deployed in</div><div className="value">12 days</div></div>
        </div>
      </div>
    </section>

    <div className="container">

      {/* INFOGRAPHIC 1 - operation at a glance */}
      <div className="infographic">
        <div className="infographic-title">THE OPERATION AT A GLANCE</div>
        <div className="infographic-h" role="heading" aria-level="3">A factoryless apparel business, by the numbers.</div>

        <div className="stat-row">
          <div className="stat-cell">
            <div className="stat-num">80–100<span className="unit">k</span></div>
            <div className="stat-label">Shirts manufactured per month, across all three streams</div>
          </div>
          <div className="stat-cell">
            <div className="stat-num">3</div>
            <div className="stat-label">Business streams: CMT, own brand, fabric trading</div>
          </div>
          <div className="stat-cell">
            <div className="stat-num">20<span className="unit">+</span></div>
            <div className="stat-label">Independent job workers across the city</div>
          </div>
          <div className="stat-cell">
            <div className="stat-num">30<span className="unit">+</span></div>
            <div className="stat-label">Inventory locations including logistics partner warehouses</div>
          </div>
        </div>

        <NetworkInfographic />

        <div className="split-row">
          <div className="split-card">
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',color:'var(--sg-blue)'}}>STREAM 01 · CMT</div>
            <div className="vol">~55,000 / mo</div>
            <h4>Contract manufacturing</h4>
            <p>Cut-make-trim for external brand principals. Brand owns the IP, Apex owns the supply chain.</p>
          </div>
          <div className="split-card alt">
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',color:'var(--sg-purple)'}}>STREAM 02 · OWN BRAND</div>
            <div className="vol">~25,000 / mo</div>
            <h4>Own-label retail</h4>
            <p>Their own designs, manufactured through the same job worker network, sold to retail buyers.</p>
          </div>
          <div className="split-card alt2">
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',color:'var(--sg-gold)'}}>STREAM 03 · TRADING</div>
            <div className="vol">High-volume fabric</div>
            <h4>Fabric wholesale</h4>
            <p>Buying fabric in bulk and reselling to other manufacturers - a separate P&L on the same inventory ledger.</p>
          </div>
        </div>
      </div>

      {/* INFOGRAPHIC 2 - by the numbers */}
      <BarsInfographic />

      <section className="case-section">
        <h2>The operation</h2>
        <p>Apex runs three interconnected businesses under one roof. Contract manufacturing for external brand principals. Their own brand: taking orders and manufacturing for retail. And fabric trading: buying fabric in volume and reselling to other manufacturers.</p>
        <p>The production model is <strong>job work</strong>. They do not cut. They do not sew. Every piece of production happens at one of 20+ job worker facilities across the city. Each job worker is a complete production unit. Only two things happen in-house: ironing and packaging.</p>
        <p>And the inventory is not even theirs to hold. Fabric, trims, finished goods all sit at their <strong>logistics partner's warehouses</strong> - multiple locations, depending on which buyer or job worker is closest. Add the 20+ job worker facilities, and at any given moment Apex has stock across <strong>30+ live inventory locations</strong>.</p>
      </section>

      <section className="case-section">
        <h2>What was breaking</h2>
        <ul className="pain-list">
          <li><strong>Generic ERPs could not model the operation.</strong> Two attempts over two years. Both failed. Every off-the-shelf ERP is built for manufacturers who make things in-house. Apex doesn't.</li>
          <li><strong>Inventory visibility collapsed across 30+ locations.</strong> Fabric, trims, and finished goods were spread across 20+ job worker units and 10+ logistics partner warehouses. When a brand asked "where is our order?" answering meant phone calls to three to five places.</li>
          <li><strong>Secondary material tracking was unmanageable.</strong> Every work order required its own bill of materials: specific buttons, hang tags, wash care labels, thread color. All purchased per work order, issued to job workers, reconciled at the end.</li>
          <li><strong>Three businesses collided in one spreadsheet.</strong> CMT, own brand, fabric trading: all tracked in overlapping Excel files. A fabric roll might belong to Brand A's order, their own stock, or a trading customer.</li>
          <li><strong>Job worker reconciliation was chaos.</strong> Each of 20+ workers received fabric AND trims for each work order, returned finished garments. Reconciling consumed hours every day.</li>
          <li><strong>Profitability by stream was a mystery.</strong> Was CMT making money or being subsidized by fabric trading? Impossible to tell.</li>
        </ul>
      </section>

      <section className="case-section">
        <h2>What we built</h2>
        <p>We offered to build it free. The founder's first reaction was that we must be overconfident. Then we sent him a <strong>working demo in 24 hours</strong>: 60–70% accurate to how his operation actually runs, including the distributed job worker network, secondary material procurement, and three separate business streams.</p>
        <p>Over the next 11 days we did 4 working sessions with the founder and his operations head. Walked through every edge case.</p>
        <p style={{fontFamily:'var(--font-heading)',fontSize:18,fontWeight:700,color:'var(--sg-blue)',margin:'24px 0'}}>Day 12: live. 34 things tracked end-to-end. 44 automatic triggers. Inventory visible across 30+ locations in real time.</p>
      </section>

      <section className="case-section">
        <h2>The full CMT flow</h2>
        <div className="flow-steps">
          {[
            {s:'Brand sends a work order.',b:'Style, sizes, quantities, fabric specs, trim requirements, production specs, dispatch deadline. System auto-generates SKUs.'},
            {s:'Bill of materials built.',b:'Main fabric, secondary fabrics, buttons, hang tags, wash care labels, thread colors, packaging specs. Every item tracked.'},
            {s:'Specifications attached.',b:'Cutting pattern reference, stitch types per seam, wash instructions - digitized and linked to the work order.'},
            {s:'Fabric and trims procured.',b:'Auto-generated POs to fabric vendors and trim suppliers. Stock checked first across all 30+ locations, only shortfall procured.'},
            {s:'Materials received at logistics warehouse.',b:'Fabric inspected for defects. System tracks by roll, not just total meters. Trims received against their POs.'},
            {s:'Issued to job worker.',b:'Fabric + all secondary materials issued together. Every item tracked per work order, per job worker.'},
            {s:'Job worker produces.',b:'Cutting, stitching, finishing. Job worker is hands. Specifications are Apex\u2019s.'},
            {s:'Finished goods returned.',b:'Received at warehouse. System reconciles: fabric sent vs garments returned vs expected yield.'},
            {s:'Iron and packaging.',b:'In-house. Each garment ironed, tagged, packed to buyer specs.'},
            {s:'QC at multiple gates.',b:'Pre-dispatch quality check against buyer standards. Rejects sent back to job worker.'},
            {s:'Dispatch to brand.',b:'Packed per buyer specs. System generates packing list, invoice, tracks partial shipments.'},
            {s:'Job worker settlement.',b:'Auto-calculated: garments received minus rejects times piece rate. Per job worker, per work order.'},
          ].map((step,i) => (
            <div key={i} className="flow-step">
              <p><strong>{step.s}</strong> {step.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="case-section">
        <h2>Rules the system enforces</h2>
        <ul className="rules-list">
          <li>Can't issue fabric to a job worker without an active work order.</li>
          <li>Can't receive finished goods exceeding the work order quantity.</li>
          <li>Secondary materials must be fully issued before production starts.</li>
          <li>Job worker settlement blocked until all returns are reconciled.</li>
          <li>Fabric roll tracking: defective rolls quarantined, can't enter production.</li>
          <li>Brand-specific packaging specs enforced at dispatch - wrong label format blocks shipment.</li>
        </ul>
      </section>

      <div className="testimonial-block">
        <blockquote>"When they said they'd deploy for free, I honestly thought it was overconfidence. Then I got a working demo in 24 hours - and it was 60–70% accurate to how we actually operate. That's when I knew these guys understood manufacturing. No other vendor we've worked with has shown me a working system before asking me to sign a check."</blockquote>
        <div className="attr">- Founder, Apex Apparel <span style={{color:'var(--fg3)',fontWeight:400}}>(name withheld for confidentiality)</span></div>
      </div>

      <div className="case-bottom-line">
        <div className="big">34 things tracked. 44 automatic triggers. 30+ inventory locations. 12 days to deploy.</div>
        <p>Two years and two failed ERPs. Then 12 days with SimpleGrid. Inventory visible across 20+ job worker facilities and 10+ logistics partner warehouses, all in one live ledger.</p>
        <a href="https://cal.com/simplegrid-ai" data-cal-link="simplegrid-ai" data-cal-config='{"theme":"light"}' onMouseEnter={() => { if (typeof loadCal === 'function') loadCal(); }} onClick={(e) => { if (typeof window.Cal === 'function') e.preventDefault(); }} className="btn btn-primary" style={{marginTop:16}}>Book a call - See how we'd model your operations</a>
        <div style={{marginTop:20,fontSize:14}}>
          <a href="case-elite.html" style={{color:'var(--sg-blue)',fontWeight:600,textDecoration:'none'}}>See a furniture manufacturer's deployment - live in 21 days →</a>
        </div>
      </div>
    </div>
    </main>

    <Footer />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<ApexCaseStudy />);
