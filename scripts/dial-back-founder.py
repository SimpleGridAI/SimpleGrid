#!/usr/bin/env python3
"""Re-frame the "founder personally does X" messaging across the site.
Right now multiple surfaces say "Founder-led", "Mukund - our founder",
"founder still answers your call", etc. - which lands as "the company
is one guy". We want the trust signal of senior involvement without the
"too-small-to-trust" read.

Substitutions favor:
  - "Founder-led" -> "Senior team on every deployment"
  - "Founder still answers your call" -> "Direct line to the founding team"
  - first-name "Mukund" -> "our founders" (or anonymous "James" in demo data)
  - "the founder personally"  -> "founders and senior engineers"

The "founder built a $30M manufacturing business" history line stays -
that's a track-record signal, not a smallness signal."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# (relative path, exact-old, new). Idempotent: re-running is safe.
EDITS = [
    # ---- hiring.html (meta tags) ----
    ("hiring.html",
     'Small team building AI-native ERP for mid-market manufacturers. Engineers, operators, GTM hires welcome. Founder-led. Operator-grounded. Apply now.',
     'Lean team building AI-native ERP for mid-market manufacturers. Engineers, operators, GTM hires welcome. Operator-grounded. Senior team on every customer. Apply now.'),
    ("hiring.html",
     'Build AI-native ERP for manufacturers. Small team, founder-led, operator-grounded.',
     'Build AI-native ERP for manufacturers. Lean, operator-grounded, senior team on every deployment.'),

    # ---- pricing.html (FAQ JSON-LD) ----
    ("pricing.html",
     'You pay nothing for the modeling sessions, the configuration, the data migration, or the founder-led onboarding.',
     'You pay nothing for the modeling sessions, the configuration, the data migration, or the senior-led onboarding.'),

    # ---- app/about (jsx + js) ----
    ("app/about.jsx",
     'Founder-led onboarding · We reply within 48 hours · Select partners only',
     'Senior team on every deployment · We reply within 48 hours · Select partners only'),
    ("app/about.js",
     'Founder-led onboarding \\xB7 We reply within 48 hours \\xB7 Select partners only',
     'Senior team on every deployment \\xB7 We reply within 48 hours \\xB7 Select partners only'),

    # ---- app/pricing (jsx) ----
    ("app/pricing.jsx", "'Founder-led onboarding'", "'Senior team on every deployment'"),
    ("app/pricing.jsx", "'Founder still answers your call.'", "'Direct line to the founding team.'"),
    ("app/pricing.jsx",
     "{ h: 'Founder-led onboarding', p: 'Every deployment is led personally - not by a sales engineer or an account manager.' }",
     "{ h: 'Senior-led onboarding', p: 'Every deployment is led by senior engineers and founders - not by a sales engineer or an account manager.' }"),
    ("app/pricing.jsx",
     "'No. SimpleGrid deploys at our cost. You pay nothing for the modeling sessions, the configuration, or the founder-led onboarding.'",
     "'No. SimpleGrid deploys at our cost. You pay nothing for the modeling sessions, the configuration, or the senior-led onboarding.'"),
    # ---- app/pricing (js) ----
    ("app/pricing.js", "'Founder-led onboarding'", "'Senior team on every deployment'"),
    ("app/pricing.js", "'Founder still answers your call.'", "'Direct line to the founding team.'"),
    ("app/pricing.js", "h: 'Founder-led onboarding'", "h: 'Senior-led onboarding'"),
    ("app/pricing.js",
     "'No. SimpleGrid deploys at our cost. You pay nothing for the modeling sessions, the configuration, or the founder-led onboarding.'",
     "'No. SimpleGrid deploys at our cost. You pay nothing for the modeling sessions, the configuration, or the senior-led onboarding.'"),

    # ---- app/hiring (jsx + js) ----
    ("app/hiring.jsx",
     'This is not a coffee-and-decks internship. The founder runs every deployment personally. You will sit next to him on customer calls, take the followups, build the spreadsheets, draft the contracts, write the case studies, and own the loose ends.',
     'This is not a coffee-and-decks internship. Founders and senior engineers run every deployment together. You will sit next to them on customer calls, take the followups, build the spreadsheets, draft the contracts, write the case studies, and own the loose ends.'),
    ("app/hiring.jsx",
     'Small team. Founder-led. Real customers paying us. We are looking for engineers, operators, and go-to-market hires who want to ship a system that gets used - not bought and shelved.',
     'Lean team. Senior engineers and founders on every customer. Real customers paying us. We are looking for engineers, operators, and go-to-market hires who want to ship a system that gets used - not bought and shelved.'),
    ("app/hiring.js",
     'This is not a coffee-and-decks internship. The founder runs every deployment personally. You will sit next to him on customer calls, take the followups, build the spreadsheets, draft the contracts, write the case studies, and own the loose ends.',
     'This is not a coffee-and-decks internship. Founders and senior engineers run every deployment together. You will sit next to them on customer calls, take the followups, build the spreadsheets, draft the contracts, write the case studies, and own the loose ends.'),
    ("app/hiring.js",
     'Small team. Founder-led. Real customers paying us. We are looking for engineers, operators, and go-to-market hires who want to ship a system that gets used - not bought and shelved.',
     'Lean team. Senior engineers and founders on every customer. Real customers paying us. We are looking for engineers, operators, and go-to-market hires who want to ship a system that gets used - not bought and shelved.'),

    # ---- HomeTop (jsx + js) - the "3 slots open" hero badge subtitle ----
    ("components/HomeTop.jsx",
     "Our founder personally builds and deploys every system. We run tight to keep the experience exceptional.",
     "Our senior engineers and founders are on every deployment. We run tight to keep the experience exceptional."),
    ("components/HomeTop.js",
     "Our founder personally builds and deploys every system. We run tight to keep the experience exceptional.",
     "Our senior engineers and founders are on every deployment. We run tight to keep the experience exceptional."),
    # ---- HomeTop (jsx + js) - the "Day 1" walkthrough copy ----
    ("components/HomeTop.jsx",
     "Day 1 is a 3-hour live video call with Mukund - our founder, not a sales rep, not an SDR.",
     "Day 1 is a 3-hour live video call with our founders and lead engineer - not a sales rep, not an SDR."),
    ("components/HomeTop.js",
     "Day 1 is a 3-hour live video call with Mukund - our founder, not a sales rep, not an SDR.",
     "Day 1 is a 3-hour live video call with our founders and lead engineer - not a sales rep, not an SDR."),

    # ---- HomeBottom CTA strip ----
    ("components/HomeBottom.jsx",
     "No commitment. Migration included. Founder-led onboarding.",
     "No commitment. Migration included. Senior team on every deployment."),
    ("components/HomeBottom.js",
     "No commitment. Migration included. Founder-led onboarding.",
     "No commitment. Migration included. Senior team on every deployment."),

    # ---- EventsLedger live ledger demo data: anonymize the actor name ----
    ("components/EventsLedger.jsx",
     "actor: 'Mukund · Owner',verb: 'APPROVE'",
     "actor: 'James · Owner',verb: 'APPROVE'"),
    ("components/EventsLedger.js",
     "actor: 'Mukund · Owner'",
     "actor: 'James · Owner'"),

    # ---- EventsLedger founder-quote attribution ----
    ("components/EventsLedger.jsx",
     "- Mukund Agarwal, Founder",
     "- The founding team"),
    ("components/EventsLedger.js",
     '"- Mukund Agarwal, Founder"',
     '"- The founding team"'),

    # ---- EventsLedger CTA bullets ----
    ("components/EventsLedger.jsx",
     "● Founder runs your onboarding",
     "● Senior team runs your onboarding"),
    ("components/EventsLedger.js",
     "\\u25CF Founder runs your onboarding",
     "\\u25CF Senior team runs your onboarding"),
    ("components/EventsLedger.jsx",
     "Founder-led onboarding · Migration included · No commitment",
     "Senior-led onboarding · Migration included · No commitment"),
    ("components/EventsLedger.js",
     "Founder-led onboarding \\xB7 Migration included \\xB7 No commitment",
     "Senior-led onboarding \\xB7 Migration included \\xB7 No commitment"),

    # ---- Blog 10 body (Inside SimpleGrid) ----
    ("data/blogs.js",
     "We do not ship and disappear. The founder leads every deployment personally. When you call SimpleGrid, you get the person who designed the system, who wrote your SG Schema, who understands your operation by name. That is not scalable forever. But right now, it is the reason our deployments work.",
     "We do not ship and disappear. Senior engineers and founders lead every deployment together. When you call SimpleGrid, you get someone from the team that designed your system, wrote your SG Schema, and knows your operation by name. That is not scalable forever. But right now, it is the reason our deployments work."),
]


def main():
    misses, applied = [], 0
    for rel, old, new in EDITS:
        p = ROOT / rel
        text = p.read_text(encoding="utf-8")
        if old not in text:
            if new in text:
                continue  # already applied
            misses.append((rel, old[:70]))
            continue
        p.write_text(text.replace(old, new, 1), encoding="utf-8")
        applied += 1
        print(f"  ok   {rel}")
    print(f"\nApplied {applied} edits")
    if misses:
        print("\nMISSES:")
        for r, snip in misses:
            print(f"  {r}: '{snip}'")


if __name__ == "__main__":
    main()
