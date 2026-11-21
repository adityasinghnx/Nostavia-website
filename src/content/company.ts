/* ─────────────────────────────────────────────────────────────────────────────
 * Company pages: About and Careers, and the Company menu.
 * No customer names and no business numbers anywhere here (owner, 21 Nov 2026).
 * ──────────────────────────────────────────────────────────────────────────── */

export const ABOUT_PATH = '/about';
export const CAREERS_PATH = '/careers';

export const companyMenu = [
  { label: 'About', to: ABOUT_PATH, line: 'Who we are and what we believe' },
  { label: 'Careers', to: CAREERS_PATH, line: 'Build health AI with us' },
  { label: 'Trust Center', to: '/trust', line: 'Security, privacy and clinical oversight' },
  { label: 'Contact sales', to: '/demo?interest=sales', line: 'Talk to our team' },
];

/** About: the three ideas the company is built on. */
export const beliefs = [
  {
    title: 'Health data should become care people understand',
    body: 'Labs, clinics and apps hold more health data than ever. Too little of it turns into anything a patient can act on. We build the layer that does that work.',
  },
  {
    title: 'Behind your brand, not in front of it',
    body: 'Our products run under your name. Your patients and customers keep their relationship with you, not with us.',
  },
  {
    title: 'People stay in charge',
    body: 'Software takes on the routine work. Every clinical call stays with a clinician, and nothing important happens without a person’s yes.',
  },
];

export const howWeWork = [
  { title: 'Ready-made, or built for you', body: 'Human OS gives you modules that are ready to switch on. Studio builds the products that do not exist yet, on the same health AI.' },
  { title: 'Built for regulated work', body: 'Data stays in your region, apart from every other customer’s, with outside AI off unless you turn it on.' },
  { title: 'Clinically reviewed', body: 'A clinical and scientific advisory board reviews protocol outputs before they reach any customer.' },
  { title: 'Ready for your review', body: 'Your security questionnaire and our data-processing agreement are handled by the people who built the platform.' },
];

/** Careers. Areas we hire in; no role counts or open-role promises. */
export const careerAreas = ['Engineering', 'AI and data science', 'Clinical and science', 'Product and design', 'Sales and partnerships', 'Something else'];

export const careerValues = [
  { title: 'Work that reaches patients', body: 'What you build shows up in reports, apps and follow-ups that real people rely on.' },
  { title: 'Small teams, real ownership', body: 'You own problems end to end, from the first conversation with a customer to the release.' },
  { title: 'Clinicians in the room', body: 'You work next to doctors, nutritionists and scientists, not around them.' },
  { title: 'Careful by default', body: 'Privacy, safety and honesty about what the product can and cannot do come before speed.' },
];
