'use client';

import { useState } from 'react';

import { sendContactMessage } from '../actions/contact.js';

// One choice of kind — Query or Suggestion — so a visitor need not pick a department they do not know exists.
const KINDS = [
  { value: 'query', label: 'Query', hint: 'A question about OpenMate' },
  { value: 'suggestion', label: 'Suggestion', hint: 'An idea or improvement' },
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [kind, setKind] = useState('query');

  async function onSubmit(event) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      const result = await sendContactMessage(new FormData(event.currentTarget));
      if (result.ok) setSent(true);
      else setError(result.error);
    } catch {
      setError('Your message could not be sent. Please try again.');
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent-soft/40 p-7">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-white">
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 10.5 8 14l8-8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h2 className="font-display text-xl font-semibold tracking-tight">Thank you</h2>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Your message has reached us and we will get back to you at the email you provided.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-7">
      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium">This is a</legend>
        <div className="grid grid-cols-2 gap-2">
          {KINDS.map((k) => {
            const active = kind === k.value;
            return (
              <label
                key={k.value}
                className={`flex cursor-pointer flex-col gap-0.5 rounded-xl border px-4 py-3 text-sm transition-colors ${
                  active ? 'border-accent bg-accent-soft/50 text-ink' : 'border-line bg-paper text-muted hover:border-line-strong'
                }`}
              >
                <input
                  type="radio"
                  name="kind"
                  value={k.value}
                  checked={active}
                  onChange={() => setKind(k.value)}
                  className="sr-only"
                />
                <span className="font-medium">{k.label}</span>
                <span className="text-xs text-faint">{k.hint}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Your name</span>
        <input
          name="name"
          required
          maxLength={80}
          placeholder="Your name"
          className="rounded-xl border border-line bg-paper px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Email</span>
        <input
          name="email"
          type="email"
          required
          placeholder="you@business.com"
          className="rounded-xl border border-line bg-paper px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">
          {kind === 'suggestion' ? 'Your suggestion' : 'Your query'}
        </span>
        <textarea
          name="message"
          required
          rows={6}
          maxLength={4000}
          placeholder={kind === 'suggestion' ? 'Tell us what we could do better…' : 'Ask us anything…'}
          className="resize-y rounded-xl border border-line bg-paper px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
        />
      </label>

      {error ? (
        <p className="rounded-xl border border-berry/40 bg-berry-soft px-4 py-3 text-sm text-berry">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-mint px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_-14px_rgba(15,122,90,0.9)] transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" /> : null}
        {pending ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
