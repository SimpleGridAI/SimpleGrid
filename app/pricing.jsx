const TIERS = [
  {
    name: 'Build + 30-day trial',
    sub: 'You carry no cost until you see it run',
    price: '$0',
    priceUnit: 'For the build. For the migration. For the 30 days on your real floor.',
    accent: 'var(--sg-blue)',
    features: [
      'We build a custom ERP modelled on your factory',
      'Live in 7–21 days, at our cost and our risk',
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
    priceUnit: 'We are not free and we are not cheap. We are priced like an operator who has carried the build for you.',
    accent: 'var(--sg-purple)',
    features: [
      'One monthly subscription. That is the entire bill.',
      'All features included. No tiers. No add-ons. No per-seat fees.',
      'Every change to your ERP, now and forever, included.',
      'New features ship regularly - yours automatically.',
      'Direct line to the founding team. No account-manager middle layer.',
    ],
    cta: 'Talk to the founder',
    ctaHref: 'https://cal.com/simplegrid-ai',
    highlight: false,
  },
];

const COMPARE = [
  { metric: 'What they\'re built for',     us: 'Mid-market manufacturers who don\'t want to be a software project', sap: 'F500 finance, multi-country tax, public-co close', netsuite: 'Mid-to-large multi-entity ops', qbe: 'Bookkeeping for small businesses' },
  { metric: 'Time to value',               us: 'Live in 7–21 days',     sap: '12–18 months',  netsuite: '6–12 months',                qbe: 'Same day for books - breaks as ops scale' },
  { metric: 'Up-front cost',               us: '$0',                    sap: '$150K–$500K+',  netsuite: '$25K–$100K implementation',  qbe: '$1.7K/yr/user + add-ons' },
  { metric: 'Change-order fees',           us: 'None. Ever.',           sap: '$8K–$20K each', netsuite: '$200+/hr consultant',        qbe: 'Per add-on / SuiteApp' },
  { metric: 'Built for the factory floor', us: 'Yes - same habit as texting', sap: 'Built for accountants',    netsuite: 'Built for analysts',          qbe: 'Built for bookkeepers' },
  { metric: 'Try-before-you-buy',          us: '30 days on your real floor, real orders',  sap: 'Sandbox demos',  netsuite: 'Sandbox demos', qbe: 'Free tier' },
];

const INCLUDED = [
  { h: 'Modeling sessions',   p: 'Two to three calls with our team to map every entity, state, rule, and exception that runs your factory.' },
  { h: 'Working demo in 24 hours', p: 'Not a slideshow. A live system reflecting how your operation actually runs.' },
  { h: 'Data migration',      p: 'Your spreadsheets, your existing ERP exports, your group chats - we move what we can use.' },
  { h: 'Floor-staff training', p: 'Your team types what happened the way they would on WhatsApp. The training is the conversation.' },
  { h: 'Senior-led onboarding', p: 'Every deployment is led by senior engineers and founders - not by a sales engineer or an account manager.' },
  { h: 'All future rule changes', p: 'New approval rule. New production stage. New QC gate. All configuration, not code. No change orders.' },
];

function PricingPage() {
  const [showLogin, setShowLogin] = React.useState(false);
  const [showInvite, setShowInvite] = React.useState(false);

  return (<>
    <Nav page="pricing" onLoginClick={() => setShowLogin(true)} />
    <main id="main">

    {/* HERO */}
    <section className="section" style={{paddingBottom:32}}>
      <div className="container">
        <div className="tag">PRICING</div>
        <h1 className="h2" style={{maxWidth:1200}}>You carry nothing until you see it run.</h1>
        <p className="lead" style={{maxWidth:'100%'}}>
          Every other ERP vendor charges you to find out if it works. We don't. SimpleGrid builds a custom ERP around your factory at our cost. You run it on your real floor for 30 days. If it doesn't move the business, you walk. We earn nothing.
        </p>
        <p className="lead" style={{maxWidth:'100%', marginTop:12, fontWeight:600, color:'var(--fg1)'}}>
          We are not free. We are not cheap. We're priced like an operator who has carried the build for you - and earned the right to charge for what it does.
        </p>
      </div>
    </section>

    {/* TIERS */}
    <section className="section section-alt" style={{paddingTop:48}}>
      <div className="container">
        <div className="tag">HOW IT'S PRICED</div>
        <h2 className="h2" style={{marginBottom:8}}>Try it on. Then pay.</h2>
        <p className="lead" style={{maxWidth:960, marginBottom:36}}>
          Two stages. The build and the 30-day trial are on us. After that, one monthly subscription covers everything - no tiers, no change fees, no per-seat math. Every new feature we ship is included.
        </p>
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
                <div style={{fontSize:13,color:'var(--fg3)'}}>{t.sub}</div>
              </div>
              <div>
                <div style={{fontFamily:'var(--font-heading)', fontSize:38, fontWeight:700, color:'var(--fg1)', letterSpacing:'-0.025em', lineHeight:1}}>{t.price}</div>
                {t.priceUnit && <div style={{fontSize:12, color:'var(--fg3)', marginTop:6}}>{t.priceUnit}</div>}
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
        <div className="tag">5-YEAR TOTAL COST</div>
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
        <p style={{fontSize:12, color:'var(--fg3)', marginTop:14, fontStyle:'italic'}}>
          Competitor figures are ranges based on publicly available implementation data for mid-market manufacturers (200–1,500 employees). Your quote may differ.
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
            { q: 'How much does SimpleGrid cost after the 30 days?', a: 'We agree on a number together that fits the operation. After that, you pay one monthly subscription. That is the entire bill - no setup, no add-ons, no surprise line items, no per-seat fees.' },
            { q: 'Is there a setup or build fee?', a: 'No. The build, the modeling sessions, the data migration, the senior-led onboarding and the 30 days running on your real floor are all on us. You owe nothing until you decide it works.' },
            { q: 'Why aren\'t you cheap?', a: 'Because we carry the build, the deployment risk, and the 30-day trial - and senior engineers, deployment experts, and founder engagement on every project. Cheap ERP exists. It will not show up on day one with a working version of your factory. We will. We price for what that takes.' },
            { q: 'What does "you walk if it doesn\'t work" actually mean?', a: 'At the end of 30 days you decide. If the system is being used daily by your floor staff and your dashboards match the floor, it works. If not, you walk. No invoice. No clawback. No data ransom - you get a clean export.' },
            { q: 'Do you charge for changes to the ERP - today or tomorrow?', a: 'No. New approval rule, new production stage, new QC gate, new report, new integration - every change is included, at go-live and forever. Most ERPs charge $8K–$20K per change order. We never do.' },
            { q: 'Are there feature tiers or add-on fees?', a: 'No. Every customer gets every feature. No Pro plan, no Enterprise tier, no per-feature licensing. When we ship something new, it is automatically yours.' },
            { q: 'Why are you so selective about who you onboard?', a: 'Senior engineers, deployment experts, and founder engagement on every deployment. We have limited capacity each quarter. We only take on customers we know we can win for - because we only get paid when you succeed, and we don\'t want to set anyone up to lose.' },
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

    {/* FINAL CTA */}
    <section className="section section-dark final-cta">
      <div className="container">
        <h2 className="h2">You carry nothing until you see it run.</h2>
        <p className="sub">Custom ERP, built at our risk. Paid for after it works. Founder-led onboarding, limited capacity each quarter.</p>
        <a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-primary">Book a demo</a>
      </div>
    </section>
    </main>

    <Footer />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    <div className="mobile-cta">
      <button type="button" onClick={() => setShowInvite(true)} className="btn btn-invite">Request an invite</button>
    </div>

    <style>{`
      @media (max-width: 900px) {
        .tier-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
        .incl-grid { grid-template-columns: 1fr 1fr !important; }
        .pricing-faq-grid { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 560px) {
        .incl-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<PricingPage />);
