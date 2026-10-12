import React from 'react';
import { ArrowUpRight, Boxes, FileCheck2, Info, KeyRound, Lock, Network, ScrollText, Stethoscope } from 'lucide-react';
import { TrustIcon, TrustItem, trustGroup, trustGroups } from '../../content/trust.config';

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:ring-offset-2';

const icons: Record<TrustIcon, React.FC<{ className?: string }>> = {
  consent: FileCheck2,
  abdm: Network,
  encryption: Lock,
  isolation: Boxes,
  audit: ScrollText,
  keys: KeyRound,
  clinical: Stethoscope,
  decision: Info,
};

/**
 * Official logo when the file has been supplied, otherwise a plain text tile in
 * the site's typography. Logos are never links.
 */
export const LogoTile: React.FC<{ item: TrustItem; lazy?: boolean }> = ({ item, lazy = true }) => (
  <div className="h-14 sm:h-16 min-w-[140px] px-5 inline-flex items-center justify-center rounded-[2px] border border-[#E2E8F0] bg-white">
    {item.logo ? (
      <img
        src={item.logo}
        alt={`${item.name} logo`}
        width={item.logoWidth}
        height={item.logoHeight}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        className="h-7 sm:h-8 w-auto object-contain"
      />
    ) : (
      <span className="font-display font-bold text-sm sm:text-base text-[#0F172A] tracking-tight whitespace-nowrap">{item.name}</span>
    )}
  </div>
);

const GroupLabel: React.FC<{ children: React.ReactNode; as?: 'h3' | 'div' }> = ({ children, as: Tag = 'h3' }) => (
  <Tag className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#475569]">{children}</Tag>
);

/** Group A. The provider caption always renders directly beneath it. */
export const InfrastructureGroup: React.FC<{ showHeading?: boolean; lazy?: boolean }> = ({ showHeading = true, lazy }) => (
  <div className="space-y-4">
    {showHeading && <GroupLabel>{trustGroups.infrastructure.heading}</GroupLabel>}
    <ul className="flex flex-wrap gap-3 sm:gap-4">
      {trustGroup('infrastructure').map((item) => (
        <li key={item.id} className="flex flex-col gap-2 max-w-[260px]">
          <LogoTile item={item} lazy={lazy} />
          {item.descriptor && <p className="text-xs text-[#475569] leading-relaxed">{item.descriptor}</p>}
        </li>
      ))}
    </ul>
    <p className="text-xs text-[#475569] leading-relaxed">{trustGroups.infrastructure.caption}</p>
  </div>
);

/** Group B. */
export const ProgramsGroup: React.FC<{ showHeading?: boolean; lazy?: boolean }> = ({ showHeading = true, lazy }) => (
  <div className="space-y-4">
    {showHeading && <GroupLabel>{trustGroups.programs.heading}</GroupLabel>}
    <ul className="flex flex-wrap gap-3 sm:gap-4">
      {trustGroup('programs').map((item) => (
        <li key={item.id}>
          <LogoTile item={item} lazy={lazy} />
        </li>
      ))}
    </ul>
  </div>
);

const storeLabel: Record<string, { pre: string; name: string }> = {
  'app-store': { pre: 'Download on the', name: 'App Store' },
  'google-play': { pre: 'Get it on', name: 'Google Play' },
};

/** Group C. Store badges link to the existing store listings. */
export const ProductionGroup: React.FC = () => {
  const items = trustGroup('production');
  if (!items.length) return null;
  return (
    <div className="space-y-4">
      <ul className="flex flex-wrap gap-3">
        {items.map((item) => {
          const label = storeLabel[item.id] ?? { pre: '', name: item.name };
          return (
            <li key={item.id}>
              {item.logo ? (
                /* Official badge artwork, shown unmodified. Google's PNG carries built-in clear space, so it is drawn taller to match Apple's 40px badge. */
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center h-12 rounded-[8px] ${focusRing}`}
                >
                  <img
                    src={item.logo}
                    alt={`${label.pre} ${label.name}`}
                    width={item.logoWidth}
                    height={item.logoHeight}
                    loading="lazy"
                    className={item.logoWidth && item.logoHeight && item.logoWidth / item.logoHeight < 3 ? 'h-[60px] w-auto -my-[6px]' : 'h-10 w-auto'}
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-3 px-4 h-12 rounded-[4px] bg-[#0F172A] hover:bg-black text-white transition-colors ${focusRing}`}
                >
                  <span className="flex flex-col leading-none text-left">
                    <span className="text-[10px] uppercase tracking-wider text-slate-300">{label.pre}</span>
                    <span className="text-sm font-display font-bold mt-0.5">{label.name}</span>
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                  <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5 text-slate-300" />
                </a>
              )}
            </li>
          );
        })}
      </ul>
      <p className="text-sm text-[#475569] leading-relaxed max-w-2xl">{trustGroups.production.line}</p>
    </div>
  );
};

/** Group D chip: icon, label and one-line descriptor. Deliberately a plain card, not a seal. */
export const PracticeChip: React.FC<{ item: TrustItem }> = ({ item }) => {
  const Icon = item.icon ? icons[item.icon] : Info;
  return (
    <div className="flex items-start gap-3 h-full p-4 sm:p-5 rounded-[2px] border border-[#E2E8F0] bg-[#F8FAFC]">
      <span className="w-9 h-9 shrink-0 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center">
        <Icon aria-hidden="true" className="w-4 h-4 text-[#0F172A]" />
      </span>
      <div className="space-y-1">
        <h3 className="font-display font-bold text-sm sm:text-base text-[#0F172A] leading-snug">{item.name}</h3>
        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">{item.descriptor}</p>
      </div>
    </div>
  );
};

export const PracticeChips: React.FC<{ items: TrustItem[]; columns?: 2 | 3 }> = ({ items, columns = 2 }) => (
  <ul className={`grid grid-cols-1 gap-3 sm:gap-4 ${columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
    {items.map((item) => (
      <li key={item.id}>
        <PracticeChip item={item} />
      </li>
    ))}
  </ul>
);
