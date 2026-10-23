/* ─────────────────────────────────────────────────────────────────────────────
 * Site-wide content and switches. Brief: docs/website-structure.md.
 *
 * Positioning (owner, 23 Oct 2026): the products are Human OS (ready-made) and
 * Studio (built for you). Hive is how you use them, with AI Bees doing the
 * routine work; Human OS can also be used inside your own app through the API.
 *
 * Never on the site: status labels or dates, EHR, LIS, module counts, prices,
 * customer names, certifications, internal Hive words, Bee names, comparisons
 * to other AI products. Nothing implies clinical judgement.
 * ──────────────────────────────────────────────────────────────────────────── */

export const SITE_ORIGIN = 'https://nostaviahealth.com';

/** Working name, not final. Renaming here renames the menu, headings and copy. */
export const STUDIO = 'Studio';
export const STUDIO_PATH = '/studio';

/** Draft one-liner, awaiting approval. */
export const ONE_LINER =
  'Nostavia makes health AI for labs, clinics, hospitals and health apps: ready-made modules in Human OS, products built for you by Studio, and Hive, where AI Bees run the routine work while your people stay in charge.';

/** Hero headline, pending a final pick. */
export const HERO_HEADLINE = 'Health AI, ready-made or *built for you.*';

export const HERO_SUB =
  'Human OS gives you ready-made health AI modules. Studio builds the apps, portals and voice assistants you need, in your brand. In Hive, AI Bees run the routine work while your people stay in charge.';

export const FLAGS = {
  /** No customer names or logos until each customer gives written permission. */
  SHOW_CLIENT_LOGOS: false,
  /** Module names inside each Human OS family. Anushka to confirm which modules can be shown; off leaves families only. */
  SHOW_MODULE_NAMES: true,
};

export const nav = [
  { label: 'Human OS', to: '/human-os' },
  { label: STUDIO, to: STUDIO_PATH },
  { label: 'Hive', to: '/hive' },
  { label: 'Customers', to: '/customers' },
  { label: 'Developers', to: '/developers' },
];

export const CONTACT_EMAIL = 'contact@nostaviahealth.com';
export const CONTACT_PHONE = '+91 95983 20558';
export const CONTACT_PHONE_HREF = 'tel:+919598320558';
export const CALENDAR_URL = 'https://calendar.app.google/cysR8LF2gMtuneNs9';
export const LINKEDIN_URL = 'https://lnkd.in/p/dBqTFF95';

export const company = {
  legal: 'Nostavia Technologies Pvt. Ltd.',
  hq: 'Lucknow, India',
};

export const ABOUT =
  'Nostavia Technologies Pvt. Ltd. makes health AI for health businesses: ready-made modules in Human OS, products built for you by Studio, and Hive, where AI Bees run the routine work while your people stay in charge. Founded by Aditya Singh (CEO) and Anushka Gupta (CTO).';

/** Safety line used under any section that describes what Nostavia does. */
export const SAFETY_LINE = 'Nostavia supports your team’s work. It does not make clinical decisions; clinicians do.';

/* Kept for when written permission exists. Hidden while FLAGS.SHOW_CLIENT_LOGOS is false. */
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
