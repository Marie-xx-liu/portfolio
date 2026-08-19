import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

/**
 * Flips data-theme on <html> and persists the choice.
 * Used on /styleguide for the live theme switch; reusable in nav later.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const current = (document.documentElement.getAttribute('data-theme') as Theme) || 'light';
    setTheme(current);
  }, []);

  const apply = (next: Theme) => {
    document.documentElement.setAttribute('data-theme', next);
    setTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-line bg-bg-elev p-1">
      {(['light', 'dark'] as Theme[]).map((t) => (
        <button
          key={t}
          type="button"
          aria-pressed={theme === t}
          onClick={() => apply(t)}
          className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
            theme === t ? 'bg-accent text-accent-contrast' : 'text-ink-muted hover:text-ink'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
