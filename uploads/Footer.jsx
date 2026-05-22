function Footer() {
  const cols = [
    { h: 'Product', links: [
      { l: 'How it works', href: 'index.html#how-it-works' },
      { l: 'Case studies', href: 'case-studies.html' },
    ]},
    { h: 'Company', links: [
      { l: 'About', href: 'index.html#founder' },
      { l: 'Blog', href: 'blog.html' },
    ]},
    { h: 'Get in touch', links: [
      { l: 'mukund@simplegrid.ai', href: 'mailto:mukund@simplegrid.ai' },
      { l: '+91 96499 33000', href: 'tel:+919649933000' },
      { l: 'LinkedIn', href: '#' },
      { l: 'Book a call with the founder', href: 'https://calendly.com' },
    ]},
  ];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <img src="assets/simplegrid-logo-horizontal.svg" alt="SimpleGrid" className="footer-logo" />
            <p className="footer-tagline">Custom ERP. Built at our risk. Paid for if it works.</p>
          </div>
          <div className="footer-cols" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
            {cols.map(c => (
              <div key={c.h}>
                <div className="footer-h">{c.h}</div>
                {c.links.map(x => <a key={x.l} href={x.href} className="footer-link">{x.l}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 Valaya AI Technologies Pvt. Ltd.</div>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a><a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
window.Footer = Footer;
