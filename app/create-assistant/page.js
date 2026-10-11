import Link from 'next/link';
import { redirect } from 'next/navigation';

import CreateAssistantForm from '../../src/components/dashboard/create-assistant-form.jsx';
import { getTenant } from '../../src/lib/session.js';

export const dynamic = 'force-dynamic';

// The public entry point the marketing nav links to; `/dashboard/create-assistant` is the same form for a visitor already inside the dashboard.
export default async function CreateAssistantPage() {
  const tenant = await getTenant();
  if (tenant) redirect('/dashboard');

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-5 py-16">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink">
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M16 10H5M9 5l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to main site
      </Link>
      <Link href="/" className="mt-6 font-display text-lg font-medium tracking-tight">
        OpenMate
      </Link>
      <h1 className="mt-8 font-display text-3xl font-medium tracking-tight">Create assistant</h1>
      <p className="mt-3 text-sm text-muted">
        Register your platform to get a tenant key. You will use that key to sign in to the dashboard.
      </p>
      <div className="mt-8">
        <CreateAssistantForm googleEnabled={Boolean(process.env.GOOGLE_CLIENT_ID)} />
      </div>
      <p className="mt-6 text-sm text-muted">
        Already have an account?{' '}
        <Link href="/dashboard/sign-in" className="text-accent hover:underline">
          Sign in
        </Link>
      </p>
    </main>
  );
}
