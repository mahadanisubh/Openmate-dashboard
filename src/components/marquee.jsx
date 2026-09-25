export default function Marquee() {
  const QUESTIONS = [
    'Are you open on Sunday?',
    'How much does a haircut cost?',
    'Do you offer emergency plumbing?',
    'What is included in your plan?',
    'How can I get started?',
    'Where are you located?',
    "What's your cancellation policy?",
    'Do you take walk-ins?',
    'Can I book for tomorrow?',
  ];

  const row = [...QUESTIONS, ...QUESTIONS];
  return (
    <section
      aria-label="Questions customers ask"
      className="relative overflow-hidden border-y border-accent/30 bg-gradient-to-r from-accent via-mint to-accent py-5 text-white"
    >
      {/* A soft sheen travelling the band, matching the button shimmer for one visual language. */}
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-40" aria-hidden="true">
        <div className="animate-hero-sweep absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.25)_50%,rgba(255,255,255,0)_100%)]" />
      </div>
      <div className="group relative flex">
        {[0, 1].map((dup) => (
          <ul
            key={dup}
            aria-hidden={dup === 1}
            className="flex shrink-0 animate-marquee items-center gap-8 pr-8 group-hover:[animation-play-state:paused]"
          >
            {row.map((q, i) => (
              <li key={i} className="flex items-center gap-8 whitespace-nowrap text-lg font-semibold tracking-tight sm:text-xl">
                <span>{q}</span>
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white/60" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.5 21.5 12 12 21.5 2.5 12Z" />
                </svg>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
