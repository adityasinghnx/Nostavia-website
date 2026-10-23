import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useSeo } from '../lib/useSeo';
import { BEE_DEFINITION, control, gettingStarted, HIVE_SUB, ways } from '../content/hive';
import { STUDIO } from '../content/site';
import { HiveConsole } from '../components/hive/HiveConsole';
import { BeeRun } from '../components/hive/BeeRun';
import { TeamBuilder } from '../components/hive/TeamBuilder';
import { FigLabel, PageHero, SectionHead } from '../components/page/PageKit';
import { FinalCta } from '../components/home/FinalCta';
import { Button, Label, Section } from '../components/ui/primitives';
import { Reveal, SplitHeading } from '../components/ui/motion';
import { cn } from '../lib/cn';

/* The Bees, all together: a full-bleed group shot with a slow parallax. */
const MeadowBanner: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} data-theme="ink" aria-labelledby="meet-title" className="relative overflow-hidden">
      <div className="relative h-[72vh] min-h-[420px] overflow-hidden">
        <motion.picture className="absolute inset-0 block" style={reduce ? undefined : { y, scale: 1.14 }}>
          <source media="(max-width: 768px)" srcSet="/bees/meadow-sm.webp" />
          <img src="/bees/meadow.webp" alt="Four Bees in a meadow at sunset, beside a woven hive" loading="lazy" decoding="async" className="h-full w-full object-cover object-[center_62%]" />
        </motion.picture>
        <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-ink to-transparent" />
      </div>
      <div className="wrap relative grid lg:grid-cols-12 gap-8 items-end pt-10 pb-[clamp(5rem,9vw,8rem)]">
        <div className="lg:col-span-6">
          <Label>The Bees</Label>
          <SplitHeading id="meet-title" className="t-display mt-6 max-w-[10ch]" text="Meet your *Bees.*" />
        </div>
        <Reveal className="lg:col-span-6">
          <p className="t-lead text-fg/65 max-w-[52ch]">{BEE_DEFINITION}</p>
        </Reveal>
      </div>
    </section>
  );
};

const HivePage: React.FC = () => {
  useSeo({
    title: 'Hive: how you run Human OS and Studio | Nostavia',
    description: `Hive is how your team uses Human OS and your ${STUDIO} builds. ${HIVE_SUB}`,
    path: '/hive',
  });

  return (
    <>
      <PageHero
        label="Hive · How you run it"
        display
        title="One workspace. *Bees do the routine work.*"
        intro={
          <>
            Hive is how your team uses Human OS and your {STUDIO} builds. {HIVE_SUB}
          </>
        }
        actions={
          <>
            <Button to="/demo" size="lg">
              Book a demo
            </Button>
            <Button href="#bee-run" size="lg" variant="secondary">
              Watch a Bee work
            </Button>
          </>
        }
      >
        <FigLabel n="01" className="mb-6">
          Hive, with sample data
        </FigLabel>
        <HiveConsole />
      </PageHero>

      <MeadowBanner />

      <Section theme="paper" labelledBy="ways-title">
        <div className="wrap">
          <SectionHead id="ways-title" label="How you work with Hive" title="Talk. Delegate. Supervise." intro="Your team works with Hive by asking, by handing things over, and by checking." />
          <ul className="grid md:grid-cols-3 border-t border-fg/[0.12]">
            {ways.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 0.06} className={cn('pt-9 pb-6 md:pr-8', i > 0 && 'md:border-l md:border-fg/[0.12] md:pl-8')}>
                <h3 className="text-[clamp(1.9rem,3vw,2.75rem)] tracking-[-0.035em]">{w.title}</h3>
                <p className="mt-3 text-[15.5px] text-fg/60 max-w-[32ch]">{w.body}</p>
                <p className="mt-7 rounded-2xl rounded-br-md bg-fg/[0.06] px-4 py-3 text-[14.5px] text-fg/85 max-w-[34ch]">“{w.example}”</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="team-title">
        <div className="wrap">
          <SectionHead id="team-title" label="Your starting team" title="Choose the Bees you need." intro="Pick your kind of business and Hive suggests a starting team. Add or remove any Bee, and give it a name if you like." />
          <TeamBuilder />
        </div>
      </Section>

      <Section theme="paper" labelledBy="control-title">
        <div className="wrap grid lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Label>You stay in control</Label>
              <SplitHeading id="control-title" className="t-h1 mt-6 max-w-[11ch]" text="A Bee earns its freedom." />
            </div>
          </div>
          <ol className="lg:col-span-7 border-t border-fg/[0.14]">
            {control.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.05} className="grid grid-cols-[3rem_1fr] gap-4 py-10 border-b border-fg/[0.14]">
                <span className="font-mono text-[12px] text-accent pt-3">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.05] tracking-[-0.03em]">{c.title}</h3>
                  <p className="mt-3 text-[16.5px] leading-relaxed text-fg/60 max-w-[46ch]">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="bee-run" labelledBy="bee-run-title">
        <div className="wrap">
          <SectionHead id="bee-run-title" label="A Bee at work" title="One job, start to finish." intro="A lab report comes in. Watch what a Bee does with it, and where a person steps in. Pick any step to look closer." />
          <FigLabel n="02" className="mb-6">
            A Bee, one job
          </FigLabel>
          <BeeRun />
        </div>
      </Section>

      <Section theme="paper" labelledBy="start-title">
        <div className="wrap">
          <SectionHead id="start-title" label="Getting started" title="It starts with a conversation." />
          <ol className="relative grid sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10 pt-10">
            <span aria-hidden="true" className="absolute left-0 right-0 top-0 h-px bg-fg/15" />
            {gettingStarted.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06} className="relative">
                <span aria-hidden="true" className="absolute -top-10 left-0 -translate-y-1/2 h-2.5 w-2.5 rounded-full border border-accent bg-bg" />
                <p className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 text-[clamp(1.25rem,1.7vw,1.5rem)] tracking-[-0.025em]">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-fg/60 max-w-[28ch]">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <FinalCta />
    </>
  );
};

export default HivePage;
