import React, { useEffect, useRef, useState } from 'react';
import {
  ScanLine,
  Orbit,
  HeartPulse,
  MessageCircle,
  Stethoscope,
  Headset,
  LayoutDashboard,
  Search,
  CheckCircle2,
  PhoneCall,
  Pill,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { SystemSlug, getSystem, systems } from '../../content/human-os';
import { CountUp, LiveDot, Waveform } from '../home/motion';

/* ─────────────────────────────────────────────────────────────────────────────
 * Human OS console (hero). One view per system, built only from live modules.
 * All figures inside the views are sample data, and the window says so.
 * Auto-plays through the seven systems; pauses on hover, focus and reduced motion.
 * ──────────────────────────────────────────────────────────────────────────── */

const DURATION = 6000;

const reduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const enter = (i = 0, base = 0.05): React.CSSProperties => ({ animation: `hos-fade-up 0.55s cubic-bezier(0.2,0.7,0.2,1) ${base + i * 0.09}s both` });

/** Types text out once; shows it whole under reduced motion. */
const useTypewriter = (text: string, speed = 18, delay = 500) => {
  const [n, setN] = useState(reduced() ? text.length : 0);
  useEffect(() => {
    if (reduced()) return;
    let i = 0;
    let id = 0;
    const start = window.setTimeout(() => {
      id = window.setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) window.clearInterval(id);
      }, speed);
    }, delay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(id);
    };
  }, [text, speed, delay]);
  return text.slice(0, n);
};

/** Steps 0..count over time, for sequences that unfold. */
const useSteps = (count: number, every = 700, delay = 300) => {
  const [s, setS] = useState(reduced() ? count : 0);
  useEffect(() => {
    if (reduced()) return;
    let i = 0;
    let id = 0;
    const start = window.setTimeout(() => {
      id = window.setInterval(() => {
        i += 1;
        setS(i);
        if (i >= count) window.clearInterval(id);
      }, every);
    }, delay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(id);
    };
  }, [count, every, delay]);
  return s;
};

/* ── Shared widget pieces ── */

const Widget: React.FC<{ title: string; icon?: React.ReactNode; className?: string; style?: React.CSSProperties; right?: React.ReactNode; children: React.ReactNode }> = ({
  title,
  icon,
  className = '',
  style,
  right,
  children,
}) => (
  <div className={`rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.07] p-4 ${className}`} style={style}>
    <div className="flex items-center justify-between gap-3 mb-3">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
        {icon && <span className="text-hos-yellow">{icon}</span>}
        {title}
      </div>
      {right}
    </div>
    {children}
  </div>
);

