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
        window.scrollTo({ top, behavior: 'smooth' });
      } else if (tries++ < 20) {
        setTimeout(tryScroll, 100);
      }
    };
    setTimeout(tryScroll, 150);
  }, []);
  return (<>
    <Nav page="about" onLoginClick={() => setShowLogin(true)} />
    <main id="main">

    {/* (a) Operator hook - $30M / two ERP failures / Google Sheets - said once */}
    <section className="section" style={{paddingBottom:24}}>
      <div className="container" style={{maxWidth:'none'}}>
        <div className="tag">ABOUT US</div>
        <h1 className="h2 ink">Built by an operator who's been on your floor.</h1>
        <p className="lead" style={{maxWidth:'none'}}>
          SimpleGrid was not designed in a boardroom. It was designed on a shop floor that was already running on Excel and group chats - and not working. Our founder built a $30M manufacturing business with multiple factories and a 400-person workforce, survived two ERP failures, and ended up on Google Sheets. SimpleGrid is the system he wished he had. We were the customer first - we know exactly what breaks when the system can't keep up with the floor.
        </p>
      </div>
    </section>

    {/* (b) + (c) Pain + failure stat + pay-only-if-kept offer + proof line */}
    <section className="section section-alt">
      <div className="container">
        <Reveal>
          <div className="tag">THE OFFER</div>
          <p className="lead" style={{maxWidth:'none', margin:'12px 0 0'}}>
            Here's what no software vendor will tell you: 75% of mid-market ERP projects fail or get abandoned. Our founder lived two of them. So we refuse to let the risk sit with you. We model SimpleGrid on your factory, run it on your real floor for 30 days, and you pay only if you keep it. If it doesn't earn its place, you owe us nothing. That's not a discount. It's the only honest way to sell into an industry that fails three customers out of four.
          </p>
        </Reveal>
      </div>
    </section>

    {/* (d) Under the hood - SG Schema / SG Engine / Event Sourcing.
       Intro line "This is not AI. AI is the surface." pulled from the bottom founder quote.
       (e) Unlock tiles moved BEFORE the event-sourcing explanation. */}
    <section className="section" id="architecture" style={{background:'#fff'}}>
      <div className="container">
        <Reveal>
          <div className="tag" style={{color:'var(--sg-purple)'}}>UNDER THE HOOD</div>
          <p className="lead" style={{maxWidth:960, fontStyle:'italic', fontWeight:600, color:'var(--fg1)', margin:'4px 0 14px'}}>
            This is not AI. AI is the surface.
          </p>
          <h2 className="h2 ink" style={{color:'var(--fg1)'}}>
            SG Schema <span style={{color:'var(--fg3)', fontWeight:400}}>×</span> SG Engine <span style={{color:'var(--fg3)', fontWeight:400}}>×</span> Event Sourcing.
          </h2>
          <p className="lead" style={{maxWidth:960}}>
            Most ERPs are data-entry apps wearing a suit - tables, forms, overwrites. SimpleGrid is built on two ideas no other business platform ships at the core: an <strong>SG Schema</strong> that captures one factory's complete operational blueprint, and an <strong>event-sourced</strong> ledger that stores every change. SG Engine reads the SG Schema and runs your factory from it. The result is a system that bends to your business instead of the other way around.
          </p>
        </Reveal>

        {/* (e) Unlock tiles - moved BEFORE the event-sourcing card. The "days vs quarters" line sits next to the 7-day-deploys tile (the first tile). */}
        <div className="arch-outcome-box">
          <div style={{fontSize:13, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--fg3)', marginBottom:8}}>What this combination unlocks</div>
          <p style={{fontSize:15, color:'var(--fg2)', lineHeight:1.6, margin:'0 0 18px'}}>
            The rest of the industry measures ERP rollouts in quarters and years. We measure ours in days.
          </p>
          <div className="arch-outcome-grid">
            {[
              { t: '7-day deploys', p: 'New operation → new system, generated from your SG Schema. No new codebase per customer.' },
              { t: 'Audit by design', p: 'You don\'t add audit logs. The audit is the system. Every regulator question already has an answer.' },
              { t: 'Rules without releases', p: 'Change a rule, the system changes. No deploy cycle. No IT ticket. No version migration.' },
              { t: 'Disputes resolved', p: 'Vendor said 500. Log says 450, by Mike, 4:13 PM Tuesday. Argument over.' },
            ].map((x, i) => (
              <div key={i} className="arch-outcome-cell">
                <div style={{fontFamily:'var(--font-heading)', fontSize:16, fontWeight:700, color:'var(--fg1)', marginBottom:6}}>{x.t}</div>
                <div style={{fontSize:13, color:'var(--fg2)', lineHeight:1.6}}>{x.p}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SG Schema + Event Sourcing cards (event-sourcing explanation now appears AFTER the unlock tiles) */}
        <div className="arch-ddd-grid">
          <Reveal>
            <div className="arch-ddd-card" style={{
              border:'1px solid var(--border)', borderRadius:12, padding:32, height:'100%',
              borderLeft:'4px solid var(--sg-purple)',
            }}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'0.16em', color:'var(--sg-purple)', marginBottom:8}}>SG SCHEMA</div>
              <h3 style={{fontFamily:'var(--font-heading)', fontSize:22, fontWeight:700, margin:'0 0 14px', color:'var(--fg1)', letterSpacing:'-0.015em'}}>
                Your business has a language. The system speaks it.
              </h3>
              <p style={{fontSize:14, color:'var(--fg2)', lineHeight:1.7, margin:'0 0 14px'}}>
                A "Job Order" in your factory is not the same thing as a "Work Order" in someone else's. A "rejection" in fabric is different from a "rejection" in plywood. Generic ERPs flatten that - every customer fits the same forms.
              </p>
              <p style={{fontSize:14, color:'var(--fg2)', lineHeight:1.7, margin:0}}>
                Your SG Schema captures <em>your</em> entities, your states, your transitions, your invariants, your chain reactions. AI writes it, the operator validates it, SG Engine runs it. The vocabulary on every screen is yours, because the spec underneath is yours.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{
              border:'1px solid var(--border)', borderRadius:12, padding:32, height:'100%',
              borderLeft:'4px solid var(--sg-blue)',
            }}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'0.16em', color:'var(--sg-blue)', marginBottom:8}}>EVENT SOURCING</div>
              <h3 style={{fontFamily:'var(--font-heading)', fontSize:22, fontWeight:700, margin:'0 0 14px', color:'var(--fg1)', letterSpacing:'-0.015em'}}>
                The log is the database. The state is a projection.
              </h3>
              <p style={{fontSize:14, color:'var(--fg2)', lineHeight:1.7, margin:'0 0 14px'}}>
                Instead of storing the current row and losing the past, we store every event that ever changed your business. Inventory is not a number - it's the sum of every receipt and issuance. An order's status is not a flag - it's the latest state in a chain of recorded transitions.
              </p>
              <p style={{fontSize:14, color:'var(--fg2)', lineHeight:1.7, margin:0}}>
                Banks have run on this idea for centuries - a ledger, never erased. Almost no ERP does. We do.
              </p>
            </div>
          </Reveal>
        </div>

        {/* (f) Founder quote (rest of quote, with "This is not AI. AI is the surface." removed since it moved up to the section intro) */}
        <Reveal delay={200}>
          <div style={{marginTop:40, padding:'24px 0', borderTop:'1px solid var(--border)'}}>
            <p style={{fontSize:15, color:'var(--fg2)', lineHeight:1.7, margin:0, fontStyle:'italic'}}>
              "Underneath is an architecture so unusual that even seasoned engineers ask us to draw it twice. Most ERPs are 1990s thinking dressed in 2020s UI. SimpleGrid is what an enterprise system looks like if you started today, with what we now know."
            </p>
            <p style={{fontSize:13, color:'var(--fg3)', lineHeight:1.5, margin:'6px 0 0', fontStyle:'normal', fontWeight:600}}>
              - The founding team
            </p>
          </div>
        </Reveal>
      </div>
    </section>

    {/* (g) "From the first PO to the final dispatch" animation - header preserved, animation untouched */}
    <ProductionFlow />

    <section className="section section-dark final-cta">
      <div className="container">
        <div className="tag" style={{color:'rgba(255,255,255,0.5)'}}>SELECTIVE ONBOARDING</div>
        <h2 className="h2" style={{color:'#fff', maxWidth:760, margin:'0 auto'}}>We are not for everyone.</h2>
        <p className="sub" style={{color:'rgba(255,255,255,0.75)', maxWidth:680, margin:'18px auto 0'}}>Limited capacity each quarter. We only take on customers we know we can win for - because we carry the cost and the risk of the build, and we only get paid when you succeed.</p>
        <div style={{marginTop:28, display:'flex', justifyContent:'center'}}>
          <button type="button" onClick={() => setShowInvite(true)} className="btn btn-lg btn-invite" style={{animation:'sgBuildPulse 1.8s ease-in-out infinite'}}>Book a demo</button>
        </div>
        <p className="note" style={{color:'rgba(255,255,255,0.5)', marginTop:14}}>Senior engineers, deployment experts, and founder engagement on every deployment · We reply within 48 hours</p>
        <div style={{marginTop:20,textAlign:'center'}}>
          <a href="product.html" style={{fontSize:14,fontWeight:600,color:'rgba(255,255,255,0.85)',textDecoration:'none'}}>See how the system actually works →</a>
        </div>
      </div>
    </section>

    </main>
    <Footer />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<AboutPage />);
