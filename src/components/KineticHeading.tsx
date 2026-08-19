import { useEffect, useRef, useState, createElement, type CSSProperties, type ReactNode } from 'react';

interface Props {
  /** Word-reveal mode: a single string, revealed word by word. */
  text?: string;
  /** Line-clip mode: explicit lines, each rising from behind a mask. */
  lines?: string[];
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  /** Words rendered in the accent color (case-insensitive, punctuation-trimmed). */
  accentWords?: string[];
  /** Per-word stagger (word mode). */
  staggerMs?: number;
  /** Per-line stagger (line mode). */
  lineStaggerMs?: number;
  /** Delay before the whole reveal starts (ms). */
  startDelayMs?: number;
  /** Show a "Replay" control (styleguide/demo only). */
  demo?: boolean;
}

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const normalize = (w: string) => w.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

export default function KineticHeading({
  text,
  lines,
  as = 'h2',
  className = '',
  accentWords = [],
  staggerMs = 70,
  lineStaggerMs = 130,
  startDelayMs = 0,
  demo = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const accentSet = new Set(accentWords.map(normalize));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const replay = () => {
    setShown(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
  };

  // Color accent words within a plain string.
  const withAccents = (line: string): ReactNode =>
    line.split(/(\s+)/).map((token, i) =>
      /^\s+$/.test(token) ? (
        token
      ) : accentSet.has(normalize(token)) ? (
        <span key={i} style={{ color: 'var(--accent)' }}>
          {token}
        </span>
      ) : (
        <span key={i}>{token}</span>
      )
    );

  let content: ReactNode;

  if (lines && lines.length > 0) {
    // Line-clip mode: each line rises from behind an overflow mask.
    content = lines.map((line, i) => (
      <span key={i} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.04em' }}>
        <span
          style={{
            display: 'block',
            willChange: 'transform',
            transition: `transform 0.9s ${EASE}`,
            transitionDelay: `${startDelayMs + i * lineStaggerMs}ms`,
            transform: shown ? 'translateY(0)' : 'translateY(115%)',
          }}
        >
          {withAccents(line)}
        </span>
      </span>
    ));
  } else {
    // Word mode.
    const words = (text ?? '').split(/(\s+)/);
    let wordIndex = 0;
    content = words.map((token, i) => {
      if (/^\s+$/.test(token)) return token;
      const idx = wordIndex++;
      const isAccent = accentSet.has(normalize(token));
      const style: CSSProperties = {
        display: 'inline-block',
        willChange: 'transform, opacity',
        transition: `transform 0.8s ${EASE}, opacity 0.8s ${EASE}`,
        transitionDelay: `${startDelayMs + idx * staggerMs}ms`,
        transform: shown ? 'translateY(0)' : 'translateY(0.5em)',
        opacity: shown ? 1 : 0,
        color: isAccent ? 'var(--accent)' : undefined,
      };
      return (
        <span key={i} style={style}>
          {token}
        </span>
      );
    });
  }

  const heading = createElement(
    as,
    { ref, className, style: lines ? undefined : { textWrap: 'balance' as const } },
    content
  );

  if (!demo) return heading;

  return (
    <div>
      {heading}
      <button
        type="button"
        onClick={replay}
        className="mt-4 font-mono text-xs text-accent underline underline-offset-4 transition-opacity hover:opacity-70"
      >
        ↺ Replay
      </button>
    </div>
  );
}
