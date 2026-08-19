import { useState, type FormEvent } from 'react';

interface Props {
  /** Formspree/Netlify endpoint. '#' = not configured yet (no real submit). */
  endpoint: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm({ endpoint }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const configured = endpoint && endpoint !== '#';

  const validate = (form: HTMLFormElement) => {
    const next: Record<string, string> = {};
    const title = (form.elements.namedItem('title') as HTMLInputElement)?.value.trim();
    const content = (form.elements.namedItem('content') as HTMLTextAreaElement)?.value.trim();
    const contact = (form.elements.namedItem('contact') as HTMLInputElement)?.value.trim();
    if (!title) next.title = 'Please add a subject.';
    if (!content || content.length < 10) next.content = 'A little more detail, please (10+ chars).';
    if (!contact) next.contact = 'How can I reach you?';
    return next;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Honeypot — bots fill this hidden field.
    if ((form.elements.namedItem('_gotcha') as HTMLInputElement)?.value) return;

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    if (!configured) {
      // PHASE: no endpoint yet — simulate success so the UX is reviewable.
      setStatus('success');
      form.reset();
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="card p-8" role="status">
        <p className="font-display text-2xl">Thank you — note received.</p>
        <p className="mt-2 text-ink-muted">
          {configured ? 'I’ll get back to you soon.' : 'Demo mode: no endpoint wired yet, so nothing was sent.'}
        </p>
        <button
          type="button"
          className="btn btn-outline mt-6"
          onClick={() => setStatus('idle')}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {!configured && (
        <p className="rounded-lg border border-line bg-bg-elev p-3 font-mono text-xs text-ink-muted">
          Note: form endpoint <code>[FORM-ENDPOINT]</code> not configured yet — submit runs in demo mode.
        </p>
      )}

      {/* Honeypot */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div>
        <label className="field-label" htmlFor="cf-title">Title</label>
        <input
          className="input"
          id="cf-title"
          name="title"
          aria-invalid={!!errors.title}
          placeholder="What’s this about?"
        />
        {errors.title && <p className="field-msg field-msg--error">{errors.title}</p>}
      </div>

      <div>
        <label className="field-label" htmlFor="cf-content">Content</label>
        <textarea
          className="input min-h-32 resize-y"
          id="cf-content"
          name="content"
          rows={6}
          aria-invalid={!!errors.content}
          placeholder="Your message…"
        />
        {errors.content && <p className="field-msg field-msg--error">{errors.content}</p>}
      </div>

      <div>
        <label className="field-label" htmlFor="cf-contact">Your contact</label>
        <input
          className="input"
          id="cf-contact"
          name="contact"
          aria-invalid={!!errors.contact}
          placeholder="Email or other"
        />
        {errors.contact && <p className="field-msg field-msg--error">{errors.contact}</p>}
      </div>

      {status === 'error' && (
        <p className="field-msg field-msg--error">Something went wrong — please email me directly.</p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send note →'}
      </button>
    </form>
  );
}
