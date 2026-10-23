import React from 'react';
import { ArrowUpRight, CalendarDays, ChevronRight, FileText, Home, MessageCircle } from 'lucide-react';
import { cn } from '../../lib/cn';
import { SampleTag, ScaledFrame } from './ScaledFrame';

/* A Studio build: a patient app in the client's own brand. Sample brand and data. */

const BRAND = '#1E6B5A';
const INK = '#15130F';

const StatusBar: React.FC = () => (
  <div className="relative flex h-[46px] items-center justify-between px-[26px] pt-1 text-[12.5px] font-semibold tracking-[-0.01em]" style={{ color: INK }}>
    <span className="tabular-nums">9:41</span>
    <span className="absolute left-1/2 top-[10px] h-[25px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
    <span className="flex items-center gap-[5px]">
      <svg viewBox="0 0 17 11" className="h-[10px] w-[16px]" fill="currentColor">
        <rect x="0" y="7" width="3" height="4" rx="0.8" />
        <rect x="4.6" y="5" width="3" height="6" rx="0.8" />
        <rect x="9.2" y="2.6" width="3" height="8.4" rx="0.8" />
        <rect x="13.8" y="0" width="3" height="11" rx="0.8" />
      </svg>
      <svg viewBox="0 0 16 12" className="h-[10px] w-[14px]" fill="currentColor">
        <path d="M8 2.3c2.3 0 4.4.9 5.9 2.4l1.2-1.2C13.2 1.6 10.7.6 8 .6S2.8 1.6.9 3.5l1.2 1.2C3.6 3.2 5.7 2.3 8 2.3Zm0 3.3c1.4 0 2.6.5 3.5 1.4l1.2-1.2C11.4 4.6 9.8 3.9 8 3.9s-3.4.7-4.7 1.9L4.5 7C5.4 6.1 6.6 5.6 8 5.6Zm0 3.3c.6 0 1.1.2 1.5.6L8 11.1 6.5 9.5c.4-.4.9-.6 1.5-.6Z" />
      </svg>
      <span className="relative flex h-[11px] w-[23px] items-center rounded-[3.5px] border p-[1.5px]" style={{ borderColor: 'rgba(21,19,15,0.38)' }}>
        <span className="h-full w-[78%] rounded-[1.5px] bg-current" />
        <span className="absolute -right-[3px] top-1/2 h-[4px] w-[1.5px] -translate-y-1/2 rounded-r-sm bg-current opacity-40" />
      </span>
    </span>
  </div>
);

/* Score ring for the report hero */
const Ring: React.FC<{ value: number }> = ({ value }) => {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 72 72" className="h-[72px] w-[72px] -rotate-90">
      <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="5" />
      <circle cx="36" cy="36" r={r} fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeDasharray={`${c * value} ${c}`} />
    </svg>
  );
};

/* A marker with its reference range: low, healthy and high bands, and where this result sits */
const Marker: React.FC<{ name: string; value: string; unit: string; verdict: 'High' | 'Low'; at: number }> = ({ name, value, unit, verdict, at }) => (
  <div className="py-3">
    <div className="flex items-baseline justify-between">
      <p className="text-[13px] tracking-[-0.01em]">{name}</p>
      <p className="text-[13px] tabular-nums tracking-[-0.01em]">
        {value} <span className="text-[10px] text-[#15130F]/40">{unit}</span>
      </p>
    </div>
    <div className="mt-2 flex items-center gap-2.5">
      <div className="relative flex h-[5px] flex-1 gap-[3px]">
        <span className="flex-[1] rounded-full bg-[#C98A1B]/25" />
        <span className="flex-[2] rounded-full bg-[#1E6B5A]/20" />
        <span className="flex-[1] rounded-full bg-[#C98A1B]/25" />
        <span className="absolute top-1/2 h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2.5px] border-white bg-[#B7791F] shadow-[0_1px_4px_rgba(0,0,0,0.25)]" style={{ left: `${at * 100}%` }} />
      </div>
      <span className="w-[34px] text-right text-[10.5px] font-medium text-[#9A6412]">{verdict}</span>
    </div>
  </div>
);

