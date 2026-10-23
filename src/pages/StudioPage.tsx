import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useSeo } from '../lib/useSeo';
import { STUDIO, STUDIO_PATH } from '../content/site';
import { studioBuilds, studioPrinciples } from '../content/studio';
import { FigLabel, PageHero, RuledList, SectionHead } from '../components/page/PageKit';
import { StudioSteps } from '../components/home/StudioSection';
import { FinalCta } from '../components/home/FinalCta';
import { Button, Section } from '../components/ui/primitives';
import { Reveal } from '../components/ui/motion';

const ParallaxPhoto: React.FC<{ src: string; alt: string; caption: string; className?: string }> = ({ src, alt, caption, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  return (
    <figure className={className}>
      <div ref={ref} className="relative overflow-hidden rounded-[20px] aspect-[16/8]">
        <motion.img src={src} alt={alt} decoding="async" style={reduce ? undefined : { y, scale: 1.16 }} className="photo absolute inset-0 h-full w-full object-cover" />
      </div>
      <figcaption className="mt-4">
        <FigLabel n="01">{caption}</FigLabel>
      </figcaption>
    </figure>
  );
};

const StudioPage: React.FC = () => {
  useSeo({
    title: `${STUDIO}: what we build for you | Nostavia`,
    description: 'We listen first, then build what you need from scratch, reusing Human OS where it makes sense. Every build is made to run in Hive, and we stay on after launch.',
    path: STUDIO_PATH,
  });

  return (
    <>
      <PageHero
        label={STUDIO}
        display
        title="What we build *for you.*"
        intro="Some work needs something only you have. We listen first, then build it from scratch, reusing Human OS where it makes sense. When it is done, it runs in Hive like everything else."
        actions={
          <Button to="/demo" size="lg">
            Tell us what you need
          </Button>
        }
      >
        <ParallaxPhoto src="/photos/home-custom-team.jpg" alt="A product team planning a build together around a whiteboard" caption="Every build starts with listening" />
      </PageHero>

      <Section theme="paper" labelledBy="studio-process">
        <div className="wrap">
          <SectionHead id="studio-process" label="How a build runs" title="Four steps. No handover and goodbye." intro="A build is the start of working together, not a one-off job." />
          <StudioSteps />
        </div>
      </Section>

      <Section labelledBy="studio-builds">
        <div className="wrap">
          <SectionHead id="studio-builds" label="What we build" title="Shaped around how your team already works." />
          <ul className="border-t border-fg/10">
            {studioBuilds.map((b, i) => (
              <Reveal as="li" key={b.title} delay={(i % 4) * 0.05} className="group grid md:grid-cols-12 gap-x-10 gap-y-3 py-9 md:py-11 border-b border-fg/10">
                <span className="md:col-span-1 font-mono text-[12px] text-accent pt-3">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="md:col-span-6 text-[clamp(1.6rem,3.2vw,2.75rem)] leading-[1.05] tracking-[-0.03em] text-fg/90 group-hover:text-fg transition-colors">{b.title}</h3>
                <p className="md:col-span-5 text-[16px] leading-relaxed text-fg/55 md:pt-3">{b.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section theme="paper" labelledBy="studio-rules">
        <div className="wrap grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead id="studio-rules" label="What you can count on" title="Three things every build gets." className="lg:block mb-0" />
          </div>
          <div className="lg:col-span-7">
            <RuledList items={studioPrinciples} />
          </div>
        </div>
      </Section>

      <FinalCta title="Tell us what you *need built.*" body="Bring the problem, not a spec. We will come back with how we would build it and how it would run in Hive." />
    </>
  );
};

export default StudioPage;
