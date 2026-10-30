import React, { useId } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Bell, Camera, ChevronRight, FileText, Footprints, Home, MessageCircle, Mic, Moon } from 'lucide-react';
import { cn } from '../../lib/cn';
import { BrandMark, PHONE, display, type Brand } from './BrandedApp';

/* ─────────────────────────────────────────────────────────────────────────────
 * A Studio build in a softer, darker register: a patient app made of gel —
 * frosted tiles lit from within, a dial with a glowing orb, a coloured sheet
 * that holds the next step. Five screens of one flow, drawn at real iPhone size
 * (390 × 844 pt inside the frame). The brand sets the glow and sheet colours,
 * its name and its display type. Sample brand, person and data.
 * ──────────────────────────────────────────────────────────────────────────── */

/** accent: the brand's glow. alt and third: colours that sit apart from it and each other, for charts. */
export type Gel = { accent: string; alt: string; third: string; sheet: [string, string]; tileA: string; tileB: string };

const GELS: Record<string, Gel> = {
  clinic: { accent: '#5ED49C', alt: '#8AB4FF', third: '#F2C46A', sheet: ['#3A5DB4', '#1A2A63'], tileA: '#7A9AA4', tileB: '#A07A90' },
  lab: { accent: '#8AACFF', alt: '#5ED4C0', third: '#F2C46A', sheet: ['#6044B8', '#24185C'], tileA: '#7486AC', tileB: '#8E7FB8' },
  app: { accent: '#FF9F6E', alt: '#8AB4FF', third: '#C3B0FF', sheet: ['#2F7480', '#143A42'], tileA: '#A08470', tileB: '#6F948C' },
};

export const gelOf = (b: Brand) => GELS[b.id] ?? GELS.clinic;

const AMBER = '#F2C46A';
const WHITE = '#F5F5F7';

/* ── Materials ── */

/** A frosted tile with light caught in its top edge and its tint pooling at the bottom.
 *  `solid` puts the phone's black behind it, for a tile floating on its own over other things. */
export const GelTile: React.FC<{ tint: string; solid?: boolean; className?: string; style?: React.CSSProperties; children?: React.ReactNode }> = ({ tint, solid, className, style, children }) => (
  <div
    className={cn('relative overflow-hidden rounded-[30px]', className)}
    style={{
      background: `radial-gradient(110% 70% at 30% 0%, rgba(255,255,255,0.16), transparent 60%), radial-gradient(90% 80% at 70% 110%, ${tint}55, transparent 70%), linear-gradient(170deg, ${tint}5E 0%, ${tint}2A 55%, ${tint}1A 100%)${solid ? ', #0A0A0C' : ''}`,
      boxShadow: `inset 0 1.5px 1px rgba(255,255,255,0.3), inset 0 0 0 1px rgba(255,255,255,0.07), inset 0 -20px 40px ${tint}26, 0 26px 44px -20px rgba(0,0,0,0.85)`,
      ...style,
    }}
  >
    {children}
  </div>
);

/** A dark glass pill: a button or a chip. */
const Pill: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <span
    className={cn('inline-flex items-center justify-center rounded-full text-white', className)}
    style={{
      background: 'linear-gradient(180deg, #2C2D31 0%, #141417 100%)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.07), 0 12px 26px -10px rgba(0,0,0,0.9)',
    }}
  >
    {children}
  </span>
);

/** A four-point star, centred on 0,0 with points at ±1. */
const STAR = 'M0 -1 C 0.1 -0.1, 0.1 -0.1, 1 0 C 0.1 0.1, 0.1 0.1, 0 1 C -0.1 0.1, -0.1 0.1, -1 0 C -0.1 -0.1, -0.1 -0.1, 0 -1 Z';

export const Star: React.FC<{ size: number; color: string; core?: string; className?: string; style?: React.CSSProperties }> = ({ size, color, core, className, style }) => {
  const id = useId();
  return (
    <svg viewBox="-1 -1 2 2" width={size} height={size} className={className} style={style} aria-hidden="true">
      {core && (
        <defs>
          <radialGradient id={id}>
            <stop offset="0" stopColor={core} />
            <stop offset="0.55" stopColor={color} />
          </radialGradient>
        </defs>
      )}
      <path d={STAR} fill={core ? `url(#${id})` : color} />
    </svg>
  );
};

