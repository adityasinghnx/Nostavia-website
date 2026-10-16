import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Disclaimer } from '../human-os/Disclaimer';
import { Container, SectionHeading, focusRing } from './shared';
import { Reveal } from './motion';

/* Names and credentials mirror the advisory bench on the Company page. Keep the two in sync. */
const bench = [
  { name: 'Dr. Sparsh Sehdev', role: 'MBBS, GMC Registered (UK)' },
  { name: 'Aakanksha Pant, PhD', role: 'Chief Longevity Officer · Senior Scientist, IISc Bangalore' },
  { name: 'Sharwani Walke', role: 'Chief Nutrition Officer · MSc Clinical Nutrition, UCL' },
  { name: 'Dr. Akshita Gupta', role: 'MBBS · Chronic conditions and general medicine' },
  { name: 'Anmol Udhad', role: 'Sports Nutritionist (ISSA), MBA' },
  { name: 'Dr. Dipa Patle', role: 'Ayurvedic Doctor (BAMS)' },
];

const initials = (name: string) =>
  name
    .replace(/^Dr\.\s*/, '')
    .replace(/,.*$/, '')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);

export const ClinicalBenchSection: React.FC = () => (
  <section aria-labelledby="home-bench-heading" className="bg-ink-900 border-y border-white/[0.06] py-20 sm:py-28">
    <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <Reveal className="lg:col-span-5 space-y-6">
        {/* TODO(copy): section heading */}
        <SectionHeading
          id="home-bench-heading"
          eyebrow="Clinical governance"
          title="Reviewed by clinicians before it reaches your patients"
          intro="Protocol outputs are reviewed by our licensed clinical advisory bench before release to any partner."
        />
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <Link to="/company" className={`inline-flex items-center gap-2 text-sm font-bold text-white underline underline-offset-4 decoration-hos-yellow decoration-2 hover:decoration-white ${focusRing}`}>
            Meet the clinical bench
            <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </Link>
          <Link to="/clinical" className={`inline-flex items-center gap-2 text-sm font-bold text-white underline underline-offset-4 decoration-hos-yellow decoration-2 hover:decoration-white ${focusRing}`}>
            See our clinical evidence
            <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </Link>
        </div>
        <Disclaimer className="pt-4 border-t border-white/[0.08]" />
      </Reveal>

      <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {bench.map((b, i) => (
          <li key={b.name}>
            <Reveal delay={(i % 2) * 100} className="h-full">
              <div className="h-full flex items-center gap-4 rounded-[12px] bg-white/[0.03] border border-white/[0.08] p-4 hover:border-white/25 transition-colors">
                <span aria-hidden="true" className="w-12 h-12 shrink-0 rounded-full bg-ink-800 text-hos-yellow font-display font-semibold flex items-center justify-center ring-4 ring-white/[0.06]">
                  {initials(b.name)}
                </span>
                <span>
                  <span className="block font-display font-bold text-base text-white">{b.name}</span>
                  <span className="block text-xs text-white/60 leading-relaxed mt-0.5">{b.role}</span>
                </span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Container>
  </section>
);
