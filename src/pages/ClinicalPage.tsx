import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  BarChart3,
  Camera,
  CheckCircle2,
  Clock,
  Database,
  Eye,
  FlaskConical,
  Gauge,
  GitCompare,
  HeartPulse,
  Hourglass,
  KeyRound,
  Lock,
  MessageSquareWarning,
  Microscope,
  Ruler,
  Server,
  Shield,
  SlidersHorizontal,
  TrendingUp,
  Users,
  Utensils,
  Watch,
} from 'lucide-react';
import { useSeo } from '../lib/useSeo';
import {
  CtaBand,
  FaqList,
  FeatureGrid,
  ModuleCards,
  PageHero,
  Panel,
  Section,
  SectionHead,
  StatRow,
  StepList,
  textLink,
} from '../components/page/PageKit';
import { Container, Eyebrow, focusRing } from '../components/home/shared';
import { Reveal } from '../components/home/motion';
import { FoodScanCard } from '../components/home/LiveCards';
import { Disclaimer } from '../components/human-os/Disclaimer';
import { InfrastructureGroup } from '../components/trust/TrustElements';
import { DISCLAIMER } from '../content/human-os';

/* ─────────────────────────────────────────────────────────────────────────────
 * Clinical evidence: the scientific basis of every major computation in the
 * platform. Substance (methods, ranges, citations, governance, limitations and
 * disclaimers) is carried over from the v1.0 document; presentation uses the
 * page kit. Citation text in the reference library is verbatim.
 * ──────────────────────────────────────────────────────────────────────────── */

const TOC = [
  { id: 'philosophy', label: 'Clinical philosophy' },
  { id: 'governance', label: 'Clinical governance' },
  { id: 'biological-age', label: 'Biological age' },
  { id: 'wearable-scoring', label: 'Wearable and physiological scoring' },
  { id: 'biomarker-interpretation', label: 'Biomarker interpretation' },
  { id: 'pattern-discovery', label: 'Pattern discovery' },
  { id: 'nutrition', label: 'Nutrition intelligence' },
  { id: 'behavioural', label: 'Behavioural and predictive modelling' },
  { id: 'ai-scope', label: 'Artificial intelligence: scope and limits' },
  { id: 'safety', label: 'Safety systems' },
  { id: 'data-privacy', label: 'Data, privacy and security' },
  { id: 'not-published', label: 'What we do not publish' },
  { id: 'limitations', label: 'Known limitations' },
  { id: 'references', label: 'Scientific reference library' },
  { id: 'disclaimer', label: 'Medical disclaimer' },
  { id: 'document-control', label: 'Document control' },
] as const;

type TocId = (typeof TOC)[number]['id'];

const sectionNo = (id: TocId) => String(TOC.findIndex((t) => t.id === id) + 1).padStart(2, '0');
const eyebrowFor = (id: TocId) => `${sectionNo(id)} · ${TOC.find((t) => t.id === id)?.label ?? ''}`;

/* Anchored sections clear the 64px sticky header and take focus after a jump. */
const anchorClass = 'scroll-mt-16 focus:outline-none';

/** Smooth in-page jump that respects reduced motion and moves focus to the target. */
const jumpTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  window.history.replaceState(window.history.state, '', `#${id}`);
  el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
};

/* ─────────────────────────────────────────────
   Small page-specific building blocks
   ───────────────────────────────────────────── */

const InDevelopment: React.FC = () => (
  <span className="inline-flex items-center rounded-full border border-hos-amber/40 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-hos-yellow">
    In development
  </span>
);

const Mark: React.FC<{ dark?: boolean }> = () => <span aria-hidden="true" className="mt-2.5 w-4 h-[3px] shrink-0 bg-hos-yellow" />;

