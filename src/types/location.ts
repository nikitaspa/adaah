export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  country: string;
  description: string;
  image: string;
  coverImage?: string;
  heroImage?: string;
  featured: boolean;
  profileCount: number;
  coordinates?: Coordinates;
  popularNeighborhoods?: string[];
  topCategories?: string[];
  seoTitle?: string;
  seoDescription?: string;
  postalCode?: string;
}
