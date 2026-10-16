import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2, Code2, Hammer } from 'lucide-react';
import { CtaBand, FaqList, PageHero, textLink } from '../../components/page/PageKit';
import { Container, SectionHeading, focusRing } from '../../components/home/shared';
import { Reveal, Waveform } from '../../components/home/motion';
import { Disclaimer } from '../../components/human-os/Disclaimer';
import { ProductionGroup } from '../../components/trust/TrustElements';
import { hospitalProgrammes, numberWord } from '../../content/human-os';
import { useSeo } from '../../lib/useSeo';

/* ─────────────────────────────────────────────────────────────────────────────
 * White Label (route /solutions/storyhealth). Nostavia's ready-made products,
 * launched under the partner's brand. Facts come from this page's previous copy
 * (setup and monthly prices, 2 to 8 weeks, zero engineers, store submission,
 * FAQ), the pricing page (per-product prices), human-os.ts and the homepage
 * customer stories. Values inside the visuals are samples, not patient data.
 * ──────────────────────────────────────────────────────────────────────────── */

const fadeUp = (i: number): React.CSSProperties => ({ animation: `hos-fade-up 0.6s cubic-bezier(0.2,0.7,0.2,1) ${0.15 + i * 0.12}s both` });

/* ── Hero visual: the same app, re-skinned for three sample brands ── */
const brands = [
  { initials: 'YL', name: 'Your Lab', color: '#0F766E' },
  { initials: 'YC', name: 'Your Clinic', color: '#6D28D9' },
  { initials: 'YH', name: 'Your Hospital', color: '#1D4ED8' },
];

