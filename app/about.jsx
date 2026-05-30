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

    {/* (a) Operator hook - hero-style with team photo bg + black overlay, founder portrait on the left */}
    <section className="section" style={{
      position:'relative',
      backgroundImage:'url(assets/team_photo.jpeg)',
      backgroundSize:'cover',
      backgroundPosition:'center',
      color:'#fff',
      overflow:'hidden',
      minHeight:'78vh',
      display:'flex',
      alignItems:'center',
      paddingTop:160,
      paddingBottom:160,
    }}>
      <div aria-hidden="true" style={{position:'absolute',inset:0,background:'rgba(8,10,14,0.85)',zIndex:0}} />
      <div className="container" style={{maxWidth:'none', position:'relative', zIndex:1, width:'100%'}}>
        <div className="tag" style={{color:'rgba(255,255,255,0.7)',marginBottom:24}}>ABOUT US</div>
        <h1 style={{fontFamily:'var(--font-heading)',fontWeight:700,letterSpacing:'-0.03em',lineHeight:1.05,fontSize:'clamp(44px, 6.5vw, 72px)',color:'#fff',margin:'0 0 28px',maxWidth:1100}}>Built by operators who've been on your floor.</h1>
        <p style={{fontSize:'clamp(18px, 1.7vw, 22px)',lineHeight:1.55,color:'rgba(255,255,255,0.85)',margin:0,maxWidth:920}}>
          SimpleGrid was not designed in a boardroom. It was designed on a shop floor that was already running on Excel and group chats - and not working. The people who built SimpleGrid have run multi-stage factories with hundreds of workers, survived two ERP failures, and ended up on Google Sheets. SimpleGrid is the system we wished we had. We were the customer first - we know exactly what breaks when the system can't keep up with the floor.
        </p>
      </div>
    </section>

    {/* (b) + (c) Pain + failure stat + pay-only-if-kept offer + proof line */}
    <section className="section section-alt">
      <div className="container">
        <Reveal>
          <div className="tag">THE OFFER</div>
          <p className="lead" style={{maxWidth:'none', margin:'12px 0 0'}}>
            Here's what no software vendor will tell you: 75% of mid-market ERP projects fail or get abandoned. We lived two of them ourselves. Every ERP vendor makes you pay first and hope it works - we refuse to let the risk sit with you. We model SimpleGrid on your factory, run it on your real floor for 30 days, and you pay only if you keep it. If it doesn't earn its place, you owe us nothing. That's not a discount. It's the only honest way to sell into an industry that fails three customers out of four.
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
          <div style={{fontSize:'var(--fs-caption)', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--fg3)', marginBottom:8}}>What this combination unlocks</div>
          <p style={{fontSize:'var(--fs-small)', color:'var(--fg2)', lineHeight:1.6, margin:'0 0 18px'}}>
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
                <div style={{fontSize:'var(--fs-caption)', color:'var(--fg2)', lineHeight:1.6}}>{x.p}</div>
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
            <p style={{fontSize:'var(--fs-small)', color:'var(--fg2)', lineHeight:1.7, margin:0, fontStyle:'italic'}}>
              "Underneath is an architecture so unusual that even seasoned engineers ask us to draw it twice. Most ERPs are 1990s thinking dressed in 2020s UI. SimpleGrid is what an enterprise system looks like if you started today, with what we now know."
            </p>
            <p style={{fontSize:'var(--fs-caption)', color:'var(--fg3)', lineHeight:1.5, margin:'6px 0 0', fontStyle:'normal', fontWeight:600}}>
              - The founding team
            </p>
          </div>
        </Reveal>
      </div>
    </section>

    {/* (g) "From the first PO to the final dispatch" animation - header preserved, animation untouched */}
    <div style={{paddingTop:48}}>
      <ProductionFlow />
    </div>

    </main>
    <FinalCTA title="Built by people who've run the floor." body="We ran multi-stage factories to $30M and survived two ERP failures before building SimpleGrid. We're on every deployment. We carry the cost and the risk - you run it for 30 days and pay only once it earns its keep." note="Limited slots each quarter. We onboard selectively." />
      <Footer />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<AboutPage />);
