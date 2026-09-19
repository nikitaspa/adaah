import React, { useState, useEffect } from 'react';
import { CategoryRepository, ProfileRepository, ServiceRepository } from '../../lib/repositories';
import { Category, Profile, Service } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { ProfileGrid } from '../profiles/ProfileGrid';
import { ServiceCard } from '../services/ServiceCard';
import { Tag } from 'lucide-react';

export interface CategoryDetailPageViewProps {
  slug: string;
  onNavigate: (href: string) => void;
  onRequestService: (profile: Profile, service?: Service) => void;
}

export function CategoryDetailPageView({
  slug,
  onNavigate,
  onRequestService,
}: CategoryDetailPageViewProps) {
  const [category, setCategory] = useState<Category | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    CategoryRepository.getCategoryBySlug(slug).then((cat) => {
      setCategory(cat || null);
      if (cat) {
        ProfileRepository.getProfilesByCategory(cat.id).then(setProfiles);
        ServiceRepository.getServices(cat.id).then(setServices);
      }
      setIsLoading(false);
    });
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#C6922E]" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] py-24 text-center max-w-md mx-auto px-4 text-[#171717]">
        <h2 className="text-xl font-bold text-[#171717] mb-2 font-serif-display">Category Not Found</h2>
        <p className="text-sm text-[#5F5A52] mb-6">The requested companion category does not exist.</p>
        <button
          type="button"
          onClick={() => onNavigate('/categories')}
          className="px-6 py-2.5 rounded-xl bg-[#C6922E] text-[#171717] font-bold text-xs hover:bg-[#A8751F] cursor-pointer"
        >
          Browse All Categories
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#171717] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs
          items={[
            { label: 'Categories', href: '/categories' },
            { label: category.name },
          ]}
          onNavigate={onNavigate}
        />

        {/* Category Header Card */}
        <div className="rounded-3xl border border-[#E6E1D8] bg-white p-6 sm:p-8 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8F6F1] border border-[#E6E1D8] text-xs font-bold text-[#C6922E] uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5 text-[#C6922E]" />
              <span>Category Directory</span>
            </div>
            <h1 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#5F5A52] leading-relaxed">
              {category.description}
            </p>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F8F6F1] border border-[#E6E1D8] shrink-0">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-[#5F5A52] block">Verified Profiles</span>
              <span className="text-xl font-bold font-serif-display text-[#171717]">
                {profiles.length} Listed
              </span>
            </div>
          </div>
        </div>

        {/* Profile Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-[#171717]">
                Verified {category.name} Profiles
              </h2>
              <p className="text-xs text-[#5F5A52] mt-0.5">
                Independent companions categorized under {category.name} in Hyderabad
              </p>
            </div>
          </div>

          <ProfileGrid
            profiles={profiles}
            isLoading={false}
            onViewProfile={(slug) => onNavigate(`/profiles/${slug}`)}
            onRequestService={onRequestService}
          />
        </div>

        {/* Services / Occasions in this category */}
        {services.length > 0 && (
          <div className="pt-10 border-t border-[#E6E1D8] space-y-6">
            <h3 className="font-serif-display text-lg font-bold text-[#171717]">
              Services & Occasions in this Category
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((srv) => (
                <ServiceCard
                  key={srv.id}
                  service={srv}
                  onSelect={(slug) => onNavigate(`/services/${slug}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
