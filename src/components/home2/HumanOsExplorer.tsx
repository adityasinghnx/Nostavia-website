import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, type LucideIcon, ScanLine, Orbit, HeartPulse, MessageCircle, Stethoscope, Headset, LayoutDashboard } from 'lucide-react';
import { HUMAN_OS_PATH, SystemSlug, numberWord, rings, systemPath, systemsInRing, totalSystems } from '../../content/human-os';
import { Container, SectionHeading, focusRing } from '../home/shared';
import { Reveal } from '../home/motion';

const icons: Record<SystemSlug, LucideIcon> = {
  'health-decoder': ScanLine,
  'digital-twin': Orbit,
  'whole-body-intelligence': HeartPulse,
  'ai-concierge': MessageCircle,
  'clinical-intelligence': Stethoscope,
  'agent-workforce': Headset,
  'command-center': LayoutDashboard,
};

/* Command Center's promise covers revenue modules that are not live yet. */
const promiseFor = (slug: SystemSlug, promise: string) =>
  slug === 'command-center' ? 'Cohort risk across your whole population, in one view.' : promise;

const SystemCard: React.FC<{ slug: SystemSlug; number: string; name: string; promise: string; live: number }> = ({ slug, number, name, promise, live }) => {
  const Icon = icons[slug];
  return (
    <Link to={systemPath(slug)} className={`group flex flex-col h-full rounded-[20px] dk-card p-6 hover:border-white/20 transition-colors ${focusRing}`}>
      <div className="flex items-center justify-between">
        <span className="w-11 h-11 rounded-xl bg-white/[0.05] ring-1 ring-white/10 text-white/80 flex items-center justify-center transition-colors group-hover:bg-hos-yellow group-hover:text-ink-950 group-hover:ring-hos-yellow">
          <Icon aria-hidden="true" className="w-5 h-5" />
        </span>
        <span className="font-mono text-xs text-white/35">{number}</span>
      </div>
      <h4 className="mt-6 text-lg font-semibold text-white tracking-tight">{name}</h4>
      <p className="mt-2 text-sm text-white/55 leading-relaxed">{promiseFor(slug, promise)}</p>
      <div className="mt-auto pt-6 flex items-center justify-between text-sm">
        <span className="text-white/45">{live} {live === 1 ? 'module' : 'modules'} available</span>
        <ArrowRight aria-hidden="true" className="w-4 h-4 text-white/40 transition-all group-hover:text-hos-yellow group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
};

/** The seven Human OS systems, grouped by ring, as plain cards. */
export const HumanOsExplorer: React.FC = () => (
  <section aria-labelledby="explorer-heading" className="relative bg-ink-900 border-y border-white/[0.06] py-24 sm:py-32">
    <Container className="space-y-14">
      <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        {/* TODO(copy): section heading and intro */}
        <SectionHeading
          id="explorer-heading"
          eyebrow="Human OS"
          title="One operating system for the whole care journey."
          intro={`${numberWord(systemsInRing('person').length)} systems live with the person. ${numberWord(systemsInRing('team').length)} run the team serving them. Start with the two or three that fit, then switch on more as you grow.`}
        />
        <Link to={HUMAN_OS_PATH} className={`shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-hos-yellow rounded ${focusRing}`}>
          All {numberWord(totalSystems).toLowerCase()} systems
          <ArrowRight aria-hidden="true" className="w-4 h-4" />
        </Link>
      </Reveal>

      {rings.map((ring) => {
        const list = systemsInRing(ring.id);
        return (
          <div key={ring.id} className="space-y-5">
            <Reveal className="flex items-baseline gap-3">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-hos-yellow">{ring.name}</h3>
              <span className="text-sm text-white/50">{ring.audience}</span>
            </Reveal>
            <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${list.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
              {list.map((s, i) => (
                <li key={s.slug}>
                  <Reveal delay={i * 80} className="h-full">
                    <SystemCard
                      slug={s.slug}
                      number={s.number}
                      name={s.name}
                      promise={s.promise}
                      live={s.modules.filter((m) => m.status === 'live').length}
                    />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </Container>
  </section>
);
