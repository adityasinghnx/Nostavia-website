import React from 'react';
import { clientLogos, FLAGS, programmes } from '../../content/site';
import { Reveal } from '../ui/motion';
import { CodeField } from '../ui/CodeField';

/**
 * Institutional proof under the hero: the programmes we belong to, set as type,
 * then any client whose written logo permission is on file.
 */
export const TrustBar: React.FC = () => {
  const clients = FLAGS.SHOW_CLIENT_LOGOS ? clientLogos : [];

  return (
    <section data-theme="ink" aria-label="Programmes and partners" className="relative isolate border-y border-fg/[0.07]">
      <CodeField />
      <div className="wrap py-10 md:py-12 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14">
        <p className="shrink-0 t-label text-fg/40 lg:max-w-[16ch] lg:leading-[1.5]">Backed by programmes at</p>

        <Reveal className="flex-1">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
          {programmes.map((p) => (
            <li key={p.org} className="flex flex-col gap-1.5">
              <span className="text-[clamp(1.25rem,1.8vw,1.6rem)] leading-none tracking-[-0.03em] font-[520] text-fg/80">{p.org}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg/40">{p.programme}</span>
            </li>
          ))}
          </ul>
        </Reveal>

        {clients.length > 0 && (
          <div className="shrink-0 flex items-center gap-8 lg:pl-14 lg:border-l border-fg/[0.08]">
            <p className="t-label text-fg/40 max-w-[12ch] leading-[1.5]">Live in production with</p>
            <ul className="flex items-center gap-10">
              {clients.map((logo) => (
                <li key={logo.name} className="flex items-center h-12">
                  <img src={logo.src} alt={logo.name} loading="lazy" decoding="async" style={{ height: logo.h }} className="w-auto object-contain brightness-0 invert opacity-60" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};
