# mahiuddin.com — Portfolio Website (static, no build step)

A complete personal website for **Mahiuddin Mahi — SEO &amp; Contextual Link Building Specialist**: the professional
site is English-only, and `/bn/` is a separate Bangla personal blog (travel and everyday writing, not service pages).

Pure HTML5 + CSS3 + vanilla JavaScript. No WordPress, no React, no Node.js build, no database, no paid plugins.
Upload it as-is to GitHub Pages, Cloudflare Pages, or any cPanel shared hosting.

---

## 1. What is inside

```
mahiuddin-website/
├── index.html                     English homepage (SEO &amp; link building)
├── about/index.html               About
├── services/index.html            6 services (with #anchors per service)
├── portfolio/index.html           4 labelled SAMPLE projects
├── contact/index.html             Contact form (mailto / optional form service)
├── blog/index.html                English article listing
├── blog/contextual-link-insertion/index.html   English article
│
├── bn/index.html                  বাংলা personal blog — post listing (home of the blog)
├── bn/<slug>/index.html           প্রতিটি বাংলা post: একটা folder = একটা post
│                                  যেমন bn/tilottama/index.html → mahiuddin.com/bn/tilottama/
│
├── assets/
│   ├── css/style.css              One stylesheet (mobile-first, 17 labelled sections)
│   ├── js/config.js               ← EDIT THIS FILE: email, Fiverr, socials, form endpoint
│   ├── js/main.js                 Nav, scroll effects, TOC, contact form logic
│   ├── icons/favicon.svg
│   └── images/                    og-image.png, profile placeholder
│
├── sitemap.xml                    All 8 URLs (7 English + বাংলা blog home)
├── robots.txt
├── 404.html
├── .nojekyll                      GitHub Pages: skip Jekyll
├── .htaccess                      Only used on Apache/cPanel hosting
└── README.md                      This file
```

**How the site behaves with JavaScript off:** every page is still fully readable and every link works.
JavaScript only adds the mobile menu animation, header shadow, table-of-contents highlighting, and the contact form helper.

---

## 2. ⚠️ Before you publish — replace these (5 minutes)

Open **`assets/js/config.js`** first. It is the only file you *must* edit.

| # | What | Where | Look for |
|---|------|-------|----------|
| 1 | **Email address** | `assets/js/config.js` | `email: "hello@mahiuddin.com"` |
| 2 | Same email, hard-coded fallbacks | every `*.html` (search-replace) | `hello@mahiuddin.com` — appears in `mailto:` links and in the JSON-LD on the About page. Do one project-wide find &amp; replace so the markup and the config agree. |
| 3 | **Fiverr profile URL** | `assets/js/config.js` | `fiverrUrl: ""` |
| 4 | LinkedIn / X / GitHub / WhatsApp | `assets/js/config.js` | `linkedinUrl`, `twitterUrl`, `githubUrl`, `whatsappNumber` — leave `""` and the button disappears automatically |
| 5 | **Profile photo** | `assets/images/` | Add `profile.jpg` (square or 4:5, ~800px wide, under 150 KB). Then in `about/index.html` and the blog pages, replace the `profile-placeholder.svg` `<img>` (an HTML comment shows the exact replacement line). |
| 6 | **Social preview image** | `assets/images/og-image.png` | A real 2400×1260 PNG is included (2× of the usual 1200×630). Replace it with your own design if you want; keep the same ratio. Your export can be smaller — aim for under 300 KB. |
| 7 | Availability line | `index.html` | "Available for new projects" — change if you are full |
| 8 | Form handling (optional) | `assets/js/config.js` | `formEndpoint: ""` → see section 5 |

**Still true after publishing?** Nothing in the site invents clients, testimonials, rankings, revenue, or years of
experience. The portfolio projects are labelled *Sample Project* everywhere they appear. If you later add real client
work, get permission first and only show numbers you can prove.

---

## 3. Preview it on your computer

⚠️ **Do not just double-click `index.html`.** All links are *root-relative* (`/assets/...`, `/about/`), which is what a
real domain uses. On your desktop, double-clicking opens `file:///C:/...` and the browser looks for `C:\assets\...`, so
the page appears unstyled. It is not broken — it just needs a small local web server.

Easiest options:

- **VS Code** → install the free "Live Server" extension → right-click `index.html` → *Open with Live Server*.
- **Python** (if installed) → inside the `mahiuddin-website` folder run: `python -m http.server 8000` → open <http://localhost:8000>.
- **Skip local preview** and deploy first (section 4). It takes about 10 minutes and you get the same result.

