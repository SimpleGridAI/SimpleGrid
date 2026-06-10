const TIERS = [
  {
    name: 'Build + 30-day trial',
    sub: 'You carry no cost until you see it run',
    price: '$0',
    priceUnit: 'For the build. For the migration. For the 30 days on your real floor.',
    accent: 'var(--sg-blue)',
    features: [
      'We configure the operations layer to your factory floor',
      'Live in 7-21 days, at our cost and our risk',
      'You run it on your real floor for 30 days',
      'All your data migrated for you',
      'If it doesn\'t move the business, you walk. No invoice.',
    ],
    cta: 'Book a demo',
    ctaHref: 'https://cal.com/simplegrid-ai',
    highlight: true,
  },
  {
    name: 'After it works',
    sub: 'Monthly subscription · one number, all in',
    price: 'Custom-quoted',
    priceUnit: 'This isn\'t a discount play. We carried the build, so the price reflects the result, not the risk.',
    accent: 'var(--sg-purple)',
    features: [
      'One monthly subscription. That is the entire bill.',
      'All features included. No tiers. No add-ons. No per-seat fees.',
      'New features ship regularly - yours automatically.',
      'Direct line to the team that builds it. No account-manager middle layer.',
    ],
    cta: 'Book a demo',
    ctaHref: 'https://cal.com/simplegrid-ai',
    highlight: false,
  },
];

const COMPARE = [
  { metric: 'What they\'re built for',     us: 'Mid-market manufacturers who don\'t want to be a software project', sap: 'F500 finance, multi-country tax, public-co close', netsuite: 'Mid-to-large multi-entity ops', qbe: 'Bookkeeping for small businesses' },
  { metric: 'Time to value',               us: 'Live in 7-21 days',     sap: '12-18 months',  netsuite: '6-12 months',                qbe: 'Same day for books - breaks as ops scale' },
  { metric: 'Up-front cost',               us: '$0',                    sap: '$150K-$500K+',  netsuite: '$25K-$100K implementation',  qbe: '$1.7K/yr/user + add-ons' },
  { metric: 'Change-order fees',           us: 'None. Ever.',           sap: '$8K-$20K each', netsuite: '$200+/hr consultant',        qbe: 'Per add-on / SuiteApp' },
  { metric: 'Try-before-you-buy',          us: '30 days on your real floor, real orders',  sap: 'Sandbox demos',  netsuite: 'Sandbox demos', qbe: 'Free tier' },
];

const INCLUDED = [
  { h: 'Modeling sessions',   p: 'Two to three calls with our team to map every entity, state, rule, and exception that runs your factory.' },
  { h: 'Working demo in 24 hours', p: 'Not a slideshow. A live system reflecting how your operation actually runs.' },
  { h: 'Data migration',      p: 'Your spreadsheets, your existing ERP exports, your group chats - we move what we can use.' },
  { h: 'Floor-staff training', p: 'Your team types what happened the way they would on WhatsApp. The training is the conversation.' },
  { h: 'Senior-led onboarding', p: 'Every deployment is led personally by senior engineers - not by a sales engineer or an account manager.' },
  { h: 'All future rule changes', p: 'New approval rule. New production stage. New QC gate. All configuration, not code. No change orders.' },
];

