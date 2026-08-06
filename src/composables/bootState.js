// The boot overlay's departure, as a fact rather than a moment.
//
// It happens once per page load and is announced once, so anything mounted
// after the announcement — a route change back to the pager, say — has no event
// left to hear and would wait forever. The latch is here for those; the event is
// here for whoever was already listening.
//
// Fired when the overlay STARTS its exit fade, not when it finishes. The hero's
// entrance and the overlay's 700ms dissolve are meant to overlap: the page
// materialises through the fade as one gesture instead of showing a blank panel
// for the length of the fade and then animating into it.
export const bootState = { revealing: false }

export function markBootRevealing() {
  if (bootState.revealing) return
  bootState.revealing = true
  window.dispatchEvent(new Event('jrla:boot-reveal'))
}
