import React, { useEffect } from 'react';
import { SEO_CONFIG } from '../../config/seo';
import { createCanonicalUrl, formatTitle, shouldNoindexQuery } from '../../lib/seo';
import { ProfileRepository, LocationRepository, CategoryRepository, ServiceRepository, GuideRepository } from '../../lib/repositories';

export interface SeoManagerProps {
  currentPath: string;
}

export function SeoManager({ currentPath }: SeoManagerProps) {
  useEffect(() => {
    let title = SEO_CONFIG.defaultTitle;
    let description = SEO_CONFIG.defaultDescription;
    let ogType = 'website';
    let ogImage = SEO_CONFIG.defaultImage;

    const fullUrl = window.location.href;
    const pathOnly = currentPath.split('?')[0] || '/';
    const queryString = window.location.search || '';
    const canonicalUrl = createCanonicalUrl(pathOnly);
    const isNoindex = shouldNoindexQuery(queryString);

    let schemaList: Record<string, unknown>[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SEO_CONFIG.organization.name,
        url: SEO_CONFIG.siteUrl,
        logo: SEO_CONFIG.organization.logo,
        description: SEO_CONFIG.organization.description,
        address: {
          '@type': 'PostalAddress',
          addressLocality: SEO_CONFIG.city,
          addressRegion: SEO_CONFIG.state,
          addressCountry: SEO_CONFIG.country,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SEO_CONFIG.siteName,
        url: SEO_CONFIG.siteUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SEO_CONFIG.siteUrl}/profiles?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ];

    // Route matching for metadata
    if (pathOnly === '/' || pathOnly === '') {
      title = SEO_CONFIG.defaultTitle;
      description = SEO_CONFIG.defaultDescription;
    } else if (pathOnly === '/profiles') {
      title = 'Browse 18+ Independent Companions in Hyderabad | Adaah';
      description = 'Explore verified 18+ companion profiles in Hyderabad with transparent rates, real photos, availability status, and confidential inquiries.';
    } else if (pathOnly.startsWith('/profiles/')) {
      const slug = pathOnly.replace('/profiles/', '').split('/')[0];
      const profileName = slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      title = `${profileName} | Hyderabad 18+ Directory | Adaah`;
      description = `View verified portfolio, location, availability and confidential inquiry options for ${profileName} in Hyderabad on Adaah directory.`;
      ogType = 'profile';

      schemaList.push({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profileName,
        jobTitle: 'Independent Companion',
        url: canonicalUrl,
        homeLocation: {
          '@type': 'Place',
          name: 'Hyderabad, Telangana, India',
        },
      });
    } else if (pathOnly === '/locations') {
      title = 'Hyderabad Companion Directories & Locations | Adaah';
      description = 'Browse verified independent companions across Banjara Hills, Jubilee Hills, Gachibowli, Hitech City, Madhapur, Kondapur, and 30 Hyderabad areas.';
    } else if (pathOnly.startsWith('/locations/')) {
      const slug = pathOnly.replace('/locations/', '').split('/')[0];
      const locName = slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      title = `${locName} 18+ Private Directory | Adaah`;
      description = `Explore verified 18+ private companion listings and local directory information in ${locName}, Hyderabad. Incall suites and outcall appointments.`;
    } else if (pathOnly === '/categories') {
      title = 'Companion Categories & Specialties in Hyderabad | Adaah';
      description = 'Explore companion classifications including Independent Companions, VIP Companions, Models, Travel Partners, and Dinner Escorts in Hyderabad.';
    } else if (pathOnly.startsWith('/categories/')) {
      const slug = pathOnly.replace('/categories/', '').split('/')[0];
      const catName = slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      title = `${catName} in Hyderabad | Adaah`;
      description = `Verified independent companion profiles categorized under ${catName} in Hyderabad with transparent rate guidelines.`;
    } else if (pathOnly === '/services') {
      title = 'Companionship Services & Occasions in Hyderabad | Adaah';
      description = 'Discover companion occasions including fine dining accompaniment, VIP travel, hotel suite outcalls, and social event companionship in Hyderabad.';
    } else if (pathOnly.startsWith('/services/')) {
      const slug = pathOnly.replace('/services/', '').split('/')[0];
      const srvName = slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      title = `${srvName} in Hyderabad | Adaah`;
      description = `Details, etiquette benchmarks, and verified companion availability for ${srvName} in Hyderabad.`;
    } else if (pathOnly === '/guides' || pathOnly === '/blog') {
      title = 'Editorial Guides, Discretion & Safety | Adaah';
      description = 'Read authoritative field guides, booking etiquette, privacy guidelines, and safety protocols for consensual adult arrangements in Hyderabad.';
    } else if (pathOnly.startsWith('/guides/') || pathOnly.startsWith('/blog/')) {
      const slug = (pathOnly.startsWith('/guides/')
        ? pathOnly.replace('/guides/', '')
        : pathOnly.replace('/blog/', '')
      ).split('/')[0];
      const guideTitle = slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      title = `${guideTitle} | Adaah`;
      description = `Read comprehensive safety guidance and discretion protocols on ${guideTitle} for adult companion arrangements in Hyderabad.`;
      ogType = 'article';

      schemaList.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guideTitle,
        publisher: {
          '@type': 'Organization',
          name: SEO_CONFIG.siteName,
          logo: {
            '@type': 'ImageObject',
            url: SEO_CONFIG.organization.logo,
          },
        },
      });
    } else if (pathOnly === '/faq') {
      title = 'Frequently Asked Questions & Support | Adaah';
      description = 'Clear answers regarding 18+ verification, photo authenticity, booking procedures, discretion protocols, and patron privacy in Hyderabad.';
    } else if (pathOnly === '/safety') {
      title = 'Safety, Trust & Discretion Protocols | Adaah';
      description = 'Our commitments to 18+ verification, anti-trafficking enforcement, strict hygiene benchmarks, and patron anonymity in Hyderabad.';
    } else if (pathOnly === '/about') {
      title = 'About Adaah — Hyderabad 18+ Private Directory';
      description = 'Learn about Adaah founding mission to provide a refined, discreet, transparent 18+ adult companion directory focused on Hyderabad, India.';
    } else if (pathOnly === '/contact') {
      title = 'Confidential Concierge Desk & Inquiries | Adaah';
      description = 'Contact our private concierge desk for discreet platform inquiries, companion verification questions, or Hyderabad directory assistance.';
    } else if (pathOnly === '/terms') {
      title = 'Terms of Service (18+ Mandatory) | Adaah';
      description = 'Legal terms governing user conduct, 18+ age requirement, independent directory listings, and platform policies.';
    } else if (pathOnly === '/privacy') {
      title = 'Privacy Policy & Discretion Pledge | Adaah';
      description = 'How Adaah protects patron privacy, enforces non-retention data standards, and ensures confidential browsing.';
    }

    // Set document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (nameAttr: string, propertyAttr: string, value: string) => {
      let selector = nameAttr ? `meta[name="${nameAttr}"]` : `meta[property="${propertyAttr}"]`;
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        if (nameAttr) tag.setAttribute('name', nameAttr);
        if (propertyAttr) tag.setAttribute('property', propertyAttr);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', value);
    };

    // Meta Description
    updateMetaTag('description', '', description);

    // Robots Directive (Handle noindex for parameterized search/filter combinations)
    updateMetaTag('robots', '', isNoindex ? 'noindex, follow' : 'index, follow');

    // OpenGraph Tags
    updateMetaTag('', 'og:title', title);
    updateMetaTag('', 'og:description', description);
    updateMetaTag('', 'og:type', ogType);
    updateMetaTag('', 'og:url', canonicalUrl);
    updateMetaTag('', 'og:image', ogImage);
    updateMetaTag('', 'og:site_name', SEO_CONFIG.siteName);
    updateMetaTag('', 'og:locale', SEO_CONFIG.locale);

    // Twitter Card Tags
    updateMetaTag('twitter:card', '', 'summary_large_image');
    updateMetaTag('twitter:title', '', title);
    updateMetaTag('twitter:description', '', description);
    updateMetaTag('twitter:image', '', ogImage);

    // Google Site Verification Tag (if set)
    if (SEO_CONFIG.googleSiteVerification) {
      updateMetaTag('google-site-verification', '', SEO_CONFIG.googleSiteVerification);
    }

    // Canonical Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // Update JSON-LD Script
    let ldScript = document.getElementById('adaah-schema-ld') as HTMLScriptElement | null;
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.id = 'adaah-schema-ld';
      ldScript.type = 'application/ld+json';
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify(schemaList);
  }, [currentPath]);

  return null;
}
