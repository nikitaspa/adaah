import { mockCategories } from '../../data/categories';
import { Category } from '../../types';

export interface ICategoryRepository {
  getCategories(): Promise<Category[]>;
  getAllCategories(): Promise<Category[]>;
  getFeaturedCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  getCategoryById(id: string): Promise<Category | null>;
}

export class MockCategoryRepository implements ICategoryRepository {
  async getCategories(): Promise<Category[]> {
    return [...mockCategories];
  }

  async getAllCategories(): Promise<Category[]> {
    return [...mockCategories];
  }

  async getFeaturedCategories(): Promise<Category[]> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return mockCategories.filter((cat) => cat.featured);
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    const category = mockCategories.find(
      (cat) => cat.slug === slug || cat.id === slug || cat.id === `cat-${slug}`
    );
    return category || null;
  }

  async getCategoryById(id: string): Promise<Category | null> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    const category = mockCategories.find((cat) => cat.id === id);
    return category || null;
  }
}

export const categoryRepository = new MockCategoryRepository();
export const CategoryRepository = categoryRepository;
