import CopyButton from './copy-button.jsx';
import { buildEmbedTag } from '../../lib/embed.js';

export default function EmbedCard({ botId }) {
  const tag = buildEmbedTag(botId);
  if (!tag) {
    return (
      <p className="text-sm text-muted">
        Sign in to your API tenant to see the public bot id and embed tag.
      </p>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-base font-medium">Embed tag</h2>
          <p className="mt-1 text-sm text-muted">Add this one script tag to every page where the assistant should appear.</p>
        </div>
        <CopyButton text={tag} />
      </div>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-paper px-4 py-3 text-xs leading-relaxed">
        <code>{tag}</code>
      </pre>
      <p className="mt-3 text-xs text-faint">The public bot id is safe to publish; it carries no credential or tenant id.</p>
    </div>
  );
}
