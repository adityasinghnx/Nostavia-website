import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { ArrowUp, Check, ChevronDown, History, Inbox, LayoutGrid, MessageSquare, Settings2 } from 'lucide-react';
import { activity as activityPool, approvals as approvalPool, chatScript, SAMPLE_CAPTION, SAMPLE_LABEL, type ChatTurn } from '../../content/hive';
import { beeImage, getBee, type BeeId } from '../../content/bees';
import { cn } from '../../lib/cn';
import { HiveMark } from '../ui/marks';
import { EASE } from '../ui/motion';

/* ─────────────────────────────────────────────────────────────────────────────
 * Illustrative Hive: a chat-first workspace. Sample data, labelled inside the
 * view so the label travels with any screenshot. Drawn at a fixed design size
 * and scaled to fit.
 * ──────────────────────────────────────────────────────────────────────────── */

const FULL = { w: 1180, h: 720 };
const COMPACT = { w: 440, h: 700 };

const sidebarBees: { id: BeeId; state: 'working' | 'waiting' | 'idle' }[] = [
  { id: 'reports', state: 'working' },
  { id: 'recall', state: 'waiting' },
  { id: 'questions', state: 'working' },
  { id: 'entry', state: 'working' },
  { id: 'bookings', state: 'idle' },
];

const modeOf = (t: ChatTurn | undefined) => (!t ? 0 : t.kind === 'approval' ? 2 : t.kind === 'you' && /every|schedule/i.test(t.text) ? 1 : 0);

export const BeeAvatar: React.FC<{ id: BeeId; size?: number; className?: string }> = ({ id, size = 22, className }) => (
  <span className={cn('relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full', className)} style={{ width: size, height: size, background: `${getBee(id).color}26` }}>
    <img src={beeImage(id, true)} alt="" className="h-[118%] w-[118%] max-w-none object-contain translate-y-[6%]" draggable={false} />
  </span>
);

const useConversation = (active: boolean, reduce: boolean) => {
  const [shown, setShown] = useState(reduce ? chatScript.length : 0);
  const [typing, setTyping] = useState(false);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    if (!active || reduce) return;
    let t: number;
    if (shown < chatScript.length) {
      const next = chatScript[shown];
      if (next.kind === 'hive') {
        setTyping(true);
        t = window.setTimeout(() => {
          setTyping(false);
          setShown((s) => s + 1);
        }, 1300);
      } else {
        t = window.setTimeout(() => setShown((s) => s + 1), shown === 0 ? 700 : 1500);
      }
    } else if (!approved) {
      t = window.setTimeout(() => setApproved(true), 2200);
    } else {
      t = window.setTimeout(() => {
        setShown(0);
        setApproved(false);
      }, 4200);
    }
    return () => window.clearTimeout(t);
  }, [active, reduce, shown, approved]);

  return { shown, typing, approved };
};

const useActivity = (active: boolean) => {
  const [feed, setFeed] = useState(() => activityPool.slice(0, 4).map((a, i) => ({ ...a, id: i })));
  const n = useRef(4);
  useEffect(() => {
    if (!active) return;
    const t = window.setInterval(() => {
      const next = activityPool[n.current % activityPool.length];
      const id = n.current++;
      setFeed((f) => [{ ...next, id }, ...f].slice(0, 5));
    }, 3200);
    return () => window.clearInterval(t);
  }, [active]);
  return feed;
};

