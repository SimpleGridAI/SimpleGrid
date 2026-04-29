#!/usr/bin/env python3
"""generate-blog-pages.py

Generates a static HTML file at /blog/{slug}/index.html for each blog in
data/blogs.js. Each file ships proper static SEO meta (title, description,
canonical, OG, Twitter) so Google + LinkedIn read the right metadata even
without executing JS. The actual post content is rendered client-side by
components/PostMain.jsx, which reads window.__SG_BLOG_ID__ set inline.

Run:
    python3 scripts/generate-blog-pages.py

Re-run any time data/blogs.js changes.
"""

import os
import re
import shutil
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SITE = "https://simplegrid.ai"


def parse_blogs():
    """Best-effort parser for the BLOG_DATA array in data/blogs.js."""
    src = (REPO / "data/blogs.js").read_text(encoding="utf-8")
    # Find each blog block by the "id" anchor
    id_matches = list(re.finditer(r'"id":\s*(\d+)', src))
    blogs = []
    for i, m in enumerate(id_matches):
        next_idx = id_matches[i + 1].start() if i + 1 < len(id_matches) else len(src)
        chunk = src[m.start():next_idx]

        def grab(pattern, default=""):
            mm = re.search(pattern, chunk)
            return mm.group(1) if mm else default

        title = grab(r'"title":\s*"((?:[^"\\]|\\.)*)"')
        slug = grab(r'"slug":\s*"((?:[^"\\]|\\.)*)"')
        cat = grab(r'"cat":\s*"((?:[^"\\]|\\.)*)"')
        date = grab(r'"datePublished":\s*"([0-9]{4}-[0-9]{2}-[0-9]{2})"')
        body = grab(r'"body":\s*"((?:[^"\\]|\\.)*)"')

        # First image src for og:image
        img_match = re.search(r'"images":\s*\[\s*\{\s*"src":\s*"([^"]+)"', chunk)
        og_image = (
            f"{SITE}/{img_match.group(1)}" if img_match else f"{SITE}/assets/simplegrid-logo-horizontal.svg"
        )

        # Description = first 155 chars of body (escapes normalised)
        body_norm = re.sub(r"\\n", " ", body)
        body_norm = body_norm.replace('\\"', '"').replace("\\\\", "\\")
        body_norm = re.sub(r"\s+", " ", body_norm).strip()
        description = body_norm[:155].strip()

        blogs.append({
            "id": int(m.group(1)),
            "title": title.replace('\\"', '"'),
            "slug": slug,
            "cat": cat,
            "datePublished": date,
            "description": description,
            "og_image": og_image,
        })
    return blogs


def html_escape(s: str) -> str:
    return (
        s.replace("&", "&amp;")
        .replace('"', "&quot;")
        .replace("'", "&#39;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


PAGE_TEMPLATE = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{title} | SimpleGrid Blog</title>
<meta name="description" content="{description}">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#4A7BF7">
<meta name="robots" content="index, follow">
<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<link rel="canonical" href="{canonical}">
<link rel="icon" type="image/svg+xml" href="../../assets/simplegrid-logomark.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://unpkg.com" crossorigin>
<link rel="dns-prefetch" href="https://us-assets.i.posthog.com">
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="../../colors_and_type.css">
<link rel="stylesheet" href="../../styles.css">

<!-- Open Graph -->
<meta property="og:site_name" content="SimpleGrid">
<meta property="og:type" content="article">
<meta property="og:locale" content="en_US">
<meta property="og:url" content="{canonical}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:image" content="{og_image}">
<meta property="og:image:alt" content="{title} - SimpleGrid blog post">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@simplegridai">
<meta name="twitter:creator" content="@simplegridai">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{description}">
<meta name="twitter:image" content="{og_image}">

<!-- JSON-LD: Article + BreadcrumbList (for crawlers that don't run JS) -->
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{title_json}",
  "description": "{description_json}",
  "image": "{og_image}",
  "url": "{canonical}",
  "mainEntityOfPage": "{canonical}",
  "inLanguage": "en",
  "isPartOf": {{ "@id": "https://simplegrid.ai/blog.html#blog" }},
  "publisher": {{ "@id": "https://simplegrid.ai/#org" }},
  "author": {{ "@type": "Organization", "@id": "https://simplegrid.ai/#org" }}{date_field}
}}
</script>
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://simplegrid.ai/" }},
    {{ "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://simplegrid.ai/blog.html" }},
    {{ "@type": "ListItem", "position": 3, "name": "{title_json}", "item": "{canonical}" }}
  ]
}}
</script>

<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js" integrity="sha384-DGyLxAyjq0f9SPpVevD6IgztCFlnMF6oW/XQGmfe+IsZ8TqEiDrcHkMLKI6fiB/Z" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js" integrity="sha384-gTGxhz21lVGYNMcdJOyq01Edg0jhn/c22nsx0kyqP0TxaV5WVdsSH1fSDUf5YJj1" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>
<script src="../../data/blogs.js"></script>

