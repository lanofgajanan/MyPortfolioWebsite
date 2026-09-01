# Changelog

All notable changes to this site. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This file is intended to be human- and agent-readable — semantic versioning, dated entries,
and references to commit hashes where relevant.

## [Unreleased]

## [2.2.0] - 2026-09-01
### Added
- **HUD Navigation Bar (`HUDNavigation.tsx`)**: Top-level cyberpunk tab selector allowing users to switch between `[ 01 // OVERVIEW ]` and `[ 02 // PROJECTS ]` with deep-link hash routing (`#overview`, `#projects`, `#aegis`).
- **Projects Matrix (`ProjectsView.tsx`)**: Single-project showcase focused exclusively on **Aegis**.
- **Aegis Project Experience (`AegisProjectView.tsx` & `AegisCanvasTerrain.tsx`)**: Full port and integration of the Aegis product page featuring its scroll-driven 2D perspective canvas terrain grid, terminal diagnostics block (`root@aegis:~$ status`), capability list, and responsive layout.
- **Home Navigation Buttons**: Added minimal cyberpunk top bar with `HOME` and `PROJECTS` return buttons on both the in-app Aegis view and the standalone `/aegis/index.html` static route.
- **Standalone Aegis Route**: Standalone static teaser page deployed to `/aegis/index.html`.

### Fixed
- **Single-Screen Scroll Lock**: Fixed issue where the main Overview and Projects tabs could sometimes scroll; strictly locked viewport to single page (`h-screen max-h-screen overflow-hidden`).
- **Aegis Page Scrolling**: Removed root document scroll lock when viewing the Aegis project page so the full page and canvas terrain physics scroll naturally and smoothly.
- **Project Catalog**: Cleaned up project list to keep strictly the single Aegis project without placeholders.

### Changed
- Rebuilt production bundle (`index-CF_GE9Uk.js` and `index-C6KJVl1p.css`) and synced to repository root.
- Integrated Google Fonts for `Space Grotesk` and `JetBrains Mono`.
### Added
- Mobile-first layout: stage now min-height + scroll-safe instead of a fixed h-screen clip.
- Mobile HUD chip: single compact telemetry display on small screens to prevent corner collisions.

### Changed
- Hero title fluid-scale `clamp()` + reduced mobile tracking so it never overflows.
- Progress bar shrinks segment pitch on mobile; frame handles small widths.
- Footer becomes static + bottom-safe on mobile viewports.
- Removed ambient sound engine (Web Audio) as it was unused.

### Fixed
- Horizontal overflow on <400px screens.
- Content clipping on short mobile viewports.
- Collision of HUD corners on narrow displays.

## [2.0.0] - 2026-08-21
### Changed — full redesign
- Replaced the single-file static `index.html` "Coming Soon" page with the **Obsidian Cyber
  Terminal & HUD** — a React 19 + Vite 6 + Tailwind v4 single-page app built from the design
  in `app/` (Google AI Studio export).
- New interactive canvas glitch background that warps a cyber grid around the cursor and
  emits glitch-slice sparks on movement (`InteractiveGlitchBackground`).
- New centerpiece glitch title with chromatic RGB-split layers and a typewritten
  system-status beacon (`GlitchHeroText`), plus a segmented, colour-graded progress bar
  with telemetry sub-labels (`SegmentProgressBar`).
- New live four-corner HUD telemetry overlay showing cursor-derived GPS-style coordinates
  and hex codes (`HUDCornerTelemetry`).
- CRT scanline overlay + animated scanline sweep over the whole viewport.
- Web Audio API ambient sound engine (`src/utils/audio.ts`) for glitch blips on title
  bursts; gated behind a user-gesture-initiated AudioContext (autoplay-policy safe).
- Theme palette shifted from green/purple/red to emerald `#34d399` / violet `#a78bfa` /
  cyan `#38bdf8` on near-black `#09090b`.
- Footer tag updated to `OBSIDIAN_TERMINAL v2.0.0`.

### Architecture
- Source lives in `app/` (React + Vite + TypeScript + Tailwind). The deployable artifacts —
  `index.html` and `assets/` — are committed at the repo root so the nginx container serves
  them directly (it mounts this directory read-only at `/usr/share/nginx/html`).
- `app/package.json` trimmed to only the dependencies the components actually import
  (react, react-dom, tailwind, vite, plugin-react, typescript). Unused AI Studio deps
  (`@google/genai`, `express`, `motion`, `lucide-react`, `dotenv`) were dropped for a
  leaner, faster build. Dead component `CyberVortex` is retained in source but unused.

### Preserved (carried over from v1.x)
- All SEO/structured-data infrastructure from v1.0.0: `<meta description>`, robots, theme-color,
  Apple web-app tags, canonical URL, Open Graph + Twitter cards, JSON-LD Person, SVG favicon.
- `robots.txt`, `sitemap.xml` (unchanged — same canonical URL).
- `404.html` restyled to the new palette and "SIGNAL LOST" theme.
- `noscript` fallback restyled to match the new HUD theme.
- Mobile responsiveness, `prefers-reduced-motion`, and accessibility considerations
  (Tailwind handles base layout; reduced-motion still halts the CSS scanline/glitch keyframes).
- `.gitignore` updated: `app/node_modules/` and `app/dist/` are ignored; the built
  root `assets/` + `index.html` remain committed as the deployable output.

