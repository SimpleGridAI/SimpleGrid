#!/usr/bin/env python3
"""Anonymize the "Elite Arts & Crafts" client across the site. Replace
brand mentions with a generic "furniture manufacturer and exporter with
presence in 12+ countries across North America, Europe, and Asia"
description; drop the founder's first name from attributions; soften
internal "Elite's ..." possessives. Internal file/dir/class names like
case-elite.html, EliteFactoryRoad.jsx, .elite-mfg-grid stay - they
don't surface the brand, just the case-study slug."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# (path-rel-to-root, search, replacement). Idempotent - re-running is
# safe because once the brand text is gone, the replacement is no-op.
EDITS = [
    # ---- HTML head/meta/JSON-LD ----
    ("case-elite.html",
     'content="Elite Arts & Crafts furniture factory floor running SimpleGrid manufacturing ERP"',
     'content="Confidential furniture manufacturer factory floor running SimpleGrid manufacturing ERP"'),
    ("case-elite.html",
     '"headline": "Elite Arts & Crafts - Furniture Manufacturer ERP Case Study",',
     '"headline": "Furniture Manufacturer & Exporter - ERP Case Study",'),
    ("case-elite.html",
     '{ "@type": "ListItem", "position": 3, "name": "Elite Arts & Crafts", "item": "https://simplegrid.ai/case-elite.html" }',
     '{ "@type": "ListItem", "position": 3, "name": "Furniture Manufacturer & Exporter", "item": "https://simplegrid.ai/case-elite.html" }'),
    ("case-studies.html",
     '"name": "Furniture ERP Case Study - Elite Arts & Crafts"',
     '"name": "Furniture ERP Case Study - Confidential Furniture Manufacturer"'),

    # ---- Case-studies index card ----
    ("app/case-studies.jsx",
     'Elite Arts &amp; Crafts',
     'Furniture Manufacturer &amp; Exporter'),
    ("app/case-studies.js",
     '"Elite Arts & Crafts"',
     '"Furniture Manufacturer & Exporter"'),

    # ---- Case-elite body copy (jsx) ----
    ("app/case-elite.jsx",
     'Over four years, Elite Arts &amp; Crafts lost nearly $200,000 to material gaps they could not explain. Not theft. Not fraud. Just a furniture manufacturing operation running at 600–800 employees across 1 million sqft, tracked on Excel and group chats. Today the same operation runs on a live ERP - built around their process, not the other way around.',
     'Over four years, a furniture manufacturer and exporter - 12+ countries across North America, Europe, and Asia - lost nearly $200,000 to material gaps they could not explain. Not theft. Not fraud. Just an operation running at 600–800 employees across 1 million sqft, tracked on Excel and group chats. Today the same operation runs on a live ERP - built around their process, not the other way around.'),
    ("app/case-elite.jsx",
     'Elite Arts &amp; Crafts is a furniture exporter running 600–800 people across nearly 1 million square feet of production space - raw wood comes in at one end, finished furniture leaves the other in 40-foot containers bound for international buyers.',
     'The client (kept confidential at their request) is a furniture manufacturer and exporter with presence in 12+ countries across North America, Europe, and Asia, running 600–800 people across nearly 1 million square feet of production space - raw wood comes in at one end, finished furniture leaves the other in 40-foot containers bound for international buyers.'),
    ("app/case-elite.jsx",
     "Elite's floor supervisors, QC inspectors, and storekeepers had rejected a previous ERP.",
     "The client's floor supervisors, QC inspectors, and storekeepers had rejected a previous ERP."),
    ("app/case-elite.jsx",
     '- Chirag, Founder, Elite Arts &amp; Crafts',
     '- The founder'),

    # ---- Case-elite body copy (compiled .js - ampersand encoding differs) ----
    ("app/case-elite.js",
     'Over four years, Elite Arts & Crafts lost nearly $200,000 to material gaps they could not explain. Not theft. Not fraud. Just a furniture manufacturing operation running at 600–800 employees across 1 million sqft, tracked on Excel and group chats. Today the same operation runs on a live ERP - built around their process, not the other way around.',
     'Over four years, a furniture manufacturer and exporter - 12+ countries across North America, Europe, and Asia - lost nearly $200,000 to material gaps they could not explain. Not theft. Not fraud. Just an operation running at 600–800 employees across 1 million sqft, tracked on Excel and group chats. Today the same operation runs on a live ERP - built around their process, not the other way around.'),
    ("app/case-elite.js",
     'Elite Arts & Crafts is a furniture exporter running 600–800 people across nearly 1 million square feet of production space - raw wood comes in at one end, finished furniture leaves the other in 40-foot containers bound for international buyers.',
     'The client (kept confidential at their request) is a furniture manufacturer and exporter with presence in 12+ countries across North America, Europe, and Asia, running 600–800 people across nearly 1 million square feet of production space - raw wood comes in at one end, finished furniture leaves the other in 40-foot containers bound for international buyers.'),
    ("app/case-elite.js",
     "Elite's floor supervisors, QC inspectors, and storekeepers had rejected a previous ERP.",
     "The client's floor supervisors, QC inspectors, and storekeepers had rejected a previous ERP."),
    ("app/case-elite.js",
     '"- Chirag, Founder, Elite Arts & Crafts"',
     '"- The founder"'),

    # ---- Home proof card (jsx) ----
    ("components/HomeBottom.jsx",
     "name: 'Elite Arts & Crafts', desc: 'Furniture exporter. 600–800 employees. ~1 million sq ft. Excel + group chats → live ERP.', stats: '64 tracked · 72 triggers · 21 days', quote: '\"SimpleGrid feels like our system. My stores manager was comfortable on day one.\"', attr: '- Chirag, Founder', link: 'case-elite.html', anchor: 'How Elite deployed in 21 days'",
     "name: 'Furniture Manufacturer & Exporter', desc: '12+ countries (NA, Europe, Asia). 600–800 employees. ~1 million sq ft. Excel + group chats → live ERP.', stats: '64 tracked · 72 triggers · 21 days', quote: '\"SimpleGrid feels like our system. My stores manager was comfortable on day one.\"', attr: '- The founder', link: 'case-elite.html', anchor: 'How they deployed in 21 days'"),

    # ---- Home proof card (compiled .js) ----
    ("components/HomeBottom.js",
     "name: 'Elite Arts & Crafts',",
     "name: 'Furniture Manufacturer & Exporter',"),
    ("components/HomeBottom.js",
     "desc: 'Furniture exporter. 600–800 employees. ~1 million sq ft. Excel + group chats → live ERP.',",
     "desc: '12+ countries (NA, Europe, Asia). 600–800 employees. ~1 million sq ft. Excel + group chats → live ERP.',"),
    ("components/HomeBottom.js",
     "attr: '- Chirag, Founder',",
     "attr: '- The founder',"),
    ("components/HomeBottom.js",
     "anchor: 'How Elite deployed in 21 days'",
     "anchor: 'How they deployed in 21 days'"),

    # ---- Multi-tenant carousel demo (jsx + js) ----
    ("components/PostInfographics.jsx",
     "{ name: 'Elite Arts', color: 'purple' }",
     "{ name: 'Furniture Exporter', color: 'purple' }"),
    ("components/PostInfographics.js",
     "name: 'Elite Arts',",
     "name: 'Furniture Exporter',"),
]


def main():
    misses = []
    n_applied = 0
    for rel, old, new in EDITS:
        p = ROOT / rel
        text = p.read_text(encoding="utf-8")
        if old not in text:
            if new in text:
                # Already applied
                continue
            misses.append((rel, old[:60]))
            continue
        text = text.replace(old, new, 1)
        p.write_text(text, encoding="utf-8")
        n_applied += 1
        print(f"  ok   {rel}")
    print(f"\nApplied {n_applied} edits")
    if misses:
        print("\nMISSES:")
        for r, snip in misses:
            print(f"  {r}: '{snip}'")


if __name__ == "__main__":
    main()
