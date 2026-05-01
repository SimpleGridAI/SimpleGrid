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
  }), /*#__PURE__*/React.createElement("main", { id: "main" }, /*#__PURE__*/React.createElement(ProductHeroNew, null), /*#__PURE__*/React.createElement(MotivationSection, null), /*#__PURE__*/React.createElement(Integrations, null), /*#__PURE__*/React.createElement(DataSecurity, null), /*#__PURE__*/React.createElement(EventsLedger, null), /*#__PURE__*/React.createElement(AbilitySection, null), /*#__PURE__*/React.createElement(CustomRules, null), /*#__PURE__*/React.createElement(TriggerCTA, null)), /*#__PURE__*/React.createElement(Footer, null), showLogin && /*#__PURE__*/React.createElement(LoginModal, {
    onClose: () => setShowLogin(false)
  }), showInvite && /*#__PURE__*/React.createElement(InviteModal, {
    onClose: () => setShowInvite(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "mobile-cta"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowInvite(true),
    className: "btn btn-invite"
  }, "Request an invite")));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(ProductPage, null));