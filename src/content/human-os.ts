/* ─────────────────────────────────────────────────────────────────────────────
 * Human OS: single source of truth.
 * Every page and component reads rings, systems, modules, statuses, steps,
 * buyer mapping and hospital programmes from here. Never hard-code a count:
 * use the helpers at the bottom of this file.
 * ──────────────────────────────────────────────────────────────────────────── */

export type RingId = 'person' | 'team';
export type ModuleStatus = 'live' | 'next' | 'vision';

export type SystemSlug =
  | 'health-decoder'
  | 'digital-twin'
  | 'whole-body-intelligence'
  | 'ai-concierge'
  | 'clinical-intelligence'
  | 'agent-workforce'
  | 'command-center';

export interface HumanOsRing {
  id: RingId;
  name: string;
  audience: string;
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
  ring: RingId;
  promise: string;
  plain: string;
  description: string;
  bestFit: string;
  pairsWith: SystemSlug[];
  modules: HumanOsModule[];
}

export const SITE_ORIGIN = 'https://nostaviahealth.com';
export const HUMAN_OS_PATH = '/human-os';

export const DISCLAIMER =
  'All platform outputs are decision support. They are not diagnostic, are not a medical device, and are not a substitute for professional medical judgement.';

export const statusDefinitions: { status: ModuleStatus; label: string; definition: string }[] = [
  { status: 'live', label: 'Live', definition: 'Shipped and switchable from the Partner Portal today.' },
  { status: 'next', label: 'Next', definition: 'In development or planned. No dates committed.' },
  { status: 'vision', label: 'Vision', definition: 'Longer-term roadmap.' },
];

export const rings: HumanOsRing[] = [
  {
    id: 'person',
    name: 'Person ring',
    audience: 'For the people you serve',
    summary:
      'Four systems that live with the member or patient. They read the body, predict where it is heading, go deep on every organ system and guide the person every day.',
  },
  {
    id: 'team',
    name: 'Team ring',
    audience: 'For the team that serves them',
    summary:
      'Three systems that run the organisation serving the person. They give clinicians time back, put AI agents on the front desk and show leadership every patient and every revenue line.',
  },
];

