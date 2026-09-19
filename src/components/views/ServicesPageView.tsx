import React, { useState, useEffect } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { ServiceRepository, CategoryRepository } from '../../lib/repositories';
import { Service, Category } from '../../types';
import { ServiceCard } from '../services/ServiceCard';
import { Breadcrumbs } from '../common/Breadcrumbs';

export interface ServicesPageViewProps {
  onNavigate: (href: string) => void;
}

export function ServicesPageView({ onNavigate }: ServicesPageViewProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    ServiceRepository.getServices().then(setServices);
    CategoryRepository.getCategories().then(setCategories);
  }, []);

  const filtered = services.filter((s) => {
    const matchesCat = selectedCategory === 'all' || s.categoryId === selectedCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
      s.categoryName.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#171717] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Services & Occasions' }]} onNavigate={onNavigate} />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E6E1D8]">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6922E]">
              <Sparkles className="w-3.5 h-3.5 text-[#C6922E]" />
              <span>Engagement Occasions</span>
            </div>
            <h1 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight mt-1">
              Companionship Services & Occasions
            </h1>
            <p className="text-xs sm:text-sm text-[#5F5A52] mt-1.5 max-w-2xl">
              Browse refined social arrangements, fine dining dates, VIP galas, travel companionship, and discreet private engagements in Hyderabad.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5F5A52] pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter occasions…"
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E6E1D8] bg-white text-xs font-medium text-[#171717] placeholder:text-[#5F5A52] focus:outline-none focus:border-[#C6922E] shadow-2xs"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#C6922E] text-[#171717] shadow-xs'
                : 'bg-white text-[#171717] border border-[#E6E1D8] hover:border-[#C6922E] hover:text-[#C6922E] shadow-2xs'
            }`}
          >
            All Occasions ({services.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#C6922E] text-[#171717] shadow-xs'
                  : 'bg-white text-[#171717] border border-[#E6E1D8] hover:border-[#C6922E] hover:text-[#C6922E] shadow-2xs'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((srv) => (
            <ServiceCard
              key={srv.id}
              service={srv}
              onSelect={(slug) => onNavigate(`/services/${slug}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
