import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Mic, Moon } from 'lucide-react';
import { cn } from '../../lib/cn';
import { AMBER, BrandMark, PHONE, brands, type Brand } from './BrandedApp';
import { darkCard } from './HumanOsScene';
import { Layer, PlaneShadow, Scene } from './Scene3D';
import { CheckInScreen, GelPhone, HealthOrb, ResultsTile, StatTile, gelOf } from './GelApp';

/* ─────────────────────────────────────────────────────────────────────────────
 * Studio, as a tilted stage leaning the same way as Human OS: a clinic's own
 * patient app, with pieces of the same app floating around it: the profile orb,
 * the results ring and last night's sleep. The brand, voice and brief cards
 * below are used by the Studio showcase. Sample brand and data.
 * ──────────────────────────────────────────────────────────────────────────── */

/** Light catching the glass: a soft diagonal sheen over a screen. */
export const Glare: React.FC<{ radius?: number }> = ({ radius = 54 }) => (
  <span
    aria-hidden="true"
    className="pointer-events-none absolute inset-0"
    style={{ borderRadius: radius, background: 'linear-gradient(115deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 28%, transparent 46%, transparent 78%, rgba(255,255,255,0.05) 100%)' }}
  />
);

export const BrandKit: React.FC<{ brand: Brand; light?: boolean }> = ({ brand, light }) => {
  const swatches = [brand.color, brand.paper, AMBER];
  const muted = light ? 'text-[#15130F]/45' : 'text-white/45';
  return (
    <div className={cn('h-full w-full p-5 text-left', light ? 'rounded-[20px] bg-white shadow-[0_40px_70px_-30px_rgba(0,0,0,0.55),0_10px_24px_-14px_rgba(0,0,0,0.35)]' : darkCard)}>
      <div className="flex items-center justify-between">
        <p className={cn('text-[12.5px]', muted)}>Brand</p>
        <BrandMark brand={brand} size={20} />
      </div>
      <div className="mt-4 flex items-end gap-4">
        <span className={cn('text-[54px] leading-[0.8]', brand.serif ? 'font-serif' : 'font-sans font-semibold tracking-[-0.04em]', light ? 'text-[#15130F]' : 'text-[#F2EDE3]')}>Aa</span>
        <div className="pb-0.5">
          <p className={cn('text-[12.5px]', light ? 'text-[#15130F]' : 'text-[#F2EDE3]')}>{brand.serif ? 'Instrument Serif' : 'Geist'}</p>
          <p className={cn('text-[11px]', muted)}>{brand.serif ? 'Headings, with Geist' : 'Headings and text'}</p>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2">
        {swatches.map((c) => (
          <span key={c} className="flex flex-1 flex-col gap-1.5">
            <span className="h-9 rounded-[10px] ring-1 ring-inset ring-black/10" style={{ background: c }} />
            <span className={cn('font-mono text-[9px] uppercase tracking-[0.06em]', muted)}>{c.slice(1)}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const BARS = [0.35, 0.6, 0.9, 0.55, 0.8, 1, 0.65, 0.4, 0.75, 0.5, 0.3];

/** The voice assistant mid-call; its waveform breathes slowly. */
export const VoiceCard: React.FC<{ light?: boolean; accent?: string }> = ({ light, accent = '#F2D27A' }) => {
  const reduce = useReducedMotion();
  return (
    <div className={cn('flex h-full w-full items-center gap-3.5 px-4 text-left', light ? 'rounded-[22px] bg-white shadow-[0_40px_70px_-30px_rgba(0,0,0,0.55),0_10px_24px_-14px_rgba(0,0,0,0.35)]' : cn(darkCard, 'rounded-[22px]'))}>
      {/* Light: a white round button and ink waveform, like the clinic dashboard. Dark: the brand's glow, in a soft halo that stays inside the card. */}
      <span
        className={cn('relative grid h-11 w-11 shrink-0 place-items-center rounded-full', light && 'border border-[#1D1D1F]/[0.08] bg-white shadow-[0_6px_14px_-6px_rgba(29,29,31,0.35)]')}
        style={light ? undefined : { background: accent, boxShadow: `0 0 0 5px ${accent}26` }}
      >
        <Mic className={cn('relative h-[18px] w-[18px]', light ? 'text-[#1D1D1F]' : 'text-[#13110E]')} strokeWidth={1.8} />
      </span>
      <div className="min-w-0 flex-1">
        <p className={cn('whitespace-nowrap text-[13px]', light ? 'text-[#15130F]' : 'text-[#F2EDE3]')}>Voice assistant</p>
        <p className={cn('mt-0.5 truncate text-[11.5px]', light ? 'text-[#15130F]/50' : 'text-white/45')}>Booking Thu, 10:30</p>
      </div>
      <span className="flex h-8 items-center gap-[3px]">
        {BARS.map((b, i) => (
          <motion.span
            key={i}
            className="w-[3px] rounded-full"
            style={{ height: `${b * 100}%`, background: light ? '#1D1D1F' : accent, opacity: 0.5 + b * 0.5 }}
            animate={reduce ? undefined : { scaleY: [1, 0.45 + ((i * 7) % 5) / 10, 1] }}
            transition={{ duration: 2.4 + (i % 4) * 0.35, repeat: Infinity, ease: 'easeInOut', delay: i * 0.08 }}
          />
        ))}
      </span>
    </div>
  );
};

/** A brief waiting in the doctor portal. */
export const BriefToast: React.FC<{ brand: Brand; light?: boolean }> = ({ brand, light }) => (
  <div className={cn('h-full w-full p-4 text-left', light ? 'rounded-[18px] bg-white shadow-[0_40px_70px_-30px_rgba(0,0,0,0.55),0_10px_24px_-14px_rgba(0,0,0,0.35)]' : darkCard)}>
    <div className="flex items-center gap-2">
      <BrandMark brand={brand} size={16} />
      <p className={cn('text-[11px]', light ? 'text-[#15130F]/50' : 'text-white/45')}>Doctor portal · 08:12</p>
    </div>
    <p className={cn('mt-2 text-[13.5px] leading-snug', light ? 'text-[#15130F]' : 'text-[#F2EDE3]')}>Brief ready for Patient 2207</p>
    <p className="mt-1 flex items-center gap-1.5 text-[11.5px] font-medium" style={{ color: light ? AMBER : '#F2D27A' }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: light ? AMBER : '#F2D27A' }} />1 result to review
    </p>
  </div>
);

export const StudioScene: React.FC<{ className?: string }> = ({ className }) => {
  const brand = brands[0];
  const gel = gelOf(brand);
  const scale = 0.62;
  return (
    <Scene
      width={640}
      height={500}
      upscale
      rotate={{ x: 12, y: -20, z: 3 }}
      className={className}
      label="Sample Studio build for a clinic: the patient app's health check-in screen, with pieces of the same app around it: the health profile orb, the results ring and last night's sleep."
    >
      <PlaneShadow x={180} y={60} w={300} h={580} strength={0.6} />
      <Layer x={196} y={30} scale={scale} w={PHONE.w} h={PHONE.h}>
        <GelPhone>
          <CheckInScreen brand={brand} />
        </GelPhone>
      </Layer>

      <PlaneShadow x={426} y={66} w={160} h={160} />
      <Layer x={436} y={46} z={120} w={136} h={136} drift={8}>
        <HealthOrb gel={gel} size={136} />
      </Layer>

      <PlaneShadow x={40} y={214} w={236} h={136} />
      <Layer x={50} y={198} z={100} w={342} h={186} scale={scale} drift={9}>
        <ResultsTile gel={gel} solid className="w-[342px]" />
      </Layer>

      <PlaneShadow x={446} y={318} w={150} h={110} />
      <Layer x={456} y={300} z={160} w={160} h={116} scale={0.82} drift={7}>
        <StatTile gel={gel} Icon={Moon} label="Sleep" value="6h 40m" tone={gel.accent} solid className="w-[160px]" />
      </Layer>
    </Scene>
  );
};
