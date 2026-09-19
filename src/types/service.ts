export interface Service {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  categoryName: string;
  shortDescription: string;
  description: string;
  typicalDuration: string;
  priceEstimate: string;
  whatToExpect: string[];
  popular: boolean;
  profileCount: number;
  coverImage: string;
  faqs: { question: string; answer: string }[];
}
