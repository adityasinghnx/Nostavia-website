import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Container, SectionHeading, focusRing } from '../home/shared';
import { Reveal } from '../home/motion';
import { VoiceCallCard } from '../home/LiveCards';

/* Facts from the case studies already published on the site. */
const stories = [
  {
    eyebrow: 'Diagnostics',
    name: 'Live 360° Diagnostics',
    logo: '/client_logos/snksn-removebg-preview 1.png',
    headline: 'Smart Reports, white-labelled and running under their brand.',
    body: 'The Smart Report layer sits on their existing lab reporting pipeline, normalises every marker against source-specific reference ranges and keeps results for longitudinal trends.',
    facts: ['Any lab PDF format', 'Optimal bands, not just in range', 'The same panel becomes a trend'],
    to: '/solutions/comet',
  },
  {
    eyebrow: 'Hospitals',
    name: 'Tertiary-care cardiology hospital',
    logo: null,
    headline: 'An AI voice agent on the hospital phone line, against real patient flow.',
    body: 'It handles inbound calls end to end in local languages, including code-switching mid-sentence and family members speaking on behalf of patients.',
    facts: ['Local languages', 'Code-switching mid-sentence', 'Real patient flow, not a sandbox'],
    to: '/solutions/front-desk',
  },
  {
    eyebrow: 'Public health',
    name: 'Kiosk Health',
    logo: '/client_logos/kiosk_health_clean.png',
    headline: 'Offline-first village health kiosks across four Uttar Pradesh districts.',
    body: 'A Hindi voice copilot, decoded diagnostics spoken aloud and a chronic disease registry with automated recall, on a single tablet at each kiosk.',
    facts: ['Chitrakoot, Pratapgarh, Kaushambi, Prayagraj', 'Offline-first', 'Automated recall'],
    to: '/company',
  },
];

export const Customers: React.FC = () => (
  <section aria-labelledby="customers-heading" className="relative bg-ink-900 border-y border-white/[0.06] py-24 sm:py-32">
    <Container className="space-y-14">
      <Reveal>
        <SectionHeading id="customers-heading" eyebrow="In production" title="Running with labs, hospitals and health programmes today." />
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Featured: hospital voice agent with a live screen */}
        <Reveal className="lg:col-span-7 h-full">
          <article className="relative h-full min-h-[460px] rounded-[22px] overflow-hidden ring-1 ring-white/10">
            <img src="/photos/home-frontdesk-staff.jpg" alt="A hospital staff member at the front desk" width={1600} height={1067} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/10" />
            <div aria-hidden="true" className="absolute right-5 top-5 hidden sm:block">
              <VoiceCallCard />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-hos-yellow">{stories[1].name}</div>
              <h3 className="mt-3 text-2xl sm:text-3xl font-semibold text-white leading-snug max-w-xl">{stories[1].headline}</h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed max-w-xl">{stories[1].body}</p>
              <Link to={stories[1].to} className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-hos-yellow rounded ${focusRing}`}>
                See the AI Front Desk Agent
                <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </div>
          </article>
        </Reveal>

        <div className="lg:col-span-5 grid grid-cols-1 gap-4">
          {[stories[0], stories[2]].map((s, i) => (
            <Reveal key={s.name} delay={100 + i * 100} className="h-full">
              <article className="h-full rounded-[22px] dk-card p-6 sm:p-7 flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">{s.eyebrow}</span>
                  {s.logo && <img src={s.logo} alt={`${s.name} logo`} width={120} height={36} loading="lazy" className="h-7 w-auto object-contain brightness-0 invert opacity-80" />}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white leading-snug">{s.headline}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{s.body}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {s.facts.map((f) => (
                    <li key={f} className="rounded-full bg-white/[0.05] ring-1 ring-white/10 px-2.5 py-1 text-xs text-white/75">
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to={s.to} className={`mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-hos-yellow rounded ${focusRing}`}>
                  Learn more
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  </section>
);
