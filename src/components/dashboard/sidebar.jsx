'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { signOut } from '../../actions/auth.js';

// Appearance editing is a paid entitlement (T-018); the flag mirrors the API gate so nav and API agree.
const NAV = [
  { href: '/dashboard', label: 'Overview', icon: 'grid' },
  { href: '/dashboard/documents', label: 'Documents', icon: 'doc' },
  { href: '/dashboard/appearance', label: 'Appearance', icon: 'palette', paid: true },
  { href: '/dashboard/origins', label: 'Origins', icon: 'globe' },
  { href: '/dashboard/webhooks', label: 'Webhooks', icon: 'hook' },
  { href: '/dashboard/embed', label: 'Embed tag', icon: 'code' },
];

const STORAGE_KEY = 'openmate:sidebar';

const ICONS = {
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  doc: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6',
  palette: 'M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 2-2 2 2 0 0 1 2-2h2a2 2 0 0 0 2-2 9 9 0 0 0-9-9zM7.5 10.5h.01M11 7.5h.01M15 9h.01',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.5 3.5 6 3.5 9S14.5 18.5 12 21c-2.5-2.5-3.5-6-3.5-9S9.5 5.5 12 3z',
  hook: 'M10 14a5 5 0 0 1 0-10 5 5 0 0 1 5 5v9a3 3 0 0 1-6 0v-2',
  code: 'M9 8l-4 4 4 4M15 8l4 4-4 4',
};

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name] ?? ICONS.grid} />
    </svg>
  );
}

export default function Sidebar({ active, tier }) {
  // Collapse and the mobile drawer are separate states on purpose: the reopen control must live
  // outside the drawer, or a closed drawer hides the only button that could reopen it.
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = NAV.filter((item) => !item.paid || tier !== 'free');

  // Read the stored preference after mount so the server markup and the first client paint agree.
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === 'closed') setOpen(false);
    } catch {
      // Private mode: keep the default rather than failing the shell.
    }
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  function toggle() {
    setOpen((next) => {
      const value = !next;
      try {
        localStorage.setItem(STORAGE_KEY, value ? 'open' : 'closed');
      } catch {
        // Best-effort persistence.
      }
      return value;
    });
  }

  const expanded = open ? 'lg:w-64' : 'lg:w-[76px]';

  return (
    <>
      {/* No-JS fallback: force the drawer into place and retire the script-only controls so the nav stays reachable. */}
      <noscript>
        <style>{'.dashboard-drawer{transform:none !important}.dashboard-menu-button{display:none !important}'}</style>
      </noscript>

      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-ink/40 backdrop-blur-sm lg:hidden"
        />
      ) : null}

      {/* The reopen control, outside the drawer so a closed drawer is never a dead end. */}
      {!mobileOpen ? (
        <button
          type="button"
          aria-label="Open navigation"
          aria-expanded={false}
          onClick={() => setMobileOpen(true)}
          className="dashboard-menu-button fixed left-4 top-4 z-30 grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface text-ink shadow-[0_10px_28px_-14px_rgba(31,26,20,0.6)] transition-transform hover:-translate-y-0.5 lg:hidden"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      ) : null}

      <aside
        className={`dashboard-drawer fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-surface shadow-2xl transition-[transform,width] duration-300 lg:shadow-none ${expanded} ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between gap-2 px-4 py-5">
          <Link
            href="/dashboard"
            className={`font-display text-lg font-medium tracking-tight transition-opacity ${open ? 'opacity-100' : 'lg:pointer-events-none lg:opacity-0'}`}
          >
            OpenMate
          </Link>
          {/* Mobile: close the drawer. Desktop: collapse the rail. Two controls, one slot. */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-ink lg:hidden"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-expanded={open}
            className="hidden h-8 w-8 shrink-0 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-ink lg:grid"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={open ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
            </svg>
          </button>
        </div>

        <nav aria-label="Dashboard" className="flex flex-1 flex-col gap-1 overflow-y-auto px-3">
          {items.map((item) => {
            const isActive = item.href === active;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  isActive ? 'bg-ink text-white' : 'text-muted hover:bg-paper hover:text-ink'
                } ${open ? '' : 'lg:justify-center lg:px-0'}`}
              >
                <span className="shrink-0">
                  <Icon name={item.icon} />
                </span>
                <span className={`whitespace-nowrap ${open ? 'inline' : 'lg:hidden'}`}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <form action={signOut} className="border-t border-line p-3">
          <button
            type="submit"
            title="Sign out"
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-paper hover:text-ink ${
              open ? '' : 'lg:justify-center lg:px-0'
            }`}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 17l5-5-5-5M20 12H9M12 3H5v18h7" />
            </svg>
            <span className={`whitespace-nowrap ${open ? 'inline' : 'lg:hidden'}`}>Sign out</span>
          </button>
        </form>
      </aside>
    </>
  );
}