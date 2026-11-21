import React from 'react';
import { useSeo } from '../lib/useSeo';
import { ABOUT_PATH, beliefs, CAREERS_PATH, howWeWork } from '../content/company';
import { TRUST_PATH } from '../content/trust';
import { principles } from '../content/offer';
import { PageHero, RuledList, SectionHead } from '../components/page/PageKit';
import { TrustBar } from '../components/home/TrustBar';
import { GlobalSection } from '../components/home/GlobalSection';
import { FinalCta } from '../components/home/FinalCta';
import { Button, TextLink } from '../components/ui/primitives';
import { Reveal } from '../components/ui/motion';
import { CodeField } from '../components/ui/CodeField';

const AboutPage: React.FC = () => {
  useSeo({
    title: 'About Nostavia | The intelligence layer for health businesses',
    description: 'Nostavia makes health AI that labs, clinics, hospitals and health apps run under their own brand, with people in charge of every decision.',
    path: ABOUT_PATH,
  });

  return (
    <>
      <PageHero
        label="About Nostavia"
        display
        title="The intelligence layer for *health businesses.*"
        intro="Nostavia makes health AI that labs, clinics, hospitals and health apps run under their own name. We turn health data into care people understand, and we keep people in charge of every decision."
        actions={
          <>
            <Button to="/demo?interest=sales" size="lg">
              Contact sales
            </Button>
            <Button to={CAREERS_PATH} size="lg" variant="secondary">
              Join us
            </Button>
          </>
        }
      />

      <TrustBar />

      <section data-theme="paper" aria-labelledby="beliefs-title" className="relative isolate py-[clamp(5rem,9vw,8.5rem)]">
        <CodeField />
        <div className="wrap">
          <SectionHead id="beliefs-title" label="What we believe" title="Built on *three ideas.*" />
          <ol className="grid lg:grid-cols-3 border-t border-fg/[0.14]">
            {beliefs.map((b, i) => (
              <Reveal as="li" key={b.title} delay={i * 0.06} className="py-10 lg:pr-10 lg:[&:not(:first-child)]:pl-10 lg:[&:not(:first-child)]:border-l border-b lg:border-b-0 border-fg/[0.14]">
                <span className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-6 text-[clamp(1.45rem,2.2vw,2rem)] leading-[1.05] tracking-[-0.035em] max-w-[16ch]">{b.title}</h3>
                <p className="mt-5 text-[16px] leading-relaxed text-fg/60 max-w-[40ch]">{b.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section data-theme="ink" aria-labelledby="how-title" className="relative isolate py-[clamp(5rem,9vw,8.5rem)]">
        <CodeField />
        <div className="wrap">
          <SectionHead id="how-title" label="How we work" title="One company, *built for regulated care.*" intro={<TextLink to={TRUST_PATH}>Visit the Trust Center</TextLink>} />
          <RuledList items={howWeWork} columns={2} />
        </div>
      </section>

      <GlobalSection index="" />

      <section data-theme="ink" aria-labelledby="principles-about-title" className="relative isolate py-[clamp(5rem,9vw,8.5rem)]">
        <CodeField />
        <div className="wrap">
          <SectionHead id="principles-about-title" label="Principles" title="The lines *we hold.*" intro="With every customer, in every region." />
          <RuledList items={principles} columns={2} />
        </div>
      </section>

      <FinalCta />
    </>
  );
};

export default AboutPage;
