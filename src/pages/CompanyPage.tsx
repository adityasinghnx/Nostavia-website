import React from 'react';
import { FileText, Hammer, MapPin, Mic, Package, RefreshCw, Smartphone, Code2 } from 'lucide-react';
import {
  CtaBand,
  Feature,
  FeatureGrid,
  PageHero,
  Panel,
  Section,
  SectionHead,
  SplitSection,
  StatRow,
} from '../components/page/PageKit';
import { Container, SectionHeading } from '../components/home/shared';
import { Reveal } from '../components/home/motion';
import { SmartReportCard } from '../components/home/LiveCards';
import { Disclaimer } from '../components/human-os/Disclaimer';
import { ProductionGroup, ProgramsGroup } from '../components/trust/TrustElements';
import {
  buyers,
  getSystem,
  hospitalProgrammes,
  numberWord,
  totalLive,
  totalSystems,
} from '../content/human-os';
import { TRUST_CONTACT } from '../content/trust.config';
import { useSeo } from '../lib/useSeo';

/* ─────────────────────────────────────────────────────────────────────────────
 * Company page (/company, footer "About & Founders"). Founders, advisory bench
 * and the Kiosk deployment restate the previous version of this page; figures
 * come from that page or human-os.ts. No funding, investor or revenue details.
 * ──────────────────────────────────────────────────────────────────────────── */

const initials = (name: string) =>
  name
    .replace(/^Dr\.\s*/, '')
    .replace(/,.*$/, '')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);

/* ── What we do: the three ways to launch (lines reuse the homepage products copy) ── */
const launchOptions: Feature[] = [
  { icon: Code2, title: 'SDK', body: 'Add health AI to the app you already have. Lab decoding, food scanning, protocols and the AI concierge embed directly into your code, with no change to your UI.', to: '/solutions/gravity' },
  { icon: Smartphone, title: 'White Label', body: 'Our ready-made products, launched as yours. A complete, fully branded application carrying your name, for labs and clinics with no application of their own.', to: '/solutions/storyhealth' },
  { icon: Hammer, title: 'Custom Build', body: "Designed and built from scratch for you. Tell us what you want built and we'll scope it with you.", to: '/solutions/engineering' },
];

/* ── Founders (previous page). SOMA mentions limited to "in development". ── */
const founders = [
  {
    name: 'Aditya Singh',
    role: 'Co-founder & Chief Executive Officer',
    bio: 'Leads product architecture, go-to-market strategy, and the clinical-data pipeline. Co-built the live production AI stack.',
  },
  {
    name: 'Anushka Gupta',
    role: 'Co-founder & Chief Technology Officer',
    bio: 'Leads AI model architecture, on-device training, and MLOps. Architected the clinical intelligence stack and the framework for SOMA, our on-device model now in development.',
  },
];

/* ── Advisory bench: names and credentials exactly as on the previous page. Keep in sync with ClinicalBenchSection. ── */
const bench = [
  { name: 'Dr. Sparsh Sehdev', credential: 'MBBS, GMC Registered (UK)', detail: '11,000+ patients treated across clinical longevity & general medicine.' },
  { name: 'Aakanksha Pant, PhD', credential: 'Chief Longevity Officer', detail: 'Senior Scientist, IISc Bangalore; aging & development biology specialist.' },
  { name: 'Sharwani Walke', credential: 'Chief Nutrition Officer', detail: 'MSc Clinical Nutrition, University College London (UCL).' },
  { name: 'Dr. Akshita Gupta', credential: 'MBBS Specialist', detail: 'Chronic conditions, pediatrics, dermatology, and general medicine.' },
  { name: 'Anmol Udhad', credential: 'Sports Nutritionist (ISSA), MBA', detail: 'Formerly Bain & Company; sports performance & metabolic protocol design.' },
  { name: 'Dr. Dipa Patle', credential: 'Ayurvedic Doctor (BAMS)', detail: 'Head of Ayurvedic Department; traditional biomarker correlation.' },
];

/* ── Kiosk deployment (previous page) ── */
const KIOSK_LOGO = '/client_logos/kiosk_health_clean.png';

