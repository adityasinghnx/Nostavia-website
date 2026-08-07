import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp, Download, Search, Brain, Zap, TrendingUp } from 'lucide-react';

export const GravityPage: React.FC = () => {
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
            INTELLIGENCE SDK — EMBEDDABLE HEALTH AI
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#0F172A] tracking-tight max-w-4xl leading-[1.02]">
            Embed whole-body health intelligence directly into your existing app.
          </h1>

          <p className="text-base sm:text-xl text-[#64748B] max-w-3xl leading-relaxed font-body">
            For diagnostic networks, longevity clinics, and wellness platforms that already operate a web or mobile application. Embed 100+ biomarker decoding, food scanning, adaptive protocols, and the AI concierge with zero change to your UI or user experience.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to="/demo"
              className="bg-[#000000] hover:bg-[#1A1A1A] text-white font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] shadow-sm transition-all inline-flex items-center gap-2"
            >
              Book a demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#E2E8F0] font-mono text-xs text-[#0F172A]">
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">&lt;800ms</div>
              <div className="text-[#64748B] font-semibold mt-1">Lab Ingestion Latency</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">100+</div>
              <div className="text-[#64748B] font-semibold mt-1">Decoded Biomarkers</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">Zero</div>
              <div className="text-[#64748B] font-semibold mt-1">UI / UX Disruption</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">REST & GraphQL</div>
              <div className="text-[#64748B] font-semibold mt-1">Developer Endpoints</div>
            </div>
          </div>

        </div>
      </section>

      {/* 1.5. ORBITAL ARCHITECTURE DIAGRAM */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="text-center space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            HOW THE SDK WORKS
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            Intelligence that remembers, reasons, and adapts
          </h2>
          <p className="text-base sm:text-lg text-[#475569] font-body leading-relaxed max-w-2xl mx-auto">
            Five capabilities in a continuous loop. Each call to the SDK draws on everything the system has learned about that individual.
          </p>
        </div>

        <div className="relative w-full max-w-[680px] mx-auto h-[460px] sm:h-[540px] my-6 select-none">
          {/* Center Multi-Layer Ring Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] p-2.5 shadow-xl flex items-center justify-center z-10">
            <div className="w-full h-full rounded-full bg-[#0F172A] flex flex-col items-center justify-center text-center p-3 shadow-inner">
              <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[2px] text-slate-400 mb-1">
                SOMA CORE
              </span>
              <span className="font-display font-extrabold text-base sm:text-xl text-white leading-tight tracking-tight">
                NOSTAVIA
              </span>
              <span className="font-display font-bold text-xs sm:text-sm text-slate-300 leading-tight tracking-wider">
                INTELLIGENCE
              </span>
            </div>
          </div>

          {/* Dotted Orbit Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[78%] h-[78%] rounded-full border-2 border-dashed border-[#CBD5E1]"></div>

          {/* 5 Clean Orbital Node Cards */}
          
          {/* 01. Ingest */}
          <div className="absolute z-20" style={{ top: '-2%', left: '50%', transform: 'translateX(-50%)' }}>
            <div className="bg-white border border-[#E2E8F0] hover:border-[#0F172A] p-3 sm:p-4 rounded-[4px] shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center w-[150px] sm:w-[170px] group">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-[10px] font-bold text-[#64748B] bg-[#F8FAFC] px-1.5 py-0.5 rounded-[2px] border border-[#E2E8F0]">01</span>
                <div className="w-7 h-7 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Download className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="font-display font-extrabold text-xs sm:text-sm text-[#0F172A]">Ingest</div>
              <div className="text-[10px] sm:text-xs text-[#64748B] font-body mt-0.5">Labs, wearables, nutrition</div>
            </div>
          </div>

          {/* 02. Decode */}
          <div className="absolute z-20" style={{ top: '20%', right: '-2%' }}>
            <div className="bg-white border border-[#E2E8F0] hover:border-[#0F172A] p-3 sm:p-4 rounded-[4px] shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center w-[150px] sm:w-[170px] group">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-[10px] font-bold text-[#64748B] bg-[#F8FAFC] px-1.5 py-0.5 rounded-[2px] border border-[#E2E8F0]">02</span>
                <div className="w-7 h-7 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Search className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="font-display font-extrabold text-xs sm:text-sm text-[#0F172A]">Decode</div>
              <div className="text-[10px] sm:text-xs text-[#64748B] font-body mt-0.5">Biomarker extraction</div>
            </div>
          </div>

          {/* 03. Reason */}
          <div className="absolute z-20" style={{ bottom: '2%', right: '4%' }}>
            <div className="bg-white border border-[#E2E8F0] hover:border-[#0F172A] p-3 sm:p-4 rounded-[4px] shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center w-[150px] sm:w-[170px] group">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-[10px] font-bold text-[#64748B] bg-[#F8FAFC] px-1.5 py-0.5 rounded-[2px] border border-[#E2E8F0]">03</span>
                <div className="w-7 h-7 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Brain className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="font-display font-extrabold text-xs sm:text-sm text-[#0F172A]">Reason</div>
              <div className="text-[10px] sm:text-xs text-[#64748B] font-body mt-0.5">Cross-domain correlation</div>
            </div>
          </div>

          {/* 04. Act */}
          <div className="absolute z-20" style={{ bottom: '2%', left: '4%' }}>
            <div className="bg-white border border-[#E2E8F0] hover:border-[#0F172A] p-3 sm:p-4 rounded-[4px] shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center w-[150px] sm:w-[170px] group">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-[10px] font-bold text-[#64748B] bg-[#F8FAFC] px-1.5 py-0.5 rounded-[2px] border border-[#E2E8F0]">04</span>
                <div className="w-7 h-7 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Zap className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="font-display font-extrabold text-xs sm:text-sm text-[#0F172A]">Act</div>
              <div className="text-[10px] sm:text-xs text-[#64748B] font-body mt-0.5">Protocols & coaching</div>
            </div>
          </div>

          {/* 05. Learn */}
          <div className="absolute z-20" style={{ top: '20%', left: '-2%' }}>
            <div className="bg-white border border-[#E2E8F0] hover:border-[#0F172A] p-3 sm:p-4 rounded-[4px] shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center w-[150px] sm:w-[170px] group">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-[10px] font-bold text-[#64748B] bg-[#F8FAFC] px-1.5 py-0.5 rounded-[2px] border border-[#E2E8F0]">05</span>
                <div className="w-7 h-7 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="font-display font-extrabold text-xs sm:text-sm text-[#0F172A]">Learn</div>
              <div className="text-[10px] sm:text-xs text-[#64748B] font-body mt-0.5">Longitudinal memory</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SDK MODULES */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            SDK MODULES
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            Modular intelligence components
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono text-sm">
              1
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
              Biomarker Decoder
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Classifies lab parameters into optimal, in-range, or outlier categories with full clinical citations.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono text-sm">
              2
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
              Adaptive Protocol Engine
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Generates dynamic nutrition, exercise, and supplement recommendations based on biomarker changes over time.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono text-sm">
              3
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
              SOMA AI Concierge
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              An embeddable conversational assistant trained on the user's biomarker profile to answer health queries.
            </p>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE FAQ SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4 max-w-4xl">
          {[
            {
              q: "How long does SDK integration take?",
              a: "Engineers typically integrate Nostavia REST/GraphQL APIs and SDK components into existing apps within 3 to 5 business days."
            },
            {
              q: "Is the SDK compatible with React Native, Flutter, and Native iOS/Android?",
              a: "Yes. Nostavia provides native iOS (Swift), Android (Kotlin), and Web/React SDKs with full TypeScript definitions."
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

      {/* 4. FINAL CTA BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-12 sm:p-16 lg:p-20 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] shadow-2xl text-center flex flex-col items-center gap-8">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-white max-w-4xl leading-[1.05] tracking-tight">
            Embed Nostavia Intelligence SDK into your product
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
