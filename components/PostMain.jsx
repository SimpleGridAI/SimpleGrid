// PostMain.jsx - shared blog-post render. Loaded by both:
//   /post.html              (legacy ?id=N URLs - redirects to slug URL)
//   /blog/{slug}/index.html (canonical slug pages - sets window.__SG_BLOG_ID__)

function parseBlogBody(body, title, images, blogId) {
  const hasRealImages = Array.isArray(images) && images.length > 0;
  const lines = body.split('\n');
  const elements = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const isShort = line.length < 80;
    const noEndPunct = !line.endsWith('.') && !line.endsWith('"') && !line.endsWith(')');
    const nextLine = i + 1 < lines.length ? lines[i + 1].trim() : '';
    const nextIsLong = nextLine.length > 80;

    if (isShort && noEndPunct && nextIsLong && line.length > 10) {
      elements.push(<h2 key={'h-' + i}>{line}</h2>);
    } else if (line.startsWith('Event ') && line.includes(':') && line.length < 120 && line.includes('Actor:')) {
      elements.push(<div key={'e-' + i} style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg2)', padding: '4px 0', lineHeight: 1.6 }}>{line}</div>);
    } else if (/^\d+\.\s/.test(line)) {
      elements.push(<p key={'n-' + i} style={{ paddingLeft: 8 }}><strong>{line.match(/^\d+\./)[0]}</strong> {line.replace(/^\d+\.\s*/, '')}</p>);
    } else {
      elements.push(<p key={'p-' + i}>{line}</p>);
    }
  }

  if (hasRealImages) {
    const n = images.length;
    const figures = images.map((img, idx) => (
      <figure key={'fig-' + idx} className="post-figure">
        <img src={img.src.startsWith('http') ? img.src : (window.__SG_BLOG_ASSET_PREFIX__ || '') + img.src}
             alt={img.alt || ''} loading="lazy" width="2808" height="1040"
             style={{ maxWidth: '100%', height: 'auto', display: 'block' }} />
        {img.alt && <figcaption>{img.alt}</figcaption>}
      </figure>
    ));
    for (let idx = n - 1; idx >= 0; idx--) {
      const pos = Math.floor(elements.length * (idx + 1) / (n + 1));
      elements.splice(pos, 0, figures[idx]);
    }
  }

  const pi = (window.PostInfographics || {})[blogId];
  if (pi) {
    if (pi.mid) {
      const midPos = Math.floor(elements.length * (hasRealImages ? 0.55 : 0.5));
      elements.splice(midPos, 0, <div key="pi-mid">{pi.mid}</div>);
    }
    if (pi.end) {
      elements.push(<div key="pi-end">{pi.end}</div>);
    }
  }

  return elements;
}

