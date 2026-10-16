import React from 'react';
import { TRUST_CONTACT, trustGroups, trustPick } from '../content/trust.config';
import { useSeo } from '../lib/useSeo';
import { InfrastructureGroup, PracticeChips, ProductionGroup, ProgramsGroup } from '../components/trust/TrustElements';

const Section: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <section aria-labelledby={id} className="space-y-6 border-t border-white/[0.08] pt-10">
    <h2 id={id} className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
      {title}
    </h2>
    {children}
  </section>
);

const ContactLink: React.FC = () => (
  <a
    href={`mailto:${TRUST_CONTACT}`}
    className="font-semibold text-white underline underline-offset-4 decoration-white/30 hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hos-yellow focus-visible:ring-offset-2"
  >
    {TRUST_CONTACT}
  </a>
);

export const SecurityPage: React.FC = () => {
  useSeo({
    title: 'Security and Compliance | Nostavia Health',
    description: 'How Nostavia protects laboratory, wearable and clinical data for partners across India, the UAE and beyond.',
    path: '/security',
  });

  return (
    <div className="flex flex-col gap-12 py-10 max-w-[1280px] mx-auto px-4 sm:px-6 font-body text-white bg-white/[0.03]">
      <header className="space-y-5 max-w-4xl">
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-[1.05]">
          Security and Compliance
        </h1>
        <p className="text-base sm:text-xl text-white/60 max-w-3xl leading-relaxed">
          Partners trust us with laboratory, wearable and clinical data. We treat that as a design constraint from the first line of code. This page sets out what is in place today, and which certifications are held by our infrastructure providers rather than by us.
        </p>
      </header>

      <Section id="infrastructure" title="Infrastructure">
        <InfrastructureGroup lazy={false} />
      </Section>

      <Section id="protect-data" title="How we protect data">
        <PracticeChips items={trustPick(['encryption', 'tenant-isolation', 'audit-logged', 'no-keys-on-device'])} />
      </Section>

      <Section id="clinical-governance" title="Clinical governance">
        <PracticeChips items={trustPick(['clinical-bench', 'decision-support'])} />
      </Section>

      <Section id="india-readiness" title="India readiness">
        <PracticeChips items={trustPick(['dpdp', 'abdm'])} />
      </Section>

      <Section id="production" title={trustGroups.production.heading}>
        <ProductionGroup />
      </Section>

      <Section id="supported-by" title={trustGroups.programs.heading}>
        <ProgramsGroup showHeading={false} />
      </Section>

      <Section id="documentation" title="Documentation">
        <p className="text-base text-white/60 leading-relaxed max-w-3xl">
          Our Data Processing Agreement, sub-processor list and security documentation are shared with partners at technical scoping. Write to <ContactLink />.
        </p>
      </Section>

      <Section id="disclosure" title="Responsible disclosure">
        <p className="text-base text-white/60 leading-relaxed max-w-3xl">
          If you believe you have found a security issue, write to <ContactLink />. We review every report.
        </p>
      </Section>
    </div>
  );
};
