function RadialBurst({
  palette
}) {
  // A dense 360° splatter of fine rays radiating from the centre, filling the
  // whole band. Tip nodes are small and "blink inward" - each diffuses to zero
  // and swells back on its own slow cycle. Colours come from `palette` (the
  // nature presets in BurstBand) and can change live without re-seeding.
  const DEFAULT = {
    deep: [36, 76, 173],
    bright: [46, 86, 198]
  };
  const pal = palette || DEFAULT;
  const palRef = React.useRef(pal);
  palRef.current = pal;
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
      // Dense splatter; trimmed on phones to hold ~5% CPU.
      const COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 130 : 220;
      for (let i = 0; i < COUNT; i++) {
        const a = Math.random() * Math.PI * 2; // full 360°
        const lenRatio = 0.32 + Math.random() * 0.72; // reach toward the corners
        const tone = Math.random();
        const baseAlpha = 0.4 + Math.random() * 0.45; // 0.4-0.85

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

        // Node "blink inward": diffuses to ~0 and swells back, each on its own cycle.
        const nodePhase = Math.random() * Math.PI * 2;
        const nodePeriod = 2.4 + Math.random() * 3.4;
        const nodeFreq = Math.PI * 2 / (nodePeriod * 60);
        const lw = 0.7 + Math.random() * 0.7; // fine lines
        const nodeSize = 1.1 + Math.random() * 1.4; // small tips
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
          nodePhase,
          nodeFreq,
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
        seed();
      }, 150);
    };
    window.addEventListener('resize', onResize);

    // Ray colour, lerped from the active palette's deep→bright. Read live from
    // palRef so a palette swap recolours the splatter without re-seeding.
    const lerp = (a, b, t) => Math.round(a + (b - a) * t);
    const lineRGBA = (tone, alpha) => {
      const p = palRef.current;
      const r = lerp(p.deep[0], p.bright[0], tone);
      const g = lerp(p.deep[1], p.bright[1], tone);
      const b = lerp(p.deep[2], p.bright[2], tone);
      return `rgba(${r},${g},${b},${alpha})`;
    };

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

    // Start the splatter 5s into its cycle - the first ~5s reads as the burst
    // "growing in"; skipping past it means it opens already settled and dense.
    let frame = 300;
    const draw = () => {
      if (!isVisible || !isTabActive) {
        animFrame = requestAnimationFrame(draw);
        return;
      }
      const w = W(),
        h = H();
      const cx = w / 2;
      const cy = h / 2; // origin at centre - splatter radiates the full 360°
      const reach = Math.sqrt(w * w + h * h) / 2; // far corner
      ctx.clearRect(0, 0, w, h);
      const p = palRef.current;
      lines.forEach(l => {
        // Breathing on opacity (±15% - visible but soft)
        const breath = 0.85 + 0.15 * Math.sin(frame * l.freq + l.phase);
        const alpha = l.baseAlpha * breath;

        // Sway: angle drifts ±swayAmp over the sway period
        const angleNow = l.a + l.swayAmp * Math.sin(frame * l.swayFreq + l.swayPhase);
        const lenMul = 1 + 0.03 * Math.sin(frame * l.lenFreq + l.lenPhase);
        const len = reach * l.lenRatio * lenMul;
        const x = cx + Math.cos(angleNow) * len;
        const y = cy + Math.sin(angleNow) * len;

        // Line: gradient from origin (transparent) → tip (full color)
        const g = ctx.createLinearGradient(cx, cy, x, y);
        g.addColorStop(0, lineRGBA(l.tone, 0));
        g.addColorStop(0.55, lineRGBA(l.tone, alpha * 0.4));
        g.addColorStop(1, lineRGBA(l.tone, alpha * 0.8));
        ctx.strokeStyle = g;
        ctx.lineWidth = l.lw;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Tip node blinks inward: diffuses to 0, then swells back to full.
        const pulse = (1 - Math.cos(frame * l.nodeFreq + l.nodePhase)) / 2; // 0..1
        const nodeAlpha = pulse * pulse * 0.9; // sharp at the peak, gone at the trough
        if (nodeAlpha > 0.01) {
          const nodeRadius = l.nodeSize * (0.15 + 0.85 * pulse);
          ctx.fillStyle = `rgba(${p.bright[0]},${p.bright[1]},${p.bright[2]},${nodeAlpha})`;
          ctx.beginPath();
          ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
          ctx.fill();
        }
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
  }, []);

  // Soft radial vignette so the splatter feathers into the section edges.
  const mask = 'radial-gradient(circle at center, #000 58%, rgba(0,0,0,0.25) 100%)';
  // Backdrop: a strong colour core at the centre that eases out to white, so the
  // middle of the burst reads dense and the edges stay light.
  const [bR, bG, bB] = pal.bright;
  // Dark palettes (Night) stay pitch black - no backdrop glow, so the only
  // colour on screen comes from the rays themselves.
  const backdrop = pal.dark ? 'none' : `radial-gradient(circle at center, rgba(${bR},${bG},${bB},0.34) 0%, rgba(${bR},${bG},${bB},0.18) 18%, rgba(${bR},${bG},${bB},0.06) 42%, rgba(255,255,255,0) 70%)`;
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

// Nature presets for the splatter. `deep`/`bright` are the ray gradient
// endpoints and `bg` is the band background - white for all but Night, which
// goes dark with a blue burst.
const BURST_PALETTES = [{
  name: 'Ocean',
  deep: [36, 76, 173],
  bright: [46, 86, 198],
  bg: '#fff',
  icon: '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1C7 13 7 11 9.5 11c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1C7 19 7 17 9.5 17c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>'
}, {
  name: 'Sky',
  deep: [14, 116, 200],
  bright: [56, 189, 248],
  bg: '#fff',
  icon: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>'
}, {
  name: 'Lagoon',
  deep: [15, 118, 110],
  bright: [45, 212, 191],
  bg: '#fff',
  icon: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>'
}, {
  name: 'Forest',
  deep: [6, 59, 40],
  bright: [21, 128, 61],
  bg: '#fff',
  icon: '<path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7Z"/><path d="M12 22v-3"/>'
}, {
  name: 'Sunset',
  deep: [194, 65, 12],
  bright: [251, 146, 60],
  bg: '#fff',
  icon: '<path d="M12 10V2"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m16 6-4 4-4-4"/><path d="M16 18a4 4 0 0 0-8 0"/>'
}, {
  name: 'Sunrise',
  deep: [180, 83, 9],
  bright: [251, 191, 36],
  bg: '#fff',
  icon: '<path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 6 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/>'
}, {
  name: 'Mountain',
  deep: [51, 65, 85],
  bright: [148, 163, 184],
  bg: '#fff',
  icon: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>'
}, {
  name: 'Night',
  deep: [29, 78, 240],
  bright: [80, 150, 255],
  bg: '#000',
  dark: true,
  icon: '<path d="M12 3a6.4 6.4 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M18.5 3.5v3"/><path d="M17 5h3"/>'
}];

// A small nature icon (waves, pine, sun...) in the palette's own colour, used
// both on the picker button and in each menu row.
function BurstIcon({
  p,
  size
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: `rgb(${p.bright[0]},${p.bright[1]},${p.bright[2]})`,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      flexShrink: 0
    },
    dangerouslySetInnerHTML: {
      __html: p.icon
    }
  });
}

