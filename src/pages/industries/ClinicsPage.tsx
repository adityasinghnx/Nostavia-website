import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2, ClipboardList, Clock, Code2, FileStack, Hammer, Pill, ShieldCheck, Smartphone, Stethoscope, UserMinus } from 'lucide-react';
import { CtaBand, FaqList, ModuleCards, PageHero, Section, SectionHead, SplitSection, StepList, textLink } from '../../components/page/PageKit';
import { focusRing } from '../../components/home/shared';
import { CountUp, Reveal } from '../../components/home/motion';
import { IntakeBriefCard } from '../../components/home/LiveCards';
import { SystemsToStartWith } from '../../components/human-os/BuyerMapping';
import { Disclaimer } from '../../components/human-os/Disclaimer';
import { InfrastructureGroup } from '../../components/trust/TrustElements';
import { DISCLAIMER, findModule, numberWord, steps, systemPath, totalLive } from '../../content/human-os';
import { useSeo } from '../../lib/useSeo';

/* ─────────────────────────────────────────────────────────────────────────────
 * /industries/clinics: clinics, longevity and preventive-care centres.
 * Facts come from the previous version of this page (chart review, optimal ranges,
 * drug-nutrient depletions, protocol drafts, per-consult pricing, EHR/FHIR/PDF
 * delivery, custom targets), the Clinical page (clinician override, biological age
 * as an estimate) and human-os.ts. Values in the visuals are samples, not patients.
 * ──────────────────────────────────────────────────────────────────────────── */

const firstSentence = (s: string) => {
  const i = s.indexOf('. ');
  return i === -1 ? s : s.slice(0, i + 1);
};

const fade = (i: number): React.CSSProperties => ({ animation: `hos-fade-up 0.5s ease ${0.1 + i * 0.12}s both` });

/* ── Bento visuals (sample values) ── */

type Flag = 'High' | 'Low';
const flagChip: Record<Flag, string> = {
  High: 'bg-rose-400/15 text-rose-300',
  Low: 'bg-amber-400/15 text-amber-300',
};

const BriefVisual: React.FC = () => (
  <div className="w-full">
    <div className="text-[11px] text-white/55" style={fade(0)}>
      New patient · history and 3 reports parsed
    </div>
    <ul className="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-2">
      {(
        [
          ['hs-CRP', '4.2 mg/L', 'High'],
          ['Vitamin D', '18 ng/mL', 'Low'],
          ['LDL', '142 mg/dL', 'High'],
        ] as [string, string, Flag][]
      ).map(([name, value, flag], i) => (
        <li key={name} className="flex items-center justify-between gap-2 rounded-lg bg-white/[0.04] ring-1 ring-white/[0.06] px-3 py-2 text-[11px]" style={fade(i + 1)}>
          <span className="text-white/80">
            {name} <span className="text-white/55">{value}</span>
          </span>
          <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${flagChip[flag]}`}>{flag}</span>
        </li>
      ))}
    </ul>
    <div className="mt-3 flex items-center gap-1.5 text-[11px] text-white/60" style={fade(4)}>
      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
      Ready before the consult
    </div>
  </div>
);

const BioAgeVisual: React.FC = () => (
  <div className="w-full space-y-3">
    {(
      [
        ['Chronological age', 52, 'bg-white/25', 100],
        ['Biological age', 47, 'bg-hos-yellow', 88],
      ] as [string, number, string, number][]
    ).map(([label, value, color, width], i) => (
      <div key={label}>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-white/60">{label}</span>
          <span className="font-semibold text-white">{value}</span>
        </div>
        <div className="mt-1.5 h-2 rounded-full bg-white/[0.06]">
          <div className={`h-full rounded-full origin-left ${color}`} style={{ width: `${width}%`, animation: `hos-grow 1s cubic-bezier(0.2,0.7,0.2,1) ${0.15 + i * 0.2}s both` }} />
        </div>
      </div>
    ))}
    <div className="flex flex-wrap items-center gap-1.5 pt-1" style={fade(3)}>
      <span className="text-[10px] text-white/55">Driving the gap</span>
      {['Sleep', 'LDL', 'Activity'].map((f) => (
        <span key={f} className="rounded-full bg-white/[0.05] ring-1 ring-white/10 px-2 py-0.5 text-[10px] text-white/70">
          {f}
        </span>
      ))}
    </div>
  </div>
);

const RiskVisual: React.FC = () => (
  <div className="w-full space-y-3">
    {(
      [
        ['Metabolic risk', 'Moderate', 3, 'bg-hos-yellow'],
        ['Cardiovascular risk', 'Low', 2, 'bg-emerald-300/80'],
      ] as [string, string, number, string][]
    ).map(([label, level, filled, color], i) => (
      <div key={label} style={fade(i)}>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-white/60">{label}</span>
          <span className="font-semibold text-white">{level}</span>
        </div>
        <div className="mt-1.5 grid grid-cols-5 gap-1">
          {Array.from({ length: 5 }).map((_, s) => (
            <span key={s} className={`h-1.5 rounded-full ${s < filled ? color : 'bg-white/[0.08]'}`} />
          ))}
        </div>
      </div>
    ))}
    <div className="text-[10px] text-white/55" style={fade(2)}>
      Factors: HbA1c, LDL, family history
    </div>
  </div>
);

const ProtocolVisual: React.FC = () => (
  <ol className="w-full space-y-2">
    {(
      [
        ['Week 1', 'Baseline set', true],
        ['Week 4', 'Plan adjusted to progress', true],
        ['Week 8', 'Re-check markers', false],
      ] as [string, string, boolean][]
    ).map(([when, what, done], i) => (
      <li key={when} className="flex items-center gap-3 text-[11px]" style={fade(i)}>
        <span className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center ${done ? 'bg-hos-yellow text-ink-950' : 'ring-1 ring-white/25 text-white/55'}`}>
          {done ? <CheckCircle2 className="w-3 h-3" /> : <span className="w-1.5 h-1.5 rounded-full bg-white/40" />}
        </span>
        <span className="font-mono text-[10px] text-white/55 w-12 shrink-0">{when}</span>
        <span className="text-white/80">{what}</span>
      </li>
    ))}
    <li className="pt-1" style={fade(3)}>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 text-emerald-300 px-2.5 py-1 text-[10px] font-semibold">
        <CheckCircle2 className="w-3 h-3" />
        Clinician approved
      </span>
    </li>
  </ol>
);

