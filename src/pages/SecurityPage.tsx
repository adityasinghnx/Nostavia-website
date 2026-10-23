import React from 'react';
import { useSeo } from '../lib/useSeo';
import { CONTACT_EMAIL, DISCLAIMER } from '../content/site';
import { PageHero, SectionHead } from '../components/page/PageKit';
import { PracticesGrid } from '../components/home/TrustSection';
import { FinalCta } from '../components/home/FinalCta';
import { Arrow, Section } from '../components/ui/primitives';
import { Reveal } from '../components/ui/motion';

const humans = [
  { title: 'Bees prepare, people decide', body: 'A Bee can draft a summary, a follow-up plan or a flag. Anything clinical waits for a person on your team before it goes anywhere.' },
  { title: 'No dosing decisions', body: 'Medication signals are raised for a clinician. The platform never decides a dose.' },
  { title: 'Every step written down', body: 'Each Bee run keeps a record of what it did and who approved it.' },
];

const SecurityPage: React.FC = () => {
  useSeo({
    title: 'How we handle health data | Nostavia',
    description: 'Consent first, data kept apart per customer, encryption, no keys on devices, clinical review and decision support only. How Nostavia handles health data.',
    path: '/security',
  });

  return (
    <>
      <PageHero
        label="Security"
        title="How we handle health data."
        intro="People trust you with the most personal data there is. Here is how we look after it, in plain terms."
      />

      <Section theme="paper" labelledBy="practices">
        <div className="wrap">
          <SectionHead id="practices" label="Practices" title="What we do with every record." />
          <PracticesGrid />
        </div>
      </Section>

      <Section labelledBy="people">
        <div className="wrap">
          <SectionHead id="people" label="People in the loop" title="AI that knows where its job ends." />
          <ul className="grid md:grid-cols-3 gap-3">
            {humans.map((h, i) => (
              <Reveal as="li" key={h.title} delay={i * 0.06} className="rounded-[20px] border border-fg/10 p-7 md:p-8 min-h-[240px] flex flex-col justify-between gap-8">
                <span className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-[22px] tracking-[-0.02em]">{h.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg/60">{h.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <p className="mt-10 max-w-[80ch] text-[13px] leading-relaxed text-fg/45">{DISCLAIMER}</p>
        </div>
      </Section>

      <Section theme="paper" labelledBy="security-questions" tight>
        <div className="wrap flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 id="security-questions" className="t-h2 max-w-[18ch]">
              Questions from your security team?
            </h2>
            <p className="mt-5 text-[16px] text-fg/60 max-w-[52ch]">Send them over. We answer security questionnaires directly, with the engineers who built the system.</p>
          </div>
          <a href={`mailto:${CONTACT_EMAIL}?subject=Security%20questions`} className="group inline-flex items-center gap-3 text-[clamp(1.25rem,2.4vw,2rem)] tracking-[-0.02em] hover:text-accent transition-colors">
            {CONTACT_EMAIL}
            <Arrow className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </Section>

      <FinalCta />
    </>
  );
};

export default SecurityPage;
