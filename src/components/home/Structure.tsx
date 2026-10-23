import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { STUDIO } from '../../content/site';
import { cn } from '../../lib/cn';
import { StructureDiagram, type Focus } from '../hive/StructureDiagram';
import { Label } from '../ui/primitives';
import { EASE, Reveal, SplitHeading } from '../ui/motion';

const steps: { focus: Focus; name: string; title: string; body: string }[] = [
  {
    focus: 'hive',
    name: 'Hive',
    title: 'One place to work.',
    body: 'Every Nostavia customer works in Hive. Inside it, AI Bees run everything you have with us, so your team never has to jump between tools.',
  },
  {
    focus: 'human-os',
    name: 'Human OS',
    title: "What we've built.",
    body: 'Ready-made modules for your customers and for your care team. Pick the ones you need and the Bees run them in Hive.',
  },
  {
    focus: 'studio',
    name: STUDIO,
    title: 'What we build for you.',
    body: 'We listen first, then build what you need from scratch, reusing Human OS where it makes sense. Every build is made to run in Hive.',
  },
  {
    focus: 'all',
    name: 'Together',
    title: 'Side by side. Never a chain.',
    body: 'Human OS and Studio are peers. They can share parts, and they all come together in Hive, run by the same Bees.',
  },
];

export const Structure: React.FC = () => {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length * 0.999))));
  });

  const step = steps[active];

  return (
    <section id="structure" data-theme="paper" aria-labelledby="structure-title" className="relative">
      <div className="wrap pt-[clamp(6rem,11vw,10rem)] pb-10 lg:pb-0">
        <Label index="01">How Nostavia fits together</Label>
        <SplitHeading id="structure-title" className="t-h1 mt-6 max-w-[16ch]" text="Hive on top. Everything else underneath." />
      </div>

      {/* Wide screens: pinned diagram, steps advance with scroll */}
      <div ref={track} className="relative hidden lg:block h-[340vh]">
        <div className="sticky top-0 h-screen flex items-center">
          <div className="wrap grid grid-cols-12 gap-8 items-center">
            <div className="col-span-5 flex gap-8">
              <ol aria-hidden="true" className="flex flex-col gap-2 pt-1.5">
                {steps.map((s, i) => (
                  <li key={s.name} className="relative h-12 w-px bg-fg/15 overflow-hidden">
                    <motion.span className="absolute inset-x-0 top-0 bg-accent" initial={false} animate={{ height: i <= active ? '100%' : '0%' }} transition={{ duration: 0.6, ease: EASE }} />
                  </li>
                ))}
              </ol>
              <div className="relative min-h-[300px] flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    <p className="t-label text-accent">
                      {String(active + 1).padStart(2, '0')} / {step.name}
                    </p>
                    <h3 className="t-h2 mt-5">{step.title}</h3>
                    <p className="t-lead mt-6 text-fg/65 max-w-[40ch] text-pretty">{step.body}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="col-span-7 pl-6">
              <StructureDiagram focus={step.focus} />
            </div>
          </div>
        </div>
      </div>

      {/* Narrow screens: diagram, then the steps in order */}
      <div className="lg:hidden wrap pb-[clamp(5rem,10vw,8rem)]">
        <Reveal>
          <StructureDiagram focus="all" className="mt-4" />
        </Reveal>
        <ol className="mt-14 flex flex-col">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.name} className={cn('py-7 border-t border-fg/10')}>
              <p className="t-label text-accent">
                {String(i + 1).padStart(2, '0')} / {s.name}
              </p>
              <h3 className="t-h3 mt-4">{s.title}</h3>
              <p className="mt-3 text-fg/65 leading-relaxed">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};
