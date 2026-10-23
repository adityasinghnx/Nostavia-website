import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { Search } from 'lucide-react';
import { cn } from '../../lib/cn';
import { EASE } from '../ui/motion';
import { BrandMark, INK, PhoneApp, brands, display, type Brand } from './BrandedApp';
import { ScaledFrame } from './ScaledFrame';

/* ─────────────────────────────────────────────────────────────────────────────
 * Studio's showcase: one client's doctor portal and patient app, shown in a
 * choice of sample brands. The same build takes on each brand's colour, type
 * and shape. Turns slowly on its own until someone picks a brand.
 * ──────────────────────────────────────────────────────────────────────────── */

const patients = [
  { time: '10:30', id: 'Patient 2207', visit: 'Follow-up', status: '1 flag' },
  { time: '10:50', id: 'Patient 3390', visit: 'New patient', status: 'Brief ready' },
  { time: '11:10', id: 'Patient 4821', visit: 'Follow-up', status: '1 flag' },
  { time: '11:30', id: 'Patient 1186', visit: 'Review', status: 'Waiting for reports' },
];

const DoctorPortal: React.FC<{ brand: Brand }> = ({ brand }) => (
  <div className="h-[540px] w-[800px] overflow-hidden rounded-[14px] bg-white font-sans text-left shadow-[0_0_0_1px_rgba(21,19,15,0.08),0_50px_100px_-50px_rgba(21,19,15,0.5)]" style={{ color: INK }}>
    <div className="flex h-9 items-center border-b border-[#15130F]/[0.06] bg-[#F5F4F1] px-4">
      <span className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#15130F]/[0.12]" />
        ))}
      </span>
      <span className="mx-auto text-[11px] text-[#15130F]/40">doctors.{brand.domain}.example</span>
    </div>

    <div className="flex h-[58px] items-center border-b border-[#15130F]/[0.07] px-8">
      <BrandMark brand={brand} size={22} />
      <span className={cn('ml-2', display(brand), brand.serif ? 'text-[19px]' : 'text-[14.5px] font-semibold tracking-[-0.025em]')}>{brand.name}</span>
      <nav className="ml-12 flex h-full gap-7 text-[12.5px]">
        {['Today', 'Patients', 'Reports', 'Messages'].map((n, i) => (
          <span key={n} className={cn('relative flex items-center', i === 0 ? '' : 'text-[#15130F]/45')}>
            {n}
            {i === 0 && <span className="absolute inset-x-0 bottom-0 h-[2px]" style={{ background: brand.color }} />}
          </span>
        ))}
      </nav>
      <span className="ml-auto flex items-center gap-4 text-[#15130F]/35">
        <span className="font-mono text-[8.5px] uppercase tracking-[0.14em]">Sample brand</span>
        <Search className="h-4 w-4" strokeWidth={1.8} />
        <span className="grid h-7 w-7 place-items-center rounded-full border border-[#15130F]/12 text-[10px] text-[#15130F]/60">DR</span>
      </span>
    </div>

    <div className="grid h-[calc(100%-94px)] grid-cols-[1fr_290px]">
      <div className="px-8 pt-7">
        <p className="text-[11.5px] text-[#15130F]/45">Thursday, 24 October</p>
        <div className="mt-1 flex items-end justify-between">
          <p className={cn('leading-none', display(brand), brand.serif ? 'text-[34px]' : 'text-[28px]')}>Today’s clinic</p>
          <p className="text-[11.5px] text-[#15130F]/45">4 patients · 2 to review</p>
        </div>
        <div className="mt-6 grid grid-cols-[56px_1fr_96px_120px] pb-2 text-[10.5px] text-[#15130F]/40">
          <span>Time</span>
          <span>Patient</span>
          <span>Visit</span>
          <span className="text-right">Brief</span>
        </div>
        <ul>
          {patients.map((p, i) => (
            <li key={p.id} className="relative grid h-[50px] grid-cols-[56px_1fr_96px_120px] items-center border-t border-[#15130F]/[0.07] text-[13px]">
              {i === 0 && <span className="absolute -inset-x-3 inset-y-0 -z-0 rounded-lg" style={{ background: `${brand.color}0F` }} />}
              <span className="relative tabular-nums text-[#15130F]/50">{p.time}</span>
              <span className="relative">{p.id}</span>
              <span className="relative text-[12px] text-[#15130F]/50">{p.visit}</span>
              <span className={cn('relative text-right text-[11.5px]', p.status === '1 flag' ? 'font-medium text-[#9A6412]' : 'text-[#15130F]/45')}>{p.status}</span>
            </li>
          ))}
        </ul>
      </div>

      <aside className="border-l border-[#15130F]/[0.07] px-6 pt-7" style={{ background: brand.paper }}>
        <p className="text-[11px] text-[#15130F]/45">Pre-consult brief</p>
        <p className={cn('mt-1 leading-none', display(brand), brand.serif ? 'text-[28px]' : 'text-[22px]')}>Patient 2207</p>
        <p className="mt-2 text-[12px] text-[#15130F]/50">10:30 · Follow-up on fatigue</p>
        <dl className="mt-6 flex flex-col gap-4 text-[12.5px]">
          <div>
            <dt className="text-[11px] text-[#15130F]/45">New since last visit</dt>
            <dd className="mt-0.5">Lipid and iron panel</dd>
          </div>
          <div>
            <dt className="text-[11px] text-[#15130F]/45">Medicines on record</dt>
            <dd className="mt-0.5">2, no changes</dd>
          </div>
          <div className="border-l-2 border-[#C9932E] pl-3">
            <dt className="text-[11px] font-medium text-[#9A6412]">For review</dt>
            <dd className="mt-0.5">Ferritin above range</dd>
          </div>
        </dl>
        <p className="mt-6 text-[10.5px] leading-relaxed text-[#15130F]/40">Prepared before the visit. The doctor decides.</p>
      </aside>
    </div>
  </div>
);

