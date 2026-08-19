/**
 * Procedural water backdrop — "一叶扁舟 / one leaf on open water".
 *
 * This is the ONLY file that knows how the atmosphere is painted.
 * It renders to a single fixed <canvas> behind the whole document:
 *
 *   sky gradient → sun/moon disc → horizon mist → water gradient
 *   → glitter column → ripple bands → boat + its reflection
 *
 * Scroll position drives a palette interpolation through four
 * "hours" (dawn → open day → low sun → night), so the page reads
 * as a single voyage from top to bottom.
 *
 * SWAPPING TO PHOTOGRAPHIC / PAINTED ART:
 * nothing outside this module depends on it. Replace the
 * <WaterBackdrop /> component with an image-layer backdrop and no
 * page or section code changes. See docs/backdrop.md.
 */

type RGB = [number, number, number];

interface Hour {
  /** Scroll progress at which this palette is fully applied. */
  at: number;
  /** Vertical sky gradient: [zenith, horizon]. */
  sky: [RGB, RGB];
  /** Vertical water gradient: [horizon, foreground]. */
  water: [RGB, RGB];
  /** Light source colour + placement + strength. */
  sun: RGB;
  sunX: number;
  sunY: number;
  glow: number;
  /** Horizon haze strength. */
  haze: number;
}

/**
 * The voyage. Hour 3 (low sun) is the emotional peak — it is the
 * moment the reference photograph lives in.
 */
const HOURS: Hour[] = [
  {
    at: 0.0,
    sky: [[206, 219, 228], [240, 238, 232]],
    water: [[158, 179, 190], [92, 120, 136]],
    sun: [255, 252, 244],
    sunX: 0.62,
    sunY: 0.44,
    glow: 0.34,
    haze: 0.55,
  },
  {
    at: 0.36,
    sky: [[141, 181, 206], [214, 231, 236]],
    water: [[96, 143, 167], [28, 64, 84]],
    sun: [255, 255, 248],
    sunX: 0.7,
    sunY: 0.3,
    glow: 0.22,
    haze: 0.3,
  },
  {
    at: 0.7,
    sky: [[72, 78, 100], [232, 148, 100]],
    water: [[196, 112, 72], [26, 40, 56]],
    sun: [255, 198, 142],
    sunX: 0.5,
    sunY: 0.56,
    glow: 0.95,
    haze: 0.5,
  },
  {
    at: 1.0,
    sky: [[14, 26, 40], [38, 62, 82]],
    water: [[32, 60, 78], [7, 18, 28]],
    sun: [190, 210, 224],
    sunX: 0.38,
    sunY: 0.32,
    glow: 0.4,
    haze: 0.35,
  },
];

const clamp = (v: number, lo = 0, hi = 1) => (v < lo ? lo : v > hi ? hi : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpRGB = (a: RGB, b: RGB, t: number): RGB => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
];
const css = (c: RGB, alpha = 1) =>
  `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${alpha})`;

/** Smoothstep keeps the palette transitions from reading as linear wipes. */
const smooth = (t: number) => t * t * (3 - 2 * t);

/** Interpolate the full atmosphere for a scroll progress in [0,1]. */
function atmosphereAt(p: number): Hour {
  const t = clamp(p);
  let i = 0;
  while (i < HOURS.length - 2 && t > HOURS[i + 1].at) i++;
  const a = HOURS[i];
  const b = HOURS[i + 1];
  const k = smooth(clamp((t - a.at) / (b.at - a.at || 1)));
  return {
    at: t,
    sky: [lerpRGB(a.sky[0], b.sky[0], k), lerpRGB(a.sky[1], b.sky[1], k)],
    water: [lerpRGB(a.water[0], b.water[0], k), lerpRGB(a.water[1], b.water[1], k)],
    sun: lerpRGB(a.sun, b.sun, k),
    sunX: lerp(a.sunX, b.sunX, k),
    sunY: lerp(a.sunY, b.sunY, k),
    glow: lerp(a.glow, b.glow, k),
    haze: lerp(a.haze, b.haze, k),
  };
}

