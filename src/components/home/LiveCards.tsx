import React, { useEffect, useState } from 'react';
import { CheckCircle2, ClipboardList, PhoneCall, Utensils, BarChart3 } from 'lucide-react';
import { LiveDot, Waveform } from './motion';

/* Sample product screens shown over homepage photos. Each card re-runs its entrance
 * animation when it mounts (the tab panel remounts it on every tab change). */

const fadeUp = (i: number): React.CSSProperties => ({ animation: `hos-fade-up 0.6s cubic-bezier(0.2,0.7,0.2,1) ${0.15 + i * 0.12}s both` });

const Shell: React.FC<{ title: string; icon: React.ReactNode; dark?: boolean; status?: string; children: React.ReactNode; className?: string }> = ({
  title,
  icon,
  dark = false,
  status,
  children,
  className = '',
}) => (
  <div
    className={`hos-anim w-[300px] max-w-full rounded-2xl p-4 shadow-[0_24px_60px_-20px_rgba(10,10,11,0.45)] backdrop-blur-md ${
      dark ? 'bg-hos-navy/95 text-white ring-1 ring-white/10' : 'bg-white/95 text-hos-black ring-1 ring-black/5'
    } ${className}`}
    style={{ animation: 'hos-fade-up 0.6s cubic-bezier(0.2,0.7,0.2,1) both' }}
  >
    <div className="flex items-center justify-between gap-3 mb-3">
      <div className="flex items-center gap-2 min-w-0">
        <span className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center ${dark ? 'bg-white/10 text-hos-yellow' : 'bg-hos-mist text-hos-black'}`}>{icon}</span>
        <span className="text-xs font-bold truncate">{title}</span>
      </div>
      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${dark ? 'text-emerald-300' : 'text-emerald-700'}`}>
        <LiveDot />
        {status}
      </span>
    </div>
    {children}
  </div>
);

type Verdict = 'Optimal' | 'Outlier' | 'In range' | 'High' | 'Low';
const chip: Record<Verdict, string> = {
  Optimal: 'bg-emerald-50 text-emerald-700',
  'In range': 'bg-slate-100 text-slate-600',
  Outlier: 'bg-amber-50 text-amber-700',
  High: 'bg-rose-50 text-rose-700',
  Low: 'bg-amber-50 text-amber-700',
};

export const SmartReportCard: React.FC = () => (
  <Shell title="Your Lab · Smart Report" icon={<span className="text-[9px] font-bold">YL</span>}>
    <ul className="space-y-2.5">
      {(
        [
          ['HbA1c', '5.1 %', 'Optimal', 52],
          ['Vitamin D', '24 ng/mL', 'Outlier', 18],
          ['LDL', '96 mg/dL', 'In range', 66],
        ] as [string, string, Verdict, number][]
      ).map(([name, value, verdict, pos], i) => (
        <li key={name} style={fadeUp(i)}>
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold">
              {name} <span className="font-normal text-hos-grey">{value}</span>
            </span>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${chip[verdict]}`}>{verdict}</span>
          </div>
          <div className="relative mt-1.5 h-1.5 rounded-full bg-hos-mist">
            <span className="absolute inset-y-0 left-[30%] right-[30%] rounded-full bg-hos-yellow" />
            <span
              className="absolute top-1/2 w-3 h-3 -mt-1.5 -ml-1.5 rounded-full bg-hos-black ring-2 ring-white"
              style={{ left: `${pos}%`, animation: `hos-fade-up 0.5s ease ${0.4 + i * 0.15}s both` }}
            />
          </div>
        </li>
      ))}
    </ul>
    <div className="mt-3 pt-3 border-t border-hos-hairline flex items-center gap-1.5 text-[11px] text-hos-grey" style={fadeUp(3)}>
      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
      Sent to the patient's app
    </div>
  </Shell>
);

export const IntakeBriefCard: React.FC = () => (
  <Shell title="Clinical Intake Brief" icon={<ClipboardList className="w-3.5 h-3.5" />}>
    <div className="text-[11px] text-hos-grey" style={fadeUp(0)}>
      New patient · 52 · history and 3 reports parsed
    </div>
    <div className="mt-2 text-xs font-bold" style={fadeUp(1)}>
      3 outliers flagged
    </div>
    <ul className="mt-2 space-y-1.5">
      {(
        [
          ['Vitamin D', '18 ng/mL', 'Low'],
          ['hs-CRP', '4.2 mg/L', 'High'],
          ['LDL', '142 mg/dL', 'High'],
        ] as [string, string, Verdict][]
      ).map(([n, v, verdict], i) => (
        <li key={n} className="flex items-center justify-between rounded-lg bg-hos-mist px-2.5 py-1.5 text-[11px]" style={fadeUp(i + 2)}>
          <span className="font-semibold">
            {n} <span className="font-normal text-hos-grey">{v}</span>
          </span>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${chip[verdict]}`}>{verdict}</span>
        </li>
      ))}
    </ul>
    <div className="mt-3 pt-3 border-t border-hos-hairline flex items-center gap-1.5 text-[11px] text-hos-grey" style={fadeUp(5)}>
      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
      Ready before the consult
    </div>
  </Shell>
);

