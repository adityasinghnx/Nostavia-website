import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, ShieldCheck, Building2 } from 'lucide-react';

export const PublicSectorPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 py-8 font-body text-white bg-white/[0.03]">
      
      {/* Hero Header */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-6">
        <div className="p-8 sm:p-14 lg:p-16 bg-white/[0.03] border border-white/[0.08] rounded-[2px] space-y-8 shadow-none relative overflow-hidden">
          <div className="eyebrow text-white/55 font-bold text-xs uppercase tracking-widest font-mono">
            PUBLIC SECTOR & GOVERNMENT HEALTH
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight max-w-3xl leading-[1.05]">
            Sovereign AI infrastructure for national preventive health initiatives
          </h1>

          <p className="text-base sm:text-xl text-white/55 max-w-2xl leading-relaxed font-body">
            Nostavia provides sovereign, edge-governed AI data platforms tailored for Ministry of Health initiatives across international markets.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/demo"
              className="bg-white hover:bg-hos-yellow text-ink-950 font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] shadow-sm transition-all inline-flex items-center gap-2"
            >
              Book a demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-white/55 font-bold text-xs uppercase tracking-widest font-mono">
            SOVEREIGN HEALTH AI
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Built for national health authorities & public programs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2px] space-y-4 hover:border-white/25 transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-white/[0.03] border border-white/[0.08] flex items-center justify-center font-bold">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-white">
              Sovereign Data Compliance
            </h3>
            <p className="text-xs text-white/55 leading-relaxed font-body">
              Fully compliant with global and regional data residency laws. All citizen health data remains strictly within national borders.
            </p>
          </div>

          <div className="p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2px] space-y-4 hover:border-white/25 transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-white/[0.03] border border-white/[0.08] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-white">
              Edge De-Identification
            </h3>
            <p className="text-xs text-white/55 leading-relaxed font-body">
              Nostavia's on-device privacy layer strips personal identifiers at the user interface level before data aggregation.
            </p>
          </div>

          <div className="p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2px] space-y-4 hover:border-white/25 transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-white/[0.03] border border-white/[0.08] flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-white">
              National Population Scale
            </h3>
            <p className="text-xs text-white/55 leading-relaxed font-body">
              Scalable cloud architecture engineered to support millions of active citizen health profiles smoothly.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER CTA BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-12 sm:p-16 lg:p-20 bg-ink-800 text-white rounded-[2px] border border-white/10 shadow-2xl text-center flex flex-col items-center gap-8">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-white max-w-4xl leading-[1.05] tracking-tight">
            Schedule a briefing for public health initiative leaders
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/demo"
              className="bg-white/[0.03] hover:bg-slate-100 text-white font-display text-xs font-bold uppercase tracking-wider px-9 py-4 rounded-[2px] shadow-md transition-all inline-flex items-center gap-2"
            >
              Book a demo
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
