/* ─────────────────────────────────────────────────────────────────────────────
 * Human OS: what we've built. Single source for categories, systems and modules.
 *
 * Two categories, named outside as "For your customers" and "For your care team".
 * The ids 'person' and 'team' are code only and must never be rendered.
 * Totals are deliberately not exported for display: they are unverified.
 * ──────────────────────────────────────────────────────────────────────────── */

export type CategoryId = 'person' | 'team';
export type ModuleStatus = 'live' | 'next' | 'vision';

export type SystemSlug =
  | 'health-decoder'
  | 'digital-twin'
  | 'whole-body-intelligence'
  | 'ai-concierge'
  | 'clinical-intelligence'
  | 'agent-workforce'
  | 'command-center';

export interface HumanOsCategory {
  id: CategoryId;
  name: string;
  short: string;
  summary: string;
}

export interface HumanOsModule {
  name: string;
  status: ModuleStatus;
  description: string;
}

export interface HumanOsSystem {
  number: string;
  slug: SystemSlug;
  name: string;
  category: CategoryId;
  promise: string;
  plain: string;
  description: string;
  bestFit: string;
  pairsWith: SystemSlug[];
  modules: HumanOsModule[];
}

export const HUMAN_OS_PATH = '/human-os';

export const statusLabel: Record<ModuleStatus, string> = {
  live: 'Live',
  next: 'In development',
  vision: 'Roadmap',
};

export const categories: HumanOsCategory[] = [
  {
    id: 'person',
    name: 'For your customers',
    short: 'Customers',
    summary:
      'Modules for the people you serve. They read the body, show where health is heading, go deep on each organ system and guide the person every day.',
  },
  {
    id: 'team',
    name: 'For your care team',
    short: 'Care team',
    summary:
      'Modules for doctors, clinicians, hospitals and the business side. They give clinicians time back, answer the front desk and show leadership the whole picture.',
  },
];

