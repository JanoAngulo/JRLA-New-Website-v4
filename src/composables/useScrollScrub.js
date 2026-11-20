import { gsap } from 'gsap'

// Reversible scroll-linked reveals for Features / Works. Elements pinned at the
// top of a pan container have no travel, so they use a timed entrance instead.
//
// Markup attributes:
//   data-scrub            — opt in
//   data-scrub-entry      — timed entrance via setActive() instead of scroll-scrub
//   data-scrub-y="42"     — travel distance in px (default 42)
//   data-scrub-fade="0"   — animate transform only, keep opacity 1 (masked titles)
//   data-scrub-min="0.2"  — opacity floor before reveal (default 0)
//   data-scrub-start="0.92" / data-scrub-end="0.62"
//                         — per-element reveal band, overriding BAND_* below.
const MOBILE = '(max-width: 767px)'

// Fractions of viewport height: reveal starts at BAND_START, completes at BAND_END.
const BAND_START = 0.82
const BAND_END = 0.48

export function createScrollScrub(root) {
  // Mobile gets a one-shot IO reveal: the per-frame scrub is too heavy for phones.
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
        fade: el.dataset.scrubFade !== '0',
        min: num(el.dataset.scrubMin, 0)
      }
      if ('scrubEntry' in el.dataset) entryTargets.push(t)
      else scrubTargets.push(t)
    }
  }

  // Scroll-scrub

  // Null when off-screen, so unrelated scrolls (Works pan, Dialog) skip the repaint.
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
    // A short filtered list may not overflow, which would strand cards mid-reveal.
    const noTravel =
      !window.matchMedia(MOBILE).matches && pan.scrollHeight - pan.clientHeight <= 8
    if (noTravel) {
      for (const t of scrubTargets) gsap.set(t.el, { opacity: 1, y: 0, force3D: true })
      return
    }
    // Read all rects before writing to avoid layout thrash.
    const tops = scrubTargets.map((t) => t.el.getBoundingClientRect().top)
    for (let i = 0; i < scrubTargets.length; i++) {
      const t = scrubTargets[i]
      const rel = tops[i] - vp.top
      const bandTop = t.start * vp.height
      const bandBot = t.end * vp.height
      let p = (bandTop - rel) / (bandTop - bandBot)
      p = p < 0 ? 0 : p > 1 ? 1 : p
      const e = easeOut(p)
      gsap.set(t.el, { opacity: t.fade ? t.min + (1 - t.min) * e : 1, y: (1 - e) * t.dist, force3D: true })
    }
  }

  const onScroll = () => {
    if (raf == null) raf = requestAnimationFrame(apply)
  }

  // Triggered entrance

  const setEntryHidden = () => {
    for (const t of entryTargets) gsap.set(t.el, { opacity: t.fade ? 0 : 1, y: t.dist })
  }

  // Replays on every section entry, so keep it short.
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

  // Fades targets out as the panel slides off; leaveTimer then hard-resets them.
  const playExit = () => {
    entryTl?.kill()
    entryTl = gsap.timeline()
    entryTargets.forEach((t, i) => {
      entryTl.to(
        t.el,
        // Ease-out, not in: an ease-in exit holds still while watched and reads as lag.
        { opacity: t.fade ? 0 : 1, y: t.dist, duration: EXIT_DUR, ease: 'power2.out', force3D: true },
        i * 0.04
      )
    })
  }

  // Call from the activeSlide watcher. Desktop only.
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
      // Reset after the panel has slid off, so it isn't visible.
      leaveTimer = setTimeout(() => {
        leaveTimer = null
        entryTl?.kill()
        setEntryHidden()
      }, EXIT_DUR * 1000 + 150)
    }
  }

  // Mobile: IO reveal

  const staticRevealAll = () => {
    for (const t of [...scrubTargets, ...entryTargets]) gsap.set(t.el, { opacity: 1, y: 0 })
  }

  // Call again after collect() (Works filter) to observe re-rendered nodes.
  const revealMobile = () => {
    io?.disconnect()
    const all = [...entryTargets, ...scrubTargets]
    // Masked titles sit fully clipped, so IO never fires on them. Observe the
    // .reveal-line wrapper, animate the child.
    const watchOf = new Map()
    for (const t of all) {
      gsap.set(t.el, { opacity: t.fade ? t.min : 1, y: t.dist })
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
      // Negative bottom margin stands in for the desktop band's start.
      { rootMargin: '0px 0px -25% 0px', threshold: 0.12 }
    )
    for (const watch of watchOf.keys()) io.observe(watch)
  }

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
