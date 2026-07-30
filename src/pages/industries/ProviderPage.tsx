import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock, Zap, Database } from 'lucide-react';

export const ProviderPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 py-8 font-body text-[#0F172A] bg-white">
      
      {/* Hero Header */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-6">
        <div className="p-8 sm:p-14 lg:p-16 bg-white border border-[#E2E8F0] rounded-[2px] space-y-8 shadow-none relative overflow-hidden">
          
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            HEALTH SYSTEMS & PROVIDERS
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-[#0F172A] tracking-tight max-w-3xl leading-[1.05]">
            Empower clinicians with continuous biomarker intelligence
          </h1>

          <p className="text-base sm:text-xl text-[#64748B] max-w-2xl leading-relaxed font-body">
            Nostavia integrates seamlessly into EHR workflows, synthesizing non-EHR biomarkers, wearable signals, and lab panels into real-time clinical intake briefs and decision support.
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

      {/* Key Provider Benefits Grid */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            CLINICAL IMPACT
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
            Why leading health systems choose Nostavia
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center font-bold">
              <Clock className="w-5 h-5 text-[#0F172A]" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">
              Save 20+ Minutes Per Consult
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Automated Pre-Consult Intake Briefs extract key longitudinal trends from lab PDFs and wearables, presenting a 30-second summary directly to clinicians.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center font-bold">
              <Zap className="w-5 h-5 text-[#0F172A]" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">
              Automated Protocol Drafting
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Generate evidence-based diet, exercise, and nutraceutical recommendations validated against clinical guidelines for physician approval.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center font-bold">
              <Database className="w-5 h-5 text-[#0F172A]" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">
              Continuous Biomarker Tracking
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Bridge the gap between annual checkups by tracking daily metabolic health trends and wearable telemetry in real time.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER CTA BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-12 sm:p-16 lg:p-20 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] shadow-2xl text-center flex flex-col items-center gap-8">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-white max-w-4xl leading-[1.05] tracking-tight">
            Schedule a technical briefing for your provider system
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-body leading-relaxed">
            Review integration specs and EHR data pipelines with our engineering team.
          </p>
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
