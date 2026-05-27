// Elite Factory Road - interactive motion graphic, vertical layout.
// A single vertical line. Sales order enters at the top, transforms through 19 stages,
// dispatches as a shipping container at the bottom.
// Auto-plays; user can scrub or tap any station.

function EliteFactoryRoad({
  compact = false
} = {}) {
  const TOTAL = 19;
  const [t, setT] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const rafRef = React.useRef(null);
  const lastRef = React.useRef(performance.now());
  const containerRef = React.useRef(null);
  React.useEffect(() => {
    if (!playing) return;
    const tick = now => {
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      setT(prev => {
        const next = prev + dt * 0.55;
        return next > TOTAL + 0.5 ? 0 : next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setPlaying(e.isIntersecting);
    }, {
      threshold: 0.1
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const stage = Math.max(0, Math.min(TOTAL - 1, Math.floor(t)));
  const subProg = Math.max(0, Math.min(1, t - stage));
  const STAGES = [{
    id: 1,
    short: 'SO',
    h: 'Sales order received',
    p: 'Buyer PO arrives. AI parses any format and creates a sales order.',
    kind: 'so',
    pricing: null,
    color: '#3461E0'
  }, {
    id: 2,
    short: 'PLAN',
    h: 'Planning & wood aggregated',
    p: 'Planner allocates per SKU. All component-level wood needs aggregated across orders.',
    kind: 'plan',
    pricing: null,
    color: '#7C3AED'
  }, {
    id: 3,
    short: 'PO',
    h: 'Wood ordered',
    p: 'One PO per species + thickness, multi-vendor.',
    kind: 'po',
    pricing: 'Quoted by species + thickness',
    color: '#0EA5E9'
  }, {
    id: 4,
    short: 'RECV',
    h: 'Wood received',
    p: 'Seasoned vs unseasoned check at receipt. Inventory live.',
    kind: 'recv',
    pricing: null,
    color: '#10B981'
  }, {
    id: 5,
    short: 'SEAS',
    h: 'Seasoning chamber',
    p: 'Unseasoned stock loaded into the seasoning chamber. Door closes, timer runs, planks come out dry and stable.',
    kind: 'seas',
    pricing: null,
    color: '#10B981'
  }, {
    id: 6,
    short: 'STOCK',
    h: 'Stocked centrally',
    p: 'Per-species, per-thickness CFT ledger.',
    kind: 'stock',
    pricing: null,
    color: '#0EA5E9'
  }, {
    id: 7,
    short: 'MACH',
    h: 'Machining contractor',
    p: 'Saw and router work the wood; out come the cut components - panels, frames, legs, rails - each tagged to a SKU.',
    kind: 'mach',
    pricing: 'sqft (panels) · running ft (frames) · by thickness',
    color: '#F59E0B'
  }, {
    id: 8,
    short: 'QC1',
    h: 'Machining QC',
    p: 'Pass enters component stock; fail returns or scraps.',
    kind: 'qc',
    pricing: null,
    color: '#EF4444'
  }, {
    id: 9,
    short: 'COMP',
    h: 'Components in stock',
    p: 'Machined components booked and ready for assembly.',
    kind: 'compstock',
    pricing: null,
    color: '#0EA5E9'
  }, {
    id: 10,
    short: 'ASSY',
    h: 'Assembly contractor',
    p: 'Components merge into a SKU. Tracking switches component → SKU.',
    kind: 'assy',
    pricing: 'Per SKU',
    color: '#7C3AED'
  }, {
    id: 11,
    short: 'QC2',
    h: 'Assembly QC',
    p: 'Joints, squareness, fit-for-finish.',
    kind: 'qc',
    pricing: null,
    color: '#EF4444'
  }, {
    id: 12,
    short: 'XFER',
    h: 'Inter-unit transfer',
    p: 'Moves to finishing unit with audit trail.',
    kind: 'xfer',
    pricing: null,
    color: '#7C3AED'
  }, {
    id: 13,
    short: 'SAND',
    h: 'Sanding contractor',
    p: '90% of SKUs sanded by contractor.',
    kind: 'sand',
    pricing: 'sqft of finished surface',
    color: '#F59E0B'
  }, {
    id: 14,
    short: 'QC3',
    h: 'Sanding QC',
    p: 'Smoothness, profile, dust-free.',
    kind: 'qc',
    pricing: null,
    color: '#EF4444'
  }, {
    id: 15,
    short: 'FIN',
    h: 'Finishing contractor',
    p: 'Stain / lacquer / polish per SKU spec.',
    kind: 'fin',
    pricing: 'sqft of finished surface',
    color: '#10B981'
  }, {
    id: 16,
    short: 'HW',
    h: 'Hardware fitting',
    p: 'Hinges, slides, handles, screws fitted to spec.',
    kind: 'hw',
    pricing: '# fittings × screw size',
    color: '#F59E0B'
  }, {
    id: 17,
    short: 'QC4',
    h: 'Final QC',
    p: 'Buyer-spec gate. Photo, moisture, dimensions. Block on fail.',
    kind: 'qc',
    pricing: null,
    color: '#EF4444'
  }, {
    id: 18,
    short: 'PACK',
    h: 'Packaging',
    p: 'Crate / carton per buyer spec. CBM auto-calculated.',
    kind: 'pack',
    pricing: 'Per CBM packed',
    color: '#10B981'
  }, {
    id: 19,
    short: 'SHIP',
    h: 'Dispatch - container',
    p: '40-foot container loaded, sealed, and on its way. Multi-SO consolidation; partial dispatch supported.',
    kind: 'ship',
    pricing: null,
    color: '#3461E0'
  }];
  const cur = STAGES[stage];

  // Cargo glyph - transforms per stage. SEAS (k=4) and MACH (k=6) morph mid-stage
  // using subProg; SHIP (k=18) renders a shipping container.
  function CargoGlyph({
    stage,
    color,
    subProg
  }) {
    const k = stage;
    if (k === 0) return (
      /*#__PURE__*/
      // SO doc
      React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
        x: "-14",
        y: "-18",
        width: "28",
        height: "36",
        rx: "3",
        fill: "#fff",
        stroke: color,
        strokeWidth: "1.5"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "-9",
        y1: "-10",
        x2: "9",
        y2: "-10",
        stroke: color,
        strokeWidth: "1.2"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "-9",
        y1: "-4",
        x2: "6",
        y2: "-4",
        stroke: color,
        strokeWidth: "1.2"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "-9",
        y1: "2",
        x2: "9",
        y2: "2",
        stroke: color,
        strokeWidth: "1.2"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "-9",
        y1: "8",
        x2: "3",
        y2: "8",
        stroke: color,
        strokeWidth: "1.2"
      }))
    );
    if (k === 1) return (
      /*#__PURE__*/
      // Planning grid
      React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
        x: "-16",
        y: "-14",
        width: "32",
        height: "28",
        rx: "3",
        fill: "#fff",
        stroke: color,
        strokeWidth: "1.5"
      }), [0, 1, 2].map(c => [0, 1].map(r => /*#__PURE__*/React.createElement("rect", {
        key: `${c}-${r}`,
        x: -13 + c * 9,
        y: -10 + r * 9,
        width: "7",
        height: "7",
        rx: "1",
        fill: color,
        opacity: (c + r) % 2 ? 0.25 : 0.55
      }))))
    );
    if (k === 2) return (
      /*#__PURE__*/
      // PO doc
      React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
        x: "-13",
        y: "-17",
        width: "26",
        height: "34",
        rx: "3",
        fill: "#fff",
        stroke: color,
        strokeWidth: "1.5"
      }), /*#__PURE__*/React.createElement("text", {
        x: "0",
        y: "-5",
        textAnchor: "middle",
        fill: color,
        fontSize: "6",
        fontWeight: "700",
        fontFamily: "ui-monospace,monospace"
      }, "PO"), /*#__PURE__*/React.createElement("line", {
        x1: "-8",
        y1: "2",
        x2: "8",
        y2: "2",
        stroke: color,
        strokeWidth: "1"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "-8",
        y1: "6",
        x2: "6",
        y2: "6",
        stroke: color,
        strokeWidth: "1"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "6",
        cy: "-12",
        r: "3",
        fill: color,
        opacity: "0.3"
      }))
    );
    if (k === 3) return (
      /*#__PURE__*/
      // raw planks
      React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
        x: "-22",
        y: "-2",
        width: "44",
        height: "6",
        rx: "1",
        fill: "#A0826A",
        stroke: "#8B6F4E",
        strokeWidth: "0.8"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-22",
        y: "-9",
        width: "44",
        height: "6",
        rx: "1",
        fill: "#B8946F",
        stroke: "#8B6F4E",
        strokeWidth: "0.8"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-22",
        y: "-16",
        width: "44",
        height: "6",
        rx: "1",
        fill: "#A0826A",
        stroke: "#8B6F4E",
        strokeWidth: "0.8"
      }), [-18, -10, -2, 6, 14].map((x, i) => /*#__PURE__*/React.createElement("line", {
        key: i,
        x1: x,
        y1: "-16",
        x2: x,
        y2: "4",
        stroke: "#8B6F4E",
        strokeWidth: "0.4",
        opacity: "0.6"
      })))
    );
    if (k === 4) {
      // SEAS - chamber first half, planks emerging in second half
      if (subProg < 0.55) {
        // Seasoning chamber/kiln
        const open = Math.max(0, subProg - 0.35) * 4; // doors crack open near transition
        return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
          d: "M-14 -28 q2 -4 4 0 q2 4 4 0",
          fill: "none",
          stroke: color,
          strokeWidth: "1.2",
          opacity: "0.55",
          strokeLinecap: "round"
        }), /*#__PURE__*/React.createElement("path", {
          d: "M-2 -30 q2 -4 4 0 q2 4 4 0",
          fill: "none",
          stroke: color,
          strokeWidth: "1.2",
          opacity: "0.7",
          strokeLinecap: "round"
        }), /*#__PURE__*/React.createElement("path", {
          d: "M10 -28 q2 -4 4 0 q2 4 4 0",
          fill: "none",
          stroke: color,
          strokeWidth: "1.2",
          opacity: "0.5",
          strokeLinecap: "round"
        }), /*#__PURE__*/React.createElement("rect", {
          x: "-24",
          y: "-20",
          width: "48",
          height: "36",
          rx: "3",
          fill: "#E5E8ED",
          stroke: "#6B7280",
          strokeWidth: "1.2"
        }), /*#__PURE__*/React.createElement("rect", {
          x: "-24",
          y: "-20",
          width: "48",
          height: "6",
          fill: "#CBD2DA",
          stroke: "#6B7280",
          strokeWidth: "0.8"
        }), /*#__PURE__*/React.createElement("rect", {
          x: -22 - open,
          y: "-13",
          width: "22",
          height: "28",
          rx: "1",
          fill: "#F4F6F9",
          stroke: "#6B7280",
          strokeWidth: "0.9"
        }), /*#__PURE__*/React.createElement("rect", {
          x: 0 + open,
          y: "-13",
          width: "22",
          height: "28",
          rx: "1",
          fill: "#F4F6F9",
          stroke: "#6B7280",
          strokeWidth: "0.9"
        }), /*#__PURE__*/React.createElement("circle", {
          cx: -22 - open + 2,
          cy: "-9",
          r: "0.8",
          fill: "#6B7280"
        }), /*#__PURE__*/React.createElement("circle", {
          cx: -22 - open + 2,
          cy: "11",
          r: "0.8",
          fill: "#6B7280"
        }), /*#__PURE__*/React.createElement("circle", {
          cx: 0 + open + 20,
          cy: "-9",
          r: "0.8",
          fill: "#6B7280"
        }), /*#__PURE__*/React.createElement("circle", {
          cx: 0 + open + 20,
          cy: "11",
          r: "0.8",
          fill: "#6B7280"
        }), /*#__PURE__*/React.createElement("circle", {
          cx: "0",
          cy: "-17",
          r: "2.2",
          fill: "#fff",
          stroke: color,
          strokeWidth: "0.9"
        }), /*#__PURE__*/React.createElement("line", {
          x1: "0",
          y1: "-17",
          x2: "1.4",
          y2: "-18.5",
          stroke: color,
          strokeWidth: "0.9",
          strokeLinecap: "round"
        }), open > 0.3 && /*#__PURE__*/React.createElement("g", {
          opacity: Math.min(1, (open - 0.3) * 2)
        }, /*#__PURE__*/React.createElement("rect", {
          x: "-14",
          y: "-2",
          width: "28",
          height: "3",
          rx: "0.5",
          fill: "#A0826A"
        }), /*#__PURE__*/React.createElement("rect", {
          x: "-14",
          y: "3",
          width: "28",
          height: "3",
          rx: "0.5",
          fill: "#B8946F"
        }), /*#__PURE__*/React.createElement("rect", {
          x: "-14",
          y: "8",
          width: "28",
          height: "3",
          rx: "0.5",
          fill: "#A0826A"
        })));
      } else {
        // Planks emerging from the chamber
        const slide = (subProg - 0.55) / 0.45; // 0..1
        return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("g", {
          opacity: "0.4"
        }, /*#__PURE__*/React.createElement("rect", {
          x: "-24",
          y: "-20",
          width: "3",
          height: "36",
          fill: "#6B7280"
        }), /*#__PURE__*/React.createElement("rect", {
          x: "21",
          y: "-20",
          width: "3",
          height: "36",
          fill: "#6B7280"
        }), /*#__PURE__*/React.createElement("rect", {
          x: "-24",
          y: "-20",
          width: "48",
          height: "3",
          fill: "#6B7280"
        })), /*#__PURE__*/React.createElement("g", {
          transform: `translate(0, ${(1 - slide) * -3})`
        }, /*#__PURE__*/React.createElement("rect", {
          x: "-22",
          y: "-2",
          width: "44",
          height: "6",
          rx: "1",
          fill: "#A0826A",
          stroke: "#8B6F4E",
          strokeWidth: "0.8"
        }), /*#__PURE__*/React.createElement("rect", {
          x: "-22",
          y: "-9",
          width: "44",
          height: "6",
          rx: "1",
          fill: "#B8946F",
          stroke: "#8B6F4E",
          strokeWidth: "0.8"
        }), /*#__PURE__*/React.createElement("rect", {
          x: "-22",
          y: "-16",
          width: "44",
          height: "6",
          rx: "1",
          fill: "#A0826A",
          stroke: "#8B6F4E",
          strokeWidth: "0.8"
        }), [-18, -10, -2, 6, 14].map((x, i) => /*#__PURE__*/React.createElement("line", {
          key: i,
          x1: x,
          y1: "-16",
          x2: x,
          y2: "4",
          stroke: "#8B6F4E",
          strokeWidth: "0.4",
          opacity: "0.6"
        }))));
      }
    }
    if (k === 5) return (
      /*#__PURE__*/
      // STOCK - central warehouse
      React.createElement("g", null, /*#__PURE__*/React.createElement("polygon", {
        points: "-28,-16 28,-16 24,-22 -24,-22",
        fill: "#8B6F4E",
        stroke: "#6B4423",
        strokeWidth: "0.6"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-28",
        y: "-17",
        width: "56",
        height: "2",
        fill: "#6B4423"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-26",
        y: "-15",
        width: "52",
        height: "32",
        fill: "#E5E8ED",
        stroke: "#6B7280",
        strokeWidth: "0.8"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-18",
        y: "-13",
        width: "36",
        height: "6",
        fill: "#fff",
        stroke: "#6B7280",
        strokeWidth: "0.4"
      }), /*#__PURE__*/React.createElement("text", {
        x: "0",
        y: "-8.6",
        textAnchor: "middle",
        fill: "#374151",
        fontSize: "3.6",
        fontWeight: "800",
        fontFamily: "ui-sans-serif,system-ui",
        letterSpacing: "0.04em"
      }, "CENTRAL STORE"), /*#__PURE__*/React.createElement("rect", {
        x: "-12",
        y: "-4",
        width: "24",
        height: "20",
        fill: "#CBD2DA",
        stroke: "#6B7280",
        strokeWidth: "0.6"
      }), [0, 1, 2, 3, 4, 5, 6, 7].map(i => /*#__PURE__*/React.createElement("line", {
        key: i,
        x1: "-12",
        y1: -4 + i * 2.5 + 1,
        x2: "12",
        y2: -4 + i * 2.5 + 1,
        stroke: "#9CA3AF",
        strokeWidth: "0.4"
      })), /*#__PURE__*/React.createElement("line", {
        x1: "-12",
        y1: "-4",
        x2: "12",
        y2: "-4",
        stroke: "#6B7280",
        strokeWidth: "0.6"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-23",
        y: "-3",
        width: "7",
        height: "6",
        fill: "#7CB7E5",
        stroke: "#6B7280",
        strokeWidth: "0.4"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "-19.5",
        y1: "-3",
        x2: "-19.5",
        y2: "3",
        stroke: "#6B7280",
        strokeWidth: "0.3"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "16",
        y: "-3",
        width: "7",
        height: "6",
        fill: "#7CB7E5",
        stroke: "#6B7280",
        strokeWidth: "0.4"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "19.5",
        y1: "-3",
        x2: "19.5",
        y2: "3",
        stroke: "#6B7280",
        strokeWidth: "0.3"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-23",
        y: "11",
        width: "6",
        height: "3",
        fill: "#A0826A",
        stroke: "#6B4423",
        strokeWidth: "0.3"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-23",
        y: "14",
        width: "6",
        height: "2",
        fill: "#B8946F",
        stroke: "#6B4423",
        strokeWidth: "0.3"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "17",
        y: "11",
        width: "6",
        height: "3",
        fill: "#A0826A",
        stroke: "#6B4423",
        strokeWidth: "0.3"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "17",
        y: "14",
        width: "6",
        height: "2",
        fill: "#B8946F",
        stroke: "#6B4423",
        strokeWidth: "0.3"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-28",
        y: "17",
        width: "56",
        height: "1",
        fill: "#6B7280",
        opacity: "0.4"
      }))
    );
    if (k === 6) {
      // MACH - saw cutting wood first half, cut pieces second half
      if (subProg < 0.55) {
        const spin = t * 360 * 6 % 360; // fast spin
        const cutDepth = Math.min(1, subProg / 0.55);
        return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
          x: "-22",
          y: "2",
          width: "44",
          height: "9",
          rx: "1",
          fill: "#B8946F",
          stroke: "#8B6F4E",
          strokeWidth: "0.8"
        }), /*#__PURE__*/React.createElement("line", {
          x1: "-2",
          y1: "2",
          x2: "-2",
          y2: 2 + 9 * cutDepth,
          stroke: "#3F2A18",
          strokeWidth: "0.8"
        }), /*#__PURE__*/React.createElement("circle", {
          cx: "-7",
          cy: 9 + cutDepth * 6,
          r: "0.7",
          fill: "#A0826A",
          opacity: "0.7"
        }), /*#__PURE__*/React.createElement("circle", {
          cx: "3",
          cy: 11 + cutDepth * 5,
          r: "0.6",
          fill: "#B8946F",
          opacity: "0.7"
        }), /*#__PURE__*/React.createElement("circle", {
          cx: "-3",
          cy: 13 + cutDepth * 4,
          r: "0.5",
          fill: "#A0826A",
          opacity: "0.5"
        }), /*#__PURE__*/React.createElement("g", {
          transform: `translate(-2, ${-2 + cutDepth * 4}) rotate(${spin})`
        }, /*#__PURE__*/React.createElement("circle", {
          r: "11",
          fill: "#E5E8ED",
          stroke: "#6B7280",
          strokeWidth: "0.8"
        }), [...Array(14)].map((_, i) => {
          const a = i / 14 * Math.PI * 2;
          const x1 = Math.cos(a) * 10,
            y1 = Math.sin(a) * 10;
          const x2 = Math.cos(a) * 12,
            y2 = Math.sin(a) * 12;
          return /*#__PURE__*/React.createElement("polygon", {
            key: i,
            points: `${x1},${y1} ${x2},${y2 - 0.6} ${x2 - 0.6},${y2 + 0.6}`,
            fill: "#374151"
          });
        }), /*#__PURE__*/React.createElement("circle", {
          r: "2.4",
          fill: "#6B7280"
        }), /*#__PURE__*/React.createElement("circle", {
          r: "1",
          fill: "#1F2937"
        })), /*#__PURE__*/React.createElement("circle", {
          cx: "9",
          cy: "2",
          r: "0.9",
          fill: "#F59E0B",
          opacity: "0.85"
        }), /*#__PURE__*/React.createElement("circle", {
          cx: "-13",
          cy: "3",
          r: "0.8",
          fill: "#F59E0B",
          opacity: "0.7"
        }));
      } else {
        // Cut pieces - different shapes, the components
        return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
          x: "-22",
          y: "-14",
          width: "20",
          height: "10",
          rx: "1",
          fill: "#C8A57E",
          stroke: "#8B6F4E",
          strokeWidth: "0.8"
        }), /*#__PURE__*/React.createElement("line", {
          x1: "-22",
          y1: "-9",
          x2: "-2",
          y2: "-9",
          stroke: "#8B6F4E",
          strokeWidth: "0.3",
          opacity: "0.6"
        }), /*#__PURE__*/React.createElement("rect", {
          x: "2",
          y: "-14",
          width: "14",
          height: "10",
          rx: "1",
          fill: "#B8946F",
          stroke: "#8B6F4E",
          strokeWidth: "0.8"
        }), /*#__PURE__*/React.createElement("rect", {
          x: "-20",
          y: "-1",
          width: "40",
          height: "4",
          rx: "0.8",
          fill: "#A0826A",
          stroke: "#8B6F4E",
          strokeWidth: "0.6"
        }), /*#__PURE__*/React.createElement("rect", {
          x: "-14",
          y: "6",
          width: "4",
          height: "12",
          rx: "0.6",
          fill: "#9C7B5A",
          stroke: "#8B6F4E",
          strokeWidth: "0.5"
        }), /*#__PURE__*/React.createElement("rect", {
          x: "-2",
          y: "6",
          width: "4",
          height: "12",
          rx: "0.6",
          fill: "#9C7B5A",
          stroke: "#8B6F4E",
          strokeWidth: "0.5"
        }), /*#__PURE__*/React.createElement("rect", {
          x: "10",
          y: "6",
          width: "4",
          height: "12",
          rx: "0.6",
          fill: "#9C7B5A",
          stroke: "#8B6F4E",
          strokeWidth: "0.5"
        }));
      }
    }
    if (k === 7 || k === 8) return (
      /*#__PURE__*/
      // QC1 + COMP - cut components
      React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
        x: "-22",
        y: "-14",
        width: "20",
        height: "10",
        rx: "1",
        fill: "#C8A57E",
        stroke: "#8B6F4E",
        strokeWidth: "0.8"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "2",
        y: "-14",
        width: "14",
        height: "10",
        rx: "1",
        fill: "#B8946F",
        stroke: "#8B6F4E",
        strokeWidth: "0.8"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-20",
        y: "-1",
        width: "40",
        height: "4",
        rx: "0.8",
        fill: "#A0826A",
        stroke: "#8B6F4E",
        strokeWidth: "0.6"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-14",
        y: "6",
        width: "4",
        height: "12",
        rx: "0.6",
        fill: "#9C7B5A",
        stroke: "#8B6F4E",
        strokeWidth: "0.5"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-2",
        y: "6",
        width: "4",
        height: "12",
        rx: "0.6",
        fill: "#9C7B5A",
        stroke: "#8B6F4E",
        strokeWidth: "0.5"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "10",
        y: "6",
        width: "4",
        height: "12",
        rx: "0.6",
        fill: "#9C7B5A",
        stroke: "#8B6F4E",
        strokeWidth: "0.5"
      }))
    );
    if (k === 9 || k === 10) return (
      /*#__PURE__*/
      // bare assembled table
      React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
        x: "-22",
        y: "-14",
        width: "44",
        height: "6",
        rx: "1",
        fill: "#B8946F",
        stroke: "#8B6F4E",
        strokeWidth: "0.8"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-20",
        y: "-8",
        width: "3",
        height: "22",
        fill: "#A0826A",
        stroke: "#8B6F4E",
        strokeWidth: "0.6"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "17",
        y: "-8",
        width: "3",
        height: "22",
        fill: "#A0826A",
        stroke: "#8B6F4E",
        strokeWidth: "0.6"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-3",
        y: "-8",
        width: "3",
        height: "22",
        fill: "#A0826A",
        stroke: "#8B6F4E",
        strokeWidth: "0.6",
        opacity: "0.7"
      }))
    );
    if (k === 11) return (
      /*#__PURE__*/
      // XFER - small tempo (mini goods truck) carrying the SKU
      React.createElement("g", null, /*#__PURE__*/React.createElement("ellipse", {
        cx: "0",
        cy: "11",
        rx: "22",
        ry: "1.6",
        fill: "#000",
        opacity: "0.1"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-6",
        y: "-12",
        width: "22",
        height: "14",
        rx: "1.5",
        fill: "#3461E0",
        stroke: "#1e4dd9",
        strokeWidth: "0.9"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M -6 -12 Q 5 -17 16 -12",
        fill: "#fff",
        stroke: "#1e4dd9",
        strokeWidth: "0.7"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-4",
        y: "-13",
        width: "18",
        height: "2",
        fill: "#6B4423",
        opacity: "0.9"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-4",
        y: "-7",
        width: "18",
        height: "5",
        fill: "#fff",
        stroke: "#1e4dd9",
        strokeWidth: "0.4"
      }), /*#__PURE__*/React.createElement("text", {
        x: "5",
        y: "-3.3",
        textAnchor: "middle",
        fill: "#1e4dd9",
        fontSize: "3.2",
        fontWeight: "800",
        fontFamily: "ui-sans-serif,system-ui",
        letterSpacing: "0.04em"
      }, "TRANSFER"), /*#__PURE__*/React.createElement("rect", {
        x: "-17",
        y: "-9",
        width: "11",
        height: "11",
        rx: "1.5",
        fill: "#3461E0",
        stroke: "#1e4dd9",
        strokeWidth: "0.9"
      }), /*#__PURE__*/React.createElement("polygon", {
        points: "-15.5,-8 -7.5,-8 -7.5,-3 -15.5,-3",
        fill: "#7CB7E5",
        stroke: "#1e4dd9",
        strokeWidth: "0.4"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "-11",
        y1: "-3",
        x2: "-11",
        y2: "2",
        stroke: "#1e4dd9",
        strokeWidth: "0.4"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "-16.4",
        cy: "-1",
        r: "0.9",
        fill: "#FBBF24",
        stroke: "#1e4dd9",
        strokeWidth: "0.3"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "-12",
        cy: "3",
        r: "3.2",
        fill: "#2B313A",
        stroke: "#1F2937",
        strokeWidth: "0.5"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "-12",
        cy: "3",
        r: "1.2",
        fill: "#9CA3AF"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "11",
        cy: "3",
        r: "3.2",
        fill: "#2B313A",
        stroke: "#1F2937",
        strokeWidth: "0.5"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "11",
        cy: "3",
        r: "1.2",
        fill: "#9CA3AF"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "-21",
        cy: "2",
        r: "1.5",
        fill: "#9CA3AF",
        opacity: "0.35"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "-23",
        cy: "0",
        r: "1",
        fill: "#9CA3AF",
        opacity: "0.25"
      }))
    );
    if (k === 12) return (
      /*#__PURE__*/
      // sanded
      React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
        x: "-22",
        y: "-14",
        width: "44",
        height: "6",
        rx: "1",
        fill: "#D9BFA0",
        stroke: "#A88E72",
        strokeWidth: "0.6"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-20",
        y: "-8",
        width: "3",
        height: "22",
        fill: "#CDB293",
        stroke: "#A88E72",
        strokeWidth: "0.4"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "17",
        y: "-8",
        width: "3",
        height: "22",
        fill: "#CDB293",
        stroke: "#A88E72",
        strokeWidth: "0.4"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-3",
        y: "-8",
        width: "3",
        height: "22",
        fill: "#CDB293",
        stroke: "#A88E72",
        strokeWidth: "0.4",
        opacity: "0.7"
      }))
    );
    if (k === 13) return (
      /*#__PURE__*/
      // QC sand pass
      React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
        x: "-22",
        y: "-14",
        width: "44",
        height: "6",
        rx: "1",
        fill: "#D9BFA0",
        stroke: "#A88E72",
        strokeWidth: "0.6"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-20",
        y: "-8",
        width: "3",
        height: "22",
        fill: "#CDB293",
        stroke: "#A88E72",
        strokeWidth: "0.4"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "17",
        y: "-8",
        width: "3",
        height: "22",
        fill: "#CDB293",
        stroke: "#A88E72",
        strokeWidth: "0.4"
      }))
    );
    if (k === 14) return (
      /*#__PURE__*/
      // finished
      React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
        x: "-22",
        y: "-14",
        width: "44",
        height: "6",
        rx: "1",
        fill: "#6B4423",
        stroke: "#3F2A18",
        strokeWidth: "0.6"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-20",
        y: "-8",
        width: "3",
        height: "22",
        fill: "#5A3A1F",
        stroke: "#3F2A18",
        strokeWidth: "0.4"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "17",
        y: "-8",
        width: "3",
        height: "22",
        fill: "#5A3A1F",
        stroke: "#3F2A18",
        strokeWidth: "0.4"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-3",
        y: "-8",
        width: "3",
        height: "22",
        fill: "#5A3A1F",
        stroke: "#3F2A18",
        strokeWidth: "0.4",
        opacity: "0.7"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-20",
        y: "-13",
        width: "40",
        height: "1",
        fill: "#fff",
        opacity: "0.35"
      }))
    );
    if (k === 15) return (
      /*#__PURE__*/
      // finished + hardware
      React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
        x: "-22",
        y: "-14",
        width: "44",
        height: "6",
        rx: "1",
        fill: "#6B4423",
        stroke: "#3F2A18",
        strokeWidth: "0.6"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-20",
        y: "-8",
        width: "3",
        height: "22",
        fill: "#5A3A1F",
        stroke: "#3F2A18",
        strokeWidth: "0.4"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "17",
        y: "-8",
        width: "3",
        height: "22",
        fill: "#5A3A1F",
        stroke: "#3F2A18",
        strokeWidth: "0.4"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-3",
        y: "-8",
        width: "3",
        height: "22",
        fill: "#5A3A1F",
        stroke: "#3F2A18",
        strokeWidth: "0.4",
        opacity: "0.7"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-20",
        y: "-13",
        width: "40",
        height: "1",
        fill: "#fff",
        opacity: "0.35"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "-12",
        cy: "-11",
        r: "1.4",
        fill: "#D4AF37"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "0",
        cy: "-11",
        r: "1.4",
        fill: "#D4AF37"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "-11",
        r: "1.4",
        fill: "#D4AF37"
      }))
    );
    if (k === 16) return (
      /*#__PURE__*/
      // final QC
      React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
        x: "-22",
        y: "-14",
        width: "44",
        height: "6",
        rx: "1",
        fill: "#6B4423",
        stroke: "#3F2A18",
        strokeWidth: "0.6"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "-20",
        y: "-8",
        width: "3",
        height: "22",
        fill: "#5A3A1F",
        stroke: "#3F2A18",
        strokeWidth: "0.4"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "17",
        y: "-8",
        width: "3",
        height: "22",
        fill: "#5A3A1F",
        stroke: "#3F2A18",
        strokeWidth: "0.4"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "14",
        cy: "-18",
        r: "6",
        fill: "#10B981"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M 11 -18 L 13 -16 L 17 -20",
        stroke: "#fff",
        strokeWidth: "1.5",
        fill: "none",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }))
    );
    if (k === 17) return (
      /*#__PURE__*/
      // crate
      React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
        x: "-20",
        y: "-18",
        width: "40",
        height: "34",
        rx: "2",
        fill: "#C9A06A",
        stroke: "#8B6F4E",
        strokeWidth: "1.2"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "-20",
        y1: "-1",
        x2: "20",
        y2: "-1",
        stroke: "#8B6F4E",
        strokeWidth: "0.8"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "0",
        y1: "-18",
        x2: "0",
        y2: "16",
        stroke: "#8B6F4E",
        strokeWidth: "0.8"
      }), /*#__PURE__*/React.createElement("text", {
        x: "0",
        y: "2",
        textAnchor: "middle",
        fill: "#3F2A18",
        fontSize: "6",
        fontWeight: "700",
        fontFamily: "ui-monospace,monospace"
      }, "FRAGILE"))
    );
    // k === 18 - Shipping container
    return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: "-32",
      y: "-13",
      width: "64",
      height: "26",
      rx: "1.5",
      fill: "#C9402F",
      stroke: "#7A2316",
      strokeWidth: "1.2"
    }), [-28, -24, -20, -16, -12, -8, -4, 0, 4, 8, 12, 16, 20, 24].map((x, i) => /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: x,
      y1: "-13",
      x2: x,
      y2: "13",
      stroke: "#7A2316",
      strokeWidth: "0.5",
      opacity: "0.55"
    })), /*#__PURE__*/React.createElement("line", {
      x1: "22",
      y1: "-13",
      x2: "22",
      y2: "13",
      stroke: "#7A2316",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "28",
      y1: "-13",
      x2: "28",
      y2: "13",
      stroke: "#7A2316",
      strokeWidth: "0.7",
      opacity: "0.7"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "24",
      y: "-9",
      width: "1",
      height: "18",
      fill: "#3F2A18"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "26",
      y: "-9",
      width: "1",
      height: "18",
      fill: "#3F2A18"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "-26",
      y: "-8",
      width: "34",
      height: "7",
      fill: "#fff",
      stroke: "#7A2316",
      strokeWidth: "0.4"
    }), /*#__PURE__*/React.createElement("text", {
      x: "-9",
      y: "-2.6",
      textAnchor: "middle",
      fill: "#7A2316",
      fontSize: "5",
      fontWeight: "800",
      fontFamily: "ui-sans-serif,system-ui",
      letterSpacing: "0.04em"
    }, "SIMPLEGRID"), /*#__PURE__*/React.createElement("text", {
      x: "-9",
      y: "9",
      textAnchor: "middle",
      fill: "#fff",
      fontSize: "3.6",
      fontWeight: "700",
      fontFamily: "ui-monospace,monospace",
      opacity: "0.92"
    }, "SGAU 4521 \xB7 40HC"), /*#__PURE__*/React.createElement("rect", {
      x: "-30",
      y: "13",
      width: "60",
      height: "2",
      fill: "#1F2937",
      opacity: "0.35"
    }));
  }

  // Vertical geometry
  const W = 700;
  const STATION_GAP = 50;
  const ROAD_TOP = 60;
  const ROAD_BOTTOM = ROAD_TOP + (TOTAL - 1) * STATION_GAP;
  const H = ROAD_BOTTOM + 80;
  const ROAD_X = 110;
  const ROAD_W = 56;
  const stationYs = STAGES.map((_, i) => ROAD_TOP + i * STATION_GAP);
  const cargoY = stationYs[stage] + (stationYs[Math.min(stage + 1, TOTAL - 1)] - stationYs[stage]) * subProg;
  const SVGBlock = /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    style: {
      display: 'block',
      width: '100%',
      height: 'auto'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "vsky",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#F4F7FB"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#FFFFFF"
  })), /*#__PURE__*/React.createElement("pattern", {
    id: "vgrid",
    width: "40",
    height: "40",
    patternUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 40 0 L 0 0 0 40",
    fill: "none",
    stroke: "#E8ECF1",
    strokeWidth: "0.5"
  })), /*#__PURE__*/React.createElement("clipPath", {
    id: "roadClip"
  }, /*#__PURE__*/React.createElement("rect", {
    x: ROAD_X - ROAD_W / 2,
    y: ROAD_TOP - 24,
    width: ROAD_W,
    height: ROAD_BOTTOM - ROAD_TOP + 48
  }))), /*#__PURE__*/React.createElement("rect", {
    width: W,
    height: H,
    fill: "url(#vsky)"
  }), /*#__PURE__*/React.createElement("rect", {
    width: W,
    height: H,
    fill: "url(#vgrid)",
    opacity: "0.55"
  }), /*#__PURE__*/React.createElement("rect", {
    x: ROAD_X - ROAD_W / 2,
    y: ROAD_TOP - 24,
    width: ROAD_W,
    height: ROAD_BOTTOM - ROAD_TOP + 48,
    fill: "#2B313A"
  }), /*#__PURE__*/React.createElement("rect", {
    x: ROAD_X - ROAD_W / 2,
    y: ROAD_TOP - 24,
    width: "2",
    height: ROAD_BOTTOM - ROAD_TOP + 48,
    fill: "#3A414C"
  }), /*#__PURE__*/React.createElement("rect", {
    x: ROAD_X + ROAD_W / 2 - 2,
    y: ROAD_TOP - 24,
    width: "2",
    height: ROAD_BOTTOM - ROAD_TOP + 48,
    fill: "#3A414C"
  }), /*#__PURE__*/React.createElement("g", {
    clipPath: "url(#roadClip)"
  }, Array.from({
    length: 28
  }).map((_, i) => /*#__PURE__*/React.createElement("rect", {
    key: i,
    x: ROAD_X - 1,
    y: ROAD_TOP - 24 + i * 38 + t * 38 % 38 - 38,
    width: "2",
    height: "20",
    fill: "#F4D35E"
  }))), /*#__PURE__*/React.createElement("rect", {
    x: ROAD_X - ROAD_W / 2,
    y: ROAD_TOP - 24,
    width: ROAD_W,
    height: Math.max(0, cargoY - (ROAD_TOP - 24)),
    fill: cur.color,
    opacity: "0.18"
  }), STAGES.map((s, i) => {
    const y = stationYs[i];
    const isActive = i === stage;
    const isDone = i < stage;
    return /*#__PURE__*/React.createElement("g", {
      key: `stn-${i}`,
      style: {
        cursor: 'pointer'
      },
      onClick: () => {
        setT(i + 0.001);
        setPlaying(false);
      }
    }, /*#__PURE__*/React.createElement("line", {
      x1: ROAD_X + ROAD_W / 2,
      y1: y,
      x2: ROAD_X + ROAD_W / 2 + 36,
      y2: y,
      stroke: isActive ? s.color : isDone ? s.color : '#D1D5DB',
      strokeWidth: isActive ? 2 : 1,
      strokeDasharray: isActive || isDone ? '0' : '3,3',
      opacity: isActive ? 1 : isDone ? 0.7 : 0.6
    }), /*#__PURE__*/React.createElement("rect", {
      x: ROAD_X + ROAD_W / 2 + 36,
      y: y - 17,
      width: W - (ROAD_X + ROAD_W / 2 + 36) - 24,
      height: "34",
      rx: "6",
      fill: isActive ? '#fff' : isDone ? '#F4F7FB' : '#FAFBFC',
      stroke: isActive ? s.color : isDone ? '#C9D2DD' : '#E5E8ED',
      strokeWidth: isActive ? 2 : 1,
      style: {
        transition: 'all 0.2s'
      }
    }), /*#__PURE__*/React.createElement("text", {
      x: ROAD_X + ROAD_W / 2 + 50,
      y: y + 1,
      fill: "#9CA3AF",
      fontSize: "9",
      fontWeight: "700",
      fontFamily: "ui-monospace,monospace"
    }, String(s.id).padStart(2, '0')), /*#__PURE__*/React.createElement("rect", {
      x: ROAD_X + ROAD_W / 2 + 70,
      y: y - 8,
      width: "56",
      height: "16",
      rx: "3",
      fill: isActive ? s.color : isDone ? s.color : '#fff',
      stroke: isActive ? s.color : isDone ? s.color : '#E5E8ED',
      strokeWidth: "1",
      opacity: isActive || isDone ? 1 : 0.95
    }), /*#__PURE__*/React.createElement("text", {
      x: ROAD_X + ROAD_W / 2 + 98,
      y: y + 3.5,
      textAnchor: "middle",
      fill: isActive || isDone ? '#fff' : '#6B7280',
      fontSize: "9.5",
      fontWeight: "700",
      letterSpacing: "0.06em",
      fontFamily: "ui-sans-serif,system-ui"
    }, s.short), /*#__PURE__*/React.createElement("text", {
      x: ROAD_X + ROAD_W / 2 + 138,
      y: y + 3.5,
      fill: isActive ? '#1F2937' : isDone ? '#374151' : '#6B7280',
      fontSize: "11.5",
      fontWeight: isActive ? 600 : 500,
      fontFamily: "ui-sans-serif,system-ui"
    }, s.h), /*#__PURE__*/React.createElement("circle", {
      cx: ROAD_X,
      cy: y,
      r: isActive ? 7 : 5,
      fill: isDone || isActive ? s.color : '#fff',
      stroke: s.color,
      strokeWidth: isActive ? 2 : 1.5,
      style: {
        transition: 'all 0.25s'
      }
    }), isActive && /*#__PURE__*/React.createElement("circle", {
      cx: ROAD_X,
      cy: y,
      r: "11",
      fill: "none",
      stroke: s.color,
      strokeWidth: "1.5",
      opacity: "0.5"
    }, /*#__PURE__*/React.createElement("animate", {
      attributeName: "r",
      from: "7",
      to: "14",
      dur: "1.4s",
      repeatCount: "indefinite"
    }), /*#__PURE__*/React.createElement("animate", {
      attributeName: "opacity",
      from: "0.6",
      to: "0",
      dur: "1.4s",
      repeatCount: "indefinite"
    })));
  }), /*#__PURE__*/React.createElement("g", {
    transform: `translate(${ROAD_X + Math.sin(t * 12) * 1.2}, ${cargoY})`
  }, /*#__PURE__*/React.createElement(CargoGlyph, {
    stage: stage,
    color: cur.color,
    subProg: subProg
  })), [1, 2, 3].map(k => /*#__PURE__*/React.createElement("line", {
    key: k,
    x1: ROAD_X - 8 + (k - 2) * 4,
    y1: cargoY - 24 - k * 8,
    x2: ROAD_X - 8 + (k - 2) * 4,
    y2: cargoY - 14 - k * 8,
    stroke: cur.color,
    strokeWidth: "1.5",
    strokeLinecap: "round",
    opacity: 0.55 - k * 0.13
  }))));
  const StepCard = /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.16em',
      color: cur.color,
      marginBottom: 6,
      textTransform: 'uppercase'
    }
  }, "Step ", String(cur.id).padStart(2, '0'), " of ", TOTAL), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--fg1)',
      margin: '0 0 8px',
      letterSpacing: '-0.01em'
    }
  }, cur.h), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12.5,
      color: 'var(--fg2)',
      lineHeight: 1.55,
      margin: '0 0 12px'
    }
  }, cur.p), cur.pricing ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(74,123,247,0.06)',
      border: '1px solid rgba(74,123,247,0.18)',
      borderRadius: 8,
      padding: '8px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      fontWeight: 700,
      letterSpacing: '0.14em',
      color: 'var(--sg-blue)',
      textTransform: 'uppercase',
      marginBottom: 2
    }
  }, "Contractor pricing"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--fg1)'
    }
  }, cur.pricing)) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg3)',
      fontStyle: 'italic'
    }
  }, "Internal step - tracked, audited, time-stamped."));
  const Controls = /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setPlaying(p => !p),
    style: {
      width: 36,
      height: 36,
      borderRadius: 999,
      border: 'none',
      cursor: 'pointer',
      background: cur.color,
      color: '#fff',
      fontSize: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
    },
    "aria-label": playing ? 'Pause' : 'Play'
  }, playing ? /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "5",
    width: "4",
    height: "14",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "5",
    width: "4",
    height: "14",
    rx: "1"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "6,4 20,12 6,20"
  }))), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: TOTAL - 0.001,
    step: "0.01",
    value: t,
    onChange: e => {
      setT(parseFloat(e.target.value));
      setPlaying(false);
    },
    style: {
      flex: 1,
      accentColor: cur.color
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setT(0);
      setPlaying(true);
    },
    style: {
      padding: '7px 12px',
      borderRadius: 999,
      border: '1px solid var(--border)',
      background: '#fff',
      color: 'var(--fg1)',
      fontSize: 11,
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, "Restart"));
  const Legend = /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      fontSize: 11.5,
      color: 'var(--fg2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.14em',
      color: 'var(--fg3)',
      textTransform: 'uppercase',
      marginBottom: 2
    }
  }, "Legend"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: '#7C3AED'
    }
  }), "Planning / SKU stage"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: '#0EA5E9'
    }
  }), "Procurement / inventory"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: '#F59E0B'
    }
  }), "Contractor work"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: '#EF4444'
    }
  }), "Quality gate"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: '#10B981'
    }
  }), "Finishing / output"));

  // ---- Compact mode: SVG only, with controls + step card stacked beneath ----
  if (compact) {
    return /*#__PURE__*/React.createElement("div", {
      ref: containerRef,
      style: {
        background: 'linear-gradient(180deg, #fff 0%, var(--sg-off-white) 100%)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: 16,
        overflow: 'hidden'
      }
    }, SVGBlock, /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, Controls, StepCard));
  }

  // ---- Full mode: title + intro + 2-column (line | sticky card) ----
  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    className: "infographic",
    style: {
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '36px 40px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "infographic-title"
  }, "THE FACTORY LINE"), /*#__PURE__*/React.createElement("h3", {
    className: "infographic-h"
  }, "From sales order to dispatch - every station the order travels through."), /*#__PURE__*/React.createElement("p", {
    className: "infographic-sub"
  }, "Press play, scrub the timeline, or tap any station. Watch the order transform from a piece of paper into raw planks, into cut components, into an assembled table - sanded, finished, fitted with hardware, packaged, and dispatched in a 40-foot container.")), /*#__PURE__*/React.createElement("div", {
    className: "elite-factory-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 380px',
      gap: 20,
      padding: '0 40px 28px',
      alignItems: 'start'
    }
  }, SVGBlock, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 16,
      alignSelf: 'start',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.16em',
      color: cur.color,
      marginBottom: 6,
      textTransform: 'uppercase'
    }
  }, "Step ", String(cur.id).padStart(2, '0'), " of ", TOTAL), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--fg1)',
      margin: '0 0 8px',
      letterSpacing: '-0.01em'
    }
  }, cur.h), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--fg2)',
      lineHeight: 1.55,
      margin: '0 0 14px'
    }
  }, cur.p), cur.pricing ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(74,123,247,0.06)',
      border: '1px solid rgba(74,123,247,0.18)',
      borderRadius: 8,
      padding: '10px 14px',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.14em',
      color: 'var(--sg-blue)',
      textTransform: 'uppercase',
      marginBottom: 3
    }
  }, "Contractor pricing"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--fg1)'
    }
  }, cur.pricing)) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)',
      fontStyle: 'italic',
      marginBottom: 12
    }
  }, "Internal step - no contractor settlement here. Tracked, audited, time-stamped."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, Controls), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg3)',
      marginTop: 10
    }
  }, "Tap any station to jump.")), Legend)), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 900px) {
          .elite-factory-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `));
}
window.EliteFactoryRoad = EliteFactoryRoad;