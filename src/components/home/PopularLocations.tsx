import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { Location } from '../../types';
import { LocationCard } from '../locations/LocationCard';

export interface PopularLocationsProps {
  locations: Location[];
  onSelectLocation: (slug: string) => void;
  onExploreAllLocations: () => void;
}

export function PopularLocations({
  locations,
  onSelectLocation,
  onExploreAllLocations,
}: PopularLocationsProps) {
  // 8-9 top Hyderabad locations requested:
  // Banjara Hills, Jubilee Hills, Gachibowli, Hitech City, Madhapur, Kondapur, Begumpet, Secunderabad
  const displayLocations = locations.slice(0, 8);

  return (
    <section id="popular-locations-section" className="py-16 md:py-24 bg-white border-b border-[#E6E1D8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6922E]">
              <MapPin className="w-3.5 h-3.5 text-[#C6922E]" />
              <span>Hyderabad Neighborhoods</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight">
              Popular Hyderabad Locations
            </h2>
            <p className="text-xs sm:text-sm text-[#5F5A52] max-w-xl">
              Connect with verified independent adult companions situated in Hyderabad&apos;s premier commercial, IT, and luxury enclaves.
            </p>
          </div>

          <button
            type="button"
            onClick={onExploreAllLocations}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F8F6F1] text-[#171717] border border-[#E6E1D8] hover:border-[#C6922E] hover:text-[#C6922E] transition-all text-xs font-bold cursor-pointer shadow-2xs"
          >
            <span>View All Hyderabad Locations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Hyderabad locations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayLocations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              onSelect={onSelectLocation}
            />
          ))}
        </div>

        {/* Bottom CTA for full directory */}
        <div className="mt-10 p-6 rounded-2xl bg-[#F8F6F1] border border-[#E6E1D8] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-[#171717] font-bold text-sm sm:text-base">
              Looking for a specific neighborhood in Greater Hyderabad?
            </h3>
            <p className="text-xs text-[#5F5A52] mt-0.5">
              Explore all neighborhood directories from Banjara Hills and Jubilee Hills to Financial District, Begumpet, and Secunderabad.
            </p>
          </div>
          <button
            type="button"
            onClick={onExploreAllLocations}
            className="px-5 py-2.5 rounded-xl bg-[#C6922E] hover:bg-[#A8751F] text-[#171717] font-bold text-xs transition-colors whitespace-nowrap cursor-pointer shadow-2xs"
          >
            Explore All Locations
          </button>
        </div>
      </div>
    </section>
  );
}
