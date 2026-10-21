import React, { useEffect, useRef } from 'react';

interface PixelPortraitProps {
  /** RGBA PNG with the subject already cut out. */
  src: string;
  /** When true the pixels scatter in as sparkles and assemble into the portrait. */
  play: boolean;
  label?: string;
  className?: string;
}

interface Particle {
  hx: number; // home position
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  delay: number; // ms before it starts flying in
  appear: number; // 0..1
  bucket: number; // quantised colour index
}

const LEVELS = 6; // 6x6x6 colour buckets keeps fillStyle changes tiny
const levelValue = (l: number) => Math.round((l / (LEVELS - 1)) * 255);

/**
 * The photo as a field of small square pixels in their real colours. On `play` they
 * start as white sparkles scattered over the stage, fly together to form the face,
 * then settle solid and get pushed around by the cursor.
 */
export const PixelPortrait: React.FC<PixelPortraitProps> = ({ src, play, label, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (play && startRef.current === null) startRef.current = performance.now();
    if (!play) startRef.current = null;
  }, [play]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const img = new Image();
    img.src = src;

    let parts: Particle[] = [];
    let w = 0;
    let h = 0;
    let cell = 3;
    let raf = 0;
    let lastW = 0;
    const mouse = { x: -9999, y: -9999 };
    const palette: string[] = [];
    for (let r = 0; r < LEVELS; r++)
      for (let g = 0; g < LEVELS; g++)
        for (let b = 0; b < LEVELS; b++)
          palette.push(`rgb(${levelValue(r)},${levelValue(g)},${levelValue(b)})`);

    const build = () => {
      if (!img.width) return;
      canvas.style.aspectRatio = `${img.width} / ${img.height}`;
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      lastW = w;
      // if the portrait already assembled, a rebuild (resize) starts settled instead of re-scattering
      const settled = startRef.current !== null && performance.now() - startRef.current > 3500;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = w < 360 ? 2 : 3;

      const cols = Math.floor(w / cell);
      const rows = Math.floor(h / cell);
      const off = document.createElement('canvas');
      off.width = cols;
      off.height = rows;
      const octx = off.getContext('2d', { willReadFrequently: true })!;
      octx.imageSmoothingQuality = 'high';
      octx.drawImage(img, 0, 0, cols, rows);
      const data = octx.getImageData(0, 0, cols, rows).data;

      parts = [];
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const k = (j * cols + i) * 4;
          const a = data[k + 3];
          if (a < 90) continue;
          // a little static noise gives the speckled, LED-wall look
          const n = 0.82 + Math.random() * 0.36;
          let r = data[k] * n;
          let g = data[k + 1] * n;
          let b = data[k + 2] * n;
          // keep even the darkest clothing visible as a dim coloured grid
          const peak = Math.max(r, g, b);
          if (peak < 56) {
            const s = 56 / Math.max(peak, 1);
            r *= s; g *= s; b *= s;
          }
          const q = (v: number) => Math.min(LEVELS - 1, Math.max(0, Math.round((Math.min(255, v) / 255) * (LEVELS - 1))));
          const bucket = q(r) * LEVELS * LEVELS + q(g) * LEVELS + q(b);
          const hx = i * cell;
          const hy = j * cell;
          const dx = (i / cols - 0.5) * 2;
          const dy = (j / rows - 0.3) * 2;
          parts.push({
            hx,
            hy,
            x: reduced || settled ? hx : Math.random() * w,
            y: reduced || settled ? hy : Math.random() * h,
            vx: 0,
            vy: 0,
            delay: settled ? 0 : Math.random() * 600 + Math.sqrt(dx * dx + dy * dy) * 500,
            appear: reduced || settled ? 1 : 0,
            bucket,
          });
        }
      }
      parts.sort((p, q) => p.bucket - q.bucket);
    };

    const frame = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const started = startRef.current;
      if (started === null) {
        raf = requestAnimationFrame(frame);
        return;
      }
      const elapsed = now - started;
      const reach = 85;
      const size = cell - 1;
      let last = -1;

      for (let n = 0; n < parts.length; n++) {
        const p = parts[n];
        if (!reduced) {
          if (elapsed < p.delay) continue;
          p.vx += (p.hx - p.x) * 0.07;
          p.vy += (p.hy - p.y) * 0.07;
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < reach * reach && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (1 - d / reach) * 3.2;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
          p.vx *= 0.8;
          p.vy *= 0.8;
          p.x += p.vx;
          p.y += p.vy;
          if (p.appear < 1) p.appear = Math.min(1, p.appear + 0.05);
        }

        const flying = Math.abs(p.hx - p.x) + Math.abs(p.hy - p.y) > 16;
        if (flying) {
          // still travelling: tiny bright sparkle
          ctx.fillStyle = '#f4f7ff';
          ctx.fillRect(p.x, p.y, 1.6, 1.6);
          last = -1;
          continue;
        }
        if (p.bucket !== last) {
          ctx.fillStyle = palette[p.bucket];
          last = p.bucket;
        }
        const s = size * (0.4 + 0.6 * p.appear);
        ctx.fillRect(p.x, p.y, s, s);
      }

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      build();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    };
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    if (img.complete && img.width) start();
    else img.onload = start;
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    const onResize = () => {
      // ignore height-only changes (mobile address bar) so the portrait isn't rebuilt while scrolling
      if (Math.abs(canvas.getBoundingClientRect().width - lastW) > 2) start();
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, [src]);

  return <canvas ref={canvasRef} className={className} role="img" aria-label={label ?? 'Portrait'} />;
};
