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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-4 pt-10 sm:pt-16 md:pt-20 animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-[calc(100vw-1.5rem)] sm:max-w-2xl rounded-2xl sm:rounded-3xl bg-white border border-[#E6E1D8] text-[#171717] shadow-2xl flex flex-col max-h-[88vh] sm:max-h-[82vh] overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#E6E1D8] shrink-0 bg-[#FAF9F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#C6922E]/15 border border-[#C6922E]/30 flex items-center justify-center text-[#916718] shrink-0">
              <Search className="w-4 h-4 text-[#C6922E]" />
            </div>
            <div>
              <span className="font-serif-display text-sm sm:text-base font-bold text-[#171717] block leading-tight">
                Directory Search
              </span>
              <span className="text-[10px] sm:text-xs text-[#8C827A] hidden xs:block">
                Companions, Hyderabad localities & services
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 sm:p-2 rounded-xl text-[#5F5A52] hover:text-[#171717] hover:bg-[#F3F0E9] transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Content */}
        <div className="p-3.5 sm:p-5 flex-1 overflow-y-auto flex flex-col min-h-0">
          <SearchBar
            variant="modal"
            autoFocus
            size="large"
            placeholder="Search companions, areas, services in Hyderabad…"
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

        {/* Footer */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 border-t border-[#E6E1D8] bg-[#FAF9F5] text-[11px] text-[#5F5A52] flex items-center justify-between shrink-0">
          <div className="hidden sm:flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#E6E1D8] font-mono text-[10px] font-bold text-[#171717]">↑↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#E6E1D8] font-mono text-[10px] font-bold text-[#171717]">↵</kbd>
              <span>Select</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#E6E1D8] font-mono text-[10px] font-bold text-[#171717]">ESC</kbd>
              <span>Close</span>
            </span>
          </div>
          <div className="sm:hidden text-[10px] text-[#8C827A]">
            Tap any result to view details
          </div>
          <span className="text-[10px] font-semibold text-[#C6922E]">18+ Directory</span>
        </div>
      </div>
    </div>
  );
}
