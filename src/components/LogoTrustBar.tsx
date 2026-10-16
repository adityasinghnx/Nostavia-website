import React from 'react';

/* Client logos, rendered as white monochrome marks for the dark theme. */
export const clientLogos = [
  { name: '360 ATHLETIX', src: '/client_logos/X logo black.png 1.png', className: 'h-8 sm:h-9' },
  { name: 'ClinicX', src: '/client_logos/clinicx_clean.png', className: 'h-7 sm:h-8' },
  { name: 'TBI', src: '/client_logos/logo_tbi.e78b7546c7bb1d87e9f2 (1).png', className: 'h-11 sm:h-12' },
  { name: 'Kiosk Health', src: '/client_logos/kiosk_health_clean.png', className: 'h-8 sm:h-9' },
  { name: 'Live 360', src: '/client_logos/snksn-removebg-preview 1.png', className: 'h-9 sm:h-10' },
  { name: 'Atmaram Healthcare', src: '/client_logos/atmaram_healthcare.png', className: 'h-8 sm:h-9' },
  { name: 'ETLAWM', src: '/client_logos/Screenshot_2025-11-06_at_6.15.42_PM-removebg-preview 1.png', className: 'h-6 sm:h-7' },
];

export const LogoTrustBar: React.FC = () => {
  // Two identical halves so translateX(-50%) loops seamlessly
  const track = [...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <div className="relative w-full py-10 border-y border-white/[0.06] bg-ink-950 overflow-hidden select-none">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
        <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Powering leading health brands</p>
        <div className="relative overflow-hidden flex-1 hos-anim">
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-ink-950 to-transparent z-10 pointer-events-none" />
          <div aria-hidden="true" className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ink-950 to-transparent z-10 pointer-events-none" />
          <ul className="flex w-max items-center gap-14 sm:gap-20 hover:[animation-play-state:paused]" style={{ animation: 'dk-marquee 40s linear infinite' }}>
            {track.map((logo, i) => (
              <li key={i} className="flex items-center justify-center shrink-0 h-12" aria-hidden={i >= clientLogos.length ? true : undefined}>
                <img
                  src={logo.src}
                  alt={i < clientLogos.length ? logo.name : ''}
                  loading="lazy"
                  decoding="async"
                  className={`${logo.className} w-auto object-contain brightness-0 invert opacity-55 hover:opacity-100 transition-opacity`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
