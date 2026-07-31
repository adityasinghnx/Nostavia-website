import React from 'react';

export const LogoTrustBar: React.FC = () => {
  const clientLogos = [
    {
      name: 'Live 360',
      src: '/client_logos/snksn-removebg-preview 1.png',
      className: 'h-9 sm:h-10 w-auto object-contain grayscale',
    },
    {
      name: '360 ATHLETIX',
      src: '/client_logos/X logo black.png 1.png',
      className: 'h-9 sm:h-10 w-auto object-contain grayscale',
    },
    {
      name: 'TBI',
      src: '/client_logos/logo_tbi.e78b7546c7bb1d87e9f2 (1).png',
      className: 'h-[72px] sm:h-[80px] w-auto object-contain grayscale',
    },
  ];

  // Repeat 3 client logos 8 times to fill the marquee track completely and create a rich, dense loop
  const marqueeLogos = [
    ...clientLogos,
    ...clientLogos,
    ...clientLogos,
    ...clientLogos,
    ...clientLogos,
    ...clientLogos,
    ...clientLogos,
    ...clientLogos,
  ];

  return (
    <div className="w-full py-7 border-y border-[#E2E8F0] bg-white font-body overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left Eyebrow Label */}
        <div className="shrink-0">
          <span className="font-mono text-xs font-bold text-[#64748B] uppercase tracking-widest">
            POWERING LEADING HEALTH CLIENTS
          </span>
        </div>

        {/* Right Marquee Ticker Track */}
        <div className="relative overflow-hidden flex-1 max-w-full md:max-w-[70%] lg:max-w-[75%]">
          {/* Gradient Mask Overlays on Edges */}
          <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex w-max items-center gap-16 sm:gap-24 animate-marquee-left hover:[animation-play-state:paused]">
            {marqueeLogos.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center shrink-0 opacity-75 hover:opacity-100 transition-all cursor-pointer px-4 grayscale"
              >
                <img
                  src={item.src}
                  alt={item.name}
                  className={item.className}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};


