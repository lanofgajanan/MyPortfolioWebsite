# Session Notes

Running log of what was done in each working session on this site.
Newest entry first. Companion to `CHANGELOG.md` (which is the
release-oriented changelog); this file is the operational diary —
what was attempted, what worked, what broke, and how the site is
served.

## Session 3 — 2026-09-01 — Projects Tab, Aegis Integration, Scroll Fixes, Security & SEO

**Goal:** Add a high-tech Projects tab to the Obsidian Cyber Terminal portfolio, integrate the newly uploaded Aegis product webpage as a featured project with seamless Home navigation, fix viewport scrolling issues, harden security against sensitive file leaks, and optimize SEO.

### What was done
- **Aegis Product Ingestion:** Extracted and analyzed `website_stuff/aegis-docs.zip` containing the Aegis PRD, engine docs, and scroll-driven canvas teaser page.
- **HUD Navigation System:** Created `temp-site/app/src/components/HUDNavigation.tsx` for top-level cyberpunk tab switching (`[ 01 // OVERVIEW ]` and `[ 02 // PROJECTS ]`) with URL hash synchronization (`#overview`, `#projects`, `#aegis`) and browser history handling.
- **Projects Matrix:** Created `temp-site/app/src/components/ProjectsView.tsx` with a single focused showcase card for **Aegis** with capabilities (`Private DNS`, `Personal Cloud`, `Remote Access`, `Mini-PC Box`), status tags, and action triggers.
- **Aegis Full Experience Port:** Created `temp-site/app/src/components/aegis/AegisCanvasTerrain.tsx` and `AegisProjectView.tsx` implementing the scroll-driven 2D perspective canvas terrain grid, terminal diagnostics block (`root@aegis:~$ status`), capability list, and minimal home navigation button.
- **Bug 1 Fix (Main Terminal Viewport Scroll):** Root caused and resolved unwanted scrolling on the Overview and Projects views by enforcing strict viewport height locking (`h-screen h-[100dvh] max-h-screen overflow-hidden`) and removing the mobile `@media (max-width: 640px) { body { overflow-y: auto; } }` rule.
- **Bug 2 Fix (Aegis Page Scroll Lock):** Removed global `overflow-hidden` from `body` in `index.html` and implemented dynamic viewport scroll management in `App.tsx` (`overflowY: auto` on document/body when viewing Aegis) so the full page and canvas terrain physics scroll naturally and smoothly.
- **Security & Privacy Audit:** Hardened `.gitignore` against private keys (`*.key`, `*.pem`, `*.cert`), VPN profiles (`*.ovpn`, `*.conf`), and environment files (`.env*`). Ran secret scans across the repo — zero secrets found. `npm audit` returned 0 vulnerabilities.
- **SEO & Structured Data:** Enhanced title, description, keywords, canonical URLs (`https://lanofgajanan.pp.ua/`), Open Graph tags, Twitter cards, and Schema.org JSON-LD structured data (`Person`, `WebSite`, `Product`). Updated `sitemap.xml` with the latest timestamp and `/aegis/` route.
- **Standalone Static Route:** Deployed standalone static page at `temp-site/aegis/index.html` with matching top Home header.
- **Build & Deploy:** Rebuilt production bundle via `npm run build` and synced new assets (`index-CF_GE9Uk.js`, `index-C6KJVl1p.css`) and `index.html` directly to the `temp-site/` root directory.
- **Version Control:** Pushed commits `8eef798` and `1ecf434` to `origin/main` on GitHub (`lanofgajanan/MyPortfolioWebsite.git`).

### Notes / Gotchas
- When adding future views/routes, ensure `App.tsx`'s view-based scroll controller (`overflow-hidden` vs `overflow-y-auto`) matches whether the view is a single-screen HUD terminal or a long-form scrollable document.
- Root `.gitignore` explicitly prevents accidental commits of server private keys or VPN configurations residing in the user's home directory.

---

## Session 2 — 2026-08-21 — Footer version correction + session-notes process

