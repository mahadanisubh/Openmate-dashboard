'use client';

import { useEffect, useRef, useState } from 'react';

// The one interactive product island: a faithful mock of the OpenMate widget that plays a scripted
// conversation with restrained streaming. It is driven by a `script` of turns:
// { from: 'visitor' | 'openmate', text }.
export default function ChatWidget({ script, title = 'OpenMate', subtitle = 'Assistant', compact = false, loop = true }) {
  const reduce = usePrefersReducedMotion();
  const rootRef = useRef(null);
  const scrollRef = useRef(null);
  const [started, setStarted] = useState(false);

  // shown = fully rendered turns; streaming = the turn currently typing out
  const [shown, setShown] = useState(reduce ? script : []);
  const [streaming, setStreaming] = useState(null);
  const [typing, setTyping] = useState(false);

  const scriptKey = script.map((t) => t.text).join('|');

  // Start only when scrolled into view, so nothing plays off-screen.
  useEffect(() => {
    if (reduce) return;
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setStarted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (reduce) {
      setShown(script);
      return;
    }
    if (!started) return;

    let cancelled = false;
    const timers = [];
    const wait = (ms) =>
      new Promise((res) => {
        const t = setTimeout(res, ms);
        timers.push(t);
      });

    async function play() {
      setShown([]);
      setStreaming(null);
      for (let i = 0; i < script.length; i++) {
        if (cancelled) return;
        const turn = script[i];

        if (turn.from === 'visitor') {
          await wait(i === 0 ? 400 : 700);
          if (cancelled) return;
          setShown((s) => [...s, turn]);
          continue;
        }

        // openmate: show a brief typing indicator, then stream the text
        await wait(550);
        if (cancelled) return;
        setTyping(true);
        await wait(650);
        if (cancelled) return;
        setTyping(false);
        setStreaming({ from: 'openmate', text: '' });

        const full = turn.text;
        for (let c = 1; c <= full.length; c++) {
          if (cancelled) return;
          setStreaming({ from: 'openmate', text: full.slice(0, c) });
          // slightly quicker on spaces to feel natural
          await wait(full[c - 1] === ' ' ? 12 : 22);
        }
        setShown((s) => [...s, turn]);
        setStreaming(null);
      }

      if (loop && !cancelled) {
        await wait(4200);
        if (!cancelled) play();
      }
    }

    play();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // scriptKey carries the script identity; the linter accepts the object reference
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, reduce, scriptKey, loop]);

  // Keep the newest message in view within the panel.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [shown, streaming, typing]);

  const rendered = streaming ? [...shown, streaming] : shown;

  return (
    <div
      ref={rootRef}
      className="flex w-full flex-col overflow-hidden rounded-2xl bg-surface shadow-[0_1px_0_0_rgba(0,0,0,0.04),0_24px_60px_-24px_rgba(27,25,23,0.35)] ring-1 ring-line"
      role="group"
      aria-label="OpenMate assistant preview"
    >
      {/* header */}
      <div className="flex items-center gap-3 border-b border-line bg-ink-panel px-4 py-3">
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-[15px] font-semibold text-white">
          O
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink-panel bg-emerald-400" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{title}</p>
          <p className="truncate text-xs text-white/55">{subtitle} · online</p>
        </div>
        <div className="ml-auto flex gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        </div>
      </div>

      {/* messages */}
      <div
        ref={scrollRef}
        className={`flex flex-col gap-3 overflow-y-auto bg-paper px-4 py-4 ${compact ? 'h-56' : 'h-80 sm:h-[22rem]'}`}
        aria-live="polite"
      >
        {rendered.map((turn, i) => (
          <Bubble key={i} turn={turn} streaming={streaming && i === rendered.length - 1} />
        ))}
        {typing && <TypingDots />}
      </div>

      {/* input (decorative, disabled) */}
      <div className="flex items-center gap-2 border-t border-line bg-surface px-3 py-3">
        <div className="flex-1 rounded-full border border-line bg-paper px-4 py-2 text-sm text-faint">
          Ask a question…
        </div>
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
            <path d="M3 10.5 16 4l-4.2 12.5-2.6-5.2L3 10.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function Bubble({ turn, streaming }) {
  const isVisitor = turn.from === 'visitor';
  return (
    <div className={`flex ${isVisitor ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
          isVisitor ? 'rounded-br-md bg-ink text-white' : 'rounded-bl-md border border-line bg-surface text-ink'
        }`}
      >
        {turn.text}
        {streaming && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-accent align-middle" />}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-line bg-surface px-3.5 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-typing rounded-full bg-faint"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  );
}

// The motion export used `useReducedMotion`; this is the dependency-free equivalent.
function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduce;
}
