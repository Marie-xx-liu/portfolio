import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import StatCounter from './StatCounter';
import type { Experience } from '../data/experiences';

interface Props {
  experiences: Experience[];
}

const EASE = [0.16, 1, 0.3, 1] as const;

/* Inline placeholder mirroring Placeholder.astro for use inside React. */
function LogoSlot({ id }: { id: string }) {
  return (
    <div
      className="grid h-16 w-16 shrink-0 place-items-center rounded-md border border-dashed border-line"
      style={{
        backgroundImage:
          'repeating-linear-gradient(135deg, transparent, transparent 9px, color-mix(in oklab, var(--ink) 5%, transparent) 9px, color-mix(in oklab, var(--ink) 5%, transparent) 10px)',
      }}
      role="img"
      aria-label={`Missing logo: ${id}`}
    >
      <span className="px-1 text-center font-mono text-[9px] leading-tight text-ink-muted">
        {id.replace(/[[\]]/g, '')}
      </span>
    </div>
  );
}

function Column({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink-muted">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();

  return (
    <li className="relative pl-8 md:pl-12">
      {/* Rail */}
      <span className="absolute left-0 top-0 h-full w-px bg-line" aria-hidden="true" />
      <span className="absolute left-[-4px] top-8 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />

      <div className="card mb-6 p-6 md:p-8">
        {/* Header (button toggles expand) */}
        <button
          type="button"
          className="group flex w-full items-start gap-5 text-left"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <LogoSlot id={exp.logoId} />
          <span className="flex-1">
            <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="font-display text-2xl leading-tight md:text-3xl">{exp.role}</span>
              <span className="font-mono text-xs text-ink-muted">
                {exp.dates} · {exp.location}
              </span>
            </span>
            <span className="mt-1 block font-mono text-sm text-accent">{exp.org}</span>
          </span>
          <span
            className={`mt-2 shrink-0 font-mono text-xs text-ink-muted transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          >
            ▾
          </span>
        </button>

        <p className="mt-5 max-w-[62ch] text-lg leading-relaxed">{exp.keyFeature}</p>

        {/* Stats */}
        <div className="mt-7 flex flex-wrap gap-x-12 gap-y-6">
          {exp.stats.map((s, i) => (
            <StatCounter
              key={i}
              value={s.value}
              valueTo={s.valueTo}
              prefix={s.prefix}
              suffix={s.suffix}
              decimals={s.decimals}
              label={s.label}
            />
          ))}
        </div>

        {/* Expandable detail */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              key="panel"
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduce ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="mt-8 grid gap-8 border-t border-line pt-8 md:grid-cols-3">
                <Column title="Responsibilities" items={exp.responsibilities} />
                <Column title="Projects" items={exp.projects} />
                <Column title="Outcomes" items={exp.outcomes} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer actions */}
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
          <button
            type="button"
            onClick={() => setModal(true)}
            className="link-underline font-mono text-sm text-ink"
          >
            Read the full story →
          </button>
          {!open && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="font-mono text-sm text-ink-muted underline-offset-4 hover:underline"
            >
              Responsibilities · Projects · Outcomes
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {modal && <ExperienceModal exp={exp} onClose={() => setModal(false)} index={index} />}
      </AnimatePresence>
    </li>
  );
}

function ExperienceModal({
  exp,
  onClose,
}: {
  exp: Experience;
  onClose: () => void;
  index: number;
}) {
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Focus trap + Esc + scroll lock.
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const node = dialogRef.current;
    const focusables = () =>
      node
        ? Array.from(
            node.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          )
        : [];
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const f = focusables();
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={reduce ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="card relative z-10 max-h-[88vh] w-full max-w-2xl overflow-auto rounded-b-none rounded-t-2xl sm:rounded-2xl"
        initial={reduce ? false : { y: 24, opacity: 0, scale: 0.99 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={reduce ? undefined : { y: 24, opacity: 0, scale: 0.99 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line p-6">
          <div>
            <h2 id={titleId} className="font-display text-2xl">
              {exp.role}
            </h2>
            <p className="mt-1 font-mono text-sm text-accent">{exp.org}</p>
            <p className="mt-1 font-mono text-xs text-ink-muted">
              {exp.dates} · {exp.location}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-full border border-line px-3 py-1 font-mono text-sm text-ink-muted transition-colors hover:border-ink hover:text-ink"
          >
            Esc ✕
          </button>
        </div>

        <div className="p-6">
          {/* Image placeholder */}
          <div
            className="grid aspect-video w-full place-items-center rounded-lg border border-dashed border-line"
            style={{
              backgroundImage:
                'repeating-linear-gradient(135deg, transparent, transparent 11px, color-mix(in oklab, var(--ink) 4%, transparent) 11px, color-mix(in oklab, var(--ink) 4%, transparent) 12px)',
            }}
            role="img"
            aria-label={`Missing image: ${exp.modalImageId}`}
          >
            <span className="font-mono text-xs text-ink-muted">{exp.modalImageId}</span>
          </div>

          <p className="mt-6 leading-relaxed text-ink-muted">{exp.modalText}</p>

          {exp.productAnchor && (
            <a
              href={`/product#${exp.productAnchor}`}
              className="btn btn-outline mt-8"
            >
              View full project in What I Did →
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ExperienceTimeline({ experiences }: Props) {
  return (
    <ol className="relative">
      {experiences.map((exp, i) => (
        <ExperienceCard key={exp.id} exp={exp} index={i} />
      ))}
    </ol>
  );
}
