'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from 'motion/react';
import CausticField from './caustic-field.jsx';
import Reveal from './reveal.jsx';
import ScrollWeight from './scroll-weight.jsx';
import ChatWidget from './chat-widget.jsx';

const INSTALL_SNIPPET = `<script
  src="/widget.js"
  data-bot-id="YOUR_BOT_ID"
  defer
></script>`;

function CopyButton() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_SNIPPET);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
      aria-live="polite"
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
          Copy
        </>
      )}
    </button>
  );
}

const HERO_SCRIPT = [
  { from: 'visitor', text: 'Do you offer weekend appointments?' },
  {
    from: 'openmate',
    text: "Yes. We're open Saturday from 9 AM–5 PM. Sunday appointments are available by request.",
  },
  { from: 'visitor', text: 'Great — how do I book one?' },
  {
    from: 'openmate',
    text: 'You can book right here, or call us at (555) 019-4432. Would you like a Saturday morning slot?',
  },
];

export default function Hero({ signedIn = false }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // The headline gains weight as it leaves the viewport; no vertical lift — the text is registered to the banner.
  const weight = useTransform(scrollYProgress, [0, 1], [500, 900]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.35]);

  // Pointer parallax for depth; desktop only — touch never fires a pointer and reduced motion leaves both at rest.
  const px = useSpring(useMotionValue(0), { stiffness: 60, damping: 20, mass: 0.6 });
  const py = useSpring(useMotionValue(0), { stiffness: 60, damping: 20, mass: 0.6 });
  const imgX = useTransform(px, [-1, 1], [-14, 14]);
  const imgY = useTransform(py, [-1, 1], [-10, 10]);
  const causticX = useTransform(px, [-1, 1], [20, -20]);
  const causticY = useTransform(py, [-1, 1], [14, -14]);

  const onPointer = (event) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    py.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section id="top" ref={ref} className="relative isolate overflow-hidden">
      {/* The banner fills the viewport; the nav overlays its top rather than sitting in a bar above it. */}
      <div
        className="relative h-svh min-h-[560px] w-full overflow-hidden bg-ink-panel"
        onPointerMove={onPointer}
        onPointerLeave={onLeave}
      >
        <motion.div
          className="animate-water-rise block h-full w-full"
          style={reduce ? undefined : { x: imgX, y: imgY }}
        >
          <picture className="block h-full w-full">
            <source srcSet="/hero.webp" type="image/webp" />
            <img
              src="/hero.jpg"
              alt="The OpenMate assistant answering a customer question on a business website"
              width={1600}
              height={900}
              className="block h-full w-full animate-hero-drift object-cover object-center"
              fetchPriority="high"
            />
          </picture>
        </motion.div>

        {/* Emerald grade so the photograph reads as one image with the page, not a pasted-in picture. */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,rgba(10,52,40,0.32)_0%,rgba(16,60,46,0.12)_46%,rgba(15,122,90,0.14)_100%)] mix-blend-multiply"
          aria-hidden="true"
        />

        {/* Caustic light drifting opposite the image — the backdrop's shimmer, so the hero belongs to the page. */}
        <motion.div className="pointer-events-none absolute inset-0" aria-hidden="true" style={reduce ? undefined : { x: causticX, y: causticY }}>
          {/* Scaled past the viewport so the counter-drift never exposes an edge. */}
          <div className="absolute -inset-[8%]">
            <CausticField className="h-full w-full mix-blend-screen opacity-70" flow={0.35} filmBase={0} filmScale={0.85} rowFade={false} tint={[0.6, 1, 0.85]} />
          </div>
        </motion.div>

        {/* A light band over the banner, fading to nothing at both edges so it never reads as a panel sliding. */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="animate-hero-sweep absolute inset-y-[-20%] left-0 w-1/3 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.14)_50%,rgba(255,255,255,0)_100%)]" />
        </div>

        <div className="absolute inset-0 flex items-start">
          {/* The scrim releases before the image's right half so the banner reads as an asset, not a dark panel. */}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(16,36,29,0.90)_0%,rgba(16,36,29,0.80)_42%,rgba(16,36,29,0.55)_68%,rgba(16,36,29,0)_92%)]"
            aria-hidden="true"
          />
          {/* Top padding accounts for the ~4rem nav now that the header is out of flow. */}
          <div className="relative w-full px-6 pt-30 sm:px-10 sm:pt-36 lg:px-16 lg:pt-42 xl:pt-46">
            {/* The supporting statement is set light and small so the headline carries the weight. */}
            <Reveal delay={0.02}>
              <p className="max-w-2xl font-display text-[clamp(1rem,1.5vw,1.35rem)] font-light leading-snug tracking-[0.01em] text-white/75 [text-shadow:0_2px_10px_rgba(0,0,0,0.35)]">
                Turn your business knowledge into a{' '}
                <span className="font-normal text-white">24/7 AI assistant.</span>
              </p>
            </Reveal>

            <motion.h1
              className="mt-4 font-display leading-[1.03] tracking-tight text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.4)] sm:mt-5 lg:mt-6"
              style={reduce ? undefined : { fontWeight: weight, opacity: fade }}
            >
              <span className="block text-[clamp(1.75rem,4vw,5rem)] font-medium">Your website should</span>
              <span className="block text-[clamp(1.75rem,4vw,5rem)] font-extrabold">answer customers.</span>
              <span className="mt-5 block text-[clamp(1.75rem,4vw,5rem)] font-black text-mint italic sm:mt-7 lg:mt-9">
                Even at 2&nbsp;AM.
              </span>
            </motion.h1>

            {/* The banner's CTA sits directly under the headline — the page's single strongest ask. */}
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center lg:mt-12">
                <a
                  href={signedIn ? '/dashboard' : '/create-assistant'}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_36px_-12px_rgba(15,122,90,0.9)] ring-1 ring-white/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_20px_46px_-12px_rgba(15,122,90,1)]"
                >
                  {signedIn ? 'Go to dashboard' : 'Create your assistant'}
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="/docs"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20"
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="10" cy="10" r="7" />
                    <path d="M8 7.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
                  </svg>
                  See how it works
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-5 text-sm text-white/70 sm:mt-6">
                Free to start &middot; One script tag &middot; Live in about 3 minutes
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Supporting content on clean paper below the banner — nothing layered over the image. */}
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid items-start gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <ScrollWeight from={500} to={800}>
                <h2 className="max-w-xl font-display text-3xl leading-[1.12] tracking-tight sm:text-4xl">
                  Built for the questions you answer every day.
                </h2>
              </ScrollWeight>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Connect your business knowledge, add one simple script to your website, and let OpenMate
                answer your customers&rsquo; questions &mdash; even when you&rsquo;re not there.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={signedIn ? '/dashboard' : '/create-assistant'}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                >
                  {signedIn ? 'Go to dashboard' : 'Create your assistant'}
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="/docs"
                  className="inline-flex items-center justify-center rounded-full border border-line-strong bg-surface px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
                >
                  See how it works
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
                <div>
                  <dt className="font-display text-2xl font-medium tracking-tight text-ink">24/7</dt>
                  <dd className="mt-1 text-xs leading-snug text-muted">always answering</dd>
                </div>
                <div>
                  <dt className="font-display text-2xl font-medium tracking-tight text-ink">3 min</dt>
                  <dd className="mt-1 text-xs leading-snug text-muted">to install</dd>
                </div>
                <div>
                  <dt className="font-display text-2xl font-medium tracking-tight text-ink">1</dt>
                  <dd className="mt-1 text-xs leading-snug text-muted">script tag</dd>
                </div>
              </dl>
            </Reveal>

            {/* The whole install shown rather than described. The bot id is a placeholder: a fabricated one would be a claim the product cannot back (02 §6). */}
            <Reveal delay={0.22}>
              <div className="mt-10 max-w-xl overflow-hidden rounded-2xl border border-line bg-ink-panel">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">
                    Your install
                  </p>
                  <CopyButton />
                </div>
                <pre className="overflow-x-auto px-5 py-5 text-[13px] leading-relaxed text-white/85">
                  <code>{INSTALL_SNIPPET}</code>
                </pre>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="rounded-2xl border border-line bg-surface p-5 shadow-[0_18px_44px_-30px_rgba(31,26,20,0.4)]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold tracking-tight text-ink">Live example</p>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-count" />
                  online
                </span>
              </div>
              <div className="mt-4">
                <ChatWidget script={HERO_SCRIPT} subtitle="Riverside Dental" />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 grid gap-6 border-t border-line pt-10 sm:grid-cols-3 sm:gap-0">
            <p className="font-display text-xl leading-tight tracking-tight sm:pr-8 sm:text-2xl">
              Your knowledge.
            </p>
            <p className="font-display text-xl leading-tight tracking-tight sm:border-l sm:border-line sm:px-8 sm:text-2xl">
              Your website.
            </p>
            <p className="font-display text-xl leading-tight tracking-tight text-accent sm:border-l sm:border-line sm:pl-8 sm:text-2xl">
              Always-on customer support.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
