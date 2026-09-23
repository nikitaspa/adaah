import React from 'react';
import { SEO_CONFIG } from '../../config/seo';
import { BreadcrumbItem } from './Breadcrumbs';

export interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const allItems: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, ...items];

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${SEO_CONFIG.siteUrl}${item.href === '/' ? '' : item.href}` : SEO_CONFIG.siteUrl,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
