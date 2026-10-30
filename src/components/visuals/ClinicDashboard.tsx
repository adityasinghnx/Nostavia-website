import React from 'react';
import { AlarmClock, ArrowUpRight, Bell, Check, ChevronDown, ChevronUp, ClipboardList, FileText, FlaskConical, MoreVertical, Pause, Play, Settings, Stethoscope, Users } from 'lucide-react';
import { cn } from '../../lib/cn';
import { BrandMark, type Brand } from './BrandedApp';

/* ─────────────────────────────────────────────────────────────────────────────
 * A Studio build for the clinic itself: the doctor's dashboard. Soft cards on a
 * warm wash, a dark pill for what is active, big light numerals, and one
 * highlight colour per brand where the eye should go. Drawn at real size
 * (1280 × 800). Sample brand, people and data.
 * ──────────────────────────────────────────────────────────────────────────── */

export const DASH = { w: 1280, h: 800 };

const INK = '#1D1D1F';

/** Per brand: the highlight colour, and the wash it pools into at the bottom-right corner. */
const TONES: Record<string, { hi: string; wash: string }> = {
  clinic: { hi: '#F6CF55', wash: '#F7E3A4' },
  lab: { hi: '#A9C1FF', wash: '#D9E2FB' },
  app: { hi: '#F6AE87', wash: '#F8D9C6' },
};
const tonesOf = (b: Brand) => TONES[b.id] ?? TONES.clinic;

/** The default highlight, for pieces shown outside a brand. */
export const DASH_HI = TONES.clinic.hi;

/** Large light type: the brand's serif where it has one, else a thin sans. */
const light = (b: Brand) => (b.serif ? 'font-serif font-normal tracking-[-0.01em]' : 'font-sans font-light tracking-[-0.035em]');

export const Card: React.FC<{ className?: string; style?: React.CSSProperties; children: React.ReactNode }> = ({ className, style, children }) => (
  <div className={cn('relative overflow-hidden rounded-[28px] border border-white/80 bg-white/[0.62] shadow-[0_1px_2px_rgba(29,29,31,0.04),0_18px_40px_-28px_rgba(29,29,31,0.25)]', className)} style={style}>
    {children}
  </div>
);

export const RoundButton: React.FC<{ dark?: boolean; className?: string; children: React.ReactNode }> = ({ dark, className, children }) => (
  <span className={cn('grid h-[38px] w-[38px] place-items-center rounded-full', dark ? 'bg-[#1D1D1F] text-white' : 'border border-[#1D1D1F]/[0.08] bg-white text-[#1D1D1F]', className)}>{children}</span>
);

/* ── Header ── */

const NAV = ['Dashboard', 'Patients', 'Reports', 'Briefs', 'Follow-ups', 'Calendar', 'Messages'];

const Header: React.FC<{ brand: Brand }> = ({ brand }) => (
  <div className="flex h-[48px] items-center justify-between">
    <span className="flex h-[46px] items-center gap-2.5 rounded-full border border-[#1D1D1F]/30 px-5">
      <BrandMark brand={brand} size={22} />
      <span className={cn(brand.serif ? 'font-serif text-[23px]' : 'font-sans text-[18px] font-medium tracking-[-0.02em]')}>{brand.name}</span>
    </span>
    <div className="flex items-center gap-2.5">
      <nav className="flex items-center gap-0.5 rounded-full bg-white/60 p-[5px]">
        {NAV.map((n, i) => (
          <span key={n} className={cn('flex h-[36px] items-center rounded-full px-4 text-[13px]', i === 0 ? 'bg-[#1D1D1F] text-white' : 'text-[#1D1D1F]/80')}>
            {n}
          </span>
        ))}
      </nav>
      <span className="flex h-[46px] items-center gap-2 rounded-full bg-white/60 px-4 text-[13px]">
        <Settings className="h-4 w-4" strokeWidth={1.7} /> Settings
      </span>
      <span className="grid h-[46px] w-[46px] place-items-center rounded-full bg-white/60">
        <Bell className="h-[17px] w-[17px]" strokeWidth={1.7} />
      </span>
      <span className="h-[46px] w-[46px] rounded-full bg-white/60 p-[4px]">
        <span className="block h-full w-full overflow-hidden rounded-full">
          <img src="/photos/industry-clinics.jpg" alt="" className="h-full w-full object-cover" style={{ objectPosition: '64% 20%', transform: 'scale(2.6)', transformOrigin: '64% 24%' }} loading="lazy" decoding="async" />
        </span>
      </span>
    </div>
  </div>
);

