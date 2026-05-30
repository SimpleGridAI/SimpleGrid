// Submission flow: POSTs to FormSubmit (https://formsubmit.co), which forwards
// every submission as an email to SG_INVITE_TO. No backend required.
//
// ONE-TIME ACTIVATION: the very first submission triggers FormSubmit to send a
// confirmation email to SG_INVITE_TO with an activation link. Click that link
// once - every submission after that lands in the inbox automatically.
const SG_INVITE_TO = 'hello@simplegrid.ai';
const SG_FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + SG_INVITE_TO;

function InviteModal({ onClose }) {
  const [state, setState] = React.useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = React.useState('');
  const firstFieldRef = React.useRef(null);
  const lastReturnEl = React.useRef(null);

  // Modal a11y: focus trap + return focus + Escape to close + body scroll lock.
  React.useEffect(() => {
    lastReturnEl.current = document.activeElement;
    // Move focus into the modal once mounted.
    requestAnimationFrame(() => {
      if (firstFieldRef.current) firstFieldRef.current.focus();
    });
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;
      const overlay = document.querySelector('.modal-overlay');
      if (!overlay) return;
      const focusables = overlay.querySelectorAll(
        'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      if (lastReturnEl.current && lastReturnEl.current.focus) lastReturnEl.current.focus();
    };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (state === 'submitting') return;
    setState('submitting');
    const form = e.target;
    const data = new FormData(form);
    if (window.sgTrack) window.sgTrack('invite_modal_submitted', { form: 'invite' });

    try {
      const res = await fetch(SG_FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && (json.success === 'true' || json.success === true)) {
        setState('success');
        if (window.sgTrack) window.sgTrack('invite_modal_succeeded', { form: 'invite' });
      } else {
        setErrorMsg(json.message || 'Something went wrong. Please try again or email hello@simplegrid.ai directly.');
        setState('error');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again or email hello@simplegrid.ai directly.');
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="invite-success-h" style={{ position: 'relative', textAlign: 'center' }}>
          <button type="button" aria-label="Close invite confirmation" onClick={onClose} style={{ position: 'absolute', top: 14, right: 16, background: 'none', border: 'none', fontSize: 22, color: 'var(--fg3)', cursor: 'pointer', lineHeight: 1 }}>×</button>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px auto 18px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2 id="invite-success-h" style={{ marginBottom: 8 }}>Request received</h2>
          <p className="sub" style={{ marginBottom: 14 }}>Thanks. We'll review within 48 hours.</p>
          <a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener noreferrer" data-cta="invite_success" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 10 }}>
            Skip the wait - book a call now
          </a>
          <button type="button" className="btn btn-secondary" onClick={onClose} style={{ width: '100%', justifyContent: 'center' }}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <form className="modal" role="dialog" aria-modal="true" aria-labelledby="invite-h" data-form-name="invite" onSubmit={submit} style={{ position: 'relative' }}>
        <button type="button" aria-label="Close invite request" onClick={onClose} style={{ position: 'absolute', top: 14, right: 16, background: 'none', border: 'none', fontSize: 22, color: 'var(--fg3)', cursor: 'pointer', lineHeight: 1 }}>×</button>
        <h2 id="invite-h">Book a demo</h2>
        <p className="sub">We onboard selectively each quarter. Tell us about your operation - if we can win for you, we build it at our risk and you run it free for 30 days before you pay.</p>

        {/* FormSubmit settings (not delivered to recipient inbox) */}
        <input type="hidden" name="_subject" value="New invite request - SimpleGrid" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        {/* honeypot - bots fill it, humans don't see it */}
        <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

        <div className="field">
          <label htmlFor="invite-name">Your name <span aria-hidden="true" style={{color:'var(--sg-red)'}}>*</span></label>
          <input id="invite-name" ref={firstFieldRef} type="text" name="name" placeholder="Mike" required aria-required="true" autoComplete="name" disabled={state === 'submitting'} />
        </div>
        <div className="field">
          <label htmlFor="invite-org">Organization <span aria-hidden="true" style={{color:'var(--sg-red)'}}>*</span></label>
          <input id="invite-org" type="text" name="organization" placeholder="Ridgeline Manufacturing" required aria-required="true" autoComplete="organization" disabled={state === 'submitting'} />
        </div>
        <div className="field">
          <label htmlFor="invite-email">Work email <span aria-hidden="true" style={{color:'var(--sg-red)'}}>*</span></label>
          <input id="invite-email" type="email" name="email" placeholder="mike@ridgeline.com" required aria-required="true" autoComplete="email" disabled={state === 'submitting'} />
        </div>

        <div aria-live="polite" role="status" style={{ minHeight: state === 'error' ? 'auto' : 0 }}>
          {state === 'error' && (
            <div style={{ padding: '10px 12px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 'var(--radius-md)', color: '#B91C1C', fontSize: 13, marginBottom: 12, lineHeight: 1.45 }}>
              {errorMsg}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={state === 'submitting'} style={{ width: '100%', justifyContent: 'center', marginTop: 4, opacity: state === 'submitting' ? 0.7 : 1 }}>
          {state === 'submitting' ? 'Sending…' : 'Book a demo →'}
        </button>
        <p style={{ fontSize: 11, color: 'var(--fg3)', textAlign: 'center', marginTop: 14, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
          We respond within 48 hours · Your data is used only for your deployment - see <a href="/privacy.html" style={{ color: 'var(--sg-blue)' }}>Privacy</a>
        </p>
      </form>
    </div>
  );
}
window.InviteModal = InviteModal;
