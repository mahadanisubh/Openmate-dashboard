import Reveal from './reveal.jsx';

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
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">What it&rsquo;s for</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          What businesses actually use OpenMate for
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
        {CASES.map((c, i) => (
          <Reveal key={c.title} delay={(i % 2) * 0.08}>
            <div className="border-t border-line pt-6">
              <span className="text-sm font-medium text-faint">0{i + 1}</span>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted">{c.body}</p>
              {c.items && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {c.items.map((it) => (
                    <li key={it} className="rounded-full bg-surface px-3 py-1 text-sm text-ink ring-1 ring-line">
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
