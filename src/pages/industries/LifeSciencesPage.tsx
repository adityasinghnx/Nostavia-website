import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, ShieldCheck, Cpu } from 'lucide-react';

export const LifeSciencesPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 py-8 font-body text-white bg-white/[0.03]">
      
      {/* Hero Header */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-6">
        <div className="p-8 sm:p-14 lg:p-16 bg-white/[0.03] border border-white/[0.08] rounded-[2px] space-y-8 shadow-none relative overflow-hidden">
          <div className="eyebrow text-white/55 font-bold text-xs uppercase tracking-widest font-mono">
            LIFE SCIENCES & CLINICAL TRIALS
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight max-w-3xl leading-[1.05]">
            Accelerate Decentralized Clinical Trials (DCT) with real-world biomarker feeds
          </h1>

          <p className="text-base sm:text-xl text-white/55 max-w-2xl leading-relaxed font-body">
            Nostavia enables pharma and biotech researchers to continuously capture high-fidelity trial participant biomarker trajectories and wearable signals in real-world environments.
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

      {/* Key Advantages */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-white/55 font-bold text-xs uppercase tracking-widest font-mono">
            RWD & TRIAL ACCELERATION
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Continuous real-world biomarker evidence for pharma & biotech
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2px] space-y-4 hover:border-white/25 transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-white/[0.03] border border-white/[0.08] flex items-center justify-center font-bold">
              <Database className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-white">
              100+ Lab & Biomarker Normalization
            </h3>
            <p className="text-xs text-white/55 leading-relaxed font-body">
              Standardize heterogeneous lab results across international trial sites into unified LOINC/SNOMED structures.
            </p>
          </div>

          <div className="p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2px] space-y-4 hover:border-white/25 transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-white/[0.03] border border-white/[0.08] flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-white">
              Continuous Telemetry Signals
            </h3>
            <p className="text-xs text-white/55 leading-relaxed font-body">
              Ingest continuous wearable HRV, sleep architecture, and CGM telemetry alongside intermittent trial lab draws.
            </p>
          </div>

          <div className="p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2px] space-y-4 hover:border-white/25 transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-white/[0.03] border border-white/[0.08] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-white">
              De-Identified Compliance
            </h3>
            <p className="text-xs text-white/55 leading-relaxed font-body">
              Nostavia's on-device privacy layer guarantees trial participant PHI never leaves local participant devices un-encrypted.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER CTA BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-12 sm:p-16 lg:p-20 bg-ink-800 text-white rounded-[2px] border border-white/10 shadow-2xl text-center flex flex-col items-center gap-8">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-white max-w-4xl leading-[1.05] tracking-tight">
            Discuss clinical trial integration with our research team
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
