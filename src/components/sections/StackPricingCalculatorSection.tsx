import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers, FileText, Watch, Bot, RefreshCw, ClipboardList, GitBranch, Users,
  Clock, ShieldAlert, Zap, Phone, Pill, Check, Sparkles, Apple, HeartPulse,
  Flame, Flower2, Brain, Moon, BarChart3, ChevronDown, ChevronUp, ArrowRight,
  Smartphone
} from 'lucide-react';

/* ── Module definitions ── */
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

/* ── Tier pricing table ── */
type Currency = 'USD' | 'AED' | 'INR';

interface TierInfo {
  name: string;
  tagline: string;
  features: string[];
  prices: Record<Currency, string>;
  mau: string;
}

const tiers: Record<string, TierInfo> = {
  starter: {
    name: 'Starter SDK',
    tagline: 'Core infrastructure for up to 4 modules',
    features: [
      'Up to 5,000 MAU',
      'Core infrastructure',
      'Any four modules',
      'API documentation',
      '48-hour support SLAs',
    ],
    prices: { USD: '$299', AED: 'AED 1,100', INR: '₹24,990' },
    mau: '5,000 MAU',
  },
  growth: {
    name: 'Growth SDK',
    tagline: 'All modules unlocked with population analytics',
    features: [
      'Up to 50,000 MAU',
      'All modules unlocked',
      'Population analytics',
      'Custom co-branding',
      '4-hour support SLAs',
      'Dedicated integration engineer',
    ],
    prices: { USD: '$999', AED: 'AED 3,670', INR: '₹82,990' },
    mau: '50,000 MAU',
  },
  whitelabel: {
    name: 'White-Label Pro',
    tagline: 'Your fully branded iOS & Android health app',
    features: [
      'Unlimited MAU',
      'Fully branded iOS & Android app',
      'All modules unlocked',
      'Priority 2-hour support',
      '$1,000 setup fee waived on annual',
    ],
    prices: { USD: '$999', AED: 'AED 3,670', INR: '₹82,990' },
    mau: 'Unlimited MAU',
  },
};

