// Shared lead submission used by every enquiry form on the site.
// Sends to Formspree (primary) and FormSubmit (backup), and keeps a local copy.

const DEFAULT_FORMSPREE = 'https://formspree.io/f/xbdnezwz';
const FORMSUBMIT = 'https://formsubmit.co/ajax/contact@nostaviahealth.com';

export const newRefId = (): string => 'NST-' + Math.floor(100000 + Math.random() * 900000);

export async function submitLead(
  subject: string,
  fields: Record<string, string>,
): Promise<void> {
  const payload = { ...fields, submittedAt: new Date().toLocaleString() };

  try {
    const existing = JSON.parse(localStorage.getItem('nostavia_demo_requests') || '[]');
    localStorage.setItem('nostavia_demo_requests', JSON.stringify([payload, ...existing]));
  } catch {
    // Storage can be unavailable (private mode); the network submissions below still run.
  }

  let formspreeEndpoint = DEFAULT_FORMSPREE;
  try {
    const custom = localStorage.getItem('nostavia_formspree_id')?.trim();
    if (custom) formspreeEndpoint = custom.startsWith('http') ? custom : `https://formspree.io/f/${custom}`;
  } catch {
    // ignore
  }

  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };

  await Promise.all([
    fetch(formspreeEndpoint, { method: 'POST', headers, body: JSON.stringify(payload) }).catch(() => null),
    fetch(FORMSUBMIT, {
      method: 'POST',
      headers,
      body: JSON.stringify({ _subject: subject, _template: 'table', _captcha: 'false', ...payload }),
    }).catch(() => null),
  ]);
}