type Verdict = 'Optimal' | 'In range' | 'Outlier' | 'High' | 'Low' | 'Moderate';
const chip: Record<Verdict, string> = {
  Optimal: 'bg-emerald-400/15 text-emerald-300',
  'In range': 'bg-white/10 text-white/70',
  Outlier: 'bg-amber-400/15 text-amber-300',
  High: 'bg-rose-400/15 text-rose-300',
  Low: 'bg-emerald-400/15 text-emerald-300',
  Moderate: 'bg-amber-400/15 text-amber-300',
};
const Chip: React.FC<{ v: Verdict }> = ({ v }) => <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${chip[v]}`}>{v}</span>;

/** Biological vs calendar age on a shared scale, with the factors driving the gap. */
const BioAgeCard: React.FC = () => {
  const min = 20;
  const max = 60;
  const pos = (age: number) => `${((age - min) / (max - min)) * 100}%`;
  return (
    <div>
      <div className="flex items-end gap-2">
        <span className="text-4xl font-semibold text-white leading-none">34</span>
        <span className="pb-0.5 text-[11px] text-white/55">years</span>
        <span className="ml-auto mb-0.5 rounded-full bg-emerald-400/15 text-emerald-300 text-[10px] font-semibold px-2 py-0.5">4 yrs younger</span>
      </div>
      <div className="relative mt-5 h-8">
        <div className="absolute inset-x-0 top-3.5 h-1 rounded-full bg-gradient-to-r from-emerald-300/50 via-white/15 to-rose-300/50" />
        <div className="absolute top-0 -translate-x-1/2 flex flex-col items-center" style={{ left: pos(38), ...enter(1, 0.3) }}>
          <span className="w-0.5 h-8 bg-white/35" />
        </div>
        <div className="absolute top-1.5 -translate-x-1/2" style={{ left: pos(34), animation: 'pw-slide 1s cubic-bezier(0.2,0.7,0.2,1) 0.4s both' }}>
          <span className="block w-5 h-5 rounded-full bg-hos-yellow ring-4 ring-hos-yellow/20" />
        </div>
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-white/45">
        <span>Biological 34</span>
        <span>Calendar 38</span>
      </div>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {[
          ['Sleep', true],
          ['HbA1c', true],
          ['Vitamin D', false],
        ].map(([f, good], i) => (
          <li key={f as string} className={`rounded-full px-2 py-0.5 text-[10px] ring-1 ${good ? 'bg-emerald-400/10 ring-emerald-300/30 text-emerald-300' : 'bg-amber-400/10 ring-amber-300/30 text-amber-300'}`} style={enter(i, 0.6)}>
            {good ? '↓' : '↑'} {f as string}
          </li>
        ))}
      </ul>
    </div>
  );
};

/** Sleep architecture as a hypnogram that draws itself, plus sleep time and debt. */
const SleepCard: React.FC = () => {
  // Stage levels: 0 awake, 1 REM, 2 light, 3 deep
  const stages = [0, 2, 3, 3, 2, 1, 2, 3, 2, 1, 1, 2, 2, 1, 0];
  const w = 200;
  const step = w / (stages.length - 1);
  const y = (lvl: number) => 6 + lvl * 14;
  const d = stages.map((lvl, i) => `${i ? 'H' : 'M'}${(i * step).toFixed(1)} ${i ? '' : y(lvl)}${i ? ` V${y(lvl)}` : ''}`).join(' ');
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-2xl font-semibold text-white leading-none">7h 12m</span>
          <div className="mt-1 text-[10px] text-white/55">Last night</div>
        </div>
        <div className="text-right">
          <div className="text-[13px] font-semibold text-hos-yellow">Recovered</div>
          <div className="text-[10px] text-white/55">Sleep debt 40 min</div>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <div className="relative w-10 h-14 shrink-0 text-[9px] text-white/45">
          {['Awake', 'REM', 'Light', 'Deep'].map((label, l) => (
            <span key={label} className="absolute left-0 -translate-y-1/2" style={{ top: `${(y(l) / 52) * 100}%` }}>
              {label}
            </span>
          ))}
        </div>
        <svg viewBox="0 0 200 52" preserveAspectRatio="none" className="flex-1 h-14" aria-hidden="true">
          {[0, 1, 2, 3].map((l) => (
            <line key={l} x1="0" x2="200" y1={y(l)} y2={y(l)} stroke="rgba(255,255,255,0.06)" />
          ))}
          <path d={d} fill="none" stroke="#F5D97B" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" strokeDasharray="600" style={{ animation: 'pw-draw 1.8s ease 0.3s both' }} />
        </svg>
      </div>
    </div>
  );
};

const RangeRow: React.FC<{ name: string; value: string; pos: number; v: Verdict; i: number }> = ({ name, value, pos, v, i }) => (
  <li className="grid grid-cols-[88px_1fr_70px] items-center gap-3 text-[12px]" style={enter(i, 0.15)}>
    <span className="text-white/80 truncate">
      {name} <span className="text-white/45 text-[11px]">{value}</span>
    </span>
    <span className="relative h-1.5 rounded-full bg-white/[0.08]">
      <span className="absolute inset-y-0 left-[30%] right-[30%] rounded-full bg-hos-yellow/50" />
      <span className="absolute top-1/2 -mt-[6px] -ml-[6px] w-3 h-3 rounded-full bg-white ring-2 ring-ink-900 shadow-[0_0_10px_rgba(255,255,255,0.4)]" style={{ left: `${pos}%`, animation: `pw-slide 0.9s cubic-bezier(0.2,0.7,0.2,1) ${0.2 + i * 0.1}s both` }} />
    </span>
    <span className="text-right">
      <Chip v={v} />
    </span>
  </li>
);

/* ── Views ── */

const DecoderView: React.FC = () => {
  const summary = useTypewriter('Vitamin D is below your optimal range. Everything else is optimal or in range. Your next panel is due in 90 days.');
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
      <Widget title="Smart Report · Your Lab" icon={<ScanLine className="w-3.5 h-3.5" />} className="md:col-span-3" style={enter(0)} right={<span className="text-[10px] text-white/45">Lab PDF · 2 pages</span>}>
        <ul className="space-y-3">
          {(
            [
              ['HbA1c', '5.1 %', 52, 'Optimal'],
              ['Vitamin D', '24 ng/mL', 16, 'Outlier'],
              ['LDL', '96 mg/dL', 62, 'In range'],
              ['hs-CRP', '0.6 mg/L', 46, 'Optimal'],
              ['TSH', '2.1 mIU/L', 50, 'Optimal'],
            ] as [string, string, number, Verdict][]
          ).map(([n, v, p, verdict], i) => (
            <RangeRow key={n} name={n} value={v} pos={p} v={verdict} i={i} />
          ))}
        </ul>
        <div className="mt-5 pt-4 border-t border-white/[0.07]" style={enter(5, 0.15)}>
          <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
            <span className="bg-emerald-300/80 origin-left" style={{ width: '60%', animation: 'hos-grow 0.8s ease 0.7s both' }} />
            <span className="bg-white/30 origin-left" style={{ width: '20%', animation: 'hos-grow 0.8s ease 0.85s both' }} />
            <span className="bg-amber-300/80 origin-left" style={{ width: '20%', animation: 'hos-grow 0.8s ease 1s both' }} />
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-white/55">
            <span>3 optimal · 1 in range · 1 outlier</span>
            <span className="inline-flex items-center gap-1 text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" /> Sent to the patient's app
            </span>
          </div>
        </div>
      </Widget>
      <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-1 gap-3">
        <Widget title="Biological Age" style={enter(1)}>
          <BioAgeCard />
        </Widget>
        <Widget title="AI summary" icon={<Sparkles className="w-3.5 h-3.5" />} style={enter(2)}>
          <p className="text-[12px] leading-relaxed text-white/80 min-h-[64px]">
            {summary}
            <span className="inline-block w-[2px] h-3.5 bg-hos-yellow align-middle ml-0.5 animate-pulse" />
          </p>
        </Widget>
      </div>
    </div>
  );
};

const TwinView: React.FC = () => {
  const horizons = ['3h', '7d', '1y', '10y'];
  const step = useSteps(horizons.length - 1, 900, 600);
  const pts = [
    [0, 92],
    [80, 84],
    [160, 70],
    [240, 58],
    [320, 44],
    [400, 34],
  ];
  const path = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
      <Widget
        title="Trajectory Engine"
        icon={<Orbit className="w-3.5 h-3.5" />}
        className="md:col-span-3"
        style={enter(0)}
        right={
          <span className="flex gap-1">
            {horizons.map((h, i) => (
              <span key={h} className={`px-2 py-0.5 rounded-full text-[10px] font-mono transition-colors ${i === step ? 'bg-hos-yellow text-ink-950' : 'text-white/50'}`}>
                {h}
              </span>
            ))}
          </span>
        }
      >
        <svg viewBox="0 0 400 120" className="w-full h-36">
          <defs>
            <linearGradient id="pw-band" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#F5D97B" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F5D97B" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[30, 60, 90].map((y) => (
            <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" />
          ))}
          <path d={`${path} L400 120 L0 120 Z`} fill="url(#pw-band)" style={{ animation: 'hos-fade-up 1s ease 0.5s both' }} />
          <path d={path} fill="none" stroke="#F5D97B" strokeWidth="2.5" strokeLinejoin="round" strokeDasharray="600" style={{ animation: 'pw-draw 1.6s ease 0.2s both' }} />
          <circle cx={pts[Math.min(5, step * 2 + 1)][0]} cy={pts[Math.min(5, step * 2 + 1)][1]} r="5" fill="#07080A" stroke="#F5D97B" strokeWidth="2.5" style={{ transition: 'cx .6s, cy .6s' }} />
        </svg>
        <p className="text-[11px] text-white/55">Projected under current habits</p>
      </Widget>
      <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-1 gap-3">
        <Widget title="Biological Age" style={enter(1)}>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-semibold text-white">
              <CountUp to={34} />
            </span>
            <span className="pb-1 text-[11px] text-white/55">vs 38 calendar age</span>
          </div>
        </Widget>
        <Widget title="Disease Risk Engine" style={enter(2)}>
          <ul className="space-y-2 text-[12px]">
            {(
              [
                ['Metabolic', 28, 'Low'],
                ['Cardiovascular', 54, 'Moderate'],
              ] as [string, number, Verdict][]
            ).map(([n, w, v], i) => (
              <li key={n}>
                <div className="flex justify-between text-white/75">
                  {n} <Chip v={v} />
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                  <div className="h-full rounded-full bg-hos-yellow/80 origin-left" style={{ width: `${w}%`, animation: `hos-grow 1s ease ${0.3 + i * 0.15}s both` }} />
                </div>
              </li>
            ))}
          </ul>
        </Widget>
      </div>
    </div>
  );
};

const WholeBodyView: React.FC = () => {
  const nodes = [
    { id: 'Sleep', x: 70, y: 40 },
    { id: 'Glucose', x: 230, y: 34 },
    { id: 'HRV', x: 300, y: 112 },
    { id: 'Stress', x: 150, y: 128 },
    { id: 'Activity', x: 40, y: 118 },
  ];
  const edges: [number, number, boolean][] = [
    [0, 1, true],
    [0, 3, false],
    [2, 3, true],
    [4, 0, false],
    [1, 2, false],
    [4, 3, false],
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
      <Widget title="Correlation Engine" icon={<HeartPulse className="w-3.5 h-3.5" />} className="md:col-span-3" style={enter(0)}>
        <svg viewBox="0 0 340 160" className="w-full h-40">
          {edges.map(([a, b, strong], i) => (
            <line
              key={i}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke={strong ? '#F5D97B' : 'rgba(255,255,255,0.15)'}
              strokeWidth={strong ? 2 : 1}
              strokeDasharray={strong ? '5 5' : undefined}
              style={strong ? { animation: 'pw-dash 1.2s linear infinite' } : enter(i, 0.2)}
            />
          ))}
          {nodes.map((n, i) => (
            <g key={n.id} style={enter(i, 0.1)}>
              <circle cx={n.x} cy={n.y} r="17" fill="#15171C" stroke="rgba(255,255,255,0.18)" />
              <text x={n.x} y={n.y + 31} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.7)">
                {n.id}
              </text>
              <circle cx={n.x} cy={n.y} r="4" fill={i < 3 ? '#F5D97B' : 'rgba(255,255,255,0.5)'} />
            </g>
          ))}
        </svg>
      </Widget>
      <div className="md:col-span-2 grid grid-cols-1 gap-3">
        <Widget title="Insight" icon={<Sparkles className="w-3.5 h-3.5" />} style={enter(1)}>
          <p className="text-[12px] text-white/80 leading-relaxed">Shorter sleep weeks line up with higher morning glucose on your last two panels.</p>
        </Widget>
        <Widget title="Cardiovascular Intelligence" style={enter(2)}>
          <svg viewBox="0 0 200 50" className="w-full h-12">
            <path d="M0 30 L20 28 L30 12 L38 40 L46 26 L70 27 L90 25 L100 10 L108 42 L116 24 L140 26 L160 24 L170 9 L178 41 L186 25 L200 25" fill="none" stroke="#F5D97B" strokeWidth="2" strokeDasharray="600" style={{ animation: 'pw-draw 1.8s linear both' }} />
          </svg>
          <div className="flex justify-between text-[11px] text-white/55">
            <span>HRV trend</span>
            <span className="text-white">Improving</span>
          </div>
        </Widget>
      </div>
    </div>
  );
};

const ConciergeView: React.FC = () => {
  const step = useSteps(3, 900, 400);
  const plan = ['Morning walk, 20 minutes', 'Vitamin D with lunch', 'Lights out by 11 pm'];
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
      <Widget title="AI Health Companion" icon={<MessageCircle className="w-3.5 h-3.5" />} className="md:col-span-3" style={enter(0)}>
        <div className="space-y-2.5 min-h-[170px]">
          <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-hos-yellow text-ink-950 text-[12px] px-3.5 py-2.5" style={enter(0, 0.2)}>
            Why is my vitamin D flagged?
          </div>
          {step >= 1 && (
            <div className="w-fit max-w-[88%] rounded-2xl rounded-bl-sm bg-white/[0.07] ring-1 ring-white/10 text-[12px] px-3.5 py-2.5 text-white/85" style={enter(0)}>
              It's 24 ng/mL, below your optimal range. I've added a two-week plan and I'll check in on Friday.
            </div>
          )}
          {step >= 2 && (
            <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-hos-yellow text-ink-950 text-[12px] px-3.5 py-2.5" style={enter(0)}>
              Can I still go for my run tomorrow?
            </div>
          )}
          {step < 3 ? (
            <div className="flex gap-1.5 pl-2 pt-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/40" style={{ animation: `hos-wave 1s ease-in-out ${i * 0.15}s infinite` }} />
              ))}
            </div>
          ) : (
            <div className="w-fit max-w-[88%] rounded-2xl rounded-bl-sm bg-white/[0.07] ring-1 ring-white/10 text-[12px] px-3.5 py-2.5 text-white/85" style={enter(0)}>
              Yes. Your recovery looks good today.
            </div>
          )}
        </div>
      </Widget>
      <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-1 gap-3">
        <Widget title="Today's plan" style={enter(1)}>
          <ul className="space-y-2">
            {plan.map((p, i) => (
              <li key={p} className="flex items-center gap-2 text-[12px]">
                <CheckCircle2 className={`w-4 h-4 shrink-0 transition-colors duration-500 ${step > i ? 'text-hos-yellow' : 'text-white/20'}`} />
                <span className={`transition-colors duration-500 ${step > i ? 'text-white/50 line-through' : 'text-white/80'}`}>{p}</span>
              </li>
            ))}
          </ul>
        </Widget>
        <Widget title="Sleep & Recovery" style={enter(2)}>
          <SleepCard />
        </Widget>
      </div>
    </div>
  );
};

const ClinicalView: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
    <Widget title="Clinical Intake Brief" icon={<Stethoscope className="w-3.5 h-3.5" />} className="md:col-span-3" style={enter(0)} right={<span className="text-[10px] text-emerald-300">Ready before the consult</span>}>
      <div className="flex items-center gap-3 pb-3 border-b border-white/[0.07]">
        <span className="w-9 h-9 rounded-full bg-white/[0.07] ring-1 ring-white/10 text-[11px] font-semibold text-white flex items-center justify-center">RK</span>
        <div>
          <div className="text-[13px] font-semibold text-white">New patient · 52</div>
          <div className="text-[11px] text-white/55">History and 3 lab reports parsed</div>
        </div>
      </div>
      <div className="mt-3 text-[12px] font-semibold text-white">3 outliers flagged</div>
      <ul className="mt-2 space-y-1.5">
        {(
          [
            ['hs-CRP', '4.2 mg/L', 'High'],
            ['Vitamin D', '18 ng/mL', 'Outlier'],
            ['LDL', '142 mg/dL', 'High'],
          ] as [string, string, Verdict][]
        ).map(([n, v, verdict], i) => (
          <li key={n} className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2 text-[12px]" style={enter(i, 0.2)}>
            <span className="text-white/85">
              {n} <span className="text-white/45">{v}</span>
            </span>
            <Chip v={verdict} />
          </li>
        ))}
      </ul>
    </Widget>
    <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-1 gap-3">
      <Widget title="Medication Intelligence" icon={<Pill className="w-3.5 h-3.5" />} style={enter(1)}>
        <ul className="space-y-2 text-[12px]">
          <li className="flex items-center gap-2 text-white/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            Interaction check complete
          </li>
          <li className="flex items-center gap-2 text-white/80">
            <RefreshCw className="w-4 h-4 text-hos-yellow shrink-0" />
            Refill due in 6 days
          </li>
        </ul>
      </Widget>
      <Widget title="HbA1c · 4 reports" style={enter(2)}>
        <svg viewBox="0 0 200 60" className="w-full h-14">
          <path d="M10 14 L70 26 L130 36 L190 44" fill="none" stroke="#F5D97B" strokeWidth="2.5" strokeDasharray="400" style={{ animation: 'pw-draw 1.4s ease 0.3s both' }} />
          {[
            [10, 14],
            [70, 26],
            [130, 36],
            [190, 44],
          ].map(([x, y], i) => (
            <circle key={x} cx={x} cy={y} r="4" fill="#07080A" stroke="#F5D97B" strokeWidth="2" style={enter(i, 0.4)} />
          ))}
        </svg>
      </Widget>
    </div>
  </div>
);

const AgentView: React.FC = () => {
  const step = useSteps(3, 1100, 500);
  const [secs, setSecs] = useState(38);
  useEffect(() => {
    const id = window.setInterval(() => setSecs((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);
  const lines: [string, string][] = [
    ['Caller', 'Mujhe cardiology mein appointment chahiye.'],
    ['Agent', 'Dr. Rao has a slot on Tuesday at 10:30. Shall I book it?'],
    ['Caller', 'Haan, please book kar dijiye.'],
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
      <Widget
        title="AI Voice Agent"
        icon={<PhoneCall className="w-3.5 h-3.5" />}
        className="md:col-span-3"
        style={enter(0)}
        right={
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-300">
            <LiveDot /> {`${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`}
          </span>
        }
      >
        <div className="flex items-center justify-between text-[11px] text-white/55">
          <span>Inbound call · Hindi</span>
          <span>Cardiology OPD</span>
        </div>
        <Waveform className="mt-3 w-full" height={40} />
        <ul className="mt-3 space-y-2 min-h-[110px]">
          {lines.slice(0, step).map(([who, text]) => (
            <li key={text} className={`flex gap-2 text-[12px] ${who === 'Agent' ? '' : ''}`} style={enter(0)}>
              <span className={`shrink-0 w-12 text-[10px] font-semibold uppercase tracking-wider pt-0.5 ${who === 'Agent' ? 'text-hos-yellow' : 'text-white/45'}`}>{who}</span>
              <span className="text-white/85">{text}</span>
            </li>
          ))}
        </ul>
      </Widget>
      <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-1 gap-3">
        <Widget title="Outcome" style={enter(1)}>
          <div className={`flex items-center gap-2 text-[13px] font-semibold transition-colors duration-500 ${step >= 3 ? 'text-emerald-300' : 'text-white/40'}`}>
            <CheckCircle2 className="w-4 h-4" />
            {step >= 3 ? 'Visit booked, Tue 10:30' : 'Booking in progress'}
          </div>
          <div className="mt-1 text-[11px] text-white/55">Under your hospital's name</div>
        </Widget>
        <Widget title="Re-Test Recall Engine" icon={<RefreshCw className="w-3.5 h-3.5" />} style={enter(2)}>
          <ul className="space-y-1.5 text-[12px]">
            {['Lipid panel', 'HbA1c', 'Thyroid profile'].map((t, i) => (
              <li key={t} className="flex justify-between text-white/75" style={enter(i, 0.3)}>
                {t}
                <span className="text-[10px] text-hos-yellow">Reminder sent</span>
              </li>
            ))}
          </ul>
        </Widget>
      </div>
    </div>
  );
};

const CommandView: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
    <div className="md:col-span-5 grid grid-cols-3 gap-3">
      {[
        { l: 'Members screened', v: 4820 },
        { l: 'Reports delivered', v: 1284 },
        { l: 'High-risk members', v: 312 },
      ].map((k, i) => (
        <Widget key={k.l} title={k.l} style={enter(i)}>
          <div className="text-2xl font-semibold text-white">
            <CountUp to={k.v} />
          </div>
        </Widget>
      ))}
    </div>
    <Widget title="B2B Analytics Dashboard" icon={<LayoutDashboard className="w-3.5 h-3.5" />} className="md:col-span-3" style={enter(3)}>
      <div className="flex items-end gap-2 h-28">
        {[38, 52, 44, 66, 58, 78, 70, 86, 74, 92].map((h, i) => (
          <span key={i} className={`flex-1 rounded-t origin-bottom ${i === 9 ? 'bg-hos-yellow' : 'bg-white/15'}`} style={{ height: `${h}%`, animation: `hos-rise 0.8s cubic-bezier(0.2,0.7,0.2,1) ${0.2 + i * 0.05}s both` }} />
        ))}
      </div>
    </Widget>
    <Widget title="Cohort risk" className="md:col-span-2" style={enter(4)}>
      <div className="flex h-3 rounded-full overflow-hidden">
        {[
          ['bg-white/25', 62],
          ['bg-hos-yellow/80', 27],
          ['bg-rose-300/80', 11],
        ].map(([c, w], i) => (
          <span key={i} className={`${c} origin-left`} style={{ width: `${w}%`, animation: `hos-grow 0.9s ease ${0.3 + i * 0.2}s both` }} />
        ))}
      </div>
      <div className="mt-3 flex justify-between text-[11px] text-white/60">
        <span>Low</span>
        <span>Moderate</span>
        <span>High</span>
      </div>
    </Widget>
  </div>
);

const views: Record<SystemSlug, { module: string; icon: React.FC<{ className?: string }>; View: React.FC; headline?: string }> = {
  'health-decoder': { module: 'Smart Reports', icon: ScanLine, View: DecoderView },
  'digital-twin': { module: 'Trajectory Engine', icon: Orbit, View: TwinView },
  'whole-body-intelligence': { module: 'Correlation Engine', icon: HeartPulse, View: WholeBodyView },
  'ai-concierge': { module: 'AI Health Companion', icon: MessageCircle, View: ConciergeView },
  'clinical-intelligence': { module: 'Clinical Intake Briefs', icon: Stethoscope, View: ClinicalView },
  'agent-workforce': { module: 'AI Voice Agent', icon: Headset, View: AgentView },
  // The Command Center promise covers revenue modules that are not live yet, so this view uses its own line.
  'command-center': { module: 'B2B Analytics Dashboard', icon: LayoutDashboard, View: CommandView, headline: 'Cohort risk across your whole population, in one view.' },
};

export const ProductWindow: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    if (paused || reduced()) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % systems.length), DURATION);
    return () => window.clearTimeout(id);
  }, [paused, active]);

  /* Cursor spotlight: one CSS variable update per frame */
  const onMove = (e: React.MouseEvent) => {
    const el = frameRef.current;
    if (!el || reduced()) return;
    cancelAnimationFrame(raf.current);
    const { left, top } = el.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    });
  };

  const system = systems[active];
  const { View, module, headline } = views[system.slug];
  const live = system.modules.filter((m) => m.status === 'live');

  return (
    <div
      ref={frameRef}
      onMouseMove={onMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="group/pw relative rounded-[26px] p-[1px] bg-[linear-gradient(140deg,rgba(245,217,123,0.45),rgba(255,255,255,0.08)_30%,rgba(255,255,255,0.04)_70%,rgba(245,217,123,0.25))] shadow-[0_70px_160px_-60px_rgba(0,0,0,0.95)]"
    >
      {/* spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[26px] opacity-0 group-hover/pw:opacity-100 transition-opacity duration-500 z-10"
        style={{ background: 'radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), rgba(245,217,123,0.08), transparent 45%)' }}
      />
      <div className="relative rounded-[25px] overflow-hidden bg-ink-900">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 sm:px-5 py-3 border-b border-white/[0.06] bg-ink-950/60">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          </div>
          <div className="hidden sm:flex items-center gap-2 ml-2">
            <span className="w-6 h-6 rounded-md bg-[#0F766E] text-white text-[9px] font-bold flex items-center justify-center">YL</span>
            <span className="text-xs font-semibold text-white">Your Lab</span>
            <span className="text-xs text-white/40">/ Human OS</span>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="hidden md:flex items-center gap-2 w-full max-w-sm rounded-lg bg-white/[0.04] ring-1 ring-white/[0.07] px-3 py-1.5 text-xs text-white/45">
              <Search className="w-3.5 h-3.5" />
              Ask Human OS about a patient, report or cohort
              <span className="ml-auto rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/55">⌘K</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-[11px] text-white/55">
            <LiveDot /> <span className="hidden sm:inline">All systems running</span>
          </span>
        </div>

        <div className="grid grid-cols-12">
          {/* System rail */}
          <div role="tablist" aria-label="Human OS systems" className="col-span-12 lg:col-span-3 border-b lg:border-b-0 lg:border-r border-white/[0.06] p-2 lg:p-3 flex lg:flex-col gap-1 overflow-x-auto scrollbar-none bg-ink-950/30">
            <div className="hidden lg:block px-3 pt-1 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">Systems</div>
            {systems.map((s, i) => {
              const Icon = views[s.slug].icon;
              const isActive = i === active;
              return (
                <button
                  key={s.slug}
                  type="button"
                  role="tab"
                  id={`pw-tab-${s.slug}`}
                  aria-selected={isActive}
                  aria-controls="pw-panel"
                  onClick={() => setActive(i)}
                  className={`relative shrink-0 lg:w-full text-left rounded-xl px-3 py-2.5 overflow-hidden transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hos-yellow ${
                    isActive ? 'bg-white/[0.07] text-white' : 'text-white/55 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span className="flex items-center gap-2.5 text-[13px] font-medium whitespace-nowrap">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${isActive ? 'bg-hos-yellow text-ink-950' : 'bg-white/[0.05] text-white/60'}`}>
                      <Icon aria-hidden="true" className="w-3.5 h-3.5" />
                    </span>
                    <span>
                      <span className={`font-mono text-[10px] mr-1.5 ${isActive ? 'text-hos-yellow' : 'text-white/35'}`}>{s.number}</span>
                      {s.name}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Stage */}
          <div id="pw-panel" role="tabpanel" aria-labelledby={`pw-tab-${system.slug}`} className="col-span-12 lg:col-span-9 relative p-4 sm:p-6 min-h-[440px]">
            <div aria-hidden="true" className="absolute inset-0 dk-grid opacity-30" />
            <div key={`h-${active}`} className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5" style={enter(0, 0)}>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-hos-yellow">
                  {system.number} · {system.name}
                </div>
                <div className="mt-1.5 text-xl font-semibold text-white">{headline ?? system.promise}</div>
              </div>
              <ul className="flex flex-wrap gap-1.5 sm:justify-end max-w-sm">
                {live.slice(0, 4).map((m) => (
                  <li
                    key={m.name}
                    className={`rounded-full px-2.5 py-1 text-[11px] ring-1 ${m.name === module ? 'bg-hos-yellow/15 ring-hos-yellow/40 text-hos-yellow' : 'bg-white/[0.04] ring-white/10 text-white/60'}`}
                  >
                    {m.name}
                  </li>
                ))}
              </ul>
            </div>
            <div key={`v-${active}`} className="relative hos-anim" aria-hidden="true">
              <View />
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-2.5 border-t border-white/[0.06] bg-ink-950/60 text-[10px] text-white/45">
          <span>Sample screens with sample data</span>
          <span className="hidden sm:inline">Under your brand · {getSystem(system.slug)!.modules.filter((m) => m.status === 'live').length} modules available in this system</span>
        </div>
      </div>
    </div>
  );
};
