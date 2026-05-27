// Scroll-driven factory production flow animation
function ProductionFlow() {
  const containerRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScroll = rect.height - windowH;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalScroll));
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const stages = [{
    id: 'order',
    label: 'Sales order received',
    icon: '📋',
    detail: 'Buyer PO arrives. AI parses it instantly.',
    color: '#3461E0'
  }, {
    id: 'plan',
    label: 'Planning & allocation',
    icon: '📐',
    detail: 'Planner allocates: in-house vs vendor. Auto-calculated.',
    color: '#7C3AED'
  }, {
    id: 'procure',
    label: 'Material procurement',
    icon: '📦',
    detail: 'POs auto-generated. Consolidated by species/type.',
    color: '#0EA5E9'
  }, {
    id: 'receive',
    label: 'Material received',
    icon: '🏭',
    detail: 'Warehouse logs receipt. Inventory updates live.',
    color: '#10B981'
  }, {
    id: 'produce',
    label: 'Production',
    icon: '⚙️',
    detail: 'Material moves through stages. Each tracked.',
    color: '#F59E0B'
  }, {
    id: 'qc',
    label: 'Quality check',
    icon: '✓',
    detail: 'QC gate enforced. Rejects caught at source.',
    color: '#EF4444'
  }, {
    id: 'pack',
    label: 'Packaging',
    icon: '📦',
    detail: 'Packed to buyer specs. Packing list auto-generated.',
    color: '#10B981'
  }, {
    id: 'ship',
    label: 'Dispatch',
    icon: '🚛',
    detail: 'Shipped. Invoice triggered. Dashboard updated.',
    color: '#3461E0'
  }];
  const activeStage = Math.min(Math.floor(progress * stages.length), stages.length - 1);
  const stageProgress = progress * stages.length - activeStage;
  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    id: "watch-it-work",
    style: {
      height: '400vh',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fafbfc',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'linear-gradient(#E5E8ED 1px, transparent 1px), linear-gradient(90deg, #E5E8ED 1px, transparent 1px)',
      backgroundSize: '48px 48px',
      opacity: 0.4
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      width: '100%',
      maxWidth: 1100,
      padding: '0 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "WHERE WE COVER"), /*#__PURE__*/React.createElement("h2", {
    className: "h2",
    style: {
      fontSize: 28
    }
  }, "From the first PO to the final dispatch, we cover every step in between.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      marginBottom: 48
    }
  }, stages.map((s, i) => {
    const isActive = i === activeStage;
    const isDone = i < activeStage;
    const isFuture = i > activeStage;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: s.id
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        textAlign: 'center',
        position: 'relative',
        opacity: isFuture ? 0.3 : 1,
        transition: 'opacity 0.4s, transform 0.4s',
        transform: isActive ? 'scale(1.05)' : 'scale(1)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: isActive ? 52 : 40,
        height: isActive ? 52 : 40,
        borderRadius: '50%',
        margin: '0 auto 8px',
        background: isDone ? s.color : isActive ? s.color : '#fff',
        border: `2px solid ${isDone || isActive ? s.color : '#E5E8ED'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.4s cubic-bezier(0.2,0.8,0.2,1)',
        boxShadow: isActive ? `0 0 0 6px ${s.color}22, 0 4px 16px ${s.color}33` : 'none',
        fontSize: isActive ? 22 : 16,
        color: isDone || isActive ? '#fff' : '#9CA3AF'
      }
    }, isDone ? '✓' : s.icon), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: isActive ? 12 : 10,
        fontWeight: isActive ? 700 : 500,
        color: isActive ? s.color : isDone ? 'var(--fg1)' : 'var(--fg3)',
        transition: 'all 0.3s',
        lineHeight: 1.3
      }
    }, s.label)), i < stages.length - 1 && /*#__PURE__*/React.createElement("div", {
      style: {
        width: 24,
        height: 2,
        flexShrink: 0,
        position: 'relative',
        top: -12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: '#E5E8ED',
        borderRadius: 1
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        borderRadius: 1,
        background: stages[i].color,
        width: isDone ? '100%' : isActive ? stageProgress * 100 + '%' : '0%',
        transition: isDone ? 'none' : 'width 0.1s linear'
      }
    })));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 32,
      minHeight: 280
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(FactoryScene, {
    stage: activeStage,
    progress: stageProgress,
    color: stages[activeStage].color
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: stages[activeStage].color,
      marginBottom: 8
    }
  }, "Step ", activeStage + 1, " of ", stages.length), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 24,
      fontWeight: 700,
      color: 'var(--fg1)',
      margin: '0 0 10px',
      letterSpacing: '-0.015em'
    }
  }, stages[activeStage].label), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      color: 'var(--fg2)',
      lineHeight: 1.6,
      margin: '0 0 16px'
    }
  }, stages[activeStage].detail), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sg-off-white)',
      borderRadius: 8,
      padding: 14,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--fg2)',
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: stages[activeStage].color,
      fontWeight: 600
    }
  }, "Event: ", stages[activeStage].label.toUpperCase()), /*#__PURE__*/React.createElement("div", null, "Entity: SO-4521 \u2192 Stage ", activeStage + 1), /*#__PURE__*/React.createElement("div", null, "Actor: System \xB7 ", new Date().toLocaleTimeString()), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--sg-green)'
    }
  }, "Status: \u25CF Recorded")))), progress < 0.05 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 32,
      fontSize: 12,
      color: 'var(--fg3)',
      animation: 'sg-float 2s ease-in-out infinite'
    }
  }, "\u2193 Scroll to see the full flow"))));
}
window.ProductionFlow = ProductionFlow;

// Animated factory scene SVG
function FactoryScene({
  stage,
  progress,
  color
}) {
  // Conveyor belt items moving through
  const beltY = 120;
  const itemX = 40 + progress * 60;
  const scenes = [
  /*#__PURE__*/
  // 0: Order - document flying in
  React.createElement("svg", {
    key: "0",
    viewBox: "0 0 300 200",
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "60",
    y: "40",
    width: "180",
    height: "120",
    rx: "8",
    fill: "#fff",
    stroke: color,
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "90",
    y1: "70",
    x2: "210",
    y2: "70",
    stroke: "#E5E8ED",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "90",
    y1: "90",
    x2: "180",
    y2: "90",
    stroke: "#E5E8ED",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "90",
    y1: "110",
    x2: "200",
    y2: "110",
    stroke: "#E5E8ED",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "90",
    y1: "130",
    x2: "160",
    y2: "130",
    stroke: "#E5E8ED",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "56",
    textAnchor: "middle",
    fill: color,
    fontSize: "11",
    fontWeight: "700",
    fontFamily: "var(--font-heading)"
  }, "PURCHASE ORDER"), /*#__PURE__*/React.createElement("circle", {
    cx: "240",
    cy: "60",
    r: "16",
    fill: color,
    opacity: "0.15"
  }), /*#__PURE__*/React.createElement("text", {
    x: "240",
    y: "64",
    textAnchor: "middle",
    fill: color,
    fontSize: "14",
    fontWeight: "700"
  }, "AI"), /*#__PURE__*/React.createElement("path", {
    d: `M 240 76 L 210 ${70 + progress * 20}`,
    stroke: color,
    strokeWidth: "1.5",
    strokeDasharray: "4,3",
    opacity: progress
  })),
  /*#__PURE__*/
  // 1: Planning - grid/allocation
  React.createElement("svg", {
    key: "1",
    viewBox: "0 0 300 200",
    style: {
      width: '100%'
    }
  }, [0, 1, 2].map(r => [0, 1, 2].map(c => {
    const filled = r * 3 + c < Math.ceil(progress * 9);
    return /*#__PURE__*/React.createElement("rect", {
      key: `${r}-${c}`,
      x: 50 + c * 75,
      y: 30 + r * 55,
      width: "65",
      height: "45",
      rx: "6",
      fill: filled ? color + '22' : '#FAFBFC',
      stroke: filled ? color : '#E5E8ED',
      strokeWidth: "1.5",
      style: {
        transition: 'all 0.3s'
      }
    });
  })), /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "190",
    textAnchor: "middle",
    fill: "var(--fg3)",
    fontSize: "10"
  }, "Allocating across production lines")),
  /*#__PURE__*/
  // 2: Procure - boxes arriving
  React.createElement("svg", {
    key: "2",
    viewBox: "0 0 300 200",
    style: {
      width: '100%'
    }
  }, [0, 1, 2, 3].map(i => {
    const x = 30 + i * 70;
    const arrived = i < Math.ceil(progress * 4);
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("rect", {
      x: x,
      y: arrived ? 80 : 20 - progress * 60,
      width: "55",
      height: "55",
      rx: "6",
      fill: arrived ? color + '22' : '#FAFBFC',
      stroke: arrived ? color : '#E5E8ED',
      strokeWidth: "1.5",
      style: {
        transition: 'all 0.5s cubic-bezier(0.2,0.8,0.2,1)'
      }
    }), /*#__PURE__*/React.createElement("text", {
      x: x + 27,
      y: arrived ? 112 : 52 - progress * 60,
      textAnchor: "middle",
      fill: arrived ? color : '#9CA3AF',
      fontSize: "18",
      style: {
        transition: 'all 0.5s'
      }
    }, "\uD83D\uDCE6"));
  }), /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "145",
    x2: "280",
    y2: "145",
    stroke: "#E5E8ED",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "170",
    textAnchor: "middle",
    fill: "var(--fg3)",
    fontSize: "10"
  }, "Purchase orders sent to vendors")),
  /*#__PURE__*/
  // 3: Receive - warehouse
  React.createElement("svg", {
    key: "3",
    viewBox: "0 0 300 200",
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "60",
    y: "50",
    width: "180",
    height: "110",
    rx: "4",
    fill: "none",
    stroke: "#E5E8ED",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "60",
    y: "35",
    width: "180",
    height: "20",
    rx: "4",
    fill: "#FAFBFC",
    stroke: "#E5E8ED",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "49",
    textAnchor: "middle",
    fill: "var(--fg3)",
    fontSize: "9",
    fontWeight: "600"
  }, "WAREHOUSE B"), [0, 1, 2, 3, 4, 5].map(i => {
    const col = i % 3,
      row = Math.floor(i / 3);
    const filled = i < Math.ceil(progress * 6);
    return /*#__PURE__*/React.createElement("rect", {
      key: i,
      x: 75 + col * 55,
      y: 65 + row * 45,
      width: "45",
      height: "35",
      rx: "4",
      fill: filled ? color + '22' : '#fff',
      stroke: filled ? color : '#E5E8ED',
      strokeWidth: "1",
      style: {
        transition: 'all 0.4s',
        transitionDelay: i * 80 + 'ms'
      }
    });
  }), /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "180",
    textAnchor: "middle",
    fill: "var(--fg3)",
    fontSize: "10"
  }, "Inventory filling up in real time")),
  /*#__PURE__*/
  // 4: Production - conveyor belt
  React.createElement("svg", {
    key: "4",
    viewBox: "0 0 300 200",
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "20",
    y: beltY - 5,
    width: "260",
    height: "10",
    rx: "5",
    fill: "#E5E8ED"
  }), [0, 1, 2, 3, 4].map(i => {
    const x = 30 + (i * 55 + progress * 55) % 260;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("rect", {
      x: x,
      y: beltY - 30,
      width: "35",
      height: "25",
      rx: "4",
      fill: color + '22',
      stroke: color,
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: x + 17,
      y: beltY - 13,
      textAnchor: "middle",
      fontSize: "12"
    }, "\u2699\uFE0F"));
  }), /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: beltY + 15,
    x2: "280",
    y2: beltY + 15,
    stroke: "none"
  }), ['Machining', 'Assembly', 'Sanding', 'Finishing'].map((s, i) => /*#__PURE__*/React.createElement("text", {
    key: i,
    x: 50 + i * 60,
    y: beltY + 40,
    textAnchor: "middle",
    fill: "var(--fg3)",
    fontSize: "8"
  }, s)), /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "180",
    textAnchor: "middle",
    fill: "var(--fg3)",
    fontSize: "10"
  }, "Components moving through stages")),
  /*#__PURE__*/
  // 5: QC - checkmarks
  React.createElement("svg", {
    key: "5",
    viewBox: "0 0 300 200",
    style: {
      width: '100%'
    }
  }, [0, 1, 2, 3, 4, 5].map(i => {
    const col = i % 3,
      row = Math.floor(i / 3);
    const passed = i < Math.ceil(progress * 5);
    const failed = i === 4 && progress > 0.8;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("rect", {
      x: 50 + col * 75,
      y: 40 + row * 65,
      width: "60",
      height: "50",
      rx: "6",
      fill: failed ? '#FEE2E2' : passed ? '#D1FAE5' : '#FAFBFC',
      stroke: failed ? '#EF4444' : passed ? '#10B981' : '#E5E8ED',
      strokeWidth: "1.5",
      style: {
        transition: 'all 0.3s'
      }
    }), /*#__PURE__*/React.createElement("text", {
      x: 80 + col * 75,
      y: 72 + row * 65,
      textAnchor: "middle",
      fontSize: "16"
    }, failed ? '✕' : passed ? '✓' : '?'));
  }), /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "185",
    textAnchor: "middle",
    fill: "var(--fg3)",
    fontSize: "10"
  }, "Quality gate: pass or reject at source")),
  /*#__PURE__*/
  // 6: Packaging
  React.createElement("svg", {
    key: "6",
    viewBox: "0 0 300 200",
    style: {
      width: '100%'
    }
  }, [0, 1, 2].map(i => {
    const x = 40 + i * 85;
    const sealed = i < Math.ceil(progress * 3);
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("rect", {
      x: x,
      y: "50",
      width: "70",
      height: "70",
      rx: "6",
      fill: sealed ? color + '15' : '#FAFBFC',
      stroke: sealed ? color : '#E5E8ED',
      strokeWidth: "1.5",
      style: {
        transition: 'all 0.4s'
      }
    }), sealed && /*#__PURE__*/React.createElement("line", {
      x1: x + 15,
      y1: "85",
      x2: x + 55,
      y2: "85",
      stroke: color,
      strokeWidth: "2",
      strokeDasharray: "none"
    }), sealed && /*#__PURE__*/React.createElement("line", {
      x1: x + 35,
      y1: "60",
      x2: x + 35,
      y2: "110",
      stroke: color,
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("text", {
      x: x + 35,
      y: "140",
      textAnchor: "middle",
      fill: "var(--fg3)",
      fontSize: "9"
    }, "Box ", i + 1));
  }), /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "180",
    textAnchor: "middle",
    fill: "var(--fg3)",
    fontSize: "10"
  }, "Packed to buyer specifications")),
  /*#__PURE__*/
  // 7: Dispatch - truck
  React.createElement("svg", {
    key: "7",
    viewBox: "0 0 300 200",
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("g", {
    style: {
      transform: `translateX(${-80 + progress * 200}px)`,
      transition: 'transform 0.3s linear'
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "60",
    y: "70",
    width: "120",
    height: "60",
    rx: "4",
    fill: color + '22',
    stroke: color,
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "180",
    y: "85",
    width: "50",
    height: "45",
    rx: "4",
    fill: color,
    stroke: color,
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "100",
    cy: "140",
    r: "12",
    fill: "#fff",
    stroke: color,
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "160",
    cy: "140",
    r: "12",
    fill: "#fff",
    stroke: color,
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "210",
    cy: "140",
    r: "12",
    fill: "#fff",
    stroke: color,
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "185",
    y: "92",
    width: "18",
    height: "14",
    rx: "2",
    fill: "#fff",
    opacity: "0.6"
  })), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "152",
    x2: "300",
    y2: "152",
    stroke: "#E5E8ED",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "185",
    textAnchor: "middle",
    fill: progress > 0.8 ? 'var(--sg-green)' : 'var(--fg3)',
    fontSize: "10",
    fontWeight: progress > 0.8 ? 700 : 400
  }, progress > 0.8 ? '✓ Dispatched. Invoice triggered.' : 'Shipping to buyer...'))];
  return scenes[stage] || scenes[0];
}
window.FactoryScene = FactoryScene;