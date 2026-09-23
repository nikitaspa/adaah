import fs from 'fs';
import path from 'path';
import { mockProfiles } from '../data/profiles';
import { mockLocations } from '../data/locations';
import { mockCategories } from '../data/categories';
import { mockServices } from '../data/services';
import { mockGuides } from '../data/guides';
import { SEO_CONFIG } from '../config/seo';

export function generateSitemapXml(): string {
  const baseUrl = SEO_CONFIG.siteUrl;
  const today = new Date().toISOString().split('T')[0];

  const staticRoutes = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/profiles', priority: '0.9', changefreq: 'daily' },
    { path: '/locations', priority: '0.9', changefreq: 'daily' },
    { path: '/categories', priority: '0.8', changefreq: 'weekly' },
    { path: '/services', priority: '0.8', changefreq: 'weekly' },
    { path: '/guides', priority: '0.8', changefreq: 'weekly' },
    { path: '/faq', priority: '0.7', changefreq: 'monthly' },
    { path: '/safety', priority: '0.7', changefreq: 'monthly' },
    { path: '/about', priority: '0.6', changefreq: 'monthly' },
    { path: '/contact', priority: '0.6', changefreq: 'monthly' },
    { path: '/terms', priority: '0.4', changefreq: 'yearly' },
    { path: '/privacy', priority: '0.4', changefreq: 'yearly' },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static routes
  for (const route of staticRoutes) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${route.path}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // Profile detail pages
  for (const profile of mockProfiles) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/profiles/${profile.slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  // Location detail pages (all 30 Hyderabad locations)
  for (const loc of mockLocations) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/locations/${loc.slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  // Category detail pages
  for (const cat of mockCategories) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/categories/${cat.slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  }

  // Service detail pages
  for (const srv of mockServices) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/services/${srv.slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  }

  // Guide detail pages
  for (const guide of mockGuides) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/guides/${guide.slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;

  return xml;
}

// Write to public/sitemap.xml if executed directly
if (require.main === module) {
  const xmlContent = generateSitemapXml();
  const outputPath = path.resolve(__dirname, '../../public/sitemap.xml');
  fs.writeFileSync(outputPath, xmlContent, 'utf8');
  console.log(`Successfully generated sitemap.xml at ${outputPath}`);
}
