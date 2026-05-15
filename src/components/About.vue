<template>
  <Transition name="fade">
    <div
      v-if="activeSlide === 'about'"
      ref="aboutSection"
      class="relative w-full md:overflow-hidden overflow-y-auto"
      :style="{ height: windowWidth >= 768 ? `${desktopHeight}px` : `${mobileHeight}px` }">
      <div class="about-grid h-full w-full">
        <!-- LEFT: portrait on accent block -->
        <section class="about-left relative dark:bg-dark-primary bg-light-primary text-dark overflow-hidden">
          <!-- Corner meta labels -->
          <div class="absolute top-0 inset-x-0 z-10 flex items-start justify-between px-5 md:px-8 pt-5 md:pt-8 font-Mono text-[10px] tracking-[0.3em] uppercase">
            <span>Portrait · 2022</span>
            <span class="opacity-70">JR / Angulo</span>
          </div>

          <!-- Portrait — framed by accent block -->
          <div class="portrait-frame">
            <img
              src="@/assets/img/picture.webp"
              alt="Portrait of John Russel Angulo, photographed in Bulacan"
              class="portrait-img"
              width="800"
              height="1000"
              fetchpriority="high"
              decoding="async" />
          </div>

          <!-- Bottom caption -->
          <div class="absolute bottom-0 inset-x-0 z-10 flex items-end justify-between px-5 md:px-8 pb-5 md:pb-8 font-Mono text-[10px] tracking-[0.3em] uppercase">
            <span>— Photographed in Bulacan</span>
            <span class="hidden sm:inline opacity-70">FIG. 01</span>
          </div>
        </section>

        <!-- RIGHT: biography -->
        <section class="about-right relative dark:bg-dark bg-light dark:text-light text-dark md:overflow-y-auto">
          <div class="relative flex flex-col md:justify-between p-6 md:p-10 lg:p-14 gap-6 md:h-full">
            <!-- Top eyebrow -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 font-Mono text-[10px] tracking-[0.3em] uppercase opacity-70">
              <span>04 — Biography</span>
              <span class="hidden sm:inline">Issue / 2026</span>
            </div>

            <!-- Headline + body -->
            <div class="space-y-5">
              <p class="font-Mono text-xs tracking-[0.35em] uppercase opacity-60">— Who I Am</p>
              <h2 class="about-heading font-Gilroy-extra-bold uppercase leading-[0.92]">
                <span class="block">Designing Seamless</span>
                <span class="block">Journeys, <em class="not-italic dark:text-dark-primary text-light-primary">One</em></span>
                <span class="block"><em class="not-italic dark:text-dark-primary text-light-primary">Pixel</em> At A Time.</span>
              </h2>
              <div class="hairline"></div>
              <p class="about-body font-Gilroy text-base sm:text-lg leading-relaxed opacity-90 max-w-2xl">
                Hi, I'm Jano — a UI/UX designer and front-end developer with over <span class="dark:text-dark-primary text-light-primary font-Gilroy-extra-bold">3 years</span> of experience crafting intuitive, visually compelling digital experiences. Born and raised in Bulacan, I blend creativity with technical rigor to deliver seamless journeys and interfaces that actually feel <em class="not-italic dark:text-dark-primary text-light-primary font-Gilroy-extra-bold">considered</em>.
              </p>
            </div>

            <!-- Meta facts grid -->
            <div class="meta-grid">
              <div class="meta-cell">
                <p class="meta-label">Based in</p>
                <p class="meta-value">Bulacan · PH</p>
              </div>
              <div class="meta-cell">
                <p class="meta-label">Experience</p>
                <p class="meta-value">3+ years</p>
              </div>
              <div class="meta-cell">
                <p class="meta-label">Disciplines</p>
                <p class="meta-value">Web · UI/UX · Motion</p>
              </div>
              <div class="meta-cell">
                <p class="meta-label">Available</p>
                <p class="meta-value flex items-center gap-2"><span class="status-dot"></span> 2026 Onwards</p>
              </div>
            </div>

            <!-- Powered by + CTAs -->
            <div class="flex flex-col gap-5 pt-2">
              <div class="flex items-center gap-3 flex-wrap">
                <p class="font-Mono text-[10px] tracking-[0.3em] uppercase opacity-60">Powered by</p>
                <div class="flex items-center gap-2">
                  <img class="h-5 w-auto opacity-90" src="@/assets/img/features/frontend/vue.svg" alt="Vue.js" />
                  <img class="h-5 w-auto opacity-90" src="@/assets/img/features/frontend/tailwind.svg" alt="Tailwind CSS" />
                  <img class="h-5 w-auto opacity-90" src="@/assets/img/features/frontend/swiper-logo.svg" alt="Swiper" />
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-3">
                <button @click="downloadResume" class="btn-primary">
                  <span>Download CV</span>
                  <i class="fa-solid fa-arrow-down"></i>
                </button>
                <button @click="$emit('changeSlide')" class="btn-ghost">
                  <span>View Works</span>
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </Transition>
</template>

