import React from 'react';
import { cn } from '../../lib/cn';
import { Arrow } from '../ui/primitives';
import { ScaledFrame } from './ScaledFrame';

/* A Studio build: a patient app in the client's own brand. Sample brands and data. */

export type Brand = {
  id: string;
  label: string;
  name: string;
  domain: string;
  color: string;
  paper: string;
  serif: boolean;
  radius: number;
};

export const brands: Brand[] = [
  { id: 'clinic', label: 'Your clinic', name: 'Your Clinic', domain: 'yourclinic', color: '#2F5D50', paper: '#F4F0E8', serif: true, radius: 999 },
  { id: 'lab', label: 'Your lab', name: 'Your Lab', domain: 'yourlab', color: '#2A4A9A', paper: '#F3F4F7', serif: false, radius: 10 },
  { id: 'app', label: 'Your app', name: 'Your App', domain: 'yourapp', color: '#A9512C', paper: '#FAF4EE', serif: false, radius: 18 },
];

export const INK = '#15130F';

/** The brand's display face: a serif for the clinic, tight sans for the others. */
export const display = (b: Brand) => (b.serif ? 'font-serif tracking-[-0.01em]' : 'font-sans tracking-[-0.04em]');

export const BrandMark: React.FC<{ brand: Brand; size?: number }> = ({ brand, size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
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

/* 28 results as 28 ticks; the two worth a chat stand out in the brand colour */
const FLAGGED = [8, 21];

export const PhoneApp: React.FC<{ brand?: Brand }> = ({ brand = brands[0] }) => (
  <div className="relative h-[620px] w-[300px] rounded-[50px] bg-[#0E0D0B] p-[9px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.09),0_50px_90px_-40px_rgba(21,19,15,0.55),0_18px_36px_-24px_rgba(21,19,15,0.4)]">
    <div className="relative h-full w-full overflow-hidden rounded-[41px] font-sans text-left" style={{ background: brand.paper, color: INK }}>
      {/* Status bar */}
      <div className="flex h-[46px] items-center justify-between px-[28px] text-[12px] font-semibold">
        <span className="tabular-nums">9:41</span>
        <span className="absolute left-1/2 top-[11px] h-[24px] w-[80px] -translate-x-1/2 rounded-full bg-black" />
        <span className="flex items-center gap-[5px]">
          <svg viewBox="0 0 17 11" className="h-[9px] w-[15px]" fill="currentColor">
            <rect x="0" y="7" width="3" height="4" rx="0.8" />
            <rect x="4.6" y="5" width="3" height="6" rx="0.8" />
            <rect x="9.2" y="2.6" width="3" height="8.4" rx="0.8" />
            <rect x="13.8" y="0" width="3" height="11" rx="0.8" />
          </svg>
          <span className="flex h-[10px] w-[21px] items-center rounded-[3px] border p-[1.5px]" style={{ borderColor: 'rgba(21,19,15,0.35)' }}>
            <span className="h-full w-[75%] rounded-[1px] bg-current" />
          </span>
        </span>
      </div>

      <div className="px-[24px] pt-[12px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrandMark brand={brand} size={22} />
            <span className={cn(display(brand), brand.serif ? 'text-[19px]' : 'text-[14.5px] font-semibold tracking-[-0.025em]')}>{brand.name}</span>
          </div>
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#15130F]/35">Sample brand</span>
        </div>

        <p className="mt-[30px] text-[12px] text-[#15130F]/50">Good morning, Riya</p>
        <p className={cn('mt-1 leading-[1.02]', display(brand), brand.serif ? 'text-[36px]' : 'text-[31px]')}>Your report is ready.</p>

        <div className="mt-[26px]">
          <div className="flex items-end justify-between">
            <p className={cn('leading-none', display(brand), brand.serif ? 'text-[58px]' : 'text-[52px] font-light')}>
              26<span className="ml-1 font-sans text-[13px] tracking-normal text-[#15130F]/45">of 28 in range</span>
            </p>
            <p className="pb-1 text-[11px] text-[#15130F]/45">23 Oct</p>
          </div>
          <div className="mt-3.5 flex h-[22px] gap-[3px]">
            {Array.from({ length: 28 }, (_, i) => (
              <span key={i} className="flex-1 rounded-full" style={{ background: FLAGGED.includes(i) ? brand.color : 'rgba(21,19,15,0.11)' }} />
            ))}
          </div>
        </div>

        <p className="mt-[26px] text-[11px] text-[#15130F]/45">Worth a chat with your doctor</p>
        <ul className="mt-2">
          {[
            { name: 'Ferritin', value: '412', unit: 'ng/mL', verdict: 'High' },
            { name: 'Vitamin D', value: '18', unit: 'ng/mL', verdict: 'Low' },
          ].map((m) => (
            <li key={m.name} className="flex items-baseline justify-between border-t border-[#15130F]/10 py-[11px] text-[13.5px]">
              <span>{m.name}</span>
              <span className="tabular-nums">
                {m.value} <span className="text-[10px] text-[#15130F]/40">{m.unit}</span>
                <span className="ml-3 inline-block w-[30px] text-right text-[11.5px] font-medium" style={{ color: brand.color }}>
                  {m.verdict}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-[20px] flex h-[46px] items-center justify-center gap-2 text-[13.5px] font-medium text-white" style={{ background: brand.color, borderRadius: Math.min(brand.radius, 23) }}>
          Read it in plain words <Arrow className="h-3.5 w-3.5" />
        </div>

        <div className="mt-[22px] flex items-center justify-between border-t border-[#15130F]/10 pt-[14px] text-[12px]">
          <span className="text-[#15130F]/50">Next</span>
          <span>Home re-test · Fri, 7–9 am</span>
        </div>
      </div>

      <span className="absolute bottom-[8px] left-1/2 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-[#15130F]" />
    </div>
  </div>
);

export const BrandedApp: React.FC<{ className?: string; brand?: Brand }> = ({ className, brand }) => (
  <ScaledFrame width={300} height={620} className={className} label="Sample Studio build: a patient app in a clinic's own brand, with a plain-language report and the two results worth a chat with the doctor.">
    <PhoneApp brand={brand} />
  </ScaledFrame>
);
