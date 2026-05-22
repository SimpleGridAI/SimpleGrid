function LoginModal({ onClose, onSuccess, title = 'Log in to SimpleGrid', sub = 'Access your operations dashboard.' }) {
  const [tab, setTab] = React.useState('email');
  const submit = (e) => {
    e.preventDefault();
    try { localStorage.setItem('sg_auth', '1'); } catch {}
    if (onSuccess) onSuccess();
    else onClose();
  };
  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <form className="modal" style={{ position: 'relative' }} onSubmit={submit}>
        <button type="button" className="close-btn" onClick={onClose} style={{position:'absolute',top:16,right:16,background:'none',border:'none',fontSize:20,color:'var(--fg3)',cursor:'pointer'}}>×</button>
        <img src="assets/simplegrid-logomark.svg" alt="" style={{height:28,marginBottom:16}} />
        <h2>{title}</h2>
        <p className="sub">{sub}</p>
        <div className="tabs">
          <button type="button" className={'tab' + (tab === 'email' ? ' active' : '')} onClick={() => setTab('email')}>Email</button>
          <button type="button" className={'tab' + (tab === 'mobile' ? ' active' : '')} onClick={() => setTab('mobile')}>Mobile number</button>
        </div>
        {tab === 'email' ? (
          <div className="field">
            <label>Email address</label>
            <input type="email" placeholder="you@company.com" required />
          </div>
        ) : (
          <div className="field">
            <label>Mobile number</label>
            <input type="tel" placeholder="+91 98765 43210" required />
          </div>
        )}
        <div className="field">
          <label>Password</label>
          <input type="password" placeholder="••••••••" required />
        </div>
        <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center',marginTop:4}}>Log in</button>
        <p style={{fontSize:13,color:'var(--fg3)',textAlign:'center',marginTop:14}}>
          Don't have an account? <a href="https://calendly.com" target="_blank" rel="noopener" style={{color:'var(--sg-blue)',border:'none'}}>Book a call with the founder</a> to get started.
        </p>
      </form>
    </div>
  );
}
window.LoginModal = LoginModal;
