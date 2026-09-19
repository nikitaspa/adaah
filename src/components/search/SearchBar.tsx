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
}

export function SearchBar({
  initialQuery = '',
  onSelectSuggestion,
  onSubmitSearch,
  placeholder = 'Search profiles, locations, categories in Hyderabad...',
  className,
  size = 'default',
  autoFocus = false,
}: SearchBarProps) {
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

  // Click outside listener
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

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
        setIsOpen(false);
        onSubmitSearch?.(query.trim());
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (item: SearchSuggestionItem) => {
    setQuery(item.title);
    saveRecentSearch(item.title);
    setIsOpen(false);
    onSelectSuggestion?.(item);
  };

  const getTypeIcon = (type: SearchSuggestionItem['type']) => {
    switch (type) {
      case 'location':
        return <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />;
      case 'profile':
        return <User className="h-4 w-4 text-amber-400 shrink-0" />;
      case 'category':
        return <Tag className="h-4 w-4 text-sky-400 shrink-0" />;
      case 'service':
        return <Sparkles className="h-4 w-4 text-purple-400 shrink-0" />;
    }
  };

  const isLarge = size === 'large';

  return (
    <div ref={containerRef} className={cn('relative w-full text-[#171717]', className)}>
      <div
        className={cn(
          'relative flex items-center w-full rounded-2xl bg-white border transition-all duration-200 shadow-xs',
          isOpen ? 'ring-2 ring-[#C6922E]/40 border-[#C6922E] shadow-lg' : 'border-[#E6E1D8] hover:border-[#C6922E]/60',
          isLarge ? 'h-14 md:h-16 px-4 md:px-5' : 'h-11 md:h-12 px-3.5'
        )}
      >
        <Search className={cn('text-[#C6922E] shrink-0 mr-3', isLarge ? 'h-5 w-5 md:h-6 md:w-6' : 'h-4 w-4')} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          placeholder={placeholder}
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="search-suggestions-dropdown"
          className={cn(
            'w-full bg-transparent text-[#171717] placeholder:text-[#8C827A] focus:outline-none font-medium',
            isLarge ? 'text-base md:text-lg' : 'text-sm'
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
            className="p-1 rounded-full text-[#8C827A] hover:text-[#171717] hover:bg-[#F3F0E9] transition-colors mr-2 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            if (query.trim()) {
              saveRecentSearch(query.trim());
              setIsOpen(false);
              onSubmitSearch?.(query.trim());
            }
          }}
          className={cn(
            'shrink-0 rounded-xl bg-[#C6922E] hover:bg-[#A8751F] text-[#171717] font-bold transition-all active:scale-95 flex items-center justify-center cursor-pointer shadow-xs',
            isLarge ? 'px-5 py-2.5 text-sm md:text-base' : 'px-3.5 py-1.5 text-xs'
          )}
        >
          <span>Search</span>
          <ArrowRight className="h-3.5 w-3.5 ml-1.5 hidden sm:inline" />
        </button>
      </div>

      {/* Autocomplete Suggestions Popup */}
      {isOpen && (
        <div
          id="search-suggestions-dropdown"
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl bg-white border border-[#E6E1D8] shadow-2xl overflow-hidden animate-in fade-in-50 duration-150"
        >
          {suggestions.length > 0 ? (
            <div className="py-2 divide-y divide-[#E6E1D8]">
              <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#C6922E]">
                Suggested Matches
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
                        'flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors',
                        isSelected ? 'bg-[#F8F6F1]' : 'hover:bg-[#FAF9F5]'
                      )}
                    >
                      <div className="p-2 rounded-lg bg-[#F8F6F1] border border-[#E6E1D8] shrink-0 text-[#C6922E]">
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-[#171717] truncate">
                          {item.title}
                        </div>
                        <div className="text-xs text-[#5F5A52] truncate">{item.subtitle}</div>
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
              <p className="text-xs text-[#5F5A52] mt-1">Press Enter to run a comprehensive directory search.</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
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
                          setIsOpen(false);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#F8F6F1] hover:bg-[#F3F0E9] text-xs text-[#171717] border border-[#E6E1D8] transition-colors cursor-pointer font-medium"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C827A] mb-2">
                  Popular Searches & Districts
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {popularSearches.map((term, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setQuery(term);
                        onSubmitSearch?.(term);
                        setIsOpen(false);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#F8F6F1] hover:bg-[#F3F0E9] text-xs text-[#5F5A52] hover:text-[#C6922E] border border-[#E6E1D8] transition-colors cursor-pointer font-medium"
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
