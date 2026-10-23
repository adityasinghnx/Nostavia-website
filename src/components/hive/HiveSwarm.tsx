import React, { useEffect, useRef } from 'react';
import { cn } from '../../lib/cn';

/* ─────────────────────────────────────────────────────────────────────────────
 * The Hive, drawn in particles: seven honeycomb cells traced by dots, with Bees
 * that leave the hive, do a job, and come back. Plain canvas 2D, ~600 dots.
 * Pauses off-screen and in background tabs; one still frame for reduced motion.
 * ──────────────────────────────────────────────────────────────────────────── */

type State = 0 | 1 | 2 | 3; // home, outbound, working, inbound

interface Dot {
  nx: number; // home, in hive units
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
  state: State;
  t: number;
  dur: number;
  ax: number;
  ay: number;
  bx: number;
  by: number;
  kx: number;
  ky: number;
  trail: number[];
  canWork: boolean;
}

interface Mote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
}

const JOBS = ['Report sent', 'Call answered', 'Re-test booked', 'Brief ready', 'Follow-up sent', 'Plan updated', 'Pickup scheduled'];

const SQ3 = Math.sqrt(3);

const hexCorners = (cx: number, cy: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return [cx + Math.cos(a), cy + Math.sin(a)] as [number, number];
  });

