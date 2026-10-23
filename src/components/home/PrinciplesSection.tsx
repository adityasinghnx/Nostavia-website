import React from 'react';
import { principles } from '../../content/superintelligence';
import { SAFETY_LINE } from '../../content/site';
import { Label } from '../ui/primitives';
import { Reveal, SplitHeading } from '../ui/motion';

/* One line icon per principle, same stroke weight throughout. */
const glyphs = [
  // People stay in charge: a hand-off with a check
  <>
    <circle cx="16" cy="10" r="4.5" />
    <path d="M7 27c0-5 4-9 9-9s9 4 9 9" />
    <path d="M20.5 22.5l2.5 2.5 4.5-5" />
  </>,
  // Never clinical judgement: cross with a line through
  <>
    <circle cx="16" cy="16" r="11.5" />
    <path d="M16 10.5v11M10.5 16h11" />
    <path d="M7.8 24.2 24.2 7.8" />
  </>,
  // Private by design: a cell inside a cell
  <>
    <path d="M16 3.5 27 9.8v12.4L16 28.5 5 22.2V9.8z" />
    <path d="M16 11l4.5 2.6v5.2L16 21.4l-4.5-2.6v-5.2z" />
  </>,
  // Your brand, your patients: a label
  <>
    <path d="M5 16.5V6.5a1.5 1.5 0 0 1 1.5-1.5h10l10 10-11.5 11.5z" />
    <circle cx="11" cy="11" r="2" />
  </>,
];

export const PrinciplesSection: React.FC<{ index?: string }> = ({ index = '03' }) => (
  <section id="principles" data-theme="paper" aria-labelledby="principles-title" className="relative py-[clamp(6rem,11vw,10.5rem)]">
    <div className="wrap">
      <div className="grid lg:grid-cols-12 gap-10 items-end mb-14 md:mb-20">
        <div className="lg:col-span-8">
          <Label index={index || undefined}>Principles</Label>
          <SplitHeading id="principles-title" className="t-h1 mt-6 max-w-[16ch]" text="Superintelligence, with people in charge." />
        </div>
      </div>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-fg/[0.12]">
        {principles.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 0.06} className="border-r border-b border-fg/[0.12] p-7 md:p-8 flex flex-col gap-12 min-h-[280px]">
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-8 h-8 text-accent">
              {glyphs[i]}
            </svg>
            <div>
              <h3 className="text-[21px] tracking-[-0.02em]">{p.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-fg/60">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>
      <p className="mt-8 max-w-[80ch] text-[13px] leading-relaxed text-fg/45">{SAFETY_LINE}</p>
    </div>
  </section>
);
