import React from 'react';
import { Link } from 'react-router-dom';
import { ABOUT, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, LINKEDIN_URL, REGIONS_LINE, company, nav } from '../../content/site';
import { Arrow } from '../ui/primitives';
import { RegionClocks } from '../ui/LocalTime';
import { CodeField } from '../ui/CodeField';

const linkClass = 'group inline-flex items-center gap-1.5 text-[14.5px] text-fg/60 hover:text-fg transition-colors duration-300';

/* Trust and legal links. Only pages that exist; Terms, DPA and subprocessors are added once drafted. */
const trust = [
  { label: 'Privacy policy', href: '/privacy-policy.html' },
  { label: 'Data deletion', href: '/data-deletion.html' },
  { label: 'Responsible disclosure', href: '/.well-known/security.txt' },
];

export const Footer: React.FC = () => (
  <footer data-theme="ink" className="relative isolate overflow-hidden border-t border-fg/[0.07] pt-20 sm:pt-28">
    <CodeField variant="feature" />
    <div className="wrap">
      <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-2 md:col-span-5 flex flex-col gap-6">
          <p className="text-[clamp(1.4rem,2vw,1.75rem)] leading-[1.1] tracking-[-0.03em] max-w-[18ch]">
            Health AI, ready-made or <span className="em text-accent">built for you.</span>
          </p>
          <p className="text-[15px] leading-relaxed text-fg/55 max-w-[46ch]">{ABOUT}</p>
          <div className="flex flex-col gap-2">
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
              {CONTACT_EMAIL}
              <Arrow diagonal className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </a>
            <a href={CONTACT_PHONE_HREF} className={linkClass}>
              {CONTACT_PHONE}
            </a>
          </div>
        </div>

        <nav aria-label="Product" className="md:col-span-2 md:col-start-7">
          <p className="t-label text-fg/40 mb-5">Product</p>
          <ul className="flex flex-col gap-3">
            {nav.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="md:col-span-2">
          <p className="t-label text-fg/40 mb-5">Company</p>
          <ul className="flex flex-col gap-3">
            <li>
              <Link to="/demo?interest=sales" className={linkClass}>
                Contact sales
              </Link>
            </li>
            <li>
              <Link to="/demo" className={linkClass}>
                Book a demo
              </Link>
            </li>
            <li>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                LinkedIn
                <Arrow diagonal className="w-3 h-3 opacity-50" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Trust" className="md:col-span-2">
          <p className="t-label text-fg/40 mb-5">Trust</p>
          <ul className="flex flex-col gap-3">
            {trust.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkClass}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Where we work: one live clock per region served */}
      <div className="mt-20 sm:mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
          <p className="t-label text-fg/40">Global</p>
          <p className="text-[14.5px] text-fg/55 max-w-[52ch] md:text-right">{REGIONS_LINE}</p>
        </div>
        <RegionClocks />
      </div>
    </div>

    {/* Oversized wordmark, cropped by the page edge. The cursor's code field is cut around it (data-code-mask). */}
    <div aria-hidden="true" className="relative mt-20 sm:mt-28 wrap">
      <div
        data-code-mask="/logo.png"
        className="w-full aspect-[5253/1381] translate-y-[22%]"
        style={{
          background: 'linear-gradient(180deg, rgba(242,210,122,0.22) 0%, rgba(242,237,227,0.05) 55%, rgba(242,237,227,0) 85%)',
          WebkitMaskImage: 'url(/logo.png)',
          maskImage: 'url(/logo.png)',
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      />
    </div>

    <div className="relative border-t border-fg/[0.07] bg-bg">
      <div className="wrap py-6 flex flex-col md:flex-row md:items-center justify-between gap-3 text-[12.5px] text-fg/45">
        <p>
          © {new Date().getFullYear()} {company.legal}
        </p>
        <p className="max-w-[60ch] md:text-right">Supports your team’s work. Never makes clinical decisions; clinicians do.</p>
      </div>
    </div>
  </footer>
);
