import React, { useEffect, useState } from 'react';
import { HeroSection } from '../home/HeroSection';
import { TrustIndicators } from '../home/TrustIndicators';
import { FeaturedProfiles } from '../home/FeaturedProfiles';
import { PopularLocations } from '../home/PopularLocations';
import { PopularCategories } from '../home/PopularCategories';
import { ServicesSection } from '../home/ServicesSection';
import { HowItWorks } from '../home/HowItWorks';
import { SafetySection } from '../home/SafetySection';
import { TestimonialsSection } from '../home/TestimonialsSection';
import { LatestGuidesSection } from '../home/LatestGuidesSection';
import { SeoContentSection } from '../home/SeoContentSection';
import { FaqPreview } from '../home/FaqPreview';
import { FinalCta } from '../home/FinalCta';
import { ProfileRepository, CategoryRepository, LocationRepository, ServiceRepository } from '../../lib/repositories';
import { Profile, Category, Location, Service, SearchSuggestionItem } from '../../types';

export interface HomePageViewProps {
  onNavigate: (href: string) => void;
  onRequestService: (profile?: Profile, service?: Service) => void;
}

export function HomePageView({ onNavigate, onRequestService }: HomePageViewProps) {
  const [featuredProfiles, setFeaturedProfiles] = useState<Profile[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    ProfileRepository.getFeaturedProfiles(8).then(setFeaturedProfiles);
    CategoryRepository.getCategories().then(setCategories);
    LocationRepository.getFeaturedLocations().then(setLocations);
    ServiceRepository.getPopularServices().then(setServices);
  }, []);

  const handleSearchSubmit = (query: string) => {
    onNavigate(`/profiles?q=${encodeURIComponent(query)}`);
  };

  const handleSelectSuggestion = (item: SearchSuggestionItem) => {
    switch (item.type) {
      case 'profile':
        onNavigate(`/profiles/${item.slug}`);
        break;
      case 'location':
        onNavigate(`/locations/${item.slug}`);
        break;
      case 'category':
        onNavigate(`/categories/${item.slug}`);
        break;
      case 'service':
        onNavigate(`/services/${item.slug}`);
        break;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F6F1] text-[#171717]">
      {/* SECTION 1: HERO */}
      <HeroSection
        onSearchSubmit={handleSearchSubmit}
        onSelectSuggestion={handleSelectSuggestion}
        onExploreProfiles={() => onNavigate('/profiles')}
        onRequestService={() => onRequestService()}
        onSelectQuickPill={(q) => onNavigate(`/profiles?q=${encodeURIComponent(q)}`)}
      />

      {/* SECTION 2: QUICK STATS / VALUE PROPOSITION */}
      <TrustIndicators />

      {/* SECTION 3: FEATURED PROFILES (6-8 cards) */}
      <FeaturedProfiles
        profiles={featuredProfiles}
        onViewProfile={(slug) => onNavigate(`/profiles/${slug}`)}
        onRequestService={(p) => onRequestService(p)}
        onExploreAll={() => onNavigate('/profiles')}
      />

      {/* SECTION 4: BROWSE BY METROPOLITAN AREA (Mumbai, Delhi, Bangalore, etc.) */}
      <PopularLocations
        locations={locations}
        onSelectLocation={(slug) => onNavigate(`/locations/${slug}`)}
        onExploreAllLocations={() => onNavigate('/locations')}
      />

      {/* SECTION 5: COMPANION CATEGORIES */}
      <PopularCategories
        categories={categories}
        onSelectCategory={(slug) => onNavigate(`/categories/${slug}`)}
        onExploreAllCategories={() => onNavigate('/categories')}
      />

      {/* SECTION 6: COMPANIONSHIP SERVICES / OCCASIONS */}
      <ServicesSection
        services={services}
        onSelectService={(slug) => onNavigate(`/services/${slug}`)}
        onExploreAllServices={() => onNavigate('/services')}
      />

      {/* SECTION 7: HOW IT WORKS */}
      <HowItWorks />

      {/* SECTION 8: TRUST, PRIVACY & SAFETY */}
      <SafetySection />

      {/* SECTION 9: CLIENT REVIEWS / TESTIMONIALS */}
      <TestimonialsSection />

      {/* SECTION 10: LATEST GUIDES & ETIQUETTE ARTICLES */}
      <LatestGuidesSection
        onSelectGuide={(slug) => onNavigate(`/guides/${slug}`)}
        onExploreAllGuides={() => onNavigate('/guides')}
      />

      {/* SECTION 11: SEO CONTENT SECTION */}
      <SeoContentSection />

      {/* SECTION 12: FAQ PREVIEW */}
      <FaqPreview onViewAllFaqs={() => onNavigate('/faq')} />

      {/* SECTION 13: FINAL CTA */}
      <FinalCta
        onBrowseDirectory={() => onNavigate('/profiles')}
        onContactConcierge={() => onNavigate('/contact')}
      />
    </div>
  );
}