const kioskFeatures: Feature[] = [
  {
    icon: Mic,
    title: 'The Copilot',
    body: 'Hindi voice in, Hindi voice out. Symptoms and vitals go in, a structured encounter with danger sign flags, referral decision and a counselling script comes out. Voice rendered in Awadhi and Bhojpuri inflected Hindi.',
  },
  {
    icon: FileText,
    title: 'Decoded Diagnostics',
    body: 'Point of care test taken at the kiosk. The result is decoded into plain Hindi, spoken aloud and printed on a take-home card, so a patient who cannot read her own report still understands it.',
  },
  {
    icon: RefreshCw,
    title: 'Chronic Registry & Recall',
    body: 'Screen, register, monitor, refill, recall. Roughly a third of survey respondents show a chronic disease signal with no existing system.',
  },
  {
    icon: Package,
    title: 'Medicine Intelligence',
    body: 'Demand prediction so the kiosk does not stock out, generic substitution by default, price transparency and an in-stock indicator at the moment of prescribing.',
  },
];

/** The four Kiosk districts. Approximate positions, not to scale. */
const DistrictMap: React.FC = () => (
  <svg aria-hidden="true" viewBox="0 0 170 120" className="hos-anim w-full h-48">
    <path d="M10 70 C 30 30, 80 5, 150 14 C 165 40, 160 90, 120 112 C 70 118, 20 104, 10 70 Z" fill="#FFFFFF" fillOpacity="0.04" stroke="#FFFFFF" strokeOpacity="0.15" />
    {(
      [
        ['Pratapgarh', 118, 26],
        ['Kaushambi', 56, 54],
        ['Prayagraj', 108, 66],
        ['Chitrakoot', 40, 96],
      ] as [string, number, number][]
    ).map(([name, x, y], i) => (
      <g key={name}>
        <line x1={108} y1={66} x2={x} y2={y} stroke="#F5D97B" strokeOpacity="0.35" strokeDasharray="2 3" />
        <circle cx={x} cy={y} r="9" fill="#F5D97B" fillOpacity="0.25" style={{ transformOrigin: `${x}px ${y}px`, animation: `hos-ping 2.4s cubic-bezier(0,0,0.2,1) ${i * 0.4}s infinite` }} />
        <circle cx={x} cy={y} r="3.5" fill="#F5D97B" />
        <text x={x + 7} y={y - 6} fontSize="8" fill="#CBD5E1">
          {name}
        </text>
      </g>
    ))}
  </svg>
);

