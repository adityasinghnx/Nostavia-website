import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Layers, Smartphone, Cpu, Volume2 } from 'lucide-react';

export const PlatformLayerThreeCardsSection: React.FC = () => {
  const cards = [
    {
      title: 'Intelligence SDK',
      subtitle: 'Lab parsing, food scans & AI concierge',
      description: 'For platforms that already run an application. Decoding, protocols, the concierge and all intelligence modules embed into your existing product. Your user experience is unchanged.',
      linkText: 'View SDK →',
      linkUrl: '/solutions/gravity',
      icon: <Code className="w-5 h-5 text-[#0F172A]" />,
    },
    {
      title: 'Wearables SDK',
      subtitle: 'Single API for Apple, Oura, WHOOP and more',
      description: 'One integration normalises every major device — replacing a dozen separate provider integrations and the custom parsing that comes with each.',
      linkText: 'View SDK →',
      linkUrl: '/solutions/galaxy',
      icon: <Layers className="w-5 h-5 text-[#0F172A]" />,
    },
    {
      title: 'White-Label App',
      subtitle: 'Complete iOS & Android app under your brand',
      description: 'For labs and clinics with no application of their own. Your name on the store listing. All technology, AI routing and device handling operated by us. No engineering team required on your side.',
      linkText: 'View white-label →',
      linkUrl: '/solutions/storyhealth',
      icon: <Smartphone className="w-5 h-5 text-[#0F172A]" />,
    },
    {
      title: 'AI Agents (including voice)',
      subtitle: 'Always-on patient support & voice booking agent',
      description: 'Nostavia Front Desk answers every call in local languages, names a specific doctor, and turns an enquiry into a booked visit across phone, WhatsApp & web under your brand.',
      linkText: 'View AI Agents →',
      linkUrl: '/solutions/front-desk',
      icon: <Volume2 className="w-5 h-5 text-[#0F172A]" />,
    },
    {
      title: 'Hospital Patient Front Door',
      subtitle: 'Branded 5-module platform & recovery engine',
      description: 'The complete enterprise front door for hospitals: preventive smart reports, discharge-to-recovery engine, leakage audit and live attribution dashboard.',
      linkText: 'View Platform →',
      linkUrl: '/solutions/hospitals',
      icon: <Cpu className="w-5 h-5 text-[#0F172A]" />,
    },
  ];

  return (
    <section className="w-full font-body text-[#0F172A] py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header Section */}
        <div className="max-w-3xl space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            EMBEDDABLE PLATFORM & SDKS
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-[#0F172A] tracking-tight leading-[1.05]">
            Five ways in. Pick the one that matches what you already have.
          </h2>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, idx) => (
            <div
              key={idx}
              className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-5 hover:border-[#CBD5E1] transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center">
                  {c.icon}
                </div>

                <div>
                  <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                    {c.title}
                  </h3>
                  <div className="text-xs font-mono font-semibold text-[#64748B] italic mt-0.5">
                    {c.subtitle}
                  </div>
                </div>

                <p className="text-sm text-[#64748B] leading-relaxed font-body">
                  {c.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/80">
                <Link
                  to={c.linkUrl}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F172A] hover:text-[#2563EB] transition-colors"
                >
                  {c.linkText}
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
