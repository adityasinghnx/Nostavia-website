import React from 'react';

export const LogoTrustBar: React.FC = () => {
  // Optically balanced, alternating visual weights (emblem -> wordmark -> crest -> tech mark)
  const clientLogos = [
    {
      name: '360 ATHLETIX',
      src: '/client_logos/X logo black.png 1.png',
      className: 'h-8 sm:h-9 w-auto object-contain',
    },
    {
      name: 'ClinicX',
      src: '/client_logos/clinicx_clean.png',
      className: 'h-7 sm:h-8 w-auto object-contain',
    },
    {
      name: 'TBI',
      src: '/client_logos/logo_tbi.e78b7546c7bb1d87e9f2 (1).png',
      className: 'h-11 sm:h-12 w-auto object-contain',
    },
    {
      name: 'Kiosk Health',
      src: '/client_logos/kiosk_health_clean.png',
      className: 'h-8 sm:h-9 w-auto object-contain',
    },
    {
      name: 'Live 360',
      src: '/client_logos/snksn-removebg-preview 1.png',
      className: 'h-9 sm:h-10 w-auto object-contain',
    },
    {
      name: 'ETLAWM',
      src: '/client_logos/Screenshot_2025-11-06_at_6.15.42_PM-removebg-preview 1.png',
      className: 'h-6 sm:h-7 w-auto object-contain',
    },
  ];

  // Two identical halves for a 100% seamless infinite translateX(-50%) marquee loop
  const singleTrack = [...clientLogos, ...clientLogos];
  const marqueeLogos = [...singleTrack, ...singleTrack];

  return (
    <div className="w-full py-7 border-y border-[#E2E8F0] bg-white font-body overflow-hidden select-none">
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

          <div className="flex w-max items-center gap-16 sm:gap-20 animate-marquee-left hover:[animation-play-state:paused]">
            {marqueeLogos.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center shrink-0 h-12 px-2 opacity-75 hover:opacity-100 transition-all cursor-pointer grayscale hover:grayscale-0"
              >
                <img
                  src={item.src}
                  alt={item.name}
                  className={item.className}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};


