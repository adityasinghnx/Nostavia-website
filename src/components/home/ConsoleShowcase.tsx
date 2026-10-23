import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { HiveConsole } from '../hive/HiveConsole';
import { Reveal } from '../ui/motion';

/** The Hive window rises out of the hero, tilted, and settles flat as it reaches the middle of the screen. */
export const ConsoleShowcase: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [26, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const glow = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <section data-theme="ink" aria-label="Hive product view" className="relative pt-16 pb-[clamp(5rem,10vw,9rem)] overflow-hidden">
      <motion.div aria-hidden="true" style={{ opacity: reduce ? 1 : glow }} className="absolute left-1/2 top-[30%] -translate-x-1/2 w-[1200px] max-w-[160vw] h-[700px] bg-[radial-gradient(closest-side,rgba(242,210,122,0.13),transparent)]" />
      <div className="wrap relative">
        <Reveal className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="t-label text-fg/40">Fig. 01 — Hive</p>
            <p className="mt-4 text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.05] tracking-[-0.03em]">This is Hive.</p>
          </div>
          <p className="text-fg/55 max-w-[44ch] text-[15px] leading-relaxed">
            The modules you pick and the builds we make for you, in one window. Bees do the work. Anything clinical waits for a person.
          </p>
        </Reveal>
        <div ref={ref} style={{ perspective: 1800 }}>
          <motion.div style={reduce ? undefined : { rotateX, scale, y, transformOrigin: '50% 0%' }}>
            <HiveConsole />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
