function LoginModal({
  onClose,
  onSuccess,
  title = 'Log in to SimpleGrid',
  sub = 'Access your operations dashboard.',
  redirectUrl = null
}) {
  const [tab, setTab] = React.useState('email');
  const finish = () => {
    try {
      localStorage.setItem('sg_auth', '1');
    } catch {}
    if (redirectUrl) {
      window.location.href = redirectUrl;
      return;
    }
    if (onSuccess) onSuccess();else onClose();
  };
  const submit = e => {
    e.preventDefault();
    finish();
  };
  const googleLogin = () => {
    // Placeholder: in production this hits SimpleGrid's auth backend, which handles
    // Google OAuth and then redirects to the builder app.
    // window.location.href = 'https://app.simplegrid.ai/auth/google?next=/build';
    finish();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target === e.currentTarget) onClose();
    }
  }, /*#__PURE__*/React.createElement("form", {
    className: "modal",
    style: {
      position: 'relative'
    },
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "close-btn",
    "aria-label": "Close login dialog",
    onClick: onClose,
    style: {
      position: 'absolute',
      top: 16,
      right: 16,
      background: 'none',
      border: 'none',
      fontSize: 20,
      color: 'var(--fg3)',
      cursor: 'pointer'
    }
  }, "\xD7"), /*#__PURE__*/React.createElement("img", {
    src: "assets/simplegrid-logomark.svg",
    alt: "",
    "aria-hidden": "true",
    width: "28",
    height: "28",
    decoding: "async",
    style: {
      height: 28,
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("h2", null, title), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, sub), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: googleLogin,
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      padding: '12px 16px',
      background: '#fff',
      color: '#1f1f1f',
      border: '1px solid #dadce0',
      borderRadius: 'var(--radius-md)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      marginTop: 8,
      transition: 'box-shadow .15s, border-color .15s'
    },
    onMouseEnter: e => {
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
      e.currentTarget.style.borderColor = '#bdc1c6';
    },
    onMouseLeave: e => {
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.borderColor = '#dadce0';
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#4285F4",
    d: "M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#34A853",
    d: "M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FBBC05",
    d: "M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#EA4335",
    d: "M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58z"
  })), "Continue with Google"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      margin: '18px 0 14px',
      color: 'var(--fg3)',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--border)'
    }
  }), /*#__PURE__*/React.createElement("span", null, "or"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--border)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "tabs"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: 'tab' + (tab === 'email' ? ' active' : ''),
    onClick: () => setTab('email')
  }, "Email"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: 'tab' + (tab === 'mobile' ? ' active' : ''),
    onClick: () => setTab('mobile')
  }, "Mobile number")), tab === 'email' ? /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "login-email"
  }, "Email address"), /*#__PURE__*/React.createElement("input", {
    id: "login-email",
    type: "email",
    placeholder: "you@company.com",
    required: true
  })) : /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "login-mobile"
  }, "Mobile number"), /*#__PURE__*/React.createElement("input", {
    id: "login-mobile",
    type: "tel",
    placeholder: "+91 98765 43210",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "login-password"
  }, "Password"), /*#__PURE__*/React.createElement("input", {
    id: "login-password",
    type: "password",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    required: true
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      width: '100%',
      justifyContent: 'center',
      marginTop: 4
    }
  }, "Log in"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--fg3)',
      textAlign: 'center',
      marginTop: 14
    }
  }, "Don't have an account? ", /*#__PURE__*/React.createElement("a", {
    href: "https://cal.com/simplegrid-ai",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      color: 'var(--sg-blue)',
      border: 'none'
    }
  }, "Book a call"), " to get started.")));
}
window.LoginModal = LoginModal;