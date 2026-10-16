import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  BuyerId,
  BuyerMapping,
  HUMAN_OS_PATH,
  buyers,
  findModule,
  getBuyer,
  getSystem,
  numberWord,
  systemPath,
  totalSystems,
} from '../../content/human-os';
import { StatusBadge } from './StatusBadge';
import { SystemCard } from './SystemCard';
import { Disclaimer } from './Disclaimer';
import { eyebrow, focusRing } from './styles';

const FirstModules: React.FC<{ buyer: BuyerMapping }> = ({ buyer }) => (
  <ul className="flex flex-col gap-2">
    {buyer.firstModules.map((name) => {
      const mod = findModule(name)!;
      return (
        <li key={name} className="flex items-center justify-between gap-3 text-sm">
          <span className="text-white font-semibold">
            {name}
            <span className="font-normal text-white/55"> · {mod.system.name}</span>
          </span>
          <StatusBadge status={mod.status} />
        </li>
      );
    })}
  </ul>
);

/** Overview "Who it's for": every buyer, their starting systems and first modules. */
export const BuyerGrid: React.FC = () => (
  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {buyers.map((buyer) => (
      <li key={buyer.id} className="flex flex-col gap-4 rounded-[10px] border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6">
        <h3 className="font-display font-extrabold text-lg text-white">{buyer.buyer}</h3>
        <div>
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/55 mb-2">Systems to start with</div>
          <ul className="flex flex-wrap gap-2">
            {buyer.systems.map((slug) => {
              const system = getSystem(slug)!;
              return (
                <li key={slug}>
                  <Link
                    to={systemPath(slug)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-hos-yellow bg-white/[0.04] text-xs font-semibold text-white hover:border-hos-yellow/60 transition-colors ${focusRing}`}
                  >
                    <span className="font-mono text-[10px] text-hos-yellow">{system.number}</span>
                    {system.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-auto">
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/55 mb-2">First modules switched on</div>
          <FirstModules buyer={buyer} />
        </div>
      </li>
    ))}
  </ul>
);

/** "Systems to start with" block for industry and solutions pages. */
export const SystemsToStartWith: React.FC<{ buyerId: BuyerId; className?: string; inset?: boolean }> = ({ buyerId, className = '', inset = true }) => {
  const buyer = getBuyer(buyerId);
  return (
    <section aria-labelledby={`start-with-${buyerId}`} className={`${inset ? 'max-w-[1280px] mx-auto px-4 sm:px-6' : ''} w-full ${className}`}>
      <div className="rounded-[16px] border border-white/[0.08] bg-white/[0.04] p-5 sm:p-8 lg:p-10 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className={eyebrow}>Human OS</div>
            <h2 id={`start-with-${buyerId}`} className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Systems to start with
            </h2>
            {/* TODO(copy): intro line for the "Systems to start with" block */}
            <p className="text-base text-white/60 leading-relaxed">
              {buyer.buyer} usually start with these {numberWord(buyer.systems.length).toLowerCase()} systems, then switch on more modules as the programme grows.
            </p>
          </div>
          <Link
            to={HUMAN_OS_PATH}
            className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-hos-yellow ${focusRing}`}
          >
            See all {numberWord(totalSystems).toLowerCase()} Human OS systems
            <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className={`grid grid-cols-1 gap-4 ${buyer.systems.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {buyer.systems.map((slug) => (
            <SystemCard key={slug} system={getSystem(slug)!} as="h3" />
          ))}
        </div>

        <div className="rounded-[10px] border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6 max-w-2xl">
          <h3 className="font-display font-bold text-base text-white mb-3">First modules switched on</h3>
          <FirstModules buyer={buyer} />
        </div>

        <Disclaimer />
      </div>
    </section>
  );
};