/* ── Phone shell ── */

const StatusBar: React.FC = () => (
  <div className="relative flex h-[54px] items-center justify-between px-[36px] pt-[6px] text-[16px] font-semibold text-white">
    <span className="tabular-nums">9:41</span>
    <span className="absolute left-1/2 top-[11px] h-[36px] w-[122px] -translate-x-1/2 rounded-full bg-black" />
    <span className="flex items-center gap-[6px]">
      <svg viewBox="0 0 17 11" className="h-[11px] w-[17px]" fill="currentColor">
        <rect x="0" y="7" width="3" height="4" rx="0.8" />
        <rect x="4.6" y="5" width="3" height="6" rx="0.8" />
        <rect x="9.2" y="2.6" width="3" height="8.4" rx="0.8" />
        <rect x="13.8" y="0" width="3" height="11" rx="0.8" />
      </svg>
      <svg viewBox="0 0 16 12" className="h-[11px] w-[15px]" fill="currentColor">
        <path d="M8 2.3c2.3 0 4.4.9 5.9 2.4l1.2-1.2C13.2 1.6 10.7.6 8 .6S2.8 1.6.9 3.5l1.2 1.2C3.6 3.2 5.7 2.3 8 2.3Zm0 3.3c1.4 0 2.6.5 3.5 1.4l1.2-1.2C11.4 4.6 9.8 3.9 8 3.9s-3.4.7-4.7 1.9L4.5 7C5.4 6.1 6.6 5.6 8 5.6Zm0 3.3c.6 0 1.1.2 1.5.6L8 11.1 6.5 9.5c.4-.4.9-.6 1.5-.6Z" />
      </svg>
      <span className="flex h-[12px] w-[25px] items-center rounded-[4px] border border-white/40 p-[2px]">
        <span className="h-full w-[76%] rounded-[1.5px] bg-white" />
      </span>
    </span>
  </div>
);

export const GelPhone: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="relative rounded-[66px] bg-[#1C1C1F] p-[12px] shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.18),inset_0_0_0_6px_#0A0A0B,0_50px_90px_-30px_rgba(0,0,0,0.75)]"
    style={{ width: PHONE.w, height: PHONE.h }}
  >
    <div className="relative h-full w-full overflow-hidden rounded-[54px] bg-[#060607] font-sans text-left text-white">
      <StatusBar />
      {children}
      <span className="absolute bottom-[8px] left-1/2 z-20 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-white/90" />
      {/* Light catching the glass */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 rounded-[54px]"
        style={{ background: 'linear-gradient(115deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 26%, transparent 44%)' }}
      />
    </div>
  </div>
);

/* ── Shared pieces ── */

const Greeting: React.FC = () => (
  <div className="flex items-center justify-between px-6 pt-4">
    <div className="flex items-center gap-3">
      <span className="grid h-[50px] w-[50px] place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#E9C9A8,#9A6B4E)] text-[18px] font-semibold text-[#2A1A10] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">R</span>
      <div>
        <p className="text-[18px] font-medium tracking-[-0.01em]">Hi, Riya</p>
        <p className="mt-0.5 text-[12.5px] text-white/50">Set up your health plan</p>
      </div>
    </div>
    <Pill className="h-[46px] px-6 text-[14px]">Skip</Pill>
  </div>
);

const BrandBar: React.FC<{ brand: Brand }> = ({ brand }) => (
  <div className="flex items-center justify-between px-6 pt-3">
    <div className="flex items-center gap-2.5">
      <BrandMark brand={brand} size={28} />
      <span className={cn(display(brand), brand.serif ? 'text-[22px]' : 'text-[17px]')}>{brand.name}</span>
    </div>
    <Pill className="h-[42px] w-[42px]">
      <Bell className="h-[18px] w-[18px] text-white/75" strokeWidth={1.8} />
    </Pill>
  </div>
);

