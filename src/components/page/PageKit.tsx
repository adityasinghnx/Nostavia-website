import React from 'react';
import { Label } from '../ui/primitives';
import { Reveal, SplitHeading } from '../ui/motion';
import { cn } from '../../lib/cn';

/* Building blocks shared by the inner pages. */

export const PageHero: React.FC<{
  label: string;
  title: string;
  intro: React.ReactNode;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  children?: React.ReactNode;
  theme?: 'ink' | 'paper';
  display?: boolean;
}> = ({ label, title, intro, actions, aside, children, theme = 'ink', display }) => (
  <section data-theme={theme} aria-labelledby="page-title" className="relative overflow-hidden pt-36 md:pt-44 pb-[clamp(4rem,8vw,7rem)]">
    {theme === 'ink' && <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(60%_80%_at_20%_0%,rgba(242,210,122,0.08),transparent_70%)]" />}
    <div className="wrap relative">
      <Label>{label}</Label>
      <SplitHeading id="page-title" as="h1" trigger="mount" delay={0.15} className={cn('mt-7', display ? 't-display max-w-[13ch]' : 't-h1 max-w-[16ch]')} text={title} />
      <div className="mt-10 md:mt-14 grid lg:grid-cols-12 gap-10 items-end">
        <Reveal className="lg:col-span-6 flex flex-col items-start gap-8" delay={0.5}>
          <div className="t-lead text-fg/65 text-pretty max-w-[50ch]">{intro}</div>
          {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
        </Reveal>
        {aside && (
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.6}>
            {aside}
          </Reveal>
        )}
      </div>
      {children && (
        <Reveal className="mt-16 md:mt-24" delay={0.7}>
          {children}
        </Reveal>
      )}
    </div>
  </section>
);

export const SectionHead: React.FC<{
  label: string;
  index?: string;
  title: string;
  id: string;
  intro?: React.ReactNode;
  className?: string;
}> = ({ label, index, title, id, intro, className }) => (
  <div className={cn('grid lg:grid-cols-12 gap-8 lg:gap-10 items-end mb-14 md:mb-20', className)}>
    <div className="lg:col-span-7">
      <Label index={index}>{label}</Label>
      <SplitHeading id={id} className="t-h2 mt-6" text={title} />
    </div>
    {intro && (
      <Reveal className="lg:col-span-5">
        <div className="text-[16px] leading-relaxed text-fg/60 text-pretty">{intro}</div>
      </Reveal>
    )}
  </div>
);

/** Editorial figure label: "Fig. 02 — A Bee, one job" */
export const FigLabel: React.FC<{ n: string; children: React.ReactNode; className?: string }> = ({ n, children, className }) => (
  <p className={cn('t-label text-fg/40', className)}>
    Fig. {n} — {children}
  </p>
);

/** Numbered list with hairlines, used for principles and steps. */
export const RuledList: React.FC<{ items: { title: string; body: string }[]; numbered?: boolean; columns?: 1 | 2 }> = ({ items, numbered = true, columns = 1 }) => (
  <ul className={cn('border-t border-fg/[0.12]', columns === 2 && 'grid md:grid-cols-2 md:gap-x-12')}>
    {items.map((item, i) => (
      <Reveal as="li" key={item.title} delay={(i % 4) * 0.05} className="grid grid-cols-[2.5rem_1fr] gap-4 py-8 border-b border-fg/[0.12]">
        <span className="font-mono text-[12px] text-fg/40 pt-2">{numbered ? String(i + 1).padStart(2, '0') : ''}</span>
        <div>
          <h3 className="t-h3">{item.title}</h3>
          <p className="mt-3 text-[15.5px] leading-relaxed text-fg/60 max-w-[52ch]">{item.body}</p>
        </div>
      </Reveal>
    ))}
  </ul>
);