/* The new brand dissolves in as the old one softens away, so differing type never shows as a double image. */
const Crossfade: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => (
  <AnimatePresence initial={false}>
    <motion.div
      key={id}
      className="absolute inset-0"
      style={{ zIndex: 1 }}
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE, delay: 0.15 } }}
      exit={{ opacity: 0, filter: 'blur(10px)', zIndex: 0, transition: { duration: 0.5, ease: EASE, zIndex: { duration: 0 } } }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export const StudioShowcase: React.FC<{ className?: string }> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.4 });
  const [active, setActive] = useState(0);
  const [picked, setPicked] = useState(false);
  const brand = brands[active];

  useEffect(() => {
    if (reduce || picked || !inView) return;
    const t = window.setInterval(() => setActive((i) => (i + 1) % brands.length), 5200);
    return () => window.clearInterval(t);
  }, [reduce, picked, inView]);

  return (
    <div ref={ref} className={cn('relative overflow-hidden rounded-[32px] bg-[#E6E0D3]', className)}>
      {/* A soft light in each brand's colour, rising from below */}
      {brands.map((b, i) => (
        <div
          key={b.id}
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
          style={{ opacity: i === active ? 1 : 0, background: `radial-gradient(55% 65% at 50% 105%, ${b.color}40, transparent 72%)` }}
        />
      ))}

      <div className="relative z-10 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 px-6 pt-6 md:px-9 md:pt-8">
        <div className="flex items-baseline gap-6">
          <span className="hidden t-label text-[#15130F]/40 sm:inline">See it as</span>
          <div role="group" aria-label="Show the build in a sample brand" className="flex gap-5 md:gap-7">
            {brands.map((b, i) => (
              <button
                key={b.id}
                type="button"
                aria-pressed={i === active}
                onClick={() => {
                  setActive(i);
                  setPicked(true);
                }}
                className={cn('relative whitespace-nowrap pb-1.5 text-[14.5px] md:text-[15px] tracking-[-0.01em] transition-colors duration-500', i === active ? 'text-[#15130F]' : 'text-[#15130F]/40 hover:text-[#15130F]/70')}
              >
                {b.label}
                <span className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left transition-transform duration-700 ease-out" style={{ background: b.color, transform: `scaleX(${i === active ? 1 : 0})` }} />
              </button>
            ))}
          </div>
        </div>
        <p className="hidden text-[13px] text-[#15130F]/45 sm:block">Same build. Your name, colours and type.</p>
      </div>

      {/* Wide: portal and phone together, cropped by the stage's bottom edge */}
      <div className="relative hidden md:block">
        <ScaledFrame width={1200} height={600} label="Sample Studio builds for one client: a doctor portal with pre-consultation briefs, and the patient app, shown in a choice of sample brands.">
          <Crossfade id={brand.id}>
            <div className="absolute left-[376px] top-[100px]">
              <DoctorPortal brand={brand} />
            </div>
            <div className="absolute left-[80px] top-[20px]">
              <PhoneApp brand={brand} />
            </div>
          </Crossfade>
        </ScaledFrame>
      </div>

      {/* Narrow: the phone on its own */}
      <div className="relative mx-auto mt-8 w-[72%] max-w-[300px] md:hidden">
        <ScaledFrame width={300} height={520} label="Sample Studio build: a patient app, shown in a choice of sample brands.">
          <Crossfade id={brand.id}>
            <PhoneApp brand={brand} />
          </Crossfade>
        </ScaledFrame>
      </div>
    </div>
  );
};
