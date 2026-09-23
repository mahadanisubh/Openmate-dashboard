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
    <section aria-label="Questions customers ask" className="overflow-hidden border-y border-line bg-accent py-4 text-white">
      <div className="group flex">
        <ul className="flex shrink-0 animate-marquee items-center gap-8 pr-8 group-hover:[animation-play-state:paused]">
          {row.map((q, i) => (
            <li key={i} className="flex items-center gap-8 whitespace-nowrap text-lg font-medium">
              <span>{q}</span>
              <span className="text-white/50" aria-hidden="true">
                ✳
              </span>
            </li>
          ))}
        </ul>
        <ul
          aria-hidden="true"
          className="flex shrink-0 animate-marquee items-center gap-8 pr-8 group-hover:[animation-play-state:paused]"
        >
          {row.map((q, i) => (
            <li key={i} className="flex items-center gap-8 whitespace-nowrap text-lg font-medium">
              <span>{q}</span>
              <span className="text-white/50">✳</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
