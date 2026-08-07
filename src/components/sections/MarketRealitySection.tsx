import React from 'react';
import { FileX, Unplug, DoorOpen } from 'lucide-react';

export const MarketRealitySection: React.FC = () => {
  return (
    <section className="w-full font-body text-[#0F172A] py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        <div className="space-y-6 max-w-4xl">
          <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#64748B]">
            THE MARKET REALITY
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-[#0F172A] tracking-tight leading-[1.05]">
            83% of diagnostic reports are read once and never opened again.
          </h2>
          <p className="text-base sm:text-lg text-[#475569] font-body leading-relaxed max-w-3xl">
            Most health companies collect enormous clinical data and cannot interpret it. The relationship ends where the intelligence should begin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] hover:border-[#CBD5E1] transition-all space-y-4">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center">
              <FileX className="w-5 h-5" />
            </div>
            <h3 className="font-display font-extrabold text-lg text-[#0F172A]">
              Static Reports
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Lab panels delivered as PDFs. No trends, no context, no reason to return. The report is technically accurate and practically useless.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] hover:border-[#CBD5E1] transition-all space-y-4">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center">
              <Unplug className="w-5 h-5" />
            </div>
            <h3 className="font-display font-extrabold text-lg text-[#0F172A]">
              Fragmented Wearable Data
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Steps in one app, sleep in another, labs in a PDF. The patient is split across six dashboards that never talk to each other.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] hover:border-[#CBD5E1] transition-all space-y-4">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center">
              <DoorOpen className="w-5 h-5" />
            </div>
            <h3 className="font-display font-extrabold text-lg text-[#0F172A]">
              Zero Post-Visit Intelligence
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              The hospital visit ends. Nothing follows the patient home. Chronic conditions drift unmanaged between appointments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
