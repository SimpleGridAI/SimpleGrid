/* =========================================================================
   SimpleGrid · RadialBurst (vanilla JS port for landing pages)
   Port of components/HomeTop.jsx's RadialBurst React component to plain JS
   so paid-traffic landing pages don't need React.

   Usage in HTML:
     <div class="hero-burst" data-sg-burst data-theme="light"></div>
     <script src="../assets/landing/radial-burst.js" defer></script>

   The script finds every element with [data-sg-burst], injects a <canvas>
   inside, and animates 100 radial blue lines (60 on mobile). Pauses when
   the canvas scrolls off-screen or the tab is hidden - same as the React
   version. <5% CPU per spec.
   ========================================================================= */
(function() {
  'use strict';

  function start(host) {
    // Avoid double-init if script loads twice
    if (host.__sgBurstInit) return;
    host.__sgBurstInit = true;

    const theme = host.getAttribute('data-theme') || 'light';

    // Build the canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    // host already provides the mask; canvas just fills it.
    host.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let animFrame, resizeTimeout;
    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = host.getBoundingClientRect();
      canvas.width = rect.width * dpr();
      canvas.height = rect.height * dpr();
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr(), 0, 0, dpr(), 0, 0);
    }
    resize();

    const W = () => canvas.width / dpr();
    const H = () => canvas.height / dpr();

    // ------ Build the line set ------
    let lines = [];
    function seed() {
      lines = [];
      const COUNT = (window.innerWidth < 768) ? 60 : 100;
      for (let i = 0; i < COUNT; i++) {
        const a = -Math.PI + Math.random() * Math.PI;
        const lenRatio = 0.4 + Math.random() * 0.5;
        const tone = Math.random();
        const baseAlpha = 0.95 - (lenRatio - 0.4) * 0.5 / 0.5 * 0.5; // ~0.45–0.95

        const phase = Math.random() * Math.PI * 2;
        const period = 3 + Math.random() * 3;
        const freq = (Math.PI * 2) / (period * 60);

        const swayPhase = Math.random() * Math.PI * 2;
        const swayPeriod = 8 + Math.random() * 6;
        const swayFreq = (Math.PI * 2) / (swayPeriod * 60);
        const swayAmp = 0.025 + Math.random() * 0.025;

        const lenPhase = Math.random() * Math.PI * 2;
        const lenPeriod = 6 + Math.random() * 6;
        const lenFreq = (Math.PI * 2) / (lenPeriod * 60);

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
    }
    seed();

    function onResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    }
    window.addEventListener('resize', onResize);

    // ------ Color palettes (light/dark) ------
    function lineRGBA(tone, alpha) {
      let r, g, b;
      if (theme === 'light') {
        r = Math.round(41  + (74  - 41)  * tone);
        g = Math.round(86  + (123 - 86)  * tone);
        b = Math.round(196 + (247 - 196) * tone);
      } else {
        r = Math.round(52  + (110 - 52)  * tone);
        g = Math.round(97  + (151 - 97)  * tone);
        b = Math.round(209 + (255 - 209) * tone);
      }
      return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
    }
    const nodeRGB = theme === 'light' ? '41,86,196'  : '74,123,247';
    const haloRGB = theme === 'light' ? '74,123,247' : '110,151,255';

    // ------ Visibility + tab-hidden pause ------
    let isVisible = true;
    let isTabActive = !document.hidden;
    const onVisibility = () => { isTabActive = !document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(function(entries) {
        isVisible = entries[0].isIntersecting;
      }, { threshold: 0 });
      observer.observe(canvas);
    }

    // ------ Animation loop ------
    let frame = 0;
    function draw() {
      if (!isVisible || !isTabActive) {
        animFrame = requestAnimationFrame(draw);
        return;
      }
      const w = W(), h = H();
      const cx = w / 2;
      const cy = h + 4;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < lines.length; i++) {
        const l = lines[i];
        const breath = 0.85 + 0.15 * Math.sin(frame * l.freq + l.phase);
        const alpha = l.baseAlpha * breath;

        const angleNow = l.a + l.swayAmp * Math.sin(frame * l.swayFreq + l.swayPhase);
        const lenMul = 1 + 0.02 * Math.sin(frame * l.lenFreq + l.lenPhase);
        const len = h * l.lenRatio * lenMul;

        const x = cx + Math.cos(angleNow) * len;
        const y = cy + Math.sin(angleNow) * len;

        const grad = ctx.createLinearGradient(cx, cy, x, y);
        grad.addColorStop(0,   lineRGBA(l.tone, 0));
        grad.addColorStop(0.5, lineRGBA(l.tone, alpha * 0.45));
        grad.addColorStop(1,   lineRGBA(l.tone, alpha));
        ctx.strokeStyle = grad;
        ctx.lineWidth = l.lw;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();

        let nodeAlpha = 0.7 + 0.3 * breath;
        let nodeRadius = l.nodeSize;

        if (l.twinkles) {
          const t = (Math.sin(frame * l.twinkleFreq + l.twinklePhase) + 1) * 0.5;
          const twinkleStrength = Math.pow(t, 3);
          nodeAlpha = Math.min(1, nodeAlpha + twinkleStrength * 0.3);
          nodeRadius = l.nodeSize * (1 + twinkleStrength * 0.7);
          if (twinkleStrength > 0.3) {
            ctx.fillStyle = 'rgba(' + haloRGB + ',' + (twinkleStrength * 0.22) + ')';
            ctx.beginPath();
            ctx.arc(x, y, nodeRadius * 2.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.fillStyle = 'rgba(' + nodeRGB + ',' + nodeAlpha + ')';
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      frame++;
      animFrame = requestAnimationFrame(draw);
    }
    draw();

    // Apply the same light-theme radial backdrop the React component uses.
    if (theme === 'light') {
      host.style.background = 'radial-gradient(ellipse 85% 65% at 50% 100%, #D6E4FF 0%, rgba(214,228,255,0.55) 35%, #FFFFFF 70%)';
    }
  }

  function init() {
    const hosts = document.querySelectorAll('[data-sg-burst]');
    for (let i = 0; i < hosts.length; i++) start(hosts[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
