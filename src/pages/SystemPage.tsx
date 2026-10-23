import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSeo } from '../lib/useSeo';
import { adjacentSystems, getCategory, getSystem, HUMAN_OS_PATH, statusLabel, systemPath, type HumanOsSystem } from '../content/human-os';
import { DISCLAIMER, FLAGS } from '../content/site';
import { FinalCta } from '../components/home/FinalCta';
import { Arrow, Label, Section, StatusDot } from '../components/ui/primitives';
import { Reveal, SplitHeading } from '../components/ui/motion';
import NotFoundPage from './NotFoundPage';

const SystemView: React.FC<{ system: HumanOsSystem }> = ({ system }) => {
  const category = getCategory(system.category);
  const { prev, next } = adjacentSystems(system.slug);

  useSeo({
    title: `${system.name}: ${system.promise} | Human OS`,
    description: `${system.description} Best for ${system.bestFit.toLowerCase()}.`,
    path: systemPath(system.slug),
  });

  return (
    <>
      <section data-theme="ink" aria-labelledby="page-title" className="relative overflow-hidden pt-36 md:pt-44 pb-[clamp(4rem,8vw,7rem)]">
        <div aria-hidden="true" className="absolute right-0 top-0 font-mono text-[clamp(10rem,28vw,26rem)] leading-none tracking-[-0.06em] text-fg/[0.035] select-none pr-[4vw] pt-20">
          {system.number}
        </div>
        <div className="wrap relative">
          <nav aria-label="Breadcrumb" className="t-label text-fg/45 flex items-center gap-3">
            <Link to={HUMAN_OS_PATH} className="hover:text-fg transition-colors">
              Human OS
            </Link>
            <span aria-hidden="true">/</span>
            <span>{category.name}</span>
          </nav>
          <SplitHeading id="page-title" as="h1" trigger="mount" delay={0.1} className="t-display mt-7 max-w-[12ch]" text={system.name} />
          <div className="mt-10 md:mt-14 grid lg:grid-cols-12 gap-10 items-end">
            <Reveal className="lg:col-span-7" delay={0.4}>
              <p className="text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.1] tracking-[-0.02em] em">{system.promise}</p>
              <p className="mt-6 t-lead text-fg/60 max-w-[52ch]">{system.description}</p>
            </Reveal>
            <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.5}>
              <dl className="border-t border-fg/10 pt-5">
                <dt className="t-label text-fg/40">Best for</dt>
                <dd className="mt-3 text-[15px] text-fg/75">{system.bestFit}</dd>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <Section labelledBy="modules-title" className="!pt-0">
        <div className="wrap">
          <h2 id="modules-title" className="t-label text-fg/45 mb-6">
            Modules in {system.name}
          </h2>
          <ul className="border-t border-fg/10">
            {system.modules.map((m, i) => (
              <Reveal as="li" key={m.name} delay={(i % 4) * 0.04} className="grid md:grid-cols-12 gap-x-10 gap-y-3 py-8 border-b border-fg/10">
                <div className="md:col-span-5 flex items-baseline gap-5">
                  <span className="font-mono text-[12px] text-fg/35 w-6">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-[clamp(1.35rem,2vw,1.75rem)] tracking-[-0.025em]">{m.name}</h3>
                </div>
                <p className="md:col-span-5 text-[15.5px] leading-relaxed text-fg/60 pl-11 md:pl-0">{m.description}</p>
                {FLAGS.SHOW_MODULE_STATUS && (
                  <p className="md:col-span-2 md:text-right pl-11 md:pl-0">
                    <span className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-fg/45">
                      <StatusDot status={m.status} />
                      {statusLabel[m.status]}
                    </span>
                  </p>
                )}
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 max-w-[80ch] text-[13px] leading-relaxed text-fg/45">{DISCLAIMER}</p>
        </div>
      </Section>

      <Section theme="paper" labelledBy="pairs-title" tight>
        <div className="wrap">
          <Label>Pairs well with</Label>
          <h2 id="pairs-title" className="sr-only">
            Pairs well with
          </h2>
          <ul className="mt-8 grid md:grid-cols-3 gap-3">
            {system.pairsWith.map((slug) => {
              const s = getSystem(slug)!;
              return (
                <li key={slug}>
                  <Link to={systemPath(slug)} className="group flex h-full flex-col justify-between gap-10 rounded-2xl border border-fg/[0.12] p-6 hover:border-accent/50 transition-colors">
                    <span className="font-mono text-[12px] text-accent">{s.number}</span>
                    <span>
                      <span className="block text-[22px] tracking-[-0.02em]">{s.name}</span>
                      <span className="mt-2 block text-[14.5px] text-fg/55">{s.plain}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      <nav aria-label="More systems" data-theme="ink" className="border-t border-fg/[0.07]">
        <div className="wrap grid grid-cols-2">
          {[
            { s: prev, dir: 'Previous' },
            { s: next, dir: 'Next' },
          ].map(({ s, dir }, i) => (
            <Link key={dir} to={systemPath(s.slug)} className={`group py-10 md:py-14 flex flex-col gap-3 ${i === 1 ? 'items-end text-right border-l border-fg/[0.07] pl-6' : 'pr-6'}`}>
              <span className="t-label text-fg/40">{dir}</span>
              <span className="flex items-center gap-3 text-[clamp(1.25rem,2.6vw,2.25rem)] tracking-[-0.03em] group-hover:text-accent transition-colors">
                {i === 0 && <Arrow className="w-5 h-5 rotate-180" />}
                {s.name}
                {i === 1 && <Arrow className="w-5 h-5" />}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <FinalCta />
    </>
  );
};

const SystemPage: React.FC = () => {
  const { slug = '' } = useParams();
  const system = getSystem(slug);
  if (!system) return <NotFoundPage />;
  return <SystemView key={system.slug} system={system} />;
};

export default SystemPage;
