import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { Check, FileText, Pause, Play } from 'lucide-react';
import { cn } from '../../lib/cn';
import { BeeAvatar } from './HiveConsole';
import { EASE } from '../ui/motion';

/* ─────────────────────────────────────────────────────────────────────────────
 * One Bee, one job: a lab report from arrival to the patient, with a person
 * approving the clinical part. Sample data. Steps are buttons, autoplay pauses
 * on interaction, and an aria-live region narrates each step.
 * ──────────────────────────────────────────────────────────────────────────── */

const steps = [
  { verb: 'Receive', line: 'A lab report arrives from your system.', log: 'Received panel_4821.pdf' },
  { verb: 'Read', line: 'The Bee reads every marker against local ranges.', log: 'Read 38 markers with Smart Reports' },
  { verb: 'Check', line: 'One marker is outside the usual range.', log: 'Flagged ferritin, above range' },
  { verb: 'Draft', line: 'It drafts a plain-language summary for the patient.', log: 'Drafted patient summary' },
  { verb: 'Ask', line: 'Because it is clinical, a clinician approves it first.', log: 'Approved by a clinician' },
  { verb: 'Send', line: 'It goes to the patient under your name.', log: 'Sent to patient as Sample Lab' },
  { verb: 'Log', line: 'Every step is written down, so you can see what happened.', log: 'Run complete' },
];

const times = ['09:41:02', '09:41:04', '09:41:05', '09:41:07', '09:52:30', '09:52:31', '09:52:31'];

const markers = [
  { name: 'Haemoglobin', value: '13.8', unit: 'g/dL', verdict: 'In range' },
  { name: 'HbA1c', value: '5.4', unit: '%', verdict: 'In range' },
  { name: 'LDL cholesterol', value: '96', unit: 'mg/dL', verdict: 'Optimal' },
  { name: 'Ferritin', value: '412', unit: 'ng/mL', verdict: 'Outlier' },
  { name: 'Vitamin B12', value: '388', unit: 'pg/mL', verdict: 'In range' },
];

const summary =
  'Most of your results are within the usual range. Your ferritin is higher than usual, so we have asked your doctor to look at it. They will explain what it means and any next steps.';

const scene = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

const Markers: React.FC<{ flag: boolean }> = ({ flag }) => (
  <ul className="divide-y divide-white/[0.06]">
    {markers.map((m, i) => {
      const out = m.verdict === 'Outlier';
      return (
        <motion.li
          key={m.name}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0, transition: { delay: flag ? 0 : i * 0.12, duration: 0.4 } }}
          className={cn('flex items-center justify-between px-3 py-2.5 text-[13px] rounded-lg transition-colors duration-500', flag && out && 'bg-[#F2D27A]/[0.08] ring-1 ring-[#F2D27A]/30')}
        >
          <span className="text-[#F2EDE3]/80">{m.name}</span>
          <span className="flex items-center gap-3">
            <span className="tabular-nums text-[#F2EDE3]">
              {m.value} <span className="text-[#F2EDE3]/40 text-[11px]">{m.unit}</span>
            </span>
            <span
              className={cn(
                'w-[68px] text-center rounded-full border px-2 py-0.5 text-[10.5px]',
                out ? 'text-[#F2D27A] border-[#F2D27A]/35' : m.verdict === 'Optimal' ? 'text-[#9FD8A8] border-[#9FD8A8]/25' : 'text-[#F2EDE3]/55 border-white/10',
              )}
            >
              {m.verdict}
            </span>
          </span>
        </motion.li>
      );
    })}
  </ul>
);