---

## 4. Deploy free and connect `mahiuddin.com`

### Option A — GitHub Pages (recommended: free, forever, no card)

**A1. Put the files on GitHub**
1. Create a free account at [github.com](https://github.com) and verify your email.
2. Click the **+** (top-right) → **New repository**.
3. Repository name: `portfolio` (any name works — the custom domain overrides it). Keep it **Public**. Click **Create repository**.
4. On the empty repository page click **uploading an existing file**.
5. Drag **the contents of** the `mahiuddin-website` folder (not the folder itself) into the browser.
   ✅ Check: the first row of files must be `index.html`, `about`, `services`, `assets`, `sitemap.xml`, `robots.txt`.
   ❌ If you see one folder called `mahiuddin-website`, you dragged the folder — the site would then live at `/mahiuddin-website/`.
6. Scroll down → **Commit changes**.

**A2. Turn Pages on**
1. Repository → **Settings** → left menu **Pages** → **Build and deployment**.
2. Source: **Deploy from a branch**. Branch: `main` / `/ (root)` → **Save**.
3. Wait ~1 minute. Refresh. You see `https://<your-username>.github.io/` — that is the live site.

**A3. Connect your own domain**
1. In GitHub: **Settings → Pages → Custom domain** → type `mahiuddin.com` → **Save**. (Leave "Enforce HTTPS" off until the domain works.)
2. Now go to where your domain's **DNS** is managed. That is either:
   - your **domain registrar** (Namecheap, GoDaddy, Hostinger… — wherever you bought `mahiuddin.com`), or
   - **Cloudflare** if you already moved the nameservers there.
3. Add these records (delete any old `@` records that pointed elsewhere):

   | Type | Name / Host | Value |
   |------|-------------|-------|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `<your-username>.github.io` |

   (If your control panel will not accept an `@` A record, use your domain's apex with a "CNAME flattening" provider such as Cloudflare.)
4. **Wait for DNS**: a few minutes to a few hours. Check at [dnschecker.org](https://dnschecker.org).
5. Back in GitHub: **Settings → Pages** → when the domain shows a green tick, tick **Enforce HTTPS** → Save.
   If HTTPS stays pending, click **Edit** next to the domain and save it again (this asks GitHub to re-issue the certificate).
6. Open `https://mahiuddin.com` — done.

**A4. Editing the site later**
Open the file on github.com → pencil icon (**Edit this file**) → change text → **Commit changes**. GitHub re-publishes in about a minute.
You never need Git commands.

### Option B — Cloudflare Pages (also free; great if your DNS is already on Cloudflare)

1. Create the GitHub repository exactly as in A1.
2. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers &amp; Pages** → **Create** → **Pages** → **Connect to Git** →
   authorise GitHub → pick your repository.
3. Build settings: **Framework preset: None**, **Build command: (leave empty)**, **Build output directory: (leave empty)** —
   because the files are already plain HTML.
4. **Save and Deploy**, then **Custom domains → Set up a domain** → `mahiuddin.com`.
   Cloudflare adds the DNS records and the SSL certificate for you if the domain is on Cloudflare.
5. Every future `git push` redeploys automatically.

### Option C — Shared hosting (cPanel)

1. cPanel → **File Manager** → open `public_html`.
2. Zip the **contents** of `mahiuddin-website` on your computer, **Upload** the zip into `public_html`, then **Extract**.
3. Confirm `public_html/index.html` exists (not `public_html/mahiuddin-website/index.html`).
4. In cPanel → **Domains** (or **SSL/TLS Status**) → run **AutoSSL** for `mahiuddin.com`, and enable **Force HTTPS**.
5. Point the domain at the host's nameservers if it does not already.
6. The `.htaccess` file in this project is for this setup — the HTTPS and www blocks are commented out; uncomment what you need.

---

## 5. The contact form (be honest about how it works)

This site has **no server and no database**, so a form submission cannot be stored here. The form is built to say that
openly instead of faking a success message.

**Default (works instantly, zero setup):** pressing *Send enquiry* validates the fields, then opens the visitor's own
email app with everything pre-filled, and shows the exact message on screen so they can copy it if the app did not open.
The email goes to `email:` in `config.js`. Nothing is stored on the website.

**If you want submissions delivered to your inbox without your address being harvested:** connect a free form service.
Pick one, follow its signup, then paste the endpoint into `config.js` as `formEndpoint`.

| Service | Free tier | Setup | What to paste in `config.js` |
|---------|-----------|-------|------------------------------|
| **Formspree** | ~50 submissions/month | create form → get a form ID | `https://formspree.io/f/xxxxxx` |
| **FormSubmit** | unlimited-ish, no account | just use your email; first submission sends a confirmation link you must click | `https://formsubmit.co/you@mahiuddin.com` |
| **Web3Forms** | ~200/month | get an `access_key` from web3forms.com | `https://api.web3forms.com/submit` **and** put the key in `formAccessKey` |

Once `formEndpoint` is not empty, `main.js` posts to it with `fetch` and reports the **real** result — including the
HTTP status if the service fails, plus your email as the backup. Test it yourself once after connecting.

Anti-spam: the form has a hidden honeypot field (`company`). Bots fill it, humans never see it. Most form services
discard those submissions automatically.

---

## 6. Adding a new post

Two kinds of writing live on this domain, kept apart on purpose:

| What | Folder | Language | Listed on |
|------|--------|----------|-----------|
| SEO / link building guide | `blog/<slug>/` | English | `blog/index.html` |
| Personal writing (travel, everyday) | `bn/<slug>/` | Bangla | `bn/index.html` |

### 6.1 English SEO article

Copy this pattern — it is exactly how the shipped article is built.

1. Create `blog/<slug>/index.html` (copy `blog/contextual-link-insertion/index.html` into the new folder).
2. Change in the copy:
   - visible text, `<title>` (≤ 60 chars), `meta description` (≤ 160 chars)
   - `canonical` → the new URL
   - Open Graph + Twitter tags, `article:published_time`, `article:modified_time`
   - the `BlogPosting` JSON-LD: `headline`, `datePublished`, `dateModified`, `image`
   - the `.toc` links and matching `<h2 id="...">` ids, breadcrumbs, author card, share links, related reading
   - reading time: total visible words ÷ 200, rounded
3. Add the post card to `blog/index.html` (newest first).
4. Add the URL to `sitemap.xml` and bump `<lastmod>`.
5. If a post has a photo, put it in `assets/images/` and always write a descriptive `alt` — not "image".

### 6.2 Bangla personal post

1. Create the folder `bn/<slug>/` — lowercase English slug, hyphens instead of spaces (`bn/tilottama/`).
2. Copy an existing page into that folder as `index.html`. Until the first post exists, copy `bn/index.html`;
   then ask for it to be turned into a post page (the listing card markup and the empty-state box come out,
   a `BlogPosting` block goes in).
3. Keep `<html lang="bn">`, `og:locale` = `bn_BD`, Noto Sans Bengali `<link>`, and the `/assets/...` paths unchanged.
4. Add the post card to `bn/index.html` (newest first) and add the URL to `sitemap.xml`.

Rules that keep the SEO correct:
- **No `hreflang` anywhere.** The Bangla blog is not a translation of the English site, so pairing them would be a lie
  to Google. Each page only declares its own `canonical`.
- One URL per page, one language per page — no mixed-language paragraphs.
- Never publish a number, ranking, client name or date you cannot prove. Sample work stays labelled *Sample Project*.

---

## 7. Editing text and colours

- **Copy**: every page is plain HTML. Edit the words between the tags, keep the tags.
- **Nav / footer**: repeated inside each HTML file on purpose (static sites have no template engine). If you rename a
  page, update it in all pages — search for the old label.
- **Colours and spacing**: all defined once at the top of `assets/css/style.css` under `:root`.
  Change `--accent` to shift every emerald element at once; `--navy-900`/`--navy-950` control the background.
- **Service blocks**: `services/index.html` — each service is one `<article class="service-block" id="...">`.
  Copy a block to add a seventh service; keep the `id` in Latin lowercase-hyphens so homepage links still work.
- **Text written by JavaScript** (button labels, "Copied", form validation and status messages): these are not in the
  HTML. They live in the `I18N` object at the top of `assets/js/main.js` — `I18N.en` for English pages, `I18N.bn` for
  `/bn/` pages. The language is chosen automatically from `<html lang="...">`, so editing one key fixes every page.
- **Portfolio samples**: `portfolio/index.html` — each is `<article class="work-card">` with a `.sheet` table mockup.
  Replace the demo table with a real screenshot later:
  ```html
  <img src="/assets/images/case-one.png" alt="Link insertion tracker delivered to a client, redacted" width="1200" height="600" loading="lazy">
  ```

---

## 8. Search Console &amp; getting found

1. [search.google.com/search-console](https://search.google.com/search-console) → **Add property** → choose **Domain** →
   type `mahiuddin.com`.
2. Google shows a **TXT record** — add it in your DNS exactly as shown (Name: `@` or `_googleverification...`, Value: the long code).
   Prefer the quicker **URL prefix** method instead? Copy the `<meta name="google-site-verification" ...>` tag into the
   `<head>` of `index.html` and commit.
3. Verify (it can take minutes to hours), then **Sitemaps** → enter `sitemap.xml` → **Submit**.
4. **URL Inspection** → paste `https://mahiuddin.com/` → **Request indexing**. Repeat for `/services/` and `/contact/`.
   Do not submit all 8 pages at once; Google crawls fine on its own.
5. Also submit to [bingwebmasters.microsoft.com](https://bingwebmasters.microsoft.com) — it takes 2 minutes and Bing feeds
   ChatGPT's answers.
6. After ~2–4 weeks check **Pages → Indexed** and see which queries bring impressions. That data is worth more than guessing.

**Benchmarks this site already meets:** one blocking CSS file, two deferred scripts, no images over the fold, no layout
jank (`width`/`height` set on images), lazy-loading below the fold, system-grade font loading with `display=swap`,
semantic landmarks (`header`/`nav`/`main`/`footer`), keyboard-focus styles, a skip link, `prefers-reduced-motion` support,
and accessible colour contrast on the navy background.

**Optional speed tweak:** the fonts come from Google Fonts (one extra request). To self-host, download the `.woff2`
files into `assets/fonts/` and replace the `<link>` in each page with an `@font-face` block in `style.css`. Not needed
on day one.

---

## 9. If something looks wrong

| Symptom | Cause / fix |
|---------|-------------|
| Page loads with no styling | You double-clicked `index.html`. Use a local server (section 3) or deploy. |
| Everything 404s on GitHub Pages | You uploaded the *folder* instead of its *contents*, so the repo root is empty. Move files up one level. |
| Works on `username.github.io/repo/` only | Root-relative paths need a domain root. Custom domain is required — this is deliberate, it keeps canonical URLs clean. |
| Domain shows "Old format or invalid source" | Wait for DNS, then re-save the custom domain in GitHub Settings → Pages. |
| HTTPS lock missing | Tick **Enforce HTTPS** in GitHub Settings → Pages, or enable Universal SSL in Cloudflare. |
| Form says "could not be reached" | The service is not confirmed yet (FormSubmit emails a confirmation link) or the endpoint is mistyped in `config.js`. |
| Bangla looks like boxes ☐☐☐ | The Bangla pages load Noto Sans Bengali. Check that you did not delete the fonts `<link>` on that page. |
| Bengali version shows English button labels | `data-site="role"` was accidentally added to a Bangla page. Remove it — main.js replaces that element's text with the English value from `config.js`. |

---

## 10. দ্রুত শুরু (বাংলা সংক্ষেপ)

1. `assets/js/config.js` ফাইলে তোমার **email** আর **Fiverr URL** বসাও। এটাই আসল কাজ।
2. `hello@mahiuddin.com` টেক্সটটা সব HTML ফাইলে Search → Replace করে নিজের ইমেইল দিয়ে দাও (JSON-LD-তেও আছে)।
3. GitHub-এ repo বানাও → `mahiuddin-website` ফোল্ডারের **ভেতরের ফাইলগুলো** (ফোল্ডারটা নয়) drag &amp; drop করো → Commit।
4. Settings → Pages → Branch: `main` / `/ (root)` → Save। এরপর Custom domain-এ `mahiuddin.com` লেখো।
5. DNS-এ ৪টা A record (GitHub-এর IP) + `www` CNAME বসাও → সবুজ টিক দেখলে **Enforce HTTPS** on।
6. Search Console-এ Domain property Add → TXT record দাও → `sitemap.xml` Submit করো।
7. Form এখন mailto হিসেবে কাজ করবে (কোনো ডেটাবেস নেই, সাইট কিছু store করে না)। চাইলে FormSubmit/Formspree-এর
   endpoint `config.js`-এ বসাও — তাহলে সরাসরি ইনবক্সে আসবে।
8. নতুন English SEO article: `blog/slug/index.html`। নতুন বাংলা personal post: `bn/slug/index.html` (section 6 দেখো)।
   দুটোর একটাই `sitemap.xml`-এ URL যোগ করো — `hreflang` আর দিতে হয় না, কারণ বাংলা ব্লগ English সাইটের অনুবাদ না।

---

## 11. Licence / credit

Everything in this folder is written for you to own and publish. Free icon graphics are inline SVG paths drawn in the
markup, so there is no icon library to license and nothing to attribute.
