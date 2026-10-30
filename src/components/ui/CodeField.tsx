import React, { useEffect, useRef } from 'react';
import { cn } from '../../lib/cn';

/* ─────────────────────────────────────────────────────────────────────────────
 * A field of code that is only seen where the pointer is. It lives in each section's
 * background, under the text, cards and photos, so it never covers content: the host
 * section needs `isolate`, and the layer sits at -z-10 above the section's own fill.
 *
 * Every layer shares one pointer, one soft cloud and one grid anchored to the page,
 * so the field runs on across section edges. Two moods:
 *   feature  hero and footer: full code (DNA bases, numbers, operators), honey core, sparks.
 *   quiet    sections in between: a sparse, faint wash of figures, so content leads.
 * Over paper sections glyphs turn to ink. Elements marked data-code-mask="/image.png"
 * inside the host are cut out by their image's alpha. Fine pointers only; nothing for
 * touch or reduced motion.
 * ──────────────────────────────────────────────────────────────────────────── */

const CELL = 15;
const FONT = '500 10.5px "Geist Mono Variable", ui-monospace, monospace';

type RGB = [number, number, number];
type Theme = 'ink' | 'paper';
export type CodeFieldVariant = 'feature' | 'quiet';

const VARIANTS: Record<
  CodeFieldVariant,
  { glyphs: string; radius: number; peak: Record<Theme, number>; density: number; glow: number; spark: number; warmth: number }
> = {
  feature: {
    glyphs: 'ACGTACGTACGT0123456789{}[]()<>/=+*#%:;.~',
    radius: 280,
    peak: { ink: 0.46, paper: 0.3 },
    density: 1,
    glow: 0.06,
    spark: 0.12,
    warmth: 1.3,
  },
  quiet: {
    glyphs: '0123456789012345.:+ACGT',
    radius: 230,
    peak: { ink: 0.2, paper: 0.13 },
    density: 0.45,
    glow: 0.02,
    spark: 0.03,
    warmth: 0.7,
  },
};

const PALETTE: Record<Theme, { base: RGB; core: RGB; glow: string }> = {
  ink: { base: [242, 237, 227], core: [242, 210, 122], glow: '242,210,122' },
  paper: { base: [22, 20, 16], core: [138, 101, 17], glow: '185,142,53' },
};

const mix = (a: RGB, b: RGB, t: number) =>
  `${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(a[2] + (b[2] - a[2]) * t)}`;

/** Stable 0..1 noise per grid cell. */
const hash = (c: number, r: number, seed: number) => {
  let h = Math.imul(c, 374761393) ^ Math.imul(r, 668265263) ^ Math.imul(seed, 2147483647);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};

/* ── Shared state: one pointer, one cloud, one page grid, one frame loop for every layer. ── */

interface Layer {
  host: HTMLDivElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  variant: CodeFieldVariant;
  theme: Theme;
  masks: HTMLElement[];
  size: number;
  shown: boolean;
}

const layers = new Set<Layer>();
const pointer = { x: 0, y: 0, inside: false, moved: 0 };
const halo = { x: 0, y: 0, s: 0, energy: 0, placed: false };
/** Cells that have rewritten themselves: glyph pick (0..1) and when they last sparked. */
const rewritten = new Map<number, { g: number; at: number }>();
const maskImages = new Map<string, HTMLImageElement>();
let raf = 0;
let last = 0;
let time = 0;
let listening = false;

const cellKey = (c: number, r: number) => r * 4096 + c;

const step = (dt: number, now: number) => {
  time += dt;
  if (pointer.inside && !halo.placed) {
    halo.x = pointer.x;
    halo.y = pointer.y;
    halo.placed = true;
  }
  const dx = pointer.x - halo.x;
  const dy = pointer.y - halo.y;
  const ease = Math.min(1, dt * 4.5);
  halo.x += dx * ease;
  halo.y += dy * ease;

  // Brighter while the pointer moves, settling to a quiet glow when it rests.
  const resting = now - pointer.moved > 1400;
  const target = !pointer.inside ? 0 : resting ? 0.5 : 1;
  halo.s += (target - halo.s) * Math.min(1, dt * (target > halo.s ? 2.4 : 1.2));
  if (halo.s < 0.003 && !pointer.inside) {
    halo.s = 0;
    halo.placed = false;
  }
  const speed = Math.min(1, Math.hypot(dx, dy) / 260);
  halo.energy += (speed - halo.energy) * Math.min(1, dt * 3);

  if (rewritten.size > 30000) rewritten.clear();
};

const hide = (l: Layer) => {
  if (!l.shown) return;
  l.shown = false;
  l.canvas.width = l.canvas.height = 0;
  l.size = 0;
};

