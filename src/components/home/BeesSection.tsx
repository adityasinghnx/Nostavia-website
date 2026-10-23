import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { bees, beeImage, type Bee } from '../../content/bees';
import { BEE_DEFINITION, ways } from '../../content/hive';
import { cn } from '../../lib/cn';
import { Label, TextLink } from '../ui/primitives';
import { EASE, Reveal, SplitHeading } from '../ui/motion';

/* ─────────────────────────────────────────────────────────────────────────────
 * The Bees on a dark stage: lit like product photography, each with its own
 * coloured glow, a soft reflection and a slow idle float. Hover, focus or tap
 * a Bee to read its job.
 * ──────────────────────────────────────────────────────────────────────────── */

const BeeFigure: React.FC<{ bee: Bee; i: number; active: boolean; dimmed: boolean; onPick: () => void }> = ({ bee, i, active, dimmed, onPick }) => {
  const reduce = useReducedMotion();
  return (
    <li className="relative flex-1 min-w-[38vw] sm:min-w-[24vw] lg:min-w-0 snap-center">
      <button
        type="button"
        onMouseEnter={onPick}
        onFocus={onPick}
        onClick={onPick}
        aria-pressed={active}
        aria-label={`${bee.job}: ${bee.line}`}
        className="group relative w-full flex flex-col items-center pt-6 pb-2 rounded-3xl focus-visible:outline-offset-[-4px]"
      >
        <span aria-hidden="true" className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square rounded-full transition-opacity duration-700" style={{ background: `radial-gradient(closest-side, ${bee.color}${active ? '55' : '22'}, transparent)` }} />
        <motion.span
          className="relative block w-full"
          animate={reduce ? undefined : { y: active ? -14 : [0, -7, 0] }}
          transition={active ? { duration: 0.6, ease: EASE } : { duration: 3.6 + (i % 3) * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
        >
          <img
            src={beeImage(bee.id)}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className={cn('relative w-full h-auto transition-[transform,filter,opacity] duration-700 ease-out', active ? 'scale-[1.06]' : 'scale-100', dimmed && 'opacity-55 saturate-[0.6]')}
          />
        </motion.span>
        {/* Reflection on the stage floor */}
        <img
          src={beeImage(bee.id)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          draggable={false}
          className={cn('pointer-events-none w-full h-auto -scale-y-100 -mt-[6%] opacity-[0.16] blur-[1px] [mask-image:linear-gradient(to_top,#000,transparent_45%)] transition-opacity duration-700', dimmed && 'opacity-[0.07]')}
        />
        <span className={cn('absolute bottom-[22%] font-mono text-[11px] uppercase tracking-[0.12em] whitespace-nowrap transition-colors duration-500', active ? 'text-fg' : 'text-fg/45')}>{bee.job}</span>
      </button>
    </li>
  );
};

export const BeesSection: React.FC = () => {
  const [active, setActive] = useState(0);
  const bee = bees[active];

  return (
    <section id="bees" data-theme="ink" aria-labelledby="bees-title" className="relative py-[clamp(6rem,11vw,10.5rem)] overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 top-[28%] h-[60%] bg-[radial-gradient(50%_60%_at_50%_40%,rgba(242,237,227,0.06),transparent_70%)]" />
      <div className="wrap relative">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Label index="04">Hive · The Bees</Label>
            <SplitHeading id="bees-title" className="t-h1 mt-6 max-w-[14ch]" text="AI workers with one job each." />
          </div>
          <Reveal className="lg:col-span-5 flex flex-col gap-6">
            <p className="text-[16px] leading-relaxed text-fg/60 text-pretty">{BEE_DEFINITION}</p>
            <TextLink to="/hive">See how Hive works</TextLink>
          </Reveal>
        </div>
      </div>

      <Reveal className="relative mt-14 md:mt-20">
        <ul className="flex lg:wrap gap-2 lg:gap-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory px-[clamp(1rem,4vw,3rem)] lg:px-[clamp(1rem,4vw,3rem)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {bees.map((b, i) => (
            <BeeFigure key={b.id} bee={b} i={i} active={i === active} dimmed={i !== active} onPick={() => setActive(i)} />
          ))}
        </ul>
        <div className="wrap mt-2 min-h-[3.5rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={bee.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="text-center text-[clamp(1.15rem,1.9vw,1.6rem)] tracking-[-0.02em]"
              aria-live="polite"
            >
              <span className="text-fg/45">{bee.job}. </span>
              {bee.line}
            </motion.p>
          </AnimatePresence>
          <p className="mt-3 text-center font-mono text-[11px] tracking-[0.04em] text-fg/35">You choose the Bees you need, rename them if you like, and add more as you grow.</p>
        </div>
      </Reveal>

      <div className="wrap relative mt-20 md:mt-28">
        <ul className="grid md:grid-cols-3 border-t border-fg/10">
          {ways.map((w, i) => (
            <Reveal as="li" key={w.title} delay={i * 0.06} className={cn('pt-8 pb-4 md:pr-8', i > 0 && 'md:border-l md:border-fg/10 md:pl-8')}>
              <p className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 t-h3">{w.title}</h3>
              <p className="mt-2 text-[15px] text-fg/60">{w.body}</p>
              <p className="mt-5 rounded-2xl rounded-bl-md bg-fg/[0.05] px-4 py-3 text-[14px] text-fg/80 max-w-[34ch]">“{w.example}”</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};
