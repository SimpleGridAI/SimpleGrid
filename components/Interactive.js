// Interactive elements and animations for the site

// ===== ParticleCloud =====
// Soft drifting dust-mote field. Strict palette: SG-blue / teal / dark blue / muted purple.
// Dots cluster (gaussian) around section center, orbit in small ellipses, opacity pulses.
// Reusable as section background. Sits behind content via pointer-events:none + zIndex 0.
function ParticleCloud({
  density,
  showArcs = true
}) {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame,
      particles = [],
      arcs = [],
      resizeTimeout;
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

    // Gaussian random via Box-Muller
    const gauss = () => {
      let u = 0,
        v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    };
    const countForViewport = () => {
      if (density === 'low') return 175;
      if (density === 'high') return 600;
      const w = W();
      if (w >= 1024) return 500;
      if (w >= 640) return 300;
      return 175;
    };

    // Strict palette: 50% SG blue · 25% teal · 15% dark blue · 10% muted purple
    const pickColor = () => {
      const r = Math.random();
      if (r < 0.50) return {
        rgb: '74,123,247',
        alpha: 0.4 + Math.random() * 0.4
      };
      if (r < 0.75) return {
        rgb: '14,165,233',
        alpha: 0.3 + Math.random() * 0.3
      };
      if (r < 0.90) return {
        rgb: '52,97,209',
        alpha: 0.5 + Math.random() * 0.4
      };
      return {
        rgb: '124,58,237',
        alpha: 0.2 + Math.random() * 0.2
      };
    };
    const seed = () => {
      particles = [];
      const w = W(),
        h = H();
      const cx = w / 2,
        cy = h / 2;
      const sigmaX = w * 0.32;
      const sigmaY = h * 0.32;
      const count = countForViewport();
      for (let i = 0; i < count; i++) {
        const gx = Math.max(-2.5, Math.min(2.5, gauss()));
        const gy = Math.max(-2.5, Math.min(2.5, gauss()));
        const homeX = cx + gx * sigmaX;
        const homeY = cy + gy * sigmaY;
        const radius = Math.random() < 0.10 ? 3 + Math.random() : 1 + Math.random();
        const color = pickColor();
        const orbitPeriod = 8 + Math.random() * 12;
        const orbitSpeed = Math.PI * 2 / (orbitPeriod * 60);
        const orbitRadius = 3 + Math.random() * 12;
        const orbitPhase = Math.random() * Math.PI * 2;
        const orbitAspect = 0.6 + Math.random() * 0.6;
        const pulsePeriod = 4 + Math.random() * 4;
        const pulseSpeed = Math.PI * 2 / (pulsePeriod * 60);
        const pulsePhase = Math.random() * Math.PI * 2;
        particles.push({
          homeX,
          homeY,
          radius,
          rgb: color.rgb,
          baseAlpha: color.alpha,
          orbitRadius,
          orbitSpeed,
          orbitPhase,
          orbitAspect,
          pulseSpeed,
          pulsePhase
        });
      }
      arcs = [];
      if (showArcs) {
        const numArcs = 2 + Math.floor(Math.random() * 2);
        for (let i = 0; i < numArcs; i++) {
          const x1 = cx + (Math.random() - 0.5) * w * 0.75;
          const y1 = cy + (Math.random() - 0.4) * h * 0.55;
          const x2 = cx + (Math.random() - 0.5) * w * 0.75;
          const y2 = cy + (Math.random() - 0.4) * h * 0.55;
          const cpx = (x1 + x2) / 2 + (Math.random() - 0.5) * w * 0.35;
          const cpy = Math.min(y1, y2) - h * (0.10 + Math.random() * 0.20);
          arcs.push({
            x1,
            y1,
            x2,
            y2,
            cpx,
            cpy,
            phase: Math.random() * Math.PI * 2
          });
        }
      }
    };
    seed();
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        seed();
      }, 200);
    };
    window.addEventListener('resize', onResize);
    let frame = 0;
    const draw = () => {
      const w = W(),
        h = H();
      ctx.clearRect(0, 0, w, h);
      arcs.forEach(arc => {
        const alpha = 0.10 + 0.05 * Math.sin(frame * 0.003 + arc.phase);
        ctx.strokeStyle = `rgba(74,123,247,${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(arc.x1, arc.y1);
        ctx.quadraticCurveTo(arc.cpx, arc.cpy, arc.x2, arc.y2);
        ctx.stroke();
      });
      particles.forEach(p => {
        const orbitAngle = p.orbitPhase + frame * p.orbitSpeed;
        const x = p.homeX + Math.cos(orbitAngle) * p.orbitRadius;
        const y = p.homeY + Math.sin(orbitAngle) * p.orbitRadius * p.orbitAspect;
        const pulse = 0.6 + 0.4 * (Math.sin(frame * p.pulseSpeed + p.pulsePhase) * 0.5 + 0.5);
        const alpha = p.baseAlpha * pulse;
        ctx.fillStyle = `rgba(${p.rgb},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, p.radius, 0, Math.PI * 2);
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
  }, [density, showArcs]);
  return /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0
    }
  });
}
window.ParticleCloud = ParticleCloud;

