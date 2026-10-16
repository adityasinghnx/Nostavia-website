import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  Ban,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  Database,
  Languages,
  MessageSquareQuote,
  PhoneForwarded,
  PhoneIncoming,
  ShieldCheck,
  Siren,
  UserCheck,
  Users,
} from 'lucide-react';
import { CtaBand, FaqList, Panel, Section, SectionHead, primaryBtn, secondaryBtn, textLink } from '../../components/page/PageKit';
import { Container, Eyebrow, SectionHeading, focusRing } from '../../components/home/shared';
import { Reveal, Waveform, useInView } from '../../components/home/motion';
import { VoiceCallCard } from '../../components/home/LiveCards';
import { Disclaimer } from '../../components/human-os/Disclaimer';
import { submitLead, newRefId, CALENDAR_URL } from '../../lib/leads';
import { useSeo } from '../../lib/useSeo';

/* ─────────────────────────────────────────────────────────────────────────────
 * AI Front Desk Agent (routes /solutions/front-desk, /solutions/ai-agents and
 * /solutions/voice-agents). Phone only: chat channels are not live and are not
 * mentioned. Facts come from this page's previous copy, the AI Voice Agent module
 * in human-os.ts, the pricing page and the hospitals overview. Prices are exact.
 * ──────────────────────────────────────────────────────────────────────────── */

const pad = (n: number) => String(n).padStart(2, '0');
const prefersReducedMotion = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const fadeUp = (delay: number): React.CSSProperties => ({ animation: `hos-fade-up 0.5s cubic-bezier(0.2,0.7,0.2,1) ${delay}s both` });

/* ── How a call flows: a sample call, step by step (Romanized Hindi with an English line under each) ── */

interface Line {
  who: 'agent' | 'caller';
  text: string;
  en: string;
}

interface FlowStep {
  title: string;
  body: string;
  lines: Line[];
  chip?: string;
}

/* TODO(copy): call-flow step titles and bodies */
const flow: FlowStep[] = [
  {
    title: 'Answers as your hospital',
    body: "Every inbound call is picked up under your hospital's name, including outside OPD hours and at peak load when the desk cannot pick up.",
    lines: [{ who: 'agent', text: 'Namaste, [Your Hospital]. Bataiye, main kya madad kar sakti hoon?', en: 'Hello, [Your Hospital]. How can I help?' }],
  },
  {
    title: 'Listens, then reflects it back',
    body: 'It lets the caller finish, then repeats the complaint back so they know they were heard. Family members speaking for a patient are handled the same way.',
    lines: [
      { who: 'caller', text: "Papa ko teen din se fever hai, and he's coughing a lot.", en: "My father has had a fever for three days, and he's coughing a lot." },
      { who: 'agent', text: 'Samajh gayi. Teen din se bukhar aur khansi.', en: 'Understood. Three days of fever and cough.' },
    ],
  },
  {
    title: 'Rules out an emergency',
    body: 'Before any booking, it checks for warning signs. If it hears an emergency, booking stops and the call is handled as one.',
    lines: [
      { who: 'agent', text: 'Kya unhe abhi saans lene mein takleef ya seene mein dard hai?', en: 'Is he having trouble breathing or chest pain right now?' },
      { who: 'caller', text: 'Nahi, bas bukhar aur khansi.', en: 'No, just the fever and cough.' },
    ],
    chip: 'Emergency check: clear',
  },
  {
    title: 'Names a doctor and a time',
    body: 'Never a department, always a person: a named doctor, their designation and experience, and the day and time they will be in.',
    lines: [
      {
        who: 'agent',
        text: 'Iske liye Dr. [name] hain, Senior Physician, unnees saal ka experience. Wo kal subah nau se ek baje tak rahenge. Main gyarah baje ka slot de doon?',
        en: "Dr. [name], Senior Physician, 19 years' experience, is in tomorrow from 9 to 1. Shall I give you the 11 o'clock slot?",
      },
    ],
  },
  {
    title: 'Books the visit',
    body: "It takes the patient's name, age and mobile number and places the appointment. If the caller hesitates, it removes the specific friction instead of repeating itself.",
    lines: [
      { who: 'caller', text: 'Haan, kar dijiye.', en: 'Yes, please book it.' },
      { who: 'agent', text: 'Ho gaya. Kal subah gyarah baje, Dr. [name].', en: 'Done. Tomorrow at 11 AM with Dr. [name].' },
    ],
    chip: 'Visit booked',
  },
];

const STEP_MS = 4200;

