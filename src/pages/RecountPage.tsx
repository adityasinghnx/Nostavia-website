import React, { useEffect, useRef, useState } from 'react';
import { Lock, Plane, Smartphone, UserRoundX } from 'lucide-react';
import { useSeo } from '../lib/useSeo';
import { CONTACT_EMAIL } from '../content/site';
import { HUMAN_OS_PATH } from '../content/human-os';
import {
  RECOUNT_ONE_LINER,
  RECOUNT_PATH,
  RECOUNT_PRIVACY_PATH,
  RECOUNT_SUPPORT_PATH,
  recountConsult,
  recountFaq,
  recountMore,
  recountPrivacy,
  recountStory,
} from '../content/recount';
import { RuledList, SectionHead } from '../components/page/PageKit';
import { FRAME, RecountFaq, RecountHeroScene, RecountLinks, RecountPhone, RecountStoryScene } from '../components/recount/RecountKit';
import { ScaledFrame } from '../components/visuals/ScaledFrame';
import { Button, Label, Section, TextLink } from '../components/ui/primitives';
import { Reveal, SplitHeading } from '../components/ui/motion';
import { CodeField } from '../components/ui/CodeField';
import { cn } from '../lib/cn';

const privacyIcons = [Smartphone, UserRoundX, Plane, Lock];
const storyScreens = recountStory.map((s) => s.screen);

