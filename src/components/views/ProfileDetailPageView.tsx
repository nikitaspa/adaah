import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  MapPin,
  Share2,
  Heart,
  Send,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Eye,
  ChevronRight,
  UserCheck,
  Lock,
  Clock,
  Calendar,
} from 'lucide-react';
import { ProfileRepository } from '../../lib/repositories';
import { Profile, Service } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { GalleryModal } from '../profiles/GalleryModal';
import { useToast } from '../common/Toast';
import { formatCurrency, getAvailabilityBadgeProps } from '../../utils/formatters';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { CallButton } from '../common/CallButton';

export interface ProfileDetailPageViewProps {
  slug: string;
  onNavigate: (href: string) => void;
  onRequestService: (profile: Profile, service?: Service) => void;
}

export function ProfileDetailPageView({
  slug,
  onNavigate,
  onRequestService,
}: ProfileDetailPageViewProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [similarProfiles, setSimilarProfiles] = useState<Profile[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Quick inquiry state inside the page
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryContact, setInquiryContact] = useState('');
  const [inquiryDate, setInquiryDate] = useState('');
  const [inquiryService, setInquiryService] = useState('');
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    ProfileRepository.getProfileBySlug(slug).then((p) => {
      setProfile(p || null);
      if (p) {
        ProfileRepository.getRelatedProfiles(p.id, 4).then(setSimilarProfiles);
      }
      setIsLoading(false);
    });

    try {
      const favs = JSON.parse(localStorage.getItem('lumina_favorites') || '[]');
      setIsFavorite(favs.includes(slug));
    } catch {
      // ignore
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#C6922E]" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] py-24 text-center max-w-md mx-auto px-4 text-[#171717]">
        <h2 className="text-2xl font-bold text-[#171717] mb-2 font-serif-display">Profile Not Found</h2>
        <p className="text-sm text-[#5F5A52] mb-6">
          The requested companion profile does not exist or may have been unlisted.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/profiles')}
          className="px-6 py-2.5 rounded-xl bg-[#C6922E] hover:bg-[#A8751F] text-[#171717] font-bold text-xs shadow-xs"
        >
          Return to Directory
        </button>
      </div>
    );
  }

  const availability = getAvailabilityBadgeProps(profile.availability?.status || 'Available');

  // Compile photos array (3-6 photos)
  const allImages =
    profile.images && profile.images.length > 0
      ? profile.images
      : [
          profile.coverImage || profile.avatar || '/images/profiles/profile-001.webp',
        ];

  const galleryItems = allImages.map((url, i) => ({
    id: `img-${i}`,
    url,
    caption: `${profile.name} — Photo ${i + 1}`,
  }));

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          type: 'success',
          title: 'Link Copied',
          message: 'Profile link copied to your clipboard.',
        });
      }
    } catch {
      toast({
        type: 'info',
        title: 'Share Profile',
        message: `${profile.name} — ${profile.headline || profile.category}`,
      });
    }
  };

  const handleToggleFavorite = () => {
    try {
      const favs: string[] = JSON.parse(localStorage.getItem('lumina_favorites') || '[]');
      let updated: string[];
      if (favs.includes(profile.slug)) {
        updated = favs.filter((s) => s !== profile.slug);
        setIsFavorite(false);
        toast({
          type: 'info',
          title: 'Removed',
          message: `${profile.name} removed from saved favorites.`,
        });
      } else {
        updated = [...favs, profile.slug];
        setIsFavorite(true);
        toast({
          type: 'success',
          title: 'Saved',
          message: `${profile.name} saved to your favorites list.`,
        });
      }
      localStorage.setItem('lumina_favorites', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleQuickInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    toast({
      type: 'success',
      title: 'Inquiry Sent Confidentially',
      message: `Your appointment request for ${profile.name} has been securely transmitted.`,
    });
  };

  const originalPrice = profile.priceFrom || profile.pricing?.startingPrice || 10000;
  const startingPrice = Math.round(originalPrice * 0.6);
  const originalEveningPrice = Math.round(originalPrice * 1.5);
  const eveningPrice = Math.round(originalEveningPrice * 0.6);
  const originalOvernightPrice = Math.round(originalPrice * 2.8);
  const overnightPrice = Math.round(originalOvernightPrice * 0.6);

  const locationDisplay = `${profile.area || profile.neighborhood || 'Banjara Hills'}, ${profile.city || 'Hyderabad'}`;
  const locationSlug = (profile.area || 'banjara-hills').toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#171717] py-8 pb-24 md:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Directory', href: '/profiles' },
            { label: profile.area || 'Hyderabad', href: `/locations/${locationSlug}` },
            { label: profile.name },
          ]}
          onNavigate={onNavigate}
        />

        {/* Profile Grid: Left (Gallery & Sticky Contact Card) + Right (Details & Booking) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* =========================================
              LEFT COLUMN: Photo Gallery & Contact Card
             ========================================= */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Photo Gallery Card */}
            <div className="rounded-3xl border border-[#E6E1D8] bg-white p-4 sm:p-5 shadow-xs space-y-4">
              {/* Primary Photo with 18+ and Verified badge */}
              <div
                onClick={() => setGalleryOpen(true)}
                className="group relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#F3F0E9] cursor-pointer"
              >
                <img
                  src={allImages[activeImageIndex] || allImages[0]}
                  alt={`${profile.name}, age ${profile.age}`}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Top Badges: 18+ & Verified */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-[#916718] border border-[#C6922E]/40 backdrop-blur-md shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-[#C6922E]" />
                    <span>✓ 18+ Verified</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/90 text-[#171717] border border-[#E6E1D8] backdrop-blur-md w-max shadow-xs">
                    <MapPin className="w-3 h-3 text-[#C6922E]" />
                    <span>{locationDisplay}</span>
                  </span>
                </div>

                {/* Expand gallery indicator */}
                <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#E6E1D8] text-xs font-semibold text-[#171717] shadow-xs">
                  <Eye className="w-3.5 h-3.5 text-[#C6922E]" />
                  <span>View Photos ({allImages.length})</span>
                </div>
              </div>

              {/* Thumbnail Gallery (3-6 photos) */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 pt-1">
                  {allImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#C6922E] ring-2 ring-[#C6922E]/20 scale-105'
                          : 'border-[#E6E1D8] opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Thumbnail ${idx + 1}`}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary Contact Card (Sticky on desktop) */}
            <div className="rounded-3xl border border-[#E6E1D8] bg-white p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    {profile.availability?.status || 'Available'}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-bold shadow-xs animate-pulse">
                    40% OFF
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline justify-end gap-1.5">
                    <span className="text-xs text-[#8C827A] line-through font-medium">
                      {formatCurrency(originalPrice)}
                    </span>
                    <span className="text-lg font-bold text-[#C6922E] font-serif-display">
                      {formatCurrency(startingPrice)}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold block">
                    Save {formatCurrency(originalPrice - startingPrice)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <WhatsAppButton
                  profileName={profile.name}
                  size="lg"
                  fullWidth
                />
                <CallButton
                  size="lg"
                  fullWidth
                />
              </div>

              <div className="pt-3 text-xs text-[#5F5A52] space-y-1.5 border-t border-[#E6E1D8]">
                <div className="flex items-center justify-between">
                  <span className="text-[#8C827A]">Phone:</span>
                  <a href="tel:+918999384340" className="font-semibold text-[#171717] hover:text-[#C6922E]">
                    +91 89993 84340
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8C827A]">Response Time:</span>
                  <span className="font-semibold text-[#171717]">
                    {profile.contactPlaceholder?.responseTime || 'Within 15 mins'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8C827A]">Working Hours:</span>
                  <span className="font-semibold text-[#171717]">10:00 AM – 11:00 PM</span>
                </div>
              </div>

              {/* Discretion badge */}
              <div className="p-3 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#5F5A52] flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#C6922E] shrink-0" />
                <span>100% Discreet & Confidential Inquiries. Strictly 18+.</span>
              </div>
            </div>
          </div>

          {/* =========================================
              RIGHT COLUMN: Headline, Honorarium Table,
              Personal Specs, Services, Bio, Rules & Form
             ========================================= */}
          <div className="lg:col-span-7 space-y-6">
            {/* Main Header & Title Card */}
            <div className="rounded-3xl border border-[#E6E1D8] bg-white p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-[#C6922E]/10 border border-[#C6922E]/30 text-[#916718] text-xs font-bold uppercase tracking-wider">
                      {profile.category}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        profile.availability?.status === 'Available'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>{profile.availability?.status || 'Available'}</span>
                    </span>
                  </div>

                  <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight">
                    {profile.name}, <span className="font-sans font-normal text-2xl text-[#5F5A52]">{profile.age}</span>
                  </h1>

                  <div className="flex items-center gap-2 text-[#5F5A52] text-xs mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C6922E]" />
                    <span className="text-[#171717] font-medium">{locationDisplay}</span>
                    <span>•</span>
                    <span className="flex items-center text-[#916718] font-semibold">
                      ★ {profile.rating.toFixed(1)} ({profile.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Action Buttons: Favorite & Share */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleToggleFavorite}
                    aria-label={isFavorite ? 'Remove favorite' : 'Save favorite'}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isFavorite
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'bg-[#F8F6F1] border-[#E6E1D8] text-[#5F5A52] hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label="Share profile"
                    className="p-3 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-[#5F5A52] hover:text-[#C6922E] transition-colors cursor-pointer"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {profile.headline && (
                <p className="text-sm font-medium text-[#5F5A52] leading-relaxed border-t border-[#E6E1D8] pt-3 italic">
                  &ldquo;{profile.headline}&rdquo;
                </p>
              )}
            </div>

            {/* Honorarium / Pricing Table in INR (₹) */}
            <div className="rounded-3xl border border-[#E6E1D8] bg-white p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif-display text-xl font-bold text-[#171717]">
                      Honorarium & Rates (INR ₹)
                    </h2>
                    <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white text-xs font-bold shadow-xs">
                      🔥 40% OFF
                    </span>
                  </div>
                  <p className="text-xs text-[#5F5A52] mt-0.5">
                    Limited time 40% discount applied to all meeting packages
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#916718] bg-[#C6922E]/10 px-2.5 py-1 rounded-md border border-[#C6922E]/20 self-start sm:self-auto">
                  Direct Arrangements
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {/* Hourly / 1 Session */}
                <div className="p-4 rounded-2xl bg-[#F8F6F1] border border-[#E6E1D8] flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-[#5F5A52] block font-medium">Standard Meeting</span>
                    <span className="text-xs text-[#8C827A]">1 to 2 hours</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#E6E1D8]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-[#8C827A] line-through font-medium">
                        {formatCurrency(originalPrice)}
                      </span>
                      <div className="text-xl font-bold font-serif-display text-[#C6922E]">
                        {formatCurrency(startingPrice)}
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold block">
                      Save {formatCurrency(originalPrice - startingPrice)}
                    </span>
                  </div>
                </div>

                {/* Evening / Dinner */}
                <div className="p-4 rounded-2xl bg-[#F8F6F1] border border-[#C6922E]/40 flex flex-col justify-between relative">
                  <div className="absolute -top-2.5 right-3 bg-[#C6922E] text-[#171717] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                    Popular
                  </div>
                  <div>
                    <span className="text-xs text-[#171717] block font-semibold">Evening / Dinner Date</span>
                    <span className="text-xs text-[#8C827A]">3 to 4 hours</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#E6E1D8]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-[#8C827A] line-through font-medium">
                        {formatCurrency(originalEveningPrice)}
                      </span>
                      <div className="text-xl font-bold font-serif-display text-[#C6922E]">
                        {formatCurrency(eveningPrice)}
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold block">
                      Save {formatCurrency(originalEveningPrice - eveningPrice)}
                    </span>
                  </div>
                </div>

                {/* Overnight Accompaniment */}
                <div className="p-4 rounded-2xl bg-[#F8F6F1] border border-[#E6E1D8] flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-[#5F5A52] block font-medium">Overnight Stay</span>
                    <span className="text-xs text-[#8C827A]">Full Night (Star Hotel)</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#E6E1D8]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-[#8C827A] line-through font-medium">
                        {formatCurrency(originalOvernightPrice)}
                      </span>
                      <div className="text-xl font-bold font-serif-display text-[#C6922E]">
                        {formatCurrency(overnightPrice)}
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold block">
                      Save {formatCurrency(originalOvernightPrice - overnightPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Details Table */}
            <div className="rounded-3xl border border-[#E6E1D8] bg-white p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="font-serif-display text-xl font-bold text-[#171717]">
                Personal Specifications
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8]">
                  <span className="text-[#8C827A] block mb-0.5 text-[11px]">Age</span>
                  <span className="font-bold text-[#171717]">{profile.age} Years (18+)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8]">
                  <span className="text-[#8C827A] block mb-0.5 text-[11px]">Height</span>
                  <span className="font-bold text-[#171717]">{profile.height || '5 ft 5 in (165 cm)'}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8]">
                  <span className="text-[#8C827A] block mb-0.5 text-[11px]">Body Type</span>
                  <span className="font-bold text-[#171717]">{profile.bodyType || 'Slim & Toned'}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8]">
                  <span className="text-[#8C827A] block mb-0.5 text-[11px]">Ethnicity</span>
                  <span className="font-bold text-[#171717]">{profile.ethnicity || 'Indian'}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] col-span-2">
                  <span className="text-[#8C827A] block mb-0.5 text-[11px]">Spoken Languages</span>
                  <span className="font-bold text-[#171717]">
                    {profile.languages && profile.languages.length > 0
                      ? profile.languages.join(', ')
                      : 'English, Hindi, Telugu'}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] col-span-2">
                  <span className="text-[#8C827A] block mb-0.5 text-[11px]">Primary Area & City</span>
                  <span className="font-bold text-[#171717]">{locationDisplay}</span>
                </div>
              </div>
            </div>

            {/* Services Offered */}
            <div className="rounded-3xl border border-[#E6E1D8] bg-white p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif-display text-xl font-bold text-[#171717]">
                    Services & Occasions Offered
                  </h2>
                  <p className="text-xs text-[#5F5A52]">
                    Consensual adult companionship occasions provided by {profile.name}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {(profile.services && profile.services.length > 0
                  ? profile.services
                  : ['Dinner Companion', 'VIP Companionship', 'Corporate Social Escort', 'Hotel Suite Companion']
                ).map((srvName, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#C6922E] shrink-0" />
                      <span className="text-xs font-semibold text-[#171717]">{srvName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRequestService(profile)}
                      className="text-[11px] font-bold text-[#C6922E] hover:text-[#A8751F]"
                    >
                      Inquire
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* About Me / Bio */}
            <div className="rounded-3xl border border-[#E6E1D8] bg-white p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="font-serif-display text-xl font-bold text-[#171717]">
                About {profile.name}
              </h2>
              <div className="text-xs sm:text-sm text-[#5F5A52] leading-relaxed whitespace-pre-line space-y-3">
                {profile.bio || profile.description}
              </div>
            </div>

            {/* Booking Rules & Discretion Notice */}
            <div className="rounded-3xl border border-[#E6E1D8] bg-white p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-[#C6922E] font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-[#C6922E]" />
                <span>Booking Rules & Discretion Notice</span>
              </div>

              <ul className="space-y-2 text-xs text-[#5F5A52]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6922E] mt-1.5 shrink-0" />
                  <span><strong>18+ Consensual Adults Only:</strong> Both patron and companion must be 18 years of age or older.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6922E] mt-1.5 shrink-0" />
                  <span><strong>Mutual Respect & Hygiene:</strong> Gentlemanly decorum and spotless personal hygiene are strictly required. Disrespectful behavior terminates appointments immediately.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6922E] mt-1.5 shrink-0" />
                  <span><strong>Venue Protocols:</strong> Outcalls are accepted at star hotels (e.g. ITC Kohenur, Taj Krishna, Park Hyatt) and verified private residences.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6922E] mt-1.5 shrink-0" />
                  <span><strong>No Solicitations:</strong> Non-negotiable boundaries apply. All interactions are strictly private and confidential.</span>
                </li>
              </ul>
            </div>

            {/* Direct Inquiry Form */}
            <div className="rounded-3xl border border-[#E6E1D8] bg-white p-6 sm:p-8 shadow-xs space-y-5">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#C6922E] tracking-wider">
                  Confidential Booking
                </span>
                <h3 className="font-serif-display text-2xl font-bold text-[#171717]">
                  Send Direct Inquiry to {profile.name}
                </h3>
                <p className="text-xs text-[#5F5A52] mt-1">
                  Your inquiry is encrypted and sent directly without public records.
                </p>
              </div>

              {inquirySubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-[#171717] text-sm">Inquiry Transmitted Successfully</h4>
                  <p className="text-xs text-[#5F5A52]">
                    {profile.name} will respond confidentially to your provided contact within {profile.contactPlaceholder?.responseTime || '15 minutes'}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setInquirySubmitted(false)}
                    className="mt-3 text-xs text-[#C6922E] font-bold hover:underline"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuickInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5F5A52] mb-1">
                        Your Name / Preferred Title
                      </label>
                      <input
                        type="text"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="e.g. Mr. K"
                        className="w-full h-10 px-3.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#171717] focus:outline-none focus:border-[#C6922E]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#5F5A52] mb-1">
                        WhatsApp or Phone Number
                      </label>
                      <input
                        type="tel"
                        value={inquiryContact}
                        onChange={(e) => setInquiryContact(e.target.value)}
                        placeholder="+91 89993 84340"
                        className="w-full h-10 px-3.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#171717] focus:outline-none focus:border-[#C6922E]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5F5A52] mb-1">
                        Requested Date & Time
                      </label>
                      <input
                        type="text"
                        value={inquiryDate}
                        onChange={(e) => setInquiryDate(e.target.value)}
                        placeholder="Today evening / Tomorrow 8 PM"
                        className="w-full h-10 px-3.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#171717] focus:outline-none focus:border-[#C6922E]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#5F5A52] mb-1">
                        Preferred Occasion / Service
                      </label>
                      <select
                        value={inquiryService}
                        onChange={(e) => setInquiryService(e.target.value)}
                        className="w-full h-10 px-3.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#171717] focus:outline-none focus:border-[#C6922E]"
                      >
                        <option value="">Select an occasion…</option>
                        <option value="Dinner Companion">Dinner Companion</option>
                        <option value="VIP Companionship">VIP Companionship</option>
                        <option value="Hotel Suite Outcall">Hotel Suite Outcall</option>
                        <option value="Incall Appointment">Incall Appointment</option>
                        <option value="Overnight Companion">Overnight Companion</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#5F5A52] mb-1">
                      Venue Details & Notes (Hotel, Area in Hyderabad)
                    </label>
                    <textarea
                      value={inquiryNotes}
                      onChange={(e) => setInquiryNotes(e.target.value)}
                      rows={3}
                      placeholder="e.g. Staying at Banjara Hills star hotel; seeking pleasant company for dinner and drinks."
                      className="w-full p-3 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#171717] focus:outline-none focus:border-[#C6922E] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#C6922E] hover:bg-[#A8751F] text-[#171717] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs active:scale-98 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#171717]" />
                    <span>Submit Confidential Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Similar Companions in same Hyderabad Area */}
        {similarProfiles.length > 0 && (
          <div className="pt-10 border-t border-[#E6E1D8] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-display text-xl font-bold text-[#171717]">
                  Similar Companions in {profile.area || 'Hyderabad'}
                </h3>
                <p className="text-xs text-[#5F5A52]">
                  Discover more verified adult profiles nearby
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate(`/locations/${locationSlug}`)}
                className="text-xs font-bold text-[#C6922E] hover:text-[#A8751F] flex items-center gap-1 cursor-pointer"
              >
                <span>View All in {profile.area || 'Hyderabad'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProfiles.slice(0, 4).map((sim) => (
                <div
                  key={sim.id}
                  onClick={() => onNavigate(`/profiles/${sim.slug}`)}
                  className="rounded-2xl border border-[#E6E1D8] bg-white overflow-hidden hover:border-[#C6922E] transition-all cursor-pointer group shadow-2xs"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F3F0E9]">
                    <img
                      src={sim.coverImage || sim.avatar || (sim.images && sim.images[0])}
                      alt={sim.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-sm font-bold font-serif-display text-white">
                        {sim.name}, {sim.age}
                      </div>
                      <div className="text-[11px] text-stone-200">
                        {sim.area || sim.neighborhood} • {formatCurrency(sim.priceFrom || 10000)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Gallery Modal */}
      <GalleryModal
        isOpen={galleryOpen}
        images={galleryItems}
        initialIndex={activeImageIndex}
        onClose={() => setGalleryOpen(false)}
      />
    </div>
  );
}
