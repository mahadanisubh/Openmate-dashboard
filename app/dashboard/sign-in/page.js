import Link from 'next/link';
import { redirect } from 'next/navigation';

import ErrorNotice from '../../../src/components/dashboard/error-notice.jsx';
import SubmitButton from '../../../src/components/dashboard/submit-button.jsx';
import GoogleButton from '../../../src/components/dashboard/google-button.jsx';
import { signIn, signInWithPassword } from '../../../src/actions/auth.js';
import { getTenant } from '../../../src/lib/session.js';

export const dynamic = 'force-dynamic';

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const tenant = await getTenant();
  if (tenant) redirect('/dashboard');
  const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID);

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-16">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink">
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M16 10H5M9 5l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to main site
      </Link>
      <Link href="/" className="mt-6 font-display text-lg font-medium tracking-tight">
        OpenMate
      </Link>
      <h1 className="mt-8 font-display text-3xl font-medium tracking-tight">Sign in</h1>
      <p className="mt-3 text-sm text-muted">
        Sign in with your email and password, continue with Google, or paste the tenant key from your
        Create Assistant step.
      </p>

      <ErrorNotice searchParams={params} />

      {/* Google first: the fastest path for a returning account. */}
      <div className="mt-8">
        <GoogleButton enabled={googleEnabled} />
      </div>

      <div className="my-6 flex items-center gap-3 text-xs text-faint">
        <span className="h-px flex-1 bg-line" />
        or
        <span className="h-px flex-1 bg-line" />
      </div>

      <form action={signInWithPassword} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@business.com"
            className="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Password</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Your password"
            className="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
          />
        </label>
        <SubmitButton pendingLabel="Signing in…">Sign in</SubmitButton>
      </form>

      <details className="mt-6 rounded-xl border border-line bg-surface px-4 py-3">
        <summary className="cursor-pointer text-sm font-medium text-muted">Use a tenant API key instead</summary>
        <form action={signIn} className="mt-4 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Tenant API key</span>
            <input
              name="apiKey"
              type="password"
              autoComplete="off"
              placeholder="om_live_…"
              className="rounded-xl border border-line bg-paper px-4 py-2.5 font-mono text-sm outline-none transition-colors focus:border-accent"
            />
          </label>
          <SubmitButton pendingLabel="Signing in…">Sign in with key</SubmitButton>
        </form>
      </details>

      <p className="mt-6 text-sm text-muted">
        No account yet?{' '}
        <Link href="/create-assistant" className="text-accent hover:underline">
          Create an assistant
        </Link>
      </p>
    </main>
  );
}
