import React from 'react';
import { SEO_CONFIG } from '../../config/seo';
import { Profile } from '../../types';

export interface ProfileSchemaProps {
  profile: Profile;
}

export function ProfileSchema({ profile }: ProfileSchemaProps) {
  // Use strictly factual attributes intentionally published by the listing
  const profileUrl = `${SEO_CONFIG.siteUrl}/profiles/${profile.slug}`;
  const imageUrl = profile.coverImage || profile.avatar || (profile.images && profile.images[0]);
  const absoluteImageUrl = imageUrl
    ? imageUrl.startsWith('http')
      ? imageUrl
      : `${SEO_CONFIG.siteUrl}${imageUrl}`
    : SEO_CONFIG.defaultImage;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    description: profile.shortDescription || profile.headline || `${profile.name} listing on Adaah Hyderabad directory.`,
    image: absoluteImageUrl,
    url: profileUrl,
    homeLocation: {
      '@type': 'Place',
      name: `${profile.area || profile.neighborhood || 'Hyderabad'}, ${profile.city || 'Hyderabad'}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: profile.city || 'Hyderabad',
        addressRegion: 'Telangana',
        addressCountry: 'IN',
      },
    },
    knowsLanguage: profile.languages || ['English', 'Hindi', 'Telugu'],
    jobTitle: profile.category || 'Independent Adult Companion',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
