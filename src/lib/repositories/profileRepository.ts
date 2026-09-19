import { mockProfiles } from '../../data/profiles';
import { PaginatedResponse, Profile, ProfileFilterParams } from '../../types';

export interface IProfileRepository {
  getProfiles(params?: ProfileFilterParams): Promise<PaginatedResponse<Profile>>;
  getAllProfiles(): Promise<Profile[]>;
  getFeaturedProfiles(limit?: number): Promise<Profile[]>;
  getProfileBySlug(slug: string): Promise<Profile | null>;
  getRelatedProfiles(profileId: string, limit?: number): Promise<Profile[]>;
  getProfilesByLocation(locationIdOrSlug: string): Promise<Profile[]>;
  getProfilesByCategory(categoryIdOrSlug: string): Promise<Profile[]>;
}

export class MockProfileRepository implements IProfileRepository {
  async getAllProfiles(): Promise<Profile[]> {
    return [...mockProfiles];
  }

  async getProfiles(params: ProfileFilterParams = {}): Promise<PaginatedResponse<Profile>> {
    await new Promise((resolve) => setTimeout(resolve, 60));

    let items = [...mockProfiles];

    // Filter by text query (name, headline, bio, location, area)
    if (params.query) {
      const q = params.query.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.area.toLowerCase().includes(q) ||
          (p.headline && p.headline.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q) ||
          p.services.some((s) => s.toLowerCase().includes(q))
      );
    }

    // Filter by location / area / city
    if (params.locationId && params.locationId !== 'all') {
      items = items.filter(
        (p) =>
          p.locationId === params.locationId ||
          p.area.toLowerCase().replace(/\s+/g, '-') === params.locationId.toLowerCase() ||
          p.slug.toLowerCase().includes(params.locationId.toLowerCase().replace('loc-', ''))
      );
    }

    if (params.area && params.area !== 'all') {
      const areaLower = params.area.toLowerCase();
      items = items.filter((p) => p.area.toLowerCase() === areaLower);
    }

    if (params.city && params.city !== 'all') {
      const cityLower = params.city.toLowerCase();
      items = items.filter((p) => p.city.toLowerCase() === cityLower);
    }

    // Filter by category
    if (params.categoryId && params.categoryId !== 'all') {
      items = items.filter(
        (p) =>
          (p.categoryIds && p.categoryIds.includes(params.categoryId!)) ||
          p.category.toLowerCase().replace(/\s+/g, '-') === params.categoryId!.toLowerCase()
      );
    }

    // Filter by availability
    if (params.availability) {
      items = items.filter((p) => p.availability.status === params.availability);
    }

    // Filter by age
    if (params.minAge !== undefined) {
      items = items.filter((p) => p.age >= params.minAge!);
    }
    if (params.maxAge !== undefined) {
      items = items.filter((p) => p.age <= params.maxAge!);
    }

    // Filter by price (INR)
    if (params.minPrice !== undefined) {
      items = items.filter((p) => p.priceFrom >= params.minPrice!);
    }
    if (params.maxPrice !== undefined) {
      items = items.filter((p) => p.priceFrom <= params.maxPrice!);
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
        items.sort((a, b) => b.age - a.age);
        break;
      case 'price_asc':
        items.sort((a, b) => a.priceFrom - b.priceFrom);
        break;
      case 'price_desc':
        items.sort((a, b) => b.priceFrom - a.priceFrom);
        break;
      case 'rating_desc':
        items.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'recommended':
      default:
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

  async getFeaturedProfiles(limit: number = 8): Promise<Profile[]> {
    await new Promise((resolve) => setTimeout(resolve, 40));
    return mockProfiles.filter((p) => p.featured).slice(0, limit);
  }

  async getProfileBySlug(slug: string): Promise<Profile | null> {
    await new Promise((resolve) => setTimeout(resolve, 50));
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
          (p.area === current.area || p.category === current.category)
      )
      .slice(0, limit);
  }

  async getProfilesByLocation(locationIdOrSlug: string): Promise<Profile[]> {
    await new Promise((resolve) => setTimeout(resolve, 40));
    const normalized = locationIdOrSlug.toLowerCase().replace(/^loc-/, '').replace(/\s+/g, '-');
    return mockProfiles.filter((p) => {
      const areaSlug = p.area.toLowerCase().replace(/\s+/g, '-');
      const locId = (p.locationId || '').toLowerCase().replace(/^loc-/, '');
      return areaSlug === normalized || locId === normalized || p.slug.includes(normalized);
    });
  }

  async getProfilesByCategory(categoryIdOrSlug: string): Promise<Profile[]> {
    await new Promise((resolve) => setTimeout(resolve, 40));
    const normalized = categoryIdOrSlug.toLowerCase().replace(/^cat-/, '').replace(/\s+/g, '-');
    return mockProfiles.filter((p) => {
      const catSlug = p.category.toLowerCase().replace(/\s+/g, '-');
      const catIds = (p.categoryIds || []).map((c) => c.toLowerCase().replace(/^cat-/, ''));
      return catSlug === normalized || catIds.includes(normalized);
    });
  }
}

export const profileRepository = new MockProfileRepository();
export const ProfileRepository = profileRepository;
