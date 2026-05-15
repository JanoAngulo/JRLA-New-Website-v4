<template>
  <div
    class="fixed items-center hidden w-full pointer-events-none lg:grid top-14 start-0"
    :style="{
      height: windowWidth >= 768 ? `${desktopHeight}px` : `${mobileHeight}px`,
      zIndex: 'var(--z-nav)'
    }">
    <div class="flex justify-between w-full px-2 xl:px-3">
      <button
        type="button"
        @click="slidePrev"
        aria-label="Previous slide"
        :class="['nav-arrow', { 'nav-arrow--hidden': swiperBeginning }]">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button
        type="button"
        @click="slideNext"
        aria-label="Next slide"
        :class="['nav-arrow nav-arrow--right', { 'nav-arrow--hidden': swiperEnd }]">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  </div>
  <div class="relative website-portfolio pt-14">
    <swiper-container class="w-full app-slider" init="false">
      <swiper-slide class="">
        <home
        :windowWidth="windowWidth"
        :desktopHeight="desktopHeight"
        :mobileHeight="mobileHeight"
        :activeSlide="slideInView">
        </home></swiper-slide>
      <swiper-slide class="">
        <features
        :windowWidth="windowWidth"
        :desktopHeight="desktopHeight"
        :mobileHeight="mobileHeight"
        :activeSlide="slideInView">
      </features>
      </swiper-slide>
      <swiper-slide class="">
        <works
        :windowWidth="windowWidth"
        :desktopHeight="desktopHeight"
        :mobileHeight="mobileHeight"
        :activeSlide="slideInView">
        </works></swiper-slide>
      <swiper-slide class="overflow-y-auto-scroll">
        <about
        :activeSlide="slideInView"
        :windowWidth="windowWidth"
        :desktopHeight="desktopHeight"
        :mobileHeight="mobileHeight"
        @changeSlide="slideToWork">
        </about>
      </swiper-slide>
      <swiper-slide class="">
        <contact
        :windowWidth="windowWidth"
        :desktopHeight="desktopHeight"
        :mobileHeight="mobileHeight"
        :activeSlide="slideInView">
        </contact></swiper-slide>
    </swiper-container>
    <navbar :activeSlide="activeIndex"></navbar>
  </div>
</template>

