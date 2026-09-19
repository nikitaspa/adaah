import React from 'react';
import { Tag, ArrowRight } from 'lucide-react';
import { Category } from '../../types';
import { CategoryCard } from '../categories/CategoryCard';

export interface PopularCategoriesProps {
  categories: Category[];
  onSelectCategory: (slug: string) => void;
  onExploreAllCategories: () => void;
}

export function PopularCategories({
  categories,
  onSelectCategory,
  onExploreAllCategories,
}: PopularCategoriesProps) {
  return (
    <section id="popular-categories-section" className="py-16 md:py-24 bg-[#F3F0E9] border-b border-[#E6E1D8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6922E]">
              <Tag className="w-3.5 h-3.5 text-[#C6922E]" />
              <span>Curated Disciplines</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight">
              Companion Categories
            </h2>
            <p className="text-xs sm:text-sm text-[#5F5A52] max-w-xl">
              From poised high-fashion models and independent companions to dedicated travel partners and gala attendees.
            </p>
          </div>

          <button
            type="button"
            onClick={onExploreAllCategories}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#171717] border border-[#E6E1D8] hover:border-[#C6922E] hover:text-[#C6922E] transition-colors text-xs font-semibold cursor-pointer shadow-2xs"
          >
            <span>All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 6).map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onSelect={onSelectCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
