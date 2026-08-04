import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Phone,
  MessageSquare,
  Globe,
  Lock,
  Building2,
  UserCheck,
  Volume2
} from 'lucide-react';

export const FrontDeskPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Form State
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    hospitalName: '',
    yourName: '',
    role: '',
    contactNumber: '',
    email: '',
    city: '',
    preferredTimes: ''
  });

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.hospitalName && formData.yourName && formData.contactNumber) {
      setSubmitted(true);
    }
  };

  const scrollToWalkthrough = () => {
    const el = document.getElementById('walkthrough-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToRefusal = () => {
    const el = document.getElementById('refusal-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-20 py-10 font-body text-[#0F172A] bg-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO EXECUTIVE SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-8 sm:p-14 lg:p-16 bg-white border border-[#E2E8F0] rounded-[2px] space-y-8 shadow-none relative overflow-hidden">
          
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            FOR HOSPITALS AND CLINICS — NOSTAVIA FRONT DESK
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#0F172A] tracking-tight max-w-4xl leading-[1.02]">
            The front desk is where hospitals lose patients.
          </h1>

          <p className="text-base sm:text-xl text-[#64748B] max-w-3xl leading-relaxed font-body">
            Nostavia Front Desk is an always-on patient support agent that answers every call in Hinglish, names a specific doctor, and turns an enquiry into a booked visit. It runs under your hospital's name.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={scrollToWalkthrough}
              className="bg-[#000000] hover:bg-[#1A1A1A] text-white font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] shadow-sm transition-all inline-flex items-center gap-2"
            >
              Request a walkthrough
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToRefusal}
              className="bg-white hover:bg-slate-50 text-[#0F172A] border border-[#CBD5E1] font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-[2px] transition-all"
            >
              See what it will not do
            </button>
          </div>

          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#E2E8F0] font-mono text-xs text-[#0F172A]">
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">Hinglish</div>
              <div className="text-[#64748B] font-semibold mt-1">Native Voice Conversational</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">0 Leakage</div>
              <div className="text-[#64748B] font-semibold mt-1">Named Doctors + Specific Slots</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">100%</div>
              <div className="text-[#64748B] font-semibold mt-1">Calls Answered Immediately</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">White-Label</div>
              <div className="text-[#64748B] font-semibold mt-1">Under Your Hospital's Name</div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE CORE PROBLEM */}
      {/* ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            THE FRONT DESK BOTTLENECK
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            Your doctors are available. Your phone is the bottleneck.
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl leading-relaxed font-body">
            A patient calls with a complaint they cannot name. What happens in the next ninety seconds decides whether they arrive at your hospital or somewhere else. Three things break at that moment, and none of them are clinical.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono text-sm">
                1
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                They are not told who to meet
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed font-body">
                A caller who hears the name of a department has been given a category. A caller who hears the name of a doctor, their designation and their years of experience has been given a reason to travel.
              </p>
            </div>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono text-sm">
                2
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                They are not told the doctor will be there
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed font-body">
                The fear of travelling and finding nobody is the most common unspoken objection on a hospital call. It is almost never addressed out loud.
              </p>
            </div>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono text-sm">
                3
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                They are handled badly
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed font-body">
                Not out of malice. A desk handling forty calls in an hour, with patients queuing in front of it, will get short with the tenth person asking the same question. That is a staffing problem, not an attitude problem.
              </p>
            </div>
          </div>

        </div>

        {/* Peak Load Explanation Banner */}
        <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-2 font-body text-sm text-[#64748B] leading-relaxed">
          <p>
            Calls arrive in bursts, cluster around OPD opening, and fall to nothing at night. Staffing for the peak means paying for the trough. Nostavia Front Desk takes the repeatable questions off the desk entirely, so the people at your counter are free for the ones that need a human.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FOUR CALLS, FOUR BEHAVIOURS */}
      {/* ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            AGENT BEHAVIOURS
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            Four calls, four behaviours
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl leading-relaxed font-body">
            Not a feature list. What the agent actually does when the phone rings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Scenario 01 */}
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-5 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="font-mono text-xs font-bold text-[#64748B] uppercase tracking-wider">
                SCENARIO 01 · UNCERTAIN COMPLAINT
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                The caller who cannot name their problem
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed font-body">
                The agent lets them finish, reflects the complaint back so they know they were heard, rules out an emergency, then converts a vague symptom into a named doctor and a specific time.
              </p>
            </div>

            <div className="p-4 bg-white border border-[#E2E8F0] border-l-4 border-l-[#0F172A] rounded-[2px] space-y-1">
              <div className="font-mono text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                WHAT THE CALLER HEARS:
              </div>
              <p className="text-sm text-[#0F172A] font-medium italic">
                "Iske liye Dr. [name] hain, Senior Physician, unnees saal ka experience. Wo kal subah nau se ek baje tak rahenge. Main gyarah baje ka slot de doon?"
              </p>
            </div>
          </div>

          {/* Scenario 02 */}
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-5 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="font-mono text-xs font-bold text-[#64748B] uppercase tracking-wider">
                SCENARIO 02 · FRICTION REMOVAL
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                The caller who says they will think about it
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed font-body">
                The most expensive sentence on a hospital phone line. The agent does not argue and does not repeat itself. It removes the specific friction: cost, waiting time, distance, or doubt about whether the doctor will show up.
              </p>
            </div>

            <div className="p-4 bg-white border border-[#E2E8F0] border-l-4 border-l-[#0F172A] rounded-[2px] space-y-1">
              <div className="font-mono text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                WHAT THE CALLER HEARS:
              </div>
              <p className="text-sm text-[#0F172A] font-medium italic">
                "Bilkul, koi jaldi nahi. Par main slot hold kar deti hoon, na aa payein to phone kar dijiyega, cancel karne ka koi charge nahi hai."
              </p>
            </div>
          </div>

          {/* Scenario 03 */}
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-5 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="font-mono text-xs font-bold text-red-600 uppercase tracking-wider">
                SCENARIO 03 · EMERGENCY PROTOCOL
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                The emergency call
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed font-body">
                Chest pain, breathlessness, bleeding, seizure, trauma. Every booking behaviour switches off instantly. The agent stops handling the call as an enquiry and starts handling it as a dispatch.
              </p>
            </div>

            <div className="p-4 bg-white border border-[#E2E8F0] border-l-4 border-l-red-600 rounded-[2px] space-y-1">
              <div className="font-mono text-[10px] font-bold text-red-600 uppercase tracking-wider">
                WHAT THE CALLER HEARS:
              </div>
              <p className="text-sm text-[#0F172A] font-medium italic">
                "Ye emergency hai. Turant ambulance bulaiye, ya line par rahiye. Address aur landmark bataiye."
              </p>
            </div>
          </div>

          {/* Scenario 04 */}
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-5 hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="font-mono text-xs font-bold text-[#64748B] uppercase tracking-wider">
                SCENARIO 04 · STRICT REFUSAL
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                The question that must be refused
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed font-body">
                A caller asking what their test report says, or whether a relative has been admitted. The agent refuses, but never leaves the caller stranded. A refusal always ends with a route forward.
              </p>
            </div>

            <div className="p-4 bg-white border border-[#E2E8F0] border-l-4 border-l-[#0F172A] rounded-[2px] space-y-1">
              <div className="font-mono text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                WHAT THE CALLER HEARS:
              </div>
              <p className="text-sm text-[#0F172A] font-medium italic">
                "Main report phone par nahi padh sakti. Link aapke number par bhej di hai, iska matlab doctor hi theek se batayenge. Follow-up ka time de doon?"
              </p>
            </div>
          </div>

        </div>

        {/* Underlying Mechanic Note */}
        <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-2">
          <div className="font-mono text-xs font-bold text-[#0F172A] uppercase tracking-wider">
            THE MECHANIC UNDERNEATH ALL FOUR
          </div>
          <p className="text-sm text-[#64748B] leading-relaxed font-body">
            Never a department, always a person. Never "kabhi bhi aa jaiye", always a day and a time. The agent is unhurried on the fortieth call of the hour in exactly the way it was on the first.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3B. DEPLOYMENT PROOF */}
      {/* ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            DEPLOYED IN PRODUCTION
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            Running inside a tertiary care cardiology hospital in Kanpur
          </h2>
          <p className="text-xs text-[#64748B] font-mono">
            Client named on request, under NDA.
          </p>
        </div>

        <div className="p-4 bg-white border border-[#E2E8F0] border-l-4 border-l-[#0F172A] rounded-[2px] font-mono text-xs text-[#0F172A] leading-relaxed">
          "This is not a demo. The voice agent handles real inbound patient calls against real hospital flow. Callers code-switch between Hindi and English mid-sentence. Family members speak on behalf of the patient. The actual question is frequently not the one asked first. The agent is built for that conversational pattern, and hands off to a human when the call leaves the routine envelope."
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ONE AGENT, THREE CHANNELS */}
      {/* ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            OMNICHANNEL ARCHITECTURE
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            One agent, three channels
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl leading-relaxed font-body">
            One knowledge base behind all of them. A patient gets the same answer whether they dial, message, or open your website. Nothing is maintained three times.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono text-sm">
              1
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
              Telephony
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              The primary channel. The agent answers your hospital line directly, including outside OPD hours and during peak load when the desk cannot pick up. Calls that need a person are handed off, not dropped.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono text-sm">
              2
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
              WhatsApp
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Calls and messaging through a WhatsApp Business number. Appointment requests, timings and directions handled in text, which suits younger patients and attendants coordinating from out of town.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-[2px] bg-[#0F172A] text-white flex items-center justify-center font-bold font-mono text-sm">
              3
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
              Website widget
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              An embeddable chat widget on your site. Captures the visitor comparing options late at night who would otherwise leave without contact.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. WHAT IT WILL NEVER DO (REFUSALS) */}
      {/* ========================================================================= */}
      <section id="refusal-section" className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            SYSTEM-LEVEL SAFEGUARDS
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            What it will never do
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl leading-relaxed font-body">
            A support agent for a hospital is only as valuable as the things it refuses to do. These are enforced at the system level, not left to the model's judgement on the day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              num: "01",
              title: "No medical advice, diagnosis, medicine name or dosage.",
              desc: "The agent routes to a doctor. It never substitutes for one, however simple the question sounds."
            },
            {
              num: "02",
              title: "No reading or interpreting test reports.",
              desc: "It confirms a report is ready and sends the link. What the numbers mean is a consultation, not a phone call."
            },
            {
              num: "03",
              title: "No patient information over the phone.",
              desc: "It will not confirm whether a named person is admitted, their room, or their condition, to any caller."
            },
            {
              num: "04",
              title: "No payment credentials.",
              desc: "Card numbers, CVV, UPI PIN and OTP are never requested or accepted on a call."
            },
            {
              num: "05",
              title: "No guaranteed costs or approvals.",
              desc: "Estimates are always framed as approximate and subject to the doctor's assessment. Cashless approval is stated as the insurer's decision, never the hospital's."
            },
            {
              num: "06",
              title: "No manufactured urgency.",
              desc: "The agent is not permitted to imply a condition will worsen in order to secure a booking. That is a clinical claim. It asks twice, then accepts the answer."
            },
            {
              num: "07",
              title: "No invented facts.",
              desc: "If something is outside the knowledge base, the agent says so and transfers, rather than guessing at a timing or a price."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-2 hover:border-[#CBD5E1] transition-all">
              <div className="font-display font-extrabold text-lg text-[#0F172A]">
                <span className="font-mono text-[#64748B] text-sm mr-2">{item.num} ·</span>
                {item.title}
              </div>
              <p className="text-sm text-[#64748B] leading-relaxed font-body">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. NARROW BY DESIGN */}
      {/* ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            SECURITY & SCOPING
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            Narrow by design
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
              No patient database
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              The agent has no connection to hospital records and no ability to look up an individual patient. It cannot leak what it cannot reach.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
              Operational information only
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Doctor schedules, fees, department lists, test prices, tariffs and policies. Information you would print on a board in your lobby.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-4 hover:border-[#CBD5E1] transition-all">
            <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
              Caller details are used for the booking
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Name, age and mobile number are collected to place an appointment. Not used for profiling, marketing, or resale.
            </p>
          </div>

        </div>

        <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-2 font-body text-xs text-[#64748B] leading-relaxed">
          <p>
            <strong className="text-[#0F172A]">Records integration stays out of scope until you ask for it.</strong> Live slot booking and record lookup are separate conversations with their own data agreement. A data processing addendum covering retention, call recording and access control is issued with every engagement. Nothing on this page is a compliance certification.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PRODUCT ROADMAP */}
      {/* ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            ROADMAP & EXPANSION
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            The desk today, the whole patient conversation next
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl leading-relaxed font-body">
            What goes live first is deliberately the smallest useful version. The same layer supports more once it has earned your trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-3 hover:border-[#CBD5E1] transition-all">
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">
              Appointment reminders
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              A call the evening before every booked slot, so a booked patient becomes an arriving patient.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-3 hover:border-[#CBD5E1] transition-all">
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">
              Post-discharge follow-up
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              A structured check-in call after discharge, routing anything concerning back to the treating department.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-3 hover:border-[#CBD5E1] transition-all">
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">
              Reason-for-call analytics
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Every call tagged by what it was about, so you learn what your phone actually demands.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] space-y-3 hover:border-[#CBD5E1] transition-all">
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">
              Campaign calling
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-body">
              Camp invitations, vaccination reminders and checkup drives, run as batches against a list.
            </p>
          </div>

        </div>

        <div className="text-xs text-[#64748B] font-mono">
          * These are on the roadmap. None of them are part of an initial deployment, and each is scoped separately.
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. INTERACTIVE WALKTHROUGH REQUEST FORM */}
      {/* ========================================================================= */}
      <section id="walkthrough-section" className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            REQUEST A WALKTHROUGH
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            See it handle your calls
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl leading-relaxed font-body">
            The fastest way to judge this is to hear it answer a call the way your patients would. We will build a working version against your actual departments and doctor schedules, and walk you through it.
          </p>
        </div>

        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] p-8 sm:p-12 shadow-none max-w-4xl">
          {submitted ? (
            <div className="py-8 flex flex-col items-center text-center space-y-4 font-body">
              <div className="w-14 h-14 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center mb-1">
                <CheckCircle2 className="w-8 h-8 text-[#059669]" />
              </div>

              <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                Walkthrough Request Confirmed
              </h3>

              <p className="text-sm text-[#64748B] max-w-lg leading-relaxed">
                Thank you. We will reply on WhatsApp within one working day to confirm a time from the slots you have given.
              </p>

              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 bg-white hover:bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1] font-display text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-[2px] transition-all cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs font-body">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#0F172A] mb-1.5 font-mono text-[11px] font-bold uppercase">HOSPITAL NAME *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. City Care Super Specialty Hospital"
                    value={formData.hospitalName}
                    onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                    className="w-full bg-white border border-[#E2E8F0] focus:border-[#0F172A] rounded-[2px] px-4 py-3 text-[#0F172A] outline-none font-body text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#0F172A] mb-1.5 font-mono text-[11px] font-bold uppercase">YOUR NAME *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Dr. Rajesh Kumar"
                    value={formData.yourName}
                    onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
                    className="w-full bg-white border border-[#E2E8F0] focus:border-[#0F172A] rounded-[2px] px-4 py-3 text-[#0F172A] outline-none font-body text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#0F172A] mb-1.5 font-mono text-[11px] font-bold uppercase">ROLE</label>
                  <input
                    type="text"
                    placeholder="e.g. Medical Director / Operations Head"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-white border border-[#E2E8F0] focus:border-[#0F172A] rounded-[2px] px-4 py-3 text-[#0F172A] outline-none font-body text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#0F172A] mb-1.5 font-mono text-[11px] font-bold uppercase">PHONE OR WHATSAPP NUMBER *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    className="w-full bg-white border border-[#E2E8F0] focus:border-[#0F172A] rounded-[2px] px-4 py-3 text-[#0F172A] outline-none font-body text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#0F172A] mb-1.5 font-mono text-[11px] font-bold uppercase">EMAIL</label>
                  <input
                    type="email"
                    placeholder="admin@hospital.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-[#E2E8F0] focus:border-[#0F172A] rounded-[2px] px-4 py-3 text-[#0F172A] outline-none font-body text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#0F172A] mb-1.5 font-mono text-[11px] font-bold uppercase">CITY</label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai / New Delhi / Bengaluru"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white border border-[#E2E8F0] focus:border-[#0F172A] rounded-[2px] px-4 py-3 text-[#0F172A] outline-none font-body text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#0F172A] mb-1.5 font-mono text-[11px] font-bold uppercase">WHICH DAYS AND TIMES SUIT YOU FOR A 20 MINUTE CALL?</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Tuesday or Thursday morning around 11 AM"
                  value={formData.preferredTimes}
                  onChange={(e) => setFormData({ ...formData, preferredTimes: e.target.value })}
                  className="w-full bg-white border border-[#E2E8F0] focus:border-[#0F172A] rounded-[2px] px-4 py-3 text-[#0F172A] outline-none font-body text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-[#000000] hover:bg-[#1A1A1A] text-white font-display text-xs font-bold uppercase tracking-wider px-9 py-4 rounded-[2px] shadow-sm transition-all inline-flex items-center justify-center gap-2 mt-2"
              >
                Request a walkthrough
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. INTERACTIVE FAQ SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full space-y-10">
        <div className="space-y-3">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0F172A] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4 max-w-4xl">
          {[
            {
              q: "How does Nostavia Front Desk handle Hinglish and accent variations?",
              a: "Nostavia Front Desk uses specialized conversational models trained on natural Indian dialect patterns, code-switching between Hindi and English, and regional medical term variations."
            },
            {
              q: "Can the agent integrate into our hospital line without replacing our phone system?",
              a: "Yes. Nostavia Front Desk operates via direct call-forwarding or SIP trunking from your existing hospital PBX. Unanswered or after-hours calls redirect seamlessly."
            },
            {
              q: "What happens when a caller requires an immediate human handoff?",
              a: "If a caller asks for a human or requires complex coordination outside operational bounds, the agent places a warm transfer directly to your reception desk or call center line."
            }
          ].map((faq, idx) => (
            <div key={idx} className="border border-[#E2E8F0] rounded-[2px] overflow-hidden bg-white shadow-none">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left font-display font-extrabold text-lg text-[#0F172A] flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span>{faq.q}</span>
                {activeFaq === idx ? <ChevronUp className="w-5 h-5 text-[#0F172A]" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              {activeFaq === idx && (
                <div className="p-6 pt-0 text-sm text-[#64748B] leading-relaxed border-t border-[#E2E8F0] font-body">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. FINAL ENTERPRISE CTA BANNER */}
      {/* ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full pt-4">
        <div className="p-12 sm:p-16 lg:p-20 bg-[#0F172A] text-white rounded-[2px] border border-[#1E293B] shadow-2xl text-center flex flex-col items-center gap-8">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-white max-w-4xl leading-[1.05] tracking-tight">
            Deploy Nostavia Front Desk for your hospital
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-body max-w-2xl leading-relaxed">
            See it answer calls against your doctor schedule and department listings in a live 20-minute walkthrough.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={scrollToWalkthrough}
              className="bg-white hover:bg-slate-100 text-[#0F172A] font-display text-xs font-bold uppercase tracking-wider px-9 py-4 rounded-[2px] shadow-md transition-all inline-flex items-center gap-2"
            >
              Request a walkthrough
              <ArrowRight className="w-4 h-4 text-[#0F172A]" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FrontDeskPage;
