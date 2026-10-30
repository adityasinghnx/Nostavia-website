import React from 'react';
import { cn } from '../../lib/cn';
import { Layer, PlaneShadow, Scene } from './Scene3D';
import { SampleTag } from './ScaledFrame';

/* ─────────────────────────────────────────────────────────────────────────────
 * Human OS, as a tilted stage: a lab's report lies on the plane, and what the
 * modules work out from it floats above: biological age, a marker's trend and
 * the modules that are switched on. Sample data.
 * ──────────────────────────────────────────────────────────────────────────── */

const BONE = '#F2EDE3';
const HONEY = '#F2D27A';
const GREEN = '#9FD8A8';

/** A dark glass card: lit top edge, deep soft shadow. */
export const darkCard =
  'rounded-[20px] border border-white/[0.09] bg-[linear-gradient(180deg,#1E1B17_0%,#13110E_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_40px_70px_-30px_rgba(0,0,0,0.9),0_12px_28px_-14px_rgba(0,0,0,0.7)]';

const markers = [
  { name: 'HbA1c', value: '5.4', unit: '%', verdict: 'In range', at: 0.44, flag: false },
  { name: 'LDL cholesterol', value: '96', unit: 'mg/dL', verdict: 'Optimal', at: 0.32, flag: false },
  { name: 'Vitamin D', value: '18', unit: 'ng/mL', verdict: 'Low', at: 0.1, flag: true },
  { name: 'Ferritin', value: '412', unit: 'ng/mL', verdict: 'High', at: 0.88, flag: true },
  { name: 'TSH', value: '2.1', unit: 'mIU/L', verdict: 'In range', at: 0.5, flag: false },
];

const DarkRange: React.FC<{ at: number; flag: boolean }> = ({ at, flag }) => (
  <div className="relative flex h-[5px] gap-[3px]">
    <span className="flex-[1] rounded-full bg-white/[0.07]" />
    <span className="flex-[2] rounded-full bg-[#9FD8A8]/25" />
    <span className="flex-[1] rounded-full bg-white/[0.07]" />
    <span
      className="absolute top-1/2 h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#13110E]"
      style={{ left: `${at * 100}%`, background: flag ? HONEY : GREEN, boxShadow: `0 0 12px ${flag ? HONEY : GREEN}88` }}
    />
  </div>
);

