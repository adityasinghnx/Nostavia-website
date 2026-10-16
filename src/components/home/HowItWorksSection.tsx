import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { steps } from '../../content/human-os';
import { Container, SectionHeading, focusRing } from './shared';
import { Reveal } from './motion';

/** How partners go live. Steps come from human-os.ts. */
export const HowItWorksSection: React.FC = () => (
  <section aria-labelledby="home-how-heading" className="bg-hos-mist py-20 sm:py-28">
    <Container className="space-y-14">
      <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        {/* TODO(copy): section heading */}
        <SectionHeading id="home-how-heading" eyebrow="How it works" title="From first call to live, under your brand" />
        <Link
          to="/demo"
          className={`shrink-0 inline-flex items-center gap-2 bg-hos-black hover:bg-black text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-[2px] transition-colors ${focusRing}`}
        >
          Book a scoping call
          <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
        </Link>
      </Reveal>

      <ol className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <span aria-hidden="true" className="hidden lg:block absolute left-8 right-8 top-[52px] h-px bg-gradient-to-r from-hos-yellow via-hos-amber/40 to-hos-yellow" />
        {steps.map((step, i) => (
          <li key={step.title} className="relative">
            <Reveal delay={i * 120} className="h-full">
              <div className="h-full rounded-[16px] bg-white border border-hos-hairline p-6 sm:p-7 flex flex-col gap-4">
                <span className="relative z-10 w-14 h-14 rounded-full bg-hos-navy text-white flex items-center justify-center font-display font-semibold text-lg ring-8 ring-white">
                  <span className="sr-only">Step </span>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display font-bold text-xl text-hos-black">{step.title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{step.body}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Container>
  </section>
);
