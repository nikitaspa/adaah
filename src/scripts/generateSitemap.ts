import fs from 'fs';
import path from 'path';
import { mockProfiles } from '../data/profiles';
import { mockLocations } from '../data/locations';
import { mockCategories } from '../data/categories';
import { mockServices } from '../data/services';
import { mockGuides } from '../data/guides';
import { isLocationIndexable } from '../lib/seo';

export function generateSitemapXml(): string {
  const baseUrl = 'https://adaah.life';
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

  // 1. Static core routes (12 URLs)
  for (const route of staticRoutes) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${route.path}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // 2. Active Profile detail pages (34 active profiles)
  for (const profile of mockProfiles) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/profiles/${profile.slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  // 3. Location detail pages (Only genuinely populated locations with verified resident profiles)
  const indexableLocations = mockLocations.filter((loc) => isLocationIndexable(loc.slug, mockProfiles));
  for (const loc of indexableLocations) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/locations/${loc.slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  // 4. Category detail pages (7 active categories)
  for (const cat of mockCategories) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/categories/${cat.slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  }

  // 5. Service detail pages (5 active services)
  for (const srv of mockServices) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/services/${srv.slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  }

  // 6. Guide detail pages (3 active guides)
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

// Generate sitemap.xml in both public/ and dist/ (if dist exists)
const xmlContent = generateSitemapXml();
const publicOutputPath = path.resolve(process.cwd(), 'public/sitemap.xml');
fs.writeFileSync(publicOutputPath, xmlContent, 'utf8');
console.log(`[Sitemap] Successfully generated sitemap.xml at ${publicOutputPath}`);

const distOutputPath = path.resolve(process.cwd(), 'dist/sitemap.xml');
if (fs.existsSync(path.resolve(process.cwd(), 'dist'))) {
  fs.writeFileSync(distOutputPath, xmlContent, 'utf8');
  console.log(`[Sitemap] Copied sitemap.xml to ${distOutputPath}`);
}
