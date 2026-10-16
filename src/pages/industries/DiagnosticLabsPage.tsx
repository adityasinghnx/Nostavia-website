import React from 'react';
import { Link } from 'react-router-dom';
import {
  Archive,
  ArrowDown,
  ArrowRight,
  Clock,
  Code2,
  FileCheck2,
  FileText,
  Hammer,
  KeyRound,
  Microscope,
  Network,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  TrendingUp,
} from 'lucide-react';
import {
  CtaBand,
  FaqList,
  FeatureGrid,
  ModuleCards,
  PageHero,
  Panel,
  Section,
  SectionHead,
  SplitSection,
  StatRow,
  StepList,
  textLink,
} from '../../components/page/PageKit';
import { Container, focusRing } from '../../components/home/shared';
import { Reveal } from '../../components/home/motion';
import { SmartReportCard } from '../../components/home/LiveCards';
import { SystemsToStartWith } from '../../components/human-os/BuyerMapping';
import { Disclaimer } from '../../components/human-os/Disclaimer';
import { InfrastructureGroup } from '../../components/trust/TrustElements';
import { TrustIcon, trustPick } from '../../content/trust.config';
import { numberWord, steps, systemPath, totalLive, totalSystems } from '../../content/human-os';
import { useSeo } from '../../lib/useSeo';

/* ─────────────────────────────────────────────────────────────────────────────
 * /industries/diagnostic-labs: for diagnostic labs and lab chains.
 * Content comes from the previous version of this page (hero, challenge, the two
 * lab services and their pricing, the Live 360° case study, FAQ) plus human-os.ts.
 * Sample values in the visuals are illustrations, not patient data.
 * ──────────────────────────────────────────────────────────────────────────── */

type Verdict = 'Optimal' | 'In range' | 'Outlier';

const verdictChip: Record<Verdict, string> = {
  Optimal: 'bg-hos-navy text-white',
  'In range': 'bg-hos-mist text-hos-grey border border-hos-hairline',
  Outlier: 'bg-hos-cream text-hos-amber border border-hos-yellow',
};

const sampleMarkers: { name: string; value: string; flag: string; verdict: Verdict; pos: number }[] = [
  { name: 'HbA1c', value: '5.1 %', flag: '', verdict: 'Optimal', pos: 52 },
  { name: 'Vitamin D', value: '24 ng/mL', flag: 'L', verdict: 'Outlier', pos: 18 },
  { name: 'LDL', value: '96 mg/dL', flag: '', verdict: 'In range', pos: 66 },
];

const fadeUp = (i: number): React.CSSProperties => ({ animation: `hos-fade-up 0.5s cubic-bezier(0.2,0.7,0.2,1) ${0.2 + i * 0.15}s both` });

