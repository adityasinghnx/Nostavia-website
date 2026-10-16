import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

export const HumbiPage: React.FC = () => {
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
            SPECIALISED SERVICE #3 — RE-TEST RECALL CAMPAIGNS
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight max-w-4xl leading-[1.02]">
            Reactivate dormant lab databases with 3.8x higher re-test recall.
          </h1>

          <p className="text-base sm:text-xl text-white/55 max-w-3xl leading-relaxed font-body">
            Diagnostic laboratories sit on millions of historical records. Nostavia's Re-Test Recall engine detects patients due for 90-day follow-up testing based on biomarker half-lives, triggering automated WhatsApp & SMS campaigns under your lab's brand.
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
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">3.8x</div>
              <div className="text-white/55 font-semibold mt-1">Re-Test Recall Lift</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">Zero</div>
              <div className="text-white/55 font-semibold mt-1">Agency Fees</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">90-Day</div>
              <div className="text-white/55 font-semibold mt-1">Biomarker Half-Life Triggers</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">WhatsApp</div>
              <div className="text-white/55 font-semibold mt-1">Native Business API Sync</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. HOW RE-TEST RECALL WORKS */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-white/55 font-bold text-xs uppercase tracking-widest font-mono">
            RECALL ENGINE
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            Automated patient retention infrastructure
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2px] space-y-4 hover:border-white/25 transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-ink-800 text-white flex items-center justify-center font-bold font-mono text-sm">
              1
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white">
              Database Analysis
            </h3>
            <p className="text-sm text-white/55 leading-relaxed font-body">
              Scans historical panel records to identify patients with sub-optimal biomarkers due for protocol follow-ups.
            </p>
          </div>

          <div className="p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2px] space-y-4 hover:border-white/25 transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-ink-800 text-white flex items-center justify-center font-bold font-mono text-sm">
              2
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white">
              Half-Life Triggers
            </h3>
            <p className="text-sm text-white/55 leading-relaxed font-body">
              Calculates precise 90-day or 180-day re-test windows based on physiological biomarker half-lives (e.g. HbA1c, Ferritin).
            </p>
          </div>

          <div className="p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2px] space-y-4 hover:border-white/25 transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-ink-800 text-white flex items-center justify-center font-bold font-mono text-sm">
              3
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white">
              Automated Re-engagement
            </h3>
            <p className="text-sm text-white/55 leading-relaxed font-body">
              Triggers personalized WhatsApp & SMS booking reminders carrying your laboratory's verified brand identity.
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
              q: "How does pricing work for Re-Test Recall Campaigns?",
              a: "Re-Test Recalls are priced on a success-based or campaign volume basis — your lab pays only for active campaign triggers or converted re-tests."
            },
            {
              q: "Does WhatsApp messaging use our verified Business API account?",
              a: "Yes. Nostavia connects directly to your lab's WhatsApp Business API, ensuring messages are sent from your verified green-badge business profile."
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
            Reactivate your dormant laboratory database
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
