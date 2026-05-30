#!/usr/bin/env python3
"""generate-sitemap.py

Walks the repo and regenerates sitemap.xml from current HTML files +
data/blogs.js. lastmod for static pages = file mtime. lastmod for blog
posts = datePublished field from blogs.js (falls back to file mtime).

Coverage:
  - All `*.html` files at the repo root (minus EXCLUDE).
  - All `tools/<slug>/index.html` pages.
  - All `competitors/<slug>/index.html` pages.
  - All `blog/<slug>/index.html` posts that actually exist (empty dirs
    are skipped automatically - they would 404 in production).

Run before each commit:
    python3 scripts/generate-sitemap.py
"""

import os
import re
import sys
from datetime import datetime
from pathlib import Path

ROOT = "https://simplegrid.ai"
REPO = Path(__file__).resolve().parent.parent

# Priority/changefreq map for root HTML pages.
META = {
    "index.html":        {"priority": 1.0, "changefreq": "weekly"},
    "product.html":      {"priority": 0.9, "changefreq": "weekly"},
    "pricing.html":      {"priority": 0.9, "changefreq": "weekly"},
    "case-studies.html": {"priority": 0.9, "changefreq": "monthly"},
    "case-apex.html":    {"priority": 0.8, "changefreq": "monthly"},
    "case-furniture-manufacturer.html": {"priority": 0.8, "changefreq": "monthly"},
    "competitors.html":  {"priority": 0.8, "changefreq": "monthly"},
    "blog.html":         {"priority": 0.8, "changefreq": "weekly"},
    "about.html":        {"priority": 0.7, "changefreq": "monthly"},
    "sg-schema.html":    {"priority": 0.7, "changefreq": "monthly"},
    "hiring.html":       {"priority": 0.6, "changefreq": "weekly"},
    "privacy.html":      {"priority": 0.3, "changefreq": "yearly"},
    "terms.html":        {"priority": 0.3, "changefreq": "yearly"},
    "accessibility.html": {"priority": 0.3, "changefreq": "yearly"},
    "security.html":     {"priority": 0.3, "changefreq": "yearly"},
}

# Root HTML files we never want in the sitemap (router shims, 404, stubs).
EXCLUDE_ROOT = {"post.html", "404.html", "case-elite.html"}


def file_mtime(rel) -> str:
    """Return file mtime as YYYY-MM-DD."""
    ts = (REPO / rel).stat().st_mtime
    return datetime.fromtimestamp(ts).strftime("%Y-%m-%d")


def main() -> None:
    entries = []

    # 1) static HTML pages at root
    root_files = sorted(
        f for f in os.listdir(REPO)
        if f.endswith(".html") and f not in EXCLUDE_ROOT
    )
    for f in root_files:
        url = f"{ROOT}/" if f == "index.html" else f"{ROOT}/{f}"
        meta = META.get(f, {"priority": 0.5, "changefreq": "monthly"})
        entries.append({
            "url": url,
            "lastmod": file_mtime(f),
            "changefreq": meta["changefreq"],
            "priority": meta["priority"],
        })

    # 2) blog posts - parse data/blogs.js for id, slug, datePublished.
    #    Only include posts whose directory has an actual index.html.
    blogs_src = (REPO / "data/blogs.js").read_text(encoding="utf-8")
    blogs_fallback = file_mtime("data/blogs.js")

    id_matches = list(re.finditer(r'"id":\s*(\d+)', blogs_src))
    blogs = []
    for i, m in enumerate(id_matches):
        next_idx = id_matches[i + 1].start() if i + 1 < len(id_matches) else len(blogs_src)
        chunk = blogs_src[m.start():next_idx]
        date_match = re.search(r'"datePublished":\s*"([0-9]{4}-[0-9]{2}-[0-9]{2})"', chunk)
        slug_match = re.search(r'"slug":\s*"([^"]+)"', chunk)
        blogs.append({
            "id": int(m.group(1)),
            "slug": slug_match.group(1) if slug_match else None,
            "datePublished": date_match.group(1) if date_match else None,
        })

    blogs.sort(key=lambda b: b["id"])
    for b in blogs:
        if not b["slug"]:
            continue  # don't sitemap legacy ?id= URLs
        post_path = REPO / "blog" / b["slug"] / "index.html"
        if not post_path.is_file():
            print(f"  skip blog (no index.html): /blog/{b['slug']}/", file=sys.stderr)
            continue
        entries.append({
            "url": f"{ROOT}/blog/{b['slug']}/",
            "lastmod": b["datePublished"] or blogs_fallback,
            "changefreq": "monthly",
            "priority": 0.6,
        })

    # 3) Productive tools - every tools/<slug>/index.html.
    tools_dir = REPO / "tools"
    if tools_dir.is_dir():
        for sub in sorted(tools_dir.iterdir()):
            if not sub.is_dir():
                continue
            idx = sub / "index.html"
            if not idx.is_file():
                continue
            entries.append({
                "url": f"{ROOT}/tools/{sub.name}/",
                "lastmod": datetime.fromtimestamp(idx.stat().st_mtime).strftime("%Y-%m-%d"),
                "changefreq": "monthly",
                "priority": 0.85,
            })
        # And the hub page itself.
        hub = tools_dir / "index.html"
        if hub.is_file():
            entries.append({
                "url": f"{ROOT}/tools/",
                "lastmod": datetime.fromtimestamp(hub.stat().st_mtime).strftime("%Y-%m-%d"),
                "changefreq": "weekly",
                "priority": 0.9,
            })

    # 4) Competitor comparison pages - every competitors/<slug>/index.html.
    competitors_dir = REPO / "competitors"
    if competitors_dir.is_dir():
        for sub in sorted(competitors_dir.iterdir()):
            if not sub.is_dir():
                continue
            if sub.name.startswith("_"):
                continue  # skip shared CSS dir _shared/
            idx = sub / "index.html"
            if not idx.is_file():
                continue
            entries.append({
                "url": f"{ROOT}/competitors/{sub.name}/",
                "lastmod": datetime.fromtimestamp(idx.stat().st_mtime).strftime("%Y-%m-%d"),
                "changefreq": "monthly",
                "priority": 0.75,
            })

    # 5) write sitemap.xml. Dedupe by URL.
    seen = set()
    deduped = []
    for e in entries:
        if e["url"] in seen:
            continue
        seen.add(e["url"])
        deduped.append(e)

    xml_lines = ['<?xml version="1.0" encoding="UTF-8"?>',
                 '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for e in deduped:
        xml_lines.append(
            f'  <url><loc>{e["url"]}</loc><lastmod>{e["lastmod"]}</lastmod>'
            f'<changefreq>{e["changefreq"]}</changefreq>'
            f'<priority>{e["priority"]}</priority></url>'
        )
    xml_lines.append('</urlset>')
    (REPO / "sitemap.xml").write_text("\n".join(xml_lines) + "\n", encoding="utf-8")

    n_root = sum(1 for e in deduped if "/tools/" not in e["url"] and "/competitors/" not in e["url"] and "/blog/" not in e["url"])
    n_blog = sum(1 for e in deduped if "/blog/" in e["url"])
    n_tools = sum(1 for e in deduped if "/tools/" in e["url"])
    n_comp = sum(1 for e in deduped if "/competitors/" in e["url"])
    print(f"Wrote {len(deduped)} URLs: {n_root} root + {n_blog} blog + {n_tools} tools + {n_comp} competitors.")


if __name__ == "__main__":
    main()
