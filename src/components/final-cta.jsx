import Reveal from './reveal.jsx';
import ScrollWeight from './scroll-weight.jsx';

export default function FinalCta() {
  return (
    <section id="cta" className="relative overflow-hidden border-t border-line bg-ink-panel">
      {/* Token-based wash replacing the export's hardcoded orange gradient (the brief forbids the
       * generic AI gradient); the warm accents keep the section from sitting flat. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-accent/25 blur-3xl animate-blob" />
        <div
          className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-berry/25 blur-3xl animate-blob"
          style={{ animationDelay: '4s' }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 py-24 text-center text-white sm:px-8 lg:py-32">
        <Reveal>
          <ScrollWeight from={400} to={700}>
            <h2 className="font-display text-3xl leading-[1.1] tracking-tight sm:text-5xl">
              Your customers already have questions.
              <br />
              <span className="text-accent">Give them somewhere to ask.</span>
            </h2>
          </ScrollWeight>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/90">
            OpenMate helps your website answer customers, support visitors and represent your business — even when
            you&rsquo;re away.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#top"
              className="hover-scale inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white shadow-lg"
            >
              Start with OpenMate
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#top"
              className="inline-flex items-center justify-center rounded-full border border-white/60 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/15"
            >
              See a live example
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
