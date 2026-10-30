import React from 'react';
import { motion, useReducedMotion, type Transition } from 'motion/react';
import { cn } from '../../lib/cn';
import { EASE } from '../ui/motion';
import { ScaledFrame } from './ScaledFrame';

/* ─────────────────────────────────────────────────────────────────────────────
 * A tilted product stage, held still like a photograph. Builds are laid out on
 * one plane in canvas units, the plane is turned in 3D, and floating cards sit
 * above it at their own depth. The turn only changes when the scene asks for a
 * new one (opening the app's screens, say), never with the pointer or scroll.
 *
 * Nothing between the plane and its layers may use filter, opacity < 1,
 * overflow: hidden or backdrop-filter: each of those flattens 3D. Put those
 * inside a layer, never around one.
 * ──────────────────────────────────────────────────────────────────────────── */

type Deg = { x: number; y: number; z: number };

export interface SceneProps {
  /** Design canvas, scaled to the container width. */
  width: number;
  height: number;
  label: string;
  /** Turn of the plane, in degrees. A new value swings the plane round to it. */
  rotate: Deg;
  /** How a new turn plays out. */
  transition?: Transition;
  perspective?: number;
  /** Grow past design size when the container is wider. */
  upscale?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Scene: React.FC<SceneProps> = ({ width, height, label, rotate, transition, perspective = 2200, upscale, className, children }) => (
  <div className={cn('relative', className)}>
    <ScaledFrame width={width} height={height} label={label} upscale={upscale}>
      <div className="relative h-full w-full" style={{ perspective, perspectiveOrigin: '50% 40%' }}>
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ rotateX: rotate.x, rotateY: rotate.y, rotateZ: rotate.z }}
          transition={transition ?? { duration: 1.4, ease: EASE }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {children}
        </motion.div>
      </div>
    </ScaledFrame>
  </div>
);

/** One thing on the plane: placed in canvas units, lifted by `z`. `scale` draws a real-size build smaller.
 *  `away` sinks it back and fades its content, for when something else takes the stage. */
export const Layer: React.FC<{
  x: number;
  y: number;
  z?: number;
  w?: number;
  h?: number;
  scale?: number;
  /** Seconds for one slow rise and fall; leave out to keep it still. */
  drift?: number;
  away?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ x, y, z = 0, w, h, scale = 1, drift, away, className, style, children }) => {
  const reduce = useReducedMotion();
  const out = { duration: 0.9, ease: EASE };
  return (
    <motion.div
      className={cn('absolute origin-top-left', className)}
      style={{ left: x, top: y, width: w, height: h, scale, transformStyle: 'preserve-3d', ...style }}
      initial={false}
      animate={{ z: away ? z - 160 : z, y: drift && !reduce && !away ? [0, -6, 0] : 0 }}
      transition={{ z: out, y: drift && !away ? { duration: drift, ease: 'easeInOut', repeat: Infinity } : out }}
    >
      {/* Fade the content, not the layer: opacity on the layer would flatten it */}
      <motion.div className="h-full w-full" initial={false} animate={{ opacity: away ? 0 : 1 }} transition={{ duration: away ? 0.5 : 0.8, ease: EASE, delay: away ? 0 : 0.35 }}>
        {children}
      </motion.div>
    </motion.div>
  );
};

/** A soft shadow lying on the plane under a lifted layer. `away` fades it with its layer. */
export const PlaneShadow: React.FC<{ x: number; y: number; w: number; h: number; strength?: number; away?: boolean }> = ({ x, y, w, h, strength = 0.55, away }) => (
  <div
    aria-hidden="true"
    className="absolute rounded-[40px] transition-opacity duration-500 ease-out"
    style={{ left: x, top: y, width: w, height: h, background: `radial-gradient(closest-side, rgba(0,0,0,${strength}), transparent)`, transform: 'translateZ(-1px)', opacity: away ? 0 : 1 }}
  />
);
