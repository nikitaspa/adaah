import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight, Sparkles, HelpCircle, ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { LocationRepository, ProfileRepository, CategoryRepository, ServiceRepository } from '../../lib/repositories';
import { Location, Profile, Service, Category } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { ProfileGrid } from '../profiles/ProfileGrid';
import { LocationCard } from '../locations/LocationCard';
import { siteConfig } from '../../config/site';

export interface LocationDetailPageViewProps {
  slug: string;
  onNavigate: (href: string) => void;
  onRequestService: (profile: Profile, service?: Service) => void;
}

export function LocationDetailPageView({
  slug,
  onNavigate,
  onRequestService,
}: LocationDetailPageViewProps) {
  const [location, setLocation] = useState<Location | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [nearbyLocations, setNearbyLocations] = useState<Location[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const whatsappUrl = `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(
    `Hello, I would like to inquire about companion availability in ${location?.name || 'Hyderabad'}.`
  )}`;
  const phoneTel = `tel:${siteConfig.contact.phoneRaw}`;

  useEffect(() => {
    setIsLoading(true);
    LocationRepository.getLocationBySlug(slug).then((loc) => {
      setLocation(loc || null);
      if (loc) {
        Promise.all([
          ProfileRepository.getProfilesByLocation(loc.id),
          LocationRepository.getNearbyLocations(loc.id, 3),
          CategoryRepository.getFeaturedCategories(),
          ServiceRepository.getPopularServices(),
        ]).then(([profs, nearby, cats, srvs]) => {
          setProfiles(profs);
          setNearbyLocations(nearby);
          setCategories(cats.slice(0, 4));
          setServices(srvs.slice(0, 3));
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#C6922E]" />
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] py-24 text-center max-w-md mx-auto px-4 text-[#171717]">
        <h2 className="text-xl font-bold text-[#171717] mb-2 font-serif-display">Location Not Found</h2>
        <p className="text-sm text-[#5F5A52] mb-6">
          The requested Hyderabad companion directory could not be located.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/locations')}
          className="px-6 py-2.5 rounded-xl bg-[#C6922E] text-[#171717] font-bold text-xs hover:bg-[#A8751F] cursor-pointer"
        >
          Browse All Hyderabad Locations
        </button>
      </div>
    );
  }

  const locationFaqs = [
    {
      q: `How do incalls and outcalls work in ${location.name}?`,
      a: `In ${location.name}, adult companions offer both incall arrangements at discreet, private apartments and outcalls to luxury star hotel suites or private residences throughout the area. Direct coordination ensures prompt arrivals.`,
    },
    {
      q: `Are all profiles in ${location.name} verified?`,
      a: `Yes, 100% of profiles listed in ${location.name} have undergone strict 18+ age verification and photographic vetting. Rates are transparently quoted in INR (₹).`,
    },
    {
      q: `How far in advance should I book a companion in ${location.name}?`,
      a: `For evening dinner accompaniment or suite appointments in ${location.name}, we recommend contacting companions 2 to 4 hours in advance, or 24 hours ahead for peak weekend evenings.`,
    },
    {
      q: `Is absolute discretion guaranteed?`,
      a: `Yes. Companions arrive independently in personal vehicles with no identifying markers, ensuring complete anonymity and confidentiality for patrons.`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#171717] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Locations', href: '/locations' },
            { label: location.name },
          ]}
          onNavigate={onNavigate}
        />

        {/* 2. Location Hero Header */}
        <div className="relative rounded-3xl overflow-hidden border border-[#E6E1D8] bg-white shadow-2xs">
          <div className="relative aspect-[21/9] sm:aspect-[24/8] w-full overflow-hidden bg-[#F3F0E9]">
            <img
              src={location.image || location.heroImage || location.coverImage}
              alt={location.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-[#E6E1D8] backdrop-blur-md text-xs font-bold text-[#171717] uppercase tracking-wider shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#C6922E]" />
                  <span>{location.city || 'Hyderabad'}, {location.state || 'Telangana'}</span>
                </div>
                <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-sm">
                  {location.name} Companions
                </h1>
                <p className="text-xs sm:text-sm text-stone-200 max-w-2xl drop-shadow-xs">
                  {location.description}
                </p>
              </div>

              <div className="flex items-center gap-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#E6E1D8] shadow-xs">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[#5F5A52] block">Verified Active</span>
                  <span className="text-lg font-bold font-serif-display text-[#171717]">
                    {profiles.length} Companions
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Enclaves Bar */}
          {location.popularNeighborhoods && location.popularNeighborhoods.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-[#E6E1D8] flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-[#916718] uppercase tracking-wider text-[10px]">
                Key Sectors in {location.name}:
              </span>
              {location.popularNeighborhoods.map((nh) => (
                <span
                  key={nh}
                  className="px-2.5 py-1 rounded-lg bg-[#F8F6F1] border border-[#E6E1D8] text-[#171717] text-xs font-medium"
                >
                  {nh}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 3. Featured Profiles */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6922E]">
                <Sparkles className="w-3.5 h-3.5 text-[#C6922E]" />
                <span>Verified Companions</span>
              </div>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#171717]">
                Featured Profiles in {location.name}
              </h2>
              <p className="text-xs text-[#5F5A52] mt-0.5">
                Adult 18+ independent companions available for incall & outcall bookings in {location.name}, Hyderabad
              </p>
            </div>
          </div>

          <ProfileGrid
            profiles={profiles}
            isLoading={false}
            onViewProfile={(profileSlug) => onNavigate(`/profiles/${profileSlug}`)}
            onRequestService={onRequestService}
          />
        </div>

        {/* 4. Popular Categories in this Location */}
        {categories.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-[#E6E1D8]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-display text-xl font-bold text-[#171717]">
                  Popular Categories in {location.name}
                </h3>
                <p className="text-xs text-[#5F5A52]">
                  Select a category to explore specialized adult companionship styles
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/categories')}
                className="text-xs font-bold text-[#C6922E] hover:text-[#A8751F] flex items-center gap-1 cursor-pointer"
              >
                <span>View All Categories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => onNavigate(`/categories/${cat.slug}`)}
                  className="p-4 rounded-2xl bg-white border border-[#E6E1D8] hover:border-[#C6922E] cursor-pointer transition-all flex flex-col justify-between group shadow-2xs"
                >
                  <div>
                    <h4 className="font-serif-display font-bold text-[#171717] group-hover:text-[#C6922E] transition-colors">
                      {cat.name}
                    </h4>
                    <p className="text-xs text-[#5F5A52] mt-1 line-clamp-2">
                      {cat.shortDescription}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-[#E6E1D8] flex items-center justify-between text-[11px] font-semibold text-[#5F5A52]">
                    <span>{cat.profileCount} Companions</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C6922E] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Services Available in this Location */}
        {services.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-[#E6E1D8]">
            <div>
              <h3 className="font-serif-display text-xl font-bold text-[#171717]">
                Companionship Services in {location.name}
              </h3>
              <p className="text-xs text-[#5F5A52]">
                Transparently priced adult companionship options in INR (₹)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => onNavigate(`/services/${srv.slug}`)}
                  className="p-5 rounded-2xl bg-white border border-[#E6E1D8] hover:border-[#C6922E] cursor-pointer transition-all group flex flex-col justify-between shadow-2xs"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#916718] tracking-wider">
                      {srv.categoryName}
                    </span>
                    <h4 className="font-serif-display text-lg font-bold text-[#171717] group-hover:text-[#C6922E] transition-colors">
                      {srv.name}
                    </h4>
                    <p className="text-xs text-[#5F5A52] leading-relaxed line-clamp-2">
                      {srv.shortDescription}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#E6E1D8] flex items-center justify-between text-xs font-semibold text-[#171717]">
                    <span className="text-[#C6922E] font-bold">{srv.priceEstimate}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C6922E] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Nearby Locations */}
        {nearbyLocations.length > 0 && (
          <div className="pt-8 border-t border-[#E6E1D8] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-display text-xl font-bold text-[#171717]">
                  Nearby Hyderabad Locations
                </h3>
                <p className="text-xs text-[#5F5A52]">
                  Explore companions in adjoining metropolitan neighborhoods
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/locations')}
                className="text-xs font-bold text-[#C6922E] hover:text-[#A8751F] flex items-center gap-1 cursor-pointer"
              >
                <span>View All 30 Locations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nearbyLocations.map((nl) => (
                <LocationCard
                  key={nl.id}
                  location={nl}
                  onSelect={(locSlug) => onNavigate(`/locations/${locSlug}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* 7. Location FAQ */}
        <div className="pt-8 border-t border-[#E6E1D8] space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6922E]">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Questions & Answers</span>
            </div>
            <h3 className="font-serif-display text-xl font-bold text-[#171717]">
              Frequently Asked Questions about {location.name} Companions
            </h3>
          </div>

          <div className="space-y-3">
            {locationFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#E6E1D8] bg-white overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-[#171717] hover:text-[#C6922E] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C6922E] transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-[#5F5A52] leading-relaxed border-t border-[#E6E1D8] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 8. Final CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E6E1D8] text-center space-y-4 shadow-2xs">
          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#171717]">
            Ready to Connect with Companions in {location.name}?
          </h3>
          <p className="text-xs sm:text-sm text-[#5F5A52] max-w-xl mx-auto leading-relaxed">
            Browse full profile portfolios, view verified unedited photos, and initiate discreet inquiries directly via WhatsApp or phone.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs transition-all shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white text-white" />
              <span>WhatsApp Inquiry</span>
            </a>
            <a
              href={phoneTel}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C6922E] hover:bg-[#A8751F] text-[#171717] font-bold text-xs transition-all shadow-xs cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#171717]" />
              <span>Call Now</span>
            </a>
            <button
              type="button"
              onClick={() => onNavigate('/locations')}
              className="px-6 py-3 rounded-xl bg-[#F8F6F1] text-[#171717] border border-[#E6E1D8] font-semibold text-xs hover:border-[#C6922E] hover:text-[#C6922E] transition-colors cursor-pointer"
            >
              Explore Other Hyderabad Areas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
