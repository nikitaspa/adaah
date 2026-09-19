import React from 'react';
import { ShieldCheck, Lock, MapPin } from 'lucide-react';
import { SearchBar } from '../search/SearchBar';
import { SearchSuggestionItem } from '../../types';

export interface HeroSectionProps {
  onSearchSubmit: (query: string) => void;
  onSelectSuggestion: (item: SearchSuggestionItem) => void;
  onExploreProfiles: () => void;
  onRequestService: () => void;
  onSelectQuickPill?: (query: string) => void;
}

export function HeroSection({
  onSearchSubmit,
  onSelectSuggestion,
  onExploreProfiles,
  onRequestService,
  onSelectQuickPill,
}: HeroSectionProps) {
  const popularLocations = [
    { label: 'Banjara Hills', query: 'Banjara Hills' },
    { label: 'Jubilee Hills', query: 'Jubilee Hills' },
    { label: 'Gachibowli', query: 'Gachibowli' },
    { label: 'Hitech City', query: 'Hitech City' },
    { label: 'Madhapur', query: 'Madhapur' },
    { label: 'Kondapur', query: 'Kondapur' },
  ];

  return (
    <section
      id="homepage-hero-section"
      className="relative overflow-hidden pt-12 pb-16 md:pt-18 md:pb-24 border-b border-[#E6E1D8] bg-[#F8F6F1]"
    >
      {/* Subtle warm ambient depth */}
      <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-[#C6922E]/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#E6E1D8]/40 blur-[80px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E6E1D8] shadow-2xs text-xs font-semibold text-[#171717]">
            <span className="w-2 h-2 rounded-full bg-[#C6922E]" />
            <span className="text-[#916718] font-bold">18+ Only</span>
            <span className="text-[#D0C9BD]">•</span>
            <span className="text-[#5F5A52]">Hyderabad Directory</span>
            <span className="text-[#D0C9BD]">•</span>
            <span className="text-[#5F5A52]">Verified Profiles</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#171717] leading-[1.15]">
            Discover Premium Companionship in Hyderabad
          </h1>

          {/* Supporting Subtitle */}
          <p className="text-base sm:text-lg text-[#5F5A52] leading-relaxed max-w-2xl font-normal">
            Explore verified profiles, premier locations and refined services across Hyderabad.
          </p>

          {/* Search bar integration */}
          <div className="w-full max-w-2xl pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="flex-1">
                <SearchBar
                  size="large"
                  placeholder="Search profiles, locations, categories in Hyderabad..."
                  onSubmitSearch={onSearchSubmit}
                  onSelectSuggestion={onSelectSuggestion}
                />
              </div>
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-3 rounded-2xl bg-white border border-[#E6E1D8] text-xs font-semibold text-[#C6922E] self-center shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-[#C6922E]" />
                <span className="text-[#171717]">Hyderabad</span>
              </div>
            </div>

            {/* Popular locations pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3.5 text-xs text-[#5F5A52]">
              <span className="font-medium text-[#5F5A52]">Popular locations:</span>
              {popularLocations.map((loc) => (
                <button
                  key={loc.label}
                  type="button"
                  onClick={() => {
                    if (onSelectQuickPill) onSelectQuickPill(loc.query);
                    else onSearchSubmit(loc.query);
                  }}
                  className="px-3 py-1 rounded-full bg-white border border-[#E6E1D8] text-[#171717] hover:text-[#C6922E] hover:border-[#C6922E] transition-colors text-xs font-medium cursor-pointer active:scale-95 shadow-2xs"
                >
                  {loc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#5F5A52]">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E6E1D8] shadow-2xs">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#C6922E]/15 text-[#916718] text-[10px] font-bold border border-[#C6922E]/30">
                18+
              </span>
              <span className="font-semibold text-[#171717]">18+ Only</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E6E1D8] shadow-2xs">
              <ShieldCheck className="h-4 w-4 text-[#C6922E]" />
              <span className="font-semibold text-[#171717]">Verified Profiles</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E6E1D8] shadow-2xs">
              <Lock className="h-4 w-4 text-[#C6922E]" />
              <span className="font-semibold text-[#171717]">Discreet Inquiries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
