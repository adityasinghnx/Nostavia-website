import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers, FileText, Watch, Bot, RefreshCw, ClipboardList, GitBranch, Users,
  Clock, ShieldAlert, Zap, Phone, Pill, Check, Sparkles, Apple, HeartPulse,
  Flame, Flower2, Brain, Moon, BarChart3, ChevronDown, ChevronUp, ArrowRight,
  Smartphone, Star, BadgePercent
} from 'lucide-react';

/* ── Premium module IDs (add $50/mo each on White-Label) ── */
const PREMIUM_MODULE_IDS = new Set([
  'cardio-intelligence',
  'mental-health',
  'medication-intel',
  'disease-risk',
  'performance-intel',
  'retest-recall',
  'womens-health',
]);

/* ── Default active modules for White-Label base stack ── */
const WL_DEFAULT_IDS = new Set([
  'smart-reports',
  'wearable-telemetry',
  'ai-companion',
  'personalisation-engine',
  'food-intelligence',
]);

/* ── Module definitions ── */
const modules = [
  { id: 'smart-reports', name: 'Smart Reports', desc: 'Lab PDF parsing & biomarker decoding', icon: FileText, defaultActive: true },
  { id: 'wearable-telemetry', name: 'Wearable Telemetry', desc: 'Apple Health & Google Health Connect', icon: Watch, defaultActive: true },
  { id: 'ai-companion', name: 'AI Health Companion', desc: 'Conversational health AI concierge', icon: Bot, defaultActive: true },
  { id: 'personalisation-engine', name: 'Personalisation Engine', desc: 'Adaptive habit & intervention tailoring', icon: Sparkles, defaultActive: true },
  { id: 'food-intelligence', name: 'Food Intelligence', desc: 'Glycemic bio-impact & meal scanning', icon: Apple, defaultActive: true },

  { id: 'retest-recall', name: 'Re-Test Recall Engine', desc: 'Automated 90-day re-test campaigns', icon: RefreshCw, defaultActive: false },
  { id: 'cardio-intelligence', name: 'Cardiovascular Intelligence', desc: 'HRV, arterial health & pulse wave analysis', icon: HeartPulse, defaultActive: false },
  { id: 'performance-intel', name: 'Performance Intelligence', desc: 'Athletic recovery, VO2 max & readiness', icon: Flame, defaultActive: false },

  { id: 'womens-health', name: "Women's Health Engine", desc: 'Cycle tracking, hormonal phases & fertility', icon: Flower2, defaultActive: false },
  { id: 'mental-health', name: 'Mental & Behavioral Health', desc: 'Stress resilience, mood logging & mindfulness', icon: Brain, defaultActive: false },
  { id: 'intake-briefs', name: 'Clinical Intake Briefs', desc: 'Pre-consultation chart synthesis', icon: ClipboardList, defaultActive: false },
  { id: 'adaptive-protocols', name: 'Adaptive Protocols', desc: 'Condition-aware care pathways', icon: GitBranch, defaultActive: false },

  { id: 'digital-twin', name: 'Trajectory Engine', desc: 'Future-self model under current habits', icon: Users, defaultActive: false },
  { id: 'biological-age', name: 'Biological Age', desc: 'Real body age vs chronological scoring', icon: Clock, defaultActive: false },
  { id: 'disease-risk', name: 'Disease Risk Engine', desc: 'Metabolic & cardiovascular risk scoring', icon: ShieldAlert, defaultActive: false },
  { id: 'correlation-engine', name: 'Correlation Engine', desc: 'Cross-domain marker relationships', icon: Zap, defaultActive: false },

  { id: 'voice-agent', name: 'AI Voice Agent', desc: 'Front desk call handling in local languages', icon: Phone, defaultActive: false },
  { id: 'medication-intel', name: 'Medication Intelligence', desc: 'Drug interactions & refill signals', icon: Pill, defaultActive: false },
  { id: 'sleep-recovery', name: 'Sleep & Recovery Engine', desc: 'Circadian tracking & sleep debt analysis', icon: Moon, defaultActive: false },
  { id: 'b2b-analytics', name: 'B2B Analytics Dashboard', desc: 'Cohort risk insights & executive reporting', icon: BarChart3, defaultActive: false },
];

/* ── Tier pricing table: one-time build + monthly plan ── */
type Currency = 'USD' | 'AED' | 'INR';

interface TierInfo {
  name: string;
  tagline: string;
  features: string[];
  setupPrices: Record<Currency, number>;
  basePrices: Record<Currency, number>;
  premiumSurcharge: Record<Currency, number>;
  currencyPrefix: Record<Currency, string>;
}

