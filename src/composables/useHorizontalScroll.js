import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const MOBILE_QUERY = '(max-width: 767px)'

/**
 * Section pager.
 *
 * Desktop: scroll-driven horizontal pager with pause-and-pan — a panel taller
 * than the viewport locks horizontal movement and pans its inner scroller to
 * the bottom before horizontal travel resumes.
 *
 * Mobile: panels stack vertically and scroll natively; the active section is
 * resolved from panel positions on scroll.
 *
 * @param {Object} opts
 * @param {HTMLElement} opts.wrap  - pinned viewport-height container (desktop)
 * @param {HTMLElement} opts.track - flex row / column of `.h-panel` elements
 * @param {(idx:number)=>void} opts.onActive - fires when the active panel changes
 * @param {(idx:number)=>void} opts.onSettle - fires once travel actually stops
 */
export function createHorizontalScroll({ wrap, track, onActive, onSettle }) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const panels = Array.from(track.children)
  const count = panels.length

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

  let mode = null // 'h' (horizontal) | 'v' (vertical)
  let st = null
  let tl = null // normalized 0→1 driver, linked to ScrollTrigger for scrub smoothing
  let io = null
  let vScroll = null // mobile scroll listener
  let navTarget = null // progress (0..1) locked while a programmatic nav runs
  let current = -1
  let settleTimer = null
  const panState = [] // { el, prevOverflow } for restoring native overflow

  // Horizontal layout in scroll pixels, recomputed on every refresh so a
  // content-height change (e.g. Works filter) reshapes the scrub without a
  // teardown. Track x + pan scrollTops are driven straight from progress rather
  // than a bound timeline, so `ScrollTrigger.refresh()` alone re-fits it.
  let arrivals = []
  let panEnds = []
  let total = 0
  let vwPx = 0
  let hStepPx = 0
  let panPanels = [] // { el, index, start, pan }
  let snapPoints = []
  let panZones = []

  const navHeight = () => {
    const n = document.getElementById('mainNavbar')
    return n ? n.offsetHeight : 56
  }

  const setActive = (idx) => {
    if (idx !== current && idx >= 0) {
      current = idx
      onActive?.(idx)
    }
  }

  // `active` resolves half a viewport before travel stops — too early to start a
  // panel's entrance, which would then play out while the panel is still moving
  // and land already finished. Settle is the real arrival, and it is defined as
  // quiet rather than as any one event: 200ms with no scroll change covers a
  // snap landing, a free rest outside the snap dead-zone, a programmatic nav and
  // the mobile scroll with one mechanism. Snap's own 120ms delay is shorter than
  // the window, so its travel restarts the clock before a false settle fires.
  const SETTLE_QUIET = 200
  const scheduleSettle = () => {
    clearTimeout(settleTimer)
    settleTimer = setTimeout(() => {
      settleTimer = null
      if (current >= 0) onSettle?.(current)
    }, SETTLE_QUIET)
  }

  /* ---------------------------------------------------------------- helpers */

  const findScrollEl = (panel) => {
    const root = panel.querySelector('.app-slide') || panel
    const tagged = panel.querySelector('[data-pan-scroll]')
    const candidates = tagged ? [tagged, root] : [root]
    let best = null
    let bestPan = 8
    for (const el of candidates) {
      const pan = el.scrollHeight - el.clientHeight
      if (pan > bestPan) {
        bestPan = pan
        best = el
      }
    }
    return best ? { el: best, pan: bestPan } : null
  }

  const releasePanels = () => {
    for (const s of panState) s.el.style.overflow = s.prevOverflow
    panState.length = 0
  }

  /* ------------------------------------------------------ desktop: horizontal */

  // (Re)measure the horizontal layout from the current DOM. Runs on build and
  // again from ScrollTrigger's onRefreshInit. Native overflow is restored first
  // so pan heights measure true, then the pan containers are re-locked.
  const layoutHorizontal = () => {
    releasePanels()
    vwPx = window.innerWidth
    hStepPx = window.innerHeight
    arrivals = []
    panEnds = []
    panPanels = []
    let pos = 0

    for (let i = 0; i < count; i++) {
      arrivals[i] = pos
      const found = findScrollEl(panels[i])
      if (found && found.pan > 0) {
        const el = found.el
        el.scrollTop = 0
        panState.push({ el, prevOverflow: el.style.overflow })
        el.style.overflow = 'hidden'
        panPanels.push({ el, index: i, start: pos, pan: found.pan })
        pos += found.pan
      }
      panEnds[i] = pos
      if (i < count - 1) pos += hStepPx
    }
    total = pos || 1

    snapPoints = [...new Set([...arrivals, ...panEnds].map((p) => p / total))]
    panZones = arrivals
      .map((a, i) => [a / total, panEnds[i] / total])
      .filter(([s, e]) => e - s > 0.001)
  }

  // Drive the track x + each pan container's scrollTop straight from progress.
  const applyProgress = (progress) => {
    const px = progress * total
    let panel = count - 1
    let x = -vwPx * (count - 1)
    for (let i = 0; i < count; i++) {
      if (px <= panEnds[i]) { panel = i; x = -vwPx * i; break }
      if (i < count - 1 && px <= panEnds[i] + hStepPx) {
        panel = i
        x = -vwPx * (i + (px - panEnds[i]) / hStepPx)
        break
      }
    }
    gsap.set(track, { x })
    for (const pp of panPanels) {
      pp.el.scrollTop =
        pp.index < panel ? pp.pan
        : pp.index > panel ? 0
        : Math.max(0, Math.min(pp.pan, px - pp.start))
    }
  }

  const buildHorizontal = () => {
    layoutHorizontal()

    // Normalized 0→1 driver linked to ScrollTrigger. `scrub: 1` lags the
    // driver's playhead and applyProgress runs off that smoothed value. The
    // driver is layout-agnostic (duration 1), so a remeasure only changes
    // `total` — no timeline rebuild.
    const driver = { p: 0 }
    tl = gsap.timeline({ defaults: { ease: 'none' } })
    tl.to(driver, { p: 1, duration: 1, onUpdate: () => applyProgress(driver.p) })

    st = ScrollTrigger.create({
      animation: tl,
      trigger: wrap,
      pin: true,
      scrub: reduced ? true : 1,
      start: 'top top',
      end: () => '+=' + total,
      invalidateOnRefresh: true,
      onRefreshInit: layoutHorizontal,
      snap: {
        // Free-form: only pull when the natural stop lands near a section.
        snapTo: (value) => {
          // During programmatic nav, snap to the exact destination so trailing
          // inertia can't carry the scroll past the arrival into the pan zone.
          if (navTarget !== null) return navTarget
          const m = 0.004
          for (const [s, e] of panZones) {
            if (value > s + m && value < e - m) return value // never snap mid-pan
          }
          let best = snapPoints[0]
          let bd = Infinity
          for (const p of snapPoints) {
            const d = Math.abs(p - value)
            if (d < bd) { bd = d; best = p }
          }
          const THRESHOLD = 0.06 // dead-zone: rest freely outside this
          return bd <= THRESHOLD ? best : value
        },
        duration: reduced ? 0 : { min: 0.15, max: 0.4 },
        delay: 0.12,
        ease: 'power2.out'
      },
      onUpdate: (self) => {
        // Track x + pan come from the smoothed driver (tl.onUpdate); this only
        // resolves the active section, off raw scroll progress.
        const px = self.progress * total
        const half = window.innerHeight / 2
        scheduleSettle()
        for (let i = 0; i < count - 1; i++) {
          if (px < panEnds[i] + half) return setActive(i)
        }
        setActive(count - 1)
      }
    })
    applyProgress(0)
    startDepth()
  }

  // Subtle depth: the scale is lerped on the ticker so it eases toward its
  // target every frame (staying smooth through snap) instead of jumping.
  const inners = () => panels.map((p) => p.querySelector('.app-slide') || p)
  const smoothstep = (t) => t * t * (3 - 2 * t)
  let innerEls = []
  let depthScales = []
  let depthTick = null
  const startDepth = () => {
    if (mode !== 'h' || depthTick) return
    innerEls = inners()
    depthScales = innerEls.map(() => 1)
    // A lerp never actually arrives, so without an epsilon this writes a scale
    // to every panel on every frame forever, even at rest. Snap inside EPS and
    // skip the write once settled.
    const EPS = 0.0005
    depthTick = () => {
      const vw = window.innerWidth
      const x = gsap.getProperty(track, 'x') || 0
      for (let i = 0; i < count; i++) {
        const d = Math.min(Math.abs(i + x / vw), 1)
        const target = 1 - 0.05 * smoothstep(d)
        const cur = depthScales[i]
        if (Math.abs(target - cur) < EPS) {
          if (cur !== target) {
            depthScales[i] = target
            gsap.set(innerEls[i], { scale: target, transformOrigin: 'center center', force3D: true })
          }
          continue
        }
        depthScales[i] = cur + (target - cur) * 0.12
        gsap.set(innerEls[i], { scale: depthScales[i], transformOrigin: 'center center', force3D: true })
      }
    }
    gsap.ticker.add(depthTick)
  }
  const stopDepth = () => {
    if (depthTick) gsap.ticker.remove(depthTick)
    depthTick = null
  }

  /* -------------------------------------------------------- mobile: vertical */

  const buildVertical = () => {
    gsap.set(track, { clearProps: 'transform' })
    gsap.set(panels, { clearProps: 'transform,opacity,scale' })
    panels.forEach((p) => {
      const inner = p.querySelector('.app-slide')
      if (inner) gsap.set(inner, { clearProps: 'transform,opacity' })
    })

    // Active = last panel whose top has crossed a probe line below the navbar.
    // Position-based on purpose: intersectionRatio breaks down when a panel
    // (e.g. Works) is far taller than the viewport.
    const pick = () => {
      const probe = navHeight() + Math.min(window.innerHeight * 0.35, 200)
      let best = 0
      for (let i = 0; i < count; i++) {
        if (panels[i].getBoundingClientRect().top - 1 <= probe) best = i
        else break
      }
      setActive(best)
      scheduleSettle()
    }

    let raf = null
    vScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => { raf = null; pick() })
    }
    window.addEventListener('scroll', vScroll, { passive: true })
    pick()
  }

  /* ------------------------------------------------------------------- build */

  const build = () => {
    releasePanels()
    innerEls = []
    mode = window.matchMedia(MOBILE_QUERY).matches ? 'v' : 'h'
    if (mode === 'v') buildVertical()
    else buildHorizontal()
  }

  const teardown = () => {
    clearTimeout(settleTimer)
    settleTimer = null
    stopDepth()
    st?.kill()
    st = null
    tl?.kill()
    tl = null
    io?.disconnect()
    io = null
    if (vScroll) window.removeEventListener('scroll', vScroll)
    vScroll = null
  }

  /* -------------------------------------------------------------- public API */

  const goTo = (i, { immediate = false, duration = 0.8 } = {}) => {
    const clamped = Math.max(0, Math.min(count - 1, i))

    if (mode === 'h') {
      if (!st) return
      const y = st.start + (arrivals[clamped] / total) * (st.end - st.start)
      if (immediate || reduced) {
        st.scroll(y)
      } else {
        // Lock snap to this arrival for the tween (plus a beat for snap to
        // settle), so trailing inertia can't drift the scroll off it.
        navTarget = arrivals[clamped] / total
        gsap.to(window, {
          scrollTo: { y, autoKill: false },
          duration,
          ease: 'power2.inOut',
          onComplete: () => gsap.delayedCall(0.6, () => { navTarget = null })
        })
      }
    } else {
      const target = window.scrollY + panels[clamped].getBoundingClientRect().top - navHeight()
      if (immediate || reduced) window.scrollTo(0, Math.max(0, target))
      // autoKill:false — on iOS the scroll readback lags a frame, which gsap
      // misreads as a user scroll and kills the tween after only a few px.
      else gsap.to(window, { scrollTo: { y: Math.max(0, target), autoKill: false }, duration, ease: 'power2.inOut' })
    }
  }

  const refresh = (targetIdx) => {
    const active = typeof targetIdx === 'number' ? targetIdx : current < 0 ? 0 : current
    releasePanels()
    teardown()
    build()
    ScrollTrigger.refresh()
    goTo(active, { immediate: true })
  }

  // Light remeasure, no teardown: relayout via ScrollTrigger's onRefreshInit
  // while keeping the pin and scroll position, so a Works filter reshapes the
  // scrub without the jump a full rebuild causes.
  const remeasure = () => {
    if (mode !== 'h' || !st) return
    ScrollTrigger.refresh()
  }

  const destroy = () => {
    teardown()
    releasePanels()
  }

  build()
  ScrollTrigger.refresh()
  // ScrollTrigger calls onUpdate when progress *changes*, and a fresh load sits
  // at 0 — so nothing would ever announce the first panel's arrival and its
  // entrance would wait forever. Seed the active index and start the clock.
  setActive(current < 0 ? 0 : current)
  scheduleSettle()

  return { goTo, refresh, remeasure, destroy }
}
