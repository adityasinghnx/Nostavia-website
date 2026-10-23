import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ways } from '../../content/hive';
import { STUDIO } from '../../content/site';
import { cn } from '../../lib/cn';
import { HiveConsole } from '../hive/HiveConsole';
import { BeeStage } from './BeeStage';
import { Label, TextLink } from '../ui/primitives';
import { Reveal, SplitHeading } from '../ui/motion';
import { HiveMark } from '../ui/marks';

/* Hive on the homepage: how you run Human OS and your Studio builds. The workspace, the Bees, and the three ways of working. */

export const HiveSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <section id="hive" data-theme="ink" aria-labelledby="hive-title" className="relative py-[clamp(6rem,11vw,10.5rem)] overflow-hidden">
      <div aria-hidden="true" className="absolute left-1/2 top-[16%] -translate-x-1/2 w-[1200px] max-w-[160vw] h-[700px] bg-[radial-gradient(closest-side,rgba(242,210,122,0.11),transparent)]" />
      <div className="wrap relative">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Label index="05">
              <span className="inline-flex items-center gap-2">
                <HiveMark className="w-3.5 h-3.5 text-accent" /> Hive · How you run it
              </span>
            </Label>
            <SplitHeading id="hive-title" className="t-h1 mt-6 max-w-[14ch]" text="One workspace. Bees do the routine work." />
          </div>
          <Reveal className="lg:col-span-5 flex flex-col gap-6">
            <p className="t-lead text-fg/60 text-pretty">Hive is how your team uses Human OS and your {STUDIO} builds. AI Bees take on the routine work across your systems, and ask a person before anything important.</p>
            <TextLink to="/hive">See how Hive works</TextLink>
          </Reveal>
        </div>

        <div ref={ref} className="mt-14 md:mt-20" style={{ perspective: 1800 }}>
          <motion.div style={reduce ? undefined : { rotateX, scale, y, transformOrigin: '50% 0%' }}>
            <HiveConsole />
          </motion.div>
        </div>
      </div>

      <div className="relative mt-24 md:mt-32">
        <div className="wrap mb-6 md:mb-10 grid lg:grid-cols-12 gap-8 items-end">
          <h3 className="lg:col-span-6 t-h2">Meet the Bees.</h3>
          <p className="lg:col-span-6 text-[16px] leading-relaxed text-fg/60">Each Bee is an AI worker with one job. You choose the ones you need, rename them if you like, and add more as you grow.</p>
        </div>
        <BeeStage />
      </div>

      <div className="wrap relative mt-20 md:mt-24">
        <ul className="grid md:grid-cols-3 border-t border-fg/10">
          {ways.map((w, i) => (
            <Reveal as="li" key={w.title} delay={i * 0.06} className={cn('pt-8 pb-4 md:pr-8', i > 0 && 'md:border-l md:border-fg/10 md:pl-8')}>
              <h3 className="text-[clamp(1.6rem,2.4vw,2.1rem)] tracking-[-0.03em]">{w.title}</h3>
              <p className="mt-2 text-[15px] text-fg/60">{w.body}</p>
              <p className="mt-5 text-[14px] italic text-fg/45 max-w-[34ch]">“{w.example}”</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};
