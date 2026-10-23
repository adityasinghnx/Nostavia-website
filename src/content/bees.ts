/* ─────────────────────────────────────────────────────────────────────────────
 * Public Bees. A Bee is described only by its job. Character names, the Queen
 * and the coordinator stay internal, so they are not in this file, in the image
 * file names or anywhere on the site. Artwork: Nostavia Hive Bee pack.
 * ──────────────────────────────────────────────────────────────────────────── */

export type BeeId = 'reports' | 'recall' | 'questions' | 'bookings' | 'entry' | 'intake' | 'front-desk';

export interface Bee {
  id: BeeId;
  /** Short job label, e.g. for avatars and chips. */
  job: string;
  /** One sentence on what it does. */
  line: string;
  /** Body colour from the artwork, for glows and accents. */
  color: string;
}

export const bees: Bee[] = [
  { id: 'reports', job: 'Reports', line: 'Delivers reports to patients, doctors and every client portal.', color: '#1FB5C9' },
  { id: 'recall', job: 'Re-tests', line: 'Brings patients back when a re-test or follow-up is due.', color: '#FF6B4A' },
  { id: 'questions', job: 'Patient questions', line: 'Answers patient questions about their reports, in their language.', color: '#9B7BFF' },
  { id: 'bookings', job: 'Bookings', line: 'Books, moves and confirms appointments and home collections.', color: '#2F8CFF' },
  { id: 'entry', job: 'Portal work', line: 'Moves data between systems and portals, so nobody re-types it.', color: '#2ED69A' },
  { id: 'intake', job: 'Intake briefs', line: 'Prepares a short brief before every consultation.', color: '#FF4FA3' },
  { id: 'front-desk', job: 'Front desk', line: 'Answers front-desk calls and messages, around the clock.', color: '#FF9A1F' },
];

export const beeImage = (id: BeeId, small = false) => `/bees/${id}${small ? '-sm' : ''}.webp`;

export const getBee = (id: BeeId) => bees.find((b) => b.id === id)!;
