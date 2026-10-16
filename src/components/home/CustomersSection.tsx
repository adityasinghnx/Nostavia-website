import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mic, FileText, RefreshCw, Package } from 'lucide-react';
import { Container, SectionHeading, focusRing } from './shared';
import { Reveal } from './motion';
import { VoiceCallCard } from './LiveCards';

/* Live deployments, from the case studies already published on the site. */

const LIVE360_LOGO = '/client_logos/snksn-removebg-preview 1.png';
const KIOSK_LOGO = '/client_logos/kiosk_health_clean.png';

const linkStyle = (dark = false) =>
  `mt-auto inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4 decoration-2 ${
    dark ? 'text-white decoration-hos-yellow hover:decoration-white' : 'text-white decoration-hos-yellow hover:decoration-white'
  } ${focusRing}`;

export const CustomersSection: React.FC = () => (
  <section aria-labelledby="home-customers-heading" className="bg-ink-950 py-20 sm:py-28">
    <Container className="space-y-12">
      {/* TODO(copy): section heading */}
      <Reveal>
        <SectionHeading
          id="home-customers-heading"
          eyebrow="Customers"
          title="Running in production with labs, hospitals and health programmes"
          className="max-w-4xl"
        />
      </Reveal>

      <Reveal delay={100}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        {/* Hospital */}
        <article className="lg:col-span-5 rounded-[16px] bg-ink-800 text-white p-6 sm:p-8 flex flex-col gap-5">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-hos-yellow">Tertiary-care cardiology hospital</span>
          <h3 className="font-display font-semibold text-2xl leading-snug">An AI voice agent on the hospital phone line, against real patient flow.</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            It handles inbound calls end to end in local languages, including code-switching mid-sentence and family members speaking on behalf of patients.
          </p>
          <Link to="/solutions/front-desk" className={linkStyle(true)}>
            See the AI Front Desk Agent
            <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </Link>
        </article>

        {/* Photo: Unsplash (photo-1742934027594), free licence */}
        <div className="lg:col-span-4 min-h-[380px] rounded-[16px] overflow-hidden relative">
          <img
            src="/photos/home-frontdesk-staff.jpg"
            alt="A hospital staff member at the front desk"
            width={1600}
            height={1067}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
          <div className="absolute left-4 right-4 bottom-4" aria-hidden="true">
            <VoiceCallCard className="w-full" />
          </div>
        </div>

        {/* Live 360 stat */}
        <article className="md:col-span-2 lg:col-span-3 rounded-[16px] bg-white/[0.04] border border-white/[0.08] p-6 flex flex-col gap-3">
          <span className="font-display font-semibold text-4xl tracking-tight text-white">Any format</span>
          <p className="text-sm text-white/60 leading-relaxed">Lab PDF extraction regardless of layout.</p>
          <img src={LIVE360_LOGO} alt="Live 360° Diagnostics logo" width={160} height={48} loading="lazy" className="mt-auto h-9 w-auto self-start object-contain" />
        </article>

        {/* Live 360 story */}
        <article className="lg:col-span-5 rounded-[16px] border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8 flex flex-col gap-5">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-hos-yellow">Live 360° Diagnostics</span>
          <h3 className="font-display font-semibold text-2xl leading-snug text-white">Smart Reports, white-labelled and running under their brand.</h3>
          <p className="text-sm text-white/60 leading-relaxed">
            The Smart Report layer sits on top of their existing lab reporting pipeline, normalises every marker against source-specific reference ranges and keeps results for longitudinal trends. The report itself becomes the retention mechanism.
          </p>
          {/* The same panel, as a trend: sample values */}
          <div aria-hidden="true" className="hos-anim rounded-xl bg-white/[0.04] border border-white/[0.08] p-4">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-white">The same panel, as a trend</span>
              <span className="text-white/55">HbA1c · 4 reports</span>
            </div>
            <svg viewBox="0 0 300 84" className="mt-2 w-full h-20">
              <rect x="0" y="40" width="300" height="22" rx="4" fill="#F5D97B" fillOpacity="0.35" />
              <text x="8" y="72" fontSize="9" fill="#8A6511">optimal band</text>
              <path d="M20 16 L110 30 L200 42 L280 50" fill="none" stroke="#121A31" strokeWidth="2.5" strokeDasharray="400" style={{ animation: 'hos-draw 1.8s ease 0.3s both' }} />
              {[
                [20, 16],
                [110, 30],
                [200, 42],
                [280, 50],
              ].map(([x, y], i) => (
                <circle key={x} cx={x} cy={y} r="4.5" fill={i === 3 ? '#F5D97B' : '#FFFFFF'} stroke="#121A31" strokeWidth="2" style={{ animation: `hos-fade-up 0.4s ease ${0.5 + i * 0.35}s both` }} />
              ))}
            </svg>
          </div>
          <Link to="/industries/diagnostic-labs" className={linkStyle()}>
            Nostavia for diagnostic labs
            <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </Link>
        </article>

        {/* Kiosk story */}
        <article className="lg:col-span-4 rounded-[16px] border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8 flex flex-col gap-5">
          <img src={KIOSK_LOGO} alt="Kiosk Health logo" width={160} height={48} loading="lazy" className="h-9 w-auto self-start object-contain" />
          <h3 className="font-display font-semibold text-xl leading-snug text-white">Offline-first village health kiosks across four Uttar Pradesh districts.</h3>
          <p className="text-sm text-white/60 leading-relaxed">
            A Hindi voice copilot, decoded diagnostics spoken aloud and a chronic disease registry with automated recall, on a single tablet at each kiosk.
          </p>
          <ul className="mt-auto grid grid-cols-2 gap-2">
            {[
              [Mic, 'Hindi voice copilot'],
              [FileText, 'Diagnostics, spoken aloud'],
              [RefreshCw, 'Automated recall'],
              [Package, 'Medicine stock intelligence'],
            ].map(([Icon, label]) => {
              const I = Icon as React.FC<{ className?: string }>;
              return (
                <li key={label as string} className="flex items-center gap-2 rounded-lg bg-white/[0.04] border border-white/[0.08] px-2.5 py-2 text-[11px] font-semibold text-white">
                  <I aria-hidden="true" className="w-3.5 h-3.5 shrink-0 text-hos-yellow" />
                  {label as string}
                </li>
              );
            })}
          </ul>
        </article>

        {/* Kiosk stat */}
        <article className="lg:col-span-3 rounded-[16px] bg-ink-950 text-white p-6 flex flex-col gap-3">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-semibold text-5xl tracking-tight">4</span>
            <span className="text-base font-semibold">districts</span>
          </div>
          {/* Approximate positions, not to scale */}
          <svg aria-hidden="true" viewBox="0 0 170 120" className="hos-anim w-full h-44">
            <path d="M10 70 C 30 30, 80 5, 150 14 C 165 40, 160 90, 120 112 C 70 118, 20 104, 10 70 Z" fill="#FFFFFF" fillOpacity="0.04" stroke="#FFFFFF" strokeOpacity="0.15" />
            {[
              ['Pratapgarh', 118, 26],
              ['Kaushambi', 56, 54],
              ['Prayagraj', 108, 66],
              ['Chitrakoot', 40, 96],
            ].map(([name, x, y], i) => (
              <g key={name as string}>
                <line x1={108} y1={66} x2={x as number} y2={y as number} stroke="#F5D97B" strokeOpacity="0.35" strokeDasharray="2 3" />
                <circle cx={x as number} cy={y as number} r="9" fill="#F5D97B" fillOpacity="0.25" style={{ transformOrigin: `${x}px ${y}px`, animation: `hos-ping 2.4s cubic-bezier(0,0,0.2,1) ${i * 0.4}s infinite` }} />
                <circle cx={x as number} cy={y as number} r="3.5" fill="#F5D97B" />
                <text x={(x as number) + 7} y={(y as number) - 6} fontSize="8" fill="#CBD5E1">{name as string}</text>
              </g>
            ))}
          </svg>
          <p className="mt-auto text-xs text-slate-300 leading-relaxed">Chitrakoot, Pratapgarh, Kaushambi and Prayagraj, Uttar Pradesh.</p>
        </article>
      </div>
      </Reveal>
    </Container>
  </section>
);
