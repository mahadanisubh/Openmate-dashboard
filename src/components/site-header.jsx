'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Destinations pending the real values — replace with the external docs URL and the contact
// route/address. Kept as constants so there is exactly one place to change.
const DOCS_HREF = '/docs';
const CONTACT_HREF = '/contact';
// The community lives on Telegram; the link opens in a new tab so the marketing page is never lost.
const COMMUNITY_HREF = 'https://t.me/openmatecommunity7';

// `overlay` renders the nav inside the hero banner (absolute, light-on-image, aligned to the hero's
// own padding) instead of as a separate sticky bar. Pages without a banner use the default.
// `signedIn` is resolved on the server from the session cookie's presence and switches the CTA.
export default function SiteHeader({ overlay = false, signedIn = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const anchor = (hash) => (pathname === '/' ? hash : `/${hash}`);
  const home = pathname === '/' ? '#top' : '/';

  const NAV = [
    { label: 'Pricing', href: '/pricing' },
    { label: 'Docs', href: DOCS_HREF },
    { label: 'Contact us', href: CONTACT_HREF },
    { label: 'Community', href: COMMUNITY_HREF, external: true },
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

  // The single primary action: a signed-in visitor returns to their dashboard, everyone else starts
  // the Create Assistant flow.
  const cta = signedIn
    ? { href: '/dashboard', label: 'Go to dashboard' }
    : { href: '/create-assistant', label: 'Create your assistant' };

  return (
    <header className={shell}>
      {overlay && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-ink-panel/75 via-ink-panel/25 to-transparent"
          aria-hidden="true"
        />
      )}

      {/* A hairline of brand colour under the bar, so the navigation reads as part of the product
       * rather than a plain strip. Present in both states, brightest at the centre. */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(15,122,90,0.55),rgba(13,148,136,0.55),transparent)] ${overlay ? 'opacity-40' : 'opacity-100'}`}
        aria-hidden="true"
      />

      <div className={`${pad} flex items-center gap-6 py-4`}>
        <a href={home} className={`group flex items-center gap-2.5 font-display text-[17px] font-semibold tracking-tight ${brandTone}`}>
          {/* The mark sits on a white chip to match the widget launcher, not a coloured block. */}
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-[0_6px_16px_-8px_rgba(0,0,0,0.5)] ring-1 ring-black/5">
            <img
              src="/logo-icon.ico"
              alt=""
              className="h-6 w-6 object-contain transition-transform duration-300 group-hover:scale-110"
              draggable="false"
            />
          </span>
          OpenMate
        </a>

        <nav className="ml-6 hidden items-center gap-1 text-sm md:flex">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              {...(n.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`relative rounded-full px-3.5 py-2 font-medium transition-colors ${linkTone} ${
                overlay ? 'hover:bg-white/10' : 'hover:bg-surface'
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          {!signedIn && (
            <a
              href="/dashboard/sign-in"
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${linkTone} ${
                overlay ? 'hover:bg-white/10' : 'hover:bg-surface'
              }`}
            >
              Sign in
            </a>
          )}
          <a
            href={cta.href}
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-accent to-mint px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_26px_-10px_rgba(15,122,90,0.95)] ring-1 ring-white/20 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)] transition-transform duration-500 group-hover:translate-x-full" aria-hidden="true" />
            {cta.label}
            <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.9">
              <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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
                {...(n.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`rounded-lg px-2 py-2.5 text-sm ${
                  overlay ? 'text-white/85 hover:bg-white/10' : 'text-muted hover:bg-surface hover:text-ink'
                }`}
                onClick={() => setOpen(false)}
              >
                {n.label}
              </a>
            ))}
            {!signedIn && (
              <a
                href="/dashboard/sign-in"
                className={`rounded-lg px-2 py-2.5 text-sm ${
                  overlay ? 'text-white/85 hover:bg-white/10' : 'text-muted hover:bg-surface hover:text-ink'
                }`}
                onClick={() => setOpen(false)}
              >
                Sign in
              </a>
            )}
            <a
              href={cta.href}
              className="mt-2 rounded-full bg-gradient-to-r from-accent to-mint px-4 py-2.5 text-center text-sm font-semibold text-white shadow-[0_10px_26px_-10px_rgba(15,122,90,0.95)]"
              onClick={() => setOpen(false)}
            >
              {cta.label}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
