/* ─────────────────────────────────────────────────────────────────────────────
 * How we handle health data. Practices only.
 * No certification or compliance wording: as of Oct 2026 Nostavia holds no ISO,
 * HIPAA, GDPR or SOC 2 certification, and the site must not suggest otherwise.
 * ──────────────────────────────────────────────────────────────────────────── */

export type PracticeIcon = 'consent' | 'isolation' | 'encryption' | 'keys' | 'clinical' | 'decision';

export interface Practice {
  id: string;
  icon: PracticeIcon;
  title: string;
  body: string;
  /** Wording must be signed off by the CTO before launch. */
  needsConfirmation?: boolean;
}

export const practices: Practice[] = [
  { id: 'consent', icon: 'consent', title: 'Consent first', body: 'People choose what they share and why. Each feature collects only the data it needs.' },
  { id: 'isolation', icon: 'isolation', title: 'Kept apart', body: "Each customer's data is isolated, with row-level security on every table.", needsConfirmation: true },
  { id: 'encryption', icon: 'encryption', title: 'Encrypted', body: 'TLS 1.2 or higher in transit and AES-256 at rest.', needsConfirmation: true },
  { id: 'keys', icon: 'keys', title: 'No keys on devices', body: 'AI requests run through a secure server-side proxy. No API keys ship inside any app.' },
  { id: 'clinical', icon: 'clinical', title: 'Clinically reviewed', body: 'Protocol outputs are reviewed by our licensed clinical advisory bench before release.' },
  { id: 'decision', icon: 'decision', title: 'Decision support', body: 'Outputs support clinicians and the people they care for. They do not diagnose.' },
];
