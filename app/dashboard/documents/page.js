import DashboardFrame from '../../../src/components/dashboard/frame.jsx';
import DocumentList from '../../../src/components/dashboard/document-list.jsx';
import ErrorNotice from '../../../src/components/dashboard/error-notice.jsx';
import SuccessNotice from '../../../src/components/dashboard/success-notice.jsx';
import SubmitButton from '../../../src/components/dashboard/submit-button.jsx';
import { apiGet } from '../../../src/lib/api-client.js';
import { getApiKey } from '../../../src/lib/session.js';
import { uploadDocument } from '../../../src/actions/documents.js';

export const dynamic = 'force-dynamic';

export default async function DocumentsPage({ searchParams }) {
  const params = await searchParams;

  return (
    <DashboardFrame active="/dashboard/documents">
      {async () => {
        const apiKey = await getApiKey();
        const res = await apiGet('/tenants/me/documents', apiKey);

        return (
          <div className="flex flex-col gap-8">
            <ErrorNotice searchParams={params} />
            <SuccessNotice searchParams={params} keyName="uploaded" message="The document was uploaded and indexed." />
            <div>
              <h1 className="font-display text-3xl font-medium tracking-tight">Documents</h1>
              <p className="mt-2 text-sm text-muted">Upload the knowledge the assistant answers from. PDF and plain text are supported.</p>
            </div>
            <form action={uploadDocument} className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Document</span>
                <input
                  name="file"
                  type="file"
                  accept=".pdf,.txt,application/pdf,text/plain"
                  required
                  className="text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-accent-soft file:px-4 file:py-2 file:text-sm file:font-medium file:text-ink"
                />
              </label>
              <span className="text-xs text-faint">The upload limit is 10 MB and, on the free tier, five pages per PDF.</span>
              <SubmitButton pendingLabel="Uploading and embedding…">Upload document</SubmitButton>
            </form>
            {res.ok && res.data ? (
              <DocumentList documents={res.data.documents} />
            ) : (
              <p className="text-sm text-muted">Documents are unavailable right now.</p>
            )}
          </div>
        );
      }}
    </DashboardFrame>
  );
}
