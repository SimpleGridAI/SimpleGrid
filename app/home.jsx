function App() {
  const [showLogin, setShowLogin] = React.useState(false);
  return (<>
    <Nav page="home" onLoginClick={() => setShowLogin(true)} />
    <main id="main">
      <Hero />
      <TrustStrip />
      <IntegrationsBar />
      <ProblemSection />
      <BurstBand />
      <WhatWeDo />
      <HowItWorks />
      <ProofSection />
      <FounderStory />
      <ComparisonTable />
      <FromTheField />
      <HomeFAQ />
      <FinalCTA />
    </main>
    <Footer />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    <div className="mobile-cta">
      <a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener noreferrer" data-cta="mobile_sticky" className="btn btn-invite">Book a demo</a>
    </div>
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
