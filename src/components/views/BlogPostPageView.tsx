import React, { useState, useEffect } from 'react';
import { Clock, Calendar, ArrowLeft, ArrowRight, Share2, BookOpen, ShieldCheck } from 'lucide-react';
import { mockGuides } from '../../data/guides';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { useToast } from '../common/Toast';

export interface BlogPostPageViewProps {
  slug: string;
  onNavigate: (href: string) => void;
}

export function BlogPostPageView({ slug, onNavigate }: BlogPostPageViewProps) {
  const [guide, setGuide] = useState<(typeof mockGuides)[0] | null>(null);
  const [relatedGuides, setRelatedGuides] = useState<typeof mockGuides>([]);
  const { toast } = useToast();

  useEffect(() => {
    const found = mockGuides.find((g) => g.slug === slug);
    setGuide(found || null);
    if (found) {
      setRelatedGuides(mockGuides.filter((g) => g.id !== found.id).slice(0, 2));
    }
  }, [slug]);

  if (!guide) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] py-24 text-center max-w-md mx-auto px-4 text-[#171717]">
        <h2 className="text-xl font-bold text-[#171717] mb-2 font-serif-display">Article Not Found</h2>
        <p className="text-sm text-[#5F5A52] mb-6">The requested guide could not be located.</p>
        <button
          type="button"
          onClick={() => onNavigate('/guides')}
          className="px-6 py-2.5 rounded-xl bg-[#C6922E] hover:bg-[#A8751F] text-white font-bold text-xs shadow-sm cursor-pointer"
        >
          Return to Guides
        </button>
      </div>
    );
  }

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          type: 'success',
          title: 'Link Copied',
          message: 'Guide URL copied to your clipboard.',
        });
      }
    } catch {
      toast({
        type: 'info',
        title: 'Share Article',
        message: guide.title,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#171717] py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs
          items={[
            { label: 'Guides', href: '/guides' },
            { label: guide.title },
          ]}
          onNavigate={onNavigate}
        />

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white border border-[#E6E1D8] text-xs font-bold text-[#916718] uppercase tracking-wider">
              {guide.category}
            </span>
            <div className="flex items-center gap-2 text-xs text-[#5F5A52]">
              <Clock className="w-3.5 h-3.5 text-[#C6922E]" />
              <span>{guide.readTime}</span>
              <span>•</span>
              <span>{guide.publishedAt}</span>
            </div>
          </div>

          <h1 className="font-serif-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#171717] tracking-tight leading-tight">
            {guide.title}
          </h1>

          <p className="text-sm sm:text-base text-[#5F5A52] leading-relaxed font-light">
            {guide.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-[#E6E1D8]">
            <div className="text-xs text-[#5F5A52]">
              Authored by <strong className="text-[#171717]">{typeof guide.author === 'object' ? guide.author.name : guide.author}</strong>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#F3F0E9] text-[#5F5A52] hover:text-[#171717] border border-[#E6E1D8] text-xs font-semibold transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="rounded-3xl overflow-hidden border border-[#E6E1D8] aspect-[16/9] w-full bg-white shadow-2xs">
          <img
            src={guide.coverImage}
            alt={guide.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Article Body */}
        <article className="rounded-3xl border border-[#E6E1D8] bg-white p-6 sm:p-10 shadow-2xs space-y-6 text-xs sm:text-sm text-[#5F5A52] leading-relaxed">
          <div
            className="space-y-4"
            dangerouslySetInnerHTML={{
              __html: guide.content
                .split('\n\n')
                .map((para) => {
                  if (para.startsWith('### ')) {
                    return `<h3 class="font-serif-display text-lg sm:text-xl font-bold text-[#171717] pt-4 pb-1 border-b border-[#E6E1D8]">${para.replace('### ', '')}</h3>`;
                  }
                  if (para.startsWith('## ')) {
                    return `<h2 class="font-serif-display text-xl sm:text-2xl font-bold text-[#C6922E] pt-6 pb-2">${para.replace('## ', '')}</h2>`;
                  }
                  if (para.startsWith('- ')) {
                    const items = para.split('\n').map((li) => `<li class="ml-4 list-disc">${li.replace('- ', '')}</li>`).join('');
                    return `<ul class="space-y-1.5 py-1 text-[#5F5A52]">${items}</ul>`;
                  }
                  return `<p class="leading-relaxed">${para}</p>`;
                })
                .join(''),
            }}
          />

          <div className="mt-8 p-4 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] flex items-start gap-3 text-xs text-[#5F5A52]">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#171717] block mb-1">Safety & Protocol Notice:</strong>
              All guides published on Adaah adhere to strict 18+ consenting adult frameworks. Clear communication of expectations and boundaries is required for all parties.
            </div>
          </div>
        </article>

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <div className="pt-8 border-t border-[#E6E1D8] space-y-6">
            <h3 className="font-serif-display text-xl font-bold text-[#171717]">
              Related Articles & Protocols
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedGuides.map((rg) => (
                <div
                  key={rg.id}
                  onClick={() => onNavigate(`/guides/${rg.slug}`)}
                  className="p-5 rounded-2xl bg-white border border-[#E6E1D8] hover:border-[#C6922E] transition-all flex flex-col justify-between cursor-pointer space-y-3 shadow-2xs hover:shadow-md"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C6922E]">
                      {rg.category}
                    </span>
                    <h4 className="font-serif-display text-base font-bold text-[#171717] leading-snug">
                      {rg.title}
                    </h4>
                    <p className="text-xs text-[#5F5A52] line-clamp-2">
                      {rg.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#C6922E]">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
