import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, ArrowRight, Stethoscope } from 'lucide-react';

export const ClinicalPage: React.FC = () => {
  const bench = [
    {
      name: "Dr. Sparsh Sehdev",
      role: "Clinical Lead",
      credentials: "MBBS, GMC-registered (UK)",
      experience: "11,000+ patients treated across emergency & preventive medicine.",
      highlight: "Clinical protocol validation"
    },
    {
      name: "Aakanksha Pant PhD",
      role: "Chief Longevity Officer",
      credentials: "PhD Longevity Science, Senior Scientist IISc Bangalore",
      experience: "Pioneer in biological age biomarker models and cellular senescence.",
      highlight: "Biomarker classification engine"
    },
    {
      name: "Dr. Vivek Rai",
      role: "Clinical Pharmacology Lead",
      credentials: "MBBS, MD Pharmacology",
      experience: "Principal Investigator for Phase II & III clinical trials.",
      highlight: "Drug-nutrient interaction models"
    },
    {
      name: "Sharwani Walke",
      role: "Chief Nutrition Officer",
      credentials: "MSc Clinical Nutrition, University College London (UCL)",
      experience: "Specialist in metabolic nutrition and gut microbiome protocols.",
      highlight: "Food bio-impact & macro models"
    },
    {
      name: "Dr. Akshita Gupta",
      role: "Clinical Reviewer",
      credentials: "MBBS",
      experience: "Focus on preventative health screening & patient risk stratification.",
      highlight: "Diagnostic panel interpretation"
    },
    {
      name: "Anmol Udhad",
      role: "Performance & Strategy Lead",
      credentials: "ISSA Sports Nutritionist, MBA (Formerly Bain & Company)",
      experience: "Specialized in metabolic performance and scaling health tech operations.",
      highlight: "Performance protocol optimization"
    },
    {
      name: "Dr. Dipa Patle",
      role: "Head of Ayurvedic Department",
      credentials: "BAMS (Bachelor of Ayurvedic Medicine & Surgery)",
      experience: "Integrated metabolic wellness and botanical formulation research.",
      highlight: "Botanical & integrative protocols"
    }
  ];

  return (
    <div className="flex flex-col gap-16 py-10 max-w-[1280px] mx-auto px-4 sm:px-6 font-body text-[#0F172A] bg-white">
      
      {/* HEADER HERO */}
      <div className="space-y-4 max-w-4xl">
        <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
          CLINICAL GOVERNANCE & MEDICAL BOARD
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-[#0F172A] tracking-tight leading-[1.05]">
          Protocol outputs are validated by licensed clinicians before they ship to any partner.
        </h1>
        <p className="text-base sm:text-xl text-[#64748B] max-w-3xl leading-relaxed font-body">
          Nostavia operates under strict clinical oversight. Every algorithmic recommendation, smart report output, and risk flag is backed by our seven-member clinical advisory bench.
        </p>
      </div>

      {/* BENCH GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bench.map((member, i) => (
          <div key={i} className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="font-mono text-xs text-[#64748B] font-bold uppercase tracking-wider">{member.role}</div>
              <div>
                <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">{member.name}</h3>
                <div className="font-mono text-xs text-[#64748B] mt-0.5">{member.credentials}</div>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed font-body">
                {member.experience}
              </p>
            </div>
            <div className="pt-3 border-t border-[#E2E8F0] font-mono text-xs text-[#64748B]">
              Domain: <span className="text-[#0F172A] font-bold">{member.highlight}</span>
            </div>
          </div>
        ))}
      </div>

      {/* HONEST DISCLOSURE OF VALIDATED VS MODELLED CLAIMS */}
      <section className="p-8 sm:p-12 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-6">
        <div className="space-y-2">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            TRANSPARENT VALIDATION STATUS
          </div>
          <h2 className="font-display font-extrabold text-3xl text-[#0F172A]">
            What is Validated vs Modelled Today
          </h2>
          <p className="text-xs text-[#64748B] font-body">
            Explicitly distinguishing validated outputs from algorithmically modelled trajectories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-6 bg-white border border-[#E2E8F0] rounded-[2px] space-y-3 shadow-none">
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>CLINICALLY VALIDATED</span>
            </div>
            <p className="text-xs font-body text-[#64748B] leading-relaxed">
              100+ Biomarker Range Classifications, Smart Report Output Text, Metabolic Intake Briefs, and Drug-Nutrient Depletion Flags.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E2E8F0] rounded-[2px] space-y-3 shadow-none">
            <div className="flex items-center gap-2 text-blue-700 font-bold">
              <Stethoscope className="w-4 h-4" />
              <span>ALGORITHMICALLY MODELLED</span>
            </div>
            <p className="text-xs font-body text-[#64748B] leading-relaxed">
              Biological Age Phenotype, Pace of Aging DunedinPACE proxy, 10-Year Cardiovascular Trajectory, and Wearable De-noising.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E2E8F0] rounded-[2px] space-y-3 shadow-none">
            <div className="flex items-center gap-2 text-amber-700 font-bold">
              <AlertCircle className="w-4 h-4" />
              <span>IN ACTIVE CLINICAL TRIAL</span>
            </div>
            <p className="text-xs font-body text-[#64748B] leading-relaxed">
              SOMA-1B On-Device Autonomous Triage & Multi-year Whole-Body Correlation Engine (Pilot trials running with Apex Diagnostics).
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <div className="p-12 sm:p-16 lg:p-20 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 max-w-2xl text-center md:text-left">
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            Request Clinical Advisory Specifications & Governance Protocol
          </h3>
          <p className="text-sm text-slate-300 font-body leading-relaxed">
            Review detailed clinical validation methodology with our medical directors.
          </p>
        </div>

        <Link
          to="/demo"
          className="bg-white hover:bg-slate-100 text-[#0F172A] font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] shadow-md transition-all inline-flex items-center gap-2 shrink-0"
        >
          Request Clinical Spec
          <ArrowRight className="w-4 h-4 text-[#0F172A]" />
        </Link>
      </div>

    </div>
  );
};