export const FoodScanCard: React.FC = () => (
  <Shell title="Food Intelligence" icon={<Utensils className="w-3.5 h-3.5" />}>
    <div className="text-[11px] text-hos-grey" style={fadeUp(0)}>
      Lunch scanned · dal, rice, salad
    </div>
    <svg viewBox="0 0 260 90" className="mt-2 w-full h-20" aria-hidden="true">
      <line x1="0" y1="80" x2="260" y2="80" stroke="#E6E3DA" />
      <path
        d="M0 76 C 50 76, 70 18, 110 18 S 170 64, 260 70"
        fill="none"
        stroke="#0A0A0B"
        strokeWidth="2.5"
        strokeDasharray="400"
        style={{ animation: 'hos-draw 1.6s ease 0.3s both' }}
      />
      <path d="M0 76 C 50 76, 75 30, 112 30 S 172 66, 260 72" fill="none" stroke="#F5D97B" strokeWidth="2" strokeDasharray="4 4" />
    </svg>
    <div className="flex items-center gap-3 text-[10px] text-hos-grey" style={fadeUp(2)}>
      <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-hos-black" />Predicted</span>
      <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-hos-yellow" />Checked after the meal</span>
    </div>
  </Shell>
);

/** Ticking call timer so the call reads as in progress. */
const CallTimer: React.FC = () => {
  const [s, setS] = useState(42);
  useEffect(() => {
    const id = window.setInterval(() => setS((x) => x + 1), 1000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{`${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`}</span>;
};

export const VoiceCallCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <Shell title="AI Voice Agent" icon={<PhoneCall className="w-3.5 h-3.5" />} dark status="On a call" className={className}>
    <div className="flex items-center justify-between text-[11px] text-slate-300" style={fadeUp(0)}>
      <span>Inbound call · Hindi</span>
      <CallTimer />
    </div>
    <Waveform className="mt-3" height={32} />
    <div className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-[11px] leading-relaxed" style={fadeUp(1)}>
      Cardiology OPD has a slot on Tuesday at 10:30. Shall I book it for you?
    </div>
    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 text-emerald-300 px-2.5 py-1 text-[10px] font-bold" style={fadeUp(3)}>
      <CheckCircle2 className="w-3 h-3" />
      Visit booked
    </div>
  </Shell>
);

export const CohortRiskCard: React.FC = () => (
  <Shell title="B2B Analytics Dashboard" icon={<BarChart3 className="w-3.5 h-3.5" />}>
    <div className="text-[11px] text-hos-grey" style={fadeUp(0)}>
      Cohort risk · all members
    </div>
    <div className="mt-3 flex items-end gap-3 h-24">
      {(
        [
          ['Low', 78, 'bg-hos-mist border border-hos-hairline'],
          ['Moderate', 46, 'bg-hos-yellow'],
          ['High', 22, 'bg-hos-navy'],
        ] as [string, number, string][]
      ).map(([label, h, color], i) => (
        <div key={label} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
          <span className={`w-full rounded-md origin-bottom ${color}`} style={{ height: `${h}%`, animation: `hos-rise 0.9s cubic-bezier(0.2,0.7,0.2,1) ${0.2 + i * 0.15}s both` }} />
          <span className="text-[10px] text-hos-grey">{label}</span>
        </div>
      ))}
    </div>
  </Shell>
);