const tiers: Record<string, TierInfo> = {
  sdk: {
    name: 'SDK',
    tagline: 'Add health AI to the app you already have',
    features: [
      'Intelligence SDK + Wearables SDK',
      'Embeds into your iOS, Android or web app',
      'Integration engineer alongside your team',
      'Live in 3–6 weeks',
      'Monthly plan: hosting, AI, updates & support',
    ],
    setupPrices: { USD: 999, AED: 3670, INR: 83000 },
    basePrices: { USD: 399, AED: 1470, INR: 33000 },
    premiumSurcharge: { USD: 50, AED: 185, INR: 4170 },
    currencyPrefix: { USD: '$', AED: 'AED ', INR: '₹' },
  },
  whitelabel: {
    name: 'White Label',
    tagline: 'A ready-made product, launched under your brand',
    features: [
      'Branded iOS & Android app, reports or AI agent',
      'Your name, logo and colours on everything',
      'We launch it, host it and run it',
      'Live in 2–8 weeks',
      'Monthly plan: hosting, AI, updates & support',
    ],
    setupPrices: { USD: 1500, AED: 5500, INR: 125000 },
    basePrices: { USD: 399, AED: 1470, INR: 33000 },
    premiumSurcharge: { USD: 50, AED: 185, INR: 4170 },
    currencyPrefix: { USD: '$', AED: 'AED ', INR: '₹' },
  },
};

/* ── Price formatting helper ── */
const formatPrice = (amount: number, currency: Currency, prefix: string): string => {
  if (currency === 'INR') {
    // Indian number formatting
    return prefix + amount.toLocaleString('en-IN');
  }
  return prefix + amount.toLocaleString('en-US');
};

