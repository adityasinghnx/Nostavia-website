import React from 'react';
import { Mic, LayoutDashboard, Globe, Smartphone } from 'lucide-react';
import { useSeo } from '../lib/useSeo';
import { FLAGS, STUDIO, STUDIO_PATH } from '../content/site';
import { STUDIO_PROMISE, STUDIO_SUB, studioBuilds } from '../content/studio';
import { PageHero, SectionHead } from '../components/page/PageKit';
import { StudioSteps } from '../components/page/StudioSteps';
import { FinalCta } from '../components/home/FinalCta';
import { StudioShowcase } from '../components/visuals/StudioShowcase';
import { Button, Section } from '../components/ui/primitives';
import { Reveal, SplitHeading } from '../components/ui/motion';
import { BlurIn, PhotoBlur } from '../components/ui/effects';

const buildIcons = [Smartphone, LayoutDashboard, Globe, Mic];

const StudioPage: React.FC = () => {
  useSeo({
    title: `${STUDIO}: health products built for you | Nostavia`,
    description: STUDIO_SUB,
    path: STUDIO_PATH,
  });

  return (
    <>
      <PageHero
        label={`${STUDIO} · Built for you`}
        display
        title="Built for you, *in your brand.*"
        intro={STUDIO_SUB}
        actions={
          <Button to="/demo" size="lg">
            Talk to us about a build
          </Button>
        }
      >
        <StudioShowcase />
      </PageHero>

      <Section theme="paper" labelledBy="studio-builds">
        <div className="wrap">
          <SectionHead id="studio-builds" label="What we build" title="Shaped around how your business works." />
          <ul className="border-t border-fg/[0.12]">
            {studioBuilds.map((b, i) => {
              const Icon = buildIcons[i];
              return (
                <Reveal as="li" key={b.title} delay={(i % 4) * 0.05} className="group grid grid-cols-[3rem_1fr] md:grid-cols-12 items-center gap-x-6 gap-y-2 py-8 md:py-10 border-b border-fg/[0.12]">
                  <span className="md:col-span-1 grid h-12 w-12 place-items-center rounded-full border border-fg/15 text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.4} />
                  </span>
                  <h3 className="md:col-span-6 text-[clamp(1.6rem,3.2vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">{b.title}</h3>
                  <p className="col-start-2 md:col-start-auto md:col-span-5 text-[16px] leading-relaxed text-fg/55">{b.body}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Section>

      <Section labelledBy="studio-process">
        <div className="wrap">
          <SectionHead id="studio-process" label="How we work" title="Five steps, and we stay." intro="A build is the start of working together, not a one-off job." />
          <StudioSteps />
        </div>
      </Section>

      <Section theme="paper" labelledBy="studio-promise" className="overflow-hidden">
        <div className="wrap grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <SplitHeading id="studio-promise" className="t-h1 max-w-[14ch]" text={STUDIO_PROMISE} />
            <Reveal className="mt-10">
              <Button to="/demo" size="lg">
                Talk to us about a build
              </Button>
            </Reveal>
          </div>
          <BlurIn className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[24px] aspect-[4/3]">
              <img src="/photos/home-custom-team.jpg" alt="A product team planning a build together around a whiteboard" loading="lazy" decoding="async" className="photo absolute inset-0 h-full w-full object-cover" />
              <PhotoBlur src="/photos/home-custom-team.jpg" />
              <p className="absolute bottom-0 inset-x-0 p-5 pt-12 t-label text-white/85 bg-gradient-to-t from-black/60 to-transparent">Every build starts with listening</p>
            </div>
          </BlurIn>
        </div>
      </Section>

      <FinalCta title="Tell us what you *need built.*" body={FLAGS.SHOW_HIVE ? 'Bring the problem, not a spec. We will come back with how we would build it, what we would reuse, and how your Bees would run it.' : 'Bring the problem, not a spec. We will come back with how we would build it and what we would reuse.'} />
    </>
  );
};

export default StudioPage;
