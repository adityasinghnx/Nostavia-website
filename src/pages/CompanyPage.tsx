import React from 'react';
import { useSeo } from '../lib/useSeo';
import { bench, beliefs, founders } from '../content/company';
import { CONTACT_EMAIL, company } from '../content/site';
import { PageHero, RuledList, SectionHead } from '../components/page/PageKit';
import { FinalCta } from '../components/home/FinalCta';
import { Section } from '../components/ui/primitives';
import { Reveal } from '../components/ui/motion';
import { LocalTime } from '../components/ui/LocalTime';
import { HiveMark } from '../components/ui/marks';

const CompanyPage: React.FC = () => {
  useSeo({
    title: 'Company | Nostavia',
    description: 'Nostavia Technologies is a B2B health-tech company in Lucknow, India, serving health businesses in India and the UAE.',
    path: '/company',
  });

  return (
    <>
      <PageHero
        label="Company"
        title="We build the place where health work *gets done.*"
        intro={`${company.legal} is a B2B health-tech company. We sell to health businesses, not to the public. Headquartered in ${company.hq}, serving ${company.markets}.`}
        aside={
          <dl className="grid grid-cols-2 border-t border-fg/10 text-[14.5px]">
            <div className="pt-5 pr-4">
              <dt className="t-label text-fg/40">Headquarters</dt>
              <dd className="mt-3 text-fg/80">{company.hq}</dd>
              <dd className="mt-1 text-fg/45">
                <LocalTime />
              </dd>
            </div>
            <div className="pt-5 pl-5 border-l border-fg/10">
              <dt className="t-label text-fg/40">Serving</dt>
              <dd className="mt-3 text-fg/80">{company.markets}</dd>
            </div>
          </dl>
        }
      />

      <Section theme="paper" labelledBy="beliefs">
        <div className="wrap grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead id="beliefs" label="How we work" title="Three things we hold to." className="lg:block mb-0" />
          </div>
          <div className="lg:col-span-7">
            <RuledList items={beliefs} />
          </div>
        </div>
      </Section>

      <Section labelledBy="founders">
        <div className="wrap">
          <SectionHead id="founders" label="Founders" title="Built by biotechnology and AI engineers." />
          <ul className="grid md:grid-cols-2 gap-3">
            {founders.map((f, i) => (
              <Reveal as="li" key={f.name} delay={i * 0.08} className="relative overflow-hidden rounded-[22px] border border-fg/10 p-8 md:p-10 min-h-[420px] flex flex-col justify-between">
                <div aria-hidden="true" className="absolute -right-6 -top-10 em text-[clamp(9rem,16vw,14rem)] leading-none text-fg/[0.05] select-none">
                  {f.initials}
                </div>
                <HiveMark className="w-6 h-6 text-accent" />
                <div className="relative">
                  <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] tracking-[-0.03em]">{f.name}</h3>
                  <p className="mt-2 t-label text-accent">{f.role}</p>
                  <p className="mt-6 pt-6 border-t border-fg/10 text-[15.5px] leading-relaxed text-fg/60 max-w-[48ch]">{f.bio}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section theme="paper" labelledBy="bench">
        <div className="wrap">
          <SectionHead id="bench" label="Clinical and scientific advisory bench" title="Clinicians check what we ship." intro="Protocol outputs are reviewed by our licensed clinical advisory bench before release to any customer." />
          <ul className="border-t border-fg/[0.12]">
            {bench.map((b, i) => (
              <Reveal as="li" key={b.name} delay={(i % 3) * 0.05} className="grid md:grid-cols-12 gap-x-10 gap-y-1 py-6 border-b border-fg/[0.12]">
                <span className="md:col-span-4 text-[20px] tracking-[-0.02em]">{b.name}</span>
                <span className="md:col-span-3 text-[14.5px] text-accent md:pt-1">{b.credential}</span>
                <span className="md:col-span-5 text-[14.5px] text-fg/55 md:pt-1">{b.detail}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <FinalCta
        title="Talk to the people *who build it.*"
        body={`Write to ${CONTACT_EMAIL}, or book a time below.`}
      />
    </>
  );
};

export default CompanyPage;
