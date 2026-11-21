import React from 'react';
import { useSeo } from '../lib/useSeo';
import { advisors, assurances, regulations, SECURITY_REVIEW_HREF, TRUST_PATH } from '../content/trust';
import { SAFETY_LINE } from '../content/site';
import { PageHero, RuledList, SectionHead } from '../components/page/PageKit';
import { ControlGrid } from '../components/home/TrustSection';
import { FinalCta } from '../components/home/FinalCta';
import { Button } from '../components/ui/primitives';
import { Reveal } from '../components/ui/motion';
import { CodeField } from '../components/ui/CodeField';

const jump = [
  { label: 'Data protection', href: '#data' },
  { label: 'Regulations', href: '#regulations' },
  { label: 'Clinical governance', href: '#clinical' },
  { label: 'Agreements and disclosure', href: '#assurance' },
];

const TrustPage: React.FC = () => {
  useSeo({
    title: 'Trust Center | Nostavia',
    description: 'How Nostavia protects health data: in-region data, customer isolation, outside AI off by default, consent built in, clinical review and a data-processing agreement with every customer.',
    path: TRUST_PATH,
  });

  return (
    <>
      <PageHero
        label="Trust Center"
        title="Health data, *handled with care.*"
        intro="How we protect your data and your patients’ data, the rules the platform is built to, and who checks the clinical work before it reaches you."
        actions={
          <>
            <Button href={SECURITY_REVIEW_HREF} size="lg">
              Request a security review
            </Button>
            <Button to="/demo?interest=sales" size="lg" variant="secondary">
              Contact sales
            </Button>
          </>
        }
        aside={
          <nav aria-label="On this page" className="border-t border-fg/[0.12]">
            <ul>
              {jump.map((j, i) => (
                <li key={j.href} className="border-b border-fg/[0.12]">
                  <a href={j.href} className="group flex items-center gap-4 py-4 text-[16px] text-fg/75 hover:text-fg transition-colors">
                    <span className="font-mono text-[11.5px] text-accent">{String(i + 1).padStart(2, '0')}</span>
                    {j.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      <section id="data" data-theme="ink" aria-labelledby="data-title" className="relative isolate py-[clamp(5rem,9vw,8.5rem)] border-t border-fg/[0.07] scroll-mt-20">
        <CodeField />
        <div className="wrap">
          <SectionHead id="data-title" index="01" label="Data protection" title="Six things that are true *for every customer.*" intro="These are how the platform is built, not options added per contract." />
          <ControlGrid />
        </div>
      </section>

      <section id="regulations" data-theme="paper" aria-labelledby="regulations-title" className="relative isolate py-[clamp(5rem,9vw,8.5rem)] scroll-mt-20">
        <CodeField />
        <div className="wrap">
          <SectionHead
            id="regulations-title"
            index="02"
            label="Regulations"
            title="Built to the rules *where we work.*"
            intro="We name a standard here only when the work behind it is done. Working somewhere else? Ask us how the platform maps to your rules."
          />
          <ul className="grid md:grid-cols-2 gap-4">
            {regulations.map((r, i) => (
              <Reveal as="li" key={r.region} delay={i * 0.06} className="rounded-[20px] border border-fg/[0.12] p-8 md:p-10 flex flex-col gap-8">
                <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">{r.region}</span>
                <div>
                  <h3 className="t-h3 max-w-[22ch]">{r.name}</h3>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-fg/60 max-w-[46ch]">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="clinical" data-theme="ink" aria-labelledby="clinical-title" className="relative isolate py-[clamp(5rem,9vw,8.5rem)] scroll-mt-20">
        <CodeField />
        <div className="wrap">
          <SectionHead id="clinical-title" index="03" label="Clinical governance" title="Clinicians check the work. *Clinicians make the calls.*" intro={SAFETY_LINE} />
          <Reveal>
            <p className="t-label text-fg/40 mb-6">Clinical and scientific advisory board</p>
          </Reveal>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-fg/[0.1]">
            {advisors.map((a, i) => (
              <Reveal as="li" key={a.name} delay={(i % 4) * 0.05} className="border-b border-r border-fg/[0.1] p-6 md:p-7 flex flex-col gap-4 min-h-[180px]">
                <p className="text-[18px] leading-tight tracking-[-0.02em]">{a.name}</p>
                <div className="mt-auto">
                  <p className="text-[14px] text-fg/70">{a.role}</p>
                  <p className="mt-1 text-[13.5px] text-fg/45">{a.note}</p>
                </div>
              </Reveal>
            ))}
            {/* Closes the grid: 7 advisors + this cell fill 2- and 4-column rows. */}
            <Reveal as="li" delay={0.15} className="border-b border-r border-fg/[0.1] p-6 md:p-7 flex flex-col justify-end min-h-[180px] bg-[radial-gradient(120%_90%_at_100%_100%,rgba(242,210,122,0.08),transparent_60%)]">
              <p className="text-[15px] leading-relaxed text-fg/65">Protocol outputs are checked against this board before they reach any customer.</p>
            </Reveal>
          </ul>
        </div>
      </section>

      <section id="assurance" data-theme="paper" aria-labelledby="assurance-title" className="relative isolate py-[clamp(5rem,9vw,8.5rem)] scroll-mt-20">
        <CodeField />
        <div className="wrap grid lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHead id="assurance-title" index="04" label="Agreements and disclosure" title="Ready for *your review.*" className="!mb-8 lg:!grid-cols-1" />
            <Reveal className="flex flex-col items-start gap-6">
              <p className="text-[16px] leading-relaxed text-fg/60 max-w-[42ch]">Send us your security questionnaire or ask for our data-processing agreement. Your procurement team gets answers from the people who built the platform.</p>
              <Button href={SECURITY_REVIEW_HREF}>Request a security review</Button>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <RuledList items={assurances} />
            <p className="mt-6 text-[13.5px] text-fg/45">
              Security researchers:{' '}
              <a href="/.well-known/security.txt" className="underline decoration-fg/30 underline-offset-4 hover:decoration-accent">
                security.txt
              </a>
            </p>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
};

export default TrustPage;
