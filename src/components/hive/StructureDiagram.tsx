import React from 'react';
import { useReducedMotion } from 'motion/react';
import { parts, promises, type PartId } from '../../content/superintelligence';
import { cn } from '../../lib/cn';

/* ─────────────────────────────────────────────────────────────────────────────
 * The one structure diagram: Nostavia Superintelligence as the centre cell,
 * Human OS, Hive and Studio as its three cells, the three promises underneath.
 * The parts touch the centre, never each other: no chain. EHR and LIS are
 * internal and not drawn. Human OS's two groups are text only.
 * ──────────────────────────────────────────────────────────────────────────── */

export type Focus = 'core' | PartId | 'promises' | 'all';

const W = 640;
const H = 580;
const R = 104; // centre to corner, flat-top cells
const r = R * Math.cos(Math.PI / 6);
const D = 2 * r + 16;
const C = { x: 320, y: 212 };

const at = (deg: number) => ({ x: C.x + D * Math.cos((deg * Math.PI) / 180), y: C.y + D * Math.sin((deg * Math.PI) / 180) });

const centres: Record<PartId, { x: number; y: number }> = {
  'human-os': at(210),
  hive: at(330),
  studio: at(90),
};

const hex = (cx: number, cy: number, radius = R - 2) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i;
    return `${(cx + radius * Math.cos(a)).toFixed(1)},${(cy + radius * Math.sin(a)).toFixed(1)}`;
  }).join(' ');

const pct = (p: { x: number; y: number }) => ({ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` });

const Cell: React.FC<{ cx: number; cy: number; on: boolean; dim?: boolean; core?: boolean }> = ({ cx, cy, on, dim, core }) => (
  <polygon
    points={hex(cx, cy)}
    strokeLinejoin="round"
    strokeWidth={on ? 1.6 : 1.1}
    className="transition-[fill,stroke,opacity] duration-700 ease-out"
    style={{
      fill: core && on ? 'url(#core-glow)' : on ? 'rgb(var(--accent) / 0.07)' : 'rgb(var(--surface) / 0.5)',
      stroke: on ? 'rgb(var(--accent) / 0.7)' : 'rgb(var(--fg) / 0.14)',
      opacity: dim ? 0.45 : 1,
    }}
  />
);

export const StructureDiagram: React.FC<{ focus: Focus; className?: string }> = ({ focus, className }) => {
  const reduce = useReducedMotion();
  const all = focus === 'all';
  const partOn = (id: PartId) => all || focus === id;
  const coreOn = all || focus === 'core' || focus === 'promises' || parts.some((p) => p.id === focus);
  const promisesOn = all || focus === 'promises';

  return (
    <div
      className={cn('relative w-full select-none', className)}
      style={{ aspectRatio: `${W}/${H}`, containerType: 'inline-size' }}
      role="img"
      aria-label="Nostavia Superintelligence at the centre. Around it, three parts: Human OS, how it understands; Hive, how it works; Studio, how it builds for you. Underneath every part, three promises: private by design, people stay in charge, never clinical judgement."
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <defs>
          <radialGradient id="core-glow" cx="50%" cy="45%" r="60%">
            <stop offset="0" stopColor="rgb(var(--accent))" stopOpacity="0.3" />
            <stop offset="1" stopColor="rgb(var(--accent))" stopOpacity="0.04" />
          </radialGradient>
        </defs>

        {/* Bees moving between the centre and each part */}
        {parts.map((p, i) => {
          // Run between the labels: from just outside the centre label to just short of the part's label
          const c = centres[p.id];
          const ux = (c.x - C.x) / D;
          const uy = (c.y - C.y) / D;
          const from = { x: C.x + ux * r * 0.62, y: C.y + uy * r * 0.62 };
          const to = { x: C.x + ux * (D - r * 0.85), y: C.y + uy * (D - r * 0.85) };
          const d = `M${from.x.toFixed(1)} ${from.y.toFixed(1)} L${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
          const live = partOn(p.id) || focus === 'core';
          return (
            <g key={p.id} className={cn('transition-opacity duration-700', live ? 'opacity-100' : 'opacity-30')}>
              <path d={d} stroke="rgb(var(--fg) / 0.15)" strokeWidth="1" strokeDasharray="2 5" />
              {!reduce &&
                [0, 1.2].map((begin, j) => (
                  <circle key={j} r="3.2" fill="rgb(var(--accent))">
                    <animateMotion dur="2.4s" begin={`${begin + i * 0.5}s`} repeatCount="indefinite" path={d} keyPoints={j ? '1;0' : '0;1'} keyTimes="0;1" calcMode="linear" />
                  </circle>
                ))}
            </g>
          );
        })}

        <Cell cx={C.x} cy={C.y} on={coreOn} core />
        {parts.map((p) => (
          <Cell key={p.id} cx={centres[p.id].x} cy={centres[p.id].y} on={partOn(p.id)} dim={!partOn(p.id) && focus !== 'core' && focus !== 'promises'} />
        ))}
        {/* Inner ring on the centre cell */}
        <polygon points={hex(C.x, C.y, R - 16)} fill="none" strokeLinejoin="round" style={{ stroke: 'rgb(var(--accent) / 0.25)' }} strokeDasharray="1 6" strokeLinecap="round" />
      </svg>

      {/* Labels */}
      <div aria-hidden="true" className="absolute -translate-x-1/2 -translate-y-1/2 text-center w-[26%]" style={pct(C)}>
        <p className="font-mono uppercase tracking-[0.14em] text-accent text-[max(8px,1.55cqw)]">Nostavia</p>
        <p className="mt-[0.6cqw] leading-[1.05] tracking-[-0.025em] text-[max(10px,2.9cqw)]">Superintelligence</p>
      </div>
      {parts.map((p) => (
        <div
          key={p.id}
          aria-hidden="true"
          className={cn('absolute -translate-x-1/2 -translate-y-1/2 text-center w-[26%] transition-opacity duration-700', partOn(p.id) || focus === 'core' || focus === 'promises' ? 'opacity-100' : 'opacity-45')}
          style={pct(centres[p.id])}
        >
          <p className="font-mono uppercase tracking-[0.14em] text-accent text-[max(8px,1.55cqw)]">{p.name}</p>
          <p className="mt-[0.6cqw] leading-none tracking-[-0.03em] text-[max(12px,3.4cqw)] em">{p.verb}</p>
        </div>
      ))}

      {/* Promises underneath everything */}
      <ul aria-hidden="true" className="absolute inset-x-[2%] bottom-0 flex gap-[1.5%]">
        {promises.map((p) => (
          <li
            key={p}
            className={cn(
              'flex-1 flex items-center justify-center gap-[1cqw] rounded-full border px-[1.2cqw] py-[1.6cqw] text-center leading-tight text-[max(9px,1.75cqw)] transition-[border-color,background-color,opacity] duration-700',
              promisesOn ? 'border-accent/50 bg-[rgb(var(--accent)/0.07)] opacity-100' : 'border-fg/15 opacity-60',
            )}
          >
            <span className="hidden sm:block h-[0.9cqw] w-[0.9cqw] min-h-[4px] min-w-[4px] shrink-0 rounded-full bg-accent" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
};
