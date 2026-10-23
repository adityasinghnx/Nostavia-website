import React from 'react';
import { Link } from 'react-router-dom';
import { useSeo } from '../lib/useSeo';
import { hivePrinciples } from '../content/hive';
import { STUDIO, STUDIO_PATH } from '../content/site';
import { HiveConsole } from '../components/hive/HiveConsole';
import { BeeRun } from '../components/hive/BeeRun';
import { StructureDiagram } from '../components/hive/StructureDiagram';
import { FigLabel, PageHero, SectionHead } from '../components/page/PageKit';
import { FinalCta } from '../components/home/FinalCta';
import { Arrow, Button, Label, Section } from '../components/ui/primitives';
import { Reveal, SplitHeading } from '../components/ui/motion';
import { BeeGlyph } from '../components/ui/marks';

const does = [
  'Runs the Human OS modules you picked',
  `Runs the builds ${STUDIO} made for you`,
  'Sends reports, answers calls and follows up',
  'Prepares briefs before your team needs them',
  'Writes down every step it takes',
];

const doesNot = ['Diagnose', 'Make dosing decisions', 'Send anything clinical without a person approving it', 'Replace your clinicians'];

const HivePage: React.FC = () => {
  useSeo({
    title: 'Hive: one place where Bees run your health business | Nostavia',
    description: 'Hive is the one place every Nostavia customer works. Inside it, AI Bees run your Human OS modules and the builds we make for you, with a person approving anything clinical.',
    path: '/hive',
  });

  return (
    <>
      <PageHero
        label="Hive"
        display
        title="One place. Your Bees *do the rest.*"
        intro={
          <>
            Hive is where every Nostavia customer works. Inside it, AI agents we call <span className="text-fg">Bees</span> run everything you have with us: the Human OS modules you picked and the builds we made for you.
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

      <Section theme="paper" labelledBy="hive-principles">
        <div className="wrap">
          <SectionHead id="hive-principles" label="How it works" title="Your team stops jumping between tools." intro="Whatever you buy from Nostavia, you end up in Hive. That is the whole idea." />
          <ul className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-fg/[0.12]">
            {hivePrinciples.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.06} className="pt-8 pb-10 md:pr-8 border-b lg:border-b-0 border-fg/[0.12] lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-8">
                <p className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-5 t-h3">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-fg/60">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="bee-run" labelledBy="bee-run-title">
        <div className="wrap">
          <SectionHead
            id="bee-run-title"
            label="A Bee at work"
            title="One job, start to finish."
            intro="A lab report comes in. Watch what a Bee does with it, and where a person steps in. Pick any step to look closer."
          />
          <FigLabel n="02" className="mb-6">
            A Bee, one job
          </FigLabel>
          <BeeRun />
        </div>
      </Section>

      <Section theme="paper" labelledBy="bees-limits">
        <div className="wrap">
          <SectionHead id="bees-limits" label="Clear lines" title="What Bees do, and what they never do." />
          <div className="grid md:grid-cols-2 gap-px bg-fg/[0.12] border border-fg/[0.12] rounded-[20px] overflow-hidden">
            <Reveal className="bg-bg p-8 md:p-10">
              <p className="t-label text-accent">Bees do</p>
              <ul className="mt-6 flex flex-col">
                {does.map((d) => (
                  <li key={d} className="flex items-start gap-3 py-3 border-b border-fg/10 last:border-0 text-[16.5px]">
                    <BeeGlyph className="w-4 h-4 mt-1 shrink-0 text-accent" />
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="bg-bg p-8 md:p-10" delay={0.08}>
              <p className="t-label text-fg/50">Bees never</p>
              <ul className="mt-6 flex flex-col">
                {doesNot.map((d) => (
                  <li key={d} className="flex items-start gap-3 py-3 border-b border-fg/10 last:border-0 text-[16.5px]">
                    <span aria-hidden="true" className="mt-[11px] h-px w-4 shrink-0 bg-fg/40" />
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section labelledBy="hive-structure">
        <div className="wrap grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-5">
            <Label>Underneath Hive</Label>
            <SplitHeading id="hive-structure" className="t-h2 mt-6 mb-10" text="Two ways work gets into Hive." />
            <Reveal className="flex flex-col gap-3">
              {[
                { to: '/human-os', name: 'Human OS', line: "What we've built. Ready-made modules." },
                { to: STUDIO_PATH, name: STUDIO, line: 'What we build for you. Custom, made to run in Hive.' },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="group flex items-center justify-between gap-6 rounded-2xl border border-fg/10 px-6 py-5 hover:border-accent/40 transition-colors">
                  <span>
                    <span className="block text-[20px] tracking-[-0.02em]">{l.name}</span>
                    <span className="block mt-1 text-[14.5px] text-fg/55">{l.line}</span>
                  </span>
                  <Arrow className="w-5 h-5 text-fg/40 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7 lg:pl-8" delay={0.1}>
            <FigLabel n="03" className="mb-6">
              How Nostavia fits together
            </FigLabel>
            <StructureDiagram focus="all" />
          </Reveal>
        </div>
      </Section>

      <FinalCta />
    </>
  );
};

export default HivePage;
