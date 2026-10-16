import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';
import { findModule, systemPath } from '../../content/human-os';
import { Container, Eyebrow, SectionHeading, focusRing } from '../home/shared';
import { CountUp, Reveal } from '../home/motion';
import { LayerStack } from '../home/ClosingCtaSection';

/* ─────────────────────────────────────────────────────────────────────────────
 * Page kit: the building blocks every inner page uses, in the homepage's design
 * language (hos-* palette, white and hos-mist sections, navy bands, yellow as an
 * accent only, real photos, motion via Reveal). Compose pages from these rather
 * than styling sections by hand.
 * ──────────────────────────────────────────────────────────────────────────── */

export type Bg = 'white' | 'mist' | 'navy';

const bgClass: Record<Bg, string> = {
  white: 'bg-white text-hos-black',
  mist: 'bg-hos-mist text-hos-black',
  navy: 'bg-hos-navy text-white',
};

export const primaryBtn = `inline-flex items-center justify-center gap-2 bg-hos-black hover:bg-black text-white font-display text-xs font-bold uppercase tracking-wider px-7 py-4 rounded-[2px] transition-colors ${focusRing}`;
export const secondaryBtn = `inline-flex items-center justify-center gap-2 border border-hos-hairline hover:border-hos-black bg-white text-hos-black font-display text-xs font-bold uppercase tracking-wider px-7 py-4 rounded-[2px] transition-colors ${focusRing}`;
export const textLink = `inline-flex items-center gap-2 text-sm font-bold text-hos-black underline underline-offset-4 decoration-hos-yellow decoration-2 hover:decoration-hos-amber ${focusRing}`;

export interface Cta {
  to: string;
  label: string;
}

export interface Photo {
  src: string;
  w: number;
  h: number;
  alt: string;
}

/** Section wrapper with consistent spacing. */
export const Section: React.FC<{ id?: string; labelledBy?: string; bg?: Bg; className?: string; children: React.ReactNode }> = ({
  id,
  labelledBy,
  bg = 'white',
  className = '',
  children,
}) => (
  <section id={id} aria-labelledby={labelledBy} className={`${bgClass[bg]} py-20 sm:py-28 ${className}`}>
    <Container className="space-y-12">{children}</Container>
  </section>
);

/**
 * Page hero: the page's single H1. Text on the left; a photo on the right with an
 * optional live product card over it, or a visual on a navy panel if no photo.
 */
