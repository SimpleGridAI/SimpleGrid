# SimpleGrid — Audit Fixes (status as of 2026-05-22)

Status legend: ✅ done · ⏳ in progress / propagating · ⚠ partially done · ✗ not started

| # | Item | Status | Notes |
|---|---|---|---|
| 1 | **DMARC** record | ⏳ Akash added, propagating | Currently `v=DMARC1; p=none;`. Works once visible at public resolvers (5–60 min). Improvement listed below. |
| 2a | **CAA**: Let's Encrypt allow | ✅ Live | `0 issue "letsencrypt.org"` |
| 2b | **CAA**: Wildcard restriction | ⚠ Wrong syntax — fix below | Currently `0 issue "issuewild"` (meaningless). Should be `0 issuewild ";"`. |
| 3 | **DNSSEC** enable | ✅ Done | Verified at the resolver (AD flag = true). |
| 4 | **GSC verification TXT** | ✅ Live in DNS | `google-site-verification=B2nmqaC6aEHurX8osZ0fyteLkO4Tv7OhxDJwBYIxbSs`. Akash still needs to click "Verify" in https://search.google.com/search-console and submit `sitemap.xml`. |
| 5 | **Bing IndexNow** | ✅ Done | Key file at `/51b7850341ac46588816ba0e0764d3df.txt`. 36 URLs already pinged. |
| 6 | **Tighten SPF** (`~all` → `-all`) | ✗ Pending — do LAST | Wait 2 weeks after DMARC is stable + monitored. |
| 7 | **Cloudflare in front** | ✗ Optional — large enterprise-trust win | Adds security headers, Brotli, HTTP/3. See section below. |
| 8 | **WebP image conversion** | ✗ Optional | og-card.jpg + elite-factory.jpeg. Use squoosh.app. |
| 9 | **GTM** container | ✗ Pending Akash | Send me GTM-XXXXXXX, I add to all pages. |
| 10 | **CookieYes** banner | ✗ Pending Akash | Send me the script tag. |
| 11 | **Google Ads conversion tag** | ✗ Pending Akash | Send me AW-XXXXXXXXXX + Conversion Label. |
| 12 | **Termly Privacy + Terms** | ✗ Pending Akash | Paste me the generated text. |

---

## Active issue — fix CAA #2 (5 minutes, Namecheap)

