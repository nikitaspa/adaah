import { mockProfiles } from '../../data/profiles';
import { PaginatedResponse, Profile, ProfileFilterParams } from '../../types';

export interface IProfileRepository {
  getProfiles(params?: ProfileFilterParams): Promise<PaginatedResponse<Profile>>;
  getFeaturedProfiles(limit?: number): Promise<Profile[]>;
  getProfileBySlug(slug: string): Promise<Profile | null>;
  getRelatedProfiles(profileId: string, limit?: number): Promise<Profile[]>;
  getProfilesByLocation(locationId: string): Promise<Profile[]>;
  getProfilesByCategory(categoryId: string): Promise<Profile[]>;
}

export class MockProfileRepository implements IProfileRepository {
  async getProfiles(params: ProfileFilterParams = {}): Promise<PaginatedResponse<Profile>> {
    // Simulating realistic asynchronous client/server repository latency
    await new Promise((resolve) => setTimeout(resolve, 80));

    let items = [...mockProfiles];

    // Filter by text query (name, headline, bio, location)
    if (params.query) {
      const q = params.query.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.headline.toLowerCase().includes(q) ||
          p.locationName.toLowerCase().includes(q) ||
          p.categoryNames.some((c) => c.toLowerCase().includes(q)) ||
          p.serviceNames.some((s) => s.toLowerCase().includes(q))
      );
    }

    // Filter by location
    if (params.locationId && params.locationId !== 'all') {
      items = items.filter((p) => p.locationId === params.locationId);
    }

    // Filter by city
    if (params.city && params.city !== 'all') {
      const cityLower = params.city.toLowerCase();
      items = items.filter(
        (p) => p.city.toLowerCase() === cityLower || p.locationName.toLowerCase() === cityLower
      );
    }

    // Filter by category
    if (params.categoryId && params.categoryId !== 'all') {
      items = items.filter((p) => p.categoryIds.includes(params.categoryId!));
    }

    // Filter by service
    if (params.serviceId && params.serviceId !== 'all') {
      items = items.filter((p) => p.serviceIds.includes(params.serviceId!));
    }

    // Filter by availability
    if (params.availability && params.availability !== undefined) {
      items = items.filter((p) => p.availability.status === params.availability);
    }

    // Filter by age
    if (params.minAge !== undefined) {
      items = items.filter((p) => p.age >= params.minAge!);
    }
    if (params.maxAge !== undefined) {
      items = items.filter((p) => p.age <= params.maxAge!);
    }

    // Filter by price
    if (params.minPrice !== undefined) {
      items = items.filter((p) => p.pricing.startingPrice >= params.minPrice!);
    }
    if (params.maxPrice !== undefined) {
      items = items.filter((p) => p.pricing.startingPrice <= params.maxPrice!);
    }

    // Filter by minimum rating
    if (params.minRating !== undefined && params.minRating > 0) {
      items = items.filter((p) => p.rating >= params.minRating!);
    }

    // Filter by language
    if (params.language && params.language !== 'all') {
      items = items.filter((p) => p.languages.includes(params.language!));
    }

    // Filter verified only
    if (params.verifiedOnly) {
      items = items.filter((p) => p.verified);
    }

    // Sorting
    switch (params.sortBy) {
      case 'newest':
        // Sort by experience or reverse id for demonstration
        items.sort((a, b) => b.yearsOfExperience - a.yearsOfExperience);
        break;
      case 'price_asc':
        items.sort((a, b) => a.pricing.startingPrice - b.pricing.startingPrice);
        break;
      case 'price_desc':
        items.sort((a, b) => b.pricing.startingPrice - a.pricing.startingPrice);
        break;
      case 'rating_desc':
        items.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'recommended':
      default:
        // Featured first, then highest ratings
        items.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    const page = params.page || 1;
    const limit = params.limit || 8;
    const total = items.length;
    const startIndex = (page - 1) * limit;
    const paginatedItems = items.slice(startIndex, startIndex + limit);
    const lastPage = Math.max(1, Math.ceil(total / limit));

    return {
      data: paginatedItems,
      meta: {
        currentPage: page,
        lastPage,
        perPage: limit,
        total,
      },
      links: {
        first: `?page=1`,
        last: `?page=${lastPage}`,
        prev: page > 1 ? `?page=${page - 1}` : null,
        next: page < lastPage ? `?page=${page + 1}` : null,
      },
    };
  }

  async getFeaturedProfiles(limit: number = 6): Promise<Profile[]> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return mockProfiles
      .filter((p) => p.featured)
      .slice(0, limit);
  }

  async getProfileBySlug(slug: string): Promise<Profile | null> {
    await new Promise((resolve) => setTimeout(resolve, 60));
    const profile = mockProfiles.find((p) => p.slug === slug);
    return profile || null;
  }

  async getRelatedProfiles(profileId: string, limit: number = 3): Promise<Profile[]> {
    await new Promise((resolve) => setTimeout(resolve, 40));
    const current = mockProfiles.find((p) => p.id === profileId);
    if (!current) return mockProfiles.slice(0, limit);

    return mockProfiles
      .filter(
        (p) =>
          p.id !== profileId &&
          (p.locationId === current.locationId ||
            p.categoryIds.some((cid) => current.categoryIds.includes(cid)))
      )
      .slice(0, limit);
  }

  async getProfilesByLocation(locationId: string): Promise<Profile[]> {
    await new Promise((resolve) => setTimeout(resolve, 40));
    return mockProfiles.filter((p) => p.locationId === locationId);
  }

  async getProfilesByCategory(categoryId: string): Promise<Profile[]> {
    await new Promise((resolve) => setTimeout(resolve, 40));
    return mockProfiles.filter((p) => p.categoryIds.includes(categoryId));
  }
}

// Singleton repository instance — easily swappable with LaravelApiClient in production
export const profileRepository: IProfileRepository = new MockProfileRepository();
