// Elite Factory Road - interactive motion graphic, vertical layout.
// A single vertical line. Sales order enters at the top, transforms through 19 stages,
// dispatches as a shipping container at the bottom.
// Auto-plays; user can scrub or tap any station.

function EliteFactoryRoad({ compact = false } = {}) {
  const TOTAL = 19;
  const [t, setT] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const rafRef = React.useRef(null);
  const lastRef = React.useRef(performance.now());
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (!playing) return;
    const tick = (now) => {
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
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stage = Math.max(0, Math.min(TOTAL - 1, Math.floor(t)));
  const subProg = Math.max(0, Math.min(1, t - stage));

  const STAGES = [
    { id: 1,  short:'SO',    h:'Sales order received',  p:'Buyer PO arrives. AI parses any format and creates a sales order.', kind:'so',     pricing:null,                                                  color:'#4A7BF7' },
    { id: 2,  short:'PLAN',  h:'Planning & wood aggregated',  p:'Planner allocates per SKU. All component-level wood needs aggregated across orders.', kind:'plan',  pricing:null,                                  color:'#7C3AED' },
    { id: 3,  short:'PO',    h:'Wood ordered',          p:'One PO per species + thickness, multi-vendor.',                    kind:'po',     pricing:'Quoted by species + thickness',                       color:'#0EA5E9' },
    { id: 4,  short:'RECV',  h:'Wood received',         p:'Seasoned vs unseasoned check at receipt. Inventory live.',         kind:'recv',   pricing:null,                                                  color:'#10B981' },
    { id: 5,  short:'SEAS',  h:'Seasoning chamber',     p:'Unseasoned stock loaded into the seasoning chamber. Door closes, timer runs, planks come out dry and stable.', kind:'seas', pricing:null,         color:'#10B981' },
    { id: 6,  short:'STOCK', h:'Stocked centrally',     p:'Per-species, per-thickness CFT ledger.',                           kind:'stock',  pricing:null,                                                  color:'#0EA5E9' },
    { id: 7,  short:'MACH',  h:'Machining contractor',  p:'Saw and router work the wood; out come the cut components - panels, frames, legs, rails - each tagged to a SKU.', kind:'mach', pricing:'sqft (panels) · running ft (frames) · by thickness', color:'#F59E0B' },
    { id: 8,  short:'QC1',   h:'Machining QC',          p:'Pass enters component stock; fail returns or scraps.',             kind:'qc',     pricing:null,                                                  color:'#EF4444' },
    { id: 9,  short:'COMP',  h:'Components in stock',   p:'Machined components booked and ready for assembly.',               kind:'compstock',pricing:null,                                                color:'#0EA5E9' },
    { id:10,  short:'ASSY',  h:'Assembly contractor',   p:'Components merge into a SKU. Tracking switches component → SKU.', kind:'assy',   pricing:'Per SKU',                                             color:'#7C3AED' },
    { id:11,  short:'QC2',   h:'Assembly QC',           p:'Joints, squareness, fit-for-finish.',                              kind:'qc',     pricing:null,                                                  color:'#EF4444' },
    { id:12,  short:'XFER',  h:'Inter-unit transfer',   p:'Moves to finishing unit with audit trail.',                        kind:'xfer',   pricing:null,                                                  color:'#7C3AED' },
    { id:13,  short:'SAND',  h:'Sanding contractor',    p:'90% of SKUs sanded by contractor.',                                kind:'sand',   pricing:'sqft of finished surface',                            color:'#F59E0B' },
    { id:14,  short:'QC3',   h:'Sanding QC',            p:'Smoothness, profile, dust-free.',                                  kind:'qc',     pricing:null,                                                  color:'#EF4444' },
    { id:15,  short:'FIN',   h:'Finishing contractor',  p:'Stain / lacquer / polish per SKU spec.',                           kind:'fin',    pricing:'sqft of finished surface',                            color:'#10B981' },
    { id:16,  short:'HW',    h:'Hardware fitting',      p:'Hinges, slides, handles, screws fitted to spec.',                  kind:'hw',     pricing:'# fittings × screw size',                             color:'#F59E0B' },
    { id:17,  short:'QC4',   h:'Final QC',              p:'Buyer-spec gate. Photo, moisture, dimensions. Block on fail.',     kind:'qc',     pricing:null,                                                  color:'#EF4444' },
    { id:18,  short:'PACK',  h:'Packaging',             p:'Crate / carton per buyer spec. CBM auto-calculated.',              kind:'pack',   pricing:'Per CBM packed',                                      color:'#10B981' },
    { id:19,  short:'SHIP',  h:'Dispatch - container',  p:'40-foot container loaded, sealed, and on its way. Multi-SO consolidation; partial dispatch supported.', kind:'ship', pricing:null,               color:'#4A7BF7' },
  ];

  const cur = STAGES[stage];

  // Cargo glyph - transforms per stage. SEAS (k=4) and MACH (k=6) morph mid-stage
  // using subProg; SHIP (k=18) renders a shipping container.
  function CargoGlyph({ stage, color, subProg }) {
    const k = stage;
    if (k === 0) return ( // SO doc
      <g>
        <rect x="-14" y="-18" width="28" height="36" rx="3" fill="#fff" stroke={color} strokeWidth="1.5"/>
        <line x1="-9" y1="-10" x2="9" y2="-10" stroke={color} strokeWidth="1.2"/>
        <line x1="-9" y1="-4" x2="6" y2="-4" stroke={color} strokeWidth="1.2"/>
        <line x1="-9" y1="2" x2="9" y2="2" stroke={color} strokeWidth="1.2"/>
        <line x1="-9" y1="8" x2="3" y2="8" stroke={color} strokeWidth="1.2"/>
      </g>
    );
    if (k === 1) return ( // Planning grid
      <g>
        <rect x="-16" y="-14" width="32" height="28" rx="3" fill="#fff" stroke={color} strokeWidth="1.5"/>
        {[0,1,2].map(c=>[0,1].map(r=>(
          <rect key={`${c}-${r}`} x={-13+c*9} y={-10+r*9} width="7" height="7" rx="1" fill={color} opacity={(c+r)%2?0.25:0.55}/>
        )))}
      </g>
    );
    if (k === 2) return ( // PO doc
      <g>
        <rect x="-13" y="-17" width="26" height="34" rx="3" fill="#fff" stroke={color} strokeWidth="1.5"/>
        <text x="0" y="-5" textAnchor="middle" fill={color} fontSize="6" fontWeight="700" fontFamily="ui-monospace,monospace">PO</text>
        <line x1="-8" y1="2" x2="8" y2="2" stroke={color} strokeWidth="1"/>
        <line x1="-8" y1="6" x2="6" y2="6" stroke={color} strokeWidth="1"/>
        <circle cx="6" cy="-12" r="3" fill={color} opacity="0.3"/>
      </g>
    );
    if (k === 3) return ( // raw planks
      <g>
        <rect x="-22" y="-2" width="44" height="6" rx="1" fill="#A0826A" stroke="#8B6F4E" strokeWidth="0.8"/>
        <rect x="-22" y="-9" width="44" height="6" rx="1" fill="#B8946F" stroke="#8B6F4E" strokeWidth="0.8"/>
        <rect x="-22" y="-16" width="44" height="6" rx="1" fill="#A0826A" stroke="#8B6F4E" strokeWidth="0.8"/>
        {[-18,-10,-2,6,14].map((x,i)=>(<line key={i} x1={x} y1="-16" x2={x} y2="4" stroke="#8B6F4E" strokeWidth="0.4" opacity="0.6"/>))}
      </g>
    );
    if (k === 4) {
      // SEAS - chamber first half, planks emerging in second half
      if (subProg < 0.55) {
        // Seasoning chamber/kiln
        const open = Math.max(0, subProg - 0.35) * 4; // doors crack open near transition
        return (
          <g>
            {/* heat / steam puffs above */}
            <path d="M-14 -28 q2 -4 4 0 q2 4 4 0" fill="none" stroke={color} strokeWidth="1.2" opacity="0.55" strokeLinecap="round"/>
            <path d="M-2 -30 q2 -4 4 0 q2 4 4 0" fill="none" stroke={color} strokeWidth="1.2" opacity="0.7" strokeLinecap="round"/>
            <path d="M10 -28 q2 -4 4 0 q2 4 4 0" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" strokeLinecap="round"/>
            {/* chamber body */}
            <rect x="-24" y="-20" width="48" height="36" rx="3" fill="#E5E8ED" stroke="#6B7280" strokeWidth="1.2"/>
            <rect x="-24" y="-20" width="48" height="6" fill="#CBD2DA" stroke="#6B7280" strokeWidth="0.8"/>
            {/* twin doors */}
            <rect x={-22 - open} y="-13" width="22" height="28" rx="1" fill="#F4F6F9" stroke="#6B7280" strokeWidth="0.9"/>
            <rect x={0 + open} y="-13" width="22" height="28" rx="1" fill="#F4F6F9" stroke="#6B7280" strokeWidth="0.9"/>
            {/* hinge dots */}
            <circle cx={-22 - open + 2} cy="-9" r="0.8" fill="#6B7280"/>
            <circle cx={-22 - open + 2} cy="11" r="0.8" fill="#6B7280"/>
            <circle cx={0 + open + 20} cy="-9" r="0.8" fill="#6B7280"/>
            <circle cx={0 + open + 20} cy="11" r="0.8" fill="#6B7280"/>
            {/* gauge */}
            <circle cx="0" cy="-17" r="2.2" fill="#fff" stroke={color} strokeWidth="0.9"/>
            <line x1="0" y1="-17" x2="1.4" y2="-18.5" stroke={color} strokeWidth="0.9" strokeLinecap="round"/>
            {/* glimpse of planks visible as doors crack open */}
            {open > 0.3 && (
              <g opacity={Math.min(1, (open - 0.3) * 2)}>
                <rect x="-14" y="-2" width="28" height="3" rx="0.5" fill="#A0826A"/>
                <rect x="-14" y="3" width="28" height="3" rx="0.5" fill="#B8946F"/>
                <rect x="-14" y="8" width="28" height="3" rx="0.5" fill="#A0826A"/>
              </g>
            )}
          </g>
        );
      } else {
        // Planks emerging from the chamber
        const slide = (subProg - 0.55) / 0.45; // 0..1
        return (
          <g>
            {/* chamber walls (open, faded behind) */}
            <g opacity="0.4">
              <rect x="-24" y="-20" width="3" height="36" fill="#6B7280"/>
              <rect x="21" y="-20" width="3" height="36" fill="#6B7280"/>
              <rect x="-24" y="-20" width="48" height="3" fill="#6B7280"/>
            </g>
            {/* planks - sliding out and settling */}
            <g transform={`translate(0, ${(1 - slide) * -3})`}>
              <rect x="-22" y="-2" width="44" height="6" rx="1" fill="#A0826A" stroke="#8B6F4E" strokeWidth="0.8"/>
              <rect x="-22" y="-9" width="44" height="6" rx="1" fill="#B8946F" stroke="#8B6F4E" strokeWidth="0.8"/>
              <rect x="-22" y="-16" width="44" height="6" rx="1" fill="#A0826A" stroke="#8B6F4E" strokeWidth="0.8"/>
              {[-18,-10,-2,6,14].map((x,i)=>(<line key={i} x1={x} y1="-16" x2={x} y2="4" stroke="#8B6F4E" strokeWidth="0.4" opacity="0.6"/>))}
            </g>
          </g>
        );
      }
    }
    if (k === 5) return ( // STOCK - central warehouse
      <g>
        {/* sloped roof */}
        <polygon points="-28,-16 28,-16 24,-22 -24,-22" fill="#8B6F4E" stroke="#6B4423" strokeWidth="0.6"/>
        <rect x="-28" y="-17" width="56" height="2" fill="#6B4423"/>
        {/* warehouse body */}
        <rect x="-26" y="-15" width="52" height="32" fill="#E5E8ED" stroke="#6B7280" strokeWidth="0.8"/>
        {/* "CENTRAL STORE" sign */}
        <rect x="-18" y="-13" width="36" height="6" fill="#fff" stroke="#6B7280" strokeWidth="0.4"/>
        <text x="0" y="-8.6" textAnchor="middle" fill="#374151" fontSize="3.6" fontWeight="800" fontFamily="ui-sans-serif,system-ui" letterSpacing="0.04em">CENTRAL STORE</text>
        {/* shutter/roller door (corrugated) */}
        <rect x="-12" y="-4" width="24" height="20" fill="#CBD2DA" stroke="#6B7280" strokeWidth="0.6"/>
        {[0,1,2,3,4,5,6,7].map(i => (
          <line key={i} x1="-12" y1={-4 + i * 2.5 + 1} x2="12" y2={-4 + i * 2.5 + 1} stroke="#9CA3AF" strokeWidth="0.4"/>
        ))}
        {/* door track */}
        <line x1="-12" y1="-4" x2="12" y2="-4" stroke="#6B7280" strokeWidth="0.6"/>
        {/* side windows */}
        <rect x="-23" y="-3" width="7" height="6" fill="#7CB7E5" stroke="#6B7280" strokeWidth="0.4"/>
        <line x1="-19.5" y1="-3" x2="-19.5" y2="3" stroke="#6B7280" strokeWidth="0.3"/>
        <rect x="16" y="-3" width="7" height="6" fill="#7CB7E5" stroke="#6B7280" strokeWidth="0.4"/>
        <line x1="19.5" y1="-3" x2="19.5" y2="3" stroke="#6B7280" strokeWidth="0.3"/>
        {/* plank stacks visible at base */}
        <rect x="-23" y="11" width="6" height="3" fill="#A0826A" stroke="#6B4423" strokeWidth="0.3"/>
        <rect x="-23" y="14" width="6" height="2" fill="#B8946F" stroke="#6B4423" strokeWidth="0.3"/>
        <rect x="17" y="11" width="6" height="3" fill="#A0826A" stroke="#6B4423" strokeWidth="0.3"/>
        <rect x="17" y="14" width="6" height="2" fill="#B8946F" stroke="#6B4423" strokeWidth="0.3"/>
        {/* ground line */}
        <rect x="-28" y="17" width="56" height="1" fill="#6B7280" opacity="0.4"/>
      </g>
    );
    if (k === 6) {
      // MACH - saw cutting wood first half, cut pieces second half
      if (subProg < 0.55) {
        const spin = (t * 360 * 6) % 360; // fast spin
        const cutDepth = Math.min(1, subProg / 0.55);
        return (
          <g>
            {/* base wood plank being cut */}
            <rect x="-22" y="2" width="44" height="9" rx="1" fill="#B8946F" stroke="#8B6F4E" strokeWidth="0.8"/>
            <line x1="-2" y1="2" x2="-2" y2={2 + 9 * cutDepth} stroke="#3F2A18" strokeWidth="0.8"/>
            {/* sawdust falling */}
            <circle cx="-7" cy={9 + cutDepth * 6} r="0.7" fill="#A0826A" opacity="0.7"/>
            <circle cx="3" cy={11 + cutDepth * 5} r="0.6" fill="#B8946F" opacity="0.7"/>
            <circle cx="-3" cy={13 + cutDepth * 4} r="0.5" fill="#A0826A" opacity="0.5"/>
            {/* circular saw blade */}
            <g transform={`translate(-2, ${-2 + cutDepth * 4}) rotate(${spin})`}>
              <circle r="11" fill="#E5E8ED" stroke="#6B7280" strokeWidth="0.8"/>
              {[...Array(14)].map((_, i) => {
                const a = (i / 14) * Math.PI * 2;
                const x1 = Math.cos(a) * 10, y1 = Math.sin(a) * 10;
                const x2 = Math.cos(a) * 12, y2 = Math.sin(a) * 12;
                return <polygon key={i} points={`${x1},${y1} ${x2},${y2 - 0.6} ${x2 - 0.6},${y2 + 0.6}`} fill="#374151"/>;
              })}
              <circle r="2.4" fill="#6B7280"/>
              <circle r="1" fill="#1F2937"/>
            </g>
            {/* spark / sawdust burst near contact */}
            <circle cx="9" cy="2" r="0.9" fill="#F59E0B" opacity="0.85"/>
            <circle cx="-13" cy="3" r="0.8" fill="#F59E0B" opacity="0.7"/>
          </g>
        );
      } else {
        // Cut pieces - different shapes, the components
        return (
          <g>
            {/* top: panel */}
            <rect x="-22" y="-14" width="20" height="10" rx="1" fill="#C8A57E" stroke="#8B6F4E" strokeWidth="0.8"/>
            <line x1="-22" y1="-9" x2="-2" y2="-9" stroke="#8B6F4E" strokeWidth="0.3" opacity="0.6"/>
            {/* top right: smaller panel */}
            <rect x="2" y="-14" width="14" height="10" rx="1" fill="#B8946F" stroke="#8B6F4E" strokeWidth="0.8"/>
            {/* middle: long rail */}
            <rect x="-20" y="-1" width="40" height="4" rx="0.8" fill="#A0826A" stroke="#8B6F4E" strokeWidth="0.6"/>
            {/* bottom: two legs */}
            <rect x="-14" y="6" width="4" height="12" rx="0.6" fill="#9C7B5A" stroke="#8B6F4E" strokeWidth="0.5"/>
            <rect x="-2" y="6" width="4" height="12" rx="0.6" fill="#9C7B5A" stroke="#8B6F4E" strokeWidth="0.5"/>
            <rect x="10" y="6" width="4" height="12" rx="0.6" fill="#9C7B5A" stroke="#8B6F4E" strokeWidth="0.5"/>
          </g>
        );
      }
    }
    if (k === 7 || k === 8) return ( // QC1 + COMP - cut components
      <g>
        <rect x="-22" y="-14" width="20" height="10" rx="1" fill="#C8A57E" stroke="#8B6F4E" strokeWidth="0.8"/>
        <rect x="2" y="-14" width="14" height="10" rx="1" fill="#B8946F" stroke="#8B6F4E" strokeWidth="0.8"/>
        <rect x="-20" y="-1" width="40" height="4" rx="0.8" fill="#A0826A" stroke="#8B6F4E" strokeWidth="0.6"/>
        <rect x="-14" y="6" width="4" height="12" rx="0.6" fill="#9C7B5A" stroke="#8B6F4E" strokeWidth="0.5"/>
        <rect x="-2" y="6" width="4" height="12" rx="0.6" fill="#9C7B5A" stroke="#8B6F4E" strokeWidth="0.5"/>
        <rect x="10" y="6" width="4" height="12" rx="0.6" fill="#9C7B5A" stroke="#8B6F4E" strokeWidth="0.5"/>
      </g>
    );
    if (k === 9 || k === 10) return ( // bare assembled table
      <g>
        <rect x="-22" y="-14" width="44" height="6" rx="1" fill="#B8946F" stroke="#8B6F4E" strokeWidth="0.8"/>
        <rect x="-20" y="-8" width="3" height="22" fill="#A0826A" stroke="#8B6F4E" strokeWidth="0.6"/>
        <rect x="17" y="-8" width="3" height="22" fill="#A0826A" stroke="#8B6F4E" strokeWidth="0.6"/>
        <rect x="-3" y="-8" width="3" height="22" fill="#A0826A" stroke="#8B6F4E" strokeWidth="0.6" opacity="0.7"/>
      </g>
    );
    if (k === 11) return ( // XFER - small tempo (mini goods truck) carrying the SKU
      <g>
        {/* shadow */}
        <ellipse cx="0" cy="11" rx="22" ry="1.6" fill="#000" opacity="0.1"/>
        {/* cargo box body */}
        <rect x="-6" y="-12" width="22" height="14" rx="1.5" fill="#4A7BF7" stroke="#1e4dd9" strokeWidth="0.9"/>
        {/* canvas-tarp top arch */}
        <path d="M -6 -12 Q 5 -17 16 -12" fill="#fff" stroke="#1e4dd9" strokeWidth="0.7"/>
        {/* table peeking out under tarp */}
        <rect x="-4" y="-13" width="18" height="2" fill="#6B4423" opacity="0.9"/>
        {/* "TRANSFER" placard on side */}
        <rect x="-4" y="-7" width="18" height="5" fill="#fff" stroke="#1e4dd9" strokeWidth="0.4"/>
        <text x="5" y="-3.3" textAnchor="middle" fill="#1e4dd9" fontSize="3.2" fontWeight="800" fontFamily="ui-sans-serif,system-ui" letterSpacing="0.04em">TRANSFER</text>
        {/* cab */}
        <rect x="-17" y="-9" width="11" height="11" rx="1.5" fill="#4A7BF7" stroke="#1e4dd9" strokeWidth="0.9"/>
        {/* windshield */}
        <polygon points="-15.5,-8 -7.5,-8 -7.5,-3 -15.5,-3" fill="#7CB7E5" stroke="#1e4dd9" strokeWidth="0.4"/>
        {/* door line */}
        <line x1="-11" y1="-3" x2="-11" y2="2" stroke="#1e4dd9" strokeWidth="0.4"/>
        {/* headlight */}
        <circle cx="-16.4" cy="-1" r="0.9" fill="#FBBF24" stroke="#1e4dd9" strokeWidth="0.3"/>
        {/* wheels */}
        <circle cx="-12" cy="3" r="3.2" fill="#2B313A" stroke="#1F2937" strokeWidth="0.5"/>
        <circle cx="-12" cy="3" r="1.2" fill="#9CA3AF"/>
        <circle cx="11" cy="3" r="3.2" fill="#2B313A" stroke="#1F2937" strokeWidth="0.5"/>
        <circle cx="11" cy="3" r="1.2" fill="#9CA3AF"/>
        {/* small motion puff behind */}
        <circle cx="-21" cy="2" r="1.5" fill="#9CA3AF" opacity="0.35"/>
        <circle cx="-23" cy="0" r="1" fill="#9CA3AF" opacity="0.25"/>
      </g>
    );
    if (k === 12) return ( // sanded
      <g>
        <rect x="-22" y="-14" width="44" height="6" rx="1" fill="#D9BFA0" stroke="#A88E72" strokeWidth="0.6"/>
        <rect x="-20" y="-8" width="3" height="22" fill="#CDB293" stroke="#A88E72" strokeWidth="0.4"/>
        <rect x="17" y="-8" width="3" height="22" fill="#CDB293" stroke="#A88E72" strokeWidth="0.4"/>
        <rect x="-3" y="-8" width="3" height="22" fill="#CDB293" stroke="#A88E72" strokeWidth="0.4" opacity="0.7"/>
      </g>
    );
    if (k === 13) return ( // QC sand pass
      <g>
        <rect x="-22" y="-14" width="44" height="6" rx="1" fill="#D9BFA0" stroke="#A88E72" strokeWidth="0.6"/>
        <rect x="-20" y="-8" width="3" height="22" fill="#CDB293" stroke="#A88E72" strokeWidth="0.4"/>
        <rect x="17" y="-8" width="3" height="22" fill="#CDB293" stroke="#A88E72" strokeWidth="0.4"/>
      </g>
    );
    if (k === 14) return ( // finished
      <g>
        <rect x="-22" y="-14" width="44" height="6" rx="1" fill="#6B4423" stroke="#3F2A18" strokeWidth="0.6"/>
        <rect x="-20" y="-8" width="3" height="22" fill="#5A3A1F" stroke="#3F2A18" strokeWidth="0.4"/>
        <rect x="17" y="-8" width="3" height="22" fill="#5A3A1F" stroke="#3F2A18" strokeWidth="0.4"/>
        <rect x="-3" y="-8" width="3" height="22" fill="#5A3A1F" stroke="#3F2A18" strokeWidth="0.4" opacity="0.7"/>
        <rect x="-20" y="-13" width="40" height="1" fill="#fff" opacity="0.35"/>
      </g>
    );
    if (k === 15) return ( // finished + hardware
      <g>
        <rect x="-22" y="-14" width="44" height="6" rx="1" fill="#6B4423" stroke="#3F2A18" strokeWidth="0.6"/>
        <rect x="-20" y="-8" width="3" height="22" fill="#5A3A1F" stroke="#3F2A18" strokeWidth="0.4"/>
        <rect x="17" y="-8" width="3" height="22" fill="#5A3A1F" stroke="#3F2A18" strokeWidth="0.4"/>
        <rect x="-3" y="-8" width="3" height="22" fill="#5A3A1F" stroke="#3F2A18" strokeWidth="0.4" opacity="0.7"/>
        <rect x="-20" y="-13" width="40" height="1" fill="#fff" opacity="0.35"/>
        <circle cx="-12" cy="-11" r="1.4" fill="#D4AF37"/>
        <circle cx="0" cy="-11" r="1.4" fill="#D4AF37"/>
        <circle cx="12" cy="-11" r="1.4" fill="#D4AF37"/>
      </g>
    );
    if (k === 16) return ( // final QC
      <g>
        <rect x="-22" y="-14" width="44" height="6" rx="1" fill="#6B4423" stroke="#3F2A18" strokeWidth="0.6"/>
        <rect x="-20" y="-8" width="3" height="22" fill="#5A3A1F" stroke="#3F2A18" strokeWidth="0.4"/>
        <rect x="17" y="-8" width="3" height="22" fill="#5A3A1F" stroke="#3F2A18" strokeWidth="0.4"/>
        <circle cx="14" cy="-18" r="6" fill="#10B981"/>
        <path d="M 11 -18 L 13 -16 L 17 -20" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    );
    if (k === 17) return ( // crate
      <g>
        <rect x="-20" y="-18" width="40" height="34" rx="2" fill="#C9A06A" stroke="#8B6F4E" strokeWidth="1.2"/>
        <line x1="-20" y1="-1" x2="20" y2="-1" stroke="#8B6F4E" strokeWidth="0.8"/>
        <line x1="0" y1="-18" x2="0" y2="16" stroke="#8B6F4E" strokeWidth="0.8"/>
        <text x="0" y="2" textAnchor="middle" fill="#3F2A18" fontSize="6" fontWeight="700" fontFamily="ui-monospace,monospace">FRAGILE</text>
      </g>
    );
    // k === 18 - Shipping container
    return (
      <g>
        {/* container body (40HC proportions, scaled) */}
        <rect x="-32" y="-13" width="64" height="26" rx="1.5" fill="#C9402F" stroke="#7A2316" strokeWidth="1.2"/>
        {/* corrugation ribs */}
        {[-28,-24,-20,-16,-12,-8,-4,0,4,8,12,16,20,24].map((x, i) => (
          <line key={i} x1={x} y1="-13" x2={x} y2="13" stroke="#7A2316" strokeWidth="0.5" opacity="0.55"/>
        ))}
        {/* right-end doors */}
        <line x1="22" y1="-13" x2="22" y2="13" stroke="#7A2316" strokeWidth="1"/>
        <line x1="28" y1="-13" x2="28" y2="13" stroke="#7A2316" strokeWidth="0.7" opacity="0.7"/>
        {/* door locking bars */}
        <rect x="24" y="-9" width="1" height="18" fill="#3F2A18"/>
        <rect x="26" y="-9" width="1" height="18" fill="#3F2A18"/>
        {/* SIMPLEGRID badge */}
        <rect x="-26" y="-8" width="34" height="7" fill="#fff" stroke="#7A2316" strokeWidth="0.4"/>
        <text x="-9" y="-2.6" textAnchor="middle" fill="#7A2316" fontSize="5" fontWeight="800" fontFamily="ui-sans-serif,system-ui" letterSpacing="0.04em">SIMPLEGRID</text>
        {/* container code */}
        <text x="-9" y="9" textAnchor="middle" fill="#fff" fontSize="3.6" fontWeight="700" fontFamily="ui-monospace,monospace" opacity="0.92">SGAU 4521 · 40HC</text>
        {/* chassis underline */}
        <rect x="-30" y="13" width="60" height="2" fill="#1F2937" opacity="0.35"/>
      </g>
    );
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

  const SVGBlock = (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', width: '100%', height: 'auto' }} aria-hidden="true">
        <defs>
          <linearGradient id="vsky" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F4F7FB"/>
            <stop offset="100%" stopColor="#FFFFFF"/>
          </linearGradient>
          <pattern id="vgrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E8ECF1" strokeWidth="0.5"/>
          </pattern>
          {/* Clip the moving lane dashes to the road's bounds so they don't run past it */}
          <clipPath id="roadClip">
            <rect x={ROAD_X - ROAD_W / 2} y={ROAD_TOP - 24} width={ROAD_W} height={ROAD_BOTTOM - ROAD_TOP + 48}/>
          </clipPath>
        </defs>
        <rect width={W} height={H} fill="url(#vsky)"/>
        <rect width={W} height={H} fill="url(#vgrid)" opacity="0.55"/>

        {/* Vertical road */}
        <rect x={ROAD_X - ROAD_W / 2} y={ROAD_TOP - 24} width={ROAD_W} height={ROAD_BOTTOM - ROAD_TOP + 48} fill="#2B313A"/>
        <rect x={ROAD_X - ROAD_W / 2} y={ROAD_TOP - 24} width="2" height={ROAD_BOTTOM - ROAD_TOP + 48} fill="#3A414C"/>
        <rect x={ROAD_X + ROAD_W / 2 - 2} y={ROAD_TOP - 24} width="2" height={ROAD_BOTTOM - ROAD_TOP + 48} fill="#3A414C"/>

        {/* Animated lane dashes (vertical) - clipped to road bounds */}
        <g clipPath="url(#roadClip)">
          {Array.from({ length: 28 }).map((_, i) => (
            <rect key={i}
              x={ROAD_X - 1}
              y={ROAD_TOP - 24 + i * 38 + ((t * 38) % 38) - 38}
              width="2" height="20" fill="#F4D35E"/>
          ))}
        </g>

        {/* Progress trail */}
        <rect x={ROAD_X - ROAD_W / 2} y={ROAD_TOP - 24}
              width={ROAD_W}
              height={Math.max(0, cargoY - (ROAD_TOP - 24))}
              fill={cur.color} opacity="0.18"/>

        {/* Station rows */}
        {STAGES.map((s, i) => {
          const y = stationYs[i];
          const isActive = i === stage;
          const isDone = i < stage;
          return (
            <g key={`stn-${i}`} style={{ cursor: 'pointer' }} onClick={() => { setT(i + 0.001); setPlaying(false); }}>
              <line x1={ROAD_X + ROAD_W / 2} y1={y}
                    x2={ROAD_X + ROAD_W / 2 + 36} y2={y}
                    stroke={isActive ? s.color : isDone ? s.color : '#D1D5DB'}
                    strokeWidth={isActive ? 2 : 1}
                    strokeDasharray={isActive || isDone ? '0' : '3,3'}
                    opacity={isActive ? 1 : isDone ? 0.7 : 0.6}/>

              <rect x={ROAD_X + ROAD_W / 2 + 36} y={y - 17}
                    width={W - (ROAD_X + ROAD_W / 2 + 36) - 24} height="34" rx="6"
                    fill={isActive ? '#fff' : isDone ? '#F4F7FB' : '#FAFBFC'}
                    stroke={isActive ? s.color : isDone ? '#C9D2DD' : '#E5E8ED'}
                    strokeWidth={isActive ? 2 : 1}
                    style={{ transition: 'all 0.2s' }}/>
              <text x={ROAD_X + ROAD_W / 2 + 50} y={y + 1}
                    fill="#9CA3AF" fontSize="9" fontWeight="700" fontFamily="ui-monospace,monospace">
                {String(s.id).padStart(2, '0')}
              </text>
              <rect x={ROAD_X + ROAD_W / 2 + 70} y={y - 8}
                    width="56" height="16" rx="3"
                    fill={isActive ? s.color : isDone ? s.color : '#fff'}
                    stroke={isActive ? s.color : isDone ? s.color : '#E5E8ED'}
                    strokeWidth="1"
                    opacity={isActive || isDone ? 1 : 0.95}/>
              <text x={ROAD_X + ROAD_W / 2 + 98} y={y + 3.5} textAnchor="middle"
                    fill={isActive || isDone ? '#fff' : '#6B7280'}
                    fontSize="9.5" fontWeight="700" letterSpacing="0.06em" fontFamily="ui-sans-serif,system-ui">
                {s.short}
              </text>
              <text x={ROAD_X + ROAD_W / 2 + 138} y={y + 3.5}
                    fill={isActive ? '#1F2937' : isDone ? '#374151' : '#6B7280'}
                    fontSize="11.5" fontWeight={isActive ? 600 : 500} fontFamily="ui-sans-serif,system-ui">
                {s.h}
              </text>

              <circle cx={ROAD_X} cy={y} r={isActive ? 7 : 5}
                      fill={isDone || isActive ? s.color : '#fff'}
                      stroke={s.color} strokeWidth={isActive ? 2 : 1.5}
                      style={{ transition: 'all 0.25s' }}/>
              {isActive && (
                <circle cx={ROAD_X} cy={y} r="11" fill="none" stroke={s.color} strokeWidth="1.5" opacity="0.5">
                  <animate attributeName="r" from="7" to="14" dur="1.4s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" from="0.6" to="0" dur="1.4s" repeatCount="indefinite"/>
                </circle>
              )}
            </g>
          );
        })}

        {/* Cargo glyph */}
        <g transform={`translate(${ROAD_X + Math.sin(t * 12) * 1.2}, ${cargoY})`}>
          <CargoGlyph stage={stage} color={cur.color} subProg={subProg}/>
        </g>

        {/* Speed-line trail */}
        {[1, 2, 3].map(k => (
          <line key={k}
            x1={ROAD_X - 8 + (k - 2) * 4} y1={cargoY - 24 - k * 8}
            x2={ROAD_X - 8 + (k - 2) * 4} y2={cargoY - 14 - k * 8}
            stroke={cur.color} strokeWidth="1.5" strokeLinecap="round" opacity={0.55 - k * 0.13}/>
        ))}
      </svg>
    </div>
  );

  const StepCard = (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 18 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: cur.color, marginBottom: 6, textTransform: 'uppercase' }}>
        Step {String(cur.id).padStart(2, '0')} of {TOTAL}
      </div>
      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, color: 'var(--fg1)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>{cur.h}</h4>
      <p style={{ fontSize: 12.5, color: 'var(--fg2)', lineHeight: 1.55, margin: '0 0 12px' }}>{cur.p}</p>
      {cur.pricing ? (
        <div style={{
          background: 'rgba(74,123,247,0.06)', border: '1px solid rgba(74,123,247,0.18)',
          borderRadius: 8, padding: '8px 12px',
        }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--sg-blue)', textTransform: 'uppercase', marginBottom: 2 }}>
            Contractor pricing
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 12, fontWeight: 700, color: 'var(--fg1)' }}>{cur.pricing}</div>
        </div>
      ) : (
        <div style={{ fontSize: 11.5, color: 'var(--fg3)', fontStyle: 'italic' }}>
          Internal step - tracked, audited, time-stamped.
        </div>
      )}
    </div>
  );

  const Controls = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <button onClick={() => setPlaying(p => !p)}
        style={{
          width: 36, height: 36, borderRadius: 999, border: 'none', cursor: 'pointer',
          background: cur.color, color: '#fff', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        }}
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6,4 20,12 6,20"/></svg>
        )}
      </button>
      <input type="range" min="0" max={TOTAL - 0.001} step="0.01" value={t}
        onChange={e => { setT(parseFloat(e.target.value)); setPlaying(false); }}
        style={{ flex: 1, accentColor: cur.color }}
      />
      <button onClick={() => { setT(0); setPlaying(true); }}
        style={{
          padding: '7px 12px', borderRadius: 999, border: '1px solid var(--border)',
          background: '#fff', color: 'var(--fg1)', fontSize: 11, fontWeight: 600, cursor: 'pointer',
        }}
      >Restart</button>
    </div>
  );

  const Legend = (
    <div style={{
      background: '#fff', border: '1px solid var(--border)', borderRadius: 12,
      padding: 14, display: 'flex', flexDirection: 'column', gap: 7, fontSize: 11.5, color: 'var(--fg2)',
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--fg3)', textTransform: 'uppercase', marginBottom: 2 }}>Legend</div>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#7C3AED' }}></span>Planning / SKU stage</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#0EA5E9' }}></span>Procurement / inventory</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }}></span>Contractor work</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }}></span>Quality gate</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }}></span>Finishing / output</span>
    </div>
  );

  // ---- Compact mode: SVG only, with controls + step card stacked beneath ----
  if (compact) {
    return (
      <div ref={containerRef} style={{
        background: 'linear-gradient(180deg, #fff 0%, var(--sg-off-white) 100%)',
        border: '1px solid var(--border)', borderRadius: 14, padding: 16, overflow: 'hidden',
      }}>
        {SVGBlock}
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {Controls}
          {StepCard}
        </div>
      </div>
    );
  }

  // ---- Full mode: title + intro + 2-column (line | sticky card) ----
  return (
    <div ref={containerRef} className="infographic" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '36px 40px 12px' }}>
        <div className="infographic-title">THE FACTORY LINE</div>
        <h3 className="infographic-h">From sales order to dispatch - every station the order travels through.</h3>
        <p className="infographic-sub">
          Press play, scrub the timeline, or tap any station. Watch the order transform from a piece of paper into raw planks, into cut components, into an assembled table - sanded, finished, fitted with hardware, packaged, and dispatched in a 40-foot container.
        </p>
      </div>

      <div className="elite-factory-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, padding: '0 40px 28px', alignItems: 'start' }}>
        {SVGBlock}
        <div style={{ position: 'sticky', top: 16, alignSelf: 'start', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 22 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: cur.color, marginBottom: 6, textTransform: 'uppercase' }}>
              Step {String(cur.id).padStart(2, '0')} of {TOTAL}
            </div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: 'var(--fg1)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>{cur.h}</h4>
            <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.55, margin: '0 0 14px' }}>{cur.p}</p>
            {cur.pricing ? (
              <div style={{
                background: 'rgba(74,123,247,0.06)', border: '1px solid rgba(74,123,247,0.18)',
                borderRadius: 8, padding: '10px 14px', marginBottom: 12,
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--sg-blue)', textTransform: 'uppercase', marginBottom: 3 }}>
                  Contractor pricing
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 700, color: 'var(--fg1)' }}>{cur.pricing}</div>
              </div>
            ) : (
              <div style={{ fontSize: 12, color: 'var(--fg3)', fontStyle: 'italic', marginBottom: 12 }}>
                Internal step - no contractor settlement here. Tracked, audited, time-stamped.
              </div>
            )}
            <div style={{ marginTop: 8 }}>{Controls}</div>
            <div style={{ fontSize: 11, color: 'var(--fg3)', marginTop: 10 }}>Tap any station to jump.</div>
          </div>
          {Legend}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .elite-factory-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
window.EliteFactoryRoad = EliteFactoryRoad;
