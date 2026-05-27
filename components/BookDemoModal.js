// Vanilla "Book a demo" modal. Self-mounts on DOM ready and intercepts every
// click on a cal.com "Book a demo" link (or any [data-sg-invite] button) to
// open the same form used by the React InviteModal. Submits to formsubmit.co.
(function () {
  if (window.sgBookDemoInit) return;
  window.sgBookDemoInit = true;

  var SG_INVITE_TO = 'hello@simplegrid.ai';
  var SG_FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + SG_INVITE_TO;
  var SG_CAL_URL = 'https://cal.com/simplegrid-ai';

  var overlay = null;
  var form = null;
  var errorBox = null;
  var submitBtn = null;
  var nameInput = null;
  var lastFocus = null;
  var state = 'idle';

  function buildModal() {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('hidden', '');
    overlay.style.display = 'none';
    overlay.innerHTML = ''
      + '<form class="modal" role="dialog" aria-modal="true" aria-labelledby="sg-bd-h" data-form-name="invite" style="position:relative">'
      +   '<button type="button" class="sg-bd-close" aria-label="Close" style="position:absolute;top:14px;right:16px;background:none;border:none;font-size:22px;color:var(--fg3);cursor:pointer;line-height:1">×</button>'
      +   '<h2 id="sg-bd-h">Request an invite</h2>'
      +   '<p class="sub">A few partner slots open each cycle. Tell us about you.</p>'
      +   '<input type="hidden" name="_subject" value="New invite request - SimpleGrid">'
      +   '<input type="hidden" name="_template" value="table">'
      +   '<input type="hidden" name="_captcha" value="false">'
      +   '<input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off">'
      +   '<div class="field">'
      +     '<label for="sg-bd-name">Your name <span aria-hidden="true" style="color:var(--sg-red)">*</span></label>'
      +     '<input id="sg-bd-name" type="text" name="name" placeholder="Mike" required aria-required="true">'
      +   '</div>'
      +   '<div class="field">'
      +     '<label for="sg-bd-org">Organization <span aria-hidden="true" style="color:var(--sg-red)">*</span></label>'
      +     '<input id="sg-bd-org" type="text" name="organization" placeholder="Ridgeline Manufacturing" required aria-required="true">'
      +   '</div>'
      +   '<div class="field">'
      +     '<label for="sg-bd-email">Work email <span aria-hidden="true" style="color:var(--sg-red)">*</span></label>'
      +     '<input id="sg-bd-email" type="email" name="email" placeholder="mike@ridgeline.com" required aria-required="true">'
      +   '</div>'
      +   '<div class="sg-bd-err" role="status" aria-live="polite" style="display:none;padding:10px 12px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:var(--radius-md);color:#B91C1C;font-size:13px;margin-bottom:12px;line-height:1.45"></div>'
      +   '<button type="submit" class="btn btn-primary sg-bd-submit" style="width:100%;justify-content:center;margin-top:4px">Request an Invite →</button>'
      +   '<p style="font-size:11px;color:var(--fg3);text-align:center;margin-top:14px;letter-spacing:0.08em;text-transform:uppercase;font-weight:600">We respond within 48 hours · Your data is used only for your deployment - see <a href="/privacy.html" style="color:var(--sg-blue)">Privacy</a></p>'
      + '</form>';

    document.body.appendChild(overlay);

    form = overlay.querySelector('form');
    errorBox = overlay.querySelector('.sg-bd-err');
    submitBtn = overlay.querySelector('.sg-bd-submit');
    nameInput = overlay.querySelector('#sg-bd-name');

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    overlay.querySelector('.sg-bd-close').addEventListener('click', close);
    form.addEventListener('submit', onSubmit);
  }

  function renderSuccess() {
    overlay.innerHTML = ''
      + '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="sg-bd-ok-h" style="position:relative;text-align:center">'
      +   '<button type="button" class="sg-bd-close" aria-label="Close" style="position:absolute;top:14px;right:16px;background:none;border:none;font-size:22px;color:var(--fg3);cursor:pointer;line-height:1">×</button>'
      +   '<div style="width:56px;height:56px;border-radius:50%;background:rgba(16,185,129,0.12);display:flex;align-items:center;justify-content:center;margin:8px auto 18px">'
      +     '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>'
      +   '</div>'
      +   '<h2 id="sg-bd-ok-h" style="margin-bottom:8px">Request received</h2>'
      +   '<p class="sub" style="margin-bottom:14px">Thanks. We\'ll review within 48 hours.</p>'
      +   '<button type="button" class="btn btn-secondary sg-bd-close" style="width:100%;justify-content:center">Close</button>'
      + '</div>';
    overlay.querySelectorAll('.sg-bd-close').forEach(function (b) { b.addEventListener('click', close); });
  }

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.style.display = 'block';
  }
  function clearError() {
    errorBox.textContent = '';
    errorBox.style.display = 'none';
  }

  function onSubmit(e) {
    e.preventDefault();
    if (state === 'submitting') return;
    state = 'submitting';
    clearError();
    submitBtn.disabled = true;
    submitBtn.style.opacity = 0.7;
    submitBtn.textContent = 'Sending…';
    if (window.sgTrack) window.sgTrack('invite_modal_submitted', { form: 'invite' });

    var data = new FormData(form);
    fetch(SG_FORM_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: data
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (json) {
        if (res.ok && (json.success === 'true' || json.success === true)) {
          state = 'success';
          if (window.sgTrack) window.sgTrack('invite_modal_succeeded', { form: 'invite' });
          renderSuccess();
        } else {
          state = 'error';
          submitBtn.disabled = false;
          submitBtn.style.opacity = 1;
          submitBtn.textContent = 'Request an Invite →';
          showError(json.message || 'Something went wrong. Please try again or email hello@simplegrid.ai directly.');
        }
      });
    }).catch(function () {
      state = 'error';
      submitBtn.disabled = false;
      submitBtn.style.opacity = 1;
      submitBtn.textContent = 'Request an Invite →';
      showError('Network error. Please try again or email hello@simplegrid.ai directly.');
    });
  }

  function open() {
    buildModal();
    lastFocus = document.activeElement;
    overlay.removeAttribute('hidden');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    requestAnimationFrame(function () { if (nameInput) nameInput.focus(); });
  }

  function close() {
    if (!overlay) return;
    overlay.setAttribute('hidden', '');
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
    if (lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch (e) {}
    // Reset modal markup for next open if we were on success screen
    if (state === 'success') {
      state = 'idle';
      overlay.remove();
      overlay = null;
    }
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

  function isCalUrl(href) {
    if (!href) return false;
    return href === SG_CAL_URL || href === SG_CAL_URL + '/' || href.indexOf(SG_CAL_URL + '?') === 0 || href.indexOf(SG_CAL_URL + '#') === 0;
  }

  function isBookDemoTrigger(el) {
    if (!el) return false;
    if (el.matches && el.matches('[data-sg-invite]')) return true;
    if (el.tagName === 'A' && isCalUrl(el.getAttribute('href') || el.href)) {
      var t = (el.textContent || '').trim().toLowerCase();
      // Treat any "book a demo" link as a form trigger. "Book a call" stays cal.com.
      if (t.indexOf('book a demo') !== -1) return true;
    }
    return false;
  }

  document.addEventListener('click', function (e) {
    var target = e.target.closest('a, button, [data-sg-invite]');
    if (!target) return;
    if (!isBookDemoTrigger(target)) return;
    e.preventDefault();
    open();
  }, true);

  window.sgOpenInvite = open;
})();
