import { mockServices } from '../../data/services';
import { Service } from '../../types';

export interface IServiceRepository {
  getServices(): Promise<Service[]>;
  getAllServices(): Promise<Service[]>;
  getPopularServices(): Promise<Service[]>;
  getServiceBySlug(slug: string): Promise<Service | null>;
  getServiceById(id: string): Promise<Service | null>;
  getServicesByCategory(categoryId: string): Promise<Service[]>;
}

export class MockServiceRepository implements IServiceRepository {
  async getServices(): Promise<Service[]> {
    return [...mockServices];
  }

  async getAllServices(): Promise<Service[]> {
    return [...mockServices];
  }

  async getPopularServices(): Promise<Service[]> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return mockServices.filter((s) => s.popular);
  }

  async getServiceBySlug(slug: string): Promise<Service | null> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    const service = mockServices.find(
      (s) => s.slug === slug || s.id === slug || s.id === `srv-${slug}`
    );
    return service || null;
  }

  async getServiceById(id: string): Promise<Service | null> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    const service = mockServices.find((s) => s.id === id);
    return service || null;
  }

  async getServicesByCategory(categoryId: string): Promise<Service[]> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return mockServices.filter((s) => s.categoryId === categoryId);
  }
}

export const serviceRepository = new MockServiceRepository();
export const ServiceRepository = serviceRepository;
