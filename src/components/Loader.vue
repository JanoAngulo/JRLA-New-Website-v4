<template>
  <!-- The overlay is decoration, so it's aria-hidden wholesale; the one fact
       that matters is announced here instead. -->
  <p v-if="visible" class="sr-only" role="status">Loading portfolio…</p>
  <transition name="loader-fade">
    <div
      v-if="visible"
      class="loader-overlay"
      aria-hidden="true"
      :class="[exiting ? 'loader-exit' : '', isDark ? 'is-dark' : 'is-light']"
      :style="{ '--boot-tempo': tempo }"
    >
      <div class="bg-grid"></div>
      <div class="bg-noise"></div>
      <div class="bg-rings">
        <span class="pulse-ring pulse-ring-1"></span>
        <span class="pulse-ring pulse-ring-2"></span>
        <span class="pulse-ring pulse-ring-3"></span>
      </div>
      <div class="bg-shards">
        <span class="shard shard-1"></span>
        <span class="shard shard-2"></span>
        <span class="shard shard-3"></span>
        <span class="shard shard-4"></span>
        <span class="shard shard-5"></span>
        <span class="shard shard-6"></span>
        <span class="shard shard-7"></span>
        <span class="shard shard-8"></span>
      </div>
      <div class="corner corner-tl"></div>
      <div class="corner corner-tr"></div>
      <div class="corner corner-bl"></div>
      <div class="corner corner-br"></div>

      <div class="hud hud-tl">
        <span class="hud-dot"></span>
        <span class="hud-label">SYS.ONLINE</span>
      </div>
      <div class="hud hud-tr">
        <span class="hud-label">v4.0.1</span>
      </div>
      <div class="hud hud-bl">
        <span class="hud-label">JRLA // PORTFOLIO</span>
      </div>
      <div class="hud hud-br">
        <span class="hud-label">LAT 14.5995 · LON 120.9842</span>
      </div>

      <div class="boot">
        <div class="boot-row"><span class="boot-tag">&gt;</span> INIT KERNEL ......... <span class="boot-ok">OK</span></div>
        <div class="boot-row"><span class="boot-tag">&gt;</span> MOUNT ASSETS ........ <span class="boot-ok">OK</span></div>
        <div class="boot-row"><span class="boot-tag">&gt;</span> RENDER PIPELINE ..... <span class="boot-ok">OK</span></div>
        <div class="boot-row"><span class="boot-tag">&gt;</span> READY<span class="caret">_</span></div>
      </div>

      <div class="progress">
        <div class="progress-track">
          <div class="progress-fill"></div>
        </div>
        <div class="progress-label">LOADING <span class="progress-pct">100%</span></div>
      </div>

      <div class="loader-stage">
        <div class="logo-3d">
          <svg
            class="logo-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 745.03 831.62"
            aria-hidden="true"
          >
            <g>
              <polygon
                class="logo-shape shape-1"
                pathLength="1"
                points="347.69 0 347.69 831.62 322.85 817.28 298.02 802.93 273.18 788.6 248.35 774.25 223.52 759.91 198.68 745.57 173.84 731.25 149.02 716.9 124.17 702.59 99.34 688.23 74.5 673.89 49.67 659.55 24.86 645.23 0 630.88 0 401.47 24.84 415.81 49.67 430.15 49.67 602.2 74.53 616.55 99.34 630.88 124.17 645.23 149.02 659.55 173.84 673.91 223.52 702.59 248.35 716.92 273.18 731.25 298.02 745.59 298.02 28.68 322.85 14.34 347.69 0"
              />
              <polygon
                class="logo-shape shape-2"
                pathLength="1"
                points="745.03 401.47 745.03 630.88 720.2 645.23 695.37 659.55 670.53 673.9 620.86 702.58 596.03 716.92 571.19 731.26 546.36 745.59 521.53 759.93 496.69 774.27 447.02 802.94 422.19 817.28 397.35 831.62 397.35 0 422.19 14.34 447.02 28.69 447.02 745.59 471.86 731.26 496.69 716.92 521.53 702.58 546.36 688.23 571.19 673.9 596.03 659.55 620.86 645.23 645.7 630.88 670.53 616.55 695.37 602.2 695.37 430.15 720.2 415.81 745.03 401.47"
              />
              <path
                class="logo-shape shape-3"
                pathLength="1"
                d="M391,195.88l-24.84,14.34-24.83,14.33-24.84,14.34-24.83,14.34-24.84,14.34V697.73l24.84,14.34,24.83,14.34V525.66l24.82-14.34L366.16,497V755.08L391,769.42l24.83,14.34V497L391,482.65l24.83-14.34V181.54ZM366.16,439.64,341.31,454l-24.82,14.34v-172l24.84-14.35,24.83-14.33Z"
                transform="translate(-167.48 -124.19)"
              />
              <path
                class="logo-shape shape-4"
                pathLength="1"
                d="M788.35,253.23l-24.84-14.32-24.83-14.36-24.84-14.32L689,195.9l-24.84-14.34V783.74L689,769.42l24.85-14.35V497l24.85,14.35,24.82,14.34V726.39l49.67-28.68V267.58ZM763.51,468.31,738.69,454l-24.85-14.33V267.57l24.84,14.34,24.83,14.35Z"
                transform="translate(-167.48 -124.19)"
              />
            </g>
          </svg>
          <div class="logo-glow"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { useThemeStore } from '../store'
  import { markBootRevealing } from '../composables/bootState'

  // Tempo knob — change this to speed up or slow down the whole intro.
  //
  // Every choreographed duration/delay in the style block is written as
  // `calc(var(--boot-tempo) * <base>)` and MIN_HOLD is derived from the same
  // value, so the CSS timing can't drift out of sync with how long the overlay
  // stays up. Ambient loops (grid pan, shard float, caret blink, ring pulse) are
  // deliberately not scaled: they have no endpoint, so rescaling them changes
  // their character rather than the pace of the sequence.
  //
  //   1.0 = baseline    1.5 = 50% slower
  const BOOT_TEMPO = 1.5

  // Length of the choreography at tempo 1.0. Last to land are the fourth boot
  // row (0.85 + 0.28) and the progress fill (0.25 + 0.9).
  const BASE_TIMELINE_MS = 1150
  const MIN_HOLD = Math.round(BASE_TIMELINE_MS * BOOT_TEMPO) + 150
  // Ceiling, so a slow network can't turn the intro into a wait.
  const MAX_HOLD = MIN_HOLD + 1000
  // Matches the .loader-overlay opacity/transform transition below.
  const EXIT_MS = 700

  export default {
    name: 'Loader',
    data() {
      return {
        visible: true,
        exiting: false,
        timers: []
      }
    },
    computed: {
      themeStore() {
        return useThemeStore()
      },
      isDark() {
        return this.themeStore.darkMode
      },
      // Hands BOOT_TEMPO to the stylesheet, so CSS choreography and the JS hold
      // run off one constant instead of two kept in sync by hand.
      tempo() {
        return BOOT_TEMPO
      }
    },
    mounted() {
      // The intro plays on every page load, resolves on `window.load` (capped by
      // MAX_HOLD) rather than a fixed timer, and is skipped outright under
      // reduced motion — it is pure decoration.
      const done = () => {
        // Backstop for the skip paths below, which never call beginExit. The
        // latch makes the normal path's second call a no-op.
        markBootRevealing()
        this.visible = false
        document.documentElement.style.overflow = ''
        this.$emit('finished')
      }

      // No once-per-session gate: the intro is meant to be seen on every load,
      // reload included. Reduced motion is the only thing that skips it.
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return done()

      document.documentElement.style.overflow = 'hidden'

      // Hold until the page is ready, but never past MAX_HOLD nor so briefly
      // that the intro flickers past unread.
      const startedAt = performance.now()
      const beginExit = () => {
        if (this.exiting) return
        this.exiting = true
        // Release the panels underneath now, not at `done`. Their entrance is
        // meant to play through this fade — see bootState.
        markBootRevealing()
        this.timers.push(setTimeout(done, EXIT_MS))
      }
      const settle = () => {
        const waited = performance.now() - startedAt
        this.timers.push(setTimeout(beginExit, Math.max(0, MIN_HOLD - waited)))
      }

      if (document.readyState === 'complete') settle()
      else window.addEventListener('load', settle, { once: true })
      this.timers.push(setTimeout(beginExit, MAX_HOLD))
    },
    beforeUnmount() {
      // An orphaned timer here would re-emit `finished` and re-show the shell.
      this.timers.forEach(clearTimeout)
      this.timers = []
      document.documentElement.style.overflow = ''
    }
  }
