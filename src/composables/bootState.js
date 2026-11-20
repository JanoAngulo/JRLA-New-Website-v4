// Set when the boot overlay starts its exit fade, so the hero entrance overlaps it.
// The latch serves components mounted after the one-time event has fired.
export const bootState = { revealing: false }

export function markBootRevealing() {
  if (bootState.revealing) return
  bootState.revealing = true
  window.dispatchEvent(new Event('jrla:boot-reveal'))
}