export const CompanyPage: React.FC = () => {
  useSeo({
    title: 'About & Founders | Nostavia Health',
    description:
      'Nostavia Technologies builds the health-intelligence layer that labs, clinics, hospitals, wellness platforms and insurers license under their own brand. Headquartered in Lucknow, India, serving India and the UAE.',
    path: '/company',
  });

  return (
    <div className="flex flex-col font-body text-hos-black bg-white overflow-x-clip">
      <PageHero
        eyebrow="About Nostavia Technologies"
        title="Building the intelligence layer the health economy is missing."
        intro="We build whole-body health-intelligence infrastructure that diagnostic chains, clinics, wellness platforms and insurers embed inside their own products under their own brand."
        points={['Headquartered in Lucknow, India', 'Serving India and the UAE', "Licensed under our partners' brands"]}
        primary={{ to: '/demo', label: 'Contact founding team' }}
        secondary={{ to: '/platform', label: 'See the technology' }}
      />

      {/* Mission */}
      <SplitSection
        id="company-mission-heading"
        bg="mist"
        eyebrow="Our mission"
        // TODO(copy): mission heading and intro
        title="The intelligence layer for the health economy, licensed under our partners' brands"
        intro="Labs, clinics, hospitals, wellness platforms and insurers already hold the relationship with the people they serve. We give them the intelligence to run inside their own products. Partners keep their interface. Nostavia remains invisible."
        bullets={[
          `${numberWord(totalSystems)} systems and ${totalLive} live modules on one platform, Human OS`,
          'Switched on from the Partner Portal, live on the next API call',
          'Every module can be tried in a sandbox with fictional data first',
          'Improvements ship server-side, with no app update for the partner',
        ]}
        photo={{ src: '/labs-bg.jpg', w: 1800, h: 1200, alt: 'A laboratory technician handling a blood sample tube' }}
        visual={<SmartReportCard />}
        cta={{ to: '/human-os', label: 'Explore Human OS' }}
      />

      {/* What we do */}
      <Section labelledBy="company-what-heading">
        {/* TODO(copy): section heading */}
        <SectionHead
          id="company-what-heading"
          eyebrow="What we do"
          title="Three ways to put Nostavia inside your business"
          intro="We design and build custom health AI products for labs, clinics, hospitals and health apps, from scratch or on top of our White Label products and SDK. All under your brand."
          action={{ to: '/pricing', label: 'See pricing' }}
        />
        <FeatureGrid items={launchOptions} columns={3} />
      </Section>

      {/* Who we serve */}
      <Section bg="mist" labelledBy="company-serve-heading">
        {/* TODO(copy): section heading and intro */}
        <SectionHead
          id="company-serve-heading"
          eyebrow="Who we serve"
          title="Built for the businesses that already hold the patient relationship"
          intro="Each partner starts with the two or three systems that match the business, then adds modules as the programme matures."
        />
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {buyers.map((b, i) => (
            <li key={b.id}>
              <Reveal delay={(i % 3) * 90} className="h-full">
                <div className="h-full rounded-[16px] bg-white border border-hos-hairline p-6 sm:p-7 flex flex-col gap-4">
                  <span aria-hidden="true" className="h-[3px] w-10 bg-hos-yellow" />
                  <h3 className="font-display font-bold text-lg text-hos-black">{b.buyer}</h3>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    Runs on {b.systems.map((s) => getSystem(s)?.name).filter(Boolean).join(', ')}.
                  </p>
                  <div className="mt-auto space-y-2">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-hos-grey">Usually starts with</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {b.firstModules.map((m) => (
                        <li key={m} className="text-[11px] font-semibold rounded-full px-2.5 py-1 border border-hos-hairline bg-hos-mist text-hos-black">
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* Where we are */}
      <Section bg="navy" labelledBy="company-where-heading">
        <SectionHead id="company-where-heading" eyebrow="Where we are" title="Headquartered in Lucknow, India. Serving India and the UAE." tone="dark" />
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { place: 'India', line: 'Headquarters in Lucknow, Uttar Pradesh. Village health kiosks across four Uttar Pradesh districts.' },
            { place: 'United Arab Emirates', line: 'A market we serve today, alongside India.' },
          ].map((loc, i) => (
            <li key={loc.place}>
              <Reveal delay={i * 100} className="h-full">
                <div className="h-full rounded-[16px] bg-white/5 border border-white/10 p-6 sm:p-7 flex items-start gap-4">
                  <span className="w-10 h-10 shrink-0 rounded-[10px] bg-white/10 text-hos-yellow flex items-center justify-center">
                    <MapPin aria-hidden="true" className="w-5 h-5" />
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="font-display font-bold text-xl text-white">{loc.place}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{loc.line}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <StatRow
          dark
          items={[
            { value: totalLive, label: `live modules across ${numberWord(totalSystems).toLowerCase()} systems` },
            { value: 100, suffix: '+', label: 'biomarkers decoded against locally calibrated ranges' },
            { value: hospitalProgrammes.length, label: 'ready-made programmes for hospitals and health systems' },
            { value: 2, label: 'markets served today, India and the UAE' },
          ]}
        />
      </Section>

      {/* Founders */}
      <Section labelledBy="company-founders-heading">
        <SectionHead id="company-founders-heading" eyebrow="Founding leadership" title="Founder-built by biotechnology and AI engineers" />
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {founders.map((f, i) => (
            <li key={f.name}>
              <Reveal delay={i * 100} className="h-full">
                <div className="h-full rounded-[20px] border border-hos-hairline bg-white p-6 sm:p-9 flex flex-col gap-6 hover:border-hos-navy transition-colors">
                  <div className="flex items-center gap-5">
                    <span
                      aria-hidden="true"
                      className="w-16 h-16 shrink-0 rounded-full bg-hos-navy text-hos-yellow font-display font-semibold text-xl flex items-center justify-center ring-4 ring-hos-mist"
                    >
                      {initials(f.name)}
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-2xl tracking-tight text-hos-black">{f.name}</h3>
                      <p className="mt-1 font-mono text-[11px] font-bold uppercase tracking-widest text-hos-amber">{f.role}</p>
                    </div>
                  </div>
                  <p className="text-base text-[#475569] leading-relaxed border-t border-hos-hairline pt-6">{f.bio}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* Clinical and scientific advisory bench */}
      <section aria-labelledby="company-bench-heading" className="bg-hos-mist py-20 sm:py-28">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-5 space-y-6">
            <SectionHeading
              id="company-bench-heading"
              eyebrow="Clinical and scientific advisory bench"
              title="Supervised by medical leaders and research scientists"
              intro="Protocol outputs are reviewed by our licensed clinical advisory bench before release to any partner."
            />
            <div className="relative min-h-[260px] rounded-[20px] overflow-hidden bg-hos-navy">
              <img
                src="/photos/home-safety-consult.jpg"
                alt="A doctor reviewing results on a tablet with an older couple"
                width={1600}
                height={1126}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <Disclaimer className="pt-4 border-t border-hos-hairline" />
          </Reveal>

          <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
            {bench.map((b, i) => (
              <li key={b.name}>
                <Reveal delay={(i % 2) * 100} className="h-full">
                  <div className="h-full flex flex-col gap-4 rounded-[14px] bg-white border border-hos-hairline p-5 sm:p-6 hover:border-hos-navy transition-colors">
                    <div className="flex items-center gap-4">
                      <span aria-hidden="true" className="w-12 h-12 shrink-0 rounded-full bg-hos-navy text-hos-yellow font-display font-semibold flex items-center justify-center">
                        {initials(b.name)}
                      </span>
                      <div>
                        <h3 className="font-display font-bold text-base text-hos-black">{b.name}</h3>
                        <p className="text-xs font-semibold text-hos-amber mt-0.5">{b.credential}</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#475569] leading-relaxed">{b.detail}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Customers: Kiosk deployment */}
      <Section labelledBy="company-kiosk-heading">
        <SectionHead
          id="company-kiosk-heading"
          eyebrow="Delivery depth · Rural public health"
          title="Kiosk: the village health kiosk platform"
          intro="An offline-first health platform across four Uttar Pradesh districts, designed against a 57-household primary survey. It turns the village health worker the state already deploys into a clinical navigator, instead of building an app patients are expected to operate themselves."
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          <div className="lg:col-span-8">
            <FeatureGrid items={kioskFeatures} columns={2} />
          </div>
          <Reveal delay={150} className="lg:col-span-4">
            <div className="h-full rounded-[16px] bg-hos-black text-white p-6 sm:p-7 flex flex-col gap-4">
              <div className="rounded-[10px] bg-white px-4 py-3 self-start">
                <img src={KIOSK_LOGO} alt="Kiosk Health logo" width={812} height={309} loading="lazy" decoding="async" className="h-8 w-auto object-contain" />
              </div>
              <DistrictMap />
              <p className="text-xs text-slate-300 leading-relaxed">Chitrakoot, Pratapgarh, Kaushambi and Prayagraj, Uttar Pradesh.</p>
              <p className="mt-auto flex items-start gap-3 border-t border-white/10 pt-4 text-sm text-slate-200 leading-relaxed">
                <span aria-hidden="true" className="mt-2 w-4 h-[3px] shrink-0 bg-hos-yellow" />
                Offline-first: a full day of visits with zero network dependency.
              </p>
            </div>
          </Reveal>
        </div>
        <StatRow
          items={[
            { value: 4, label: 'districts: Chitrakoot, Pratapgarh, Kaushambi and Prayagraj' },
            { value: 10000, label: 'households per hub cluster' },
            { value: 57, label: 'households in the primary survey powering the design' },
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Reveal className="h-full">
            <Panel className="h-full space-y-4">
              {/* TODO(copy): consumer reference app heading */}
              <h3 className="font-display font-bold text-xl text-hos-black">Our own consumer reference app</h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Nostavia's consumer reference app runs on iOS and Android, serving as proof-of-concept for enterprise partner integrations.
              </p>
              <ProductionGroup />
            </Panel>
          </Reveal>
          <Reveal delay={120} className="h-full">
            <Panel className="h-full space-y-4">
              <h3 className="font-display font-bold text-xl text-hos-black">Reference clients</h3>
              <p className="text-sm text-[#475569] leading-relaxed">Active reference clients include incubator IIHMF.</p>
            </Panel>
          </Reveal>
        </div>
      </Section>

      {/* Supported by */}
      <Section bg="mist" labelledBy="company-programs-heading">
        {/* TODO(copy): section heading and intro */}
        <SectionHead
          id="company-programs-heading"
          eyebrow="Supported by"
          title="Supported by global startup programmes"
          intro="Technology and startup programmes that support our work."
          action={{ to: '/security', label: 'Security and compliance' }}
        />
        <Reveal>
          <Panel>
            <ProgramsGroup showHeading={false} />
          </Panel>
        </Reveal>
      </Section>

      <CtaBand
        title="Partner with Nostavia"
        highlight="to power your health platform."
        body={
          <>
            Talk to the founding team. Thirty minutes on live product, not slides, or write to us at{' '}
            <a
              href={`mailto:${TRUST_CONTACT}`}
              className="text-white underline underline-offset-4 decoration-hos-yellow decoration-2 hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hos-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-hos-black"
            >
              {TRUST_CONTACT}
            </a>
            .
          </>
        }
        primary={{ to: '/demo', label: 'Book a demo' }}
      />
    </div>
  );
};
