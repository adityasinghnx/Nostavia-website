import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Code, 
  Layers, 
  Smartphone, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  Activity, 
  Stethoscope, 
  Database, 
  Clock, 
  Lock, 
  Zap, 
  ChevronDown, 
  ChevronUp,
  FileText,
  Wrench
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
              EMBEDDABLE PLATFORM & SDKs
            </span>
            <span className="px-2.5 py-0.5 bg-[#FFF7ED] border border-[#FED7AA] text-[#9A3412] font-mono text-[10px] font-bold uppercase rounded-[2px]">
              HOSPITAL PATIENT FRONT DOOR PLATFORM (v2)
            </span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#0F172A] tracking-tight max-w-4xl leading-[1.02]">
            The 4-Program Patient Front Door Platform.
          </h1>

          <p className="text-base sm:text-xl text-[#64748B] max-w-3xl leading-relaxed font-body">
            A turnkey intelligence platform that sits on top of your existing HIS to deliver predictive, personalized health programs under your brand in 60 days. Includes branded mobile apps, patient portal, booking layer, and direct founder engineering.
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
              View Hospital Offer Strategy (v2)
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

      {/* 2. THE 4 EMBEDDABLE PROGRAMS + BUILT FOR YOU */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            PLATFORM ARCHITECTURE & OFFERINGS
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            Four programs + direct engineering service
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl leading-relaxed font-body">
            Each program can be deployed independently or as a unified hospital front door. Nostavia operates the underlying AI, lab decoding, and wearable handling while keeping your brand front and center.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#2563EB]">PROGRAM 01</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">Preventive Program Engine</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Converts health checkups from static PDFs into interactive Smart Reports with biological age, pace of aging, digital twin simulation, wearable connection, and automated re-test recall schedules.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#2563EB]">PROGRAM 02</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">Discharge-to-Recovery Engine</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Plain-language recovery protocols, medication schedules with adherence tracking, wearable telemetry, symptom check-ins, care-team escalation flags, and auto-scheduled follow-up OPD bookings.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#2563EB]">PROGRAM 03</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">Chronic Care Subscription Programs</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Turnkey program management for subscription diabetes, cardiac, and metabolic clinics. Integrates Dexcom CGMs, wearable feeds, adaptive protocol updates, and care-team dashboards.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#2563EB]">PROGRAM 04</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">International Patient Continuity</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Post-treatment layer for medical-tourism (India–UAE corridor): format-agnostic lab PDF parser for home-country lab results, remote monitoring, teleconsult scheduling, and surgeon dashboard.
            </p>
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

      {/* 3. DUAL-BRAIN ARCHITECTURE & DIAGRAM */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            TECHNICAL INTEGRATION ARCHITECTURE
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            How Nostavia sits on top of your existing HIS
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl leading-relaxed font-body">
            No expensive EMR overhaul. Nostavia ingests discharge briefs, lab PDF feeds, and wearable telemetry into our SOMA Dual-Brain engine, writing back clinical intake briefs to your care team.
          </p>
        </div>

        <ArchitectureDiagram />
      </section>

      {/* 4. HOSPITAL IT & PROCUREMENT FAQ - 2-COLUMN MODERN LAYOUT */}
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
              Detailed technical answers regarding EHR data pipelines, SOMA-1B privacy models, and rapid deployment schedules.
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
                q: "Does Nostavia replace our hospital's existing HIS or EMR system?",
                a: "No. Nostavia is explicitly HIS-neutral. We integrate with whatever HIS exists (KareXpert, Insta by Practo, Napier, Medinous, HealthPlix, etc.) by reading appointments and writing back clinical briefs and recovery progress."
              },
              {
                q: "Where is patient data processed and stored?",
                a: "Personal data is processed on-device via our SOMA-1B privacy layer before de-identified clinical briefs reach our cloud reasoning model. All infrastructure complies with India's DPDP 2023 act and UAE health data laws."
              },
              {
                q: "What is the implementation timeline for a regional hospital chain?",
                a: "Program 1 (Smart Reports on the health-check counter) deploys in days with zero integration. The complete patient front door deploys in 60 days."
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

      {/* 5. FINAL CTA BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-12 sm:p-16 lg:p-20 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] shadow-2xl text-center flex flex-col items-center gap-8">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-white max-w-4xl leading-[1.05] tracking-tight">
            Schedule a technical platform briefing
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-body leading-relaxed">
            Review integration specs, HIS data pipelines, and white-label app customization with our engineering team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/demo"
              className="bg-white hover:bg-slate-100 text-[#0F172A] font-display text-xs font-bold uppercase tracking-wider px-9 py-4 rounded-[2px] shadow-md transition-all inline-flex items-center gap-2"
            >
              Book technical briefing
              <ArrowRight className="w-4 h-4 text-[#0F172A]" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HospitalsPlatformPage;
