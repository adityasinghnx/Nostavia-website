import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { problems } from '../../content/offer';
import { Label } from '../ui/primitives';
import { Reveal, SplitHeading } from '../ui/motion';

/* ─────────────────────────────────────────────────────────────────────────────
 * "Your team is the glue": every system wired through one small circle of
 * people. The lines draw themselves once, slowly, when the figure arrives.
 * ──────────────────────────────────────────────────────────────────────────── */

const W = 600;
const H = 540;
const C = { x: 300, y: 270 };

const nodes = problems.systems.map((label, i, all) => {
  const a = (i / all.length) * Math.PI * 2 - Math.PI / 2 + 0.18;
  return { label, x: C.x + Math.cos(a) * 238, y: C.y + Math.sin(a) * 200 };
});

/* A few direct links between systems, the ones people bridge by re-typing */
const crossLinks: [number, number][] = [
  [0, 3],
  [1, 6],
  [2, 8],
  [4, 9],
  [5, 7],
  [0, 5],
];

const curve = (x1: number, y1: number, x2: number, y2: number, bend: number) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${(mx + (y2 - y1) * bend).toFixed(1)} ${(my - (x2 - x1) * bend).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
};

const Glue: React.FC = () => {
  const reduce = useReducedMotion();
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible" role="img" aria-label="Ten everyday systems, from the lab system to WhatsApp and client portals, all connected only through your team, who move the work between them by hand.">
      {crossLinks.map(([a, b], i) => (
        <path key={`x${i}`} d={curve(nodes[a].x, nodes[a].y, nodes[b].x, nodes[b].y, i % 2 ? 0.25 : -0.25)} fill="none" stroke="rgb(var(--fg) / 0.1)" strokeDasharray="3 6" />
      ))}
      {nodes.map((n, i) => (
        <motion.path
          key={n.label}
          d={curve(n.x, n.y, C.x, C.y, i % 2 ? 0.18 : -0.18)}
          fill="none"
          stroke="rgb(var(--fg) / 0.25)"
          strokeWidth="1"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ duration: 1.8, delay: 0.2 + i * 0.08, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}
      {nodes.map((n) => {
        const w = n.label.length * 7.2 + 26;
        return (
          <g key={`n-${n.label}`} transform={`translate(${n.x} ${n.y})`}>
            <rect x={-w / 2} y={-16} width={w} height={32} rx={16} fill="rgb(var(--bg))" stroke="rgb(var(--fg) / 0.22)" />
            <text textAnchor="middle" dy="4.5" fontSize="12.5" fill="rgb(var(--fg) / 0.78)" style={{ fontFamily: 'inherit' }}>
              {n.label}
            </text>
          </g>
        );
      })}
      <circle cx={C.x} cy={C.y} r="62" fill="rgb(var(--bg))" />
      <circle cx={C.x} cy={C.y} r="62" fill="rgb(var(--accent) / 0.08)" stroke="rgb(var(--accent) / 0.55)" />
      <circle cx={C.x} cy={C.y} r="74" fill="none" stroke="rgb(var(--accent) / 0.25)" strokeDasharray="2 5" />
      <text x={C.x} y={C.y - 4} textAnchor="middle" fontSize="17" fill="rgb(var(--fg))" style={{ fontFamily: 'inherit', letterSpacing: '-0.02em' }}>
        Your team
      </text>
      <text x={C.x} y={C.y + 16} textAnchor="middle" fontSize="10.5" fill="rgb(var(--fg) / 0.5)" style={{ fontFamily: 'Geist Mono Variable, monospace', letterSpacing: '0.12em' }}>
        BY HAND
      </text>
    </svg>
  );
};

export const ProblemSection: React.FC = () => (
  <section id="problem" data-theme="paper" aria-labelledby="problem-title" className="relative py-[clamp(6rem,11vw,10.5rem)] overflow-hidden">
    <div className="wrap grid lg:grid-cols-12 gap-14 lg:gap-10 items-center">
      <div className="lg:col-span-5">
        <Label index="02">The problem</Label>
        <SplitHeading id="problem-title" className="t-h2 mt-6" text={problems.heading} />
        <ol className="mt-10 border-t border-fg/[0.12]">
          {problems.items.map((item, i) => (
            <Reveal as="li" key={item} delay={i * 0.05} className="grid grid-cols-[2.25rem_1fr] gap-3 py-4 border-b border-fg/[0.12] text-[16.5px] leading-snug">
              <span className="font-mono text-[12px] text-accent pt-1">{String(i + 1).padStart(2, '0')}</span>
              {item}
            </Reveal>
          ))}
        </ol>
      </div>
      <Reveal className="lg:col-span-7 lg:pl-10" delay={0.1}>
        <Glue />
      </Reveal>
    </div>
  </section>
);
