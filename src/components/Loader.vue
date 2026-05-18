<template>
  <transition name="loader-fade">
    <div
      v-if="visible"
      class="loader-overlay"
      :class="[exiting ? 'loader-exit' : '', isDark ? 'is-dark' : 'is-light']"
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

  export default {
    name: 'Loader',
    data() {
      return {
        visible: true,
        exiting: false
      }
    },
    computed: {
      themeStore() {
        return useThemeStore()
      },
      isDark() {
        return this.themeStore.darkMode
      }
    },
    mounted() {
      document.documentElement.style.overflow = 'hidden'
      setTimeout(() => {
        this.exiting = true
      }, 2600)
      setTimeout(() => {
        this.visible = false
        document.documentElement.style.overflow = ''
        this.$emit('finished')
      }, 3300)
    }
  }
</script>

<style scoped>
  .loader-overlay {
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: grid;
    place-items: center;
    perspective: 1400px;
    overflow: hidden;
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .loader-overlay.is-dark {
    background: radial-gradient(ellipse at center, #1a1a1a 0%, #000 70%);
    --logo-color: #ffd93d;
    --accent-color: rgba(255, 217, 61, 0.55);
    --corner-color: #ffd93d;
    --glow-color: rgba(255, 217, 61, 0.25);
  }

  .loader-overlay.is-light {
    background: radial-gradient(ellipse at center, #ffffff 0%, #f2f2f2 70%);
    --logo-color: #e10600;
    --accent-color: rgba(225, 6, 0, 0.55);
    --corner-color: #e10600;
    --glow-color: rgba(225, 6, 0, 0.25);
  }

  .loader-exit {
    opacity: 0;
    transform: scale(1.1);
  }

  /* ===== Grid ===== */
  .bg-grid {
    position: absolute;
    inset: -10%;
    background-image:
      linear-gradient(var(--accent-color) 1px, transparent 1px),
      linear-gradient(90deg, var(--accent-color) 1px, transparent 1px);
    background-size: 60px 60px;
    opacity: 0;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
    animation: gridFade 3s ease-out both, gridPan 18s linear infinite;
    pointer-events: none;
  }

  /* ===== Noise/grain ===== */
  .bg-noise {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.08;
    mix-blend-mode: overlay;
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
  .pulse-ring {
    position: absolute;
    width: 200px;
    height: 200px;
    border: 2px solid var(--accent-color);
    border-radius: 50%;
    opacity: 0;
    animation: ringPulse 2.4s ease-out infinite;
  }
  .pulse-ring-1 { animation-delay: 1.2s; }
  .pulse-ring-2 { animation-delay: 1.6s; }
  .pulse-ring-3 { animation-delay: 2s; }

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
    animation: shardFloat 6s ease-in-out infinite, shardIn 1.4s ease-out both;
  }
  .shard-1 { top: 15%; left: 12%;  animation-delay: 0.6s, 0.6s; width: 10px; height: 10px; }
  .shard-2 { top: 22%; right: 22%; animation-delay: 0.9s, 0.9s; width: 18px; height: 18px; }
  .shard-3 { top: 38%; left: 8%;   animation-delay: 1.2s, 1.2s; width: 8px;  height: 8px; }
  .shard-4 { top: 18%; right: 38%; animation-delay: 0.75s, 0.75s; width: 14px; height: 14px; }
  .shard-5 { top: 48%; left: 4%;   animation-delay: 1.05s, 1.05s; width: 6px;  height: 6px; }
  .shard-6 { top: 32%; right: 6%;  animation-delay: 0.5s, 0.5s; width: 12px; height: 12px; }
  .shard-7 { bottom: 38%; right: 8%;  animation-delay: 0.85s, 0.85s; width: 14px; height: 14px; }
  .shard-8 { bottom: 50%; right: 18%; animation-delay: 1.15s, 1.15s; width: 8px;  height: 8px; }

  /* ===== Corner brackets ===== */
  .corner {
    position: absolute;
    width: 52px;
    height: 52px;
    color: var(--corner-color);
    opacity: 0;
    animation: cornerIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-delay: 0.3s;
  }
  .corner-tl { top: 32px; left: 32px;     border-top: 3px solid var(--corner-color); border-left: 3px solid var(--corner-color); }
  .corner-tr { top: 32px; right: 32px;    border-top: 3px solid var(--corner-color); border-right: 3px solid var(--corner-color); }
  .corner-bl { bottom: 32px; left: 32px;  border-bottom: 3px solid var(--corner-color); border-left: 3px solid var(--corner-color); }
  .corner-br { bottom: 32px; right: 32px; border-bottom: 3px solid var(--corner-color); border-right: 3px solid var(--corner-color); }

  /* ===== HUD labels ===== */
  .hud {
    position: absolute;
    font-family: ui-monospace, "SF Mono", Menlo, monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    color: var(--corner-color);
    opacity: 0;
    animation: hudIn 0.7s ease-out both;
    animation-delay: 0.6s;
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
    font-family: ui-monospace, "SF Mono", Menlo, monospace;
    font-size: 11px;
    color: var(--corner-color);
    line-height: 1.7;
    letter-spacing: 0.06em;
  }
  .boot-row {
    opacity: 0;
    animation: bootRow 0.4s ease-out both;
  }
  .boot-row:nth-child(1) { animation-delay: 0.5s; }
  .boot-row:nth-child(2) { animation-delay: 0.9s; }
  .boot-row:nth-child(3) { animation-delay: 1.3s; }
  .boot-row:nth-child(4) { animation-delay: 1.7s; }
  .boot-tag { opacity: 0.6; margin-right: 6px; }
  .boot-ok {
    background: var(--corner-color);
    color: var(--bg-contrast, #000);
    padding: 1px 6px;
    margin-left: 6px;
    font-weight: 700;
  }
  .loader-overlay.is-dark .boot-ok { color: #000; }
  .loader-overlay.is-light .boot-ok { color: #fff; }
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
    font-family: ui-monospace, "SF Mono", Menlo, monospace;
    font-size: 10px;
    color: var(--corner-color);
    letter-spacing: 0.18em;
    opacity: 0;
    animation: hudIn 0.6s ease-out both;
    animation-delay: 0.6s;
  }
  .progress-track {
    width: 100%;
    height: 4px;
    background: color-mix(in srgb, var(--corner-color) 18%, transparent);
    overflow: hidden;
    margin-bottom: 8px;
  }
  .progress-fill {
    height: 100%;
    width: 0;
    background: var(--corner-color);
    animation: progFill 2.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    animation-delay: 0.6s;
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
    animation: enter3d 2s cubic-bezier(0.22, 1, 0.36, 1) both;
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
    animation:
      draw 1.1s cubic-bezier(0.65, 0, 0.35, 1) both,
      fillIn 0.6s ease-out both;
  }

  .shape-1 { animation-delay: 0.2s, 1.2s; }
  .shape-2 { animation-delay: 0.35s, 1.35s; }
  .shape-3 { animation-delay: 0.55s, 1.55s; }
  .shape-4 { animation-delay: 0.7s, 1.7s; }

  .logo-glow {
    position: absolute;
    inset: -25%;
    background: radial-gradient(circle, var(--glow-color) 0%, transparent 60%);
    filter: blur(40px);
    opacity: 0;
    animation: glowPulse 2.4s ease-out both;
    animation-delay: 1.2s;
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

  @keyframes ringPulse {
    0% { width: 80px; height: 80px; opacity: 0.6; }
    100% { width: min(900px, 130vmin); height: min(900px, 130vmin); opacity: 0; }
  }

  @keyframes shardIn {
    0% { opacity: 0; transform: rotate(45deg) scale(0); }
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
    0% { width: 0; }
    60% { width: 78%; }
    100% { width: 100%; }
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

    .pulse-ring {
      width: 140px;
      height: 140px;
    }

    .shard-5,
    .shard-6,
    .shard-7,
    .shard-8 { display: none; }
  }

  @media (max-width: 380px) {
    .boot { display: none; }
    .hud-tr { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .logo-3d,
    .logo-shape,
    .logo-glow {
      animation-duration: 0.4s !important;
      animation-delay: 0s !important;
    }
  }
</style>
