import React from 'react';
import { useSeo } from '../lib/useSeo';
import { CodeWindow } from '../components/hive/CodeWindow';
import { PageHero, SectionHead } from '../components/page/PageKit';
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
    description: 'Sign up to the SDK Portal, get your API keys, read the docs and track your usage in one place. Call any Human OS module from your app and get a result back.',
    path: '/developers',
  });

  return (
    <>
      <PageHero
        label="Developers"
        display
        title="Build with Nostavia."
        intro="Sign up to the SDK Portal, get your API keys, read the docs and track your usage in one place. Call any Human OS module from your app and get a result back."
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
            <h2 className="text-[19px] tracking-[-0.015em]">Decoding a lab report</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-fg/55 max-w-[36ch]">Send a lab report, get every marker back explained, in your brand.</p>
          </div>
          <CodeWindow className="lg:col-span-8" />
        </div>
      </PageHero>

      <Section theme="paper" labelledBy="portal-title">
        <div className="wrap grid lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHead id="portal-title" label="The SDK Portal" title="Everything your engineers need, in one place." className="lg:block mb-0" />
            </div>
          </div>
          <ol className="lg:col-span-7 border-t border-fg/[0.14]">
            {portal.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.05} className="grid grid-cols-[3rem_1fr] gap-4 py-9 border-b border-fg/[0.14]">
                <span className="font-mono text-[12px] text-accent pt-3">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.05] tracking-[-0.03em]">{p.title}</h3>
                  <p className="mt-2 text-[16.5px] leading-relaxed text-fg/60">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <FinalCta title="Get your team *into the portal.*" body="Tell us what you are building and we will set up your SDK Portal access." />
    </>
  );
};

export default DevelopersPage;
