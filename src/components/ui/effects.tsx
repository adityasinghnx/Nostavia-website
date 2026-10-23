import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { cn } from '../../lib/cn';
import { EASE } from './motion';
import { hexPoints } from './marks';

/* ── Magnetic pull towards the pointer. Fine pointers only. ── */

export const Magnetic: React.FC<{ children: React.ReactNode; strength?: number; className?: string }> = ({ children, strength = 0.28, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.6 });
  const [fine, setFine] = useState(false);

  useEffect(() => setFine(window.matchMedia('(pointer: fine)').matches), []);

  if (reduce || !fine) return <div className={cn('inline-flex', className)}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={cn('inline-flex', className)}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

/* ── Photos arrive out of focus and settle sharp ── */

export const BlurIn: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { filter: 'blur(18px)', opacity: 0.4, scale: 1.04 }}
      whileInView={{ filter: 'blur(0px)', opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.4, ease: EASE }}
    >
      {children}
    </motion.div>
  );
};

/* ── First-visit intro: the Hive mark draws itself, then the curtain lifts. ── */

const INTRO_KEY = 'nostavia-intro-seen';

const shouldPlayIntro = (() => {
  if (typeof window === 'undefined') return false;
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (window.location.pathname !== '/') return false;
    return !window.sessionStorage.getItem(INTRO_KEY);
  } catch {
    return false;
  }
})();

/** Seconds the hero should wait so its entrance plays after the intro. */
export const INTRO_DELAY = shouldPlayIntro ? 1.15 : 0;

const outer = hexPoints(50, 50, 38).map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
const inner = hexPoints(50, 50, 12).map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

export const Intro: React.FC = () => {
  const [show, setShow] = useState(shouldPlayIntro);

  useEffect(() => {
    if (!show) return;
    try {
      window.sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      // Storage can be unavailable; the intro then simply plays again next visit.
    }
    const t = window.setTimeout(() => setShow(false), 1150);
    return () => window.clearTimeout(t);
  }, [show]);

  if (!show) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[90] grid place-items-center bg-ink pointer-events-none"
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      animate={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ delay: 0.8, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.svg viewBox="0 0 100 100" className="w-16 h-16 text-honey" initial={{ opacity: 1 }} animate={{ opacity: 0, y: -12 }} transition={{ delay: 0.75, duration: 0.4 }}>
        <motion.polygon points={outer} fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.65, ease: EASE }} />
        <motion.polygon points={inner} fill="currentColor" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.45, duration: 0.35, ease: EASE }} style={{ transformOrigin: '50px 50px' }} />
      </motion.svg>
    </motion.div>
  );
};

/* ── Progressive blur rising from the bottom of a photo, so text laid over it stays readable.
 *    Blurred copies of the photo itself rather than backdrop-filter, so the blur moves, scales
 *    and appears in the same frame as the photo. Pass the photo's own classes to keep them aligned. ── */

const blurLayers = [
  { blur: 8, mask: 'linear-gradient(to top, #000 30%, transparent 65%)' },
  { blur: 22, mask: 'linear-gradient(to top, #000 10%, transparent 40%)' },
];

export const PhotoBlur: React.FC<{ src: string; className?: string }> = ({ src, className }) => (
  <>
    {blurLayers.map(({ blur, mask }) => (
      <div key={blur} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" style={{ maskImage: mask, WebkitMaskImage: mask }}>
        <img src={src} alt="" loading="lazy" decoding="async" className={cn('photo absolute inset-0 h-full w-full object-cover', className)} style={{ filter: `grayscale(1) sepia(0.22) contrast(1.06) brightness(0.82) blur(${blur}px)` }} />
      </div>
    ))}
  </>
);
