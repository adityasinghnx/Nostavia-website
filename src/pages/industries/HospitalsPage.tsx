import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Ban,
  Clock,
  Database,
  FileSearch,
  FileText,
  HeartPulse,
  Network,
  PhoneCall,
  PhoneOff,
  Repeat,
  Server,
  ShieldCheck,
  Stethoscope,
  Users,
  Wrench,
} from 'lucide-react';
import {
  CtaBand,
  FaqList,
  FeatureGrid,
  PageHero,
  Panel,
  Section,
  SectionHead,
  SplitSection,
  StatRow,
  StepList,
  textLink,
} from '../../components/page/PageKit';
import { Eyebrow, focusRing } from '../../components/home/shared';
import { Reveal } from '../../components/home/motion';
import { CohortRiskCard, VoiceCallCard } from '../../components/home/LiveCards';
import { HospitalProgrammesSection } from '../../components/human-os/HospitalProgrammesSection';
import { SystemsToStartWith } from '../../components/human-os/BuyerMapping';
import { Disclaimer } from '../../components/human-os/Disclaimer';
import { DISCLAIMER, hospitalProgrammes } from '../../content/human-os';
import { trustGroup, trustGroups, trustPick } from '../../content/trust.config';
import { useSeo } from '../../lib/useSeo';

/* ─────────────────────────────────────────────────────────────────────────────
 * Buyer overview for hospitals and health systems (/industries/hospitals, also
 * /industries/payer and /industries/payers). The product deep-dive for the five
 * programmes lives on /solutions/hospitals.
 * ──────────────────────────────────────────────────────────────────────────── */

/** Sample layout of the Leakage Report. Deliberately carries no figures: every number in a real report comes from the hospital's own data. */
const LeakageReportPreview: React.FC = () => (
  <div className="hos-anim w-full max-w-[380px] rounded-2xl bg-white/[0.03] text-white p-5 shadow-[0_24px_60px_-20px_rgba(10,10,11,0.45)]">
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <span className="w-8 h-8 shrink-0 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
          <FileSearch className="w-4 h-4" />
        </span>
        <span className="text-xs font-bold truncate">Leakage Report</span>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-white/55">Sample layout</span>
    </div>
    <p className="mt-3 text-[11px] text-white/55">12 to 24 months of anonymized history, priced on your own list</p>
    <ul className="mt-4 space-y-3.5">
      {(
        [
          ['Checkup customers who never returned', 72],
          ['Discharged patients with no follow-up', 54],
          ['Chronic patients who went dormant', 63],
        ] as [string, number][]
      ).map(([label, width], i) => (
        <li key={label}>
          <div className="flex items-center justify-between gap-3 text-[11px]">
            <span className="font-semibold">{label}</span>
            <span className="text-white/55 whitespace-nowrap">₹ value</span>
          </div>
          <div className="mt-1.5 h-2 rounded-full bg-white/[0.04] overflow-hidden">
            <span
              className={`block h-full rounded-full origin-left ${i === 0 ? 'bg-hos-yellow' : 'bg-ink-800'}`}
              style={{ width: `${width}%`, animation: `hos-grow 1s cubic-bezier(0.2,0.7,0.2,1) ${0.2 + i * 0.18}s both` }}
            />
          </div>
        </li>
      ))}
    </ul>
    <div className="mt-4 pt-3 border-t border-white/[0.08] text-[11px] text-white/55">Returned within two weeks. Data deleted after the audit.</div>
  </div>
);

/** What each programme moves on the hospital's own revenue lines. Keyed by the programme names in human-os.ts. */
const revenueLine: Record<string, string> = {
  'Preventive Program Engine': 'Package renewal rate and OPD conversion from checkups.',
  'Discharge-to-Recovery': 'Follow-up OPD capture rate.',
  'Chronic Care Programs': 'Chronic patient lifetime value retained at your facility.',
  'International Patient Continuity': 'International referral and return visit revenue.',
  'Front Desk Agent': 'Inbound call booking conversion and peak load retention.',
};