const PulseVisual: React.FC = () => (
  <div className="w-full">
    <svg viewBox="0 0 240 70" className="w-full h-16" aria-hidden="true">
      <line x1="0" y1="40" x2="240" y2="40" stroke="rgba(255,255,255,0.08)" />
      <path
        d="M0 40 L40 40 L48 34 L56 40 L66 40 L72 12 L80 58 L88 40 L120 40 L128 34 L136 40 L146 40 L152 12 L160 58 L168 40 L200 40 L208 34 L216 40 L240 40"
        fill="none"
        stroke="#F5D97B"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeDasharray="400"
        style={{ animation: 'hos-draw 1.8s ease both' }}
      />
    </svg>
    <div className="mt-2 flex items-center gap-4 text-[11px]" style={fade(2)}>
      <span className="text-white/55">
        HRV <span className="font-semibold text-white">48 ms</span>
      </span>
      <span className="text-white/55">
        Readiness <span className="font-semibold text-white">Good</span>
      </span>
    </div>
  </div>
);

/* TODO(copy): bento headlines. The line under each comes from the module description in human-os.ts. */
const tiles: { module: string; headline: string; visual: React.ReactNode; span: string }[] = [
  { module: 'Clinical Intake Briefs', headline: 'Every new patient, briefed on one page.', visual: <BriefVisual />, span: 'lg:col-span-2' },
  { module: 'Biological Age', headline: 'Biological age, with the reasons behind it.', visual: <BioAgeVisual />, span: '' },
  { module: 'Disease Risk Engine', headline: 'Risk scores that show their working.', visual: <RiskVisual />, span: '' },
  { module: 'Adaptive Protocols', headline: 'Plans that adjust as patients progress.', visual: <ProtocolVisual />, span: '' },
  { module: 'Cardiovascular Intelligence', headline: 'Heart health, beyond the lipid panel.', visual: <PulseVisual />, span: '' },
];

/* ── Brief document (sample values) ── */

const optimalRows: { name: string; value: string; note: string; pos: number }[] = [
  { name: 'Ferritin', value: '38 ng/mL', note: 'In lab range, below optimal', pos: 26 },
  { name: 'Fasting glucose', value: '98 mg/dL', note: 'In lab range, above optimal', pos: 74 },
];

