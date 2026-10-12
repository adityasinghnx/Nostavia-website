import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Layers, Hammer } from 'lucide-react';

export const PlatformLayerThreeCardsSection: React.FC = () => {
  const cards = [
    {
      title: 'Custom Build',
      subtitle: 'Designed and built from scratch, around your workflow',
      description: 'Our core offering. Tell us the product you want (a patient app, an AI agent, a hospital programme, a clinic platform or something entirely new) and our founding engineering team designs, builds, launches and runs it for you, on the same engine that powers everything we make.',
      price: 'From $7,500 one-time + $750/mo',
      linkText: 'View Custom Build →',
      linkUrl: '/solutions/engineering',
      icon: <Hammer className="w-5 h-5 text-[#0F172A]" />,
    },
    {
      title: 'White Label',
      subtitle: 'Our ready-made products, launched as yours',
      description: 'For labs, clinics and hospitals that want a proven product live in weeks: a branded patient app, smart reports & re-test recall, an AI front-desk agent or hospital patient programmes. Your name on it. We launch, host and run it.',
      price: 'From $1,500 one-time + $399/mo',
      linkText: 'View White Label →',
      linkUrl: '/solutions/storyhealth',
      icon: <Layers className="w-5 h-5 text-[#0F172A]" />,
    },
    {
      title: 'SDK',
      subtitle: 'Add health AI to the app you already have',
      description: 'For wellness, fitness, insurance and health platforms with their own app. Lab decoding for 100+ biomarkers, Apple Health and Google Health Connect data (more device feeds in development), food scanning and an AI health companion, inside your product. Your user experience is unchanged.',
      price: 'From $999 one-time + $399/mo',
      linkText: 'View SDK →',
      linkUrl: '/solutions/gravity',
      icon: <Code className="w-5 h-5 text-[#0F172A]" />,
    },
  ];

  return (
    <section className="w-full font-body text-[#0F172A] py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header Section */}
        <div className="max-w-3xl space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            OUR PRODUCTS
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-[#0F172A] tracking-tight leading-[1.05]">
            Built from scratch for you, or from our proven products.
          </h2>
        </div>

        {/* Product Cards Grid */}
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

              <div className="pt-2 border-t border-slate-200/80 space-y-2">
                <div className="text-xs font-mono font-bold text-[#0F172A]">{c.price}</div>
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
