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

export const FLAGS = {
  /** No customer names or logos until each customer gives written permission. */
  SHOW_CLIENT_LOGOS: false,
  /** Module names inside each Human OS family. Anushka to confirm which modules can be shown; off leaves families only. */
  SHOW_MODULE_NAMES: true,
  /** Hive and its Bees, kept but not revealed yet (owner, 24 Oct 2026). Off hides the menu item, page, home sections and every mention. */
  SHOW_HIVE: false,
};

/** Draft one-liner, awaiting approval. */
export const ONE_LINER = FLAGS.SHOW_HIVE
  ? 'Nostavia makes health AI for labs, clinics, hospitals and health apps: ready-made modules in Human OS, products built for you by Studio, and Hive, where AI Bees run the routine work while your people stay in charge.'
  : 'Nostavia makes health AI for labs, clinics, hospitals and health apps: ready-made modules in Human OS, and products built for you by Studio.';

/** Hero headline, set by Aditya on 24 Oct 2026. "Superintelligence" appears here only, never as a product or menu item. */
export const HERO_HEADLINE = 'Healthcare’s superintelligence, ready-made or *built for you.*';

export const HERO_SUB = FLAGS.SHOW_HIVE
  ? 'Human OS gives you ready-made health AI modules. Studio builds the apps, portals and voice assistants you need, in your brand. In Hive, AI Bees run the routine work while your people stay in charge.'
  : 'Human OS gives you ready-made health AI modules. Studio builds the apps, portals and voice assistants you need, in your brand. Your people stay in charge.';

export const nav = [
  { label: 'Human OS', to: '/human-os' },
  { label: STUDIO, to: STUDIO_PATH },
  { label: 'Hive', to: '/hive' },
  { label: 'Customers', to: '/customers' },
  { label: 'Developers', to: '/developers' },
].filter((l) => FLAGS.SHOW_HIVE || l.to !== '/hive');

export const CONTACT_EMAIL = 'contact@nostaviahealth.com';
export const CONTACT_PHONE = '+91 95983 20559';
export const CONTACT_PHONE_HREF = 'tel:+919598320559';
export const CALENDAR_URL = 'https://calendar.app.google/cysR8LF2gMtuneNs9';
export const LINKEDIN_URL = 'https://lnkd.in/p/dBqTFF95';

export const company = {
  legal: 'Nostavia Technologies Pvt. Ltd.',
  hq: 'Lucknow, India',
};

export const ABOUT = FLAGS.SHOW_HIVE
  ? 'Nostavia Technologies Pvt. Ltd. makes health AI for health businesses: ready-made modules in Human OS, products built for you by Studio, and Hive, where AI Bees run the routine work while your people stay in charge.'
  : 'Nostavia Technologies Pvt. Ltd. makes health AI for health businesses: ready-made modules in Human OS, and products built for you by Studio, while your people stay in charge.';

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
