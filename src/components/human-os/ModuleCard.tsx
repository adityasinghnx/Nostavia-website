import React from 'react';
import { HumanOsModule } from '../../content/human-os';
import { StatusBadge } from './StatusBadge';

export const ModuleCard: React.FC<{ module: HumanOsModule }> = ({ module }) => (
  <article className="flex flex-col gap-3 h-full rounded-[10px] border border-hos-hairline bg-white p-5 sm:p-6">
    <div className="flex items-start justify-between gap-3">
      <h3 className="font-display font-bold text-lg text-hos-black leading-snug">{module.name}</h3>
      <StatusBadge status={module.status} className="mt-0.5" />
    </div>
    <p className="text-sm text-[#475569] leading-relaxed">{module.description}</p>
  </article>
);
