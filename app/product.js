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
        window.scrollTo({
          top,
          behavior: 'smooth'
        });
      } else if (tries++ < 20) {
        setTimeout(tryScroll, 100);
      }
    };
    setTimeout(tryScroll, 150);
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    page: "product",
    onLoginClick: () => setShowLogin(true)
  }), /*#__PURE__*/React.createElement("main", { id: "main" }, /*#__PURE__*/React.createElement(ProductHeroNew, null), /*#__PURE__*/React.createElement(MotivationSection, null), /*#__PURE__*/React.createElement(Integrations, null), /*#__PURE__*/React.createElement(DataSecurity, null), /*#__PURE__*/React.createElement(EventsLedger, null), /*#__PURE__*/React.createElement(AbilitySection, null), /*#__PURE__*/React.createElement(CustomRules, null), /*#__PURE__*/React.createElement(FinalCTA, { title: "One integrated system for your whole floor.", body: "Orders, inventory, costing, QC, contractors, approvals, dispatch - every feature modelled on your exact workflow, in one place. No bolted-on modules, no template to bend around. And because your team types the way they already text, there's nothing to train. See it running on your own operation.", note: "Built around how you actually work. Live in 7-21 days.", ctaLabel: "See a live demo" })), /*#__PURE__*/React.createElement(Footer, null), showLogin && /*#__PURE__*/React.createElement(LoginModal, {
    onClose: () => setShowLogin(false)
  }), showInvite && /*#__PURE__*/React.createElement(InviteModal, {
    onClose: () => setShowInvite(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "mobile-cta"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowInvite(true),
    className: "btn btn-invite"
  }, "Book a demo")));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(ProductPage, null));