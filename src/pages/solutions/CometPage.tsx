import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Code2, FileText, Globe, Smartphone } from 'lucide-react';
import { CtaBand, FaqList, PageHero, textLink } from '../../components/page/PageKit';
import { Container, SectionHeading, focusRing } from '../../components/home/shared';
import { Reveal } from '../../components/home/motion';
import { SmartReportCard } from '../../components/home/LiveCards';
import { Disclaimer } from '../../components/human-os/Disclaimer';
import { systemPath } from '../../content/human-os';
import { useSeo } from '../../lib/useSeo';

/* ─────────────────────────────────────────────────────────────────────────────
 * Smart Reports & Re-Test Recall (route /solutions/comet). Facts come from this
 * page's previous copy (100+ biomarkers, white-labelled PDF and web, branding
 * options, pricing), human-os.ts (Smart Reports and Re-Test Recall Engine), the
 * Live 360° Diagnostics case study as published on the homepage and Diagnostic
 * Labs page, and the pricing page. Values inside the visuals are samples.
 * ──────────────────────────────────────────────────────────────────────────── */

const fadeUp = (i: number): React.CSSProperties => ({ animation: `hos-fade-up 0.6s cubic-bezier(0.2,0.7,0.2,1) ${0.15 + i * 0.12}s both` });

type Verdict = 'Optimal' | 'In range' | 'Outlier';
const verdictChip: Record<Verdict, string> = {
  Optimal: 'bg-emerald-400/15 text-emerald-300',
  'In range': 'bg-white/10 text-white/70',
  Outlier: 'bg-amber-400/15 text-amber-300',
};

const sample: { name: string; value: string; range: string; verdict: Verdict; pos: number }[] = [
  { name: 'HbA1c', value: '5.1 %', range: '4.0 to 5.6', verdict: 'Optimal', pos: 50 },
  { name: 'Vitamin D', value: '24 ng/mL', range: '30 to 100', verdict: 'Outlier', pos: 12 },
  { name: 'LDL', value: '96 mg/dL', range: 'under 100', verdict: 'In range', pos: 68 },
  { name: 'TSH', value: '2.1 mIU/L', range: '0.4 to 4.0', verdict: 'Optimal', pos: 46 },
];

