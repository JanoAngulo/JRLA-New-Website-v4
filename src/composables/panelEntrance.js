import { markRaw } from 'vue'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(CustomEase)

// One GSAP timeline per section, replayed on every settled entry. JS writes the
// from-state, so if it fails the markup stays visible.
//
// Markup contract:
//
//   data-reveal="fade"   opacity + a short rise
//   data-reveal="line"   yPercent 105 → 0, inside a `.reveal-line` overflow mask
//   data-reveal="slide"  xPercent → 0 with opacity         (panel halves)
//   data-reveal="drift"  like slide, but lands last and travels further
//   data-reveal="draw"   `--reveal-draw` 0 → 1; CSS decides what that scales
//
// Modifiers: data-reveal-at (absolute start, seconds) · data-reveal-x (xPercent)
// · data-reveal-y (rise in px) · data-reveal-o (revealed opacity).

// Exactly the theme's --ease-out, not a GSAP built-in approximation.
const EASE = CustomEase.create('jrlaOut', 'M0,0 C0.23,1 0.32,1 1,1')

// --dur-reveal: the one duration allowed past 300ms.
const DUR = 0.45

// Past ~80ms apart, items read as queueing rather than arriving together.
const STAGGER = 0.06
const LEAD = 0.06

// Exits run faster and do not stagger.
const OUT_DUR = 0.24

const num = (v, d) => {
  const n = parseFloat(v)
  return Number.isFinite(n) ? n : d
}

// `TO` is always the element's natural state, so markup needs no hidden class.
const FROM = {
  fade: (el) => ({ opacity: 0, y: num(el.dataset.revealY, 10) }),
  line: () => ({ yPercent: 105 }),
  slide: (el) => ({ opacity: 0, xPercent: num(el.dataset.revealX, -3) }),
  drift: (el) => ({ opacity: 0, xPercent: num(el.dataset.revealX, 4) }),
  draw: () => ({ '--reveal-draw': 0 })
}

// force3D writes an inline `translate3d` that silently beats the CSS transform
// `--reveal-draw` drives: the var animates, the element never moves.
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
 *   boot overlay), so the panel doesn't animate under an opaque plate.
 * @param {number} [opts.readyDelay]  ms held after `ready`, timed to the overlay's fade.
 * @param {string} [opts.media]  only build the timeline when this media query
 *   matches (Works: on mobile its cards scrub in before the section goes active).
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

        // Reduced motion: no timeline, so every element keeps its visible state.
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
        // Pausing at 0 applies the from-state before the panel is ever on screen.
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
          // Reset timeScale here, or an interrupted exit replays the entrance at exit speed.
          this.tl?.timeScale(1).play(0)
        }
        if (readyDelay > 0) this.playTimer = setTimeout(run, readyDelay)
        else run()
      },
      // Rewinds, since the panel is still visible as it slides away. Always cancel a
      // pending play, or it fires off-screen and the next return skips the entrance.
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
