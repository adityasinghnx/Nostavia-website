import React from 'react';
import { cn } from '../../lib/cn';
import { SampleTag, ScaledFrame } from './ScaledFrame';

/* A Human OS report: every marker explained in plain language, under the lab's own brand. Sample data. */

const markers = [
  { name: 'HbA1c', value: '5.4', unit: '%', verdict: 'In range', bar: 0.42 },
  { name: 'LDL cholesterol', value: '96', unit: 'mg/dL', verdict: 'Optimal', bar: 0.3 },
  { name: 'Vitamin D', value: '18', unit: 'ng/mL', verdict: 'Low', bar: 0.18 },
  { name: 'Ferritin', value: '412', unit: 'ng/mL', verdict: 'High', bar: 0.86 },
];

const verdictTone: Record<string, string> = {
  Optimal: 'text-[#9FD8A8] border-[#9FD8A8]/30',
  'In range': 'text-[#F2EDE3]/65 border-white/[0.12]',
  Low: 'text-[#F2D27A] border-[#F2D27A]/35',
  High: 'text-[#F2D27A] border-[#F2D27A]/35',
};

export const ReportCard: React.FC<{ className?: string }> = ({ className }) => (
  <ScaledFrame width={520} height={548} className={className} label="Sample Human OS report: biological age, heart risk and four lab markers, each explained in plain language.">
    <div className="h-full w-full rounded-[20px] border border-white/[0.09] bg-[#121010] p-6 font-sans text-left shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#1FB5C9] text-[11px] font-semibold text-[#0B0A08]">YL</span>
          <div>
            <p className="text-[13px] text-[#F2EDE3]">Your Lab</p>
            <p className="text-[10.5px] text-[#F2EDE3]/40">Health report · 23 Oct</p>
          </div>
        </div>
        <SampleTag />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
          <p className="text-[11px] text-[#F2EDE3]/45">Biological age</p>
          <p className="mt-2 text-[30px] leading-none tracking-[-0.03em] text-[#F2EDE3]">
            34 <span className="text-[13px] tracking-normal text-[#F2EDE3]/40">vs 38 real age</span>
          </p>
          <div className="mt-3 h-1.5 rounded-full bg-white/[0.06]">
            <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-[#9FD8A8] to-[#F2D27A]" />
          </div>
        </div>
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
          <p className="text-[11px] text-[#F2EDE3]/45">Heart and metabolic risk</p>
          <p className="mt-2 text-[30px] leading-none tracking-[-0.03em] text-[#9FD8A8]">Low</p>
          <p className="mt-3 text-[11px] text-[#F2EDE3]/45">Driven by LDL, HbA1c and sleep</p>
        </div>
      </div>

      <ul className="mt-4 divide-y divide-white/[0.06]">
        {markers.map((m) => (
          <li key={m.name} className="grid grid-cols-[1fr_92px_64px] items-center gap-3 py-2.5">
            <div>
              <p className="text-[13px] text-[#F2EDE3]/85">{m.name}</p>
              <div className="mt-1.5 h-1 w-full rounded-full bg-white/[0.06]">
                <div className={cn('h-full rounded-full', m.verdict === 'High' || m.verdict === 'Low' ? 'bg-[#F2D27A]' : 'bg-[#F2EDE3]/35')} style={{ width: `${m.bar * 100}%` }} />
              </div>
            </div>
            <p className="text-right text-[13px] tabular-nums text-[#F2EDE3]">
              {m.value} <span className="text-[10.5px] text-[#F2EDE3]/40">{m.unit}</span>
            </p>
            <span className={cn('rounded-full border py-0.5 text-center text-[10.5px]', verdictTone[m.verdict])}>{m.verdict}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 rounded-2xl bg-[#F2D27A]/[0.07] p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#F2D27A]/80">In plain words</p>
        <p className="mt-2 text-[13px] leading-relaxed text-[#F2EDE3]/85">Most of your results are in a healthy range. Ferritin is higher than usual and vitamin D is low, so your doctor will go through both with you.</p>
      </div>
    </div>
  </ScaledFrame>
);
