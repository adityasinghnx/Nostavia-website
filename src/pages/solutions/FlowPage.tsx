import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

export const FlowPage: React.FC = () => {
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
            NOSTAVIA FLOW COPILOT — REAL-TIME WORKFLOW AUTOMATION
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight max-w-4xl leading-[1.02]">
            Automate routine clinical tasks & care manager workflows in real time.
          </h1>

          <p className="text-base sm:text-xl text-white/55 max-w-3xl leading-relaxed font-body">
            Flow continuously monitors patient biomarker trajectories and wearable signals. When anomalies or 90-day re-test intervals are detected, Flow automatically routes tasks to assigned care coordinators and triggers personalized patient outreach.
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
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">64%</div>
              <div className="text-white/55 font-semibold mt-1">Reduction in Admin Time</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">92%</div>
              <div className="text-white/55 font-semibold mt-1">Patient Protocol Adherence</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">Instant</div>
              <div className="text-white/55 font-semibold mt-1">Anomaly Alert Routing</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">1-Click</div>
              <div className="text-white/55 font-semibold mt-1">Clinician Approvals</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. AUTOMATION CAPABILITIES */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-white/55 font-bold text-xs uppercase tracking-widest font-mono">
            WORKFLOW ENGINE
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            Automated care coordination & outreach
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2px] space-y-4 hover:border-white/25 transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-ink-800 text-white flex items-center justify-center font-bold font-mono text-sm">
              1
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white">
              Real-Time Signal Monitoring
            </h3>
            <p className="text-sm text-white/55 leading-relaxed font-body">
              Continuously monitors inbound lab results, wearable heart-rate variability drops, and glycemic spikes.
            </p>
          </div>

          <div className="p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2px] space-y-4 hover:border-white/25 transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-ink-800 text-white flex items-center justify-center font-bold font-mono text-sm">
              2
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white">
              Care Team Task Routing
            </h3>
            <p className="text-sm text-white/55 leading-relaxed font-body">
              Routes flagged biomarker alerts and draft protocols directly to assigned care managers for fast review.
            </p>
          </div>

          <div className="p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2px] space-y-4 hover:border-white/25 transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-ink-800 text-white flex items-center justify-center font-bold font-mono text-sm">
              3
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white">
              Personalized Patient Outreach
            </h3>
            <p className="text-sm text-white/55 leading-relaxed font-body">
              Triggers targeted WhatsApp, SMS, or in-app nudges to guide patients back to optimal health targets.
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
              q: "Can care teams customize task trigger rules?",
              a: "Yes. Clinic administrators can define custom biomarker thresholds, response SLAs, and automated outreach templates."
            },
            {
              q: "Does Flow require a specific EHR?",
              a: "Flow connects via REST APIs and Webhooks to any standard EHR, LIS, or CRM platform."
            }
          ].map((faq, idx) => (
            <div key={idx} className="border border-white/[0.08] rounded-[2px] overflow-hidden bg-[#FFFFFF] shadow-none">
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
            Automate clinical workflows with Nostavia Flow
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
