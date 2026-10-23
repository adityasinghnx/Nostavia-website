/* Who we work with, in order of focus. No customer names or logos. */

import type { BeeId } from './bees';

export interface CustomerType {
  id: string;
  name: string;
  short: string;
  photo: string;
  headline: string;
  /** What we help with (B6). */
  helps: string[];
  /** Bees most likely in a suggested starting team. */
  bees: BeeId[];
}

export const customerTypes: CustomerType[] = [
  {
    id: 'labs',
    name: 'Diagnostic labs',
    short: 'Labs',
    photo: '/photos/industry-labs.jpg',
    headline: 'Reports patients understand. Patients who come back.',
    helps: ['Reports patients understand', 'Patients who come back for re-tests', 'Fewer calls asking what a report means', 'Reports delivered to every portal on time'],
    bees: ['reports', 'recall', 'questions', 'entry'],
  },
  {
    id: 'clinics',
    name: 'Clinics',
    short: 'Clinics',
    photo: '/photos/industry-clinics.jpg',
    headline: 'A real app in your brand, and follow-up that never slips.',
    helps: ['A real app in your brand', 'Briefs before consultations', 'Follow-up that does not slip'],
    bees: ['intake', 'bookings', 'recall', 'questions'],
  },
  {
    id: 'apps',
    name: 'Wellness and health apps',
    short: 'Health apps',
    photo: '/photos/industry-wellness.jpg',
    headline: 'Health intelligence inside your product.',
    helps: ['Health intelligence inside your product', 'One module at a time, through our API', 'No new app release to add one'],
    bees: ['questions', 'reports'],
  },
  {
    id: 'hospitals',
    name: 'Hospitals',
    short: 'Hospitals',
    photo: '/photos/industry-hospitals.jpg',
    headline: 'A front desk that answers, and follow-up after every discharge.',
    helps: ['Front-desk support', 'Follow-up after discharge', 'Health-check programmes'],
    bees: ['front-desk', 'bookings', 'intake', 'recall'],
  },
];
