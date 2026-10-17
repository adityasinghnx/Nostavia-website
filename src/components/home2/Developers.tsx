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

type Tok = readonly [kind: 'c' | 'k' | 's' | 'f' | 't', text: string];

/* Illustrative calls, not the published API. Line counts match so the panel height stays put. */
const examples = {
  Reports: {
    file: 'decode-report.ts',
    code: [
      [['c', '// Decode a lab report under your brand']],
      [['k', 'const '], ['t', 'report = '], ['k', 'await '], ['t', 'nostavia.reports.'], ['f', 'decode'], ['t', '(file, {']],
      [['t', '  brand: '], ['s', "'Your Lab'"], ['t', ',']],
      [['t', '})']],
      [],
      [['t', 'report.markers.'], ['f', 'forEach'], ['t', '(show)']],
    ],
  },
  Wearables: {
    file: 'wearables.ts',
    code: [
      [['c', '// Apple Health and Health Connect, one shape']],
      [['k', 'const '], ['t', 'day = '], ['k', 'await '], ['t', 'nostavia.wearables.'], ['f', 'summary'], ['t', '(userId, {']],
      [['t', '  date: '], ['s', "'today'"], ['t', ',']],
      [['t', '})']],
      [],
      [['f', 'render'], ['t', '(day.sleep, day.recovery)']],
    ],
  },
  Modules: {
    file: 'biological-age.ts',
    code: [
      [['c', '// Switched on in the Partner Portal, live on the next call']],
      [['k', 'const '], ['t', 'age = '], ['k', 'await '], ['t', 'nostavia.modules.'], ['f', 'run'], ['t', '(']],
      [['t', '  '], ['s', "'biological-age'"], ['t', ', { userId },']],
      [['t', ')']],
      [],
      [['f', 'render'], ['t', '(age)']],
    ],
  },
} satisfies Record<string, { file: string; code: Tok[][] }>;

type Tab = keyof typeof examples;
const tabIcons: Record<Tab, typeof FileText> = { Reports: FileText, Wearables: Activity, Modules: Layers };

const tokClass: Record<Tok[0], string> = {
  c: 'text-white/35',
  k: 'text-hos-yellow',
  s: 'text-emerald-300/90',
  f: 'text-sky-300/90',
  t: 'text-white/85',
};

const statusChip = {
  Optimal: 'bg-emerald-400/10 text-emerald-300 ring-emerald-400/20',
  'In range': 'bg-white/[0.06] text-white/70 ring-white/10',
  Outlier: 'bg-amber-400/10 text-amber-300 ring-amber-400/25',
} as const;

