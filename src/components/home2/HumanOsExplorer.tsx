import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, type LucideIcon, ScanLine, Orbit, HeartPulse, MessageCircle, Stethoscope, Headset, LayoutDashboard } from 'lucide-react';
import {
  HUMAN_OS_PATH,
  SystemSlug,
  getRing,
  getSystem,
  numberWord,
  systemPath,
  systems,
  systemsInRing,
  totalLive,
  totalModules,
  totalSystems,
} from '../../content/human-os';
import { Container, SectionHeading, focusRing } from '../home/shared';
import { CountUp, Reveal } from '../home/motion';

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

const firstSentence = (s: string) => {
  const i = s.indexOf('. ');
  return i === -1 ? s : s.slice(0, i + 1);
};

/* ── Diagram geometry ── */
const C = 260;
const R_PERSON = 112;
const R_TEAM = 206;
const personAngles = [-135, -45, 45, 135];
const teamAngles = [160, 20, -90];
const polar = (r: number, deg: number): [number, number] => [C + r * Math.cos((deg * Math.PI) / 180), C + r * Math.sin((deg * Math.PI) / 180)];

const layout = (() => {
  const out: Record<string, { x: number; y: number; angle: number; ring: 'person' | 'team' }> = {};
  systemsInRing('person').forEach((s, i) => {
    const [x, y] = polar(R_PERSON, personAngles[i]);
    out[s.slug] = { x, y, angle: personAngles[i], ring: 'person' };
  });
  systemsInRing('team').forEach((s, i) => {
    const [x, y] = polar(R_TEAM, teamAngles[i]);
    out[s.slug] = { x, y, angle: teamAngles[i], ring: 'team' };
  });
  return out;
})();

