// SimpleGrid lightweight conversion-event tracking.
// Fires the same event to PostHog, GA4, AND the GTM dataLayer if any are
// loaded. Safe to call before any are initialised - calls are queued.
//
// Note on the GTM dataLayer push: gtag('event', ...) only pushes an
// arguments-array entry to dataLayer (which GA4 reads but GTM's custom-event
// triggers ignore). To fire a GTM custom-event trigger on the event name,
// we ALSO push { event: name, ...props } explicitly. No double-counting
// because GTM treats the two push formats as separate signals.
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
      if (window.dataLayer && typeof window.dataLayer.push === 'function') {
        var payload = { event: name };
        for (var k in props) {
          if (Object.prototype.hasOwnProperty.call(props, k)) payload[k] = props[k];
        }
        window.dataLayer.push(payload);
      }
    } catch (e) { /* dataLayer not ready */ }
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
