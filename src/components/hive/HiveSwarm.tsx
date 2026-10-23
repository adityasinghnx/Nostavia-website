import React, { useEffect, useRef } from 'react';
import { cn } from '../../lib/cn';

/* ─────────────────────────────────────────────────────────────────────────────
 * The Hive, drawn in light: seven honeycomb cells traced by points that breathe
 * slowly and part around the pointer. Now and then a small job label fades in
 * beside an outer cell. Plain canvas 2D. Pauses off-screen and in background
 * tabs; one still frame for reduced motion.
 * ──────────────────────────────────────────────────────────────────────────── */

type Kind = 'edge' | 'vertex' | 'fill' | 'core';

interface Dot {
  nx: number; // home, in cell-radius units
  ny: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  orbit: number;
  spin: number;
  size: number;
  alpha: number;
}

interface Mote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
}

const JOBS = ['Report delivered', 'Call answered', 'Re-test booked', 'Brief ready', 'Portal updated', 'Question answered', 'Pickup scheduled'];

const SQ3 = Math.sqrt(3);

const hexCorners = (cx: number, cy: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return [cx + Math.cos(a), cy + Math.sin(a)] as [number, number];
  });

/** Home positions for the seven-cell honeycomb, in units of cell radius. The centre cell is drawn brighter. */
const buildHive = (perEdge: number, fill: number) => {
  const centers: [number, number][] = [[0, 0]];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    centers.push([SQ3 * Math.cos(a), SQ3 * Math.sin(a)]);
  }
  const homes: { x: number; y: number; kind: Kind }[] = [];
  const seenEdge = new Set<string>();
  const seenVertex = new Set<string>();
  const key = (x: number, y: number) => `${Math.round(x * 100)}:${Math.round(y * 100)}`;

  centers.forEach(([cx, cy], cell) => {
    const c = hexCorners(cx, cy);
    for (let i = 0; i < 6; i++) {
      const [x1, y1] = c[i];
      const [x2, y2] = c[(i + 1) % 6];
      const vk = key(x1, y1);
      if (!seenVertex.has(vk)) {
        seenVertex.add(vk);
        homes.push({ x: x1, y: y1, kind: 'vertex' });
      }
      const ek = key((x1 + x2) / 2, (y1 + y2) / 2);
      if (seenEdge.has(ek)) continue;
      seenEdge.add(ek);
      for (let k = 1; k < perEdge; k++) {
        const t = k / perEdge;
        homes.push({ x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t, kind: cell === 0 ? 'core' : 'edge' });
      }
    }
  });

  for (let i = 0; i < 70; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 0.7 * Math.sqrt(Math.random());
    homes.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, kind: 'fill' });
  }
  for (let i = 0; i < fill; i++) {
    const [cx, cy] = centers[Math.floor(Math.random() * centers.length)];
    const a = Math.random() * Math.PI * 2;
    const r = 0.78 * Math.sqrt(Math.random());
    homes.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, kind: 'fill' });
  }
  return homes;
};

const look: Record<Kind, () => { size: number; alpha: number; orbit: number }> = {
  vertex: () => ({ size: 1.9, alpha: 0.95, orbit: 0.015 + Math.random() * 0.02 }),
  core: () => ({ size: 1.4 + Math.random() * 0.4, alpha: 0.75 + Math.random() * 0.25, orbit: 0.015 + Math.random() * 0.025 }),
  edge: () => ({ size: 1.05 + Math.random() * 0.5, alpha: 0.42 + Math.random() * 0.35, orbit: 0.015 + Math.random() * 0.03 }),
  fill: () => ({ size: 0.7 + Math.random() * 0.6, alpha: 0.14 + Math.random() * 0.2, orbit: 0.05 + Math.random() * 0.08 }),
};

export interface HiveSwarmProps {
  className?: string;
  /** Hive centre as a fraction of the canvas, wide screens. */
  anchor?: { x: number; y: number };
  /** Hive centre on narrow screens. */
  mobileAnchor?: { x: number; y: number };
  /** Cell radius as a fraction of the shorter canvas side. */
  scale?: number;
  /** Small "Report delivered" labels beside the hive, wide screens only. */
  jobs?: boolean;
  /** Keep labels out of the left part of the canvas (where the headline sits). */
  avoidLeft?: number;
}

