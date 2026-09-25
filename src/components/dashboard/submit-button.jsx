'use client';

import { useFormStatus } from 'react-dom';

// Every dashboard mutation is a server action inside a form, so one pending-aware button gives the
// whole surface a loader without wiring each form to its own state.
export default function SubmitButton({ children, pendingLabel, className = '' }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {pending ? (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          aria-hidden="true"
        />
      ) : null}
      {pending && pendingLabel ? pendingLabel : children}
    </button>
  );
}
