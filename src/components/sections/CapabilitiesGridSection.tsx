import React from 'react';

export const CapabilitiesGridSection: React.FC = () => {
  const capabilities = [
    {
      label: '100+ biomarkers',
      description: 'Classified optimal, in range or outlier against a personalised baseline — not a generic population range.',
    },
    {
      label: 'Native lab PDFs',
      description: 'Parsed straight from the report, digital signatures and all. No manual entry, no template per lab.',
    },
    {
      label: 'Food bio-impact',
      description: 'Scan a meal. Hormonal impact, metabolic simulation, circadian alignment, toxin flags, longevity score.',
    },
    {
      label: 'Wearable fusion',
      description: 'Apple Health, Google Health Connect, Oura, WHOOP, Fitbit, Garmin, Withings, Polar, Dexcom.',
    },
    {
      label: 'Whole-body correlation',
      description: "Runs silently. Finds the link between last month's sleep decline and this month's fasting glucose.",
    },
    {
      label: 'Adaptive protocols',
      description: 'Personalised across hundreds of parameters and adjusted as the body responds. Not a static PDF plan.',
    },
    {
      label: 'AI concierge',
      description: 'A 24/7 companion that learns what works for a specific person, grounded in their own data.',
    },
    {
      label: 'Population analytics',
      description: 'Cohort-level intelligence across your user base. Available from Growth tier up.',
    },
  ];

  return (
    <section className="w-full font-body text-[#0F172A] py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="eyebrow text-[#B45309] font-bold text-xs uppercase tracking-widest font-mono">
            CAPABILITIES
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-[#0F172A] tracking-tight leading-[1.05]">
            Everything a body produces, read as one signal.
          </h2>
        </div>

        {/* 4x2 Dense Capability Grid matching Copy v2 spec */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((c, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-3 hover:border-[#CBD5E1] transition-all"
            >
              <div className="font-mono text-xs font-bold text-[#9A3412] bg-[#FFF7ED] inline-block px-2.5 py-1 rounded-[2px] border border-[#FED7AA]">
                `{c.label}`
              </div>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-body">
                {c.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
