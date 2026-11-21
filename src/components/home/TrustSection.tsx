import React from 'react';
import { EyeOff, FileCheck2, Globe2, Layers, ToggleLeft, UserCheck, type LucideIcon } from 'lucide-react';
import { controls, regulations, TRUST_PATH, type ControlIcon } from '../../content/trust';
import { Label, TextLink } from '../ui/primitives';
import { Reveal, SplitHeading } from '../ui/motion';
import { CodeField } from '../ui/CodeField';

export const controlIcons: Record<ControlIcon, LucideIcon> = {
  region: Globe2,
  isolate: Layers,
  ai: ToggleLeft,
  deidentify: EyeOff,
  consent: FileCheck2,
  people: UserCheck,
};

/** The six controls as a ruled grid. Shared with the Trust page. */
export const ControlGrid: React.FC = () => (
  <ul className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-fg/[0.1]">
    {controls.map((c, i) => {
      const Icon = controlIcons[c.icon];
      return (
        <Reveal as="li" key={c.title} delay={(i % 3) * 0.06} className="border-b border-r border-fg/[0.1] p-7 md:p-9 flex flex-col gap-6">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-fg/[0.12] text-accent">
            <Icon className="w-[18px] h-[18px]" strokeWidth={1.6} />
          </span>
          <div>
            <h3 className="text-[19px] leading-[1.2] tracking-[-0.02em]">{c.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-fg/55 max-w-[38ch]">{c.body}</p>
          </div>
        </Reveal>
      );
    })}
  </ul>
);

/* Home: how health data is protected, and the rules the platform is built to. */
export const TrustSection: React.FC<{ index?: string }> = ({ index = '07' }) => (
  <section id="trust" data-theme="ink" aria-labelledby="trust-title" className="relative isolate py-[clamp(6rem,11vw,10.5rem)]">
    <CodeField />
    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(45%_70%_at_85%_0%,rgba(242,210,122,0.07),transparent_70%)]" />
    <div className="wrap relative">
      <div className="grid lg:grid-cols-12 gap-10 items-end mb-14 md:mb-20">
        <div className="lg:col-span-7">
          <Label index={index}>Trust and security</Label>
          <SplitHeading id="trust-title" className="t-h1 mt-6 max-w-[14ch]" text="Built for the scrutiny of *health data.*" />
        </div>
        <Reveal className="lg:col-span-5 flex flex-col gap-6">
          <p className="text-[16px] leading-relaxed text-fg/60 text-pretty">
            Patient records deserve more than a privacy policy. Privacy and clinical safety are part of how the platform is built, not a setting you switch on later.
          </p>
          <TextLink to={TRUST_PATH}>Visit the Trust Center</TextLink>
        </Reveal>
      </div>

      <ControlGrid />

      <Reveal className="mt-14 md:mt-16 grid md:grid-cols-12 gap-8 items-start">
        <p className="md:col-span-3 t-label text-fg/40 pt-1">Regulations</p>
        <ul className="md:col-span-9 grid sm:grid-cols-2 gap-x-10 gap-y-6">
          {regulations.map((r) => (
            <li key={r.region} className="flex gap-4">
              <span className="shrink-0 font-mono text-[11.5px] uppercase tracking-[0.12em] text-accent pt-1 w-[4.5rem]">{r.region}</span>
              <span className="text-[15px] leading-snug text-fg/75">{r.name}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);
