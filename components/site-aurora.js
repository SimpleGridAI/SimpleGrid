/* ============================================================================
   SimpleGrid site-wide aurora v4 - "silk rope": two intertwined SOLID ribbons.
   SINGLE SOURCE OF TRUTH for the background theme on every page.

   What it renders: two luminous silk cords - one all shades of blue
   (indigo -> sky), one all shades of grey (slate -> silver) - sweeping in
   from beyond the right-hand edge at the top and intertwining exactly twice
   per viewport on their way down. Unlike the earlier strand-cloud version,
   the cords are SOLID surfaces (like brushed silk in the Stripe reference):
   - near-opaque body with crisp feathered edges,
   - cylinder shading + a glossy sheen streak that drifts along the cord,
   - per-"strand" lanes: dozens of merged fiber lanes across the width, each
     hash-seeded slightly brighter or darker (the strands riding above/below),
   - fine anisotropic micro-grain running lengthwise (the brushed texture),
   - true occlusion at crossings: the front cord covers the back one,
     alternating every crossing,
   - shade gradients flowing along each cord's length,
   - low-amplitude dither so nothing bands.

   Fragment shader on one full-screen triangle - two ribbons is cheap.

   Architecture (unchanged - integrations depend on this):
   - Fixed full-viewport <canvas> at z-index -1 inside <div id="sg-aurora">.
   - Injects its OWN <style> tag (standalone pages don't load styles.css).
   - Loaded site-wide by components/site-nav.js; 404.html and
     custom-erp/index.html load it directly.
   - Bold in the hero, fades to ambient after ~1.25 viewports; drift behind
     ANIMATE flag; static under prefers-reduced-motion; pauses when hidden;
     CSS fallback when WebGL is unavailable.
   ========================================================================== */
