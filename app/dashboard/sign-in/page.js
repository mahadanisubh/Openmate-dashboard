import Link from 'next/link';
import { redirect } from 'next/navigation';

import ErrorNotice from '../../../src/components/dashboard/error-notice.jsx';
import SubmitButton from '../../../src/components/dashboard/submit-button.jsx';
import { signIn } from '../../../src/actions/auth.js';
import { getTenant } from '../../../src/lib/session.js';

export const dynamic = 'force-dynamic';

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const tenant = await getTenant();
  if (tenant) redirect('/dashboard');

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-16">
      <Link href="/" className="font-display text-lg font-medium tracking-tight">
        OpenMate
      </Link>
      <h1 className="mt-8 font-display text-3xl font-medium tracking-tight">Sign in</h1>
      <p className="mt-3 text-sm text-muted">
        Use the tenant API key printed by <code className="font-mono text-xs">npm run seed:tenant</code>. The key is stored only in a
        secure cookie and is never sent to the browser.
      </p>
      <form action={signIn} className="mt-8 flex flex-col gap-5">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Tenant API key</span>
          <input
            name="apiKey"
            type="password"
            autoComplete="current-password"
            required
            placeholder="om_live_…"
            className="rounded-xl border border-line bg-surface px-4 py-2.5 font-mono text-sm outline-none transition-colors focus:border-accent"
          />
        </label>
        <ErrorNotice searchParams={params} />
        <SubmitButton pendingLabel="Signing in…">Sign in</SubmitButton>
      </form>
      <p className="mt-6 text-sm text-muted">
        No key yet?{' '}
        <Link href="/dashboard/create-assistant" className="text-accent hover:underline">
          Create an assistant
        </Link>
      </p>
    </main>
  );
}
