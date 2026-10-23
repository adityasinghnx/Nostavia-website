/* ─────────────────────────────────────────────────────────────────────────────
 * Nostavia Superintelligence: the centre. Human OS, Hive and Studio are how it
 * understands, works and builds. Copy from the website source, Part B.
 * ──────────────────────────────────────────────────────────────────────────── */

import { STUDIO, STUDIO_PATH } from './site';

export type PartId = 'human-os' | 'hive' | 'studio';

export interface Part {
  id: PartId;
  name: string;
  verb: string;
  to: string;
  /** Home card headline and body (B1). */
  headline: string;
  body: string;
  /** Superintelligence page table (B2). */
  does: string;
  meets: string;
}

export const parts: Part[] = [
  {
    id: 'human-os',
    name: 'Human OS',
    verb: 'Understands',
    to: '/human-os',
    headline: 'It reads health data like an expert team.',
    body: 'Ready-made health modules turn lab reports, wearable data and health records into plain-language reports, risk scores and clear next steps.',
    does: 'Understands health data: reports, scores, risks, habits and signals from devices.',
    meets: 'In your app, your reports and your portal, through our API.',
  },
  {
    id: 'hive',
    name: 'Hive',
    verb: 'Works',
    to: '/hive',
    headline: 'It does the routine work, around the clock.',
    body: 'AI Bees run the jobs your team never gets to, across your lab system, client portals and WhatsApp. They ask a person before anything important.',
    does: 'Does the work: AI Bees run reports, recalls, patient questions and portal work.',
    meets: 'In one chat-first workspace, where your team asks, delegates and approves.',
  },
  {
    id: 'studio',
    name: STUDIO,
    verb: 'Builds',
    to: STUDIO_PATH,
    headline: 'It builds what you need, in your brand.',
    body: 'When you need a new app, portal or voice assistant, we build it on the same intelligence, under your name.',
    does: 'Builds for you: apps, portals and voice assistants made around your business.',
    meets: 'In your own product, under your brand.',
  },
];

/** The three promises under every part. */
export const promises = ['Private by design', 'People stay in charge', 'Never clinical judgement'];

export const problems = {
  heading: 'Your team is the glue between a dozen systems.',
  items: [
    'Reports re-typed from one system into another.',
    'Patients who never come back for their re-test.',
    'Calls missed at the front desk, follow-ups that slip.',
    'Lab reports patients cannot understand.',
    'AI tools your privacy rules will not allow.',
  ],
  /** Labels for the "glue" illustration. Generic system types, no vendor names. */
  systems: ['Lab system', 'Client portals', 'WhatsApp', 'Email', 'Phone', 'Insurer portals', 'Spreadsheets', 'Hospital software', 'Billing', 'Booking calendar'],
};

export const principles = [
  { title: 'People stay in charge', body: 'Nothing important happens without a person’s yes.' },
  { title: 'Never clinical judgement', body: 'It never diagnoses, prescribes or sets doses. Clinical signals go straight to a clinician.' },
  { title: 'Private by design', body: 'Built to keep your data in your region, separate from every other customer’s.' },
  { title: 'Your brand, your patients', body: 'We work under your name when you want us to.' },
];

export const differentiators = [
  { title: 'Trained for healthcare work', body: 'It knows reports, re-tests, recalls and front-desk work, not just general chat.' },
  { title: 'Works with the systems you have', body: 'Lab and hospital systems, client and insurer portals, WhatsApp, email and phone, including older software with no proper connection.' },
  { title: 'Speaks your patients’ languages', body: 'Messages in the languages your patients actually use.' },
  { title: 'Private by design', body: 'Designed to run in your region, or in your own building, with outside AI services off unless you turn them on.' },
  { title: 'Every action on the record', body: 'You can see what was done, by which Bee, and who approved it.' },
];

export const SUPER_LEAD =
  'Most health businesses run a dozen tools that never talk to each other, and people fill the gaps by hand. Nostavia Superintelligence is one intelligence across all of it. It reads your health data, works inside your systems, and grows with every part you add.';

export const CLOSING = {
  title: 'Tell us where your team loses *the most time.*',
  body: 'We will show you what the Superintelligence would do about it.',
};
