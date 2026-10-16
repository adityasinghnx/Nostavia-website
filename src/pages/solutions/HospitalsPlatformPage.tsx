import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileText,
  Globe2,
  HeartPulse,
  Phone,
  ReceiptText,
  Smartphone,
  Stethoscope,
  Watch,
  Wrench,
} from 'lucide-react';
import { CtaBand, FaqList, FeatureGrid, PageHero, Panel, Section, SectionHead, textLink } from '../../components/page/PageKit';
import { Container, Eyebrow, focusRing } from '../../components/home/shared';
import { Reveal } from '../../components/home/motion';
import { VoiceCallCard } from '../../components/home/LiveCards';
import { Disclaimer } from '../../components/human-os/Disclaimer';
import { InfrastructureGroup, PracticeChips } from '../../components/trust/TrustElements';
import { DISCLAIMER, HUMAN_OS_PATH, getSystem, hospitalProgrammes, numberWord, systemPath, systems, totalSystems } from '../../content/human-os';
import { trustPick } from '../../content/trust.config';
import { useSeo } from '../../lib/useSeo';

/* ─────────────────────────────────────────────────────────────────────────────
 * Hospital Programmes (route /solutions/hospitals, also /solutions/hospitals-front-door).
 * Product deep-dive on the five white-label programmes in human-os.ts: what each does,
 * who uses it, the systems behind it, the architecture and an IT/procurement FAQ.
 * The buyer overview (Leakage Audit, pricing tiers, case study) lives on
 * /industries/hospitals. Facts come from this page's previous copy, human-os.ts,
 * trust.config.ts and the hospitals overview.
 * ──────────────────────────────────────────────────────────────────────────── */

const pad = (n: number) => String(n).padStart(2, '0');
const fadeUp = (i: number): React.CSSProperties => ({ animation: `hos-fade-up 0.6s cubic-bezier(0.2,0.7,0.2,1) ${0.15 + i * 0.12}s both` });
const label = 'text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55';

/* ── Sample screens (illustrative values only) ── */

type Tone = 'ok' | 'flag' | 'info';
const toneClass: Record<Tone, string> = {
  ok: 'bg-emerald-400/15 text-emerald-300',
  flag: 'bg-amber-400/15 text-amber-300',
  info: 'bg-white/10 text-white/70',
};

