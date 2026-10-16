import React from 'react';
import { FileText, Smartphone, Database, Network, Layers, Code2, PhoneCall, LayoutDashboard, HeartPulse, Activity } from 'lucide-react';
import { Container, SectionHeading } from './shared';
import { Reveal } from './motion';

/* Facts from the existing site: Smart Reports (any lab PDF), Wearable Telemetry (Apple Health and
 * Google Health Connect), Hospitals page (HIS exports, FHIR R4 records) and the trust config (ABDM). */
const dataIn = [
  { name: 'Lab reports', line: 'Any lab PDF, regardless of layout', icon: FileText },
  { name: 'Apple Health', line: 'Wearable and activity data on iOS', icon: HeartPulse },
  { name: 'Google Health Connect', line: 'Wearable and activity data on Android', icon: Activity },
  { name: 'HIS exports', line: 'CSV, Excel or PDF exports from your HIS', icon: Database },
  { name: 'FHIR R4', line: 'Records structured to FHIR R4', icon: Layers },
  { name: 'ABDM and ABHA', line: "Architecture built for India's digital health mission", icon: Network },
];

const deliveredAs = [
  { name: 'SDK in your app', line: 'No change to your UI or user experience', icon: Code2 },
  { name: 'White-label app', line: 'Your own iOS and Android app, under your brand', icon: Smartphone },
  { name: 'Voice agent', line: 'On your phone line, in local languages', icon: PhoneCall },
  { name: 'Dashboards', line: 'Cohort risk and executive reporting', icon: LayoutDashboard },
];

const Tile: React.FC<{ name: string; line: string; icon: React.FC<{ className?: string }>; dark?: boolean }> = ({ name, line, icon: Icon, dark }) => (
  <li
    className={`flex items-start gap-3 rounded-[12px] p-4 border transition-colors ${
      dark ? 'bg-white/5 border-white/10 hover:border-hos-yellow/50' : 'bg-white border-hos-hairline hover:border-hos-navy'
    }`}
  >
    <span className={`w-9 h-9 shrink-0 rounded-[10px] flex items-center justify-center ${dark ? 'bg-hos-yellow text-hos-black' : 'bg-hos-mist border border-hos-hairline text-hos-black'}`}>
      <Icon aria-hidden="true" className="w-4 h-4" />
    </span>
    <span>
      <span className={`block font-display font-bold text-sm ${dark ? 'text-white' : 'text-hos-black'}`}>{name}</span>
      <span className={`block text-xs leading-relaxed mt-0.5 ${dark ? 'text-slate-300' : 'text-[#475569]'}`}>{line}</span>
    </span>
  </li>
);

/** Data moving from your systems, through Nostavia, to your products. Decorative. */
const FlowHub: React.FC = () => (
  <div aria-hidden="true" className="hos-anim flex flex-col lg:flex-row items-center justify-center gap-3 py-2 lg:py-0">
    {/* desktop: horizontal streams */}
    <div className="hidden lg:flex flex-col gap-5">
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="relative w-16 h-px bg-hos-navy/15 overflow-visible">
          {[0, 1].map((d) => (
            <span
              key={d}
              className="absolute -top-[3px] left-0 w-1.5 h-1.5 rounded-full bg-hos-amber"
              style={{ animation: `hos-flow 2.4s linear ${row * 0.35 + d * 1.2}s infinite` }}
            />
          ))}
        </div>
      ))}
    </div>
    {/* mobile: vertical stream */}
    <div className="lg:hidden relative h-12 w-px bg-hos-navy/15">
      {[0, 1].map((d) => (
        <span key={d} className="absolute -left-[3px] top-0 w-1.5 h-1.5 rounded-full bg-hos-amber" style={{ animation: `hos-flow-y 1.8s linear ${d * 0.9}s infinite` }} />
      ))}
    </div>
    <span className="order-first lg:order-none w-14 h-14 rounded-2xl bg-hos-navy flex items-center justify-center shadow-lg ring-4 ring-white">
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <polygon points="20,8 34,16 20,24 6,16" fill="#F5D97B" />
        <polygon points="6,16 20,24 34,16 34,19 20,27 6,19" fill="#C9A94F" />
        <polygon points="6,23 20,31 34,23 34,26 20,34 6,26" fill="#FFFFFF" fillOpacity="0.35" />
      </svg>
    </span>
    <div className="hidden lg:flex flex-col gap-5">
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="relative w-16 h-px bg-hos-navy/15 overflow-visible">
          <span
            className="absolute -top-[3px] left-0 w-1.5 h-1.5 rounded-full bg-hos-navy"
            style={{ animation: `hos-flow 2.4s linear ${0.6 + row * 0.35}s infinite` }}
          />
        </div>
      ))}
    </div>
  </div>
);

export const IntegrationsSection: React.FC = () => (
  <section aria-labelledby="home-integrations-heading" className="bg-hos-mist py-20 sm:py-28">
    <Container className="space-y-12">
      <Reveal>
        {/* TODO(copy): section heading and intro */}
        <SectionHeading
          id="home-integrations-heading"
          eyebrow="Integrations and standards"
          title="Works with the data and systems you already run"
          intro="Bring the data you already have. We deliver the intelligence wherever your customers and teams are."
        />
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_auto_minmax(0,5fr)] gap-4 items-stretch">
        <Reveal className="h-full">
          <div className="h-full rounded-[16px] bg-white border border-hos-hairline p-6 sm:p-8 space-y-5">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-hos-grey">Data in</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dataIn.map((t) => (
                <Tile key={t.name} {...t} />
              ))}
            </ul>
          </div>
        </Reveal>
        <FlowHub />
        <Reveal delay={150} className="h-full">
          <div className="h-full rounded-[16px] bg-hos-navy p-6 sm:p-8 space-y-5">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-hos-yellow">Delivered as</h3>
            <ul className="grid grid-cols-1 gap-3">
              {deliveredAs.map((t) => (
                <Tile key={t.name} {...t} dark />
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Container>
  </section>
);