const drawLayer = (l: Layer, dt: number, now: number) => {
  const v = VARIANTS[l.variant];
  const R = v.radius * (0.94 + halo.energy * 0.18);
  const rect = l.host.getBoundingClientRect();
  if (halo.s <= 0 || halo.x + R < rect.left || halo.x - R > rect.right || halo.y + R < rect.top || halo.y - R > rect.bottom) {
    hide(l);
    return;
  }

  const { ctx, canvas } = l;
  const size = Math.ceil(v.radius * 1.12 * 2);
  if (l.size !== size) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    canvas.style.width = canvas.style.height = `${size}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    l.size = size;
  }
  l.shown = true;

  // Canvas origin in client space, kept centred on the cloud.
  const ox = halo.x - size / 2;
  const oy = halo.y - size / 2;
  canvas.style.transform = `translate3d(${ox - rect.left}px,${oy - rect.top}px,0)`;
  ctx.clearRect(0, 0, size, size);

  const p = PALETTE[l.theme];
  const peak = v.peak[l.theme];
  const hx = halo.x - ox;
  const hy = halo.y - oy;

  const glow = ctx.createRadialGradient(hx, hy, 0, hx, hy, R);
  glow.addColorStop(0, `rgba(${p.glow},${v.glow * halo.s})`);
  glow.addColorStop(0.5, `rgba(${p.glow},${v.glow * 0.33 * halo.s})`);
  glow.addColorStop(1, `rgba(${p.glow},0)`);
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);

  ctx.font = FONT;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Page grid, so glyphs scroll with the content and line up across sections.
  const sx = window.scrollX;
  const sy = window.scrollY;
  const c0 = Math.floor((Math.max(rect.left, halo.x - R) + sx) / CELL);
  const c1 = Math.floor((Math.min(rect.right, halo.x + R) + sx) / CELL);
  const r0 = Math.floor((Math.max(rect.top, halo.y - R) + sy) / CELL);
  const r1 = Math.floor((Math.min(rect.bottom, halo.y + R) + sy) / CELL);
  const sigma2 = 2 * (R / 2.7) ** 2;
  const rate = 0.18 + halo.energy * 0.9;
  const glyphs = v.glyphs;

  for (let r = r0; r <= r1; r++) {
    const y = r * CELL + CELL / 2 - sy - oy;
    for (let c = c0; c <= c1; c++) {
      if (v.density < 1 && hash(c, r, 7) > v.density) continue;
      const x = c * CELL + CELL / 2 - sx - ox;
      const dx = x - hx;
      const dy = y - hy;
      // A slowly drifting outline, so the cloud is never a circle.
      const th = Math.atan2(dy, dx);
      const warp = 1 + 0.14 * Math.sin(3 * th + time * 0.35) + 0.09 * Math.sin(5 * th - time * 0.27);
      const d2 = (dx * dx + dy * dy) * warp * warp;
      if (d2 >= R * R) continue;
      const f = Math.exp(-d2 / sigma2) * (0.5 + hash(c, r, 3) * 0.5);
      if (f < 0.015) continue;

      const key = cellKey(c, r);
      let cell = rewritten.get(key);
      if (Math.random() < rate * f * f * dt * 2.5) {
        cell = { g: Math.random(), at: f > 0.4 && Math.random() < v.spark ? now : -1e9 };
        rewritten.set(key, cell);
      }
      const g = cell ? cell.g : hash(c, r, 11);
      const spark = cell ? Math.max(0, 1 - (now - cell.at) / 650) : 0;

      const a = Math.min(1, (f * peak + spark * peak) * halo.s);
      if (a < 0.006) continue;
      ctx.fillStyle = `rgba(${mix(p.base, p.core, Math.min(1, f * v.warmth + spark))},${a.toFixed(3)})`;
      ctx.fillText(glyphs[Math.floor(g * glyphs.length)], x, y);
    }
  }

  if (l.masks.length) {
    ctx.globalCompositeOperation = 'destination-out';
    for (const el of l.masks) {
      const src = el.dataset.codeMask!;
      let img = maskImages.get(src);
      if (!img) {
        img = new Image();
        img.src = src;
        maskImages.set(src, img);
      }
      if (!img.complete || !img.naturalWidth) continue;
      const m = el.getBoundingClientRect();
      ctx.drawImage(img, m.left - ox, m.top - oy, m.width, m.height);
    }
    ctx.globalCompositeOperation = 'source-over';
  }
};

const loop = (now: number) => {
  raf = 0;
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  step(dt, now);
  for (const l of layers) drawLayer(l, dt, now);
  if (!document.hidden && (halo.s > 0 || pointer.inside)) raf = requestAnimationFrame(loop);
};

const start = () => {
  if (raf || document.hidden || !layers.size) return;
  last = performance.now();
  raf = requestAnimationFrame(loop);
};

const listen = () => {
  if (listening) return;
  listening = true;
  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.inside = true;
      pointer.moved = performance.now();
      start();
    },
    { passive: true },
  );
  const leave = () => {
    pointer.inside = false;
  };
  document.documentElement.addEventListener('pointerleave', leave);
  window.addEventListener('blur', leave);
  document.addEventListener('visibilitychange', start);
  // Draw with the mono face once it has loaded, not the fallback.
  document.fonts?.load(FONT).catch(() => undefined);
};

export interface CodeFieldProps {
  variant?: CodeFieldVariant;
  className?: string;
}

/** Place as a direct child of an `isolate` section. */
export const CodeField: React.FC<CodeFieldProps> = ({ variant = 'quiet', className }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const host = hostRef.current!;
    const canvas = canvasRef.current!;
    const section = host.parentElement!;
    const layer: Layer = {
      host,
      canvas,
      ctx: canvas.getContext('2d')!,
      variant,
      theme: section.closest('[data-theme]')?.getAttribute('data-theme') === 'paper' ? 'paper' : 'ink',
      masks: Array.from(section.querySelectorAll<HTMLElement>('[data-code-mask]')),
      size: 0,
      shown: false,
    };
    layers.add(layer);
    listen();
    start();
    return () => {
      layers.delete(layer);
      hide(layer);
    };
  }, [variant]);

  return (
    <div ref={hostRef} aria-hidden="true" className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      <canvas ref={canvasRef} className="absolute left-0 top-0 will-change-transform" />
    </div>
  );
};
