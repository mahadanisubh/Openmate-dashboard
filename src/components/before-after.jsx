import Reveal from './reveal.jsx';
import ScrollWeight from './scroll-weight.jsx';

// The two lists share a shape on purpose so the difference reads as friction removed, not more steps added.
const BEFORE = [
  { label: 'Has a question', note: 'the visitor arrives with intent' },
  { label: 'Searches your website', note: 'hunting pages for an answer' },
  { label: 'Comes up empty', note: 'the answer was never written down' },
  { label: 'Sends a message', note: 'now waiting on a reply' },
  { label: 'Waits', note: 'possibly until tomorrow' },
];
const AFTER = [
  { label: 'Has a question', note: 'the same intent, unchanged' },
  { label: 'Asks OpenMate', note: 'right where they already are' },
  { label: 'Gets an answer', note: 'from your own knowledge base' },
  { label: 'Continues', note: 'booked, decided, on their way' },
];

function Flow({ steps, tone }) {
  const accent = tone === 'after';
  return (
    <ol className="relative flex flex-col">
      {/* One rail joins the markers, so the list reads as a single path rather than a list. */}
      <span
        className={`absolute bottom-[20px] left-3 top-[20px] w-px ${accent ? 'bg-accent/30' : 'bg-line-strong'}`}
        aria-hidden="true"
      />
      {steps.map((s, i) => (
        <li key={s.label} className="relative flex items-start gap-4 py-2.5">
          <span
            className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
              accent ? 'bg-accent text-white' : 'bg-surface text-faint ring-1 ring-line-strong'
            }`}
          >
            {i + 1}
          </span>
          <span className="pt-0.5">
            <span className={`block ${accent ? 'font-medium text-ink' : 'text-muted'}`}>{s.label}</span>
            <span className={`mt-0.5 block text-sm ${accent ? 'text-accent-hover/80' : 'text-faint'}`}>
              {s.note}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}

export default function BeforeAfter() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <Reveal>
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-berry">
          <span className="h-px w-8 bg-gradient-to-r from-berry to-sun" />
          The difference
        </span>
      </Reveal>
      <Reveal delay={0.04}>
        <ScrollWeight from={500} to={800}>
          <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            How it helps your business
          </h2>
        </ScrollWeight>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
        <Reveal>
          <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_-32px_rgba(31,26,20,0.5)] sm:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-display text-lg font-semibold tracking-tight text-muted">Before OpenMate</p>
              <span className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-faint ring-1 ring-line">
                {BEFORE.length} steps
              </span>
            </div>
            <div className="mt-7 flex-1">
              <Flow steps={BEFORE} tone="before" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex h-full flex-col rounded-2xl border border-accent/30 bg-gradient-to-br from-accent-soft/70 to-mint-soft/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_-30px_rgba(15,122,90,0.6)] sm:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-display text-lg font-semibold tracking-tight text-accent-hover">With OpenMate</p>
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                {AFTER.length} steps
              </span>
            </div>
            <div className="mt-7 flex-1">
              <Flow steps={AFTER} tone="after" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