/** The coloured sheet at the foot of a step: progress on the left, what it is on the right, the button in the middle. */
const Sheet: React.FC<{ gel: Gel; step: string; dots: number; topic: [string, string]; action: string }> = ({ gel, step, dots, topic, action }) => (
  <div
    className="absolute inset-x-[10px] bottom-[10px] h-[214px] rounded-[44px] px-6 pt-5"
    style={{
      background: `radial-gradient(90% 60% at 50% 0%, rgba(255,255,255,0.16), transparent 70%), linear-gradient(180deg, ${gel.sheet[0]} 0%, ${gel.sheet[1]} 100%)`,
      boxShadow: 'inset 0 1.5px 1px rgba(255,255,255,0.35), inset 0 0 0 1px rgba(255,255,255,0.08)',
    }}
  >
    <div className="flex items-start justify-between">
      <span className="flex items-center gap-2.5">
        <span className="relative flex h-[26px] w-[44px] items-center rounded-full bg-black/30 px-[3px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
          <span className="h-[20px] w-[20px] rounded-full border-2 border-white/90 bg-white/10" />
          <span className="ml-1 h-[12px] w-[12px] rounded-full" style={{ background: `${gel.accent}AA` }} />
        </span>
        <span className="text-[14px] text-white/85">
          {step}
          {dots > 0 && <span className="text-white/45">/{dots}</span>}
        </span>
      </span>
      <span className="text-right text-[13.5px] leading-snug text-white/65">
        {topic[0]}
        <br />
        {topic[1]}
      </span>
    </div>
    <div className="mt-7 flex justify-center">
      <Pill className="h-[68px] w-[196px] text-[21px] tracking-[-0.01em]">{action}</Pill>
    </div>
  </div>
);

