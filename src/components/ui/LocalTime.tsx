import React, { useEffect, useState } from 'react';
import { REGIONS } from '../../content/site';
import { cn } from '../../lib/cn';

const formatters = REGIONS.map((r) => new Intl.DateTimeFormat('en-GB', { timeZone: r.tz, hour: '2-digit', minute: '2-digit', hour12: false }));
const now = () => formatters.map((f) => f.format(new Date()));

/** Live time in every region we serve. */
export const RegionClocks: React.FC<{ className?: string }> = ({ className }) => {
  const [times, setTimes] = useState(now);
  useEffect(() => {
    const t = window.setInterval(() => setTimes(now()), 15000);
    return () => window.clearInterval(t);
  }, []);
  return (
    <ul className={cn('grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-l border-fg/[0.08]', className)}>
      {REGIONS.map((r, i) => (
        <li key={r.name} className="border-b border-r border-fg/[0.08] px-5 py-5 flex flex-col gap-3">
          <span className="flex items-center gap-2 text-[14.5px] tracking-[-0.01em] text-fg/85">
            <span aria-hidden="true" className="h-[5px] w-[5px] rounded-full bg-accent/80" />
            {r.name}
          </span>
          <span className="font-mono text-[12.5px] text-fg/45 tabular-nums">
            {times[i]} <span className="text-fg/30">{r.zone}</span>
          </span>
        </li>
      ))}
    </ul>
  );
};
