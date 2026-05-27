const coverStyles = [{
  bg: '#1A1A1A',
  fg: '#fff',
  sub: '#8A8F98',
  accent: '#3461E0'
}, {
  bg: 'var(--sg-blue)',
  fg: '#fff',
  sub: 'rgba(255,255,255,0.7)',
  accent: '#fff'
}, {
  bg: 'var(--sg-blue-light)',
  fg: 'var(--sg-blue-dark)',
  sub: 'rgba(30,58,138,0.6)',
  accent: 'var(--sg-blue-dark)'
}];

// Simple, topical SVG graphics - one per blog
function BlogGraphic({
  id,
  fg,
  sub,
  accent
}) {
  const s = {
    fg,
    sub,
    accent
  };
  // 1 Event sourcing - timeline of events
  if (id === 1) return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 110",
    style: {
      width: '70%',
      height: 'auto'
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "55",
    x2: "180",
    y2: "55",
    stroke: s.sub,
    strokeWidth: "1.5"
  }), [30, 70, 110, 150].map((x, i) => /*#__PURE__*/React.createElement("g", {
    key: i
  }, /*#__PURE__*/React.createElement("circle", {
    cx: x,
    cy: "55",
    r: i === 3 ? 6 : 4,
    fill: i === 3 ? s.accent : s.fg
  }), /*#__PURE__*/React.createElement("text", {
    x: x,
    y: "78",
    fontSize: "7",
    fill: s.sub,
    textAnchor: "middle",
    fontFamily: "monospace"
  }, "E", i + 1))), /*#__PURE__*/React.createElement("text", {
    x: "100",
    y: "30",
    fontSize: "10",
    fill: s.fg,
    textAnchor: "middle",
    fontWeight: "600",
    fontFamily: "monospace"
  }, "Append only"));
  // 2 SG Schema - business speaks, software listens
  if (id === 2) return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 110",
    style: {
      width: '70%',
      height: 'auto'
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "20",
    y: "35",
    width: "70",
    height: "40",
    rx: "4",
    fill: "none",
    stroke: s.fg,
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "55",
    y: "59",
    fontSize: "9",
    fill: s.fg,
    textAnchor: "middle",
    fontWeight: "600"
  }, "Business"), /*#__PURE__*/React.createElement("path", {
    d: "M95 55 L125 55",
    stroke: s.accent,
    strokeWidth: "1.5",
    markerEnd: "url(#a1)"
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "a1",
    markerWidth: "8",
    markerHeight: "8",
    refX: "6",
    refY: "4",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L6,4 L0,8 z",
    fill: s.accent
  }))), /*#__PURE__*/React.createElement("rect", {
    x: "130",
    y: "35",
    width: "55",
    height: "40",
    rx: "4",
    fill: s.accent,
    opacity: "0.15"
  }), /*#__PURE__*/React.createElement("text", {
    x: "157",
    y: "59",
    fontSize: "9",
    fill: s.accent,
    textAnchor: "middle",
    fontWeight: "600"
  }, "Model"));
  // 3 Entity roots - cluster with a root
  if (id === 3) return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 110",
    style: {
      width: '70%',
      height: 'auto'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "100",
    cy: "55",
    r: "38",
    fill: "none",
    stroke: s.sub,
    strokeWidth: "1",
    strokeDasharray: "3 3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "100",
    cy: "55",
    r: "12",
    fill: s.accent
  }), /*#__PURE__*/React.createElement("text", {
    x: "100",
    y: "58",
    fontSize: "7",
    fill: "#fff",
    textAnchor: "middle",
    fontWeight: "700"
  }, "ROOT"), [[70, 35], [130, 35], [70, 80], [130, 80]].map(([x, y], i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: x,
    cy: y,
    r: "5",
    fill: s.fg
  })), [[70, 35], [130, 35], [70, 80], [130, 80]].map(([x, y], i) => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: "100",
    y1: "55",
    x2: x,
    y2: y,
    stroke: s.sub,
    strokeWidth: "1"
  })));
  // 4 Multi-tenant - shared platform, separate DBs
  if (id === 4) return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 110",
    style: {
      width: '70%',
      height: 'auto'
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "30",
    y: "20",
    width: "140",
    height: "18",
    rx: "3",
    fill: s.accent,
    opacity: "0.3"
  }), /*#__PURE__*/React.createElement("text", {
    x: "100",
    y: "32",
    fontSize: "8",
    fill: s.fg,
    textAnchor: "middle",
    fontWeight: "600"
  }, "One platform"), [0, 1, 2].map(i => /*#__PURE__*/React.createElement("g", {
    key: i
  }, /*#__PURE__*/React.createElement("rect", {
    x: 35 + i * 46,
    y: "55",
    width: "40",
    height: "40",
    rx: "3",
    fill: "none",
    stroke: s.fg,
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: 55 + i * 46,
    cy: "68",
    r: "3",
    fill: s.fg
  }), /*#__PURE__*/React.createElement("line", {
    x1: 42 + i * 46,
    y1: "78",
    x2: 68 + i * 46,
    y2: "78",
    stroke: s.fg,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: 42 + i * 46,
    y1: "84",
    x2: 68 + i * 46,
    y2: "84",
    stroke: s.fg,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: 42 + i * 46,
    y1: "90",
    x2: 60 + i * 46,
    y2: "90",
    stroke: s.fg,
    strokeWidth: "1"
  }))));
  // 5 Customization - code vs rows in table
  if (id === 5) return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 110",
    style: {
      width: '70%',
      height: 'auto'
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "30",
    y: "25",
    width: "140",
    height: "60",
    rx: "3",
    fill: "none",
    stroke: s.fg,
    strokeWidth: "1.5"
  }), [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: "30",
    y1: 40 + i * 12,
    x2: "170",
    y2: 40 + i * 12,
    stroke: s.sub,
    strokeWidth: "0.8"
  })), /*#__PURE__*/React.createElement("line", {
    x1: "75",
    y1: "25",
    x2: "75",
    y2: "85",
    stroke: s.sub,
    strokeWidth: "0.8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "120",
    y1: "25",
    x2: "120",
    y2: "85",
    stroke: s.sub,
    strokeWidth: "0.8"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "30",
    y: "52",
    width: "140",
    height: "12",
    fill: s.accent,
    opacity: "0.25"
  }), /*#__PURE__*/React.createElement("text", {
    x: "100",
    y: "100",
    fontSize: "8",
    fill: s.sub,
    textAnchor: "middle",
    fontFamily: "monospace"
  }, "rules table"));
  // 6 Module vs SG Schema - stacked boxes vs organic shape
  if (id === 6) return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 110",
    style: {
      width: '70%',
      height: 'auto'
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("rect", {
    key: i,
    x: "25",
    y: 25 + i * 18,
    width: "60",
    height: "14",
    rx: "2",
    fill: "none",
    stroke: s.sub,
    strokeWidth: "1.2"
  })), /*#__PURE__*/React.createElement("text", {
    x: "55",
    y: "92",
    fontSize: "7",
    fill: s.sub,
    textAnchor: "middle"
  }, "modules"), /*#__PURE__*/React.createElement("path", {
    d: "M115 30 Q160 25 170 55 Q175 85 135 85 Q105 82 115 55 Z",
    fill: "none",
    stroke: s.accent,
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "143",
    y: "92",
    fontSize: "7",
    fill: s.accent,
    textAnchor: "middle",
    fontWeight: "600"
  }, "SG Schema"));
  // 7 AI chatbot with Claude - speech bubble + cursor
  if (id === 7) return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 110",
    style: {
      width: '70%',
      height: 'auto'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M30 30 L150 30 Q158 30 158 38 L158 62 Q158 70 150 70 L60 70 L48 82 L48 70 L38 70 Q30 70 30 62 Z",
    fill: s.accent,
    opacity: "0.2",
    stroke: s.accent,
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "94",
    y: "54",
    fontSize: "9",
    fill: s.fg,
    textAnchor: "middle",
    fontFamily: "monospace"
  }, "stock of 304?"), /*#__PURE__*/React.createElement("rect", {
    x: "162",
    y: "46",
    width: "2",
    height: "14",
    fill: s.fg
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "opacity",
    values: "1;0;1",
    dur: "1s",
    repeatCount: "indefinite"
  })));
  // 8 Conversational UX - chat bubbles stacked
  if (id === 8) return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 110",
    style: {
      width: '70%',
      height: 'auto'
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "30",
    y: "20",
    width: "110",
    height: "20",
    rx: "10",
    fill: s.sub,
    opacity: "0.3"
  }), /*#__PURE__*/React.createElement("text", {
    x: "85",
    y: "34",
    fontSize: "8",
    fill: s.fg,
    textAnchor: "middle"
  }, "Got 200 sheets"), /*#__PURE__*/React.createElement("rect", {
    x: "60",
    y: "48",
    width: "110",
    height: "20",
    rx: "10",
    fill: s.accent
  }), /*#__PURE__*/React.createElement("text", {
    x: "115",
    y: "62",
    fontSize: "8",
    fill: "#fff",
    textAnchor: "middle"
  }, "\u2713 PO matched"), /*#__PURE__*/React.createElement("rect", {
    x: "30",
    y: "76",
    width: "90",
    height: "20",
    rx: "10",
    fill: s.sub,
    opacity: "0.3"
  }), /*#__PURE__*/React.createElement("text", {
    x: "75",
    y: "90",
    fontSize: "8",
    fill: s.fg,
    textAnchor: "middle"
  }, "20 rejected"));
  // 9 Landed cost - stacked cost components
  if (id === 9) return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 110",
    style: {
      width: '70%',
      height: 'auto'
    }
  }, [[35, 'Wood', 45], [60, 'Labor', 55], [80, 'Rework', 30], [100, 'QC', 25], [115, 'Pack', 40]].map(([y, l, w], i) => /*#__PURE__*/React.createElement("g", {
    key: i
  }, /*#__PURE__*/React.createElement("rect", {
    x: "40",
    y: y,
    width: w,
    height: "10",
    fill: s.accent,
    opacity: 0.3 + i * 0.15
  }), /*#__PURE__*/React.createElement("text", {
    x: "38",
    y: y + 8,
    fontSize: "7",
    fill: s.fg,
    textAnchor: "end"
  }, l))), /*#__PURE__*/React.createElement("line", {
    x1: "40",
    y1: "95",
    x2: "160",
    y2: "95",
    stroke: s.fg,
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "165",
    y: "98",
    fontSize: "9",
    fill: s.accent,
    fontWeight: "700",
    fontFamily: "monospace"
  }, "$"));
  // 10 Culture - factory building
  if (id === 10) return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 110",
    style: {
      width: '70%',
      height: 'auto'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M30 85 L30 55 L55 40 L55 55 L80 40 L80 55 L105 40 L105 55 L130 40 L130 85 Z",
    fill: "none",
    stroke: s.fg,
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "40",
    y: "68",
    width: "10",
    height: "17",
    fill: s.accent
  }), /*#__PURE__*/React.createElement("rect", {
    x: "65",
    y: "68",
    width: "10",
    height: "17",
    fill: s.sub,
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "90",
    y: "68",
    width: "10",
    height: "17",
    fill: s.sub,
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "115",
    y: "68",
    width: "10",
    height: "17",
    fill: s.accent
  }), /*#__PURE__*/React.createElement("line", {
    x1: "140",
    y1: "85",
    x2: "170",
    y2: "85",
    stroke: s.sub,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "150",
    y1: "85",
    x2: "150",
    y2: "60",
    stroke: s.sub,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M150 60 L155 55 L160 60",
    fill: "none",
    stroke: s.sub,
    strokeWidth: "1"
  }));
  // 11 Mid-market gap - squeezed in between
  if (id === 11) return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 110",
    style: {
      width: '70%',
      height: 'auto'
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "20",
    y: "40",
    width: "35",
    height: "40",
    fill: s.sub,
    opacity: "0.4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "37",
    y: "64",
    fontSize: "7",
    fill: s.fg,
    textAnchor: "middle"
  }, "SAP"), /*#__PURE__*/React.createElement("rect", {
    x: "75",
    y: "30",
    width: "50",
    height: "50",
    fill: s.accent,
    opacity: "0.3",
    stroke: s.accent,
    strokeWidth: "1.5",
    strokeDasharray: "3 2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "100",
    y: "52",
    fontSize: "8",
    fill: s.fg,
    textAnchor: "middle",
    fontWeight: "700"
  }, "MID"), /*#__PURE__*/React.createElement("text", {
    x: "100",
    y: "64",
    fontSize: "7",
    fill: s.fg,
    textAnchor: "middle"
  }, "MARKET"), /*#__PURE__*/React.createElement("rect", {
    x: "145",
    y: "50",
    width: "35",
    height: "30",
    fill: s.sub,
    opacity: "0.4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "162",
    y: "69",
    fontSize: "7",
    fill: s.fg,
    textAnchor: "middle"
  }, "QB"));
  // 12 Spreadsheets - messy grid with circles
  if (id === 12) return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 110",
    style: {
      width: '70%',
      height: 'auto'
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "30",
    y: "20",
    width: "140",
    height: "75",
    fill: "none",
    stroke: s.fg,
    strokeWidth: "1.2"
  }), [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: "30",
    y1: 35 + i * 12,
    x2: "170",
    y2: 35 + i * 12,
    stroke: s.sub,
    strokeWidth: "0.6"
  })), [0, 1, 2, 3, 4, 5].map(i => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: 30 + i * 25,
    y1: "20",
    x2: 30 + i * 25,
    y2: "95",
    stroke: s.sub,
    strokeWidth: "0.6"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "80",
    cy: "40",
    r: "6",
    fill: "none",
    stroke: s.accent,
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "130",
    cy: "64",
    r: "6",
    fill: "none",
    stroke: s.accent,
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "55",
    cy: "76",
    r: "6",
    fill: "none",
    stroke: s.accent,
    strokeWidth: "1.5"
  }));
  // 13 Change orders - stack of invoices
  if (id === 13) return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 110",
    style: {
      width: '70%',
      height: 'auto'
    }
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("g", {
    key: i
  }, /*#__PURE__*/React.createElement("rect", {
    x: 55 + i * 4,
    y: 20 + i * 4,
    width: "80",
    height: "60",
    fill: "#fff",
    stroke: s.fg,
    strokeWidth: "1"
  }))), /*#__PURE__*/React.createElement("rect", {
    x: "67",
    y: "32",
    width: "80",
    height: "60",
    fill: "#fff",
    stroke: s.accent,
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "73",
    y1: "44",
    x2: "135",
    y2: "44",
    stroke: s.sub,
    strokeWidth: "0.8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "73",
    y1: "52",
    x2: "125",
    y2: "52",
    stroke: s.sub,
    strokeWidth: "0.8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "73",
    y1: "60",
    x2: "130",
    y2: "60",
    stroke: s.sub,
    strokeWidth: "0.8"
  }), /*#__PURE__*/React.createElement("text", {
    x: "130",
    y: "84",
    fontSize: "10",
    fill: s.accent,
    textAnchor: "end",
    fontWeight: "700",
    fontFamily: "monospace"
  }, "+$12K"));
  // 14 AI changed deployment - 12mo to 7d
  if (id === 14) return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 110",
    style: {
      width: '70%',
      height: 'auto'
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "25",
    y: "45",
    width: "90",
    height: "14",
    fill: s.sub,
    opacity: "0.4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "70",
    y: "70",
    fontSize: "8",
    fill: s.sub,
    textAnchor: "middle"
  }, "12 months"), /*#__PURE__*/React.createElement("path", {
    d: "M120 52 L140 52",
    stroke: s.accent,
    strokeWidth: "1.5",
    markerEnd: "url(#a14)"
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "a14",
    markerWidth: "8",
    markerHeight: "8",
    refX: "6",
    refY: "4",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L6,4 L0,8 z",
    fill: s.accent
  }))), /*#__PURE__*/React.createElement("rect", {
    x: "145",
    y: "45",
    width: "18",
    height: "14",
    fill: s.accent
  }), /*#__PURE__*/React.createElement("text", {
    x: "154",
    y: "70",
    fontSize: "8",
    fill: s.accent,
    textAnchor: "middle",
    fontWeight: "700"
  }, "7 days"));
  // 15 ERP cannot keep up - diverging lines
  if (id === 15) return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 110",
    style: {
      width: '70%',
      height: 'auto'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M25 85 Q 70 85 100 55 T 175 20",
    fill: "none",
    stroke: s.accent,
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 85 L 175 75",
    fill: "none",
    stroke: s.sub,
    strokeWidth: "1.5",
    strokeDasharray: "3 3"
  }), /*#__PURE__*/React.createElement("text", {
    x: "178",
    y: "22",
    fontSize: "7",
    fill: s.accent,
    fontWeight: "700"
  }, "Business"), /*#__PURE__*/React.createElement("text", {
    x: "178",
    y: "78",
    fontSize: "7",
    fill: s.sub
  }, "ERP"), /*#__PURE__*/React.createElement("line", {
    x1: "25",
    y1: "90",
    x2: "175",
    y2: "90",
    stroke: s.fg,
    strokeWidth: "1"
  }));
  // 16 Warehouse - clipboard & phone
  if (id === 16) return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 110",
    style: {
      width: '70%',
      height: 'auto'
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "40",
    y: "25",
    width: "50",
    height: "70",
    rx: "3",
    fill: "none",
    stroke: s.fg,
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "55",
    y: "20",
    width: "20",
    height: "10",
    rx: "2",
    fill: s.fg
  }), [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: "48",
    y1: 42 + i * 10,
    x2: "82",
    y2: 42 + i * 10,
    stroke: s.sub,
    strokeWidth: "0.8"
  })), /*#__PURE__*/React.createElement("rect", {
    x: "115",
    y: "28",
    width: "40",
    height: "65",
    rx: "5",
    fill: s.accent
  }), /*#__PURE__*/React.createElement("rect", {
    x: "119",
    y: "34",
    width: "32",
    height: "45",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "135",
    cy: "87",
    r: "2.5",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("text", {
    x: "135",
    y: "58",
    fontSize: "7",
    fill: s.accent,
    textAnchor: "middle",
    fontWeight: "700"
  }, "OK"));
  // 17 Best practices myth - stamp with X
  if (id === 17) return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 110",
    style: {
      width: '70%',
      height: 'auto'
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "45",
    y: "30",
    width: "110",
    height: "50",
    rx: "4",
    fill: "none",
    stroke: s.fg,
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "100",
    y: "52",
    fontSize: "10",
    fill: s.fg,
    textAnchor: "middle",
    fontWeight: "700"
  }, "BEST PRACTICES"), /*#__PURE__*/React.createElement("text", {
    x: "100",
    y: "68",
    fontSize: "7",
    fill: s.sub,
    textAnchor: "middle"
  }, "industry average"), /*#__PURE__*/React.createElement("line", {
    x1: "55",
    y1: "35",
    x2: "145",
    y2: "75",
    stroke: s.accent,
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "145",
    y1: "35",
    x2: "55",
    y2: "75",
    stroke: s.accent,
    strokeWidth: "3"
  }));
  // fallback
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 110",
    style: {
      width: '60%',
      height: 'auto'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "100",
    cy: "55",
    r: "30",
    fill: "none",
    stroke: s.fg,
    strokeWidth: "1.5"
  }));
}
function fmtBlogDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(n => parseInt(n, 10));
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return months[m - 1] + ' ' + d + ', ' + y;
}
function BlogPage() {
  const [showLogin, setShowLogin] = React.useState(false);
  const [filter, setFilter] = React.useState('All');
  const sorted = [...BLOG_DATA].sort((a, b) =>
    (b.datePublished || '').localeCompare(a.datePublished || '')
  );
  const cats = ['All', ...new Set(sorted.map(b => b.cat))];
  const filtered = filter === 'All' ? sorted : sorted.filter(b => b.cat === filter);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    page: "blog",
    onLoginClick: () => setShowLogin(true)
  }), /*#__PURE__*/React.createElement("main", { id: "main" }, /*#__PURE__*/React.createElement("section", {
    className: "section",
    style: {
      paddingBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "BLOG"), /*#__PURE__*/React.createElement("h1", {
    className: "h2"
  }, "ERP for manufacturers - field notes from operators who built it."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      marginBottom: 24
    }
  }, "Straight talk about ERP and operations. No jargon. No \"digital transformation.\" What works on the factory floor."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'nowrap',
      marginBottom: 28,
      overflowX: 'auto',
      paddingBottom: 4,
      WebkitOverflowScrolling: 'touch'
    }
  }, cats.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setFilter(c),
    className: "btn btn-sm",
    style: {
      background: filter === c ? 'var(--sg-blue)' : '#fff',
      color: filter === c ? '#fff' : 'var(--fg2)',
      border: filter === c ? 'none' : '1px solid var(--border)',
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, c))), /*#__PURE__*/React.createElement("div", {
    className: "blog-grid"
  }, filtered.map((b, i) => {
    const style = coverStyles[i % 3];
    return /*#__PURE__*/React.createElement("a", {
      key: b.id,
      className: "blog-card",
      href: b.slug ? 'blog/' + b.slug + '/' : 'post.html?id=' + b.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "blog-cover",
      style: {
        background: style.bg,
        color: style.fg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 16px',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "cat-label",
      style: {
        position: 'absolute',
        top: 14,
        left: 16,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: style.sub
      }
    }, b.cat), /*#__PURE__*/React.createElement(BlogGraphic, {
      id: b.id,
      fg: style.fg,
      sub: style.sub,
      accent: style.accent
    })), /*#__PURE__*/React.createElement("div", {
      className: "blog-body"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "blog-card-title"
    }, b.title), /*#__PURE__*/React.createElement("div", {
      className: "meta"
    },
      b.datePublished && /*#__PURE__*/React.createElement("time", { dateTime: b.datePublished }, fmtBlogDate(b.datePublished)),
      b.datePublished && b.readTime && /*#__PURE__*/React.createElement("span", { "aria-hidden": "true" }, " · "),
      b.readTime && /*#__PURE__*/React.createElement("span", null, b.readTime, " read")
    ));
  }))))), /*#__PURE__*/React.createElement(Footer, null), showLogin && /*#__PURE__*/React.createElement(LoginModal, {
    onClose: () => setShowLogin(false)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(BlogPage, null));