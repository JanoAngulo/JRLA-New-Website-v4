import { defineStore } from 'pinia'

const STORAGE_KEY = 'theme'
const MODES = ['system', 'light', 'dark']

function systemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function readStoredMode() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return MODES.includes(raw) ? raw : 'system'
}

function applyClass(isDark) {
  document.documentElement.classList.toggle('dark', isDark)
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
}

function resolveDark(mode) {
  if (mode === 'dark') return true
  if (mode === 'light') return false
  return systemPrefersDark()
}

export const useThemeStore = defineStore('theme', {
  state: () => ({
    mode: 'system',
    darkMode: false,
    _mediaQuery: null,
    _systemListener: null
  }),
  getters: {
    currentTheme: (state) => (state.darkMode ? 'dark' : 'light'),
    followsSystem: (state) => state.mode === 'system'
  },
  actions: {
    setMode(mode) {
      if (!MODES.includes(mode)) mode = 'system'
      this.mode = mode
      this.darkMode = resolveDark(mode)
      applyClass(this.darkMode)
      if (mode === 'system') localStorage.removeItem(STORAGE_KEY)
      else localStorage.setItem(STORAGE_KEY, mode)
    },
    cycleMode() {
      // system → light → dark → system
      const next = { system: 'light', light: 'dark', dark: 'system' }[this.mode] || 'system'
      this.setMode(next)
    },
    // Back-compat with existing Navbar wiring
    toggleDarkMode() {
      this.cycleMode()
    },
    initializeTheme() {
      this.setMode(readStoredMode())

      if (this._mediaQuery) return
      this._mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      this._systemListener = (event) => {
        if (this.mode !== 'system') return
        this.darkMode = event.matches
        applyClass(this.darkMode)
      }
      this._mediaQuery.addEventListener('change', this._systemListener)
    },
    teardownThemeListener() {
      if (this._mediaQuery && this._systemListener) {
        this._mediaQuery.removeEventListener('change', this._systemListener)
        this._mediaQuery = null
        this._systemListener = null
      }
    }
  }
})
