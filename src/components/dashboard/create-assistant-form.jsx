'use client';

import Link from 'next/link';
import { useState } from 'react';

import { registerTenant } from '../../actions/register.js';
import CopyButton from './copy-button.jsx';

// Client-owned because the returned key must be revealed once, in place; a server redirect would lose it or persist it before the user copies it.
export default function CreateAssistantForm({ googleEnabled = false }) {
  const [created, setCreated] = useState(null);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      const result = await registerTenant(new FormData(event.currentTarget));
      if (result.ok) setCreated(result.tenant);
      else setError(result.error);
    } catch {
      setError('The assistant could not be created. Please try again.');
    } finally {
      setPending(false);
    }
  }

  if (created) {
    return (
      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-6">
        <div>
          <h2 className="font-display text-xl font-medium tracking-tight">Your assistant is created</h2>
          <p className="mt-2 text-sm text-muted">
            Copy your tenant key now and store it safely. It is shown only once and cannot be recovered.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3">
          <code className="min-w-0 flex-1 truncate font-mono text-xs">{created.apiKey}</code>
          <CopyButton text={created.apiKey} label="Copy key" />
        </div>

        <div className="rounded-xl border border-line bg-paper px-4 py-3 text-sm">
          <span className="text-faint">Bot id (public, for the embed tag): </span>
          <code className="font-mono text-xs">{created.botId}</code>
        </div>

        <Link
          href="/dashboard/sign-in"
          className="inline-flex w-fit rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-6">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Platform name</span>
        <span className="text-xs text-faint">Where the assistant will be used, e.g. your website or business name.</span>
        <input
          name="platformName"
          required
          maxLength={80}
          placeholder="Acme Dental"
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
        <span className="text-sm font-medium">Password</span>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="At least 8 characters"
          className="rounded-xl border border-line bg-paper px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Website origin (optional)</span>
        <span className="text-xs text-faint">The exact origin you will embed the bot on, e.g. https://acme.com.</span>
        <input
          name="origin"
          placeholder="https://acme.com"
          className="rounded-xl border border-line bg-paper px-4 py-2.5 font-mono text-sm outline-none transition-colors focus:border-accent"
        />
      </label>

      {error ? (
        <p className="rounded-xl border border-berry/40 bg-berry-soft px-4 py-3 text-sm text-berry">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" /> : null}
        {pending ? 'Creating…' : 'Create assistant'}
      </button>

      <div className="flex items-center gap-3 text-xs text-faint">
        <span className="h-px flex-1 bg-line" />
        or
        <span className="h-px flex-1 bg-line" />
      </div>

      <button
        type="button"
        disabled={!googleEnabled}
        title={googleEnabled ? 'Continue with Google' : 'Google sign-in is not configured on this deployment'}
        onClick={() => {
          if (googleEnabled) window.location.href = '/api/auth/google';
        }}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong bg-white px-5 py-3 text-sm font-semibold text-ink shadow-[0_2px_10px_-4px_rgba(31,26,20,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path fill="#4285F4" d="M21.35 11.1H12v2.9h5.35c-.23 1.5-1.74 4.4-5.35 4.4a5.4 5.4 0 0 1 0-10.8c1.53 0 2.56.65 3.15 1.21l2.15-2.07A8.8 8.8 0 0 0 12 4a9 9 0 1 0 0 18c5.2 0 8.63-3.65 8.63-8.8 0-.59-.07-1.04-.28-1.1z" />
        </svg>
        Continue with Google
      </button>
      {!googleEnabled ? (
        <p className="text-xs text-faint">
          Google sign-in becomes available once the deployment is configured with OAuth credentials.
        </p>
      ) : null}
    </form>
  );
}
