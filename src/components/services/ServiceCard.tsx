import React from 'react';
import { ArrowRight, Sparkles, Heart, Wine, Plane, Calendar } from 'lucide-react';
import { Service } from '../../types';

export interface ServiceCardProps {
  key?: React.Key;
  service: Service;
  onSelect?: (slug: string) => void;
  onRequestQuote?: (service: Service) => void;
  className?: string;
}

export function ServiceCard({
  service,
  onSelect,
  onRequestQuote,
  className = '',
}: ServiceCardProps) {
  const getServiceIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('dinner')) return <Wine className="w-5 h-5 text-[#C6922E]" />;
    if (n.includes('travel') || n.includes('vacation')) return <Plane className="w-5 h-5 text-[#C6922E]" />;
    if (n.includes('event') || n.includes('gala')) return <Calendar className="w-5 h-5 text-[#C6922E]" />;
    if (n.includes('vip') || n.includes('private')) return <Sparkles className="w-5 h-5 text-[#C6922E]" />;
    return <Heart className="w-5 h-5 text-rose-500" />;
  };

  return (
    <article
      id={`service-card-${service.slug}`}
      className={`group relative flex flex-col justify-between rounded-2xl border border-[#E6E1D8] bg-white p-5 shadow-2xs hover:border-[#C6922E] hover:shadow-md transition-all duration-300 ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8F6F1] border border-[#E6E1D8]">
            {getServiceIcon(service.name)}
          </div>
          {service.categoryName && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#916718] bg-[#C6922E]/10 px-2 py-0.5 rounded-md border border-[#C6922E]/20">
              {service.categoryName}
            </span>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-serif-display font-bold text-[#171717] tracking-tight leading-snug group-hover:text-[#C6922E] transition-colors mb-2">
          {service.name}
        </h3>

        <p className="text-xs text-[#5F5A52] leading-relaxed line-clamp-3 mb-4">
          {service.shortDescription || service.description}
        </p>

        {service.whatToExpect && service.whatToExpect.length > 0 && (
          <div className="space-y-1.5 py-2.5 border-t border-[#E6E1D8] mb-3 text-xs text-[#5F5A52]">
            <div className="text-[11px] font-semibold text-[#171717]">Engagement Highlights:</div>
            {service.whatToExpect.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-[#5F5A52] text-xs">
                <span className="text-[#C6922E] text-xs">•</span>
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-[#E6E1D8] flex items-center justify-between">
        <button
          type="button"
          onClick={() => onSelect?.(service.slug)}
          className="text-xs font-semibold text-[#171717] hover:text-[#C6922E] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Explore Service</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#C6922E]" />
        </button>

        {service.priceEstimate && (
          <span className="text-xs font-bold text-[#C6922E] font-serif-display">
            {service.priceEstimate}
          </span>
        )}
      </div>
    </article>
  );
}
