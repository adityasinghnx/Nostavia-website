import React from 'react';
import { HumanOsRing, RingId, getRing, numberWord, systemsInRing } from '../../content/human-os';
import { SystemCard } from './SystemCard';

const RingGlyph: React.FC<{ tone: 'light' | 'dark' }> = ({ tone }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="none">
    <circle cx="12" cy="12" r="10" stroke={tone === 'light' ? '#8A6511' : '#F5D97B'} strokeWidth="1.5" />
    <circle cx="12" cy="12" r="5" fill="#F5D97B" />
  </svg>
);

const RingPanel: React.FC<{ ring: HumanOsRing; compact: boolean }> = ({ ring, compact }) => {
  const dark = ring.id === 'team';
  const ringSystems = systemsInRing(ring.id);
  return (
    <div
      className={`rounded-[16px] border p-4 sm:p-6 lg:p-8 ${
        dark ? 'bg-ink-800 border-white/10' : 'bg-white/[0.04] border-hos-yellow'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-6 mb-4 sm:mb-6">
        <div className="flex items-center gap-3">
          <RingGlyph tone={dark ? 'dark' : 'light'} />
          <div>
            <h3 className={`font-display font-extrabold text-lg sm:text-xl ${dark ? 'text-white' : 'text-white'}`}>{ring.name}</h3>
            <p className={`text-sm font-semibold ${dark ? 'text-[#F5D97B]' : 'text-hos-yellow'}`}>{ring.audience}</p>
          </div>
        </div>
        {!compact && (
          <p className={`text-sm leading-relaxed max-w-xl ${dark ? 'text-slate-300' : 'text-white/60'}`}>{ring.summary}</p>
        )}
      </div>
      <div className={`grid grid-cols-1 gap-3 sm:gap-4 ${ring.id === 'person' ? 'sm:grid-cols-2' : 'md:grid-cols-3'}`}>
        {ringSystems.map((system) => (
          <SystemCard key={system.slug} system={system} compact={compact} />
        ))}
      </div>
    </div>
  );
};

/**
 * Human OS two-ring visual: the Person ring sits above the Team ring.
 * Pure HTML/CSS; stacks to one column on mobile.
 */
export const RingVisual: React.FC<{ compact?: boolean; id?: string }> = ({ compact = false, id }) => {
  const order: RingId[] = ['person', 'team'];
  const [person, team] = order.map(getRing);
  const label = `Human OS rings: the ${person.name}, ${numberWord(systemsInRing('person').length).toLowerCase()} systems ${person.audience.toLowerCase()}, above the ${team.name}, ${numberWord(systemsInRing('team').length).toLowerCase()} systems ${team.audience.toLowerCase()}.`;

  return (
    <div id={id} role="group" aria-label={label} className="flex flex-col">
      <RingPanel ring={person} compact={compact} />
      <div aria-hidden="true" className="flex flex-col items-center py-1">
        <span className="w-px h-4 bg-hos-yellow" />
        {/* TODO(copy): connector label between the rings */}
        <span className="px-3 py-1 rounded-full bg-hos-yellow text-white font-mono text-[10px] font-bold uppercase tracking-widest">
          One integration
        </span>
        <span className="w-px h-4 bg-hos-yellow" />
      </div>
      <RingPanel ring={team} compact={compact} />
    </div>
  );
};
