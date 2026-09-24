import Reveal from './reveal.jsx';
import ScrollWeight from './scroll-weight.jsx';

const CLIENTS = [
  { name: 'Client A', kind: 'Clinic assistant', accent: 'Answers hours, insurance & booking' },
  { name: 'Client B', kind: 'Salon assistant', accent: 'Handles pricing & appointments' },
  { name: 'Client C', kind: 'SaaS support assistant', accent: 'Explains plans & onboarding' },
];

export default function ForAgencies() {
  return (
    <section id="agencies" className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-28">
        <div>
          <Reveal>
            <ScrollWeight from={400} to={600}>
              <h2 className="font-display text-3xl leading-[1.12] tracking-tight sm:text-4xl">
                Build it once. Offer it to every client.
              </h2>
            </ScrollWeight>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-5 max-w-md leading-relaxed text-muted">
              OpenMate lets agencies provide AI assistants as part of their existing website and digital services. Each
              business gets its own knowledge and branded experience.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 rounded-2xl border border-line bg-paper p-6">
              <h3 className="text-lg font-semibold tracking-tight">White-label your service</h3>
              <p className="mt-2 leading-relaxed text-muted">
                On Pro, remove OpenMate branding and make the assistant part of your client&rsquo;s experience.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <a
              href="#cta"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Build for your clients
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="grid gap-4">
            {CLIENTS.map((c, i) => (
              <div
                key={c.name}
                className="flex items-center gap-4 rounded-2xl border border-line bg-paper p-5"
                style={{ marginLeft: `${i * 1.5}rem` }}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-sm font-semibold text-white">
                  {c.name.split(' ')[1]}
                </span>
                <div>
                  <p className="font-semibold tracking-tight">{c.kind}</p>
                  <p className="text-sm text-muted">{c.accent}</p>
                </div>
                <span className="ml-auto rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent-hover">
                  Live
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
