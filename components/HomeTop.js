function RadialBurst({
  theme = 'dark'
}) {
  // Visual spec (strict):
  //   - Background: radial gradient #D6E4FF (inner, bottom-center) → #FFFFFF (outer)
  //   - 100 thin lines (1-1.5px) radiating from bottom-center in upper 180° arc
  //   - All lines blue: lerp from #2956C4 (deep) to #4A7BF7 (SimpleGrid blue)
  //   - Per-line opacity 30-80%, with shorter lines more opaque, longer more transparent
  //   - Tip nodes 2-4px, #2956C4 at 60-90% opacity
  //   - Animation: subtle "breathing" - opacity oscillates over a 4-8s period
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
      // Slightly fewer rays on phones - same visual density on a smaller canvas,
      // ~40% less per-frame canvas work.
      const COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 100;
      for (let i = 0; i < COUNT; i++) {
        // Angle in upper 180° arc: -π (left) to 0 (right), with -π/2 = straight up
        const a = -Math.PI + Math.random() * Math.PI;
        // Length: 40-90% of canvas height
        const lenRatio = 0.4 + Math.random() * 0.5;
        // tone 0 = deep blue #2956C4, 1 = SimpleGrid blue #4A7BF7
        const tone = Math.random();
        // shorter lines are more opaque (depth effect) - bumped from 0.3-0.8
        // to 0.45-0.95 so the burst reads as eye-catching, not whispery.
        const baseAlpha = 0.95 - (lenRatio - 0.4) * 0.5 / 0.5 * 0.5; // ~0.45-0.95

        // Breathing oscillation: opacity sways over a 3-6s period
        const phase = Math.random() * Math.PI * 2;
        const period = 3 + Math.random() * 3;
        const freq = Math.PI * 2 / (period * 60);

        // Angle sway: gently rotate this line by ±0.04 rad (~2.3°) over 8-14s
        const swayPhase = Math.random() * Math.PI * 2;
        const swayPeriod = 8 + Math.random() * 6;
        const swayFreq = Math.PI * 2 / (swayPeriod * 60);
        const swayAmp = 0.025 + Math.random() * 0.025; // 0.025-0.05 rad

        // Length sway: lines also extend/contract by ±2% over a slow period
        const lenPhase = Math.random() * Math.PI * 2;
        const lenPeriod = 6 + Math.random() * 6;
        const lenFreq = Math.PI * 2 / (lenPeriod * 60);

        // Twinkle: ~1 in 8 lines occasionally brightens its tip node
        const twinkles = Math.random() < 0.12;
        const twinklePhase = Math.random() * Math.PI * 2;
        const twinklePeriod = 4 + Math.random() * 5;
        const twinkleFreq = Math.PI * 2 / (twinklePeriod * 60);
        const lw = 1 + Math.random() * 0.5;
        const nodeSize = 2 + Math.random() * 2;
        lines.push({
          a,
          lenRatio,
          tone,
          baseAlpha,
          phase,
          freq,
          swayPhase,
          swayFreq,
          swayAmp,
          lenPhase,
          lenFreq,
          twinkles,
          twinklePhase,
          twinkleFreq,
          lw,
          nodeSize
        });
      }
    };
    seed();
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
      }, 150);
    };
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

    // Pause loop when canvas scrolls off-screen or the tab is hidden so we don't
    // keep burning CPU drawing 100 lines/frame for nothing.
    let isVisible = true;
    let isTabActive = typeof document !== 'undefined' ? !document.hidden : true;
    const onVisibility = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibility);
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, {
      threshold: 0
    });
    if (canvas) observer.observe(canvas);
    let frame = 0;
    const draw = () => {
      if (!isVisible || !isTabActive) {
        animFrame = requestAnimationFrame(draw);
        return;
      }
      const w = W(),
        h = H();
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
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
    };
  }, [theme]);

  // Fade burst toward the top so it stays subtly behind the hero copy.
  const mask = 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,1) 88%)';
  const backdrop = theme === 'light' ? 'radial-gradient(ellipse 85% 65% at 50% 100%, #D6E4FF 0%, rgba(214,228,255,0.55) 35%, #FFFFFF 70%)' : 'radial-gradient(ellipse 80% 65% at 50% 100%, rgba(74,123,247,0.18) 0%, rgba(74,123,247,0.06) 35%, rgba(0,0,0,0) 70%)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      background: backdrop
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      maskImage: mask,
      WebkitMaskImage: mask
    }
  }));
}
window.RadialBurst = RadialBurst;
function CycleHeadline() {
  // Static hero headline - no rotation.
  return /*#__PURE__*/React.createElement("h1", {
    className: "hero-title"
  }, "Custom ERP. Built at our risk.", /*#__PURE__*/React.createElement("br", null), "Paid for after it works.");
}
function Hero() {
  const count = 7;
  const cost = 0;
  const [showInvite, setShowInvite] = React.useState(false);
  const [theme, setTheme] = React.useState(() => {
    try {
      return localStorage.getItem('sg_hero_theme') || 'light';
    } catch {
      return 'light';
    }
  });
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('sg_hero_theme', next);
    } catch {}
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: 'hero' + (theme === 'light' ? ' hero-light' : '')
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hero-theme-toggle",
    onClick: toggleTheme,
    "aria-label": theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  }, theme === 'dark' ? /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
  })) : /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
  }))), /*#__PURE__*/React.createElement(RadialBurst, {
    theme: theme
  }), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-inner"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(CycleHeadline, null)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("p", {
    className: "hero-sub"
  }, "We don't sell software. We build a custom ERP modelled on how your factory actually runs - your stages, your contractors, your approvals, your costing logic.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 400
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-cta"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "data-cta": "hero",
    className: "btn btn-lg btn-invite",
    style: {
      boxShadow: '0 0 0 0 rgba(74,123,247,0.45), 0 6px 20px rgba(74,123,247,0.18)',
      animation: 'sgBuildPulse 1.8s ease-in-out infinite'
    },
    onClick: () => {
      setShowInvite(true);
      if (window.sgTrack) window.sgTrack('cta_clicked', {location: 'hero'});
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      marginRight: 2
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2l2.39 5.84L20 10l-5.61 2.16L12 18l-2.39-5.84L4 10l5.61-2.16L12 2z",
    fill: "currentColor"
  })), "Request an invite")))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 300
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-box",
    style: {
      background: 'rgba(255,255,255,0.7)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      padding: 32,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.16em',
      color: 'var(--fg2)',
      marginBottom: 10
    }
  }, "Try Before You Buy"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 80,
      fontWeight: 700,
      color: 'var(--fg1)',
      lineHeight: 1,
      letterSpacing: '-0.04em',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", null, 30), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24,
      color: 'var(--fg3)',
      marginLeft: 14,
      fontWeight: 500,
      letterSpacing: 'normal'
    }
  }, "Days")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--fg2)',
      marginTop: 14,
      lineHeight: 1.5
    }
  }, "On your real floor. Real team. Real orders."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      paddingTop: 28,
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.16em',
      color: 'var(--fg2)',
      marginBottom: 10
    }
  }, "You Carry"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 80,
      fontWeight: 700,
      color: 'var(--sg-blue)',
      lineHeight: 1,
      letterSpacing: '-0.04em',
      position: 'relative'
    }
  }, "$", cost.toLocaleString()), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--fg2)',
      marginTop: 14,
      lineHeight: 1.5
    }
  }, "Until you see it run. If it doesn't move the business, you walk."))))))), showInvite && /*#__PURE__*/React.createElement(InviteModal, {
    onClose: () => setShowInvite(false)
  }));
}
window.Hero = Hero;

