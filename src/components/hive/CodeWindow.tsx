import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../../lib/cn';
import { EASE } from '../ui/motion';

/* Illustrative calls, not the published API reference. Captioned where shown. */

type Tok = readonly [kind: 'c' | 'k' | 's' | 'f' | 't' | 'n', text: string];

const examples: Record<string, { file: string; lines: Tok[][] }> = {
  TypeScript: {
    file: 'smart-report.ts',
    lines: [
      [['k', 'import '], ['t', '{ Nostavia } '], ['k', 'from '], ['s', "'@nostavia/sdk'"]],
      [],
      [['k', 'const '], ['t', 'nostavia = '], ['k', 'new '], ['f', 'Nostavia'], ['t', '({ apiKey: process.env.'], ['n', 'NOSTAVIA_KEY'], ['t', ' })']],
      [],
      [['c', '// Decode a lab PDF into a report under your brand']],
      [['k', 'const '], ['t', 'report = '], ['k', 'await '], ['t', 'nostavia.reports.'], ['f', 'decode'], ['t', '(file, {']],
      [['t', '  brand: '], ['s', "'Your Lab'"], ['t', ',']],
      [['t', '  language: '], ['s', "'en'"], ['t', ',']],
      [['t', '})']],
    ],
  },
  Python: {
    file: 'smart_report.py',
    lines: [
      [['k', 'from '], ['t', 'nostavia '], ['k', 'import '], ['t', 'Nostavia']],
      [],
      [['t', 'nostavia = '], ['f', 'Nostavia'], ['t', '(api_key=os.environ['], ['s', '"NOSTAVIA_KEY"'], ['t', '])']],
      [],
      [['c', '# Decode a lab PDF into a report under your brand']],
      [['t', 'report = nostavia.reports.'], ['f', 'decode'], ['t', '(']],
      [['t', '    file, brand='], ['s', '"Your Lab"'], ['t', ', language='], ['s', '"en"']],
      [['t', ')']],
      [],
    ],
  },
  cURL: {
    file: 'terminal',
    lines: [
      [['f', 'curl '], ['t', 'https://api.nostaviahealth.com/v1/reports/decode \\']],
      [['t', '  -H '], ['s', '"Authorization: Bearer $NOSTAVIA_KEY"'], ['t', ' \\']],
      [['t', '  -F '], ['s', '"file=@panel.pdf"'], ['t', ' \\']],
      [['t', '  -F '], ['s', '"brand=Your Lab"']],
      [],
      [],
      [],
      [],
      [],
    ],
  },
};

const tok: Record<Tok[0], string> = {
  c: 'text-[#F2EDE3]/35 italic',
  k: 'text-[#F2D27A]',
  s: 'text-[#B7DCA4]',
  f: 'text-[#9CC7E8]',
  n: 'text-[#E8A98C]',
  t: 'text-[#F2EDE3]/85',
};

const markers = [
  { name: 'HbA1c', value: '5.4 %', verdict: 'In range' },
  { name: 'Vitamin D', value: '18 ng/mL', verdict: 'Outlier' },
  { name: 'HDL cholesterol', value: '58 mg/dL', verdict: 'Optimal' },
];

const verdictClass: Record<string, string> = {
  Optimal: 'text-[#9FD8A8] border-[#9FD8A8]/25',
  'In range': 'text-[#F2EDE3]/60 border-white/10',
  Outlier: 'text-[#F2D27A] border-[#F2D27A]/30',
};

export const CodeWindow: React.FC<{ className?: string }> = ({ className }) => {
  const tabs = Object.keys(examples);
  const [tab, setTab] = useState(tabs[0]);
  const ex = examples[tab];

  return (
    <figure className={cn('relative', className)}>
      <div className="rounded-[18px] border border-white/[0.09] bg-[#0E0C0A] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)] overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/[0.07] pl-2 pr-4">
          <div role="tablist" aria-label="Code language" className="flex">
            {tabs.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={cn('relative h-11 px-3.5 text-[12.5px] transition-colors', tab === t ? 'text-[#F2EDE3]' : 'text-[#F2EDE3]/45 hover:text-[#F2EDE3]/80')}
              >
                {t}
                {tab === t && <motion.span layoutId="code-tab" className="absolute inset-x-3 -bottom-px h-px bg-[#F2D27A]" />}
              </button>
            ))}
          </div>
          <span className="font-mono text-[11px] text-[#F2EDE3]/35">{ex.file}</span>
        </div>
        <div className="relative px-5 py-5 font-mono text-[12.5px] leading-[1.75] min-h-[17.5rem] overflow-x-auto">
          <AnimatePresence mode="wait">
            <motion.pre key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="whitespace-pre">
              {ex.lines.map((line, i) => (
                <div key={i} className="flex">
                  <span aria-hidden="true" className="w-7 shrink-0 select-none text-[#F2EDE3]/20 tabular-nums">{line.length ? i + 1 : ''}</span>
                  <code>
                    {line.length === 0 ? ' ' : line.map(([k, text], j) => (
                      <span key={j} className={tok[k]}>
                        {text}
                      </span>
                    ))}
                  </code>
                </div>
              ))}
            </motion.pre>
          </AnimatePresence>
        </div>
        <div className="border-t border-white/[0.07] bg-white/[0.015] px-5 py-4">
          <p className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#F2EDE3]/40">
            <span>Response</span>
            <span className="text-[#9FD8A8]/80">200 OK</span>
          </p>
          <ul className="mt-3 divide-y divide-white/[0.06]">
            {markers.map((m) => (
              <li key={m.name} className="flex items-center justify-between py-2 text-[13px]">
                <span className="text-[#F2EDE3]/80">{m.name}</span>
                <span className="flex items-center gap-3">
                  <span className="text-[#F2EDE3] tabular-nums">{m.value}</span>
                  <span className={cn('w-[70px] text-center rounded-full border px-2 py-0.5 text-[10.5px]', verdictClass[m.verdict])}>{m.verdict}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mt-4 font-mono text-[11px] tracking-[0.04em] text-fg/35">Illustrative call and sample response. Full reference in the SDK Portal.</figcaption>
    </figure>
  );
};