const Report: React.FC = () => (
  <div className={cn(darkCard, 'h-full w-full p-6 text-left')}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-[11px] bg-gradient-to-br from-[#3CC8D8] to-[#1A93A6] text-[12px] font-semibold text-[#0B0A08]">YL</span>
        <div>
          <p className="text-[14px]" style={{ color: BONE }}>
            Your Lab
          </p>
          <p className="text-[11px] text-white/40">Health report · 23 Oct</p>
        </div>
      </div>
      <SampleTag />
    </div>

    <div className="mt-5 rounded-[14px] border border-[#F2D27A]/15 bg-[linear-gradient(135deg,rgba(242,210,122,0.12),rgba(242,210,122,0.03))] p-4">
      <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#F2D27A]/85">In plain words</p>
      <p className="mt-2 text-[13px] leading-relaxed" style={{ color: `${BONE}DD` }}>
        Most results are healthy. Ferritin is high and vitamin D is low, so your doctor will go through both with you.
      </p>
    </div>

    <ul className="mt-4">
      {markers.map((m) => (
        <li key={m.name} className="border-b border-white/[0.06] py-3 last:border-0">
          <div className="flex items-baseline justify-between">
            <p className="text-[13px]" style={{ color: `${BONE}D9` }}>
              {m.name}
            </p>
            <p className="text-[13px] tabular-nums" style={{ color: BONE }}>
              {m.value} <span className="text-[10.5px] text-white/35">{m.unit}</span>
              <span className="ml-2 text-[11px]" style={{ color: m.flag ? HONEY : GREEN }}>
                {m.verdict}
              </span>
            </p>
          </div>
          <div className="mt-2.5">
            <DarkRange at={m.at} flag={m.flag} />
          </div>
        </li>
      ))}
    </ul>
  </div>
);

/* Biological age on a half dial from 20 to 60 years, with real age marked. */
const DIAL = { r: 74, cx: 96, cy: 92 };
const dialPoint = (years: number, r = DIAL.r) => {
  const a = Math.PI * (1 - (years - 20) / 40);
  return [DIAL.cx + Math.cos(a) * r, DIAL.cy - Math.sin(a) * r] as const;
};
const arc = (from: number, to: number) => {
  const [x1, y1] = dialPoint(from);
  const [x2, y2] = dialPoint(to);
  return `M ${x1} ${y1} A ${DIAL.r} ${DIAL.r} 0 0 1 ${x2} ${y2}`;
};

const AgeDial: React.FC = () => {
  const [bx, by] = dialPoint(34);
  const [r1x, r1y] = dialPoint(38, DIAL.r - 12);
  const [r2x, r2y] = dialPoint(38, DIAL.r + 12);
  return (
    <div className={cn(darkCard, 'h-full w-full p-5 text-left')}>
      <div className="flex items-baseline justify-between">
        <p className="text-[12.5px] text-white/55">Biological age</p>
        <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/30">Module</p>
      </div>
      <svg viewBox="0 0 192 104" className="mt-2 w-full overflow-visible">
        <defs>
          <linearGradient id="hos-dial" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={GREEN} />
            <stop offset="1" stopColor={HONEY} />
          </linearGradient>
        </defs>
        {Array.from({ length: 21 }, (_, i) => {
          const [ax, ay] = dialPoint(20 + i * 2, DIAL.r + 16);
          const [bx2, by2] = dialPoint(20 + i * 2, DIAL.r + (i % 5 === 0 ? 22 : 19));
          return <line key={i} x1={ax} y1={ay} x2={bx2} y2={by2} stroke="rgba(242,237,227,0.22)" strokeWidth="1" />;
        })}
        <path d={arc(20, 60)} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" strokeLinecap="round" />
        <path d={arc(20, 34)} fill="none" stroke="url(#hos-dial)" strokeWidth="10" strokeLinecap="round" />
        <line x1={r1x} y1={r1y} x2={r2x} y2={r2y} stroke="rgba(242,237,227,0.6)" strokeWidth="1.5" strokeDasharray="2 2" />
        <circle cx={bx} cy={by} r="9" fill={HONEY} opacity="0.18" />
        <circle cx={bx} cy={by} r="5" fill="#13110E" stroke={HONEY} strokeWidth="2.5" />
        <text x={DIAL.cx} y={DIAL.cy - 10} textAnchor="middle" fontSize="38" fill={BONE} style={{ letterSpacing: '-0.04em' }}>
          34
        </text>
        <text x={DIAL.cx} y={DIAL.cy + 8} textAnchor="middle" fontSize="10.5" fill="rgba(242,237,227,0.45)">
          years
        </text>
      </svg>
      <div className="mt-2 flex items-center justify-between text-[11.5px]">
        <span className="text-white/40">Real age 38</span>
        <span className="rounded-full bg-[#9FD8A8]/12 px-2 py-0.5" style={{ color: GREEN }}>
          4 years younger
        </span>
      </div>
    </div>
  );
};

/* HbA1c over four tests, falling into the healthy range (under 5.7%). */
const trend = [5.9, 5.8, 5.6, 5.4];
const months = ['Jan', 'Apr', 'Jul', 'Oct'];
const TC = { w: 262, h: 86, lo: 5.1, hi: 6.1 };
const tx = (i: number) => 6 + (i * (TC.w - 12)) / (trend.length - 1);
const ty = (v: number) => TC.h - ((v - TC.lo) / (TC.hi - TC.lo)) * TC.h;
const smooth = (pts: (readonly [number, number])[]) =>
  pts.reduce((d, [x, y], i) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = pts[i - 1];
    const mx = (px + x) / 2;
    return `${d} C ${mx} ${py}, ${mx} ${y}, ${x} ${y}`;
  }, '');
const points = trend.map((v, i) => [tx(i), ty(v)] as const);
const line = smooth(points);

