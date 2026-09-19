import React, { useState, useEffect } from 'react';
import { Filter, X, MapPin, Tag } from 'lucide-react';
import { ProfileRepository } from '../../lib/repositories';
import { Profile, ProfileFilterParams, SortOption } from '../../types';
import { ProfileGrid } from '../profiles/ProfileGrid';
import { ProfileFilters } from '../profiles/ProfileFilters';
import { ProfileFilterDrawer } from '../profiles/ProfileFilterDrawer';
import { ProfileSort } from '../profiles/ProfileSort';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { Pagination } from '../common/Pagination';
import { SearchBar } from '../search/SearchBar';
import { mockLocations } from '../../data/locations';
import { mockCategories } from '../../data/categories';

export interface ProfilesPageViewProps {
  initialParams?: ProfileFilterParams;
  onNavigate: (href: string) => void;
  onRequestService: (profile: Profile) => void;
}

export function ProfilesPageView({
  initialParams = {},
  onNavigate,
  onRequestService,
}: ProfilesPageViewProps) {
  const [filters, setFilters] = useState<ProfileFilterParams>({
    page: 1,
    limit: 8,
    sortBy: 'recommended',
    ...initialParams,
  });

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    ProfileRepository
      .getProfiles(filters)
      .then((res) => {
        setProfiles(res.data);
        setTotalCount(res.meta.total);
        setTotalPages(res.meta.lastPage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [filters]);

  const handleFilterChange = (newFilters: ProfileFilterParams) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      page: 1,
      limit: 8,
      sortBy: 'recommended',
      locationId: 'all',
      categoryId: 'all',
      serviceId: 'all',
      query: '',
    });
  };

  const handleSortChange = (sortBy: SortOption) => {
    setFilters((prev) => ({ ...prev, sortBy, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Build active filter chips for display
  const activeChips: { key: string; label: string; onRemove: () => void }[] = [];

  if (filters.query) {
    activeChips.push({
      key: 'query',
      label: `"${filters.query}"`,
      onRemove: () => setFilters((p) => ({ ...p, query: '', page: 1 })),
    });
  }

  if (filters.locationId && filters.locationId !== 'all') {
    const loc = mockLocations.find((l) => l.id === filters.locationId);
    activeChips.push({
      key: 'location',
      label: `Area: ${loc ? loc.name : filters.locationId}`,
      onRemove: () => setFilters((p) => ({ ...p, locationId: 'all', page: 1 })),
    });
  }

  if (filters.categoryId && filters.categoryId !== 'all') {
    const cat = mockCategories.find((c) => c.id === filters.categoryId);
    activeChips.push({
      key: 'category',
      label: `Category: ${cat ? cat.name : filters.categoryId}`,
      onRemove: () => setFilters((p) => ({ ...p, categoryId: 'all', serviceId: 'all', page: 1 })),
    });
  }

  if (filters.availability) {
    activeChips.push({
      key: 'availability',
      label: `Status: ${filters.availability}`,
      onRemove: () => setFilters((p) => ({ ...p, availability: undefined, page: 1 })),
    });
  }

  if (filters.verifiedOnly) {
    activeChips.push({
      key: 'verified',
      label: '18+ Verified Only',
      onRemove: () => setFilters((p) => ({ ...p, verifiedOnly: false, page: 1 })),
    });
  }

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#171717] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[{ label: 'Directory', href: '/profiles' }]}
          onNavigate={onNavigate}
        />

        {/* Directory Page Title & Subhead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E6E1D8]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C6922E]">
              18+ Hyderabad Directory • Verified Profiles
            </span>
            <h1 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight mt-1">
              Browse Independent Companions
            </h1>
            <p className="text-xs sm:text-sm text-[#5F5A52] mt-1.5 max-w-2xl">
              Explore verified 18+ adult companion profiles with transparent rate guidelines, availability indicators, and discreet direct contact in Hyderabad.
            </p>
          </div>

          <div className="w-full md:w-80">
            <SearchBar
              initialQuery={filters.query || ''}
              placeholder="Search by name, area, category…"
              onSubmitSearch={(q) => setFilters((p) => ({ ...p, query: q, page: 1 }))}
            />
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 p-3 bg-white rounded-xl border border-[#E6E1D8] shadow-2xs">
            <span className="text-xs font-semibold text-[#5F5A52]">Active filters:</span>
            {activeChips.map((chip) => (
              <span
                key={chip.key}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F8F6F1] border border-[#E6E1D8] text-[#171717] text-xs font-medium"
              >
                <span>{chip.label}</span>
                <button
                  type="button"
                  onClick={chip.onRemove}
                  aria-label={`Remove filter ${chip.label}`}
                  className="hover:text-rose-500 cursor-pointer text-[#5F5A52]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-[#C6922E] font-semibold hover:underline ml-auto cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Main 2-Column Content Layout: Desktop Sidebar Filters + Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <ProfileFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
              />
            </div>
          </aside>

          {/* Results Column */}
          <div className="lg:col-span-3 space-y-6">
            {/* Control Bar: Mobile Filter Button, Results Count, Sorting */}
            <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E6E1D8] shadow-2xs">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F8F6F1] text-[#171717] border border-[#E6E1D8] text-xs font-semibold cursor-pointer"
                >
                  <Filter className="h-4 w-4 text-[#C6922E]" />
                  <span>Filters {activeChips.length > 0 && `(${activeChips.length})`}</span>
                </button>

                <span className="text-xs sm:text-sm font-semibold text-[#5F5A52]">
                  Showing <strong className="text-[#171717] font-serif-display font-bold">{totalCount}</strong> verified{' '}
                  {totalCount === 1 ? 'companion' : 'companions'}
                </span>
              </div>

              <ProfileSort
                value={filters.sortBy || 'recommended'}
                onChange={handleSortChange}
              />
            </div>

            {/* Profile Grid */}
            <ProfileGrid
              profiles={profiles}
              isLoading={isLoading}
              onViewProfile={(slug) => onNavigate(`/profiles/${slug}`)}
              onRequestService={onRequestService}
              onResetFilters={handleResetFilters}
            />

            {/* Pagination Controls */}
            <Pagination
              currentPage={filters.page || 1}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>

        {/* Quick Location & Category Links at bottom */}
        <div className="pt-12 mt-12 border-t border-[#E6E1D8] space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-[#C6922E]">
              <MapPin className="w-4 h-4" />
              <span>Browse by Hyderabad Area</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {mockLocations.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => onNavigate(`/locations/${loc.slug}`)}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#F3F0E9] border border-[#E6E1D8] text-[#171717] hover:text-[#C6922E] hover:border-[#C6922E] text-xs font-medium transition-colors cursor-pointer shadow-2xs"
                >
                  {loc.name} ({loc.profileCount})
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-[#C6922E]">
              <Tag className="w-4 h-4" />
              <span>Browse by Category</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {mockCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onNavigate(`/categories/${cat.slug}`)}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#F3F0E9] border border-[#E6E1D8] text-[#171717] hover:text-[#C6922E] hover:border-[#C6922E] text-xs font-medium transition-colors cursor-pointer shadow-2xs"
                >
                  {cat.name} ({cat.profileCount})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <ProfileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
        totalResults={totalCount}
      />
    </div>
  );
}
