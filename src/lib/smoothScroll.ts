// Lenis smooth scroll, wired to GSAP ScrollTrigger when present.
// Disabled automatically under prefers-reduced-motion.
import Lenis from 'lenis';

let lenis: Lenis | null = null;

export function initSmoothScroll(): Lenis | null {
  if (typeof window === 'undefined') return null;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return null;

  if (lenis) return lenis;

  lenis = new Lenis({
    lerp: 0.09, // inertia without losing control (spec: 0.08–0.1)
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  // Expose for programmatic scroll (anchors, dev verification).
  (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

  // Bridge to GSAP ScrollTrigger if it's loaded on the page.
  const w = window as unknown as {
    gsap?: { ticker: { add: (cb: (t: number) => void) => void; lagSmoothing: (n: number) => void } };
    ScrollTrigger?: { update: () => void };
  };

  if (w.ScrollTrigger) {
    lenis.on('scroll', w.ScrollTrigger.update);
  }

  if (w.gsap) {
    w.gsap.ticker.add((time: number) => {
      lenis?.raf(time * 1000);
    });
    w.gsap.ticker.lagSmoothing(0);
  } else {
    const raf = (time: number) => {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  return lenis;
}

export function getLenis() {
  return lenis;
}
