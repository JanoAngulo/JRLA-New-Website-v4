<template>
  <a href="#main-content" class="skip-link">Skip to content</a>

  <!-- Prev / Next arrows (desktop) -->
  <div
    class="fixed items-center hidden w-full pointer-events-none lg:grid top-14 start-0 app-slide"
    :style="{ zIndex: 'var(--z-nav)' }">
    <div class="flex justify-between w-full px-2 xl:px-3">
      <button
        type="button"
        @click="prev"
        aria-label="Previous section"
        class="nav-arrow nav-arrow-prev focus-visible:[outline:2px_solid_var(--color-light-primary)] dark:focus-visible:[outline:2px_solid_var(--color-dark-primary)] focus-visible:outline-offset-[3px]"
        :class="{ 'is-hidden': activeIndex === 0 }">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button
        type="button"
        @click="next"
        aria-label="Next section"
        class="nav-arrow nav-arrow-next focus-visible:[outline:2px_solid_var(--color-light-primary)] dark:focus-visible:[outline:2px_solid_var(--color-dark-primary)] focus-visible:outline-offset-[3px]"
        :class="{ 'is-hidden': activeIndex === lastIndex }">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  </div>

  <!-- Prev / Next arrows (mobile — vertical, so up/down) -->
  <div
    class="fixed bottom-4 end-4 flex flex-col gap-2 pointer-events-none lg:hidden"
    :style="{ zIndex: 'var(--z-nav)' }">
    <button
      type="button"
      @click="prev"
      aria-label="Previous section"
      class="nav-arrow nav-arrow-up focus-visible:[outline:2px_solid_var(--color-light-primary)] dark:focus-visible:[outline:2px_solid_var(--color-dark-primary)] focus-visible:outline-offset-[3px]"
      :class="{ 'is-hidden': activeIndex === 0 }">
      <i class="fa-solid fa-chevron-up"></i>
    </button>
    <button
      type="button"
      @click="next"
      aria-label="Next section"
      class="nav-arrow nav-arrow-down focus-visible:[outline:2px_solid_var(--color-light-primary)] dark:focus-visible:[outline:2px_solid_var(--color-dark-primary)] focus-visible:outline-offset-[3px]"
      :class="{ 'is-hidden': activeIndex === lastIndex }">
      <i class="fa-solid fa-chevron-down"></i>
    </button>
  </div>

  <div class="relative website-portfolio">
    <main id="main-content" tabindex="-1" data-skip-target>
    <div ref="wrap" class="h-scroll-wrap" :style="{ visibility: ready ? 'visible' : 'hidden' }">
      <div ref="track" class="h-scroll-track">
        <section class="h-panel" :inert="panelInert(0)">
          <home
            :windowWidth="windowWidth"
            :desktopHeight="desktopHeight"
            :mobileHeight="mobileHeight"
            :ready="ready"
            :activeSlide="slideInView">
          </home>
        </section>
        <section class="h-panel" :inert="panelInert(1)">
          <div class="section-divider text-dark dark:text-light" aria-hidden="true">
            <span class="sd-num">02</span><span class="sd-name">Features</span>
          </div>
          <features
            :windowWidth="windowWidth"
            :desktopHeight="desktopHeight"
            :mobileHeight="mobileHeight"
            :activeSlide="slideInView">
          </features>
        </section>
        <section class="h-panel" :inert="panelInert(2)">
          <div class="section-divider text-dark dark:text-light" aria-hidden="true">
            <span class="sd-num">03</span><span class="sd-name">Works</span>
          </div>
          <works
            :windowWidth="windowWidth"
            :desktopHeight="desktopHeight"
            :mobileHeight="mobileHeight"
            :activeSlide="slideInView"
            @remeasure="onWorksRemeasure">
          </works>
        </section>
        <section class="h-panel" :inert="panelInert(3)">
          <div class="section-divider text-dark dark:text-light" aria-hidden="true">
            <span class="sd-num">04</span><span class="sd-name">About</span>
          </div>
          <about
            :activeSlide="slideInView"
            :windowWidth="windowWidth"
            :desktopHeight="desktopHeight"
            :mobileHeight="mobileHeight"
            @changeSlide="goToWork">
          </about>
        </section>
        <section class="h-panel" :inert="panelInert(4)">
          <div class="section-divider text-dark dark:text-light" aria-hidden="true">
            <span class="sd-num">05</span><span class="sd-name">Contact</span>
          </div>
          <contact
            :windowWidth="windowWidth"
            :desktopHeight="desktopHeight"
            :mobileHeight="mobileHeight"
            :activeSlide="slideInView">
          </contact>
        </section>
      </div>
    </div>
    </main>
    <navbar :activeSlide="activeIndex" @go="goTo"></navbar>
  </div>
