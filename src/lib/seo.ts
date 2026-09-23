import { SEO_CONFIG } from '../config/seo';

export interface SEOData {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  noindex?: boolean;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
}

/**
 * Creates a clean, absolute canonical URL with lowercase path and no trailing slashes.
 */
export function createCanonicalUrl(path: string = '/'): string {
  // Strip trailing slashes except for root
  let cleanPath = path.trim().toLowerCase();
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }
  // Strip query parameters to prevent parameter duplicate URLs
  const pathWithoutQuery = cleanPath.split('?')[0] || '/';
  
  return `${SEO_CONFIG.siteUrl}${pathWithoutQuery === '/' ? '' : pathWithoutQuery}`;
}

/**
 * Formats a title using the central site title template.
 */
export function formatTitle(title?: string): string {
  if (!title || title === SEO_CONFIG.defaultTitle) {
    return SEO_CONFIG.defaultTitle;
  }
  if (title.includes('| Adaah') || title.includes('— Adaah')) {
    return title;
  }
  return SEO_CONFIG.titleTemplate.replace('%s', title);
}

/**
 * Creates page metadata object for any route.
 */
export function createPageMetadata(data: SEOData = {}): SEOData {
  const canonical = data.canonical || createCanonicalUrl('/');
  const title = formatTitle(data.title);
  const description = data.description || SEO_CONFIG.defaultDescription;
  const image = data.image || SEO_CONFIG.defaultImage;

  return {
    title,
    description,
    canonical,
    image,
    noindex: !!data.noindex,
    type: data.type || 'website',
    publishedTime: data.publishedTime,
    modifiedTime: data.modifiedTime,
    keywords: data.keywords || [
      'Adaah',
      'Hyderabad private directory',
      'Hyderabad companions',
      'Banjara Hills companions',
      'Jubilee Hills companions',
      '18+ verified directory',
      'discreet companionship Hyderabad',
    ],
  };
}

/**
 * Helper for location pages metadata.
 */
export function createLocationMetadata(locationName: string, description?: string): SEOData {
  const title = `${locationName} 18+ Private Directory | Adaah`;
  const metaDescription =
    description ||
    `Explore verified 18+ private companion listings and local information in ${locationName}, Hyderabad. Transparent guidelines and discreet arrangements.`;

  return createPageMetadata({
    title,
    description: metaDescription,
    canonical: createCanonicalUrl(`/locations/${locationName.toLowerCase().replace(/\s+/g, '-')}`),
    keywords: [
      `${locationName.toLowerCase()} companions`,
      `${locationName.toLowerCase()} 18+ directory`,
      `private directory ${locationName} hyderabad`,
      `companions in ${locationName}`,
    ],
  });
}

/**
 * Helper for profile detail pages metadata (strictly non-explicit).
 */
export function createProfileMetadata(profileName: string, slug: string, location?: string, age?: number): SEOData {
  const title = `${profileName} | Hyderabad 18+ Directory | Adaah`;
  const locationStr = location ? ` in ${location}, Hyderabad` : ' in Hyderabad';
  const ageStr = age ? `, age ${age}` : '';
  const description = `View portfolio, location, availability and confidential inquiry options for ${profileName}${ageStr}${locationStr} on Adaah directory.`;

  return createPageMetadata({
    title,
    description,
    canonical: createCanonicalUrl(`/profiles/${slug}`),
    type: 'profile',
  });
}

/**
 * Helper for category pages metadata.
 */
export function createCategoryMetadata(categoryName: string, slug: string, description?: string): SEOData {
  const title = `${categoryName} in Hyderabad | Adaah`;
  const metaDescription =
    description ||
    `Explore verified 18+ independent companion listings categorized under ${categoryName} in Hyderabad with transparent rate guidelines.`;

  return createPageMetadata({
    title,
    description: metaDescription,
    canonical: createCanonicalUrl(`/categories/${slug}`),
  });
}

/**
 * Helper for service pages metadata.
 */
export function createServiceMetadata(serviceName: string, slug: string, description?: string): SEOData {
  const title = `${serviceName} in Hyderabad | Adaah`;
  const metaDescription =
    description ||
    `Explore verified adult companion options and occasion benchmarks for ${serviceName} in Hyderabad.`;

  return createPageMetadata({
    title,
    description: metaDescription,
    canonical: createCanonicalUrl(`/services/${slug}`),
  });
}

/**
 * Helper for guide/editorial pages metadata.
 */
export function createGuideMetadata(
  guideTitle: string,
  slug: string,
  summary?: string,
  publishedDate?: string,
  modifiedDate?: string
): SEOData {
  const title = `${guideTitle} | Adaah`;
  const description =
    summary || `Read comprehensive field guidance, safety tips, and discretion protocols on ${guideTitle}.`;

  return createPageMetadata({
    title,
    description,
    canonical: createCanonicalUrl(`/guides/${slug}`),
    type: 'article',
    publishedTime: publishedDate,
    modifiedTime: modifiedDate,
  });
}

/**
 * Helper to determine if a URL with query parameters should be noindexed.
 */
export function shouldNoindexQuery(queryString: string): boolean {
  if (!queryString) return false;
  const params = new URLSearchParams(queryString);
  // Allow simple search query or page if it's main, but noindex complex parameter combinations
  const allowedKeys = ['q'];
  for (const key of Array.from(params.keys())) {
    if (!allowedKeys.includes(key) || key === 'sort' || key === 'price' || key === 'categoryId' || key === 'locationId') {
      return true;
    }
  }
  return false;
}