export const systems: HumanOsSystem[] = [
  {
    number: '01',
    slug: 'health-decoder',
    name: 'Health Decoder',
    ring: 'person',
    promise: 'Reads everything the body produces.',
    plain: 'Labs, wearables, meals, face scans and DNA, decoded.',
    description: 'Turns raw health data into structured, interpreted signals that every other system builds on.',
    bestFit: 'Diagnostic labs, wellness platforms and apps',
    pairsWith: ['digital-twin', 'whole-body-intelligence', 'ai-concierge'],
    modules: [
      { name: 'Smart Reports', status: 'live', description: 'Parses any lab PDF, decodes 100+ biomarkers against locally calibrated ranges and returns a branded report with an optimal, in-range or outlier verdict for every marker.' },
      { name: 'Wearable Telemetry', status: 'live', description: 'Normalises wearable data into one schema and derives recovery, sleep and biometric summaries. Apple Health and Google Health Connect today, more device feeds in development.' },
      { name: 'Food Intelligence', status: 'live', description: 'Breaks a meal photo into items, predicts the glucose curve and bio-impact, then checks its own prediction against post-meal heart-rate data.' },
      { name: 'Contactless Vitals', status: 'next', description: 'Twelve vital readings from a short face scan on a phone camera. Already running in a hospital deployment; launching as a standalone module and SDK.' },
      { name: 'Genomic Intelligence', status: 'next', description: 'Decodes genetic panel results into inherited risk markers and nutrition, fitness and medication-response insights.' },
    ],
  },
  {
    number: '02',
    slug: 'digital-twin',
    name: 'Digital Twin',
    ring: 'person',
    promise: 'Your body, simulated. Your future, visible.',
    plain: 'Biological age, risk and projections from 3 hours to 10 years.',
    description: 'A living model of the person built from every decoded signal: where their health is heading, how fast they are ageing and what would change it.',
    bestFit: 'Longevity clinics, preventive programmes, insurers',
    pairsWith: ['health-decoder', 'whole-body-intelligence', 'ai-concierge'],
    modules: [
      { name: 'Trajectory Engine', status: 'live', description: 'Projects health under current habits across horizons from three hours to ten years ahead.' },
      { name: 'Biological Age', status: 'live', description: "The body's functional age from biomarkers, wearable signals and lifestyle inputs, compared with chronological age, with the factors driving the gap." },
      { name: 'Disease Risk Engine', status: 'live', description: 'Metabolic and cardiovascular risk scores from biomarkers and history, with the factors behind each score.' },
      { name: 'Pace of Aging', status: 'next', description: 'How fast the body is ageing right now, so a member sees whether their changes are slowing the clock.' },
      { name: 'Epigenetic Clocks', status: 'next', description: 'Biological age measured from DNA methylation, the molecular complement to Biological Age.' },
      { name: 'What-If Simulator', status: 'next', description: "Change one lever (an hour more sleep, a lower LDL, a daily walk) and watch the twin's trajectory and biological age respond." },
    ],
  },
  {
    number: '03',
    slug: 'whole-body-intelligence',
    name: 'Whole-Body Intelligence',
    ring: 'person',
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
    ring: 'person',
    promise: 'A health guide that never leaves their side.',
    plain: 'Daily guidance, protocols, sleep, performance and mind.',
    description: 'Explains results in plain language, turns insight into a personal plan, and keeps the person on it every day.',
    bestFit: 'Wellness platforms, clinics selling twelve-month programmes, corporate wellness',
    pairsWith: ['health-decoder', 'digital-twin', 'agent-workforce'],
    modules: [
      { name: 'AI Health Companion', status: 'live', description: "Conversational health AI that remembers the member between sessions and answers questions about their own data, under the partner's brand." },
      { name: 'Personalisation Engine', status: 'live', description: 'Tailors habits and interventions to the individual and adapts them as the data changes.' },
      { name: 'Adaptive Protocols', status: 'live', description: 'Condition-aware care pathways, reviewed by the clinical bench, that adjust as the member progresses.' },
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
    ring: 'team',
    promise: 'Gives every clinician time back.',
    plain: 'Briefs, scribe, records, medication and safety screening.',
    description: 'Prepares the clinician before the visit, documents during it, keeps the record after it, and flags what needs a human.',
    bestFit: 'Hospitals, clinics, telehealth providers',
    pairsWith: ['agent-workforce', 'command-center', 'whole-body-intelligence'],
    modules: [
      { name: 'Clinical Intake Briefs', status: 'live', description: 'Reports and history parsed into a one-page pre-consultation brief with outliers flagged, replacing 10 to 15 minutes of chart review per new patient.' },
      { name: 'Medication Intelligence', status: 'live', description: 'Drug interaction and refill signals for the member and the clinician. Dosing decisions are never made by the platform.' },
      { name: 'Red Flag Screening', status: 'next', description: 'Screens member messages for emergency language before any model responds, replaces the reply with emergency guidance and escalates to a human.' },
      { name: 'Ambient Scribe', status: 'next', description: 'Turns a consultation into a structured clinical note for the clinician to review and sign.' },
      { name: 'AI Health Record', status: 'next', description: 'An AI-native lifelong record, FHIR and ABDM-linked, that every module reads from and writes to.' },
      { name: 'Remote Monitoring', status: 'next', description: 'Tracks discharged and chronic-care patients through wearables and check-ins, and raises escalation flags to the care team.' },
    ],
  },
  {
    number: '06',
    slug: 'agent-workforce',
    name: 'Agent Workforce',
    ring: 'team',
    promise: 'AI staff that never clock out.',
    plain: 'Voice, chat, recall, follow-ups, scheduling and refills.',
    description: "AI agents handle calls, messages and follow-through under the partner's brand, with a human approving anything clinical.",
    bestFit: 'Hospitals, labs and any clinic with a front desk',
    pairsWith: ['clinical-intelligence', 'command-center', 'ai-concierge'],
    modules: [
      { name: 'AI Voice Agent', status: 'live', description: 'Answers every inbound call in local languages, rules out emergencies, names a relevant doctor and books the visit.' },
      { name: 'Re-Test Recall Engine', status: 'live', description: "Finds who is due for a re-test in the partner's own patient history and brings them back under the partner's name on a 90-day cycle." },
      { name: 'Chat Agent', status: 'next', description: 'The same front-desk agent on WhatsApp and website chat.' },
      { name: 'Follow-Up Agent', status: 'next', description: 'Post-visit and post-discharge follow-ups, human-approved.' },
      { name: 'Scheduling Agent', status: 'next', description: 'Books, moves and fills appointment slots across phone, WhatsApp and web.' },
      { name: 'Refill Agent', status: 'next', description: 'Refill reminders and pharmacy handoff, human-approved.' },
    ],
  },
  {
    number: '07',
    slug: 'command-center',
    name: 'Command Center',
    ring: 'team',
    promise: 'Every patient and every revenue line, in one view.',
    plain: 'Cohort risk, attribution and leakage, with insurers and trials next.',
    description: 'Population risk, revenue leakage, platform-attributed revenue and patients drifting off their plan, in one operating view.',
    bestFit: 'Hospital leadership, lab chains, corporates and insurers',
    pairsWith: ['clinical-intelligence', 'agent-workforce', 'digital-twin'],
    modules: [
      { name: 'B2B Analytics Dashboard', status: 'live', description: "Cohort risk insights and executive reporting across the partner's whole population." },
      { name: 'Attribution Engine', status: 'next', description: 'Traces platform-generated revenue to the transaction for the finance team, so the value of the contract is never a debate.' },
      { name: 'Leakage Intelligence', status: 'next', description: 'Shows, in currency, where preventive, diagnostic and follow-up revenue is leaving the facility.' },
      { name: 'Drift Detection', status: 'next', description: 'Lists patients slipping off their care plan so the team can step in before they are lost.' },
      { name: 'Underwriting Intelligence', status: 'vision', description: 'Consented, de-identified health risk signals for insurers.' },
      { name: 'Trial Matching', status: 'vision', description: 'Matches consented patients to clinical trials.' },
    ],
  },
];

export const steps: { title: string; body: string }[] = [
  { title: 'Integrate once.', body: 'Through the Intelligence SDK, the Wearables SDK or a fully branded white-label app for partners without one.' },
  { title: 'Choose systems.', body: 'Start with the two or three systems that match the business.' },
  { title: 'Switch on modules.', body: 'From the Partner Portal, live on the next API call. Every module can be tried in a sandbox with fictional data first.' },
  { title: 'Grow inside the account.', body: 'Add modules as the programme matures. Improvements ship server-side, with no app update for the partner.' },
];

export type BuyerId = 'labs' | 'clinics' | 'wellness' | 'hospitals' | 'insurers';

export interface BuyerMapping {
  id: BuyerId;
  buyer: string;
  systems: SystemSlug[];
  firstModules: string[];
}

export const buyers: BuyerMapping[] = [
  { id: 'labs', buyer: 'Diagnostic labs', systems: ['health-decoder', 'whole-body-intelligence', 'agent-workforce'], firstModules: ['Smart Reports', 'Correlation Engine', 'Re-Test Recall Engine'] },
  { id: 'clinics', buyer: 'Clinics and longevity centres', systems: ['digital-twin', 'whole-body-intelligence', 'ai-concierge'], firstModules: ['Biological Age', 'Disease Risk Engine', 'Cardiovascular Intelligence', 'Adaptive Protocols'] },
  { id: 'wellness', buyer: 'Wellness platforms and apps', systems: ['health-decoder', 'ai-concierge'], firstModules: ['Wearable Telemetry', 'Food Intelligence', 'Sleep & Recovery Engine', 'Performance Intelligence'] },
  { id: 'hospitals', buyer: 'Hospitals and health systems', systems: ['clinical-intelligence', 'agent-workforce', 'command-center'], firstModules: ['Clinical Intake Briefs', 'Medication Intelligence', 'AI Voice Agent', 'B2B Analytics Dashboard'] },
  { id: 'insurers', buyer: 'Insurers and corporate wellness', systems: ['digital-twin', 'command-center'], firstModules: ['Disease Risk Engine', 'B2B Analytics Dashboard'] },
];

export interface HospitalProgramme {
  name: string;
  what: string;
  poweredBy: SystemSlug[];
}

export const hospitalProgrammes: HospitalProgramme[] = [
  { name: 'Preventive Program Engine', what: "Turns one-off health checks into an annual membership under the hospital's brand.", poweredBy: ['health-decoder', 'digital-twin', 'ai-concierge', 'agent-workforce'] },
  { name: 'Discharge-to-Recovery', what: 'Recovery protocol, medication adherence, check-ins and escalation flags for every discharged patient.', poweredBy: ['clinical-intelligence', 'agent-workforce'] },
  { name: 'Chronic Care Programs', what: 'Subscription diabetes, cardiac and metabolic clinics with CGM and wearable integration.', poweredBy: ['whole-body-intelligence', 'ai-concierge', 'clinical-intelligence'] },
  { name: 'International Patient Continuity', what: 'Home-country lab parsing, remote monitoring and teleconsult scheduling after treatment.', poweredBy: ['health-decoder', 'clinical-intelligence', 'agent-workforce'] },
  { name: 'Front Desk Agent', what: 'Answers every call, rules out emergencies and converts enquiries into booked visits.', poweredBy: ['agent-workforce'] },
];

/* ── Helpers: every count on the site comes from these ── */

const NUMBER_WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

/** "Seven" for 7; falls back to digits above ten. */
export const numberWord = (n: number): string => NUMBER_WORDS[n] ?? String(n);

export const systemPath = (slug: SystemSlug): string => `${HUMAN_OS_PATH}/${slug}`;

export const getSystem = (slug: string): HumanOsSystem | undefined => systems.find((s) => s.slug === slug);

export const getRing = (id: RingId): HumanOsRing => rings.find((r) => r.id === id)!;

export const systemsInRing = (id: RingId): HumanOsSystem[] => systems.filter((s) => s.ring === id);

export const moduleCount = (system: HumanOsSystem): number => system.modules.length;

export const liveCount = (system: HumanOsSystem): number => system.modules.filter((m) => m.status === 'live').length;

export const allModules = (): (HumanOsModule & { system: HumanOsSystem })[] =>
  systems.flatMap((system) => system.modules.map((m) => ({ ...m, system })));

export const totalSystems = systems.length;
export const totalModules = allModules().length;
export const totalLive = allModules().filter((m) => m.status === 'live').length;

export const findModule = (name: string) => allModules().find((m) => m.name === name);

export const getBuyer = (id: BuyerId): BuyerMapping => buyers.find((b) => b.id === id)!;

/** "5 modules · 3 live" */
export const countLine = (system: HumanOsSystem): string =>
  `${moduleCount(system)} ${moduleCount(system) === 1 ? 'module' : 'modules'} · ${liveCount(system)} live`;

/** Previous and next system, wrapping 01 ↔ 07. */
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
  const names = new Set(allModules().map((m) => m.name));
  const problems: string[] = [];
  if (names.size !== totalModules) problems.push('Duplicate module names');
  systems.forEach((s) => s.pairsWith.forEach((p) => !slugs.has(p) && problems.push(`${s.slug} pairsWith unknown ${p}`)));
  buyers.forEach((b) => b.firstModules.forEach((m) => !names.has(m) && problems.push(`${b.id} lists unknown module ${m}`)));
  if (problems.length) console.error('[human-os] content problems:', problems);
}
