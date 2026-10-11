const STATUS_TONE = {
  stored: 'text-mint',
  failed: 'text-berry',
  needsBackfill: 'text-sun',
};

const STATUS_LABEL = {
  stored: 'Stored',
  failed: 'Failed',
  needsBackfill: 'Needs reindex',
};

export default function DocumentList({ documents }) {
  if (!documents?.length) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-5">
        <p className="text-sm text-muted">No documents yet. Upload a PDF or text file to give the assistant something to answer from.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <table className="w-full text-left text-sm">
        <thead className="bg-paper text-faint">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium">Document</th>
            <th scope="col" className="px-4 py-3 font-medium">Pages</th>
            <th scope="col" className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.docId} className="border-t border-line">
              <td className="px-4 py-3 font-mono text-xs">{doc.docId}</td>
              <td className="px-4 py-3 text-muted">{doc.pages ?? '—'}</td>
              <td className={`px-4 py-3 ${STATUS_TONE[doc.status] ?? 'text-muted'}`}>
                {STATUS_LABEL[doc.status] ?? doc.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
