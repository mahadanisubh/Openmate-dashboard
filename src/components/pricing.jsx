import Reveal from './reveal.jsx';
import ScrollWeight from './scroll-weight.jsx';

// Three tiers compared on the entitlement surface — origins, documents, appearance, branding, webhooks, headroom — answered for every tier.
const TIERS = [
  {
    name: 'Cloud Free',
    price: '$0',
    unit: 'free to start, free to keep',
    status: 'available',
    audience: 'For one business putting its first assistant on its website.',
    difference: 'Answers your customers on one site, free — up to 500 conversations a month.',
    cta: 'Start free',
    href: '/create-assistant',
  },
  {
    name: 'Pro',
    price: 'Coming soon',
    unit: 'in build',
    status: 'coming',
    audience: 'For growing businesses that want the assistant to look like theirs.',
    difference: 'Your brand front and centre — OpenMate branding removed, with room to grow.',
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
    cta: 'Talk to us',
    href: '/#cta',
  },
];

// Rows are the differentiators in buyer order; one answer per tier so the comparison renders as a table on desktop and per-card on mobile.
const FEATURES = [
  { label: 'Website origins', free: '1 domain', pro: 'Up to 10', agency: 'Up to 25', icon: 'globe' },
  { label: 'Knowledge documents', free: '1 document', pro: 'Up to 10', agency: 'Up to 50', icon: 'doc' },
  { label: 'Chat turns per month', free: '500', pro: 'Unlimited', agency: 'Unlimited', icon: 'chat' },
  { label: 'Assistant appearance', free: false, pro: 'Full control', agency: 'Full control', icon: 'palette' },
  { label: 'OpenMate branding', free: 'Shown', pro: 'Removed', agency: 'Removed', icon: 'badge' },
  { label: 'Lead webhooks', free: false, pro: true, agency: true, icon: 'hook' },
  { label: 'Enterprise LLM keys', free: false, pro: false, agency: true, icon: 'key' },
  { label: 'White-label & multi-tenant', free: false, pro: false, agency: true, icon: 'layers' },
];

const ICONS = {
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.5 3.5 6 3.5 9S14.5 18.5 12 21c-2.5-2.5-3.5-6-3.5-9S9.5 5.5 12 3z',
  doc: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6',
  chat: 'M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z',
  palette: 'M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 2-2 2 2 0 0 1 2-2h2a2 2 0 0 0 2-2 9 9 0 0 0-9-9zM7.5 10.5h.01M11 7.5h.01M15 9h.01',
  badge: 'M12 3l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.2l5.9-.9z',
  hook: 'M10 14a5 5 0 0 1 0-10 5 5 0 0 1 5 5v9a3 3 0 0 1-6 0v-2',
  key: 'M15 7a4 4 0 1 0-3.5 4H11l-1 1H8v2H6v2H3v-3l6.5-6.5A4 4 0 0 1 15 7z',
  layers: 'M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5M3 17l9 5 9-5',
};

function FeatureIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

function Value({ value }) {
  if (value === true) {
    return <span className="text-accent" aria-label="Included">✓</span>;
  }
  if (value === false) {
    return <span className="text-faint" aria-label="Not included">—</span>;
  }
  return <span className="text-ink">{value}</span>;
}

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

      <a
        href={tier.href}
        className={`mt-7 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
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

      <Reveal delay={0.08}>
        <h2 className="mt-20 font-display text-2xl font-semibold tracking-tight">What each plan includes</h2>
        <p className="mt-2 text-sm text-muted">Every feature that changes between tiers, side by side.</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 hidden overflow-hidden rounded-2xl border border-line bg-surface lg:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-paper/60 text-left">
                <th scope="col" className="px-6 py-4 font-medium text-muted">Feature</th>
                <th scope="col" className="px-6 py-4 font-display font-semibold text-ink">Cloud Free</th>
                <th scope="col" className="px-6 py-4 font-display font-semibold text-ink">Pro</th>
                <th scope="col" className="px-6 py-4 font-display font-semibold text-ink">Agency / Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((f, i) => (
                <tr key={f.label} className={i % 2 === 1 ? 'bg-paper/40' : ''}>
                  <th scope="row" className="flex items-center gap-3 px-6 py-4 text-left font-medium text-ink">
                    <span className="text-accent" aria-hidden="true"><FeatureIcon name={f.icon} /></span>
                    {f.label}
                  </th>
                  <td className="px-6 py-4"><Value value={f.free} /></td>
                  <td className="px-6 py-4 font-medium"><Value value={f.pro} /></td>
                  <td className="px-6 py-4 font-medium"><Value value={f.agency} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: the same rows grouped per tier so the table does not overflow. */}
        <div className="mt-8 flex flex-col gap-6 lg:hidden">
          {FEATURES.map((f) => (
            <div key={f.label} className="rounded-2xl border border-line bg-surface p-5">
              <div className="flex items-center gap-2.5 font-medium text-ink">
                <span className="text-accent" aria-hidden="true"><FeatureIcon name={f.icon} /></span>
                {f.label}
              </div>
              <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-faint">Free</dt>
                  <dd className="mt-0.5"><Value value={f.free} /></dd>
                </div>
                <div>
                  <dt className="text-xs text-faint">Pro</dt>
                  <dd className="mt-0.5 font-medium"><Value value={f.pro} /></dd>
                </div>
                <div>
                  <dt className="text-xs text-faint">Agency</dt>
                  <dd className="mt-0.5 font-medium"><Value value={f.agency} /></dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-faint">
          Pro and Agency are in build. Start free today and we will reach out as soon as they open.
        </p>
      </Reveal>
    </section>
  );
}

