import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { STUDIO } from '../../content/site';
import { studioPrinciples, studioSteps } from '../../content/studio';
import { Button, Label } from '../ui/primitives';
import { Reveal, SplitHeading } from '../ui/motion';
import { HiveMark } from '../ui/marks';
import { BlurIn } from '../ui/effects';

/** Four steps on a rail that fills as the section scrolls past. */
export const StudioSteps: React.FC = () => {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <ol ref={ref} className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 pt-10">
      <span aria-hidden="true" className="absolute left-0 right-0 top-0 h-px bg-fg/15" />
      <motion.span aria-hidden="true" style={{ scaleX: reduce ? 1 : fill }} className="absolute left-0 right-0 top-0 h-px origin-left bg-accent" />
      {studioSteps.map((s, i) => (
        <Reveal as="li" key={s.n} delay={i * 0.08} className="relative">
          <span aria-hidden="true" className="absolute -top-10 left-0 -translate-y-1/2 h-2.5 w-2.5 rounded-full border border-accent bg-bg" />
          <p className="font-mono text-[12px] text-accent">{s.n}</p>
          <h3 className="mt-4 text-[clamp(1.4rem,2vw,1.75rem)] tracking-[-0.025em] flex items-center gap-2.5">
            {s.title === 'Run in Hive' && <HiveMark className="w-5 h-5 text-accent" />}
            {s.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-fg/60 max-w-[30ch]">{s.body}</p>
        </Reveal>
      ))}
    </ol>
  );
};

export const StudioSection: React.FC = () => {
  const photo = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: photo, offset: ['start end', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section id="studio" data-theme="paper" aria-labelledby="studio-title" className="relative py-[clamp(6rem,11vw,10.5rem)]">
      <div className="wrap">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Label index="03">{STUDIO}</Label>
            <SplitHeading id="studio-title" className="t-h1 mt-6" text="What we build *for you.*" />
          </div>
          <Reveal className="lg:col-span-5 flex flex-col items-start gap-7">
            <p className="t-lead text-fg/65 text-pretty">
              Some work needs something only you have. We listen first, then build it from scratch, reusing Human OS where it makes sense. When it is done, it runs in Hive like everything else.
            </p>
            <Button to="/demo">Tell us what you need</Button>
          </Reveal>
        </div>

        <div className="mt-20 md:mt-28">
          <StudioSteps />
        </div>

        <div className="mt-24 md:mt-32 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <BlurIn className="lg:col-span-6">
            <div ref={photo} className="relative overflow-hidden rounded-[20px] aspect-[4/3.4]">
              <motion.img
                src="/photos/home-custom-team.jpg"
                alt="A product team planning a build together around a table"
                loading="lazy"
                decoding="async"
                style={reduce ? undefined : { y: photoY, scale: 1.16 }}
                className="photo absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
                <p className="t-label text-white/80">Every build starts with listening</p>
              </div>
            </div>
          </BlurIn>
          <ul className="lg:col-span-6 border-t border-fg/15">
            {studioPrinciples.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.06} className="grid grid-cols-[2.5rem_1fr] gap-4 py-8 border-b border-fg/15">
                <span className="font-mono text-[12px] text-fg/40 pt-2">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="t-h3">{p.title}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-fg/60 max-w-[52ch]">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
