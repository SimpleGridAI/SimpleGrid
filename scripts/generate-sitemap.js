#!/usr/bin/env node
/* generate-sitemap.js
 *
 * Walks the repo, regenerates sitemap.xml from current files + data/blogs.js.
 * lastmod for static pages = file mtime. lastmod for blog posts = datePublished
 * field if present, else data/blogs.js mtime.
 *
 * Run before each commit:
 *   node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = 'https://simplegrid.ai';
const REPO = path.resolve(__dirname, '..');

// Per-page priority + changefreq. Anything not listed defaults to monthly + 0.5.
const META = {
  'index.html':        { priority: 1.0, changefreq: 'weekly'  },
  'product.html':      { priority: 0.9, changefreq: 'weekly'  },
  'pricing.html':      { priority: 0.9, changefreq: 'weekly'  },
  'case-studies.html': { priority: 0.9, changefreq: 'monthly' },
  'case-elite.html':   { priority: 0.8, changefreq: 'monthly' },
  'case-apex.html':    { priority: 0.8, changefreq: 'monthly' },
  'blog.html':         { priority: 0.8, changefreq: 'weekly'  },
  'about.html':        { priority: 0.7, changefreq: 'monthly' },
  'hiring.html':       { priority: 0.6, changefreq: 'weekly'  },
  'privacy.html':      { priority: 0.3, changefreq: 'yearly'  },
  'terms.html':        { priority: 0.3, changefreq: 'yearly'  },
};

const EXCLUDE = new Set(['post.html', '404.html']);

const isoDate = (date) => date.toISOString().slice(0, 10);
const fileMtime = (rel) => isoDate(fs.statSync(path.join(REPO, rel)).mtime);

// 1) static HTML pages at root
const staticFiles = fs.readdirSync(REPO)
  .filter(f => f.endsWith('.html') && !EXCLUDE.has(f));

const entries = staticFiles.map(f => {
  const url = f === 'index.html' ? `${ROOT}/` : `${ROOT}/${f}`;
  const meta = META[f] || { priority: 0.5, changefreq: 'monthly' };
  return { url, lastmod: fileMtime(f), ...meta };
});

// 2) blog posts from data/blogs.js - parse out id + datePublished
const blogsSrc = fs.readFileSync(path.join(REPO, 'data/blogs.js'), 'utf8');
const blogsFallbackMtime = fileMtime('data/blogs.js');

// Walk each "id": N { ... "datePublished": "YYYY-MM-DD" } block
const blogIdRe = /"id":\s*(\d+)/g;
const blocks = [];
let match;
while ((match = blogIdRe.exec(blogsSrc)) !== null) {
  blocks.push({ id: parseInt(match[1], 10), startIdx: match.index });
}
blocks.forEach((b, i) => {
  const next = blocks[i + 1];
  const slice = blogsSrc.slice(b.startIdx, next ? next.startIdx : blogsSrc.length);
  const dateMatch = /"datePublished":\s*"([0-9]{4}-[0-9]{2}-[0-9]{2})"/.exec(slice);
  b.datePublished = dateMatch ? dateMatch[1] : null;
});

blocks.sort((a, b) => a.id - b.id).forEach(b => {
  entries.push({
    url: `${ROOT}/post.html?id=${b.id}`,
    lastmod: b.datePublished || blogsFallbackMtime,
    changefreq: 'monthly',
    priority: 0.6,
  });
});

// 3) write sitemap.xml
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(e =>
  `  <url><loc>${e.url}</loc><lastmod>${e.lastmod}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`
).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(REPO, 'sitemap.xml'), xml);
console.log(`Wrote ${entries.length} URLs to sitemap.xml (${staticFiles.length} pages + ${blocks.length} blog posts).`);
