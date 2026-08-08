import React from 'react';
import { Link } from 'react-router-dom';

export const ProductizedServicesRowsSection: React.FC = () => {
  const services = [
    {
      title: 'Smart Report as a Service',
      description: 'The interpretation a clinician would spend twenty minutes writing, generated for every routine panel, under your brand.',
      pricingModel: 'Per report.',
      linkUrl: '/solutions/comet',
    },
    {
      title: 'Clinical Intake Briefs',
      description: 'The unpaid chart review before every new-patient consult, done by the engine: reports parsed, outliers flagged, history to one page.',
      pricingModel: 'Per consult.',
      linkUrl: '/solutions/cured',
    },
    {
      title: 'Re-Test Recall Campaigns',
      description: 'We find which of your dormant patients are due for a re-test and why, from your own historical data, and re-engage them in your name.',
      pricingModel: 'Per campaign or per converted re-test.',
      linkUrl: '/solutions/humbi',
    },
    {
      title: 'Solutions Engineering',
      description: 'Custom intelligence work on your data, by the team that built the core.',
      pricingModel: 'Per engagement.',
      linkUrl: '/solutions/supplements',
    },
  ];

  return (
    <section className="w-full font-body text-[#0F172A] py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="eyebrow text-[#B45309] font-bold text-xs uppercase tracking-widest font-mono">
            SPECIALISED SERVICES
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[54px] text-[#0F172A] tracking-tight leading-[1.08]">
            Four things you currently pay people to do — or don't do at all.
          </h2>
        </div>

        {/* 4 Compact Horizontal Rows matching Copy v2 spec */}
        <div className="divide-y divide-[#E2E8F0] border-y border-[#E2E8F0]">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#FFF7ED]/70 px-4 transition-colors rounded-[2px]"
            >
              <div className="space-y-1 max-w-3xl">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A]">
                  {s.title}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed font-body">
                  {s.description}
                </p>
              </div>

              <div className="flex items-center gap-6 shrink-0 font-mono text-xs">
                <span className="text-[#64748B] italic bg-slate-100 px-3 py-1.5 rounded-[2px]">
                  {s.pricingModel}
                </span>
                <Link
                  to={s.linkUrl}
                  className="font-bold text-[#0F172A] hover:text-[#2563EB] transition-colors whitespace-nowrap"
                >
                  Explore →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
