import { mockBlogPosts } from '../../data/blog';
import { BlogPost } from '../../types';

export interface IBlogRepository {
  getBlogPosts(category?: string): Promise<BlogPost[]>;
  getFeaturedPost(): Promise<BlogPost | null>;
  getPostBySlug(slug: string): Promise<BlogPost | null>;
  getRelatedPosts(postId: string, limit?: number): Promise<BlogPost[]>;
}

export class MockBlogRepository implements IBlogRepository {
  async getBlogPosts(category?: string): Promise<BlogPost[]> {
    await new Promise((resolve) => setTimeout(resolve, 40));
    if (category && category !== 'all') {
      return mockBlogPosts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    return [...mockBlogPosts];
  }

  async getFeaturedPost(): Promise<BlogPost | null> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return mockBlogPosts[0] || null;
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    await new Promise((resolve) => setTimeout(resolve, 40));
    return mockBlogPosts.find((p) => p.slug === slug) || null;
  }

  async getRelatedPosts(postId: string, limit: number = 2): Promise<BlogPost[]> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return mockBlogPosts.filter((p) => p.id !== postId).slice(0, limit);
  }
}

export const blogRepository: IBlogRepository = new MockBlogRepository();
