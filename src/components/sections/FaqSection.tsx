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
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full py-8 font-body text-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        
        {/* Left Column (Sticky Title & CTA) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
          <div className="eyebrow text-white/55 font-bold text-xs uppercase tracking-widest font-mono">
            {eyebrow}
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[40px] text-white tracking-tight leading-[1.08]">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-body leading-relaxed">
            {description}
          </p>
          <div className="pt-2">
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 bg-ink-800 hover:bg-[#1E293B] text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-[2px] shadow-sm transition-all"
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
                className="border border-white/[0.08] rounded-[2px] overflow-hidden bg-white/[0.03] hover:border-white/25 transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left font-display font-extrabold text-base sm:text-lg text-white flex items-center justify-between gap-4 bg-white/[0.03] cursor-pointer hover:bg-white/[0.05] transition-colors"
                >
                  <span className="leading-snug">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-white shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/50 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-5 sm:p-6 pt-2 sm:pt-2 text-sm text-white/60 leading-relaxed border-t border-white/[0.08] bg-white/[0.03] font-body">
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
