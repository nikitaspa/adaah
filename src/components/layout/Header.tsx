import React, { useState, useRef, useEffect } from 'react';
import { Search, Menu, X, ChevronDown, Sparkles, Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { CallButton } from '../common/CallButton';

export interface HeaderProps {
  currentPath?: string;
  onNavigate?: (href: string) => void;
  onOpenSearch?: () => void;
  onOpenInquiry?: () => void;
}

export function Header({
  currentPath = '/',
  onNavigate,
  onOpenSearch,
  onOpenInquiry,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);

  const categoriesRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false);
      }
      if (locationsRef.current && !locationsRef.current.contains(e.target as Node)) {
        setLocationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setCategoriesOpen(false);
    setLocationsOpen(false);
    onNavigate?.(href);
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Profiles', href: '/profiles' },
    { label: 'Services', href: '/services' },
    { label: 'Guides', href: '/guides' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* SECTION 1: TOP BAR */}
      <div
        id="top-announcement-bar"
        className="w-full bg-[#F3F0E9] border-b border-[#E6E1D8] px-4 sm:px-6 lg:px-8 py-2 text-xs text-[#5F5A52]"
      >
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded font-bold text-[10px] bg-[#C6922E]/15 text-[#916718] border border-[#C6922E]/30">
              18+ ONLY
            </span>
            <span className="font-medium text-[#5F5A52]">Adults Only Directory | Hyderabad, India</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="hover:text-[#C6922E] font-medium transition-colors"
            >
              Contact: <span className="font-semibold text-[#171717]">{siteConfig.contact.phone}</span>
            </a>
            <span className="text-[#D0C9BD]">|</span>
            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:text-[#20BA5A] font-medium transition-colors flex items-center gap-1"
            >
              <span>WhatsApp</span>
            </a>
            <span className="hidden md:inline text-[#D0C9BD]">|</span>
            <span className="hidden md:inline text-[#5F5A52]">Discreet & Confidential</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: MAIN HEADER */}
      <header
        id="main-site-header"
        className="sticky top-0 z-40 w-full border-b border-[#E6E1D8] bg-[#FFFFFF]/95 backdrop-blur-md transition-all text-[#171717] shadow-xs"
      >
        <div className="mx-auto flex h-18 md:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-6 xl:gap-8">
            <a
              id="header-logo-link"
              href="/"
              onClick={(e) => handleNavClick(e, '/')}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#F8F6F1] border border-[#C6922E]/40 text-[#C6922E] shadow-2xs group-hover:border-[#C6922E] transition-colors">
                <span className="font-serif-display font-bold text-xl text-[#C6922E]">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-tight text-[#171717] leading-none group-hover:text-[#C6922E] transition-colors">
                  {siteConfig.name}
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5" aria-label="Main Navigation">
              {/* Home */}
              <a
                id="nav-link-home"
                href="/"
                onClick={(e) => handleNavClick(e, '/')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${currentPath === '/' || currentPath === ''
                  ? 'text-[#C6922E] font-semibold border-b-2 border-[#C6922E] rounded-b-none'
                  : 'text-[#5F5A52] hover:text-[#171717] hover:bg-[#F8F6F1]'
                  }`}
              >
                Home
              </a>

              {/* Profiles link */}
              <a
                id="nav-link-profiles"
                href="/profiles"
                onClick={(e) => handleNavClick(e, '/profiles')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${currentPath === '/profiles'
                  ? 'text-[#C6922E] font-semibold border-b-2 border-[#C6922E] rounded-b-none'
                  : 'text-[#5F5A52] hover:text-[#171717] hover:bg-[#F8F6F1]'
                  }`}
              >
                Profiles
              </a>

              {/* Categories Dropdown */}
              <div className="relative" ref={categoriesRef}>
                <button
                  id="nav-dropdown-categories"
                  type="button"
                  onClick={() => {
                    setCategoriesOpen(!categoriesOpen);
                    setLocationsOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 cursor-pointer ${currentPath.startsWith('/categories') || categoriesOpen
                    ? 'text-[#C6922E] font-semibold'
                    : 'text-[#5F5A52] hover:text-[#171717] hover:bg-[#F8F6F1]'
                    }`}
                >
                  <span>Categories</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoriesOpen ? 'rotate-180 text-[#C6922E]' : 'text-[#8C827A]'}`} />
                </button>

                {categoriesOpen && (
                  <div
                    id="categories-dropdown-menu"
                    className="absolute left-0 mt-2 w-64 rounded-2xl bg-white border border-[#E6E1D8] shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
                  >
                    <div className="px-3 py-1.5 text-[11px] font-bold text-[#8C827A] uppercase tracking-wider">
                      Categories
                    </div>
                    {siteConfig.navigation.categoriesDropdown.map((cat) => (
                      <a
                        key={cat.href}
                        href={cat.href}
                        onClick={(e) => handleNavClick(e, cat.href)}
                        className="block px-3 py-2 rounded-xl text-sm text-[#171717] hover:text-[#C6922E] hover:bg-[#F8F6F1] transition-colors font-medium"
                      >
                        {cat.title}
                      </a>
                    ))}
                    <div className="border-t border-[#E6E1D8] mt-1 pt-1">
                      <a
                        href="/categories"
                        onClick={(e) => handleNavClick(e, '/categories')}
                        className="block px-3 py-1.5 text-xs text-[#C6922E] hover:text-[#A8751F] font-semibold"
                      >
                        View All Categories →
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Locations Dropdown */}
              <div className="relative" ref={locationsRef}>
                <button
                  id="nav-dropdown-locations"
                  type="button"
                  onClick={() => {
                    setLocationsOpen(!locationsOpen);
                    setCategoriesOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 cursor-pointer ${currentPath.startsWith('/locations') || locationsOpen
                    ? 'text-[#C6922E] font-semibold'
                    : 'text-[#5F5A52] hover:text-[#171717] hover:bg-[#F8F6F1]'
                    }`}
                >
                  <span>Locations</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${locationsOpen ? 'rotate-180 text-[#C6922E]' : 'text-[#8C827A]'}`} />
                </button>

                {locationsOpen && (
                  <div
                    id="locations-dropdown-menu"
                    className="absolute left-0 mt-2 w-72 rounded-2xl bg-white border border-[#E6E1D8] shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
                  >
                    <div className="px-3 py-1.5 text-[11px] font-bold text-[#8C827A] uppercase tracking-wider">
                      Hyderabad Locations
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {siteConfig.navigation.locationsDropdown.map((loc) => (
                        <a
                          key={loc.href}
                          href={loc.href}
                          onClick={(e) => handleNavClick(e, loc.href)}
                          className="block px-3 py-2 rounded-xl text-sm text-[#171717] hover:text-[#C6922E] hover:bg-[#F8F6F1] transition-colors font-medium"
                        >
                          {loc.title}
                        </a>
                      ))}
                    </div>
                    <div className="border-t border-[#E6E1D8] mt-1 pt-1">
                      <a
                        href="/locations"
                        onClick={(e) => handleNavClick(e, '/locations')}
                        className="block px-3 py-1.5 text-xs text-[#C6922E] hover:text-[#A8751F] font-semibold"
                      >
                        All Hyderabad Areas →
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Services */}
              <a
                id="nav-link-services"
                href="/services"
                onClick={(e) => handleNavClick(e, '/services')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${currentPath === '/services'
                  ? 'text-[#C6922E] font-semibold border-b-2 border-[#C6922E] rounded-b-none'
                  : 'text-[#5F5A52] hover:text-[#171717] hover:bg-[#F8F6F1]'
                  }`}
              >
                Services
              </a>

              {/* Guides */}
              <a
                id="nav-link-guides"
                href="/guides"
                onClick={(e) => handleNavClick(e, '/guides')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${currentPath.startsWith('/guides')
                  ? 'text-[#C6922E] font-semibold border-b-2 border-[#C6922E] rounded-b-none'
                  : 'text-[#5F5A52] hover:text-[#171717] hover:bg-[#F8F6F1]'
                  }`}
              >
                Guides
              </a>

              {/* FAQ */}
              <a
                id="nav-link-faq"
                href="/faq"
                onClick={(e) => handleNavClick(e, '/faq')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${currentPath === '/faq'
                  ? 'text-[#C6922E] font-semibold border-b-2 border-[#C6922E] rounded-b-none'
                  : 'text-[#5F5A52] hover:text-[#171717] hover:bg-[#F8F6F1]'
                  }`}
              >
                FAQ
              </a>

              {/* Contact */}
              <a
                id="nav-link-contact"
                href="/contact"
                onClick={(e) => handleNavClick(e, '/contact')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${currentPath === '/contact'
                  ? 'text-[#C6922E] font-semibold border-b-2 border-[#C6922E] rounded-b-none'
                  : 'text-[#5F5A52] hover:text-[#171717] hover:bg-[#F8F6F1]'
                  }`}
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick search modal trigger */}
            <button
              id="header-search-trigger"
              type="button"
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 h-10 px-3 md:px-3.5 rounded-xl border border-[#E6E1D8] bg-[#F8F6F1] text-[#5F5A52] hover:text-[#171717] hover:border-[#C6922E] hover:bg-white transition-all text-xs md:text-sm cursor-pointer shadow-2xs"
              aria-label="Open directory search"
            >
              <Search className="h-4 w-4 text-[#C6922E]" />
              <span className="hidden md:inline font-medium">Search…</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-[#8C827A] bg-white border border-[#E6E1D8] rounded">
                ⌘K
              </kbd>
            </button>

            {/* Primary Action Button 1: WhatsApp */}
            <WhatsAppButton
              size="sm"
              className="hidden sm:inline-flex"
            />

            {/* Primary Action Button 2: Call Now */}
            <CallButton
              size="sm"
              className="hidden sm:inline-flex"
            />

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#171717] hover:bg-[#F3F0E9] active:bg-[#E6E1D8] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="lg:hidden border-t border-[#E6E1D8] bg-white px-4 pt-3 pb-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-xl"
          >
            {/* Mobile quick actions */}
            <div className="grid grid-cols-2 gap-2 pt-1 pb-2 border-b border-[#E6E1D8]">
              <WhatsAppButton size="md" fullWidth />
              <CallButton size="md" fullWidth />
            </div>

            <div className="flex flex-col space-y-1">
              <a
                href="/"
                onClick={(e) => handleNavClick(e, '/')}
                className="px-3 py-3 rounded-xl text-base font-semibold text-[#171717] hover:bg-[#F8F6F1] flex items-center min-h-[44px]"
              >
                Home
              </a>
              <a
                href="/profiles"
                onClick={(e) => handleNavClick(e, '/profiles')}
                className="px-3 py-3 rounded-xl text-base font-semibold text-[#171717] hover:bg-[#F8F6F1] flex items-center justify-between min-h-[44px]"
              >
                <span>Browse Profiles</span>
                <span className="text-xs bg-[#C6922E]/15 text-[#916718] font-bold px-2 py-0.5 rounded-full">18+</span>
              </a>

              {/* Mobile Categories */}
              <div className="border-t border-[#E6E1D8] pt-3">
                <div className="px-3 py-1 text-xs font-bold text-[#8C827A] uppercase tracking-wider">
                  Categories
                </div>
                <div className="grid grid-cols-2 gap-1.5 mt-1">
                  {siteConfig.navigation.categoriesDropdown.map((cat) => (
                    <a
                      key={cat.href}
                      href={cat.href}
                      onClick={(e) => handleNavClick(e, cat.href)}
                      className="px-3 py-2.5 rounded-lg text-sm text-[#5F5A52] hover:text-[#C6922E] hover:bg-[#F8F6F1] flex items-center min-h-[40px] font-medium"
                    >
                      {cat.title}
                    </a>
                  ))}
                </div>
              </div>

              {/* Mobile Locations */}
              <div className="border-t border-[#E6E1D8] pt-3">
                <div className="px-3 py-1 text-xs font-bold text-[#8C827A] uppercase tracking-wider">
                  Hyderabad Locations
                </div>
                <div className="grid grid-cols-2 gap-1.5 mt-1">
                  {siteConfig.navigation.locationsDropdown.map((loc) => (
                    <a
                      key={loc.href}
                      href={loc.href}
                      onClick={(e) => handleNavClick(e, loc.href)}
                      className="px-3 py-2.5 rounded-lg text-sm text-[#5F5A52] hover:text-[#C6922E] hover:bg-[#F8F6F1] flex items-center min-h-[40px] font-medium"
                    >
                      {loc.title}
                    </a>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#E6E1D8] pt-3 flex flex-col space-y-1">
                <a
                  href="/services"
                  onClick={(e) => handleNavClick(e, '/services')}
                  className="px-3 py-2.5 rounded-xl text-sm font-medium text-[#5F5A52] hover:bg-[#F8F6F1] flex items-center min-h-[44px]"
                >
                  Services
                </a>
                <a
                  href="/guides"
                  onClick={(e) => handleNavClick(e, '/guides')}
                  className="px-3 py-2.5 rounded-xl text-sm font-medium text-[#5F5A52] hover:bg-[#F8F6F1] flex items-center min-h-[44px]"
                >
                  Guides & Etiquette
                </a>
                <a
                  href="/safety"
                  onClick={(e) => handleNavClick(e, '/safety')}
                  className="px-3 py-2.5 rounded-xl text-sm font-medium text-[#C6922E] hover:bg-[#F8F6F1] flex items-center min-h-[44px]"
                >
                  Safety & Discretion
                </a>
                <a
                  href="/faq"
                  onClick={(e) => handleNavClick(e, '/faq')}
                  className="px-3 py-2.5 rounded-xl text-sm font-medium text-[#5F5A52] hover:bg-[#F8F6F1] flex items-center min-h-[44px]"
                >
                  FAQ
                </a>
                <a
                  href="/contact"
                  onClick={(e) => handleNavClick(e, '/contact')}
                  className="px-3 py-2.5 rounded-xl text-sm font-medium text-[#5F5A52] hover:bg-[#F8F6F1] flex items-center min-h-[44px]"
                >
                  Contact Concierge
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
