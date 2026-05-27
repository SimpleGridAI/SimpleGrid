// SimpleGrid analytics init - shared across every page.
// - PostHog + GA4 are both deferred until first user interaction or 30s timeout
//   (matches the privacy posture: nothing fires until the visitor does something).
// - The cookie banner sets localStorage `sg_ph_opt_out=1` to permanently disable.
// - The same flag controls both PostHog and GA4 so opt-out is one click.
(function () {
  if (typeof window === 'undefined') return;

  // PostHog stub - safe to queue calls before the real lib loads.
  function loadPostHog() {
    if (window.posthog && window.posthog.__loaded) return;
    !function (t, e) { var o, n, p, r; e.__SV || (window.posthog = e, e._i = [], e.init = function (i, s, a) { function g(t, e) { var o = e.split("."); 2 == o.length && (t = t[o[0]], e = o[1]), t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } } (p = t.createElement("script")).type = "text/javascript", p.crossOrigin = "anonymous", p.async = !0, p.src = s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js", (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r); var u = e; for (void 0 !== a ? u = e[a] = [] : a = "posthog", u.people = u.people || [], u.toString = function (t) { var e = "posthog"; return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e }, u.people.toString = function () { return u.toString(1) + ".people (stub)" }, o = "Ei Ni init zi Gi Nr Ui Xi Vi capture calculateEventProperties tn register register_once register_for_session unregister unregister_for_session an getFeatureFlag getFeatureFlagPayload getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync ln identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset setIdentity clearIdentity get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException addExceptionStep captureLog startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty nn Qi createPersonProfile setInternalOrTestUser sn qi cn opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing Ji debug Fr rn getPageViewId captureTraceFeedback captureTraceMetric Bi".split(" "), n = 0; n < o.length; n++) g(u, o[n]); e._i.push([i, s, a]) }, e.__SV = 1) }(document, window.posthog || []);
    window.posthog.init('phc_uYqTNuyvu48ttUP7tjh89v8JBvjgbRZ9bvZdfdVoEPVh', {
      api_host: 'https://us.i.posthog.com',
      defaults: '2026-01-30',
      person_profiles: 'identified_only',
      disable_session_recording: true,
      disable_surveys: true,
      opt_out_capturing_by_default: false
    });
  }

  function loadGA4() {
    if (window.__sgGA4Loaded) return;
    window.__sgGA4Loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'G-PGZBXNF51L', { anonymize_ip: true });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-PGZBXNF51L';
    document.head.appendChild(s);
  }

  function load() {
    try {
      if (localStorage.getItem('sg_ph_opt_out') === '1') return;
    } catch (e) { /* ignore */ }
    loadPostHog();
    loadGA4();
  }

  // Defer until first user interaction (privacy-friendlier + faster TBT).
  // Fallback to 30s for passive readers.
  var loaded = false;
  var events = ['mousemove', 'scroll', 'click', 'touchstart', 'keydown'];
  function trigger() {
    if (loaded) return;
    loaded = true;
    load();
    events.forEach(function (e) { document.removeEventListener(e, trigger, true); });
  }
  events.forEach(function (e) { document.addEventListener(e, trigger, { once: true, passive: true, capture: true }); });
  setTimeout(trigger, 30000);

  // Console helper for users to opt out manually.
  window.sgPostHogOptOut = function (out) {
    try {
      if (out === false) localStorage.removeItem('sg_ph_opt_out');
      else { localStorage.setItem('sg_ph_opt_out', '1'); console.log('SimpleGrid: analytics opted out on this device.'); }
    } catch (e) { /* ignore */ }
  };
})();
