const COLUMNS = [
  { title: 'Product', links: ['Overview', 'How it works', 'Pricing', 'Live example'] },
  { title: 'Use cases', links: ['Local business', 'SaaS & startups', 'Agencies'] },
  { title: 'Trust', links: ['Blind Vectors', 'Encryption', 'Data handling'] },
  { title: 'Company', links: ['GitHub', 'Docs', 'Contact'] },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-sm text-white">O</span>
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
                  <li key={l}>
                    <a href="#top" className="text-sm text-muted transition-colors hover:text-ink">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} OpenMate. Open source, MIT licensed.</p>
          <p>Simple for owners. Transparent for builders. Flexible for agencies.</p>
        </div>
      </div>
    </footer>
  );
}