/** The walkthrough: steps scroll on the left while the phone holds still and changes screen. */
const Story: React.FC = () => {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.step))),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    steps.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid lg:grid-cols-12 gap-10">
      <ol className="lg:col-span-6">
        {recountStory.map((s, i) => (
          <li
            key={s.screen}
            ref={(el) => (steps.current[i] = el)}
            data-step={i}
            className={cn('flex flex-col justify-center py-14 lg:min-h-[78vh] lg:py-0 transition-opacity duration-700', i !== active && 'lg:opacity-35')}
          >
            <p className="t-label flex items-center gap-3 text-fg/55">
              <span className="text-accent">{String(i + 1).padStart(2, '0')}</span>
              <span aria-hidden="true" className="h-px w-6 bg-fg/25" />
              {s.label}
            </p>
            <h3 className="t-h2 mt-6 max-w-[14ch]">{s.title}</h3>
            <p className="mt-6 max-w-[44ch] t-lead text-fg/60 text-pretty">{s.body}</p>
            <ul className="mt-8 flex flex-col border-t border-fg/[0.12] max-w-[420px]">
              {s.how.map((h) => (
                <li key={h} className="flex items-center gap-4 border-b border-fg/[0.12] py-3.5 text-[15px] text-fg/75">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
            {/* Small screens: the phone sits under its step */}
            <div className="mt-12 mx-auto w-full max-w-[290px] pl-6 lg:hidden">
              <ScaledFrame width={FRAME.w} height={FRAME.h} label={`Recount: ${s.title}`}>
                <RecountPhone screens={[s.screen]} />
              </ScaledFrame>
            </div>
          </li>
        ))}
      </ol>
      <div className="hidden lg:block lg:col-span-6">
        <div className="sticky top-[11vh] mx-auto" style={{ maxWidth: 'calc(78vh * 560 / 920)' }}>
          <RecountStoryScene screens={storyScreens} active={active} />
        </div>
      </div>
    </div>
  );
};

const RecountPage: React.FC = () => {
  useSeo({
    title: 'Recount: private transcripts for iPhone | Nostavia',
    description: RECOUNT_ONE_LINER,
    path: RECOUNT_PATH,
  });

  return (
    <>
      <section data-theme="ink" aria-labelledby="page-title" className="relative isolate overflow-clip pt-36 md:pt-40 pb-[clamp(3rem,6vw,5rem)]">
        <CodeField variant="feature" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(60%_80%_at_20%_0%,rgba(242,210,122,0.08),transparent_70%)]" />
        <div className="wrap relative grid lg:grid-cols-12 gap-12 lg:gap-6 items-center">
          <div className="lg:col-span-6">
            <Label>Recount · An app from Nostavia</Label>
            <SplitHeading id="page-title" as="h1" trigger="mount" delay={0.15} className="t-display mt-7 max-w-[11ch]" text="Every word. *No cloud.*" />
            <Reveal className="mt-10 flex flex-col items-start gap-8" delay={0.5}>
              <p className="t-lead text-fg/65 text-pretty max-w-[44ch]">
                Recount records your meetings, lectures and consultations, writes them down on your iPhone in English, Hindi or Hinglish, and hands them to the AI you already use. Nothing is uploaded.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="#use" size="lg">
                  See how you use it
                </Button>
                <Button href="#consultations" size="lg" variant="secondary">
                  For consultations
                </Button>
              </div>
              <p className="font-mono text-[12px] tracking-[0.04em] text-fg/45">Coming soon to the App Store · iPhone and Apple Watch</p>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-6 w-full max-w-[620px] mx-auto lg:mr-0" delay={0.6}>
            <RecountHeroScene />
          </Reveal>
        </div>
      </section>

      <Section id="use" theme="paper" labelledBy="recount-use">
        <div className="wrap">
          <SectionHead
            id="recount-use"
            label="How you use it"
            title="From the room to *your notes.*"
            intro="Five steps, all on your iPhone. Record, read it in your language, name who spoke, find what was promised, and hand it to your AI."
          />
          <Story />
        </div>
      </Section>

      <Section id="consultations" labelledBy="recount-consult">
        <div className="wrap">
          <SectionHead
            id="recount-consult"
            label="For consultations · Built by Nostavia"
            title="Every consultation, *in writing.*"
            intro="At Nostavia we build health AI for labs, clinics and hospitals. Recount brings the same care to the conversation itself: what was said, kept on your iPhone, ready for whichever AI you trust."
          />
          <ol className="grid md:grid-cols-3 border-t border-fg/[0.14]">
            {recountConsult.map((c, i) => (
              <Reveal as="li" key={c.label} delay={i * 0.08} className={cn('py-10 md:py-12 md:pr-10 border-b md:border-b-0 border-fg/[0.14]', i > 0 && 'md:border-l md:pl-10')}>
                <p className="t-label text-accent">{c.label}</p>
                <h3 className="mt-8 text-[clamp(1.6rem,2.6vw,2.3rem)] leading-[1.05] tracking-[-0.03em]">{c.title}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-fg/60 max-w-[38ch]">{c.body}</p>
                {i === 0 && <TextLink to={HUMAN_OS_PATH} className="mt-6">See Human OS</TextLink>}
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-12 grid lg:grid-cols-12 gap-6 border-t border-fg/[0.14] pt-8">
            <p className="lg:col-span-7 text-[15px] leading-relaxed text-fg/55 max-w-[60ch]">
              Recount writes down what was said. It never diagnoses or gives advice, and nothing leaves your iPhone until you copy it. Always ask before you record.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section theme="paper" labelledBy="recount-privacy">
        <div className="wrap grid lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHead id="recount-privacy" label="Privacy" title="Your conversations stay on *your iPhone.*" className="lg:block mb-8" />
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

      <Section labelledBy="recount-more">
        <div className="wrap grid lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SplitHeading id="recount-more" className="t-h2" text="Also in *Recount.*" />
          </div>
          <div className="lg:col-span-7">
            <RuledList items={recountMore} numbered={false} />
          </div>
        </div>
      </Section>

      <Section theme="paper" labelledBy="recount-faq">
        <div className="wrap grid lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHead id="recount-faq" label="Questions" title="Good to know." className="lg:block mb-6" />
            <div className="flex flex-col items-start gap-4">
              <TextLink to={RECOUNT_SUPPORT_PATH}>Support</TextLink>
              <a href={`mailto:${CONTACT_EMAIL}?subject=Recount`} className="text-[15px] text-fg/55 hover:text-fg transition-colors">
                or write to {CONTACT_EMAIL}
              </a>
            </div>
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
