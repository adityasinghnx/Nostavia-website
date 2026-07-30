import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock, ChevronDown, ChevronUp, Stethoscope, Activity, Users } from 'lucide-react';

export const ClinicsPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-20 py-10 font-body text-[#0F172A] bg-white">
      
      {/* 1. HERO EXECUTIVE SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-8 sm:p-14 lg:p-16 bg-white border border-[#E2E8F0] rounded-[2px] space-y-8 shadow-none relative overflow-hidden">
          
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            FOR PREVENTIVE & LONGEVITY CLINICS
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#0F172A] tracking-tight max-w-4xl leading-[1.02]">
            Eliminate 15 minutes of unpaid chart review before every consultation.
          </h1>

          <p className="text-base sm:text-xl text-[#64748B] max-w-3xl leading-relaxed font-body">
            Longevity and preventive care consultations require synthesizing 100+ biomarkers, wearable telemetry, and lifestyle logs. Nostavia's SOMA Dual-Brain engine distils complex patient history into a single-screen Clinical Intake Brief in 30 seconds.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to="/demo"
              className="bg-[#000000] hover:bg-[#1A1A1A] text-white font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] shadow-sm transition-all inline-flex items-center gap-2"
            >
              Book a demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/clinical"
              className="bg-white hover:bg-slate-50 text-[#0F172A] border border-[#CBD5E1] font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] transition-all inline-flex items-center"
            >
              View clinical board
            </Link>
          </div>

          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#E2E8F0] font-mono text-xs text-[#0F172A]">
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">15 Mins</div>
              <div className="text-[#64748B] font-semibold mt-1">Saved Per Consultation</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">100+</div>
              <div className="text-[#64748B] font-semibold mt-1">Optimal Ranges Decoded</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">70B</div>
              <div className="text-[#64748B] font-semibold mt-1">Cloud Reasoning Model</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">SOMA-1B</div>
              <div className="text-[#64748B] font-semibold mt-1">On-Device Privacy Brain</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE CLINICAL BOTTLENECK & SOLUTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            CLINICAL BOTTLENECKS
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            High-margin longevity care is bottlenecked by manual data synthesis.
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl leading-relaxed font-body">
            Preventive clinicians spend hours preparing chart notes across disparate lab PDFs, DEXA scans, and wearable exports. Nostavia automates the intake synthesis so doctors focus entirely on patient strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center font-bold">
              <Clock className="w-5 h-5 text-[#0F172A]" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
              15-Minute Unpaid Chart Reviews
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Clinicians manually cross-reference historical lipid panels, hormone ratios, and glycemic logs before entering the consult room.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center font-bold">
              <Activity className="w-5 h-5 text-[#0F172A]" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
              Fragmented Wearable Telemetry
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Patients present Oura, Apple Health, WHOOP, and CGM data in isolated apps. Nostavia normalizes continuous signals into single clinical trends.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center font-bold">
              <Users className="w-5 h-5 text-[#0F172A]" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
              Between-Consult Drop-offs
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Patients disengage between 90-day consults. Nostavia provides continuous, automated protocol tracking under your clinic's brand.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CLINICAL INTAKE BRIEFS SPECIALISED SERVICE */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
        <div className="p-10 sm:p-14 lg:p-16 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] space-y-8 shadow-2xl">
          
          <div className="space-y-3">
            <div className="eyebrow text-cyan-400 font-bold text-xs uppercase tracking-widest font-mono">
              FEATURED SPECIALISED SERVICE
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Clinical Intake Briefs (Priced per Consult)
            </h2>
            <p className="text-base text-slate-300 max-w-2xl font-body leading-relaxed">
              The complete pre-consult chart review generated by Nostavia's SOMA Dual-Brain engine in 30 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs text-slate-300 pt-2">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-[2px] space-y-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <div className="font-bold text-white text-sm">Optimal Range vs In-Range</div>
              <p className="text-[#64748B] font-body text-xs leading-relaxed">
                Highlights sub-optimal biomarkers before standard lab reference ranges flag disease.
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-[2px] space-y-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <div className="font-bold text-white text-sm">Drug-Nutrient Depletions</div>
              <p className="text-[#64748B] font-body text-xs leading-relaxed">
                Flags micronutrient depletions caused by prescription medications (e.g. Metformin & B12).
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-[2px] space-y-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <div className="font-bold text-white text-sm">Personalized Protocol Draft</div>
              <p className="text-[#64748B] font-body text-xs leading-relaxed">
                Drafts tailored nutraceutical and lifestyle interventions for clinician review and approval.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. INTERACTIVE FAQ SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            Everything clinic directors ask us
          </h2>
        </div>

        <div className="space-y-4 max-w-4xl">
          {[
            {
              q: "How does Nostavia integrate with our existing EHR / EMR system?",
              a: "Nostavia integrates via lightweight REST APIs, FHIR standards, or our Intelligence SDK. Intake Briefs can also be delivered as instant 1-page PDF briefs directly to the physician's tablet."
            },
            {
              q: "Does Nostavia diagnose diseases autonomously?",
              a: "No. Nostavia operates as a clinician-supervised decision support tool. All protocol recommendations and intake summaries are presented for physician review and final sign-off."
            },
            {
              q: "Can we customize optimal reference ranges for our longevity protocol?",
              a: "Yes. Enterprise clinic partners can specify custom optimal biomarker targets, supplement formularies, and clinical protocol rules within the Nostavia admin dashboard."
            }
          ].map((faq, idx) => (
            <div key={idx} className="border border-[#E2E8F0] rounded-[2px] overflow-hidden bg-white shadow-none">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left font-display font-extrabold text-lg text-[#0F172A] flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span>{faq.q}</span>
                {activeFaq === idx ? <ChevronUp className="w-5 h-5 text-[#0F172A]" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              {activeFaq === idx && (
                <div className="p-6 pt-0 text-sm text-[#64748B] leading-relaxed border-t border-[#E2E8F0] font-body">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. FINAL HIGH-CONVERTING CTA BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-12 sm:p-16 lg:p-20 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] shadow-2xl text-center flex flex-col items-center gap-8">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-white max-w-4xl leading-[1.05] tracking-tight">
            Equip your clinical team with automated Clinical Intake Briefs
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-body leading-relaxed">
            Schedule a 30-minute demonstration with our clinical engineering team.
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
