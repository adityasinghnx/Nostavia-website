import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { trustPick } from '../../content/trust.config';
import { InfrastructureGroup, PracticeChips, ProgramsGroup } from '../trust/TrustElements';
import { Container, Eyebrow } from '../home/shared';
import { Reveal } from '../home/motion';

/** Homepage trust strip. All logos and chips come from trust.config. */
export const TrustStripSection: React.FC = () => (
  <section aria-labelledby="trust-strip-heading" className="w-full font-body text-white bg-ink-950 py-20 sm:py-28">
    <Container>
      <Reveal>
      <div className="rounded-[16px] bg-white/[0.03] border border-white/[0.08] p-6 sm:p-10 lg:p-12 space-y-10 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.5)]">
        <div className="space-y-4 max-w-3xl">
          <Eyebrow>Security and compliance</Eyebrow>
          <h2 id="trust-strip-heading" className="font-display font-semibold text-3xl sm:text-5xl text-white tracking-tight leading-[1.08]">
            Built for health data from day one
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            Nostavia runs on infrastructure certified to SOC 2 Type II and ISO/IEC 27001, with partner data isolated, encrypted and handled in line with India's DPDP Act.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <InfrastructureGroup />
          <ProgramsGroup />
        </div>

        <PracticeChips items={trustPick(['dpdp', 'encryption', 'tenant-isolation'])} columns={3} />

        <Link
          to="/security"
          className="inline-flex items-center gap-2 font-display text-sm font-bold text-white underline underline-offset-4 decoration-hos-yellow decoration-2 hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hos-yellow focus-visible:ring-offset-2"
        >
          Security and compliance
          <ArrowRight aria-hidden="true" className="w-4 h-4" />
        </Link>
      </div>
      </Reveal>
    </Container>
  </section>
);

export default TrustStripSection;
