import React, { useEffect, useRef, useState } from 'react';

/* Small motion kit for the homepage. Keyframes live in index.css; anything inside
 * an element with the `hos-anim` class stops animating under prefers-reduced-motion. */

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** True once the element has scrolled into view (stays true). */
export const useInView = <T extends Element>(threshold = 0.2) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, inView]);
  return { ref, inView };
};

/** Fades and lifts its children into place when scrolled into view. */
export const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className={`reveal ${inView ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

/** Counts from 0 to `to` once visible. Shows the final value immediately under reduced motion. */
export const CountUp: React.FC<{ to: number; suffix?: string; duration?: number; className?: string }> = ({ to, suffix = '', duration = 1400, className = '' }) => {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {value.toLocaleString('en-US')}
        {suffix}
      </span>
      <span className="sr-only">
        {to.toLocaleString('en-US')}
        {suffix}
      </span>
    </span>
  );
};

/** Pulsing dot that signals a live system. Decorative. */
export const LiveDot: React.FC<{ color?: string; className?: string }> = ({ color = '#22C55E', className = '' }) => (
  <span aria-hidden="true" className={`hos-anim relative inline-flex w-2 h-2 ${className}`}>
    <span className="absolute inset-0 rounded-full" style={{ background: color, animation: 'hos-ping 1.8s cubic-bezier(0,0,0.2,1) infinite' }} />
    <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: color }} />
  </span>
);

const WAVE = [6, 14, 22, 10, 30, 18, 36, 24, 12, 28, 40, 20, 32, 14, 26, 8, 34, 18, 24, 10, 16, 6, 20, 12];

/** Voice waveform that keeps moving, like a call in progress. Decorative. */
export const Waveform: React.FC<{ bars?: number; color?: string; height?: number; className?: string }> = ({ bars = 24, color = '#F5D97B', height = 40, className = '' }) => (
  <span aria-hidden="true" className={`hos-anim flex items-center gap-[3px] ${className}`} style={{ height }}>
    {WAVE.slice(0, bars).map((h, i) => (
      <span
        key={i}
        className="flex-1 rounded-full origin-center"
        style={{ height: Math.min(h, height), background: color, animation: `hos-wave ${0.9 + (i % 5) * 0.15}s ease-in-out ${i * 0.05}s infinite` }}
      />
    ))}
  </span>
);
