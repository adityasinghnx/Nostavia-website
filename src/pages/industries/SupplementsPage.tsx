import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Code2,
  FileCheck2,
  FlaskConical,
  Hammer,
  HeartPulse,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Stethoscope,
  Unplug,
  Utensils,
} from 'lucide-react';
import { CtaBand, FaqList, ModuleCards, PageHero, Section, SectionHead, StepList, textLink } from '../../components/page/PageKit';
import { focusRing } from '../../components/home/shared';
import { CountUp, Reveal } from '../../components/home/motion';
import { FoodScanCard } from '../../components/home/LiveCards';
import { SystemsToStartWith } from '../../components/human-os/BuyerMapping';
import { Disclaimer } from '../../components/human-os/Disclaimer';
import { ProductionGroup } from '../../components/trust/TrustElements';
import { DISCLAIMER, findModule, numberWord, steps, systemPath, totalLive } from '../../content/human-os';
import { useSeo } from '../../lib/useSeo';

/* ─────────────────────────────────────────────────────────────────────────────
 * /industries/supplements (nav label "Wellness & Apps"): wellness platforms and
 * health apps, plus a full section for supplement and nutrition brands.
 * Facts come from the previous version of this page (biology-led recommendations,
 * guardrails), the SDK and Platform pages (wearables, SDK FAQ), trust.config and
 * human-os.ts. Values in the visuals are samples, not real users.
 * ──────────────────────────────────────────────────────────────────────────── */

const firstSentence = (s: string) => {
  const i = s.indexOf('. ');
  return i === -1 ? s : s.slice(0, i + 1);
};

const fade = (i: number): React.CSSProperties => ({ animation: `hos-fade-up 0.5s ease ${0.1 + i * 0.12}s both` });

/* ── Bento visuals (sample values) ── */

