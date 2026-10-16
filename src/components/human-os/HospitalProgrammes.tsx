import React from 'react';
import { Link } from 'react-router-dom';
import { getSystem, hospitalProgrammes, systemPath } from '../../content/human-os';
import { focusRing } from './styles';

/** The five hospital programmes and the Human OS systems that power each one. */
export const HospitalProgrammes: React.FC<{ as?: 'h3' | 'h4' }> = ({ as: Heading = 'h3' }) => (
  <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {hospitalProgrammes.map((programme, i) => (
      <li key={programme.name} className="flex flex-col gap-3 rounded-[10px] border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6">
        <span className="font-mono text-xs font-bold tracking-widest text-hos-yellow">{String(i + 1).padStart(2, '0')}</span>
        <Heading className="font-display font-extrabold text-lg text-white leading-snug">{programme.name}</Heading>
        <p className="text-sm text-white/60 leading-relaxed">{programme.what}</p>
        <div className="mt-auto pt-2">
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/55 mb-2">Powered by</div>
          <ul className="flex flex-wrap gap-2">
            {programme.poweredBy.map((slug) => {
              const system = getSystem(slug)!;
              return (
                <li key={slug}>
                  <Link
                    to={systemPath(slug)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.04] text-xs font-semibold text-white hover:border-hos-yellow/60 transition-colors ${focusRing}`}
                  >
                    <span className="font-mono text-[10px] text-hos-yellow">{system.number}</span>
                    {system.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </li>
    ))}
  </ol>
);