<script>
  import Resume from '@/assets/img/John_Russel_Angulo_CV_updated.pdf'
  export default {
    name: 'About',
    props: {
      activeSlide: String,
      windowWidth: Number,
      desktopHeight: Number,
      mobileHeight: Number
    },
    emits: ['changeSlide'],
    data() {
      return {
        Resume
      }
    },
    methods: {
      downloadResume() {
        const link = document.createElement('a')
        link.href = this.Resume
        link.download = 'John_Russel_Angulo_CV.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }
</script>

<style lang="css" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  /* Split: portrait left 40%, body 60% on desktop */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(360px, 50vh) auto;
  }

  @media (min-width: 768px) {
    .about-grid {
      grid-template-columns: 40fr 60fr;
      grid-template-rows: 1fr;
    }
  }

  .about-left {
    animation: slide-in-l 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  }

  .about-right {
    animation: slide-in-r 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s both;
  }

  @keyframes slide-in-l {
    from { transform: translateX(-3%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slide-in-r {
    from { transform: translateX(3%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  /* Portrait framed by accent block */
  .portrait-frame {
    position: absolute;
    inset: 3.5rem 1.25rem;
    overflow: hidden;
    z-index: 2;
  }

  @media (min-width: 768px) {
    .portrait-frame {
      inset: 4.5rem 2rem;
    }
  }

  @media (min-width: 1024px) {
    .portrait-frame {
      inset: 5rem 2.5rem;
    }
  }

  .portrait-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    filter: contrast(1.05) saturate(0.95);
  }

  /* Headline — fluid, tight */
  .about-heading {
    font-size: clamp(1.75rem, 3.6vw, 3.25rem);
    letter-spacing: -0.025em;
  }

  /* Body */
  .about-body {
    text-wrap: pretty;
  }

  /* Hairline */
  .hairline {
    height: 1px;
    width: 4rem;
    background: currentColor;
    opacity: 0.3;
  }

  /* Meta facts */
  .meta-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem 2rem;
    border-top: 1px solid color-mix(in oklab, currentcolor 12%, transparent);
    border-bottom: 1px solid color-mix(in oklab, currentcolor 12%, transparent);
    padding: 1.25rem 0;
  }

  @media (min-width: 1024px) {
    .meta-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .meta-cell {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .meta-label {
    font-family: var(--font-Mono);
    font-size: 0.625rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    opacity: 0.55;
  }

  .meta-value {
    font-family: var(--font-Gilroy);
    font-size: 0.95rem;
    letter-spacing: -0.005em;
  }

  .status-dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 9999px;
    background: var(--color-light-primary);
    animation: pulse-dot 2s ease-in-out infinite;
  }

  :is(.dark) .status-dot {
    background: var(--color-dark-primary);
  }

  @keyframes pulse-dot {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.4); opacity: 0.5; }
  }

  /* Buttons */
  .btn-primary,
  .btn-ghost {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 0.85rem 1.5rem;
    font-family: var(--font-Mono);
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
    border-radius: 0;
    overflow: hidden;
  }

  /* Primary: accent bg + dark text (WCAG-compliant) → on hover, invert to ink bg + accent text */
  .btn-primary {
    background: var(--color-light-primary);
    color: var(--color-dark); /* pink + dark = 5.74:1 passes AA */
    border: 1px solid var(--color-light-primary);
  }

  :is(.dark) .btn-primary {
    background: var(--color-dark-primary);
    color: var(--color-dark); /* yellow + dark = 11.67:1 passes AAA */
    border-color: var(--color-dark-primary);
  }

  .btn-primary:hover {
    background: var(--color-dark);
    color: var(--color-light-primary); /* dark + pink = 5.74:1 */
    border-color: var(--color-dark);
  }

  :is(.dark) .btn-primary:hover {
    background: var(--color-dark-card);
    color: var(--color-dark-primary); /* dark-card + yellow = 10.7:1 */
    border-color: var(--color-dark-card);
  }

  /* Ghost: outline currentColor → on hover, accent bg + dark text */
  .btn-ghost {
    background: transparent;
    color: currentColor; /* inherits ink/light from theme — passes 14:1+ */
    border: 1px solid currentColor;
  }

  .btn-ghost:hover {
    background: var(--color-light-primary);
    color: var(--color-dark); /* pink + dark = 5.74:1 */
    border-color: var(--color-light-primary);
  }

  :is(.dark) .btn-ghost:hover {
    background: var(--color-dark-primary);
    color: var(--color-dark); /* yellow + dark = 11.67:1 */
    border-color: var(--color-dark-primary);
  }

  /* Icon glide */
  .btn-primary :deep(i),
  .btn-ghost :deep(i) {
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .btn-primary:hover :deep(i.fa-arrow-down) {
    transform: translateY(2px);
  }

  .btn-ghost:hover :deep(i.fa-arrow-right) {
    transform: translateX(3px);
  }
</style>
