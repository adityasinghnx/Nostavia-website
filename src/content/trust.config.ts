/* ─────────────────────────────────────────────────────────────────────────────
 * Trust layer: single source for every security and compliance element.
 * The homepage strip, /security and the footer line all render from here.
 *
 * Rule: certifications shown belong to our infrastructure providers, never to
 * Nostavia Technologies. A future certification is a one-line change below.
 *
 * Logos: only official files from each brand's press kit or member portal, in
 * /public/logos/trust/. Leave `logo` unset until the file exists; the item then
 * renders as a text tile. When adding a file, also set logoWidth/logoHeight.
 * ──────────────────────────────────────────────────────────────────────────── */

export type TrustGroupId = 'infrastructure' | 'programs' | 'production' | 'practices' | 'future';

export type TrustIcon = 'consent' | 'abdm' | 'encryption' | 'isolation' | 'audit' | 'keys' | 'clinical' | 'decision';

export interface TrustItem {
  id: string;
  group: TrustGroupId;
  name: string;
  /** Path under /public. Unset means the official file has not been supplied yet. */
  logo?: string;
  logoWidth?: number;
  logoHeight?: number;
  descriptor?: string;
  enabled: boolean;
  /** Wording must be signed off by the CTO before deploy. */
  needsConfirmation?: boolean;
  /** Practices only: icon from the site's lucide-react set. */
  icon?: TrustIcon;
  /** Production only: store listing. */
  href?: string;
}

export const trustGroups = {
  infrastructure: {
    heading: 'Built on certified infrastructure',
    caption: 'Certifications shown are held by our infrastructure providers, not by Nostavia Technologies.',
  },
  programs: {
    heading: 'Supported by',
  },
  production: {
    heading: 'Live in production',
    line: 'Live on the App Store and Google Play, where health data access is reviewed under Apple HealthKit and Google Health Connect policies.',
  },
} as const;

