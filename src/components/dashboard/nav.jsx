import Link from 'next/link';

import { signOut } from '../../actions/auth.js';

const NAV = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/documents', label: 'Documents' },
  { href: '/dashboard/appearance', label: 'Appearance' },
  { href: '/dashboard/origins', label: 'Origins' },
  { href: '/dashboard/webhooks', label: 'Webhooks' },
  { href: '/dashboard/embed', label: 'Embed tag' },
];

export default function DashboardNav({ active }) {
  return (
    <aside className="flex w-full flex-col gap-8 lg:w-64">
      <div>
        <Link href="/dashboard" className="font-display text-lg font-medium tracking-tight">
          OpenMate
        </Link>
        <p className="mt-1 text-sm text-muted">Tenant dashboard</p>
      </div>
      <nav aria-label="Dashboard" className="flex flex-row flex-wrap gap-2 lg:flex-col">
        {NAV.map((item) => {
          const isActive = item.href === active;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                isActive
                  ? 'bg-ink text-white'
                  : 'border border-line bg-surface text-muted hover:border-line-strong hover:text-ink'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <form action={signOut} className="hidden lg:block">
        <button
          type="submit"
          className="rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-line-strong hover:text-ink"
        >
          Sign out
        </button>
      </form>
    </aside>
  );
}
