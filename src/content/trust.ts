/* ─────────────────────────────────────────────────────────────────────────────
 * Trust, security and clinical governance. Home section + /trust page.
 *
 * Every line here is sourced from the company description (July 2026) or copy
 * already approved for the site. Nothing here is a certification. Do not add
 * SOC 2, ISO 27001, HIPAA, GDPR or any other standard until it is held, and
 * then add it under `standards` with the auditor and date on file.
 * ──────────────────────────────────────────────────────────────────────────── */

import { CONTACT_EMAIL } from './site';

export const TRUST_PATH = '/trust';

export type ControlIcon = 'region' | 'isolate' | 'ai' | 'deidentify' | 'consent' | 'people';

export const controls: { icon: ControlIcon; title: string; body: string }[] = [
  {
    icon: 'region',
    title: 'Your data stays in your region',
    body: 'Data is kept in the region you work in, including in-region handling for customers in the UAE.',
  },
  {
    icon: 'isolate',
    title: 'Separate from every other customer',
    body: 'Each customer’s data is kept apart from every other customer’s. Nothing is pooled without consent.',
  },
  {
    icon: 'ai',
    title: 'Outside AI services off by default',
    body: 'No third-party AI service sees your data unless you turn it on.',
  },
  {
    icon: 'deidentify',
    title: 'Personal details stripped first',
    body: 'Designed so that personal details are removed and only a de-identified brief reaches the reasoning model.',
  },
  {
    icon: 'consent',
    title: 'Consent and purpose, built in',
    body: 'Explicit consent, purpose limitation and data minimisation are part of the pipeline, not a policy on top of it.',
  },
  {
    icon: 'people',
    title: 'People approve, clinicians decide',
    body: 'Nothing important happens without a person’s yes. It never diagnoses, prescribes or sets doses.',
  },
];

/** Regulations the platform is built to. "Aligned", never "certified". */
export const regulations = [
  {
    region: 'India',
    name: 'Digital Personal Data Protection Act, 2023',
    body: 'Explicit consent, purpose limitation and data minimisation are built into how data moves through the platform.',
  },
  {
    region: 'UAE',
    name: 'Dubai health-data rules and Law No. 17 of 2026',
    body: 'Aligned to Dubai’s health-data rules and the longevity-care framework, with in-region data handling for UAE customers.',
  },
];

export const assurances = [
  { title: 'A data-processing agreement with every customer', body: 'Licensing and data-processing terms are standard for every customer, so your legal team reviews them once.' },
  { title: 'Clinical review before release', body: 'Protocol outputs are checked against our licensed clinical advisory board before they reach any customer.' },
  { title: 'Responsible disclosure', body: 'Found a security issue? Our security.txt tells researchers how to reach our team.' },
];

/** Clinical and scientific advisory board (company description, July 2026). Confirm each person is happy to be listed publicly. */
export const advisors = [
  { name: 'Dr. Sparsh Sehdev', role: 'MBBS · General Medical Council (UK) registered', note: '11,000+ patients treated' },
  { name: 'Aakanksha Pant, PhD', role: 'Chief Longevity Officer', note: 'Senior Scientist, IISc Bangalore' },
  { name: 'Dr. Vivek Rai', role: 'MBBS, MD Pharmacology', note: 'Principal Investigator, clinical trials' },
  { name: 'Sharwani Walke', role: 'Chief Nutrition Officer', note: 'MSc Clinical Nutrition, University College London' },
  { name: 'Dr. Akshita Gupta', role: 'MBBS', note: 'Chronic conditions, paediatrics, dermatology' },
  { name: 'Anmol Udhad', role: 'Sports nutritionist (ISSA), MBA', note: 'Formerly Bain & Company' },
  { name: 'Dr. Dipa Patle', role: 'BAMS', note: 'Head of Ayurvedic Department' },
];

export const SECURITY_REVIEW_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Security review')}`;
