import React from 'react';
import { useReducedMotion } from 'motion/react';
import { STUDIO } from '../../content/site';
import { cn } from '../../lib/cn';
import { HiveMark } from '../ui/marks';

/* ─────────────────────────────────────────────────────────────────────────────
 * The one structure diagram: Hive on top, Human OS and Studio side by side
 * underneath, each connected to Hive and never to each other. EHR and LIS are
 * internal and are not drawn. Human OS categories are text, never boxes.
 * ──────────────────────────────────────────────────────────────────────────── */

export type Focus = 'hive' | 'human-os' | 'studio' | 'all';

const lit = (focus: Focus, part: Exclude<Focus, 'all'>) => focus === 'all' || focus === part;

const panel = 'absolute rounded-[18px] border transition-[opacity,border-color,background-color,box-shadow] duration-700 ease-out';
const on = 'border-accent/45 bg-[rgb(var(--accent)/0.06)] opacity-100 shadow-[0_30px_80px_-40px_rgb(var(--accent)/0.55)]';
const off = 'border-fg/10 bg-surface/40 opacity-[0.38]';

/* Connector geometry, in the 640 × 600 diagram space */
const paths = {
  'human-os': 'M150 352 C150 290 250 290 250 214',
  studio: 'M490 352 C490 290 390 290 390 214',
};

/* Bees travel both ways: Hive runs what sits underneath it. */
const Connector: React.FC<{ d: string; active: boolean; offset?: number }> = ({ d, active, offset = 0 }) => {
  const reduce = useReducedMotion();
  return (
  <g className={cn('transition-opacity duration-700', active ? 'opacity-100' : 'opacity-25')}>
    <path d={d} fill="none" stroke="rgb(var(--fg) / 0.16)" strokeWidth="1.25" strokeDasharray="2 5" />
    <path d={d} fill="none" stroke="rgb(var(--accent))" strokeWidth="1.25" strokeOpacity={active ? 0.55 : 0} className="transition-[stroke-opacity] duration-700" />
    {[
      { begin: 0, up: true },
      { begin: 1.1, up: false },
      { begin: 1.9, up: true },
    ].map(({ begin, up }) =>
      reduce ? null : (
        <circle key={begin} r="3.2" fill="rgb(var(--accent))" opacity={active ? 1 : 0.5}>
          <animateMotion dur="2.6s" begin={`${begin + offset}s`} repeatCount="indefinite" path={d} keyPoints={up ? '0;1' : '1;0'} keyTimes="0;1" calcMode="linear" />
        </circle>
      ),
    )}
  </g>
  );
};

const cells = ['Reports', 'Calls', 'Briefs', 'Follow-ups', 'Your build'];

export const StructureDiagram: React.FC<{ focus: Focus; className?: string }> = ({ focus, className }) => (
  <div className={cn('relative w-full aspect-[640/600] select-none', className)} role="img" aria-label={`Structure: Hive on top. Underneath it, side by side, Human OS (what we've built) and ${STUDIO} (what we build for you), each connected to Hive.`}>
    <svg viewBox="0 0 640 600" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
      <Connector d={paths['human-os']} active={lit(focus, 'human-os') || focus === 'hive'} />
      <Connector d={paths.studio} active={lit(focus, 'studio') || focus === 'hive'} offset={0.6} />
    </svg>

    {/* Hive */}
    <div aria-hidden="true" className={cn(panel, 'left-0 right-0 top-0 h-[35.5%] p-[3.6%] flex flex-col justify-between', lit(focus, 'hive') ? on : off)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="t-label flex items-center gap-2 text-accent">
            <HiveMark className="w-4 h-4" /> Hive
          </p>
          <p className="mt-3 text-[clamp(1.05rem,2.1vw,1.6rem)] leading-[1.1] tracking-[-0.025em]">
            One place. <span className="em">Your Bees</span> run everything.
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-fg/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.06em] text-fg/55">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse2" />
          BEES AT WORK
        </span>
      </div>
      {/* Bees crossing the hive */}
      <div className="relative h-5 mx-[1%]">
        <span className="absolute inset-x-0 top-1/2 h-px border-t border-dashed border-fg/15" />
        {[
          { d: 7, delay: 0 },
          { d: 9.5, delay: -3 },
          { d: 6, delay: -4.5 },
          { d: 11, delay: -7 },
        ].map((b, i) => (
          <span key={i} className="absolute top-1/2 -mt-[3px] animate-[lane_linear_infinite]" style={{ animationDuration: `${b.d}s`, animationDelay: `${b.delay}s`, animationDirection: i % 2 ? 'reverse' : 'normal' }}>
            <span className="block h-[6px] w-[6px] rounded-full bg-accent shadow-[0_0_10px_rgb(var(--accent)/0.8)] animate-[bob_1.6s_ease-in-out_infinite]" />
          </span>
        ))}
      </div>
      <div className="relative flex gap-[1.6%]">
        {cells.map((c, i) => (
          <span
            key={c}
            className={cn(
              'flex-1 truncate rounded-lg border px-[2%] py-[1.4%] text-center text-[clamp(9px,1.25vw,12px)] transition-colors duration-700',
              i === cells.length - 1 ? 'border-fg/15 text-fg/70' : 'border-accent/25 text-fg/75',
            )}
          >
            {c}
          </span>
        ))}
      </div>
    </div>

    {/* Human OS */}
    <div aria-hidden="true" className={cn(panel, 'left-0 w-[47%] bottom-0 h-[41%] p-[3.6%] flex flex-col justify-between', lit(focus, 'human-os') ? on : off)}>
      <div>
        <p className="t-label text-accent">Human OS</p>
        <p className="mt-3 text-[clamp(1rem,1.9vw,1.45rem)] leading-[1.1] tracking-[-0.025em]">
          What we've <span className="em">built</span>
        </p>
        <p className="mt-2 text-[clamp(11px,1.3vw,13.5px)] leading-snug text-fg/55">Ready-made modules. Pick the ones you need.</p>
      </div>
      <p className="text-[clamp(10px,1.2vw,12.5px)] text-fg/60 leading-snug">
        For your customers
        <span className="mx-1.5 text-fg/25">·</span>
        For your care team
      </p>
    </div>

    {/* Studio */}
    <div aria-hidden="true" className={cn(panel, 'right-0 w-[47%] bottom-0 h-[41%] p-[3.6%] flex flex-col justify-between', lit(focus, 'studio') ? on : off)}>
      <div>
        <p className="t-label text-accent">{STUDIO}</p>
        <p className="mt-3 text-[clamp(1rem,1.9vw,1.45rem)] leading-[1.1] tracking-[-0.025em]">
          What we build <span className="em">for you</span>
        </p>
        <p className="mt-2 text-[clamp(11px,1.3vw,13.5px)] leading-snug text-fg/55">Custom builds, made to run in Hive.</p>
      </div>
      <p className="text-[clamp(10px,1.2vw,12.5px)] text-fg/60 leading-snug">Listen · Build · Run in Hive · Stay on</p>
    </div>
  </div>
);
