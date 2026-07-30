import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, Terminal, FileCode } from 'lucide-react';

export const IntegrationCodeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'response' | 'request'>('response');
  const [copied, setCopied] = useState(false);

  const jsonResponse = `{
  "status": "success",
  "biomarkers_decoded": 104,
  "processing_time_ms": 782,
  "summary": "Fasting blood glucose trajectory indicates +12% 90-day metabolic drift. ApoB optimal.",
  "outliers": [
    {
      "marker": "hs-CRP",
      "value": 3.4,
      "unit": "mg/L",
      "status": "outlier",
      "optimal_range": "<1.0"
    }
  ],
  "actionable_recommendations": [
    "Retest lipid & inflammatory panel in 90 days",
    "Initiate circadian sleep architecture protocol"
  ]
}`;

  const jsonRequest = `{
  "lab_pdf_url": "https://api.nostaviahealth.com/v1/ingest/panel_9021.pdf",
  "partner_id": "lab_live360_prod",
  "anonymized_patient_id": "anon_usr_78912",
  "include_whole_body_correlations": true,
  "locale": "en_US"
}`;

  const currentCode = activeTab === 'response' ? jsonResponse : jsonRequest;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full font-body text-[#0F172A] py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-3">
            <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
              FOR ENGINEERING TEAMS
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-[#0F172A] tracking-tight leading-[1.05]">
              A lab PDF in. Structured, classified, explained intelligence out.
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] font-body leading-relaxed max-w-2xl">
              REST and native SDKs for iOS, Android and web. Sandbox keys on request. Most partners return live intelligence inside a week.
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <Link
              to="/company"
              className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white font-mono text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-[2px] transition-all shadow-sm"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              Read the docs →
            </Link>
          </div>
        </div>

        {/* World-Class Premium Enterprise Code Inspector */}
        <div className="border border-[#1E293B] rounded-[2px] bg-[#090D16] shadow-2xl overflow-hidden font-mono text-xs">
          
          {/* Top Window Bar with macOS Control Dots & Tab Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3.5 bg-[#0F172A] border-b border-slate-800/80 select-none">
            
            {/* Left Traffic Dots & Tabs */}
            <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>

              <div className="flex items-center gap-2 sm:border-l sm:border-slate-800 sm:pl-6 flex-wrap">
                <button
                  onClick={() => setActiveTab('response')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-[2px] font-bold text-xs transition-all ${
                    activeTab === 'response'
                      ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-inner'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  Response Payload
                </button>

                <button
                  onClick={() => setActiveTab('request')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-[2px] font-bold text-xs transition-all ${
                    activeTab === 'request'
                      ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-inner'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Request Payload
                </button>
              </div>
            </div>

            {/* Right Status Badge & Copy Code Button */}
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-0.5 rounded-[2px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                HTTP 200 OK
              </span>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs font-semibold bg-slate-800/70 hover:bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-[2px] transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Syntax Highlighted Code Display Area */}
          <div className="p-6 overflow-x-auto bg-[#040711] leading-relaxed text-slate-200">
            <pre className="text-xs font-mono">
              {activeTab === 'response' ? (
                <code>
                  <span className="text-slate-500">{`{\n`}</span>
                  <span className="text-cyan-400">{`  "status"`}</span><span className="text-slate-400">{`: `}</span><span className="text-emerald-400">{`"success"`}</span><span className="text-slate-500">{`,\n`}</span>
                  <span className="text-cyan-400">{`  "biomarkers_decoded"`}</span><span className="text-slate-400">{`: `}</span><span className="text-amber-400">{`104`}</span><span className="text-slate-500">{`,\n`}</span>
                  <span className="text-cyan-400">{`  "processing_time_ms"`}</span><span className="text-slate-400">{`: `}</span><span className="text-amber-400">{`782`}</span><span className="text-slate-500">{`,\n`}</span>
                  <span className="text-cyan-400">{`  "summary"`}</span><span className="text-slate-400">{`: `}</span><span className="text-emerald-400">{`"Fasting blood glucose trajectory indicates +12% 90-day metabolic drift. ApoB optimal."`}</span><span className="text-slate-500">{`,\n`}</span>
                  <span className="text-cyan-400">{`  "outliers"`}</span><span className="text-slate-400">{`: [\n    {\n`}</span>
                  <span className="text-cyan-400">{`      "marker"`}</span><span className="text-slate-400">{`: `}</span><span className="text-emerald-400">{`"hs-CRP"`}</span><span className="text-slate-500">{`,\n`}</span>
                  <span className="text-cyan-400">{`      "value"`}</span><span className="text-slate-400">{`: `}</span><span className="text-amber-400">{`3.4`}</span><span className="text-slate-500">{`,\n`}</span>
                  <span className="text-cyan-400">{`      "unit"`}</span><span className="text-slate-400">{`: `}</span><span className="text-emerald-400">{`"mg/L"`}</span><span className="text-slate-500">{`,\n`}</span>
                  <span className="text-cyan-400">{`      "status"`}</span><span className="text-slate-400">{`: `}</span><span className="text-rose-400 font-bold">{`"outlier"`}</span><span className="text-slate-500">{`,\n`}</span>
                  <span className="text-cyan-400">{`      "optimal_range"`}</span><span className="text-slate-400">{`: `}</span><span className="text-emerald-400">{`"<1.0"`}</span><span className="text-slate-500">{`\n    }\n  ],\n`}</span>
                  <span className="text-cyan-400">{`  "actionable_recommendations"`}</span><span className="text-slate-400">{`: [\n`}</span>
                  <span className="text-emerald-400">{`    "Retest lipid & inflammatory panel in 90 days"`}</span><span className="text-slate-500">{`,\n`}</span>
                  <span className="text-emerald-400">{`    "Initiate circadian sleep architecture protocol"`}</span><span className="text-slate-500">{`\n  ]\n`}</span>
                  <span className="text-slate-500">{`}`}</span>
                </code>
              ) : (
                <code>
                  <span className="text-slate-500">{`{\n`}</span>
                  <span className="text-cyan-400">{`  "lab_pdf_url"`}</span><span className="text-slate-400">{`: `}</span><span className="text-emerald-400">{`"https://api.nostaviahealth.com/v1/ingest/panel_9021.pdf"`}</span><span className="text-slate-500">{`,\n`}</span>
                  <span className="text-cyan-400">{`  "partner_id"`}</span><span className="text-slate-400">{`: `}</span><span className="text-emerald-400">{`"lab_live360_prod"`}</span><span className="text-slate-500">{`,\n`}</span>
                  <span className="text-cyan-400">{`  "anonymized_patient_id"`}</span><span className="text-slate-400">{`: `}</span><span className="text-emerald-400">{`"anon_usr_78912"`}</span><span className="text-slate-500">{`,\n`}</span>
                  <span className="text-cyan-400">{`  "include_whole_body_correlations"`}</span><span className="text-slate-400">{`: `}</span><span className="text-purple-400 font-bold">{`true`}</span><span className="text-slate-500">{`,\n`}</span>
                  <span className="text-cyan-400">{`  "locale"`}</span><span className="text-slate-400">{`: `}</span><span className="text-emerald-400">{`"en_US"`}</span><span className="text-slate-500">{`\n}`}</span>
                </code>
              )}
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
};
