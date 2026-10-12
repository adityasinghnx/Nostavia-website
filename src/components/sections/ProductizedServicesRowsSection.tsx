import React from 'react';
import { Link } from 'react-router-dom';

export const ProductizedServicesRowsSection: React.FC = () => {
  const services = [
    {
      title: 'Custom Build',
      description: 'Not on this list, or want it your way? We design and build your product from scratch around your patients, staff and systems — then launch and run it.',
      pricingModel: 'From $7,500 + $750/mo',
      linkUrl: '/solutions/engineering',
    },
    {
      title: 'AI Front Desk Agent',
      description: 'Answers every patient call 24/7 in local languages, names the right doctor and books the visit — on your phone line, WhatsApp and website.',
      pricingModel: 'From $1,500 + $399/mo',
      linkUrl: '/solutions/front-desk',
    },
    {
      title: 'Smart Reports & Re-Test Recall',
      description: 'Every lab report becomes a branded, plain-language health report — and dormant patients due for a re-test are brought back in your name.',
      pricingModel: 'From $1,500 + $399/mo',
      linkUrl: '/solutions/comet',
    },
    {
      title: 'Branded Patient App',
      description: 'Your own iOS & Android app: reports explained, wearables and food scanning, an AI health companion and bookings — with your name on the store listing.',
      pricingModel: 'From $2,500 + $499/mo',
      linkUrl: '/solutions/storyhealth',
    },
    {
      title: 'Clinic & Longevity Platform',
      description: 'Intake briefs before every consult, biological age, adaptive protocols and a dashboard of who is drifting between visits.',
      pricingModel: 'From $2,500 + $499/mo',
      linkUrl: '/industries/clinics',
    },
    {
      title: 'Hospital Patient Programmes',
      description: 'Five programmes that bring patients back after health checks, after discharge and between chronic-care visits — starting with a free Leakage Audit.',
      pricingModel: 'From $5,000 + $999/mo',
      linkUrl: '/solutions/hospitals',
    },
  ];

  return (
    <section className="w-full font-body text-[#0F172A] py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="eyebrow text-[#B45309] font-bold text-xs uppercase tracking-widest font-mono">
            CUSTOM BUILD & WHITE LABEL
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[54px] text-[#0F172A] tracking-tight leading-[1.08]">
            Built from scratch for you — or ready-made, under your brand.
          </h2>
        </div>

        {/* Compact Horizontal Rows matching Copy v2 spec */}
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
