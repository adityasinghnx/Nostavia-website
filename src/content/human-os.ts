/* ─────────────────────────────────────────────────────────────────────────────
 * Human OS: ready-made health AI modules, in five families. No status labels
 * and no counts anywhere. Module names show only while FLAGS.SHOW_MODULE_NAMES
 * is on (Anushka to confirm which can be shown). The family-to-group mapping
 * is also still to be confirmed.
 * ──────────────────────────────────────────────────────────────────────────── */

import { FLAGS } from './site';

export const HUMAN_OS_PATH = '/human-os';

export type GroupId = 'customers' | 'team';

export const groups: { id: GroupId; name: string; body: string }[] = [
  {
    id: 'customers',
    name: 'For your customers',
    body: 'Reports people can actually read, health scores, food and sleep guidance, and a health companion inside your app.',
  },
  {
    id: 'team',
    name: 'For your care team',
    body: 'A short brief before every consultation, recall campaigns, front-desk support and dashboards for leaders.',
  },
];

export interface HumanOsModule {
  name: string;
  body: string;
}

export interface Family {
  id: string;
  number: string;
  name: string;
  does: string;
  groups: GroupId[];
  modules: HumanOsModule[];
}

export const families: Family[] = [
  {
    id: 'reports',
    number: '01',
    name: 'Reports and lab insight',
    does: 'Explains every marker in plain language, compares body age with real age, scores heart and metabolic risk.',
    groups: ['customers', 'team'],
    modules: [
      { name: 'Smart Reports', body: 'Reads any lab report and explains every marker in plain language, in a report under your brand.' },
      { name: 'Biological Age', body: 'The body’s functional age from biomarkers, wearables and lifestyle, compared with real age.' },
      { name: 'Disease Risk', body: 'Metabolic and cardiovascular risk scores, with the factors behind each score.' },
      { name: 'Correlation Engine', body: 'Finds the links that matter across data, such as sleep and glucose, and shows only the relevant ones.' },
      { name: 'Digital Twin', body: 'A living model of the person that shows where their health is heading and what would change it.' },
    ],
  },
  {
    id: 'everyday',
    number: '02',
    name: 'Everyday health',
    does: 'Food scanning, sleep and recovery, personalised habits and a health companion.',
    groups: ['customers'],
    modules: [
      { name: 'AI Health Companion', body: 'Answers questions about a member’s own health data, inside your app and under your brand.' },
      { name: 'Personalisation Engine', body: 'Tailors habits and guidance to each person, and adapts as their data changes.' },
      { name: 'Food Intelligence', body: 'Turns a meal photo into its items and predicts its effect on blood sugar.' },
      { name: 'Sleep and Recovery', body: 'Sleep patterns, sleep debt and recovery, with clear guidance.' },
      { name: 'Performance Intelligence', body: 'Recovery, fitness and readiness for the day.' },
    ],
  },
  {
    id: 'body',
    number: '03',
    name: 'Body systems and life stages',
    does: 'Heart, women’s health, mental wellbeing and medicines.',
    groups: ['customers', 'team'],
    modules: [
      { name: 'Cardiovascular', body: 'Heart rate variability and cardiovascular readiness from wearable and lab data.' },
      { name: 'Women’s Health', body: 'Cycle phases and hormonal health, with guidance adapted to each phase.' },
      { name: 'Mental and Behavioral Health', body: 'Stress resilience, mood and mindfulness.' },
      { name: 'Medication Intelligence', body: 'Interaction and refill signals for a clinician to review. It never sets doses.' },
    ],
  },
  {
    id: 'devices',
    number: '04',
    name: 'Devices',
    does: 'Brings in data from rings, watches and phones, and turns it into one clean, continuous record.',
    groups: ['customers'],
    modules: [{ name: 'Wearable Telemetry', body: 'Brings wearable data into one clean format, with sleep, recovery and activity summaries.' }],
  },
  {
    id: 'care',
    number: '05',
    name: 'Care pathways',
    does: 'Intake briefs, re-test recall, front-desk voice and leadership dashboards.',
    groups: ['team'],
    modules: [
      { name: 'Clinical Intake Briefs', body: 'Reports and history turned into a one-page brief before every consultation.' },
      { name: 'Re-Test Recall', body: 'Finds who is due for a re-test in your own records and invites them back under your name.' },
      { name: 'AI Voice Agent', body: 'Answers front-desk calls in local languages and books the visit.' },
      { name: 'Adaptive Protocols', body: 'Care pathways that adjust as a person progresses, overseen by your clinicians.' },
      { name: 'B2B Analytics', body: 'Dashboards for leaders across your whole population.' },
    ],
  },
];

