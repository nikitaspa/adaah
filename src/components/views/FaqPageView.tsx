import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { FaqRepository } from '../../lib/repositories';
import { FAQ } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';

export interface FaqPageViewProps {
  onNavigate: (href: string) => void;
  onContactSupport: () => void;
}

export function FaqPageView({ onNavigate, onContactSupport }: FaqPageViewProps) {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    FaqRepository.getFaqs().then((data) => {
      setFaqs(data);
      if (data.length > 0) {
        setOpenIds({ [data[0].id]: true });
      }
    });
    FaqRepository.getCategories().then(setCategories);
  }, []);

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = faqs.filter((f) => {
    const matchesCat = activeCategory === 'All' || f.category === activeCategory;
    const matchesSearch =
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#171717] py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} onNavigate={onNavigate} />

        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6922E]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support & Guidance</span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#5F5A52]">
            Answers to common questions regarding our 18+ age verification, discreet booking inquiries, rates, and platform safety policies in Hyderabad.
          </p>

          <div className="relative w-full pt-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5F5A52] pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions or keywords…"
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E6E1D8] bg-white text-xs font-medium text-[#171717] placeholder:text-[#5F5A52] focus:outline-none focus:border-[#C6922E] shadow-2xs"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#C6922E] text-[#171717] shadow-xs'
                  : 'bg-white text-[#171717] border border-[#E6E1D8] hover:border-[#C6922E] hover:text-[#C6922E] shadow-2xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filtered.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white border border-[#E6E1D8] overflow-hidden transition-colors shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
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
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5F5A52] leading-relaxed border-t border-[#E6E1D8]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help Banner */}
        <div className="p-6 rounded-2xl bg-white border border-[#E6E1D8] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif-display text-base font-bold text-[#171717]">
              Have a bespoke inquiry or specific question?
            </h3>
            <p className="text-xs text-[#5F5A52]">
              Our confidential concierge desk in Hyderabad responds with total discretion.
            </p>
          </div>

          <button
            type="button"
            onClick={onContactSupport}
            className="px-5 py-2.5 rounded-xl bg-[#C6922E] hover:bg-[#A8751F] text-[#171717] font-bold text-xs flex items-center gap-2 transition-all active:scale-95 cursor-pointer shrink-0 shadow-xs"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Contact Concierge</span>
          </button>
        </div>
      </div>
    </div>
  );
}
