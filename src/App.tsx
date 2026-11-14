import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ToastProvider } from './components/common/Toast';
import { AgeGateModal } from './components/common/AgeGateModal';
import { SeoManager } from './components/common/SeoManager';
import { GoogleAnalytics } from './components/common/GoogleAnalytics';
import { StickyMobileCta } from './components/layout/StickyMobileCta';
import { HomePageView } from './components/views/HomePageView';

// Route-level code-splitting (lazy loading sub-views and modals for optimal initial mobile bundle)
const ProfilesPageView = lazy(() => import('./components/views/ProfilesPageView').then(m => ({ default: m.ProfilesPageView })));
const ProfileDetailPageView = lazy(() => import('./components/views/ProfileDetailPageView').then(m => ({ default: m.ProfileDetailPageView })));
const LocationsPageView = lazy(() => import('./components/views/LocationsPageView').then(m => ({ default: m.LocationsPageView })));
const LocationDetailPageView = lazy(() => import('./components/views/LocationDetailPageView').then(m => ({ default: m.LocationDetailPageView })));
const CategoriesPageView = lazy(() => import('./components/views/CategoriesPageView').then(m => ({ default: m.CategoriesPageView })));
const CategoryDetailPageView = lazy(() => import('./components/views/CategoryDetailPageView').then(m => ({ default: m.CategoryDetailPageView })));
const ServicesPageView = lazy(() => import('./components/views/ServicesPageView').then(m => ({ default: m.ServicesPageView })));
const ServiceDetailPageView = lazy(() => import('./components/views/ServiceDetailPageView').then(m => ({ default: m.ServiceDetailPageView })));
const FaqPageView = lazy(() => import('./components/views/FaqPageView').then(m => ({ default: m.FaqPageView })));
const BlogPageView = lazy(() => import('./components/views/BlogPageView').then(m => ({ default: m.BlogPageView })));
const BlogPostPageView = lazy(() => import('./components/views/BlogPostPageView').then(m => ({ default: m.BlogPostPageView })));
const SafetyPageView = lazy(() => import('./components/views/SafetyPageView').then(m => ({ default: m.SafetyPageView })));
const AboutPageView = lazy(() => import('./components/views/AboutPageView').then(m => ({ default: m.AboutPageView })));
const ContactPageView = lazy(() => import('./components/views/ContactPageView').then(m => ({ default: m.ContactPageView })));
const TermsPageView = lazy(() => import('./components/views/TermsPageView').then(m => ({ default: m.TermsPageView })));
const PrivacyPageView = lazy(() => import('./components/views/PrivacyPageView').then(m => ({ default: m.PrivacyPageView })));
const NotFoundPageView = lazy(() => import('./components/views/NotFoundPageView').then(m => ({ default: m.NotFoundPageView })));

const SearchModal = lazy(() => import('./components/search/SearchModal').then(m => ({ default: m.SearchModal })));
const RequestModal = lazy(() => import('./components/booking/RequestModal').then(m => ({ default: m.RequestModal })));

