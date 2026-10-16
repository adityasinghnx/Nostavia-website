import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Brain,
  CheckCircle2,
  Code2,
  Download,
  FileCheck2,
  FlaskConical,
  Hammer,
  HeartPulse,
  KeyRound,
  Network,
  RefreshCw,
  Search,
  Smartphone,
  Stethoscope,
  TrendingUp,
  Zap,
} from 'lucide-react';
import {
  CtaBand,
  FaqList,
  Feature,
  FeatureGrid,
  ModuleCards,
  PageHero,
  Panel,
  Section,
  SectionHead,
  SplitSection,
  StatRow,
  StepList,
} from '../../components/page/PageKit';
import { SectionHeading, focusRing } from '../../components/home/shared';
import { Reveal, useInView } from '../../components/home/motion';
import { Disclaimer } from '../../components/human-os/Disclaimer';
import { DISCLAIMER, numberWord, systemPath, systems, totalLive, totalSystems } from '../../content/human-os';
import { trustGroup, trustGroups, trustPick } from '../../content/trust.config';
import { useSeo } from '../../lib/useSeo';

/* ─────────────────────────────────────────────────────────────────────────────
 * SDK (route /solutions/gravity). The Intelligence SDK and Wearables SDK: Human OS
 * inside a partner's existing app. Facts come from this page's previous copy,
 * human-os.ts, the pricing page and trust.config.ts.
 * ──────────────────────────────────────────────────────────────────────────── */

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const inlineLink = `font-semibold text-hos-black underline underline-offset-4 decoration-hos-yellow decoration-2 hover:decoration-hos-amber ${focusRing}`;

const fadeUp = (i: number): React.CSSProperties => ({ animation: `hos-fade-up 0.6s cubic-bezier(0.2,0.7,0.2,1) ${0.2 + i * 0.15}s both` });

