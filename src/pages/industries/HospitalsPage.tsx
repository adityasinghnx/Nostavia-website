import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const HospitalsPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 py-10 max-w-[1280px] mx-auto px-4 sm:px-6 font-body text-[#0F172A] bg-white">
      
      {/* HEADER HERO */}
      <div className="space-y-4 max-w-4xl">
        <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
          HOSPITAL SYSTEMS INFRASTRUCTURE
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-[#0F172A] tracking-tight leading-[1.05]">
          Discharge is not the end of the episode. It's the start of continuous care.
        </h1>
        <p className="text-base sm:text-xl text-[#64748B] leading-relaxed max-w-3xl font-body">
          Hospitals hold the richest longitudinal record in healthcare. Nostavia adds the intelligence layer that carries a patient forward between visits.
        </p>
      </div>

      {/* ROADMAP NOTICE */}
      <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-2">
        <div className="font-mono text-xs text-[#0F172A] font-bold uppercase">
          DESIGN PARTNERS & ROADMAP
        </div>
        <p className="text-xs text-[#64748B] leading-relaxed font-body">
          Accepting enterprise hospital design partners across international markets to integrate longitudinal follow-up modules and white-labeled front-door software.
        </p>
      </div>

      {/* WHAT NOSTAVIA ADDS */}
      <section className="flex flex-col gap-8">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            PATIENT FRONT DOOR SURFACE
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A]">
            Longitudinal Follow-up & Front Door Modules
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-3 hover:border-[#CBD5E1] transition-all">
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">Longitudinal Patient Profile</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              A longitudinal health record the patient can actually read, assembled from your discharge reports and their daily wearable signals.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-3 hover:border-[#CBD5E1] transition-all">
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">Appointment & Recall Booking</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Included in the White-Label App for groups without a digital front door. For hospitals already running an HIS, we integrate with your existing booking rails.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-3 hover:border-[#CBD5E1] transition-all">
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">Between-Visit AI Concierge</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              An on-device AI assistant trained on post-discharge protocols to answer patient questions between outpatient consultations.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-3 hover:border-[#CBD5E1] transition-all">
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">EHR Data Pipeline Integration</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-body">
              Connects lab PDF feeds and discharge summaries into Nostavia's SOMA Dual-Brain engine without requiring a major EHR overhaul.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER CTA BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-12 sm:p-16 lg:p-20 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] shadow-2xl text-center flex flex-col items-center gap-8">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-white max-w-4xl leading-[1.05] tracking-tight">
            Explore hospital design partnership options
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
