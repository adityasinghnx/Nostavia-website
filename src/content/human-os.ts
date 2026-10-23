/* ─────────────────────────────────────────────────────────────────────────────
 * Human OS: ready-made health AI modules, in five families. No status labels
 * and no counts anywhere. Module names show only while FLAGS.SHOW_MODULE_NAMES
 * is on (Anushka to confirm which can be shown). The family-to-group mapping
 * is also still to be confirmed.
 * ──────────────────────────────────────────────────────────────────────────── */

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
    does: 'Brings in and cleans data from wearables.',
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

/** Three ways to use Human OS. */
export const usage = [
  { title: 'In Hive', body: 'Your Bees run the modules for your team, in one chat-first workspace.', to: '/hive' },
  { title: 'In your own app', body: 'Call any module through our API. Keys and docs in the SDK Portal.', to: '/developers' },
  { title: 'In a Studio build', body: 'A product we build for you, with the modules you need inside it.', to: '/studio' },
];
