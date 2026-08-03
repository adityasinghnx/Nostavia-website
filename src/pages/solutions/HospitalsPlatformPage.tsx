import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronDown, 
  Search,
  BarChart3,
  Monitor,
} from 'lucide-react';
import { ArchitectureDiagram } from '../../components/ArchitectureDiagram';

export const HospitalsPlatformPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-20 py-10 font-body text-[#0F172A] bg-white">
      
      {/* 1. HERO EXECUTIVE SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-8 sm:p-14 lg:p-16 bg-white border border-[#E2E8F0] rounded-[2px] space-y-8 shadow-none relative overflow-hidden">
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
              HOSPITAL PLATFORM & SDKs
            </span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-6xl lg:text-7xl text-[#0F172A] tracking-tight max-w-4xl leading-[1.02]">
            Audit the leak. Prove the fix. Show the value.
          </h1>

          <p className="text-base sm:text-xl text-[#64748B] max-w-3xl leading-relaxed font-body">
            Three mechanisms that make ROI undeniable — a Leakage Audit that proves the problem, a pilot that proves the fix, and a live Attribution Engine that proves the value — layered on top of four embeddable patient programs and a direct engineering service.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/demo"
              className="bg-[#000000] hover:bg-[#1A1A1A] text-white font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] shadow-sm transition-all inline-flex items-center gap-2"
            >
              Book a platform demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/industries/hospitals"
              className="bg-white hover:bg-slate-50 text-[#0F172A] border border-[#CBD5E1] font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] transition-all"
            >
              View Hospital Programs
            </Link>
          </div>

          {/* Key Platform Technical Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#E2E8F0] font-mono text-xs text-[#0F172A]">
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">60 Days</div>
              <div className="text-[#64748B] font-semibold mt-1">Full Deployment Timeline</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">HIS-Neutral</div>
              <div className="text-[#64748B] font-semibold mt-1">Zero HIS Code Modifications</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">iOS & Android</div>
              <div className="text-[#64748B] font-semibold mt-1">Native Branded Mobile Apps</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">Built-For-You</div>
              <div className="text-[#64748B] font-semibold mt-1">Direct Systems Engineering</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THREE MECHANISMS — THE NERVOUS SYSTEM */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            THE THREE MECHANISMS
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#0F172A] tracking-tight max-w-4xl">
            The nervous system that makes every program provable
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl leading-relaxed font-body">
            Programs are the muscles. These three mechanisms are the nervous system — they open the door, price the value, and accumulate intelligence that compounds over time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Leakage Audit */}
          <div className="p-8 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] space-y-5 shadow-xl flex flex-col">
            <div className="w-11 h-11 rounded-full bg-cyan-400/10 flex items-center justify-center">
              <Search className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="font-mono text-xs font-bold text-cyan-400">MECHANISM 01</div>
            <h3 className="font-display font-extrabold text-2xl text-white">Leakage Audit</h3>
            <p className="text-sm text-slate-300 leading-relaxed font-body flex-1">
              Free pre-contract analysis. The hospital provides 12–24 months of anonymized historical data under a signed data-handling agreement. We return a Leakage Report showing the rupee value of leaked checkup customers, discharged patients who never returned, and dormant chronics who stopped engaging. No HIS vendor offers this — running it requires an analytical engine, not a records system.
            </p>
            <div className="pt-2 border-t border-[#1E293B] space-y-2 font-mono text-[11px] text-slate-400">
              <div className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />Anonymized data only — signed DHA</div>
              <div className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />Rupee-value leakage quantification</div>
              <div className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />Delivered in 2 weeks, zero integration</div>
            </div>
          </div>

          {/* Attribution Engine */}
          <div className="p-8 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] space-y-5 shadow-xl flex flex-col">
            <div className="w-11 h-11 rounded-full bg-cyan-400/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="font-mono text-xs font-bold text-cyan-400">MECHANISM 02</div>
            <h3 className="font-display font-extrabold text-2xl text-white">Attribution Engine</h3>
            <p className="text-sm text-slate-300 leading-relaxed font-body flex-1">
              Every re-test, follow-up OPD visit, and package renewal is tagged, attributed, and priced in a live CFO dashboard. ROI as a number on a screen, not a claim in a slide deck. Makes performance-based pricing possible because the value is always visible.
            </p>
            <div className="pt-2 border-t border-[#1E293B] space-y-2 font-mono text-[11px] text-slate-400">
              <div className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />Real-time attribution tagging</div>
              <div className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />Live CFO revenue dashboard</div>
              <div className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />Enables performance-based pricing</div>
            </div>
          </div>

          {/* Command Center */}
          <div className="p-8 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] space-y-5 shadow-xl flex flex-col">
            <div className="w-11 h-11 rounded-full bg-cyan-400/10 flex items-center justify-center">
              <Monitor className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="font-mono text-xs font-bold text-cyan-400">MECHANISM 03</div>
            <h3 className="font-display font-extrabold text-2xl text-white">Command Center</h3>
            <p className="text-sm text-slate-300 leading-relaxed font-body flex-1">
              Hospital-side population intelligence: drift lists showing which chronic patients are deteriorating on which markers, cohort risk maps, program performance analytics, and department-level demand signals. The medical director's morning screen. Gets sharper the longer it runs — six months in, the drift detection knows your patient population, not a generic one.
            </p>
            <div className="pt-2 border-t border-[#1E293B] space-y-2 font-mono text-[11px] text-slate-400">
              <div className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />Patient drift & deterioration alerts</div>
              <div className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />Cohort risk maps & demand signals</div>
              <div className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />Compounding hospital-specific intelligence</div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. THE 4 EMBEDDABLE PROGRAMS + BUILT FOR YOU */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            FOUR EMBEDDABLE PROGRAMS
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#0F172A] tracking-tight">
            Four programs + direct engineering service
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl leading-relaxed font-body">
            Each program can be deployed independently or as a unified hospital front door. Nostavia operates the underlying AI, lab decoding, and wearable handling while keeping your brand front and center.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="font-mono text-xs font-bold text-[#2563EB]">PROGRAM 01</div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">Preventive Program Engine</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Converts health checkups from static PDFs into interactive Smart Reports with biological age, pace of aging, digital twin simulation, wearable connection, and automated re-test recall schedules.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="font-mono text-xs font-bold text-[#2563EB]">PROGRAM 02</div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">Discharge-to-Recovery Engine</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Plain-language recovery protocols, medication schedules with adherence tracking, wearable telemetry, symptom check-ins, care-team escalation flags, and auto-scheduled follow-up OPD bookings.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="font-mono text-xs font-bold text-[#2563EB]">PROGRAM 03</div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">Chronic Care Subscription Programs</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Turnkey program management for subscription diabetes, cardiac, and metabolic clinics. Integrates Dexcom CGMs, wearable feeds, adaptive protocol updates, and care-team dashboards.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="font-mono text-xs font-bold text-[#2563EB]">PROGRAM 04</div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">International Patient Continuity</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Post-treatment layer for medical-tourism (India–UAE corridor): format-agnostic lab PDF parser for home-country lab results, remote monitoring, teleconsult scheduling, and surgeon dashboard.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all flex flex-col justify-between md:col-span-2">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="font-mono text-xs font-bold text-[#2563EB]">PROGRAM 05 · VOICE & CHAT</div>
                <Link
                  to="/solutions/front-desk"
                  className="font-mono text-xs font-bold text-[#0F172A] hover:text-[#2563EB] inline-flex items-center gap-1.5 underline"
                >
                  View Front Desk Agent →
                </Link>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                Nostavia Front Desk Agent (Hinglish Voice & Patient Support)
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-body max-w-4xl">
                Always-on patient support agent that answers every phone call in Hinglish, names a specific doctor with experience, rules out emergencies, and turns enquiries into booked visits across phone, WhatsApp, and web under your hospital's brand.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#475569]">
              <div><span className="font-bold text-[#0F172A]">Revenue it moves:</span> Inbound call booking conversion & peak load retention.</div>
              <Link
                to="/solutions/front-desk"
                className="bg-[#0F172A] hover:bg-black text-white px-4 py-2 rounded-[2px] text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1"
              >
                See how Front Desk works →
              </Link>
            </div>
          </div>

        </div>

        {/* BUILT FOR YOU HIGHLIGHT BOX */}
        <div className="p-8 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="font-mono text-xs font-bold text-cyan-400">ENGINEERING SERVICE · BUILT-FOR-YOU</div>
          </div>
          <h3 className="font-display font-extrabold text-3xl text-white">Direct Founder Engineering for Custom Hospital Tech</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl font-body">
            Under Solutions Engineering, our founding engineers build hospital-specific technology on top of our core platform: custom department triage flows, bariatric/rehab tracking surfaces, outreach screening tools, or custom HIS connectors. Delivered in 2–4 weeks. You talk directly to the engineers who built the engine.
          </p>
        </div>
      </section>

      {/* 4. DUAL-BRAIN ARCHITECTURE & DIAGRAM */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            TECHNICAL INTEGRATION ARCHITECTURE
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#0F172A] tracking-tight">
            How Nostavia sits on top of your existing HIS
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl leading-relaxed font-body">
            No expensive EMR overhaul. Nostavia ingests discharge briefs, lab PDF feeds, and wearable telemetry into our SOMA Dual-Brain engine, writing back clinical intake briefs to your care team.
          </p>
        </div>

        <ArchitectureDiagram />
      </section>

      {/* 5. HOSPITAL IT & PROCUREMENT FAQ - 2-COLUMN MODERN LAYOUT */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Sticky Title & CTA */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
            <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
              TECHNICAL & IT FAQ
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#0F172A] tracking-tight leading-[1.08]">
              Frequently Asked IT Questions
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Detailed technical answers regarding the Leakage Audit, Attribution Engine, deployment guarantees, and HIS integration architecture.
            </p>
            <div className="pt-2">
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 text-xs font-bold font-display uppercase tracking-wider text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
              >
                Book a technical briefing →
              </Link>
            </div>
          </div>

          {/* Right Column: Accordion Cards */}
          <div className="lg:col-span-7 space-y-3.5">
            {[
              {
                q: "What data does the Leakage Audit require and is it safe?",
                a: "The Leakage Audit uses 12–24 months of anonymized historical data — checkup volumes, discharge records, and chronic-patient visit frequencies. Records are anonymized before export. We never receive names, contact details, MRNs, or any identifier that maps back to a patient — only visit patterns, package types, and dates. All data is handled under a signed data-handling agreement. We return a Leakage Report quantifying leaked revenue in rupees across checkup customers, discharged patients, and dormant chronics."
              },
              {
                q: "How does the Attribution Engine track ROI?",
                a: "Every re-test booking, follow-up OPD visit, and package renewal generated through Nostavia programs is tagged and attributed back to the originating program and patient cohort. The Attribution Engine surfaces this as a live CFO dashboard — revenue generated, cost per recaptured patient, and program-level ROI. It makes performance-based pricing possible because the value is always visible."
              },
              {
                q: "Does Nostavia replace our hospital's existing HIS or EMR system?",
                a: "No. Nostavia is explicitly HIS-neutral. We integrate with whatever HIS exists (KareXpert, Insta by Practo, Napier, Medinous, HealthPlix, etc.) by reading appointments and writing back clinical briefs and recovery progress. Zero modifications to your HIS codebase."
              },
              {
                q: "Where is patient data processed and stored?",
                a: "Personal data is processed on-device via our SOMA-1B privacy layer before de-identified clinical briefs reach our cloud reasoning model. All infrastructure complies with India's DPDP 2023 act and UAE health data laws."
              },
              {
                q: "What is the deployment guarantee for a hospital chain?",
                a: "Program 1 (Smart Reports on the health-check counter) deploys in days with zero integration. The complete patient front door — including Command Center, Attribution Engine, and all four programs — deploys in 60 days. We guarantee the timeline contractually."
              },
              {
                q: "What does the Command Center show?",
                a: "The Command Center is the medical director's morning screen: drift lists showing which chronic patients are deteriorating on which markers, cohort risk maps, program performance analytics, and department-level demand signals. It gets sharper the longer it runs — six months in, the drift detection knows your patient population, not a generic one."
              }
            ].map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className={`border rounded-[4px] transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-[#F8FAFC] border-[#CBD5E1] shadow-sm'
                      : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1]'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left font-display font-extrabold text-base sm:text-lg text-[#0F172A] flex items-center justify-between gap-4"
                  >
                    <span>{faq.q}</span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-[#0F172A] text-white rotate-180' : 'bg-[#F1F5F9] text-[#64748B]'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-[#E2E8F0] font-body">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. FINAL CTA BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-12 sm:p-16 lg:p-20 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] shadow-2xl text-center flex flex-col items-center gap-8">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[54px] text-white max-w-4xl leading-[1.05] tracking-tight">
            Start with a free Leakage Audit
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-body leading-relaxed">
            See the rupee value of leaked patients before signing anything. Then review integration specs, the Attribution Engine, and white-label app customization with our engineering team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/demo"
              className="bg-white hover:bg-slate-100 text-[#0F172A] font-display text-xs font-bold uppercase tracking-wider px-9 py-4 rounded-[2px] shadow-md transition-all inline-flex items-center gap-2"
            >
              Request Leakage Audit
              <ArrowRight className="w-4 h-4 text-[#0F172A]" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HospitalsPlatformPage;
