function RadialBurst({ theme = 'dark' }) {
  // Visual spec (strict):
  //   - Background: radial gradient #D6E4FF (inner, bottom-center) → #FFFFFF (outer)
  //   - 100 thin lines (1–1.5px) radiating from bottom-center in upper 180° arc
  //   - All lines blue: lerp from #2956C4 (deep) to #4A7BF7 (SimpleGrid blue)
  //   - Per-line opacity 30–80%, with shorter lines more opaque, longer more transparent
  //   - Tip nodes 2–4px, #2956C4 at 60–90% opacity
  //   - Animation: subtle "breathing" - opacity oscillates over a 4–8s period
  //   - No particles, no fireworks, no orange/purple/yellow
  //   - <5% CPU, requestAnimationFrame
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame, resizeTimeout;
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

    const W = () => canvas.width / dpr();
    const H = () => canvas.height / dpr();

    // Build the static line set once (and re-seed on resize)
    let lines = [];
    const seed = () => {
      lines = [];
      const COUNT = 100;
      for (let i = 0; i < COUNT; i++) {
        // Angle in upper 180° arc: -π (left) to 0 (right), with -π/2 = straight up
        const a = -Math.PI + Math.random() * Math.PI;
        // Length: 40–90% of canvas height
        const lenRatio = 0.4 + Math.random() * 0.5;
        // tone 0 = deep blue #2956C4, 1 = SimpleGrid blue #4A7BF7
        const tone = Math.random();
        // shorter lines are more opaque (depth effect) - bumped from 0.3–0.8
        // to 0.45–0.95 so the burst reads as eye-catching, not whispery.
        const baseAlpha = 0.95 - (lenRatio - 0.4) * 0.5 / 0.5 * 0.5; // ~0.45–0.95

        // Breathing oscillation: opacity sways over a 3–6s period
        const phase = Math.random() * Math.PI * 2;
        const period = 3 + Math.random() * 3;
        const freq = (Math.PI * 2) / (period * 60);

        // Angle sway: gently rotate this line by ±0.04 rad (~2.3°) over 8–14s
        const swayPhase = Math.random() * Math.PI * 2;
        const swayPeriod = 8 + Math.random() * 6;
        const swayFreq = (Math.PI * 2) / (swayPeriod * 60);
        const swayAmp = 0.025 + Math.random() * 0.025; // 0.025–0.05 rad

        // Length sway: lines also extend/contract by ±2% over a slow period
        const lenPhase = Math.random() * Math.PI * 2;
        const lenPeriod = 6 + Math.random() * 6;
        const lenFreq = (Math.PI * 2) / (lenPeriod * 60);

        // Twinkle: ~1 in 8 lines occasionally brightens its tip node
        const twinkles = Math.random() < 0.12;
        const twinklePhase = Math.random() * Math.PI * 2;
        const twinklePeriod = 4 + Math.random() * 5;
        const twinkleFreq = (Math.PI * 2) / (twinklePeriod * 60);

        const lw = 1 + Math.random() * 0.5;
        const nodeSize = 2 + Math.random() * 2;
        lines.push({
          a, lenRatio, tone, baseAlpha,
          phase, freq,
          swayPhase, swayFreq, swayAmp,
          lenPhase, lenFreq,
          twinkles, twinklePhase, twinkleFreq,
          lw, nodeSize,
        });
      }
    };
    seed();

    const onResize = () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(() => { resize(); }, 150); };
    window.addEventListener('resize', onResize);

    // Two palettes - picked at draw time so the burst recolors when theme flips.
    // Dark: deep #3461D1 → medium-blue #6E97FF (saturated, both clearly blue)
    // Light: deep blue #2956C4 → SG blue #4A7BF7 (visible on white)
    const lineRGBA = (tone, alpha) => {
      let r, g, b;
      if (theme === 'light') {
        r = Math.round(41 + (74 - 41) * tone);
        g = Math.round(86 + (123 - 86) * tone);
        b = Math.round(196 + (247 - 196) * tone);
      } else {
        r = Math.round(52 + (110 - 52) * tone);
        g = Math.round(97 + (151 - 97) * tone);
        b = Math.round(209 + (255 - 209) * tone);
      }
      return `rgba(${r},${g},${b},${alpha})`;
    };
    // Tip-node base RGB switches on theme too - saturated SG blue on dark
    const nodeRGB = theme === 'light' ? '41,86,196' : '74,123,247';
    const haloRGB = theme === 'light' ? '74,123,247' : '110,151,255';

    let frame = 0;
    const draw = () => {
      const w = W(), h = H();
      const cx = w / 2;
      const cy = h + 4; // origin slightly off the bottom edge so the seed point is hidden
      ctx.clearRect(0, 0, w, h);

      lines.forEach(l => {
        // Breathing on opacity (±15% - visible but soft)
        const breath = 0.85 + 0.15 * Math.sin(frame * l.freq + l.phase);
        const alpha = l.baseAlpha * breath;

        // Sway: angle drifts ±swayAmp over the sway period
        const angleNow = l.a + l.swayAmp * Math.sin(frame * l.swayFreq + l.swayPhase);

        // Length sway: ±2% length oscillation
        const lenMul = 1 + 0.02 * Math.sin(frame * l.lenFreq + l.lenPhase);
        const len = h * l.lenRatio * lenMul;

        const x = cx + Math.cos(angleNow) * len;
        const y = cy + Math.sin(angleNow) * len;

        // Line: gradient from origin (transparent) → tip (full color)
        const g = ctx.createLinearGradient(cx, cy, x, y);
        g.addColorStop(0, lineRGBA(l.tone, 0));
        g.addColorStop(0.5, lineRGBA(l.tone, alpha * 0.45));
        g.addColorStop(1, lineRGBA(l.tone, alpha));
        ctx.strokeStyle = g;
        ctx.lineWidth = l.lw;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Tip node base: bright on dark - light blue/white, modulated by breath
        let nodeAlpha = 0.7 + 0.3 * breath;
        let nodeRadius = l.nodeSize;

        // Twinkle: a small subset of nodes pulse brighter on a slow cycle
        if (l.twinkles) {
          const t = (Math.sin(frame * l.twinkleFreq + l.twinklePhase) + 1) * 0.5; // 0..1
          const twinkleStrength = Math.pow(t, 3); // sharp peak, soft trough
          nodeAlpha = Math.min(1, nodeAlpha + twinkleStrength * 0.3);
          nodeRadius = l.nodeSize * (1 + twinkleStrength * 0.7);
          // Soft halo for the twinkle peak
          if (twinkleStrength > 0.3) {
            ctx.fillStyle = `rgba(${haloRGB},${twinkleStrength * 0.22})`;
            ctx.beginPath();
            ctx.arc(x, y, nodeRadius * 2.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.fillStyle = `rgba(${nodeRGB},${nodeAlpha})`;
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      frame++;
      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', onResize);
    };
  }, [theme]);

  // Fade burst toward the top so it stays subtly behind the hero copy.
  const mask = 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,1) 88%)';
  const backdrop = theme === 'light'
    ? 'radial-gradient(ellipse 85% 65% at 50% 100%, #D6E4FF 0%, rgba(214,228,255,0.55) 35%, #FFFFFF 70%)'
    : 'radial-gradient(ellipse 80% 65% at 50% 100%, rgba(74,123,247,0.18) 0%, rgba(74,123,247,0.06) 35%, rgba(0,0,0,0) 70%)';
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      background: backdrop,
    }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
    </div>
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
    const numLines = 36;
    // Diagonal flow: each line is a wave that drifts up-and-right across the canvas.
    // Lines tilt slightly so the whole field reads diagonal, not horizontal.
    const TILT = 0.18; // slope: ~10° tilt

    const draw = () => {
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < numLines; i++) {
        const ratio = i / numLines;
        // Spread base y from -15% to 105% so the diagonal field covers the section
        const yBase = h * (-0.15 + ratio * 1.20);
        const amp = 16 + ratio * 36;
        const freq = 0.0032 + ratio * 0.0010;
        const phase = t * 0.0015 + i * 0.060;

        ctx.beginPath();
        for (let x = -32; x <= w + 32; x += 5) {
          const wave1 = Math.sin(x * freq + phase) * amp;
          const wave2 = Math.cos(x * freq * 0.55 - phase * 1.15 + i * 0.04) * amp * 0.4;
          // Diagonal tilt - wave centerline rises as x increases
          const y = yBase - x * TILT + wave1 + wave2;
          if (x <= -28) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // All-blue palette - vary lightness only, no purple/magenta accents
        const accent = (i + 2) % 9 === 0;
        // hue 220 = SimpleGrid blue family
        const hue = accent ? 224 : 218 + (i % 5) * 1.5;
        const sat = accent ? 75 : 60;
        const light = accent ? 52 : 64 + (i % 3) * 2;
        const peak = 1 - Math.abs(ratio - 0.5) * 1.3;
        const alpha = 0.10 + Math.max(0, peak) * 0.22;

        ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`;
        ctx.lineWidth = accent ? 0.9 : 0.65;
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
  const [theme, setTheme] = React.useState(() => {
    try { return localStorage.getItem('sg_hero_theme') || 'light'; } catch { return 'light'; }
  });
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('sg_hero_theme', next); } catch {}
  };
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
    <section className={'hero' + (theme === 'light' ? ' hero-light' : '')}>
      <button
        type="button"
        className="hero-theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
            Light
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            Dark
          </>
        )}
      </button>
      <RadialBurst theme={theme} />
      <div className="container">
        <div className="hero-inner">
          <div>
            <Reveal>
              <h1 className="hero-title">You don't adapt to the system.<br/>The system adapts to you.</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="hero-sub">Your factory runs differently from every other factory. That's not a problem - it's what makes you competitive. We build a custom ERP around your exact process, at our expense, and have you live in days. You only pay once you decide it works.</p>
            </Reveal>
            <Reveal delay={400}>
              <div className="hero-cta">
                <button type="button" onClick={() => setShowInvite(true)} className="btn btn-lg btn-invite" style={{boxShadow:'0 0 0 0 rgba(74,123,247,0.45), 0 6px 20px rgba(74,123,247,0.18)',animation:'sgBuildPulse 1.8s ease-in-out infinite'}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{marginRight:2}} aria-hidden="true">
                    <path d="M12 2l2.39 5.84L20 10l-5.61 2.16L12 18l-2.39-5.84L4 10l5.61-2.16L12 2z" fill="currentColor"/>
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
                <span style={{fontSize:24,color:'var(--fg3)',marginLeft:14,fontWeight:500,letterSpacing:'normal'}}>days</span>
              </div>
              <div style={{fontSize:13,color:'var(--fg2)',marginTop:8}}>Industry average: 547 days. <span style={{color:'var(--sg-blue)',fontWeight:700}}>SimpleGrid: 7</span>.</div>
              <div style={{fontSize:10,color:'var(--fg3)',marginTop:6,fontStyle:'italic',lineHeight:1.4}}>Source: Panorama Consulting 2024 ERP Report - 18-month median for mid-market.</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:1,marginTop:28,background:'var(--border)',borderRadius:10,overflow:'hidden'}}>
                {[{n:'$0',l:'Cost to start'},{n:'30',l:'Day free trial'},{n:'2',l:'Industries deployed'}].map((s,i) => (
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
          if (step >= 7) clearInterval(t);
        }, 800);
        return () => clearInterval(t);
      }
    }, { threshold: 0.3 });
    if (chatRef.current) observer.observe(chatRef.current);
    return () => observer.disconnect();
  }, []);

  const problems = [
    {
      n: '01', t: 'You pay before you ever see what works', b: 'Six figures, often before you see a working screen. Three possible systems come out. You only find out which one you got after the cheque clears.',
      footer: 'With SimpleGrid, you see and use it first. Then you pay.',
      visual: (
        <svg viewBox="0 0 400 200" style={{width:'100%',height:'auto',display:'block'}}>
          <defs>
            <radialGradient id="sgHoleCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000" stopOpacity="1"/>
              <stop offset="55%" stopColor="#0F1419" stopOpacity="1"/>
              <stop offset="100%" stopColor="#1F2937" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="sgHoleHalo" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="#DC2A3D" stopOpacity="0"/>
              <stop offset="80%" stopColor="#DC2A3D" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#DC2A3D" stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* Money inflows - five labeled $ chips with curved trails into the hole */}
          {[
            { y: 18,  label: 'Consultants',     dy: 76,  delay: '0s'   },
            { y: 50,  label: 'Integrations',    dy: 44,  delay: '0.3s' },
            { y: 82,  label: 'Licensing cost',  dy: 12,  delay: '0.6s' },
            { y: 114, label: 'Delays',          dy: -20, delay: '0.9s' },
            { y: 146, label: 'Change requests', dy: -52, delay: '1.2s' },
          ].map((it, i) => (
            <g key={i}>
              {/* Curved dashed trail from chip start to hole center */}
              <path d={`M 32 ${it.y + 6} Q 90 ${it.y + 6} 178 100`} fill="none" stroke="#DC2A3D" strokeWidth="1" strokeDasharray="2 4" strokeOpacity="0.3"/>
              {/* Static label */}
              <text x="38" y={it.y - 2} fontSize="10.5" fill="#374151" fontWeight="600">{it.label}</text>
              {/* Animated $ chip flowing into the hole */}
              <g style={{animation:`sg-suck-${i} 4s ${it.delay} ease-in infinite`, transformOrigin:'0 0'}}>
                <rect x="10" y={it.y} width="22" height="14" rx="3" fill="#DC2A3D"/>
                <text x="21" y={it.y + 11} fontSize="10" fill="#fff" fontWeight="700" textAnchor="middle">$</text>
              </g>
            </g>
          ))}

          {/* Black hole halo + core (centered at 178, 100) */}
          <circle cx="178" cy="100" r="62" fill="url(#sgHoleHalo)" style={{animation:'sg-halo 3s ease-in-out infinite'}}/>
          <g style={{transformOrigin:'178px 100px',animation:'sg-spin 9s linear infinite'}}>
            <ellipse cx="178" cy="100" rx="46" ry="11" fill="none" stroke="rgba(220,42,61,0.35)" strokeWidth="1"/>
            <ellipse cx="178" cy="100" rx="46" ry="11" fill="none" stroke="rgba(220,42,61,0.22)" strokeWidth="1" transform="rotate(45 178 100)"/>
            <ellipse cx="178" cy="100" rx="46" ry="11" fill="none" stroke="rgba(220,42,61,0.18)" strokeWidth="1" transform="rotate(90 178 100)"/>
            <ellipse cx="178" cy="100" rx="46" ry="11" fill="none" stroke="rgba(220,42,61,0.18)" strokeWidth="1" transform="rotate(135 178 100)"/>
          </g>
          <circle cx="178" cy="100" r="36" fill="url(#sgHoleCore)"/>
          <text x="178" y="98" fontSize="13" fill="#fff" fontWeight="700" textAnchor="middle" letterSpacing="0.02em">$500K+</text>
          <text x="178" y="112" fontSize="8.5" fill="rgba(255,255,255,0.55)" fontWeight="700" textAnchor="middle" letterSpacing="0.18em">SUNK</text>

          {/* Output side - three possible outcomes branching from the hole.
              Two-line labels (line 1 + "system" on line 2) keep "system" readable
              inside the 400-wide viewBox even with the longest sub. */}
          {[
            { y: 36,  l1: 'No usable',     l2: 'system', color: '#DC2A3D', sub: 'project shelved' },
            { y: 100, l1: 'Half-working',  l2: 'system', color: '#F59E0B', sub: 'forced into modules' },
            { y: 164, l1: 'Fully working', l2: 'system', color: '#10B981', sub: 'rare, slow, expensive' },
          ].map((o, i) => (
            <g key={i}>
              {/* Branching dashed arrow from hole right edge to flat tail */}
              <path d={`M 214 100 Q 232 ${(100 + o.y) / 2} 244 ${o.y} L 268 ${o.y}`} fill="none" stroke={o.color} strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.85"/>
              <polygon points={`274,${o.y} 266,${o.y - 4} 266,${o.y + 4}`} fill={o.color}/>
              <text x="280" y={o.y - 4} fontSize="11" fill={o.color} fontWeight="700">{o.l1}</text>
              <text x="280" y={o.y + 8} fontSize="11" fill={o.color} fontWeight="700">{o.l2}</text>
              <text x="280" y={o.y + 20} fontSize="9" fill="#6B7280" fontStyle="italic">{o.sub}</text>
            </g>
          ))}

          <style>{`
            @keyframes sg-suck-0 { 0%,5%{transform:translate(0,0);opacity:1} 70%{transform:translate(146px,76px) scale(0.3);opacity:0} 100%{transform:translate(146px,76px) scale(0.3);opacity:0} }
            @keyframes sg-suck-1 { 0%,5%{transform:translate(0,0);opacity:1} 70%{transform:translate(146px,44px) scale(0.3);opacity:0} 100%{transform:translate(146px,44px) scale(0.3);opacity:0} }
            @keyframes sg-suck-2 { 0%,5%{transform:translate(0,0);opacity:1} 70%{transform:translate(146px,12px) scale(0.3);opacity:0} 100%{transform:translate(146px,12px) scale(0.3);opacity:0} }
            @keyframes sg-suck-3 { 0%,5%{transform:translate(0,0);opacity:1} 70%{transform:translate(146px,-20px) scale(0.3);opacity:0} 100%{transform:translate(146px,-20px) scale(0.3);opacity:0} }
            @keyframes sg-suck-4 { 0%,5%{transform:translate(0,0);opacity:1} 70%{transform:translate(146px,-52px) scale(0.3);opacity:0} 100%{transform:translate(146px,-52px) scale(0.3);opacity:0} }
            @keyframes sg-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
            @keyframes sg-halo { 0%,100%{opacity:0.55} 50%{opacity:1} }
          `}</style>
        </svg>
      )
    },
    {
      n: '02', t: 'Your business evolves. Your ERP does not.', b: 'Every small change = 6-week consulting project.',
      footer: 'SimpleGrid bends to your process. Most systems lock you in mid-growth.',
      visual: (
        <svg viewBox="0 0 400 200" style={{width:'100%',height:'auto',display:'block'}}>
          <text x="20" y="50" fontSize="13" fill="var(--fg1)" fontWeight="600">Your business with a fluid ERP</text>
          <rect x="20" y="62" width="360" height="20" rx="10" fill="#E5E8ED"/>
          <rect x="20" y="62" width="360" height="20" rx="10" fill="#10B981" style={{transformOrigin:'20px 72px',animation:'sg-grow-b 3s ease-out infinite'}}/>
          <text x="370" y="76" fontSize="11" fill="#fff" fontWeight="700" textAnchor="end" style={{opacity:0,animation:'sg-fade-b 3s ease-out infinite'}}>Scales</text>
          <text x="20" y="124" fontSize="13" fill="var(--fg1)" fontWeight="600">Your business with a rigid ERP</text>
          <rect x="20" y="136" width="360" height="20" rx="10" fill="#E5E8ED"/>
          <rect x="20" y="136" width="180" height="20" rx="10" fill="#DC2A3D" style={{transformOrigin:'20px 146px',animation:'sg-grow-c 3s ease-out infinite'}}/>
          <text x="214" y="150" fontSize="11" fill="#DC2A3D" fontWeight="700">← Growth Stalls</text>
          <style>{`@keyframes sg-grow-b{0%{transform:scaleX(0)}60%,100%{transform:scaleX(1)}}@keyframes sg-grow-c{0%{transform:scaleX(0)}50%,100%{transform:scaleX(1)}}@keyframes sg-fade-b{0%,60%{opacity:0}75%,100%{opacity:1}}`}</style>
        </svg>
      )
    },
    {
      n: '03', t: 'UI built for accountants, not operators', b: 'Seven tabs. Twelve fields. Nothing gets done.',
      footer: 'The ERP slows the floor, so teams go around it.',
      visual: (
        <svg viewBox="0 0 400 200" style={{width:'100%',height:'auto',display:'block'}}>
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
      n: '04', t: 'You cannot change how 100 people work', b: 'So your ERP has to work like they already do.',
      footer: 'If they can text, they can use this.',
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
              <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:'var(--radius-lg)',padding:24,height:'100%',display:'flex',flexDirection:'column'}}>
                <div style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:14}}>
                  <div style={{fontFamily:'var(--font-heading)',fontSize:22,fontWeight:700,color:'var(--sg-red)',letterSpacing:'-0.02em'}}>{p.n}</div>
                  <h3 style={{fontFamily:'var(--font-heading)',fontSize:17,fontWeight:700,color:'var(--fg1)',margin:0,letterSpacing:'-0.01em',lineHeight:1.3}}>{p.t}</h3>
                </div>
                <p style={{fontSize:13,color:'var(--fg2)',lineHeight:1.5,margin:'0 0 14px'}}>{p.b}</p>
                <div className={'problem-visual' + (p.isChatDemo ? ' problem-visual-chat' : ' problem-visual-svg')}>
                  {p.isChatDemo ? (
                    <div style={{width:'100%',fontFamily:'var(--font-mono)',fontSize:13.5,lineHeight:1.7}}>
                      <div style={{color:'var(--fg3)',fontSize:11,marginBottom:10,fontFamily:'var(--font-body)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase'}}>Warehouse manager types:</div>
                      <div style={{color:'var(--fg1)',opacity:activeChatStep>=1?1:0.2,transition:'opacity 0.3s'}}>&gt; Received 2200cft of material from West Elm</div>
                      <div style={{color:'var(--sg-green)',marginTop:6,opacity:activeChatStep>=2?1:0.2,transition:'opacity 0.3s'}}>✓ PO matched. Inventory updated.</div>
                      <div style={{marginTop:14,paddingTop:12,borderTop:'1px dashed var(--border)',color:'var(--fg3)',fontSize:11,marginBottom:8,fontFamily:'var(--font-body)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',opacity:activeChatStep>=3?1:0.2,transition:'opacity 0.3s'}}>Sales drops a PDF in chat:</div>
                      <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'6px 10px',border:'1px solid var(--border)',borderRadius:8,background:'#fff',opacity:activeChatStep>=3?1:0.2,transition:'opacity 0.3s'}}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--sg-red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <span style={{color:'var(--fg1)',fontSize:12}}>SO_4521_WestElm.pdf</span>
                      </div>
                      <div style={{color:'var(--sg-green)',marginTop:8,opacity:activeChatStep>=4?1:0.2,transition:'opacity 0.3s'}}>✓ AI parsed. 23 line items matched to BOM.</div>
                      <div style={{color:'var(--sg-blue)',marginTop:4,opacity:activeChatStep>=5?1:0.2,transition:'opacity 0.3s'}}>→ Routed to founder for approval.</div>
                      <div style={{marginTop:12,fontFamily:'var(--font-body)',fontSize:13,color:'var(--fg3)',fontStyle:'italic',opacity:activeChatStep>=6?1:0.2,transition:'opacity 0.3s'}}>No training. Same habit as texting.</div>
                    </div>
                  ) : p.visual}
                </div>
                {p.footer && (
                  <div style={{marginTop:'auto'}}>
                    <div style={{marginTop:14,paddingTop:14,borderTop:'1px solid var(--border)',fontFamily:'var(--font-body)',fontSize:14,fontWeight:700,color:'var(--sg-blue)',lineHeight:1.4}}>{p.footer}</div>
                  </div>
                )}
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
  const sonarRef = React.useRef(null);

  // Sonar canvas: concentric rings expanding from center, fading as they grow.
  // All color is pulled live from --sg-blue (the brand accent) so the canvas
  // tracks the design system rather than hardcoding a hex.
  React.useEffect(() => {
    const canvas = sonarRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue('--sg-blue').trim() || '#4A7BF7';

    const RING_LIFE_MS = 5500;
    const SPAWN_INTERVAL_MS = 1000;
    const rings = [];
    let raf, w = 0, h = 0, dpr = 1, lastSpawn = -SPAWN_INTERVAL_MS, cancelled = false;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const ro = (typeof ResizeObserver !== 'undefined') ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(canvas);
    window.addEventListener('resize', resize);

    function frame(now) {
      if (cancelled) return;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) * 0.62;

      if (now - lastSpawn >= SPAWN_INTERVAL_MS) {
        rings.push({ born: now });
        lastSpawn = now;
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        const t = (now - rings[i].born) / RING_LIFE_MS;
        if (t >= 1) { rings.splice(i, 1); continue; }
        const r = t * maxR;
        const eased = 1 - t;
        ctx.globalAlpha = eased * eased * 0.4;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Soft center halo
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <>
    <section className="section section-dark sg-onboard" style={{position:'relative',overflow:'hidden',paddingTop:40,paddingBottom:48}}>
      {/* Background grid with radial fade at the edges. Uses color-mix on
          --sg-blue so it tracks the brand accent without hardcoding a hex. */}
      <div className="sg-onboard-grid" aria-hidden="true" style={{
        position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage:
          'linear-gradient(color-mix(in srgb, var(--sg-blue) 10%, transparent) 1px, transparent 1px),'+
          'linear-gradient(90deg, color-mix(in srgb, var(--sg-blue) 10%, transparent) 1px, transparent 1px)',
        backgroundSize:'48px 48px',
        WebkitMaskImage:'radial-gradient(ellipse at center, #000 25%, transparent 75%)',
        maskImage:'radial-gradient(ellipse at center, #000 25%, transparent 75%)',
      }}/>

      <div className="container" style={{position:'relative',zIndex:2,maxWidth:920,margin:'0 auto'}}>
        <Reveal>
          <div style={{textAlign:'center'}}>
            {/* Kicker: pulsing dot + label */}
            <div style={{display:'inline-flex',alignItems:'center',gap:10,marginBottom:10}}>
              <span aria-hidden="true" className="sg-kicker-dot" style={{display:'inline-block',width:8,height:8,borderRadius:'50%',background:'var(--sg-blue)'}}/>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(255,255,255,0.62)'}}>Selective Onboarding</span>
            </div>

            {/* Headline */}
            <h2 className="h2 sg-onboard-h" style={{maxWidth:780,margin:'0 auto 8px',lineHeight:1.1,letterSpacing:'-0.025em'}}>
              We'd love to onboard everyone.<br/>
              We just <span style={{color:'var(--sg-blue)'}}>can't - yet.</span>
            </h2>

            {/* Subtext */}
            <p style={{fontSize:15,color:'rgba(255,255,255,0.6)',lineHeight:1.55,maxWidth:640,margin:'0 auto 22px'}}>
              Our founder personally builds and deploys every system. We run tight to keep the experience exceptional.
            </p>
          </div>
        </Reveal>

        {/* Sonar viz area */}
        <Reveal delay={150}>
          <div className="sg-sonar-area" style={{position:'relative',height:240,marginBottom:22}}>
            <canvas ref={sonarRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',display:'block'}}/>
            {/* Center label */}
            <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%, calc(-50% + 26px))',textAlign:'center',pointerEvents:'none'}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(255,255,255,0.55)'}}>3 slots open</div>
            </div>
            {/* Build tags */}
            <div className="sg-build-tag sg-build-tag-l" style={{position:'absolute',top:'24%',left:'4%'}}>
              <span aria-hidden="true" className="sg-build-tag-dot"/>
              <span style={{fontFamily:'var(--font-mono)',fontSize:12,fontWeight:600,color:'#fff'}}>build_014</span>
              <span style={{fontSize:11,color:'rgba(255,255,255,0.55)',marginTop:3}}>furniture mfg · day 5</span>
            </div>
            <div className="sg-build-tag sg-build-tag-r" style={{position:'absolute',top:'62%',right:'4%'}}>
              <span aria-hidden="true" className="sg-build-tag-dot"/>
              <span style={{fontFamily:'var(--font-mono)',fontSize:12,fontWeight:600,color:'#fff'}}>build_015</span>
              <span style={{fontSize:11,color:'rgba(255,255,255,0.55)',marginTop:3}}>apparel d2c · day 2</span>
            </div>
          </div>
        </Reveal>

        {/* Promise card */}
        <Reveal delay={200}>
          <div style={{border:'1px solid rgba(255,255,255,0.12)',borderRadius:'var(--radius-lg)',padding:'14px 20px',background:'rgba(255,255,255,0.03)',maxWidth:760,margin:'0 auto 16px'}}>
            <p style={{fontSize:14,color:'rgba(255,255,255,0.78)',lineHeight:1.6,margin:0}}>
              If we take you on, we build a custom ERP around <strong style={{color:'#fff',fontWeight:700}}>how your operation actually runs</strong>. You run it for 30 days. If it doesn't earn its keep, walk away. <strong style={{color:'#fff',fontWeight:700}}>No contract. No invoice.</strong>
            </p>
          </div>
        </Reveal>

        {/* Stats row */}
        <Reveal delay={260}>
          <div className="sg-onboard-stats" style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:1,background:'rgba(255,255,255,0.10)',border:'1px solid rgba(255,255,255,0.10)',borderRadius:'var(--radius-lg)',overflow:'hidden',maxWidth:520,margin:'0 auto 18px'}}>
            {[
              {n:'7d',l:'Time to live'},
              {n:'30d',l:'Free trial'},
              {n:'$0',l:'To start'},
            ].map((s,i) => (
              <div key={i} className="sg-onboard-stat" style={{padding:'12px 12px',textAlign:'center'}}>
                <div style={{fontFamily:'var(--font-heading)',fontSize:24,fontWeight:700,color:'var(--sg-blue)',letterSpacing:'-0.02em',lineHeight:1}}>{s.n}</div>
                <div style={{fontSize:10,color:'rgba(255,255,255,0.55)',textTransform:'uppercase',letterSpacing:'0.14em',fontWeight:600,marginTop:4}}>{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* CTA - matches the hero CTA shape: outline blue with subtle pulse + sparkle */}
        <Reveal delay={320}>
          <div style={{textAlign:'center'}}>
            <button type="button" onClick={() => setShowInvite(true)} className="btn btn-lg btn-invite"
              style={{boxShadow:'0 0 0 0 rgba(74,123,247,0.45), 0 6px 20px rgba(74,123,247,0.22)',animation:'sgBuildPulse 1.8s ease-in-out infinite'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{marginRight:2}} aria-hidden="true">
                <path d="M12 2l2.39 5.84L20 10l-5.61 2.16L12 18l-2.39-5.84L4 10l5.61-2.16L12 2z" fill="currentColor"/>
              </svg>
              Request an Invite
            </button>
            <div style={{fontSize:10,color:'rgba(255,255,255,0.42)',marginTop:10,letterSpacing:'0.18em',textTransform:'uppercase',fontWeight:600}}>
              We reply within 24 hours · Select partners only
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .sg-kicker-dot {
          position: relative;
          box-shadow: 0 0 0 0 var(--sg-blue);
          animation: sgKickerPulse 2s ease-in-out infinite;
        }
        @keyframes sgKickerPulse {
          0%   { box-shadow: 0 0 0 0 color-mix(in srgb, var(--sg-blue) 55%, transparent); }
          70%  { box-shadow: 0 0 0 10px color-mix(in srgb, var(--sg-blue) 0%, transparent); }
          100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--sg-blue) 0%, transparent); }
        }

        .sg-build-tag {
          display: inline-flex;
          flex-direction: column;
          gap: 2px;
          padding: 12px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: var(--radius-md);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 3;
        }
        .sg-build-tag-dot {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--sg-green);
          box-shadow: 0 0 0 0 var(--sg-green);
          animation: sgBuildDotPulse 1.8s ease-in-out infinite;
        }
        @keyframes sgBuildDotPulse {
          0%   { box-shadow: 0 0 0 0 color-mix(in srgb, var(--sg-green) 60%, transparent); }
          70%  { box-shadow: 0 0 0 8px color-mix(in srgb, var(--sg-green) 0%, transparent); }
          100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--sg-green) 0%, transparent); }
        }

        .sg-onboard-stat {
          background: var(--sg-black);
          transition: background 200ms var(--ease-standard, ease);
        }
        .sg-onboard-stat:hover { background: rgba(74,123,247,0.08); }

        .sg-onboard-cta {
          appearance: none;
          background: transparent;
          border: 1px solid var(--sg-blue);
          color: var(--sg-blue);
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          padding: 11px 24px;
          border-radius: 999px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: transform 180ms var(--ease-standard, ease), background 180ms var(--ease-standard, ease), box-shadow 180ms var(--ease-standard, ease);
        }
        .sg-onboard-cta:hover {
          background: color-mix(in srgb, var(--sg-blue) 12%, transparent);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px color-mix(in srgb, var(--sg-blue) 25%, transparent);
        }
        .sg-onboard-cta .sg-cta-arrow {
          display: inline-block;
          transition: transform 180ms var(--ease-standard, ease);
        }
        .sg-onboard-cta:hover .sg-cta-arrow { transform: translateX(4px); }

        .sg-onboard .sg-onboard-h { font-size: 34px; }

        @media (max-width: 720px) {
          .sg-onboard { padding-top: 32px !important; padding-bottom: 40px !important; }
          .sg-onboard .sg-onboard-h { font-size: 26px; }
          .sg-build-tag { display: none !important; }
          .sg-sonar-area { height: 200px !important; margin-bottom: 18px !important; }
          .sg-onboard-stats { grid-template-columns: 1fr !important; max-width: 300px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sg-kicker-dot, .sg-build-tag-dot { animation: none !important; }
        }
      `}</style>
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
      body: "A real 3-hour conversation with our founder. We map your core workflows.",
      title: "A live video call with the founder.",
      details: [
        { kind: 'p', text: "Day 1 is a 3-hour live video call with Mukund - our founder, not a sales rep, not an SDR. We walk through your operations end-to-end: how orders come in, who approves what, your production stages, vendor relationships, QC rules, dispatch, and the exceptions every floor has." },
        { kind: 'p', text: "Bring whoever should be in the room - your COO, plant manager, a couple of floor leads. The more voices, the sharper the model. We map your core workflows live on the call, asking the questions only an operator would think to ask." },
        { kind: 'list', items: [
          "Live video call (Zoom or Google Meet - whichever you prefer).",
          "3 hours, broken into operations blocks: orders, planning, production, QC, dispatch, accounts.",
          "We take notes in real time - you'll have them within an hour of the call.",
          "Confidential by default. We sign a confidentiality agreement before the call if needed.",
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
        { kind: 'p', text: "Most deployments go live within 7-21 days, depending on how much custom configuration your operation needs. Day 4-7 is migration, integration, and go-live. We pull from your existing ERP, accounting tool, email, and any CSV exports. Integrations turn on - your accounting, your inbox, your shipping platform." },
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
        { kind: 'p', text: "“Received 50 units red oak from Acme.” → System parses, matches the PO, updates inventory, fires triggers, confirms. Hank, our AI assistant, sits in the same chat ready for queries: “What's our cash position by buyer?” “Did the QC reject for Hampton go back?”" },
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
