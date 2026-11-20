# antislop audit 002: fix report (2026-11-20)

The owner approved all 18 findings. Two of them were then changed after review:

- **#1 Ink Red declined.** The darker text and ring shade (`#b7243b`) was built and then reverted, so Signal Red `#ff3656` stays everywhere. DESIGN.md now lists light-mode red text and rings as an accepted contrast gap (2.97:1 on Newsprint Grey).
- **#10 nav labels.** The first attempt used `sm:not-sr-only`, which Tailwind did not emit. The labels were hidden at every width, so the nav showed only numbers. The fix now keeps the original visible `hidden sm:inline` label and adds a separate `sr-only sm:hidden` copy for mobile only, so the nav looks the same as before.
- **#11:** option (a).

| # | Fix | File |
|---|---|---|
| 1 | Reverted at owner request. Recorded as an accepted gap. | `DESIGN.md` |
| 2 | Contact plate: `md:overflow-y-auto`, `min-h-full`, height-capped headline (`min(4.8vw, 8.5vh)`), `vh`-bounded padding and gap | `Contact.vue` |
| 3 | Cursor turns ink over `[data-accent-surface]` | `CustomCursor.vue` |
| 4 | `<navbar>` moved to just after the skip link | `WebView.vue` |
| 5 | Field underlines changed from `border-current/25` to `/50` | `Contact.vue` |
| 6 | Send uses `aria-disabled` and returns early while loading. `.btn[aria-disabled]` styles added. | `Contact.vue`, `main.css` |
| 7 | One always-mounted `sr-only` `role="status"` line carries success and failure | `Contact.vue` |
| 8 | Mobile: the first invalid field is focused and scrolled to centre (`preventScroll` on desktop only) | `Contact.vue` |
| 9 | Theme toggle border changed from `black/40` to `black/50` | `Navbar.vue` |
| 10 | No `aria-label`. Visible label unchanged, plus a mobile-only `sr-only` name. | `Navbar.vue` |
| 11 | Tagline types once and drops the caret. Status pulses run 2 beats. Ticker has a 44px pause button (`aria-pressed`, hidden under reduced motion). | `Home.vue`, `About.vue`, `Contact.vue` |
| 12 | Work card focus adds `outline-2 outline-transparent` for forced colors | `Works.vue` |
| 13 | Mobile divider name opacity changed from 0.60 to 0.65 | `main.css` |
| 14 | `aria-hidden` on every Font Awesome glyph inside a control | `Works`, `WorkDetails`, `Dialog`, `WebView`, `Navbar`, `Home`, `Contact`, `PortfolioData` |
| 15 | Sheet header has its own labelled 44px close button (`@mousedown.stop` so it doesn't start a drag) | `Dialog.vue` |
| 16 | `aria-live="polite"` on the Works count | `Works.vue` |
| 17 | Inactive filter-pill border changed from `/35` to `/50` | `Works.vue` |
| 18 | DESIGN.md updated for the motion caps, cursor, tab order, sheet close, form live region, control-edge exception, and the accepted red gap | `DESIGN.md` |

## Verification

I ran `vite build` and `vite preview`, then drove the site with headless Chrome over CDP.

**Keyboard order.** Tab goes skip link → brand → `01 Home` → `02 Features`. The nav comes first.

**Desktop nav labels.** All five render at 1280px. At 375px only the number shows, and the accessible name is "01 Home".

**Contact plate reachability.** All 5 links are reachable at every size, and focusing Behance at 960×540 scrolls it into view (y 456–500 of 540).

| Viewport | Links visible without scrolling |
|---|---|
| 1280×800 | 5/5 |
| 1366×768 | 2/5 |
| 1280×720 | 2/5 |
| 960×540 | 0/5 |

**Cursor.** It has the `on-accent` class over the Contact plate and drops it off the plate.

**Contact form.**
- Send has no `disabled` attribute.
- The `sr-only` status line is present.
- An empty submit at 375×667 focuses Name, in view at y 309–358, with 3 errors shown.

**Motion.**
- The tagline ends on "front-end developer." with no caret.
- The pulse iteration count is 2.
- The ticker button is 44×44, sets `aria-pressed=true`, and pauses the animation.

**Sheet.**
- The close button is present (44×44) while the skeleton shows.
- Clicking it closes the sheet, which becomes `inert`.

**Other checks.**
- The work-card focus outline is `solid 2px transparent`.
- No unhidden icons remain inside controls.
- No horizontal scroll at 375px.
- No console errors.

Not exercised:
- A live Formspark send (it would email the owner).
- Screen-reader speech.
- A physical phone keyboard.
- Windows forced-colors rendering.
