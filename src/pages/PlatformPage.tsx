import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Code2,
  Database,
  FileText,
  HeartPulse,
  Layers,
  LayoutDashboard,
  Network,
  PhoneCall,
  Smartphone,
} from 'lucide-react';
import {
  CtaBand,
  FaqList,
  Feature,
  FeatureGrid,
  PageHero,
  Panel,
  Section,
  SectionHead,
  SplitSection,
  StatRow,
  StepList,
  textLink,
} from '../components/page/PageKit';
import { focusRing } from '../components/home/shared';
import { Reveal } from '../components/home/motion';
import { FoodScanCard, IntakeBriefCard, SmartReportCard } from '../components/home/LiveCards';
import { Disclaimer } from '../components/human-os/Disclaimer';
import { InfrastructureGroup, PracticeChips } from '../components/trust/TrustElements';
import {
  DISCLAIMER,
  RingId,
  findModule,
  getRing,
  numberWord,
  steps,
  systemPath,
  systemsInRing,
  totalLive,
  totalSystems,
} from '../content/human-os';
import { TRUST_CONTACT, trustPick } from '../content/trust.config';
import { useSeo } from '../lib/useSeo';

/* ─────────────────────────────────────────────────────────────────────────────
 * Technology page (/platform). Facts come from the previous version of this page,
 * human-os.ts, trust.config.ts and copy already published on the homepage
 * (integrations, FAQ, Partner Portal). No model sizes or vendor names.
 * ──────────────────────────────────────────────────────────────────────────── */

/* ── Human OS architecture: the two rings, live modules only ── */

