# Changelog

All notable changes to this site. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This file is intended to be human- and agent-readable — semantic versioning, dated entries,
and references to commit hashes where relevant.

## [Unreleased]

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
- The site is a single-file static page (`index.html`) served via GitHub Pages.
- Commit history in this repo is the source of truth for exact diffs; this file is a
  human/agent-readable summary.
- Do not add secrets/API keys to any file here (see security policy in prior edits).

[1.2.0]: https://github.com/lanofgajanan/MyPortfolioWebsite/compare/1.1.0...1.2.0
[1.1.0]: https://github.com/lanofgajanan/MyPortfolioWebsite/compare/1.0.0...1.1.0
[1.0.0]: https://github.com/lanofgajanan/MyPortfolioWebsite/compare/0.1.0...1.0.0