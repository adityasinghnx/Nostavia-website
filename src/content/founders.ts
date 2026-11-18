/* ─────────────────────────────────────────────────────────────────────────────
 * Founder link pages: /aditya and /anushka.
 *
 * Reachable by URL (or QR) only. Nothing in the nav, footer, sitemap or other
 * pages links to them. Each page is a personal link page: save contact, call,
 * WhatsApp, email, socials, a few links and a shareable QR code.
 *
 * Plain data only (no React): vite.config.ts imports this file to build the
 * downloadable contact cards at /aditya.vcf and /anushka.vcf.
 *
 * Fill in each TODO. A field left empty (or a list left empty) simply hides
 * its button or row on the page, so nothing half-finished ever shows.
 * ──────────────────────────────────────────────────────────────────────────── */

import { CALENDAR_URL, LINKEDIN_URL, SITE_ORIGIN } from './site';

export type SocialKind = 'linkedin' | 'instagram' | 'x' | 'github' | 'youtube' | 'website';

export type LinkIcon = SocialKind | 'calendar' | 'mail' | 'nostavia' | 'human-os' | 'studio' | 'link';

export interface FounderLink {
  label: string;
  /** One short line under the label. */
  sub?: string;
  href: string;
  icon: LinkIcon;
}

export interface Founder {
  slug: string;
  firstName: string;
  lastName: string;
  role: string;
  org: string;
  city: string;
  country: string;
  /** One or two sentences, in their own voice. */
  bio: string;
  /** Portrait for the top of the page, in /public/founders. Without one, initials are shown. */
  photo?: {
    src: string;
    webp?: string;
    /** Square face crop, embedded in the saved contact. */
    contact?: string;
    /** CSS object-position, to keep the face in frame. */
    focus?: string;
    /** Width ÷ height. Set it for small or square photos so the header follows the photo instead of cropping and enlarging it. */
    aspect?: number;
  };
  /** Phone as shown, and as dialled (E.164, e.g. '+919598320559'). */
  phone?: { display: string; e164: string };
  /** Show a WhatsApp button for the same number. */
  whatsapp?: boolean;
  email?: string;
  /** Round icon buttons under the actions, in this order. */
  socials: { kind: SocialKind; href: string; handle?: string }[];
  /** The one link that gets the large card at the top of the list. */
  featured?: FounderLink;
  /** Further links, under the featured one. */
  links: FounderLink[];
}

const nostaviaLinks: FounderLink[] = [
  { label: 'Nostavia Health', sub: 'nostaviahealth.com', href: '/', icon: 'website' },
  { label: 'Nostavia on LinkedIn', sub: 'News and updates', href: LINKEDIN_URL, icon: 'linkedin' },
];

const meeting = (first: string): FounderLink => ({
  label: `Book a call with ${first}`,
  sub: 'Pick a time that suits you',
  href: CALENDAR_URL,
  icon: 'calendar',
});

export const founders: Founder[] = [
  {
    slug: 'aditya',
    firstName: 'Aditya',
    lastName: 'Singh',
    role: 'Founder',
    org: 'Nostavia Health',
    city: 'Noida',
    country: 'India',
    bio: 'Building health AI for labs, clinics, hospitals and health apps at Nostavia.', // TODO: Aditya's own words
    photo: { src: '/founders/aditya.jpg', webp: '/founders/aditya.webp', contact: '/founders/aditya-contact.jpg', focus: '50% 22%' },
    phone: { display: '+91 95983 20558', e164: '+919598320558' },
    whatsapp: true,
    email: 'aditya@nostaviahealth.com',
    socials: [
      { kind: 'linkedin', href: 'https://www.linkedin.com/in/adityasinghnx/' },
      { kind: 'instagram', href: 'https://www.instagram.com/alwaysadityasingh/' },
      { kind: 'x', href: 'https://x.com/adityasinghnx' },
    ],
    featured: meeting('Aditya'),
    links: nostaviaLinks,
  },
  {
    slug: 'anushka',
    firstName: 'Anushka',
    lastName: 'Gupta',
    role: 'Co-founder', // TODO(confirm): title
    org: 'Nostavia Health',
    city: 'Noida',
    country: 'India',
    bio: 'Building health AI for labs, clinics, hospitals and health apps at Nostavia.', // TODO: Anushka's own words
    photo: { src: '/founders/anushka.jpg', webp: '/founders/anushka.webp', contact: '/founders/anushka-contact.jpg', focus: '50% 20%', aspect: 0.86 }, // 400×400 source; a larger original would look sharper
    phone: { display: '+91 93361 92919', e164: '+919336192919' },
    whatsapp: true,
    email: 'anushka@nostaviahealth.com',
    socials: [
      { kind: 'linkedin', href: 'https://www.linkedin.com/in/anushkagupta208/' },
      { kind: 'x', href: 'https://x.com/AnushkaGuptah' },
    ],
    featured: meeting('Anushka'),
    links: nostaviaLinks,
  },
];

export const founderBySlug = (slug: string) => founders.find((f) => f.slug === slug);

export const fullName = (f: Founder) => [f.firstName, f.lastName].filter(Boolean).join(' ');
export const initials = (f: Founder) => [f.firstName, f.lastName].filter(Boolean).map((n) => n[0]).join('').toUpperCase();
export const founderUrl = (f: Founder) => `${SITE_ORIGIN}/${f.slug}`;
export const vcardPath = (f: Founder) => `/${f.slug}.vcf`;
export const whatsappHref = (f: Founder) => (f.phone ? `https://wa.me/${f.phone.e164.replace(/\D/g, '')}` : undefined);
export const absolute = (href: string) => (href.startsWith('/') ? `${SITE_ORIGIN}${href}` : href);

/* ── Contact card (vCard 3.0). Opens straight into "Add contact" on iPhone and Android. ── */

const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/([,;])/g, '\\$1');

/** Lines longer than 75 characters continue on the next line after a space (RFC 6350). */
const fold = (line: string) => {
  const parts: string[] = [];
  for (let i = 0; i < line.length; i += i === 0 ? 75 : 74) parts.push(line.slice(i, i + (i === 0 ? 75 : 74)));
  return parts.join('\r\n ');
};

const socialLabel: Record<SocialKind, string> = {
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  x: 'X',
  github: 'GitHub',
  youtube: 'YouTube',
  website: 'Website',
};

export const buildVCard = (f: Founder, photo?: { base64: string; type: 'JPEG' | 'PNG' }) => {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${esc(f.lastName)};${esc(f.firstName)};;;`,
    `FN:${esc(fullName(f))}`,
    `ORG:${esc(f.org)}`,
    `TITLE:${esc(f.role)}`,
    f.phone && `TEL;TYPE=CELL,VOICE:${f.phone.e164}`,
    f.email && `EMAIL;TYPE=INTERNET,WORK:${f.email}`,
    `URL:${founderUrl(f)}`,
    `ADR;TYPE=WORK:;;;${esc(f.city)};;;${esc(f.country)}`,
    ...f.socials.filter((s) => s.kind !== 'website').map((s) => `X-SOCIALPROFILE;TYPE=${socialLabel[s.kind].toLowerCase()}:${s.href}`),
    ...f.socials.filter((s) => s.kind === 'website').map((s) => `URL:${s.href}`),
    `NOTE:${esc(f.bio)}`,
    photo && `PHOTO;ENCODING=b;TYPE=${photo.type}:${photo.base64}`,
    'END:VCARD',
  ].filter(Boolean) as string[];
  return lines.map(fold).join('\r\n') + '\r\n';
};

export { socialLabel };
