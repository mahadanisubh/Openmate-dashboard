'use client';

import { useEffect } from 'react';

// Writes --scroll-y (fog depth) and --scroll-progress (0..1 read) to the document element, consumed purely in CSS so React never re-renders on scroll.
// Also renders the fixed water-fill line; with JS disabled it sits at scaleX(0) and is simply invisible.
export default function ScrollProgress() {
  useEffect(() => {
    const root = document.documentElement;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = root.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      // The depth is capped at two viewports so the fog banks stay in frame on a long page.
      const depth = Math.min(window.scrollY / window.innerHeight, 2);
      root.style.setProperty('--scroll-y', depth.toFixed(3));
      root.style.setProperty('--scroll-progress', progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      root.style.removeProperty('--scroll-y');
      root.style.removeProperty('--scroll-progress');
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[3px] bg-transparent" aria-hidden="true">
      <div
        className="water-fill h-full w-full bg-[linear-gradient(90deg,var(--color-accent),var(--color-mint),var(--color-accent-soft))] shadow-[0_0_14px_rgba(15,122,90,0.7)] transition-transform duration-150 ease-out"
      />
    </div>
  );
}