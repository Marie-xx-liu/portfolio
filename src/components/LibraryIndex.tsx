import { useMemo, useState } from 'react';
import type { LibraryEntry } from '../data/library';

interface Props {
  entries: LibraryEntry[];
}

/* ---------- Definitions ---------- */
const LAYERS: { value: string; label: string; sub?: string }[] = [
  { value: '1', label: 'Philosophy', sub: 'Why' },
  { value: '2', label: 'Decision' },
  { value: '3', label: 'AI-Native' },
  { value: '4', label: 'Execution' },
  { value: 'null', label: 'Resources' },
];

const MATURITIES: { value: LibraryEntry['maturity']; label: string }[] = [
  { value: 'consensus', label: 'Consensus' },
  { value: 'emerging', label: 'Emerging' },
  { value: 'synthesis', label: 'Synthesis' },
];

const layerKey = (l: LibraryEntry['layer']) => (l === null ? 'null' : String(l));
const layerLabel = (l: LibraryEntry['layer']) =>
  LAYERS.find((x) => x.value === layerKey(l))?.label ?? 'Resources';

/* ---------- Render-rule helpers (spec §13.3) ---------- */
function stripMock(note: string): { text: string; isDraft: boolean } {
  // note may begin with a fullwidth "MOCK｜" (or ascii "MOCK|") placeholder marker.
  const m = note.match(/^MOCK[｜|]\s*/);
  if (m) return { text: note.slice(m[0].length), isDraft: true };
  return { text: note, isDraft: false };
}
const isRealUrl = (s?: string) => !!s && /^https?:\/\//i.test(s);

/* ---------- Maturity pill (spec §13.4) ---------- */
function MaturityPill({ maturity }: { maturity: LibraryEntry['maturity'] }) {
  const styles: Record<LibraryEntry['maturity'], string> = {
    consensus: 'border-ink-muted/50 text-ink-muted',
    emerging: 'border-accent-2 text-accent-2',
    synthesis: 'border-accent text-accent',
  };
  const label = { consensus: 'Consensus', emerging: 'Emerging', synthesis: 'Synthesis' }[maturity];
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] ${styles[maturity]}`}
    >
      {label}
    </span>
  );
}

/* ---------- Filter chip ---------- */
function Chip({
  active,
  onClick,
  children,
  count,
  tone = 'neutral',
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count?: number;
  tone?: 'neutral' | 'consensus' | 'emerging' | 'synthesis';
}) {
  // Selected state stays neutral (ink) so the gold accent remains reserved
  // for "synthesis = Marie's voice". Maturity chips carry a subtle tone dot.
  const toneDot: Record<string, string> = {
    neutral: '',
    consensus: 'before:bg-ink-muted',
    emerging: 'before:bg-accent-2',
    synthesis: 'before:bg-accent',
  };
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
        tone !== 'neutral'
          ? `before:h-1.5 before:w-1.5 before:rounded-full before:content-[''] ${toneDot[tone]}`
          : ''
      } ${
        active
          ? 'border-ink bg-ink/[0.06] text-ink'
          : 'border-line text-ink-muted hover:border-ink/40 hover:text-ink'
      }`}
    >
      {children}
      {count !== undefined && <span className="text-ink-muted/70">{count}</span>}
    </button>
  );
}

