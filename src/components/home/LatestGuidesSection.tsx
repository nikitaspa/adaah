import React from 'react';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { mockGuides } from '../../data/guides';

export interface LatestGuidesSectionProps {
  onSelectGuide: (slug: string) => void;
  onExploreAllGuides: () => void;
}

export function LatestGuidesSection({
  onSelectGuide,
  onExploreAllGuides,
}: LatestGuidesSectionProps) {
  return (
    <section id="latest-guides-section" className="py-16 md:py-24 bg-[#F3F0E9] border-b border-[#E6E1D8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6922E]">
              <BookOpen className="w-3.5 h-3.5 text-[#C6922E]" />
              <span>Editorial Journal</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight">
              Guides, Protocols & Etiquette
            </h2>
            <p className="text-xs sm:text-sm text-[#5F5A52] max-w-xl">
              Essential advice for navigating discrete adult arrangements, gala accompaniment, dining etiquette, and private travel in Hyderabad.
            </p>
          </div>

          <button
            type="button"
            onClick={onExploreAllGuides}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#171717] border border-[#E6E1D8] hover:border-[#C6922E] hover:text-[#C6922E] transition-colors text-xs font-semibold cursor-pointer shadow-2xs"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockGuides.slice(0, 3).map((guide) => (
            <article
              key={guide.id}
              onClick={() => onSelectGuide(guide.slug)}
              className="group cursor-pointer rounded-2xl bg-white border border-[#E6E1D8] overflow-hidden shadow-2xs hover:border-[#C6922E] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F8F6F1]">
                  <img
                    src={guide.coverImage}
                    alt={guide.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#171717] px-2.5 py-1 rounded-full border border-[#E6E1D8] shadow-xs">
                    {guide.category}
                  </span>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-[#5F5A52]">
                    <Clock className="w-3.5 h-3.5 text-[#C6922E]" />
                    <span>{guide.readTime}</span>
                    <span>•</span>
                    <span>{guide.publishedAt}</span>
                  </div>

                  <h3 className="font-serif-display text-base font-bold text-[#171717] group-hover:text-[#C6922E] transition-colors leading-snug">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-[#5F5A52] leading-relaxed line-clamp-2">
                    {guide.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-0 flex items-center justify-between text-xs font-semibold text-[#5F5A52] group-hover:text-[#C6922E] transition-colors border-t border-[#E6E1D8] pt-3 mt-1">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
