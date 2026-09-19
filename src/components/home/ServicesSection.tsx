import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Service } from '../../types';
import { ServiceCard } from '../services/ServiceCard';

export interface ServicesSectionProps {
  services: Service[];
  onSelectService: (slug: string) => void;
  onExploreAllServices: () => void;
}

export function ServicesSection({
  services,
  onSelectService,
  onExploreAllServices,
}: ServicesSectionProps) {
  return (
    <section id="services-occasions-section" className="py-16 md:py-24 bg-[#F3F0E9] border-b border-[#E6E1D8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6922E]">
              <Sparkles className="w-3.5 h-3.5 text-[#C6922E]" />
              <span>Engagement Occasions</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight">
              Companionship Services & Occasions
            </h2>
            <p className="text-xs sm:text-sm text-[#5F5A52] max-w-xl">
              Sophisticated arrangements curated for dining, executive corporate galas, private holiday escapes, and cultural exploration in Hyderabad.
            </p>
          </div>

          <button
            type="button"
            onClick={onExploreAllServices}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#171717] border border-[#E6E1D8] hover:border-[#C6922E] hover:text-[#C6922E] transition-colors text-xs font-semibold cursor-pointer shadow-2xs"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={onSelectService}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
