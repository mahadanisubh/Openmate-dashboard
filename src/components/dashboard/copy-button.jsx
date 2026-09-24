'use client';

import { useState } from 'react';

export default function CopyButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);

  async function onClick() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-line-strong hover:text-ink"
    >
      {copied ? 'Copied' : label}
    </button>
  );
}
