import React from 'react';
import { Link } from 'react-router-dom';

import { LogoTrustBar } from '../components/LogoTrustBar';
import { WhereWeWorkSection } from '../components/home/WhereWeWorkSection';
import { StatsBand } from '../components/home/StatsBand';
import { ProductsSection } from '../components/home/ProductsSection';
import { TeamsSection } from '../components/home/TeamsSection';
import { HumanOsHomeSection } from '../components/sections/HumanOsHomeSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { PortalSection } from '../components/home/PortalSection';
import { IntegrationsSection } from '../components/home/IntegrationsSection';
import { CustomersSection } from '../components/home/CustomersSection';
import { ClinicalBenchSection } from '../components/home/ClinicalBenchSection';
import { TrustStripSection } from '../components/sections/TrustStripSection';
import { HomeFaqSection } from '../components/home/HomeFaqSection';
import { ResourcesSection } from '../components/home/ResourcesSection';
import { ClosingCtaSection } from '../components/home/ClosingCtaSection';

export const HomePage: React.FC<{ onOpenDemo?: () => void }> = () => {
  return (
    <div className="flex flex-col font-body text-[#0F172A] overflow-x-clip bg-white">
      <h1 className="sr-only">Nostavia Health: enabling autonomous intelligence for healthcare</h1>

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
            <div className="font-display font-extrabold text-5xl sm:text-7xl lg:text-[88px] leading-[0.98] tracking-tighter text-[#0F172A] relative z-40">
              <div className="mb-0 relative z-40">Enabling</div>
              
              <div className="inline-block bg-white py-2.5 sm:py-3.5 px-4 sm:px-6 -ml-4 sm:-ml-6 text-[#0F172A] relative z-30 lg:whitespace-nowrap">
                Autonomous Intelligence
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start -mt-0.5 lg:-mt-1 relative z-20">
              
              {/* Left Subtext & CTA */}
              <div className="lg:col-span-5 space-y-6 pt-2">
                <p className="text-base sm:text-lg text-[#64748B] font-body leading-relaxed max-w-sm">
                  We design and build custom health AI products for labs, clinics, hospitals and health apps, from scratch or on top of our White Label products and SDK. All under your brand.
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
      {/* BELOW THE LOGOS: CUSTOMER-FOCUSED, STRUCTURED AFTER INNOVACCER           */}
      {/* ========================================================================= */}
      <WhereWeWorkSection />    {/* who we serve, tabbed by business */}
      <StatsBand />             {/* Nostavia today, in numbers */}
      <ProductsSection />       {/* the products customers switch on */}
      <TeamsSection />          {/* what each team gets */}
      <HumanOsHomeSection />    {/* the platform they run on */}
      <HowItWorksSection />     {/* from first call to live */}
      <PortalSection />         {/* the Partner Portal, animated */}
      <IntegrationsSection />   {/* data in, delivered as */}
      <CustomersSection />      {/* live deployments */}
      <ClinicalBenchSection />  {/* clinical governance */}
      <TrustStripSection />     {/* security and compliance */}
      <HomeFaqSection />        {/* buyer questions */}
      <ResourcesSection />      {/* go deeper */}
      <ClosingCtaSection />
    </div>
  );
};
