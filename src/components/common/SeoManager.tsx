import React, { useEffect } from 'react';
import { siteConfig } from '../../config/site';

export interface SeoManagerProps {
  currentPath: string;
}

export function SeoManager({ currentPath }: SeoManagerProps) {
  useEffect(() => {
    let title = `${siteConfig.name} – Premium 18+ Local Companion Directory`;
    let description = siteConfig.description;
    let schemaData: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteConfig.name,
      url: window.location.origin,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${window.location.origin}/profiles?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };

    if (currentPath === '/' || currentPath === '') {
      title = `${siteConfig.name} – Verified 18+ Independent Companions & Private Directory`;
      description = 'Discover vetted independent adult companions, elite travel partners, and discreet private dinner dates in top metropolitan cities.';
    } else if (currentPath === '/profiles') {
      title = `Verified 18+ Companion Directory | ${siteConfig.name}`;
      description = 'Browse verified independent companion profiles, high-fashion models, and travel partners with verified real photos and transparent rates.';
    } else if (currentPath.startsWith('/profiles/')) {
      const slug = currentPath.replace('/profiles/', '').split('/')[0];
      const name = slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      title = `${name} – Verified Independent Companion | ${siteConfig.name}`;
      description = `View verified portfolio, gallery, availability, and confidential inquiry options for ${name} on ${siteConfig.name}.`;
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name,
        jobTitle: 'Independent Adult Companion',
        url: window.location.href,
      };
    } else if (currentPath === '/locations') {
      title = `Metropolitan Companion Directories | ${siteConfig.name}`;
      description = 'Explore verified independent companions across Mumbai, Delhi NCR, Bangalore, Goa, Pune, Hyderabad, and major luxury hubs.';
    } else if (currentPath.startsWith('/locations/')) {
      const slug = currentPath.replace('/locations/', '').split('/')[0];
      const cityName = slug.charAt(0).toUpperCase() + slug.slice(1);
      title = `${cityName} Companions & Verified Directory | ${siteConfig.name}`;
      description = `Find verified independent companions in ${cityName}. Incall luxury suites & outcall hotel escort appointments available.`;
    } else if (currentPath === '/categories') {
      title = `Companion Categories & Specialties | ${siteConfig.name}`;
      description = 'Explore curated companion classifications including Independent Companions, Elite Travel Partners, and VIP Dinner Companions.';
    } else if (currentPath.startsWith('/categories/')) {
      const slug = currentPath.replace('/categories/', '').split('/')[0];
      const catName = slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      title = `${catName} Profiles | ${siteConfig.name}`;
      description = `Verified independent profiles categorized under ${catName} on ${siteConfig.name}.`;
    } else if (currentPath === '/services') {
      title = `Companionship Services & Occasions | ${siteConfig.name}`;
      description = 'Fine dining, gala galas, luxury weekend escapes, and discreet companion occasions with transparent honorarium guidelines.';
    } else if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '').split('/')[0];
      const srvName = slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      title = `${srvName} Occasions | ${siteConfig.name}`;
      description = `Details, etiquette benchmarks, and verified companion availability for ${srvName}.`;
    } else if (currentPath === '/guides' || currentPath === '/blog') {
      title = `Editorial Guides, Discretion & Etiquette | ${siteConfig.name}`;
      description = 'Authoritative advice, booking etiquette, and discretion protocols for dignified, consensual adult companion arrangements.';
    } else if (currentPath.startsWith('/guides/') || currentPath.startsWith('/blog/')) {
      const slug = (currentPath.startsWith('/guides/') ? currentPath.replace('/guides/', '') : currentPath.replace('/blog/', '')).split('/')[0];
      const guideTitle = slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      title = `${guideTitle} – Etiquette Guide | ${siteConfig.name}`;
      description = `Read our comprehensive field guide and discretion protocols for ${guideTitle}.`;
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guideTitle,
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
        },
      };
    } else if (currentPath === '/faq') {
      title = `Frequently Asked Questions & Support | ${siteConfig.name}`;
      description = 'Common questions regarding 18+ age verification, photo authenticity, booking procedures, and client privacy.';
    } else if (currentPath === '/safety') {
      title = `Safety, Trust & Discretion Protocols | ${siteConfig.name}`;
      description = 'Our commitments to 18+ verification, zero-tolerance trafficking prevention, hygiene standards, and total client anonymity.';
    } else if (currentPath === '/about') {
      title = `About ${siteConfig.name} — 18+ Private Directory`;
      description = 'Learn about our founding mission to establish an elegant, verified sanctuary for consensual adult discovery.';
    } else if (currentPath === '/contact') {
      title = `Confidential Concierge Desk & Inquiries | ${siteConfig.name}`;
      description = 'Connect with our private concierge team for bespoke multi-city itineraries and confidential platform inquiries.';
    } else if (currentPath === '/terms') {
      title = `Terms of Service (18+ Mandatory) | ${siteConfig.name}`;
      description = 'Legal terms governing user conduct, age verification, and autonomous directory listings.';
    } else if (currentPath === '/privacy') {
      title = `Privacy Policy & Discretion Pledge | ${siteConfig.name}`;
      description = 'How we protect patron anonymity and enforce strict data non-retention standards.';
    }

    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update OpenGraph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${window.location.origin}${currentPath}`);

    // Update JSON-LD structured data script
    let ldScript = document.getElementById('adaah-schema-ld') as HTMLScriptElement | null;
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.id = 'adaah-schema-ld';
      ldScript.type = 'application/ld+json';
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify(schemaData);
  }, [currentPath]);

  return null;
}
