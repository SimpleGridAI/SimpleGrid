// "Try our ERP" sandbox modal. Self-mounts on DOM ready. Triggered explicitly
// via window.sgOpenTryErp() (nav button calls it directly) or by any element
// carrying [data-sg-try-erp]. Submits the email to vader /sandbox/leads, then
// redirects the visitor into peralta with ?sandbox=true&email=... so peralta
// auto-logs them into the shared sandbox tenant.
//
// Endpoint + redirect URL live as constants at the top - swap them when CF
// fronts vader/peralta. Lead capture is fire-and-forget from the visitor's
// perspective: we redirect even if the POST fails (the email matters to us,
// not to the user's demo experience).
(function () {
  if (window.sgTryErpInit) return;
  window.sgTryErpInit = true;

  // Apps Script Web App URL — same sink vader uses behind /sandbox/leads.
  // We POST directly from the browser because simplegrid.ai is HTTPS and the
  // vader ALB is plain HTTP today (mixed-content block). Apps Script serves
  // HTTPS natively, so the browser is happy. Lead row still lands in the
  // same "Sandbox leads" Google Sheet either way.
  var SG_LEAD_ENDPOINT =
    'https://script.google.com/macros/s/AKfycbxFEMIoufWIWT7TggG_wg0wr87cUMqB8xIUMnMMScyHT4w7IR8jmM4EZkQ7uHly4VpF/exec';
  var SG_SANDBOX_URL =
    'http://simplegrid-peralta-dev.s3-website.ap-south-1.amazonaws.com/';

  var overlay = null;
  var form = null;
  var errorBox = null;
  var submitBtn = null;
  var emailInput = null;
  var lastFocus = null;
  var state = 'idle';

  function buildModal() {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('hidden', '');
    overlay.style.display = 'none';
    overlay.innerHTML = ''
      + '<form class="modal" role="dialog" aria-modal="true" aria-labelledby="sg-try-h" data-form-name="try-erp" style="position:relative">'
      +   '<button type="button" class="sg-try-close" aria-label="Close" style="position:absolute;top:14px;right:16px;background:none;border:none;font-size:22px;color:var(--fg3);cursor:pointer;line-height:1">×</button>'
      +   '<h2 id="sg-try-h">Try your ERP</h2>'
      +   '<p class="sub">Drop your work email - we\'ll drop you straight into a live ERP shaped like a real factory. Click around. No setup, no sales call.</p>'
      +   '<div class="field">'
      +     '<label for="sg-try-email">Work email <span aria-hidden="true" style="color:var(--sg-red)">*</span></label>'
      +     '<input id="sg-try-email" type="email" name="email" placeholder="you@company.com" required aria-required="true" autocomplete="email" inputmode="email">'
      +   '</div>'
      +   '<div class="sg-try-err" role="status" aria-live="polite" style="display:none;padding:10px 12px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:var(--radius-md);color:#B91C1C;font-size:13px;margin-bottom:12px;line-height:1.45"></div>'
      +   '<button type="submit" class="btn btn-primary sg-try-submit" style="width:100%;justify-content:center;margin-top:4px">Take me to the ERP →</button>'
      +   '<p style="font-size:11px;color:var(--fg3);text-align:center;margin-top:14px;letter-spacing:0.04em">Shared demo tenant. Data resets nightly. By continuing you agree to our <a href="/privacy.html" style="color:var(--sg-blue)">Privacy</a>.</p>'
      + '</form>';

    document.body.appendChild(overlay);

    form = overlay.querySelector('form');
    errorBox = overlay.querySelector('.sg-try-err');
    submitBtn = overlay.querySelector('.sg-try-submit');
    emailInput = overlay.querySelector('#sg-try-email');

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    overlay.querySelector('.sg-try-close').addEventListener('click', close);
    form.addEventListener('submit', onSubmit);
  }

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.style.display = 'block';
  }
  function clearError() {
    errorBox.textContent = '';
    errorBox.style.display = 'none';
  }

  function redirectToSandbox(email) {
    var url = SG_SANDBOX_URL + '?sandbox=true&email=' + encodeURIComponent(email);
    window.location.href = url;
  }

  function onSubmit(e) {
    e.preventDefault();
    if (state === 'submitting') return;
    state = 'submitting';
    clearError();
    submitBtn.disabled = true;
    submitBtn.style.opacity = 0.7;
    submitBtn.textContent = 'Opening your ERP…';
    var email = (emailInput.value || '').trim();
    if (window.sgTrack) window.sgTrack('try_erp_submitted', { form: 'try-erp' });

    // Fire-and-forget the lead POST. Redirect happens either way so the user
    // never feels the network. If POST fails, server-side log catches it.
    var leadPromise;
    try {
      // Apps Script web apps reject preflighted requests. text/plain keeps it
      // a "simple" CORS request → no preflight. Apps Script reads the body
      // via e.postData.contents regardless of declared MIME.
      leadPromise = fetch(SG_LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ email: email, source: 'try-erp-nav' })
      });
    } catch (err) {
      leadPromise = Promise.resolve(null);
    }

    // Give the POST 1.2s max - then redirect regardless. Keeps the perceived
    // latency snappy even if the BE is asleep.
    var timeout = new Promise(function (resolve) { setTimeout(resolve, 1200); });
    Promise.race([leadPromise.catch(function () { return null; }), timeout])
      .then(function () {
        if (window.sgTrack) window.sgTrack('try_erp_redirected', { form: 'try-erp' });
        redirectToSandbox(email);
      });
  }

  function setBackgroundHidden(hidden) {
    var kids = document.body.children;
    for (var i = 0; i < kids.length; i++) {
      var el = kids[i];
      if (el === overlay) continue;
      if (hidden) {
        if (!el.hasAttribute('aria-hidden')) { el.setAttribute('aria-hidden', 'true'); el.setAttribute('data-sg-try-hid', ''); }
      } else if (el.hasAttribute('data-sg-try-hid')) {
        el.removeAttribute('aria-hidden'); el.removeAttribute('data-sg-try-hid');
      }
    }
  }

  function open() {
    buildModal();
    lastFocus = document.activeElement;
    overlay.removeAttribute('hidden');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setBackgroundHidden(true);
    document.addEventListener('keydown', onKey);
    requestAnimationFrame(function () { if (emailInput) emailInput.focus(); });
    if (window.sgTrack) window.sgTrack('try_erp_opened', { form: 'try-erp' });
  }

  function close() {
    if (!overlay) return;
    setBackgroundHidden(false);
    overlay.setAttribute('hidden', '');
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
    state = 'idle';
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.style.opacity = 1;
      submitBtn.textContent = 'Take me to the ERP →';
    }
    if (lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch (e) {}
  }

  function onKey(e) {
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab' || !overlay) return;
    var focusables = overlay.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    var first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  // Any element opting in via [data-sg-try-erp] (the new nav button on static
  // HTML pages) opens the modal. The React Nav calls window.sgOpenTryErp()
  // directly so it doesn't depend on the data-attribute.
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var target = e.target.closest('[data-sg-try-erp]');
    if (!target) return;
    e.preventDefault();
    open();
  }, true);

  window.sgOpenTryErp = open;
})();
