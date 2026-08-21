# Mobile-Friendly Plan — Obsidian Cyber Terminal & HUD (v2.1.0)

> **For Hermes:** implement this plan task-by-task. After each task, rebuild, deploy,
> and verify on a phone-width viewport before moving on.

**Goal:** Make `lanofgajanan.pp.ua` (Repo root) look and feel right on small devices —
no clipped content, no overlapping HUD corners, no overflowing progress bar — while
keeping the desktop HUD look identical.

**Current broken symptoms (mobile, ~360–430px wide):**
1. Everything is locked by `main` = `h-screen overflow-hidden` + `body{overflow:hidden}`,
   so on a short viewport the center content + HUD corners + footer get clipped/cut off —
   it reads as "cramped".
2. The four-corner HUD telemetry strings are wide and sit at `top-4/left-4` and
   `top-4/right-4` (and mirrored at bottom). On a narrow screen the top-left and top-right
   strings collide with each other in the middle, and bottom corners collide with the footer.
3. The HUD corner labels overlap the hero title zone when the viewport is short.
4. The 28-segment progress bar is ~360px wide + gaps + padding; it overflows on narrow
   screens (fits only barely/large on 375px, breaks outright on 360px).
5. `GAJANAN LOHAR` at base `text-3xl` + `tracking-widest` + `letter-spacing:0.12em` is
   close to overflowing its `px-4` wrapper and can clip, especially with the `-2px/2px`
   chromatic offset layers.

**Architecture (from SESSION_NOTES):** Source in `app/` (React 19 + Vite 6 + Tailwind v4).
Built artifacts (`index.html` + `assets/`) are copied to the repo root, which an
`nginx:alpine` container serves read-only. Rebuild = `npm run build`, then copy `dist/`
to root. Tailwind v4 defaults act on custom breakpoints; base classes already exist.

---
## Design approach (summary)

- Provide a **true mobile layout** instead of scaling the desktop HUD down:
  - Turn the root from a fixed no-scroll `h-screen` stage into a **min-height stage
    that can scroll on small screens** so nothing is ever clipped.
  - On `<sm` screens, **collapse the four-corner telemetry** to a compact single-line
    footer chip (or hidden) so corners can't collide, and dock the footer statically.
  - Make the hero title scale with a **`clamp()`-based fluid size** and reduce
    letter-spacing/tracking on small screens so it wraps cleanly inside the viewport.
  - Make the progress bar **wrap / shrink** on narrow screens — fewer segments per row or a
    fluid per-segment width driven by available width — so it never overflows.
- Keep the desktop contrast (HUD corners, fixed stage, big title) untouched via the `sm`/`md`
  breakpoints that already exist.

---

## Task 1 — Allow the stage to scroll + reduce title to fluid size

**Objective:** small viewports scroll instead of clipping; hero title never overflows.

**Files:**
- Modify `app/src/App.tsx:88` (`main` className)
- Modify `app/src/index.css:18-26` (`body` rule)
- Modify `app/src/components/GlitchHeroText.tsx` (title classes)

**Step 1 — change `index.css`:`body`** add a mobile-safe scroll:
```css
body {
  font-family: var(--font-geist);
  background-color: var(--color-bg);
  color: #fafafa;
  margin: 0; padding: 0;
  overflow-x: hidden;
}
```
Replace `overflow: hidden` with horizontal-only hide (keep `overflow-y: auto` as default).
Add at the end of the file a small mobile pass:
```css
@media (max-width: 640px) {
  body { overflow-x: hidden; overflow-y: auto; }
}
```

**Issue 2 — root `main`:** change
`h-screen overflow-hidden` → `min-h-screen overflow-x-hidden` so the column can grow and
scroll on short viewports:
```
class="relative w-full min-h-screen overflow-x-hidden bg-[#09090b] text-[#fafafa] flex flex-col justify-between select-none cursor-default"
```
(`w-screen` → `w-full` so a scrollbar/vertical overflow never causes a double-width page.)

**Issue 3 — `GlitchHeroText.tsx`:** make the title responsive-to-width instead of fixed rec-size
scale. Change all four `h1` `text-3xl sm:text-5xl …` font-size classes to a fluid clamp with
smaller mobile tracking:
```
class="… font-cyber text-[clamp(1.6rem,9vw,8rem)] leading-none tracking-[0.08em] sm:tracking-widest font-black text-[#34d399] …"
```
(repeat the clamp/leading on all 4 chromatic layers + the foreground `h1`). Keep the existing
`sm:` breakpoint sizes for desktop (they already exist). Add `break-words` + `whitespace-nowrap`
with `overflow-hidden` wrapper to guarantee no vertical clipping of the clip-path layers.

**Verify:**
- `cd app && npm run build` succeeds.
- Open the built site at `360×640` and `768×1024`: title fits the width, page scrolls if content
  exceeds height, nothing is cut off horizontally.

---

## Task 2 — Collapse the HUD telemetry on mobile

**Files:**
- Modify `app/src/components/HUDCornerTelemetry.tsx`

**Issue** — corners collide with each other / title / footer on narrow screens.

**Change:** on `<sm` screens render only the **bottom-center** single compact chip (merged
lat/lng + hex) and hide the four absolute corners; keep the four corners from `sm` up.
- Add wrapper class to each corner container: `hidden sm:flex …` (or gate a `useMediaQuery`).
- Add on mobile-only row inside the component: a centered chip at `bottom-6` that shows
  `[lat, lng]` + `hex1` compactly (smaller `text-[10px]`, gaps tight).
