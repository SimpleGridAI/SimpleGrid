// blog-post.js - loader for static /blog/{slug}/index.html pages.
// The article body is hard-coded in HTML so crawlers can read it.
// This script mounts only the dynamic pieces: Nav, Footer, and the
// per-post interactive infographic (if one exists for window.__SG_BLOG_ID__).
(function () {
  function NavWrap() {
    const [showLogin, setShowLogin] = React.useState(false);
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(Nav, { page: 'blog', onLoginClick: () => setShowLogin(true) }),
      showLogin && React.createElement(LoginModal, { onClose: () => setShowLogin(false) })
    );
  }

  const navEl = document.getElementById('root-nav');
  if (navEl && typeof Nav !== 'undefined') {
    ReactDOM.createRoot(navEl).render(React.createElement(NavWrap));
  }

  const footerEl = document.getElementById('root-footer');
  if (footerEl && typeof Footer !== 'undefined') {
    ReactDOM.createRoot(footerEl).render(React.createElement(Footer));
  }

  const blogId = window.__SG_BLOG_ID__;
  if (blogId && window.PostInfographics && window.PostInfographics[blogId]) {
    const pi = window.PostInfographics[blogId];
    const midEl = document.getElementById('root-infographic-mid');
    if (midEl && pi.mid) ReactDOM.createRoot(midEl).render(pi.mid);
    const endEl = document.getElementById('root-infographic-end');
    if (endEl && pi.end) ReactDOM.createRoot(endEl).render(pi.end);
  }
})();
