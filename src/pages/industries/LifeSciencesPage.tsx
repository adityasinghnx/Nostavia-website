import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, ShieldCheck, Cpu } from 'lucide-react';

export const LifeSciencesPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 py-8 font-body text-[#0F172A] bg-white">
      
      {/* Hero Header */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-6">
        <div className="p-8 sm:p-14 lg:p-16 bg-white border border-[#E2E8F0] rounded-[2px] space-y-8 shadow-none relative overflow-hidden">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            LIFE SCIENCES & CLINICAL TRIALS
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-[#0F172A] tracking-tight max-w-3xl leading-[1.05]">
            Accelerate Decentralized Clinical Trials (DCT) with real-world biomarker feeds
          </h1>

          <p className="text-base sm:text-xl text-[#64748B] max-w-2xl leading-relaxed font-body">
            Nostavia enables pharma and biotech researchers to continuously capture high-fidelity trial participant biomarker trajectories and wearable signals in real-world environments.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/demo"
              className="bg-[#000000] hover:bg-[#1A1A1A] text-white font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] shadow-sm transition-all inline-flex items-center gap-2"
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
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            RWD & TRIAL ACCELERATION
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
            Continuous real-world biomarker evidence for pharma & biotech
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center font-bold">
              <Database className="w-5 h-5 text-[#0F172A]" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">
              100+ Lab & Biomarker Normalization
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Standardize heterogeneous lab results across international trial sites into unified LOINC/SNOMED structures.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5 text-[#0F172A]" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">
              Continuous Telemetry Signals
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Ingest continuous wearable HRV, sleep architecture, and CGM telemetry alongside intermittent trial lab draws.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-[#0F172A]" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">
              De-Identified Compliance
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              SOMA-1B on-device de-identification guarantees trial participant PHI never leaves local participant devices un-encrypted.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER CTA BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-12 sm:p-16 lg:p-20 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] shadow-2xl text-center flex flex-col items-center gap-8">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-white max-w-4xl leading-[1.05] tracking-tight">
            Discuss clinical trial integration with our research team
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/demo"
              className="bg-white hover:bg-slate-100 text-[#0F172A] font-display text-xs font-bold uppercase tracking-wider px-9 py-4 rounded-[2px] shadow-md transition-all inline-flex items-center gap-2"
            >
              Book a demo
              <ArrowRight className="w-4 h-4 text-[#0F172A]" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