- Hide the mobile footer overlap: shift the footer to `bottom-8` on mobile or dock it above the
  chip — e.g. keep footer, and place the mobile telemetry chip just above it (`bottom-16 sm:hidden`).

**Verify (per viewport):** `360px` — only one telemetry element visible, no cross-corner
collisions; `1280px` — all four corners render as today.

---

## Task 3 — Make the progress bar fit + not collide

**Files:**
- Modify `app/src/components/SegmentProgressBar.tsx`

**Issue —** 28 segments × (w-2.5 + gap) doesn't fit ~360px widths.

**Approach (choose RESPONSIVE, simplest reliable):**
- Keep 28 segments on `sm:`+ (desktop look unchanged).
- Add a `useMediaQuery('(min-width: 640px)')` hook (or the hidden/max helpers). When mobile,
  render with smaller per-block class (`w-1.5 sm:w-2.5`) and smaller gap, or reduce the active
  tile count to ~a number that reliably fits `(max-width ~ container×px)`. For example use
  `w-1`/`h-4` + `gap-[2px]` under `sm:`.
- Add `max-w-full` to the outer `p-1` frame with `overflow-hidden` fallback so the bar scales
  instead of overflowing the container (edit the `max-w-md` sublabel to `max-w-full`).

**Verify at `360px`:** the bar starts and fills within its box edge-to-edge (no horizontal
scroll); at `1440px` it looks exactly like today's desktop bar.

---

## Task 4 — Footer safe-spacing + parallel sanity passes

**Files:**
- Modify `app/src/App.tsx:115-119` footer
- Read-only check: `app/src/components/InteractiveGlitchBackground.tsx` + `utils/audio.ts`
  (no visual change expected — canvas + WebAudio, sized to viewport already).

**Change:** keep footer `OBSIDIAN_TERMINAL v2.0.0` where the mobile-vertical layout ends; on
mobile make it `relative`/static (not absolute `bottom-6`) so it sits immediately after the
content flow instead of floating over the pared corners. Add negative-safety top margin
(`mt-6`) for mobile.

**Sanity checks (read-only) — confirm these are already responsive so we DON'T change them:**
- `InteractiveGlitchBackground.tsx` should use the current viewport (`window.innerWidth/innerHeight`),
  the canvas should be `w-full h-full` absolutely positioned — if it uses `clientWidth/clientHeight`
  in px that's fine; no change unless it hardcodes a desktop width.
- Normalize on build: replace any remaining `w-screen h-screen` full-size usage found via grep for
  `h-screen` after the build to ensure only the intended entry surface keeps.

---

## Task 5 — Rebuild, redeploy, verify live (phone + desktop)

**Files:**
- Root artifacts: `index.html`, `assets/` (generated)

**Steps:**
1. `cd /home/ubuntu/temp-site/app && npm run build`.
2. `cp app/dist/index.html ../index.html` and `rm -rf ../assets && cp -r app/dist/assets ../assets`.
3. `curl -s https://lanofjajanan.pp.ua/ | grep -oE 'assets/index-[A-Za-z0-9]+\\.js'` — confirm new
   bundled hash appears.
4. Open the live URL in a browser with **responsive viewport emulation**: check
   `360×640`, `390×844` (iPhone), `412×915` (Android), `768×1024` (iPad), `1440×900` (desktop).
   Assert: no horizontal scrollbar anywhere; no text overlap; body/title/progress fit; corners
   collapse on mobile && normal on desktop.
5. Re-check `prefers-reduced-motion` still halts CSS-only keyframes (scanlines/glitch) — none of
   the above touches animation timing; note as a pass/fail.

**Testing pyramid (JS unitcast):** the code is presentational React; a quick `vite` dev-server +
Playwright/screenshot sweep at the 5 widths above is the strongest automated check. If Playwright
isn't installed, do a manual pass with desktop DevTools device toolbar and capture screenshots
for the user.

---

## Task 6 — Commit + changelog + session notes

**Files:**
- Modify `CHANGELOG.md` (new `## [2.1.0] - 2026-08-21` under the `[Unreleased]` block).
- Modify `SESSION_NOTES.md` (Session 3 entry).
- Commit + push (token-embedded remote already configured).

**Change log entry (Keep a Changelog):**
```
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
```
Prefix `[2.1.0]: https://github.com/lanofgajanan/MyPortfolioWebsite/compare/2.0.0...2.1.0`
compare link.

---

## Risks / tradeoffs / open questions

- **changing the visual signature**: The HUD corners are part of the aesthetic; collapsing them
  on mobile changes the "four-corner live overlay" feel. Chosen because it's the only way to stop
  collision on a 360px width without shrinking to unreadable. Ask the user if they'd prefer
  overlaid-but-small corners instead.
- **Touch handling:** `App.tsx` listens for global `touchmove` to drive the telemetry. On a page
  that now scrolls, a finger drag will both scroll the page and drive the cursor coords. This is
  cosmetic (telemetry coords update) and low-risk, but if it feels janky we can later scope it to
  the glitch surface with `preventDefault`. Worth confirming during live QA. Status: discussed,
  low-risk.
- **Testing tail:** no test framework is currently present in `app/` (pure presentational React).
  Verification is screenshots + curl across the device widths; fast and non-blocking.

## Out of scope
- Re-theming the desktop colors/animations.
- Audio engine changes.
- `index.html.v1.bak` deletion (leave until v2.1.0 is confirmed stable).