// "Integrates with" running marquee shown between the hero and the
// problem section. Single-color brand glyphs (Simple Icons paths,
// CC0) + label, list duplicated so the CSS keyframe loops seamlessly.
function IntegrationsBar() {
  // Brand SVGs use full inline markup so multi-color marks (Slack, Gmail, Amazon, Google Sheets) render accurately.
  const items = [
    { name: 'WhatsApp', svg: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="#25D366" d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0c3.181 0 6.167 1.24 8.413 3.488a11.821 11.821 0 0 1 3.48 8.414c-.003 6.556-5.338 11.891-11.893 11.891-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.711.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>' },
    { name: 'Slack', svg: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/><path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/><path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/><path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/></svg>' },
    { name: 'Gmail', svg: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M22.288 1.5H1.712C.768 1.5 0 2.268 0 3.212v17.575C0 21.732.768 22.5 1.712 22.5H4.5V10.045L12 14.795l7.5-4.75V22.5h2.788c.944 0 1.712-.768 1.712-1.712V3.212c0-.944-.768-1.712-1.712-1.712z" fill="#FFFFFF"/><path d="M4.5 22.5V10.045L0 7.045v13.742C0 21.732.768 22.5 1.712 22.5H4.5z" fill="#4285F4"/><path d="M22.288 1.5L12 8.045 1.712 1.5C.768 1.5 0 2.268 0 3.212v3.833l12 7.75 12-7.75V3.212c0-.944-.768-1.712-1.712-1.712z" fill="#EA4335"/><path d="M19.5 22.5h2.788c.944 0 1.712-.768 1.712-1.712V7.045L19.5 10.045V22.5z" fill="#34A853"/><path d="M0 7.045v.001l4.5 3v-.001L0 7.045zM24 7.045v.001l-4.5 3v-.001L24 7.045z" fill="#C5221F"/><path d="M24 3.212v3.833l-4.5 3V10.045L12 14.795 4.5 10.045 0 7.045V3.212C0 2.268.768 1.5 1.712 1.5h.788L12 8.045 21.5 1.5h.788C23.232 1.5 24 2.268 24 3.212z" fill="#FBBC04"/></svg>' },
    { name: 'Excel', svg: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect width="24" height="24" rx="3" fill="#107C41"/><path d="M14 5h6v3h-6V5zm0 4h6v3h-6V9zm0 4h6v3h-6v-3zm0 4h6v2h-6v-2z" fill="#fff" opacity="0.6"/><text x="8" y="16.5" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif" font-weight="700" font-size="10">X</text></svg>' },
    { name: 'Google Sheets', svg: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="#0F9D58"/><path d="M14 2v6h6l-6-6z" fill="#0B7E47"/><rect x="7" y="11" width="10" height="7" fill="#fff"/><line x1="7" y1="13.5" x2="17" y2="13.5" stroke="#0F9D58" stroke-width="0.8"/><line x1="7" y1="15.8" x2="17" y2="15.8" stroke="#0F9D58" stroke-width="0.8"/><line x1="10.3" y1="11" x2="10.3" y2="18" stroke="#0F9D58" stroke-width="0.8"/><line x1="13.7" y1="11" x2="13.7" y2="18" stroke="#0F9D58" stroke-width="0.8"/></svg>' },
    { name: 'QuickBooks', svg: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#2CA01C"/><path d="M8.4 7.2h.6v8.16h-.6a4.08 4.08 0 1 1 0-8.16zm6.6 1.44H15a4.08 4.08 0 1 1 0 8.16h-.6V8.64zM15 9.84v6.96h0a3 3 0 0 0 0-6.96zM8.4 8.4a3 3 0 0 0 0 6h.6v-6h-.6z" fill="#fff"/></svg>' },
    { name: 'Tally', svg: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect width="24" height="24" rx="3" fill="#263238"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif" font-weight="700" font-size="10">Tally</text></svg>' },
    { name: 'Shopify', svg: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M15.337 2.072c-.022-.16-.163-.246-.282-.255-.117-.01-2.336-.166-2.336-.166s-1.545-1.532-1.71-1.701c-.165-.169-.488-.118-.614-.082-.018.005-.328.1-.84.258-.515-1.49-1.41-2.84-3-2.84-.041 0-.085.002-.13.005C6.025-3.27 5.49-3.5 5.025-3.5c-3.582 0-5.31 4.486-5.85 6.766C-2.219 3.7-3.2 4.006-3.32 4.043c-.785.247-.81.27-.913 1.012C-4.31 5.61-6.4 21.6-6.4 21.6L9.7 24.5l8.736-1.886S15.358 2.232 15.337 2.072z" fill="#95BF47" transform="translate(6 0)"/><path d="M21.337 1.817c-.022-.16-.163-.246-.282-.255-.117-.01-2.336-.166-2.336-.166s-1.545-1.532-1.71-1.701c-.06-.062-.146-.094-.235-.108v24.05l9.16-1.978S21.358 1.977 21.337 1.817z" fill="#5E8E3E"/><path d="M14.97 7.026l-1.119.346s-.5-1.486-1.762-1.486c-.029 0-.06.001-.09.003-.346-.456-.776-.673-1.158-.673-2.917 0-4.31 3.65-4.748 5.501l-2.34.726c-.726.227-.749.25-.844.935C2.81 12.89.4 22.094.4 22.094L13.7 24.5V6.97c-.243-.005-.487.003-.73.057zm-2.7 5.42c-.4.124-.853.262-1.31.4 0-.927-.05-2.135-.455-3.165 1.234.232 1.85 1.625 2.155 2.764h-.39zm-2.156-2.948c.65 1.215.794 2.766.794 3.756l-2.535.785c.347-1.83.917-3.36 1.74-4.541zm-1.115-1.038c.245 0 .482.083.71.245-1.01 1.474-1.535 3.6-1.866 5.45-.626.194-1.236.382-1.802.556.477-1.687 1.748-6.25 2.958-6.25z" fill="#fff"/></svg>' },
    { name: 'Amazon', svg: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M16.66 13.83c-.42 0-.78.13-1.05.4-.27.27-.4.62-.4 1.04 0 .42.13.77.4 1.04.27.27.62.4 1.05.4.42 0 .77-.13 1.04-.4.27-.27.4-.62.4-1.04 0-.42-.13-.77-.4-1.04-.27-.27-.62-.4-1.04-.4z" fill="#FF9900" opacity="0.001"/><text x="2" y="14" fill="#252F3E" font-family="Arial, sans-serif" font-weight="700" font-size="11" letter-spacing="-0.5">amazon</text><path d="M3 17.5c2.5 2 6 3 9 3s6.5-1 9-3" stroke="#FF9900" stroke-width="1.8" stroke-linecap="round" fill="none"/><path d="M20 17l1.5-1.2L21 18z" fill="#FF9900"/></svg>' },
    { name: 'ShipStation', svg: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect width="24" height="24" rx="3" fill="#0099FF"/><path d="M6 9l6-2.5 6 2.5v6.5L12 18l-6-2.5V9z" fill="none" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/><line x1="12" y1="6.5" x2="12" y2="18" stroke="#fff" stroke-width="1.2"/><line x1="6" y1="9" x2="12" y2="11.5" stroke="#fff" stroke-width="1.2"/><line x1="18" y1="9" x2="12" y2="11.5" stroke="#fff" stroke-width="1.2"/></svg>' },
  ];
  const list = [...items, ...items];
  return /*#__PURE__*/React.createElement("section", {
    className: "ig-bar",
    "aria-label": "Integration partners"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ig-label"
  }, "Integrates with"), /*#__PURE__*/React.createElement("div", {
    className: "ig-marquee"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ig-track"
  }, list.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "ig-item",
    title: it.name,
    "aria-hidden": i >= items.length ? 'true' : undefined
  }, /*#__PURE__*/React.createElement("span", {
    className: "ig-icon",
    dangerouslySetInnerHTML: { __html: it.svg }
  }), /*#__PURE__*/React.createElement("span", null, it.name))))));
}
window.IntegrationsBar = IntegrationsBar;

function TrustStrip() {
  var prefix = (typeof window !== 'undefined' && window.__SG_BLOG_ASSET_PREFIX__) || '';
  return /*#__PURE__*/React.createElement("div", {
    "aria-label": "Recognized by",
    style: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, padding: '14px 24px', flexWrap: 'wrap', borderBottom: '1px solid var(--border)', background: 'var(--bg-alt)' }
  },
    /*#__PURE__*/React.createElement("span", { style: { fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg3)' } }, "Recognized by"),
    /*#__PURE__*/React.createElement("a", { href: "https://www.nvidia.com/en-us/startups/", target: "_blank", rel: "noopener noreferrer", title: "NVIDIA Inception Program member", "data-cta": "trust_nvidia", style: { display: 'inline-flex', alignItems: 'center', height: 40, opacity: 0.85 } },
      /*#__PURE__*/React.createElement("img", { src: prefix + "assets/nvidia-inception.png", alt: "NVIDIA Inception Program member", width: "130", height: "40", loading: "lazy", decoding: "async", style: { display: 'block', height: 40, width: 'auto' } })
    ),
    /*#__PURE__*/React.createElement("a", { href: "https://aws.amazon.com/startups/", target: "_blank", rel: "noopener noreferrer", title: "AWS Activate Startups member", "data-cta": "trust_aws", style: { display: 'inline-flex', alignItems: 'center', gap: 10, height: 40, opacity: 0.85, textDecoration: 'none' } },
      /*#__PURE__*/React.createElement("svg", { width: "60", height: "36", viewBox: "0 0 304 182", "aria-hidden": "true", style: { display: 'block' } },
        /*#__PURE__*/React.createElement("path", { fill: "#252F3E", d: "M86.4 66.4c0 3.7.4 6.7 1.1 8.9.8 2.2 1.8 4.6 3.2 7.2.5.8.7 1.6.7 2.3 0 1-.6 2-1.9 3l-6.3 4.2c-.9.6-1.8.9-2.6.9-1 0-2-.5-3-1.4C76.2 90 75 88.4 74 86.8c-1-1.7-2-3.6-3.1-5.9-7.8 9.2-17.6 13.8-29.4 13.8-8.4 0-15.1-2.4-20-7.2-4.9-4.8-7.4-11.2-7.4-19.2 0-8.5 3-15.4 9.1-20.6 6.1-5.2 14.2-7.8 24.5-7.8 3.4 0 6.9.3 10.6.8 3.7.5 7.5 1.3 11.5 2.2v-7.3c0-7.6-1.6-12.9-4.7-16-3.2-3.1-8.6-4.6-16.3-4.6-3.5 0-7.1.4-10.8 1.3-3.7.9-7.3 2-10.8 3.4-1.6.7-2.8 1.1-3.5 1.3-.7.2-1.2.3-1.6.3-1.4 0-2.1-1-2.1-3.1v-4.9c0-1.6.2-2.8.7-3.5.5-.7 1.4-1.4 2.8-2.1 3.5-1.8 7.7-3.3 12.6-4.5C41 1.9 46.2 1.3 51.7 1.3c11.9 0 20.6 2.7 26.2 8.1 5.5 5.4 8.3 13.6 8.3 24.6v32.4h.2zM45.8 81.6c3.3 0 6.7-.6 10.3-1.8 3.6-1.2 6.8-3.4 9.5-6.4 1.6-1.9 2.8-4 3.4-6.4.6-2.4 1-5.3 1-8.7v-4.2c-2.9-.7-6-1.3-9.2-1.7-3.2-.4-6.3-.6-9.4-.6-6.7 0-11.6 1.3-14.9 4-3.3 2.7-4.9 6.5-4.9 11.5 0 4.7 1.2 8.2 3.7 10.6 2.4 2.5 5.9 3.7 10.5 3.7zm80.3 10.8c-1.8 0-3-.3-3.8-1-.8-.6-1.5-2-2.1-3.9L96.7 10.2c-.6-2-.9-3.3-.9-4 0-1.6.8-2.5 2.4-2.5h9.8c1.9 0 3.2.3 3.9 1 .8.6 1.4 2 2 3.9l16.8 66.2 15.6-66.2c.5-2 1.1-3.3 1.9-3.9.8-.6 2.2-1 4-1h8c1.9 0 3.2.3 4 1 .8.6 1.5 2 1.9 3.9l15.8 67 17.3-67c.6-2 1.3-3.3 2-3.9.8-.6 2.1-1 3.9-1h9.3c1.6 0 2.5.8 2.5 2.5 0 .5-.1 1-.2 1.6-.1.6-.3 1.4-.7 2.5l-24.1 77.3c-.6 2-1.3 3.3-2.1 3.9-.8.6-2.1 1-3.8 1h-8.6c-1.9 0-3.2-.3-4-1-.8-.7-1.5-2-1.9-4L156 23l-15.4 64.4c-.5 2-1.1 3.3-1.9 4-.8.7-2.2 1-4 1h-8.6zm128.5 2.7c-5.2 0-10.4-.6-15.4-1.8-5-1.2-8.9-2.5-11.5-4-1.6-.9-2.7-1.9-3.1-2.8-.4-.9-.6-1.9-.6-2.8v-5.1c0-2.1.8-3.1 2.3-3.1.6 0 1.2.1 1.8.3.6.2 1.5.6 2.5 1 3.4 1.5 7.1 2.7 11 3.5 4 .8 7.9 1.2 11.9 1.2 6.3 0 11.2-1.1 14.6-3.3 3.4-2.2 5.2-5.4 5.2-9.5 0-2.8-.9-5.1-2.7-7-1.8-1.9-5.2-3.6-10.1-5.2L246 52c-7.3-2.3-12.7-5.7-16-10.2-3.3-4.4-5-9.3-5-14.5 0-4.2.9-7.9 2.7-11.1 1.8-3.2 4.2-6 7.2-8.2 3-2.3 6.4-4 10.4-5.2 4-1.2 8.2-1.7 12.6-1.7 2.2 0 4.5.1 6.7.4 2.3.3 4.4.7 6.5 1.1 2 .5 3.9 1 5.7 1.6 1.8.6 3.2 1.2 4.2 1.8 1.4.8 2.4 1.6 3 2.5.6.8.9 1.9.9 3.3v4.7c0 2.1-.8 3.2-2.3 3.2-.8 0-2.1-.4-3.8-1.2-5.7-2.6-12.1-3.9-19.2-3.9-5.7 0-10.2.9-13.3 2.8-3.1 1.9-4.7 4.8-4.7 8.9 0 2.8 1 5.2 3 7.1 2 1.9 5.7 3.8 11 5.5l14.2 4.5c7.2 2.3 12.4 5.5 15.5 9.6 3.1 4.1 4.6 8.8 4.6 14 0 4.3-.9 8.2-2.6 11.6-1.8 3.4-4.2 6.4-7.3 8.8-3.1 2.5-6.8 4.3-11.1 5.6-4.5 1.4-9.2 2.1-14.3 2.1z" }),
        /*#__PURE__*/React.createElement("path", { fill: "#FF9900", fillRule: "evenodd", clipRule: "evenodd", d: "M273.5 143.7c-32.9 24.3-80.7 37.2-121.8 37.2-57.6 0-109.5-21.3-148.7-56.7-3.1-2.8-.3-6.6 3.4-4.4 42.4 24.6 94.7 39.5 148.8 39.5 36.5 0 76.6-7.6 113.5-23.2 5.5-2.5 10.2 3.6 4.8 7.6z" }),
        /*#__PURE__*/React.createElement("path", { fill: "#FF9900", fillRule: "evenodd", clipRule: "evenodd", d: "M287.2 128.1c-4.2-5.4-27.8-2.6-38.5-1.3-3.2.4-3.7-2.4-.8-4.5 18.8-13.2 49.7-9.4 53.3-5 3.6 4.5-1 35.4-18.6 50.2-2.7 2.3-5.3 1.1-4.1-1.9 4-9.9 12.9-32.2 8.7-37.5z" })
      ),
      /*#__PURE__*/React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: 'var(--fg2)', letterSpacing: '-0.005em' } }, "Activate Startups")
    )
  );
}
window.TrustStrip = TrustStrip;

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
    }, {
      threshold: 0.3
    });
    if (chatRef.current) observer.observe(chatRef.current);
    return () => observer.disconnect();
  }, []);
  const problems = [{
    n: '01',
    t: 'You pay before you ever see what works',
    b: 'Six figures, often before you see a working screen. Three possible systems come out. You only find out which one you got after the cheque clears.',
    footer: 'With SimpleGrid, you see and use it first. Then you pay.',
    visual: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 400 200",
      style: {
        width: '100%',
        height: 'auto',
        display: 'block'
      }
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
      id: "sgHoleCore",
      cx: "50%",
      cy: "50%",
      r: "50%"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0%",
      stopColor: "#000",
      stopOpacity: "1"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "55%",
      stopColor: "#0F1419",
      stopOpacity: "1"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "100%",
      stopColor: "#1F2937",
      stopOpacity: "0"
    })), /*#__PURE__*/React.createElement("radialGradient", {
      id: "sgHoleHalo",
      cx: "50%",
      cy: "50%",
      r: "50%"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "40%",
      stopColor: "#DC2A3D",
      stopOpacity: "0"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "80%",
      stopColor: "#DC2A3D",
      stopOpacity: "0.2"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "100%",
      stopColor: "#DC2A3D",
      stopOpacity: "0"
    }))), [{
      y: 18,
      label: 'Consultants',
      dy: 76,
      delay: '0s'
    }, {
      y: 50,
      label: 'Integrations',
      dy: 44,
      delay: '0.3s'
    }, {
      y: 82,
      label: 'Licensing cost',
      dy: 12,
      delay: '0.6s'
    }, {
      y: 114,
      label: 'Delays',
      dy: -20,
      delay: '0.9s'
    }, {
      y: 146,
      label: 'Change requests',
      dy: -52,
      delay: '1.2s'
    }].map((it, i) => /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("path", {
      d: `M 32 ${it.y + 6} Q 90 ${it.y + 6} 178 100`,
      fill: "none",
      stroke: "#DC2A3D",
      strokeWidth: "1",
      strokeDasharray: "2 4",
      strokeOpacity: "0.3"
    }), /*#__PURE__*/React.createElement("text", {
      x: "38",
      y: it.y - 2,
      fontSize: "10.5",
      fill: "#374151",
      fontWeight: "600"
    }, it.label), /*#__PURE__*/React.createElement("g", {
      style: {
        animation: `sg-suck-${i} 4s ${it.delay} ease-in infinite`,
        transformOrigin: '0 0'
      }
    }, /*#__PURE__*/React.createElement("rect", {
      x: "10",
      y: it.y,
      width: "22",
      height: "14",
      rx: "3",
      fill: "#DC2A3D"
    }), /*#__PURE__*/React.createElement("text", {
      x: "21",
      y: it.y + 11,
      fontSize: "10",
      fill: "#fff",
      fontWeight: "700",
      textAnchor: "middle"
    }, "$")))), /*#__PURE__*/React.createElement("circle", {
      cx: "178",
      cy: "100",
      r: "62",
      fill: "url(#sgHoleHalo)",
      style: {
        animation: 'sg-halo 3s ease-in-out infinite'
      }
    }), /*#__PURE__*/React.createElement("g", {
      style: {
        transformOrigin: '178px 100px',
        animation: 'sg-spin 9s linear infinite'
      }
    }, /*#__PURE__*/React.createElement("ellipse", {
      cx: "178",
      cy: "100",
      rx: "46",
      ry: "11",
      fill: "none",
      stroke: "rgba(220,42,61,0.35)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("ellipse", {
      cx: "178",
      cy: "100",
      rx: "46",
      ry: "11",
      fill: "none",
      stroke: "rgba(220,42,61,0.22)",
      strokeWidth: "1",
      transform: "rotate(45 178 100)"
    }), /*#__PURE__*/React.createElement("ellipse", {
      cx: "178",
      cy: "100",
      rx: "46",
      ry: "11",
      fill: "none",
      stroke: "rgba(220,42,61,0.18)",
      strokeWidth: "1",
      transform: "rotate(90 178 100)"
    }), /*#__PURE__*/React.createElement("ellipse", {
      cx: "178",
      cy: "100",
      rx: "46",
      ry: "11",
      fill: "none",
      stroke: "rgba(220,42,61,0.18)",
      strokeWidth: "1",
      transform: "rotate(135 178 100)"
    })), /*#__PURE__*/React.createElement("circle", {
      cx: "178",
      cy: "100",
      r: "36",
      fill: "url(#sgHoleCore)"
    }), /*#__PURE__*/React.createElement("text", {
      x: "178",
      y: "98",
      fontSize: "13",
      fill: "#fff",
      fontWeight: "700",
      textAnchor: "middle",
      letterSpacing: "0.02em"
    }, "$500K+"), /*#__PURE__*/React.createElement("text", {
      x: "178",
      y: "112",
      fontSize: "8.5",
      fill: "rgba(255,255,255,0.55)",
      fontWeight: "700",
      textAnchor: "middle",
      letterSpacing: "0.18em"
    }, "SUNK"), [{
      y: 36,
      l1: 'No usable',
      l2: 'system',
      color: '#DC2A3D',
      sub: 'project shelved'
    }, {
      y: 100,
      l1: 'Half-working',
      l2: 'system',
      color: '#F59E0B',
      sub: 'forced into modules'
    }, {
      y: 164,
      l1: 'Fully working',
      l2: 'system',
      color: '#10B981',
      sub: 'rare, slow, expensive'
    }].map((o, i) => /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("path", {
      d: `M 214 100 Q 232 ${(100 + o.y) / 2} 244 ${o.y} L 268 ${o.y}`,
      fill: "none",
      stroke: o.color,
      strokeWidth: "1.5",
      strokeDasharray: "3 3",
      strokeOpacity: "0.85"
    }), /*#__PURE__*/React.createElement("polygon", {
      points: `274,${o.y} 266,${o.y - 4} 266,${o.y + 4}`,
      fill: o.color
    }), /*#__PURE__*/React.createElement("text", {
      x: "280",
      y: o.y - 4,
      fontSize: "11",
      fill: o.color,
      fontWeight: "700"
    }, o.l1), /*#__PURE__*/React.createElement("text", {
      x: "280",
      y: o.y + 8,
      fontSize: "11",
      fill: o.color,
      fontWeight: "700"
    }, o.l2), /*#__PURE__*/React.createElement("text", {
      x: "280",
      y: o.y + 20,
      fontSize: "9",
      fill: "#6B7280",
      fontStyle: "italic"
    }, o.sub))), /*#__PURE__*/React.createElement("style", null, `
            @keyframes sg-suck-0 { 0%,5%{transform:translate(0,0);opacity:1} 70%{transform:translate(146px,76px) scale(0.3);opacity:0} 100%{transform:translate(146px,76px) scale(0.3);opacity:0} }
            @keyframes sg-suck-1 { 0%,5%{transform:translate(0,0);opacity:1} 70%{transform:translate(146px,44px) scale(0.3);opacity:0} 100%{transform:translate(146px,44px) scale(0.3);opacity:0} }
            @keyframes sg-suck-2 { 0%,5%{transform:translate(0,0);opacity:1} 70%{transform:translate(146px,12px) scale(0.3);opacity:0} 100%{transform:translate(146px,12px) scale(0.3);opacity:0} }
            @keyframes sg-suck-3 { 0%,5%{transform:translate(0,0);opacity:1} 70%{transform:translate(146px,-20px) scale(0.3);opacity:0} 100%{transform:translate(146px,-20px) scale(0.3);opacity:0} }
            @keyframes sg-suck-4 { 0%,5%{transform:translate(0,0);opacity:1} 70%{transform:translate(146px,-52px) scale(0.3);opacity:0} 100%{transform:translate(146px,-52px) scale(0.3);opacity:0} }
            @keyframes sg-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
            @keyframes sg-halo { 0%,100%{opacity:0.55} 50%{opacity:1} }
          `))
  }, {
    n: '02',
    t: 'Your business evolves. Your ERP does not.',
    b: 'Every small change = 6-week consulting project.',
    footer: 'SimpleGrid bends to your process. Most systems lock you in mid-growth.',
    visual: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 400 200",
      style: {
        width: '100%',
        height: 'auto',
        display: 'block'
      }
    }, /*#__PURE__*/React.createElement("text", {
      x: "20",
      y: "50",
      fontSize: "13",
      fill: "var(--fg1)",
      fontWeight: "600"
    }, "Your business with a fluid ERP"), /*#__PURE__*/React.createElement("rect", {
      x: "20",
      y: "62",
      width: "360",
      height: "20",
      rx: "10",
      fill: "#E5E8ED"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "20",
      y: "62",
      width: "360",
      height: "20",
      rx: "10",
      fill: "#10B981",
      style: {
        transformOrigin: '20px 72px',
        animation: 'sg-grow-b 3s ease-out infinite'
      }
    }), /*#__PURE__*/React.createElement("text", {
      x: "370",
      y: "76",
      fontSize: "11",
      fill: "#fff",
      fontWeight: "700",
      textAnchor: "end",
      style: {
        opacity: 0,
        animation: 'sg-fade-b 3s ease-out infinite'
      }
    }, "Scales"), /*#__PURE__*/React.createElement("text", {
      x: "20",
      y: "124",
      fontSize: "13",
      fill: "var(--fg1)",
      fontWeight: "600"
    }, "Your business with a rigid ERP"), /*#__PURE__*/React.createElement("rect", {
      x: "20",
      y: "136",
      width: "360",
      height: "20",
      rx: "10",
      fill: "#E5E8ED"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "20",
      y: "136",
      width: "180",
      height: "20",
      rx: "10",
      fill: "#DC2A3D",
      style: {
        transformOrigin: '20px 146px',
        animation: 'sg-grow-c 3s ease-out infinite'
      }
    }), /*#__PURE__*/React.createElement("text", {
      x: "214",
      y: "150",
      fontSize: "11",
      fill: "#DC2A3D",
      fontWeight: "700"
    }, "\u2190 Growth Stalls"), /*#__PURE__*/React.createElement("style", null, `@keyframes sg-grow-b{0%{transform:scaleX(0)}60%,100%{transform:scaleX(1)}}@keyframes sg-grow-c{0%{transform:scaleX(0)}50%,100%{transform:scaleX(1)}}@keyframes sg-fade-b{0%,60%{opacity:0}75%,100%{opacity:1}}`))
  }, {
    n: '03',
    t: 'UI built for accountants, not operators',
    b: 'Seven tabs. Twelve fields. Nothing gets done.',
    footer: 'The ERP slows the floor, so teams go around it.',
    visual: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 400 200",
      style: {
        width: '100%',
        height: 'auto',
        display: 'block'
      }
    }, /*#__PURE__*/React.createElement("rect", {
      x: "10",
      y: "10",
      width: "380",
      height: "180",
      rx: "6",
      fill: "#fff",
      stroke: "#E5E8ED",
      strokeWidth: "1.5"
    }), ['Orders', 'Items', 'Stock', 'Vendor', 'QC', 'Tax', 'GL'].map((tab, i) => /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("rect", {
      x: 14 + i * 52,
      y: "14",
      width: "48",
      height: "20",
      rx: "3",
      fill: i === 0 ? '#F59E0B22' : '#FAFBFC',
      stroke: "#E5E8ED",
      strokeWidth: "0.8"
    }), /*#__PURE__*/React.createElement("text", {
      x: 38 + i * 52,
      y: "27",
      fontSize: "10",
      fill: i === 0 ? '#B45309' : 'var(--fg2)',
      textAnchor: "middle",
      fontWeight: "600"
    }, tab))), /*#__PURE__*/React.createElement("text", {
      x: "20",
      y: "52",
      fontSize: "10",
      fill: "var(--fg3)",
      fontWeight: "600"
    }, "REQUIRED FIELDS *"), [['GL Acct', 'HTS Code'], ['Cost Center', 'Tax Class'], ['Profit Center', 'Doc Ref'], ['UOM', 'Ledger']].map((row, r) => /*#__PURE__*/React.createElement("g", {
      key: r
    }, /*#__PURE__*/React.createElement("rect", {
      x: "20",
      y: 60 + r * 22,
      width: "175",
      height: "16",
      rx: "3",
      fill: "#FAFBFC",
      stroke: "#E5E8ED",
      strokeWidth: "0.8"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "205",
      y: 60 + r * 22,
      width: "175",
      height: "16",
      rx: "3",
      fill: "#FAFBFC",
      stroke: "#E5E8ED",
      strokeWidth: "0.8"
    }), /*#__PURE__*/React.createElement("text", {
      x: "26",
      y: 71 + r * 22,
      fontSize: "9",
      fill: "#9CA3AF"
    }, row[0], " *"), /*#__PURE__*/React.createElement("text", {
      x: "211",
      y: 71 + r * 22,
      fontSize: "9",
      fill: "#9CA3AF"
    }, row[1], " *"))), /*#__PURE__*/React.createElement("rect", {
      x: "20",
      y: "154",
      width: "80",
      height: "22",
      rx: "4",
      fill: "#4A7BF7"
    }), /*#__PURE__*/React.createElement("text", {
      x: "60",
      y: "168",
      fontSize: "10",
      fill: "#fff",
      textAnchor: "middle",
      fontWeight: "600"
    }, "Submit"), /*#__PURE__*/React.createElement("rect", {
      x: "108",
      y: "154",
      width: "80",
      height: "22",
      rx: "4",
      fill: "#fff",
      stroke: "#E5E8ED"
    }), /*#__PURE__*/React.createElement("text", {
      x: "148",
      y: "168",
      fontSize: "10",
      fill: "var(--fg2)",
      textAnchor: "middle",
      fontWeight: "600"
    }, "Cancel"), /*#__PURE__*/React.createElement("text", {
      x: "370",
      y: "172",
      fontSize: "24",
      textAnchor: "end",
      style: {
        animation: 'sg-conf 1.5s ease-in-out infinite'
      }
    }, "\uD83D\uDE35"), /*#__PURE__*/React.createElement("style", null, `@keyframes sg-conf{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`))
  }, {
    n: '04',
    t: 'You cannot change how 100 people work',
    b: 'So your ERP has to work like they already do.',
    footer: 'If they can text, they can use this.',
    visual: null,
    isChatDemo: true
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "WHY ERP KEEPS FAILING MID-MARKET"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "You wouldn't buy a t-shirt without trying it on. Why are you buying ERP that way?")), /*#__PURE__*/React.createElement("div", {
    className: "problem-grid",
    style: {
      marginTop: 32
    },
    ref: chatRef
  }, problems.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: p.n,
    delay: i * 100
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: 24,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--sg-red)',
      letterSpacing: '-0.02em'
    }
  }, p.n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 17,
      fontWeight: 700,
      color: 'var(--fg1)',
      margin: 0,
      letterSpacing: '-0.01em',
      lineHeight: 1.3
    }
  }, p.t)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--fg2)',
      lineHeight: 1.5,
      margin: '0 0 14px'
    }
  }, p.b), /*#__PURE__*/React.createElement("div", {
    className: 'problem-visual' + (p.isChatDemo ? ' problem-visual-chat' : ' problem-visual-svg')
  }, p.isChatDemo ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      fontFamily: 'var(--font-mono)',
      fontSize: 13.5,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--fg3)',
      fontSize: 11,
      marginBottom: 10,
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, "Warehouse manager types:"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--fg1)',
      opacity: activeChatStep >= 1 ? 1 : 0.2,
      transition: 'opacity 0.3s'
    }
  }, "> Received 2,200 units of grade-A material from Midwest Supply"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--sg-green)',
      marginTop: 6,
      opacity: activeChatStep >= 2 ? 1 : 0.2,
      transition: 'opacity 0.3s'
    }
  }, "\u2713 PO matched. Inventory updated."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      paddingTop: 12,
      borderTop: '1px dashed var(--border)',
      color: 'var(--fg3)',
      fontSize: 11,
      marginBottom: 8,
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      opacity: activeChatStep >= 3 ? 1 : 0.2,
      transition: 'opacity 0.3s'
    }
  }, "Sales drops a PDF in chat:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 10px',
      border: '1px solid var(--border)',
      borderRadius: 8,
      background: '#fff',
      opacity: activeChatStep >= 3 ? 1 : 0.2,
      transition: 'opacity 0.3s'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--sg-red)",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "14 2 14 8 20 8"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg1)',
      fontSize: 12
    }
  }, "SO_4521_BuyerPO.pdf")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--sg-green)',
      marginTop: 8,
      opacity: activeChatStep >= 4 ? 1 : 0.2,
      transition: 'opacity 0.3s'
    }
  }, "\u2713 AI parsed. 23 line items matched to BOM."), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--sg-blue)',
      marginTop: 4,
      opacity: activeChatStep >= 5 ? 1 : 0.2,
      transition: 'opacity 0.3s'
    }
  }, "\u2192 Routed to founder for approval."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--fg3)',
      fontStyle: 'italic',
      opacity: activeChatStep >= 6 ? 1 : 0.2,
      transition: 'opacity 0.3s'
    }
  }, "No training. Same habit as texting.")) : p.visual), p.footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      paddingTop: 14,
      borderTop: '1px solid var(--border)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--sg-blue)',
      lineHeight: 1.4
    }
  }, p.footer))))))));
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
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--sg-blue').trim() || '#4A7BF7';
    const RING_LIFE_MS = 5500;
    const SPAWN_INTERVAL_MS = 1000;
    const rings = [];
    let raf,
      w = 0,
      h = 0,
      dpr = 1,
      lastSpawn = -SPAWN_INTERVAL_MS,
      cancelled = false;
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
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(canvas);
    window.addEventListener('resize', resize);

    // Pause when canvas scrolls off-screen or tab is hidden.
    let isVisible = true;
    let isTabActive = !document.hidden;
    const onVisibility = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibility);
    const visObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, {
      threshold: 0
    });
    visObserver.observe(canvas);
    function frame(now) {
      if (cancelled) return;
      if (!isVisible || !isTabActive) {
        raf = requestAnimationFrame(frame);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) * 0.62;
      if (now - lastSpawn >= SPAWN_INTERVAL_MS) {
        rings.push({
          born: now
        });
        lastSpawn = now;
      }
      for (let i = rings.length - 1; i >= 0; i--) {
        const t = (now - rings[i].born) / RING_LIFE_MS;
        if (t >= 1) {
          rings.splice(i, 1);
          continue;
        }
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
      document.removeEventListener('visibilitychange', onVisibility);
      visObserver.disconnect();
    };
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "section section-dark sg-onboard",
    style: {
      position: 'relative',
      overflow: 'hidden',
      paddingTop: 40,
      paddingBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sg-onboard-grid",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      backgroundImage: 'linear-gradient(color-mix(in srgb, var(--sg-blue) 10%, transparent) 1px, transparent 1px),' + 'linear-gradient(90deg, color-mix(in srgb, var(--sg-blue) 10%, transparent) 1px, transparent 1px)',
      backgroundSize: '48px 48px',
      WebkitMaskImage: 'radial-gradient(ellipse at center, #000 25%, transparent 75%)',
      maskImage: 'radial-gradient(ellipse at center, #000 25%, transparent 75%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      position: 'relative',
      zIndex: 2,
      maxWidth: 920,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "sg-kicker-dot",
    style: {
      display: 'inline-block',
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--sg-blue)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.62)'
    }
  }, "Selective Onboarding")), /*#__PURE__*/React.createElement("h2", {
    className: "h2 sg-onboard-h",
    style: {
      maxWidth: 780,
      margin: '0 auto 8px',
      lineHeight: 1.1,
      letterSpacing: '-0.025em'
    }
  }, "We'd love to onboard everyone.", /*#__PURE__*/React.createElement("br", null), "We just ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--sg-blue)'
    }
  }, "can't - yet.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      color: 'rgba(255,255,255,0.6)',
      lineHeight: 1.55,
      maxWidth: 640,
      margin: '0 auto 22px'
    }
  }, "Our senior engineers and founders are on every deployment. We run tight to keep the experience exceptional."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 150
  }, /*#__PURE__*/React.createElement("div", {
    className: "sg-sonar-area",
    style: {
      position: 'relative',
      height: 240,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: sonarRef,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, calc(-50% + 26px))',
      textAlign: 'center',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.55)'
    }
  }, "3 slots open")), /*#__PURE__*/React.createElement("div", {
    className: "sg-build-tag sg-build-tag-l",
    style: {
      position: 'absolute',
      top: '24%',
      left: '4%'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "sg-build-tag-dot"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      fontWeight: 600,
      color: '#fff'
    }
  }, "build_014"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'rgba(255,255,255,0.55)',
      marginTop: 3
    }
  }, "metal fab \xB7 day 5")), /*#__PURE__*/React.createElement("div", {
    className: "sg-build-tag sg-build-tag-r",
    style: {
      position: 'absolute',
      top: '62%',
      right: '4%'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "sg-build-tag-dot"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      fontWeight: 600,
      color: '#fff'
    }
  }, "build_015"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'rgba(255,255,255,0.55)',
      marginTop: 3
    }
  }, "apparel d2c \xB7 day 2")))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 'var(--radius-lg)',
      padding: '14px 20px',
      background: 'rgba(255,255,255,0.03)',
      maxWidth: 760,
      margin: '0 auto 16px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.78)',
      lineHeight: 1.6,
      margin: 0
    }
  }, "If we take you on, we build a custom ERP around ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#fff',
      fontWeight: 700
    }
  }, "how your operation actually runs"), ". You run it for 30 days. If it doesn't earn its keep, walk away. ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#fff',
      fontWeight: 700
    }
  }, "No contract. No invoice.")))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 260
  }, /*#__PURE__*/React.createElement("div", {
    className: "sg-onboard-stats",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 1,
      background: 'rgba(255,255,255,0.10)',
      border: '1px solid rgba(255,255,255,0.10)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      maxWidth: 520,
      margin: '0 auto 18px'
    }
  }, [{
    n: '7d',
    l: 'Time to live'
  }, {
    n: '30d',
    l: 'Free trial'
  }, {
    n: '$0',
    l: 'To start'
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "sg-onboard-stat",
    style: {
      padding: '12px 12px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 24,
      fontWeight: 700,
      color: 'var(--sg-blue)',
      letterSpacing: '-0.02em',
      lineHeight: 1
    }
  }, s.n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'rgba(255,255,255,0.55)',
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      fontWeight: 600,
      marginTop: 4
    }
  }, s.l))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 320
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowInvite(true),
    className: "btn btn-lg btn-invite",
    style: {
      boxShadow: '0 0 0 0 rgba(74,123,247,0.45), 0 6px 20px rgba(74,123,247,0.22)',
      animation: 'sgBuildPulse 1.8s ease-in-out infinite'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      marginRight: 2
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2l2.39 5.84L20 10l-5.61 2.16L12 18l-2.39-5.84L4 10l5.61-2.16L12 2z",
    fill: "currentColor"
  })), "Request an Invite"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'rgba(255,255,255,0.42)',
      marginTop: 10,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      fontWeight: 600
    }
  }, "We reply within 24 hours \xB7 Select partners only")))), /*#__PURE__*/React.createElement("style", null, `
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
      `)), showInvite && /*#__PURE__*/React.createElement(InviteModal, {
    onClose: () => setShowInvite(false)
  }));
}
window.WhatWeDo = WhatWeDo;
function HowItWorks() {
  const [selected, setSelected] = React.useState(null);
  const cards = [{
    body: "A real 3-hour conversation with our founder. We map your core workflows.",
    title: "A live video call with the founder.",
    details: [{
      kind: 'p',
      text: "Day 1 is a 3-hour live video call with our founders and lead engineer - not a sales rep, not an SDR. We walk through your operations end-to-end: how orders come in, who approves what, your production stages, vendor relationships, QC rules, dispatch, and the exceptions every floor has."
    }, {
      kind: 'p',
      text: "Bring whoever should be in the room - your COO, plant manager, a couple of floor leads. The more voices, the sharper the model. We map your core workflows live on the call, asking the questions only an operator would think to ask."
    }, {
      kind: 'list',
      items: ["Live video call (Zoom or Google Meet - whichever you prefer).", "3 hours, broken into operations blocks: orders, planning, production, QC, dispatch, accounts.", "We take notes in real time - you'll have them within an hour of the call.", "Confidential by default. We sign a confidentiality agreement before the call if needed."]
    }],
    visual: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 220 160",
      style: {
        width: '100%',
        height: '100%'
      },
      preserveAspectRatio: "xMidYMid meet"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "22",
      cy: "36",
      r: "11",
      fill: "#4A7BF7"
    }), /*#__PURE__*/React.createElement("text", {
      x: "22",
      y: "40",
      fontSize: "11",
      fill: "#fff",
      textAnchor: "middle",
      fontWeight: "700"
    }, "F"), /*#__PURE__*/React.createElement("path", {
      d: "M 36 26 L 196 26 Q 204 26 204 34 L 204 50 Q 204 58 196 58 L 44 58 L 36 64 Z",
      fill: "rgba(74,123,247,0.10)",
      stroke: "rgba(74,123,247,0.30)"
    }), /*#__PURE__*/React.createElement("text", {
      x: "46",
      y: "46",
      fontSize: "10",
      fill: "var(--fg1)"
    }, "How does QC work today?"), /*#__PURE__*/React.createElement("circle", {
      cx: "198",
      cy: "86",
      r: "11",
      fill: "#1A1A1A"
    }), /*#__PURE__*/React.createElement("text", {
      x: "198",
      y: "90",
      fontSize: "11",
      fill: "#fff",
      textAnchor: "middle",
      fontWeight: "700"
    }, "Y"), /*#__PURE__*/React.createElement("path", {
      d: "M 184 76 L 24 76 Q 16 76 16 84 L 16 100 Q 16 108 24 108 L 176 108 L 184 114 Z",
      fill: "var(--bg-alt)",
      stroke: "var(--border)"
    }), /*#__PURE__*/React.createElement("text", {
      x: "26",
      y: "96",
      fontSize: "10",
      fill: "var(--fg1)"
    }, "Foreman calls if QC fails\u2026"), /*#__PURE__*/React.createElement("rect", {
      x: "20",
      y: "124",
      width: "80",
      height: "5",
      rx: "2",
      fill: "rgba(74,123,247,0.20)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "20",
      y: "134",
      width: "60",
      height: "5",
      rx: "2",
      fill: "rgba(74,123,247,0.15)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "20",
      y: "144",
      width: "100",
      height: "5",
      rx: "2",
      fill: "rgba(74,123,247,0.20)"
    }), /*#__PURE__*/React.createElement("text", {
      x: "200",
      y: "148",
      fontSize: "9",
      fill: "var(--sg-blue)",
      textAnchor: "end",
      fontWeight: "700"
    }, "3 HOURS"))
  }, {
    body: "Working demo in 24 hours, built around your operation.",
    title: "A working demo within 24 hours.",
    details: [{
      kind: 'p',
      text: "Within 24 hours of the call, we send you a private link. It's not slides, not a sandbox - it's a working version of your ERP, generated from the call."
    }, {
      kind: 'p',
      text: "Your products, your stages, your approval rules, and your buyers are modeled in. You and your team click around: create a PO, run an order through, log a receipt, see the inventory move."
    }, {
      kind: 'list',
      items: ["60-70% accuracy on the first pass is typical - the rest gets fixed in step 3.", "Private URL, sign-in protected. Only your team sees it.", "Works in any browser. No app installs needed.", "This is the moment most operators tell us, “I've never seen a vendor do this.”"]
    }],
    visual: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 220 160",
      style: {
        width: '100%',
        height: '100%'
      },
      preserveAspectRatio: "xMidYMid meet"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "14",
      width: "192",
      height: "132",
      rx: "6",
      fill: "#fff",
      stroke: "var(--border)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "14",
      width: "192",
      height: "20",
      rx: "6",
      fill: "var(--sg-off-white)"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "14",
      y1: "34",
      x2: "206",
      y2: "34",
      stroke: "var(--border)"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "22",
      cy: "24",
      r: "2.5",
      fill: "#EF4444"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "32",
      cy: "24",
      r: "2.5",
      fill: "#F59E0B"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "42",
      cy: "24",
      r: "2.5",
      fill: "#10B981"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "22",
      y: "42",
      width: "44",
      height: "92",
      rx: "3",
      fill: "var(--bg-alt)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "28",
      y: "50",
      width: "32",
      height: "5",
      rx: "2",
      fill: "var(--border)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "28",
      y: "60",
      width: "28",
      height: "5",
      rx: "2",
      fill: "var(--border)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "28",
      y: "70",
      width: "32",
      height: "5",
      rx: "2",
      fill: "rgba(74,123,247,0.5)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "28",
      y: "80",
      width: "24",
      height: "5",
      rx: "2",
      fill: "var(--border)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "28",
      y: "90",
      width: "30",
      height: "5",
      rx: "2",
      fill: "var(--border)"
    }), /*#__PURE__*/React.createElement("text", {
      x: "74",
      y: "52",
      fontSize: "8",
      fill: "var(--sg-blue)",
      fontWeight: "700",
      letterSpacing: "0.06em"
    }, "YOUR ERP \xB7 LIVE"), /*#__PURE__*/React.createElement("rect", {
      x: "74",
      y: "58",
      width: "124",
      height: "34",
      rx: "4",
      fill: "rgba(74,123,247,0.08)",
      stroke: "rgba(74,123,247,0.25)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "80",
      y: "66",
      width: "40",
      height: "5",
      rx: "2",
      fill: "var(--sg-blue)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "80",
      y: "78",
      width: "80",
      height: "5",
      rx: "2",
      fill: "rgba(74,123,247,0.5)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "74",
      y: "98",
      width: "60",
      height: "34",
      rx: "4",
      fill: "var(--bg-alt)",
      stroke: "var(--border)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "138",
      y: "98",
      width: "60",
      height: "34",
      rx: "4",
      fill: "var(--bg-alt)",
      stroke: "var(--border)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "156",
      y: "102",
      width: "36",
      height: "22",
      rx: "11",
      fill: "var(--sg-blue)"
    }), /*#__PURE__*/React.createElement("text", {
      x: "174",
      y: "117",
      fontSize: "11",
      fill: "#fff",
      textAnchor: "middle",
      fontWeight: "700"
    }, "24h"))
  }, {
    body: "Your team reviews live. We fix what's wrong on the spot.",
    title: "Live review with your floor team.",
    details: [{
      kind: 'p',
      text: "Day 2-3 is a live review session with the people who'll actually use the system - operators, plant managers, QC inspectors, your accounts lead. They click through the demo while we're on the call."
    }, {
      kind: 'p',
      text: "They tell us what's wrong, in their language: “The PO field is in the wrong order.” “We track shrinkage at the bin level, not SKU.” “This rule should be 75%, not 60%.” We fix it on the call. No tickets, no sprints, no waiting."
    }, {
      kind: 'list',
      items: ["Live config changes - you watch your edits go in as we make them.", "Two passes if needed. Most operations need only one.", "By end of session, the system fits how your team actually works.", "This step kills 75% of ERP projects elsewhere - because nobody else does it live."]
    }],
    visual: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 220 160",
      style: {
        width: '100%',
        height: '100%'
      },
      preserveAspectRatio: "xMidYMid meet"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "14",
      width: "192",
      height: "132",
      rx: "6",
      fill: "var(--bg-alt)",
      stroke: "var(--border)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "22",
      y: "22",
      width: "80",
      height: "6",
      rx: "2",
      fill: "var(--border)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "22",
      y: "34",
      width: "120",
      height: "6",
      rx: "2",
      fill: "var(--border)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "22",
      y: "46",
      width: "60",
      height: "6",
      rx: "2",
      fill: "var(--border)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "22",
      y: "64",
      width: "120",
      height: "20",
      rx: "3",
      fill: "rgba(245,158,11,0.15)",
      stroke: "rgba(245,158,11,0.55)",
      strokeDasharray: "3 2"
    }), /*#__PURE__*/React.createElement("text", {
      x: "28",
      y: "77",
      fontSize: "9",
      fill: "#B45309",
      fontWeight: "600"
    }, "Add: foreman approval"), /*#__PURE__*/React.createElement("g", {
      transform: "translate(70, 56)"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 0 L0 12 L4 8 L7 14 L9 13 L6 7 L11 7 Z",
      fill: "#4A7BF7"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "11",
      y: "-1",
      width: "50",
      height: "13",
      rx: "3",
      fill: "#4A7BF7"
    }), /*#__PURE__*/React.createElement("text", {
      x: "36",
      y: "9",
      fontSize: "8",
      fill: "#fff",
      textAnchor: "middle",
      fontWeight: "600"
    }, "Operator")), /*#__PURE__*/React.createElement("g", {
      transform: "translate(140, 100)"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 0 L0 12 L4 8 L7 14 L9 13 L6 7 L11 7 Z",
      fill: "#7C3AED"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "11",
      y: "-1",
      width: "46",
      height: "13",
      rx: "3",
      fill: "#7C3AED"
    }), /*#__PURE__*/React.createElement("text", {
      x: "34",
      y: "9",
      fontSize: "8",
      fill: "#fff",
      textAnchor: "middle",
      fontWeight: "600"
    }, "Manager")), /*#__PURE__*/React.createElement("g", {
      transform: "translate(36, 116)"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 0 L0 12 L4 8 L7 14 L9 13 L6 7 L11 7 Z",
      fill: "#10B981"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "11",
      y: "-1",
      width: "22",
      height: "13",
      rx: "3",
      fill: "#10B981"
    }), /*#__PURE__*/React.createElement("text", {
      x: "22",
      y: "9",
      fontSize: "8",
      fill: "#fff",
      textAnchor: "middle",
      fontWeight: "600"
    }, "QA")))
  }, {
    body: "Live in 7 days with your real data, orders, and team.",
    title: "Live in production by day 7.",
    details: [{
      kind: 'p',
      text: "Most deployments go live within 7-21 days, depending on how much custom configuration your operation needs. Day 4-7 is migration, integration, and go-live. We pull from your existing ERP, accounting tool, email, and any CSV exports. Integrations turn on - your accounting, your inbox, your shipping platform."
    }, {
      kind: 'p',
      text: "Your team uses the system in parallel for one week, on real orders, with real money. By day 7, SimpleGrid is the source of truth. Old spreadsheets and chat threads get archived."
    }, {
      kind: 'list',
      items: ["Migration of master data: products, customers, vendors, GL, open orders, inventory.", "Standard integrations included; custom ones built on request.", "The 30-day free trial clock starts on go-live, not on signup.", "If by day 30 it isn't earning its keep - walk away. No contract, no invoice, no migration cost."]
    }],
    visual: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 220 160",
      style: {
        width: '100%',
        height: '100%'
      },
      preserveAspectRatio: "xMidYMid meet"
    }, /*#__PURE__*/React.createElement("line", {
      x1: "14",
      y1: "138",
      x2: "206",
      y2: "138",
      stroke: "var(--border)",
      strokeWidth: "1"
    }), [1, 2, 3, 4, 5, 6, 7].map(d => {
      const x = 18 + (d - 1) * 28;
      const isLast = d === 7;
      const heights = [30, 40, 50, 60, 70, 80, 100];
      const h = heights[d - 1];
      return /*#__PURE__*/React.createElement("g", {
        key: d
      }, /*#__PURE__*/React.createElement("rect", {
        x: x,
        y: 138 - h,
        width: "20",
        height: h,
        rx: "3",
        fill: isLast ? "var(--sg-blue)" : "var(--bg-alt)",
        stroke: isLast ? "none" : "var(--border)"
      }), /*#__PURE__*/React.createElement("text", {
        x: x + 10,
        y: "152",
        fontSize: "9",
        fill: isLast ? "var(--sg-blue)" : "var(--fg3)",
        textAnchor: "middle",
        fontWeight: isLast ? 700 : 500
      }, "D", d), isLast && /*#__PURE__*/React.createElement("text", {
        x: x + 10,
        y: 138 - h + 14,
        fontSize: "8",
        fill: "#fff",
        textAnchor: "middle",
        fontWeight: "700"
      }, "LIVE"));
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "194",
      cy: "22",
      r: "11",
      fill: "#10B981",
      opacity: "0.15"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "194",
      cy: "22",
      r: "6",
      fill: "#10B981",
      opacity: "0.3"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "194",
      cy: "22",
      r: "3",
      fill: "#10B981"
    }))
  }, {
    body: "No training. Text your factory like you text your team.",
    title: "Zero-training adoption.",
    details: [{
      kind: 'p',
      text: "Floor staff don't get a 50-page manual. There's nothing to learn. They text the system in plain English - same habit as iMessage, Slack, or Teams."
    }, {
      kind: 'p',
      text: "“Received 50 units red oak from Acme.” → System parses, matches the PO, updates inventory, fires triggers, confirms. Hank, our AI assistant, sits in the same chat ready for queries: “What's our cash position by buyer?” “Did the QC reject for Hampton go back?”"
    }, {
      kind: 'list',
      items: ["5 minutes to learn - most operators are productive on day one.", "Works on any device: phone, tablet, browser. No app installs.", "Plugs into your existing Slack, Teams, or SMS - no new tool to log into.", "Hank reads from the events ledger, so every answer comes with a timestamp and a name."]
    }],
    visual: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 220 160",
      style: {
        width: '100%',
        height: '100%'
      },
      preserveAspectRatio: "xMidYMid meet"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "64",
      y: "8",
      width: "92",
      height: "148",
      rx: "12",
      fill: "var(--fg1)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "68",
      y: "12",
      width: "84",
      height: "140",
      rx: "8",
      fill: "#FFFFFF"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "68",
      y: "12",
      width: "84",
      height: "14",
      rx: "8",
      fill: "var(--bg-alt)"
    }), /*#__PURE__*/React.createElement("text", {
      x: "110",
      y: "22",
      fontSize: "7",
      fill: "var(--fg1)",
      textAnchor: "middle",
      fontWeight: "600"
    }, "SimpleGrid"), /*#__PURE__*/React.createElement("rect", {
      x: "72",
      y: "32",
      width: "62",
      height: "26",
      rx: "8",
      fill: "#E9E9EB"
    }), /*#__PURE__*/React.createElement("text", {
      x: "76",
      y: "42",
      fontSize: "6",
      fill: "var(--fg1)"
    }, "Got 50 units of"), /*#__PURE__*/React.createElement("text", {
      x: "76",
      y: "50",
      fontSize: "6",
      fill: "var(--fg1)"
    }, "red oak from Acme"), /*#__PURE__*/React.createElement("text", {
      x: "76",
      y: "58",
      fontSize: "5",
      fill: "var(--fg3)"
    }, "10:42"), /*#__PURE__*/React.createElement("rect", {
      x: "86",
      y: "64",
      width: "62",
      height: "26",
      rx: "8",
      fill: "#007AFF"
    }), /*#__PURE__*/React.createElement("text", {
      x: "90",
      y: "74",
      fontSize: "6",
      fill: "#fff",
      fontWeight: "700"
    }, "\u2713 PO matched"), /*#__PURE__*/React.createElement("text", {
      x: "90",
      y: "82",
      fontSize: "6",
      fill: "#fff"
    }, "Inventory updated"), /*#__PURE__*/React.createElement("text", {
      x: "142",
      y: "90",
      fontSize: "5",
      fill: "var(--fg3)",
      textAnchor: "end"
    }, "Delivered"), /*#__PURE__*/React.createElement("rect", {
      x: "72",
      y: "96",
      width: "48",
      height: "14",
      rx: "7",
      fill: "#E9E9EB"
    }), /*#__PURE__*/React.createElement("text", {
      x: "76",
      y: "105",
      fontSize: "6",
      fill: "var(--fg1)"
    }, "Thanks!"), /*#__PURE__*/React.createElement("rect", {
      x: "72",
      y: "120",
      width: "76",
      height: "14",
      rx: "7",
      fill: "#fff",
      stroke: "var(--border)",
      strokeWidth: "0.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: "78",
      y: "129",
      fontSize: "5",
      fill: "var(--fg3)"
    }, "iMessage / SMS / Slack\u2026"), /*#__PURE__*/React.createElement("circle", {
      cx: "146",
      cy: "127",
      r: "5",
      fill: "#4A7BF7"
    }))
  }];
  React.useEffect(() => {
    if (!selected) return;
    const onKey = e => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selected]);
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-alt",
    id: "how-it-works"
  }, /*#__PURE__*/React.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: `
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
      `
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "HOW IT WORKS"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "From first call to a live system. 7 days."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--fg3)',
      marginTop: 8,
      letterSpacing: '0.04em'
    }
  }, "Tap any card to see how that step actually runs.")), /*#__PURE__*/React.createElement("div", {
    className: "hiw-grid"
  }, cards.map((c, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 80
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hiw-card",
    onClick: () => setSelected({
      ...c,
      num: i + 1
    }),
    "aria-label": `Step ${i + 1}: ${c.title}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "hiw-corner",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--fg3)",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "3 9 3 3 9 3"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "21 15 21 21 15 21"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hiw-visual"
  }, c.visual), /*#__PURE__*/React.createElement("p", {
    className: "hiw-body"
  }, c.body)))))), selected && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target === e.currentTarget) setSelected(null);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal hiw-modal",
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "hiw-modal-title"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hiw-close",
    onClick: () => setSelected(null),
    "aria-label": "Close"
  }, "\xD7"), /*#__PURE__*/React.createElement("div", {
    className: "hiw-step"
  }, "Step ", String(selected.num).padStart(2, '0')), /*#__PURE__*/React.createElement("h2", {
    id: "hiw-modal-title"
  }, selected.title), /*#__PURE__*/React.createElement("p", {
    className: "hiw-summary"
  }, selected.body), /*#__PURE__*/React.createElement("hr", null), selected.details.map((d, i) => {
    if (d.kind === 'p') return /*#__PURE__*/React.createElement("p", {
      key: i
    }, d.text);
    if (d.kind === 'list') return /*#__PURE__*/React.createElement("ul", {
      key: i
    }, d.items.map((it, j) => /*#__PURE__*/React.createElement("li", {
      key: j
    }, it)));
    return null;
  }))));
}
window.HowItWorks = HowItWorks;