function Nav({ page = 'home', onLoginClick }) {
  const [openResources, setOpenResources] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const resourcesRef = React.useRef(null);

  // On nested pages (e.g. /blog/{slug}/) the generator sets
  // window.__SG_BLOG_ASSET_PREFIX__ = "../../" so root-relative file paths
  // resolve correctly. Apply it to nav hrefs so "index.html", "product.html"
  // etc. don't try to load /blog/{slug}/index.html.
  const prefix = (typeof window !== 'undefined' && window.__SG_BLOG_ASSET_PREFIX__) || '';
  const px = (href) => {
    if (!prefix) return href;
    if (/^(https?:|mailto:|tel:|#|\/)/i.test(href)) return href;
    return prefix + href;
  };

  React.useEffect(() => {
    const handler = (e) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target)) setOpenResources(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  // Close mobile menu on Escape and lock body scroll while open
  React.useEffect(() => {
    if (!openMenu) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpenMenu(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openMenu]);

  const links = [
    { id: 'home', label: 'Home', href: 'index.html', title: 'SimpleGrid home - AI ERP for manufacturers' },
    { id: 'product', label: 'Product', href: 'product.html', title: 'How SimpleGrid manufacturing ERP works' },
    { id: 'tools', label: 'Free Tools', href: 'tools/', title: 'Free tools for manufacturers - PO, invoice, BOM, job cost' },
  ];
  const resourceLinks = [
    { id: 'cases', label: 'Case studies', href: 'case-studies.html', desc: 'Real deployments. Real numbers.', title: 'SimpleGrid manufacturing ERP case studies' },
    { id: 'blog', label: 'Blog', href: 'blog.html', desc: 'Field notes on ERP and ops.', title: 'SimpleGrid blog for manufacturers' },
  ];
  const isResourceActive = page === 'cases' || page === 'blog';

  const mobileTopLinks = [
    { id: 'home', label: 'Home', href: 'index.html', title: 'SimpleGrid home' },
    { id: 'product', label: 'Product', href: 'product.html', title: 'How SimpleGrid works' },
    { id: 'tools', label: 'Free Tools', href: 'tools/', title: 'Free tools for manufacturers' },
  ];
  const mobileResourceLinks = [
    { id: 'cases', label: 'Case studies', href: 'case-studies.html', title: 'Manufacturing ERP case studies' },
    { id: 'blog', label: 'Blog', href: 'blog.html', title: 'SimpleGrid blog' },
  ];

  return (
    <>
    <a href="#main" className="skip-link">Skip to main content</a>
    <header className="nav" role="banner">
      <div className="nav-inner">
        <a className="nav-logo" href={px('index.html')} aria-label="SimpleGrid home" title="SimpleGrid - AI ERP for manufacturers">
          <img src={prefix + 'assets/simplegrid-logo-horizontal.svg'} alt="SimpleGrid - AI ERP for manufacturers logo" width="160" height="32" fetchpriority="high" decoding="async" />
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          {links.map(l => (
            <a key={l.id} href={px(l.href)} title={l.title}
               className={'nav-link' + (page === l.id ? ' active' : '')}>{l.label}</a>
          ))}
          <div ref={resourcesRef} style={{position:'relative',display:'inline-flex',alignItems:'center'}}>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setOpenResources(o => !o); }}
              className={'nav-link' + (isResourceActive ? ' active' : '')}
              aria-haspopup="true"
              aria-expanded={openResources}
              style={{background:'none',cursor:'pointer',display:'inline-flex',alignItems:'center',gap:4,color:'inherit'}}
            >
              Resources
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" style={{transition:'transform 0.15s',transform:openResources?'rotate(180deg)':'none'}}>
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            {openResources && (
              <div style={{position:'absolute',top:'calc(100% + 12px)',left:'50%',transform:'translateX(-50%)',background:'#fff',border:'1px solid var(--border)',borderRadius:'var(--radius-lg)',padding:8,minWidth:280,boxShadow:'0 12px 32px rgba(0,0,0,0.08)',zIndex:100}}>
                {resourceLinks.map(r => (
                  <a key={r.id} href={px(r.href)} title={r.title} style={{display:'block',padding:'12px 14px',borderRadius:'var(--radius-md)',textDecoration:'none',transition:'background 0.15s'}} onMouseEnter={e => e.currentTarget.style.background='var(--sg-off-white)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                    <div style={{fontSize:14,fontWeight:600,color:'var(--fg1)',marginBottom:2}}>{r.label}</div>
                    <div style={{fontSize:12,color:'var(--fg3)'}}>{r.desc}</div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>
        <div className="nav-right">
          <button className="btn btn-sm btn-secondary desktop-only" onClick={onLoginClick}>Log in</button>
          <a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary" title="Book a SimpleGrid demo call">Book a Call</a>
          <button
            type="button"
            className={'nav-burger' + (openMenu ? ' is-open' : '')}
            aria-label={openMenu ? 'Close menu' : 'Open menu'}
            aria-expanded={openMenu}
            onClick={() => setOpenMenu(o => !o)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      {openMenu && (
        <div className="nav-mobile" onClick={(e) => { if (e.target === e.currentTarget) setOpenMenu(false); }}>
          <nav className="nav-mobile-panel" aria-label="Mobile navigation">
            {mobileTopLinks.map(l => (
              <a key={l.id} href={px(l.href)} title={l.title}
                 className={'nav-mobile-link' + (page === l.id ? ' active' : '')}
                 onClick={() => setOpenMenu(false)}>
                {l.label}
              </a>
            ))}
            <div className="nav-mobile-section">Resources</div>
            {mobileResourceLinks.map(l => (
              <a key={l.id} href={px(l.href)} title={l.title}
                 className={'nav-mobile-link nav-mobile-sub' + (page === l.id ? ' active' : '')}
                 onClick={() => setOpenMenu(false)}>
                {l.label}
              </a>
            ))}
            <div className="nav-mobile-sep"></div>
            <button type="button" className="nav-mobile-link" onClick={() => { setOpenMenu(false); onLoginClick && onLoginClick(); }}>Log in</button>
          </nav>
        </div>
      )}
    </header>
    </>
  );
}
window.Nav = Nav;
