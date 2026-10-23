import React from 'react';
import { CodeWindow } from '../hive/CodeWindow';
import { Label, TextLink } from '../ui/primitives';
import { Reveal, SplitHeading } from '../ui/motion';

const points = [
  { title: 'Keys', body: 'API keys for every module you pick.' },
  { title: 'Docs', body: 'Guides and a full reference.' },
  { title: 'Sandbox', body: 'Try any module with fictional data first.' },
];

export const DevelopersSection: React.FC = () => (
  <section id="developers" data-theme="ink" aria-labelledby="dev-title" className="relative py-[clamp(6rem,11vw,10.5rem)] border-t border-fg/[0.07] overflow-hidden">
    <div aria-hidden="true" className="absolute right-[-10%] top-[10%] w-[900px] h-[700px] bg-[radial-gradient(closest-side,rgba(242,210,122,0.07),transparent)]" />
    <div className="wrap relative grid lg:grid-cols-12 gap-14 lg:gap-10 items-center">
      <div className="lg:col-span-5">
        <Label index="05">Developers</Label>
        <SplitHeading id="dev-title" className="t-h2 mt-6" text="Everything your engineers need, in the SDK Portal." />
        <Reveal>
          <p className="mt-7 t-lead text-fg/60 text-pretty max-w-[44ch]">Human OS modules plug into the app you already have. Your team gets keys and docs; whatever you switch on also shows up in Hive.</p>
          <dl className="mt-10 grid grid-cols-3 border-t border-fg/10">
            {points.map((p, i) => (
              <div key={p.title} className={i > 0 ? 'border-l border-fg/10 pl-4 sm:pl-5 pt-5' : 'pt-5 pr-4'}>
                <dt className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-accent">{p.title}</dt>
                <dd className="mt-2 text-[14px] leading-snug text-fg/60">{p.body}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10">
            <TextLink to="/developers">Read about the SDK</TextLink>
          </div>
        </Reveal>
      </div>
      <Reveal className="lg:col-span-7 lg:pl-8" delay={0.1}>
        <CodeWindow />
      </Reveal>
    </div>
  </section>
);
