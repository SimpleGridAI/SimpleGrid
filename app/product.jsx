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
      <FinalCTA title="One integrated system for your whole floor." body="Orders, inventory, costing, QC, contractors, approvals, dispatch - every feature modelled on your exact workflow, in one place. No bolted-on modules, no template to bend around. And because your team types the way they already text, there's nothing to train. See it running on your own operation." note="We configure it to your floor at our cost. Run it live for 30 days. You pay only when it works." ctaLabel="See a live demo" />
    </main>
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    <div className="mobile-cta">
      <button type="button" onClick={() => setShowInvite(true)} className="btn btn-invite">Book a demo</button>
    </div>
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<ProductPage />);
