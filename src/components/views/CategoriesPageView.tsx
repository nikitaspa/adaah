import React, { useState, useEffect } from 'react';
import { CategoryRepository } from '../../lib/repositories';
import { Category } from '../../types';
import { CategoryCard } from '../categories/CategoryCard';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { Tag } from 'lucide-react';

export interface CategoriesPageViewProps {
  onNavigate: (href: string) => void;
}

export function CategoriesPageView({ onNavigate }: CategoriesPageViewProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    CategoryRepository.getCategories().then(setCategories);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#171717] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Companion Categories' }]} onNavigate={onNavigate} />

        <div className="pb-4 border-b border-[#E6E1D8]">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6922E]">
            <Tag className="w-3.5 h-3.5 text-[#C6922E]" />
            <span>Curated Classifications</span>
          </div>
          <h1 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight mt-1">
            Companion Categories & Specialties
          </h1>
          <p className="text-xs sm:text-sm text-[#5F5A52] mt-1.5 max-w-2xl">
            From independent companions and high-fashion models to elite travel partners, explore companions by their primary focus and engagement style in Hyderabad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onSelect={(slug) => onNavigate(`/categories/${slug}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