const TrendCard: React.FC = () => {
  const [lx, ly] = points[points.length - 1];
  return (
    <div className={cn(darkCard, 'h-full w-full p-5 text-left')}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[12.5px] text-white/55">HbA1c, last four tests</p>
          <p className="mt-1.5 text-[26px] leading-none tracking-[-0.03em] tabular-nums" style={{ color: BONE }}>
            5.4<span className="text-[14px] text-white/40">%</span>
          </p>
        </div>
        <span className="rounded-full border border-[#9FD8A8]/25 bg-[#9FD8A8]/10 px-2 py-0.5 text-[11px] tabular-nums" style={{ color: GREEN }}>
          ↓ 0.5 since Jan
        </span>
      </div>
      <svg viewBox={`0 0 ${TC.w} ${TC.h + 20}`} className="mt-3 w-full overflow-visible">
        <defs>
          <linearGradient id="hos-trend" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={GREEN} stopOpacity="0.35" />
            <stop offset="1" stopColor={GREEN} stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="0" y={ty(5.7)} width={TC.w} height={TC.h - ty(5.7)} rx="6" fill="rgba(159,216,168,0.06)" />
        <line x1="0" x2={TC.w} y1={ty(5.7)} y2={ty(5.7)} stroke="rgba(159,216,168,0.35)" strokeDasharray="3 4" />
        <text x={TC.w - 2} y={ty(5.7) - 5} textAnchor="end" fontSize="9" fill="rgba(159,216,168,0.7)">
          Healthy under 5.7
        </text>
        <path d={`${line} L ${lx} ${TC.h} L ${points[0][0]} ${TC.h} Z`} fill="url(#hos-trend)" />
        <path d={line} fill="none" stroke={GREEN} strokeWidth="2.2" strokeLinecap="round" />
        {points.slice(0, -1).map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#13110E" stroke={GREEN} strokeWidth="1.6" />
        ))}
        <circle cx={lx} cy={ly} r="11" fill={GREEN} opacity="0.15" />
        <circle cx={lx} cy={ly} r="4.5" fill={GREEN} />
        {months.map((m, i) => (
          <text key={m} x={tx(i)} y={TC.h + 16} textAnchor="middle" fontSize="9.5" fill="rgba(242,237,227,0.35)">
            {m}
          </text>
        ))}
      </svg>
    </div>
  );
};

const modules = [
  { name: 'Smart Reports', on: true },
  { name: 'Biological Age', on: true },
  { name: 'Disease Risk', on: true },
  { name: 'Food Intelligence', on: false },
];

const Toggle: React.FC<{ on: boolean }> = ({ on }) => (
  <span className={cn('relative inline-flex h-[17px] w-[30px] shrink-0 rounded-full transition-colors', on ? 'bg-[#F2D27A]' : 'bg-white/[0.1]')} style={on ? { boxShadow: '0 0 14px rgba(242,210,122,0.45)' } : undefined}>
    <span className={cn('absolute top-[2px] h-[13px] w-[13px] rounded-full', on ? 'left-[15px] bg-[#13110E]' : 'left-[2px] bg-white/50')} />
  </span>
);

const ModulesCard: React.FC = () => (
  <div className={cn(darkCard, 'h-full w-full px-5 py-4 text-left')}>
    <div className="flex items-baseline justify-between">
      <p className="text-[12.5px] text-white/55">Modules</p>
      <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/30">Your Lab</p>
    </div>
    <ul className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2.5">
      {modules.map((m) => (
        <li key={m.name} className="flex items-center justify-between gap-3">
          <span className="whitespace-nowrap text-[12px]" style={{ color: m.on ? BONE : 'rgba(242,237,227,0.4)' }}>
            {m.name}
          </span>
          <Toggle on={m.on} />
        </li>
      ))}
    </ul>
  </div>
);

export const HumanOsScene: React.FC<{ className?: string }> = ({ className }) => (
  <Scene
    width={640}
    height={500}
    upscale
    rotate={{ x: 16, y: -20, z: 4 }}
    className={className}
    label="Sample Human OS output for a lab: a plain-language report, biological age, an HbA1c trend and the modules switched on."
  >
    <Layer x={40} y={150} w={330} h={520}>
      <Report />
    </Layer>

    <PlaneShadow x={14} y={40} w={360} h={120} strength={0.45} />
    <Layer x={24} y={30} z={50} w={346} h={98}>
      <ModulesCard />
    </Layer>

    <PlaneShadow x={380} y={56} w={250} h={220} />
    <Layer x={394} y={44} z={110} w={226} h={192} drift={7}>
      <AgeDial />
    </Layer>

    <PlaneShadow x={320} y={270} w={320} h={200} />
    <Layer x={332} y={258} z={160} w={290} h={172} drift={8.5}>
      <TrendCard />
    </Layer>
  </Scene>
);