import { Profile, Service, SearchSuggestionItem } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [queryString, setQueryString] = useState<string>(() => {
    return window.location.search || '';
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Sync with browser popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      setQueryString(window.location.search || '');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global navigation handler
  const navigate = (href: string) => {
    const [path, qs] = href.split('?');
    setCurrentPath(path || '/');
    setQueryString(qs ? `?${qs}` : '');
    window.history.pushState({}, '', href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenServiceRequest = (profile?: Profile, service?: Service) => {
    setSelectedProfile(profile || null);
    setSelectedService(service || null);
    setIsRequestOpen(true);
  };

  const handleSelectSuggestion = (item: SearchSuggestionItem) => {
    switch (item.type) {
      case 'profile':
        navigate(`/profiles/${item.slug}`);
        break;
      case 'location':
        navigate(`/locations/${item.slug}`);
        break;
      case 'category':
        navigate(`/categories/${item.slug}`);
        break;
      case 'service':
        navigate(`/services/${item.slug}`);
        break;
    }
  };

  const handleSubmitSearch = (query: string) => {
    navigate(`/profiles?q=${encodeURIComponent(query)}`);
  };

  // Parse current query params
  const parseQueryParams = () => {
    const params = new URLSearchParams(queryString);
    const search = params.get('q') || undefined;
    const locationId = params.get('locationId') || undefined;
    const categoryId = params.get('categoryId') || undefined;
    const serviceId = params.get('serviceId') || undefined;
    return { search, locationId, categoryId, serviceId };
  };

  // Route matching
  const renderView = () => {
    // 1. Home
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePageView
          onNavigate={navigate}
          onRequestService={handleOpenServiceRequest}
        />
      );
    }

    // 2. Profile detail /profiles/:slug
    if (currentPath.startsWith('/profiles/')) {
      const slug = currentPath.replace('/profiles/', '').split('/')[0];
      return (
        <ProfileDetailPageView
          slug={slug}
          onNavigate={navigate}
          onRequestService={handleOpenServiceRequest}
        />
      );
    }

    // 3. Profiles directory /profiles
    if (currentPath === '/profiles') {
      const initialParams = parseQueryParams();
      return (
        <ProfilesPageView
          initialParams={initialParams}
          onNavigate={navigate}
          onRequestService={handleOpenServiceRequest}
        />
      );
    }

    // 4. Location detail /locations/:slug
    if (currentPath.startsWith('/locations/')) {
      const slug = currentPath.replace('/locations/', '').split('/')[0];
      return (
        <LocationDetailPageView
          slug={slug}
          onNavigate={navigate}
          onRequestService={handleOpenServiceRequest}
        />
      );
    }

    // 5. Locations directory /locations
    if (currentPath === '/locations') {
      return <LocationsPageView onNavigate={navigate} />;
    }

    // 6. Category detail /categories/:slug
    if (currentPath.startsWith('/categories/')) {
      const slug = currentPath.replace('/categories/', '').split('/')[0];
      return (
        <CategoryDetailPageView
          slug={slug}
          onNavigate={navigate}
          onRequestService={handleOpenServiceRequest}
        />
      );
    }

    // 7. Categories directory /categories
    if (currentPath === '/categories') {
      return <CategoriesPageView onNavigate={navigate} />;
    }

    // 8. Service detail /services/:slug
    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '').split('/')[0];
      return (
        <ServiceDetailPageView
          slug={slug}
          onNavigate={navigate}
          onRequestService={handleOpenServiceRequest}
        />
      );
    }

    // 9. Services directory /services
    if (currentPath === '/services') {
      return <ServicesPageView onNavigate={navigate} />;
    }

    // 10. FAQ /faq
    if (currentPath === '/faq') {
      return (
        <FaqPageView
          onNavigate={navigate}
          onContactSupport={() => navigate('/contact')}
        />
      );
    }

    // 11. Guides / Blog article detail /guides/:slug or /blog/:slug
    if (currentPath.startsWith('/guides/') || currentPath.startsWith('/blog/')) {
      const slug = (currentPath.startsWith('/guides/')
        ? currentPath.replace('/guides/', '')
        : currentPath.replace('/blog/', '')
      ).split('/')[0];
      return <BlogPostPageView slug={slug} onNavigate={navigate} />;
    }

    // 12. Guides / Blog directory /guides or /blog
    if (currentPath === '/guides' || currentPath === '/blog') {
      return <BlogPageView onNavigate={navigate} />;
    }

    // 13. Safety / Safety guidelines /safety
    if (currentPath === '/safety') {
      return (
        <SafetyPageView
          onNavigate={navigate}
          onContactSupport={() => navigate('/contact')}
        />
      );
    }

    // 14. About /about
    if (currentPath === '/about') {
      return <AboutPageView onNavigate={navigate} />;
    }

    // 15. Contact / Concierge Desk /contact
    if (currentPath === '/contact') {
      return <ContactPageView onNavigate={navigate} />;
    }

    // 16. Terms of service /terms
    if (currentPath === '/terms') {
      return <TermsPageView onNavigate={navigate} />;
    }

    // 17. Privacy policy /privacy
    if (currentPath === '/privacy') {
      return <PrivacyPageView onNavigate={navigate} />;
    }

    // 18. 404 Fallback for unmatched routes
    return (
      <NotFoundPageView
        onNavigate={navigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    );
  };

  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col bg-[#F8F6F1] text-[#171717] selection:bg-[#C6922E]/30 selection:text-[#171717] font-sans antialiased">
        {/* Dynamic SEO, Meta & Structured Data */}
        <SeoManager currentPath={currentPath} />
        <GoogleAnalytics currentPath={currentPath} />

        {/* Global Navigation Header */}
        <Header
          currentPath={currentPath}
          onNavigate={navigate}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenInquiry={() => handleOpenServiceRequest()}
        />

        {/* Dynamic View Router */}
        <main className="flex-1 pb-16 md:pb-0">
          <Suspense
            fallback={
              <div className="min-h-[50vh] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-[#C6922E] border-t-transparent animate-spin" />
              </div>
            }
          >
            {renderView()}
          </Suspense>
        </main>

        {/* Global Footer */}
        <Footer onNavigate={navigate} />

        {/* Sticky Mobile Contact Actions & Floating Desktop WhatsApp */}
        <StickyMobileCta />

        {/* 18+ Verification Age Gate Modal */}
        <AgeGateModal />

        {/* Global Command+K Search Modal (lazy loaded on demand) */}
        {isSearchOpen && (
          <Suspense fallback={null}>
            <SearchModal
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              onSelectSuggestion={handleSelectSuggestion}
              onSubmitSearch={handleSubmitSearch}
            />
          </Suspense>
        )}

        {/* Global Service / Companion Request Modal (lazy loaded on demand) */}
        {isRequestOpen && (
          <Suspense fallback={null}>
            <RequestModal
              isOpen={isRequestOpen}
              onClose={() => {
                setIsRequestOpen(false);
                setSelectedProfile(null);
                setSelectedService(null);
              }}
              initialProfile={selectedProfile}
              initialService={selectedService}
            />
          </Suspense>
        )}
      </div>
    </ToastProvider>
  );
}
