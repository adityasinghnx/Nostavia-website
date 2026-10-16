import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Bot, Database, LayoutDashboard, Server, Smartphone, Workflow } from 'lucide-react';
import { CtaBand, FaqList, PageHero, textLink } from '../../components/page/PageKit';
import { Container, SectionHeading, focusRing } from '../../components/home/shared';
import { Reveal } from '../../components/home/motion';
import { Disclaimer } from '../../components/human-os/Disclaimer';
import { numberWord, systems, totalLive, totalSystems } from '../../content/human-os';
import { useSeo } from '../../lib/useSeo';

/* ─────────────────────────────────────────────────────────────────────────────
 * Custom Build (routes /solutions/engineering and /solutions/supplements).
 * New products designed and built from scratch on top of Human OS. Facts come
 * from this page's previous copy (who it is for, what gets built, founders,
 * $7,500+ build, $750+/mo plan, 8 to 12 weeks), the pricing page (price range,
 * what the monthly plan covers), the Company page (founders, Kiosk Health) and
 * human-os.ts. Values inside the visuals are samples.
 * ──────────────────────────────────────────────────────────────────────────── */

const fadeUp = (i: number): React.CSSProperties => ({ animation: `hos-fade-up 0.6s cubic-bezier(0.2,0.7,0.2,1) ${0.15 + i * 0.12}s both` });

/* ── Hero visual: a build board moving from scope to launch ── */
const board: { name: string; cards: string[] }[] = [
  { name: 'Scope', cards: ['Your workflow', 'Fixed quote'] },
  { name: 'Build', cards: ['Report engine', 'LIS pipeline', 'Clinician dashboard'] },
  { name: 'Launch', cards: ['Your brand'] },
];

