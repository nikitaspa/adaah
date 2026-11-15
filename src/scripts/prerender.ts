import fs from 'fs';
import path from 'path';
import { mockProfiles } from '../data/profiles';
import { mockLocations } from '../data/locations';
import { mockCategories } from '../data/categories';
import { mockServices } from '../data/services';
import { mockGuides } from '../data/guides';
import { SEO_CONFIG } from '../config/seo';
import { KEYWORD_STRATEGY } from '../config/keywords';
import { siteConfig } from '../config/site';
import { isLocationIndexable } from '../lib/seo';

const BASE_URL = 'https://adaah.life';

interface RouteData {
  path: string;
  title: string;
  description: string;
  canonical?: string;
  isNoindex?: boolean;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  schema?: any[];
  h1: string;
  contentHtml: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderHeader(currentPath: string): string {
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Profiles', href: '/profiles' },
    { label: 'Categories', href: '/categories' },
    { label: 'Locations', href: '/locations' },
    { label: 'Services', href: '/services' },
    { label: 'Guides', href: '/guides' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ];

  return `
    <header class="sticky top-0 z-40 w-full border-b border-[#E6E1D8] bg-[#F8F6F1]/95 backdrop-blur-md">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" class="flex items-center gap-2 group">
          <span class="font-serif-display text-2xl font-bold tracking-tight text-[#171717]">Adaah</span>
        </a>
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-[#5F5A52]">
          ${navLinks
            .map(
              (link) => `
            <a href="${link.href}" class="hover:text-[#C6922E] transition-colors ${
                currentPath === link.href ? 'text-[#C6922E] font-semibold' : ''
              }">${link.label}</a>
          `
            )
            .join('')}
        </nav>
        <div class="flex items-center gap-3">
          <a href="${siteConfig.contact.whatsappUrl}" target="_blank" rel="noopener noreferrer" class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366] text-white text-xs font-semibold shadow-xs">
            <span>WhatsApp</span>
          </a>
          <a href="tel:${siteConfig.contact.phoneRaw}" class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#171717] text-white text-xs font-semibold shadow-xs">
            <span>Call Now</span>
          </a>
        </div>
      </div>
    </header>
  `;
}

