// SimpleGrid cookie banner - opt-in consent (GDPR-strict friendly).
// - Shows once until the user accepts or declines.
// - Accept sets localStorage.sg_consent='accepted' and dispatches a
//   `sg:consent-accepted` window event so analytics-init.js can load
//   PostHog + GA4. Until then, NO analytics fires.
// - Decline sets sg_consent='declined' + sg_ph_opt_out='1' (permanent).
// - The banner persists across page loads until the user makes a choice.
(function () {
  if (typeof window === 'undefined' || !document.body) {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    try {
      var status = localStorage.getItem('sg_consent');
      if (status === 'accepted' || status === 'declined') return;
    } catch (e) { /* localStorage blocked */ }

    var bar = document.createElement('div');
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.id = 'sg-cookie-bar';
    bar.style.cssText = [
      'position:fixed', 'left:16px', 'right:16px', 'bottom:16px',
      'background:#1A1A1A', 'color:#fff', 'border-radius:12px',
      'padding:16px 18px', 'z-index:9999',
      'font-family:-apple-system,Segoe UI,sans-serif', 'font-size:14px',
      'line-height:1.5', 'box-shadow:0 12px 32px rgba(0,0,0,0.18)',
      'display:flex', 'gap:14px', 'flex-wrap:wrap',
      'align-items:center', 'justify-content:space-between',
      'max-width:760px', 'margin:0 auto'
    ].join(';');
    bar.innerHTML =
      '<div style="flex:1;min-width:240px">' +
      'We use cookies for analytics (PostHog + Google Analytics) to make the site better. ' +
      'You can accept, decline, or read our <a href="/privacy.html" style="color:#7FA7FF;text-decoration:underline">Privacy Policy</a>.' +
      '</div>' +
      '<div style="display:flex;gap:8px;flex-shrink:0">' +
      '<button type="button" id="sg-cc-decline" style="background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.35);padding:8px 14px;border-radius:8px;cursor:pointer;font:inherit">Decline</button>' +
      '<button type="button" id="sg-cc-accept" style="background:#3461E0;color:#fff;border:none;padding:8px 16px;border-radius:8px;cursor:pointer;font:inherit;font-weight:600">Accept</button>' +
      '</div>';

    document.body.appendChild(bar);

    function close() {
      if (bar && bar.parentNode) bar.parentNode.removeChild(bar);
    }

    document.getElementById('sg-cc-accept').addEventListener('click', function () {
      try {
        localStorage.setItem('sg_consent', 'accepted');
        localStorage.removeItem('sg_ph_opt_out');
      } catch (e) {}
      // Signal analytics-init.js that it can now load PostHog + GA4.
      try { window.dispatchEvent(new Event('sg:consent-accepted')); } catch (e) {}
      close();
    });
    document.getElementById('sg-cc-decline').addEventListener('click', function () {
      try {
        localStorage.setItem('sg_consent', 'declined');
        localStorage.setItem('sg_ph_opt_out', '1');
      } catch (e) {}
      close();
    });
  }
})();
