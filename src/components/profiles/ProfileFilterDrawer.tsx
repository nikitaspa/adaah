import React from 'react';
import { X } from 'lucide-react';
import { ProfileFilterParams } from '../../types';
import { ProfileFilters } from './ProfileFilters';
import { Button } from '../common/Button';

export interface ProfileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ProfileFilterParams;
  onChange: (filters: ProfileFilterParams) => void;
  onReset: () => void;
  totalResults: number;
}

export function ProfileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onChange,
  onReset,
  totalResults,
}: ProfileFilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col justify-end sm:hidden animate-in fade-in duration-200"
    >
      <div
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-h-[85vh] rounded-t-3xl bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 shrink-0">
          <div>
            <h3 className="text-base font-bold text-stone-900">Filter Directory</h3>
            <p className="text-xs text-stone-500">{totalResults} verified matches</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 bg-stone-100 cursor-pointer"
            aria-label="Close filters"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Filters Content */}
        <div className="p-4 overflow-y-auto flex-1">
          <ProfileFilters
            filters={filters}
            onChange={onChange}
            onReset={onReset}
            className="border-0 shadow-none p-0"
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 shrink-0">
          <Button variant="primary" size="lg" onClick={onClose} className="w-full justify-center">
            View {totalResults} {totalResults === 1 ? 'Profile' : 'Profiles'}
          </Button>
        </div>
      </div>
    </div>
  );
}