const BriefDocument: React.FC = () => (
  <div className="hos-anim w-full max-w-[440px] rounded-2xl bg-ink-850 ring-1 ring-white/10 p-5 sm:p-6 text-white shadow-[0_40px_90px_-45px_rgba(0,0,0,0.85)]">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="w-8 h-8 shrink-0 rounded-lg bg-white/[0.06] ring-1 ring-white/10 text-hos-yellow flex items-center justify-center">
          <ClipboardList className="w-4 h-4" />
        </span>
        <div className="min-w-0">
          <div className="text-sm font-semibold">Clinical Intake Brief</div>
          <div className="text-[11px] text-white/55">New patient · 52 · 3 reports and history parsed</div>
        </div>
      </div>
      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-white/55">Sample</span>
    </div>

    <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-hos-yellow">Optimal, not just in range</div>
    <ul className="mt-3 space-y-3.5">
      {optimalRows.map((r, i) => (
        <li key={r.name} style={fade(i)}>
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 text-[11px]">
            <span className="font-semibold">
              {r.name} <span className="font-normal text-white/55">{r.value}</span>
            </span>
            <span className="text-[10px] text-amber-300">{r.note}</span>
          </div>
          <div className="relative mt-2 h-1.5 rounded-full bg-white/[0.06]">
            <span className="absolute inset-y-0 left-[10%] right-[10%] rounded-full bg-white/[0.12]" />
            <span className="absolute inset-y-0 left-[38%] right-[38%] rounded-full bg-hos-yellow/70" />
            <span className="absolute top-1/2 w-3 h-3 -mt-1.5 -ml-1.5 rounded-full bg-white/90 ring-2 ring-ink-850" style={{ left: `${r.pos}%` }} />
          </div>
        </li>
      ))}
    </ul>
    <div className="mt-2 flex items-center gap-3 text-[10px] text-white/55" style={fade(2)}>
      <span className="flex items-center gap-1">
        <span className="w-3 h-1.5 rounded-full bg-white/[0.12]" />
        Lab range
      </span>
      <span className="flex items-center gap-1">
        <span className="w-3 h-1.5 rounded-full bg-hos-yellow/70" />
        Optimal
      </span>
    </div>

    <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-hos-yellow">Medication</div>
    <div className="mt-2 flex items-center gap-2 rounded-lg bg-white/[0.05] ring-1 ring-white/[0.06] px-3 py-2 text-[11px]" style={fade(3)}>
      <Pill className="w-3.5 h-3.5 shrink-0 text-hos-yellow" />
      Metformin: check B12 status
    </div>

    <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-hos-yellow">Protocol draft</div>
    <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white/[0.05] ring-1 ring-white/[0.06] px-3 py-2 text-[11px]" style={fade(4)}>
      <span>Nutrition and lifestyle plan</span>
      <span className="rounded-full bg-hos-yellow/15 text-hos-yellow px-2 py-0.5 text-[10px] font-semibold">Awaiting clinician sign-off</span>
    </div>
  </div>
);

/* ── Static content ── */

/* TODO(copy): problem cards (facts from the previous version of this page and human-os.ts) */
const problems: { icon: React.FC<{ className?: string }>; label: string; title: string; body: string }[] = [
  {
    icon: Clock,
    label: 'Before the consult',
    title: 'Chart review nobody pays for.',
    body: 'Someone cross-references lipid panels, hormone ratios and glucose logs by hand before every new patient. That is 10 to 15 minutes, every time.',
  },
  {
    icon: FileStack,
    label: 'In the file',
    title: 'Data in every format.',
    body: 'Lab PDFs, scans and wearable exports arrive from different places, in different formats, with no single view of the patient.',
  },
  {
    icon: UserMinus,
    label: 'Between visits',
    title: 'Patients go quiet.',
    body: 'The plan from the last consult fades long before the next one, and patients drift off it.',
  },
];

const stats: { value: number; suffix?: string; label: string }[] = [
  { value: 15, suffix: ' min', label: 'Up to 15 minutes of chart review replaced per new patient.' },
  { value: 100, suffix: '+', label: 'Biomarkers graded against optimal ranges, not just lab ranges.' },
  { value: totalLive, label: 'Modules ready to switch on from the Partner Portal as your programme grows.' },
];

const addLater = ['Trajectory Engine', 'Correlation Engine', 'Medication Intelligence', 'AI Health Companion', "Women's Health Engine", 'Smart Reports'];