export const HiveSwarm: React.FC<HiveSwarmProps> = ({
  className,
  anchor = { x: 0.7, y: 0.5 },
  mobileAnchor = { x: 0.5, y: 0.34 },
  scale = 0.15,
  jobs = true,
  avoidLeft = 0.42,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chipLayer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let R = 60;
    let cx = 0;
    let cy = 0;
    let narrow = false;
    let running = true;
    let visible = true;
    let raf = 0;
    let last = performance.now();
    let labelClock = 0;
    let time = 0;
    const pointer = { x: -9999, y: -9999, px: 0, py: 0, tx: 0, ty: 0 };

    const dots: Dot[] = buildHive(9, 110).map((hm) => ({
      nx: hm.x,
      ny: hm.y,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      phase: Math.random() * Math.PI * 2,
      spin: (Math.random() < 0.5 ? -1 : 1) * (0.25 + Math.random() * 0.5),
      ...look[hm.kind](),
    }));

    const motes: Mote[] = Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.004,
      vy: -0.0015 - Math.random() * 0.004,
      r: 0.4 + Math.random() * 0.9,
      a: 0.05 + Math.random() * 0.14,
    }));

    const homeX = (d: Dot) => cx + d.nx * R + Math.cos(time * d.spin + d.phase) * d.orbit * R;
    const homeY = (d: Dot) => cy + d.ny * R + Math.sin(time * d.spin + d.phase) * d.orbit * R;

    const place = () => {
      const a = narrow ? mobileAnchor : anchor;
      const breathe = 1 + Math.sin(time * 0.5) * 0.012;
      cx = w * a.x + pointer.px * 14;
      cy = h * a.y + pointer.py * 10;
      R = Math.min(w, h) * (narrow ? scale * 1.1 : scale) * breathe;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      narrow = w < 768;
      place();
      dots.forEach((d) => {
        d.x = homeX(d);
        d.y = homeY(d);
      });
    };

    /* Job labels: a small pool of DOM chips that fade in beside the hive. */
    const chips: { el: HTMLDivElement; busy: boolean; x: number; y: number }[] = [];
    if (jobs && chipLayer.current) {
      for (let i = 0; i < 2; i++) {
        const el = document.createElement('div');
        el.className =
          'absolute left-0 top-0 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[rgba(242,237,227,0.12)] bg-[rgba(16,14,12,0.78)] px-2.5 py-1 font-mono text-[10.5px] tracking-[0.02em] text-[rgba(242,237,227,0.82)] opacity-0 transition-[opacity,transform] duration-[900ms] ease-out backdrop-blur';
        el.innerHTML = '<span style="width:5px;height:5px;border-radius:9px;background:#F2D27A;display:inline-block"></span><span></span>';
        chipLayer.current.appendChild(el);
        chips.push({ el, busy: false, x: 0, y: 0 });
      }
    }
    let jobIndex = 0;
    const showJob = (x: number, y: number) => {
      // Wide screens only, and only in the clear space above the headline
      if (!jobs || w < 1100 || y > h * 0.42 || x < w * avoidLeft) return;
      if (chips.some((c) => c.busy && Math.hypot(c.x - x, c.y - y) < 220)) return;
      const chip = chips.find((c) => !c.busy);
      if (!chip) return;
      chip.busy = true;
      chip.x = x;
      chip.y = y;
      (chip.el.lastChild as HTMLSpanElement).textContent = JOBS[jobIndex++ % JOBS.length];
      chip.el.style.transform = `translate(${x}px, ${y - 14}px) translate(-50%, -100%)`;
      requestAnimationFrame(() => {
        chip.el.style.opacity = '1';
        chip.el.style.transform = `translate(${x}px, ${y - 20}px) translate(-50%, -100%)`;
      });
      window.setTimeout(() => {
        chip.el.style.opacity = '0';
        window.setTimeout(() => (chip.busy = false), 900);
      }, 3200);
    };

    const step = (dt: number) => {
      time += dt;
      pointer.px += (pointer.tx - pointer.px) * Math.min(1, dt * 2);
      pointer.py += (pointer.ty - pointer.py) * Math.min(1, dt * 2);
      place();

      labelClock += dt;
      if (labelClock > 1.4) {
        labelClock = 0;
        const d = dots[Math.floor(Math.random() * dots.length)];
        if (Math.hypot(d.nx, d.ny) > 1.9) showJob(d.x, d.y);
      }

      for (const d of dots) {
        d.vx += (homeX(d) - d.x) * 7 * dt;
        d.vy += (homeY(d) - d.y) * 7 * dt;
        const dx = d.x - pointer.x;
        const dy = d.y - pointer.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 100 * 100 && dist2 > 0.01) {
          const dist = Math.sqrt(dist2);
          const f = (1 - dist / 100) * 700 * dt;
          d.vx += (dx / dist) * f;
          d.vy += (dy / dist) * f;
        }
        d.vx *= Math.pow(0.02, dt);
        d.vy *= Math.pow(0.02, dt);
        d.x += d.vx * dt;
        d.y += d.vy * dt;
      }

      for (const m of motes) {
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        if (m.y < -0.02) {
          m.y = 1.02;
          m.x = Math.random();
        }
        if (m.x < -0.02) m.x = 1.02;
        if (m.x > 1.02) m.x = -0.02;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
      for (const m of motes) {
        ctx.fillStyle = `rgba(242,237,227,${m.a})`;
        ctx.beginPath();
        ctx.arc(m.x * w, m.y * h, m.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'lighter';
      for (const d of dots) {
        const alpha = d.alpha * (0.85 + Math.sin(time * 0.9 + d.phase) * 0.15);
        if (d.size > 1.7) {
          ctx.fillStyle = 'rgba(242,210,122,0.08)';
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.size * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(242,210,122,${alpha})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    const loop = (now: number) => {
      raf = 0;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      step(dt);
      draw();
      if (running && visible) raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (raf || reduce) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduce) draw();
    else start();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);

    const onVisibility = () => {
      running = !document.hidden;
      if (running) start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.tx = (pointer.x / rect.width - 0.5) * 2;
      pointer.ty = (pointer.y / rect.height - 0.5) * 2;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -9999;
      pointer.tx = pointer.ty = 0;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('pointerleave', onLeave);
      chips.forEach((c) => c.el.remove());
    };
  }, [anchor.x, anchor.y, mobileAnchor.x, mobileAnchor.y, scale, jobs, avoidLeft]);

  return (
    <div className={cn('absolute inset-0', className)} aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div ref={chipLayer} className="absolute inset-0 pointer-events-none" />
    </div>
  );
};