function renderFooter(): string {
  return `
    <footer class="border-t border-[#E6E1D8] bg-[#12141A] text-stone-300 py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="space-y-3">
            <span class="font-serif-display text-xl font-bold text-white tracking-wide">Adaah</span>
            <p class="text-xs text-stone-400 leading-relaxed">
              Premier Hyderabad 18+ Private Companion Directory. Featuring verified independent profiles across premier metropolitan districts with complete discretion.
            </p>
          </div>
          <div>
            <h3 class="text-xs font-bold text-white uppercase tracking-wider mb-3">Directory</h3>
            <ul class="space-y-2 text-xs text-stone-400">
              <li><a href="/profiles" class="hover:text-[#C6922E]">Verified Profiles</a></li>
              <li><a href="/locations" class="hover:text-[#C6922E]">Hyderabad Locations</a></li>
              <li><a href="/categories" class="hover:text-[#C6922E]">Companion Categories</a></li>
              <li><a href="/services" class="hover:text-[#C6922E]">Companionship Services</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-xs font-bold text-white uppercase tracking-wider mb-3">Information & Safety</h3>
            <ul class="space-y-2 text-xs text-stone-400">
              <li><a href="/guides" class="hover:text-[#C6922E]">Editorial Guides</a></li>
              <li><a href="/safety" class="hover:text-[#C6922E]">Safety Protocols</a></li>
              <li><a href="/faq" class="hover:text-[#C6922E]">Frequently Asked Questions</a></li>
              <li><a href="/contact" class="hover:text-[#C6922E]">Concierge Desk</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-xs font-bold text-white uppercase tracking-wider mb-3">Legal & Discretion</h3>
            <ul class="space-y-2 text-xs text-stone-400">
              <li><a href="/terms" class="hover:text-[#C6922E]">Terms of Service</a></li>
              <li><a href="/privacy" class="hover:text-[#C6922E]">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div class="pt-6 border-t border-stone-800 text-center text-xs text-stone-500">
          <p>© ${new Date().getFullYear()} Adaah Directory. Strict 18+ Adult Verification Policy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}

export function buildRouteHtml(route: RouteData, templateHtml: string): string {
  let html = templateHtml;

  // 1. Replace Title
  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(route.title)}</title>`);

  // 2. Replace Meta Description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/s,
    `<meta name="description" content="${escapeHtml(route.description)}" />`
  );

  // 3. Replace or remove Canonical
  if (route.canonical) {
    if (html.includes('<link rel="canonical"')) {
      html = html.replace(
        /<link rel="canonical" href=".*?" \/>/s,
        `<link rel="canonical" href="${route.canonical}" />`
      );
    } else {
      html = html.replace('</head>', `    <link rel="canonical" href="${route.canonical}" />\n  </head>`);
    }
  } else {
    // 404 pages must NEVER have a canonical URL tag
    html = html.replace(/\s*<link rel="canonical" href=".*?" \/>/s, '');
  }

  // 4. Update / Insert Robots Directive
  const robotsContent = route.isNoindex ? 'noindex, follow' : 'index, follow';
  if (html.includes('<meta name="robots"')) {
    html = html.replace(/<meta name="robots" content=".*?" \/>/s, `<meta name="robots" content="${robotsContent}" />`);
  } else {
    html = html.replace('</head>', `    <meta name="robots" content="${robotsContent}" />\n  </head>`);
  }

  // 5. Open Graph & Twitter Cards
  const ogType = route.ogType || 'website';
  const ogImage = route.ogImage || `${BASE_URL}/og-image.jpg`;

  html = html.replace(/<meta property="og:title" content=".*?" \/>/s, `<meta property="og:title" content="${escapeHtml(route.title)}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/s, `<meta property="og:description" content="${escapeHtml(route.description)}" />`);
  if (route.canonical) {
    html = html.replace(/<meta property="og:url" content=".*?" \/>/s, `<meta property="og:url" content="${route.canonical}" />`);
  } else {
    html = html.replace(/\s*<meta property="og:url" content=".*?" \/>/s, '');
  }
  html = html.replace(/<meta property="og:type" content=".*?" \/>/s, `<meta property="og:type" content="${ogType}" />`);

  const extraMeta = `
    <meta property="og:image" content="${ogImage}" />
    <meta name="twitter:title" content="${escapeHtml(route.title)}" />
    <meta name="twitter:description" content="${escapeHtml(route.description)}" />
    <meta name="twitter:image" content="${ogImage}" />`;

  // 6. JSON-LD Structured Data
  let schemaTags = '';
  if (route.schema && route.schema.length > 0) {
    schemaTags = `\n    <script type="application/ld+json">${JSON.stringify(
      route.schema.length === 1 ? route.schema[0] : route.schema
    )}</script>`;
  }

  html = html.replace('</head>', `${extraMeta}${schemaTags}\n  </head>`);

  // 7. Inject Visible Pre-rendered Semantic HTML into #root
  const fullBodyHtml = `
    <div class="flex min-h-screen flex-col bg-[#F8F6F1] text-[#171717] font-sans antialiased">
      ${renderHeader(route.path)}
      <main class="flex-1 pb-16 md:pb-0">
        ${route.contentHtml}
      </main>
      ${renderFooter()}
    </div>
  `;

  html = html.replace('<div id="root"></div>', `<div id="root">${fullBodyHtml}</div>`);

  return html;
}

export async function prerenderAllRoutes() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const indexTemplatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexTemplatePath)) {
    throw new Error(`Build template not found at ${indexTemplatePath}. Run 'vite build' first.`);
  }

  const templateHtml = fs.readFileSync(indexTemplatePath, 'utf8');
  const routesToPrerender: RouteData[] = [];

  // -------------------------------------------------------------
  // 1. Homepage (/)
  // -------------------------------------------------------------
  routesToPrerender.push({
    path: '/',
    title: KEYWORD_STRATEGY.homepage.suggestedTitle,
    description: KEYWORD_STRATEGY.homepage.suggestedDescription,
    canonical: BASE_URL,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Adaah',
        url: BASE_URL,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${BASE_URL}/profiles?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Adaah Directory',
        url: BASE_URL,
        logo: `${BASE_URL}/favicon.png`,
      },
    ],
    h1: 'Discover Premium Companionship in Hyderabad',
    contentHtml: `
      <section id="homepage-hero-section" class="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-18 md:pt-20 md:pb-24 border-b border-[#E6E1D8] bg-[#F8F6F1]">
        <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4 sm:space-y-6">
          <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E6E1D8] text-xs font-semibold text-[#171717]">
            <span class="w-2 h-2 rounded-full bg-[#C6922E]"></span>
            <span class="text-[#916718] font-bold">18+ Only</span>
            <span>•</span>
            <span>Hyderabad Directory</span>
            <span>•</span>
            <span>Verified Profiles</span>
          </div>
          <h1 class="font-serif-display text-2xl sm:text-4xl md:text-6xl font-bold tracking-tight text-[#171717] leading-[1.2]">
            Discover Premium Companionship in Hyderabad
          </h1>
          <p class="text-xs sm:text-base md:text-lg text-[#5F5A52] leading-relaxed max-w-2xl mx-auto">
            Explore verified profiles, premier locations and refined services across Hyderabad.
          </p>
        </div>
      </section>
      <section class="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <div>
          <h2 class="font-serif-display text-2xl font-bold text-[#171717] mb-6">Featured Independent Companions</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${mockProfiles.slice(0, 8).map(p => `
              <div class="p-4 rounded-2xl bg-white border border-[#E6E1D8] shadow-xs space-y-2">
                <h3 class="font-bold text-base text-[#171717]">${escapeHtml(p.name)}, ${p.age}</h3>
                <p class="text-xs text-[#C6922E] font-semibold">${escapeHtml(p.area)}, Hyderabad</p>
                <p class="text-xs text-[#5F5A52] line-clamp-2">${escapeHtml(p.description)}</p>
                <a href="/profiles/${p.slug}" class="inline-block mt-2 text-xs font-bold text-[#C6922E] hover:underline">View Profile →</a>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `,
  });

  // -------------------------------------------------------------
  // 2. Profiles Listing (/profiles)
  // -------------------------------------------------------------
  routesToPrerender.push({
    path: '/profiles',
    title: KEYWORD_STRATEGY.profilesListing.suggestedTitle,
    description: KEYWORD_STRATEGY.profilesListing.suggestedDescription,
    canonical: `${BASE_URL}/profiles`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Hyderabad 18+ Private Profiles Directory',
        url: `${BASE_URL}/profiles`,
        description: KEYWORD_STRATEGY.profilesListing.suggestedDescription,
      },
    ],
    h1: 'Hyderabad 18+ Private Profiles Directory',
    contentHtml: `
      <div class="max-w-7xl mx-auto px-4 py-10 space-y-8">
        <div>
          <h1 class="font-serif-display text-3xl sm:text-4xl font-bold text-[#171717]">Hyderabad 18+ Private Profiles Directory</h1>
          <p class="text-sm text-[#5F5A52] mt-2 max-w-2xl">Browse verified independent companions across Banjara Hills, Jubilee Hills, Gachibowli, Hitech City, and Madhapur.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${mockProfiles.map(p => `
            <div class="p-4 rounded-2xl bg-white border border-[#E6E1D8] shadow-xs space-y-2">
              <h2 class="font-bold text-base text-[#171717]">${escapeHtml(p.name)}, ${p.age}</h2>
              <p class="text-xs text-[#C6922E] font-semibold">${escapeHtml(p.area)}, Hyderabad</p>
              <p class="text-xs text-[#5F5A52] line-clamp-2">${escapeHtml(p.description)}</p>
              <p class="text-xs font-semibold text-[#171717]">From ₹${p.priceFrom.toLocaleString('en-IN')}</p>
              <a href="/profiles/${p.slug}" class="inline-block text-xs font-bold text-[#C6922E] hover:underline">View Portfolio & Details →</a>
            </div>
          `).join('')}
        </div>
      </div>
    `,
  });

  // -------------------------------------------------------------
  // 3. Profile Detail Pages (/profiles/:slug) - all 34 profiles
  // -------------------------------------------------------------
  for (const profile of mockProfiles) {
    routesToPrerender.push({
      path: `/profiles/${profile.slug}`,
      title: `${profile.name} — ${profile.area} 18+ Profile | Adaah`,
      description: `View verified portfolio, location, availability and confidential inquiry options for ${profile.name} (${profile.age}) in ${profile.area}, Hyderabad on Adaah directory.`,
      canonical: `${BASE_URL}/profiles/${profile.slug}`,
      ogType: 'profile',
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: profile.name,
          jobTitle: 'Independent Companion',
          url: `${BASE_URL}/profiles/${profile.slug}`,
          homeLocation: {
            '@type': 'Place',
            name: `${profile.area}, Hyderabad, Telangana, India`,
          },
        },
      ],
      h1: `${profile.name} — ${profile.area}, Hyderabad`,
      contentHtml: `
        <article class="max-w-4xl mx-auto px-4 py-10 space-y-6">
          <nav aria-label="Breadcrumb" class="text-xs text-[#5F5A52]">
            <a href="/" class="hover:text-[#C6922E]">Home</a> / <a href="/profiles" class="hover:text-[#C6922E]">Profiles</a> / <span class="text-[#171717] font-semibold">${escapeHtml(profile.name)}</span>
          </nav>
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-[#916718] text-xs font-bold mb-2">
              <span>18+ Verified Profile</span> • <span>${escapeHtml(profile.area)}</span>
            </div>
            <h1 class="font-serif-display text-3xl sm:text-4xl font-bold text-[#171717]">${escapeHtml(profile.name)}, ${profile.age}</h1>
            <p class="text-sm text-[#C6922E] font-semibold mt-1">${escapeHtml(profile.headline || 'Independent Companion in Hyderabad')}</p>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-[#E6E1D8] space-y-4 shadow-xs">
            <h2 class="text-base font-bold text-[#171717]">About ${escapeHtml(profile.name)}</h2>
            <p class="text-sm text-[#5F5A52] leading-relaxed">${escapeHtml(profile.bio || profile.description)}</p>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#E6E1D8] text-xs">
              <div><span class="text-stone-400 block">Location:</span><span class="font-bold text-[#171717]">${escapeHtml(profile.area)}</span></div>
              <div><span class="text-stone-400 block">Rates From:</span><span class="font-bold text-[#171717]">₹${profile.priceFrom.toLocaleString('en-IN')}</span></div>
              <div><span class="text-stone-400 block">Languages:</span><span class="font-bold text-[#171717]">${profile.languages?.join(', ') || 'English, Hindi'}</span></div>
              <div><span class="text-stone-400 block">Status:</span><span class="font-bold text-emerald-600">Available</span></div>
            </div>
          </div>
        </article>
      `,
    });
  }

  // -------------------------------------------------------------
  // 4. Locations Listing (/locations)
  // -------------------------------------------------------------
  routesToPrerender.push({
    path: '/locations',
    title: KEYWORD_STRATEGY.locationsListing.suggestedTitle,
    description: KEYWORD_STRATEGY.locationsListing.suggestedDescription,
    canonical: `${BASE_URL}/locations`,
    h1: 'Hyderabad Metropolitan Locations Directory',
    contentHtml: `
      <div class="max-w-7xl mx-auto px-4 py-10 space-y-8">
        <div>
          <h1 class="font-serif-display text-3xl sm:text-4xl font-bold text-[#171717]">Hyderabad Metropolitan Locations Directory</h1>
          <p class="text-sm text-[#5F5A52] mt-2 max-w-2xl">Explore companions by Hyderabad sector. From Banjara Hills and Jubilee Hills to Gachibowli, Hitech City, and Financial District.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${mockLocations.map(loc => `
            <div class="p-5 rounded-2xl bg-white border border-[#E6E1D8] shadow-xs space-y-2">
              <h2 class="font-serif-display font-bold text-lg text-[#171717]">${escapeHtml(loc.name)}</h2>
              <p class="text-xs text-[#5F5A52] line-clamp-2">${escapeHtml(loc.description)}</p>
              <a href="/locations/${loc.slug}" class="inline-block text-xs font-bold text-[#C6922E] hover:underline">Explore ${escapeHtml(loc.name)} Directory →</a>
            </div>
          `).join('')}
        </div>
      </div>
    `,
  });

  // -------------------------------------------------------------
  // 5. Location Detail Pages (/locations/:slug) - all 30 locations
  // -------------------------------------------------------------
  for (const loc of mockLocations) {
    const isIndexable = isLocationIndexable(loc.slug, mockProfiles);
    const localProfiles = mockProfiles.filter(p => p.locationId === loc.id || p.area.toLowerCase().replace(/\s+/g, '-') === loc.slug);

    routesToPrerender.push({
      path: `/locations/${loc.slug}`,
      title: `${loc.name} Companions & 18+ Directory | Adaah`,
      description: `Explore verified 18+ private companion listings and local directory information in ${loc.name}, Hyderabad. Incall luxury suites and outcall appointments.`,
      canonical: `${BASE_URL}/locations/${loc.slug}`,
      isNoindex: !isIndexable,
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'Place',
          name: `${loc.name}, Hyderabad`,
          address: {
            '@type': 'PostalAddress',
            addressLocality: loc.name,
            addressRegion: 'Telangana',
            addressCountry: 'IN',
          },
        },
      ],
      h1: `${loc.name} Companions & Private Directory`,
      contentHtml: `
        <article class="max-w-7xl mx-auto px-4 py-10 space-y-8">
          <nav aria-label="Breadcrumb" class="text-xs text-[#5F5A52]">
            <a href="/" class="hover:text-[#C6922E]">Home</a> / <a href="/locations" class="hover:text-[#C6922E]">Locations</a> / <span class="text-[#171717] font-semibold">${escapeHtml(loc.name)}</span>
          </nav>
          <div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E6E1D8] text-xs font-bold text-[#171717] uppercase tracking-wider mb-2">
              <span>Hyderabad</span> • <span>Telangana</span>
            </div>
            <h1 class="font-serif-display text-3xl sm:text-4xl font-bold text-[#171717]">${escapeHtml(loc.name)} Companions</h1>
            <p class="text-sm text-[#5F5A52] mt-2 max-w-3xl leading-relaxed">${escapeHtml(loc.description)}</p>
          </div>

          ${loc.popularNeighborhoods && loc.popularNeighborhoods.length > 0 ? `
            <div class="p-4 rounded-xl bg-white border border-[#E6E1D8] text-xs flex flex-wrap items-center gap-2">
              <span class="font-bold text-[#916718]">Key Enclaves in ${escapeHtml(loc.name)}:</span>
              ${loc.popularNeighborhoods.map(nh => `<span class="px-2 py-0.5 rounded bg-[#F8F6F1] border border-[#E6E1D8]">${escapeHtml(nh)}</span>`).join('')}
            </div>
          ` : ''}

          <div>
            <h2 class="font-serif-display text-xl sm:text-2xl font-bold text-[#171717] mb-4">
              ${localProfiles.length > 0 ? `Featured Profiles in ${escapeHtml(loc.name)}` : `Profiles available in nearby areas for ${escapeHtml(loc.name)}`}
            </h2>
            ${localProfiles.length > 0 ? `
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                ${localProfiles.map(p => `
                  <div class="p-4 rounded-2xl bg-white border border-[#E6E1D8] shadow-xs space-y-2">
                    <h3 class="font-bold text-base text-[#171717]">${escapeHtml(p.name)}, ${p.age}</h3>
                    <p class="text-xs text-[#C6922E] font-semibold">${escapeHtml(p.area)}</p>
                    <p class="text-xs text-[#5F5A52] line-clamp-2">${escapeHtml(p.description)}</p>
                    <a href="/profiles/${p.slug}" class="inline-block text-xs font-bold text-[#C6922E] hover:underline">View Profile →</a>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div class="space-y-6">
                <div class="p-4 rounded-xl bg-[#F0EBE1] border border-[#E6E1D8] text-xs text-[#5F5A52] leading-relaxed">
                  <p class="font-bold text-[#171717] mb-1">Outcall Accompaniment to ${escapeHtml(loc.name)}</p>
                  <p>Resident listings in ${escapeHtml(loc.name)} are currently limited. Verified independent companions based in adjacent central and western corridors offer discreet outcall accompaniment to hotel suites and private residences in ${escapeHtml(loc.name)}.</p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  ${mockProfiles.slice(0, 4).map(p => `
                    <div class="p-4 rounded-2xl bg-white border border-[#E6E1D8] shadow-xs space-y-2">
                      <h3 class="font-bold text-base text-[#171717]">${escapeHtml(p.name)}, ${p.age}</h3>
                      <p class="text-xs text-[#C6922E] font-semibold">${escapeHtml(p.area)}</p>
                      <p class="text-xs text-[#5F5A52] line-clamp-2">${escapeHtml(p.description)}</p>
                      <a href="/profiles/${p.slug}" class="inline-block text-xs font-bold text-[#C6922E] hover:underline">View Profile →</a>
                    </div>
                  `).join('')}
                </div>
              </div>
            `}
          </div>
        </article>
      `,
    });
  }

  // -------------------------------------------------------------
  // 6. Categories Listing & Detail Pages
  // -------------------------------------------------------------
  routesToPrerender.push({
    path: '/categories',
    title: 'Companion Categories & Specialties in Hyderabad | Adaah',
    description: 'Explore companion classifications including Independent Companions, VIP Companions, Models, Travel Partners, and Dinner Escorts in Hyderabad.',
    canonical: `${BASE_URL}/categories`,
    h1: 'Companion Categories in Hyderabad',
    contentHtml: `
      <div class="max-w-7xl mx-auto px-4 py-10 space-y-8">
        <div>
          <h1 class="font-serif-display text-3xl sm:text-4xl font-bold text-[#171717]">Companion Categories & Specialties in Hyderabad</h1>
          <p class="text-sm text-[#5F5A52] mt-2 max-w-2xl">Browse curated classifications suited to dinner dates, executive travel, and high-profile social galas.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${mockCategories.map(cat => `
            <div class="p-5 rounded-2xl bg-white border border-[#E6E1D8] shadow-xs space-y-2">
              <h2 class="font-serif-display font-bold text-lg text-[#171717]">${escapeHtml(cat.name)}</h2>
              <p class="text-xs text-[#5F5A52]">${escapeHtml(cat.description)}</p>
              <a href="/categories/${cat.slug}" class="inline-block text-xs font-bold text-[#C6922E] hover:underline">View ${escapeHtml(cat.name)} →</a>
            </div>
          `).join('')}
        </div>
      </div>
    `,
  });

  for (const cat of mockCategories) {
    routesToPrerender.push({
      path: `/categories/${cat.slug}`,
      title: `${cat.name} in Hyderabad | Adaah`,
      description: `Verified independent companion profiles categorized under ${cat.name} in Hyderabad with transparent rate guidelines.`,
      canonical: `${BASE_URL}/categories/${cat.slug}`,
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${cat.name} in Hyderabad`,
          url: `${BASE_URL}/categories/${cat.slug}`,
          description: cat.description,
        },
      ],
      h1: `${cat.name} in Hyderabad`,
      contentHtml: `
        <article class="max-w-7xl mx-auto px-4 py-10 space-y-6">
          <nav aria-label="Breadcrumb" class="text-xs text-[#5F5A52]">
            <a href="/" class="hover:text-[#C6922E]">Home</a> / <a href="/categories" class="hover:text-[#C6922E]">Categories</a> / <span class="text-[#171717] font-semibold">${escapeHtml(cat.name)}</span>
          </nav>
          <div>
            <h1 class="font-serif-display text-3xl sm:text-4xl font-bold text-[#171717]">${escapeHtml(cat.name)} in Hyderabad</h1>
            <p class="text-sm text-[#5F5A52] mt-2 max-w-2xl leading-relaxed">${escapeHtml(cat.description)}</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            ${mockProfiles.slice(0, 6).map(p => `
              <div class="p-4 rounded-2xl bg-white border border-[#E6E1D8] shadow-xs space-y-2">
                <h3 class="font-bold text-base text-[#171717]">${escapeHtml(p.name)}, ${p.age}</h3>
                <p class="text-xs text-[#C6922E] font-semibold">${escapeHtml(p.area)}</p>
                <p class="text-xs text-[#5F5A52] line-clamp-2">${escapeHtml(p.description)}</p>
                <a href="/profiles/${p.slug}" class="inline-block text-xs font-bold text-[#C6922E] hover:underline">View Profile →</a>
              </div>
            `).join('')}
          </div>
        </article>
      `,
    });
  }

  // -------------------------------------------------------------
  // 7. Services Listing & Detail Pages
  // -------------------------------------------------------------
  routesToPrerender.push({
    path: '/services',
    title: 'Companionship Services & Occasions in Hyderabad | Adaah',
    description: 'Discover companion occasions including fine dining accompaniment, VIP travel, hotel suite outcalls, and social event companionship in Hyderabad.',
    canonical: `${BASE_URL}/services`,
    h1: 'Companionship Services in Hyderabad',
    contentHtml: `
      <div class="max-w-7xl mx-auto px-4 py-10 space-y-8">
        <div>
          <h1 class="font-serif-display text-3xl sm:text-4xl font-bold text-[#171717]">Companionship Services in Hyderabad</h1>
          <p class="text-sm text-[#5F5A52] mt-2 max-w-2xl">Refined occasions designed for discerning patrons visiting or residing in Hyderabad.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${mockServices.map(srv => `
            <div class="p-5 rounded-2xl bg-white border border-[#E6E1D8] shadow-xs space-y-2">
              <h2 class="font-serif-display font-bold text-lg text-[#171717]">${escapeHtml(srv.name)}</h2>
              <p class="text-xs text-[#5F5A52]">${escapeHtml(srv.shortDescription)}</p>
              <p class="text-xs font-semibold text-[#171717]">Duration: ${escapeHtml(srv.typicalDuration)}</p>
              <a href="/services/${srv.slug}" class="inline-block text-xs font-bold text-[#C6922E] hover:underline">Learn More →</a>
            </div>
          `).join('')}
        </div>
      </div>
    `,
  });

  for (const srv of mockServices) {
    routesToPrerender.push({
      path: `/services/${srv.slug}`,
      title: `${srv.name} in Hyderabad | Adaah`,
      description: `Details, etiquette benchmarks, and verified companion availability for ${srv.name} in Hyderabad.`,
      canonical: `${BASE_URL}/services/${srv.slug}`,
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: srv.name,
          serviceType: srv.name,
          provider: {
            '@type': 'Organization',
            name: 'Adaah Directory',
          },
          areaServed: {
            '@type': 'City',
            name: 'Hyderabad',
          },
          description: srv.shortDescription,
        },
      ],
      h1: `${srv.name} in Hyderabad`,
      contentHtml: `
        <article class="max-w-4xl mx-auto px-4 py-10 space-y-6">
          <nav aria-label="Breadcrumb" class="text-xs text-[#5F5A52]">
            <a href="/" class="hover:text-[#C6922E]">Home</a> / <a href="/services" class="hover:text-[#C6922E]">Services</a> / <span class="text-[#171717] font-semibold">${escapeHtml(srv.name)}</span>
          </nav>
          <div>
            <h1 class="font-serif-display text-3xl sm:text-4xl font-bold text-[#171717]">${escapeHtml(srv.name)}</h1>
            <p class="text-sm text-[#5F5A52] mt-2 leading-relaxed">${escapeHtml(srv.description)}</p>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-[#E6E1D8] space-y-4 shadow-xs text-xs">
            <h2 class="text-sm font-bold text-[#171717]">Service Details</h2>
            <div class="grid grid-cols-2 gap-4">
              <div><span class="text-stone-400 block">Typical Duration:</span><span class="font-bold text-[#171717]">${escapeHtml(srv.typicalDuration)}</span></div>
              <div><span class="text-stone-400 block">Rate Estimate:</span><span class="font-bold text-[#171717]">${escapeHtml(srv.priceEstimate)}</span></div>
            </div>
          </div>
        </article>
      `,
    });
  }

  // -------------------------------------------------------------
  // 8. Guides Listing & Detail Pages
  // -------------------------------------------------------------
  routesToPrerender.push({
    path: '/guides',
    title: 'Editorial Guides, Discretion & Safety | Adaah',
    description: 'Read authoritative field guides, booking etiquette, privacy guidelines, and safety protocols for consensual adult arrangements in Hyderabad.',
    canonical: `${BASE_URL}/guides`,
    h1: 'Hyderabad Companionship Guides & Etiquette',
    contentHtml: `
      <div class="max-w-7xl mx-auto px-4 py-10 space-y-8">
        <div>
          <h1 class="font-serif-display text-3xl sm:text-4xl font-bold text-[#171717]">Editorial Guides, Discretion & Safety</h1>
          <p class="text-sm text-[#5F5A52] mt-2 max-w-2xl">Field guides, dining etiquette, and privacy protocols for adult companionship in Hyderabad.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${mockGuides.map(g => `
            <article class="p-5 rounded-2xl bg-white border border-[#E6E1D8] shadow-xs space-y-2">
              <span class="text-[10px] font-bold uppercase tracking-wider text-[#C6922E]">${escapeHtml(g.category)}</span>
              <h2 class="font-serif-display font-bold text-lg text-[#171717]">${escapeHtml(g.title)}</h2>
              <p class="text-xs text-[#5F5A52]">${escapeHtml(g.excerpt)}</p>
              <a href="/guides/${g.slug}" class="inline-block text-xs font-bold text-[#C6922E] hover:underline">Read Article →</a>
            </article>
          `).join('')}
        </div>
      </div>
    `,
  });

  for (const guide of mockGuides) {
    routesToPrerender.push({
      path: `/guides/${guide.slug}`,
      title: `${guide.title} | Adaah`,
      description: escapeHtml(guide.excerpt),
      canonical: `${BASE_URL}/guides/${guide.slug}`,
      ogType: 'article',
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: guide.title,
          description: guide.excerpt,
          datePublished: guide.publishedAt,
          author: {
            '@type': 'Person',
            name: guide.author?.name || 'Editorial Team',
          },
          publisher: {
            '@type': 'Organization',
            name: SEO_CONFIG.siteName,
            logo: {
              '@type': 'ImageObject',
              url: SEO_CONFIG.organization.logo,
            },
          },
        },
      ],
      h1: guide.title,
      contentHtml: `
        <article class="max-w-3xl mx-auto px-4 py-10 space-y-6">
          <nav aria-label="Breadcrumb" class="text-xs text-[#5F5A52]">
            <a href="/" class="hover:text-[#C6922E]">Home</a> / <a href="/guides" class="hover:text-[#C6922E]">Guides</a> / <span class="text-[#171717] font-semibold">${escapeHtml(guide.title)}</span>
          </nav>
          <div>
            <span class="text-xs font-bold text-[#C6922E] uppercase tracking-wider">${escapeHtml(guide.category)} • ${guide.readTime}</span>
            <h1 class="font-serif-display text-2xl sm:text-3xl font-bold text-[#171717] mt-2">${escapeHtml(guide.title)}</h1>
            <p class="text-xs text-[#5F5A52] mt-1">Published by ${escapeHtml(guide.author?.name || 'Concierge Team')} on ${guide.publishedAt}</p>
          </div>
          <div class="prose prose-sm text-[#171717] leading-relaxed space-y-4 pt-4 border-t border-[#E6E1D8]">
            <p>${escapeHtml(guide.excerpt)}</p>
            <div>${guide.content.replace(/\n\n/g, '</p><p class="mt-4">').replace(/### (.*?)\n/g, '<h3 class="font-bold text-base mt-6 mb-2">$1</h3>')}</div>
          </div>
        </article>
      `,
    });
  }

  // -------------------------------------------------------------
  // 9. Static Legal, About, Contact & Support Pages
  // -------------------------------------------------------------
  routesToPrerender.push({
    path: '/about',
    title: 'About Adaah — Hyderabad 18+ Private Directory',
    description: 'Learn about Adaah founding mission to provide a refined, discreet, transparent 18+ adult companion directory focused on Hyderabad, India.',
    canonical: `${BASE_URL}/about`,
    h1: 'About Adaah Directory',
    contentHtml: `
      <div class="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <h1 class="font-serif-display text-3xl font-bold text-[#171717]">About Adaah Directory</h1>
        <p class="text-sm text-[#5F5A52] leading-relaxed">
          Adaah was founded to bring discretion, transparency, and dignity to adult companionship directories in Hyderabad. We provide self-represented profiles with clear honorariums, direct communication, and strict 18+ compliance.
        </p>
      </div>
    `,
  });

  routesToPrerender.push({
    path: '/contact',
    title: 'Confidential Concierge Desk & Inquiries | Adaah',
    description: 'Contact our private concierge desk for discreet platform inquiries, companion verification questions, or Hyderabad directory assistance.',
    canonical: `${BASE_URL}/contact`,
    h1: 'Confidential Concierge Desk',
    contentHtml: `
      <div class="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <h1 class="font-serif-display text-3xl font-bold text-[#171717]">Confidential Concierge Desk</h1>
        <p class="text-sm text-[#5F5A52] leading-relaxed">
          Direct inquiries regarding companion verification, directory listings, or assistance across Hyderabad may be placed via WhatsApp or confidential telephone.
        </p>
      </div>
    `,
  });

  routesToPrerender.push({
    path: '/faq',
    title: 'Frequently Asked Questions & Support | Adaah',
    description: 'Clear answers regarding 18+ verification, photo authenticity, booking procedures, discretion protocols, and patron privacy in Hyderabad.',
    canonical: `${BASE_URL}/faq`,
    h1: 'Frequently Asked Questions',
    contentHtml: `
      <div class="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <h1 class="font-serif-display text-3xl font-bold text-[#171717]">Frequently Asked Questions</h1>
        <p class="text-sm text-[#5F5A52] leading-relaxed">
          Answers to common questions regarding independent bookings, privacy protocols, hotel suite outcalls, and adult directory policies.
        </p>
      </div>
    `,
  });

  routesToPrerender.push({
    path: '/safety',
    title: 'Safety, Trust & Discretion Protocols | Adaah',
    description: 'Our commitments to 18+ verification, anti-trafficking enforcement, strict hygiene benchmarks, and patron anonymity in Hyderabad.',
    canonical: `${BASE_URL}/safety`,
    h1: 'Safety, Trust & Discretion Protocols',
    contentHtml: `
      <div class="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <h1 class="font-serif-display text-3xl font-bold text-[#171717]">Safety, Trust & Discretion Protocols</h1>
        <p class="text-sm text-[#5F5A52] leading-relaxed">
          We maintain zero tolerance for non-consensual activities or under-age participation. All listings represent consenting adults aged 18 and older.
        </p>
      </div>
    `,
  });

  routesToPrerender.push({
    path: '/terms',
    title: 'Terms of Service (18+ Mandatory) | Adaah',
    description: 'Legal terms governing user conduct, 18+ age requirement, independent directory listings, and platform policies.',
    canonical: `${BASE_URL}/terms`,
    h1: 'Terms of Service',
    contentHtml: `
      <div class="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <h1 class="font-serif-display text-3xl font-bold text-[#171717]">Terms of Service</h1>
        <p class="text-sm text-[#5F5A52] leading-relaxed">
          By accessing Adaah, you affirm under penalty of perjury that you are of legal adult age (18+) in your jurisdiction and consent to viewing directory listings.
        </p>
      </div>
    `,
  });

  routesToPrerender.push({
    path: '/privacy',
    title: 'Privacy Policy & Discretion Pledge | Adaah',
    description: 'How Adaah protects patron privacy, enforces non-retention data standards, and ensures confidential browsing.',
    canonical: `${BASE_URL}/privacy`,
    h1: 'Privacy Policy & Discretion Pledge',
    contentHtml: `
      <div class="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <h1 class="font-serif-display text-3xl font-bold text-[#171717]">Privacy Policy & Discretion Pledge</h1>
        <p class="text-sm text-[#5F5A52] leading-relaxed">
          Adaah implements zero-knowledge browsing logs, minimal transient cache storage, and strict patron anonymity policies.
        </p>
      </div>
    `,
  });

  // -------------------------------------------------------------
  // 10. Dedicated 404 Not Found Page (dist/404.html)
  // -------------------------------------------------------------
  routesToPrerender.push({
    path: '/404.html',
    title: 'Page Not Found (404) | Adaah',
    description: 'The requested page could not be located on Adaah directory.',
    isNoindex: true,
    h1: 'Page Not Found',
    contentHtml: `
      <div class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-4">
        <span class="text-4xl font-serif-display font-bold text-[#C6922E]">404</span>
        <h1 class="font-serif-display text-2xl sm:text-3xl font-bold text-[#171717]">Page Not Found</h1>
        <p class="text-xs sm:text-sm text-[#5F5A52] max-w-md">
          The requested page or listing could not be found. Please check the URL or browse our directory corridors.
        </p>
        <div class="pt-4 flex flex-wrap items-center justify-center gap-3">
          <a href="/" class="px-5 py-2.5 rounded-xl bg-[#C6922E] text-white text-xs font-bold hover:bg-[#A8751F] transition-all">
            Return to Homepage
          </a>
          <a href="/profiles" class="px-5 py-2.5 rounded-xl bg-white border border-[#E6E1D8] text-[#171717] text-xs font-semibold hover:border-[#C6922E] transition-all">
            Browse Profiles
          </a>
          <a href="/locations" class="px-5 py-2.5 rounded-xl bg-white border border-[#E6E1D8] text-[#171717] text-xs font-semibold hover:border-[#C6922E] transition-all">
            Hyderabad Locations
          </a>
        </div>
      </div>
    `,
  });

  // Write all pages to disk
  let generatedCount = 0;
  for (const route of routesToPrerender) {
    const renderedHtml = buildRouteHtml(route, templateHtml);
    let targetFilePath: string;

    if (route.path === '/') {
      targetFilePath = path.join(distDir, 'index.html');
      fs.writeFileSync(targetFilePath, renderedHtml, 'utf8');
    } else if (route.path === '/404.html') {
      targetFilePath = path.join(distDir, '404.html');
      fs.writeFileSync(targetFilePath, renderedHtml, 'utf8');
    } else {
      const cleanRoute = route.path.replace(/^\//, '');
      const routeDir = path.join(distDir, cleanRoute);
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      targetFilePath = path.join(routeDir, 'index.html');
      fs.writeFileSync(targetFilePath, renderedHtml, 'utf8');

      // Also write clean .html file for universal hosting compatibility
      const cleanHtmlPath = path.join(distDir, `${cleanRoute}.html`);
      const parentDir = path.dirname(cleanHtmlPath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      fs.writeFileSync(cleanHtmlPath, renderedHtml, 'utf8');
    }

    generatedCount++;
  }

  console.log(`[Prerender] Successfully generated ${generatedCount} static HTML pages in ${distDir}`);
  return generatedCount;
}

// Run if called directly via CLI
if (process.argv[1] && process.argv[1].endsWith('prerender.ts')) {
  prerenderAllRoutes().catch((err) => {
    console.error('[Prerender Error]:', err);
    process.exit(1);
  });
}
