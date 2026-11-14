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
    <div className={`flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto ${className}`}>
      <div className="flex items-center gap-1.5 shrink-0">
        <ArrowUpDown className="h-4 w-4 text-[#8C827A] shrink-0" />
        <span className="text-xs font-semibold text-[#5F5A52] shrink-0">
          Sort:
        </span>
      </div>
      <select
        id="profile-sort-select"
        aria-label="Sort directory by"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="h-10 rounded-xl border border-[#E6E1D8] bg-white px-3 py-1 text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#C6922E] cursor-pointer shadow-2xs flex-1 sm:flex-initial"
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
