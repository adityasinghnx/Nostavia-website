/* ─────────────────────────────────────────────────────────────────────────────
 * Recount: an iPhone and Apple Watch app from Nostavia, in early release.
 * Copy from the Recount launch kit. These pages are reachable only by URL:
 * never add them to the nav, footer, sitemap or any other page.
 *
 * Never claim: call recording, cloud sync, its own AI summaries, Android,
 * iPad or Mac, or medical or legal compliance (HIPAA and similar).
 * ──────────────────────────────────────────────────────────────────────────── */

export const RECOUNT_PATH = '/recount';
export const RECOUNT_PRIVACY_PATH = '/recount/privacy';
export const RECOUNT_TERMS_PATH = '/recount/terms';
export const RECOUNT_SUPPORT_PATH = '/recount/support';

export const RECOUNT_ONE_LINER =
  'Recount is a private voice recorder for iPhone that writes down every word on the device, in English, Hindi or Hinglish, and never uploads anything.';

export const RECOUNT_EFFECTIVE = '3 November 2026';

export const recountLinks = [
  { label: 'Recount', to: RECOUNT_PATH },
  { label: 'Privacy Policy', to: RECOUNT_PRIVACY_PATH },
  { label: 'Terms of Use', to: RECOUNT_TERMS_PATH },
  { label: 'Support', to: RECOUNT_SUPPORT_PATH },
];

export const recountSteps = [
  { title: 'Tap to record.', body: 'One button on the home screen. It names the recording after the meeting you’re in.' },
  { title: 'Tap the screen to mark a moment.', body: 'A ★ bookmark lands in the transcript so you can find it later.' },
  { title: 'Press and hold to stop.', body: 'A pocket tap can’t end your meeting.' },
];

export const recountPrivacy = [
  'Transcribed on the device with Apple’s speech models',
  'No account, no analytics, no servers',
  'Works in airplane mode after a one-time download',
  'Protected while your iPhone is locked',
];

export const recountFeatures = [
  { title: 'Knows who said what.', body: 'Speakers labelled after each recording, and voices remembered if you turn it on.' },
  { title: 'Leave it running.', body: 'Pause When Quiet skips the silence and wakes the moment anyone speaks.' },
  { title: 'Learns your words.', body: 'Names and terms you add are spelled right; tap an underlined word to fix it once and for all.' },
  { title: 'Highlights.', body: 'Promises, requests, dates, ₹ amounts and talk time per speaker.' },
  { title: 'Copy for AI.', body: 'Minutes, follow-up emails or tasks in Claude, ChatGPT or Gemini, with one tap.' },
  { title: 'Never loses a meeting.', body: 'Saved in 10-second pieces, so a crash costs seconds, not the meeting.' },
];

export const recountFaq = [
  { q: 'Does it need the internet?', a: 'Only once, to download the speech model for your language (about a minute on Wi-Fi). After that, everything works offline.' },
  { q: 'Can it record phone calls?', a: 'No. iOS doesn’t let any app record calls. Recount pauses when a call comes in and resumes afterwards.' },
  { q: 'Which iPhones does it work on?', a: 'iPhones running iOS 26 that support Apple’s on-device speech models. Indian languages need iOS 27. Smart fixes need Apple Intelligence.' },
  { q: 'Where are my recordings stored?', a: 'Only on your iPhone. Share or copy a transcript when you choose to.' },
  { q: 'Do I need an account?', a: 'No.' },
  { q: 'Does it summarise for me?', a: 'Recount gives you a ready prompt and transcript to paste into the AI you already use, so you choose where your text goes.' },
];

/** Extra answers shown on the Support page only. */
export const recountSupportFaq = [
  { q: 'How do I stop a recording?', a: 'Press and hold the record button. A single tap marks a moment instead, so a pocket tap can’t end your meeting.' },
  { q: 'How do I delete my data?', a: 'Delete recordings inside the app, or delete the app to remove everything. We hold no copy.' },
];

export type DocSection = { title: string; body?: string[]; list?: string[]; after?: string[] };

