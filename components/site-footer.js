/* ============================================================================
   SimpleGrid shared site FOOTER - SINGLE SOURCE OF TRUTH.

   Every page renders its footer from THIS file. To change a footer link,
   column, or the legal row, edit it HERE once and it updates site-wide.
   Do not hand-write <footer class="footer"> into pages any more.

   How a page opts in:
     1. Put an empty placeholder where the footer should go (end of <body>):
          <div id="sg-footer"></div>
     2. Load this script with the correct relative path for the page's depth:
          <script src="components/site-footer.js" defer></script>        (root)
          <script src="../../components/site-footer.js" defer></script>  (nested)
        The link prefix is derived automatically from that src, so links work
        at any folder depth with no per-page editing.

   Styling comes from styles.css (.footer* classes), which every page loads.
   Content mirrors the canonical React footer (components/Footer.js).
   ========================================================================== */
(function () {
  var me = document.currentScript;
  if (!me) {
    var all = document.getElementsByTagName('script');
    for (var i = all.length - 1; i >= 0; i--) {
      if (/(^|\/)components\/site-footer\.js(\?|$)/.test(all[i].getAttribute('src') || '')) {
        me = all[i];
        break;
      }
    }
  }
  var srcAttr = (me && me.getAttribute('src')) || 'components/site-footer.js';
  var pf = srcAttr.replace(/components\/site-footer\.js.*$/, ''); // "", "../", "../../", ...

  var mount = document.getElementById('sg-footer');
  if (!mount) return;

  // Trusted-partner badges (NVIDIA Inception + AWS Startups).
  var awsSvg =
    '<svg width="44" height="26" viewBox="0 0 304 182" aria-hidden="true">' +
    '<path fill="#252F3E" d="M86.4 66.4c0 3.7.4 6.7 1.1 8.9.8 2.2 1.8 4.6 3.2 7.2.5.8.7 1.6.7 2.3 0 1-.6 2-1.9 3l-6.3 4.2c-.9.6-1.8.9-2.6.9-1 0-2-.5-3-1.4C76.2 90 75 88.4 74 86.8c-1-1.7-2-3.6-3.1-5.9-7.8 9.2-17.6 13.8-29.4 13.8-8.4 0-15.1-2.4-20-7.2-4.9-4.8-7.4-11.2-7.4-19.2 0-8.5 3-15.4 9.1-20.6 6.1-5.2 14.2-7.8 24.5-7.8 3.4 0 6.9.3 10.6.8 3.7.5 7.5 1.3 11.5 2.2v-7.3c0-7.6-1.6-12.9-4.7-16-3.2-3.1-8.6-4.6-16.3-4.6-3.5 0-7.1.4-10.8 1.3-3.7.9-7.3 2-10.8 3.4-1.6.7-2.8 1.1-3.5 1.3-.7.2-1.2.3-1.6.3-1.4 0-2.1-1-2.1-3.1v-4.9c0-1.6.2-2.8.7-3.5.5-.7 1.4-1.4 2.8-2.1 3.5-1.8 7.7-3.3 12.6-4.5C41 1.9 46.2 1.3 51.7 1.3c11.9 0 20.6 2.7 26.2 8.1 5.5 5.4 8.3 13.6 8.3 24.6v32.4h.2zM45.8 81.6c3.3 0 6.7-.6 10.3-1.8 3.6-1.2 6.8-3.4 9.5-6.4 1.6-1.9 2.8-4 3.4-6.4.6-2.4 1-5.3 1-8.7v-4.2c-2.9-.7-6-1.3-9.2-1.7-3.2-.4-6.3-.6-9.4-.6-6.7 0-11.6 1.3-14.9 4-3.3 2.7-4.9 6.5-4.9 11.5 0 4.7 1.2 8.2 3.7 10.6 2.4 2.5 5.9 3.7 10.5 3.7zm80.3 10.8c-1.8 0-3-.3-3.8-1-.8-.6-1.5-2-2.1-3.9L96.7 10.2c-.6-2-.9-3.3-.9-4 0-1.6.8-2.5 2.4-2.5h9.8c1.9 0 3.2.3 3.9 1 .8.6 1.4 2 2 3.9l16.8 66.2 15.6-66.2c.5-2 1.1-3.3 1.9-3.9.8-.6 2.2-1 4-1h8c1.9 0 3.2.3 4 1 .8.6 1.5 2 1.9 3.9l15.8 67 17.3-67c.6-2 1.3-3.3 2-3.9.8-.6 2.1-1 3.9-1h9.3c1.6 0 2.5.8 2.5 2.5 0 .5-.1 1-.2 1.6-.1.6-.3 1.4-.7 2.5l-24.1 77.3c-.6 2-1.3 3.3-2.1 3.9-.8.6-2.1 1-3.8 1h-8.6c-1.9 0-3.2-.3-4-1-.8-.7-1.5-2-1.9-4L156 23l-15.4 64.4c-.5 2-1.1 3.3-1.9 4-.8.7-2.2 1-4 1h-8.6zm128.5 2.7c-5.2 0-10.4-.6-15.4-1.8-5-1.2-8.9-2.5-11.5-4-1.6-.9-2.7-1.9-3.1-2.8-.4-.9-.6-1.9-.6-2.8v-5.1c0-2.1.8-3.1 2.3-3.1.6 0 1.2.1 1.8.3.6.2 1.5.6 2.5 1 3.4 1.5 7.1 2.7 11 3.5 4 .8 7.9 1.2 11.9 1.2 6.3 0 11.2-1.1 14.6-3.3 3.4-2.2 5.2-5.4 5.2-9.5 0-2.8-.9-5.1-2.7-7-1.8-1.9-5.2-3.6-10.1-5.2L246 52c-7.3-2.3-12.7-5.7-16-10.2-3.3-4.4-5-9.3-5-14.5 0-4.2.9-7.9 2.7-11.1 1.8-3.2 4.2-6 7.2-8.2 3-2.3 6.4-4 10.4-5.2 4-1.2 8.2-1.7 12.6-1.7 2.2 0 4.5.1 6.7.4 2.3.3 4.4.7 6.5 1.1 2 .5 3.9 1 5.7 1.6 1.8.6 3.2 1.2 4.2 1.8 1.4.8 2.4 1.6 3 2.5.6.8.9 1.9.9 3.3v4.7c0 2.1-.8 3.2-2.3 3.2-.8 0-2.1-.4-3.8-1.2-5.7-2.6-12.1-3.9-19.2-3.9-5.7 0-10.2.9-13.3 2.8-3.1 1.9-4.7 4.8-4.7 8.9 0 2.8 1 5.2 3 7.1 2 1.9 5.7 3.8 11 5.5l14.2 4.5c7.2 2.3 12.4 5.5 15.5 9.6 3.1 4.1 4.6 8.8 4.6 14 0 4.3-.9 8.2-2.6 11.6-1.8 3.4-4.2 6.4-7.3 8.8-3.1 2.5-6.8 4.3-11.1 5.6-4.5 1.4-9.2 2.1-14.3 2.1z"/>' +
    '<path fill="#FF9900" fill-rule="evenodd" clip-rule="evenodd" d="M273.5 143.7c-32.9 24.3-80.7 37.2-121.8 37.2-57.6 0-109.5-21.3-148.7-56.7-3.1-2.8-.3-6.6 3.4-4.4 42.4 24.6 94.7 39.5 148.8 39.5 36.5 0 76.6-7.6 113.5-23.2 5.5-2.5 10.2 3.6 4.8 7.6z"/>' +
    '<path fill="#FF9900" fill-rule="evenodd" clip-rule="evenodd" d="M287.2 128.1c-4.2-5.4-27.8-2.6-38.5-1.3-3.2.4-3.7-2.4-.8-4.5 18.8-13.2 49.7-9.4 53.3-5 3.6 4.5-1 35.4-18.6 50.2-2.7 2.3-5.3 1.1-4.1-1.9 4-9.9 12.9-32.2 8.7-37.5z"/></svg>';
  var mailSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:2px" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';
  var liSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" style="flex-shrink:0;margin-top:2px" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.04h4.56V23H.22V8.04zm7.42 0h4.37v2.05h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V23h-4.56v-6.62c0-1.58-.03-3.61-2.2-3.61-2.2 0-2.54 1.72-2.54 3.5V23H7.64V8.04z"/></svg>';
  var calSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:2px" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';
  var pinSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:2px" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';

  mount.outerHTML =
    '<footer class="footer" role="contentinfo">' +
      '<div class="container">' +
        '<div class="footer-top">' +
          '<div>' +
            '<img src="' + pf + 'assets/simplegrid-logo-horizontal.svg" alt="SimpleGrid - AI ERP for manufacturers logo" class="footer-logo" width="160" height="32" loading="lazy" decoding="async">' +
            '<p class="footer-tagline">Custom ERP. Built at our risk. Paid for if it works.</p>' +
            '<div style="margin-top:28px">' +
              '<div style="font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:var(--fg3);margin-bottom:12px">Trusted partners</div>' +
              '<div style="display:flex;gap:14px;flex-wrap:wrap;align-items:center">' +
                '<a href="https://www.nvidia.com/en-us/startups/" target="_blank" rel="noopener noreferrer" title="NVIDIA Inception Program member" style="display:inline-flex;align-items:center;padding:8px 14px;border-radius:10px;border:1px solid var(--border);background:#fff;text-decoration:none;height:56px;box-sizing:border-box"><img src="' + pf + 'assets/nvidia-inception.png" alt="NVIDIA Inception Program member badge" width="88" height="38" loading="lazy" decoding="async" style="display:block;height:38px;width:auto;object-fit:contain"></a>' +
                '<a href="https://aws.amazon.com/startups/" target="_blank" rel="noopener noreferrer" title="AWS Startups partner" style="display:inline-flex;align-items:center;gap:10px;padding:8px 16px;border-radius:10px;border:1px solid var(--border);background:#fff;text-decoration:none;height:56px;box-sizing:border-box">' + awsSvg + '<span style="width:1px;height:24px;background:var(--border)"></span><span style="font-size:12px;font-weight:600;color:var(--fg1);letter-spacing:0.01em;line-height:1.2">Activate<br>Startups</span></a>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="footer-cols" style="grid-template-columns:1fr 1fr 1.5fr;gap:24px">' +
            '<div>' +
              '<div class="footer-h">Resources</div>' +
              '<a href="' + pf + 'tools/" class="footer-link">Productive Tools</a>' +
              '<a href="' + pf + 'case-studies.html" class="footer-link">Case studies</a>' +
              '<a href="' + pf + 'blog.html" class="footer-link">Blog</a>' +
            '</div>' +
            '<div>' +
              '<div class="footer-h">Company</div>' +
              '<a href="' + pf + 'about.html" class="footer-link">About</a>' +
              '<a href="' + pf + 'pricing.html" class="footer-link">Pricing</a>' +
              '<a href="' + pf + 'about.html#architecture" class="footer-link">Architecture</a>' +
              '<a href="' + pf + 'competitors.html" class="footer-link">Competitors</a>' +
              '<a href="' + pf + 'hiring.html" class="footer-link">Careers</a>' +
            '</div>' +
            '<div>' +
              '<div class="footer-h">Get in touch</div>' +
              '<a href="mailto:hello@simplegrid.ai" class="footer-link" style="display:flex;gap:8px;align-items:center">' + mailSvg + '<span>hello@simplegrid.ai</span></a>' +
              '<a href="https://www.linkedin.com/company/simplegridai" target="_blank" rel="noopener noreferrer" class="footer-link" style="display:flex;gap:8px;align-items:center">' + liSvg + '<span>LinkedIn</span></a>' +
              '<a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener noreferrer" class="footer-link" style="display:flex;gap:8px;align-items:center">' + calSvg + '<span>Book a call</span></a>' +
              '<address class="footer-link" style="display:flex;gap:8px;align-items:flex-start;font-style:normal;margin-top:6px">' + pinSvg + '<span style="line-height:1.5">2810 N Church St STE 88778<br>Wilmington, DE 19802</span></address>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<div>SimpleGrid, an AI-native ERP for US manufacturers, by SimpleGrid Inc &copy; 2026</div>' +
          '<div class="footer-legal">' +
            '<a href="' + pf + 'privacy.html">Privacy Policy</a><a href="' + pf + 'terms.html">Terms</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</footer>' +
    '<section class="footer-wordmark">' +
      '<svg class="footer-wordmark-svg" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid meet" role="img" aria-label="SimpleGrid">' +
        '<g class="wm-mark" transform="translate(5,12.5) scale(4.1667)" fill="none" aria-hidden="true">' +
          '<rect x="3" y="3" width="36" height="36" rx="5" ry="5" stroke="currentColor" stroke-width="2.5"></rect>' +
          '<line x1="15" y1="5" x2="15" y2="37" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>' +
          '<line x1="27" y1="5" x2="27" y2="37" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>' +
          '<line x1="5" y1="15" x2="37" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>' +
          '<line x1="5" y1="27" x2="37" y2="27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>' +
        '</g>' +
        '<text x="210" y="153" textLength="790" lengthAdjust="spacingAndGlyphs">SimpleGrid</text>' +
      '</svg>' +
      '<a class="footer-wordmark-cta" href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener noreferrer" data-cta="wordmark_book_demo">' +
        '<span>Book a demo</span>' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M7 7h10v10"/></svg>' +
      '</a>' +
    '</section>';
})();
