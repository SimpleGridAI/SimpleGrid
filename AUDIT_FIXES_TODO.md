# SimpleGrid — Audit Fixes Still Pending (need YOUR action)

The deep audit (`AUDIT_SIMPLEGRID.md`) flagged 22 issues. Most are now fixed in code and will go live on the next deploy. This file lists the **5 items that need YOUR action** because they require DNS access, payment for a CDN, or external tooling.

---

## 1. Publish a DMARC record  (audit C-4 — Critical)

**Why it matters:** without DMARC, anyone can spoof `@simplegrid.ai` and most inbox providers will route to spam/quarantine instead of rejecting. Hurts cold-outbound deliverability for B2B sales.

**What to do** (5 minutes, Namecheap dashboard):

1. Log in to Namecheap → Domain List → simplegrid.ai → Manage → Advanced DNS.
2. Add a new TXT record:
    - **Host:** `_dmarc`
    - **Value:** `v=DMARC1; p=none; rua=mailto:hello@simplegrid.ai; pct=100`
    - **TTL:** Automatic
3. Wait ~24 hours, check at https://mxtoolbox.com/dmarc.aspx?domain=simplegrid.ai
4. After 2 weeks of monitoring with `p=none` and no surprises, change to `p=quarantine` (same record, new value).

Start with `p=none` (monitor only) so you don't accidentally break any existing mail. Move to `p=quarantine` once you're confident SPF + DKIM are aligned.

---

## 2. Add CAA records (audit M-10 — Medium)

**Why it matters:** restricts which Certificate Authorities can issue certs for simplegrid.ai. Defends against rogue cert issuance.

**What to do** (2 minutes, Namecheap):

Add two CAA records on the apex `simplegrid.ai`:
- Type: `CAA`, Host: `@`, Value: `0 issue "letsencrypt.org"`
- Type: `CAA`, Host: `@`, Value: `0 issuewild ";"`

This matches the current cert issuer (Let's Encrypt). If you later move to Cloudflare or another CA, add their issuer here too before switching.

---

## 3. Enable DNSSEC (audit M-10 — Medium)

**Why it matters:** prevents DNS cache poisoning attacks. Modern hygiene.

**What to do** (1 minute, Namecheap):

Namecheap dashboard → Domain List → simplegrid.ai → Manage → "DNSSEC" tab → toggle ON.

That's it. Namecheap handles key management automatically.

---

## 4. Tighten SPF (audit L-1 — Low)

**Why it matters:** Current SPF ends with `~all` (soft-fail). After DMARC is stable on `p=quarantine`, tighten SPF to `-all` (hard-fail) for stricter spoof rejection.

**What to do** (do this LAST, ~2 weeks after enabling DMARC):

In Namecheap → Advanced DNS, find the existing TXT record:
- Current: `v=spf1 include:zoho.in include:spf.efwd.registrar-servers.com ~all`
- Change to: `v=spf1 include:zoho.in include:spf.efwd.registrar-servers.com -all`

Only the last two characters change (`~all` → `-all`).

---

## 5. (Optional) Front the site with Cloudflare  (audit H-2, M-11 — High & Medium)

**Why it matters:** GitHub Pages doesn't let you set custom response headers, doesn't ship Brotli, and offers no edge WAF. Putting Cloudflare in front (free tier) adds:
- **Brotli compression** automatically → saves 1–3 KB per text response
- **Security headers** via Transform Rules: CSP, X-Frame-Options, Permissions-Policy, Referrer-Policy, X-Content-Type-Options
- **HSTS preload** with proper `includeSubDomains; preload`
- **HTTP/3 (QUIC)** out of the box
- **DDoS protection** + edge rate-limiting
- Each item above is asked about in every enterprise security questionnaire.

**What to do** (15-20 minutes):

1. Sign up free at https://dash.cloudflare.com (use the same Google account if convenient).
2. Add `simplegrid.ai`. Cloudflare scans existing DNS records and proposes them.
3. **Important — keep these in the import:** the MX record (1 smtp.google.com), the SPF TXT record, the DKIM (google._domainkey) TXT, the new DMARC TXT, the CAA records.
4. Cloudflare will give you 2 nameservers. In Namecheap, change nameservers to those two.
5. Wait ~6 hours for propagation. Site continues to work the whole time.
6. In Cloudflare → Rules → Transform Rules → Modify Response Header → "Set static" with:
    - `Strict-Transport-Security`: `max-age=63072000; includeSubDomains; preload`
    - `X-Content-Type-Options`: `nosniff`
    - `X-Frame-Options`: `DENY`
    - `Referrer-Policy`: `strict-origin-when-cross-origin`
    - `Permissions-Policy`: `geolocation=(), microphone=(), camera=(), payment=()`
7. (Optional) Submit `simplegrid.ai` to https://hstspreload.org after HSTS is set.

Risk: zero rollback risk — change nameservers back to Namecheap defaults if anything breaks.

---

## 6. (Optional) Convert hero images to WebP (audit H-5, M-4 — Medium)

**Why it matters:** `/assets/og-card.jpg` (100 KB) and `/assets/elite-factory.jpeg` (242 KB) account for the heaviest non-script bytes on the home + case-studies pages. WebP would cut ~108 KB.

I couldn't do this locally because macOS `sips` doesn't write WebP. **Easiest path:**

1. Go to https://squoosh.app (free, browser-based, no signup).
2. Upload `assets/og-card.jpg` → choose WebP, quality 80 → download as `og-card.webp`.
3. Same for `assets/elite-factory.jpeg` → `elite-factory.webp`.
4. Copy both to `assets/` in this repo.
5. Tell me when done and I'll update the `<img>` tags + the `og:image` meta to use the new files via `<picture>` (with JPEG fallback for old browsers).

---

## Once everything above is done

Re-run the audit (just re-paste the same prompt). Should see:
- A11y score 100 site-wide (color contrast already darkened in this commit)
- Security headers all present (after Cloudflare)
- DMARC pass on email-tester.com
- Home/case-studies LCP improvements from WebP

Good luck. None of these are urgent today — but each closes a real procurement-due-diligence row.
