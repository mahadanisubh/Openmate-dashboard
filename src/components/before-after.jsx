import Reveal from './reveal.jsx';

const BEFORE = ['Has a question', 'Searches website', "Can't find answer", 'Sends a message', 'Waits'];
const AFTER = ['Has a question', 'Asks OpenMate', 'Gets an answer', 'Continues'];

function Flow({ steps, tone }) {
  const accent = tone === 'after';
  return (
    <ol className="flex flex-col gap-2">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-3">
          <span
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
              accent ? 'bg-accent text-white' : 'bg-ink/8 text-muted'
            }`}
          >
            {i + 1}
          </span>
          <span className={accent ? 'font-medium text-ink' : 'text-muted'}>{s}</span>
        </li>
      ))}
    </ol>
  );
}

export default function BeforeAfter() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">The difference</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          How it helps your business
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border border-line bg-surface p-8">
            <p className="text-sm font-medium uppercase tracking-wide text-faint">Before OpenMate</p>
            <div className="mt-6">
              <Flow steps={BEFORE} tone="before" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="h-full rounded-2xl border border-accent/30 bg-accent-soft/40 p-8">
            <p className="text-sm font-medium uppercase tracking-wide text-accent">With OpenMate</p>
            <div className="mt-6">
              <Flow steps={AFTER} tone="after" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
