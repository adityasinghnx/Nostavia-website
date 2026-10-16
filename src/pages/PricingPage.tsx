import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { StackPricingCalculatorSection } from '../components/sections/StackPricingCalculatorSection';

export const PricingPage: React.FC = () => {

  return (
    <div className="flex flex-col gap-16 py-10 max-w-[1280px] mx-auto px-4 sm:px-6 font-body text-white bg-white/[0.03]">
      
      {/* HEADER HERO */}
      <div className="space-y-4 text-center flex flex-col items-center max-w-3xl mx-auto">
        <div className="eyebrow text-white/55 font-bold text-xs uppercase tracking-widest font-mono">
          PRICING & COMMERCIAL MODELS
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-[1.05]">
          Simple pricing: build it once, then we run it.
        </h1>
        <p className="text-base sm:text-lg text-white/55 leading-relaxed font-body">
          Every project has a one-time build fee and a monthly plan. White Label from $1,500, SDK from $999, Custom Build from $7,500 — the monthly plan covers hosting, AI, updates and support.
        </p>

        {/* PRODUCT MODEL BRIDGE SELECTOR */}
        <div className="w-full pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-body">
            
            <div className="p-5 bg-ink-800 text-white rounded-[2px] border border-white space-y-2 relative">
              <span className="px-2 py-0.5 bg-amber-400 text-white font-mono text-[10px] font-bold uppercase rounded">
                YOU ARE VIEWING
              </span>
              <div className="font-display font-extrabold text-lg text-white">Custom Build, White Label & SDK</div>
              <p className="text-xs text-slate-300">
                For labs, clinics, health apps and platforms. A one-time build fee plus a monthly plan covering hosting, AI, updates and support. No per-user fees.
              </p>
            </div>

            <Link
              to="/industries/hospitals#pricing"
              className="p-5 bg-white/[0.03] text-white hover:bg-white/10 rounded-[2px] border border-white/[0.08] space-y-2 transition-all block group"
            >
              <div className="flex justify-between items-center">
                <span className="px-2 py-0.5 bg-white/10 text-white/55 font-mono text-[10px] font-bold uppercase rounded">
                  ENTERPRISE
                </span>
                <span className="text-xs font-bold text-hos-yellow group-hover:underline flex items-center gap-1 font-mono">
                  View Hospital Pricing →
                </span>
              </div>
              <div className="font-display font-extrabold text-lg text-white">Hospitals & Health Systems</div>
              <p className="text-xs text-white/55">
                Five patient programmes under your hospital's brand, from $5,000 one-time + $999/mo. Starts with a free Leakage Audit; 60-day launch guarantee.
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
          <div className="eyebrow text-white/55 font-bold text-xs uppercase tracking-widest font-mono">
            PRICE LIST
          </div>
          <h2 className="font-display font-extrabold text-3xl text-white">
            Products & starting prices
          </h2>
        </div>

        <div className="border border-white/[0.08] rounded-[2px] overflow-x-auto bg-white/[0.03]">
          <table className="w-full min-w-[600px] text-left border-collapse font-body text-sm">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/[0.08] font-mono text-xs uppercase tracking-wider text-white/55">
                <th className="p-4 sm:p-5 font-bold">PRODUCT</th>
                <th className="p-4 sm:p-5 font-bold">ONE-TIME + MONTHLY</th>
                <th className="p-4 sm:p-5 font-bold">WHAT IT IS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-white">
              <tr className="hover:bg-white/[0.05] transition-colors">
                <td className="p-4 sm:p-5 font-bold font-display">Custom Build</td>
                <td className="p-4 sm:p-5 font-mono text-xs text-white font-bold">$7,500 – $25,000 + $750 – $2,000/mo</td>
                <td className="p-4 sm:p-5 text-white/55 text-xs">Our core offering. A new product designed and built from scratch around your workflow, then launched and run by us.</td>
              </tr>
              <tr className="hover:bg-white/[0.05] transition-colors">
                <td className="p-4 sm:p-5 font-bold font-display">White Label</td>
                <td className="p-4 sm:p-5 font-mono text-xs text-white font-bold">From $1,500 + $399/mo</td>
                <td className="p-4 sm:p-5 text-white/55 text-xs">One of our ready-made products, launched under your brand. Live in 2–8 weeks.</td>
              </tr>
              <tr className="hover:bg-white/[0.05] transition-colors">
                <td className="p-4 sm:p-5 font-bold font-display">SDK</td>
                <td className="p-4 sm:p-5 font-mono text-xs text-white font-bold">From $999 + $399/mo</td>
                <td className="p-4 sm:p-5 text-white/55 text-xs">Add lab decoding, wearables, food scanning and an AI health companion to the app you already have. Up to $999/mo at scale.</td>
              </tr>
              <tr className="hover:bg-white/[0.05] transition-colors">
                <td className="p-4 sm:p-5 font-bold font-display">AI Front Desk Agent</td>
                <td className="p-4 sm:p-5 font-mono text-xs text-white font-bold">From $1,500 + $399/mo</td>
                <td className="p-4 sm:p-5 text-white/55 text-xs">White Label. Answers every call 24/7 in local languages and books the visit. High call volumes billed per minute.</td>
              </tr>
              <tr className="hover:bg-white/[0.05] transition-colors">
                <td className="p-4 sm:p-5 font-bold font-display">Smart Reports & Re-Test Recall</td>
                <td className="p-4 sm:p-5 font-mono text-xs text-white font-bold">From $1,500 + $399/mo</td>
                <td className="p-4 sm:p-5 text-white/55 text-xs">White Label. Branded smart reports for every panel, plus recall campaigns.</td>
              </tr>
              <tr className="hover:bg-white/[0.05] transition-colors">
                <td className="p-4 sm:p-5 font-bold font-display">Branded Patient App</td>
                <td className="p-4 sm:p-5 font-mono text-xs text-white font-bold">From $2,500 + $499/mo</td>
                <td className="p-4 sm:p-5 text-white/55 text-xs">White Label. Your own iOS & Android app with an AI health companion.</td>
              </tr>
              <tr className="hover:bg-white/[0.05] transition-colors">
                <td className="p-4 sm:p-5 font-bold font-display">Clinic & Longevity Platform</td>
                <td className="p-4 sm:p-5 font-mono text-xs text-white font-bold">From $2,500 + $499/mo</td>
                <td className="p-4 sm:p-5 text-white/55 text-xs">White Label. Intake briefs, biological age, adaptive protocols and monitoring.</td>
              </tr>
              <tr className="hover:bg-white/[0.05] transition-colors">
                <td className="p-4 sm:p-5 font-bold font-display">Hospital Patient Programmes</td>
                <td className="p-4 sm:p-5 font-mono text-xs text-white font-bold">From $5,000 + $999/mo</td>
                <td className="p-4 sm:p-5 text-white/55 text-xs">White Label. Five patient programmes, free Leakage Audit, 60-day launch guarantee.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p className="-mt-10 text-xs text-white/50 font-body">
        All prices in USD, excluding applicable taxes. INR and AED quotes are available on request. Final pricing depends on scope — you get a fixed quote after a free call.
      </p>

      {/* FOOTER CTA */}
      <div className="p-8 sm:p-16 lg:p-20 bg-ink-800 text-white rounded-[2px] border border-white/10 shadow-2xl text-center flex flex-col items-center gap-6 sm:gap-8">
        <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white max-w-3xl leading-tight">
          Get a fixed quote for your product.
        </h2>
        <Link
          to="/demo"
          className="bg-white/[0.03] hover:bg-white/10 text-white font-display text-xs font-bold uppercase tracking-wider px-9 py-4 rounded-[2px] shadow-md transition-all inline-flex items-center gap-2"
        >
          Book a demo
          <ArrowRight className="w-4 h-4 text-white" />
        </Link>
      </div>

    </div>
  );
};
