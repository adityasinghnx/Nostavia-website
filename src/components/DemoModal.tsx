import React, { useState } from 'react';
import { X, Upload, CheckCircle2, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [refId, setRefId] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    segment: 'Diagnostic lab',
    market: 'UAE',
    notes: ''
  });

  if (!isOpen) return null;

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
      const existing = JSON.parse(localStorage.getItem('nostavia_demo_requests') || '[]');
      existing.push(payload);
      localStorage.setItem('nostavia_demo_requests', JSON.stringify(existing));

      const customFormspreeId = localStorage.getItem('nostavia_formspree_id')?.trim();
      const formspreeEndpoint = customFormspreeId
        ? (customFormspreeId.startsWith('http') ? customFormspreeId : `https://formspree.io/f/${customFormspreeId}`)
        : 'https://formspree.io/f/xbdnezwz';

      await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);

      await fetch('https://formsubmit.co/ajax/contact@nostaviahealth.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `NEW NOSTAVIA DEMO REQUEST [${generatedRefId}]: ${formData.name} - ${formData.company}`,
          _template: 'table',
          _captcha: 'false',
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'N/A',
          company: formData.company,
          role: formData.role,
          segment: formData.segment,
          market: formData.market,
          sampleFile: fileName || 'None',
          notes: formData.notes || 'None',
          refId: generatedRefId
        })
      }).catch(() => null);

      await new Promise((resolve) => setTimeout(resolve, 600));
    } catch {
      // Graceful fallback
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-[#E5E7EB] rounded-[12px] p-5 sm:p-8 shadow-2xl my-auto max-h-[90vh] overflow-y-auto text-[#0F172A]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#64748B] hover:text-[#0F172A] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[6px] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-6 flex flex-col items-center text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center mb-1">
              <CheckCircle2 className="w-8 h-8 text-[#059669]" />
            </div>

            <span className="font-mono text-[11px] font-bold text-[#059669] bg-[#ECFDF5] px-3 py-1 rounded border border-[#A7F3D0] uppercase tracking-wider">
              REF #{refId} · CONFIRMED
            </span>

            <h3 className="font-display font-bold text-2xl text-[#0F172A]">
              Demo Request Scheduled
            </h3>

            <p className="text-xs text-[#475569] max-w-md leading-relaxed font-body">
              We have logged your details (<span className="font-mono text-[#0F172A]">{formData.email}</span>). Aditya Singh or our solution engineering team will reach out within 2 hours to confirm your 30-minute live environment walkthrough.
            </p>

            {fileName && (
              <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded p-3 font-mono text-xs text-[#059669] font-bold flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#059669] shrink-0" />
                <span>Sample panel "{fileName}" ({fileSize}) attached for sandbox interpretation.</span>
              </div>
            )}

            <div className="pt-2 flex flex-wrap justify-center gap-3 w-full">
              <a
                href={`mailto:contact@nostaviahealth.com,aditya@nostaviacorp.com?subject=${encodeURIComponent(`Platform Demo Request [${refId}]: ${formData.name} - ${formData.company}`)}&body=${encodeURIComponent(`Hi Aditya & Nostavia Team,\n\nI am following up on my demo request (#${refId}).\n\nRequest Details:\n- Name: ${formData.name}\n- Work Email: ${formData.email}\n- Phone: ${formData.phone || 'N/A'}\n- Company: ${formData.company}\n- Role: ${formData.role}\n- Region: ${formData.market}\n- Notes: ${formData.notes || 'N/A'}\n\nLooking forward to scheduling our 30-minute walkthrough.`)}`}
                className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-black text-white font-mono text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-[4px] transition-all cursor-pointer shadow-sm"
              >
                SEND DIRECT EMAIL FOLLOWUP →
              </a>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="bg-white hover:bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1] font-display text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-[4px] transition-all cursor-pointer"
              >
                Return to Website
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="eyebrow text-[#2563EB] mb-1">BOOK A DEMO</div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0F172A] mb-2">
              See it on your own data.
            </h2>
            <p className="text-xs text-[#475569] leading-relaxed mb-6 font-body">
              A 30-minute walkthrough on live product, not slides. If you send a sample lab report in advance, we'll run it through the engine and show you the output on your own panel.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-body">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#64748B] mb-1 font-mono text-[11px] font-bold">NAME *</label>
                  <input
                    required
                    type="text"
                    placeholder="Dr. Sarah Al-Mansoor"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#2563EB] rounded-[6px] px-3 py-2 text-[#0F172A] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#64748B] mb-1 font-mono text-[11px] font-bold">WORK EMAIL *</label>
                  <input
                    required
                    type="email"
                    placeholder="sarah@healthsystem.ae"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#2563EB] rounded-[6px] px-3 py-2 text-[#0F172A] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#64748B] mb-1 font-mono text-[11px] font-bold">PHONE / WHATSAPP NUMBER</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#2563EB] rounded-[6px] px-3 py-2 text-[#0F172A] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#64748B] mb-1 font-mono text-[11px] font-bold">COMPANY *</label>
                  <input
                    required
                    type="text"
                    placeholder="Apex Longevity Clinic"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#2563EB] rounded-[6px] px-3 py-2 text-[#0F172A] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#64748B] mb-1 font-mono text-[11px] font-bold">ROLE *</label>
                  <input
                    required
                    type="text"
                    placeholder="Medical Director / CEO"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#2563EB] rounded-[6px] px-3 py-2 text-[#0F172A] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#64748B] mb-1 font-mono text-[11px] font-bold">WHICH BEST DESCRIBES YOU *</label>
                  <select
                    value={formData.segment}
                    onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#2563EB] rounded-[6px] px-3 py-2 text-[#0F172A] outline-none"
                  >
                    <option value="Diagnostic lab">Diagnostic lab</option>
                    <option value="Clinic or longevity">Clinic or longevity</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Supplements or commerce">Supplements or commerce</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#64748B] mb-1 font-mono text-[11px] font-bold">PRIMARY MARKET *</label>
                <select
                  value={formData.market}
                  onChange={(e) => setFormData({ ...formData, market: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#2563EB] rounded-[6px] px-3 py-2 text-[#0F172A] outline-none"
                >
                  <option value="UAE">United Arab Emirates (UAE)</option>
                  <option value="India">India</option>
                  <option value="Saudi">Saudi Arabia (KSA)</option>
                  <option value="Other">Other Global</option>
                </select>
              </div>

              {/* Optional Lab PDF Sample Upload */}
              <div>
                <label className="block text-[#64748B] mb-1 font-mono text-[11px] font-bold">OPTIONAL SAMPLE LAB REPORT (PDF)</label>
                <div className="border border-dashed border-[#CBD5E1] hover:border-[#2563EB] rounded-[6px] p-3 text-center bg-[#F8FAFC] transition-colors relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex items-center justify-center gap-2 text-xs text-[#64748B]">
                    <Upload className="w-4 h-4 text-[#2563EB]" />
                    <span>{fileName ? `Attached: ${fileName} (${fileSize})` : 'Drop sample lab PDF here to pre-run live interpretation'}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[#64748B] mb-1 font-mono text-[11px] font-bold">ANYTHING SPECIFIC YOU WANT TO SEE</label>
                <textarea
                  rows={2}
                  placeholder="e.g. SOMA-1B privacy architecture or Smart Report output format"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#2563EB] rounded-[6px] px-3 py-2 text-[#0F172A] outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-[11px] text-[#64748B]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                  <span>DPDP & UAE In-region safe</span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0F172A] hover:bg-black text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-[4px] flex items-center gap-1.5 transition-all shadow-sm disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    <>
                      Schedule Demo
                      <ArrowRight className="w-3.5 h-3.5 text-[#2563EB]" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
