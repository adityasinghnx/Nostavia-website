import React, { useState } from 'react';
import { Clock, Flame, ShieldAlert, HeartPulse, Sparkles, Zap } from 'lucide-react';
import { StatusPill } from './StatusPill';

export const ProductModuleScreens: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'twin' | 'bioage' | 'pace' | 'risk' | 'domains' | 'correlation'>('twin');

  return (
    <div className="w-full bg-white border border-[#E5E7EB] rounded-[12px] p-6 sm:p-8 shadow-card font-body">
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E5E7EB]">
        <div>
          <div className="eyebrow mb-1">LIVE PRODUCT INTERFACE</div>
          <h3 className="font-display font-bold text-2xl text-[#0F172A]">
            The Intelligence Modules
          </h3>
          <p className="text-xs text-[#64748B] mt-1">
            "The modules are the product. Everything else is plumbing." Integrated via SDK or White-Label.
          </p>
        </div>
        <StatusPill status="Live" />
      </div>

      {/* Module Tabs Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-[#E5E7EB] font-mono text-xs">
        <button
          onClick={() => setActiveTab('twin')}
          className={`px-3.5 py-2 rounded-[6px] transition-all whitespace-nowrap flex items-center gap-2 font-semibold ${
            activeTab === 'twin'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:bg-white hover:text-[#0F172A]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Digital Twin</span>
        </button>

        <button
          onClick={() => setActiveTab('bioage')}
          className={`px-3.5 py-2 rounded-[6px] transition-all whitespace-nowrap flex items-center gap-2 font-semibold ${
            activeTab === 'bioage'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:bg-white hover:text-[#0F172A]'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Biological Age</span>
        </button>

        <button
          onClick={() => setActiveTab('pace')}
          className={`px-3.5 py-2 rounded-[6px] transition-all whitespace-nowrap flex items-center gap-2 font-semibold ${
            activeTab === 'pace'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:bg-white hover:text-[#0F172A]'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Pace of Aging</span>
        </button>

        <button
          onClick={() => setActiveTab('risk')}
          className={`px-3.5 py-2 rounded-[6px] transition-all whitespace-nowrap flex items-center gap-2 font-semibold ${
            activeTab === 'risk'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:bg-white hover:text-[#0F172A]'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Disease Risk</span>
        </button>

        <button
          onClick={() => setActiveTab('domains')}
          className={`px-3.5 py-2 rounded-[6px] transition-all whitespace-nowrap flex items-center gap-2 font-semibold ${
            activeTab === 'domains'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:bg-white hover:text-[#0F172A]'
          }`}
        >
          <HeartPulse className="w-3.5 h-3.5" />
          <span>Health Domains</span>
        </button>

        <button
          onClick={() => setActiveTab('correlation')}
          className={`px-3.5 py-2 rounded-[6px] transition-all whitespace-nowrap flex items-center gap-2 font-semibold ${
            activeTab === 'correlation'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:bg-white hover:text-[#0F172A]'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Correlation Engine</span>
        </button>
      </div>

      {/* Screen Render Container */}
      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] p-6 shadow-inner">
        
        {/* TAB 1: DIGITAL TWIN */}
        {activeTab === 'twin' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#E2E8F0] pb-4">
              <div>
                <span className="eyebrow text-[#2563EB]">PREDICTIVE SIMULATION</span>
                <h4 className="font-display font-bold text-xl text-[#0F172A]">High-Fidelity Patient Digital Twin</h4>
              </div>
              <div className="font-mono text-xs text-[#059669] bg-[#ECFDF5] px-3 py-1 rounded border border-[#A7F3D0] font-semibold">
                Simulation Accuracy: 98.4%
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[6px] shadow-sm">
                <div className="text-[#64748B] text-[10px] uppercase mb-1">Chronological Horizon</div>
                <div className="text-2xl text-[#0F172A] font-bold">36 Months</div>
                <p className="text-[11px] text-[#475569] mt-2 font-body">Projected cellular state under baseline diet & exercise profile.</p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[6px] shadow-sm">
                <div className="text-[#64748B] text-[10px] uppercase mb-1">Metabolic Vector</div>
                <div className="text-2xl text-[#059669] font-bold">+14.2% Optimization</div>
                <p className="text-[11px] text-[#475569] mt-2 font-body">With active glucose stabilization & resistance protocol.</p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[6px] shadow-sm">
                <div className="text-[#64748B] text-[10px] uppercase mb-1">Cardiovascular Trajectory</div>
                <div className="text-2xl text-[#D97706] font-bold">ApoB Shift (+8 mg/dL)</div>
                <p className="text-[11px] text-[#475569] mt-2 font-body">Outlier alert triggered for Q4 review if lipid intake unadjusted.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BIOLOGICAL AGE */}
        {activeTab === 'bioage' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-4">
              <div>
                <span className="eyebrow text-[#059669]">BIOMARKER PHENOTYPE</span>
                <h4 className="font-display font-bold text-xl text-[#0F172A]">Biological Age vs Chronological Baseline</h4>
              </div>
              <div className="font-mono text-xs text-[#64748B]">Subject ID: #360-AE</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[6px] text-center flex flex-col items-center shadow-sm">
                <div className="text-xs font-mono text-[#64748B] uppercase mb-1">CHRONOLOGICAL vs BIOLOGICAL</div>
                <div className="flex items-baseline gap-2 sm:gap-3 my-2 font-mono flex-wrap justify-center">
                  <span className="text-2xl sm:text-4xl text-[#94A3B8] line-through font-semibold">42.0 yrs</span>
                  <span className="text-3xl sm:text-5xl text-[#059669] font-bold">36.4 yrs</span>
                </div>
                <div className="text-xs font-mono text-[#059669] bg-[#ECFDF5] px-3 py-1 rounded border border-[#A7F3D0] font-semibold">
                  -5.6 Years Younger Phenotype
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between p-3 bg-white border border-[#E2E8F0] rounded shadow-sm">
                  <span className="text-[#475569]">hs-CRP (Inflammation)</span>
                  <span className="text-[#059669] font-semibold">0.4 mg/L (Optimal)</span>
                </div>
                <div className="flex justify-between p-3 bg-white border border-[#E2E8F0] rounded shadow-sm">
                  <span className="text-[#475569]">HbA1c (Glycation)</span>
                  <span className="text-[#059669] font-semibold">5.1% (Optimal)</span>
                </div>
                <div className="flex justify-between p-3 bg-white border border-[#E2E8F0] rounded shadow-sm">
                  <span className="text-[#475569]">eGFR (Kidney Function)</span>
                  <span className="text-[#059669] font-semibold">108 mL/min (Optimal)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PACE OF AGING */}
        {activeTab === 'pace' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-4">
              <div>
                <span className="eyebrow text-[#D97706]">SYSTEMIC VELOCITY</span>
                <h4 className="font-display font-bold text-xl text-[#0F172A]">Pace of Aging Meter</h4>
              </div>
              <div className="font-mono text-xs text-[#059669]">DunedinPACE Equivalent</div>
            </div>

            <div className="p-6 bg-white border border-[#E2E8F0] rounded-[6px] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="text-center md:text-left font-mono">
                <div className="text-xs text-[#64748B] uppercase">Current Aging Velocity</div>
                <div className="text-5xl text-[#0F172A] font-bold my-1">0.82×</div>
                <div className="text-xs text-[#059669] font-medium">Aging 0.82 biological years per 1 calendar year</div>
              </div>

              <div className="w-full md:w-2/3 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-[11px] text-[#64748B]">
                  <span>Slow (0.6x)</span>
                  <span className="text-[#059669] font-bold">Your Pace (0.82x)</span>
                  <span>Accelerated (1.4x)</span>
                </div>
                <div className="w-full h-3 bg-[#E2E8F0] rounded-full overflow-hidden relative">
                  <div className="h-full bg-gradient-to-r from-[#059669] via-[#2563EB] to-[#D97706]" style={{ width: '100%' }} />
                  <div className="absolute top-0 bottom-0 w-2.5 bg-[#0F172A] shadow-md -translate-x-1/2" style={{ left: '41%' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DISEASE RISK */}
        {activeTab === 'risk' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-4">
              <div>
                <span className="eyebrow text-[#D97706]">LONGITUDINAL RISK MODEL</span>
                <h4 className="font-display font-bold text-xl text-[#0F172A]">Multi-System Disease Trajectory</h4>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 bg-white border border-[#A7F3D0] rounded shadow-sm">
                <div className="text-[#059669] text-[10px] uppercase font-bold">Metabolic Risk</div>
                <div className="text-2xl text-[#0F172A] font-bold my-1">Low (3.1%)</div>
                <p className="text-[11px] font-body text-[#475569]">Insulin sensitivity and fasting trig/HDL ratio optimal.</p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded shadow-sm">
                <div className="text-[#64748B] text-[10px] uppercase font-bold">Cardiovascular 10-Yr</div>
                <div className="text-2xl text-[#0F172A] font-bold my-1">Moderate (5.8%)</div>
                <p className="text-[11px] font-body text-[#475569]">ApoB & LP(a) baseline monitoring recommended.</p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded shadow-sm">
                <div className="text-[#64748B] text-[10px] uppercase font-bold">Cellular Senescence</div>
                <div className="text-2xl text-[#0F172A] font-bold my-1">Low (2.4%)</div>
                <p className="text-[11px] font-body text-[#475569]">NAD+ precursor response stable across panels.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: HEALTH DOMAIN SCORING */}
        {activeTab === 'domains' && (
          <div className="space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
              <span className="eyebrow text-[#2563EB]">8 SYSTEMIC DOMAINS</span>
              <span className="text-[#0F172A] font-semibold">Overall Biomarker Score: 88/100</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'Metabolic', score: '92/100', status: 'Optimal' },
                { name: 'Cardiovascular', score: '84/100', status: 'In Range' },
                { name: 'Inflammatory', score: '95/100', status: 'Optimal' },
                { name: 'Hormonal', score: '78/100', status: 'Attention' },
                { name: 'Renal & Liver', score: '96/100', status: 'Optimal' },
                { name: 'Nutritional', score: '82/100', status: 'In Range' },
                { name: 'Immune Vector', score: '90/100', status: 'Optimal' },
                { name: 'Sleep & HRV', score: '74/100', status: 'Attention' }
              ].map((d, i) => (
                <div key={i} className="p-3 bg-white border border-[#E2E8F0] rounded shadow-sm">
                  <div className="text-[10px] text-[#64748B] uppercase">{d.name}</div>
                  <div className="text-lg text-[#0F172A] font-bold">{d.score}</div>
                  <div className={`text-[10px] font-bold ${d.status === 'Optimal' ? 'text-[#059669]' : d.status === 'Attention' ? 'text-[#D97706]' : 'text-[#64748B]'}`}>
                    {d.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: CORRELATION ENGINE */}
        {activeTab === 'correlation' && (
          <div className="space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
              <span className="eyebrow text-[#2563EB]">SILENT CROSS-SYSTEM CORRELATION ENGINE</span>
              <span className="text-[#059669] font-bold">Active Link Identified</span>
            </div>

            <div className="p-5 bg-white border border-[#BFDBFE] rounded-[6px] space-y-3 font-body text-xs shadow-sm">
              <div className="flex items-center gap-2 font-mono text-xs text-[#2563EB] font-bold">
                <Zap className="w-4 h-4 text-[#2563EB]" />
                <span>Correlation ID #CR-882: Sleep Recovery Decline → Fasting Glucose Spike</span>
              </div>
              <p className="text-[#475569] leading-relaxed">
                The engine detected that a 14% drop in deep sleep (Oura ring signal over 14 days) correlated with a 9 mg/dL elevation in morning fasting glucose on the subsequent lab panel.
              </p>
              <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded font-mono text-[11px] text-[#059669] font-semibold">
                Suggested Protocol Adjustment: 15-min post-dinner walk + Magnesium Glycinate 300mg before bedtime.
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
