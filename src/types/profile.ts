import { Coordinates } from './location';

export type AvailabilityStatus = 'Available' | 'Busy' | 'By Appointment' | 'Away';

export interface AvailabilityDetails {
  status: AvailabilityStatus;
  scheduleSummary: string;
  daysAvailable: string[];
  workingHours: string;
  nextAvailableSlot?: string;
  acceptingNewClients: boolean;
}

export type Availability = AvailabilityDetails;

export interface Review {
  id: string;
  author: string;
  authorAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  serviceUsed: string;
  verifiedBooking: boolean;
}

export interface PricingPackage {
  title: string;
  price: number;
  unit: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface Pricing {
  startingPrice: number;
  rateUnit: string;
  currency: string;
  customQuoteAvailable: boolean;
  packages: PricingPackage[];
}

export interface Profile {
  id: string;
  slug: string;
  name: string;
  age: number;
  city: string; // "Hyderabad"
  area: string; // e.g. "Banjara Hills"
  state: string; // "Telangana"
  country: string; // "India"
  category: string;
  languages: string[];
  availability: AvailabilityDetails;
  verified: boolean;
  priceFrom: number;
  priceTo: number;
  currency: string; // "INR"
  images: string[];
  description: string;
  services: string[];
  rating: number;
  reviewCount: number;

  // Additional detail view / UI helper fields
  headline?: string;
  bio?: string;
  shortDescription?: string;
  avatar?: string;
  coverImage?: string;
  locationId?: string;
  locationName?: string;
  locationSlug?: string;
  neighborhood?: string;
  coordinates?: Coordinates;
  categoryIds?: string[];
  categoryNames?: string[];
  serviceIds?: string[];
  serviceNames?: string[];
  pricing?: Pricing;
  badges?: string[];
  yearsOfExperience?: number;
  height?: string;
  bodyType?: string;
  ethnicity?: string;
  whatsapp?: string;
  telegram?: string;
  phone?: string;
  bookingRules?: string[];
  rates?: {
    hourly?: number;
    evening?: number;
    overnight?: number;
    weekend?: number;
  };
  gallery?: {
    id: string;
    url: string;
    caption: string;
  }[];
  contactPlaceholder?: {
    emailMasked: string;
    phoneMasked: string;
    responseTime: string;
  };
  galleryImages?: {
    id: string;
    url: string;
    caption: string;
  }[];
  reviews?: Review[];
  faqs?: { question: string; answer: string }[];
  featured?: boolean;
}

export type SortOption =
  | 'recommended'
  | 'newest'
  | 'price_asc'
  | 'price_desc'
  | 'rating_desc';

export interface ProfileFilterParams {
  query?: string;
  locationId?: string;
  location?: string;
  area?: string;
  city?: string;
  categoryId?: string;
  category?: string;
  serviceId?: string;
  availability?: AvailabilityStatus;
  minPrice?: number;
  maxPrice?: number;
  minAge?: number;
  maxAge?: number;
  minRating?: number;
  language?: string;
  verifiedOnly?: boolean;
  sortBy?: SortOption;
  page?: number;
  limit?: number;
}
