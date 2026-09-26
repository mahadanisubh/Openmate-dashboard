'use client';

import { useState } from 'react';

export default function CodeBlock({ code, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);

  async function onClick() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border border-line bg-ink-panel">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">Code</span>
        <button
          type="button"
          onClick={onClick}
          aria-live="polite"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
        >
          {copied ? (
            <>
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 10.5 8 14l8-8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="8" y="8" width="9" height="9" rx="1.5" />
                <path d="M12 5.5V4.5A1.5 1.5 0 0 0 10.5 3h-6A1.5 1.5 0 0 0 3 4.5v6A1.5 1.5 0 0 0 4.5 12h1" strokeLinecap="round" />
              </svg>
              {label}
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-relaxed text-white/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}
