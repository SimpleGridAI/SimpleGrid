function CaseStudiesPage() {
  const [showLogin, setShowLogin] = React.useState(false);
  return (<>
    <Nav page="cases" onLoginClick={() => setShowLogin(true)} />
    <main id="main">
    <section className="section" style={{paddingBottom:48}}>
      <div className="container">
        <div className="tag">CASE STUDIES</div>
        <h1 className="h2">We built it at our risk. They ran it free for 30 days. Both kept it.</h1>
        <p className="section-lead">Every ERP vendor makes you pay first and hope it works. We flipped it. We carried the build cost on both of these factories - they ran SimpleGrid for 30 days on their real floor, with their real team, before paying a cent. Real factories. Real numbers. Real floor staff using the system every day. The two below are public - more are running confidentially.</p>
        <div className="case-list">

          <a href="case-furniture-manufacturer.html" className="proof-card case-row" style={{textDecoration:'none',color:'inherit',transition:'all 160ms var(--ease-standard)'}}>
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
              <h2 style={{fontFamily:'var(--font-heading)',fontSize:22,fontWeight:700,margin:'0 0 10px',letterSpacing:'-0.015em'}}>Furniture Manufacturer &amp; Exporter</h2>
              <p>600-800 employees. ~1 million sq ft. Multi-stage production. Deployed in 21 days.</p>
              <div className="proof-stats">$200K in silent material losses, found and stopped.</div>
              <div className="proof-quote">
                "SimpleGrid feels like our system. My stores manager was comfortable on day one."
                <div className="proof-attr">- The founder</div>
              </div>
            </div>
          </a>

          <a href="case-apex.html" className="proof-card case-row" style={{textDecoration:'none',color:'inherit',transition:'all 160ms var(--ease-standard)'}}>
            <div className="proof-photo case-row-photo" style={{padding:0, overflow:'hidden'}}>
              <ApparelVisual />
            </div>
            <div className="proof-body case-row-body">
              <div className="tag" style={{marginBottom:8}}>APPAREL CMT</div>
              <h2 style={{fontFamily:'var(--font-heading)',fontSize:22,fontWeight:700,margin:'0 0 10px',letterSpacing:'-0.015em'}}>Apparel Contract Manufacturer <span style={{fontSize:12,color:'var(--fg3)',fontWeight:400}}>(reference on request)</span></h2>
              <p>80-100k shirts/month. 3 streams: CMT, own brand, fabric trading. 20+ job workers. 30+ inventory locations. Live in 12 days.</p>
              <div className="proof-stats">Two failed ERPs, then live in 12 days - every order in one view.</div>
              <div className="proof-quote">
                "They sent a working demo in 24 hours - 60-70% accurate. No other vendor we've worked with has done that."
                <div className="proof-attr">- Founder, Apex Apparel (name withheld)</div>
              </div>
            </div>
          </a>

        </div>
        <p style={{textAlign:'center',fontFamily:'var(--font-heading)',fontSize:17,fontWeight:600,color:'var(--fg1)',marginTop:40}}>Two industries. Two completely different operations. One platform.</p>
      </div>
    </section>
    </main>

    <FinalCTA title="Your factory could be the next one." body="The operators above run SimpleGrid on their real floors today. We build at our cost, you run it for 30 days, and you pay only when it's already moving the business." note="Limited slots each quarter. We onboard selectively." />
      <Footer />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<CaseStudiesPage />);
