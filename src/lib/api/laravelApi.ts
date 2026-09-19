/**
 * Laravel REST API Endpoints Contract
 * 
 * Future Laravel integration layer:
 * When ready to connect to Laravel backend, replace Mock repositories with 
 * a LaravelApiClient implementation implementing IProfileRepository, 
 * ILocationRepository, ICategoryRepository, and IServiceRepository.
 * 
 * Target Laravel Endpoints:
 * - GET  /api/profiles           -> List all profiles with filtering (location, category, price, etc.)
 * - GET  /api/profiles/{slug}    -> Single profile details with reviews & gallery
 * - GET  /api/locations          -> List all 30 Hyderabad locations with companion counts
 * - GET  /api/locations/{slug}   -> Single location details with companions
 * - GET  /api/categories         -> List all categories
 * - GET  /api/categories/{slug}  -> Single category details with companions
 * - GET  /api/services           -> List all companionship services
 * - GET  /api/services/{slug}    -> Single service details
 * - POST /api/inquiries          -> Submit booking / inquiry request
 */

import { Inquiry } from '../../types';

export interface LaravelApiConfig {
  baseUrl: string;
  apiToken?: string;
  timeout?: number;
}

export class LaravelApiClient {
  private baseUrl: string;

  constructor(config?: Partial<LaravelApiConfig>) {
    const defaultUrl = (import.meta as unknown as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL || 'http://localhost:8000/api';
    this.baseUrl = config?.baseUrl || defaultUrl;
  }

  // Prepared methods for when backend is connected
  async getProfiles(params?: Record<string, any>) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${this.baseUrl}/profiles?${query}`);
    return res.json();
  }

  async getProfile(slug: string) {
    const res = await fetch(`${this.baseUrl}/profiles/${slug}`);
    return res.json();
  }

  async getLocations() {
    const res = await fetch(`${this.baseUrl}/locations`);
    return res.json();
  }

  async getLocation(slug: string) {
    const res = await fetch(`${this.baseUrl}/locations/${slug}`);
    return res.json();
  }

  async getCategories() {
    const res = await fetch(`${this.baseUrl}/categories`);
    return res.json();
  }

  async getCategory(slug: string) {
    const res = await fetch(`${this.baseUrl}/categories/${slug}`);
    return res.json();
  }

  async getServices() {
    const res = await fetch(`${this.baseUrl}/services`);
    return res.json();
  }

  async getService(slug: string) {
    const res = await fetch(`${this.baseUrl}/services/${slug}`);
    return res.json();
  }

  async submitInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) {
    const res = await fetch(`${this.baseUrl}/inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(inquiry),
    });
    return res.json();
  }
}
