<template>
  <div class="grid justify-center w-full pb-4 sm:pb-10 work-details sm:p-10">
    <div class="container space-y-1 overflow-hidden rounded-2xl lg:space-y-8 md:space-y-4">
      <div class="relative grid gap-1 md:flex lg:gap-8 md:gap-4">
        <div :class="work.color" class="xl:w-[30vw] lg:w-[50vw] w-full h-full text-light sm:p-10 p-4 relative">
          <img v-if="work.imgBackground" class="absolute top-0 left-0 object-cover w-full h-full opacity-50 pointer-events-none mix-blend-soft-light" :src="work.imgBackground" loading="lazy" alt="" aria-hidden="true" role="presentation" />
          <div class="relative space-y-8">
            <button type="button" @click="$emit('close')" class="underline cursor-pointer w-fit bg-transparent border-0 p-0" style="color: inherit; font: inherit;">Go back</button>
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
              class="w-full py-2 text-center text-dark capitalize rounded-md shadow-xs dark:bg-dark-primary hover:dark:bg-light-primary bg-light-primary hover:bg-dark-primary font-Gilroy opacity-100 hover:-translate-y-0.5 duration-300 hover:saturate-150 transition-all cursor-pointer"
              @click="openLink(work.link)">
              {{ work.btnText }}
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
