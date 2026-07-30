import React from 'react';

export type StatusType = 'Live' | 'In pilot' | 'In development';

interface StatusPillProps {
  status: StatusType;
  className?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({ status, className = '' }) => {
  let colorClass = '';
  let dotClass = '';

  switch (status) {
    case 'Live':
      colorClass = 'border-[#059669]/30 text-[#059669] bg-[#ECFDF5]';
      dotClass = 'bg-[#059669] animate-pulse';
      break;
    case 'In pilot':
      colorClass = 'border-[#D97706]/30 text-[#D97706] bg-[#FFFBEB]';
      dotClass = 'bg-[#D97706]';
      break;
    case 'In development':
      colorClass = 'border-[#64748B]/30 text-[#475569] bg-[#F1F5F9]';
      dotClass = 'bg-[#64748B]';
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] border text-[10px] font-mono font-semibold uppercase tracking-wider ${colorClass} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      {status}
    </span>
  );
};
