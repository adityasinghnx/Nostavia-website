import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { findModule, systemPath } from '../../content/human-os';
import { Container, SectionHeading, focusRing } from '../home/shared';
import { Reveal, Waveform } from '../home/motion';

/* Eight live products as a bento grid. Headlines are new marketing lines; the supporting
 * line under each is drawn from the module description in human-os.ts. */

const MarkerBars: React.FC = () => (
  <ul className="space-y-3 w-full">
    {[
      ['HbA1c', 52, 'Optimal', 'text-emerald-300'],
      ['Vitamin D', 18, 'Outlier', 'text-amber-300'],
      ['LDL', 64, 'In range', 'text-white/60'],
      ['TSH', 48, 'Optimal', 'text-emerald-300'],
    ].map(([name, pos, verdict, color], i) => (
      <li key={name as string} className="grid grid-cols-[72px_1fr_64px] items-center gap-3 text-[11px]" style={{ animation: `hos-fade-up 0.5s ease ${0.1 + i * 0.1}s both` }}>
        <span className="text-white/70">{name as string}</span>
        <span className="relative h-1.5 rounded-full bg-white/[0.08]">
          <span className="absolute inset-y-0 left-[30%] right-[30%] rounded-full bg-hos-yellow/60" />
          <span className="absolute top-1/2 -mt-1.5 -ml-1.5 w-3 h-3 rounded-full bg-white ring-2 ring-ink-900" style={{ left: `${pos}%` }} />
        </span>
        <span className={`text-right font-medium ${color as string}`}>{verdict as string}</span>
      </li>
    ))}
  </ul>
);

const Horizon: React.FC = () => (
  <div className="w-full">
    <svg viewBox="0 0 240 90" className="w-full h-24" aria-hidden="true">
      <path d="M0 70 C 50 68, 90 60, 130 50 S 200 30, 240 22" fill="none" stroke="#F5D97B" strokeWidth="2.5" strokeDasharray="400" style={{ animation: 'hos-draw 1.8s ease both' }} />
      <path d="M0 70 C 50 72, 90 76, 130 80 S 200 84, 240 88" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="4 5" />
    </svg>
    <div className="flex justify-between text-[10px] font-mono text-white/50">
      <span>3h</span>
      <span>7d</span>
      <span>1y</span>
      <span>10y</span>
    </div>
  </div>
);

const Curve: React.FC = () => (
  <svg viewBox="0 0 240 80" className="w-full h-20" aria-hidden="true">
    <line x1="0" y1="72" x2="240" y2="72" stroke="rgba(255,255,255,0.1)" />
    <path d="M0 68 C 45 68, 65 14, 100 14 S 160 60, 240 64" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="400" style={{ animation: 'hos-draw 1.6s ease both' }} />
    <path d="M0 68 C 45 68, 70 26, 104 26 S 162 62, 240 66" fill="none" stroke="#F5D97B" strokeWidth="2" strokeDasharray="4 4" />
  </svg>
);

const Chat: React.FC = () => (
  <div className="w-full space-y-2">
    <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-hos-yellow text-ink-950 text-[11px] px-3 py-2">Can I eat out tonight?</div>
    <div className="w-fit max-w-[90%] rounded-2xl rounded-bl-sm bg-white/[0.07] ring-1 ring-white/10 text-[11px] px-3 py-2 text-white/80" style={{ animation: 'hos-fade-up 0.5s ease 0.5s both' }}>
      Yes. Pick grilled over fried, and keep the walk after dinner like last week.
    </div>
  </div>
);

