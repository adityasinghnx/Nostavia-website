/* Who we work with, by type of health business. Never list customer names here. */

export interface CustomerType {
  id: string;
  name: string;
  short: string;
  photo: string;
  headline: string;
  body: string;
  /** What Bees take off the team's plate. Plain jobs, no numbers. */
  beeJobs: string[];
  /** Human OS module names; must match src/content/human-os.ts. */
  startsWith: string[];
}

export const customerTypes: CustomerType[] = [
  {
    id: 'labs',
    name: 'Diagnostic labs',
    short: 'Labs',
    photo: '/photos/industry-labs.jpg',
    headline: 'Turn every report into a reason to come back.',
    body: 'Reports patients can read, sent under your name, and patients brought back when a re-test is due.',
    beeJobs: ['Decodes and sends reports', 'Invites patients back for re-tests', 'Answers the phone and books visits'],
    startsWith: ['Smart Reports', 'Correlation Engine', 'Re-Test Recall Engine'],
  },
  {
    id: 'clinics',
    name: 'Clinics and longevity centres',
    short: 'Clinics',
    photo: '/photos/industry-clinics.jpg',
    headline: 'Programmes members stay on.',
    body: 'Biological age, risk and personal protocols your clinicians can stand behind, with daily guidance between visits.',
    beeJobs: ['Prepares the member picture before each visit', 'Keeps protocols moving between visits', 'Flags members drifting off plan'],
    startsWith: ['Biological Age', 'Disease Risk Engine', 'Cardiovascular Intelligence', 'Adaptive Protocols'],
  },
  {
    id: 'hospitals',
    name: 'Hospitals and health systems',
    short: 'Hospitals',
    photo: '/photos/industry-hospitals.jpg',
    headline: 'Time back for clinicians. A front desk that never closes.',
    body: 'Briefs ready before the consult, medication signals for review, and every inbound call answered.',
    beeJobs: ['Writes pre-consult briefs', 'Answers calls in local languages', 'Reports on the whole population'],
    startsWith: ['Clinical Intake Briefs', 'Medication Intelligence', 'AI Voice Agent', 'B2B Analytics Dashboard'],
  },
  {
    id: 'wellness',
    name: 'Wellness platforms and apps',
    short: 'Wellness apps',
    photo: '/photos/industry-wellness.jpg',
    headline: 'Health AI inside the app you already have.',
    body: 'Wearables, meals, sleep and performance, decoded and turned into guidance your members act on.',
    beeJobs: ['Syncs and reads wearable data', 'Turns meals into glucose insight', 'Adjusts plans as the data changes'],
    startsWith: ['Wearable Telemetry', 'Food Intelligence', 'Sleep & Recovery Engine', 'Performance Intelligence'],
  },
  {
    id: 'insurers',
    name: 'Insurers and corporate wellness',
    short: 'Insurers',
    photo: '/photos/industry-insurers.jpg',
    headline: 'See risk across your population, early.',
    body: 'Consented risk signals and clear reporting across every member you cover.',
    beeJobs: ['Scores metabolic and cardiovascular risk', 'Builds the weekly population report'],
    startsWith: ['Disease Risk Engine', 'B2B Analytics Dashboard'],
  },
];