const Stage: React.FC<{ step: number }> = ({ step }) => {
  if (step === 0)
    return (
      <motion.div key="s0" {...scene} className="flex flex-col items-center justify-center h-full gap-5">
        <div className="w-[240px] rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#F2EDE3]/[0.06]">
              <FileText className="w-5 h-5 text-[#F2EDE3]/70" />
            </span>
            <div>
              <p className="text-[13px] text-[#F2EDE3]">panel_4821.pdf</p>
              <p className="text-[11px] text-[#F2EDE3]/40">Lipid, CBC, iron · 2 pages</p>
            </div>
          </div>
          <div className="mt-4 h-1 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div className="h-full bg-[#F2D27A]" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 1.8, ease: 'easeInOut' }} />
          </div>
        </div>
        <p className="font-mono text-[11px] text-[#F2EDE3]/40">Patient 4821 · from your lab system</p>
      </motion.div>
    );
  if (step === 1 || step === 2)
    return (
      <motion.div key="s12" {...scene} className="h-full flex flex-col justify-center">
        <Markers flag={step === 2} />
        <AnimatePresence>
          {step === 2 && (
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 px-3 font-mono text-[11px] text-[#F2D27A]/90">
              Ferritin 412 ng/mL is above the local range. Clinical, so a person decides.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    );
  if (step === 3)
    return (
      <motion.div key="s3" {...scene} className="h-full flex flex-col justify-center">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#F2EDE3]/40">Draft for the patient</p>
        <p className="mt-3 text-[15px] leading-relaxed text-[#F2EDE3]/90">
          {summary.split(' ').map((w, i) => (
            <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.035 }}>
              {w}{' '}
            </motion.span>
          ))}
        </p>
      </motion.div>
    );
  if (step === 4)
    return (
      <motion.div key="s4" {...scene} className="h-full flex flex-col justify-center">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[13.5px] text-[#F2EDE3]">Report summary with an outlier</p>
              <p className="mt-1 text-[11.5px] text-[#F2EDE3]/45">Patient 4821 · ferritin above range</p>
            </div>
            <span className="rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-[#F2EDE3]/55">Clinical</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <motion.span
              initial={{ backgroundColor: 'rgba(242,210,122,1)', color: '#0B0A08' }}
              animate={{ backgroundColor: 'rgba(159,216,168,0.15)', color: '#9FD8A8' }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11.5px] font-medium"
            >
              <Check className="w-3 h-3" /> Approved
            </motion.span>
            <span className="text-[11.5px] text-[#F2EDE3]/45">by a clinician</span>
          </div>
        </div>
        <p className="mt-4 font-mono text-[11px] text-[#F2EDE3]/40">Bees do not diagnose. They prepare; people decide.</p>
      </motion.div>
    );
  if (step === 5)
    return (
      <motion.div key="s5" {...scene} className="h-full flex flex-col items-center justify-center">
        <div className="w-full max-w-[300px] rounded-[22px] border border-white/10 bg-[#0B0A08] p-4">
          <p className="text-center text-[11px] text-[#F2EDE3]/40">Sample Lab</p>
          <motion.div initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.3, duration: 0.5, ease: EASE }} className="mt-3 rounded-2xl rounded-tl-md bg-white/[0.06] p-3 text-[12.5px] leading-relaxed text-[#F2EDE3]/90">
            {summary}
          </motion.div>
          <p className="mt-2 text-right text-[10.5px] text-[#9FD8A8]/80">Delivered</p>
        </div>
      </motion.div>
    );
  return (
    <motion.div key="s6" {...scene} className="h-full flex flex-col justify-center">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#F2EDE3]/40">Run log</p>
      <ul className="mt-3 flex flex-col gap-1.5 font-mono text-[11.5px]">
        {steps.map((s, i) => (
          <li key={s.verb} className="flex gap-3">
            <span className="text-[#F2EDE3]/35 tabular-nums">{times[i]}</span>
            <span className={i === 4 ? 'text-[#9FD8A8]' : 'text-[#F2EDE3]/80'}>{s.log}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export const BeeRun: React.FC<{ className?: string }> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { margin: '0px 0px -20% 0px' });
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(!reduce);

  useEffect(() => {
    if (!playing || !inView) return;
    const t = window.setTimeout(() => setStep((s) => (s + 1) % steps.length), step === steps.length - 1 ? 4200 : 3200);
    return () => window.clearTimeout(t);
  }, [step, playing, inView]);

  const go = (i: number) => {
    setStep(i);
    setPlaying(false);
  };

  return (
    <div ref={ref} className={cn('grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch', className)}>
      <div className="lg:col-span-5 flex flex-col">
        <ol className="flex flex-col border-t border-fg/10" aria-label="Steps in this run">
          {steps.map((s, i) => (
            <li key={s.verb} className="border-b border-fg/10">
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={i === step ? 'step' : undefined}
                className="group w-full grid grid-cols-[2.25rem_6rem_1fr] items-baseline gap-2 py-3.5 text-left"
              >
                <span className={cn('font-mono text-[11.5px] transition-colors', i === step ? 'text-accent' : 'text-fg/30')}>{String(i + 1).padStart(2, '0')}</span>
                <span className={cn('text-[17px] tracking-[-0.015em] transition-colors', i === step ? 'text-fg' : 'text-fg/45 group-hover:text-fg/75')}>{s.verb}</span>
                <span className={cn('text-[14px] leading-snug transition-colors', i === step ? 'text-fg/70' : 'text-fg/30')}>{s.line}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex items-center gap-2 rounded-full border border-fg/15 px-3.5 h-9 text-[13px] text-fg/80 hover:border-fg/40 transition-colors"
          >
            {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {playing ? 'Pause' : 'Play'}
          </button>
          <span className="font-mono text-[11px] text-fg/35">Sample run · not a real patient</span>
        </div>
      </div>

      <div className="lg:col-span-7 rounded-[18px] border border-white/[0.09] bg-[#100E0C] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-4 h-11">
          <span className="flex items-center gap-2.5 text-[12.5px] text-[#F2EDE3]">
            <BeeAvatar id="reports" size={26} /> A Bee at work · Reports
          </span>
          <span className="flex items-center gap-3">
            <span className="rounded-md border border-[#F2D27A]/40 bg-[#F2D27A]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#F2D27A]">Sample data</span>
            <span className="font-mono text-[11px] text-[#F2EDE3]/40 tabular-nums">
              {String(step + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
            </span>
          </span>
        </div>
        <div className="relative px-6 py-6 h-[340px]">
          <AnimatePresence mode="wait">
            <Stage step={step} />
          </AnimatePresence>
        </div>
        <div className="border-t border-white/[0.07] px-4 py-3 h-[92px] overflow-hidden">
          <ul className="flex flex-col-reverse gap-1 font-mono text-[11px]">
            {steps.slice(0, step + 1).map((s, i) => (
              <motion.li key={s.verb} initial={{ opacity: 0 }} animate={{ opacity: i === step ? 1 : 0.45 }} className="flex gap-3 text-[#F2EDE3]/80">
                <span className="text-[#F2EDE3]/35 tabular-nums">{times[i]}</span>
                {s.log}
              </motion.li>
            ))}
          </ul>
        </div>
        {/* Narrate only when the visitor is driving, so autoplay does not talk over them */}
        <p className="sr-only" aria-live="polite">
          {!playing && `Step ${step + 1} of ${steps.length}: ${steps[step].verb}. ${steps[step].line}`}
        </p>
      </div>
    </div>
  );
};
