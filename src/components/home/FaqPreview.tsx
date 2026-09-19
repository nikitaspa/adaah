import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { mockFaqs } from '../../data/faq';

export interface FaqPreviewProps {
  onViewAllFaqs: () => void;
}

export function FaqPreview({ onViewAllFaqs }: FaqPreviewProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const previewFaqs = mockFaqs.slice(0, 5);

  return (
    <section id="faq-preview-section" className="py-16 md:py-24 bg-white border-b border-[#E6E1D8]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6922E]">
            <HelpCircle className="w-3.5 h-3.5 text-[#C6922E]" />
            <span>Common Inquiries</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#5F5A52] max-w-xl mx-auto">
            Clear guidelines on verification standards, discreet inquiry procedures, and engagement etiquette in Hyderabad.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {previewFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#F8F6F1] border border-[#E6E1D8] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F3F0E9] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif-display text-sm sm:text-base font-bold text-[#171717]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C6922E] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5F5A52] leading-relaxed border-t border-[#E6E1D8] animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View All FAQs Button */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={onViewAllFaqs}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F8F6F1] hover:bg-[#F3F0E9] text-[#171717] border border-[#E6E1D8] hover:border-[#C6922E] hover:text-[#C6922E] font-semibold text-xs transition-all shadow-2xs active:scale-95 cursor-pointer"
          >
            <span>View All FAQs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
