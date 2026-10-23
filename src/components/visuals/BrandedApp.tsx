import React from 'react';
import { Bell, CalendarDays, FileText, Home, MessageCircle } from 'lucide-react';
import { cn } from '../../lib/cn';
import { ScaledFrame } from './ScaledFrame';

/* A Studio build: a patient app in the client's own brand, drawn at real iPhone size (390 × 844 pt). Sample brands and data. */

export type Brand = {
  id: string;
  label: string;
  name: string;
  domain: string;
  color: string;
  /** A lighter tone of the brand colour, for light on a dark stage */
  glow: string;
  paper: string;
  serif: boolean;
  radius: number;
};

export const brands: Brand[] = [
  { id: 'clinic', label: 'Your clinic', name: 'Your Clinic', domain: 'yourclinic', color: '#2F5D50', glow: '#6FA893', paper: '#F5F2EC', serif: true, radius: 999 },
  { id: 'lab', label: 'Your lab', name: 'Your Lab', domain: 'yourlab', color: '#2A4A9A', glow: '#7D9BEA', paper: '#F4F5F8', serif: false, radius: 10 },
  { id: 'app', label: 'Your app', name: 'Your App', domain: 'yourapp', color: '#A9512C', glow: '#E59A72', paper: '#F9F4EF', serif: false, radius: 16 },
];

export const INK = '#15130F';
export const AMBER = '#A0660F';

/** The brand's display face: a serif for the clinic, tight sans for the others. */
export const display = (b: Brand) => (b.serif ? 'font-serif font-normal tracking-[-0.01em]' : 'font-sans font-semibold tracking-[-0.03em]');

