import { markRaw } from 'vue'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(CustomEase)

// Panel entrance engine — one GSAP timeline per section, replayed on every entry.
//
// Replaces the old CSS `.is-revealed` system. Three things moved with it:
//
// 1. The ladder. Delays used to live in the markup as a dozen inline `--d`
//    values per panel, hand-kept in sync across two columns. Here a panel's
//    rhythm is one timeline: elements default to DOM-order stagger and only the
//    ones that genuinely break rank carry a `data-reveal-at`.
// 2. The from-state. CSS hid these elements, so a JS failure left the page
//    permanently blank. GSAP writes the from-state at runtime instead — the
//    markup's natural state is the visible one.
// 3. The cue. See `onSettle` in useHorizontalScroll: entrances start when travel
//    actually stops, not when the active section resolves half a viewport early.
//
// Markup contract — one attribute opts an element in:
//
//   data-reveal="fade"   opacity + a short rise            (was `.reveal-fade`)
//   data-reveal="line"   yPercent 105 → 0, inside a `.reveal-line` overflow mask
//   data-reveal="slide"  xPercent → 0 with opacity         (panel halves)
//   data-reveal="drift"  like slide, but lands last and travels further
//   data-reveal="draw"   `--reveal-draw` 0 → 1; CSS decides what that scales, so
//                        a hairline can run down one axis at one breakpoint and
//                        across the other at another without JS knowing
//
// Modifiers: data-reveal-at (absolute start, seconds) · data-reveal-x (xPercent)
// · data-reveal-y (rise in px) · data-reveal-o (revealed opacity).

// --ease-out from the theme, exactly. DESIGN.md calls it the default curve and
// nothing else is a system curve, so the timeline uses the same one the CSS
// transitions did rather than an approximation from GSAP's built-ins.
const EASE = CustomEase.create('jrlaOut', 'M0,0 C0.23,1 0.32,1 1,1')

// --dur-reveal. The one duration allowed past 300ms, because a panel arriving is
// editorial rather than UI.
const DUR = 0.45

// Past ~80ms apart, items read as queueing rather than arriving together.
const STAGGER = 0.06
const LEAD = 0.06

// Exits are faster than entrances and do not stagger: leaving is not a moment.
const OUT_DUR = 0.24

const num = (v, d) => {
  const n = parseFloat(v)
  return Number.isFinite(n) ? n : d
}

// from-state per kind. `to` is always the element's natural state, which is why
// the markup needs no hidden class.
const FROM = {
  fade: (el) => ({ opacity: 0, y: num(el.dataset.revealY, 10) }),
  line: () => ({ yPercent: 105 }),
  slide: (el) => ({ opacity: 0, xPercent: num(el.dataset.revealX, -3) }),
  drift: (el) => ({ opacity: 0, xPercent: num(el.dataset.revealX, 4) }),
  draw: () => ({ '--reveal-draw': 0 })
}

// `draw` animates a custom property and lets CSS decide what it drives, which is
// usually a transform. force3D would have GSAP write its own `translate3d` inline
// and silently win over that rule — the var animates, the element never moves.
// Nothing here composites a transform of its own, so it does not want the hint.
const NO_FORCE_3D = new Set(['draw'])

const TO = {
  fade: (el) => ({ opacity: num(el.dataset.revealO, 1), y: 0 }),
  line: () => ({ yPercent: 0 }),
  slide: (el) => ({ opacity: num(el.dataset.revealO, 1), xPercent: 0 }),
  drift: (el) => ({ opacity: num(el.dataset.revealO, 1), xPercent: 0 }),
  draw: () => ({ '--reveal-draw': 1 })
}

/**
 * @param {string} name  section id, matched against `activeSlide` / `settledSlide`
 * @param {Object} [opts]
 * @param {boolean} [opts.gateReady]  also wait for the `ready` prop (Home: the
 *   boot overlay). Without it a panel would animate under an opaque plate.
 * @param {number} [opts.readyDelay]  ms held after `ready`, measured against the
 *   overlay's fade rather than against scroll travel.
 * @param {string} [opts.media]  only build the timeline when this media query
 *   matches. Works needs it: on mobile the section goes active later than its
 *   cards' scroll-scrub, so an entrance here would hold the header hidden while
 *   a card was already fading in below it.
 */
export function panelEntrance(name, { gateReady = false, readyDelay = 0, media = '' } = {}) {
  return {
    data() {
      return { tl: null, playTimer: null, played: false }
    },
    watch: {
      settledSlide() {
        this.maybePlayEntrance()
      },
      activeSlide(v) {
        if (v !== name) this.retractEntrance()
      },
      ...(gateReady
        ? {
            ready() {
              this.maybePlayEntrance()
            }
          }
        : {})
    },
    mounted() {
      this.buildEntrance()
      this.maybePlayEntrance()
    },
    beforeUnmount() {
      clearTimeout(this.playTimer)
      this.tl?.kill()
      this.tl = null
    },
    methods: {
      buildEntrance() {
        const root = this.$el
        if (!root?.querySelectorAll) return

        // Reduced motion gets no timeline at all. Because the from-state is
        // written by JS, doing nothing leaves every element in its natural
        // visible state — no override rules to maintain.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        if (media && !window.matchMedia(media).matches) return

        const targets = Array.from(root.querySelectorAll('[data-reveal]')).filter(
          (el) => FROM[el.dataset.reveal]
        )
        if (!targets.length) return

        const tl = gsap.timeline({ paused: true })
        targets.forEach((el, i) => {
          const kind = el.dataset.reveal
          const at = num(el.dataset.revealAt, LEAD + i * STAGGER)
          const hint = NO_FORCE_3D.has(kind) ? null : { force3D: true }
          tl.fromTo(
            el,
            { ...FROM[kind](el), ...hint },
            { ...TO[kind](el), ...hint, duration: DUR, ease: EASE },
            at
          )
        })
        // Paused at time 0 means every target is already sitting in its
        // from-state, so the panel is hidden before it is ever on screen.
        tl.pause(0)
        this.tl = markRaw(tl)
      },
      maybePlayEntrance() {
        if (!this.tl) return
        if (this.settledSlide !== name) return
        if (gateReady && !this.ready) return
        if (this.played) return
        this.played = true
        clearTimeout(this.playTimer)
        const run = () => {
          this.playTimer = null
          // timeScale is reset here, not after the reverse: an interrupted exit
          // would otherwise replay the whole entrance at exit speed.
          this.tl?.timeScale(1).play(0)
        }
        if (readyDelay > 0) this.playTimer = setTimeout(run, readyDelay)
        else run()
      },
      // Leaving rewinds rather than snapping: the panel is still on screen while
      // it slides away. Cancelling a pending play is unconditional — a play still
      // on its hold would otherwise fire off-screen and leave `played` true, and
      // the next return would skip the entrance having decided it already ran.
      retractEntrance() {
        clearTimeout(this.playTimer)
        this.playTimer = null
        if (!this.played) return
        this.played = false
        this.tl?.timeScale(DUR / OUT_DUR).reverse()
      }
    }
  }
}