/* ── Hero visual: an SDK call returning decoded markers into the partner's own UI (sample values) ── */
const SdkCallCard: React.FC = () => (
  <div
    className="hos-anim w-[300px] max-w-full rounded-2xl p-4 bg-hos-navy/95 text-white ring-1 ring-white/10 backdrop-blur-md shadow-[0_24px_60px_-20px_rgba(10,10,11,0.45)]"
    style={{ animation: 'hos-fade-up 0.6s cubic-bezier(0.2,0.7,0.2,1) both' }}
  >
    <div className="flex items-center justify-between gap-3 mb-3">
      <span className="flex items-center gap-2 min-w-0 text-xs font-bold">
        <span className="w-7 h-7 shrink-0 rounded-lg bg-white/10 text-hos-yellow flex items-center justify-center">
          <Code2 className="w-3.5 h-3.5" />
        </span>
        <span className="truncate">Your app · SDK call</span>
      </span>
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Illustrative</span>
    </div>
    <div className="rounded-lg bg-hos-black/40 px-3 py-2 text-[11px] text-slate-300" style={{ fontFamily: MONO, ...fadeUp(0) }}>
      <span className="text-hos-yellow">await</span> health.reports.<span className="text-white font-semibold">decode</span>(pdf)
    </div>
    <ul className="mt-3 space-y-1.5">
      {(
        [
          ['HbA1c', 'Optimal', 'bg-hos-yellow text-hos-black'],
          ['Vitamin D', 'Outlier', 'border border-hos-yellow text-hos-yellow'],
          ['LDL', 'In range', 'bg-white/10 text-slate-200'],
        ] as [string, string, string][]
      ).map(([name, verdict, chip], i) => (
        <li key={name} className="flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-1.5 text-[11px]" style={fadeUp(i + 1)}>
          <span className="font-semibold">{name}</span>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${chip}`}>{verdict}</span>
        </li>
      ))}
    </ul>
    <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-slate-300" style={fadeUp(4)}>
      <CheckCircle2 className="w-3.5 h-3.5 text-hos-yellow" />
      Shown in your own screens
    </div>
  </div>
);

/* ── The five-step loop from the previous page copy, mapped to the live modules that do each step ── */
const loop: { name: string; line: string; icon: React.FC<{ className?: string }>; uses: string[] }[] = [
  { name: 'Ingest', line: 'Labs, wearables, nutrition', icon: Download, uses: ['Lab PDFs', 'Apple Health', 'Google Health Connect', 'Meal photos'] },
  { name: 'Decode', line: 'Biomarker extraction', icon: Search, uses: ['Smart Reports', 'Wearable Telemetry', 'Food Intelligence'] },
  { name: 'Reason', line: 'Cross-domain correlation', icon: Brain, uses: ['Correlation Engine'] },
  { name: 'Act', line: 'Protocols and coaching', icon: Zap, uses: ['Adaptive Protocols', 'AI Health Companion'] },
  { name: 'Learn', line: 'Longitudinal memory', icon: TrendingUp, uses: ['Personalisation Engine'] },
];

/** Steps light up in order while the loop is on screen, to show the sequence. Static under reduced motion. */
const SdkLoop: React.FC = () => {
  const { ref, inView } = useInView<HTMLOListElement>(0.3);
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % loop.length), 1800);
    return () => window.clearInterval(id);
  }, [inView]);

  return (
    <div className="space-y-5">
      <ol ref={ref} className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <span aria-hidden="true" className="hidden lg:block absolute left-10 right-10 top-[46px] h-px bg-gradient-to-r from-hos-yellow/60 via-white/15 to-hos-yellow/60" />
        {loop.map(({ name, line, icon: Icon, uses }, i) => {
          const on = i === active;
          return (
            <li key={name} className="relative">
              <Reveal delay={i * 90} className="h-full">
                <div className={`h-full rounded-[16px] border p-5 flex flex-col gap-3 transition-colors duration-500 ${on ? 'bg-white/10 border-hos-yellow/60' : 'bg-white/5 border-white/10'}`}>
                  <span
                    className={`relative z-10 w-11 h-11 rounded-[10px] flex items-center justify-center ring-4 ring-hos-navy transition-colors duration-500 ${
                      on ? 'bg-hos-yellow text-hos-black' : 'bg-[#1C2542] text-hos-yellow'
                    }`}
                  >
                    <Icon aria-hidden="true" className="w-5 h-5" />
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <span className="sr-only">Step </span>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display font-bold text-lg text-white">{name}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{line}</p>
                  <ul className="mt-auto pt-2 flex flex-wrap gap-1.5">
                    {uses.map((u) => (
                      <li key={u} className="rounded-full border border-white/15 px-2 py-0.5 text-[11px] text-slate-200">
                        {u}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
      <Reveal>
        <p className="flex items-start gap-3 text-sm text-slate-300">
          <RefreshCw aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0 text-hos-yellow" />
          {/* TODO(copy) */}
          Learn feeds back into Ingest, so the next call starts from everything the system already knows about that person.
        </p>
      </Reveal>
    </div>
  );
};

/* ── Illustrative code sample. Generic calls only: no real package, key or endpoint. ── */
type Tok = 'c' | 'k' | 'f' | 's' | 'p';
const tokClass: Record<Tok, string> = {
  c: 'text-slate-500 italic',
  k: 'text-hos-yellow',
  f: 'text-white font-semibold',
  s: 'text-hos-cream',
  p: 'text-slate-300',
};

const CODE: [Tok, string][][] = [
  [['c', '// Illustrative example. Not a real API or endpoint.']],
  [['k', 'const '], ['p', 'health = '], ['f', 'createHealthClient'], ['p', '({']],
  [['p', '  session: '], ['k', 'await '], ['p', 'yourServer.'], ['f', 'getSession'], ['p', '(),']],
  [['p', '}) '], ['c', '// keys stay on the server']],
  [],
  [['c', '// Decode a lab report your user uploaded']],
  [['k', 'const '], ['p', 'report = '], ['k', 'await '], ['p', 'health.reports.'], ['f', 'decode'], ['p', '(labPdf)']],
  [['p', 'report.markers.'], ['f', 'forEach'], ['p', '((m) =>']],
  [['p', '  yourUi.'], ['f', 'showMarker'], ['p', '(m.name, m.verdict))']],
  [['c', "// verdict: 'optimal' | 'in range' | 'outlier'"]],
  [],
  [['c', '// Read a wearable summary']],
  [['k', 'const '], ['p', 'sleep = '], ['k', 'await '], ['p', 'health.wearables.'], ['f', 'summary'], ['p', '('], ['s', "'sleep'"], ['p', ')']],
  [],
  [['c', "// Ask for the next step in the member's plan"]],
  [['k', 'const '], ['p', 'step = '], ['k', 'await '], ['p', 'health.protocols.'], ['f', 'next'], ['p', '()']],
];

const CodeSample: React.FC = () => (
  <figure className="rounded-[18px] bg-hos-navy p-2 shadow-[0_40px_90px_-40px_rgba(18,26,49,0.6)]">
    <div aria-hidden="true" className="flex items-center gap-1.5 px-3 py-2">
      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
      <span className="ml-3 rounded-md bg-white/10 px-3 py-1 text-[10px] text-slate-300" style={{ fontFamily: MONO }}>
        your-app.ts
      </span>
      <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-hos-yellow">Illustrative</span>
    </div>
    <pre className="rounded-[12px] bg-hos-black/50 p-4 sm:p-5 text-[12px] sm:text-[13px] leading-6 whitespace-pre-wrap break-words" style={{ fontFamily: MONO }}>
      <code>
        {CODE.map((line, i) => (
          <span key={i} className="grid grid-cols-[1.75rem_minmax(0,1fr)] min-h-[1.5rem]">
            <span aria-hidden="true" className="select-none text-right pr-3 text-slate-600">
              {i + 1}
            </span>
            <span>
              {line.map(([t, s], j) => (
                <span key={j} className={tokClass[t]}>
                  {s}
                </span>
              ))}
            </span>
          </span>
        ))}
      </code>
    </pre>
    <div className="px-3 pt-3 pb-2 space-y-2">
      <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">Sample output, in your UI</div>
      <ul className="flex flex-wrap gap-2">
        {(
          [
            ['HbA1c', 'Optimal'],
            ['Vitamin D', 'Outlier'],
            ['LDL', 'In range'],
          ] as [string, string][]
        ).map(([name, verdict]) => (
          <li key={name} className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white">
            {name} <span className="text-hos-yellow font-bold">· {verdict}</span>
          </li>
        ))}
      </ul>
    </div>
    <figcaption className="sr-only">
      Illustrative code: an app creates a client with a session from its own server, decodes an uploaded lab report into a verdict per marker, reads a wearable sleep summary and asks for
      the next step in the member's plan. Not a real API.
    </figcaption>
  </figure>
);

/* ── Your app on top, the SDKs in the middle, Human OS underneath ── */
const AppStack: React.FC = () => (
  <div className="w-full max-w-md space-y-2">
    <div className="rounded-[14px] bg-white border border-hos-hairline p-4 sm:p-5 shadow-sm" style={fadeUp(0)}>
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-hos-amber">Your app</span>
        <span className="rounded-full bg-hos-mist border border-hos-hairline px-2 py-0.5 text-[10px] font-bold text-hos-black">Unchanged</span>
      </div>
      <div className="mt-2 font-display font-bold text-hos-black">Your screens, brand and user experience</div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-8 rounded-md bg-hos-mist border border-hos-hairline" />
        ))}
      </div>
    </div>
    <div className="flex justify-center">
      <span className="h-5 w-px bg-hos-amber/60" />
    </div>
    <div className="rounded-[14px] bg-hos-navy text-white p-4 sm:p-5" style={fadeUp(1)}>
      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-hos-yellow">Integrated once</span>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <span className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold">Intelligence SDK</span>
        <span className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold">Wearables SDK</span>
      </div>
    </div>
    <div className="flex justify-center">
      <span className="h-5 w-px bg-hos-amber/60" />
    </div>
    <div className="rounded-[14px] bg-white border border-hos-hairline border-l-4 border-l-hos-yellow p-4 sm:p-5" style={fadeUp(2)}>
      <div className="font-display font-bold text-hos-black">Human OS</div>
      <div className="text-xs text-[#475569] mt-0.5">
        {numberWord(totalSystems)} systems · {totalLive} live modules, run by Nostavia
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {systems.map((s) => (
          <span key={s.slug} className="rounded-md bg-hos-mist border border-hos-hairline px-2 py-1 text-[10px] font-bold text-hos-black">
            {s.number}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/* ── The three ways to launch. Kept identical across the SDK, White Label, Custom Build and Smart Reports pages. ── */
type LaunchId = 'sdk' | 'white-label' | 'custom';
const launchOptions: { id: LaunchId; name: string; line: string; fit: string; to: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'sdk', name: 'SDK', line: 'Add health AI to the app you already have.', fit: 'Best when you already run a web or mobile app.', to: '/solutions/gravity', icon: Code2 },
  { id: 'white-label', name: 'White Label', line: 'Our ready-made products, launched as yours.', fit: 'Best when you want a proven product and have no engineering team.', to: '/solutions/storyhealth', icon: Smartphone },
  { id: 'custom', name: 'Custom Build', line: 'Designed and built from scratch for you.', fit: 'Best when you need a product that does not exist yet.', to: '/solutions/engineering', icon: Hammer },
];

const LaunchOptions: React.FC<{ highlight: LaunchId; tag: string; linkHighlight?: boolean }> = ({ highlight, tag, linkHighlight = false }) => (
  <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {launchOptions.map(({ id, name, line, fit, to, icon: Icon }, i) => {
      const on = id === highlight;
      const body = (
        <>
          <span className="flex items-center justify-between gap-3">
            <span className={`w-10 h-10 rounded-[10px] flex items-center justify-center ${on ? 'bg-white/10 text-hos-yellow' : 'bg-hos-mist border border-hos-hairline text-hos-black'}`}>
              <Icon aria-hidden="true" className="w-5 h-5" />
            </span>
            {on && <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-hos-yellow">{tag}</span>}
          </span>
          <h3 className={`font-display font-bold text-xl ${on ? 'text-white' : 'text-hos-black'}`}>{name}</h3>
          <p className={`text-sm leading-relaxed ${on ? 'text-slate-200' : 'text-[#334155]'}`}>{line}</p>
          <p className={`text-sm leading-relaxed ${on ? 'text-slate-300' : 'text-[#475569]'}`}>{fit}</p>
          {(!on || linkHighlight) && (
            <span className={`mt-auto pt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${on ? 'text-white' : 'text-hos-black'}`}>
              Explore {name}
              <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          )}
        </>
      );
      const cls = `group flex flex-col gap-3 h-full rounded-[16px] p-6 sm:p-7 border transition-all duration-300 ${
        on ? 'bg-hos-navy border-hos-navy' : 'bg-white border-hos-hairline'
      }`;
      return (
        <li key={id}>
          <Reveal delay={i * 100} className="h-full">
            {on && !linkHighlight ? (
              <div className={cls}>{body}</div>
            ) : (
              <Link to={to} className={`${cls} hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(18,26,49,0.45)] ${on ? '' : 'hover:border-hos-navy'} ${focusRing}`}>
                {body}
              </Link>
            )}
          </Reveal>
        </li>
      );
    })}
  </ul>
);

/* ── Content ── */

const audiences: Feature[] = [
  {
    icon: FlaskConical,
    title: 'Diagnostic networks',
    body: 'Decode every lab PDF your customers upload into an optimal, in-range or outlier verdict per marker, inside the app they already use.',
    to: '/industries/diagnostic-labs',
  },
  {
    icon: Stethoscope,
    title: 'Longevity clinics',
    body: 'Add Biological Age, disease risk scores and adaptive protocols to the member app you already run.',
    to: '/industries/clinics',
  },
  {
    icon: HeartPulse,
    title: 'Wellness platforms',
    body: 'Bring in Apple Health and Google Health Connect data, food scanning and an AI health companion without rebuilding your product.',
    to: systemPath('ai-concierge'),
  },
];

const coreModules = ['Smart Reports', 'Wearable Telemetry', 'Food Intelligence', 'Adaptive Protocols', 'AI Health Companion', 'Personalisation Engine'];
const growModules = ['Correlation Engine', 'Biological Age', 'Trajectory Engine', 'Disease Risk Engine', 'Sleep & Recovery Engine', 'Performance Intelligence'];

const integrationSteps = [
  { title: 'Scope it together', body: 'A call on live product, not slides. We look at your app and agree which modules to start with.' },
  { title: 'Integrate once', body: 'Our engineer integrates the Intelligence SDK, the Wearables SDK or both alongside your team, with no change to your UI.' },
  { title: 'Try it in a sandbox', body: 'Every module can be tried in a sandbox with fictional data first.' },
  { title: 'Switch on modules', body: 'From the Partner Portal, live on the next API call. Add more as the programme matures; improvements ship server-side.' },
];

const practiceIcons: Record<string, React.FC<{ className?: string }>> = { 'no-keys-on-device': KeyRound, dpdp: FileCheck2, abdm: Network };
const trustFeatures: Feature[] = [
  ...trustPick(['no-keys-on-device', 'dpdp', 'abdm']).map((item) => ({ icon: practiceIcons[item.id], title: item.name, body: item.descriptor ?? '' })),
  { icon: Stethoscope, title: 'Clinical bench review', body: 'Protocol outputs are reviewed by our clinical bench before release to any partner.', to: '/clinical' },
];

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: 'How long does SDK integration take?',
    a: 'Engineers typically integrate the SDK into an existing app within 3 to 5 business days, with our engineer working alongside your team.',
  },
  {
    q: 'Which platforms does the SDK support?',
    a: 'Nostavia provides native iOS (Swift), Android (Kotlin) and web SDKs.',
  },
  {
    q: 'Do we have to change our app design?',
    a: 'No. The SDK sits inside your existing app with no change to your UI or user experience. Results appear in your own screens.',
  },
  {
    q: 'Will our users see the Nostavia name?',
    a: 'No. Every product runs under your brand, inside your app.',
  },
  {
    q: 'Which wearables are supported?',
    a: 'Apple Health and Google Health Connect today. More device feeds are in development.',
  },
  {
    q: 'Can we try it before we commit?',
    a: 'Yes. Every module can be tried in a sandbox with fictional data first.',
  },
  {
    q: 'Do API keys ship inside our app?',
    a: 'No. All AI requests run through a secure server-side proxy. No API keys ship inside any app.',
  },
  {
    q: 'How is the SDK priced?',
    a: (
      <>
        A one-time integration from $999+ plus a monthly plan from $399+/mo. Final pricing depends on scope, and you get a fixed quote after a free call.{' '}
        <Link to="/pricing" className={inlineLink}>
          See pricing
        </Link>
      </>
    ),
  },
  {
    q: 'Is the SDK a medical device?',
    a: DISCLAIMER,
  },
];

export const GravityPage: React.FC = () => {
  useSeo({
    title: 'SDK | Nostavia Health',
    description:
      'Embed Human OS in the app you already have: 100+ biomarker decoding, Apple Health and Google Health Connect data, food scanning, adaptive protocols and an AI health companion, with no change to your UI.',
    path: '/solutions/gravity',
  });

  return (
    <div className="flex flex-col font-body text-hos-black bg-white overflow-x-clip">
      <PageHero
        eyebrow="SDK: add health AI to the app you already have"
        title="Embed whole-body health intelligence directly into your existing app."
        intro="For diagnostic networks, longevity clinics and wellness platforms that already operate a web or mobile application. Embed Human OS with no change to your UI or user experience. Our engineer integrates it alongside your team."
        points={[
          '100+ biomarkers decoded against locally calibrated ranges',
          'Wearable data from Apple Health and Google Health Connect, more device feeds in development',
          'Food scanning, adaptive protocols and an AI concierge',
        ]}
        primary={{ to: '/demo', label: 'Book a demo' }}
        secondary={{ to: '/pricing', label: 'See pricing' }}
        photo={{ src: '/photos/home-sdk-developer.jpg', w: 1600, h: 2402, alt: 'A developer writing code at a desk' }}
        visual={<SdkCallCard />}
      />

      {/* At a glance */}
      <Section bg="mist" labelledBy="sdk-glance-heading">
        {/* TODO(copy) */}
        <SectionHead id="sdk-glance-heading" eyebrow="SDK at a glance" title="Human OS inside the app you already run" />
        <StatRow
          items={[
            { value: 100, suffix: '+', label: 'biomarkers decoded against locally calibrated ranges' },
            { value: 2, label: 'wearable platforms today: Apple Health and Google Health Connect' },
            { value: 0, label: 'changes to your UI or user experience' },
          ]}
        />
      </Section>

      {/* Who it's for */}
      <Section labelledBy="sdk-for-heading">
        {/* TODO(copy) */}
        <SectionHead
          id="sdk-for-heading"
          eyebrow="Who it's for"
          title="For teams that already have an app"
          intro="The SDK is for diagnostic networks, longevity clinics and wellness platforms that already operate a web or mobile application and want health AI inside it."
        />
        <FeatureGrid items={audiences} />
      </Section>

      {/* What's in the SDK */}
      <Section bg="mist" labelledBy="sdk-inside-heading">
        {/* TODO(copy) */}
        <SectionHead
          id="sdk-inside-heading"
          eyebrow="What's in the SDK"
          title="Two SDKs, one integration"
          intro="Integrate once through the Intelligence SDK, the Wearables SDK or both. Then switch on the modules you need from the Partner Portal, live on the next API call."
          action={{ to: '/human-os', label: 'Explore Human OS' }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Reveal className="h-full">
            <Panel className="h-full space-y-4">
              <span className="w-10 h-10 rounded-[10px] bg-hos-navy text-hos-yellow flex items-center justify-center">
                <Code2 aria-hidden="true" className="w-5 h-5" />
              </span>
              <h3 className="font-display font-bold text-2xl text-hos-black">Intelligence SDK</h3>
              {/* TODO(copy) */}
              <p className="text-base text-[#475569] leading-relaxed">
                100+ biomarker decoding, food scanning, adaptive protocols and the AI concierge, called from your app and shown in your own screens.
              </p>
              <ul className="flex flex-wrap gap-2">
                {['Smart Reports', 'Food Intelligence', 'Adaptive Protocols', 'AI Health Companion'].map((m) => (
                  <li key={m} className="rounded-full bg-hos-mist border border-hos-hairline px-3 py-1 text-xs font-semibold text-hos-black">
                    {m}
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>
          <Reveal delay={120} className="h-full">
            <Panel className="h-full space-y-4">
              <span className="w-10 h-10 rounded-[10px] bg-hos-navy text-hos-yellow flex items-center justify-center">
                <Activity aria-hidden="true" className="w-5 h-5" />
              </span>
              <h3 className="font-display font-bold text-2xl text-hos-black">Wearables SDK</h3>
              <p className="text-base text-[#475569] leading-relaxed">
                Wearable data normalised into one schema, with recovery, sleep and biometric summaries. Apple Health and Google Health Connect today, more device feeds in development.
              </p>
              <ul className="flex flex-wrap gap-2">
                {['Apple Health', 'Google Health Connect', 'Wearable Telemetry'].map((m) => (
                  <li key={m} className="rounded-full bg-hos-mist border border-hos-hairline px-3 py-1 text-xs font-semibold text-hos-black">
                    {m}
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>
        </div>

        <div className="space-y-5">
          <Reveal>
            <h3 className="font-display font-semibold text-2xl sm:text-3xl text-hos-black tracking-tight">Modules in the SDK</h3>
          </Reveal>
          <ModuleCards modules={coreModules} />
        </div>

        <div className="space-y-5">
          <Reveal className="space-y-2">
            <h3 className="font-display font-semibold text-2xl sm:text-3xl text-hos-black tracking-tight">Switch on more as you grow</h3>
            <p className="text-base text-[#475569] leading-relaxed max-w-2xl">
              Add modules as the programme matures. Every module can be tried in a sandbox with fictional data first.
            </p>
          </Reveal>
          <ModuleCards modules={growModules} />
        </div>
        <Disclaimer />
      </Section>

      {/* How the SDK works */}
      <Section bg="navy" labelledBy="sdk-loop-heading">
        <SectionHead
          id="sdk-loop-heading"
          tone="dark"
          eyebrow="How the SDK works"
          title="Intelligence that remembers, reasons and adapts"
          intro="Five capabilities in a continuous loop. Each call to the SDK draws on everything the system has learned about that individual."
        />
        <SdkLoop />
      </Section>

      {/* For your engineers */}
      <Section labelledBy="sdk-code-heading">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <Reveal className="lg:col-span-5 space-y-6 min-w-0">
            {/* TODO(copy) */}
            <SectionHeading
              id="sdk-code-heading"
              eyebrow="For your engineers"
              title="A few calls, not a rebuild"
              intro="Your app keeps its screens. It asks the SDK for decoded results, wearable summaries and the next step in a member's plan, then shows them in your own components."
            />
            <ul className="divide-y divide-hos-hairline border-y border-hos-hairline">
              {[
                'All AI requests run through a secure server-side proxy. No API keys ship inside any app.',
                'Every module can be tried in a sandbox with fictional data first.',
                'Improvements ship server-side, with no app update for you.',
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 py-3 text-base text-[#334155]">
                  <span aria-hidden="true" className="mt-2.5 w-4 h-[3px] shrink-0 bg-hos-yellow" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-7 min-w-0">
            <CodeSample />
          </Reveal>
        </div>
      </Section>

      {/* No change to your UI */}
      <SplitSection
        id="sdk-yours-heading"
        bg="mist"
        reverse
        eyebrow="No change to your UI"
        /* TODO(copy) */
        title="Your app, your brand. Our intelligence underneath."
        intro="The SDK runs inside the app you already have, with no change to your UI or user experience. Your users never see the Nostavia name."
        bullets={[
          'Results appear in your own screens and components.',
          'Every product runs under your brand.',
          'Improvements ship server-side, with no app update for you.',
          'Our engineer integrates it alongside your team.',
        ]}
        visual={<AppStack />}
      />

      {/* Integration steps */}
      <Section labelledBy="sdk-steps-heading">
        {/* TODO(copy) */}
        <SectionHead id="sdk-steps-heading" eyebrow="Integration" title="From scoping call to live, alongside your team" action={{ to: '/demo', label: 'Book a scoping call' }} />
        <StepList steps={integrationSteps} />
      </Section>

      {/* Delivery and pricing */}
      <Section bg="mist" labelledBy="sdk-pricing-heading">
        {/* TODO(copy) */}
        <SectionHead
          id="sdk-pricing-heading"
          eyebrow="Delivery and pricing"
          title="A one-time integration plus a monthly plan"
          intro="Every project has a one-time build fee and a monthly plan. Final pricing depends on scope, and you get a fixed quote after a free call."
          action={{ to: '/pricing', label: 'See full pricing' }}
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <Reveal className="lg:col-span-7 h-full">
            <Panel dark className="h-full">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="border-t border-white/15 pt-5">
                  <dt className="text-sm text-slate-300">One-time integration</dt>
                  <dd className="mt-3 font-display font-semibold text-5xl tracking-tight">$999+</dd>
                  <dd aria-hidden="true" className="mt-4 h-[3px] w-10 bg-hos-yellow" />
                </div>
                <div className="border-t border-white/15 pt-5">
                  <dt className="text-sm text-slate-300">Monthly plan</dt>
                  <dd className="mt-3 font-display font-semibold text-5xl tracking-tight">$399+/mo</dd>
                  <dd aria-hidden="true" className="mt-4 h-[3px] w-10 bg-hos-yellow" />
                </div>
              </dl>
            </Panel>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5 h-full">
            <Panel className="h-full space-y-4">
              <h3 className="font-display font-bold text-lg text-hos-black">What the monthly plan covers</h3>
              <p className="text-sm text-[#475569] leading-relaxed">Hosting, AI, updates and support.</p>
              <p className="text-sm text-[#475569] leading-relaxed">All prices in USD, excluding applicable taxes. INR and AED quotes are available on request.</p>
              <Link to="/pricing" className={`${inlineLink} inline-flex items-center gap-2 text-sm`}>
                Compare all products and prices
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </Panel>
          </Reveal>
        </div>
        <div className="space-y-5">
          <Reveal>
            <h3 className="font-display font-semibold text-2xl sm:text-3xl text-hos-black tracking-tight">Three ways to launch</h3>
          </Reveal>
          <LaunchOptions highlight="sdk" tag="This page" />
        </div>
      </Section>

      {/* Security and governance */}
      <Section labelledBy="sdk-trust-heading">
        {/* TODO(copy) */}
        <SectionHead
          id="sdk-trust-heading"
          eyebrow="Security and governance"
          title="Keys on the server, data handled with care"
          action={{ to: '/security', label: 'Security and compliance' }}
        />
        <FeatureGrid items={trustFeatures} columns={4} />
        <Reveal>
          <Panel className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-hos-grey">{trustGroups.infrastructure.heading}</h3>
              <ul className="flex flex-wrap gap-x-10 gap-y-4">
                {trustGroup('infrastructure').map((item) => (
                  <li key={item.id}>
                    <span className="block font-display font-bold text-hos-black">{item.name}</span>
                    <span className="block text-xs text-[#475569] mt-0.5">{item.descriptor}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed lg:max-w-xs">{trustGroups.infrastructure.caption}</p>
          </Panel>
        </Reveal>
        <Disclaimer />
      </Section>

      <FaqList id="sdk-faq-heading" title="What developers and product leaders ask about the SDK" items={faqs} />

      <CtaBand
        title="Embed the Nostavia Intelligence SDK"
        highlight="into your product."
        body="Thirty minutes on live product, not slides. Bring your app and we'll show you where the SDK fits."
        primary={{ to: '/demo', label: 'Book a demo' }}
      />
    </div>
  );
};
