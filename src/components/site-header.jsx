'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Destinations pending the real values — replace with the external docs URL and the contact
// route/address. Kept as constants so there is exactly one place to change.
const DOCS_HREF = '/docs';
const CONTACT_HREF = '/contact';

// `overlay` renders the nav inside the hero banner (absolute, light-on-image, aligned to the hero's
// own padding) instead of as a separate sticky bar. Pages without a banner use the default.
export default function SiteHeader({ overlay = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const anchor = (hash) => (pathname === '/' ? hash : `/${hash}`);
  const home = pathname === '/' ? '#top' : '/';

  const NAV = [
    { label: 'Use cases', href: anchor('#usecases') },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Docs', href: DOCS_HREF },
    { label: 'Contact', href: CONTACT_HREF },
  ];

  useEffect(() => {
    if (overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [overlay]);

  const shell = overlay
    ? 'absolute inset-x-0 top-0 z-50'
    : `sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-line bg-paper/85 backdrop-blur' : 'border-transparent bg-paper'
      }`;
  const pad = overlay ? 'w-full px-6 sm:px-10 lg:px-16' : 'mx-auto max-w-6xl px-5 sm:px-8';
  const brandTone = overlay ? 'text-white' : 'text-ink';
  const linkTone = overlay ? 'text-white/85 hover:text-white' : 'text-muted hover:text-ink';

  return (
    <header className={shell}>
      {/* A top scrim so the nav stays legible over whatever the banner shows beneath it. */}
      {overlay && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-ink-panel/75 via-ink-panel/25 to-transparent"
          aria-hidden="true"
        />
      )}

      <div className={`${pad} flex items-center gap-6 py-4`}>
        <a href={home} className={`flex items-center gap-2.5 font-display font-medium tracking-tight ${brandTone}`}>
          <img
            src="/logo-icon.ico"
            alt=""
            className="h-7 w-7 shrink-0 rounded-lg object-contain"
            draggable="false"
          />
          OpenMate
        </a>

        <nav className="ml-6 hidden items-center gap-7 text-sm md:flex">
          {NAV.map((n) => (
            <a key={n.label} href={n.href} className={`transition-colors ${linkTone}`}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <a href="/dashboard" className={`text-sm transition-colors ${linkTone}`}>
            Sign in
          </a>
          <a
            href={anchor('#cta')}
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Create your assistant
          </a>
        </div>

        <button
          type="button"
          className={`ml-auto flex h-9 w-9 items-center justify-center rounded-lg md:hidden ${
            overlay ? 'border border-white/35 text-white' : 'border border-line'
          }`}
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div
          className={`border-t px-5 py-4 md:hidden ${
            overlay ? 'border-white/15 bg-ink-panel' : 'border-line bg-paper'
          }`}
        >
          <nav className="flex flex-col gap-1">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className={`rounded-lg px-2 py-2.5 text-sm ${
                  overlay ? 'text-white/85 hover:bg-white/10' : 'text-muted hover:bg-surface hover:text-ink'
                }`}
                onClick={() => setOpen(false)}
              >
                {n.label}
              </a>
            ))}
            <a
              href={anchor('#cta')}
              className="mt-2 rounded-full bg-accent px-4 py-2.5 text-center text-sm font-medium text-white"
              onClick={() => setOpen(false)}
            >
              Create your assistant
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
