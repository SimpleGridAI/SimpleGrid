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

  const submit = async (e) => {
    e.preventDefault();
    setState('submitting');
    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch(SG_FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && (json.success === 'true' || json.success === true)) {
        setState('success');
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
        <div className="modal" style={{ position: 'relative', textAlign: 'center' }}>
          <button type="button" aria-label="Close invite confirmation" onClick={onClose} style={{ position: 'absolute', top: 14, right: 16, background: 'none', border: 'none', fontSize: 22, color: 'var(--fg3)', cursor: 'pointer', lineHeight: 1 }}>×</button>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px auto 18px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2 style={{ marginBottom: 8 }}>Request received</h2>
          <p className="sub" style={{ marginBottom: 24 }}>Thanks. We'll review and get back within 48 hours.</p>
          <button type="button" className="btn btn-primary" onClick={onClose} style={{ width: '100%', justifyContent: 'center' }}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <form className="modal" onSubmit={submit} style={{ position: 'relative' }}>
        <button type="button" aria-label="Close invite request" onClick={onClose} style={{ position: 'absolute', top: 14, right: 16, background: 'none', border: 'none', fontSize: 22, color: 'var(--fg3)', cursor: 'pointer', lineHeight: 1 }}>×</button>
        <h2>Request an invite</h2>
        <p className="sub">A few partner slots open each cycle. Tell us about you.</p>

        {/* FormSubmit settings (not delivered to recipient inbox) */}
        <input type="hidden" name="_subject" value="New invite request - SimpleGrid" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        {/* honeypot - bots fill it, humans don't see it */}
        <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

        <div className="field">
          <label htmlFor="invite-name">Your name</label>
          <input id="invite-name" type="text" name="name" placeholder="Mike" required autoFocus disabled={state === 'submitting'} />
        </div>
        <div className="field">
          <label htmlFor="invite-org">Organization</label>
          <input id="invite-org" type="text" name="organization" placeholder="Ridgeline Manufacturing" required disabled={state === 'submitting'} />
        </div>
        <div className="field">
          <label htmlFor="invite-email">Work email</label>
          <input id="invite-email" type="email" name="email" placeholder="mike@ridgeline.com" required disabled={state === 'submitting'} />
        </div>

        {state === 'error' && (
          <div style={{ padding: '10px 12px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 'var(--radius-md)', color: '#B91C1C', fontSize: 13, marginBottom: 12, lineHeight: 1.45 }}>
            {errorMsg}
          </div>
        )}

        <button type="submit" className="btn btn-primary" disabled={state === 'submitting'} style={{ width: '100%', justifyContent: 'center', marginTop: 4, opacity: state === 'submitting' ? 0.7 : 1 }}>
          {state === 'submitting' ? 'Sending…' : 'Request an Invite →'}
        </button>
        <p style={{ fontSize: 11, color: 'var(--fg3)', textAlign: 'center', marginTop: 14, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
          We respond within 48 hours · Selected partners only
        </p>
      </form>
    </div>
  );
}
window.InviteModal = InviteModal;
