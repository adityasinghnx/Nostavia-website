/* ─────────────────────────────────────────────────────────────────────────────
 * Human OS: what the Superintelligence understands. Shown as families, not a
 * module catalogue, with no status labels and no counts. The two groups are
 * named in text only, never drawn as separate boxes.
 * ──────────────────────────────────────────────────────────────────────────── */

export const HUMAN_OS_PATH = '/human-os';

export const groups = [
  {
    name: 'For your customers',
    body: 'Reports people can actually read, health scores, food and sleep guidance, and a health companion inside your app.',
  },
  {
    name: 'For your care team',
    body: 'A short brief before every consultation, recall campaigns, front-desk support and dashboards for leaders.',
  },
];

export const families = [
  { name: 'Reports and lab insight', does: 'Explains every marker in plain language, compares body age with real age, scores heart and metabolic risk.' },
  { name: 'Everyday health', does: 'Food scanning, sleep and recovery, personalised habits and a health companion.' },
  { name: 'Body systems and life stages', does: 'Heart, women’s health, mental wellbeing and medicines.' },
  { name: 'Devices', does: 'Brings in and cleans data from wearables.' },
  { name: 'Care pathways', does: 'Intake briefs, re-test recall, front-desk voice and leadership dashboards.' },
];

export const HUMAN_OS_SUB = 'Ready-made health modules you switch on through our API. Add one without a new app release.';
