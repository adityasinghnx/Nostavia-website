/* ─────────────────────────────────────────────────────────────────────────────
 * What we offer. Two products, Human OS and Studio. Hive is how you use them;
 * Human OS can also be used inside your own app through the API.
 * ──────────────────────────────────────────────────────────────────────────── */

import { STUDIO, STUDIO_PATH } from './site';

export const products = [
  {
    id: 'human-os',
    name: 'Human OS',
    tag: 'Ready-made',
    to: '/human-os',
    headline: 'Health AI modules, ready to switch on.',
    body: 'Modules that read lab reports, score risk, guide people every day and give your care team time back. Switch one on without a new app release.',
  },
  {
    id: 'studio',
    name: STUDIO,
    tag: 'Built for you',
    to: STUDIO_PATH,
    headline: 'The product you need, built in your brand.',
    body: 'When what you need does not exist yet, we build it with you: apps, doctor portals, web products and voice assistants, on the same health AI.',
  },
] as const;

export const ways = [
  {
    id: 'hive',
    name: 'Hive',
    to: '/hive',
    headline: 'Run it all in Hive.',
    body: 'One chat-first workspace where AI Bees run the routine work across your systems. Your team talks, delegates and approves.',
  },
  {
    id: 'api',
    name: 'Your own product',
    to: '/developers',
    headline: 'Or build it into your app.',
    body: 'Call Human OS from your own app through our API. Keys, docs and usage in the SDK Portal.',
  },
] as const;

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
  { title: 'Private by design', body: 'Built to keep your data in your region, separate from every other customer’s, with outside AI services off unless you turn them on.' },
  { title: 'Your brand, your patients', body: 'We work under your name when you want us to. The relationship with your patients stays yours.' },
];

export const CLOSING = {
  title: 'Tell us where your team loses *the most time.*',
  body: 'We will show you what Human OS, a Studio build and your Bees would do about it.',
};