/* ── Component ── */
export const StackPricingCalculatorSection: React.FC = () => {
  const initialActive = useMemo(
    () => new Set(modules.filter(m => m.defaultActive).map(m => m.id)),
    []
  );

  const [activeModules, setActiveModules] = useState<Set<string>>(initialActive);
  const [showAll, setShowAll] = useState(false);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [whitelabelOn, setWhitelabelOn] = useState(false);

  /* ── Handlers ── */
  const toggleModule = (id: string) => {
    const next = new Set(activeModules);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setActiveModules(next);
  };

  const activateAll = () => setActiveModules(new Set(modules.map(m => m.id)));
  const reset = () => {
    setActiveModules(new Set(initialActive));
    setWhitelabelOn(false);
  };

  /* ── Derived state ── */
  const count = activeModules.size;

  const tierKey: string = whitelabelOn
    ? 'whitelabel'
    : count > 4
      ? 'growth'
      : 'starter';

  const currentTier = tiers[tierKey];

  /* On desktop 3 cols → 9 cards for 3 rows */
  const DESKTOP_VISIBLE = 9;
  const visibleModules = showAll ? modules : modules.slice(0, DESKTOP_VISIBLE);

  return (
    <section className="w-full font-body text-[#0F172A] py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">

        {/* ── Header ── */}
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#64748B]">
            BUILD & PRICE YOUR STACK
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight mt-4">
            Build your stack. See your price.
          </h2>
          <p className="text-base sm:text-lg text-[#475569] font-body leading-relaxed max-w-2xl mt-4">
            Activate modules, toggle white-label — the pricing updates in real time.
            Ship it under your brand. Add more as you grow.
          </p>
        </div>

        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* ──── LEFT: Module Grid (8 cols) ──── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Counter Bar */}
            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <Layers className="w-5 h-5 text-[#0F172A]" />
                <div>
                  <span className="font-mono font-bold text-xs uppercase tracking-widest text-[#64748B] block">
                    YOUR NOSTAVIA STACK
                  </span>
                  <span className="font-display font-bold text-sm text-[#0F172A]">
                    {count} / {modules.length} modules active
                  </span>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={activateAll}
                  className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] hover:text-[#0F172A] cursor-pointer transition-colors"
                >
                  Activate All
                </button>
                <button
                  onClick={reset}
                  className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] hover:text-[#0F172A] cursor-pointer transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Module Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleModules.map(mod => {
                const isActive = activeModules.has(mod.id);
                const Icon = mod.icon;
                return (
                  <div
                    key={mod.id}
                    onClick={() => toggleModule(mod.id)}
                    className={
                      isActive
                        ? 'p-5 bg-white border-2 border-[#0F172A] rounded-[2px] shadow-sm cursor-pointer transition-all duration-200 relative'
                        : 'p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] cursor-pointer hover:border-[#CBD5E1] transition-all duration-200 relative'
                    }
                  >
                    {isActive && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#0F172A] text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                    <div
                      className={
                        isActive
                          ? 'w-9 h-9 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center'
                          : 'w-9 h-9 rounded-[2px] bg-[#0F172A]/10 text-[#0F172A] flex items-center justify-center'
                      }
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display font-bold text-sm text-[#0F172A] mt-2">{mod.name}</h3>
                    <p className="text-xs text-[#64748B] font-body mt-0.5">{mod.desc}</p>
                    <div
                      className={`font-mono text-[10px] font-bold uppercase tracking-widest mt-3 ${
                        isActive ? 'text-[#0F172A]' : 'text-[#94A3B8]'
                      }`}
                    >
                      {isActive ? 'IN YOUR STACK' : 'TAP TO ACTIVATE'}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Expand / Collapse Toggle */}
            {modules.length > DESKTOP_VISIBLE && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A] hover:text-[#64748B] transition-colors cursor-pointer"
                >
                  <span>{showAll ? 'Show Less' : `View All ${modules.length} Modules`}</span>
                  {showAll ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* ──── RIGHT: Sticky Pricing Summary (4 cols) ──── */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-5">

              {/* ── Pricing Card ── */}
              <div className="bg-[#0F172A] text-white rounded-[4px] border border-[#1E293B] shadow-xl overflow-hidden">

                {/* Tier header */}
                <div className="p-6 pb-0 space-y-1">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    RECOMMENDED TIER
                  </div>
                  <div
                    className="font-display font-extrabold text-xl text-white transition-all duration-300"
                    key={tierKey}
                  >
                    {currentTier.name}
                  </div>
                  <p className="text-xs text-slate-400 font-body leading-relaxed">
                    {currentTier.tagline}
                  </p>
                </div>

                {/* Price display */}
                <div className="px-6 pt-5 pb-4">
                  <div
                    className="font-display font-extrabold text-4xl sm:text-5xl text-white transition-all duration-300"
                    key={`${tierKey}-${currency}`}
                  >
                    {currentTier.prices[currency]}
                    <span className="text-sm font-mono font-normal text-slate-400 ml-1">/ mo</span>
                  </div>

                  {/* Currency switcher */}
                  <div className="flex items-center gap-1 mt-3">
                    {(['USD', 'AED', 'INR'] as Currency[]).map(c => (
                      <button
                        key={c}
                        onClick={() => setCurrency(c)}
                        className={`px-3 py-1.5 rounded-[2px] text-[10px] font-mono font-bold uppercase tracking-wider transition-all ${
                          currency === c
                            ? 'bg-white text-[#0F172A]'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-6 border-t border-slate-700" />

                {/* Tier features */}
                <div className="p-6 space-y-2.5">
                  {currentTier.features.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span className="text-xs text-slate-300 font-body leading-relaxed">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="mx-6 border-t border-slate-700" />

                {/* White-Label Toggle */}
                <div className="p-6 space-y-4">
                  <div
                    className="flex items-center justify-between cursor-pointer group"
                    onClick={() => setWhitelabelOn(!whitelabelOn)}
                  >
                    <div className="flex items-center gap-2.5">
                      <Smartphone className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                      <div>
                        <div className="text-xs font-display font-bold text-white">
                          White-Label App
                        </div>
                        <div className="text-[10px] text-slate-400 font-body">
                          Branded iOS & Android
                        </div>
                      </div>
                    </div>
                    {/* Toggle switch */}
                    <div
                      className={`w-10 h-[22px] rounded-full transition-all duration-300 flex items-center px-0.5 ${
                        whitelabelOn ? 'bg-amber-500' : 'bg-slate-700'
                      }`}
                    >
                      <div
                        className={`w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-transform duration-300 ${
                          whitelabelOn ? 'translate-x-[18px]' : 'translate-x-0'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Tier upgrade nudge */}
                  {count <= 4 && !whitelabelOn && (
                    <div className="p-3 bg-slate-800/60 rounded-[2px] border border-slate-700">
                      <p className="text-[10px] text-slate-400 font-body leading-relaxed">
                        <span className="text-amber-400 font-bold">Tip:</span> Activate a 5th module to unlock
                        <span className="text-white font-bold"> Growth SDK</span> — all 20 modules, population analytics, and a dedicated engineer.
                      </p>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <Link
                    to="/demo"
                    className="w-full py-3.5 bg-white text-[#0F172A] font-display text-xs font-bold uppercase tracking-wider text-center rounded-[2px] flex items-center justify-center gap-2 hover:bg-slate-100 transition-all"
                  >
                    Request a demo
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* ── Enterprise link ── */}
              <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-1.5">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#64748B]">
                  ENTERPRISE
                </div>
                <p className="text-xs text-[#64748B] font-body leading-relaxed">
                  Custom AI training on your data, on-site onboarding, and unlimited scale.
                </p>
                <Link
                  to="/demo"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A] hover:text-[#64748B] transition-colors"
                >
                  Contact Enterprise sales →
                </Link>
              </div>

              {/* ── Hospital callout ── */}
              <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-1.5">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#64748B] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F172A]" />
                  HOSPITAL & HEALTH SYSTEMS
                </div>
                <p className="text-xs text-[#64748B] font-body leading-relaxed">
                  Performance-linked partner pricing with the Leakage Audit and Attribution Engine.
                </p>
                <Link
                  to="/industries/hospitals#pricing"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A] hover:text-[#64748B] transition-colors"
                >
                  View Hospital pricing →
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
