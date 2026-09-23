import Reveal from './reveal.jsx';

const REASONS = [
  { title: 'Simple to launch', body: 'One script puts the assistant on your website. No complicated support platform required.', icon: 'bolt', color: 'accent' },
  { title: 'Uses your business knowledge', body: 'OpenMate answers from the information you provide — not a generic chatbot experience.', icon: 'book', color: 'sun' },
  { title: 'Available around the clock', body: 'Your website keeps answering questions when your team isn’t online.', icon: 'clock', color: 'mint' },
  { title: 'Built for small businesses', body: 'You don’t need an enterprise support team or a large software budget.', icon: 'store', color: 'berry' },
  { title: 'Works with your brand', body: 'Make the assistant feel like part of your website, not another company’s product.', icon: 'brush', color: 'sun' },
  { title: 'Built for agencies', body: 'Deploy assistants for multiple businesses and offer them as part of client services.', icon: 'layers', color: 'accent' },
];

const PATHS = {
  bolt: 'M12 3 5 13h5l-1 8 8-11h-6l1-7Z',
  book: 'M5 5a2 2 0 0 1 2-2h11v16H7a2 2 0 0 0-2 2V5Zm0 0v14',
  clock: 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  store: 'M4 9h16M4 9l1-4h14l1 4M4 9v10h16V9M9 19v-5h6v5',
  brush: 'M9 15c-2 0-3 2-3 4 3 0 5-1 5-3M9 15l8-9a2 2 0 0 1 3 3l-9 8',
  layers: 'M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5M3 17l9 5 9-5',
};

const CHIP = {
  accent: 'bg-accent-soft text-accent',
  sun: 'bg-sun-soft text-sun',
  mint: 'bg-mint-soft text-mint',
  berry: 'bg-berry-soft text-berry',
};

export default function WhyOpenMate() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">Why OpenMate</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Business-focused from the first script tag
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 0.06}>
              <div className="hover-lift-sm flex h-full flex-col gap-4 bg-surface p-8 transition-colors hover:bg-paper">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${CHIP[r.color]}`}>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={PATHS[r.icon]} />
                  </svg>
                </span>
                <h3 className="text-lg font-semibold tracking-tight">{r.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
