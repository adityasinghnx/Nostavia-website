import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BuyerId, buyers, findModule, systemPath } from '../../content/human-os';
import { Container, SectionHeading, focusRing } from './shared';
import { Reveal } from './motion';
import { CohortRiskCard, FoodScanCard, IntakeBriefCard, SmartReportCard, VoiceCallCard } from './LiveCards';

const liveCard: Record<BuyerId, React.FC> = {
  labs: SmartReportCard,
  clinics: IntakeBriefCard,
  wellness: FoodScanCard,
  hospitals: () => <VoiceCallCard />,
  insurers: CohortRiskCard,
};

/* Customer-facing copy. Labs, hospitals and SDK lines come from the existing industry and product pages. */
const panels: Record<
  BuyerId,
  { tab: string; headline: string; body: string; modules: string[]; image: string; w: number; h: number; imageAlt: string; cta: { to: string; label: string } }
> = {
  labs: {
    tab: 'Diagnostic labs',
    headline: 'Turn routine lab panels into continuous, revenue-generating patient relationships.',
    body: 'White-labelled biomarker interpretation and automated re-test recall, embedded in your lab workflow under your brand.',
    modules: ['Smart Reports', 'Re-Test Recall Engine', 'Correlation Engine'],
    image: '/labs-bg.jpg',
    w: 1800,
    h: 1200,
    imageAlt: 'A laboratory technician holding a blood sample tube',
    cta: { to: '/industries/diagnostic-labs', label: 'Nostavia for diagnostic labs' },
  },
  clinics: {
    tab: 'Clinics and longevity',
    headline: 'Walk into every consultation already knowing the patient.',
    body: 'Reports and history become a one-page brief with outliers flagged, and every patient leaves with a plan that adapts as they progress.',
    modules: ['Clinical Intake Briefs', 'Biological Age', 'Disease Risk Engine', 'Adaptive Protocols'],
    image: '/photos/home-safety-consult.jpg',
    w: 1600,
    h: 1126,
    imageAlt: 'A doctor going through results on a tablet with an older couple',
    cta: { to: '/industries/clinics', label: 'Nostavia for clinics and longevity centres' },
  },
  wellness: {
    tab: 'Wellness platforms',
    headline: 'Embed whole-body health intelligence directly into your existing app.',
    body: 'Lab decoding, wearable data, food scanning and an AI health companion, with no change to your UI or user experience.',
    modules: ['Wearable Telemetry', 'Food Intelligence', 'AI Health Companion', 'Sleep & Recovery Engine'],
    image: '/wellness-bg.jpg',
    w: 1350,
    h: 1800,
    imageAlt: 'A person using a health app on their phone',
    cta: { to: '/solutions/gravity', label: 'See the SDK for wellness platforms' },
  },
  hospitals: {
    tab: 'Hospitals',
    headline: 'Your HIS runs the hospital. Nostavia runs the relationship.',
    body: 'We white-label patient programmes onto your existing checkup, discharge and chronic volume, and put an AI agent on every inbound call, under your brand.',
    modules: ['AI Voice Agent', 'Clinical Intake Briefs', 'Medication Intelligence', 'B2B Analytics Dashboard'],
    image: '/payers-bg.jpg',
    w: 1800,
    h: 1200,
    imageAlt: 'A green medical cross sign outside a hospital building',
    cta: { to: '/industries/hospitals', label: 'Nostavia for hospitals and health systems' },
  },
  insurers: {
    tab: 'Insurers',
    headline: 'See risk building in your members before it becomes a claim.',
    body: 'Metabolic and cardiovascular risk scores with the factors behind each one, and cohort reporting across your whole population.',
    modules: ['Disease Risk Engine', 'B2B Analytics Dashboard'],
    image: '/photos/home-problem-glucose.jpg',
    w: 1600,
    h: 1067,
    imageAlt: 'A person checking their blood glucose with a finger-prick meter',
    cta: { to: '/demo', label: 'Talk to us about insurers and corporate wellness' },
  },
};

export const WhereWeWorkSection: React.FC = () => {
  const [activeId, setActiveId] = useState<BuyerId>(buyers[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = buyers.findIndex((b) => b.id === activeId);
  const panel = panels[activeId];
  const LiveCard = liveCard[activeId];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
    let next: number | null = null;
    if (e.key in keys) next = (activeIndex + keys[e.key] + buyers.length) % buyers.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = buyers.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActiveId(buyers[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="home-where-heading" className="bg-ink-900 border-y border-white/[0.06] py-20 sm:py-28">
      <Container className="space-y-10">
        {/* TODO(copy): section heading */}
        <Reveal>
          <SectionHeading id="home-where-heading" eyebrow="Where Nostavia works" title="Health AI for every business that holds health data." />
        </Reveal>

        <Reveal delay={120}>
        <div className="rounded-[16px] bg-white/[0.03] border border-white/[0.08] overflow-hidden shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]">
          <div className="border-b border-white/[0.08] overflow-x-auto scrollbar-none">
            <div role="tablist" aria-label="Health businesses" className="flex min-w-max px-2 sm:px-4" onKeyDown={onKeyDown}>
              {buyers.map((b, i) => {
                const selected = b.id === activeId;
                return (
                  <button
                    key={b.id}
                    ref={(el) => (tabRefs.current[i] = el)}
                    role="tab"
                    id={`where-tab-${b.id}`}
                    aria-selected={selected}
                    aria-controls={`where-panel-${b.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveId(b.id)}
                    className={`relative px-4 sm:px-5 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${focusRing} ${
                      selected ? 'text-white' : 'text-white/55 hover:text-white'
                    }`}
                  >
                    {panels[b.id].tab}
                    <span aria-hidden="true" className={`absolute left-3 right-3 bottom-0 h-[3px] rounded-t ${selected ? 'bg-hos-yellow' : 'bg-transparent'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div role="tabpanel" id={`where-panel-${activeId}`} aria-labelledby={`where-tab-${activeId}`} className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-6 sm:p-10 lg:p-12 flex flex-col gap-6">
              <h3 className="font-display font-semibold text-2xl sm:text-3xl text-white leading-snug tracking-tight">{panel.headline}</h3>
              <p className="text-base text-white/60 leading-relaxed">{panel.body}</p>

              <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {panel.modules.map((name) => {
                  const mod = findModule(name)!;
                  return (
                    <li key={name}>
                      <Link
                        to={systemPath(mod.system.slug)}
                        className={`group flex items-center justify-between gap-3 py-3 text-sm ${focusRing}`}
                      >
                        <span className="font-semibold text-white group-hover:underline underline-offset-4">{name}</span>
                        <ArrowRight aria-hidden="true" className="w-4 h-4 text-white/55 group-hover:text-white transition-colors" />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <Link
                to={panel.cta.to}
                className={`mt-auto inline-flex items-center gap-2 text-sm font-bold text-white underline underline-offset-4 decoration-hos-yellow decoration-2 hover:decoration-white ${focusRing}`}
              >
                {panel.cta.label}
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative min-h-[420px] lg:min-h-[540px] bg-ink-800 overflow-hidden">
              <img
                key={panel.image}
                src={panel.image}
                alt={panel.imageAlt}
                width={panel.w}
                height={panel.h}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ animation: 'hos-fade-up 0.7s ease both' }}
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-transparent to-transparent" />
              {/* Sample live product screen for this business */}
              <div className="absolute left-4 right-4 bottom-4 sm:left-6 sm:right-auto sm:bottom-6" aria-hidden="true">
                <LiveCard key={activeId} />
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </Container>
    </section>
  );
};
