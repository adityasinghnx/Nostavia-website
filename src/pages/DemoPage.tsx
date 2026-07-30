import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, FileText, Upload } from 'lucide-react';

export const DemoPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    segment: 'Diagnostic lab',
    market: 'UAE',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="flex flex-col gap-12 py-10 max-w-[800px] mx-auto px-4 sm:px-6 font-body text-[#0F172A] bg-white">
      
      {/* HEADER */}
      <div className="space-y-3 text-center">
        <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
          REQUEST PLATFORM DEMO
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight leading-[1.05]">
          See it on your own data.
        </h1>
        <p className="text-base text-[#64748B] max-w-xl mx-auto font-body leading-relaxed">
          A 30-minute walkthrough on live product, not slides. If you send a sample lab report in advance, we'll run it through the engine and show you the output on your own panel.
        </p>
      </div>

      {/* FORM OR SUCCESS STATE */}
      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] p-8 sm:p-12 shadow-none">
        {submitted ? (
          <div className="py-8 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A] mb-2">
              Demo Request Scheduled
            </h3>
            <p className="text-sm text-[#64748B] max-w-md leading-relaxed mb-6 font-body">
              Thank you, {formData.name}. We have logged your request ({formData.email}). Aditya Singh or our solution engineering team will confirm your meeting within 2 hours.
            </p>
            {fileName && (
              <div className="bg-white border border-[#E2E8F0] rounded-[2px] p-3.5 mb-6 font-mono text-xs text-[#0F172A] font-bold flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0F172A]" />
                <span>Sample panel "{fileName}" uploaded to sandbox engine.</span>
              </div>
            )}
            <button
              onClick={() => setSubmitted(false)}
              className="bg-[#0F172A] hover:bg-[#1E293B] text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-[2px]"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs font-body">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[#0F172A] mb-1.5 font-mono text-[11px] font-bold uppercase">NAME *</label>
                <input
                  required
                  type="text"
                  placeholder="Dr. Sarah Al-Mansoor"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-[#E2E8F0] focus:border-[#0F172A] rounded-[2px] px-4 py-3 text-[#0F172A] outline-none font-body text-sm"
                />
              </div>

              <div>
                <label className="block text-[#0F172A] mb-1.5 font-mono text-[11px] font-bold uppercase">WORK EMAIL *</label>
                <input
                  required
                  type="email"
                  placeholder="sarah@healthsystem.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-[#E2E8F0] focus:border-[#0F172A] rounded-[2px] px-4 py-3 text-[#0F172A] outline-none font-body text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[#0F172A] mb-1.5 font-mono text-[11px] font-bold uppercase">COMPANY *</label>
                <input
                  required
                  type="text"
                  placeholder="Live360° Health Network"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-white border border-[#E2E8F0] focus:border-[#0F172A] rounded-[2px] px-4 py-3 text-[#0F172A] outline-none font-body text-sm"
                />
              </div>

              <div>
                <label className="block text-[#0F172A] mb-1.5 font-mono text-[11px] font-bold uppercase">ROLE *</label>
                <input
                  required
                  type="text"
                  placeholder="Head of Digital Health / Medical Director"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-white border border-[#E2E8F0] focus:border-[#0F172A] rounded-[2px] px-4 py-3 text-[#0F172A] outline-none font-body text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[#0F172A] mb-1.5 font-mono text-[11px] font-bold uppercase">INDUSTRY SEGMENT *</label>
                <select
                  value={formData.segment}
                  onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                  className="w-full bg-white border border-[#E2E8F0] focus:border-[#0F172A] rounded-[2px] px-4 py-3 text-[#0F172A] outline-none font-body text-sm"
                >
                  <option value="Diagnostic lab">Diagnostic lab network</option>
                  <option value="Preventative clinic">Longevity & preventative clinic</option>
                  <option value="Hospital system">Hospital system</option>
                  <option value="Insurer / Payer">Health insurer / Payer</option>
                  <option value="Digital health app">Digital health platform</option>
                </select>
              </div>

              <div>
                <label className="block text-[#0F172A] mb-1.5 font-mono text-[11px] font-bold uppercase">PRIMARY REGION *</label>
                <select
                  value={formData.market}
                  onChange={(e) => setFormData({ ...formData, market: e.target.value })}
                  className="w-full bg-white border border-[#E2E8F0] focus:border-[#0F172A] rounded-[2px] px-4 py-3 text-[#0F172A] outline-none font-body text-sm"
                >
                  <option value="Global">Global / Multi-region</option>
                  <option value="UAE">UAE & GCC</option>
                  <option value="India">India</option>
                  <option value="US / EU">US / Europe</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#0F172A] mb-1.5 font-mono text-[11px] font-bold uppercase">OPTIONAL SAMPLE REPORT (PDF)</label>
              <div className="border border-dashed border-[#CBD5E1] bg-white rounded-[2px] p-4 text-center cursor-pointer hover:border-[#0F172A] transition-colors relative">
                <input
                  type="file"
                  accept=".pdf,.png,.jpg"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="flex flex-col items-center gap-1.5 text-xs text-[#64748B]">
                  <Upload className="w-5 h-5 text-[#0F172A]" />
                  {fileName ? (
                    <span className="font-mono text-[#0F172A] font-bold">{fileName}</span>
                  ) : (
                    <span>Drop a sample PDF or click to browse (De-identified sample)</span>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[#0F172A] mb-1.5 font-mono text-[11px] font-bold uppercase">WHAT ARE YOU BUILDING? (NOTES)</label>
              <textarea
                rows={3}
                placeholder="Tell us about your patient volume, existing app stack, or white-label requirements..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-white border border-[#E2E8F0] focus:border-[#0F172A] rounded-[2px] px-4 py-3 text-[#0F172A] outline-none font-body text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#000000] hover:bg-[#1A1A1A] text-white font-display text-xs font-bold uppercase tracking-wider py-4 rounded-[2px] shadow-sm transition-all inline-flex items-center justify-center gap-2 mt-2"
            >
              REQUEST PLATFORM ARCHITECTURE DEMO
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        )}
      </div>

    </div>
  );
};
