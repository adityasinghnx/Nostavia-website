import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { Bell, CalendarDays, ClipboardList, FlaskConical, Lock, MessageCircle, Plus, Search, Users } from 'lucide-react';
import { cn } from '../../lib/cn';
import { EASE } from '../ui/motion';
import { AMBER, BrandMark, INK, PHONE, PhoneApp, brands, display, type Brand } from './BrandedApp';
import { ScaledFrame } from './ScaledFrame';

/* ─────────────────────────────────────────────────────────────────────────────
 * Studio's showcase: one client's doctor portal and patient app, shown in a
 * choice of sample brands. The same build takes on each brand's colour, type
 * and shape. Turns slowly on its own until someone picks a brand.
 * Both builds are drawn at real size (a 1280 × 800 browser, a 390 pt iPhone)
 * and scaled down together, so type and density read like real screenshots.
 * ──────────────────────────────────────────────────────────────────────────── */

const PORTAL = { w: 1280, h: 800 };

const patients = [
  { time: '10:30', id: 'Patient 2207', who: '42 · F', initials: 'PS', reason: 'Follow-up, fatigue', reports: 'Lipid, iron', brief: 'flag' },
  { time: '10:50', id: 'Patient 3390', who: '35 · M', initials: 'AK', reason: 'New patient', reports: 'Full body', brief: 'ready' },
  { time: '11:10', id: 'Patient 4821', who: '58 · M', initials: 'RV', reason: 'Diabetes review', reports: 'HbA1c', brief: 'flag' },
  { time: '11:30', id: 'Patient 1186', who: '29 · F', initials: 'NM', reason: 'Thyroid review', reports: 'Awaited', brief: 'waiting' },
  { time: '11:50', id: 'Patient 5532', who: '64 · F', initials: 'SL', reason: 'Blood pressure', reports: 'Kidney panel', brief: 'ready' },
  { time: '12:10', id: 'Patient 2741', who: '47 · M', initials: 'DG', reason: 'Follow-up', reports: 'Lipid', brief: 'ready' },
  { time: '12:30', id: 'Patient 6018', who: '31 · F', initials: 'IB', reason: 'New patient', reports: 'Vitamin panel', brief: 'ready' },
] as const;

const briefLabel = { flag: '1 to review', ready: 'Ready', waiting: 'Waiting for reports' } as const;

/* Ferritin over four visits, against its reference range (30–300 ng/mL) */
const trend = [
  { m: 'Jan', v: 182 },
  { m: 'Apr', v: 236 },
  { m: 'Jul', v: 318 },
  { m: 'Oct', v: 412 },
];
const CH = { w: 332, h: 96, max: 460 };
const cy = (v: number) => CH.h - (v / CH.max) * CH.h;
const cx = (i: number) => 8 + (i * (CH.w - 16)) / (trend.length - 1);

