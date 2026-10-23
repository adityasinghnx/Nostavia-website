import React from 'react';
import { useSeo } from '../lib/useSeo';
import { BEE_DEFINITION, control, gettingStarted, HIVE_SUB, ways } from '../content/hive';
import { HiveConsole } from '../components/hive/HiveConsole';
import { BeeRun } from '../components/hive/BeeRun';
import { TeamBuilder } from '../components/hive/TeamBuilder';
import { FigLabel, PageHero, SectionHead } from '../components/page/PageKit';
import { FinalCta } from '../components/home/FinalCta';
import { Button, Section } from '../components/ui/primitives';
import { Reveal } from '../components/ui/motion';
import { cn } from '../lib/cn';

const HivePage: React.FC = () => {
  useSeo({
    title: 'Hive: where the Superintelligence works for you | Nostavia',
    description: HIVE_SUB,
    path: '/hive',
  });

  return (
    <>
      <PageHero
        label="Hive"
        display
        title="Where the Superintelligence *works for you.*"
        intro={HIVE_SUB}
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

      <Section theme="paper" labelledBy="ways-title">
        <div className="wrap">
          <SectionHead id="ways-title" label="How you work with Hive" title="Talk. Delegate. Supervise." intro="Your team works with Hive the way it works with a colleague: by asking, by handing things over, and by checking." />
          <ul className="grid md:grid-cols-3 border-t border-fg/[0.12]">
            {ways.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 0.06} className={cn('pt-9 pb-6 md:pr-8', i > 0 && 'md:border-l md:border-fg/[0.12] md:pl-8')}>
                <p className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 text-[clamp(1.75rem,2.8vw,2.5rem)] tracking-[-0.03em]">{w.title}</h3>
                <p className="mt-3 text-[15.5px] text-fg/60 max-w-[32ch]">{w.body}</p>
                <p className="mt-7 rounded-2xl rounded-br-md bg-fg/[0.06] px-4 py-3 text-[14.5px] text-fg/85 max-w-[34ch] ml-auto md:ml-0">“{w.example}”</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="team-title">
        <div className="wrap">
          <SectionHead id="team-title" label="What a Bee is" title="Choose your starting team." intro={BEE_DEFINITION} />
          <TeamBuilder />
        </div>
      </Section>

      <Section theme="paper" labelledBy="control-title">
        <div className="wrap">
          <SectionHead id="control-title" label="You stay in control" title="A Bee earns its freedom." />
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-fg/[0.12]">
            {control.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.06} className="border-r border-b border-fg/[0.12] p-7 md:p-8 min-h-[250px] flex flex-col justify-between gap-10">
                <span className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-[21px] tracking-[-0.02em]">{c.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-fg/60">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
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
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10 border-t border-fg/[0.12] pt-10">
            {gettingStarted.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06}>
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
