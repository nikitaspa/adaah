import React from 'react';
import { Home, Search, MapPin, Users, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../common/Breadcrumbs';

export interface NotFoundPageViewProps {
  onNavigate: (href: string) => void;
  onOpenSearch?: () => void;
}

export function NotFoundPageView({ onNavigate, onOpenSearch }: NotFoundPageViewProps) {
  return (
    <div className="min-h-[70vh] bg-[#F8F6F1] text-[#171717] py-12 flex flex-col justify-center">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        <Breadcrumbs items={[{ label: '404 Page Not Found' }]} onNavigate={onNavigate} />

        <div className="space-y-4 max-w-xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-[#C6922E]/10 border border-[#C6922E]/30 text-[#916718] text-xs font-bold uppercase tracking-wider">
            404 — Page Not Found
          </span>

          <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171717] tracking-tight">
            The Page You Are Looking For Does Not Exist
          </h1>

          <p className="text-sm sm:text-base text-[#5F5A52] leading-relaxed">
            The page, listing, or location URL you requested could not be located. It may have been renamed, moved, or unlisted.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="px-5 py-3 rounded-xl bg-[#C6922E] hover:bg-[#A8751F] text-[#171717] font-bold text-xs shadow-2xs flex items-center gap-2 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </button>

            {onOpenSearch && (
              <button
                type="button"
                onClick={onOpenSearch}
                className="px-5 py-3 rounded-xl bg-white border border-[#E6E1D8] hover:border-[#C6922E] text-[#171717] font-bold text-xs shadow-2xs flex items-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#C6922E]" />
                <span>Search Directory</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Directory Links */}
        <div className="pt-8 border-t border-[#E6E1D8] text-left grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#E6E1D8] space-y-2">
            <div className="flex items-center gap-2 text-[#916718] font-bold text-xs uppercase tracking-wider">
              <Users className="w-4 h-4 text-[#C6922E]" />
              <span>Companion Profiles</span>
            </div>
            <p className="text-xs text-[#5F5A52]">
              Explore 18+ verified independent companion profiles in Hyderabad.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/profiles')}
              className="text-xs font-bold text-[#C6922E] hover:underline flex items-center gap-1 pt-1 cursor-pointer"
            >
              <span>Browse Profiles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E6E1D8] space-y-2">
            <div className="flex items-center gap-2 text-[#916718] font-bold text-xs uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-[#C6922E]" />
              <span>Hyderabad Locations</span>
            </div>
            <p className="text-xs text-[#5F5A52]">
              Explore listings across Banjara Hills, Jubilee Hills, Gachibowli & 30 areas.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/locations')}
              className="text-xs font-bold text-[#C6922E] hover:underline flex items-center gap-1 pt-1 cursor-pointer"
            >
              <span>View All Locations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E6E1D8] space-y-2">
            <div className="flex items-center gap-2 text-[#916718] font-bold text-xs uppercase tracking-wider">
              <Search className="w-4 h-4 text-[#C6922E]" />
              <span>Categories & Services</span>
            </div>
            <p className="text-xs text-[#5F5A52]">
              Explore companion classifications, dinner dates, and VIP occasions.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/categories')}
              className="text-xs font-bold text-[#C6922E] hover:underline flex items-center gap-1 pt-1 cursor-pointer"
            >
              <span>Explore Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
