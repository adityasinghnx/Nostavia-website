import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, HeartPulse, Activity, Database, Layers, Network } from 'lucide-react';
import { Container, SectionHeading, focusRing } from '../home/shared';
import { Reveal } from '../home/motion';

/* Integration facts come from the existing site: Smart Reports (any lab PDF), Wearable Telemetry
 * (Apple Health, Google Health Connect), the Hospitals page (HIS exports, FHIR R4) and trust.config (ABDM). */
const integrations = [
  { name: 'Lab PDFs', line: 'Any layout', icon: FileText },
  { name: 'Apple Health', line: 'iOS wearable data', icon: HeartPulse },
  { name: 'Google Health Connect', line: 'Android wearable data', icon: Activity },
  { name: 'HIS exports', line: 'CSV, Excel or PDF', icon: Database },
  { name: 'FHIR R4', line: 'Structured records', icon: Layers },
  { name: 'ABDM and ABHA', line: 'Architecture ready', icon: Network },
];

const tabs = {
  Reports: [
    ['c', '// Decode a lab report under your brand'],
    ['k', 'const '],
    ['t', 'report = '],
    ['k', 'await '],
    ['t', 'nostavia.reports.decode(file)\n\n'],
    ['t', 'report.markers'],
    ['c', '  // each one optimal, in range or outlier'],
  ],
  Wearables: [
    ['c', '// Normalise Apple Health and Health Connect data'],
    ['k', 'const '],
    ['t', 'summary = '],
    ['k', 'await '],
    ['t', 'nostavia.wearables.summary(userId)\n\n'],
    ['t', 'summary.sleep, summary.recovery'],
  ],
  Modules: [
    ['c', '// Modules switch on from the Partner Portal'],
    ['c', '// and are live on the next API call'],
    ['k', 'const '],
    ['t', 'age = '],
    ['k', 'await '],
    ['t', "nostavia.modules.run('biological-age', userId)"],
  ],
} as const;

type Tab = keyof typeof tabs;

export const Developers: React.FC = () => {
  const [tab, setTab] = useState<Tab>('Reports');
  return (
    <section aria-labelledby="dev-heading" className="relative bg-ink-950 py-24 sm:py-32 overflow-hidden">
      <div aria-hidden="true" className="absolute left-[-240px] top-10 w-[800px] h-[800px] bg-[radial-gradient(closest-side,rgba(245,217,123,0.07),transparent)]" />
      <Container className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal className="space-y-8">
          {/* TODO(copy): section heading and intro */}
          <SectionHeading
            id="dev-heading"
            eyebrow="For engineering teams"
            title="Built to plug into what you already run."
            intro="Bring the data you already have. The SDK sits inside your app, our engineer integrates it alongside your team, and improvements ship server-side with no app update."
          />
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {integrations.map(({ name, line, icon: Icon }) => (
              <li key={name} className="rounded-xl dk-card p-3.5">
                <Icon aria-hidden="true" className="w-4 h-4 text-hos-yellow" />
                <div className="mt-2.5 text-sm font-semibold text-white">{name}</div>
                <div className="text-xs text-white/55">{line}</div>
              </li>
            ))}
          </ul>
          <Link to="/solutions/gravity" className={`inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-hos-yellow rounded ${focusRing}`}>
            Explore the SDK
            <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </Link>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-[20px] p-1.5 dk-card shadow-[0_50px_120px_-50px_rgba(0,0,0,0.9)]">
            <div className="rounded-[15px] bg-ink-900 ring-1 ring-white/[0.06] overflow-hidden">
              <div role="tablist" aria-label="Code examples" className="flex items-center gap-1 px-3 pt-3 border-b border-white/[0.06]">
                {(Object.keys(tabs) as Tab[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    className={`px-3 py-2 text-xs font-medium rounded-t-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hos-yellow ${
                      tab === t ? 'text-white bg-white/[0.06]' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
                <span className="ml-auto pb-2 text-[10px] text-white/45">Illustrative, not the published API</span>
              </div>
              <pre key={tab} className="p-5 sm:p-6 text-[13px] leading-7 font-mono overflow-x-auto min-h-[220px]" style={{ animation: 'hos-fade-up 0.35s ease both' }}>
                <code>
                  {tabs[tab].map(([kind, text], i) => (
                    <span key={i} className={kind === 'c' ? 'block text-white/40' : kind === 'k' ? 'text-hos-yellow' : 'text-white/85'}>
                      {text}
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
