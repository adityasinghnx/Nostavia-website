import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ClientShowcaseGrid } from '../components/ClientShowcaseGrid';

export const CompanyPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-20 py-10 font-body text-[#0F172A] bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-8 sm:p-14 lg:p-16 bg-white border border-[#E2E8F0] rounded-[2px] space-y-8 shadow-none relative overflow-hidden">
          
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            ABOUT NOSTAVIA TECHNOLOGIES
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#0F172A] tracking-tight max-w-4xl leading-[1.02]">
            Building the intelligence layer the health economy is missing.
          </h1>

          <p className="text-base sm:text-xl text-[#64748B] max-w-3xl leading-relaxed font-body">
            We build whole-body health-intelligence infrastructure that diagnostic chains, clinics, wellness platforms, and insurers embed inside their own products under their own brand.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to="/demo"
              className="bg-[#000000] hover:bg-[#1A1A1A] text-white font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] shadow-sm transition-all inline-flex items-center gap-2"
            >
              Contact founding team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 2. FOUNDING TEAM */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            FOUNDING LEADERSHIP
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            Founder-built by biotechnology & AI engineers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[2px] bg-[#0F172A] text-white font-display font-extrabold text-lg flex items-center justify-center">
                AS
              </div>
              <div>
                <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">Aditya Singh</h3>
                <div className="text-xs text-[#64748B] font-mono font-bold">Co-founder & Chief Executive Officer</div>
              </div>
            </div>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Leads product architecture, go-to-market strategy, and the clinical-data pipeline. Co-built the live production SOMA AI stack.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[2px] bg-[#0F172A] text-white font-display font-extrabold text-lg flex items-center justify-center">
                AG
              </div>
              <div>
                <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">Anushka Gupta</h3>
                <div className="text-xs text-[#64748B] font-mono font-bold">Co-founder & Chief Technology Officer</div>
              </div>
            </div>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Leads AI model architecture, on-device training, and MLOps. Architected the SOMA Dual-Brain framework and clinical intelligence stack.
            </p>
          </div>

        </div>
      </section>

      {/* 3. SCIENTIFIC & CLINICAL ADVISORY BENCH */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            CLINICAL & SCIENTIFIC ADVISORY BENCH
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            Supervised by medical leaders & research scientists
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-3 hover:border-[#CBD5E1] transition-all">
            <div className="font-display font-extrabold text-lg text-[#0F172A]">Dr. Sparsh Sehdev</div>
            <div className="text-xs text-[#64748B] font-mono font-bold">MBBS, GMC Registered (UK)</div>
            <div className="text-xs text-[#64748B] font-body">11,000+ patients treated across clinical longevity & general medicine.</div>
          </div>

          <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-3 hover:border-[#CBD5E1] transition-all">
            <div className="font-display font-extrabold text-lg text-[#0F172A]">Aakanksha Pant, PhD</div>
            <div className="text-xs text-[#64748B] font-mono font-bold">Chief Longevity Officer</div>
            <div className="text-xs text-[#64748B] font-body">Senior Scientist, IISc Bangalore; aging & development biology specialist.</div>
          </div>

          <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-3 hover:border-[#CBD5E1] transition-all">
            <div className="font-display font-extrabold text-lg text-[#0F172A]">Dr. Vivek Rai</div>
            <div className="text-xs text-[#64748B] font-mono font-bold">MBBS, MD Pharmacology</div>
            <div className="text-xs text-[#64748B] font-body">Principal Investigator in clinical trials; diabetes and hypertension.</div>
          </div>

          <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-3 hover:border-[#CBD5E1] transition-all">
            <div className="font-display font-extrabold text-lg text-[#0F172A]">Sharwani Walke</div>
            <div className="text-xs text-[#64748B] font-mono font-bold">Chief Nutrition Officer</div>
            <div className="text-xs text-[#64748B] font-body">MSc Clinical Nutrition, University College London (UCL).</div>
          </div>

          <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-3 hover:border-[#CBD5E1] transition-all">
            <div className="font-display font-extrabold text-lg text-[#0F172A]">Dr. Akshita Gupta</div>
            <div className="text-xs text-[#64748B] font-mono font-bold">MBBS Specialist</div>
            <div className="text-xs text-[#64748B] font-body">Chronic conditions, pediatrics, dermatology, and general medicine.</div>
          </div>

          <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-3 hover:border-[#CBD5E1] transition-all">
            <div className="font-display font-extrabold text-lg text-[#0F172A]">Anmol Udhad</div>
            <div className="text-xs text-[#64748B] font-mono font-bold">Sports Nutritionist (ISSA), MBA</div>
            <div className="text-xs text-[#64748B] font-body">Formerly Bain & Company; sports performance & metabolic protocol design.</div>
          </div>

          <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-3 hover:border-[#CBD5E1] transition-all">
            <div className="font-display font-extrabold text-lg text-[#0F172A]">Dr. Dipa Patle</div>
            <div className="text-xs text-[#64748B] font-mono font-bold">Ayurvedic Doctor (BAMS)</div>
            <div className="text-xs text-[#64748B] font-body">Head of Ayurvedic Department; traditional biomarker correlation.</div>
          </div>

        </div>
      </section>

      {/* 4. CLIENT SHOWCASE GRID */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
        <ClientShowcaseGrid />
      </section>

      {/* 4.5. KISHOK CASE STUDY */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            DELIVERY DEPTH · RURAL PUBLIC HEALTH
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            Kishok — The Village Health Kiosk Platform
          </h2>
          <p className="text-base sm:text-xl text-[#64748B] max-w-3xl leading-relaxed font-body">
            An offline-first health platform across four Uttar Pradesh districts, designed against a 57-household primary survey. Turns the village health worker the state already deploys into a clinical navigator — instead of building an app patients are expected to operate themselves.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono text-sm">
              1
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">The Copilot</h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Hindi voice in, Hindi voice out. Symptoms and vitals go in, structured encounter with danger sign flags, referral decision, and a counselling script comes out. Voice rendered in Awadhi and Bhojpuri inflected Hindi.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono text-sm">
              2
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">Decoded Diagnostics</h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Point of care test taken at the kiosk. Result decoded into plain Hindi, spoken aloud, printed on a take-home card. Patient who cannot read her own report understands her own body in ninety seconds.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono text-sm">
              3
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">Chronic Registry & Recall</h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Screen, register, monitor, refill, recall. Roughly a third of respondents show a chronic disease signal with no existing system. Live from month one.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono text-sm">
              4
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">Medicine Intelligence</h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Demand prediction so the kiosk does not stock out, generic substitution by default, price transparency, live in-stock indicator at the moment of prescribing.
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <div className="p-4 bg-white border border-[#E2E8F0] border-l-4 border-l-[#0F172A] rounded-[2px] font-mono text-xs text-[#0F172A] leading-relaxed">
            <span className="font-bold">4 Districts</span> — Chitrakoot, Pratapgarh, Kaushambi, Prayagraj
          </div>
          <div className="p-4 bg-white border border-[#E2E8F0] border-l-4 border-l-[#0F172A] rounded-[2px] font-mono text-xs text-[#0F172A] leading-relaxed">
            <span className="font-bold">10,000</span> — Households per hub cluster
          </div>
          <div className="p-4 bg-white border border-[#E2E8F0] border-l-4 border-l-[#0F172A] rounded-[2px] font-mono text-xs text-[#0F172A] leading-relaxed">
            <span className="font-bold">Offline-First</span> — Full day of visits, zero network dependency
          </div>
          <div className="p-4 bg-white border border-[#E2E8F0] border-l-4 border-l-[#0F172A] rounded-[2px] font-mono text-xs text-[#0F172A] leading-relaxed">
            <span className="font-bold">57 Households</span> — Primary survey powering the design
          </div>
        </div>
      </section>

      {/* 5. COMPANY TRACTION & GRANT SUPPORT */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            TRACTION & ECOSYSTEM BACKING
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            Backed by global startup accelerators & grants
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="font-mono text-xs font-bold text-[#64748B]">LIVE IN PRODUCTION</div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">2,000+ Consumer Users</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Nostavia's consumer reference app runs every layer of the stack on iOS & Android, serving as proof-of-concept for enterprise partner integrations.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="font-mono text-xs font-bold text-[#64748B]">BILLED REVENUE & CLIENTS</div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">Commercial Revenue</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Billed across production enterprise clients. Active reference clients include Apex Diagnostic Network and incubator IIHMF.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="font-mono text-xs font-bold text-[#64748B]">SEED GRANT & ECOSYSTEM</div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">NIDHI Seed Grant</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Awarded non-dilutive grant funding under government NIDHI scheme. Backed by Google for Startups, NVIDIA Inception, Microsoft for Startups, and ElevenLabs Grants.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-12 sm:p-16 lg:p-20 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] shadow-2xl text-center flex flex-col items-center gap-8">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-white max-w-4xl leading-[1.05] tracking-tight">
            Partner with Nostavia to power your health platform
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
