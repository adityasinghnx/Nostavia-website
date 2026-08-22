import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronRight,
  Shield,
  Activity,
  Brain,
  Heart,
  Utensils,
  BarChart3,
  Cpu,
  AlertTriangle,
  Lock,
  Eye,
  BookOpen,
  FileWarning,
  FileText,
  Menu,
  X,
  FlaskConical,
  Dna,
  Microscope,
  CheckCircle2,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Section IDs for TOC navigation
   ───────────────────────────────────────────── */
const TOC_SECTIONS = [
  { id: 'philosophy', label: '1. Clinical Philosophy' },
  { id: 'governance', label: '2. Clinical Governance' },
  { id: 'biological-age', label: '3. Biological Age' },
  { id: 'wearable-scoring', label: '4. Wearable Scoring' },
  { id: 'biomarker-interpretation', label: '5. Biomarker Interpretation' },
  { id: 'pattern-discovery', label: '6. Pattern Discovery' },
  { id: 'nutrition', label: '7. Nutrition Intelligence' },
  { id: 'behavioural', label: '8. Behavioural Modelling' },
  { id: 'ai-scope', label: '9. AI: Scope & Limits' },
  { id: 'safety', label: '10. Safety Systems' },
  { id: 'data-privacy', label: '11. Data & Privacy' },
  { id: 'not-published', label: '12. What We Don\u2019t Publish' },
  { id: 'limitations', label: '13. Known Limitations' },
  { id: 'references', label: '14. Reference Library' },
  { id: 'disclaimer', label: '15. Medical Disclaimer' },
  { id: 'document-control', label: '16. Document Control' },
];

/* ─────────────────────────────────────────────
   Reusable components
   ───────────────────────────────────────────── */

const SectionAnchor: React.FC<{ id: string }> = ({ id }) => (
  <div id={id} className="scroll-mt-28" />
);

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
    {children}
  </div>
);

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight leading-tight">
    {children}
  </h2>
);

