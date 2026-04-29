function ApparelVisual() {
  return (
    <div style={{position:'relative',width:'100%',height:'100%',background:'linear-gradient(135deg, #0E0E10 0%, #181f2e 60%, #1A2540 100%)',overflow:'hidden'}}>
      <svg viewBox="0 0 400 220" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
        <defs>
          <pattern id="apxWeave" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M0 3 H6 M3 0 V6" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6"/>
          </pattern>
          <linearGradient id="apxThread" x1="0" x2="1">
            <stop offset="0" stopColor="#4A7BF7" stopOpacity="0"/>
            <stop offset="0.5" stopColor="#4A7BF7"/>
            <stop offset="1" stopColor="#4A7BF7" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="apxFabric" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4A7BF7" stopOpacity="0.45"/>
            <stop offset="1" stopColor="#4A7BF7" stopOpacity="0.05"/>
          </linearGradient>
          <linearGradient id="apxFabric2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F59E0B" stopOpacity="0.4"/>
            <stop offset="1" stopColor="#F59E0B" stopOpacity="0.05"/>
          </linearGradient>
          <linearGradient id="apxFabric3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#A78BFA" stopOpacity="0.4"/>
            <stop offset="1" stopColor="#A78BFA" stopOpacity="0.05"/>
          </linearGradient>
          <clipPath id="shirtClip">
            <path d="M 0 0 L 14 -12 L 26 -16 L 28 -10 L 38 -16 L 50 -12 L 64 0 L 56 8 L 50 4 L 50 36 L 14 36 L 14 4 L 8 8 Z"/>
          </clipPath>
        </defs>
        <rect width="400" height="220" fill="url(#apxWeave)"/>

        {/* Animated stitch lines (sewing machine feel) */}
        <line x1="0" y1="36" x2="400" y2="36" stroke="url(#apxThread)" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.2s" repeatCount="indefinite"/>
        </line>
        <line x1="0" y1="184" x2="400" y2="184" stroke="url(#apxThread)" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="0" to="16" dur="1.6s" repeatCount="indefinite"/>
        </line>

        {/* Fabric bolts unrolling on left */}
        <g transform="translate(28, 76)">
          <rect width="56" height="68" rx="3" fill="url(#apxFabric)" stroke="rgba(74,123,247,0.4)" strokeWidth="1"/>
          <line x1="0" y1="14" x2="56" y2="14" stroke="rgba(74,123,247,0.3)"/>
          <line x1="0" y1="28" x2="56" y2="28" stroke="rgba(74,123,247,0.3)"/>
          <line x1="0" y1="42" x2="56" y2="42" stroke="rgba(74,123,247,0.3)"/>
          <line x1="0" y1="56" x2="56" y2="56" stroke="rgba(74,123,247,0.3)"/>
          <text x="28" y="82" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)" fontWeight="700" letterSpacing="0.1em">FABRIC</text>
        </g>
        <g transform="translate(92, 86)">
          <rect width="48" height="58" rx="3" fill="url(#apxFabric2)" stroke="rgba(245,158,11,0.4)" strokeWidth="1"/>
          <line x1="0" y1="12" x2="48" y2="12" stroke="rgba(245,158,11,0.3)"/>
          <line x1="0" y1="24" x2="48" y2="24" stroke="rgba(245,158,11,0.3)"/>
          <line x1="0" y1="36" x2="48" y2="36" stroke="rgba(245,158,11,0.3)"/>
          <line x1="0" y1="48" x2="48" y2="48" stroke="rgba(245,158,11,0.3)"/>
        </g>
        <g transform="translate(148, 96)">
          <rect width="40" height="48" rx="3" fill="url(#apxFabric3)" stroke="rgba(167,139,250,0.4)" strokeWidth="1"/>
          <line x1="0" y1="10" x2="40" y2="10" stroke="rgba(167,139,250,0.3)"/>
          <line x1="0" y1="20" x2="40" y2="20" stroke="rgba(167,139,250,0.3)"/>
          <line x1="0" y1="30" x2="40" y2="30" stroke="rgba(167,139,250,0.3)"/>
        </g>

        {/* Thread lines flowing from fabrics to shirts (production flow) */}
        <g stroke="#4A7BF7" strokeWidth="0.8" fill="none" opacity="0.45">
          <path d="M 188 110 Q 230 90 270 78" strokeDasharray="3 3">
            <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.5s" repeatCount="indefinite"/>
          </path>
          <path d="M 188 120 Q 240 130 290 130" strokeDasharray="3 3">
            <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.8s" repeatCount="indefinite"/>
          </path>
          <path d="M 188 130 Q 250 160 300 178" strokeDasharray="3 3">
            <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.4s" repeatCount="indefinite"/>
          </path>
        </g>

        {/* Three finished shirts on hangers (representing 3 streams) */}
        {[
          { x: 264, y: 60, color: '#4A7BF7', label: 'CMT' },
          { x: 286, y: 116, color: '#F59E0B', label: 'BRAND' },
          { x: 296, y: 162, color: '#A78BFA', label: 'TRADE' },
        ].map((s, i) => (
          <g key={i} transform={`translate(${s.x}, ${s.y})`}>
            {/* hanger hook */}
            <line x1="32" y1="-4" x2="32" y2="-12" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
            <circle cx="32" cy="-14" r="2" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
            {/* shirt */}
            <g>
              <path d="M 0 0 L 14 -12 L 26 -16 L 28 -10 L 38 -16 L 50 -12 L 64 0 L 56 8 L 50 4 L 50 36 L 14 36 L 14 4 L 8 8 Z" fill={s.color} fillOpacity="0.75" stroke={s.color} strokeWidth="1"/>
              <path d="M 22 -10 Q 32 -6 42 -10" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8"/>
              {/* button placket */}
              <line x1="32" y1="-4" x2="32" y2="32" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6"/>
              <circle cx="32" cy="6"  r="0.8" fill="rgba(255,255,255,0.6)"/>
              <circle cx="32" cy="14" r="0.8" fill="rgba(255,255,255,0.6)"/>
              <circle cx="32" cy="22" r="0.8" fill="rgba(255,255,255,0.6)"/>
              <text x="32" y="52" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.55)" fontWeight="700" letterSpacing="0.12em">{s.label}</text>
            </g>
          </g>
        ))}

        {/* Top label */}
        <g transform="translate(20, 18)">
          <text fontSize="9" fontWeight="700" letterSpacing="0.16em" fill="rgba(255,255,255,0.55)">APPAREL MANUFACTURING · CONFIDENTIAL</text>
        </g>

        {/* Bottom stats strip */}
        <g transform="translate(0, 200)">
          <rect width="400" height="20" fill="rgba(0,0,0,0.4)"/>
          <text x="20" y="13" fontSize="10" fontWeight="700" fill="#fff">80–100k<tspan fill="rgba(255,255,255,0.5)" fontWeight="400"> shirts/mo</tspan></text>
          <text x="140" y="13" fontSize="10" fontWeight="700" fill="#fff">30+<tspan fill="rgba(255,255,255,0.5)" fontWeight="400"> locations</tspan></text>
          <text x="240" y="13" fontSize="10" fontWeight="700" fill="#fff">3<tspan fill="rgba(255,255,255,0.5)" fontWeight="400"> streams</tspan></text>
          <text x="320" y="13" fontSize="10" fontWeight="700" fill="#fff">20+<tspan fill="rgba(255,255,255,0.5)" fontWeight="400"> job workers</tspan></text>
        </g>
      </svg>
    </div>
  );
}
window.ApparelVisual = ApparelVisual;

