import Reveal from './reveal.jsx';
import ScrollWeight from './scroll-weight.jsx';

const CASES = [
  {
    title: 'Answer everyday questions',
    body: 'Let customers get information without searching or waiting.',
    items: ['Hours', 'Pricing', 'Services', 'Policies', 'Locations', 'Availability'],
  },
  {
    title: 'Help customers decide',
    body: 'OpenMate explains your offerings and helps visitors understand which service or plan fits your needs.',
  },
  {
    title: 'Support visitors after hours',
    body: "Customers don't always arrive during business hours. OpenMate gives them somewhere useful to ask instead of leaving your website.",
  },
  {
    title: 'Reduce repetitive support work',
    body: 'OpenMate handles the repetitive first layer so your people can focus on conversations that actually need them.',
  },
];

export default function UseCases() {
  return (
    <section id="usecases" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <Reveal>
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          <span className="h-px w-8 bg-gradient-to-r from-accent to-mint" />
          Use cases
        </span>
      </Reveal>
      <Reveal delay={0.04}>
        <ScrollWeight from={500} to={800}>
          <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            What businesses actually use <span className="text-accent">OpenMate</span> for
          </h2>
        </ScrollWeight>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-7">
        {CASES.map((c, i) => (
          <Reveal key={c.title} delay={(i % 2) * 0.08}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_60px_-30px_rgba(15,122,90,0.55)]">
              <span
                className="absolute inset-x-0 -top-px h-px scale-x-0 bg-gradient-to-r from-accent to-mint transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden="true"
              />
              <div className="flex items-baseline gap-4">
                <span className="font-display text-3xl font-black leading-none tracking-tight text-accent/25 transition-colors duration-300 group-hover:text-accent/50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-xl font-semibold tracking-tight">{c.title}</h3>
              </div>
              <p className="mt-3 max-w-md leading-relaxed text-muted">{c.body}</p>
              {c.items && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {c.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-full bg-accent-soft/60 px-3 py-1 text-sm font-medium text-accent-hover ring-1 ring-accent/15 transition-colors duration-200 hover:bg-accent-soft"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