const BulletList: React.FC<{ items: React.ReactNode[]; dark?: boolean }> = ({ items, dark = false }) => (
  <ul className={`divide-y border-y ${dark ? 'divide-white/10 border-white/10' : 'divide-white/[0.08] border-white/[0.08]'}`}>
    {items.map((item, i) => (
      <li key={i} className={`flex items-start gap-3 py-3 text-base leading-relaxed ${dark ? 'text-slate-200' : 'text-white/70'}`}>
        <Mark />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const Chips: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="flex flex-wrap gap-2">
    {items.map((item) => (
      <li key={item} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm text-white">
        {item}
      </li>
    ))}
  </ul>
);

const Callout: React.FC<{ title: string; children: React.ReactNode; dark?: boolean }> = ({ title, children, dark = false }) => (
  <div
    className={`rounded-[16px] border-l-[3px] border-l-hos-yellow p-6 sm:p-7 ${
      dark ? 'bg-white/5 border border-white/10' : 'bg-white/[0.03] border border-white/[0.08]'
    }`}
  >
    <h3 className={`font-display font-bold text-lg ${dark ? 'text-white' : 'text-white'}`}>{title}</h3>
    <div className={`mt-2 text-base leading-relaxed ${dark ? 'text-slate-300' : 'text-white/60'}`}>{children}</div>
  </div>
);

/** Responsive table: scrolls sideways inside its own wrapper, never the page. */
const DataTable: React.FC<{
  label: string;
  columns: string[];
  rows: string[][];
  minWidth?: string;
  highlightCol?: number;
  cellClass?: (col: number) => string;
}> = ({ label, columns, rows, minWidth = 'min-w-[640px]', highlightCol, cellClass }) => (
  <div>
    <p className="sm:hidden mb-3 text-xs text-white/55">Scroll sideways to see every column.</p>
    <div role="region" aria-label={label} tabIndex={0} className={`overflow-x-auto rounded-[12px] border border-white/[0.08] bg-white/[0.03] ${focusRing}`}>
      <table className={`w-full ${minWidth} border-collapse text-left text-sm`}>
        <caption className="sr-only">{label}</caption>
        <thead className="bg-white/[0.04]">
          <tr>
            {columns.map((c, i) => (
              <th key={c} scope="col" className="px-4 py-3 align-bottom font-mono text-[11px] font-bold uppercase tracking-widest text-white/55 whitespace-nowrap">
                {c}
                {i === highlightCol && <span aria-hidden="true" className="block mt-1.5 h-[3px] w-6 bg-hos-yellow" />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.08]">
          {rows.map((row, r) => (
            <tr key={r} className="hover:bg-white/[0.03] transition-colors">
              {row.map((cell, c) =>
                c === 0 ? (
                  <th key={c} scope="row" className="px-4 py-3 align-top font-semibold text-white whitespace-nowrap">
                    {cell}
                  </th>
                ) : (
                  <td key={c} className={`px-4 py-3 align-top text-white/60 ${cellClass ? cellClass(c) : ''}`}>
                    {cell}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Page-specific visuals
   ───────────────────────────────────────────── */

const fadeUp = (i: number): React.CSSProperties => ({ animation: `hos-fade-up 0.6s cubic-bezier(0.2,0.7,0.2,1) ${0.2 + i * 0.15}s both` });

type Grade = 'optimal' | 'normal' | 'outside';

const gradeChip: Record<Grade, { label: string; cls: string }> = {
  optimal: { label: 'Optimal', cls: 'bg-white/[0.04] text-white' },
  normal: { label: 'Normal, not optimal', cls: 'border border-hos-amber/40 text-hos-yellow' },
  outside: { label: 'Escalated', cls: 'bg-ink-950 text-white' },
};

/* Sample values on scales built from the reference table below (positions in %). */
const gradingRows: { name: string; value: string; grade: Grade; std: [number, number]; opt: [number, number]; pos: number }[] = [
  { name: 'HbA1c', value: '5.4 %', grade: 'normal', std: [20, 84], opt: [52, 68], pos: 76 },
  { name: 'ApoB', value: '55 mg/dL', grade: 'optimal', std: [0, 71], opt: [0, 43], pos: 39 },
  { name: 'hs-CRP', value: '3.4 mg/L', grade: 'outside', std: [0, 60], opt: [0, 20], pos: 68 },
];

/** Hero card: one marker graded against both the standard and the optimal range. */
const DualGradingCard: React.FC = () => (
  <div className="hos-anim w-[300px] max-w-full rounded-2xl bg-ink-850/95 p-4 text-white ring-1 ring-white/10 shadow-[0_24px_60px_-20px_rgba(10,10,11,0.45)] backdrop-blur-md" style={fadeUp(0)}>
    <div className="flex items-center justify-between gap-3 mb-3">
      <span className="text-xs font-bold">Dual grading</span>
      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/55">Sample</span>
    </div>
    <ul className="space-y-3">
      {gradingRows.map((row, i) => (
        <li key={row.name} style={fadeUp(i + 1)}>
          <div className="flex items-center justify-between gap-2 text-[11px]">
            <span className="font-semibold">
              {row.name} <span className="font-normal text-white/55">{row.value}</span>
            </span>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${gradeChip[row.grade].cls}`}>{gradeChip[row.grade].label}</span>
          </div>
          <div className="relative mt-1.5 h-2 rounded-full bg-white/[0.04] ring-1 ring-white/10">
            <span className="absolute inset-y-0 rounded-full bg-white/15" style={{ left: `${row.std[0]}%`, right: `${100 - row.std[1]}%` }} />
            <span className="absolute inset-y-0 rounded-full bg-hos-yellow" style={{ left: `${row.opt[0]}%`, right: `${100 - row.opt[1]}%` }} />
            <span className="absolute top-1/2 w-3 h-3 -mt-1.5 -ml-1.5 rounded-full bg-ink-950 ring-2 ring-ink-950" style={{ left: `${row.pos}%`, ...fadeUp(i + 2) }} />
          </div>
        </li>
      ))}
    </ul>
    <div className="mt-3 pt-3 border-t border-white/[0.08] flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-white/55" style={fadeUp(5)}>
      <span className="flex items-center gap-1">
        <span className="w-3 h-1.5 rounded-full bg-white/15" />
        Standard
      </span>
      <span className="flex items-center gap-1">
        <span className="w-3 h-1.5 rounded-full bg-hos-yellow" />
        Optimal
      </span>
      <span>Outside normal: always escalated</span>
    </div>
  </div>
);

/** Resting heart rate against a personal rolling baseline (illustrative). */
const BaselineChart: React.FC = () => {
  const pts = [62, 58, 60, 57, 59, 61, 58, 60, 59, 62, 64, 67, 69, 71];
  const x = (i: number) => 16 + i * (288 / (pts.length - 1));
  const y = (v: number) => 120 - (v - 50) * 4.2;
  const line = pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
  return (
    <figure className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-white">Resting heart rate vs personal baseline</span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/55">Illustrative</span>
      </div>
      <svg viewBox="0 0 320 140" className="hos-anim w-full h-auto" aria-hidden="true">
        <rect x="16" y={y(63)} width="288" height={y(56) - y(63)} rx="6" fill="#FFFFFF" fillOpacity="0.06" />
        <line x1="16" x2="304" y1={y(59.5)} y2={y(59.5)} stroke="#FFFFFF" strokeOpacity="0.3" strokeDasharray="3 4" />
        <path d={line} fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength={400} strokeDasharray="400" style={{ animation: 'hos-draw 1.8s ease 0.2s both' }} />
        {pts.map((v, i) =>
          v > 63 ? <circle key={i} cx={x(i)} cy={y(v)} r="4" fill="#F5D97B" stroke="#07080A" strokeWidth="1.5" style={fadeUp(i - 8)} /> : null
        )}
        <line x1="16" x2="304" y1="132" y2="132" stroke="rgba(255,255,255,0.12)" />
      </svg>
      <figcaption className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/55">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="w-3 h-2 rounded-sm bg-white/10" />
          Personal rolling baseline
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-hos-yellow ring-1 ring-ink-950" />
          Sustained elevation above baseline
        </span>
      </figcaption>
    </figure>
  );
};

/* ─────────────────────────────────────────────
   Content (carried over from the v1.0 document)
   ───────────────────────────────────────────── */

const philosophyRows = [
  ['Reference ranges', 'Single standard clinical range', 'Dual grading: optimal, normal, abnormal'],
  ['Lab interpretation', 'Flags values outside range', 'Cross-panel correlation with wearable and lifestyle context'],
  ['Wearable data', 'Step and calorie counting', 'Published physiological models for load, recovery and autonomic state'],
  ['Biological age', 'Not offered', 'Multi-biomarker deviation model built on published methods'],
  ['Nutrition', 'Calorie estimation', 'Metabolic response, processing grade, timing appropriateness'],
  ['Pattern discovery', 'Manual review', 'Automated correlation with significance filtering'],
];

const wearableRows = [
  ['Training load / strain', 'TRIMP, exponentially weighted by HR reserve', 'Banister (1991)'],
  ['Cardio load', 'Training Stress Score methodology', 'Coggan & Allen (2010)'],
  ['Recovery', 'HRV + resting HR vs personal baseline + sleep quality', 'Buchheit (2014)'],
  ['Stress', 'Dual-branch autonomic assessment', 'Kim et al. (2018); Schumann et al.'],
  ['Energy / readiness', 'Two-process sleep-wake model with circadian weighting', 'Borbély; Dijk & Czeisler (1995)'],
  ['Sleep quality', 'Duration vs NSF guidance + sleep efficiency', 'Hirshkowitz et al. (2015); Buysse et al. (1989)'],
  ['Max heart rate', 'Tanaka formula: 208 − 0.7 × age', 'Tanaka et al. (2001)'],
];

const biomarkerRows = [
  ['HbA1c', '4.0–5.6 %', '4.8–5.2 %', 'Levine et al. (2018); ADA'],
  ['Fasting glucose', '70–99 mg/dL', '70–85 mg/dL', 'Tirosh et al. (2011)'],
  ['Fasting insulin', '2.6–24.9 µIU/mL', '2.6–5.0 µIU/mL', 'Centenarian cohorts'],
  ['LDL cholesterol', '<100 mg/dL', '<70 mg/dL', 'Ference et al. (2017)'],
  ['HDL cholesterol', '40–100 mg/dL', '60–90 mg/dL', 'Sirtori (2006)'],
  ['Triglycerides', '<150 mg/dL', '<100 mg/dL', 'Nordestgaard (2016)'],
  ['ApoB', '<100 mg/dL', '<60 mg/dL', 'Sniderman et al. (2019)'],
  ['hs-CRP', '0–3 mg/L', '<1 mg/L', 'Ridker (2003)'],
  ['Homocysteine', '<15 µmol/L', '<9 µmol/L', 'Smith et al. (2010)'],
  ['Vitamin D (25-OH)', '30–100 ng/mL', '40–80 ng/mL', 'Holick et al., Endocrine Soc'],
  ['TSH', '0.4–4.0 mIU/L', '1.0–2.5 mIU/L', 'Garber et al., AACE/ETA'],
  ['ALT / AST', '<56 U/L', '<25 U/L', 'NAFLD literature'],
  ['Creatinine', '0.7–1.3 mg/dL', '0.6–1.0 mg/dL', 'KDIGO'],
  ['eGFR', '>60 mL/min', '>90 mL/min', 'KDIGO'],
  ['Ferritin', '30–400 ng/mL', '70–150 ng/mL', 'WHO guidance'],
  ['IGF-1', '50–300 ng/mL', '120–180 ng/mL', 'Milman et al. (2014)'],
  ['DHEA-S', '138–475 µg/dL', '200–400 µg/dL', 'Endocrine Society'],
];

const organSystems = [
  'Metabolic health',
  'Cardiovascular',
  'Hepatic',
  'Renal',
  'Thyroid',
  'Hormonal',
  'Vitamins',
  'Minerals and electrolytes',
  'Haematology',
  'Emerging longevity markers',
];

const references: [string, string][] = [
  ['Exercise physiology', 'Banister EW (1991). Modeling elite athletic performance. PMID 1816431'],
  ['Recovery assessment', 'Buchheit M (2014). Monitoring training status with heart rate measures. PMID 24578692'],
  ['Autonomic stress', 'Kim HG et al. (2018). Stress and heart rate variability. PMID 29486547'],
  ['Autonomic physiology', 'Schumann AY et al. Heart rate versus heart rate variability. Front Physiol'],
  ['Training load', 'Coggan AR and Allen H (2010). Training and Racing with a Power Meter'],
  ['Circadian biology', 'Dijk DJ and Czeisler CA (1995). J Neurosci 15(5):3526'],
  ['Sleep duration', 'Hirshkowitz M et al. (2015). NSF sleep duration recommendations. Sleep Health'],
  ['Sleep quality', 'Buysse DJ et al. (1989). Pittsburgh Sleep Quality Index. PMID 2748771'],
  ['Longevity science', 'Levine ME et al. (2018). PhenoAge. PMID 29676998'],
  ['Aging science', 'Klemera P and Doubal S (2006). Biological age computation. PMID 16413571'],
  ['Cardiology', 'Tanaka H et al. (2001). Age-predicted maximal heart rate'],
  ['HRV baseline', 'Koenig J et al. Adult RMSSD population baseline. PMID 31717972'],
  ['Inflammation', 'Ridker PM (2003). Clinical application of C-reactive protein. NEJM. PMID 12711671'],
  ['Lipidology', 'Ference BA et al. (2017). LDL-C and ASCVD risk. EAS/ESC. PMID 28444290'],
  ['Lipidology', 'Sirtori CR (2006). HDL and cardiovascular risk. PMID 16843445'],
  ['Lipidology', 'Nordestgaard BG (2016). Triglyceride-rich lipoproteins. PMID 27918805'],
  ['Cardiology', 'Sniderman AD et al. (2019). ApoB and cardiovascular risk. JAMA Cardiol. PMID 30584050'],
  ['Endocrinology', 'Holick MF et al. Vitamin D recommendations. PMID 21646368'],
  ['Endocrinology', 'Garber JR et al. AACE/ETA thyroid guidelines. PMID 22961224'],
  ['Metabolic health', 'Tirosh A et al. (2011). Fasting glucose and mortality. PMID 21220444'],
  ['Longevity science', 'Centenarian studies, fasting insulin in long-lived populations. PMID 12970313'],
  ['Neurology', 'Smith AD et al. (2010). Homocysteine lowering by B vitamins. PMID 20838622'],
  ['Longevity science', 'Milman S et al. (2014). Low IGF-1 and longevity. PMID 24719268'],
  ['Nutrition science', 'Mifflin MD et al. (1990). Predictive equation for resting energy expenditure'],
  ['Public health', 'WHO Physical Activity Guidelines (2020)'],
  ['Sports medicine', 'ACSM Guidelines for Exercise Testing and Prescription, 11th Edition'],
  ['Epidemiology', 'Ekelund U et al. (2016). Physical activity and sitting time. Lancet'],
  ['Nephrology', 'KDIGO clinical practice guidelines'],
  ['Hepatology', 'NAFLD research and clinical chemistry literature'],
];

/* Live modules whose methods are documented on this page. */
const methodModules = [
  'Smart Reports',
  'Biological Age',
  'Wearable Telemetry',
  'Sleep & Recovery Engine',
  'Performance Intelligence',
  'Correlation Engine',
  'Food Intelligence',
  'Trajectory Engine',
  'Adaptive Protocols',
];

/* TODO(copy): FAQ questions are new; every answer restates this page. */
const faqs = [
  {
    q: 'Is the platform diagnostic?',
    a: 'No. All platform outputs are decision support. The platform interprets and contextualises results. It is not diagnostic, it does not prescribe, and it directs the person to a qualified clinician whenever a signal has established clinical significance.',
  },
  {
    q: 'Can our clinicians change the reference ranges?',
    a: 'Yes. Partner clinicians can adjust reference ranges, suppress modules and control the language shown to their patients. Partner institutions can override any default range to match their own clinical protocols or local laboratory standards. Our defaults are defaults, not mandates.',
  },
  {
    q: 'Does a language model produce any of the numbers?',
    a: 'No. Physiological scoring, reference range grading, biological age computation, unit conversion, correlation statistics and safety thresholds are computed by fixed, auditable logic that returns identical outputs for identical inputs. Clinical thresholds are held outside the model, so a model cannot change what counts as abnormal.',
  },
  {
    q: 'Can we review the full parameter set?',
    a: 'Yes. We publish the models, sources, thresholds and reasoning on this page. Any partner institution evaluating Nostavia can review the full parameter set, including weighting coefficients and normalisation constants, under NDA, and any partner clinician can inspect the exact reasoning behind an individual result.',
  },
  {
    q: 'Which wearables feed the physiological scores?',
    a: 'Apple Health and Google Health Connect today, with more device feeds in development. Scores are computed against each person’s own rolling baseline.',
  },
  {
    q: 'Where does patient data live?',
    a: 'For institutional partners, Nostavia can deploy into a partner-owned database and infrastructure account, so patient data remains within the partner’s control and jurisdiction. Every record is scoped to its owner at the database layer, and partner-specific security documentation is available under NDA.',
  },
];

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */

export const ClinicalPage: React.FC = () => {
  useSeo({
    title: 'Clinical Evidence | Nostavia Health',
    description:
      'The scientific basis of the Nostavia platform: optimal and standard reference ranges, published scoring models, cited literature, clinical governance, where AI is used and where it is not, and known limitations.',
    path: '/clinical',
  });

  return (
    <div className="font-body bg-white/[0.03] text-white overflow-x-clip">
      {/* ═══ HERO ═══ */}
      <PageHero
        eyebrow="Clinical and algorithmic transparency"
        title="Clinical software that cannot explain itself should not be trusted with health decisions."
        intro="This document sets out the scientific basis of every major computation in the Nostavia platform: the models we use, the literature they come from, the thresholds we consider clinically meaningful, where AI is involved, and where it is deliberately not."
        points={[
          'Every score and range maps to a published source',
          'No language model is involved in producing a number',
          'Partner clinicians can override any default range',
        ]}
        primary={{ to: '/demo', label: 'Request clinical spec' }}
        secondary={{ to: '/company', label: 'Meet the clinical bench' }}
        photo={{ src: '/photos/home-safety-consult.jpg', w: 1600, h: 1126, alt: 'Doctor reviewing results on a tablet with an older couple' }}
        visual={<DualGradingCard />}
      />

      {/* ═══ CONTENTS + DISCLAIMER ═══ */}
      <section id="contents" aria-labelledby="contents-heading" className={`bg-white/[0.04] py-16 sm:py-20 ${anchorClass}`}>
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <Reveal className="lg:col-span-4 space-y-6">
            <Eyebrow>On this page</Eyebrow>
            <h2 id="contents-heading" className="font-display font-semibold text-3xl sm:text-4xl tracking-tight leading-[1.1] text-white">
              Contents
            </h2>
            {/* TODO(copy): contents intro */}
            <p className="text-base text-white/60 leading-relaxed">
              Sixteen sections, from the philosophy behind our ranges to the literature behind every model. Written for clinicians and for the teams evaluating Nostavia on behalf of an institution.
            </p>
            <dl className="grid grid-cols-3 gap-3">
              {[
                ['Version', '1.0'],
                ['Issued', 'August 2026'],
                ['Status', 'Public'],
              ].map(([k, v]) => (
                <div key={k} className="rounded-[12px] border border-white/[0.08] bg-white/[0.03] px-3 py-3">
                  <dt className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/55">{k}</dt>
                  <dd className="mt-1 text-sm font-semibold text-white">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="rounded-[16px] border border-white/[0.08] border-l-[3px] border-l-hos-yellow bg-white/[0.03] p-5 space-y-2">
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-white">Medical disclaimer</p>
              <Disclaimer className="!text-sm !text-white/70" />
              <a href="#disclaimer" onClick={(e) => jumpTo(e, 'disclaimer')} className={`${textLink} !text-xs`}>
                Read the full notice
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-8">
            <nav aria-label="Clinical evidence contents">
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TOC.map((t, i) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      onClick={(e) => jumpTo(e, t.id)}
                      className={`group flex items-center gap-4 h-full rounded-[12px] border border-white/[0.08] bg-white/[0.03] px-4 py-3 hover:border-white/25 transition-colors ${focusRing}`}
                    >
                      <span className="w-6 shrink-0 font-mono text-xs font-bold text-hos-yellow">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-sm font-semibold text-white leading-snug">{t.label}</span>
                      <ArrowDown aria-hidden="true" className="ml-auto w-4 h-4 shrink-0 text-white/55 group-hover:text-white transition-colors" />
                    </a>
                  </li>
                ))}
              </ol>
              <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
                <span>Also on this page:</span>
                <a href="#methods-in-product" onClick={(e) => jumpTo(e, 'methods-in-product')} className={textLink}>
                  Where these methods run
                </a>
                <a href="#faq" onClick={(e) => jumpTo(e, 'faq')} className={textLink}>
                  Questions from clinical reviewers
                </a>
              </p>
            </nav>
          </Reveal>
        </Container>
      </section>

      {/* ═══ 01 CLINICAL PHILOSOPHY ═══ */}
      <Section id="philosophy" labelledBy="philosophy-heading" bg="white" className={anchorClass}>
        {/* TODO(copy): section title */}
        <SectionHead
          id="philosophy-heading"
          eyebrow={eyebrowFor('philosophy')}
          title="A result can be normal and still deserve attention."
          intro="Nostavia is built on a distinction that most health software ignores."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Reveal className="h-full">
            <Panel className="h-full space-y-3">
              <h3 className="font-display font-bold text-xl text-white">Normal ranges</h3>
              <p className="text-base text-white/60 leading-relaxed">
                Normal ranges are derived from the general population, including people with unrecognised chronic disease. A result inside a normal range means you are statistically unremarkable. It does not mean you are well.
              </p>
            </Panel>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <Panel className="h-full space-y-3 border-t-[3px] border-t-hos-yellow">
              <h3 className="font-display font-bold text-xl text-white">Optimal ranges</h3>
              <p className="text-base text-white/60 leading-relaxed">
                Optimal ranges are derived from longevity research, centenarian cohorts, cardiovascular outcome trials and performance physiology. They describe the physiological state associated with the lowest long-term risk.
              </p>
            </Panel>
          </Reveal>
        </div>
        <Reveal>
          <p className="max-w-3xl text-lg text-white/70 leading-relaxed">
            Every interpretation the platform produces is graded against both. A result can be normal and still be flagged for attention. A result outside the normal range is always escalated, never softened.
          </p>
        </Reveal>
        <Reveal>
          <Panel className="space-y-5">
            <h3 className="font-display font-bold text-xl text-white">Conventional software compared with Nostavia</h3>
            <DataTable
              label="Capabilities: conventional software compared with Nostavia"
              columns={['Capability', 'Conventional', 'Nostavia']}
              rows={philosophyRows}
              highlightCol={2}
              cellClass={(c) => (c === 2 ? '!text-white font-medium' : '')}
            />
          </Panel>
        </Reveal>
      </Section>

      {/* ═══ 02 CLINICAL GOVERNANCE ═══ */}
      <Section id="governance" labelledBy="governance-heading" bg="mist" className={anchorClass}>
        {/* TODO(copy): section title */}
        <SectionHead
          id="governance-heading"
          eyebrow={eyebrowFor('governance')}
          title="Reviewed by our clinicians. Adjustable by yours."
          intro="The reference ranges, thresholds and interpretive language in the platform are reviewed by Nostavia's clinical advisory bench, which includes a GMC-registered clinician, medical doctors, a research scientist and qualified nutrition specialists."
          action={{ to: '/company', label: 'Meet the clinical bench' }}
        />
        <FeatureGrid
          columns={2}
          items={[
            {
              icon: Shield,
              title: 'Not diagnostic, not prescriptive',
              body: 'The platform interprets and contextualises. It is not diagnostic, and it does not prescribe.',
            },
            {
              icon: SlidersHorizontal,
              title: 'Clinician override',
              body: 'Partner clinicians can adjust reference ranges, suppress modules, and control the language shown to their patients. Our defaults are defaults, not mandates.',
            },
            {
              icon: Eye,
              title: 'Traceability',
              body: 'Every score and range maps to a published source. Where a threshold is our own composite judgement, we say so rather than implying literature support that does not exist.',
            },
            {
              icon: AlertTriangle,
              title: 'Conservative escalation',
              body: 'Where a signal has established clinical significance, the platform surfaces it prominently and directs the person to a qualified clinician rather than attempting to manage it.',
            },
          ]}
        />
      </Section>

      {/* ═══ 03 BIOLOGICAL AGE ═══ */}
      <Section id="biological-age" labelledBy="biological-age-heading" bg="white" className={anchorClass}>
        {/* TODO(copy): section title */}
        <SectionHead
          id="biological-age-heading"
          eyebrow={eyebrowFor('biological-age')}
          title="A biomarker deviation model, with safeguards built in."
          intro="Nostavia estimates biological age using a biomarker deviation model, in the tradition of PhenoAge (Levine et al., 2018) and the Klemera-Doubal method (2006)."
        />
        <Reveal>
          <p className="max-w-3xl text-base text-white/70 leading-relaxed">
            <strong className="text-white">Method.</strong> Each biomarker&apos;s distance from its optimal range is converted into an aging surplus or deficit expressed in years, weighted by the strength of that marker&apos;s association with mortality and healthspan in the literature, and combined with chronological age.
          </p>
        </Reveal>
        {/* TODO(copy): step titles group the method and its three safeguards */}
        <StepList
          steps={[
            {
              title: 'Check the data',
              body: (
                <>
                  <strong className="text-white">Safeguard.</strong> A minimum number of valid biomarkers is required before any estimate is produced. Sparse data returns no result rather than a confident guess.
                </>
              ),
            },
            {
              title: 'Measure deviation',
              body: 'Each biomarker’s distance from its optimal range is converted into an aging surplus or deficit, expressed in years.',
            },
            {
              title: 'Weight and cap',
              body: (
                <>
                  Each marker is weighted by the strength of its association with mortality and healthspan. <strong className="text-white">Safeguard.</strong> Each individual marker’s contribution is capped, so no single abnormal value can dominate the estimate.
                </>
              ),
            },
            {
              title: 'Combine and bound',
              body: (
                <>
                  The result is combined with chronological age. <strong className="text-white">Safeguard.</strong> The final output is bounded relative to chronological age to prevent implausible results.
                </>
              ),
            },
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Reveal className="h-full">
            <Panel className="h-full space-y-4">
              <h3 className="font-display font-bold text-lg text-white">Contributing markers</h3>
              <Chips items={['Fasting glucose', 'HbA1c', 'HDL cholesterol', 'LDL cholesterol', 'Triglycerides', 'Creatinine', 'ALT', 'Haemoglobin', 'TSH', 'Vitamin D']} />
            </Panel>
          </Reveal>
          <Reveal delay={90} className="h-full">
            <Callout title="What this is not">
              Our biomarker-derived biological age is a metabolic estimate, not an epigenetic measurement. It is not interchangeable with a methylation clock, and we label it accordingly everywhere it appears.
            </Callout>
          </Reveal>
          <Reveal delay={180} className="h-full">
            <Panel className="h-full space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display font-bold text-lg text-white">Epigenetic clocks</h3>
                <InDevelopment />
              </div>
              <p className="text-base text-white/60 leading-relaxed">
                Epigenetic clock tracking is in development and is not part of the platform today. It is designed to display and track results from validated third-party epigenetic testing rather than recompute them: Horvath, Hannum, PhenoAge, GrimAge and DunedinPACE.
              </p>
            </Panel>
          </Reveal>
        </div>
      </Section>

      {/* ═══ 04 WEARABLE & PHYSIOLOGICAL SCORING ═══ */}
      <Section id="wearable-scoring" labelledBy="wearable-scoring-heading" bg="mist" className={anchorClass}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            {/* TODO(copy): section title */}
            <SectionHead
              id="wearable-scoring-heading"
              eyebrow={eyebrowFor('wearable-scoring')}
              title="Every score is built on a published physiological model."
              intro="Nostavia converts raw sensor data from Apple Health and Google Health Connect into composite scores, with more device feeds in development. Each score is built on a published physiological model rather than an invented metric."
            />
          </div>
          <Reveal delay={120} className="lg:col-span-5">
            <Panel>
              <BaselineChart />
            </Panel>
          </Reveal>
        </div>
        <Reveal>
          <Panel className="space-y-5">
            <h3 className="font-display font-bold text-xl text-white">Scores and their underlying models</h3>
            <DataTable
              label="Wearable scores, underlying models and sources"
              columns={['Score', 'Underlying model', 'Source']}
              rows={wearableRows}
              cellClass={(c) => (c === 2 ? 'text-xs !text-white/55' : '')}
            />
          </Panel>
        </Reveal>
        <FeatureGrid
          items={[
            {
              icon: TrendingUp,
              title: 'Personal baselines',
              body: "Recovery and stress are computed against the individual's own rolling baseline. A resting heart rate of 58 is unremarkable for one person and a warning sign for another.",
            },
            {
              icon: Gauge,
              title: 'VO₂ max',
              body: 'Read from the device where available and classified against ACSM age and sex-specific percentile tiers. Not estimated where the device does not provide it.',
            },
            {
              icon: HeartPulse,
              title: 'Heart rate recovery',
              body: 'A blunted recovery below 12 bpm is associated with elevated cardiovascular mortality risk. The platform flags this prominently and directs the person to a physician.',
            },
          ]}
        />
      </Section>

      {/* ═══ 05 BIOMARKER INTERPRETATION ═══ */}
      <Section id="biomarker-interpretation" labelledBy="biomarker-interpretation-heading" bg="white" className={anchorClass}>
        {/* TODO(copy): section title */}
        <SectionHead
          id="biomarker-interpretation-heading"
          eyebrow={eyebrowFor('biomarker-interpretation')}
          title="Graded against standard and optimal ranges."
          intro="Nostavia supports interpretation across more than 100 biomarkers spanning ten organ systems. Where a result sits inside the standard range but outside the optimal range, it is presented as an opportunity rather than a problem."
        />
        <StatRow
          items={[
            { value: 100, suffix: '+', label: 'Biomarkers supported for interpretation' },
            { value: 10, label: 'Organ systems covered' },
            { value: 2, label: 'Ranges every result is graded against: standard and optimal' },
          ]}
        />
        <Reveal>
          <Chips items={organSystems} />
        </Reveal>
        <Reveal>
          <Panel className="space-y-5">
            <h3 className="font-display font-bold text-xl text-white">Optimal vs standard ranges</h3>
            <DataTable
              label="Optimal and standard reference ranges by biomarker"
              columns={['Biomarker', 'Standard', 'Optimal', 'Basis']}
              rows={biomarkerRows}
              highlightCol={2}
              cellClass={(c) => (c === 1 ? 'whitespace-nowrap tabular-nums' : c === 2 ? 'whitespace-nowrap tabular-nums !text-white font-semibold' : 'text-xs !text-white/55')}
            />
            <p className="text-sm text-white/55 leading-relaxed">
              Partner institutions can override any of these ranges to match their own clinical protocols or local laboratory standards.
            </p>
          </Panel>
        </Reveal>
        <FeatureGrid
          items={[
            {
              icon: Ruler,
              title: 'Unit standardisation',
              body: 'All incoming results are normalised to canonical units before interpretation, so a report in mmol/L and one in mg/dL produce identical clinical reasoning.',
            },
            {
              icon: FlaskConical,
              title: 'Extended panels (in development)',
              body: 'Gut microbiome, pharmacogenomic and wellness genetics (MTHFR, APOE, COMT, VDR, CYP1A2) and epigenetic age panels are in development and are not interpreted by the platform today.',
            },
            {
              icon: Microscope,
              title: 'Research-grade markers',
              body: 'NAD+, telomere length, sirtuin and mTOR activity, and certain inflammatory cytokines are labelled as research-grade and excluded from biological age and risk outputs.',
            },
          ]}
        />
      </Section>

      {/* ═══ 06 PATTERN DISCOVERY ═══ */}
      <Section id="pattern-discovery" labelledBy="pattern-discovery-heading" bg="mist" className={anchorClass}>
        {/* TODO(copy): section title */}
        <SectionHead
          id="pattern-discovery-heading"
          eyebrow={eyebrowFor('pattern-discovery')}
          title="Statistical association alone is never sufficient."
          intro="Nostavia's correlation engine identifies relationships between health signals over time using Pearson correlation on aligned time-series data. A correlation is only surfaced when it clears every gate below."
        />
        {/* TODO(copy): gate titles restate the surfacing rules */}
        <StepList
          steps={[
            { title: 'Minimum data volume', body: 'The pattern must clear a minimum volume of aligned time-series data before it is considered.' },
            { title: 'Minimum strength', body: 'The correlation coefficient must exceed a minimum magnitude.' },
            { title: 'Plausible direction', body: 'The relationship must match a physiologically plausible direction.' },
            { title: 'Clinical rationale', body: 'Every reportable pattern has a stated clinical rationale.' },
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <Reveal className="lg:col-span-7 h-full">
            <Panel className="h-full space-y-4">
              <h3 className="font-display font-bold text-xl text-white">Relationships the engine tests</h3>
              <BulletList
                items={[
                  'Sleep duration against next-day HRV and resting heart rate',
                  'Diet quality score against next-day autonomic markers',
                  'Late evening eating against overnight recovery',
                  'Sustained training load against recovery trajectory',
                  'Multi-signal patterns: short sleep alongside elevated glycaemic markers, or declining HRV alongside elevated inflammatory markers',
                ]}
              />
            </Panel>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5 h-full">
            <Callout title="Association ≠ Causation.">
              Correlations are presented as observations about that individual, with an explicit note that association is not causation. The platform does not tell someone that one thing caused another.
            </Callout>
          </Reveal>
        </div>
      </Section>

      {/* ═══ 07 NUTRITION INTELLIGENCE ═══ */}
      <Section id="nutrition" labelledBy="nutrition-heading" bg="white" className={anchorClass}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-8">
            {/* TODO(copy): section title */}
            <SectionHead
              id="nutrition-heading"
              eyebrow={eyebrowFor('nutrition')}
              title="More than a calorie estimate."
              intro="Nostavia analyses food from a photograph and returns more than a calorie estimate: predicted metabolic response, degree of processing, appropriateness for the time of day, and effect on nutrient absorption."
            />
            <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {[
                {
                  icon: Utensils,
                  title: 'Two-stage analysis',
                  body: 'A fast pass identifies the meal and estimates macronutrients within seconds. A deeper pass produces the full metabolic profile.',
                },
                {
                  icon: Activity,
                  title: 'Closed-loop validation',
                  body: "After a scanned meal, the platform compares its predicted metabolic response against the person's actual heart rate response. Predictions contradicted by the person's own physiology are marked as such.",
                },
                {
                  icon: AlertTriangle,
                  title: 'Accuracy limits, stated plainly',
                  body: 'Photograph-based nutrition estimation is approximate. Portion size, hidden fats, oils and preparation method are inferred rather than measured. It is not a substitute for weighed intake in a clinical setting.',
                },
              ].map(({ icon: Icon, title, body }, i) => (
                <li key={title}>
                  <Reveal delay={i * 90} className="flex gap-4 py-5">
                    <span className="w-10 h-10 shrink-0 rounded-[10px] bg-white/[0.04] border border-white/[0.08] text-white flex items-center justify-center">
                      <Icon aria-hidden="true" className="w-5 h-5" />
                    </span>
                    <div className="space-y-1.5">
                      <h3 className="font-display font-bold text-lg text-white">{title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">{body}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
          <Reveal delay={150}>
            <div className="relative min-h-[380px] sm:min-h-[480px] rounded-[20px] overflow-hidden bg-ink-800">
              <img
                src="/photos/home-problem-glucose.jpg"
                alt="Finger-prick glucose test"
                width={1600}
                height={1067}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-transparent to-transparent" />
              <div aria-hidden="true" className="absolute left-4 right-4 bottom-4 sm:left-6 sm:right-auto sm:bottom-6">
                <FoodScanCard />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ═══ 08 BEHAVIOURAL & PREDICTIVE MODELLING ═══ */}
      <Section id="behavioural" labelledBy="behavioural-heading" bg="mist" className={anchorClass}>
        {/* TODO(copy): section title and intro */}
        <SectionHead
          id="behavioural-heading"
          eyebrow={eyebrowFor('behavioural')}
          title="Built around individual rhythms, with confidence thresholds."
          intro="Where the platform models behaviour or projects forward, it says how confident it is and labels scenarios as scenarios."
        />
        <FeatureGrid
          items={[
            {
              icon: BarChart3,
              title: 'Habit modelling',
              body: 'The platform learns individual timing patterns (typical wake, meal and sleep times) using exponentially weighted moving averages, with confidence scores that rise as data accumulates. Below a minimum data threshold, no prediction is made. Gradual drift is detected via linear regression and surfaced when clinically meaningful.',
            },
            {
              icon: Clock,
              title: 'Adaptive timing (in development)',
              body: 'Scheduling notifications and prompts around predicted individual rhythms rather than fixed clock times is in development. As designed, prompts are suppressed entirely when confidence is low.',
            },
            {
              icon: Activity,
              title: 'Scenario projection',
              body: 'The Trajectory Engine projects likely trajectories across short and long horizons, from three hours to ten years ahead. These are educational models built on population-level relationships, clearly labelled as scenarios rather than predictions, and are never presented as individual disease risk assessment.',
            },
          ]}
        />
      </Section>

      {/* ═══ 09 AI: SCOPE & LIMITS (navy band) ═══ */}
      <Section id="ai-scope" labelledBy="ai-scope-heading" bg="navy" className={anchorClass}>
        <SectionHead
          id="ai-scope-heading"
          eyebrow={eyebrowFor('ai-scope')}
          title="AI is one component of the platform, not the whole of it."
          tone="dark"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Reveal className="h-full">
            <div className="h-full rounded-[16px] bg-white/5 border border-white/10 border-t-[3px] border-t-hos-yellow p-6 sm:p-8 space-y-4">
              <span className="w-10 h-10 rounded-[10px] bg-white/10 text-hos-yellow flex items-center justify-center">
                <Server aria-hidden="true" className="w-5 h-5" />
              </span>
              <h3 className="font-display font-bold text-xl text-white">What is deterministic</h3>
              <p className="text-base text-slate-300 leading-relaxed">
                All physiological scoring, reference range grading, biological age computation, unit conversion, correlation statistics and safety thresholds are computed by fixed, auditable logic. These produce identical outputs for identical inputs. No language model is involved in producing a number.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <div className="h-full rounded-[16px] bg-white/5 border border-white/10 p-6 sm:p-8 space-y-4">
              <span className="w-10 h-10 rounded-[10px] bg-white/10 text-hos-yellow flex items-center justify-center">
                <MessageSquareWarning aria-hidden="true" className="w-5 h-5" />
              </span>
              <h3 className="font-display font-bold text-xl text-white">What is AI-assisted</h3>
              <p className="text-base text-slate-300 leading-relaxed">
                Natural language explanation of results, extraction of values from uploaded laboratory documents, food recognition from images, protocol drafting, and conversational interaction.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <Reveal className="lg:col-span-7 h-full">
            <div className="h-full rounded-[16px] bg-white/5 border border-white/10 p-6 sm:p-8 space-y-4">
              <h3 className="font-display font-bold text-xl text-white">Controls we apply</h3>
              <BulletList
                dark
                items={[
                  'Model outputs are constrained to structured formats and validated before they reach a person',
                  'Clinical thresholds and reference ranges are held outside the model, so a model cannot change what counts as abnormal',
                  'Extracted laboratory values are surfaced for confirmation rather than silently trusted',
                  'Generated protocols respect hard constraints including dietary boundaries and biometric state; where recovery is poor or stress is elevated, intensity is reduced regardless of what the plan called for',
                  'Long-term context is stored as vector embeddings rather than raw conversation text',
                ]}
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5 h-full">
            <Callout title="What AI does not do." dark>
              It is not diagnostic. It does not alter a reference range. It does not decide whether a result is abnormal. It does not act on a person&apos;s health without a human in the loop.
            </Callout>
          </Reveal>
        </div>
      </Section>

      {/* ═══ 10 SAFETY SYSTEMS ═══ */}
      <Section id="safety" labelledBy="safety-heading" bg="white" className={anchorClass}>
        <SectionHead
          id="safety-heading"
          eyebrow={eyebrowFor('safety')}
          title="The platform escalates. It does not attempt to manage."
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <Reveal className="lg:col-span-7 h-full">
            <Panel className="h-full space-y-5 border-t-[3px] border-t-hos-yellow">
              <h3 className="font-display font-bold text-xl text-white">Clinical escalation thresholds</h3>
              <p className="text-base text-white/60 leading-relaxed">
                Signals with established clinical significance are flagged prominently with a recommendation to consult a qualified clinician:
              </p>
              <Chips
                items={[
                  'Blunted heart rate recovery',
                  'Sustained autonomic suppression',
                  'Sustained elevation in resting heart rate above personal baseline',
                  'Severe sleep deficit',
                ]}
              />
              <p className="text-sm text-white/55">The platform escalates. It does not attempt to manage.</p>
            </Panel>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5 h-full">
            <Panel className="h-full space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display font-bold text-xl text-white">Emergency language screening</h3>
                <InDevelopment />
              </div>
              <p className="text-base text-white/60 leading-relaxed">
                Screening of member messages for language indicating a medical or psychological emergency is in development and is not part of the platform today. As designed, it runs before any AI processing, returns emergency contact guidance and a direction to seek immediate help, and bypasses the ordinary response path entirely.
              </p>
              <p className="text-sm text-white/55 leading-relaxed">
                It is designed as a supplementary safeguard. It is not an emergency service, it is not a substitute for one, and we do not present it as one.
              </p>
            </Panel>
          </Reveal>
        </div>
      </Section>

      {/* ═══ 11 DATA, PRIVACY & SECURITY ═══ */}
      <Section id="data-privacy" labelledBy="data-privacy-heading" bg="mist" className={anchorClass}>
        {/* TODO(copy): section title */}
        <SectionHead
          id="data-privacy-heading"
          eyebrow={eyebrowFor('data-privacy')}
          title="Scoped, minimised and kept under the partner's control."
          intro="Data sources: Apple Health, Google Health Connect, laboratory reports uploaded or integrated directly, food images, and self-reported assessment data."
          action={{ to: '/security', label: 'Read the security overview' }}
        />
        <FeatureGrid
          items={[
            {
              icon: Watch,
              title: 'On-device computation',
              body: 'Physiological scoring from wearable data is computed locally on the device wherever possible.',
            },
            {
              icon: KeyRound,
              title: 'No credentials on device',
              body: 'All external model calls are proxied server-side. Keys are never distributed to clients.',
            },
            {
              icon: Lock,
              title: 'Row-level isolation',
              body: 'Every record is scoped to its owner at the database layer, not merely at the application layer.',
            },
            {
              icon: Eye,
              title: 'Data minimisation',
              body: 'Only the fields required for a given computation are transmitted to any external service.',
            },
            {
              icon: Database,
              title: 'Deployment flexibility',
              body: 'For institutional partners, Nostavia can deploy into a partner-owned database and infrastructure account, so patient data remains within the partner’s control and jurisdiction.',
            },
          ]}
        />
        <Reveal>
          <Panel className="space-y-6">
            <InfrastructureGroup />
            <p className="pt-5 border-t border-white/[0.08] text-sm text-white/60 leading-relaxed">
              Partner-specific security documentation, including current certification status and sub-processor detail, is available under NDA to institutions in active evaluation.
            </p>
          </Panel>
        </Reveal>
      </Section>

      {/* ═══ 12 WHAT WE DO NOT PUBLISH ═══ */}
      <Section id="not-published" labelledBy="not-published-heading" bg="white" className={anchorClass}>
        {/* TODO(copy): section title */}
        <SectionHead id="not-published-heading" eyebrow={eyebrowFor('not-published')} title="We publish the reasoning, not the coefficients." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Reveal className="h-full">
            <Panel className="h-full space-y-4 border-t-[3px] border-t-hos-yellow">
              <h3 className="font-display font-bold text-lg text-white">Published on this page</h3>
              <BulletList items={['The models', 'The sources', 'The thresholds', 'The reasoning']} />
            </Panel>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <Panel className="h-full space-y-4">
              <h3 className="font-display font-bold text-lg text-white">Available under NDA</h3>
              <BulletList items={['The exact weighting coefficients inside our composite scores', 'The normalisation constants inside our composite scores']} />
            </Panel>
          </Reveal>
        </div>
        <Reveal>
          <div className="max-w-3xl space-y-4 text-base sm:text-lg text-white/70 leading-relaxed">
            <p>
              We publish the models, the sources, the thresholds and the reasoning. We do not publish the exact weighting coefficients and normalisation constants inside our composite scores.
            </p>
            <p>
              That is a deliberate line. Those parameters are the product of clinical review and iteration, and they are what a partner is licensing. Publishing them would not make the platform more trustworthy. It would only make it easier to copy.
            </p>
            <p>
              Any partner institution evaluating Nostavia can review the full parameter set under NDA, and any partner clinician can inspect the exact reasoning behind an individual result.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ═══ 13 KNOWN LIMITATIONS ═══ */}
      <Section id="limitations" labelledBy="limitations-heading" bg="mist" className={anchorClass}>
        <SectionHead
          id="limitations-heading"
          eyebrow={eyebrowFor('limitations')}
          title="We would rather state these than have a clinician find them."
        />
        <FeatureGrid
          items={[
            {
              icon: Watch,
              title: 'Consumer-grade sensors',
              body: 'Wearable-derived HRV, sleep staging and energy expenditure are approximations. Accuracy varies by device, by wear position, and by individual. Sleep staging in particular is less accurate than polysomnography.',
            },
            {
              icon: Hourglass,
              title: 'Biological age is an estimate',
              body: 'It is directional and useful for tracking change over time. A single reading should not be treated as a measurement.',
            },
            {
              icon: Users,
              title: 'Population models applied to individuals',
              body: 'Reference ranges and physiological formulas are derived from population studies. Individual variation is real, and pregnancy, chronic disease, medication and certain ethnic and genetic factors can shift what is appropriate.',
            },
            {
              icon: MessageSquareWarning,
              title: 'Language models make errors',
              body: 'Explanatory text and generated protocols are reviewed and constrained, but they are not infallible.',
            },
            {
              icon: GitCompare,
              title: 'Correlation is not causation',
              body: 'Discovered patterns describe association within one person’s data over a limited window.',
            },
            {
              icon: Camera,
              title: 'Nutrition analysis from images is approximate',
              body: 'Portion size, hidden fats, oils and preparation method are inferred rather than measured, as described in the nutrition section.',
            },
          ]}
        />
      </Section>

      {/* ═══ 14 SCIENTIFIC REFERENCE LIBRARY ═══ */}
      <Section id="references" labelledBy="references-heading" bg="white" className={anchorClass}>
        {/* TODO(copy): section title and intro */}
        <SectionHead
          id="references-heading"
          eyebrow={eyebrowFor('references')}
          title="The literature behind every model."
          intro="The sources cited in the sections above, grouped by domain."
        />
        <Reveal>
          <Panel>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-10 divide-y divide-white/[0.08] md:divide-y-0">
              {references.map(([domain, ref], i) => (
                <li key={`${domain}-${i}`} className="flex gap-4 py-4 md:border-b md:border-white/[0.08]">
                  <span className="w-7 shrink-0 font-mono text-xs font-bold text-hos-yellow tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <div className="min-w-0 space-y-1">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/55">{domain}</p>
                    <p className="text-sm text-white leading-relaxed break-words">{ref}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Panel>
        </Reveal>
      </Section>

      {/* ═══ 15 MEDICAL DISCLAIMER (navy band) ═══ */}
      <Section id="disclaimer" labelledBy="disclaimer-heading" bg="navy" className={anchorClass}>
        {/* TODO(copy): section title */}
        <SectionHead id="disclaimer-heading" eyebrow={eyebrowFor('disclaimer')} title="Decision support, not a medical device." tone="dark" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="border-l-[3px] border-hos-yellow pl-5 font-display font-semibold text-2xl sm:text-3xl text-white tracking-tight leading-snug">{DISCLAIMER}</p>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7 space-y-6 text-base text-slate-300 leading-relaxed">
            <p>
              All scores, ranges and insights are generated from self-reported information, consumer-grade wearable devices and laboratory results provided by the user or their care provider. They are intended for informational and educational purposes and are not a substitute for professional medical diagnosis, treatment or advice.
            </p>
            <BulletList
              dark
              items={[
                'Biological age is derived from biomarker deviation modelling. It is an estimate, not a measurement of epigenetic age.',
                'Wearable-derived scores are approximations based on published physiological models, not direct medical measurements.',
                'AI-generated explanations, nutrition analysis and protocol suggestions may contain errors.',
                'The platform is not an emergency service. Emergency language screening is in development and, when released, must never be relied upon as a primary emergency system. In an emergency, contact your local emergency services immediately.',
              ]}
            />
            <p className="font-semibold text-white">
              Always consult a qualified healthcare professional before making any decision based on information from this platform. Where Nostavia is delivered under a partner brand, the partner institution&apos;s clinical governance and terms of care apply in addition to this notice.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ═══ 16 DOCUMENT CONTROL ═══ */}
      <Section id="document-control" labelledBy="document-control-heading" bg="white" className={anchorClass}>
        {/* TODO(copy): section title */}
        <SectionHead id="document-control-heading" eyebrow={eyebrowFor('document-control')} title="How this document is maintained." />
        <Reveal>
          <Panel className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-5">
              <p className="text-base text-white/70 leading-relaxed">
                This document is reviewed alongside material changes to the platform&apos;s clinical logic. Questions about any algorithm, threshold or reference described here, including from clinicians evaluating Nostavia on behalf of an institution, can be directed to our clinical team.
              </p>
              <Link to="/demo" className={textLink}>
                Contact the clinical team
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </div>
            <dl className="lg:col-span-4 divide-y divide-white/[0.08] border-y border-white/[0.08] text-sm">
              {[
                ['Version', '1.0'],
                ['Issued', 'August 2026'],
                ['Owner', '© 2026 Nostavia Technologies Pvt. Ltd.'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-3">
                  <dt className="font-mono text-[11px] font-bold uppercase tracking-widest text-white/55">{k}</dt>
                  <dd className="text-right font-semibold text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </Panel>
        </Reveal>
      </Section>

      {/* ═══ WHERE THESE METHODS RUN ═══ */}
      <Section id="methods-in-product" labelledBy="methods-in-product-heading" bg="mist" className={anchorClass}>
        {/* TODO(copy): section eyebrow, title and intro */}
        <SectionHead
          id="methods-in-product-heading"
          eyebrow="In the product"
          title="Where these methods run"
          intro="The methods documented above power these Human OS modules, available today under your brand. Each card opens the system it belongs to."
          action={{ to: '/human-os', label: 'Explore Human OS' }}
        />
        <ModuleCards modules={methodModules} />
      </Section>

      {/* ═══ FAQ ═══ */}
      <div id="faq" className={anchorClass}>
        <FaqList id="clinical-faq-heading" eyebrow="Clinical review" title="Questions from clinical reviewers" items={faqs} bg="white" />
      </div>

      {/* ═══ CTA ═══ */}
      <CtaBand
        title="Request the clinical specification"
        highlight="and governance protocol."
        body="Review the clinical methodology with our clinical team. Full parameter sets are available under NDA."
        primary={{ to: '/demo', label: 'Request clinical spec' }}
      />
    </div>
  );
};
