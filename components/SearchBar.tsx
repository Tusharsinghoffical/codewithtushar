import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { search as searchFunction, SearchResult, getRecentSearches, saveRecentSearch } from '../lib/search';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Load recent searches on mount
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    debounceRef.current = setTimeout(() => {
      const searchResults = searchFunction(query);
      setResults(searchResults.slice(0, 8)); // Limit to 8 results
      setIsSearching(false);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current && 
        !resultsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsExpanded(false);
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0 && results[selectedIndex]) {
      e.preventDefault();
      handleSelectResult(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsExpanded(false);
      setQuery('');
    }
  }, [results, selectedIndex]);

  const handleSelectResult = (result: SearchResult) => {
    saveRecentSearch(query);
    setRecentSearches(getRecentSearches());
    navigate(result.link);
    setIsExpanded(false);
    setQuery('');
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'project': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'service': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'blog': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="relative flex items-center">
      {/* Search Input */}
      <div
        className={`flex items-center transition-all duration-300 ease-in-out ${
          isExpanded || query ? 'w-64 md:w-80' : 'w-10'
        }`}
      >
        {isExpanded || query ? (
          <>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              placeholder="Search projects, blogs, services..."
              className="w-full px-4 py-2 pr-10 text-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 shadow-lg"
              aria-label="Search"
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute right-3 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                aria-label="Clear search"
              >
                <X size={16} className="text-slate-400" />
              </button>
            )}
          </>
        ) : null}
        
        {!isExpanded && !query && (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-8 h-8 sm:w-8.5 sm:h-8.5 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-slate-300 shrink-0"
            aria-label="Open search"
          >
            <Search size={16} />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {(isExpanded && (results.length > 0 || query || recentSearches.length > 0)) && (
        <div
          ref={resultsRef}
          className="absolute top-full right-0 mt-2 w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 backdrop-blur-sm"
          role="listbox"
          aria-label="Search results"
        >
          {/* Loading State */}
          {isSearching && results.length === 0 && (
            <div className="px-4 py-8 text-center">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-slate-200 dark:border-slate-700 border-t-blue-500"></div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Searching...</p>
            </div>
          )}

          {/* No Results */}
          {!isSearching && query && results.length === 0 && (
            <div className="px-4 py-8 text-center">
              <Search size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-2" />
              <p className="text-sm text-slate-500 dark:text-slate-400">No results found for "{query}"</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Try different keywords</p>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="max-h-96 overflow-y-auto">
              <div className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-900/50">
                Results ({results.length})
              </div>
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleSelectResult(result)}
                  className={`w-full px-4 py-3 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                    index === selectedIndex ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  {/* Type Badge */}
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full uppercase tracking-wide flex-shrink-0 ${getTypeBadgeColor(result.type)}`}>
                    {result.type}
                  </span>
                  
                  {/* Content */}
                  <div className="flex-1 text-left min-w-0">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {result.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                      {result.description}
                    </p>
                    {result.tags && result.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {result.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Arrow Icon */}
                  <ArrowRight 
                    size={16} 
                    className={`text-slate-400 flex-shrink-0 mt-0.5 transition-transform ${
                      index === selectedIndex ? 'translate-x-1 text-blue-500' : ''
                    }`} 
                  />
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  Recent Searches
                </span>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(search)}
                  className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left"
                >
                  <Clock size={14} className="text-slate-400" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{search}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
