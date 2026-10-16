import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SystemSlug, getSystem, systemPath } from '../../content/human-os';
import { Container, SectionHeading, focusRing } from './shared';
import { Reveal, Waveform } from './motion';

/* One card per audience. Only live modules are listed. */

const ChatVisual: React.FC = () => (
  <div className="hos-anim space-y-2" aria-hidden="true">
    <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-hos-navy text-white text-[11px] px-3 py-2" style={{ animation: 'hos-fade-up 0.6s ease 0.2s both' }}>
      Why is my vitamin D flagged?
    </div>
    <div className="w-fit max-w-[90%] rounded-2xl rounded-bl-sm bg-white border border-hos-hairline text-[11px] px-3 py-2 text-hos-black" style={{ animation: 'hos-fade-up 0.6s ease 0.8s both' }}>
      It's below your optimal range. Here's a two-week plan to bring it up.
    </div>
  </div>
);

const BriefVisual: React.FC = () => (
  <div className="hos-anim space-y-1.5" aria-hidden="true">
    {[
      ['hs-CRP', 'High'],
      ['Vitamin D', 'Low'],
      ['HbA1c', 'Optimal'],
    ].map(([m, v], i) => (
      <div key={m} className="flex items-center justify-between rounded-lg bg-white border border-hos-hairline px-3 py-1.5 text-[11px]" style={{ animation: `hos-fade-up 0.5s ease ${0.2 + i * 0.15}s both` }}>
        <span className="font-semibold text-hos-black">{m}</span>
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${v === 'Optimal' ? 'bg-emerald-50 text-emerald-700' : v === 'High' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}`}>{v}</span>
      </div>
    ))}
  </div>
);

const BarsVisual: React.FC = () => (
  <div className="hos-anim flex items-end gap-2 h-16" aria-hidden="true">
    {[40, 62, 48, 80, 56, 92, 70].map((h, i) => (
      <span key={i} className={`flex-1 rounded-t origin-bottom ${i === 5 ? 'bg-hos-yellow' : 'bg-hos-navy'}`} style={{ height: `${h}%`, animation: `hos-rise 0.8s cubic-bezier(0.2,0.7,0.2,1) ${0.1 + i * 0.07}s both` }} />
    ))}
  </div>
);

const teams: { audience: string; system: SystemSlug; headline: string; modules: string[]; visual: React.ReactNode; dark?: boolean }[] = [
  {
    audience: 'Patients and members',
    system: 'ai-concierge',
    headline: 'A health guide that never leaves their side.',
    modules: ['AI Health Companion', 'Personalisation Engine', 'Sleep & Recovery Engine'],
    visual: <ChatVisual />,
  },
  {
    audience: 'Clinicians',
    system: 'clinical-intelligence',
    headline: 'Gives every clinician time back.',
    modules: ['Clinical Intake Briefs', 'Medication Intelligence'],
    visual: <BriefVisual />,
  },
  {
    audience: 'Front desk and operations',
    system: 'agent-workforce',
    headline: 'AI staff that never clock out.',
    modules: ['AI Voice Agent', 'Re-Test Recall Engine'],
    visual: <Waveform height={44} color="#121A31" />,
  },
  {
    audience: 'Leadership',
    system: 'command-center',
    // TODO(copy): leadership headline (Command Center promise covers modules that are not live yet)
    headline: 'Cohort risk across your whole population, in one view.',
    modules: ['B2B Analytics Dashboard'],
    visual: <BarsVisual />,
  },
];

export const TeamsSection: React.FC = () => (
  <section aria-labelledby="home-teams-heading" className="bg-hos-mist py-20 sm:py-28">
    <Container className="space-y-12">
      <Reveal>
        {/* TODO(copy): section heading and intro */}
        <SectionHeading
          id="home-teams-heading"
          eyebrow="Built for every team"
          title="One platform for everyone in the care journey"
          intro="From the person checking their results at home to the leadership team reviewing the whole population."
        />
      </Reveal>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teams.map((t, i) => {
          const system = getSystem(t.system)!;
          return (
            <li key={t.audience}>
              <Reveal delay={(i % 2) * 120} className="h-full">
                <article className="h-full rounded-[16px] bg-white border border-hos-hairline p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-5 gap-6">
                  <div className="sm:col-span-3 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-hos-navy text-white font-mono text-[10px] font-bold flex items-center justify-center">{system.number}</span>
                      <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-hos-amber">{t.audience}</span>
                    </div>
                    <h3 className="font-display font-semibold text-xl sm:text-2xl text-hos-black leading-snug">{t.headline}</h3>
                    <ul className="space-y-2">
                      {t.modules.map((m) => (
                        <li key={m} className="flex items-center justify-between gap-3 text-sm border-b border-hos-hairline pb-2 last:border-0">
                          <span className="font-semibold text-hos-black">{m}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to={systemPath(system.slug)} className={`mt-auto inline-flex items-center gap-2 text-sm font-bold text-hos-black underline underline-offset-4 decoration-hos-yellow decoration-2 hover:decoration-hos-amber ${focusRing}`}>
                      Explore {system.name}
                      <ArrowRight aria-hidden="true" className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="sm:col-span-2 rounded-xl bg-hos-mist border border-hos-hairline p-4 flex items-center">
                    <div className="w-full">{t.visual}</div>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Container>
  </section>
);
