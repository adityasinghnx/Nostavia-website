import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Boxes, FileCheck2, KeyRound, Lock, ShieldCheck, type LucideIcon } from 'lucide-react';
import { TrustItem, trustGroup, trustGroups, trustPick } from '../../content/trust.config';
import { ProductionGroup } from '../trust/TrustElements';
import { Disclaimer } from '../human-os/Disclaimer';
import { Container, SectionHeading, focusRing } from '../home/shared';
import { Reveal } from '../home/motion';

/* Advisory bench mirrors the Company page. Security wording comes from trust.config and the
 * approved trust-strip copy (certifications belong to infrastructure providers, not Nostavia). */
const bench = [
  { name: 'Dr. Sparsh Sehdev', role: 'MBBS, GMC Registered (UK)' },
  { name: 'Aakanksha Pant, PhD', role: 'Senior Scientist, IISc Bangalore' },
  { name: 'Sharwani Walke', role: 'MSc Clinical Nutrition, UCL' },
  { name: 'Dr. Akshita Gupta', role: 'MBBS, chronic conditions' },
  { name: 'Anmol Udhad', role: 'Sports Nutritionist (ISSA), MBA' },
  { name: 'Dr. Dipa Patle', role: 'Ayurvedic Doctor (BAMS)' },
];

const initials = (name: string) =>
  name
    .replace(/^Dr\.\s*/, '')
    .replace(/,.*$/, '')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);

const practiceIcons: Record<string, LucideIcon> = {
  dpdp: FileCheck2,
  encryption: Lock,
  'tenant-isolation': Boxes,
  'no-keys-on-device': KeyRound,
};

/* "Database and authentication. SOC 2 Type II" → role + certification pills */
const splitDescriptor = (item: TrustItem) => {
  const d = item.descriptor ?? '';
  const i = d.indexOf('. ');
  if (i === -1) return { role: d, certs: [] as string[] };
  return { role: d.slice(0, i), certs: d.slice(i + 2).split(' and ') };
};

const cardTitle = 'text-xl sm:text-2xl font-semibold text-white tracking-tight';
const label = 'text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45';

