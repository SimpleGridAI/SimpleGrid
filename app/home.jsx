function App() {
  const [showLogin, setShowLogin] = React.useState(false);
  const [showInvite, setShowInvite] = React.useState(false);
  return (<>
    <Nav page="home" onLoginClick={() => setShowLogin(true)} />
    <main id="main">
      <Hero />
      <IntegrationsBar />
      <ProblemSection />
      <WhatWeDo />
      <HowItWorks />
      <ProofSection />
      <FinalCTA />
    </main>
    <Footer />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    <div className="mobile-cta">
      <button type="button" onClick={() => setShowInvite(true)} className="btn btn-invite">Request an invite</button>
    </div>
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
