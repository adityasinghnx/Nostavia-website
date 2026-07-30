import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ProofSection: React.FC = () => {
  return (
    <section className="w-full font-body text-[#0F172A] py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#E2E8F0] pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="eyebrow text-[#B45309] font-bold text-xs uppercase tracking-widest font-mono">
              COMMERCIAL SCALE & GOVERNANCE
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-[#0F172A] tracking-tight leading-[1.05]">
              Built for scale. Validated by leaders.
            </h2>
          </div>

          <Link
            to="/company"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#0F172A] hover:text-[#B45309] transition-colors shrink-0"
          >
            Meet the clinical bench →
          </Link>
        </div>

        {/* Screenshot 5 Exact Bento Grid Layout (Enterprise Copy & Scale) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1 (Top Left, 7 Columns): Solid Dark Enterprise Hero Card */}
          <div className="md:col-span-7 bg-[#0F172A] text-white p-10 sm:p-12 rounded-[2px] border border-[#1E293B] flex flex-col justify-between space-y-8 shadow-xl">
            <div className="space-y-4">
              <div className="font-display font-extrabold text-5xl sm:text-6xl text-white tracking-tight">
                10M+
              </div>

              <h3 className="font-display font-bold text-2xl text-white">
                Enterprise Production Scale
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-body">
                Nostavia's clinical AI infrastructure processes complex lab panels, continuous wearable telemetry, and personalized protocol routing in active production for diagnostic networks, health systems, and longevity clinics globally.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 font-mono text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live in Production across Global Healthcare Networks</span>
            </div>
          </div>

          {/* Card 2 (Top Right, 5 Columns): Off-White Enterprise Client Card */}
          <div className="md:col-span-5 bg-[#F8FAFC] p-10 sm:p-12 rounded-[2px] border border-[#E2E8F0] flex flex-col justify-between space-y-6 hover:border-[#CBD5E1] transition-all">
            <div className="space-y-3">
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0F172A]">
                Enterprise Client Deployments
              </h3>

              <p className="text-sm text-[#64748B] leading-relaxed font-body">
                Deployed as white-labeled core infrastructure across premier diagnostic lab networks and multi-location health platforms — delivering 3.8x patient recall rates and 64% admin efficiency.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 font-mono text-xs text-[#B45309] font-bold">
              3.8x Recall Lift · 64% Workflow Velocity
            </div>
          </div>

          {/* Card 3 (Bottom Left, 5 Columns): Warm Amber Accent Tech Alliances Card */}
          <div className="md:col-span-5 bg-[#FFF7ED] p-10 sm:p-12 rounded-[2px] border border-[#FED7AA] flex flex-col justify-between space-y-6 hover:border-[#FDBA74] transition-all">
            <div className="space-y-3">
              <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                Global Tech Alliances
              </h3>

              <p className="text-sm text-slate-700 leading-relaxed font-body">
                Supported and accelerated by tier-one global technology partner programs: NVIDIA Inception, Google for Startups Healthcare AI, Microsoft, and ElevenLabs AI Grants.
              </p>
            </div>

            <div className="pt-4 border-t border-[#FED7AA] font-mono text-xs text-[#9A3412] font-semibold">
              NVIDIA · GOOGLE CLOUD · MICROSOFT · ELEVENLABS
            </div>
          </div>

          {/* Card 4 (Bottom Right, 7 Columns): Solid Dark Enterprise Clinical Governance Card */}
          <div className="md:col-span-7 bg-[#0F172A] text-white p-10 sm:p-12 rounded-[2px] border border-[#1E293B] flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-4">
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                Institutional Clinical Governance
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-body">
                Governed by GMC-registered physicians, senior computational biology researchers from IISc Bangalore, and UCL-trained clinical pharmacology leadership to validate all decision-support outputs prior to partner deployment.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs text-amber-400">
              <span>GMC Physicians · IISc Bangalore · UCL</span>
              <Link to="/company" className="hover:text-amber-300 flex items-center gap-1 font-bold">
                Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
