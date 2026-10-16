import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  HUMAN_OS_PATH,
  adjacentSystems,
  countLine,
  getRing,
  getSystem,
  numberWord,
  systemPath,
  totalSystems,
} from '../content/human-os';
import { useSeo } from '../lib/useSeo';
import { ModuleCard } from '../components/human-os/ModuleCard';
import { SystemCard } from '../components/human-os/SystemCard';
import { Disclaimer } from '../components/human-os/Disclaimer';
import { eyebrow, focusRing, primaryCta } from '../components/human-os/styles';

const stripFullStop = (s: string) => s.replace(/\.$/, '');

export const HumanOsSystemPage: React.FC = () => {
  const { slug = '' } = useParams();
  const system = getSystem(slug);

  // Hooks must run unconditionally; fall back to overview metadata while redirecting.
  useSeo({
    title: system ? `${system.name}: ${stripFullStop(system.promise)} | Human OS | Nostavia Health` : 'Human OS | Nostavia Health',
    description: system ? `${system.promise} ${system.plain} ${system.description}` : '',
    path: system ? systemPath(system.slug) : HUMAN_OS_PATH,
  });

  if (!system) return <Navigate to={HUMAN_OS_PATH} replace />;

  const ring = getRing(system.ring);
  const { prev, next } = adjacentSystems(system.slug);

  return (
    <div className="flex flex-col gap-16 sm:gap-24 pb-16 font-body text-white bg-white/[0.03]">
      {/* Header */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-10 sm:pt-16">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white/55">
            <li>
              <Link to={HUMAN_OS_PATH} className={`hover:text-hos-yellow underline-offset-2 hover:underline ${focusRing}`}>
                Human OS
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-white">{system.name}</li>
          </ol>
        </nav>

        <div className="max-w-3xl space-y-5">
          <div className={eyebrow}>
            System {system.number} · {ring.name}
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.02]">
            {system.name}
          </h1>
          <p className="font-display font-bold text-xl sm:text-2xl text-white leading-snug">{system.promise}</p>
          <div className="w-16 h-1 bg-hos-yellow" aria-hidden="true" />
          <p className="text-base sm:text-lg text-white/60 leading-relaxed">{system.plain}</p>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed">{system.description}</p>
          <p className="text-base text-white">
            <span className="font-bold">Best fit:</span> {system.bestFit}
          </p>
        </div>
      </section>

      {/* Modules */}
      <section aria-labelledby="modules-heading" className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          {/* TODO(copy): module grid heading */}
          <h2 id="modules-heading" className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Modules in {system.name}
          </h2>
          <p className="text-sm font-semibold text-white/55">{countLine(system)}</p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {system.modules.map((module) => (
            <li key={module.name}>
              <ModuleCard module={module} />
            </li>
          ))}
        </ul>
      </section>

      {/* Pairs with */}
      <section aria-labelledby="pairs-heading" className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-6">
        <h2 id="pairs-heading" className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
          Pairs with
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {system.pairsWith.map((pairSlug) => (
            <li key={pairSlug}>
              <SystemCard system={getSystem(pairSlug)!} as="h3" />
            </li>
          ))}
        </ul>
      </section>

      {/* Previous / next */}
      <nav aria-label="Other systems" className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/[0.08] pt-8">
          <Link
            to={systemPath(prev.slug)}
            className={`group flex items-center gap-4 rounded-[10px] border border-white/[0.08] p-5 hover:border-hos-yellow/60 transition-colors ${focusRing}`}
          >
            <ArrowLeft aria-hidden="true" className="w-5 h-5 shrink-0 text-hos-yellow transition-transform group-hover:-translate-x-0.5" />
            <span>
              <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-white/55">Previous system</span>
              <span className="block font-display font-bold text-base text-white">
                {prev.number} {prev.name}
              </span>
            </span>
          </Link>
          <Link
            to={systemPath(next.slug)}
            className={`group flex items-center justify-end gap-4 rounded-[10px] border border-white/[0.08] p-5 text-right hover:border-hos-yellow/60 transition-colors ${focusRing}`}
          >
            <span>
              <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-white/55">Next system</span>
              <span className="block font-display font-bold text-base text-white">
                {next.number} {next.name}
              </span>
            </span>
            <ArrowRight aria-hidden="true" className="w-5 h-5 shrink-0 text-hos-yellow transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="pt-6 text-center">
          <Link to={HUMAN_OS_PATH} className={`text-xs font-bold uppercase tracking-wider text-white hover:text-hos-yellow ${focusRing}`}>
            See all {numberWord(totalSystems).toLowerCase()} Human OS systems
          </Link>
        </div>
      </nav>

      {/* CTA + disclaimer */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
        <div className="rounded-[16px] bg-white/[0.04] border border-hos-yellow p-6 sm:p-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            {/* TODO(copy): system page CTA heading and line */}
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">See {system.name} in a demo.</h2>
            <p className="text-base text-white/60">Try every module in a sandbox with fictional data first.</p>
          </div>
          <Link to="/demo" className={`${primaryCta} shrink-0`}>
            Request a demo
          </Link>
        </div>
        <Disclaimer className="mt-6" />
      </section>
    </div>
  );
};

export default HumanOsSystemPage;
