import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  faqs: FaqItem[];
  defaultOpenIndex?: number | null;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  eyebrow = 'FREQUENTLY ASKED QUESTIONS',
  title,
  description = 'Have a question not answered here? Speak directly with our engineering founders.',
  faqs,
  defaultOpenIndex = 0,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(defaultOpenIndex);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full py-8 font-body text-[#0F172A]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        
        {/* Left Column (Sticky Title & CTA) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
          <div className="eyebrow text-[#64748B] font-bold text-xs uppercase tracking-widest font-mono">
            {eyebrow}
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[40px] text-[#0F172A] tracking-tight leading-[1.08]">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#475569] font-body leading-relaxed">
            {description}
          </p>
          <div className="pt-2">
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-[2px] shadow-sm transition-all"
            >
              <span>Ask a question</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </Link>
          </div>
        </div>

        {/* Right Column (Edge-to-Edge FAQ Accordions) */}
        <div className="lg:col-span-7 space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="border border-[#E2E8F0] rounded-[2px] overflow-hidden bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left font-display font-extrabold text-base sm:text-lg text-[#0F172A] flex items-center justify-between gap-4 bg-white cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="leading-snug">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#0F172A] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-5 sm:p-6 pt-2 sm:pt-2 text-sm text-[#475569] leading-relaxed border-t border-[#E2E8F0] bg-[#F8FAFC] font-body">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