/* ── Today in one line: how the day's consultations stand, and three big numbers ── */

const split = [
  { label: 'Seen', pct: 36, kind: 'dark' },
  { label: 'Briefs read', pct: 29, kind: 'hi' },
  { label: 'Waiting', pct: 21, kind: 'hatch' },
  { label: 'Reports due', pct: 14, kind: 'outline' },
] as const;

const Overview: React.FC<{ brand: Brand }> = ({ brand }) => {
  const t = tonesOf(brand);
  return (
    <div className="mt-6 flex items-end justify-between">
      <div>
        <p className={cn('text-[46px] leading-none text-[#1D1D1F]', light(brand))}>Good morning, Dr. Rao</p>
        <div className="mt-6 flex w-[600px] gap-1.5">
          {split.map((s) => (
            <div key={s.label} style={{ flex: s.pct }}>
              <p className="mb-2 text-[12.5px] text-[#1D1D1F]/70">{s.label}</p>
              <span
                className={cn('flex h-[44px] items-center rounded-full px-4 text-[12.5px]', s.kind === 'dark' && 'bg-[#1D1D1F] text-white', s.kind === 'outline' && 'border border-[#1D1D1F]/40')}
                style={
                  s.kind === 'hi'
                    ? { background: t.hi }
                    : s.kind === 'hatch'
                      ? { backgroundImage: 'repeating-linear-gradient(-45deg, rgba(29,29,31,0.16) 0 1.5px, transparent 1.5px 7px)', color: 'rgba(29,29,31,0.6)' }
                      : undefined
                }
              >
                {s.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-end gap-10 pb-1">
        {[
          { Icon: Stethoscope, n: '14', label: 'Consultations' },
          { Icon: ClipboardList, n: '12', label: 'Briefs ready' },
          { Icon: FlaskConical, n: '3', label: 'To review' },
        ].map(({ Icon, n, label }) => (
          <div key={label} className="flex items-end gap-2.5">
            <div className="pb-1.5">
              <span className="grid h-[26px] w-[26px] place-items-center rounded-full bg-white/70">
                <Icon className="h-[13px] w-[13px]" strokeWidth={1.8} />
              </span>
              <p className="mt-1.5 text-[11.5px] text-[#1D1D1F]/60">{label}</p>
            </div>
            <span className="font-sans text-[64px] font-extralight leading-[0.85] tracking-[-0.05em] tabular-nums">{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Row one ── */

const DoctorCard: React.FC = () => (
  <Card className="h-full border-0">
    <img src="/photos/industry-clinics.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: '67% 30%', transform: 'scale(1.18)', transformOrigin: '64% 20%' }} loading="lazy" decoding="async" />
    <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#1D1D1F]/75 to-transparent" />
    <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
      <div>
        <p className="text-[20px] tracking-[-0.02em] text-white">Dr. Anika Rao</p>
        <p className="mt-0.5 text-[12px] text-white/70">General medicine</p>
      </div>
      <span className="flex h-[38px] items-center rounded-full border border-white/50 px-4 text-[13px] text-white backdrop-blur-[2px]">14 today</span>
    </div>
  </Card>
);

/* Visits per day this week; today is Thursday. Days ahead are booked, so drawn quietly. */
const week = [
  { d: 'S', v: 0, when: 'past' },
  { d: 'M', v: 11, when: 'past' },
  { d: 'T', v: 15, when: 'past' },
  { d: 'W', v: 12, when: 'past' },
  { d: 'T', v: 14, when: 'today' },
  { d: 'F', v: 9, when: 'ahead' },
  { d: 'S', v: 6, when: 'ahead' },
] as const;

const VisitsChart: React.FC<{ brand: Brand }> = ({ brand }) => {
  const t = tonesOf(brand);
  return (
    <Card className="flex h-full flex-col p-5">
      <div className="flex items-start justify-between">
        <p className="text-[19px] tracking-[-0.02em]">Visits</p>
        <RoundButton>
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
        </RoundButton>
      </div>
      <p className="-mt-2 flex items-end gap-2">
        <span className="text-[34px] font-light leading-none tracking-[-0.04em]">67</span>
        <span className="pb-1 text-[11.5px] leading-tight text-[#1D1D1F]/60">
          booked
          <br />
          this week
        </span>
      </p>
      <div className="mt-auto flex items-end justify-between px-1">
        {week.map((w, i) => (
          <div key={i} className="relative flex flex-col items-center gap-2">
            {w.when === 'today' && (
              <span className="absolute -top-[30px] whitespace-nowrap rounded-full px-2.5 py-1 text-[11px]" style={{ background: t.hi }}>
                {w.v} visits
              </span>
            )}
            <span className="relative flex h-[104px] w-[7px] items-end justify-center">
              <span className="absolute inset-x-0 bottom-0 top-0 rounded-full border-l border-dashed border-[#1D1D1F]/[0.12]" style={{ left: 3 }} />
              <span
                className="relative w-[7px] rounded-full"
                style={{ height: Math.max(8, (w.v / 15) * 104), background: w.when === 'today' ? t.hi : w.when === 'past' ? INK : 'rgba(29,29,31,0.14)' }}
              />
            </span>
            <span className={cn('h-[5px] w-[5px] rounded-full', w.when === 'ahead' ? 'bg-[#1D1D1F]/20' : 'bg-[#1D1D1F]')} />
            <span className="text-[11px] text-[#1D1D1F]/55">{w.d}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

/** A dial: ticks round the left half, the highlight arc from the top round the right, a reading in the middle. */
export const Dial: React.FC<{ hi: string; value: number; size?: number; children: React.ReactNode }> = ({ hi, value, size = 150, children }) => {
  const R = 62;
  const c = 2 * Math.PI * R;
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg viewBox="-75 -75 150 150" className="absolute inset-0 h-full w-full">
        {Array.from({ length: 29 }, (_, i) => {
          const a = Math.PI / 2 + ((i + 1) / 30) * Math.PI;
          const r2 = i % 5 === 4 ? 55 : 59;
          return <line key={i} x1={Math.cos(a) * 67} y1={Math.sin(a) * 67} x2={Math.cos(a) * r2} y2={Math.sin(a) * r2} stroke="rgba(29,29,31,0.55)" strokeWidth="1.4" strokeLinecap="round" />;
        })}
        <circle r={R} fill="none" stroke={hi} strokeWidth="13" strokeLinecap="round" strokeDasharray={`${c * value} ${c}`} transform="rotate(-86)" />
      </svg>
      <div className="text-center">{children}</div>
    </div>
  );
};

/* The next consultation as a dial: ticks for the hour, the highlight for how much of the brief is read. */
const NextVisit: React.FC<{ brand: Brand }> = ({ brand }) => {
  const t = tonesOf(brand);
  return (
    <Card className="flex h-full flex-col p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[19px] tracking-[-0.02em]">Next visit</p>
          <p className="mt-0.5 text-[11.5px] text-[#1D1D1F]/55">Patient 2207 · follow-up</p>
        </div>
        <RoundButton>
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
        </RoundButton>
      </div>
      <div className="mx-auto mt-1">
        <Dial hi={t.hi} value={0.44}>
          <p className="text-[30px] font-light leading-none tracking-[-0.04em] tabular-nums">10:30</p>
          <p className="mt-1 text-[11px] text-[#1D1D1F]/55">in 12 min</p>
        </Dial>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <span className="flex gap-2">
          <RoundButton>
            <Play className="h-[14px] w-[14px]" strokeWidth={1.8} />
          </RoundButton>
          <RoundButton>
            <Pause className="h-[14px] w-[14px]" strokeWidth={1.8} />
          </RoundButton>
        </span>
        <RoundButton dark>
          <AlarmClock className="h-[15px] w-[15px]" strokeWidth={1.8} />
        </RoundButton>
      </div>
    </Card>
  );
};

/* ── The briefs column: how many are ready, and today's list in a dark card ── */

const briefSplit = [
  { label: 'Reviewed', pct: 14, kind: 'hi' },
  { label: 'Ready', pct: 72, kind: 'dark' },
  { label: 'Waiting', pct: 14, kind: 'grey' },
] as const;

const briefs = [
  { who: 'Patient 6612', at: '08:30', Icon: FileText, done: true },
  { who: 'Patient 3021', at: '09:10', Icon: FileText, done: true },
  { who: 'Patient 2207', at: '10:30', Icon: FlaskConical, done: false, flag: true },
  { who: 'Patient 3390', at: '10:50', Icon: Users, done: false },
  { who: 'Patient 4821', at: '11:10', Icon: FileText, done: false },
];

const BriefsColumn: React.FC<{ brand: Brand }> = ({ brand }) => {
  const t = tonesOf(brand);
  return (
    <Card className="flex h-full flex-col p-5">
      <div className="flex items-baseline justify-between">
        <p className="text-[19px] tracking-[-0.02em]">Briefs ready</p>
        <p className="text-[34px] font-light leading-none tracking-[-0.04em]">86%</p>
      </div>
      <div className="mt-4 flex gap-1.5">
        {briefSplit.map((s) => (
          <div key={s.label} style={{ flex: Math.max(s.pct, 18) }}>
            <p className="mb-1.5 border-l border-[#1D1D1F]/25 pl-1.5 text-[11px] text-[#1D1D1F]/60">{s.pct}%</p>
            <span
              className={cn('flex h-[38px] items-center rounded-[12px] px-3 text-[11.5px]', s.kind === 'dark' && 'bg-[#1D1D1F] text-white', s.kind === 'grey' && 'bg-[#1D1D1F]/45 text-white')}
              style={s.kind === 'hi' ? { background: t.hi } : undefined}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Today's list: a dark card on a stack of two */}
      <div className="relative mt-6 flex-1">
        <span className="absolute inset-x-5 -top-3 h-6 rounded-t-[22px] bg-[#1D1D1F]/25" />
        <span className="absolute inset-x-2.5 -top-1.5 h-6 rounded-t-[24px] bg-[#1D1D1F]/55" />
        <div className="relative h-full rounded-[24px] bg-[#1D1D1F] px-5 pb-3 pt-4 text-white">
          <div className="flex items-baseline justify-between">
            <p className="text-[16px] tracking-[-0.01em]">Today’s briefs</p>
            <p className="text-[30px] font-light leading-none tracking-[-0.04em]">
              2<span className="text-white/45">/14</span>
            </p>
          </div>
          <ul className="mt-3">
            {briefs.map((b) => (
              <li key={b.who} className="flex items-center gap-3 py-[7px]">
                <span className={cn('grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full', b.done ? 'bg-white/[0.08]' : 'bg-white text-[#1D1D1F]')}>
                  <b.Icon className="h-[15px] w-[15px]" strokeWidth={1.8} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className={cn('text-[13px] leading-tight', b.done && 'text-white/45 line-through')}>{b.who}</p>
                  <p className="text-[10.5px] text-white/40">Today, {b.at}</p>
                </div>
                {b.done ? (
                  <span className="grid h-[18px] w-[18px] place-items-center rounded-full" style={{ background: t.hi }}>
                    <Check className="h-[11px] w-[11px] text-[#1D1D1F]" strokeWidth={3} />
                  </span>
                ) : b.flag ? (
                  <span className="rounded-full px-2 py-0.5 text-[10.5px] text-[#1D1D1F]" style={{ background: t.hi }}>
                    1 to review
                  </span>
                ) : (
                  <span className="h-[16px] w-[16px] rounded-full bg-white/25" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

/* ── Row two ── */

const Fold: React.FC<{ title: string; open?: boolean; children?: React.ReactNode }> = ({ title, open, children }) => (
  <div className="border-b border-dashed border-[#1D1D1F]/[0.14] py-[14px] last:border-0">
    <div className="flex items-center justify-between text-[14px]">
      {title}
      {open ? <ChevronUp className="h-4 w-4 text-[#1D1D1F]/60" strokeWidth={1.8} /> : <ChevronDown className="h-4 w-4 text-[#1D1D1F]/60" strokeWidth={1.8} />}
    </div>
    {children}
  </div>
);

const PatientBrief: React.FC<{ brand: Brand }> = ({ brand }) => {
  const t = tonesOf(brand);
  return (
    <Card className="flex h-full flex-col px-5 py-2">
      <Fold title="Since the last visit" />
      <Fold title="Lab results" open>
        <div className="mt-3 flex items-center gap-3">
          <span className="grid h-[44px] w-[62px] shrink-0 place-items-center rounded-[10px] bg-[#1D1D1F]">
            <svg viewBox="0 0 50 26" className="h-[26px] w-[50px]">
              <polyline points="3,22 16,18 29,12 46,5" fill="none" stroke={t.hi} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="46" cy="5" r="2.6" fill={t.hi} />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] leading-tight">Ferritin 412</p>
            <p className="text-[11px] text-[#1D1D1F]/55">Above range, rising</p>
          </div>
          <MoreVertical className="h-4 w-4 text-[#1D1D1F]/50" strokeWidth={1.8} />
        </div>
      </Fold>
      <Fold title="Medicines" />
    </Card>
  );
};

const days = [
  { d: 'Mon', n: 21 },
  { d: 'Tue', n: 22 },
  { d: 'Wed', n: 23 },
  { d: 'Thu', n: 24 },
  { d: 'Fri', n: 25 },
  { d: 'Sat', n: 26 },
];
const hours = ['8:00 am', '9:00 am', '10:00 am', '11:00 am'];

const Avatars: React.FC<{ people: string[]; ring: string }> = ({ people, ring }) => (
  <span className="flex -space-x-1.5">
    {people.map((p, i) => (
      <span key={p} className="grid h-[22px] w-[22px] place-items-center rounded-full text-[8.5px] font-semibold text-[#1D1D1F]" style={{ background: ['#E9D8C4', '#CFE0D8', '#D9D3EA'][i % 3], boxShadow: `0 0 0 1.5px ${ring}` }}>
        {p}
      </span>
    ))}
  </span>
);

/* Events sit on the week grid by day column (0–5) and start hour (0 = 8:00). */
const CalendarCard: React.FC<{ brand: Brand }> = ({ brand }) => {
  const t = tonesOf(brand);
  const COL = 74;
  const ROW = 31;
  const LEFT = 76;
  const at = (day: number, hour: number) => ({ left: LEFT + day * COL + 8, top: 18 + hour * ROW - 4 });
  return (
    <Card className="h-full px-5 pt-4">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-white px-3.5 py-1.5 text-[11.5px]">September</span>
        <p className="text-[15px] tracking-[-0.01em]">October</p>
        <span className="rounded-full bg-white px-3.5 py-1.5 text-[11.5px]">November</span>
      </div>
      <div className="mt-2 flex" style={{ paddingLeft: LEFT }}>
        {days.map((d, i) => (
          <div key={d.n} className="text-center" style={{ width: COL }}>
            <p className={cn('text-[11.5px]', i === 3 ? 'text-[#1D1D1F]' : 'text-[#1D1D1F]/50')}>{d.d}</p>
            <p className={cn('text-[12.5px]', i === 3 ? 'font-medium text-[#1D1D1F]' : 'text-[#1D1D1F]/50')}>{d.n}</p>
          </div>
        ))}
      </div>
      <div className="relative mt-1">
        {days.map((d, i) => (
          <span key={d.n} className="absolute top-0 h-[124px] border-l border-dashed border-[#1D1D1F]/[0.14]" style={{ left: LEFT + i * COL + COL / 2 }} />
        ))}
        {hours.map((h) => (
          <p key={h} className="pt-2.5 text-[11.5px] text-[#1D1D1F]/60" style={{ height: ROW }}>
            {h}
          </p>
        ))}

        <div className="absolute flex w-[196px] items-center justify-between rounded-[12px] bg-[#1D1D1F] px-3 py-2 text-white shadow-[0_10px_20px_-12px_rgba(0,0,0,0.6)]" style={at(1, 0.15)}>
          <div>
            <p className="text-[11.5px] leading-tight">Diabetes clinic</p>
            <p className="text-[9.5px] text-white/55">Follow-ups, room 2</p>
          </div>
          <Avatars people={['DG', 'RV', 'SL']} ring={INK} />
        </div>
        <div className="absolute flex w-[188px] items-center justify-between rounded-[12px] bg-white px-3 py-2 shadow-[0_10px_20px_-14px_rgba(0,0,0,0.35)]" style={at(3, 1.55)}>
          <div>
            <p className="text-[11.5px] leading-tight">New patient intake</p>
            <p className="text-[9.5px] text-[#1D1D1F]/55">Brief ready at 09:30</p>
          </div>
          <Avatars people={['AK', 'IB']} ring="#fff" />
        </div>
        <div className="absolute flex w-[172px] items-center justify-between rounded-[12px] px-3 py-2" style={{ ...at(0, 2.35), background: t.hi }}>
          <div>
            <p className="text-[11.5px] leading-tight">Team huddle</p>
            <p className="text-[9.5px] text-[#1D1D1F]/60">10:20–10:40</p>
          </div>
          <Avatars people={['AR', 'NM', 'PS']} ring={t.hi} />
        </div>
      </div>
    </Card>
  );
};

/* ── The page ── */

export const ClinicDashboard: React.FC<{ brand: Brand }> = ({ brand }) => {
  const t = tonesOf(brand);
  return (
    <div
      className="overflow-hidden rounded-[30px] p-[26px] font-sans text-left text-[#1D1D1F] shadow-[0_0_0_10px_rgba(255,255,255,0.55),0_0_0_11px_rgba(29,29,31,0.06),0_60px_110px_-40px_rgba(29,29,31,0.55)]"
      style={{
        width: DASH.w,
        height: DASH.h,
        background: `radial-gradient(70% 85% at 100% 100%, ${t.wash} 0%, transparent 70%), radial-gradient(45% 60% at 70% 0%, ${t.wash}99 0%, transparent 70%), linear-gradient(135deg, #EDECE9 0%, #F1EFEA 55%, ${t.wash} 130%)`,
      }}
    >
      <Header brand={brand} />
      <Overview brand={brand} />
      <div className="mt-5 grid h-[500px] grid-cols-[266px_1fr_1fr_330px] grid-rows-[258px_1fr] gap-[14px]">
        <DoctorCard />
        <VisitsChart brand={brand} />
        <NextVisit brand={brand} />
        <div className="row-span-2">
          <BriefsColumn brand={brand} />
        </div>
        <PatientBrief brand={brand} />
        <div className="col-span-2">
          <CalendarCard brand={brand} />
        </div>
      </div>
    </div>
  );
};
