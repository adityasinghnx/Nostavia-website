import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_EMAIL } from '../../content/site';
import { recountLinks, type RecountScreen } from '../../content/recount';
import { Layer, PlaneShadow, Scene } from '../visuals/Scene3D';
import { Reveal } from '../ui/motion';
import { cn } from '../../lib/cn';

/* ─────────────────────────────────────────────────────────────────────────────
 * Recount's own screens, cropped from the App Store shots in public/recount,
 * set in a phone and held in a fixed 3D turn like a photograph. The two cards
 * that float off the screen in the store shots (Devanagari, clipboard) are
 * redrawn here so they can leave the phone's edge.
 * ──────────────────────────────────────────────────────────────────────────── */

/** Screen at iPhone size; the crops are 664 × 1408 px. */
const SCREEN = { w: 390, h: 827 };
const BEZEL = 12;
export const FRAME = { w: SCREEN.w + BEZEL * 2, h: SCREEN.h + BEZEL * 2 };

/** One fixed turn for every Recount phone, so they all lean the same way. */
const TURN = { x: 12, y: -18, z: 3 };

const alt: Record<RecountScreen, string> = {
  record: 'Recording screen: 14:32 on the timer, 3 moments marked, the live Hinglish transcript and the red stop button.',
  languages: 'A Hinglish transcript split by speaker, with one line shown again in Devanagari.',
  speakers: 'The Name Speaker sheet asking whether a voice is Neha.',
  'copy-for-ai': 'The Copy for AI menu with nine prompts, and the prompt and transcript on the clipboard.',
  highlights: 'Highlights: promises, dates, a ₹4.2 lakh amount and talk time for each speaker.',
};

/** Cards that sit over the screen's edge, in screen points. */
const Devanagari: React.FC = () => (
  <div className="absolute rounded-[18px] bg-white px-[22px] py-[16px] text-left shadow-[0_22px_40px_-16px_rgba(0,0,0,0.45)]" style={{ left: BEZEL - 33, top: BEZEL + 527, width: 331 }}>
    <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#8E8E93]">Or in Devanagari</p>
    <p className="mt-[6px] text-[20px] font-semibold text-[#1D1D1F]">मुझे कल तक रिपोर्ट भेजनी है।</p>
  </div>
);

const Clipboard: React.FC = () => (
  <div className="absolute rounded-[22px] bg-[#1F1F21] px-[22px] py-[20px] text-left shadow-[0_30px_50px_-18px_rgba(0,0,0,0.6)]" style={{ left: BEZEL - 43, top: BEZEL + 549, width: 368, minHeight: 257 }}>
    <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-white/55">On your clipboard</p>
    <div className="mt-[12px] flex flex-col gap-[10px] font-mono text-[12.5px] leading-[1.5] text-white/90">
      <p>You are my meeting assistant. Write a 5-line summary, decisions and action items…</p>
      <p>
        # Weekly sync
        <span className="block text-white/50">- People: Priya, Rahul, Me</span>
        <span className="block text-white/50">- Language: Hinglish</span>
      </p>
      <p>
        ## Transcript
        <span className="block text-white/50">[02:14] Priya: Budget approve ho gaya hai…</span>
      </p>
    </div>
  </div>
);

/** A phone showing one of Recount's screens. Pass several and an `active` index to crossfade between them. */
export const RecountPhone: React.FC<{ screens: RecountScreen[]; active?: number; className?: string }> = ({ screens, active = 0, className }) => (
  <div className={cn('relative', className)} style={{ width: FRAME.w, height: FRAME.h }}>
    <div className="absolute inset-0 rounded-[66px] bg-[#1C1C1F] p-[12px] shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.18),inset_0_0_0_6px_#0A0A0B,0_50px_90px_-30px_rgba(0,0,0,0.75)]">
      <div className="relative h-full w-full overflow-hidden rounded-[54px] bg-white">
        {screens.map((s, i) => (
          <img
            key={s}
            src={`/recount/${s}.jpg`}
            alt={alt[s]}
            width={SCREEN.w}
            height={SCREEN.h}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ease-out"
            style={{ opacity: i === active ? 1 : 0 }}
          />
        ))}
        {/* Light catching the glass */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[54px]" style={{ background: 'linear-gradient(115deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 24%, transparent 42%)' }} />
      </div>
    </div>
    {screens.map((s, i) =>
      s === 'languages' || s === 'copy-for-ai' ? (
        <div key={s} aria-hidden="true" className="transition-opacity duration-700 ease-out" style={{ opacity: i === active ? 1 : 0 }}>
          {s === 'languages' ? <Devanagari /> : <Clipboard />}
        </div>
      ) : null,
    )}
  </div>
);

/** Hero: recording in front, the highlights it produces behind. */
export const RecountHeroScene: React.FC<{ className?: string }> = ({ className }) => (
  <Scene width={720} height={840} label="Recount on iPhone: a recording in progress, and the highlights it found" rotate={TURN} className={className}>
    <PlaneShadow x={60} y={120} w={330} h={700} strength={0.35} />
    <Layer x={30} y={20} scale={0.76} w={FRAME.w} h={FRAME.h}>
      <RecountPhone screens={['highlights']} />
    </Layer>
    <PlaneShadow x={320} y={210} w={340} h={700} />
    <Layer x={300} y={130} z={130} scale={0.8} w={FRAME.w} h={FRAME.h} drift={9}>
      <RecountPhone screens={['record']} />
    </Layer>
  </Scene>
);

/** One phone in the fixed turn, for the walkthrough. */
export const RecountStoryScene: React.FC<{ screens: RecountScreen[]; active: number; className?: string }> = ({ screens, active, className }) => (
  <Scene width={560} height={920} label="Recount on iPhone" rotate={TURN} className={className}>
    <PlaneShadow x={110} y={110} w={360} h={780} />
    <Layer x={80} y={30} z={60} w={FRAME.w} h={FRAME.h}>
      <RecountPhone screens={screens} active={active} />
    </Layer>
  </Scene>
);

/** Question list with hairlines; each answer opens in place. */
export const RecountFaq: React.FC<{ items: { q: string; a: string }[] }> = ({ items }) => (
  <div className="border-t border-fg/[0.12]">
    {items.map((f) => (
      <details key={f.q} className="group border-b border-fg/[0.12] py-7">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 t-h3 [&::-webkit-details-marker]:hidden">
          {f.q}
          <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-fg/15 text-[18px] text-fg/60 transition-transform duration-500 group-open:rotate-45">
            +
          </span>
        </summary>
        <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-fg/60">{f.a}</p>
      </details>
    ))}
  </div>
);

/** Recount's own links, at the foot of each Recount page. */
export const RecountLinks: React.FC = () => (
  <section data-theme="ink" aria-label="Recount" className="relative border-t border-fg/[0.07]">
    <Reveal className="wrap flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
      <p className="t-label text-fg/55">
        <span className="text-accent">Recount</span> · An app from Nostavia
      </p>
      <nav className="flex flex-wrap gap-x-7 gap-y-3 text-[14.5px]">
        {recountLinks.map((l) => (
          <Link key={l.to} to={l.to} className="text-fg/60 transition-colors hover:text-fg">
            {l.label}
          </Link>
        ))}
        <a href={`mailto:${CONTACT_EMAIL}?subject=Recount`} className="text-fg/60 transition-colors hover:text-fg">
          Contact
        </a>
      </nav>
    </Reveal>
  </section>
);
