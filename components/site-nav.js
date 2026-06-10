/* ============================================================================
   SimpleGrid shared site navigation - SINGLE SOURCE OF TRUTH.

   Every page (static HTML + the React pages) renders its top nav from THIS
   file. To change a nav link, label, or order, edit it HERE once and it
   updates across the whole site. Do not hand-write <header class="nav"> into
   pages any more.

   How a page opts in:
     1. Put an empty placeholder where the nav should go (top of <body>):
          <div id="sg-nav" data-page="home"></div>
        data-page is one of: home | product | solutions | syncs | tools | cases | blog | competitors
        (omit / leave blank on pages that aren't in the nav, e.g. legal pages).
     2. Load this script with the correct relative path for the page's depth:
          <script src="components/site-nav.js" defer></script>        (root page)
          <script src="../../components/site-nav.js" defer></script>  (nested page)
        The link prefix is derived automatically from that src, so links work
        at any folder depth with no per-page editing.

   "Try our ERP" uses [data-sg-try-erp], handled by components/TryErpModal.js
   (already loaded site-wide). Styling comes from styles.css (.nav* classes),
   which every page already loads.
   ========================================================================== */
(function () {
  // --- find this script tag so we can derive the relative path prefix -------
  var me = document.currentScript;
  if (!me) {
    var all = document.getElementsByTagName('script');
    for (var i = all.length - 1; i >= 0; i--) {
      if (/(^|\/)components\/site-nav\.js(\?|$)/.test(all[i].getAttribute('src') || '')) {
        me = all[i];
        break;
      }
    }
  }
  var srcAttr = (me && me.getAttribute('src')) || 'components/site-nav.js';
  // everything before "components/site-nav.js" is the prefix ("", "../", "../../", ...)
  var prefix = srcAttr.replace(/components\/site-nav\.js.*$/, '');

  var mount = document.getElementById('sg-nav');
  if (!mount) return;
  var page = mount.getAttribute('data-page') || '';

  var p = function (href) { return prefix + href; };
  var on = function (key) { return page === key ? ' active' : ''; };
  var resourcesActive = (page === 'tools' || page === 'cases' || page === 'blog') ? ' active' : '';

  var chevron =
    '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">' +
    '<path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';

  // "Home" is a section-jump dropdown on EVERY page: hover (or focus) opens it,
  // and the chevron is always shown. On the home page the links scroll in-page;
  // on other pages they point at index.html#section so they navigate home + land.
  var homeSections = [
    ['why-erp', 'Why ERP keeps failing'],
    ['onboarding', 'Selective onboarding'],
    ['how-it-works', 'How it works'],
    ['case-studies', 'Case studies'],
    ['founder', 'Built by operators'],
    ['home-faq', 'FAQ']
  ];
  var homeHref = function (id) { return (page === 'home') ? ('#' + id) : (p('index.html') + '#' + id); };
  var homeMenuLinks = homeSections.map(function (s) {
    return '<a href="' + homeHref(s[0]) + '">' + s[1] + '</a>';
  }).join('');
  var homeNavDesktop =
    '<div class="nav-home">' +
      '<a href="' + p('index.html') + '" class="nav-link' + on('home') + ' nav-home-trigger" aria-haspopup="true">Home ' + chevron + '</a>' +
      '<div class="nav-home-menu" role="menu">' + homeMenuLinks + '</div>' +
    '</div>';
  var homeMobileSub = homeSections.map(function (s) {
    return '<a href="' + homeHref(s[0]) + '" class="nav-mobile-link nav-mobile-sub">' + s[1] + '</a>';
  }).join('');

  // "Product" is also a section-jump dropdown: hover/focus opens it and the
  // trigger still links to product.html. On the product page the links scroll
  // in-page; elsewhere they point at product.html#section so they navigate +
  // land. Section ids live in the product page components (app/product.js).
  var productSections = [
    ['hank', 'Built around your factory'],
    ['integrations', 'Integrations'],
    ['security', 'Data security'],
    ['ledger', 'Activity ledger'],
    ['ability', 'Easy adoption'],
    ['rules', 'Custom rules']
  ];
  var productHref = function (id) { return (page === 'product') ? ('#' + id) : (p('product.html') + '#' + id); };
  var productMenuLinks = productSections.map(function (s) {
    return '<a href="' + productHref(s[0]) + '">' + s[1] + '</a>';
  }).join('');
  var productNavDesktop =
    '<div class="nav-product">' +
      '<a href="' + p('product.html') + '" class="nav-link' + on('product') + ' nav-product-trigger" aria-haspopup="true">Product ' + chevron + '</a>' +
      '<div class="nav-product-menu" role="menu">' + productMenuLinks + '</div>' +
    '</div>';
  var productMobileSub = productSections.map(function (s) {
    return '<a href="' + productHref(s[0]) + '" class="nav-mobile-link nav-mobile-sub">' + s[1] + '</a>';
  }).join('');

  // "Solutions" is a section-jump dropdown over the solutions.html page
  // (organised by operational pain point). Same hover/focus behaviour as
  // Product; section ids live in solutions.html.
  var solutionsSections = [
    ['visibility', 'Real-time floor visibility'],
    ['planning', 'Production planning & scheduling'],
    ['connected', 'One connected system'],
    ['costing', 'Costing & margins'],
    ['adoption', 'Built for your floor staff'],
    ['evolve', 'Built for you, evolves with you']
  ];
  var solutionsHref = function (id) { return (page === 'solutions') ? ('#' + id) : (p('solutions.html') + '#' + id); };
  var solutionsMenuLinks = solutionsSections.map(function (s) {
    return '<a href="' + solutionsHref(s[0]) + '">' + s[1] + '</a>';
  }).join('');
  var solutionsNavDesktop =
    '<div class="nav-solutions">' +
      '<a href="' + p('solutions.html') + '" class="nav-link' + on('solutions') + ' nav-solutions-trigger" aria-haspopup="true">Solutions ' + chevron + '</a>' +
      '<div class="nav-solutions-menu" role="menu">' + solutionsMenuLinks + '</div>' +
    '</div>';
  var solutionsMobileSub = solutionsSections.map(function (s) {
    return '<a href="' + solutionsHref(s[0]) + '" class="nav-mobile-link nav-mobile-sub">' + s[1] + '</a>';
  }).join('');

  // "Syncs" is a section-jump dropdown over the placeholder syncs.html page
  // (what SimpleGrid connects to). Categories mirror the homepage "Integrates
  // with" strip; section ids live in syncs.html.
  var syncsSections = [
    ['accounting', 'Accounting & books'],
    ['spreadsheets', 'Spreadsheets'],
    ['commerce', 'Sales & e-commerce'],
    ['messaging', 'Messaging & marketing'],
    ['shipping', 'Shipping & logistics'],
    ['data', 'Data & files']
  ];
  var syncsHref = function (id) { return (page === 'syncs') ? ('#' + id) : (p('syncs.html') + '#' + id); };
  var syncsMenuLinks = syncsSections.map(function (s) {
    return '<a href="' + syncsHref(s[0]) + '">' + s[1] + '</a>';
  }).join('');
  var syncsNavDesktop =
    '<div class="nav-syncs">' +
      '<a href="' + p('syncs.html') + '" class="nav-link' + on('syncs') + ' nav-syncs-trigger" aria-haspopup="true">Syncs ' + chevron + '</a>' +
      '<div class="nav-syncs-menu" role="menu">' + syncsMenuLinks + '</div>' +
    '</div>';
  var syncsMobileSub = syncsSections.map(function (s) {
    return '<a href="' + syncsHref(s[0]) + '" class="nav-mobile-link nav-mobile-sub">' + s[1] + '</a>';
  }).join('');

  mount.outerHTML =
    '<a href="#main" class="skip-link">Skip to main content</a>' +
    '<header class="nav" role="banner">' +
      '<div class="nav-inner">' +
        '<a class="nav-logo" href="' + p('index.html') + '" aria-label="SimpleGrid home" ' +
          'title="SimpleGrid - Custom ERP for manufacturers, built at our risk">' +
          '<img src="' + p('assets/simplegrid-logo-horizontal.svg') + '" ' +
            'alt="SimpleGrid - Custom ERP for manufacturers logo" width="160" height="32" ' +
            'fetchpriority="high" decoding="async"></a>' +
        '<nav class="nav-links" aria-label="Main navigation">' +
          homeNavDesktop +
          productNavDesktop +
          solutionsNavDesktop +
          syncsNavDesktop +
          '<a href="' + p('pricing.html') + '" class="nav-link' + on('pricing') + '">Pricing</a>' +
          '<div class="nav-resources">' +
            '<button type="button" class="nav-link' + resourcesActive + ' nav-resources-trigger" aria-haspopup="true">Resources ' + chevron + '</button>' +
            '<div class="nav-resources-menu">' +
              '<a href="' + p('tools/') + '">Productive Tools <span>35 productive tools &amp; calculators for manufacturers.</span></a>' +
              '<a href="' + p('case-studies.html') + '">Case studies <span>Real deployments. Real numbers.</span></a>' +
              '<a href="' + p('blog.html') + '">Blog <span>Field notes on ERP and ops.</span></a>' +
            '</div>' +
          '</div>' +
        '</nav>' +
        '<div class="nav-right">' +
          '<button type="button" class="btn btn-sm btn-primary" data-sg-try-erp title="Try a live SimpleGrid ERP">See It</button>' +
          '<button type="button" class="nav-burger" aria-label="Open menu" aria-expanded="false" data-sg-burger>' +
            '<span></span><span></span><span></span></button>' +
        '</div>' +
      '</div>' +
    '</header>' +
    '<div class="nav-mobile" data-sg-mobile-menu hidden>' +
      '<nav class="nav-mobile-panel" aria-label="Mobile navigation">' +
        '<a href="' + p('index.html') + '" class="nav-mobile-link' + on('home') + '">Home</a>' +
        homeMobileSub +
        '<a href="' + p('product.html') + '" class="nav-mobile-link' + on('product') + '">Product</a>' +
        productMobileSub +
        '<a href="' + p('solutions.html') + '" class="nav-mobile-link' + on('solutions') + '">Solutions</a>' +
        solutionsMobileSub +
        '<a href="' + p('syncs.html') + '" class="nav-mobile-link' + on('syncs') + '">Syncs</a>' +
        syncsMobileSub +
        '<a href="' + p('pricing.html') + '" class="nav-mobile-link' + on('pricing') + '">Pricing</a>' +
        '<div class="nav-mobile-section">Resources</div>' +
        '<a href="' + p('tools/') + '" class="nav-mobile-link nav-mobile-sub' + on('tools') + '">Productive Tools</a>' +
        '<a href="' + p('case-studies.html') + '" class="nav-mobile-link nav-mobile-sub' + on('cases') + '">Case studies</a>' +
        '<a href="' + p('blog.html') + '" class="nav-mobile-link nav-mobile-sub' + on('blog') + '">Blog</a>' +
        '<div class="nav-mobile-sep"></div>' +
        '<a href="#" data-sg-try-erp role="button" class="nav-mobile-link">See It</a>' +
      '</nav>' +
    '</div>';

  // --- mobile hamburger toggle (same behaviour as the old inline script) ----
  var burger = document.querySelector('[data-sg-burger]');
  var menu = document.querySelector('[data-sg-mobile-menu]');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = burger.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open);
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (open) menu.removeAttribute('hidden'); else menu.setAttribute('hidden', '');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.addEventListener('click', function (e) { if (e.target === menu) burger.click(); });
    // Tapping a section-jump link should close the menu so the section is visible.
    var jumpLinks = menu.querySelectorAll('a[href^="#"]');
    for (var jl = 0; jl < jumpLinks.length; jl++) {
      jumpLinks[jl].addEventListener('click', function () {
        if (burger.classList.contains('is-open')) burger.click();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.classList.contains('is-open')) burger.click();
    });
  }
})();
