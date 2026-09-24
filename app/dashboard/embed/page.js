import DashboardFrame from '../../../src/components/dashboard/frame.jsx';
import EmbedCard from '../../../src/components/dashboard/embed-card.jsx';

export const dynamic = 'force-dynamic';

export default async function EmbedPage() {
  return (
    <DashboardFrame active="/dashboard/embed">
      {async (tenant) => (
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-display text-3xl font-medium tracking-tight">Embed tag</h1>
            <p className="mt-2 text-sm text-muted">One script tag on every page where the assistant should appear.</p>
          </div>
          <EmbedCard botId={tenant.botId} />
          <div className="rounded-2xl border border-line bg-surface p-5">
            <h2 className="font-display text-base font-medium">Before it works</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-muted">
              <li>Add at least one origin on the origins page.</li>
              <li>Upload at least one document so the assistant has something to answer from.</li>
              <li>Publish the page and open it from a registered origin.</li>
            </ol>
          </div>
        </div>
      )}
    </DashboardFrame>
  );
}
