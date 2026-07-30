import React from 'react';

export const LogoTrustBar: React.FC = () => {
  const logos = [
    {
      name: 'AuraHealth',
      logo: 'AuraHealth',
      color: 'text-[#E11D48]',
    },
    {
      name: 'AgeWell',
      logo: '🌱 AgeWell',
      color: 'text-[#059669]',
    },
    {
      name: 'IIHMF',
      logo: 'IIHMF',
      color: 'text-[#2563EB]',
    },
    {
      name: 'APEX ATHLETIX',
      logo: 'APEX ATHLETIX ⚡',
      color: 'text-[#D97706]',
    },
  ];

  return (
    <div className="w-full py-6 border-y border-[#E2E8F0] bg-white font-body">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left Muted Eyebrow */}
        <div className="font-mono text-xs font-bold text-[#64748B] uppercase tracking-widest shrink-0">
          PRODUCTION REFERENCE CLIENTS
        </div>

        {/* Right Clean Logos Horizontal Row */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-8 sm:gap-12 lg:gap-16 w-full md:w-auto">
          {logos.map((item, idx) => (
            <div
              key={idx}
              className={`font-display font-extrabold text-2xl sm:text-3xl tracking-tight ${item.color} opacity-90 hover:opacity-100 transition-opacity cursor-pointer`}
            >
              {item.logo}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