function FounderStory() {
  return (
    <section className="section section-alt" id="founder">
      <div className="container">
        <Reveal>
          <div className="founder-text" style={{maxWidth:780}}>
            <div className="tag">BUILT BY OPERATORS</div>
            <blockquote>We built a $30M manufacturing business. Survived two ERP failures. Ended up on Google Sheets.</blockquote>
            <p className="body">SimpleGrid exists because we were the customer first. Multiple factories, 400-person workforce. We know what breaks when your system can't keep up.</p>
            <p className="body">We lead every deployment personally. You deal with our team - not a sales team, not a chatbot.</p>
            <p className="body">SimpleGrid is what came out of all that - built the way operators actually run a plant. The next two sections are how we think about it, and how it works in practice.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
window.FounderStory = FounderStory;

function ProofSection() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="tag" style={{textAlign:'center'}}>CASE STUDIES</div>
          <h2 className="h2" style={{textAlign:'center'}}>Manufacturers running on SimpleGrid today.</h2>
          <p className="lead" style={{maxWidth:920,margin:'0 auto 40px',textAlign:'center'}}>Two public deployments below. More running confidentially - names available on request.</p>
        </Reveal>
        <div className="proof-grid">
          {[
            { kind: 'image', img: 'url(assets/elite-factory.jpeg) center/cover', name: 'Elite Arts & Crafts', desc: 'Furniture exporter. 600–800 employees. ~1 million sq ft. Excel + group chats → live ERP.', stats: '64 tracked · 72 triggers · 21 days', quote: '"SimpleGrid feels like our system. My stores manager was comfortable on day one."', attr: '- Chirag, Founder', link: 'case-elite.html', anchor: 'How Elite deployed in 21 days' },
            { kind: 'apparel', name: 'Apex Apparel', desc: 'Apparel manufacturer · 80–100k shirts/mo. 3 streams. 20+ job workers. 30+ inventory locations. Live in 12 days.', stats: '34 tracked · 44 triggers · 12 days', quote: '"Working demo in 24 hours - 60–70% accurate. No vendor we\'ve worked with has done that."', attr: '- Founder, Apex Apparel (confidential)', link: 'case-apex.html', anchor: 'How Apex went live in 12 days' },
          ].map((c,i) => (
            <Reveal key={i} delay={i * 150}>
              <a href={c.link} className="proof-card" style={{height:'100%',display:'block',textDecoration:'none',color:'inherit',transition:'all 160ms var(--ease-standard)'}}
                 onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; }}
                 onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                <div className="proof-img" style={c.kind === 'image' ? {background:c.img,height:220, position:'relative'} : {height:220, padding: 0, overflow: 'hidden'}}>
                  {c.kind === 'image' && (
                    <span style={{
                      position:'absolute', top:10, left:10,
                      background:'rgba(0,0,0,0.65)', color:'#fff',
                      fontSize:10, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase',
                      padding:'4px 8px', borderRadius:4, backdropFilter:'blur(4px)',
                    }}>● Actual shot</span>
                  )}
                  {c.kind === 'apparel' && <ApparelVisual />}
                </div>
                <div className="proof-body">
                  <h3>{c.name}</h3>
                  <p>{c.desc}</p>
                  <div className="proof-stats">{c.stats}</div>
                  <div className="proof-quote">{c.quote}<div className="proof-attr">{c.attr}</div></div>
                  <span className="btn btn-ghost btn-sm" style={{paddingLeft:0,color:'var(--sg-blue)',fontWeight:600,pointerEvents:'none'}}>{c.anchor} →</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:36}}>
          <a href="case-studies.html" style={{fontSize:14,fontWeight:600,color:'var(--sg-blue)',textDecoration:'none'}}>See both deployments side by side →</a>
        </div>
      </div>
    </section>
  );
}
window.ProofSection = ProofSection;

