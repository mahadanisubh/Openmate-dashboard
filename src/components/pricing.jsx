import Reveal from './reveal.jsx';

const PLANS = [
  {
    name: 'Community',
    price: 'Free',
    note: 'For developers who want to self-host.',
    features: ['Open source', 'MIT licensed', 'Self-hostable', 'Core OpenMate experience'],
    cta: 'View on GitHub',
  },
  {
    name: 'Cloud Free',
    price: '$0',
    note: 'For trying OpenMate on a real website.',
    features: ['15 chunks', 'Up to 5 pages', '500 conversations / month', '30 requests / minute', 'OpenMate branding'],
    cta: 'Start free',
  },
  {
    name: 'Pro',
    price: '$19',
    unit: '/month',
    note: 'For businesses that want more room.',
    features: [
      '150 chunks',
      'Unlimited conversations',
      '120 requests / minute',
      'Remove OpenMate branding',
      'More customization',
    ],
    cta: 'Choose Pro',
    highlight: true,
  },
  {
    name: 'Agency / Enterprise',
    price: '$79',
    unit: '/month',
    note: 'For teams managing multiple businesses.',
    features: ['Multi-tenant use', 'Agency workflows', 'White-label experience', 'Higher limits', 'Client-oriented deployment'],
    cta: 'Talk to us',
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">Pricing</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          Clear quotas. No urgency games.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-4">
        {PLANS.map((p, i) => (
          <Reveal key={p.name} delay={(i % 4) * 0.06}>
            <div
              className={`hover-lift flex h-full flex-col rounded-2xl border p-7 ${
                p.highlight
                  ? 'border-accent bg-ink-panel text-white shadow-[0_28px_60px_-30px_rgba(15,122,90,0.55)]'
                  : 'border-line bg-surface text-ink hover:shadow-[0_24px_50px_-30px_rgba(31,26,20,0.4)]'
              }`}
            >
              <h3 className="text-base font-semibold tracking-tight">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-semibold tracking-tight">{p.price}</span>
                {p.unit && <span className={p.highlight ? 'text-sm text-white/50' : 'text-sm text-faint'}>{p.unit}</span>}
              </div>
              <p className={`mt-3 text-sm leading-relaxed ${p.highlight ? 'text-white/60' : 'text-muted'}`}>{p.note}</p>

              <ul className="mt-6 flex flex-col gap-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg
                      viewBox="0 0 20 20"
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 10.5 8 14l8-8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className={p.highlight ? 'text-white/80' : 'text-ink'}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  p.highlight ? 'bg-accent text-white hover:bg-accent-hover' : 'border border-line-strong text-ink hover:border-ink'
                }`}
              >
                {p.cta}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
