import DashboardFrame from '../../../src/components/dashboard/frame.jsx';
import ErrorNotice from '../../../src/components/dashboard/error-notice.jsx';
import SuccessNotice from '../../../src/components/dashboard/success-notice.jsx';
import SubmitButton from '../../../src/components/dashboard/submit-button.jsx';
import { saveOrigins } from '../../../src/actions/origins.js';

export const dynamic = 'force-dynamic';

export default async function OriginsPage({ searchParams }) {
  const params = await searchParams;

  return (
    <DashboardFrame active="/dashboard/origins">
      {async (tenant) => {
        return (
          <div className="flex flex-col gap-8">
            <ErrorNotice searchParams={params} />
            <SuccessNotice searchParams={params} keyName="saved" message="The origin allowlist was saved." />
            <div>
              <h1 className="font-display text-3xl font-medium tracking-tight">Origins</h1>
              <p className="mt-2 text-sm text-muted">The exact origins allowed to embed this assistant. Unlisted sites are refused.</p>
            </div>
            <form action={saveOrigins} className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Allowed origins</span>
                <textarea
                  name="origins"
                  defaultValue={(tenant.origins ?? []).join('\n')}
                  placeholder="https://example.com"
                  required
                  rows={6}
                  spellCheck={false}
                  className="rounded-xl border border-line bg-surface px-4 py-2.5 font-mono text-sm outline-none transition-colors focus:border-accent"
                />
                <span className="text-xs text-faint">One origin per line, with no path or wildcard. At most 20.</span>
              </label>
              <SubmitButton pendingLabel="Saving…">Save origins</SubmitButton>
            </form>
          </div>
        );
      }}
    </DashboardFrame>
  );
}