/* ---------- Card ---------- */
function LibraryCard({
  entry,
  expanded,
  onToggle,
  onRelatedClick,
}: {
  entry: LibraryEntry;
  expanded: boolean;
  onToggle: () => void;
  onRelatedClick: (id: string) => void;
}) {
  const { text: noteText, isDraft } = stripMock(entry.note);
  const showLink = isRealUrl(entry.source);

  return (
    <article className="card library-card relative flex flex-col p-6">
      {/* External link (only for real URLs) — outside the toggle button */}
      {showLink && (
        <a
          href={entry.source}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-5 top-5 z-10 font-mono text-xs text-ink-muted transition-colors hover:text-accent"
          aria-label={`Open source: ${entry.sourceName ?? entry.title}`}
          onClick={(e) => e.stopPropagation()}
        >
          ↗
        </a>
      )}

      {/* Summary — toggles expand */}
      <button
        type="button"
        className="flex flex-1 flex-col items-start text-left"
        aria-expanded={expanded}
        onClick={onToggle}
      >
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
            {layerLabel(entry.layer)}
          </span>
          <MaturityPill maturity={entry.maturity} />
          {isDraft && (
            <span
              className="inline-flex items-center gap-1 font-mono text-[10px] text-ink-muted/70"
              title="Draft note — placeholder, to be replaced"
            >
              <span className="h-1 w-1 rounded-full bg-ink-muted/50" />
              draft note
            </span>
          )}
        </div>

        <h3 className="font-display text-xl leading-tight">{entry.title}</h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted/80">
          {entry.type}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-ink">{entry.problem}</p>

        {noteText && (
          <p
            className={`mt-3 text-sm leading-relaxed text-ink-muted ${
              expanded ? '' : 'line-clamp-3'
            }`}
          >
            {noteText}
          </p>
        )}

        <span className="mt-4 font-mono text-[11px] text-ink-muted/70">
          {expanded ? '− Less' : '+ Details'}
        </span>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="mt-5 space-y-4 border-t border-line pt-5">
          {entry.relation && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">Relation</p>
              <p className="mt-1 text-sm text-ink-muted">{entry.relation}</p>
            </div>
          )}

          {entry.relatedTo.length > 0 && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">Related</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {entry.relatedTo.map((rid) => (
                  <button
                    key={rid}
                    type="button"
                    onClick={() => onRelatedClick(rid)}
                    className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-ink-muted transition-colors hover:border-ink/40 hover:text-ink"
                  >
                    {rid}
                  </button>
                ))}
              </div>
            </div>
          )}

          {entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {entry.tags.map((t) => (
                <span key={t} className="font-mono text-[11px] text-ink-muted/70">
                  #{t}
                </span>
              ))}
            </div>
          )}

          {entry.sourceName && (
            <p className="font-mono text-[11px] text-ink-muted">
              Source:{' '}
              {isRealUrl(entry.source) ? (
                <a
                  href={entry.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline underline-offset-2 hover:text-accent"
                >
                  {entry.sourceName} ↗
                </a>
              ) : (
                <span>{entry.sourceName}</span>
              )}
            </p>
          )}
        </div>
      )}
    </article>
  );
}

