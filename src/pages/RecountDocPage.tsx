import React from 'react';
import { useSeo } from '../lib/useSeo';
import { CONTACT_EMAIL } from '../content/site';
import {
  RECOUNT_EFFECTIVE,
  RECOUNT_PRIVACY_PATH,
  RECOUNT_SUPPORT_PATH,
  RECOUNT_TERMS_PATH,
  recountFaq,
  recountPrivacyPolicy,
  recountSupportFaq,
  recountTerms,
  type DocSection,
} from '../content/recount';
import { PageHero } from '../components/page/PageKit';
import { RecountFaq, RecountLinks } from '../components/recount/RecountKit';
import { Button, Section } from '../components/ui/primitives';

/* Recount's privacy policy, terms and support pages. */

type Kind = 'privacy' | 'terms' | 'support';

const pages: Record<Kind, { path: string; title: string; description: string; intro: string }> = {
  privacy: {
    path: RECOUNT_PRIVACY_PATH,
    title: 'Privacy Policy',
    description: 'Recount collects no data. Recordings and transcripts stay on your iPhone.',
    intro: 'Recount does not collect any data. There is no account, no analytics and no server. Your recordings, transcripts and voice data stay on your iPhone and Apple Watch unless you choose to share them.',
  },
  terms: {
    path: RECOUNT_TERMS_PATH,
    title: 'Terms of Use',
    description: 'Terms of use for the Recount app.',
    intro: 'The terms for using Recount, the private voice recorder for iPhone and Apple Watch from Nostavia.',
  },
  support: {
    path: RECOUNT_SUPPORT_PATH,
    title: 'Support',
    description: 'Get help with Recount: contact and frequently asked questions.',
    intro: 'Need help with Recount? Write to us and we’ll get back to you. Please include your iPhone model and iOS version, and never send recordings of real patient or client conversations.',
  },
};

const Doc: React.FC<{ sections: DocSection[] }> = ({ sections }) => (
  <div className="grid lg:grid-cols-12 gap-10">
    <p className="lg:col-span-4 font-mono text-[12px] text-fg/45">Effective {RECOUNT_EFFECTIVE}</p>
    <div className="lg:col-span-8 border-t border-fg/[0.12]">
      {sections.map((s) => (
        <div key={s.title} className="border-b border-fg/[0.12] py-9">
          <h2 className="t-h3">{s.title}</h2>
          <div className="mt-4 flex flex-col gap-4 text-[16px] leading-relaxed text-fg/65 max-w-[64ch]">
            {s.body?.map((p) => <p key={p}>{p}</p>)}
            {s.list && (
              <ul className="flex flex-col gap-2.5 pl-5 list-disc marker:text-accent">
                {s.list.map((li) => <li key={li}>{li}</li>)}
              </ul>
            )}
            {s.after?.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      ))}
      <div className="py-9">
        <h2 className="t-h3">Contact</h2>
        <p className="mt-4 text-[16px] text-fg/65">
          Nostavia Health ·{' '}
          <a href={`mailto:${CONTACT_EMAIL}?subject=Recount`} className="text-fg underline decoration-fg/30 underline-offset-4 hover:decoration-accent">
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </div>
  </div>
);

const RecountDocPage: React.FC<{ kind: Kind }> = ({ kind }) => {
  const page = pages[kind];
  useSeo({ title: `${page.title} · Recount | Nostavia`, description: page.description, path: page.path });

  return (
    <>
      <PageHero
        label="Recount · An app from Nostavia"
        title={page.title}
        intro={page.intro}
        actions={
          kind === 'support' && (
            <Button href={`mailto:${CONTACT_EMAIL}?subject=Recount%20support`} size="lg">
              Email {CONTACT_EMAIL}
            </Button>
          )
        }
      />
      <Section theme="paper" tight>
        <div className="wrap">
          {kind === 'privacy' && <Doc sections={recountPrivacyPolicy} />}
          {kind === 'terms' && <Doc sections={recountTerms} />}
          {kind === 'support' && (
            <div className="grid lg:grid-cols-12 gap-10">
              <h2 className="lg:col-span-4 t-h2">Frequently asked.</h2>
              <div className="lg:col-span-8">
                <RecountFaq items={[...recountFaq, ...recountSupportFaq]} />
              </div>
            </div>
          )}
        </div>
      </Section>
      <RecountLinks />
    </>
  );
};

export default RecountDocPage;
