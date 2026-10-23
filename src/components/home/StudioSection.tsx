import React from 'react';
import { STUDIO, STUDIO_PATH } from '../../content/site';
import { STUDIO_SUB, studioBuilds } from '../../content/studio';
import { Button, Label, TextLink } from '../ui/primitives';
import { Reveal, SplitHeading } from '../ui/motion';
import { DeviceStage } from '../visuals/DeviceStage';
import { StudioSteps } from '../page/StudioSteps';

export const StudioSection: React.FC = () => (
  <section id="studio" data-theme="paper" aria-labelledby="studio-title" className="relative py-[clamp(6rem,11vw,10.5rem)] overflow-hidden">
    <div className="wrap">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        <div className="lg:col-span-5">
          <Label index="04">{STUDIO} · Built for you</Label>
          <SplitHeading id="studio-title" className="t-h1 mt-6 max-w-[16ch]" text="The product you need, built in your brand." />
          <Reveal>
            <p className="mt-7 t-lead text-fg/60 max-w-[44ch] text-pretty">{STUDIO_SUB}</p>
            <ul className="mt-9 border-t border-fg/[0.12]">
              {studioBuilds.map((b) => (
                <li key={b.title} className="flex items-baseline justify-between gap-6 py-3.5 border-b border-fg/[0.12]">
                  <span className="text-[17px] tracking-[-0.01em]">{b.title}</span>
                  <span className="text-[13.5px] text-fg/50 text-right max-w-[26ch]">{b.body}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Button to="/demo">Talk to us about a build</Button>
              <TextLink to={STUDIO_PATH}>How {STUDIO} works</TextLink>
            </div>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-7 lg:pl-6" delay={0.1}>
          <DeviceStage />
        </Reveal>
      </div>

      <div className="mt-24 md:mt-32">
        <p className="t-label text-fg/45 mb-8">How a build runs</p>
        <StudioSteps />
      </div>
    </div>
  </section>
);
