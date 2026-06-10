<template>
  <main class="relative min-h-dvh w-full grid place-items-center p-[clamp(1.25rem,4vw,3rem)] bg-light text-dark dark:bg-dark dark:text-light overflow-hidden before:content-[''] before:absolute before:-top-[20%] before:-right-[10%] before:w-[clamp(20rem,60vw,48rem)] before:h-[clamp(20rem,60vw,48rem)] before:pointer-events-none before:blur-[20px] before:z-0 before:bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--color-light-primary)_14%,transparent)_0%,transparent_65%)] dark:before:bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--color-dark-primary)_16%,transparent)_0%,transparent_65%)]">
    <div class="relative z-[1] w-full max-w-[64rem] flex flex-col gap-[clamp(1.5rem,4vw,2.5rem)]">
      <!-- Top meta strip -->
      <div class="flex justify-between items-center gap-4 pb-4 border-b border-current/12">
        <p class="font-Mono text-[0.625rem] sm:text-[0.7rem] tracking-[0.3em] sm:tracking-[0.35em] uppercase opacity-65 whitespace-nowrap">— Error · 404</p>
        <p class="font-Mono text-[0.625rem] sm:text-[0.7rem] tracking-[0.3em] sm:tracking-[0.35em] uppercase opacity-65 whitespace-nowrap">JRLA / Lost Route</p>
      </div>

      <!-- Headline block -->
      <div class="grid grid-cols-1 gap-[clamp(1rem,3vw,2rem)] items-start min-[900px]:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] min-[900px]:gap-[clamp(2rem,5vw,4rem)]">
        <span class="font-Gilroy-extra-bold text-[clamp(7rem,26vw,18rem)] leading-[0.82] tracking-[-0.04em] text-light-primary dark:text-dark-primary select-none [text-shadow:0_1px_0_color-mix(in_oklab,var(--color-dark)_10%,transparent)] dark:[text-shadow:0_1px_0_color-mix(in_oklab,var(--color-light)_6%,transparent)]" aria-hidden="true">404</span>
        <div class="flex flex-col gap-4 pt-[clamp(0.25rem,1.5vw,0.75rem)]">
          <h1 class="font-Gilroy-extra-bold uppercase text-[clamp(2rem,6vw,4.5rem)] leading-[0.9] tracking-[-0.025em]">
            Page<br />Not Found
          </h1>
          <div class="hairline" aria-hidden="true"></div>
          <p class="font-Gilroy text-[clamp(0.95rem,1.4vw,1.05rem)] leading-[1.6] opacity-85 max-w-[32rem]">
            This URL doesn't exist on the portfolio. It may have moved, or the link was mistyped.
            Head back to the works index to keep exploring.
          </p>
        </div>
      </div>

      <!-- CTA row -->
      <div class="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
        <router-link to="/" class="btn btn-primary group py-[0.95rem] no-underline transition-all hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
          <i class="fa-solid fa-arrow-left transition-transform duration-250 ease-in-out group-hover:-translate-x-[3px] motion-reduce:transition-none" aria-hidden="true"></i>
          <span>Back to Works</span>
        </router-link>
        <router-link :to="{ path: '/', hash: '#contact' }" class="btn btn-ghost group py-[0.95rem] no-underline transition-all hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
          <span>Report a broken link</span>
          <i class="fa-solid fa-arrow-right transition-transform duration-250 ease-in-out group-hover:translate-x-[3px] motion-reduce:transition-none" aria-hidden="true"></i>
        </router-link>
      </div>

      <!-- Bottom meta strip -->
      <div class="font-Mono flex items-center gap-[0.6rem] pt-4 border-t border-current/12 text-[0.625rem] sm:text-[0.7rem] tracking-[0.3em] sm:tracking-[0.35em] uppercase opacity-60 flex-wrap">
        <span>JRLA Portfolio</span>
        <span class="opacity-50" aria-hidden="true">·</span>
        <span>UI/UX Designer · Front-End Developer · Video Editor · Vector Artist</span>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'NotFound'
  }
</script>
