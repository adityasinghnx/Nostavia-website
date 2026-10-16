import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { steps } from '../../content/human-os';
import { Container, SectionHeading, focusRing } from '../home/shared';
import { Reveal } from '../home/motion';

/* Three delivery models, each with a small product visual, then the launch steps from human-os.ts. */

const CodeVisual: React.FC = () => (
  <pre className="w-full rounded-xl bg-ink-950 ring-1 ring-white/10 p-4 text-[11px] leading-relaxed font-mono text-white/70 whitespace-pre-wrap break-words">
    <span className="text-white/40">{'// your app, your UI'}</span>
    {'\n'}
    <span className="text-hos-yellow">const</span> report = <span className="text-hos-yellow">await</span> health.decode(labPdf)
    {'\n'}
    report.markers.<span className="text-emerald-300">forEach</span>(show)
  </pre>
);

const PhoneVisual: React.FC = () => (
  <div className="mx-auto w-[150px] rounded-[26px] ring-[6px] ring-ink-700 bg-ink-950 p-3 space-y-2">
    <div className="flex items-center gap-1.5">
      <span className="w-5 h-5 rounded-md bg-[#0F766E] text-white text-[8px] font-bold flex items-center justify-center">YL</span>
      <span className="text-[9px] font-semibold text-white">Your Lab</span>
    </div>
    <div className="rounded-lg bg-white/[0.06] p-2">
      <div className="text-[8px] text-white/50">Biological age</div>
      <div className="text-base font-semibold text-white">34</div>
    </div>
    {[60, 35, 75].map((w, i) => (
      <div key={i} className="h-1.5 rounded-full bg-white/[0.08]">
        <div className="h-full rounded-full bg-hos-yellow/70" style={{ width: `${w}%` }} />
      </div>
    ))}
  </div>
);

const BuildVisual: React.FC = () => (
  <div className="grid grid-cols-3 gap-2 w-full">
    {['Scope', 'Build', 'Launch'].map((col, ci) => (
      <div key={col} className="rounded-lg bg-white/[0.04] ring-1 ring-white/[0.06] p-2 space-y-1.5">
        <div className="text-[9px] font-semibold uppercase tracking-wider text-white/50">{col}</div>
        {Array.from({ length: 3 - ci }).map((_, i) => (
          <div key={i} className={`h-4 rounded ${ci === 2 ? 'bg-hos-yellow/70' : 'bg-white/[0.08]'}`} />
        ))}
      </div>
    ))}
  </div>
);

/* Lines reuse the product copy in the site navigation. */
const models = [
  { name: 'SDK', line: 'Add health AI to the app you already have, with no change to your UI.', to: '/solutions/gravity', visual: <CodeVisual /> },
  { name: 'White Label', line: 'Our ready-made products, launched as yours, with no engineering team required.', to: '/solutions/storyhealth', visual: <PhoneVisual /> },
  { name: 'Custom Build', line: 'Designed and built from scratch for you, on top of Human OS.', to: '/solutions/engineering', visual: <BuildVisual /> },
];

export const ShipItYourWay: React.FC = () => (
  <section aria-labelledby="ship-heading" className="relative bg-ink-900 border-y border-white/[0.06] py-24 sm:py-32">
    <Container className="space-y-14">
      <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        {/* TODO(copy): section heading and intro */}
        <SectionHeading
          id="ship-heading"
          eyebrow="Ship it your way"
          title="Three ways to launch. One platform underneath."
          intro="Plug the SDK into your app, launch our white-label products under your name, or have us build something new."
        />
        <Link to="/pricing" className={`shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-hos-yellow rounded ${focusRing}`}>
          See pricing
          <ArrowRight aria-hidden="true" className="w-4 h-4" />
        </Link>
      </Reveal>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {models.map((m, i) => (
          <li key={m.name}>
            <Reveal delay={i * 100} className="h-full">
              <Link to={m.to} className={`group flex flex-col h-full rounded-[20px] dk-card p-6 sm:p-7 hover:border-white/20 transition-colors ${focusRing}`}>
                <span aria-hidden="true" className="flex items-center justify-center min-h-[170px] rounded-2xl bg-white/[0.02] ring-1 ring-white/[0.05] p-4">
                  {m.visual}
                </span>
                <span className="mt-6 text-2xl font-semibold text-white">{m.name}</span>
                <span className="mt-2 text-sm text-white/60 leading-relaxed">{m.line}</span>
                <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-hos-yellow transition-colors">
                  Explore {m.name}
                  <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="rounded-[20px] dk-card p-6 sm:p-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-hos-yellow mb-6">From kickoff to live</div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              <Reveal delay={i * 90}>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full ring-1 ring-hos-yellow/50 text-hos-yellow text-xs font-mono font-semibold flex items-center justify-center">
                    <span className="sr-only">Step </span>
                    {i + 1}
                  </span>
                  {i < steps.length - 1 && <span aria-hidden="true" className="hidden lg:block flex-1 h-px bg-gradient-to-r from-hos-yellow/40 to-transparent" />}
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{s.title}</h3>
                <p className="mt-1.5 text-sm text-white/55 leading-relaxed">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Container>
  </section>
);
