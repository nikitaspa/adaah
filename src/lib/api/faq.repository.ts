import { mockFaqs } from '../../data/faq';
import { FAQ } from '../../types';

export interface IFaqRepository {
  getFaqs(category?: string, query?: string): Promise<FAQ[]>;
  getCategories(): Promise<string[]>;
}

export class MockFaqRepository implements IFaqRepository {
  async getFaqs(category?: string, query?: string): Promise<FAQ[]> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    let items = [...mockFaqs];

    if (category && category !== 'All') {
      items = items.filter((f) => f.category === category);
    }

    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      items = items.filter(
        (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
      );
    }

    return items;
  }

  async getCategories(): Promise<string[]> {
    return ['All', 'General', 'Booking & Payments', 'Trust & Verification', 'For Service Providers'];
  }
}

export const faqRepository: IFaqRepository = new MockFaqRepository();
