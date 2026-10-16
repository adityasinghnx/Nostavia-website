import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  HUMAN_OS_PATH,
  RingId,
  SystemSlug,
  numberWord,
  rings,
  systemsInRing,
  totalLive,
  totalModules,
  totalSystems,
} from '../../content/human-os';
import { Container, Eyebrow, focusRing } from '../home/shared';
import { CountUp, LiveDot, Reveal } from '../home/motion';

const C = 210;
/* 01 top-left, 02 top-right, 03 bottom-right, 04 bottom-left; 07 top, 05 left, 06 right. */
const personAngles = [-135, -45, 45, 135];
const teamAngles = [160, 20, -90];
const polar = (r: number, deg: number) => [C + r * Math.cos((deg * Math.PI) / 180), C + r * Math.sin((deg * Math.PI) / 180)];

/** Human OS rings on a dark panel: the person at the centre, Person ring, Team ring. */
const RingsDiagram: React.FC = () => {
  const person = systemsInRing('person');
  const team = systemsInRing('team');
  const label = `Human OS: the person at the centre, the ${rings[0].name} with ${numberWord(person.length).toLowerCase()} systems around them, and the ${rings[1].name} with ${numberWord(team.length).toLowerCase()} systems on the outside.`;

  const node = (slug: SystemSlug, number: string, [x, y]: number[], ring: RingId) => (
    <g key={slug}>
      <circle cx={x} cy={y} r={24} fill={ring === 'person' ? '#F5D97B' : '#FFFFFF'} />
      <text x={x} y={y + 4.5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#0A0A0B">
        {number}
      </text>
    </g>
  );

  return (
    <svg role="img" aria-label={label} viewBox="0 0 420 420" className="w-full max-w-[420px] h-auto mx-auto">
      <circle cx={C} cy={C} r={200} fill="#1A2342" stroke="#2A3557" />
      <circle cx={C} cy={C} r={128} fill="#121A31" stroke="#F5D97B" strokeOpacity={0.6} strokeWidth={1.5} />
      <text x={C} y={C - 104} textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="2" fill="#F5D97B">
        PERSON RING
      </text>
      <text x={C} y={C + 190} textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="2" fill="#94A3B8">
        TEAM RING
      </text>
      <circle cx={C} cy={C} r={50} fill="#0A0A0B" stroke="#2A3557" />
      <circle cx={C} cy={C - 12} r={11} fill="#FFFFFF" />
      <path d={`M ${C - 20} ${C + 22} a 20 18 0 0 1 40 0 z`} fill="#FFFFFF" />
      {person.map((s, i) => node(s.slug, s.number, polar(88, personAngles[i]), 'person'))}
      {team.map((s, i) => node(s.slug, s.number, polar(165, teamAngles[i]), 'team'))}
    </svg>
  );
};

/** "What it runs on": the Human OS platform under every product. */
export const HumanOsHomeSection: React.FC = () => (
  <section aria-labelledby="home-platform-heading" className="bg-white py-20 sm:py-28">
    <Container>
      <Reveal>
      <div className="grid grid-cols-1 lg:grid-cols-2 rounded-[16px] overflow-hidden border border-hos-hairline bg-white shadow-[0_30px_80px_-40px_rgba(18,26,49,0.35)]">
        <div className="p-6 sm:p-10 lg:p-14 flex flex-col gap-6">
          <Eyebrow>What it runs on</Eyebrow>
          <h2 id="home-platform-heading" className="font-display font-semibold text-3xl sm:text-5xl tracking-tight leading-[1.08] text-hos-black">
            Human OS, the platform under every product
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            {numberWord(totalSystems)} systems and {totalModules} modules, delivered through one integration, entirely under your brand.
          </p>
          <div>
            <Link
              to={HUMAN_OS_PATH}
              className={`inline-flex items-center gap-2 border border-hos-hairline hover:border-hos-black text-hos-black font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-[2px] transition-colors ${focusRing}`}
            >
              Explore Human OS
              <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
            </Link>
          </div>
          <dl className="mt-auto grid grid-cols-2 gap-6 pt-8 border-t border-hos-hairline">
            <div>
              <dt className="sr-only">Live modules</dt>
              <dd className="font-display font-semibold text-5xl sm:text-6xl tracking-tight text-hos-black">
                <CountUp to={totalLive} />
              </dd>
              <dd className="mt-2 text-sm text-[#475569]">Live modules, switchable today</dd>
            </div>
            <div>
              <dt className="sr-only">Biomarkers</dt>
              <dd className="font-display font-semibold text-5xl sm:text-6xl tracking-tight text-hos-black">
                <CountUp to={100} suffix="+" />
              </dd>
              <dd className="mt-2 text-sm text-[#475569]">Biomarkers decoded against locally calibrated ranges</dd>
            </div>
          </dl>
        </div>
        <div className="relative bg-hos-navy p-8 sm:p-12 flex items-center justify-center">
          <span className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white">
            <LiveDot />
            {totalLive} modules live
          </span>
          <RingsDiagram />
        </div>
      </div>
      </Reveal>
    </Container>
  </section>
);

export default HumanOsHomeSection;