(function () {
  'use strict';
  if (window.__sgAurora) return;
  window.__sgAurora = true;

  /* ===================== TUNABLES - dial everything here ==================== */
  var CONFIG = {
    ANIMATE: true,            // slow drift (auto-off for reduced motion)
    SPEED: 0.05,              // drift speed
    FPS: 30,                  // render cap
    MAX_DPR: 2,               // devicePixelRatio cap (full res - the grain is fine)

    X0: 0.82,                 // rope zone's horizontal home (fraction of width)
    DRIFT: 0.03,              // gentle serpentine of the whole rope
    DRIFT_WAVES: 0.45,        // drift waves per viewport
    BLUE_W: 0.058,            // BLUE cord half-width - 4x the grey (50% of the old top size)
    GREY_W: 0.0145,           // GREY cord half-width (1/4 of blue)
    ATTACH: { overlap: 0.80, k: 2.6 }, // cords ride ATTACHED: center distance pinned
                              // so edges just touch (0.94 = slight tuck, no white
                              // sliver); k saturates the crossing curve so they hug
                              // between crossings instead of swinging apart
    BREATHE: { amp: 0.020, waves: 1.4 }, // slight de-attachments: a small gap opens
                              // gently ~1-2x per page, then they re-attach
    TAPER: { from: 3.45, to: 1.0, span: 1.0 }, // GRAND opening: the ribbon spans
                              // ~50% of the screen at the very top, tapering down
                              // through the hero to its body size, constant after
    ENTRY45: { amp: 0.16, span: 0.55 }, // the top expands INTO the top-right corner
                              // of the page (the mouth spans from above the stat
                              // box to the corner), then turns ~45 degrees and
                              // straightens to vertical - parabolic bend, steepest
                              // at the top edge, zero by span
    // THE crossing: the two cords intertwine exactly ONCE over the WHOLE page
    // (phase runs over total document height via u_pages - no DNA repetition)

    OPACITY: 0.95,            // cord body opacity (solid silk, not a wash)
    EDGE: 0.14,               // feathered edge width (fraction of half-width)
    SHEEN: 0.34,              // glossy highlight streak strength
    SHADE: 0.30,              // cylinder shading depth at the cord's edges
    TWIST: { waves: 0.35, depth: 0.12, speed: 0.10 }, // the ribbon slowly TURNS in
                              // space: width breathes, highlight sweeps across,
                              // flank shading flips - the 3D look
    RIM: 0.16,                // polished bright rim along the cord's edges
    TURN_SHADE: 0.10,         // how much the turning darkens the receding flank
    END: { span: 0.95, min: 0.16, gather: 0.55 }, // polished tail: over the last
                              // ~viewport the cords narrow toward a tip and pull
                              // together, finishing as one gathered end
    LEFT_PIN: 0.595,          // the ribbon's leftmost edge starts just under the
                              // Resources nav item and falls STRAIGHT during the
                              // entry (only the right side flares to the corner)
    END_FADE: { span: 1.05, hold: 0.02 }, // the tail FADES into the SIMPLEGRID
                              // wordmark at the page bottom (no abrupt cut) and is
                              // fully gone by the document end - also prevents the
                              // ribbon from showing in the overscroll rubber-band
                              // gap below the footer
    LANES_BLUE: 96,           // merged fiber lanes across the wide blue cord
    LANES_GREY: 40,           // lanes across the grey cord
    LANE_VAR: 0.20,           // lane-to-lane brightness relief (above/below)
    GRAIN: { along: 2.4, across: 240.0, strength: 0.10 }, // lengthwise micro-grain
    FLOW: { waves: 0.9, mix: 1.0 },    // shade gradient flowing along the cord
    BACK_DIM: 0.93,           // the cord passing behind dims slightly

    // the two cords: one ALL blue, one ALL grey
    BUNDLES: [
      { deep: '#1E40AF', bright: '#60A5FA' },   // indigo -> sky blue
      { deep: '#475569', bright: '#E2E8F0' }    // slate -> silver
    ],

    SCROLL_FADE_VP: 1.25,     // viewports until ambient
    AMBIENT_OPACITY: 1.0      // NO scroll dimming - the ribbon stays as ALIVE below
                              // the stat box and down the whole page as it is above
                              // it; section veils alone handle text readability
  };
  /* ========================================================================= */

  var reduceMotion = false;
  try { reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var animate = CONFIG.ANIMATE && !reduceMotion;

  // --- styles: injected so the component works on pages without styles.css --
  var styleTag = document.createElement('style');
  styleTag.id = 'sg-aurora-style';
  styleTag.textContent =
    '#sg-aurora{position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden;opacity:1;transition:opacity 450ms ease;}' +
    '#sg-aurora canvas{width:100%;height:100%;display:block;}' +
    '.sg-aurora-grain{position:absolute;inset:0;background-repeat:repeat;background-size:96px 96px;opacity:0.04;mix-blend-mode:overlay;}' +
    '@media print{#sg-aurora{display:none;}}';
  (document.head || document.documentElement).appendChild(styleTag);

  // --- mount -----------------------------------------------------------------
  var wrap = document.createElement('div');
  wrap.id = 'sg-aurora';
  wrap.setAttribute('aria-hidden', 'true');
  var cv = document.createElement('canvas');
  var grain = document.createElement('div');
  grain.className = 'sg-aurora-grain';
  wrap.appendChild(cv);
  wrap.appendChild(grain);
  function mount() {
    if (document.body && !wrap.parentNode) document.body.insertBefore(wrap, document.body.firstChild);
  }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);

  // --- static fallback (no WebGL): quiet wash in the rope's two colours ------
  function cssFallback() {
    if (cv.parentNode) cv.parentNode.removeChild(cv);
    wrap.style.background =
      'radial-gradient(34% 30% at 76% 10%, rgba(30,64,175,0.15), transparent 70%),' +
      'radial-gradient(30% 28% at 70% 46%, rgba(71,85,105,0.11), transparent 70%),' +
      'radial-gradient(32% 30% at 78% 82%, rgba(30,64,175,0.12), transparent 70%)';
  }

  var gl = null;
  try {
    var glOpts = { alpha: true, premultipliedAlpha: false, antialias: false, depth: false, stencil: false };
    gl = cv.getContext('webgl', glOpts) || cv.getContext('experimental-webgl', glOpts);
  } catch (e) { gl = null; }
  if (!gl) { cssFallback(); return; }

  // --- film grain tile (extra depth on top) -----------------------------------
  try {
    var g = document.createElement('canvas');
    g.width = g.height = 96;
    var gc = g.getContext('2d');
    var img = gc.createImageData(96, 96);
    for (var gi = 0; gi < img.data.length; gi += 4) {
      var gv = (Math.random() * 255) | 0;
      img.data[gi] = img.data[gi + 1] = img.data[gi + 2] = gv;
      img.data[gi + 3] = 255;
    }
    gc.putImageData(img, 0, 0);
    grain.style.backgroundImage = 'url(' + g.toDataURL() + ')';
  } catch (e) { /* decoration only */ }

  // --- shader source ----------------------------------------------------------
  function f(n) {
    var s = String(Number(n));
    return s.indexOf('.') === -1 && s.indexOf('e') === -1 ? s + '.0' : s;
  }
  function hex2vec3(h) {
    var n = parseInt(h.slice(1), 16);
    return 'vec3(' + f(((n >> 16) & 255) / 255) + ',' + f(((n >> 8) & 255) / 255) + ',' + f((n & 255) / 255) + ')';
  }
  var TAU = 6.28318530718;

  var VSRC =
    'attribute vec2 a_pos;\n' +
    'void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }';

  // one ribbon evaluated per call: returns vec4(color, alpha)
  var RIBBON_FN = [
    // b = 0/1 for blue/grey; ph = the ONE page-wide crossing phase;
    // taper = 30%-at-top -> 20%-after-hero width scale; hw/lanes per cord
    'vec4 ribbon(float b, float x, float y, float ph, float taper, float mob, float hw, float lanes) {',
    // polished tail: in the last stretch of the page the cord narrows toward a
    // tip and the pair gathers together
    '  float endT = 1.0 - (1.0 - ' + f(CONFIG.END.min) + ') * smoothstep(u_pages - ' + f(CONFIG.END.span) + ', u_pages - 0.05, y + u_scroll);',
    // the ribbon slowly turns in space - its apparent width breathes with the turn
    '  float tw = ' + f(TAU * CONFIG.TWIST.waves) + ' * y + b * 1.7 + u_time * ' + f(CONFIG.TWIST.speed) + ' + u_scroll * 0.25;',
    '  float hw2 = hw * (1.0 - ' + f(CONFIG.TWIST.depth) + ' + ' + f(CONFIG.TWIST.depth) + ' * cos(tw));',
    '  float xc = ' + f(CONFIG.X0) + ' + ' + f(CONFIG.DRIFT) + ' * sin(' + f(TAU * CONFIG.DRIFT_WAVES) + ' * y + 1.3 + u_scroll * 0.5 + u_time * 0.21);',
    // top-right entry: parabolic offset pushes the mouth into the top-right
    // corner; steepest diagonal at the very top, perfectly vertical by span
    '  float e45 = 1.0 - clamp((y + u_scroll) / ' + f(CONFIG.ENTRY45.span) + ', 0.0, 1.0);',
    '  xc += ' + f(CONFIG.ENTRY45.amp) + ' * e45 * e45;',
    // attached pair: center distance pinned to edges-touching; the saturated
    // sine keeps them hugging between the single crossing's smooth swap
    '  float sat = clamp(' + f(CONFIG.ATTACH.k) + ' * sin(ph), -1.0, 1.0);',
    '  float pn2 = (ph + 1.5707963) / 3.14159265;',
    '  float breathe = ' + f(CONFIG.BREATHE.amp) + ' * (0.5 - 0.5 * cos(' + f(TAU * CONFIG.BREATHE.waves) + ' * pn2));',
    '  float halfSep = (' + f(0.5 * (CONFIG.BLUE_W + CONFIG.GREY_W) * CONFIG.ATTACH.overlap) + ' + breathe) * taper * mix(' + f(CONFIG.END.gather) + ', 1.0, endT);',
    '  xc += (1.0 - 2.0 * b) * halfSep * sat;',
    '  xc += mob * 0.15;',
    '  float hwEff = hw2 * taper * endT;',
    // pin the BLUE cord's left edge straight (vertical) under Resources during
    // the entry; the right side keeps the corner flare - the angle is locked
    '  float pin = e45 * (1.0 - b);',
    '  float rightE = xc + hwEff;',
    '  xc = mix(xc, 0.5 * (' + f(CONFIG.LEFT_PIN) + ' + rightE), pin);',
    '  hwEff = mix(hwEff, max(0.5 * (rightE - ' + f(CONFIG.LEFT_PIN) + '), 0.01), pin);',
    '  float u = (x - xc) / hwEff;',
    '  float au = abs(u);',
    '  if (au > 1.25) return vec4(0.0);',
    // crisp feathered edge
    '  float mask = 1.0 - smoothstep(1.0 - ' + f(CONFIG.EDGE) + ', 1.0, au);',
    // cylinder shading: cord darkens toward its edges
    '  float body = sqrt(max(0.0, 1.0 - u * u));',
    '  float lum = 1.0 - ' + f(CONFIG.SHADE) + ' * (1.0 - body);',
    // glossy sheen streak SWEEPS ACROSS the cord as the ribbon turns in space
    '  float hl = 0.52 * sin(tw + 1.3);',
    '  lum += ' + f(CONFIG.SHEEN) + ' * pow(max(0.0, 1.0 - abs(u - hl) * 1.7), 4.0);',
    // polished bright rim along the edges (the finished look)
    '  lum += ' + f(CONFIG.RIM) + ' * smoothstep(0.78, 0.92, au) * (1.0 - smoothstep(0.92, 1.0, au));',
    // the receding flank darkens as the ribbon turns - flips with the twist
    '  lum -= ' + f(CONFIG.TURN_SHADE) + ' * u * sin(tw);',
    // merged fiber lanes: dozens of "strands", each slightly above or below
    '  float ln = (u * 0.5 + 0.5) * lanes + b * 37.0;',
    '  float li = floor(ln);',
    '  float lf = ln - li;',
    '  float laneB = mix(hash(vec2(li, 7.3)), hash(vec2(li + 1.0, 7.3)), lf * lf * (3.0 - 2.0 * lf));',
    '  lum *= 1.0 + ' + f(CONFIG.LANE_VAR) + ' * (laneB - 0.5);',
    // fine lengthwise micro-grain (the brushed-silk texture)
    '  float gr = vnoise(vec2(y * ' + f(CONFIG.GRAIN.along) + ' + b * 11.0, u * ' + f(CONFIG.GRAIN.across) + '));',
    '  gr = 0.6 * gr + 0.4 * vnoise(vec2(y * ' + f(CONFIG.GRAIN.along * 2.7) + ' + b * 23.0, u * ' + f(CONFIG.GRAIN.across * 2.1) + '));',
    '  lum *= 1.0 + ' + f(CONFIG.GRAIN.strength) + ' * (gr - 0.5) * 2.0;',
    // shade gradient flowing along the cord
    '  float tone = 0.5 + 0.5 * sin(' + f(TAU * CONFIG.FLOW.waves) + ' * y + b * 2.1 + u_scroll * 0.35 + u_time * 0.18);',
    // the BLUE runs slightly darker at the top of the hero (biased toward its
    // deep indigo stop), easing back to the normal range as the hero ends
    '  float topBias = mix(0.58, 1.0, smoothstep(0.0, 1.1, y + u_scroll));',
    '  tone *= mix(topBias, 1.0, b);',
    '  vec3 deep = mix(' + hex2vec3(CONFIG.BUNDLES[0].deep) + ', ' + hex2vec3(CONFIG.BUNDLES[1].deep) + ', b);',
    '  vec3 bright = mix(' + hex2vec3(CONFIG.BUNDLES[0].bright) + ', ' + hex2vec3(CONFIG.BUNDLES[1].bright) + ', b);',
    '  vec3 col = mix(deep, bright, tone * 0.75 + 0.15);',
    // edges fall toward the deep shade (rounds the cord)
    '  col = mix(deep, col, 0.45 + 0.55 * body);',
    '  col *= lum;',
    // dissolve into the footer wordmark; clamps to 0 past the document end,
    // so nothing paints in the overscroll gap below the footer
    '  float endA = 1.0 - smoothstep(u_pages - ' + f(CONFIG.END_FADE.span) + ', u_pages - ' + f(CONFIG.END_FADE.hold) + ', y + u_scroll);',
    '  float a = mask * ' + f(CONFIG.OPACITY) + ' * (1.0 - 0.22 * mob) * endA;',
    '  return vec4(col, a);',
    '}'
  ].join('\n');

  var FSRC = [
    'precision highp float;',
    'uniform vec2 u_res;',
    'uniform float u_time;',
    'uniform float u_scroll;',
    'uniform float u_mobile;',
    'uniform float u_pages;',   // total document height in viewport units
    '',
    'float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }',
    'float vnoise(vec2 p){',
    '  vec2 i = floor(p), fr = fract(p);',
    '  vec2 w = fr * fr * (3.0 - 2.0 * fr);',
    '  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), w.x),',
    '             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), w.x), w.y);',
    '}',
    '',
    RIBBON_FN,
    '',
    'void main(){',
    '  vec2 uv = gl_FragCoord.xy / u_res;',
    '  float x = uv.x;',
    '  float y = 1.0 - uv.y;',
    '',
    // absolute position down the PAGE (viewport units / normalized 0..1)
    '  float pageY = y + u_scroll;',
    '  float pn = clamp(pageY / max(u_pages, 1.0), 0.0, 1.0);',
    // THE one crossing: phase runs -pi/2 -> +pi/2 over the whole document,
    // so the cords swap sides exactly once, mid-site
    '  float ph = 3.14159265 * pn - 1.5707963;',
    // rope zone: ~30% of the width at the page top, easing to ~20% by the
    // end of the hero (one viewport), constant after
    '  float taper = mix(' + f(CONFIG.TAPER.from) + ', ' + f(CONFIG.TAPER.to) + ', smoothstep(0.0, ' + f(CONFIG.TAPER.span) + ', pageY));',
    '',
    '  vec4 blue = ribbon(0.0, x, y, ph, taper, u_mobile, ' + f(CONFIG.BLUE_W) + ', ' + f(CONFIG.LANES_BLUE) + ');',
    '  vec4 grey = ribbon(1.0, x, y, ph, taper, u_mobile, ' + f(CONFIG.GREY_W) + ', ' + f(CONFIG.LANES_GREY) + ');',
    '',
    // the cords ride attached and overlap slightly, so stacking must be
    // DEFINITE everywhere: blue is always in front - the grey tucks behind
    // its edge and dives fully behind it at the single crossing
    '  float front0 = 1.0;',
    // dim whichever cord is currently passing behind (front0: 1 = blue front)
    '  blue.rgb *= mix(' + f(CONFIG.BACK_DIM) + ', 1.0, front0);',
    '  grey.rgb *= mix(1.0, ' + f(CONFIG.BACK_DIM) + ', front0);',
    // composite BOTH stacking orders fully, then blend the RESULTS - where only
    // one cord covers a pixel both orders are identical, so no seam can appear
    '  vec3 pA = blue.rgb * blue.a + grey.rgb * grey.a * (1.0 - blue.a);',  // blue front
    '  float aA = blue.a + grey.a * (1.0 - blue.a);',
    '  vec3 pB = grey.rgb * grey.a + blue.rgb * blue.a * (1.0 - grey.a);',  // grey front
    '  float aB = grey.a + blue.a * (1.0 - grey.a);',
    '  float a = mix(aB, aA, front0);',
    '  vec3 rgb = mix(pB, pA, front0) / max(a, 1e-4);',
    '',
    // anti-banding dither
    '  float d = (hash(gl_FragCoord.xy + fract(u_time) * 61.7) - 0.5) * 1.6 / 255.0;',
    '  gl_FragColor = vec4(clamp(rgb + d, 0.0, 1.0), clamp(a + d, 0.0, 1.0));',
    '}'
  ].join('\n');

  function compile(type, src) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      if (window.console) console.warn('sg-aurora shader: ' + gl.getShaderInfoLog(sh));
      return null;
    }
    return sh;
  }
  var vs = compile(gl.VERTEX_SHADER, VSRC);
  var fs = compile(gl.FRAGMENT_SHADER, FSRC);
  if (!vs || !fs) { cssFallback(); return; }
  var prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { cssFallback(); return; }
  gl.useProgram(prog);

  // full-screen triangle
  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var locPos = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(locPos);
  gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, 0, 0);
  var locRes = gl.getUniformLocation(prog, 'u_res');
  var locTime = gl.getUniformLocation(prog, 'u_time');
  var locScroll = gl.getUniformLocation(prog, 'u_scroll');
  var locMobile = gl.getUniformLocation(prog, 'u_mobile');
  var locPages = gl.getUniformLocation(prog, 'u_pages');

  // total document height in viewport units - drives the ONE page-wide crossing
  function updatePages() {
    var vh = Math.max(1, window.innerHeight || 1);
    var docH = Math.max(
      document.body ? document.body.scrollHeight : 0,
      document.documentElement ? document.documentElement.scrollHeight : 0,
      vh
    );
    gl.uniform1f(locPages, docH / vh);
  }

  // --- sizing ------------------------------------------------------------------
  function size() {
    var vw = window.innerWidth || document.documentElement.clientWidth || 0;
    var vh = window.innerHeight || document.documentElement.clientHeight || 0;
    if (vw < 10 || vh < 10) { setTimeout(size, 120); return; }
    var dpr = Math.min(window.devicePixelRatio || 1, CONFIG.MAX_DPR);
    cv.width = Math.round(vw * dpr);
    cv.height = Math.round(vh * dpr);
    gl.viewport(0, 0, cv.width, cv.height);
    gl.uniform1f(locMobile, vw < 768 ? 1 : 0);
    updatePages();
    render(); // resizing clears the canvas - repaint immediately
  }

  // --- state -------------------------------------------------------------------
  var t = Math.random() * 60;
  var scrollTarget = 0, scrollSoft = 0;
  var needsRender = true;
  var inView = true;

  function render() {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(locRes, cv.width, cv.height);
    gl.uniform1f(locTime, t * CONFIG.SPEED);
    gl.uniform1f(locScroll, scrollSoft);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    needsRender = false;
  }

  function onScroll() {
    var vh = Math.max(1, window.innerHeight);
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    scrollTarget = y / vh;
    var fade = Math.min(1, y / (CONFIG.SCROLL_FADE_VP * vh));
    wrap.style.opacity = String(1 - (1 - CONFIG.AMBIENT_OPACITY) * fade);
    updatePages(); // document height changes after React mounts / images load
    needsRender = true;
  }

  // --- loop (FPS-capped; skips when hidden or offscreen) ------------------------
  var last = 0;
  var frameMs = 1000 / CONFIG.FPS;
  function loop(now) {
    requestAnimationFrame(loop);
    if (document.hidden || !inView) return;
    if (now - last < frameMs) return;
    var dt = Math.min(100, now - last) / 1000;
    last = now;
    if (animate) t += dt;
    scrollSoft += (scrollTarget - scrollSoft) * 0.10;
    if (animate || needsRender || Math.abs(scrollTarget - scrollSoft) > 0.0005) render();
  }

  if (typeof IntersectionObserver !== 'undefined') {
    try {
      new IntersectionObserver(function (entries) {
        inView = !!(entries[0] && entries[0].isIntersecting);
      }).observe(cv);
    } catch (e) { /* keep inView=true */ }
  }

  cv.addEventListener('webglcontextlost', function (ev) {
    ev.preventDefault();
    cssFallback();
  }, false);

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(size, 150);
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) { scrollSoft = scrollTarget; render(); }
  });

  size();
  onScroll();
  requestAnimationFrame(loop);
})();
