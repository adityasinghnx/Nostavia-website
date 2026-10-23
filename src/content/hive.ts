/* ─────────────────────────────────────────────────────────────────────────────
 * Hive: sample data for the illustrative product views, and Hive page copy.
 * Everything here is sample data and is captioned as such wherever it renders.
 * Bees are never named. A Bee is described by the work it runs.
 * ──────────────────────────────────────────────────────────────────────────── */

export type Source = 'human-os' | 'studio';

export interface BeeTask {
  text: string;
  runs: string;
  source: Source;
}

/** Live activity feed in the sample Hive. Module names match Human OS. */
export const beeTasks: BeeTask[] = [
  { text: 'Sent 14 lab reports with plain-language summaries', runs: 'Smart Reports', source: 'human-os' },
  { text: 'Answered a call in Hindi and booked a visit for Thursday', runs: 'AI Voice Agent', source: 'human-os' },
  { text: 'Found 9 patients due for a re-test and invited them back', runs: 'Re-Test Recall Engine', source: 'human-os' },
  { text: "Prepared tomorrow's intake briefs, 3 outliers flagged", runs: 'Clinical Intake Briefs', source: 'human-os' },
  { text: 'Scheduled 6 home sample pickups', runs: 'Home Collection App', source: 'studio' },
  { text: 'Adjusted a sleep plan after a week of short nights', runs: 'Sleep & Recovery Engine', source: 'human-os' },
  { text: 'Flagged a drug interaction for a clinician to review', runs: 'Medication Intelligence', source: 'human-os' },
  { text: 'Synced wearable data and refreshed recovery scores', runs: 'Wearable Telemetry', source: 'human-os' },
  { text: 'Answered a member question about their HbA1c trend', runs: 'AI Health Companion', source: 'human-os' },
  { text: 'Updated the weekly population risk report', runs: 'B2B Analytics Dashboard', source: 'human-os' },
  { text: 'Sent collection-day reminders to tomorrow’s bookings', runs: 'Home Collection App', source: 'studio' },
  { text: 'Moved a member to the next protocol phase', runs: 'Adaptive Protocols', source: 'human-os' },
];

export interface Approval {
  title: string;
  detail: string;
  kind: 'Clinical' | 'Message' | 'Plan';
}

export const approvals: Approval[] = [
  { title: 'Follow-up plan after discharge', detail: 'Patient 4821 · drafted from the discharge summary', kind: 'Clinical' },
  { title: 'Interaction flag: metformin + contrast', detail: 'Patient 2207 · needs a clinician', kind: 'Clinical' },
  { title: 'Protocol change: training load', detail: 'Member 1186 · recovery below range 5 days', kind: 'Plan' },
  { title: 'Report summary with an outlier', detail: 'Patient 3390 · ferritin, high', kind: 'Message' },
  { title: 'Re-test invitation wording', detail: '9 patients · lipid panel due', kind: 'Message' },
];

/** What is running in the sample Hive: Human OS modules and one Studio build, side by side. */
export const running: { name: string; source: Source }[] = [
  { name: 'Smart Reports', source: 'human-os' },
  { name: 'AI Voice Agent', source: 'human-os' },
  { name: 'Re-Test Recall Engine', source: 'human-os' },
  { name: 'Clinical Intake Briefs', source: 'human-os' },
  { name: 'Home Collection App', source: 'studio' },
];

export const SAMPLE_CAPTION = 'Illustrative view. Sample data, not a real customer.';

/* ── Hive page ── */

export const hivePrinciples = [
  {
    title: 'One place to work',
    body: 'Everything you have with Nostavia shows up in Hive: the modules you picked and the builds we made for you. No jumping between tools.',
  },
  {
    title: 'Bees do the work',
    body: 'Bees run what you have. They send the reports, answer the calls, prepare the briefs and follow up, so your team works on what needs a person.',
  },
  {
    title: 'People decide what matters',
    body: 'Anything clinical waits for a person. A Bee drafts it, your team approves it.',
  },
  {
    title: 'It grows with you',
    body: 'Add a module or a new build and it arrives in the same Hive, run by the same Bees.',
  },
];
