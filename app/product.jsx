function ProductPage() {
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
    <Nav page="product" onLoginClick={() => setShowLogin(true)} />
    <main id="main">
      {/* HOOK - set the stage */}
      <ProductHeroNew />

      {/* MOTIVATION - Fogg M: pain in operator voice */}
      <MotivationSection />

      {/* INTEGRATIONS + SECURITY - supporting pillars */}
      <Integrations />
      <DataSecurity />

      {/* THE BIG IDEA - Events Ledger (flagship section) */}
      <EventsLedger />

      {/* ABILITY - adoption is easy */}
      <AbilitySection />

      {/* RULES - your process, enforced */}
      <CustomRules />

      {/* TRIGGER - final CTA */}
      <TriggerCTA />
    </main>
    <Footer />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    <div className="mobile-cta">
      <button type="button" onClick={() => setShowInvite(true)} className="btn btn-invite">Request an invite</button>
    </div>
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<ProductPage />);
