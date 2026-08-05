// Section entrance-reveal mixin (Options API).
//
// Drives an `entered` flag off the `activeSlide` prop so a panel's entrance
// replays every time that section becomes active. Bind the panel root with
// `:class="{ 'is-revealed': entered }"` — all reveal CSS is gated on that
// ancestor class, so one flag controls the whole section.
//
// - Enter: reveal via double-rAF, so the hidden from-state paints one frame
//   before the flip (otherwise the transition has nothing to animate).
// - Leave: reset to hidden after a delay, once the panel is off-screen.
// - Fast return, before the reset landed: force a reset + replay.
//
// `gateReady`: Home is already active while WebView still has the scroll wrap
// at `visibility:hidden`, so its reveal would finish unseen. With gateReady the
// initial reveal waits for the `ready` prop instead.
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
