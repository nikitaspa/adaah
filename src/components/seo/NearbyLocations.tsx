import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import { Location } from '../../types';
import { mockLocations } from '../../data/locations';
import { KEYWORD_STRATEGY } from '../../config/keywords';

export interface NearbyLocationsProps {
  currentLocation: Location;
  onNavigate: (href: string) => void;
  className?: string;
}

export function NearbyLocations({ currentLocation, onNavigate, className = '' }: NearbyLocationsProps) {
  // Check mapped location relationships from keyword strategy
  const mappedCluster = (KEYWORD_STRATEGY.locationClusters as any)[currentLocation.slug];
  let nearbySlugs: string[] = mappedCluster ? mappedCluster.relatedAreas : [];

  let nearbyLocs: Location[] = [];
  if (nearbySlugs.length > 0) {
    nearbyLocs = mockLocations.filter((l) => nearbySlugs.includes(l.slug));
  }
  
  if (nearbyLocs.length === 0) {
    nearbyLocs = mockLocations.filter((l) => l.id !== currentLocation.id).slice(0, 4);
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <div className={`rounded-3xl border border-[#E6E1D8] bg-white p-6 sm:p-8 shadow-xs space-y-4 ${className}`}>
      <div className="flex items-center gap-2 text-[#916718] font-bold text-xs uppercase tracking-wider">
        <MapPin className="w-4 h-4 text-[#C6922E]" />
        <span>Nearby Hyderabad Areas</span>
      </div>

      <h2 className="font-serif-display text-xl font-bold text-[#171717]">
        Explore Directories Near {currentLocation.name}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {nearbyLocs.map((loc) => (
          <a
            key={loc.id}
            href={`/locations/${loc.slug}`}
            onClick={(e) => handleLinkClick(e, `/locations/${loc.slug}`)}
            className="p-3.5 rounded-2xl bg-[#F8F6F1] border border-[#E6E1D8] hover:border-[#C6922E] transition-all text-xs font-semibold text-[#171717] flex items-center justify-between group cursor-pointer shadow-2xs"
          >
            <span className="truncate">{loc.name}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#8C827A] group-hover:text-[#C6922E] shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}
