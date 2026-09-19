import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { SortOption } from '../../types';

export interface ProfileSortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
}

export function ProfileSort({ value, onChange, className = '' }: ProfileSortProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <ArrowUpDown className="h-4 w-4 text-stone-400 shrink-0" />
      <span className="text-xs font-semibold text-stone-500 shrink-0 hidden sm:inline">
        Sort by:
      </span>
      <select
        id="profile-sort-select"
        aria-label="Sort directory by"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="h-10 rounded-xl border border-stone-300 bg-white px-3 py-1 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer shadow-2xs"
      >
        <option value="recommended">Recommended & Featured</option>
        <option value="rating_desc">Highest Rated</option>
        <option value="newest">Most Experienced</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
  );
}
