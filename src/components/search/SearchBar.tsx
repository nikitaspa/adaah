import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Sparkles, User, Tag, X, ArrowRight } from 'lucide-react';
import { SearchRepository } from '../../lib/repositories';
import { SearchSuggestionItem } from '../../types';
import { cn } from '../../lib/utils';

export interface SearchBarProps {
  initialQuery?: string;
  onSelectSuggestion?: (item: SearchSuggestionItem) => void;
  onSubmitSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  size?: 'default' | 'large';
  autoFocus?: boolean;
  variant?: 'default' | 'modal';
}

export function SearchBar({
  initialQuery = '',
  onSelectSuggestion,
  onSubmitSearch,
  placeholder = 'Search companions, areas, services in Hyderabad…',
  className,
  size = 'default',
  autoFocus = false,
  variant = 'default',
}: SearchBarProps) {
  const isModal = variant === 'modal';
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<SearchSuggestionItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lumina_recent_searches');
      if (saved) {
        setRecentSearches(JSON.parse(saved).slice(0, 4));
      }
    } catch {
      // ignore
    }

    SearchRepository.getPopularSearches().then(setPopularSearches);
  }, []);

  const saveRecentSearch = (term: string) => {
    try {
      const updated = [term, ...recentSearches.filter((s) => s.toLowerCase() !== term.toLowerCase())].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('lumina_recent_searches', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Debounced search suggestion query
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setSelectedIndex(-1);
      return;
    }

    const timer = setTimeout(async () => {
      const res = await SearchRepository.getSuggestions(query, 7);
      setSuggestions(res);
      setSelectedIndex(-1);
    }, 180);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener (only active in default mode, modal handles its own click outside)
  useEffect(() => {
    if (isModal) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isModal]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSelect(suggestions[selectedIndex]);
      } else if (query.trim()) {
        saveRecentSearch(query.trim());
        if (!isModal) setIsOpen(false);
        onSubmitSearch?.(query.trim());
      }
    } else if (e.key === 'Escape') {
      if (!isModal) setIsOpen(false);
    }
  };

  const handleSelect = (item: SearchSuggestionItem) => {
    setQuery(item.title);
    saveRecentSearch(item.title);
    if (!isModal) setIsOpen(false);
    onSelectSuggestion?.(item);
  };

  const getTypeIcon = (type: SearchSuggestionItem['type']) => {
    switch (type) {
      case 'location':
        return <MapPin className="h-4 w-4 text-[#C6922E] shrink-0" />;
      case 'profile':
        return <User className="h-4 w-4 text-[#916718] shrink-0" />;
      case 'category':
        return <Tag className="h-4 w-4 text-[#C6922E] shrink-0" />;
      case 'service':
        return <Sparkles className="h-4 w-4 text-[#C6922E] shrink-0" />;
    }
  };

  const isLarge = size === 'large';
  const showDropdown = isModal || isOpen;

  return (
    <div
      ref={containerRef}
      className={cn('w-full text-[#171717]', isModal ? 'flex flex-col flex-1 min-h-0' : 'relative', className)}
    >
      <div
        className={cn(
          'relative flex items-center w-full rounded-2xl bg-white border transition-all duration-200 shadow-xs shrink-0',
          isOpen || isModal
            ? 'ring-2 ring-[#C6922E]/40 border-[#C6922E] shadow-sm'
            : 'border-[#E6E1D8] hover:border-[#C6922E]/60',
          isLarge ? 'h-12 sm:h-14 md:h-16 px-3 sm:px-4 md:px-5' : 'h-11 md:h-12 px-3 sm:px-3.5'
        )}
      >
        <Search
          className={cn(
            'text-[#C6922E] shrink-0 mr-2 sm:mr-3',
            isLarge ? 'h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6' : 'h-4 w-4'
          )}
        />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          placeholder={placeholder}
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          aria-controls="search-suggestions-dropdown"
          aria-label={placeholder || 'Search directory'}
          className={cn(
            'flex-1 min-w-0 bg-transparent text-[#171717] placeholder:text-[#8C827A] focus:outline-none font-medium truncate pr-1 sm:pr-2',
            isLarge ? 'text-xs sm:text-base md:text-lg' : 'text-xs sm:text-sm'
          )}
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSuggestions([]);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="shrink-0 p-1 sm:p-1.5 rounded-full text-[#8C827A] hover:text-[#171717] hover:bg-[#F3F0E9] transition-colors mr-1 sm:mr-2 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            if (query.trim()) {
              saveRecentSearch(query.trim());
              if (!isModal) setIsOpen(false);
              onSubmitSearch?.(query.trim());
            }
          }}
          className={cn(
            'shrink-0 rounded-xl bg-[#C6922E] hover:bg-[#A8751F] text-[#171717] font-bold transition-all active:scale-95 flex items-center justify-center cursor-pointer shadow-xs',
            isLarge
              ? 'h-8 sm:h-9 md:h-11 px-2.5 sm:px-4 md:px-5 text-xs sm:text-sm md:text-base'
              : 'h-8 px-2.5 sm:px-3 text-xs'
          )}
        >
          <span>Search</span>
          <ArrowRight className="h-3.5 w-3.5 ml-1 hidden sm:inline" />
        </button>
      </div>

      {/* Autocomplete Suggestions Popup or Inline Modal Panel */}
      {showDropdown && (
        <div
          id="search-suggestions-dropdown"
          role="listbox"
          className={cn(
            isModal
              ? 'relative w-full mt-3 rounded-2xl bg-white border border-[#E6E1D8] shadow-2xs overflow-hidden flex flex-col flex-1 min-h-0'
              : 'absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl bg-white border border-[#E6E1D8] shadow-2xl overflow-hidden max-h-[60vh] overflow-y-auto animate-in fade-in-50 duration-150'
          )}
        >
          {suggestions.length > 0 ? (
            <div className="py-2 divide-y divide-[#E6E1D8] overflow-y-auto flex-1">
              <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#C6922E]">
                Suggested Matches ({suggestions.length})
              </div>
              <ul className="py-1">
                {suggestions.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <li
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        'flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 cursor-pointer transition-colors',
                        isSelected ? 'bg-[#F8F6F1]' : 'hover:bg-[#FAF9F5]'
                      )}
                    >
                      <div className="p-2 rounded-lg bg-[#F8F6F1] border border-[#E6E1D8] shrink-0 text-[#C6922E]">
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs sm:text-sm text-[#171717] truncate">
                          {item.title}
                        </div>
                        <div className="text-[11px] sm:text-xs text-[#5F5A52] truncate">{item.subtitle}</div>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-[#916718] font-bold px-2 py-0.5 rounded bg-[#C6922E]/10 border border-[#C6922E]/20 shrink-0">
                        {item.type}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : query.trim() ? (
            <div className="p-6 text-center">
              <p className="text-sm font-semibold text-[#171717]">No immediate suggestions for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-[#5F5A52] mt-1">Press Enter or tap Search to explore all directory listings.</p>
            </div>
          ) : (
            <div className="p-3.5 sm:p-4 space-y-4 overflow-y-auto flex-1">
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#8C827A] mb-2">
                    <span>Recent Searches</span>
                    <button
                      type="button"
                      onClick={() => {
                        setRecentSearches([]);
                        localStorage.removeItem('lumina_recent_searches');
                      }}
                      className="text-[#8C827A] hover:text-[#C6922E] text-[10px] normal-case cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setQuery(term);
                          onSubmitSearch?.(term);
                          if (!isModal) setIsOpen(false);
                        }}
                        className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#F8F6F1] hover:bg-[#F3F0E9] text-xs text-[#171717] border border-[#E6E1D8] transition-colors cursor-pointer font-medium active:scale-95 shadow-2xs"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C827A] mb-2">
                  Popular Searches & Hyderabad Localities
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {popularSearches.map((term, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setQuery(term);
                        onSubmitSearch?.(term);
                        if (!isModal) setIsOpen(false);
                      }}
                      className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#F8F6F1] hover:bg-[#F3F0E9] text-xs text-[#5F5A52] hover:text-[#C6922E] border border-[#E6E1D8] transition-colors cursor-pointer font-medium active:scale-95 shadow-2xs"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
