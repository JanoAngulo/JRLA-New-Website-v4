import { gsap } from 'gsap'

// Reveal engine for the Features section — two kinds of target:
//
// 1. SCROLL-SCRUB (`data-scrub`): opacity/transform tied directly to scroll
//    position. As an element travels up through a reveal band near the bottom of
//    its scroll viewport it animates 0→1, and 1→0 when you scroll back — the
//    animation "progresses" with the scroll, both ways. Used for every article
//    that actually has scroll travel (the pause-and-pan articles below the fold,
//    and everything on mobile where the whole panel scrolls through the window).
//
// 2. TRIGGERED ENTRANCE (`data-scrub-entry`): the FIRST article + header sit at
//    the pan container's top, so on desktop they have NO vertical scroll travel
//    to scrub against — their only motion is the horizontal slide-in, which the
//    engine SNAPS, making a scrubbed reveal pop/jitter. Instead they play a
//    clean, staggered timeline the moment the section becomes active (call
//    `setActive(true)` from the component's `activeSlide` watcher), and reset on
//    leave so it replays on every entry.
//
// Attributes:
//   data-scrub            — opt in
//   data-scrub-entry      — use the triggered entrance instead of scroll-scrub
//   data-scrub-y="42"     — travel distance in px (default 42)
//   data-scrub-fade="0"   — animate transform only, keep opacity 1 (masked title
//                           lines rising inside an overflow-hidden parent)
//   data-scrub-start="0.92" / data-scrub-end="0.62"
//                         — scrub reveal band as fractions of viewport height.
const MOBILE = '(max-width: 767px)'

// Reveal band, as fractions of the scroll viewport's height. An element is
// untouched until its top rises past BAND_START, fully revealed once it reaches
// BAND_END, and interpolated in between — so the distance between them IS the
// pacing. Lower START = nothing happens until the element is further up the
// screen (a longer wait). A wider gap = more scroll distance to complete (a
// slower, more gradual reveal).
//
// Per-element overrides live on the markup as data-scrub-start / data-scrub-end
// and are read relative to these; the titles sit slightly ahead of their body
// copy so a heading leads its paragraph rather than racing it.
const BAND_START = 0.82
const BAND_END = 0.48

