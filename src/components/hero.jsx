import Reveal from './reveal.jsx';
import ChatWidget from './chat-widget.jsx';

const HERO_SCRIPT = [
  { from: 'visitor', text: 'Do you offer weekend appointments?' },
  {
    from: 'openmate',
    text: "Yes. We're open Saturday from 9 AM–5 PM. Sunday appointments are available by request.",
  },
  { from: 'visitor', text: 'Great — how do I book one?' },
  {
    from: 'openmate',
    text: 'You can book right here, or call us at (555) 019-4432. Would you like a Saturday morning slot?',
  },
];

const STATS = [
  { value: '24/7', label: 'always answering' },
  { value: '3 min', label: 'to install' },
  { value: '1', label: 'script tag' },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* subtle single-tone wash */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -right-32 -top-24 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl animate-blob" />
        <div
          className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-sun/10 blur-3xl animate-blob"
          style={{ animationDelay: '5s' }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 lg:pt-24">
        {/* headline-first, editorial */}
        <Reveal as="span">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            An assistant for your website — not a support platform
          </span>
        </Reveal>

        <Reveal delay={0.05} as="h1">
          <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Your website should answer customers. <span className="text-accent">Even at 2&nbsp;AM.</span>
          </h1>
        </Reveal>
      </div>

      {/* structured two-column band divided by a hairline */}
      <div className="mx-auto mt-14 grid max-w-6xl gap-0 border-t border-line lg:grid-cols-[1fr_1px_1fr]">
        <div className="px-5 py-12 sm:px-8 lg:pr-14">
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg leading-relaxed text-muted">
              OpenMate turns your business knowledge into a 24/7 AI assistant for your website. Add one script,
              connect your knowledge, and start helping customers in minutes.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#cta"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Create your assistant
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#top"
                className="inline-flex items-center justify-center rounded-full border border-line-strong bg-surface px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                See a live example
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="text-3xl font-semibold tracking-tight text-ink">{s.value}</dt>
                  <dd className="mt-1 text-sm text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="hidden bg-line lg:block" aria-hidden="true" />

        <div className="border-t border-line px-5 py-12 sm:px-8 lg:border-t-0 lg:pl-14">
          <Reveal delay={0.15}>
            <div className="relative mx-auto max-w-md animate-float">
              <ChatWidget script={HERO_SCRIPT} subtitle="Riverside Dental" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
