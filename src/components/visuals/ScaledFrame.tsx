import React, { useLayoutEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';

/** Draws its child at a fixed design size and scales it to the container width, like a live screenshot. `upscale` lets it grow past design size, for close-ups. */
export const ScaledFrame: React.FC<{ width: number; height: number; label: string; className?: string; upscale?: boolean; children: React.ReactNode }> = ({ width, height, label, className, upscale, children }) => {
  const outer = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);

  useLayoutEffect(() => {
    const el = outer.current!;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    setW(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  const scale = w ? (upscale ? w / width : Math.min(1, w / width)) : 1;

  return (
    <div ref={outer} className={cn('relative w-full', className)} style={{ height: w ? height * scale : undefined, aspectRatio: w ? undefined : `${width}/${height}` }}>
      <div role="img" aria-label={label} className="absolute left-0 top-0 origin-top-left" style={{ width, height, transform: `scale(${scale})`, visibility: w ? 'visible' : 'hidden' }}>
        <div aria-hidden="true" className="h-full w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

/** The "Sample data" tag that sits inside every product view, so it travels with screenshots. */
export const SampleTag: React.FC<{ className?: string; children?: React.ReactNode }> = ({ className, children = 'Sample data' }) => (
  <span className={cn('rounded-md border border-[#F2D27A]/40 bg-[#F2D27A]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#F2D27A]', className)}>{children}</span>
);
