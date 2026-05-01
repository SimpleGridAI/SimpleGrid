function CaseStudiesPage() {
  const [showLogin, setShowLogin] = React.useState(false);
  return (<>
    <Nav page="cases" onLoginClick={() => setShowLogin(true)} />
    <main id="main">
    <section className="section" style={{paddingBottom:48}}>
      <div className="container">
        <div className="tag">CASE STUDIES</div>
        <h1 className="h2">Customized ERP for manufacturers, live in 12 to 21 days.</h1>
        <p className="section-lead">Real factories. Real numbers. Real floor staff using the system every day. The two below are public - more are running confidentially.</p>
        <div className="case-list">

          <a href="case-elite.html" className="proof-card case-row" style={{textDecoration:'none',color:'inherit',transition:'all 160ms var(--ease-standard)'}}>
            <div className="proof-photo case-row-photo" style={{background:'url(assets/elite-factory.jpeg) center/cover',position:'relative'}}>
              <span style={{
                position:'absolute', top:10, left:10,
                background:'rgba(0,0,0,0.65)', color:'#fff',
                fontSize:10, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase',
                padding:'4px 8px', borderRadius:4, backdropFilter:'blur(4px)',
              }}>● Actual shot</span>
            </div>
            <div className="proof-body case-row-body">
              <div className="tag" style={{marginBottom:8}}>FURNITURE EXPORT</div>
              <h2 style={{fontFamily:'var(--font-heading)',fontSize:22,fontWeight:700,margin:'0 0 10px',letterSpacing:'-0.015em'}}>Elite Arts &amp; Crafts</h2>
              <p>600–800 employees. ~1 million sq ft. Multi-stage production. Deployed in 21 days.</p>
              <div className="proof-stats">64 things tracked. 72 automatic triggers.</div>
              <div className="proof-quote">
                "SimpleGrid feels like our system. My stores manager was comfortable on day one."
                <div className="proof-attr">- Chirag, Founder</div>
              </div>
            </div>
          </a>

          <a href="case-apex.html" className="proof-card case-row" style={{textDecoration:'none',color:'inherit',transition:'all 160ms var(--ease-standard)'}}>
            <div className="proof-photo case-row-photo" style={{padding:0, overflow:'hidden'}}>
              <ApparelVisual />
            </div>
            <div className="proof-body case-row-body">
              <div className="tag" style={{marginBottom:8}}>APPAREL CMT</div>
              <h2 style={{fontFamily:'var(--font-heading)',fontSize:22,fontWeight:700,margin:'0 0 10px',letterSpacing:'-0.015em'}}>Apex Apparel <span style={{fontSize:12,color:'var(--fg3)',fontWeight:400}}>(confidential)</span></h2>
              <p>80–100k shirts/month. 3 streams: CMT, own brand, fabric trading. 20+ job workers. 30+ inventory locations. Live in 12 days.</p>
              <div className="proof-stats">34 things tracked. 44 automatic triggers.</div>
              <div className="proof-quote">
                "They sent a working demo in 24 hours - 60–70% accurate. No other vendor we've worked with has done that."
                <div className="proof-attr">- Founder, Apex Apparel (name withheld)</div>
              </div>
            </div>
          </a>

        </div>
        <p style={{textAlign:'center',fontFamily:'var(--font-heading)',fontSize:17,fontWeight:600,color:'var(--fg1)',marginTop:40}}>Two industries. Two completely different operations. One platform.</p>
      </div>
    </section>

    <section className="section section-dark final-cta">
      <div className="container">
        <h2 className="h2">Your factory is different. That's exactly why SimpleGrid works.</h2>
        <p className="sub">The system adapts to you.</p>
        <a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-primary">Book a call - See how we'd model your operations</a>
      </div>
    </section>
    </main>

    <Footer />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<CaseStudiesPage />);