const Brief: React.FC = () => (
  <ul className="w-full space-y-1.5">
    {[
      ['hs-CRP', '4.2 mg/L', 'High', 'bg-rose-400/15 text-rose-300'],
      ['Vitamin D', '18 ng/mL', 'Low', 'bg-amber-400/15 text-amber-300'],
      ['LDL', '142 mg/dL', 'High', 'bg-rose-400/15 text-rose-300'],
    ].map(([n, v, t, c], i) => (
      <li key={n} className="flex items-center justify-between rounded-lg bg-white/[0.04] ring-1 ring-white/[0.06] px-3 py-2 text-[11px]" style={{ animation: `hos-fade-up 0.5s ease ${0.1 + i * 0.12}s both` }}>
        <span className="text-white/80">
          {n} <span className="text-white/50">{v}</span>
        </span>
        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${c}`}>{t}</span>
      </li>
    ))}
  </ul>
);

const Bars: React.FC = () => (
  <div className="flex items-end gap-2 h-20 w-full">
    {[40, 58, 46, 72, 54, 88, 66, 78].map((h, i) => (
      <span key={i} className={`flex-1 rounded-t origin-bottom ${i === 5 ? 'bg-hos-yellow' : 'bg-white/15'}`} style={{ height: `${h}%`, animation: `hos-rise 0.8s cubic-bezier(0.2,0.7,0.2,1) ${i * 0.06}s both` }} />
    ))}
  </div>
);

const Recall: React.FC = () => (
  <div className="grid gap-1.5 w-full" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}>
    {Array.from({ length: 54 }).map((_, i) => {
      const due = [3, 9, 14, 22, 27, 31, 38, 44, 50].includes(i);
      return (
        <span
          key={i}
          className={`aspect-square rounded-[4px] ${due ? 'bg-hos-yellow' : 'bg-white/[0.07]'}`}
          style={due ? { animation: `hos-fade-up 0.4s ease ${0.1 + (i % 18) * 0.04}s both` } : undefined}
        />
      );
    })}
  </div>
);

const tiles: { module: string; headline: string; visual: React.ReactNode; span: string }[] = [
  { module: 'Smart Reports', headline: 'Every lab report, decoded.', visual: <MarkerBars />, span: 'lg:col-span-2' },
  { module: 'AI Voice Agent', headline: 'Every call, answered.', visual: <Waveform height={56} className="w-full" />, span: '' },
  { module: 'Trajectory Engine', headline: 'See where health is heading.', visual: <Horizon />, span: '' },
  { module: 'Food Intelligence', headline: 'Lunch, decoded.', visual: <Curve />, span: '' },
  { module: 'AI Health Companion', headline: 'A guide that remembers.', visual: <Chat />, span: '' },
  { module: 'Clinical Intake Briefs', headline: 'Walk into every consult prepared.', visual: <Brief />, span: 'lg:col-span-2' },
  { module: 'Re-Test Recall Engine', headline: 'Patients come back.', visual: <Recall />, span: 'lg:col-span-2' },
  { module: 'B2B Analytics Dashboard', headline: 'Your whole population, at a glance.', visual: <Bars />, span: 'lg:col-span-2' },
];

const firstSentence = (s: string) => {
  const i = s.indexOf('. ');
  return i === -1 ? s : s.slice(0, i + 1);
};

export const CapabilityBento: React.FC = () => (
  <section id="platform" aria-labelledby="bento-heading" className="relative bg-ink-950 py-24 sm:py-32 scroll-mt-20">
    <Container className="space-y-14">
      <Reveal>
        {/* TODO(copy): section heading and intro */}
        <SectionHeading
          id="bento-heading"
          eyebrow="The platform"
          title="Everything a health brand needs, in one platform."
          intro="Switch on the products that fit your business. Each one runs on the same health data, and every one ships under your name."
          center
        />
      </Reveal>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map((t, i) => {
          const mod = findModule(t.module)!;
          return (
            <li key={t.module} className={t.span}>
              <Reveal delay={(i % 4) * 80} className="h-full">
                <Link
                  to={systemPath(mod.system.slug)}
                  className={`group relative flex flex-col h-full min-h-[300px] rounded-[20px] dk-card p-6 overflow-hidden hover:border-white/20 transition-colors ${focusRing}`}
                >
                  <span aria-hidden="true" className="absolute -right-16 -top-16 w-48 h-48 bg-[radial-gradient(closest-side,rgba(245,217,123,0.10),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative flex items-center justify-between gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">{t.module}</span>
                    <ArrowUpRight aria-hidden="true" className="w-4 h-4 text-white/40 group-hover:text-hos-yellow transition-colors" />
                  </span>
                  <span className="relative mt-3 text-xl font-semibold text-white leading-snug">{t.headline}</span>
                  <span className="relative mt-2 text-sm text-white/55 leading-relaxed">{firstSentence(mod.description)}</span>
                  <span aria-hidden="true" className="hos-anim relative mt-auto pt-6 flex items-end">
                    {t.visual}
                  </span>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Container>
  </section>
);
