import React from 'react';
import { Link } from 'react-router-dom';
import { ABOUT, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, LINKEDIN_URL, company, nav } from '../../content/site';
import { Arrow } from '../ui/primitives';
import { LocalTime } from '../ui/LocalTime';

const linkClass = 'group inline-flex items-center gap-1.5 text-[14.5px] text-fg/60 hover:text-fg transition-colors duration-300';

/* Footer links per the website source (B9). Terms is added once the page is drafted. */
const legal = [{ label: 'Privacy policy', href: '/privacy-policy.html' }];

export const Footer: React.FC = () => (
  <footer data-theme="ink" className="relative overflow-hidden border-t border-fg/[0.07] pt-20 sm:pt-28">
    <div className="wrap">
      <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-2 md:col-span-5 flex flex-col gap-6">
          <p className="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] tracking-[-0.03em] max-w-[18ch]">
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

        <nav aria-label="Product" className="md:col-span-3 md:col-start-7">
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

        <nav aria-label="Company" className="md:col-span-3">
          <p className="t-label text-fg/40 mb-5">Company</p>
          <ul className="flex flex-col gap-3">
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
            {legal.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkClass}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>

    {/* Oversized wordmark, cropped by the page edge */}
    <div aria-hidden="true" className="relative mt-20 sm:mt-28 wrap">
      <div
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
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>
            © {new Date().getFullYear()} {company.legal}
          </span>
          <LocalTime />
        </p>
        <p className="max-w-[60ch] md:text-right">Supports your team’s work. Never makes clinical decisions; clinicians do.</p>
      </div>
    </div>
  </footer>
);
