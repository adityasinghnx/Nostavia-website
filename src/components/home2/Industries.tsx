import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { BuyerId, getBuyer } from '../../content/human-os';
import { Container, SectionHeading, focusRing } from '../home/shared';
import { Reveal } from '../home/motion';

/* One tile per type of health business. First modules come from the buyer mapping in human-os.ts. */
const tiles: { id: BuyerId; title: string; line: string; to: string; photo: string; w: number; h: number; alt: string; span: string }[] = [
  {
    id: 'labs',
    title: 'Diagnostic labs',
    line: 'Turn every report into a reason to come back.',
    to: '/industries/diagnostic-labs',
    photo: '/photos/industry-labs.jpg',
    w: 1800,
    h: 1200,
    alt: 'Gloved hands holding a rack of sample tubes in a laboratory',
    span: 'lg:col-span-7',
  },
  {
    id: 'hospitals',
    title: 'Hospitals and health systems',
    line: 'Answer every call and keep every patient on their plan.',
    to: '/industries/hospitals',
    photo: '/photos/industry-hospitals.jpg',
    w: 1800,
    h: 1200,
    alt: 'A clinician in scrubs checking a patient monitor',
    span: 'lg:col-span-5',
  },
  {
    id: 'clinics',
    title: 'Clinics and longevity',
    line: 'Know the patient before they sit down.',
    to: '/industries/clinics',
    photo: '/photos/industry-clinics.jpg',
    w: 1800,
    h: 1013,
    alt: 'A doctor showing a patient scans on a tablet',
    span: 'lg:col-span-4',
  },
  {
    id: 'wellness',
    title: 'Wellness platforms and apps',
    line: 'Give users answers, not just charts.',
    to: '/industries/supplements',
    photo: '/photos/industry-wellness.jpg',
    w: 1800,
    h: 1200,
    alt: 'A runner training on a track at night',
    span: 'lg:col-span-4',
  },
  {
    id: 'insurers',
    title: 'Insurers and corporate wellness',
    line: 'See risk building before it becomes a claim.',
    to: '/demo',
    photo: '/photos/industry-insurers.jpg',
    w: 1800,
    h: 1200,
    alt: 'A family walking together at sunset',
    span: 'lg:col-span-4',
  },
];

export const Industries: React.FC = () => (
  <section aria-labelledby="industries-heading" className="bg-ink-950 py-24 sm:py-32">
    <Container className="space-y-14">
      <Reveal>
        {/* TODO(copy): section heading, intro and tile lines */}
        <SectionHeading
          id="industries-heading"
          eyebrow="Who it's for"
          title="Built for every business that holds health data."
          intro="Labs, clinics, hospitals, health apps and insurers each start with the systems that fit their business."
        />
      </Reveal>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        {tiles.map((t, i) => {
          const buyer = getBuyer(t.id);
          return (
            <li key={t.id} className={t.span}>
              <Reveal delay={(i % 3) * 90} className="h-full">
                <Link
                  to={t.to}
                  className={`group relative flex flex-col justify-end h-full min-h-[380px] sm:min-h-[440px] rounded-[22px] overflow-hidden ring-1 ring-white/10 ${focusRing}`}
                >
                  <img
                    src={t.photo}
                    alt={t.alt}
                    width={t.w}
                    height={t.h}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/5" />
                  <span className="relative p-6 sm:p-7">
                    <span className="flex items-start justify-between gap-4">
                      <span className="text-2xl font-semibold text-white tracking-tight">{t.title}</span>
                      <span className="w-9 h-9 shrink-0 rounded-full bg-white/10 ring-1 ring-white/20 flex items-center justify-center text-white group-hover:bg-hos-yellow group-hover:text-ink-950 transition-colors">
                        <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
                      </span>
                    </span>
                    <span className="mt-2 block text-base text-white/75">{t.line}</span>
                    <span className="mt-4 flex flex-wrap gap-1.5">
                      {buyer.firstModules.slice(0, 3).map((m) => (
                        <span key={m} className="rounded-full bg-ink-950/60 ring-1 ring-white/15 px-2.5 py-1 text-xs text-white/80">
                          {m}
                        </span>
                      ))}
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Container>
  </section>
);
