import React from 'react';
import { principles } from '../../content/offer';
import { SAFETY_LINE } from '../../content/site';
import { Label } from '../ui/primitives';
import { Reveal, SplitHeading } from '../ui/motion';

/* Principles as an editorial list: a pinned heading on the left, four statements set large on the right. */
export const PrinciplesSection: React.FC<{ index?: string }> = ({ index = '06' }) => (
  <section id="principles" data-theme="paper" aria-labelledby="principles-title" className="relative py-[clamp(6rem,11vw,10.5rem)]">
    <div className="wrap grid lg:grid-cols-12 gap-12 lg:gap-10">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <Label index={index || undefined}>Principles</Label>
          <SplitHeading id="principles-title" className="t-h1 mt-6 max-w-[11ch]" text="Health AI, with people in charge." />
          <Reveal>
            <p className="mt-8 text-[14px] leading-relaxed text-fg/50 max-w-[40ch]">{SAFETY_LINE}</p>
          </Reveal>
        </div>
      </div>
      <ol className="lg:col-span-7 border-t border-fg/[0.14]">
        {principles.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 0.05} className="grid grid-cols-[3rem_1fr] gap-4 py-10 md:py-12 border-b border-fg/[0.14]">
            <span className="font-mono text-[12px] text-accent pt-3">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.02] tracking-[-0.035em]">{p.title}</h3>
              <p className="mt-4 text-[17px] leading-relaxed text-fg/60 max-w-[44ch]">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);
