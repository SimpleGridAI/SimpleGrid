#!/usr/bin/env python3
"""generate-sitemap.py

Walks the repo and regenerates sitemap.xml from current HTML files +
data/blogs.js. lastmod for static pages = file mtime. lastmod for blog
posts = datePublished field from blogs.js (falls back to file mtime).

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

META = {
    "index.html":        {"priority": 1.0, "changefreq": "weekly"},
    "product.html":      {"priority": 0.9, "changefreq": "weekly"},
    "pricing.html":      {"priority": 0.9, "changefreq": "weekly"},
    "case-studies.html": {"priority": 0.9, "changefreq": "monthly"},
    "case-elite.html":   {"priority": 0.8, "changefreq": "monthly"},
    "case-apex.html":    {"priority": 0.8, "changefreq": "monthly"},
    "blog.html":         {"priority": 0.8, "changefreq": "weekly"},
    "about.html":        {"priority": 0.7, "changefreq": "monthly"},
    "hiring.html":       {"priority": 0.6, "changefreq": "weekly"},
    "privacy.html":      {"priority": 0.3, "changefreq": "yearly"},
    "terms.html":        {"priority": 0.3, "changefreq": "yearly"},
}

EXCLUDE = {"post.html", "404.html"}


def file_mtime(rel: str) -> str:
    ts = (REPO / rel).stat().st_mtime
    return datetime.fromtimestamp(ts).strftime("%Y-%m-%d")


def main() -> None:
    entries = []

    # 1) static HTML pages at root
    static_files = sorted(
        f for f in os.listdir(REPO)
        if f.endswith(".html") and f not in EXCLUDE
    )
    for f in static_files:
        url = f"{ROOT}/" if f == "index.html" else f"{ROOT}/{f}"
        meta = META.get(f, {"priority": 0.5, "changefreq": "monthly"})
        entries.append({
            "url": url,
            "lastmod": file_mtime(f),
            "changefreq": meta["changefreq"],
            "priority": meta["priority"],
        })

    # 2) blog posts — parse data/blogs.js for id, slug, datePublished
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
        # Prefer slug URL; fall back to legacy ?id= URL only if no slug
        url = (
            f"{ROOT}/blog/{b['slug']}/"
            if b["slug"] else f"{ROOT}/post.html?id={b['id']}"
        )
        entries.append({
            "url": url,
            "lastmod": b["datePublished"] or blogs_fallback,
            "changefreq": "monthly",
            "priority": 0.6,
        })

    # 3) write sitemap.xml
    xml_lines = ['<?xml version="1.0" encoding="UTF-8"?>',
                 '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for e in entries:
        xml_lines.append(
            f'  <url><loc>{e["url"]}</loc><lastmod>{e["lastmod"]}</lastmod>'
            f'<changefreq>{e["changefreq"]}</changefreq>'
            f'<priority>{e["priority"]}</priority></url>'
        )
    xml_lines.append('</urlset>')
    (REPO / "sitemap.xml").write_text("\n".join(xml_lines) + "\n", encoding="utf-8")

    print(f"Wrote {len(entries)} URLs to sitemap.xml "
          f"({len(static_files)} pages + {len(blogs)} blog posts).")


if __name__ == "__main__":
    main()
