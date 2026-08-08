import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const RealOutcomesCaseStudySection: React.FC = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);

  const caseStudies = [
    {
      brandLogo: 'Dubai Longevity',
      brandBg: 'bg-[#059669]',
      title: 'GCC Longevity & Preventive Clinic',
      description: 'Aligned with Dubai Longevity Authority Law No. 17 of 2026, Nostavia\'s SOMA Dual-Brain engine automated pre-consultation chart review for preventive care specialists in Dubai.',
      link: '/industries/clinics',
      metrics: [
        { value: '15 Mins', label: 'Saved per patient consultation' },
        { value: '100+', label: 'Biomarkers decoded into sub-ranges' },
        { value: '100%', label: 'In-region UAE health data privacy' },
      ],
    },
    {
      brandLogo: 'IIHMF Institute',
      brandBg: 'bg-[#2563EB]',
      title: 'IIHMF Healthcare Incubator',
      description: 'Deploying Nostavia\'s Wearables SDK and Atlas Biomarker Graph for longitudinal metabolic risk tracking and automated protocol adherence.',
      link: '/solutions/galaxy',
      metrics: [
        { value: '1 SDK', label: 'Replacing 12 wearable provider APIs' },
        { value: '92%', label: 'Patient protocol adherence lift' },
        { value: '₹4.55L', label: 'Production billed revenue' },
      ],
    },
    {
      brandLogo: 'LIVE 360°',
      brandBg: 'bg-[#7C3AED]',
      title: 'Live 360° Diagnostics',
      description: 'Nostavia\'s Smart Report as a Service layer sits on top of the existing lab reporting pipeline — extracting biomarkers from any format, normalising against source-specific reference ranges, categorising into optimal vs in-range vs outlier, and persisting results for longitudinal trending. The report itself becomes the retention mechanism.',
      link: '/industries/diagnostic-labs',
      metrics: [
        { value: 'Any Format', label: 'Lab PDF extraction regardless of layout' },
        { value: 'Optimal Bands', label: 'Beyond binary in-range flagging' },
        { value: 'Longitudinal', label: 'Same panel becomes a trend, not a second file' },
      ],
    },
    {
      brandLogo: 'KANPUR CARDIOLOGY',
      brandBg: 'bg-[#0F172A]',
      title: 'Tertiary Care Cardiology Hospital',
      description: 'Two systems deployed inside a working hospital against real patient flow. An AI voice agent handling inbound calls end-to-end in local languages — including code-switching mid-sentence and family members speaking on behalf of patients — and a contactless rPPG vitals pipeline returning 12 physiological parameters from a single facial video capture.',
      link: '/solutions/front-desk',
      metrics: [
        { value: '12 Params', label: 'Contactless vitals from a single camera capture' },
        { value: 'Multilingual', label: 'Code-switching conversational voice agent' },
        { value: 'Live', label: 'Running against real patient flow, not a sandbox' },
      ],
    },
    {
      brandLogo: 'KIOSK',
      brandBg: 'bg-[#D97706]',
      title: 'Village Health Kiosk Platform',
      description: 'Offline-first health platform across four Uttar Pradesh districts turning the village health worker the state already deploys into a clinical navigator. Hindi voice copilot, decoded diagnostics spoken aloud, chronic disease registry with automated recall, and medicine stock intelligence — all on a single tablet at each kiosk.',
      link: '/company',
      metrics: [
        { value: '4 Districts', label: 'Chitrakoot, Pratapgarh, Kaushambi, Prayagraj' },
        { value: 'Offline-First', label: 'Full day of visits with zero network dependency' },
        { value: '10,000', label: 'Households covered per hub cluster' },
      ],
    },
  ];

  const currentCase = caseStudies[activeCaseIndex];

  const handlePrev = () => {
    setActiveCaseIndex((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveCaseIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full font-body text-[#0F172A] py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header Section matching Screenshot 3 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="eyebrow text-[#94A3B8] font-bold text-xs uppercase tracking-widest">
              CUSTOMER STORIES
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-[#0F172A] tracking-tight leading-[1.02]">
              Real outcomes from real deployments
            </h2>
            <p className="text-base sm:text-lg text-[#475569] font-body">
              See how leading diagnostic networks, longevity clinics, and health platforms are transforming themselves.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-[4px] bg-[#0F172A] hover:bg-[#1E293B] text-white flex items-center justify-center transition-all"
              aria-label="Previous case study"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-[4px] bg-[#0F172A] hover:bg-[#1E293B] text-white flex items-center justify-center transition-all"
              aria-label="Next case study"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Case Study Card matching Screenshot 3 (50% Accent Brand Block / 50% Metrics) */}
        <div className="border border-[#E5E7EB] bg-[#F8FAFC] rounded-[4px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm">
          
          {/* Left Brand Block (50%) */}
          <div className={`lg:col-span-6 ${currentCase.brandBg} text-white p-12 sm:p-20 flex items-center justify-center min-h-[320px]`}>
            <div className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-center">
              {currentCase.brandLogo}
            </div>
          </div>

          {/* Right Metrics & Copy (50%) */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-8 bg-white border-t lg:border-t-0 lg:border-l border-[#E5E7EB]">
            <div className="space-y-6">
              <p className="text-sm sm:text-base text-[#334155] leading-relaxed font-body">
                {currentCase.description}
              </p>

              <div>
                <Link
                  to={currentCase.link}
                  className="inline-flex items-center justify-center bg-[#000000] hover:bg-[#1A1A1A] text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-[2px] shadow-sm transition-all"
                >
                  SEE FULL CASE STUDY
                </Link>
              </div>
            </div>

            {/* 3 Metrics Rows with Thin Dividers */}
            <div className="divide-y divide-[#E5E7EB] border-t border-[#E5E7EB] font-body">
              {currentCase.metrics.map((m, mIdx) => (
                <div key={mIdx} className="py-4 flex items-baseline gap-6">
                  <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] min-w-[120px]">
                    {m.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#64748B] font-medium">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
