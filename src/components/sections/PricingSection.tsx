import React from 'react';
import { Link } from 'react-router-dom';

export const PricingSection: React.FC = () => {
  const tiers = [
    {
      name: 'Starter SDK',
      price: '$299',
      unit: '/mo',
      features: [
        'Up to 5,000 MAU',
        'Core infrastructure',
        'Any four modules',
        'API documentation',
        '48-hour support SLAs',
      ],
      ctaText: 'Get started',
    },
    {
      name: 'Growth SDK',
      price: '$999',
      unit: '/mo',
      isPopular: true,
      features: [
        'Up to 50,000 MAU',
        'All modules unlocked',
        'Population analytics',
        'Custom co-branding',
        '4-hour support SLAs',
        'Dedicated integration engineer',
      ],
      ctaText: 'Start Growth trial',
    },
    {
      name: 'White-Label Pro',
      price: '$1,999',
      unit: '/mo',
      features: [
        'Unlimited MAU',
        'Fully branded iOS & Android app',
        'All modules unlocked',
        'Priority 2-hour support',
        '$1,000 setup fee waived on annual',
      ],
      ctaText: 'Deploy White-Label',
    },
    {
      name: 'Enterprise',
      price: 'from $5,000',
      unit: '/mo',
      features: [
        'Unlimited MAU & scale',
        'Custom AI training on your data',
        'Custom SLA guarantees',
        'On-site engineering onboarding',
        'Quarterly executive reviews',
      ],
      ctaText: 'Contact Enterprise',
    },
  ];

  return (
    <section className="w-full font-body text-[#0F172A] py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="border-b border-[#E2E8F0] pb-4">
          <div className="space-y-2">
            <div className="eyebrow text-[#B45309] font-bold text-xs uppercase tracking-widest font-mono">
              PRICING
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-[#0F172A] tracking-tight leading-[1.05]">
              One monthly platform fee, tiered by scale.
            </h2>
          </div>
        </div>

        {/* 4 Tier Cards Inline Grid matching Copy v2 spec */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((t, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-[2px] border space-y-6 flex flex-col justify-between transition-all ${
                t.isPopular
                  ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xl'
                  : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:border-[#CBD5E1]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-display font-bold text-xl">
                    {t.name}
                  </h3>
                  {t.isPopular && (
                    <span className="text-[10px] font-mono font-bold bg-[#B45309] text-white px-2 py-0.5 rounded-[2px]">
                      POPULAR
                    </span>
                  )}
                </div>

                <div className="font-display font-extrabold text-3xl sm:text-4xl">
                  {t.price}
                  <span className={`text-xs font-mono font-normal ${t.isPopular ? 'text-slate-400' : 'text-[#64748B]'}`}>
                    {t.unit}
                  </span>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-200/40 text-xs font-body">
                  {t.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${t.isPopular ? 'bg-amber-400' : 'bg-[#B45309]'}`} />
                      <span className={t.isPopular ? 'text-slate-300' : 'text-[#64748B]'}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Link
                  to="/demo"
                  className={`w-full py-3 px-4 rounded-[2px] font-display text-xs font-bold uppercase tracking-wider text-center block transition-all ${
                    t.isPopular
                      ? 'bg-white text-[#0F172A] hover:bg-slate-100'
                      : 'bg-[#0F172A] text-white hover:bg-[#1E293B]'
                  }`}
                >
                  {t.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
