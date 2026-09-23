import React from 'react';
import { MapPin, ShieldCheck, Clock, Building } from 'lucide-react';
import { Location } from '../../types';

export interface LocationOverviewProps {
  location: Location;
  className?: string;
}

export function LocationOverview({ location, className = '' }: LocationOverviewProps) {
  return (
    <div className={`rounded-3xl border border-[#E6E1D8] bg-white p-6 sm:p-8 shadow-xs space-y-4 ${className}`}>
      <div className="flex items-center gap-2 text-[#C6922E] font-bold text-xs uppercase tracking-wider">
        <Building className="w-4 h-4 text-[#C6922E]" />
        <span>About {location.name}, Hyderabad</span>
      </div>

      <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-[#171717]">
        Local Directory Context for {location.name}
      </h2>

      <p className="text-xs sm:text-sm text-[#5F5A52] leading-relaxed">
        {location.description ||
          `${location.name} is a premier enclave in Hyderabad, Telangana, known for luxury star hotels, boutique dining, and high-profile residential avenues.`}
      </p>

      {location.popularNeighborhoods && location.popularNeighborhoods.length > 0 && (
        <div className="pt-3 border-t border-[#E6E1D8]">
          <span className="text-[11px] font-bold text-[#916718] uppercase tracking-wider block mb-2">
            Notable Sectors & Hubs in {location.name}:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {location.popularNeighborhoods.map((nh, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-[#F8F6F1] border border-[#E6E1D8] text-xs font-semibold text-[#171717]"
              >
                {nh}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
        <div className="p-3.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] flex items-center gap-2 text-xs">
          <ShieldCheck className="w-4 h-4 text-[#C6922E] shrink-0" />
          <span className="text-[#171717] font-semibold">100% 18+ Age Verified</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] flex items-center gap-2 text-xs">
          <Clock className="w-4 h-4 text-[#C6922E] shrink-0" />
          <span className="text-[#171717] font-semibold">Incall & Outcall Options</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] flex items-center gap-2 text-xs">
          <MapPin className="w-4 h-4 text-[#C6922E] shrink-0" />
          <span className="text-[#171717] font-semibold">{location.city || 'Hyderabad'}, India</span>
        </div>
      </div>
    </div>
  );
}
