import React from 'react';
import { ArrowRight, Users, Sparkles, Heart, Crown, Plane, Utensils, Award } from 'lucide-react';
import { Category } from '../../types';

export interface CategoryCardProps {
  key?: React.Key;
  category: Category;
  onSelect?: (slug: string) => void;
  className?: string;
}

export function CategoryCard({ category, onSelect, className = '' }: CategoryCardProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Crown':
        return <Crown className="h-4 w-4 text-[#C6922E]" />;
      case 'Sparkles':
        return <Sparkles className="h-4 w-4 text-[#C6922E]" />;
      case 'Heart':
        return <Heart className="h-4 w-4 text-rose-500" />;
      case 'Plane':
        return <Plane className="h-4 w-4 text-[#C6922E]" />;
      case 'Utensils':
        return <Utensils className="h-4 w-4 text-[#C6922E]" />;
      case 'Award':
        return <Award className="h-4 w-4 text-[#C6922E]" />;
      default:
        return <Sparkles className="h-4 w-4 text-[#C6922E]" />;
    }
  };

  return (
    <div
      id={`category-card-${category.slug}`}
      onClick={() => onSelect?.(category.slug)}
      className={`group relative overflow-hidden rounded-2xl border border-[#E6E1D8] bg-white shadow-2xs hover:border-[#C6922E] hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Cover Image banner if available */}
        {category.coverImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F3F0E9]">
            <img
              src={category.coverImage}
              alt={category.name}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#171717] bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#E6E1D8] shadow-xs">
                <Users className="h-3 w-3 text-[#C6922E]" />
                <span>{category.profileCount} Verified</span>
              </span>
            </div>
          </div>
        )}

        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F8F6F1] border border-[#E6E1D8]">
              {getIcon(category.iconName)}
            </div>
            <h3 className="text-base md:text-lg font-serif-display font-bold text-[#171717] group-hover:text-[#C6922E] transition-colors">
              {category.name}
            </h3>
          </div>

          <p className="text-xs text-[#5F5A52] leading-relaxed line-clamp-2">
            {category.shortDescription || category.description}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-0 flex items-center justify-between text-xs font-semibold text-[#5F5A52] group-hover:text-[#C6922E] transition-colors border-t border-[#E6E1D8] pt-3 mt-1">
        <span>Explore Category</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}
