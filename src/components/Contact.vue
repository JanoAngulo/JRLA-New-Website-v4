<template>
  <Transition name="fade">
    <div
      v-if="activeSlide === 'contact'"
      ref="contactSection"
      class="relative w-full md:overflow-hidden overflow-y-auto"
      :style="{ height: windowWidth >= 768 ? `${desktopHeight}px` : `${mobileHeight}px` }">
      <div class="contact-grid h-full w-full">
        <!-- LEFT: accent block w/ pull-quote + contact card -->
        <section class="contact-left relative dark:bg-dark-primary bg-light-primary text-dark overflow-hidden">
          <div class="relative flex flex-col justify-between p-6 md:p-10 lg:p-14 gap-8 h-full">
            <!-- Top eyebrow -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 font-Mono text-[10px] tracking-[0.3em] uppercase">
              <span>05 — Contact</span>
              <span class="hidden sm:inline opacity-70">Reach Out</span>
            </div>

            <!-- Pull-quote -->
            <div class="flex flex-col gap-5">
              <p class="font-Mono text-xs tracking-[0.35em] uppercase opacity-70">— Open Brief</p>
              <h2 class="contact-headline font-Gilroy-extra-bold uppercase leading-[0.9]">
                <span class="ch-line"><span class="ch-inner" style="--d:0.25s">Let's build</span></span>
                <span class="ch-line"><span class="ch-inner" style="--d:0.4s">something</span></span>
                <span class="ch-line"><span class="ch-inner contact-headline--outline" style="--d:0.55s">together.</span></span>
              </h2>
              <div class="hairline-on-accent"></div>
              <p class="font-Gilroy text-base sm:text-lg leading-relaxed max-w-md opacity-90">
                Got an idea worth chasing? Whether it's a fresh design, a website that stands out, or a half-baked concept — drop a note and let's turn it into something real.
              </p>
            </div>

            <!-- Contact card + socials -->
            <div class="flex flex-col gap-4">
              <div class="contact-meta">
                <div class="contact-meta-row">
                  <span class="contact-meta-label">Email</span>
                  <a href="mailto:Angulo.johnrussel.l.7814@gmail.com" class="contact-meta-value contact-link">angulo.johnrussel.l.7814@gmail.com</a>
                </div>
                <div class="contact-meta-row">
                  <span class="contact-meta-label">Based</span>
                  <span class="contact-meta-value">Bulacan · PH</span>
                </div>
                <div class="contact-meta-row">
                  <span class="contact-meta-label">Status</span>
                  <span class="contact-meta-value flex items-center gap-2"><span class="status-dot"></span> Available 2026</span>
                </div>
              </div>

              <div class="flex items-center gap-3 pt-2">
                <p class="font-Mono text-[10px] tracking-[0.3em] uppercase opacity-70">Find Me</p>
                <div class="flex gap-2 no-swipe">
                  <a target="_blank" rel="noopener" aria-label="LinkedIn" href="https://www.linkedin.com/in/jrla1219/" class="social-pill-on-accent">
                    <i class="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a target="_blank" rel="noopener" aria-label="Facebook" href="https://www.facebook.com/Jano1219" class="social-pill-on-accent">
                    <i class="fa-brands fa-facebook-f"></i>
                  </a>
                  <a target="_blank" rel="noopener" aria-label="Behance" href="https://www.behance.net/JRLA" class="social-pill-on-accent">
                    <i class="fa-brands fa-behance"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- RIGHT: form -->
        <section class="contact-right relative dark:bg-dark bg-light dark:text-light text-dark md:overflow-y-auto">
          <div class="relative flex flex-col p-6 md:p-10 lg:p-14 gap-6 md:h-full">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 font-Mono text-[10px] tracking-[0.3em] uppercase opacity-70">
              <span>Drop a Line</span>
              <span class="hidden sm:inline">Form / 01</span>
            </div>

            <div class="space-y-3">
              <p class="font-Mono text-xs tracking-[0.35em] uppercase opacity-60">— Send a Message</p>
              <h3 class="font-Gilroy-extra-bold uppercase leading-[0.95] contact-form-heading">
                <span class="cfh-line"><span class="cfh-inner" style="--d:0.4s">Tell me <em class="not-italic dark:text-dark-primary text-light-primary">what's</em> on your mind</span></span>
              </h3>
              <div class="hairline"></div>
            </div>

            <form @submit.prevent="onSubmit" class="form-card flex flex-col gap-5 flex-1" novalidate>
              <div class="grid gap-5 md:grid-cols-2">
                <div class="field">
                  <label for="Name" class="field-label">01 — Name</label>
                  <input type="text" id="Name" name="Name" v-model="name" class="field-input" placeholder="Your name" autocomplete="name" aria-required="true" required />
                </div>
                <div class="field">
                  <label for="Email" class="field-label">02 — Email</label>
                  <input type="email" id="Email" name="Email" v-model="email" class="field-input" placeholder="hello@yourname.com" autocomplete="email" aria-required="true" required />
                </div>
              </div>

              <div class="field">
                <div class="flex items-center justify-between">
                  <label for="Message" class="field-label">03 — Message</label>
                  <span class="char-count" :class="{ 'is-warn': message.length > 800 }">{{ message.length }} / 1000</span>
                </div>
                <textarea id="Message" name="Message" v-model="message" class="field-input field-textarea" rows="7" maxlength="1000" placeholder="Project brief, idea, or just say hi…" aria-required="true" required></textarea>
              </div>

              <!-- Status messages -->
              <Transition name="slide-fade">
                <div v-if="isSuccess" class="alert alert-success" role="status">
                  <i class="fa-solid fa-circle-check"></i>
                  <span>Message received. I'll get back to you soon.</span>
                  <button type="button" class="alert-close" @click="isSuccess = false" aria-label="Dismiss"><i class="fa-solid fa-xmark"></i></button>
                </div>
              </Transition>
              <Transition name="slide-fade">
                <div v-if="isError" class="alert alert-error" role="alert">
                  <i class="fa-solid fa-circle-xmark"></i>
                  <span>Something broke on the way. Try again or email me directly.</span>
                  <button type="button" class="alert-close" @click="isError = false" aria-label="Dismiss"><i class="fa-solid fa-xmark"></i></button>
                </div>
              </Transition>

              <div class="form-footer">
                <div class="form-footer-hint">
                  <span class="form-dot"></span>
                  <span>Avg. response · 24 hours</span>
                </div>
                <button type="submit" :disabled="loading" class="contact-submit">
                  <span>{{ loading ? 'Sending' : 'Send Message' }}</span>
                  <i v-if="loading" class="fa-solid fa-spinner-third fa-spin"></i>
                  <i v-else class="fa-solid fa-arrow-right"></i>
                </button>
              </div>

              <div class="form-aux">
                <div class="aux-row">
                  <span class="aux-row-label">Best for</span>
                  <span class="aux-row-value">Web · Mobile · UI/UX · Brand</span>
                </div>
                <div class="aux-row">
                  <span class="aux-row-label">Timezone</span>
                  <span class="aux-row-value">GMT+8 · Manila</span>
                </div>
                <div class="aux-row">
                  <span class="aux-row-label">Form by</span>
                  <span class="aux-row-value">Formspark · spam-shielded</span>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  </Transition>
