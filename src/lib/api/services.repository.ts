import { mockServices } from '../../data/services';
import { Service } from '../../types';

export interface IServiceRepository {
  getServices(categoryId?: string): Promise<Service[]>;
  getPopularServices(): Promise<Service[]>;
  getServiceBySlug(slug: string): Promise<Service | null>;
  getServiceById(id: string): Promise<Service | null>;
  getRelatedServices(serviceId: string, limit?: number): Promise<Service[]>;
}

export class MockServiceRepository implements IServiceRepository {
  async getServices(categoryId?: string): Promise<Service[]> {
    if (categoryId && categoryId !== 'all') {
      return mockServices.filter((s) => s.categoryId === categoryId);
    }
    return [...mockServices];
  }

  async getPopularServices(): Promise<Service[]> {
    return mockServices.filter((s) => s.popular);
  }

  async getServiceBySlug(slug: string): Promise<Service | null> {
    return mockServices.find((s) => s.slug === slug) || null;
  }

  async getServiceById(id: string): Promise<Service | null> {
    return mockServices.find((s) => s.id === id) || null;
  }

  async getRelatedServices(serviceId: string, limit: number = 3): Promise<Service[]> {
    const current = mockServices.find((s) => s.id === serviceId);
    if (!current) return mockServices.slice(0, limit);
    return mockServices
      .filter((s) => s.id !== serviceId && s.categoryId === current.categoryId)
      .slice(0, limit);
  }
}

export const serviceRepository: IServiceRepository = new MockServiceRepository();
