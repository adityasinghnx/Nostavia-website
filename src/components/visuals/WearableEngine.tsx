import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { wearableEngine as e } from '../../content/human-os';
import { FLAGS } from '../../content/site';
import { EASE, Reveal } from '../ui/motion';
import { cn } from '../../lib/cn';

/* ─────────────────────────────────────────────────────────────────────────────
 * The Normalisation Engine inside the Devices family. The chart is sample data:
 * 30 nights of HRV where a member swaps rings on night 17 and the new ring
 * reads 11 ms higher. Raw, stitched data jumps; the engine's series does not.
 * ──────────────────────────────────────────────────────────────────────────── */

const NIGHTS = 30;
const SWAP = 16; // first night on the new ring (0-based)
const NOT_WORN = [14, 15];
const CALIBRATING = [16, 17, 18, 19];
const OFFSET = 11;
const Y_MIN = 34;
const Y_MAX = 70;

/* Deterministic, gently varying nightly HRV around 48 ms. */
const base = Array.from({ length: NIGHTS }, (_, i) => 48 + 3.2 * Math.sin(i * 0.85) + 1.8 * Math.sin(i * 2.3 + 1));
const value = (i: number, raw: boolean) => (NOT_WORN.includes(i) ? null : base[i] + (raw && i >= SWAP ? OFFSET : 0));

/* Positions in percent of the plot box. */
const px = (i: number) => 2 + (i / (NIGHTS - 1)) * 96;
const py = (v: number) => 100 - ((v - Y_MIN) / (Y_MAX - Y_MIN)) * 100;

const path = (raw: boolean, from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, k) => from + k)
    .map((i, k) => `${k ? 'L' : 'M'}${px(i)} ${py(value(i, raw)!)}`)
    .join(' ');