/* Pricing. Every amount, tier name and inclusion is carried over from the previous version of this page. */
const tiers = [
  {
    name: 'Community Hospitals',
    oneTime: '$5,000',
    monthly: '+ $999 / mo monthly plan',
    fit: 'Under 100 beds. Single site, core programmes and the Front Desk Agent.',
  },
  {
    name: 'Regional Chains & Multispecialty',
    oneTime: '$8,000',
    monthly: '+ $1,499 / mo monthly plan',
    fit: '100 to 300 beds. All five programmes, HIS integration and the B2B Analytics Dashboard.',
    featured: true,
  },
  {
    name: 'Enterprise Chains & GCC',
    oneTime: '$12,000',
    monthly: '+ $1,799 / mo monthly plan · multi-site',
    fit: '300+ beds, multi-hospital groups with custom workflows.',
  },
];

const singleProgrammes = [
  { name: 'Front Desk Agent', oneTime: '$1,500', monthly: '+ $399 / mo', to: '/solutions/front-desk' },
  { name: 'Preventive Program Engine', oneTime: '$3,000', monthly: '+ $699 / mo', to: '/solutions/hospitals' },
  { name: 'Discharge-to-Recovery', oneTime: '$3,000', monthly: '+ $699 / mo', to: '/solutions/hospitals' },
];

const gulfPlans = [
  { name: 'Gulf · Standard', monthly: 'AED 5,500' },
  { name: 'Gulf · Multispecialty', monthly: 'AED 12,000' },
  { name: 'Gulf · Enterprise', monthly: 'AED 25,000+' },
];

const GroupLabel: React.FC<{ label: string; note: string }> = ({ label, note }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
    <span className="inline-flex w-fit items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-white">
      <span aria-hidden="true" className="w-4 h-[3px] bg-hos-yellow" />
      {label}
    </span>
    <span className="text-sm text-white/60">{note}</span>
  </div>
);

