import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';
import { EASE } from '../ui/motion';
import { PHONE, brands, type Brand } from './BrandedApp';
import { Layer, PlaneShadow, Scene } from './Scene3D';
import { BrandKit, BriefToast, Glare, VoiceCard } from './StudioScene';
import { ClinicDashboard, DASH } from './ClinicDashboard';
import { GEL_SCREENS, GelPhone, Star, gelOf } from './GelApp';

/* ─────────────────────────────────────────────────────────────────────────────
 * Studio's showcase: one client's clinic dashboard and patient app, floating free
 * across the full width of the page (no frame), shown in a choice of sample brands. The same build takes on each brand's colour, type
 * and shape. Turns slowly on its own until someone picks a brand.
 * Both builds are drawn at real size (a 1280 × 800 browser, a 390 pt iPhone)
 * and laid on one tilted stage with the rest of the build floating above it.
 *
 * Open the app (the phone, or the button): the rest of the build quietly steps
 * back, the app's other screens slide out from under the phone like a deck spread
 * across a table, and the stage turns slowly to face you as the row curves round.
 * Close it and they slide back under.
 * ──────────────────────────────────────────────────────────────────────────── */

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

/* The composition, in canvas units, on a plane turned in 3D: the portal behind, the phone in front,
   and the rest of the build floating at its own depth. Every brand-dependent piece crossfades. */
const STAGE = { w: 1440, h: 760 };
const PORTAL_SCALE = 0.66;

/** The dotted surface the builds stand on; it fades out towards the edges. */
const Surface: React.FC = () => (
  <div
    aria-hidden="true"
    className="absolute"
    style={{
      left: -160,
      top: -120,
      width: STAGE.w + 320,
      height: STAGE.h + 260,
      transform: 'translateZ(-2px)',
      backgroundImage: 'radial-gradient(rgb(var(--fg) / 0.14) 1px, transparent 1.4px)',
      backgroundSize: '26px 26px',
      maskImage: 'radial-gradient(50% 50% at 50% 50%, #000 30%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(50% 50% at 50% 50%, #000 30%, transparent 100%)',
    }}
  />
);

/* ── The app's flow: one phone that spreads into all of its screens ── */

type Pose = { x: number; y: number; z: number; s: number; rz?: number; /** Turn and lift once landed, to curve the row. */ ry?: number; lift?: number };

interface FlowLayout {
  /** The phone on the stage before it opens. */
  closed: Pose;
  /** Where screen i lands once open. Keep its depth as when closed (closed.z - i * 4), so screens
   *  never pass through each other on the way: each stays just under the one before. The curve
   *  (ry, lift) is applied only after they land. */
  open: (i: number) => Pose;
  /** The stage's turn: tilted while closed, turning to face the viewer once open. */
  plane: { closed: { x: number; y: number; z: number }; open: { x: number; y: number; z: number } };
  /** Label size under each opened screen, in phone units; 0 leaves the labels out (where screens overlap). */
  label: number;
}

/* Wide: a row facing the viewer, gently concave: the outer screens turned in and brought forward. */
const ROW = { s: 0.52, gap: 40, y: 128 };
const rowX0 = (STAGE.w - (GEL_SCREENS.length * PHONE.w * ROW.s + (GEL_SCREENS.length - 1) * ROW.gap)) / 2;
const WIDE: FlowLayout = {
  closed: { x: 150, y: 226, z: 140, s: 0.56 },
  open: (i) => {
    const k = i - 2;
    return { x: rowX0 + i * (PHONE.w * ROW.s + ROW.gap), y: ROW.y, z: 140 - i * 4, s: ROW.s, ry: -k * 8, lift: Math.abs(k) * 28 };
  },
  plane: { closed: { x: 18, y: 12, z: -3 }, open: { x: 8, y: 0, z: 0 } },
  label: 26,
};

/* Narrow: a fanned hand of screens. */
const NARROW_STAGE = { w: 440, h: 590 };
const NARROW: FlowLayout = {
  closed: { x: 104, y: 40, z: 0, s: 0.56 },
  open: (i) => {
    const k = i - 2;
    return { x: 220 + k * 64 - (PHONE.w * 0.4) / 2, y: 120 + k * k * 9, z: -i * 4, s: 0.4, rz: k * 6 };
  },
  plane: { closed: { x: 10, y: 14, z: -3 }, open: { x: 4, y: 0, z: 0 } },
  label: 0,
};

