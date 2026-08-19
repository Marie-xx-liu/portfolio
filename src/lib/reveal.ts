/**
 * Scroll reveal — releases `[data-reveal]` elements once they enter view.
 *
 * The paired CSS lives in global.css. Without JS nothing is hidden, and
 * under prefers-reduced-motion the CSS already forces everything visible,
 * so this bails out early.
 */
export function initReveal(): void {
  if (typeof window === 'undefined') return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');

  if (reduce) {
    els.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
  );

  els.forEach((el) => io.observe(el));
}
