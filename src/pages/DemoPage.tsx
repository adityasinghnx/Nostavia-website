import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight, FileText, Upload, Database, Download, Trash2, Key } from 'lucide-react';

interface DemoRequest {
  refId: string;
  name: string;
  email: string;
  company: string;
  role: string;
  segment: string;
  market: string;
  notes: string;
  sampleFile?: string | null;
  submittedAt: string;
}

export const DemoPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [refId, setRefId] = useState<string>('');
  const [showAdmin, setShowAdmin] = useState(false);
  const [submissions, setSubmissions] = useState<DemoRequest[]>([]);
  const [web3Key, setWeb3Key] = useState<string>('');
  const [formspreeId, setFormspreeId] = useState<string>('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    segment: 'Diagnostic lab network',
    market: 'UAE & GCC',
    notes: ''
  });

  // Load submissions and API keys on mount
  useEffect(() => {
    loadSubmissions();
    const savedWeb3Key = localStorage.getItem('nostavia_web3forms_key') || '';
    const savedFormspree = localStorage.getItem('nostavia_formspree_id') || '';
    setWeb3Key(savedWeb3Key);
    setFormspreeId(savedFormspree);
  }, []);

  const loadSubmissions = () => {
    try {
      const existing = JSON.parse(localStorage.getItem('nostavia_demo_requests') || '[]');
      setSubmissions(existing);
    } catch {
      setSubmissions([]);
    }
  };

  const handleSaveWeb3Key = (key: string) => {
    setWeb3Key(key);
    localStorage.setItem('nostavia_web3forms_key', key);
  };

  const handleSaveFormspreeId = (id: string) => {
    setFormspreeId(id);
    localStorage.setItem('nostavia_formspree_id', id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedRefId = 'NST-' + Math.floor(100000 + Math.random() * 900000);
    setRefId(generatedRefId);

    const payload: DemoRequest = {
      ...formData,
      refId: generatedRefId,
      sampleFile: fileName,
      submittedAt: new Date().toLocaleString()
    };

    try {
      // 1. Store in browser localStorage
      const existing = JSON.parse(localStorage.getItem('nostavia_demo_requests') || '[]');
      const updated = [payload, ...existing];
      localStorage.setItem('nostavia_demo_requests', JSON.stringify(updated));
      setSubmissions(updated);

      // 2. Dispatch directly to user's Formspree endpoint (https://formspree.io/f/xbdnezwz)
      const customFormspreeId = localStorage.getItem('nostavia_formspree_id')?.trim();
      const formspreeEndpoint = customFormspreeId
        ? (customFormspreeId.startsWith('http') ? customFormspreeId : `https://formspree.io/f/${customFormspreeId}`)
        : 'https://formspree.io/f/xbdnezwz';

      await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);

      // Dual backup dispatch to FormSubmit.co
      await fetch('https://formsubmit.co/ajax/contact@nostaviahealth.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `NEW NOSTAVIA DEMO REQUEST [${generatedRefId}]: ${formData.name} - ${formData.company}`,
          _template: 'table',
          _captcha: 'false',
          name: formData.name,
          email: formData.email,
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
      // Fallback continuation
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

  const exportToCSV = () => {
    if (submissions.length === 0) return;
    const headers = ['Ref ID', 'Date', 'Name', 'Email', 'Company', 'Role', 'Segment', 'Region', 'File', 'Notes'];
    const rows = submissions.map(s => [
      s.refId,
      s.submittedAt,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${s.company.replace(/"/g, '""')}"`,
      `"${s.role.replace(/"/g, '""')}"`,
      `"${s.segment.replace(/"/g, '""')}"`,
      `"${s.market.replace(/"/g, '""')}"`,
      `"${(s.sampleFile || '').replace(/"/g, '""')}"`,
      `"${(s.notes || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nostavia_demo_requests_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearSubmissions = () => {
    if (window.confirm('Are you sure you want to clear all logged submissions?')) {
      localStorage.removeItem('nostavia_demo_requests');
      setSubmissions([]);
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
                href={`mailto:contact@nostaviahealth.com,aditya@nostaviacorp.com?subject=${encodeURIComponent(`Platform Demo Request [${refId}]: ${formData.name} - ${formData.company}`)}&body=${encodeURIComponent(`Hi Aditya & Nostavia Team,\n\nI am following up on my demo request (#${refId}).\n\nRequest Details:\n- Name: ${formData.name}\n- Work Email: ${formData.email}\n- Company: ${formData.company}\n- Role: ${formData.role}\n- Region: ${formData.market}\n- Notes: ${formData.notes || 'N/A'}\n\nLooking forward to scheduling our 30-minute walkthrough.`)}`}
                className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-[2px] shadow-sm transition-all cursor-pointer"
              >
                SEND DIRECT EMAIL FOLLOWUP →
              </a>

              <button
                onClick={() => setSubmitted(false)}
                className="bg-white hover:bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1] font-display text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-[2px] transition-all cursor-pointer"
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
                  <option value="Diagnostic lab network">Diagnostic lab network</option>
                  <option value="Longevity & preventative clinic">Longevity & preventative clinic</option>
                  <option value="Hospital system">Hospital system</option>
                  <option value="Health insurer / Payer">Health insurer / Payer</option>
                  <option value="Digital health platform">Digital health platform</option>
                </select>
              </div>

              <div>
                <label className="block text-[#0F172A] mb-1.5 font-mono text-[11px] font-bold uppercase">PRIMARY REGION *</label>
                <select
                  value={formData.market}
                  onChange={(e) => setFormData({ ...formData, market: e.target.value })}
                  className="w-full bg-white border border-[#E2E8F0] focus:border-[#0F172A] rounded-[2px] px-4 py-3 text-[#0F172A] outline-none font-body text-sm"
                >
                  <option value="Global / Multi-region">Global / Multi-region</option>
                  <option value="UAE & GCC">UAE & GCC</option>
                  <option value="India">India</option>
                  <option value="US / Europe">US / Europe</option>
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
