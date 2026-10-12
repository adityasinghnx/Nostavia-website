import React from 'react';
import { Link } from 'react-router-dom';
import { getSystem, hospitalProgrammes, systemPath } from '../../content/human-os';
import { focusRing } from './styles';

/** The five hospital programmes and the Human OS systems that power each one. */
export const HospitalProgrammes: React.FC<{ as?: 'h3' | 'h4' }> = ({ as: Heading = 'h3' }) => (
  <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {hospitalProgrammes.map((programme, i) => (
      <li key={programme.name} className="flex flex-col gap-3 rounded-[10px] border border-hos-hairline bg-white p-5 sm:p-6">
        <span className="font-mono text-xs font-bold tracking-widest text-hos-amber">{String(i + 1).padStart(2, '0')}</span>
        <Heading className="font-display font-extrabold text-lg text-hos-black leading-snug">{programme.name}</Heading>
        <p className="text-sm text-[#475569] leading-relaxed">{programme.what}</p>
        <div className="mt-auto pt-2">
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-hos-grey mb-2">Powered by</div>
          <ul className="flex flex-wrap gap-2">
            {programme.poweredBy.map((slug) => {
              const system = getSystem(slug)!;
              return (
                <li key={slug}>
                  <Link
                    to={systemPath(slug)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-hos-hairline bg-hos-card text-xs font-semibold text-hos-black hover:border-hos-amber transition-colors ${focusRing}`}
                  >
                    <span className="font-mono text-[10px] text-hos-amber">{system.number}</span>
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
