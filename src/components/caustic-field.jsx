'use client';

import { useEffect, useRef } from 'react';

// A caustic light field — refracted sunlight shimmering on a pool floor; the page's shared water texture.
// Cost discipline (full-viewport): computed at low resolution and upscaled, one shared rAF at `fps`, pauses off-screen.
export default function CausticField({
  resolution = 240,
  fps = 30,
  flow = 0.45,
  exponent = 4,
  filmBase = 0,
  filmScale = 1,
  intensity = 1,
  rowFade = true,
  tint = [0.42, 1, 0.78],
  className = '',
}) {
  const canvasRef = useRef(null);
  const [tr, tg, tb] = tint;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const frameInterval = 1000 / Math.max(fps, 1);
    const TAU = Math.PI * 2;
    const ITER = 4;
    const INTEN = 0.005;

    let width = 0;
    let height = 0;
    let frame;
    let last = 0;
    let onScreen = true;
    let tabVisible = true;

    const buffer = document.createElement('canvas');
    const bctx = buffer.getContext('2d');
    let imageData = null;
    let baseX = null;
    let baseY = null;
    let bwidth = 0;
    let bheight = 0;
    // Time-and-iteration terms are pixel-independent, so computed once per frame rather than per pixel.
    const tt = new Float32Array(ITER);

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scale = Math.max(1, width / resolution);
      bwidth = Math.max(1, Math.round(width / scale));
      bheight = Math.max(1, Math.round(height / scale));
      buffer.width = bwidth;
      buffer.height = bheight;
      imageData = bctx.createImageData(bwidth, bheight);

      // p0 = mod(uv * TAU, TAU) - 250 is time-independent, so precompute the per-axis parts once.
      baseX = new Float32Array(bwidth);
      for (let x = 0; x < bwidth; x++) baseX[x] = ((x / bwidth) * TAU) % TAU - 250;
      baseY = new Float32Array(bheight);
      for (let y = 0; y < bheight; y++) baseY[y] = ((y / bheight) * TAU) % TAU - 250;
    };

    const draw = (now) => {
      const t = (now / 1000) * flow;
      for (let n = 0; n < ITER; n++) tt[n] = t * (1 - 3.5 / (n + 1));

      const data = imageData.data;
      let idx = 0;
      for (let y = 0; y < bheight; y++) {
        const p0y = baseY[y];
        const fade = rowFade ? (1 - (y / bheight) * 0.55) * intensity : intensity;
        for (let x = 0; x < bwidth; x++) {
          const p0x = baseX[x];
          let ix = p0x;
          let iy = p0y;
          let c = 1;
          for (let n = 0; n < ITER; n++) {
            const ttN = tt[n];
            const nx = Math.cos(ttN - ix) + Math.sin(ttN + iy);
            const ny = Math.sin(ttN - iy) + Math.cos(ttN + ix);
            ix = p0x + nx;
            iy = p0y + ny;
            const dx = (p0x * INTEN) / Math.sin(ix + ttN);
            const dy = (p0y * INTEN) / Math.cos(iy + ttN);
            c += 1 / Math.sqrt(dx * dx + dy * dy);
          }
          c /= ITER;
          c = 1.17 - Math.pow(c, 1.4);
          let v = Math.pow(Math.abs(c), exponent);
          v *= fade;
          if (v > 1) v = 1;
          const a = (filmBase + v * filmScale) * 255;
          data[idx] = a * tr;
          data[idx + 1] = a * tg;
          data[idx + 2] = a * tb;
          data[idx + 3] = a;
          idx += 4;
        }
      }

      bctx.putImageData(imageData, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(buffer, 0, 0, bwidth, bheight, 0, 0, width, height);
    };

    const loop = (now) => {
      frame = requestAnimationFrame(loop);
      if (!onScreen || !tabVisible) return;
      if (now - last < frameInterval) return;
      last = now;
      draw(now);
    };

    const onResize = () => {
      build();
      draw(performance.now());
    };
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
            { rootMargin: '160px' },
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
  }, [resolution, fps, flow, exponent, filmBase, filmScale, intensity, rowFade, tr, tg, tb]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}