import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { parts, promises } from '../../content/superintelligence';
import { SAFETY_LINE } from '../../content/site';
import { StructureDiagram, type Focus } from '../hive/StructureDiagram';
import { Label, TextLink } from '../ui/primitives';
import { EASE, Reveal, SplitHeading } from '../ui/motion';

interface Step {
  focus: Focus;
  label: string;
  title: string;
  body: string;
  link?: { to: string; text: string };
}

const steps: Step[] = [
  {
    focus: 'core',
    label: 'Nostavia Superintelligence',
    title: 'One intelligence at the centre.',
    body: 'It understands your health data, does the routine work and builds what you need. Everything we offer is a part of it.',
    link: { to: '/superintelligence', text: 'About the Superintelligence' },
  },
  ...parts.map((p) => ({
    focus: p.id as Focus,
    label: `${p.verb} · ${p.name}`,
    title: p.headline,
    body: p.body,
    link: { to: p.to, text: `Explore ${p.name}` },
  })),
  {
    focus: 'promises',
    label: 'Underneath every part',
    title: 'Three promises, everywhere.',
    body: `${promises.join('. ')}. It supports your team; clinicians decide.`,
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
    <section id="structure" data-theme="ink" aria-labelledby="structure-title" className="relative">
      <div className="wrap pt-[clamp(6rem,11vw,10rem)] pb-10 lg:pb-0">
        <Label index="02">How it works for you</Label>
        <SplitHeading id="structure-title" className="t-h1 mt-6 max-w-[15ch]" text="It understands. It works. It builds." />
      </div>

      {/* Wide screens: pinned diagram, steps advance with scroll */}
      <div ref={track} className="relative hidden lg:block h-[400vh]">
        <div className="sticky top-0 h-screen flex items-center">
          <div className="wrap grid grid-cols-12 gap-8 items-center">
            <div className="col-span-5 flex gap-8">
              <ol aria-hidden="true" className="flex flex-col gap-2 pt-1.5">
                {steps.map((s, i) => (
                  <li key={s.label} className="relative h-10 w-px bg-fg/15 overflow-hidden">
                    <motion.span className="absolute inset-x-0 top-0 bg-accent" initial={false} animate={{ height: i <= active ? '100%' : '0%' }} transition={{ duration: 0.6, ease: EASE }} />
                  </li>
                ))}
              </ol>
              <div className="relative min-h-[340px] flex-1">
                <AnimatePresence mode="wait">
                  <motion.div key={active} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.55, ease: EASE }}>
                    <p className="t-label text-accent">
                      {String(active + 1).padStart(2, '0')} / {step.label}
                    </p>
                    <h3 className="t-h2 mt-5">{step.title}</h3>
                    <p className="t-lead mt-6 text-fg/65 max-w-[42ch] text-pretty">{step.body}</p>
                    {step.link && (
                      <div className="mt-8">
                        <TextLink to={step.link.to}>{step.link.text}</TextLink>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="col-span-7 pl-6">
              <p className="t-label text-fg/40 mb-5">Fig. 03 — Nostavia, in one diagram</p>
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
            <Reveal as="li" key={s.label} className="py-7 border-t border-fg/10">
              <p className="t-label text-accent">
                {String(i + 1).padStart(2, '0')} / {s.label}
              </p>
              <h3 className="t-h3 mt-4">{s.title}</h3>
              <p className="mt-3 text-fg/65 leading-relaxed">{s.body}</p>
              {s.link && (
                <div className="mt-5">
                  <TextLink to={s.link.to}>{s.link.text}</TextLink>
                </div>
              )}
            </Reveal>
          ))}
        </ol>
      </div>

      <div className="wrap pb-16">
        <p className="text-[12.5px] text-fg/40 max-w-[70ch]">{SAFETY_LINE}</p>
      </div>
    </section>
  );
};
