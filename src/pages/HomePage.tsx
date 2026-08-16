import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { LogoTrustBar } from '../components/LogoTrustBar';
import { WorkflowAutonomousAgentsSection } from '../components/sections/WorkflowAutonomousAgentsSection';
import { TeamOfAgentsSection } from '../components/sections/TeamOfAgentsSection';
import { PlatformLayerThreeCardsSection } from '../components/sections/PlatformLayerThreeCardsSection';
import { ProductizedServicesRowsSection } from '../components/sections/ProductizedServicesRowsSection';
import { RealOutcomesCaseStudySection } from '../components/sections/RealOutcomesCaseStudySection';
import { SecurityComplianceBandSection } from '../components/sections/SecurityComplianceBandSection';
import { ProofSection } from '../components/sections/ProofSection';
import { MarketRealitySection } from '../components/sections/MarketRealitySection';
import { StackPricingCalculatorSection } from '../components/sections/StackPricingCalculatorSection';

export const HomePage: React.FC<{ onOpenDemo?: () => void }> = () => {
  return (
    <div className="flex flex-col gap-20 sm:gap-24 pb-12 font-body text-[#0F172A] overflow-x-clip bg-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION & LOGO TRUST BAR */}
      {/* ========================================================================= */}
      <div className="w-full">
        <section className="relative pt-0 pb-0 bg-white">
          
          {/* Full-Bleed Right Hero Image with Approved V1 Pattern Overlay */}
          <div className="hidden lg:block absolute top-0 right-0 w-[64%] h-full z-10 rounded-none overflow-hidden">
            
            {/* Base Photograph */}
            <img
              src="/hero-bg.jpg"
              alt="Nostavia Digital Health Intelligence Layer Visual"
              className="w-full h-full object-cover object-center rounded-none"
            />

            {/* Approved V1 Pattern Overlay (Corner Accent & Radial Spotlight) */}
            <div className="absolute inset-0 pointer-events-none z-10 select-none">
              
              {/* Radial Highlight Spotlight over center biological figure */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]" />
              
              {/* Fine SVG Dot Matrix Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

              {/* Glass Mosaic Grid: Corner Accents & Balanced Quadrants */}
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 opacity-45">
                <div className="col-start-1 row-start-1 bg-white/30 backdrop-blur-[2px] border border-white/40 shadow-sm" />
                <div className="col-start-2 row-start-1 bg-amber-100/30 border border-white/30" />
                <div className="col-start-1 row-start-2 bg-orange-100/25 backdrop-blur-[1px]" />
                
                <div className="col-start-11 row-start-1 bg-white/25 backdrop-blur-[2px] border border-white/30" />
                <div className="col-start-12 row-start-2 bg-amber-200/30 border border-white/40" />

                <div className="col-start-3 row-start-3 bg-white/25 backdrop-blur-[2px] border border-white/30" />
                <div className="col-start-4 row-start-3 bg-amber-200/30 backdrop-blur-[1px]" />
                <div className="col-start-9 row-start-4 bg-amber-100/30 backdrop-blur-[2px] border border-white/30" />
                
                <div className="col-start-1 row-start-7 bg-white/30 backdrop-blur-[2px] border border-white/40" />
                <div className="col-start-2 row-start-8 bg-orange-100/25 border border-white/30" />
                <div className="col-start-10 row-start-7 bg-white/25 backdrop-blur-[2px]" />
                <div className="col-start-11 row-start-8 bg-amber-200/30 border border-white/40" />
              </div>

              {/* Binary Stream Code Clusters */}
              <div className="absolute inset-0 font-mono text-[10px] text-white/80 tracking-widest leading-none font-bold">
                <div className="absolute top-[8%] left-[5%] space-y-1 text-white/80">
                  <div>0110 0011</div>
                  <div>1001 0110</div>
                </div>
                <div className="absolute top-[16%] right-[8%] space-y-1 text-amber-100">
                  <div>01100 00111</div>
                  <div>20000 00001</div>
                </div>
                <div className="absolute bottom-[10%] left-[5%] space-y-1 text-amber-200">
                  <div>0011 1100</div>
                  <div>0101 1010</div>
                </div>
                <div className="absolute bottom-[14%] right-[8%] space-y-1 text-white/70">
                  <div>0000 000000</div>
                  <div>00000 00000</div>
                </div>
              </div>

            </div>

          </div>

          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-20 pt-8 pb-12 min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] flex flex-col justify-center">
            
            {/* Headline Stack */}
            <div className="font-display font-extrabold text-5xl sm:text-7xl lg:text-[88px] leading-[0.98] tracking-tighter text-[#0F172A] relative z-30">
              <div className="mb-0 relative z-40">Enabling</div>
              
              <div className="inline-block bg-white pt-2.5 pb-4 sm:pt-3.5 sm:pb-5 px-4 sm:px-6 -ml-4 sm:-ml-6 text-[#0F172A] relative z-50 lg:whitespace-nowrap">
                Autonomous Intelligence
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start -mt-0.5 lg:-mt-1 relative z-10">
              
              {/* Left Subtext & CTA */}
              <div className="lg:col-span-5 space-y-6 pt-2">
                <p className="text-base sm:text-lg text-[#64748B] font-body leading-relaxed max-w-sm">
                  The intelligence layer for the health economy. Ingest lab reports, wearable telemetry, and nutrition data into continuous, white-labeled AI companion infrastructure.
                </p>

                <div>
                  <Link
                    to="/demo"
                    className="inline-flex items-center justify-center bg-[#000000] hover:bg-[#1A1A1A] text-white font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] shadow-sm transition-all"
                  >
                    REQUEST A DEMO
                  </Link>
                </div>
              </div>

              {/* Right Indented Row 3 */}
              <div className="lg:col-span-7 pt-0">
                <div className="font-display font-extrabold text-5xl sm:text-7xl lg:text-[88px] leading-[0.98] tracking-tighter text-[#0F172A]">
                  <div className="inline-block bg-white py-2.5 sm:py-3.5 px-4 sm:px-6 text-[#0F172A] relative z-30">
                    for Healthcare
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Mobile Hero Image View */}
          <div className="block lg:hidden w-full min-h-[320px] relative rounded-none overflow-hidden mt-6 mb-6 shadow-md px-4">
            <img
              src="/hero-bg.jpg"
              alt="Nostavia Digital Health Intelligence Layer Visual"
              className="w-full h-full object-cover object-center rounded-none"
            />
          </div>

        </section>

        {/* 2. LOGO TRUST BAR (DIRECTLY TOUCHES BOTTOM OF HERO IMAGE) */}
        <LogoTrustBar />
      </div>

      {/* ========================================================================= */}
      {/* 2.5. MARKET REALITY (BIG STAT + 3 PROBLEM CARDS) */}
      {/* ========================================================================= */}
      <MarketRealitySection />

      {/* ========================================================================= */}
      {/* 3. SECTOR SELECTOR (WORKFLOW AUTONOMOUS AGENTS SECTION) */}
      {/* ========================================================================= */}
      <WorkflowAutonomousAgentsSection />

      {/* ========================================================================= */}
      {/* 4. THE PLATFORM (PLATFORM LAYER THREE CARDS SECTION) */}
      {/* ========================================================================= */}
      <PlatformLayerThreeCardsSection />

      {/* ========================================================================= */}
      {/* 5. INTELLIGENCE MODULES (TEAM OF AGENTS MARQUEE SECTION) */}
      {/* ========================================================================= */}
      <TeamOfAgentsSection />

      {/* ========================================================================= */}
      {/* 5.5. BUILD & PRICE YOUR STACK (MERGED MODULE CONFIGURATOR + PRICING) */}
      {/* ========================================================================= */}
      <StackPricingCalculatorSection />

      {/* ========================================================================= */}
      {/* 6. SPECIALISED SERVICES (PRODUCTIZED SERVICES ROWS SECTION) */}
      {/* ========================================================================= */}
      <ProductizedServicesRowsSection />

      {/* ========================================================================= */}
      {/* 6.5. REAL OUTCOMES (CASE STUDY CAROUSEL SECTION) */}
      {/* ========================================================================= */}
      <RealOutcomesCaseStudySection />

      {/* ========================================================================= */}
      {/* 7. SECURITY & COMPLIANCE (SECURITY COMPLIANCE BAND SECTION) */}
      {/* ========================================================================= */}
      <SecurityComplianceBandSection />

      {/* ========================================================================= */}
      {/* 8. PROOF (PROOF SECTION) */}
      {/* ========================================================================= */}
      <ProofSection />



      {/* ========================================================================= */}
      {/* 10. CLOSE (FINAL ENTERPRISE CTA SECTION) */}
      {/* ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-12 sm:p-16 lg:p-20 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] shadow-2xl text-center flex flex-col items-center gap-8">
          
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-white max-w-4xl leading-[1.05] tracking-tight">
            Integrate once. Your users never see us.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-body max-w-2xl leading-relaxed">
            Thirty minutes on live product, not slides. Send a sample lab report in advance and we'll run it through the engine and show you the output on your own panel.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/demo"
              className="bg-white hover:bg-slate-100 text-[#0F172A] font-display text-xs font-bold uppercase tracking-wider px-9 py-4 rounded-[2px] shadow-md transition-all inline-flex items-center gap-2"
            >
              Book a demo
              <ArrowRight className="w-4 h-4 text-[#0F172A]" />
            </Link>
            <Link
              to="/company"
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-display text-xs font-bold uppercase tracking-wider px-9 py-4 rounded-[2px] transition-all"
            >
              Read the docs
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};
