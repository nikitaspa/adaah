import { mockLocations } from '../../data/locations';
import { Location } from '../../types';

export interface ILocationRepository {
  getLocations(): Promise<Location[]>;
  getAllLocations(): Promise<Location[]>;
  getPopularLocations(limit?: number): Promise<Location[]>;
  getFeaturedLocations(): Promise<Location[]>;
  getLocationBySlug(slug: string): Promise<Location | null>;
  getLocationById(id: string): Promise<Location | null>;
  getNearbyLocations(locationId: string, limit?: number): Promise<Location[]>;
}

export class MockLocationRepository implements ILocationRepository {
  async getLocations(): Promise<Location[]> {
    return [...mockLocations];
  }

  async getAllLocations(): Promise<Location[]> {
    return [...mockLocations];
  }

  async getPopularLocations(limit: number = 9): Promise<Location[]> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    // Prioritize the 9 primary Hyderabad locations
    const primarySlugs = [
      'banjara-hills',
      'jubilee-hills',
      'gachibowli',
      'hitech-city',
      'madhapur',
      'kondapur',
      'begumpet',
      'secunderabad',
      'somajiguda',
    ];

    const popular = mockLocations.filter((loc) => primarySlugs.includes(loc.slug));
    const others = mockLocations.filter((loc) => !primarySlugs.includes(loc.slug));

    return [...popular, ...others].slice(0, limit);
  }

  async getFeaturedLocations(): Promise<Location[]> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return mockLocations.filter((loc) => loc.featured);
  }

  async getLocationBySlug(slug: string): Promise<Location | null> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    const location = mockLocations.find(
      (loc) => loc.slug === slug || loc.id === slug || loc.id === `loc-${slug}`
    );
    return location || null;
  }

  async getLocationById(id: string): Promise<Location | null> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    const location = mockLocations.find((loc) => loc.id === id);
    return location || null;
  }

  async getNearbyLocations(locationId: string, limit: number = 3): Promise<Location[]> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return mockLocations.filter((loc) => loc.id !== locationId).slice(0, limit);
  }
}

export const locationRepository = new MockLocationRepository();
export const LocationRepository = locationRepository;