<script>
  import { Keyboard } from 'swiper/modules'
  import Home from './Home.vue'
  import Navbar from './Navbar.vue'
  import About from './About.vue'
  import Features from './Features.vue'
  import Works from './Works.vue'
  import Contact from './Contact.vue'

  export default {
    components: {
      Home,
      Navbar,
      Features,
      About,
      Works,
      Contact
    },
    data() {
      return {
        desktopHeight: 0,
        mobileHeight: 0,
        windowWidth: 0,
        activeIndex: 0,
        slideInView: 'home',
        swiperBeginning: true,
        swiperEnd: false
      }
    },
    methods: {
      slideToWork() {
        const swiper = document.querySelector('.app-slider').swiper
        swiper.slideTo(2)
      },
      initialSlide() {
        const swiper = document.querySelector('.app-slider').swiper
        swiper.slideTo(0)
      },
      slidePrev() {
        const swiperEl = document.querySelector('.app-slider').swiper
        swiperEl.slidePrev()
      },
      slideNext() {
        const swiperEl = document.querySelector('.app-slider').swiper
        swiperEl.slideNext()
      },
      initializeSwiper() {
        const swiperEl = document.querySelector('.app-slider')
        const swiperParams = {
          modules: [Keyboard],
          breakpoints: {
            768: {
              allowTouchMove: false
            },
            0: {
              allowTouchMove: true
            }
          },
          slidesPerView: 1,
          speed: 1000,
          simulateTouch: false,
          preventClicks: false,
          preventClicksPropagation: false,
          touchStartPreventDefault: false,
          noSwipingClass: 'no-swipe',
          keyboard: {
            enabled: true,
            onlyInViewport: true
          }
        }
        Object.assign(swiperEl, swiperParams)
        swiperEl.initialize()
        this.initialSlide()
      },
      slideAnimation() {
        const swiperEl = document.querySelector('.app-slider').swiper
        const map = ['home', 'features', 'works', 'about', 'contact']
        swiperEl.on('slideChangeTransitionEnd', () => {
          this.slideInView = map[this.activeIndex] || ''
        })
      },
      navbarSlideIndex() {
        const swiper = document.querySelector('.app-slider').swiper
        swiper.on('slideChange', () => {
          this.activeIndex = swiper.activeIndex
          this.swiperEnd = swiper.isEnd
          this.swiperBeginning = swiper.isBeginning
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
        const bannerStyle = [
          'color: #8b5cf6',
          'font-weight: 700',
          'font-family: monospace',
          'font-size: 12px',
          'text-shadow: 0 0 6px rgba(139,92,246,0.45)'
        ].join(';')

        const labelStyle = (bg) => [
          `background: ${bg}`,
          'color: #ffffff',
          'font-weight: 600',
          'padding: 2px 8px',
          'border-radius: 4px',
          'font-size: 11px',
          'margin-right: 6px'
        ].join(';')

        const textStyle = 'color: #cbd5e1; font-size: 12px; line-height: 1.6;'
        const accentStyle = 'color: #f472b6; font-weight: 600;'
        const linkStyle = 'color: #38bdf8; font-weight: 600; text-decoration: underline;'
        const dimStyle = 'color: #64748b; font-style: italic; font-size: 11px;'

        console.log('%c' + banner, bannerStyle)
        console.log('%cWELCOME%c Hello there, traveler! 👋', labelStyle('#6366f1'), textStyle)
        console.log('%cCURIOUS%c Poking around DevTools? %cRespect.%c 🧐', labelStyle('#8b5cf6'), textStyle, accentStyle, textStyle)
        console.log('%cBUILT%c Vue 3 · Vite · Swiper · TailwindCSS 🛠️', labelStyle('#10b981'), textStyle)
        console.log('%cHIRING?%c Let\'s build something. 🚀', labelStyle('#f59e0b'), textStyle)
        console.log('%cCONTACT%c %cAngulo.johnrussel.l.7814@gmail.com%c  📧', labelStyle('#ec4899'), textStyle, linkStyle, textStyle)
        console.log('%c// tip: try the contact form, it\'s prettier than this console.', dimStyle)
      },
      updateHeights() {
        const navbar = document.getElementById('mainNavbar')
        const navbarHeight = navbar ? navbar.offsetHeight : 0
        this.windowWidth = window.innerWidth
        this.desktopHeight = window.innerHeight - navbarHeight
        this.mobileHeight = window.innerHeight - navbarHeight
      }
    },
    mounted() {
      window.addEventListener('resize', this.updateHeights)
      this.updateHeights()

      this.logMessage()
      this.initializeSwiper()
      this.slideAnimation()
      this.navbarSlideIndex()
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.updateHeights)
    }
  }
</script>

<style scoped>
  .nav-arrow {
    pointer-events: auto;
    display: grid;
    place-content: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 0, 0, 0.08);
    color: var(--color-dark);
    font-size: 0.95rem;
    cursor: pointer;
    box-shadow: 0 4px 16px -4px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.25s ease, color 0.25s ease, border-color 0.25s ease, opacity 0.3s ease;
  }

  :is(.dark) .nav-arrow {
    background: rgba(33, 33, 36, 0.7);
    border-color: rgba(255, 255, 255, 0.1);
    color: var(--color-light);
    box-shadow: 0 4px 16px -4px rgba(0, 0, 0, 0.5);
  }

  .nav-arrow:hover {
    background: var(--color-light-primary);
    color: var(--color-dark);
    border-color: var(--color-light-primary);
  }

  :is(.dark) .nav-arrow:hover {
    background: var(--color-dark-primary);
    color: var(--color-dark);
    border-color: var(--color-dark-primary);
  }

  .nav-arrow:not(.nav-arrow--right):hover {
    transform: translateX(-3px);
  }

  .nav-arrow--right:hover {
    transform: translateX(3px);
  }

  .nav-arrow--hidden {
    opacity: 0;
    pointer-events: none;
  }

  .nav-arrow:focus-visible {
    outline: 2px solid var(--color-light-primary);
    outline-offset: 3px;
  }

  :is(.dark) .nav-arrow:focus-visible {
    outline-color: var(--color-dark-primary);
  }
</style>
