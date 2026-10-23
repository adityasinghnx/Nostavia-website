import React from 'react';
import { useSeo } from '../lib/useSeo';
import { CodeWindow } from '../components/hive/CodeWindow';
import { FigLabel, PageHero, RuledList, SectionHead } from '../components/page/PageKit';
import { FinalCta } from '../components/home/FinalCta';
import { Button, Section } from '../components/ui/primitives';
import { Reveal } from '../components/ui/motion';

const steps = [
  { title: 'Ask for access', body: 'We set up your SDK Portal account with the modules you picked.' },
  { title: 'Get your keys', body: 'API keys and docs for every module, in one place.' },
  { title: 'Try with fictional data', body: 'Every module runs in a sandbox first, so nothing real is touched.' },
  { title: 'Go live', body: 'Switch on in production. It shows up in Hive for your team.' },
];

const sources = [
  { name: 'Lab PDFs', line: 'Any layout, any lab' },
  { name: 'Apple Health', line: 'iOS wearable data' },
  { name: 'Google Health Connect', line: 'Android wearable data' },
  { name: 'HIS exports', line: 'CSV, Excel or PDF' },
];

const engineering = [
  { title: 'No keys on devices', body: 'AI requests go through a secure server-side proxy. No API key ships inside your app.' },
  { title: 'Improvements arrive without an app update', body: 'Modules improve on our side. Your app keeps calling the same endpoints.' },
  { title: 'One shape for wearable data', body: 'Apple Health and Google Health Connect come back in the same schema.' },
];

const DevelopersPage: React.FC = () => {
  useSeo({
    title: 'Developers: the SDK Portal | Nostavia',
    description: 'API keys, docs and a sandbox for every Human OS module you pick. Plug health AI into the app you already have; whatever you switch on also shows up in Hive.',
    path: '/developers',
  });

  return (
    <>
      <PageHero
        label="Developers"
        title="Build with Human OS."
        intro="The SDK Portal is where your engineers get API keys, docs and a sandbox for every module you pick. Whatever you switch on also shows up in Hive, so the Bees can run it."
        actions={
          <>
            <Button to="/demo?interest=developers" size="lg">
              Ask for SDK Portal access
            </Button>
          </>
        }
      >
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <FigLabel n="01">Decoding a lab report</FigLabel>
            <p className="mt-4 text-[15px] leading-relaxed text-fg/55 max-w-[36ch]">Send a lab PDF, get every marker back with a verdict against locally calibrated ranges, under your brand.</p>
          </div>
          <CodeWindow className="lg:col-span-8" />
        </div>
      </PageHero>

      <Section theme="paper" labelledBy="dev-steps">
        <div className="wrap">
          <SectionHead id="dev-steps" label="Getting started" title="From keys to production in four steps." />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 border-t border-fg/[0.12] pt-10">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06}>
                <p className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 t-h3">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-fg/60 max-w-[30ch]">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section labelledBy="dev-sources">
        <div className="wrap">
          <SectionHead id="dev-sources" label="Bring your data" title="Start with the data you already have." />
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-fg/10 border border-fg/10 rounded-[20px] overflow-hidden">
            {sources.map((s, i) => (
              <Reveal as="li" key={s.name} delay={i * 0.05} className="bg-bg p-7 min-h-[180px] flex flex-col justify-between">
                <span className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="block text-[21px] tracking-[-0.02em]">{s.name}</span>
                  <span className="mt-1.5 block text-[14px] text-fg/50">{s.line}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section theme="paper" labelledBy="dev-eng">
        <div className="wrap grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead id="dev-eng" label="For your engineers" title="Built so your app stays simple." className="lg:block mb-0" />
          </div>
          <div className="lg:col-span-7">
            <RuledList items={engineering} />
          </div>
        </div>
      </Section>

      <FinalCta title="Get your team *into the portal.*" body="Tell us which modules you want to start with and we'll set up your SDK Portal access." />
    </>
  );
};

export default DevelopersPage;