export const PhoneApp: React.FC = () => (
  <div className="relative h-[620px] w-[300px]">
    {/* Side buttons */}
    <span className="absolute -left-[2px] top-[112px] h-[24px] w-[3px] rounded-l-[2px] bg-[#2b2a26]" />
    <span className="absolute -left-[2px] top-[156px] h-[44px] w-[3px] rounded-l-[2px] bg-[#2b2a26]" />
    <span className="absolute -left-[2px] top-[208px] h-[44px] w-[3px] rounded-l-[2px] bg-[#2b2a26]" />
    <span className="absolute -right-[2px] top-[170px] h-[70px] w-[3px] rounded-r-[2px] bg-[#2b2a26]" />

    {/* Titanium band, black bezel, screen */}
    <div className="relative h-full w-full rounded-[52px] bg-[linear-gradient(150deg,#6d6a63_0%,#2c2b27_22%,#1b1a17_55%,#3d3b36_80%,#76736b_100%)] p-[2.5px] shadow-[0_60px_110px_-40px_rgba(0,0,0,0.75),0_20px_40px_-20px_rgba(0,0,0,0.4)]">
      <div className="h-full w-full rounded-[49.5px] bg-black p-[8px]">
        <div className="relative h-full w-full overflow-hidden rounded-[42px] bg-[#F3F0E9] font-sans text-left" style={{ color: INK }}>
          <StatusBar />

          <div className="px-[18px]">
            {/* Brand bar */}
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid h-[26px] w-[26px] place-items-center rounded-[8px]" style={{ background: BRAND }}>
                  <svg viewBox="0 0 16 16" className="h-[13px] w-[13px]" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M8 3v10M3 8h10" />
                  </svg>
                </span>
                <span className="text-[13.5px] font-semibold tracking-[-0.02em]">Your Clinic</span>
              </div>
              <SampleTag className="border-[#15130F]/10 bg-transparent px-1.5 text-[8.5px] text-[#15130F]/45">Sample brand</SampleTag>
            </div>

            <p className="mt-5 text-[11.5px] text-[#15130F]/45">Thursday, 24 October</p>
            <p className="mt-0.5 text-[24px] leading-[1.1] tracking-[-0.035em]">Good morning, Riya</p>

            {/* Report hero */}
            <div className="relative mt-4 overflow-hidden rounded-[24px] p-4 text-white" style={{ background: `radial-gradient(120% 100% at 100% 0%, #3E9C84 0%, ${BRAND} 48%, #134438 100%)` }}>
              <div aria-hidden="true" className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-white/10" />
              <div aria-hidden="true" className="absolute -right-4 -top-4 h-24 w-24 rounded-full border border-white/10" />
              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <p className="flex items-center gap-1.5 text-[11px] text-white/70">
                    <FileText className="h-3 w-3" strokeWidth={2} /> Report · 23 Oct
                  </p>
                  <p className="mt-2.5 text-[15px] leading-[1.3] tracking-[-0.015em]">26 of 28 results look healthy.</p>
                  <p className="mt-1 text-[11.5px] leading-snug text-white/65">Two are worth a chat with your doctor.</p>
                </div>
                <div className="relative shrink-0">
                  <Ring value={0.93} />
                  <span className="absolute inset-0 grid place-items-center text-[17px] font-medium tabular-nums tracking-[-0.03em]">93</span>
                </div>
              </div>
              <div className="relative mt-4 flex items-center justify-between border-t border-white/15 pt-3">
                <span className="text-[12px] font-medium">Read it in plain words</span>
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white" style={{ color: BRAND }}>
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
              </div>
            </div>

            {/* Worth a chat */}
            <div className="mt-5 flex items-baseline justify-between">
              <p className="text-[13px] font-semibold tracking-[-0.015em]">Worth a chat</p>
              <p className="text-[11px] text-[#15130F]/40">2 of 28</p>
            </div>
            <div className="mt-2 divide-y divide-[#15130F]/[0.06] rounded-[18px] bg-white px-3.5 shadow-[0_1px_2px_rgba(21,19,15,0.04)]">
              <Marker name="Ferritin" value="412" unit="ng/mL" verdict="High" at={0.86} />
              <Marker name="Vitamin D" value="18" unit="ng/mL" verdict="Low" at={0.14} />
            </div>

            {/* Up next */}
            <div className="mt-2.5 flex items-center gap-3 rounded-[18px] bg-white p-2.5 pr-3.5 shadow-[0_1px_2px_rgba(21,19,15,0.04)]">
              <span className="flex h-[38px] w-[38px] shrink-0 flex-col items-center justify-center rounded-[11px]" style={{ background: `${BRAND}14`, color: BRAND }}>
                <span className="text-[8px] font-semibold uppercase leading-none tracking-[0.08em]">Fri</span>
                <span className="mt-0.5 text-[15px] font-medium leading-none tabular-nums">25</span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] tracking-[-0.01em]">Re-test at home</p>
                <p className="text-[10.5px] text-[#15130F]/45">Tomorrow, 7–9 am</p>
              </div>
              <ChevronRight className="h-4 w-4 text-[#15130F]/30" />
            </div>
          </div>

          {/* Floating tab bar over the content */}
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[110px] bg-gradient-to-t from-[#F3F0E9] via-[#F3F0E9]/80 to-transparent" />
          <div className="absolute inset-x-[16px] bottom-[24px] flex h-[54px] items-center justify-between rounded-full border border-white/80 bg-white/75 px-[7px] shadow-[0_10px_30px_-10px_rgba(21,19,15,0.25)] backdrop-blur-xl">
            {[
              { Icon: Home, label: 'Home' },
              { Icon: FileText, label: 'Reports' },
              { Icon: CalendarDays, label: 'Visits' },
              { Icon: MessageCircle, label: 'Ask' },
            ].map(({ Icon, label }, i) => (
              <span key={label} className={cn('flex h-[40px] items-center gap-1.5 rounded-full', i === 0 ? 'px-3.5 text-white' : 'w-[48px] justify-center text-[#15130F]/45')} style={i === 0 ? { background: BRAND } : undefined}>
                <Icon className="h-[17px] w-[17px]" strokeWidth={1.9} />
                {i === 0 && <span className="text-[11.5px] font-medium">{label}</span>}
              </span>
            ))}
          </div>
          <span className="absolute bottom-[8px] left-1/2 h-[4px] w-[104px] -translate-x-1/2 rounded-full bg-[#15130F]" />
        </div>
      </div>
    </div>
  </div>
);

export const BrandedApp: React.FC<{ className?: string }> = ({ className }) => (
  <ScaledFrame width={300} height={620} className={className} label="Sample Studio build: a patient app in a clinic's own brand, with a plain-language report, results worth a chat with the doctor, and a home re-test booking.">
    <PhoneApp />
  </ScaledFrame>
);
