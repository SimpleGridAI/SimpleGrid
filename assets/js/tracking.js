// SimpleGrid lightweight conversion-event tracking.
// Fires the same event to both PostHog and GA4 if they're loaded.
// Safe to call before either is initialised - the call is queued.
(function () {
  function trackEvent(name, props) {
    props = props || {};
    try {
      if (window.posthog && typeof window.posthog.capture === 'function') {
        window.posthog.capture(name, props);
      }
    } catch (e) { /* posthog not ready yet */ }
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', name, props);
      }
    } catch (e) { /* gtag not ready yet */ }
    try {
      if (typeof window.clarity === 'function') {
        window.clarity('event', name);
      }
    } catch (e) { /* clarity not ready yet */ }
  }

  // Expose a single global hook.
  window.sgTrack = trackEvent;

  // Auto-instrument every element with [data-cta] - one declarative attribute
  // wires up the click event everywhere. Add data-cta="some_location" to any
  // CTA element you ship.
  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('[data-cta]') : null;
    if (!el) return;
    var location = el.getAttribute('data-cta') || 'unknown';
    var label = (el.textContent || '').trim().slice(0, 80);
    var href = el.getAttribute('href') || '';
    trackEvent('cta_clicked', { location: location, label: label, href: href });
    if (/cal\.com\/simplegrid-ai/i.test(href)) {
      trackEvent('cal_com_clicked', { location: location });
    }
  }, true);

  // Auto-track form submissions that have data-form-name
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form || !form.getAttribute) return;
    var name = form.getAttribute('data-form-name');
    if (!name) return;
    trackEvent(name + '_submitted', { form: name });
  }, true);

  // Track scroll depth (one event per quarter, once per page)
  var seen = {};
  function onScroll() {
    var h = document.documentElement;
    var pct = Math.round(((window.scrollY + window.innerHeight) / h.scrollHeight) * 100);
    [25, 50, 75, 100].forEach(function (q) {
      if (pct >= q && !seen[q]) {
        seen[q] = true;
        trackEvent('scroll_depth', { percent: q });
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // Track outbound link clicks
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href^="http"]') : null;
    if (!a) return;
    try {
      var url = new URL(a.href);
      if (url.hostname && url.hostname !== window.location.hostname) {
        trackEvent('outbound_clicked', { domain: url.hostname, href: a.href });
      }
    } catch (e) { /* malformed url */ }
  }, true);
})();