/** Interactive system map. Nodes are buttons; the selected one lights up its link to the person. */
const SystemMap: React.FC<{ active: SystemSlug; onSelect: (s: SystemSlug) => void }> = ({ active, onSelect }) => {
  const activeSys = getSystem(active)!;
  const activePos = layout[active];
  const liveCount = activeSys.modules.filter((m) => m.status === 'live').length;

  return (
    <svg viewBox="0 0 520 520" className="w-full max-w-[540px] h-auto mx-auto overflow-visible" role="group" aria-label="Human OS system map. Choose a system to see what it includes.">
      <defs>
        <radialGradient id="hx-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5D97B" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#F5D97B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hx-person" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5D97B" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#F5D97B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Rings */}
      <circle cx={C} cy={C} r={R_TEAM + 44} fill="none" stroke="rgba(255,255,255,0.05)" />
      <circle cx={C} cy={C} r={R_TEAM} fill="none" stroke={activePos.ring === 'team' ? 'rgba(245,217,123,0.35)' : 'rgba(255,255,255,0.1)'} strokeDasharray="3 6" style={{ transition: 'stroke .4s' }} />
      <circle cx={C} cy={C} r={R_PERSON + 40} fill="url(#hx-person)" />
      <circle cx={C} cy={C} r={R_PERSON} fill="none" stroke={activePos.ring === 'person' ? 'rgba(245,217,123,0.45)' : 'rgba(255,255,255,0.12)'} style={{ transition: 'stroke .4s' }} />
      {Array.from({ length: 72 }).map((_, i) => {
        const [x1, y1] = polar(R_TEAM + 44, i * 5);
        const [x2, y2] = polar(R_TEAM + (i % 6 === 0 ? 36 : 40), i * 5);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.08)" />;
      })}
      <text x={C} y={C - R_PERSON + 22} textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="2.5" fill="#F5D97B" opacity="0.8">
        PERSON RING
      </text>
      <text x={C} y={C + R_TEAM + 30} textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="2.5" fill="rgba(255,255,255,0.45)">
        TEAM RING
      </text>

      {/* Links from the person to every system */}
      {systems.map((s) => {
        const p = layout[s.slug];
        const isActive = s.slug === active;
        return (
          <line
            key={`l-${s.slug}`}
            x1={C}
            y1={C}
            x2={p.x}
            y2={p.y}
            stroke={isActive ? '#F5D97B' : 'rgba(255,255,255,0.07)'}
            strokeWidth={isActive ? 1.75 : 1}
            strokeDasharray={isActive ? '4 6' : undefined}
            className={isActive ? 'hos-anim' : undefined}
            style={isActive ? { animation: 'hx-flow 0.9s linear infinite' } : undefined}
          />
        );
      })}

      {/* Person at the centre */}
      <circle cx={C} cy={C} r={74} fill="url(#hx-core)" />
      <circle cx={C} cy={C} r={50} fill="#0C0D10" stroke="rgba(245,217,123,0.4)" />
      <circle cx={C} cy={C - 11} r={11} fill="#FFFFFF" />
      <path d={`M ${C - 20} ${C + 23} a 20 18 0 0 1 40 0 z`} fill="#FFFFFF" />

      {/* Live-module satellites around the selected system */}
      <g key={`sat-${active}`}>
        {Array.from({ length: liveCount }).map((_, i) => {
          const a = (360 / liveCount) * i - 90;
          const [sx, sy] = [activePos.x + 42 * Math.cos((a * Math.PI) / 180), activePos.y + 42 * Math.sin((a * Math.PI) / 180)];
          return <circle key={i} cx={sx} cy={sy} r={3.5} fill="#F5D97B" style={{ animation: `hos-fade-up 0.4s ease ${0.1 + i * 0.07}s both` }} />;
        })}
        <circle cx={activePos.x} cy={activePos.y} r={42} fill="none" stroke="rgba(245,217,123,0.2)" />
      </g>

      {/* System nodes */}
      {systems.map((s) => {
        const p = layout[s.slug];
        const isActive = s.slug === active;
        const Icon = icons[s.slug];
        const labelBelow = p.y >= C - 20;
        const ly = labelBelow ? p.y + (isActive ? 62 : 48) : p.y - (isActive ? 56 : 42);
        return (
          <g
            key={s.slug}
            role="button"
            tabIndex={0}
            aria-label={`${s.number} ${s.name}`}
            aria-pressed={isActive}
            onClick={() => onSelect(s.slug)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(s.slug);
              }
            }}
            className="cursor-pointer outline-none group/node"
          >
            {isActive && <circle cx={p.x} cy={p.y} r={34} fill="rgba(245,217,123,0.15)" />}
            <circle
              cx={p.x}
              cy={p.y}
              r={26}
              fill={isActive ? '#F5D97B' : '#15171C'}
              stroke={isActive ? '#F5D97B' : 'rgba(255,255,255,0.16)'}
              className="transition-colors group-hover/node:stroke-[rgba(245,217,123,0.7)] group-focus-visible/node:stroke-[#F5D97B]"
              strokeWidth={1.5}
            />
            <g transform={`translate(${p.x - 9} ${p.y - 9})`} style={{ pointerEvents: 'none' }}>
              <Icon width={18} height={18} strokeWidth={2} className={isActive ? 'text-ink-950' : 'text-white/80'} />
            </g>
            <text x={p.x} y={ly} textAnchor="middle" fontSize="11.5" fontWeight={isActive ? 700 : 500} fill={isActive ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} style={{ pointerEvents: 'none', transition: 'fill .3s' }}>
              {s.name}
            </text>
            <text x={p.x} y={ly + (labelBelow ? 14 : -14)} textAnchor="middle" fontSize="9" fontFamily="monospace" fill={isActive ? '#F5D97B' : 'rgba(255,255,255,0.35)'} style={{ pointerEvents: 'none' }}>
              {s.number}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export const HumanOsExplorer: React.FC = () => {
  const [active, setActive] = useState<SystemSlug>(systems[0].slug);
  const [touched, setTouched] = useState(false);

  /* Gently walks through the systems until the visitor interacts */
  useEffect(() => {
    if (touched || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      setActive((a) => systems[(systems.findIndex((s) => s.slug === a) + 1) % systems.length].slug);
    }, 4500);
    return () => window.clearInterval(id);
  }, [touched]);

  const select = (s: SystemSlug) => {
    setTouched(true);
    setActive(s);
  };

  const system = getSystem(active)!;
  const ring = getRing(system.ring);
  const liveModules = system.modules.filter((m) => m.status === 'live');
  const Icon = icons[active];

  return (
    <section aria-labelledby="explorer-heading" className="relative bg-ink-900 border-y border-white/[0.06] py-24 sm:py-32 overflow-hidden">
      <div aria-hidden="true" className="absolute left-[-200px] top-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(closest-side,rgba(245,217,123,0.07),transparent)]" />
      <Container className="relative space-y-14">
        <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          {/* TODO(copy): section heading and intro */}
          <SectionHeading
            id="explorer-heading"
            eyebrow="Human OS"
            title="One operating system for the whole care journey."
            intro={`${numberWord(systemsInRing('person').length)} systems live with the person. ${numberWord(systemsInRing('team').length)} run the team serving them. Partners choose the two or three that fit, then switch on modules as they grow.`}
          />
          <dl className="grid grid-cols-3 gap-6 shrink-0">
            {[
              { v: totalSystems, l: 'systems' },
              { v: totalModules, l: 'modules' },
              { v: totalLive, l: 'live today' },
            ].map((s) => (
              <div key={s.l}>
                <dt className="sr-only">{s.l}</dt>
                <dd className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">
                  <CountUp to={s.v} />
                </dd>
                <dd className="mt-1 text-xs uppercase tracking-[0.16em] text-white/50">{s.l}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center" onMouseEnter={() => setTouched(true)} onFocus={() => setTouched(true)}>
          <Reveal className="lg:col-span-6">
            <SystemMap active={active} onSelect={select} />
          </Reveal>

          <Reveal delay={120} className="lg:col-span-6">
            <div className="relative rounded-[24px] p-[1px] bg-[linear-gradient(140deg,rgba(245,217,123,0.4),rgba(255,255,255,0.06)_35%,rgba(255,255,255,0.03)_70%,rgba(245,217,123,0.2))]">
              <div key={active} className="rounded-[23px] bg-ink-900/95 p-6 sm:p-8" style={{ animation: 'hos-fade-up 0.45s ease both' }} aria-live="polite">
                <div className="flex items-center gap-4">
                  <span className="w-12 h-12 rounded-2xl bg-hos-yellow text-ink-950 flex items-center justify-center shadow-[0_0_30px_-6px_rgba(245,217,123,0.6)]">
                    <Icon className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                      System {system.number} · {ring.name}
                    </div>
                    <h3 className="mt-1 text-2xl sm:text-3xl font-semibold text-white tracking-tight">{system.name}</h3>
                  </div>
                </div>

                <p className="mt-5 text-lg text-white/80">{promiseFor(system.slug, system.promise)}</p>
                <p className="mt-1.5 text-sm text-white/55">{ring.audience}</p>

                <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-hos-yellow">Available today</div>
                <ul className="mt-3 divide-y divide-white/[0.06] border-y border-white/[0.06]">
                  {liveModules.slice(0, 4).map((m, i) => (
                    <li key={m.name} className="py-3 flex gap-3" style={{ animation: `hos-fade-up 0.4s ease ${0.1 + i * 0.07}s both` }}>
                      <span aria-hidden="true" className="mt-1.5 w-1.5 h-1.5 rounded-full bg-hos-yellow shrink-0 shadow-[0_0_8px_rgba(245,217,123,0.8)]" />
                      <span>
                        <span className="block text-sm font-semibold text-white">{m.name}</span>
                        <span className="block text-xs text-white/55 leading-relaxed line-clamp-2">{firstSentence(m.description)}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                {liveModules.length > 4 && <div className="mt-2 text-xs text-white/50">+ {liveModules.length - 4} more in this system</div>}

                <div className="mt-5 text-sm text-white/60">
                  <span className="text-white/45">Best fit: </span>
                  {system.bestFit}
                </div>

                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                  <Link to={systemPath(system.slug)} className={`inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-hos-yellow rounded ${focusRing}`}>
                    Explore {system.name}
                    <ArrowRight aria-hidden="true" className="w-4 h-4" />
                  </Link>
                  <Link to={HUMAN_OS_PATH} className={`inline-flex items-center gap-2 text-sm text-white/60 hover:text-white rounded ${focusRing}`}>
                    All {numberWord(totalSystems).toLowerCase()} systems
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
