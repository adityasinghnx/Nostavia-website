import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { ReferenceBand } from '../../components/ReferenceBand';

export const SupplementsPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 py-10 max-w-[1280px] mx-auto px-4 sm:px-6 font-body text-[#0F172A] bg-white">
      
      {/* HEADER HERO */}
      <div className="space-y-4 max-w-4xl">
        <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
          SUPPLEMENTS & NUTRITION BRANDS
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-[#0F172A] tracking-tight leading-[1.05]">
          Recommend from biology, not from browsing history.
        </h1>
        <p className="text-base sm:text-xl text-[#64748B] leading-relaxed max-w-3xl font-body">
          Supplement commerce runs on quiz funnels and lookalike audiences. Nostavia lets you recommend from a customer's actual bloodwork, wearable trend and diet — and know when they'll need the next bottle.
        </p>
      </div>

      {/* METRIC CARD */}
      <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4">
        <div className="flex justify-between items-center font-mono text-xs text-[#64748B]">
          <span className="text-[#0F172A] uppercase font-bold">REPEAT PURCHASE RATE METRIC</span>
          <span>Baseline: 22% ➔ Biomarker-Guided Target: 64%</span>
        </div>
        <ReferenceBand valuePosition={64} valueLabel="64% Repeat Purchase Rate" sublabel="Tuned for Biomarker-Guided Commerce Brands" />
      </div>

      {/* CLINICAL & CONSENT GUARDRAILS */}
      <section className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs text-[#0F172A] font-bold">
          <ShieldCheck className="w-4 h-4 text-[#0F172A]" />
          <span>CLINICAL & REGULATORY GUARDRAILS</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#64748B] pt-2 font-body">
          <div className="p-4 bg-white border border-[#E2E8F0] rounded-[2px]">
            <strong className="text-[#0F172A] block mb-1">1. Clinical Sign-off</strong>
            Every biomarker-to-product mapping is reviewed and signed off by our clinical advisory bench before it goes live.
          </div>
          <div className="p-4 bg-white border border-[#E2E8F0] rounded-[2px]">
            <strong className="text-[#0F172A] block mb-1">2. Nutritional Language</strong>
            Nutritional language only. No disease claims, no treatment claims.
          </div>
          <div className="p-4 bg-white border border-[#E2E8F0] rounded-[2px]">
            <strong className="text-[#0F172A] block mb-1">3. Explicit Consent Flow</strong>
            Health data used for commercial recommendation requires separate explicit consent, logged separately.
          </div>
        </div>
      </section>

      {/* WHAT NOSTAVIA ADDS */}
      <section className="flex flex-col gap-8">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            COMMERCE ENGINE
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A]">
            Biomarker-Guided Commerce Infrastructure
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-3 hover:border-[#CBD5E1] transition-all">
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">Personalized Biomarker Stacks</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Convert raw bloodwork panels into tailored supplement formulations matched to specific biomarker sub-optimal ranges.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-3 hover:border-[#CBD5E1] transition-all">
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">Predictive Refill Signals</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Track nutrient depletion cycles and biomarker half-lives to trigger automated replenishment reminders when the customer needs a re-order.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER CTA BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-12 sm:p-16 lg:p-20 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] shadow-2xl text-center flex flex-col items-center gap-8">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-white max-w-4xl leading-[1.05] tracking-tight">
            Build biomarker-guided supplement recommendations
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
