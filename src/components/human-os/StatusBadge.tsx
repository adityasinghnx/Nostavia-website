import React from 'react';
import { ModuleStatus, statusDefinitions } from '../../content/human-os';

const styles: Record<ModuleStatus, string> = {
  live: 'bg-hos-cream text-hos-amber border border-hos-yellow',
  next: 'bg-hos-card text-hos-grey border border-hos-hairline',
  vision: 'bg-white text-hos-grey border border-dashed border-[#78716C]',
};

/** Always renders the status word; colour is never the only signal. */
export const StatusBadge: React.FC<{ status: ModuleStatus; className?: string }> = ({ status, className = '' }) => {
  const label = statusDefinitions.find((d) => d.status === status)!.label;
  return (
    <span
      className={`inline-flex items-center shrink-0 px-2 py-0.5 rounded-[4px] font-mono text-[10px] font-bold uppercase tracking-wider ${styles[status]} ${className}`}
    >
      {label}
    </span>
  );
};