export const BrandMark: React.FC<{ brand: Brand; size?: number }> = ({ brand, size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className="shrink-0">
    {brand.id === 'clinic' && (
      <>
        <circle cx="12" cy="12" r="12" fill={brand.color} />
        <path d="M12 7v10M7 12h10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </>
    )}
    {brand.id === 'lab' && (
      <>
        <rect width="24" height="24" rx="6" fill={brand.color} />
        <path d="M12 6.5c2.6 3.2 3.9 5.4 3.9 7.1a3.9 3.9 0 0 1-7.8 0c0-1.7 1.3-3.9 3.9-7.1Z" fill="#fff" />
      </>
    )}
    {brand.id === 'app' && (
      <>
        <rect width="24" height="24" rx="9" fill={brand.color} />
        <circle cx="12" cy="12" r="4.6" fill="none" stroke="#fff" strokeWidth="2" />
      </>
    )}
  </svg>
);

/** A result against its reference range: low, healthy, high, and a marker where it sits. */
export const RangeBar: React.FC<{ at: number; flag: boolean; brand: Brand; height?: number }> = ({ at, flag, brand, height = 6 }) => (
  <div className="relative flex gap-[3px]" style={{ height }}>
    <span className="flex-[1] rounded-full bg-[#15130F]/[0.08]" />
    <span className="flex-[2] rounded-full" style={{ background: `${brand.color}2E` }} />
    <span className="flex-[1] rounded-full bg-[#15130F]/[0.08]" />
    <span
      className="absolute top-1/2 rounded-full border-2 border-white shadow-[0_1px_3px_rgba(21,19,15,0.3)]"
      style={{ left: `${at * 100}%`, width: height + 8, height: height + 8, transform: 'translate(-50%,-50%)', background: flag ? AMBER : brand.color }}
    />
  </div>
);

const markers = [
  { name: 'Ferritin', note: 'Iron stores', value: '412', unit: 'ng/mL', verdict: 'High', at: 0.87, flag: true },
  { name: 'Vitamin D', note: 'Bones and immunity', value: '18', unit: 'ng/mL', verdict: 'Low', at: 0.12, flag: true },
  { name: 'HbA1c', note: 'Blood sugar, last 3 months', value: '5.4', unit: '%', verdict: 'In range', at: 0.46, flag: false },
];

/* 28 results as 28 ticks; the two worth a chat stand out */
const FLAGGED = [8, 21];

export const PHONE = { w: 414, h: 868 };

export const PhoneApp: React.FC<{ brand?: Brand }> = ({ brand = brands[0] }) => (
  <div
    className="relative rounded-[66px] bg-[#1B1A18] p-[12px] shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.16),inset_0_0_0_6px_#0A0908,0_40px_80px_-30px_rgba(0,0,0,0.6)]"
    style={{ width: PHONE.w, height: PHONE.h }}
  >
    <div className="relative h-full w-full overflow-hidden rounded-[54px] font-sans text-left" style={{ background: brand.paper, color: INK }}>
      {/* Status bar */}
      <div className="relative flex h-[54px] items-center justify-between px-[36px] pt-[6px] text-[16px] font-semibold">
        <span className="tabular-nums">9:41</span>
        <span className="absolute left-1/2 top-[11px] h-[36px] w-[122px] -translate-x-1/2 rounded-full bg-black" />
        <span className="flex items-center gap-[6px]">
          <svg viewBox="0 0 17 11" className="h-[11px] w-[17px]" fill="currentColor">
            <rect x="0" y="7" width="3" height="4" rx="0.8" />
            <rect x="4.6" y="5" width="3" height="6" rx="0.8" />
            <rect x="9.2" y="2.6" width="3" height="8.4" rx="0.8" />
            <rect x="13.8" y="0" width="3" height="11" rx="0.8" />
          </svg>
          <svg viewBox="0 0 16 12" className="h-[11px] w-[15px]" fill="currentColor">
            <path d="M8 2.3c2.3 0 4.4.9 5.9 2.4l1.2-1.2C13.2 1.6 10.7.6 8 .6S2.8 1.6.9 3.5l1.2 1.2C3.6 3.2 5.7 2.3 8 2.3Zm0 3.3c1.4 0 2.6.5 3.5 1.4l1.2-1.2C11.4 4.6 9.8 3.9 8 3.9s-3.4.7-4.7 1.9L4.5 7C5.4 6.1 6.6 5.6 8 5.6Zm0 3.3c.6 0 1.1.2 1.5.6L8 11.1 6.5 9.5c.4-.4.9-.6 1.5-.6Z" />
          </svg>
          <span className="flex h-[12px] w-[25px] items-center rounded-[4px] border p-[2px]" style={{ borderColor: 'rgba(21,19,15,0.35)' }}>
            <span className="h-full w-[76%] rounded-[1.5px] bg-current" />
          </span>
        </span>
      </div>

      <div className="px-5">
        {/* Brand bar */}
        <div className="mt-[6px] flex h-[44px] items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BrandMark brand={brand} size={28} />
            <span className={cn(display(brand), brand.serif ? 'text-[23px]' : 'text-[17px]')}>{brand.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="h-[21px] w-[21px] text-[#15130F]/55" strokeWidth={1.8} />
            <span className="grid h-[34px] w-[34px] place-items-center rounded-full text-[14px] font-semibold" style={{ background: `${brand.color}1C`, color: brand.color }}>
              R
            </span>
          </div>
        </div>

        <p className={cn('mt-3 leading-[1.05]', display(brand), brand.serif ? 'text-[40px]' : 'text-[34px]')}>Your results</p>
        <p className="mt-1 text-[15px] text-[#15130F]/50">Health report · 23 October</p>

        {/* Summary */}
        <div className="mt-5 rounded-[22px] bg-white p-5 shadow-[0_1px_2px_rgba(21,19,15,0.05)]">
          <p className="flex items-baseline gap-1.5">
            <span className={cn('tabular-nums leading-none', display(brand), brand.serif ? 'text-[38px]' : 'text-[30px]')}>26 of 28</span>
            <span className="text-[15px] text-[#15130F]/50">in a healthy range</span>
          </p>
          <div className="mt-4 flex h-[30px] gap-[4px]">
            {Array.from({ length: 28 }, (_, i) => (
              <span key={i} className="flex-1 rounded-full" style={{ background: FLAGGED.includes(i) ? AMBER : `${brand.color}38` }} />
            ))}
          </div>
          <p className="mt-4 text-[15px] leading-snug text-[#15130F]/70">
            <span className="font-medium" style={{ color: AMBER }}>
              2 results
            </span>{' '}
            are worth a chat with your doctor.
          </p>
        </div>

        {/* Results */}
        <div className="mt-7 flex items-baseline justify-between">
          <p className="text-[20px] font-semibold tracking-[-0.02em]">Worth a look</p>
          <p className="text-[15px]" style={{ color: brand.color }}>
            See all 28
          </p>
        </div>
        <ul className="mt-3 divide-y divide-[#15130F]/[0.07] rounded-[22px] bg-white px-4 shadow-[0_1px_2px_rgba(21,19,15,0.05)]">
          {markers.map((m) => (
            <li key={m.name} className="py-[14px]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[17px] tracking-[-0.01em]">{m.name}</p>
                  <p className="mt-0.5 text-[13px] text-[#15130F]/45">{m.note}</p>
                </div>
                <div className="text-right">
                  <p className="text-[17px] tabular-nums tracking-[-0.01em]">
                    {m.value} <span className="text-[12px] text-[#15130F]/40">{m.unit}</span>
                  </p>
                  <p className="mt-0.5 text-[13px] font-medium" style={{ color: m.flag ? AMBER : brand.color }}>
                    {m.verdict}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <RangeBar at={m.at} flag={m.flag} brand={brand} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab bar */}
      <div className="absolute inset-x-0 bottom-0 grid h-[84px] grid-cols-4 border-t border-[#15130F]/[0.06] bg-white/90 px-4 pt-2 backdrop-blur-xl">
        {[
          { Icon: Home, label: 'Today' },
          { Icon: FileText, label: 'Results' },
          { Icon: CalendarDays, label: 'Visits' },
          { Icon: MessageCircle, label: 'Ask' },
        ].map(({ Icon, label }, i) => (
          <span key={label} className="flex flex-col items-center gap-1 text-[10.5px] font-medium" style={{ color: i === 1 ? brand.color : 'rgba(21,19,15,0.4)' }}>
            <Icon className="h-[24px] w-[24px]" strokeWidth={i === 1 ? 2 : 1.7} />
            {label}
          </span>
        ))}
      </div>
      <span className="absolute bottom-[8px] left-1/2 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-[#15130F]" />
    </div>
  </div>
);

export const BrandedApp: React.FC<{ className?: string; brand?: Brand }> = ({ className, brand }) => (
  <ScaledFrame width={PHONE.w} height={PHONE.h} className={className} label="Sample Studio build: a patient app in a clinic's own brand, with a plain-language report and the results worth a chat with the doctor.">
    <PhoneApp brand={brand} />
  </ScaledFrame>
);
