import Fuse from 'fuse.js';
import { SearchItem, searchData } from '../lib/searchData';

// Fuse.js options for fuzzy search
const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.6 },
    { name: 'description', weight: 0.3 },
    { name: 'tags', weight: 0.1 }
  ],
  threshold: 0.4, // Lower = more strict matching
  includeMatches: true,
  minMatchCharLength: 2,
  ignoreLocation: true
};

// Create Fuse instance
const fuse = new Fuse(searchData, fuseOptions);

export interface SearchResult extends SearchItem {
  matches?: readonly any[];
}

/**
 * Search across all content types
 */
export const search = (query: string): SearchResult[] => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const results = fuse.search(query);
  
  return results.map(result => ({
    ...result.item,
    matches: result.matches
  }));
};

/**
 * Get recent searches from localStorage
 */
export const getRecentSearches = (): string[] => {
  try {
    const stored = localStorage.getItem('recentSearches');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

/**
 * Save search to localStorage
 */
export const saveRecentSearch = (query: string): void => {
  if (!query.trim()) return;
  
  const recent = getRecentSearches();
  const updated = [query, ...recent.filter(s => s !== query)].slice(0, 5); // Keep last 5
  localStorage.setItem('recentSearches', JSON.stringify(updated));
};

/**
 * Clear recent searches
 */
export const clearRecentSearches = (): void => {
  localStorage.removeItem('recentSearches');
};
