import Reveal from './reveal.jsx';
import ScrollWeight from './scroll-weight.jsx';
import VectorField from './vector-field.jsx';

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

export default function ProofPrivacy() {
  return (
    <section id="proof" className="border-t border-line bg-ink-panel text-white">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <ScrollWeight from={400} to={600}>
            <h2 className="max-w-2xl font-display text-3xl leading-[1.12] tracking-tight sm:text-4xl">
              Radically honest about how your data is handled
            </h2>
          </ScrollWeight>
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
            <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.03] p-8">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-display text-lg font-medium tracking-tight">Blind Vectors</p>
                <span className="text-xs text-white/40">live</span>
              </div>

              {/* The field is the diagram: encrypted documents as idle dots, the query retrieving
               * its neighbours. The flow below names what is happening. */}
              <div className="relative mt-6 h-56">
                <VectorField
                  className="absolute inset-0 h-full w-full"
                  density={42}
                  neighbors={5}
                  dotColor="var(--color-mint)"
                  accentColor="var(--color-accent)"
                  idleColor="#8b8d84"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#10241d] to-transparent" aria-hidden="true" />
              </div>

              <ol className="mt-2 grid gap-2 text-sm">
                <li className="flex items-center gap-3 text-white/70">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[10px] font-medium text-white/55">1</span>
                  Your document is encrypted and embedded
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[10px] font-medium text-white/55">2</span>
                  Vectors stay searchable while the text stays encrypted
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent-soft text-[10px] font-medium text-accent-hover">3</span>
                  The query retrieves its nearest neighbours
                </li>
              </ol>

              <p className="mt-6 leading-relaxed text-white/60">
                OpenMate can search the knowledge base using vectors while stored document text remains encrypted.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