export function createScrollScrub(root) {
  // Three reveal strategies:
  //  • OS reduced-motion → everything static, no animation at all.
  //  • Mobile → the per-frame scroll→gsap.set scrub is too heavy for phones, so
  //    instead each target plays a cheap ONE-SHOT reveal (opacity/Y tween) the
  //    first time it enters the viewport, driven by an IntersectionObserver.
  //  • Desktop → full scroll-linked scrub (see apply()).
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const mobile = window.matchMedia(MOBILE).matches
  const pan = root.querySelector('[data-pan-scroll]') || root

  let scrubTargets = []
  let entryTargets = []
  let raf = null
  let active = false
  let leaveTimer = null
  let entryTl = null
  let io = null

  const num = (v, d) => {
    const n = parseFloat(v)
    return Number.isFinite(n) ? n : d
  }

  const collect = () => {
    scrubTargets = []
    entryTargets = []
    for (const el of root.querySelectorAll('[data-scrub]')) {
      const t = {
        el,
        dist: num(el.dataset.scrubY, 42),
        start: num(el.dataset.scrubStart, BAND_START),
        end: num(el.dataset.scrubEnd, BAND_END),
        fade: el.dataset.scrubFade !== '0'
      }
      if ('scrubEntry' in el.dataset) entryTargets.push(t)
      else scrubTargets.push(t)
    }
  }

  /* ---------------------------------------------------------- scroll-scrub */

  // Scroll viewport to measure against, or null when off-screen — skipping the
  // write avoids pointless repaints on unrelated scrolls (Works pan, Dialog).
  const viewport = () => {
    const vh = window.innerHeight
    if (window.matchMedia(MOBILE).matches) {
      const r = root.getBoundingClientRect()
      if (r.bottom <= 0 || r.top >= vh) return null
      return { top: 0, height: vh }
    }
    const r = pan.getBoundingClientRect()
    if (r.height === 0 || r.right <= 0 || r.left >= window.innerWidth) return null
    return { top: r.top, height: r.height }
  }

  const easeOut = (t) => 1 - Math.pow(1 - t, 3)

  const apply = () => {
    raf = null
    const vp = viewport()
    if (!vp) return
    // Desktop pan panels with a short filtered list may not overflow — no
    // scroll travel to scrub against, which would strand cards mid-reveal.
    // Detect that and reveal every scrub target fully.
    const noTravel =
      !window.matchMedia(MOBILE).matches && pan.scrollHeight - pan.clientHeight <= 8
    if (noTravel) {
      for (const t of scrubTargets) gsap.set(t.el, { opacity: 1, y: 0, force3D: true })
      return
    }
    // Read all rects first, then write — avoids layout thrash.
    const tops = scrubTargets.map((t) => t.el.getBoundingClientRect().top)
    for (let i = 0; i < scrubTargets.length; i++) {
      const t = scrubTargets[i]
      const rel = tops[i] - vp.top
      const bandTop = t.start * vp.height
      const bandBot = t.end * vp.height
      let p = (bandTop - rel) / (bandTop - bandBot)
      p = p < 0 ? 0 : p > 1 ? 1 : p
      const e = easeOut(p)
      gsap.set(t.el, { opacity: t.fade ? e : 1, y: (1 - e) * t.dist, force3D: true })
    }
  }

  const onScroll = () => {
    if (raf == null) raf = requestAnimationFrame(apply)
  }

  /* ------------------------------------------------------ triggered entrance */

  const setEntryHidden = () => {
    for (const t of entryTargets) gsap.set(t.el, { opacity: t.fade ? 0 : 1, y: t.dist })
  }

  // Timing budget: this entrance replays every time the section becomes active,
  // so it is occasional-frequency motion, not a one-time reveal. It used to take
  // 0.18 + 4x0.14 + 1.1 = ~1.84s to settle, with a 140ms stagger that read as
  // items queueing rather than arriving together.
  const ENTRY_LEAD = 0.15 // a held beat before anything moves
  const ENTRY_STAGGER = 0.08 // top of the 30-80ms band; past it items read as queueing, not arriving
  const ENTRY_DUR = 0.65
  const EXIT_DUR = 0.3 // exits stay quick — nobody wants to wait to leave

  const playEntry = () => {
    entryTl?.kill()
    setEntryHidden()
    entryTl = gsap.timeline()
    entryTargets.forEach((t, i) => {
      entryTl.to(
        t.el,
        { opacity: 1, y: 0, duration: ENTRY_DUR, ease: 'power3.out', force3D: true },
        ENTRY_LEAD + i * ENTRY_STAGGER
      )
    })
  }

  // Animated exit — mirror of playEntry so the header/first article FADE out as
  // the panel slides off, instead of snapping (setEntryHidden is instant). The
  // leaveTimer below still force-hides afterwards for a clean replay.
  const playExit = () => {
    entryTl?.kill()
    entryTl = gsap.timeline()
    entryTargets.forEach((t, i) => {
      entryTl.to(
        t.el,
        // power2.OUT, not in. An ease-in exit holds still for the first half of
        // its duration — exactly the frames the visitor is watching as the panel
        // leaves — so it reads as lag, not as departure.
        { opacity: t.fade ? 0 : 1, y: t.dist, duration: EXIT_DUR, ease: 'power2.out', force3D: true },
        i * 0.04
      )
    })
  }

  // Called from the component's activeSlide watcher.
  const setActive = (v) => {
    // Entry targets are handled statically (reduced) or by the IntersectionObserver
    // (mobile) — the timed entrance is desktop-only.
    if (prefersReduced || mobile) return
    if (v) {
      if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null }
      if (active) return
      active = true
      playEntry()
    } else {
      if (!active) return
      active = false
      if (leaveTimer) clearTimeout(leaveTimer)
      playExit()
      // Force-hide after the panel has slid off (exit tween done), so the reset
      // isn't visible and the entrance replays cleanly next time.
      leaveTimer = setTimeout(() => {
        leaveTimer = null
        entryTl?.kill()
        setEntryHidden()
      }, EXIT_DUR * 1000 + 150)
    }
  }

  /* -------------------------------------------------------- mobile: IO reveal */

  const staticRevealAll = () => {
    for (const t of [...scrubTargets, ...entryTargets]) gsap.set(t.el, { opacity: 1, y: 0 })
  }

  // One-shot reveal: hide every target, then tween each in the first time it
  // scrolls into view. Cheap enough for phones (no per-frame work) and survives
  // re-collection (Works filter) — call again after collect() to observe the new
  // nodes. IO fires an initial callback for anything already on-screen.
  const revealMobile = () => {
    io?.disconnect()
    const all = [...entryTargets, ...scrubTargets]
    // Masked titles (.etl-inner) start translated fully OUT of their
    // overflow:hidden .reveal-line parent — so IntersectionObserver (which clips
    // the target's visible area against overflow ancestors) measures 0% and never
    // fires. Observe the un-clipped .reveal-line wrapper instead, animate the child.
    const watchOf = new Map()
    for (const t of all) {
      gsap.set(t.el, { opacity: t.fade ? 0 : 1, y: t.dist })
      watchOf.set(t.el.closest('.reveal-line') || t.el, t.el)
    }
    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = watchOf.get(entry.target)
          if (el) {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
              force3D: true
            })
          }
          io.unobserve(entry.target)
        }
      },
      // Mobile has no scroll-linked band to widen, so the wait is bought here
      // instead: the negative bottom margin shrinks the observed viewport, so an
      // element must climb well clear of the fold before it counts as visible.
      // -25% roughly matches the desktop band's new start point.
      { rootMargin: '0px 0px -25% 0px', threshold: 0.12 }
    )
    for (const watch of watchOf.keys()) io.observe(watch)
  }

  /* ------------------------------------------------------------------ lifecycle */

  const start = () => {
    collect()
    if (prefersReduced) return staticRevealAll()
    if (mobile) return revealMobile()
    setEntryHidden()
    window.addEventListener('scroll', onScroll, { capture: true, passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    apply()
  }

  const refresh = () => {
    collect()
    if (prefersReduced) return staticRevealAll()
    if (mobile) return revealMobile()
    onScroll()
  }

  const destroy = () => {
    window.removeEventListener('scroll', onScroll, { capture: true })
    window.removeEventListener('resize', onScroll)
    if (raf != null) cancelAnimationFrame(raf)
    if (leaveTimer) clearTimeout(leaveTimer)
    entryTl?.kill()
    io?.disconnect()
    io = null
    raf = null
  }

  return { start, setActive, refresh, destroy }
}
