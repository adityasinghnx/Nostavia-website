/* ─────────────────────────────────────────────────────────────────────────────
 * Site-wide content and switches. Structure source: docs/website-structure.md.
 *
 * Outside words for the AI layer are only "Hive" and "Bees". Never name an
 * individual Bee, never mention EHR or LIS, never claim a certification.
 * ──────────────────────────────────────────────────────────────────────────── */

export const SITE_ORIGIN = 'https://nostaviahealth.com';

/** Working name, not final. Renaming here renames the menu, headings and copy. */
export const STUDIO = 'Studio';
export const STUDIO_PATH = '/studio';

/** Draft one-liner, awaiting approval. */
export const ONE_LINER =
  "Nostavia gives health businesses one place, Hive, where AI Bees run their care and customer work, on top of products we've built and ones we build for them.";

export const FLAGS = {
  /** Client logo strip. The structure guardrail says no customer names; keep only with each client's OK. */
  SHOW_CLIENT_LOGOS: true,
  /** Live / Next labels on Human OS modules. Totals are never printed. Turn off until statuses are confirmed. */
  SHOW_MODULE_STATUS: true,
};

export const nav = [
  { label: 'Hive', to: '/hive' },
  { label: 'Human OS', to: '/human-os' },
  { label: STUDIO, to: STUDIO_PATH },
  { label: 'Customers', to: '/customers' },
  { label: 'Developers', to: '/developers' },
];

export const CONTACT_EMAIL = 'contact@nostaviahealth.com';
export const CALENDAR_URL = 'https://calendar.app.google/cysR8LF2gMtuneNs9';
export const LINKEDIN_URL = 'https://lnkd.in/p/dBqTFF95';
export const CRUNCHBASE_URL = 'https://www.crunchbase.com/organization/nostavia-health';

export const company = {
  legal: 'Nostavia Technologies Pvt. Ltd.',
  hq: 'Lucknow, India',
  markets: 'India and the UAE',
};

export const DISCLAIMER =
  'Nostavia outputs are decision support. They do not diagnose, are not a medical device and are not a substitute for professional medical judgement.';

/* White monochrome marks. Alt text is the client's name. */
export const clientLogos = [
  { name: '360 ATHLETIX', src: '/client_logos/X logo black.png 1.png', h: 34 },
  { name: 'ClinicX', src: '/client_logos/clinicx_clean.png', h: 30 },
  { name: 'Kiosk Health', src: '/client_logos/kiosk_health_clean.png', h: 34 },
  { name: 'Live 360', src: '/client_logos/snksn-removebg-preview 1.png', h: 38 },
  { name: 'Atmaram Healthcare', src: '/client_logos/atmaram_healthcare.png', h: 34 },
  { name: 'Aging Tachometer', src: '/client_logos/aging_tachometer.png', h: 24 },
  // TODO(name): confirm the client's name for this mark's alt text
  { name: 'Client logo', src: '/client_logos/z_dna_mark.png', h: 38 },
  { name: 'ETLAWM', src: '/client_logos/Screenshot_2025-11-06_at_6.15.42_PM-removebg-preview 1.png', h: 26 },
];
