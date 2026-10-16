import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HumanOsSystem, countLine, systemPath } from '../../content/human-os';
import { focusRing } from './styles';

interface SystemCardProps {
  system: HumanOsSystem;
  /** Heading level for the system name, to keep the page outline in order. */
  as?: 'h3' | 'h4';
  compact?: boolean;
}

export const SystemCard: React.FC<SystemCardProps> = ({ system, as: Heading = 'h4', compact = false }) => (
  <Link
    to={systemPath(system.slug)}
    aria-label={`${system.name}, system ${system.number}. ${system.promise} ${countLine(system)}.`}
    className={`group flex flex-col h-full rounded-[10px] border border-white/[0.08] bg-white/[0.03] transition-all hover:border-hos-yellow/60 hover:shadow-card ${
      compact ? 'p-4 sm:p-5' : 'p-5 sm:p-6'
    } ${focusRing}`}
  >
    <div className="flex items-center justify-between gap-3">
      <span className="font-mono text-xs font-bold tracking-widest text-hos-yellow">{system.number}</span>
      <span className="text-[11px] font-semibold text-white/55 whitespace-nowrap">{countLine(system)}</span>
    </div>
    <Heading className={`font-display font-extrabold text-white mt-2.5 ${compact ? 'text-lg' : 'text-xl'}`}>{system.name}</Heading>
    <p className="mt-1.5 text-sm text-white/60 leading-relaxed">{system.promise}</p>
    {!compact && (
      <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white">
        Explore {system.name}
        <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    )}
  </Link>
);
