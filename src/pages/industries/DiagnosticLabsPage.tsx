import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp, FileText, RefreshCw, Layers, ShieldCheck, Zap, BarChart3, Clock, Database, Sparkles, CheckCircle2 } from 'lucide-react';
import { FaqSection } from '../../components/sections/FaqSection';

export const DiagnosticLabsPage: React.FC = () => {
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
            FOR DIAGNOSTIC NETWORKS
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#0F172A] tracking-tight max-w-4xl leading-[1.02]">
            Turn routine lab panels into continuous, revenue-generating patient relationships.
          </h1>

          <p className="text-base sm:text-xl text-[#64748B] max-w-3xl leading-relaxed font-body">
            Diagnostic laboratories own the data rails, but lack the intelligence layer. Nostavia embeds white-labeled whole-body biomarker interpretation and automated re-test recall directly into your lab workflow under your brand.
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
              to="/platform"
              className="bg-white hover:bg-slate-50 text-[#0F172A] border border-[#CBD5E1] font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] transition-all inline-flex items-center"
            >
              Explore platform architecture
            </Link>
          </div>

          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#E2E8F0] font-mono text-xs text-[#0F172A]">
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">&lt;800ms</div>
              <div className="text-[#64748B] font-semibold mt-1">Native PDF Ingestion</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">3.8x</div>
              <div className="text-[#64748B] font-semibold mt-1">Re-Test Recall Lift</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">100+</div>
              <div className="text-[#64748B] font-semibold mt-1">Biomarkers Decoded</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">100%</div>
              <div className="text-[#64748B] font-semibold mt-1">White-Labeled Security</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE DIAGNOSTIC INDUSTRY OPPORTUNITY & PROBLEM */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            THE CHALLENGE
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            Diagnostic networks collect enormous health data, but cannot interpret it.
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl leading-relaxed font-body">
            Today, laboratories spend heavy capital acquiring patients for a single blood panel. The patient receives a static PDF report filled with isolated reference ranges, leaves, and never returns until an acute crisis strikes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center font-bold">
              <FileText className="w-5 h-5 text-[#0F172A]" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
              Static One-Time PDF Reports
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Standard lab reports list numbers without explaining whole-body correlations or biological trajectories. Patients cannot understand their results and seek third-party interpretations.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center font-bold">
              <RefreshCw className="w-5 h-5 text-[#0F172A]" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
              Dormant Patient Databases
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Diagnostic chains sit on millions of historical lab records, but lack the clinical intelligence to identify who is due for a 90-day re-test and why.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center font-bold">
              <Clock className="w-5 h-5 text-[#0F172A]" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
              High Review Costs
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Pathologists spend ~20 minutes manually reviewing each routine panel. Nostavia's Smart Report engine generates expert written summaries at software margins.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TWO SPECIALISED SERVICES FOR DIAGNOSTIC LABS */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
        <div className="p-10 sm:p-14 lg:p-16 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] space-y-10 shadow-2xl">
          
          <div className="space-y-3">
            <div className="eyebrow text-cyan-400 font-bold text-xs uppercase tracking-widest font-mono">
              OUR SPECIALISED SERVICES FOR LABS
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Land with specialised services, expand into whole-body platform
            </h2>
            <p className="text-base text-slate-300 max-w-2xl font-body leading-relaxed">
              Nostavia sells two plug-and-play services that replace manual laboratory labor while scaling revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Service 1: Smart Report as a Service */}
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2px] space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono text-[10px] font-bold uppercase rounded-[2px]">
                  SERVICE #1
                </span>
                <span className="font-mono text-xs text-slate-400">Priced per report</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">
                Smart Report as a Service
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-body">
                The comprehensive interpretation a clinician would spend 20 minutes writing, generated automatically for every routine panel and delivered under your lab's brand.
              </p>
              <div className="space-y-3 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Decodes 100+ biomarkers into optimal / in-range / outlier</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Food bio-impact modeling & wearable signal correlation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Delivered in PDF, web portal, or mobile SDK formats</span>
                </div>
              </div>
            </div>

            {/* Service 2: Re-Test Recall Campaigns */}
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2px] space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-[10px] font-bold uppercase rounded-[2px]">
                  SERVICE #2
                </span>
                <span className="font-mono text-xs text-slate-400">Priced per converted re-test</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">
                Re-Test Recall Campaigns
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-body">
                Reactivate your laboratory's dormant patient database. Nostavia analyzes historical lab records, identifies patients due for follow-up testing, and re-engages them automatically under your lab's name.
              </p>
              <div className="space-y-3 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Identifies biomarker half-life & 90-day protocol intervals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Automated WhatsApp, SMS & Email campaign triggers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zero marginal headcount or marketing agency fees</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. LIVE 360° CASE STUDY */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
              DEPLOYMENT CASE STUDY
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
              Live 360° — Smart Report as a Service
            </h2>
            <p className="text-base text-[#64748B] max-w-3xl leading-relaxed font-body">
              <strong>Problem:</strong> Every diagnostics business has the same structural leak. The test is run, the report is delivered, the customer reads it once, and the relationship ends. The document is technically accurate and practically useless.<br/><br/>
              <strong>Solution:</strong> Smart Report as a Service — a report intelligence layer that sits on top of the existing reporting pipeline rather than replacing it.
            </p>
          </div>
          <div className="p-4 bg-white border border-[#E2E8F0] border-l-4 border-l-[#0F172A] rounded-[2px] font-mono text-xs text-[#0F172A] inline-block">
            <strong>Category:</strong> Health and diagnostics &nbsp;|&nbsp; <strong>Scope:</strong> Web presence and report intelligence
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono text-sm">
              1
            </div>
            <h3 className="font-display font-extrabold text-lg text-[#0F172A]">
              Extraction
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Biomarkers pulled from any report format regardless of layout
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono text-sm">
              2
            </div>
            <h3 className="font-display font-extrabold text-lg text-[#0F172A]">
              Normalisation
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Reference ranges read from the report itself, not a generic table
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono text-sm">
              3
            </div>
            <h3 className="font-display font-extrabold text-lg text-[#0F172A]">
              Categorisation
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Optimal vs normal vs outlier (beyond binary in-range flagging)
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono text-sm">
              4
            </div>
            <h3 className="font-display font-extrabold text-lg text-[#0F172A]">
              Rendering
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Non-clinical reader can understand their own body
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono text-sm">
              5
            </div>
            <h3 className="font-display font-extrabold text-lg text-[#0F172A]">
              Persistence
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Same panel later becomes a trend, not a second unrelated file
            </p>
          </div>
        </div>
      </section>

      {/* 5. SOMA DUAL-BRAIN ARCHITECTURE DEEP-DIVE FOR LABS */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            PROPRIETARY AI ARCHITECTURE
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            SOMA Dual-Brain: On-device privacy, cloud reasoning
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl leading-relaxed font-body">
            Handling patient lab data across international markets makes privacy a design constraint. Nostavia's SOMA architecture strips personally identifiable information (PII) on-device before cloud inference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono text-sm">
              1
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
              SOMA-1B (On-Device Domain Brain)
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              A specialized small language model running on-device. It parses native lab PDFs, handles digital signatures, strips PII, and distils raw panel data into a focused, de-identified clinical brief.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono text-sm">
              2
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
              Knowledge Brain (Cloud Reasoning)
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              A 70B-class reasoning model adapted for medical use, grounded in clinical evidence and region-specific reference data. It receives only de-identified briefs, and every output is validated against licensed clinical advisors.
            </p>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE FAQ SECTION */}
      <FaqSection
        title="Everything diagnostic laboratory leaders ask us"
        faqs={[
          {
            q: "Does Nostavia replace our pathologists or laboratory staff?",
            a: "No. Nostavia functions as a clinician-supervised decision support layer. It drafts Smart Reports and extracts historical biomarkers for instant pathologist review, reducing manual chart review time from 20 minutes to under 30 seconds."
          },
          {
            q: "How does Nostavia handle custom or proprietary PDF lab formats?",
            a: "Nostavia's clinical vision engine ingests Quest, LabCorp, Dr Lal PathLabs, Thyrocare, and custom hospital PDF layouts automatically with 99.4% field accuracy, standardizing biomarker names into official LOINC & SNOMED codes."
          },
          {
            q: "How does the Re-Test Recall Campaign engine work?",
            a: "Nostavia analyzes your historical database to detect patients due for 90-day or 180-day follow-up testing (e.g. tracking lipid panels or HbA1c half-lives). It sends personalized re-test reminders via WhatsApp, SMS, or email under your laboratory's brand name."
          },
          {
            q: "Is patient health data secure and compliant with DPDP 2023?",
            a: "Yes. Nostavia is DPDP 2023 compliant by design. Personally Identifiable Information (PII) is stripped on-device before any cloud inference, ensuring raw PHI never leaves your secure enclave."
          }
        ]}
      />

      {/* 6. FINAL HIGH-CONVERTING CTA BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-12 sm:p-16 lg:p-20 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] shadow-2xl text-center flex flex-col items-center gap-8">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-white max-w-4xl leading-[1.05] tracking-tight">
            Ready to upgrade your diagnostic network with white-labeled AI intelligence?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-body leading-relaxed">
            Join live diagnostic pilots and launch Smart Reports and Re-Test Recalls under your brand in weeks.
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
