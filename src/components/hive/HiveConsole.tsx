import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { Check, ChevronDown, Inbox, LayoutGrid, Search, Settings2, Sun } from 'lucide-react';
import { approvals as approvalPool, beeTasks, running, SAMPLE_CAPTION, type BeeTask, type Source } from '../../content/hive';
import { STUDIO } from '../../content/site';
import { cn } from '../../lib/cn';
import { BeeGlyph, HiveMark } from '../ui/marks';
import { EASE } from '../ui/motion';

/* ─────────────────────────────────────────────────────────────────────────────
 * Illustrative Hive window. Sample data only; captioned wherever it renders.
 * Drawn at a fixed design size and scaled to fit, like a live screenshot.
 * ──────────────────────────────────────────────────────────────────────────── */

const FULL = { w: 1180, h: 720 };
const COMPACT = { w: 440, h: 700 };

const sourceLabel = (s: Source) => (s === 'studio' ? STUDIO : 'Human OS');

const Spark: React.FC<{ d: string }> = ({ d }) => (
  <svg viewBox="0 0 80 24" className="w-[72px] h-6" aria-hidden="true">
    <defs>
      <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#F2D27A" stopOpacity="0.28" />
        <stop offset="1" stopColor="#F2D27A" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d={`${d} L80 24 L0 24 Z`} fill="url(#spark-fill)" />
    <path d={d} fill="none" stroke="#F2D27A" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const sparks = [
  'M0 18 L10 16 L20 17 L30 12 L40 13 L50 9 L60 10 L70 6 L80 4',
  'M0 14 L10 15 L20 10 L30 12 L40 8 L50 11 L60 7 L70 8 L80 5',
  'M0 20 L10 19 L20 15 L30 16 L40 14 L50 12 L60 13 L70 9 L80 8',
];

interface FeedItem extends BeeTask {
  id: number;
}

const useLiveHive = (active: boolean) => {
  const [feed, setFeed] = useState<FeedItem[]>(() => beeTasks.slice(0, 6).map((t, i) => ({ ...t, id: i })));
  const [queue, setQueue] = useState(() => approvalPool.slice(0, 3).map((a, i) => ({ ...a, id: i, done: false })));
  const [metrics, setMetrics] = useState({ reports: 128, calls: 64, retests: 19 });
  const counter = useRef({ task: 6, approval: 3 });

  useEffect(() => {
    if (!active) return;
    const feedTimer = window.setInterval(() => {
      const c = counter.current;
      const next = beeTasks[c.task % beeTasks.length];
      const id = c.task++;
      setFeed((f) => [{ ...next, id }, ...f].slice(0, 7));
      setMetrics((m) => ({
        reports: m.reports + (next.runs === 'Smart Reports' ? 14 : 1),
        calls: m.calls + (next.runs === 'AI Voice Agent' ? 1 : 0),
        retests: m.retests + (next.runs === 'Re-Test Recall Engine' ? 3 : 0),
      }));
    }, 2600);

    const approveTimer = window.setInterval(() => {
      setQueue((q) => q.map((a, i) => (i === 0 ? { ...a, done: true } : a)));
      window.setTimeout(() => {
        const c = counter.current;
        const next = approvalPool[c.approval % approvalPool.length];
        const id = c.approval++;
        setQueue((q) => [...q.slice(1), { ...next, id, done: false }]);
      }, 1100);
    }, 5600);

    return () => {
      window.clearInterval(feedTimer);
      window.clearInterval(approveTimer);
    };
  }, [active]);

  return { feed, queue, metrics };
};

const Metric: React.FC<{ label: string; value: number; delta: string; spark?: string; highlight?: boolean }> = ({ label, value, delta, spark, highlight }) => (
  <div className={cn('rounded-xl border p-3.5 flex flex-col gap-2', highlight ? 'border-[#F2D27A]/30 bg-[#F2D27A]/[0.06]' : 'border-white/[0.07] bg-white/[0.02]')}>
    <span className="text-[11.5px] text-[#F2EDE3]/50">{label}</span>
    <div className="flex items-end justify-between gap-2">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className={cn('text-[26px] leading-none tracking-[-0.03em] tabular-nums', highlight ? 'text-[#F2D27A]' : 'text-[#F2EDE3]')}
        >
          {value}
        </motion.span>
      </AnimatePresence>
      {spark ? <Spark d={spark} /> : <span className="text-[11px] text-[#F2D27A]/80">needs you</span>}
    </div>
    <span className="text-[11px] text-[#F2EDE3]/40">{delta}</span>
  </div>
);

const FeedRow: React.FC<{ item: FeedItem; index: number }> = ({ item, index }) => (
  <motion.li
    layout
    initial={{ opacity: 0, y: -14, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6, ease: EASE }}
    className="flex items-start gap-3 py-2.5 border-b border-white/[0.05] last:border-0"
  >
    <span className={cn('mt-0.5 shrink-0', item.source === 'studio' ? 'text-[#E7E0D2]' : 'text-[#F2D27A]')}>
      <BeeGlyph className="w-[15px] h-[15px]" />
    </span>
    <div className="min-w-0 flex-1">
      <p className="text-[12.5px] leading-snug text-[#F2EDE3]/90 truncate">{item.text}</p>
      <p className="mt-1 flex items-center gap-1.5 text-[11px] text-[#F2EDE3]/40">
        <span>{item.runs}</span>
        <span className="h-[3px] w-[3px] rounded-full bg-white/20" />
        <span className={item.source === 'studio' ? 'text-[#E7E0D2]/70' : 'text-[#F2D27A]/70'}>{sourceLabel(item.source)}</span>
      </p>
    </div>
    <span className="shrink-0 text-[11px] text-[#F2EDE3]/35 tabular-nums">{index === 0 ? 'now' : `${index * 2}m`}</span>
  </motion.li>
);

const ApprovalRow = React.forwardRef<HTMLLIElement, { a: { title: string; detail: string; kind: string; done: boolean }; compact?: boolean }>(({ a, compact }, ref) => (
  <motion.li
    ref={ref}
    layout
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, x: 24, transition: { duration: 0.35 } }}
    transition={{ duration: 0.55, ease: EASE }}
    className={cn('rounded-xl border p-3 transition-colors duration-500', a.done ? 'border-[#9FD8A8]/30 bg-[#9FD8A8]/[0.05]' : 'border-white/[0.07] bg-white/[0.02]')}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[12.5px] text-[#F2EDE3]/90 leading-snug">{a.title}</p>
        <p className="mt-1 text-[11px] text-[#F2EDE3]/40 truncate">{a.detail}</p>
      </div>
      <span className="shrink-0 rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-[#F2EDE3]/55">{a.kind}</span>
    </div>
    {!compact && (
      <div className="mt-3 flex items-center gap-2">
        {a.done ? (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-[#9FD8A8]/15 px-2.5 py-1 text-[11px] text-[#9FD8A8]">
            <Check className="w-3 h-3" /> Approved by a clinician
          </span>
        ) : (
          <>
            <span className="rounded-md bg-[#F2D27A] px-2.5 py-1 text-[11px] font-medium text-[#0B0A08]">Approve</span>
            <span className="rounded-md border border-white/10 px-2.5 py-1 text-[11px] text-[#F2EDE3]/70">Review</span>
          </>
        )}
      </div>
    )}
  </motion.li>
));
ApprovalRow.displayName = 'ApprovalRow';

const Sidebar: React.FC = () => (
  <aside className="w-[214px] shrink-0 border-r border-white/[0.06] bg-[#0C0B09] p-3 flex flex-col">
    <div className="flex items-center gap-2 px-1.5 py-1.5">
      <HiveMark className="w-[18px] h-[18px] text-[#F2D27A]" />
      <span className="text-[13.5px] font-medium text-[#F2EDE3]">Hive</span>
    </div>
    <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-2 py-1.5">
      <span className="grid h-5 w-5 place-items-center rounded-[5px] bg-[#E7E0D2] text-[9px] font-semibold text-[#0B0A08]">SL</span>
      <span className="flex-1 text-[12px] text-[#F2EDE3]/80 truncate">Sample Health Labs</span>
      <ChevronDown className="w-3.5 h-3.5 text-[#F2EDE3]/40" />
    </div>
    <div className="mt-3 flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12px] text-[#F2EDE3]/35">
      <Search className="w-3.5 h-3.5" />
      <span className="flex-1">Search or ask a Bee</span>
      <span className="rounded border border-white/10 px-1 text-[10px]">⌘K</span>
    </div>
    <nav className="mt-3 flex flex-col gap-0.5 text-[12.5px]">
      {[
        { icon: Sun, label: 'Today', active: true },
        { icon: Inbox, label: 'Needs a person', badge: '3' },
        { icon: LayoutGrid, label: 'Bees', badge: '6' },
      ].map((n) => (
        <span key={n.label} className={cn('flex items-center gap-2.5 rounded-lg px-2 py-1.5', n.active ? 'bg-white/[0.06] text-[#F2EDE3]' : 'text-[#F2EDE3]/55')}>
          <n.icon className="w-3.5 h-3.5" />
          <span className="flex-1">{n.label}</span>
          {n.badge && <span className="text-[10.5px] text-[#F2EDE3]/40 tabular-nums">{n.badge}</span>}
        </span>
      ))}
    </nav>
    <p className="mt-5 px-2 text-[10px] uppercase tracking-[0.12em] text-[#F2EDE3]/30 font-mono">Running in this Hive</p>
    <ul className="mt-2 flex flex-col gap-0.5 text-[12px]">
      {running.map((r) => (
        <li key={r.name} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[#F2EDE3]/60">
          <span className={cn('h-1.5 w-1.5 rounded-full', r.source === 'studio' ? 'bg-[#E7E0D2]' : 'bg-[#F2D27A]')} />
          <span className="flex-1 truncate">{r.name}</span>
          <span className="text-[9.5px] text-[#F2EDE3]/30">{r.source === 'studio' ? STUDIO : 'OS'}</span>
        </li>
      ))}
    </ul>
    <div className="mt-auto flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[12px] text-[#F2EDE3]/45">
      <Settings2 className="w-3.5 h-3.5" /> Settings
    </div>
  </aside>
);

const Topbar: React.FC<{ compact?: boolean }> = ({ compact }) => (
  <div className="h-12 shrink-0 border-b border-white/[0.06] px-4 flex items-center justify-between">
    <div className="flex items-center gap-2 text-[12.5px]">
      {compact && <HiveMark className="w-4 h-4 text-[#F2D27A] mr-1" />}
      <span className="text-[#F2EDE3]">Today</span>
      <span className="text-[#F2EDE3]/30">/</span>
      <span className="text-[#F2EDE3]/45">Thursday</span>
    </div>
    <div className="flex items-center gap-3">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-[#F2EDE3]/70">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 rounded-full bg-[#9FD8A8] animate-ping2" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-[#9FD8A8]" />
        </span>
        6 Bees working
      </span>
      {!compact && (
        <span className="flex -space-x-1.5">
          {['#E7E0D2', '#B98E35', '#5C5650'].map((c) => (
            <span key={c} className="h-6 w-6 rounded-full border-2 border-[#100E0C]" style={{ background: c }} />
          ))}
        </span>
      )}
    </div>
  </div>
);

export const HiveConsole: React.FC<{ className?: string; caption?: boolean }> = ({ className, caption = true }) => {
  const outer = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const reduce = useReducedMotion();
  const inView = useInView(outer, { margin: '0px 0px -10% 0px' });
  const { feed, queue, metrics } = useLiveHive(inView && !reduce);

  useLayoutEffect(() => {
    const el = outer.current!;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  const compact = width > 0 && width < 720;
  const size = compact ? COMPACT : FULL;
  const scale = width ? Math.min(1, width / size.w) : 1;
  const waiting = queue.filter((a) => !a.done).length;

  return (
    <figure className={cn('relative', className)}>
      <div ref={outer} className="relative w-full" style={{ height: width ? size.h * scale : undefined, aspectRatio: width ? undefined : `${FULL.w}/${FULL.h}` }}>
        <div
          role="img"
          aria-label="Illustrative Hive view with sample data: Bees sending lab reports, answering calls and inviting patients back, with clinical items waiting for a person to approve."
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: size.w, height: size.h, transform: `scale(${scale})`, visibility: width ? 'visible' : 'hidden' }}
        >
          <div aria-hidden="true" className="flex h-full w-full overflow-hidden rounded-[16px] border border-white/[0.09] bg-[#100E0C] text-left font-sans shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9),0_0_0_1px_rgba(0,0,0,0.6)]">
            {!compact && <Sidebar />}
            <div className="flex-1 min-w-0 flex flex-col">
              <Topbar compact={compact} />
              <div className={cn('flex-1 min-h-0 p-4 flex flex-col gap-4', !compact && 'p-5')}>
                <div className={cn('grid gap-3', compact ? 'grid-cols-2' : 'grid-cols-4')}>
                  <Metric label="Reports sent" value={metrics.reports} delta="Smart Reports" spark={sparks[0]} />
                  <Metric label="Calls answered" value={metrics.calls} delta="AI Voice Agent" spark={sparks[1]} />
                  <Metric label="Re-tests booked" value={metrics.retests} delta="Re-Test Recall Engine" spark={sparks[2]} />
                  <Metric label="Waiting for a person" value={waiting} delta="Clinical items" highlight />
                </div>
                <div className={cn('flex-1 min-h-0 grid gap-4', compact ? 'grid-cols-1 grid-rows-[1fr_auto]' : 'grid-cols-[1.5fr_1fr]')}>
                  <section className="min-h-0 rounded-xl border border-white/[0.07] bg-white/[0.015] px-4 pt-3 overflow-hidden flex flex-col">
                    <header className="flex items-center justify-between pb-2">
                      <span className="text-[12.5px] text-[#F2EDE3]">Bee activity</span>
                      <span className="text-[11px] text-[#F2EDE3]/40">Human OS and {STUDIO}, one feed</span>
                    </header>
                    <ul className="relative flex-1 overflow-hidden mask-fade-b">
                      <AnimatePresence initial={false}>
                        {feed.slice(0, compact ? 5 : 7).map((item, i) => (
                          <FeedRow key={item.id} item={item} index={i} />
                        ))}
                      </AnimatePresence>
                    </ul>
                  </section>
                  <section className="min-h-0 rounded-xl border border-white/[0.07] bg-white/[0.015] p-4 flex flex-col overflow-hidden">
                    <header className="flex items-center justify-between pb-3">
                      <span className="text-[12.5px] text-[#F2EDE3]">Needs a person</span>
                      <span className="text-[11px] text-[#F2D27A]/80 tabular-nums">{waiting} waiting</span>
                    </header>
                    <ul className="flex flex-col gap-2.5">
                      <AnimatePresence initial={false} mode="popLayout">
                        {queue.slice(0, compact ? 1 : 3).map((a) => (
                          <ApprovalRow key={a.id} a={a} compact={compact} />
                        ))}
                      </AnimatePresence>
                    </ul>
                    {!compact && <p className="mt-auto pt-3 text-[11px] leading-relaxed text-[#F2EDE3]/35">Anything clinical waits here. A Bee drafts it, a person decides.</p>}
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {caption && <figcaption className="mt-4 text-center font-mono text-[11px] tracking-[0.04em] text-fg/35">{SAMPLE_CAPTION}</figcaption>}
    </figure>
  );
};
