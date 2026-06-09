function App() {
  const [showLogin, setShowLogin] = React.useState(false);
  // When we arrive with a #section hash (e.g. from another page's Home menu),
  // scroll to it once the sections have rendered.
  React.useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ block: 'start' });
    });
  }, []);
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
