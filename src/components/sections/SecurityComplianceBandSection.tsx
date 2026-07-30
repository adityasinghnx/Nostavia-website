import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Globe, Server } from 'lucide-react';

export const SecurityComplianceBandSection: React.FC = () => {
  const points = [
    {
      title: 'Privacy at the edge',
      description: 'Identifiers stripped on-device before any cloud inference.',
      icon: <Lock className="w-4 h-4 text-[#0F172A]" />,
      tag: 'ARCHITECTURE',
    },
    {
      title: 'DPDP-aligned',
      description: 'Explicit consent, purpose limitation and data minimisation in the pipeline.',
      icon: <ShieldCheck className="w-4 h-4 text-[#0F172A]" />,
      tag: 'COMPLIANCE',
    },
    {
      title: 'Global-ready',
      description: 'In-region data handling aligned to US, European, Indian, and UAE health-data residency rules.',
      icon: <Globe className="w-4 h-4 text-[#0F172A]" />,
      tag: 'RESIDENCY',
    },
    {
      title: 'You own the data',
      description: 'Your customers, your relationship, your data. We operate the intelligence.',
      icon: <Server className="w-4 h-4 text-[#0F172A]" />,
      tag: 'SOVEREIGNTY',
    },
  ];

  return (
    <section className="w-full font-body text-[#0F172A] py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* Main 50%/50% Split Frame matching Reference Screenshot 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#E2E8F0] rounded-[2px] overflow-hidden shadow-none">
          
          {/* Left 50% Solid Dark Brand Color Block */}
          <div className="lg:col-span-6 bg-[#0F172A] text-white p-10 sm:p-14 lg:p-16 flex flex-col justify-between space-y-10">
            <div className="space-y-4 max-w-md">
              <div className="eyebrow text-cyan-400 font-bold text-xs uppercase tracking-widest font-mono">
                BUILT FOR REGULATED DATA
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[46px] text-white leading-[1.06] tracking-tight">
                Security & compliance architecture
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-body pt-2">
                Enterprise-grade privacy at the edge, DPDP compliance, and global health data residency engineered directly into the data pipeline.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <Link
                to="/security"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#0F172A] font-mono text-xs font-bold uppercase tracking-wider px-7 py-4 rounded-[2px] shadow-sm transition-all"
              >
                Security & compliance →
              </Link>
            </div>
          </div>

          {/* Right 50% Crisp 2x2 Grid with Explicit 1px Borders */}
          <div className="lg:col-span-6 bg-white grid grid-cols-1 sm:grid-cols-2">
            {points.map((p, idx) => {
              // Explicit 2x2 border rules for crisp horizontal & vertical divider lines
              const borderClasses = 
                idx === 0 ? 'border-b sm:border-r border-[#E2E8F0]' :
                idx === 1 ? 'border-b border-[#E2E8F0]' :
                idx === 2 ? 'border-b sm:border-b-0 sm:border-r border-[#E2E8F0]' :
                '';

              return (
                <div
                  key={idx}
                  className={`p-8 sm:p-10 flex flex-col justify-between space-y-4 bg-white hover:bg-slate-50/50 transition-colors ${borderClasses}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-[2px] bg-slate-100 border border-[#E2E8F0] flex items-center justify-center">
                        {p.icon}
                      </div>
                      <span className="font-mono text-[9px] font-bold text-[#64748B] tracking-wider uppercase">
                        {p.tag}
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-xl text-[#0F172A] tracking-tight">
                      {p.title}
                    </h3>

                    <p className="text-xs text-[#64748B] leading-relaxed font-body">
                      {p.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