const Chart: React.FC = () => {
  const reduce = useReducedMotion();
  const swapX = px(SWAP - 0.5);
  const gapL = px(NOT_WORN[0] - 0.5);
  const gapR = px(NOT_WORN[NOT_WORN.length - 1] + 0.5);

  return (
    <figure className="mt-8">
      <div className="flex items-baseline justify-between gap-4">
        <figcaption className="text-[13.5px] text-fg/70">
          Heart rate variability <span className="text-fg/40">· ms</span>
        </figcaption>
        <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] text-fg/40">Sample data</span>
      </div>

      <div
        role="img"
        aria-label="Sample chart. A member swaps rings on night 17 and the new ring reads 11 milliseconds higher. Stitched raw data jumps up; the engine's series stays continuous, marks four calibrating nights and keeps two nights the ring was not worn as empty rows."
        className="relative mt-4 aspect-[5/4] sm:aspect-[16/8] w-full"
      >
        {/* Grid */}
        {[40, 50, 60].map((v) => (
          <div key={v} aria-hidden="true" className="absolute inset-x-0 border-t border-fg/[0.07]" style={{ top: `${py(v)}%` }}>
            <span className="absolute -top-[17px] left-0 font-mono text-[10.5px] text-fg/30">{v}</span>
          </div>
        ))}

        {/* Not worn: kept as rows, with a reason */}
        <div aria-hidden="true" className="absolute inset-y-0 bg-[repeating-linear-gradient(135deg,rgb(var(--fg)/0.06)_0_1px,transparent_1px_6px)]" style={{ left: `${gapL}%`, width: `${gapR - gapL}%` }} />

        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          initial={reduce ? false : { clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          transition={{ duration: 2.2, ease: EASE, delay: 0.2 }}
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
            {/* Raw, stitched */}
            <path d={path(true, 0, NOT_WORN[0] - 1)} fill="none" className="stroke-fg/25" strokeWidth="1.25" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            <path d={path(true, SWAP, NIGHTS - 1)} fill="none" className="stroke-fg/25" strokeWidth="1.25" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            {/* Normalised */}
            <path d={path(false, 0, NOT_WORN[0] - 1)} fill="none" className="stroke-accent" strokeWidth="1.75" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            <path d={path(false, SWAP, NIGHTS - 1)} fill="none" className="stroke-accent" strokeWidth="1.75" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
          </svg>

          {/* Nightly points: solid when settled, open while calibrating */}
          {base.map((_, i) => {
            const v = value(i, false);
            if (v === null) return null;
            const cal = CALIBRATING.includes(i);
            return (
              <span
                key={i}
                className={cn('absolute h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full', cal ? 'border-[1.5px] border-accent bg-surface' : 'bg-accent')}
                style={{ left: `${px(i)}%`, top: `${py(v)}%` }}
              />
            );
          })}
        </motion.div>

        {/* Device change */}
        <div aria-hidden="true" className="absolute inset-y-0 border-l border-dashed border-fg/30" style={{ left: `${swapX}%` }} />
        <span aria-hidden="true" className="absolute bottom-1 -translate-x-1/2 whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.06em] text-fg/40" style={{ left: `${(gapL + gapR) / 2}%` }}>
          Not worn
        </span>

        {/* Series labels at the right edge */}
        <span aria-hidden="true" className="absolute right-0 -top-1 text-right text-[12px] leading-tight text-fg/45">
          Stitched raw data jumps {OFFSET} ms
        </span>
        <span aria-hidden="true" className="absolute right-0 translate-y-[70%] text-right text-[12px] leading-tight text-accent" style={{ top: `${py(value(NIGHTS - 1, false)!)}%` }}>
          Engine: one continuous series
        </span>
      </div>

      <div aria-hidden="true" className="relative mt-3 flex justify-between font-mono text-[10.5px] text-fg/35">
        <span>Night 1</span>
        <span className="absolute -translate-x-1/2 whitespace-nowrap text-fg/60" style={{ left: `${swapX}%` }}>
          Night {SWAP + 1} · new ring
        </span>
        <span>Night 30</span>
      </div>

      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 text-[12.5px] text-fg/55">
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-accent" /> Normalised
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full border-[1.5px] border-accent" /> Calibrating, marked
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-px w-4 bg-fg/35" /> Raw, stitched
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-4 bg-[repeating-linear-gradient(135deg,rgb(var(--fg)/0.25)_0_1px,transparent_1px_4px)]" /> Not worn, kept with the reason
        </li>
      </ul>
    </figure>
  );
};

export const WearableEngine: React.FC<{ moduleName?: string }> = ({ moduleName }) => (
  <div className="lg:col-span-8 flex flex-col gap-3">
    <Reveal className="rounded-[24px] border border-fg/[0.12] bg-surface/60 p-6 md:p-9">
      <p className="t-label text-fg/55">
        {FLAGS.SHOW_MODULE_NAMES && moduleName ? (
          <>
            {moduleName} <span className="text-fg/30">·</span> <span className="text-accent">{e.name}</span>
          </>
        ) : (
          <span className="text-accent">{e.name}</span>
        )}
      </p>
      <h4 className="mt-5 max-w-[22ch] text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.1] tracking-[-0.03em] text-balance">{e.title}</h4>
      <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-fg/60 text-pretty">{e.body}</p>
      <Chart />
    </Reveal>

    <Reveal className="rounded-[24px] border border-fg/[0.12] p-6 md:p-9">
      <h4 className="text-[18px] tracking-[-0.015em]">What it handles</h4>
      <dl className="mt-5">
        {e.handles.map((h) => (
          <div key={h.problem} className="grid gap-x-8 gap-y-1.5 border-t border-fg/10 py-4 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <dt className="text-[14.5px] leading-snug text-fg/85">{h.problem}</dt>
            <dd className="text-[14.5px] leading-relaxed text-fg/55">{h.answer}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 border-t border-fg/10 pt-5 text-[13px] leading-relaxed text-fg/45">
        <span className="font-mono uppercase tracking-[0.06em] text-fg/55">Signals</span>
        <span className="ml-3">{e.signals.join(', ')} and more.</span>
      </p>
    </Reveal>

    <ul className="grid gap-3 sm:grid-cols-2">
      {e.facts.map((f, i) => (
        <Reveal as="li" key={f.title} delay={(i % 2) * 0.05} className="rounded-2xl border border-fg/10 bg-[linear-gradient(180deg,rgb(var(--fg)/0.03),transparent)] p-6">
          <h5 className="text-[16.5px] tracking-[-0.015em]">{f.title}</h5>
          <p className="mt-2.5 text-[14px] leading-relaxed text-fg/55">{f.body}</p>
        </Reveal>
      ))}
    </ul>

    <p className="mt-2 text-[13px] leading-relaxed text-fg/45">{e.scope}</p>
  </div>
);
