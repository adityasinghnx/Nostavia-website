import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../lib/cn';
import { PhoneApp } from './BrandedApp';
import { SampleTag, ScaledFrame } from './ScaledFrame';

/* Two Studio builds for one client: a doctor portal and the patient app, in the same brand. Sample brand and data. */

const BRAND = '#2E8B76';

const patients = [
  { id: 'Patient 2207', time: '10:30', note: 'Brief ready', flag: true },
  { id: 'Patient 3390', time: '10:50', note: 'Brief ready', flag: false },
  { id: 'Patient 4821', time: '11:10', note: 'Brief ready', flag: true },
  { id: 'Patient 1186', time: '11:30', note: 'Waiting for reports', flag: false },
];

const DoctorPortal: React.FC = () => (
  <div className="h-[520px] w-[760px] overflow-hidden rounded-[18px] border border-[#16140F]/10 bg-white font-sans text-left text-[#16140F] shadow-[0_50px_100px_-50px_rgba(22,20,15,0.45)]">
    <div className="flex h-10 items-center gap-3 border-b border-[#16140F]/[0.07] bg-[#F6F3EC] px-4">
      <span className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#16140F]/15" />
        ))}
      </span>
      <span className="mx-auto rounded-md bg-white px-10 py-1 text-[11px] text-[#16140F]/45">doctors.yourclinic.example</span>
    </div>
    <div className="flex h-[calc(100%-2.5rem)]">
      <aside className="w-[190px] shrink-0 border-r border-[#16140F]/[0.07] p-4">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-semibold text-white" style={{ background: BRAND }}>
            YC
          </span>
          <span className="text-[13px] font-semibold">Your Clinic</span>
        </div>
        <ul className="mt-6 flex flex-col gap-1 text-[12.5px]">
          {['Today', 'Patients', 'Reports', 'Follow-ups', 'Messages'].map((n, i) => (
            <li key={n} className={cn('rounded-lg px-2.5 py-1.5', i === 0 ? 'font-medium text-white' : 'text-[#16140F]/55')} style={i === 0 ? { background: BRAND } : undefined}>
              {n}
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex-1 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-[#16140F]/45">Thursday clinic</p>
            <p className="text-[19px] tracking-[-0.02em]">Today’s consultations</p>
          </div>
          <div className="flex items-center gap-2">
            <SampleTag className="border-[#16140F]/20 bg-[#16140F]/5 text-[#16140F]/60">Sample brand</SampleTag>
            <span className="flex items-center gap-2 rounded-lg border border-[#16140F]/10 px-3 py-1.5 text-[11px] text-[#16140F]/40">
              <Search className="h-3 w-3" /> Search
            </span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-[1fr_1.05fr] gap-4">
          <ul className="flex flex-col gap-2">
            {patients.map((p, i) => (
              <li key={p.id} className={cn('flex items-center justify-between rounded-xl border px-3 py-2.5', i === 0 ? 'border-[#16140F]/20 bg-[#F6F3EC]' : 'border-[#16140F]/[0.07]')}>
                <div>
                  <p className="text-[12.5px]">{p.id}</p>
                  <p className="text-[10.5px] text-[#16140F]/45">{p.time}</p>
                </div>
                <span className={cn('rounded-full px-2 py-0.5 text-[10px]', p.flag ? 'bg-[#F2D27A]/40 text-[#6B4E0E]' : 'bg-[#16140F]/[0.05] text-[#16140F]/55')}>{p.flag ? 'Brief · 1 flag' : p.note}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-xl border border-[#16140F]/[0.08] p-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#16140F]/45">Pre-consult brief · Patient 2207</p>
            <ul className="mt-3 flex flex-col gap-2.5 text-[12px] leading-snug">
              <li>
                <span className="text-[#16140F]/45">Visit for:</span> follow-up on fatigue
              </li>
              <li>
                <span className="text-[#16140F]/45">New since last visit:</span> lipid and iron panel
              </li>
              <li className="rounded-lg bg-[#F2D27A]/25 px-2.5 py-2">
                <span className="font-medium">Flag:</span> ferritin above range, for review
              </li>
              <li>
                <span className="text-[#16140F]/45">Medicines on record:</span> 2, no changes
              </li>
            </ul>
            <p className="mt-4 text-[10.5px] text-[#16140F]/40">Prepared before the visit. The doctor decides.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const DeviceStage: React.FC<{ className?: string }> = ({ className }) => (
  <ScaledFrame width={860} height={640} className={className} label="Sample Studio builds for one clinic: a doctor portal with pre-consultation briefs, and the patient app, in the same brand.">
    <div className="relative h-full w-full">
      <div className="absolute right-0 top-0">
        <DoctorPortal />
      </div>
      <div className="absolute bottom-0 left-0 origin-bottom-left scale-[0.92]">
        <PhoneApp />
      </div>
    </div>
  </ScaledFrame>
);
