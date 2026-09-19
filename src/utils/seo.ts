import { siteConfig } from '../config/site';

export interface SeoMetadata {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  keywords?: string[];
  structuredData?: Record<string, unknown>;
}

export function generateSeoMetadata(params: Partial<SeoMetadata>): SeoMetadata {
  const fullTitle = params.title
    ? siteConfig.seo.titleTemplate.replace('%s', params.title)
    : siteConfig.seo.defaultTitle;

  return {
    title: fullTitle,
    description: params.description || siteConfig.seo.defaultDescription,
    canonicalUrl: params.canonicalUrl || siteConfig.url,
    ogType: params.ogType || 'website',
    ogImage: params.ogImage || siteConfig.ogImage,
    keywords: params.keywords || siteConfig.seo.keywords,
    structuredData: params.structuredData,
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateProfileSchema(profile: {
  name: string;
  headline: string;
  rating: number;
  reviewCount: number;
  locationName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: profile.name,
    description: profile.headline,
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.locationName,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: profile.rating,
      reviewCount: profile.reviewCount,
    },
  };
}
