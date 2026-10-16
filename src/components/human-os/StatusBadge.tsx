import React from 'react';
import { ModuleStatus, statusDefinitions } from '../../content/human-os';

const styles: Record<ModuleStatus, string> = {
  live: '',
  next: 'bg-white/[0.04] text-white/55 border border-white/[0.08]',
  vision: 'bg-white/[0.03] text-white/55 border border-dashed border-white/40',
};

/**
 * Tags modules that are not live yet (Next, Vision), always with the status word.
 * Live modules carry no tag: the owner wants anything untagged to read as available today.
 */
export const StatusBadge: React.FC<{ status: ModuleStatus; className?: string }> = ({ status, className = '' }) => {
  if (status === 'live') return null;
  const label = statusDefinitions.find((d) => d.status === status)!.label;
  return (
    <span
      className={`inline-flex items-center shrink-0 px-2 py-0.5 rounded-[4px] font-mono text-[10px] font-bold uppercase tracking-wider ${styles[status]} ${className}`}
    >
      {label}
    </span>
  );
};
