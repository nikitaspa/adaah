import React from 'react';
import { SEO_CONFIG } from '../../config/seo';

export function OrganizationSchema() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_CONFIG.organization.name,
    url: SEO_CONFIG.organization.url,
    logo: SEO_CONFIG.organization.logo,
    description: SEO_CONFIG.organization.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SEO_CONFIG.organization.address.addressLocality,
      addressRegion: SEO_CONFIG.organization.address.addressRegion,
      addressCountry: SEO_CONFIG.organization.address.addressCountry,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SEO_CONFIG.organization.contactPoint.telephone,
      contactType: SEO_CONFIG.organization.contactPoint.contactType,
      areaServed: SEO_CONFIG.organization.contactPoint.areaServed,
      availableLanguage: SEO_CONFIG.organization.contactPoint.availableLanguage,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