export const recountPrivacyPolicy: DocSection[] = [
  {
    title: 'Who we are',
    body: ['Recount is an app for iPhone and Apple Watch made by Nostavia Health (“we”, “us”). This policy covers the Recount app and the Recount pages on this website.'],
  },
  {
    title: 'Data we collect',
    body: ['None. We do not collect, store, sell or share any personal data. Recount has no user accounts, no analytics, no advertising and no tracking, and we run no servers that receive your audio or text.'],
  },
  {
    title: 'What stays on your device',
    body: ['Everything Recount creates is kept only on your iPhone, and on your Apple Watch when you record there:'],
    list: [
      'Audio recordings, saved in short pieces so a recording survives if the app is closed.',
      'Transcripts, made on the device with Apple’s on-device speech models.',
      'Voice profiles, only if you turn on remembering voices, used to name the people you record often.',
      'Your words list: names and terms you add, and corrections you make.',
      'Calendar details, read on the device to name a recording after the event you’re in. They are never sent anywhere.',
    ],
    after: ['Recordings are protected by iOS data protection while your iPhone is locked. If you use iCloud or device backups, your backup may include this app data under Apple’s terms; we never have access to it.'],
  },
  {
    title: 'Network use',
    body: ['Recount connects to the internet only to download the speech and speaker models it needs, once, from Apple and from Hugging Face. These downloads send no audio, transcripts or personal information. After that, Recount works fully offline, including in airplane mode.'],
  },
  {
    title: 'Permissions',
    list: [
      'Microphone: to record when you press record.',
      'Speech recognition: to transcribe on the device.',
      'Calendar (optional): to name recordings after your meetings.',
    ],
    after: ['You can change these at any time in the iPhone Settings app.'],
  },
  {
    title: 'When you share',
    body: ['If you share a recording or copy a transcript into another app, such as email or an AI assistant like Claude, ChatGPT or Gemini, that app handles it under its own privacy policy. Recount only does this when you tap to share or copy.'],
  },
  {
    title: 'Recording others',
    body: ['You are responsible for getting consent from people before you record them where the law requires it. Recount cannot record phone calls.'],
  },
  {
    title: 'Deleting your data',
    body: ['Delete any recording inside the app, or delete the app to remove all of its data from your device. Because we hold no data, there is nothing for us to delete on our side.'],
  },
  {
    title: 'Children',
    body: ['Recount is rated 4+ and collects no data from anyone, including children.'],
  },
  {
    title: 'Changes',
    body: ['If this policy changes, we will update this page and the date above.'],
  },
];

export const recountTerms: DocSection[] = [
  {
    title: 'Agreement',
    body: ['By downloading or using Recount, an app made by Nostavia Health, you agree to these terms and to Apple’s standard Licensed Application End User License Agreement, which also applies to your use of the app.'],
  },
  {
    title: 'Using Recount',
    list: [
      'You may use Recount for your own personal or work purposes.',
      'You are responsible for following the recording and consent laws where you live. Get permission before recording people when the law requires it.',
      'Do not use Recount to record anyone unlawfully or to break any law.',
    ],
  },
  {
    title: 'Transcripts',
    body: ['Transcripts, speaker labels and highlights are produced automatically and may contain mistakes. Check anything important against the audio. Recount is not a medical, legal or professional record-keeping service.'],
  },
  {
    title: 'Your content',
    body: ['Your recordings and transcripts belong to you and stay on your device. Keep copies of anything you need; deleting the app deletes its data.'],
  },
  {
    title: 'Other services',
    body: ['If you copy a transcript into another app or AI service, that service’s own terms apply.'],
  },
  {
    title: 'No warranty',
    body: ['Recount is in early release and is provided “as is”, without warranties of any kind, to the extent the law allows. We are not liable for lost recordings, transcription errors or indirect damages from your use of the app, to the extent the law allows.'],
  },
  {
    title: 'Changes',
    body: ['We may update these terms. Using Recount after an update means you accept the new terms.'],
  },
];
