import React from 'react';

export const BentoTrustQuotesSection: React.FC = () => {
  return (
    <section className="w-full font-body text-[#0F172A] py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Centered Header matching Screenshot 5 */}
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <div className="eyebrow text-[#94A3B8] font-bold text-xs uppercase tracking-widest">
            CUSTOMER SUCCESS
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-[#0F172A] tracking-tight leading-[1.02]">
            Trusted by healthcare leaders across the enterprise
          </h2>
        </div>

        {/* Bento Grid Layout matching Screenshot 5 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Dark Metric Card (4 Columns) */}
          <div className="md:col-span-4 bg-[#000000] text-white p-8 sm:p-10 rounded-[16px] flex flex-col justify-between min-h-[300px] shadow-sm">
            <div className="space-y-2">
              <div className="font-display font-extrabold text-5xl sm:text-6xl text-white">
                3.8x
              </div>
              <div className="text-sm font-medium text-slate-300">
                Higher re-test recall rate across historical lab databases
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800 font-display font-extrabold text-xl text-white">
              AuraHealth
            </div>
          </div>

          {/* Card 2: Soft Gray Logo Card (3 Columns) */}
          <div className="md:col-span-3 bg-[#F1F5F9] border border-[#E2E8F0] p-8 rounded-[16px] flex flex-col justify-center items-center text-center shadow-sm min-h-[300px]">
            <div className="font-display font-extrabold text-2xl text-[#0F172A] tracking-tight">
              IIHMF
            </div>
            <div className="font-mono text-[11px] text-[#64748B] font-bold uppercase tracking-wider mt-1">
              HEALTH INSTITUTE
            </div>
          </div>

          {/* Card 3: Soft Sky Blue Quote Card (5 Columns) */}
          <div className="md:col-span-5 bg-[#BAE6FD] text-[#0F172A] p-8 sm:p-10 rounded-[16px] flex flex-col justify-between min-h-[300px] shadow-sm">
            <p className="font-display font-bold text-xl sm:text-2xl leading-snug">
              "Nostavia's Smart Report engine replaced 20 minutes of pathologist review per panel while generating whole-body health insights patients actually understand."
            </p>

            <div className="pt-6 font-body">
              <div className="font-bold text-sm text-[#0F172A]">Dr. Sparsh Sehdev</div>
              <div className="text-xs text-[#0284C7] font-mono font-bold">MBBS, GMC Registered (UK)</div>
            </div>
          </div>

          {/* Card 4: Deep Royal Blue Quote Card (Full 12 Columns below) */}
          <div className="md:col-span-12 bg-[#1D4ED8] text-white p-8 sm:p-12 rounded-[16px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
            <p className="font-display font-bold text-xl sm:text-2xl leading-relaxed max-w-3xl">
              "SOMA Edge Privacy strips all PII on-device, giving our longevity clinic 100% compliance with Dubai Law 17/2026 data residency rules."
            </p>

            <div className="shrink-0 font-body border-t sm:border-t-0 sm:border-l border-blue-400/50 pt-4 sm:pt-0 sm:pl-6">
              <div className="font-bold text-base text-white">Aakanksha Pant, PhD</div>
              <div className="text-xs text-blue-200 font-mono font-bold">Chief Longevity Officer</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