const BuildBoardCard: React.FC = () => {
  let n = 0;
  return (
    <div className="hos-anim w-[300px] max-w-full rounded-2xl p-4 bg-ink-850/95 ring-1 ring-white/10 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.85)]" style={{ animation: 'hos-fade-up 0.6s cubic-bezier(0.2,0.7,0.2,1) both' }}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-white">Your build</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-hos-yellow">On Human OS</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {board.map((col, ci) => (
          <div key={col.name} className="rounded-lg bg-white/[0.04] ring-1 ring-white/[0.06] p-1.5 space-y-1.5">
            <div className="px-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/55">{col.name}</div>
            {col.cards.map((c) => (
              <div
                key={c}
                className={`rounded-md px-1.5 py-1.5 text-[9px] leading-tight ${ci === 2 ? 'bg-hos-yellow text-ink-950 font-semibold' : 'bg-white/[0.07] text-white/80'}`}
                style={fadeUp(n++)}
              >
                {c}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
        <div className="h-full rounded-full bg-hos-yellow origin-left" style={{ animation: 'hos-grow 2.2s cubic-bezier(0.2,0.7,0.2,1) 0.4s both' }} />
      </div>
      <div className="mt-2 text-[10px] text-white/55">Designed around your workflow</div>
    </div>
  );
};

/* ── What we build: tile visuals ── */
const ScoringVisual: React.FC = () => (
  <div className="w-full rounded-xl bg-ink-950/60 ring-1 ring-white/10 p-4">
    <div className="flex items-center justify-between text-[11px]">
      <span className="font-semibold text-white">Your Lab · Custom report</span>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-hos-yellow">Your guidelines</span>
    </div>
    <ul className="mt-3 space-y-2.5">
      {(
        [
          ['Metabolic score', 72],
          ['Heart score', 58],
          ['Liver score', 84],
        ] as [string, number][]
      ).map(([name, w], i) => (
        <li key={name} className="grid grid-cols-[100px_1fr_28px] items-center gap-3 text-[11px]">
          <span className="text-white/70">{name}</span>
          <span className="h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
            <span className="block h-full rounded-full bg-hos-yellow/80 origin-left" style={{ width: `${w}%`, animation: `hos-grow 1s cubic-bezier(0.2,0.7,0.2,1) ${0.2 + i * 0.15}s both` }} />
          </span>
          <span className="text-right font-mono text-white/70">{w}</span>
        </li>
      ))}
    </ul>
  </div>
);

const PipelineVisual: React.FC = () => {
  const nodes: [React.FC<{ className?: string }>, string][] = [
    [Database, 'EHR or LIS'],
    [Server, 'Human OS'],
    [Smartphone, 'Your product'],
  ];
  return (
    <div className="flex items-center w-full">
      {nodes.map(([Icon, label], i) => (
        <React.Fragment key={label}>
          {i > 0 && (
            <span className="relative flex-1 min-w-[16px] h-px bg-white/15 overflow-hidden">
              {[0, 1].map((d) => (
                <span key={d} className="absolute -top-[2px] left-0 w-1.5 h-1.5 rounded-full bg-hos-yellow" style={{ animation: `hos-flow 1.6s linear ${d * 0.8}s infinite` }} />
              ))}
            </span>
          )}
          <span className={`shrink-0 flex flex-col items-center gap-1.5 rounded-xl px-2 sm:px-3 py-3 text-center ${i === 1 ? 'ring-1 ring-hos-yellow/50 bg-hos-yellow/[0.06]' : 'ring-1 ring-white/10 bg-white/[0.04]'}`}>
            <Icon className={`w-4 h-4 ${i === 1 ? 'text-hos-yellow' : 'text-white/70'}`} />
            <span className="text-[10px] font-semibold text-white leading-tight">{label}</span>
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};

const DashboardVisual: React.FC = () => (
  <div className="w-full rounded-xl bg-ink-950/60 ring-1 ring-white/10 p-4">
    <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 text-[10px] uppercase tracking-wider font-semibold text-white/55 pb-2 border-b border-white/10">
      <span>Patient</span>
      <span>Brief</span>
      <span>Notes</span>
    </div>
    <ul className="divide-y divide-white/[0.06]">
      {(
        [
          ['New patient · 52', 'Ready', 'Export'],
          ['Follow-up · 47', 'Reviewed', 'Export'],
          ['New patient · 38', 'Ready', 'Export'],
        ] as [string, string, string][]
      ).map(([who, brief, notes], i) => (
        <li key={who} className="grid grid-cols-[1fr_auto_auto] items-center gap-x-3 py-2 text-[11px]" style={fadeUp(i)}>
          <span className="text-white/80 truncate">{who}</span>
          <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${brief === 'Ready' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-white/10 text-white/70'}`}>{brief}</span>
          <span className="text-[10px] text-hos-yellow">{notes}</span>
        </li>
      ))}
    </ul>
  </div>
);

const AppsVisual: React.FC = () => (
  <ul className="w-full grid grid-cols-2 gap-2">
    {(
      [
        [Smartphone, 'Patient app'],
        [LayoutDashboard, 'Staff platform'],
        [Bot, 'AI agent'],
        [Workflow, 'Integration'],
      ] as [React.FC<{ className?: string }>, string][]
    ).map(([Icon, label], i) => (
      <li key={label} className="flex items-center gap-2.5 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.08] px-3 py-3 text-[11px] font-semibold text-white" style={fadeUp(i)}>
        <Icon className="w-4 h-4 text-hos-yellow shrink-0" />
        {label}
      </li>
    ))}
  </ul>
);

const builds: { name: string; headline: string; body: string; visual: React.ReactNode; span: string }[] = [
  {
    name: 'Lab report engines',
    headline: 'Reports built to your clinical guidelines.',
    body: 'Custom layouts, your branding and biomarker scoring designed around your own clinical guidelines.',
    visual: <ScoringVisual />,
    span: 'lg:col-span-7',
  },
  {
    name: 'EHR and LIS pipelines',
    headline: 'Your data, flowing into your product.',
    body: 'Integrations into your EHR or your own LIS database, for data sync and report generation.',
    visual: <PipelineVisual />,
    span: 'lg:col-span-5',
  },
  {
    name: 'Clinical dashboards',
    headline: 'A workspace for your physicians.',
    body: 'Web dashboards where your doctors review AI intake briefs, adjust protocols and export patient notes.',
    visual: <DashboardVisual />,
    span: 'lg:col-span-5',
  },
  {
    name: 'Apps, platforms and AI agents',
    headline: 'Whatever does not exist yet.',
    body: 'Custom apps, platforms, AI agents and integrations for hospital groups, diagnostic networks, insurers, public-health programmes and founders.',
    visual: <AppsVisual />,
    span: 'lg:col-span-7',
  },
];

/* ── Built on Human OS: the live modules every build can start from ── */
const HumanOsStack: React.FC = () => (
  <div className="hos-anim rounded-[20px] dk-card p-4 sm:p-6 w-full">
    <div className="rounded-2xl ring-1 ring-hos-yellow/40 bg-hos-yellow/[0.06] px-4 py-3 flex items-center justify-between gap-3" style={fadeUp(0)}>
      <span className="text-sm font-semibold text-white">Your product</span>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-hos-yellow">Built from scratch</span>
    </div>
    <div aria-hidden="true" className="relative mx-auto h-8 w-3 overflow-hidden">
      <span className="absolute left-1/2 top-0 bottom-0 w-px bg-white/15" />
      <span className="absolute left-1/2 -ml-[3px] top-0 w-1.5 h-1.5 rounded-full bg-hos-yellow" style={{ animation: 'hos-flow-y 1.6s linear infinite' }} />
    </div>
    <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">Human OS, ready underneath</h3>
    <ul className="space-y-1.5">
      {systems.map((s, i) => (
        <li key={s.slug} className="grid grid-cols-1 sm:grid-cols-[170px_1fr] gap-1.5 sm:gap-3 items-start rounded-xl bg-white/[0.03] ring-1 ring-white/[0.06] px-3 py-2.5" style={fadeUp(i + 1)}>
          <span className="flex items-center gap-2 text-xs font-semibold text-white">
            <span className="font-mono text-[10px] text-hos-yellow">{s.number}</span>
            {s.name}
          </span>
          <span className="flex flex-wrap gap-1">
            {s.modules
              .filter((m) => m.status === 'live')
              .map((m) => (
                <span key={m.name} className="rounded-full bg-white/[0.05] ring-1 ring-white/10 px-2 py-0.5 text-[10px] text-white/70">
                  {m.name}
                </span>
              ))}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

const buildSteps = [
  { title: 'Scope', body: 'Tell us what you want built. We scope it with you and give you a fixed quote after a free call.' },
  { title: 'Design', body: 'Our founding engineers design the product around your workflow, on top of Human OS.' },
  { title: 'Build and launch', body: 'Built from scratch and launched under your brand, in 8 to 12 weeks.' },
  { title: 'Run', body: 'We run it after launch. The monthly plan covers hosting, AI, updates and support.' },
];

const founders = [
  { name: 'Aditya Singh', role: 'Co-founder & Chief Executive Officer', initials: 'AS' },
  { name: 'Anushka Gupta', role: 'Co-founder & Chief Technology Officer', initials: 'AG' },
];

const facts: [string, string][] = [
  ['Founders', 'Direct engineering access'],
  ['$7,500+', 'One-time build'],
  ['$750+/mo', 'Monthly plan'],
  ['8 to 12 weeks', 'Time to launch'],
];

export const SupplementsPage: React.FC = () => {
  useSeo({
    title: 'Custom Build | Nostavia Health',
    description:
      'Custom health AI products designed and built from scratch on top of Human OS: apps, platforms, dashboards, AI agents and integrations, launched and run by Nostavia. From $7,500 one-time plus $750 a month.',
    path: '/solutions/engineering',
  });

  return (
    <div className="flex flex-col text-white bg-ink-950 overflow-x-clip">
      {/* 1. Hero. TODO(copy): new headline and intro */}
      <PageHero
        eyebrow="Custom Build"
        title={
          <>
            Something new in mind? <span className="dk-text-sun">We'll build it.</span>
          </>
        }
        intro="For products that do not exist yet. Our founding engineers design yours around your workflow and build it from scratch on Human OS, so you never pay to reinvent the AI."
        primary={{ to: '/demo', label: 'Book a scoping call' }}
        secondary={{ to: '/pricing', label: 'See pricing' }}
        photo={{ src: '/photos/home-custom-team.jpg', w: 1600, h: 1200, alt: 'A team planning a product at a whiteboard' }}
        visual={<BuildBoardCard />}
      />

      {/* 2. Key facts, exactly as previously published */}
      <section aria-label="Custom Build at a glance" className="bg-ink-950 pb-20 sm:pb-24">
        <Container>
          <Reveal>
            <dl className="grid grid-cols-2 lg:grid-cols-4 rounded-[20px] dk-card overflow-hidden">
              {facts.map(([value, label], i) => (
                <div
                  key={label}
                  className={`flex flex-col gap-2 p-5 sm:p-7 border-white/[0.08] ${i % 2 ? 'border-l' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
                >
                  <dt className="order-2 text-sm text-white/55">{label}</dt>
                  <dd className="order-1 font-display font-semibold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* 3. What we build */}
      <section aria-labelledby="cb-build-heading" className="bg-ink-950 pb-24 sm:pb-32">
        <Container className="space-y-14">
          <Reveal>
            {/* TODO(copy): section heading and intro */}
            <SectionHeading
              id="cb-build-heading"
              eyebrow="What we build"
              title="Apps, platforms, dashboards, agents, integrations."
              intro="If the product you need is not on the shelf, we design and build it with you, then launch it under your brand."
            />
          </Reveal>

          <ul className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {builds.map((b, i) => (
              <li key={b.name} className={b.span}>
                <Reveal delay={(i % 2) * 100} className="h-full">
                  <article className="group relative flex flex-col h-full rounded-[20px] dk-card p-5 sm:p-7 overflow-hidden hover:border-white/20 transition-colors">
                    <span aria-hidden="true" className="absolute -right-16 -top-16 w-48 h-48 bg-[radial-gradient(closest-side,rgba(245,217,123,0.10),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div aria-hidden="true" className="hos-anim relative flex items-center justify-center min-h-[180px] rounded-2xl bg-white/[0.02] ring-1 ring-white/[0.05] p-4 sm:p-5">
                      {b.visual}
                    </div>
                    <span className="relative mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">{b.name}</span>
                    <h3 className="relative mt-3 text-2xl font-semibold text-white leading-snug">{b.headline}</h3>
                    <p className="relative mt-2 text-sm text-white/60 leading-relaxed">{b.body}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 4. Built on Human OS */}
      <section aria-labelledby="cb-hos-heading" className="bg-ink-900 border-y border-white/[0.06] py-24 sm:py-32">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5 space-y-8">
            {/* TODO(copy): section heading and intro */}
            <SectionHeading
              id="cb-hos-heading"
              eyebrow="Built on Human OS"
              title="Start from the AI that already exists."
              intro={`Every build can draw on the ${totalLive} modules already available across ${numberWord(totalSystems).toLowerCase()} Human OS systems. We design the product around your workflow. The intelligence underneath is already built.`}
            />
            <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {[
                'No paying to reinvent lab decoding, wearables or AI agents',
                'Every module can be tried in a sandbox with fictional data first',
                'Improvements ship server-side, with no app update for you',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 py-3 text-base text-white/70">
                  <span aria-hidden="true" className="mt-2.5 w-4 h-[3px] shrink-0 bg-hos-yellow" />
                  {t}
                </li>
              ))}
            </ul>
            <Link to="/human-os" className={textLink}>
              Explore Human OS
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
            <Disclaimer />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <HumanOsStack />
          </Reveal>
        </Container>
      </section>

      {/* 5. How a build runs */}
      <section aria-labelledby="cb-steps-heading" className="bg-ink-950 py-24 sm:py-32">
        <Container className="space-y-14">
          <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            {/* TODO(copy): section heading and intro */}
            <SectionHeading
              id="cb-steps-heading"
              eyebrow="How it works"
              title="From first call to launch in 8 to 12 weeks."
              intro="One team from scope to launch, and the same team running it after."
            />
            <Link to="/demo" className={`shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-hos-yellow rounded ${focusRing}`}>
              Book a scoping call
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </Reveal>
          <div className="rounded-[20px] dk-card p-6 sm:p-8">
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {buildSteps.map((s, i) => (
                <li key={s.title}>
                  <Reveal delay={i * 90}>
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 shrink-0 rounded-full ring-1 ring-hos-yellow/50 text-hos-yellow text-xs font-mono font-semibold flex items-center justify-center">
                        <span className="sr-only">Step </span>
                        {i + 1}
                      </span>
                      {i < buildSteps.length - 1 && <span aria-hidden="true" className="hidden lg:block flex-1 h-px bg-gradient-to-r from-hos-yellow/40 to-transparent" />}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
                    <p className="mt-1.5 text-sm text-white/60 leading-relaxed">{s.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* 6. Pricing */}
      <section aria-labelledby="cb-pricing-heading" className="bg-ink-900 border-y border-white/[0.06] py-24 sm:py-32">
        <Container className="space-y-12">
          <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            {/* TODO(copy): section heading and intro */}
            <SectionHeading
              id="cb-pricing-heading"
              eyebrow="Pricing"
              title="A build fee, a monthly plan, a fixed quote."
              intro="You get a fixed quote after a free call. The monthly plan covers hosting, AI, updates and support."
            />
            <Link to="/pricing" className={`shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-hos-yellow rounded ${focusRing}`}>
              See all pricing
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'One-time build', value: '$7,500+', note: 'From $7,500 to $25,000, depending on scope.' },
              { label: 'Monthly plan', value: '$750+/mo', note: 'From $750 to $2,000 a month. Covers hosting, AI, updates and support.' },
            ].map((p, i) => (
              <Reveal key={p.label} delay={i * 100} className="h-full">
                <div className="relative h-full rounded-[20px] dk-card p-6 sm:p-8 overflow-hidden">
                  <span aria-hidden="true" className="absolute right-0 top-0 w-64 h-64 bg-[radial-gradient(closest-side,rgba(245,217,123,0.08),transparent)]" />
                  <div className="relative text-[11px] font-semibold uppercase tracking-[0.16em] text-hos-yellow">{p.label}</div>
                  <div className="relative mt-4 font-display font-semibold text-5xl sm:text-6xl tracking-tight text-white">{p.value}</div>
                  <p className="relative mt-4 text-sm text-white/60 leading-relaxed">{p.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="text-xs text-white/55 leading-relaxed">All prices in USD, excluding applicable taxes. INR and AED quotes are available on request.</p>
        </Container>
      </section>

      {/* 7. Founders and delivery depth */}
      <section aria-labelledby="cb-team-heading" className="bg-ink-950 py-24 sm:py-32">
        <Container className="space-y-14">
          <Reveal>
            {/* TODO(copy): section heading and intro */}
            <SectionHeading
              id="cb-team-heading"
              eyebrow="Who builds it"
              title="Built by the founders. Proven in the field."
              intro="You work directly with the founding team, the same people who built the platform underneath."
            />
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <Reveal className="lg:col-span-5 h-full">
              <article className="h-full rounded-[22px] dk-card p-6 sm:p-8 flex flex-col gap-6">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">Direct engineering access</span>
                <h3 className="text-2xl font-semibold text-white leading-snug">Founder-built by biotechnology and AI engineers.</h3>
                <ul className="space-y-2">
                  {founders.map((f) => (
                    <li key={f.name} className="flex items-center gap-3 rounded-xl bg-white/[0.03] ring-1 ring-white/[0.06] p-3">
                      <span aria-hidden="true" className="w-10 h-10 shrink-0 rounded-full bg-hos-yellow/15 ring-1 ring-hos-yellow/40 text-hos-yellow text-xs font-semibold flex items-center justify-center">
                        {f.initials}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-white">{f.name}</span>
                        <span className="block text-xs text-white/55">{f.role}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <Link to="/company" className={`mt-auto self-start inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-hos-yellow rounded ${focusRing}`}>
                  Meet the team
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </article>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-7 h-full">
              <article className="h-full rounded-[22px] dk-card p-6 sm:p-8 flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">Delivery depth · Public health</span>
                  <img
                    src="/client_logos/kiosk_health_clean.png"
                    alt="Kiosk Health logo"
                    width={812}
                    height={309}
                    loading="lazy"
                    decoding="async"
                    className="h-7 w-auto object-contain brightness-0 invert opacity-80"
                  />
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-white leading-snug">Offline-first village health kiosks across four Uttar Pradesh districts.</h3>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">
                  A Hindi voice copilot, decoded diagnostics spoken aloud and a chronic disease registry with automated recall, on a single tablet at each kiosk. It turns the village health worker the state already deploys into a clinical navigator.
                </p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {['Chitrakoot, Pratapgarh, Kaushambi, Prayagraj', 'Offline-first', 'Hindi voice'].map((f) => (
                    <li key={f} className="rounded-full bg-white/[0.05] ring-1 ring-white/10 px-2.5 py-1 text-xs text-white/75">
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/company" className={`mt-auto pt-6 self-start inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-hos-yellow rounded ${focusRing}`}>
                  Read the story
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 8. FAQ */}
      <FaqList
        id="cb-faq-heading"
        title="Custom Build questions"
        items={[
          {
            q: 'What can you build?',
            a: 'Custom apps, platforms, dashboards, AI agents and integrations for products that do not exist yet. Examples include bespoke lab report engines, EHR and LIS pipelines, and clinical dashboards for your physicians.',
          },
          {
            q: 'Who builds it?',
            a: 'Our founding team, with direct engineering access from scoping to launch.',
          },
          {
            q: 'How long does it take?',
            a: '8 to 12 weeks to launch.',
          },
          {
            q: 'What does it cost?',
            a: (
              <>
                A one-time build from $7,500 plus a monthly plan from $750. The monthly plan covers hosting, AI, updates and support. You get a fixed quote after a free call.{' '}
                <Link to="/pricing" className={textLink}>
                  See pricing
                </Link>
              </>
            ),
          },
          {
            q: 'Will it carry our brand?',
            a: 'Yes. Everything we build ships under your brand.',
          },
          {
            q: 'Should we choose Custom Build or White Label?',
            a: (
              <>
                If one of our ready-made products fits, White Label is faster: live in 2 to 8 weeks, from $1,500 + $399/mo. Choose Custom Build when you need something that does not exist yet.{' '}
                <Link to="/solutions/storyhealth" className={textLink}>
                  See White Label
                </Link>
              </>
            ),
          },
        ]}
      />

      {/* 9. Closing CTA. TODO(copy): closing headline and body */}
      <CtaBand
        title="Tell us what you want built."
        highlight="We'll scope it with you."
        body="Thirty minutes with the founding team. Bring the problem, and we'll show you what Human OS already does and what we would build around it."
        primary={{ to: '/demo', label: 'Book a scoping call' }}
      />
    </div>
  );
};
