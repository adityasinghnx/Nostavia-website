import React, { useState } from 'react';
import { Database, Cpu, Brain, LayoutGrid, CheckCircle2, ArrowRight } from 'lucide-react';
import { StatusPill } from './StatusPill';

export const ArchitectureDiagram: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(3);

  const layers = [
    {
      id: 4,
      tag: "L4 · DELIVERY SURFACES",
      title: "Delivery Layer & Integrations",
      icon: LayoutGrid,
      status: "Live" as const,
      color: "border-[#BFDBFE] bg-[#EFF6FF]",
      items: [
        "Intelligence SDK (iOS / Android / Web)",
        "Wearables SDK (Unified API)",
        "White-Label Mobile App (Branded)",
        "AI-Native Clinical Services",
        "Partner HIS / EHR Dashboards"
      ],
      description: "Embed continuous intelligence under your brand. Users experience your interface while Nostavia powers interpretation underneath."
    },
    {
      id: 3,
      tag: "L3 · INTELLIGENCE CORE",
      title: "Dual-Brain & Reasoning Engine",
      icon: Brain,
      status: "Live" as const,
      color: "border-[#A7F3D0] bg-emerald-400/15",
      items: [
        "Trajectory Engine & Predictive Simulation",
        "Biological Age & Pace of Aging Engine",
        "Whole-body Biomarker Correlation Core",
        "Adaptive Clinical Protocol Engine",
        "24/7 AI Health Concierge & Triage"
      ],
      description: "The core reasoning layer. Finds hidden links between sleep decline and fasting glucose, projects risk trajectories, and adapts protocols automatically."
    },
    {
      id: 2,
      tag: "L2 · DECODING ENGINES",
      title: "Biomarker Classification & Normalization",
      icon: Cpu,
      status: "Live" as const,
      color: "border-[#FDE68A] bg-amber-400/10",
      items: [
        "100+ Biomarker Range Classification (Optimal vs In-Range vs Outlier)",
        "Personalized Baseline Calibration",
        "Food Bio-Impact & Macro/Micro Models",
        "Wearable Signal De-Noising",
        "Longitudinal Trend Velocity Analysis"
      ],
      description: "Transforms isolated numbers into biological context using personalized baseline calibration instead of generic population lab reference ranges."
    },
    {
      id: 1,
      tag: "L1 · INGESTION",
      title: "Multi-Source Data Ingestion Rails",
      icon: Database,
      status: "Live" as const,
      color: "border-white/[0.08] bg-white/[0.03]",
      items: [
        "Native Lab PDF Parser (Digital Signatures)",
        "Apple HealthKit & Google Health Connect Pipeline",
        "Further Device Feeds (In Development)",
        "Food Photo & Barcode Scanning Engine",
        "Manual Diagnostic Panel Entry"
      ],
      description: "Ingests messy real-world health data, from signed PDFs to continuous 1Hz wearable pulse rates, and normalizes them into structured clinical entities."
    }
  ];

  return (
    <div className="w-full bg-white/[0.03] border border-white/[0.08] rounded-[12px] p-6 sm:p-8 shadow-card font-body">
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="eyebrow mb-1">THE NOSTAVIA ARCHITECTURE</div>
          <h3 className="font-display font-bold text-2xl text-white">
            Four Layers. One Un-Forkable Core.
          </h3>
        </div>
        <div className="text-xs font-mono text-white/55 flex items-center gap-2 bg-white/[0.03] px-3 py-1.5 rounded border border-white/[0.08]">
          <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
          <span>Interactive Architecture Stack</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Layer Stack Buttons */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {layers.map((layer) => {
            const Icon = layer.icon;
            const isSelected = activeLayer === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                onMouseEnter={() => setActiveLayer(layer.id)}
                className={`w-full text-left p-4 rounded-[8px] border transition-all relative group ${
                  isSelected
                    ? `${layer.color} border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-sm`
                    : 'bg-white/[0.03] border-white/[0.08] hover:border-white/25 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-[6px] ${isSelected ? 'bg-hos-yellow text-white shadow-sm' : 'bg-white/[0.03] text-white/60 border border-white/[0.08]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-hos-yellow font-bold tracking-wider">
                        {layer.tag}
                      </div>
                      <div className="font-display font-semibold text-base text-white">
                        {layer.title}
                      </div>
                    </div>
                  </div>
                  <StatusPill status={layer.status} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Layer Details Panel */}
        <div className="lg:col-span-5 bg-white/[0.03] border border-white/[0.08] rounded-[10px] p-6 flex flex-col justify-between min-h-[360px] shadow-sm">
          {(() => {
            const current = layers.find((l) => l.id === activeLayer) || layers[1];
            const Icon = current.icon;
            return (
              <>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-5 h-5 text-hos-yellow" />
                    <span className="font-mono text-xs text-hos-yellow font-bold uppercase tracking-wider">{current.tag}</span>
                  </div>
                  
                  <h4 className="font-display font-bold text-xl text-white mb-3">
                    {current.title}
                  </h4>

                  <p className="text-xs text-white/60 leading-relaxed mb-6">
                    {current.description}
                  </p>

                  <div className="eyebrow text-white/55 mb-3">KEY COMPONENTS INCLUDED</div>
                  <div className="flex flex-col gap-2 font-mono text-xs text-white">
                    {current.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5" />
                        <span className="text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-white/55 font-mono">
                  <span>Integrates via Nostavia SDK</span>
                  <span className="text-hos-yellow flex items-center gap-1 font-semibold">
                    Explore API <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </>
            );
          })()}
        </div>

      </div>

    </div>
  );
};