const TelemetryVisual: React.FC = () => (
  <div className="w-full grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-3">
    <ul className="space-y-2">
      {['Apple Health', 'Google Health Connect'].map((src, i) => (
        <li key={src} className="flex items-center gap-2 rounded-lg bg-white/[0.04] ring-1 ring-white/[0.06] px-3 py-2 text-[11px] text-white/80" style={fade(i)}>
          <HeartPulse className="w-3.5 h-3.5 shrink-0 text-hos-yellow" />
          {src}
        </li>
      ))}
    </ul>
    <div className="relative hidden sm:block w-16 h-6 overflow-hidden">
      <span className="absolute top-1/2 left-0 right-0 h-px bg-white/15" />
      {[0, 1, 2].map((d) => (
        <span key={d} className="absolute top-1/2 -mt-[3px] left-0 w-1.5 h-1.5 rounded-full bg-hos-yellow" style={{ animation: `hos-flow 1.8s linear ${d * 0.6}s infinite` }} />
      ))}
    </div>
    <div className="rounded-xl bg-ink-850 ring-1 ring-white/10 p-3" style={fade(2)}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-hos-yellow">One schema</div>
      <dl className="mt-2 space-y-1.5 text-[11px]">
        {[
          ['Sleep', '7h 12m'],
          ['Recovery', '72 / 100'],
          ['Resting HR', '58 bpm'],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-3">
            <dt className="text-white/55">{k}</dt>
            <dd className="font-semibold text-white">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
);

const MealVisual: React.FC = () => (
  <div className="w-full">
    <ul className="flex flex-wrap gap-1.5">
      {['Dal', 'Rice', 'Salad'].map((item, i) => (
        <li key={item} className="inline-flex items-center gap-1 rounded-full bg-white/[0.05] ring-1 ring-white/10 px-2 py-0.5 text-[10px] text-white/75" style={fade(i)}>
          <CheckCircle2 className="w-3 h-3 text-emerald-300" />
          {item}
        </li>
      ))}
    </ul>
    <svg viewBox="0 0 240 80" className="mt-3 w-full h-20" aria-hidden="true">
      <line x1="0" y1="72" x2="240" y2="72" stroke="rgba(255,255,255,0.1)" />
      <path d="M0 68 C 45 68, 65 14, 100 14 S 160 60, 240 64" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="400" style={{ animation: 'hos-draw 1.6s ease both' }} />
      <path d="M0 68 C 45 68, 70 26, 104 26 S 162 62, 240 66" fill="none" stroke="#F5D97B" strokeWidth="2" strokeDasharray="4 4" />
    </svg>
    <div className="flex flex-wrap items-center gap-3 text-[10px] text-white/55">
      <span className="flex items-center gap-1">
        <span className="w-3 h-0.5 bg-white/90" />
        Predicted glucose
      </span>
      <span className="flex items-center gap-1">
        <span className="w-3 h-0.5 bg-hos-yellow" />
        Checked after the meal
      </span>
    </div>
  </div>
);

const CompanionVisual: React.FC = () => (
  <div className="w-full space-y-2">
    <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-hos-yellow text-ink-950 text-[11px] px-3 py-2" style={fade(0)}>
      Why was my recovery low today?
    </div>
    <div className="w-fit max-w-[92%] rounded-2xl rounded-bl-sm bg-white/[0.07] ring-1 ring-white/10 text-[11px] px-3 py-2 text-white/85" style={fade(2)}>
      Your bedtime moved later every night this week, and recovery dipped with it. Aim for lights out by 11 tonight.
    </div>
  </div>
);

const SleepVisual: React.FC = () => (
  <div className="w-full">
    <div className="flex items-end gap-[3px] h-16">
      {[30, 55, 80, 55, 30, 60, 85, 60, 35, 55, 75, 45, 25, 50, 65, 40].map((h, i) => (
        <span
          key={i}
          className={`flex-1 rounded-t origin-bottom ${h >= 75 ? 'bg-hos-yellow' : h >= 50 ? 'bg-white/30' : 'bg-white/[0.12]'}`}
          style={{ height: `${h}%`, animation: `hos-rise 0.8s cubic-bezier(0.2,0.7,0.2,1) ${i * 0.04}s both` }}
        />
      ))}
    </div>
    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px]" style={fade(3)}>
      <span className="text-white/55">
        Sleep debt <span className="font-semibold text-white">3h 20m</span>
      </span>
      <span className="flex items-center gap-1 text-[10px] text-white/55">
        <span className="w-2 h-2 rounded-sm bg-hos-yellow" />
        Deep
      </span>
    </div>
  </div>
);

const ReadinessVisual: React.FC = () => (
  <div className="w-full flex items-center gap-5">
    <svg viewBox="0 0 80 80" className="w-20 h-20 shrink-0 -rotate-90" aria-hidden="true">
      <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
      <circle
        cx="40"
        cy="40"
        r="32"
        fill="none"
        stroke="#F5D97B"
        strokeWidth="7"
        strokeLinecap="round"
        pathLength={400}
        strokeDasharray="312 400"
        style={{ animation: 'hos-draw 1.4s ease both' }}
      />
    </svg>
    <dl className="space-y-1.5 text-[11px]" style={fade(1)}>
      {[
        ['Readiness', '78'],
        ['VO2 max', '46'],
        ['Recovery', 'Good'],
      ].map(([k, v]) => (
        <div key={k} className="flex items-center gap-3">
          <dt className="text-white/55 w-16">{k}</dt>
          <dd className="font-semibold text-white">{v}</dd>
        </div>
      ))}
    </dl>
  </div>
);

/* TODO(copy): bento headlines. The line under each comes from the module description in human-os.ts. */
const tiles: { module: string; headline: string; visual: React.ReactNode; span: string }[] = [
  { module: 'Wearable Telemetry', headline: 'Every wearable feed, one schema.', visual: <TelemetryVisual />, span: 'lg:col-span-2' },
  { module: 'Food Intelligence', headline: 'Snap the meal. See the curve.', visual: <MealVisual />, span: '' },
  { module: 'AI Health Companion', headline: 'A guide that remembers.', visual: <CompanionVisual />, span: '' },
  { module: 'Sleep & Recovery Engine', headline: 'Sleep debt, made visible.', visual: <SleepVisual />, span: '' },
  { module: 'Performance Intelligence', headline: 'Train today, or rest?', visual: <ReadinessVisual />, span: '' },
];

/* ── Supplement recommendation card (sample values) ── */

const RecommendationVisual: React.FC = () => (
  <div className="hos-anim w-full max-w-[460px] mx-auto rounded-2xl bg-ink-850 ring-1 ring-white/10 p-5 sm:p-6 text-white shadow-[0_40px_90px_-45px_rgba(0,0,0,0.85)]">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className="w-8 h-8 shrink-0 rounded-lg bg-white/[0.06] ring-1 ring-white/10 text-hos-yellow flex items-center justify-center">
          <Sparkles className="w-4 h-4" />
        </span>
        <div>
          <div className="text-sm font-semibold">Your recommendation</div>
          <div className="text-[11px] text-white/55">From bloodwork, wearables and diet</div>
        </div>
      </div>
      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-white/55">Sample</span>
    </div>

    <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-hos-yellow">Below optimal on this report</div>
    <ul className="mt-3 space-y-2">
      {(
        [
          ['Vitamin D', '24 ng/mL', 'Vitamin D3'],
          ['Omega-3 index', '4.1 %', 'Omega-3'],
        ] as [string, string, string][]
      ).map(([marker, value, product], i) => (
        <li key={marker} className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-lg bg-white/[0.04] ring-1 ring-white/[0.06] px-3 py-2.5 text-[11px]" style={fade(i)}>
          <span>
            <span className="font-semibold">{marker}</span> <span className="text-white/55">{value}</span>
          </span>
          <ArrowRight className="hidden sm:block w-3.5 h-3.5 text-white/55" />
          <span className="sm:text-right font-semibold text-hos-yellow">{product}</span>
        </li>
      ))}
    </ul>

    <ul className="mt-5 pt-4 border-t border-white/10 space-y-2 text-[11px] text-white/70">
      {['Mapping signed off by the clinical bench', 'Nutritional language only', 'Separate consent for commercial use, logged'].map((t, i) => (
        <li key={t} className="flex items-center gap-2" style={fade(i + 2)}>
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-300" />
          {t}
        </li>
      ))}
    </ul>
  </div>
);

/* ── Static content ── */

/* TODO(copy): problem cards */
const problems: { icon: React.FC<{ className?: string }>; label: string; title: string; body: string }[] = [
  {
    icon: BarChart3,
    label: 'For users',
    title: 'Charts, not answers.',
    body: 'Users see steps, sleep and heart rate. They still ask what it means and what to do next.',
  },
  {
    icon: Unplug,
    label: 'For product',
    title: 'Every device, its own format.',
    body: 'Wearable data arrives in different shapes from iOS and Android before you can build anything on top of it.',
  },
  {
    icon: Hammer,
    label: 'For engineering',
    title: 'Health AI is slow to build.',
    body: 'Decoding, nutrition and coaching need models, data pipelines and clinical review before the first feature ships.',
  },
];

const stats: { value: number; suffix?: string; label: string }[] = [
  { value: 2, label: 'Wearable platforms today: Apple Health and Google Health Connect.' },
  { value: 100, suffix: '+', label: 'Biomarkers decoded from any lab PDF, each graded optimal, in range or outlier.' },
  { value: totalLive, label: 'Modules ready to switch on from the Partner Portal, with no app update.' },
];

const addLater = ['Smart Reports', 'Personalisation Engine', 'Mental & Behavioral Health', "Women's Health Engine", 'Biological Age', 'Correlation Engine'];

/* What a supplement brand recommends from. Module lines restate human-os.ts. */
const signals: { icon: React.FC<{ className?: string }>; label: string; module: string; line: string }[] = [
  { icon: FlaskConical, label: 'Bloodwork', module: 'Smart Reports', line: 'Any lab PDF, 100+ biomarkers, each graded optimal, in range or outlier.' },
  { icon: Activity, label: 'Wearable trend', module: 'Wearable Telemetry', line: 'Sleep, recovery and biometric summaries from Apple Health and Google Health Connect.' },
  { icon: Utensils, label: 'Diet', module: 'Food Intelligence', line: 'Meal photos broken into items, with the predicted glucose response.' },
];

/* Guardrails from the previous version of this page. */
const guardrails: { icon: React.FC<{ className?: string }>; title: string; body: string }[] = [
  { icon: Stethoscope, title: 'Clinical sign-off', body: 'Every biomarker-to-product mapping is reviewed and signed off by our clinical advisory bench before customers see it.' },
  { icon: MessageCircle, title: 'Nutritional language only', body: 'No disease claims and no treatment claims, in any recommendation.' },
  { icon: FileCheck2, title: 'Explicit consent', body: 'Health data used for commercial recommendations needs separate, explicit consent, logged separately.' },
];

/* TODO(copy): delivery lines (adapted from the SDK, White Label, Pricing and Custom Build pages) */
const delivery: { name: string; icon: React.FC<{ className?: string }>; fit: string; line: string; to: string }[] = [
  {
    name: 'SDK',
    icon: Code2,
    fit: 'If you already have an app',
    line: 'Bring in Apple Health and Google Health Connect data, food scanning and an AI health companion without rebuilding your product.',
    to: '/solutions/gravity',
  },
  {
    name: 'White Label',
    icon: Smartphone,
    fit: 'If you want an app without building one',
    line: 'Your own iOS and Android app with an AI health companion, launched under your name, with no engineering team required.',
    to: '/solutions/storyhealth',
  },
  {
    name: 'Custom Build',
    icon: Hammer,
    fit: 'If you need something new',
    line: 'Designed and built from scratch for you, on top of Human OS.',
    to: '/solutions/engineering',
  },
];

const inlineLink = `font-semibold text-white underline underline-offset-4 decoration-hos-yellow hover:decoration-white ${focusRing}`;

/* Answers restate facts already published on the site. */
const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Which wearables are supported?',
    a: 'Apple Health and Google Health Connect today, normalised into one schema. More device feeds are in development.',
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
    q: 'How does food scanning work?',
    a: 'Food Intelligence breaks a meal photo into items, predicts the glucose curve and bio-impact, then checks its own prediction against post-meal heart-rate data.',
  },
  {
    q: 'Can a supplement brand use health data for recommendations?',
    a: 'Only with separate, explicit consent, logged separately. Every biomarker-to-product mapping is signed off by our clinical advisory bench, and recommendations use nutritional language only, with no disease or treatment claims.',
  },
  {
    q: 'Can we try it before we commit?',
    a: 'Yes. Every module can be tried in a sandbox with fictional data first, then switched on from the Partner Portal.',
  },
  {
    q: 'Do API keys ship inside our app?',
    a: 'No. All AI requests run through a secure server-side proxy. No API keys ship inside any app.',
  },
  {
    q: 'How is it priced?',
    a: (
      <>
        A one-time build fee plus a monthly plan.{' '}
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

export const SupplementsPage: React.FC = () => {
  useSeo({
    title: 'Wellness Platforms and Health Apps | Nostavia Health',
    description:
      'Wearable data, food scanning, sleep and recovery, performance and an AI health companion for wellness platforms and health apps, plus biology-led recommendations for supplement and nutrition brands. All under your brand.',
    path: '/industries/supplements',
  });

  return (
    <div className="flex flex-col text-white overflow-x-clip bg-ink-950">
      {/* 1. Hero */}
      {/* TODO(copy): hero headline and intro */}
      <PageHero
        eyebrow="For wellness platforms and health apps"
        title={
          <>
            Give users answers, <span className="dk-text-sun">not just charts.</span>
          </>
        }
        intro="Nostavia turns wearable data, meal photos and lab reports into guidance people act on: sleep, recovery, food and a health companion that remembers them. Under your brand, inside your app."
        points={['Apple Health and Google Health Connect, in one schema', 'A predicted glucose curve from a meal photo', 'A companion that answers questions about their own data']}
        primary={{ to: '/demo', label: 'Request a demo' }}
        secondary={{ to: '/solutions/gravity', label: 'Explore the SDK' }}
        photo={{ src: '/wellness-bg.jpg', w: 1350, h: 1800, alt: 'A person using a health app on their phone' }}
        visual={<FoodScanCard />}
      />

      {/* 2. The problem */}
      <Section labelledBy="wellness-problem-heading">
        {/* TODO(copy): problem heading and intro */}
        <SectionHead
          id="wellness-problem-heading"
          eyebrow="The problem"
          title="Data is everywhere. Answers are not."
          intro="Your users already wear the devices and log the meals. What they want is someone to tell them what it means."
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
      <Section labelledBy="wellness-bento-heading" bg="mist">
        {/* TODO(copy): section heading and intro */}
        <SectionHead
          id="wellness-bento-heading"
          eyebrow="What you get"
          title="The health features users open every day."
          intro="Switch on the products that fit your app. Each one runs on the same health data, and every one ships under your name."
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
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-hos-yellow">Add as you grow</h3>
          <ModuleCards modules={addLater} />
        </Reveal>
        <p className="text-xs text-white/55">Screens show sample data, not real users.</p>
      </Section>

      {/* 4. Supplement and nutrition brands */}
      <Section labelledBy="supplements-heading">
        <SectionHead
          id="supplements-heading"
          eyebrow="For supplement and nutrition brands"
          title="Recommend from biology, not from browsing history."
          intro="Supplement commerce runs on quiz funnels and lookalike audiences. Nostavia lets you recommend from a customer's actual bloodwork, wearable trend and diet."
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <Reveal className="lg:col-span-5 space-y-6">
            <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {signals.map(({ icon: Icon, label, module, line }) => {
                const mod = findModule(module);
                return (
                  <li key={label} className="flex items-start gap-4 py-5">
                    <span className="w-10 h-10 shrink-0 rounded-[10px] bg-white/[0.04] border border-white/[0.08] text-hos-yellow flex items-center justify-center">
                      <Icon aria-hidden="true" className="w-5 h-5" />
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-base font-semibold text-white">{label}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">{line}</p>
                      {mod && (
                        <Link to={systemPath(mod.system.slug)} className={`inline-flex items-center gap-1 text-xs font-semibold text-white/70 hover:text-hos-yellow rounded ${focusRing}`}>
                          {module}
                          <ArrowUpRight aria-hidden="true" className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
            {/* TODO(copy): stacks line (fact from the previous version of this page) */}
            <p className="text-base text-white/70 leading-relaxed">
              <strong className="font-semibold text-white">Personalised stacks.</strong> Raw bloodwork becomes supplement recommendations matched to the specific markers sitting below their optimal range.
            </p>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-7">
            <div aria-hidden="true" className="relative overflow-hidden rounded-[20px] bg-white/[0.03] border border-white/[0.08] p-5 sm:p-10 flex items-center justify-center min-h-[320px]">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[480px] max-w-[200%] bg-[radial-gradient(closest-side,rgba(245,217,123,0.14),transparent)]" />
              <div className="relative w-full">
                <RecommendationVisual />
              </div>
            </div>
          </Reveal>
        </div>
        <div className="space-y-5">
          <Reveal>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-hos-yellow">Guardrails, built in</h3>
          </Reveal>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {guardrails.map(({ icon: Icon, title, body }, i) => (
              <li key={title}>
                <Reveal delay={i * 90} className="h-full">
                  <div className="h-full rounded-[20px] dk-card p-6 flex flex-col gap-3">
                    <Icon aria-hidden="true" className="w-5 h-5 text-hos-yellow" />
                    <h4 className="text-lg font-semibold text-white">{title}</h4>
                    <p className="text-sm text-white/60 leading-relaxed">{body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 5. Systems to start with */}
      <div className="bg-ink-900 border-y border-white/[0.06] py-20 sm:py-28">
        <SystemsToStartWith buyerId="wellness" />
      </div>

      {/* 6. How it works */}
      <Section labelledBy="wellness-steps-heading">
        {/* TODO(copy): steps heading and intro */}
        <SectionHead
          id="wellness-steps-heading"
          eyebrow="How it works"
          title={`Up and running in ${numberWord(steps.length).toLowerCase()} steps.`}
          intro="Integrate once, start with the features your users ask for most, and add modules as your product grows."
        />
        <StepList steps={steps} />
      </Section>

      {/* 7. Delivery options */}
      <Section labelledBy="wellness-delivery-heading" bg="navy">
        {/* TODO(copy): delivery heading and intro */}
        <SectionHead
          id="wellness-delivery-heading"
          eyebrow="Ship it your way"
          title="Three ways to launch. One platform underneath."
          intro="Plug the SDK into your app, launch our white-label app under your name, or have us build something new."
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
      <Section labelledBy="wellness-trust-heading">
        {/* TODO(copy): trust heading and card copy */}
        <SectionHead id="wellness-trust-heading" eyebrow="Trust" title="Store-reviewed. Clinically governed." />
        <Reveal>
          <div className="rounded-[20px] dk-card p-6 sm:p-8 space-y-5">
            <h3 className="text-2xl font-semibold text-white">On the App Store and Google Play.</h3>
            <ProductionGroup />
          </div>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Reveal className="h-full">
            <div className="h-full rounded-[20px] dk-card p-6 sm:p-8 flex flex-col gap-5">
              <span className="w-11 h-11 rounded-[12px] bg-hos-yellow/10 ring-1 ring-hos-yellow/30 text-hos-yellow flex items-center justify-center">
                <Stethoscope aria-hidden="true" className="w-5 h-5" />
              </span>
              <h3 className="text-2xl font-semibold text-white">Reviewed by clinicians.</h3>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                Protocol outputs are reviewed by our licensed clinical advisory bench before release to any partner.
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
              <h3 className="text-2xl font-semibold text-white">Built for health data.</h3>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                Nostavia runs on infrastructure certified to SOC 2 Type II and ISO/IEC 27001, with partner data isolated, encrypted and handled in line with India's DPDP Act. No API keys ship inside any app.
              </p>
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
      <FaqList id="wellness-faq-heading" title="What product teams ask us." items={faqs} />

      {/* 10. Closing CTA */}
      {/* TODO(copy): closing headline and body */}
      <CtaBand
        title="Make your app the one"
        highlight="they open every day."
        body="Thirty minutes on live product, not slides. Tell us what you want to launch, and we'll show you the fastest way to ship it."
        primary={{ to: '/demo', label: 'Request a demo' }}
        secondary={{ to: '/pricing', label: 'See pricing' }}
      />
    </div>
  );
};
