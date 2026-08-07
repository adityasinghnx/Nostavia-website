import React, { useState } from 'react';
import { 
  Layers, FileText, Watch, Bot, RefreshCw, ClipboardList, GitBranch, Users, 
  Clock, ShieldAlert, Zap, Phone, Pill, Check, Sparkles, Apple, HeartPulse, 
  Flame, Flower2, Brain, Moon, BarChart3, ChevronDown, ChevronUp 
} from 'lucide-react';

const modules = [
  { id: 'smart-reports', name: 'Smart Reports', desc: 'Lab PDF parsing & biomarker decoding', icon: FileText, defaultActive: true },
  { id: 'wearable-telemetry', name: 'Wearable Telemetry', desc: 'Apple, Oura, WHOOP, Garmin fusion', icon: Watch, defaultActive: true },
  { id: 'ai-companion', name: 'AI Health Companion', desc: 'Conversational health AI concierge', icon: Bot, defaultActive: true },
  { id: 'retest-recall', name: 'Re-Test Recall Engine', desc: 'Automated 90-day re-test campaigns', icon: RefreshCw, defaultActive: true },
  
  { id: 'personalisation-engine', name: 'Personalisation Engine', desc: 'Adaptive habit & intervention tailoring', icon: Sparkles, defaultActive: false },
  { id: 'food-intelligence', name: 'Food Intelligence', desc: 'Glycemic bio-impact & meal scanning', icon: Apple, defaultActive: false },
  { id: 'cardio-intelligence', name: 'Cardiovascular Intelligence', desc: 'HRV, arterial health & pulse wave analysis', icon: HeartPulse, defaultActive: false },
  { id: 'performance-intel', name: 'Performance Intelligence', desc: 'Athletic recovery, VO2 max & readiness', icon: Flame, defaultActive: false },

  { id: 'womens-health', name: "Women's Health Engine", desc: 'Cycle tracking, hormonal phases & fertility', icon: Flower2, defaultActive: false },
  { id: 'mental-health', name: 'Mental & Behavioral Health', desc: 'Stress resilience, mood logging & mindfulness', icon: Brain, defaultActive: false },
  { id: 'intake-briefs', name: 'Clinical Intake Briefs', desc: 'Pre-consultation chart synthesis', icon: ClipboardList, defaultActive: false },
  { id: 'adaptive-protocols', name: 'Adaptive Protocols', desc: 'Condition-aware care pathways', icon: GitBranch, defaultActive: false },

  { id: 'digital-twin', name: 'Digital Twin', desc: 'Future-self model under current habits', icon: Users, defaultActive: false },
  { id: 'biological-age', name: 'Biological Age', desc: 'Real body age vs chronological scoring', icon: Clock, defaultActive: false },
  { id: 'disease-risk', name: 'Disease Risk Engine', desc: 'Metabolic & cardiovascular risk scoring', icon: ShieldAlert, defaultActive: false },
  { id: 'correlation-engine', name: 'Correlation Engine', desc: 'Cross-domain marker relationships', icon: Zap, defaultActive: false },

  { id: 'voice-agent', name: 'AI Voice Agent', desc: 'Front desk call handling in Hinglish', icon: Phone, defaultActive: false },
  { id: 'medication-intel', name: 'Medication Intelligence', desc: 'Drug interactions & refill signals', icon: Pill, defaultActive: false },
  { id: 'sleep-recovery', name: 'Sleep & Recovery Engine', desc: 'Circadian tracking & sleep debt analysis', icon: Moon, defaultActive: false },
  { id: 'b2b-analytics', name: 'B2B Analytics Dashboard', desc: 'Cohort risk insights & executive reporting', icon: BarChart3, defaultActive: false },
];

export const ModuleConfiguratorSection: React.FC = () => {
  const initialActive = new Set(modules.filter(m => m.defaultActive).map(m => m.id));
  const [activeModules, setActiveModules] = useState<Set<string>>(initialActive);
  const [showAll, setShowAll] = useState(false);

  const toggleModule = (id: string) => {
    const next = new Set(activeModules);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setActiveModules(next);
  };

  const activateAll = () => setActiveModules(new Set(modules.map(m => m.id)));
  const reset = () => setActiveModules(initialActive);

  const visibleModules = showAll ? modules : modules.slice(0, 12);

  return (
    <section className="w-full font-body text-[#0F172A] py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#64748B]">MODULAR BY DESIGN</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight mt-4">Build your Nostavia stack. Module by module.</h2>
          <p className="text-base sm:text-lg text-[#475569] font-body leading-relaxed max-w-2xl mt-4">
            Activate only what you need. Ship it under your brand. Add more as you grow — the intelligence underneath stays one.
          </p>
        </div>

        <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Layers className="w-5 h-5 text-[#0F172A]" />
            <div>
              <span className="font-mono font-bold text-xs uppercase tracking-widest text-[#64748B] block">YOUR NOSTAVIA STACK</span>
              <span className="font-display font-bold text-sm text-[#0F172A]">{activeModules.size} / {modules.length} modules active</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <button onClick={activateAll} className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] hover:text-[#0F172A] cursor-pointer transition-colors">Activate All</button>
            <button onClick={reset} className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] hover:text-[#0F172A] cursor-pointer transition-colors">Reset</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleModules.map(mod => {
            const isActive = activeModules.has(mod.id);
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                onClick={() => toggleModule(mod.id)}
                className={isActive 
                  ? "p-6 bg-white border-2 border-[#0F172A] rounded-[2px] shadow-sm cursor-pointer transition-all relative"
                  : "p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] cursor-pointer hover:border-[#CBD5E1] transition-all relative"}
              >
                {isActive && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#0F172A] text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                )}
                <div className={isActive 
                  ? "w-9 h-9 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center"
                  : "w-9 h-9 rounded-[2px] bg-[#0F172A]/10 text-[#0F172A] flex items-center justify-center"}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-sm text-[#0F172A] mt-2">{mod.name}</h3>
                <p className="text-xs text-[#64748B] font-body mt-0.5">{mod.desc}</p>
                
                {isActive ? (
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#0F172A] mt-3">IN YOUR STACK</div>
                ) : (
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] mt-3">TAP TO ACTIVATE</div>
                )}
              </div>
            );
          })}
        </div>

        {modules.length > 12 && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A] hover:text-[#64748B] transition-colors cursor-pointer"
            >
              <span>{showAll ? 'Show Less' : `View All ${modules.length} Modules`}</span>
              {showAll ? <ChevronUp className="w-4 h-4 text-[#0F172A]" /> : <ChevronDown className="w-4 h-4 text-[#0F172A]" />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