const BrandSwapCard: React.FC = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setI((x) => (x + 1) % brands.length), 2800);
    return () => window.clearInterval(id);
  }, []);
  const b = brands[i];
  return (
    <div className="hos-anim w-[290px] max-w-full rounded-2xl p-4 bg-ink-850/95 ring-1 ring-white/10 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.85)]" style={{ animation: 'hos-fade-up 0.6s cubic-bezier(0.2,0.7,0.2,1) both' }}>
      <div key={b.name} className="flex items-center justify-between gap-3" style={{ animation: 'hos-fade-up 0.45s ease both' }}>
        <span className="flex items-center gap-2.5 min-w-0">
          <span className="w-8 h-8 shrink-0 rounded-lg text-white text-[10px] font-bold flex items-center justify-center" style={{ background: b.color }}>
            {b.initials}
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-semibold text-white truncate">{b.name}</span>
            <span className="block text-[10px] text-white/55">iOS and Android</span>
          </span>
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-hos-yellow">Your brand</span>
      </div>
      <div className="mt-3 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06] p-3">
        <div className="text-[11px] font-semibold text-white">Your report is ready</div>
        <ul className="mt-2.5 space-y-2">
          {(
            [
              ['HbA1c', 52],
              ['Vitamin D', 18],
              ['LDL', 66],
            ] as [string, number][]
          ).map(([name, pos]) => (
            <li key={name} className="grid grid-cols-[64px_1fr] items-center gap-2 text-[10px] text-white/70">
              <span>{name}</span>
              <span className="relative h-1.5 rounded-full bg-white/[0.08]">
                <span className="absolute inset-y-0 left-[30%] right-[30%] rounded-full transition-colors duration-500" style={{ background: b.color }} />
                <span className="absolute top-1/2 -mt-1 -ml-1 w-2 h-2 rounded-full bg-white/90" style={{ left: `${pos}%` }} />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-3 w-fit max-w-[92%] rounded-2xl rounded-bl-sm bg-white/[0.07] ring-1 ring-white/10 text-[11px] px-3 py-2 text-white/80">
        Your vitamin D is below range. Want a plan to bring it up?
      </div>
    </div>
  );
};

/* ── Product tile visuals (sample values) ── */
const AppVisual: React.FC = () => (
  <div className="flex items-end justify-center gap-5 w-full">
    <div className="w-[164px] shrink-0 rounded-[28px] ring-[6px] ring-ink-700 bg-ink-950 p-3 space-y-2" style={fadeUp(0)}>
      <div className="mx-auto h-1 w-10 rounded-full bg-white/15" />
      <div className="flex items-center gap-1.5 pt-1">
        <span className="w-5 h-5 rounded-md bg-[#0F766E] text-white text-[8px] font-bold flex items-center justify-center">YL</span>
        <span className="text-[10px] font-semibold text-white">Your Lab</span>
      </div>
      <div className="rounded-lg bg-white/[0.06] p-2" style={fadeUp(1)}>
        <div className="text-[9px] text-white/55">Latest report</div>
        <div className="text-[11px] font-semibold text-white">3 markers to review</div>
      </div>
      {[62, 36, 78].map((w, i) => (
        <div key={i} className="h-1.5 rounded-full bg-white/[0.08]">
          <div className="h-full rounded-full bg-hos-yellow/70 origin-left" style={{ width: `${w}%`, animation: `hos-grow 0.9s cubic-bezier(0.2,0.7,0.2,1) ${0.3 + i * 0.12}s both` }} />
        </div>
      ))}
      <div className="ml-auto w-fit max-w-[90%] rounded-xl rounded-br-sm bg-hos-yellow text-ink-950 text-[9px] px-2 py-1.5" style={fadeUp(3)}>
        Why is LDL flagged?
      </div>
      <div className="w-fit max-w-[95%] rounded-xl rounded-bl-sm bg-white/[0.07] text-[9px] px-2 py-1.5 text-white/80" style={fadeUp(4)}>
        It is above your range on this report. Here is what helps.
      </div>
    </div>
    <div className="hidden sm:flex flex-col gap-2 pb-6">
      {['App Store', 'Google Play'].map((store, i) => (
        <span key={store} className="flex items-center gap-2 rounded-xl bg-white/[0.04] ring-1 ring-white/10 px-3 py-2" style={fadeUp(i + 2)}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
          <span className="leading-tight">
            <span className="block text-[11px] font-semibold text-white">{store}</span>
            <span className="block text-[10px] text-white/55">Under your organisation</span>
          </span>
        </span>
      ))}
    </div>
  </div>
);

type Verdict = 'Optimal' | 'In range' | 'Outlier';
const verdictChip: Record<Verdict, string> = {
  Optimal: 'bg-emerald-400/15 text-emerald-300',
  'In range': 'bg-white/10 text-white/70',
  Outlier: 'bg-amber-400/15 text-amber-300',
};

const ReportVisual: React.FC = () => (
  <ul className="w-full space-y-3">
    {(
      [
        ['HbA1c', 52, 'Optimal'],
        ['Vitamin D', 18, 'Outlier'],
        ['LDL', 66, 'In range'],
      ] as [string, number, Verdict][]
    ).map(([name, pos, verdict], i) => (
      <li key={name} className="grid grid-cols-[72px_1fr_64px] items-center gap-3 text-[11px]" style={fadeUp(i)}>
        <span className="text-white/70">{name}</span>
        <span className="relative h-1.5 rounded-full bg-white/[0.08]">
          <span className="absolute inset-y-0 left-[30%] right-[30%] rounded-full bg-hos-yellow/60" />
          <span className="absolute top-1/2 -mt-1.5 -ml-1.5 w-3 h-3 rounded-full bg-white/90 ring-2 ring-ink-900" style={{ left: `${pos}%` }} />
        </span>
        <span className={`justify-self-end text-[9px] font-semibold px-1.5 py-0.5 rounded ${verdictChip[verdict]}`}>{verdict}</span>
      </li>
    ))}
  </ul>
);

const CallVisual: React.FC = () => (
  <div className="w-full space-y-3">
    <div className="flex items-center justify-between text-[11px] text-white/60">
      <span>Inbound call · Hindi</span>
      <span className="text-emerald-300 font-semibold">On a call</span>
    </div>
    <Waveform height={36} className="w-full" />
    <div className="rounded-xl bg-white/[0.06] ring-1 ring-white/[0.06] px-3 py-2 text-[11px] text-white/80 leading-relaxed" style={fadeUp(1)}>
      Cardiology OPD has a slot on Tuesday at 10:30. Shall I book it for you?
    </div>
  </div>
);

const ProgrammesVisual: React.FC = () => (
  <ol className="w-full grid grid-cols-1 sm:grid-cols-2 gap-1.5">
    {hospitalProgrammes.map((p, i) => (
      <li key={p.name} className="flex items-center gap-2.5 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06] px-3 py-2 text-[11px] text-white/80" style={fadeUp(i)}>
        <span className="font-mono text-[10px] text-hos-yellow">{String(i + 1).padStart(2, '0')}</span>
        {p.name}
      </li>
    ))}
  </ol>
);

/* Prices exactly as published on the pricing page. */
const products: { name: string; headline: string; body: string; price: string; to: string; cta: string; visual: React.ReactNode; span: string }[] = [
  {
    name: 'Branded iOS and Android app',
    headline: 'Your own app, in both stores.',
    body: 'Your logo, colours and onboarding, published to the App Store and Google Play under your organisation. Patients upload lab PDFs, see every marker decoded and ask an AI health companion about their own results.',
    price: 'From $2,500 + $499/mo',
    to: '/pricing',
    cta: 'See pricing',
    visual: <AppVisual />,
    span: 'lg:col-span-7',
  },
  {
    name: 'Smart Reports and Re-Test Recall',
    headline: 'Reports patients read. Recalls that bring them back.',
    body: 'Any lab PDF decoded into 100+ biomarkers, each with an optimal, in-range or outlier verdict. Patients due for a re-test come back under your name on a 90-day cycle.',
    price: 'From $1,500 + $399/mo',
    to: '/solutions/comet',
    cta: 'Explore Smart Reports',
    visual: <ReportVisual />,
    span: 'lg:col-span-5',
  },
  {
    name: 'AI Front Desk Agent',
    headline: 'Every call answered. Every visit booked.',
    body: 'Answers every call 24/7 in local languages, rules out emergencies, names a relevant doctor and books the visit.',
    price: 'From $1,500 + $399/mo',
    to: '/solutions/front-desk',
    cta: 'Explore the Front Desk Agent',
    visual: <CallVisual />,
    span: 'lg:col-span-5',
  },
  {
    name: 'Hospital patient programmes',
    headline: "Patient programmes under the hospital's name.",
    body: `${numberWord(hospitalProgrammes.length)} programmes that run on Human OS under your hospital's brand, from preventive memberships to a front desk that answers every call.`,
    price: 'From $5,000 + $999/mo',
    to: '/solutions/hospitals',
    cta: 'Explore hospital programmes',
    visual: <ProgrammesVisual />,
    span: 'lg:col-span-7',
  },
];

/* ── "Your brand on the front, our engine behind it" ── */
const EngineVisual: React.FC = () => (
  <div aria-hidden="true" className="hos-anim rounded-[20px] dk-card p-5 sm:p-6 w-full">
    <div className="rounded-2xl ring-1 ring-hos-yellow/40 bg-hos-yellow/[0.06] p-4" style={fadeUp(0)}>
      <div className="flex items-center justify-between gap-3 text-[11px]">
        <span className="font-semibold text-white">Your brand</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-hos-yellow">What patients see</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {['Your app', 'Your reports', 'Your phone line', 'Your programmes'].map((c) => (
          <span key={c} className="rounded-full bg-ink-950/60 ring-1 ring-white/15 px-2.5 py-1 text-[11px] text-white/80">
            {c}
          </span>
        ))}
      </div>
    </div>
    <div className="relative mx-auto h-12 w-3 overflow-hidden">
      <span className="absolute left-1/2 top-0 bottom-0 w-px bg-white/15" />
      {[0, 1].map((i) => (
        <span key={i} className="absolute left-1/2 -ml-[3px] top-0 w-1.5 h-1.5 rounded-full bg-hos-yellow" style={{ animation: `hos-flow-y 1.8s linear ${i * 0.9}s infinite` }} />
      ))}
    </div>
    <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.08] p-4" style={fadeUp(2)}>
      <div className="flex items-center justify-between gap-3 text-[11px]">
        <span className="font-semibold text-white">Operated by Nostavia</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-white/55">Behind the scenes</span>
      </div>
      <ul className="mt-3 space-y-2">
        {['Biomarker decoding', 'AI routing', 'Wearable handling'].map((row, i) => (
          <li key={row} className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.04] px-3 py-2 text-[11px]" style={fadeUp(i + 3)}>
            <span className="text-white/80">{row}</span>
            <Waveform bars={12} height={14} className="w-20" color="rgba(245,217,123,0.7)" />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const yours = ['Your name, logo and colours on every screen', 'Your listing on the App Store and Google Play, under your organisation', 'Your custom domain'];
const ours = [
  'Biomarker decoding, AI routing and wearable handling',
  'Wearables through Apple Health and Google Health Connect',
  'Store submission, approvals and ongoing updates',
  'Hosting, AI, updates and support, covered by the monthly plan',
];

const launchSteps = [
  { title: 'Pick a product', body: 'Choose the ready-made product that fits your business. You get a fixed quote after a free call.' },
  { title: 'Send your brand', body: 'We configure your branding assets, lab connections and custom domain.' },
  { title: 'We launch it', body: 'We handle store submission and approvals for apps, and launch everything under your name.' },
  { title: 'We keep it running', body: 'Hosting, AI, updates and support are covered by the monthly plan.' },
];

const otherWays = [
  { name: 'SDK', line: 'Add health AI to the app you already have, with no change to your UI.', to: '/solutions/gravity', icon: Code2 },
  { name: 'Custom Build', line: 'Designed and built from scratch for you, on top of Human OS.', to: '/solutions/engineering', icon: Hammer },
];

const facts: [string, string][] = [
  ['$1,500+', 'One-time setup'],
  ['$399+/mo', 'Monthly plan'],
  ['2 to 8 weeks', 'Time to launch'],
  ['Zero', 'Engineers needed on your side'],
];

export const StoryHealthPage: React.FC = () => {
  useSeo({
    title: 'White Label | Nostavia Health',
    description:
      "Launch Nostavia's ready-made health products under your own brand in 2 to 8 weeks: a branded iOS and Android app, Smart Reports and Re-Test Recall, an AI Front Desk Agent and hospital patient programmes. No engineering team required.",
    path: '/solutions/storyhealth',
  });

  return (
    <div className="flex flex-col text-white bg-ink-950 overflow-x-clip">
      {/* 1. Hero. TODO(copy): new headline and intro */}
      <PageHero
        eyebrow="White Label"
        title={
          <>
            Our products. <span className="dk-text-sun">Your brand.</span>
          </>
        }
        intro="Launch a ready-made health product under your name, in weeks. We run the biomarker decoding, AI routing and wearable handling behind it. No engineering team required."
        primary={{ to: '/demo', label: 'Book a demo' }}
        secondary={{ to: '/pricing', label: 'See pricing' }}
        photo={{ src: '/photos/home-whitelabel-phone.jpg', w: 1600, h: 1067, alt: 'A woman smiling at her phone in a cafe' }}
        visual={<BrandSwapCard />}
      />

      {/* 2. Key facts, exactly as previously published */}
      <section aria-label="White Label at a glance" className="bg-ink-950 pb-20 sm:pb-24">
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

      {/* 3. The four ready-made products */}
      <section aria-labelledby="wl-products-heading" className="bg-ink-950 pb-24 sm:pb-32">
        <Container className="space-y-14">
          <Reveal>
            {/* TODO(copy): section heading and intro */}
            <SectionHeading
              id="wl-products-heading"
              eyebrow="Ready-made products"
              title={`${numberWord(products.length)} products, ready to carry your name.`}
              intro="Each one is already built and running. Pick the one that fits your business and we launch it as yours."
            />
          </Reveal>

          <ul className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {products.map((p, i) => (
              <li key={p.name} className={p.span}>
                <Reveal delay={(i % 2) * 100} className="h-full">
                  <article className="group relative flex flex-col h-full rounded-[20px] dk-card p-5 sm:p-7 overflow-hidden hover:border-white/20 transition-colors">
                    <span aria-hidden="true" className="absolute -right-16 -top-16 w-48 h-48 bg-[radial-gradient(closest-side,rgba(245,217,123,0.10),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div aria-hidden="true" className="hos-anim relative flex items-center justify-center min-h-[200px] rounded-2xl bg-white/[0.02] ring-1 ring-white/[0.05] p-4 sm:p-5">
                      {p.visual}
                    </div>
                    <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">{p.name}</span>
                      <span className="rounded-full ring-1 ring-white/15 px-3 py-1 font-mono text-[11px] font-semibold text-white">{p.price}</span>
                    </div>
                    <h3 className="relative mt-3 text-2xl font-semibold text-white leading-snug">{p.headline}</h3>
                    <p className="relative mt-2 text-sm text-white/60 leading-relaxed">{p.body}</p>
                    <Link to={p.to} className={`relative mt-auto pt-5 self-start inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-hos-yellow rounded transition-colors ${focusRing}`}>
                      {p.cta}
                      <ArrowRight aria-hidden="true" className="w-4 h-4" />
                    </Link>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal>
            <Disclaimer />
          </Reveal>
        </Container>
      </section>

      {/* 4. What the partner owns, what Nostavia operates */}
      <section aria-labelledby="wl-engine-heading" className="bg-ink-900 border-y border-white/[0.06] py-24 sm:py-32">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:col-span-6 lg:order-2 space-y-8">
            {/* TODO(copy): section heading and intro */}
            <SectionHeading
              id="wl-engine-heading"
              eyebrow="How White Label works"
              title="Your name on the front. Our engine behind it."
              intro="Your patients see your brand. Everything that makes the product work is built, hosted and operated by Nostavia."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Yours', items: yours },
                { title: 'Ours, behind the scenes', items: ours },
              ].map((col) => (
                <div key={col.title} className="rounded-[16px] bg-white/[0.03] border border-white/[0.08] p-5">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-hos-yellow">{col.title}</h3>
                  <ul className="mt-4 space-y-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-white/70 leading-relaxed">
                        <span aria-hidden="true" className="mt-2 w-3 h-[2px] shrink-0 bg-hos-yellow" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-6 lg:order-1">
            <EngineVisual />
          </Reveal>
        </Container>
      </section>

      {/* 5. Launch steps */}
      <section aria-labelledby="wl-launch-heading" className="bg-ink-950 py-24 sm:py-32">
        <Container className="space-y-14">
          <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            {/* TODO(copy): section heading and intro */}
            <SectionHeading
              id="wl-launch-heading"
              eyebrow="Launch"
              title="Launch in 2 to 8 weeks."
              intro="You bring the brand. We do the configuration, the store submission and everything after launch."
            />
            <Link to="/demo" className={`shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-hos-yellow rounded ${focusRing}`}>
              Book a scoping call
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </Reveal>

          <div className="rounded-[20px] dk-card p-6 sm:p-8">
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {launchSteps.map((s, i) => (
                <li key={s.title}>
                  <Reveal delay={i * 90}>
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 shrink-0 rounded-full ring-1 ring-hos-yellow/50 text-hos-yellow text-xs font-mono font-semibold flex items-center justify-center">
                        <span className="sr-only">Step </span>
                        {i + 1}
                      </span>
                      {i < launchSteps.length - 1 && <span aria-hidden="true" className="hidden lg:block flex-1 h-px bg-gradient-to-r from-hos-yellow/40 to-transparent" />}
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

      {/* 6. Proof */}
      <section aria-labelledby="wl-proof-heading" className="bg-ink-900 border-y border-white/[0.06] py-24 sm:py-32">
        <Container className="space-y-14">
          <Reveal>
            {/* TODO(copy): section heading and intro */}
            <SectionHeading
              id="wl-proof-heading"
              eyebrow="In production"
              title="Already shipping."
              intro="Smart Reports run white-labelled at Live 360° Diagnostics, and our own app is on both stores."
            />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Reveal className="h-full">
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
                  The Smart Report layer sits on their existing lab reporting pipeline, normalises every marker against source-specific reference ranges and keeps results for longitudinal trends.
                </p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {['Any lab PDF format', 'Optimal bands, not just in range', 'The same panel becomes a trend'].map((f) => (
                    <li key={f} className="rounded-full bg-white/[0.05] ring-1 ring-white/10 px-2.5 py-1 text-xs text-white/75">
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/solutions/comet" className={`mt-auto pt-6 self-start inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-hos-yellow rounded ${focusRing}`}>
                  See Smart Reports
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </article>
            </Reveal>

            <Reveal delay={120} className="h-full">
              <article className="h-full rounded-[22px] dk-card p-6 sm:p-8 flex flex-col gap-5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">Mobile</span>
                <h3 className="text-2xl font-semibold text-white leading-snug">We already ship a health app on both stores.</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Nostavia's consumer reference app runs on iOS and Android, serving as proof-of-concept for partner integrations. Your branded app goes through the same submission and review.
                </p>
                <div className="mt-auto">
                  <ProductionGroup />
                </div>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 7. Other ways to launch */}
      <section aria-labelledby="wl-other-heading" className="bg-ink-950 py-24 sm:py-28">
        <Container className="space-y-12">
          <Reveal>
            {/* TODO(copy): section heading and intro */}
            <SectionHeading
              id="wl-other-heading"
              eyebrow="Other ways to launch"
              title="Need something different?"
              intro="Put health AI inside the app you already have, or have us build something new."
            />
          </Reveal>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherWays.map(({ name, line, to, icon: Icon }, i) => (
              <li key={name}>
                <Reveal delay={i * 100} className="h-full">
                  <Link to={to} className={`group flex items-start gap-5 h-full rounded-[20px] dk-card p-6 sm:p-7 hover:border-white/20 transition-colors ${focusRing}`}>
                    <span className="w-11 h-11 shrink-0 rounded-xl bg-white/[0.04] ring-1 ring-white/10 flex items-center justify-center text-hos-yellow">
                      <Icon aria-hidden="true" className="w-5 h-5" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-xl font-semibold text-white">{name}</span>
                      <span className="mt-1.5 block text-sm text-white/60 leading-relaxed">{line}</span>
                    </span>
                    <ArrowUpRight aria-hidden="true" className="w-5 h-5 shrink-0 text-white/55 group-hover:text-hos-yellow transition-colors" />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 8. FAQ */}
      <FaqList
        id="wl-faq-heading"
        title="White Label questions"
        items={[
          {
            q: 'Who handles app store approvals and updates?',
            a: 'Nostavia manages the developer submission, the App Store and Google Play approval process and ongoing maintenance updates.',
          },
          {
            q: 'Do we need an internal IT or engineering team?',
            a: 'No. Nostavia configures your branding assets, lab connections and custom domain, and operates the biomarker decoding, AI routing and wearable handling behind the product.',
          },
          {
            q: 'How long does launch take?',
            a: 'White Label products go live in 2 to 8 weeks.',
          },
          {
            q: 'What does it cost?',
            a: (
              <>
                A one-time setup from $1,500 plus a monthly plan from $399. The monthly plan covers hosting, AI, updates and support, with no per-user fees. You get a fixed quote after a free call.{' '}
                <Link to="/pricing" className={textLink}>
                  See pricing
                </Link>
              </>
            ),
          },
          {
            q: 'Which wearables does the app connect to?',
            a: 'Apple Health and Google Health Connect today, with more device feeds in development.',
          },
        ]}
      />

      {/* 9. Closing CTA. TODO(copy): closing headline and body */}
      <CtaBand
        title="Put your name on it."
        highlight="We run the rest."
        body="Thirty minutes on live product, not slides. We'll show you the product that fits your business and what launch looks like."
        primary={{ to: '/demo', label: 'Book a demo' }}
      />
    </div>
  );
};
