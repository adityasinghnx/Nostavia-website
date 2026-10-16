import React from 'react';

/* Shared layout for the homepage sections below the hero. Palette: Human OS
 * (hos-*) tokens, matching the seed deck. Typeface stays Plus Jakarta Sans. */

export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hos-amber focus-visible:ring-offset-2';

export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`max-w-[1280px] mx-auto px-4 sm:px-6 ${className}`}>{children}</div>
);

type Tone = 'light' | 'dark';

export const Eyebrow: React.FC<{ children: React.ReactNode; tone?: Tone }> = ({ children, tone = 'light' }) => (
  <div className={`font-mono text-xs font-bold uppercase tracking-widest ${tone === 'dark' ? 'text-hos-yellow' : 'text-hos-amber'}`}>
    {children}
  </div>
);

export const SectionHeading: React.FC<{
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: Tone;
  className?: string;
}> = ({ id, eyebrow, title, intro, tone = 'light', className = '' }) => (
  <div className={`space-y-4 max-w-3xl ${className}`}>
    <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
    <h2
      id={id}
      className={`font-display font-semibold text-3xl sm:text-5xl tracking-tight leading-[1.08] ${tone === 'dark' ? 'text-white' : 'text-hos-black'}`}
    >
      {title}
    </h2>
    {intro && (
      <p className={`text-base sm:text-lg leading-relaxed ${tone === 'dark' ? 'text-slate-300' : 'text-[#475569]'}`}>{intro}</p>
    )}
  </div>
);
