// Standard closing CTA band shown above the footer on every page.
//
// Self-contained on purpose: the only action is "Book a demo", a cal.com link
// that BookDemoModal (loaded site-wide) intercepts to open the in-page form.
// So this needs no Reveal / InviteModal and works on static pages too. Copy is
// tailored per page via props; the defaults are the canonical home copy.
function FinalCTA({
  title = 'Try it on. Then decide.',
  body = "We configure SimpleGrid to your floor at our cost - your jobs, your routing steps, your QC checkpoints, your costing logic. Run it live for 30 days with your real team and your real orders. You pay only when it works.",
  note = 'Limited slots each quarter. We onboard selectively - only when we know we can win for you.',
  ctaLabel = 'Book a demo'
} = {}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "final-cta-band"
  }, /*#__PURE__*/React.createElement("div", {
    className: "final-cta-gridbg",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "final-cta-inner"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "final-cta-head"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "final-cta-col"
  }, /*#__PURE__*/React.createElement("p", {
    className: "final-cta-text"
  }, body), /*#__PURE__*/React.createElement("a", {
    href: "https://cal.com/simplegrid-ai",
    rel: "noopener noreferrer",
    "data-cta": "final_cta",
    "data-sg-invite": true,
    className: "btn btn-lg btn-primary final-cta-btn"
  }, ctaLabel), note ? /*#__PURE__*/React.createElement("p", {
    className: "final-cta-note"
  }, note) : null))));
}
window.FinalCTA = FinalCTA;