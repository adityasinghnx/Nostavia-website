import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { trustPick } from '../../content/trust.config';
import { InfrastructureGroup, PracticeChips, ProgramsGroup } from '../trust/TrustElements';
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

export const EnterpriseReady: React.FC = () => (
  <section aria-labelledby="enterprise-heading" className="relative bg-ink-950 py-24 sm:py-32">
    <Container className="space-y-14">
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
        <Reveal className="lg:col-span-7 h-full">
          <div aria-labelledby="trust-strip-heading" className="h-full rounded-[22px] dk-card p-6 sm:p-8 space-y-8">
            <div className="space-y-3">
              <h3 id="trust-strip-heading" className="text-2xl font-semibold text-white">
                Built for health data from day one
              </h3>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                Nostavia runs on infrastructure certified to SOC 2 Type II and ISO/IEC 27001, with partner data isolated, encrypted and handled in line with India's DPDP Act.
              </p>
            </div>
            <InfrastructureGroup />
            <PracticeChips items={trustPick(['dpdp', 'encryption', 'tenant-isolation'])} columns={3} />
            <Link to="/security" className={`inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-hos-yellow rounded ${focusRing}`}>
              Security and compliance
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-5 h-full">
          <div className="h-full rounded-[22px] dk-card p-6 sm:p-8 flex flex-col gap-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-white">Reviewed by clinicians</h3>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                Protocol outputs are reviewed by our licensed clinical advisory bench before release to any partner.
              </p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {bench.map((b) => (
                <li key={b.name} className="flex items-center gap-3 rounded-xl bg-white/[0.03] ring-1 ring-white/[0.06] p-3">
                  <span aria-hidden="true" className="w-9 h-9 shrink-0 rounded-full bg-hos-yellow/15 ring-1 ring-hos-yellow/40 text-hos-yellow text-xs font-semibold flex items-center justify-center">
                    {initials(b.name)}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-white truncate">{b.name}</span>
                    <span className="block text-xs text-white/55 truncate">{b.role}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-auto space-y-4">
              <Link to="/clinical" className={`inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-hos-yellow rounded ${focusRing}`}>
                See our clinical evidence
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
              <Disclaimer />
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="rounded-[22px] dk-card p-6 sm:p-8">
          <ProgramsGroup />
        </div>
      </Reveal>
    </Container>
  </section>
);
