function CaseStudiesPage() {
  const [showLogin, setShowLogin] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    page: "cases",
    onLoginClick: () => setShowLogin(true)
  }), /*#__PURE__*/React.createElement("main", { id: "main" }, /*#__PURE__*/React.createElement("section", {
    className: "section",
    style: {
      paddingBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "CASE STUDIES"), /*#__PURE__*/React.createElement("h1", {
    className: "h2"
  }, "Customized ERP for manufacturers, live in 12 to 21 days."), /*#__PURE__*/React.createElement("p", {
    className: "section-lead"
  }, "Real factories. Real numbers. Real floor staff using the system every day. The two below are public - more are running confidentially."), /*#__PURE__*/React.createElement("div", {
    className: "case-list"
  }, /*#__PURE__*/React.createElement("a", {
    href: "case-furniture-manufacturer.html",
    className: "proof-card case-row",
    style: {
      textDecoration: 'none',
      color: 'inherit',
      transition: 'all 160ms var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "proof-photo case-row-photo",
    style: {
      background: 'url(assets/elite-factory.jpeg) center/cover',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 10,
      left: 10,
      background: 'rgba(0,0,0,0.65)',
      color: '#fff',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      padding: '4px 8px',
      borderRadius: 4,
      backdropFilter: 'blur(4px)'
    }
  }, "\u25CF Actual shot")), /*#__PURE__*/React.createElement("div", {
    className: "proof-body case-row-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      marginBottom: 8
    }
  }, "FURNITURE EXPORT"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 22,
      fontWeight: 700,
      margin: '0 0 10px',
      letterSpacing: '-0.015em'
    }
  }, "Furniture Manufacturer & Exporter"), /*#__PURE__*/React.createElement("p", null, "600\u2013800 employees. ~1 million sq ft. Multi-stage production. Deployed in 21 days."), /*#__PURE__*/React.createElement("div", {
    className: "proof-stats"
  }, "64 things tracked. 72 automatic triggers."), /*#__PURE__*/React.createElement("div", {
    className: "proof-quote"
  }, "\"SimpleGrid feels like our system. My stores manager was comfortable on day one.\"", /*#__PURE__*/React.createElement("div", {
    className: "proof-attr"
  }, "- The founder")))), /*#__PURE__*/React.createElement("a", {
    href: "case-apex.html",
    className: "proof-card case-row",
    style: {
      textDecoration: 'none',
      color: 'inherit',
      transition: 'all 160ms var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "proof-photo case-row-photo",
    style: {
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(ApparelVisual, null)), /*#__PURE__*/React.createElement("div", {
    className: "proof-body case-row-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      marginBottom: 8
    }
  }, "APPAREL CMT"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 22,
      fontWeight: 700,
      margin: '0 0 10px',
      letterSpacing: '-0.015em'
    }
  }, "Apparel Contract Manufacturer ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)',
      fontWeight: 400
    }
  }, "(reference on request)")), /*#__PURE__*/React.createElement("p", null, "80\u2013100k shirts/month. 3 streams: CMT, own brand, fabric trading. 20+ job workers. 30+ inventory locations. Live in 12 days."), /*#__PURE__*/React.createElement("div", {
    className: "proof-stats"
  }, "34 things tracked. 44 automatic triggers."), /*#__PURE__*/React.createElement("div", {
    className: "proof-quote"
  }, "\"They sent a working demo in 24 hours - 60\u201370% accurate. No other vendor we've worked with has done that.\"", /*#__PURE__*/React.createElement("div", {
    className: "proof-attr"
  }, "- Founder, Apex Apparel (name withheld)"))))), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      fontFamily: 'var(--font-heading)',
      fontSize: 17,
      fontWeight: 600,
      color: 'var(--fg1)',
      marginTop: 40
    }
  }, "Two industries. Two completely different operations. One platform."))), /*#__PURE__*/React.createElement("section", {
    className: "section section-dark final-cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "Your factory is different. That's exactly why SimpleGrid works."), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "The system adapts to you."), /*#__PURE__*/React.createElement("a", {
    href: "https://cal.com/simplegrid-ai",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn btn-lg btn-primary"
  }, "Book a demo - See how we'd model your operations")))), /*#__PURE__*/React.createElement(Footer, null), showLogin && /*#__PURE__*/React.createElement(LoginModal, {
    onClose: () => setShowLogin(false)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(CaseStudiesPage, null));