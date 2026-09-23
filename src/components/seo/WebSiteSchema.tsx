import React from 'react';
import { SEO_CONFIG } from '../../config/seo';

export function WebSiteSchema() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    description: SEO_CONFIG.defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SEO_CONFIG.siteUrl}/profiles?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
