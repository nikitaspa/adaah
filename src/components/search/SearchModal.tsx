import React, { useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { SearchSuggestionItem } from '../../types';
import { X, Search } from 'lucide-react';

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSuggestion: (item: SearchSuggestionItem) => void;
  onSubmitSearch: (query: string) => void;
}

export function SearchModal({
  isOpen,
  onClose,
  onSelectSuggestion,
  onSubmitSearch,
}: SearchModalProps) {
  // Global Command+K shortcut & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-20 animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-white border border-[#E6E1D8] p-5 sm:p-6 text-[#171717] shadow-2xl space-y-4 overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-[#E6E1D8]">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#C6922E]" />
            <span className="font-serif-display text-base font-bold text-[#171717]">
              Directory Search
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 rounded-lg text-[#5F5A52] hover:text-[#171717] hover:bg-[#F3F0E9] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <SearchBar
            autoFocus
            size="large"
            placeholder="Search companions, Hyderabad areas, services, or categories…"
            onSelectSuggestion={(item) => {
              onClose();
              onSelectSuggestion(item);
            }}
            onSubmitSearch={(q) => {
              onClose();
              onSubmitSearch(q);
            }}
          />
        </div>

        <div className="pt-2 flex items-center justify-between text-[11px] text-[#5F5A52]">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-[#F8F6F1] border border-[#E6E1D8] font-mono text-[10px] text-[#171717]">
              ↑↓
            </span>
            <span>Navigate suggestions</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-[#F8F6F1] border border-[#E6E1D8] font-mono text-[10px] text-[#171717]">
              ESC
            </span>
            <span>Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
