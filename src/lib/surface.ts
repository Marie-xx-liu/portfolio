/**
 * Tracks whether the middle of the viewport is currently over a cream
 * sheet or over open water, and publishes it as
 * `document.documentElement.dataset.surface`.
 *
 * Fixed chrome (the current rails, the scroll pilot) needs this: ripples
 * drawn on top of actual water are redundant, and an ink-dark boat is
 * invisible against the night water the page ends on.
 *
 * Deliberately computed from geometry on scroll rather than with an
 * IntersectionObserver. The state has to be correct on the very first
 * paint — an observer's first callback is async, which leaves the rails
 * and the pilot one frame in the wrong palette — and a synchronous
 * measurement is also far easier to assert against.
 */
export function initSurface(): void {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;
  const sheets = Array.from(document.querySelectorAll<HTMLElement>('.sheet'));

  if (!sheets.length) {
    root.dataset.surface = 'sheet';
    return;
  }

  let ticking = false;

  function measure() {
    // The band that decides. Chrome switches when a surface dominates the
    // view, not when it first pokes into it.
    const mid = window.innerHeight / 2;
    const overSheet = sheets.some((sheet) => {
      const { top, bottom } = sheet.getBoundingClientRect();
      return top <= mid && bottom >= mid;
    });
    root.dataset.surface = overSheet ? 'sheet' : 'water';
    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    },
    { passive: true },
  );

  window.addEventListener('resize', measure);
  measure();
}