function Integrations() {
  // Add more entries to this array - the marquee will pick them up automatically.
  const items = [
    { name: 'Gmail', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/></svg>' },
    { name: 'Outlook', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><rect width="24" height="24" rx="4" fill="#0078D4"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="13">O</text></svg>' },
    { name: 'Tally', svg: '<svg viewBox="0 0 40 40" width="24" height="24"><rect width="40" height="40" rx="6" fill="#263238"/><text x="20" y="26" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="16">T</text></svg>' },
    { name: 'QuickBooks', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="12" fill="#2CA01C"/><path d="M7.5 8a2 2 0 00-2 2v4a2 2 0 002 2h1V8h-1zm3-1v10h1a4 4 0 004-4v-2a4 4 0 00-4-4h-1zm2 2.5a1.5 1.5 0 011.5 1.5v2a1.5 1.5 0 01-1.5 1.5V9.5z" fill="#fff"/></svg>' },
    { name: 'Xero', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="12" fill="#13B5EA"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="13">X</text></svg>' },
    { name: 'Stripe', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><rect width="24" height="24" rx="4" fill="#635BFF"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="13">S</text></svg>' },
    { name: 'Zoho', svg: '<svg viewBox="0 0 40 40" width="24" height="24"><rect width="40" height="40" rx="6" fill="#D0312D"/><text x="20" y="26" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="12">ZOHO</text></svg>' },
    { name: 'Excel', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><rect width="24" height="24" rx="4" fill="#107C41"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="11">XL</text></svg>' },
    { name: 'Google Sheets', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" fill="#0F9D58"/><path d="M14 2v6h6" fill="#0B7B47"/><rect x="7" y="11" width="10" height="8" rx="1" fill="#fff"/><line x1="7" y1="14" x2="17" y2="14" stroke="#0F9D58" stroke-width="0.8"/><line x1="7" y1="17" x2="17" y2="17" stroke="#0F9D58" stroke-width="0.8"/><line x1="10.5" y1="11" x2="10.5" y2="19" stroke="#0F9D58" stroke-width="0.8"/><line x1="14" y1="11" x2="14" y2="19" stroke="#0F9D58" stroke-width="0.8"/></svg>' },
    { name: 'Shopify', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><rect width="24" height="24" rx="4" fill="#96BF48"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="11">S</text></svg>' },
    { name: 'WooCommerce', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><rect width="24" height="24" rx="4" fill="#7F54B3"/><text x="12" y="15" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="9">WC</text></svg>' },
    { name: 'Mailchimp', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><rect width="24" height="24" rx="4" fill="#FFE01B"/><text x="12" y="16" text-anchor="middle" fill="#241C15" font-family="sans-serif" font-weight="700" font-size="13">M</text></svg>' },
    { name: 'Klaviyo', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><rect width="24" height="24" rx="4" fill="#000"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="13">K</text></svg>' },
    { name: 'ShipStation', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><rect width="24" height="24" rx="4" fill="#0099FF"/><path d="M6 9 L12 6.5 L18 9 L18 15.5 L12 18 L6 15.5 Z" fill="none" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/><line x1="6" y1="9" x2="12" y2="11.5" stroke="#fff" stroke-width="1.4"/><line x1="18" y1="9" x2="12" y2="11.5" stroke="#fff" stroke-width="1.4"/><line x1="12" y1="11.5" x2="12" y2="18" stroke="#fff" stroke-width="1.4"/></svg>' },
    { name: 'PostgreSQL', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="12" fill="#336791"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="10">Pg</text></svg>' },
    { name: 'Amazon', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><rect width="24" height="24" rx="4" fill="#232F3E"/><text x="12" y="14" text-anchor="middle" fill="#FF9900" font-family="sans-serif" font-weight="700" font-size="11">a</text><path d="M6.5 17 Q 12 19.5 17.5 17" fill="none" stroke="#FF9900" stroke-width="1.4" stroke-linecap="round"/></svg>' },
    { name: 'Braze', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><rect width="24" height="24" rx="4" fill="#FE5832"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="13">B</text></svg>' },
    { name: 'Bill.com', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><rect width="24" height="24" rx="4" fill="#006FFF"/><text x="12" y="15" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="9">BILL</text></svg>' },
    { name: 'TikTok Shop', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><rect width="24" height="24" rx="4" fill="#000"/><text x="12" y="16" text-anchor="middle" fill="#FE2C55" font-family="sans-serif" font-weight="700" font-size="11">TT</text></svg>' },
    { name: 'SFTP', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><rect width="24" height="24" rx="4" fill="#4A5568"/><text x="12" y="15" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="9">SFTP</text></svg>' },
    { name: '+ Build custom', custom: true, svg: '<svg viewBox="0 0 24 24" width="24" height="24"><rect width="24" height="24" rx="4" fill="none" stroke="#4A7BF7" stroke-width="1.5" stroke-dasharray="3 2"/><line x1="12" y1="7" x2="12" y2="17" stroke="#4A7BF7" stroke-width="2" stroke-linecap="round"/><line x1="7" y1="12" x2="17" y2="12" stroke="#4A7BF7" stroke-width="2" stroke-linecap="round"/></svg>' },
  ];
  // Duplicate the list so the loop is seamless when the track translates by -50%.
  const doubled = [...items, ...items];
  return (
    <section className="section" id="integrations">
      <style dangerouslySetInnerHTML={{__html:`
        .int-marquee{overflow:hidden;padding:6px 0;mask-image:linear-gradient(90deg,transparent 0%,black 6%,black 94%,transparent 100%);-webkit-mask-image:linear-gradient(90deg,transparent 0%,black 6%,black 94%,transparent 100%);margin-top:24px}
        .int-track{display:flex;gap:14px;width:max-content;animation:int-roll 38s linear infinite}
        .int-marquee:hover .int-track{animation-play-state:paused}
        .int-marquee .int-card{flex:0 0 150px}
        .int-marquee .int-card-custom{border:1px dashed var(--sg-blue);background:rgba(74,123,247,0.04)}
        .int-marquee .int-card-custom .int-name{color:var(--sg-blue)}
        @keyframes int-roll{from{transform:translateX(0)}to{transform:translateX(calc(-50% - 7px))}}
        @media(prefers-reduced-motion:reduce){.int-track{animation:none}}
      `}}/>
      <div className="container">
        <Reveal>
          <div className="tag">INTEGRATIONS</div>
          <h2 className="h2">Works with what you already use.</h2>
          <p className="lead">Connects to the tools your team already uses. New integrations built on request.</p>
        </Reveal>
      </div>
      <Reveal delay={200}>
        <div className="int-marquee">
          <div className="int-track">
            {doubled.map((ig,i) => (
              <div key={i} className={'int-card' + (ig.custom ? ' int-card-custom' : '')} aria-hidden={i >= items.length ? 'true' : undefined}>
                <div className="int-icon" dangerouslySetInnerHTML={{__html: ig.svg}}></div>
                <div className="int-name">{ig.name}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
      <div className="container">
        <div style={{textAlign:'center',marginTop:24,fontSize:13,color:'var(--fg2)',lineHeight:1.6,maxWidth:560,margin:'24px auto 0'}}>
          Don't see yours? Email <a href="mailto:hello@simplegrid.ai?subject=Integration%20request%20%E2%80%94%20SimpleGrid&body=Hi%20SimpleGrid%2C%0D%0A%0D%0AWe%27d%20like%20SimpleGrid%20to%20integrate%20with%3A%20%5Btool%20name%5D%0D%0A%0D%0ABrief%20note%20on%20what%20we%20need%3A%0D%0A%5BWhat%20it%20syncs%2C%20how%20often%2C%20any%20auth%20notes%5D%0D%0A%0D%0AThanks%21" style={{color:'var(--sg-blue)',fontWeight:600,textDecoration:'underline'}}>hello@simplegrid.ai</a> with a brief note on what you need - we'll add it.
        </div>
      </div>
    </section>
  );
}
window.Integrations = Integrations;

function DataSecurity() {
  return (
    <section className="section section-alt" id="security">
      <div className="container">
        <Reveal>
          <div className="tag">DATA SECURITY</div>
          <h2 className="h2">Your data stays yours.</h2>
        </Reveal>
        <div className="sec-grid">
          {[
            { badge: 'ARCHITECTURE', color: 'var(--sg-purple)', t: 'Multi-tenant isolation', p: 'Every client gets their own database. Shared platform, completely separate data. Like an apartment building - shared infrastructure, your own lock, your own walls. No client can ever see another\'s data.' },
            { badge: 'IN PROGRESS', color: 'var(--sg-blue)', t: 'SOC 2 compliance', p: 'Independent auditors verifying our security controls, data handling, and availability. Not just our word - third-party certification.' },
            { badge: 'IN PROGRESS', color: 'var(--sg-green)', t: 'GDPR compliance', p: 'Encrypted at rest and in transit. You control what\'s stored. Full export or deletion on request.' },
          ].map((s,i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="sec-card" style={{height:'100%'}}>
                <div className="sec-badge" style={{color:s.color}}>{s.badge}</div>
                <h3>{s.t}</h3>
                <p>{s.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
window.DataSecurity = DataSecurity;

function Architecture() {
  const cols = [
    { t: 'One permanent record', b: 'Every action recorded once. Can never be changed. Your audit trail isn\'t a feature - it\'s how the system is built.' },
    { t: 'Configuration, not code', b: 'AI writes a configuration. Platform reads it and generates forms, workflows, rules, dashboards. Change config, system changes instantly.' },
    { t: 'Every rule is a row', b: 'Approval above $10K? One row. QC before dispatch? One row. No code. No deployment cycle.' },
  ];
  return (
    <section className="section section-dark">
      <div className="container">
        <Reveal>
          <div className="tag" style={{color:'rgba(255,255,255,0.4)'}}>WHY 7 DAYS IS POSSIBLE</div>
          <h2 className="h2">The architecture.</h2>
        </Reveal>
        <div className="arch-grid" style={{marginTop:28}}>
          {cols.map((c,i) => (
            <Reveal key={i} delay={i * 100}><div className="arch-col"><h3>{c.t}</h3><p>{c.b}</p></div></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Architecture = Architecture;

function ComparisonTable() {
  const rows = [
    { label: 'Deploy time', sap: '18+ months', epicor: '9–12 months', qb: 'Instant', sg: 'Days' },
    { label: 'Cost to start', sap: '$500K+', epicor: '$150K–$300K', qb: 'Free', sg: '$0' },
    { label: 'Customization', sap: 'Months + consultants', epicor: 'Months + devs', qb: 'Breaks at scale', sg: 'Minutes' },
    { label: 'Floor staff UX', sap: 'Complex menus', epicor: 'Complex forms', qb: 'Formulas', sg: 'Plain English' },
    { label: 'Try before paying', sap: 'No', epicor: 'Limited', qb: 'N/A', sg: '30 days, live data' },
  ];
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="tag">COMPARE</div>
          <h2 className="h2">How it stacks up.</h2>
        </Reveal>
        <Reveal delay={200}>
          <div style={{overflowX:'auto'}}>
            <table className="compare-table">
              <thead><tr><th></th><th>SAP / Oracle</th><th>Epicor / Plex</th><th>QuickBooks + Excel</th><th>SimpleGrid</th></tr></thead>
              <tbody>
                {rows.map((r,i) => (
                  <tr key={i}><td style={{fontWeight:600,color:'var(--fg1)'}}>{r.label}</td><td>{r.sap}</td><td>{r.epicor}</td><td>{r.qb}</td><td>{r.sg}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
window.ComparisonTable = ComparisonTable;

function FinalCTA() {
  return (
    <section className="section section-dark final-cta">
      <div className="container">
        <Reveal>
          <h2 className="h2">Deploy in days. Decide in 30.</h2>
          <p className="sub">We build it at our cost. You run it with your team. Doesn't work? Walk away.</p>
          <a href="https://cal.com/simplegrid-ai" data-cal-link="simplegrid-ai" data-cal-config='{"theme":"light"}' onMouseEnter={() => { if (typeof loadCal === 'function') loadCal(); }} onClick={(e) => { e.preventDefault(); if (typeof loadCal === 'function') loadCal(); if (typeof window.Cal === 'function') window.Cal('modal', { calLink: 'simplegrid-ai', config: { theme: 'light' } }); }} className="btn btn-lg btn-primary">Book a call</a>
          <p className="note">No commitment. Migration included. Founder-led onboarding.</p>
        </Reveal>
      </div>
    </section>
  );
}
window.FinalCTA = FinalCTA;
