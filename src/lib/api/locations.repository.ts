import { mockLocations } from '../../data/locations';
import { Location } from '../../types';

export interface ILocationRepository {
  getLocations(): Promise<Location[]>;
  getFeaturedLocations(): Promise<Location[]>;
  getLocationBySlug(slug: string): Promise<Location | null>;
  getLocationById(id: string): Promise<Location | null>;
  getNearbyLocations(locationId: string, limit?: number): Promise<Location[]>;
}

export class MockLocationRepository implements ILocationRepository {
  async getLocations(): Promise<Location[]> {
    return [...mockLocations];
  }

  async getFeaturedLocations(): Promise<Location[]> {
    return mockLocations.filter((l) => l.featured);
  }

  async getLocationBySlug(slug: string): Promise<Location | null> {
    return mockLocations.find((l) => l.slug === slug) || null;
  }

  async getLocationById(id: string): Promise<Location | null> {
    return mockLocations.find((l) => l.id === id) || null;
  }

  async getNearbyLocations(locationId: string, limit: number = 3): Promise<Location[]> {
    return mockLocations.filter((l) => l.id !== locationId).slice(0, limit);
  }
}

export const locationRepository: ILocationRepository = new MockLocationRepository();
