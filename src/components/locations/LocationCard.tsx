import React from 'react';
import { MapPin, ArrowRight, Users } from 'lucide-react';
import { Location } from '../../types';

export interface LocationCardProps {
  key?: React.Key;
  location: Location;
  onSelect?: (slug: string) => void;
  className?: string;
}

export function LocationCard({ location, onSelect, className = '' }: LocationCardProps) {
  const imageUrl = location.image || location.coverImage || location.heroImage;
  const descriptionText =
    location.description || `Explore verified independent companions and services in ${location.name}, Hyderabad.`;

  return (
    <div
      id={`location-card-${location.slug}`}
      onClick={() => onSelect?.(location.slug)}
      className={`group relative overflow-hidden rounded-2xl border border-[#E6E1D8] bg-white shadow-2xs hover:border-[#C6922E] hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between ${className}`}
    >
      {/* Location Image */}
      <div className="relative h-44 w-full overflow-hidden bg-[#F3F0E9]">
        <img
          src={imageUrl}
          alt={location.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Profile count pill */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#E6E1D8] text-xs font-semibold text-[#171717] shadow-xs">
          <Users className="h-3 w-3 text-[#C6922E]" />
          <span>
            {location.profileCount} {location.profileCount === 1 ? 'Profile' : 'Profiles'}
          </span>
        </div>

        {/* Location Name & Area */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-200 flex items-center gap-1">
            <MapPin className="h-3 w-3 inline text-amber-300" />
            {location.city || 'Hyderabad'}
          </span>
          <h3 className="text-xl font-serif-display font-bold tracking-tight text-white leading-tight">
            {location.name}
          </h3>
        </div>
      </div>

      {/* Description & Action */}
      <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
        <p className="text-xs text-[#5F5A52] line-clamp-2 leading-relaxed">
          {descriptionText}
        </p>

        {location.popularNeighborhoods && location.popularNeighborhoods.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {location.popularNeighborhoods.slice(0, 3).map((nh, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-md bg-[#F8F6F1] border border-[#E6E1D8] text-[#5F5A52] font-medium"
              >
                {nh}
              </span>
            ))}
          </div>
        )}

        {/* Explore Link */}
        <div className="pt-3 border-t border-[#E6E1D8] flex items-center justify-between">
          <span className="text-xs font-medium text-[#8C827A]">
            {location.city || 'Hyderabad'}, Telangana
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#C6922E] group-hover:text-[#A8751F] transition-colors">
            <span>Explore Profiles</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </div>
  );
}