const Bubble: React.FC<{ turn: ChatTurn; approved: boolean }> = ({ turn, approved }) => {
  if (turn.kind === 'you')
    return (
      <div className="flex justify-end">
        <p className="max-w-[78%] rounded-2xl rounded-br-md bg-[#F2EDE3]/[0.08] px-4 py-2.5 text-[13.5px] leading-relaxed text-[#F2EDE3]">{turn.text}</p>
      </div>
    );
  if (turn.kind === 'hive')
    return (
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#F2D27A]/15">
          <HiveMark className="h-3.5 w-3.5 text-[#F2D27A]" />
        </span>
        <div className="max-w-[80%]">
          <p className="text-[13.5px] leading-relaxed text-[#F2EDE3]/90">{turn.text}</p>
          {turn.actions && (
            <div className="mt-2.5 flex gap-2">
              {turn.actions.map((a, i) => (
                <span key={a} className={cn('rounded-lg px-3 py-1.5 text-[12px]', i === 0 ? 'bg-[#F2D27A] font-medium text-[#0B0A08]' : 'border border-white/10 text-[#F2EDE3]/70')}>
                  {a}
                </span>
              ))}
            </div>
          )}
          {turn.chip && (
            <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-[#F2D27A]/30 px-2.5 py-1 font-mono text-[10.5px] text-[#F2D27A]/90">
              <History className="h-3 w-3" /> {turn.chip}
            </span>
          )}
        </div>
      </div>
    );
  const bee = getBee(turn.bee);
  return (
    <div className="flex items-start gap-3">
      <BeeAvatar id={turn.bee} size={28} className="mt-0.5" />
      <div className={cn('w-[82%] rounded-2xl border p-4 transition-colors duration-500', approved ? 'border-[#9FD8A8]/30 bg-[#9FD8A8]/[0.05]' : 'border-[#F2D27A]/25 bg-[#F2D27A]/[0.04]')}>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#F2EDE3]/45">A Bee asks · {bee.job}</p>
        <p className="mt-1.5 text-[13.5px] text-[#F2EDE3]">{turn.title}</p>
        <p className="mt-0.5 text-[12px] text-[#F2EDE3]/45">{turn.detail}</p>
        <div className="mt-3 flex items-center gap-2">
          {approved ? (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#9FD8A8]/15 px-3 py-1.5 text-[12px] text-[#9FD8A8]">
              <Check className="h-3 w-3" /> Approved by you · on the record
            </span>
          ) : (
            <>
              <span className="rounded-lg bg-[#F2D27A] px-3 py-1.5 text-[12px] font-medium text-[#0B0A08]">Approve</span>
              <span className="rounded-lg border border-white/10 px-3 py-1.5 text-[12px] text-[#F2EDE3]/70">See the messages</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Sidebar: React.FC = () => (
  <aside className="w-[220px] shrink-0 border-r border-white/[0.06] bg-[#0C0B09] p-3 flex flex-col">
    <div className="flex items-center gap-2 px-1.5 py-1.5">
      <HiveMark className="h-[18px] w-[18px] text-[#F2D27A]" />
      <span className="text-[13.5px] font-medium text-[#F2EDE3]">Hive</span>
    </div>
    <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-2 py-1.5">
      <span className="grid h-5 w-5 place-items-center rounded-[5px] bg-[#E7E0D2] text-[9px] font-semibold text-[#0B0A08]">SL</span>
      <span className="flex-1 truncate text-[12px] text-[#F2EDE3]/80">Sample Lab</span>
      <ChevronDown className="h-3.5 w-3.5 text-[#F2EDE3]/40" />
    </div>
    <nav className="mt-4 flex flex-col gap-0.5 text-[12.5px]">
      {[
        { icon: MessageSquare, label: 'Chat', active: true },
        { icon: Inbox, label: 'Approvals', badge: '3' },
        { icon: LayoutGrid, label: 'Bees' },
        { icon: History, label: 'Record' },
      ].map((n) => (
        <span key={n.label} className={cn('flex items-center gap-2.5 rounded-lg px-2 py-1.5', n.active ? 'bg-white/[0.06] text-[#F2EDE3]' : 'text-[#F2EDE3]/55')}>
          <n.icon className="h-3.5 w-3.5" />
          <span className="flex-1">{n.label}</span>
          {n.badge && <span className="grid h-4 min-w-4 place-items-center rounded-full bg-[#F2D27A] px-1 text-[9.5px] font-semibold text-[#0B0A08]">{n.badge}</span>}
        </span>
      ))}
    </nav>
    <p className="mt-6 px-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#F2EDE3]/30">Your Bees</p>
    <ul className="mt-2 flex flex-col gap-0.5">
      {sidebarBees.map(({ id, state }) => (
        <li key={id} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[12px] text-[#F2EDE3]/70">
          <BeeAvatar id={id} size={22} />
          <span className="flex-1 truncate">{getBee(id).job}</span>
          <span className={cn('h-1.5 w-1.5 rounded-full', state === 'working' ? 'bg-[#9FD8A8]' : state === 'waiting' ? 'bg-[#F2D27A]' : 'bg-white/20')} />
        </li>
      ))}
    </ul>
    <div className="mt-auto flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[12px] text-[#F2EDE3]/45">
      <Settings2 className="h-3.5 w-3.5" /> Settings
    </div>
  </aside>
);

const RightPanel: React.FC<{ approved: boolean; feed: { bee: BeeId; text: string; id: number }[] }> = ({ approved, feed }) => (
  <aside className="w-[290px] shrink-0 border-l border-white/[0.06] p-4 flex flex-col gap-5 overflow-hidden">
    <section>
      <header className="flex items-center justify-between pb-3">
        <span className="text-[12.5px] text-[#F2EDE3]">Needs a person</span>
        <span className="text-[11px] tabular-nums text-[#F2D27A]/80">{approved ? 2 : 3} waiting</span>
      </header>
      <ul className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {approvalPool.slice(approved ? 1 : 0).map((a) => (
            <motion.li
              key={a.title}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-2.5"
            >
              <BeeAvatar id={a.bee} size={26} />
              <div className="min-w-0">
                <p className="truncate text-[12px] text-[#F2EDE3]/90">{a.title}</p>
                <p className="truncate text-[10.5px] text-[#F2EDE3]/40">{a.detail}</p>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
    <section className="min-h-0 flex-1 flex flex-col">
      <header className="pb-2 text-[12.5px] text-[#F2EDE3]">Bee activity</header>
      <ul className="relative flex-1 overflow-hidden mask-fade-b">
        <AnimatePresence initial={false}>
          {feed.map((f, i) => (
            <motion.li
              key={f.id}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex items-start gap-2.5 border-b border-white/[0.05] py-2.5 last:border-0"
            >
              <BeeAvatar id={f.bee} size={20} className="mt-0.5" />
              <p className="flex-1 text-[11.5px] leading-snug text-[#F2EDE3]/75">{f.text}</p>
              <span className="text-[10px] tabular-nums text-[#F2EDE3]/30">{i === 0 ? 'now' : `${i * 3}m`}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  </aside>
);

export const HiveConsole: React.FC<{ className?: string; caption?: boolean }> = ({ className, caption = true }) => {
  const outer = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const reduce = !!useReducedMotion();
  const inView = useInView(outer, { margin: '0px 0px -10% 0px' });
  const { shown, typing, approved } = useConversation(inView, reduce);
  const feed = useActivity(inView && !reduce);

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
  const turns = chatScript.slice(0, shown);
  const mode = modeOf([...turns].reverse().find((t) => t.kind !== 'hive'));

  return (
    <figure className={cn('relative', className)}>
      <div ref={outer} className="relative w-full" style={{ height: width ? size.h * scale : undefined, aspectRatio: width ? undefined : `${FULL.w}/${FULL.h}` }}>
        <div
          role="img"
          aria-label="Illustrative Hive workspace with sample data. A person asks how many reports are stuck at client portals, hands a daily report to a Bee, and approves re-test reminders that a Bee drafted."
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: size.w, height: size.h, transform: `scale(${scale})`, visibility: width ? 'visible' : 'hidden' }}
        >
          <div aria-hidden="true" className="flex h-full w-full overflow-hidden rounded-[16px] border border-white/[0.09] bg-[#100E0C] text-left font-sans shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9),0_0_0_1px_rgba(0,0,0,0.6)]">
            {!compact && <Sidebar />}
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/[0.06] px-4">
                <div className="flex items-center gap-2 text-[12.5px]">
                  {compact && <HiveMark className="mr-1 h-4 w-4 text-[#F2D27A]" />}
                  <span className="text-[#F2EDE3]">Chat</span>
                  <span className="text-[#F2EDE3]/30">/</span>
                  <span className="text-[#F2EDE3]/45">Today</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="rounded-md border border-[#F2D27A]/40 bg-[#F2D27A]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#F2D27A]">{SAMPLE_LABEL}</span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-[#F2EDE3]/70">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inset-0 rounded-full bg-[#9FD8A8] animate-ping2" />
                      <span className="relative h-1.5 w-1.5 rounded-full bg-[#9FD8A8]" />
                    </span>
                    4 Bees working
                  </span>
                </div>
              </div>

              <div className="relative flex min-h-0 flex-1 flex-col justify-end gap-5 overflow-hidden px-6 pb-4 pt-6">
                <AnimatePresence initial={false}>
                  {turns.map((turn, i) => (
                    <motion.div key={i} layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                      <Bubble turn={turn} approved={approved} />
                    </motion.div>
                  ))}
                  {typing && (
                    <motion.div key="typing" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-[#F2D27A]/15">
                        <HiveMark className="h-3.5 w-3.5 text-[#F2D27A]" />
                      </span>
                      <span className="flex gap-1">
                        {[0, 1, 2].map((d) => (
                          <span key={d} className="h-1.5 w-1.5 rounded-full bg-[#F2EDE3]/50 animate-pulse2" style={{ animationDelay: `${d * 0.2}s` }} />
                        ))}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="shrink-0 border-t border-white/[0.06] p-4">
                <div className="mb-2.5 flex gap-1">
                  {['Talk', 'Delegate', 'Supervise'].map((m, i) => (
                    <span key={m} className={cn('rounded-full px-2.5 py-1 text-[11px] transition-colors duration-500', i === mode ? 'bg-[#F2D27A]/15 text-[#F2D27A]' : 'text-[#F2EDE3]/35')}>
                      {m}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 py-3">
                  <span className="flex-1 text-[13px] text-[#F2EDE3]/35">Ask anything, or hand a job to a Bee…</span>
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#F2D27A] text-[#0B0A08]">
                    <ArrowUp className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </div>
            {!compact && <RightPanel approved={approved} feed={feed} />}
          </div>
        </div>
      </div>
      {caption && <figcaption className="mt-4 text-center font-mono text-[11px] tracking-[0.04em] text-fg/35">{SAMPLE_CAPTION}</figcaption>}
    </figure>
  );
};
