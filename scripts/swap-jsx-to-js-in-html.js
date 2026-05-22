#!/usr/bin/env node
/**
 * Run by `npm run build` AFTER Babel has produced components/*.js and app/*.js.
 *
 * Walks every HTML file (root + blog/{slug}/index.html) and:
 *
 *  1) Removes the Babel-standalone <script> tag (it's no longer needed in the
 *     browser since JSX is pre-transpiled).
 *  2) Changes every `<script type="text/babel" src="components/X.jsx">` to a
 *     plain `<script src="components/X.js" defer>`.
 *  3) Replaces the inline `<script type="text/babel">…App()…</script>` block
 *     at the end of <body> with `<script src="app/{slug}.js" defer></script>`.
 *  4) Adds `defer` to the React + ReactDOM <script> tags now that load order
 *     can be guaranteed by all-defer (no more Babel-runtime race).
 *
 * Idempotent - safe to run multiple times.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// page slug per root HTML file (matches app/{slug}.jsx)
const PAGE_SLUGS = {
  'index.html':        'home',
  'product.html':      'product',
  'pricing.html':      'pricing',
  'about.html':        'about',
  'blog.html':         'blog',
  'case-studies.html': 'case-studies',
  'case-elite.html':   'case-elite',
  'case-apex.html':    'case-apex',
  'hiring.html':       'hiring',
  'privacy.html':      'privacy',
  'terms.html':        'terms',
  '404.html':          'not-found',
  // post.html keeps its existing PostMain.jsx structure (no inline App())
  'post.html':         null,
};

function processHtml(filePath, appSlug, isBlogSlug = false) {
  let src = fs.readFileSync(filePath, 'utf8');
  const before = src;

  // 1) Remove the Babel-standalone <script> tag
  src = src.replace(
    /\n?<script[^>]*src="https:\/\/unpkg\.com\/@babel\/standalone[^"]*"[^>]*><\/script>/g,
    ''
  );

  // 2) Add defer to React + ReactDOM scripts (only if not already there)
  src = src.replace(
    /<script src="(https:\/\/unpkg\.com\/react@[^"]*react\.production\.min\.js)"([^>]*?)><\/script>/,
    (m, url, rest) => /\bdefer\b/.test(rest) ? m : `<script src="${url}"${rest} defer></script>`
  );
  src = src.replace(
    /<script src="(https:\/\/unpkg\.com\/react-dom@[^"]*react-dom\.production\.min\.js)"([^>]*?)><\/script>/,
    (m, url, rest) => /\bdefer\b/.test(rest) ? m : `<script src="${url}"${rest} defer></script>`
  );

  // 3) Rewrite component <script type="text/babel" src="components/X.jsx"> → defer .js
  // (handles both root pages and blog slug pages with ../../components/ prefix)
  src = src.replace(
    /<script type="text\/babel" src="((?:\.\.\/\.\.\/)?components\/([^"]+)\.jsx)"><\/script>/g,
    (m, fullPath, base) => {
      const newPath = fullPath.replace(/\.jsx$/, '.js');
      return `<script src="${newPath}" defer></script>`;
    }
  );

  // 4) Replace the inline <script type="text/babel">…App()…</script> block (root pages only).
  // The component scripts with src= were already handled in step 3, so the only
  // remaining `type="text/babel"` script is the inline App() block. Use a tight
  // lazy match that stops at the FIRST `</script>` so we don't accidentally eat
  // any sibling inline scripts (e.g. the Cal.com lazy-loader) that come after.
  if (appSlug) {
    src = src.replace(
      /<script type="text\/babel">((?:(?!<\/script>)[\s\S])*?)<\/script>/,
      `<script src="app/${appSlug}.js" defer></script>`
    );
  }

  // Blog slug pages: post.html-style - convert any remaining type="text/babel"
  // (data/blogs.js script and the inline window.__SG_BLOG_ID__ block can stay
  // as plain inline scripts - they don't contain JSX)
  if (isBlogSlug) {
    // The window.__SG_BLOG_ID__ inline script has no JSX, just leave the type="text/babel" attr off
    src = src.replace(/<script type="text\/babel">(\s*\/\/[^\n]*\n[\s\S]*?window\.__SG_BLOG_ID__[\s\S]*?)<\/script>/g,
                      '<script>$1</script>');
  }

  if (src !== before) {
    fs.writeFileSync(filePath, src);
    console.log(`  ✓ migrated ${path.relative(ROOT, filePath)}`);
    return true;
  }
  return false;
}

let count = 0;

// Root HTML pages
for (const [name, slug] of Object.entries(PAGE_SLUGS)) {
  const p = path.join(ROOT, name);
  if (fs.existsSync(p) && processHtml(p, slug, false)) count++;
}

// Blog slug pages
const blogDir = path.join(ROOT, 'blog');
if (fs.existsSync(blogDir)) {
  for (const slug of fs.readdirSync(blogDir)) {
    const p = path.join(blogDir, slug, 'index.html');
    if (fs.existsSync(p) && processHtml(p, null, true)) count++;
  }
}

console.log(`\nMigrated ${count} HTML files. Run \`git status\` to inspect.`);