export const PageHero: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  primary?: Cta;
  secondary?: Cta;
  photo?: Photo;
  visual?: React.ReactNode;
  points?: string[];
}> = ({ eyebrow, title, intro, primary = { to: '/demo', label: 'Request a demo' }, secondary, photo, visual, points }) => (
  <section className="bg-white pt-10 sm:pt-16 pb-16 sm:pb-24">
    <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      <Reveal className="lg:col-span-6 space-y-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-display font-semibold text-4xl sm:text-6xl text-hos-black tracking-tight leading-[1.04]">{title}</h1>
        <p className="text-lg sm:text-xl text-[#475569] leading-relaxed max-w-xl">{intro}</p>
        {points && points.length > 0 && (
          <ul className="space-y-2 pt-1">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-base text-hos-black">
                <span aria-hidden="true" className="mt-2 w-4 h-[3px] shrink-0 bg-hos-yellow" />
                {p}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-3 pt-2">
          {primary && (
            <Link to={primary.to} className={primaryBtn}>
              {primary.label}
            </Link>
          )}
          {secondary && (
            <Link to={secondary.to} className={secondaryBtn}>
              {secondary.label}
              <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </Reveal>
      <Reveal delay={150} className="lg:col-span-6">
        {photo ? (
          <div className="relative min-h-[360px] sm:min-h-[460px] rounded-[20px] overflow-hidden bg-hos-navy shadow-[0_40px_90px_-45px_rgba(18,26,49,0.55)]">
            <img src={photo.src} alt={photo.alt} width={photo.w} height={photo.h} decoding="async" className="absolute inset-0 w-full h-full object-cover" />
            {visual && (
              <>
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-hos-black/60 via-transparent to-transparent" />
                <div aria-hidden="true" className="absolute left-4 right-4 bottom-4 sm:left-6 sm:right-auto sm:bottom-6">
                  {visual}
                </div>
              </>
            )}
          </div>
        ) : (
          <div aria-hidden="true" className="rounded-[20px] bg-hos-navy p-8 sm:p-12 flex items-center justify-center min-h-[360px]">
            {visual ?? <LayerStack />}
          </div>
        )}
      </Reveal>
    </Container>
  </section>
);

/** Section heading wrapped in a reveal, optionally with an action on the right. */
export const SectionHead: React.FC<{ id: string; eyebrow: string; title: React.ReactNode; intro?: React.ReactNode; tone?: 'light' | 'dark'; action?: Cta }> = ({
  id,
  eyebrow,
  title,
  intro,
  tone = 'light',
  action,
}) => (
  <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
    <SectionHeading id={id} eyebrow={eyebrow} title={title} intro={intro} tone={tone} />
    {action && (
      <Link to={action.to} className={tone === 'dark' ? `${textLink} text-white decoration-hos-yellow` : textLink}>
        {action.label}
        <ArrowRight aria-hidden="true" className="w-4 h-4" />
      </Link>
    )}
  </Reveal>
);

export interface Feature {
  icon?: React.FC<{ className?: string }>;
  title: string;
  body: React.ReactNode;
  to?: string;
}

/** Grid of feature cards. Cards become links when `to` is set. */
export const FeatureGrid: React.FC<{ items: Feature[]; columns?: 2 | 3 | 4; onDark?: boolean }> = ({ items, columns = 3, onDark = false }) => {
  const cols = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns];
  return (
    <ul className={`grid grid-cols-1 ${cols} gap-4`}>
      {items.map(({ icon: Icon, title, body, to }, i) => {
        const inner = (
          <>
            {Icon && (
              <span
                className={`w-10 h-10 rounded-[10px] flex items-center justify-center transition-colors duration-300 ${
                  onDark ? 'bg-white/10 text-hos-yellow' : 'bg-hos-mist border border-hos-hairline text-hos-black group-hover:bg-hos-navy group-hover:text-hos-yellow group-hover:border-hos-navy'
                }`}
              >
                <Icon aria-hidden="true" className="w-5 h-5" />
              </span>
            )}
            <h3 className={`font-display font-bold text-lg leading-snug ${onDark ? 'text-white' : 'text-hos-black'}`}>{title}</h3>
            <div className={`text-sm leading-relaxed ${onDark ? 'text-slate-300' : 'text-[#475569]'}`}>{body}</div>
            {to && (
              <span className={`mt-auto pt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${onDark ? 'text-white' : 'text-hos-black'}`}>
                Learn more
                <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            )}
          </>
        );
        const cardClass = `group flex flex-col gap-3 h-full rounded-[16px] p-6 sm:p-7 border transition-all duration-300 ${
          onDark ? 'bg-white/5 border-white/10' : 'bg-white border-hos-hairline'
        } ${to ? `hover:-translate-y-0.5 hover:border-hos-navy hover:shadow-[0_18px_40px_-24px_rgba(18,26,49,0.45)] ${focusRing}` : ''}`;
        return (
          <li key={title}>
            <Reveal delay={(i % columns) * 90} className="h-full">
              {to ? (
                <Link to={to} className={cardClass}>
                  {inner}
                </Link>
              ) : (
                <div className={cardClass}>{inner}</div>
              )}
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
};

/** Text on one side, a photo or visual on the other. */
export const SplitSection: React.FC<{
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  bullets?: React.ReactNode[];
  photo?: Photo;
  visual?: React.ReactNode;
  reverse?: boolean;
  bg?: Bg;
  cta?: Cta;
}> = ({ id, eyebrow, title, intro, bullets, photo, visual, reverse = false, bg = 'white', cta }) => (
  <section aria-labelledby={id} className={`${bgClass[bg]} py-20 sm:py-28`}>
    <Container className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <Reveal className={`space-y-6 ${reverse ? 'lg:order-2' : ''}`}>
        <SectionHeading id={id} eyebrow={eyebrow} title={title} intro={intro} tone={bg === 'navy' ? 'dark' : 'light'} />
        {bullets && (
          <ul className={`divide-y ${bg === 'navy' ? 'divide-white/10 border-white/10' : 'divide-hos-hairline border-hos-hairline'} border-y`}>
            {bullets.map((b, i) => (
              <li key={i} className={`flex items-start gap-3 py-3 text-base ${bg === 'navy' ? 'text-slate-200' : 'text-[#334155]'}`}>
                <span aria-hidden="true" className="mt-2.5 w-4 h-[3px] shrink-0 bg-hos-yellow" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
        {cta && (
          <Link to={cta.to} className={bg === 'navy' ? `${textLink} text-white` : textLink}>
            {cta.label}
            <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </Link>
        )}
      </Reveal>
      <Reveal delay={150} className={reverse ? 'lg:order-1' : ''}>
        {photo ? (
          <div className="relative min-h-[340px] sm:min-h-[440px] rounded-[20px] overflow-hidden bg-hos-navy">
            <img src={photo.src} alt={photo.alt} width={photo.w} height={photo.h} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
            {visual && (
              <>
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-hos-black/60 via-transparent to-transparent" />
                <div aria-hidden="true" className="absolute left-4 right-4 bottom-4 sm:left-6 sm:right-auto sm:bottom-6">
                  {visual}
                </div>
              </>
            )}
          </div>
        ) : (
          <div aria-hidden="true" className={`rounded-[20px] p-6 sm:p-10 flex items-center justify-center min-h-[320px] ${bg === 'navy' ? 'bg-white/5 border border-white/10' : 'bg-hos-mist border border-hos-hairline'}`}>
            {visual}
          </div>
        )}
      </Reveal>
    </Container>
  </section>
);

export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

/** Row of stats that count up. Only use figures already published on the site. */
export const StatRow: React.FC<{ items: Stat[]; dark?: boolean }> = ({ items, dark = false }) => (
  <dl className={`grid grid-cols-2 ${items.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-x-6 gap-y-10`}>
    {items.map((s, i) => (
      <Reveal key={s.label} delay={i * 100}>
        <div className={`border-t pt-6 ${dark ? 'border-white/15' : 'border-hos-hairline'}`}>
          <dt className="sr-only">{s.label}</dt>
          <dd className={`font-display font-semibold text-5xl sm:text-6xl tracking-tight leading-none ${dark ? 'text-white' : 'text-hos-black'}`}>
            {s.prefix}
            <CountUp to={s.value} suffix={s.suffix} />
          </dd>
          <dd aria-hidden="true" className="mt-4 h-[3px] w-10 bg-hos-yellow" />
          <dd className={`mt-4 text-sm leading-relaxed max-w-[16rem] ${dark ? 'text-slate-300' : 'text-[#475569]'}`}>{s.label}</dd>
        </div>
      </Reveal>
    ))}
  </dl>
);

/** Numbered steps. */
export const StepList: React.FC<{ steps: { title: string; body: React.ReactNode }[] }> = ({ steps }) => (
  <ol className={`grid grid-cols-1 md:grid-cols-2 ${steps.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4`}>
    {steps.map((step, i) => (
      <li key={step.title}>
        <Reveal delay={i * 110} className="h-full">
          <div className="h-full rounded-[16px] bg-white border border-hos-hairline p-6 sm:p-7 flex flex-col gap-4">
            <span className="w-12 h-12 rounded-full bg-hos-navy text-white flex items-center justify-center font-display font-semibold">
              <span className="sr-only">Step </span>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="font-display font-bold text-lg text-hos-black">{step.title}</h3>
            <div className="text-sm text-[#475569] leading-relaxed">{step.body}</div>
          </div>
        </Reveal>
      </li>
    ))}
  </ol>
);

const firstSentence = (s: string) => {
  const i = s.indexOf('. ');
  return i === -1 ? s : s.slice(0, i + 1);
};

/** Cards for Human OS modules, by exact module name. Pass live modules only. */
export const ModuleCards: React.FC<{ modules: string[]; columns?: 2 | 3 }> = ({ modules, columns = 3 }) => (
  <ul className={`grid grid-cols-1 sm:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : ''} gap-3`}>
    {modules.map((name, i) => {
      const mod = findModule(name);
      if (!mod) return null;
      return (
        <li key={name}>
          <Reveal delay={(i % columns) * 90} className="h-full">
            <Link
              to={systemPath(mod.system.slug)}
              className={`group flex flex-col gap-2 h-full rounded-[12px] border border-hos-hairline bg-white p-5 hover:border-hos-navy hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(18,26,49,0.45)] transition-all duration-300 ${focusRing}`}
            >
              <span className="font-display font-bold text-base text-hos-black">{name}</span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-hos-grey">{mod.system.name}</span>
              <span className="text-sm text-[#475569] leading-relaxed">{firstSentence(mod.description)}</span>
            </Link>
          </Reveal>
        </li>
      );
    })}
  </ul>
);

/** FAQ accordion. Answers must only restate facts already published on the site. */
export const FaqList: React.FC<{ id: string; eyebrow?: string; title: React.ReactNode; items: { q: string; a: React.ReactNode }[]; bg?: Bg }> = ({
  id,
  eyebrow = 'FAQ',
  title,
  items,
  bg = 'mist',
}) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section aria-labelledby={id} className={`${bgClass[bg]} py-20 sm:py-28`}>
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-4">
          <SectionHeading id={id} eyebrow={eyebrow} title={title} />
        </Reveal>
        <div className="lg:col-span-8 divide-y divide-hos-hairline border-y border-hos-hairline">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-panel-${i}`}
                    id={`${id}-button-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className={`w-full flex items-center justify-between gap-6 py-5 text-left font-display font-semibold text-lg text-hos-black ${focusRing}`}
                  >
                    {f.q}
                    <span
                      className={`w-8 h-8 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen ? 'rotate-45 bg-hos-navy border-hos-navy text-hos-yellow' : 'border-hos-hairline text-hos-black'
                      }`}
                    >
                      <Plus aria-hidden="true" className="w-4 h-4" />
                    </span>
                  </button>
                </h3>
                <div id={`${id}-panel-${i}`} role="region" aria-labelledby={`${id}-button-${i}`} hidden={!isOpen} className="pb-6 pr-14 text-base text-[#475569] leading-relaxed">
                  {f.a}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

/** Dark closing call to action with the deck-cover layer stack. */
export const CtaBand: React.FC<{ title: React.ReactNode; highlight?: string; body: React.ReactNode; primary?: Cta; secondary?: Cta }> = ({
  title,
  highlight,
  body,
  primary = { to: '/demo', label: 'Request a demo' },
  secondary = { to: '/pricing', label: 'See pricing' },
}) => (
  <section aria-labelledby="page-cta-heading" className="relative overflow-hidden bg-hos-black text-white py-24 sm:py-28">
    <span aria-hidden="true" className="absolute right-0 top-0 w-[60%] h-full bg-[radial-gradient(ellipse_at_center,rgba(245,217,123,0.10),transparent_60%)] pointer-events-none" />
    <Container className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <Reveal className="space-y-8">
        <h2 id="page-cta-heading" className="font-display font-semibold text-4xl sm:text-5xl tracking-tight leading-[1.06]">
          {title} {highlight && <span className="text-hos-yellow">{highlight}</span>}
        </h2>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">{body}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            to={primary.to}
            className="inline-flex items-center gap-2 bg-white hover:bg-hos-mist text-hos-black font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hos-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-hos-black"
          >
            {primary.label}
            <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </Link>
          <Link
            to={secondary.to}
            className="inline-flex items-center gap-2 border border-white/25 hover:border-white text-white font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hos-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-hos-black"
          >
            {secondary.label}
          </Link>
        </div>
      </Reveal>
      <div className="hidden sm:flex justify-center lg:justify-end">
        <LayerStack />
      </div>
    </Container>
  </section>
);

/** Card panel used for comparisons, pricing summaries or callouts inside a section. */
export const Panel: React.FC<{ children: React.ReactNode; dark?: boolean; className?: string }> = ({ children, dark = false, className = '' }) => (
  <div className={`rounded-[16px] p-6 sm:p-8 border ${dark ? 'bg-hos-navy text-white border-hos-navy' : 'bg-white border-hos-hairline'} ${className}`}>{children}</div>
);
