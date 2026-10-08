'use client';

import { useEffect } from 'react';

// The scroll driver for the marketing ambience. It writes two custom properties to the document
// element and nothing else:
//   --scroll-y        the scroll position as a multiple of viewport height (drives fog depth)
//   --scroll-progress the 0..1 fraction of the page read (drives the water-fill line)
// Both are consumed purely in CSS (see globals.css), so React never re-renders on scroll — the
// rAF-throttled listener updates the two variables directly. It also renders the fixed water-fill
// line at the top of the viewport: the page's progress as a rising green column. With JS disabled
// the line sits at scaleX(0) and is simply invisible, so the no-JS page is unaffected.
export default function ScrollProgress() {
  useEffect(() => {
    const root = document.documentElement;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = root.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      // The parallax is a hero-to-content transition, not an endless ride; capping the depth keeps
      // the fog banks in frame instead of letting them drift off the top of a long page.
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