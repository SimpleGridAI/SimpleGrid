function NotFoundPage() {
  const [showLogin, setShowLogin] = React.useState(false);
  return (<>
    <Nav page="" onLoginClick={() => setShowLogin(true)} />
    <main className="nf-wrap">
      <div className="nf-card">
        <div className="nf-code" aria-hidden="true">404</div>
        <h1 className="nf-h">Page not found.</h1>
        <p className="nf-p">The page you were looking for is not here. It may have moved, or the link may be wrong. Head back to the SimpleGrid homepage or try one of the links below.</p>
        <div className="nf-cta">
          <a href="index.html" className="btn btn-primary">SimpleGrid Home</a>
          <a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener noreferrer" data-cal-link="simplegrid-ai" data-cal-config='{"theme":"light"}' onMouseEnter={() => { if (typeof loadCal === 'function') loadCal(); }} className="btn btn-secondary">Book a Call</a>
        </div>
        <div className="nf-links">
          <a href="product.html" title="How SimpleGrid manufacturing ERP works">Product</a>
          <a href="pricing.html" title="SimpleGrid manufacturing ERP pricing">Pricing</a>
          <a href="case-studies.html" title="Manufacturing ERP case studies">Case studies</a>
          <a href="blog.html" title="SimpleGrid blog for manufacturers">Blog</a>
          <a href="about.html" title="About SimpleGrid">About</a>
        </div>
      </div>
    </main>
    <Footer />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<NotFoundPage />);