function BlogPost() {
  const [showLogin, setShowLogin] = React.useState(false);

  // Resolve blog id. Priority:
  //   1) window.__SG_BLOG_ID__ (set by static slug page in /blog/{slug}/index.html)
  //   2) ?id=N query param (legacy URL on /post.html)
  //   3) default to 1
  const params = new URLSearchParams(window.location.search);
  const blogId = window.__SG_BLOG_ID__ || parseInt(params.get('id')) || 1;
  const blog = BLOG_DATA.find(b => b.id === blogId);

  // Legacy ?id=N URL redirect → /blog/{slug}/  (preserves backlinks)
  React.useEffect(() => {
    if (!window.__SG_BLOG_ID__ && params.get('id') && blog && blog.slug) {
      window.location.replace('/blog/' + blog.slug + '/');
    }
  }, []);

  if (!blog) {
    return (<>
      <Nav page="blog" onLoginClick={() => setShowLogin(true)} />
      <div className="container-sm" style={{ padding: '80px 32px', textAlign: 'center' }}>
        <h2 className="h2">Post not found.</h2>
        <a href="/blog.html" className="btn btn-primary" style={{ marginTop: 16 }}>Back to blog</a>
      </div>
      <Footer />
    </>);
  }

  // Per-post SEO: title, meta, canonical, Article + Breadcrumb JSON-LD.
  // For slug pages this is mostly redundant (static meta already in HTML),
  // but it stays consistent for legacy /post.html?id=N URLs that don't
  // immediately redirect (Google, share-bots that don't follow redirects).
  React.useEffect(() => {
    document.title = blog.title + ' - SimpleGrid Blog';
    const desc = (blog.body || '').replace(/\s+/g, ' ').slice(0, 155).trim();
    const slugUrl = blog.slug ? ('https://simplegrid.ai/blog/' + blog.slug + '/') : ('https://simplegrid.ai/post.html?id=' + blog.id);
    const heroImg = (blog.images && blog.images[0] && blog.images[0].src)
      ? 'https://simplegrid.ai/' + blog.images[0].src
      : 'https://simplegrid.ai/assets/simplegrid-logo-horizontal.svg';

    const setMeta = (selector, attr, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', desc);
    setMeta('meta[property="og:title"]', 'content', blog.title);
    setMeta('meta[property="og:description"]', 'content', desc);
    setMeta('meta[property="og:url"]', 'content', slugUrl);
    setMeta('meta[property="og:image"]', 'content', heroImg);
    setMeta('meta[name="twitter:title"]', 'content', blog.title);
    setMeta('meta[name="twitter:description"]', 'content', desc);
    setMeta('meta[name="twitter:image"]', 'content', heroImg);

    let can = document.querySelector('link[rel="canonical"]');
    if (!can) { can = document.createElement('link'); can.setAttribute('rel', 'canonical'); document.head.appendChild(can); }
    can.setAttribute('href', slugUrl);

    let ld = document.getElementById('post-jsonld');
    if (!ld) { ld = document.createElement('script'); ld.type = 'application/ld+json'; ld.id = 'post-jsonld'; document.head.appendChild(ld); }
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': blog.title,
      'description': desc,
      'image': heroImg,
      'url': slugUrl,
      'mainEntityOfPage': slugUrl,
      'publisher': { '@id': 'https://simplegrid.ai/#org' },
      'author': { '@type': 'Organization', '@id': 'https://simplegrid.ai/#org' },
    };
    if (blog.datePublished) articleSchema.datePublished = blog.datePublished;
    articleSchema.dateModified = blog.dateModified || blog.datePublished || undefined;
    if (!articleSchema.dateModified) delete articleSchema.dateModified;
    ld.textContent = JSON.stringify(articleSchema);

    let bc = document.getElementById('post-breadcrumb');
    if (!bc) { bc = document.createElement('script'); bc.type = 'application/ld+json'; bc.id = 'post-breadcrumb'; document.head.appendChild(bc); }
    bc.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://simplegrid.ai/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://simplegrid.ai/blog.html' },
        { '@type': 'ListItem', 'position': 3, 'name': blog.title }
      ]
    });
  }, [blog]);

  const prevBlog = BLOG_DATA.find(b => b.id === blogId - 1);
  const nextBlog = BLOG_DATA.find(b => b.id === blogId + 1);
  const linkFor = (b) => b.slug ? ('/blog/' + b.slug + '/') : ('/post.html?id=' + b.id);

  return (<>
    <Nav page="blog" onLoginClick={() => setShowLogin(true)} />

    <section className="post-header">
      <div className="container-sm">
        <a href="/blog.html" style={{ fontSize: 13, color: 'var(--sg-blue)', textDecoration: 'none', border: 'none' }}>← Back to blog</a>
        <h1>{blog.title}</h1>
        <div className="post-meta">
          <span>{blog.cat}</span>
          <span>{blog.readTime} read</span>
        </div>
      </div>
    </section>

    <section className="post-content">
      <div className="container-sm">
        {parseBlogBody(blog.body, blog.title, blog.images, blog.id)}

        {/* CTA */}
        <div style={{ background: 'var(--sg-blue-light)', borderRadius: 'var(--radius-lg)', padding: '32px', marginTop: 40, textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: 'var(--fg1)', margin: '0 0 12px' }}>See how this works for your operation.</p>
          <a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener" className="btn btn-primary">Book a call</a>
        </div>

        {/* Prev/Next */}
        <div className="post-pager">
          {prevBlog ? (
            <a className="post-pager-link" href={linkFor(prevBlog)}>← {prevBlog.title.length > 50 ? prevBlog.title.substring(0, 50) + '…' : prevBlog.title}</a>
          ) : <span></span>}
          {nextBlog ? (
            <a className="post-pager-link post-pager-next" href={linkFor(nextBlog)}>{nextBlog.title.length > 50 ? nextBlog.title.substring(0, 50) + '…' : nextBlog.title} →</a>
          ) : <span></span>}
        </div>
      </div>
    </section>

    <Footer />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
  </>);
}

ReactDOM.createRoot(document.getElementById('root')).render(<BlogPost />);
