import React from 'react';
import { Filter, RotateCcw, ShieldCheck } from 'lucide-react';
import { ProfileFilterParams } from '../../types';
import { mockLocations } from '../../data/locations';
import { mockCategories } from '../../data/categories';
import { mockServices } from '../../data/services';
import { formatCurrency } from '../../utils/formatters';

export interface ProfileFiltersProps {
  filters: ProfileFilterParams;
  onChange: (filters: ProfileFilterParams) => void;
  onReset: () => void;
  className?: string;
}

export function ProfileFilters({
  filters,
  onChange,
  onReset,
  className = '',
}: ProfileFiltersProps) {
  const handleLocationChange = (locationId: string) => {
    onChange({ ...filters, locationId, page: 1 });
  };

  const handleCategoryChange = (categoryId: string) => {
    onChange({ ...filters, categoryId, serviceId: 'all', page: 1 });
  };

  const handleServiceChange = (serviceId: string) => {
    onChange({ ...filters, serviceId, page: 1 });
  };

  const handleAvailabilityChange = (status: any) => {
    onChange({ ...filters, availability: status === 'all' ? undefined : status, page: 1 });
  };

  const handlePriceChange = (maxPrice: number) => {
    onChange({ ...filters, maxPrice, page: 1 });
  };

  const handleAgeChange = (maxAge: number) => {
    onChange({ ...filters, minAge: 18, maxAge, page: 1 });
  };

  const handleLanguageChange = (language: string) => {
    onChange({ ...filters, language, page: 1 });
  };

  const handleVerifiedToggle = (verifiedOnly: boolean) => {
    onChange({ ...filters, verifiedOnly, page: 1 });
  };

  const filteredServices =
    filters.categoryId && filters.categoryId !== 'all'
      ? mockServices.filter((s) => s.categoryId === filters.categoryId)
      : mockServices;

  return (
    <div
      id="directory-filter-panel"
      className={`space-y-5 bg-white p-5 rounded-2xl border border-[#E6E1D8] shadow-2xs text-[#171717] ${className}`}
    >
      <div className="flex items-center justify-between pb-3 border-b border-[#E6E1D8]">
        <div className="flex items-center gap-2 text-[#171717] font-bold text-sm">
          <Filter className="h-4 w-4 text-[#C6922E]" />
          <span>Refine Companions</span>
        </div>
        <button
          id="filter-reset-btn"
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 text-xs font-semibold text-[#5F5A52] hover:text-[#C6922E] transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Verified Only Toggle */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8]">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#171717]">
          <ShieldCheck className="h-4 w-4 text-[#C6922E]" />
          <span>18+ Verified Profiles Only</span>
        </div>
        <input
          type="checkbox"
          id="filter-verified"
          checked={!!filters.verifiedOnly}
          onChange={(e) => handleVerifiedToggle(e.target.checked)}
          className="h-4 w-4 rounded accent-[#C6922E] cursor-pointer"
        />
      </div>

      {/* Location Filter */}
      <div className="space-y-1.5">
        <label
          htmlFor="filter-location-select"
          className="text-[11px] font-bold uppercase tracking-wider text-[#916718] block"
        >
          Hyderabad Locality
        </label>
        <select
          id="filter-location-select"
          aria-label="Hyderabad Locality"
          value={filters.locationId || 'all'}
          onChange={(e) => handleLocationChange(e.target.value)}
          className="w-full h-10 rounded-xl border border-[#E6E1D8] bg-[#F8F6F1] px-3 text-xs font-medium text-[#171717] focus:outline-none focus:border-[#C6922E] cursor-pointer"
        >
          <option value="all">All Localities</option>
          {mockLocations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name} ({loc.profileCount})
            </option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div className="space-y-1.5">
        <label
          htmlFor="filter-category-select"
          className="text-[11px] font-bold uppercase tracking-wider text-[#916718] block"
        >
          Companion Category
        </label>
        <select
          id="filter-category-select"
          aria-label="Companion Category"
          value={filters.categoryId || 'all'}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full h-10 rounded-xl border border-[#E6E1D8] bg-[#F8F6F1] px-3 text-xs font-medium text-[#171717] focus:outline-none focus:border-[#C6922E] cursor-pointer"
        >
          <option value="all">All Categories</option>
          {mockCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name} ({cat.profileCount})
            </option>
          ))}
        </select>
      </div>

      {/* Service Filter */}
      <div className="space-y-1.5">
        <label
          htmlFor="filter-service-select"
          className="text-[11px] font-bold uppercase tracking-wider text-[#916718] block"
        >
          Service / Occasion
        </label>
        <select
          id="filter-service-select"
          aria-label="Service or Occasion"
          value={filters.serviceId || 'all'}
          onChange={(e) => handleServiceChange(e.target.value)}
          className="w-full h-10 rounded-xl border border-[#E6E1D8] bg-[#F8F6F1] px-3 text-xs font-medium text-[#171717] focus:outline-none focus:border-[#C6922E] cursor-pointer"
        >
          <option value="all">All Services</option>
          {filteredServices.map((srv) => (
            <option key={srv.id} value={srv.id}>
              {srv.name}
            </option>
          ))}
        </select>
      </div>

      {/* Availability Filter */}
      <div className="space-y-1.5">
        <label
          htmlFor="filter-availability-select"
          className="text-[11px] font-bold uppercase tracking-wider text-[#916718] block"
        >
          Availability Status
        </label>
        <select
          id="filter-availability-select"
          aria-label="Availability Status"
          value={filters.availability || 'all'}
          onChange={(e) => handleAvailabilityChange(e.target.value)}
          className="w-full h-10 rounded-xl border border-[#E6E1D8] bg-[#F8F6F1] px-3 text-xs font-medium text-[#171717] focus:outline-none focus:border-[#C6922E] cursor-pointer"
        >
          <option value="all">Any Availability</option>
          <option value="Available">Available Today</option>
          <option value="By Appointment">By Appointment</option>
        </select>
      </div>

      {/* Age Range Filter (18+) */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#916718]">
            Age Range (18+)
          </span>
          <span className="text-[#C6922E] font-bold text-xs">
            18 – {filters.maxAge || 35} yrs
          </span>
        </div>
        <input
          type="range"
          min={21}
          max={45}
          step={1}
          value={filters.maxAge || 35}
          onChange={(e) => handleAgeChange(Number(e.target.value))}
          className="w-full accent-[#C6922E] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#5F5A52]">
          <span>Min: 18</span>
          <span>Max: 45</span>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#916718]">
            Max Honorarium
          </span>
          <span className="text-[#C6922E] font-bold text-xs">
            {formatCurrency(filters.maxPrice || 35000)}
          </span>
        </div>
        <input
          type="range"
          min={10000}
          max={50000}
          step={2500}
          value={filters.maxPrice || 35000}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
          className="w-full accent-[#C6922E] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#5F5A52]">
          <span>₹10,000</span>
          <span>₹50,000+</span>
        </div>
      </div>

      {/* Languages Filter */}
      <div className="space-y-1.5">
        <label
          htmlFor="filter-language-select"
          className="text-[11px] font-bold uppercase tracking-wider text-[#916718] block"
        >
          Spoken Languages
        </label>
        <select
          id="filter-language-select"
          aria-label="Spoken Languages"
          value={filters.language || 'all'}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="w-full h-10 rounded-xl border border-[#E6E1D8] bg-[#F8F6F1] px-3 text-xs font-medium text-[#171717] focus:outline-none focus:border-[#C6922E] cursor-pointer"
        >
          <option value="all">All Languages</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Telugu">Telugu</option>
          <option value="French">French</option>
          <option value="Russian">Russian</option>
        </select>
      </div>
    </div>
  );
}
