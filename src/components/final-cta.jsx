import Reveal from './reveal.jsx';
import ScrollWeight from './scroll-weight.jsx';

export default function FinalCta() {
  return (
    <section id="cta" className="relative overflow-hidden border-t border-line bg-ink-panel">
      {/* Token-based wash replacing the export's hardcoded orange gradient (the brief forbids the generic AI gradient). */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-accent/25 blur-3xl animate-blob" />
        <div
          className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-berry/25 blur-3xl animate-blob"
          style={{ animationDelay: '4s' }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 py-24 text-center text-white sm:px-8 lg:py-32">
        <Reveal>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
            Get started
          </span>
        </Reveal>
        <Reveal delay={0.04}>
          <ScrollWeight from={500} to={900}>
            <h2 className="font-display text-4xl leading-[1.06] tracking-tight sm:text-6xl">
              Your customers already have questions.
              <br />
              <span className="bg-gradient-to-r from-accent-soft via-mint to-accent-soft bg-clip-text text-transparent">
                Give them somewhere to ask.
              </span>
            </h2>
          </ScrollWeight>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">
            OpenMate helps your website answer customers, support visitors and represent your business &mdash; even when
            you&rsquo;re away.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-11 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#top"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-mint px-8 py-4 text-base font-semibold text-white shadow-[0_18px_44px_-14px_rgba(15,122,90,1)] ring-1 ring-white/20 transition-transform duration-200 hover:-translate-y-0.5"
            >
              Start with OpenMate
              <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#top"
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/15"
            >
              See a live example
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
