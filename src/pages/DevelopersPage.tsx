import React from 'react';
import { useSeo } from '../lib/useSeo';
import { CodeWindow } from '../components/hive/CodeWindow';
import { FigLabel, PageHero, SectionHead } from '../components/page/PageKit';
import { FinalCta } from '../components/home/FinalCta';
import { Button, Section } from '../components/ui/primitives';
import { Reveal } from '../components/ui/motion';

/* The SDK Portal has no public URL yet: both buttons lead to the demo form, tagged for developers. */
const PORTAL_CTA = '/demo?interest=developers';

const portal = [
  { title: 'Sign up', body: 'Create your SDK Portal account.' },
  { title: 'API keys', body: 'Get keys for your team in one place.' },
  { title: 'Docs', body: 'Guides and the API reference.' },
  { title: 'Usage', body: 'Track what your app is calling.' },
];

const DevelopersPage: React.FC = () => {
  useSeo({
    title: 'Developers: build with Nostavia',
    description: 'Sign up to the SDK Portal, get your API keys, read the docs and track your usage in one place. Call any part of the Superintelligence from your app and get a result back.',
    path: '/developers',
  });

  return (
    <>
      <PageHero
        label="Developers"
        display
        title="Build with Nostavia."
        intro="Sign up to the SDK Portal, get your API keys, read the docs and track your usage in one place. Call any part of the Superintelligence from your app and get a result back."
        actions={
          <>
            <Button to={PORTAL_CTA} size="lg">
              Get API keys
            </Button>
            <Button to={PORTAL_CTA} size="lg" variant="secondary">
              Read the API reference
            </Button>
          </>
        }
      >
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <FigLabel n="01">Decoding a lab report</FigLabel>
            <p className="mt-4 text-[15px] leading-relaxed text-fg/55 max-w-[36ch]">Send a lab report, get every marker back explained, in your brand.</p>
          </div>
          <CodeWindow className="lg:col-span-8" />
        </div>
      </PageHero>

      <Section theme="paper" labelledBy="portal-title">
        <div className="wrap">
          <SectionHead id="portal-title" label="The SDK Portal" title="Everything your engineers need, in one place." />
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-fg/[0.12]">
            {portal.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.06} className="border-r border-b border-fg/[0.12] p-7 md:p-8 min-h-[200px] flex flex-col justify-between gap-8">
                <span className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-[21px] tracking-[-0.02em]">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg/60">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <FinalCta title="Get your team *into the portal.*" body="Tell us what you are building and we will set up your SDK Portal access." />
    </>
  );
};

export default DevelopersPage;
