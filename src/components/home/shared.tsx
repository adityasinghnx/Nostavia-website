import React from 'react';

/* Shared layout primitives for the dark theme (dark-redesign branch).
 * Surfaces: ink-950 / ink-900. Text: white with opacity (body never below /55).
 * Accent: hos-yellow, used sparingly for eyebrows, highlights and glows. */

export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hos-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950';

export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`max-w-[1280px] mx-auto px-4 sm:px-6 ${className}`}>{children}</div>
);

type Tone = 'light' | 'dark';

/** Small label above a heading. `tone` is kept for API compatibility; the theme is always dark. */
export const Eyebrow: React.FC<{ children: React.ReactNode; tone?: Tone }> = ({ children }) => (
  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-hos-yellow">
    <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-hos-yellow shadow-[0_0_12px_2px_rgba(245,217,123,0.6)]" />
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
  center?: boolean;
}> = ({ id, eyebrow, title, intro, className = '', center = false }) => (
  <div className={`space-y-5 max-w-3xl ${center ? 'mx-auto text-center flex flex-col items-center' : ''} ${className}`}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 id={id} className="font-display font-semibold text-3xl sm:text-5xl tracking-tight leading-[1.06] dk-text-gradient pb-1">
      {title}
    </h2>
    {intro && <p className="text-base sm:text-lg leading-relaxed text-white/60">{intro}</p>}
  </div>
);