/* ------------------------------------------------------------------ */
/* The boat                                                            */
/* ------------------------------------------------------------------ */

/**
 * An original slender-hull silhouette with a single seated figure and
 * a raised paddle. Drawn parametrically so it stays crisp at any DPR
 * and can be tinted per-hour.
 *
 * Local coordinate space is 100 wide × 42 tall, origin at the hull's
 * waterline centre.
 */
function drawBoat(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  tint: string,
  flipReflection = false,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, flipReflection ? -scale : scale);
  ctx.fillStyle = tint;

  // Hull — a long shallow crescent, bow slightly higher than stern.
  ctx.beginPath();
  ctx.moveTo(-50, 0);
  ctx.quadraticCurveTo(-46, -7, -30, -8.5);
  ctx.lineTo(30, -8.5);
  ctx.quadraticCurveTo(48, -7.5, 52, 0);
  ctx.quadraticCurveTo(20, 7.5, -18, 7);
  ctx.quadraticCurveTo(-38, 6, -50, 0);
  ctx.closePath();
  ctx.fill();

  // Figure — torso wedge + head. Kept small; the boat reads as the
  // subject, the person as the scale cue.
  ctx.beginPath();
  ctx.moveTo(-5, -8.5);
  ctx.quadraticCurveTo(-4, -20, 1, -22);
  ctx.quadraticCurveTo(7, -20, 7, -8.5);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.arc(1.5, -25.5, 3.6, 0, Math.PI * 2);
  ctx.fill();

  // Paddle — one blade lifted, one dipping, drawn as a single shaft.
  ctx.save();
  ctx.translate(1, -17);
  ctx.rotate(-0.42);
  ctx.fillRect(-1.5, -20, 3, 42);
  ctx.beginPath();
  ctx.ellipse(0, -22, 3.4, 6.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(0, 24, 3.4, 6.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

/* ------------------------------------------------------------------ */
/* Renderer                                                            */
/* ------------------------------------------------------------------ */

export interface WaterHandle {
  destroy(): void;
}

export function mountWater(canvas: HTMLCanvasElement): WaterHandle {
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return { destroy() {} };

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let w = 0;
  let h = 0;
  let dpr = 1;
  let raf = 0;
  let running = true;
  /** Eased scroll progress — lags the raw value so the palette drifts. */
  let progress = 0;
  let targetProgress = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function readScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    targetProgress = max > 0 ? clamp(window.scrollY / max) : 0;
  }

  function frame(now: number) {
    if (!running) return;
    const t = now / 1000;

    // Ease toward the scroll target; the water changes slower than
    // the page moves, which is what makes it feel like weather.
    progress += (targetProgress - progress) * 0.06;

    const A = atmosphereAt(progress);
    // Horizon rides a little with scroll — a slow parallax lift.
    const horizon = h * (0.63 - progress * 0.13);
    const sunX = w * A.sunX;
    const sunY = horizon * A.sunY * 1.6;

    /* --- sky ------------------------------------------------------ */
    const sky = ctx!.createLinearGradient(0, 0, 0, horizon);
    sky.addColorStop(0, css(A.sky[0]));
    sky.addColorStop(1, css(A.sky[1]));
    ctx!.fillStyle = sky;
    ctx!.fillRect(0, 0, w, horizon + 1);

    /* --- sun / moon ----------------------------------------------- */
    const discR = Math.max(w, h) * 0.035;
    const halo = ctx!.createRadialGradient(sunX, sunY, 0, sunX, sunY, discR * 9);
    halo.addColorStop(0, css(A.sun, 0.85 * A.glow + 0.15));
    halo.addColorStop(0.12, css(A.sun, 0.45 * A.glow));
    halo.addColorStop(1, css(A.sun, 0));
    ctx!.fillStyle = halo;
    ctx!.fillRect(0, 0, w, horizon + 1);

    // The disc itself is drawn as a gradient rather than a flat fill —
    // a hard-edged circle reads as a bug, not as light.
    const disc = ctx!.createRadialGradient(sunX, sunY, 0, sunX, sunY, discR);
    disc.addColorStop(0, css(A.sun, 0.55 + 0.4 * A.glow));
    disc.addColorStop(0.55, css(A.sun, 0.34 + 0.3 * A.glow));
    disc.addColorStop(1, css(A.sun, 0));
    ctx!.fillStyle = disc;
    ctx!.beginPath();
    ctx!.arc(sunX, sunY, discR * 1.6, 0, Math.PI * 2);
    ctx!.fill();

    /* --- water ---------------------------------------------------- */
    const water = ctx!.createLinearGradient(0, horizon, 0, h);
    water.addColorStop(0, css(A.water[0]));
    water.addColorStop(1, css(A.water[1]));
    ctx!.fillStyle = water;
    ctx!.fillRect(0, horizon, w, h - horizon);

    /* --- glitter column ------------------------------------------
       The light's reflection: short horizontal dashes that widen and
       scatter with distance from the horizon. This is what sells the
       surface as water rather than a gradient.                      */
    const wave = reduced ? 0 : t;
    ctx!.save();
    ctx!.beginPath();
    ctx!.rect(0, horizon, w, h - horizon);
    ctx!.clip();

    const rows = 46;
    for (let i = 0; i < rows; i++) {
      const f = i / rows; // 0 at horizon → 1 at foreground
      const y = horizon + Math.pow(f, 1.9) * (h - horizon);
      // Perspective: rows compress near the horizon.
      const rowH = Math.max(1, Math.pow(f, 1.5) * 9 + 1);
      const spread = w * (0.03 + f * 0.34);
      const dashes = 3 + Math.floor(f * 12);

      for (let d = 0; d < dashes; d++) {
        const seed = i * 7.13 + d * 3.77;
        const sway = Math.sin(wave * (0.6 + f) + seed) * spread * 0.55;
        const cx = sunX + sway + Math.cos(seed * 2.1) * spread * 0.5;
        const len = (0.03 + f * 0.09) * w * (0.5 + 0.5 * Math.abs(Math.sin(wave * 1.3 + seed)));
        const dist = Math.abs(cx - sunX) / (spread + 1);
        const alpha =
          (0.4 * A.glow + 0.09) * (1 - clamp(dist)) * (0.3 + 0.7 * Math.abs(Math.sin(wave + seed)));
        if (alpha <= 0.01) continue;
        // Break the row alignment — without this the dashes stack into
        // even bands and the surface reads as a barcode, not water.
        const jitter = Math.sin(seed * 5.3) * rowH * 1.6;
        ctx!.fillStyle = css(A.sun, alpha * 0.55);
        ctx!.fillRect(cx - len / 2, y + jitter, len, rowH * 0.5);
      }
    }

    /* --- ripple bands --------------------------------------------
       Broken, jittered strokes rather than continuous lines. A line
       that runs edge to edge at even spacing reads as a scanline; the
       gaps and the per-segment alpha are what make it read as water. */
    ctx!.lineCap = 'round';
    for (let i = 0; i < 20; i++) {
      const f = i / 20;
      const y = horizon + Math.pow(f, 2.1) * (h - horizon);
      const amp = 2 + f * 16;
      const base = 0.025 + f * 0.05;
      ctx!.lineWidth = Math.max(0.7, f * 2.6);

      // Walk the band in segments, skipping some so it stays broken.
      const seg = 60 + f * 140;
      for (let x = -seg; x < w + seg; x += seg) {
        const seed = i * 4.7 + x * 0.013;
        const gap = Math.sin(seed * 1.9 + wave * 0.25);
        if (gap < -0.15) continue; // roughly a third of segments drop out

        const a = base * (0.45 + 0.55 * Math.abs(Math.sin(seed + wave * 0.6)));
        ctx!.strokeStyle = css([255, 255, 255], a);
        ctx!.beginPath();
        for (let dx = 0; dx <= seg; dx += 10) {
          const px = x + dx;
          const yy =
            y +
            Math.sin(px * 0.008 + wave * (0.4 + f * 0.8) + i) * amp * 0.35 +
            Math.sin(px * 0.021 - wave * 0.6 + i * 2.3) * amp * 0.16;
          if (dx === 0) ctx!.moveTo(px, yy);
          else ctx!.lineTo(px, yy);
        }
        ctx!.stroke();
      }
    }
    ctx!.restore();

    /* --- horizon haze --------------------------------------------- */
    const hazeH = h * 0.26;
    const haze = ctx!.createLinearGradient(0, horizon - hazeH, 0, horizon + hazeH * 0.7);
    haze.addColorStop(0, css(A.sky[1], 0));
    haze.addColorStop(0.42, css(A.sky[1], 0.6 * A.haze));
    haze.addColorStop(0.58, css(A.sky[1], 0.6 * A.haze));
    haze.addColorStop(1, css(A.water[0], 0));
    ctx!.fillStyle = haze;
    ctx!.fillRect(0, horizon - hazeH, w, hazeH * 1.7);

    /* --- the boat -------------------------------------------------
       Drifts left→right across the whole voyage and bobs on the
       swell. Scale is tied to viewport width so it stays "one small
       leaf" on any screen.                                          */
    // `near` is 1 at the top of the page and 0 at the bottom: the boat
    // starts close and low (clear of the hero copy, which runs the full
    // width) and recedes toward the horizon as the voyage goes on.
    const near = 1 - progress;
    const boatScale = Math.max(0.55, Math.min(1.5, w / 1400)) * (0.85 + near * 0.5);
    const bob = reduced ? 0 : Math.sin(t * 0.9) * 3 + Math.sin(t * 1.7) * 1.2;
    const tilt = reduced ? 0 : Math.sin(t * 0.9 + 0.6) * 0.02;
    const bx = w * (0.3 + progress * 0.52);
    const by = horizon + h * (0.05 + near * 0.19) + bob;

    // Reflection first, so the hull sits on top of it.
    ctx!.save();
    ctx!.globalAlpha = 0.22;
    ctx!.filter = 'blur(2px)';
    ctx!.translate(bx, by + 4);
    ctx!.rotate(tilt);
    ctx!.scale(1, 0.55);
    drawBoat(ctx!, 0, 0, boatScale, css(A.water[1]), true);
    ctx!.restore();

    ctx!.save();
    ctx!.translate(bx, by);
    ctx!.rotate(tilt);
    // Silhouette: near-black against a bright hour, lifted against night.
    const hullTint = progress > 0.82 ? css([6, 14, 22], 0.95) : css([14, 20, 26], 0.92);
    drawBoat(ctx!, 0, 0, boatScale, hullTint);
    ctx!.restore();

    /* --- vignette -------------------------------------------------- */
    const vig = ctx!.createRadialGradient(w / 2, h * 0.5, h * 0.32, w / 2, h * 0.5, h * 0.95);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, `rgba(0,0,0,${0.18 + progress * 0.18})`);
    ctx!.fillStyle = vig;
    ctx!.fillRect(0, 0, w, h);

    if (!reduced) raf = requestAnimationFrame(frame);
  }

  function onScroll() {
    readScroll();
    // Under reduced motion there is no rAF loop, so repaint on demand.
    if (reduced) frame(0);
  }

  function onResize() {
    resize();
    readScroll();
    if (reduced) frame(0);
  }

  function onVisibility() {
    if (reduced) return;
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(raf);
    } else if (!running) {
      running = true;
      raf = requestAnimationFrame(frame);
    }
  }

  resize();
  readScroll();
  progress = targetProgress;

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', onVisibility);

  if (reduced) frame(0);
  else raf = requestAnimationFrame(frame);

  return {
    destroy() {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    },
  };
}