The second CAA record is currently `0 issue "issuewild"` which is malformed (`issue` is the tag; there's no CA named "issuewild"). Wildcard certs are not actually restricted right now.

**To fix:**

1. Namecheap → Domain List → simplegrid.ai → Manage → Advanced DNS.
2. **Delete** the row that reads `CAA Record · @ · 0 issue "issuewild"`.
3. **Add new CAA record** in its place:
   - **Type:** CAA Record
   - **Host:** `@`
   - **Value:** `0 issuewild ";"` (semicolon in double-quotes)
   - **TTL:** Automatic

If Namecheap shows individual sub-fields for CAA (Flags / Tag / Value):
- **Flags:** `0`
- **Tag:** `issuewild` (different from `issue` — pick from the dropdown)
- **Value:** `;` (just a semicolon)

Verify after save:
```
curl -sS "https://dns.google/resolve?name=simplegrid.ai&type=CAA"
```

Expect to see BOTH `issue "letsencrypt.org"` AND `issuewild ";"`.

---

## Recommended improvement — add DMARC reporting address

Current DMARC: `v=DMARC1; p=none;`

That works (monitor-only mode, no quarantine action) but you'll never SEE which senders are passing/failing because there's no aggregate-report address. **Edit the TXT record to:**

```
v=DMARC1; p=none; rua=mailto:dmarc-reports@simplegrid.ai; pct=100
```

Or use a free DMARC aggregator inbox like Postmark's free DMARC monitoring (`rua=mailto:report@dmarc-tool.com` after signup at https://dmarc.postmarkapp.com — free, gives you a dashboard instead of raw XML files).

Without `rua=`, you won't know when it's safe to move from `p=none` → `p=quarantine` → `p=reject`. With reports, after ~2 clean weeks you can promote the policy.

---

## What's left for YOU (in priority order)

1. **Fix CAA #2** above (5 min, Akash).
2. **Click "Verify" in Google Search Console** (you, 1 min — the TXT is already live so it should pass instantly) → then submit sitemap → then in Bing WMT click "Import from GSC".
3. **Add `rua=` to the DMARC record** (Akash, 2 min — paired with step 1).
4. **Wait ~24 hours** for DMARC reports to start flowing in.
5. After 2 weeks of clean DMARC reports → promote `p=none` → `p=quarantine`.
6. After 2 more weeks of clean quarantine → SPF `~all` → `-all` AND DMARC `p=quarantine` → `p=reject`.
7. **Optional now, high enterprise-trust win:** Cloudflare in front of GitHub Pages.

---

## (Optional) Cloudflare in front

**Why it matters:** GitHub Pages doesn't let you set custom response headers, doesn't ship Brotli, and offers no edge WAF. Cloudflare (free) adds:
- **Brotli** compression → 1–3 KB saved per text response.
- **Security headers** via Response Header Transform Rules: X-Frame-Options, Permissions-Policy, Referrer-Policy, X-Content-Type-Options.
- **HSTS preload** with proper `includeSubDomains; preload` (Cloudflare has a dedicated UI for this — not a transform rule).
- **HTTP/3 (QUIC)** out of the box.
- **DDoS protection** + edge rate-limiting.

Each closes a row in every enterprise security questionnaire.

### Setup (15–20 minutes, current Cloudflare UI 2026)

#### Phase 1 — Onboard the zone
1. Sign up free at https://dash.cloudflare.com.
2. Click **Add a site** → enter `simplegrid.ai` → choose the **Free** plan.
3. Cloudflare scans your existing DNS records and proposes them. **Verify ALL of these are in the proposed list before continuing**:
   - `MX @ 1 smtp.google.com`
   - `TXT @ v=spf1 include:zoho.in include:spf.efwd.registrar-servers.com ~all`
   - `TXT @ zoho-verification=zb37948928.zmverify.zoho.in`
   - `TXT @ google-site-verification=B2nmqaC6aEHurX8osZ0fyteLkO4Tv7OhxDJwBYIxbSs`
   - `TXT _dmarc v=DMARC1; p=none;`
   - `TXT google._domainkey v=DKIM1; k=rsa; p=...` ← long DKIM string; without this your outbound email loses authentication
   - `CAA @ 0 issue "letsencrypt.org"`
   - `CAA @ 0 issuewild ";"` (after Akash fixes the syntax typo)
   - `A @ 185.199.108.153`, `A @ 185.199.109.153`, `A @ 185.199.110.153`, `A @ 185.199.111.153` (these are GitHub Pages' apex IPs)
4. If anything is missing, **add it manually in Cloudflare's DNS panel before proceeding**. (Click "Add record" at the bottom of the DNS list.)
5. Cloudflare gives you **2 nameservers** like `clay.ns.cloudflare.com` and `tess.ns.cloudflare.com`. Note these down.

#### Phase 2 — Switch nameservers at Namecheap
1. In Namecheap → Domain List → simplegrid.ai → **Manage** → click the **"Domain" tab** (NOT "Advanced DNS").
2. Scroll to the section labeled **"NAMESERVERS"**. (Not "Personal DNS Server" — that's a different thing further down.)
3. Change the dropdown from "Namecheap BasicDNS" to **"Custom DNS"**.
4. Two input fields appear. Paste Cloudflare's two nameservers.
5. Click the **green ✓** to save.
6. Back in Cloudflare → click **"Confirm nameservers"** / **"Check nameservers now"**. Cloudflare polls every few minutes; usually ACTIVE within 30 minutes (can take up to 24 hours).

#### Phase 3 — Configure security (after zone is ACTIVE)

##### 3a. Force HTTPS (do first, takes 30 sec)
1. Left sidebar → **SSL/TLS** → **Overview** → set encryption mode to **"Full (Strict)"**.
2. Left sidebar → **SSL/TLS** → **Edge Certificates** → toggle ON:
   - ✓ **Always Use HTTPS**
   - ✓ **Automatic HTTPS Rewrites**
   - ✓ **Opportunistic Encryption**

##### 3b. HSTS via the dedicated UI (NOT a transform rule)
1. Still in **SSL/TLS → Edge Certificates** → scroll to **"HTTP Strict Transport Security (HSTS)"** → click **Enable HSTS**.
2. Cloudflare shows a warning ("If misconfigured, this can break HTTPS on your site"). Read it. Then set:
   - **Max Age Header (max-age):** `12 months` (one year — produces `max-age=31536000`)
   - **Apply HSTS policy to subdomains (include subDomains):** **ON**
   - **Preload:** **ON**
   - **No-Sniff Header:** ON (this adds `X-Content-Type-Options: nosniff` so you don't need a separate transform rule for it).
3. Click **Save**.

Cloudflare now serves HSTS with the correct preload-ready value. You can later submit `simplegrid.ai` to https://hstspreload.org (do this only after HSTS has been stable for at least a week and you're sure no subdomain needs HTTP).

##### 3c. Other security headers via Transform Rules
The 2026 Cloudflare UI moved Transform Rules. Path:

1. Left sidebar → **Rules** → **Transform Rules** (or in some accounts, **Rules → Overview** → then click "Create Transform Rule" → choose "Modify Response Header").
2. Click the **"Modify Response Header"** tab at the top of the Transform Rules page.
3. Click **+ Create rule**.
4. **Rule name:** `Security headers`
5. **If** section → choose **"All incoming requests"** (the simplest match — applies to every response).
6. **Then** section → **"Modify response header"**. For each of the 4 headers, click **+ Add modification** and configure:

   | # | Action | Header name | Value |
   |---|---|---|---|
   | 1 | Set static | `X-Frame-Options` | `DENY` |
   | 2 | Set static | `Referrer-Policy` | `strict-origin-when-cross-origin` |
   | 3 | Set static | `Permissions-Policy` | `geolocation=(), microphone=(), camera=(), payment=(), interest-cohort=()` |
   | 4 | Set static | `Cross-Origin-Opener-Policy` | `same-origin-allow-popups` |

   (X-Content-Type-Options is handled by the HSTS panel's "No-Sniff" toggle — don't double up.)

7. **Deploy** the rule.

##### 3d. Optional but recommended toggles
- **Speed → Optimization → Brotli**: ON (some Cloudflare accounts have this on by default; verify).
- **Speed → Optimization → Auto Minify**: leave OFF (your assets are already small and minified; this can break SVGs).
- **Network → HTTP/2 to Origin**: ON.
- **Network → HTTP/3 (with QUIC)**: ON (usually on by default for free plans).
- **Network → 0-RTT Connection Resumption**: ON (faster repeat visits).

#### Phase 4 — Verify everything is working

From any terminal, after the zone is ACTIVE:

```bash
# Confirm Cloudflare is in front (Server: cloudflare)
curl -sI https://simplegrid.ai/ | grep -iE '^(server|strict|x-frame|x-content|referrer|permissions|cross-origin)'

# Confirm Brotli is being served
curl -sI -H "Accept-Encoding: br" https://simplegrid.ai/ | grep -i content-encoding
```

You should see:
- `Server: cloudflare`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(), microphone=(), camera=(), ...`
- `X-Content-Type-Options: nosniff`
- `content-encoding: br`

Run a full security-header report at https://securityheaders.com/?q=simplegrid.ai — should now grade **A** or better (was F before).

#### Phase 5 — Submit to HSTS preload list (optional, do later)

After HSTS has been live for at least 2 weeks and you've confirmed no subdomain or third-party integration breaks:
1. Go to https://hstspreload.org
2. Enter `simplegrid.ai`. Site runs automated checks against your HSTS header.
3. If all checks pass, submit. Domain gets baked into Chrome / Firefox / Safari source code. Removal takes ~6 months if ever needed — only submit when you're sure.

**Risk: low.** Rollback = change nameservers in Namecheap back to `dns1.registrar-servers.com` and `dns2.registrar-servers.com`. Cloudflare keeps your DNS records on file in case you re-activate later.

---

## (Optional) Convert hero images to WebP

`/assets/og-card.jpg` (100 KB) and `/assets/elite-factory.jpeg` (242 KB) — WebP would cut ~108 KB combined.

1. Go to https://squoosh.app.
2. Upload `assets/og-card.jpg` → choose WebP, quality 80 → download as `og-card.webp`.
3. Same for `assets/elite-factory.jpeg` → `elite-factory.webp`.
4. Copy both into `assets/` in the repo.
5. Tell me when done; I'll update the `<img>` tags + the `og:image` meta to use `<picture>` with JPEG fallback for older browsers.

---

## Quick re-verification commands

After each change, you can confirm from any terminal:

```
# DMARC
curl -sS "https://dns.google/resolve?name=_dmarc.simplegrid.ai&type=TXT" | python3 -m json.tool

# CAA
curl -sS "https://dns.google/resolve?name=simplegrid.ai&type=CAA" | python3 -m json.tool

# DNSSEC (look for "AD": true)
curl -sS "https://dns.google/resolve?name=simplegrid.ai&type=A&do=1" | python3 -m json.tool

# SPF + GSC + other TXT
curl -sS "https://dns.google/resolve?name=simplegrid.ai&type=TXT" | python3 -m json.tool
```

Or use the friendlier https://mxtoolbox.com — runs every check above in a browser.
