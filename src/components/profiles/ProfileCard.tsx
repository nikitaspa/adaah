import React from 'react';
import { MapPin, Check, Eye } from 'lucide-react';
import { Profile } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { CallButton } from '../common/CallButton';

export interface ProfileCardProps {
  key?: React.Key;
  profile: Profile;
  onViewProfile?: (slug: string) => void;
  onRequestService?: (profile: Profile) => void;
  className?: string;
}

export function ProfileCard({
  profile,
  onViewProfile,
  onRequestService,
  className = '',
}: ProfileCardProps) {
  const isAvailable = profile.availability?.status === 'Available';
  const displayImage = profile.coverImage || profile.avatar || (profile.images && profile.images[0]) || '/images/profiles/profile-001.webp';
  const originalPrice = profile.priceFrom || profile.pricing?.startingPrice || 10000;
  const discountedPrice = Math.round(originalPrice * 0.6);
  const savings = originalPrice - discountedPrice;

  return (
    <article
      id={`profile-card-${profile.slug}`}
      className={`group relative flex flex-col justify-between rounded-2xl border border-[#E6E1D8] bg-white overflow-hidden shadow-2xs hover:border-[#C6922E] hover:shadow-md transition-all duration-300 ${className}`}
    >
      <div>
        {/* Aspect Ratio 4:5 Portrait Image Container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F3F0E9]">
          <img
            src={displayImage}
            alt={`Fictional adult profile portrait for Adaah directory — ${profile.name}`}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Top badges: Verification badge & 40% OFF badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            {profile.verified && (
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-[#916718] border border-[#C6922E]/40 backdrop-blur-md shadow-xs"
                title="18+ Verified Identity"
              >
                <Check className="w-3.5 h-3.5 text-[#C6922E] stroke-[2.5]" />
                <span>✓ Verified</span>
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-600 text-white shadow-md animate-pulse">
              🔥 40% OFF
            </span>
          </div>

          {/* Rating pill */}
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 text-[#171717] border border-[#E6E1D8] backdrop-blur-md shadow-xs">
              <span className="text-[#C6922E]">★</span> {profile.rating.toFixed(1)}
            </span>
          </div>

          {/* Subtle bottom gradient only for badge contrast */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Bottom Availability Badge over image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
                isAvailable
                  ? 'bg-white/95 text-emerald-800 border border-emerald-200 shadow-xs'
                  : 'bg-white/95 text-amber-800 border border-amber-200 shadow-xs'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isAvailable ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
              <span>{profile.availability?.status || 'Available'}</span>
            </span>

            {/* Category tag on image */}
            <span className="text-[11px] font-semibold text-[#171717] bg-white/95 backdrop-blur-md border border-[#E6E1D8] px-2.5 py-0.5 rounded-full shadow-xs">
              {profile.category || profile.categoryNames?.[0] || 'Independent'}
            </span>
          </div>
        </div>

        {/* Profile Content Body */}
        <div className="p-4 sm:p-5 space-y-3 min-w-0">
          {/* Name & Age */}
          <div className="flex items-baseline justify-between gap-2 min-w-0">
            <h3
              onClick={() => onViewProfile?.(profile.slug)}
              className="font-serif-display text-lg sm:text-xl font-bold text-[#171717] group-hover:text-[#C6922E] transition-colors cursor-pointer truncate"
            >
              {profile.name}, <span className="text-[#5F5A52] font-sans text-base font-normal">{profile.age}</span>
            </h3>
          </div>

          {/* Location: Area & City */}
          <div className="flex items-center text-xs text-[#5F5A52] gap-1.5 min-w-0">
            <MapPin className="w-3.5 h-3.5 text-[#C6922E] shrink-0" />
            <span className="truncate">
              {profile.area || profile.neighborhood ? `${profile.area || profile.neighborhood}, ` : ''}
              {profile.city || profile.locationName || 'Hyderabad'}
            </span>
          </div>

          {/* Languages */}
          {profile.languages && profile.languages.length > 0 && (
            <div className="flex items-center gap-1 text-[11px] text-[#5F5A52] min-w-0">
              <span className="text-[#8C827A] shrink-0">Languages:</span>
              <span className="text-[#171717] font-medium truncate">
                {profile.languages.join(' • ')}
              </span>
            </div>
          )}

          {/* Services Offered Tags */}
          {((profile.services && profile.services.length > 0) || (profile.serviceNames && profile.serviceNames.length > 0)) && (
            <div className="flex flex-wrap gap-1 pt-0.5">
              {(profile.services || profile.serviceNames || []).slice(0, 2).map((srv, idx) => (
                <span
                  key={idx}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-[#F8F6F1] border border-[#E6E1D8] text-[#5F5A52] font-medium max-w-full truncate"
                >
                  {srv}
                </span>
              ))}
              {(profile.services || profile.serviceNames || []).length > 2 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md text-[#8C827A] bg-[#F8F6F1]">
                  +{(profile.services || profile.serviceNames || []).length - 2}
                </span>
              )}
            </div>
          )}

          {/* Short description */}
          <p className="text-xs text-[#5F5A52] line-clamp-2 leading-relaxed break-words">
            {profile.shortDescription || profile.headline || profile.bio}
          </p>

          {/* Price block with 40% Discount */}
          <div className="pt-2.5 border-t border-[#E6E1D8] flex items-center justify-between min-w-0">
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-[#8C827A] font-medium">
                Honorarium (40% OFF)
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold truncate">
                Save {formatCurrency(savings)}
              </span>
            </div>
            <div className="text-right shrink-0">
              <div className="flex items-baseline justify-end gap-1.5">
                <span className="text-xs text-[#8C827A] line-through font-medium">
                  {formatCurrency(originalPrice)}
                </span>
                <span className="text-base sm:text-lg font-bold text-[#C6922E] font-serif-display">
                  {formatCurrency(discountedPrice)}
                </span>
              </div>
              <span className="text-[10px] text-[#8C827A] block">/ session</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Area: View Profile + WhatsApp + Call Now */}
      <div className="p-4 pt-0 space-y-2">
        {/* Primary View Profile CTA */}
        <button
          id={`view-profile-btn-${profile.slug}`}
          type="button"
          onClick={() => onViewProfile?.(profile.slug)}
          className="w-full h-11 min-h-[44px] py-2.5 px-3 rounded-xl bg-[#F8F6F1] hover:bg-[#F3F0E9] text-[#171717] border border-[#E6E1D8] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
        >
          <Eye className="w-3.5 h-3.5 text-[#5F5A52]" />
          <span>View Profile</span>
        </button>

        {/* Contact actions: WhatsApp and Call Now */}
        <div className="grid grid-cols-2 gap-2">
          <WhatsAppButton
            profileName={profile.name}
            size="sm"
            fullWidth
          />
          <CallButton
            size="sm"
            fullWidth
          />
        </div>
      </div>
    </article>
  );
}
