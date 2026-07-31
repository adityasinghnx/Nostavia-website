import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Globe, FileCode, CheckCircle2, ArrowRight } from 'lucide-react';

export const SecurityPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 py-10 max-w-[1280px] mx-auto px-4 sm:px-6 font-body text-[#0F172A] bg-white">
      
      {/* HEADER HERO */}
      <div className="space-y-4 max-w-4xl">
        <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
          SECURITY, PRIVACY & COMPLIANCE
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-[#0F172A] tracking-tight leading-[1.05]">
          Health data is regulated. We built for that first, not afterwards.
        </h1>
        <p className="text-base sm:text-xl text-[#64748B] max-w-3xl leading-relaxed font-body">
          Security and privacy are architectural invariants at Nostavia. From SOMA edge de-identification to DPDP compliance and global health-data residency rules.
        </p>
      </div>

      {/* SIX COMPLIANCE BLOCKS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#0F172A]" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">Privacy at the Edge</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Personally identifiable information is stripped on-device before any cloud inference. Nostavia's SOMA edge architecture is designed to keep personal data local.
            </p>
          </div>
        </div>

        <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#0F172A]" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">DPDP-Aligned by Design</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              India's Digital Personal Data Protection Act, 2023 — explicit consent, purpose limitation and data minimisation are built into the pipeline rather than bolted onto it.
            </p>
          </div>
        </div>

        <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#0F172A]" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">Global & Cross-Border Ready</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              In-region data handling aligned to US, European, Indian, and UAE health-data residency rules.
            </p>
          </div>
        </div>

        <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center">
              <FileCode className="w-5 h-5 text-[#0F172A]" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">Infrastructure, Not a Device</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              We position as clinician-supervised decision support and as infrastructure — outside high-risk autonomous medical-device classification.
            </p>
          </div>
        </div>

        <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-[#0F172A]" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">You Own the Data</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              The partner owns the customer relationship and the data. Nostavia operates the intelligence. We never own or monetise your users.
            </p>
          </div>
        </div>

        <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#0F172A]" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">Contracts and IP</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Standardised licensing and data-processing agreements per partner. IP filings underway for core algorithms.
            </p>
          </div>
        </div>

      </div>

      {/* FOOTER BANNER */}
      <div className="p-12 sm:p-16 lg:p-20 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 max-w-2xl text-center md:text-left">
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            Need a custom DPA or Security Questionnaire?
          </h3>
          <p className="text-sm text-slate-300 font-body leading-relaxed">
            Our compliance team provides standard DPDP and UAE DPA documentation within 24 hours.
          </p>
        </div>

        <Link
          to="/demo"
          className="bg-white hover:bg-slate-100 text-[#0F172A] font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] shadow-md transition-all inline-flex items-center gap-2 shrink-0"
        >
          Request Security DPA
          <ArrowRight className="w-4 h-4 text-[#0F172A]" />
        </Link>
      </div>

    </div>
  );
};
