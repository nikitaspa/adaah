// Repository abstractions providing decoupling between views and data source (Mock or Laravel REST API)
import { profileRepository, IProfileRepository } from '../api/profiles.repository';
import { locationRepository, ILocationRepository } from '../api/locations.repository';
import { categoryRepository, ICategoryRepository } from '../api/categories.repository';
import { serviceRepository, IServiceRepository } from '../api/services.repository';
import { bookingRepository, IBookingRepository } from '../api/booking.repository';
import { blogRepository, IBlogRepository } from '../api/blog.repository';
import { faqRepository, IFaqRepository } from '../api/faq.repository';
import { searchRepository, ISearchRepository } from '../api/search.repository';

export type {
  IProfileRepository,
  ILocationRepository,
  ICategoryRepository,
  IServiceRepository,
  IBookingRepository,
  IBlogRepository,
  IFaqRepository,
  ISearchRepository,
};

// Aliases matching prompt's naming
export const ProfileRepository = profileRepository;
export const LocationRepository = locationRepository;
export const CategoryRepository = categoryRepository;
export const ServiceRepository = serviceRepository;
export const InquiryRepository = bookingRepository;
export const GuideRepository = blogRepository;
export const FaqRepository = faqRepository;
export const SearchRepository = searchRepository;
