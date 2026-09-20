import React, { useState, useEffect } from 'react';
import { CheckCircle2, Sparkles, Send } from 'lucide-react';
import { ServiceRepository, ProfileRepository } from '../../lib/repositories';
import { Service, Profile } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { ProfileCard } from '../profiles/ProfileCard';
import { formatCurrency } from '../../utils/formatters';

export interface ServiceDetailPageViewProps {
  slug: string;
  onNavigate: (href: string) => void;
  onRequestService: (profile?: Profile, service?: Service) => void;
}

export function ServiceDetailPageView({
  slug,
  onNavigate,
  onRequestService,
}: ServiceDetailPageViewProps) {
  const [service, setService] = useState<Service | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    ServiceRepository.getServiceBySlug(slug).then((srv) => {
      setService(srv || null);
      if (srv) {
        ProfileRepository.getProfilesByCategory(srv.categoryId).then(setProfiles);
      }
      setIsLoading(false);
    });
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#C6922E]" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] py-24 text-center max-w-md mx-auto px-4 text-[#171717]">
        <h2 className="text-xl font-bold text-[#171717] mb-2 font-serif-display">Service Not Found</h2>
        <p className="text-sm text-[#5F5A52] mb-6">The requested companionship occasion does not exist.</p>
        <button
          type="button"
          onClick={() => onNavigate('/services')}
          className="px-6 py-2.5 rounded-xl bg-[#C6922E] text-[#171717] font-bold text-xs hover:bg-[#A8751F] cursor-pointer"
        >
          Browse All Services
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#171717] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs
          items={[
            { label: 'Services', href: '/services' },
            { label: service.name },
          ]}
          onNavigate={onNavigate}
        />

        {/* Hero Header Card */}
        <div className="rounded-3xl border border-[#E6E1D8] bg-white p-6 sm:p-8 shadow-2xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8F6F1] border border-[#E6E1D8] text-xs font-bold text-[#C6922E] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#C6922E]" />
                <span>{service.categoryName}</span>
              </div>
              <h1 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight">
                {service.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#5F5A52] leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3 p-5 rounded-2xl bg-[#F8F6F1] border border-[#E6E1D8] w-full md:w-auto">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#5F5A52] block">Honorarium Estimate</span>
                <span className="text-xl font-bold font-serif-display text-[#171717]">
                  {service.priceEstimate || 'Contact for Pricing'}
                </span>
                <span className="text-xs text-[#5F5A52] block mt-0.5">
                  Typical duration: {service.typicalDuration || 'Flexible'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onRequestService(undefined, service)}
                className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-[#C6922E] hover:bg-[#A8751F] text-[#171717] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Inquire for this Occasion</span>
              </button>
            </div>
          </div>

          {/* Key Inclusions / What To Expect */}
          {((service.whatToExpect && service.whatToExpect.length > 0) || ((service as any).inclusions && (service as any).inclusions.length > 0)) && (
            <div className="mt-8 pt-6 border-t border-[#E6E1D8]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#916718] mb-3">
                Included Standards & Expectations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {(service.whatToExpect || (service as any).inclusions || []).map((inc: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#171717]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profiles Offering this Occasion */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-[#171717]">
                Independent Companions Available for {service.name}
              </h2>
              <p className="text-xs text-[#5F5A52] mt-0.5">
                Verified adult companions ready to accompany you for this specific occasion in Hyderabad
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {profiles.map((p) => (
              <ProfileCard
                key={p.id}
                profile={p}
                onViewProfile={(slug) => onNavigate(`/profiles/${slug}`)}
                onRequestService={() => onRequestService(p, service)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