const MiniCard: React.FC<{ title: string; icon: React.ReactNode; sub: string; rows: [string, string, Tone][]; foot: string; top?: React.ReactNode }> = ({
  title,
  icon,
  sub,
  rows,
  foot,
  top,
}) => (
  <div
    className="hos-anim w-[300px] max-w-full rounded-2xl p-4 text-white bg-ink-850/95 ring-1 ring-white/10 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.85)]"
    style={{ animation: 'hos-fade-up 0.6s cubic-bezier(0.2,0.7,0.2,1) both' }}
  >
    <div className="flex items-center gap-2 mb-3">
      <span className="w-7 h-7 shrink-0 rounded-lg flex items-center justify-center bg-white/[0.06] ring-1 ring-white/10 text-hos-yellow">{icon}</span>
      <span className="text-xs font-semibold truncate">{title}</span>
    </div>
    <div className="text-[11px] text-white/55" style={fadeUp(0)}>
      {sub}
    </div>
    {top}
    <ul className="mt-3 space-y-1.5">
      {rows.map(([name, value, tone], i) => (
        <li key={name} className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.05] ring-1 ring-white/[0.06] px-2.5 py-2 text-[11px]" style={fadeUp(i + 1)}>
          <span className="font-semibold">{name}</span>
          <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap ${toneClass[tone]}`}>{value}</span>
        </li>
      ))}
    </ul>
    <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-white/60" style={fadeUp(rows.length + 1)}>
      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-300" />
      {foot}
    </div>
  </div>
);

const PreventiveScreen: React.FC = () => (
  <MiniCard
    title="Annual health membership"
    icon={<ClipboardCheck className="w-3.5 h-3.5" />}
    sub="Health check decoded into a Smart Report"
    top={
      <div className="mt-3 flex items-end gap-3 rounded-lg bg-white/[0.04] ring-1 ring-white/[0.06] px-3 py-2.5" style={fadeUp(0)}>
        <span>
          <span className="block text-[10px] text-white/55">Biological age</span>
          <span className="block text-2xl font-semibold leading-none mt-1">34</span>
        </span>
        <span className="text-[10px] text-white/55 pb-0.5">vs 38 chronological</span>
      </div>
    }
    rows={[
      ['Disease risk scores', 'Explained', 'info'],
      ['Wearable data', 'Synced', 'ok'],
      ['Re-test recall', 'In 90 days', 'flag'],
    ]}
    foot="Renews under your hospital's brand"
  />
);

const RecoveryScreen: React.FC = () => (
  <MiniCard
    title="Discharge-to-Recovery"
    icon={<HeartPulse className="w-3.5 h-3.5" />}
    sub="Day 4 at home · plain-language recovery plan"
    rows={[
      ['Morning medication', 'Taken', 'ok'],
      ['Symptom check-in', 'Done', 'ok'],
      ['Care team', 'Flag for review', 'flag'],
    ]}
    foot="Escalation flags go to your care team"
  />
);

const ChronicScreen: React.FC = () => (
  <MiniCard
    title="Chronic Care Programs"
    icon={<Activity className="w-3.5 h-3.5" />}
    sub="Cardiac care subscription · month 3"
    rows={[
      ['Wearable data', 'Synced', 'ok'],
      ['Adaptive protocol', 'Updated', 'info'],
      ['Care-team dashboard', 'Ready', 'ok'],
    ]}
    foot="Apple Health and Google Health Connect"
  />
);

const InternationalScreen: React.FC = () => (
  <MiniCard
    title="International Patient Continuity"
    icon={<Globe2 className="w-3.5 h-3.5" />}
    sub="Back home after treatment"
    rows={[
      ['Home-country lab PDF', 'Parsed', 'ok'],
      ['Treating surgeon', 'Shared', 'info'],
      ['Teleconsult', 'Thu · 4:30 PM', 'info'],
    ]}
    foot="Lab reports read in any format"
  />
);

/* ── Programme details. Keyed by the programme names in human-os.ts; only live modules are named. ── */

interface ProgrammeDetail {
  moment: string;
  headline: string;
  summary: string;
  includes: string[];
  users: string[];
  Screen: React.FC;
  link?: { to: string; label: string };
}

/* TODO(copy): programme headlines, summaries and "moment" labels */
const details: Record<string, ProgrammeDetail> = {
  'Preventive Program Engine': {
    moment: 'After the health check',
    headline: 'One health check becomes a yearly membership.',
    summary: "Checkups stop ending as a static PDF. Each one becomes an interactive Smart Report and a reason to come back next year, under your hospital's brand.",
    includes: [
      'Interactive Smart Reports in place of static PDFs',
      'Biological age and disease-risk scores',
      'Trajectory Engine projections',
      'Wearable data from Apple Health and Google Health Connect',
      'Automated re-test recall schedules',
    ],
    users: ['Health-check counter', 'Checkup customers, in your app'],
    Screen: PreventiveScreen,
  },
  'Discharge-to-Recovery': {
    moment: 'After discharge',
    headline: 'Recovery keeps going after the patient goes home.',
    summary: 'Every discharged patient leaves with a plain-language recovery protocol and a programme that keeps them on it, with your care team flagged when something needs a look.',
    includes: ['Plain-language recovery protocols', 'Medication schedules with adherence tracking', 'Symptom check-ins', 'Escalation flags to the care team'],
    users: ['Care team', 'Discharged patients'],
    Screen: RecoveryScreen,
  },
  'Chronic Care Programs': {
    moment: 'For long-term conditions',
    headline: 'Chronic care, run as a subscription.',
    summary: 'Turnkey programme management for subscription diabetes, cardiac and metabolic clinics, so long-term patients stay with your hospital.',
    includes: ['Subscription diabetes, cardiac and metabolic clinics', 'Wearable integration', 'Adaptive protocol updates', 'Care-team dashboards'],
    users: ['Diabetes, cardiac and metabolic clinic teams', 'Patients on a subscription plan'],
    Screen: ChronicScreen,
  },
  'International Patient Continuity': {
    moment: 'After flying home',
    headline: 'Care that follows the patient home.',
    summary: 'A post-treatment layer for medical travel on the India and UAE corridor. Patients stay connected to your doctors after they leave.',
    includes: ['Home-country lab reports parsed in any format', 'Teleconsult scheduling after treatment', 'A dashboard for the treating surgeon'],
    users: ['Treating surgeons', 'International patients'],
    Screen: InternationalScreen,
  },
  'Front Desk Agent': {
    moment: 'On the first call',
    headline: 'Enquiries become booked visits.',
    summary: "An AI voice agent on your hospital line. It answers every inbound call in local languages, rules out emergencies, names a specific doctor and books the visit, under your hospital's name.",
    includes: [
      'Answers every inbound call',
      'Local languages, including mid-sentence code-switching',
      'Rules out emergencies first',
      'Hands over to your desk when a call needs a person',
    ],
    users: ['Callers and their families', 'Reception desk and call centre'],
    Screen: () => <VoiceCallCard />,
    link: { to: '/solutions/front-desk', label: 'Explore the AI Front Desk Agent' },
  },
};

/* ── Hero visual: the five programmes in one branded console ── */

const ProgrammeStack: React.FC = () => (
  <div className="hos-anim w-full max-w-[420px] rounded-[22px] p-1.5 dk-card shadow-[0_40px_90px_-45px_rgba(0,0,0,0.9)]">
    <div className="rounded-[17px] bg-ink-900 ring-1 ring-white/[0.06] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="ml-2 text-[11px] text-white/55 truncate">Your Hospital · Patient programmes</span>
      </div>
      <ul className="p-3 space-y-2">
        {hospitalProgrammes.map((p, i) => (
          <li key={p.name} className="flex items-center gap-3 rounded-xl bg-white/[0.03] ring-1 ring-white/[0.06] px-3 py-2.5" style={fadeUp(i)}>
            <span className="font-mono text-[10px] font-bold text-hos-yellow">{pad(i + 1)}</span>
            <span className="flex-1 min-w-0 text-[13px] font-medium text-white truncate">{p.name}</span>
            <span className="hidden sm:flex gap-1">
              {p.poweredBy.map((slug) => (
                <span key={slug} className="w-6 h-6 rounded-full bg-white/[0.06] ring-1 ring-white/10 text-[9px] font-mono text-white/70 flex items-center justify-center">
                  {getSystem(slug)!.number}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
      <div className="px-4 py-3 border-t border-white/[0.06] flex items-center justify-between gap-3 text-[11px] text-white/55">
        <span>Runs on Human OS</span>
        <span>Under your brand</span>
      </div>
    </div>
  </div>
);

/* ── Programme explorer: one tab per programme ── */

const ProgrammeExplorer: React.FC = () => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const programme = hospitalProgrammes[active];
  const detail = details[programme.name];
  const Screen = detail.Screen;

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const last = hospitalProgrammes.length - 1;
    let next = active;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = active === last ? 0 : active + 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = active === 0 ? last : active - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="space-y-4">
      <div
        role="tablist"
        aria-label="Hospital programmes"
        onKeyDown={onKeyDown}
        className="flex lg:grid lg:grid-cols-5 gap-2 overflow-x-auto scrollbar-none snap-x -mx-4 px-4 py-1 sm:mx-0 sm:px-0"
      >
        {hospitalProgrammes.map((p, i) => {
          const isActive = i === active;
          return (
            <button
              key={p.name}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`programme-tab-${i}`}
              aria-selected={isActive}
              aria-controls="programme-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              className={`relative shrink-0 snap-start w-[210px] lg:w-auto text-left rounded-[16px] p-4 border transition-colors ${focusRing} ${
                isActive ? 'bg-white/[0.07] border-white/20' : 'bg-white/[0.02] border-white/[0.08] hover:border-white/20'
              }`}
            >
              <span className={`font-mono text-[11px] font-bold tracking-widest ${isActive ? 'text-hos-yellow' : 'text-white/50'}`}>{pad(i + 1)}</span>
              <span className="mt-2 block font-display font-semibold text-[15px] leading-snug text-white">{p.name}</span>
              <span className="mt-1 block text-xs text-white/55">{details[p.name].moment}</span>
              {isActive && <span aria-hidden="true" className="absolute left-4 right-4 -bottom-px h-[2px] rounded-full bg-hos-yellow" />}
            </button>
          );
        })}
      </div>

      <div id="programme-panel" role="tabpanel" aria-labelledby={`programme-tab-${active}`} tabIndex={0} className={`rounded-[20px] dk-card overflow-hidden ${focusRing}`}>
        <div key={active} className="hos-anim grid grid-cols-1 lg:grid-cols-12" style={{ animation: 'hos-fade-up 0.45s ease both' }}>
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-7">
            <div className="space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-hos-yellow">
                {pad(active + 1)} · {programme.name}
              </div>
              <h3 className="font-display font-semibold text-2xl sm:text-3xl tracking-tight text-white leading-snug">{detail.headline}</h3>
              <p className="text-base text-white/60 leading-relaxed">{detail.summary}</p>
            </div>

            <div>
              <div className={`${label} mb-3`}>What it does</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {detail.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/75 leading-snug">
                    <CheckCircle2 aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0 text-hos-yellow" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className={`${label} mb-3`}>Who uses it</div>
                <ul className="flex flex-wrap gap-2">
                  {detail.users.map((u) => (
                    <li key={u} className="rounded-full bg-white/[0.05] ring-1 ring-white/10 px-3 py-1.5 text-xs text-white/85">
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className={`${label} mb-3`}>Systems behind it</div>
                <ul className="flex flex-wrap gap-2">
                  {programme.poweredBy.map((slug) => {
                    const system = getSystem(slug)!;
                    return (
                      <li key={slug}>
                        <Link
                          to={systemPath(slug)}
                          className={`inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white hover:border-hos-yellow/60 transition-colors ${focusRing}`}
                        >
                          <span className="font-mono text-[10px] text-hos-yellow">{system.number}</span>
                          {system.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {detail.link && (
              <Link to={detail.link.to} className={textLink}>
                {detail.link.label}
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            )}
          </div>

          <div className="lg:col-span-5 relative border-t lg:border-t-0 lg:border-l border-white/[0.06] p-6 sm:p-8 flex flex-col min-h-[340px]">
            <div aria-hidden="true" className="absolute inset-0 dk-grid opacity-40" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(closest-side,rgba(245,217,123,0.10),transparent)]" />
            <span className="relative text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">Sample screen</span>
            <div aria-hidden="true" className="relative flex-1 flex items-center justify-center pt-5">
              <Screen />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Architecture: what flows in, Human OS, what flows out ── */

interface FlowItem {
  icon: React.FC<{ className?: string }>;
  name: string;
  note: string;
}

const inputs: FlowItem[] = [
  { icon: Database, name: 'Your HIS export or feed', note: 'Appointments and visit history' },
  { icon: FileText, name: 'Discharge briefs', note: 'For every discharged patient' },
  { icon: ClipboardCheck, name: 'Lab PDF feeds', note: 'Any report format' },
  { icon: Watch, name: 'Wearables', note: 'Apple Health and Google Health Connect' },
  { icon: Phone, name: 'Your hospital phone line', note: 'Inbound patient calls' },
];

const outputs: FlowItem[] = [
  { icon: Smartphone, name: 'Patient apps in your brand', note: 'Native iOS and Android' },
  { icon: Stethoscope, name: 'Briefs for your care team', note: 'Intake briefs and recovery progress, written back' },
  { icon: CalendarCheck, name: 'Booked visits', note: 'From the Front Desk Agent' },
  { icon: Activity, name: 'Leadership reporting', note: 'B2B Analytics Dashboard' },
];

const FlowColumn: React.FC<{ title: string; items: FlowItem[] }> = ({ title, items }) => (
  <div>
    <div className={`${label} mb-3`}>{title}</div>
    <ul className="space-y-2">
      {items.map(({ icon: Icon, name, note }) => (
        <li key={name} className="flex items-center gap-3 rounded-xl dk-card px-3.5 py-3">
          <span className="w-8 h-8 shrink-0 rounded-lg bg-white/[0.05] ring-1 ring-white/10 text-hos-yellow flex items-center justify-center">
            <Icon aria-hidden="true" className="w-4 h-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-white">{name}</span>
            <span className="block text-xs text-white/55 leading-snug">{note}</span>
          </span>
        </li>
      ))}
    </ul>
  </div>
);

/** Animated connector: horizontal between columns on desktop, vertical when stacked. */
const Connector: React.FC = () => (
  <div aria-hidden="true" className="hos-anim flex items-center justify-center py-1 lg:py-0">
    <div className="hidden lg:block relative w-full h-px bg-gradient-to-r from-white/5 via-white/25 to-white/5">
      {[0, 1, 2].map((i) => (
        <span key={i} className="absolute -top-[3px] left-0 w-1.5 h-1.5 rounded-full bg-hos-yellow" style={{ animation: `hos-flow 2.4s linear ${i * 0.8}s infinite both` }} />
      ))}
    </div>
    <div className="lg:hidden relative h-12 w-px bg-gradient-to-b from-white/5 via-white/25 to-white/5">
      {[0, 1].map((i) => (
        <span key={i} className="absolute -left-[3px] top-0 w-1.5 h-1.5 rounded-full bg-hos-yellow" style={{ animation: `hos-flow-y 2s linear ${i}s infinite both` }} />
      ))}
    </div>
  </div>
);

const ArchitectureDiagram: React.FC = () => (
  <div className="rounded-[22px] dk-card p-5 sm:p-8">
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)_64px_minmax(0,1fr)] items-center">
      <FlowColumn title="What flows in" items={inputs} />
      <Connector />
      <div className="relative rounded-[20px] p-5 sm:p-6 bg-ink-850 dk-ring-sun">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-hos-yellow">Human OS</span>
          <span className="text-[11px] text-white/55">{numberWord(totalSystems)} systems</span>
        </div>
        <ul className="mt-4 space-y-1.5">
          {systems.map((s) => (
            <li key={s.slug}>
              <Link
                to={systemPath(s.slug)}
                className={`flex items-center gap-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] px-3 py-2 text-sm text-white transition-colors ${focusRing}`}
              >
                <span className="font-mono text-[10px] text-hos-yellow">{s.number}</span>
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-white/55 leading-relaxed">Nostavia runs the AI, lab decoding and wearable handling. Your brand stays in front.</p>
      </div>
      <Connector />
      <FlowColumn title="What flows out" items={outputs} />
    </div>
  </div>
);

/* ── Rollout milestones ── */

const milestones = [
  { when: 'Before you sign', title: 'A free Leakage Audit', body: 'Send anonymized history, get back a report on where patients are leaving. Delivered in two weeks, with zero integration.' },
  { when: 'Within days', title: 'Smart Reports on the health-check counter', body: 'The quickest programme to switch on. It needs zero integration with your HIS.' },
  { when: 'By day 60', title: 'The full patient front door', body: 'Every programme you choose, deployed on a timeline we guarantee in the contract.' },
];

const specs = [
  { value: 'HIS-neutral', note: 'Zero changes to your HIS code' },
  { value: 'iOS and Android', note: 'Native apps under your brand' },
  { value: '60 days', note: 'To the full patient front door' },
  { value: 'Built-For-You', note: 'Direct engineering for anything custom' },
];

const inlineLink = `font-semibold text-white underline underline-offset-4 decoration-hos-yellow decoration-2 hover:decoration-white ${focusRing}`;

export const HospitalsPlatformPage: React.FC = () => {
  useSeo({
    title: 'Hospital Programmes | Nostavia Health',
    description:
      'Five white-label patient programmes for hospitals: preventive memberships, discharge recovery, chronic care, international patient continuity and an AI front desk. Built on Human OS, running on top of your HIS.',
    path: '/solutions/hospitals',
  });

  return (
    <div className="flex flex-col font-body text-white bg-ink-950 overflow-x-clip">
      {/* 1. Hero */}
      {/* TODO(copy): hero headline, intro and points */}
      <PageHero
        eyebrow="Hospital Programmes"
        title={
          <>
            Five patient programmes. <span className="dk-text-sun">One front door.</span>
          </>
        }
        intro="Preventive memberships, discharge recovery, chronic care, international follow-up and an AI front desk. Each one runs on top of your HIS and ships under your hospital's brand."
        primary={{ to: '/demo', label: 'Book a platform demo' }}
        secondary={{ to: '/industries/hospitals', label: 'For hospital leadership' }}
        visual={<ProgrammeStack />}
        points={['Zero changes to your HIS code', 'Native iOS and Android apps in your brand', 'One programme or all five, as a single front door']}
      />

      {/* 2. At a glance */}
      <section aria-label="Hospital Programmes at a glance" className="bg-ink-950 border-y border-white/[0.06]">
        <Container>
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06]">
            {specs.map((s, i) => (
              <Reveal key={s.value} delay={i * 80} className="bg-ink-950 py-8 sm:py-10 px-3 sm:px-6">
                <dt className="font-display font-semibold text-xl sm:text-2xl text-white tracking-tight">{s.value}</dt>
                <dd className="mt-2 text-sm text-white/55 leading-snug">{s.note}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* 3. The five programmes */}
      <Section bg="mist" labelledBy="hp-programmes-heading">
        {/* TODO(copy): programmes section heading and intro */}
        <SectionHead
          id="hp-programmes-heading"
          eyebrow="The programmes"
          title="What each programme does, and who runs it."
          intro="Deploy any programme on its own, or all five as a unified front door. Each one runs on Human OS systems you can explore."
          action={{ to: HUMAN_OS_PATH, label: 'Explore Human OS' }}
        />
        <Reveal>
          <ProgrammeExplorer />
        </Reveal>
        <Disclaimer />
      </Section>

      {/* 4. Architecture */}
      <Section labelledBy="hp-architecture-heading">
        {/* TODO(copy): architecture heading and intro */}
        <SectionHead
          id="hp-architecture-heading"
          eyebrow="Architecture"
          title="Sits on top of your HIS. Changes none of it."
          intro="Appointments, discharge briefs, lab PDFs and wearable data flow in. Branded apps, care-team briefs and booked visits flow out. Your HIS code is never modified."
        />
        <Reveal>
          <ArchitectureDiagram />
        </Reveal>
        <FeatureGrid
          items={[
            {
              icon: Database,
              title: 'Your HIS stays as it is',
              body: 'Nostavia reads appointments and writes back clinical briefs and recovery progress. Zero modifications to your HIS codebase.',
            },
            {
              icon: FileText,
              title: 'Works from your HIS export',
              body: 'Standard REST APIs, HL7 or FHIR feeds, or a plain CSV, Excel or PDF export from your HIS team.',
            },
            {
              icon: Smartphone,
              title: 'Your brand on every screen',
              body: 'Native iOS and Android apps and a phone agent that answers as your hospital. Nostavia stays behind the scenes.',
            },
          ]}
        />
        <Reveal>
          <Panel className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <h3 className="font-display font-semibold text-2xl text-white tracking-tight">Built for hospital IT review</h3>
                <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                  Patient data runs on certified cloud infrastructure, through a pipeline aligned with India's DPDP Act.
                </p>
                <Link to="/security" className={textLink}>
                  Security and compliance
                  <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </div>
              <div className="lg:col-span-7">
                <InfrastructureGroup />
              </div>
            </div>
            <PracticeChips items={trustPick(['dpdp', 'abdm', 'no-keys-on-device'])} columns={3} />
          </Panel>
        </Reveal>
      </Section>

      {/* 5. Rollout */}
      <Section bg="navy" labelledBy="hp-rollout-heading">
        {/* TODO(copy): rollout heading and intro */}
        <SectionHead
          id="hp-rollout-heading"
          eyebrow="Rollout"
          title="Start in days. Finish in sixty."
          intro="Begin with the programme that needs no integration, then switch on the rest as your teams are ready."
        />
        <Reveal>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {milestones.map((m, i) => (
              <li key={m.title}>
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 shrink-0 rounded-full ring-1 ring-hos-yellow/50 text-hos-yellow text-xs font-mono font-semibold flex items-center justify-center">
                    <span className="sr-only">Step </span>
                    {i + 1}
                  </span>
                  {i < milestones.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hos-anim hidden md:block flex-1 h-px bg-gradient-to-r from-hos-yellow/50 to-transparent origin-left"
                      style={{ animation: `hos-grow 1s cubic-bezier(0.2,0.7,0.2,1) ${0.3 + i * 0.3}s both` }}
                    />
                  )}
                </div>
                <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-hos-yellow">{m.when}</div>
                <h3 className="mt-2 font-display font-semibold text-lg text-white">{m.title}</h3>
                <p className="mt-1.5 text-sm text-white/60 leading-relaxed">{m.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Reveal className="h-full">
            <div className="h-full rounded-[20px] dk-card p-6 sm:p-8 flex flex-col gap-4">
              <span className="w-10 h-10 rounded-[10px] bg-white/[0.05] ring-1 ring-white/10 text-hos-yellow flex items-center justify-center">
                <Wrench aria-hidden="true" className="w-5 h-5" />
              </span>
              <Eyebrow>Built-For-You</Eyebrow>
              <h3 className="font-display font-semibold text-2xl text-white tracking-tight">Need something the programmes don't cover?</h3>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                Our founding engineers build it on the same platform: department triage flows, bariatric or rehab tracking, outreach screening tools or custom HIS
                connectors. Delivered in 2 to 4 weeks, by the engineers who built the engine.
              </p>
              <Link to="/solutions/engineering" className={`${textLink} mt-auto`}>
                Solutions Engineering
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <div className="h-full rounded-[20px] dk-card p-6 sm:p-8 flex flex-col gap-4">
              <span className="w-10 h-10 rounded-[10px] bg-white/[0.05] ring-1 ring-white/10 text-hos-yellow flex items-center justify-center">
                <ReceiptText aria-hidden="true" className="w-5 h-5" />
              </span>
              <Eyebrow>Pricing</Eyebrow>
              <h3 className="font-display font-semibold text-2xl text-white tracking-tight">One build fee. One monthly plan.</h3>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                Price a single programme or the full front door. Every tier, including Gulf plans, is on the hospitals overview.
              </p>
              <Link to="/industries/hospitals" className={`${textLink} mt-auto`}>
                See hospital pricing
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 6. IT and procurement FAQ */}
      <FaqList
        id="hp-faq-heading"
        eyebrow="IT and procurement"
        title="Questions hospital IT asks first"
        bg="white"
        items={[
          {
            q: 'Do we have to replace our HIS or EMR?',
            a: 'No. Nostavia is HIS-neutral. It reads appointments from your HIS export or a standard REST, HL7 or FHIR feed, and writes clinical briefs and recovery progress back to your care team. There are zero modifications to your HIS code.',
          },
          {
            q: 'Can we start with a single programme?',
            a: 'Yes. Each programme can be deployed on its own or as part of a unified front door. The quickest start is Smart Reports on the health-check counter, which needs zero integration.',
          },
          {
            q: 'How long does deployment take?',
            a: 'Smart Reports on the health-check counter deploy in days. The full patient front door deploys in 60 days, and we guarantee that timeline in the contract.',
          },
          {
            q: 'What data does the Leakage Audit need?',
            a: '12 to 24 months of anonymized history: checkup volumes, discharge records and chronic-patient visit frequencies. Records are anonymized before export, so we never receive names, contact details, MRNs or any identifier that maps back to a patient. Only visit patterns, package types and dates, under a signed data-handling agreement.',
          },
          {
            q: 'Where is patient data processed and stored?',
            a: "On certified cloud infrastructure: Supabase (SOC 2 Type II) for database and authentication, and Microsoft Azure (SOC 2 Type II and ISO/IEC 27001) for cloud AI. Those certifications are held by the providers, not by Nostavia. Our pipeline is aligned with India's DPDP Act 2023, and every AI request runs through a secure server-side proxy.",
          },
          {
            q: 'Whose brand do patients see?',
            a: "Yours. Patient apps ship as native iOS and Android apps under your hospital's brand, and the Front Desk Agent answers calls under your hospital's name. Nostavia runs the AI, lab decoding and wearable handling behind them.",
          },
          {
            q: 'What does hospital leadership get?',
            a: 'The B2B Analytics Dashboard: cohort risk insights and executive reporting across your whole patient population.',
          },
          {
            q: 'What if we need something custom?',
            a: 'Built-For-You. Our founding engineers build hospital-specific technology on the core platform, such as department triage flows or custom HIS connectors, delivered in 2 to 4 weeks. You talk directly to the engineers who built the engine.',
          },
          {
            q: 'What does it cost?',
            a: (
              <>
                A one-time build fee plus a monthly plan, for a single programme or the full front door. See{' '}
                <Link to="/industries/hospitals" className={inlineLink}>
                  hospital pricing
                </Link>{' '}
                or{' '}
                <Link to="/pricing" className={inlineLink}>
                  all pricing
                </Link>
                .
              </>
            ),
          },
          {
            q: 'Is Nostavia a medical device?',
            a: DISCLAIMER,
          },
        ]}
      />

      {/* 7. Closing CTA */}
      {/* TODO(copy): closing headline and body */}
      <CtaBand
        title="Launch your first programme"
        highlight="under your own name."
        body="Walk through all five programmes with our engineers, then try the modules behind them in a sandbox with fictional data."
        primary={{ to: '/demo', label: 'Book a platform demo' }}
        secondary={{ to: '/solutions/front-desk', label: 'See the AI Front Desk Agent' }}
      />
    </div>
  );
};

export default HospitalsPlatformPage;
