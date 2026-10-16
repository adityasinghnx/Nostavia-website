import React from 'react';
import { hospitalProgrammes, numberWord, totalLive, totalSystems } from '../../content/human-os';
import { Container, Eyebrow } from './shared';
import { CountUp, Reveal } from './motion';

/* Every figure here is a fact from the site's own content, computed where possible. */
const stats = [
  { to: totalLive, suffix: '', label: `live modules across ${numberWord(totalSystems).toLowerCase()} systems` },
  { to: 100, suffix: '+', label: 'biomarkers decoded against locally calibrated ranges' },
  { to: hospitalProgrammes.length, suffix: '', label: 'ready-made programmes for hospitals and health systems' },
  { to: 2, suffix: '', label: 'markets served today, India and the UAE' },
];

export const StatsBand: React.FC = () => (
  <section aria-labelledby="home-stats-heading" className="bg-hos-navy text-white py-20 sm:py-24">
    <Container className="space-y-12">
      <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          <Eyebrow tone="dark">Nostavia today</Eyebrow>
          {/* TODO(copy): stats band heading */}
          <h2 id="home-stats-heading" className="font-display font-semibold text-3xl sm:text-5xl tracking-tight leading-[1.08]">
            The intelligence layer behind health brands people already trust
          </h2>
        </div>
        <p className="text-sm text-slate-300 max-w-sm leading-relaxed">Headquartered in Lucknow, India. Serving India and the UAE.</p>
      </Reveal>

      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 100}>
            <div className="border-t border-white/15 pt-6">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display font-semibold text-5xl sm:text-7xl tracking-tight leading-none">
                <CountUp to={s.to} suffix={s.suffix} />
              </dd>
              <dd aria-hidden="true" className="mt-4 h-[3px] w-10 bg-hos-yellow" />
              <dd className="mt-4 text-sm text-slate-300 leading-relaxed max-w-[15rem]">{s.label}</dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Container>
  </section>
);