</script>

<style scoped>
  .loader-overlay {
    position: fixed;
    inset: 0;
    z-index: var(--z-grain);
    display: grid;
    place-items: center;
    perspective: 1400px;
    overflow: hidden;
    /* Duration matches EXIT_MS in the script block. */
    transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
  }

  /* Vignette sinks rather than lifts: centre is the page ground and the edge
     falls below it. Lightening either stop washes the screen out mid-fade. */
  .loader-overlay.is-dark {
    background: radial-gradient(ellipse at center, var(--color-dark) 0%, var(--color-dark-deep) 70%);
    --logo-color: var(--color-dark-primary);
    --accent-color: color-mix(in oklab, var(--color-dark-primary) 55%, transparent);
    --corner-color: var(--color-dark-primary);
    --glow-color: color-mix(in oklab, var(--color-dark-primary) 25%, transparent);
  }

  .loader-overlay.is-light {
    background: radial-gradient(ellipse at center, var(--color-light-card) 0%, var(--color-light) 70%);
    --logo-color: var(--color-light-primary);
    --accent-color: color-mix(in oklab, var(--color-light-primary) 55%, transparent);
    --corner-color: var(--color-light-primary);
    --glow-color: color-mix(in oklab, var(--color-light-primary) 25%, transparent);
  }

  .loader-exit {
    opacity: 0;
    transform: scale(1.1);
  }
  /* Grain and glow both brighten what they sit over, so they leave first and let
     the ground carry the rest of the fade. */
  .loader-exit .bg-noise {
    opacity: 0;
  }
  /* `glowPulse` runs with `both`, so its fill keeps writing opacity and outranks
     a plain declaration — cancel the animation rather than override it. Its final
     transform is scale(1), so dropping it snaps nothing. */
  .loader-exit .logo-glow {
    animation: none;
    opacity: 0;
    transition: opacity 0.18s var(--ease-out);
  }

  /* ===== Grid =====
     Dot-grid, matching the backdrop device used on Home / About / Contact. */
  .bg-grid {
    position: absolute;
    inset: -10%;
    background-image: radial-gradient(var(--accent-color) 1px, transparent 1px);
    background-size: 60px 60px;
    opacity: 0;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
    animation: gridFade calc(var(--boot-tempo, 1) * 1.2s) var(--ease-out) both, gridPan 18s linear infinite;
    pointer-events: none;
  }

  /* ===== Noise/grain =====
     `overlay` lightens what's behind it, and the app renders underneath this, so
     once the plate goes transparent the grain hazes live content. Hence the early
     exit in `.loader-exit .bg-noise` above. */
  .bg-noise {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.08;
    mix-blend-mode: overlay;
    transition: opacity 0.18s var(--ease-out);
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* ===== Concentric pulse rings ===== */
  .bg-rings {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    pointer-events: none;
  }
  /* Fixed box at the ring's largest size, animated with `scale` — never
     width/height, which would relayout three elements on every frame of an
     infinite loop. */
  .pulse-ring {
    position: absolute;
    width: min(900px, 130vmin);
    height: min(900px, 130vmin);
    border: 2px solid var(--accent-color);
    border-radius: 50%;
    opacity: 0;
    will-change: transform, opacity;
    animation: ringPulse 1.6s var(--ease-out) infinite;
  }
  .pulse-ring-1 { animation-delay: calc(var(--boot-tempo, 1) * 0.5s); }
  .pulse-ring-2 { animation-delay: calc(var(--boot-tempo, 1) * 0.75s); }
  .pulse-ring-3 { animation-delay: calc(var(--boot-tempo, 1) * 1s); }

  /* ===== Floating angular shards ===== */
  .bg-shards {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .shard {
    position: absolute;
    width: 14px;
    height: 14px;
    background: var(--accent-color);
    opacity: 0;
    transform: rotate(45deg);
    animation: shardFloat 6s ease-in-out infinite, shardIn calc(var(--boot-tempo, 1) * 0.7s) var(--ease-out) both;
  }
  .shard-1 { top: 15%; left: 12%;  animation-delay: calc(var(--boot-tempo, 1) * 0.3s), calc(var(--boot-tempo, 1) * 0.3s); width: 10px; height: 10px; }
  .shard-2 { top: 22%; right: 22%; animation-delay: calc(var(--boot-tempo, 1) * 0.45s), calc(var(--boot-tempo, 1) * 0.45s); width: 18px; height: 18px; }
  .shard-3 { top: 38%; left: 8%;   animation-delay: calc(var(--boot-tempo, 1) * 0.6s), calc(var(--boot-tempo, 1) * 0.6s); width: 8px;  height: 8px; }
  .shard-4 { top: 18%; right: 38%; animation-delay: calc(var(--boot-tempo, 1) * 0.38s), calc(var(--boot-tempo, 1) * 0.38s); width: 14px; height: 14px; }
  .shard-5 { top: 48%; left: 4%;   animation-delay: calc(var(--boot-tempo, 1) * 0.52s), calc(var(--boot-tempo, 1) * 0.52s); width: 6px;  height: 6px; }
  .shard-6 { top: 32%; right: 6%;  animation-delay: calc(var(--boot-tempo, 1) * 0.25s), calc(var(--boot-tempo, 1) * 0.25s); width: 12px; height: 12px; }
  .shard-7 { bottom: 38%; right: 8%;  animation-delay: calc(var(--boot-tempo, 1) * 0.42s), calc(var(--boot-tempo, 1) * 0.42s); width: 14px; height: 14px; }
  .shard-8 { bottom: 50%; right: 18%; animation-delay: calc(var(--boot-tempo, 1) * 0.58s), calc(var(--boot-tempo, 1) * 0.58s); width: 8px;  height: 8px; }

  /* ===== Corner brackets ===== */
  .corner {
    position: absolute;
    width: 52px;
    height: 52px;
    color: var(--corner-color);
    opacity: 0;
    animation: cornerIn calc(var(--boot-tempo, 1) * 0.5s) var(--ease-out) both;
    animation-delay: calc(var(--boot-tempo, 1) * 0.15s);
  }
  .corner-tl { top: 32px; left: 32px;     border-top: 3px solid var(--corner-color); border-left: 3px solid var(--corner-color); }
  .corner-tr { top: 32px; right: 32px;    border-top: 3px solid var(--corner-color); border-right: 3px solid var(--corner-color); }
  .corner-bl { bottom: 32px; left: 32px;  border-bottom: 3px solid var(--corner-color); border-left: 3px solid var(--corner-color); }
  .corner-br { bottom: 32px; right: 32px; border-bottom: 3px solid var(--corner-color); border-right: 3px solid var(--corner-color); }

  /* ===== HUD labels ===== */
  .hud {
    position: absolute;
    font-family: var(--font-Mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    color: var(--corner-color);
    opacity: 0;
    animation: hudIn calc(var(--boot-tempo, 1) * 0.4s) var(--ease-out) both;
    animation-delay: calc(var(--boot-tempo, 1) * 0.3s);
    display: flex;
    align-items: center;
    gap: 8px;
    text-transform: uppercase;
  }
  .hud-tl { top: 92px; left: 92px; }
  .hud-tr { top: 92px; right: 92px; }
  .hud-bl { bottom: 92px; left: 92px; }
  .hud-br { bottom: 92px; right: 92px; }
  .hud-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--corner-color);
    animation: blink 1.2s ease-in-out infinite;
  }

  /* ===== Boot log ===== */
  .boot {
    position: absolute;
    left: 92px;
    bottom: 140px;
    font-family: var(--font-Mono);
    font-size: 11px;
    color: var(--corner-color);
    line-height: 1.7;
    letter-spacing: 0.06em;
  }
  .boot-row {
    opacity: 0;
    animation: bootRow calc(var(--boot-tempo, 1) * 0.28s) var(--ease-out) both;
  }
  .boot-row:nth-child(1) { animation-delay: calc(var(--boot-tempo, 1) * 0.25s); }
  .boot-row:nth-child(2) { animation-delay: calc(var(--boot-tempo, 1) * 0.45s); }
  .boot-row:nth-child(3) { animation-delay: calc(var(--boot-tempo, 1) * 0.65s); }
  .boot-row:nth-child(4) { animation-delay: calc(var(--boot-tempo, 1) * 0.85s); }
  .boot-tag { opacity: 0.6; margin-right: 6px; }
  .boot-ok {
    background: var(--corner-color);
    color: var(--bg-contrast, var(--color-dark));
    padding: 1px 6px;
    margin-left: 6px;
    font-weight: 700;
  }
  /* Ink on Filament Yellow, paper on Signal Red — same as any accent-filled
     control elsewhere. */
  .loader-overlay.is-dark .boot-ok { color: var(--color-dark); }
  .loader-overlay.is-light .boot-ok { color: var(--color-light); }
  .caret {
    display: inline-block;
    animation: blink 0.9s steps(2) infinite;
    margin-left: 2px;
  }

  /* ===== Progress bar ===== */
  .progress {
    position: absolute;
    right: 92px;
    bottom: 140px;
    width: 260px;
    font-family: var(--font-Mono);
    font-size: 10px;
    color: var(--corner-color);
    letter-spacing: 0.18em;
    opacity: 0;
    animation: hudIn calc(var(--boot-tempo, 1) * 0.4s) var(--ease-out) both;
    animation-delay: calc(var(--boot-tempo, 1) * 0.3s);
  }
  .progress-track {
    width: 100%;
    height: 4px;
    background: color-mix(in srgb, var(--corner-color) 18%, transparent);
    overflow: hidden;
    margin-bottom: 8px;
  }
  /* Full-width bar scaled from the left, not a width animation (see the rings).
     `transform-origin` is what makes it read as filling rather than growing from
     the centre. */
  .progress-fill {
    height: 100%;
    width: 100%;
    transform-origin: left center;
    transform: scaleX(0);
    background: var(--corner-color);
    animation: progFill calc(var(--boot-tempo, 1) * 0.9s) var(--ease-out) forwards;
    animation-delay: calc(var(--boot-tempo, 1) * 0.25s);
  }
  .progress-label {
    display: flex;
    justify-content: space-between;
  }
  .progress-pct::after {
    content: '';
  }

  .loader-stage {
    position: relative;
    width: min(40vw, 280px);
    aspect-ratio: 745 / 832;
    transform-style: preserve-3d;
  }

  .logo-3d {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    animation: enter3d calc(var(--boot-tempo, 1) * 0.9s) var(--ease-out) both;
  }

  .logo-svg {
    width: 100%;
    height: 100%;
    display: block;
    overflow: visible;
  }

  .logo-shape {
    fill: var(--logo-color);
    stroke: var(--logo-color);
    stroke-width: 2;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    fill-opacity: 0;
    /* Draw, then fill, staggered across the four shapes (delays below). */
    animation:
      draw 0.55s cubic-bezier(0.65, 0, 0.35, 1) both,
      fillIn 0.3s var(--ease-out) both;
  }

  .shape-1 { animation-delay: calc(var(--boot-tempo, 1) * 0.1s), calc(var(--boot-tempo, 1) * 0.55s); }
  .shape-2 { animation-delay: calc(var(--boot-tempo, 1) * 0.18s), calc(var(--boot-tempo, 1) * 0.63s); }
  .shape-3 { animation-delay: calc(var(--boot-tempo, 1) * 0.28s), calc(var(--boot-tempo, 1) * 0.73s); }
  .shape-4 { animation-delay: calc(var(--boot-tempo, 1) * 0.35s), calc(var(--boot-tempo, 1) * 0.8s); }

  .logo-glow {
    position: absolute;
    inset: -25%;
    background: radial-gradient(circle, var(--glow-color) 0%, transparent 60%);
    filter: blur(40px);
    opacity: 0;
    animation: glowPulse calc(var(--boot-tempo, 1) * 1.1s) var(--ease-out) both;
    animation-delay: calc(var(--boot-tempo, 1) * 0.6s);
    pointer-events: none;
    z-index: -1;
  }

  @keyframes enter3d {
    0% {
      transform: translateZ(-900px) rotateY(-90deg) rotateX(25deg);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateZ(0) rotateY(0) rotateX(0);
      opacity: 1;
    }
  }

  @keyframes draw {
    0% { stroke-dashoffset: 1; }
    100% { stroke-dashoffset: 0; }
  }

  @keyframes fillIn {
    0% { fill-opacity: 0; stroke-opacity: 1; }
    100% { fill-opacity: 1; stroke-opacity: 0; }
  }

  @keyframes gridFade {
    0% { opacity: 0; }
    60% { opacity: 0.25; }
    100% { opacity: 0.18; }
  }
  @keyframes gridPan {
    0% { background-position: 0 0, 0 0; }
    100% { background-position: 60px 60px, 60px 60px; }
  }

  /* 80px → full box, as a scale of the fixed size declared above. */
  @keyframes ringPulse {
    0% { transform: scale(calc(80 / 900)); opacity: 0.6; }
    100% { transform: scale(1); opacity: 0; }
  }

  @keyframes shardIn {
    0% { opacity: 0; transform: rotate(45deg) scale(0.9); }
    100% { opacity: 0.8; transform: rotate(45deg) scale(1); }
  }
  @keyframes shardFloat {
    0%, 100% { transform: rotate(45deg) translateY(0); }
    50% { transform: rotate(225deg) translateY(-20px); }
  }

  @keyframes hudIn {
    0% { opacity: 0; transform: translateY(-4px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }
  @keyframes bootRow {
    0% { opacity: 0; transform: translateX(-8px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  @keyframes progFill {
    0% { transform: scaleX(0); }
    60% { transform: scaleX(0.78); }
    100% { transform: scaleX(1); }
  }

  @keyframes cornerIn {
    0% { opacity: 0; transform: scale(0.4); }
    100% { opacity: 1; transform: scale(1); }
  }

  @keyframes glowPulse {
    0% { opacity: 0; transform: scale(0.6); }
    60% { opacity: 1; transform: scale(1.1); }
    100% { opacity: 0.5; transform: scale(1); }
  }

  .loader-fade-leave-active {
    transition: opacity 0.6s ease;
  }
  .loader-fade-leave-to {
    opacity: 0;
  }

  /* ===== Mobile ===== */
  @media (max-width: 640px) {
    .corner {
      width: 32px;
      height: 32px;
    }
    .corner-tl { top: 16px; left: 16px; }
    .corner-tr { top: 16px; right: 16px; }
    .corner-bl { bottom: 16px; left: 16px; }
    .corner-br { bottom: 16px; right: 16px; }

    .hud {
      font-size: 9px;
      letter-spacing: 0.16em;
      gap: 6px;
    }
    .hud-tl { top: 60px; left: 20px; }
    .hud-tr { top: 60px; right: 20px; }
    .hud-bl,
    .hud-br { display: none; }

    .boot {
      left: 64px;
      right: 64px;
      bottom: 120px;
      font-size: 10px;
      line-height: 1.5;
    }
    .boot-row:nth-child(3) { display: none; }

    .progress {
      left: 64px;
      right: 64px;
      bottom: 70px;
      width: auto;
      font-size: 9px;
    }

    .bg-grid {
      background-size: 40px 40px;
    }

    /* Don't override .pulse-ring's size here: its box IS the ring's full extent
       and `scale` animates it, so a smaller box caps the pulse. */

    /* Half the shards are dropped and the rest re-scattered down the full height,
       alternating sides and clear of the centred logo stage, boot log and progress
       bar. Each keeps the side it was authored on, so no offset needs unsetting. */
    .shard-1 { top: 18%; left: 9%; }
    .shard-2 { top: 34%; right: 11%; width: 13px; height: 13px; }
    .shard-3 { top: 58%; left: 6%; }
    .shard-4 { top: 76%; right: 15%; }

    .shard-5,
    .shard-6,
    .shard-7,
    .shard-8 { display: none; }
  }

  @media (max-width: 380px) {
    .boot { display: none; }
    .hud-tr { display: none; }
  }

  /* No reduced-motion block: the overlay never mounts under
     `prefers-reduced-motion: reduce`. See the `reduced` check in mounted(). */
</style>