/* Sample responses rendered the way a partner app might show them. Sample data only. */
const Response: React.FC<{ tab: Tab }> = ({ tab }) => {
  if (tab === 'Reports') {
    const rows = [
      { name: 'HbA1c', value: '5.4', unit: '%', status: 'In range' },
      { name: 'Vitamin D', value: '18', unit: 'ng/mL', status: 'Outlier' },
      { name: 'HDL cholesterol', value: '58', unit: 'mg/dL', status: 'Optimal' },
    ] as const;
    return (
      <ul className="divide-y divide-white/[0.06]">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center justify-between py-2.5">
            <span className="text-sm text-white/80">{r.name}</span>
            <span className="flex items-center gap-3">
              <span className="text-sm text-white tabular-nums">
                {r.value} <span className="text-white/40 text-xs">{r.unit}</span>
              </span>
              <span className={`w-[68px] text-center rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${statusChip[r.status]}`}>{r.status}</span>
            </span>
          </li>
        ))}
      </ul>
    );
  }
  if (tab === 'Wearables') {
    const tiles = [
      { label: 'Sleep', value: '7h 12m' },
      { label: 'Recovery', value: 'Recovered' },
      { label: 'Resting HR', value: '58 bpm' },
      { label: 'HRV', value: '64 ms' },
    ];
    return (
      <div className="space-y-3 py-1">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {tiles.map((t) => (
            <div key={t.label} className="rounded-lg bg-white/[0.03] ring-1 ring-white/[0.06] px-3 py-2.5">
              <div className="text-[10px] uppercase tracking-wider text-white/40">{t.label}</div>
              <div className="mt-1 text-sm font-semibold text-white">{t.value}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 text-[11px] text-white/50">
          <span className="rounded-full bg-white/[0.04] ring-1 ring-white/[0.08] px-2.5 py-0.5">Apple Health</span>
          <span className="rounded-full bg-white/[0.04] ring-1 ring-white/[0.08] px-2.5 py-0.5">Google Health Connect</span>
        </div>
      </div>
    );
  }
  return (
    <div className="py-1 space-y-3">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-white/40">Biological age</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-white tracking-tight">34</span>
            <span className="text-xs text-white/45">vs 38 chronological</span>
          </div>
        </div>
        <span className="rounded-full bg-hos-yellow/15 text-hos-yellow ring-1 ring-hos-yellow/30 px-2.5 py-1 text-[11px] font-semibold">4 yrs younger</span>
      </div>
      <div className="relative h-1.5 rounded-full bg-white/[0.08]">
        <div className="absolute inset-y-0 left-0 w-[46%] rounded-full bg-gradient-to-r from-hos-yellow/40 to-hos-yellow" />
        <span className="absolute top-1/2 left-[46%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-hos-yellow ring-4 ring-hos-yellow/20" />
        <span className="absolute top-1/2 left-[58%] -translate-y-1/2 w-px h-3 bg-white/40" />
      </div>
      <div className="flex gap-2 text-[11px] text-white/55">
        {['Sleep', 'HbA1c', 'Vitamin D'].map((f) => (
          <span key={f} className="rounded-full bg-white/[0.04] ring-1 ring-white/[0.08] px-2.5 py-0.5">{f}</span>
        ))}
      </div>
    </div>
  );
};

export const Developers: React.FC = () => {
  const [tab, setTab] = useState<Tab>('Reports');
  const ex = examples[tab];
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

        <Reveal delay={150} className="relative">
          <div aria-hidden="true" className="absolute -inset-10 bg-[radial-gradient(closest-side,rgba(245,217,123,0.12),transparent)]" />
          <div className="relative rounded-[22px] p-px bg-[linear-gradient(150deg,rgba(245,217,123,0.45),rgba(255,255,255,0.08)_30%,rgba(255,255,255,0.04)_70%,rgba(245,217,123,0.2))] shadow-[0_50px_120px_-50px_rgba(0,0,0,0.9)]">
            <div className="rounded-[21px] bg-ink-900 overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-3 px-4 h-11 border-b border-white/[0.06] bg-white/[0.02]">
                <span aria-hidden="true" className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                </span>
                <span className="dk-code text-[11px] text-white/50 truncate">{ex.file}</span>
                <span className="ml-auto shrink-0 rounded-full bg-white/[0.04] ring-1 ring-white/[0.08] px-2.5 py-0.5 text-[10px] text-white/50">Illustrative<span className="hidden sm:inline">, not the published API</span></span>
              </div>

              {/* Tabs */}
              <div role="tablist" aria-label="Code examples" className="flex items-center gap-1 px-3 border-b border-white/[0.06]">
                {(Object.keys(examples) as Tab[]).map((t) => {
                  const Icon = tabIcons[t];
                  return (
                    <button
                      key={t}
                      type="button"
                      role="tab"
                      id={`dev-tab-${t}`}
                      aria-selected={tab === t}
                      aria-controls="dev-panel"
                      onClick={() => setTab(t)}
                      className={`relative inline-flex items-center gap-1.5 px-3 py-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hos-yellow rounded ${
                        tab === t ? 'text-white' : 'text-white/45 hover:text-white'
                      }`}
                    >
                      <Icon aria-hidden="true" className={`w-3.5 h-3.5 ${tab === t ? 'text-hos-yellow' : ''}`} />
                      {t}
                      {tab === t && <span aria-hidden="true" className="absolute inset-x-2 -bottom-px h-px bg-hos-yellow" />}
                    </button>
                  );
                })}
              </div>

              <div id="dev-panel" role="tabpanel" aria-labelledby={`dev-tab-${tab}`} key={tab} style={{ animation: 'hos-fade-up 0.35s ease both' }}>
                {/* Code */}
                <pre className="dk-code py-5 text-[12.5px] leading-6 overflow-x-auto">
                  <code>
                    {ex.code.map((line, i) => (
                      <span key={i} className="flex">
                        <span aria-hidden="true" className="w-12 shrink-0 pr-4 text-right text-white/20 select-none">{i + 1}</span>
                        <span className="whitespace-pre pr-5">
                          {line.length === 0 ? ' ' : line.map(([kind, text], j) => <span key={j} className={tokClass[kind]}>{text}</span>)}
                        </span>
                      </span>
                    ))}
                  </code>
                </pre>

                {/* Response */}
                <div className="border-t border-white/[0.06] bg-ink-950/60 px-5 pt-4 pb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">Response</span>
                    <span className="inline-flex items-center gap-2 text-[11px] text-white/45">
                      <span className="dk-code text-emerald-300">200 OK</span>
                      <span aria-hidden="true">·</span>
                      Sample data
                    </span>
                  </div>
                  <div className="min-h-[132px]">
                    <Response tab={tab} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
