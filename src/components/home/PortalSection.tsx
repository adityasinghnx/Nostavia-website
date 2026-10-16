import React, { useEffect, useState } from 'react';
import { LayoutGrid, FileText, RefreshCw, BarChart3, Settings } from 'lucide-react';
import { findModule } from '../../content/human-os';
import { Container, SectionHeading } from './shared';
import { CountUp, LiveDot, Reveal, useInView } from './motion';

/* Partner Portal mock. Module names and statuses come from human-os.ts; the chart and
 * counters are sample data and are labelled as such inside the mock. */

const toggles = ['Smart Reports', 'Re-Test Recall Engine', 'AI Health Companion', 'Biological Age'];

/** Switches on one module after another once the portal scrolls into view. */
const useSequence = (count: number, start: boolean, stepMs = 650) => {
  const [on, setOn] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setOn(count);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOn(i);
      if (i >= count) window.clearInterval(id);
    }, stepMs);
    return () => window.clearInterval(id);
  }, [start, count, stepMs]);
  return on;
};

const Toggle: React.FC<{ on: boolean }> = ({ on }) => (
  <span aria-hidden="true" className={`relative inline-flex w-9 h-5 rounded-full transition-colors duration-500 ${on ? 'bg-hos-navy' : 'bg-hos-hairline'}`}>
    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-500 ${on ? 'left-[18px]' : 'left-0.5'}`} />
  </span>
);

const AREA = 'M0 110 C 30 100, 50 90, 80 92 S 130 70, 160 66 S 210 58, 240 44 S 290 36, 320 22 L 320 130 L 0 130 Z';
const LINE = 'M0 110 C 30 100, 50 90, 80 92 S 130 70, 160 66 S 210 58, 240 44 S 290 36, 320 22';

export const PortalSection: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const on = useSequence(toggles.length, inView);

  return (
    <section aria-labelledby="home-portal-heading" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <Reveal className="lg:col-span-4 space-y-6">
          {/* TODO(copy): section heading and intro */}
          <SectionHeading
            id="home-portal-heading"
            eyebrow="Partner Portal"
            title="Switch a product on. It's live on the next API call."
            intro="Every module can be tried in a sandbox with fictional data first. Improvements ship server-side, with no app update for you."
          />
        </Reveal>

        <Reveal delay={150} className="lg:col-span-8">
          <div ref={ref} aria-hidden="true" className="hos-anim rounded-[18px] bg-hos-navy p-2 shadow-[0_40px_90px_-40px_rgba(18,26,49,0.6)]">
            {/* window chrome */}
            <div className="flex items-center gap-1.5 px-3 py-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="ml-3 flex-1 max-w-xs rounded-md bg-white/10 px-3 py-1 text-[10px] text-slate-300">portal.nostaviahealth.com</span>
              <span className="ml-auto text-[10px] text-slate-400">Sample data</span>
            </div>

            <div className="grid grid-cols-12 rounded-[12px] bg-hos-mist overflow-hidden min-h-[400px]">
              {/* sidebar */}
              <div className="hidden sm:flex col-span-3 flex-col gap-1 bg-white border-r border-hos-hairline p-3">
                <div className="flex items-center gap-2 px-2 py-2 mb-2">
                  <span className="w-7 h-7 rounded-lg bg-[#0F766E] text-white text-[10px] font-bold flex items-center justify-center">YL</span>
                  <span className="text-xs font-bold text-hos-black">Your Lab</span>
                </div>
                {[
                  [LayoutGrid, 'Modules', true],
                  [FileText, 'Reports', false],
                  [RefreshCw, 'Recall', false],
                  [BarChart3, 'Analytics', false],
                  [Settings, 'Settings', false],
                ].map(([Icon, label, active]) => {
                  const I = Icon as React.FC<{ className?: string }>;
                  return (
                    <div key={label as string} className={`flex items-center gap-2 rounded-lg px-2 py-2 text-[11px] font-semibold ${active ? 'bg-hos-navy text-white' : 'text-hos-grey'}`}>
                      <I className="w-3.5 h-3.5" />
                      {label as string}
                    </div>
                  );
                })}
              </div>

              {/* main */}
              <div className="col-span-12 sm:col-span-9 p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-hos-black">Modules</div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    <LiveDot />
                    All systems running
                  </span>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {toggles.map((name, i) => {
                    const mod = findModule(name)!;
                    const isOn = i < on;
                    return (
                      <li key={name} className={`flex items-center justify-between gap-3 rounded-xl bg-white border px-3 py-2.5 transition-colors duration-500 ${isOn ? 'border-hos-navy/30' : 'border-hos-hairline'}`}>
                        <span className="min-w-0">
                          <span className="block text-[12px] font-bold text-hos-black truncate">{name}</span>
                          <span className="block text-[10px] text-hos-grey">{mod.system.name}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <Toggle on={isOn} />
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* area chart */}
                  <div className="md:col-span-2 rounded-xl bg-white border border-hos-hairline p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-hos-black">Reports delivered</span>
                      <span className="text-[10px] text-hos-grey">Last 30 days</span>
                    </div>
                    <svg viewBox="0 0 320 130" className="mt-2 w-full h-32">
                      <defs>
                        <linearGradient id="portal-area" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#F5D97B" stopOpacity="0.55" />
                          <stop offset="100%" stopColor="#F5D97B" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {[30, 60, 90].map((y) => (
                        <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="#E6E3DA" strokeDasharray="3 4" />
                      ))}
                      <path d={AREA} fill="url(#portal-area)" style={inView ? { animation: 'hos-fade-up 1s ease 0.6s both' } : { opacity: 0 }} />
                      <path
                        d={LINE}
                        fill="none"
                        stroke="#121A31"
                        strokeWidth="2.5"
                        strokeDasharray="400"
                        style={inView ? { animation: 'hos-draw 1.8s ease 0.3s both' } : { strokeDashoffset: 400 }}
                      />
                      <circle cx="320" cy="22" r="4" fill="#F5D97B" stroke="#121A31" strokeWidth="2" style={inView ? { animation: 'hos-fade-up 0.4s ease 2s both' } : { opacity: 0 }} />
                    </svg>
                  </div>

                  {/* KPI tiles */}
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                    <div className="rounded-xl bg-white border border-hos-hairline p-3">
                      <div className="text-[10px] text-hos-grey">Patients recalled</div>
                      <div className="text-2xl font-display font-semibold text-hos-black">
                        <CountUp to={312} />
                      </div>
                      <div className="mt-2 flex items-end gap-1 h-6">
                        {[30, 45, 38, 60, 52, 75, 90].map((h, i) => (
                          <span key={i} className="flex-1 rounded-sm bg-hos-navy origin-bottom" style={{ height: `${h}%`, animation: inView ? `hos-rise 0.7s ease ${0.3 + i * 0.06}s both` : undefined, transform: inView ? undefined : 'scaleY(0)' }} />
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl bg-hos-navy text-white p-3">
                      <div className="text-[10px] text-slate-300">Calls answered by the agent</div>
                      <div className="text-2xl font-display font-semibold">
                        <CountUp to={1284} />
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <span className="block h-full w-[92%] bg-hos-yellow origin-left" style={{ animation: inView ? 'hos-grow 1.4s cubic-bezier(0.2,0.7,0.2,1) 0.4s both' : undefined, transform: inView ? undefined : 'scaleX(0)' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
