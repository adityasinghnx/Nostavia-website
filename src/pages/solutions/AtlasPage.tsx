import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

export const AtlasPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-20 py-10 font-body text-white bg-white/[0.03]">
      
      {/* 1. HERO EXECUTIVE SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-8 sm:p-14 lg:p-16 bg-white/[0.03] border border-white/[0.08] rounded-[2px] space-y-8 shadow-none relative overflow-hidden">
          
          <div className="eyebrow text-white/55 font-bold text-xs uppercase tracking-widest font-mono">
            NOSTAVIA ATLAS — 100+ BIOMARKER INTERPRETATION ENGINE
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight max-w-4xl leading-[1.02]">
            Classify 100+ biomarkers into optimal, functional & clinical sub-ranges.
          </h1>

          <p className="text-base sm:text-xl text-white/55 max-w-3xl leading-relaxed font-body">
            Standard hospital reference ranges only detect disease after organ damage has occurred. Atlas establishes sub-clinical optimal, functional, and longevity sub-ranges tailored to age, sex, and ethnic baseline data across international populations.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to="/demo"
              className="bg-white hover:bg-hos-yellow text-ink-950 font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] shadow-sm transition-all inline-flex items-center gap-2"
            >
              Book a demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/[0.08] font-mono text-xs text-white">
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">100+</div>
              <div className="text-white/55 font-semibold mt-1">Decoded Biomarkers</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">4 Sub-Ranges</div>
              <div className="text-white/55 font-semibold mt-1">Optimal / In-Range / Outlier</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">PubMed</div>
              <div className="text-white/55 font-semibold mt-1">Peer-Reviewed Citations</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">Velocity</div>
              <div className="text-white/55 font-semibold mt-1">Rate-of-Change Tracking</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. ATLAS DECODING ENGINE */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-white/55 font-bold text-xs uppercase tracking-widest font-mono">
            BIOMARKER CLASSIFICATION
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            Sub-clinical optimal targets
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2px] space-y-4 hover:border-white/25 transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-ink-800 text-white flex items-center justify-center font-bold font-mono text-sm">
              1
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white">
              Sub-Clinical Optimal Bands
            </h3>
            <p className="text-sm text-white/55 leading-relaxed font-body">
              Establishes tighter optimal target bands for longevity and preventative health based on peer-reviewed literature.
            </p>
          </div>

          <div className="p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2px] space-y-4 hover:border-white/25 transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-ink-800 text-white flex items-center justify-center font-bold font-mono text-sm">
              2
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white">
              Velocity & Trajectory Modeling
            </h3>
            <p className="text-sm text-white/55 leading-relaxed font-body">
              Tracks rate-of-change across longitudinal blood panels rather than evaluating static isolated numbers.
            </p>
          </div>

          <div className="p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2px] space-y-4 hover:border-white/25 transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-ink-800 text-white flex items-center justify-center font-bold font-mono text-sm">
              3
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white">
              Cross-Biomarker Ratios
            </h3>
            <p className="text-sm text-white/55 leading-relaxed font-body">
              Calculates essential physiological ratios (e.g. TG/HDL ratio, ApoB/ApoA1, HOMA-IR) for multi-organ risk scoring.
            </p>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE FAQ SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-white/55 font-bold text-xs uppercase tracking-widest font-mono">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4 max-w-4xl">
          {[
            {
              q: "Where do Atlas reference ranges originate from?",
              a: "Atlas reference ranges are established by Nostavia's clinical advisory bench using published peer-reviewed studies from PubMed, Mayo Clinic, and longevity research centers."
            },
            {
              q: "Can clinics override Atlas reference ranges?",
              a: "Yes. Enterprise clinic partners can customize biomarker target thresholds directly within the Nostavia dashboard."
            }
          ].map((faq, idx) => (
            <div key={idx} className="border border-white/[0.08] rounded-[2px] overflow-hidden bg-white/[0.03] shadow-none">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left font-display font-extrabold text-lg text-white flex items-center justify-between hover:bg-white/[0.05] transition-colors"
              >
                <span>{faq.q}</span>
                {activeFaq === idx ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-white/50" />}
              </button>
              {activeFaq === idx && (
                <div className="p-6 pt-0 text-sm text-white/55 leading-relaxed border-t border-white/[0.08] font-body">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4. FINAL CTA BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-12 sm:p-16 lg:p-20 bg-ink-800 text-white rounded-[2px] border border-white/10 shadow-2xl text-center flex flex-col items-center gap-8">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-white max-w-4xl leading-[1.05] tracking-tight">
            Deploy Nostavia Atlas biomarker decoding
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
