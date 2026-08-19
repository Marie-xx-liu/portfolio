import { useEffect, useRef, useState } from 'react';

interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Range form, e.g. 90–95% — renders `${value}–${valueTo}` */
  valueTo?: number;
  label?: string;
  /** Show a "Replay" control (styleguide/demo only). */
  demo?: boolean;
  durationMs?: number;
}

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function format(n: number, decimals: number) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

export default function StatCounter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  valueTo,
  label,
  demo = false,
  durationMs = 1400,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const [displayTo, setDisplayTo] = useState(0);
  const [tick, setTick] = useState(0);
  const started = useRef(false);

  const animate = () => {
    if (prefersReduced()) {
      setDisplay(value);
      if (valueTo !== undefined) setDisplayTo(valueTo);
      return;
    }
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // ease-out cubic
    const step = (now: number) => {
      const p = Math.min((now - start) / durationMs, 1);
      const e = ease(p);
      setDisplay(value * e);
      if (valueTo !== undefined) setDisplayTo(valueTo * e);
      if (p < 1) requestAnimationFrame(step);
      else {
        setDisplay(value);
        if (valueTo !== undefined) setDisplayTo(valueTo);
      }
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          animate();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-run when demo replay is triggered.
  useEffect(() => {
    if (tick > 0) animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="font-mono text-4xl font-medium tabular-nums tracking-tight text-ink md:text-5xl">
        {prefix}
        {format(display, decimals)}
        {valueTo !== undefined && <>–{format(displayTo, decimals)}</>}
        {suffix}
      </span>
      {label && (
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">
          {label}
        </span>
      )}
      {demo && (
        <button
          type="button"
          className="mt-2 w-fit font-mono text-xs text-accent underline underline-offset-4 transition-opacity hover:opacity-70"
          onClick={() => setTick((t) => t + 1)}
        >
          ↺ Replay
        </button>
      )}
    </div>
  );
}