function PricingPage() {
  const [showLogin, setShowLogin] = React.useState(false);
  const [showInvite, setShowInvite] = React.useState(false);

  return (<>
    <main id="main">

    {/* HERO - big black, full-height (matches product page) */}
    <section className="section section-dark" style={{paddingTop:88, paddingBottom:64, position:'relative', overflow:'hidden', background:'rgba(26,26,26,0.90)', minHeight:'calc(100vh - 64px)', display:'flex', flexDirection:'column', justifyContent:'center'}}>
      <ParticleCloud showArcs={false} />
      <div className="container" style={{position:'relative', zIndex:2}}>
        <div className="tag">PRICING</div>
        <h1 className="h1" style={{color:'#fff', maxWidth:980, fontFamily:'var(--font-heading)', fontSize:48, fontWeight:700, lineHeight:1.1, letterSpacing:'-0.03em', margin:'0 0 18px'}}>
          You carry nothing until you see it run.
        </h1>
        <p className="lead" style={{color:'rgba(255,255,255,0.78)', maxWidth:820, margin:'0 0 14px'}}>
          The build is on us - we configure the operations layer to your floor, and your books stay in QuickBooks or Tally. The price is for what it does once it's working.
        </p>
        <p className="lead" style={{color:'rgba(255,255,255,0.78)', maxWidth:820, margin:0}}>
          Most ERPs charge you to find out if they work. We charge you after you already know.
        </p>
        <div style={{marginTop:28, display:'flex', gap:12, flexWrap:'wrap'}}>
          <button type="button" onClick={() => setShowInvite(true)} className="btn btn-lg btn-invite" style={{animation:'sgBuildPulse 1.8s ease-in-out infinite'}}>Book a demo →</button>
        </div>
        <div style={{marginTop:36, display:'flex', gap:32, flexWrap:'wrap', fontSize:'var(--fs-caption)', color:'rgba(255,255,255,0.5)'}}>
          <span>● Built at our risk</span>
          <span>● Live in 7-21 days</span>
          <span>● You pay only after it works</span>
        </div>
      </div>
    </section>

    {/* TIERS */}
    <section className="section section-alt">
      <div className="container">
        <div className="tag">HOW IT'S PRICED</div>
        <h2 className="h2" style={{marginBottom:8}}>Try it on. Then pay.</h2>
        <p className="lead" style={{maxWidth:860, marginBottom:36}}>
          Every ERP vendor makes you pay first and hope it works. We flipped it - the build and the 30-day trial are on us - you run it on your real floor, with your real team and real orders.
        </p>

        {/* PROCESS - quote after the intro call, demo not deck */}
        <div className="proc-grid" style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:18, marginBottom:44}}>
          {[
            { n:'01', h:'One intro call, then a quote', p:'We start with a single introductory call. We learn enough to give you a real number - no drawn-out discovery before you know the price.' },
            { n:'02', h:'Then the detailed conversation', p:'Only once the number makes sense do we go deep on how your floor actually runs - your stages, contractors, approvals, costing.' },
            { n:'03', h:'A working demo, not a deck', p:'No scope-of-work document. No slide deck. We build a working demo of your operation and start the build on that.' },
          ].map((s, i) => (
            <div key={i} style={{background:'#fff', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:'22px 22px'}}>
              <div style={{fontFamily:'var(--font-heading)', fontSize:13, fontWeight:700, color:'var(--sg-blue)', letterSpacing:'0.08em', marginBottom:10}}>{s.n}</div>
              <div style={{fontFamily:'var(--font-heading)', fontSize:16, fontWeight:700, color:'var(--fg1)', marginBottom:6, letterSpacing:'-0.005em'}}>{s.h}</div>
              <div style={{fontSize:13.5, color:'var(--fg2)', lineHeight:1.55}}>{s.p}</div>
            </div>
          ))}
        </div>

        <div className="tier-grid" style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:20, maxWidth:880, margin:'0 auto'}}>
          {TIERS.map((t,i) => (
            <div key={i} style={{
              background:'#fff', border:'1px solid var(--border)',
              borderTop:`4px solid ${t.accent}`,
              borderRadius:'var(--radius-lg)', padding:'28px 24px',
              display:'flex', flexDirection:'column', gap:14,
              boxShadow: t.highlight ? '0 12px 32px rgba(74,123,247,0.12)' : 'none',
            }}>
              <div>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:t.accent,marginBottom:4}}>{t.name}</div>
                <div style={{fontSize:'var(--fs-caption)',color:'var(--fg3)'}}>{t.sub}</div>
              </div>
              <div>
                <div style={{fontFamily:'var(--font-heading)', fontSize:38, fontWeight:700, color:'var(--fg1)', letterSpacing:'-0.025em', lineHeight:1}}>{t.price}</div>
                {t.priceUnit && <div style={{fontSize:'var(--fs-tag)', color:'var(--fg3)', marginTop:6}}>{t.priceUnit}</div>}
              </div>
              <ul style={{listStyle:'none', padding:0, margin:'4px 0 12px', display:'flex', flexDirection:'column', gap:8, flex:1}}>
                {t.features.map((f, j) => (
                  <li key={j} style={{display:'flex', gap:10, fontSize:13.5, color:'var(--fg2)', lineHeight:1.5}}>
                    <span style={{color:t.accent, fontWeight:700, flexShrink:0}}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href={t.ctaHref}
                 target="_blank"
                 rel="noopener noreferrer"
                 className={'btn btn-sm ' + (t.highlight ? 'btn-primary' : 'btn-secondary')} style={{justifyContent:'center', marginTop:'auto'}}>{t.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* WHAT'S INCLUDED */}
    <section className="section">
      <div className="container">
        <div className="tag">WHAT THE BUILD COVERS</div>
        <h2 className="h2" style={{maxWidth:760}}>What we build for you before you owe us anything.</h2>
        <p className="lead" style={{maxWidth:960}}>
          Everything below is part of the build and the 30-day trial. No add-ons. No professional-services line item. No "implementation partner" you also have to pay.
        </p>
        <div className="incl-grid" style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:18, marginTop:32}}>
          {INCLUDED.map((it, i) => (
            <div key={i} style={{background:'#fff', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:'22px 22px'}}>
              <div style={{fontFamily:'var(--font-heading)', fontSize:16, fontWeight:700, color:'var(--fg1)', marginBottom:6, letterSpacing:'-0.005em'}}>{it.h}</div>
              <div style={{fontSize:13.5, color:'var(--fg2)', lineHeight:1.55}}>{it.p}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* COMPARISON TABLE */}
    <section className="section">
      <div className="container">
        <div className="tag">COMPARE - HONESTLY</div>
        <h2 className="h2" style={{maxWidth:760}}>How we compare on the line items that actually move money.</h2>
        <p className="lead" style={{maxWidth:960}}>
          Sticker pricing rarely tells the truth. The line items below are where ERP budgets quietly inflate.
        </p>
        <div style={{overflowX:'auto', marginTop:28}}>
          <table className="ba-table" style={{minWidth:760}}>
            <thead>
              <tr>
                <th style={{background:'rgba(74,123,247,0.05)', color:'var(--sg-blue)'}}>Line item</th>
                <th style={{background:'rgba(74,123,247,0.05)', color:'var(--sg-blue)'}}>SimpleGrid</th>
                <th>SAP Business One</th>
                <th>NetSuite</th>
                <th>QuickBooks Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((r,i) => (
                <tr key={i}>
                  <td style={{fontWeight:600, color:'var(--fg1)'}}>{r.metric}</td>
                  <td style={{background:'rgba(74,123,247,0.04)', color:'var(--sg-blue)', fontWeight:600}}>{r.us}</td>
                  <td>{r.sap}</td>
                  <td>{r.netsuite}</td>
                  <td>{r.qbe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{fontSize:'var(--fs-tag)', color:'var(--fg3)', marginTop:14, fontStyle:'italic'}}>
          Competitor figures are ranges based on publicly available implementation data for mid-market manufacturers (200-1,500 employees). Your quote may differ.
        </p>
      </div>
    </section>

    {/* FAQ */}
    <section className="section section-alt">
      <div className="container">
        <div className="tag">FAQ</div>
        <h2 className="h2">Frequently asked questions about pricing.</h2>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, marginTop:28}} className="pricing-faq-grid">
          {[
            { q: 'How much does SimpleGrid cost after the 30 days?', a: 'You get a quote after the first introductory call, before the deep-dive - so you know the number early. It is one monthly subscription, and that is the entire bill - no setup, no add-ons, no surprise line items, no per-seat fees.' },
            { q: 'Is there a setup or build fee?', a: 'No. The build, the modeling sessions, the data migration, the senior-led onboarding and the 30 days running on your real floor are all on us. You owe nothing until you decide it works.' },
            { q: 'Why isn\'t this the cheapest option on the table?', a: 'This isn\'t a discount play. We carry the build, the deployment risk, and the 30-day trial - with senior engineers and deployment experts on every project - so the price reflects the result, not the risk. Cheap ERP exists. It will not show up with a working version of your factory before you pay. We will.' },
            { q: 'What does "you walk if it doesn\'t work" actually mean?', a: 'At the end of 30 days you decide. If the system is being used daily by your floor staff and your dashboards match the floor, it works. If not, you walk. No invoice. No clawback. No data ransom - you get a clean export.' },
            { q: 'Do you charge for changes to my SimpleGrid setup - today or tomorrow?', a: 'No. New approval rule, new production stage, new QC gate, new report, new integration - every change is included, at go-live and forever. Most ERPs charge $8K-$20K per change order. We never do.' },
            { q: 'Are there feature tiers or add-on fees?', a: 'No. Every customer gets every feature. No Pro plan, no Enterprise tier, no per-feature licensing. When we ship something new, it is automatically yours.' },
            { q: 'Why are you so selective about who you onboard?', a: 'Senior engineers and deployment experts work on every deployment, so we have limited capacity each quarter. We only take on customers we know we can win for - because we only get paid when you succeed, and we don\'t want to set anyone up to lose. We\'re built for mid-market manufacturers, roughly $5M-$250M in revenue - below that, spreadsheets or QuickBooks still win; above that, SAP or Oracle make more sense.' },
            { q: 'Do I get new features as you ship them?', a: 'Yes. We ship new products and features regularly, and they roll out to every customer at no extra cost. Your subscription includes everything we have built and everything we are about to build.' },
          ].map((f, i) => (
            <div key={i} style={{background:'#fff', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:'22px 24px'}}>
              <div style={{fontFamily:'var(--font-heading)', fontSize:15, fontWeight:700, color:'var(--fg1)', marginBottom:8, letterSpacing:'-0.005em'}}>{f.q}</div>
              <div style={{fontSize:13.5, color:'var(--fg2)', lineHeight:1.6}}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    </main>

    <FinalCTA title="The price is simple: nothing until it works." body="We carry the build cost and the risk. You run it for 30 days on your real floor, with your real team and real orders. You pay only once it's already running your business - not a cent before." note="Limited slots each quarter. We onboard selectively." />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    <div className="mobile-cta">
      <button type="button" onClick={() => setShowInvite(true)} className="btn btn-invite">Book a demo</button>
    </div>

    <style>{`
      @media (max-width: 900px) {
        .tier-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
        .incl-grid { grid-template-columns: 1fr 1fr !important; }
        .proc-grid { grid-template-columns: 1fr !important; }
        .pricing-faq-grid { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 560px) {
        .incl-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<PricingPage />);
