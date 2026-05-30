function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function FIcon({
  kind
}) {
  const common = {
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    style: {
      flexShrink: 0,
      marginTop: 2
    }
  };
  if (kind === 'mail') return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "5",
    width: "18",
    height: "14",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 7l9 6 9-6"
  }));
  if (kind === 'phone') return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
    d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"
  }));
  if (kind === 'linkedin') return /*#__PURE__*/React.createElement("svg", _extends({}, common, {
    fill: "currentColor",
    stroke: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.04h4.56V23H.22V8.04zm7.42 0h4.37v2.05h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V23h-4.56v-6.62c0-1.58-.03-3.61-2.2-3.61-2.2 0-2.54 1.72-2.54 3.5V23H7.64V8.04z"
  }));
  if (kind === 'calendar') return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 2v4M8 2v4M3 10h18"
  }));
  if (kind === 'pin') return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
    d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  }));
  return null;
}
function Footer() {
  // Honor the prefix the blog generator sets so internal links work from
  // nested pages like /blog/{slug}/index.html.
  const prefix = typeof window !== 'undefined' && window.__SG_BLOG_ASSET_PREFIX__ || '';
  const px = href => {
    if (!prefix) return href;
    if (/^(https?:|mailto:|tel:|#|\/)/i.test(href)) return href;
    return prefix + href;
  };
  const cols = [{
    h: 'Product',
    hHref: 'product.html',
    links: [{
      l: 'Meet Hank',
      href: 'product.html#hank'
    }, {
      l: 'Integrations',
      href: 'product.html#integrations'
    }, {
      l: 'Data security',
      href: 'product.html#security'
    }, {
      l: 'Events ledger',
      href: 'product.html#ledger'
    }, {
      l: 'Adoption',
      href: 'product.html#ability'
    }, {
      l: 'Your process, enforced',
      href: 'product.html#rules'
    }]
  }, {
    h: 'Resources',
    links: [{
      l: 'Productive Tools',
      href: 'tools/'
    }, {
      l: 'Case studies',
      href: 'case-studies.html'
    }, {
      l: 'Blog',
      href: 'blog.html'
    }]
  }, {
    h: 'Company',
    links: [{
      l: 'About',
      href: 'about.html'
    }, {
      l: 'Pricing',
      href: 'pricing.html'
    }, {
      l: 'Architecture',
      href: 'about.html#architecture'
    }, {
      l: 'Competitors',
      href: 'competitors.html'
    }, {
      l: 'Careers',
      href: 'hiring.html'
    }]
  }];
  const contact = [{
    kind: 'mail',
    l: 'hello@simplegrid.ai',
    href: 'mailto:hello@simplegrid.ai'
  }, {
    kind: 'linkedin',
    l: 'LinkedIn',
    href: 'https://www.linkedin.com/company/simplegridai',
    external: true
  }, {
    kind: 'calendar',
    l: 'Book a call',
    href: 'https://cal.com/simplegrid-ai',
    external: true
  }];
  return /*#__PURE__*/React.createElement("footer", {
    className: "footer",
    role: "contentinfo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-top"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: prefix + 'assets/simplegrid-logo-horizontal.svg',
    alt: "SimpleGrid - AI ERP for manufacturers logo",
    className: "footer-logo",
    width: "160",
    height: "32",
    loading: "lazy",
    decoding: "async"
  }), /*#__PURE__*/React.createElement("p", {
    className: "footer-tagline"
  }, "Custom ERP. Built at our risk. Paid for if it works."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--fg3)',
      marginBottom: 12
    }
  }, "Trusted partners"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.nvidia.com/en-us/startups/",
    target: "_blank",
    rel: "noopener noreferrer",
    title: "NVIDIA Inception Program member",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '8px 14px',
      borderRadius: 10,
      border: '1px solid var(--border)',
      background: '#fff',
      textDecoration: 'none',
      height: 56,
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: prefix + 'assets/nvidia-inception.png',
    alt: "NVIDIA Inception Program member badge",
    width: "120",
    height: "38",
    loading: "lazy",
    decoding: "async",
    style: {
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://aws.amazon.com/startups/",
    target: "_blank",
    rel: "noopener noreferrer",
    title: "AWS Startups partner",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 16px',
      borderRadius: 10,
      border: '1px solid var(--border)',
      background: '#fff',
      textDecoration: 'none',
      height: 56,
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "44",
    height: "26",
    viewBox: "0 0 304 182",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#252F3E",
    d: "M86.4 66.4c0 3.7.4 6.7 1.1 8.9.8 2.2 1.8 4.6 3.2 7.2.5.8.7 1.6.7 2.3 0 1-.6 2-1.9 3l-6.3 4.2c-.9.6-1.8.9-2.6.9-1 0-2-.5-3-1.4C76.2 90 75 88.4 74 86.8c-1-1.7-2-3.6-3.1-5.9-7.8 9.2-17.6 13.8-29.4 13.8-8.4 0-15.1-2.4-20-7.2-4.9-4.8-7.4-11.2-7.4-19.2 0-8.5 3-15.4 9.1-20.6 6.1-5.2 14.2-7.8 24.5-7.8 3.4 0 6.9.3 10.6.8 3.7.5 7.5 1.3 11.5 2.2v-7.3c0-7.6-1.6-12.9-4.7-16-3.2-3.1-8.6-4.6-16.3-4.6-3.5 0-7.1.4-10.8 1.3-3.7.9-7.3 2-10.8 3.4-1.6.7-2.8 1.1-3.5 1.3-.7.2-1.2.3-1.6.3-1.4 0-2.1-1-2.1-3.1v-4.9c0-1.6.2-2.8.7-3.5.5-.7 1.4-1.4 2.8-2.1 3.5-1.8 7.7-3.3 12.6-4.5C41 1.9 46.2 1.3 51.7 1.3c11.9 0 20.6 2.7 26.2 8.1 5.5 5.4 8.3 13.6 8.3 24.6v32.4h.2zM45.8 81.6c3.3 0 6.7-.6 10.3-1.8 3.6-1.2 6.8-3.4 9.5-6.4 1.6-1.9 2.8-4 3.4-6.4.6-2.4 1-5.3 1-8.7v-4.2c-2.9-.7-6-1.3-9.2-1.7-3.2-.4-6.3-.6-9.4-.6-6.7 0-11.6 1.3-14.9 4-3.3 2.7-4.9 6.5-4.9 11.5 0 4.7 1.2 8.2 3.7 10.6 2.4 2.5 5.9 3.7 10.5 3.7zm80.3 10.8c-1.8 0-3-.3-3.8-1-.8-.6-1.5-2-2.1-3.9L96.7 10.2c-.6-2-.9-3.3-.9-4 0-1.6.8-2.5 2.4-2.5h9.8c1.9 0 3.2.3 3.9 1 .8.6 1.4 2 2 3.9l16.8 66.2 15.6-66.2c.5-2 1.1-3.3 1.9-3.9.8-.6 2.2-1 4-1h8c1.9 0 3.2.3 4 1 .8.6 1.5 2 1.9 3.9l15.8 67 17.3-67c.6-2 1.3-3.3 2-3.9.8-.6 2.1-1 3.9-1h9.3c1.6 0 2.5.8 2.5 2.5 0 .5-.1 1-.2 1.6-.1.6-.3 1.4-.7 2.5l-24.1 77.3c-.6 2-1.3 3.3-2.1 3.9-.8.6-2.1 1-3.8 1h-8.6c-1.9 0-3.2-.3-4-1-.8-.7-1.5-2-1.9-4L156 23l-15.4 64.4c-.5 2-1.1 3.3-1.9 4-.8.7-2.2 1-4 1h-8.6zm128.5 2.7c-5.2 0-10.4-.6-15.4-1.8-5-1.2-8.9-2.5-11.5-4-1.6-.9-2.7-1.9-3.1-2.8-.4-.9-.6-1.9-.6-2.8v-5.1c0-2.1.8-3.1 2.3-3.1.6 0 1.2.1 1.8.3.6.2 1.5.6 2.5 1 3.4 1.5 7.1 2.7 11 3.5 4 .8 7.9 1.2 11.9 1.2 6.3 0 11.2-1.1 14.6-3.3 3.4-2.2 5.2-5.4 5.2-9.5 0-2.8-.9-5.1-2.7-7-1.8-1.9-5.2-3.6-10.1-5.2L246 52c-7.3-2.3-12.7-5.7-16-10.2-3.3-4.4-5-9.3-5-14.5 0-4.2.9-7.9 2.7-11.1 1.8-3.2 4.2-6 7.2-8.2 3-2.3 6.4-4 10.4-5.2 4-1.2 8.2-1.7 12.6-1.7 2.2 0 4.5.1 6.7.4 2.3.3 4.4.7 6.5 1.1 2 .5 3.9 1 5.7 1.6 1.8.6 3.2 1.2 4.2 1.8 1.4.8 2.4 1.6 3 2.5.6.8.9 1.9.9 3.3v4.7c0 2.1-.8 3.2-2.3 3.2-.8 0-2.1-.4-3.8-1.2-5.7-2.6-12.1-3.9-19.2-3.9-5.7 0-10.2.9-13.3 2.8-3.1 1.9-4.7 4.8-4.7 8.9 0 2.8 1 5.2 3 7.1 2 1.9 5.7 3.8 11 5.5l14.2 4.5c7.2 2.3 12.4 5.5 15.5 9.6 3.1 4.1 4.6 8.8 4.6 14 0 4.3-.9 8.2-2.6 11.6-1.8 3.4-4.2 6.4-7.3 8.8-3.1 2.5-6.8 4.3-11.1 5.6-4.5 1.4-9.2 2.1-14.3 2.1z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FF9900",
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M273.5 143.7c-32.9 24.3-80.7 37.2-121.8 37.2-57.6 0-109.5-21.3-148.7-56.7-3.1-2.8-.3-6.6 3.4-4.4 42.4 24.6 94.7 39.5 148.8 39.5 36.5 0 76.6-7.6 113.5-23.2 5.5-2.5 10.2 3.6 4.8 7.6z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FF9900",
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M287.2 128.1c-4.2-5.4-27.8-2.6-38.5-1.3-3.2.4-3.7-2.4-.8-4.5 18.8-13.2 49.7-9.4 53.3-5 3.6 4.5-1 35.4-18.6 50.2-2.7 2.3-5.3 1.1-4.1-1.9 4-9.9 12.9-32.2 8.7-37.5z"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 24,
      background: 'var(--border)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--fg1)',
      letterSpacing: '0.01em',
      lineHeight: 1.2
    }
  }, "Activate", /*#__PURE__*/React.createElement("br", null), "Startups"))))), /*#__PURE__*/React.createElement("div", {
    className: "footer-cols",
    style: {
      gridTemplateColumns: '1fr 1fr 1fr 1.5fr',
      gap: 20
    }
  }, cols.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.h
  }, c.hHref ? /*#__PURE__*/React.createElement("a", {
    className: "footer-h",
    href: px(c.hHref),
    style: { textDecoration: 'none', color: 'inherit', display: 'block' }
  }, c.h) : /*#__PURE__*/React.createElement("div", {
    className: "footer-h"
  }, c.h), c.links.map(x => /*#__PURE__*/React.createElement("a", {
    key: x.l,
    href: px(x.href),
    className: "footer-link"
  }, x.l)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "footer-h"
  }, "Get in touch"), contact.map(x => /*#__PURE__*/React.createElement("a", {
    key: x.l,
    href: x.href,
    target: x.external ? '_blank' : undefined,
    rel: x.external ? 'noopener noreferrer' : undefined,
    className: "footer-link",
    style: {
      display: 'flex',
      gap: 8,
      alignItems: x.isAddress ? 'flex-start' : 'center',
      whiteSpace: x.isAddress ? 'pre-line' : 'normal',
      lineHeight: x.isAddress ? 1.5 : undefined
    }
  }, /*#__PURE__*/React.createElement(FIcon, {
    kind: x.kind
  }), /*#__PURE__*/React.createElement("span", null, x.l)))))), /*#__PURE__*/React.createElement("div", {
    className: "footer-bottom"
  }, /*#__PURE__*/React.createElement("div", null, "\xA9 2026 Valaya AI Technologies"), /*#__PURE__*/React.createElement("div", {
    className: "footer-legal"
  }, /*#__PURE__*/React.createElement("a", {
    href: px('privacy.html')
  }, "Privacy Policy"), /*#__PURE__*/React.createElement("a", {
    href: px('terms.html')
  }, "Terms")))));
}
window.Footer = Footer;