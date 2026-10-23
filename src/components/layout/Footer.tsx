import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, CRUNCHBASE_URL, LINKEDIN_URL, STUDIO, STUDIO_PATH, company } from '../../content/site';
import { Arrow } from '../ui/primitives';
import { HiveMark } from '../ui/marks';
import { LocalTime } from '../ui/LocalTime';

type FooterLink = { label: string; to?: string; href?: string };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Hive', to: '/hive' },
      { label: 'Human OS', to: '/human-os' },
      { label: STUDIO, to: STUDIO_PATH },
      { label: 'Developers', to: '/developers' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Customers', to: '/customers' },
      { label: 'About', to: '/company' },
      { label: 'Security', to: '/security' },
      { label: 'Book a demo', to: '/demo' },
    ],
  },
  {
    title: 'Elsewhere',
    links: [
      { label: 'LinkedIn', href: LINKEDIN_URL },
      { label: 'Crunchbase', href: CRUNCHBASE_URL },
      { label: 'Email', href: `mailto:${CONTACT_EMAIL}` },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy-policy.html' },
      { label: 'Data deletion', href: '/data-deletion.html' },
      { label: 'Delete account', href: '/delete-account.html' },
    ],
  },
];

const linkClass = 'group inline-flex items-center gap-1.5 text-[14.5px] text-fg/60 hover:text-fg transition-colors duration-300';

export const Footer: React.FC = () => (
  <footer data-theme="ink" className="relative overflow-hidden border-t border-fg/[0.07] pt-20 sm:pt-28">
    <div className="wrap">
      <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-2 md:col-span-4 flex flex-col gap-6">
          <Link to="/hive" className="inline-flex items-center gap-2.5 self-start text-accent">
            <HiveMark className="w-6 h-6" />
            <span className="text-fg text-[15px] tracking-[-0.01em]">Hive</span>
          </Link>
          <p className="text-[22px] sm:text-[26px] leading-[1.15] tracking-[-0.025em] max-w-[22ch]">
            One place. Your <span className="text-accent">Bees</span> run the rest.
          </p>
          <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
            {CONTACT_EMAIL}
            <Arrow diagonal className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
          </a>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="md:col-span-2">
            <p className="t-label text-fg/40 mb-5">{col.title}</p>
            <ul className="flex flex-col gap-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.to ? (
                    <Link to={l.to} className={linkClass}>
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      href={l.href}
                      className={linkClass}
                      target={l.href?.startsWith('http') ? '_blank' : undefined}
                      rel={l.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {l.label}
                      {l.href?.startsWith('http') && (
                        <>
                          <Arrow diagonal className="w-3 h-3 opacity-50" />
                          <span className="sr-only">(opens in a new tab)</span>
                        </>
                      )}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
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
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-honey animate-pulse2" />
            <LocalTime />
          </span>
        </p>
        <p className="max-w-[60ch] md:text-right">Decision support only. Nostavia does not diagnose and is not a medical device.</p>
      </div>
    </div>
  </footer>
);