/** Home positions for the seven-cell honeycomb, in units of cell radius. */
const buildHive = (perEdge: number, fill: number) => {
  const centers: [number, number][] = [[0, 0]];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    centers.push([SQ3 * Math.cos(a), SQ3 * Math.sin(a)]);
  }
  const homes: { x: number; y: number; kind: 'edge' | 'vertex' | 'fill' }[] = [];
  const seenEdge = new Set<string>();
  const seenVertex = new Set<string>();
  const key = (x: number, y: number) => `${Math.round(x * 100)}:${Math.round(y * 100)}`;

  centers.forEach(([cx, cy]) => {
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
        homes.push({ x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t, kind: 'edge' });
      }
    }
  });

  for (let i = 0; i < fill; i++) {
    const [cx, cy] = centers[Math.floor(Math.random() * centers.length)];
    const a = Math.random() * Math.PI * 2;
    const r = 0.78 * Math.sqrt(Math.random());
    homes.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, kind: 'fill' });
  }
  return homes;
};

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export interface HiveSwarmProps {
  className?: string;
  /** Hive centre as a fraction of the canvas, wide screens. */
  anchor?: { x: number; y: number };
  /** Hive centre on narrow screens. */
  mobileAnchor?: { x: number; y: number };
  /** Cell radius as a fraction of the shorter canvas side. */
  scale?: number;
  /** Small "Report sent" labels where Bees land. */
  jobs?: boolean;
  /** Keep Bees and labels out of the left part of the canvas (where the headline sits). */
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
    let dpr = 1;
    let R = 60;
    let cx = 0;
    let cy = 0;
    let narrow = false;
    let running = true;
    let visible = true;
    let raf = 0;
    let last = performance.now();
    let launchClock = 0;
    let time = 0;
    const pointer = { x: -9999, y: -9999, px: 0, py: 0, tx: 0, ty: 0 };

    const homes = buildHive(9, 110);
    const dots: Dot[] = homes.map((hm) => ({
      nx: hm.x,
      ny: hm.y,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      phase: Math.random() * Math.PI * 2,
      orbit: hm.kind === 'fill' ? 0.05 + Math.random() * 0.08 : 0.015 + Math.random() * 0.03,
      spin: (Math.random() < 0.5 ? -1 : 1) * (0.4 + Math.random() * 0.9),
      size: hm.kind === 'vertex' ? 1.9 : hm.kind === 'edge' ? 1.05 + Math.random() * 0.5 : 0.7 + Math.random() * 0.6,
      alpha: hm.kind === 'vertex' ? 0.95 : hm.kind === 'edge' ? 0.42 + Math.random() * 0.35 : 0.14 + Math.random() * 0.2,
      state: 0,
      t: 0,
      dur: 1,
      ax: 0,
      ay: 0,
      bx: 0,
      by: 0,
      kx: 0,
      ky: 0,
      trail: [],
      canWork: hm.kind !== 'vertex',
    }));

    const motes: Mote[] = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.006,
      vy: -0.002 - Math.random() * 0.006,
      r: 0.4 + Math.random() * 0.9,
      a: 0.05 + Math.random() * 0.16,
    }));

    const homeX = (d: Dot) => cx + d.nx * R + Math.cos(time * d.spin + d.phase) * d.orbit * R;
    const homeY = (d: Dot) => cy + d.ny * R + Math.sin(time * d.spin + d.phase) * d.orbit * R;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      narrow = w < 768;
      const a = narrow ? mobileAnchor : anchor;
      R = Math.min(w, h) * (narrow ? scale * 1.1 : scale);
      cx = w * a.x;
      cy = h * a.y;
      dots.forEach((d) => {
        if (d.state === 0) {
          d.x = homeX(d);
          d.y = homeY(d);
        }
      });
    };

    /* Where a Bee goes to work: around the hive, away from the headline. */
    const pickDestination = () => {
      for (let i = 0; i < 14; i++) {
        const ang = Math.random() * Math.PI * 2;
        const dist = R * (2.6 + Math.random() * 1.6);
        const x = cx + Math.cos(ang) * dist * 1.25;
        const y = cy + Math.sin(ang) * dist * 0.85;
        if (x < 24 || x > w - 24 || y < 90 || y > h - 40) continue;
        if (!narrow && x < w * avoidLeft) continue;
        return [x, y] as const;
      }
      return null;
    };

    const curve = (d: Dot, fromX: number, fromY: number, toX: number, toY: number) => {
      const mx = (fromX + toX) / 2;
      const my = (fromY + toY) / 2;
      const dx = toX - fromX;
      const dy = toY - fromY;
      const bend = (Math.random() - 0.5) * 0.9;
      d.ax = fromX;
      d.ay = fromY;
      d.bx = toX;
      d.by = toY;
      d.kx = mx - dy * bend;
      d.ky = my + dx * bend;
      d.t = 0;
      d.dur = 1.6 + Math.hypot(dx, dy) / 260;
    };

    /* Job labels: a small pool of DOM chips placed where Bees land. */
    const chips: { el: HTMLDivElement; busy: boolean; x: number; y: number }[] = [];
    if (jobs && chipLayer.current) {
      for (let i = 0; i < 3; i++) {
        const el = document.createElement('div');
        el.className =
          'absolute left-0 top-0 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[rgba(242,237,227,0.12)] bg-[rgba(16,14,12,0.78)] px-2.5 py-1 font-mono text-[10.5px] tracking-[0.02em] text-[rgba(242,237,227,0.82)] opacity-0 transition-[opacity,transform] duration-500 ease-out backdrop-blur';
        el.innerHTML = '<span style="width:5px;height:5px;border-radius:9px;background:#F2D27A;display:inline-block"></span><span></span>';
        chipLayer.current.appendChild(el);
        chips.push({ el, busy: false, x: 0, y: 0 });
      }
    }
    let jobIndex = 0;
    const showJob = (x: number, y: number) => {
      if (!jobs || narrow || Math.random() > 0.42) return;
      if (chips.some((c) => c.busy && Math.hypot(c.x - x, c.y - y) < 150)) return;
      const chip = chips.find((c) => !c.busy);
      if (!chip) return;
      chip.busy = true;
      chip.x = x;
      chip.y = y;
      (chip.el.lastChild as HTMLSpanElement).textContent = JOBS[jobIndex++ % JOBS.length];
      chip.el.style.transform = `translate(${x}px, ${y - 18}px) translate(-50%, -100%)`;
      requestAnimationFrame(() => {
        chip.el.style.opacity = '1';
        chip.el.style.transform = `translate(${x}px, ${y - 24}px) translate(-50%, -100%)`;
      });
      window.setTimeout(() => {
        chip.el.style.opacity = '0';
        window.setTimeout(() => (chip.busy = false), 500);
      }, 1700);
    };

    const step = (dt: number) => {
      time += dt;
      // Pointer parallax on the hive centre
      pointer.px += (pointer.tx - pointer.px) * Math.min(1, dt * 2.5);
      pointer.py += (pointer.ty - pointer.py) * Math.min(1, dt * 2.5);
      const a = narrow ? mobileAnchor : anchor;
      const breathe = 1 + Math.sin(time * 0.7) * 0.012;
      cx = w * a.x + pointer.px * 14;
      cy = h * a.y + pointer.py * 10;
      const baseR = Math.min(w, h) * (narrow ? scale * 1.1 : scale);
      R = baseR * breathe;

      // Launch Bees
      launchClock += dt;
      const working = dots.reduce((n, d) => n + (d.state !== 0 ? 1 : 0), 0);
      const maxWorking = narrow ? 10 : 26;
      if (!reduce && launchClock > 0.11 && working < maxWorking) {
        launchClock = 0;
        const d = dots[Math.floor(Math.random() * dots.length)];
        const dest = d.canWork && d.state === 0 ? pickDestination() : null;
        if (dest) {
          curve(d, d.x, d.y, dest[0], dest[1]);
          d.state = 1;
          d.trail = [];
        }
      }

      for (const d of dots) {
        if (d.state === 0) {
          const tx = homeX(d);
          const ty = homeY(d);
          d.vx += (tx - d.x) * 9 * dt;
          d.vy += (ty - d.y) * 9 * dt;
          const dx = d.x - pointer.x;
          const dy = d.y - pointer.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 110 * 110 && dist2 > 0.01) {
            const dist = Math.sqrt(dist2);
            const f = (1 - dist / 110) * 1400 * dt;
            d.vx += (dx / dist) * f;
            d.vy += (dy / dist) * f;
          }
          d.vx *= Math.pow(0.02, dt);
          d.vy *= Math.pow(0.02, dt);
          d.x += d.vx * dt;
          d.y += d.vy * dt;
        } else if (d.state === 1 || d.state === 3) {
          d.t += dt / d.dur;
          if (d.state === 3) {
            // Home moves with the breathing hive; keep the landing point current
            d.bx = homeX(d);
            d.by = homeY(d);
          }
          const t = easeInOut(Math.min(1, d.t));
          const u = 1 - t;
          d.x = u * u * d.ax + 2 * u * t * d.kx + t * t * d.bx;
          d.y = u * u * d.ay + 2 * u * t * d.ky + t * t * d.by;
          d.trail.push(d.x, d.y);
          if (d.trail.length > 28) d.trail.splice(0, 2);
          if (d.t >= 1) {
            if (d.state === 1) {
              d.state = 2;
              d.t = 0;
              d.dur = 0.8 + Math.random() * 0.9;
              showJob(d.x, d.y);
            } else {
              d.state = 0;
              d.vx = d.vy = 0;
              d.trail = [];
            }
          }
        } else {
          d.t += dt / d.dur;
          d.x += Math.cos(time * 9 + d.phase) * 0.35;
          d.y += Math.sin(time * 11 + d.phase) * 0.35;
          if (d.trail.length) d.trail.splice(0, 2);
          if (d.t >= 1) {
            curve(d, d.x, d.y, homeX(d), homeY(d));
            d.state = 3;
            d.trail = [];
          }
        }
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

      // Trails
      ctx.lineCap = 'round';
      for (const d of dots) {
        const tr = d.trail;
        if (tr.length < 4) continue;
        const n = tr.length / 2;
        for (let i = 1; i < n; i++) {
          const a = (i / n) * 0.5;
          ctx.strokeStyle = `rgba(242,210,122,${a})`;
          ctx.lineWidth = (i / n) * 1.6;
          ctx.beginPath();
          ctx.moveTo(tr[(i - 1) * 2], tr[(i - 1) * 2 + 1]);
          ctx.lineTo(tr[i * 2], tr[i * 2 + 1]);
          ctx.stroke();
        }
      }

      for (const d of dots) {
        const active = d.state !== 0;
        const r = active ? 1.9 : d.size;
        const alpha = active ? 1 : d.alpha * (0.85 + Math.sin(time * 1.4 + d.phase) * 0.15);
        if (active || d.size > 1.7) {
          ctx.fillStyle = `rgba(242,210,122,${active ? 0.16 : 0.08})`;
          ctx.beginPath();
          ctx.arc(d.x, d.y, r * (active ? 5 : 3.2), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = active ? 'rgba(255,236,180,1)' : `rgba(242,210,122,${alpha})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
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
    dots.forEach((d) => {
      d.x = homeX(d);
      d.y = homeY(d);
    });
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
