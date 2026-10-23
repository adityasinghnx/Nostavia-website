import React from 'react';
import { Link } from 'react-router-dom';
import { useSeo } from '../lib/useSeo';
import { differentiators, parts, SUPER_LEAD } from '../content/superintelligence';
import { SAFETY_LINE } from '../content/site';
import { StructureDiagram } from '../components/hive/StructureDiagram';
import { FigLabel, PageHero, SectionHead } from '../components/page/PageKit';
import { PrinciplesSection } from '../components/home/PrinciplesSection';
import { FinalCta } from '../components/home/FinalCta';
import { Arrow, Button, Section } from '../components/ui/primitives';
import { Reveal } from '../components/ui/motion';

const SuperintelligencePage: React.FC = () => {
  useSeo({
    title: 'Nostavia Superintelligence: one intelligence across your health business',
    description: SUPER_LEAD,
    path: '/superintelligence',
  });

  return (
    <>
      <PageHero
        label="Superintelligence"
        title="One intelligence across your whole *health business.*"
        intro={SUPER_LEAD}
        actions={
          <>
            <Button to="/demo" size="lg">
              Book a demo
            </Button>
            <Button href="#parts" size="lg" variant="secondary">
              The three parts
            </Button>
          </>
        }
      >
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4">
            <FigLabel n="01">Nostavia, in one diagram</FigLabel>
            <p className="mt-4 text-[15px] leading-relaxed text-fg/55 max-w-[36ch]">Superintelligence is the intelligence. Human OS is what it understands. Hive is where it works. Studio is what it builds for you.</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <StructureDiagram focus="all" />
          </div>
        </div>
      </PageHero>

      <Section id="parts" theme="paper" labelledBy="parts-title">
        <div className="wrap">
          <SectionHead id="parts-title" label="Three parts, one intelligence" title="How it understands, works and builds." />
          <div className="hidden md:grid grid-cols-12 gap-x-10 pb-4 border-b border-fg/[0.12] t-label text-fg/40">
            <span className="col-span-3">Part</span>
            <span className="col-span-5">What it does</span>
            <span className="col-span-4">Where your team meets it</span>
          </div>
          <ul>
            {parts.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 0.06} className="border-b border-fg/[0.12]">
                <Link to={p.to} className="group grid md:grid-cols-12 gap-x-10 gap-y-3 py-9">
                  <span className="md:col-span-3">
                    <span className="block t-label text-accent">{p.verb}</span>
                    <span className="mt-3 flex items-center gap-3 text-[clamp(1.6rem,2.6vw,2.25rem)] tracking-[-0.03em]">
                      {p.name}
                      <Arrow className="w-5 h-5 text-fg/30 transition-all group-hover:text-accent group-hover:translate-x-1" />
                    </span>
                  </span>
                  <span className="md:col-span-5 text-[16.5px] leading-relaxed text-fg/75 md:pt-7">{p.does}</span>
                  <span className="md:col-span-4 text-[15px] leading-relaxed text-fg/55 md:pt-7">{p.meets}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="different-title">
        <div className="wrap">
          <SectionHead id="different-title" label="What makes it different" title="Made for healthcare work, not general chat." />
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-fg/10 border border-fg/10 rounded-[20px] overflow-hidden">
            {differentiators.map((d, i) => (
              <Reveal as="li" key={d.title} delay={(i % 3) * 0.05} className="bg-bg p-7 md:p-9 min-h-[230px] flex flex-col justify-between gap-8">
                <span className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-[21px] tracking-[-0.02em]">{d.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-fg/60">{d.body}</p>
                </div>
              </Reveal>
            ))}
            <li className="bg-bg p-7 md:p-9 min-h-[230px] flex flex-col justify-end">
              <p className="text-[13px] leading-relaxed text-fg/50">{SAFETY_LINE}</p>
            </li>
          </ul>
        </div>
      </Section>

      <div id="private">
        <PrinciplesSection index="" />
      </div>

      <FinalCta />
    </>
  );
};

export default SuperintelligencePage;
