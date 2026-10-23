import React from 'react';
import { Calendar, ChevronRight, FileText, Home, MessageCircle, User } from 'lucide-react';
import { SampleTag, ScaledFrame } from './ScaledFrame';

/* A Studio build: a patient app in the client's own brand. Sample brand and data. */

const BRAND = '#2E8B76';

export const PhoneApp: React.FC = () => (
  <div className="relative h-[620px] w-[300px] rounded-[46px] border border-white/15 bg-[#0B0A08] p-[10px] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.95)]">
    <div className="relative h-full w-full overflow-hidden rounded-[37px] bg-[#F6F3EC] font-sans text-left text-[#16140F]">
      <div className="flex items-center justify-between px-6 pt-3.5 text-[11px] font-medium">
        <span>9:41</span>
        <span className="h-[22px] w-[86px] rounded-full bg-[#0B0A08]" />
        <span>5G</span>
      </div>
      <div className="px-5 pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full text-[11px] font-semibold text-white" style={{ background: BRAND }}>
              YC
            </span>
            <span className="text-[14px] font-semibold tracking-[-0.01em]">Your Clinic</span>
          </div>
          <SampleTag className="border-[#16140F]/20 bg-[#16140F]/5 text-[#16140F]/60">Sample brand</SampleTag>
        </div>
        <p className="mt-6 text-[12px] text-[#16140F]/55">Good morning</p>
        <p className="mt-1 text-[22px] leading-tight tracking-[-0.03em]">Your new report is ready.</p>

        <div className="mt-4 rounded-[22px] p-4 text-white" style={{ background: BRAND }}>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[12px] text-white/80">
              <FileText className="h-3.5 w-3.5" /> Health report
            </span>
            <span className="text-[11px] text-white/70">Today</span>
          </div>
          <p className="mt-3 text-[15px] leading-snug">Most results look healthy. Two are worth a chat with your doctor.</p>
          <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11.5px] font-medium" style={{ color: BRAND }}>
            Read it in plain words <ChevronRight className="h-3 w-3" />
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-[20px] bg-white p-3.5">
            <Calendar className="h-4 w-4" style={{ color: BRAND }} />
            <p className="mt-3 text-[12.5px] leading-snug">Book a home collection</p>
            <p className="mt-1 text-[10.5px] text-[#16140F]/45">Tomorrow, 7–9 am</p>
          </div>
          <div className="rounded-[20px] bg-white p-3.5">
            <MessageCircle className="h-4 w-4" style={{ color: BRAND }} />
            <p className="mt-3 text-[12.5px] leading-snug">Ask about your report</p>
            <p className="mt-1 text-[10.5px] text-[#16140F]/45">English or Hindi</p>
          </div>
        </div>

        <div className="mt-3 rounded-[20px] bg-white p-3.5">
          <div className="flex items-center justify-between">
            <p className="text-[12.5px]">Re-test due</p>
            <span className="text-[10.5px] text-[#16140F]/45">in 12 days</span>
          </div>
          <div className="mt-2.5 h-1.5 rounded-full bg-[#16140F]/[0.07]">
            <div className="h-full w-[78%] rounded-full" style={{ background: BRAND }} />
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-[#16140F]/[0.07] bg-white/80 px-6 pb-6 pt-3 backdrop-blur">
        {[Home, FileText, Calendar, User].map((Icon, i) => (
          <Icon key={i} className="h-5 w-5" style={{ color: i === 0 ? BRAND : 'rgba(22,20,15,0.35)' }} />
        ))}
      </div>
    </div>
  </div>
);

export const BrandedApp: React.FC<{ className?: string }> = ({ className }) => (
  <ScaledFrame width={300} height={620} className={className} label="Sample Studio build: a patient app in a clinic's own brand, with a plain-language report, home collection booking and a re-test reminder.">
    <PhoneApp />
  </ScaledFrame>
);
