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

    <section className="section" style={{paddingBottom:24}}>
      <div className="container">
        <div className="tag">ABOUT US</div>
        <h1 className="h2 ink">Built by an operator who's been on your floor.</h1>
        <p className="lead" style={{maxWidth: 960}}>
          SimpleGrid was not designed in a boardroom. It was designed on a shop floor that was already running on Excel and group chats — and not working. Our founder built a $30M manufacturing business, survived two ERP failures, and ended up on Google Sheets. SimpleGrid is the system he wished he had — and the reason we don't ask you to pay until we've proven it works on your floor.
        </p>
      </div>
    </section>

    <FounderStory />

    <ArchitectureNew />

    <ProductionFlow />

    <section className="section section-dark final-cta">
      <div className="container">
        <div className="tag" style={{color:'rgba(255,255,255,0.5)'}}>SELECTIVE ONBOARDING</div>
        <h2 className="h2" style={{color:'#fff', maxWidth:760, margin:'0 auto'}}>We are not for everyone.</h2>
        <p className="sub" style={{color:'rgba(255,255,255,0.75)', maxWidth:680, margin:'18px auto 0'}}>Founder-led. Limited capacity each quarter. We only take on customers we know we can win for — because we carry the cost and the risk of the build, and we only get paid when you succeed.</p>
        <div style={{marginTop:28, display:'flex', justifyContent:'center'}}>
          <button type="button" onClick={() => setShowInvite(true)} className="btn btn-lg btn-invite" style={{animation:'sgBuildPulse 1.8s ease-in-out infinite'}}>Request an Invite →</button>
        </div>
        <p className="note" style={{color:'rgba(255,255,255,0.5)', marginTop:14}}>Senior engineers and a founder on every deployment · We reply within 48 hours</p>
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