**Goal:** Fix a CHANGELOG/source mismatch the previous session
introduced, and establish the habit of writing a session notes file.

### What was done
- Caught that `CHANGELOG.md` (v2.0.0) claimed the footer read
  `OBSIDIAN_TERMINAL v2.0.0`, but the actual source `app/src/App.tsx`
  still had the AI Studio default `v1.0.0`. The CHANGELOG was right about
  intent, the code was stale.
- Fixed `app/src/App.tsx` footer tag: `v1.0.0` → `v2.0.0`.
- Rebuilt (`npm run build`) → new JS chunk hash
  `index-BxwcSrQn.js` → `index-Cy41a52h.js`.
- Redeployed built output to repo root (`index.html` + `assets/`).
  The `cp -r dist/assets ../assets` replaced the whole directory, so the
  stale old bundle was removed automatically.
- Verified live: `https://lanofgajanan.pp.ua/` now references
  `assets/index-Cy41a52h.js` (200, correct MIME). Old bundle no longer
  on disk.
- Created `SESSION_NOTES.md` (this file) as the per-session diary.
- No commit pushed yet for this session at time of writing.

### Notes / gotchas
- **Vite content hashing:** editing any source file changes the JS
  chunk hash. Always rebuild + copy `dist/` → root after source edits;
  do not hand-edit the built `assets/*.js`.
- The nginx container is a **read-only bind mount** of `~/temp-site`, so
  file changes are reflected live without a restart — but the container
  does not garbage-collect old files you delete on the host, so remove
  stale bundles explicitly when swapping hashes.

---

## Session 1 — 2026-08-21 — v2.0.0 redesign: static page → Obsidian Cyber Terminal & HUD

**Goal:** Replace the v1.x single-file "Coming Soon" page with the new
React + Vite + Tailwind "Obsidian Cyber Terminal & HUD" design from
`website_stuff/`, while preserving the existing SEO/structured-data
infrastructure, and deploy it live.

### Context discovered
- **Hosting:** `nginx:alpine` Docker container (`temp-site`, port 8081)
  bind-mounts `~/temp-site` **read-only** at `/usr/share/nginx/html`.
  Nginx Proxy Manager (`nginxproxymanager`) terminates TLS for
  `lanofgajanan.pp.ua` and proxies to it over the `web` Docker network.
- **Version control:** GitHub remote
  `lanofgajanan/MyPortfolioWebsite.git` (token-embedded URL).
- **Prior state (from CHANGELOG):** v0.1.0 → v1.2.0, a single static
  `index.html` cyberpunk page with SEO meta, OG/Twitter, JSON-LD,
  robots/sitemap, 404, mobile + reduced-motion handling.

### What was done
1. **Sourced the new design** from `/home/ubuntu/website_stuff/extracted`
   (unpacked from `obsidian-cyber-terminal-&-hud (1).zip`) — a React 19
   + Vite 6 + Tailwind v4 app exported from Google AI Studio.
2. **Placed source in `app/`** so the Vite entry `app/index.html` does
   not collide with the served root `index.html`, and the design stays
   reproducible from source.
3. **Merged existing SEO into `app/index.html`** before building:
   - `<title>`, description, robots, theme-color (`#09090b`),
     apple-mobile-web-app tags, canonical, SVG favicon.
   - Open Graph + Twitter card meta.
   - JSON-LD Person structured data (schema.org).
   - Restyled `<noscript>` fallback matching the new HUD theme.
   - Kept the new design's Google Fonts (Geist, Geist Mono, Orbitron,
     Share Tech Mono).
4. **Trimmed `app/package.json`** to only deps the components actually
   import (react, react-dom, tailwindcss, vite, plugin-react,
   typescript, @types/react, @types/react-dom). Dropped unused AI
   Studio deps: `@google/genai`, `express`, `motion`, `lucide-react`,
   `dotenv` — leaner, faster, fewer vulnerability surfaces.
5. **Built** (`npm install` + `npm run build`) — 34 modules, clean.
   Built output emits root-relative `/assets/...` paths (correct for
   the nginx root mount).
