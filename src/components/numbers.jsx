'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from './reveal.jsx';
import ScrollWeight from './scroll-weight.jsx';

const STATS = [
  { prefix: '', value: 500, decimals: 0, suffix: '', label: 'businesses', color: 'text-accent' },
  { prefix: '', value: 512, decimals: 0, suffix: ' MB', label: 'MongoDB Atlas M0', color: 'text-sun' },
  { prefix: '~', value: 22.2, decimals: 1, suffix: ' MB', label: 'vector storage', color: 'text-mint' },
  { prefix: '', value: 384, decimals: 0, suffix: '', label: 'dimensions', color: 'text-berry' },
  { prefix: '~', value: 2.3, decimals: 1, suffix: ' KB', label: 'per vector', color: 'text-accent' },
];

// The rAF equivalent of the export's motion `animate()` — no dependency; under reduced motion the final value renders immediately.
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
        <ScrollWeight from={400} to={600}>
          <h2 className="max-w-2xl font-display text-3xl leading-[1.12] tracking-tight sm:text-4xl">
            Built to keep infrastructure costs practical
          </h2>
        </ScrollWeight>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          We would rather show you the number than tell you we&rsquo;re &ldquo;ultra-efficient.&rdquo;
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <dl className="mt-12 grid grid-cols-2 gap-x-8 border-t border-line pt-8 sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((s) => (
            <div key={s.label} className="border-b border-line py-6">
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="mt-1.5 font-display text-3xl font-medium tracking-tight">
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
