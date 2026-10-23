import React from 'react';
import { practices, type PracticeIcon } from '../../content/trust';
import { DISCLAIMER } from '../../content/site';
import { Label, TextLink } from '../ui/primitives';
import { Reveal, SplitHeading } from '../ui/motion';

/* Line icons drawn for this set, one stroke weight. */
const icons: Record<PracticeIcon, React.ReactNode> = {
  consent: (
    <>
      <rect x="5" y="5" width="22" height="22" rx="6" />
      <path d="M10.5 16.5 14.5 20.5 21.5 12" />
    </>
  ),
  isolation: (
    <>
      <path d="M9 4.5 14 7.4v5.7L9 16 4 13.1V7.4z" />
      <path d="M23 4.5 28 7.4v5.7L23 16l-5-2.9V7.4z" />
      <path d="M16 16.5l5 2.9v5.7l-5 2.9-5-2.9v-5.7z" />
    </>
  ),
  encryption: (
    <>
      <rect x="6" y="14" width="20" height="14" rx="4" />
      <path d="M10.5 14v-3.5a5.5 5.5 0 0 1 11 0V14" />
      <path d="M16 19.5v3" />
    </>
  ),
  keys: (
    <>
      <rect x="9" y="3.5" width="14" height="25" rx="4" />
      <path d="M14 24.5h4" />
      <path d="M5 5l22 22" />
    </>
  ),
  clinical: (
    <>
      <circle cx="16" cy="16" r="12" />
      <path d="M16 10.5v11M10.5 16h11" />
    </>
  ),
  decision: (
    <>
      <path d="M16 4v24" />
      <path d="M7 10h18" />
      <path d="M7 10 4 18a3.5 3.5 0 0 0 6 0zM25 10l-3 8a3.5 3.5 0 0 0 6 0z" />
      <path d="M11 28h10" />
    </>
  ),
};

export const PracticeGlyph: React.FC<{ icon: PracticeIcon; className?: string }> = ({ icon, className }) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    {icons[icon]}
  </svg>
);

export const PracticesGrid: React.FC = () => (
  <ul className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-fg/[0.12]">
    {practices.map((p, i) => (
      <Reveal as="li" key={p.id} delay={(i % 3) * 0.06} className="border-r border-b border-fg/[0.12] p-7 md:p-9 flex flex-col gap-10 min-h-[260px]">
        <PracticeGlyph icon={p.icon} className="w-8 h-8 text-accent" />
        <div>
          <h3 className="text-[21px] tracking-[-0.02em]">{p.title}</h3>
          <p className="mt-2.5 text-[15px] leading-relaxed text-fg/60">{p.body}</p>
        </div>
      </Reveal>
    ))}
  </ul>
);

export const TrustSection: React.FC = () => (
  <section id="trust" data-theme="paper" aria-labelledby="trust-title" className="relative py-[clamp(6rem,11vw,10.5rem)]">
    <div className="wrap">
      <div className="grid lg:grid-cols-12 gap-10 items-end mb-14 md:mb-20">
        <div className="lg:col-span-7">
          <Label index="06">Health data</Label>
          <SplitHeading id="trust-title" className="t-h1 mt-6" text="Built for the most personal data there is." />
        </div>
        <Reveal className="lg:col-span-5 flex flex-col gap-6">
          <p className="text-[16px] leading-relaxed text-fg/60">How we handle what people trust you with, in plain terms.</p>
          <TextLink to="/security">How we handle health data</TextLink>
        </Reveal>
      </div>
      <PracticesGrid />
      <p className="mt-8 max-w-[80ch] text-[13px] leading-relaxed text-fg/45">{DISCLAIMER}</p>
    </div>
  </section>
);