const DoctorPortal: React.FC<{ brand: Brand }> = ({ brand }) => (
  <div className="overflow-hidden rounded-[14px] bg-white font-sans text-left shadow-[0_0_0_1px_rgba(0,0,0,0.25),0_50px_100px_-30px_rgba(0,0,0,0.75)]" style={{ width: PORTAL.w, height: PORTAL.h, color: INK }}>
    {/* Browser */}
    <div className="relative flex h-[44px] items-center border-b border-[#15130F]/[0.07] bg-[#F2F0EC] px-4">
      <span className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-3 w-3 rounded-full bg-[#15130F]/[0.13]" />
        ))}
      </span>
      <span className="absolute left-1/2 flex h-[28px] w-[420px] -translate-x-1/2 items-center justify-center gap-1.5 rounded-[8px] bg-white/80 text-[12.5px] text-[#15130F]/50">
        <Lock className="h-3 w-3" strokeWidth={2} /> doctors.{brand.domain}.example
      </span>
      <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-[#15130F]/35">Sample brand</span>
    </div>

    <div className="flex h-[756px]">
      {/* Sidebar */}
      <aside className="flex w-[232px] shrink-0 flex-col border-r border-[#15130F]/[0.07] px-3 py-4" style={{ background: brand.paper }}>
        <div className="flex h-10 items-center gap-2.5 px-2">
          <BrandMark brand={brand} size={26} />
          <span className={cn(display(brand), brand.serif ? 'text-[21px]' : 'text-[15.5px]')}>{brand.name}</span>
        </div>
        <nav className="mt-6 flex flex-col gap-0.5 text-[13.5px]">
          {[
            { Icon: CalendarDays, label: 'Today', count: 0 },
            { Icon: Users, label: 'Patients', count: 0 },
            { Icon: FlaskConical, label: 'Reports', count: 0 },
            { Icon: ClipboardList, label: 'Follow-ups', count: 6 },
            { Icon: MessageCircle, label: 'Messages', count: 3 },
          ].map(({ Icon, label, count }, i) => (
            <span key={label} className={cn('flex h-9 items-center gap-3 rounded-[9px] px-2.5', i === 0 ? 'bg-white shadow-[0_1px_2px_rgba(21,19,15,0.07)]' : 'text-[#15130F]/60')}>
              <Icon className="h-[17px] w-[17px]" strokeWidth={1.8} style={{ color: i === 0 ? brand.color : 'rgba(21,19,15,0.4)' }} />
              {label}
              {count > 0 && <span className="ml-auto text-[12px] tabular-nums text-[#15130F]/40">{count}</span>}
            </span>
          ))}
        </nav>
        <div className="mt-auto flex items-center gap-2.5 px-2">
          <span className="grid h-8 w-8 place-items-center rounded-full text-[11.5px] font-semibold" style={{ background: `${brand.color}1C`, color: brand.color }}>
            AR
          </span>
          <div>
            <p className="text-[13px]">Dr. Anika Rao</p>
            <p className="text-[11.5px] text-[#15130F]/45">General medicine</p>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <div className="flex h-[64px] shrink-0 items-center justify-between border-b border-[#15130F]/[0.07] px-7">
          <span className="flex h-9 w-[300px] items-center gap-2 rounded-[9px] bg-[#15130F]/[0.04] px-3 text-[13px] text-[#15130F]/40">
            <Search className="h-4 w-4" strokeWidth={1.8} /> Search patients and reports
          </span>
          <div className="flex items-center gap-5">
            <Bell className="h-[18px] w-[18px] text-[#15130F]/45" strokeWidth={1.8} />
            <span className="flex h-9 items-center gap-1.5 px-4 text-[13px] font-medium text-white" style={{ background: brand.color, borderRadius: Math.min(brand.radius, 18) }}>
              <Plus className="h-4 w-4" strokeWidth={2} /> New visit
            </span>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[1fr_380px]">
          {/* Today */}
          <div className="px-7 pt-6">
            <p className="text-[13px] text-[#15130F]/45">Thursday, 24 October</p>
            <p className={cn('mt-1 leading-none', display(brand), brand.serif ? 'text-[36px]' : 'text-[28px]')}>Today’s clinic</p>

            <div className="mt-6 grid grid-cols-4 border-y border-[#15130F]/[0.07]">
              {[
                { label: 'Consultations', value: '14', amber: false },
                { label: 'Briefs ready', value: '12', amber: false },
                { label: 'To review', value: '3', amber: true },
                { label: 'Reports awaited', value: '2', amber: false },
              ].map((k, i) => (
                <div key={k.label} className={cn('py-4', i > 0 && 'border-l border-[#15130F]/[0.07] pl-5')}>
                  <p className="text-[12px] text-[#15130F]/45">{k.label}</p>
                  <p className="mt-1 text-[26px] tabular-nums leading-none tracking-[-0.02em]" style={k.amber ? { color: AMBER } : undefined}>
                    {k.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-[60px_1.5fr_1.25fr_1fr_120px] border-b border-[#15130F]/[0.07] pb-2.5 text-[12px] text-[#15130F]/40">
              <span>Time</span>
              <span>Patient</span>
              <span>Reason</span>
              <span>Reports</span>
              <span className="text-right">Brief</span>
            </div>
            <ul>
              {patients.map((p, i) => (
                <li key={p.id} className="relative grid h-[54px] grid-cols-[60px_1.5fr_1.25fr_1fr_120px] items-center border-b border-[#15130F]/[0.06] text-[13.5px]">
                  {i === 0 && <span className="absolute -inset-x-3 inset-y-[3px] rounded-[10px]" style={{ background: `${brand.color}10` }} />}
                  <span className="relative tabular-nums text-[#15130F]/50">{p.time}</span>
                  <span className="relative flex items-center gap-2.5">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#15130F]/[0.05] text-[10.5px] font-medium text-[#15130F]/60">{p.initials}</span>
                    <span>
                      <span className="block leading-tight">{p.id}</span>
                      <span className="block text-[11.5px] leading-tight text-[#15130F]/45">{p.who}</span>
                    </span>
                  </span>
                  <span className="relative text-[13px] text-[#15130F]/70">{p.reason}</span>
                  <span className="relative text-[12.5px] text-[#15130F]/50">{p.reports}</span>
                  <span className={cn('relative text-right text-[12.5px]', p.brief === 'flag' ? 'font-medium' : p.brief === 'waiting' ? 'text-[#15130F]/35' : 'text-[#15130F]/50')} style={p.brief === 'flag' ? { color: AMBER } : undefined}>
                    {briefLabel[p.brief]}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Brief */}
          <aside className="border-l border-[#15130F]/[0.07] px-6 pt-6" style={{ background: brand.paper }}>
            <div className="flex items-baseline justify-between text-[12px] text-[#15130F]/45">
              <span>Pre-consult brief</span>
              <span>Prepared 08:12</span>
            </div>
            <p className={cn('mt-2 leading-none', display(brand), brand.serif ? 'text-[32px]' : 'text-[24px]')}>Patient 2207</p>
            <p className="mt-2 text-[13px] text-[#15130F]/55">42 · Female · Follow-up on fatigue</p>

            <div className="mt-5 border-t border-[#15130F]/[0.08] pt-4">
              <p className="text-[12px] text-[#15130F]/45">Since the last visit</p>
              <p className="mt-1.5 text-[13.5px] leading-snug">New lipid and iron panel, 23 Oct</p>
              <p className="mt-1 text-[13.5px] leading-snug">Sleeping under 6 hours, from the intake form</p>
            </div>

            <div className="mt-5 rounded-[12px] bg-white p-4 shadow-[0_1px_2px_rgba(21,19,15,0.05)]">
              <div className="flex items-baseline justify-between">
                <p className="text-[13.5px] font-medium">Ferritin</p>
                <p className="text-[13.5px] tabular-nums" style={{ color: AMBER }}>
                  412 <span className="text-[11px] text-[#15130F]/40">ng/mL</span>
                </p>
              </div>
              <svg viewBox={`0 0 ${CH.w} ${CH.h + 18}`} className="mt-3 w-full">
                <rect x="0" y={cy(300)} width={CH.w} height={cy(30) - cy(300)} rx="4" fill={`${brand.color}12`} />
                <text x="6" y={cy(300) + 13} fontSize="10" fill="rgba(21,19,15,0.4)">
                  Reference range
                </text>
                <polyline points={trend.map((t, i) => `${cx(i)},${cy(t.v)}`).join(' ')} fill="none" stroke={brand.color} strokeWidth="2" strokeLinejoin="round" />
                {trend.map((t, i) => (
                  <g key={t.m}>
                    <circle cx={cx(i)} cy={cy(t.v)} r="4" fill="#fff" stroke={i === trend.length - 1 ? AMBER : brand.color} strokeWidth="2" />
                    <text x={cx(i)} y={CH.h + 16} fontSize="10" textAnchor="middle" fill="rgba(21,19,15,0.4)">
                      {t.m}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            <div className="mt-5 border-l-2 pl-3" style={{ borderColor: AMBER }}>
              <p className="text-[12px] font-medium" style={{ color: AMBER }}>
                For review
              </p>
              <p className="mt-1 text-[13.5px] leading-snug">Ferritin above range and rising</p>
              <p className="mt-0.5 text-[13.5px] leading-snug">Vitamin D low at 18 ng/mL</p>
            </div>

            <div className="mt-5">
              <p className="text-[12px] text-[#15130F]/45">Medicines on record</p>
              <p className="mt-1 text-[13.5px]">2, no changes since July</p>
            </div>
            <p className="mt-5 text-[11.5px] text-[#15130F]/40">Prepared before the visit. The doctor decides.</p>
          </aside>
        </div>
      </div>
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

/* The composition, in canvas units: the portal behind on the right, the phone in front at bottom left. */
const STAGE = { w: 1200, h: 760 };
const PORTAL_AT = { x: 300, y: 36, s: 0.68 };
const PHONE_AT = { x: 64, y: 196, s: 0.6 };

const Placed: React.FC<{ at: { x: number; y: number; s: number }; children: React.ReactNode }> = ({ at, children }) => (
  <div className="absolute origin-top-left" style={{ left: at.x, top: at.y, transform: `scale(${at.s})` }}>
    {children}
  </div>
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
    const t = window.setInterval(() => setActive((i) => (i + 1) % brands.length), 5600);
    return () => window.clearInterval(t);
  }, [reduce, picked, inView]);

  return (
    <div ref={ref} className={cn('relative overflow-hidden rounded-[32px] bg-[#100F0D] ring-1 ring-white/[0.06]', className)}>
      {/* A soft light in each brand's colour behind the builds */}
      {brands.map((b, i) => (
        <div
          key={b.id}
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
          style={{ opacity: i === active ? 1 : 0, background: `radial-gradient(48% 55% at 62% 52%, ${b.glow}2E, transparent 72%), radial-gradient(30% 40% at 18% 80%, ${b.glow}1F, transparent 70%)` }}
        />
      ))}

      <div className="relative z-10 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 px-6 pt-6 md:px-9 md:pt-8">
        <div className="flex items-baseline gap-6">
          <span className="hidden t-label text-white/35 sm:inline">See it as</span>
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
                className={cn('relative whitespace-nowrap pb-1.5 text-[14.5px] md:text-[15px] tracking-[-0.01em] transition-colors duration-500', i === active ? 'text-white' : 'text-white/40 hover:text-white/70')}
              >
                {b.label}
                <span className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left transition-transform duration-700 ease-out" style={{ background: b.glow, transform: `scaleX(${i === active ? 1 : 0})` }} />
              </button>
            ))}
          </div>
        </div>
        <p className="hidden text-[13px] text-white/40 sm:block">Sample brands. Same build, your name, colours and type.</p>
      </div>

      {/* Wide: portal and phone together, both whole */}
      <div className="relative hidden px-4 pb-4 md:block lg:px-6 lg:pb-6">
        <ScaledFrame width={STAGE.w} height={STAGE.h} label="Sample Studio builds for one client: a doctor portal with pre-consultation briefs, and the patient app, shown in a choice of sample brands.">
          <Crossfade id={brand.id}>
            <Placed at={PORTAL_AT}>
              <DoctorPortal brand={brand} />
            </Placed>
            <Placed at={PHONE_AT}>
              <PhoneApp brand={brand} />
            </Placed>
          </Crossfade>
        </ScaledFrame>
      </div>

      {/* Narrow: the phone on its own, whole */}
      <div className="relative mx-auto w-[66%] max-w-[300px] py-8 md:hidden">
        <ScaledFrame width={PHONE.w} height={PHONE.h} label="Sample Studio build: a patient app, shown in a choice of sample brands.">
          <Crossfade id={brand.id}>
            <PhoneApp brand={brand} />
          </Crossfade>
        </ScaledFrame>
      </div>
    </div>
  );
};