export const trustItems: TrustItem[] = [
  /* ── Group A: Infrastructure ── */
  // Official wordmark from supabase.com/brand-assets, dark-background (white text) version for the dark theme
  { id: 'supabase', group: 'infrastructure', name: 'Supabase', logo: '/logos/trust/supabase-dark.svg', logoWidth: 581, logoHeight: 113, descriptor: 'Database and authentication. SOC 2 Type II', enabled: true },
  // TODO(logo): official file pending at /logos/trust/microsoft-azure.svg
  { id: 'azure', group: 'infrastructure', name: 'Microsoft Azure', descriptor: 'Cloud AI infrastructure. SOC 2 Type II and ISO/IEC 27001', enabled: true },
  // Pending internal confirmation. Do not render. Logo pending at /logos/trust/google-cloud.svg
  { id: 'google-cloud', group: 'infrastructure', name: 'Google Cloud', descriptor: 'Cloud AI infrastructure. SOC 2 Type II and ISO/IEC 27001', enabled: false },

  /* ── Group B: Programs (official member badges) ── */
  // TODO(logo): official NVIDIA Inception member badge
  { id: 'nvidia-inception', group: 'programs', name: 'NVIDIA Inception', enabled: true },
  // TODO(logo): official Google for Startups member badge
  { id: 'google-for-startups', group: 'programs', name: 'Google for Startups', enabled: true },
  // TODO(logo): official Microsoft for Startups member badge
  { id: 'microsoft-for-startups', group: 'programs', name: 'Microsoft for Startups', enabled: true },
  // TODO(logo): official ElevenLabs Grants badge, if supplied
  { id: 'elevenlabs-grants', group: 'programs', name: 'ElevenLabs Grants', enabled: true },

  /* ── Group C: Live in production (store links reused from the footer) ── */
  // Official badge from Apple's marketing toolbox (developer.apple.com/app-store/marketing/guidelines)
  { id: 'app-store', group: 'production', name: 'App Store', logo: '/logos/trust/app-store-badge.svg', logoWidth: 120, logoHeight: 40, href: 'https://apps.apple.com/us/app/nostavia-health/id6760108353', enabled: true },
  // Official badge from play.google.com/intl/en_us/badges (artwork includes Google's required clear space)
  { id: 'google-play', group: 'production', name: 'Google Play', logo: '/logos/trust/google-play-badge.png', logoWidth: 646, logoHeight: 250, href: 'https://play.google.com/store/apps/details?id=com.nostavia.nostavia_health&hl=en_IN', enabled: true },

  /* ── Group D: Our own practices ── */
  { id: 'dpdp', group: 'practices', icon: 'consent', name: 'DPDP Act 2023 aligned', descriptor: 'Explicit consent, purpose limitation and data minimisation are built into the pipeline.', enabled: true },
  { id: 'abdm', group: 'practices', icon: 'abdm', name: 'ABDM and ABHA ready', descriptor: "Architecture built for India's Ayushman Bharat Digital Mission.", enabled: true },
  { id: 'encryption', group: 'practices', icon: 'encryption', name: 'Encrypted in transit and at rest', descriptor: 'TLS 1.2+ in transit and AES-256 at rest.', enabled: true, needsConfirmation: true },
  { id: 'tenant-isolation', group: 'practices', icon: 'isolation', name: 'Tenant-isolated', descriptor: "Each partner's data is structurally isolated, with row-level security on every table.", enabled: true, needsConfirmation: true },
  { id: 'audit-logged', group: 'practices', icon: 'audit', name: 'Audit-logged', descriptor: 'Every API call is metered and audit-logged.', enabled: true, needsConfirmation: true },
  { id: 'no-keys-on-device', group: 'practices', icon: 'keys', name: 'No keys on device', descriptor: 'All AI requests run through a secure server-side proxy. No API keys ship inside any app.', enabled: true },
  { id: 'clinical-bench', group: 'practices', icon: 'clinical', name: 'Clinical bench review', descriptor: 'Protocol outputs are reviewed by a seven-member licensed clinical advisory bench before release to any partner.', enabled: true },
  { id: 'decision-support', group: 'practices', icon: 'decision', name: 'Decision support, not a medical device', descriptor: 'Our outputs support clinicians and users. They do not diagnose and are not a substitute for professional medical judgement.', enabled: true },

  /* ── Group E: Future items ── */
  // Enable only after the certificate or report exists and the CTO has approved the wording.
  { id: 'cert-in-audit', group: 'future', name: 'CERT-In empanelled security audit', enabled: false },
  { id: 'csa-star-1', group: 'future', name: 'CSA STAR Level 1', enabled: false },
  { id: 'abdm-certified', group: 'future', name: 'ABDM certified', enabled: false },
  { id: 'iso-27001', group: 'future', name: 'ISO/IEC 27001', enabled: false },
  { id: 'iso-42001', group: 'future', name: 'ISO/IEC 42001', enabled: false },
  { id: 'soc2-type2', group: 'future', name: 'SOC 2 Type II', enabled: false },
  { id: 'hipaa-baa', group: 'future', name: 'HIPAA-aligned, BAA available', enabled: false },
  { id: 'gdpr-dpa', group: 'future', name: 'GDPR DPA available', enabled: false },
];

/** Enabled items in a group, in config order. Disabled items never render. */
export const trustGroup = (group: TrustGroupId): TrustItem[] =>
  trustItems.filter((item) => item.group === group && item.enabled);

/** Enabled items picked by id, in the order given. */
export const trustPick = (ids: string[]): TrustItem[] =>
  ids.map((id) => trustItems.find((item) => item.id === id)).filter((item): item is TrustItem => !!item && item.enabled);

export const TRUST_CONTACT = 'contact@nostaviahealth.com';

export const trustFooterLine = 'DPDP Act aligned. Built on SOC 2 Type II certified infrastructure.';
