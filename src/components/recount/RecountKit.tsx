import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_EMAIL } from '../../content/site';
import { recountLinks } from '../../content/recount';
import { PHONE } from '../visuals/BrandedApp';
import { GelPhone } from '../visuals/GelApp';
import { Reveal } from '../ui/motion';
import { cn } from '../../lib/cn';

/* Pieces shared by the Recount pages. Red appears only where something is recording, as in the app. */

const REC = '#FF453A';

const lines = [
  { who: 'Neha', at: '00:13:51', text: 'Can we lock the vendor list by Friday?' },
  { who: 'Me', at: '00:14:02', text: '★ Haan, theek hai. Mujhe kal tak report bhejni hai.' },
  { who: 'Arjun', at: '00:14:17', text: 'The quote from Medilink was ₹4.2 lakh.' },
  { who: 'Neha', at: '00:14:29', text: 'I’ll send the revised', fade: true },
];

/** Recount's recording screen in the site's phone frame. Sample meeting. */
export const RecordingPhone: React.FC<{ scale?: number; className?: string }> = ({ scale = 0.62, className }) => (
  <div aria-hidden="true" className={cn('relative shrink-0', className)} style={{ width: PHONE.w * scale, height: PHONE.h * scale }}>
    <div className="absolute left-0 top-0 origin-top-left" style={{ transform: `scale(${scale})` }}>
      <GelPhone>
        <div className="flex h-[calc(100%-54px)] flex-col px-[28px] pb-[40px] pt-[22px]">
          <p className="text-[32px] font-semibold tracking-[-0.03em]">Vendor review</p>
          <p className="mt-[4px] text-[15px] text-white/50">From your calendar · Neha, Arjun, Me</p>
          <p className="mt-[18px] flex items-center gap-[8px] font-mono text-[16px] tabular-nums" style={{ color: REC }}>
            <span className="h-[9px] w-[9px] rounded-full" style={{ background: REC }} />
            00:14:32
          </p>
          <div className="mt-[22px] flex flex-1 flex-col gap-[20px] overflow-hidden">
            {lines.map((l) => (
              <div key={l.at} className={cn(l.fade && 'opacity-40')}>
                <p className="text-[13px] font-semibold text-white/45">
                  {l.who}
                  <span className="ml-[8px] font-mono font-normal">{l.at}</span>
                </p>
                <p className="mt-[3px] text-[18px] leading-[1.4] text-white/90">{l.text}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto grid h-[96px] w-[96px] place-items-center rounded-full border-[5px] border-white/25">
            <span className="h-[36px] w-[36px] rounded-[10px]" style={{ background: REC, boxShadow: `0 0 0 10px ${REC}24, 0 0 40px ${REC}55` }} />
          </div>
          <p className="mt-[12px] text-center text-[14px] text-white/45">Hold to stop</p>
        </div>
      </GelPhone>
    </div>
  </div>
);

/** Question list with hairlines; each answer opens in place. */
export const RecountFaq: React.FC<{ items: { q: string; a: string }[] }> = ({ items }) => (
  <div className="border-t border-fg/[0.12]">
    {items.map((f) => (
      <details key={f.q} className="group border-b border-fg/[0.12] py-7">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 t-h3 [&::-webkit-details-marker]:hidden">
          {f.q}
          <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-fg/15 text-[18px] text-fg/60 transition-transform duration-500 group-open:rotate-45">
            +
          </span>
        </summary>
        <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-fg/60">{f.a}</p>
      </details>
    ))}
  </div>
);

/** Recount's own links, at the foot of each Recount page. */
export const RecountLinks: React.FC = () => (
  <section data-theme="ink" aria-label="Recount" className="relative border-t border-fg/[0.07]">
    <Reveal className="wrap flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
      <p className="t-label text-fg/55">
        <span className="text-accent">Recount</span> · An app from Nostavia
      </p>
      <nav className="flex flex-wrap gap-x-7 gap-y-3 text-[14.5px]">
        {recountLinks.map((l) => (
          <Link key={l.to} to={l.to} className="text-fg/60 transition-colors hover:text-fg">
            {l.label}
          </Link>
        ))}
        <a href={`mailto:${CONTACT_EMAIL}?subject=Recount`} className="text-fg/60 transition-colors hover:text-fg">
          Contact
        </a>
      </nav>
    </Reveal>
  </section>
);
