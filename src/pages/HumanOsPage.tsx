import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import {
  HUMAN_OS_PATH,
  hospitalProgrammes,
  numberWord,
  statusDefinitions,
  steps,
  totalModules,
  totalSystems,
} from '../content/human-os';
import { useSeo } from '../lib/useSeo';
import { RingVisual } from '../components/human-os/RingVisual';
import { BuyerGrid } from '../components/human-os/BuyerMapping';
import { HospitalProgrammes } from '../components/human-os/HospitalProgrammes';
import { StatusBadge } from '../components/human-os/StatusBadge';
import { Disclaimer } from '../components/human-os/Disclaimer';
import { eyebrow, focusRing, primaryCta, secondaryCta } from '../components/human-os/styles';

const RINGS_ANCHOR = 'systems';

const subhead = `${numberWord(totalSystems)} systems and ${totalModules} modules, delivered through one integration, entirely under your brand.`;

const SectionHeader: React.FC<{ id: string; eyebrowText: string; title: string; intro?: string }> = ({ id, eyebrowText, title, intro }) => (
  <div className="space-y-3 max-w-3xl">
    <div className={eyebrow}>{eyebrowText}</div>
    <h2 id={id} className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-[1.05]">
      {title}
    </h2>
    {intro && <p className="text-base sm:text-lg text-white/60 leading-relaxed">{intro}</p>}
  </div>
);

export const HumanOsPage: React.FC = () => {
  useSeo({
    title: 'Human OS: every body gets an operating system | Nostavia Health',
    description: subhead,
    path: HUMAN_OS_PATH,
  });

  return (
    <div className="flex flex-col gap-20 sm:gap-28 pb-16 font-body text-white bg-white/[0.03]">
      {/* Hero */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-12 sm:pt-20">
        <div className="max-w-4xl space-y-6">
          <div className={eyebrow}>Human OS</div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.02]">
            Every body gets an operating system.
          </h1>
          <div className="w-16 h-1 bg-hos-yellow" aria-hidden="true" />
          <p className="text-lg sm:text-xl text-white/60 leading-relaxed max-w-2xl">{subhead}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/demo" className={primaryCta}>
              Request a demo
            </Link>
            <a href={`#${RINGS_ANCHOR}`} className={secondaryCta}>
              Explore the systems
              <ArrowDown aria-hidden="true" className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* The two rings */}
      <section aria-labelledby="rings-heading" className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-8 scroll-mt-24" id={RINGS_ANCHOR}>
        {/* TODO(copy): heading and intro for the rings section */}
        <SectionHeader
          id="rings-heading"
          eyebrowText="The two rings"
          title={`${numberWord(totalSystems)} systems in two rings`}
          intro="Buyers choose systems. Modules sit inside them."
        />
        <RingVisual />
      </section>

      {/* How it works */}
      <section aria-labelledby="how-heading" className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-8">
        <SectionHeader id="how-heading" eyebrowText="How it works" title="How it works" />
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-3 rounded-[10px] border border-white/[0.08] bg-white/[0.04] p-5 sm:p-6">
              <span className="w-9 h-9 rounded-full bg-hos-yellow text-white flex items-center justify-center font-mono text-sm font-bold" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="font-display font-extrabold text-lg text-white">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Who it's for */}
      <section aria-labelledby="who-heading" className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-8">
        <SectionHeader id="who-heading" eyebrowText="Who it's for" title="Who it's for" />
        <BuyerGrid />
      </section>

      {/* For hospitals */}
      <section aria-labelledby="hospitals-heading" className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-8">
        {/* TODO(copy): intro line for the hospital programmes section */}
        <SectionHeader
          id="hospitals-heading"
          eyebrowText="For hospitals"
          title="For hospitals"
          intro={`${numberWord(hospitalProgrammes.length)} programmes, each powered by the systems listed with it.`}
        />
        <HospitalProgrammes />
        <div>
          <Link to="/industries/hospitals" className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-hos-yellow ${focusRing}`}>
            See Human OS for hospitals
            <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Status legend */}
      <section aria-labelledby="status-heading" className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-8">
        <SectionHeader id="status-heading" eyebrowText="Status legend" title="What each status means" />
        <p className="text-base text-white/60 leading-relaxed max-w-2xl">
          Modules without a tag are live: shipped and switchable from the Partner Portal today.
        </p>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {statusDefinitions.filter((d) => d.status !== 'live').map((d) => (
            <div key={d.status} className="flex flex-col gap-3 rounded-[10px] border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6">
              <dt>
                <StatusBadge status={d.status} />
              </dt>
              <dd className="text-sm text-white/60 leading-relaxed">{d.definition}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Trust strip */}
      <section aria-labelledby="trust-heading" className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
        <div className="border-y border-white/[0.08] py-8 flex flex-col md:flex-row md:items-center gap-3 md:gap-10">
          <h2 id="trust-heading" className="font-display font-extrabold text-xl sm:text-2xl text-white shrink-0">
            Every output is decision support.
          </h2>
          <Disclaimer />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
        <div className="p-8 sm:p-16 bg-ink-800 text-white rounded-[2px] text-center flex flex-col items-center gap-6">
          <div className="w-16 h-1 bg-hos-yellow" aria-hidden="true" />
          {/* TODO(copy): closing CTA heading and line */}
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white max-w-3xl leading-[1.05] tracking-tight">
            Start with two or three systems.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Try every module in a sandbox with fictional data first, then switch it on from the Partner Portal.
          </p>
          <Link
            to="/demo"
            className={`bg-white/[0.03] hover:bg-white/[0.06] text-white text-sm font-semibold px-6 py-3.5 rounded-full shadow-md transition-all inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hos-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950`}
          >
            Request a demo
            <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HumanOsPage;
