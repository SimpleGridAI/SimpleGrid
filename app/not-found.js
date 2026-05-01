function NotFoundPage() {
  const [showLogin, setShowLogin] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    page: "",
    onLoginClick: () => setShowLogin(true)
  }), /*#__PURE__*/React.createElement("main", { id: "main",
    className: "nf-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nf-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nf-code",
    "aria-hidden": "true"
  }, "404"), /*#__PURE__*/React.createElement("h1", {
    className: "nf-h"
  }, "Page not found."), /*#__PURE__*/React.createElement("p", {
    className: "nf-p"
  }, "The page you were looking for is not here. It may have moved, or the link may be wrong. Head back to the SimpleGrid homepage or try one of the links below."), /*#__PURE__*/React.createElement("div", {
    className: "nf-cta"
  }, /*#__PURE__*/React.createElement("a", {
    href: "index.html",
    className: "btn btn-primary"
  }, "SimpleGrid Home"), /*#__PURE__*/React.createElement("a", {
    href: "https://cal.com/simplegrid-ai",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn btn-secondary"
  }, "Book a Call")), /*#__PURE__*/React.createElement("div", {
    className: "nf-links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "product.html",
    title: "How SimpleGrid manufacturing ERP works"
  }, "Product"), /*#__PURE__*/React.createElement("a", {
    href: "pricing.html",
    title: "SimpleGrid manufacturing ERP pricing"
  }, "Pricing"), /*#__PURE__*/React.createElement("a", {
    href: "case-studies.html",
    title: "Manufacturing ERP case studies"
  }, "Case studies"), /*#__PURE__*/React.createElement("a", {
    href: "blog.html",
    title: "SimpleGrid blog for manufacturers"
  }, "Blog"), /*#__PURE__*/React.createElement("a", {
    href: "about.html",
    title: "About SimpleGrid"
  }, "About")))), /*#__PURE__*/React.createElement(Footer, null), showLogin && /*#__PURE__*/React.createElement(LoginModal, {
    onClose: () => setShowLogin(false)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(NotFoundPage, null));