</template>

<script>
  import { createHorizontalScroll } from '../composables/useHorizontalScroll'
  import Home from './Home.vue'
  import Navbar from './Navbar.vue'
  import About from './About.vue'
  import Features from './Features.vue'
  import Works from './Works.vue'
  import Contact from './Contact.vue'

  const SECTIONS = ['home', 'features', 'works', 'about', 'contact']

  export default {
    components: { Home, Navbar, Features, About, Works, Contact },
    data() {
      return {
        desktopHeight: 0,
        mobileHeight: 0,
        windowWidth: 0,
        activeIndex: 0,
        slideInView: 'home',
        scroller: null,
        resizeRaf: null,
        remeasureRaf: null,
        ready: false,
        deepLinking: false,
        booted: false,
        pendingDeepLink: null
      }
    },
    computed: {
      lastIndex() {
        return SECTIONS.length - 1
      },
      // Matches MOBILE_QUERY in useHorizontalScroll — above this the pager is
      // horizontal and shows exactly one panel; below it every panel is stacked
      // and genuinely on the page.
      isDesktop() {
        return this.windowWidth >= 768
      }
    },
    methods: {
      // Desktop keeps all five panels mounted inside a clipped track and moves
      // them with a transform, so the four you can't see were still in the tab
      // order: a keyboard visitor reading Contact could tab into Home's social
      // links, and focusing an off-screen node made the browser scroll the
      // clipped wrap — which GSAP never resets, permanently offsetting the
      // layout. `inert` takes them out of focus, pointer and AT reach in one
      // attribute. Mobile never gets it: there, every panel is really visible.
      panelInert(idx) {
        return this.isDesktop && idx !== this.activeIndex
      },
      // Belt-and-braces for the same bug: anything that still manages to focus
      // inside the clipped box (a browser restoring focus, an extension) scrolls
      // it instead of the page. The track's x is GSAP's, so any scroll here is
      // corruption — put it back.
      // Fired by App once the boot overlay has gone. Two jobs: re-fit the pager
      // (it measured itself while <html> was scroll-locked) and release the
      // deep-link scroll that could not run against a locked document.
      onBooted() {
        this.booted = true
        const pending = this.pendingDeepLink
        this.pendingDeepLink = null
        if (!this.deepLinking) this.scroller?.refresh(this.activeIndex)
        if (pending) pending()
      },
      onWrapScroll() {
        const wrap = this.$refs.wrap
        if (!wrap) return
        if (wrap.scrollLeft !== 0) wrap.scrollLeft = 0
        if (wrap.scrollTop !== 0) wrap.scrollTop = 0
      },
      hashToIndex(hash) {
        const idx = SECTIONS.indexOf((hash || '').replace('#', ''))
        return idx === -1 ? 0 : idx
      },
      indexToHash(idx) {
        return '#' + (SECTIONS[idx] || 'home')
      },
      goTo(idx, opts) {
        this.scroller?.goTo(idx, opts)
      },
      goToWork() {
        this.goTo(2)
      },
      onWorksRemeasure() {
        // Works filter changed the grid height → the pause-and-pan length is
        // stale. Reshape the scrub in place (no teardown), then reset to the top
        // of Works. Resetting is necessary because a shorter list means the same
        // scroll pixels map to a higher progress — without it, shortening the
        // list reads as forward scroll and can jump to a later section.
        // Desktop-only (mobile scrolls natively). rAF lets the filtered layout
        // settle before measuring.
        if (this.windowWidth < 768 || !this.scroller) return
        if (this.remeasureRaf) cancelAnimationFrame(this.remeasureRaf)
        this.remeasureRaf = requestAnimationFrame(() => {
          this.remeasureRaf = null
          if (this.deepLinking) return
          this.scroller.remeasure()
          this.goTo(2, { immediate: true }) // snap to Works arrival (top)
        })
      },
      prev() {
        this.goTo(this.activeIndex - 1)
      },
      next() {
        this.goTo(this.activeIndex + 1)
      },
      onActive(idx) {
        this.activeIndex = idx
        this.slideInView = SECTIONS[idx] || ''
        const nextHash = this.indexToHash(idx)
        if (this.$route?.hash !== nextHash) {
          this.$router.replace({ path: '/', hash: nextHash }).catch(() => {})
        }
      },
      // Arrow keys page the issue — but this listener is on `window`, so it sees
      // every keystroke in the document, including the ones meant for a text
      // field. Pressing ArrowLeft to fix a typo in the contact form used to tween
      // the pager to the next panel with focus left behind in an off-screen
      // textarea: the visitor kept typing into something they could no longer
      // see. Contact is one of the two things this site exists to produce, so the
      // caret wins every time.
      isTypingTarget(el) {
        if (!(el instanceof HTMLElement)) return false
        if (el.isContentEditable) return true
        const tag = el.tagName
        if (tag === 'TEXTAREA' || tag === 'SELECT') return true
        if (tag !== 'INPUT') return false
        // Checkboxes/radios/buttons don't consume arrow keys the way text does,
        // but they're rare here and letting them page is the friendlier default.
        return !['checkbox', 'radio', 'button', 'submit', 'reset'].includes(el.type)
      },
      onKeydown(e) {
        // A modifier means the visitor is asking the browser or the OS for
        // something (history nav, word jump, text selection), not asking us to
        // turn the page.
        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
        // IME composition: arrow keys are candidate selection, not navigation.
        if (e.isComposing || e.keyCode === 229) return
        if (this.isTypingTarget(e.target)) return
        // A dialog owns the viewport while it's open; the pager behind it must
        // not move under the visitor's reading position.
        if (document.querySelector('[role="dialog"][aria-modal="true"]:not([inert])')) return

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          this.next()
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          this.prev()
        } else {
          return
        }
        // Only claim the event once it's actually ours, so an unhandled key
        // still reaches the browser's own scrolling.
        e.preventDefault()
      },
      updateHeights() {
        const navbar = document.getElementById('mainNavbar')
        const navbarHeight = navbar ? navbar.offsetHeight : 0
        this.windowWidth = window.innerWidth
        this.desktopHeight = window.innerHeight - navbarHeight
        this.mobileHeight = window.innerHeight - navbarHeight
      },
      onResize() {
        if (this.resizeRaf) cancelAnimationFrame(this.resizeRaf)
        this.resizeRaf = requestAnimationFrame(() => {
          this.resizeRaf = null
          const prevWidth = this.windowWidth
          this.updateHeights()
          // iOS Safari/Edge fire resize when the address bar shows/hides on scroll
          // — height changes, width doesn't. On mobile, refresh() reposition-snaps
          // to the active panel top, yanking the user back mid-scroll. Only refresh
          // on a real width change (orientation flip, desktop resize).
          const mobile = window.matchMedia('(max-width: 767px)').matches
          if (mobile && window.innerWidth === prevWidth) return
          this.scroller?.refresh()
        })
      },
      logMessage() {
        const banner = `
     ██╗ ██████╗  ██╗      █████╗
     ██║ ██╔══██╗ ██║     ██╔══██╗
     ██║ ██████╔╝ ██║     ███████║
██   ██║ ██╔══██╗ ██║     ██╔══██║
╚█████╔╝ ██║  ██║ ███████╗██║  ██║
 ╚════╝  ╚═╝  ╚═╝ ╚══════╝╚═╝  ╚═╝
`
        const bannerStyle = ['color: #8b5cf6', 'font-weight: 700', 'font-family: monospace', 'font-size: 12px', 'text-shadow: 0 0 6px rgba(139,92,246,0.45)'].join(';')
        const labelStyle = (bg) => [`background: ${bg}`, 'color: #ffffff', 'font-weight: 600', 'padding: 2px 8px', 'border-radius: 4px', 'font-size: 11px', 'margin-right: 6px'].join(';')
        const textStyle = 'color: #cbd5e1; font-size: 12px; line-height: 1.6;'
        const accentStyle = 'color: #f472b6; font-weight: 600;'
        const linkStyle = 'color: #38bdf8; font-weight: 600; text-decoration: underline;'
        const dimStyle = 'color: #64748b; font-style: italic; font-size: 11px;'
        console.log('%c' + banner, bannerStyle)
        console.log('%cWELCOME%c Hello there, traveler! 👋', labelStyle('#6366f1'), textStyle)
        console.log('%cCURIOUS%c Poking around DevTools? %cRespect.%c 🧐', labelStyle('#8b5cf6'), textStyle, accentStyle, textStyle)
        console.log('%cBUILT%c Vue 3 · Vite · GSAP · TailwindCSS 🛠️', labelStyle('#10b981'), textStyle)
        console.log('%cHIRING?%c Let\'s build something. 🚀', labelStyle('#f59e0b'), textStyle)
        console.log('%cCONTACT%c %cAngulo.johnrussel.l.7814@gmail.com%c  📧', labelStyle('#ec4899'), textStyle, linkStyle, textStyle)
        console.log('%c// tip: try the contact form, it\'s prettier than this console.', dimStyle)
      }
    },
    mounted() {
      this.updateHeights()
      this.logMessage()

      const initialIdx = this.hashToIndex(this.$route?.hash)
      this.$nextTick(() => {
        this.scroller = createHorizontalScroll({
          wrap: this.$refs.wrap,
          track: this.$refs.track,
          onActive: this.onActive
        })
        // Start at Home, reveal, then SMOOTH-SCROLL across to the deep-linked
        // section (no instant jump). Simpler + reliable.
        this.onActive(0)
        const startAtDeepLink = () => {
          if (initialIdx <= 0) return
          this.deepLinking = true
          requestAnimationFrame(() => this.goTo(initialIdx, { duration: 1.4 }))
          setTimeout(() => { this.deepLinking = false }, 1700)
        }
        requestAnimationFrame(() => {
          // `ready` un-hides the track deliberately early: the panel paints behind
          // the boot overlay so its layout, fonts and images are settled by the
          // time the overlay lifts.
          this.ready = true
          // The travel itself has to wait — the overlay locks document scroll, and
          // a scrollTo against a locked document is a no-op that would silently
          // strand a shared #works link on Home.
          if (this.booted) startAtDeepLink()
          else this.pendingDeepLink = startAtDeepLink
        })

        // Images / fonts settle later and can shift pan length — remeasure, but
        // never while a deep-link scroll is animating (would yank it).
        const remeasure = () => { if (!this.deepLinking) this.scroller?.refresh(this.activeIndex) }
        // `load` may already have fired (it did reliably back when the boot
        // overlay gated this component's mount), and a listener added after the
        // event never runs — which silently lost the post-image re-measure.
        if (document.readyState === 'complete') remeasure()
        else window.addEventListener('load', remeasure, { once: true })
        if (document.fonts?.ready) document.fonts.ready.then(remeasure)
      })

      window.addEventListener('resize', this.onResize)
      window.addEventListener('keydown', this.onKeydown)
      window.addEventListener('jrla:booted', this.onBooted, { once: true })
      this.$refs.wrap?.addEventListener('scroll', this.onWrapScroll, { passive: true })
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.onResize)
      window.removeEventListener('keydown', this.onKeydown)
      window.removeEventListener('jrla:booted', this.onBooted)
      this.$refs.wrap?.removeEventListener('scroll', this.onWrapScroll)
      if (this.resizeRaf) cancelAnimationFrame(this.resizeRaf)
      if (this.remeasureRaf) cancelAnimationFrame(this.remeasureRaf)
      this.scroller?.destroy()
    }
  }
</script>