/* ---------- Main island ---------- */
export default function LibraryIndex({ entries }: Props) {
  const [query, setQuery] = useState('');
  const [layers, setLayers] = useState<Set<string>>(new Set());
  const [mats, setMats] = useState<Set<string>>(new Set());
  const [types, setTypes] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Type chips: only those present in the data (spec §13.2).
  const typeValues = useMemo(
    () => Array.from(new Set(entries.map((e) => e.type))).sort(),
    [entries]
  );
  // Layer chips: drop Resources unless layer:null entries exist.
  const layerDefs = useMemo(
    () => LAYERS.filter((l) => l.value !== 'null' || entries.some((e) => e.layer === null)),
    [entries]
  );

  const counts = useMemo(() => {
    const c = { layer: {} as Record<string, number>, mat: {} as Record<string, number>, type: {} as Record<string, number> };
    for (const e of entries) {
      const lk = layerKey(e.layer);
      c.layer[lk] = (c.layer[lk] ?? 0) + 1;
      c.mat[e.maturity] = (c.mat[e.maturity] ?? 0) + 1;
      c.type[e.type] = (c.type[e.type] ?? 0) + 1;
    }
    return c;
  }, [entries]);

  const q = query.trim().toLowerCase().replace(/\s+/g, ' ');

  const results = useMemo(() => {
    return entries.filter((e) => {
      if (layers.size && !layers.has(layerKey(e.layer))) return false;
      if (mats.size && !mats.has(e.maturity)) return false;
      if (types.size && !types.has(e.type)) return false;
      if (q) {
        const hay = [
          e.title,
          e.problem,
          stripMock(e.note).text,
          e.tags.join(' '),
          e.sourceName ?? '',
        ]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [entries, layers, mats, types, q]);

  const anyFilter = layers.size > 0 || mats.size > 0 || types.size > 0 || query.length > 0;

  const toggle = (set: Set<string>, setter: (s: Set<string>) => void, value: string) => {
    const next = new Set(set);
    next.has(value) ? next.delete(value) : next.add(value);
    setter(next);
  };
  const clearAll = () => {
    setQuery('');
    setLayers(new Set());
    setMats(new Set());
    setTypes(new Set());
  };
  // Clicking a "related" chip focuses that single entry.
  const focusRelated = (id: string) => {
    const target = entries.find((e) => e.id === id);
    if (!target) return;
    clearAll();
    setQuery(target.title);
    setExpandedId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Sticky toolbar: search + filters */}
      <div className="sticky top-16 z-30 -mx-[var(--pad)] mb-10 border-y border-line bg-bg/85 px-[var(--pad)] py-5 backdrop-blur [--pad:clamp(1.25rem,5vw,4rem)]">
        {/* View toggle (Phase 2 mount point) + search */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-ink-muted">View</span>
            <span className="rounded-full bg-ink/[0.06] px-3 py-1 text-ink">List</span>
            {/* PHASE 2: KnowledgeMap mount point */}
            <span
              className="cursor-not-allowed rounded-full px-3 py-1 text-ink-muted/50"
              title="Knowledge map — coming soon"
              aria-disabled="true"
            >
              Map
            </span>
          </div>
          <label className="relative flex-1 sm:max-w-xs">
            <span className="sr-only">Search the library</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search frameworks, ideas, authors…"
              className="input !py-2 !text-sm"
            />
          </label>
        </div>

        {/* Filter groups */}
        <div className="mt-4 flex flex-col gap-3">
          <FilterGroup label="Layer">
            {layerDefs.map((l) => (
              <Chip
                key={l.value}
                active={layers.has(l.value)}
                onClick={() => toggle(layers, setLayers, l.value)}
                count={counts.layer[l.value] ?? 0}
              >
                {l.label}
                {l.sub && <span className="text-ink-muted/60"> ({l.sub})</span>}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Maturity" legend>
            {MATURITIES.map((m) => (
              <Chip
                key={m.value}
                active={mats.has(m.value)}
                onClick={() => toggle(mats, setMats, m.value)}
                count={counts.mat[m.value] ?? 0}
                tone={m.value}
              >
                {m.label}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Type">
            {typeValues.map((t) => (
              <Chip
                key={t}
                active={types.has(t)}
                onClick={() => toggle(types, setTypes, t)}
                count={counts.type[t] ?? 0}
              >
                {t}
              </Chip>
            ))}
          </FilterGroup>

          <div className="flex items-center gap-4 pt-1">
            <span className="font-mono text-xs text-ink-muted">
              {results.length} {results.length === 1 ? 'entry' : 'entries'}
            </span>
            {anyFilter && (
              <button
                type="button"
                onClick={clearAll}
                className="font-mono text-xs text-accent underline underline-offset-4 hover:opacity-70"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="card flex flex-col items-center gap-4 p-16 text-center">
          <p className="font-display text-2xl">No matches</p>
          <p className="max-w-[40ch] text-ink-muted">
            Nothing fits those filters. Try broadening the search or clearing them.
          </p>
          <button type="button" onClick={clearAll} className="btn btn-outline">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((entry) => (
            <LibraryCard
              key={entry.id}
              entry={entry}
              expanded={expandedId === entry.id}
              onToggle={() => setExpandedId((id) => (id === entry.id ? null : entry.id))}
              onRelatedClick={focusRelated}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Filter group wrapper + legend ---------- */
function FilterGroup({
  label,
  legend = false,
  children,
}: {
  label: string;
  legend?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="w-16 shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </span>
      {children}
      {legend && (
        <span className="ml-1 hidden items-center gap-3 font-mono text-[10px] text-ink-muted/70 lg:inline-flex">
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> = my synthesis
          </span>
        </span>
      )}
    </div>
  );
}
