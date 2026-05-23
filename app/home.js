function App() {
  const [showLogin, setShowLogin] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    page: "home",
    onLoginClick: () => setShowLogin(true)
  }), /*#__PURE__*/React.createElement("main", { id: "main" },
    /*#__PURE__*/React.createElement(Hero, null),
    /*#__PURE__*/React.createElement(TrustStrip, null),
    /*#__PURE__*/React.createElement(IntegrationsBar, null),
    /*#__PURE__*/React.createElement(ProblemSection, null),
    /*#__PURE__*/React.createElement(WhatWeDo, null),
    /*#__PURE__*/React.createElement(HowItWorks, null),
    /*#__PURE__*/React.createElement(ProofSection, null),
    /*#__PURE__*/React.createElement(FounderStory, null),
    /*#__PURE__*/React.createElement(ComparisonTable, null),
    /*#__PURE__*/React.createElement(FromTheField, null),
    /*#__PURE__*/React.createElement(HomeFAQ, null),
    /*#__PURE__*/React.createElement(FinalCTA, null)
  ), /*#__PURE__*/React.createElement(Footer, null), showLogin && /*#__PURE__*/React.createElement(LoginModal, {
    onClose: () => setShowLogin(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "mobile-cta"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://cal.com/simplegrid-ai",
    target: "_blank",
    rel: "noopener noreferrer",
    "data-cta": "mobile_sticky",
    className: "btn btn-invite"
  }, "Book a call")));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
