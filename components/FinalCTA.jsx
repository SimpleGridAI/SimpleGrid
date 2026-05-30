// Standard closing CTA band shown above the footer on every page.
//
// Self-contained on purpose: the only action is "Book a demo", a cal.com link
// that BookDemoModal (loaded site-wide) intercepts to open the in-page form.
// So this needs no Reveal / InviteModal and works on static pages too. Copy is
// tailored per page via props; the defaults are the canonical home copy.
function FinalCTA({
  title = 'Try it on. Then decide.',
  body = "Every ERP vendor makes you pay first and hope it works. We flipped it. We carry the cost, we carry the risk, we prove it on your floor. You run it on your real floor for 30 days - your real team, your real orders - and pay only when it's already running your business. The risk is ours until the value is yours.",
  note = 'Limited slots each quarter. We onboard selectively - only when we know we can win for you.',
  ctaLabel = 'Book a demo',
} = {}) {
  return (
    <section className="final-cta-band">
      <div className="final-cta-gridbg" aria-hidden="true" />
      <div className="container">
        <div className="final-cta-inner">
          <h2 className="final-cta-head">{title}</h2>
          <div className="final-cta-col">
            <p className="final-cta-text">{body}</p>
            <a
              href="https://cal.com/simplegrid-ai"
              rel="noopener noreferrer"
              data-cta="final_cta"
              className="btn btn-lg btn-primary final-cta-btn"
            >
              {ctaLabel}
            </a>
            {note ? <p className="final-cta-note">{note}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
window.FinalCTA = FinalCTA;
