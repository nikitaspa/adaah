import React from 'react';
import { SEO_CONFIG } from '../../config/seo';

export interface ArticleSchemaProps {
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  url: string;
}

export function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  authorName = 'Adaah Editorial Board',
  url,
}: ArticleSchemaProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description: description || headline,
    image: image ? (image.startsWith('http') ? image : `${SEO_CONFIG.siteUrl}${image}`) : SEO_CONFIG.defaultImage,
    datePublished: datePublished || new Date().toISOString().split('T')[0],
    dateModified: dateModified || datePublished || new Date().toISOString().split('T')[0],
    author: {
      '@type': 'Organization',
      name: authorName,
      url: SEO_CONFIG.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      logo: {
        '@type': 'ImageObject',
        url: SEO_CONFIG.organization.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
