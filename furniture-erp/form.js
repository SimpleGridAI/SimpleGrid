/* =========================================================================
   SimpleGrid · Shared Lead Form Logic for paid-traffic landing pages
   Mirrors the InviteModal submission pattern: posts FormData to FormSubmit's
   AJAX endpoint, fires lead_captured on success (picked up by GTM + PostHog).
   ========================================================================= */

// ---------------------------------------------------------------------------
// Backend: FormSubmit forwards every submission as an email to SG_INVITE_TO.
// First-time activation: the very first submission triggers FormSubmit to
// send a confirmation email with an activation link — click it once and
// every submission after that lands in the inbox automatically.
// ---------------------------------------------------------------------------
const SG_INVITE_TO = 'hello@simplegrid.ai';
const SG_FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + SG_INVITE_TO;

// ---------------------------------------------------------------------------
// Conversion event — fires on successful submit.
//
// Routes through window.sgTrack (defined in /assets/js/tracking.js), which
// forwards the event to BOTH PostHog and GA4 if they've been loaded.
// tracking.js is loaded sitewide; if the visitor hasn't accepted the cookie
// banner yet, posthog/gtag haven't loaded and sgTrack silently no-ops.
// That's the right behaviour — no consent, no event.
// ---------------------------------------------------------------------------
function trackConversion(payload) {
  payload = payload || {};
  if (typeof window.sgTrack !== 'function') return;
  try {
    window.sgTrack('lead_captured', {
      page:        window.SG_PAGE || '',
      campaign:    window.SG_CAMPAIGN || '',
      email:       payload.email || '',
      // Pain text truncated — useful for cohort building, full text still
      // lands in the email + FormSubmit dashboard.
      description: (payload.description || '').slice(0, 200),
    });
  } catch (e) {}
}

// ---------------------------------------------------------------------------
// Form wiring
// ---------------------------------------------------------------------------

(function() {
  const form = document.getElementById('lead-form');
  if (!form) return;

  const fields = {
    name:        form.querySelector('[name="name"]'),
    email:       form.querySelector('[name="email"]'),
    description: form.querySelector('[name="description"]'),
    honey:       form.querySelector('[name="_honey"]'),
  };
  const submitBtn   = form.querySelector('button[type="submit"]');
  const submitLabel = submitBtn ? submitBtn.querySelector('.label') : null;
  const successEl   = document.getElementById('form-success');
  const errorEl     = document.getElementById('form-error');

  // ---- Validation ----
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFieldError(field, msg) {
    const wrap = field.closest('.field');
    if (!wrap) return;
    wrap.classList.add('has-error');
    const errEl = wrap.querySelector('.field-error');
    if (errEl) errEl.textContent = msg;
    field.setAttribute('aria-invalid', 'true');
  }

  function clearFieldError(field) {
    const wrap = field.closest('.field');
    if (!wrap) return;
    wrap.classList.remove('has-error');
    field.removeAttribute('aria-invalid');
  }

  function validate() {
    let ok = true;

    if (!fields.name.value.trim()) {
      setFieldError(fields.name, 'Please enter your name.');
      ok = false;
    } else {
      clearFieldError(fields.name);
    }

    const email = fields.email.value.trim();
    if (!email) {
      setFieldError(fields.email, 'Please enter your email.');
      ok = false;
    } else if (!EMAIL_RE.test(email)) {
      setFieldError(fields.email, 'That email doesn’t look right.');
      ok = false;
    } else {
      clearFieldError(fields.email);
    }

    if (!fields.description.value.trim()) {
      setFieldError(fields.description, 'A sentence or two is enough.');
      ok = false;
    } else {
      clearFieldError(fields.description);
    }

    return ok;
  }

  // Clear errors as the user fixes them
  ['name', 'email', 'description'].forEach(key => {
    const f = fields[key];
    if (!f) return;
    f.addEventListener('input', () => {
      if (f.closest('.field').classList.contains('has-error')) clearFieldError(f);
      if (errorEl) errorEl.classList.remove('show');
    });
  });

  // ---- Submit ----
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (errorEl) errorEl.classList.remove('show');

    // Honeypot: bots fill hidden _honey field. Pretend success without sending.
    if (fields.honey && fields.honey.value) {
      form.style.display = 'none';
      if (successEl) successEl.classList.add('show');
      return;
    }

    if (!validate()) {
      const firstErr = form.querySelector('.field.has-error input, .field.has-error textarea');
      if (firstErr) firstErr.focus();
      return;
    }

    // Build FormData (matches InviteModal pattern — FormSubmit AJAX accepts this).
    const data = new FormData();
    data.append('name',        fields.name.value.trim());
    data.append('email',       fields.email.value.trim());
    data.append('description', fields.description.value.trim());
    data.append('page',        window.SG_PAGE || '');
    data.append('campaign',    window.SG_CAMPAIGN || '');
    data.append('submitted_at', new Date().toISOString());
    data.append('referrer',    document.referrer || '');
    data.append('url',         window.location.href);

    // FormSubmit control fields (not delivered in the email body)
    data.append('_subject', 'New lead — ' + (window.SG_CAMPAIGN || 'SimpleGrid landing'));
    data.append('_template', 'table');
    data.append('_captcha', 'false');

    // UI -> sending
    submitBtn.disabled = true;
    const originalLabel = submitLabel ? submitLabel.textContent : '';
    if (submitLabel) submitLabel.textContent = 'Sending…';

    try {
      const res = await fetch(SG_FORM_ENDPOINT, {
        method:  'POST',
        headers: { Accept: 'application/json' },
        body:    data,
      });
      const json = await res.json().catch(() => ({}));
      const success = res.ok && (json.success === 'true' || json.success === true);

      if (!success) {
        throw new Error(json.message || 'submit failed: ' + res.status);
      }

      // Success — hide form, show confirmation, fire conversion
      trackConversion({
        email:       fields.email.value.trim(),
        description: fields.description.value.trim(),
      });
      form.style.display = 'none';
      if (successEl) {
        successEl.classList.add('show');
        successEl.setAttribute('tabindex', '-1');
        successEl.focus();
      }
    } catch (err) {
      console.error('[SimpleGrid] form submit failed:', err);
      if (errorEl) {
        errorEl.textContent = 'Something went wrong. Please try again, or email hello@simplegrid.ai directly.';
        errorEl.classList.add('show');
      }
      submitBtn.disabled = false;
      if (submitLabel) submitLabel.textContent = originalLabel;
    }
  });
})();
