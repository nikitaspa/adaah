import { mockCategories } from '../../data/categories';
import { mockLocations } from '../../data/locations';
import { mockProfiles } from '../../data/profiles';
import { mockServices } from '../../data/services';
import { SearchSuggestionItem } from '../../types';

export interface GlobalSearchResult {
  query: string;
  profiles: typeof mockProfiles;
  locations: typeof mockLocations;
  categories: typeof mockCategories;
  services: typeof mockServices;
  totalMatches: number;
}

export interface ISearchRepository {
  getSuggestions(query: string, limit?: number): Promise<SearchSuggestionItem[]>;
  searchGlobal(query: string): Promise<GlobalSearchResult>;
  getPopularSearches(): Promise<string[]>;
}

export class MockSearchRepository implements ISearchRepository {
  async getSuggestions(query: string, limit: number = 8): Promise<SearchSuggestionItem[]> {
    if (!query || query.trim().length < 1) return [];
    await new Promise((resolve) => setTimeout(resolve, 30));

    const q = query.toLowerCase().trim();
    const suggestions: SearchSuggestionItem[] = [];

    // Check Locations
    for (const loc of mockLocations) {
      if (
        loc.name.toLowerCase().includes(q) ||
        loc.city.toLowerCase().includes(q) ||
        loc.popularNeighborhoods.some((n) => n.toLowerCase().includes(q))
      ) {
        suggestions.push({
          id: `loc-${loc.id}`,
          title: loc.name,
          subtitle: `Location · ${loc.city}, ${loc.state} (${loc.profileCount} profiles)`,
          type: 'location',
          slug: loc.slug,
          url: `/locations/${loc.slug}`,
        });
      }
    }

    // Check Categories
    for (const cat of mockCategories) {
      if (cat.name.toLowerCase().includes(q) || cat.description.toLowerCase().includes(q)) {
        suggestions.push({
          id: `cat-${cat.id}`,
          title: cat.name,
          subtitle: `Category · ${cat.profileCount} verified specialists`,
          type: 'category',
          slug: cat.slug,
          url: `/categories/${cat.slug}`,
        });
      }
    }

    // Check Services
    for (const srv of mockServices) {
      if (srv.name.toLowerCase().includes(q) || srv.shortDescription.toLowerCase().includes(q)) {
        suggestions.push({
          id: `srv-${srv.id}`,
          title: srv.name,
          subtitle: `Service in ${srv.categoryName}`,
          type: 'service',
          slug: srv.slug,
          url: `/services/${srv.slug}`,
        });
      }
    }

    // Check Profiles
    for (const prof of mockProfiles) {
      if (
        prof.name.toLowerCase().includes(q) ||
        prof.headline.toLowerCase().includes(q) ||
        prof.languages.some((l) => l.toLowerCase().includes(q))
      ) {
        suggestions.push({
          id: `prof-${prof.id}`,
          title: prof.name,
          subtitle: `${prof.headline} · ${prof.locationName}`,
          type: 'profile',
          slug: prof.slug,
          url: `/profiles/${prof.slug}`,
        });
      }
    }

    return suggestions.slice(0, limit);
  }

  async searchGlobal(query: string): Promise<GlobalSearchResult> {
    await new Promise((resolve) => setTimeout(resolve, 80));
    const q = query.toLowerCase().trim();

    if (!q) {
      return {
        query: '',
        profiles: [],
        locations: [],
        categories: [],
        services: [],
        totalMatches: 0,
      };
    }

    const profiles = mockProfiles.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.headline.toLowerCase().includes(q) ||
        p.bio.toLowerCase().includes(q) ||
        p.locationName.toLowerCase().includes(q) ||
        p.categoryNames.some((c) => c.toLowerCase().includes(q)) ||
        p.serviceNames.some((s) => s.toLowerCase().includes(q))
    );

    const locations = mockLocations.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.popularNeighborhoods.some((n) => n.toLowerCase().includes(q)) ||
        l.description.toLowerCase().includes(q)
    );

    const categories = mockCategories.filter(
      (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );

    const services = mockServices.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.categoryName.toLowerCase().includes(q)
    );

    const totalMatches = profiles.length + locations.length + categories.length + services.length;

    return {
      query,
      profiles,
      locations,
      categories,
      services,
      totalMatches,
    };
  }

  async getPopularSearches(): Promise<string[]> {
    return [
      'Residential Architecture',
      'San Francisco Bay Area',
      'Estate Planning & Living Trust',
      'Somatic Bodywork',
      'Private Chef Tasting',
      'Bespoke Tailoring',
      'Seattle Metro',
    ];
  }
}

export const searchRepository: ISearchRepository = new MockSearchRepository();
