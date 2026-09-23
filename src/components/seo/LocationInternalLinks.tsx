import React from 'react';
import { MapPin, Tag, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { Location, Category, Service } from '../../types';
import { mockLocations } from '../../data/locations';
import { mockCategories } from '../../data/categories';
import { mockServices } from '../../data/services';
import { mockGuides } from '../../data/guides';

export interface LocationInternalLinksProps {
  currentLocation: Location;
  onNavigate: (href: string) => void;
  className?: string;
}

export function LocationInternalLinks({
  currentLocation,
  onNavigate,
  className = '',
}: LocationInternalLinksProps) {
  // Get nearby locations (exclude current location)
  const nearbyLocations = mockLocations
    .filter((loc) => loc.id !== currentLocation.id)
    .slice(0, 6);

  // Get relevant categories
  const categories: Category[] = mockCategories.slice(0, 6);

  // Get relevant services
  const services: Service[] = mockServices.slice(0, 4);

  // Get relevant guides
  const guides = mockGuides.slice(0, 3);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <div className={`space-y-8 pt-8 border-t border-[#E6E1D8] ${className}`}>
      {/* 1. Nearby Hyderabad Enclaves */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[#916718] font-bold text-xs uppercase tracking-wider">
          <MapPin className="w-4 h-4 text-[#C6922E]" />
          <span>Explore Nearby Hyderabad Locations</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {nearbyLocations.map((loc) => (
            <a
              key={loc.id}
              href={`/locations/${loc.slug}`}
              onClick={(e) => handleLinkClick(e, `/locations/${loc.slug}`)}
              className="p-3 rounded-xl bg-white border border-[#E6E1D8] hover:border-[#C6922E] hover:bg-[#F8F6F1] transition-all text-xs font-semibold text-[#171717] flex items-center justify-between group cursor-pointer shadow-2xs"
            >
              <span className="truncate">{loc.name}</span>
              <ChevronRight className="w-3 h-3 text-[#8C827A] group-hover:text-[#C6922E] shrink-0" />
            </a>
          ))}
        </div>
      </div>

      {/* 2. Popular Companion Categories */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[#916718] font-bold text-xs uppercase tracking-wider">
          <Tag className="w-4 h-4 text-[#C6922E]" />
          <span>Browse Companion Categories in {currentLocation.name}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/categories/${cat.slug}`}
              onClick={(e) => handleLinkClick(e, `/categories/${cat.slug}`)}
              className="p-3 rounded-xl bg-white border border-[#E6E1D8] hover:border-[#C6922E] hover:bg-[#F8F6F1] transition-all text-xs font-semibold text-[#171717] flex items-center justify-between group cursor-pointer shadow-2xs"
            >
              <span className="truncate">{cat.name}</span>
              <ChevronRight className="w-3 h-3 text-[#8C827A] group-hover:text-[#C6922E] shrink-0" />
            </a>
          ))}
        </div>
      </div>

      {/* 3. Companionship Occasions & Services */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[#916718] font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#C6922E]" />
          <span>Popular Services & Occasions</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {services.map((srv) => (
            <a
              key={srv.id}
              href={`/services/${srv.slug}`}
              onClick={(e) => handleLinkClick(e, `/services/${srv.slug}`)}
              className="p-3 rounded-xl bg-white border border-[#E6E1D8] hover:border-[#C6922E] hover:bg-[#F8F6F1] transition-all text-xs font-semibold text-[#171717] flex items-center justify-between group cursor-pointer shadow-2xs"
            >
              <span className="truncate">{srv.name}</span>
              <ChevronRight className="w-3 h-3 text-[#8C827A] group-hover:text-[#C6922E] shrink-0" />
            </a>
          ))}
        </div>
      </div>

      {/* 4. Useful Safety & Discretion Guides */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[#916718] font-bold text-xs uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-[#C6922E]" />
          <span>Safety & Etiquette Resources</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {guides.map((gd) => (
            <a
              key={gd.id}
              href={`/guides/${gd.slug}`}
              onClick={(e) => handleLinkClick(e, `/guides/${gd.slug}`)}
              className="p-3.5 rounded-xl bg-white border border-[#E6E1D8] hover:border-[#C6922E] transition-all text-xs space-y-1 block cursor-pointer shadow-2xs"
            >
              <span className="font-bold text-[#171717] block truncate">{gd.title}</span>
              <span className="text-[#5F5A52] text-[11px] line-clamp-1">{gd.excerpt}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
