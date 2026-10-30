import React from 'react';
import { ArrowUpRight, Check, FileText, HeartPulse, Hourglass, Utensils } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Card, DASH_HI, Dial, RoundButton } from './ClinicDashboard';
import { Layer, PlaneShadow, Scene } from './Scene3D';

/* ─────────────────────────────────────────────────────────────────────────────
 * Human OS, as a tilted stage built from the same pieces as the clinic
 * dashboard: a lab's report lies on the plane, and what the modules work out
 * from it floats above: biological age on a dial, and the modules switched on,
 * in a dark stacked card. Sample data.
 * ──────────────────────────────────────────────────────────────────────────── */

const HI = DASH_HI;

/** A dark glass card: lit top edge, deep soft shadow. Used by the Studio pieces. */
export const darkCard =
  'rounded-[20px] border border-white/[0.09] bg-[linear-gradient(180deg,#1E1B17_0%,#13110E_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_40px_70px_-30px_rgba(0,0,0,0.9),0_12px_28px_-14px_rgba(0,0,0,0.7)]';

/* Floating on the dark page, each card carries the dashboard's warm wash itself. */
const WASH: React.CSSProperties = { background: `radial-gradient(90% 80% at 100% 100%, #F7E3A4, transparent 70%), linear-gradient(160deg, #F4F3F0 0%, #EFECE6 100%)` };
const LIFT = 'shadow-[0_40px_70px_-30px_rgba(0,0,0,0.85),0_12px_26px_-14px_rgba(0,0,0,0.55)]';

/* HbA1c over four tests, falling into the healthy range (under 5.7%). */
const hba1c = [
  { m: 'Jan', v: 5.9 },
  { m: 'Apr', v: 5.8 },
  { m: 'Jul', v: 5.6 },
  { m: 'Oct', v: 5.4 },
];

const Report: React.FC = () => (
  <Card className={cn('flex h-full w-full flex-col border-0 p-5 text-left font-sans text-[#1D1D1F]', LIFT)} style={WASH}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <span className="grid h-[34px] w-[34px] place-items-center rounded-[11px] bg-gradient-to-br from-[#3CC8D8] to-[#1A93A6] text-[11.5px] font-semibold text-[#0B0A08]">YL</span>
        <div>
          <p className="text-[14px] leading-tight">Your Lab</p>
          <p className="text-[11px] text-[#1D1D1F]/55">Health report · 23 Oct</p>
        </div>
      </div>
      <span className="rounded-full border border-[#1D1D1F]/25 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#1D1D1F]/60">Sample data</span>
    </div>

    <div className="mt-4 flex items-end gap-2.5">
      <span className="text-[58px] font-extralight leading-[0.82] tracking-[-0.05em]">26</span>
      <span className="pb-0.5 text-[12px] leading-tight text-[#1D1D1F]/60">
        of 28 results
        <br />
        in a healthy range
      </span>
    </div>

    <div className="mt-5 flex gap-1.5">
      {[
        { label: 'In range', value: '26', flex: 3, kind: 'dark' },
        { label: 'Worth a chat', value: '2', flex: 1.7, kind: 'hi' },
        { label: 'Re-test', value: 'Jan', flex: 1.4, kind: 'hatch' },
      ].map((s) => (
        <div key={s.label} style={{ flex: s.flex }}>
          <p className="mb-1.5 text-[11px] text-[#1D1D1F]/65">{s.label}</p>
          <span
            className={cn('flex h-[36px] items-center rounded-full px-3.5 text-[12px]', s.kind === 'dark' && 'bg-[#1D1D1F] text-white')}
            style={s.kind === 'hi' ? { background: HI } : s.kind === 'hatch' ? { backgroundImage: 'repeating-linear-gradient(-45deg, rgba(29,29,31,0.16) 0 1.5px, transparent 1.5px 7px)', color: 'rgba(29,29,31,0.65)' } : undefined}
          >
            {s.value}
          </span>
        </div>
      ))}
    </div>

    <div className="mt-6 flex items-end justify-between">
      <div>
        <p className="text-[15px] tracking-[-0.01em]">HbA1c</p>
        <p className="text-[11px] text-[#1D1D1F]/55">Last four tests, healthy under 5.7</p>
      </div>
      <p className="text-[26px] font-light leading-none tracking-[-0.04em]">
        5.4<span className="text-[13px] text-[#1D1D1F]/50">%</span>
      </p>
    </div>
    <div className="mt-8 flex items-end justify-around px-4">
      {hba1c.map((h, i) => {
        const last = i === hba1c.length - 1;
        return (
          <div key={h.m} className="relative flex flex-col items-center gap-2">
            {last && (
              <span className="absolute -top-[28px] whitespace-nowrap rounded-full px-2.5 py-1 text-[10.5px]" style={{ background: HI }}>
                In range
              </span>
            )}
            <span className="relative flex h-[84px] w-[7px] items-end">
              <span className="absolute inset-y-0 left-[3px] border-l border-dashed border-[#1D1D1F]/[0.14]" />
              <span className="relative w-[7px] rounded-full" style={{ height: (h.v - 5) * 84, background: last ? HI : '#1D1D1F' }} />
            </span>
            <span className="h-[5px] w-[5px] rounded-full bg-[#1D1D1F]" />
            <span className="text-[10.5px] text-[#1D1D1F]/55">{h.m}</span>
          </div>
        );
      })}
    </div>
  </Card>
);

