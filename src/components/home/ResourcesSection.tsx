import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Container, SectionHeading, focusRing } from './shared';
import { Reveal } from './motion';

/* "Go deeper": the site's existing in-depth pages, presented like a resource hub. */
const resources = [
  { kind: 'Platform', title: 'Human OS: every system and module, with its status', to: '/human-os', tone: 'navy' },
  { kind: 'Clinical', title: 'Clinical evidence, reference ranges and methods', to: '/clinical', tone: 'white' },
  { kind: 'Security', title: 'Security and compliance, and who certifies what', to: '/security', tone: 'white' },
  { kind: 'Pricing', title: 'Pricing for the SDK, White Label and Custom Build', to: '/pricing', tone: 'black' },
] as const;

const Pattern: React.FC<{ tone: 'navy' | 'white' | 'black' }> = ({ tone }) => (
  <svg aria-hidden="true" viewBox="0 0 200 120" className="w-full h-28">
    {[30, 50, 70, 90].map((r, i) => (
      <circle
        key={r}
        cx="170"
        cy="120"
        r={r}
        fill="none"
        stroke={tone === 'white' ? '#121A31' : '#F5D97B'}
        strokeOpacity={tone === 'white' ? 0.12 + i * 0.03 : 0.5 - i * 0.1}
      />
    ))}
    <circle cx="170" cy="120" r="12" fill="#F5D97B" />
  </svg>
);

export const ResourcesSection: React.FC = () => (
  <section aria-labelledby="home-resources-heading" className="bg-white py-20 sm:py-28">
    <Container className="space-y-12">
      <Reveal>
        <SectionHeading id="home-resources-heading" eyebrow="Go deeper" title="Everything your team needs to evaluate Nostavia" />
      </Reveal>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {resources.map((r, i) => {
          const dark = r.tone !== 'white';
          return (
            <li key={r.to}>
              <Reveal delay={i * 90} className="h-full">
                <Link
                  to={r.to}
                  className={`group flex flex-col h-full rounded-[16px] overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(18,26,49,0.5)] ${focusRing} ${
                    r.tone === 'navy' ? 'bg-hos-navy border-hos-navy text-white' : r.tone === 'black' ? 'bg-hos-black border-hos-black text-white' : 'bg-white border-hos-hairline text-hos-black'
                  }`}
                >
                  <Pattern tone={r.tone} />
                  <span className="flex flex-col gap-3 p-6 pt-2 flex-1">
                    <span className={`font-mono text-[11px] font-bold uppercase tracking-widest ${dark ? 'text-hos-yellow' : 'text-hos-amber'}`}>{r.kind}</span>
                    <span className="font-display font-semibold text-lg leading-snug">{r.title}</span>
                    <ArrowUpRight aria-hidden="true" className="mt-auto w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
