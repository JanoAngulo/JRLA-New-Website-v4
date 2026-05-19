<template>
  <div class="grid justify-center w-full pb-4 sm:pb-10 work-details sm:p-10">
    <div class="container space-y-1 overflow-hidden rounded-2xl lg:space-y-8 md:space-y-4">
      <div class="relative grid gap-1 md:flex lg:gap-8 md:gap-4">
        <div :class="work.color" class="xl:w-[30vw] lg:w-[50vw] w-full h-full text-light sm:p-10 p-4 relative">
          <img v-if="work.imgBackground" class="absolute top-0 left-0 object-cover w-full h-full opacity-50 pointer-events-none mix-blend-soft-light" :src="work.imgBackground" loading="lazy" alt="" aria-hidden="true" role="presentation" />
          <div class="relative space-y-8">
            <button type="button" @click="$emit('close')" class="back-link" aria-label="Back to works">
              <i class="fa-solid fa-arrow-left"></i>
              <span>Back to Works</span>
            </button>
            <p class="text-3xl font-bold uppercase">{{ work.title }}</p>
            <div class="font-Mono text-sm tracking-wide">
              <div class="flex justify-between border-b border-white/15 py-1.5">
                <p class="uppercase opacity-70">Role</p>
                <p>{{ work.role }}</p>
              </div>
              <div class="flex justify-between border-b border-white/15 py-1.5">
                <p class="uppercase opacity-70">Tools</p>
                <p>{{ work.tools }}</p>
              </div>
              <div class="flex justify-between border-b border-white/15 py-1.5">
                <p class="uppercase opacity-70">Year</p>
                <p class="tabular-nums">{{ work.year }}</p>
              </div>
              <div class="flex justify-between border-b border-white/15 py-1.5">
                <p class="uppercase opacity-70">Type</p>
                <p>{{ work.type }}</p>
              </div>
              <div class="flex justify-between border-b border-white/15 py-1.5">
                <p class="uppercase opacity-70 text-left">Project Type</p>
                <p class="text-right">{{ work.projectType }}</p>
              </div>
              <div class="flex justify-between py-1.5">
                <p class="uppercase opacity-70">Status</p>
                <p>{{ work.status }}</p>
              </div>
            </div>
            <button
              v-if="work.link"
              type="button"
              class="sheet-btn-primary w-full"
              @click="openLink(work.link)">
              <span>{{ work.btnText }}</span>
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
          </div>
        </div>
        <div class="relative w-full h-auto overflow-hidden">
          <img class="absolute top-0 left-0 object-cover w-full h-full" loading="lazy" :src="work.imgSide" :alt="`${work.title} hero preview`" />
        </div>
      </div>

      <img class="w-full h-auto" loading="lazy" :src="work.imgContent1" :alt="`${work.title} project screen 1`" />
      <img v-if="work.imgContent2" class="w-full h-auto" loading="lazy" :src="work.imgContent2" :alt="`${work.title} project screen 2`" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WorkDetails',
    props: {
      work: Object
    },
    emits: ['close'],
    data() {
      return {}
    },
    methods: {
      openLink(link) {
        window.open(link, '_blank')
      }
    },
    async setup(props) {
      // Collect all image URLs you want to wait for
      const imageUrls = [props.work.imgBackground, props.work.imgSide, props.work.imgContent1, props.work.imgContent2].filter(Boolean) // Remove undefined/null

      // Helper to load a single image
      function loadImage(src) {
        return new Promise((resolve) => {
          if (!src) return resolve()
          const img = new window.Image()
          img.onload = () => resolve()
          img.onerror = () => resolve() // Resolve even if error
          img.src = src
        })
      }

      // Wait for all images to load
      await Promise.all(imageUrls.map(loadImage))

      // Now Suspense will resolve and show the component
      return {}
    }
  }
</script>

<style scoped>
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.5rem 0;
    background: transparent;
    border: 0;
    color: inherit;
    font-family: var(--font-Mono);
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    opacity: 0.8;
    cursor: pointer;
    transition: opacity 0.25s ease, gap 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .back-link::before {
    content: '';
    display: inline-block;
    width: 1.5rem;
    height: 1px;
    background: currentColor;
    opacity: 0.5;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease;
  }

  .back-link:hover {
    opacity: 1;
    gap: 0.85rem;
  }

  .back-link:hover::before {
    width: 2.25rem;
    opacity: 1;
  }

  .back-link i {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .back-link:hover i {
    transform: translateX(-3px);
  }

  .back-link:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 4px;
    border-radius: 4px;
  }

  .sheet-btn-primary {
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
    background: var(--color-light-primary);
    color: var(--color-dark);
    border: 1px solid var(--color-light-primary);
    border-radius: 0.375rem;
    transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
  }

  :is(.dark) .sheet-btn-primary {
    background: var(--color-dark-primary);
    border-color: var(--color-dark-primary);
  }

  .sheet-btn-primary:hover {
    background: var(--color-dark);
    color: var(--color-light-primary);
    border-color: var(--color-dark);
  }

  :is(.dark) .sheet-btn-primary:hover {
    background: var(--color-dark-card);
    color: var(--color-dark-primary);
    border-color: var(--color-dark-card);
  }

  .sheet-btn-primary :deep(i) {
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sheet-btn-primary:hover :deep(i.fa-arrow-up-right-from-square) {
    transform: translate(2px, -2px);
  }
</style>