/* TODO(copy): delivery lines (adapted from the SDK, White Label and Custom Build pages) */
const delivery: { name: string; icon: React.FC<{ className?: string }>; fit: string; line: string; to: string }[] = [
  {
    name: 'SDK',
    icon: Code2,
    fit: 'If you already run a member app',
    line: 'Add biological age, disease risk scores and adaptive protocols to the app you already have, with no change to your UI.',
    to: '/solutions/gravity',
  },
  {
    name: 'White Label',
    icon: Smartphone,
    fit: 'If you want an app without building one',
    line: "A branded iOS and Android app, launched under your clinic's name, with no engineering team required.",
    to: '/solutions/storyhealth',
  },
  {
    name: 'Custom Build',
    icon: Hammer,
    fit: 'If you need something new',
    line: 'Designed and built from scratch for your clinic, on top of Human OS.',
    to: '/solutions/engineering',
  },
];

const inlineLink = `font-semibold text-white underline underline-offset-4 decoration-hos-yellow hover:decoration-white ${focusRing}`;

/* Answers restate facts already published on the site. */
const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: 'How does Nostavia fit with our EHR or EMR?',
    a: 'Through lightweight REST APIs, FHIR standards or the Intelligence SDK. Intake briefs can also be delivered as a one-page PDF straight to the physician’s tablet.',
  },
  {
    q: 'Does Nostavia make clinical decisions on its own?',
    a: 'No. It is clinician-supervised decision support. Every protocol recommendation and intake summary is presented for physician review and final sign-off.',
  },
  {
    q: 'Can we use our own optimal ranges and protocols?',
    a: 'Yes. Enterprise clinic partners can set custom optimal biomarker targets, supplement formularies and protocol rules. Partner clinicians can also adjust reference ranges, suppress modules and control the language shown to patients.',
  },
  {
    q: 'Is biological age the same as an epigenetic test?',
    a: 'No. Biological age is an estimate derived from biomarker deviation modelling, not a measurement of epigenetic age, and it is labelled that way everywhere it appears.',
  },
  {
    q: 'Which wearables are supported?',
    a: 'Apple Health and Google Health Connect today, normalised into one schema. More device feeds are in development.',
  },
  {
    q: 'Can we try it before we commit?',
    a: 'Yes. Every module can be tried in a sandbox with fictional data first, then switched on from the Partner Portal.',
  },
  {
    q: 'How are intake briefs priced?',
    a: (
      <>
        Clinical Intake Briefs are priced per consult.{' '}
        <Link to="/pricing" className={inlineLink}>
          See pricing
        </Link>
      </>
    ),
  },
  {
    q: 'Is Nostavia a medical device?',
    a: DISCLAIMER,
  },
];