/** A static PDF row set next to the same markers as a Smart Report. Sample values. */
const ReportCompare: React.FC = () => (
  <div className="hos-anim w-full max-w-[440px] space-y-3">
    <div className="rounded-xl bg-white border border-hos-hairline p-4">
      <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-widest text-hos-grey">
        <span>Standard PDF report</span>
        <span>Read once</span>
      </div>
      <table className="mt-3 w-full text-[11px] text-hos-grey">
        <thead>
          <tr className="text-left border-b border-hos-hairline">
            <th className="py-1.5 font-semibold">Test</th>
            <th className="py-1.5 font-semibold">Result</th>
            <th className="py-1.5 font-semibold text-right">Flag</th>
          </tr>
        </thead>
        <tbody>
          {sampleMarkers.map((m) => (
            <tr key={m.name} className="border-b border-hos-hairline last:border-0">
              <td className="py-1.5">{m.name}</td>
              <td className="py-1.5">{m.value}</td>
              <td className="py-1.5 text-right font-bold">{m.flag}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="flex justify-center">
      <span className="w-9 h-9 rounded-full bg-hos-navy text-hos-yellow flex items-center justify-center">
        <ArrowDown className="w-4 h-4" />
      </span>
    </div>

    <div className="rounded-xl bg-white border border-hos-hairline p-4 shadow-[0_24px_60px_-30px_rgba(18,26,49,0.45)]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-bold text-hos-black">Your Lab · Smart Report</span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-hos-amber">Your brand</span>
      </div>
      <ul className="mt-3 space-y-2.5">
        {sampleMarkers.map((m, i) => (
          <li key={m.name} style={fadeUp(i)}>
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-hos-black">
                {m.name} <span className="font-normal text-hos-grey">{m.value}</span>
              </span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${verdictChip[m.verdict]}`}>{m.verdict}</span>
            </div>
            <div className="relative mt-1.5 h-1.5 rounded-full bg-hos-mist">
              <span className="absolute inset-y-0 left-[30%] right-[30%] rounded-full bg-hos-yellow" />
              <span className="absolute top-1/2 w-3 h-3 -mt-1.5 -ml-1.5 rounded-full bg-hos-black ring-2 ring-white" style={{ left: `${m.pos}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 pt-3 border-t border-hos-hairline flex items-center gap-1.5 text-[11px] text-hos-grey" style={fadeUp(3)}>
        <TrendingUp className="w-3.5 h-3.5 text-hos-amber" />
        Kept for the next panel, so results become a trend
      </div>
    </div>
  </div>
);

/** Any PDF in, every marker decoded, delivered under the lab's brand. */
const ReportFlow: React.FC = () => {
  const stages: [React.FC<{ className?: string }>, string][] = [
    [FileText, 'Any lab PDF'],
    [Microscope, 'Every marker decoded'],
    [Smartphone, 'Under your brand'],
  ];
  return (
    <div className="hos-anim flex items-stretch gap-1.5 sm:gap-2">
      {stages.map(([Icon, label], i) => (
        <React.Fragment key={label}>
          {i > 0 && (
            <span className="self-center text-hos-yellow" style={fadeUp(i * 2 - 1)}>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          )}
          <span className="flex-1 flex flex-col items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-2 py-3 text-center" style={fadeUp(i * 2)}>
            <Icon className="w-4 h-4 text-hos-yellow" />
            <span className="text-[11px] font-semibold text-white leading-tight">{label}</span>
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};

/** The 90-day recall loop on the lab's own patient history. */
const RecallTimeline: React.FC = () => {
  const points: [string, string][] = [
    ['Day 0', 'Panel reported'],
    ['History', 'Due date found'],
    ['Reminder', "Sent in your lab's name"],
    ['Day 90', 'Back for a re-test'],
  ];
  return (
    <div className="hos-anim pt-2">
      <div className="relative mx-[12.5%] h-[3px] rounded-full bg-white/10">
        <span className="absolute inset-0 origin-left rounded-full bg-hos-yellow" style={{ animation: 'hos-grow 1.8s cubic-bezier(0.2,0.7,0.2,1) 0.3s both' }} />
      </div>
      <div className="grid grid-cols-4 gap-1.5 -mt-[9px]">
        {points.map(([when, what], i) => (
          <div key={when} className="flex flex-col items-center text-center gap-2" style={fadeUp(i + 1)}>
            <span className={`w-4 h-4 rounded-full ring-4 ring-hos-navy ${i === points.length - 1 ? 'bg-hos-yellow' : 'bg-white'}`} />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-hos-yellow">{when}</span>
            <span className="text-[11px] text-slate-300 leading-tight">{what}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ServiceCard: React.FC<{
  number: string;
  title: string;
  price: string;
  body: string;
  bullets: string[];
  visual: React.ReactNode;
  delay?: number;
}> = ({ number, title, price, body, bullets, visual, delay = 0 }) => (
  <Reveal delay={delay} className="h-full">
    <article className="h-full flex flex-col gap-6 rounded-[16px] bg-white/5 border border-white/10 p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-hos-yellow">Service {number}</span>
        <span className="inline-flex items-center rounded-full border border-white/20 px-3 py-1 font-mono text-[11px] font-bold text-white">{price}</span>
      </div>
      <h3 className="font-display font-semibold text-2xl sm:text-3xl tracking-tight leading-snug text-white">{title}</h3>
      <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{body}</p>
      <div aria-hidden="true">{visual}</div>
      <ul className="mt-auto divide-y divide-white/10 border-y border-white/10">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 py-3 text-sm text-slate-200">
            <span aria-hidden="true" className="mt-2 w-4 h-[3px] shrink-0 bg-hos-yellow" />
            {b}
          </li>
        ))}
      </ul>
    </article>
  </Reveal>
);

/** HbA1c across four sample reports, settling into the optimal band. */
const TrendVisual: React.FC = () => {
  const pts: [number, number][] = [
    [20, 18],
    [110, 32],
    [200, 46],
    [280, 54],
  ];
  return (
    <div aria-hidden="true" className="hos-anim rounded-xl bg-white/5 border border-white/10 p-4">
      <div className="flex items-center justify-between gap-3 text-[11px]">
        <span className="font-semibold text-white">The same panel, as a trend</span>
        <span className="text-slate-300">HbA1c · 4 reports · sample</span>
      </div>
      <svg viewBox="0 0 300 96" className="mt-3 w-full h-24">
        <rect x="0" y="44" width="300" height="24" rx="4" fill="#F5D97B" fillOpacity="0.18" />
        <text x="8" y="84" fontSize="9" fill="#F5D97B">
          optimal band
        </text>
        <path
          d={`M${pts.map(([x, y]) => `${x} ${y}`).join(' L')}`}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          pathLength={400}
          strokeDasharray="400"
          style={{ animation: 'hos-draw 1.8s ease 0.3s both' }}
        />
        {pts.map(([x, y], i) => (
          <circle
            key={x}
            cx={x}
            cy={y}
            r="4.5"
            fill={i === pts.length - 1 ? '#F5D97B' : '#121A31'}
            stroke="#FFFFFF"
            strokeWidth="2"
            style={{ animation: `hos-fade-up 0.4s ease ${0.5 + i * 0.35}s both` }}
          />
        ))}
      </svg>
    </div>
  );
};

/* The five steps of the Live 360° report layer, as published in the case study. */
const pipeline: { title: string; body: string }[] = [
  { title: 'Extraction', body: 'Biomarkers pulled from any report format, regardless of layout.' },
  { title: 'Normalisation', body: 'Reference ranges read from the report itself, not a generic table.' },
  { title: 'Categorisation', body: 'Optimal, normal or outlier, beyond binary in-range flagging.' },
  { title: 'Rendering', body: 'A non-clinical reader can understand their own body.' },
  { title: 'Persistence', body: 'The same panel later becomes a trend, not a second unrelated file.' },
];

/* Lines reuse the site navigation and pricing copy. Photos as on the homepage. */
const delivery = [
  {
    name: 'SDK',
    line: 'Add health AI to the app you already have.',
    detail: 'Smart Reports inside your own patient app, with no change to your UI or user experience.',
    to: '/solutions/gravity',
    icon: Code2,
    photo: '/photos/home-sdk-developer.jpg',
    w: 1600,
    h: 2402,
    alt: 'A developer writing code at a desk',
  },
  {
    name: 'White Label',
    line: 'Our ready-made products, launched as yours.',
    detail: 'Smart Report as a Service is delivered as White Label, under your lab’s brand.',
    to: '/solutions/storyhealth',
    icon: Smartphone,
    photo: '/photos/home-whitelabel-phone.jpg',
    w: 1600,
    h: 1067,
    alt: 'A woman smiling at her phone in a cafe',
  },
  {
    name: 'Custom Build',
    line: 'Designed and built from scratch for you.',
    detail: 'A new product designed around your workflow, then launched and run by us.',
    to: '/solutions/engineering',
    icon: Hammer,
    photo: '/photos/home-custom-team.jpg',
    w: 1600,
    h: 1200,
    alt: 'A team planning a product at a whiteboard',
  },
];

const practiceIcon: Partial<Record<TrustIcon, React.FC<{ className?: string }>>> = {
  consent: FileCheck2,
  abdm: Network,
  keys: KeyRound,
};

const practices = trustPick(['dpdp', 'abdm', 'no-keys-on-device']);

export const DiagnosticLabsPage: React.FC = () => {
  useSeo({
    title: 'Diagnostic Labs | Nostavia Health',
    description:
      'White-label Smart Reports and re-test recall for diagnostic labs and lab chains: 100+ biomarkers decoded under your brand, and due patients brought back on a 90-day cycle.',
    path: '/industries/diagnostic-labs',
  });

  return (
    <div className="flex flex-col font-body text-hos-black bg-white overflow-x-clip">
      {/* 1. Hero */}
      <PageHero
        eyebrow="For diagnostic labs and lab chains"
        title="Turn routine lab panels into continuous, revenue-generating patient relationships."
        intro="Diagnostic laboratories own the data rails, but lack the intelligence layer. Nostavia embeds white-labelled whole-body biomarker interpretation and automated re-test recall directly into your lab workflow, under your brand."
        points={['Smart Reports for every routine panel', 'Re-test recall from your own patient history', 'Delivered as PDF, web portal or mobile SDK']}
        primary={{ to: '/demo', label: 'Book a demo' }}
        secondary={{ to: '/platform', label: 'Explore the platform' }}
        photo={{ src: '/labs-bg.jpg', w: 1800, h: 1200, alt: 'A laboratory technician holding a blood sample tube' }}
        visual={<SmartReportCard />}
      />

      {/* 2. Key figures, all from human-os.ts */}
      <div className="bg-white pb-20 sm:pb-24">
        <Container>
          <StatRow
            items={[
              { value: 100, suffix: '+', label: 'biomarkers decoded against locally calibrated ranges' },
              { value: 90, suffix: '-day', label: "re-test recall cycle, run on your lab's own patient history" },
              { value: totalLive, label: `modules available today across ${numberWord(totalSystems).toLowerCase()} Human OS systems` },
            ]}
          />
        </Container>
      </div>

      {/* 3. The challenge */}
      <Section bg="mist" labelledBy="labs-problem-heading">
        <SectionHead
          id="labs-problem-heading"
          eyebrow="The challenge"
          title="Diagnostic networks collect enormous health data, but cannot interpret it."
          intro="Today, laboratories spend heavily to acquire patients for a single blood panel. The patient receives a static PDF report filled with isolated reference ranges, leaves, and often never returns until an acute problem brings them back."
        />
        <FeatureGrid
          items={[
            {
              icon: FileText,
              title: 'Static one-time PDF reports',
              body: 'Standard lab reports list numbers without explaining whole-body correlations or biological trajectories. Patients cannot understand their results and seek third-party interpretations.',
            },
            {
              icon: Archive,
              title: 'Dormant patient databases',
              body: 'Diagnostic chains sit on large archives of historical lab records, but lack the clinical intelligence to identify who is due for a 90-day re-test and why.',
            },
            {
              icon: Clock,
              title: 'High review costs',
              body: 'Writing a full interpretation for every routine panel takes pathologist time. Smart Reports draft the written summary automatically, for clinician review.',
            },
          ]}
        />
      </Section>

      {/* 4. Static PDF to Smart Report */}
      <SplitSection
        id="labs-report-heading"
        eyebrow="Smart Reports"
        /* TODO(copy) */
        title="From a static PDF to a report patients come back to"
        intro="Smart Reports sit on top of your existing reporting pipeline rather than replacing it. Every marker gets a verdict, and the same panel later becomes a trend."
        bullets={[
          'Parses any lab PDF, regardless of layout',
          'Decodes 100+ biomarkers into optimal, in-range or outlier',
          'Reference ranges read from the report itself, not a generic table',
          'Branded with your lab’s name and delivered as PDF, web portal or mobile SDK',
        ]}
        visual={<ReportCompare />}
        cta={{ to: systemPath('health-decoder'), label: 'Explore Health Decoder' }}
      />

      {/* 5. The two lab services, with pricing exactly as previously published */}
      <Section bg="navy" labelledBy="labs-services-heading">
        <SectionHead
          id="labs-services-heading"
          tone="dark"
          eyebrow="Our specialised services for labs"
          title="Land with specialised services, expand into the whole-body platform"
          intro="Nostavia sells two plug-and-play services that replace manual laboratory work while scaling revenue."
          action={{ to: '/pricing', label: 'See pricing' }}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ServiceCard
            number="01"
            title="Smart Report as a Service"
            price="White Label · from $1,500 + $399/mo"
            body="The comprehensive interpretation a clinician would spend 20 minutes writing, generated automatically for every routine panel and delivered under your lab's brand."
            bullets={[
              'Decodes 100+ biomarkers into optimal, in-range or outlier',
              'Food bio-impact modelling and wearable signal correlation',
              'Delivered in PDF, web portal or mobile SDK formats',
            ]}
            visual={<ReportFlow />}
          />
          <ServiceCard
            number="02"
            title="Re-Test Recall Campaigns"
            price="Included with Smart Reports"
            body="Reactivate your laboratory's dormant patient database. Nostavia analyses historical lab records, identifies patients due for follow-up testing and re-engages them automatically under your lab's name."
            bullets={[
              'Identifies biomarker half-life and 90-day protocol intervals',
              'Automated WhatsApp, SMS and email campaign triggers',
              'No added headcount or marketing agency fees',
            ]}
            visual={<RecallTimeline />}
            delay={120}
          />
        </div>
      </Section>

      {/* 6. Modules behind the services */}
      <Section bg="mist" labelledBy="labs-modules-heading">
        <SectionHead
          id="labs-modules-heading"
          eyebrow="What your lab gets"
          /* TODO(copy) */
          title="The Human OS modules behind your lab’s products"
          intro="Smart Reports, the Re-Test Recall Engine and the Correlation Engine are the first modules labs switch on. Add more from the same platform as your programme grows, each one under your brand."
          action={{ to: '/human-os', label: 'See all Human OS modules' }}
        />
        <ModuleCards
          modules={['Smart Reports', 'Re-Test Recall Engine', 'Correlation Engine', 'Food Intelligence', 'Wearable Telemetry', 'B2B Analytics Dashboard']}
        />
      </Section>

      {/* 7. Human OS: systems to start with */}
      <div className="bg-white py-20 sm:py-28">
        <SystemsToStartWith buyerId="labs" />
      </div>

      {/* 8. Proof: Live 360° case study */}
      <Section bg="mist" labelledBy="labs-case-heading">
        <SectionHead id="labs-case-heading" eyebrow="Deployment case study" title="Live 360°: Smart Report as a Service" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <Reveal className="lg:col-span-7 h-full">
            <Panel className="h-full flex flex-col gap-6">
              <img
                src="/client_logos/snksn-removebg-preview 1.png"
                alt="Live 360° Diagnostics logo"
                width={462}
                height={201}
                loading="lazy"
                decoding="async"
                className="h-10 w-auto self-start object-contain"
              />
              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-hos-black">The problem</h3>
                <p className="text-base text-[#475569] leading-relaxed">
                  Every diagnostics business has the same structural leak. The test is run, the report is delivered, the customer reads it once, and the relationship ends. The document is technically accurate and practically useless.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-hos-black">The solution</h3>
                <p className="text-base text-[#475569] leading-relaxed">
                  Smart Report as a Service, a report intelligence layer that sits on top of the existing reporting pipeline rather than replacing it.
                </p>
              </div>
              <dl className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  ['Category', 'Health and diagnostics'],
                  ['Scope', 'Web presence and report intelligence'],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-[12px] bg-hos-mist border border-hos-hairline px-4 py-3">
                    <dt className="font-mono text-[10px] font-bold uppercase tracking-widest text-hos-grey">{k}</dt>
                    <dd className="mt-1 text-sm font-semibold text-hos-black">{v}</dd>
                  </div>
                ))}
              </dl>
            </Panel>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5 h-full">
            <Panel dark className="h-full flex flex-col gap-6">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-hos-yellow">Live 360° Diagnostics</span>
              <p className="font-display font-semibold text-2xl leading-snug">Smart Reports, white-labelled and running under their brand.</p>
              <p className="text-sm text-slate-300 leading-relaxed">
                Every marker is normalised against source-specific reference ranges and results are kept for longitudinal trends. The report itself becomes the retention mechanism.
              </p>
              <div className="mt-auto">
                <TrendVisual />
              </div>
            </Panel>
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal>
            {/* TODO(copy) */}
            <h3 className="font-display font-semibold text-2xl sm:text-3xl tracking-tight text-hos-black">Five steps from any report to a trend</h3>
          </Reveal>
          <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <span aria-hidden="true" className="hidden lg:block absolute left-10 right-10 top-[46px] h-px bg-gradient-to-r from-hos-yellow via-hos-amber/40 to-hos-yellow" />
            {pipeline.map((p, i) => (
              <li key={p.title} className="relative">
                <Reveal delay={i * 100} className="h-full">
                  <div className="h-full rounded-[16px] bg-white border border-hos-hairline p-6 flex flex-col gap-3">
                    <span className="relative z-10 w-12 h-12 rounded-full bg-hos-navy text-white flex items-center justify-center font-display font-semibold ring-8 ring-white">
                      <span className="sr-only">Step </span>
                      {i + 1}
                    </span>
                    <h4 className="font-display font-bold text-lg text-hos-black">{p.title}</h4>
                    <p className="text-sm text-[#475569] leading-relaxed">{p.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* 9. How it works (Human OS steps) */}
      <Section labelledBy="labs-how-heading">
        <SectionHead
          id="labs-how-heading"
          eyebrow="How it works"
          title="From first call to live, under your brand"
          /* TODO(copy) */
          intro="Smart Reports sit on top of the reporting pipeline you already run, so nothing in the lab has to be replaced."
          action={{ to: '/demo', label: 'Book a scoping call' }}
        />
        <StepList steps={steps} />
      </Section>

      {/* 10. Delivery options */}
      <Section bg="mist" labelledBy="labs-delivery-heading">
        <SectionHead
          id="labs-delivery-heading"
          eyebrow="Delivery"
          title="Launch it your way"
          /* TODO(copy) */
          intro="Put Smart Reports inside the app you already have, launch our ready-made products under your name, or have us build something new around your lab."
          action={{ to: '/pricing', label: 'See pricing' }}
        />
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {delivery.map(({ name, line, detail, to, icon: Icon, photo, w, h, alt }, i) => (
            <li key={name}>
              <Reveal delay={i * 100} className="h-full">
                <Link
                  to={to}
                  className={`group flex flex-col h-full rounded-[16px] bg-white border border-hos-hairline overflow-hidden hover:border-hos-navy hover:shadow-[0_18px_40px_-24px_rgba(18,26,49,0.45)] transition-all duration-300 ${focusRing}`}
                >
                  <div className="overflow-hidden">
                    <img
                      src={photo}
                      alt={alt}
                      width={w}
                      height={h}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-col gap-3 p-6 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-[10px] bg-hos-mist border border-hos-hairline flex items-center justify-center">
                        <Icon aria-hidden="true" className="w-4 h-4 text-hos-black" />
                      </span>
                      <h3 className="font-display font-bold text-lg text-hos-black">{name}</h3>
                    </div>
                    <p className="text-sm font-semibold text-hos-black leading-relaxed">{line}</p>
                    <p className="text-sm text-[#475569] leading-relaxed">{detail}</p>
                    <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-hos-black">
                      Explore {name}
                      <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* 11. Governance and security */}
      <Section labelledBy="labs-governance-heading">
        <SectionHead
          id="labs-governance-heading"
          eyebrow="Governance and security"
          /* TODO(copy) */
          title="Decision support your pathologists stay in charge of"
          intro="Nostavia drafts. Your clinicians review. Patient data stays consented, minimised and on certified infrastructure."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Reveal className="h-full">
            <Panel className="h-full flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-[10px] bg-hos-navy text-hos-yellow flex items-center justify-center">
                  <Stethoscope aria-hidden="true" className="w-5 h-5" />
                </span>
                <h3 className="font-display font-bold text-xl text-hos-black">Clinical governance</h3>
              </div>
              <ul className="divide-y divide-hos-hairline border-y border-hos-hairline">
                {[
                  'Nostavia functions as a clinician-supervised decision support layer. It drafts Smart Reports for pathologist review.',
                  'Protocol outputs are reviewed by our licensed clinical advisory bench before release to any partner.',
                  'Every module can be tried in a sandbox with fictional data before it reaches a patient.',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 py-3 text-sm text-[#334155] leading-relaxed">
                    <span aria-hidden="true" className="mt-2 w-4 h-[3px] shrink-0 bg-hos-yellow" />
                    {t}
                  </li>
                ))}
              </ul>
              <Disclaimer />
              <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3">
                <Link to="/clinical" className={textLink}>
                  See our clinical evidence
                  <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
                <Link to="/company" className={textLink}>
                  Meet the clinical bench
                  <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <Panel className="h-full flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-[10px] bg-hos-navy text-hos-yellow flex items-center justify-center">
                  <ShieldCheck aria-hidden="true" className="w-5 h-5" />
                </span>
                <h3 className="font-display font-bold text-xl text-hos-black">Security and data protection</h3>
              </div>
              <ul className="space-y-3">
                {practices.map((p) => {
                  const Icon = (p.icon && practiceIcon[p.icon]) || ShieldCheck;
                  return (
                    <li key={p.id} className="flex items-start gap-3 rounded-[12px] bg-hos-mist border border-hos-hairline p-4">
                      <Icon aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0 text-hos-amber" />
                      <span>
                        <span className="block font-display font-bold text-sm text-hos-black">{p.name}</span>
                        <span className="block text-sm text-[#475569] leading-relaxed mt-0.5">{p.descriptor}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              <InfrastructureGroup />
              <div className="mt-auto">
                <Link to="/security" className={textLink}>
                  Read about security
                  <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </div>
            </Panel>
          </Reveal>
        </div>
      </Section>

      {/* 12. FAQ */}
      <FaqList
        id="labs-faq-heading"
        title="Everything diagnostic laboratory leaders ask us"
        items={[
          {
            q: 'Does Nostavia replace our pathologists or laboratory staff?',
            a: 'No. Nostavia functions as a clinician-supervised decision support layer. It drafts Smart Reports and extracts historical biomarkers for pathologist review.',
          },
          {
            q: 'How does Nostavia handle custom or proprietary PDF lab formats?',
            a: 'Smart Reports parse any lab PDF and pull biomarkers from the report regardless of layout. Reference ranges are read from the report itself, not from a generic table, and every marker is categorised as optimal, in range or outlier.',
          },
          {
            q: 'How does the Re-Test Recall Campaign engine work?',
            a: "Nostavia analyses your historical database to find patients due for follow-up testing, for example tracking lipid panels or HbA1c on a 90-day cycle. It sends personalised re-test reminders via WhatsApp, SMS or email under your laboratory's brand name.",
          },
          {
            q: 'How is the report delivered to patients?',
            a: "In PDF, web portal or mobile SDK formats, always under your lab's brand. The same panel later becomes a trend rather than a second unrelated file.",
          },
          {
            q: 'What does it cost?',
            a: (
              <>
                Smart Report as a Service is White Label, from $1,500 + $399/mo. Re-Test Recall Campaigns are included with Smart Reports.{' '}
                <Link to="/pricing" className={textLink}>
                  See pricing
                </Link>
              </>
            ),
          },
          {
            q: 'Can we try it before it reaches patients?',
            a: 'Yes. Every module can be tried in a sandbox with fictional data first, then switched on from the Partner Portal, live on the next API call.',
          },
          {
            q: 'Is patient health data secure and aligned with DPDP 2023?',
            a: (
              <>
                Nostavia is DPDP Act 2023 aligned: explicit consent, purpose limitation and data minimisation are built into the pipeline. We build on Supabase (SOC 2 Type II) and Microsoft Azure (SOC 2 Type II and ISO/IEC 27001). Those certifications are held by our infrastructure
                providers, not by Nostavia Technologies.{' '}
                <Link to="/security" className={textLink}>
                  Read about security
                </Link>
              </>
            ),
          },
        ]}
      />

      {/* 13. Closing CTA */}
      <CtaBand
        title="Ready to upgrade your diagnostic network with"
        highlight="white-labelled AI intelligence?"
        body="Launch Smart Reports and Re-Test Recall under your brand, on top of the reporting pipeline you already run."
        primary={{ to: '/demo', label: 'Book a demo' }}
      />
    </div>
  );
};
