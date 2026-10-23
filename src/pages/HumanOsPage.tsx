import React from 'react';
import { useSeo } from '../lib/useSeo';
import { families, groups, HUMAN_OS_SUB } from '../content/human-os';
import { SAFETY_LINE } from '../content/site';
import { PageHero, SectionHead } from '../components/page/PageKit';
import { FinalCta } from '../components/home/FinalCta';
import { Button, Section } from '../components/ui/primitives';
import { Reveal } from '../components/ui/motion';
import { cn } from '../lib/cn';

const HumanOsPage: React.FC = () => {
  useSeo({
    title: 'Human OS: what the Superintelligence understands | Nostavia',
    description: `${HUMAN_OS_SUB} For your customers and for your care team.`,
    path: '/human-os',
  });

  return (
    <>
      <PageHero
        label="Human OS"
        display
        title="What the Superintelligence *understands.*"
        intro={HUMAN_OS_SUB}
        actions={
          <>
            <Button to="/developers" size="lg">
              Read the docs
            </Button>
            <Button to="/demo" size="lg" variant="secondary">
              Book a demo
            </Button>
          </>
        }
        aside={
          <dl className="grid grid-cols-2 border-t border-fg/10">
            {groups.map((g, i) => (
              <div key={g.name} className={cn('pt-5', i > 0 && 'border-l border-fg/10 pl-5')}>
                <dt className="text-[15px]">{g.name}</dt>
                <dd className="mt-2 text-[13.5px] leading-relaxed text-fg/50">{g.body}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <Section theme="paper" labelledBy="families-title">
        <div className="wrap">
          <SectionHead id="families-title" label="What it covers" title="Five families of health understanding." />
          <ul className="border-t border-fg/[0.12]">
            {families.map((f, i) => (
              <Reveal as="li" key={f.name} delay={(i % 5) * 0.05} className="group grid md:grid-cols-12 gap-x-10 gap-y-3 py-9 md:py-11 border-b border-fg/[0.12]">
                <span className="md:col-span-1 font-mono text-[12px] text-accent pt-3">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="md:col-span-5 text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.05] tracking-[-0.03em]">{f.name}</h3>
                <p className="md:col-span-6 text-[16.5px] leading-relaxed text-fg/60 md:pt-3">{f.does}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <p className="text-[clamp(1.25rem,2vw,1.6rem)] tracking-[-0.02em] max-w-[34ch]">Tell us what you need and we will show you how it fits your product.</p>
            <div className="flex flex-wrap gap-3">
              <Button to="/developers">Read the docs</Button>
              <Button to="/demo" variant="secondary">
                Book a demo
              </Button>
            </div>
          </Reveal>
          <p className="mt-12 max-w-[80ch] text-[13px] leading-relaxed text-fg/45">{SAFETY_LINE}</p>
        </div>
      </Section>

      <FinalCta />
    </>
  );
};

export default HumanOsPage;
