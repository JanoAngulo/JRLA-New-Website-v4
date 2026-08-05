<template>
  <div class="grid justify-center w-full pb-4 sm:pb-10 work-details sm:p-10">
    <div class="container space-y-1 overflow-hidden lg:space-y-8 md:space-y-4">
      <div class="relative grid gap-1 md:flex lg:gap-8 md:gap-4">
        <div :class="work.color" class="xl:w-[30vw] lg:w-[50vw] w-full h-full text-light sm:p-10 p-4 relative">
          <img v-if="work.imgBackground" class="absolute top-0 left-0 object-cover w-full h-full opacity-50 pointer-events-none mix-blend-soft-light" :src="work.imgBackground" loading="lazy" alt="" aria-hidden="true" role="presentation" />
          <div class="relative space-y-8">
            <button type="button" @click="$emit('close')" class="group inline-flex items-center gap-[0.6rem] py-2 bg-transparent border-0 text-inherit font-Mono text-[0.7rem] tracking-[0.3em] uppercase opacity-80 cursor-pointer transition-[opacity,gap] duration-250 hover:opacity-100 hover:gap-[0.85rem] before:content-[''] before:inline-block before:w-6 before:h-px before:bg-current before:opacity-50 before:transition-[width,opacity] before:duration-300 hover:before:w-9 hover:before:opacity-100 focus-visible:[outline:2px_solid_currentColor] focus-visible:outline-offset-4 focus-visible:rounded-sm" aria-label="Back to works">
              <i class="fa-solid fa-arrow-left transition-transform duration-300 ease-in-out hover-fine:group-hover:-translate-x-[3px]"></i>
              <span>Back to Works</span>
            </button>
            <h1 class="font-Gilroy-extra-bold uppercase text-[clamp(1.75rem,4vw,3rem)] leading-[0.95] tracking-[-0.025em]">{{ work.title }}</h1>
            <div class="font-Mono text-sm">
              <div class="flex justify-between border-b border-white/15 py-1.5">
                <p class="uppercase tracking-[0.3em] text-[0.625rem]">Role</p>
                <p>{{ work.role }}</p>
              </div>
              <div class="flex justify-between border-b border-white/15 py-1.5">
                <p class="uppercase tracking-[0.3em] text-[0.625rem]">Tools</p>
                <p>{{ work.tools }}</p>
              </div>
              <div class="flex justify-between border-b border-white/15 py-1.5">
                <p class="uppercase tracking-[0.3em] text-[0.625rem]">Year</p>
                <p class="tabular-nums">{{ work.year }}</p>
              </div>
              <div class="flex justify-between border-b border-white/15 py-1.5">
                <p class="uppercase tracking-[0.3em] text-[0.625rem]">Type</p>
                <p>{{ work.type }}</p>
              </div>
              <div class="flex justify-between border-b border-white/15 py-1.5">
                <p class="uppercase tracking-[0.3em] text-[0.625rem] text-left">Project Type</p>
                <p class="text-right">{{ work.projectType }}</p>
              </div>
              <div class="flex justify-between py-1.5">
                <p class="uppercase tracking-[0.3em] text-[0.625rem]">Status</p>
                <p>{{ work.status }}</p>
              </div>
            </div>
            <button
              v-if="work.link"
              type="button"
              class="btn btn-primary group w-full"
              @click="openLink(work.link)">
              <span>{{ work.btnText }}</span>
              <i class="fa-solid fa-arrow-up-right-from-square transition-transform duration-250 ease-in-out hover-fine:group-hover:translate-x-0.5 hover-fine:group-hover:-translate-y-0.5"></i>
            </button>
          </div>
        </div>
        <!-- Stacked (mobile) this wrapper has no height source, so an absolutely
             positioned child collapsed to 0 and the hero preview never rendered.
             Give it a ratio until the md+ flex row supplies the height. -->
        <div class="relative w-full aspect-4/3 md:aspect-auto md:h-auto overflow-hidden">
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