export const systems: HumanOsSystem[] = [
  {
    number: '01',
    slug: 'health-decoder',
    name: 'Health Decoder',
    category: 'person',
    promise: 'Reads everything the body produces.',
    plain: 'Labs, wearables, meals, face scans and DNA, decoded.',
    description: 'Turns raw health data into structured, interpreted signals that every other module builds on.',
    bestFit: 'Diagnostic labs, wellness platforms and apps',
    pairsWith: ['digital-twin', 'whole-body-intelligence', 'ai-concierge'],
    modules: [
      { name: 'Smart Reports', status: 'live', description: 'Parses any lab PDF, decodes 100+ biomarkers against locally calibrated ranges and returns a report under your brand with an optimal, in-range or outlier verdict for every marker.' },
      { name: 'Wearable Telemetry', status: 'live', description: 'Normalises wearable data into one schema and derives recovery, sleep and biometric summaries. Apple Health and Google Health Connect today.' },
      { name: 'Food Intelligence', status: 'live', description: 'Breaks a meal photo into items, predicts the glucose curve and bio-impact, then checks its own prediction against post-meal heart-rate data.' },
      { name: 'Contactless Vitals', status: 'next', description: 'Vital readings from a short face scan on a phone camera.' },
      { name: 'Genomic Intelligence', status: 'next', description: 'Decodes genetic panel results into inherited risk markers and nutrition, fitness and medication-response insights.' },
    ],
  },
  {
    number: '02',
    slug: 'digital-twin',
    name: 'Digital Twin',
    category: 'person',
    promise: 'The body, simulated. The future, visible.',
    plain: 'Biological age, risk and projections from hours to years ahead.',
    description: 'A living model of the person built from every decoded signal: where their health is heading, how fast they are ageing and what would change it.',
    bestFit: 'Longevity clinics, preventive programmes, insurers',
    pairsWith: ['health-decoder', 'whole-body-intelligence', 'ai-concierge'],
    modules: [
      { name: 'Trajectory Engine', status: 'live', description: 'Projects health under current habits across horizons from three hours to ten years ahead.' },
      { name: 'Biological Age', status: 'live', description: "The body's functional age from biomarkers, wearable signals and lifestyle inputs, compared with chronological age, with the factors driving the gap." },
      { name: 'Disease Risk Engine', status: 'live', description: 'Metabolic and cardiovascular risk scores from biomarkers and history, with the factors behind each score.' },
      { name: 'Pace of Aging', status: 'next', description: 'How fast the body is ageing right now, so a member sees whether their changes are slowing the clock.' },
      { name: 'Epigenetic Clocks', status: 'next', description: 'Biological age measured from DNA methylation, the molecular complement to Biological Age.' },
      { name: 'What-If Simulator', status: 'next', description: 'Change one lever (an hour more sleep, a lower LDL, a daily walk) and watch the trajectory and biological age respond.' },
    ],
  },
  {
    number: '03',
    slug: 'whole-body-intelligence',
    name: 'Whole-Body Intelligence',
    category: 'person',
    promise: 'Every organ system, connected.',
    plain: 'Deep engines for heart, metabolism, hormones, brain and gut.',
    description: 'Specialist engines for each organ system, tied together so a finding in one system is read in the light of the others.',
    bestFit: "Longevity and functional medicine clinics, premium lab panels, women's health",
    pairsWith: ['health-decoder', 'digital-twin', 'clinical-intelligence'],
    modules: [
      { name: 'Correlation Engine', status: 'live', description: 'Finds meaningful relationships across domains, such as sleep and glucose or HRV and stress, and surfaces only the clinically relevant ones.' },
      { name: 'Cardiovascular Intelligence', status: 'live', description: 'HRV, arterial health and pulse wave analysis for cardiovascular resilience and readiness.' },
      { name: "Women's Health Engine", status: 'live', description: 'Cycle tracking, hormonal phases and fertility, with nutrition, training and recovery guidance adapted to each phase.' },
      { name: 'Metabolic Intelligence', status: 'next', description: 'Continuous glucose patterns: variability, time in range, post-meal spikes and insulin resistance markers.' },
      { name: 'Hormone Intelligence', status: 'next', description: "Thyroid, adrenal, insulin and sex-hormone balance across the body's hormonal axes." },
      { name: 'Gut Microbiome Intelligence', status: 'next', description: 'Microbiome results decoded into diversity, key species and links to digestive, immune and metabolic health.' },
      { name: 'Brain Health Intelligence', status: 'next', description: 'Neurocognitive biomarkers such as homocysteine, omega-3 index and B-vitamin status, tracked for long-term brain health.' },
    ],
  },
  {
    number: '04',
    slug: 'ai-concierge',
    name: 'AI Concierge',
    category: 'person',
    promise: 'A health guide that never leaves their side.',
    plain: 'Daily guidance, protocols, sleep, performance and mind.',
    description: 'Explains results in plain language, turns insight into a personal plan, and keeps the person on it every day.',
    bestFit: 'Wellness platforms, clinics selling twelve-month programmes, corporate wellness',
    pairsWith: ['health-decoder', 'digital-twin', 'agent-workforce'],
    modules: [
      { name: 'AI Health Companion', status: 'live', description: 'Conversational health AI that remembers the member between sessions and answers questions about their own data, under your brand.' },
      { name: 'Personalisation Engine', status: 'live', description: 'Tailors habits and interventions to the individual and adapts them as the data changes.' },
      { name: 'Adaptive Protocols', status: 'live', description: 'Condition-aware care pathways, reviewed by our clinical bench, that adjust as the member progresses.' },
      { name: 'Sleep & Recovery Engine', status: 'live', description: 'Circadian tracking, sleep architecture and sleep debt, with recovery guidance.' },
      { name: 'Performance Intelligence', status: 'live', description: 'Athletic recovery, VO2 max and daily readiness.' },
      { name: 'Mental & Behavioral Health', status: 'live', description: 'Stress resilience, mood logging and mindfulness.' },
      { name: 'Habit Engine', status: 'next', description: 'Behaviour science that makes habits stick: streaks, timed nudges and adaptive notifications.' },
    ],
  },
  {
    number: '05',
    slug: 'clinical-intelligence',
    name: 'Clinical Intelligence',
    category: 'team',
    promise: 'Gives every clinician time back.',
    plain: 'Briefs, scribe, records, medication and safety screening.',
    description: 'Prepares the clinician before the visit, documents during it, keeps the record after it, and flags what needs a human.',
    bestFit: 'Hospitals, clinics, telehealth providers',
    pairsWith: ['agent-workforce', 'command-center', 'whole-body-intelligence'],
    modules: [
      { name: 'Clinical Intake Briefs', status: 'live', description: 'Reports and history parsed into a one-page pre-consultation brief with outliers flagged, so the clinician starts the visit already briefed.' },
      { name: 'Medication Intelligence', status: 'live', description: 'Drug interaction and refill signals for the member and the clinician. Dosing decisions are never made by the platform.' },
      { name: 'Red Flag Screening', status: 'next', description: 'Screens member messages for emergency language before any model responds, replaces the reply with emergency guidance and escalates to a human.' },
      { name: 'Ambient Scribe', status: 'next', description: 'Turns a consultation into a structured clinical note for the clinician to review and sign.' },
      { name: 'AI Health Record', status: 'next', description: 'An AI-native lifelong record that every module reads from and writes to.' },
      { name: 'Remote Monitoring', status: 'next', description: 'Tracks discharged and chronic-care patients through wearables and check-ins, and raises flags to the care team.' },
    ],
  },
  {
    number: '06',
    slug: 'agent-workforce',
    name: 'Agent Workforce',
    category: 'team',
    promise: 'A front desk that never clocks out.',
    plain: 'Voice, chat, recall, follow-ups, scheduling and refills.',
    description: 'Handles calls, messages and follow-through under your brand, with a person approving anything clinical.',
    bestFit: 'Hospitals, labs and any clinic with a front desk',
    pairsWith: ['clinical-intelligence', 'command-center', 'ai-concierge'],
    modules: [
      { name: 'AI Voice Agent', status: 'live', description: 'Answers every inbound call in local languages, rules out emergencies, names a relevant doctor and books the visit.' },
      { name: 'Re-Test Recall Engine', status: 'live', description: 'Finds who is due for a re-test in your own patient history and brings them back under your name on a 90-day cycle.' },
      { name: 'Chat Agent', status: 'next', description: 'The same front desk on WhatsApp and website chat.' },
      { name: 'Follow-Up Agent', status: 'next', description: 'Post-visit and post-discharge follow-ups, approved by a person.' },
      { name: 'Scheduling Agent', status: 'next', description: 'Books, moves and fills appointment slots across phone, WhatsApp and web.' },
      { name: 'Refill Agent', status: 'next', description: 'Refill reminders and pharmacy handoff, approved by a person.' },
    ],
  },
  {
    number: '07',
    slug: 'command-center',
    name: 'Command Center',
    category: 'team',
    promise: 'Every patient and every revenue line, in one view.',
    plain: 'Cohort risk and reporting, with attribution and leakage next.',
    description: 'Population risk, revenue leakage, attributed revenue and patients drifting off their plan, in one operating view.',
    bestFit: 'Hospital leadership, lab chains, corporates and insurers',
    pairsWith: ['clinical-intelligence', 'agent-workforce', 'digital-twin'],
    modules: [
      { name: 'B2B Analytics Dashboard', status: 'live', description: 'Cohort risk insights and executive reporting across your whole population.' },
      { name: 'Attribution Engine', status: 'next', description: 'Traces revenue generated through Nostavia to the transaction, so your finance team sees exactly what it brought in.' },
      { name: 'Leakage Intelligence', status: 'next', description: 'Shows, in currency, where preventive, diagnostic and follow-up revenue is leaving the facility.' },
      { name: 'Drift Detection', status: 'next', description: 'Lists patients slipping off their care plan so the team can step in before they are lost.' },
      { name: 'Underwriting Intelligence', status: 'vision', description: 'Consented, de-identified health risk signals for insurers.' },
      { name: 'Trial Matching', status: 'vision', description: 'Matches consented patients to clinical trials.' },
    ],
  },
];

