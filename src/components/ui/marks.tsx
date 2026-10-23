import React from 'react';
import { cn } from '../../lib/cn';

/** Pointy-top hexagon corners around (cx, cy). */
export const hexPoints = (cx: number, cy: number, r: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
  });

const pointsAttr = (cx: number, cy: number, r: number) => hexPoints(cx, cy, r).map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');

/** The Hive mark: a rounded hexagon cell with a core. */
export const HiveMark: React.FC<{ className?: string; title?: string }> = ({ className, title }) => (
  <svg viewBox="0 0 32 32" className={cn('w-6 h-6', className)} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
    <polygon points={pointsAttr(16, 16, 12.2)} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <polygon points={pointsAttr(16, 16, 4.2)} fill="currentColor" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
  </svg>
);

/** A Bee: a small filled cell. Used in product views and lists. */
export const BeeGlyph: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className={cn('w-4 h-4', className)}>
    <polygon points={pointsAttr(10, 10, 7.4)} fill="currentColor" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    <circle cx="10" cy="10" r="2.1" fill="#0B0A08" />
  </svg>
);

/** Nostavia wordmark. The source PNG is black; on dark it is inverted to bone. */
export const Wordmark: React.FC<{ className?: string; tone?: 'light' | 'dark' }> = ({ className, tone = 'light' }) => (
  <img
    src="/logo.png"
    alt="Nostavia"
    width={5253}
    height={1381}
    decoding="async"
    className={cn('h-[22px] w-auto select-none', tone === 'light' ? 'invert brightness-[0.95] sepia-[0.15]' : '', className)}
  />
);