export const HospitalsPage: React.FC = () => {
  useSeo({
    title: 'Hospitals and Health Systems | Nostavia Health',
    description:
      'Five white-label patient programmes for hospitals, running on top of your existing HIS under your brand. Starts with a free Leakage Audit on your own data, with full deployment in 60 days.',
    path: '/industries/hospitals',
  });

  const infrastructure = trustGroup('infrastructure');
  const practices = trustPick(['dpdp', 'abdm', 'no-keys-on-device']);

  return (
    <div className="flex flex-col font-body text-white bg-white/[0.03] overflow-x-clip">
      {/* 1. Hero */}
      <PageHero
        eyebrow="Nostavia for hospitals and health systems"
        title="Your HIS runs the hospital. Nostavia runs the relationship."
        intro="We white-label patient programmes onto your existing checkup, discharge and chronic volume, under your brand, live in 60 days."
        primary={{ to: '/demo', label: 'Request a free Leakage Audit' }}
        secondary={{ to: '/solutions/hospitals', label: 'Explore Hospital Programmes' }}
        photo={{ src: '/payers-bg.jpg', w: 1800, h: 1200, alt: 'A green medical cross sign on the front of a hospital building' }}
        visual={<CohortRiskCard />}
        points={[
          'A free Leakage Audit on your own data, before any contract',
          'Five programmes under your brand, on top of your existing HIS',
          'Full deployment in 60 days, guaranteed in the contract',
        ]}
      />

      {/* 2. The engagement in numbers */}
      <Section bg="mist" labelledBy="hosp-numbers-heading">
        {/* TODO(copy): numbers band heading */}
        <SectionHead
          id="hosp-numbers-heading"
          eyebrow="How an engagement runs"
          title="Your own numbers first. A guaranteed launch after."
        />
        <StatRow
          items={[
            { value: 2, label: 'Weeks to your Leakage Report, free and before any contract.' },
            { value: 90, label: 'Day proof pilot, measured on one metric agreed up front.' },
            { value: 60, label: 'Days to full front-door deployment, or plan fees credited.' },
            { value: hospitalProgrammes.length, label: 'White-label programmes, all under your brand.' },
          ]}
        />
      </Section>

      {/* 3. The problem */}
      <Section labelledBy="hosp-problem-heading">
        {/* TODO(copy): problem section heading */}
        <SectionHead
          id="hosp-problem-heading"
          eyebrow="Where hospital revenue leaks"
          title="The visit ends. The relationship should not."
          intro="How much repeat revenue did you leak last year? Most hospitals have never been able to answer that question. It leaks in the same few places."
        />
        <FeatureGrid
          columns={2}
          items={[
            {
              icon: Repeat,
              title: 'Checkup customers who never return',
              body: 'A health check sold as a one-off PDF gives the customer no reason to come back. Next year’s package is bought somewhere else.',
            },
            {
              icon: HeartPulse,
              title: 'Discharged patients with no follow-up',
              body: 'The patient goes home with instructions. Without follow-through, the follow-up OPD visit happens at another facility, or not at all.',
            },
            {
              icon: Activity,
              title: 'Chronic patients who go dormant',
              body: 'Diabetes and cardiac patients need years of care. When engagement stops, that lifetime value leaves with them.',
            },
            {
              icon: PhoneOff,
              title: 'Enquiries lost on the phone',
              body: 'The front desk is where hospitals lose patients. A caller who is not told which doctor to see, or when, books elsewhere.',
            },
          ]}
        />
      </Section>

      {/* 4. The free Leakage Audit */}
      <SplitSection
        id="hosp-audit-heading"
        bg="navy"
        eyebrow="The Leakage Audit: free, before any contract"
        title="How much repeat revenue did you leak last year?"
        intro="Share 12 to 24 months of anonymized historical data: checkup transactions, OPD visits and discharge records. Within two weeks we return a Leakage Report: how many checkup customers never returned, how many discharged patients had no follow-up, how many chronic patients went dormant, and the rupee value of each bucket, computed on your own price list."
        bullets={[
          <>
            <strong className="text-white">Share anonymized data.</strong> CSV, Excel or even PDF exports. Our parser handles any HIS export format.
          </>,
          <>
            <strong className="text-white">Receive your Leakage Report.</strong> A patient-level breakdown with the rupee value of each bucket, in two weeks.
          </>,
          <>
            <strong className="text-white">Decide with your own numbers.</strong> No pitch deck. Your data, your price list, your leakage on a page.
          </>,
          'Anonymized data only, processed under a signed data-handling agreement and deleted after the audit.',
        ]}
        visual={<LeakageReportPreview />}
        cta={{ to: '/demo', label: 'Request a free Leakage Audit' }}
      />

      {/* 5. The five programmes and the Human OS systems behind them */}
      <div className="bg-ink-950 py-20 sm:py-28">
        <HospitalProgrammesSection />
      </div>

      {/* 6. What each programme moves, plus Built-For-You */}
      <Section bg="mist" labelledBy="hosp-revenue-heading">
        {/* TODO(copy): revenue lines heading and intro */}
        <SectionHead
          id="hosp-revenue-heading"
          eyebrow="What each programme moves"
          title="Every programme is tied to a revenue line you already report"
          intro="Run one programme or all five. Each one is aimed at a line your finance team already tracks, so you can judge it on your own numbers."
          action={{ to: '/solutions/hospitals', label: 'See how each programme works' }}
        />
        <Reveal>
          <ol className="rounded-[16px] border border-white/[0.08] bg-white/[0.03] divide-y divide-white/[0.08] overflow-hidden">
            {hospitalProgrammes.map((p, i) => (
              <li key={p.name} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 p-5 sm:p-6 md:items-center">
                <span className="md:col-span-1 font-mono text-xs font-bold tracking-widest text-hos-yellow">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="md:col-span-4 font-display font-bold text-lg text-white leading-snug">{p.name}</h3>
                <p className="md:col-span-5 text-sm text-white/60 leading-relaxed">
                  <span className="font-semibold text-white">Revenue it moves: </span>
                  {revenueLine[p.name]}
                </p>
                <div className="md:col-span-2 md:text-right">
                  <Link
                    to={p.name === 'Front Desk Agent' ? '/solutions/front-desk' : '/solutions/hospitals'}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-hos-yellow ${focusRing}`}
                  >
                    Details
                    <span className="sr-only"> about {p.name}</span>
                    <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal>
          <Panel dark className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <Eyebrow tone="dark">Engineering service</Eyebrow>
              <h3 className="font-display font-semibold text-2xl sm:text-3xl tracking-tight leading-snug">Built-For-You: direct founder engineering</h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Our founding engineers build hospital-specific technology on top of the core engine: custom department triage flows, bariatric and cardiac rehab
                surfaces, camp screening tools or custom HIS connectors. Scoped, priced per engagement, delivered in 2 to 4 weeks.
              </p>
            </div>
            <div className="lg:col-span-5 rounded-[12px] bg-white/5 border border-white/10 p-5 sm:p-6 space-y-3">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-hos-yellow">Our promise</span>
              <p className="font-display text-lg leading-snug text-white">
                You will never file a ticket into a vendor queue. You talk directly to the founders who built the engine.
              </p>
              <Link to="/solutions/engineering" className={`${textLink} text-white`}>
                Solutions Engineering
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </div>
          </Panel>
        </Reveal>
      </Section>

      {/* 7. Human OS: systems to start with */}
      <div className="bg-ink-950 py-20 sm:py-28">
        <SystemsToStartWith buyerId="hospitals" />
      </div>

      {/* 8. Case study */}
      <SplitSection
        id="hosp-case-heading"
        bg="navy"
        reverse
        eyebrow="Deployment case study · Tertiary-care cardiology hospital"
        title="An AI voice agent on a working hospital’s phone line"
        intro="A conversational voice agent handling inbound patient calls end to end, against real hospital flow. Not a decision tree: it is built for the way patients actually talk. Client named on request, under NDA."
        bullets={[
          'Handles local-language code-switching mid-sentence.',
          'Handles family members speaking on behalf of the patient.',
          'Hands off to a human when a call leaves the routine envelope.',
          'Contactless vitals from a short face scan also run in this hospital deployment.',
        ]}
        photo={{ src: '/photos/home-frontdesk-staff.jpg', w: 1600, h: 1067, alt: 'Hospital staff working at a front desk' }}
        visual={<VoiceCallCard />}
        cta={{ to: '/solutions/front-desk', label: 'See the AI Front Desk Agent' }}
      />

      {/* 9. Entry sequence */}
      <Section labelledBy="hosp-entry-heading">
        {/* TODO(copy): entry sequence heading */}
        <SectionHead
          id="hosp-entry-heading"
          eyebrow="How every engagement begins"
          title="Audit, then pilot, then platform. Each step earns the next."
        />
        <StepList
          steps={[
            {
              title: 'Leakage Audit',
              body: 'Free, two weeks, your own data. We show you what you are leaking before you pay anything.',
            },
            {
              title: '90-Day Proof Pilot',
              body: (
                <>
                  Smart Reports on the checkup counter and recall on one dormant cohort. One metric, agreed up front.{' '}
                  <strong className="text-white">If the metric does not move, the pilot fee is credited in full.</strong>
                </>
              ),
            },
            {
              title: 'Platform Contract',
              body: 'A fixed quote: a one-time build fee plus a monthly plan.',
            },
            {
              title: '60-Day Guarantee',
              body: 'Full front-door deployment in 60 days, or one month of your monthly plan credited per month of delay.',
            },
          ]}
        />
      </Section>

      {/* 10. What your team has to do */}
      <Section bg="mist" labelledBy="hosp-team-heading">
        <SectionHead
          id="hosp-team-heading"
          eyebrow="What your team has to do"
          title="Minimal effort from your side, no new headcount"
        />
        <FeatureGrid
          columns={4}
          items={[
            { icon: FileSearch, title: 'Leakage Audit', body: 'One data export from your HIS team. No meetings required.' },
            { icon: Users, title: 'Pilot', body: 'One point of contact, roughly two hours a week.' },
            { icon: Wrench, title: 'Deployment', body: 'Your brand assets and one IT contact for the connector. We do the rest.' },
            { icon: Clock, title: 'Ongoing', body: 'No new headcount. Everything is designed for staff you already have.' },
          ]}
        />
      </Section>

      {/* 11. Pricing */}
      <Section id="pricing" labelledBy="hosp-pricing-heading" className="scroll-mt-24">
        <SectionHead
          id="hosp-pricing-heading"
          eyebrow="Hospital front-door platform pricing"
          title="One build fee. One monthly plan. A guaranteed launch."
          intro="Hospital platform deployment includes turnkey white-labelled patient programmes and the free Leakage Audit. All prices in USD, excluding applicable taxes."
          action={{ to: '/pricing', label: 'SDK, White Label and Custom Build pricing' }}
        />

        <div className="space-y-5">
          <GroupLabel label="Full patient front door" note="All five programmes · one-time build + monthly plan" />
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tiers.map((t, i) => (
              <li key={t.name}>
                <Reveal delay={i * 100} className="h-full">
                  <div
                    className={`h-full rounded-[16px] p-6 sm:p-8 flex flex-col gap-5 border ${
                      t.featured ? 'bg-ink-800 border-white/10 text-white shadow-[0_30px_70px_-40px_rgba(18,26,49,0.8)]' : 'bg-white/[0.03] border-white/[0.08]'
                    }`}
                  >
                    <span aria-hidden="true" className="h-[3px] w-10 bg-hos-yellow" />
                    <h3 className={`font-mono text-xs font-bold uppercase tracking-widest ${t.featured ? 'text-hos-yellow' : 'text-hos-yellow'}`}>{t.name}</h3>
                    <div className="space-y-1.5">
                      <p className={`font-display font-semibold text-4xl tracking-tight ${t.featured ? 'text-white' : 'text-white'}`}>
                        {t.oneTime} <span className={`text-sm font-normal ${t.featured ? 'text-slate-300' : 'text-white/60'}`}>one-time</span>
                      </p>
                      <p className={`text-sm font-semibold ${t.featured ? 'text-hos-yellow' : 'text-hos-yellow'}`}>{t.monthly}</p>
                    </div>
                    <p className={`text-sm leading-relaxed ${t.featured ? 'text-slate-300' : 'text-white/60'}`}>{t.fit}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal>
            <div className="rounded-[12px] bg-white/[0.04] border border-white/[0.08] p-5 sm:p-6 text-sm text-white/70 leading-relaxed">
              <span className="font-semibold text-white">What you pay for: </span>
              the one-time fee covers HIS integration, branding, programme setup, clinical review and staff training. The monthly plan covers hosting, AI,
              updates, support and a named success manager. The Leakage Audit before any contract is free.
            </div>
          </Reveal>
        </div>

        <div className="space-y-5">
          <GroupLabel label="Start with one programme" note="Prove value on one revenue line first, then add the rest" />
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {singleProgrammes.map((s, i) => (
              <li key={s.name}>
                <Reveal delay={i * 100} className="h-full">
                  <Link
                    to={s.to}
                    className={`group h-full flex items-end justify-between gap-4 rounded-[16px] border border-white/[0.08] bg-white/[0.03] p-6 hover:border-white/25 hover:-translate-y-0.5 transition-all duration-300 ${focusRing}`}
                  >
                    <span className="space-y-2">
                      <span className="block font-mono text-[11px] font-bold uppercase tracking-widest text-white/55">{s.name}</span>
                      <span className="block font-display font-semibold text-2xl text-white tracking-tight">
                        {s.oneTime} <span className="text-sm font-normal text-white/60">{s.monthly}</span>
                      </span>
                    </span>
                    <ArrowRight aria-hidden="true" className="w-4 h-4 shrink-0 text-white/55 group-hover:text-white transition-colors" />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <GroupLabel label="Gulf & UAE pricing" note="Anchored to Gulf hospital procurement standards" />
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gulfPlans.map((g, i) => (
              <li key={g.name}>
                <Reveal delay={i * 100} className="h-full">
                  <div className="h-full rounded-[16px] border border-white/[0.08] bg-white/[0.04] p-6 space-y-2">
                    <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-white/55">{g.name}</h3>
                    <p className="font-display font-semibold text-2xl text-white tracking-tight">
                      {g.monthly} <span className="text-sm font-normal text-white/60">/ mo</span>
                    </p>
                    <p className="text-sm text-white/60">+ one-time build, quoted in AED</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 12. What we do not sell */}
      <Section bg="mist" labelledBy="hosp-boundaries-heading">
        <SectionHead
          id="hosp-boundaries-heading"
          eyebrow="Our architectural discipline"
          title="What we do not sell: clear boundaries for hospital IT and clinical leads"
        />
        <FeatureGrid
          columns={2}
          items={[
            {
              icon: Server,
              title: 'We are not an HIS replacement',
              body: 'HIS vendors compete on EMR and billing. Nostavia sits on top: different budget, different buyer, different job. Our booking ships only where no digital front door exists.',
            },
            {
              icon: Ban,
              title: 'We are not a device company',
              body: 'Partner devices produce the data. Nostavia is strictly the software interpretation layer: no hardware liability, no logistics.',
            },
            {
              icon: Stethoscope,
              title: 'We are not autonomous clinical decision-making',
              body: 'Clinician-supervised decision support, reviewed by our clinical advisory bench. Not a medical device, and never a substitute for your doctors’ judgement.',
            },
            {
              icon: FileText,
              title: 'No unmeasured clinical claims',
              body: 'Published peer-reviewed literature carries category claims. Your hospital’s numbers come from your own Leakage Audit and the pilot metric we agree with you up front.',
            },
          ]}
        />
      </Section>

      {/* 13. Enterprise architecture and data */}
      <Section labelledBy="hosp-architecture-heading">
        <SectionHead
          id="hosp-architecture-heading"
          eyebrow="Enterprise architecture and data"
          title="Built to sit on your HIS, aligned with DPDP and ready for ABDM"
          intro="Nostavia reads from the systems you already run and writes back to your care team. Nothing in your HIS codebase changes."
          action={{ to: '/security', label: 'Security and compliance' }}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Reveal className="h-full">
            <Panel className="h-full space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-[10px] bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                  <Database aria-hidden="true" className="w-5 h-5" />
                </span>
                <h3 className="font-display font-bold text-lg">HIS integration</h3>
              </div>
              <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-widest text-hos-yellow">Production connector</span>
              <p className="text-sm text-white/60 leading-relaxed">
                Plugs into your hospital’s existing HIS or EMR through standard REST APIs, HL7 or FHIR feeds, reading appointment schedules and writing back clinical
                intake briefs without disrupting your workflow.
              </p>
            </Panel>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <Panel className="h-full space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-[10px] bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                  <Network aria-hidden="true" className="w-5 h-5" />
                </span>
                <h3 className="font-display font-bold text-lg">ABDM and ABHA data architecture</h3>
              </div>
              <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-widest text-hos-yellow">Architecture ready · certification not yet completed</span>
              <p className="text-sm text-white/60 leading-relaxed">
                Engineered to FHIR R4 and ABDM M1 to M3 data specifications. Records are structured to FHIR R4 so that ABDM linking is a configuration step, not a
                rebuild, once our certification completes.
              </p>
            </Panel>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <Reveal className="lg:col-span-5 h-full">
            <Panel dark className="h-full space-y-5">
              <h3 className="font-display font-bold text-lg text-white">{trustGroups.infrastructure.heading}</h3>
              <ul className="space-y-4">
                {infrastructure.map((item) => (
                  <li key={item.id} className="border-t border-white/10 pt-4">
                    <span className="block font-display font-semibold text-white">{item.name}</span>
                    {item.descriptor && <span className="block text-sm text-slate-300 leading-relaxed mt-1">{item.descriptor}</span>}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-300 leading-relaxed">{trustGroups.infrastructure.caption}</p>
            </Panel>
          </Reveal>
          <ul className="lg:col-span-7 grid grid-cols-1 gap-4">
            {practices.map((item, i) => (
              <li key={item.id}>
                <Reveal delay={i * 90} className="h-full">
                  <div className="h-full flex items-start gap-4 rounded-[16px] border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6">
                    <span aria-hidden="true" className="mt-1 w-4 h-[3px] shrink-0 bg-hos-yellow" />
                    <div>
                      <h3 className="font-display font-bold text-base text-white">{item.name}</h3>
                      <p className="text-sm text-white/60 leading-relaxed mt-1">{item.descriptor}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
        <Disclaimer />
      </Section>

      {/* 14. Proof */}
      <Section bg="mist" labelledBy="hosp-proof-heading">
        {/* TODO(copy): proof section heading and intro */}
        <SectionHead
          id="hosp-proof-heading"
          eyebrow="Where we stand today"
          title="Proof you can check before you sign"
          intro="We would rather you judge us on your own numbers than on our word."
        />
        <FeatureGrid
          columns={2}
          items={[
            {
              icon: PhoneCall,
              title: 'Running in a hospital today',
              body: 'The AI voice agent handles real inbound patient calls at a tertiary-care cardiology hospital. Client named on request, under NDA.',
            },
            {
              icon: FileText,
              title: 'A lab partner you can call',
              body: 'Live 360° Diagnostics runs Smart Reports on Nostavia under its own brand, and is available as a reference.',
            },
            {
              icon: Stethoscope,
              title: 'Clinical governance',
              body: (
                <>
                  Protocol outputs are reviewed before release to any partner by our licensed clinical advisory bench, including GMC-registered physicians, a senior
                  IISc scientist and UCL-trained clinical nutrition.{' '}
                  <Link to="/company" className={`font-semibold text-white underline underline-offset-4 decoration-hos-yellow ${focusRing}`}>
                    Meet the bench
                  </Link>
                </>
              ),
            },
            {
              icon: ShieldCheck,
              title: 'Why the guarantees exist',
              body: 'The audit is free, the pilot fee is credited if the metric does not move, and the launch date is in the contract. Each one lets you test us before you commit.',
            },
          ]}
        />
      </Section>

      {/* 15. FAQ */}
      <FaqList
        id="hosp-faq-heading"
        bg="white"
        title="Hospital leadership FAQ"
        items={[
          {
            q: 'What does the free Leakage Audit actually show us?',
            a: 'A rupee-valued report computed on your own price list: how many checkup customers never returned, how many discharged patients had no follow-up visit, how many chronic patients went dormant, with the revenue value of each bucket. Anonymized data only, processed under a signed data-handling agreement.',
          },
          {
            q: 'What happens if the 90-day pilot does not move our numbers?',
            a: 'The pilot fee is credited in full against any future contract, or you simply walk.',
          },
          {
            q: 'What is the 60-day deployment guarantee?',
            a: 'Full patient front-door deployment in 60 days, or one month of your monthly plan credited per month of delay. We are fast, and we should be penalised when we are not.',
          },
          {
            q: 'How do we see what the programmes are doing?',
            a: 'During the pilot, progress is measured against the single metric agreed with you up front. Leadership also gets the B2B Analytics Dashboard: cohort risk insights and executive reporting across your whole patient population.',
          },
          {
            q: 'Do we have to replace our HIS?',
            a: 'No. Nostavia sits on top of your existing HIS or EMR through standard REST APIs, HL7 or FHIR feeds, or a plain export from your HIS team. Nothing in your HIS codebase changes.',
          },
          {
            q: 'What does it cost?',
            a: 'The full patient front door starts at $5,000 one-time plus $999 a month for community hospitals under 100 beds. A single programme starts at $1,500 one-time plus $399 a month for the Front Desk Agent. All prices in USD, excluding applicable taxes, and the Leakage Audit is free.',
          },
          {
            q: 'Is Nostavia a medical device?',
            a: DISCLAIMER,
          },
        ]}
      />

      {/* 16. Closing CTA */}
      <CtaBand
        title="See your own leaked revenue"
        highlight="before you pay a rupee."
        body="Request a free Leakage Audit. Two weeks, your own data, your own numbers. Then decide."
        primary={{ to: '/demo', label: 'Request a free Leakage Audit' }}
        secondary={{ to: '/solutions/hospitals', label: 'Explore Hospital Programmes' }}
      />
    </div>
  );
};

export default HospitalsPage;