const Prose: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-sm sm:text-base text-[#475569] leading-relaxed font-body space-y-4 max-w-3xl">
    {children}
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-6 sm:p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] ${className}`}>
    {children}
  </div>
);

const TableWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="overflow-x-auto -mx-4 sm:mx-0">
    <div className="min-w-[640px] px-4 sm:px-0">
      {children}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Main ClinicalPage
   ───────────────────────────────────────────── */
export const ClinicalPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('philosophy');
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  /* Track which section is in view */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 }
    );

    TOC_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileTocOpen(false);
    }
  };

  return (
    <div className="font-body text-[#0F172A] bg-white">

      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 pb-12">
        <div className="space-y-5 max-w-4xl">
          <Eyebrow>CLINICAL &amp; ALGORITHMIC TRANSPARENCY</Eyebrow>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-[#0F172A] tracking-tight leading-[1.05]">
            Clinical software that cannot explain itself should not be trusted with health decisions.
          </h1>
          <p className="text-base sm:text-xl text-[#64748B] max-w-3xl leading-relaxed font-body">
            This document sets out the scientific basis of every major computation in the Nostavia platform: the models we use, the literature they come from, the thresholds we consider clinically meaningful, where AI is involved, and where it is deliberately not.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className="font-mono text-xs text-[#64748B] font-bold">Version 1.0</span>
            <span className="text-[#E2E8F0]">|</span>
            <span className="font-mono text-xs text-[#64748B]">August 2026</span>
            <span className="text-[#E2E8F0]">|</span>
            <span className="font-mono text-xs text-[#64748B]">Public</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MOBILE TOC TOGGLE
          ═══════════════════════════════════════════ */}
      <div className="lg:hidden sticky top-[64px] z-40 bg-white border-b border-[#E2E8F0]">
        <button
          onClick={() => setMobileTocOpen(!mobileTocOpen)}
          className="w-full flex items-center justify-between px-4 sm:px-6 py-3 text-xs font-mono font-bold text-[#0F172A] uppercase tracking-wider"
        >
          <span className="flex items-center gap-2">
            <Menu className="w-4 h-4" />
            Navigate sections
          </span>
          {mobileTocOpen ? <X className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        {mobileTocOpen && (
          <div className="px-4 sm:px-6 pb-4 space-y-1 max-h-[50vh] overflow-y-auto">
            {TOC_SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`block w-full text-left px-3 py-2 text-xs font-body rounded-[2px] transition-colors ${
                  activeSection === id
                    ? 'bg-[#0F172A] text-white font-bold'
                    : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════
          MAIN LAYOUT: SIDEBAR TOC + CONTENT
          ═══════════════════════════════════════════ */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-16">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">

          {/* STICKY SIDEBAR (desktop) */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28 space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
              <div className="font-mono text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-3">
                Contents
              </div>
              {TOC_SECTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`block w-full text-left px-3 py-1.5 text-xs font-body rounded-[2px] transition-colors ${
                    activeSection === id
                      ? 'bg-[#0F172A] text-white font-bold'
                      : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          {/* ═══════════════════════════════════════
              CONTENT COLUMN
              ═══════════════════════════════════════ */}
          <div className="flex flex-col gap-20 pt-4 lg:pt-0">

            {/* ───────────────────────────────────
               §1  CLINICAL PHILOSOPHY
               ─────────────────────────────────── */}
            <section>
              <SectionAnchor id="philosophy" />
              <div className="space-y-6">
                <div className="space-y-2">
                  <Eyebrow>SECTION 01</Eyebrow>
                  <SectionHeading>Clinical Philosophy</SectionHeading>
                </div>

                <Prose>
                  <p>
                    Nostavia is built on a distinction that most health software ignores.
                  </p>
                  <p>
                    <strong className="text-[#0F172A]">Normal ranges</strong> are derived from the general population, including people with undiagnosed chronic disease. A result inside a normal range means you are statistically unremarkable. It does not mean you are well.
                  </p>
                  <p>
                    <strong className="text-[#0F172A]">Optimal ranges</strong> are derived from longevity research, centenarian cohorts, cardiovascular outcome trials and performance physiology. They describe the physiological state associated with the lowest long-term risk.
                  </p>
                  <p>
                    Every interpretation the platform produces is graded against both. A result can be normal and still be flagged for attention. A result outside the normal range is always escalated, never softened.
                  </p>
                </Prose>

                <TableWrapper>
                  <table className="w-full text-xs font-body border border-[#E2E8F0]">
                    <thead>
                      <tr className="bg-[#0F172A] text-white">
                        <th className="text-left px-4 py-3 font-mono font-bold uppercase tracking-wider">Capability</th>
                        <th className="text-left px-4 py-3 font-mono font-bold uppercase tracking-wider">Conventional</th>
                        <th className="text-left px-4 py-3 font-mono font-bold uppercase tracking-wider">Nostavia</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#475569]">
                      {[
                        ['Reference ranges', 'Single standard clinical range', 'Dual grading: optimal, normal, abnormal'],
                        ['Lab interpretation', 'Flags values outside range', 'Cross-panel correlation with wearable and lifestyle context'],
                        ['Wearable data', 'Step and calorie counting', 'Published physiological models for load, recovery and autonomic state'],
                        ['Biological age', 'Not offered', 'Multi-biomarker deviation model with published clocks where available'],
                        ['Nutrition', 'Calorie estimation', 'Metabolic response, processing grade, timing appropriateness'],
                        ['Pattern discovery', 'Manual review', 'Automated correlation with significance filtering'],
                      ].map(([cap, conv, nost], i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                          <td className="px-4 py-3 font-bold text-[#0F172A]">{cap}</td>
                          <td className="px-4 py-3">{conv}</td>
                          <td className="px-4 py-3 text-[#0F172A] font-medium">{nost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TableWrapper>
              </div>
            </section>


            {/* ───────────────────────────────────
               §2  CLINICAL GOVERNANCE
               ─────────────────────────────────── */}
            <section>
              <SectionAnchor id="governance" />
              <div className="space-y-6">
                <div className="space-y-2">
                  <Eyebrow>SECTION 02</Eyebrow>
                  <SectionHeading>Clinical Governance</SectionHeading>
                </div>

                <Prose>
                  <p>
                    The reference ranges, thresholds and interpretive language in the platform are reviewed by Nostavia's clinical advisory bench, which includes GMC-registered clinicians, research scientists and qualified nutrition specialists.
                  </p>
                </Prose>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      icon: <Shield className="w-5 h-5" />,
                      title: 'No autonomous diagnosis',
                      body: 'The platform interprets and contextualises. It does not diagnose, and it does not prescribe.',
                    },
                    {
                      icon: <CheckCircle2 className="w-5 h-5" />,
                      title: 'Clinician override',
                      body: 'Partner clinicians can adjust reference ranges, suppress modules, and control the language shown to their patients. Our defaults are defaults, not mandates.',
                    },
                    {
                      icon: <Eye className="w-5 h-5" />,
                      title: 'Traceability',
                      body: 'Every score and range maps to a published source. Where a threshold is our own composite judgement, we say so rather than implying literature support that does not exist.',
                    },
                    {
                      icon: <AlertTriangle className="w-5 h-5" />,
                      title: 'Conservative escalation',
                      body: 'Where a signal has established clinical significance, the platform surfaces it prominently and directs the person to a qualified clinician rather than attempting to manage it.',
                    },
                  ].map((item, i) => (
                    <Card key={i} className="space-y-3">
                      <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F172A]">
                        {item.icon}
                      </div>
                      <h3 className="font-display font-extrabold text-lg text-[#0F172A]">{item.title}</h3>
                      <p className="text-xs text-[#64748B] leading-relaxed font-body">{item.body}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </section>


            {/* ───────────────────────────────────
               §3  BIOLOGICAL AGE
               ─────────────────────────────────── */}
            <section>
              <SectionAnchor id="biological-age" />
              <div className="space-y-6">
                <div className="space-y-2">
                  <Eyebrow>SECTION 03</Eyebrow>
                  <SectionHeading>Biological Age</SectionHeading>
                </div>

                <Prose>
                  <p>
                    Nostavia estimates biological age using a biomarker deviation model, in the tradition of PhenoAge (Levine et al., 2018) and the Klemera-Doubal method (2006).
                  </p>
                  <p>
                    <strong className="text-[#0F172A]">Method.</strong> Each biomarker's distance from its optimal range is converted into an aging surplus or deficit expressed in years, weighted by the strength of that marker's association with mortality and healthspan in the literature, and combined with chronological age.
                  </p>
                </Prose>

                <Card className="space-y-4">
                  <h3 className="font-display font-extrabold text-lg text-[#0F172A]">Safeguards built into the model</h3>
                  <ul className="space-y-3">
                    {[
                      'A minimum number of valid biomarkers is required before any estimate is produced. Sparse data returns no result rather than a confident guess.',
                      'Each individual marker\u2019s contribution is capped, so no single abnormal value can dominate the estimate.',
                      'The final output is bounded relative to chronological age to prevent implausible results.',
                    ].map((text, i) => (
                      <li key={i} className="flex gap-3 text-xs text-[#475569] leading-relaxed font-body">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-mono text-[10px] font-bold mt-0.5">
                          {i + 1}
                        </span>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Prose>
                  <p>
                    <strong className="text-[#0F172A]">Contributing markers:</strong> fasting glucose, HbA1c, HDL and LDL cholesterol, triglycerides, creatinine, ALT, haemoglobin, TSH and vitamin D.
                  </p>
                  <p>
                    <strong className="text-[#0F172A]">Epigenetic clocks.</strong> Where a person has completed validated epigenetic testing through a third-party laboratory, Nostavia displays and tracks the results rather than recomputing them: Horvath, Hannum, PhenoAge, GrimAge and DunedinPACE.
                  </p>
                </Prose>

                <div className="p-4 border-l-4 border-l-[#0F172A] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px]">
                  <p className="text-xs text-[#475569] font-body leading-relaxed">
                    <strong className="text-[#0F172A] font-display">What this is not.</strong> Our biomarker-derived biological age is a metabolic estimate, not an epigenetic measurement. It is not interchangeable with a methylation clock, and we label it accordingly everywhere it appears.
                  </p>
                </div>
              </div>
            </section>


            {/* ───────────────────────────────────
               §4  WEARABLE & PHYSIOLOGICAL SCORING
               ─────────────────────────────────── */}
            <section>
              <SectionAnchor id="wearable-scoring" />
              <div className="space-y-6">
                <div className="space-y-2">
                  <Eyebrow>SECTION 04</Eyebrow>
                  <SectionHeading>Wearable &amp; Physiological Scoring</SectionHeading>
                </div>

                <Prose>
                  <p>
                    Nostavia converts raw sensor data from Apple Watch, Fitbit, Garmin, Oura and WHOOP into composite scores. Each score is built on a published physiological model rather than an invented metric.
                  </p>
                </Prose>

                <TableWrapper>
                  <table className="w-full text-xs font-body border border-[#E2E8F0]">
                    <thead>
                      <tr className="bg-[#0F172A] text-white">
                        <th className="text-left px-4 py-3 font-mono font-bold uppercase tracking-wider">Score</th>
                        <th className="text-left px-4 py-3 font-mono font-bold uppercase tracking-wider">Underlying Model</th>
                        <th className="text-left px-4 py-3 font-mono font-bold uppercase tracking-wider">Source</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#475569]">
                      {[
                        ['Training load / strain', 'TRIMP, exponentially weighted by HR reserve', 'Banister (1991)'],
                        ['Cardio load', 'Training Stress Score methodology', 'Coggan & Allen (2010)'],
                        ['Recovery', 'HRV + resting HR vs personal baseline + sleep quality', 'Buchheit (2014)'],
                        ['Stress', 'Dual-branch autonomic assessment', 'Kim et al. (2018); Schumann et al.'],
                        ['Energy / readiness', 'Two-process sleep-wake model with circadian weighting', 'Borbély; Dijk & Czeisler (1995)'],
                        ['Sleep quality', 'Duration vs NSF guidance + sleep efficiency', 'Hirshkowitz et al. (2015); Buysse et al. (1989)'],
                        ['Max heart rate', 'Tanaka formula: 208 − 0.7 × age', 'Tanaka et al. (2001)'],
                      ].map(([score, model, source], i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                          <td className="px-4 py-3 font-bold text-[#0F172A] whitespace-nowrap">{score}</td>
                          <td className="px-4 py-3">{model}</td>
                          <td className="px-4 py-3 font-mono text-[10px] text-[#64748B]">{source}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TableWrapper>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="space-y-2">
                    <h4 className="font-display font-extrabold text-sm text-[#0F172A]">Personal baselines</h4>
                    <p className="text-xs text-[#64748B] font-body leading-relaxed">
                      Recovery and stress are computed against the individual's own rolling baseline. A resting heart rate of 58 is unremarkable for one person and a warning sign for another.
                    </p>
                  </Card>
                  <Card className="space-y-2">
                    <h4 className="font-display font-extrabold text-sm text-[#0F172A]">VO₂ max</h4>
                    <p className="text-xs text-[#64748B] font-body leading-relaxed">
                      Read from the device where available and classified against ACSM age and sex-specific percentile tiers. Not estimated where the device does not provide it.
                    </p>
                  </Card>
                  <Card className="space-y-2">
                    <h4 className="font-display font-extrabold text-sm text-[#0F172A]">Heart rate recovery</h4>
                    <p className="text-xs text-[#64748B] font-body leading-relaxed">
                      A blunted recovery below 12 bpm is associated with elevated cardiovascular mortality risk. The platform flags this prominently and directs the person to a physician.
                    </p>
                  </Card>
                </div>
              </div>
            </section>


            {/* ───────────────────────────────────
               §5  BIOMARKER INTERPRETATION
               ─────────────────────────────────── */}
            <section>
              <SectionAnchor id="biomarker-interpretation" />
              <div className="space-y-6">
                <div className="space-y-2">
                  <Eyebrow>SECTION 05</Eyebrow>
                  <SectionHeading>Biomarker Interpretation</SectionHeading>
                </div>

                <Prose>
                  <p>
                    Nostavia supports interpretation across more than 100 biomarkers spanning ten organ systems: metabolic health, cardiovascular, hepatic, renal, thyroid, hormonal, vitamins, minerals and electrolytes, haematology, and emerging longevity markers.
                  </p>
                  <p>
                    Where a result sits inside the standard range but outside the optimal range, it is presented as an opportunity rather than a problem.
                  </p>
                </Prose>

                <div className="space-y-3">
                  <h3 className="font-display font-extrabold text-xl text-[#0F172A]">Optimal vs Standard Ranges</h3>
                  <TableWrapper>
                    <table className="w-full text-xs font-body border border-[#E2E8F0]">
                      <thead>
                        <tr className="bg-[#0F172A] text-white">
                          <th className="text-left px-3 py-3 font-mono font-bold uppercase tracking-wider">Biomarker</th>
                          <th className="text-left px-3 py-3 font-mono font-bold uppercase tracking-wider">Standard</th>
                          <th className="text-left px-3 py-3 font-mono font-bold uppercase tracking-wider">Optimal</th>
                          <th className="text-left px-3 py-3 font-mono font-bold uppercase tracking-wider">Basis</th>
                        </tr>
                      </thead>
                      <tbody className="text-[#475569]">
                        {[
                          ['HbA1c', '4.0–5.6 %', '4.8–5.2 %', 'Levine et al. (2018); ADA'],
                          ['Fasting glucose', '70–99 mg/dL', '70–85 mg/dL', 'Tirosh et al. (2011)'],
                          ['Fasting insulin', '2.6–24.9 µIU/mL', '2.6–5.0 µIU/mL', 'Centenarian cohorts'],
                          ['LDL cholesterol', '<100 mg/dL', '<70 mg/dL', 'Ference et al. (2017)'],
                          ['HDL cholesterol', '40–100 mg/dL', '60–90 mg/dL', 'Sirtori (2006)'],
                          ['Triglycerides', '<150 mg/dL', '<100 mg/dL', 'Nordestgaard (2016)'],
                          ['ApoB', '<100 mg/dL', '<60 mg/dL', 'Sniderman et al. (2019)'],
                          ['hs-CRP', '0–3 mg/L', '<1 mg/L', 'Ridker (2003)'],
                          ['Homocysteine', '<15 µmol/L', '<9 µmol/L', 'Smith et al. (2010)'],
                          ['Vitamin D (25-OH)', '30–100 ng/mL', '40–80 ng/mL', 'Holick et al., Endocrine Soc'],
                          ['TSH', '0.4–4.0 mIU/L', '1.0–2.5 mIU/L', 'Garber et al., AACE/ETA'],
                          ['ALT / AST', '<56 U/L', '<25 U/L', 'NAFLD literature'],
                          ['Creatinine', '0.7–1.3 mg/dL', '0.6–1.0 mg/dL', 'KDIGO'],
                          ['eGFR', '>60 mL/min', '>90 mL/min', 'KDIGO'],
                          ['Ferritin', '30–400 ng/mL', '70–150 ng/mL', 'WHO guidance'],
                          ['IGF-1', '50–300 ng/mL', '120–180 ng/mL', 'Milman et al. (2014)'],
                          ['DHEA-S', '138–475 µg/dL', '200–400 µg/dL', 'Endocrine Society'],
                        ].map(([marker, std, opt, basis], i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                            <td className="px-3 py-2.5 font-bold text-[#0F172A] whitespace-nowrap">{marker}</td>
                            <td className="px-3 py-2.5 font-mono text-[11px]">{std}</td>
                            <td className="px-3 py-2.5 font-mono text-[11px] text-emerald-700 font-semibold">{opt}</td>
                            <td className="px-3 py-2.5 font-mono text-[10px] text-[#94A3B8]">{basis}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </TableWrapper>
                  <p className="text-xs text-[#94A3B8] font-body">
                    Partner institutions can override any of these ranges to match their own clinical protocols or local laboratory standards.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="space-y-2">
                    <h4 className="font-display font-extrabold text-sm text-[#0F172A]">Unit standardisation</h4>
                    <p className="text-xs text-[#64748B] font-body leading-relaxed">
                      All incoming results are normalised to canonical units before interpretation, so a report in mmol/L and one in mg/dL produce identical clinical reasoning.
                    </p>
                  </Card>
                  <Card className="space-y-2">
                    <h4 className="font-display font-extrabold text-sm text-[#0F172A]">Extended panels</h4>
                    <p className="text-xs text-[#64748B] font-body leading-relaxed">
                      Gut microbiome, pharmacogenomic and wellness genetics (MTHFR, APOE, COMT, VDR, CYP1A2), epigenetic age, and heavy metals panels.
                    </p>
                  </Card>
                  <Card className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-extrabold text-sm text-[#0F172A]">Research-grade markers</h4>
                    </div>
                    <p className="text-xs text-[#64748B] font-body leading-relaxed">
                      NAD+, telomere length, sirtuin and mTOR activity, and certain inflammatory cytokines are labelled as research-grade and excluded from biological age and risk outputs.
                    </p>
                  </Card>
                </div>
              </div>
            </section>


            {/* ───────────────────────────────────
               §6  PATTERN DISCOVERY
               ─────────────────────────────────── */}
            <section>
              <SectionAnchor id="pattern-discovery" />
              <div className="space-y-6">
                <div className="space-y-2">
                  <Eyebrow>SECTION 06</Eyebrow>
                  <SectionHeading>Pattern Discovery</SectionHeading>
                </div>

                <Prose>
                  <p>
                    Nostavia's correlation engine identifies relationships between health signals over time using Pearson correlation on aligned time-series data.
                  </p>
                  <p>
                    A correlation is only surfaced when it clears a minimum data volume, exceeds a minimum coefficient magnitude, and matches a physiologically plausible direction. Statistical association alone is never sufficient. Every reportable pattern has a stated clinical rationale.
                  </p>
                </Prose>

                <Card className="space-y-4">
                  <h3 className="font-display font-extrabold text-lg text-[#0F172A]">Relationships the engine tests</h3>
                  <ul className="space-y-2">
                    {[
                      'Sleep duration against next-day HRV and resting heart rate',
                      'Diet quality score against next-day autonomic markers',
                      'Late evening eating against overnight recovery',
                      'Sustained training load against recovery trajectory',
                      'Multi-signal patterns: short sleep alongside elevated glycaemic markers, or declining HRV alongside elevated inflammatory markers',
                    ].map((text, i) => (
                      <li key={i} className="flex gap-2 text-xs text-[#475569] font-body leading-relaxed">
                        <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8] flex-shrink-0 mt-0.5" />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <div className="p-4 border-l-4 border-l-amber-500 bg-amber-50/50 border border-amber-200 rounded-[2px]">
                  <p className="text-xs text-[#475569] font-body leading-relaxed">
                    <strong className="text-[#0F172A] font-display">Association ≠ Causation.</strong> Correlations are presented as observations about that individual, with an explicit note that association is not causation. The platform does not tell someone that one thing caused another.
                  </p>
                </div>
              </div>
            </section>


            {/* ───────────────────────────────────
               §7  NUTRITION INTELLIGENCE
               ─────────────────────────────────── */}
            <section>
              <SectionAnchor id="nutrition" />
              <div className="space-y-6">
                <div className="space-y-2">
                  <Eyebrow>SECTION 07</Eyebrow>
                  <SectionHeading>Nutrition Intelligence</SectionHeading>
                </div>

                <Prose>
                  <p>
                    Nostavia analyses food from a photograph and returns more than a calorie estimate: predicted metabolic response, degree of processing, appropriateness for the time of day, and effect on nutrient absorption.
                  </p>
                </Prose>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="space-y-3">
                    <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F172A]">
                      <Utensils className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-extrabold text-sm text-[#0F172A]">Two-stage analysis</h4>
                    <p className="text-xs text-[#64748B] font-body leading-relaxed">
                      A fast pass identifies the meal and estimates macronutrients within seconds. A deeper pass produces the full metabolic profile.
                    </p>
                  </Card>
                  <Card className="space-y-3">
                    <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F172A]">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-extrabold text-sm text-[#0F172A]">Closed-loop validation</h4>
                    <p className="text-xs text-[#64748B] font-body leading-relaxed">
                      After a scanned meal, the platform compares its predicted metabolic response against the person's actual heart rate response. Predictions contradicted by the person's own physiology are marked as such.
                    </p>
                  </Card>
                  <Card className="space-y-3">
                    <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F172A]">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-extrabold text-sm text-[#0F172A]">Accuracy limits, stated plainly</h4>
                    <p className="text-xs text-[#64748B] font-body leading-relaxed">
                      Photograph-based nutrition estimation is approximate. Portion size, hidden fats, oils and preparation method are inferred rather than measured. It is not a substitute for weighed intake in a clinical setting.
                    </p>
                  </Card>
                </div>
              </div>
            </section>


            {/* ───────────────────────────────────
               §8  BEHAVIOURAL & PREDICTIVE MODELLING
               ─────────────────────────────────── */}
            <section>
              <SectionAnchor id="behavioural" />
              <div className="space-y-6">
                <div className="space-y-2">
                  <Eyebrow>SECTION 08</Eyebrow>
                  <SectionHeading>Behavioural &amp; Predictive Modelling</SectionHeading>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="space-y-3">
                    <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F172A]">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-extrabold text-sm text-[#0F172A]">Habit modelling</h4>
                    <p className="text-xs text-[#64748B] font-body leading-relaxed">
                      The platform learns individual timing patterns — typical wake, meal and sleep times — using exponentially weighted moving averages, with confidence scores that rise as data accumulates. Below a minimum data threshold, no prediction is made. Gradual drift is detected via linear regression and surfaced when clinically meaningful.
                    </p>
                  </Card>
                  <Card className="space-y-3">
                    <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F172A]">
                      <Brain className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-extrabold text-sm text-[#0F172A]">Adaptive timing</h4>
                    <p className="text-xs text-[#64748B] font-body leading-relaxed">
                      Notifications and prompts are scheduled around predicted individual rhythms rather than fixed clock times, and are suppressed entirely when confidence is low.
                    </p>
                  </Card>
                  <Card className="space-y-3">
                    <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F172A]">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-extrabold text-sm text-[#0F172A]">Scenario projection</h4>
                    <p className="text-xs text-[#64748B] font-body leading-relaxed">
                      Nostavia can project likely trajectories across short and long horizons. These are educational models built on population-level relationships, clearly labelled as scenarios rather than predictions, and are never presented as individual disease risk assessment.
                    </p>
                  </Card>
                </div>
              </div>
            </section>


            {/* ───────────────────────────────────
               §9  AI: SCOPE & LIMITS
               ─────────────────────────────────── */}
            <section>
              <SectionAnchor id="ai-scope" />
              <div className="space-y-6">
                <div className="space-y-2">
                  <Eyebrow>SECTION 09</Eyebrow>
                  <SectionHeading>Artificial Intelligence: Scope &amp; Limits</SectionHeading>
                </div>

                <Prose>
                  <p>AI is one component of the platform, not the whole of it.</p>
                </Prose>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="space-y-4 border-l-4 border-l-emerald-600">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-emerald-700" />
                      <h3 className="font-display font-extrabold text-lg text-[#0F172A]">What is deterministic</h3>
                    </div>
                    <p className="text-xs text-[#64748B] font-body leading-relaxed">
                      All physiological scoring, reference range grading, biological age computation, unit conversion, correlation statistics and safety thresholds are computed by fixed, auditable logic. These produce identical outputs for identical inputs. No language model is involved in producing a number.
                    </p>
                  </Card>
                  <Card className="space-y-4 border-l-4 border-l-blue-600">
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-blue-700" />
                      <h3 className="font-display font-extrabold text-lg text-[#0F172A]">What is AI-assisted</h3>
                    </div>
                    <p className="text-xs text-[#64748B] font-body leading-relaxed">
                      Natural language explanation of results, extraction of values from uploaded laboratory documents, food recognition from images, protocol drafting, and conversational interaction.
                    </p>
                  </Card>
                </div>

                <Card className="space-y-4">
                  <h3 className="font-display font-extrabold text-lg text-[#0F172A]">Controls we apply</h3>
                  <ul className="space-y-2">
                    {[
                      'Model outputs are constrained to structured formats and validated before they reach a person',
                      'Clinical thresholds and reference ranges are held outside the model — a model cannot change what counts as abnormal',
                      'Extracted laboratory values are surfaced for confirmation rather than silently trusted',
                      'Generated protocols respect hard constraints including dietary boundaries and biometric state; where recovery is poor or stress is elevated, intensity is reduced regardless of what the plan called for',
                      'Long-term context is stored as vector embeddings rather than raw conversation text',
                    ].map((text, i) => (
                      <li key={i} className="flex gap-2 text-xs text-[#475569] font-body leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <div className="p-4 border-l-4 border-l-[#0F172A] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px]">
                  <p className="text-xs text-[#475569] font-body leading-relaxed">
                    <strong className="text-[#0F172A] font-display">What AI does not do.</strong> It does not diagnose. It does not alter a reference range. It does not decide whether a result is abnormal. It does not act on a person's health without a human in the loop.
                  </p>
                </div>
              </div>
            </section>


            {/* ───────────────────────────────────
               §10  SAFETY SYSTEMS
               ─────────────────────────────────── */}
            <section>
              <SectionAnchor id="safety" />
              <div className="space-y-6">
                <div className="space-y-2">
                  <Eyebrow>SECTION 10</Eyebrow>
                  <SectionHeading>Safety Systems</SectionHeading>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="space-y-3 border-t-4 border-t-red-500">
                    <h3 className="font-display font-extrabold text-lg text-[#0F172A]">Emergency language detection</h3>
                    <p className="text-xs text-[#64748B] font-body leading-relaxed">
                      Every message is screened for language indicating a medical or psychological emergency before it reaches any AI processing. When triggered, the platform returns emergency contact guidance and a direction to seek immediate help. The ordinary response path is bypassed entirely.
                    </p>
                    <p className="text-[10px] text-[#94A3B8] font-body leading-relaxed">
                      This is a supplementary safeguard. It is not an emergency service, it is not a substitute for one, and we do not present it as one.
                    </p>
                  </Card>
                  <Card className="space-y-3 border-t-4 border-t-amber-500">
                    <h3 className="font-display font-extrabold text-lg text-[#0F172A]">Clinical escalation thresholds</h3>
                    <p className="text-xs text-[#64748B] font-body leading-relaxed">
                      Signals with established clinical significance — blunted heart rate recovery, sustained autonomic suppression, sustained elevation in resting heart rate above personal baseline, and severe sleep deficit — are flagged prominently with a recommendation to consult a qualified clinician.
                    </p>
                    <p className="text-[10px] text-[#94A3B8] font-body leading-relaxed">
                      The platform escalates. It does not attempt to manage.
                    </p>
                  </Card>
                </div>
              </div>
            </section>


            {/* ───────────────────────────────────
               §11  DATA, PRIVACY & SECURITY
               ─────────────────────────────────── */}
            <section>
              <SectionAnchor id="data-privacy" />
              <div className="space-y-6">
                <div className="space-y-2">
                  <Eyebrow>SECTION 11</Eyebrow>
                  <SectionHeading>Data, Privacy &amp; Security</SectionHeading>
                </div>

                <Prose>
                  <p>
                    <strong className="text-[#0F172A]">Sources:</strong> Apple HealthKit, Google Health Connect, connected wearables, laboratory reports uploaded or integrated directly, food images, and self-reported assessment data.
                  </p>
                </Prose>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      icon: <Lock className="w-5 h-5" />,
                      title: 'On-device computation',
                      body: 'Physiological scoring from wearable data is computed locally on the device wherever possible.',
                    },
                    {
                      icon: <Shield className="w-5 h-5" />,
                      title: 'No credentials on device',
                      body: 'All external model calls are proxied server-side. Keys are never distributed to clients.',
                    },
                    {
                      icon: <Lock className="w-5 h-5" />,
                      title: 'Row-level isolation',
                      body: 'Every record is scoped to its owner at the database layer, not merely at the application layer.',
                    },
                    {
                      icon: <Eye className="w-5 h-5" />,
                      title: 'Data minimisation',
                      body: 'Only the fields required for a given computation are transmitted to any external service.',
                    },
                    {
                      icon: <Shield className="w-5 h-5" />,
                      title: 'Deployment flexibility',
                      body: 'For institutional partners, Nostavia can deploy into a partner-owned database and infrastructure account, so patient data remains within the partner\u2019s control and jurisdiction.',
                    },
                  ].map((item, i) => (
                    <Card key={i} className="space-y-3">
                      <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F172A]">
                        {item.icon}
                      </div>
                      <h4 className="font-display font-extrabold text-sm text-[#0F172A]">{item.title}</h4>
                      <p className="text-xs text-[#64748B] font-body leading-relaxed">{item.body}</p>
                    </Card>
                  ))}
                </div>

                <p className="text-xs text-[#94A3B8] font-body">
                  Partner-specific security documentation, including current certification status and sub-processor detail, is available under NDA to institutions in active evaluation.
                </p>
              </div>
            </section>


            {/* ───────────────────────────────────
               §12  WHAT WE DO NOT PUBLISH
               ─────────────────────────────────── */}
            <section>
              <SectionAnchor id="not-published" />
              <div className="space-y-6">
                <div className="space-y-2">
                  <Eyebrow>SECTION 12</Eyebrow>
                  <SectionHeading>What We Do Not Publish</SectionHeading>
                </div>

                <Card className="space-y-4">
                  <Prose>
                    <p>
                      We publish the models, the sources, the thresholds and the reasoning. We do not publish the exact weighting coefficients and normalisation constants inside our composite scores.
                    </p>
                    <p>
                      That is a deliberate line. Those parameters are the product of clinical review and iteration, and they are what a partner is licensing. Publishing them would not make the platform more trustworthy — it would only make it easier to copy.
                    </p>
                    <p>
                      Any partner institution evaluating Nostavia can review the full parameter set under NDA, and any partner clinician can inspect the exact reasoning behind an individual result.
                    </p>
                  </Prose>
                </Card>
              </div>
            </section>


            {/* ───────────────────────────────────
               §13  KNOWN LIMITATIONS
               ─────────────────────────────────── */}
            <section>
              <SectionAnchor id="limitations" />
              <div className="space-y-6">
                <div className="space-y-2">
                  <Eyebrow>SECTION 13</Eyebrow>
                  <SectionHeading>Known Limitations</SectionHeading>
                </div>

                <Prose>
                  <p>We would rather state these than have a clinician find them.</p>
                </Prose>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: 'Consumer-grade sensors',
                      body: 'Wearable-derived HRV, sleep staging and energy expenditure are approximations. Accuracy varies by device, by wear position, and by individual. Sleep staging in particular is less accurate than polysomnography.',
                    },
                    {
                      title: 'Biological age is an estimate',
                      body: 'It is directional and useful for tracking change over time. A single reading should not be treated as a measurement.',
                    },
                    {
                      title: 'Population models applied to individuals',
                      body: 'Reference ranges and physiological formulas are derived from population studies. Individual variation is real, and pregnancy, chronic disease, medication and certain ethnic and genetic factors can shift what is appropriate.',
                    },
                    {
                      title: 'Language models make errors',
                      body: 'Explanatory text and generated protocols are reviewed and constrained, but they are not infallible.',
                    },
                    {
                      title: 'Correlation is not causation',
                      body: 'Discovered patterns describe association within one person\u2019s data over a limited window.',
                    },
                    {
                      title: 'Nutrition analysis from images is approximate',
                      body: 'Portion size, hidden fats, oils and preparation method are inferred rather than measured, as described in the nutrition section.',
                    },
                  ].map((item, i) => (
                    <Card key={i} className="space-y-2 border-l-4 border-l-amber-400">
                      <h4 className="font-display font-extrabold text-sm text-[#0F172A]">{item.title}</h4>
                      <p className="text-xs text-[#64748B] font-body leading-relaxed">{item.body}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </section>


            {/* ───────────────────────────────────
               §14  SCIENTIFIC REFERENCE LIBRARY
               ─────────────────────────────────── */}
            <section>
              <SectionAnchor id="references" />
              <div className="space-y-6">
                <div className="space-y-2">
                  <Eyebrow>SECTION 14</Eyebrow>
                  <SectionHeading>Scientific Reference Library</SectionHeading>
                </div>

                <TableWrapper>
                  <table className="w-full text-xs font-body border border-[#E2E8F0]">
                    <thead>
                      <tr className="bg-[#0F172A] text-white">
                        <th className="text-left px-4 py-3 font-mono font-bold uppercase tracking-wider w-[160px]">Domain</th>
                        <th className="text-left px-4 py-3 font-mono font-bold uppercase tracking-wider">Reference</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#475569]">
                      {[
                        ['Exercise physiology', 'Banister EW (1991). Modeling elite athletic performance. PMID 1816431'],
                        ['Recovery assessment', 'Buchheit M (2014). Monitoring training status with heart rate measures. PMID 24578692'],
                        ['Autonomic stress', 'Kim HG et al. (2018). Stress and heart rate variability. PMID 29486547'],
                        ['Autonomic physiology', 'Schumann AY et al. Heart rate versus heart rate variability. Front Physiol'],
                        ['Training load', 'Coggan AR and Allen H (2010). Training and Racing with a Power Meter'],
                        ['Circadian biology', 'Dijk DJ and Czeisler CA (1995). J Neurosci 15(5):3526'],
                        ['Sleep duration', 'Hirshkowitz M et al. (2015). NSF sleep duration recommendations. Sleep Health'],
                        ['Sleep quality', 'Buysse DJ et al. (1989). Pittsburgh Sleep Quality Index. PMID 2748771'],
                        ['Longevity science', 'Levine ME et al. (2018). PhenoAge. PMID 29676998'],
                        ['Aging science', 'Klemera P and Doubal S (2006). Biological age computation. PMID 16413571'],
                        ['Cardiology', 'Tanaka H et al. (2001). Age-predicted maximal heart rate'],
                        ['HRV baseline', 'Koenig J et al. Adult RMSSD population baseline. PMID 31717972'],
                        ['Inflammation', 'Ridker PM (2003). Clinical application of C-reactive protein. NEJM. PMID 12711671'],
                        ['Lipidology', 'Ference BA et al. (2017). LDL-C and ASCVD risk. EAS/ESC. PMID 28444290'],
                        ['Lipidology', 'Sirtori CR (2006). HDL and cardiovascular risk. PMID 16843445'],
                        ['Lipidology', 'Nordestgaard BG (2016). Triglyceride-rich lipoproteins. PMID 27918805'],
                        ['Cardiology', 'Sniderman AD et al. (2019). ApoB and cardiovascular risk. JAMA Cardiol. PMID 30584050'],
                        ['Endocrinology', 'Holick MF et al. Vitamin D recommendations. PMID 21646368'],
                        ['Endocrinology', 'Garber JR et al. AACE/ETA thyroid guidelines. PMID 22961224'],
                        ['Metabolic health', 'Tirosh A et al. (2011). Fasting glucose and mortality. PMID 21220444'],
                        ['Longevity science', 'Centenarian studies, fasting insulin in long-lived populations. PMID 12970313'],
                        ['Neurology', 'Smith AD et al. (2010). Homocysteine lowering by B vitamins. PMID 20838622'],
                        ['Longevity science', 'Milman S et al. (2014). Low IGF-1 and longevity. PMID 24719268'],
                        ['Nutrition science', 'Mifflin MD et al. (1990). Predictive equation for resting energy expenditure'],
                        ['Public health', 'WHO Physical Activity Guidelines (2020)'],
                        ['Sports medicine', 'ACSM Guidelines for Exercise Testing and Prescription, 11th Edition'],
                        ['Epidemiology', 'Ekelund U et al. (2016). Physical activity and sitting time. Lancet'],
                        ['Nephrology', 'KDIGO clinical practice guidelines'],
                        ['Hepatology', 'NAFLD research and clinical chemistry literature'],
                      ].map(([domain, ref], i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                          <td className="px-4 py-2.5 font-bold text-[#0F172A] whitespace-nowrap align-top">{domain}</td>
                          <td className="px-4 py-2.5 text-[11px] leading-relaxed">{ref}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TableWrapper>
              </div>
            </section>


            {/* ───────────────────────────────────
               §15  MEDICAL DISCLAIMER
               ─────────────────────────────────── */}
            <section>
              <SectionAnchor id="disclaimer" />
              <div className="space-y-6">
                <div className="space-y-2">
                  <Eyebrow>SECTION 15</Eyebrow>
                  <SectionHeading>Medical Disclaimer</SectionHeading>
                </div>

                <div className="p-6 sm:p-8 bg-[#FEF2F2] border-2 border-red-200 rounded-[2px] space-y-4">
                  <p className="font-display font-extrabold text-base text-[#0F172A]">
                    Nostavia Health is not a medical device. It is not intended to diagnose, treat, cure or prevent any disease.
                  </p>
                  <div className="space-y-3 text-xs text-[#475569] font-body leading-relaxed">
                    <p>
                      All scores, ranges and insights are generated from self-reported information, consumer-grade wearable devices and laboratory results provided by the user or their care provider. They are intended for informational and educational purposes and are not a substitute for professional medical diagnosis, treatment or advice.
                    </p>
                    <ul className="space-y-2 pl-1">
                      {[
                        'Biological age is an estimate derived from biomarker deviation modelling. It is not a clinically validated measurement of epigenetic age.',
                        'Wearable-derived scores are approximations based on published physiological models, not direct medical measurements.',
                        'AI-generated explanations, nutrition analysis and protocol suggestions may contain errors.',
                        'Emergency language detection is a supplementary safety feature and must never be relied upon as a primary emergency system. In an emergency, contact your local emergency services immediately.',
                      ].map((text, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-red-400 flex-shrink-0 mt-0.5">•</span>
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="font-semibold text-[#0F172A]">
                      Always consult a qualified healthcare professional before making any decision based on information from this platform. Where Nostavia is delivered under a partner brand, the partner institution's clinical governance and terms of care apply in addition to this notice.
                    </p>
                  </div>
                </div>
              </div>
            </section>


            {/* ───────────────────────────────────
               §16  DOCUMENT CONTROL
               ─────────────────────────────────── */}
            <section>
              <SectionAnchor id="document-control" />
              <div className="space-y-4">
                <div className="space-y-2">
                  <Eyebrow>SECTION 16</Eyebrow>
                  <SectionHeading>Document Control</SectionHeading>
                </div>

                <Card className="space-y-2">
                  <p className="text-xs text-[#475569] font-body leading-relaxed">
                    This document is reviewed alongside material changes to the platform's clinical logic. Questions about any algorithm, threshold or reference described here — including from clinicians evaluating Nostavia on behalf of an institution — can be directed to our clinical team.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-[#64748B]">
                    <span className="font-bold text-[#0F172A]">Version 1.0</span>
                    <span className="text-[#E2E8F0]">|</span>
                    <span>August 2026</span>
                    <span className="text-[#E2E8F0]">|</span>
                    <span>© 2026 Nostavia Technologies Pvt. Ltd.</span>
                  </div>
                </Card>
              </div>
            </section>


            {/* ═══════════════════════════════════
               FOOTER CTA
               ═══════════════════════════════════ */}
            <div className="p-12 sm:p-16 lg:p-20 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2 max-w-2xl text-center md:text-left">
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  Request Clinical Advisory Specifications &amp; Governance Protocol
                </h3>
                <p className="text-sm text-slate-300 font-body leading-relaxed">
                  Review detailed clinical validation methodology with our medical directors. Full parameter sets available under NDA.
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
          {/* end content column */}

        </div>
        {/* end grid */}
      </div>
      {/* end max-w container */}

    </div>
  );
};
