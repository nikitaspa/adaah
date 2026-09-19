import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Profile } from '../../types';
import { ProfileCard } from '../profiles/ProfileCard';

export interface FeaturedProfilesProps {
  profiles: Profile[];
  onViewProfile: (slug: string) => void;
  onRequestService: (profile: Profile) => void;
  onExploreAll: () => void;
}

export function FeaturedProfiles({
  profiles,
  onViewProfile,
  onRequestService,
  onExploreAll,
}: FeaturedProfilesProps) {
  return (
    <section id="featured-profiles-section" className="py-16 md:py-24 bg-white border-b border-[#E6E1D8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6922E]">
              <Sparkles className="w-3.5 h-3.5 text-[#C6922E]" />
              <span>Curated Selection</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight">
              Featured 18+ Independent Companions
            </h2>
            <p className="text-xs sm:text-sm text-[#5F5A52] max-w-xl">
              Handpicked, verified independent companions available for private bookings, dinner dates, and travel accompaniment across Hyderabad.
            </p>
          </div>

          <button
            type="button"
            onClick={onExploreAll}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F8F6F1] text-[#171717] border border-[#E6E1D8] hover:border-[#C6922E] hover:text-[#C6922E] transition-colors text-xs font-semibold cursor-pointer shadow-2xs"
          >
            <span>Explore All Profiles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6–8 Featured Profile Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {profiles.slice(0, 8).map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onViewProfile={onViewProfile}
              onRequestService={onRequestService}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
