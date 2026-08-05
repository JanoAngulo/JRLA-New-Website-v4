# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: hiring managers and recruiters** evaluating John Russel L. Angulo (JRLA) for front-end / UI/UX roles.

Their situation: skimming a candidate link, often between other candidates, frequently on a tab opened from LinkedIn or an application. They need role fit and proof of shipped work quickly, and they commonly forward the link to a colleague or hiring panel — so the site must survive being seen out of context and without narration.

Secondary audiences (freelance clients, design/dev peers) are welcome but do not drive design decisions.

## Product Purpose

A personal portfolio that gets JRLA hired. It exists to convert a recruiter's skim into contact.

**Success is two actions, both first-class:**
1. Contact form submission
2. Resume / CV download (`/downloads/Angulo-John-Russel-CV.pdf`)

Neither is subordinate to the other. Both must be reachable from a shallow visit, not only from the end of the narrative.

## Positioning

**Four-discipline range in one person** — front-end development, UI/UX design, video editing, and vector art — each backed by real shipped work, not claimed capability.

A neighboring portfolio cannot truthfully copy this because the evidence is per-discipline and countable: 20 work entries split 7 UI/UX · 5 website · 5 vector · 3 video (`src/components/PortfolioData.js`). The claim rests on that spread being visible, categorized, and browsable — not on a skills list.

## Operating Context

- Entry is usually a shared or pasted link; hash deep links (`#home` `#features` `#works` `#about` `#contact`) exist so a specific panel can be sent directly.
- Visits are short and often mobile or on an unfamiliar machine. Recruiters may arrive with the OS in either light or dark mode.
- The site is the only artifact in the loop for many visitors — no cover letter, no call. It must answer "what does he do, is it good, how do I reach him" unaided.
- Work is reviewed by category: UI/UX and website pieces open as case studies; video and vector open as viewable pieces.

## Capabilities and Constraints

**Confirmed capabilities**
- Five-panel narrative: Home · Features · Works · About · Contact.
- Filterable work grid across four categories, with per-category detail surfaces (sheet for UI/UX + website, modal for video + vector).
- Contact form with client-side validation and status feedback.
- CV download.
- Theme control: system → light → dark, persisted, FOUC-guarded before paint.
- Keyboard, arrow, and touch navigation.

**Fixed — do not replace**
- **Stack and hosting:** Vue 3 · Vue Router 4 · Vite · Tailwind CSS v4 · Pinia · GSAP, deployed to Firebase Hosting.
- **Contact pipeline:** Botpoison (spam token) → Formspark (delivery).

**Not fixed**
- The horizontal-scroll architecture is the current implementation, not a commitment. A future direction may replace it if it serves the two success actions better.

**Terminology**
- Work categories are `uiux` · `website` · `video` · `vector` — these strings drive filtering, badge color, and which detail surface opens. Adding a discipline means extending the enum, not relabeling an existing one.

**Undecided**
- Whether the portfolio should also serve freelance client acquisition as a stated goal. Currently it does not.

## Brand Commitments

- Name: **John Russel L. Angulo** — "JRLA" as the mark, "Jano" in first-person copy.
- Located in **Bulacan, Philippines**. Availability stated as **2026 onwards**.
- Voice: confident, technical, low word count. Not corporate, not cute.
- Channels, all live and canonical: email `Angulo.johnrussel.l.7814@gmail.com` · [LinkedIn](https://www.linkedin.com/in/jrla1219/) · [Facebook](https://www.facebook.com/Jano1219) · [Behance](https://www.behance.net/JRLA).

## Evidence on Hand

**Real**
- 20 work entries in [src/components/PortfolioData.js](src/components/PortfolioData.js) — 7 `uiux`, 5 `website`, 5 `vector`, 3 `video`. All have thumbnails and external links; UI/UX entries carry case-study imagery.
- CV at [public/downloads/Angulo-John-Russel-CV.pdf](public/downloads/Angulo-John-Russel-CV.pdf).
- Portrait photograph (About panel), shot in Bulacan.
- Self-reported counts surfaced as stats: 3+ years, 13+ technologies, 10+ creative tools, 4 disciplines.
- Live production deployment: https://jrla1219.web.app/
- The site's own engineering is inspectable evidence — GSAP scroll engine, theme system, lazy imaging, security headers.

**Absent — must not be fabricated**
- No testimonials, client quotes, or references.
- No named employers, agencies, or clients on the site.
- No metrics, case-study outcomes, or performance claims for client work.
- No pricing, availability calendar, or engagement terms.

## Product Principles

1. **Two exits, always near.** Contact and CV are co-equal goals; a visitor who never reaches the last panel must still be able to do both.
2. **Range is the argument.** Design decisions that flatten the four disciplines into "web guy" destroy the core claim. Category distinction is strategic, not decorative.
3. **Built, not templated.** The implementation is part of the pitch. Anything that reads as a bought theme undercuts the candidacy.
4. **Survive the skim, reward the stay.** A 20-second visit must land the claim; a 5-minute visit must find real depth in the case studies.
5. **Claim only what the repo can back.** Every number and capability traces to a real asset. No invented proof.

## Accessibility & Inclusion

No formal standard was mandated, but recruiter reality sets a floor: unfamiliar machines, both OS themes, keyboard-only reviewers, and reduced-motion users must all reach both success actions.

Currently honored: `prefers-reduced-motion`, visible focus rings on every interactive role, ≥44px hit targets, semantic landmarks, `aria-label` on icon-only controls, Esc-closes-dialog.
