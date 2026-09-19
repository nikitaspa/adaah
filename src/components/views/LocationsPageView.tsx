import React, { useState, useEffect } from 'react';
import { LocationRepository } from '../../lib/repositories';
import { Location } from '../../types';
import { LocationCard } from '../locations/LocationCard';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { Search, MapPin } from 'lucide-react';

export interface LocationsPageViewProps {
  onNavigate: (href: string) => void;
}

export function LocationsPageView({ onNavigate }: LocationsPageViewProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'primary'>('all');

  useEffect(() => {
    LocationRepository.getLocations().then(setLocations);
  }, []);

  const primarySlugs = [
    'banjara-hills',
    'jubilee-hills',
    'gachibowli',
    'hitech-city',
    'madhapur',
    'kondapur',
    'begumpet',
    'secunderabad',
    'somajiguda',
  ];

  const filtered = locations.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.city.toLowerCase().includes(search.toLowerCase()) ||
      (l.popularNeighborhoods &&
        l.popularNeighborhoods.some((n) => n.toLowerCase().includes(search.toLowerCase())));

    if (!matchesSearch) return false;
    if (selectedFilter === 'primary') return primarySlugs.includes(l.slug);
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#171717] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Hyderabad Locations' }]} onNavigate={onNavigate} />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E6E1D8]">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6922E]">
              <MapPin className="w-3.5 h-3.5 text-[#C6922E]" />
              <span>Hyderabad Directory Coverage</span>
            </div>
            <h1 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight mt-1">
              Hyderabad Companion Locations
            </h1>
            <p className="text-xs sm:text-sm text-[#5F5A52] mt-1.5 max-w-2xl">
              Explore 30 verified adult companion locations across Greater Hyderabad, Telangana — covering luxury enclaves, star hotel districts, and IT corridors.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="inline-flex rounded-xl bg-white p-1 border border-[#E6E1D8] shadow-2xs">
              <button
                type="button"
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === 'all'
                    ? 'bg-[#C6922E] text-[#171717] shadow-xs'
                    : 'text-[#5F5A52] hover:text-[#171717]'
                }`}
              >
                All 30 Locations
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter('primary')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === 'primary'
                    ? 'bg-[#C6922E] text-[#171717] shadow-xs'
                    : 'text-[#5F5A52] hover:text-[#171717]'
                }`}
              >
                9 Primary Hubs
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5F5A52] pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search neighborhood (e.g. Banjara Hills)…"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E6E1D8] bg-white text-xs font-medium text-[#171717] placeholder:text-[#5F5A52] focus:outline-none focus:border-[#C6922E] shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              onSelect={(slug) => onNavigate(`/locations/${slug}`)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 space-y-3 bg-white rounded-2xl border border-[#E6E1D8] p-8 shadow-2xs">
            <p className="text-sm font-bold text-[#171717]">No Hyderabad locations found</p>
            <p className="text-xs text-[#5F5A52]">
              No areas matched &ldquo;{search}&rdquo;. Try browsing primary hubs like Banjara Hills, Jubilee Hills, or Hitech City.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setSelectedFilter('all');
              }}
              className="mt-2 inline-flex items-center px-4 py-2 rounded-xl bg-[#F8F6F1] text-[#171717] border border-[#E6E1D8] text-xs font-semibold hover:border-[#C6922E] hover:text-[#C6922E] cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
