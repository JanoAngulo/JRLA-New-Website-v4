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

export function createScrollScrub(root) {
  // Mobile is treated as reduced-motion: the per-frame scroll→gsap.set scrub is
  // the heaviest thing on the page, so on phones we skip the listener entirely
  // and reveal everything statically (perf > the reveal flourish on small
  // screens). Honors the OS reduced-motion setting everywhere.
  const reduced =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia(MOBILE).matches
  const pan = root.querySelector('[data-pan-scroll]') || root

  let scrubTargets = []
  let entryTargets = []
  let raf = null
  let active = false
  let leaveTimer = null
  let entryTl = null

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
        start: num(el.dataset.scrubStart, 0.92),
        end: num(el.dataset.scrubEnd, 0.62),
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

  const playEntry = () => {
    entryTl?.kill()
    setEntryHidden()
    entryTl = gsap.timeline()
    const lead = 0.18 // brief hold before anything moves
    entryTargets.forEach((t, i) => {
      entryTl.to(
        t.el,
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', force3D: true },
        lead + i * 0.14
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
        { opacity: t.fade ? 0 : 1, y: t.dist, duration: 0.5, ease: 'power2.in', force3D: true },
        i * 0.05
      )
    })
  }

  // Called from the component's activeSlide watcher.
  const setActive = (v) => {
    if (reduced) {
      if (v) for (const t of entryTargets) gsap.set(t.el, { opacity: 1, y: 0 })
      return
    }
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
      }, 700)
    }
  }

  /* ------------------------------------------------------------------ lifecycle */

  const start = () => {
    collect()
    if (reduced) {
      for (const t of [...scrubTargets, ...entryTargets]) gsap.set(t.el, { opacity: 1, y: 0 })
      return
    }
    setEntryHidden()
    window.addEventListener('scroll', onScroll, { capture: true, passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    apply()
  }

  const refresh = () => {
    collect()
    onScroll()
  }

  const destroy = () => {
    window.removeEventListener('scroll', onScroll, { capture: true })
    window.removeEventListener('resize', onScroll)
    if (raf != null) cancelAnimationFrame(raf)
    if (leaveTimer) clearTimeout(leaveTimer)
    entryTl?.kill()
    raf = null
  }

  return { start, setActive, refresh, destroy }
}
