function Nav({ page = 'home', onLoginClick }) {
  const [openResources, setOpenResources] = React.useState(false);
  const resourcesRef = React.useRef(null);
  
  React.useEffect(() => {
    const handler = (e) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target)) setOpenResources(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const links = [
    { id: 'home', label: 'Home', href: 'index.html' },
    { id: 'how', label: 'How it works', href: 'index.html#how-it-works' },
    { id: 'arch', label: 'Architecture', href: 'architecture.html' },
  ];
  const resourceLinks = [
    { id: 'cases', label: 'Case studies', href: 'case-studies.html', desc: 'Real deployments. Real numbers.' },
    { id: 'blog', label: 'Blog', href: 'blog.html', desc: 'Operator-direct writing on ERP, ops, and AI.' },
  ];
  const isResourceActive = page === 'cases' || page === 'blog';
  
  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="nav-logo" href="index.html">
          <img src="assets/simplegrid-logo-horizontal.svg" alt="SimpleGrid" />
        </a>
        <nav className="nav-links">
          {links.map(l => (
            <a key={l.id} href={l.href}
               className={'nav-link' + (page === l.id ? ' active' : '')}>{l.label}</a>
          ))}
          <div ref={resourcesRef} style={{position:'relative'}}>
            <button
              onClick={(e) => { e.stopPropagation(); setOpenResources(o => !o); }}
              className={'nav-link' + (isResourceActive ? ' active' : '')}
              style={{background:'none',border:'none',cursor:'pointer',padding:0,fontFamily:'inherit',fontSize:'inherit',display:'inline-flex',alignItems:'center',gap:4,color:'inherit'}}
            >
              Resources
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{transition:'transform 0.15s',transform:openResources?'rotate(180deg)':'none'}}>
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            {openResources && (
              <div style={{position:'absolute',top:'calc(100% + 12px)',left:'50%',transform:'translateX(-50%)',background:'#fff',border:'1px solid var(--border)',borderRadius:'var(--radius-lg)',padding:8,minWidth:280,boxShadow:'0 12px 32px rgba(0,0,0,0.08)',zIndex:100}}>
                {resourceLinks.map(r => (
                  <a key={r.id} href={r.href} style={{display:'block',padding:'12px 14px',borderRadius:'var(--radius-md)',textDecoration:'none',transition:'background 0.15s'}} onMouseEnter={e => e.currentTarget.style.background='var(--sg-off-white)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                    <div style={{fontSize:14,fontWeight:600,color:'var(--fg1)',marginBottom:2}}>{r.label}</div>
                    <div style={{fontSize:12,color:'var(--fg3)'}}>{r.desc}</div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>
        <div className="nav-right">
          <a href="build.html" className="btn btn-sm btn-secondary desktop-only" style={{borderColor:'var(--sg-blue)',color:'var(--sg-blue)'}}>Build your ERP</a>
          <button className="btn btn-sm btn-secondary desktop-only" onClick={onLoginClick}>Log in</button>
          <a href="https://calendly.com" target="_blank" rel="noopener" className="btn btn-sm btn-primary">Book a call with the founder</a>
        </div>
      </div>
    </header>
  );
}
window.Nav = Nav;
