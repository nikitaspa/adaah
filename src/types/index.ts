export * from './location';
export * from './profile';
export * from './category';
export * from './service';
export * from './inquiry';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category:
    | 'General'
    | 'Booking & Discretion'
    | 'Verification & Safety'
    | 'For Companions'
    | 'Etiquette'
    | 'Booking & Payments'
    | 'Trust & Verification'
    | 'For Service Providers';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  category: string;
}

export type Guide = BlogPost;

export interface SearchSuggestionItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'profile' | 'location' | 'category' | 'service';
  slug: string;
  url: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

/**
 * Future Laravel REST API Contracts
 * Endpoints:
 * - GET  /api/profiles
 * - GET  /api/profiles/{slug}
 * - GET  /api/locations
 * - GET  /api/locations/{slug}
 * - GET  /api/categories
 * - GET  /api/categories/{slug}
 * - GET  /api/services
 * - GET  /api/services/{slug}
 * - POST /api/inquiries
 */
export interface LaravelApiSuccessResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface LaravelApiPaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
