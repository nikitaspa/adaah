import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  title?: string;
  items: FAQItem[];
  className?: string;
}

export function FAQSection({
  title = 'Frequently Asked Questions',
  items,
  className = '',
}: FAQSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  // Generate FAQPage JSON-LD schema for SEO
  const faqSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Visible FAQ Title */}
      <div className="flex items-center gap-2 text-[#916718] font-bold text-xs uppercase tracking-wider">
        <HelpCircle className="w-4 h-4 text-[#C6922E]" />
        <span>Directory Knowledge Base</span>
      </div>

      <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-[#171717]">
        {title}
      </h2>

      <div className="space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-[#E6E1D8] bg-white overflow-hidden shadow-2xs transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-sm sm:text-base font-semibold text-[#171717] hover:text-[#C6922E] transition-colors cursor-pointer"
              >
                <span className="pr-2">{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#C6922E] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#5F5A52] leading-relaxed border-t border-[#E6E1D8] pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* JSON-LD for FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
    </div>
  );
}