/* ── Component ── */
export const StackPricingCalculatorSection: React.FC = () => {
  const initialActive = useMemo(() => new Set(WL_DEFAULT_IDS), []);

  const [activeModules, setActiveModules] = useState<Set<string>>(initialActive);
  const [showAll, setShowAll] = useState(false);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [whitelabelOn, setWhitelabelOn] = useState(true);

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
    setWhitelabelOn(true);
  };

  const handleWhitelabelToggle = () => {
    const next = !whitelabelOn;
    setWhitelabelOn(next);
    if (next) {
      // When turning White-Label on, ensure base modules are selected
      const merged = new Set(activeModules);
      WL_DEFAULT_IDS.forEach(id => merged.add(id));
      setActiveModules(merged);
    }
  };

  /* ── Derived state ── */
  const count = activeModules.size;

  const tierKey: string = whitelabelOn ? 'whitelabel' : 'sdk';

  const currentTier = tiers[tierKey];

  // Count premium modules active (each adds to the monthly plan)
  const activePremiumCount = [...activeModules].filter(id => PREMIUM_MODULE_IDS.has(id)).length;

  // Calculate total price
  const basePrice = currentTier.basePrices[currency];
  const surchargePerModule = currentTier.premiumSurcharge[currency];
  const totalSurcharge = surchargePerModule * activePremiumCount;
  const totalPrice = basePrice + totalSurcharge;
  const setupPrice = currentTier.setupPrices[currency];
  const prefix = currentTier.currencyPrefix[currency];

  /* On desktop 3 cols → 12 cards for 4 rows */
  const DESKTOP_VISIBLE = 12;
  const visibleModules = showAll ? modules : modules.slice(0, DESKTOP_VISIBLE);

  return (
    <section className="w-full font-body text-[#0F172A] pt-12 pb-20 lg:pb-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">

        {/* ── Header ── */}
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#64748B]">
            BUILD & PRICE YOUR STACK
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] tracking-tight mt-3 leading-tight">
            Build your stack. See your price.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#475569] font-body leading-relaxed max-w-2xl mt-3">
            Activate modules, choose SDK or White Label — your estimate updates in real time:
            a one-time build fee plus a monthly plan. Ship it under your brand. Add more as you grow.
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
                    {activePremiumCount > 0 && (
                      <span className="text-[#64748B] font-normal ml-1">
                        · {activePremiumCount} premium
                      </span>
                    )}
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
                const isPremium = PREMIUM_MODULE_IDS.has(mod.id);
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
                    {isPremium && !isActive && (
                      <div className="absolute top-3 right-3">
                        <span className="text-[8px] font-mono font-bold uppercase tracking-wider bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-[2px]">
                          +{formatPrice(surchargePerModule, currency, prefix)}/mo
                        </span>
                      </div>
                    )}
                    {isPremium && isActive && (
                      <div className="absolute top-3 left-3">
                        <span className="text-[8px] font-mono font-bold uppercase tracking-wider bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-[2px]">
                          +{formatPrice(surchargePerModule, currency, prefix)}
                        </span>
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

              {/* ── How pricing works ── */}
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-[4px] space-y-1.5">
                <div className="flex items-center gap-2">
                  <BadgePercent className="w-4 h-4 text-amber-600" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-700">
                    HOW PRICING WORKS
                  </span>
                </div>
                <p className="text-xs text-amber-800 font-body leading-relaxed">
                  A <span className="font-bold">one-time build fee</span> plus a <span className="font-bold">monthly plan</span>. White Label from $1,500, SDK from $999, Custom Build from $7,500 — you get a fixed quote after a free call.
                </p>
              </div>

              {/* ── Pricing Card ── */}
              <div className="bg-[#0F172A] text-white rounded-[4px] border border-[#1E293B] shadow-xl overflow-hidden">

                {/* Tier header */}
                <div className="p-6 pb-0 space-y-1">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {whitelabelOn ? 'YOUR WHITE LABEL ESTIMATE' : 'YOUR SDK ESTIMATE'}
                  </div>
                  <div className="font-display font-extrabold text-xl text-white transition-all duration-300">
                    {currentTier.name}
                  </div>
                  <p className="text-xs text-slate-400 font-body leading-relaxed">
                    {currentTier.tagline}
                  </p>
                </div>

                {/* Price display */}
                <div className="px-6 pt-5 pb-4">
                  <div className="font-display font-extrabold text-4xl sm:text-5xl text-white transition-all duration-300">
                    {formatPrice(setupPrice, currency, prefix)}
                    <span className="text-sm font-mono font-normal text-slate-400 ml-1">one-time</span>
                  </div>
                  <div className="font-display font-extrabold text-xl text-white mt-1">
                    + {formatPrice(totalPrice, currency, prefix)}
                    <span className="text-sm font-mono font-normal text-slate-400 ml-1">/ mo</span>
                  </div>

                  {/* Monthly breakdown when premium modules are active */}
                  {activePremiumCount > 0 && (
                    <div className="mt-2 space-y-0.5">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>Monthly plan</span>
                        <span>{formatPrice(basePrice, currency, prefix)}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-amber-400">
                        <span>{activePremiumCount} premium module{activePremiumCount > 1 ? 's' : ''}</span>
                        <span>+{formatPrice(totalSurcharge, currency, prefix)}</span>
                      </div>
                    </div>
                  )}

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
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span className="text-xs text-slate-300 font-body leading-relaxed">
                      Premium intelligence modules at {formatPrice(surchargePerModule, currency, prefix)}/mo each
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-6 border-t border-slate-700" />

                {/* White-Label Toggle */}
                <div className="p-6 space-y-4">
                  <div
                    className="flex items-center justify-between cursor-pointer group"
                    onClick={handleWhitelabelToggle}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-[2px] bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 group-hover:text-white group-hover:bg-slate-700 transition-all">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-display font-bold text-white">
                          White Label
                        </div>
                        <div className="text-xs text-slate-400 font-body">
                          Ready-made product, your brand
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

                  {/* Tier upgrade nudge (only when White-Label is off) */}
                  {!whitelabelOn && (
                    <div className="p-3 bg-slate-800/60 rounded-[2px] border border-slate-700">
                      <p className="text-[10px] text-slate-400 font-body leading-relaxed">
                        <span className="text-amber-400 font-bold">Tip:</span> Want more than an SDK? With a
                        <span className="text-white font-bold"> Custom Build</span> we design and build the whole product for you, from scratch.
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
                    {whitelabelOn ? 'Get a White Label quote' : 'Get an SDK quote'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* ── Enterprise link ── */}
              <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-1.5">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#64748B]">
                  CUSTOM BUILD
                </div>
                <p className="text-xs text-[#64748B] font-body leading-relaxed">
                  Want it built exactly your way? Our founding engineers design and build your product from scratch, then run it for you.
                  From $7,500 one-time + $750/mo — a fraction of a typical agency build, because we start from our engine.
                </p>
                <Link
                  to="/solutions/engineering"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A] hover:text-[#64748B] transition-colors"
                >
                  Start a Custom Build →
                </Link>
              </div>

              {/* ── Hospital callout ── */}
              <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-1.5">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#64748B] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F172A]" />
                  HOSPITAL & HEALTH SYSTEMS
                </div>
                <p className="text-xs text-[#64748B] font-body leading-relaxed">
                  Five patient programmes from $5,000 one-time + $999/mo, starting with a free Leakage Audit.
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

      {/* ── Mobile Floating Calculation Bar (visible on small screens) ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0F172A]/95 backdrop-blur-md text-white border-t border-slate-800 p-3 px-4 shadow-2xl flex items-center justify-between gap-3">
        <div className="space-y-0.5 min-w-0">
          <div className="font-mono text-[10px] uppercase font-bold text-slate-400 truncate">
            {count} Modules · {currentTier.name}
          </div>
          <div className="font-display font-extrabold text-lg text-white leading-none">
            {formatPrice(setupPrice, currency, prefix)}
            <span className="text-[10px] font-mono font-normal text-slate-400 ml-1">+ {formatPrice(totalPrice, currency, prefix)}/mo</span>
          </div>
        </div>

        <Link
          to="/demo"
          className="bg-white text-[#0F172A] font-display text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-[2px] shrink-0 flex items-center gap-1 hover:bg-slate-100 transition-colors"
        >
          Get quote
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
};
