import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { DISCLAIMER } from '../../content/human-os';
import { Container, SectionHeading, focusRing } from './shared';
import { Reveal } from './motion';

/* Answers reuse facts already published elsewhere on the site (product pages, Human OS steps, trust config). */
const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Will our customers see the Nostavia name?',
    a: 'No. Every product runs under your brand, inside your app or in a white-label app we launch for you.',
  },
  {
    q: 'How long does it take to go live?',
    a: 'White Label products launch in weeks. Full hospital deployments go live in 60 days.',
  },
  {
    q: 'Can we try it before we commit?',
    a: 'Yes. Every module can be tried in a sandbox with fictional data first.',
  },
  {
    q: 'Do we need to change our app or our HIS?',
    a: 'No. The SDK sits inside your existing app with no change to your UI, and hospital programmes start from a single data export from your HIS team.',
  },
  {
    q: 'How is patient data protected?',
    a: (
      <>
        Nostavia runs on infrastructure certified to SOC 2 Type II and ISO/IEC 27001, with partner data isolated, encrypted and handled in line with India's DPDP Act. Certifications are held by our infrastructure providers, not by Nostavia Technologies.{' '}
        <Link to="/security" className={`font-semibold text-hos-black underline underline-offset-4 decoration-hos-yellow ${focusRing}`}>
          Security and compliance
        </Link>
      </>
    ),
  },
  {
    q: 'Is Nostavia a medical device?',
    a: DISCLAIMER,
  },
  {
    q: 'How is it priced?',
    a: (
      <>
        A one-time build fee plus a monthly plan.{' '}
        <Link to="/pricing" className={`font-semibold text-hos-black underline underline-offset-4 decoration-hos-yellow ${focusRing}`}>
          See pricing
        </Link>
      </>
    ),
  },
];

export const HomeFaqSection: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section aria-labelledby="home-faq-heading" className="bg-hos-mist py-20 sm:py-28">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-4">
          <SectionHeading id="home-faq-heading" eyebrow="FAQ" title="Questions buyers ask us" />
        </Reveal>
        <div className="lg:col-span-8 divide-y divide-hos-hairline border-y border-hos-hairline">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className={`w-full flex items-center justify-between gap-6 py-5 text-left font-display font-semibold text-lg text-hos-black ${focusRing}`}
                  >
                    {f.q}
                    <span className={`w-8 h-8 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-45 bg-hos-navy border-hos-navy text-hos-yellow' : 'border-hos-hairline text-hos-black'}`}>
                      <Plus aria-hidden="true" className="w-4 h-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  hidden={!isOpen}
                  className="pb-6 pr-14 text-base text-[#475569] leading-relaxed"
                >
                  {f.a}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
