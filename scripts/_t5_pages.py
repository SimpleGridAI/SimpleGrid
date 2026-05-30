import os, json, html

CSP=("default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com https://us-assets.i.posthog.com https://www.googletagmanager.com; "
     "img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; "
     "connect-src 'self' https://us.i.posthog.com https://formsubmit.co https://www.google-analytics.com https://www.googletagmanager.com https://googleads.g.doubleclick.net; "
     "frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://formsubmit.co; object-src 'none'; upgrade-insecure-requests")

STYLE="""<style>
.lp-eyebrow{font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--brand,#3461E0);margin-bottom:10px}
.lp-hero{padding:64px 0 40px}
.lp-hero h1{font-size:clamp(30px,5vw,46px);line-height:1.08;margin:0 0 18px;max-width:18ch}
.lp-hero .lead{font-size:18px;line-height:1.6;max-width:62ch;color:#3a4252}
.lp-ticks{display:flex;flex-wrap:wrap;gap:14px;margin:22px 0 26px}
.lp-tick{display:flex;align-items:center;gap:8px;font-weight:600;font-size:15px}
.lp-tick svg{color:var(--brand,#3461E0);flex:none}
.lp-section{padding:34px 0;border-top:1px solid #ececf1}
.lp-section h2{font-size:clamp(22px,3.4vw,30px);line-height:1.15;margin:0 0 14px;max-width:24ch}
.lp-section p{font-size:16px;line-height:1.65;max-width:68ch;color:#3a4252;margin:0 0 14px}
.lp-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin-top:18px}
.lp-card{border:1px solid #e6e6ee;border-radius:12px;padding:20px;background:#fff}
.lp-card h3{margin:0 0 8px;font-size:17px}
.lp-card p{font-size:14.5px;margin:0}
.lp-related{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-top:18px;list-style:none;padding:0}
.lp-related a{display:block;border:1px solid #e6e6ee;border-radius:10px;padding:14px 16px;text-decoration:none;color:inherit;background:#fafaff}
.lp-related a:hover{border-color:var(--brand,#3461E0)}
.lp-related .t{font-weight:700;font-size:15px;display:block;margin-bottom:3px}
.lp-related .d{font-size:13px;color:#5a6072}
.lp-faq{margin-top:10px}
.lp-faq details{border-bottom:1px solid #ececf1;padding:14px 0}
.lp-faq summary{font-weight:700;font-size:16px;cursor:pointer}
.lp-faq p{margin:10px 0 0;font-size:15.5px;color:#3a4252}
</style>"""

def esc(s): return html.escape(s, quote=True)

