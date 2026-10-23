/* ─────────────────────────────────────────────────────────────────────────────
 * Hive: how you run Human OS and your Studio builds. Page copy (B3) and the
 * sample conversation for the illustrative chat-first workspace.
 * Sample data only, labelled inside every view. Bees are named by job.
 * Internal words (coordinator name, approver name, outcome and record names,
 * starting-team name) never appear here.
 * ──────────────────────────────────────────────────────────────────────────── */

import type { BeeId } from './bees';

export const HIVE_SUB =
  'Hive is one chat-first workspace where AI Bees take on the routine work across your systems, and ask a person before anything important.';

export const BEE_DEFINITION =
  'A Bee is an AI worker with one job. One delivers reports. One brings patients back for re-tests. One answers patient questions about their reports. You choose the Bees you need, rename them if you like, and add more as you grow.';

export const ways = [
  { title: 'Talk', body: 'Ask anything about the work.', example: 'How many reports are stuck at client portals today?' },
  { title: 'Delegate', body: 'Hand a job or a schedule to a Bee.', example: 'Every morning at 7, send me yesterday’s numbers.' },
  { title: 'Supervise', body: 'Approve important actions, check results and look back at what happened.', example: 'Approve the re-test reminders for today.' },
];

export const control = [
  { title: 'Practice first', body: 'Every Bee rehearses on test or past data before it touches a real patient or system.' },
  { title: 'Approvals by default', body: 'A new Bee asks before every action, and earns more freedom only while it keeps getting things right.' },
  { title: 'Every action recorded', body: 'Which Bee did what, who approved it, and when.' },
  { title: 'Clear lines', body: 'Bees never diagnose, prescribe or set doses.' },
];

export const gettingStarted = [
  { title: 'Tell Hive about your business', body: 'In a conversation, not a form.' },
  { title: 'Get a suggested starting team', body: 'Hive proposes the Bees for your work. You adjust it.' },
  { title: 'Connect your systems', body: 'Your lab system, portals, WhatsApp, email and phone.' },
  { title: 'Teach it your rules', body: 'Upload your rules and templates.' },
  { title: 'Rehearse, then go live', body: 'Nothing goes out until you have seen it work.' },
];

/* ── Sample conversation for the chat-first workspace ── */

export type ChatTurn =
  | { kind: 'you'; text: string }
  | { kind: 'hive'; text: string; actions?: string[]; chip?: string }
  | { kind: 'approval'; bee: BeeId; title: string; detail: string };

export const chatScript: ChatTurn[] = [
  { kind: 'you', text: 'How many reports are stuck at client portals today?' },
  { kind: 'hive', text: '4 reports are waiting at 2 client portals. The reports Bee will retry at 11:00, or it can send them now.', actions: ['Send now', 'Wait'] },
  { kind: 'you', text: 'Every morning at 7, send me yesterday’s numbers.' },
  { kind: 'hive', text: 'Done. You’ll get yesterday’s numbers every morning at 7.', chip: 'Daily · 07:00' },
  { kind: 'approval', bee: 'recall', title: 'Send re-test reminders to 9 patients', detail: 'Lipid panel due · English and Hindi' },
];

export const activity: { bee: BeeId; text: string }[] = [
  { bee: 'reports', text: 'Delivered 14 reports to doctors and portals' },
  { bee: 'questions', text: 'Answered a question about an HbA1c result' },
  { bee: 'entry', text: 'Copied 6 results into a client portal' },
  { bee: 'bookings', text: 'Confirmed 5 home collections for tomorrow' },
  { bee: 'recall', text: 'Drafted re-test reminders, waiting for approval' },
  { bee: 'reports', text: 'Sent a summary in Hindi to a patient' },
];

export const approvals: { bee: BeeId; title: string; detail: string }[] = [
  { bee: 'recall', title: 'Re-test reminders', detail: '9 patients · lipid panel due' },
  { bee: 'reports', title: 'Report with a flagged value', detail: 'Sent to a clinician first' },
  { bee: 'entry', title: 'New portal login needed', detail: 'Client portal · needs a new login' },
];

export const SAMPLE_LABEL = 'Sample data';
export const SAMPLE_CAPTION = 'Illustrative view. Sample data, not a real customer.';
