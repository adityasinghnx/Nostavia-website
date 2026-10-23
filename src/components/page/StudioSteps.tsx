import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { studioSteps } from '../../content/studio';
import { Reveal } from '../ui/motion';

/** Studio's five steps on a rail that fills as the section scrolls past. */
export const StudioSteps: React.FC = () => {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <ol ref={ref} className="relative grid sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12 pt-10">
      <span aria-hidden="true" className="absolute left-0 right-0 top-0 h-px bg-fg/15" />
      <motion.span aria-hidden="true" style={{ scaleX: reduce ? 1 : fill }} className="absolute left-0 right-0 top-0 h-px origin-left bg-accent" />
      {studioSteps.map((s, i) => (
        <Reveal as="li" key={s.n} delay={i * 0.07} className="relative">
          <span aria-hidden="true" className="absolute -top-10 left-0 -translate-y-1/2 h-2.5 w-2.5 rounded-full border border-accent bg-bg" />
          <p className="font-mono text-[12px] text-accent">{s.n}</p>
          <h3 className="mt-4 text-[clamp(1.3rem,1.8vw,1.6rem)] tracking-[-0.025em]">{s.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-fg/60 max-w-[30ch]">{s.body}</p>
        </Reveal>
      ))}
    </ol>
  );
};
