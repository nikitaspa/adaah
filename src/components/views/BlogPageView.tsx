import React from 'react';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import { mockGuides } from '../../data/guides';
import { Breadcrumbs } from '../common/Breadcrumbs';

export interface BlogPageViewProps {
  onNavigate: (href: string) => void;
}

export function BlogPageView({ onNavigate }: BlogPageViewProps) {
  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#171717] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Editorial Guides & Etiquette' }]} onNavigate={onNavigate} />

        <div className="pb-4 border-b border-[#E6E1D8] space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6922E]">
            <BookOpen className="w-3.5 h-3.5 text-[#C6922E]" />
            <span>Editorial Journal</span>
          </div>
          <h1 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight">
            Etiquette Guides & Discreet Protocols
          </h1>
          <p className="text-xs sm:text-sm text-[#5F5A52] max-w-2xl">
            Practical advice, booking etiquette, and discretion protocols designed to ensure dignified, mutually fulfilling adult companion arrangements in Hyderabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGuides.map((post) => (
            <article
              key={post.id}
              onClick={() => onNavigate(`/guides/${post.slug}`)}
              className="group relative flex flex-col justify-between rounded-2xl border border-[#E6E1D8] bg-white overflow-hidden shadow-2xs hover:border-[#C6922E] transition-all cursor-pointer"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F3F0E9]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#171717] px-2.5 py-1 rounded-full border border-[#E6E1D8] backdrop-blur-md shadow-2xs">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-[#5F5A52]">
                    <Clock className="h-3 w-3 text-[#C6922E]" />
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.publishedAt}</span>
                  </div>

                  <h2 className="font-serif-display text-base font-bold text-[#171717] group-hover:text-[#C6922E] transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-xs text-[#5F5A52] leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E6E1D8] flex items-center justify-between text-xs font-semibold text-[#171717] group-hover:text-[#C6922E] transition-colors">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
