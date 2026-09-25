import DashboardFrame from '../../src/components/dashboard/frame.jsx';
import EmbedCard from '../../src/components/dashboard/embed-card.jsx';
import ErrorNotice from '../../src/components/dashboard/error-notice.jsx';
import QuotaBar from '../../src/components/dashboard/quota-bar.jsx';
import { apiGet } from '../../src/lib/api-client.js';
import { getApiKey } from '../../src/lib/session.js';

export const dynamic = 'force-dynamic';

export default async function DashboardPage({ searchParams }) {
  const params = await searchParams;

  return (
    <DashboardFrame active="/dashboard">
      {async (tenant) => {
        const apiKey = await getApiKey();
        const usage = await apiGet('/tenants/me/usage', apiKey);
        const documents = await apiGet('/tenants/me/documents', apiKey);

        return (
          <div className="flex flex-col gap-8">
            <ErrorNotice searchParams={params} />
            <div>
              <h1 className="font-display text-3xl font-medium tracking-tight">Overview</h1>
              <p className="mt-2 text-sm text-muted">Everything the assistant needs: documents, appearance, origins, webhooks, and the embed tag.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-surface p-5">
                <h2 className="font-display text-base font-medium">Tenant</h2>
                <dl className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
                  <dt className="text-faint">Tier</dt>
                  <dd>{tenant.tier}</dd>
                  <dt className="text-faint">Bot id</dt>
                  <dd className="truncate font-mono text-xs">{tenant.botId ?? '—'}</dd>
                  <dt className="text-faint">Origins</dt>
                  <dd>{tenant.origins?.length ?? 0}</dd>
                  <dt className="text-faint">Webhook</dt>
                  <dd className="truncate">{tenant.webhookUrl ?? 'Not configured'}</dd>
                </dl>
              </div>
              <div className="rounded-2xl border border-line bg-surface p-5">
                <h2 className="font-display text-base font-medium">Usage</h2>
                {usage.ok && usage.data ? (
                  <div className="mt-4 flex flex-col gap-5">
                    <QuotaBar
                      used={usage.data.conversations.used}
                      cap={usage.data.conversations.cap}
                      label="Monthly chat turns"
                      note="Each accepted chat turn counts as one."
                    />
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-muted">Usage is unavailable right now.</p>
                )}
              </div>
            </div>
            <EmbedCard botId={tenant.botId} />
            <div className="rounded-2xl border border-line bg-surface p-5">
              <h2 className="font-display text-base font-medium">Recent documents</h2>
              {documents.ok && documents.data?.documents?.length ? (
                <ul className="mt-3 flex flex-col gap-2 text-sm">
                  {documents.data.documents.slice(0, 5).map((doc) => (
                    <li key={doc.docId} className="flex items-center justify-between gap-3">
                      <span className="truncate font-mono text-xs">{doc.docId}</span>
                      <span className="text-faint">{doc.status}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-muted">No documents yet.</p>
              )}
            </div>
          </div>
        );
      }}
    </DashboardFrame>
  );
}
