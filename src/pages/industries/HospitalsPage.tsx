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
  Wrench,
  BarChart3,
  Search,
  Target,
  FileSearch,
  LayoutDashboard,
  Brain
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
            We white-label predictive patient programs onto your existing checkup, discharge and chronic volume — under your brand, live in 60 days. Then we show you, in rupees, exactly what they brought back.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 pt-2">
            <Link
              to="/demo"
              className="bg-[#000000] hover:bg-[#1A1A1A] text-white font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] shadow-sm transition-all inline-flex items-center justify-center gap-2 text-center"
            >
              Request a free Leakage Audit
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
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">Free</div>
              <div className="text-[#64748B] font-semibold mt-1">Leakage Audit · No Commitment</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">60 Days</div>
              <div className="text-[#64748B] font-semibold mt-1">Guaranteed Deployment</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">Live ROI</div>
              <div className="text-[#64748B] font-semibold mt-1">CFO Attribution Dashboard</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">Pay on Value</div>
              <div className="text-[#64748B] font-semibold mt-1">Performance-Linked Pricing</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE LEAKAGE AUDIT — THE FREE WEAPON */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
        <div className="p-8 sm:p-12 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <FileSearch className="w-5 h-5 text-cyan-400" />
                <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest">
                  THE LEAKAGE AUDIT — FREE, BEFORE ANY CONTRACT
                </span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white leading-tight">
                How much repeat revenue did you leak last year? Most hospitals have never been able to answer that question.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body">
                Before any contract, share 12–24 months of anonymized historical data — checkup transactions, OPD visits, discharge records. We return a <span className="text-white font-bold">Leakage Report</span> within two weeks: how many checkup customers never returned, how many discharged patients had no follow-up, how many chronic patients went dormant — and the rupee value of each bucket, computed on your own price list. Anonymized data only, processed under a signed data-handling agreement, deleted after the audit.
              </p>
            </div>
            <Link
              to="/demo"
              className="shrink-0 bg-white text-[#0F172A] hover:bg-slate-100 font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-[2px] transition-all text-center"
            >
              Request Free Audit
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <div className="p-4 bg-slate-900/60 rounded-[2px] border border-slate-800">
              <div className="font-display font-extrabold text-xl text-cyan-400">1.</div>
              <div className="font-display font-bold text-sm text-white mt-1">Share Anonymized Data</div>
              <div className="text-[11px] text-slate-400 mt-1 font-body">CSV, Excel, or even PDF dumps — our parser handles any HIS export format.</div>
            </div>
            <div className="p-4 bg-slate-900/60 rounded-[2px] border border-slate-800">
              <div className="font-display font-extrabold text-xl text-cyan-400">2.</div>
              <div className="font-display font-bold text-sm text-white mt-1">Receive Leakage Report</div>
              <div className="text-[11px] text-slate-400 mt-1 font-body">Patient-level breakdown with rupee value of each revenue leak bucket in two weeks.</div>
            </div>
            <div className="p-4 bg-slate-900/60 rounded-[2px] border border-slate-800">
              <div className="font-display font-extrabold text-xl text-cyan-400">3.</div>
              <div className="font-display font-bold text-sm text-white mt-1">Decide With Your Own Numbers</div>
              <div className="text-[11px] text-slate-400 mt-1 font-body">No pitch deck. Your own data, your own price list, your own leaked crores on a page.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE MECHANISMS — THE NERVOUS SYSTEM */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            THE THREE MECHANISMS
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            The nervous system that makes value undeniable
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl leading-relaxed font-body">
            The four programs are the muscles. These three mechanisms are why a hospital feels the value instead of taking our word for it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-5 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <FileSearch className="w-8 h-8 text-[#2563EB]" />
              <h3 className="font-display font-extrabold text-xl text-[#0F172A]">
                Leakage Audit
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-body">
                Free pre-contract analysis using 12–24 months of anonymized hospital data. Returns a rupee-valued leakage report showing exactly where patients drop off — checkup non-renewals, missed follow-ups, dormant chronics. The first meeting becomes their own number on a page.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2E8F0] font-mono text-[11px] text-[#475569]">
              No HIS vendor offers this — running it requires an analytical engine, not a records system.
            </div>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-5 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <BarChart3 className="w-8 h-8 text-[#2563EB]" />
              <h3 className="font-display font-extrabold text-xl text-[#0F172A]">
                Attribution Engine
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-body">
                Every re-test booked from a recall, every follow-up OPD captured from a discharge protocol, every package renewal from a Smart Report journey — tagged, attributed, and priced in a live dashboard the CFO owns. Platform-attributed revenue vs. platform cost, updated daily.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2E8F0] font-mono text-[11px] text-[#475569]">
              ROI as a number on a screen, not a claim in a slide deck.
            </div>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-5 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <LayoutDashboard className="w-8 h-8 text-[#2563EB]" />
              <h3 className="font-display font-extrabold text-xl text-[#0F172A]">
                Command Center
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-body">
                The hospital's population intelligence brain: drift lists (which chronic patients are deteriorating on which markers, ranked by urgency), cohort risk maps, program performance, department-level demand signals. The medical director's morning screen.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2E8F0] font-mono text-[11px] text-[#475569]">
              Gets sharper the longer it runs. Six months in, the drift detection knows your patient population — not a generic one.
            </div>
          </div>

        </div>
      </section>

      {/* 4. THE FOUR PROGRAMS — THE MUSCLES */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            THE FOUR PROGRAMS
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            White-labelled under your brand, attributed in your dashboard
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl leading-relaxed font-body">
            Each program generates revenue that the Attribution Engine tracks to the transaction. The value is never a debate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* PROGRAM 1 */}
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-5 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="font-mono text-xs font-bold text-[#2563EB]">PROGRAM 01</div>
              <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                Preventive Program Engine
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-body">
                Upgrades your hospital's health-check packages from a raw PDF transaction to an annual membership under your brand. Includes Smart Reports, biological age, pace of aging, disease-risk scores, digital twin, wearable fusion, AI concierge, and an automated re-test recall engine.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2E8F0] font-mono text-[11px] text-[#475569]">
              <span className="font-bold text-[#0F172A]">Revenue it moves:</span> Package renewal rate, OPD conversion from checkups.
            </div>
          </div>

          {/* PROGRAM 2 */}
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-5 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="font-mono text-xs font-bold text-[#2563EB]">PROGRAM 02</div>
              <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                Discharge-to-Recovery
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-body">
                Continuity of care layer for every discharged patient: plain-language recovery protocol, medication adherence tracking, wearable telemetry, symptom check-ins, care-team escalation flags, and auto-scheduled follow-up OPD bookings.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2E8F0] space-y-1 font-mono text-[11px] text-[#475569]">
              <div><span className="font-bold text-[#0F172A]">Revenue it moves:</span> Follow-up OPD capture rate.</div>
              <div className="text-[10px] italic">Published evidence: structured post-discharge care cuts all-cause CHF mortality by ~27% (PMC meta-analysis).</div>
            </div>
          </div>

          {/* PROGRAM 3 */}
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-5 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="font-mono text-xs font-bold text-[#2563EB]">PROGRAM 03</div>
              <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                Chronic Care Programs
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-body">
                Infrastructure for your hospital to run subscription diabetes, cardiac, and metabolic clinics without needing an expensive pharma JV: enrolment, Dexcom CGM & wearable integration, adaptive protocols, care-team dashboard, and concierge.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2E8F0] font-mono text-[11px] text-[#475569]">
              <span className="font-bold text-[#0F172A]">Revenue it moves:</span> Chronic patient LTV retained at your facility.
            </div>
          </div>

          {/* PROGRAM 4 */}
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-5 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="font-mono text-xs font-bold text-[#2563EB]">PROGRAM 04</div>
              <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                International Patient Continuity
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-body">
                Post-treatment layer for medical-tourism (India–UAE corridor): format-agnostic home-country lab PDF parser, remote monitoring, teleconsult scheduling, and treating-surgeon dashboard. Solves international patient non-return.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2E8F0] font-mono text-[11px] text-[#475569]">
              <span className="font-bold text-[#0F172A]">Revenue it moves:</span> International referral & return visit revenue.
            </div>
          </div>

          {/* PROGRAM 05 — FRONT DESK AI VOICE & PATIENT SUPPORT AGENT */}
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-5 hover:border-[#CBD5E1] transition-all flex flex-col justify-between md:col-span-2">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="font-mono text-xs font-bold text-[#2563EB]">PROGRAM 05 · VOICE & CHAT</div>
                <Link
                  to="/solutions/front-desk"
                  className="font-mono text-xs font-bold text-[#0F172A] hover:text-[#2563EB] inline-flex items-center gap-1.5 underline"
                >
                  View Front Desk Agent Copy & Walkthrough →
                </Link>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                Nostavia Front Desk Agent (Hinglish Voice & Patient Support)
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-body max-w-4xl">
                Always-on patient support agent that answers every phone call in Hinglish, names a specific doctor with experience, rules out emergencies, and turns enquiries into booked visits. Operates seamlessly across telephony, WhatsApp, and website chat under your hospital's brand.
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

        {/* BUILT-FOR-YOU */}
        <div className="p-8 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] space-y-5 hover:border-cyan-800 transition-all shadow-xl">
          <div className="space-y-4">
            <span className="font-mono text-xs font-bold text-cyan-400">ENGINEERING SERVICE</span>
            <h3 className="font-display font-extrabold text-2xl text-white">
              Built-For-You: Direct Founder Engineering
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body">
              Our founding engineers build hospital-specific technology on top of our core engine: custom department triage flows, bariatric/cardiac rehab surfaces, camp screening tools, or custom HIS connectors. Scoped, priced per engagement, delivered in 2–4 weeks.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-800 font-mono text-xs text-white">
            <span className="font-bold text-cyan-400">Our Promise:</span> "You will never file a ticket into a vendor queue. You talk directly to the founders who built the engine."
          </div>
        </div>
      </section>

      {/* 5. THE ENTRY SEQUENCE */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-8">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            HOW EVERY ENGAGEMENT BEGINS
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
            Audit → Pilot → Platform — each step self-funding
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white border border-[#E2E8F0] rounded-[2px] space-y-3">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono">1</div>
            <h3 className="font-display font-extrabold text-lg text-[#0F172A]">Leakage Audit</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Free, two weeks, your own data. We show you the crores you're leaking before you pay anything.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E2E8F0] rounded-[2px] space-y-3">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono">2</div>
            <h3 className="font-display font-extrabold text-lg text-[#0F172A]">90-Day Proof Pilot</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Smart Reports on the checkup counter + recall on one dormant cohort. One metric, pre-agreed. <span className="font-bold text-[#0F172A]">If the metric doesn't move, the pilot fee is credited in full.</span>
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E2E8F0] rounded-[2px] space-y-3">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono">3</div>
            <h3 className="font-display font-extrabold text-lg text-[#0F172A]">Platform Contract</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Choose Partner pricing (pay on attributed value) or Flat pricing. Attribution Engine live from day one.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E2E8F0] rounded-[2px] space-y-3">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono">4</div>
            <h3 className="font-display font-extrabold text-lg text-[#0F172A]">60-Day Guarantee</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Full front-door deployment in 60 days or one month of base fees credited per month of delay.
            </p>
          </div>
        </div>
      </section>

      {/* 6. TWO-DOOR PRICING */}
      <section id="pricing" className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10 scroll-mt-24">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            HOSPITAL FRONT-DOOR PLATFORM PRICING
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            We only win big when you do
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl leading-relaxed font-body">
            Hospital platform deployment includes turnkey white-labelled patient programs, the Leakage Audit, Attribution Engine, and Command Center. (For self-serve developer SDK component pricing for healthtech startups, <Link to="/pricing" className="text-[#2563EB] font-bold underline">see developer SDK tiers</Link>).
          </p>
        </div>

        {/* DOOR A - PARTNER PRICING */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 bg-[#0F172A] text-white font-mono text-[11px] font-bold uppercase rounded-[2px]">
              DOOR A · PARTNER PRICING
            </span>
            <span className="text-xs text-[#64748B] font-body">Low base + share of attributed revenue (recommended)</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-body">
            <div className="p-8 bg-white border border-[#E2E8F0] rounded-[2px] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="font-mono text-xs font-bold text-[#64748B] uppercase">COMMUNITY HOSPITALS</div>
                <div className="space-y-1">
                  <div className="font-display font-extrabold text-3xl text-[#0F172A]">₹14,999 <span className="text-xs font-normal text-[#64748B]">base / mo</span></div>
                  <div className="font-mono text-xs font-semibold text-[#2563EB]">+ 8% attributed revenue · capped at 3× base</div>
                </div>
                <p className="text-xs text-[#64748B]">Under 100 beds. Your downside is a modest SaaS fee; upside is shared, bounded, and visible.</p>
              </div>
            </div>

            <div className="p-8 bg-[#0F172A] text-white border border-[#1E293B] rounded-[2px] space-y-4 flex flex-col justify-between shadow-xl relative">
              <div className="absolute -top-3 right-6 px-3 py-1 bg-amber-400 text-[#0F172A] font-mono text-[10px] font-bold uppercase rounded-[2px]">
                MOST POPULAR
              </div>
              <div className="space-y-3">
                <div className="font-mono text-xs font-bold text-amber-400 uppercase">REGIONAL CHAINS & MULTISPECIALTY</div>
                <div className="space-y-1">
                  <div className="font-display font-extrabold text-3xl text-white">₹34,999 <span className="text-xs font-normal text-slate-300">base / mo</span></div>
                  <div className="font-mono text-xs font-semibold text-amber-400">+ 7% attributed revenue · capped at 3× base</div>
                </div>
                <p className="text-xs text-slate-300">100–300 beds. A hospital attributing ₹8L/month of recovered revenue pays ≈ ₹91K/month — and every rupee above base is provably earned.</p>
              </div>
            </div>

            <div className="p-8 bg-white border border-[#E2E8F0] rounded-[2px] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="font-mono text-xs font-bold text-[#64748B] uppercase">ENTERPRISE CHAINS & GCC</div>
                <div className="space-y-1">
                  <div className="font-display font-extrabold text-3xl text-[#0F172A]">₹74,999 <span className="text-xs font-normal text-[#64748B]">base / mo</span></div>
                  <div className="font-mono text-xs font-semibold text-[#2563EB]">+ 5% attributed revenue · capped at 3× base · multi-site</div>
                </div>
                <p className="text-xs text-[#64748B]">300+ beds, multi-hospital groups with custom workflows.</p>
              </div>
            </div>
          </div>
          {/* DOOR A PRICING HONESTY LINE */}
          <div className="p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] font-body text-xs text-[#475569] leading-relaxed">
            <span className="font-bold text-[#0F172A]">A note on the arithmetic:</span> Partner pricing costs more than flat pricing when the platform performs well — that's the point. Choose it if you want your downside capped at ₹34,999. Choose flat if you'd rather cap the upside.
          </div>
        </div>

        {/* DOOR B - FLAT PRICING */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] font-mono text-[11px] font-bold uppercase rounded-[2px]">
              DOOR B · FLAT PRICING
            </span>
            <span className="text-xs text-[#64748B] font-body">For procurement teams that prefer predictable billing</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-body">
            <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] font-bold text-[#64748B] uppercase">COMMUNITY</div>
                <div className="font-display font-extrabold text-xl text-[#0F172A] mt-1">₹24,999 <span className="text-xs font-normal text-[#64748B]">/ mo</span></div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] font-bold text-[#64748B] uppercase">REGIONAL</div>
                <div className="font-display font-extrabold text-xl text-[#0F172A] mt-1">₹59,999 <span className="text-xs font-normal text-[#64748B]">/ mo</span></div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] font-bold text-[#64748B] uppercase">ENTERPRISE</div>
                <div className="font-display font-extrabold text-xl text-[#0F172A] mt-1">₹1,29,999 <span className="text-xs font-normal text-[#64748B]">/ mo</span></div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* GULF PRICING */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] font-mono text-[11px] font-bold uppercase rounded-[2px]">
              GULF & UAE PRICING
            </span>
            <span className="text-xs text-[#64748B] font-body">Anchored to Gulf hospital procurement standards</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-body">
            <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px]">
              <div className="font-mono text-[10px] font-bold text-[#64748B] uppercase">GULF — STANDARD</div>
              <div className="font-display font-extrabold text-xl text-[#0F172A] mt-1">AED 5,500 <span className="text-xs font-normal text-[#64748B]">/ mo flat</span></div>
              <div className="text-[11px] text-[#64748B] mt-1">Or base + 6% attributed (Partner)</div>
            </div>
            <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px]">
              <div className="font-mono text-[10px] font-bold text-[#64748B] uppercase">GULF — MULTISPECIALTY</div>
              <div className="font-display font-extrabold text-xl text-[#0F172A] mt-1">AED 12,000 <span className="text-xs font-normal text-[#64748B]">/ mo flat</span></div>
              <div className="text-[11px] text-[#64748B] mt-1">Or base + 6% attributed (Partner)</div>
            </div>
            <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px]">
              <div className="font-mono text-[10px] font-bold text-[#64748B] uppercase">GULF — ENTERPRISE</div>
              <div className="font-display font-extrabold text-xl text-[#0F172A] mt-1">AED 25,000+ <span className="text-xs font-normal text-[#64748B]">/ mo flat</span></div>
              <div className="text-[11px] text-[#64748B] mt-1">Or base + 6% attributed (Partner)</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6B. WHAT YOUR TEAM HAS TO DO */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-8">
        <div className="p-8 sm:p-12 bg-white border border-[#E2E8F0] rounded-[2px] space-y-6">
          <div className="space-y-2">
            <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
              WHAT YOUR TEAM HAS TO DO
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0F172A]">
              Minimal effort from your side — no new headcount
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-2">
              <div className="font-display font-bold text-sm text-[#0F172A]">Leakage Audit</div>
              <div className="text-xs text-[#64748B] leading-relaxed font-body">One data export from your HIS team. No meetings required.</div>
            </div>
            <div className="p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-2">
              <div className="font-display font-bold text-sm text-[#0F172A]">Pilot</div>
              <div className="text-xs text-[#64748B] leading-relaxed font-body">One point of contact, roughly two hours a week.</div>
            </div>
            <div className="p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-2">
              <div className="font-display font-bold text-sm text-[#0F172A]">Deployment</div>
              <div className="text-xs text-[#64748B] leading-relaxed font-body">Your brand assets, one IT contact for the connector. We do the rest.</div>
            </div>
            <div className="p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-2">
              <div className="font-display font-bold text-sm text-[#0F172A]">Ongoing</div>
              <div className="text-xs text-[#64748B] leading-relaxed font-body">No new headcount. The Command Center is designed for staff you already have.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHAT WE DO NOT SELL */}
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
              <div>Published peer-reviewed literature carries category claims. The Attribution Engine carries our hospital numbers — which is precisely why it exists.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ENTERPRISE ARCHITECTURE & DATA COMPLIANCE */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-8">
        <div className="p-8 sm:p-10 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-6">
          <div className="space-y-2">
            <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
              ENTERPRISE ARCHITECTURE & COMPLIANCE
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0F172A]">
              Built for HIPAA, DPDP 2023, and ABDM Data Readiness
            </h2>
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

      {/* 8B. CREDIBILITY — WHO ELSE USES THIS */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-8">
        <div className="p-8 sm:p-12 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] shadow-xl space-y-6">
          <div className="space-y-2">
            <div className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest">
              WHERE WE STAND TODAY
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              Early. And we'll say so plainly.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-[2px] space-y-2">
              <div className="font-display font-bold text-sm text-white">Live in production</div>
              <div className="text-xs text-slate-300 leading-relaxed font-body">Full stack running today. Our reference app is on both stores with 2,000+ users.</div>
            </div>
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-[2px] space-y-2">
              <div className="font-display font-bold text-sm text-white">A paying client</div>
              <div className="text-xs text-slate-300 leading-relaxed font-body">Live360Degrees runs its smart-report engine on Nostavia. Available as a reference.</div>
            </div>
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-[2px] space-y-2">
              <div className="font-display font-bold text-sm text-white">Clinical governance</div>
              <div className="text-xs text-slate-300 leading-relaxed font-body">Seven-member advisory bench — GMC-registered physicians, a senior IISc scientist, UCL-trained clinical nutrition. Protocol outputs validated before they reach any partner.</div>
            </div>
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-[2px] space-y-2">
              <div className="font-display font-bold text-sm text-white">Programmes</div>
              <div className="text-xs text-slate-300 leading-relaxed font-body">NVIDIA Inception · Google for Startups · Microsoft for Startups.</div>
            </div>
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-[2px] space-y-2 sm:col-span-2">
              <div className="font-display font-bold text-sm text-white">Hospitals: you'd be early</div>
              <div className="text-xs text-slate-300 leading-relaxed font-body">We'll say so plainly — and the free audit, the credited pilot, and the deployment guarantee exist because of it.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
            <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#0F172A] tracking-tight leading-[1.08]">
              Hospital Leadership FAQ
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Everything you need to know about the Leakage Audit, Attribution Engine, deployment guarantees, and our engineering capabilities.
            </p>
            <div className="pt-2">
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 text-xs font-bold font-display uppercase tracking-wider text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
              >
                Request a free Leakage Audit →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3.5">
            {[
              {
                q: "What does the free Leakage Audit actually show us?",
                a: "A rupee-valued report computed on your own price list: how many checkup customers never returned, how many discharged patients had no follow-up visit, how many chronic patients went dormant — with the revenue value of each bucket. Anonymized data only, processed under a signed data-handling agreement."
              },
              {
                q: "What happens if the 90-day pilot doesn't move our numbers?",
                a: "The pilot fee is credited in full against any future contract — or you simply walk. We control the variables enough to offer this with confidence."
              },
              {
                q: "How does the Attribution Engine work?",
                a: "Every re-test, follow-up OPD, and package renewal generated through Nostavia is tagged and priced in a live dashboard your CFO owns. Platform-attributed revenue vs. platform cost, updated daily. ROI as a number on a screen, not a claim in a renewal deck."
              },
              {
                q: "What is the 60-day deployment guarantee?",
                a: "Full patient front-door deployment in 60 days or one month of base fees credited per month of delay. We are fast — and we should be penalized when we aren't."
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

      {/* 10. FOOTER CTA BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-12 sm:p-16 lg:p-20 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] shadow-2xl text-center flex flex-col items-center gap-8">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[54px] text-white max-w-4xl leading-[1.05] tracking-tight">
            See your own leaked revenue before you pay a rupee
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-body leading-relaxed">
            Request a free Leakage Audit. Two weeks, your own data, your own numbers. Then decide.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/demo"
              className="bg-white hover:bg-slate-100 text-[#0F172A] font-display text-xs font-bold uppercase tracking-wider px-9 py-4 rounded-[2px] shadow-md transition-all inline-flex items-center gap-2"
            >
              Request free Leakage Audit
              <ArrowRight className="w-4 h-4 text-[#0F172A]" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HospitalsPage;
