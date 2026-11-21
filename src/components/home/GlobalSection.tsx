import React, { useEffect, useState } from 'react';
import { REGIONS } from '../../content/site';
import { Label } from '../ui/primitives';
import { Reveal, SplitHeading } from '../ui/motion';
import { CodeField } from '../ui/CodeField';
import { cn } from '../../lib/cn';

/** Working hours shaded on each day line. */
const OPEN = 9;
const CLOSE = 18;

const formatters = REGIONS.map((r) => new Intl.DateTimeFormat('en-GB', { timeZone: r.tz, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }));

const read = () =>
  formatters.map((f) => {
    const parts = f.formatToParts(new Date());
    const h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);
    const m = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
    return { label: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`, minutes: h * 60 + m, open: h >= OPEN && h < CLOSE };
  });

const ticks = ['00', '06', '12', '18', '24'];

/* Home: the regions we serve, each as a 24-hour line with its working day and the time now. */
export const GlobalSection: React.FC<{ index?: string }> = ({ index = '08' }) => {
  const [now, setNow] = useState(read);
  useEffect(() => {
    const t = window.setInterval(() => setNow(read()), 30000);
    return () => window.clearInterval(t);
  }, []);
  const openCount = now.filter((n) => n.open).length;

  return (
    <section id="global" data-theme="paper" aria-labelledby="global-title" className="relative isolate py-[clamp(6rem,11vw,10.5rem)]">
      <CodeField />
      <div className="wrap">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14 md:mb-20">
          <div className="lg:col-span-7">
            <Label index={index}>Global</Label>
            <SplitHeading id="global-title" className="t-h1 mt-6 max-w-[12ch]" text="One platform, *five regions.*" />
          </div>
          <Reveal className="lg:col-span-5">
            <p className="text-[16px] leading-relaxed text-fg/60 text-pretty">
              Health businesses across India, the UAE, Europe, the USA and Australia work with Nostavia. Wherever you are, your data stays in the region you work in.
            </p>
          </Reveal>
        </div>

        <Reveal>
          {/* Hour scale, aligned with the day lines below */}
          <div aria-hidden="true" className="hidden md:grid grid-cols-[11rem_1fr_11rem] gap-8 pb-3">
            <span />
            <div className="relative h-4">
              {ticks.map((t, i) => (
                <span key={t} className="absolute top-0 -translate-x-1/2 font-mono text-[11px] text-fg/35" style={{ left: `${(i / (ticks.length - 1)) * 100}%` }}>
                  {t}
                </span>
              ))}
            </div>
            <span />
          </div>

          <ul className="border-t border-fg/[0.14]">
            {REGIONS.map((r, i) => {
              const n = now[i];
              return (
                <li key={r.name} className="grid grid-cols-[1fr_auto] md:grid-cols-[11rem_1fr_11rem] items-center gap-x-8 gap-y-4 py-6 md:py-7 border-b border-fg/[0.14]">
                  <p className="text-[clamp(1.35rem,2.2vw,1.9rem)] leading-none tracking-[-0.03em]">{r.name}</p>

                  {/* The day: shaded working hours, a marker at the time now */}
                  <div aria-hidden="true" className="col-span-2 md:col-span-1 row-start-2 md:row-start-auto relative h-8">
                    <div className="absolute inset-x-0 top-1/2 h-px bg-fg/[0.16]" />
                    <div className="absolute top-1/2 -translate-y-1/2 h-[10px] rounded-full bg-fg/[0.09]" style={{ left: `${(OPEN / 24) * 100}%`, width: `${((CLOSE - OPEN) / 24) * 100}%` }} />
                    <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-1000 ease-out" style={{ left: `${(n.minutes / 1440) * 100}%` }}>
                      <span className={cn('block h-3.5 w-3.5 rounded-full ring-4', n.open ? 'bg-accent ring-accent/20' : 'bg-fg/35 ring-fg/[0.06]')} />
                    </div>
                  </div>

                  <p className="text-right md:text-left flex flex-col md:flex-row md:items-baseline md:justify-end gap-1 md:gap-3">
                    <span className="font-mono text-[14px] tabular-nums text-fg/80">
                      {n.label} <span className="text-fg/40">{r.zone}</span>
                    </span>
                    <span className={cn('text-[12.5px] whitespace-nowrap', n.open ? 'text-accent' : 'text-fg/40')}>{n.open ? 'Working day' : 'After hours'}</span>
                  </p>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 text-[13.5px] text-fg/45">
            {openCount > 0 ? `Right now it is the working day in ${openCount === 1 ? 'one' : openCount === 2 ? 'two' : openCount === 3 ? 'three' : openCount === 4 ? 'four' : 'all five'} of our regions.` : 'Right now every region is after hours.'}
          </p>
        </Reveal>
      </div>
    </section>
  );
};
