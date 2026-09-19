export interface Category {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  description: string;
  shortDescription: string;
  featured: boolean;
  profileCount: number;
  serviceCount: number;
  coverImage: string;
  seoTitle?: string;
  seoDescription?: string;
}
