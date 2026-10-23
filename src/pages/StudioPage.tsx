import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useSeo } from '../lib/useSeo';
import { STUDIO, STUDIO_PATH } from '../content/site';
import { STUDIO_PROMISE, STUDIO_SUB, studioBuilds } from '../content/studio';
import { FigLabel, PageHero, SectionHead } from '../components/page/PageKit';
import { StudioSteps } from '../components/page/StudioSteps';
import { FinalCta } from '../components/home/FinalCta';
import { Button, Section } from '../components/ui/primitives';
import { Reveal, SplitHeading } from '../components/ui/motion';
import { BlurIn } from '../components/ui/effects';

const ParallaxPhoto: React.FC<{ src: string; alt: string; caption: string }> = ({ src, alt, caption }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  return (
    <figure>
      <BlurIn>
        <div ref={ref} className="relative overflow-hidden rounded-[20px] aspect-[16/8]">
          <motion.img src={src} alt={alt} decoding="async" style={reduce ? undefined : { y, scale: 1.16 }} className="photo absolute inset-0 h-full w-full object-cover" />
        </div>
      </BlurIn>
      <figcaption className="mt-4">
        <FigLabel n="01">{caption}</FigLabel>
      </figcaption>
    </figure>
  );
};

const StudioPage: React.FC = () => {
  useSeo({
    title: `${STUDIO}: what the Superintelligence builds for you | Nostavia`,
    description: STUDIO_SUB,
    path: STUDIO_PATH,
  });

  return (
    <>
      <PageHero
        label={STUDIO}
        display
        title="What the Superintelligence *builds for you.*"
        intro={STUDIO_SUB}
        actions={
          <Button to="/demo" size="lg">
            Talk to us about a build
          </Button>
        }
      >
        <ParallaxPhoto src="/photos/home-custom-team.jpg" alt="A product team planning a build together around a whiteboard" caption="Every build starts with listening" />
      </PageHero>

      <Section theme="paper" labelledBy="studio-builds">
        <div className="wrap">
          <SectionHead id="studio-builds" label="What we build" title="Built around your business, under your name." />
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-fg/[0.12]">
            {studioBuilds.map((b, i) => (
              <Reveal as="li" key={b.title} delay={i * 0.06} className="border-r border-b border-fg/[0.12] p-7 md:p-8 min-h-[240px] flex flex-col justify-between gap-10">
                <span className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-[clamp(1.4rem,2vw,1.75rem)] tracking-[-0.025em]">{b.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-fg/60">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="studio-process">
        <div className="wrap">
          <SectionHead id="studio-process" label="How we work" title="Five steps, and we stay." />
          <StudioSteps />
        </div>
      </Section>

      <Section theme="paper" labelledBy="studio-promise" tight>
        <div className="wrap text-center flex flex-col items-center">
          <SplitHeading id="studio-promise" className="t-h1 max-w-[18ch]" text={STUDIO_PROMISE} />
          <Reveal className="mt-10">
            <Button to="/demo" size="lg">
              Talk to us about a build
            </Button>
          </Reveal>
        </div>
      </Section>

      <FinalCta />
    </>
  );
};

export default StudioPage;
