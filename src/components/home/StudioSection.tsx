import React from 'react';
import { STUDIO, STUDIO_PATH } from '../../content/site';
import { STUDIO_SUB, studioBuilds } from '../../content/studio';
import { cn } from '../../lib/cn';
import { Button, Label, TextLink } from '../ui/primitives';
import { Reveal, SplitHeading } from '../ui/motion';
import { StudioShowcase } from '../visuals/StudioShowcase';
import { StudioSteps } from '../page/StudioSteps';

export const StudioSection: React.FC = () => (
  <section id="studio" data-theme="paper" aria-labelledby="studio-title" className="relative py-[clamp(6rem,11vw,10.5rem)] overflow-hidden">
    <div className="wrap">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
        <div className="lg:col-span-8">
          <Label index="04">{STUDIO} · Built for you</Label>
          <SplitHeading id="studio-title" className="t-display mt-7 max-w-[11ch]" text="The product you need, *built in your brand.*" />
        </div>
        <Reveal className="lg:col-span-4 flex flex-col items-start gap-8">
          <p className="t-lead text-fg/60 text-pretty">{STUDIO_SUB}</p>
          <div className="flex flex-wrap items-center gap-6">
            <Button to="/demo">Talk to us about a build</Button>
            <TextLink to={STUDIO_PATH}>How {STUDIO} works</TextLink>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-14 md:mt-20" delay={0.1}>
        <StudioShowcase />
      </Reveal>

      <ul className="mt-12 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-y-8">
        {studioBuilds.map((b, i) => (
          <Reveal as="li" key={b.title} delay={i * 0.05} className={cn('border-t border-fg/[0.12] pt-6 sm:pr-8', i > 0 && 'lg:border-l lg:pl-8', i % 2 === 1 && 'sm:border-l sm:pl-8 lg:pl-8')}>
            <h3 className="text-[19px] tracking-[-0.015em]">{b.title}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-fg/55 max-w-[30ch]">{b.body}</p>
          </Reveal>
        ))}
      </ul>

      <div className="mt-24 md:mt-32">
        <p className="t-label text-fg/45 mb-8">How a build runs</p>
        <StudioSteps />
      </div>
    </div>
  </section>
);
