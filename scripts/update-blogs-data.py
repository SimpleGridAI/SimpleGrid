#!/usr/bin/env python3
"""Sync the new SEO-friendly titles into data/blogs.js (the source of
truth for the blog list page and on-page H1) so the H1, blog index card,
and SERP <title> all agree."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BLOGS = ROOT / "data" / "blogs.js"

# id -> new title (matches HTML shell <title>)
NEW_TITLES = {
    1:  "Event Sourcing: Why SimpleGrid Stores Every Action Forever",
    2:  "SG Schema: Why Your ERP Should Speak Your Language",
    3:  "Entity Roots: Building Blocks of an SG Schema ERP",
    4:  "Multi-Tenant Architecture: 100 Clients, One Platform",
    5:  "ERP Customization in Minutes, Not Months",
    6:  "Module-Based ERP vs. SG Schema ERP",
    7:  "Building an ERP Chatbot With Claude, No RAG",
    8:  "Why Conversational UX Does Not Change Behavior",
    9:  "True Landed Cost Per SKU (And Why Most Cannot)",
    10: "Inside SimpleGrid: Every Factory Is Different",
    11: "Why Mid-Market Manufacturers Are Underserved",
    12: "The Real Cost of Running Your Factory on Spreadsheets",
    13: "Why Your ERP Vendor Charges You for Every Change",
    14: "How AI Changed ERP Deployment (Not Features)",
    15: "When Your ERP Cannot Keep Up With Your Business",
    16: "Your Warehouse Manager Should Be Your ERP's First User",
    17: "The Myth of ERP Best Practices",
}


def main():
    text = BLOGS.read_text(encoding="utf-8")
    # Each post object starts with `"id": N,` then `"title": "...",`
    # Replace title for each id.
    for blog_id, new_title in NEW_TITLES.items():
        # Match the id then the next title field, regardless of intervening
        # whitespace. The title pattern handles escaped quotes (\") so we
        # don't truncate at the first inner quote.
        pattern = re.compile(
            r'("id":\s*' + str(blog_id) + r',\s*\n\s*"title":\s*)"((?:\\.|[^"\\])*)"',
            re.MULTILINE,
        )
        new_value = r'\1"' + new_title.replace('"', r'\"') + '"'
        new_text, n = pattern.subn(new_value, text)
        if n != 1:
            print(f"  WARN id={blog_id}: matched {n} times")
        text = new_text
        print(f"  ok   id={blog_id}: {new_title}")
    BLOGS.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    main()
