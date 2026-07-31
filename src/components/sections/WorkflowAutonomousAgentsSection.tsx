import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Activity, Stethoscope, HeartPulse, ShieldCheck } from 'lucide-react';

export const WorkflowAutonomousAgentsSection: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabs = [
    {
      id: 'labs',
      label: 'Diagnostic Labs',
      icon: <Activity className="w-4 h-4 text-[#0F172A]" />,
      headline: 'Turn every panel into a reason to come back.',
      description: 'Smart Reports generated for every routine test under your brand. Re-Test Recall that finds which dormant patients are due and why, from your own database.',
      features: [
        'Smart Reports',
        'Re-Test Recall',
        'Marker trends',
        'Wearable fusion',
      ],
      metric: 'Measured on: re-test conversion.',
      image: '/labs-bg.jpg',
      imageAlt: 'Diagnostic Lab Telemetry & Biomarker Analysis',
      ctaText: 'Explore diagnostic labs →',
      ctaLink: '/industries/diagnostic-labs',
    },
    {
      id: 'clinics',
      label: 'Clinics & Longevity',
      icon: <Stethoscope className="w-4 h-4 text-[#0F172A]" />,
      headline: 'Be present for the eleven months between appointments.',
      description: 'Clinical Intake Briefs before every consult. Adaptive protocols that adjust as the body responds. A practitioner dashboard showing who\'s drifting, on which markers, right now.',
      features: [
        'Intake Briefs',
        'Adaptive protocols',
        'Practitioner dashboard',
        'Programme tracking',
      ],
      metric: 'Measured on: programme renewal.',
      image: '/clinics-bg.jpg',
      imageAlt: 'Longevity Clinic Consultation & Chart Review',
      ctaText: 'Explore clinics & longevity →',
      ctaLink: '/industries/clinics',
    },
    {
      id: 'wellness',
      label: 'Wellness & Apps',
      icon: <HeartPulse className="w-4 h-4 text-[#0F172A]" />,
      headline: 'Your app counts. Make it interpret.',
      description: 'One integration adds lab decoding, food bio-impact, biological age and adaptive protocols to a product your users already open every day.',
      features: [
        'Food scanning',
        'Wearables SDK',
        'Biological age',
        'AI concierge',
      ],
      metric: 'Measured on: retention and session depth.',
      image: '/wellness-bg.jpg',
      imageAlt: 'Wearables SDK & Food Scanning',
      ctaText: 'Explore wellness & apps →',
      ctaLink: '/solutions/galaxy',
    },
    {
      id: 'payers',
      label: 'Insurers & Payers',
      icon: <ShieldCheck className="w-4 h-4 text-[#0F172A]" />,
      headline: 'Risk is priced once a year. The population changes daily.',
      description: 'We\'re building the layer that reads that change — risk scoring across an insured cohort from continuous signal rather than an annual form. Selecting design partners now.',
      features: [
        'Population risk',
        'Cohort intelligence',
        'Early identification',
      ],
      metric: 'Selecting design partners now.',
      image: '/payers-bg.jpg',
      imageAlt: 'Insurer Population Risk Scoring',
      ctaText: 'Talk about a design partnership →',
      ctaLink: '/industries/payers',
    },
  ];

  const currentTab = tabs[activeTabIndex];

  const handlePrev = () => {
    setActiveTabIndex((prev) => (prev === 0 ? tabs.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveTabIndex((prev) => (prev === tabs.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full font-body text-[#0F172A] py-8 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Top Header Row matching Reference */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[46px] text-[#0F172A] tracking-tight leading-[1.06] max-w-2xl">
            What are you building?
          </h2>
          
          <div className="flex items-center gap-2 shrink-0 pb-1">
            <button
              onClick={handlePrev}
              className="w-10 h-10 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-[2px] flex items-center justify-center transition-all shadow-sm"
              aria-label="Previous sector"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-[2px] flex items-center justify-center transition-all shadow-sm"
              aria-label="Next sector"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Tabbed Frame with 1px border matching Screenshot 1 */}
        <div className="border border-[#E2E8F0] bg-white rounded-[2px] overflow-hidden shadow-none">
          
          {/* Top Horizontal Tab Bar (No Status Pills) */}
          <div className="flex items-center gap-6 overflow-x-auto px-6 py-4 border-b border-[#E2E8F0] bg-white scrollbar-none font-body text-xs">
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabIndex(idx)}
                className={`transition-all flex items-center justify-center whitespace-nowrap ${
                  activeTabIndex === idx
                    ? 'bg-[#FFF7ED] border border-[#FDBA74] text-[#7C2D12] font-extrabold px-4 py-2.5 rounded-[2px] shadow-sm'
                    : 'bg-transparent border-transparent text-[#64748B] hover:text-[#0F172A] font-medium px-2 py-2.5'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 h-[480px] sm:h-[540px] lg:h-[578px] overflow-hidden">
            
            {/* Left Content Column (45% Width) */}
            <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-8 overflow-y-auto">
              <div className="space-y-4 max-w-md">
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#0F172A] leading-[1.15]">
                  {currentTab.headline}
                </h3>

                <p className="text-sm text-[#64748B] leading-relaxed font-body">
                  {currentTab.description}
                </p>
              </div>

              {/* Feature Pills & CTA */}
              <div className="space-y-4 pt-4 border-t border-slate-100 font-body">
                <div className="flex flex-wrap gap-2">
                  {currentTab.features.map((feat, fIdx) => (
                    <span key={fIdx} className="px-3 py-1 bg-[#FFF7ED] border border-[#FED7AA] text-[#9A3412] rounded-[2px] font-mono text-xs font-semibold">
                      `{feat}`
                    </span>
                  ))}
                </div>

                <div className="text-xs text-[#64748B] font-mono">
                  <span className="font-bold text-[#0F172A]">Measured on:</span> {currentTab.metric.replace('Measured on: ', '')}
                </div>

                <div>
                  <Link
                    to={currentTab.ctaLink}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F172A] hover:text-[#2563EB] transition-colors"
                  >
                    {currentTab.ctaText}
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Flush Image Column (55% Width) */}
            <div className="lg:col-span-7 relative h-full flex items-center justify-center overflow-hidden bg-slate-100">
              <img
                src={currentTab.image}
                alt={currentTab.imageAlt}
                className="w-full h-full object-cover object-center"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