const AgeCard: React.FC = () => (
  <Card className={cn('flex h-full w-full flex-col border-0 p-5 text-left font-sans text-[#1D1D1F]', LIFT)} style={WASH}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[17px] tracking-[-0.02em]">Biological age</p>
        <p className="mt-0.5 text-[11px] text-[#1D1D1F]/55">From biomarkers and lifestyle</p>
      </div>
      <RoundButton className="h-[34px] w-[34px]">
        <ArrowUpRight className="h-[15px] w-[15px]" strokeWidth={1.8} />
      </RoundButton>
    </div>
    <div className="mx-auto mt-1">
      <Dial hi={HI} value={0.42} size={132}>
        <p className="text-[34px] font-light leading-none tracking-[-0.045em]">34</p>
        <p className="mt-0.5 text-[10.5px] text-[#1D1D1F]/55">years</p>
      </Dial>
    </div>
    <div className="mt-auto flex items-center justify-between">
      <span className="text-[11.5px] text-[#1D1D1F]/60">Real age 38</span>
      <span className="rounded-full px-2.5 py-1 text-[11px]" style={{ background: HI }}>
        4 years younger
      </span>
    </div>
  </Card>
);

const modules = [
  { name: 'Smart Reports', note: 'Every report explained', Icon: FileText, on: true },
  { name: 'Biological Age', note: 'Body age against real age', Icon: Hourglass, on: true },
  { name: 'Disease Risk', note: 'Heart and metabolic scores', Icon: HeartPulse, on: true },
  { name: 'Food Intelligence', note: 'Switch on any time', Icon: Utensils, on: false },
];

/* The modules switched on for this lab: a dark card on a stack of two, like the dashboard's briefs. */
const ModulesCard: React.FC = () => (
  <div className="relative h-full w-full pt-[18px] text-left font-sans">
    {/* Two cards behind, lighter and narrower, so the stack reads as a stack */}
    <span className="absolute inset-x-7 top-0 h-10 rounded-[20px] bg-[#8A8A8E]" />
    <span className="absolute inset-x-3.5 top-[9px] h-10 rounded-[22px] bg-[#5A5A5E]" />
    <div className="relative h-full rounded-[24px] bg-[#1D1D1F] px-5 pb-3 pt-4 text-white shadow-[0_40px_70px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex items-baseline justify-between">
        <p className="text-[16px] tracking-[-0.01em]">Modules</p>
        <p className="text-[30px] font-light leading-none tracking-[-0.04em]">
          3<span className="text-white/45">/4</span>
        </p>
      </div>
      <ul className="mt-2.5">
        {modules.map((m) => (
          <li key={m.name} className="flex items-center gap-3 py-[6px]">
            <span className={cn('grid h-[32px] w-[32px] shrink-0 place-items-center rounded-full', m.on ? 'bg-white text-[#1D1D1F]' : 'bg-white/[0.08] text-white/50')}>
              <m.Icon className="h-[14px] w-[14px]" strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <p className={cn('text-[12.5px] leading-tight', !m.on && 'text-white/50')}>{m.name}</p>
              <p className="text-[10px] text-white/40">{m.note}</p>
            </div>
            {m.on ? (
              <span className="grid h-[18px] w-[18px] place-items-center rounded-full" style={{ background: HI }}>
                <Check className="h-[11px] w-[11px] text-[#1D1D1F]" strokeWidth={3} />
              </span>
            ) : (
              <span className="h-[16px] w-[16px] rounded-full bg-white/25" />
            )}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export const HumanOsScene: React.FC<{ className?: string }> = ({ className }) => (
  <Scene
    width={640}
    height={500}
    upscale
    rotate={{ x: 16, y: -20, z: 4 }}
    className={className}
    label="Sample Human OS output for a lab: a report with 26 of 28 results in a healthy range and an HbA1c trend, biological age on a dial, and the modules switched on."
  >
    <Layer x={30} y={56} w={330} h={470}>
      <Report />
    </Layer>

    <PlaneShadow x={380} y={66} w={250} h={240} />
    <Layer x={394} y={54} z={110} w={224} h={232} drift={7.5}>
      <AgeCard />
    </Layer>

    <PlaneShadow x={338} y={330} w={300} h={240} />
    <Layer x={350} y={314} z={170} w={276} h={252} drift={9}>
      <ModulesCard />
    </Layer>
  </Scene>
);
