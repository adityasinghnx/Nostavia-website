import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

type Currency = 'USD' | 'AED' | 'INR';

export const PricingPage: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>('USD');

  const getPrice = (tier: 'starter' | 'growth' | 'whitelabel' | 'enterprise') => {
    switch (currency) {
      case 'USD':
        if (tier === 'starter') return '$299';
        if (tier === 'growth') return '$999';
        if (tier === 'whitelabel') return '$999';
        return 'from $5,000';
      case 'AED':
        if (tier === 'starter') return 'AED 1,100';
        if (tier === 'growth') return 'AED 3,670';
        if (tier === 'whitelabel') return 'AED 3,670';
        return 'from AED 18,360';
      case 'INR':
        if (tier === 'starter') return '₹24,990';
        if (tier === 'growth') return '₹82,990';
        if (tier === 'whitelabel') return '₹82,990';
        return 'from ₹4,15,000';
    }
  };

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

        {/* CURRENCY TOGGLE */}
        <div className="pt-4 flex items-center justify-center">
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-1.5 rounded-[2px] flex items-center gap-1 font-mono text-xs shadow-none">
            <span className="text-[#64748B] px-2 text-[10px] uppercase font-bold">SDK Currency:</span>
            
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3.5 py-1.5 rounded-[2px] transition-all font-bold ${
                currency === 'USD' ? 'bg-[#0F172A] text-white shadow-sm' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              USD ($)
            </button>

            <button
              onClick={() => setCurrency('AED')}
              className={`px-3.5 py-1.5 rounded-[2px] transition-all font-bold ${
                currency === 'AED' ? 'bg-[#0F172A] text-white shadow-sm' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              AED (AED)
            </button>

            <button
              onClick={() => setCurrency('INR')}
              className={`px-3.5 py-1.5 rounded-[2px] transition-all font-bold ${
                currency === 'INR' ? 'bg-[#0F172A] text-white shadow-sm' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              INR (₹)
            </button>
          </div>
        </div>
      </div>

      {/* PRICING TIERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Tier 1: Starter SDK */}
        <div className="p-6 sm:p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] flex flex-col justify-between space-y-6 hover:border-[#CBD5E1] transition-all">
          <div className="space-y-4">
            <div className="font-mono text-xs text-[#64748B] uppercase font-bold tracking-wider">Starter SDK</div>
            <div>
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A]">{getPrice('starter')}</div>
              <div className="font-mono text-[11px] text-[#64748B]">per month</div>
            </div>
            <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-[2px] text-xs font-mono text-[#0F172A] font-bold">
              Up to 5,000 MAU
            </div>
            <div className="space-y-2.5 text-xs text-[#64748B]">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#0F172A]" />
                <span>Core infrastructure</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#0F172A]" />
                <span>Any 4 intelligence modules</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#0F172A]" />
                <span>API documentation</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#0F172A]" />
                <span>48-hour support SLAs</span>
              </div>
            </div>
          </div>

          <Link
            to="/demo"
            className="w-full py-3.5 px-4 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-[2px] font-display text-xs font-bold uppercase tracking-wider text-center block transition-all"
          >
            Get started
          </Link>
        </div>

        {/* Tier 2: Growth SDK (Popular) */}
        <div className="p-6 sm:p-8 bg-[#0F172A] text-white border border-[#0F172A] rounded-[2px] flex flex-col justify-between space-y-6 shadow-xl relative">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-amber-400 uppercase font-bold tracking-wider">Growth SDK</span>
              <span className="text-[10px] font-mono font-bold bg-[#B45309] text-white px-2 py-0.5 rounded-[2px]">
                POPULAR
              </span>
            </div>

            <div>
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-white">{getPrice('growth')}</div>
              <div className="font-mono text-[11px] text-slate-400">per month</div>
            </div>

            <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-[2px] text-xs font-mono text-amber-400 font-bold">
              Up to 50,000 MAU
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span>All intelligence modules unlocked</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span>Population analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span>Custom co-branding</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span>4-hour support SLAs</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span>Dedicated integration engineer</span>
              </div>
            </div>
          </div>

          <Link
            to="/demo"
            className="w-full py-3.5 px-4 bg-white hover:bg-slate-100 text-[#0F172A] rounded-[2px] font-display text-xs font-bold uppercase tracking-wider text-center block transition-all"
          >
            Start Growth trial
          </Link>
        </div>

        {/* Tier 3: White-Label Pro */}
        <div className="p-6 sm:p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] flex flex-col justify-between space-y-6 hover:border-[#CBD5E1] transition-all">
          <div className="space-y-4">
            <div className="font-mono text-xs text-[#64748B] uppercase font-bold tracking-wider">White-Label Pro</div>
            <div>
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A]">{getPrice('whitelabel')}</div>
              <div className="font-mono text-[11px] text-[#64748B]">per month</div>
            </div>
            <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-[2px] text-xs font-mono text-[#0F172A] font-bold">
              Unlimited MAU
            </div>
            <div className="space-y-2.5 text-xs text-[#64748B]">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#0F172A]" />
                <span>Fully branded iOS & Android app</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#0F172A]" />
                <span>All intelligence modules unlocked</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#0F172A]" />
                <span>Priority 2-hour support SLAs</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#0F172A]" />
                <span>$1,000 setup fee waived on annual</span>
              </div>
            </div>
          </div>

          <Link
            to="/demo"
            className="w-full py-3.5 px-4 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-[2px] font-display text-xs font-bold uppercase tracking-wider text-center block transition-all"
          >
            Deploy White-Label
          </Link>
        </div>

        {/* Tier 4: Enterprise */}
        <div className="p-6 sm:p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] flex flex-col justify-between space-y-6 hover:border-[#CBD5E1] transition-all">
          <div className="space-y-4">
            <div className="font-mono text-xs text-[#64748B] uppercase font-bold tracking-wider">Enterprise</div>
            <div>
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A]">{getPrice('enterprise')}</div>
              <div className="font-mono text-[11px] text-[#64748B]">per month</div>
            </div>
            <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-[2px] text-xs font-mono text-[#0F172A] font-bold">
              Unlimited MAU & Scale
            </div>
            <div className="space-y-2.5 text-xs text-[#64748B]">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#0F172A]" />
                <span>Custom AI training on your data</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#0F172A]" />
                <span>Custom SLA guarantees</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#0F172A]" />
                <span>On-site engineering onboarding</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#0F172A]" />
                <span>Quarterly executive reviews</span>
              </div>
            </div>
          </div>

          <Link
            to="/demo"
            className="w-full py-3.5 px-4 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-[2px] font-display text-xs font-bold uppercase tracking-wider text-center block transition-all"
          >
            Contact Enterprise
          </Link>
        </div>

      </div>

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
