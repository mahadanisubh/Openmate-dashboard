'use client';

import { useState } from 'react';

// Starts the Google OAuth flow. When the deployment has no client id the button is disabled with an
// honest note rather than redirecting into a dead end.
export default function GoogleButton({ enabled }) {
  const [busy, setBusy] = useState(false);

  return (
    <div>
      <button
        type="button"
        disabled={!enabled || busy}
        aria-busy={busy}
        onClick={() => {
          setBusy(true);
          window.location.href = '/api/auth/google';
        }}
        className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-line-strong bg-white px-4 py-3 text-sm font-semibold text-ink shadow-[0_2px_10px_-4px_rgba(31,26,20,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-[0_8px_20px_-8px_rgba(31,26,20,0.4)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path fill="#4285F4" d="M21.35 11.1H12v2.9h5.35c-.23 1.5-1.74 4.4-5.35 4.4a5.4 5.4 0 0 1 0-10.8c1.53 0 2.56.65 3.15 1.21l2.15-2.07A8.8 8.8 0 0 0 12 4a9 9 0 1 0 0 18c5.2 0 8.63-3.65 8.63-8.8 0-.59-.07-1.04-.28-1.1z" />
        </svg>
        {busy ? 'Redirecting…' : 'Continue with Google'}
      </button>
      {!enabled ? (
        <p className="mt-2 text-xs text-faint">
          Google sign-in activates once GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are configured.
        </p>
      ) : null}
    </div>
  );
}
