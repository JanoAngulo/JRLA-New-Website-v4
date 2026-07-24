// Section entrance-reveal mixin (Options API).
//
// Drives an `entered` flag off the `activeSlide` prop so a panel's entrance
// animation REPLAYS every time that section becomes active — not just once.
// Bind the panel root with `:class="{ 'is-revealed': entered }"`; all the
// reveal CSS is gated on `.is-revealed` (ancestor), so this one flag controls
// the whole section.
//
// - Enter (activeSlide === name): reveal (double-rAF so the hidden from-state
//   paints one frame before the flip, or the transition has nothing to animate).
// - Leave: reset to hidden after a short delay, once the panel has scrolled
//   off-screen, so the next entry can replay cleanly.
// - Fast return (before the reset landed): force a reset+replay.
//
// `gateReady`: Home starts already-active while WebView keeps the scroll wrap
// `visibility:hidden`. Revealing then would fire while hidden (finishes unseen).
// With gateReady the initial reveal waits for the `ready` prop instead.
export function sectionReveal(name, { gateReady = false } = {}) {
  return {
    data() {
      return { entered: false, _leaveTimer: null }
    },
    watch: {
      activeSlide(v) {
        this._onActiveChange(v)
      },
      ...(gateReady
        ? {
            ready(v) {
              if (v && this.activeSlide === name) this._revealSection()
            }
          }
        : {})
    },
    mounted() {
      if (this.activeSlide === name && (!gateReady || this.ready)) this._revealSection()
    },
    beforeUnmount() {
      clearTimeout(this._leaveTimer)
    },
    methods: {
      _onActiveChange(v) {
        if (v === name) {
          const wasLeaving = !!this._leaveTimer
          clearTimeout(this._leaveTimer)
          this._leaveTimer = null
          if (!this.entered || wasLeaving) this._revealSection(true)
        } else if (this.entered && !this._leaveTimer) {
          this._leaveTimer = setTimeout(() => {
            this.entered = false
            this._leaveTimer = null
          }, 600)
        }
      },
      _revealSection(force = false) {
        if (this.entered && !force) return
        if (force) this.entered = false
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            this.entered = true
          })
        )
      }
    }
  }
}
