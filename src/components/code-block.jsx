'use client';

import { useState } from 'react';

// A tiny, dependency-free highlighter. It is deliberately shallow — enough to make the code read as
// code and, crucially, to set the widget's own <script> line apart from the surrounding boilerplate
// so a reader's eye lands on the one line that matters.
const TOKEN = /(\/\/[^\n]*|<!--[\s\S]*?-->)|('[^']*'|"[^"]*")|(\b(?:import|from|export|default|function|return|const|let|var|new|useEffect)\b)|(\b(?:html|head|body|div|script|main|app-root|template|p|h1)\b)/g;

function tokenize(code) {
  const nodes = [];
  let last = 0;
  let key = 0;
  for (const match of code.matchAll(TOKEN)) {
    if (match.index > last) nodes.push({ type: 'plain', text: code.slice(last, match.index), key: key++ });
    const [full, comment, string, keyword, tag] = match;
    const type = comment ? 'comment' : string ? 'string' : keyword ? 'keyword' : tag ? 'tag' : 'plain';
    nodes.push({ type, text: full, key: key++ });
    last = match.index + full.length;
  }
  if (last < code.length) nodes.push({ type: 'plain', text: code.slice(last), key: key++ });
  return nodes;
}

const COLOR = {
  comment: 'text-emerald-300/45 italic',
  string: 'text-amber-200',
  keyword: 'text-fuchsia-300',
  tag: 'text-sky-300',
  plain: 'text-white/85',
};

// The widget embed line gets its own treatment: a tinted band with the accent, so "this is the tag
// you paste" is obvious at a glance.
function HighlightedLine({ line }) {
  const isEmbed = /data-bot-id|widget\.js/.test(line);
  const nodes = tokenize(line);
  return (
    <span
      className={isEmbed ? 'block -mx-4 rounded bg-accent/15 px-4 shadow-[inset_3px_0_0_0_var(--color-accent)]' : 'block'}
    >
      {nodes.map((n) => (
        <span key={n.key} className={COLOR[n.type]}>
          {n.text}
        </span>
      ))}
    </span>
  );
}

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

  const lines = code.split('\n');

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
      <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-relaxed">
        <code className="font-mono">
          {lines.map((line, i) => (
            <HighlightedLine key={i} line={line} />
          ))}
        </code>
      </pre>
    </div>
  );
}
