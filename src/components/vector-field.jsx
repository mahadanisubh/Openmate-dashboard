'use client';

import { useEffect, useRef } from 'react';

// Embedding-space retrieval drawn: dots are documents, the bright node a query; reduced motion renders the settled frame.
// Cost discipline (full-viewport): one shared rAF at `fps`, partial k-selection, a pre-rendered halo sprite, pauses off-screen.
export default function VectorField({
  density = 64,
  neighbors = 6,
  fps = 30,
  dprCap = 1.5,
  speed = 0.16,
  dotColor = 'var(--color-ink)',
  accentColor = 'var(--color-accent)',
  idleColor = 'var(--color-faint)',
  dotAlpha = 0.5,
  className = '',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    const frameInterval = 1000 / Math.max(fps, 1);

    let width = 0;
    let height = 0;
    let dots = [];
    let frame;
    let last = 0;
    let onScreen = true;
    let tabVisible = true;

    const resolve = (token) => {
      if (!token.startsWith('var(')) return token;
      const name = token.slice(4, -1).trim();
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#0f7a5a';
    };

    // Colours and their alpha variants are encoded once for the life of the effect.
    const toRgb = (hex) => {
      const c = hex.replace('#', '');
      if (c.length !== 6) return [15, 122, 90];
      return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)];
    };
    const rgb = (hex, a) => {
      const [r, g, b] = toRgb(hex);
      return `rgba(${r},${g},${b},${a})`;
    };

    const ink = resolve(dotColor);
    const accent = resolve(accentColor);
    const idle = resolve(idleColor);

    // Pre-rendered query halo: a 64px sprite, drawn per frame instead of building a gradient.
    const HALO = 32;
    const halo = document.createElement('canvas');
    halo.width = HALO * 2;
    halo.height = HALO * 2;
    const hctx = halo.getContext('2d');
    const grad = hctx.createRadialGradient(HALO, HALO, 0, HALO, HALO, HALO);
    grad.addColorStop(0, rgb(accent, 0.4));
    grad.addColorStop(0.45, rgb(accent, 0.14));
    grad.addColorStop(1, rgb(accent, 0));
    hctx.fillStyle = grad;
    hctx.fillRect(0, 0, HALO * 2, HALO * 2);

    const seed = (i) => {
      const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = Array.from({ length: density }, (_, i) => ({
        x: seed(i) * width,
        y: seed(i + density) * height,
        vx: (seed(i + density * 2) - 0.5) * speed,
        vy: (seed(i + density * 3) - 0.5) * speed,
        r: 1.1 + seed(i + density * 4) * 1.5,
      }));
      // Scratch reused every frame so the hot loop allocates nothing.
      nearest = new Array(neighbors);
      nearestDist = new Float32Array(neighbors).fill(Infinity);
    };

    let nearest = [];
    let nearestDist = new Float32Array(neighbors).fill(Infinity);

    // Partial selection: keep only the k closest in two flat arrays. No allocation, no sort.
    const selectNearest = (qx, qy) => {
      for (let i = 0; i < neighbors; i++) {
        nearest[i] = -1;
        nearestDist[i] = Infinity;
      }
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dist = (d.x - qx) * (d.x - qx) + (d.y - qy) * (d.y - qy);
        if (dist >= nearestDist[neighbors - 1]) continue;
        let j = neighbors - 1;
        while (j > 0 && nearestDist[j - 1] > dist) {
          nearestDist[j] = nearestDist[j - 1];
          nearest[j] = nearest[j - 1];
          j--;
        }
        nearestDist[j] = dist;
        nearest[j] = i;
      }
    };

    const draw = (now) => {
      ctx.clearRect(0, 0, width, height);

      const t = now / 1000;
      const qx = width * (0.5 + Math.sin(t * 0.21) * 0.26);
      const qy = height * (0.5 + Math.cos(t * 0.17) * 0.24);

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > width) d.vx = -d.vx;
        if (d.y < 0 || d.y > height) d.vy = -d.vy;
      }

      selectNearest(qx, qy);
      const nearLimit = width * 0.5;

      ctx.lineWidth = 1;
      for (let i = 0; i < neighbors; i++) {
        const idx = nearest[i];
        if (idx < 0) continue;
        const d = dots[idx];
        const near = 1 - Math.min(nearestDist[i] / nearLimit, 1);
        ctx.strokeStyle = rgb(accent, 0.12 + near * 0.4);
        ctx.beginPath();
        ctx.moveTo(qx, qy);
        ctx.lineTo(d.x, d.y);
        ctx.stroke();
      }

      nearestSet.clear();
      for (let i = 0; i < neighbors; i++) if (nearest[i] >= 0) nearestSet.add(nearest[i]);

      ctx.fillStyle = idle;
      ctx.globalAlpha = dotAlpha;
      for (let i = 0; i < dots.length; i++) {
        if (nearestSet.has(i)) continue;
        const d = dots[i];
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.95;
      for (let i = 0; i < neighbors; i++) {
        const idx = nearest[i];
        if (idx < 0) continue;
        const d = dots[idx];
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 1.9, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      ctx.drawImage(halo, qx - HALO, qy - HALO, HALO * 2, HALO * 2);

      ctx.beginPath();
      ctx.arc(qx, qy, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = rgb(ink, 0.5);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(qx, qy, 8, 0, Math.PI * 2);
      ctx.stroke();
    };

    const nearestSet = new Set();

    const loop = (now) => {
      frame = requestAnimationFrame(loop);
      if (!onScreen || !tabVisible) return;
      if (now - last < frameInterval) return;
      last = now;
      draw(now);
    };

    const onResize = () => build();
    const onVisibility = () => {
      tabVisible = document.visibilityState === 'visible';
    };

    build();
    draw(performance.now());
    if (reduce) return;

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              onScreen = entries[0].isIntersecting;
            },
            { rootMargin: '120px' },
          )
        : null;
    if (io) io.observe(canvas);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      if (io) io.disconnect();
    };
  }, [density, neighbors, fps, dprCap, speed, dotColor, accentColor, idleColor, dotAlpha]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
