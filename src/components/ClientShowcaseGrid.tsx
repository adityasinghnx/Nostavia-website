import React from 'react';

export const ClientShowcaseGrid: React.FC = () => {
  const deploymentTracks = [
    {
      title: 'Diagnostic LIS & PDF Extraction Pipelines',
      category: 'Lab Infrastructure',
      description: 'Automated native PDF parsing, LIS database webhooks, and 100+ biomarker normalization engines custom-tuned to laboratory reference ranges.',
      deliverables: ['LIS Database Sync', 'PDF Parsing Engine', 'Biomarker Normalization API'],
      timeline: '2-Week Deployment',
    },
    {
      title: 'Practitioner AI Consultation Dashboards',
      category: 'Clinical Workflows',
      description: 'Dedicated web dashboards for physicians and longevity clinicians: pre-consultation AI briefs, biological age velocity tracking, and protocol customization.',
      deliverables: ['Clinician Portal UI', 'Pre-Consult Intake Briefs', 'Protocol Override Tools'],
      timeline: '3-Week Deployment',
    },
    {
      title: 'Continuous Telemetry & Wearable SDK',
      category: 'Device Streaming',
      description: 'Unified REST & GraphQL telemetry streaming integrating Apple Watch, Oura Ring 3/4, WHOOP 4.0, and Continuous Glucose Monitors (CGM).',
      deliverables: ['Wearable Data Normalizer', 'Continuous HRV Streaming', 'CGM Spike Alerts'],
      timeline: '2-Week Deployment',
    },
    {
      title: 'Automated Patient Re-Test Recall Engine',
      category: 'Patient Retention',
      description: 'Native WhatsApp Business API integration triggering automated follow-up campaigns based on physiological biomarker half-lives (e.g. HbA1c, Ferritin).',
      deliverables: ['WhatsApp Business API Sync', 'Biomarker Half-Life Triggers', 'Patient Booking Flow'],
      timeline: '10-Day Deployment',
    },
  ];

  return (
    <div className="space-y-10 font-body">
      <div className="max-w-3xl space-y-3">
        <div className="eyebrow text-[#B45309] font-bold text-xs uppercase tracking-widest font-mono">
          SOLUTIONS ENGINEERING TRACK RECORD
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
          Custom health AI deployment tracks
        </h2>
        <p className="text-base text-[#64748B] leading-relaxed font-body">
          Bespoke health intelligence modules, LIS/EHR data pipelines, and custom clinical dashboards engineered directly by our founding team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deploymentTracks.map((track, idx) => (
          <div
            key={idx}
            className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-6 hover:border-[#CBD5E1] transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="px-3 py-1 bg-[#FFF7ED] text-[#9A3412] font-bold rounded-[2px] border border-[#FED7AA]">
                  {track.category}
                </span>
                <span className="text-[#0F172A] font-bold">
                  {track.timeline}
                </span>
              </div>

              <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                {track.title}
              </h3>

              <p className="text-sm text-[#64748B] leading-relaxed font-body">
                {track.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] space-y-2">
              <div className="font-mono text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Core Deliverables:
              </div>
              <div className="flex flex-wrap gap-2">
                {track.deliverables.map((item, dIdx) => (
                  <span key={dIdx} className="px-2.5 py-1 bg-white text-[#64748B] border border-[#E2E8F0] rounded-[2px] font-mono text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