def render(cfg):
    base="https://simplegrid.ai/%s/"%cfg['slug']
    crumbs=cfg['breadcrumb']
    bc=[{"@type":"ListItem","position":i+1,"name":n,"item":u} for i,(n,u) in enumerate(crumbs)]
    graph=[
        {"@type":"WebPage","@id":base+"#webpage","url":base,"name":cfg['title'],"description":cfg['meta'],
         "isPartOf":{"@id":"https://simplegrid.ai/#website"},"about":{"@id":"https://simplegrid.ai/#org"},
         "inLanguage":"en-US","publisher":{"@id":"https://simplegrid.ai/#org"}},
        {"@type":"BreadcrumbList","itemListElement":bc},
    ]
    if cfg.get('faqs'):
        graph.append({"@type":"FAQPage","mainEntity":[
            {"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in cfg['faqs']]})
    ld=json.dumps({"@context":"https://schema.org","@graph":graph},ensure_ascii=False,separators=(",",":"))
    tick_svg='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>'
    ticks=''.join('<div class="lp-tick">%s %s</div>'%(tick_svg,esc(t)) for t in cfg['ticks'])
    sections=''
    for s in cfg['sections']:
        inner=''.join('<p>%s</p>'%p for p in s['paras'])
        cards=''
        if s.get('cards'):
            cards='<div class="lp-grid">'+''.join('<div class="lp-card"><h3>%s</h3><p>%s</p></div>'%(esc(c[0]),esc(c[1])) for c in s['cards'])+'</div>'
        sections+='<section class="lp-section"><div class="container">%s<h2>%s</h2>%s%s</div></section>'%(
            ('<div class="lp-eyebrow">%s</div>'%esc(s['eyebrow']) if s.get('eyebrow') else ''), esc(s['h2']), inner, cards)
    related=''
    if cfg.get('related'):
        items=''.join('<li><a href="%s"><span class="t">%s</span><span class="d">%s</span></a></li>'%(u,esc(l),esc(d)) for l,u,d in cfg['related'])
        related='<section class="lp-section"><div class="container"><div class="lp-eyebrow">Keep going</div><h2>%s</h2><ul class="lp-related">%s</ul></div></section>'%(esc(cfg.get('related_h','Related free tools and pages')),items)
    faq=''
    if cfg.get('faqs'):
        ds=''.join('<details><summary>%s</summary><p>%s</p></details>'%(esc(q),esc(a)) for q,a in cfg['faqs'])
        faq='<section class="lp-section"><div class="container"><div class="lp-eyebrow">FAQ</div><h2>Questions manufacturers ask</h2><div class="lp-faq">%s</div></div></section>'%ds
    P='../'
    NAV='''<header class="nav" role="banner"><div class="nav-inner">
<a class="nav-logo" href="{P}" aria-label="SimpleGrid home"><img src="{P}assets/simplegrid-logo-horizontal.svg" alt="SimpleGrid logo" width="160" height="32" fetchpriority="high" decoding="async"></a>
<nav class="nav-links" aria-label="Main navigation"><a href="{P}" class="nav-link">Home</a><a href="{P}product.html" class="nav-link">Product</a><details class="nav-resources"><summary class="nav-link" role="button">Resources</summary><div class="nav-resources-menu"><a href="{P}tools/">Productive Tools <span>35 free calculators for manufacturers.</span></a><a href="{P}case-studies.html">Case studies <span>Real deployments. Real numbers.</span></a><a href="{P}blog.html">Blog <span>Field notes on ERP and ops.</span></a></div></details><a href="{P}competitors.html" class="nav-link">Competitors</a></nav>
<div class="nav-right"><a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener noreferrer" data-cta="nav_book_call" class="btn btn-sm btn-primary">Book a demo</a></div>
</div></header>'''.format(P=P)
    FOOTER='''<footer class="footer" role="contentinfo"><div class="container">
<div class="footer-top"><div><img src="{P}assets/simplegrid-logo-horizontal.svg" alt="SimpleGrid logo" class="footer-logo" width="160" height="32" loading="lazy" decoding="async"><p class="footer-tagline">Custom ERP. Built at our risk. Paid for if it works.</p></div>
<div class="footer-cols" style="grid-template-columns:1fr 1fr 1fr 1fr;gap:24px">
<div><div class="footer-h">Product</div><a href="{P}product.html" class="footer-link">How it works</a><a href="{P}pricing.html" class="footer-link">Pricing</a></div>
<div><div class="footer-h">Resources</div><a href="{P}tools/" class="footer-link">Productive Tools</a><a href="{P}case-studies.html" class="footer-link">Case studies</a><a href="{P}blog.html" class="footer-link">Blog</a></div>
<div><div class="footer-h">Company</div><a href="{P}about.html" class="footer-link">About</a><a href="{P}competitors.html" class="footer-link">Competitors</a><a href="{P}hiring.html" class="footer-link">Careers</a></div>
<div><div class="footer-h">Get in touch</div><a href="mailto:hello@simplegrid.ai" class="footer-link">hello@simplegrid.ai</a><a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener noreferrer" class="footer-link">Book a call</a><a href="https://www.linkedin.com/company/simplegridai" target="_blank" rel="noopener noreferrer" class="footer-link">LinkedIn</a></div></div></div>
<div class="footer-bottom"><div>SimpleGrid, an AI-native ERP for US manufacturers, by Valaya AI Technologies © 2026</div><div class="footer-legal"><a href="{P}privacy.html">Privacy Policy</a><a href="{P}terms.html">Terms</a></div></div>
</div></footer>'''.format(P=P)
    doc='''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="{csp}">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
<title>{title}</title>
<meta name="description" content="{meta}">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#3461E0">
<meta name="robots" content="index, follow">
<link rel="canonical" href="{base}">
<link rel="icon" type="image/svg+xml" href="{P}assets/simplegrid-logomark.svg">
<link rel="stylesheet" href="{P}colors_and_type.css">
<link rel="stylesheet" href="{P}styles.css">
{style}
<meta property="og:site_name" content="SimpleGrid">
<meta property="og:type" content="website">
<meta property="og:url" content="{base}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{meta}">
<meta property="og:image" content="https://simplegrid.ai/assets/og-card.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@simplegridai">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{meta}">
<meta name="twitter:image" content="https://simplegrid.ai/assets/og-card.jpg">
<script src="{P}assets/js/analytics-init.js" defer></script>
<script src="{P}assets/js/tracking.js" defer></script>
<script src="{P}assets/js/cookie-consent.js" defer></script>
<script type="application/ld+json">
{ld}
</script>
</head>
<body>
<a href="#main" class="skip-link">Skip to main content</a>
{nav}
<main id="main">
<section class="lp-hero"><div class="container">
<div class="lp-eyebrow">{eyebrow}</div>
<h1>{h1}</h1>
<p class="lead">{lead}</p>
<div class="lp-ticks">{ticks}</div>
<a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener noreferrer" data-cta="{cta_id}" class="btn btn-lg btn-primary">Book a demo</a>
</div></section>
{sections}
{related}
{faq}
<section class="final-cta-band"><div class="container"><div class="lp-eyebrow">See it work before you pay</div>
<h2 style="font-size:clamp(24px,4vw,34px);margin:0 0 12px">{final_h}</h2>
<p style="max-width:60ch;margin:0 auto 20px;color:#3a4252">We build the system at our risk, you run it free for 30 days on your floor, and you pay only if you keep it.</p>
<a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener noreferrer" data-cta="final_cta" class="btn btn-lg btn-primary">Book a demo</a>
</div></section>
</main>
{footer}
<script src="{P}components/BookDemoModal.js" defer></script>
</body>
</html>'''.format(csp=CSP,title=esc(cfg['title']),meta=esc(cfg['meta']),base=base,P=P,style=STYLE,
        ld=ld,nav=NAV,eyebrow=esc(cfg['eyebrow']),h1=esc(cfg['h1']),lead=esc(cfg['lead']),
        ticks=ticks,cta_id=cfg.get('cta_id','lp_hero'),sections=sections,related=related,faq=faq,
        final_h=esc(cfg.get('final_h','Stop evaluating ERPs on faith.')),footer=FOOTER)
    assert '—' not in doc, 'EM DASH in '+cfg['slug']
    os.makedirs(cfg['slug'],exist_ok=True)
    open(cfg['slug']+'/index.html','w',encoding='utf-8').write(doc)
    return cfg['slug']

from t5_configs import PAGES
for cfg in PAGES:
    print('wrote', render(cfg))