const TabBar: React.FC<{ gel: Gel; active: number }> = ({ gel, active }) => (
  <div
    className="absolute inset-x-6 bottom-[26px] z-10 grid h-[66px] grid-cols-4 items-center rounded-full"
    style={{ background: 'linear-gradient(180deg, rgba(44,45,49,0.92), rgba(20,20,23,0.95))', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.16), inset 0 0 0 1px rgba(255,255,255,0.06), 0 16px 30px -10px rgba(0,0,0,0.9)' }}
  >
    {[Home, FileText, Moon, MessageCircle].map((Icon, i) => (
      <span key={i} className="grid place-items-center">
        <span className={cn('grid h-[46px] w-[46px] place-items-center rounded-full', i === active && 'bg-white/[0.08]')}>
          <Icon className="h-[22px] w-[22px]" strokeWidth={1.8} style={{ color: i === active ? gel.accent : 'rgba(255,255,255,0.45)' }} />
        </span>
      </span>
    ))}
  </div>
);

const Title: React.FC<{ brand: Brand; label: string; children: React.ReactNode; className?: string }> = ({ brand, label, children, className }) => (
  <div className={cn('px-6', className)}>
    <p className="text-[14px] text-white/50">{label}</p>
    <p className={cn('mt-1.5 leading-[1.02]', display(brand), brand.serif ? 'text-[46px]' : 'text-[40px]')}>{children}</p>
  </div>
);

/* ── 1. Check-in: what do you want from this? ── */

/* Lens segments either side of the orb, shrinking towards the edges. */
const LENSES = [1, 2, 3, 4, 5];

const Dial: React.FC<{ gel: Gel }> = ({ gel }) => {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex h-[96px] items-center justify-center">
      {[-1, 1].map((side) => (
        <div key={side} className={cn('absolute top-1/2 flex -translate-y-1/2 items-center gap-[5px]', side < 0 ? 'right-[calc(50%+46px)] flex-row-reverse' : 'left-[calc(50%+46px)]')}>
          {LENSES.map((n) => (
            <motion.span
              key={n}
              className="block rounded-[50%]"
              style={{
                width: 30 - n * 4,
                height: 76 - n * 9,
                background: `linear-gradient(${side < 0 ? 270 : 90}deg, ${gel.accent} 0%, ${gel.accent}55 45%, transparent 100%)`,
                boxShadow: `inset 0 0 0 1px ${gel.accent}40`,
                opacity: 1 - n * 0.15,
              }}
              animate={reduce ? undefined : { opacity: [1 - n * 0.15, 0.25, 1 - n * 0.15] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: n * 0.22 }}
            />
          ))}
        </div>
      ))}
      <span
        className="relative grid h-[84px] w-[84px] place-items-center rounded-full"
        style={{ background: `radial-gradient(circle at 50% 40%, ${gel.accent}55, #0A1A12 70%)`, boxShadow: `0 0 0 2px ${gel.accent}AA, 0 0 30px ${gel.accent}88, inset 0 0 20px ${gel.accent}66` }}
      >
        <motion.span animate={reduce ? undefined : { rotate: [0, 90], scale: [1, 1.12, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="grid place-items-center">
          <Star size={38} color="#fff" style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.9))' }} />
        </motion.span>
      </span>
    </div>
  );
};

export const CheckInScreen: React.FC<{ brand: Brand }> = ({ brand }) => {
  const gel = gelOf(brand);
  return (
    <>
      <Greeting />
      <Title brand={brand} label="Health check-in" className="mt-8">
        I want to…
      </Title>
      <div className="relative mt-7 grid grid-cols-2 gap-[14px] px-6">
        <GelTile tint={gel.tileA} className="h-[200px] p-4">
          <span className="grid h-[38px] w-[38px] place-items-center rounded-full border border-white/25 bg-black/25 text-[14px]">1</span>
          <p className="absolute bottom-5 left-4 right-4 text-[15.5px] leading-snug text-white/55">
            Understand <span className="text-white">my lab reports.</span>
          </p>
        </GelTile>
        <GelTile tint={gel.tileB} className="h-[200px] p-4">
          <span className="grid h-[38px] w-[38px] place-items-center rounded-full border border-white/25 bg-black/25 text-[14px]">2</span>
          <p className="absolute bottom-5 left-4 right-4 text-[15.5px] leading-snug text-white/55">
            Sleep better and <span className="text-white">feel rested.</span>
          </p>
        </GelTile>
        {/* The pointer between the choices, down to the dial */}
        <span className="absolute left-1/2 top-[-22px] z-10 -translate-x-1/2">
          <span className="block h-[22px] w-[22px] rounded-full border border-white/40 bg-[radial-gradient(circle_at_40%_35%,#fff,#9a9a9a)] shadow-[0_4px_10px_rgba(0,0,0,0.6)]" />
        </span>
        <span className="absolute left-1/2 top-0 z-0 h-[300px] w-px -translate-x-1/2 bg-gradient-to-b from-white/60 to-white/20" />
      </div>
      <div className="mt-[22px]">
        <Dial gel={gel} />
      </div>
      <Sheet gel={gel} step="1" dots={6} topic={['Your health', 'profile']} action="Next" />
    </>
  );
};

/* ── 2. Profile: what the answers add up to ── */

/** A glass sphere holding a soft star in the brand's glow, slowly breathing. */
export const HealthOrb: React.FC<{ gel: Gel; size: number; className?: string; children?: React.ReactNode }> = ({ gel, size, className, children }) => {
  const reduce = useReducedMotion();
  return (
    <div className={cn('relative', className)} style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${gel.accent}1F, transparent 55%), radial-gradient(circle at 34% 26%, rgba(255,255,255,0.2), rgba(150,170,180,0.2) 34%, rgba(46,56,64,0.6) 68%, rgba(14,16,19,0.95) 100%)`,
          boxShadow: `inset 0 1.5px 1px rgba(255,255,255,0.35), inset 0 -${size * 0.08}px ${size * 0.18}px ${gel.accent}26, inset 0 0 0 1px rgba(255,255,255,0.08), 0 ${size * 0.1}px ${size * 0.2}px -${size * 0.07}px rgba(0,0,0,0.9)`,
        }}
      />
      {/* Light caught on the glass */}
      <span
        className="absolute rounded-[50%]"
        style={{ left: '17%', top: '9%', width: '38%', height: '20%', transform: 'rotate(-24deg)', background: 'radial-gradient(closest-side, rgba(255,255,255,0.28), transparent)' }}
      />
      <motion.div className="absolute inset-0 grid place-items-center" animate={reduce ? undefined : { rotate: [0, 10, 0], scale: [1, 1.05, 1] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
        <Star size={size * 0.62} color={gel.accent} style={{ filter: `blur(${size * 0.035}px)`, opacity: 0.8 }} />
      </motion.div>
      <div className="absolute inset-0 grid place-items-center">
        <Star size={size * 0.4} color={gel.accent} core="#F4FFF8" style={{ filter: `drop-shadow(0 0 ${size * 0.04}px ${gel.accent})` }} />
      </div>
      {children}
    </div>
  );
};

export const ProfileScreen: React.FC<{ brand: Brand }> = ({ brand }) => {
  const gel = gelOf(brand);
  return (
    <>
      <Greeting />
      <Title brand={brand} label="Your health profile" className="mt-8">
        Rest
        <br />
        Seeker
      </Title>
      <HealthOrb gel={gel} size={262} className="mx-auto mt-5">
        <p className="absolute right-[34px] top-[52px] text-right text-[12.5px] leading-snug text-white/55">
          <span className="block text-white/40">△</span>
          Sleep
          <br />
          <span className="text-white">needs care</span>
        </p>
        <p className="absolute bottom-[48px] left-[38px] text-[12.5px] leading-snug text-white/55">
          <span className="block text-white/40">△</span>
          Heart
          <br />
          <span className="text-white">strong</span>
        </p>
      </HealthOrb>
      <Sheet gel={gel} step="Last step" dots={0} topic={['Sleep and', 'recovery']} action="Let’s go" />
    </>
  );
};

/* ── 3. Results: the report, made of the same gel ── */

const RING = { r: 62, n: 28, flagged: [8, 21] };

const ResultRing: React.FC<{ gel: Gel }> = ({ gel }) => (
  <svg viewBox="-80 -80 160 160" className="h-[150px] w-[150px]">
    {Array.from({ length: RING.n }, (_, i) => {
      const a0 = (i / RING.n) * Math.PI * 2 - Math.PI / 2 + 0.05;
      const a1 = ((i + 1) / RING.n) * Math.PI * 2 - Math.PI / 2 - 0.05;
      const flag = RING.flagged.includes(i);
      return (
        <path
          key={i}
          d={`M ${Math.cos(a0) * RING.r} ${Math.sin(a0) * RING.r} A ${RING.r} ${RING.r} 0 0 1 ${Math.cos(a1) * RING.r} ${Math.sin(a1) * RING.r}`}
          stroke={flag ? AMBER : gel.accent}
          strokeOpacity={flag ? 1 : 0.85}
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
          style={{ filter: `drop-shadow(0 0 4px ${flag ? AMBER : gel.accent}88)` }}
        />
      );
    })}
    <text x="0" y="4" textAnchor="middle" fontSize="30" fill={WHITE} style={{ letterSpacing: '-0.03em' }}>
      26
    </text>
    <text x="0" y="24" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.5)">
      of 28
    </text>
  </svg>
);

/** The report in one tile: the ring of results and what it means. */
export const ResultsTile: React.FC<{ gel: Gel; solid?: boolean; className?: string }> = ({ gel, solid, className }) => (
  <GelTile tint={gel.tileA} solid={solid} className={cn('flex h-[186px] items-center gap-4 px-5', className)}>
    <ResultRing gel={gel} />
    <div>
      <p className="text-[22px] leading-tight tracking-[-0.02em]">In a healthy range</p>
      <p className="mt-2 text-[14px] leading-snug text-white/60">
        <span style={{ color: AMBER }}>2 results</span> are worth a chat with your doctor.
      </p>
    </div>
  </GelTile>
);

const spark = [5.9, 5.8, 5.6, 5.4];

export const ResultsScreen: React.FC<{ brand: Brand }> = ({ brand }) => {
  const gel = gelOf(brand);
  return (
    <>
      <BrandBar brand={brand} />
      <Title brand={brand} label="Health report · 23 October" className="mt-6">
        Your results
      </Title>
      <div className="mt-6 px-6">
        <ResultsTile gel={gel} />
        <div className="mt-3 grid grid-cols-2 gap-3">
          {[
            { name: 'Ferritin', value: '412', unit: 'ng/mL', verdict: 'High' },
            { name: 'Vitamin D', value: '18', unit: 'ng/mL', verdict: 'Low' },
          ].map((m) => (
            <GelTile key={m.name} tint={gel.tileB} className="h-[140px] p-4">
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-white/70">{m.name}</p>
                <span className="h-[9px] w-[9px] rounded-full" style={{ background: AMBER, boxShadow: `0 0 10px ${AMBER}` }} />
              </div>
              <p className="mt-5 text-[30px] leading-none tracking-[-0.03em] tabular-nums">
                {m.value} <span className="text-[12px] tracking-normal text-white/45">{m.unit}</span>
              </p>
              <p className="mt-2 text-[13px]" style={{ color: AMBER }}>
                {m.verdict}
              </p>
            </GelTile>
          ))}
        </div>
        <GelTile tint={gel.tileA} className="mt-3 flex h-[88px] items-center justify-between px-5">
          <div>
            <p className="text-[14px] text-white/70">HbA1c</p>
            <p className="mt-1 text-[22px] leading-none tabular-nums">
              5.4<span className="text-[12px] text-white/45">%</span>
              <span className="ml-2 text-[13px]" style={{ color: gel.accent }}>
                In range
              </span>
            </p>
          </div>
          <svg viewBox="0 0 120 40" className="h-[40px] w-[120px]">
            <polyline
              points={spark.map((v, i) => `${8 + i * 34},${6 + ((5.95 - v) / 0.6) * 28}`).join(' ')}
              fill="none"
              stroke={gel.accent}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: `drop-shadow(0 0 4px ${gel.accent})` }}
            />
            <circle cx={8 + 3 * 34} cy={6 + ((5.95 - 5.4) / 0.6) * 28} r="4" fill={gel.accent} />
          </svg>
        </GelTile>
      </div>
      <TabBar gel={gel} active={1} />
    </>
  );
};

/* ── 4. Today: sleep, movement and food as three rings ── */

/** One figure for the day: an icon in its colour, a label and the value. */
export const StatTile: React.FC<{ gel: Gel; Icon: typeof Moon; label: string; value: string; tone: string; solid?: boolean; className?: string }> = ({ gel, Icon, label, value, tone, solid, className }) => (
  <GelTile tint={gel.tileB} solid={solid} className={cn('h-[116px] p-4', className)}>
    <Icon className="h-[20px] w-[20px]" strokeWidth={1.8} style={{ color: tone }} />
    <p className="mt-4 text-[13px] text-white/55">{label}</p>
    <p className="mt-1 text-[24px] leading-none tracking-[-0.02em] tabular-nums">{value}</p>
  </GelTile>
);

/* Today's plan as three rings: sleep, movement and food, each against its goal. */
const rings = [
  { r: 80, v: 0.72, key: 'sleep', label: 'Sleep' },
  { r: 60, v: 0.92, key: 'move', label: 'Move' },
  { r: 40, v: 0.86, key: 'food', label: 'Food' },
];
const planDone = Math.round((rings.reduce((t, g) => t + g.v, 0) / rings.length) * 100);

export const TodayScreen: React.FC<{ brand: Brand }> = ({ brand }) => {
  const gel = gelOf(brand);
  const tones: Record<string, string> = { sleep: gel.accent, move: gel.alt, food: gel.third };
  return (
    <>
      <BrandBar brand={brand} />
      <Title brand={brand} label="Thursday, 24 October" className="mt-6">
        Today
      </Title>
      <div className="mt-6 px-6">
        <GelTile tint={gel.tileA} className="flex h-[224px] items-center gap-5 px-5">
          <div className="relative shrink-0">
            <svg viewBox="-96 -96 192 192" className="h-[172px] w-[172px] -rotate-90">
              {rings.map((g) => {
                const c = 2 * Math.PI * g.r;
                return (
                  <g key={g.key}>
                    <circle r={g.r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="13" />
                    <circle r={g.r} fill="none" stroke={tones[g.key]} strokeWidth="13" strokeLinecap="round" strokeDasharray={`${c * g.v} ${c}`} style={{ filter: `drop-shadow(0 0 5px ${tones[g.key]}88)` }} />
                  </g>
                );
              })}
            </svg>
            <span className="absolute inset-0 grid place-items-center">
              <Star size={20} color="#fff" style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))', opacity: 0.85 }} />
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[30px] leading-none tracking-[-0.03em] tabular-nums">
              {planDone}
              <span className="text-[16px] text-white/50">%</span>
            </p>
            <p className="mt-1.5 text-[12.5px] text-white/50">of today’s plan</p>
            <ul className="mt-4 flex flex-col gap-2">
              {rings.map((g) => (
                <li key={g.key} className="flex items-center gap-2 text-[13px]">
                  <span className="h-[8px] w-[8px] rounded-full" style={{ background: tones[g.key], boxShadow: `0 0 8px ${tones[g.key]}` }} />
                  <span className="text-white/65">{g.label}</span>
                  <span className="ml-auto tabular-nums">{Math.round(g.v * 100)}%</span>
                </li>
              ))}
            </ul>
          </div>
        </GelTile>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {[
            { Icon: Moon, label: 'Sleep', value: '6h 40m', tone: tones.sleep },
            { Icon: Footprints, label: 'Steps', value: '7,820', tone: tones.move },
          ].map((t) => (
            <StatTile key={t.label} gel={gel} {...t} />
          ))}
        </div>
        <GelTile tint={gel.tileA} className="mt-3 flex h-[76px] items-center gap-4 px-5">
          <span className="grid h-[42px] w-[42px] place-items-center rounded-full" style={{ background: `${AMBER}26` }}>
            <Camera className="h-[20px] w-[20px]" strokeWidth={1.8} style={{ color: AMBER }} />
          </span>
          <div className="flex-1">
            <p className="text-[15px]">Lunch</p>
            <p className="text-[12.5px] text-white/50">Scan your plate</p>
          </div>
          <ChevronRight className="h-5 w-5 text-white/40" />
        </GelTile>
      </div>
      <TabBar gel={gel} active={0} />
    </>
  );
};

/* ── 5. Ask: questions about your own results, by voice or text ── */

const WAVE = [0.3, 0.55, 0.85, 0.5, 1, 0.7, 0.4, 0.8, 0.55, 0.3];

export const AskScreen: React.FC<{ brand: Brand }> = ({ brand }) => {
  const gel = gelOf(brand);
  const reduce = useReducedMotion();
  return (
    <>
      <BrandBar brand={brand} />
      <Title brand={brand} label="About your own results" className="mt-6">
        Ask
      </Title>
      <div className="mt-6 flex flex-col gap-3 px-6">
        <Pill className="ml-auto h-auto rounded-[22px] px-5 py-3.5 text-[15.5px]">Why is my ferritin high?</Pill>
        <GelTile tint={gel.tileA} className="mr-6 rounded-[26px] p-5">
          <p className="text-[15.5px] leading-relaxed text-white/90">Ferritin shows how much iron your body stores. Yours is above the usual range.</p>
          <p className="mt-3 text-[15.5px] leading-relaxed text-white/90">Dr. Rao will go through it with you on Thursday.</p>
        </GelTile>
        <div className="flex gap-2">
          <Pill className="h-[40px] px-4 text-[13.5px] text-white/80">What raises it?</Pill>
          <Pill className="h-[40px] px-4 text-[13.5px] text-white/80">See the report</Pill>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-[118px] flex flex-col items-center">
        <span
          className="relative grid h-[96px] w-[96px] place-items-center rounded-full"
          style={{ background: `radial-gradient(circle at 50% 35%, ${gel.accent}, ${gel.accent}66 55%, ${gel.accent}22 100%)`, boxShadow: `0 0 40px ${gel.accent}88, inset 0 2px 2px rgba(255,255,255,0.5)` }}
        >
          <Mic className="h-[30px] w-[30px] text-[#06100B]" strokeWidth={2} />
        </span>
        <span className="mt-4 flex h-[28px] items-center gap-[4px]">
          {WAVE.map((b, i) => (
            <motion.span
              key={i}
              className="w-[4px] rounded-full"
              style={{ height: `${b * 100}%`, background: gel.accent }}
              animate={reduce ? undefined : { scaleY: [1, 0.4 + ((i * 3) % 5) / 10, 1] }}
              transition={{ duration: 2.2 + (i % 3) * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.09 }}
            />
          ))}
        </span>
        <p className="mt-3 text-[12px] text-white/45">Answers come from your own results. Your doctor decides.</p>
      </div>
      <TabBar gel={gel} active={3} />
    </>
  );
};

/** The flow, in order. */
export const GEL_SCREENS = [
  { id: 'check-in', label: 'Check-in', Screen: CheckInScreen },
  { id: 'profile', label: 'Profile', Screen: ProfileScreen },
  { id: 'results', label: 'Results', Screen: ResultsScreen },
  { id: 'today', label: 'Today', Screen: TodayScreen },
  { id: 'ask', label: 'Ask', Screen: AskScreen },
] as const;
