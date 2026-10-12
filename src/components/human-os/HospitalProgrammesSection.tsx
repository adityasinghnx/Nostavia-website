import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HUMAN_OS_PATH, hospitalProgrammes, numberWord } from '../../content/human-os';
import { HospitalProgrammes } from './HospitalProgrammes';
import { Disclaimer } from './Disclaimer';
import { eyebrow, focusRing } from './styles';

/** Leads hospital pages: the five programmes and the Human OS systems behind each. */
export const HospitalProgrammesSection: React.FC = () => (
  <section aria-labelledby="hospital-programmes-heading" className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
    <div className="rounded-[16px] border border-hos-hairline bg-hos-card p-5 sm:p-8 lg:p-10 space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div className="space-y-3 max-w-3xl">
          <div className={eyebrow}>Human OS for hospitals</div>
          {/* TODO(copy): hospital programmes section heading and intro */}
          <h2 id="hospital-programmes-heading" className="font-display font-extrabold text-3xl sm:text-5xl text-hos-black tracking-tight leading-[1.05]">
            {numberWord(hospitalProgrammes.length)} programmes, powered by Human OS
          </h2>
          <p className="text-base text-[#475569] leading-relaxed">
            Each programme runs on the Human OS systems listed with it, under your hospital's brand.
          </p>
        </div>
        <Link
          to={HUMAN_OS_PATH}
          className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-hos-black hover:text-hos-amber shrink-0 ${focusRing}`}
        >
          Explore Human OS
          <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
        </Link>
      </div>
      <HospitalProgrammes />
      <Disclaimer />
    </div>
  </section>
);
