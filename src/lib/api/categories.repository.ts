import { mockCategories } from '../../data/categories';
import { Category } from '../../types';

export interface ICategoryRepository {
  getCategories(): Promise<Category[]>;
  getFeaturedCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  getCategoryById(id: string): Promise<Category | null>;
}

export class MockCategoryRepository implements ICategoryRepository {
  async getCategories(): Promise<Category[]> {
    return [...mockCategories];
  }

  async getFeaturedCategories(): Promise<Category[]> {
    return mockCategories.filter((c) => c.featured);
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return mockCategories.find((c) => c.slug === slug) || null;
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return mockCategories.find((c) => c.id === id) || null;
  }
}

export const categoryRepository: ICategoryRepository = new MockCategoryRepository();
