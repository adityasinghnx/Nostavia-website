import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Clock, Zap, ShieldAlert, Layers, Cpu, Sparkles, HeartPulse } from 'lucide-react';

export const TeamOfAgentsSection: React.FC = () => {
  const modulesColumn1 = [
    {
      title: 'Digital Twin',
      type: 'INTELLIGENCE MODULE',
      icon: <Activity className="w-4 h-4 text-[#0F172A]" />,
      desc: "A high-fidelity model of the person's health that shows their future self under current habits.",
    },
    {
      title: 'Biological Age',
      type: 'INTELLIGENCE MODULE',
      icon: <Clock className="w-4 h-4 text-[#0F172A]" />,
      desc: 'How old the body actually is, measured against the number on the passport.',
    },
  ];

  const modulesColumn2 = [
    {
      title: 'Pace of Aging',
      type: 'INTELLIGENCE MODULE',
      icon: <Zap className="w-4 h-4 text-[#0F172A]" />,
      desc: "How fast it's wearing right now. 0.8× or 1.2× — a rate, not a static score.",
    },
    {
      title: 'Disease Risk',
      type: 'INTELLIGENCE MODULE',
      icon: <ShieldAlert className="w-4 h-4 text-[#0F172A]" />,
      desc: 'Metabolic, cardiovascular and age-related risk, generated from patterns rather than single markers.',
    },
  ];

  const modulesColumn3 = [
    {
      title: 'Health Domain Scoring',
      type: 'INTELLIGENCE MODULE',
      icon: <Layers className="w-4 h-4 text-[#0F172A]" />,
      desc: 'Cellular, metabolic, inflammatory and more — each scored and status-flagged independently.',
    },
    {
      title: 'Correlation Engine',
      type: 'INTELLIGENCE MODULE',
      icon: <Cpu className="w-4 h-4 text-[#0F172A]" />,
      desc: 'The engine underneath the others. Surfaces relationships across systems that no single marker reveals.',
    },
  ];

  // Duplicated arrays for continuous infinite marquee loop
  const col1Duplicated = [...modulesColumn1, ...modulesColumn1, ...modulesColumn1];
  const col2Duplicated = [...modulesColumn2, ...modulesColumn2, ...modulesColumn2];
  const col3Duplicated = [...modulesColumn3, ...modulesColumn3, ...modulesColumn3];

  return (
    <section className="w-full font-body text-[#0F172A] py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (45% Width) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
              INTELLIGENCE MODULES
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-[#0F172A] tracking-tight leading-[1.05]">
              The modules are the product. Everything else is plumbing.
            </h2>

            <p className="text-base sm:text-lg text-[#64748B] font-body leading-relaxed max-w-md">
              Every module runs on the same biological context, sharing context and learning from one source of truth.
            </p>

            <div className="pt-2">
              <Link
                to="/demo"
                className="inline-flex items-center justify-center bg-[#000000] hover:bg-[#1A1A1A] text-white font-display text-xs font-bold uppercase tracking-wider px-7 py-4 rounded-[2px] shadow-sm transition-all"
              >
                Book a demo
              </Link>
            </div>
          </div>

          {/* Right Column (55% Width): Real Background Image & Animated 3-Column Marquee */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-[2px] h-[400px] sm:h-[520px] border border-[#E2E8F0] group-marquee bg-slate-100">
            
            {/* Real Background Photograph with Muted Desaturation */}
            <img
              src="/platform-bg.jpg"
              alt="Artistic Health AI Glass Background"
              className="absolute inset-0 w-full h-full object-cover object-center select-none brightness-[0.92] saturate-[0.70]"
            />

            {/* Soft Muted Warm Champagne Banner-Matching Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFF7ED]/75 via-[#FFEDD5]/65 to-[#FED7AA]/50 pointer-events-none z-10" />
            <div className="absolute inset-0 bg-[#F8FAFC]/30 backdrop-blur-[1.5px] pointer-events-none z-10" />

            {/* Top & Bottom Soft Fading Masks */}
            <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-white/70 to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-white/70 to-transparent z-20 pointer-events-none" />

            {/* Responsive Columns Layout */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 h-full px-2 sm:px-3 py-0 overflow-hidden">
              
              {/* Column 1: Moves UP to DOWN */}
              <div className="overflow-hidden h-full">
                <div className="flex flex-col gap-3 animate-marquee-down">
                  {col1Duplicated.map((agent, idx) => (
                    <div
                      key={idx}
                      className="bg-white/95 backdrop-blur-sm p-5 rounded-[2px] border border-[#E2E8F0] shadow-sm space-y-2 hover:shadow-md transition-all shrink-0"
                    >
                      <div className="w-6 h-6 flex items-center justify-center text-[#0F172A]">
                        {agent.icon}
                      </div>

                      <div>
                        <div className="font-display font-extrabold text-[13px] text-[#0F172A] tracking-tight uppercase leading-tight">
                          {agent.title}
                        </div>
                        <div className="font-mono text-[9px] font-bold text-[#64748B] uppercase tracking-wider mt-0.5">
                          {agent.type}
                        </div>
                      </div>

                      <p className="text-[11px] text-[#64748B] leading-relaxed font-body pt-1">
                        {agent.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Moves DOWN to UP */}
              <div className="overflow-hidden h-full">
                <div className="flex flex-col gap-3 animate-marquee-up">
                  {col2Duplicated.map((agent, idx) => (
                    <div
                      key={idx}
                      className="bg-white/95 backdrop-blur-sm p-5 rounded-[2px] border border-[#E2E8F0] shadow-sm space-y-2 hover:shadow-md transition-all shrink-0"
                    >
                      <div className="w-6 h-6 flex items-center justify-center text-[#0F172A]">
                        {agent.icon}
                      </div>

                      <div>
                        <div className="font-display font-extrabold text-[13px] text-[#0F172A] tracking-tight uppercase leading-tight">
                          {agent.title}
                        </div>
                        <div className="font-mono text-[9px] font-bold text-[#64748B] uppercase tracking-wider mt-0.5">
                          {agent.type}
                        </div>
                      </div>

                      <p className="text-[11px] text-[#64748B] leading-relaxed font-body pt-1">
                        {agent.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Moves UP to DOWN */}
              <div className="overflow-hidden h-full">
                <div className="flex flex-col gap-3 animate-marquee-down">
                  {col3Duplicated.map((agent, idx) => (
                    <div
                      key={idx}
                      className="bg-white/95 backdrop-blur-sm p-5 rounded-[2px] border border-[#E2E8F0] shadow-sm space-y-2 hover:shadow-md transition-all shrink-0"
                    >
                      <div className="w-6 h-6 flex items-center justify-center text-[#0F172A]">
                        {agent.icon}
                      </div>

                      <div>
                        <div className="font-display font-extrabold text-[13px] text-[#0F172A] tracking-tight uppercase leading-tight">
                          {agent.title}
                        </div>
                        <div className="font-mono text-[9px] font-bold text-[#64748B] uppercase tracking-wider mt-0.5">
                          {agent.type}
                        </div>
                      </div>

                      <p className="text-[11px] text-[#64748B] leading-relaxed font-body pt-1">
                        {agent.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