/* ── Any PDF in, every marker decoded and branded ── */
const DecodeVisual: React.FC = () => (
  <div aria-hidden="true" className="hos-anim grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-3 w-full">
    <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.08] p-4">
      <div className="flex items-center justify-between gap-3 text-[11px]">
        <span className="flex items-center gap-1.5 font-semibold text-white/80">
          <FileText className="w-3.5 h-3.5 text-white/60" />
          lab_report.pdf
        </span>
        <span className="text-[10px] uppercase tracking-wider text-white/55">Any layout</span>
      </div>
      <div className="mt-3 text-[11px] text-white/60">
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 pb-1.5 border-b border-white/[0.08] font-semibold">
          <span>Test</span>
          <span>Result</span>
          <span className="w-[68px] text-right">Ref.</span>
        </div>
        <ul>
          {sample.map((m, i) => (
            <li key={m.name} className="relative grid grid-cols-[1fr_auto_auto] gap-x-3 py-1.5 border-b border-white/[0.06] last:border-0">
              <span className="absolute inset-y-0.5 -inset-x-1.5 rounded bg-hos-yellow/[0.08]" style={{ animation: `hos-fade-up 0.4s ease ${0.3 + i * 0.3}s both` }} />
              <span className="relative">{m.name}</span>
              <span className="relative">{m.value}</span>
              <span className="relative w-[68px] text-right">{m.range}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <span className="mx-auto w-9 h-9 rounded-full bg-ink-800 ring-1 ring-white/10 text-hos-yellow flex items-center justify-center" style={fadeUp(2)}>
      <ArrowRight className="hidden md:block w-4 h-4" />
      <ArrowDown className="md:hidden w-4 h-4" />
    </span>

    <div className="rounded-2xl bg-ink-850/95 ring-1 ring-white/10 p-4 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between gap-3 text-[11px]">
        <span className="flex items-center gap-1.5 font-semibold text-white">
          <span className="w-5 h-5 rounded-md bg-[#0F766E] text-white text-[8px] font-bold flex items-center justify-center">YL</span>
          Your Lab · Smart Report
        </span>
      </div>
      <ul className="mt-3 space-y-2.5">
        {sample.map((m, i) => (
          <li key={m.name} style={{ animation: `hos-fade-up 0.5s ease ${0.5 + i * 0.3}s both` }}>
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <span className="font-semibold text-white">
                {m.name} <span className="font-normal text-white/55">{m.value}</span>
              </span>
              <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${verdictChip[m.verdict]}`}>{m.verdict}</span>
            </div>
            <div className="relative mt-1.5 h-1.5 rounded-full bg-white/[0.08]">
              <span className="absolute inset-y-0 left-[30%] right-[30%] rounded-full bg-hos-yellow/60" />
              <span className="absolute top-1/2 -mt-1.5 -ml-1.5 w-3 h-3 rounded-full bg-white/90 ring-2 ring-ink-850" style={{ left: `${m.pos}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

/* ── Three verdicts: where a marker sits against the reference range and the optimal band ── */
const verdicts: { verdict: Verdict; pos: number; body: string }[] = [
  { verdict: 'Optimal', pos: 50, body: 'Inside the optimal band, not just inside the reference range.' },
  { verdict: 'In range', pos: 70, body: 'Within the reference range, but outside the optimal band.' },
  { verdict: 'Outlier', pos: 92, body: 'Outside the reference range, and flagged for attention.' },
];

const VerdictBar: React.FC<{ pos: number }> = ({ pos }) => (
  <div aria-hidden="true" className="hos-anim relative h-2 rounded-full bg-white/[0.06]">
    <span className="absolute inset-y-0 left-[15%] right-[15%] rounded-full bg-white/[0.12]" />
    <span className="absolute inset-y-0 left-[38%] right-[38%] rounded-full bg-hos-yellow/70" />
    <span className="absolute top-1/2 -mt-2 -ml-2 w-4 h-4 rounded-full bg-white/90 ring-[3px] ring-ink-900" style={{ left: `${pos}%`, animation: 'hos-fade-up 0.5s ease 0.3s both' }} />
  </div>
);

/* ── Re-test recall on the partner's own patient history ── */
const DUE = [3, 9, 14, 22, 27, 31, 38, 44, 50, 57, 63, 68];

const RecallVisual: React.FC = () => (
  <div aria-hidden="true" className="hos-anim rounded-[20px] dk-card p-5 sm:p-6 w-full">
    <div className="flex items-center justify-between gap-3 text-[11px]">
      <span className="font-semibold text-white">Your patient history</span>
      <span className="text-white/55">Sample</span>
    </div>
    <div className="mt-4 grid grid-cols-12 sm:grid-cols-[repeat(18,minmax(0,1fr))] gap-1">
      {Array.from({ length: 72 }).map((_, i) => {
        const due = DUE.includes(i);
        return (
          <span
            key={i}
            className={`aspect-square rounded-[4px] ${due ? 'bg-hos-yellow' : 'bg-white/[0.07]'}`}
            style={due ? { animation: `hos-fade-up 0.4s ease ${0.2 + DUE.indexOf(i) * 0.08}s both` } : undefined}
          />
        );
      })}
    </div>
    <div className="mt-3 flex items-center gap-2 text-[11px] text-white/60">
      <span className="w-2.5 h-2.5 rounded-[3px] bg-hos-yellow" />
      Due for a re-test
    </div>

    <div className="mt-6 pt-5 border-t border-white/[0.08]">
      <div className="relative mx-[12.5%] h-[3px] rounded-full bg-white/10">
        <span className="absolute inset-0 origin-left rounded-full bg-hos-yellow" style={{ animation: 'hos-grow 1.8s cubic-bezier(0.2,0.7,0.2,1) 0.6s both' }} />
      </div>
      <div className="grid grid-cols-4 gap-1.5 -mt-[9px]">
        {(
          [
            ['Day 0', 'Panel reported'],
            ['History', 'Due date found'],
            ['Reminder', 'Sent in your name'],
            ['Day 90', 'Back for a re-test'],
          ] as [string, string][]
        ).map(([when, what], i) => (
          <div key={when} className="flex flex-col items-center text-center gap-2" style={fadeUp(i + 4)}>
            <span className={`w-4 h-4 rounded-full ring-4 ring-ink-900 ${i === 3 ? 'bg-hos-yellow' : 'bg-white/90'}`} />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-hos-yellow">{when}</span>
            <span className="text-[11px] text-white/60 leading-tight">{what}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── The same panel as a trend (Live 360° persistence step) ── */
const TrendVisual: React.FC = () => {
  const pts: [number, number][] = [
    [20, 18],
    [110, 32],
    [200, 46],
    [280, 54],
  ];
  return (
    <div aria-hidden="true" className="hos-anim rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.08] p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <span className="font-semibold text-white">The same panel, as a trend</span>
        <span className="text-white/55">HbA1c · 4 reports · sample</span>
      </div>
      <svg viewBox="0 0 300 96" className="mt-4 w-full h-28">
        <rect x="0" y="44" width="300" height="24" rx="4" fill="#F5D97B" fillOpacity="0.16" />
        <text x="8" y="84" fontSize="9" fill="#F5D97B">
          optimal band
        </text>
        <path
          d={`M${pts.map(([x, y]) => `${x} ${y}`).join(' L')}`}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.9"
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
            fill={i === pts.length - 1 ? '#F5D97B' : '#101115'}
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

const formats: [React.FC<{ className?: string }>, string, string][] = [
  [FileText, 'PDF', 'A branded report file for every panel'],
  [Globe, 'Web portal', 'Results under your domain and brand'],
  [Smartphone, 'Mobile app', 'Inside a patient app under your name'],
];

const facts: [string, string][] = [
  ['100+', 'Biomarkers decoded against locally calibrated ranges'],
  ['3', 'Verdicts: optimal, in range or outlier'],
  ['90-day', 'Re-test recall cycle on your own patient history'],
  ['Any', 'Lab PDF format, regardless of layout'],
];

export const CometPage: React.FC = () => {
  useSeo({
    title: 'Smart Reports & Re-Test Recall | Nostavia Health',
    description:
      'Branded Smart Reports that decode 100+ biomarkers from any lab PDF, and a Re-Test Recall Engine that brings due patients back under your name on a 90-day cycle. White Label from $1,500 + $399/mo.',
    path: '/solutions/comet',
  });

  return (
    <div className="flex flex-col text-white bg-ink-950 overflow-x-clip">
      {/* 1. Hero. TODO(copy): new headline and intro */}
      <PageHero
        eyebrow="Smart Reports & Re-Test Recall"
        title={
          <>
            Every report decoded. <span className="dk-text-sun">Every patient back.</span>
          </>
        }
        intro="Smart Reports turn any lab PDF into a branded report patients understand. The Re-Test Recall Engine finds who is due and brings them back under your name."
        primary={{ to: '/demo', label: 'Book a demo' }}
        secondary={{ to: '/pricing', label: 'See pricing' }}
        photo={{ src: '/labs-bg.jpg', w: 1800, h: 1200, alt: 'A laboratory technician holding a blood sample tube' }}
        visual={<SmartReportCard />}
      />

      {/* 2. Key facts */}
      <section aria-label="Smart Reports at a glance" className="bg-ink-950 pb-20 sm:pb-24">
        <Container>
          <Reveal>
            <dl className="grid grid-cols-2 lg:grid-cols-4 rounded-[20px] dk-card overflow-hidden">
              {facts.map(([value, label], i) => (
                <div
                  key={label}
                  className={`flex flex-col gap-2 p-5 sm:p-7 border-white/[0.08] ${i % 2 ? 'border-l' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
                >
                  <dt className="order-2 text-sm text-white/55 leading-relaxed">{label}</dt>
                  <dd className="order-1 font-display font-semibold text-3xl sm:text-4xl tracking-tight text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* 3. Smart Reports */}
      <section aria-labelledby="sr-decode-heading" className="bg-ink-950 pb-24 sm:pb-32">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <Reveal className="lg:col-span-5 space-y-8">
            {/* TODO(copy): section heading and intro */}
            <SectionHeading
              id="sr-decode-heading"
              eyebrow="Smart Reports"
              title="From any PDF to a report patients read."
              intro="Smart Reports sit on top of the reporting pipeline you already run. The interpretation a clinician would spend 20 minutes writing is drafted for every routine panel, for clinician review."
            />
            <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {[
                'Parses any lab PDF, regardless of layout',
                'Decodes 100+ biomarkers against locally calibrated ranges',
                'An optimal, in-range or outlier verdict for every marker',
                'Your logo, brand colours, custom disclaimers and pathologist sign-off blocks',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 py-3 text-base text-white/70">
                  <span aria-hidden="true" className="mt-2.5 w-4 h-[3px] shrink-0 bg-hos-yellow" />
                  {t}
                </li>
              ))}
            </ul>
            <Link to={systemPath('health-decoder')} className={textLink}>
              Explore Health Decoder
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <div className="rounded-[22px] dk-card p-4 sm:p-6">
              <DecodeVisual />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 4. Three verdicts */}
      <section aria-labelledby="sr-verdicts-heading" className="bg-ink-900 border-y border-white/[0.06] py-24 sm:py-32">
        <Container className="space-y-14">
          <Reveal>
            {/* TODO(copy): section heading and intro */}
            <SectionHeading
              id="sr-verdicts-heading"
              eyebrow="Beyond in range"
              title="Three verdicts, not one flag."
              intro="A standard report flags what is out of range. A Smart Report also shows where inside the range a marker sits, against an optimal band."
              center
            />
          </Reveal>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {verdicts.map((v, i) => (
              <li key={v.verdict}>
                <Reveal delay={i * 100} className="h-full">
                  <div className="h-full rounded-[20px] dk-card p-6 sm:p-7 flex flex-col gap-6">
                    <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full ${verdictChip[v.verdict]}`}>{v.verdict}</span>
                    <VerdictBar pos={v.pos} />
                    <p className="text-sm text-white/60 leading-relaxed">{v.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal>
            <div aria-hidden="true" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/55">
              <span className="flex items-center gap-2">
                <span className="w-5 h-2 rounded-full bg-white/[0.12]" />
                Reference range
              </span>
              <span className="flex items-center gap-2">
                <span className="w-5 h-2 rounded-full bg-hos-yellow/70" />
                Optimal band
              </span>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 5. Re-Test Recall */}
      <section aria-labelledby="sr-recall-heading" className="bg-ink-950 py-24 sm:py-32">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <Reveal className="lg:col-span-5 lg:order-2 space-y-8">
            {/* TODO(copy): section heading and intro */}
            <SectionHeading
              id="sr-recall-heading"
              eyebrow="Re-Test Recall Engine"
              title="Patients come back. Under your name."
              intro="The Re-Test Recall Engine finds who is due for a re-test in your own patient history and brings them back under your name on a 90-day cycle."
            />
            <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {['Runs on your own patient history', 'Reminders go out in your name, not ours', 'A 90-day re-test cycle', 'Included with Smart Reports'].map((t) => (
                <li key={t} className="flex items-start gap-3 py-3 text-base text-white/70">
                  <span aria-hidden="true" className="mt-2.5 w-4 h-[3px] shrink-0 bg-hos-yellow" />
                  {t}
                </li>
              ))}
            </ul>
            <Link to={systemPath('agent-workforce')} className={textLink}>
              Explore Agent Workforce
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7 lg:order-1">
            <RecallVisual />
          </Reveal>
        </Container>
      </section>

      {/* 6. Proof: Live 360° Diagnostics */}
      <section aria-labelledby="sr-case-heading" className="bg-ink-900 border-y border-white/[0.06] py-24 sm:py-32">
        <Container className="space-y-14">
          <Reveal>
            {/* TODO(copy): section heading */}
            <SectionHeading id="sr-case-heading" eyebrow="In production" title="Running at Live 360° Diagnostics." />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <Reveal className="lg:col-span-5 h-full">
              <article className="h-full rounded-[22px] dk-card p-6 sm:p-8 flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">Diagnostics</span>
                  <img
                    src="/client_logos/snksn-removebg-preview 1.png"
                    alt="Live 360° Diagnostics logo"
                    width={462}
                    height={201}
                    loading="lazy"
                    decoding="async"
                    className="h-8 w-auto object-contain brightness-0 invert opacity-80"
                  />
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-white leading-snug">Smart Reports, white-labelled and running under their brand.</h3>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">
                  The Smart Report layer sits on their existing lab reporting pipeline, normalises every marker against source-specific reference ranges and keeps results for longitudinal trends. The report itself becomes the retention mechanism.
                </p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {['Any lab PDF format', 'Optimal bands, not just in range', 'The same panel becomes a trend'].map((f) => (
                    <li key={f} className="rounded-full bg-white/[0.05] ring-1 ring-white/10 px-2.5 py-1 text-xs text-white/75">
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-7 h-full">
              <div className="h-full rounded-[22px] dk-card p-6 sm:p-8 flex flex-col justify-center">
                <TrendVisual />
              </div>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal>
              {/* TODO(copy) */}
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">Five steps from any report to a trend.</h3>
            </Reveal>
            <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <span aria-hidden="true" className="hidden lg:block absolute left-12 right-12 top-[46px] h-px bg-gradient-to-r from-hos-yellow/60 via-hos-yellow/20 to-hos-yellow/60" />
              {pipeline.map((p, i) => (
                <li key={p.title} className="relative">
                  <Reveal delay={i * 90} className="h-full">
                    <div className="h-full rounded-[18px] dk-card p-6 flex flex-col gap-3">
                      <span className="relative z-10 w-11 h-11 rounded-full bg-ink-800 ring-1 ring-hos-yellow/50 text-hos-yellow font-mono text-sm font-semibold flex items-center justify-center">
                        <span className="sr-only">Step </span>
                        {i + 1}
                      </span>
                      <h4 className="text-lg font-semibold text-white">{p.title}</h4>
                      <p className="text-sm text-white/60 leading-relaxed">{p.body}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* 7. Pricing and delivery */}
      <section aria-labelledby="sr-plan-heading" className="bg-ink-950 py-24 sm:py-32">
        <Container className="space-y-12">
          <Reveal>
            {/* TODO(copy): section heading and intro */}
            <SectionHeading
              id="sr-plan-heading"
              eyebrow="Pricing and delivery"
              title="One plan. Both products."
              intro="Smart Reports is a White Label product, and Re-Test Recall comes with it. Delivered in the format your patients already use."
            />
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <Reveal className="lg:col-span-5 h-full">
              <div className="relative h-full rounded-[22px] dk-card p-6 sm:p-8 overflow-hidden flex flex-col">
                <span aria-hidden="true" className="absolute -right-10 -top-10 w-72 h-72 bg-[radial-gradient(closest-side,rgba(245,217,123,0.10),transparent)]" />
                <span className="relative text-[11px] font-semibold uppercase tracking-[0.16em] text-hos-yellow">White Label</span>
                <dl className="relative mt-6 grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <dt className="order-2 text-sm text-white/55">One-time setup</dt>
                    <dd className="order-1 font-display font-semibold text-4xl sm:text-5xl tracking-tight text-white">
                      <span className="block text-sm font-body font-medium tracking-normal text-white/55">From</span>
                      $1,500
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="order-2 text-sm text-white/55">Monthly plan</dt>
                    <dd className="order-1 font-display font-semibold text-4xl sm:text-5xl tracking-tight text-white">
                      <span className="block text-sm font-body font-medium tracking-normal text-white/55">From</span>
                      $399<span className="text-lg text-white/60">/mo</span>
                    </dd>
                  </div>
                </dl>
                <p className="relative mt-6 text-sm text-white/60 leading-relaxed">
                  Your plan depends on report volumes and branches, and you get a fixed quote after a free call. Re-Test Recall is included.
                </p>
                <Link to="/pricing" className={`relative mt-auto pt-6 self-start inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-hos-yellow rounded ${focusRing}`}>
                  See pricing
                  <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {formats.map(([Icon, name, line], i) => (
                <Reveal key={name} delay={100 + i * 90} className="h-full">
                  <div className="h-full rounded-[20px] dk-card p-6 flex flex-col gap-4">
                    <span className="w-10 h-10 rounded-xl bg-white/[0.04] ring-1 ring-white/10 flex items-center justify-center text-hos-yellow">
                      <Icon aria-hidden="true" className="w-5 h-5" />
                    </span>
                    <h3 className="text-lg font-semibold text-white">{name}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{line}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={380} className="sm:col-span-3">
                <Link
                  to="/solutions/gravity"
                  className={`group flex items-center gap-4 rounded-[20px] dk-card p-5 sm:p-6 hover:border-white/20 transition-colors ${focusRing}`}
                >
                  <span className="w-10 h-10 shrink-0 rounded-xl bg-white/[0.04] ring-1 ring-white/10 flex items-center justify-center text-hos-yellow">
                    <Code2 aria-hidden="true" className="w-5 h-5" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-base font-semibold text-white">Already have a patient app?</span>
                    <span className="block text-sm text-white/60">Put Smart Reports inside it with the SDK, with no change to your UI.</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="w-5 h-5 shrink-0 text-white/55 group-hover:text-hos-yellow transition-colors" />
                </Link>
              </Reveal>
            </div>
          </div>
          <Reveal>
            <Disclaimer />
          </Reveal>
        </Container>
      </section>

      {/* 8. FAQ */}
      <FaqList
        id="sr-faq-heading"
        title="Smart Reports questions"
        items={[
          {
            q: 'Can we customise the report with our logo and colours?',
            a: 'Yes. Smart Reports are fully white-labelled. We configure your lab logo, brand colours, custom disclaimers and pathologist sign-off blocks during setup.',
          },
          {
            q: 'Which lab report formats can it read?',
            a: 'Any lab PDF. Biomarkers are pulled from the report regardless of layout, and reference ranges are read from the report itself, not from a generic table.',
          },
          {
            q: 'Does it replace our pathologists?',
            a: 'No. Smart Reports are decision support. They draft the interpretation for clinician review and are not a substitute for professional medical judgement.',
          },
          {
            q: 'How does Re-Test Recall work?',
            a: "It looks through your own patient history, finds who is due for a re-test and brings them back under your name on a 90-day cycle. It's included with Smart Reports.",
          },
          {
            q: 'How does pricing work?',
            a: (
              <>
                Smart Reports is a White Label product: a one-time setup from $1,500 plus a monthly plan from $399, depending on report volumes and branches. You get a fixed quote after a free call.{' '}
                <Link to="/pricing" className={textLink}>
                  See pricing
                </Link>
              </>
            ),
          },
          {
            q: 'How are reports delivered to patients?',
            a: 'As a PDF, in a web portal or inside a mobile app, always under your brand.',
          },
        ]}
      />

      {/* 9. Closing CTA. TODO(copy): closing headline and body */}
      <CtaBand
        title="Launch Smart Reports"
        highlight="under your lab's name."
        body="Thirty minutes on live product, not slides. Send a de-identified sample report and we'll show you the output on your own panel."
        primary={{ to: '/demo', label: 'Book a demo' }}
      />
    </div>
  );
};