export const EnterpriseReady: React.FC = () => (
  <section aria-labelledby="enterprise-heading" className="relative bg-ink-950 py-24 sm:py-32 overflow-hidden">
    <div aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 top-0 w-[1100px] max-w-[180vw] h-[600px] bg-[radial-gradient(closest-side,rgba(245,217,123,0.06),transparent)]" />
    <Container className="relative space-y-14">
      <Reveal>
        {/* TODO(copy): section heading and intro */}
        <SectionHeading
          id="enterprise-heading"
          eyebrow="Trust"
          title="Enterprise-ready, clinically governed."
          intro="Health data is regulated. Security, privacy and clinical review are part of the product, not an add-on."
          center
        />
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Security practices */}
        <Reveal className="lg:col-span-7 h-full">
          <div aria-labelledby="trust-strip-heading" className="h-full rounded-[22px] dk-card p-6 sm:p-8 flex flex-col">
            <span className="w-11 h-11 rounded-xl bg-hos-yellow/10 ring-1 ring-hos-yellow/30 text-hos-yellow flex items-center justify-center">
              <ShieldCheck aria-hidden="true" className="w-5 h-5" />
            </span>
            <h3 id="trust-strip-heading" className={`mt-6 ${cardTitle}`}>
              Built for health data from day one
            </h3>
            <p className="mt-3 text-sm sm:text-base text-white/60 leading-relaxed max-w-xl">
              Nostavia runs on infrastructure certified to SOC 2 Type II and ISO/IEC 27001, with partner data isolated, encrypted and handled in line with India's DPDP Act.
            </p>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t border-white/[0.06]">
              {trustPick(['dpdp', 'encryption', 'tenant-isolation', 'no-keys-on-device']).map((p) => {
                const Icon = practiceIcons[p.id];
                return (
                  <li key={p.id} className="flex gap-3 py-5 border-b border-white/[0.06]">
                    <Icon aria-hidden="true" className="mt-0.5 w-4 h-4 shrink-0 text-hos-yellow" />
                    <span>
                      <span className="block text-sm font-semibold text-white">{p.name}</span>
                      <span className="mt-1 block text-sm text-white/55 leading-relaxed">{p.descriptor}</span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <Link to="/security" className={`mt-auto pt-8 self-start inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-hos-yellow rounded ${focusRing}`}>
              Security and compliance
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        {/* Certified infrastructure */}
        <Reveal delay={100} className="lg:col-span-5 h-full">
          <div className="h-full rounded-[22px] dk-card p-6 sm:p-8 flex flex-col">
            <h3 className={label}>{trustGroups.infrastructure.heading}</h3>
            <ul className="mt-5 space-y-3">
              {trustGroup('infrastructure').map((item) => {
                const { role, certs } = splitDescriptor(item);
                return (
                  <li key={item.id} className="rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06] p-5">
                    <div className="h-8 flex items-center">
                      {item.logo ? (
                        <img src={item.logo} alt={`${item.name} logo`} width={item.logoWidth} height={item.logoHeight} loading="lazy" decoding="async" className="h-7 w-auto" />
                      ) : (
                        <span className="text-xl font-semibold text-white tracking-tight">{item.name}</span>
                      )}
                    </div>
                    <p className="mt-3 text-sm text-white/55">{role}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {certs.map((c) => (
                        <span key={c} className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] ring-1 ring-white/10 px-2.5 py-1 text-xs text-white/80">
                          <ShieldCheck aria-hidden="true" className="w-3 h-3 text-hos-yellow" />
                          {c}
                        </span>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-xs text-white/45 leading-relaxed">{trustGroups.infrastructure.caption}</p>
          </div>
        </Reveal>

        {/* Clinical bench */}
        <Reveal className="lg:col-span-7 h-full">
          <div className="h-full rounded-[22px] dk-card p-6 sm:p-8 flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h3 className={cardTitle}>Reviewed by clinicians</h3>
                <p className="mt-3 text-sm sm:text-base text-white/60 leading-relaxed max-w-md">
                  Protocol outputs are reviewed by our licensed clinical advisory bench before release to any partner.
                </p>
              </div>
              <Link to="/clinical" className={`shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-hos-yellow rounded ${focusRing}`}>
                Clinical evidence
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </div>
            <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {bench.map((b) => (
                <li key={b.name} className="rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06] p-4">
                  <span aria-hidden="true" className="w-10 h-10 rounded-full bg-gradient-to-br from-hos-yellow/30 to-hos-yellow/5 ring-1 ring-hos-yellow/40 text-hos-yellow text-xs font-semibold flex items-center justify-center">
                    {initials(b.name)}
                  </span>
                  <span className="mt-3 block text-sm font-semibold text-white">{b.name}</span>
                  <span className="mt-0.5 block text-xs text-white/50 leading-relaxed">{b.role}</span>
                </li>
              ))}
            </ul>
            <Disclaimer className="mt-6" />
          </div>
        </Reveal>

        {/* Programmes and app stores */}
        <Reveal delay={100} className="lg:col-span-5 h-full">
          <div className="h-full rounded-[22px] dk-card p-6 sm:p-8 flex flex-col">
            <h3 className={label}>{trustGroups.programs.heading}</h3>
            <ul className="mt-5 grid grid-cols-2 gap-3">
              {trustGroup('programs').map((item) => (
                <li key={item.id} className="h-16 rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06] px-3 flex items-center justify-center text-center">
                  {item.logo ? (
                    <img src={item.logo} alt={`${item.name} logo`} width={item.logoWidth} height={item.logoHeight} loading="lazy" className="h-7 w-auto" />
                  ) : (
                    <span className="text-sm font-semibold text-white/85 tracking-tight">{item.name}</span>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8 border-t border-white/[0.06] space-y-4">
              <h3 className={`pt-6 ${label}`}>{trustGroups.production.heading}</h3>
              <ProductionGroup />
            </div>
          </div>
        </Reveal>
      </div>
    </Container>
  </section>
);