/* ── Helpers ── */

export const systemPath = (slug: SystemSlug): string => `${HUMAN_OS_PATH}/${slug}`;

export const getSystem = (slug: string): HumanOsSystem | undefined => systems.find((s) => s.slug === slug);

export const getCategory = (id: CategoryId): HumanOsCategory => categories.find((c) => c.id === id)!;

export const systemsIn = (id: CategoryId): HumanOsSystem[] => systems.filter((s) => s.category === id);

export const allModules = () => systems.flatMap((system) => system.modules.map((m) => ({ ...m, system })));

export const findModule = (name: string) => allModules().find((m) => m.name === name);

/** Previous and next system, wrapping. */
export const adjacentSystems = (slug: SystemSlug) => {
  const i = systems.findIndex((s) => s.slug === slug);
  return {
    prev: systems[(i - 1 + systems.length) % systems.length],
    next: systems[(i + 1) % systems.length],
  };
};

/* Dev-time integrity check: catches typos in cross-references. */
if (import.meta.env?.DEV) {
  const slugs = new Set(systems.map((s) => s.slug));
  const problems: string[] = [];
  systems.forEach((s) => s.pairsWith.forEach((p) => !slugs.has(p) && problems.push(`${s.slug} pairsWith unknown ${p}`)));
  if (problems.length) console.error('[human-os] content problems:', problems);
}