/* Like a deck spread across a table: the top card slides to the start of the row and the rest
   slide out from under it, one after another, while the stage turns slowly to face you. Once
   they land the row curves round. Folding back reverses it. */
const SPREAD = [0.22, 1, 0.36, 1] as const;
const spread = (i: number, open: boolean) =>
  open ? { duration: 1.15, ease: SPREAD, delay: i === 0 ? 0.08 : 0.14 + i * 0.07 } : { duration: 0.85, ease: SPREAD, delay: (GEL_SCREENS.length - 1 - i) * 0.05 };

const PhoneFlow: React.FC<{ layout: FlowLayout; brand: Brand; open: boolean; onToggle: () => void }> = ({ layout, brand, open, onToggle }) => {
  const c = layout.closed;
  // The other screens exist only while open (and while folding away), so nothing hidden keeps animating.
  const [dealt, setDealt] = useState(open);
  useEffect(() => {
    if (open) return setDealt(true);
    const t = window.setTimeout(() => setDealt(false), 1200);
    return () => window.clearTimeout(t);
  }, [open]);

  return (
    <>
      {GEL_SCREENS.map(({ id, label, Screen }, i) => {
        if (i > 0 && !dealt && !open) return null;
        // Closed, every screen sits exactly under the first, a hair lower, so only the first shows.
        const under = { x: c.x, y: c.y, z: c.z - i * 4, scale: c.s, rotateZ: 0 };
        const p = open ? layout.open(i) : { ...c, z: c.z - i * 4 };
        return (
          <motion.div
            key={id}
            className={cn('absolute left-0 top-0 origin-top-left', i === 0 && 'cursor-pointer')}
            style={{ width: PHONE.w, height: PHONE.h, transformStyle: 'preserve-3d', pointerEvents: open || i === 0 ? 'auto' : 'none' }}
            initial={i === 0 ? false : under}
            animate={{ x: p.x, y: p.y, z: p.z, scale: p.s, rotateZ: p.rz ?? 0 }}
            transition={spread(i, open)}
            onClick={i === 0 ? onToggle : undefined}
          >
            <motion.div
              className="h-full w-full"
              style={{ transformStyle: 'preserve-3d' }}
              initial={false}
              animate={{ z: open ? (p.lift ?? 0) : 0, rotateY: open ? (p.ry ?? 0) : 0 }}
              transition={open ? { duration: 1.1, ease: SPREAD, delay: 0.75 + i * 0.05 } : { duration: 0.6, ease: SPREAD }}
            >
              <Crossfade id={brand.id}>
                <GelPhone>
                  <Screen brand={brand} />
                </GelPhone>
              </Crossfade>
              {layout.label > 0 && (
                <motion.p
                  className="absolute left-0 right-0 text-center font-mono uppercase tracking-[0.16em] text-fg/50"
                  style={{ top: PHONE.h + layout.label, fontSize: layout.label }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: open ? 1 : 0 }}
                  transition={{ duration: 0.6, delay: open ? 0.9 + i * 0.06 : 0 }}
                >
                  <span className="text-fg">{String(i + 1).padStart(2, '0')}</span> {label}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
};

export const StudioShowcase: React.FC<{ className?: string }> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.4 });
  const [active, setActive] = useState(0);
  const [picked, setPicked] = useState(false);
  const [open, setOpen] = useState(false);
  const brand = brands[active];

  useEffect(() => {
    if (reduce || picked || open || !inView) return;
    const t = window.setInterval(() => setActive((i) => (i + 1) % brands.length), 5600);
    return () => window.clearInterval(t);
  }, [reduce, picked, open, inView]);

  const toggle = () => setOpen((o) => !o);
  // The stage turns slowly, like a camera easing round, alongside the spread.
  const turn = { duration: 1.8, ease: [0.45, 0, 0.2, 1] as const, delay: open ? 0.1 : 0.15 };

  return (
    // Full bleed: out of the page's column to the edges of the screen, with nothing framing it
    <div ref={ref} className={cn('relative ml-[calc(50%-50vw)] w-screen', className)}>
      {/* A soft light in each brand's colour, fading out long before any edge */}
      {brands.map((b, i) => (
        <div
          key={b.id}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-[1400ms] ease-out"
          style={{ opacity: i === active ? 1 : 0, background: `radial-gradient(36% 44% at 52% 52%, ${b.glow}38, transparent 75%), radial-gradient(22% 30% at 22% 70%, ${b.glow}26, transparent 75%)` }}
        />
      ))}

      <div className="wrap relative z-20 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <div className="flex items-baseline gap-6">
          <span className="hidden t-label text-fg/40 sm:inline">See it as</span>
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
                className={cn('relative whitespace-nowrap pb-1.5 text-[14.5px] md:text-[15px] tracking-[-0.01em] transition-colors duration-500', i === active ? 'text-fg' : 'text-fg/40 hover:text-fg/70')}
              >
                {b.label}
                <span className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left transition-transform duration-700 ease-out" style={{ background: b.color, transform: `scaleX(${i === active ? 1 : 0})` }} />
              </button>
            ))}
          </div>
        </div>
        <p className="hidden text-[13px] text-fg/45 sm:block">Sample brands. Same build, your name, colours and type.</p>
      </div>

      {/* Wide: the whole build on a tilted stage */}
      <div className="relative mx-auto hidden max-w-[1680px] pt-16 md:block">
        <Scene
          width={STAGE.w}
          height={STAGE.h}
          upscale
          rotate={open ? WIDE.plane.open : WIDE.plane.closed}
          transition={turn}
          perspective={2800}
          label="Sample Studio build for one client: a doctor portal with pre-consultation briefs, the patient app, a voice assistant and the brand they share, shown in a choice of sample brands. Opened, the patient app shows five screens: check-in, health profile, results, today and ask."
        >
          <Surface />

          <PlaneShadow x={336} y={90} w={920} h={560} strength={0.45} away={open} />
          <Layer x={366} y={66} w={DASH.w} h={DASH.h} scale={PORTAL_SCALE} away={open}>
            <Crossfade id={brand.id}>
              <ClinicDashboard brand={brand} />
              <span className="pointer-events-none absolute inset-0">
                <Glare radius={30} />
              </span>
            </Crossfade>
          </Layer>

          <Layer x={986} y={30} z={230} w={262} h={102} drift={7} away={open}>
            <Crossfade id={brand.id}>
              <BriefToast brand={brand} light />
            </Crossfade>
          </Layer>

          <Layer x={1036} y={470} z={210} w={206} h={200} drift={9} away={open}>
            <Crossfade id={brand.id}>
              <BrandKit brand={brand} light />
            </Crossfade>
          </Layer>

          <Layer x={586} y={630} z={250} w={272} h={74} drift={6.5} away={open}>
            <Crossfade id={brand.id}>
              <VoiceCard light accent={brand.color} />
            </Crossfade>
          </Layer>

          <PhoneFlow layout={WIDE} brand={brand} open={open} onToggle={toggle} />
        </Scene>
      </div>

      {/* Narrow: the phone, opening into a fanned hand of screens */}
      <div className="relative mx-auto w-[92%] max-w-[420px] pt-6 md:hidden">
        <Scene
          width={NARROW_STAGE.w}
          height={NARROW_STAGE.h}
          rotate={open ? NARROW.plane.open : NARROW.plane.closed}
          transition={turn}
          label="Sample Studio build: a patient app, shown in a choice of sample brands. Opened, it shows five screens: check-in, health profile, results, today and ask."
        >
          <PhoneFlow layout={NARROW} brand={brand} open={open} onToggle={toggle} />
        </Scene>
      </div>

      <div className="relative z-20 flex justify-center pt-2">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          className="group inline-flex h-12 items-center gap-2.5 rounded-full px-6 text-[14.5px] text-white transition-transform duration-500 ease-out hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(180deg, #2C2D31 0%, #141417 100%)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.08), 0 14px 30px -12px rgba(0,0,0,0.7)' }}
        >
          {open ? <X className="h-4 w-4 text-white/70" strokeWidth={2} /> : <Star size={15} color={gelOf(brand).accent} className="transition-transform duration-700 group-hover:rotate-90" />}
          {open ? 'Back to the build' : 'Open the app'}
        </button>
      </div>
    </div>
  );
};
