import Reveal from './reveal.jsx';
import ScrollWeight from './scroll-weight.jsx';

// Three tiers, told in business terms. The technical rate limits (chunk caps, per-minute request
// ceilings) are deliberately absent: a business owner choosing a plan needs to know who it is for
// and what it unlocks, not the size of an index. Pro and Agency carry no price yet because they are
// not built.
const TIERS = [
  {
    name: 'Cloud Free',
    price: '$0',
    unit: 'free to start, free to keep',
    status: 'available',
    audience: 'For one business putting its first assistant on its website.',
    difference: 'Answers your customers on one site, free — up to 500 conversations a month.',
    uses: [
      'A café answering opening hours and menu questions',
      'A clinic fielding insurance and booking questions after hours',
      'A salon handling prices and appointment questions',
    ],
    cta: 'Start free',
    href: '/#cta',
  },
  {
    name: 'Pro',
    price: 'Coming soon',
    unit: 'in build',
    status: 'coming',
    audience: 'For growing businesses that want the assistant to look like theirs.',
    difference: 'Your brand front and centre — OpenMate branding removed, with room to grow.',
    uses: [
      'A multi-location business keeping one consistent assistant',
      'A shop whose assistant matches its website exactly',
      'A busy site that needs headroom at peak hours',
    ],
    cta: 'Join the waitlist',
    href: '/#cta',
  },
  {
    name: 'Agency / Enterprise',
    price: 'Coming soon',
    unit: 'in build',
    status: 'coming',
    audience: 'For teams running websites for many clients.',
    difference: 'White-label and multi-tenant, built for the way agencies work.',
    uses: [
      'A web agency shipping an assistant with every site it builds',
      'A marketing agency offering AI support as a service',
      'A franchise group with knowledge for each location',
    ],
    cta: 'Talk to us',
    href: '/#cta',
  },
];

function Tier({ tier }) {
  const live = tier.status === 'available';
  return (
    <div
      className={`flex h-full flex-col rounded-2xl border p-7 sm:p-8 ${
        live ? 'border-accent/40 bg-surface' : 'border-line bg-surface/60'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-display text-xl tracking-tight text-ink">{tier.name}</h2>
        {live ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent-hover">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-count" />
            Available
          </span>
        ) : (
          <span className="rounded-full border border-line-strong px-2.5 py-1 text-xs font-medium text-muted">
            Coming soon
          </span>
        )}
      </div>

      <p className={`mt-6 font-display text-3xl tracking-tight ${live ? 'text-ink' : 'text-muted'}`}>
        {tier.price}
      </p>
      <p className="mt-1 text-sm text-faint">{tier.unit}</p>

      <p className="mt-6 leading-relaxed text-muted">{tier.audience}</p>

      <p className="mt-6 border-t border-line pt-6 font-medium leading-relaxed text-ink">{tier.difference}</p>

      <p className="mt-7 text-sm font-medium text-ink">Where it fits</p>
      <ul className="mt-3 flex flex-1 flex-col gap-2.5">
        {tier.uses.map((u) => (
          <li key={u} className="flex gap-2.5 text-sm leading-relaxed text-muted">
            <svg
              viewBox="0 0 20 20"
              className="mt-0.5 h-4 w-4 shrink-0 text-accent"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M4 10.5 8 14l8-8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {u}
          </li>
        ))}
      </ul>

      <a
        href={tier.href}
        className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
          live
            ? 'bg-accent text-white hover:bg-accent-hover'
            : 'border border-line-strong text-ink hover:border-ink'
        }`}
      >
        {tier.cta}
      </a>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <Reveal>
        <ScrollWeight from={400} to={600}>
          <h1 className="max-w-3xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            Simple pricing for every stage.
          </h1>
        </ScrollWeight>
      </Reveal>

      <Reveal delay={0.06}>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Start free with everything you need on one website. Move up when you want the assistant to be
          yours alone.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {TIERS.map((t, i) => (
          <Reveal key={t.name} delay={(i % 3) * 0.06}>
            <Tier tier={t} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-faint">
          Pro and Agency are in build. Start free today and we will reach out as soon as they open.
        </p>
      </Reveal>
    </section>
  );
}