</template>

<script>
  import Botpoison from '@botpoison/browser'

  const FORMSPARK_ACTION_URL = 'https://submit-form.com/dQ4bHCKeB'
  const BOTPOISON_KEY = 'pk_847c92ad-fbd6-4a5e-a078-3ba1270f4002'

  export default {
    name: 'Contact',
    props: {
      activeSlide: String,
      windowWidth: Number,
      desktopHeight: Number,
      mobileHeight: Number
    },
    data() {
      return {
        botpoison: null,
        loading: false,
        name: '',
        email: '',
        message: '',
        isSuccess: false,
        isError: false
      }
    },
    created() {
      this.botpoison = new Botpoison({ publicKey: BOTPOISON_KEY })
    },
    methods: {
      async onSubmit() {
        this.loading = true
        this.isSuccess = false
        this.isError = false
        try {
          const { solution } = await this.botpoison.challenge()
          const response = await fetch(FORMSPARK_ACTION_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ name: this.name, email: this.email, message: this.message, _botpoison: solution })
          })
          if (response.ok) {
            this.isSuccess = true
            this.name = ''
            this.email = ''
            this.message = ''
          } else {
            this.isError = true
          }
        } catch (e) {
          this.isError = true
        } finally {
          this.loading = false
        }
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

  /* Split: 40 / 60 like About */
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }

  .contact-left {
    min-height: 100dvh;
  }

  @media (min-width: 768px) {
    .contact-grid {
      grid-template-columns: 40fr 60fr;
      grid-template-rows: 1fr;
    }

    .contact-left {
      min-height: 0;
    }
  }

  .contact-left {
    animation: slide-in-l 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  }
  .contact-right {
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

  /* Headline */
  .contact-headline {
    font-size: clamp(2.25rem, 4.8vw, 4.25rem);
    letter-spacing: -0.035em;
  }

  .contact-headline--outline {
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 1.5px var(--color-dark);
    opacity: 0.85;
  }

  /* Line-reveal mask — matches Home/Features */
  .ch-line,
  .cfh-line {
    display: block;
    overflow: hidden;
    line-height: 1;
  }
  .ch-inner,
  .cfh-inner {
    display: inline-block;
    transform: translateY(105%);
    animation: ch-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-delay: var(--d, 0s);
  }
  @keyframes ch-rise {
    to { transform: translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .ch-inner,
    .cfh-inner { animation-duration: 0.2s; }
  }

  .contact-form-heading {
    font-size: clamp(1.5rem, 2.4vw, 2rem);
    letter-spacing: -0.02em;
  }

  /* Hairlines */
  .hairline {
    height: 1px;
    width: 4rem;
    background: currentColor;
    opacity: 0.3;
  }

  .hairline-on-accent {
    height: 1px;
    width: 4rem;
    background: color-mix(in oklab, var(--color-dark) 40%, transparent);
  }

  /* Contact meta rows */
  .contact-meta {
    border-top: 1px solid color-mix(in oklab, var(--color-dark) 20%, transparent);
  }

  .contact-meta-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0.65rem 0;
    border-bottom: 1px solid color-mix(in oklab, var(--color-dark) 20%, transparent);
    gap: 1rem;
  }

  .contact-meta-label {
    font-family: var(--font-Mono);
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    opacity: 0.65;
    flex-shrink: 0;
  }

  .contact-meta-value {
    font-family: var(--font-Gilroy);
    font-size: 0.875rem;
    letter-spacing: -0.005em;
    text-align: right;
    word-break: break-word;
  }

  .contact-link {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
    transition: opacity 0.2s ease;
  }

  .contact-link:hover {
    opacity: 0.7;
  }

  /* Status dot on accent */
  .status-dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 9999px;
    background: color-mix(in oklab, var(--color-dark) 85%, transparent);
    animation: pulse-dot 2s ease-in-out infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.4); opacity: 0.45; }
  }

  /* Social pills on accent block — outline → fill on hover */
  .social-pill-on-accent {
    display: grid;
    place-content: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 9999px;
    border: 1px solid color-mix(in oklab, var(--color-dark) 60%, transparent);
    color: var(--color-dark);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @media (hover: hover) {
    .social-pill-on-accent:hover {
      background: var(--color-dark);
      color: var(--color-light-primary);
      transform: translateY(-2px);
    }

    :is(.dark) .social-pill-on-accent:hover {
      color: var(--color-dark-primary);
    }
  }

  /* Form card */
  .form-card {
    padding: 1.25rem 0 0;
  }

  /* Char counter */
  .char-count {
    font-family: var(--font-Mono);
    font-size: 0.65rem;
    letter-spacing: 0.18em;
    opacity: 0.5;
    transition: color 0.2s ease, opacity 0.2s ease;
  }
  .char-count.is-warn {
    opacity: 1;
    color: var(--color-light-primary);
  }
  :is(.dark) .char-count.is-warn {
    color: var(--color-dark-primary);
  }

  /* Footer row — hint + submit */
  .form-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 0.5rem;
    flex-wrap: wrap;
  }
  .form-footer-hint {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    font-family: var(--font-Mono);
    font-size: 0.65rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    opacity: 0.7;
  }
  .form-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--color-light-primary);
    animation: pulse-dot 2s ease-in-out infinite;
  }
  :is(.dark) .form-dot {
    background: var(--color-dark-primary);
  }

  /* Aux info rows */
  .form-aux {
    margin-top: 1.25rem;
    padding-top: 1rem;
    border-top: 1px solid color-mix(in srgb, currentColor 12%, transparent);
    display: flex;
    flex-direction: column;
  }
  .aux-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0.55rem 0;
    gap: 1rem;
    border-bottom: 1px dashed color-mix(in srgb, currentColor 10%, transparent);
  }
  .aux-row:last-child {
    border-bottom: none;
  }
  .aux-row-label {
    font-family: var(--font-Mono);
    font-size: 0.62rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    opacity: 0.55;
    flex-shrink: 0;
  }
  .aux-row-value {
    font-family: var(--font-Gilroy);
    font-size: 0.85rem;
    letter-spacing: -0.005em;
    text-align: right;
    opacity: 0.9;
  }

  /* Form fields */
  .field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .field-label {
    font-family: var(--font-Mono);
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    opacity: 0.6;
  }

  .field-input {
    font-family: var(--font-Gilroy);
    font-size: 1rem;
    padding: 0.75rem 0.65rem;
    background: transparent;
    border: none;
    border-bottom: 1px solid color-mix(in oklab, currentcolor 25%, transparent);
    color: inherit;
    transition: border-color 0.25s ease;
    border-radius: 0;
    resize: none;
    width: 100%;
  }

  .field-input:focus:not(:focus-visible) {
    outline: none;
  }

  .field-input::placeholder {
    color: color-mix(in oklab, currentcolor 35%, transparent);
  }

  .field-input:focus {
    border-bottom-color: var(--color-light-primary);
  }

  :is(.dark) .field-input:focus {
    border-bottom-color: var(--color-dark-primary);
  }

  .field-input:invalid:not(:placeholder-shown) {
    border-bottom-color: rgb(225, 80, 80);
  }

  textarea.field-input {
    line-height: 1.55;
  }

  .field-textarea {
    min-height: 9rem;
  }

  /* Alerts */
  .alert {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.95rem 1.1rem;
    font-family: var(--font-Mono);
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    border-left: 2px solid currentColor;
  }

  .alert-success {
    background: color-mix(in oklab, rgb(34, 197, 94) 12%, transparent);
    color: rgb(20, 110, 60);
    border-left-color: rgb(34, 197, 94);
  }

  :is(.dark) .alert-success {
    background: color-mix(in oklab, rgb(74, 222, 128) 14%, transparent);
    color: rgb(190, 240, 210);
    border-left-color: rgb(74, 222, 128);
  }

  .alert-error {
    background: color-mix(in oklab, rgb(239, 68, 68) 12%, transparent);
    color: rgb(150, 25, 35);
    border-left-color: rgb(239, 68, 68);
  }

  :is(.dark) .alert-error {
    background: color-mix(in oklab, rgb(248, 113, 113) 14%, transparent);
    color: rgb(252, 200, 200);
    border-left-color: rgb(248, 113, 113);
  }

  .alert-close {
    margin-left: auto;
    display: grid;
    place-content: center;
    min-width: 2.25rem;
    min-height: 2.25rem;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s ease;
    background: transparent;
    border: none;
    color: inherit;
    border-radius: 4px;
  }

  .alert-close:hover {
    opacity: 1;
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(-6px);
    opacity: 0;
  }

  /* Submit button — matches About btn-primary */
  .contact-submit {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.85rem 1.6rem;
    background: var(--color-light-primary);
    color: var(--color-dark);
    border: 1px solid var(--color-light-primary);
    font-family: var(--font-Mono);
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
  }

  :is(.dark) .contact-submit {
    background: var(--color-dark-primary);
    color: var(--color-dark);
    border-color: var(--color-dark-primary);
  }

  .contact-submit:hover:not(:disabled) {
    background: var(--color-dark);
    color: var(--color-light-primary);
    border-color: var(--color-dark);
  }

  :is(.dark) .contact-submit:hover:not(:disabled) {
    background: var(--color-dark-card);
    color: var(--color-dark-primary);
    border-color: var(--color-dark-card);
  }

  .contact-submit :deep(i.fa-arrow-right) {
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .contact-submit:hover:not(:disabled) :deep(i.fa-arrow-right) {
    transform: translateX(3px);
  }

  .contact-submit:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
</style>
