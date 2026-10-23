import React from 'react';
import { CALENDAR_URL, CONTACT_EMAIL } from '../../content/site';
import { CLOSING } from '../../content/offer';
import { HiveSwarm } from '../hive/HiveSwarm';
import { Button } from '../ui/primitives';
import { Reveal, SplitHeading } from '../ui/motion';
import { Magnetic } from '../ui/effects';

/** Closing call to action, shared by every page. */
export const FinalCta: React.FC<{ title?: string; body?: string }> = ({
  title = CLOSING.title,
  body = CLOSING.body,
}) => (
  <section data-theme="ink" aria-labelledby="cta-title" className="relative overflow-hidden border-t border-fg/[0.07]">
    <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_100%,rgba(242,210,122,0.12),transparent_70%)]" />
    <div className="absolute inset-0 opacity-70">
      <HiveSwarm anchor={{ x: 0.5, y: 0.98 }} mobileAnchor={{ x: 0.5, y: 0.98 }} scale={0.2} jobs={false} avoidLeft={0} />
    </div>
    <div className="wrap relative py-[clamp(7rem,14vw,13rem)] flex flex-col items-center text-center">
      <SplitHeading id="cta-title" className="t-display max-w-[14ch]" text={title} />
      <Reveal className="mt-8 flex flex-col items-center gap-9">
        <p className="t-lead text-fg/60 max-w-[44ch]">{body}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Magnetic>
            <Button to="/demo" size="lg">
              Book a demo
            </Button>
          </Magnetic>
          <Button href={CALENDAR_URL} size="lg" variant="secondary">
            Pick a time
          </Button>
        </div>
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-[14px] text-fg/45 hover:text-fg transition-colors">
          or write to {CONTACT_EMAIL}
        </a>
      </Reveal>
    </div>
  </section>
);