### Notes for Agents
- To rebuild after editing source: `cd app && npm install && npm run build`, then copy
  `app/dist/index.html` → root `index.html` and `app/dist/assets/` → root `assets/`.
- The build emits root-relative `/assets/...` paths, which is correct for the nginx root
  mount. Do not add a `base` path to `vite.config.ts`.
- `index.html.v1.bak` is a local backup of the v1.x page (gitignored via `*.bak`); delete
  once the v2.0.0 deploy is confirmed good.

## [1.2.0] - 2026-08-21
### Added
- Viewport-mode indicator in footer — shows "PC" or "MOBILE" next to the version tag,
  updating live on resize across the 480px breakpoint (JS-driven, via `#vp` span).
- `.vp` CSS class (small green text, 9px) for the viewport indicator.

### Changed
- Mobile `@media (max-width: 480px)` now sets `html, body { min-height: auto }` — prevents
  the 100vh min-height from forcing a large empty gap below short content on phones.
  Desktop keeps `min-height: 100vh` for true viewport-centered flex layout.
- Footer version tag bumped from v1.1 to v1.2.

### Fixed
- Vertical centering regression on desktop: earlier mobile fix used `min-height: 100%`
  (percentage, collapses to content height) instead of `100vh` (viewport height), causing
  the name + animation to shift to the top on PC. Fixed by using `min-height: 100vh` in the
  base rule, while the 480px media query overrides to `auto` for mobile safety.

## [1.1.0] - 2026-08-21
### Added
- Footer version tag (v1.1) — small purple superscript next to the domain.

### Fixed
- Mobile scroll safety: changed `overflow: hidden` → `overflow-y: auto` + `overflow-x: hidden`
  so content is never clipped on small/landscape viewports.

## [1.0.0] - 2026-08-21
### Added
- `<meta name="description">` — shows under the result in search engines.
- `<meta name="robots" content="index, follow">`.
- `<meta name="theme-color" content="#0a0a0d">` — mobile address/status bar matches background.
- `<meta name="apple-mobile-web-app-capable">` + status-bar-style.
- Canonical URL → `https://lanofgajanan.pp.ua/`.
- Open Graph + Twitter Card tags (rich link previews on social/messaging platforms).
- Inline SVG favicon (replaces blank browser tab icon).
- JSON-LD Person structured data (schema.org) in a `<script type="application/ld+json">` block.
- Crawlable fallback text: real `<p class="blurb">` + `<noscript>` variant.
- Robot meta + fallback content.

### Changed
- `html, body` now use `min-height: 100%` + scrollable instead of `overflow: hidden`
  (fixes content clipping on small/landscape mobile viewports).
- Added `-webkit-text-size-adjust: 100%` to prevent iOS text inflation.
- Added `@media (max-width: 480px)` pass (relaxed letter-spacing, static footer) so the
  title fits 360px-wide phones.
- Added `@media (prefers-reduced-motion: reduce)` — disables glitch/cursor animations for
  users who opt out (accessibility).
- Duplicate glitch layers now `aria-hidden` so screen readers read the name once.

### Added (repo root, served by GitHub Pages)
- `robots.txt` — allows crawling, references sitemap.
- `sitemap.xml` — canonical URL for search discovery.
- `404.html` — branded 404 matching the theme (replaces GitHub's default).

## [0.1.0] - 2026-08 (approx.)
### Added
- Initial "Coming Soon" cyberpunk landing page (`index.html`).
- `LICENSE` (MIT, Copyright (c) 2026 Gajanan Lohar).
- `.gitignore`.

---

## Notes for Agents
- Live URL: `https://lanofgajanan.pp.ua/` (custom domain; GitHub Pages configured).
- Repo: `lanofgajanan/MyPortfolioWebsite` on GitHub.
- The site is a built React SPA. Source is in `app/`; the committed deployable artifacts
  are `index.html` + `assets/` at the repo root, served by an nginx:alpine Docker container
  (mounted read-only) behind Nginx Proxy Manager for the custom domain `lanofgajanan.pp.ua`.
- Commit history in this repo is the source of truth for exact diffs; this file is a
  human/agent-readable summary.
- Do not add secrets/API keys to any file here (see security policy in prior edits).

[2.1.0]: https://github.com/lanofgajanan/MyPortfolioWebsite/compare/2.0.0...2.1.0
[2.0.0]: https://github.com/lanofgajanan/MyPortfolioWebsite/compare/1.2.0...2.0.0
[1.2.0]: https://github.com/lanofgajanan/MyPortfolioWebsite/compare/1.1.0...1.2.0
[1.1.0]: https://github.com/lanofgajanan/MyPortfolioWebsite/compare/1.0.0...1.1.0
[1.0.0]: https://github.com/lanofgajanan/MyPortfolioWebsite/compare/0.1.0...1.0.0
## [2.1.0] - 2026-08-21
### Added
- Mobile-first layout: stage now min-height + scroll-safe instead of a fixed h-screen clip.
### Changed
- Hero title fluid-scale clamp() + reduced mobile tracking so it never overflows.
- HUD corner telemetry collapses to a single compact chip under `sm` (no corner collision).
- Progress bar shrinks segment pitch on mobile; frame handles small widths (@ overflow-hidden).
- Footer becomes static + bottom-safe on mobile.
### Fixed
- Horizontal overflow on <400px screens; content clipping on short viewports.

[2.1.0]: https://github.com/lanofgajanan/MyPortfolioWebsite/compare/2.0.0...2.1.0
