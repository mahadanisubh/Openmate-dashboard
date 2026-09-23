import Reveal from './reveal.jsx';

const CLAIMS = [
  {
    title: 'Your data isn’t sent to a third-party embedding service',
    body: 'Embeddings run locally, so your document text is never sent to a third-party embedding API.',
  },
  {
    title: 'Your stored documents are encrypted',
    body: 'Document text is encrypted with AES-256-GCM at rest.',
  },
];

function FlowNode({ label, muted, accent }) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 text-center text-sm font-medium ${
        accent
          ? 'border-accent/40 bg-accent-soft text-accent-hover'
          : muted
            ? 'border-white/10 bg-white/5 text-white/55'
            : 'border-white/15 bg-white/8 text-white'
      }`}
    >
      {label}
    </div>
  );
}

function Arrow({ label = '↓' }) {
  return (
    <div className="flex items-center justify-center py-1 text-white/30" aria-hidden="true">
      {label}
    </div>
  );
}

export default function ProofPrivacy() {
  return (
    <section id="proof" className="border-t border-line bg-ink-panel text-white">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">Proof, not hype</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Radically honest about how your data is handled
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            {CLAIMS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-xl font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-white/60">{c.body}</p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.16}>
              <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-6">
                <p className="text-sm font-semibold text-accent">The limitation we won&rsquo;t hide</p>
                <p className="mt-3 leading-relaxed text-white/70">
                  When an answer is generated, the relevant decrypted context is sent to the LLM provider configured for
                  your assistant. Encryption protects stored data; it does not encrypt that inference request.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-8">
              <p className="text-sm font-medium uppercase tracking-[0.14em] text-white/45">Blind Vectors</p>
              <div className="mt-6">
                <FlowNode label="Your document" />
                <Arrow />
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <FlowNode label="Encrypted document" muted />
                  <span className="text-lg text-accent" aria-hidden="true">
                    ∗
                  </span>
                  <FlowNode label="Searchable vector" />
                </div>
                <Arrow />
                <FlowNode label="Relevant result" accent />
              </div>
              <p className="mt-6 text-sm leading-relaxed text-white/60">
                OpenMate can search the knowledge base using vectors while stored document text remains encrypted.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
