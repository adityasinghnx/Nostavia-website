import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ArrowRight, ShieldCheck, Layers, Code, Smartphone } from 'lucide-react';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';

export const PlatformPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'l1' | 'l2' | 'l3' | 'l4'>('l3');

  return (
    <div className="flex flex-col gap-20 py-10 font-body text-[#0F172A] bg-white">
      
      {/* 1. HERO ARCHITECTURE SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-8 sm:p-14 lg:p-16 bg-white border border-[#E2E8F0] rounded-[2px] space-y-8 shadow-none relative overflow-hidden">
          
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            EMBEDDABLE PLATFORM & SDKS
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#0F172A] tracking-tight max-w-4xl leading-[1.02]">
            The whole-body health-intelligence layer for the health economy.
          </h1>

          <p className="text-base sm:text-xl text-[#64748B] max-w-3xl leading-relaxed font-body">
            Nostavia is B2B health-tech infrastructure. We build the intelligence layer diagnostic labs, clinics, wellness platforms, and insurers embed inside their own products under their own brand. Partners keep their interface; Nostavia remains invisible.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to="/demo"
              className="bg-[#000000] hover:bg-[#1A1A1A] text-white font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] shadow-sm transition-all inline-flex items-center gap-2"
            >
              Book a demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#competitive-matrix"
              className="bg-white hover:bg-slate-50 text-[#0F172A] border border-[#CBD5E1] font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] transition-all"
            >
              Compare capabilities
            </a>
          </div>

          {/* Key Platform Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#E2E8F0] font-mono text-xs text-[#0F172A]">
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">100+</div>
              <div className="text-[#64748B] font-semibold mt-1">Biomarkers Decoded</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">4 Layers</div>
              <div className="text-[#64748B] font-semibold mt-1">Full-Stack Architecture</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">70B</div>
              <div className="text-[#64748B] font-semibold mt-1">Cloud Reasoning Brain</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">SOMA-1B</div>
              <div className="text-[#64748B] font-semibold mt-1">On-Device Privacy Brain</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE 4-LAYER PRODUCT ARCHITECTURE DEEP-DIVE */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="max-w-3xl space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            THE FOUR LAYERS OF NOSTAVIA
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight leading-[1.05]">
            Everything beneath the delivery surface is invisible to the partner.
          </h2>
          <p className="text-base text-[#64748B] leading-relaxed font-body">
            Fragmented health data goes in; structured, predictive, personalized intelligence comes out. Building this stack in-house takes an estimated 12 to 18 months.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div
            onClick={() => setActiveTab('l1')}
            className={`p-6 rounded-[2px] border cursor-pointer transition-all ${
              activeTab === 'l1' ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md' : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:border-[#CBD5E1]'
            }`}
          >
            <div className="font-mono text-xs font-bold text-cyan-400">LAYER 1</div>
            <h3 className="font-display font-extrabold text-xl mt-2">L1: Ingestion</h3>
            <p className={`text-xs mt-2 leading-relaxed font-body ${activeTab === 'l1' ? 'text-slate-300' : 'text-[#64748B]'}`}>
              Native lab-PDF parsing, digital-signature handling, and multi-device wearable data pipelines.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('l2')}
            className={`p-6 rounded-[2px] border cursor-pointer transition-all ${
              activeTab === 'l2' ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md' : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:border-[#CBD5E1]'
            }`}
          >
            <div className="font-mono text-xs font-bold text-cyan-400">LAYER 2</div>
            <h3 className="font-display font-extrabold text-xl mt-2">L2: Decoding</h3>
            <p className={`text-xs mt-2 leading-relaxed font-body ${activeTab === 'l2' ? 'text-slate-300' : 'text-[#64748B]'}`}>
              100+ biomarker engine (optimal/in-range/outlier), food bio-impact models, wearable signal normalization.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('l3')}
            className={`p-6 rounded-[2px] border cursor-pointer transition-all ${
              activeTab === 'l3' ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md' : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:border-[#CBD5E1]'
            }`}
          >
            <div className="font-mono text-xs font-bold text-cyan-400">LAYER 3</div>
            <h3 className="font-display font-extrabold text-xl mt-2">L3: Intelligence Core</h3>
            <p className={`text-xs mt-2 leading-relaxed font-body ${activeTab === 'l3' ? 'text-slate-300' : 'text-[#64748B]'}`}>
              SOMA Dual-Brain reasoning, digital twin simulation, whole-body correlation, protocol engine, AI concierge.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('l4')}
            className={`p-6 rounded-[2px] border cursor-pointer transition-all ${
              activeTab === 'l4' ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md' : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:border-[#CBD5E1]'
            }`}
          >
            <div className="font-mono text-xs font-bold text-cyan-400">LAYER 4</div>
            <h3 className="font-display font-extrabold text-xl mt-2">L4: Delivery Surface</h3>
            <p className={`text-xs mt-2 leading-relaxed font-body ${activeTab === 'l4' ? 'text-slate-300' : 'text-[#64748B]'}`}>
              White-Label App, Intelligence SDK, Wearables SDK, partner clinic dashboards & co-branding.
            </p>
          </div>

        </div>

        {/* Dynamic Architecture Diagram Component */}
        <ArchitectureDiagram />
      </section>

      {/* 3. SOMA DUAL-BRAIN ARCHITECTURE */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
        <div className="p-10 sm:p-14 lg:p-16 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] space-y-8 shadow-2xl">
          
          <div className="space-y-3 max-w-3xl">
            <div className="eyebrow text-cyan-400 font-bold text-xs uppercase tracking-widest font-mono">
              PROPRIETARY PRIVACY ARCHITECTURE
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              SOMA Dual-Brain: Private by design
            </h2>
            <p className="text-base text-slate-300 leading-relaxed font-body">
              Personal data is understood and stripped on-device. Only a de-identified clinical brief reaches the cloud model. This architecture makes the system private by design and allows margin to expand with scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2px] space-y-4">
              <div className="inline-block px-3 py-1 bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono text-[10px] font-bold uppercase rounded-[2px]">
                ON-DEVICE DOMAIN BRAIN
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">SOMA-1B (On-Device)</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-body">
                A small language model that runs on-device. It understands the user's data, routes queries, personalizes responses, and distils the result into a focused, de-identified clinical brief.
              </p>
            </div>

            <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2px] space-y-4">
              <div className="inline-block px-3 py-1 bg-purple-950 text-purple-400 border border-purple-800 font-mono text-[10px] font-bold uppercase rounded-[2px]">
                CLOUD KNOWLEDGE BRAIN
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">70B Medical Reasoning Model</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-body">
                A 70B-class reasoning model adapted for medical use, grounded in clinical evidence and global reference data. Every output is validated against Nostavia's clinical advisory bench before reaching a partner.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. THREE PARTNER INTEGRATION MODES */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            HOW PARTNERS INTEGRATE
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            Integrate once. Your product becomes materially more intelligent.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center font-bold">
              <Code className="w-5 h-5 text-[#0F172A]" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">1. Intelligence SDK</h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              For platforms and clinics operating an existing app. Lab decoding, food scanning, protocols, and the AI concierge embed directly into your code. User UX is unchanged.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center font-bold">
              <Layers className="w-5 h-5 text-[#0F172A]" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">2. Wearables SDK</h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              For any product requiring wearable data. A single integration normalizes Apple Watch, Oura, WHOOP, and Fitbit, replacing a dozen provider API integrations.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center font-bold">
              <Smartphone className="w-5 h-5 text-[#0F172A]" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">3. White-Label App</h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              For labs & clinics with no application of their own. A complete, fully branded application carrying your name, operated by Nostavia. No engineering team needed.
            </p>
          </div>

        </div>
      </section>

      {/* 5. COMPETITIVE POSITIONING MATRIX */}
      <section id="competitive-matrix" className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            COMPETITIVE ADVANTAGE
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            Why Nostavia's combination cannot be replicated easily
          </h2>
        </div>

        <div className="overflow-x-auto border border-[#E2E8F0] rounded-[2px] shadow-none bg-white">
          <table className="w-full text-left border-collapse font-body text-sm">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] font-mono text-xs uppercase tracking-wider text-[#64748B]">
                <th className="p-5 font-bold">CAPABILITY</th>
                <th className="p-5 font-bold text-[#0F172A]">NOSTAVIA</th>
                <th className="p-5 font-bold">FUNCTION / SUPERPOWER</th>
                <th className="p-5 font-bold">TERRA / VITAL</th>
                <th className="p-5 font-bold">BUILD IN-HOUSE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A]">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-5 font-bold">Universal lab-report decoding</td>
                <td className="p-5 font-bold text-emerald-600">Yes</td>
                <td className="p-5 text-[#64748B]">Yes (Internal)</td>
                <td className="p-5 text-[#64748B]">Yes</td>
                <td className="p-5 text-[#64748B] font-mono text-xs">12–18 mo</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-5 font-bold">Food bio-impact modelling</td>
                <td className="p-5 font-bold text-emerald-600">Yes</td>
                <td className="p-5 text-slate-400">—</td>
                <td className="p-5 text-slate-400">—</td>
                <td className="p-5 text-slate-400">—</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-5 font-bold">Wearables: one normalised SDK</td>
                <td className="p-5 font-bold text-emerald-600">Yes</td>
                <td className="p-5 text-slate-400">—</td>
                <td className="p-5 text-[#64748B]">Yes</td>
                <td className="p-5 text-[#64748B] font-mono text-xs">12–18 mo</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-5 font-bold">Adaptive, personalised protocols</td>
                <td className="p-5 font-bold text-emerald-600">Yes</td>
                <td className="p-5 text-[#64748B]">Yes</td>
                <td className="p-5 text-slate-400">—</td>
                <td className="p-5 text-[#64748B] font-mono text-xs">12–18 mo</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-5 font-bold">AI concierge on personal biomarkers</td>
                <td className="p-5 font-bold text-emerald-600">Yes</td>
                <td className="p-5 text-[#64748B]">Yes</td>
                <td className="p-5 text-slate-400">—</td>
                <td className="p-5 text-[#64748B] font-mono text-xs">12–18 mo</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors bg-slate-50/80">
                <td className="p-5 font-bold text-[#0F172A]">Delivered under partner's brand</td>
                <td className="p-5 font-bold text-[#0F172A]">Yes (100% White-label)</td>
                <td className="p-5 text-slate-400">— (Direct-to-consumer)</td>
                <td className="p-5 text-slate-400">—</td>
                <td className="p-5 text-[#64748B] font-mono text-xs">12–18 mo</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-5 font-bold">Cross-partner data network effect</td>
                <td className="p-5 font-bold text-emerald-600">Yes</td>
                <td className="p-5 text-slate-400">—</td>
                <td className="p-5 text-slate-400">—</td>
                <td className="p-5 text-slate-400">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. FINAL CTA BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-12 sm:p-16 lg:p-20 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] shadow-2xl text-center flex flex-col items-center gap-8">
          
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-white max-w-4xl leading-[1.05] tracking-tight">
            Schedule a technical architecture briefing with our engineering founders
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
