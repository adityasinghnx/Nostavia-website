import React from 'react';
import { AudioLines, ClipboardCopy, Lock, Plane, ScanSearch, ShieldCheck, Smartphone, SpellCheck, UserRoundX, Users } from 'lucide-react';
import { useSeo } from '../lib/useSeo';
import { CONTACT_EMAIL } from '../content/site';
import { RECOUNT_ONE_LINER, RECOUNT_PATH, RECOUNT_PRIVACY_PATH, RECOUNT_SUPPORT_PATH, recountFaq, recountFeatures, recountPrivacy, recountSteps } from '../content/recount';
import { RuledList, SectionHead } from '../components/page/PageKit';
import { RecordingPhone, RecountFaq, RecountLinks } from '../components/recount/RecountKit';
import { Button, Label, Section, TextLink } from '../components/ui/primitives';
import { Reveal, SplitHeading } from '../components/ui/motion';
import { CodeField } from '../components/ui/CodeField';

const privacyIcons = [Smartphone, UserRoundX, Plane, Lock];
const featureIcons = [Users, AudioLines, SpellCheck, ScanSearch, ClipboardCopy, ShieldCheck];

const RecountPage: React.FC = () => {
  useSeo({
    title: 'Recount: private transcripts for iPhone | Nostavia',
    description: RECOUNT_ONE_LINER,
    path: RECOUNT_PATH,
  });

  return (
    <>
      <section data-theme="ink" aria-labelledby="page-title" className="relative isolate overflow-clip pt-36 md:pt-44 pb-[clamp(4rem,8vw,7rem)]">
        <CodeField variant="feature" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(60%_80%_at_20%_0%,rgba(242,210,122,0.08),transparent_70%)]" />
        <div className="wrap relative grid lg:grid-cols-12 gap-14 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <Label>Recount · An app from Nostavia</Label>
            <SplitHeading id="page-title" as="h1" trigger="mount" delay={0.15} className="t-display mt-7 max-w-[11ch]" text="Every word. *No cloud.*" />
            <Reveal className="mt-10 flex flex-col items-start gap-8" delay={0.5}>
              <p className="t-lead text-fg/65 text-pretty max-w-[46ch]">
                Recount records your meetings, lectures and conversations and writes them down on your iPhone, in English, Hindi or Hinglish. Nothing is uploaded.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="#how" size="lg">
                  See how it works
                </Button>
                <Button to={RECOUNT_SUPPORT_PATH} size="lg" variant="secondary">
                  Support
                </Button>
              </div>
              <p className="font-mono text-[12px] tracking-[0.04em] text-fg/45">Coming soon to the App Store · iPhone and Apple Watch</p>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-5 flex justify-center lg:justify-end" delay={0.6}>
            <RecordingPhone />
          </Reveal>
        </div>
      </section>

      <Section theme="paper" labelledBy="recount-why">
        <div className="wrap grid lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-6">
            <SectionHead id="recount-why" label="From Nostavia" title="Built by the team behind *Human OS.*" className="lg:block mb-0" />
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8 flex flex-col items-start gap-6 text-[17px] leading-relaxed text-fg/65">
            <p>At Nostavia we build health AI for labs, clinics and hospitals, where the conversations people have are among the most private they will ever have. Recount takes the same care to your pocket: a recorder that writes every word down and never sends it anywhere.</p>
            <p>It’s for doctors and consultants, students, journalists and anyone who speaks Hindi, English or both in the same sentence. Recount is in early release, and we are shaping it with the people who use it.</p>
            <TextLink to="/">Meet Nostavia</TextLink>
          </Reveal>
        </div>
      </Section>

      <Section id="how" labelledBy="recount-how">
        <div className="wrap">
          <SectionHead id="recount-how" label="How it works" index="01" title="Three gestures." intro="One button does everything. The order matters, so it never stops by accident." />
          <RuledList items={recountSteps} columns={1} />
        </div>
      </Section>

      <Section theme="paper" labelledBy="recount-privacy">
        <div className="wrap grid lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHead id="recount-privacy" label="Privacy" index="02" title="Your conversations stay on *your iPhone.*" className="lg:block mb-8" />
              <TextLink to={RECOUNT_PRIVACY_PATH}>Read the privacy policy</TextLink>
            </div>
          </div>
          <ul className="lg:col-span-7 border-t border-fg/[0.14]">
            {recountPrivacy.map((p, i) => {
              const Icon = privacyIcons[i];
              return (
                <Reveal as="li" key={p} delay={i * 0.05} className="flex items-center gap-6 py-8 border-b border-fg/[0.14]">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-fg/15 text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.4} />
                  </span>
                  <span className="text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.2] tracking-[-0.02em]">{p}</span>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Section>

      <Section labelledBy="recount-languages">
        <div className="wrap">
          <SectionHead
            id="recount-languages"
            label="Made for India"
            index="03"
            title="Speaks the way *you speak.*"
            intro="Switch between Hindi and English in the same sentence and Recount keeps up. Choose Hinglish, Hindi, English (India), Bengali, Tamil, Telugu, Marathi and more. Hindi appears in English letters the way you’d text it, or in Devanagari."
          />
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'English letters', text: 'Mujhe kal tak report bhejni hai.' },
              { label: 'Devanagari', text: 'मुझे कल तक रिपोर्ट भेजनी है।' },
            ].map((q, i) => (
              <Reveal key={q.label} delay={i * 0.08} className="rounded-[28px] border border-fg/[0.12] bg-fg/[0.03] p-8 md:p-10">
                <p className="t-label text-fg/45">{q.label}</p>
                <p className="mt-6 text-[clamp(1.5rem,2.8vw,2.4rem)] leading-[1.15] tracking-[-0.03em]">{q.text}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 font-mono text-[12px] text-fg/40">Indian languages need iOS 27.</p>
        </div>
      </Section>

      <Section theme="paper" labelledBy="recount-features">
        <div className="wrap">
          <SectionHead id="recount-features" label="After you press stop" index="04" title="Everything in the conversation, *found.*" />
          <ul className="border-t border-fg/[0.12]">
            {recountFeatures.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <Reveal as="li" key={f.title} delay={(i % 3) * 0.05} className="grid grid-cols-[3rem_1fr] md:grid-cols-12 items-center gap-x-6 gap-y-2 py-8 md:py-10 border-b border-fg/[0.12]">
                  <span className="md:col-span-1 grid h-12 w-12 place-items-center rounded-full border border-fg/15 text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.4} />
                  </span>
                  <h3 className="md:col-span-6 text-[clamp(1.6rem,3.2vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">{f.title}</h3>
                  <p className="col-start-2 md:col-start-auto md:col-span-5 text-[16px] leading-relaxed text-fg/55">{f.body}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Section>

      <Section labelledBy="recount-everywhere">
        <div className="wrap grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <SplitHeading id="recount-everywhere" className="t-h1" text="Start from *anywhere.*" />
          </div>
          <Reveal className="lg:col-span-5 t-lead text-fg/60 text-pretty">
            Mark, pause and stop from the Lock Screen and the Dynamic Island. Start with the Action Button, Control Center or “Hey Siri, record with Recount”. On Apple Watch, double-tap to bookmark, or record on the Watch when your iPhone is out of reach.
          </Reveal>
        </div>
      </Section>

      <Section theme="paper" labelledBy="recount-faq">
        <div className="wrap grid lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHead id="recount-faq" label="Questions" index="05" title="Good to know." className="lg:block mb-6" />
            <a href={`mailto:${CONTACT_EMAIL}?subject=Recount`} className="text-[15px] text-fg/55 hover:text-fg transition-colors">
              Something else? Write to {CONTACT_EMAIL}
            </a>
          </div>
          <div className="lg:col-span-7">
            <RecountFaq items={recountFaq} />
          </div>
        </div>
      </Section>

      <RecountLinks />
    </>
  );
};

export default RecountPage;
