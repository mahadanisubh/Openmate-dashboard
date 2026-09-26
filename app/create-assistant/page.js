import Link from 'next/link';
import { redirect } from 'next/navigation';

import CreateAssistantForm from '../../src/components/dashboard/create-assistant-form.jsx';
import { getTenant } from '../../src/lib/session.js';

export const dynamic = 'force-dynamic';

// The public entry point the marketing nav links to. `/dashboard/create-assistant` remains for a
// signed-out visitor who lands inside the dashboard; both render the same form.
export default async function CreateAssistantPage() {
  const tenant = await getTenant();
  if (tenant) redirect('/dashboard');

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-5 py-16">
      <Link href="/" className="font-display text-lg font-medium tracking-tight">
        OpenMate
      </Link>
      <h1 className="mt-8 font-display text-3xl font-medium tracking-tight">Create assistant</h1>
      <p className="mt-3 text-sm text-muted">
        Register your platform to get a tenant key. You will use that key to sign in to the dashboard.
      </p>
      <div className="mt-8">
        <CreateAssistantForm />
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
