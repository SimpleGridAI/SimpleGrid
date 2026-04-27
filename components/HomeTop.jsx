function RadialBurst() {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame, lines = [], particles = [], resizeTimeout;
    let mouseX = -9999, mouseY = -9999;
    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr();
      canvas.height = rect.height * dpr();
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr(), 0, 0, dpr(), 0, 0);
    };
    resize();
    const onResize = () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(resize, 150); };
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onLeave = () => { mouseX = -9999; mouseY = -9999; };
    window.addEventListener('resize', onResize);
    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', onLeave);

    const W = () => canvas.width / dpr();
    const H = () => canvas.height / dpr();

    // ----- Radial rays -----
    const spawnRay = (preExisting) => {
      const a = -Math.PI + Math.random() * Math.PI;
      const maxLen = 280 + Math.random() * 360;
      const speed = 0.35 + Math.random() * 0.45;
      const v = Math.random();
      let hue, sat, light;
      if (v < 0.12) { hue = 220; sat = 14; light = 38; }
      else if (v < 0.25) { hue = 218; sat = 32; light = 60; }
      else { hue = 215 + Math.random() * 18; sat = 60 + Math.random() * 18; light = 70 + Math.random() * 8; }
      lines.push({
        a,
        len: preExisting ? Math.random() * maxLen : 0,
        maxLen, speed, hue, sat, light,
        life: preExisting ? 0.55 + Math.random() * 0.45 : 1,
      });
    };

    // ----- Ambient floating particles (depth + life) -----
    const spawnParticle = (preExisting) => {
      const v = Math.random();
      let hue, sat, light;
      if (v < 0.18) { hue = 280 + Math.random() * 22; sat = 70; light = 70; }
      else { hue = 210 + Math.random() * 22; sat = 70; light = 74; }
      particles.push({
        x: Math.random() * W(),
        y: preExisting ? Math.random() * H() : H() + 20,
        size: 0.6 + Math.random() * 2.0,
        hue, sat, light,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -(0.20 + Math.random() * 0.45),
        age: preExisting ? Math.random() * 200 : 0,
        maxAge: 320 + Math.random() * 280,
      });
    };

    for (let i = 0; i < 200; i++) spawnRay(true);
    for (let i = 0; i < 90; i++) spawnParticle(true);

    let frame = 0;
    const draw = () => {
      const w = W(), h = H();
      const cx = w / 2, cy = h + 6;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.030)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
      frame++;

      if (frame % 2 === 0 && Math.random() < 0.85) spawnRay(false);
      if (frame % 4 === 0 && Math.random() < 0.7) spawnParticle(false);

      // ----- Rays -----
      lines.forEach(l => {
        if (l.len < l.maxLen) l.len = Math.min(l.len + l.speed, l.maxLen);
        else l.life -= 0.0035;
        const x = cx + Math.cos(l.a) * l.len;
        const y = cy + Math.sin(l.a) * l.len;
        const alpha = Math.max(0, l.life);
        const g = ctx.createLinearGradient(cx, cy, x, y);
        g.addColorStop(0, `hsla(${l.hue}, ${l.sat}%, ${l.light}%, 0)`);
        g.addColorStop(0.55, `hsla(${l.hue}, ${l.sat}%, ${l.light}%, ${0.10 * alpha})`);
        g.addColorStop(1, `hsla(${l.hue}, ${l.sat}%, ${l.light}%, ${0.36 * alpha})`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();
        if (l.len >= l.maxLen) {
          // Halo
          ctx.fillStyle = `hsla(${l.hue}, ${l.sat}%, ${l.light}%, ${alpha * 0.18})`;
          ctx.beginPath();
          ctx.arc(x, y, 3.6, 0, Math.PI * 2);
          ctx.fill();
          // Core
          ctx.fillStyle = `hsla(${l.hue}, ${l.sat}%, ${l.light}%, ${alpha * 0.78})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      lines = lines.filter(l => l.life > 0);
      if (lines.length > 420) lines = lines.slice(-420);

      // ----- Ambient particles -----
      particles.forEach(p => {
        p.age++;
        let lifeAlpha;
        if (p.age < 60) lifeAlpha = p.age / 60;
        else if (p.age > p.maxAge - 80) lifeAlpha = Math.max(0, (p.maxAge - p.age) / 80);
        else lifeAlpha = 1;

        // Mouse repulsion (gentle)
        if (mouseX > -500) {
          const dx = p.x - mouseX, dy = p.y - mouseY;
          const distSq = dx*dx + dy*dy;
          if (distSq < 16900 && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const f = (130 - dist) / 130;
            p.vx += (dx / dist) * f * 0.35;
            p.vy += (dy / dist) * f * 0.35;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy = p.vy * 0.96 + (-(0.18 + Math.random() * 0.06)) * 0.05;

        let edgeAlpha = 1;
        if (p.y < 90) edgeAlpha = Math.max(0, p.y / 90);
        if (p.x < 30) edgeAlpha *= Math.max(0, p.x / 30);
        else if (p.x > w - 30) edgeAlpha *= Math.max(0, (w - p.x) / 30);

        const a = lifeAlpha * edgeAlpha;
        if (a > 0.01) {
          // Halo
          ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${a * 0.18})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.6, 0, Math.PI * 2);
          ctx.fill();
          // Core
          ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${a * 0.72})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      particles = particles.filter(p => p.age < p.maxAge && p.y > -30);

      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', onResize);
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
    };
  }, []);
  const mask = 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.08) 25%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,1) 85%)';
  return (
    <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0,maskImage:mask,WebkitMaskImage:mask}} />
  );
}
window.RadialBurst = RadialBurst;

function FlowWaves() {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame, resizeTimeout;
    const dpr = () => window.devicePixelRatio || 1;
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr();
      canvas.height = rect.height * dpr();
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr(), 0, 0, dpr(), 0, 0);
    };
    resize();
    const onResize = () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(resize, 150); };
    window.addEventListener('resize', onResize);

    const W = () => canvas.width / dpr();
    const H = () => canvas.height / dpr();

    let t = 0;
    const numLines = 80;

    const draw = () => {
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < numLines; i++) {
        const ratio = i / numLines;
        const yBase = h * (0.05 + Math.pow(ratio, 0.85) * 1.05);
        const amp = 22 + ratio * 70;
        const freq = 0.0034 + ratio * 0.0014;
        const phase = t * 0.0009 + i * 0.045;

        ctx.beginPath();
        for (let x = -24; x <= w + 24; x += 4) {
          const wave1 = Math.sin(x * freq + phase) * amp;
          const wave2 = Math.cos(x * freq * 0.55 - phase * 1.2 + i * 0.03) * amp * 0.45;
          const y = yBase + wave1 + wave2;
          if (x <= -20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const accent = (i + 3) % 13 === 0;
        const hue = accent ? 295 + (i % 4) * 6 : 215 + (i % 6) * 3;
        const sat = accent ? 65 : 55;
        const light = accent ? 68 : 62;
        const alpha = 0.10 + (1 - Math.abs(ratio - 0.55) * 1.4) * 0.18;

        ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light}%, ${Math.max(0.06, alpha)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      t++;
      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return (
    <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0}} />
  );
}
window.FlowWaves = FlowWaves;

function Hero() {
  const [count, setCount] = React.useState(547);
  const [showInvite, setShowInvite] = React.useState(false);
  React.useEffect(() => {
    const target = 7, start = 547, duration = 2200, startTime = Date.now();
    const timer = setInterval(() => {
      const progress = Math.min((Date.now() - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start - (start - target) * eased));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
    <section className="hero">
      <RadialBurst />
      <div className="container">
        <div className="hero-inner">
          <div>
            <Reveal>
              <h1 className="hero-title">You don't adapt to the system.<br/>The system adapts to you.</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="hero-sub">Your factory runs differently from every other factory. That's not a problem - it's what makes you competitive. We build a custom ERP around your exact process. At our cost. In days.</p>
            </Reveal>
            <Reveal delay={400}>
              <div className="hero-cta">
                <button type="button" onClick={() => setShowInvite(true)} className="btn btn-lg btn-primary" style={{background:'linear-gradient(135deg, #2256E8 0%, #1e4dd9 100%)',boxShadow:'0 0 0 0 rgba(34,86,232,0.55), 0 6px 20px rgba(34,86,232,0.4)',animation:'sgBuildPulse 1.8s ease-in-out infinite'}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{marginRight:2}}>
                    <path d="M12 2l2.39 5.84L20 10l-5.61 2.16L12 18l-2.39-5.84L4 10l5.61-2.16L12 2z" fill="#fff"/>
                  </svg>
                  Request an Invite
                </button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={300}>
            <div style={{background:'rgba(255,255,255,0.7)',backdropFilter:'blur(6px)',WebkitBackdropFilter:'blur(6px)',border:'1px solid var(--border)',borderRadius:16,padding:32,textAlign:'center'}}>
              <div style={{fontSize:10,textTransform:'uppercase',letterSpacing:'0.16em',color:'var(--fg3)',marginBottom:8}}>Average ERP deploy time</div>
              <div style={{fontFamily:'var(--font-heading)',fontSize:80,fontWeight:700,color:'var(--fg1)',lineHeight:1,letterSpacing:'-0.04em',position:'relative'}}>
                <span>{count}</span>
                <span style={{fontSize:24,color:'var(--fg3)',marginLeft:6,fontWeight:500}}>days</span>
              </div>
              <div style={{fontSize:13,color:'var(--fg2)',marginTop:8}}>Industry average: 547 days. <span style={{color:'var(--sg-blue)',fontWeight:700}}>SimpleGrid: 7</span>.</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:1,marginTop:28,background:'var(--border)',borderRadius:10,overflow:'hidden'}}>
                {[{n:'$0',l:'Cost to start'},{n:'30',l:'Day free trial'},{n:'2',l:'Case studies live'}].map((s,i) => (
                  <div key={i} style={{background:'#FFFFFF',padding:'16px 12px'}}>
                    <div style={{fontFamily:'var(--font-heading)',fontSize:22,fontWeight:700,color:'var(--fg1)'}}>{s.n}</div>
                    <div style={{fontSize:10,color:'var(--fg3)',marginTop:2}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
    {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    </>
  );
}
window.Hero = Hero;

function ProblemSection() {
  const [activeChatStep, setActiveChatStep] = React.useState(0);
  const chatRef = React.useRef(null);
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let step = 0;
        const t = setInterval(() => {
          step++;
          setActiveChatStep(step);
          if (step >= 4) clearInterval(t);
        }, 900);
        return () => clearInterval(t);
      }
    }, { threshold: 0.3 });
    if (chatRef.current) observer.observe(chatRef.current);
    return () => observer.disconnect();
  }, []);

  const problems = [
    { 
      n: '01', t: 'Upfront cost is brutal', b: '$500K+ before you see a screen.',
      visual: (
        <svg viewBox="0 0 400 200" style={{width:'100%',height:'100%'}}>
          <line x1="40" y1="170" x2="375" y2="170" stroke="#E5E8ED" strokeWidth="2"/>
          <line x1="40" y1="170" x2="40" y2="20" stroke="#E5E8ED" strokeWidth="2"/>
          <line x1="40" y1="130" x2="375" y2="130" stroke="#F0F2F5" strokeWidth="1" strokeDasharray="3 3"/>
          <line x1="40" y1="90" x2="375" y2="90" stroke="#F0F2F5" strokeWidth="1" strokeDasharray="3 3"/>
          <line x1="40" y1="50" x2="375" y2="50" stroke="#F0F2F5" strokeWidth="1" strokeDasharray="3 3"/>
          <path d="M 50 160 Q 120 150 180 120 T 300 55 L 360 25" fill="none" stroke="#DC2A3D" strokeWidth="3.5" strokeLinecap="round" style={{strokeDasharray:500,strokeDashoffset:500,animation:'sg-dash 4s ease-in-out infinite'}}/>
          <circle cx="360" cy="25" r="6" fill="#DC2A3D" style={{animation:'sg-dot-a 4s ease-in-out infinite'}}/>
          <text x="360" y="15" fontSize="14" fill="#DC2A3D" fontWeight="700" textAnchor="end" style={{animation:'sg-dot-a 4s ease-in-out infinite'}}>$500K+</text>
          <text x="30" y="174" fontSize="10" fill="#9CA3AF" textAnchor="end">$0</text>
          <text x="30" y="134" fontSize="10" fill="#9CA3AF" textAnchor="end">$150K</text>
          <text x="30" y="94" fontSize="10" fill="#9CA3AF" textAnchor="end">$300K</text>
          <text x="30" y="54" fontSize="10" fill="#9CA3AF" textAnchor="end">$450K</text>
          <text x="45" y="188" fontSize="11" fill="#9CA3AF">Contract signed</text>
          <text x="370" y="188" fontSize="11" fill="#9CA3AF" textAnchor="end">Go-live (18 mo)</text>
          <style>{`@keyframes sg-dash{0%{stroke-dashoffset:500}60%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}@keyframes sg-dot-a{0%,50%{opacity:0}70%,100%{opacity:1}}`}</style>
        </svg>
      )
    },
    { 
      n: '02', t: 'Your business evolves. Your ERP does not.', b: 'Small change = 6-week consulting project.',
      visual: (
        <svg viewBox="0 0 400 200" style={{width:'100%',height:'100%'}}>
          <text x="20" y="38" fontSize="13" fill="var(--fg1)" fontWeight="600">Your business with a fluid ERP</text>
          <rect x="20" y="48" width="360" height="18" rx="9" fill="#E5E8ED"/>
          <rect x="20" y="48" width="360" height="18" rx="9" fill="#10B981" style={{transformOrigin:'20px 57px',animation:'sg-grow-b 3s ease-out infinite'}}/>
          <text x="370" y="61" fontSize="11" fill="#fff" fontWeight="700" textAnchor="end" style={{opacity:0,animation:'sg-fade-b 3s ease-out infinite'}}>Scales</text>
          <text x="20" y="104" fontSize="13" fill="var(--fg1)" fontWeight="600">Your business with a rigid ERP</text>
          <rect x="20" y="114" width="360" height="18" rx="9" fill="#E5E8ED"/>
          <rect x="20" y="114" width="180" height="18" rx="9" fill="#DC2A3D" style={{transformOrigin:'20px 123px',animation:'sg-grow-c 3s ease-out infinite'}}/>
          <text x="214" y="127" fontSize="11" fill="#DC2A3D" fontWeight="700">← Stuck</text>
          <text x="20" y="170" fontSize="12" fill="var(--fg2)" fontStyle="italic">SimpleGrid bends to your process.</text>
          <text x="20" y="188" fontSize="12" fill="var(--fg2)" fontStyle="italic">Others trap you mid-growth.</text>
          <style>{`@keyframes sg-grow-b{0%{transform:scaleX(0)}60%,100%{transform:scaleX(1)}}@keyframes sg-grow-c{0%{transform:scaleX(0)}50%,100%{transform:scaleX(1)}}@keyframes sg-fade-b{0%,60%{opacity:0}75%,100%{opacity:1}}`}</style>
        </svg>
      )
    },
    { 
      n: '03', t: 'UI built for accountants, not operators', b: 'Seven tabs. Twelve fields. Floor staff bounce.',
      visual: (
        <svg viewBox="0 0 400 200" style={{width:'100%',height:'100%'}}>
          <rect x="10" y="10" width="380" height="180" rx="6" fill="#fff" stroke="#E5E8ED" strokeWidth="1.5"/>
          {['Orders','Items','Stock','Vendor','QC','Tax','GL'].map((tab,i) => (
            <g key={i}>
              <rect x={14+i*52} y="14" width="48" height="20" rx="3" fill={i===0?'#F59E0B22':'#FAFBFC'} stroke="#E5E8ED" strokeWidth="0.8"/>
              <text x={38+i*52} y="27" fontSize="10" fill={i===0?'#B45309':'var(--fg2)'} textAnchor="middle" fontWeight="600">{tab}</text>
            </g>
          ))}
          <text x="20" y="52" fontSize="10" fill="var(--fg3)" fontWeight="600">REQUIRED FIELDS *</text>
          {[
            ['GL Acct','HTS Code'],
            ['Cost Center','Tax Class'],
            ['Profit Center','Doc Ref'],
            ['UOM','Ledger'],
          ].map((row,r) => (
            <g key={r}>
              <rect x="20" y={60+r*22} width="175" height="16" rx="3" fill="#FAFBFC" stroke="#E5E8ED" strokeWidth="0.8"/>
              <rect x="205" y={60+r*22} width="175" height="16" rx="3" fill="#FAFBFC" stroke="#E5E8ED" strokeWidth="0.8"/>
              <text x="26" y={71+r*22} fontSize="9" fill="#9CA3AF">{row[0]} *</text>
              <text x="211" y={71+r*22} fontSize="9" fill="#9CA3AF">{row[1]} *</text>
            </g>
          ))}
          <rect x="20" y="154" width="80" height="22" rx="4" fill="#4A7BF7"/>
          <text x="60" y="168" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="600">Submit</text>
          <rect x="108" y="154" width="80" height="22" rx="4" fill="#fff" stroke="#E5E8ED"/>
          <text x="148" y="168" fontSize="10" fill="var(--fg2)" textAnchor="middle" fontWeight="600">Cancel</text>
          <text x="370" y="172" fontSize="24" textAnchor="end" style={{animation:'sg-conf 1.5s ease-in-out infinite'}}>😵</text>
          <style>{`@keyframes sg-conf{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}</style>
        </svg>
      )
    },
    { 
      n: '04', t: 'You cannot change how 100 people work', b: 'That is why 75% of ERP projects fail.',
      visual: null,
      isChatDemo: true,
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="tag">THE PROBLEM</div>
          <h2 className="h2">Your enterprise runs differently from every other enterprise.</h2>
        </Reveal>
        <div className="problem-grid" style={{marginTop:32}} ref={chatRef}>
          {problems.map((p,i) => (
            <Reveal key={p.n} delay={i * 100}>
              <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:'var(--radius-lg)',padding:24,height:'100%'}}>
                <div style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:14}}>
                  <div style={{fontFamily:'var(--font-heading)',fontSize:22,fontWeight:700,color:'var(--sg-red)',letterSpacing:'-0.02em'}}>{p.n}</div>
                  <h3 style={{fontFamily:'var(--font-heading)',fontSize:17,fontWeight:700,color:'var(--fg1)',margin:0,letterSpacing:'-0.01em',lineHeight:1.3}}>{p.t}</h3>
                </div>
                <p style={{fontSize:13,color:'var(--fg2)',lineHeight:1.5,margin:'0 0 14px'}}>{p.b}</p>
                <div className={'problem-visual' + (p.isChatDemo ? ' problem-visual-chat' : ' problem-visual-svg')}>
                  {p.isChatDemo ? (
                    <div style={{width:'100%',fontFamily:'var(--font-mono)',fontSize:14,lineHeight:1.8}}>
                      <div style={{color:'var(--fg3)',fontSize:11,marginBottom:10,fontFamily:'var(--font-body)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase'}}>Warehouse manager types:</div>
                      <div style={{color:'var(--fg1)',opacity:activeChatStep>=1?1:0.2,transition:'opacity 0.3s'}}>&gt; Received 2200cft of material from West Elm</div>
                      <div style={{color:'var(--sg-green)',marginTop:8,opacity:activeChatStep>=2?1:0.2,transition:'opacity 0.3s'}}>✓ PO matched. Inventory updated.</div>
                      <div style={{marginTop:12,fontFamily:'var(--font-body)',fontSize:13,color:'var(--fg3)',fontStyle:'italic',opacity:activeChatStep>=3?1:0.2,transition:'opacity 0.3s'}}>No training. Same habit as texting.</div>
                    </div>
                  ) : p.visual}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
window.ProblemSection = ProblemSection;

function WhatWeDo() {
  const [showInvite, setShowInvite] = React.useState(false);
  return (
    <>
    <section className="section section-blue" style={{position:'relative',overflow:'hidden'}}>
      <FlowWaves />
      <div className="container" style={{maxWidth:880,margin:'0 auto',padding:'0 32px',position:'relative',zIndex:2}}>
        <Reveal>
          <div style={{textAlign:'center'}}>
            <div className="tag">CURRENTLY ONBOARDING</div>
            <h2 className="h2">We don't onboard everyone.<br/>A few partner slots open each cycle.</h2>
            <p style={{fontSize:16,color:'var(--fg2)',lineHeight:1.65,maxWidth:620,margin:'0 auto 22px'}}>
              We're packed with active builds right now. Every partner gets our founder to onboard.
            </p>
            <p style={{fontSize:16,color:'var(--fg2)',lineHeight:1.65,maxWidth:620,margin:'0 auto 28px'}}>
              If we take you on, we build a custom ERP around how your operation actually runs. You run it for 30 days. If it doesn't earn its keep, walk away. No contract. No invoice.
            </p>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div style={{display:'flex',justifyContent:'center',gap:14,flexWrap:'wrap',marginBottom:32}}>
            {[
              {n:'7d',l:'Time to live'},
              {n:'30d',l:'Free trial'},
              {n:'$0',l:'To start'},
            ].map((s,i) => (
              <div key={i} style={{background:'rgba(255,255,255,0.7)',backdropFilter:'blur(6px)',WebkitBackdropFilter:'blur(6px)',border:'1px solid var(--border)',borderRadius:'var(--radius-lg)',padding:'14px 22px',display:'flex',alignItems:'baseline',gap:10,minWidth:140}}>
                <span style={{fontFamily:'var(--font-heading)',fontSize:24,fontWeight:700,color:'var(--sg-blue)',letterSpacing:'-0.02em'}}>{s.n}</span>
                <span style={{fontSize:11,color:'var(--fg3)',textTransform:'uppercase',letterSpacing:'0.1em',fontWeight:600}}>{s.l}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={300}>
          <div style={{textAlign:'center'}}>
            <button type="button" onClick={() => setShowInvite(true)} className="btn btn-lg btn-primary">Request an Invite →</button>
            <div style={{fontSize:11,color:'var(--fg3)',marginTop:14,letterSpacing:'0.1em',textTransform:'uppercase',fontWeight:600}}>
              We reply within 48 hours · Selected partners only
            </div>
          </div>
        </Reveal>
      </div>
    </section>
    {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    </>
  );
}
window.WhatWeDo = WhatWeDo;

function HowItWorks() {
  const [selected, setSelected] = React.useState(null);

  const cards = [
    {
      body: "A real 3-hour conversation with our founder. We map your basic workflows.",
      title: "A live video call with the founder.",
      details: [
        { kind: 'p', text: "Day 1 is a 3-hour live video call with Mukund - our founder, not a sales rep, not an SDR. We walk through your operations end-to-end: how orders come in, who approves what, your production stages, vendor relationships, QC rules, dispatch, and the exceptions every floor has." },
        { kind: 'p', text: "Bring whoever should be in the room - your COO, plant manager, a couple of floor leads. The more voices, the sharper the model. We map your basic workflows live on the call, asking the questions only an operator would think to ask." },
        { kind: 'list', items: [
          "Live video call (Zoom or Google Meet - whichever you prefer).",
          "3 hours, broken into operations blocks: orders, planning, production, QC, dispatch, accounts.",
          "We take notes in real time - you'll have them within an hour of the call.",
          "Confidential by default. We sign your MNDA before the call if needed.",
        ] },
      ],
      visual: (
        <svg viewBox="0 0 220 160" style={{width:'100%',height:'100%'}} preserveAspectRatio="xMidYMid meet">
          <circle cx="22" cy="36" r="11" fill="#4A7BF7"/>
          <text x="22" y="40" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">F</text>
          <path d="M 36 26 L 196 26 Q 204 26 204 34 L 204 50 Q 204 58 196 58 L 44 58 L 36 64 Z" fill="rgba(74,123,247,0.10)" stroke="rgba(74,123,247,0.30)"/>
          <text x="46" y="46" fontSize="10" fill="var(--fg1)">How does QC work today?</text>
          <circle cx="198" cy="86" r="11" fill="#1A1A1A"/>
          <text x="198" y="90" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">Y</text>
          <path d="M 184 76 L 24 76 Q 16 76 16 84 L 16 100 Q 16 108 24 108 L 176 108 L 184 114 Z" fill="var(--bg-alt)" stroke="var(--border)"/>
          <text x="26" y="96" fontSize="10" fill="var(--fg1)">Foreman calls if QC fails…</text>
          <rect x="20" y="124" width="80" height="5" rx="2" fill="rgba(74,123,247,0.20)"/>
          <rect x="20" y="134" width="60" height="5" rx="2" fill="rgba(74,123,247,0.15)"/>
          <rect x="20" y="144" width="100" height="5" rx="2" fill="rgba(74,123,247,0.20)"/>
          <text x="200" y="148" fontSize="9" fill="var(--sg-blue)" textAnchor="end" fontWeight="700">3 HOURS</text>
        </svg>
      ),
    },
    {
      body: "Working demo in 24 hours, built around your operation.",
      title: "A working demo within 24 hours.",
      details: [
        { kind: 'p', text: "Within 24 hours of the call, we send you a private link. It's not slides, not a sandbox - it's a working version of your ERP, generated from the call." },
        { kind: 'p', text: "Your products, your stages, your approval rules, and your buyers are modeled in. You and your team click around: create a PO, run an order through, log a receipt, see the inventory move." },
        { kind: 'list', items: [
          "60–70% accuracy on the first pass is typical - the rest gets fixed in step 3.",
          "Private URL, sign-in protected. Only your team sees it.",
          "Works in any browser. No app installs needed.",
          "This is the moment most operators tell us, “I've never seen a vendor do this.”",
        ] },
      ],
      visual: (
        <svg viewBox="0 0 220 160" style={{width:'100%',height:'100%'}} preserveAspectRatio="xMidYMid meet">
          <rect x="14" y="14" width="192" height="132" rx="6" fill="#fff" stroke="var(--border)"/>
          <rect x="14" y="14" width="192" height="20" rx="6" fill="var(--sg-off-white)"/>
          <line x1="14" y1="34" x2="206" y2="34" stroke="var(--border)"/>
          <circle cx="22" cy="24" r="2.5" fill="#EF4444"/>
          <circle cx="32" cy="24" r="2.5" fill="#F59E0B"/>
          <circle cx="42" cy="24" r="2.5" fill="#10B981"/>
          <rect x="22" y="42" width="44" height="92" rx="3" fill="var(--bg-alt)"/>
          <rect x="28" y="50" width="32" height="5" rx="2" fill="var(--border)"/>
          <rect x="28" y="60" width="28" height="5" rx="2" fill="var(--border)"/>
          <rect x="28" y="70" width="32" height="5" rx="2" fill="rgba(74,123,247,0.5)"/>
          <rect x="28" y="80" width="24" height="5" rx="2" fill="var(--border)"/>
          <rect x="28" y="90" width="30" height="5" rx="2" fill="var(--border)"/>
          <text x="74" y="52" fontSize="8" fill="var(--sg-blue)" fontWeight="700" letterSpacing="0.06em">YOUR ERP · LIVE</text>
          <rect x="74" y="58" width="124" height="34" rx="4" fill="rgba(74,123,247,0.08)" stroke="rgba(74,123,247,0.25)"/>
          <rect x="80" y="66" width="40" height="5" rx="2" fill="var(--sg-blue)"/>
          <rect x="80" y="78" width="80" height="5" rx="2" fill="rgba(74,123,247,0.5)"/>
          <rect x="74" y="98" width="60" height="34" rx="4" fill="var(--bg-alt)" stroke="var(--border)"/>
          <rect x="138" y="98" width="60" height="34" rx="4" fill="var(--bg-alt)" stroke="var(--border)"/>
          <rect x="156" y="102" width="36" height="22" rx="11" fill="var(--sg-blue)"/>
          <text x="174" y="117" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">24h</text>
        </svg>
      ),
    },
    {
      body: "Your team reviews live. We fix what's wrong on the spot.",
      title: "Live review with your floor team.",
      details: [
        { kind: 'p', text: "Day 2-3 is a live review session with the people who'll actually use the system - operators, plant managers, QC inspectors, your accounts lead. They click through the demo while we're on the call." },
        { kind: 'p', text: "They tell us what's wrong, in their language: “The PO field is in the wrong order.” “We track shrinkage at the bin level, not SKU.” “This rule should be 75%, not 60%.” We fix it on the call. No tickets, no sprints, no waiting." },
        { kind: 'list', items: [
          "Live config changes - you watch your edits go in as we make them.",
          "Two passes if needed. Most operations need only one.",
          "By end of session, the system fits how your team actually works.",
          "This step kills 75% of ERP projects elsewhere - because nobody else does it live.",
        ] },
      ],
      visual: (
        <svg viewBox="0 0 220 160" style={{width:'100%',height:'100%'}} preserveAspectRatio="xMidYMid meet">
          <rect x="14" y="14" width="192" height="132" rx="6" fill="var(--bg-alt)" stroke="var(--border)"/>
          <rect x="22" y="22" width="80" height="6" rx="2" fill="var(--border)"/>
          <rect x="22" y="34" width="120" height="6" rx="2" fill="var(--border)"/>
          <rect x="22" y="46" width="60" height="6" rx="2" fill="var(--border)"/>
          <rect x="22" y="64" width="120" height="20" rx="3" fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.55)" strokeDasharray="3 2"/>
          <text x="28" y="77" fontSize="9" fill="#B45309" fontWeight="600">Add: foreman approval</text>
          <g transform="translate(70, 56)">
            <path d="M0 0 L0 12 L4 8 L7 14 L9 13 L6 7 L11 7 Z" fill="#4A7BF7"/>
            <rect x="11" y="-1" width="50" height="13" rx="3" fill="#4A7BF7"/>
            <text x="36" y="9" fontSize="8" fill="#fff" textAnchor="middle" fontWeight="600">Operator</text>
          </g>
          <g transform="translate(140, 100)">
            <path d="M0 0 L0 12 L4 8 L7 14 L9 13 L6 7 L11 7 Z" fill="#7C3AED"/>
            <rect x="11" y="-1" width="46" height="13" rx="3" fill="#7C3AED"/>
            <text x="34" y="9" fontSize="8" fill="#fff" textAnchor="middle" fontWeight="600">Manager</text>
          </g>
          <g transform="translate(36, 116)">
            <path d="M0 0 L0 12 L4 8 L7 14 L9 13 L6 7 L11 7 Z" fill="#10B981"/>
            <rect x="11" y="-1" width="22" height="13" rx="3" fill="#10B981"/>
            <text x="22" y="9" fontSize="8" fill="#fff" textAnchor="middle" fontWeight="600">QA</text>
          </g>
        </svg>
      ),
    },
    {
      body: "Live in 7 days with your real data, orders, and team.",
      title: "Live in production by day 7.",
      details: [
        { kind: 'p', text: "Day 4-7 is migration, integration, and go-live. We pull from your existing ERP, accounting tool, email, and any CSV exports. Integrations turn on - your accounting, your inbox, your shipping platform." },
        { kind: 'p', text: "Your team uses the system in parallel for one week, on real orders, with real money. By day 7, SimpleGrid is the source of truth. Old spreadsheets and chat threads get archived." },
        { kind: 'list', items: [
          "Migration of master data: products, customers, vendors, GL, open orders, inventory.",
          "Standard integrations included; custom ones built on request.",
          "The 30-day free trial clock starts on go-live, not on signup.",
          "If by day 30 it isn't earning its keep - walk away. No contract, no invoice, no migration cost.",
        ] },
      ],
      visual: (
        <svg viewBox="0 0 220 160" style={{width:'100%',height:'100%'}} preserveAspectRatio="xMidYMid meet">
          <line x1="14" y1="138" x2="206" y2="138" stroke="var(--border)" strokeWidth="1"/>
          {[1,2,3,4,5,6,7].map(d => {
            const x = 18 + (d-1) * 28;
            const isLast = d === 7;
            const heights = [30, 40, 50, 60, 70, 80, 100];
            const h = heights[d-1];
            return (
              <g key={d}>
                <rect x={x} y={138-h} width="20" height={h} rx="3" fill={isLast ? "var(--sg-blue)" : "var(--bg-alt)"} stroke={isLast ? "none" : "var(--border)"}/>
                <text x={x+10} y="152" fontSize="9" fill={isLast ? "var(--sg-blue)" : "var(--fg3)"} textAnchor="middle" fontWeight={isLast ? 700 : 500}>D{d}</text>
                {isLast && <text x={x+10} y={138-h+14} fontSize="8" fill="#fff" textAnchor="middle" fontWeight="700">LIVE</text>}
              </g>
            );
          })}
          <circle cx="194" cy="22" r="11" fill="#10B981" opacity="0.15"/>
          <circle cx="194" cy="22" r="6" fill="#10B981" opacity="0.3"/>
          <circle cx="194" cy="22" r="3" fill="#10B981"/>
        </svg>
      ),
    },
    {
      body: "No training. Text your factory like you text your team.",
      title: "Zero-training adoption.",
      details: [
        { kind: 'p', text: "Floor staff don't get a 50-page manual. There's nothing to learn. They text the system in plain English - same habit as iMessage, Slack, or Teams." },
        { kind: 'p', text: "“Received 50 units red oak from Acme.” → System parses, matches the PO, updates inventory, fires triggers, confirms. Hank, our AI chatbot, sits in the same chat ready for queries: “What's our cash position by buyer?” “Did the QC reject for Hampton go back?”" },
        { kind: 'list', items: [
          "5 minutes to learn - most operators are productive on day one.",
          "Works on any device: phone, tablet, browser. No app installs.",
          "Plugs into your existing Slack, Teams, or SMS - no new tool to log into.",
          "Hank reads from the events ledger, so every answer comes with a timestamp and a name.",
        ] },
      ],
      visual: (
        <svg viewBox="0 0 220 160" style={{width:'100%',height:'100%'}} preserveAspectRatio="xMidYMid meet">
          <rect x="64" y="8" width="92" height="148" rx="12" fill="var(--fg1)"/>
          <rect x="68" y="12" width="84" height="140" rx="8" fill="#FFFFFF"/>
          <rect x="68" y="12" width="84" height="14" rx="8" fill="var(--bg-alt)"/>
          <text x="110" y="22" fontSize="7" fill="var(--fg1)" textAnchor="middle" fontWeight="600">SimpleGrid</text>
          <rect x="72" y="32" width="62" height="26" rx="8" fill="#E9E9EB"/>
          <text x="76" y="42" fontSize="6" fill="var(--fg1)">Got 50 units of</text>
          <text x="76" y="50" fontSize="6" fill="var(--fg1)">red oak from Acme</text>
          <text x="76" y="58" fontSize="5" fill="var(--fg3)">10:42</text>
          <rect x="86" y="64" width="62" height="26" rx="8" fill="#007AFF"/>
          <text x="90" y="74" fontSize="6" fill="#fff" fontWeight="700">✓ PO matched</text>
          <text x="90" y="82" fontSize="6" fill="#fff">Inventory updated</text>
          <text x="142" y="90" fontSize="5" fill="var(--fg3)" textAnchor="end">Delivered</text>
          <rect x="72" y="96" width="48" height="14" rx="7" fill="#E9E9EB"/>
          <text x="76" y="105" fontSize="6" fill="var(--fg1)">Thanks!</text>
          <rect x="72" y="120" width="76" height="14" rx="7" fill="#fff" stroke="var(--border)" strokeWidth="0.5"/>
          <text x="78" y="129" fontSize="5" fill="var(--fg3)">iMessage / SMS / Slack…</text>
          <circle cx="146" cy="127" r="5" fill="#4A7BF7"/>
        </svg>
      ),
    },
  ];

  React.useEffect(() => {
    if (!selected) return;
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selected]);

  return (
    <section className="section section-alt" id="how-it-works">
      <style dangerouslySetInnerHTML={{__html:`
        .hiw-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-top:32px}
        @media(max-width:1100px){.hiw-grid{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:720px){.hiw-grid{grid-template-columns:1fr}}
        .hiw-card{background:var(--bg);border:1px solid var(--border);border-radius:14px;padding:18px;height:100%;display:flex;flex-direction:column;transition:border-color 200ms,transform 200ms,box-shadow 200ms;position:relative;text-align:left;font:inherit;color:inherit;cursor:pointer;width:100%}
        .hiw-card:hover{border-color:var(--sg-blue);transform:translateY(-2px);box-shadow:0 8px 24px rgba(74,123,247,0.10)}
        .hiw-card:hover .hiw-corner{background:var(--sg-blue);border-color:var(--sg-blue)}
        .hiw-card:hover .hiw-corner svg{stroke:#fff}
        .hiw-corner{position:absolute;top:14px;right:14px;width:26px;height:26px;border-radius:6px;background:var(--sg-off-white);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;transition:background 200ms,border-color 200ms}
        .hiw-corner svg{transition:stroke 200ms}
        .hiw-visual{height:140px;margin:36px 0 16px;display:flex;align-items:center;justify-content:center}
        .hiw-body{font-size:13.5px;line-height:1.45;color:var(--fg1);margin:auto 0 0;font-family:var(--font-heading);font-weight:600;letter-spacing:-0.005em}

        /* Modal */
        .hiw-modal{max-width:600px !important;padding:32px 36px !important;text-align:left;max-height:88vh;overflow-y:auto}
        .hiw-modal .hiw-step{font-size:11px;font-weight:700;color:var(--sg-blue);letter-spacing:0.16em;text-transform:uppercase;margin-bottom:10px}
        .hiw-modal h2{font-family:var(--font-heading);font-size:26px;font-weight:700;letter-spacing:-0.018em;line-height:1.18;color:var(--fg1);margin:0 0 14px}
        .hiw-modal .hiw-summary{font-size:15px;line-height:1.6;color:var(--fg2);margin:0 0 22px}
        .hiw-modal hr{border:none;border-top:1px solid var(--border);margin:0 0 22px}
        .hiw-modal p{font-size:14.5px;line-height:1.65;color:var(--fg2);margin:0 0 14px}
        .hiw-modal ul{margin:0 0 4px;padding-left:18px}
        .hiw-modal li{font-size:14px;line-height:1.55;color:var(--fg2);margin-bottom:8px}
        .hiw-close{position:absolute;top:14px;right:16px;background:none;border:none;font-size:24px;color:var(--fg3);cursor:pointer;line-height:1;padding:4px 8px}
        .hiw-close:hover{color:var(--fg1)}
      `}}/>
      <div className="container">
        <Reveal>
          <div className="tag">HOW IT WORKS</div>
          <h2 className="h2">From first call to a live system. 7 days.</h2>
          <p style={{fontSize:13,color:'var(--fg3)',marginTop:8,letterSpacing:'0.04em'}}>Tap any card to see how that step actually runs.</p>
        </Reveal>
        <div className="hiw-grid">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 80}>
              <button type="button" className="hiw-card" onClick={() => setSelected({ ...c, num: i + 1 })} aria-label={`Step ${i+1}: ${c.title}`}>
                <span className="hiw-corner" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--fg3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 9 3 3 9 3"></polyline>
                    <polyline points="21 15 21 21 15 21"></polyline>
                  </svg>
                </span>
                <div className="hiw-visual">{c.visual}</div>
                <p className="hiw-body">{c.body}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {selected && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
          <div className="modal hiw-modal" role="dialog" aria-modal="true" aria-labelledby="hiw-modal-title">
            <button type="button" className="hiw-close" onClick={() => setSelected(null)} aria-label="Close">×</button>
            <div className="hiw-step">Step {String(selected.num).padStart(2, '0')}</div>
            <h2 id="hiw-modal-title">{selected.title}</h2>
            <p className="hiw-summary">{selected.body}</p>
            <hr/>
            {selected.details.map((d, i) => {
              if (d.kind === 'p') return <p key={i}>{d.text}</p>;
              if (d.kind === 'list') return (
                <ul key={i}>
                  {d.items.map((it, j) => <li key={j}>{it}</li>)}
                </ul>
              );
              return null;
            })}
          </div>
        </div>
      )}
    </section>
  );
}
window.HowItWorks = HowItWorks;
