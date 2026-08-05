import { gsap } from 'gsap'

// Reveal engine for the Features / Works sections. Two kinds of target:
//
// 1. SCROLL-SCRUB (`data-scrub`): opacity/transform driven directly from scroll
//    position, reversible — 0→1 travelling up through the reveal band, 1→0 on
//    the way back. For elements that have real scroll travel.
// 2. TRIGGERED ENTRANCE (`data-scrub-entry`): for elements pinned at the top of
//    the pan container, which have no vertical travel to scrub against on
//    desktop. They play a staggered timeline via `setActive(true)` (call it from
//    the component's `activeSlide` watcher) and reset on leave so it replays.
//
// Markup attributes:
//   data-scrub            — opt in
//   data-scrub-entry      — use the triggered entrance instead of scroll-scrub
//   data-scrub-y="42"     — travel distance in px (default 42)
//   data-scrub-fade="0"   — animate transform only, keep opacity 1 (for masked
//                           title lines inside an overflow-hidden parent)
//   data-scrub-start="0.92" / data-scrub-end="0.62"
//                         — per-element reveal band, overriding BAND_* below.
const MOBILE = '(max-width: 767px)'

// Reveal band as fractions of the scroll viewport's height: untouched above
// BAND_START, fully revealed at BAND_END, interpolated between. Lower START =
// longer wait; wider gap = slower, more gradual reveal.
const BAND_START = 0.82
const BAND_END = 0.48

export function createScrollScrub(root) {
  // Three strategies: reduced-motion → static; mobile → one-shot IO reveal (the
  // per-frame scrub is too heavy for phones); desktop → scroll-linked scrub.
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
  // write avoids repaints on unrelated scrolls (Works pan, Dialog).
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
    // A desktop pan panel with a short filtered list may not overflow at all —
    // no scroll travel to scrub against would strand cards mid-reveal.
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

  // This entrance replays on every section entry, so keep it short.
  const ENTRY_LEAD = 0.15 // held beat before anything moves
  const ENTRY_STAGGER = 0.08 // past ~80ms items read as queueing, not arriving
  const ENTRY_DUR = 0.65
  const EXIT_DUR = 0.3

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

  // Mirror of playEntry, so entry targets fade out as the panel slides off
  // rather than snapping (setEntryHidden is instant). leaveTimer force-hides
  // afterwards for a clean replay.
  const playExit = () => {
    entryTl?.kill()
    entryTl = gsap.timeline()
    entryTargets.forEach((t, i) => {
      entryTl.to(
        t.el,
        // power2.out, not in: an ease-in exit holds still through exactly the
        // frames the visitor is watching, so it reads as lag.
        { opacity: t.fade ? 0 : 1, y: t.dist, duration: EXIT_DUR, ease: 'power2.out', force3D: true },
        i * 0.04
      )
    })
  }

  // Called from the component's activeSlide watcher. Desktop-only: reduced
  // motion reveals statically and mobile uses the IntersectionObserver path.
  const setActive = (v) => {
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
      // Force-hide once the panel has slid off, so the reset isn't visible.
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
  // scrolls into view. No per-frame work, so it's cheap on phones. Call again
  // after collect() (e.g. Works filter) to observe the re-rendered nodes.
  const revealMobile = () => {
    io?.disconnect()
    const all = [...entryTargets, ...scrubTargets]
    // Masked titles (.etl-inner) start translated fully outside their
    // overflow:hidden .reveal-line parent, so IntersectionObserver measures 0%
    // and never fires. Observe the un-clipped wrapper, animate the child.
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
      // No scroll-linked band on mobile, so the wait is bought here: the
      // negative bottom margin makes an element climb clear of the fold before
      // it counts as visible, roughly matching the desktop band's start.
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
