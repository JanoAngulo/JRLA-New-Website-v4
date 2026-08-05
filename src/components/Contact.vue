<template>
  <Transition name="fade">
    <div
      ref="contactSection"
      :class="['relative w-full md:overflow-hidden overflow-y-auto app-slide', { 'is-revealed': entered }]">
      <div class="grid grid-cols-1 grid-rows-[auto_auto] min-h-full w-full md:grid-cols-[40fr_60fr] md:grid-rows-1 md:h-full">
        <!-- LEFT: accent block w/ pull-quote + contact card -->
        <section data-accent-surface class="contact-left relative dark:bg-dark-primary bg-light-primary text-dark overflow-hidden min-h-0 h-auto max-md:overflow-visible">
          <div class="relative flex flex-col justify-between p-6 md:p-10 lg:p-14 gap-8 h-full">
            <!-- Top eyebrow -->
            <div class="reveal-fade flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 font-Mono text-[10px] tracking-[0.3em] uppercase" style="--d:0.1s">
              <span>05 — Contact</span>
              <span class="hidden sm:inline opacity-70">Reach Out</span>
            </div>

            <!-- Pull-quote -->
            <div class="flex flex-col gap-5">
              <p class="font-Mono text-xs tracking-[0.35em] uppercase opacity-70">— Open Brief</p>
              <h2 class="text-[clamp(2.25rem,4.8vw,4.25rem)] tracking-[-0.035em] font-Gilroy-extra-bold uppercase leading-[0.9]">
                <span class="reveal-line leading-none"><span class="ch-inner" style="--d:0.25s">Let's build</span></span>
                <span class="reveal-line leading-none"><span class="ch-inner" style="--d:0.4s">something</span></span>
                <span class="reveal-line leading-none"><span class="ch-inner [-webkit-text-fill-color:transparent] [-webkit-text-stroke:1.5px_var(--color-dark)] opacity-85" style="--d:0.55s">together.</span></span>
              </h2>
              <div class="h-px w-16 bg-dark/40"></div>
              <p class="font-Gilroy text-base sm:text-lg leading-relaxed max-w-md opacity-90">
                <span class="reveal-fade inline-block" style="--d:0.3s">Got an idea worth chasing? </span><span class="reveal-fade inline-block" style="--d:0.42s">Whether it's a fresh design, a website that stands out, or a half-baked concept — </span><span class="reveal-fade inline-block" style="--d:0.54s">drop a note and let's turn it into something real.</span>
              </p>
            </div>

            <!-- Contact card + socials -->
            <div class="flex flex-col gap-4">
              <div class="border-t border-dark/20">
                <div class="reveal-fade flex justify-between items-baseline py-[0.65rem] border-b border-dark/20 gap-4" style="--d:0.34s">
                  <span class="font-Mono text-[0.7rem] tracking-[0.3em] uppercase opacity-65 shrink-0">Email</span>
                  <a href="mailto:Angulo.johnrussel.l.7814@gmail.com" class="font-Gilroy text-sm tracking-[-0.005em] text-right break-words underline decoration-1 underline-offset-[3px] transition-opacity duration-200 hover:opacity-70">angulo.johnrussel.l.7814@gmail.com</a>
                </div>
                <div class="reveal-fade flex justify-between items-baseline py-[0.65rem] border-b border-dark/20 gap-4" style="--d:0.42s">
                  <span class="font-Mono text-[0.7rem] tracking-[0.3em] uppercase opacity-65 shrink-0">Based</span>
                  <span class="font-Gilroy text-sm tracking-[-0.005em] text-right break-words">Bulacan · PH</span>
                </div>
                <div class="reveal-fade flex justify-between items-baseline py-[0.65rem] border-b border-dark/20 gap-4" style="--d:0.5s">
                  <span class="font-Mono text-[0.7rem] tracking-[0.3em] uppercase opacity-65 shrink-0">Status</span>
                  <span class="font-Gilroy text-sm tracking-[-0.005em] text-right break-words flex items-center gap-2"><span class="status-dot w-[0.45rem] h-[0.45rem] rounded-full bg-dark/85"></span> Available 2026</span>
                </div>
              </div>

              <div class="reveal-fade flex items-center gap-3 pt-2" style="--d:0.58s">
                <p class="font-Mono text-[10px] tracking-[0.3em] uppercase opacity-70">Find Me</p>
                <div class="flex gap-2 no-swipe">
                  <a target="_blank" rel="noopener" aria-label="LinkedIn" href="https://www.linkedin.com/in/jrla1219/" class="social-pill border-dark/60 text-dark hover:bg-dark hover:text-light-primary hover:-translate-y-0.5 dark:hover:text-dark-primary">
                    <i class="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a target="_blank" rel="noopener" aria-label="Facebook" href="https://www.facebook.com/Jano1219" class="social-pill border-dark/60 text-dark hover:bg-dark hover:text-light-primary hover:-translate-y-0.5 dark:hover:text-dark-primary">
                    <i class="fa-brands fa-facebook-f"></i>
                  </a>
                  <a target="_blank" rel="noopener" aria-label="Behance" href="https://www.behance.net/JRLA" class="social-pill border-dark/60 text-dark hover:bg-dark hover:text-light-primary hover:-translate-y-0.5 dark:hover:text-dark-primary">
                    <i class="fa-brands fa-behance"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- RIGHT: form -->
        <section class="contact-right relative dark:bg-dark bg-light dark:text-light text-dark md:overflow-y-auto">
          <!-- Subtle dot-grid backdrop -->
          <div class="dot-grid bg-size-[22px_22px]" aria-hidden="true"></div>

          <div class="relative flex flex-col p-6 md:p-10 lg:p-14 gap-6 md:h-full">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 font-Mono text-[10px] tracking-[0.3em] uppercase opacity-70">
              <span>Drop a Line</span>
              <span class="hidden sm:inline">Form / 01</span>
            </div>

            <div class="space-y-3">
              <p class="font-Mono text-xs tracking-[0.35em] uppercase opacity-60">— Send a Message</p>
              <h3 class="font-Gilroy-extra-bold uppercase leading-[0.95] text-[clamp(1.5rem,2.4vw,2rem)] tracking-[-0.02em]">
                <span class="reveal-line leading-none"><span class="cfh-inner" style="--d:0.4s">Tell me <em class="not-italic dark:text-dark-primary text-light-primary">what's</em> on your mind</span></span>
              </h3>
              <div class="hairline"></div>
            </div>

            <form @submit.prevent="onSubmit" class="pt-5 flex flex-col gap-5 flex-1" novalidate>
              <div class="grid gap-5 md:grid-cols-2">
                <div class="group/field flex flex-col gap-[0.4rem]">
                  <label for="Name" class="font-Mono text-[0.7rem] tracking-[0.3em] uppercase opacity-60 origin-left transition-[color,opacity,transform] duration-250 group-focus-within/field:opacity-100 group-focus-within/field:-translate-y-0.5 group-focus-within/field:text-light-primary dark:group-focus-within/field:text-dark-primary">Name</label>
                  <div class="relative">
                    <input type="text" id="Name" name="Name" v-model="name" @input="errors.name = ''" class="font-Gilroy text-base w-full px-[0.65rem] py-3 bg-transparent border-0 border-b border-current/25 rounded-none resize-none text-inherit transition-colors duration-250 placeholder:text-current/35 focus:border-b-transparent dark:focus:border-b-transparent [&:focus:not(:focus-visible)]:outline-none [&:invalid:not(:placeholder-shown)]:border-b-danger dark:[&:invalid:not(:placeholder-shown)]:border-b-danger-dark" :class="errors.name ? 'border-b-danger dark:border-b-danger-dark' : ''" placeholder="Your name" autocomplete="name" aria-required="true" :aria-invalid="!!errors.name" :aria-describedby="errors.name ? 'Name-error' : undefined" required />
                    <span aria-hidden="true" class="field-underline pointer-events-none absolute left-0 bottom-0 h-0.5 w-full origin-center scale-x-0 bg-light-primary dark:bg-dark-primary transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within/field:scale-x-100"></span>
                  </div>
                  <span v-if="errors.name" id="Name-error" class="block mt-[0.4rem] font-Mono text-[0.6875rem] tracking-[0.2em] uppercase text-danger-text dark:text-danger-text-dark">{{ errors.name }}</span>
                </div>
                <div class="group/field flex flex-col gap-[0.4rem]">
                  <label for="Email" class="font-Mono text-[0.7rem] tracking-[0.3em] uppercase opacity-60 origin-left transition-[color,opacity,transform] duration-250 group-focus-within/field:opacity-100 group-focus-within/field:-translate-y-0.5 group-focus-within/field:text-light-primary dark:group-focus-within/field:text-dark-primary">Email</label>
                  <div class="relative">
                    <input type="email" id="Email" name="Email" v-model="email" @input="errors.email = ''" class="font-Gilroy text-base w-full px-[0.65rem] py-3 bg-transparent border-0 border-b border-current/25 rounded-none resize-none text-inherit transition-colors duration-250 placeholder:text-current/35 focus:border-b-transparent dark:focus:border-b-transparent [&:focus:not(:focus-visible)]:outline-none [&:invalid:not(:placeholder-shown)]:border-b-danger dark:[&:invalid:not(:placeholder-shown)]:border-b-danger-dark" :class="errors.email ? 'border-b-danger dark:border-b-danger-dark' : ''" placeholder="hello@yourname.com" autocomplete="email" aria-required="true" :aria-invalid="!!errors.email" :aria-describedby="errors.email ? 'Email-error' : undefined" required />
                    <span aria-hidden="true" class="field-underline pointer-events-none absolute left-0 bottom-0 h-0.5 w-full origin-center scale-x-0 bg-light-primary dark:bg-dark-primary transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within/field:scale-x-100"></span>
                  </div>
                  <span v-if="errors.email" id="Email-error" class="block mt-[0.4rem] font-Mono text-[0.6875rem] tracking-[0.2em] uppercase text-danger-text dark:text-danger-text-dark">{{ errors.email }}</span>
                </div>
              </div>

              <div class="group/field flex flex-col gap-[0.4rem]">
                <div class="flex items-center justify-between">
                  <label for="Message" class="font-Mono text-[0.7rem] tracking-[0.3em] uppercase opacity-60 origin-left transition-[color,opacity,transform] duration-250 group-focus-within/field:opacity-100 group-focus-within/field:-translate-y-0.5 group-focus-within/field:text-light-primary dark:group-focus-within/field:text-dark-primary">Message</label>
                  <span id="Message-count" class="font-Mono text-[0.65rem] tracking-[0.18em] transition-[color,opacity,transform] duration-200 origin-right" :class="[message.length > 800 ? 'opacity-100 text-light-primary dark:text-dark-primary' : 'opacity-50', message.length > 940 ? 'count-alert' : '']">{{ message.length }} / 1000</span>
                </div>
                <div class="relative">
                  <textarea id="Message" name="Message" v-model="message" @input="errors.message = ''" class="font-Gilroy text-base w-full px-[0.65rem] py-3 bg-transparent border-0 border-b border-current/25 rounded-none resize-none text-inherit transition-colors duration-250 placeholder:text-current/35 focus:border-b-transparent dark:focus:border-b-transparent [&:focus:not(:focus-visible)]:outline-none [&:invalid:not(:placeholder-shown)]:border-b-[rgb(225,80,80)] leading-[1.55] min-h-36 block" :class="errors.message ? 'border-b-danger dark:border-b-danger-dark' : ''" rows="7" maxlength="1000" placeholder="Project brief, idea, or just say hi…" aria-required="true" :aria-invalid="!!errors.message" :aria-describedby="errors.message ? 'Message-error Message-count' : 'Message-count'" required></textarea>
                  <span aria-hidden="true" class="field-underline pointer-events-none absolute left-0 bottom-1.5 h-0.5 w-full origin-center scale-x-0 bg-light-primary dark:bg-dark-primary transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within/field:scale-x-100"></span>
                </div>
                <span v-if="errors.message" id="Message-error" class="block mt-[0.4rem] font-Mono text-[0.6875rem] tracking-[0.2em] uppercase text-danger-text dark:text-danger-text-dark">{{ errors.message }}</span>
              </div>

              <!-- Status messages -->
              <Transition name="slide-fade">
                <div v-if="isSuccess" class="flex items-center gap-3 px-[1.1rem] py-[0.95rem] font-Mono text-xs tracking-[0.18em] uppercase border-l bg-[color-mix(in_oklab,var(--color-success)_12%,transparent)] text-success-text border-l-success dark:bg-[color-mix(in_oklab,var(--color-success-dark)_14%,transparent)] dark:text-success-text-dark dark:border-l-success-dark" role="status">
                  <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
                  <span>Message received. I'll get back to you soon.</span>
                  <button type="button" class="ml-auto grid place-content-center min-w-11 min-h-11 -my-2 cursor-pointer opacity-70 transition-opacity duration-200 bg-transparent border-0 text-inherit rounded-[4px] hover:opacity-100" @click="isSuccess = false" aria-label="Dismiss confirmation"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
                </div>
              </Transition>
              <Transition name="slide-fade">
                <div v-if="isError" class="flex items-center gap-3 px-[1.1rem] py-[0.95rem] font-Mono text-xs tracking-[0.18em] uppercase border-l bg-[color-mix(in_oklab,var(--color-danger)_12%,transparent)] text-danger-text border-l-danger dark:bg-[color-mix(in_oklab,var(--color-danger-dark)_14%,transparent)] dark:text-danger-text-dark dark:border-l-danger-dark" role="alert">
                  <i class="fa-solid fa-circle-xmark" aria-hidden="true"></i>
                  <span>Something broke on the way. Try again or email me directly.</span>
                  <button type="button" class="ml-auto grid place-content-center min-w-11 min-h-11 -my-2 cursor-pointer opacity-70 transition-opacity duration-200 bg-transparent border-0 text-inherit rounded-sm hover:opacity-100" @click="isError = false" aria-label="Dismiss error"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
                </div>
              </Transition>

              <div class="flex items-center justify-between gap-4 pt-2 flex-wrap">
                <div class="flex items-center gap-[0.55rem] font-Mono text-[0.65rem] tracking-[0.22em] uppercase opacity-70">
                  <span class="form-dot w-[7px] h-[7px] rounded-full bg-light-primary dark:bg-dark-primary"></span>
                  <span>Avg. response · 24 hours</span>
                </div>
                <button type="submit" :disabled="loading" :aria-busy="loading" class="btn btn-primary group px-[1.6rem]">
                  <span>{{ loading ? 'Sending' : justSent ? 'Sent' : 'Send Message' }}</span>
                  <i v-if="loading" class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>
                  <i v-else-if="justSent" class="check-pop fa-solid fa-circle-check" aria-hidden="true"></i>
                  <i v-else class="fa-solid fa-arrow-right transition-transform duration-250 ease-in-out group-hover:translate-x-[3px]" aria-hidden="true"></i>
                </button>
              </div>

              <div class="mt-5 pt-4 border-t border-current/12 flex flex-col">
                <div class="flex justify-between items-baseline py-[0.55rem] gap-4 border-b border-dashed border-current/10 last:border-b-0">
                  <span class="font-Mono text-[0.62rem] tracking-[0.28em] uppercase opacity-55 shrink-0">Best for</span>
                  <span class="font-Gilroy text-[0.85rem] tracking-[-0.005em] text-right opacity-90">Web · Mobile · UI/UX · Brand</span>
                </div>
                <div class="flex justify-between items-baseline py-[0.55rem] gap-4 border-b border-dashed border-current/10 last:border-b-0">
                  <span class="font-Mono text-[0.62rem] tracking-[0.28em] uppercase opacity-55 shrink-0">Timezone</span>
                  <span class="font-Gilroy text-[0.85rem] tracking-[-0.005em] text-right opacity-90">GMT+8 · Manila</span>
                </div>
                <div class="flex justify-between items-baseline py-[0.55rem] gap-4 border-b border-dashed border-current/10 last:border-b-0">
                  <span class="font-Mono text-[0.62rem] tracking-[0.28em] uppercase opacity-55 shrink-0">Form by</span>
                  <span class="font-Gilroy text-[0.85rem] tracking-[-0.005em] text-right opacity-90">Formspark · spam-shielded</span>
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
  import { sectionReveal } from '../composables/sectionReveal'

  const FORMSPARK_ACTION_URL = 'https://submit-form.com/dQ4bHCKeB'
  const BOTPOISON_KEY = 'pk_847c92ad-fbd6-4a5e-a078-3ba1270f4002'

  export default {
    name: 'Contact',
    mixins: [sectionReveal('contact')],
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
        justSent: false,
        name: '',
        email: '',
        message: '',
        isSuccess: false,
        isError: false,
        errors: { name: '', email: '', message: '' }
      }
    },
    created() {
      this.botpoison = new Botpoison({ publicKey: BOTPOISON_KEY })
    },
    beforeUnmount() {
      clearTimeout(this._sentTimer)
    },
    methods: {
      validate() {
        const errors = { name: '', email: '', message: '' }
        const name = this.name.trim()
        const email = this.email.trim()
        const message = this.message.trim()

        if (!name) errors.name = 'Name is required.'
        else if (name.length < 2) errors.name = 'Name is too short.'

        if (!email) errors.email = 'Email is required.'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'Enter a valid email.'

        if (!message) errors.message = 'Message is required.'
        else if (message.length < 10) errors.message = 'Message is too short (min 10 chars).'

        this.errors = errors
        return !errors.name && !errors.email && !errors.message
      },
      async onSubmit() {
        this.isSuccess = false
        this.isError = false
        if (!this.validate()) return
        this.loading = true
        try {
          const { solution } = await this.botpoison.challenge()
          const response = await fetch(FORMSPARK_ACTION_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ name: this.name, email: this.email, message: this.message, _botpoison: solution })
          })
          if (response.ok) {
            this.isSuccess = true
            this.justSent = true
            this.name = ''
            this.email = ''
            this.message = ''
            this.errors = { name: '', email: '', message: '' }
            clearTimeout(this._sentTimer)
            this._sentTimer = setTimeout(() => { this.justSent = false }, 2500)
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
  /* Vue <Transition> classes — applied dynamically, can't be utilities */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
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

  /* Entrance reveals — gated on `.is-revealed` (v-reveal, scroll entry). */
  .contact-left {
    transform: translateX(-3%);
    opacity: 0;
    transition: transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1),
                opacity 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .contact-right {
    transform: translateX(3%);
    opacity: 0;
    transition: transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s,
                opacity 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s;
  }
  .is-revealed .contact-left,
  .is-revealed .contact-right {
    transform: translateX(0);
    opacity: 1;
  }

  /* Headline line-reveal */
  .ch-inner,
  .cfh-inner {
    display: inline-block;
    transform: translateY(105%);
    transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: var(--d, 0s);
  }
  .is-revealed .ch-inner,
  .is-revealed .cfh-inner {
    transform: translateY(0);
  }
  @media (prefers-reduced-motion: reduce) {
    .contact-left,
    .contact-right,
    .ch-inner,
    .cfh-inner {
      transition-duration: 0.2s;
      transition-delay: 0s;
    }
    .contact-left,
    .contact-right { transform: none; }
  }

  /* Pulse dots */
  .status-dot,
  .form-dot {
    animation: pulse-dot 2s ease-in-out infinite;
  }
  @keyframes pulse-dot {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.4); opacity: 0.45; }
  }

  /* Submit success — checkmark pops in */
  .check-pop {
    animation: check-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes check-pop {
    0% { transform: scale(0) rotate(-30deg); opacity: 0; }
    60% { transform: scale(1.25) rotate(0deg); }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }

  /* Character count nearing the limit — heartbeat pulse */
  .count-alert {
    animation: count-pulse 0.9s ease-in-out infinite;
  }
  @keyframes count-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.12); }
  }

  @media (prefers-reduced-motion: reduce) {
    .check-pop,
    .count-alert {
      animation: none;
    }
  }
</style>
