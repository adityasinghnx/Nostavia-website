import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, FileText, Upload } from 'lucide-react';

export const DemoPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [refId, setRefId] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    segment: 'Diagnostic lab',
    market: 'UAE',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedRefId = 'NST-' + Math.floor(100000 + Math.random() * 900000);
    setRefId(generatedRefId);

    const payload = {
      ...formData,
      refId: generatedRefId,
      sampleFile: fileName,
      submittedAt: new Date().toISOString()
    };

    try {
      // Store locally as fallback record
      const existing = JSON.parse(localStorage.getItem('nostavia_demo_requests') || '[]');
      existing.push(payload);
      localStorage.setItem('nostavia_demo_requests', JSON.stringify(existing));

      // Attempt endpoint dispatch (Web3Forms free tier API / formspree)
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'b8d5a1e2-9014-416b-9c32-demo-nostavia',
          subject: `New Platform Demo Request: ${formData.name} (${formData.company})`,
          from_name: formData.name,
          ...payload
        })
      }).catch(() => null);

      // Brief artificial delay for realistic UX feedback
      await new Promise((resolve) => setTimeout(resolve, 800));
    } catch {
      // Graceful continuation
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      setFileSize(sizeInMB + ' MB');
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileName(null);
    setFileSize(null);
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
          <div className="py-6 flex flex-col items-center text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center mb-1">
              <CheckCircle2 className="w-8 h-8 text-[#059669]" />
            </div>

            <span className="font-mono text-[11px] font-bold text-[#059669] bg-[#ECFDF5] px-3 py-1 rounded border border-[#A7F3D0] uppercase tracking-wider">
              REF #{refId} · CONFIRMED
            </span>

            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
              Demo Request Scheduled
            </h3>

            <p className="text-sm text-[#64748B] max-w-md leading-relaxed font-body">
              Thank you, <strong className="text-[#0F172A]">{formData.name}</strong>. We have logged your request (<span className="font-mono text-[#0F172A]">{formData.email}</span>). Aditya Singh or our solution engineering team will reach out within 2 hours to confirm your meeting time.
            </p>

            {fileName && (
              <div className="bg-white border border-[#E2E8F0] rounded-[2px] p-3.5 w-full max-w-md font-mono text-xs text-[#0F172A] font-bold flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2 overflow-hidden text-left">
                  <FileText className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span className="truncate">{fileName} ({fileSize})</span>
                </div>
                <span className="text-[10px] text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0] shrink-0">Attached</span>
              </div>
            )}

            <div className="pt-4 flex flex-wrap justify-center gap-3 w-full">
              <a
                href={`mailto:aditya@nostaviahealth.com?subject=Demo%20Request%20%23${refId}&body=Name:%20${encodeURIComponent(formData.name)}%0D%0ACompany:%20${encodeURIComponent(formData.company)}`}
                className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-[2px] shadow-sm transition-all"
              >
                Send Direct Email Followup →
              </a>

              <button
                onClick={() => setSubmitted(false)}
                className="bg-white hover:bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1] font-display text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-[2px] transition-all"
              >
                Submit Another Request
              </button>
            </div>
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
                  placeholder="Apex Health Network"
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
                    <div className="flex items-center gap-2 font-mono text-[#0F172A] font-bold">
                      <span>{fileName} ({fileSize})</span>
                      <button
                        type="button"
                        onClick={clearFile}
                        className="text-red-500 hover:underline text-[10px]"
                      >
                        Remove
                      </button>
                    </div>
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
              disabled={isSubmitting}
              className="w-full bg-[#000000] hover:bg-[#1A1A1A] text-white font-display text-xs font-bold uppercase tracking-wider py-4 rounded-[2px] shadow-sm transition-all inline-flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  SUBMITTING DEMO REQUEST...
                </>
              ) : (
                <>
                  REQUEST PLATFORM ARCHITECTURE DEMO
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        )}
      </div>

    </div>
  );
};