export const ClinicsPage: React.FC = () => {
  useSeo({
    title: 'Clinics and Longevity Centres | Nostavia Health',
    description:
      "Clinical Intake Briefs, biological age, disease risk scores, cardiovascular intelligence and adaptive protocols for clinics and longevity centres, under your clinic's brand. Decision support your clinicians review and approve.",
    path: '/industries/clinics',
  });

  return (
    <div className="flex flex-col text-white overflow-x-clip bg-ink-950">
      {/* 1. Hero */}
      {/* TODO(copy): hero headline and intro */}
      <PageHero
        eyebrow="For clinics and longevity centres"
        title={
          <>
            Know the patient <span className="dk-text-sun">before they sit down.</span>
          </>
        }
        intro="Nostavia turns reports and history into a one-page brief before every consult, then gives your clinicians biological age, risk scores and protocols to review and approve. All under your clinic's name."
        points={['A one-page brief with outliers flagged', 'Biological age and risk, with the factors behind them', 'Protocols your clinicians sign off']}
        primary={{ to: '/demo', label: 'Request a demo' }}
        secondary={{ to: '/clinical', label: 'Our clinical approach' }}
        photo={{ src: '/photos/home-safety-consult.jpg', w: 1600, h: 1126, alt: 'A doctor going through results on a tablet with an older couple' }}
        visual={<IntakeBriefCard />}
      />

      {/* 2. The problem */}
      <Section labelledBy="clinic-problem-heading">
        {/* TODO(copy): problem heading and intro */}
        <SectionHead
          id="clinic-problem-heading"
          eyebrow="The problem"
          title="Longevity care runs on manual reading."
          intro="A preventive consult can mean 100+ biomarkers, wearable data and lifestyle logs. Your clinicians should spend the visit on strategy, not on synthesis."
        />
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {problems.map(({ icon: Icon, label, title, body }, i) => (
            <li key={title}>
              <Reveal delay={i * 90} className="h-full">
                <div className="h-full rounded-[20px] dk-card p-6 sm:p-7 flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="w-10 h-10 rounded-[10px] bg-white/[0.04] border border-white/[0.08] text-hos-yellow flex items-center justify-center">
                      <Icon aria-hidden="true" className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">{label}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white leading-snug">{title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-8 pt-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="border-t border-white/[0.08] pt-6">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display font-semibold text-5xl tracking-tight leading-none text-white">
                  <CountUp to={s.value} suffix={s.suffix} />
                </dd>
                <dd aria-hidden="true" className="mt-4 h-[3px] w-10 bg-hos-yellow" />
                <dd className="mt-4 text-sm text-white/60 leading-relaxed max-w-[18rem]">{s.label}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/* 3. What you get */}
      <Section labelledBy="clinic-bento-heading" bg="mist">
        {/* TODO(copy): section heading and intro */}
        <SectionHead
          id="clinic-bento-heading"
          eyebrow="What you get"
          title="Built for the twelve-month programme, not the single visit."
          intro="Prepare the consult, explain where health is heading, and keep patients on the plan between visits. Every module runs on the same patient data."
          action={{ to: '/human-os', label: 'Explore Human OS' }}
        />
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tiles.map((t, i) => {
            const mod = findModule(t.module);
            if (!mod) return null;
            return (
              <li key={t.module} className={t.span}>
                <Reveal delay={(i % 3) * 80} className="h-full">
                  <Link
                    to={systemPath(mod.system.slug)}
                    className={`group relative flex flex-col h-full min-h-[300px] rounded-[20px] dk-card p-6 overflow-hidden hover:border-white/20 transition-colors ${focusRing}`}
                  >
                    <span aria-hidden="true" className="absolute -right-16 -top-16 w-48 h-48 bg-[radial-gradient(closest-side,rgba(245,217,123,0.10),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative flex items-center justify-between gap-3">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">{t.module}</span>
                      <ArrowUpRight aria-hidden="true" className="w-4 h-4 shrink-0 text-white/55 group-hover:text-hos-yellow transition-colors" />
                    </span>
                    <h3 className="relative mt-3 text-xl font-semibold text-white leading-snug">{t.headline}</h3>
                    <span className="relative mt-2 text-sm text-white/60 leading-relaxed">{firstSentence(mod.description)}</span>
                    <span aria-hidden="true" className="hos-anim relative mt-auto pt-6 flex items-end">
                      {t.visual}
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <Reveal className="space-y-5">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-hos-yellow">Add as the programme grows</h3>
          <ModuleCards modules={addLater} />
        </Reveal>
        <p className="text-xs text-white/55">Screens show sample data, not real patients.</p>
      </Section>

      {/* 4. Inside every brief */}
      {/* TODO(copy): split heading */}
      <SplitSection
        id="clinic-brief-heading"
        eyebrow="Clinical Intake Briefs"
        title="One page. Everything that matters."
        intro="Reports and history are parsed into a one-page pre-consultation brief with outliers flagged, replacing 10 to 15 minutes of chart review per new patient."
        bullets={[
          <>
            <strong className="font-semibold text-white">Optimal, not just in range.</strong> Markers inside the lab range but outside the optimal range are flagged as opportunities.
          </>,
          <>
            <strong className="font-semibold text-white">Drug-nutrient depletions.</strong> Micronutrient depletions linked to prescription medications are flagged, such as metformin and B12.
          </>,
          <>
            <strong className="font-semibold text-white">A protocol draft for sign-off.</strong> Nutrition, supplement and lifestyle suggestions, drafted for your clinician to review and approve.
          </>,
          <>
            <strong className="font-semibold text-white">On the tablet or in your system.</strong> Delivered as a one-page PDF to the physician’s tablet, or through the API. Priced per consult.
          </>,
        ]}
        visual={<BriefDocument />}
        reverse
        cta={{ to: systemPath('clinical-intelligence'), label: 'Explore Clinical Intelligence' }}
      />

      {/* 5. Systems to start with */}
      <div className="bg-ink-900 border-y border-white/[0.06] py-20 sm:py-28">
        <SystemsToStartWith buyerId="clinics" />
      </div>

      {/* 6. How it works */}
      <Section labelledBy="clinic-steps-heading">
        {/* TODO(copy): steps heading and intro */}
        <SectionHead
          id="clinic-steps-heading"
          eyebrow="How it works"
          title={`Up and running in ${numberWord(steps.length).toLowerCase()} steps.`}
          intro="Start with the systems that fit your clinic. Add modules as patients move from a first consult to a full programme."
        />
        <StepList steps={steps} />
      </Section>

      {/* 7. Delivery options */}
      <Section labelledBy="clinic-delivery-heading" bg="navy">
        {/* TODO(copy): delivery heading and intro */}
        <SectionHead
          id="clinic-delivery-heading"
          eyebrow="Ship it your way"
          title="Three ways to launch. One platform underneath."
          intro="Plug the SDK into the app you already run, launch a white-label app under your clinic's name, or have us build something new."
          action={{ to: '/pricing', label: 'See pricing' }}
        />
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {delivery.map(({ name, icon: Icon, fit, line, to }, i) => (
            <li key={name}>
              <Reveal delay={i * 100} className="h-full">
                <Link to={to} className={`group flex flex-col h-full rounded-[20px] dk-card p-6 sm:p-7 hover:border-white/20 transition-colors ${focusRing}`}>
                  <span className="w-11 h-11 rounded-[12px] bg-white/[0.04] border border-white/[0.08] text-hos-yellow flex items-center justify-center group-hover:bg-hos-yellow group-hover:text-ink-950 group-hover:border-hos-yellow/40 transition-colors">
                    <Icon aria-hidden="true" className="w-5 h-5" />
                  </span>
                  <span className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">{fit}</span>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{name}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{line}</p>
                  <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-hos-yellow transition-colors">
                    Explore {name}
                    <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* 8. Trust */}
      <Section labelledBy="clinic-trust-heading">
        {/* TODO(copy): trust heading */}
        <SectionHead id="clinic-trust-heading" eyebrow="Trust" title="Clinically governed. Built for health data." />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Reveal className="h-full">
            <div className="h-full rounded-[20px] dk-card p-6 sm:p-8 flex flex-col gap-5">
              <span className="w-11 h-11 rounded-[12px] bg-hos-yellow/10 ring-1 ring-hos-yellow/30 text-hos-yellow flex items-center justify-center">
                <Stethoscope aria-hidden="true" className="w-5 h-5" />
              </span>
              <h3 className="text-2xl font-semibold text-white">Reviewed by our clinicians. Adjustable by yours.</h3>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                Reference ranges, thresholds and interpretive language are reviewed by our clinical advisory bench. Your clinicians can adjust reference ranges, suppress modules and control the language
                patients see.
              </p>
              <Link to="/clinical" className={`mt-auto ${textLink}`}>
                Our clinical approach
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120} className="h-full">
            <div className="h-full rounded-[20px] dk-card p-6 sm:p-8 flex flex-col gap-5">
              <span className="w-11 h-11 rounded-[12px] bg-hos-yellow/10 ring-1 ring-hos-yellow/30 text-hos-yellow flex items-center justify-center">
                <ShieldCheck aria-hidden="true" className="w-5 h-5" />
              </span>
              <h3 className="text-2xl font-semibold text-white">Built for health data from day one.</h3>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                Nostavia runs on infrastructure certified to SOC 2 Type II and ISO/IEC 27001, with partner data isolated, encrypted and handled in line with India's DPDP Act.
              </p>
              <InfrastructureGroup showHeading={false} />
              <Link to="/security" className={`mt-auto ${textLink}`}>
                Security and compliance
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
        <Disclaimer />
      </Section>

      {/* 9. FAQ */}
      {/* TODO(copy): FAQ heading */}
      <FaqList id="clinic-faq-heading" title="What clinic directors ask us." items={faqs} />

      {/* 10. Closing CTA */}
      {/* TODO(copy): closing headline and body */}
      <CtaBand
        title="Give every consult"
        highlight="a head start."
        body="Book a 30-minute demo with our clinical engineering team and see the brief your clinicians would get."
        primary={{ to: '/demo', label: 'Request a demo' }}
        secondary={{ to: '/pricing', label: 'See pricing' }}
      />
    </div>
  );
};
