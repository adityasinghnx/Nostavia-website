import React, { useEffect, useState } from 'react';

interface ReferenceBandProps {
  valuePosition?: number;
  valueLabel?: string;
  sublabel?: string;
  isAnimatedHero?: boolean;
  className?: string;
  outlierLowWidth?: number;
  optimalWidth?: number;
  outlierHighWidth?: number;
}

export const ReferenceBand: React.FC<ReferenceBandProps> = ({
  valuePosition = 45,
  valueLabel = "74.2 mg/dL",
  sublabel,
  isAnimatedHero = false,
  className = '',
  outlierLowWidth = 25,
  optimalWidth = 50,
  outlierHighWidth = 25,
}) => {
  const [animatedPos, setAnimatedPos] = useState(isAnimatedHero ? 35 : valuePosition);
  const [currentMonth, setCurrentMonth] = useState('Jan — Annual Panel (Optimal)');

  useEffect(() => {
    if (!isAnimatedHero) {
      setAnimatedPos(valuePosition);
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setAnimatedPos(82);
      setCurrentMonth('Dec — Outlier Drift (365-day gap)');
      return;
    }

    const months = [
      { name: 'Jan — Annual Panel', pos: 38, status: 'Optimal' },
      { name: 'Mar — Spring Drift', pos: 48, status: 'Optimal' },
      { name: 'Jun — Mid-year Decline', pos: 62, status: 'Borderline' },
      { name: 'Sep — Biomarker Outlier', pos: 76, status: 'Outlier' },
      { name: 'Dec — Pre-Panel Outlier', pos: 84, status: 'Outlier (Unmonitored)' }
    ];

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % months.length;
      setAnimatedPos(months[index].pos);
      setCurrentMonth(`${months[index].name} (${months[index].status})`);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnimatedHero, valuePosition]);

  return (
    <div className={`w-full font-mono select-none ${className}`}>
      {/* Label above marker */}
      <div className="relative h-7 w-full text-xs">
        <div
          className="absolute -translate-x-1/2 transition-all duration-700 ease-out flex flex-col items-center"
          style={{ left: `${animatedPos}%` }}
        >
          <span className="bg-[#0F172A] text-white px-2.5 py-0.5 rounded-[2px] text-[11px] font-mono font-bold border border-[#1E293B] shadow-sm whitespace-nowrap">
            {isAnimatedHero ? currentMonth : valueLabel}
          </span>
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-[#0F172A]" />
        </div>
      </div>

      {/* SVG Reference Band Bar */}
      <div className="relative w-full h-3 rounded-sm overflow-hidden bg-[#F1F5F9] border border-[#E2E8F0] flex items-center">
        {/* Outlier Low Zone */}
        <div
          className="h-full bg-[#FEF3C7] border-r border-[#E2E8F0] flex items-center justify-center text-[8px] text-[#D97706] uppercase tracking-widest font-mono font-medium"
          style={{ width: `${outlierLowWidth}%` }}
        >
          <span className="hidden sm:inline">Low</span>
        </div>

        {/* Optimal Zone */}
        <div
          className="h-full bg-[#D1FAE5] border-r border-[#E2E8F0] flex items-center justify-center text-[9px] text-[#059669] uppercase tracking-widest font-mono font-semibold"
          style={{ width: `${optimalWidth}%` }}
        >
          <span>OPTIMAL RANGE</span>
        </div>

        {/* Outlier High Zone */}
        <div
          className="h-full bg-[#FEF3C7] flex items-center justify-center text-[8px] text-[#D97706] uppercase tracking-widest font-mono font-medium"
          style={{ width: `${outlierHighWidth}%` }}
        >
          <span className="hidden sm:inline">High</span>
        </div>

        {/* Marker vertical indicator */}
        <div
          className="absolute top-0 bottom-0 w-[3px] bg-[#2563EB] shadow-[0_0_8px_rgba(37,99,235,0.4)] transition-all duration-700 ease-out z-10 -translate-x-1/2"
          style={{ left: `${animatedPos}%` }}
        />
      </div>

      {sublabel && (
        <div className="flex justify-between items-center text-[10px] text-[#64748B] mt-1.5 font-mono">
          <span>Outlier Low</span>
          <span className="text-[#0F172A] font-medium">{sublabel}</span>
          <span>Outlier High</span>
        </div>
      )}
    </div>
  );
};