6. **Deployed built artifacts to repo root:** `app/dist/index.html` →
   root `index.html`; `app/dist/assets/` → root `assets/`. Read-only
   mount → live immediately, no container restart needed.
7. **Restyled `404.html`** to the new palette ("SIGNAL LOST // This
   sector does not exist.").
8. **Updated `.gitignore`** to ignore `app/node_modules/`,
   `app/dist/`, and `*.bak`; the built root `assets/` + `index.html`
   remain committed as the deployable output.
9. **Updated `CHANGELOG.md`** with a full v2.0.0 entry and a
   `[2.0.0]` compare link; corrected the "single-file static page"
   note in the agent-notes section.
10. **Verified live:** `https://lanofgajanan.pp.ua/` returns 200 with
    the new title, `<div id="root">` (React mount), JS + CSS bundles
    200 with correct MIMEs.
11. **Committed + pushed** to GitHub `main` — commit `1c0ebe8`.
12. Kept `index.html.v1.bak` (gitignored) as a local backup of the
    v1.x page.

### New interactive features (from the design)
- Canvas glitch background warping a cyber grid around the cursor +
  glitch-slice sparks on movement (`InteractiveGlitchBackground`).
- Chromatic RGB-split glitch hero title + typewritten status beacon
  (`GlitchHeroText`).
- Segmented, colour-graded (emerald→violet→cyan) progress bar with
  telemetry sub-labels (`SegmentProgressBar`).
- Four-corner live HUD cursor-telemetry (GPS-style coords + hex)
  (`HUDCornerTelemetry`).
- CRT scanline overlay + animated scanline sweep.
- Web Audio ambient glitch blips (`src/utils/audio.ts`), autoplay-
  policy safe.
- `CyberVortex.tsx` is in source but unused by `App.tsx` (retained).

### How to rebuild (for future sessions)
```bash
cd /home/ubuntu/temp-site/app
npm install        # first time only
npm run build      # → app/dist/
cp app/dist/index.html ../index.html
rm -rf ../assets && cp -r app/dist/assets ../assets
# site is live immediately (read-only nginx mount); verify:
curl -s https://lanofgajanan.pp.ua/ | grep -oE 'assets/index-[A-Za-z0-9]+\.js'
```
Do **not** add a `base` path to `vite.config.ts` — the build must
emit root-relative `/assets/...` for the nginx root mount.

### What was NOT done / deferred
- No GitHub Pages / CI build action added (deploy is the nginx
  container, not Pages). Source lives in `app/`; built artifacts are
  committed to root for the container to serve.
- `CyberVortex.tsx` left in source but not wired into the app.
- `index.html.v1.bak` left on disk (gitignored); safe to delete once
  the v2.0.0 deploy is confirmed stable.

---

## Session 3 — 2026-08-21 — Mobile-friendly redesign (v2.1.0) + Audio Removal

**Goal:** Fix mobile clipping, layout collisions, and remove unused audio engine.

### What was done
- **Removed Audio:** Deleted `app/src/utils/audio.ts` and stripped all sound triggers from `GlitchHeroText.tsx`.
- **Structural Layout:** Changed `main` from `h-screen` to `min-h-screen` and enabled vertical scrolling on `body` for mobile.
- **HUD Telemetry:** Collapsed the four absolute HUD corners into a single compact mobile chip under 640px to prevent collisions.
- **Fluid Title:** Switched hero title to `clamp()` typography with tighter tracking on mobile so it never overflows.
- **Progress Bar:** Made segments shrink (`w-1.5`) and the track scroll-safe on small screens.
- **Footer:** Fixed footer to sit at the end of the content flow on mobile instead of floating over UI.

### Results
- Site is now fully responsive down to 360px without content clipping or HUD overlap.
- Rebuilt (`npm run build`) and redeployed.
- Live bundle: `assets/index-C6-FXoxz.js`.

### Commit and Push
- Committed as `feat: v2.1.0 mobile responsiveness + remove audio`.
- Pushed to GitHub `main`.
