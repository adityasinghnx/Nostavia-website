import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { StackPricingCalculatorSection } from '../components/sections/StackPricingCalculatorSection';

export const PricingPage: React.FC = () => {

  return (
    <div className="flex flex-col gap-16 py-10 max-w-[1280px] mx-auto px-4 sm:px-6 font-body text-[#0F172A] bg-white">
      
      {/* HEADER HERO */}
      <div className="space-y-4 text-center flex flex-col items-center max-w-3xl mx-auto">
        <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
          PRICING & COMMERCIAL MODELS
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-[#0F172A] tracking-tight leading-[1.05]">
          Two distinct products. Clear, transparent pricing for both.
        </h1>
        <p className="text-base sm:text-lg text-[#64748B] leading-relaxed font-body">
          Select your deployment model below — self-serve developer SDKs for digital health apps or full-service turnkey patient programs for hospitals.
        </p>

        {/* PRODUCT MODEL BRIDGE SELECTOR */}
        <div className="w-full pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-body">
            
            <div className="p-5 bg-[#0F172A] text-white rounded-[2px] border border-[#0F172A] space-y-2 relative">
              <span className="px-2 py-0.5 bg-amber-400 text-[#0F172A] font-mono text-[10px] font-bold uppercase rounded">
                YOU ARE VIEWING
              </span>
              <div className="font-display font-extrabold text-lg text-white">Developer & App Builder SDKs</div>
              <p className="text-xs text-slate-300">
                For healthtech startups, lab networks & app developers embedding API/SDK components. Tiered monthly platform fee based on Monthly Active Users (MAU).
              </p>
            </div>

            <Link
              to="/industries/hospitals#pricing"
              className="p-5 bg-[#F8FAFC] text-[#0F172A] hover:bg-slate-100 rounded-[2px] border border-[#E2E8F0] space-y-2 transition-all block group"
            >
              <div className="flex justify-between items-center">
                <span className="px-2 py-0.5 bg-[#E2E8F0] text-[#64748B] font-mono text-[10px] font-bold uppercase rounded">
                  ENTERPRISE
                </span>
                <span className="text-xs font-bold text-[#2563EB] group-hover:underline flex items-center gap-1 font-mono">
                  View Hospital Pricing →
                </span>
              </div>
              <div className="font-display font-extrabold text-lg text-[#0F172A]">Hospitals & Health Systems</div>
              <p className="text-xs text-[#64748B]">
                For hospitals deploying white-labelled patient programs, Leakage Audit & Attribution Engine. Performance-linked Partner pricing (base + % attributed revenue) or flat rates.
              </p>
            </Link>

          </div>
        </div>
      </div>

      {/* INTERACTIVE STACK BUILDER & PRICING CALCULATOR */}
      <StackPricingCalculatorSection />

      {/* SPECIALISED SERVICES TABLE */}
      <div className="space-y-6 pt-6">
        <div className="space-y-2">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            PAY-PER-USE EXTENSIONS
          </div>
          <h2 className="font-display font-extrabold text-3xl text-[#0F172A]">
            Specialised Services (Priced Separately)
          </h2>
        </div>

        <div className="border border-[#E2E8F0] rounded-[2px] overflow-hidden bg-white">
          <table className="w-full text-left border-collapse font-body text-sm">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] font-mono text-xs uppercase tracking-wider text-[#64748B]">
                <th className="p-4 sm:p-5 font-bold">SERVICE</th>
                <th className="p-4 sm:p-5 font-bold">PRICING MODEL</th>
                <th className="p-4 sm:p-5 font-bold">DESCRIPTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A]">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 sm:p-5 font-bold font-display">Smart Report as a Service</td>
                <td className="p-4 sm:p-5 font-mono text-xs text-[#0F172A] font-bold">Per report</td>
                <td className="p-4 sm:p-5 text-[#64748B] text-xs">The interpretation a clinician would spend 20 minutes writing, generated for every routine panel.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 sm:p-5 font-bold font-display">Clinical Intake Briefs</td>
                <td className="p-4 sm:p-5 font-mono text-xs text-[#0F172A] font-bold">Per consult</td>
                <td className="p-4 sm:p-5 text-[#64748B] text-xs">The unpaid chart review before every new-patient consult, done by the engine.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 sm:p-5 font-bold font-display">Re-Test Recall Campaigns</td>
                <td className="p-4 sm:p-5 font-mono text-xs text-[#0F172A] font-bold">Per campaign or re-test</td>
                <td className="p-4 sm:p-5 text-[#64748B] text-xs">Find which dormant patients are due for a re-test and re-engage them under your brand.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 sm:p-5 font-bold font-display">Solutions Engineering</td>
                <td className="p-4 sm:p-5 font-mono text-xs text-[#0F172A] font-bold">Per engagement</td>
                <td className="p-4 sm:p-5 text-[#64748B] text-xs">Custom intelligence work on your data by the core engineering team.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER CTA */}
      <div className="p-12 sm:p-16 lg:p-20 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] shadow-2xl text-center flex flex-col items-center gap-8">
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white max-w-3xl leading-tight">
          Ready to deploy white-labeled health intelligence?
        </h2>
        <Link
          to="/demo"
          className="bg-white hover:bg-slate-100 text-[#0F172A] font-display text-xs font-bold uppercase tracking-wider px-9 py-4 rounded-[2px] shadow-md transition-all inline-flex items-center gap-2"
        >
          Book a demo
          <ArrowRight className="w-4 h-4 text-[#0F172A]" />
        </Link>
      </div>

    </div>
  );
};
