/*
 * blog-post-chrome.js — shared "real blog" chrome for every post page.
 *
 * Each post sets window.__SG_BLOG_ID__ (and __SG_BLOG_ASSET_PREFIX__). This
 * script then renders, from one source of truth:
 *   1. a category pill + author byline (SimpleGrid Team + date + read time)
 *   2. a share rail (LinkedIn / X / copy link)
 *   3. "Keep reading" — related posts + previous/next
 *   4. a reading progress bar
 *
 * The article body, title and a plain date/category line are already in the
 * static HTML, so if this script never loads the post still reads fine.
 *
 * POSTS mirrors data/blogs.js — keep them in sync if posts are added.
 */
(function () {
  var ID = window.__SG_BLOG_ID__;
  if (!ID) return;
  var PREFIX = window.__SG_BLOG_ASSET_PREFIX__ || "";

  var POSTS = [
    { id: 1,  cat: "Product Deep-Dive",                      readTime: "6 min", slug: "event-sourcing-why-simplegrid-stores-everything-that-ever-happened",            date: "2026-03-25", title: "Event Sourcing: Why SimpleGrid Stores Every Action Forever" },
    { id: 2,  cat: "Product Deep-Dive",                      readTime: "6 min", slug: "sg-schema-why-your-erp-should-speak-your-language",                            date: "2026-03-29", title: "SG Schema: Why Your ERP Should Speak Your Language" },
    { id: 3,  cat: "Product Deep-Dive",                      readTime: "6 min", slug: "entity-roots-the-building-blocks-of-an-sg-schema-erp",                          date: "2026-04-01", title: "Entity Roots: Building Blocks of an SG Schema ERP" },
    { id: 4,  cat: "Product Deep-Dive",                      readTime: "5 min", slug: "multi-tenant-architecture-how-simplegrid-runs-100-clients-on-one-platform",     date: "2026-04-05", title: "Multi-Tenant Architecture: 100 Clients, One Platform" },
    { id: 5,  cat: "Product Deep-Dive",                      readTime: "5 min", slug: "how-simplegrid-makes-erp-customization-take-minutes-not-months",                date: "2026-04-08", title: "ERP Customization in Minutes, Not Months" },
    { id: 6,  cat: "Product Deep-Dive",  readTime: "6 min", slug: "module-based-erp-vs-sg-schema-erp-two-architectures-two-outcomes",              date: "2026-04-12", title: "Module-Based ERP vs. SG Schema ERP" },
    { id: 7,  cat: "Build in Public",                        readTime: "6 min", slug: "how-we-built-an-erp-chatbot-with-claude-no-rag-and-full-context",               date: "2026-04-15", title: "Building an ERP Chatbot With Claude, No RAG" },
    { id: 8,  cat: "Operator Insights",            readTime: "5 min", slug: "why-conversational-ux-does-not-change-user-behavior-and-why-that-is-the-point", date: "2026-04-19", title: "Why Conversational UX Does Not Change Behavior" },
    { id: 9,  cat: "Operator Insights",                      readTime: "6 min", slug: "how-to-calculate-true-landed-cost-per-sku-and-why-most-manufacturers-cannot",   date: "2026-04-22", title: "True Landed Cost Per SKU (And Why Most Cannot)" },
    { id: 10, cat: "Culture",                                readTime: "5 min", slug: "inside-simplegrid-every-factory-floor-is-different-that-is-the-whole-point",    date: "2026-04-26", title: "Inside SimpleGrid: Every Factory Is Different" },
    { id: 11, cat: "Industry Critique",                      readTime: "5 min", slug: "why-mid-market-manufacturers-are-the-most-underserved-businesses-in-enterprise-software", date: "2026-04-29", title: "Why Mid-Market Manufacturers Are Underserved" },
    { id: 12, cat: "Operator Insights",                      readTime: "5 min", slug: "the-real-cost-of-running-your-factory-on-spreadsheets",                         date: "2026-05-03", title: "The Real Cost of Running Your Factory on Spreadsheets" },
    { id: 13, cat: "Industry Critique",                      readTime: "5 min", slug: "why-your-erp-vendor-charges-you-for-every-change-and-how-to-stop-paying",       date: "2026-05-06", title: "Why Your ERP Vendor Charges You for Every Change" },
    { id: 14, cat: "Industry Critique",            readTime: "5 min", slug: "how-ai-changed-erp-deployment-not-features-deployment",                        date: "2026-05-10", title: "How AI Changed ERP Deployment (Not Features)" },
    { id: 15, cat: "Operator Insights",                      readTime: "5 min", slug: "what-happens-when-your-erp-cannot-keep-up-with-your-business",                  date: "2026-05-13", title: "When Your ERP Cannot Keep Up With Your Business" },
    { id: 16, cat: "Operator Insights",                      readTime: "4 min", slug: "why-your-warehouse-manager-should-be-your-erp-s-first-user",                    date: "2026-05-17", title: "Your Warehouse Manager Should Be Your ERP's First User" },
    { id: 17, cat: "Industry Critique",                      readTime: "5 min", slug: "the-myth-of-erp-best-practices-your-operation-is-not-generic",                  date: "2026-05-22", title: "The Myth of ERP Best Practices" },
    { id: 18, cat: "Industry Critique",            readTime: "6 min", slug: "dynamics-gp-sunset-switch-to-simplegrid",                                      date: "2026-05-26", title: "Dynamics GP Sunset: Switch to SimpleGrid" }
  ];

  var byId = {};
  POSTS.forEach(function (p) { byId[p.id] = p; });
  var post = byId[ID];
  if (!post) return;

  var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  function fmtDate(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    if (!m) return iso || "";
    return MONTHS[parseInt(m[2], 10) - 1] + " " + parseInt(m[3], 10) + ", " + m[1];
  }

  // SimpleGrid logomark (grid icon) — inherits currentColor for the avatar.
  var LOGOMARK =
    '<svg viewBox="0 0 42 42" width="22" height="22" aria-hidden="true" focusable="false">' +
    '<rect x="3" y="3" width="36" height="36" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="2.5"></rect>' +
    '<line x1="15" y1="5" x2="15" y2="37" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>' +
    '<line x1="27" y1="5" x2="27" y2="37" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>' +
    '<line x1="5" y1="15" x2="37" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>' +
    '<line x1="5" y1="27" x2="37" y2="27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>' +
    '</svg>';

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  /* ---- 1. Category pill + author byline in the header --------------------- */
  var headerWrap = document.querySelector(".post-header .container-sm");
  if (headerWrap) {
    var h1 = headerWrap.querySelector("h1");
    if (h1) {
      h1.insertAdjacentElement(
        "beforebegin",
        el('<span class="post-cat-pill">' + esc(post.cat) + "</span>")
      );
    }
    var meta = headerWrap.querySelector(".post-meta");
    var byline = el(
      '<div class="post-byline">' +
        '<span class="post-byline-avatar" aria-hidden="true">' + LOGOMARK + "</span>" +
        '<span class="post-byline-text">' +
          '<span class="post-byline-name">SimpleGrid Team</span>' +
          '<span class="post-byline-meta">' +
            '<time datetime="' + esc(post.date) + '">' + fmtDate(post.date) + "</time>" +
            '<span class="post-byline-dot">&middot;</span>' +
            "<span>" + esc(post.readTime) + " read</span>" +
          "</span>" +
        "</span>" +
      "</div>"
    );
    if (meta) { meta.replaceWith(byline); } else { headerWrap.appendChild(byline); }
  }

  /* ---- 2. Share rail (sticky beside the article on desktop) --------------- */
  var canonical = document.querySelector('link[rel="canonical"]');
  var shareUrl = (canonical && canonical.href) || window.location.href;
  var enc = encodeURIComponent(shareUrl);
  var encTitle = encodeURIComponent(post.title);
  var IC_LINKEDIN = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zm6 0h3.84v1.64h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-5.5c0-1.31-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H9z"/></svg>';
  var IC_X = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.84L1.24 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.01 4.13H5.05z"/></svg>';
  var IC_LINK = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 1 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
  var IC_CHECK = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

  var contentWrap = document.querySelector(".post-content .container-sm");
  if (contentWrap) {
    var share = el(
      '<div class="post-share">' +
        '<div class="post-share-inner">' +
          '<span class="post-share-label">Share</span>' +
          '<a class="post-share-btn" href="https://www.linkedin.com/sharing/share-offsite/?url=' + enc + '" target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">' + IC_LINKEDIN + "</a>" +
          '<a class="post-share-btn" href="https://twitter.com/intent/tweet?url=' + enc + "&text=" + encTitle + '" target="_blank" rel="noopener noreferrer" aria-label="Share on X">' + IC_X + "</a>" +
          '<button class="post-share-btn" type="button" data-copy aria-label="Copy link">' + IC_LINK + "</button>" +
        "</div>" +
      "</div>"
    );
    contentWrap.insertBefore(share, contentWrap.firstChild);
    var copyBtn = share.querySelector("[data-copy]");
    copyBtn.addEventListener("click", function () {
      function done() {
        copyBtn.classList.add("is-copied");
        copyBtn.innerHTML = IC_CHECK;
        window.setTimeout(function () { copyBtn.classList.remove("is-copied"); copyBtn.innerHTML = IC_LINK; }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).then(done, done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = shareUrl; ta.setAttribute("readonly", ""); ta.style.position = "absolute"; ta.style.left = "-9999px";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        ta.remove(); done();
      }
    });
  }

  /* ---- 3. Keep reading: related posts + previous/next --------------------- */
  // Previous/next = chronological neighbours (older = previous, newer = next).
  var byDateAsc = POSTS.slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
  var idx = -1;
  byDateAsc.forEach(function (p, i) { if (p.id === ID) idx = i; });
  var prev = idx > 0 ? byDateAsc[idx - 1] : null;
  var next = idx > -1 && idx < byDateAsc.length - 1 ? byDateAsc[idx + 1] : null;

  var navIds = {};
  if (prev) navIds[prev.id] = 1;
  if (next) navIds[next.id] = 1;
  function byDateDesc(a, b) { return a.date < b.date ? 1 : -1; }
  var pool = POSTS.filter(function (p) { return p.id !== ID && !navIds[p.id]; });
  var sameCat = pool.filter(function (p) { return p.cat === post.cat; }).sort(byDateDesc);
  var others = pool.filter(function (p) { return p.cat !== post.cat; }).sort(byDateDesc);
  var related = sameCat.concat(others).slice(0, 3);

  function relatedCard(p) {
    return (
      '<a class="post-related-card" href="' + PREFIX + "blog/" + p.slug + '/">' +
        '<span class="post-related-cat">' + esc(p.cat) + "</span>" +
        '<span class="post-related-title">' + esc(p.title) + "</span>" +
        '<span class="post-related-read">' + esc(p.readTime) + " read</span>" +
      "</a>"
    );
  }
  function pnCard(p, kind) {
    return (
      '<a class="post-pn post-pn-' + kind + '" href="' + PREFIX + "blog/" + p.slug + '/">' +
        '<span class="post-pn-label">' + (kind === "prev" ? "&larr; Previous" : "Next &rarr;") + "</span>" +
        '<span class="post-pn-title">' + esc(p.title) + "</span>" +
      "</a>"
    );
  }

  var endSection = el(
    '<section class="post-end">' +
      '<div class="container-sm">' +
        '<div class="post-related-head-row">' +
          '<h2 class="post-related-head">Keep reading</h2>' +
          '<a class="post-related-all" href="' + PREFIX + 'blog.html">All field notes &rarr;</a>' +
        "</div>" +
        '<div class="post-related-grid">' + related.map(relatedCard).join("") + "</div>" +
        '<div class="post-nav">' + (prev ? pnCard(prev, "prev") : "") + (next ? pnCard(next, "next") : "") + "</div>" +
      "</div>" +
    "</section>"
  );

  var cta = document.querySelector(".final-cta-band");
  if (cta) {
    cta.insertAdjacentElement("beforebegin", endSection);
  } else {
    var main = document.querySelector("#main") || document.body;
    main.appendChild(endSection);
  }

  // The static prev/next pager is superseded by the richer related grid.
  var pager = document.querySelector(".post-pager");
  if (pager) pager.remove();

  /* ---- 4. Reading progress bar (shared by every post) --------------------- */
  var progress = el('<div class="post-progress" aria-hidden="true"><span class="post-progress-bar"></span></div>');
  document.body.appendChild(progress);
  var bar = progress.firstElementChild;
  var ticking = false;
  function updateProgress() {
    ticking = false;
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    var pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    bar.style.width = Math.max(0, Math.min(100, pct)) + "%";
  }
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateProgress);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  // Recompute once the lazy-loaded infographics have grown the page.
  window.addEventListener("load", updateProgress);
  updateProgress();
})();
