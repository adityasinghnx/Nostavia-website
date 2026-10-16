import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, CheckCircle2, ChevronDown, Clock, FileText, Mail, ShieldCheck, Stethoscope, Upload } from 'lucide-react';
import { Container, Eyebrow, focusRing } from '../components/home/shared';
import { Reveal } from '../components/home/motion';
import { InfrastructureGroup } from '../components/trust/TrustElements';
import { TRUST_CONTACT, trustPick } from '../content/trust.config';
import { useSeo } from '../lib/useSeo';

interface DemoRequest {
  refId: string;
  name: string;
  email: string;
  phone?: string;
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
    phone: '',
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
      // Fallback continuation
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        window.location.href = 'https://calendar.app.google/cysR8LF2gMtuneNs9';
      }, 500);
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
    const headers = ['Ref ID', 'Date', 'Name', 'Email', 'Phone', 'Company', 'Role', 'Segment', 'Region', 'File', 'Notes'];
    const rows = submissions.map(s => [
      s.refId,
      s.submittedAt,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${(s.phone || '').replace(/"/g, '""')}"`,
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

  useSeo({
    title: 'Request a Demo | Nostavia Health',
    description:
      'Book a 30-minute Nostavia demo on live product, not slides. Send a de-identified sample lab report in advance and see the output on your own panel.',
    path: '/demo',
  });

  /* Dark field styles. Field attributes, values and handlers are unchanged. */
  const labelCls = 'block mb-2 text-xs font-semibold text-white/70';
  const fieldCls =
    'w-full bg-white/[0.04] border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-transparent focus:ring-2 focus:ring-hos-yellow';
  const req = (
    <span aria-hidden="true" className="text-hos-yellow">
      *
    </span>
  );
  const infoHeading = 'text-[11px] font-semibold uppercase tracking-[0.16em] text-hos-yellow';

  return (
    <div className="relative flex flex-col text-white bg-ink-950 overflow-x-clip">
      <section aria-labelledby="demo-heading" className="relative -mt-16 pt-24 sm:pt-32 pb-24 sm:pb-32">
        <div aria-hidden="true" className="absolute inset-0 dk-grid dk-fade-mask" />
        <div aria-hidden="true" className="absolute left-0 -top-48 w-[1000px] max-w-[160vw] h-[620px] bg-[radial-gradient(closest-side,rgba(245,217,123,0.13),transparent)]" />

        <Container className="relative grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-10">
          {/* Intro */}
          <Reveal className="lg:col-span-5 lg:col-start-1 lg:row-start-1 space-y-6">
            <Eyebrow>Request a demo</Eyebrow>
            <h1 id="demo-heading" className="font-display font-semibold text-4xl sm:text-6xl tracking-[-0.03em] leading-[1.04] dk-text-gradient pb-1">
              See it on your <span className="dk-text-sun">own data.</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
              A 30-minute walkthrough on live product, not slides. If you send a sample lab report in advance, we'll run it through the engine and show you the output on your own panel.
            </p>
          </Reveal>

          {/* Form or success state */}
          <Reveal delay={120} className="lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:row-span-2">
            <div className="lg:sticky lg:top-24 rounded-[24px] dk-card p-5 sm:p-8 shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9)]">
              {submitted ? (
                <div className="py-4 flex flex-col items-center text-center gap-4">
                  <span className="w-14 h-14 rounded-full bg-emerald-400/10 ring-1 ring-emerald-300/30 flex items-center justify-center">
                    <CheckCircle2 aria-hidden="true" className="w-7 h-7 text-emerald-300" />
                  </span>

                  <span className="font-mono text-[11px] font-semibold text-emerald-300 bg-emerald-400/10 ring-1 ring-emerald-300/30 px-3 py-1 rounded-full uppercase tracking-wider">
                    Ref #{refId} · Confirmed
                  </span>

                  <h2 className="text-2xl font-semibold text-white">Request received</h2>

                  <p className="text-sm text-white/60 max-w-md leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. We have logged your request (<span className="font-mono text-white">{formData.email}</span>). Aditya Singh or our solutions team will confirm your meeting time.
                  </p>

                  {fileName && (
                    <div className="w-full max-w-md rounded-xl bg-white/[0.04] ring-1 ring-white/10 p-3.5 flex items-center justify-between gap-3 text-xs text-white">
                      <span className="flex items-center gap-2 min-w-0 text-left">
                        <FileText aria-hidden="true" className="w-4 h-4 text-hos-yellow shrink-0" />
                        <span className="truncate min-w-0 font-mono">
                          {fileName} ({fileSize})
                        </span>
                      </span>
                      <span className="shrink-0 text-[10px] font-semibold text-emerald-300 bg-emerald-400/10 px-2 py-0.5 rounded-full">Attached</span>
                    </div>
                  )}

                  <div className="w-full max-w-md rounded-2xl bg-white/[0.04] ring-1 ring-white/10 p-4 space-y-3">
                    <p className="text-xs text-white/60">Redirecting you to Google Calendar to pick your demo slot...</p>
                    <a
                      href="https://calendar.app.google/cysR8LF2gMtuneNs9"
                      className={`w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-hos-yellow text-ink-950 text-sm font-semibold px-6 py-3.5 rounded-full transition-colors ${focusRing}`}
                    >
                      <Calendar aria-hidden="true" className="w-4 h-4" />
                      Pick a time on Google Calendar
                    </a>
                  </div>

                  <div className="pt-2 flex flex-wrap justify-center gap-3 w-full">
                    <a
                      href={`mailto:contact@nostaviahealth.com,aditya@nostaviacorp.com?subject=${encodeURIComponent(`Platform Demo Request [${refId}]: ${formData.name} - ${formData.company}`)}&body=${encodeURIComponent(`Hi Aditya & Nostavia Team,\n\nI am following up on my demo request (#${refId}).\n\nRequest Details:\n- Name: ${formData.name}\n- Work Email: ${formData.email}\n- Phone: ${formData.phone || 'N/A'}\n- Company: ${formData.company}\n- Role: ${formData.role}\n- Region: ${formData.market}\n- Notes: ${formData.notes || 'N/A'}\n\nLooking forward to scheduling our 30-minute walkthrough.`)}`}
                      className={`inline-flex items-center justify-center gap-2 dk-card hover:border-white/25 text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors ${focusRing}`}
                    >
                      <Mail aria-hidden="true" className="w-4 h-4" />
                      Send a follow-up email
                    </a>

                    <button
                      onClick={() => setSubmitted(false)}
                      className={`inline-flex items-center justify-center gap-2 dk-card hover:border-white/25 text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors ${focusRing}`}
                    >
                      Submit another request
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Book your demo</h2>
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/60">
                      <Clock aria-hidden="true" className="w-3.5 h-3.5 text-hos-yellow" />
                      30 minutes · live product
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <label className="block">
                        <span className={labelCls}>Name {req}</span>
                        <input
                          required
                          type="text"
                          placeholder="Dr. Sarah Al-Mansoor"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={fieldCls}
                        />
                      </label>

                      <label className="block">
                        <span className={labelCls}>Work email {req}</span>
                        <input
                          required
                          type="email"
                          placeholder="sarah@healthsystem.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={fieldCls}
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <label className="block">
                        <span className={labelCls}>Phone {req}</span>
                        <input
                          required
                          type="tel"
                          placeholder="Enter your phone or WhatsApp number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={fieldCls}
                        />
                      </label>

                      <label className="block">
                        <span className={labelCls}>Company {req}</span>
                        <input
                          required
                          type="text"
                          placeholder="Apex Health Network"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className={fieldCls}
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <label className="block">
                        <span className={labelCls}>Role {req}</span>
                        <input
                          required
                          type="text"
                          placeholder="Head of Digital Health / Medical Director"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className={fieldCls}
                        />
                      </label>

                      <label className="block">
                        <span className={labelCls}>Industry segment {req}</span>
                        <span className="relative block">
                          <select
                            value={formData.segment}
                            onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                            className={`${fieldCls} appearance-none pr-10 cursor-pointer [color-scheme:dark]`}
                          >
                            <option value="Diagnostic lab network">Diagnostic lab network</option>
                            <option value="Longevity & preventative clinic">Longevity & preventative clinic</option>
                            <option value="Hospital system">Hospital system</option>
                            <option value="Health insurer / Payer">Health insurer / Payer</option>
                            <option value="Digital health platform">Digital health platform</option>
                          </select>
                          <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/55" />
                        </span>
                      </label>
                    </div>

                    <label className="block">
                      <span className={labelCls}>Primary region {req}</span>
                      <span className="relative block">
                        <select
                          value={formData.market}
                          onChange={(e) => setFormData({ ...formData, market: e.target.value })}
                          className={`${fieldCls} appearance-none pr-10 cursor-pointer [color-scheme:dark]`}
                        >
                          <option value="Global / Multi-region">Global / Multi-region</option>
                          <option value="UAE & GCC">UAE & GCC</option>
                          <option value="India">India</option>
                          <option value="US / Europe">US / Europe</option>
                        </select>
                        <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/55" />
                      </span>
                    </label>

                    <label className="block">
                      <span className={labelCls}>
                        Sample report <span className="font-normal text-white/55">(optional, PDF)</span>
                      </span>
                      <span className="relative block rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-5 text-center cursor-pointer hover:border-white/30 transition-colors focus-within:border-transparent focus-within:ring-2 focus-within:ring-hos-yellow">
                        <input
                          type="file"
                          accept=".pdf,.png,.jpg"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <span className="flex flex-col items-center gap-2 text-xs text-white/60">
                          <Upload aria-hidden="true" className="w-5 h-5 text-hos-yellow" />
                          {fileName ? (
                            <span className="flex items-center gap-2 max-w-full font-mono text-white">
                              <span className="truncate min-w-0">
                                {fileName} ({fileSize})
                              </span>
                              <button
                                type="button"
                                onClick={clearFile}
                                className={`relative z-10 shrink-0 text-[11px] font-semibold text-rose-300 hover:underline rounded ${focusRing}`}
                              >
                                Remove
                              </button>
                            </span>
                          ) : (
                            <span>Drop a sample PDF or click to browse (de-identified sample)</span>
                          )}
                        </span>
                      </span>
                    </label>

                    <label className="block">
                      <span className={labelCls}>What are you building?</span>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your patient volume, existing app stack, or white-label requirements..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className={`${fieldCls} resize-y`}
                      />
                    </label>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-hos-yellow text-ink-950 text-sm font-semibold px-6 py-3.5 rounded-full transition-colors mt-2 disabled:opacity-70 ${focusRing}`}
                    >
                      {isSubmitting ? (
                        <>
                          <span aria-hidden="true" className="w-4 h-4 border-2 border-ink-950 border-t-transparent rounded-full animate-spin" />
                          Sending your request...
                        </>
                      ) : (
                        <>
                          Request my demo
                          <ArrowRight aria-hidden="true" className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-white/55 text-center">After you submit, you pick a time on our calendar.</p>
                  </form>
                </>
              )}
            </div>
          </Reveal>

          {/* What to expect. TODO(copy): info column headings and lines */}
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2 space-y-4">
            <Reveal>
              <div className="rounded-[20px] dk-card p-6 sm:p-7">
                <h2 className={infoHeading}>What happens in the demo</h2>
                <ol className="mt-5 space-y-5">
                  {(
                    [
                      ['Thirty minutes, live product', 'Not slides. You see the product running.'],
                      ['Your report, decoded', "Send a sample lab report in advance and we'll show you the output on your own panel."],
                      ['The fastest way to launch', 'SDK, White Label or Custom Build: we show you the route that fits what you want built.'],
                      ['A fixed quote', 'Pricing depends on scope. You get a fixed quote after the call.'],
                    ] as [string, string][]
                  ).map(([title, body], i) => (
                    <li key={title} className="flex items-start gap-4">
                      <span className="w-8 h-8 shrink-0 rounded-full ring-1 ring-hos-yellow/50 text-hos-yellow text-xs font-mono font-semibold flex items-center justify-center">
                        <span className="sr-only">Step </span>
                        {i + 1}
                      </span>
                      <span>
                        <span className="block text-base font-semibold text-white">{title}</span>
                        <span className="mt-1 block text-sm text-white/60 leading-relaxed">{body}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              <Reveal className="h-full">
                <div className="h-full rounded-[20px] dk-card p-6">
                  <h2 className={infoHeading}>What to bring</h2>
                  <ul className="mt-4 space-y-3">
                    {['A de-identified sample lab report (PDF)', 'Your patient volume and current app stack', 'Any white-label requirements'].map((t) => (
                      <li key={t} className="flex items-start gap-3 text-sm text-white/70 leading-relaxed">
                        <span aria-hidden="true" className="mt-2 w-3 h-[2px] shrink-0 bg-hos-yellow" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={100} className="h-full">
                <div className="h-full rounded-[20px] dk-card p-6">
                  <h2 className={infoHeading}>Who it's for</h2>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {['Diagnostic lab networks', 'Longevity and preventive clinics', 'Hospital systems', 'Insurers and payers', 'Digital health platforms'].map((t) => (
                      <li key={t} className="rounded-full bg-white/[0.05] ring-1 ring-white/10 px-2.5 py-1 text-xs text-white/75">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-white/60 leading-relaxed">Headquartered in Lucknow, India, serving India and the UAE.</p>
                </div>
              </Reveal>
            </div>

            <Reveal>
              <div className="rounded-[20px] dk-card p-6 sm:p-7 space-y-6">
                <h2 className={infoHeading}>Built for health data</h2>
                <InfrastructureGroup />
                <ul className="space-y-3">
                  {trustPick(['dpdp', 'no-keys-on-device']).map((item) => (
                    <li key={item.id} className="flex items-start gap-3">
                      <ShieldCheck aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0 text-hos-yellow" />
                      <span>
                        <span className="block text-sm font-semibold text-white">{item.name}</span>
                        <span className="block text-sm text-white/60 leading-relaxed">{item.descriptor}</span>
                      </span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3">
                    <Stethoscope aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0 text-hos-yellow" />
                    <span>
                      <span className="block text-sm font-semibold text-white">Reviewed by clinicians</span>
                      <span className="block text-sm text-white/60 leading-relaxed">Protocol outputs are reviewed by our licensed clinical advisory bench before release to any partner.</span>
                    </span>
                  </li>
                </ul>
                <Link to="/security" className={`inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-hos-yellow rounded ${focusRing}`}>
                  Security and compliance
                  <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-[20px] dk-card p-6 flex items-center gap-4">
                <span className="w-10 h-10 shrink-0 rounded-xl bg-white/[0.04] ring-1 ring-white/10 flex items-center justify-center text-hos-yellow">
                  <Mail aria-hidden="true" className="w-5 h-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-white/60">Prefer email?</span>
                  <a
                    href={`mailto:${TRUST_CONTACT}`}
                    className={`block truncate text-base font-semibold text-white underline underline-offset-4 decoration-hos-yellow decoration-2 hover:decoration-white rounded ${focusRing}`}
                  >
                    {TRUST_CONTACT}
                  </a>
                </span>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
};
