import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { trustPick } from '../../content/trust.config';
import { InfrastructureGroup, PracticeChips, ProgramsGroup } from '../trust/TrustElements';

/** Homepage trust strip. All logos and chips come from trust.config. */
export const TrustStripSection: React.FC = () => (
  <section aria-labelledby="trust-strip-heading" className="w-full font-body text-[#0F172A] bg-white">
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
      <div className="border border-[#E2E8F0] rounded-[2px] p-6 sm:p-10 lg:p-12 space-y-10">
        <div className="space-y-3 max-w-3xl">
          <h2 id="trust-strip-heading" className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight leading-[1.08]">
            Built for health data from day one
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
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
          className="inline-flex items-center gap-2 font-display text-sm font-bold text-[#0F172A] underline underline-offset-4 decoration-[#CBD5E1] hover:decoration-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:ring-offset-2"
        >
          Security and compliance
          <ArrowRight aria-hidden="true" className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default TrustStripSection;
