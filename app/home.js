function App() {
  const [showLogin, setShowLogin] = React.useState(false);
  // When we arrive with a #section hash (e.g. from another page's Home menu),
  // scroll to it once the sections have rendered.
  React.useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({
        block: 'start'
      });
    });
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("main", {
    id: "main"
  }, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(TrustStrip, null), /*#__PURE__*/React.createElement(IntegrationsBar, null), /*#__PURE__*/React.createElement(ProblemSection, null), /*#__PURE__*/React.createElement(BurstBand, null), /*#__PURE__*/React.createElement(WhatWeDo, null), /*#__PURE__*/React.createElement(HowItWorks, null), /*#__PURE__*/React.createElement(WhyNotERP, null), /*#__PURE__*/React.createElement(WhoItsFor, null), /*#__PURE__*/React.createElement(ProofSection, null), /*#__PURE__*/React.createElement(FounderStory, null), /*#__PURE__*/React.createElement(HomeFAQ, null), /*#__PURE__*/React.createElement(FinalCTA, null)), showLogin && /*#__PURE__*/React.createElement(LoginModal, {
    onClose: () => setShowLogin(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "mobile-cta"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://cal.com/simplegrid-ai",
    target: "_blank",
    rel: "noopener noreferrer",
    "data-cta": "mobile_sticky",
    className: "btn btn-invite"
  }, "Book a demo")));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));