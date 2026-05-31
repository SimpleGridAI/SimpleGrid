function App() {
  const [showLogin, setShowLogin] = React.useState(false);
  return (<>
    {/* Top nav is rendered by the shared component (components/site-nav.js), outside #root. */}
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
      <HomeFAQ />
      <FinalCTA />
    </main>
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    <div className="mobile-cta">
      <a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener noreferrer" data-cta="mobile_sticky" className="btn btn-invite">Book a demo</a>
    </div>
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