// Scroll-triggered number counter
function AnimatedNumber({
  value,
  suffix = '',
  prefix = '',
  duration = 1500
}) {
  const ref = React.useRef(null);
  const [display, setDisplay] = React.useState('0');
  const [started, setStarted] = React.useState(false);
  React.useEffect(() => {
    let timer = null;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        const numVal = parseFloat(value.toString().replace(/[^0-9.]/g, ''));
        const isDecimal = value.toString().includes('.');
        const startTime = Date.now();
        timer = setInterval(() => {
          const progress = Math.min((Date.now() - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = numVal * eased;
          setDisplay(isDecimal ? current.toFixed(1) : Math.round(current).toLocaleString());
          if (progress >= 1) clearInterval(timer);
        }, 16);
      }
    }, {
      threshold: 0.5
    });
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [started]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref
  }, prefix, display, suffix);
}
window.AnimatedNumber = AnimatedNumber;

// Scroll reveal wrapper
function Reveal({
  children,
  delay = 0
}) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.15
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.6s cubic-bezier(0.2,0.8,0.2,1) ${delay}ms, transform 0.6s cubic-bezier(0.2,0.8,0.2,1) ${delay}ms`
    }
  }, children);
}
window.Reveal = Reveal;

// Interactive tab component
function InteractiveTabs({
  tabs
}) {
  const [active, setActive] = React.useState(0);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      marginBottom: 24,
      borderBottom: '1px solid var(--border)',
      paddingBottom: 0
    }
  }, tabs.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setActive(i),
    style: {
      padding: '10px 18px',
      fontSize: 14,
      fontWeight: 600,
      fontFamily: 'var(--font-body)',
      color: active === i ? 'var(--sg-blue)' : 'var(--fg3)',
      background: 'none',
      border: 'none',
      borderBottom: active === i ? '2px solid var(--sg-blue)' : '2px solid transparent',
      cursor: 'pointer',
      transition: 'all 180ms',
      marginBottom: -1
    }
  }, t.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 200
    }
  }, tabs[active] && tabs[active].content));
}
window.InteractiveTabs = InteractiveTabs;

// Animated flow line between elements
function FlowLine({
  steps
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      justifyContent: 'center',
      margin: '32px 0',
      flexWrap: 'wrap'
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 20px',
      background: s.highlight ? 'var(--sg-blue)' : '#fff',
      color: s.highlight ? '#fff' : 'var(--fg1)',
      border: s.highlight ? 'none' : '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      fontSize: 13,
      fontWeight: 600,
      fontFamily: 'var(--font-heading)',
      whiteSpace: 'nowrap'
    }
  }, s.label), i < steps.length - 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "12",
    viewBox: "0 0 20 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 6h16M12 1l5 5-5 5",
    fill: "none",
    stroke: "var(--sg-blue)",
    strokeWidth: "1.5"
  }))))));
}
window.FlowLine = FlowLine;

// Typing animation for the chatbot demo
function TypingDemo({
  lines,
  speed = 30
}) {
  const [lineIdx, setLineIdx] = React.useState(0);
  const [charIdx, setCharIdx] = React.useState(0);
  const [done, setDone] = React.useState([]);
  const ref = React.useRef(null);
  const [started, setStarted] = React.useState(false);
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) setStarted(true);
    }, {
      threshold: 0.5
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);
  React.useEffect(() => {
    if (!started || lineIdx >= lines.length) return;
    const line = lines[lineIdx];
    if (charIdx < line.text.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), line.type === 'response' ? speed * 0.5 : speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDone(d => [...d, {
          ...line,
          text: line.text
        }]);
        setLineIdx(l => l + 1);
        setCharIdx(0);
      }, line.type === 'response' ? 200 : 600);
      return () => clearTimeout(t);
    }
  }, [started, lineIdx, charIdx]);
  const currentLine = lineIdx < lines.length ? lines[lineIdx] : null;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "feature-demo",
    style: {
      minHeight: 160
    }
  }, done.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: d.type === 'prompt' ? 'prompt' : 'response',
    style: {
      marginBottom: 6,
      whiteSpace: 'pre-line'
    }
  }, d.text)), currentLine && /*#__PURE__*/React.createElement("div", {
    className: currentLine.type === 'prompt' ? 'prompt' : 'response'
  }, currentLine.text.substring(0, charIdx), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: charIdx < currentLine.text.length ? 1 : 0,
      animation: 'sg-blink 0.8s step-end infinite'
    }
  }, "|")), /*#__PURE__*/React.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: '@keyframes sg-blink{0%,100%{opacity:1}50%{opacity:0}}'
    }
  }));
}
window.TypingDemo = TypingDemo;

// Animated progress bar
function ProgressCompare({
  items
}) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.3
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      marginTop: 24
    }
  }, items.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--fg1)'
    }
  }, item.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: item.highlight ? 'var(--sg-blue)' : 'var(--fg3)',
      fontWeight: item.highlight ? 700 : 400
    }
  }, item.value)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: 'var(--sg-off-white)',
      borderRadius: 3,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      borderRadius: 3,
      background: item.highlight ? 'var(--sg-blue)' : 'var(--sg-light-gray)',
      width: visible ? item.percent + '%' : '0%',
      transition: `width 1s cubic-bezier(0.2,0.8,0.2,1) ${i * 150}ms`
    }
  })))));
}
window.ProgressCompare = ProgressCompare;