// Only links with a real target ship — one that silently scrolls to the top reads as unfinished. Policy routes return when /privacy and /terms are built.
const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Overview', href: '/#top' },
      { label: 'How it works', href: '/#usecases' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Live example', href: '/#top' },
    ],
  },
  {
    title: 'Use cases',
    links: [
      { label: 'Local business', href: '/#usecases' },
      { label: 'SaaS & startups', href: '/#usecases' },
      { label: 'Agencies', href: '/#usecases' },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(2,1fr)]">
          <div>
            <a href="/#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
              <img
                src="/logo-icon.ico"
                alt=""
                className="h-7 w-7 shrink-0 rounded-lg object-contain"
                draggable="false"
              />
              OpenMate
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              An embeddable AI assistant that helps your website answer customers 24/7.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold">{col.title}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-muted transition-colors hover:text-ink">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} OpenMate. All rights reserved.</p>
          <p>Simple for owners. Transparent for builders. Flexible for agencies.</p>
        </div>
      </div>
    </footer>
  );
}
