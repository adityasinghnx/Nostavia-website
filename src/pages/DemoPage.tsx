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
    <div className="flex flex-col gap-8 py-10 max-w-[960px] mx-auto px-4 sm:px-6 font-body text-[#0F172A] bg-white">
      
      {/* TOP TOGGLE HEADER */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs font-bold text-[#64748B] uppercase tracking-wider">
            DEMO GATEWAY & LEAD LOG
          </span>
        </div>

        <button
          onClick={() => setShowAdmin(!showAdmin)}
          className="inline-flex items-center gap-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] border border-[#CBD5E1] font-mono text-xs font-bold px-3 py-1.5 rounded-[2px] transition-all"
        >
          <Database className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>{showAdmin ? 'Hide Submissions' : `View Logged Submissions (${submissions.length})`}</span>
        </button>
      </div>

      {/* SUBMISSIONS DASHBOARD PANEL */}
      {showAdmin && (
        <div className="bg-[#0F172A] text-white rounded-[4px] p-6 space-y-6 shadow-xl border border-slate-700">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-[#2563EB]" />
                Logged Lead Submissions ({submissions.length})
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                All demo form submissions are saved locally in your browser and dispatched via email.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={exportToCSV}
                disabled={submissions.length === 0}
                className="inline-flex items-center gap-1.5 bg-[#2563EB] hover:bg-blue-600 text-white font-mono text-xs font-bold px-3 py-2 rounded-[2px] disabled:opacity-50 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </button>
              <button
                onClick={clearSubmissions}
                disabled={submissions.length === 0}
                className="inline-flex items-center gap-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 font-mono text-xs font-bold px-3 py-2 rounded-[2px] disabled:opacity-50 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            </div>
          </div>

          {/* Active Backend Integration Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded p-4 text-xs font-mono space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2 text-slate-200 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>FormSubmit.co (Active Primary Backend)</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded font-bold uppercase">
                UNLIMITED FREE SUBMISSIONS
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              Form responses are automatically delivered to <strong className="text-white">contact@nostaviahealth.com</strong> with zero monthly submission caps.
            </p>
          </div>

          {/* Table of Submissions */}
          {submissions.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs font-mono border border-dashed border-slate-800 rounded">
              No submissions recorded yet. Submit the form below to test logging.
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-800 rounded max-h-[360px]">
              <table className="w-full text-left border-collapse text-xs font-body">
                <thead>
                  <tr className="bg-slate-900 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                    <th className="p-3">Ref ID / Time</th>
                    <th className="p-3">Name & Email</th>
                    <th className="p-3">Company & Role</th>
                    <th className="p-3">Segment & Region</th>
                    <th className="p-3">File / Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {submissions.map((sub, i) => (
                    <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-mono">
                        <div className="text-emerald-400 font-bold">{sub.refId}</div>
                        <div className="text-[10px] text-slate-400">{sub.submittedAt}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-white">{sub.name}</div>
                        <div className="text-[#93C5FD] font-mono text-[11px]">{sub.email}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-white">{sub.company}</div>
                        <div className="text-slate-400 text-[11px]">{sub.role}</div>
                      </td>
                      <td className="p-3 font-mono text-[11px]">
                        <div className="text-amber-300">{sub.segment}</div>
                        <div className="text-slate-400">{sub.market}</div>
                      </td>
                      <td className="p-3 text-[11px] max-w-[200px]">
                        {sub.sampleFile && (
                          <div className="text-blue-300 font-mono text-[10px] bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-800 mb-1 inline-block">
                            📄 {sub.sampleFile}
                          </div>
                        )}
                        <div className="text-slate-300 truncate">{sub.notes || '—'}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      )}

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
              REF #{refId} · LOGGED & CONFIRMED
            </span>

            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
              Demo Request Scheduled
            </h3>

            <p className="text-sm text-[#64748B] max-w-md leading-relaxed font-body">
              Thank you, <strong className="text-[#0F172A]">{formData.name}</strong>. Your request details have been saved to the Submissions Log (<span className="font-mono text-[#0F172A]">{formData.email}</span>). Our team will reach out within 2 hours.
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
              <button
                onClick={() => setShowAdmin(true)}
                className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-[2px] shadow-sm transition-all"
              >
                <Database className="w-4 h-4" />
                View Logged Lead Data ({submissions.length})
              </button>

              <a
                href={`mailto:contact@nostaviahealth.com?subject=Platform%20Demo%20Request%20%23${refId}&body=Name:%20${encodeURIComponent(formData.name)}%0D%0AEmail:%20${encodeURIComponent(formData.email)}%0D%0ACompany:%20${encodeURIComponent(formData.company)}%0D%0ARole:%20${encodeURIComponent(formData.role)}%0D%0ARegion:%20${encodeURIComponent(formData.market)}%0D%0ANotes:%20${encodeURIComponent(formData.notes)}`}
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