const Bubble: React.FC<{ line: Line; delay: number }> = ({ line, delay }) => {
  const agent = line.who === 'agent';
  return (
    <div className={`max-w-[90%] ${agent ? 'self-start' : 'self-end'}`} style={fadeUp(delay)}>
      <div className={`mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${agent ? 'text-hos-yellow' : 'text-white/50 text-right'}`}>{agent ? 'Agent' : 'Caller'}</div>
      <div className={`rounded-2xl px-3.5 py-2.5 ${agent ? 'rounded-tl-sm bg-white/[0.07] ring-1 ring-white/10' : 'rounded-tr-sm bg-hos-yellow/[0.12] ring-1 ring-hos-yellow/25'}`}>
        <p className="text-[13px] text-white leading-relaxed">{line.text}</p>
        <p className="mt-1 text-[11px] text-white/55 leading-relaxed">{line.en}</p>
      </div>
    </div>
  );
};

const CallFlow: React.FC = () => {
  const [reduced] = useState(prefersReducedMotion);
  const [active, setActive] = useState(() => (prefersReducedMotion() ? flow.length - 1 : 0));
  const [paused, setPaused] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const running = inView && !paused && !reduced;

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % flow.length), active === flow.length - 1 ? STEP_MS * 1.6 : STEP_MS);
    return () => window.clearTimeout(id);
  }, [active, running]);

  const transcript: React.ReactNode[] = [];
  flow.slice(0, active + 1).forEach((step, si) => {
    step.lines.forEach((line, li) => transcript.push(<Bubble key={`${si}-${li}`} line={line} delay={li * 0.6} />));
    if (step.chip) {
      transcript.push(
        <div
          key={`${si}-chip`}
          className="self-center inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 text-emerald-300 px-3 py-1 text-[11px] font-semibold"
          style={fadeUp(step.lines.length * 0.6)}
        >
          {si === flow.length - 1 ? <CheckCircle2 aria-hidden="true" className="w-3.5 h-3.5" /> : <ShieldCheck aria-hidden="true" className="w-3.5 h-3.5" />}
          {step.chip}
        </div>
      );
    }
  });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <ol className="lg:col-span-5 space-y-1.5" aria-label="Steps in a call">
        {flow.map((step, i) => {
          const isActive = i === active;
          const done = i < active;
          return (
            <li key={step.title}>
              <button
                type="button"
                aria-current={isActive ? 'step' : undefined}
                onClick={() => setActive(i)}
                className={`w-full text-left rounded-[16px] p-4 sm:p-5 border transition-colors ${focusRing} ${
                  isActive ? 'bg-white/[0.06] border-white/20' : 'border-transparent hover:bg-white/[0.03]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-xs font-mono font-semibold transition-colors ${
                      isActive ? 'bg-hos-yellow text-ink-950' : done ? 'bg-white/10 text-white' : 'ring-1 ring-white/15 text-white/60'
                    }`}
                  >
                    {done ? <Check aria-hidden="true" className="w-3.5 h-3.5" /> : pad(i + 1)}
                  </span>
                  <span className="font-display font-semibold text-base text-white">{step.title}</span>
                </span>
                <span className={isActive ? 'block mt-2 pl-11 text-sm text-white/60 leading-relaxed' : 'sr-only'}>{step.body}</span>
                {isActive && running && (
                  <span aria-hidden="true" className="hos-anim block mt-3 ml-11 h-[2px] rounded-full bg-white/10 overflow-hidden">
                    <span
                      key={active}
                      className="block h-full bg-hos-yellow origin-left"
                      style={{ animation: `hos-grow ${active === flow.length - 1 ? STEP_MS * 1.6 : STEP_MS}ms linear both` }}
                    />
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ol>

      <div className="lg:col-span-7 rounded-[24px] p-1.5 dk-card shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9)]">
        <div className="rounded-[19px] bg-ink-900 ring-1 ring-white/[0.06] overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
            <span className="w-8 h-8 shrink-0 rounded-full bg-hos-yellow/15 ring-1 ring-hos-yellow/40 text-hos-yellow flex items-center justify-center">
              <PhoneIncoming aria-hidden="true" className="w-4 h-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold text-white truncate">Inbound call · Your Hospital</span>
              <span className="block text-[11px] text-white/55 truncate">Hindi and English · sample call</span>
            </span>
            <Waveform bars={14} height={22} className="ml-auto w-24 hidden sm:flex" />
          </div>
          <div className="hos-anim relative h-[460px] sm:h-[430px] p-4 sm:p-6 flex flex-col justify-end gap-3 overflow-hidden">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-ink-900 to-transparent z-10" />
            {transcript}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── What it handles: bento visuals ── */

const VagueToNamed: React.FC = () => (
  <div className="w-full space-y-2">
    <div className="w-fit max-w-full rounded-full bg-white/[0.06] ring-1 ring-white/10 px-3 py-1.5 text-xs text-white/75" style={fadeUp(0.1)}>
      “Fever and cough for three days”
    </div>
    <ArrowDown aria-hidden="true" className="w-3.5 h-3.5 ml-4 text-white/50" />
    <div className="w-fit max-w-full rounded-xl bg-white/[0.04] ring-1 ring-hos-yellow/30 px-3.5 py-2.5 text-xs text-white" style={fadeUp(0.5)}>
      <span className="font-semibold">Dr. [name]</span> · Senior Physician · 19 years
      <span className="block mt-0.5 text-white/60">Tomorrow, 11:00 AM</span>
    </div>
  </div>
);

const HoldTheSlot: React.FC = () => (
  <div className="w-full rounded-2xl rounded-tl-sm bg-white/[0.07] ring-1 ring-white/10 px-3.5 py-2.5" style={fadeUp(0.2)}>
    <p className="text-[12px] text-white leading-relaxed">“Bilkul, koi jaldi nahi. Par main slot hold kar deti hoon.”</p>
    <p className="mt-1 text-[11px] text-white/55">“Of course, no rush. But let me hold the slot for you.”</p>
  </div>
);

const LobbyBoard: React.FC = () => (
  <ul className="w-full flex flex-wrap gap-1.5">
    {['Doctor schedules', 'Fees', 'Departments', 'Test prices', 'Tariffs', 'Policies'].map((t, i) => (
      <li key={t} className="rounded-full bg-white/[0.06] ring-1 ring-white/10 px-2.5 py-1 text-[11px] text-white/80" style={fadeUp(0.1 + i * 0.08)}>
        {t}
      </li>
    ))}
  </ul>
);

const PeakChart: React.FC = () => (
  <div className="w-full">
    <div className="flex items-end gap-1.5 h-24">
      {[8, 14, 58, 94, 80, 56, 42, 48, 36, 22, 12, 6].map((h, i) => (
        <span
          key={i}
          className={`flex-1 rounded-t origin-bottom ${i === 3 ? 'bg-hos-yellow' : 'bg-white/15'}`}
          style={{ height: `${h}%`, animation: `hos-rise 0.8s cubic-bezier(0.2,0.7,0.2,1) ${i * 0.05}s both` }}
        />
      ))}
    </div>
    <div className="mt-2 flex justify-between gap-2 text-[10px] font-mono text-white/50">
      <span>Early morning</span>
      <span>OPD opens</span>
      <span>Night</span>
    </div>
  </div>
);

/* TODO(copy): bento tile headlines */
const handles: { title: string; body: string; visual: React.ReactNode; span: string; note?: string }[] = [
  {
    title: "The caller who can't name the problem",
    body: 'It turns a vague symptom into a named doctor and a specific time, after ruling out an emergency.',
    visual: <VagueToNamed />,
    span: 'lg:col-span-2',
  },
  {
    title: 'The caller who will “think about it”',
    body: "The most expensive sentence on a hospital line. The agent doesn't argue or repeat itself. It removes the real friction: cost, waiting time, distance or doubt that the doctor will be there.",
    visual: <HoldTheSlot />,
    span: '',
  },
  {
    title: 'Questions about your hospital',
    body: 'Everything you would print on a board in your lobby, answered the same way every time.',
    visual: <LobbyBoard />,
    span: '',
  },
  {
    title: 'Peak hours and after hours',
    body: 'Calls arrive in bursts around OPD opening and fall away at night. Staffing for the peak means paying for the trough. The agent takes the repeatable calls, and it is as unhurried on the fortieth call of the hour as on the first.',
    visual: <PeakChart />,
    span: 'lg:col-span-2',
    note: 'Illustrative',
  },
];

/* ── Languages visual: one code-switched sentence, understood ── */

const tokens: [string, 'hi' | 'en'][] = [
  ['Papa ko', 'hi'],
  ['teen din se', 'hi'],
  ['fever', 'en'],
  ['hai,', 'hi'],
  ["and he's coughing", 'en'],
  ['a lot.', 'en'],
];

const CodeSwitchCard: React.FC = () => (
  <div className="hos-anim w-full max-w-[440px] rounded-[22px] p-1.5 dk-card">
    <div className="rounded-[17px] bg-ink-900 ring-1 ring-white/[0.06] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">Sample utterance</span>
        <span className="flex items-center gap-3 text-[10px] text-white/55">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-white/20" />
            Hindi
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm ring-1 ring-hos-yellow bg-hos-yellow/15" />
            English
          </span>
        </span>
      </div>
      <p className="mt-5 flex flex-wrap gap-1.5">
        {tokens.map(([t, lang], i) => (
          <span
            key={t}
            className={`rounded-md px-2 py-1 text-sm ${lang === 'en' ? 'bg-hos-yellow/15 ring-1 ring-hos-yellow/50 text-white' : 'bg-white/[0.1] text-white'}`}
            style={fadeUp(0.15 + i * 0.18)}
          >
            {t}
          </span>
        ))}
      </p>
      <Waveform className="mt-5" height={26} />
      <div className="mt-5 pt-4 border-t border-white/[0.08]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-hos-yellow">Understood as</div>
        <dl className="mt-3 space-y-2 text-[12px]">
          {[
            ['Caller', 'Family member, for their father'],
            ['Complaint', 'Fever for three days, cough'],
            ['Next', 'Rule out an emergency'],
          ].map(([k, v], i) => (
            <div key={k} className="flex items-start justify-between gap-4 rounded-lg bg-white/[0.04] ring-1 ring-white/[0.06] px-3 py-2" style={fadeUp(1.3 + i * 0.15)}>
              <dt className="text-white/55">{k}</dt>
              <dd className="text-right text-white">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </div>
);

/* ── Safety: what it will never do (enforced at the system level) ── */

const nevers: { title: string; body: string }[] = [
  { title: 'No medical advice, medicine names or dosages.', body: 'It routes to a doctor. It never stands in for one, however simple the question sounds.' },
  { title: 'No reading or interpreting test reports.', body: 'What the numbers mean is a consultation, not a phone call.' },
  { title: 'No patient information over the phone.', body: 'It will not confirm whether a named person is admitted, their room or their condition, to any caller.' },
  { title: 'No payment credentials.', body: 'Card numbers, CVV, UPI PIN and OTP are never requested or accepted on a call.' },
  {
    title: 'No guaranteed costs or approvals.',
    body: "Estimates are always approximate and subject to the doctor's assessment. Cashless approval is the insurer's decision, never the hospital's.",
  },
  { title: 'No manufactured urgency.', body: 'It may not imply a condition will worsen to secure a booking. It asks twice, then accepts the answer.' },
  { title: 'No invented facts.', body: 'If something is outside the knowledge base, it says so and transfers, rather than guessing a timing or a price.' },
];

/* ── Setup steps ── */

const setup: { title: string; body: string }[] = [
  { title: 'We learn your hospital', body: 'Departments, doctor schedules, fees, test prices and policies go into the knowledge base the agent answers from.' },
  { title: 'We connect your line', body: 'Call forwarding or SIP trunking from your existing PBX. Unanswered or after-hours calls redirect to the agent.' },
  { title: 'You hear it on your calls', body: 'We build a working version against your actual departments and doctor schedules, and walk you through it.' },
  { title: 'It starts taking calls', body: 'Most hospitals are live in 2 to 4 weeks, with warm transfers to your reception desk or call centre line.' },
];

const inputClass = `w-full rounded-xl bg-white/[0.03] border border-white/[0.12] hover:border-white/25 focus:border-hos-yellow/70 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-hos-yellow/40`;
const labelClass = 'block mb-1.5 text-xs font-semibold text-white/70';

export const FrontDeskPage: React.FC = () => {
  useSeo({
    title: 'AI Front Desk Agent | Nostavia Health',
    description:
      "An AI voice agent that answers every inbound hospital call in local languages, rules out emergencies, names a specific doctor and books the visit, under your hospital's name.",
    path: '/solutions/front-desk',
  });

  // Form State
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    hospitalName: '',
    yourName: '',
    role: '',
    contactNumber: '',
    email: '',
    city: '',
    preferredTimes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.hospitalName && formData.yourName && formData.contactNumber) {
      const refId = newRefId();
      await submitLead(`NEW FRONT DESK ENQUIRY [${refId}]: ${formData.yourName} - ${formData.hospitalName}`, {
        refId,
        interest: 'AI Front Desk Agent',
        company: formData.hospitalName,
        name: formData.yourName,
        role: formData.role,
        phone: formData.contactNumber,
        email: formData.email,
        city: formData.city,
        preferredTimes: formData.preferredTimes,
      });
      setSubmitted(true);
      setTimeout(() => {
        window.location.href = CALENDAR_URL;
      }, 500);
    }
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <div className="flex flex-col font-body text-white bg-ink-950 overflow-x-clip">
      {/* 1. Hero: photo with the call in progress */}
      <section className="relative overflow-hidden bg-ink-950 -mt-16 pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div aria-hidden="true" className="absolute inset-0 dk-grid dk-fade-mask" />
        <div aria-hidden="true" className="absolute left-0 -top-48 w-[1000px] max-w-[160vw] h-[620px] bg-[radial-gradient(closest-side,rgba(245,217,123,0.13),transparent)]" />
        <Container className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <Reveal className="lg:col-span-6 space-y-6">
            <Eyebrow>AI Front Desk Agent</Eyebrow>
            {/* TODO(copy): hero headline, intro and points */}
            <h1 className="font-display font-semibold text-4xl sm:text-6xl tracking-[-0.03em] leading-[1.04] pb-1">
              <span className="dk-text-gradient">Every call answered. </span>
              <span className="dk-text-sun">In their language.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/60 leading-relaxed max-w-xl">
              An AI voice agent on your hospital line. It names a specific doctor, rules out emergencies and books the visit, all under your hospital's name.
            </p>
            <ul className="space-y-2 pt-1">
              {['Local languages, even Hindi and English in one sentence', 'Rules out emergencies before anything else', 'Hands over to your team when a call needs a person'].map((p) => (
                <li key={p} className="flex items-start gap-3 text-base text-white">
                  <span aria-hidden="true" className="mt-2.5 w-4 h-[3px] shrink-0 bg-hos-yellow" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <button type="button" onClick={() => scrollToId('walkthrough')} className={primaryBtn}>
                Request a walkthrough
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => scrollToId('safety')} className={secondaryBtn}>
                See what it won't do
              </button>
            </div>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-6">
            <div className="relative min-h-[440px] sm:min-h-[520px] rounded-[20px] overflow-hidden bg-ink-800 ring-1 ring-white/10 shadow-[0_40px_90px_-45px_rgba(0,0,0,0.75)]">
              <img
                src="/photos/home-frontdesk-staff.jpg"
                alt="Hospital staff working at a front desk"
                width={1600}
                height={1067}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/10" />
              <div aria-hidden="true" className="absolute top-4 right-4 sm:top-6 sm:right-6 inline-flex items-center gap-1.5 rounded-full bg-ink-950/80 ring-1 ring-white/15 px-3 py-1.5 text-[11px] text-white/80">
                <PhoneIncoming className="w-3.5 h-3.5 text-hos-yellow" />
                Answering as Your Hospital
              </div>
              <div aria-hidden="true" className="absolute left-4 right-4 bottom-4 sm:left-6 sm:right-auto sm:bottom-6">
                <VoiceCallCard />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 2. Deployment case study */}
      <Section bg="mist" labelledBy="fd-proof-heading">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <Reveal className="lg:col-span-5 space-y-5">
            {/* TODO(copy): case study heading and intro */}
            <SectionHeading
              id="fd-proof-heading"
              eyebrow="Running in a hospital today"
              title="Real patients. Real calls. Not a demo."
              intro="The agent handles real inbound patient calls at a tertiary-care cardiology hospital, against real hospital flow."
            />
            <p className="text-sm text-white/55">Client named on request, under NDA.</p>
          </Reveal>
          <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Languages, title: 'Code-switching, mid-sentence', body: 'Callers move between Hindi and English inside a single sentence. The agent follows them.' },
              { icon: Users, title: 'Family members speak for the patient', body: "A son calls for his father, a daughter for her mother. The agent is built for callers speaking on a patient's behalf." },
              { icon: MessageSquareQuote, title: 'The real question comes later', body: 'What a caller asks first is often not what they need. The agent is built for that conversational pattern.' },
              { icon: PhoneForwarded, title: 'A person when it leaves the routine', body: 'When a call goes outside the routine envelope, the agent hands it to a human.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <li key={title}>
                <Reveal delay={(i % 2) * 90} className="h-full">
                  <div className="h-full rounded-[20px] dk-card p-6 flex flex-col gap-3">
                    <span className="w-10 h-10 rounded-[10px] bg-white/[0.05] ring-1 ring-white/10 text-hos-yellow flex items-center justify-center">
                      <Icon aria-hidden="true" className="w-5 h-5" />
                    </span>
                    <h3 className="font-display font-semibold text-lg text-white leading-snug">{title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 3. How a call flows */}
      <Section labelledBy="fd-flow-heading">
        {/* TODO(copy): call flow heading and intro */}
        <SectionHead
          id="fd-flow-heading"
          eyebrow="How a call flows"
          title="From hello to a booked visit."
          intro="A sample call, step by step. Pick a step to see that moment of the conversation."
        />
        <Reveal>
          <CallFlow />
        </Reveal>
      </Section>

      {/* 4. What it handles */}
      <Section bg="mist" labelledBy="fd-handles-heading">
        {/* TODO(copy): handles heading and intro */}
        <SectionHead
          id="fd-handles-heading"
          eyebrow="What it handles"
          title="The calls your desk finds hardest."
          intro="Not a feature list. What the agent actually does when the phone rings."
        />
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {handles.map((t, i) => (
            <li key={t.title} className={t.span}>
              <Reveal delay={(i % 3) * 80} className="h-full">
                <div className="group relative flex flex-col h-full min-h-[300px] rounded-[20px] dk-card p-6 overflow-hidden">
                  <span aria-hidden="true" className="absolute -right-16 -top-16 w-48 h-48 bg-[radial-gradient(closest-side,rgba(245,217,123,0.10),transparent)]" />
                  <h3 className="relative text-xl font-semibold text-white leading-snug">{t.title}</h3>
                  <p className="relative mt-2 text-sm text-white/60 leading-relaxed">{t.body}</p>
                  <div aria-hidden="true" className="hos-anim relative mt-auto pt-6">
                    {t.note && <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">{t.note}</div>}
                    {t.visual}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* 5. Languages */}
      <section aria-labelledby="fd-lang-heading" className="bg-ink-950 py-20 sm:py-28">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal className="space-y-6">
            {/* TODO(copy): languages heading and intro */}
            <SectionHeading
              id="fd-lang-heading"
              eyebrow="Languages"
              title="Speaks the way your callers do."
              intro="Callers switch languages mid-sentence, use regional words for symptoms and rarely lead with the real question. The agent is built for exactly that."
            />
            <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {[
                'Answers in local languages, set up for your deployment',
                'Follows Hindi and English code-switching mid-sentence',
                'Understands regional variations in medical terms',
                'Built for natural Indian dialect patterns',
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 py-3 text-base text-white/70">
                  <span aria-hidden="true" className="mt-2.5 w-4 h-[3px] shrink-0 bg-hos-yellow" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={150} className="flex justify-center lg:justify-end">
            <CodeSwitchCard />
          </Reveal>
        </Container>
      </section>

      {/* 6. Safety */}
      <Section id="safety" bg="navy" labelledBy="fd-safety-heading" className="scroll-mt-20">
        {/* TODO(copy): safety heading and intro */}
        <SectionHead
          id="fd-safety-heading"
          eyebrow="Safety"
          title="Emergencies first. A human when it matters."
          intro="A hospital agent is only as valuable as what it refuses to do. These rules are enforced at the system level, not left to the model's judgement on the day."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Reveal className="h-full">
            <div className="h-full rounded-[20px] dk-card p-6 sm:p-8 flex flex-col gap-4">
              <span className="w-10 h-10 rounded-[10px] bg-rose-400/10 ring-1 ring-rose-300/30 text-rose-300 flex items-center justify-center">
                <Siren aria-hidden="true" className="w-5 h-5" />
              </span>
              <h3 className="font-display font-semibold text-2xl text-white tracking-tight">It rules out emergencies first</h3>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                Chest pain, breathlessness, bleeding, seizure, trauma. Every booking behaviour switches off at once, and the call is handled as a dispatch, not an
                enquiry.
              </p>
              <div className="mt-auto rounded-xl bg-white/[0.04] border-l-2 border-rose-300/70 px-4 py-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-rose-300">What the caller hears</div>
                <p className="mt-1.5 text-sm text-white leading-relaxed">“Ye emergency hai. Turant ambulance bulaiye, ya line par rahiye. Address aur landmark bataiye.”</p>
                <p className="mt-1 text-xs text-white/55 leading-relaxed">“This is an emergency. Call an ambulance now, or stay on the line. Tell me the address and a landmark.”</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <div className="h-full rounded-[20px] dk-card p-6 sm:p-8 flex flex-col gap-4">
              <span className="w-10 h-10 rounded-[10px] bg-white/[0.05] ring-1 ring-white/10 text-hos-yellow flex items-center justify-center">
                <PhoneForwarded aria-hidden="true" className="w-5 h-5" />
              </span>
              <h3 className="font-display font-semibold text-2xl text-white tracking-tight">It hands over to your team</h3>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                If a caller asks for a person, or the call needs coordination beyond the routine, the agent places a warm transfer to your reception desk or call
                centre line. Calls that need a person are handed off, not dropped.
              </p>
              <div aria-hidden="true" className="hos-anim mt-auto flex items-center gap-3 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06] px-4 py-3 text-xs">
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-white">Agent</span>
                <span className="relative flex-1 h-px bg-white/20">
                  {['0%', '33%', '66%'].map((left, i) => (
                    <span
                      key={left}
                      className="absolute -top-[2.5px] w-1.5 h-1.5 rounded-full bg-hos-yellow"
                      style={{ left, animation: `hos-flow 2.1s linear ${i * 0.7}s infinite both` }}
                    />
                  ))}
                </span>
                <span className="rounded-full bg-hos-yellow/15 ring-1 ring-hos-yellow/40 px-2.5 py-1 text-white">Reception desk</span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <Reveal className="lg:col-span-7 h-full">
            <Panel className="h-full">
              <h3 className="font-display font-semibold text-xl text-white">What it will never do</h3>
              <p className="mt-2 text-sm text-white/60">A refusal always ends with a route forward, never a stranded caller.</p>
              <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                {nevers.map((n) => (
                  <li key={n.title} className="flex items-start gap-3">
                    <Ban aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0 text-hos-yellow" />
                    <span>
                      <span className="block text-sm font-semibold text-white leading-snug">{n.title}</span>
                      <span className="block mt-1 text-sm text-white/60 leading-relaxed">{n.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5 h-full">
            <Panel dark className="h-full flex flex-col gap-5">
              <h3 className="font-display font-semibold text-xl text-white">Narrow by design</h3>
              <ul className="space-y-4">
                {[
                  { icon: Database, title: 'No patient database', body: 'No connection to hospital records and no way to look up an individual patient. It cannot leak what it cannot reach.' },
                  { icon: BookOpen, title: 'Operational information only', body: 'Doctor schedules, fees, department lists, test prices, tariffs and policies.' },
                  { icon: UserCheck, title: 'Caller details for the booking only', body: 'Name, age and mobile number, collected to place an appointment. Never used for profiling, marketing or resale.' },
                ].map(({ icon: Icon, title, body }) => (
                  <li key={title} className="flex items-start gap-3 border-t border-white/10 pt-4">
                    <Icon aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0 text-hos-yellow" />
                    <span>
                      <span className="block text-sm font-semibold text-white">{title}</span>
                      <span className="block mt-1 text-sm text-white/60 leading-relaxed">{body}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-auto text-xs text-white/55 leading-relaxed">
                A data processing addendum covering retention, call recording and access control is issued with every engagement. Records integration and live slot
                booking are scoped separately, with their own data agreement. Nothing on this page is a compliance certification.
              </p>
            </Panel>
          </Reveal>
        </div>
        <Disclaimer />
      </Section>

      {/* 7. Setup and pricing */}
      <Section labelledBy="fd-setup-heading">
        {/* TODO(copy): setup heading and intro */}
        <SectionHead
          id="fd-setup-heading"
          eyebrow="Setup and pricing"
          title="On your existing line in weeks."
          intro="No new phone system and no records integration to start. We build it around your departments and doctor schedules."
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          <ol className="lg:col-span-7 space-y-0">
            {setup.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 90} className="relative flex gap-5 pb-8 last:pb-0">
                  {i < setup.length - 1 && <span aria-hidden="true" className="absolute left-[17px] top-10 bottom-0 w-px bg-gradient-to-b from-hos-yellow/50 to-white/[0.06]" />}
                  <span className="relative w-9 h-9 shrink-0 rounded-full ring-1 ring-hos-yellow/50 bg-ink-950 text-hos-yellow text-xs font-mono font-semibold flex items-center justify-center">
                    <span className="sr-only">Step </span>
                    {i + 1}
                  </span>
                  <span className="pt-1.5">
                    <h3 className="font-display font-semibold text-lg text-white">{s.title}</h3>
                    <p className="mt-1.5 text-sm text-white/60 leading-relaxed max-w-lg">{s.body}</p>
                  </span>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[22px] dk-card dk-ring-sun p-6 sm:p-8">
              <span aria-hidden="true" className="absolute -right-20 -top-20 w-56 h-56 bg-[radial-gradient(closest-side,rgba(245,217,123,0.14),transparent)]" />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-hos-yellow">AI Front Desk Agent</span>
                  <span className="rounded-full bg-white/[0.06] ring-1 ring-white/10 px-2.5 py-1 text-[11px] text-white/80">White Label</span>
                </div>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-white/55">One-time setup</dt>
                    <dd className="mt-1 font-display font-semibold text-4xl text-white tracking-tight">
                      <span className="text-base font-normal text-white/60">from </span>$1,500
                    </dd>
                  </div>
                  <div className="border-t border-white/[0.08] pt-4">
                    <dt className="text-sm text-white/55">Monthly plan</dt>
                    <dd className="mt-1 font-display font-semibold text-4xl text-white tracking-tight">
                      <span className="text-base font-normal text-white/60">from </span>$399<span className="text-base font-normal text-white/60">/mo</span>
                    </dd>
                  </div>
                </dl>
                <p className="text-sm text-white/60 leading-relaxed">Depending on languages and departments. Very high call volumes are billed per minute.</p>
                <div className="flex flex-col gap-3">
                  <Link to="/pricing" className={textLink}>
                    See all pricing
                    <ArrowRight aria-hidden="true" className="w-4 h-4" />
                  </Link>
                  <Link to="/solutions/hospitals" className={textLink}>
                    Part of Hospital Programmes
                    <ArrowRight aria-hidden="true" className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 8. Walkthrough request form */}
      <section id="walkthrough" aria-labelledby="fd-walkthrough-heading" className="scroll-mt-20 bg-ink-900 border-y border-white/[0.06] py-20 sm:py-28">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <Reveal className="lg:col-span-5 space-y-6">
            {/* TODO(copy): walkthrough heading and intro */}
            <SectionHeading
              id="fd-walkthrough-heading"
              eyebrow="Request a walkthrough"
              title="Hear it answer your calls."
              intro="The fastest way to judge it is to hear it take a call the way your patients would. We build a working version against your actual departments and doctor schedules, then walk you through it in a 20-minute call."
            />
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="rounded-[22px] dk-card p-6 sm:p-10">
              {submitted ? (
                <div role="status" className="py-6 flex flex-col items-center text-center gap-4">
                  <span className="w-14 h-14 rounded-full bg-emerald-400/15 ring-1 ring-emerald-300/40 flex items-center justify-center">
                    <CheckCircle2 aria-hidden="true" className="w-7 h-7 text-emerald-300" />
                  </span>
                  <h3 className="font-display font-semibold text-2xl text-white">Request received</h3>
                  <p className="text-sm text-white/60 max-w-md leading-relaxed">
                    Thank you. We have logged your request and are taking you to Google Calendar to pick a time for your walkthrough.
                  </p>
                  <a href={CALENDAR_URL} className={primaryBtn}>
                    <Calendar aria-hidden="true" className="w-4 h-4" />
                    Pick a time on Google Calendar
                  </a>
                  <button type="button" onClick={() => setSubmitted(false)} className={secondaryBtn}>
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fd-hospital" className={labelClass}>
                        Hospital name *
                      </label>
                      <input
                        id="fd-hospital"
                        required
                        type="text"
                        autoComplete="organization"
                        placeholder="e.g. City Care Super Specialty Hospital"
                        value={formData.hospitalName}
                        onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="fd-name" className={labelClass}>
                        Your name *
                      </label>
                      <input
                        id="fd-name"
                        required
                        type="text"
                        autoComplete="name"
                        placeholder="e.g. Dr. Rajesh Kumar"
                        value={formData.yourName}
                        onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fd-role" className={labelClass}>
                        Role
                      </label>
                      <input
                        id="fd-role"
                        type="text"
                        autoComplete="organization-title"
                        placeholder="e.g. Medical Director / Operations Head"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="fd-phone" className={labelClass}>
                        Phone number *
                      </label>
                      <input
                        id="fd-phone"
                        required
                        type="tel"
                        autoComplete="tel"
                        placeholder="Your phone number"
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fd-email" className={labelClass}>
                        Email
                      </label>
                      <input
                        id="fd-email"
                        type="email"
                        autoComplete="email"
                        placeholder="admin@hospital.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="fd-city" className={labelClass}>
                        City
                      </label>
                      <input
                        id="fd-city"
                        type="text"
                        autoComplete="address-level2"
                        placeholder="e.g. Mumbai / New Delhi / Bengaluru"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="fd-times" className={labelClass}>
                      Which days and times suit you for a 20-minute call?
                    </label>
                    <textarea
                      id="fd-times"
                      rows={2}
                      placeholder="e.g. Tuesday or Thursday morning around 11 AM"
                      value={formData.preferredTimes}
                      onChange={(e) => setFormData({ ...formData, preferredTimes: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <button type="submit" className={`${primaryBtn} w-full sm:w-auto`}>
                    Request a walkthrough
                    <ArrowRight aria-hidden="true" className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 9. FAQ */}
      <FaqList
        id="fd-faq-heading"
        bg="white"
        title="What operations leaders ask"
        items={[
          {
            q: 'Which languages does it speak?',
            a: 'Local languages, set up for your deployment. It is built for natural Indian dialect patterns, Hindi and English code-switching mid-sentence, and regional variations in medical terms.',
          },
          {
            q: 'Do we need to replace our phone system?',
            a: 'No. It runs through call forwarding or SIP trunking from your existing hospital PBX. Unanswered or after-hours calls redirect to the agent.',
          },
          {
            q: 'What happens when a caller needs a person?',
            a: 'If a caller asks for a human, or needs coordination outside the routine, the agent places a warm transfer to your reception desk or call centre line.',
          },
          {
            q: 'What happens on an emergency call?',
            a: 'Every booking behaviour switches off. The agent tells the caller to call an ambulance or stay on the line, and asks for the address and a landmark.',
          },
          {
            q: 'Can it look up patients or read reports?',
            a: 'No. It has no connection to hospital records, will not read or interpret test reports, and will not confirm whether a named person is admitted. Every refusal ends with a route forward, such as a follow-up slot with a doctor.',
          },
          {
            q: 'What caller data does it collect?',
            a: 'Name, age and mobile number, collected to place the appointment and never used for profiling, marketing or resale. A data processing addendum covering retention, call recording and access control is issued with every engagement.',
          },
          {
            q: 'How much does it cost?',
            a: 'It is a White Label product: a one-time setup from $1,500 plus a monthly plan from $399, depending on languages and departments. Very high call volumes are billed per minute. Most hospitals are live in 2 to 4 weeks.',
          },
        ]}
      />

      {/* 10. Closing CTA */}
      {/* TODO(copy): closing headline and body */}
      <CtaBand
        title="Let your front desk"
        highlight="answer every call."
        body="See it answer calls against your doctor schedule and department listings in a 20-minute walkthrough."
        primary={{ to: '/demo', label: 'Request a demo' }}
        secondary={{ to: '/solutions/hospitals', label: 'All hospital programmes' }}
      />
    </div>
  );
};

export default FrontDeskPage;
