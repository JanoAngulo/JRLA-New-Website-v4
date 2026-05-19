<template>
  <main class="nf">
    <div class="nf-shell">
      <!-- Top meta strip -->
      <div class="nf-meta">
        <p class="nf-meta-item font-Mono">— Error · 404</p>
        <p class="nf-meta-item font-Mono">JRLA / Lost Route</p>
      </div>

      <!-- Headline block -->
      <div class="nf-headline">
        <span class="nf-code font-Gilroy-extra-bold" aria-hidden="true">404</span>
        <div class="nf-headline-text">
          <h1 class="nf-title font-Gilroy-extra-bold uppercase">
            Page<br />Not Found
          </h1>
          <div class="hairline" aria-hidden="true"></div>
          <p class="nf-body">
            This URL doesn't exist on the portfolio. It may have moved, or the link was mistyped.
            Head back to the works index to keep exploring.
          </p>
        </div>
      </div>

      <!-- CTA row -->
      <div class="nf-cta-row">
        <router-link to="/" class="nf-btn-primary font-Mono">
          <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
          <span>Back to Works</span>
        </router-link>
        <router-link :to="{ path: '/', hash: '#contact' }" class="nf-btn-ghost font-Mono">
          <span>Report a broken link</span>
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </router-link>
      </div>

      <!-- Bottom meta strip -->
      <div class="nf-footer font-Mono">
        <span>JRLA Portfolio</span>
        <span class="nf-footer-dot" aria-hidden="true">·</span>
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

<style scoped>
  .nf {
    position: relative;
    min-height: 100dvh;
    width: 100%;
    display: grid;
    place-items: center;
    padding: clamp(1.25rem, 4vw, 3rem);
    background: var(--color-light);
    color: var(--color-dark);
    overflow: hidden;
  }
  :is(.dark) .nf {
    background: var(--color-dark);
    color: var(--color-light);
  }

  /* Subtle radial accent glow — calmer than a flat surface */
  .nf::before {
    content: '';
    position: absolute;
    inset: -20% -10% auto auto;
    width: clamp(20rem, 60vw, 48rem);
    height: clamp(20rem, 60vw, 48rem);
    background: radial-gradient(circle at center, color-mix(in oklab, var(--color-light-primary) 14%, transparent) 0%, transparent 65%);
    pointer-events: none;
    filter: blur(20px);
    z-index: 0;
  }
  :is(.dark) .nf::before {
    background: radial-gradient(circle at center, color-mix(in oklab, var(--color-dark-primary) 16%, transparent) 0%, transparent 65%);
  }

  .nf-shell {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 64rem;
    display: flex;
    flex-direction: column;
    gap: clamp(1.5rem, 4vw, 2.5rem);
  }

  /* Meta strip */
  .nf-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid color-mix(in oklab, currentcolor 12%, transparent);
  }
  .nf-meta-item {
    font-size: 0.625rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    opacity: 0.65;
    white-space: nowrap;
  }
  @media (min-width: 640px) {
    .nf-meta-item {
      font-size: 0.7rem;
      letter-spacing: 0.35em;
    }
  }

  /* Headline block */
  .nf-headline {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(1rem, 3vw, 2rem);
    align-items: start;
  }
  @media (min-width: 900px) {
    .nf-headline {
      grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
      gap: clamp(2rem, 5vw, 4rem);
    }
  }

  .nf-code {
    font-size: clamp(7rem, 26vw, 18rem);
    line-height: 0.82;
    letter-spacing: -0.04em;
    color: var(--color-light-primary);
    user-select: none;
    text-shadow: 0 1px 0 color-mix(in oklab, var(--color-dark) 10%, transparent);
  }
  :is(.dark) .nf-code {
    color: var(--color-dark-primary);
    text-shadow: 0 1px 0 color-mix(in oklab, var(--color-light) 6%, transparent);
  }

  .nf-headline-text {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: clamp(0.25rem, 1.5vw, 0.75rem);
  }

  .nf-title {
    font-size: clamp(2rem, 6vw, 4.5rem);
    line-height: 0.9;
    letter-spacing: -0.025em;
  }

  .hairline {
    height: 1px;
    width: 4rem;
    background: currentColor;
    opacity: 0.3;
  }

  .nf-body {
    font-family: var(--font-Gilroy);
    font-size: clamp(0.95rem, 1.4vw, 1.05rem);
    line-height: 1.6;
    opacity: 0.85;
    max-width: 32rem;
  }

  /* CTA */
  .nf-cta-row {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 0.25rem;
  }
  @media (min-width: 640px) {
    .nf-cta-row {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }

  .nf-btn-primary,
  .nf-btn-ghost {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 0.95rem 1.5rem;
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
  }

  .nf-btn-primary {
    background: var(--color-light-primary);
    color: var(--color-dark);
    border: 1px solid var(--color-light-primary);
  }
  :is(.dark) .nf-btn-primary {
    background: var(--color-dark-primary);
    border-color: var(--color-dark-primary);
  }
  .nf-btn-primary:hover {
    background: var(--color-dark);
    color: var(--color-light-primary);
    border-color: var(--color-dark);
    transform: translateY(-2px);
  }
  :is(.dark) .nf-btn-primary:hover {
    background: var(--color-dark-card);
    color: var(--color-dark-primary);
    border-color: var(--color-dark-card);
  }

  .nf-btn-ghost {
    background: transparent;
    color: inherit;
    border: 1px solid currentColor;
  }
  .nf-btn-ghost:hover {
    background: var(--color-light-primary);
    color: var(--color-dark);
    border-color: var(--color-light-primary);
    transform: translateY(-2px);
  }
  :is(.dark) .nf-btn-ghost:hover {
    background: var(--color-dark-primary);
    border-color: var(--color-dark-primary);
  }

  .nf-btn-primary :deep(i),
  .nf-btn-ghost :deep(i),
  .nf-btn-primary i,
  .nf-btn-ghost i {
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .nf-btn-primary:hover i.fa-arrow-left {
    transform: translateX(-3px);
  }
  .nf-btn-ghost:hover i.fa-arrow-right {
    transform: translateX(3px);
  }

  .nf-btn-primary:focus-visible,
  .nf-btn-ghost:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 4px;
  }

  /* Footer strip */
  .nf-footer {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding-top: 1rem;
    border-top: 1px solid color-mix(in oklab, currentcolor 12%, transparent);
    font-size: 0.625rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    opacity: 0.6;
    flex-wrap: wrap;
  }
  @media (min-width: 640px) {
    .nf-footer {
      font-size: 0.7rem;
      letter-spacing: 0.35em;
    }
  }
  .nf-footer-dot {
    opacity: 0.5;
  }

  @media (prefers-reduced-motion: reduce) {
    .nf-btn-primary,
    .nf-btn-ghost,
    .nf-btn-primary i,
    .nf-btn-ghost i {
      transition: none;
    }
    .nf-btn-primary:hover,
    .nf-btn-ghost:hover {
      transform: none;
    }
  }
</style>