<!-- PostHog Analytics (deferred to idle / 2s timeout) -->
<script>
  function sgLoadPostHog(){
    !function(t,e){{var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){{function g(t,e){{var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){{t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){{var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e}},u.people.toString=function(){{return u.toString(1)+".people (stub)"}},o="Ei Ni init zi Gi Nr Ui Xi Vi capture calculateEventProperties tn register register_once register_for_session unregister unregister_for_session an getFeatureFlag getFeatureFlagPayload getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync ln identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset setIdentity clearIdentity get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException addExceptionStep captureLog startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty nn Qi createPersonProfile setInternalOrTestUser sn qi cn opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing Ji debug Fr rn getPageViewId captureTraceFeedback captureTraceMetric Bi".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])}},e.__SV=1)}}(document,window.posthog||[]);
    posthog.init('phc_uYqTNuyvu48ttUP7tjh89v8JBvjgbRZ9bvZdfdVoEPVh', {{
        api_host: 'https://us.i.posthog.com',
        defaults: '2026-01-30',
        person_profiles: 'identified_only',
    }})
  }
  if ("requestIdleCallback" in window) requestIdleCallback(sgLoadPostHog, {{ timeout: 3000 }});
  else setTimeout(sgLoadPostHog, 2000);
</script>
<script>
  // Hint to PostMain which blog to render. Asset paths inside body
  // images are repo-relative ("assets/blog/foo.png"); since we sit two
  // levels deep, prepend ../../ at runtime.
  window.__SG_BLOG_ID__ = {blog_id};
  window.__SG_BLOG_ASSET_PREFIX__ = "../../";
</script>
</head>
<body>
<div id="root"></div>
<script type="text/babel" src="../../components/Nav.jsx"></script>
<script type="text/babel" src="../../components/LoginModal.jsx"></script>
<script type="text/babel" src="../../components/Footer.jsx"></script>
<script type="text/babel" src="../../components/PostInfographics.jsx"></script>
<script type="text/babel" src="../../components/PostMain.jsx"></script>
<!-- Cal.com lazy-loader: defers embed.js until first user interaction. -->
<script>
  var calLoaded = false;
  function loadCal() {{
    if (calLoaded) return;
    calLoaded = true;
    (function(C,A,L){{var p=function(a,ar){{a.q.push(ar)}};var d=C.document;C.Cal=C.Cal||function(){{var cal=C.Cal;var ar=arguments;if(!cal.loaded){{cal.ns={{}};cal.q=cal.q||[];d.head.appendChild(d.createElement("script")).src=A;cal.loaded=true}}if(ar[0]===L){{var api=function(){{p(api,arguments)}};var namespace=ar[1];api.q=api.q||[];if(typeof namespace==="string"){{cal.ns[namespace]=cal.ns[namespace]||api;p(cal.ns[namespace],ar);p(cal,["initNamespace",namespace])}}else p(cal,ar);return}}p(cal,ar)}})(window,"https://app.cal.com/embed/embed.js","init");
    Cal("init");
    Cal("ui", {{ theme: "light", styles: {{ branding: {{ brandColor: "#4A7BF7" }} }} }});
  }}
  ["scroll","mousemove","click","touchstart"].forEach(function(e){{
    window.addEventListener(e, loadCal, {{once: true, passive: true}});
  }});
</script>
</body>
</html>
"""


def main():
    blogs = parse_blogs()
    blog_root = REPO / "blog"

    # Remove old generated dirs (only the ones we've made - be careful)
    if blog_root.exists():
        for child in blog_root.iterdir():
            if child.is_dir() and (child / "index.html").exists():
                shutil.rmtree(child)

    blog_root.mkdir(exist_ok=True)

    for b in blogs:
        if not b["slug"]:
            print(f"  ! skip id={b['id']} (no slug)")
            continue
        canonical = f"{SITE}/blog/{b['slug']}/"
        title_html = html_escape(b["title"])
        desc_html = html_escape(b["description"])
        # JSON-LD inserted via .format - escape JSON-quotes
        title_json = b["title"].replace('"', '\\"')
        description_json = b["description"].replace('"', '\\"')
        date_field = (
            f',\n  "datePublished": "{b["datePublished"]}",\n  "dateModified": "{b["datePublished"]}"'
            if b["datePublished"] else ""
        )
        page = PAGE_TEMPLATE.format(
            title=title_html,
            description=desc_html,
            canonical=canonical,
            og_image=b["og_image"],
            title_json=title_json,
            description_json=description_json,
            date_field=date_field,
            blog_id=b["id"],
        )
        out_dir = blog_root / b["slug"]
        out_dir.mkdir(exist_ok=True)
        (out_dir / "index.html").write_text(page, encoding="utf-8")
        print(f"  ✓ /blog/{b['slug']}/  (id={b['id']})")

    print(f"Generated {len(blogs)} slug pages.")


if __name__ == "__main__":
    main()
