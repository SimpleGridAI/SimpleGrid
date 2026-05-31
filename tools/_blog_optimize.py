#!/usr/bin/env python3
"""One-shot blog post optimizer.

Reads every /blog/{slug}/index.html that is a real article (skips redirect
stubs), and rewrites it to:
  - inline a static Nav + Footer (so no React is needed for chrome)
  - lazy-load React + PostInfographics only when the user scrolls near a
    `#root-infographic-*` mount div
  - swap blog <img> tags for <picture> with a WebP source
  - drop the per-page React/Nav/LoginModal/Footer/blog-post.js script tags

Re-runnable: looks for sentinel `<!-- sg-static-chrome -->` to detect already-
processed files.
"""
import os, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
BLOG = ROOT / 'blog'
SENTINEL = '<!-- sg-static-chrome -->'

NAV_HTML = '''<!-- sg-static-chrome -->
<!-- Top navigation rendered by the shared component (components/site-nav.js). -->
<div id="sg-nav" data-page="blog"></div>'''

FOOTER_HTML = '''<!-- Footer rendered by the shared component (components/site-footer.js). -->
<div id="sg-footer"></div>'''

# Shared nav script (components/site-nav.js) + a tiny inline script that lazy-loads
# React + PostInfographics only when scrolled near a #root-infographic-* mount.
LAZY_SCRIPT = '''<script src="../../components/site-nav.js" defer></script>
<script src="../../components/site-footer.js" defer></script>
<script>
(function(){
  // Top nav (burger + Resources dropdown) is handled by components/site-nav.js.
  // Lazy-load React + PostInfographics only if there's an infographic on the page.
  var mounts = document.querySelectorAll('[id^="root-infographic-"]');
  if (!mounts.length) return;
  var loaded = false;
  function loadOnce(){
    if (loaded) return;
    loaded = true;
    function add(src, cb){
      var s = document.createElement('script');
      s.src = src; s.async = false; s.onload = cb; document.head.appendChild(s);
    }
    add('https://unpkg.com/react@18.3.1/umd/react.production.min.js', function(){
      add('https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js', function(){
        add('../../components/PostInfographics.js', function(){
          var id = window.__SG_BLOG_ID__;
          var pi = id && window.PostInfographics && window.PostInfographics[id];
          if (!pi) return;
          mounts.forEach(function(el){
            var which = el.id === 'root-infographic-mid' ? pi.mid : pi.end;
            if (which) ReactDOM.createRoot(el).render(which);
          });
        });
      });
    });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting) { loadOnce(); io.disconnect(); } });
    }, { rootMargin: '600px 0px' });
    mounts.forEach(function(m){ io.observe(m); });
  } else {
    loadOnce();
  }
})();
</script>'''

# WebP-eligible images.
WEBP_BASES = {
  'event_sourcing_landscape_1',
  'event_sourcing_landscape_2',
  'blog2_sg_schema_same_word_different_operations',
  'blog3_entity_roots_one_root_many_members',
  'blog6_module_vs_sg_schema_cover',
}


def picturize(html: str) -> str:
  """Wrap blog <img src="../../assets/blog/X.png|jpg" ...> in <picture> with WebP."""
  pat = re.compile(r'<img\s+([^>]*?)src="(\.\./\.\./assets/blog/([^"]+?)\.(png|jpe?g))"([^>]*?)>', re.S)
  def repl(m):
    pre, fullsrc, base, ext, post = m.groups()
    if base not in WEBP_BASES:
      return m.group(0)
    webp = '../../assets/blog/' + base + '.webp'
    # Re-build the inner <img> with attrs preserved.
    inner = '<img ' + pre + 'src="' + fullsrc + '"' + post + '>'
    return '<picture><source srcset="' + webp + '" type="image/webp">' + inner + '</picture>'
  return pat.sub(repl, html)


def transform(html: str) -> str:
  if SENTINEL in html:
    return html  # already done
  # Replace nav placeholder.
  html = html.replace('<div id="root-nav"></div>', NAV_HTML)
  # Replace footer placeholder.
  html = html.replace('<div id="root-footer"></div>', FOOTER_HTML)
  # Drop heavy scripts in head: React + ReactDOM (we lazy-load).
  html = re.sub(r'\s*<script src="https://unpkg.com/react@18\.3\.1/umd/react\.production\.min\.js"[^>]*></script>', '', html)
  html = re.sub(r'\s*<script src="https://unpkg.com/react-dom@18\.3\.1/umd/react-dom\.production\.min\.js"[^>]*></script>', '', html)
  # Drop preconnect to unpkg (no longer eagerly used).
  html = re.sub(r'\s*<link rel="preconnect" href="https://unpkg\.com" crossorigin>', '', html)
  # Drop bottom component scripts + blog-post.js. Replace with lazy inline.
  bottom_pat = re.compile(
    r'\n*<script src="\.\./\.\./components/Nav\.js" defer></script>\s*'
    r'<script src="\.\./\.\./components/LoginModal\.js" defer></script>\s*'
    r'<script src="\.\./\.\./components/Footer\.js" defer></script>\s*'
    r'<script src="\.\./\.\./components/PostInfographics\.js" defer></script>\s*'
    r'<script src="\.\./\.\./app/blog-post\.js" defer></script>')
  html = bottom_pat.sub('\n' + LAZY_SCRIPT, html)
  # Picturize images.
  html = picturize(html)
  return html


def main():
  files = sorted(BLOG.glob('*/index.html'))
  changed = 0
  for f in files:
    src = f.read_text(encoding='utf-8')
    # Skip redirect stubs.
    if 'http-equiv="refresh"' in src and 'window.location.replace' in src:
      continue
    if 'root-nav' not in src and 'root-footer' not in src:
      continue
    out = transform(src)
    if out != src:
      f.write_text(out, encoding='utf-8')
      changed += 1
      print('updated', f.relative_to(ROOT))
  print(f'done. {changed} files changed.')


if __name__ == '__main__':
  main()
