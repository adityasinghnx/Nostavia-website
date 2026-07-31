import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Building2, 
  Activity, 
  Stethoscope, 
  HeartPulse, 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Award, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Layers,
  Sparkles,
  Database,
  Lock,
  Code,
  Wrench
} from 'lucide-react';

export const HospitalsPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-16 py-8 font-body text-[#0F172A] bg-white">
      
      {/* 1. HERO EXECUTIVE SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-6 sm:p-14 lg:p-16 bg-white border border-[#E2E8F0] rounded-[2px] space-y-8 shadow-none relative overflow-hidden">
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
              NOSTAVIA FOR HOSPITALS & HEALTH SYSTEMS
            </span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-6xl lg:text-7xl text-[#0F172A] tracking-tight max-w-4xl leading-[1.05]">
            Your HIS runs the hospital. Nostavia runs the relationship.
          </h1>

          <p className="text-base sm:text-xl text-[#64748B] max-w-3xl leading-relaxed font-body">
            Hospitals are sold workflow by forty HIS vendors and growth by nobody. Nostavia white-labels the predictive, continuous patient programs of top-five chains onto your existing patient volume — powered by a live intelligence stack and delivered in 60 days.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 pt-2">
            <Link
              to="/demo"
              className="bg-[#000000] hover:bg-[#1A1A1A] text-white font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] shadow-sm transition-all inline-flex items-center justify-center gap-2 text-center"
            >
              Book executive briefing
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/solutions/hospitals"
              className="bg-white hover:bg-slate-50 text-[#0F172A] border border-[#CBD5E1] font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] transition-all text-center"
            >
              Explore Front Door Platform
            </Link>
          </div>

          {/* Key Hospital Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#E2E8F0] font-mono text-xs text-[#0F172A]">
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">60 Days</div>
              <div className="text-[#64748B] font-semibold mt-1">Turnkey Launch Speed</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">4 Programs</div>
              <div className="text-[#64748B] font-semibold mt-1">White-Labelled Patient Offerings</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">Built-For-You</div>
              <div className="text-[#64748B] font-semibold mt-1">Direct Founder Engineering</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">-27%</div>
              <div className="text-[#64748B] font-semibold mt-1">Post-Discharge CHF Mortality Risk</div>
            </div>
          </div>

        </div>
      </section>

      {/* CORE STRATEGIC THESIS BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
        <div className="p-8 sm:p-10 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-3xl">
            <div className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest">
              THE 365-DAY BLIND SPOT
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              "The patient's file lives in your HIS. The patient's life happens outside it."
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body">
              Indian private hospitals run fee-for-service, but CFOs lose sleep over customer leakage: health-check buyers who get a raw PDF and never return, discharged patients who drift to competitors, and chronic patients generating 20+ years of revenue elsewhere. Nostavia stops that leakage between visits.
            </p>
          </div>
          <Link
            to="/demo"
            className="shrink-0 bg-white text-[#0F172A] hover:bg-slate-100 font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-[2px] transition-all"
          >
            Calculate Retained Revenue
          </Link>
        </div>
      </section>

      {/* 2. THE OFFER — FOUR PROGRAMS + BUILT-FOR-YOU */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            WHAT WE SELL & SHIP
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            Four programs on one white-labelled platform
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl leading-relaxed font-body">
            Production-ready health intelligence software deployed seamlessly under your brand — zero HIS replacement, zero hardware liability, zero external dependencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* PROGRAM 1 */}
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-5 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#2563EB]">PROGRAM 01</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                Preventive Program Engine
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-body">
                Upgrades your hospital's health-check packages from a raw PDF transaction to an annual membership under your brand. Includes Smart Reports, biological age, pace of aging, disease-risk scores, digital twin, wearable fusion, AI concierge, and an automated re-test recall engine.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2E8F0] space-y-2 font-mono text-[11px] text-[#475569]">
              <div className="font-bold text-[#0F172A]">The Pitch:</div>
              <div>Top-tier chain predictive health program on your footfall in 60 days.</div>
            </div>
          </div>

          {/* PROGRAM 2 */}
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-5 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#2563EB]">PROGRAM 02</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                Discharge-to-Recovery
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-body">
                Continuity of care layer for every discharged patient: plain-language recovery protocol, medication adherence tracking, wearable telemetry, symptom check-ins, care-team escalation flags, and auto-scheduled follow-up OPD bookings.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2E8F0] space-y-2 font-mono text-[11px] text-[#475569]">
              <div className="font-bold text-[#0F172A]">Clinical & Revenue Impact:</div>
              <div>Captures follow-up OPD visits & addresses the documented 31% discharge completeness gap.</div>
            </div>
          </div>

          {/* PROGRAM 3 */}
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-5 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#2563EB]">PROGRAM 03</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                Chronic Care Programs
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-body">
                Infrastructure for your hospital to run subscription diabetes, cardiac, and metabolic clinics without needing an expensive pharma JV: enrolment, Dexcom CGM & wearable integration, adaptive protocols, care-team dashboard, and concierge.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2E8F0] space-y-2 font-mono text-[11px] text-[#475569]">
              <div className="font-bold text-[#0F172A]">Recurring LTV:</div>
              <div>Taps India's $5.4B RPM market growing at 22.5% CAGR.</div>
            </div>
          </div>

          {/* PROGRAM 4 */}
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-5 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#2563EB]">PROGRAM 04</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                International Patient Continuity
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-body">
                Post-treatment layer for medical-tourism (India–UAE corridor): format-agnostic home-country lab PDF parser, remote monitoring, teleconsult scheduling, and treating-surgeon dashboard. Solves international patient non-return.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2E8F0] space-y-2 font-mono text-[11px] text-[#475569]">
              <div className="font-bold text-[#0F172A]">Target Segment:</div>
              <div>NABH & JCI hospitals courting Gulf, African & CIS patients.</div>
            </div>
          </div>

          {/* THE FIFTH THING WE SELL - BUILT FOR YOU */}
          <div className="p-8 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] space-y-5 hover:border-cyan-800 transition-all flex flex-col justify-between md:col-span-2 lg:col-span-2 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-cyan-400">ENGINEERING SERVICE</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">
                Built-For-You: Direct Systems Engineering
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body">
                We are a technology company that ships fast — and your hospital gets that team directly. Under Solutions Engineering, our founding engineers build hospital-specific technology on top of our core engine: custom department triage flows, bariatric/cardiac rehab surfaces, camp screening tools, or custom HIS connectors. Scoped, priced per engagement, and delivered in weeks.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-white">
              <div><span className="font-bold text-cyan-400">Our Promise:</span> "You will never file a ticket into a vendor queue. You talk directly to the founders who built the engine."</div>
              <div><span className="font-bold text-cyan-400">Timeline:</span> Delivered in 2–4 Weeks</div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. ENTERPRISE ARCHITECTURE & DATA COMPLIANCE */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-8">
        <div className="p-8 sm:p-10 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-6">
          <div className="space-y-2">
            <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
              ENTERPRISE ARCHITECTURE & COMPLIANCE READINESS
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0F172A]">
              Built for HIPAA, DPDP 2023, and ABDM Data Readiness
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] font-body leading-relaxed max-w-3xl">
              Nostavia's patient front door, intelligent decoding stack, and care-team portals are production-ready. Our system architecture complies with global healthcare data standards out of the box.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#64748B] font-body">
            <div className="p-5 bg-white border border-[#E2E8F0] rounded-[2px] space-y-2">
              <div className="font-display font-bold text-sm text-[#0F172A] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                ABDM & ABHA Data Architecture
              </div>
              <div className="leading-relaxed">
                <span className="font-mono text-[10px] font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  ARCHITECTURE READY · CERTIFICATION NOT YET COMPLETED
                </span>
                <p className="mt-1">
                  Engineered to FHIR R4 and ABDM M1–M3 data specifications. Records are structured to FHIR R4 so that ABDM linking is a configuration step, not a re-build, once our certification completes.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-[#E2E8F0] rounded-[2px] space-y-2">
              <div className="font-display font-bold text-sm text-[#0F172A] flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-600" />
                Zero-Friction HIS Integrations
              </div>
              <div className="leading-relaxed">
                <span className="font-mono text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">PRODUCTION CONNECTOR</span>
                <p className="mt-1">
                  Plugs directly into your hospital's existing HIS or EMR via standard REST APIs, HL7, or FHIR feeds — reading appointment schedules and writing back clinical intake briefs with zero workflow disruption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUR LEAKAGE POINTS SEALED (HOSPITAL ECONOMICS) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            HOSPITAL CFO & CMO ECONOMICS
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            Stop revenue walking out the door between visits
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl leading-relaxed font-body">
            Hospital EBITDA runs 12–18% at maturity. Converting existing footfall into recurring memberships and repeat diagnostic volume clears internal funding bars without new capex or headcount.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-8 bg-white border border-[#E2E8F0] rounded-[2px] space-y-4">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono">
              1
            </div>
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">Health-Check Package Conversion</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Today, a customer pays ₹6,000–₹15,000 for an executive checkup, receives a static PDF, and disappears. Nostavia transforms static PDFs into Smart Reports with biological age and automated recall, lifting annual checkup renewals and OPD conversion by 10–15%.
            </p>
          </div>

          <div className="p-8 bg-white border border-[#E2E8F0] rounded-[2px] space-y-4">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono">
              2
            </div>
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">Post-Discharge OPD Retention</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Discharged surgical and IPD patients frequently miss follow-up consults or go to local providers. Automated recovery tracking and auto-scheduled OPD bookings capture follow-up revenue back into your facility.
            </p>
          </div>

          <div className="p-8 bg-white border border-[#E2E8F0] rounded-[2px] space-y-4">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono">
              3
            </div>
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">Chronic Disease Lifetime Value (LTV)</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Diabetic, hypertensive, and thyroid patients generate 20+ years of predictable revenue somewhere. Subscription care programs keep those patients tied directly to your hospital care team.
            </p>
          </div>

          <div className="p-8 bg-white border border-[#E2E8F0] rounded-[2px] space-y-4">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono">
              4
            </div>
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">International Patient Follow-up</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Medical tourists flying back to GCC, Africa, or CIS countries drop off radar after discharge. Cross-border lab ingestion and teleconsults turn one-off surgeries into continuous referral networks.
            </p>
          </div>

        </div>
      </section>

      {/* 5. WHAT WE DO NOT SELL (THE DISCIPLINE) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-8">
        <div className="p-8 sm:p-12 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-6">
          <div className="space-y-2">
            <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
              OUR ARCHITECTURAL DISCIPLINE
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0F172A]">
              What we do NOT sell — clear boundaries for hospital IT & clinical leads
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#64748B] leading-relaxed font-body">
            <div className="p-5 bg-white border border-[#E2E8F0] rounded-[2px] space-y-2">
              <div className="font-display font-bold text-sm text-[#0F172A]">We are NOT an HIS replacement</div>
              <div>Forty HIS vendors fight over EMR and billing at collapsing prices. Nostavia sits on top: different budget, different buyer, different job. Our booking ships only where no digital front door exists.</div>
            </div>

            <div className="p-5 bg-white border border-[#E2E8F0] rounded-[2px] space-y-2">
              <div className="font-display font-bold text-sm text-[#0F172A]">We are NOT an RPM device company</div>
              <div>Partner devices produce the telemetry; Nostavia is strictly the software interpretation layer. Zero hardware liability, zero logistics.</div>
            </div>

            <div className="p-5 bg-white border border-[#E2E8F0] rounded-[2px] space-y-2">
              <div className="font-display font-bold text-sm text-[#0F172A]">We are NOT autonomous diagnosis</div>
              <div>Clinician-supervised decision support with advisory-bench validation — keeping deployments strictly outside high-risk device classification.</div>
            </div>

            <div className="p-5 bg-white border border-[#E2E8F0] rounded-[2px] space-y-2">
              <div className="font-display font-bold text-sm text-[#0F172A]">No unmeasured clinical claims</div>
              <div>Published peer-reviewed literature carries category claims; our own pilots carry our hospital numbers. Clear and visible in every deck.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING & DEPLOYMENT MODEL (v2) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            PROGRAM PRICING MODEL (v2)
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            Priced per program, backed by leakage economics
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl leading-relaxed font-body">
            Every relationship starts with <span className="font-bold text-[#0F172A]">Smart Reports on the health-check counter</span> (per-report pricing, zero integration, live in days). Then scale to full platform programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-body">
          
          <div className="p-8 bg-white border border-[#E2E8F0] rounded-[2px] space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="font-mono text-xs font-bold text-[#64748B] uppercase">COMMUNITY HOSPITALS</div>
              <div className="space-y-1">
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A]">₹24,999 <span className="text-xs font-normal text-[#64748B]">/ month</span></div>
                <div className="font-mono text-xs font-semibold text-[#2563EB]">AED 1,199 / month ($325)</div>
              </div>
              <p className="text-xs text-[#64748B]">Facilities under 100 beds requiring a complete white-labeled digital front door & patient portal.</p>
            </div>
            <ul className="space-y-2.5 text-xs text-[#0F172A] border-t border-[#E2E8F0] pt-4 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Branded App & Patient Portal</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Program 1 (Preventive Engine)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Wearable Telemetry & Concierge</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Setup: ₹25,000 / AED 1,500 one-time</li>
            </ul>
          </div>

          <div className="p-8 bg-[#0F172A] text-white border border-[#1E293B] rounded-[2px] space-y-6 flex flex-col justify-between shadow-xl relative">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-amber-400 text-[#0F172A] font-mono text-[10px] font-bold uppercase rounded-[2px]">
              MOST POPULAR BEACHHEAD
            </div>
            <div className="space-y-4">
              <div className="font-mono text-xs font-bold text-amber-400 uppercase">REGIONAL CHAINS & MULTISPECIALTY</div>
              <div className="space-y-1">
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-white">₹59,999 <span className="text-xs font-normal text-slate-300">/ month</span></div>
                <div className="font-mono text-xs font-semibold text-amber-400">AED 2,899 / month ($790)</div>
              </div>
              <p className="text-xs text-slate-300">100–300 bed regional hospital chains focused on health-check retention & discharge recovery.</p>
            </div>
            <ul className="space-y-2.5 text-xs text-white border-t border-slate-800 pt-4 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Program 1 + Program 2 (Discharge)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Care-Team Escalation Dashboards</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> HIS Integration Connectors</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Priority Founder Engineering</li>
            </ul>
          </div>

          <div className="p-8 bg-white border border-[#E2E8F0] rounded-[2px] space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="font-mono text-xs font-bold text-[#64748B] uppercase">ENTERPRISE CHAINS & GCC</div>
              <div className="space-y-1">
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A]">From ₹1,29,999 <span className="text-xs font-normal text-[#64748B]">/ mo</span></div>
                <div className="font-mono text-xs font-semibold text-[#2563EB]">AED 6,500 / month ($1,750)</div>
              </div>
              <p className="text-xs text-[#64748B]">300+ beds, multi-hospital groups, and international patient programs with custom workflows.</p>
            </div>
            <ul className="space-y-2.5 text-xs text-[#0F172A] border-t border-[#E2E8F0] pt-4 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> All Platform Programs Included</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> International Patient Desk</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Built-For-You Custom Engineering</li>
            </ul>
          </div>

        </div>
      </section>

      {/* 7. FAQ SECTION - 2-COLUMN MODERN PREMIUM LAYOUT */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Sticky Title & Briefing CTA */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
            <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#0F172A] tracking-tight leading-[1.08]">
              Hospital Leadership FAQ
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Everything you need to know about deployment timelines, HIS integrations, and our engineering capabilities.
            </p>
            <div className="pt-2">
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 text-xs font-bold font-display uppercase tracking-wider text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
              >
                Schedule an executive briefing →
              </Link>
            </div>
          </div>

          {/* Right Column: Full-Width Accordion Cards */}
          <div className="lg:col-span-7 space-y-3.5">
            {[
              {
                q: "How fast can Nostavia be deployed in a 100–300 bed hospital?",
                a: "Program 1 (Smart Reports on the health-check counter) deploys in days with zero HIS integration required. Full front-door integration takes 60 days."
              },
              {
                q: "How does Nostavia integrate with our existing HIS / EHR?",
                a: "Nostavia reads appointment schedules and patient profile IDs via standard REST APIs / HL7 / FHIR feeds, writing back structured clinical briefs and recovery progress without modifying your HIS core."
              },
              {
                q: "Can Nostavia build custom features specific to our hospital's clinical department?",
                a: "Yes. Under Built-For-You (Solutions Engineering), our founding engineers build hospital-specific triage flows, bariatric/rehab tracking, outreach screening tools, or custom HIS connectors in 2–4 weeks."
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

      {/* 8. FOOTER CTA BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-12 sm:p-16 lg:p-20 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] shadow-2xl text-center flex flex-col items-center gap-8">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-white max-w-4xl leading-[1.05] tracking-tight">
            Give your hospital system top-tier predictive intelligence programs in 60 days
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-body leading-relaxed">
            Schedule an executive briefing with our founders to model attributable revenue and review pilot timelines.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/demo"
              className="bg-white hover:bg-slate-100 text-[#0F172A] font-display text-xs font-bold uppercase tracking-wider px-9 py-4 rounded-[2px] shadow-md transition-all inline-flex items-center gap-2"
            >
              Book executive briefing
              <ArrowRight className="w-4 h-4 text-[#0F172A]" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HospitalsPage;