const RingBlock: React.FC<{ id: RingId }> = ({ id }) => {
  const ring = getRing(id);
  const dark = id === 'team';
  const ringSystems = systemsInRing(id);
  return (
    <Reveal>
      <div className={`rounded-[20px] p-5 sm:p-8 border ${dark ? 'bg-hos-navy border-hos-navy text-white' : 'bg-white border-hos-hairline'}`}>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 lg:gap-10 mb-6">
          <div className="space-y-1.5">
            <span aria-hidden="true" className="block h-[3px] w-10 bg-hos-yellow mb-4" />
            <h3 className={`font-display font-semibold text-2xl tracking-tight ${dark ? 'text-white' : 'text-hos-black'}`}>{ring.name}</h3>
            <p className={`text-sm font-semibold ${dark ? 'text-hos-yellow' : 'text-hos-amber'}`}>{ring.audience}</p>
          </div>
          <p className={`text-sm leading-relaxed max-w-xl ${dark ? 'text-slate-300' : 'text-[#475569]'}`}>{ring.summary}</p>
        </div>
        <ul className={`grid grid-cols-1 sm:grid-cols-2 ${ringSystems.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-3`}>
          {ringSystems.map((system) => {
            const live = system.modules.filter((m) => m.status === 'live');
            return (
              <li key={system.slug}>
                <div
                  className={`h-full flex flex-col gap-3 rounded-[14px] p-5 border ${
                    dark ? 'bg-white/5 border-white/10' : 'bg-hos-mist border-hos-hairline'
                  }`}
                >
                  <span className={`font-mono text-xs font-bold tracking-widest ${dark ? 'text-hos-yellow' : 'text-hos-amber'}`}>{system.number}</span>
                  <h4 className="font-display font-bold text-lg leading-snug">
                    <Link
                      to={systemPath(system.slug)}
                      className={`underline-offset-4 hover:underline ${dark ? 'text-white decoration-hos-yellow' : 'text-hos-black decoration-hos-amber'} ${focusRing}`}
                    >
                      {system.name}
                    </Link>
                  </h4>
                  <p className={`text-sm leading-relaxed ${dark ? 'text-slate-300' : 'text-[#475569]'}`}>{system.promise}</p>
                  <ul className="mt-auto pt-2 flex flex-wrap gap-1.5" aria-label={`${system.name} modules available today`}>
                    {live.map((m) => (
                      <li
                        key={m.name}
                        className={`text-[11px] font-semibold rounded-full px-2.5 py-1 border ${
                          dark ? 'border-white/15 text-slate-200' : 'border-hos-hairline bg-white text-hos-black'
                        }`}
                      >
                        {m.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Reveal>
  );
};

/* ── Four layers: interactive explorer ── */

interface PlatformLayer {
  id: string;
  number: string;
  name: string;
  summary: string;
  items: string[];
  modules: string[];
}

/* Items restate the previous page's layer copy plus facts from human-os.ts, the homepage integrations block and trust.config. */
const layers: PlatformLayer[] = [
  {
    id: 'l1',
    number: 'L1',
    name: 'Ingestion',
    // TODO(copy): layer summaries
    summary: 'Brings fragmented health data in from the systems you already run and gives it one structure.',
    items: [
      'Native lab-PDF parsing, including digital-signature handling',
      'Wearable data pipelines through Apple Health and Google Health Connect',
      'HIS exports in CSV, Excel or PDF',
      'Records structured to FHIR R4',
      "Architecture built for India's Ayushman Bharat Digital Mission (ABDM and ABHA)",
    ],
    modules: ['Smart Reports', 'Wearable Telemetry'],
  },
  {
    id: 'l2',
    number: 'L2',
    name: 'Decoding',
    summary: 'Turns isolated numbers into interpreted signals that every other system builds on.',
    items: [
      '100+ biomarkers, each classified optimal, in-range or outlier against locally calibrated ranges',
      'Food bio-impact models: a meal photo becomes a predicted glucose curve',
      'Wearable signal normalisation into one schema, with recovery, sleep and biometric summaries',
      'Results kept for longitudinal trends',
    ],
    modules: ['Smart Reports', 'Food Intelligence', 'Wearable Telemetry'],
  },
  {
    id: 'l3',
    number: 'L3',
    name: 'Intelligence core',
    summary: 'Reasons across every decoded signal for one person, and across a whole population for the team.',
    items: [
      'Trajectory Engine projections, from three hours to ten years ahead',
      'Whole-body correlation across domains, such as sleep and glucose',
      'Biological Age and disease risk scores, with the factors behind each',
      'Adaptive Protocols, reviewed by the clinical bench',
      "An AI Health Companion that answers questions about the member's own data",
    ],
    modules: ['Trajectory Engine', 'Correlation Engine', 'Biological Age', 'Disease Risk Engine', 'Adaptive Protocols', 'AI Health Companion'],
  },
  {
    id: 'l4',
    number: 'L4',
    name: 'Delivery surface',
    summary: 'Where your users and teams meet the intelligence, always under your brand.',
    items: [
      'Intelligence SDK inside the app you already have',
      'Wearables SDK: one integration for wearable data',
      'A white-label app carrying your name',
      'An AI Voice Agent on your phone line',
      'Partner dashboards and co-branding',
    ],
    modules: ['AI Voice Agent', 'Clinical Intake Briefs', 'B2B Analytics Dashboard'],
  },
];

const LayerExplorer: React.FC = () => {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const layer = layers[active];

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % layers.length;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + layers.length) % layers.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = layers.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <Reveal>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        {/* Layer stack, delivery surface on top */}
        <div role="tablist" aria-label="Platform layers" aria-orientation="vertical" className="lg:col-span-5 flex flex-col-reverse gap-3">
          {layers.map((l, i) => {
            const selected = i === active;
            return (
              <button
                key={l.id}
                ref={(el) => (tabs.current[i] = el)}
                type="button"
                role="tab"
                id={`layer-tab-${l.id}`}
                aria-selected={selected}
                aria-controls={`layer-panel-${l.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`group relative w-full text-left rounded-[14px] border p-5 transition-all duration-300 motion-reduce:transition-none ${
                  selected
                    ? 'bg-hos-navy border-hos-navy text-white shadow-[0_24px_50px_-28px_rgba(18,26,49,0.7)] lg:translate-x-3'
                    : 'bg-white border-hos-hairline text-hos-black hover:border-hos-navy'
                } ${focusRing}`}
              >
                <span className="flex items-center gap-4">
                  <span
                    className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center font-display font-semibold text-sm ${
                      selected ? 'bg-hos-yellow text-hos-black' : 'bg-hos-mist border border-hos-hairline text-hos-black'
                    }`}
                  >
                    {l.number}
                  </span>
                  <span className="min-w-0">
                    <span className={`block font-mono text-[10px] font-bold uppercase tracking-widest ${selected ? 'text-hos-yellow' : 'text-hos-amber'}`}>
                      Layer {i + 1}
                    </span>
                    <span className="block font-display font-bold text-lg leading-snug">{l.name}</span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className={`ml-auto w-4 h-4 shrink-0 transition-transform motion-reduce:transition-none ${selected ? 'text-hos-yellow translate-x-0.5' : 'text-hos-grey'}`}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`layer-panel-${layer.id}`}
          aria-labelledby={`layer-tab-${layer.id}`}
          tabIndex={0}
          className={`lg:col-span-7 rounded-[20px] bg-white border border-hos-hairline p-6 sm:p-9 flex flex-col gap-6 ${focusRing}`}
        >
          <div key={layer.id} className="hos-anim space-y-6" style={{ animation: 'hos-fade-up 0.45s cubic-bezier(0.2,0.7,0.2,1) both' }}>
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-hos-amber">
                {layer.number} · {layer.name}
              </span>
              <h3 className="font-display font-semibold text-2xl sm:text-3xl tracking-tight text-hos-black">{layer.summary}</h3>
            </div>
            <ul className="divide-y divide-hos-hairline border-y border-hos-hairline">
              {layer.items.map((item) => (
                <li key={item} className="flex items-start gap-3 py-3 text-base text-[#334155]">
                  <span aria-hidden="true" className="mt-2.5 w-4 h-[3px] shrink-0 bg-hos-yellow" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="space-y-3">
              <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest text-hos-grey">Modules working at this layer</h4>
              <ul className="flex flex-wrap gap-2">
                {layer.modules.map((name) => {
                  const mod = findModule(name);
                  if (!mod) return null;
                  return (
                    <li key={name}>
                      <Link
                        to={systemPath(mod.system.slug)}
                        className={`inline-flex items-center gap-1.5 rounded-full border border-hos-hairline bg-hos-mist hover:border-hos-navy px-3 py-1.5 text-xs font-semibold text-hos-black transition-colors ${focusRing}`}
                      >
                        {name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

/* ── How data flows ── */

/* Same facts as the homepage integrations block: Smart Reports, Wearable Telemetry, HIS exports, FHIR R4, ABDM. */
const sources: { name: string; line: string; icon: React.FC<{ className?: string }> }[] = [
  { name: 'Lab PDFs', line: 'Any lab PDF, regardless of layout', icon: FileText },
  { name: 'Apple Health', line: 'Wearable and activity data on iOS', icon: HeartPulse },
  { name: 'Google Health Connect', line: 'Wearable and activity data on Android', icon: Activity },
  { name: 'HIS exports', line: 'CSV, Excel or PDF exports from your HIS', icon: Database },
  { name: 'FHIR R4', line: 'Structured clinical records to FHIR R4', icon: Layers },
];

const stages: { name: string; line: string }[] = [
  { name: 'Ingest', line: 'Parsed and structured into one schema' },
  { name: 'Decode', line: 'Read against locally calibrated ranges' },
  { name: 'Reason', line: 'Correlated, scored and projected' },
  { name: 'Review', line: 'Clinical guardrails and human approval' },
];

const surfaces: { name: string; line: string; icon: React.FC<{ className?: string }> }[] = [
  { name: 'SDK', line: 'Inside the app you already have', icon: Code2 },
  { name: 'White-label app', line: 'Your own iOS and Android app', icon: Smartphone },
  { name: 'Voice agent', line: 'On your phone line, in local languages', icon: PhoneCall },
  { name: 'Dashboards', line: 'Cohort risk and executive reporting', icon: LayoutDashboard },
];

const FlowTile: React.FC<{ name: string; line: string; icon: React.FC<{ className?: string }> }> = ({ name, line, icon: Icon }) => (
  <li className="flex items-start gap-3 rounded-[12px] p-3.5 bg-white/5 border border-white/10">
    <span className="w-9 h-9 shrink-0 rounded-[10px] bg-white/10 text-hos-yellow flex items-center justify-center">
      <Icon aria-hidden="true" className="w-4 h-4" />
    </span>
    <span>
      <span className="block font-display font-bold text-sm text-white">{name}</span>
      <span className="block text-xs leading-relaxed mt-0.5 text-slate-300">{line}</span>
    </span>
  </li>
);

/** Dots moving left to right on desktop, top to bottom on mobile. Shows the direction of data. */
const Stream: React.FC<{ offset?: number }> = ({ offset = 0 }) => (
  <div aria-hidden="true" className="hos-anim flex items-center justify-center py-1 lg:py-0">
    <div className="hidden lg:flex flex-col gap-6">
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="relative w-16 h-px bg-white/20">
          <span
            className="absolute -top-[3px] left-0 w-1.5 h-1.5 rounded-full bg-hos-yellow"
            style={{ animation: `hos-flow 2.4s linear ${offset + row * 0.35}s infinite` }}
          />
        </div>
      ))}
    </div>
    <div className="lg:hidden relative h-12 w-px bg-white/20">
      {[0, 1].map((d) => (
        <span
          key={d}
          className="absolute -left-[3px] top-0 w-1.5 h-1.5 rounded-full bg-hos-yellow"
          style={{ animation: `hos-flow-y 1.8s linear ${offset + d * 0.9}s infinite` }}
        />
      ))}
    </div>
  </div>
);

const DataFlow: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.9fr)_auto_minmax(0,1fr)] gap-3 lg:gap-4 items-center">
    <Reveal className="h-full">
      <div className="h-full rounded-[16px] border border-white/10 bg-white/[0.03] p-5 sm:p-6 space-y-4">
        <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-hos-yellow">Data in</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
          {sources.map((s) => (
            <FlowTile key={s.name} {...s} />
          ))}
        </ul>
        <p className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed pt-1">
          <Network aria-hidden="true" className="w-4 h-4 shrink-0 text-hos-yellow mt-px" />
          ABDM and ABHA ready: architecture built for India's Ayushman Bharat Digital Mission.
        </p>
      </div>
    </Reveal>

    <Stream />

    <Reveal delay={120} className="h-full">
      <div className="h-full rounded-[16px] bg-white text-hos-black p-5 sm:p-6 flex flex-col gap-4 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="w-11 h-11 rounded-[12px] bg-hos-navy flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-7 h-7">
              <polygon points="20,8 34,16 20,24 6,16" fill="#F5D97B" />
              <polygon points="6,16 20,24 34,16 34,19 20,27 6,19" fill="#C9A94F" />
              <polygon points="6,23 20,31 34,23 34,26 20,34 6,26" fill="#FFFFFF" fillOpacity="0.35" />
            </svg>
          </span>
          <div>
            <h3 className="font-display font-bold text-lg leading-tight">Human OS</h3>
            <p className="text-xs text-hos-grey">Invisible to your users</p>
          </div>
        </div>
        <ol className="relative space-y-2">
          <span aria-hidden="true" className="absolute left-[15px] top-4 bottom-4 w-px bg-hos-hairline" />
          {stages.map((s, i) => (
            <li key={s.name} className="relative flex items-start gap-3 rounded-[10px] p-2">
              <span className="relative z-10 w-8 h-8 shrink-0 rounded-full bg-hos-mist border border-hos-hairline flex items-center justify-center font-display font-semibold text-xs">
                {i + 1}
              </span>
              <span>
                <span className="block font-display font-bold text-sm">{s.name}</span>
                <span className="block text-xs text-[#475569] leading-relaxed">{s.line}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>

    <Stream offset={0.6} />

    <Reveal delay={240} className="h-full">
      <div className="h-full rounded-[16px] border border-white/10 bg-white/[0.03] p-5 sm:p-6 space-y-4">
        <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-hos-yellow">Delivered as</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
          {surfaces.map((s) => (
            <FlowTile key={s.name} {...s} />
          ))}
        </ul>
        <p className="text-xs text-slate-300 leading-relaxed pt-1">Under your brand. Your users never see the Nostavia name.</p>
      </div>
    </Reveal>
  </div>
);

/* ── Delivery surfaces ── */

/* Copy restates the previous page's three integration modes plus module descriptions from human-os.ts. */
const deliveryFeatures: Feature[] = [
  {
    icon: Code2,
    title: 'Intelligence SDK and Wearables SDK',
    body: 'For platforms and clinics operating an existing app. Lab decoding, food scanning, protocols and the AI concierge embed directly into your code, and user UX is unchanged. The Wearables SDK normalises Apple Health and Google Health Connect data through a single integration, with more device feeds in development.',
    to: '/solutions/gravity',
  },
  {
    icon: Smartphone,
    title: 'White-label app',
    body: 'For labs and clinics with no application of their own. A complete, fully branded application carrying your name, operated by Nostavia. No engineering team needed.',
    to: '/solutions/storyhealth',
  },
  {
    icon: PhoneCall,
    title: 'AI Voice Agent',
    body: findModule('AI Voice Agent')?.description ?? '',
    to: '/solutions/front-desk',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboards',
    body: "Cohort risk insights and executive reporting across your whole population, with partner dashboards and co-branding for your clinical teams.",
    to: '/human-os/command-center',
  },
];

/* ── Reasoning pipeline ── */

const reasoningSteps: { title: string; body: React.ReactNode }[] = [
  {
    title: 'Structure',
    body: 'Lab PDFs, wearable data and HIS exports are parsed and normalised into one schema before any reasoning runs.',
  },
  {
    title: 'Ground',
    body: "Every marker is read against locally calibrated reference ranges, so reasoning starts from the person's own decoded data.",
  },
  {
    title: 'Reason',
    // TODO(copy): model-agnostic wording, confirm with CTO
    body: 'A model-agnostic reasoning layer correlates signals across domains, scores risk and projects trajectories. No single AI vendor is hard-wired into your product, and every AI request runs through a secure server-side proxy.',
  },
  {
    title: 'Review',
    body: 'Protocol outputs are reviewed by our licensed clinical advisory bench before release to any partner. In agent workflows, a human approves anything clinical.',
  },
];

/* ── FAQ: answers restate facts already published on the site ── */

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Do we need to change our app or our HIS?',
    a: 'No. The SDK sits inside your existing app with no change to your UI, and hospital programmes start from a single data export from your HIS team.',
  },
  {
    q: 'Which wearables are supported?',
    a: 'Apple Health and Google Health Connect today, normalised into one schema. More device feeds are in development.',
  },
  {
    q: 'Can we try a module before it goes live?',
    a: 'Yes. Every module can be tried in a sandbox with fictional data first, then switched on from the Partner Portal, live on the next API call.',
  },
  {
    q: 'Do we have to ship an app update when the platform improves?',
    a: 'No. Improvements ship server-side, with no app update for the partner.',
  },
  {
    q: 'Do any API keys ship inside our app?',
    a: 'No. All AI requests run through a secure server-side proxy. No API keys ship inside any app.',
  },
  {
    q: 'Is the on-device model available today?',
    a: 'Not yet. SOMA, our on-device model, is in development and is not part of the live platform today.',
  },
  {
    q: 'Is Nostavia a medical device?',
    a: DISCLAIMER,
  },
  {
    q: 'How is it priced?',
    a: (
      <>
        A one-time build fee plus a monthly plan.{' '}
        <Link to="/pricing" className={`font-semibold text-hos-black underline underline-offset-4 decoration-hos-yellow ${focusRing}`}>
          See pricing
        </Link>
      </>
    ),
  },
];

export const PlatformPage: React.FC = () => {
  useSeo({
    title: 'Technology | Nostavia Health',
    description:
      'How Human OS works: lab PDFs, Apple Health, Google Health Connect, HIS exports and FHIR R4 records in; a four-layer clinical reasoning pipeline; delivery by SDK, white-label app, voice agent and dashboards under your brand.',
    path: '/platform',
  });

  return (
    <div className="flex flex-col font-body text-hos-black bg-white overflow-x-clip">
      <PageHero
        eyebrow="Technology"
        title="The whole-body health-intelligence layer for the health economy."
        intro="Nostavia is B2B health-tech infrastructure. We build the intelligence layer diagnostic labs, clinics, wellness platforms and insurers embed inside their own products under their own brand. Partners keep their interface. Nostavia remains invisible."
        points={[
          'Lab PDFs, Apple Health, Google Health Connect, HIS exports and FHIR R4 records in',
          `${numberWord(totalSystems)} systems and ${totalLive} live modules on one platform`,
          'Delivered by SDK, white-label app, voice agent and dashboards',
        ]}
        primary={{ to: '/demo', label: 'Book a demo' }}
        secondary={{ to: '/human-os', label: 'Explore Human OS' }}
        photo={{ src: '/platform-bg.jpg', w: 2160, h: 3840, alt: 'Abstract stacked yellow layers' }}
        visual={<SmartReportCard />}
      />

      {/* At a glance */}
      <Section bg="navy" labelledBy="platform-glance-heading">
        {/* TODO(copy): section heading */}
        <SectionHead id="platform-glance-heading" eyebrow="Human OS today" title="One platform underneath every product" tone="dark" />
        <StatRow
          dark
          items={[
            { value: totalSystems, label: 'systems in two rings, one for the people you serve and one for the team that serves them' },
            { value: totalLive, label: 'live modules, switchable from the Partner Portal' },
            { value: 100, suffix: '+', label: 'biomarkers decoded against locally calibrated ranges' },
            { value: 4, label: 'layers from raw data to your delivery surface' },
          ]}
        />
      </Section>

      {/* Human OS architecture */}
      <Section labelledBy="platform-architecture-heading">
        {/* TODO(copy): section heading and intro */}
        <SectionHead
          id="platform-architecture-heading"
          eyebrow="Human OS architecture"
          title={`${numberWord(totalSystems)} systems in two rings`}
          intro="Human OS is the platform every Nostavia product runs on. The Person ring lives with the member or patient. The Team ring runs the organisation that serves them. Both share one integration."
          action={{ to: '/human-os', label: 'Explore every system' }}
        />
        <div className="space-y-4">
          <RingBlock id="person" />
          <div aria-hidden="true" className="flex flex-col items-center">
            <span className="w-px h-5 bg-hos-yellow" />
            <span className="px-3 py-1 rounded-full border border-hos-hairline bg-white font-mono text-[10px] font-bold uppercase tracking-widest text-hos-black">
              One integration
            </span>
            <span className="w-px h-5 bg-hos-yellow" />
          </div>
          <RingBlock id="team" />
        </div>
      </Section>

      {/* Four layers */}
      <Section bg="mist" labelledBy="platform-layers-heading">
        <SectionHead
          id="platform-layers-heading"
          eyebrow="The four layers of Nostavia"
          title="Everything beneath the delivery surface is invisible to the partner."
          intro="Fragmented health data goes in. Structured, personalised intelligence comes out. Select a layer to see what it does and which modules work there."
        />
        <LayerExplorer />
      </Section>

      {/* How data flows */}
      <Section bg="navy" labelledBy="platform-flow-heading">
        {/* TODO(copy): section heading and intro */}
        <SectionHead
          id="platform-flow-heading"
          eyebrow="How data flows"
          title="Bring the data you already have. Deliver wherever your customers are."
          intro="Data arrives from the systems you already run, moves through four stages inside Human OS, and comes out on the surface that fits your business."
          tone="dark"
        />
        <DataFlow />
      </Section>

      {/* Delivery surfaces */}
      <Section labelledBy="platform-delivery-heading">
        <SectionHead
          id="platform-delivery-heading"
          eyebrow="Delivery surfaces"
          title="Integrate once. Your product becomes materially more intelligent."
          // TODO(copy): section intro
          intro="Pick the surface that matches how you reach people today. Every one runs under your brand, and you can add more as the programme grows."
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          <Reveal className="lg:col-span-5">
            <div className="relative h-full min-h-[420px] rounded-[20px] overflow-hidden bg-hos-navy">
              <img
                src="/photos/home-sdk-developer.jpg"
                alt="A developer writing code at a desk"
                width={1600}
                height={2402}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-hos-black/60 via-transparent to-transparent" />
              <div aria-hidden="true" className="absolute left-4 right-4 bottom-4 sm:left-6 sm:right-auto sm:bottom-6">
                <FoodScanCard />
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <FeatureGrid items={deliveryFeatures} columns={2} />
          </div>
        </div>
      </Section>

      {/* Reasoning pipeline */}
      <Section bg="mist" labelledBy="platform-reasoning-heading">
        {/* TODO(copy): section heading and intro */}
        <SectionHead
          id="platform-reasoning-heading"
          eyebrow="Clinical reasoning pipeline"
          title="A model-agnostic pipeline, with clinicians in the loop"
          intro="The pipeline matters more than any single model. Every request follows the same four steps, and the reference data and review rules stay the same whichever model runs a step."
        />
        <StepList steps={reasoningSteps} />
        <Reveal>
          <Panel className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span aria-hidden="true" className="w-10 h-[3px] shrink-0 bg-hos-yellow" />
            <Disclaimer className="text-sm" />
          </Panel>
        </Reveal>
      </Section>

      {/* Clinical safety */}
      <SplitSection
        id="platform-safety-heading"
        eyebrow="Clinical safety"
        // TODO(copy): section heading
        title="Decision support, built with clinical guardrails"
        intro={DISCLAIMER}
        bullets={[
          'Protocol outputs are reviewed by our licensed clinical advisory bench before release to any partner.',
          'Clinical Intake Briefs flag outliers for the clinician to review before the consult.',
          'Medication Intelligence surfaces drug interaction and refill signals. Dosing decisions are never made by the platform.',
          'The AI Voice Agent rules out emergencies before it books a visit.',
          'In the Agent Workforce, a human approves anything clinical.',
        ]}
        photo={{ src: '/photos/home-safety-consult.jpg', w: 1600, h: 1126, alt: 'A doctor reviewing results on a tablet with an older couple' }}
        visual={<IntakeBriefCard />}
        reverse
        cta={{ to: '/clinical', label: 'See our clinical evidence' }}
      />

      {/* Privacy and security */}
      <Section bg="mist" labelledBy="platform-security-heading">
        <SectionHead
          id="platform-security-heading"
          eyebrow="Privacy and security"
          title="Built for health data from day one"
          intro="Nostavia runs on infrastructure certified to SOC 2 Type II and ISO/IEC 27001, with partner data isolated, encrypted and handled in line with India's DPDP Act."
          action={{ to: '/security', label: 'Security and compliance' }}
        />
        <Reveal>
          <div className="rounded-[20px] bg-white border border-hos-hairline p-6 sm:p-10 space-y-10">
            <InfrastructureGroup />
            <PracticeChips items={trustPick(['dpdp', 'abdm', 'encryption', 'tenant-isolation', 'audit-logged', 'no-keys-on-device'])} columns={3} />
          </div>
        </Reveal>
        <Reveal>
          <Panel dark className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 space-y-3">
              <span className="inline-flex items-center rounded-full border border-hos-yellow/60 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-hos-yellow">
                In development
              </span>
              <h3 className="font-display font-semibold text-2xl tracking-tight text-white">SOMA, an on-device model</h3>
            </div>
            <div className="lg:col-span-8 space-y-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              <p>
                We are building SOMA, an on-device model designed so personal data is understood and stripped on the device, and only a de-identified clinical brief reaches cloud reasoning.
              </p>
              <p>It is in development and is not part of the live platform today. Everything described above runs without it.</p>
            </div>
          </Panel>
        </Reveal>
        <Reveal>
          <p className="text-sm text-[#475569]">
            Security questions or a questionnaire to complete?{' '}
            <a href={`mailto:${TRUST_CONTACT}`} className={textLink}>
              {TRUST_CONTACT}
            </a>
          </p>
        </Reveal>
      </Section>

      {/* Integration steps */}
      <Section labelledBy="platform-steps-heading">
        {/* TODO(copy): section heading */}
        <SectionHead
          id="platform-steps-heading"
          eyebrow="Integration"
          title="From first call to live, under your brand"
          intro="Every module can be tried in a sandbox with fictional data first. Improvements ship server-side, with no app update for you."
          action={{ to: '/pricing', label: 'See pricing' }}
        />
        <StepList steps={steps} />
      </Section>

      <FaqList id="platform-faq-heading" title="Technical questions buyers ask us" items={faqs} />

      <CtaBand
        title="Schedule a technical architecture briefing"
        highlight="with our engineering founders."
        body="Thirty minutes on live product, not slides. Send a sample lab report in advance and we'll show you the output on your own panel."
        primary={{ to: '/demo', label: 'Book a demo' }}
      />
    </div>
  );
};
