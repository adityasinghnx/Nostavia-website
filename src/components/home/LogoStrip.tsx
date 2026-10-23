import React from 'react';
import { clientLogos, FLAGS } from '../../content/site';

/** Client marks on a slow loop. Hidden entirely when the flag is off. */
export const LogoStrip: React.FC = () => {
  if (!FLAGS.SHOW_CLIENT_LOGOS) return null;
  const track = [...clientLogos, ...clientLogos];

  return (
    <section data-theme="ink" aria-label="Health businesses we work with" className="relative border-y border-fg/[0.07] py-10">
      <div className="wrap flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
        <p className="shrink-0 t-label text-fg/40 md:max-w-[15ch] md:leading-[1.5]">Working with health businesses in India and the UAE</p>
        <div className="relative flex-1 overflow-hidden mask-fade-x">
          <ul className="flex w-max items-center gap-16 sm:gap-24 animate-marquee hover:[animation-play-state:paused]">
            {track.map((logo, i) => (
              <li key={i} className="shrink-0 flex items-center h-12" aria-hidden={i >= clientLogos.length ? true : undefined}>
                <img
                  src={logo.src}
                  alt={i < clientLogos.length ? logo.name : ''}
                  loading="lazy"
                  decoding="async"
                  style={{ height: logo.h }}
                  className="w-auto object-contain brightness-0 invert opacity-45 hover:opacity-90 transition-opacity duration-500"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