// Standalone burst band between the "Why ERP Keeps Failing" and "Selective
// Onboarding" sections. The splatter fills the whole section; a top-right
// dropdown (default Ocean) recolours it live, each option icon-tagged.
function BurstBand() {
  const [idx, setIdx] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(-1);
  const menuRef = React.useRef(null);
  const pal = BURST_PALETTES[idx];
  React.useEffect(() => {
    if (!open) return;
    const onDoc = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);
  return /*#__PURE__*/React.createElement("section", {
    className: "burst-band",
    style: {
      position: 'relative',
      overflow: 'hidden',
      height: 'calc(85dvh - 52px)',
      minHeight: 'calc(85vh - 52px)',
      background: pal.bg,
      transition: 'background 200ms ease'
    }
  }, /*#__PURE__*/React.createElement(RadialBurst, {
    palette: pal
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    className: "burst-fade-top",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: '46%',
      background: `linear-gradient(180deg, ${pal.bg} 0%, color-mix(in srgb, ${pal.bg} 85%, transparent) 28%, color-mix(in srgb, ${pal.bg} 40%, transparent) 62%, transparent 100%)`,
      pointerEvents: 'none',
      zIndex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    className: "burst-fade-bottom",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '46%',
      background: `linear-gradient(0deg, ${pal.bg} 0%, color-mix(in srgb, ${pal.bg} 85%, transparent) 28%, color-mix(in srgb, ${pal.bg} 40%, transparent) 62%, transparent 100%)`,
      pointerEvents: 'none',
      zIndex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    className: "burst-picker",
    style: {
      position: 'absolute',
      top: 18,
      right: 18,
      zIndex: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(o => !o),
    "aria-haspopup": "listbox",
    "aria-expanded": open,
    "aria-label": `Splatter colour: ${pal.name}`,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      padding: '8px 12px',
      borderRadius: 10,
      cursor: 'pointer',
      background: 'rgba(255,255,255,0.82)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      border: '1px solid var(--border)',
      boxShadow: '0 6px 20px rgba(15,20,25,0.08)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--fg1)'
    }
  }, /*#__PURE__*/React.createElement(BurstIcon, {
    p: pal,
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 60,
      textAlign: 'left'
    }
  }, pal.name), /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform 160ms'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }))), open && /*#__PURE__*/React.createElement("ul", {
    role: "listbox",
    "aria-label": "Splatter colour",
    style: {
      position: 'absolute',
      top: 'calc(100% + 6px)',
      right: 0,
      margin: 0,
      padding: 6,
      listStyle: 'none',
      minWidth: 170,
      borderRadius: 12,
      background: 'rgba(255,255,255,0.96)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid var(--border)',
      boxShadow: '0 14px 36px rgba(15,20,25,0.16)'
    }
  }, BURST_PALETTES.map((p, i) => /*#__PURE__*/React.createElement("li", {
    key: p.name,
    role: "option",
    "aria-selected": i === idx,
    onClick: () => {
      setIdx(i);
      setOpen(false);
    },
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(-1),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 10px',
      borderRadius: 8,
      cursor: 'pointer',
      fontSize: 13,
      fontWeight: i === idx ? 700 : 500,
      color: 'var(--fg1)',
      background: i === idx ? 'var(--bg-alt)' : i === hover ? 'rgba(0,0,0,0.04)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement(BurstIcon, {
    p: p,
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, p.name), i === idx && /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--sg-blue)",
    strokeWidth: "2.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5"
  })))))));
}
window.BurstBand = BurstBand;
function CycleHeadline() {
  const HEADLINES = [
  /*#__PURE__*/
  // Single headline; rotation removed by request.
  React.createElement(React.Fragment, {
    key: "b"
  }, "Custom ERP. Built at our risk.", /*#__PURE__*/React.createElement("br", null), "Paid for after it works.")];
  // Each tile fades smoothly; staggering them by (x+y)*delay gives a diagonal
  // sweep that visually "breaks" the headline into checkboxes and reassembles.
  const TX = 8,
    TY = 3;
  const TILES = React.useMemo(() => Array.from({
    length: TX * TY
  }, (_, idx) => {
    const x = idx % TX,
      y = Math.floor(idx / TX);
    return {
      idx,
      delay: (x + y) * 70
    };
  }), []);
  // Primary (index 0) holds 10s; the rest hold 3s each.
  const holdFor = idx => idx === 0 ? 10000 : 3000;
  const TRANSITION = 1300; // tile sweep duration
  const [i, setI] = React.useState(0);
  const [phase, setPhase] = React.useState('reveal'); // 'reveal' = tiles transparent (text visible), 'cover' = tiles opaque (text hidden)
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (HEADLINES.length <= 1) return;
    const cover = setTimeout(() => setPhase('cover'), holdFor(i));
    const swap = setTimeout(() => {
      setI(x => (x + 1) % HEADLINES.length);
      setPhase('reveal');
    }, holdFor(i) + TRANSITION);
    return () => {
      clearTimeout(cover);
      clearTimeout(swap);
    };
  }, [i]);
  return /*#__PURE__*/React.createElement("div", {
    className: 'hero-title-stage hero-title-' + phase
  }, /*#__PURE__*/React.createElement("h1", {
    className: "hero-title"
  }, HEADLINES[i]), /*#__PURE__*/React.createElement("div", {
    className: "hero-title-tiles",
    "aria-hidden": "true"
  }, TILES.map(t => /*#__PURE__*/React.createElement("span", {
    key: t.idx,
    className: "hero-title-tile",
    style: {
      transitionDelay: t.delay + 'ms'
    }
  }))));
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
    strokeLinejoin: "round",
    "aria-hidden": "true"
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
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-inner"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(CycleHeadline, null)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("p", {
    className: "hero-sub"
  }, "We don't sell software. We build a custom ERP that fits how your factory actually runs - your stages, your contractors, your approvals, your costing logic. We carry the cost and the risk of the build. You run it for 30 days on your real floor. If it doesn't move the business, you walk. We earn nothing.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 400
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-cta"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "data-cta": "hero",
    className: "btn btn-lg btn-invite",
    style: {
      boxShadow: '0 0 0 0 rgba(74,123,247,0.28), 0 6px 20px rgba(74,123,247,0.10)',
      animation: 'sgBuildPulse 1.8s ease-in-out infinite',
      opacity: 0.85
    },
    onClick: () => {
      setShowInvite(true);
      window.sgTrack && window.sgTrack('cta_clicked', {
        location: 'hero'
      });
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
  })), "Book a demo")))), /*#__PURE__*/React.createElement(Reveal, {
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
  }, /*#__PURE__*/React.createElement("span", null, "30"), /*#__PURE__*/React.createElement("span", {
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
  // Brand-color SVGs from Simple Icons (CC0). The Amazon glyph was previously
  // just the smile arc - replaced with the full Simple Icons Amazon path so the
  // wordmark + smile both render.
  const items = [{
    name: 'WhatsApp',
    color: '#25D366',
    path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413'
  }, {
    name: 'Slack',
    color: '#4A154B',
    path: 'M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z'
  }, {
    name: 'Gmail',
    color: '#EA4335',
    path: 'M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z'
  }, {
    name: 'Excel',
    color: '#217346',
    path: 'M23.546 1.785H7.93v3.43H0v13.572h7.93v3.428h15.616A.45.45 0 0 0 24 21.764V2.236a.45.45 0 0 0-.454-.451zm-12.16 14.193l-1.998-3.51-1.7 3.255H4.992l3.103-4.937L5.027 5.85h2.768l1.764 3.337L11.357 5.85h2.696l-2.999 5.06 3.108 4.94zm10.875 1.85h-7.95V13.51h2.997v-1.78h-2.997V9.95h2.997V8.16h-2.997V6.376h7.95z'
  }, {
    name: 'Google Sheets',
    color: '#34A853',
    path: 'M11.318 12.545H7.91v-1.909h3.41v1.91zM14.728 0v6h6zm-3.41 8.727H7.91v1.909h3.41V8.727zm1.227 3.818v-1.909h3.41v1.91zm0-3.818v1.909h3.41V8.727zM19.5 24H4.5C3.12 24 2 22.88 2 21.5v-19C2 1.12 3.12 0 4.5 0H14v6h6v15.5c0 1.38-1.12 2.5-2.5 2.5zM18 7.5H6v9h12z'
  }, {
    name: 'QuickBooks',
    color: '#2CA01C',
    path: 'M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm.642 4.1335c.9554 0 1.7296.776 1.7296 1.7332v9.0667h1.6c1.614 0 2.9275-1.3156 2.9275-2.933 0-1.6173-1.3136-2.9333-2.9276-2.9333h-.6654V7.3334h.6654c2.5722 0 4.6577 2.0897 4.6577 4.667 0 2.5774-2.0855 4.6666-4.6577 4.6666H12.642zM7.9837 7.333h3.3291v12.533c-.9555 0-1.73-.7759-1.73-1.7332V9.0662H7.9837c-1.6146 0-2.9277 1.316-2.9277 2.9334 0 1.6175 1.3131 2.9333 2.9277 2.9333h.6654v1.7332h-.6654c-2.5725 0-4.6577-2.0892-4.6577-4.6665 0-2.5771 2.0852-4.6666 4.6577-4.6666Z'
  }, {
    name: 'Tally',
    color: '#D43A2F',
    path: 'M3 3h3v18H3zM10 3h3v18h-3zM17 3h4v18h-4z'
  }, {
    name: 'Shopify',
    color: '#95BF47',
    path: 'M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z'
  }, {
    name: 'Amazon',
    color: '#FF9900',
    path: 'M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.051-.13zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.912-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.46-.35.27-.575.63-.675 1.096-.06.3-.206.465-.435.51l-2.52-.315c-.248-.06-.372-.18-.372-.39 0-.046.007-.09.022-.15.247-1.29.855-2.25 1.82-2.88.976-.616 2.1-.975 3.39-1.05h.54c1.65 0 2.957.434 3.888 1.29.135.15.27.3.405.48.12.165.224.314.283.45.075.134.15.33.195.57.06.254.105.42.135.51.03.104.062.3.076.615.01.313.02.493.02.553v5.28c0 .376.06.72.165 1.036.105.313.21.54.315.674l.51.674c.09.136.136.256.136.36 0 .12-.06.226-.18.314-1.2 1.05-1.86 1.62-1.963 1.71-.165.135-.375.15-.63.045a6.062 6.062 0 01-.526-.496l-.31-.347a9.391 9.391 0 01-.317-.42l-.3-.435c-.81.886-1.603 1.44-2.4 1.665-.494.15-1.093.227-1.83.227-1.11 0-2.04-.343-2.76-1.034-.72-.69-1.08-1.665-1.08-2.94l-.05-.076zm3.753-.438c0 .566.14 1.02.425 1.364.285.34.675.512 1.155.512.045 0 .106-.007.195-.02.09-.016.134-.023.166-.023.614-.16 1.08-.553 1.424-1.178.165-.28.285-.58.36-.91.09-.32.12-.59.135-.8.015-.195.015-.54.015-1.005v-.54c-.84 0-1.484.06-1.92.18-1.275.36-1.92 1.17-1.92 2.43l-.035-.02zm9.162 7.027c.03-.06.075-.11.132-.17.362-.243.714-.41 1.05-.5a8.094 8.094 0 011.612-.24c.14-.012.28 0 .41.03.65.06 1.05.168 1.172.33.063.09.099.228.099.39v.15c0 .51-.149 1.11-.424 1.8-.278.69-.664 1.248-1.156 1.68-.073.06-.14.09-.197.09-.03 0-.06 0-.09-.012-.09-.044-.107-.12-.064-.24.54-1.26.806-2.143.806-2.64 0-.15-.03-.27-.087-.344-.145-.166-.55-.257-1.224-.257-.243 0-.533.016-.87.046-.363.045-.7.09-1 .135-.09 0-.148-.014-.18-.044-.03-.03-.036-.047-.02-.077 0-.017.006-.03.02-.063v-.06z'
  }, {
    name: 'ShipStation',
    color: '#0099FF',
    path: 'M3 16.2c0-.4.3-.7.7-.7H22c.4 0 .7.3.7.7v.5c0 .4-.3.7-.7.7H3.7c-.4 0-.7-.3-.7-.7zM3 19.4h19c.4 0 .7.3.7.7v.5c0 .4-.3.7-.7.7H3.7c-.4 0-.7-.3-.7-.7v-.5c0-.4.3-.7.7-.7zM3 12.3c0-.4.3-.7.7-.7h13.6c.4 0 .7.3.7.7v.5c0 .4-.3.7-.7.7H3.7c-.4 0-.7-.3-.7-.7zM3 8.4c0-.4.3-.7.7-.7h10c.4 0 .7.3.7.7v.5c0 .4-.3.7-.7.7H3.7c-.4 0-.7-.3-.7-.7zM3 4.5c0-.4.3-.7.7-.7H22c.4 0 .7.3.7.7V5c0 .4-.3.7-.7.7H3.7c-.4 0-.7-.3-.7-.7z'
  }];
  // Two copies of the list so the CSS marquee loops seamlessly.
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
    title: it.name
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: it.path,
    fill: it.color
  })), /*#__PURE__*/React.createElement("span", null, it.name))))));
}
window.IntegrationsBar = IntegrationsBar;
function TrustStrip() {
  // Slim "Recognized by" strip - lives just below the hero so above-fold
  // visitors see real third-party validation. Duplicated in the footer
  // (intentional - footer is the catalog, this is the hero proof).
  const prefix = typeof window !== 'undefined' && window.__SG_BLOG_ASSET_PREFIX__ || '';
  return /*#__PURE__*/React.createElement("div", {
    "aria-label": "Recognized by",
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 24,
      padding: '14px 24px',
      flexWrap: 'wrap',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg-alt)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--fg3)'
    }
  }, "Recognized by"), /*#__PURE__*/React.createElement("a", {
    href: "https://www.nvidia.com/en-us/startups/",
    target: "_blank",
    rel: "noopener noreferrer",
    title: "NVIDIA Inception Program member",
    "data-cta": "trust_nvidia",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: 28,
      opacity: 0.85
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: prefix + 'assets/nvidia-inception.png',
    alt: "NVIDIA Inception Program member",
    width: "84",
    height: "26",
    loading: "lazy",
    decoding: "async",
    style: {
      display: 'block',
      height: 26,
      width: 'auto'
    }
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://aws.amazon.com/startups/",
    target: "_blank",
    rel: "noopener noreferrer",
    title: "AWS Activate Startups member",
    "data-cta": "trust_aws",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 28,
      opacity: 0.85,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "44",
    height: "26",
    viewBox: "0 0 304 182",
    "aria-hidden": "true",
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#252F3E",
    d: "M86.4 66.4c0 3.7.4 6.7 1.1 8.9.8 2.2 1.8 4.6 3.2 7.2.5.8.7 1.6.7 2.3 0 1-.6 2-1.9 3l-6.3 4.2c-.9.6-1.8.9-2.6.9-1 0-2-.5-3-1.4C76.2 90 75 88.4 74 86.8c-1-1.7-2-3.6-3.1-5.9-7.8 9.2-17.6 13.8-29.4 13.8-8.4 0-15.1-2.4-20-7.2-4.9-4.8-7.4-11.2-7.4-19.2 0-8.5 3-15.4 9.1-20.6 6.1-5.2 14.2-7.8 24.5-7.8 3.4 0 6.9.3 10.6.8 3.7.5 7.5 1.3 11.5 2.2v-7.3c0-7.6-1.6-12.9-4.7-16-3.2-3.1-8.6-4.6-16.3-4.6-3.5 0-7.1.4-10.8 1.3-3.7.9-7.3 2-10.8 3.4-1.6.7-2.8 1.1-3.5 1.3-.7.2-1.2.3-1.6.3-1.4 0-2.1-1-2.1-3.1v-4.9c0-1.6.2-2.8.7-3.5.5-.7 1.4-1.4 2.8-2.1 3.5-1.8 7.7-3.3 12.6-4.5C41 1.9 46.2 1.3 51.7 1.3c11.9 0 20.6 2.7 26.2 8.1 5.5 5.4 8.3 13.6 8.3 24.6v32.4h.2zM45.8 81.6c3.3 0 6.7-.6 10.3-1.8 3.6-1.2 6.8-3.4 9.5-6.4 1.6-1.9 2.8-4 3.4-6.4.6-2.4 1-5.3 1-8.7v-4.2c-2.9-.7-6-1.3-9.2-1.7-3.2-.4-6.3-.6-9.4-.6-6.7 0-11.6 1.3-14.9 4-3.3 2.7-4.9 6.5-4.9 11.5 0 4.7 1.2 8.2 3.7 10.6 2.4 2.5 5.9 3.7 10.5 3.7zm80.3 10.8c-1.8 0-3-.3-3.8-1-.8-.6-1.5-2-2.1-3.9L96.7 10.2c-.6-2-.9-3.3-.9-4 0-1.6.8-2.5 2.4-2.5h9.8c1.9 0 3.2.3 3.9 1 .8.6 1.4 2 2 3.9l16.8 66.2 15.6-66.2c.5-2 1.1-3.3 1.9-3.9.8-.6 2.2-1 4-1h8c1.9 0 3.2.3 4 1 .8.6 1.5 2 1.9 3.9l15.8 67 17.3-67c.6-2 1.3-3.3 2-3.9.8-.6 2.1-1 3.9-1h9.3c1.6 0 2.5.8 2.5 2.5 0 .5-.1 1-.2 1.6-.1.6-.3 1.4-.7 2.5l-24.1 77.3c-.6 2-1.3 3.3-2.1 3.9-.8.6-2.1 1-3.8 1h-8.6c-1.9 0-3.2-.3-4-1-.8-.7-1.5-2-1.9-4L156 23l-15.4 64.4c-.5 2-1.1 3.3-1.9 4-.8.7-2.2 1-4 1h-8.6zm128.5 2.7c-5.2 0-10.4-.6-15.4-1.8-5-1.2-8.9-2.5-11.5-4-1.6-.9-2.7-1.9-3.1-2.8-.4-.9-.6-1.9-.6-2.8v-5.1c0-2.1.8-3.1 2.3-3.1.6 0 1.2.1 1.8.3.6.2 1.5.6 2.5 1 3.4 1.5 7.1 2.7 11 3.5 4 .8 7.9 1.2 11.9 1.2 6.3 0 11.2-1.1 14.6-3.3 3.4-2.2 5.2-5.4 5.2-9.5 0-2.8-.9-5.1-2.7-7-1.8-1.9-5.2-3.6-10.1-5.2L246 52c-7.3-2.3-12.7-5.7-16-10.2-3.3-4.4-5-9.3-5-14.5 0-4.2.9-7.9 2.7-11.1 1.8-3.2 4.2-6 7.2-8.2 3-2.3 6.4-4 10.4-5.2 4-1.2 8.2-1.7 12.6-1.7 2.2 0 4.5.1 6.7.4 2.3.3 4.4.7 6.5 1.1 2 .5 3.9 1 5.7 1.6 1.8.6 3.2 1.2 4.2 1.8 1.4.8 2.4 1.6 3 2.5.6.8.9 1.9.9 3.3v4.7c0 2.1-.8 3.2-2.3 3.2-.8 0-2.1-.4-3.8-1.2-5.7-2.6-12.1-3.9-19.2-3.9-5.7 0-10.2.9-13.3 2.8-3.1 1.9-4.7 4.8-4.7 8.9 0 2.8 1 5.2 3 7.1 2 1.9 5.7 3.8 11 5.5l14.2 4.5c7.2 2.3 12.4 5.5 15.5 9.6 3.1 4.1 4.6 8.8 4.6 14 0 4.3-.9 8.2-2.6 11.6-1.8 3.4-4.2 6.4-7.3 8.8-3.1 2.5-6.8 4.3-11.1 5.6-4.5 1.4-9.2 2.1-14.3 2.1z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FF9900",
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M273.5 143.7c-32.9 24.3-80.7 37.2-121.8 37.2-57.6 0-109.5-21.3-148.7-56.7-3.1-2.8-.3-6.6 3.4-4.4 42.4 24.6 94.7 39.5 148.8 39.5 36.5 0 76.6-7.6 113.5-23.2 5.5-2.5 10.2 3.6 4.8 7.6z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FF9900",
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M287.2 128.1c-4.2-5.4-27.8-2.6-38.5-1.3-3.2.4-3.7-2.4-.8-4.5 18.8-13.2 49.7-9.4 53.3-5 3.6 4.5-1 35.4-18.6 50.2-2.7 2.3-5.3 1.1-4.1-1.9 4-9.9 12.9-32.2 8.7-37.5z"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--fg2)'
    }
  }, "Activate Startups")));
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
          if (step >= 3) clearInterval(t);
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
    b: 'Six figures, often before you see a working screen. Three possible systems come out. You only find out which one you got after the check clears.',
    footer: 'With SimpleGrid, you see and use it first. Then you pay.',
    visual: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 400 200",
      style: {
        width: '100%',
        height: 'auto',
        display: 'block'
      },
      "aria-hidden": "true"
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
      color: '#374151',
      sub: 'project shelved'
    }, {
      y: 100,
      l1: 'Half-working',
      l2: 'system',
      color: '#374151',
      sub: 'forced into modules'
    }, {
      y: 164,
      l1: 'Fully working',
      l2: 'system',
      color: '#374151',
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
      },
      "aria-hidden": "true"
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
      fill: "#3461E0",
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
      fill: "#9CA3AF",
      style: {
        transformOrigin: '20px 146px',
        animation: 'sg-grow-c 3s ease-out infinite'
      }
    }), /*#__PURE__*/React.createElement("text", {
      x: "214",
      y: "150",
      fontSize: "11",
      fill: "#6B7280",
      fontWeight: "700"
    }, "\u2190 Growth Stalls"), /*#__PURE__*/React.createElement("style", null, `@keyframes sg-grow-b{0%{transform:scaleX(0)}60%,100%{transform:scaleX(1)}}@keyframes sg-grow-c{0%{transform:scaleX(0)}50%,100%{transform:scaleX(1)}}@keyframes sg-fade-b{0%,60%{opacity:0}75%,100%{opacity:1}}`))
  }, {
    n: '03',
    t: 'UI built for you, not for everyone',
    b: 'Other ERPs feel complex because they are built for a thousand businesses at once - seven tabs, twelve fields. Yours has only what your floor needs. Nothing extra, nothing you do not want.',
    footer: 'The ERP slows the floor, so teams go around it.',
    visual: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 400 200",
      style: {
        width: '100%',
        height: 'auto',
        display: 'block'
      },
      "aria-hidden": "true"
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
      fill: "#3461E0"
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
    className: "section",
    style: {
      paddingTop: 44,
      paddingBottom: 44
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      marginBottom: 0
    }
  }, "WHY ERP KEEPS FAILING MID-MARKET"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "Every ERP vendor makes you pay first and hope it works. We flipped it. Why are you buying ERP that way?")), /*#__PURE__*/React.createElement("div", {
    className: "problem-grid",
    style: {
      marginTop: 14
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
      padding: 16,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--sg-blue)',
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
      margin: '0 0 10px'
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
      marginTop: 12,
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--fg3)',
      fontStyle: 'italic',
      opacity: activeChatStep >= 3 ? 1 : 0.2,
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
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--sg-blue').trim() || '#3461E0';
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
  }, "Our senior engineers and deployment leads are on every deployment. We run tight to keep the experience exceptional."))), /*#__PURE__*/React.createElement(Reveal, {
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
  })), "Book a demo"), /*#__PURE__*/React.createElement("div", {
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
    body: "A real 3-hour conversation with our team. We map your core workflows.",
    title: "A live video call with the team that builds it.",
    details: [{
      kind: 'p',
      text: "Day 1 is a 3-hour live video call with our senior engineers and lead deployment expert - not a sales rep, not an SDR. We walk through your operations from order intake to dispatch: how orders come in, who approves what, your production stages, vendor relationships, QC rules, dispatch, and the exceptions every floor has."
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
      preserveAspectRatio: "xMidYMid meet",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "22",
      cy: "36",
      r: "11",
      fill: "#3461E0"
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
      preserveAspectRatio: "xMidYMid meet",
      "aria-hidden": "true"
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
      preserveAspectRatio: "xMidYMid meet",
      "aria-hidden": "true"
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
      fill: "#3461E0"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "11",
      y: "-1",
      width: "50",
      height: "13",
      rx: "3",
      fill: "#3461E0"
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
      preserveAspectRatio: "xMidYMid meet",
      "aria-hidden": "true"
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
      preserveAspectRatio: "xMidYMid meet",
      "aria-hidden": "true"
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
      fill: "#3461E0"
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
        /* Full-viewport section, sized like the hero, content centered. */
        #how-it-works{min-height:calc(100vh - 64px);display:flex;flex-direction:column;justify-content:center}
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
    strokeLinejoin: "round",
    "aria-hidden": "true"
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