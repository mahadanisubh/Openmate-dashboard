'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from './reveal.jsx';

const STATS = [
  { prefix: '', value: 500, decimals: 0, suffix: '', label: 'businesses', color: 'text-accent' },
  { prefix: '', value: 512, decimals: 0, suffix: ' MB', label: 'MongoDB Atlas M0', color: 'text-sun' },
  { prefix: '~', value: 22.2, decimals: 1, suffix: ' MB', label: 'vector storage', color: 'text-mint' },
  { prefix: '', value: 384, decimals: 0, suffix: '', label: 'dimensions', color: 'text-berry' },
  { prefix: '~', value: 2.3, decimals: 1, suffix: ' KB', label: 'per vector', color: 'text-accent' },
];

// The export animated these with motion's `animate()`; this is the rAF equivalent, which carries no
// dependency. Under prefers-reduced-motion the final value renders immediately.
function CountUp({ prefix, value, decimals, suffix, className }) {
  const ref = useRef(null);
  const inView = useInViewOnce(ref);
  const reduce = usePrefersReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    let frame;
    const start = performance.now();
    const duration = 1400;
    const tick = (now) => {
      const elapsed = Math.min((now - start) / duration, 1);
      // easeOutExpo, matching the export's [0.16, 1, 0.3, 1] curve closely enough
      const eased = elapsed === 1 ? 1 : 1 - Math.pow(2, -10 * elapsed);
      setDisplay(value * eased);
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function useInViewOnce(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -60px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
}

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

export default function Numbers() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">The numbers</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          Built to keep infrastructure costs practical
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          We would rather show you the number than tell you we&rsquo;re &ldquo;ultra-efficient.&rdquo;
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-line bg-surface p-7 transition-shadow hover:shadow-[0_20px_44px_-26px_rgba(31,26,20,0.35)]"
            >
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="mt-2 text-3xl font-semibold tracking-tight">
                <CountUp prefix={s.prefix} value={s.value} decimals={s.decimals} suffix={s.suffix} className={s.color} />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-faint">
          500 businesses fit comfortably within a free 512 MB Atlas M0 cluster using roughly 22.2 MB of vector storage —
          384-dimensional vectors at about 2.3 KB each.
        </p>
      </Reveal>
    </section>
  );
}
