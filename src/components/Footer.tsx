import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { HUMAN_OS_PATH, systemPath, systems } from '../content/human-os';
import { trustFooterLine } from '../content/trust.config';

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hos-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 rounded';

const columns: { title: string; links: { to: string; label: string; external?: boolean }[] }[] = [
  {
    title: 'Products',
    links: [
      { to: '/solutions/engineering', label: 'Custom Build' },
      { to: '/solutions/storyhealth', label: 'White Label' },
      { to: '/solutions/gravity', label: 'SDK' },
      { to: '/solutions/front-desk', label: 'AI Front Desk Agent' },
      { to: '/solutions/hospitals', label: 'Hospital Programmes' },
      { to: '/platform', label: 'Technology' },
    ],
  },
  {
    title: 'Human OS',
    links: [{ to: HUMAN_OS_PATH, label: 'Overview' }, ...systems.map((s) => ({ to: systemPath(s.slug), label: s.name }))],
  },
  {
    title: 'Industries',
    links: [
      { to: '/industries/diagnostic-labs', label: 'Diagnostic Labs' },
      { to: '/industries/clinics', label: 'Clinics & Longevity' },
      { to: '/industries/hospitals', label: 'Hospitals' },
      { to: '/industries/supplements', label: 'Wellness & Apps' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/company', label: 'About & Founders' },
      { to: '/pricing', label: 'Pricing' },
      { to: '/security', label: 'Security' },
      { to: '/clinical', label: 'Clinical Governance' },
      { to: '/demo', label: 'Book a Demo' },
      { to: 'https://www.crunchbase.com/organization/nostavia-health', label: 'Crunchbase', external: true },
    ],
  },
];

export const Footer: React.FC = () => (
  <footer className="relative bg-ink-950 border-t border-white/[0.08] text-white/60 overflow-hidden">
    <span aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 -top-40 w-[1000px] max-w-[160vw] h-[360px] bg-[radial-gradient(closest-side,rgba(245,217,123,0.08),transparent)] pointer-events-none" />
    <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 pt-16 pb-10">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-10 pb-12 border-b border-white/[0.08]">
        <div className="col-span-2 flex flex-col gap-5">
          <Link to="/" className={`self-start ${focusRing}`}>
            <img src="/logo.png" alt="Nostavia Health" width={140} height={36} loading="lazy" className="h-8 w-auto object-contain brightness-0 invert" />
          </Link>
          <p className="text-sm text-white/55 max-w-sm leading-relaxed">
            Nostavia builds health AI products for labs, clinics, hospitals and health apps, as a Custom Build, a White Label product or an SDK, all under your brand.
          </p>
          <div className="text-xs text-white/50 leading-relaxed">
            <div>Nostavia Technologies Pvt. Ltd.</div>
            <div>Headquartered in Lucknow, India · Serving India & UAE</div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {[
              { href: 'https://apps.apple.com/us/app/nostavia-health/id6760108353', pre: 'Download on the', name: 'App Store' },
              { href: 'https://play.google.com/store/apps/details?id=com.nostavia.nostavia_health&hl=en_IN', pre: 'Get it on', name: 'Google Play' },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex flex-col leading-none rounded-lg dk-card px-3.5 py-2 hover:border-white/20 transition-colors ${focusRing}`}
              >
                <span className="text-[9px] uppercase tracking-wider text-white/50">{s.pre}</span>
                <span className="text-xs font-semibold text-white mt-0.5">{s.name}</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-white">{col.title}</div>
            {col.links.map((l) =>
              l.external ? (
                <a key={l.to} href={l.to} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 text-sm hover:text-white transition-colors ${focusRing}`}>
                  {l.label}
                  <ArrowUpRight aria-hidden="true" className="w-3 h-3" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <Link key={l.to} to={l.to} className={`text-sm hover:text-white transition-colors ${focusRing}`}>
                  {l.label}
                </Link>
              )
            )}
          </div>
        ))}
      </div>

      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
        <div>© 2026 Nostavia Technologies Pvt. Ltd. All rights reserved.</div>
        <div className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-hos-yellow" />
          {trustFooterLine}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