export const familiesIn = (group: GroupId) => families.filter((f) => f.groups.includes(group));

export const HUMAN_OS_SUB = 'Ready-made health AI modules you switch on through our API. Add one without a new app release.';

/** Ways to use Human OS. Hive stays out while FLAGS.SHOW_HIVE is off. */
export const usage = [
  { id: 'hive', title: 'In Hive', body: 'Your Bees run the modules for your team, in one chat-first workspace.', to: '/hive' },
  { id: 'api', title: 'In your own app', body: 'Call any module through our API. Keys and docs in the SDK Portal.', to: '/developers' },
  { id: 'studio', title: 'In a Studio build', body: 'A product we build for you, with the modules you need inside it.', to: '/studio' },
].filter((u) => FLAGS.SHOW_HIVE || u.id !== 'hive');

/* ─────────────────────────────────────────────────────────────────────────────
 * Normalisation Engine, shown inside the Devices family (Wearable Telemetry).
 * Customer-safe facts only, from the engine's Complete Guide (Part 1). The
 * guide itself is internal: never put keys, cloud account details, licence
 * terms, client names, brand names or its "Honest limits" on the site.
 * ──────────────────────────────────────────────────────────────────────────── */

export const wearableEngine = {
  name: 'Normalisation Engine',
  title: 'One clean record from every ring, watch and phone.',
  body: 'Every brand measures the body a little differently, and devices change over time. Stitch the data together and you get jumps that look like changes in health but are really changes in the device. The engine turns it into one continuous series per signal.',
  signals: ['Heart rate variability', 'Resting heart rate', 'Sleep', 'Steps', 'Temperature', 'Cycle entries'],
  handles: [
    { problem: 'A member replaces their ring, and the new one reads higher', answer: 'Spots the device change, aligns the new ring to the old one’s scale and marks the nights while it calibrates.' },
    { problem: 'A firmware update shifts a reading', answer: 'Corrects it only when a second device confirms the shift. Otherwise it flags it and never invents a correction.' },
    { problem: 'The same data arrives twice', answer: 'Uses one copy and marks the other, so nothing is counted twice.' },
    { problem: 'Travel across time zones, or a clock change', answer: 'Dates every night to the day the person woke up, in local time, and flags the travel days.' },
    { problem: 'The device was not worn', answer: 'The day still gets a row, with an empty value and the reason.' },
    { problem: 'A brand corrects old data, or it arrives late', answer: 'Adds a new revision, overwrites nothing and tells your systems.' },
    { problem: 'Junk entries in period-tracking apps', answer: 'Keeps and flags them. Nothing is dropped silently.' },
  ],
  facts: [
    { title: 'Runs in your own cloud', body: 'A sealed, signed program your cloud starts each night and when new data arrives. It runs for a few minutes, then stops.' },
    { title: 'Health data stays with you', body: 'Member data never leaves your cloud and never reaches Nostavia. The engine has no internet access at all.' },
    { title: 'Every value can be traced', body: 'Each value says how far it can be trusted and links back to the exact raw record it came from.' },
    { title: 'Written back to your storage', body: 'Clean tables, change events and full lineage, in one record format your team can build on.' },
  ],
  scope: 'It produces measurements only. It does not diagnose, predict cycle phase or fertility, or set personal baselines.',
};
